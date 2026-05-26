/* SAT Traffic Lights — app logic.
 * No frameworks; vanilla DOM + a simple state object. The flow is:
 *   score → quiz → results → (review) → regen → (loop)
 *
 * Answer letters (A/B/C/D) are randomized per render so the *position* of the
 * correct answer changes between attempts. Each answer record stores the
 * permutation that was shown, so review screens display what the student
 * actually saw and can correctly mark "your pick" vs "the right one."
 */
(() => {
  'use strict';

  const TEST_LENGTH = 30;
  const LETTERS = ['A', 'B', 'C', 'D', 'E'];

  // ----- helpers ---------------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ====================================================================
  // Question bank loader
  // ====================================================================
  // The runtime bank is assembled from two source files:
  //   • questions.js           → human-curated  (uploader = an email)
  //   • questions-generated.js → AI-generated   (uploader = "AI Generated")
  // Each file declares a `*_DEFAULTS` block and an array. We merge:
  //   defaults → base question → admin overrides (localStorage)
  // The result is two globals:
  //   window.STL_QUESTIONS_ALL  → every question (admin reads this)
  //   window.STL_QUESTIONS      → state === 'live' only (quiz reads this)
  // Admin actions write to localStorage stl_question_overrides; the next
  // assembleBank() call picks them up.
  const ADMIN_OVERRIDES_KEY = 'stl_question_overrides';

  const loadAdminOverrides = () => {
    try {
      const raw = localStorage.getItem(ADMIN_OVERRIDES_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (_) { return {}; }
  };
  const saveAdminOverrides = (overrides) => {
    try { localStorage.setItem(ADMIN_OVERRIDES_KEY, JSON.stringify(overrides)); return true; }
    catch (e) { console.warn('stl: override write failed', e); return false; }
  };

  const assembleBank = () => {
    const humanDefaults = window.STL_QUESTIONS_HUMAN_DEFAULTS || {};
    const aiDefaults    = window.STL_QUESTIONS_AI_DEFAULTS    || {};
    const human         = window.STL_QUESTIONS_HUMAN || [];
    const ai            = window.STL_QUESTIONS_AI    || [];
    const overrides     = loadAdminOverrides();

    const merge = (defaults, q) => {
      const base = { ...defaults, ...q };
      const ov = overrides[base.id];
      return ov ? { ...base, ...ov } : base;
    };

    const all = [
      ...human.map((q) => merge(humanDefaults, q)),
      ...ai.map((q)    => merge(aiDefaults, q)),
    ];
    window.STL_QUESTIONS_ALL = all;
    window.STL_QUESTIONS     = all.filter((q) => q.state === 'live');
  };
  // Run synchronously so the rest of the file (and existing callers
  // that already read window.STL_QUESTIONS) see the assembled bank.
  assembleBank();

  // Mutate-and-rebuild helper used by admin actions. Pass an updater
  // function that receives the overrides map and returns the next
  // map; the helper persists, rebuilds the bank, and notifies any
  // listeners (currently: a dispatched 'stl:bank-updated' event).
  const updateOverrides = (updater) => {
    const next = updater(loadAdminOverrides());
    saveAdminOverrides(next);
    assembleBank();
    document.dispatchEvent(new CustomEvent('stl:bank-updated'));
  };

  const shuffle = (arr) => {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };

  /** A permutation of [0..n-1]. perm[displayIdx] = originalIdx. */
  const permutation = (n) => shuffle(Array.from({ length: n }, (_, i) => i));

  const tiersForScore = (score) => {
    if (score <= 500) return ['easy'];
    if (score <= 600) return ['easy', 'medium'];
    if (score <= 700) return ['easy', 'medium', 'hard'];
    return ['easy', 'medium', 'hard', 'insane'];
  };

  const eligibleQuestions = (allowedTiers, restrictTopics = null) => {
    const tierSet = new Set(allowedTiers);
    return (window.STL_QUESTIONS || []).filter((q) => {
      if (!tierSet.has(q.difficulty)) return false;
      // Grid-in items have no choices array, but they're still valid —
      // the only constraint is they must have an `answer` defined.
      if (q.answer == null) return false;
      if (!Array.isArray(q.choices)) {
        // OK as long as it's a grid-in; require a string answer
        if (typeof q.answer !== 'string') return false;
      }
      if (restrictTopics && !restrictTopics.has(q.topic)) return false;
      return true;
    });
  };

  const buildTest = (allowedTiers, restrictTopics = null) => {
    const pool = eligibleQuestions(allowedTiers, restrictTopics);
    if (pool.length === 0) return [];
    if (pool.length >= TEST_LENGTH) return shuffle(pool).slice(0, TEST_LENGTH);
    // Pool too small: take what we have, then fill by repeating distinct items.
    const base = shuffle(pool);
    const filled = base.slice();
    while (filled.length < TEST_LENGTH) filled.push(base[filled.length % base.length]);
    return filled;
  };

  // ----- state -----------------------------------------------------------
  const state = {
    score: 0,
    tiers: [],
    test: [],          // array of question objects
    answers: [],       // { qid, picked (origIdx|null), signal, correct, perm }
    cursor: 0,
    reviewItems: [],
    reviewCursor: 0,
    // Timer fields. testStartedAt = ms timestamp of the first question
    // (set in startTest). testEndedAt = ms timestamp when results
    // appeared. timerHandle = setInterval handle for the live header
    // pill update; null when no timer is running.
    testStartedAt: null,
    testEndedAt: null,
    timerHandle: null,
  };

  // current-question render state
  let currentPick = null;        // ORIGINAL index into q.choices
  let currentPerm = null;        // permutation used for the current render

  // shared-attempt mode flag — set when the page was loaded with `?a=`
  // and we're showing a friend's attempt. Suppresses save-to-history
  // and tweaks the results screen actions (no "Walk through review"
  // mid-action, since they didn't take it).
  let viewingShared = false;

  // ====================================================================
  // Persistence: past attempts in localStorage
  // ====================================================================
  // Schema v1. Up to 50 attempts kept (FIFO). Each attempt carries a
  // snapshot of every question's content so reviews keep working even
  // if the question bank changes underneath. URL-shared attempts use a
  // lean payload (no snaps) — see encodeShareURL below.
  const STL_STORAGE_KEY = 'stl_attempts';
  const STL_SCHEMA_VERSION = 1;
  const STL_MAX_ATTEMPTS = 50;

  // Read all attempts. Drops malformed and future-version entries
  // rather than crashing — important when we bump the schema later.
  const loadAttempts = () => {
    try {
      const raw = localStorage.getItem(STL_STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return [];
      return arr.filter((a) => a && a.v === STL_SCHEMA_VERSION && a.id);
    } catch (e) {
      // Corrupt JSON — wipe rather than crash on every load.
      console.warn('stl: storage read failed, resetting', e);
      try { localStorage.removeItem(STL_STORAGE_KEY); } catch (_) {}
      return [];
    }
  };

  // Write the array; if quota's hit, drop the oldest 5 and try once
  // more. Returns true on success.
  const persistAttempts = (arr) => {
    const write = (toWrite) => {
      localStorage.setItem(STL_STORAGE_KEY, JSON.stringify(toWrite));
    };
    try { write(arr); return true; }
    catch (e) {
      const isQuota = e && (e.name === 'QuotaExceededError' || e.code === 22);
      if (isQuota && arr.length > 5) {
        try { write(arr.slice(5)); return true; } catch (_) {}
      }
      console.warn('stl: storage write failed', e);
      return false;
    }
  };

  const saveAttempt = (att) => {
    const arr = loadAttempts();
    arr.push(att);
    while (arr.length > STL_MAX_ATTEMPTS) arr.shift();
    return persistAttempts(arr);
  };
  const deleteAttempt = (id) => persistAttempts(loadAttempts().filter((a) => a.id !== id));
  const clearAttempts = () => {
    try { localStorage.removeItem(STL_STORAGE_KEY); return true; }
    catch (e) { console.warn('stl: clear failed', e); return false; }
  };
  const getAttempt = (id) => loadAttempts().find((a) => a.id === id);

  const newAttemptId = () => 'att_' + Date.now().toString(36) + '_' +
    Math.random().toString(36).slice(2, 8);

  // Snapshot just the fields the renderer needs — strips large
  // transient fields and prevents bank edits from breaking review.
  const questionSnap = (q) => ({
    id: q.id,
    stem: q.stem,
    choices: q.choices || null,
    answer: q.answer,
    explanation: q.explanation || '',
    topic: q.topic || '',
    difficulty: q.difficulty || '',
    passage: q.passage || null,
    figure: q.figure || null,
    choiceCharts: q.choiceCharts || null,
  });

  // Build an attempt record from the current state. Returns null if
  // there isn't a meaningful test to save.
  const buildAttemptFromState = (opts = {}) => {
    if (!state.test || state.test.length === 0) return null;
    if (!state.answers || state.answers.length === 0) return null;
    return {
      v: STL_SCHEMA_VERSION,
      id: newAttemptId(),
      synthetic: !!opts.synthetic,
      startedAt: state.testStartedAt || Date.now(),
      completedAt: state.testEndedAt || Date.now(),
      totalElapsedMs: totalElapsedMs(),
      targetScore: state.score,
      tiers: state.tiers ? state.tiers.slice() : [],
      restrictTopics: state.restrictTopics || null,
      questions: state.test.map((q) => ({ qid: q.id, snap: questionSnap(q) })),
      answers: state.answers.map((a) => ({
        qid: a.qid, picked: a.picked, signal: a.signal,
        correct: a.correct, perm: a.perm,
      })),
    };
  };

  // ----- timer helpers ---------------------------------------------------
  // Format an elapsed-millisecond duration as "m:ss" (or "h:mm:ss" past
  // one hour). Tabular numerals on the rendering side keep widths stable.
  const formatDuration = (ms) => {
    if (ms == null || ms < 0) ms = 0;
    const total = Math.floor(ms / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const ss = String(s).padStart(2, '0');
    if (h > 0) return h + ':' + String(m).padStart(2, '0') + ':' + ss;
    return m + ':' + ss;
  };

  // Per-question pace: under a minute renders compactly as "23s",
  // a minute or longer as "1:05". Avoids the "0:23" leading-zero look
  // that formatDuration would produce for short paces, which reads
  // weirdly in "X per question" copy.
  const formatPace = (ms) => {
    if (ms == null || ms < 0) ms = 0;
    if (ms < 1000) return '<1s';
    const sec = Math.round(ms / 1000);
    if (sec < 60) return sec + 's';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ':' + String(s).padStart(2, '0');
  };

  // Idempotent start. Clears any existing handle, sets a fresh start
  // timestamp, immediately renders the header pill, then ticks once a
  // second. Called from startTest.
  const startTimer = () => {
    if (state.timerHandle) {
      clearInterval(state.timerHandle);
      state.timerHandle = null;
    }
    state.testStartedAt = Date.now();
    state.testEndedAt = null;
    const tick = () => {
      if (!state.testStartedAt || state.testEndedAt) return;
      const elapsed = Date.now() - state.testStartedAt;
      const el = $('#quiz-timer');
      if (el) el.textContent = formatDuration(elapsed);
    };
    tick();                               // paint first frame immediately
    state.timerHandle = setInterval(tick, 1000);
  };

  // Stops the live tick and freezes the elapsed time. Subsequent reads
  // of (testEndedAt − testStartedAt) give the test's total duration.
  // Called from showResults and from any path that aborts a test.
  const stopTimer = () => {
    if (state.timerHandle) {
      clearInterval(state.timerHandle);
      state.timerHandle = null;
    }
    if (state.testStartedAt && !state.testEndedAt) {
      state.testEndedAt = Date.now();
    }
  };

  // Clears all timer state (used when the user abandons a test, e.g.
  // confirms Restart mid-quiz or hits "Start over with a new score").
  const clearTimer = () => {
    if (state.timerHandle) {
      clearInterval(state.timerHandle);
      state.timerHandle = null;
    }
    state.testStartedAt = null;
    state.testEndedAt = null;
    const el = $('#quiz-timer');
    if (el) el.textContent = '0:00';
  };

  // Total elapsed in ms — defined at any time after the test starts;
  // before testEndedAt is set, returns the live elapsed.
  const totalElapsedMs = () => {
    if (!state.testStartedAt) return 0;
    const end = state.testEndedAt || Date.now();
    return end - state.testStartedAt;
  };

  // ----- share-card rendering -------------------------------------------
  // Snapshot of the current run, packaged for the share-card renderer.
  // Pulled lazily (called when the user hits the Share button) so it
  // always reflects the just-completed test.
  const currentResultsSnapshot = () => {
    const total = state.test.length;
    const correct = state.answers.filter((a) => a.correct).length;
    const trueMastery = state.answers.filter((a) => a.correct && a.signal === 'green').length;
    const lucky = state.answers.filter((a) => a.correct && a.signal !== 'green').length;
    const toReview = state.answers.filter((a) => !a.correct).length;
    const totalMs = totalElapsedMs();
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    let headline = 'Nice work.';
    if (pct >= 90) headline = 'Outstanding.';
    else if (pct >= 75) headline = 'Strong showing.';
    else if (pct >= 50) headline = 'Solid baseline.';
    else headline = 'Lots of room to grow.';
    return {
      correct, total, trueMastery, lucky, toReview,
      totalTime: formatDuration(totalMs),
      avgTime: formatPace(total > 0 ? totalMs / total : 0),
      headline,
      targetScore: state.score,
    };
  };

  // Programmatic Canvas2D render of a 1080×1080 score card. No external
  // library — Canvas API only. The layout was tuned for square social
  // sharing (Instagram, Threads, etc.) since square works everywhere
  // 16:9 doesn't.
  //
  // Visual order (top → bottom): brand mark + name in the top-left;
  // tier eyebrow ("RESULTS · target 690") top-right; big score in the
  // upper-middle; three mini-stats (mastery / lucky / review) in their
  // signal colors mid-card; pacing line + URL footer.
  const renderShareCard = (r) => {
    const W = 1080, H = 1080;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // ---- background + ambient ----
    ctx.fillStyle = '#050509';
    ctx.fillRect(0, 0, W, H);
    // Subtle lavender glow (top-right) — same vibe as the in-app body::before
    const glow = ctx.createRadialGradient(W * 0.85, 60, 0, W * 0.85, 60, 700);
    glow.addColorStop(0, 'rgba(139, 134, 255, 0.20)');
    glow.addColorStop(1, 'rgba(139, 134, 255, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    const fontSans = '"Geist", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
    const fontMono = '"Geist Mono", ui-monospace, "SF Mono", monospace';
    const PAD = 96;

    // ---- brand mark (three traffic-light dots) ----
    const dotR = 8;
    const dotY = PAD + 22;
    const dotXs = [PAD + dotR, PAD + dotR + 24, PAD + dotR + 48];
    [['#4ade80', dotXs[0]], ['#facc15', dotXs[1]], ['#fb7185', dotXs[2]]].forEach(([color, x]) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, dotY, dotR, 0, Math.PI * 2);
      ctx.fill();
      // soft outer glow
      ctx.shadowColor = color;
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(x, dotY, dotR, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Brand name
    ctx.fillStyle = '#f0f2f7';
    ctx.font = '600 28px ' + fontSans;
    ctx.textBaseline = 'middle';
    ctx.fillText('SAT Traffic Lights', PAD + 80, dotY);

    // Top-right eyebrow: target score
    ctx.font = '500 18px ' + fontMono;
    ctx.fillStyle = '#a8b0c4';
    ctx.textAlign = 'right';
    const tierLine = 'RESULTS · TARGET ' + (r.targetScore || '—');
    ctx.fillText(tierLine, W - PAD, dotY);
    ctx.textAlign = 'left';

    // ---- headline ----
    let y = 280;
    ctx.font = '500 26px ' + fontMono;
    ctx.fillStyle = '#a8b0c4';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(r.headline.toUpperCase(), PAD, y);

    // ---- big score ----
    y += 80;
    ctx.font = '600 220px ' + fontSans;
    ctx.fillStyle = '#8b86ff';
    ctx.textBaseline = 'alphabetic';
    const correctText = String(r.correct);
    ctx.fillText(correctText, PAD, y + 180);
    const correctW = ctx.measureText(correctText).width;
    // Slash + total in a quieter shade
    ctx.fillStyle = '#494f60';
    ctx.fillText('/' + r.total, PAD + correctW + 8, y + 180);

    // "CORRECT" small caps below the score
    ctx.font = '500 22px ' + fontMono;
    ctx.fillStyle = '#6b7288';
    ctx.fillText('CORRECT OUT OF ' + r.total, PAD, y + 230);

    // ---- three mini-stats (mastery / lucky / review) ----
    y = 720;
    const colW = (W - PAD * 2) / 3;
    const drawStat = (i, num, label, color) => {
      const cx = PAD + i * colW;
      ctx.font = '600 96px ' + fontSans;
      ctx.fillStyle = color;
      ctx.fillText(String(num), cx, y);
      ctx.font = '500 16px ' + fontMono;
      ctx.fillStyle = '#6b7288';
      ctx.fillText(label, cx, y + 36);
    };
    drawStat(0, r.trueMastery, 'TRUE MASTERY',  '#4ade80');
    drawStat(1, r.lucky,       'LUCKY',         '#facc15');
    drawStat(2, r.toReview,    'TO REVIEW',     '#fb7185');

    // ---- footer: pacing only (URL stamp removed pending final brand) ----
    y = H - PAD - 40;
    ctx.font = '500 22px ' + fontMono;
    ctx.fillStyle = '#a8b0c4';
    ctx.fillText(r.totalTime + ' TOTAL · ' + r.avgTime + ' PER QUESTION', PAD, y);

    return canvas;
  };

  // Convert canvas to PNG Blob (Promise wrapper around canvas.toBlob).
  const canvasToBlob = (canvas) => new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });

  // Trigger a download for a generated Blob (desktop fallback when Web
  // Share isn't available or the user dismisses it).
  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Click handler for the Share button. Awaits document.fonts.ready so
  // Geist actually renders in the canvas (not the system fallback),
  // then routes through Web Share if available, else download.
  const shareScore = async () => {
    const btn = $('#btn-share-score');
    try {
      btn.disabled = true;
      // Wait for Geist to load before drawing — Canvas2D fillText uses
      // whatever fonts are currently in the document; without this the
      // first share after a fresh page load can fall back to system.
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      const r = currentResultsSnapshot();
      const canvas = renderShareCard(r);
      const blob = await canvasToBlob(canvas);
      if (!blob) {
        // toBlob failed — extremely rare, just bail with a notice
        alert('Couldn’t generate the share image. Try again?');
        return;
      }
      const filename = 'sat-traffic-lights-' + r.correct + '-of-' + r.total + '.png';
      const file = new File([blob], filename, { type: 'image/png' });
      const shareText = 'Just scored ' + r.correct + '/' + r.total +
                        ' on SAT Traffic Lights';

      // Web Share API path (mobile + macOS Safari). canShare is a
      // proper feature check; some browsers expose share() but reject
      // file payloads — canShare({files:[...]}) handles that correctly.
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'SAT Traffic Lights score',
            text: shareText,
          });
          return;
        } catch (e) {
          // User cancelled the share sheet or share failed mid-flight.
          // AbortError is the cancel case — don't fall through to download.
          if (e && e.name === 'AbortError') return;
          // Other errors → fall through to download below.
        }
      }
      downloadBlob(blob, filename);
    } finally {
      btn.disabled = false;
    }
  };

  // ----- motion helpers --------------------------------------------------
  // The screen-to-screen morphs (score → quiz → results → review → regen)
  // are powered by the native View Transitions API, with a graceful no-op
  // fallback for engines that don't support it. Reduced motion is honored.
  // See .claude/skills/web-animation/references/view-transitions.md for
  // the broader pattern.
  const reduceMotion = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // withTransition wraps a DOM update in a View Transition with a
  // direction. Forward (default) = card exits left, new enters from
  // right. 'back' = mirrored, for "going home" navigation (regen →
  // score, restart → score, review-prev). The direction class is set
  // on <html> before the transition starts and cleared after the
  // animation finishes; VT animations bind to pseudo-elements at
  // snapshot time, so even if a follow-up transition aborts this one
  // and clears classes early, the in-flight animation keeps its
  // direction.
  const withTransition = (update, direction) => {
    if (!document.startViewTransition || reduceMotion()) {
      update();
      return Promise.resolve();
    }
    const html = document.documentElement;
    if (direction === 'back') html.classList.add('stl-going-back');
    return document.startViewTransition(update).finished
      .catch(() => {})
      .finally(() => {
        html.classList.remove('stl-going-back');
      });
  };

  // requestAnimationFrame-driven count-up. Eased with cubic ease-out so
  // numbers decelerate into their resting value rather than tick linearly.
  const countTo = (el, target, formatter, duration) => {
    if (!el) return;
    const fmt = formatter || ((n) => String(n));
    const dur = duration || 720;
    if (reduceMotion() || target === 0) {
      el.textContent = fmt(target);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // ----- screen control --------------------------------------------------
  // showScreen accepts an optional `beforeNew` callback that runs INSIDE
  // the View Transition update, so any DOM mutation it performs (e.g.,
  // renderQuestion, renderReview, writing the results stats) is captured
  // in the post-transition snapshot and slides into place alongside the
  // screen swap. The third arg, direction, is 'forward' by default;
  // pass 'back' for "going home" navigation (regen → score, restart →
  // score) so the slide reverses. Returns a Promise that resolves once
  // the transition's finished, so callers can chain follow-up animation
  // (e.g., count-ups on results).
  const screens = ['score', 'quiz', 'results', 'review', 'regen', 'history', 'admin', 'login', 'forbidden'];
  const showScreen = (name, beforeNew, direction) => {
    return withTransition(() => {
      screens.forEach((s) => {
        const el = document.querySelector(`[data-screen="${s}"]`);
        if (el) el.hidden = (s !== name);
      });
      $('#btn-restart').hidden = (name === 'score' || name === 'history' || name === 'admin');
      // The header timer is only meaningful on the quiz screen — other
      // screens either have no test yet (score), summarize (results,
      // regen), or already show per-item context (review). Hidden state
      // mirrors btn-restart's logic.
      const timerEl = $('#quiz-timer');
      if (timerEl) timerEl.hidden = (name !== 'quiz');
      // History button hides while you're inside a quiz/review — those
      // are mid-test states where bailing to History would discard work.
      // Available everywhere else.
      const historyBtn = $('#btn-history');
      if (historyBtn) historyBtn.hidden = (name === 'quiz' || name === 'review' || name === 'history' || name === 'admin');
      if (typeof beforeNew === 'function') beforeNew();
      // No smooth scroll — the View Transition handles the visual continuity.
      window.scrollTo(0, 0);
    }, direction);
  };

  // ----- score screen ----------------------------------------------------
  const initScore = () => {
    const form = $('#score-form');
    const input = $('#score-input');
    const hint = $('#score-hint');
    const tiers = $$('.stl-tier');

    const updateTiersHint = () => {
      const v = Number(input.value);
      const active = tiersForScore(v);
      tiers.forEach((t) => {
        t.classList.toggle('is-active', active.includes(t.dataset.tier));
      });
    };
    input.addEventListener('input', updateTiersHint);

    // Tier shortcut buttons — clicking one fills the input with that
    // tier's top-of-range score (data-score on the button), syncs the
    // active state, and clears any error hint. We deliberately do NOT
    // auto-submit so the user can still adjust the number before
    // hitting "Start." Focus stays on the input so a quick keyboard
    // tweak (arrow keys / type a custom number) just works.
    tiers.forEach((tierBtn) => {
      tierBtn.addEventListener('click', () => {
        const score = tierBtn.dataset.score;
        if (!score) return;
        input.value = score;
        hint.classList.remove('is-error');
        hint.textContent = '200–800, in 10-point steps.';
        updateTiersHint();
        input.focus();
        input.select();   // makes a quick edit (e.g. 600 → 650) frictionless
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const raw = input.value.trim();
      // Empty input → fall back to the placeholder value as a sensible default.
      const v = raw === '' ? Number(input.placeholder) : Number(raw);
      if (!v || v < 200 || v > 800) {
        hint.textContent = 'Please enter a score between 200 and 800.';
        hint.classList.add('is-error');
        input.focus();
        return;
      }
      hint.classList.remove('is-error');
      hint.textContent = '200–800, in 10-point steps.';
      startTest(v);
    });
  };

  const startTest = (score, restrictTopics = null) => {
    state.score = score;
    state.tiers = tiersForScore(score);
    state.test = buildTest(state.tiers, restrictTopics);
    state.answers = [];
    state.cursor = 0;
    if (state.test.length === 0) {
      alert('No questions available for that selection yet. Try a higher score or a fresh test.');
      return;
    }
    // Reset and start the header timer the moment the first question
    // is about to render. Doing it before the View Transition means
    // the header pill paints "0:00" inside the VT update so the timer
    // appears alongside the quiz screen, not popping in afterwards.
    startTimer();
    // Render the first question INSIDE the screen transition so the
    // active-tier-pill ↔ difficulty-pill shared-element morph runs in
    // the same View Transition pass as the screen swap.
    showScreen('quiz', renderQuestion);
  };

  // ----- quiz ------------------------------------------------------------
  // A question is "grid-in" (free response) when it has no `choices` array
  // or an empty one — these are real SAT student-produced response items.
  // Their `answer` field is a STRING ("2", "1/4", "0.6") instead of an
  // index, and we accept any text input that normalizes to the same value.
  const isGridIn = (q) => !Array.isArray(q.choices) || q.choices.length === 0;

  // Normalize a free-response answer to a comparable form. Handles the
  // SAT's accepted-equivalents: "1/2", "0.5", ".5" all become 0.5; whole
  // numbers and decimals work as expected; trailing zeros and leading $/%
  // are stripped. Returns NaN for unparseable input so the caller can
  // bail instead of silently passing.
  const normalizeAnswer = (raw) => {
    if (raw == null) return NaN;
    const s = String(raw).trim().replace(/^[$\s]+|[%\s]+$/g, '');
    if (s === '') return NaN;
    if (s.includes('/')) {
      const [num, den] = s.split('/').map((p) => Number(p.trim()));
      if (!isFinite(num) || !isFinite(den) || den === 0) return NaN;
      return num / den;
    }
    const n = Number(s);
    return isFinite(n) ? n : NaN;
  };

  // ----- Chart.js theming + helpers --------------------------------------
  // Apply the v2-aligned dark theme to Chart.js once Chart is on window.
  // Chart.js loads with `defer`, so it's ready by DOMContentLoaded but we
  // still guard for slow networks. Theming is idempotent — safe to call
  // multiple times if needed.
  const themeChart = () => {
    if (!window.Chart || window.Chart.__stlThemed) return;
    const C = window.Chart;
    const root = getComputedStyle(document.documentElement);
    const text = root.getPropertyValue('--stl-text').trim() || '#f0f2f7';
    const muted = root.getPropertyValue('--stl-text-muted').trim() || '#a8b0c4';
    const subtle = root.getPropertyValue('--stl-text-subtle').trim() || '#6b7288';
    const hairline = root.getPropertyValue('--stl-hairline').trim() || 'rgba(255,255,255,0.07)';
    const accent = root.getPropertyValue('--stl-accent').trim() || '#8b86ff';

    // Font sizing for charts on the dark canvas. Body text is 15 px;
    // chart text needs to read at the same comfort level.
    //   - tick labels (years, dollars, etc.): 14 px
    //   - axis titles ("Year", "Number sold (millions)"): 13 px
    //   - chart title (centered above the plot): 15 px
    //   - tooltip body: 13 px
    C.defaults.font.family = '"Geist", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
    C.defaults.font.size = 14;
    C.defaults.color = muted;
    C.defaults.borderColor = hairline;
    C.defaults.elements.point.radius = 4;
    C.defaults.elements.point.hoverRadius = 6;
    C.defaults.elements.point.borderWidth = 0;
    C.defaults.elements.point.backgroundColor = accent;
    C.defaults.elements.line.borderColor = accent;
    C.defaults.elements.line.borderWidth = 2;
    C.defaults.elements.line.tension = 0;
    C.defaults.elements.bar.backgroundColor = accent;
    C.defaults.elements.bar.borderRadius = 3;
    C.defaults.plugins.legend.display = false;        // labels live on axes / titles
    C.defaults.plugins.title.color = text;
    C.defaults.plugins.title.font = { family: C.defaults.font.family, size: 15, weight: '600' };
    C.defaults.plugins.title.padding = { top: 4, bottom: 14 };
    C.defaults.plugins.tooltip.backgroundColor = 'rgba(13,14,24,0.96)';
    C.defaults.plugins.tooltip.titleColor = text;
    C.defaults.plugins.tooltip.bodyColor = muted;
    C.defaults.plugins.tooltip.titleFont = { family: C.defaults.font.family, size: 13, weight: '600' };
    C.defaults.plugins.tooltip.bodyFont = { family: C.defaults.font.family, size: 13 };
    C.defaults.plugins.tooltip.borderColor = hairline;
    C.defaults.plugins.tooltip.borderWidth = 1;
    C.defaults.plugins.tooltip.padding = 10;
    C.defaults.plugins.tooltip.displayColors = false;
    C.defaults.scale.grid.color = hairline;
    C.defaults.scale.grid.tickColor = hairline;
    C.defaults.scale.border.color = hairline;
    C.defaults.scale.ticks.color = subtle;
    C.defaults.scale.ticks.font = { family: C.defaults.font.family, size: 14 };
    C.defaults.scale.title.color = muted;
    C.defaults.scale.title.font = { family: C.defaults.font.family, size: 13, weight: '500' };
    C.__stlThemed = true;
  };

  // We track the active Chart instance per figure element so we can
  // destroy it before rendering a new one. Without this, Chart.js leaks
  // canvases and listeners on every question advance.
  const figureChartRegistry = new WeakMap();

  // Same idea but for the chart-choice grid: each choice card holds a
  // mini-chart. We keep an array of instances per grid container so we
  // can sweep them on re-render.
  const choiceChartRegistry = new WeakMap();
  const destroyChoiceCharts = (gridEl) => {
    if (!gridEl) return;
    const list = choiceChartRegistry.get(gridEl);
    if (Array.isArray(list)) {
      list.forEach((inst) => { try { inst.destroy(); } catch (e) {} });
    }
    choiceChartRegistry.delete(gridEl);
  };

  // Build a Chart.js options object from our compact schema. The schema
  // is intentionally narrow — the only chart types we ship are the ones
  // SAT figures actually use.
  const buildChartConfig = (chart) => {
    const { type, title, xLabel, yLabel, xMin, xMax, yMin, yMax,
            xTicks, yTicks, datasets, pointAccent } = chart;

    // Build axes. For 'line' and 'scatter', x is linear; for 'bar', x is category.
    //
    // Integer-tick formatter: Chart.js's default tick formatter routes
    // through Intl.NumberFormat, which inserts thousands separators in
    // 4+ digit integers (so years render as "2,009" instead of "2009").
    // For SAT charts the x-axis is almost always integer-valued (years,
    // hours, scores, weeks, days), so we override with a callback that
    // emits plain integers as strings and falls back to the locale-aware
    // format only when the value is non-integer.
    const intTickFmt = (v) => Number.isInteger(v) ? String(v) : v;
    const isCategorical = type === 'bar';
    const x = isCategorical
      ? { type: 'category', title: { display: !!xLabel, text: xLabel || '' }, grid: { display: false } }
      : { type: 'linear', position: 'bottom', title: { display: !!xLabel, text: xLabel || '' },
          min: xMin, max: xMax,
          ticks: { stepSize: xTicks || undefined, callback: intTickFmt } };
    const y = { type: 'linear', title: { display: !!yLabel, text: yLabel || '' },
                min: yMin, max: yMax,
                ticks: { stepSize: yTicks || undefined, callback: intTickFmt },
                beginAtZero: yMin == null };

    // Map our datasets schema to Chart.js datasets. Each entry can be:
    //   { kind: 'points', data: [{x,y},...] }     → discrete points only
    //   { kind: 'line',   data: [{x,y},...] }     → connected line through points
    //   { kind: 'best-fit', from:{x,y}, to:{x,y} }→ a 2-point line, dashed, muted
    //   { kind: 'bars',   labels:[...], values:[...] } → categorical bars
    const cjsDatasets = (datasets || []).map((d, i) => {
      if (d.kind === 'best-fit') {
        return {
          type: 'line',
          data: [d.from, d.to],
          showLine: true,
          fill: false,
          borderColor: 'rgba(168, 176, 196, 0.75)',
          borderDash: [4, 4],
          borderWidth: 1.5,
          pointRadius: 0,
          parsing: false,
          order: 99,
        };
      }
      if (d.kind === 'points') {
        return {
          type: 'scatter',
          data: d.data,
          showLine: false,
          parsing: false,
          backgroundColor: pointAccent || undefined,
          pointRadius: d.radius || 4,
        };
      }
      if (d.kind === 'line') {
        return {
          type: 'line',
          data: d.data,
          showLine: true,
          fill: false,
          parsing: false,
          // `smooth: true` means render as a continuous curve — no
          // per-point dot markers. Used for sampled function graphs.
          pointRadius: d.smooth ? 0 : undefined,
          pointHoverRadius: d.smooth ? 0 : undefined,
          borderWidth: d.smooth ? 2 : undefined,
        };
      }
      if (d.kind === 'bars') {
        return {
          type: 'bar',
          data: d.values,
          maxBarThickness: 28,
        };
      }
      return d;
    });

    const config = {
      type: type === 'scatter' ? 'scatter' : (type === 'bar' ? 'bar' : 'line'),
      data: isCategorical
        ? { labels: (datasets[0] && datasets[0].labels) || [], datasets: cjsDatasets }
        : { datasets: cjsDatasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: { x, y },
        plugins: {
          title: { display: !!title, text: title || '' },
          legend: { display: false },
        },
      },
    };
    return config;
  };

  // ----- stem text formatting --------------------------------------------
  // SAT print convention typesets variables in italic so they're visually
  // distinct from narrative text. We replicate that at render time by
  // wrapping standalone single letters in <em class="stl-quiz__var">.
  // The element is styled italic + lavender accent in app.css.
  //
  // A "standalone single letter" is a run of exactly one ASCII letter
  // surrounded by non-letter characters. That covers the typical SAT
  // patterns — "value of x", "f(x)", "C-intercept", "h hours" — while
  // leaving English words (which are runs of 2+ letters) untouched.
  //
  // The skip set (a/A/I/O) avoids false positives on common English
  // single-letter words ("a", "I") and the one zero-confusion letter
  // ("O"). The cost: the rare math expression with adjacent variable
  // letters (e.g. "kx" meaning k·x) won't be italicized — that's an
  // accepted tradeoff vs. fragile expression parsing.
  //
  // We also escape any HTML special characters in the input so a stem
  // can never accidentally inject markup, even though the bank is
  // hardcoded.
  const STEM_SKIP_LETTERS = new Set(['a', 'A', 'I', 'O']);
  const escapeHtml = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const formatStemHtml = (text) => {
    if (text == null) return '';
    // The "word" alternative below greedily absorbs:
    //   1. Dotted single-letter abbreviations like `i.e.`, `e.g.`, `P.M.`,
    //      `U.S.`, `A.M.` — matched first because if we let the simple
    //      letter-run pattern fire first, it would split "P.M." into two
    //      single letters and italicize both as if they were variables.
    //   2. Apostrophe-joined letter runs (`country's`, `don't`, `I'm`,
    //      `geologist's`) so the trailing 's' isn't read as a variable.
    //   3. Plain letter runs (English words and multi-letter math).
    //
    // Anything else falls through to the non-letter alternative.
    //
    // A "word" of length 1 that isn't in the skip set gets italicized
    // — that's the variable case. Multi-character words (including all
    // those abbreviations and contractions) stay plain.
    return String(text).replace(
      /([A-Za-z](?:\.[A-Za-z])+\.?|[A-Za-z]+(?:['’][A-Za-z]+)*)|([^A-Za-z]+)/g,
      (m, word, other) => {
        if (other) return escapeHtml(other);
        if (word.length === 1 && !STEM_SKIP_LETTERS.has(word)) {
          return '<em class="stl-quiz__var">' + escapeHtml(word) + '</em>';
        }
        return escapeHtml(word);
      }
    );
  };

  // ----- math expression rendering ---------------------------------------
  // SAT problems sometimes use exponent notation that Unicode can't quite
  // express well — most commonly `a^(1/2)` for a fractional exponent.
  // This renderer walks the input HTML (already produced by formatStemHtml)
  // and converts `^(...)` patterns into proper math typography:
  //
  //   ^(p/q)  → a stacked-fraction superscript (proper textbook layout)
  //   ^(n)    → a plain <sup>n</sup>
  //
  // Larger expressions like full equations are not handled here — for those
  // the bank uses inline equations (3x + 5 = 20) where Unicode does the
  // job. If we ever need actual LaTeX rendering we can swap this for KaTeX.
  //
  // Operates on HTML output (post-escaping), so the regex only needs to
  // care about the `^(...)` literal pattern; HTML tags inserted by
  // formatStemHtml don't contain `^` or unescaped `(` so they don't
  // collide.
  const renderMath = (html) => {
    if (html == null) return '';
    return String(html).replace(/\^\(([^()]+)\)/g, (_, body) => {
      const slashIdx = body.indexOf('/');
      if (slashIdx > 0 && slashIdx < body.length - 1) {
        const num = body.slice(0, slashIdx);
        const den = body.slice(slashIdx + 1);
        return '<span class="stl-math-fracsup">' +
          '<span class="stl-math-num">' + num + '</span>' +
          '<span class="stl-math-den">' + den + '</span>' +
          '</span>';
      }
      // No slash → plain parenthesized exponent
      return '<sup class="stl-math-sup">' + body + '</sup>';
    });
  };

  // Convenience wrapper: escape + italicize variables + render math, in
  // that order. Math runs last so it operates on the already-italicized
  // HTML (preserves <em> wrappers around variables inside expressions).
  const formatRich = (text) => renderMath(formatStemHtml(text));

  // Render a figure (image, table, or chart) inside a given <figure>
  // element. Clears the element first, then builds the matching content.
  // Sets data-kind on the figure so CSS can apply per-mode styling.
  const renderFigure = (figureEl, q) => {
    if (!figureEl) return;
    // Tear down any previously-rendered Chart.js instance attached to
    // this figure before nuking the DOM — leaving it would leak the
    // canvas + animation frame loop.
    const prevChart = figureChartRegistry.get(figureEl);
    if (prevChart) {
      try { prevChart.destroy(); } catch (e) { /* ignore */ }
      figureChartRegistry.delete(figureEl);
    }
    figureEl.innerHTML = '';

    if (q.chart) {
      themeChart();
      if (!window.Chart) {
        // Chart.js hasn't loaded (offline / slow network). Fail soft —
        // hide the figure rather than render a broken canvas.
        figureEl.dataset.kind = '';
        figureEl.hidden = true;
        return;
      }
      // Chart.js needs a canvas inside a sized container. The figure
      // wrapper provides height via CSS (.stl-quiz__figure[data-kind="chart"]).
      const canvas = document.createElement('canvas');
      figureEl.appendChild(canvas);
      figureEl.dataset.kind = 'chart';
      figureEl.hidden = false;
      const cfg = buildChartConfig(q.chart);
      const inst = new window.Chart(canvas.getContext('2d'), cfg);
      figureChartRegistry.set(figureEl, inst);
      return;
    }

    if (q.image) {
      const img = document.createElement('img');
      img.src = q.image;
      img.alt = q.imageAlt || 'Figure for this question';
      img.loading = 'lazy';
      figureEl.appendChild(img);
      figureEl.dataset.kind = 'image';
      figureEl.hidden = false;
      return;
    }

    if (q.svg) {
      // Inline SVG for geometric figures that aren't data-driven (parallel
      // lines, triangles with marked angles, etc.). The SVG uses
      // `currentColor` for stroke and fill so it picks up the dark canvas
      // text color; variable letters inside the SVG get .stl-svg-var which
      // the CSS styles with the same italic lavender as stem variables.
      figureEl.innerHTML = q.svg;
      figureEl.dataset.kind = 'svg';
      figureEl.hidden = false;
      return;
    }

    if (q.table) {
      const tbl = document.createElement('table');
      tbl.className = 'stl-quiz__table';

      if (q.table.caption) {
        const cap = document.createElement('caption');
        cap.textContent = q.table.caption;
        tbl.appendChild(cap);
      }

      if (Array.isArray(q.table.headers) && q.table.headers.length) {
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        q.table.headers.forEach((h) => {
          const th = document.createElement('th');
          th.scope = 'col';
          th.textContent = String(h);
          tr.appendChild(th);
        });
        thead.appendChild(tr);
        tbl.appendChild(thead);
      }

      if (Array.isArray(q.table.rows)) {
        const tbody = document.createElement('tbody');
        q.table.rows.forEach((row, i) => {
          const tr = document.createElement('tr');
          // Mark the last row as a totals/summary row when the question
          // schema asks for it — let CSS subtly emphasize it.
          if (q.table.totalsRow && i === q.table.rows.length - 1) {
            tr.classList.add('stl-quiz__table-totals');
          }
          row.forEach((cell, j) => {
            const td = document.createElement('td');
            // First column often serves as a row label — render as <th
            // scope="row"> for accessibility.
            if (j === 0 && q.table.firstColIsHeader) {
              const th = document.createElement('th');
              th.scope = 'row';
              th.textContent = String(cell);
              tr.appendChild(th);
            } else {
              td.textContent = String(cell);
              tr.appendChild(td);
            }
          });
          tbody.appendChild(tr);
        });
        tbl.appendChild(tbody);
      }

      figureEl.appendChild(tbl);
      figureEl.dataset.kind = 'table';
      figureEl.hidden = false;
      return;
    }

    figureEl.dataset.kind = '';
    figureEl.hidden = true;
  };

  const renderQuestion = () => {
    currentPick = null;
    const q = state.test[state.cursor];
    const gridIn = isGridIn(q);
    currentPerm = gridIn ? null : permutation(q.choices.length);

    const total = state.test.length;
    $('#quiz-counter').textContent = `Question ${state.cursor + 1} of ${total}`;
    $('#quiz-difficulty').textContent = q.difficulty;
    $('#quiz-difficulty').setAttribute('data-d', q.difficulty);
    $('#quiz-topic').textContent = q.topic;
    $('#quiz-progress-fill').style.width = `${((state.cursor) / total) * 100}%`;

    // figure (graph / table / diagram) — shown above the stem.
    // Two render modes:
    //   q.image  → screenshot, dark-mode-filtered for canvas blend
    //   q.table  → structured HTML table, styled to match the dark theme
    // Tables are preferred when the figure's content is purely tabular —
    // they're more accessible, theme-coherent, and don't need filter
    // hackery to read against a dark background.
    renderFigure($('#quiz-figure'), q);

    const passageEl = $('#quiz-passage');
    if (q.passage) {
      passageEl.innerHTML = formatRich(q.passage);
      passageEl.hidden = false;
    } else {
      passageEl.hidden = true;
    }
    // innerHTML is safe here because formatStemHtml escapes HTML in the
    // source text and only injects <em class="stl-quiz__var"> wrappers.
    $('#quiz-stem').innerHTML = formatRich(q.stem);

    const choicesEl = $('#quiz-choices');
    const gridInEl = $('#quiz-gridin');
    const gridInInput = $('#quiz-gridin-input');

    // Tear down any prior choice-chart canvases before deciding which
    // choice mode this question uses.
    const choiceGridEl = $('#quiz-choice-grid');
    destroyChoiceCharts(choiceGridEl);
    choiceGridEl.innerHTML = '';
    choiceGridEl.hidden = true;

    const usesChoiceCharts = !gridIn && Array.isArray(q.choiceCharts) && q.choiceCharts.length === q.choices.length;

    if (gridIn) {
      // Free-response: hide the multiple-choice list, show a text input
      choicesEl.innerHTML = '';
      choicesEl.hidden = true;
      gridInEl.hidden = false;
      gridInInput.value = '';
      gridInInput.classList.remove('is-locked');
    } else if (usesChoiceCharts) {
      // Chart-grid choices: render 4 mini-charts in a 2-col grid.
      gridInEl.hidden = true;
      choicesEl.hidden = true;
      choicesEl.innerHTML = '';
      choiceGridEl.hidden = false;
      themeChart();
      const instances = [];
      currentPerm.forEach((origIdx, displayIdx) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'stl-choice stl-choice--chart';
        card.dataset.origIdx = String(origIdx);
        card.innerHTML = `<span class="stl-choice__letter">${LETTERS[displayIdx] || (displayIdx + 1)}</span>`;
        const canvas = document.createElement('canvas');
        card.appendChild(canvas);
        card.addEventListener('click', () => selectChoiceCard(card, origIdx));
        choiceGridEl.appendChild(card);
        if (window.Chart) {
          // Build a "compact" version of the chart config — strip the
          // chart title and axis titles since mini-charts don't have
          // room for them and the stem already names the function.
          const cfg = buildChartConfig(q.choiceCharts[origIdx]);
          cfg.options.plugins = cfg.options.plugins || {};
          cfg.options.plugins.title = { display: false };
          if (cfg.options.scales && cfg.options.scales.x && cfg.options.scales.x.title) {
            cfg.options.scales.x.title.display = false;
          }
          if (cfg.options.scales && cfg.options.scales.y && cfg.options.scales.y.title) {
            cfg.options.scales.y.title.display = false;
          }
          // Smaller tick fonts to fit in the mini-chart.
          if (cfg.options.scales) {
            ['x', 'y'].forEach((ax) => {
              if (!cfg.options.scales[ax]) return;
              cfg.options.scales[ax].ticks = Object.assign({}, cfg.options.scales[ax].ticks, {
                font: { family: window.Chart.defaults.font.family, size: 10 },
              });
            });
          }
          const inst = new window.Chart(canvas.getContext('2d'), cfg);
          instances.push(inst);
        }
      });
      choiceChartRegistry.set(choiceGridEl, instances);
    } else {
      gridInEl.hidden = true;
      choicesEl.hidden = false;
      choicesEl.innerHTML = '';
      currentPerm.forEach((origIdx, displayIdx) => {
        const text = q.choices[origIdx];
        const id = `q-${q.id}-c-${displayIdx}`;
        const label = document.createElement('label');
        label.className = 'stl-choice';
        label.dataset.origIdx = String(origIdx);
        label.innerHTML = `
          <input type="radio" name="q-${q.id}" id="${id}" value="${origIdx}" />
          <span class="stl-choice__letter">${LETTERS[displayIdx] || (displayIdx + 1)}</span>
          <span class="stl-choice__text"></span>
        `;
        // innerHTML used here because formatRich produces sanitized HTML
        // (escaped source + known-good wrapper tags for variables and math).
        label.querySelector('.stl-choice__text').innerHTML = formatRich(text);
        label.addEventListener('click', () => selectChoice(label, origIdx));
        choicesEl.appendChild(label);
      });
    }

    $$('.stl-signal__btn').forEach((b) => { b.disabled = false; });
  };

  const selectChoice = (labelEl, origIdx) => {
    $$('.stl-choice', $('#quiz-choices')).forEach((el) => el.classList.remove('is-selected'));
    labelEl.classList.add('is-selected');
    currentPick = origIdx;
    const input = labelEl.querySelector('input');
    if (input) input.checked = true;
  };

  // Variant for chart-grid choices: cards live in #quiz-choice-grid
  // instead of the radio-group fieldset, but the selection semantics
  // are identical.
  const selectChoiceCard = (cardEl, origIdx) => {
    $$('.stl-choice--chart', $('#quiz-choice-grid')).forEach((el) => el.classList.remove('is-selected'));
    cardEl.classList.add('is-selected');
    currentPick = origIdx;
  };

  // Correctness check is now polymorphic over multiple-choice and grid-in.
  // For MC: `picked` is the original index, `q.answer` is the index — exact match.
  // For grid-in: `picked` is whatever the student typed (a string), and we
  // compare normalized numeric values so "1/2" / "0.5" / ".5" all match.
  const isCorrect = (q, picked) => {
    if (picked == null) return false;
    if (isGridIn(q)) {
      const a = normalizeAnswer(picked);
      const b = normalizeAnswer(q.answer);
      if (!isFinite(a) || !isFinite(b)) return false;
      // Tolerate tiny float noise (e.g., 1/3 vs .333…).
      return Math.abs(a - b) < 1e-6;
    }
    return Number(picked) === Number(q.answer);
  };

  // Inline "needs answer" error UX. Shown when the user hits Green or
  // Yellow without picking/typing first. Highlights the relevant input
  // surface (grid-in input border, or MC choices fieldset glow), swaps
  // the signal-help line into a red error, and auto-clears the moment
  // the user does something — types into the input or picks a choice.
  // A 4.5s timeout is the safety net in case neither happens.
  let answerErrorClearFns = [];
  const clearAnswerError = () => {
    answerErrorClearFns.forEach((fn) => { try { fn(); } catch (_) {} });
    answerErrorClearFns = [];
  };
  const showAnswerError = (gridIn) => {
    const help = $('.stl-quiz__signal-help');
    const helpDefault = help.dataset.defaultText || help.textContent;
    if (!help.dataset.defaultText) help.dataset.defaultText = helpDefault;

    // Re-trigger the error animation if it's already showing.
    clearAnswerError();
    help.classList.remove('is-error');
    void help.offsetWidth;  // force reflow so the animation re-runs

    help.textContent = gridIn
      ? 'Type an answer first — Green and Yellow lock in your response.'
      : 'Pick an answer first — Green and Yellow lock in your selection.';
    help.classList.add('is-error');

    let inputEl, choicesEl, gridEl;
    const onFix = () => clearAnswerError();

    if (gridIn) {
      inputEl = $('#quiz-gridin-input');
      inputEl.classList.add('is-error');
      inputEl.focus();
      inputEl.addEventListener('input', onFix);
    } else {
      choicesEl = $('#quiz-choices');
      gridEl    = $('#quiz-choice-grid');
      choicesEl.classList.add('is-error');
      gridEl.classList.add('is-error');
      // Either a radio-input choice or a chart-choice button picks the
      // answer. Both bubble click events on their ancestors, so a
      // single delegated listener clears the error.
      choicesEl.addEventListener('click', onFix);
      gridEl.addEventListener('click', onFix);
    }

    const timeout = setTimeout(clearAnswerError, 4500);

    answerErrorClearFns.push(() => {
      clearTimeout(timeout);
      help.classList.remove('is-error');
      help.textContent = helpDefault;
      if (inputEl) {
        inputEl.classList.remove('is-error');
        inputEl.removeEventListener('input', onFix);
      }
      if (choicesEl) {
        choicesEl.classList.remove('is-error');
        choicesEl.removeEventListener('click', onFix);
      }
      if (gridEl) {
        gridEl.classList.remove('is-error');
        gridEl.removeEventListener('click', onFix);
      }
    });
  };

  const handleSignal = (signal) => {
    const q = state.test[state.cursor];
    const gridIn = isGridIn(q);

    // For grid-in questions, pull the typed value just-in-time so the user
    // can keep typing right up until they hit a signal button.
    let pick = currentPick;
    if (gridIn) {
      const raw = $('#quiz-gridin-input').value.trim();
      pick = raw === '' ? null : raw;
    }

    if (pick == null && signal !== 'red') {
      showAnswerError(gridIn);
      return;
    }
    // User answered — wipe any lingering error state from a prior attempt.
    clearAnswerError();
    state.answers.push({
      qid: q.id,
      picked: pick,                          // string for grid-in, index for MC
      signal,
      correct: isCorrect(q, pick),
      perm: currentPerm ? currentPerm.slice() : null,  // null for grid-in
    });

    state.cursor += 1;
    if (state.cursor >= state.test.length) {
      showResults();
    } else {
      // Slide the answered card off to the left and slide the next
      // card in from the right — iOS-style page advance. Forward is
      // the default direction so we omit the third arg.
      withTransition(renderQuestion);
    }
  };

  const handleSkip = () => {
    const q = state.test[state.cursor];
    state.answers.push({
      qid: q.id,
      picked: null,
      signal: 'skip',
      correct: false,
      perm: currentPerm ? currentPerm.slice() : null,
    });
    state.cursor += 1;
    if (state.cursor >= state.test.length) {
      showResults();
    } else {
      withTransition(renderQuestion);
    }
  };

  const initQuiz = () => {
    $$('.stl-signal__btn').forEach((btn) => {
      btn.addEventListener('click', () => handleSignal(btn.dataset.signal));
    });
    $('#btn-skip-question').addEventListener('click', handleSkip);

    // Grid-in input: Enter key visually locks the entered value (like
    // selecting a choice) so the next signal click feels paired with the
    // user's commitment. The actual signal handling still pulls the live
    // value, so Enter is purely affordance — they can keep editing if
    // they haven't picked a signal yet.
    const gridInput = $('#quiz-gridin-input');
    if (gridInput) {
      gridInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (gridInput.value.trim() !== '') {
            gridInput.classList.add('is-locked');
          }
        }
      });
      gridInput.addEventListener('input', () => {
        gridInput.classList.remove('is-locked');
      });
    }
  };

  // ----- results ---------------------------------------------------------
  const showResults = (opts = {}) => {
    // Freeze the test duration BEFORE the screen transition kicks off
    // so the results snapshot has the final value baked in. After this
    // call, totalElapsedMs() returns the locked-in total.
    stopTimer();

    // Persist the attempt to localStorage on the way to the results
    // screen. Skip when:
    //   • viewing a shared attempt (someone else's data — not ours)
    //   • opts.skipSave is set (re-rendering an already-saved attempt
    //     from history)
    //   • opts.synthetic is set (dev Test fixture; tagged so it's
    //     filterable, but still saved so we can debug the storage path)
    if (!viewingShared && !opts.skipSave) {
      const att = buildAttemptFromState({ synthetic: !!opts.synthetic });
      if (att) saveAttempt(att);
    }
    const total = state.test.length;
    // Bucket the answers into the three review categories. The walk-through
    // lives in this order: True Mastery (green + correct) → Lucky (correct
    // but not green) → To Review (missed or skipped). Stat-box clicks on
    // the results screen jump directly to the bucket boundary indices.
    const trueMasteryAnswers = state.answers.filter((a) => a.correct && a.signal === 'green');
    const luckyAnswers       = state.answers.filter((a) => a.correct && a.signal !== 'green');
    const toReviewAnswers    = state.answers.filter((a) => !a.correct);

    const trueMastery = trueMasteryAnswers.length;
    const lucky       = luckyAnswers.length;
    const correct     = trueMastery + lucky;
    const toReview    = toReviewAnswers.length;

    state.reviewItems = [...trueMasteryAnswers, ...luckyAnswers, ...toReviewAnswers]
      .map((a) => ({ ...a, question: state.test.find((q) => q.id === a.qid) }));

    // Bucket-start indices for jump-to navigation. `correct` jumps to
    // the start of all-correct items (= start of true mastery, or the
    // start of lucky if no true mastery exists).
    state.reviewBuckets = {
      trueMastery: 0,
      correct: 0,
      lucky: trueMastery,
      toReview: trueMastery + lucky,
    };
    state.reviewBucketCounts = { trueMastery, correct, lucky, toReview };
    state.reviewCursor = 0;

    const pct = Math.round((correct / total) * 100);
    let headline = 'Nice work.';
    if (pct >= 90) headline = 'Outstanding.';
    else if (pct >= 75) headline = 'Strong showing.';
    else if (pct >= 50) headline = 'Solid baseline — let’s tighten things up.';
    else headline = 'Lots of room to grow — that’s why you’re here.';

    // writeStats runs INSIDE the View Transition update so the results
    // screen's post-transition snapshot already has the final values —
    // this keeps the morph from a card with empty numbers to a card
    // with full numbers, which would crossfade awkwardly. We seed each
    // stat at 0 here, then count up after the VT settles below.
    const writeStats = () => {
      $('#stat-correct').textContent = `0/${total}`;
      $('#stat-true-mastery').textContent = '0';
      $('#stat-lucky').textContent = '0';
      $('#stat-review').textContent = '0';
      // Pacing meta — total elapsed plus a per-question average.
      // Time is value-neutral (no count-up animation): we set the
      // final values directly so they land in the post-VT snapshot.
      const totalMs = totalElapsedMs();
      $('#stat-total-time').textContent = formatDuration(totalMs);
      $('#stat-avg-time').textContent = formatPace(total > 0 ? totalMs / total : 0);

      $('#results-headline').textContent = headline;
      $('#results-sub').textContent =
        `You answered ${correct} of ${total} correctly. ${trueMastery} were true mastery (green + correct), ` +
        `${lucky} were correct but not confident, and ${toReview} need review.`;

      // Disable each stat-box button when its bucket is empty so the
      // user gets a "nothing here" affordance rather than a no-op click.
      const setBucketEnabled = (id, count) => {
        const el = $(id);
        if (!el) return;
        const empty = count === 0;
        el.disabled = empty;
        el.setAttribute('aria-disabled', empty ? 'true' : 'false');
        el.title = empty ? 'No questions in this bucket.' : 'Walk through these in review';
      };
      setBucketEnabled('#stat-card-true-mastery', trueMastery);
      setBucketEnabled('#stat-card-correct', correct);
      setBucketEnabled('#stat-card-lucky', lucky);
      setBucketEnabled('#stat-card-review', toReview);

      const reviewBtn = $('#btn-start-review');
      const tailoredBtn = $('#btn-results-tailored');
      const troubleBtn = $('#btn-save-trouble');
      reviewBtn.disabled = state.reviewItems.length === 0;
      // Tailored test focuses on missed topics — only meaningful if any
      // questions actually need review.
      tailoredBtn.disabled = toReview === 0;
      // Trouble PDF compiles every non-True-Mastery item. Disable on
      // perfect runs since there'd be nothing to save.
      const troubleCount = lucky + toReview;
      if (troubleBtn) {
        troubleBtn.disabled = troubleCount === 0;
        troubleBtn.title = troubleCount === 0
          ? 'Perfect mastery — no trouble problems to save.'
          : 'Save the ' + troubleCount + ' trouble problems as a PDF for offline studying';
      }
      // Hero button has two children: the label and a small (N) count
      // pill. We update both so the disabled "Nothing to review" state
      // still reads cleanly without the count.
      const reviewCountPill = $('#review-count-pill');
      if (state.reviewItems.length === 0) {
        // Replace contents entirely with the disabled-state label.
        reviewBtn.innerHTML = 'Nothing to review';
      } else {
        reviewBtn.innerHTML = 'Walk through review ' +
          '<span class="stl-btn__count" id="review-count-pill" aria-hidden="true">' +
          '(' + state.reviewItems.length + ')</span>';
      }
      tailoredBtn.title =
        toReview === 0
          ? 'Perfect mastery — no missed topics to drill.'
          : '';
    };

    showScreen('results', writeStats).then(() => {
      // The screen morph has finished — now run the deliberate
      // count-ups so the numbers feel earned, not just printed.
      // ease-out cubic in countTo gives them a natural deceleration.
      countTo($('#stat-true-mastery'), trueMastery);
      countTo($('#stat-lucky'), lucky);
      countTo($('#stat-review'), toReview);
      countTo($('#stat-correct'), correct, (n) => `${n}/${total}`);
    });
  };

  const launchTailored = () => {
    const topics = new Set(state.reviewItems.map((r) => r.question.topic));
    if (topics.size === 0) {
      // Defensive: tailored is disabled when there are no misses, but if someone
      // hits this path, fall back to a fresh regular test.
      startTest(state.score);
    } else {
      startTest(state.score, topics);
    }
  };

  const initResults = () => {
    $('#btn-start-review').addEventListener('click', () => {
      if (state.reviewItems.length === 0) return;
      state.reviewCursor = 0;
      // Render the first review item inside the VT update so the
      // results → review screen change morphs to a populated review
      // card, not an empty one that pops in afterwards.
      showScreen('review', renderReview);
    });
    $('#btn-results-tailored').addEventListener('click', launchTailored);
    $('#btn-results-fresh').addEventListener('click', () => startTest(state.score));
    $('#btn-share-score').addEventListener('click', shareScore);
    $('#btn-save-trouble').addEventListener('click', saveTroubleProblems);

    // Stat-box click → jump to that bucket in the review walk-through.
    // The cursor is pre-set to the bucket's start index, so e.g.
    // clicking "To review" skips past the corrects and starts at the
    // first missed item. Empty buckets are disabled at writeStats time;
    // we still no-op here as a defensive guard.
    const jumpToBucket = (bucketKey) => {
      if (!state.reviewItems || state.reviewItems.length === 0) return;
      const counts = state.reviewBucketCounts || {};
      if (!counts[bucketKey]) return;          // empty bucket
      const idx = (state.reviewBuckets || {})[bucketKey] || 0;
      state.reviewCursor = idx;
      showScreen('review', renderReview);
    };
    document.querySelectorAll('.stl-stat[data-bucket]').forEach((el) => {
      el.addEventListener('click', () => jumpToBucket(el.dataset.bucket));
    });
  };

  // ----- review ----------------------------------------------------------
  // Map an answer to a {label, state} pair for the result pill. The
  // state drives CSS coloring (green for mastery, yellow for lucky,
  // red for missed, muted for skipped). The pill used to carry the
  // *difficulty* color while saying things like "missed · green",
  // which conflated two unrelated dimensions and confused students;
  // the new states map outcome ↔ outcome.
  //
  //   correct + green       → "True mastery"      (green; celebrate)
  //   correct + yellow/red  → "Lucky"             (yellow; you got there but weren't sure)
  //   incorrect + green     → "Confident miss"    (red, stronger; you thought you knew — most
  //                                                actionable case for review)
  //   incorrect + yellow/red→ "Missed"            (red)
  //   skipped               → "Skipped"           (muted)
  const reviewResultBadge = (item) => {
    if (item.signal === 'skip' || item.picked == null) {
      return { label: 'Skipped', state: 'skipped' };
    }
    if (item.correct && item.signal === 'green') {
      return { label: 'True mastery', state: 'mastery' };
    }
    if (item.correct) {
      return { label: 'Lucky', state: 'lucky' };
    }
    if (item.signal === 'green') {
      return { label: 'Confident miss', state: 'missed-confident' };
    }
    return { label: 'Missed', state: 'missed' };
  };

  const renderReview = () => {
    const item = state.reviewItems[state.reviewCursor];
    const q = item.question;
    $('#review-counter').textContent = `Review ${state.reviewCursor + 1} of ${state.reviewItems.length}`;

    const badge = reviewResultBadge(item);
    const resultEl = $('#review-result');
    resultEl.textContent = badge.label;
    resultEl.removeAttribute('data-d');
    resultEl.setAttribute('data-result', badge.state);

    $('#review-topic').textContent = q.topic;

    // figure (graph / table / diagram) for review — same render path
    // as the quiz screen. See renderFigure() for the image-vs-table split.
    renderFigure($('#review-figure'), q);

    const passageEl = $('#review-passage');
    if (q.passage) {
      passageEl.innerHTML = formatRich(q.passage);
      passageEl.hidden = false;
    } else {
      passageEl.hidden = true;
    }
    $('#review-stem').innerHTML = formatRich(q.stem);

    const choicesEl = $('#review-choices');
    choicesEl.innerHTML = '';

    // Tear down any prior review-mode chart-choice canvases before
    // re-rendering for the current review item.
    const reviewGridEl = $('#review-choice-grid');
    destroyChoiceCharts(reviewGridEl);
    reviewGridEl.innerHTML = '';
    reviewGridEl.hidden = true;

    const usesChoiceChartsR = !isGridIn(q) && Array.isArray(q.choiceCharts) && q.choiceCharts.length === q.choices.length;

    if (usesChoiceChartsR) {
      // Render the same 4 charts but with correct / picked-wrong marks.
      reviewGridEl.hidden = true;     // briefly to swap modes
      choicesEl.hidden = true;
      reviewGridEl.hidden = false;
      themeChart();
      const perm = Array.isArray(item.perm) ? item.perm : q.choices.map((_, i) => i);
      const instances = [];
      perm.forEach((origIdx, displayIdx) => {
        const card = document.createElement('div');
        card.className = 'stl-choice--chart';
        const isAnswer = origIdx === Number(q.answer);
        const isPicked = origIdx === Number(item.picked);
        if (isAnswer) card.dataset.state = 'correct';
        else if (isPicked) card.dataset.state = 'picked-wrong';
        card.innerHTML = `<span class="stl-choice__letter">${LETTERS[displayIdx] || (displayIdx + 1)}</span>`;
        const canvas = document.createElement('canvas');
        card.appendChild(canvas);
        reviewGridEl.appendChild(card);
        if (window.Chart) {
          const cfg = buildChartConfig(q.choiceCharts[origIdx]);
          cfg.options.plugins = cfg.options.plugins || {};
          cfg.options.plugins.title = { display: false };
          if (cfg.options.scales && cfg.options.scales.x && cfg.options.scales.x.title) cfg.options.scales.x.title.display = false;
          if (cfg.options.scales && cfg.options.scales.y && cfg.options.scales.y.title) cfg.options.scales.y.title.display = false;
          if (cfg.options.scales) {
            ['x','y'].forEach((ax) => {
              if (!cfg.options.scales[ax]) return;
              cfg.options.scales[ax].ticks = Object.assign({}, cfg.options.scales[ax].ticks, {
                font: { family: window.Chart.defaults.font.family, size: 10 },
              });
            });
          }
          instances.push(new window.Chart(canvas.getContext('2d'), cfg));
        }
      });
      choiceChartRegistry.set(reviewGridEl, instances);
    } else if (isGridIn(q)) {
      // Grid-in review: show the typed answer vs. the expected answer.
      const li = document.createElement('li');
      const correct = item.correct;
      li.dataset.state = correct ? 'correct' : 'picked-wrong';
      li.innerHTML = `
        <span class="stl-choice__letter">${correct ? '✓' : '✗'}</span>
        <span class="stl-choice__text"></span>
      `;
      const yourAnswer = item.picked == null ? '(skipped)' : item.picked;
      li.querySelector('.stl-choice__text').textContent =
        `You typed: ${yourAnswer}   ·   Correct: ${q.answer}`;
      choicesEl.appendChild(li);
    } else {
      const perm = Array.isArray(item.perm) ? item.perm : q.choices.map((_, i) => i);
      perm.forEach((origIdx, displayIdx) => {
        const text = q.choices[origIdx];
        const li = document.createElement('li');
        const isAnswer = origIdx === Number(q.answer);
        const isPicked = origIdx === Number(item.picked);
        let mark = '';
        if (isAnswer) mark = 'correct';
        else if (isPicked) mark = 'picked-wrong';
        if (mark) li.dataset.state = mark;
        li.innerHTML = `
          <span class="stl-choice__letter">${LETTERS[displayIdx] || (displayIdx + 1)}</span>
          <span class="stl-choice__text"></span>
        `;
        // Render math + italicized variables, then append a marker.
        const trailing = isAnswer ? '   ✓ correct' : (isPicked ? '   ✗ your answer' : '');
        li.querySelector('.stl-choice__text').innerHTML = formatRich(text) + escapeHtml(trailing);
        choicesEl.appendChild(li);
      });
    }

    $('#review-explanation').innerHTML = formatRich(q.explanation || '');
    $('#btn-review-prev').disabled = state.reviewCursor === 0;
    $('#btn-review-next').textContent =
      state.reviewCursor === state.reviewItems.length - 1 ? 'Finish review' : 'Next';
  };

  const initReview = () => {
    $('#btn-review-prev').addEventListener('click', () => {
      if (state.reviewCursor > 0) {
        state.reviewCursor -= 1;
        // Backward navigation: card exits right, new enters from left.
        withTransition(renderReview, 'back');
      }
    });
    $('#btn-review-next').addEventListener('click', () => {
      if (state.reviewCursor < state.reviewItems.length - 1) {
        state.reviewCursor += 1;
        withTransition(renderReview);
      } else {
        showRegen();
      }
    });
  };

  // ----- regen -----------------------------------------------------------
  const showRegen = () => {
    const topics = new Set(state.reviewItems.map((r) => r.question.topic));
    const tailoredBtn = $('#btn-regen-tailored');

    const writeRegen = () => {
      if (topics.size === 0) {
        $('#regen-sub').textContent =
          'You nailed this round — no missed topics to drill. Take a fresh test or restart with a new score.';
        tailoredBtn.disabled = true;
      } else {
        $('#regen-sub').textContent =
          `Drill the ${topics.size} topic(s) you missed (${[...topics].join(', ')}), take a fresh randomized test, or start over.`;
        tailoredBtn.disabled = false;
      }
    };

    showScreen('regen', writeRegen);
  };

  const initRegen = () => {
    $('#btn-regen-tailored').addEventListener('click', launchTailored);
    $('#btn-regen-fresh').addEventListener('click', () => startTest(state.score));
    // "Start over with a new score" returns to the home screen, so the
    // card slide reverses — feels like backing out, not advancing.
    // The timer was already stopped at showResults; clearTimer() resets
    // it to 0:00 so the next test starts fresh.
    $('#btn-regen-no').addEventListener('click', () => {
      clearTimer();
      showScreen('score', null, 'back');
    });
  };

  // ----- restart ---------------------------------------------------------
  const initRestart = () => {
    $('#btn-restart').addEventListener('click', () => {
      if (confirm('Restart and lose this attempt?')) {
        state.test = [];
        state.answers = [];
        state.cursor = 0;
        // Mid-test abort — kill the running timer too.
        clearTimer();
        // Same as regen: explicit return to home, so slide reverses.
        showScreen('score', null, 'back');
      }
    });
  };

  // ----- print: trouble problems → PDF -----------------------------------
  // Builds a print-only section in the document containing the user's
  // trouble problems (everything not "correct + green"). When the user
  // clicks Save trouble problems, we generate this section, call
  // window.print(), and let the browser's Save-as-PDF flow take it from
  // there. No PDF library — the print engine handles the layout.

  // Per-question article HTML for the print view.
  const buildPrintQuestionHtml = (item, idx) => {
    const q = item.question;
    const badge = reviewResultBadge(item);
    let parts = [];

    parts.push('<header class="stl-print-q__head">');
    parts.push('<span class="stl-print-q__num">' + (idx + 1) + '.</span>');
    parts.push('<span class="stl-print-q__meta">' +
      escapeHtml(q.topic) + ' · ' +
      escapeHtml(q.difficulty) + ' · ' +
      escapeHtml(badge.label) +
    '</span>');
    parts.push('</header>');

    // Figure: image, SVG, or table render inline. Charts are placeholder-
    // only in V1 since their dark-themed canvases would print as a black
    // blob against white paper. Re-rendering each chart with a light
    // theme at print time is a future iteration.
    if (q.image) {
      parts.push('<figure class="stl-print-q__figure" data-kind="image">' +
        '<img src="' + escapeHtml(q.image) + '" alt="' + escapeHtml(q.imageAlt || '') + '" />' +
      '</figure>');
    } else if (q.svg) {
      // SVG markup is inlined directly (already escaped/clean from questions.js).
      parts.push('<figure class="stl-print-q__figure" data-kind="svg">' + q.svg + '</figure>');
    } else if (q.table) {
      parts.push('<figure class="stl-print-q__figure" data-kind="table"><table>');
      if (q.table.caption) parts.push('<caption>' + escapeHtml(q.table.caption) + '</caption>');
      if (Array.isArray(q.table.headers) && q.table.headers.length) {
        parts.push('<thead><tr>');
        q.table.headers.forEach((h) => {
          parts.push('<th>' + escapeHtml(String(h)) + '</th>');
        });
        parts.push('</tr></thead>');
      }
      if (Array.isArray(q.table.rows)) {
        parts.push('<tbody>');
        q.table.rows.forEach((row) => {
          parts.push('<tr>');
          row.forEach((cell, j) => {
            const tag = (j === 0 && q.table.firstColIsHeader) ? 'th' : 'td';
            parts.push('<' + tag + '>' + escapeHtml(String(cell)) + '</' + tag + '>');
          });
          parts.push('</tr>');
        });
        parts.push('</tbody>');
      }
      parts.push('</table></figure>');
    } else if (q.chart || q.choiceCharts) {
      parts.push('<figure class="stl-print-q__figure stl-print-q__figure--placeholder">' +
        '[Figure — open in the app for the live chart]' +
      '</figure>');
    }

    parts.push('<p class="stl-print-q__stem">' + formatRich(q.stem) + '</p>');

    if (Array.isArray(q.choices) && q.choices.length > 0) {
      // Multiple-choice: each line is a choice; correct is bold-green,
      // picked-wrong is struck-through red. Letters use display order.
      const perm = Array.isArray(item.perm) ? item.perm : q.choices.map((_, i) => i);
      parts.push('<ol class="stl-print-q__choices">');
      perm.forEach((origIdx, displayIdx) => {
        const text = q.choices[origIdx];
        const isAnswer = origIdx === Number(q.answer);
        const isPicked = origIdx === Number(item.picked);
        const cls = [];
        if (isAnswer) cls.push('is-correct');
        else if (isPicked) cls.push('is-picked');
        const mark = isAnswer ? ' <span class="stl-print-q__mark">✓ correct</span>'
                  : (isPicked ? ' <span class="stl-print-q__mark">✗ your answer</span>' : '');
        parts.push('<li class="stl-print-q__choice ' + cls.join(' ') + '">' +
          '<span class="stl-print-q__letter">' + (LETTERS[displayIdx] || (displayIdx + 1)) + ')</span> ' +
          formatRich(text) + mark +
        '</li>');
      });
      parts.push('</ol>');
    } else {
      // Grid-in: show student's typed answer + the canonical correct answer.
      const yourRaw = item.picked == null ? '(skipped)' : item.picked;
      parts.push('<p class="stl-print-q__gridin">' +
        '<strong>Correct:</strong> ' + escapeHtml(String(q.answer)) +
        ' &nbsp;·&nbsp; <strong>Your answer:</strong> ' + escapeHtml(String(yourRaw)) +
      '</p>');
    }

    if (q.explanation) {
      parts.push('<p class="stl-print-q__expl">' +
        '<strong>Explanation.</strong> ' + formatRich(q.explanation) +
      '</p>');
    }

    return '<article class="stl-print-q">' + parts.join('') + '</article>';
  };

  // Build the full print HTML (header + all trouble articles).
  const buildPrintHtml = (trouble) => {
    const total = state.test.length;
    const totalMs = totalElapsedMs();
    const dateStr = new Date().toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    let html = '<header class="stl-print-head">' +
      '<h1>SAT Traffic Lights · Trouble Problems</h1>' +
      '<p class="stl-print-head__meta">' +
        trouble.length + ' of ' + total + ' questions to study · ' +
        'target ' + state.score + ' · ' +
        formatDuration(totalMs) + ' elapsed · ' +
        escapeHtml(dateStr) +
      '</p>' +
    '</header>';
    trouble.forEach((item, i) => {
      html += buildPrintQuestionHtml(item, i);
    });
    return html;
  };

  // The full save-trouble-problems flow.
  const saveTroubleProblems = () => {
    if (!state.reviewItems || state.reviewItems.length === 0) return;
    const trouble = state.reviewItems.filter((item) => !(item.correct && item.signal === 'green'));
    if (trouble.length === 0) {
      alert('Perfect mastery — no trouble problems to save.');
      return;
    }

    // Replace any prior print root (idempotent across multiple clicks).
    let printRoot = document.getElementById('stl-print-root');
    if (printRoot && printRoot.parentNode) {
      printRoot.parentNode.removeChild(printRoot);
    }
    printRoot = document.createElement('section');
    printRoot.id = 'stl-print-root';
    printRoot.className = 'stl-print-root';
    printRoot.innerHTML = buildPrintHtml(trouble);
    document.body.appendChild(printRoot);

    // Cleanup when the print dialog closes (success OR cancel). Wired
    // BEFORE we trigger printing so we don't miss the event.
    const onAfterPrint = () => {
      const root = document.getElementById('stl-print-root');
      if (root && root.parentNode) root.parentNode.removeChild(root);
      window.removeEventListener('afterprint', onAfterPrint);
    };
    window.addEventListener('afterprint', onAfterPrint);

    // Tiny delay lets the print-root paint into the DOM and any inline
    // SVGs settle their layout before the print dialog snapshots them.
    window.setTimeout(() => {
      window.print();
    }, 50);
  };

  // ----- dev-only "Test" affordance --------------------------------------
  // Hostname-based local check. Permissive on the local side (localhost,
  // loopback, RFC1918 LAN ranges, .local, file://) so phone testing on a
  // dev-server LAN URL still gets the button. Anything matching a
  // public-deploy hostname (vercel, github.io, custom domain) returns
  // false, hides the button, and short-circuits the click handler.
  const isLocalHost = () => {
    if (typeof window === 'undefined') return false;
    if (window.location.protocol === 'file:') return true;
    const h = window.location.hostname;
    if (!h) return false;
    if (h === 'localhost' || h === '127.0.0.1' || h === '0.0.0.0' || h === '::1') return true;
    if (h.endsWith('.local') || h.endsWith('.localhost')) return true;
    // RFC1918 private ranges
    if (/^10\./.test(h)) return true;
    if (/^192\.168\./.test(h)) return true;
    if (/^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
    return false;
  };

  // Build a complete-looking finished-test state from random data — used
  // only by the dev Test button. Picks 30 random questions from the
  // bank, generates plausibly-distributed answers (some correct, some
  // not, with a realistic spread of confidence signals), and writes
  // straight into state. Caller is responsible for setting timer state
  // and calling showResults to render.
  const buildRandomCompletedTest = () => {
    const bank = window.STL_QUESTIONS || [];
    if (bank.length === 0) return { test: [], answers: [] };
    const test = shuffle(bank).slice(0, Math.min(TEST_LENGTH, bank.length));
    const answers = test.map((q) => {
      // 10% genuinely skipped (no answer typed/picked).
      if (Math.random() < 0.10) {
        return { qid: q.id, picked: null, signal: 'skip', correct: false, perm: null };
      }
      // Confidence signal — independent of correctness so the bucket
      // logic gets exercised across all 4 quadrants of (right/wrong) ×
      // (confident/not-confident).
      const sigRoll = Math.random();
      const signal = sigRoll < 0.35 ? 'green' : (sigRoll < 0.75 ? 'yellow' : 'red');
      const willBeCorrect = Math.random() < 0.55;       // 55% correct overall

      const isMC = Array.isArray(q.choices) && q.choices.length > 0;
      if (isMC) {
        const n = q.choices.length;
        const answerIdx = Number(q.answer);
        const picked = willBeCorrect
          ? answerIdx
          : ((answerIdx + 1 + Math.floor(Math.random() * (n - 1))) % n);
        const perm = shuffle(Array.from({ length: n }, (_, i) => i));
        return { qid: q.id, picked, signal, correct: picked === answerIdx, perm };
      }
      // Grid-in: feed back the canonical answer or an obviously-wrong string
      const picked = willBeCorrect ? String(q.answer) : '__dev_wrong__';
      return { qid: q.id, picked, signal, correct: willBeCorrect, perm: null };
    });
    return { test, answers };
  };

  const runDevTest = () => {
    if (!isLocalHost()) return;             // belt & suspenders — never run in prod
    if (!window.STL_QUESTIONS || window.STL_QUESTIONS.length === 0) return;
    const { test, answers } = buildRandomCompletedTest();
    if (test.length === 0) return;
    state.score = 690;                       // arbitrary tier choice; gives easy+medium+hard pool
    state.tiers = tiersForScore(state.score);
    state.test = test;
    state.answers = answers;
    state.cursor = test.length;
    // Fake elapsed time: 12–25 minutes, pre-frozen so stopTimer() (called
    // from showResults) doesn't overwrite testEndedAt to "now and 0 ago."
    const elapsedMs = (12 + Math.random() * 13) * 60 * 1000;
    state.testStartedAt = Date.now() - elapsedMs;
    state.testEndedAt = Date.now();
    if (state.timerHandle) {
      clearInterval(state.timerHandle);
      state.timerHandle = null;
    }
    showResults({ synthetic: true });
  };

  // ====================================================================
  // History screen + share/download/hydrate
  // ====================================================================

  // Tiny transient confirmation toast ("Link copied", etc.).
  let toastTimer = null;
  const toast = (msg) => {
    const el = $('#stl-toast');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    el.classList.add('is-visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove('is-visible');
      // Wait for fade-out before un-hiding to keep aria-live polite.
      setTimeout(() => { el.hidden = true; }, 220);
    }, 2200);
  };

  // Shape a relative date label for History row leads. "Just now",
  // "12 min ago", "Yesterday", "Apr 12" — feels human at a glance and
  // tabular-numeral typography keeps widths stable when stacked.
  const relativeDate = (ms) => {
    const d = new Date(ms);
    const now = new Date();
    const diffMs = now - d;
    const min = Math.floor(diffMs / 60000);
    const hr  = Math.floor(diffMs / 3600000);
    const day = Math.floor(diffMs / 86400000);
    if (diffMs < 60000)  return 'Just now';
    if (min < 60)        return min + ' min ago';
    if (hr  < 24)        return hr  + ' hr ago';
    if (day === 1)       return 'Yesterday';
    if (day < 7)         return day + ' days ago';
    if (d.getFullYear() === now.getFullYear()) {
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Compute headline counts the same way showResults does, so list rows
  // and the opened results screen agree.
  const attemptCounts = (att) => {
    const total       = att.questions ? att.questions.length : 0;
    const correct     = att.answers.filter((a) => a.correct).length;
    const trueMastery = att.answers.filter((a) => a.correct && a.signal === 'green').length;
    const lucky       = correct - trueMastery;
    const toReview    = total - correct;
    return { total, correct, trueMastery, lucky, toReview };
  };

  // Render the History list. Newest first. Each row is a button that
  // opens the attempt; the trailing icon-buttons handle per-row actions.
  const renderHistory = () => {
    const list = $('#history-list');
    const empty = $('#history-empty');
    const sub = $('#history-sub');
    if (!list) return;
    list.innerHTML = '';

    const attempts = loadAttempts().slice().sort((a, b) => b.completedAt - a.completedAt);
    if (attempts.length === 0) {
      empty.hidden = false;
      sub.textContent = "No saved attempts yet.";
      $('#btn-history-clear').disabled = true;
      $('#btn-history-export').disabled = true;
      return;
    }
    empty.hidden = true;
    sub.textContent = 'Open one to revisit the results and walk through review again.';
    $('#btn-history-clear').disabled = false;
    $('#btn-history-export').disabled = false;

    attempts.forEach((att) => {
      const { total, correct, trueMastery, lucky, toReview } = attemptCounts(att);
      const li = document.createElement('li');
      li.className = 'stl-history__row';
      if (att.synthetic) li.classList.add('is-synthetic');

      // Open is the row body — clickable everywhere except inside the
      // ⋯ menu. Per-row buttons stop propagation so they don't open.
      li.innerHTML =
        '<button type="button" class="stl-history__open" data-id="' + att.id + '">' +
          '<span class="stl-history__date">' + escapeHtml(relativeDate(att.completedAt)) +
            (att.synthetic ? ' <em class="stl-history__synth">synthetic</em>' : '') + '</span>' +
          '<span class="stl-history__target">Target ' + (att.targetScore || '—') + '</span>' +
          '<span class="stl-history__score">' + correct + '<small>/' + total + '</small></span>' +
          '<span class="stl-history__dots" aria-label="' +
              trueMastery + ' mastery, ' + lucky + ' lucky, ' + toReview + ' to review">' +
            '<span class="stl-history__dot stl-history__dot--g" style="--w:' + trueMastery + '"></span>' +
            '<span class="stl-history__dot stl-history__dot--y" style="--w:' + lucky       + '"></span>' +
            '<span class="stl-history__dot stl-history__dot--r" style="--w:' + toReview    + '"></span>' +
          '</span>' +
          '<span class="stl-history__time">' + formatDuration(att.totalElapsedMs) + '</span>' +
        '</button>' +
        '<div class="stl-history__actions">' +
          '<button type="button" class="stl-history__action" data-action="copy"   data-id="' + att.id + '" aria-label="Copy review link">Link</button>' +
          '<button type="button" class="stl-history__action" data-action="json"   data-id="' + att.id + '" aria-label="Download JSON">JSON</button>' +
          '<button type="button" class="stl-history__action stl-history__action--danger" data-action="delete" data-id="' + att.id + '" aria-label="Delete attempt">×</button>' +
        '</div>';
      list.appendChild(li);
    });
  };

  // ====================================================================
  // Hydrate state from a stored or shared attempt → results screen
  // ====================================================================
  // The renderer reads from state.test (array of question objects),
  // state.answers, state.score/tiers, and state.testStartedAt/EndedAt.
  // For a stored attempt we fully populate all of those from the
  // snapshots and then call showResults({ skipSave: true }).
  const hydrateFromAttempt = (att, opts = {}) => {
    if (!att || !att.questions || !att.answers) {
      toast("Couldn't open that attempt.");
      return false;
    }
    // Rebuild test as an array of question objects from the snaps.
    state.test = att.questions.map((q) => {
      const snap = q.snap || {};
      return {
        id: snap.id || q.qid,
        stem: snap.stem || '',
        choices: snap.choices || null,
        answer: snap.answer,
        explanation: snap.explanation || '',
        topic: snap.topic || '',
        difficulty: snap.difficulty || '',
        passage: snap.passage || null,
        figure: snap.figure || null,
        choiceCharts: snap.choiceCharts || null,
      };
    });
    state.answers = att.answers.map((a) => ({
      qid: a.qid, picked: a.picked, signal: a.signal,
      correct: a.correct, perm: a.perm,
    }));
    state.score = att.targetScore || 0;
    state.tiers = att.tiers ? att.tiers.slice() : [];
    state.restrictTopics = att.restrictTopics || null;
    state.cursor = state.test.length;
    // Bake the elapsed time so the meta-line renders the original
    // duration. testStartedAt anchors the math; testEndedAt freezes it.
    state.testStartedAt = att.startedAt || (Date.now() - (att.totalElapsedMs || 0));
    state.testEndedAt   = att.completedAt || (state.testStartedAt + (att.totalElapsedMs || 0));
    if (state.timerHandle) { clearInterval(state.timerHandle); state.timerHandle = null; }

    viewingShared = !!opts.shared;
    const banner = $('#shared-banner');
    if (banner) banner.hidden = !viewingShared;

    showResults({ skipSave: true });
    return true;
  };

  // ====================================================================
  // Share-link encoding (URL-safe base64 of compact JSON, no snaps)
  // ====================================================================
  // Recipient hydrates the lean payload, then either:
  //   • finds the qid in their bank → review works fully
  //   • doesn't find it → renders a "(question removed from bank)"
  //     placeholder so review still walks
  // Keeping snaps out of the URL holds shared links well under 2 KB
  // for a 30-question test.
  const b64urlEncode = (s) => btoa(unescape(encodeURIComponent(s)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const b64urlDecode = (s) => {
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    return decodeURIComponent(escape(atob(s)));
  };

  const encodeShareURL = (att) => {
    // Lean payload — no snaps, just qid + answer fields. Recipient
    // hydrates question content from their copy of the bank.
    const lean = {
      v: STL_SCHEMA_VERSION,
      ts: att.completedAt,
      tg: att.targetScore,
      ti: att.tiers,
      rt: att.restrictTopics,
      el: att.totalElapsedMs,
      qs: att.questions.map((q) => q.qid),
      as: att.answers.map((a) => [a.qid, a.picked, a.signal, a.correct ? 1 : 0, a.perm || null]),
    };
    const encoded = b64urlEncode(JSON.stringify(lean));
    const base = location.origin + location.pathname;
    return base + '?a=' + encoded;
  };

  // Try to parse and hydrate from a `?a=` URL param. Returns the
  // hydrated attempt object if successful, null otherwise.
  const decodeShareURL = (encoded) => {
    try {
      const lean = JSON.parse(b64urlDecode(encoded));
      if (!lean || lean.v !== STL_SCHEMA_VERSION) return null;
      const bank = window.STL_QUESTIONS || [];
      const findQ = (qid) => bank.find((q) => q.id === qid);

      const placeholderSnap = (qid) => ({
        id: qid, stem: '(This question is no longer in the bank.)',
        choices: null, answer: 0, explanation: '',
        topic: '', difficulty: '', passage: null, figure: null, choiceCharts: null,
      });

      return {
        v: STL_SCHEMA_VERSION,
        id: 'shared',
        synthetic: false,
        startedAt: (lean.ts || Date.now()) - (lean.el || 0),
        completedAt: lean.ts || Date.now(),
        totalElapsedMs: lean.el || 0,
        targetScore: lean.tg,
        tiers: lean.ti || [],
        restrictTopics: lean.rt || null,
        questions: (lean.qs || []).map((qid) => {
          const found = findQ(qid);
          return { qid, snap: found ? questionSnap(found) : placeholderSnap(qid) };
        }),
        answers: (lean.as || []).map((a) => ({
          qid: a[0], picked: a[1], signal: a[2], correct: !!a[3], perm: a[4],
        })),
      };
    } catch (e) {
      console.warn('stl: bad share URL', e);
      return null;
    }
  };

  const copyReviewLink = async (att) => {
    const url = encodeShareURL(att);
    try {
      await navigator.clipboard.writeText(url);
      toast('Review link copied — paste anywhere');
    } catch (e) {
      // Fallback for browsers without async clipboard (or in insecure
      // contexts). Use a hidden textarea + execCommand. Quietly works.
      const ta = document.createElement('textarea');
      ta.value = url; ta.setAttribute('readonly', ''); ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('Review link copied'); }
      catch (_) { prompt('Copy this review link:', url); }
      finally  { document.body.removeChild(ta); }
    }
  };

  // ====================================================================
  // JSON download — single attempt or full archive
  // (downloadBlob is defined earlier — share-card flow uses the same helper)
  // ====================================================================
  const safeFilenameDate = (ms) => new Date(ms).toISOString().slice(0, 10);
  const downloadAttemptJSON = (att) => {
    const blob = new Blob([JSON.stringify(att, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'studysignal-attempt-' + safeFilenameDate(att.completedAt) + '.json');
  };
  const downloadAllAttempts = () => {
    const all = loadAttempts();
    if (all.length === 0) { toast('Nothing to export'); return; }
    const blob = new Blob([JSON.stringify({
      v: STL_SCHEMA_VERSION,
      exportedAt: Date.now(),
      attempts: all,
    }, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'studysignal-history-' + safeFilenameDate(Date.now()) + '.json');
    toast('Downloaded ' + all.length + ' attempt' + (all.length === 1 ? '' : 's'));
  };

  // ====================================================================
  // History screen wiring
  // ====================================================================
  const initHistory = () => {
    const list = $('#history-list');
    if (!list) return;

    // Open is on the row body button. Per-row actions are siblings
    // with their own listener via event delegation on the list <ul>.
    list.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.stl-history__open');
      if (openBtn) {
        const id = openBtn.dataset.id;
        const att = getAttempt(id);
        if (!att) { toast("Couldn't find that attempt."); renderHistory(); return; }
        hydrateFromAttempt(att);
        showScreen('results');
        return;
      }
      const actionBtn = e.target.closest('.stl-history__action');
      if (actionBtn) {
        const id = actionBtn.dataset.id;
        const att = getAttempt(id);
        if (!att) { renderHistory(); return; }
        const action = actionBtn.dataset.action;
        if (action === 'copy')   copyReviewLink(att);
        if (action === 'json')   { downloadAttemptJSON(att); toast('Downloaded JSON'); }
        if (action === 'delete') {
          deleteAttempt(id);
          renderHistory();
          toast('Attempt deleted');
        }
      }
    });

    $('#btn-history-back').addEventListener('click', () => showScreen('score', null, 'back'));
    $('#btn-history-export').addEventListener('click', downloadAllAttempts);
    $('#btn-history-clear').addEventListener('click', () => {
      const n = loadAttempts().length;
      if (n === 0) return;
      if (!confirm('Clear all ' + n + ' saved attempts? This can\'t be undone.')) return;
      clearAttempts();
      renderHistory();
      toast('History cleared');
    });
  };

  // ====================================================================
  // Admin tool — questions database
  // ====================================================================
  // Reads from window.STL_QUESTIONS_ALL (assembled by the loader above),
  // computes per-question signal stats from local attempt history, and
  // wires Publish / Unpublish / Edit actions that persist to
  // localStorage stl_question_overrides.

  const ADMIN_FILTERS_DEFAULT = {
    search: '', state: 'all', source: 'all', difficulty: 'all', topic: 'all',
  };
  let adminFilters = { ...ADMIN_FILTERS_DEFAULT };

  // Compute signal × correctness counts for one qid by iterating every
  // saved attempt's answers. Cheap enough to recompute on every render
  // because attempt counts in localStorage are bounded (≤50). When the
  // backend lands, this becomes a SQL aggregate served by Supabase.
  const computeQuestionStats = (qid) => {
    const attempts = loadAttempts();
    let g = 0, y = 0, r = 0, total = 0, correct = 0;
    attempts.forEach((att) => {
      (att.answers || []).forEach((a) => {
        if (a.qid !== qid) return;
        total += 1;
        if (a.correct) correct += 1;
        if (a.signal === 'green')  g += 1;
        if (a.signal === 'yellow') y += 1;
        if (a.signal === 'red')    r += 1;
      });
    });
    return { g, y, r, total, correct };
  };

  // Friendly label for a state value.
  const stateLabel = (s) => ({
    'live': 'Live',
    'unpublished': 'Unpublished',
    'needs-review': 'Needs review',
  }[s] || s);

  // Truncate a stem to a single-line preview for the table cell.
  const stemPreview = (text, max = 90) => {
    const t = (text || '').replace(/\s+/g, ' ').trim();
    return t.length <= max ? t : t.slice(0, max - 1) + '…';
  };

  // Populate the topic dropdown from the bank — done once at admin
  // mount; the option set doesn't change at runtime.
  const populateTopicFilter = () => {
    const sel = $('#admin-filter-topic');
    if (!sel) return;
    const topics = Array.from(new Set(
      (window.STL_QUESTIONS_ALL || []).map((q) => q.topic).filter(Boolean)
    )).sort();
    // Preserve the leading "All topics" option, replace the rest.
    sel.innerHTML = '<option value="all">All topics</option>' +
      topics.map((t) => '<option value="' + escapeHtml(t) + '">' + escapeHtml(t) + '</option>').join('');
  };

  const filterAdminQuestions = () => {
    const all = window.STL_QUESTIONS_ALL || [];
    const f = adminFilters;
    const q = (f.search || '').toLowerCase().trim();
    return all.filter((item) => {
      if (f.state !== 'all'      && item.state !== f.state)           return false;
      if (f.source !== 'all'     && item.source !== f.source)         return false;
      if (f.difficulty !== 'all' && item.difficulty !== f.difficulty) return false;
      if (f.topic !== 'all'      && item.topic !== f.topic)           return false;
      if (q) {
        const haystack = (item.id + ' ' + (item.stem || '') + ' ' + (item.topic || '')).toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  };

  // Inline mini-bar for signal stats: green, yellow, red segments
  // weighted by attempt counts. Tiny visual version of the answer
  // distribution per question.
  const renderStatBar = (s) => {
    if (s.total === 0) return '<span class="stl-admin__stats-empty">—</span>';
    const g = (s.g / s.total) * 100, y = (s.y / s.total) * 100, r = (s.r / s.total) * 100;
    const pctCorrect = Math.round((s.correct / s.total) * 100);
    return (
      '<span class="stl-admin__stats">' +
        '<span class="stl-admin__statbar" aria-label="' +
          s.g + ' green, ' + s.y + ' yellow, ' + s.r + ' red, of ' + s.total + ' attempts">' +
          '<span class="stl-admin__statbar-seg stl-admin__statbar-seg--g" style="width:' + g + '%"></span>' +
          '<span class="stl-admin__statbar-seg stl-admin__statbar-seg--y" style="width:' + y + '%"></span>' +
          '<span class="stl-admin__statbar-seg stl-admin__statbar-seg--r" style="width:' + r + '%"></span>' +
        '</span>' +
        '<span class="stl-admin__stats-text">' + pctCorrect + '% · ' + s.total + 'x</span>' +
      '</span>'
    );
  };

  const renderAdminTable = () => {
    const tbody = $('#admin-tbody');
    const empty = $('#admin-empty');
    const summary = $('#admin-summary');
    if (!tbody) return;

    const all = window.STL_QUESTIONS_ALL || [];
    const filtered = filterAdminQuestions();
    const liveCount        = all.filter((q) => q.state === 'live').length;
    const unpublishedCount = all.filter((q) => q.state === 'unpublished').length;
    const reviewCount      = all.filter((q) => q.state === 'needs-review').length;
    const aiCount          = all.filter((q) => q.source === 'ai-generated').length;
    const humanCount       = all.filter((q) => q.source === 'human-curated').length;

    // KPI strip
    const setKpi = (sel, n) => { const el = $(sel); if (el) el.textContent = n; };
    setKpi('#kpi-total',       all.length);
    setKpi('#kpi-live',        liveCount);
    setKpi('#kpi-review',      reviewCount);
    setKpi('#kpi-unpublished', unpublishedCount);
    setKpi('#kpi-ai',          aiCount);
    setKpi('#kpi-human',       humanCount);

    summary.textContent = filtered.length === all.length
      ? 'Showing all ' + all.length + ' questions'
      : 'Showing ' + filtered.length + ' of ' + all.length + ' questions';

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    const rowsHtml = filtered.map((q) => {
      const s = computeQuestionStats(q.id);
      const stateBadge = '<span class="stl-admin__badge stl-admin__badge--' + q.state + '">' +
        escapeHtml(stateLabel(q.state)) + '</span>';
      const sourceBadge = '<span class="stl-admin__source stl-admin__source--' + q.source + '">' +
        (q.source === 'ai-generated' ? 'AI' : 'Human') + '</span>';
      const isLive = q.state === 'live';
      const toggleAction = isLive ? 'unpublish' : 'publish';
      const toggleLabel  = isLive ? 'Unpublish' : 'Publish';
      return (
        '<tr class="stl-admin__row" data-id="' + escapeHtml(q.id) + '">' +
          '<td class="stl-admin__td-id">' +
            '<div class="stl-admin__id">' + escapeHtml(q.id) + '</div>' +
            '<div class="stl-admin__id-stem">' + escapeHtml(stemPreview(q.stem)) + '</div>' +
          '</td>' +
          '<td>' + stateBadge + '</td>' +
          '<td>' + sourceBadge +
            '<div class="stl-admin__uploader">' + escapeHtml(q.uploader || '—') + '</div>' +
          '</td>' +
          '<td>' + escapeHtml(q.topic || '—') + '</td>' +
          '<td>' + escapeHtml(q.difficulty || '—') + '</td>' +
          '<td>' + renderStatBar(s) + '</td>' +
          '<td class="stl-admin__td-actions">' +
            '<button type="button" class="stl-history__action" data-action="' + toggleAction +
              '" data-id="' + escapeHtml(q.id) + '">' + toggleLabel + '</button>' +
            '<button type="button" class="stl-history__action" data-action="edit" data-id="' +
              escapeHtml(q.id) + '">Edit</button>' +
          '</td>' +
        '</tr>'
      );
    }).join('');

    tbody.innerHTML = rowsHtml;
  };

  // ----- edit modal ------------------------------------------------------
  let editingId = null;

  const openEditModal = (qid) => {
    const q = (window.STL_QUESTIONS_ALL || []).find((x) => x.id === qid);
    if (!q) { toast("Couldn't find that question"); return; }
    editingId = qid;
    $('#admin-modal-title').textContent = qid;

    $('#edit-stem').value        = q.stem        || '';
    $('#edit-explanation').value = q.explanation || '';
    $('#edit-topic').value       = q.topic       || '';
    $('#edit-difficulty').value  = q.difficulty  || 'medium';
    $('#edit-state').value       = q.state       || 'live';
    $('#edit-answer').value      = q.answer == null ? '' : String(q.answer);

    const choicesList = $('#edit-choices-list');
    choicesList.innerHTML = '';
    const choices = Array.isArray(q.choices) && q.choices.length ? q.choices : ['', '', '', ''];
    choices.forEach((c, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'stl-admin__choice-row';
      wrap.innerHTML =
        '<span class="stl-admin__choice-letter">' + LETTERS[i] + '</span>' +
        '<input type="text" class="stl-admin__input" data-choice-idx="' + i + '" value="' +
          escapeHtml(c) + '" />';
      choicesList.appendChild(wrap);
    });

    // Provenance + audit metadata
    const overrides = loadAdminOverrides();
    const ov = overrides[qid] || null;
    const meta = $('#edit-meta');
    meta.innerHTML =
      '<dl class="stl-admin__meta">' +
        '<div><dt>Source</dt><dd>' + escapeHtml(q.source || '—') + '</dd></div>' +
        '<div><dt>Uploader</dt><dd>' + escapeHtml(q.uploader || '—') + '</dd></div>' +
        '<div><dt>Created</dt><dd>' + escapeHtml(q.createdAt || '—') + '</dd></div>' +
        (ov ? '<div><dt>Last edit</dt><dd>' + escapeHtml(ov.updatedBy || '—') +
          ' · ' + escapeHtml(new Date(ov.updatedAt || 0).toLocaleString()) + '</dd></div>' : '') +
      '</dl>';

    $('#btn-edit-revert').disabled = !ov;

    const modal = $('#admin-modal');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('#edit-stem').focus(), 50);
  };

  const closeEditModal = () => {
    editingId = null;
    $('#admin-modal').hidden = true;
    document.body.style.overflow = '';
  };

  // Apply state changes via overrides — single source of truth.
  const setQuestionState = (qid, nextState) => {
    updateOverrides((overrides) => {
      const prior = overrides[qid] || {};
      overrides[qid] = {
        ...prior,
        state: nextState,
        updatedAt: Date.now(),
        updatedBy: 'joshua@sortino.co',
      };
      return overrides;
    });
    renderAdminTable();
    toast(qid + ' → ' + stateLabel(nextState));
  };

  // Save full edit from the modal form.
  const saveEditFromModal = () => {
    if (!editingId) return;
    const stem        = $('#edit-stem').value;
    const explanation = $('#edit-explanation').value;
    const topic       = $('#edit-topic').value.trim();
    const difficulty  = $('#edit-difficulty').value;
    const state       = $('#edit-state').value;
    const answerRaw   = $('#edit-answer').value.trim();

    // Choices: gather only non-empty ones; empty array means grid-in.
    const choiceEls = $$('input[data-choice-idx]');
    const choices = choiceEls.map((el) => el.value).filter((v) => v.trim() !== '');
    const isGridIn = choices.length === 0;
    const answer = isGridIn ? answerRaw : Number(answerRaw);

    if (!stem.trim()) { toast('Stem can\'t be empty'); return; }
    if (!isGridIn && (!Number.isFinite(answer) || answer < 0 || answer >= choices.length)) {
      toast('Answer must be a valid index into choices');
      return;
    }

    updateOverrides((overrides) => {
      const prior = overrides[editingId] || {};
      overrides[editingId] = {
        ...prior,
        stem,
        explanation,
        topic,
        difficulty,
        state,
        answer,
        choices: isGridIn ? null : choices,
        updatedAt: Date.now(),
        updatedBy: 'joshua@sortino.co',
      };
      return overrides;
    });

    renderAdminTable();
    closeEditModal();
    toast('Saved ' + editingId);
  };

  const revertOverride = (qid) => {
    updateOverrides((overrides) => {
      delete overrides[qid];
      return overrides;
    });
    renderAdminTable();
    closeEditModal();
    toast('Reverted ' + qid + ' to base');
  };

  // ----- admin screen wiring --------------------------------------------
  const initAdmin = () => {
    const tbody = $('#admin-tbody');
    if (!tbody) return;

    populateTopicFilter();
    renderAdminTable();

    // Filter inputs
    const onFilterChange = () => {
      adminFilters.search     = $('#admin-search').value;
      adminFilters.state      = $('#admin-filter-state').value;
      adminFilters.source     = $('#admin-filter-source').value;
      adminFilters.difficulty = $('#admin-filter-difficulty').value;
      adminFilters.topic      = $('#admin-filter-topic').value;
      renderAdminTable();
    };
    $('#admin-search').addEventListener('input', onFilterChange);
    $('#admin-filter-state').addEventListener('change', onFilterChange);
    $('#admin-filter-source').addEventListener('change', onFilterChange);
    $('#admin-filter-difficulty').addEventListener('change', onFilterChange);
    $('#admin-filter-topic').addEventListener('change', onFilterChange);

    // Row action delegation
    tbody.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) {
        // ⌘/Ctrl+click on the ID cell → copy id
        const idCell = e.target.closest('.stl-admin__td-id');
        if (idCell && (e.metaKey || e.ctrlKey)) {
          const row = idCell.closest('.stl-admin__row');
          const id = row && row.dataset.id;
          if (id) {
            navigator.clipboard.writeText(id).then(() => toast('Copied ' + id)).catch(() => {});
            e.preventDefault();
          }
        }
        return;
      }
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      if (action === 'publish')   setQuestionState(id, 'live');
      if (action === 'unpublish') setQuestionState(id, 'unpublished');
      if (action === 'edit')      openEditModal(id);
    });

    // Modal close handlers (backdrop click, ×, Cancel, Esc)
    $('#admin-modal').addEventListener('click', (e) => {
      if (e.target.dataset.modalClose === '1') closeEditModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !$('#admin-modal').hidden) closeEditModal();
    });

    // Save / Revert
    $('#admin-edit-form').addEventListener('submit', (e) => {
      e.preventDefault();
      saveEditFromModal();
    });
    $('#btn-edit-revert').addEventListener('click', () => {
      if (editingId && confirm('Drop your override and restore this question to its base values?')) {
        revertOverride(editingId);
      }
    });

    // Back button
    $('#btn-admin-back').addEventListener('click', () => showScreen('score', null, 'back'));

    // Reset filters
    const resetBtn = $('#btn-admin-clear-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        adminFilters = { ...ADMIN_FILTERS_DEFAULT };
        $('#admin-search').value = '';
        $('#admin-filter-state').value = 'all';
        $('#admin-filter-source').value = 'all';
        $('#admin-filter-difficulty').value = 'all';
        $('#admin-filter-topic').value = 'all';
        renderAdminTable();
      });
    }

    // Re-render whenever the bank is updated by any path.
    document.addEventListener('stl:bank-updated', renderAdminTable);
  };

  // ====================================================================
  // Auth wiring (login screen, header pill, role gate)
  // ====================================================================
  // The auth client (auth.js) handles the underlying state. This block
  // wires it to the DOM: login form, send-magic-link, demo-link click,
  // header user pill, and role-gated admin screen.

  const initAuth = () => {
    if (!window.STL_AUTH) return;

    // ---- header pill ----
    const headerAuth      = $('#header-auth');
    const signInBtn       = $('#btn-sign-in');
    const userBlock       = $('#header-user');
    const userEmailEl     = $('#header-user-email');
    const userRoleEl      = $('#header-user-role');
    const signOutBtn      = $('#btn-sign-out');

    const renderHeaderAuth = (user) => {
      if (!headerAuth) return;
      headerAuth.hidden = false;
      if (user) {
        signInBtn.hidden = true;
        userBlock.hidden = false;
        userEmailEl.textContent = user.email;
        userRoleEl.textContent = user.role === 'admin' ? 'Admin' : 'Member';
        userRoleEl.dataset.role = user.role;
      } else {
        signInBtn.hidden = false;
        userBlock.hidden = true;
      }
    };

    if (signInBtn) {
      signInBtn.addEventListener('click', () => {
        // From any screen, route to the login flow.
        showScreen('login');
      });
    }
    if (signOutBtn) {
      signOutBtn.addEventListener('click', async () => {
        await window.STL_AUTH.signOut();
        toast('Signed out');
        showScreen('score', null, 'back');
      });
    }

    // ---- login screen ----
    const loginForm     = $('#login-form');
    const loginEmail    = $('#login-email');
    const loginHint     = $('#login-hint');
    const loginSent     = $('#login-sent');
    const loginSentSub  = $('#login-sent-sub');
    const loginDemoBlk  = $('#login-demo');
    const loginDemoLnk  = $('#login-demo-link');
    const loginBack     = $('#btn-login-back');
    const modeTag       = $('#login-mode-tag');

    const showLoginForm = () => {
      loginForm.hidden = false;
      loginSent.hidden = true;
      loginEmail.value = '';
      loginHint.textContent = "We never share or sell your email.";
      loginHint.classList.remove('is-error');
    };

    const showLoginSent = ({ email, devLink }) => {
      loginForm.hidden = true;
      loginSent.hidden = false;
      loginSentSub.textContent = 'We sent a link to ' + email + '. It expires in 15 minutes.';
      if (devLink && window.STL_AUTH.mode === 'demo') {
        loginDemoBlk.hidden = false;
        loginDemoLnk.href = devLink;
      } else {
        loginDemoBlk.hidden = true;
      }
    };

    const updateModeTag = () => {
      if (!modeTag) return;
      const m = window.STL_AUTH.mode;
      modeTag.textContent = m === 'demo'
        ? 'Demo mode · per-browser auth · no emails sent'
        : 'Connected to backend';
    };

    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginEmail.value.trim();
        const res = await window.STL_AUTH.requestMagicLink(email);
        if (!res.ok) {
          loginHint.textContent = res.error === 'invalid-email'
            ? 'That doesn’t look like a valid email.'
            : 'Couldn’t send the link. Try again.';
          loginHint.classList.add('is-error');
          return;
        }
        showLoginSent({ email, devLink: res.devLink });
      });
    }
    if (loginBack) {
      loginBack.addEventListener('click', showLoginForm);
    }
    if (loginDemoLnk) {
      loginDemoLnk.addEventListener('click', async (e) => {
        e.preventDefault();
        // Pull the token off the demo link and verify it.
        const url = new URL(loginDemoLnk.href, location.href);
        const tok = url.searchParams.get('login');
        if (!tok) return;
        const res = await window.STL_AUTH.verifyToken(tok);
        if (res.ok) {
          toast('Signed in as ' + res.user.email);
          // Strip ?login= from the URL.
          try { history.replaceState({}, '', location.pathname); } catch (_) {}
          // Land on admin if user is admin and they came here that way,
          // otherwise default to score.
          if (res.user.role === 'admin') showScreen('admin');
          else showScreen('score', null, 'back');
        } else {
          toast('That link is no longer valid');
          showLoginForm();
        }
      });
    }

    // Forbidden screen handlers
    const forbiddenSignin = $('#btn-forbidden-signin');
    const forbiddenBack   = $('#btn-forbidden-back');
    if (forbiddenSignin) forbiddenSignin.addEventListener('click', () => showScreen('login'));
    if (forbiddenBack)   forbiddenBack.addEventListener('click', () => showScreen('score', null, 'back'));

    // Subscribe to auth changes — keep header in sync without polling.
    window.STL_AUTH.subscribe((user) => {
      renderHeaderAuth(user);
      updateModeTag();
      // If the user is currently on the admin screen and just lost
      // admin role (e.g., signed out), bounce them off.
      const adminVisible = !document.querySelector('[data-screen="admin"]')?.hidden;
      if (adminVisible && !window.STL_AUTH.isAdmin()) {
        showScreen('forbidden');
      }
    });
    updateModeTag();
  };

  // Role gate for the admin screen — call before navigating to admin.
  // Returns true if the user can view; false otherwise (and routes
  // to login or forbidden as appropriate).
  const requireAdminOrRedirect = () => {
    const user = window.STL_AUTH ? window.STL_AUTH.getCurrentUser() : null;
    if (!user) {
      showScreen('login');
      return false;
    }
    if (user.role !== 'admin') {
      showScreen('forbidden');
      return false;
    }
    return true;
  };

  // ----- boot ------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    if (!window.STL_QUESTIONS || window.STL_QUESTIONS.length === 0) {
      $('#stl-main').innerHTML =
        '<div class="stl-card stl-card--hero" style="padding:24px"><h2>No questions loaded.</h2>' +
        '<p>Check that <code>questions.js</code> loaded before <code>app.js</code>.</p></div>';
      return;
    }
    initScore();
    initQuiz();
    initResults();
    initReview();
    initRegen();
    initRestart();
    initHistory();
    initAdmin();
    initAuth();

    // Auth boot: probe the backend (or hydrate from localStorage in
    // demo mode), verify any ?login= token that landed on this URL,
    // and then apply ?admin=1 routing through the role gate.
    Promise.resolve(window.STL_AUTH ? window.STL_AUTH.init() : null).then(async () => {
      const params = new URLSearchParams(location.search);
      const loginToken = params.get('login');
      if (loginToken && window.STL_AUTH) {
        const res = await window.STL_AUTH.verifyToken(loginToken);
        // Strip ?login= but preserve ?admin= if present.
        const keep = params.get('admin') ? '?admin=1' : '';
        try { history.replaceState({}, '', location.pathname + keep); } catch (_) {}
        if (res.ok) toast('Signed in as ' + res.user.email);
        else        toast('That magic link is no longer valid');
      }
      // ?admin=1 → land on the admin screen, but only if role permits.
      if (params.get('admin') === '1') {
        if (requireAdminOrRedirect()) {
          setTimeout(() => showScreen('admin'), 0);
        }
      }
    });

    // History header button — re-renders the list every time you visit
    // so it picks up new attempts without a page reload.
    const historyBtn = $('#btn-history');
    if (historyBtn) {
      historyBtn.addEventListener('click', () => {
        renderHistory();
        showScreen('history');
      });
    }

    // Copy-review-link button on the results screen actions row.
    const copyBtn = $('#btn-copy-link');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        // Build a fresh attempt object from current state. If we're
        // viewing a shared attempt, regenerate from that — same payload.
        const att = buildAttemptFromState();
        if (!att) { toast('Nothing to share — finish a test first'); return; }
        copyReviewLink(att);
      });
    }

    // Shared-attempt banner CTA: take this same test (same target).
    const sharedTakeBtn = $('#btn-shared-take');
    if (sharedTakeBtn) {
      sharedTakeBtn.addEventListener('click', () => {
        const target = state.score || 600;
        viewingShared = false;
        const banner = $('#shared-banner');
        if (banner) banner.hidden = true;
        // Strip the ?a= from the URL so a refresh doesn't bounce them
        // back into shared-view mode.
        try { history.replaceState({}, '', location.pathname); } catch (_) {}
        startTest(target);
      });
    }

    // ?a=<encoded> on initial load → hydrate as a shared attempt.
    // Runs after init so all the renderers are ready.
    const params = new URLSearchParams(location.search);
    const sharedEncoded = params.get('a');
    if (sharedEncoded) {
      const att = decodeShareURL(sharedEncoded);
      if (att) {
        if (hydrateFromAttempt(att, { shared: true })) {
          showScreen('results');
        }
      } else {
        toast("Couldn't open that shared link — it may be from an older version.");
      }
    }

    // Dev-only Test button: unhidden + wired only on local hostnames.
    // The button is hidden in HTML by default; on a public deploy the
    // hostname check returns false and we never touch it. Even if a
    // user un-hides it via DevTools, runDevTest's own isLocalHost()
    // guard short-circuits the action.
    const devBtn = $('#btn-dev-test');
    if (devBtn && isLocalHost()) {
      devBtn.hidden = false;
      devBtn.addEventListener('click', runDevTest);
    }

    // First paint: the score screen is already visible per the HTML
    // defaults (and btn-restart already hidden), so we *don't* call
    // showScreen('score') here — doing so would kick off a View
    // Transition with no actual DOM change, fighting the CSS mount
    // animation below. The .stl-app--mounting class drives a one-shot
    // slide-in for the score card, then drops itself so future visits
    // to the score screen go through the View Transition path with the
    // back-direction class instead.
    if (!reduceMotion()) {
      document.body.classList.add('stl-app--mounting');
      // Match the CSS animation duration (520ms) plus a small buffer
      // so the class persists for the entire animation.
      window.setTimeout(() => {
        document.body.classList.remove('stl-app--mounting');
      }, 700);
    }
  });
})();
