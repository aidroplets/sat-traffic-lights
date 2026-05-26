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

  // ---- API helper (Supabase-backed; see web/api/*) ---------------------
  // Single entry point used by every admin write helper. Returns the
  // parsed JSON on success, throws on non-2xx. We deliberately do NOT
  // block UI updates on these calls — every helper writes to localStorage
  // FIRST (so the UI is instant) and fires the API call in parallel; on
  // a 401/403/5xx we log + leave the localStorage write in place as a
  // journal for the Day 3 backfill script to replay.
  const stlApi = async (method, path, body) => {
    const init = {
      method,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    };
    if (body !== undefined) init.body = JSON.stringify(body);
    const r = await fetch(path, init);
    if (!r.ok) {
      const text = await r.text().catch(() => '');
      throw new Error('API ' + method + ' ' + path + ' → ' + r.status + ' ' + text.slice(0, 200));
    }
    if (r.status === 204) return null;
    return r.json().catch(() => null);
  };
  // Fire-and-forget wrapper: writes that should never block the UI.
  // Logs failures so we still see them in the console but the user
  // keeps moving. Returns a promise the caller MAY await.
  const stlApiBackground = (method, path, body) =>
    stlApi(method, path, body).catch((e) => {
      console.warn('[stl-api] background', method, path, 'failed:', e && e.message);
      return null;
    });

  // Toggle the brand spinner on a button. Holds the current width so
  // the button doesn't reflow when the label fades; .is-loading in
  // app.css paints the conic-rainbow arc and disables pointer events.
  // Pass on=true at the start of an async op, on=false in the finally.
  const setButtonLoading = (btn, on) => {
    if (!btn) return;
    if (on) {
      const rect = btn.getBoundingClientRect();
      btn.dataset.stlWidth = String(rect.width);
      btn.style.minWidth = rect.width + 'px';
      btn.classList.add('is-loading');
      btn.setAttribute('aria-busy', 'true');
      // Don't disable — disabling kills the spinner's visibility on
      // some browsers (e.g. iOS removes box-shadow on :disabled). The
      // class already sets pointer-events: none.
    } else {
      btn.classList.remove('is-loading');
      btn.removeAttribute('aria-busy');
      btn.style.minWidth = '';
      delete btn.dataset.stlWidth;
    }
  };
  // Wraps an async fn so the calling button shows the spinner for the
  // duration. Usage:
  //   btn.addEventListener('click', withLoading(btn, async () => { ... }));
  // The fn receives any args the listener got. Errors propagate.
  const withLoading = (btn, fn) => async function (...args) {
    setButtonLoading(btn, true);
    try { return await fn.apply(this, args); }
    finally { setButtonLoading(btn, false); }
  };

  // One-shot Supabase-migration cleanup. The bank now boots from
  // /api/questions which returns rows with server-side overrides
  // already applied. Pre-migration admins still have their old
  // stl_question_overrides + stl_admin_added_questions sitting in
  // localStorage; we DON'T wipe those (the Day 3 backfill script
  // reads them) but we mark them so subsequent loads stop re-applying
  // them on top of already-merged API rows. After the backfill, this
  // sentinel disarms the legacy merge in assembleBank().
  const SUPABASE_MIGRATION_KEY = 'stl_supabase_migrated_v1';
  const supabaseMigrated = () => {
    try { return localStorage.getItem(SUPABASE_MIGRATION_KEY) === '1'; }
    catch (_) { return false; }
  };
  const markSupabaseMigrated = () => {
    try { localStorage.setItem(SUPABASE_MIGRATION_KEY, '1'); } catch (_) {}
  };

  // ---- One-shot localStorage → Supabase backfill -----------------------
  // Runs on first boot of the new code if the migration sentinel hasn't
  // been set yet AND the user is signed in as an admin (anon callers
  // would just rack up 401s).
  //
  // Pushes:
  //   • stl_question_overrides  → PUT /api/admin/question (one per qid)
  //   • stl_admin_added_questions → POST /api/admin/question
  //   • stl_attempts            → POST /api/attempts (works for any user)
  //   • stl_test_compositions   → PUT /api/admin/test-config
  //   • stl_active_tests        → PUT /api/admin/test-config (isActive)
  //   • stl_enabled_subjects    → PUT /api/admin/test-config (enabledSubjects)
  //   • stl_imports_deleted     → POST /api/admin/imports?action=delete
  //
  // On success, sets the migration sentinel so this never runs again.
  // On partial failure, the sentinel STAYS UNSET so a future load retries.
  // The endpoints are all idempotent (upsert) so replays don't duplicate.
  // Per-qid note + attachments sync. Walks the localStorage overrides
  // map; for any qid that has a non-empty note OR attachments locally,
  // PUTs the pair to /api/admin/note?qid=X. Endpoint is idempotent
  // (upsert). Used by both the one-shot migration backfill below AND
  // the standalone note sweep that runs on subsequent boots until its
  // own sentinel is set.
  //
  // Returns { promises, count } so callers can include the promises in
  // their Promise.all and track success.
  function buildNoteBackfillPromises(fire) {
    let overrides = {};
    try { overrides = JSON.parse(localStorage.getItem(ADMIN_OVERRIDES_KEY) || '{}') || {}; }
    catch (_) {}
    const promises = [];
    let count = 0;
    for (const qid of Object.keys(overrides)) {
      const ov = overrides[qid] || {};
      const note = typeof ov.note === 'string' ? ov.note : '';
      const att = Array.isArray(ov.noteAttachments) ? ov.noteAttachments : [];
      // Skip qids that have neither a note nor attachments — no point
      // round-tripping an empty PUT.
      if (!note && att.length === 0) continue;
      count += 1;
      promises.push(fire('note ' + qid,
        stlApi('PUT', '/api/admin/note?qid=' + encodeURIComponent(qid),
          { note, noteAttachments: att })));
    }
    return { promises, count };
  }

  async function runSupabaseBackfill() {
    if (supabaseMigrated()) return { skipped: true };

    const results = { ok: 0, fail: 0, errors: [] };
    const fire = async (label, p) => {
      try { await p; results.ok += 1; }
      catch (e) { results.fail += 1; results.errors.push(label + ': ' + (e && e.message)); }
    };

    // 1a. Per-question overrides — question fields (state, stem, etc).
    let overrides = {};
    try { overrides = JSON.parse(localStorage.getItem(ADMIN_OVERRIDES_KEY) || '{}') || {}; }
    catch (_) {}
    const overridePromises = [];
    for (const qid of Object.keys(overrides)) {
      const ov = overrides[qid] || {};
      const tracked = {};
      for (const k of ['state', 'stem', 'choices', 'answer', 'explanation', 'topic', 'difficulty']) {
        if (k in ov) tracked[k] = ov[k];
      }
      if (Object.keys(tracked).length === 0) continue;
      overridePromises.push(fire('override ' + qid,
        stlApi('PUT', '/api/admin/question?id=' + encodeURIComponent(qid), tracked)));
    }
    // 1b. Per-question notes + attachments — separate endpoint.
    const noteBackfill = buildNoteBackfillPromises(fire);

    // 2. Admin-added questions
    let added = [];
    try { added = JSON.parse(localStorage.getItem(ADMIN_ADDED_KEY) || '[]') || []; }
    catch (_) {}
    const addedPromises = added.filter((q) => q && q.id).map((q) =>
      fire('added ' + q.id, stlApi('POST', '/api/admin/question', q)));

    // 3. Attempts (any signed-in user can write their own)
    let attempts = [];
    try {
      attempts = JSON.parse(localStorage.getItem(STL_STORAGE_KEY) || '[]') || [];
      attempts = Array.isArray(attempts) ? attempts.filter((a) => a && a.id && a.v === STL_SCHEMA_VERSION) : [];
    } catch (_) { attempts = []; }
    const attemptPromises = attempts.map((a) =>
      fire('attempt ' + a.id, stlApi('POST', '/api/attempts', a)));

    // 4-6. Test config: collapse compositions + active + enabled into one PUT per testId
    const compMap = (() => {
      try { return JSON.parse(localStorage.getItem(STL_TEST_COMP_KEY) || '{}') || {}; }
      catch (_) { return {}; }
    })();
    const activeArr = (() => {
      try {
        const raw = JSON.parse(localStorage.getItem(ACTIVE_TESTS_KEY) || 'null');
        return Array.isArray(raw) ? raw : null;
      } catch (_) { return null; }
    })();
    const enabledMap = _readEnabledSubjectsMap();
    const tcPromises = [];
    for (const testId of Object.keys(TEST_TYPES)) {
      const patch = {};
      const c = compMap[testId];
      if (c && c.length != null) patch.length = c.length;
      if (c && c.subjectMix != null) patch.subjectMix = c.subjectMix;
      if (activeArr) patch.isActive = activeArr.includes(testId);
      if (Array.isArray(enabledMap[testId])) patch.enabledSubjects = enabledMap[testId];
      if (Object.keys(patch).length === 0) continue;
      tcPromises.push(fire('test-config ' + testId,
        stlApi('PUT', '/api/admin/test-config?id=' + encodeURIComponent(testId), patch)));
    }

    // 7. Deleted imports
    let deletedSet = [];
    try {
      const raw = JSON.parse(localStorage.getItem(STL_IMPORTS_DELETED_KEY) || '[]');
      deletedSet = Array.isArray(raw) ? raw : [];
    } catch (_) {}
    const importPromises = deletedSet.map((id) =>
      fire('import-deleted ' + id,
        stlApi('POST', '/api/admin/imports?id=' + encodeURIComponent(id) + '&action=delete')));

    await Promise.all([
      ...overridePromises, ...noteBackfill.promises,
      ...addedPromises, ...attemptPromises,
      ...tcPromises, ...importPromises,
    ]);

    if (results.fail === 0) {
      markSupabaseMigrated();
      markNotesBackfilled();
      console.log('[stl] Supabase backfill complete:', results.ok, 'writes');
    } else {
      console.warn('[stl] Supabase backfill partial — will retry next boot:',
        results.fail, 'failures /', results.ok, 'ok. First errors:',
        results.errors.slice(0, 3));
    }
    return results;
  }

  // ---- Standalone note sweep ------------------------------------------
  // The initial migration runner shipped before this code existed
  // skipped note + attachments entirely (they use a different endpoint
  // from the question-field overrides). Anyone whose sentinel already
  // flipped (the main migration completed earlier) had their notes
  // stranded in localStorage. This sweep targets them: separate
  // sentinel, only walks notes/attachments, runs on every boot until
  // its sentinel is set.
  const NOTES_BACKFILL_KEY = 'stl_notes_backfilled_v1';
  const notesBackfilled = () => {
    try { return localStorage.getItem(NOTES_BACKFILL_KEY) === '1'; }
    catch (_) { return false; }
  };
  const markNotesBackfilled = () => {
    try { localStorage.setItem(NOTES_BACKFILL_KEY, '1'); } catch (_) {}
  };

  async function runNoteBackfill() {
    if (notesBackfilled()) return { skipped: true };
    const results = { ok: 0, fail: 0, errors: [] };
    const fire = async (label, p) => {
      try { await p; results.ok += 1; }
      catch (e) { results.fail += 1; results.errors.push(label + ': ' + (e && e.message)); }
    };
    const { promises, count } = buildNoteBackfillPromises(fire);
    if (count === 0) {
      // Nothing local to push — flip the sentinel so we don't keep
      // re-checking on every boot.
      markNotesBackfilled();
      return { ok: 0, fail: 0, skipped: 'nothing-to-sync' };
    }
    await Promise.all(promises);
    if (results.fail === 0) {
      markNotesBackfilled();
      console.log('[stl] Note backfill complete:', results.ok, 'notes pushed');
    } else {
      console.warn('[stl] Note backfill partial — will retry next boot:',
        results.fail, 'failures /', results.ok, 'ok. First errors:',
        results.errors.slice(0, 3));
    }
    return results;
  }

  // Expose both for manual re-run from the admin tab / console.
  if (typeof window !== 'undefined') {
    window.__STL_RUN_BACKFILL__ = runSupabaseBackfill;
    window.__STL_RUN_NOTE_BACKFILL__ = runNoteBackfill;
  }

  const TEST_LENGTH = 30;
  // Maximum number of multiple-choice options. SAT/ACT is 4. The
  // letter list keeps an E slot only as a safety net for legacy data;
  // every editor/renderer must clamp to MAX_CHOICES regardless.
  const MAX_CHOICES = 4;
  const LETTERS = ['A', 'B', 'C', 'D', 'E'];

  // Normalize an arbitrary choices value to a length-4 array, padding
  // empties and slicing extras. Centralizes the rule so editor +
  // renderer + AI batch agree. Pure function — testable in isolation
  // (see web/tests/choice-input.test.js).
  const normalizeChoices = (raw) => {
    const arr = Array.isArray(raw) ? raw.slice(0, MAX_CHOICES) : [];
    while (arr.length < MAX_CHOICES) arr.push('');
    return arr;
  };
  // Expose a tiny test seam so the standalone test runner can assert
  // the same logic the runtime uses.
  if (typeof window !== 'undefined') {
    window.STL_TEST_HOOKS = window.STL_TEST_HOOKS || {};
    window.STL_TEST_HOOKS.normalizeChoices = normalizeChoices;
    window.STL_TEST_HOOKS.MAX_CHOICES = MAX_CHOICES;
  }

  // ----- helpers ---------------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ----- mobile-first screen routing (runs SYNCHRONOUSLY before paint) -
  // The score screen has no [hidden] in HTML so it's the desktop default.
  // On phones we want splash to be the first paint instead. Doing this
  // here — before any other init — means the page paints once with the
  // correct screen and there's no flash of the score screen on mobile.
  // First-paint routing — runs synchronously before any other init so
  // the page paints once with the correct entry screen and there's no
  // FOUC. Two axes:
  //   • Phone (≤640px) → splash hero with "Get started" CTA
  //   • Desktop        → entry directly (picker if 2+ tests, score if 1)
  // The score / picker screens both default to hidden in HTML; we
  // un-hide whichever one the boot router picks.
  (() => {
    const score  = document.querySelector('[data-screen="score"]');
    const picker = document.querySelector('[data-screen="picker"]');
    const splash = document.querySelector('[data-screen="splash"]');
    if (!score || !splash || !picker) return;

    // ── Refresh-resume short-circuit ────────────────────────────────
    // If we have a fresh sessionStorage resume payload, un-hide the
    // target screen synchronously HERE — before paint — so refreshing
    // on a non-default screen (history, analysis, score, picker,
    // splash) doesn't flash the boot default for a frame. The full
    // restoreResumeStateIfAny() runs later via setTimeout to wire up
    // rendered content, but that runs against the already-correct
    // visible screen so the swap is invisible.
    let resumeScreen = null;
    try {
      const rawResume = sessionStorage.getItem('stl_resume_state');
      if (rawResume) {
        const data = JSON.parse(rawResume);
        const fresh = data && data.at && (Date.now() - data.at < 24 * 60 * 60 * 1000);
        if (fresh) resumeScreen = data.screen;
      }
    } catch (_) {}
    // Screens safe to un-hide at boot without JS-populated state.
    // Quiz/review/results/admin/login need state set up by the resume
    // handler before they can render meaningfully, so we let those
    // fall through to the normal boot picker.
    // Admin is in this list even though it's role-gated — the actual
    // role check happens later via restoreResumeStateIfAny, which
    // bounces a downgraded user to login/forbidden. Better to risk a
    // brief admin flash for a now-non-admin user (rare) than to
    // unconditionally flash the boot default on every admin refresh
    // (common during admin work).
    // 'results' is in the safe set: the boot router un-hides the screen
    // synchronously so a refresh on a past-attempt results page doesn't
    // flash the picker first; restoreResumeStateIfAny() later hydrates
    // state from the saved attempt id and re-renders.
    const SAFE_BOOT_SCREENS = new Set(['splash', 'picker', 'score', 'history', 'analysis', 'admin', 'results']);
    if (resumeScreen && SAFE_BOOT_SCREENS.has(resumeScreen)) {
      const target = document.querySelector('[data-screen="' + resumeScreen + '"]');
      if (target) {
        target.hidden = false;
        if (resumeScreen !== 'splash') splash.hidden = true;
        if (resumeScreen !== 'picker') picker.hidden = true;
        if (resumeScreen !== 'score')  score.hidden  = true;
        return;
      }
    }

    const isPhone = window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
    if (isPhone) {
      // Splash takes the first paint on mobile regardless.
      splash.hidden = false;
      score.hidden  = true;
      picker.hidden = true;
      return;
    }
    // Desktop — pick picker vs. score based on Active-tests count.
    // Reading localStorage directly because loadActiveTests is defined
    // a few hundred lines below us in the IIFE (TDZ). When nothing's
    // stored, default to the full set of tests (matches loadActiveTests
    // below) so a fresh visit lands on the picker, not pre-locked to SAT.
    let active;
    try {
      const raw = localStorage.getItem('stl_active_tests');
      const allTests = ['SAT', 'PSAT', 'ACT', 'ISEE', 'SSAT', 'HSPT'];
      active = raw ? JSON.parse(raw) : allTests;
      if (!Array.isArray(active) || active.length === 0) active = allTests;
    } catch (_) { active = ['SAT']; }
    const showPicker = active.length > 1;
    picker.hidden = !showPicker;
    score.hidden  =  showPicker;
  })();

  // Animated open/close for any `.stl-admin-modal` element.
  // Pattern: un-hide → next frame → add `is-open` (CSS transitions fire).
  // On close: remove `is-open` → wait for the panel transition to end →
  // set `hidden = true`. A timeout fallback covers the (rare) case
  // where transitionend doesn't fire.
  // Per-modal pending close timers are tracked so a quick re-open
  // before the close finishes cancels the deferred hide cleanly.
  const _modalCloseTimers = new WeakMap();
  // When a modal opens we PORTAL it to <body> so it escapes any
  // ancestor stacking context that would trap it below page chrome.
  // The shell wraps the admin panel in `<main class="stl-main">` which
  // sits in its own stacking context (position: relative, z-index: 1),
  // and the page header is a sibling of main at z-index: 50. Without
  // the portal, the modal — even with z-index: 200 — would sit at
  // main's level (1) relative to the header (50), so the header would
  // overlap the top of the modal panel. Reparenting to <body> lifts
  // the modal into the root stacking context where its own z-index
  // wins. On close we put it back in its original DOM location so
  // any selectors that scope to the modal's original parent still
  // work (e.g. delegated event listeners on the admin pane).
  const _modalOriginalSlot = new WeakMap();
  const showAdminModal = (modal) => {
    if (!modal) return;
    // Cancel any in-flight close so re-open lands cleanly.
    const t = _modalCloseTimers.get(modal);
    if (t) { clearTimeout(t); _modalCloseTimers.delete(modal); }
    // Portal to <body> only if we haven't already. Track the original
    // parent + next sibling so we can restore exactly.
    if (modal.parentNode && modal.parentNode !== document.body) {
      _modalOriginalSlot.set(modal, {
        parent: modal.parentNode,
        nextSibling: modal.nextSibling,
      });
      document.body.appendChild(modal);
    }
    modal.hidden = false;
    // Force a layout pass so the transition from the un-open state to
    // the open state is observable.
    void modal.offsetWidth;
    modal.classList.add('is-open');
  };
  const hideAdminModal = (modal) => {
    if (!modal) return;
    if (modal.hidden) return;
    modal.classList.remove('is-open');
    // Match --dur-base (200ms) + a small slack for paint.
    const t = setTimeout(() => {
      modal.hidden = true;
      _modalCloseTimers.delete(modal);
      // Restore the modal to its original DOM slot so future re-opens
      // (and any external code that queries via the parent) still find
      // it. insertBefore(node, null) is equivalent to appendChild, so a
      // missing nextSibling is fine.
      const slot = _modalOriginalSlot.get(modal);
      if (slot && slot.parent && modal.parentNode === document.body) {
        slot.parent.insertBefore(modal, slot.nextSibling);
        _modalOriginalSlot.delete(modal);
      }
    }, 240);
    _modalCloseTimers.set(modal, t);
  };

  // ====================================================================
  // Test types — SAT, ISEE, ACT
  // ====================================================================
  // Each test has its own scoring scale, score-input min/max, and
  // designed wordmark for the picker grid. Per-question `testType`
  // routes a question into one test's pool — pools never mix during
  // an attempt.
  //
  // Adding a new test:
  //   1. Add an entry here with scoring scale + wordmark
  //   2. Tag questions with testType: 'XYZ'
  //   3. Admin Tests panel exposes the toggle automatically
  // Wordmark = the tinted icon only (from window.STL_TEST_ICONS,
  // populated by test-icons.js). The picker tile and Tests panel row
  // already render the test name separately, so duplicating it inside
  // the wordmark just doubled the same word twice on the same card.
  // Keep the wrapping <span> + __icon child so existing CSS for
  // sizing/coloring still applies.
  const renderWordmark = (id /*, name */) => {
    const icon = (window.STL_TEST_ICONS && window.STL_TEST_ICONS[id]) || '';
    return (
      '<span class="stl-test-mark">' +
        '<span class="stl-test-mark__icon" aria-hidden="true">' + icon + '</span>' +
      '</span>'
    );
  };

  // Compact "test badge" — a color-coded chip with the test's icon + name.
  // Used wherever the user needs to know which test a piece of UI belongs
  // to (results header, review meta-row, history rows). The chip pulls
  // the test's tint inline via --badge-tint so each instance can carry a
  // different color without leaking into the global accent.
  const renderTestBadge = (testType) => {
    const id = testType && (window.STL_TEST_HOOKS || {}).TEST_TYPES && (window.STL_TEST_HOOKS).TEST_TYPES[testType]
      ? testType : (testType || 'SAT');
    const cfg = (window.STL_TEST_HOOKS && window.STL_TEST_HOOKS.TEST_TYPES && window.STL_TEST_HOOKS.TEST_TYPES[id])
      || { name: id, tint: '139, 134, 255' };
    const icon = (window.STL_TEST_ICONS && window.STL_TEST_ICONS[id]) || '';
    // Pull the badge tint from the DB cache first, falling back to the
    // hardcoded TEST_TYPES value. resolveTint isn't in scope yet at the
    // first call site (this function runs early on every render), so we
    // do the lookup inline with the same precedence rule.
    const tCache = (window.__STL_TEST_CONFIG_CACHE__ || {})[id];
    const tint = (tCache && tCache.tint) || cfg.tint || '139, 134, 255';
    return (
      '<span class="stl-test-badge" data-test="' + escapeHtml(id) + '"' +
        ' style="--badge-tint: ' + tint + '"' +
        ' aria-label="' + escapeHtml(cfg.name) + ' test">' +
        '<span class="stl-test-badge__icon" aria-hidden="true">' + icon + '</span>' +
        '<span class="stl-test-badge__name">' + escapeHtml(cfg.name) + '</span>' +
      '</span>'
    );
  };

  // ---- Subject catalog -----------------------------------------------
  // Each test in the real world has multiple sections (subjects). We
  // expose them here so:
  //   • Questions can be tagged with `section` matching one of these IDs
  //   • The user picker can offer per-subject toggles on the score screen
  //   • Admin can enable/disable each subject independently
  // The IDs are stable; renaming requires migrating tagged questions.
  // The first entry in each test's list is used as the default `section`
  // when a question doesn't carry one (back-compat for the original
  // math-only bank).
  const SUBJECT_NAMES = {
    'math':                    'Math',
    'reading-writing':         'Reading & Writing',
    'english':                 'English',
    'reading':                 'Reading',
    'science':                 'Science',
    'verbal':                  'Verbal',
    'verbal-reasoning':        'Verbal Reasoning',
    'verbal-skills':           'Verbal Skills',
    'quantitative-reasoning':  'Quantitative Reasoning',
    'quantitative-skills':     'Quantitative Skills',
    'reading-comprehension':   'Reading Comprehension',
    'language-skills':         'Language Skills',
  };
  const subjectName = (id) => SUBJECT_NAMES[id] || (id ? id.replace(/(?:^|-)([a-z])/g, (_, c, i) => (i ? ' ' : '') + c.toUpperCase()) : 'Math');

  // Lucide-style icons for each subject. Sized at 16px viewBox 24,
  // stroke 2, currentColor — matches the icon style we already use
  // for the admin action buttons. Visually distinct icons so the
  // pill row reads as a row of *different* subjects, not a uniform
  // wallpaper of dots. Picked the most-recognizable Lucide glyph
  // for each section.
  const SUBJECT_ICONS = {
    // calculator-like grid → math
    'math': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="16" y1="18" x2="16" y2="18.01"/></svg>',
    // pen line → reading & writing (covers both halves of the SAT/PSAT section)
    'reading-writing': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
    // text/type glyph → english
    'english': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
    // book-open → reading
    'reading': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    // atom (3 ellipses + nucleus) → science
    'science': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>',
    // speech bubble → verbal (SSAT)
    'verbal': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    // brain → verbal-reasoning (ISEE)
    'verbal-reasoning': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>',
    // mic → verbal-skills (HSPT)
    'verbal-skills': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>',
    // function/sigma square → quantitative-reasoning (ISEE)
    'quantitative-reasoning': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17c2 0 2.8-1 2.8-3 0-1.5 0-3.2 2.2-3.2"/><path d="M14 9.4c-1.4 0-2 .6-2 1.6"/></svg>',
    // bar-chart → quantitative-skills (HSPT)
    'quantitative-skills': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    // book with bookmark → reading-comprehension
    'reading-comprehension': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19.5 14.5V2.5a1 1 0 0 0-1-1h-13A2.5 2.5 0 0 0 3 4v16a2 2 0 0 0 2 2h13.5a1 1 0 0 0 1-1v-1"/><polyline points="10 2 10 10 13 7 16 10 16 2"/></svg>',
    // languages glyph → language-skills (HSPT)
    'language-skills': '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>',
  };
  const subjectIcon = (id) => SUBJECT_ICONS[id] || SUBJECT_ICONS.math;

  const TEST_TYPES = {
    SAT: {
      id: 'SAT',
      name: 'SAT',
      tagline: 'College admissions',
      scoreMin: 200, scoreMax: 800, scoreStep: 10, scoreDefault: 600,
      tiers: { easy: 500, medium: 600, hard: 700 },
      tint: '139, 134, 255',  // lavender
      // Real-world SAT (digital): two sections of equal weight. Math is
      // the existing bank; reading-writing covers grammar/usage and
      // short-passage comprehension.
      subjects: ['math', 'reading-writing'],
      // Default length 30 with the same 55/45 R&W/Math ratio the real
      // Digital SAT uses (54 R&W + 44 Math out of 98 questions).
      // Admins can override per-test in the admin Tests panel —
      // see loadTestOverrides() / saveTestOverrides() in app.js.
      length: 30,
      subjectMix: { 'reading-writing': 17, math: 13 },
      get wordmark() { return renderWordmark('SAT', 'SAT'); },
    },
    PSAT: {
      id: 'PSAT',
      name: 'PSAT',
      tagline: 'Pre-college prep',
      // PSAT math section: 160–760 in 10-point steps (College Board's
      // PSAT/NMSQT uses a 320–1520 total / 160–760 per section scale).
      scoreMin: 160, scoreMax: 760, scoreStep: 10, scoreDefault: 600,
      tiers: { easy: 460, medium: 560, hard: 660 },
      tint: '96, 165, 250',   // slate blue (sibling-of-SAT lavender)
      // PSAT/NMSQT mirrors the SAT digital format — same two sections.
      subjects: ['math', 'reading-writing'],
      // Digital PSAT/NMSQT format mirrors SAT: 98 questions (54 R&W +
      // 44 Math). Same per-section counts.
      length: 98,
      subjectMix: { 'reading-writing': 54, math: 44 },
      get wordmark() { return renderWordmark('PSAT', 'PSAT'); },
    },
    ISEE: {
      id: 'ISEE',
      name: 'ISEE',
      tagline: 'School admissions',
      // ISEE math achievement uses stanines 1–9 (what students see on
      // the score report), instead of the raw 760–940 scale.
      scoreMin: 1, scoreMax: 9, scoreStep: 1, scoreDefault: 7,
      tiers: { easy: 4, medium: 6, hard: 8 },
      tint: '74, 222, 128',   // green
      // ISEE Upper Level: 4 scored sections + an unscored essay.
      // 'math' here = Mathematics Achievement (existing bank);
      // quantitative-reasoning covers word problems + comparisons.
      subjects: ['math', 'quantitative-reasoning', 'verbal-reasoning', 'reading-comprehension'],
      // ISEE Upper Level real-test counts: VR 40, QR 37, RC 36, MA 47.
      // 160 questions total across 4 scored sections (essay unscored).
      length: 160,
      subjectMix: { 'verbal-reasoning': 40, 'quantitative-reasoning': 37, 'reading-comprehension': 36, math: 47 },
      get wordmark() { return renderWordmark('ISEE', 'ISEE'); },
    },
    SSAT: {
      id: 'SSAT',
      name: 'SSAT',
      tagline: 'Private school prep',
      // SSAT Upper Level math: scaled 500–800 in 10-point steps.
      scoreMin: 500, scoreMax: 800, scoreStep: 10, scoreDefault: 700,
      tiers: { easy: 600, medium: 680, hard: 750 },
      tint: '244, 114, 182',  // rose (pairs with ISEE green)
      // SSAT Upper Level: Quantitative (math) + Verbal (synonyms +
      // analogies) + Reading Comprehension. Writing sample is unscored.
      subjects: ['math', 'verbal', 'reading-comprehension'],
      // SSAT Upper Level real-test counts: Quant 50 (two 25-q sections),
      // Verbal 60 (30 synonyms + 30 analogies), Reading 40. 150 scored
      // total (writing unscored, experimental section not counted).
      length: 150,
      subjectMix: { math: 50, verbal: 60, 'reading-comprehension': 40 },
      get wordmark() { return renderWordmark('SSAT', 'SSAT'); },
    },
    HSPT: {
      id: 'HSPT',
      name: 'HSPT',
      tagline: 'High school admissions',
      // HSPT composite math score: ~200–800 (institutional scale).
      scoreMin: 200, scoreMax: 800, scoreStep: 5, scoreDefault: 600,
      tiers: { easy: 500, medium: 600, hard: 700 },
      tint: '250, 204, 21',   // amber
      // HSPT (High School Placement Test): five scored sections.
      // 'math' here = the existing Mathematics bank.
      subjects: ['math', 'verbal-skills', 'quantitative-skills', 'reading', 'language-skills'],
      // HSPT real-test counts: Verbal Skills 60, Quant Skills 52,
      // Reading 62, Math 64, Language 60. 298 questions total across
      // five scored sections.
      length: 298,
      subjectMix: { 'verbal-skills': 60, 'quantitative-skills': 52, reading: 62, math: 64, 'language-skills': 60 },
      get wordmark() { return renderWordmark('HSPT', 'HSPT'); },
    },
    ACT: {
      id: 'ACT',
      name: 'ACT',
      tagline: 'College admissions',
      scoreMin: 1, scoreMax: 36, scoreStep: 1, scoreDefault: 28,
      tiers: { easy: 22, medium: 28, hard: 33 },
      tint: '251, 146, 60',   // orange
      // ACT: four scored sections, each scored 1–36 then composited.
      subjects: ['math', 'english', 'reading', 'science'],
      // ACT real-test counts: English 75, Math 60, Reading 40,
      // Science 40. 215 questions total. (Optional Writing is unscored
      // in the composite and not modeled here.)
      length: 215,
      subjectMix: { english: 75, math: 60, reading: 40, science: 40 },
      get wordmark() { return renderWordmark('ACT', 'ACT'); },
    },
  };
  // Helper: get the subjects for a test as an array of {id, name}.
  // Falls back to a single 'math' entry for tests that haven't been
  // updated to declare subjects (defensive — the catalog above covers
  // all 6 active tests).
  const subjectsForTest = (testId) => {
    const cfg = TEST_TYPES[testId] || TEST_TYPES.SAT;
    const ids = (cfg.subjects && cfg.subjects.length) ? cfg.subjects : ['math'];
    return ids.map((id) => ({ id, name: subjectName(id) }));
  };
  // Stable iteration order for the picker grid (admin + UI consistency).
  // Grouped: college tier first (SAT/PSAT/ACT), then K-12 admissions
  // (ISEE/SSAT/HSPT). Admin Tests panel + picker grid both honor this.
  const TEST_TYPE_ORDER = ['SAT', 'PSAT', 'ACT', 'ISEE', 'SSAT', 'HSPT'];

  // ---- Per-test accent theming -------------------------------------
  // The whole UI (toggle, CTA, navbar dot, focus ring, pills, links)
  // pulls from --stl-accent / --stl-accent-2 / --stl-accent-soft /
  // --stl-accent-line. Driving those four CSS variables from the
  // selected test's `tint` makes the entire surface match per-test
  // (orange for ACT, green for ISEE, etc.) instead of always lavender.
  //
  // For the gradient sibling (--stl-accent-2), we hue-shift the tint
  // by ~14° in HSL space so the CTA still gets a subtle sweep rather
  // than reading as a flat color.
  const _hslShift = (r, g, b, deg) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0; const l = (max + min) / 2;
    const s = max === min ? 0 : (l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min));
    if (max !== min) {
      switch (max) {
        case r: h = ((g - b) / (max - min)) + (g < b ? 6 : 0); break;
        case g: h = ((b - r) / (max - min)) + 2; break;
        case b: h = ((r - g) / (max - min)) + 4; break;
      }
      h *= 60;
    }
    h = (h + deg + 360) % 360;
    if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hh = h / 360;
    return [
      Math.round(hue2rgb(p, q, hh + 1 / 3) * 255),
      Math.round(hue2rgb(p, q, hh) * 255),
      Math.round(hue2rgb(p, q, hh - 1 / 3) * 255),
    ];
  };
  // Resolve a test's tint with the DB cache taking precedence over the
  // hardcoded TEST_TYPES default. Cache is populated by bank-loader from
  // /api/questions's testConfig payload — so admin edits via the Tests
  // panel propagate to every device on the next page load (and within
  // 30s via the public-read endpoint's edge cache).
  const resolveTint = (testId) => {
    const cache = (typeof window !== 'undefined' && window.__STL_TEST_CONFIG_CACHE__) || {};
    const cached = cache[testId];
    if (cached && cached.tint) return cached.tint;
    const cfg = TEST_TYPES[testId];
    if (cfg && cfg.tint) return cfg.tint;
    return null;
  };

  const applyTestAccent = (testId) => {
    if (typeof document === 'undefined') return;
    const tint = resolveTint(testId) || resolveTint('SAT');
    if (!tint) return;
    const [r, g, b] = tint.split(',').map((s) => Number(s.trim()));
    if (!Number.isFinite(r) || !Number.isFinite(g) || !Number.isFinite(b)) return;
    const sib = _hslShift(r, g, b, 14);
    const root = document.documentElement;
    root.classList.add('stl-test-active');
    root.style.setProperty('--stl-tint', tint);
    root.style.setProperty('--stl-accent', `rgb(${r}, ${g}, ${b})`);
    root.style.setProperty('--stl-accent-2', `rgb(${sib[0]}, ${sib[1]}, ${sib[2]})`);
    root.style.setProperty('--stl-accent-soft', `rgba(${r}, ${g}, ${b}, 0.12)`);
    root.style.setProperty('--stl-accent-line', `rgba(${r}, ${g}, ${b}, 0.4)`);
  };
  // "Neutral" accent — used to be force-white on splash/picker/login/
  // forbidden. That caused colors to revert to white on every refresh
  // because boot routinely lands on one of those screens. Now it
  // carries the current test's color forward (resolveTint reads the
  // last loadSelectedTest()), so a user who was working on SAT keeps
  // the lavender accent across reloads. Falls back to a true neutral
  // ONLY when no test is selected at all (genuine first-visit case).
  // The picker tiles keep their per-tile --tile-tint regardless.
  const applyNeutralAccent = () => {
    if (typeof document === 'undefined') return;
    const sel = (typeof loadSelectedTest === 'function') ? loadSelectedTest() : null;
    if (sel && resolveTint(sel)) {
      applyTestAccent(sel);
      return;
    }
    const root = document.documentElement;
    root.classList.remove('stl-test-active');
    root.style.setProperty('--stl-tint', '255, 255, 255');
    root.style.setProperty('--stl-accent', 'rgb(255, 255, 255)');
    root.style.setProperty('--stl-accent-2', 'rgb(214, 218, 232)');
    root.style.setProperty('--stl-accent-soft', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--stl-accent-line', 'rgba(255, 255, 255, 0.28)');
  };
  // Admin screen accent. Was hard-coded white; now carries the user's
  // current test color so the admin chrome doesn't go pale on refresh.
  // Per-row semantic colors (badges, KPI tints, difficulty pills) are
  // set inline / by selector, so they still keep their identity
  // regardless of this global accent.
  const applyAdminAccent = () => {
    if (typeof document === 'undefined') return;
    const sel = (typeof loadSelectedTest === 'function') ? loadSelectedTest() : null;
    if (sel && resolveTint(sel)) {
      applyTestAccent(sel);
      return;
    }
    const root = document.documentElement;
    root.classList.remove('stl-test-active');
    root.style.setProperty('--stl-tint', '255, 255, 255');
    root.style.setProperty('--stl-accent', 'rgb(255, 255, 255)');
    root.style.setProperty('--stl-accent-2', 'rgb(214, 218, 232)');
    root.style.setProperty('--stl-accent-soft', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--stl-accent-line', 'rgba(255, 255, 255, 0.28)');
  };

  // "Include lower difficulty questions" toggle — user-controlled,
  // score-screen setting. When ON (default), the pool is cumulative —
  // questions at OR BELOW the target tier (the existing behavior).
  // When OFF, the pool is narrowed to JUST the target tier — useful
  // for drilling one band hard. Persisted per device.
  //
  // Migrates from the prior `stl_strict_difficulty` key that had
  // inverted semantics (strict=true meant "don't include lower"):
  //   strict=on  → include_lower=off
  //   strict=off → include_lower=on (default)
  const INCLUDE_LOWER_KEY = 'stl_include_lower';
  const _migrateLegacyStrictKey = () => {
    try {
      if (localStorage.getItem(INCLUDE_LOWER_KEY) != null) return;
      const legacy = localStorage.getItem('stl_strict_difficulty');
      if (legacy == null) return;
      // Old strict=on means user wanted ONLY target tier → new include_lower=off.
      const newVal = legacy === 'on' ? 'off' : 'on';
      localStorage.setItem(INCLUDE_LOWER_KEY, newVal);
      localStorage.removeItem('stl_strict_difficulty');
    } catch (_) {}
  };
  _migrateLegacyStrictKey();
  const loadIncludeLower = () => {
    try {
      const raw = localStorage.getItem(INCLUDE_LOWER_KEY);
      // Default ON when unset — preserves existing cumulative behavior.
      if (raw == null) return true;
      return raw !== 'off';
    } catch (_) { return true; }
  };
  const saveIncludeLower = (on) => {
    try { localStorage.setItem(INCLUDE_LOWER_KEY, on ? 'on' : 'off'); } catch (_) {}
  };
  // Test-runner seam.
  if (typeof window !== 'undefined') {
    window.STL_TEST_HOOKS = window.STL_TEST_HOOKS || {};
    window.STL_TEST_HOOKS.INCLUDE_LOWER_KEY = INCLUDE_LOWER_KEY;
    window.STL_TEST_HOOKS.loadIncludeLower = loadIncludeLower;
    window.STL_TEST_HOOKS.saveIncludeLower = saveIncludeLower;
  }

  // Active tests (admin-controlled visibility). Default: SAT only,
  // matching the original site behavior. Admins toggle ISEE/ACT on
  // via the Tests panel. Persisted in localStorage.
  const ACTIVE_TESTS_KEY = 'stl_active_tests';
  const SELECTED_TEST_KEY = 'stl_selected_test';
  // Default for fresh visitors is every test we ship — the picker
  // should advertise the full menu so people can self-select; admins
  // can still narrow the set via the Tests panel (which persists
  // their override under ACTIVE_TESTS_KEY). Only the SAT-only fallback
  // remains for the truly broken case (e.g., every entry under the key
  // failed validation), so users always have at least one choice.
  const DEFAULT_ACTIVE_TESTS = () => TEST_TYPE_ORDER.slice();
  const loadActiveTests = () => {
    try {
      const raw = localStorage.getItem(ACTIVE_TESTS_KEY);
      if (!raw) return DEFAULT_ACTIVE_TESTS();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_ACTIVE_TESTS();
      // Filter to known tests; never store junk values.
      const valid = parsed.filter((t) => TEST_TYPES[t]);
      return valid.length ? valid : ['SAT'];
    } catch (_) { return DEFAULT_ACTIVE_TESTS(); }
  };
  const saveActiveTests = (arr) => {
    try { localStorage.setItem(ACTIVE_TESTS_KEY, JSON.stringify(arr)); } catch (_) {}
    // Mirror to Supabase test_config: every known test gets an isActive
    // flag derived from membership in `arr`. We dispatch in parallel
    // since the writes are independent.
    const allTestIds = Object.keys(TEST_TYPES);
    const activeSet = new Set(arr);
    for (const id of allTestIds) {
      stlApiBackground('PUT', '/api/admin/test-config?id=' + encodeURIComponent(id),
        { isActive: activeSet.has(id) });
    }
  };
  const loadSelectedTest = () => {
    try {
      const raw = localStorage.getItem(SELECTED_TEST_KEY);
      if (raw && TEST_TYPES[raw]) return raw;
    } catch (_) {}
    // Fall back to the first active test.
    return loadActiveTests()[0] || 'SAT';
  };
  const saveSelectedTest = (id) => {
    try { localStorage.setItem(SELECTED_TEST_KEY, id); } catch (_) {}
  };

  // ---- Per-test ENABLED subjects (admin-controlled) -----------------
  // Admin can enable/disable each subject (= section) inside each test.
  // Default: all subjects declared in TEST_TYPES[id].subjects are
  // enabled. When ALL subjects are disabled for a test, the test
  // itself is also disabled (cascade in the admin UI).
  // Stored as a JSON map: { SAT: ['math','reading-writing'], ACT: [...] }
  // Missing entries fall back to "all subjects on" so adding a new
  // subject in TEST_TYPES doesn't silently leave it off for existing
  // users. Hidden subjects (in stored data but no longer in catalog)
  // are filtered at read time.
  const ENABLED_SUBJECTS_KEY = 'stl_enabled_subjects';
  const _readEnabledSubjectsMap = () => {
    try {
      const raw = localStorage.getItem(ENABLED_SUBJECTS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (_) { return {}; }
  };
  const loadEnabledSubjects = (testId) => {
    const cfg = TEST_TYPES[testId];
    if (!cfg) return [];
    const all = (cfg.subjects && cfg.subjects.length) ? cfg.subjects : ['math'];
    const map = _readEnabledSubjectsMap();
    const stored = map[testId];
    if (!Array.isArray(stored)) return all.slice();   // default: every subject on
    // Filter to the catalog so deprecated subject IDs don't linger.
    const filtered = stored.filter((s) => all.includes(s));
    return filtered;
  };
  const saveEnabledSubjects = (testId, subjects) => {
    if (!TEST_TYPES[testId]) return;
    const map = _readEnabledSubjectsMap();
    map[testId] = subjects.slice();
    try { localStorage.setItem(ENABLED_SUBJECTS_KEY, JSON.stringify(map)); } catch (_) {}
    stlApiBackground('PUT', '/api/admin/test-config?id=' + encodeURIComponent(testId),
      { enabledSubjects: subjects.slice() });
  };

  // ---- Per-test/run USER-SELECTED subjects (score screen) -----------
  // On the score screen, the user can toggle which subjects to include
  // in this run's question pool. Defaults to "every admin-enabled
  // subject for this test" so the row reads as inclusive by default.
  // Persisted per test so the user's preference (e.g., "I'm drilling
  // SAT Math only this week") survives across sessions.
  const SELECTED_SUBJECTS_KEY = 'stl_selected_subjects';
  const _readSelectedSubjectsMap = () => {
    try {
      const raw = localStorage.getItem(SELECTED_SUBJECTS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (_) { return {}; }
  };
  const loadSelectedSubjects = (testId) => {
    const enabled = loadEnabledSubjects(testId);
    if (enabled.length === 0) return [];
    const map = _readSelectedSubjectsMap();
    const stored = map[testId];
    if (!Array.isArray(stored)) return enabled.slice();   // default: all enabled
    // Intersect with enabled — user selection can never include a
    // subject the admin has turned off.
    const filtered = stored.filter((s) => enabled.includes(s));
    // If the intersection is empty (e.g., admin turned off the only
    // subject the user had chosen), fall back to "all enabled" so the
    // pool isn't accidentally empty.
    return filtered.length ? filtered : enabled.slice();
  };
  const saveSelectedSubjects = (testId, subjects) => {
    if (!TEST_TYPES[testId]) return;
    const map = _readSelectedSubjectsMap();
    map[testId] = subjects.slice();
    try { localStorage.setItem(SELECTED_SUBJECTS_KEY, JSON.stringify(map)); } catch (_) {}
  };

  // Expose TEST_TYPES to the test runner so suites can validate per-test
  // pool integrity without duplicating the config.
  if (typeof window !== 'undefined') {
    window.STL_TEST_HOOKS = window.STL_TEST_HOOKS || {};
    window.STL_TEST_HOOKS.TEST_TYPES = TEST_TYPES;
    window.STL_TEST_HOOKS.TEST_TYPE_ORDER = TEST_TYPE_ORDER;
    window.STL_TEST_HOOKS.SUBJECT_NAMES = SUBJECT_NAMES;
    window.STL_TEST_HOOKS.subjectName = subjectName;
    window.STL_TEST_HOOKS.subjectsForTest = subjectsForTest;
    window.STL_TEST_HOOKS.loadEnabledSubjects = loadEnabledSubjects;
    window.STL_TEST_HOOKS.saveEnabledSubjects = saveEnabledSubjects;
    window.STL_TEST_HOOKS.loadSelectedSubjects = loadSelectedSubjects;
    window.STL_TEST_HOOKS.saveSelectedSubjects = saveSelectedSubjects;
  }

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
    // Reads the localStorage map. Post-migration the bank rows from
    // /api/questions ALREADY carry server-side overrides merged in,
    // but the localStorage entries are the very same values (because
    // every admin write dual-writes to both), so re-applying them on
    // top is identity. Crucially, this also lets a brand-new local
    // edit show up in assembleBank() immediately — without it, the
    // UI wouldn't reflect an Archive/Approve/Delete until the next
    // page-load + API refetch.
    //
    // Edge case: if another admin changes a value the local user has
    // an older override for, the local override would shadow the new
    // server value on next page load. Acceptable for two admins; the
    // long-term fix is a timestamp-based pruner that drops local
    // overrides matching the server row.
    try {
      const raw = localStorage.getItem(ADMIN_OVERRIDES_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (_) { return {}; }
  };
  // Alias kept for callers that previously needed the raw map. Same
  // function now that the migration-gate is gone.
  const loadAdminOverridesRaw = loadAdminOverrides;
  const saveAdminOverrides = (overrides) => {
    try { localStorage.setItem(ADMIN_OVERRIDES_KEY, JSON.stringify(overrides)); return true; }
    catch (e) { console.warn('stl: override write failed', e); return false; }
  };

  // ----- per-test composition overrides ---------------------------------
  // Admin-editable overrides for cfg.length and cfg.subjectMix per test.
  // Shape stored in localStorage:
  //   { SAT: { length: 30, subjectMix: { math: 13, 'reading-writing': 17 } },
  //     ACT: { length: 50, subjectMix: { english: 18, math: 14, ... } }, ... }
  // Empty / missing entries fall back to the cfg defaults in TEST_TYPES.
  // The admin Tests panel reads via getEffectiveTestConfig() so the user
  // never sees stale values, and the score-screen sampler reads the same
  // helper so changes apply on the next quiz start.
  const STL_TEST_COMP_KEY = 'stl_test_compositions';

  const loadTestCompositions = () => {
    try {
      const raw = localStorage.getItem(STL_TEST_COMP_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object') ? parsed : {};
    } catch (_) { return {}; }
  };
  const saveTestCompositions = (next) => {
    try { localStorage.setItem(STL_TEST_COMP_KEY, JSON.stringify(next)); return true; }
    catch (e) { console.warn('stl: test composition write failed', e); return false; }
  };
  // Per-test setter — pass `null` for length/subjectMix to revert that
  // field to default. Returns the patched compositions map.
  const updateTestComposition = (testId, patch) => {
    const all = loadTestCompositions();
    const cur = all[testId] || {};
    const next = { ...cur };
    if (patch && Object.prototype.hasOwnProperty.call(patch, 'length')) {
      if (patch.length == null) delete next.length;
      else next.length = patch.length;
    }
    if (patch && Object.prototype.hasOwnProperty.call(patch, 'subjectMix')) {
      if (patch.subjectMix == null) delete next.subjectMix;
      else next.subjectMix = patch.subjectMix;
    }
    if (Object.keys(next).length === 0) delete all[testId];
    else all[testId] = next;
    saveTestCompositions(all);
    // Mirror to Supabase test_config. We send the FULL effective values
    // (after merging with TEST_TYPES defaults) so the row always
    // reflects the admin's intent — null = revert to default. The API
    // accepts null to clear, so explicit clears land correctly.
    stlApiBackground('PUT', '/api/admin/test-config?id=' + encodeURIComponent(testId), {
      length:     Object.prototype.hasOwnProperty.call(patch, 'length')     ? patch.length     : undefined,
      subjectMix: Object.prototype.hasOwnProperty.call(patch, 'subjectMix') ? patch.subjectMix : undefined,
    });
    return all;
  };
  // Reset a test's composition entirely to defaults.
  const resetTestComposition = (testId) => {
    const all = loadTestCompositions();
    if (all[testId]) {
      delete all[testId];
      saveTestCompositions(all);
    }
    return all;
  };
  // Get the effective length + subjectMix for a test, merging cfg
  // defaults with any admin overrides. Always returns a fresh object.
  const getEffectiveTestConfig = (testId) => {
    const cfg = TEST_TYPES[testId];
    if (!cfg) return null;
    const overrides = loadTestCompositions()[testId] || {};
    return {
      length:     overrides.length     != null ? overrides.length     : cfg.length,
      subjectMix: overrides.subjectMix != null ? overrides.subjectMix : cfg.subjectMix,
      isOverridden: !!(overrides.length != null || overrides.subjectMix != null),
    };
  };

  // Admin-added questions live in a separate localStorage bucket from
  // the file-based banks. They merge into the same ALL/LIVE arrays
  // via assembleBank(). When Supabase ships, this bucket migrates to
  // a `questions` table; the merge logic stays the same.
  //
  // Declared up here (before assembleBank) because the first
  // assembleBank() call at module load needs to read this. A
  // `typeof loadAdminAdded === "function"` guard does NOT bypass the
  // const/let temporal dead zone — it would throw the same
  // ReferenceError as a direct reference.
  const ADMIN_ADDED_KEY = 'stl_admin_added_questions';
  const loadAdminAdded = () => {
    // Returns the localStorage array. Post-migration, admin-added rows
    // also live in Supabase and come back via /api/questions — they're
    // deduped at assembleBank() time by primary key (q.id), so having
    // them in both places is safe and lets a freshly-added question
    // show up immediately without waiting for an API refetch.
    try {
      const raw = localStorage.getItem(ADMIN_ADDED_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  };
  // Alias kept for symmetry with loadAdminOverridesRaw.
  const loadAdminAddedRaw = loadAdminAdded;
  const saveAdminAdded = (arr) => {
    try { localStorage.setItem(ADMIN_ADDED_KEY, JSON.stringify(arr)); return true; }
    catch (e) { console.warn('stl: admin-added write failed', e); return false; }
  };
  const newAdminQuestionId = () => {
    // Format: q-A<base36-timestamp><random>. Distinct from q-7xxx
    // (human-curated) and q-8xxx (AI-batch-1) ID ranges.
    const ts  = Date.now().toString(36);
    const rnd = Math.random().toString(36).slice(2, 5);
    return 'q-A' + ts + rnd;
  };

  // Defaults applied to admin-added rows (mirrors the file-bank
  // defaults blocks). Per-row fields override these.
  const ADMIN_ADDED_DEFAULTS = {
    source:       'human-curated',     // overridden per-question (image flow → 'ai-generated')
    state:        'live',
    reviewStatus: 'verified',
    section:      'math',
    testType:     'SAT',               // backwards-compatible default
  };

  // ----- imports registry + cascade-delete bookkeeping -------------------
  // STL_IMPORTS is populated by each `questions-*.js` import file via a
  // self-registering `window.STL_IMPORTS = (window.STL_IMPORTS || []).concat(
  // [{id, label, source, generatedAt, file, count, ...}])` block emitted
  // by web/tools/convert_upload_questions.py. The Imports admin tab
  // reads it to build the card list.
  //
  // "Delete an import" doesn't (and can't) rip the <script src> tag at
  // runtime — instead we mark the import id as deleted in localStorage,
  // and assembleBank() filters every question carrying that importId
  // out of the assembled bank. Restoring is a matter of removing the id
  // from the deleted set. Hard-removal of the .js file is a separate
  // operator step (delete file + script tag + redeploy).
  const STL_IMPORTS_DELETED_KEY = 'stl_imports_deleted';
  const loadDeletedImports = () => {
    try {
      const raw = localStorage.getItem(STL_IMPORTS_DELETED_KEY);
      if (!raw) return new Set();
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_) { return new Set(); }
  };
  const saveDeletedImports = (set) => {
    try {
      localStorage.setItem(STL_IMPORTS_DELETED_KEY, JSON.stringify([...set]));
      return true;
    } catch (e) { console.warn('stl: deleted-imports write failed', e); return false; }
  };
  const setImportDeleted = (importId, deleted) => {
    const cur = loadDeletedImports();
    if (deleted) cur.add(importId);
    else cur.delete(importId);
    saveDeletedImports(cur);
    assembleBank();
    document.dispatchEvent(new CustomEvent('stl:bank-updated'));
    // Mirror to Supabase imports.deleted_at — admins on other devices
    // pick up the change on next /api/questions fetch (or via the
    // imports list endpoint).
    stlApiBackground('POST',
      '/api/admin/imports?id=' + encodeURIComponent(importId) +
      '&action=' + (deleted ? 'delete' : 'restore'));
  };
  // Build a {importId → count} map from the assembled bank so the
  // Imports tab card list always reflects what would actually appear.
  // We count BEFORE filtering deleted imports so a deleted import still
  // shows its original size — the user is restoring "an import of N".
  const buildImportCounts = () => {
    const counts = {};
    const human = window.STL_QUESTIONS_HUMAN || [];
    const ai = window.STL_QUESTIONS_AI || [];
    for (const q of human.concat(ai)) {
      if (q && q.importId) counts[q.importId] = (counts[q.importId] || 0) + 1;
    }
    return counts;
  };

  const assembleBank = () => {
    const humanDefaults = window.STL_QUESTIONS_HUMAN_DEFAULTS || {};
    const aiDefaults    = window.STL_QUESTIONS_AI_DEFAULTS    || {};
    const iseeDefaults  = window.STL_QUESTIONS_ISEE_DEFAULTS  || {};
    const actDefaults   = window.STL_QUESTIONS_ACT_DEFAULTS   || {};
    const psatDefaults  = window.STL_QUESTIONS_PSAT_DEFAULTS  || {};
    const ssatDefaults  = window.STL_QUESTIONS_SSAT_DEFAULTS  || {};
    const hsptDefaults  = window.STL_QUESTIONS_HSPT_DEFAULTS  || {};
    const human         = window.STL_QUESTIONS_HUMAN || [];
    const ai            = window.STL_QUESTIONS_AI    || [];
    const isee          = window.STL_QUESTIONS_ISEE  || [];
    const act           = window.STL_QUESTIONS_ACT   || [];
    const psat          = window.STL_QUESTIONS_PSAT  || [];
    const ssat          = window.STL_QUESTIONS_SSAT  || [];
    const hspt          = window.STL_QUESTIONS_HSPT  || [];
    const added         = loadAdminAdded();
    const overrides     = loadAdminOverrides();
    const deletedImports = loadDeletedImports();

    const merge = (defaults, q) => {
      const base = { ...defaults, ...q };
      const ov = overrides[base.id];
      return ov ? { ...base, ...ov } : base;
    };

    // Cascade-delete: if a question's importId is in the deleted set
    // (set by the Imports admin tab's "Delete all questions" action),
    // it is excluded from the assembled bank entirely. assembleBank()
    // runs fresh on every override change so toggling deletion takes
    // effect without a reload.
    const notImportDeleted = (q) => !(q && q.importId && deletedImports.has(q.importId));
    // Per-question soft-delete: state==='deleted' (set via the review
    // modal's Delete action) is also filtered out. Same model as the
    // import-level cascade — the override stays in localStorage so a
    // future "Restore deleted" UI can revert it.
    const notSoftDeleted = (q) => !(q && q.state === 'deleted');

    // Dedupe by q.id. Post-migration the API returns every question
    // (including admin-added ones), but the localStorage admin-added
    // bucket also still gets read so a freshly-added row appears
    // immediately. Without this dedupe, an admin-added question would
    // appear twice the moment the API knows about it. Iteration order
    // is preserved (first occurrence wins) so file/test order is
    // stable; admin-added rows that the API already has just stay
    // in their original API-bucket position.
    const dedupeById = (rows) => {
      const seen = new Set();
      const out = [];
      for (const q of rows) {
        if (!q || !q.id) continue;
        if (seen.has(q.id)) continue;
        seen.add(q.id);
        out.push(q);
      }
      return out;
    };
    const all = dedupeById([
      ...human.map((q) => merge(humanDefaults, q)),
      ...ai.map((q)    => merge(aiDefaults, q)),
      ...isee.map((q)  => merge(iseeDefaults, q)),
      ...act.map((q)   => merge(actDefaults, q)),
      ...psat.map((q)  => merge(psatDefaults, q)),
      ...ssat.map((q)  => merge(ssatDefaults, q)),
      ...hspt.map((q)  => merge(hsptDefaults, q)),
      ...added.map((q) => merge(ADMIN_ADDED_DEFAULTS, q)),
    ]).filter((q) => notImportDeleted(q) && notSoftDeleted(q));
    window.STL_QUESTIONS_ALL = all;
    // window.STL_QUESTIONS = the QUIZ pool — questions the live quiz
    // serves the current attempt. Filters by:
    //   1. state === 'live'   (excludes archived/unpublished/needs-review)
    //   2. testType === selectedTest   (no cross-test mixing — an SAT
    //      attempt only serves SAT questions, ISEE only serves ISEE)
    // Legacy questions without a testType are treated as SAT so the
    // existing 515-row bank stays in the SAT pool by default.
    const selected = loadSelectedTest();
    window.STL_QUESTIONS = all.filter((q) =>
      q.state === 'live' && (q.testType || 'SAT') === selected
    );
  };
  // Run synchronously so the rest of the file (and existing callers
  // that already read window.STL_QUESTIONS) see the assembled bank.
  assembleBank();
  // Expose so bank-loader.js (which lives outside this IIFE) can
  // re-run the merge after lazy-loading questions for a test.
  window.assembleBank = assembleBank;

  // Pick the right entry screen for the user based on how many tests
  // the admin has Activated:
  //   • 1 active   → score-input (existing UX, no picker friction)
  //   • 2+ active  → picker grid (user picks a test, then score)
  // Used by the splash "Get started" button, boot router, and any
  // navigation back to the start of the flow.
  const entryScreenName = () => loadActiveTests().length > 1 ? 'picker' : 'score';

  // Mutate-and-rebuild helper used by admin actions. Pass an updater
  // function that receives the overrides map and returns the next
  // map; the helper persists, rebuilds the bank, and notifies any
  // listeners (currently: a dispatched 'stl:bank-updated' event).
  // The Supabase mirror diffs prev vs next and POSTs only the rows
  // that actually changed — so a single setQuestionState() call writes
  // one API row, not the whole map.
  const updateOverrides = (updater) => {
    const prev = loadAdminOverridesRaw();
    const next = updater(prev);
    saveAdminOverrides(next);
    assembleBank();
    document.dispatchEvent(new CustomEvent('stl:bank-updated'));
    // Diff + mirror to Supabase question_overrides. Only fields the
    // schema knows about (state/stem/choices/answer/explanation/topic/
    // difficulty) get sent; everything else (note/noteAttachments)
    // goes through its own /api/admin/note endpoint and isn't part
    // of this map in the first place.
    const trackedKeys = ['state', 'stem', 'choices', 'answer', 'explanation', 'topic', 'difficulty'];
    const changed = new Set([...Object.keys(prev), ...Object.keys(next)]);
    for (const qid of changed) {
      const a = prev[qid] || {};
      const b = next[qid] || {};
      const diff = {};
      let any = false;
      for (const k of trackedKeys) {
        const ak = a[k], bk = b[k];
        // Deep-ish compare via JSON since values include arrays/objects.
        if (JSON.stringify(ak) !== JSON.stringify(bk)) {
          diff[k] = bk === undefined ? null : bk;
          any = true;
        }
      }
      if (!any) continue;
      // If only `state` changed, use the lighter state-only endpoint.
      const onlyState = Object.keys(diff).length === 1 && 'state' in diff;
      if (onlyState) {
        stlApiBackground('PUT', '/api/admin/question-state?id=' + encodeURIComponent(qid),
          { state: diff.state });
      } else {
        stlApiBackground('PUT', '/api/admin/question?id=' + encodeURIComponent(qid), diff);
      }
    }
  };

  // (loadAdminAdded / saveAdminAdded / newAdminQuestionId now live
  //  near the top of the file, before assembleBank's first call.)
  const addAdminQuestion = (q) => {
    const arr = loadAdminAddedRaw();
    arr.push(q);
    saveAdminAdded(arr);
    assembleBank();
    document.dispatchEvent(new CustomEvent('stl:bank-updated'));
    // Mirror to Supabase questions table. Dedupe at assembleBank()
    // means an eventually-returned-via-API copy of the same row
    // doesn't double-render.
    stlApiBackground('POST', '/api/admin/question', q);
  };
  const addAdminQuestions = (questions) => {
    const arr = loadAdminAddedRaw();
    questions.forEach((q) => arr.push(q));
    saveAdminAdded(arr);
    assembleBank();
    document.dispatchEvent(new CustomEvent('stl:bank-updated'));
    // Each question gets its own POST. They're independent so they
    // can fire in parallel; the API is idempotent on id so retries
    // are safe.
    for (const q of questions) stlApiBackground('POST', '/api/admin/question', q);
  };

  // Duplicate detection — same question text shouldn't be added twice.
  // Normalize whitespace, casing, and trailing punctuation so cosmetic
  // differences ("What is 2+2?" vs " what is 2+2 " vs "What is 2+2") all
  // collide. Returns the matching question (from STL_QUESTIONS_ALL) or null.
  const normalizeStem = (s) => {
    if (!s) return '';
    return String(s)
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[\s\.\?!,;:]+$/g, '')
      .trim();
  };
  const findDuplicateStem = (stem, excludeId) => {
    const norm = normalizeStem(stem);
    if (!norm) return null;
    const all = window.STL_QUESTIONS_ALL || [];
    for (let i = 0; i < all.length; i++) {
      const q = all[i];
      if (excludeId && q.id === excludeId) continue;
      if (normalizeStem(q.stem) === norm) return q;
    }
    return null;
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

  // Resolve which test's tier thresholds to use. Default: the user's
  // current selectedTest (so the score-screen Easy/Medium/Hard pills
  // light up correctly per test). Callers that know a question's
  // testType (admin table, etc.) can pass it in as the second arg.
  const _tiersFor = (testIdOrCfg) => {
    if (testIdOrCfg && typeof testIdOrCfg === 'object' && testIdOrCfg.tiers) {
      return testIdOrCfg.tiers;
    }
    const id = typeof testIdOrCfg === 'string'
      ? testIdOrCfg
      : (typeof loadSelectedTest === 'function' ? loadSelectedTest() : 'SAT');
    const cfg = (typeof TEST_TYPES !== 'undefined' && TEST_TYPES[id]) || null;
    return (cfg && cfg.tiers) || { easy: 500, medium: 600, hard: 700 };
  };

  // Tier labels for UI display, computed from a numeric score.
  // Used by the score-screen tier pill animation, admin filter, and
  // anywhere we want to show a friendly band for a given difficulty.
  // testType is optional — falls back to the user's current selected
  // test (covers the score-screen case). Pass an explicit testType
  // (or its TEST_TYPES cfg) when ranking a question whose testType
  // may differ from selectedTest (e.g. admin table rendering).
  const tierLabelFor = (score, testType) => {
    if (score == null || isNaN(score)) return 'medium';
    const t = _tiersFor(testType);
    if (score <= t.easy)   return 'easy';
    if (score <= t.medium) return 'medium';
    if (score <= t.hard)   return 'hard';
    return 'insane';
  };

  // Cumulative band for a target score — the score-screen tier
  // shortcuts use this to set is-active on every tier ≤ the target.
  const tiersForScore = (score, testType) => {
    const t = _tiersFor(testType);
    if (score <= t.easy)   return ['easy'];
    if (score <= t.medium) return ['easy', 'medium'];
    if (score <= t.hard)   return ['easy', 'medium', 'hard'];
    return ['easy', 'medium', 'hard', 'insane'];
  };

  // Expose to the test runner so suites can assert per-test behavior.
  if (typeof window !== 'undefined') {
    window.STL_TEST_HOOKS = window.STL_TEST_HOOKS || {};
    window.STL_TEST_HOOKS.tierLabelFor = tierLabelFor;
    window.STL_TEST_HOOKS.tiersForScore = tiersForScore;
  }

  // Question filter — accepts either a numeric target score (new) or
  // an allowed-tiers array (legacy). With a numeric target, any
  // question whose difficulty is ≤ target is eligible.
  const eligibleQuestions = (targetOrTiers, restrictTopics = null) => {
    const isNumeric = typeof targetOrTiers === 'number';
    const tierSet = isNumeric ? null : new Set(targetOrTiers);
    // When "Include lower difficulty questions" is OFF, narrow the
    // pool to the SAME tier band as the target score. So a target of
    // 28 on ACT (Medium tier) yields only medium-tier questions — no
    // easy ones mixed in. When ON (default), the cumulative behavior
    // is preserved (questions at or below the target).
    const includeLower = loadIncludeLower();
    const targetTier = (isNumeric && !includeLower) ? tierLabelFor(targetOrTiers) : null;
    // Subject filter — pool is narrowed to the user-selected subjects
    // for the currently-selected test. A null/empty selection acts as
    // "all subjects allowed" so we don't accidentally produce an empty
    // pool if persistence reads return nothing. Questions with no
    // section default to 'math' (matches the back-compat tagging used
    // by the original SAT-only bank).
    const sel = loadSelectedTest();
    const allowedSubjects = loadSelectedSubjects(sel);
    const subjectFilterActive = Array.isArray(allowedSubjects) && allowedSubjects.length > 0;
    const subjectSet = subjectFilterActive ? new Set(allowedSubjects) : null;
    return (window.STL_QUESTIONS || []).filter((q) => {
      // Numeric difficulty (post-migration) → compare against target
      // score. Fall back to legacy tier-name comparison if the bank
      // still has string-difficulty rows somehow.
      if (isNumeric) {
        const d = typeof q.difficulty === 'number' ? q.difficulty : null;
        if (d == null) return false;
        if (!includeLower) {
          // Only questions whose tier band matches the target.
          if (tierLabelFor(d, q.testType) !== targetTier) return false;
        } else {
          if (d > targetOrTiers) return false;
        }
      } else {
        const tier = typeof q.difficulty === 'number'
          ? tierLabelFor(q.difficulty)
          : q.difficulty;
        if (!tierSet.has(tier)) return false;
      }
      // Grid-in items have no choices array, but they're still valid —
      // the only constraint is they must have an `answer` defined.
      if (q.answer == null) return false;
      if (!Array.isArray(q.choices)) {
        // OK as long as it's a grid-in; require a string answer
        if (typeof q.answer !== 'string') return false;
      }
      if (restrictTopics && !restrictTopics.has(q.topic)) return false;
      // Subject (= section) gate. Untagged questions default to 'math'.
      if (subjectSet) {
        const subj = q.section || 'math';
        if (!subjectSet.has(subj)) return false;
      }
      return true;
    });
  };

  // Compute the target test composition for the current selection.
  // Returns { length, perSubject } where perSubject is a Map from
  // section name to question count. This is the "real test" composition
  // scaled to the user's selected-subject filter:
  //
  //   - All subjects selected → use cfg.subjectMix as-is, total = cfg.length
  //   - Subset selected       → take only the picked rows of cfg.subjectMix;
  //                             total = sum of those rows (so SAT R&W only
  //                             yields a 54-question quiz)
  //   - Test has no mix data  → fall back to TEST_LENGTH (30), no per-
  //                             subject targets
  //
  // The cfg.subjectMix table is the source of truth; it stays in sync
  // with the cfg.length sum (sum-check is enforced by the math-render
  // tests below).
  const computeTestComposition = () => {
    const sel = loadSelectedTest();
    const eff = getEffectiveTestConfig(sel);
    if (!eff || !eff.subjectMix) {
      return { length: TEST_LENGTH, perSubject: null };
    }
    const enabled = loadEnabledSubjects(sel);
    const allowedSubjects = loadSelectedSubjects(sel);
    const subjectFilterActive = Array.isArray(allowedSubjects) && allowedSubjects.length > 0;
    const set = subjectFilterActive
      ? new Set(allowedSubjects)
      : new Set(enabled);
    const perSubject = new Map();
    let length = 0;
    for (const [sub, count] of Object.entries(eff.subjectMix)) {
      if (!set.has(sub)) continue;
      const n = Number(count);
      if (!Number.isFinite(n) || n <= 0) continue;
      perSubject.set(sub, n);
      length += n;
    }
    if (length === 0) {
      // Defensive: empty subject set should never happen but if it does,
      // fall back to the legacy 30-question quiz with no targets.
      return { length: TEST_LENGTH, perSubject: null };
    }
    return { length, perSubject };
  };

  // Bucket-sample a pool of questions into a real-test composition. Each
  // section gets exactly `perSubject.get(section)` items if the bank has
  // them; if a section is short, fill from itself by repeating before
  // borrowing from other sections (a 30-q SAT R&W single-subject quiz
  // shouldn't suddenly serve Math). Returns a flat shuffled array.
  const sampleByComposition = (pool, perSubject, totalLength) => {
    if (!perSubject) {
      // Legacy code path: no per-subject targets. Same behavior as
      // before this commit.
      if (pool.length === 0) return [];
      if (pool.length >= totalLength) return shuffle(pool).slice(0, totalLength);
      const base = shuffle(pool);
      const filled = base.slice();
      while (filled.length < totalLength) filled.push(base[filled.length % base.length]);
      return filled;
    }
    // Bucket the pool by section.
    const bySection = new Map();
    for (const q of pool) {
      const sec = q.section || 'math';
      if (!bySection.has(sec)) bySection.set(sec, []);
      bySection.get(sec).push(q);
    }
    const out = [];
    for (const [section, count] of perSubject.entries()) {
      const bucket = shuffle(bySection.get(section) || []);
      if (bucket.length === 0) continue;        // no questions for this section
      if (bucket.length >= count) {
        out.push(...bucket.slice(0, count));
      } else {
        // Repeat-fill within the same section to hit the count, so the
        // section composition stays right even when the bank is thin.
        const padded = bucket.slice();
        while (padded.length < count) padded.push(bucket[padded.length % bucket.length]);
        out.push(...padded);
      }
    }
    // Shuffle the final pool so sections interleave (mirrors the modular
    // structure of the real exams — a student bouncing between subjects
    // rather than grinding 75 English then 60 Math).
    return shuffle(out);
  };

  const buildTest = (allowedTiers, restrictTopics = null) => {
    const pool = eligibleQuestions(allowedTiers, restrictTopics);
    const { length, perSubject } = computeTestComposition();
    return sampleByComposition(pool, perSubject, length);
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

  // ----- guest identity ---------------------------------------------------
  // Anonymous visitors get a stable, locally-generated guest ID. Their
  // attempts are tagged with this ID so the admin Users tab can group
  // and analyze them. When the user signs in we re-tag those attempts
  // with their email (see `migrateGuestToUser`).
  const GUEST_ID_KEY = 'stl_guest_id';
  const ensureGuestId = () => {
    try {
      let id = localStorage.getItem(GUEST_ID_KEY);
      if (id) return id;
      id = 'g_' +
        Math.random().toString(36).slice(2, 8) +
        Date.now().toString(36).slice(-4);
      localStorage.setItem(GUEST_ID_KEY, id);
      return id;
    } catch (_) {
      // Storage unavailable — fall back to a per-session ID.
      return 'g_session_' + Math.random().toString(36).slice(2, 8);
    }
  };
  // Deterministic 4-digit display number derived from the guest ID.
  // Doesn't guarantee uniqueness across millions of guests, but for an
  // admin UI labeling localStorage-only identities it's enough to
  // disambiguate at a glance.
  const guestDisplayNumber = (id) => {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
    return Math.abs(h) % 9000 + 1000; // 1000–9999
  };
  const guestDisplayName = (id) => 'Guest #' + guestDisplayNumber(id);

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
    // Preview mode (the "Participant view" button in the review modal
    // opens the app with ?preview-question=<id>) — skip persisting the
    // attempt so previewing a question from admin doesn't pollute the
    // user's real history.
    if (window.__STL_PREVIEW_MODE__) return true;
    const arr = loadAttempts();
    arr.push(att);
    while (arr.length > STL_MAX_ATTEMPTS) arr.shift();
    const ok = persistAttempts(arr);
    // Mirror to Supabase. Guests (no session cookie) fail the API auth
    // check with a 401, which we treat as "user wasn't signed in" and
    // log without bothering the UI. The localStorage entry survives so
    // a future sign-in + backfill picks it up.
    stlApiBackground('POST', '/api/attempts', att);
    return ok;
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
    // Identity tag — email if signed in, otherwise guest ID. Persisted
    // on the attempt so the admin Users tab can group attempts by user.
    const me = (window.STL_AUTH && window.STL_AUTH.getCurrentUser && window.STL_AUTH.getCurrentUser()) || null;
    const email   = me ? me.email : null;
    const guestId = email ? null : ensureGuestId();
    return {
      v: STL_SCHEMA_VERSION,
      id: newAttemptId(),
      synthetic: !!opts.synthetic,
      email,
      guestId,
      startedAt: state.testStartedAt || Date.now(),
      completedAt: state.testEndedAt || Date.now(),
      totalElapsedMs: totalElapsedMs(),
      targetScore: state.score,
      tiers: state.tiers ? state.tiers.slice() : [],
      restrictTopics: state.restrictTopics || null,
      // Capture which test this attempt belongs to so the History view
      // can filter by test type later. Pulled from the user's selected
      // test at submission time; falls back to the first question's
      // testType for legacy paths that didn't set selectedTest.
      testType: loadSelectedTest() ||
                (state.test[0] && state.test[0].testType) ||
                'SAT',
      // Was the pool cumulative (included lower tiers) or narrowed to
      // a single tier when this attempt was generated? Captured so
      // History can later distinguish the two modes. Stored as the
      // toggle's value (true = lower difficulties included).
      includeLower: loadIncludeLower(),
      questions: state.test.map((q) => ({ qid: q.id, snap: questionSnap(q) })),
      answers: state.answers.map((a) => ({
        qid: a.qid, picked: a.picked, signal: a.signal,
        correct: a.correct, perm: a.perm,
      })),
    };
  };

  // When an anonymous user signs in, re-attribute every attempt that
  // has the current guest ID to their email. Returns the count of
  // attempts re-tagged.
  const migrateGuestToUser = (email) => {
    if (!email) return 0;
    let guestId;
    try { guestId = localStorage.getItem(GUEST_ID_KEY); } catch (_) { guestId = null; }
    if (!guestId) return 0;
    const arr = loadAttempts();
    let n = 0;
    for (const att of arr) {
      // Re-tag attempts that match this guest ID, OR legacy attempts
      // that were saved before identity tagging existed (no email,
      // no guestId — assume they belong to this device).
      const isLegacyUntagged = !att.email && !att.guestId;
      if (att.guestId === guestId || isLegacyUntagged) {
        att.email = email;
        att.guestId = null;
        n++;
      }
    }
    if (n > 0) persistAttempts(arr);
    // Drop the guest ID — once attached to a user, this device's
    // future attempts also go under the user's email.
    try { localStorage.removeItem(GUEST_ID_KEY); } catch (_) {}
    return n;
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
      const txt = formatDuration(elapsed);
      // Inline timer pill — write only into the #quiz-timer-text span
      // so the leading dot/glow span isn't replaced. Falls back to
      // #quiz-timer for older markup just in case.
      const el = $('#quiz-timer-text') || $('#quiz-timer');
      if (el) el.textContent = txt;
      // Mirror to the mobile-bar timer so focus mode shows the same value.
      const mob = $('#quiz-mobile-timer');
      if (mob) mob.textContent = txt;
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
    const mob = $('#quiz-mobile-timer');
    if (mob) mob.textContent = '0:00';
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
    // `none` is the explicit opt-out — used by showScreen when the
    // navigation crosses into or out of a non-test-flow screen, where
    // the hero-card slide would feel out of place.
    if (direction === 'none' || reduceMotion()) {
      update();
      return Promise.resolve();
    }

    // `fade` — pure JS opacity crossfade that DELIBERATELY bypasses
    // the View Transitions API. Used for admin ↔ rest transitions
    // where the card-shaped (~700px wide) → page-shaped (full-width)
    // layout difference would cause a visible layout jump when VT
    // snapshots the page at the old layout, then swaps to the new
    // larger one at the end of the transition. The opacity-only
    // crossfade has no snapshot phase, so the DOM swap happens while
    // the canvas is invisible and the user never sees the resize.
    if (direction === 'fade') {
      const main = document.getElementById('stl-main') || document.body;
      const FADE_OUT = 160;
      const FADE_IN  = 200;
      return new Promise((resolve) => {
        main.style.transition = 'opacity ' + FADE_OUT + 'ms ease';
        main.style.opacity = '0';
        setTimeout(() => {
          update();
          // Two RAFs: first lets the new DOM lay out, second commits
          // the opacity-1 target so the transition fires cleanly.
          requestAnimationFrame(() => requestAnimationFrame(() => {
            main.style.transition = 'opacity ' + FADE_IN + 'ms ease';
            main.style.opacity = '1';
            setTimeout(() => {
              main.style.transition = '';
              main.style.opacity = '';
              resolve();
            }, FADE_IN);
          }));
        }, FADE_OUT);
      });
    }

    // All other directions use the native View Transitions API.
    if (!document.startViewTransition) {
      update();
      return Promise.resolve();
    }
    const html = document.documentElement;
    // Set BOTH a class AND inline CSS variables so the back-direction
    // animations apply via either mechanism. CSS variables cascade
    // directly into the ::view-transition-* pseudo-elements (which
    // are descendants of <html>), so they're more reliable than class
    // selectors against the snapshot pseudo-element tree, where some
    // engines have inconsistent specificity behavior.
    if (direction === 'back') {
      html.classList.add('stl-going-back');
      html.style.setProperty('--vt-card-out', 'stl-card-out-right');
      html.style.setProperty('--vt-card-in',  'stl-card-in-left');
    } else {
      html.style.setProperty('--vt-card-out', 'stl-card-out-left');
      html.style.setProperty('--vt-card-in',  'stl-card-in-right');
    }
    return document.startViewTransition(update).finished
      .catch(() => {})
      .finally(() => {
        html.classList.remove('stl-going-back');
        html.style.removeProperty('--vt-card-out');
        html.style.removeProperty('--vt-card-in');
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
  const screens = ['splash', 'picker', 'score', 'quiz', 'results', 'review', 'regen', 'history', 'analysis', 'admin', 'login', 'forbidden'];
  // Screens that participate in the hero-card slide animation. Two
  // groups: the test flow (picker → score → quiz → results → review →
  // regen) and the top-level tabs (history / analysis / admin). The
  // animation is gated on BOTH sides of a transition being in this
  // set — crossings to/from splash, login, forbidden swap instantly
  // (those pages don't share the card-shaped hero, so the morph would
  // look like the wrong shape collapsing into the wrong shape).
  const ANIMATED_SCREENS = new Set([
    'picker', 'score', 'quiz', 'results', 'review', 'regen',
    'history', 'analysis', 'admin',
  ]);
  // Left-to-right tab order in the header. Used to pick a direction
  // when one tab transitions to another: if the destination sits to
  // the right of the source, slide forward (new card comes in from
  // the right); to the left, slide back. Mirrors how a phone tab bar
  // animates between sibling views.
  const TAB_ORDER = ['history', 'analysis', 'admin'];
  // The admin screen is page-shaped (wider canvas, no hero card) while
  // every other screen wraps content in .stl-card--hero. The horizontal-
  // slide animation that pairs hero cards together looks like a
  // "horizontal expand" when one side has no hero card to morph from,
  // so transitions in or out of admin are forced to a pure crossfade.
  const visibleScreenName = () => {
    for (const s of screens) {
      const el = document.querySelector(`[data-screen="${s}"]`);
      if (el && !el.hidden) return s;
    }
    return null;
  };
  // Slide the shared underline indicator under the active nav tab.
  // Reads each tab's offsetLeft/offsetWidth relative to the nav's
  // padding box, then drives the indicator's transform + width.
  // Hides the indicator entirely when no tab matches the current
  // screen (so e.g. score / quiz pages don't show a phantom bar).
  // Declared as `function` (not const) so it's hoisted — showScreen
  // calls it via the typeof guard regardless of source order.
  function updateNavIndicator () {
    const nav = document.querySelector('.stl-header__nav');
    const indicator = document.getElementById('header-nav-indicator');
    if (!nav || !indicator) return;
    const active = nav.querySelector('.stl-header__nav-link[aria-current="page"]');
    // No active tab (e.g. on score / splash / login) → hide indicator.
    if (!active || active.hidden) {
      indicator.classList.remove('is-ready');
      return;
    }
    // offsetLeft is relative to the nearest positioned ancestor — the
    // nav itself, which we made `position: relative`. So no extra math
    // is needed beyond reading the active link's geometry directly.
    const left  = active.offsetLeft;
    const width = active.offsetWidth;
    // Drive position via a CSS variable so the bounce keyframes can
    // compose translateX(X) with scaleX/scaleY without fighting the
    // inline style. Width stays inline because it's the property the
    // bounce animation also animates (no conflict).
    indicator.style.setProperty('--nav-indicator-x', left + 'px');
    indicator.style.transform = 'translateX(var(--nav-indicator-x, 0))';
    indicator.style.width = width + 'px';
    // First call: position synchronously, then fade-in on the next
    // frame so the initial placement doesn't slide from x=0. Once
    // `is-ready` is on, subsequent updates slide smoothly between
    // tabs via the CSS transition on transform + width.
    if (!indicator.classList.contains('is-ready')) {
      requestAnimationFrame(() => indicator.classList.add('is-ready'));
    }
  }

  // One-shot bounce on the active-tab indicator. Used when the user
  // clicks the tab they're already on — showScreen would no-op so
  // the click would feel dead. The CSS keyframe composes scaleY/X
  // pulses with the current translateX(var(--nav-indicator-x)) so
  // the bar pulses in place rather than jumping to x=0.
  const bounceNavIndicator = () => {
    const indicator = document.getElementById('header-nav-indicator');
    if (!indicator) return;
    indicator.classList.remove('is-bouncing');
    // Force a reflow so re-adding the class restarts the animation.
    void indicator.offsetWidth;
    indicator.classList.add('is-bouncing');
  };
  // Strip the class once the animation ends so a subsequent click
  // can re-trigger it.
  document.addEventListener('animationend', (e) => {
    const ind = document.getElementById('header-nav-indicator');
    if (ind && e.target === ind && e.animationName === 'stl-nav-indicator-bounce') {
      ind.classList.remove('is-bouncing');
    }
  });
  // Keep the indicator aligned across viewport resizes (the tab widths
  // can change with breakpoint-driven padding/font-size tweaks).
  window.addEventListener('resize', () => {
    if (typeof updateNavIndicator === 'function') updateNavIndicator();
  });

  const showScreen = (name, beforeNew, direction) => {
    const from = visibleScreenName();
    // Hero-card slide is gated to transitions between two animated
    // screens (test flow + tabs). Touching splash/login/forbidden on
    // either side opts out — those don't share the hero-card shape.
    if (!ANIMATED_SCREENS.has(name) || (from && !ANIMATED_SCREENS.has(from))) {
      direction = 'none';
    } else if (!direction) {
      // No explicit direction passed — infer one from tab order so
      // tab-to-tab nav reads like a phone tab bar (left tab = back,
      // right tab = forward). Non-tab transitions default to forward.
      const fromIdx = TAB_ORDER.indexOf(from);
      const toIdx   = TAB_ORDER.indexOf(name);
      if (fromIdx !== -1 && toIdx !== -1) {
        direction = (toIdx > fromIdx) ? 'forward' : 'back';
      } else {
        direction = 'forward';
      }
    }
    // Admin page is page-shaped (no hero card) — fall back to crossfade
    // so the slide doesn't morph between mismatched layouts.
    if (direction !== 'none' && (name === 'admin' || from === 'admin')) direction = 'fade';
    return withTransition(() => {
      screens.forEach((s) => {
        const el = document.querySelector(`[data-screen="${s}"]`);
        if (el) el.hidden = (s !== name);
      });
      // Notify other modules that a screen change has happened.
      // Currently used by the Google Sign-In init to re-render the
      // GSI button when the login screen becomes visible (the iframe
      // gets 0x0 dimensions when mounted into a hidden parent).
      try {
        document.dispatchEvent(new CustomEvent('stl:screen-changed', { detail: { name } }));
      } catch (_) {}
      // Persist the new screen so a refresh restores it. Run after the
      // event dispatch so any listener-triggered state changes are
      // captured in the saved payload.
      if (typeof saveResumeState === 'function') saveResumeState();
      $('#btn-restart').hidden = (name === 'splash' || name === 'score' || name === 'history' || name === 'analysis' || name === 'admin');
      // "New test" header CTA — visible from anywhere you could
      // sensibly start a fresh test: home/score, the two tab pages,
      // results, regen, admin. Hidden mid-test (quiz/review) to avoid
      // a single-click way to lose progress, hidden on splash (which
      // already has its own "Get started" CTA), and hidden on the
      // auth screens where it'd just route into the login wall.
      // "New test" CTA is now visible on every user-facing screen so
      // it's always one click away to start a fresh test. The only
      // exceptions are the auth walls (login / forbidden) where
      // routing into a test makes no sense. On quiz / review the
      // button stays visible but the click handler intercepts and
      // confirms before discarding the in-progress test.
      const newTestBtn = $('#btn-new-test');
      if (newTestBtn) newTestBtn.hidden = (name === 'login' || name === 'forbidden');
      // The header timer is only meaningful on the quiz screen — other
      // screens either have no test yet (score), summarize (results,
      // regen), or already show per-item context (review). Hidden state
      // mirrors btn-restart's logic.
      const timerEl = $('#quiz-timer');
      if (timerEl) timerEl.hidden = (name !== 'quiz');
      // The "Highlight" math-color toggle is only meaningful once the
      // user has actually started a test (questions on screen). Before
      // then it's noise. Persisted preference is kept in localStorage
      // (MATH_COLOR_KEY) so toggling it during a quiz survives across
      // sessions even though the button isn't visible at boot.
      const mathColorBtn = $('#btn-toggle-math-color');
      if (mathColorBtn) {
        mathColorBtn.hidden = !(name === 'quiz' || name === 'review' || name === 'results' || name === 'regen');
      }
      // Splash and picker have no chosen test yet — repaint the accent
      // to a neutral white so the CTA/dots/glows don't carry over a
      // previous session's test color. The score screen and beyond
      // call applyTestAccent via renderScoreScreenForTest. Admin gets
      // its own stable lavender so the UI chrome doesn't shift between
      // tests while admins are managing questions across the whole bank.
      if (name === 'splash' || name === 'picker' || name === 'login' || name === 'forbidden') {
        applyNeutralAccent();
      } else if (name === 'admin') {
        applyAdminAccent();
        // Admin views the whole bank, not just one test. Lazy-loader
        // skips test-by-test fetches when admin is entered; one
        // /api/questions call hydrates everything. Idempotent — the
        // loader no-ops if the full bank is already cached this session.
        if (typeof window.__STL_LOAD_ALL_QUESTIONS__ === 'function') {
          window.__STL_LOAD_ALL_QUESTIONS__()
            .catch((e) => console.warn('[stl] admin bank load failed:', e && e.message));
        }
      } else if (name === 'history' || name === 'analysis') {
        // History / Analysis read attempt records that reference
        // questions across whichever tests the user has practiced.
        // Fetch the full bank so review modals + question lookups
        // resolve. Idempotent.
        if (typeof window.__STL_LOAD_ALL_QUESTIONS__ === 'function') {
          window.__STL_LOAD_ALL_QUESTIONS__()
            .catch((e) => console.warn('[stl] history bank load failed:', e && e.message));
        }
      }
      // Primary nav tabs (History / Analysis / Admin) live to the
      // right of the wordmark. They're always visible — the active
      // tab is signaled with the underline indicator wired via
      // aria-current="page", NOT by hiding the matching button.
      // Exception: hide the whole nav row while inside a quiz/review
      // (mid-test states where bailing would discard work).
      const navLinks = document.querySelectorAll('.stl-header__nav-link[data-nav]');
      const hideNav = (name === 'quiz' || name === 'review');
      navLinks.forEach((link) => {
        // Admin link still respects its role gate — initAuth sets
        // data-role-admin via the hidden attr when the user signs in
        // as admin; we never un-hide it here.
        const isAdminLink = link.id === 'btn-admin-go';
        const adminAllowed = window.STL_AUTH && window.STL_AUTH.isAdmin && window.STL_AUTH.isAdmin();
        if (isAdminLink) {
          link.hidden = hideNav || !adminAllowed;
        } else {
          link.hidden = hideNav;
        }
        const active = link.dataset.nav === name;
        if (active) link.setAttribute('aria-current', 'page');
        else        link.removeAttribute('aria-current');
      });
      // Slide the shared underline to the new active tab. Runs after
      // the hidden/aria mutations above so geometry reflects the
      // post-change layout.
      if (typeof updateNavIndicator === 'function') updateNavIndicator();
      if (typeof beforeNew === 'function') beforeNew();
      // No smooth scroll — the View Transition handles the visual continuity.
      window.scrollTo(0, 0);
    }, direction);
  };

  // ----- score screen ----------------------------------------------------
  // Render the score-screen UI for the currently-selected test:
  //   • Headline test name + gradient
  //   • Score input min/max/step + placeholder + hint
  //   • Tier shortcut buttons (built from TEST_TYPES.tiers)
  // Called whenever selectedTest changes (picker tile click, admin
  // toggling tests, page boot).
  const renderScoreScreenForTest = () => {
    const sel = loadSelectedTest();
    const cfg = TEST_TYPES[sel] || TEST_TYPES.SAT;
    // Repaint the global accent to match this test (toggle, CTA,
    // navbar dot, focus rings, pills, links — everything that reads
    // from --stl-accent will pick it up immediately).
    applyTestAccent(sel);
    const nameEl = $('#score-test-name');
    if (nameEl) nameEl.textContent = cfg.name;
    // Lazy load: bank-loader no longer fetches the bank on boot. The
    // questions for this test get fetched the first time the score
    // screen renders for it. We show a brand spinner over the form
    // while it loads; on success, re-run renderScoreScreenForTest so
    // the live pool is populated. If the test already loaded this
    // session (e.g., user came back from a result), the loader is a
    // no-op and the form renders normally.
    const isLoadingThisTest = !!window.__STL_TEST_LOADING__ && window.__STL_TEST_LOADING__.has(sel);
    const hasAnyQuestionsForTest = (window.STL_QUESTIONS_ALL || [])
      .some((q) => (q.testType || 'SAT') === sel);
    if (!hasAnyQuestionsForTest && !isLoadingThisTest && typeof window.__STL_LOAD_QUESTIONS_FOR_TEST__ === 'function') {
      window.__STL_TEST_LOADING__ = window.__STL_TEST_LOADING__ || new Set();
      window.__STL_TEST_LOADING__.add(sel);
      window.__STL_LOAD_QUESTIONS_FOR_TEST__(sel)
        .catch((e) => console.warn('[stl] test load failed:', e && e.message))
        .finally(() => {
          window.__STL_TEST_LOADING__.delete(sel);
          // Re-render so the form / empty-state reflect the freshly-
          // loaded bank.
          renderScoreScreenForTest();
        });
    }
    // Toggle the score-form vs. an inline empty-state card based on
    // whether the selected test actually has live questions. We can't
    // start a quiz without questions, so show a clear message + a
    // "Pick a different test" link instead of the score input form.
    // While we're still mid-fetch, hide both and show a loader.
    const form = $('#score-form');
    const emptyEl = $('#score-empty');
    const livePool = (window.STL_QUESTIONS_ALL || [])
      .filter((q) => q.state === 'live' && (q.testType || 'SAT') === sel);
    const stillLoading = !hasAnyQuestionsForTest &&
      window.__STL_TEST_LOADING__ && window.__STL_TEST_LOADING__.has(sel);
    // Mount / unmount the loader row inside the score card.
    const scoreCard = $('#screen-score') || document.body;
    let loaderEl = scoreCard.querySelector('.stl-score__loader');
    if (stillLoading) {
      if (!loaderEl) {
        loaderEl = document.createElement('div');
        loaderEl.className = 'stl-score__loader stl-loading-row';
        loaderEl.innerHTML =
          '<span class="stl-loader stl-loader--lg"></span>' +
          '<span>Loading ' + escapeHtml(cfg.name) + ' questions…</span>';
        (form ? form.parentNode : scoreCard).insertBefore(loaderEl, form);
      }
      if (form) form.hidden = true;
      if (emptyEl) emptyEl.hidden = true;
      return;   // skip the rest until the bank arrives
    }
    if (loaderEl) loaderEl.remove();
    const isEmpty = livePool.length === 0;
    if (form) form.hidden = isEmpty;
    if (emptyEl) {
      emptyEl.hidden = !isEmpty;
      if (isEmpty) {
        const otherActive = loadActiveTests().filter((t) => t !== sel);
        emptyEl.innerHTML =
          '<h2 class="stl-h1" style="font-size:clamp(1.4rem,3.5vw,1.9rem)">No ' + escapeHtml(cfg.name) + ' questions yet.</h2>' +
          '<p class="stl-sub">We\'re still building out the ' + escapeHtml(cfg.name) + ' question bank. ' +
          (otherActive.length > 0
            ? '<button type="button" class="stl-back-link" data-go-picker="1"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg><span>Pick a different test</span></button>'
            : 'Check back soon.') +
          '</p>';
      }
    }
    // Back navigation — the "New test" header CTA always routes
    // through the picker, so picker is the canonical predecessor to
    // the score screen. Always surface the back link so the user can
    // pop back to the test-type chooser regardless of how many tests
    // are active. Mobile back arrow points at picker on desktop-flow
    // hits; falls back to splash only when picker would have nothing
    // to pick from (zero active tests — defensive, shouldn't happen).
    const desktopBack = $('#score-back-to-picker');
    if (desktopBack) desktopBack.hidden = false;
    const hasPickerTarget = loadActiveTests().length > 0;
    const mobileBack = $('#score-mobile-back');
    if (mobileBack) {
      mobileBack.setAttribute('data-mobile-back', hasPickerTarget ? 'picker' : 'splash');
      mobileBack.setAttribute('aria-label', hasPickerTarget ? 'Back to test selection' : 'Back to home');
    }
    const input = $('#score-input');
    if (input) {
      input.min = cfg.scoreMin;
      input.max = cfg.scoreMax;
      input.step = cfg.scoreStep;
      input.placeholder = String(cfg.scoreDefault);
      // Default the target score to the test's default (the medium-
      // tier representative score). Tier clicks override this; the
      // "Set custom score" link reveals the input for hand-editing.
      // Without a default, submitting the form (without first clicking
      // a tier) would fail validation — bad UX now that the input is
      // hidden by default.
      if (input.value === '' || Number(input.value) < cfg.scoreMin || Number(input.value) > cfg.scoreMax) {
        input.value = String(cfg.scoreDefault);
      }
    }
    const hint = $('#score-hint');
    if (hint) {
      hint.classList.remove('is-error');
      hint.textContent = `${cfg.scoreMin}–${cfg.scoreMax}, in ${cfg.scoreStep === 1 ? '1-point' : cfg.scoreStep + '-point'} steps.`;
    }
    // Rebuild tier shortcuts from cfg.tiers. The keys easy/medium/hard
    // each carry their threshold; we add an "insane" pseudo-tier
    // pinned to the test's max score so users always have a top-end
    // shortcut.
    const tiersEl = $('#score-tiers');
    if (tiersEl) {
      const t = cfg.tiers;
      // Each tier renders as a tile with two text rows on desktop:
      //   • name  ("Easy" / "Medium" / "Hard" / "Insane") — dominant
      //   • range ("≤460" / "470–560" / etc) — subtitle
      // Mobile collapses to a pill row via CSS that hides .__name on
      // the smaller break.
      const buttons = [
        { tier: 'easy',   score: t.easy,                            name: 'Easy',   range: '≤' + t.easy },
        { tier: 'medium', score: t.medium,                          name: 'Medium', range: (t.easy + cfg.scoreStep) + '–' + t.medium },
        { tier: 'hard',   score: t.hard,                            name: 'Hard',   range: (t.medium + cfg.scoreStep) + '–' + t.hard },
        { tier: 'insane', score: cfg.scoreMax,                      name: 'Insane', range: (t.hard + cfg.scoreStep) + '–' + cfg.scoreMax },
      ];
      tiersEl.innerHTML = buttons.map((b) =>
        '<button type="button" class="stl-tier" data-tier="' + b.tier + '" data-score="' + b.score +
          '" aria-label="Set target to ' + b.score + ' — ' + b.name + ' tier">' +
          '<span class="stl-tier__name">' + escapeHtml(b.name) + '</span>' +
          '<span class="stl-tier__range">' + escapeHtml(b.range) + '</span>' +
        '</button>'
      ).join('');
    }
    // ---- Subject picker -------------------------------------------
    // Render a pill row of admin-enabled subjects for this test. The
    // user toggles each pill independently; the row is hidden entirely
    // when the test only has one enabled subject (no choice = no UI).
    renderSubjectPicker();
    // ---- Start-test CTA label -------------------------------------
    // Reflect the real-test composition the user is about to take so
    // the CTA reads "Start 98-question test" for SAT, etc. Updates
    // again whenever the subject filter or test selection changes.
    refreshStartTestLabel();
  };

  // Recompute the Start CTA label from the current selection. Pulled
  // out so the subject-toggle handlers can call it without re-rendering
  // the full score screen.
  const refreshStartTestLabel = () => {
    const btn = $('#score-start-test');
    if (!btn) return;
    const { length } = computeTestComposition();
    btn.textContent = 'Start ' + length + '-question test';
  };

  // Helper: render the subject pill row + hint based on the current
  // test's enabled subjects + the user's selection. Pulled out so the
  // include-lower switch's pill-isolation logic can mirror it after a
  // user click without re-running the full renderScoreScreenForTest.
  const renderSubjectPicker = () => {
    const wrap = $('#score-subjects-wrap');
    const row  = $('#score-subjects');
    const hint = $('#score-subjects-hint');
    if (!wrap || !row) return;
    const sel = loadSelectedTest();
    const enabled = loadEnabledSubjects(sel);
    // Only one subject for this test → no picker UI. The single
    // subject is auto-applied via loadSelectedSubjects defaulting to
    // "all enabled" anyway, so we just hide the row.
    if (enabled.length <= 1) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    const selected = new Set(loadSelectedSubjects(sel));
    row.innerHTML = enabled.map((subjId) => {
      const isOn = selected.has(subjId);
      return '<button type="button" class="stl-subject-pill" data-subject="' + escapeHtml(subjId) +
        '" aria-pressed="' + (isOn ? 'true' : 'false') + '">' +
        '<span class="stl-subject-pill__icon" aria-hidden="true">' + subjectIcon(subjId) + '</span>' +
        '<span class="stl-subject-pill__lbl">' + escapeHtml(subjectName(subjId)) + '</span>' +
        '</button>';
    }).join('');
    if (hint) {
      const count = selected.size;
      if (count === enabled.length) {
        hint.textContent = 'All subjects included.';
      } else if (count === 1) {
        hint.textContent = 'Only ' + subjectName([...selected][0]) + ' questions.';
      } else {
        hint.textContent = count + ' of ' + enabled.length + ' subjects selected.';
      }
    }
  };

  const initScore = () => {
    // Initial render for whatever's selected.
    renderScoreScreenForTest();

    // Desktop back-to-picker button. Appears in the score-screen card
    // when 2+ tests are Active (renderScoreScreenForTest sets the
    // visibility). On mobile this duplicates the back arrow in the
    // mobile bar, but having both targets the same screen keeps the
    // routing simple and obvious.
    const backToPicker = $('#score-back-to-picker');
    if (backToPicker) {
      backToPicker.addEventListener('click', () => {
        showScreen('picker', null, 'back');
      });
    }

    // "Pick a different test" link inside the empty-state card —
    // delegated because the empty-state HTML is rebuilt by
    // renderScoreScreenForTest() each time the selected test changes.
    const emptyEl = $('#score-empty');
    if (emptyEl) {
      emptyEl.addEventListener('click', (e) => {
        if (e.target.closest('[data-go-picker]')) {
          showScreen('picker', null, 'back');
        }
      });
    }

    const form = $('#score-form');
    const input = $('#score-input');
    const hint = $('#score-hint');

    const updateTiersHint = () => {
      const v = Number(input.value);
      // When the user has the toggle OFF (don't include lower), the
      // pill highlight isolates to the target tier only — the easier
      // pills shouldn't read as "active" since they're not in the
      // pool. When ON (cumulative), all tiers ≤ target light up.
      const includeLower = loadIncludeLower();
      const active = includeLower
        ? tiersForScore(v)
        : [tierLabelFor(v)];
      $$('#score-tiers .stl-tier').forEach((t) => {
        t.classList.toggle('is-active', active.includes(t.dataset.tier));
      });
    };
    input.addEventListener('input', updateTiersHint);

    // "Include lower difficulty questions" toggle. When ON (default),
    // the question pool is cumulative — questions at OR BELOW the
    // target tier (existing behavior). When OFF, the pool is narrowed
    // to JUST the target tier — useful for drilling one band hard.
    // Toggling re-renders the pill highlights so the active state
    // matches the new pool.
    const includeLowerSwitch = $('#score-strict-switch');
    const includeLowerHint   = $('#score-strict-hint');
    const renderIncludeLowerState = () => {
      const on = loadIncludeLower();
      if (includeLowerSwitch) includeLowerSwitch.setAttribute('aria-checked', on ? 'true' : 'false');
      if (includeLowerHint) {
        includeLowerHint.textContent = on
          ? 'Test includes questions at and below your target tier.'
          : 'Test only includes questions at your target tier.';
      }
      updateTiersHint();   // pill highlights track the toggle state
    };
    renderIncludeLowerState();
    if (includeLowerSwitch) {
      includeLowerSwitch.addEventListener('click', () => {
        const next = !loadIncludeLower();
        saveIncludeLower(next);
        renderIncludeLowerState();
      });
    }

    // Subject pills — toggle each on/off. Persisted per-test so the
    // user's preference (e.g., "always study SAT Math only") survives.
    // Re-rendering after each change keeps aria-pressed + the hint in
    // sync. Clicking the last-on pill is a no-op (kept on) so we never
    // produce an empty subject set silently — visual feedback in the
    // hint guides the user.
    const subjectsRow = $('#score-subjects');
    if (subjectsRow) {
      subjectsRow.addEventListener('click', (e) => {
        const pill = e.target.closest('.stl-subject-pill');
        if (!pill) return;
        const subjId = pill.dataset.subject;
        const sel = loadSelectedTest();
        const enabled = loadEnabledSubjects(sel);
        const current = new Set(loadSelectedSubjects(sel));
        if (current.has(subjId)) {
          // Refuse to remove the last selected subject.
          if (current.size <= 1) return;
          current.delete(subjId);
        } else {
          current.add(subjId);
        }
        // Preserve the catalog order in the saved list.
        const next = enabled.filter((s) => current.has(s));
        saveSelectedSubjects(sel, next);
        renderSubjectPicker();
        // CTA label depends on which subjects are checked — refresh
        // it whenever the user toggles a pill.
        refreshStartTestLabel();
      });
    }
    // "Set custom score" link — reveals the precise target-score input
    // on demand. Keeps the default screen tidy (the selected tier IS
    // the target for the common case) while still letting power users
    // dial in an exact number. State is local — no persistence — so
    // clicking the link again hides the input.
    const customToggle = $('#score-custom-toggle');
    const targetWrap   = $('#score-target-wrap');
    if (customToggle && targetWrap) {
      customToggle.addEventListener('click', () => {
        const expand = targetWrap.hidden;
        targetWrap.hidden = !expand;
        customToggle.setAttribute('aria-expanded', expand ? 'true' : 'false');
        customToggle.textContent = expand ? 'Hide custom score' : 'Set custom score';
        if (expand) {
          // Move keyboard focus into the input — power users almost
          // always reach for the field they just opened.
          const inp = $('#score-input');
          if (inp) { inp.focus(); inp.select && inp.select(); }
        }
      });
    }

    // Tier shortcut buttons — clicking one fills the input with that
    // tier's top-of-range score. Delegated because the buttons are
    // rebuilt every time the selected test changes.
    $('#score-tiers').addEventListener('click', (e) => {
      const tierBtn = e.target.closest('.stl-tier');
      if (!tierBtn) return;
      const score = tierBtn.dataset.score;
      if (!score) return;
      input.value = score;
      hint.classList.remove('is-error');
      const cfg = TEST_TYPES[loadSelectedTest()] || TEST_TYPES.SAT;
      hint.textContent = `${cfg.scoreMin}–${cfg.scoreMax}, in ${cfg.scoreStep === 1 ? '1-point' : cfg.scoreStep + '-point'} steps.`;
      updateTiersHint();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Login gate — generating a tailored test now requires an account.
      const me = (window.STL_AUTH && window.STL_AUTH.getCurrentUser && window.STL_AUTH.getCurrentUser()) || null;
      if (!me) {
        toast('Sign in to generate a tailored test');
        // Capture intent so post-sign-in routes back to the score
        // screen with the user's selected test/subject/tier intact.
        goToLoginScreen();
        return;
      }
      const cfg = TEST_TYPES[loadSelectedTest()] || TEST_TYPES.SAT;
      const raw = input.value.trim();
      const v = raw === '' ? Number(input.placeholder) : Number(raw);
      if (!v || v < cfg.scoreMin || v > cfg.scoreMax) {
        hint.textContent = `Please enter a score between ${cfg.scoreMin} and ${cfg.scoreMax}.`;
        hint.classList.add('is-error');
        input.focus();
        return;
      }
      hint.classList.remove('is-error');
      hint.textContent = `${cfg.scoreMin}–${cfg.scoreMax}, in ${cfg.scoreStep === 1 ? '1-point' : cfg.scoreStep + '-point'} steps.`;
      startTest(v);
    });
  };

  // Render the test-picker grid. Called once at boot. Each tile is a
  // click-to-start shortcut: setting selectedTest, re-rendering the
  // score screen, and routing to it. When only one test is Active,
  // this whole screen is bypassed by the boot router (see initRouter).
  const initPicker = () => {
    const grid = $('#picker-grid');
    if (!grid) return;
    const active = loadActiveTests();
    const tiles = active.map((id) => {
      const cfg = TEST_TYPES[id];
      if (!cfg) return '';
      // The wordmark SVG is trusted (we author it in TEST_TYPES) so
      // injecting as innerHTML is safe.
      return (
        '<button type="button" class="stl-picker__tile" data-test="' + id + '" role="listitem"' +
          ' aria-label="Start a ' + cfg.name + ' practice test"' +
          ' style="--tile-tint: ' + (resolveTint(id) || cfg.tint) + '">' +
          '<div class="stl-picker__mark">' + cfg.wordmark + '</div>' +
          '<div class="stl-picker__meta">' +
            '<div class="stl-picker__name">' + escapeHtml(cfg.name) + '</div>' +
            '<div class="stl-picker__tagline">' + escapeHtml(cfg.tagline) + '</div>' +
          '</div>' +
        '</button>'
      );
    }).join('');
    grid.innerHTML = tiles;

    grid.addEventListener('click', (e) => {
      const tile = e.target.closest('.stl-picker__tile');
      if (!tile) return;
      const id = tile.dataset.test;
      if (!id || !TEST_TYPES[id]) return;
      // Setting selectedTest immediately. assembleBank() rebuilds the
      // STL_QUESTIONS pool to the new test, then we re-render the
      // score screen and route to it. No Confirm step.
      saveSelectedTest(id);
      assembleBank();
      renderScoreScreenForTest();
      showScreen('score', null, 'forward');
    });
  };

  const startTest = (score, restrictTopics = null) => {
    state.score = score;
    state.tiers = tiersForScore(score);              // kept for the score-pill morph + attempt records
    state.test = buildTest(score, restrictTopics);   // numeric path: any question with difficulty ≤ score
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

  // Strict subset of MATH_NEIGHBOR used when looking PAST whitespace to
  // decide if a single-letter token in the skip set should still
  // italicize. Operators, parens, exponents, and comparators are
  // unambiguous "we're in an expression" signals — but `.`, `,`, `%`,
  // and bare digits all double as prose punctuation/quantities (`a total
  // of 5 things,`), so we deliberately omit them. Without this stricter
  // set, "There are 5, a total" would italicize the prose "a" because
  // the nearest non-space char before it is `,`. This catches the
  // canonical case ("10a² + a", "8a² + a + 8") cleanly.
  const MATH_OPERATOR_FAR = /[+\-=()*\/^²³⁰¹⁴⁵⁶⁷⁸⁹·×÷−∠°≤≥≠√±≈]/;
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
    // — that's the variable case. STEM_SKIP_LETTERS exists so the
    // indefinite article "a" / "A" / pronoun "I" / interjection "O"
    // don't italicize in prose. But in math context (e.g. "5a²", "3a",
    // "f(x) = a + b") those same letters ARE variables. So when a
    // skip-set letter has a math char (digit/operator/paren/exponent)
    // immediately on either side, treat it as a variable anyway.
    const MATH_NEIGHBOR = /[0-9+\-=()*\/^²³⁰¹⁴⁵⁶⁷⁸⁹·×÷−.,%∠°≤≥≠√±≈]/;
    const src = String(text);
    // Helper: walk left/right from a position, skipping ASCII whitespace,
    // and return the first non-whitespace character found (or '' at the
    // edge of the string). Lets the math-context check see past the
    // spaces in expressions like "10a² + a" — without it, the trailing
    // 'a' has only ' ' immediately before it and EOS after, so the
    // MATH_NEIGHBOR test fails and STEM_SKIP_LETTERS strips its italic.
    const nonSpaceBefore = (i) => {
      let j = i - 1;
      while (j >= 0 && /\s/.test(src.charAt(j))) j--;
      return j >= 0 ? src.charAt(j) : '';
    };
    const nonSpaceAfter = (i) => {
      let j = i;
      while (j < src.length && /\s/.test(src.charAt(j))) j++;
      return j < src.length ? src.charAt(j) : '';
    };
    return src.replace(
      /([A-Za-z](?:\.[A-Za-z])+\.?|[A-Za-z]+(?:['’][A-Za-z]+)*)|([^A-Za-z]+)/g,
      (m, word, other, offset) => {
        if (other) return escapeHtml(other);
        if (word.length === 1) {
          // Two-tier math-context check:
          //   1. IMMEDIATE neighbor (no whitespace between) — anything in
          //      the broad MATH_NEIGHBOR set counts. So `5a`, `x²`, `a.`,
          //      `a,` all italicize on the immediate signal.
          //   2. PAST-whitespace neighbor — only the stricter
          //      MATH_OPERATOR_FAR set counts (no `.` `,` `%` digits).
          //      So `10a² + a` italicizes the trailing `a` (sees `+` past
          //      the space), but `5, a total` does NOT (only sees `,`).
          //
          // The OR of the two lets the renderer catch trailing/middle/
          // leading single-letter variables in expressions while leaving
          // prose alone.
          const beforeImm = offset > 0 ? src.charAt(offset - 1) : '';
          const afterImm  = src.charAt(offset + word.length);
          const beforeFar = nonSpaceBefore(offset);
          const afterFar  = nonSpaceAfter(offset + word.length);
          const inMathContext =
            MATH_NEIGHBOR.test(beforeImm) || MATH_NEIGHBOR.test(afterImm) ||
            MATH_OPERATOR_FAR.test(beforeFar) || MATH_OPERATOR_FAR.test(afterFar);
          if (inMathContext || !STEM_SKIP_LETTERS.has(word)) {
            return '<em class="stl-quiz__var">' + escapeHtml(word) + '</em>';
          }
          return escapeHtml(word);
        }
        // Multi-letter run. Default is plain text (English words).
        // BUT: when a multi-letter run sits *immediately* next to a digit
        // (no whitespace), it's almost always a chain of single-letter
        // variables stuck together — e.g. "35x^3y + 14xy" → "xy" follows
        // "14", or "5xyz" follows "5". We italicize each letter
        // individually so the whole token reads as math typography and
        // gets pulled into the expression run by wrapExpressions().
        //
        // Restricting the trigger to digit-adjacency keeps English words
        // safe: "X-axis" (axis preceded by `-`), "100 dollars" (dollars
        // preceded by space), "f(xy)" (xy preceded by `(`) all stay as
        // plain words. The cases where the directive matters are SAT
        // expressions where digits and variables sit flush against each
        // other.
        const beforeRun = offset > 0 ? src.charAt(offset - 1) : '';
        const afterRun  = src.charAt(offset + word.length);
        if (/\d/.test(beforeRun) || /\d/.test(afterRun)) {
          let out = '';
          for (const ch of word) {
            out += '<em class="stl-quiz__var">' + escapeHtml(ch) + '</em>';
          }
          return out;
        }
        return escapeHtml(word);
      }
    );
  };

  // ----- math expression rendering ---------------------------------------
  // SAT problems use a few notations that we render to proper typography.
  // This renderer walks the input HTML (already produced by formatStemHtml)
  // and converts:
  //
  //   \frac{a}{b}     → a display-style stacked fraction (numerator over
  //                     bar over denominator). For when (2x − 5)/3 needs
  //                     to read like a textbook, not a slash. Opt-in:
  //                     bank entries with plain `2/3` text remain inline.
  //   \sqrt{x}        → a radical with the radicand under a vinculum bar.
  //   ^(p/q)          → a stacked-fraction superscript (e.g. a^(1/2) → a½)
  //   ^(n)            → a plain <sup>n</sup>
  //   ^N              → a plain <sup>N</sup> for bare digit exponents
  //                     (x^2, x^10, x^-3). Bank entries already using
  //                     Unicode ² / ³ are untouched — the regex looks for
  //                     a literal `^`.
  //
  // \frac and \sqrt run FIRST, because their {} bodies may themselves
  // contain ^ exponents that the later passes need to rewrite. Both use
  // a tiny brace-balance scanner so nested braces work
  // (e.g. \frac{x^{n+1}}{n+1}).
  //
  // Operates on HTML output (post-escaping), so the regex only needs to
  // care about the literal patterns; HTML tags inserted by formatStemHtml
  // don't contain `\frac` / `\sqrt` / `^` / unescaped `(` so they don't
  // collide.
  const consumeBalancedBraces = (src, startIdx) => {
    // src[startIdx] must be '{'. Returns { body, endIdx } where endIdx is
    // the index of the matching '}', or null if unbalanced.
    if (src.charAt(startIdx) !== '{') return null;
    let depth = 0;
    for (let i = startIdx; i < src.length; i++) {
      const ch = src.charAt(i);
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) return { body: src.slice(startIdx + 1, i), endIdx: i };
      }
    }
    return null;
  };
  const renderLatexCommands = (html) => {
    // Scan for `\frac` and `\sqrt` and rewrite in place. Two passes
    // (one per command) keep the regex-free scanner simple; both
    // recurse into their own bodies so nested usages resolve from the
    // inside out. The token is the command name WITHOUT the opening
    // brace — we then verify the next char IS `{` before consuming.
    const expand = (token, wrap) => {
      let out = '';
      let i = 0;
      const tokenLen = token.length;
      while (i < html.length) {
        const idx = html.indexOf(token, i);
        if (idx === -1) { out += html.slice(i); break; }
        out += html.slice(i, idx);
        // The char immediately after the command must be `{` for it
        // to be a valid invocation (`\fraction` or `\sqrt2` are
        // ignored — the token text passes through untouched).
        if (html.charAt(idx + tokenLen) !== '{') {
          out += html.slice(idx, idx + tokenLen);
          i = idx + tokenLen;
          continue;
        }
        const balanced = consumeBalancedBraces(html, idx + tokenLen);
        if (!balanced) {
          // Couldn't balance — leave the literal text alone and move past
          // the command marker to avoid infinite-loop on a malformed
          // entry. (Bank reviews will catch the bad source.)
          out += html.slice(idx, idx + tokenLen + 1);
          i = idx + tokenLen + 1;
          continue;
        }
        // For \frac, immediately consume the SECOND {} as the denominator.
        if (token === '\\frac') {
          const second = consumeBalancedBraces(html, balanced.endIdx + 1);
          if (!second) {
            out += html.slice(idx, balanced.endIdx + 1);
            i = balanced.endIdx + 1;
            continue;
          }
          out += wrap(balanced.body, second.body);
          i = second.endIdx + 1;
        } else {
          out += wrap(balanced.body);
          i = balanced.endIdx + 1;
        }
      }
      html = out;
    };
    expand('\\frac', (num, den) => {
      // Render numerator/denominator as display-style stacked fraction.
      // Recurse into both bodies so nested \frac and \sqrt resolve.
      return '<span class="stl-math-displayfrac">' +
        '<span class="stl-math-displayfrac__num">' + renderLatexCommands(num) + '</span>' +
        '<span class="stl-math-displayfrac__den">' + renderLatexCommands(den) + '</span>' +
        '</span>';
    });
    expand('\\sqrt', (radicand) => {
      return '<span class="stl-math-sqrt">' +
        '<span class="stl-math-sqrt__radical">√</span>' +
        '<span class="stl-math-sqrt__body">' + renderLatexCommands(radicand) + '</span>' +
        '</span>';
    });
    return html;
  };
  // Renderer-level safety net for any LaTeX commands that escaped the
  // converter (hand-edited bank entries, future imports with new
  // commands we haven't added to the converter table yet). Without
  // this, an un-translated `\Rightarrow` rendered literally as the
  // string "\Rightarrow" in the UI. We map a defensive copy of the
  // converter's table here so the UI degrades gracefully — and any
  // *truly* unknown `\foo` falls through to bare "foo" rather than
  // showing the backslash.
  //
  // Why duplicate the table? translateLatexCommands runs at IMPORT
  // time (offline + paste-flow). This runs at RENDER time. They serve
  // different populations: the importer covers everything in the
  // upload schema; this covers the long tail of edits / drift / new
  // command introductions before the converter table catches up.
  const RENDER_FALLBACK_LATEX = {
    'Rightarrow': '⇒', 'Leftarrow': '⇐', 'Leftrightarrow': '⇔',
    'rightarrow': '→', 'leftarrow': '←', 'leftrightarrow': '↔',
    'approx': '≈', 'ldots': '...', 'cdots': '⋯', 'infty': '∞',
    'geq': '≥', 'leq': '≤', 'neq': '≠',
    'cdot': '·', 'times': '×', 'div': '÷', 'pm': '±', 'mp': '∓',
    'ge': '≥', 'le': '≤', 'ne': '≠', 'to': '→', 'sim': '∼', 'circ': '°',
    'theta': 'θ', 'alpha': 'α', 'beta': 'β', 'gamma': 'γ',
    'delta': 'δ', 'Delta': 'Δ', 'phi': 'φ', 'omega': 'ω',
    'Omega': 'Ω', 'mu': 'μ', 'lambda': 'λ', 'sigma': 'σ',
    'Sigma': 'Σ', 'pi': 'π',
    'sin': 'sin', 'cos': 'cos', 'tan': 'tan', 'csc': 'csc',
    'sec': 'sec', 'cot': 'cot', 'log': 'log', 'ln': 'ln', 'exp': 'exp',
    // Sizing modifiers (drop) + script l + dots variants.
    'left': '', 'right': '', 'big': '', 'Big': '', 'bigg': '', 'Bigg': '',
    'ell': 'ℓ', 'dots': '...', 'dotsc': '...', 'dotsb': '...',
    // Wide spacing — render as a single ASCII space each (two for
    // qquad). The dark-mode rendered output reads natural without
    // chasing exact TeX widths.
    'quad': ' ', 'qquad': '  ',
    // Hat / vector / overrightarrow text-decoration commands that
    // most authors write inline. We don't render the diacritic — just
    // strip the command so the wrapped identifier stays readable. If
    // a specific item really needs the hat, edit it manually.
    'hat': '', 'vec': '', 'bar': '', 'tilde': '',
    // Geometry symbols.
    'parallel': '∥', 'nparallel': '∦', 'perp': '⊥',
    'angle': '∠', 'triangle': '△', 'mid': '|',
  };
  const renderMath = (html) => {
    if (html == null) return '';
    return String(renderLatexCommands(String(html)))
      // Strip non-letter escape sequences FIRST. The next pass only
      // matches \[A-Za-z]+ (the long-tail \cmd safety net), so things
      // like \%, \&, \$, \#, \_, \{, \}, and \<space> would slip
      // through and show as literal text in the choice / stem. These
      // appear in older imports that predate the converter's escape-
      // stripping pass; render-time cleanup means we don't have to
      // backfill the DB.
      //   \,  \;  \:    → single space (math spacing punctuation)
      //   \!            → no space (negative thin space)
      //   \<space>      → single space (manual thin space)
      //   \% \& \$      → literal % & $
      //   \# \_         → literal # _
      //   \{ \}         → literal { }
      .replace(/\\,/g, ' ')
      .replace(/\\;/g, ' ')
      .replace(/\\:/g, ' ')
      .replace(/\\!/g, '')
      .replace(/\\ /g, ' ')
      .replace(/\\%/g, '%')
      .replace(/\\&/g, '&')
      .replace(/\\\$/g, '$')
      .replace(/\\#/g, '#')
      .replace(/\\_/g, '_')
      .replace(/\\\{/g, '{')
      .replace(/\\\}/g, '}')
      // Safety net: any \word still present after renderLatexCommands
      // ran (which only handles \frac and \sqrt) gets translated here.
      // \word with a longer match wins by ordering of the regex:
      // [A-Za-z]+ is greedy, so \Rightarrow matches as one token not
      // \R + ightarrow.
      .replace(/\\([A-Za-z]+)/g, (whole, name) => {
        if (Object.prototype.hasOwnProperty.call(RENDER_FALLBACK_LATEX, name)) {
          return RENDER_FALLBACK_LATEX[name];
        }
        // Unknown command — strip the backslash and emit the bare
        // name. Better than showing "\foobar" to a student.
        return name;
      })
      // Parenthesized exponents — fraction or general expression.
      .replace(/\^\(([^()]+)\)/g, (_, body) => {
        const slashIdx = body.indexOf('/');
        if (slashIdx > 0 && slashIdx < body.length - 1) {
          const num = body.slice(0, slashIdx);
          const den = body.slice(slashIdx + 1);
          return '<span class="stl-math-fracsup">' +
            '<span class="stl-math-num">' + num + '</span>' +
            '<span class="stl-math-den">' + den + '</span>' +
            '</span>';
        }
        return '<sup class="stl-math-sup">' + body + '</sup>';
      })
      // LaTeX-brace exponents — `x^{n+1}`, `x^{1/2}`, `x^{-3}`. Behaves
      // the same as the parenthesized form above: an embedded slash
      // becomes a stacked-fraction superscript (fracsup), otherwise a
      // plain <sup>. Renders BEFORE the bare-digit pass so `^{12}` is
      // consumed as a brace expression, not as `^1` followed by `2}`.
      //
      // The optional `</span>` group covers the case where wrapExpressions
      // ended the math run at `^` (because `{` isn't a MATH_CHAR — we
      // can't include it without breaking `\sqrt{...}`). When a closer
      // is consumed, we re-emit it AFTER the rendered superscript so
      // the original span boundary is preserved.
      //
      // The fracsup detection skips bodies that contain HTML tags (`<`)
      // because the `/` inside `</em>` would otherwise be mistaken for
      // a fraction divider, mangling output like `^{n+1}` where `n` was
      // italicized into `<em class="stl-quiz__var">n</em>+1`.
      .replace(/\^(<\/span>)?\{([^{}]+)\}/g, (_, closer, body) => {
        const isTextOnly = !body.includes('<');
        const slashIdx = isTextOnly ? body.indexOf('/') : -1;
        let rendered;
        if (slashIdx > 0 && slashIdx < body.length - 1) {
          const num = body.slice(0, slashIdx);
          const den = body.slice(slashIdx + 1);
          rendered = '<span class="stl-math-fracsup">' +
            '<span class="stl-math-num">' + num + '</span>' +
            '<span class="stl-math-den">' + den + '</span>' +
            '</span>';
        } else {
          rendered = '<sup class="stl-math-sup">' + body + '</sup>';
        }
        // If we ate the closing `</span>`, put the sup BEFORE it so
        // the wrap span still closes where it did originally.
        return closer ? rendered + closer : rendered;
      })
      // Bare digit exponents like x^2, x^3, x^10, x^-3.
      // The body is one or more digits, optionally led by a `-` sign for
      // negative exponents. Runs AFTER the brace/paren forms so `^{12}`
      // is consumed by the brace handler and never re-matches here.
      .replace(/\^(-?\d+)/g, (_, body) => {
        return '<sup class="stl-math-sup">' + body + '</sup>';
      })
      // Bare single-letter exponents like x^t, a^n, b^m. Common SAT
      // pattern for variable exponents (e.g., exponential growth
      // `y = 1200(0.35)^t`). Restricted to ONE letter so the regex
      // doesn't accidentally swallow `2^trial` — multi-letter
      // exponents must use ^{...} braces.
      // Word-boundary `\b` after the letter prevents `x^tower` from
      // matching as `^t` + `ower`.
      .replace(/\^([a-zA-Z])\b/g, (_, body) => {
        return '<sup class="stl-math-sup">' + body + '</sup>';
      })
      // Wrapped-variable exponents — same shape as the bare-letter
      // pass above, but matches AFTER formatStemHtml has italicized
      // the letter as `<em class="stl-quiz__var">t</em>`. Without this
      // the renderer would walk past `^<em>t</em>` because the char
      // after `^` is `<` (HTML), not a letter.
      // The `<em>` wrap stays inside the `<sup>` so the variable
      // keeps its italic styling alongside the superscript size.
      .replace(/\^(<em class="stl-quiz__var">[A-Za-z]<\/em>)/g, (_, emTag) => {
        return '<sup class="stl-math-sup">' + emTag + '</sup>';
      });
  };

  // Wrap each "math run" (a contiguous sequence containing at least one
  // single-letter variable plus math chars / digits / parens / operators)
  // in <span class="stl-quiz__expr"> so the *whole* equation reads in the
  // accent color — not just the variables inside. Without this pass,
  // "(x + 4)(x + 2)" renders as purple `x`s + parens but white `+ 4`,
  // breaking the visual unit. The CSS rule for .stl-quiz__expr inherits
  // color: var(--stl-accent) so digits/operators/parens pick it up.
  //
  // Operates on the post-formatStemHtml HTML, where each variable is
  // already wrapped as <em class="stl-quiz__var">x</em>. A "math token"
  // is either one of those wrappers or a run of math chars; tokens may
  // be separated by whitespace within a run. Single-token runs (just
  // a lone variable mention like "what is x?") are NOT wrapped — only
  // multi-token runs that read as actual expressions.
  const wrapExpressions = (html) => {
    if (html == null) return '';
    const VAR_TOKEN = '<em class="stl-quiz__var">[A-Za-z]<\\/em>';
    // Math chars: digits, operators, parens, exponents, super/subscripts,
    // and common Unicode math symbols (angle, degree, comparators,
    // sqrt, plus/minus, approx). Excludes letters (variables go through
    // VAR_TOKEN), apostrophes/quotes, and sentence punctuation like ?!:;
    // Math chars EXCLUDES `{` and `}` on purpose: when the wrap regex
    // includes them, it also swallows the `{` of `\sqrt{...}` and
    // `\frac{...}{...}`, separating those commands from their arguments
    // and breaking renderLatexCommands. Instead, renderMath's `^{...}`
    // pass below tolerates a `</span>` between the `^` and `{` so
    // exponent bodies that wrap-broke still render correctly.
    const MATH_CHARS = '[0-9+\\-=()*\\/^²³⁰¹⁴⁵⁶⁷⁸⁹·×÷−.,%∠°≤≥≠√±≈]';
    // "Anchor" symbols — their presence in a run is enough to mark it
    // as math even without a wrapped letter variable. So "∠1 is 38°"
    // (no italic letters) still gets the math-color treatment.
    const MATH_ANCHORS = /[∠°≤≥≠√±≈]/;
    const TOKEN = `(?:${VAR_TOKEN}|${MATH_CHARS}+)`;
    const RUN_RE = new RegExp(`${TOKEN}(?:\\s*${TOKEN})*`, 'g');
    return html.replace(RUN_RE, (run, offset, full) => {
      // Trim trailing chars that aren't really part of the equation:
      //   • ASCII hyphen-minus `-` followed by a letter — that's a
      //     compound-word hyphen ("y-intercept", "x-axis"). Unicode
      //     minus `−` is unambiguous and never trimmed.
      //   • Period `.` followed by whitespace or end-of-string — that's
      //     a sentence terminator, not a decimal point.
      //   • Comma `,` followed by whitespace + a letter — sentence
      //     comma, not a coordinate separator.
      let trail = '';
      const peek = () => full.charAt(offset + run.length);
      while (run.length > 0) {
        const last = run[run.length - 1];
        const next = peek();
        const isWordHyphen = last === '-' && /[A-Za-z]/.test(next);
        const isSentencePeriod = last === '.' && (next === '' || /\s/.test(next));
        const isSentenceComma = last === ',' && /\s[A-Za-z]/.test(next + full.charAt(offset + run.length + 1));
        if (!isWordHyphen && !isSentencePeriod && !isSentenceComma) break;
        trail = last + trail;
        run = run.slice(0, -1);
      }
      const hasVar = run.includes('class="stl-quiz__var"');
      const hasAnchor = MATH_ANCHORS.test(run);
      // No variable AND no anchor → just plain digits/operators (e.g.
      // "25%" or "100" alone in prose). Skip — those don't need
      // typographic emphasis.
      if (!hasVar && !hasAnchor) return run + trail;
      // Solo variable already gets the accent via .stl-quiz__var alone.
      if (/^<em class="stl-quiz__var">[A-Za-z]<\/em>$/.test(run)) return run + trail;
      return '<span class="stl-quiz__expr">' + run + '</span>' + trail;
    });
  };

  // Convenience wrapper: escape + italicize variables + wrap math runs +
  // render math, in that order. Math runs last so the ^(p/q) fracsup
  // converter operates on the already-wrapped expression HTML, letting
  // the produced <sup>/fracsup nodes inherit the expression color.
  const formatRich = (text) => renderMath(wrapExpressions(formatStemHtml(text)));

  // Test seam: expose the math text helpers so the standalone test
  // runner can assert renderer behavior without spinning up a DOM.
  if (typeof window !== 'undefined') {
    window.STL_TEST_HOOKS = window.STL_TEST_HOOKS || {};
    window.STL_TEST_HOOKS.formatStemHtml = formatStemHtml;
    window.STL_TEST_HOOKS.wrapExpressions = wrapExpressions;
    window.STL_TEST_HOOKS.renderMath = renderMath;
    window.STL_TEST_HOOKS.formatRich = formatRich;
  }

  // ----- math color toggle (user pref) -----------------------------------
  // Stored as 'on' | 'off' in localStorage. The visual layer is a body
  // class — adding `stl-no-math-color` reverts both .stl-quiz__var and
  // .stl-quiz__expr to the surrounding text color (italic for variables
  // is preserved). Default is ON.
  const MATH_COLOR_KEY = 'stl_math_color';
  const loadMathColorPref = () => {
    try { return localStorage.getItem(MATH_COLOR_KEY) !== 'off'; }
    catch (_) { return true; }
  };
  const saveMathColorPref = (on) => {
    try { localStorage.setItem(MATH_COLOR_KEY, on ? 'on' : 'off'); } catch (_) {}
  };
  const applyMathColorPref = (on) => {
    document.body.classList.toggle('stl-no-math-color', !on);
    const btn = $('#btn-toggle-math-color');
    if (btn) btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  };
  // Boot the pref synchronously — set the body class BEFORE the rest of
  // the app renders so there's no flash of colored equations on load
  // for users who've opted out.
  applyMathColorPref(loadMathColorPref());

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

    // Snapshot cursor + answers so a refresh resumes on this question
    // with the exact prior progress. Runs on EVERY question render
    // (initial + every Next/Previous) so the persisted payload always
    // matches what's on screen.
    if (typeof saveResumeState === 'function') saveResumeState();

    const total = state.test.length;
    const counterText = `Question ${state.cursor + 1} of ${total}`;
    $('#quiz-counter').textContent = counterText;
    const mobCounter = $('#quiz-mobile-counter');
    if (mobCounter) mobCounter.textContent = counterText;
    // Quiz difficulty pill: show the friendly tier label but keep
    // the numeric difficulty available via data-score for any future
    // hover-tooltip work. data-d still drives the color CSS.
    const tier = tierLabelFor(q.difficulty);
    $('#quiz-difficulty').textContent = tier;
    $('#quiz-difficulty').setAttribute('data-d', tier);
    $('#quiz-difficulty').setAttribute('data-score', String(q.difficulty || ''));
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
  // ============================================================
  // Performance aggregation + strengths radar chart
  // ============================================================
  // Friendly axis label for a topic slug (e.g., "data-tables" → "Data Tables").
  const niceTopicLabel = (slug) => {
    if (!slug) return '';
    return String(slug)
      .split('-')
      .map((w) => w.length ? w[0].toUpperCase() + w.slice(1) : '')
      .join(' ');
  };

  // Per-topic performance for a single set of {answer, question} pairs.
  // Returns array of { topic, correct, total, pct } sorted by total desc
  // (so the radar's busiest axes are visible without scrolling).
  const computeTopicPerformance = (items) => {
    if (!Array.isArray(items) || items.length === 0) return [];
    const buckets = new Map();
    for (const it of items) {
      const q = it.question || it;
      const topic = q && q.topic;
      if (!topic) continue;
      const correct = it.answer ? !!it.answer.correct : !!it.correct;
      if (!buckets.has(topic)) buckets.set(topic, { topic, correct: 0, total: 0 });
      const b = buckets.get(topic);
      b.total++;
      if (correct) b.correct++;
    }
    return [...buckets.values()]
      .map((b) => ({ ...b, pct: b.total > 0 ? Math.round(100 * b.correct / b.total) : 0 }))
      .sort((a, b) => b.total - a.total);
  };

  // Number of topics to show per focus row (both Strengths and
  // Weaknesses). Kept small so the row stays single-line at the
  // narrowest viewport we support; ellipsis handles long topic names.
  const RADAR_FOCUS_TOP_N = 4;

  // Render BOTH focus lists side-by-side (Strengths first, then
  // Weaknesses). No tab toggle — the aside shows both simultaneously
  // since the radar itself already makes the high-low picture obvious
  // and dual lists give the user immediate "what to celebrate / what
  // to drill" context.
  // Generic renderer — both the History and Analysis pages call into
  // this with their own target selectors so the markup can be reused
  // without duplicating the sort/slice/HTML logic.
  // Crossfade the text inside a single span without disturbing its
  // surrounding chip. Captures the current text's box, overlays a
  // clone at exactly that position, swaps the live element's text,
  // then fades the clone out. The chip's box (li background, border,
  // padding) is untouched the whole time — only the text characters
  // crossfade.
  const crossfadeText = (textEl, newText) => {
    const cur = textEl.textContent;
    if (cur === newText) return;
    if (!cur) { textEl.textContent = newText; return; }
    const chip = textEl.parentElement;          // the <li>
    if (!chip) { textEl.textContent = newText; return; }
    // Use the chip as the positioning anchor — it already has stable
    // dimensions from the flex layout, so the clone can sit over the
    // text-bearing span with pixel-precise coordinates derived from
    // its rect relative to the chip.
    const tRect = textEl.getBoundingClientRect();
    const cRect = chip.getBoundingClientRect();
    const prevChipPosition = chip.style.position;
    const cs = getComputedStyle(chip);
    if (cs.position === 'static') chip.style.position = 'relative';
    const clone = textEl.cloneNode(true);
    Object.assign(clone.style, {
      position: 'absolute',
      top:      (tRect.top - cRect.top) + 'px',
      left:     (tRect.left - cRect.left) + 'px',
      width:    tRect.width + 'px',
      height:   tRect.height + 'px',
      margin:   '0',
      pointerEvents: 'none',
      opacity:  '1',
      transition: 'opacity 240ms cubic-bezier(0.32, 0.72, 0, 1)',
      zIndex:   '2',
    });
    chip.appendChild(clone);
    textEl.textContent = newText;
    requestAnimationFrame(() => { clone.style.opacity = '0'; });
    setTimeout(() => {
      if (clone.parentElement) clone.parentElement.removeChild(clone);
      if (!prevChipPosition) chip.style.position = '';
    }, 260);
  };

  const renderHistoryRadarFocusInto = (targets, perfRows) => {
    const strengthsEl  = $(targets.strengths);
    const weaknessesEl = $(targets.weaknesses);
    if (!strengthsEl || !weaknessesEl) return;
    // Sort once, then take the top + bottom slices.
    const byPctDesc = perfRows.slice().sort((a, b) => b.pct - a.pct);
    const strong = byPctDesc.slice(0, RADAR_FOCUS_TOP_N);
    const weak   = byPctDesc.slice().reverse().slice(0, RADAR_FOCUS_TOP_N);

    // Reconcile the DOM in place — keep the existing <li> chips and
    // only update the text inside them. The boxes themselves never
    // re-render, so their background / border / padding stay rock
    // steady; only the name + percentage characters crossfade.
    const reconcile = (listEl, items) => {
      const existing = Array.from(listEl.querySelectorAll('.stl-radar__focus-item'));
      // Add missing chips
      while (existing.length < items.length) {
        const li = document.createElement('li');
        li.className = 'stl-radar__focus-item';
        const nameSpan = document.createElement('span');
        nameSpan.className = 'stl-radar__focus-name';
        const pctSpan = document.createElement('span');
        pctSpan.className = 'stl-radar__focus-pct';
        li.appendChild(nameSpan);
        li.appendChild(pctSpan);
        listEl.appendChild(li);
        existing.push(li);
      }
      // Drop extras
      while (existing.length > items.length) {
        const li = existing.pop();
        if (li && li.parentElement) li.parentElement.removeChild(li);
      }
      // Update each chip's text content
      items.forEach((r, i) => {
        const li = existing[i];
        const nameEl = li.querySelector('.stl-radar__focus-name');
        const pctEl  = li.querySelector('.stl-radar__focus-pct');
        if (nameEl) crossfadeText(nameEl, niceTopicLabel(r.topic));
        if (pctEl)  crossfadeText(pctEl, r.pct + '%');
      });
    };

    reconcile(strengthsEl,  strong);
    reconcile(weaknessesEl, weak);
  };
  // (Note: the radar + S/W focus block used to live on the History
  // page; it moved to the new Analysis page when we split Test
  // Overview in two. History is now list-only.)

  // Aggregate across all stored attempts (matching the current selected
  // test, or all tests when no test filter is active).
  //
  // Attempt schema (per buildAttemptFromState): `questions` is an array
  // of `{ qid, snap }` where `snap` carries the saved question metadata
  // including `topic`. Earlier draft of this function looked for a
  // top-level `snaps` array — that field doesn't exist, which left the
  // radar with zero rows and hidden on the History page. Reading
  // questions[].snap.topic matches the actual stored shape.
  const computeAllTimeTopicPerformance = (attempts, testFilter) => {
    if (!Array.isArray(attempts) || attempts.length === 0) return [];
    const buckets = new Map();
    for (const att of attempts) {
      if (testFilter && (att.testType || 'SAT') !== testFilter) continue;
      const questions = att.questions || [];
      const answers   = att.answers   || [];
      // Each answer carries qid; questions carry the snap with topic.
      const topicByQid = new Map();
      for (const q of questions) {
        if (!q || !q.qid) continue;
        const topic = (q.snap && q.snap.topic) || q.topic || null;
        if (topic) topicByQid.set(q.qid, topic);
      }
      for (const a of answers) {
        const topic = topicByQid.get(a.qid);
        if (!topic) continue;
        if (!buckets.has(topic)) buckets.set(topic, { topic, correct: 0, total: 0 });
        const b = buckets.get(topic);
        b.total++;
        if (a.correct) b.correct++;
      }
    }
    return [...buckets.values()]
      .map((b) => ({ ...b, pct: b.total > 0 ? Math.round(100 * b.correct / b.total) : 0 }))
      .sort((a, b) => b.total - a.total);
  };

  // ----- radar chart -------------------------------------------------------
  // Tracks the active Chart.js instance per canvas so we can dispose it
  // on re-render (mirrors figureChartRegistry pattern from question figures).
  // We also stash the rows alongside the chart so tooltip callbacks (which
  // close over the rows at build time) can read the LATEST rows after an
  // in-place update — without this, a tooltip would show stale labels.
  const radarChartRegistry = new WeakMap();
  // Per-canvas expansion state. `true` means "show every topic, no cap".
  // Used by the History radar's Show-all toggle. Default: collapsed.
  const radarExpandedRegistry = new WeakMap();

  // Decide how many axes to render. `expanded` lifts the default cap.
  const RADAR_DEFAULT_CAP = 8;

  // Build the dataset arrays (labels + data + rows) for a given perfRows
  // input. Returns { labels, data, rows } where rows is the post-bucketing
  // row list, used by tooltip callbacks to render "65% (13/20)".
  const buildRadarDataset = (perfRows, expanded) => {
    let rows = perfRows.slice();
    if (!expanded && rows.length > RADAR_DEFAULT_CAP) {
      const visible = rows.slice(0, RADAR_DEFAULT_CAP - 1);
      const tail    = rows.slice(RADAR_DEFAULT_CAP - 1);
      const totals  = tail.reduce((acc, r) => {
        acc.correct += r.correct; acc.total += r.total;
        return acc;
      }, { correct: 0, total: 0 });
      visible.push({
        topic: 'other',
        correct: totals.correct,
        total: totals.total,
        pct: totals.total > 0 ? Math.round(100 * totals.correct / totals.total) : 0,
        otherCount: tail.length,
      });
      rows = visible;
    }
    const labels = rows.map((r) => r.topic === 'other'
      ? 'Other (' + (r.otherCount || 0) + ')'
      : niceTopicLabel(r.topic));
    const data = rows.map((r) => r.pct);
    return { labels, data, rows };
  };

  // Chart.js plugin: lock the radar's center + drawing radius after
  // every layout pass, AND draw the perimeter point-labels ourselves
  // at fixed angular anchors. Chart.js's built-in pointLabel renderer
  // measures each label's text width and shifts its position based on
  // quadrant alignment — so "Functions" and "Word Problems" at the
  // same angle land at different pixel offsets, which reads as the
  // labels "moving around" between filter swaps. Drawing them
  // ourselves with textAlign='center', textBaseline='middle' anchors
  // each label to a single fixed point per axis.
  const RADAR_LABEL_RESERVE = 44;
  const stabilizeRadarCenter = {
    id: 'stabilizeRadarCenter',
    afterLayout(chart) {
      const r = chart.scales && chart.scales.r;
      const area = chart.chartArea;
      if (!r || !area || area.width <= 0 || area.height <= 0) return;
      const cx = (area.left + area.right) / 2;
      const cy = (area.top + area.bottom) / 2;
      // Compact charts (data-compact="true") don't draw axis labels,
      // so they don't need RADAR_LABEL_RESERVE shaved off the radius
      // — that's the whole reason the polygon was rendering small
      // inside a much larger canvas. Use 0 reserve (with a hair of
      // breathing room so the antialiased stroke doesn't clip at
      // the canvas edge).
      const compact = chart.canvas && chart.canvas.dataset && chart.canvas.dataset.compact === 'true';
      const reserve = compact ? 2 : RADAR_LABEL_RESERVE;
      const radius = Math.min(area.width, area.height) / 2 - reserve;
      r.xCenter = cx;
      r.yCenter = cy;
      r.drawingArea = radius;
      // Rainbow polygon — rebuild the canvas gradient with the freshly-
      // computed chartArea so the stroke + fill sweep across the actual
      // bounds. Without this, the gradient created during the initial
      // updateRadar() (before chartArea was populated) falls back to a
      // single indigo color, which is why the live polygon was reading
      // flat while the preview SVG showed a true sweep.
      if (chart.$useRainbow) {
        const ds = chart.data.datasets && chart.data.datasets[0];
        if (ds) {
          ds.backgroundColor = buildRainbowCanvasGradient(chart, 0.18);
          ds.borderColor     = buildRainbowCanvasGradient(chart, 0.95);
        }
      }
    },
    // Runs after the dataset polygon + axis lines are painted. Draws
    // BOTH label sets during a fade so the old and new labels truly
    // crossfade — old at alpha (1-t), new at alpha t. There's never
    // a moment where both are invisible; their combined alpha stays
    // ≥ 1 throughout. When no fade is in progress, $outgoingLabels
    // is null and we just draw the current labels at full alpha.
    //
    // Side-effect: stores each label's measured bounding box (in
    // CSS pixels relative to the canvas) on chart.$labelHitBoxes for
    // the hover tooltip to use. The mousemove handler walks that
    // list to decide which (if any) label the user is over.
    afterDatasetsDraw(chart) {
      const r = chart.scales && chart.scales.r;
      const area = chart.chartArea;
      if (!r || !area || area.width <= 0 || area.height <= 0) return;
      const labels = chart.data.labels || [];
      if (labels.length === 0 && !chart.$outgoingLabels) return;
      const ctx = chart.ctx;
      const cx = r.xCenter;
      const cy = r.yCenter;
      // Compact mode (canvas has data-compact="true") — the chart is
      // running in a constrained side-by-side layout where labels eat
      // most of the canvas. In that case skip label drawing entirely
      // so the polygon fills the canvas; the surrounding UI (e.g. the
      // "Focus next" pills) provides the legend instead.
      const compact = chart.canvas && chart.canvas.dataset && chart.canvas.dataset.compact === 'true';
      if (compact) {
        chart.$labelHitBoxes = [];
        return;
      }
      const labelRadius = r.drawingArea + 16;        // sits in the reserved band
      const fontSize = 11;
      const trunc = (s) => {
        const str = String(s);
        return str.length > 14 ? str.slice(0, 13) + '…' : str;
      };
      const drawSet = (labelSet, alpha, recordHits) => {
        if (!labelSet || labelSet.length === 0) {
          if (recordHits) chart.$labelHitBoxes = [];
          return;
        }
        if (alpha <= 0 && !recordHits) return;
        const n = labelSet.length;
        const hits = recordHits ? new Array(n) : null;
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.78 * alpha) + ')';
        for (let i = 0; i < n; i++) {
          // Same angle distribution Chart.js uses internally — 0 at
          // top, proceeding clockwise. Each label is anchored to a
          // single fixed (x, y) point per axis, centered on it
          // regardless of glyph width.
          const angle = -Math.PI / 2 + (2 * Math.PI * i / n);
          const x = cx + Math.cos(angle) * labelRadius;
          const y = cy + Math.sin(angle) * labelRadius;
          const truncated = trunc(labelSet[i]);
          if (alpha > 0) ctx.fillText(truncated, x, y);
          if (hits) {
            // Measure the rendered text width to build a per-label hit
            // box. ctx.measureText returns canvas-pixel widths; we
            // convert to CSS pixels in the mousemove handler.
            const m = ctx.measureText(truncated);
            const w = m.width;
            const h = fontSize * 1.4;            // approximate ascent+descent
            // Pad a touch on each side so the cursor catches the box
            // before it actually crosses the letters.
            const padX = 8;
            const padY = 4;
            hits[i] = {
              x: x - w / 2 - padX,
              y: y - h / 2 - padY,
              w: w + padX * 2,
              h: h + padY * 2,
              anchorX: x,
              anchorY: y,
            };
          }
        }
        if (hits) chart.$labelHitBoxes = hits;
      };
      ctx.save();
      ctx.font = '500 ' + fontSize + 'px "Geist", -apple-system, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Outgoing first (fading out) then incoming (fading in). Record
      // hit boxes against the LIVE label set (the one that'll be
      // there once the fade completes) so the user can hover the
      // text they're seeing arrive.
      const outAlpha = (typeof chart.$labelOldAlpha === 'number') ? chart.$labelOldAlpha : 0;
      const inAlpha  = (typeof chart.$labelNewAlpha === 'number') ? chart.$labelNewAlpha : 1;
      drawSet(chart.$outgoingLabels, outAlpha, false);
      drawSet(labels, inAlpha, true);
      ctx.restore();
    },
  };

  // Build the Chart.js config for an initial render (when no instance
  // exists yet). Subsequent updates use updateRadar() instead, which
  // mutates the existing instance for smooth tweening.
  // canvasEl is read for `data-compact="true"` — compact charts use
  // minimal inner padding (no labels are drawn, so we don't reserve
  // space for them) and the polygon fills the canvas.
  const buildRadarConfig = (perfRows, accentRgb = '139, 134, 255', label = 'Mastery', expanded = false, canvasEl = null) => {
    const compact = !!(canvasEl && canvasEl.dataset && canvasEl.dataset.compact === 'true');
    const { labels, data, rows } = buildRadarDataset(perfRows, expanded);
    // 'rainbow' is a sentinel handled by updateRadar via canvas
    // gradients. For the initial dataset (before the first update +
    // layout pass), use the indigo midpoint so the first paint is
    // valid CSS — the real gradient is applied in afterLayout.
    const safeAccent = (accentRgb === 'rainbow') ? '167, 139, 250' : accentRgb;
    return {
      type: 'radar',
      // Instance-scoped plugin — only the radar uses this, no need to
      // register globally.
      plugins: [stabilizeRadarCenter],
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: 'rgba(' + safeAccent + ', 0.18)',
          borderColor: 'rgba(' + safeAccent + ', 0.95)',
          borderWidth: 1.5,
          pointBackgroundColor: 'rgba(' + safeAccent + ', 1)',
          pointBorderColor: 'rgba(' + safeAccent + ', 1)',
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.15,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // Lock the chart's drawing area with generous fixed padding on
        // all sides. Combined with the pointLabel truncation + center-
        // radius plugin below, this keeps the spider's center pinned
        // when switching between test types whose topic names have
        // different widths (the longest label otherwise drives the
        // inner radius, which would shift the center).
        layout: {
          /* Compact charts skip custom-drawn labels entirely, so the
           * polygon sits flush with the canvas edge. Normal mode
           * reserves the usual outer band for label text. */
          padding: compact
            ? { top: 0, right: 0, bottom: 0, left: 0 }
            : { top: 24, right: 36, bottom: 24, left: 36 },
        },
        // Smooth tween for data + color changes when we re-update the
        // chart on filter switch (All/SAT/ISEE etc.). Default Chart.js
        // animations are numeric only; the explicit `colors` and
        // `numbers` entries make sure both interpolate.
        animation: {
          duration: 600,
          easing: 'easeOutCubic',
        },
        animations: {
          colors:  { type: 'color',  duration: 600, easing: 'easeOutCubic' },
          numbers: { type: 'number', duration: 600, easing: 'easeOutCubic' },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 25,
              backdropColor: 'transparent',
              color: 'rgba(255, 255, 255, 0.35)',
              font: { size: 9 },
              callback: (v) => v + '%',
            },
            angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
            grid:       { color: 'rgba(255, 255, 255, 0.08)' },
            // Built-in pointLabels are DISABLED — the stabilizeRadarCenter
            // plugin draws labels in afterDatasetsDraw at fixed angular
            // anchors. Chart.js's renderer measures text width and
            // shifts the position based on quadrant alignment, which
            // makes labels appear to "move" between different topic
            // sets. Our custom renderer uses textAlign='center' so
            // every label is anchored to a single fixed point per axis.
            pointLabels: {
              display: false,
              font: { size: 11, weight: '500' },
              // Truncated text only used by our custom renderer via
              // chart.data.labels; the truncation already happens in
              // buildRadarDataset (Other (N) labels too), so no
              // callback needed here.
            },
          },
        },
        plugins: {
          legend: { display: false },
          // Built-in Chart.js tooltip is disabled — the custom
          // hover tooltip (initRadarLabelTooltips) handles both
          // label-text hover AND polygon-node hover with one
          // consistent pill, so stacking the native one on top
          // would just duplicate info.
          tooltip: { enabled: false },
        },
      },
    };
  };

  // Drive a true crossfade between two label sets on the radar.
  // Sets $outgoingLabels + animates $labelOldAlpha (1 → 0) AND
  // $labelNewAlpha (0 → 1) on every frame so the old and new label
  // strings are BOTH on the canvas during the transition, never
  // both invisible. $labelFadeId tokens out any prior in-flight
  // crossfade so rapid tab switches don't fight each other.
  const crossfadeRadarLabels = (chart, dur) => {
    if (!chart) return;
    const id = (chart.$labelFadeId || 0) + 1;
    chart.$labelFadeId = id;
    const start = performance.now();
    const step = (now) => {
      if (chart.$labelFadeId !== id) return;     // newer fade took over
      const t = Math.min(1, (now - start) / dur);
      // Sinusoidal easing keeps the two alphas summing close to 1 —
      // sin(πt/2) + cos(πt/2) ≥ 1 across the whole interval, so the
      // combined visible alpha never dips below ~1.0. Linear (1-t)+t
      // would dip to ~0.71 around t=0.5 because alpha doesn't add
      // linearly to perceived brightness.
      chart.$labelOldAlpha = Math.cos((t * Math.PI) / 2);
      chart.$labelNewAlpha = Math.sin((t * Math.PI) / 2);
      try { chart.draw(); } catch (_) { /* canvas detaching */ }
      if (t < 1) requestAnimationFrame(step);
      else {
        chart.$outgoingLabels = null;
        chart.$labelOldAlpha = 0;
        chart.$labelNewAlpha = 1;
      }
    };
    requestAnimationFrame(step);
  };

  // Compare two arrays element-wise. Used to decide whether to run the
  // label crossfade or just swap data in place.
  const arraysEqual = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  };

  // Update an existing radar in place — data + dataset color +
  // labels. Chart.js animates the numeric data points smoothly. When
  // labels change (test-type filter swap), we true-crossfade the text
  // around the spider: snapshot the old label set, immediately swap
  // in the new one, then animate both alphas simultaneously so the
  // old fades out while the new fades in over the same window. The
  // polygon's 600ms morph runs underneath the whole sequence.
  // Build a horizontal G5+teal canvas gradient for the radar's
  // polygon stroke + fill: teal → sky → violet → pink. Used when
  // the filter is "All" (no single test selected) to mirror the
  // rainbow accent the rest of the UI uses for generic context.
  // `alpha` controls the fill opacity; passing 1 returns a stroke-
  // strength gradient. Falls back to a single rgba (violet near-
  // midpoint) if chartArea isn't ready.
  //
  // Stops must match the --stl-rainbow CSS variable in app.css.
  // Older alternatives (G5 without green, G2 cool spectrum) are kept
  // in reference_studysignal_rainbow_gradients memory.
  const buildRainbowCanvasGradient = (chart, alpha) => {
    const ctx2d = chart && chart.ctx;
    const area  = chart && chart.chartArea;
    if (!ctx2d || !area || area.right <= area.left) {
      return 'rgba(167, 139, 250, ' + alpha + ')';
    }
    const g = ctx2d.createLinearGradient(area.left, 0, area.right, 0);
    g.addColorStop(0,    'rgba( 94, 234, 212, ' + alpha + ')');
    g.addColorStop(0.33, 'rgba( 96, 165, 250, ' + alpha + ')');
    g.addColorStop(0.66, 'rgba(167, 139, 250, ' + alpha + ')');
    g.addColorStop(1,    'rgba(240, 171, 252, ' + alpha + ')');
    return g;
  };

  const updateRadar = (entry, perfRows, accentRgb) => {
    const { chart } = entry;
    const expanded = !!radarExpandedRegistry.get(chart.canvas);
    const { labels, data, rows } = buildRadarDataset(perfRows, expanded);
    const prevLabels = (chart.data.labels || []).slice();
    const labelsChanged = !arraysEqual(prevLabels, labels);

    const applyData = () => {
      chart.data.labels = labels;
      const ds = chart.data.datasets[0];
      ds.data = data;
      if (accentRgb === 'rainbow') {
        // No specific test selected → polygon uses the G2 rainbow
        // gradient stroke. Flag the chart so stabilizeRadarCenter's
        // afterLayout hook can rebuild the canvas gradient against
        // the freshly-computed chartArea, then SKIP the color
        // animation via update('none').
        //
        // Why skip: Chart.js's color animator interpolates between
        // the dataset's previous solid-color string and its next
        // value. When the next value is a CanvasGradient (not a
        // CSS-color string), the interpolator can't compute the
        // in-between frames, so it falls back to the start color
        // and the final solid color (the indigo fallback we set
        // before the gradient was ready) sticks. update('none')
        // bypasses that animation entirely — the gradient applies
        // immediately on the next draw.
        chart.$useRainbow = true;
        ds.backgroundColor      = buildRainbowCanvasGradient(chart, 0.18);
        ds.borderColor          = buildRainbowCanvasGradient(chart, 0.95);
        ds.pointBackgroundColor = '#a78bfa';
        ds.pointBorderColor     = '#a78bfa';
        entry.rows = rows;
        chart.update('none');
        // Layout has now run → chartArea is populated. Rebuild the
        // gradient against the real bounds and draw once more so the
        // sweep covers the actual polygon width.
        if (chart.chartArea && chart.chartArea.right > chart.chartArea.left) {
          ds.backgroundColor = buildRainbowCanvasGradient(chart, 0.18);
          ds.borderColor     = buildRainbowCanvasGradient(chart, 0.95);
          if (typeof chart.draw === 'function') {
            try { chart.draw(); } catch (_) {}
          }
        }
        return;
      }
      chart.$useRainbow = false;
      ds.backgroundColor      = 'rgba(' + accentRgb + ', 0.18)';
      ds.borderColor          = 'rgba(' + accentRgb + ', 0.95)';
      ds.pointBackgroundColor = 'rgba(' + accentRgb + ', 1)';
      ds.pointBorderColor     = 'rgba(' + accentRgb + ', 1)';
      entry.rows = rows;
      chart.update();
    };

    if (!labelsChanged) {
      applyData();
      return;
    }

    // Stash the outgoing labels, swap to the new ones, and let the
    // custom drawer paint both during the crossfade window.
    chart.$outgoingLabels = prevLabels;
    chart.$labelOldAlpha = 1;
    chart.$labelNewAlpha = 0;
    applyData();
    crossfadeRadarLabels(chart, 320);
  };

  // Hover tooltip for the per-axis labels. The on-canvas labels are
  // truncated to 14 chars (and frequently overlap when topic counts
  // crowd a single quadrant), so this surfaces the full untruncated
  // name + percentage in a lifted pill the user can read clearly.
  // Lazy — created once per canvas, then mousemove/leave do the
  // hit-testing against each label's fixed anchor point.
  const initRadarLabelTooltips = (canvasEl) => {
    if (!canvasEl || canvasEl.$labelTooltipsInited) return;
    canvasEl.$labelTooltipsInited = true;
    // Append the tooltip to <body> with position: fixed so it
    // escapes any ancestor with overflow: hidden / clip — notably
    // .stl-radar-section__joined, which clips overflow to keep its
    // border-radius corners clean. Without this, the tooltip got
    // cut off whenever a label sat near the chart's right/bottom
    // edge.
    const tooltip = document.createElement('div');
    tooltip.className = 'stl-radar-label-tip';
    tooltip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tooltip);

    // Hit radius around each polygon vertex (in CSS pixels). Used for
    // node-hover detection in addition to label-bounding-box hits.
    const NODE_HIT_RADIUS = 14;

    const hide = () => { tooltip.classList.remove('is-visible'); };

    const onMove = (e) => {
      const entry = radarChartRegistry.get(canvasEl);
      if (!entry || !entry.chart) { hide(); return; }
      const chart = entry.chart;
      const r = chart.scales && chart.scales.r;
      const labels = (chart.data && chart.data.labels) || [];
      if (!r || labels.length === 0) { hide(); return; }
      // Mouse coords relative to the canvas, in CSS pixels.
      // Chart.js applies its own dpr scale to the 2D context, so
      // every chart coordinate (xCenter, drawingArea, the values
      // returned by getPointPositionForValue, and ctx.measureText
      // widths the drawer records) is ALREADY in CSS pixels. No
      // additional canvas-pixel ↔ CSS-pixel ratio conversion needed
      // — a previous version of this handler tried to apply one and
      // wound up dividing the hit positions by ~2 on retina screens,
      // which caused the tooltip to never trigger.
      const rect = canvasEl.getBoundingClientRect();
      if (!rect.width || !rect.height) { hide(); return; }
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let bestIdx = -1;

      // 1) LABEL hits — per-label bounding boxes are populated by
      //    the custom drawer (chart.$labelHitBoxes), already in
      //    CSS pixels.
      const boxes = chart.$labelHitBoxes || [];
      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
          bestIdx = i;
          break;
        }
      }

      // 2) NODE hits — distance to each polygon vertex. Only check
      //    if no label hit was found, since the label hit is more
      //    specific (exact bounding box).
      if (bestIdx === -1 && typeof r.getPointPositionForValue === 'function') {
        const ds = chart.data.datasets && chart.data.datasets[0];
        const data = (ds && ds.data) || [];
        const hitSq = NODE_HIT_RADIUS * NODE_HIT_RADIUS;
        let bestDistSq = Infinity;
        for (let i = 0; i < data.length; i++) {
          const pt = r.getPointPositionForValue(i, data[i]);
          if (!pt) continue;
          const dx = mx - pt.x;
          const dy = my - pt.y;
          const dsq = dx * dx + dy * dy;
          if (dsq < bestDistSq && dsq <= hitSq) {
            bestDistSq = dsq;
            bestIdx = i;
          }
        }
      }

      if (bestIdx === -1) { hide(); return; }

      // Compose the tooltip body — full untruncated label + pct,
      // plus the correct/total ratio when the row data carries it.
      const fullText = String(labels[bestIdx]);
      const row = entry.rows ? entry.rows[bestIdx] : null;
      let html = '<span class="stl-radar-label-tip__name">' +
                 escapeHtml(fullText) + '</span>';
      if (row && typeof row.pct === 'number') {
        let pctText = row.pct + '%';
        if (typeof row.correct === 'number' && typeof row.total === 'number' && row.total > 0) {
          pctText += ' (' + row.correct + '/' + row.total + ')';
        }
        html += '<span class="stl-radar-label-tip__pct">' + pctText + '</span>';
      }
      tooltip.innerHTML = html;
      // Anchor the tooltip ABOVE the label's position. Tooltip is
      // position: fixed on <body>, so coords are VIEWPORT pixels:
      // canvas rect's top-left + the chart's internal coord for
      // the label anchor. translate(-50%, -100%) in CSS centers it
      // horizontally above the anchor.
      const n = labels.length;
      const angle = -Math.PI / 2 + (2 * Math.PI * bestIdx / n);
      const labelRadius = r.drawingArea + 16;
      const ax = rect.left + r.xCenter + Math.cos(angle) * labelRadius;
      const ay = rect.top  + r.yCenter + Math.sin(angle) * labelRadius;
      tooltip.style.left = ax + 'px';
      tooltip.style.top  = (ay - 4) + 'px';
      tooltip.classList.add('is-visible');
    };
    canvasEl.addEventListener('mousemove', onMove);
    canvasEl.addEventListener('mouseleave', hide);
    // Hide whenever the chart re-renders (radar update) — the data
    // could have shifted under the cursor.
    canvasEl.addEventListener('pointerdown', hide);
  };

  const renderRadarInto = (canvasEl, perfRows, accentRgb, label) => {
    if (!canvasEl || !window.Chart) return;
    const existing = radarChartRegistry.get(canvasEl);
    if (!perfRows || perfRows.length === 0) {
      // Empty state — dispose any prior chart so the canvas clears.
      if (existing) { try { existing.chart.destroy(); } catch (_) {} radarChartRegistry.delete(canvasEl); }
      const ctx = canvasEl.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      return;
    }
    if (existing && existing.chart) {
      // Smooth in-place update — Chart.js handles the tween.
      updateRadar(existing, perfRows, accentRgb || '139, 134, 255');
      return;
    }
    // First-time render for this canvas.
    const expanded = !!radarExpandedRegistry.get(canvasEl);
    const cfg = buildRadarConfig(perfRows, accentRgb, label, expanded, canvasEl);
    const chart = new window.Chart(canvasEl.getContext('2d'), cfg);
    radarChartRegistry.set(canvasEl, { chart, rows: cfg.data.datasets[0].data.map((_, i) => ({
      // Synthesize rows for the tooltip callback's first render — the
      // updateRadar path replaces these with real rows on the next call.
      pct: cfg.data.datasets[0].data[i], correct: 0, total: 0,
    })) });
    initRadarLabelTooltips(canvasEl);
    // Replace with the proper rows now that the registry entry exists.
    updateRadar(radarChartRegistry.get(canvasEl), perfRows, accentRgb || '139, 134, 255');
  };

  // Public toggle for the per-canvas expansion state. Re-renders any
  // current chart so the new cap takes effect immediately.
  const toggleRadarExpansion = (canvasEl, perfRows, accentRgb) => {
    if (!canvasEl) return;
    const next = !radarExpandedRegistry.get(canvasEl);
    radarExpandedRegistry.set(canvasEl, next);
    const entry = radarChartRegistry.get(canvasEl);
    if (entry) updateRadar(entry, perfRows, accentRgb);
    return next;
  };

  // ----- AI-tailored test generator (weakness-weighted) ----------------
  // Builds a test where question selection is inverse-weighted by topic
  // mastery — if you're 90% in algebra and 10% in geometry, geometry
  // dominates. Falls back to launchTailored's existing topic-restrict
  // path when we don't have enough signal yet (e.g., first attempt).
  const launchWeightedTailored = (perfRows) => {
    if (!Array.isArray(perfRows) || perfRows.length === 0) {
      // No history → just a fresh test at the user's current target.
      startTest(state.score || (TEST_TYPES[loadSelectedTest()] || TEST_TYPES.SAT).scoreDefault);
      return;
    }
    // Restrict to topics where the user has shown weakness (pct < 80).
    // If everything's > 80%, fall back to topics with any errors at all.
    let weak = perfRows.filter((r) => r.pct < 80);
    if (weak.length === 0) weak = perfRows.filter((r) => r.pct < 100);
    if (weak.length === 0) {
      // Solid across the board → fresh randomized test.
      startTest(state.score || (TEST_TYPES[loadSelectedTest()] || TEST_TYPES.SAT).scoreDefault);
      return;
    }
    const topics = new Set(weak.map((r) => r.topic));
    startTest(state.score || (TEST_TYPES[loadSelectedTest()] || TEST_TYPES.SAT).scoreDefault, topics);
  };

  // Re-order review queue so a given bucket leads. Used by the in-review
  // clickable stat tabs. Preserves stable secondary order
  // (true-mastery → lucky → review).
  const reorderReviewByBucket = (bucketKey) => {
    if (!state.answers || state.answers.length === 0) return;
    const mastery = state.answers.filter((a) => a.correct && a.signal === 'green');
    const lucky   = state.answers.filter((a) => a.correct && a.signal !== 'green');
    const missed  = state.answers.filter((a) => !a.correct);
    const order =
      bucketKey === 'trueMastery' ? [mastery, lucky, missed] :
      bucketKey === 'lucky'       ? [lucky, mastery, missed] :
      bucketKey === 'toReview'    ? [missed, mastery, lucky] :
                                    [mastery, lucky, missed];
    const flat = [].concat(...order);
    state.reviewItems = flat.map((a) => ({
      ...a,
      question: state.test.find((q) => q.id === a.qid),
    }));
    state.reviewCursor = 0;
    // Re-render the current review screen to reflect the new ordering.
    renderReview();
  };

  const showResults = (opts = {}) => {
    // The test has reached completion — any resume payload that was
    // tracking the in-progress quiz/review is no longer relevant.
    // showResults itself will overwrite with a 'results' snapshot once
    // the screen transitions; clearing here first means a refresh
    // during the brief gap doesn't accidentally bounce the user back
    // to mid-quiz state with no answers left to give.
    if (typeof clearResumeState === 'function') clearResumeState();

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
      if (att) {
        saveAttempt(att);
        // Track the just-saved attempt's id so a refresh on this fresh
        // results screen can rehydrate from localStorage on next boot.
        state.currentAttemptId = att.id;
      }
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

      // C3 hero meta — accuracy + inline total time. Same source of
      // truth as the pacing pills above; this is just a second
      // surface inside the hero card so the eye can find it without
      // jumping back up to the header.
      const heroAccuracy = $('#stat-accuracy');
      if (heroAccuracy) heroAccuracy.textContent = `${pct}%`;
      const heroTime = $('#stat-hero-time');
      if (heroTime) heroTime.textContent = formatDuration(totalMs);

      // "Xh ago" pill in the header — for a fresh attempt this reads
      // "Just now" (testEndedAt was set seconds ago); revisiting a
      // past attempt from history will show its real recency.
      const whenEl = $('#stat-when');
      if (whenEl) {
        const ts = state.testEndedAt || Date.now();
        whenEl.textContent = relativeDate(ts);
      }

      // C3 proportional meter — each segment's flex matches its
      // share of total answered questions. flex:0 collapses the
      // segment to zero width (no slim sliver). The render order
      // green → yellow → red matches the ledger row order below.
      const meterMastery = $('#meter-seg-mastery');
      const meterLucky   = $('#meter-seg-lucky');
      const meterReview  = $('#meter-seg-review');
      if (meterMastery) meterMastery.style.flex = String(trueMastery);
      if (meterLucky)   meterLucky.style.flex   = String(lucky);
      if (meterReview)  meterReview.style.flex  = String(toReview);

      // C3 ledger row percentages — each row shows "N · NN%" where
      // the percentage is each bucket's share of total questions.
      // formatRowPct keeps the same rounding rule across all three
      // so they sum to ~100 (rounding can drift by 1pp, that's fine).
      const formatRowPct = (n) => total > 0
        ? `${Math.round((n / total) * 100)}%`
        : '0%';
      const pctMastery = $('#stat-true-mastery-pct');
      const pctLucky   = $('#stat-lucky-pct');
      const pctReview  = $('#stat-review-pct');
      if (pctMastery) pctMastery.textContent = formatRowPct(trueMastery);
      if (pctLucky)   pctLucky.textContent   = formatRowPct(lucky);
      if (pctReview)  pctReview.textContent  = formatRowPct(toReview);

      // Legacy headline/sub elements were removed when the C3 hero
      // started showing the score inline ("N/T correct"). Guard the
      // writes so callers can still re-run writeStats without
      // throwing on the missing nodes.
      const legacyHead = document.getElementById('results-headline');
      if (legacyHead) legacyHead.textContent = headline;
      const legacySub = document.getElementById('results-sub');
      if (legacySub) legacySub.textContent =
        `You answered ${correct} of ${total} correctly. ${trueMastery} were true mastery (green + correct), ` +
        `${lucky} were correct but not confident, and ${toReview} need review.`;

      // Test-type badge in the header row — pulled from the active
      // attempt's testType so revisiting a past attempt or a shared
      // link always reads its source test, not the user's currently-
      // selected test.
      const resultsBadge = $('#results-test-badge');
      if (resultsBadge) {
        const tt = (state.test[0] && state.test[0].testType) ||
                   (typeof loadSelectedTest === 'function' ? loadSelectedTest() : 'SAT');
        resultsBadge.innerHTML = renderTestBadge(tt);
      }

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
      // C3 ledger has 3 rows (mastery/lucky/review) — the standalone
      // "Correct" tile from the old grid is gone; its total now lives
      // in the hero score ("N/T correct"), so no card to enable/disable.
      setBucketEnabled('#stat-card-true-mastery', trueMastery);
      setBucketEnabled('#stat-card-lucky', lucky);
      setBucketEnabled('#stat-card-review', toReview);

      const reviewBtn = $('#btn-start-review');
      const tailoredBtn = $('#btn-results-tailored');
      const troubleBtn = $('#btn-save-trouble');
      reviewBtn.disabled = state.reviewItems.length === 0;
      // The new AI-tailored test pulls weakness from this attempt's
      // per-topic performance. Disabled only on a perfect run, since at
      // that point there's nothing to weight toward.
      if (tailoredBtn) tailoredBtn.disabled = toReview === 0;

      // Render the per-attempt strengths radar — the centerpiece of the
      // redesigned results overview. Reads each answered question's topic
      // and computes % correct, then plots in the user's current test
      // accent color. Empty topic data (legacy attempts without topic
      // tags) → renderRadarInto fails soft to an empty canvas.
      const radarCanvas = $('#results-radar');
      if (radarCanvas) {
        const perfItems = state.answers.map((a) => ({
          answer: a,
          question: state.test.find((q) => q.id === a.qid) || {},
        }));
        const perfRows = computeTopicPerformance(perfItems);
        const tt = (state.test[0] && state.test[0].testType) ||
                   (typeof loadSelectedTest === 'function' ? loadSelectedTest() : 'SAT');
        const accent = (TEST_TYPES[tt] && TEST_TYPES[tt].tint) || '139, 134, 255';
        renderRadarInto(radarCanvas, perfRows, accent, 'Mastery');
        // Update the bullet list under the radar to call out the two
        // weakest topics (the AI-tailored test's targets).
        const focusEl = $('#results-radar-focus');
        if (focusEl) {
          const weak = perfRows.filter((r) => r.pct < 100).slice(0, 2);
          focusEl.innerHTML = weak.length === 0
            ? '<li class="stl-radar__focus-item">Perfect attempt — try a harder tier.</li>'
            : weak.map((r) =>
                '<li class="stl-radar__focus-item">' +
                  '<span class="stl-radar__focus-name">' + escapeHtml(niceTopicLabel(r.topic)) + '</span>' +
                  '<span class="stl-radar__focus-pct">' + r.pct + '%</span>' +
                '</li>'
              ).join('');
        }
      }
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
    // Stat-box click. Re-orders the entire review queue so the chosen
    // bucket leads, then opens the review screen at item 0. The old
    // jump-to-cursor behavior was unintuitive — admins would click
    // "Missed" expecting to see only missed items, but the queue still
    // had every item interleaved past their position. The re-order
    // approach matches the mental model: "show me missed first".
    const reorderAndOpenReview = (bucketKey) => {
      if (!state.answers || state.answers.length === 0) return;
      const counts = state.reviewBucketCounts || {};
      if (!counts[bucketKey]) return;          // empty bucket
      reorderReviewByBucket(bucketKey);
      // Mark which bucket is currently "leading" the queue so the
      // in-review tab strip can render its active state correctly.
      state.activeReviewBucket = bucketKey;
      showScreen('review', renderReview);
    };
    document.querySelectorAll('.stl-stat[data-bucket]').forEach((el) => {
      el.addEventListener('click', () => reorderAndOpenReview(el.dataset.bucket));
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

    // Snapshot cursor + bucket so a refresh resumes mid-review at the
    // current item. Runs on every render (initial + every Next/Prev/
    // bucket-jump) so the persisted payload always matches the view.
    if (typeof saveResumeState === 'function') saveResumeState();

    // ---- Bucket-filter tabs ---------------------------------------
    // Counts come from reviewBucketCounts (set in showResults).
    // Active state mirrors activeReviewBucket, which is set whenever
    // a tab is clicked (see initReview below).
    const counts = state.reviewBucketCounts || { trueMastery: 0, lucky: 0, toReview: 0 };
    const setTab = (selector, bucket, count) => {
      const tab = $('[data-review-bucket="' + bucket + '"]');
      if (!tab) return;
      const countEl = $(selector);
      if (countEl) countEl.textContent = String(count);
      const active = state.activeReviewBucket === bucket;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.disabled = count === 0;
      tab.setAttribute('aria-disabled', count === 0 ? 'true' : 'false');
    };
    setTab('#review-tab-count-mastery', 'trueMastery', counts.trueMastery || 0);
    setTab('#review-tab-count-lucky',   'lucky',       counts.lucky || 0);
    setTab('#review-tab-count-review',  'toReview',    counts.toReview || 0);

    // Test-type badge in the review meta row — color-coded so the
    // user instantly sees which test the question they're reviewing
    // came from. Pulled from the question itself (questions are
    // tagged with testType) with a fallback to the user's currently-
    // selected test if a legacy question is missing the tag.
    const reviewBadge = $('#review-test-badge');
    if (reviewBadge) {
      const tt = q.testType || (state.test[0] && state.test[0].testType) ||
                 (typeof loadSelectedTest === 'function' ? loadSelectedTest() : 'SAT');
      reviewBadge.innerHTML = renderTestBadge(tt);
    }

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
    // Bucket-filter tabs (in-review variant). Clicking re-orders the
    // entire reviewItems queue so the picked bucket leads, then resets
    // cursor to 0 and re-renders. The same handler is also bound to
    // the results-screen stat cards (reorderAndOpenReview in initResults).
    document.querySelectorAll('[data-review-bucket]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const bucket = tab.getAttribute('data-review-bucket');
        const counts = state.reviewBucketCounts || {};
        if (!counts[bucket]) return;  // empty bucket
        state.activeReviewBucket = bucket;
        reorderReviewByBucket(bucket);   // already calls renderReview()
      });
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

  // ----- mobile-only nav (the per-screen "mobile bars" + splash) ------
  // Mobile elements are CSS-hidden on desktop (>640px). Their handlers
  // reuse existing flows so test state stays intact whether you're on
  // desktop or phone.
  const isMobileViewport = () =>
    window.matchMedia && window.matchMedia('(max-width: 640px)').matches;

  const initMobileNav = () => {
    // Quiz close X — same flow as the desktop Restart button.
    const quizClose = $('#btn-quiz-close');
    if (quizClose) {
      quizClose.addEventListener('click', () => {
        if (confirm('End this test? Your progress will be lost.')) {
          state.test = [];
          state.answers = [];
          state.cursor = 0;
          clearTimer();
          // On mobile the home screen is splash; on desktop it's score.
          showScreen(isMobileViewport() ? 'splash' : 'score', null, 'back');
        }
      });
    }

    // Per-screen back arrows on results / review / history / score. Each
    // carries a `data-mobile-back="<screen>"` attribute pointing at the
    // screen we should return to. Always animates as a back transition.
    $$('[data-mobile-back]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.mobileBack || 'score';
        showScreen(target, null, 'back');
      });
    });

    // ----- splash screen wiring -----
    // "Get started" routes to the picker if 2+ tests are Active, or
    // straight to the score-input screen if only one is active.
    const splashStart = $('#btn-splash-start');
    if (splashStart) {
      splashStart.addEventListener('click', () => {
        showScreen(entryScreenName(), null, 'forward');
      });
    }

    // Splash secondary actions delegate to their desktop equivalents.
    // Keeps a single source of truth for auth/history/admin flows.
    const splashActionMap = {
      history:  '#btn-history',
      analysis: '#btn-analysis',
      signin:   '#btn-sign-in',
      signout:  '#btn-sign-out',
      admin:    '#btn-admin-go',
      test:     '#btn-dev-test',
    };
    $$('[data-splash-action]').forEach((btn) => {
      const key = btn.dataset.splashAction;
      const targetSel = splashActionMap[key];
      if (!targetSel) return;
      btn.addEventListener('click', () => {
        const tgt = $(targetSel);
        if (tgt) tgt.click();
      });
      // Mirror the target's [hidden] state — auth/admin flows toggle
      // the desktop buttons, and we want the splash twins to track.
      const tgt = $(targetSel);
      if (tgt) {
        const sync = () => { btn.hidden = tgt.hidden; };
        sync();
        new MutationObserver(sync).observe(tgt, {
          attributes: true,
          attributeFilter: ['hidden'],
        });
      }
    });

    // (initial mobile screen swap runs at the top of the IIFE so paint
    //  happens with splash already showing on phones.)
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

  // ----- bulk seed across every test type --------------------------------
  // Same shape as buildRandomCompletedTest but parameterized by test type
  // and date-offset so we can backdate seeded attempts onto a timeline.
  // Used by seedDevAttempts() to populate History + Analysis with a mix
  // of test types so the per-test chip filter and per-test radar accent
  // have real data to show without grinding through 13 manual attempts.
  const buildSyntheticAttempt = (testType, daysAgo) => {
    const all = window.STL_QUESTIONS_ALL || [];
    // Permissive pool filter — anything not explicitly archived/
    // unpublished. Some test-type bank files don't set `state` on
    // every question, and the strict `=== 'live'` filter would drop
    // them. Anything we'd actually serve in the quiz qualifies as
    // seedable.
    const pool = all.filter((q) => {
      const tt = q.testType || 'SAT';
      if (tt !== testType) return false;
      const s = q.state;
      if (s === 'archived' || s === 'unpublished' || s === 'needs-review') return false;
      return true;
    });
    if (pool.length === 0) {
      console.warn('[stl seed] no questions for', testType,
        '— check STL_QUESTIONS_ALL filter');
      return null;
    }
    const cfg = TEST_TYPES[testType] || TEST_TYPES.SAT;
    // Length: use the test's canonical count, capped at 30 for seeded
    // attempts so we don't blow localStorage quota with 13 × 298-question
    // HSPT snapshots. The real-test counts (98 PSAT / 160 ISEE / 215 ACT
    // / 298 HSPT) only need to survive the radar's per-topic aggregation
    // — 30 questions is plenty to populate topic buckets with signal.
    const len = Math.min(30, pool.length);
    const test = shuffle(pool.slice()).slice(0, len);
    const answers = test.map((q) => {
      if (Math.random() < 0.10) {
        return { qid: q.id, picked: null, signal: 'skip', correct: false, perm: null };
      }
      const sigRoll = Math.random();
      const signal = sigRoll < 0.35 ? 'green' : (sigRoll < 0.75 ? 'yellow' : 'red');
      const willBeCorrect = Math.random() < 0.55;
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
      const picked = willBeCorrect ? String(q.answer) : '__dev_wrong__';
      return { qid: q.id, picked, signal, correct: willBeCorrect, perm: null };
    });
    // Target score — bell-ish around the default for this test type.
    const jitter = Math.floor((Math.random() - 0.5) * 2 * (cfg.scoreStep || 10) * 6);
    const targetScore = Math.max(
      cfg.scoreMin,
      Math.min(cfg.scoreMax, (cfg.scoreDefault || 0) + jitter),
    );
    // Date the attempt back. Same-day attempts use morning/afternoon
    // offsets so multiple attempts on one day don't collide on the dot.
    const completedAt = Date.now()
      - (daysAgo * 24 * 60 * 60 * 1000)
      - Math.floor(Math.random() * 8 * 60 * 60 * 1000);
    const elapsedMs = (12 + Math.random() * 13) * 60 * 1000;
    const me = (window.STL_AUTH && window.STL_AUTH.getCurrentUser && window.STL_AUTH.getCurrentUser()) || null;
    const email   = me ? me.email : null;
    const guestId = email ? null : ensureGuestId();
    return {
      v: STL_SCHEMA_VERSION,
      id: newAttemptId(),
      synthetic: true,
      email,
      guestId,
      startedAt: completedAt - elapsedMs,
      completedAt,
      totalElapsedMs: elapsedMs,
      targetScore,
      tiers: tiersForScore(targetScore, testType),
      restrictTopics: null,
      testType,
      includeLower: true,
      questions: test.map((q) => ({ qid: q.id, snap: questionSnap(q) })),
      answers,
    };
  };

  // Populate the History + Analysis pages with a realistic spread of
  // attempts across every test type so the chip filter, per-test radar
  // accent, and Strengths/Weaknesses lists have material to render. SAT
  // dominates the count because it's the headline test; the rest get
  // 1–3 each. Spread across ~30 days backwards so the relative-date
  // labels ("3 days ago", "last week") read naturally.
  const seedDevAttempts = () => {
    if (!isLocalHost()) {
      console.warn('[stl seed] skipping — not on localhost');
      return;
    }
    const all = window.STL_QUESTIONS_ALL || [];
    if (all.length === 0) {
      console.warn('[stl seed] STL_QUESTIONS_ALL empty — bank not loaded yet?');
      return;
    }
    // Idempotent — wipe any prior synthetic attempts so re-running this
    // function gives a clean spread instead of stacking up duplicates.
    const before = loadAttempts();
    const real = before.filter((a) => !a.synthetic);
    const wiped = before.length - real.length;
    if (wiped > 0) persistAttempts(real);
    // Plan: each entry is [testType, daysAgo]. Order controls timeline
    // ordering — first entry is the oldest. SAT runs through the whole
    // period so it shows growth on the radar over time.
    const plan = [
      ['SAT',  28],
      ['HSPT', 24],
      ['SAT',  22],
      ['ISEE', 19],
      ['PSAT', 17],
      ['SAT',  15],
      ['ACT',  12],
      ['PSAT', 10],
      ['SSAT',  8],
      ['SAT',   6],
      ['ACT',   4],
      ['ISEE',  2],
      ['PSAT',  1],
    ];
    let saved = 0;
    let skipped = 0;
    const skippedTypes = [];
    plan.forEach(([testType, daysAgo]) => {
      const att = buildSyntheticAttempt(testType, daysAgo);
      if (att) { saveAttempt(att); saved++; }
      else     { skipped++; skippedTypes.push(testType); }
    });
    console.log('[stl seed] saved=' + saved, 'wiped=' + wiped,
                'skipped=' + skipped, skippedTypes);
    toast('Seeded ' + saved + ' synthetic attempt' + (saved === 1 ? '' : 's') +
          (skipped ? ' (' + skipped + ' skipped: ' + skippedTypes.join(',') + ')' : ''));
    // If the user is currently looking at History or Analysis, re-render
    // so the new attempts show up immediately.
    const visible = visibleScreenName();
    if (visible === 'history'  && typeof renderHistory  === 'function') renderHistory();
    if (visible === 'analysis' && typeof renderAnalysis === 'function') renderAnalysis();
  };
  // Expose on window so it's callable from the DevTools console too.
  window.STL_DEV = window.STL_DEV || {};
  window.STL_DEV.seedAttempts = seedDevAttempts;

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

  // History test-type filter — 'all' or one of TEST_TYPE_ORDER.
  // Lives in module state (not localStorage) so navigating away and
  // back resets to "all" — the default that's least surprising.
  let historyFilter = 'all';

  // Render the test-type filter chip row above the history list.
  // Render the test-type filter chip strip. Shared by the History and
  // Analysis pages — both surface the same chip group because the
  // `historyFilter` state is shared (toggling on one page scopes the
  // other). Pass either '#history-chips' or '#analysis-chips' selector.
  //
  // Chip set rule: show "All" plus every test type that's EITHER (a)
  // currently active in admin OR (b) has at least one historical
  // attempt. That way the chip row reads as "filters you can use" —
  // the user sees their setup at a glance and can filter to a test
  // with zero attempts (the empty state takes over). A test that's
  // been deactivated stays in the strip while history references it,
  // so old data doesn't get orphaned.
  const renderHistoryChipsInto = (selector, attempts) => {
    const chipsEl = $(selector);
    if (!chipsEl) return;
    // Group attempts by testType. Legacy attempts (pre-testType) get
    // bucketed under SAT for backwards compatibility.
    const counts = {};
    attempts.forEach((a) => {
      const t = a.testType || 'SAT';
      counts[t] = (counts[t] || 0) + 1;
    });
    const active = new Set(loadActiveTests());
    // Union of active + present-in-history. Ordered by TEST_TYPE_ORDER
    // so SAT/PSAT/ACT/etc. always appear in a consistent left-to-right
    // sequence regardless of which group surfaced them.
    const shownTests = TEST_TYPE_ORDER.filter((t) => active.has(t) || counts[t]);
    // No tests configured AND no history → nothing to filter; hide.
    if (shownTests.length === 0) {
      chipsEl.hidden = true;
      historyFilter = 'all';
      return;
    }
    // If the current filter targets a test that's no longer in the
    // shown set, reset to All so the user isn't stuck on a phantom.
    if (historyFilter !== 'all' && !shownTests.includes(historyFilter)) {
      historyFilter = 'all';
    }
    chipsEl.hidden = false;
    const total = attempts.length;
    // Each per-test chip carries an inline --chip-tint var with its
    // test's RGB triplet so the CSS picks up the right color for
    // borders, backgrounds, count-badge, etc. The "All" chip uses a
    // neutral fallback (the global accent) so it doesn't bias toward
    // any one test's color when no filter is set.
    const chip = (id, label, n, active, tintRgb) => {
      const tintAttr = tintRgb
        ? ' style="--chip-tint: ' + tintRgb + ';"'
        : '';
      return '<button type="button" class="stl-history__chip' + (active ? ' is-active' : '') +
        '" data-history-filter="' + escapeHtml(id) + '" aria-pressed="' + (active ? 'true' : 'false') + '"' +
        tintAttr + '>' +
        escapeHtml(label) + '<span class="stl-history__chip-n">' + n + '</span></button>';
    };
    chipsEl.innerHTML = chip('all', 'All', total, historyFilter === 'all', null) +
      shownTests.map((t) => {
        const cfg = TEST_TYPES[t];
        return chip(
          t,
          cfg ? cfg.name : t,
          counts[t] || 0,
          historyFilter === t,
          resolveTint(t) || (cfg ? cfg.tint : null),
        );
      }).join('');
  };
  // Back-compat wrapper used by the History screen.
  const renderHistoryChips = (attempts) => renderHistoryChipsInto('#history-chips', attempts);
  const renderAnalysisChips = (attempts) => renderHistoryChipsInto('#analysis-chips', attempts);

  // Render the History list. Newest first. Each row is a button that
  // opens the attempt; the trailing icon-buttons handle per-row actions.
  const renderHistory = () => {
    const list = $('#history-list');
    const empty = $('#history-empty');
    const sub = $('#history-sub');
    const tailoredCta = $('#btn-history-tailored');
    const tailoredHint = tailoredCta ? tailoredCta.nextElementSibling : null;
    if (!list) return;
    list.innerHTML = '';

    const allAttempts = loadAttempts().slice().sort((a, b) => b.completedAt - a.completedAt);
    renderHistoryChips(allAttempts);
    const attempts = historyFilter === 'all'
      ? allAttempts
      : allAttempts.filter((a) => (a.testType || 'SAT') === historyFilter);

    // Cache the active perfRows for the History page's tailored CTA
    // (Analysis page caches separately under __stlAnalysis*). When the
    // user clicks "Start new AI-tailored test" on History, we want it
    // weighted by whatever they're currently filtered to.
    const testFilter = historyFilter === 'all' ? null : historyFilter;
    window.__stlHistoryPerfRows = computeAllTimeTopicPerformance(attempts, testFilter);

    // Description stays the SAME regardless of data state so the chips
    // row below it doesn't reposition when the user toggles filters.
    // Contextual no-data messaging lives in #history-empty instead.
    sub.textContent = "Review every test you've taken — click any row to revisit the results.";

    if (attempts.length === 0) {
      empty.hidden = false;
      const emptyP = empty.querySelector('p');
      if (emptyP) {
        emptyP.textContent = allAttempts.length === 0
          ? "No saved attempts yet. Take a 30-question test and it'll show up here."
          : "No attempts match this filter — try another test.";
      }
      $('#btn-history-clear').disabled = allAttempts.length === 0;
      $('#btn-history-export').disabled = allAttempts.length === 0;
      // No attempts → hide the AI-tailored CTA + its hint; nothing
      // meaningful to seed the weights from.
      if (tailoredCta) tailoredCta.hidden = allAttempts.length === 0;
      if (tailoredHint) tailoredHint.hidden = allAttempts.length === 0;
      return;
    }
    empty.hidden = true;
    $('#btn-history-clear').disabled = false;
    $('#btn-history-export').disabled = false;
    if (tailoredCta) tailoredCta.hidden = false;
    if (tailoredHint) tailoredHint.hidden = false;

    // Admin-only check — used to gate the JSON download button on
    // each row (debug power-tool, not user-facing). Resolved once
    // before the loop so we don't hit STL_AUTH on every iteration.
    const isAdmin = !!(window.STL_AUTH && window.STL_AUTH.isAdmin && window.STL_AUTH.isAdmin());

    attempts.forEach((att) => {
      const { total, correct, trueMastery, lucky, toReview } = attemptCounts(att);
      const li = document.createElement('li');
      li.className = 'stl-history__row';
      if (att.synthetic) li.classList.add('is-synthetic');
      // Per-row tint — the hover accent bar on the left, and the
      // hover lift glow, both pull from this so each attempt's row
      // takes on its own test's color (SAT lavender, PSAT blue, etc).
      // Set as a CSS variable so the styling stays in CSS while the
      // JS only carries the data.
      const rowTestType = att.testType || 'SAT';
      const rowCfg = TEST_TYPES[rowTestType];
      if (rowCfg && rowCfg.tint) {
        li.style.setProperty('--row-tint', rowCfg.tint);
      }

      // Open is the row body — clickable everywhere except inside the
      // ⋯ menu. Per-row buttons stop propagation so they don't open.
      // Each row leads with a color-coded test badge so the user can
      // skim the list and tell at a glance which attempt was for which
      // test (especially valuable once they've taken multiple tests).
      li.innerHTML =
        '<button type="button" class="stl-history__open" data-id="' + att.id + '">' +
          '<span class="stl-history__test">' + renderTestBadge(att.testType || 'SAT') + '</span>' +
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
          // JSON download is admin-only — the export pathway is a debug
          // tool, not a user-facing affordance. When visible, it sits
          // FIRST so admin power-tools cluster on the left of the
          // action group, leaving the universally-useful Link + Delete
          // controls predictable.
          (isAdmin
            ? '<button type="button" class="stl-history__action" data-action="json" data-id="' + att.id + '" aria-label="Download JSON">JSON</button>'
            : '') +
          // Copy-review link — lucide-style link icon to match the
          // rest of the app's iconography (24x24, currentColor stroke).
          '<button type="button" class="stl-history__action stl-history__action--icon" data-action="copy" data-id="' + att.id + '" aria-label="Copy review link" title="Copy review link">' +
            '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
              '<path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>' +
              '<path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' +
            '</svg>' +
          '</button>' +
          '<button type="button" class="stl-history__action stl-history__action--icon stl-history__action--danger" data-action="delete" data-id="' + att.id + '" aria-label="Delete attempt" title="Delete attempt">×</button>' +
        '</div>';
      list.appendChild(li);
    });
  };

  // ====================================================================
  // AI Analysis screen — radar + Strengths/Weaknesses + AI CTA
  // ====================================================================
  // Sibling of the History screen. Shares the test-type filter chip
  // state (historyFilter) so toggling chips here also scopes the list
  // on the History page. The radar + S/W block is the focus; the AI
  // CTA at the bottom launches a weakness-weighted test.
  const renderAnalysis = () => {
    const sub = $('#analysis-sub');
    const empty = $('#analysis-empty');
    const radarSection = $('#analysis-radar-section');
    const radarCanvas  = $('#analysis-radar');
    const tailoredCta  = $('#btn-analysis-tailored');
    const tailoredHint = tailoredCta ? tailoredCta.nextElementSibling : null;
    if (!radarSection || !radarCanvas) return;

    const allAttempts = loadAttempts().slice().sort((a, b) => b.completedAt - a.completedAt);
    renderAnalysisChips(allAttempts);
    const attempts = historyFilter === 'all'
      ? allAttempts
      : allAttempts.filter((a) => (a.testType || 'SAT') === historyFilter);

    const testFilter = historyFilter === 'all' ? null : historyFilter;
    const perfRows = computeAllTimeTopicPerformance(attempts, testFilter);

    // Description stays the SAME regardless of data state so the chips
    // row below it doesn't reposition when the user toggles filters.
    // The contextual no-data message lives in #analysis-empty instead.
    if (sub) sub.textContent = "See where you're sharpest and where you're shaky — across every test you've taken.";

    if (perfRows.length === 0) {
      // No data — hide the radar + CTA, show the empty-state copy
      // with a contextual message (no attempts at all vs. no matches
      // for the active filter).
      radarSection.hidden = true;
      if (tailoredCta) tailoredCta.hidden = true;
      if (tailoredHint) tailoredHint.hidden = true;
      if (empty) {
        empty.hidden = false;
        const emptyP = empty.querySelector('p');
        if (emptyP) {
          emptyP.textContent = allAttempts.length === 0
            ? "Take a test and your topic mastery will start showing up here."
            : "No attempts match this filter — try another test.";
        }
      }
      return;
    }

    if (empty) empty.hidden = true;

    radarSection.hidden = false;
    if (tailoredCta) tailoredCta.hidden = false;
    if (tailoredHint) tailoredHint.hidden = false;

    // Pick the polygon accent. Filter=one test → that test's tint.
    // Filter=all → the brand rainbow gradient (G2 — violet → indigo
    // → blue → cyan) so the polygon line visually says "across all
    // your tests" instead of biasing toward the most-recent test.
    const accent = testFilter
      ? ((TEST_TYPES[testFilter] && TEST_TYPES[testFilter].tint) || '139, 134, 255')
      : 'rainbow';
    renderRadarInto(radarCanvas, perfRows, accent, 'Mastery');

    // Radar header text + eyebrow dot — tracks the active chip filter.
    // Specific test → "All-time SAT topic mastery" with the test's
    // tint dot. All → "All-time topic mastery" with a rainbow gradient
    // pill (the .--rainbow-dot modifier resizes the round dot into a
    // small pill so the 4-stop gradient actually reads).
    const titleEl = $('#analysis-radar-title');
    if (titleEl) {
      if (testFilter) {
        titleEl.textContent = 'All-time ' + testFilter + ' topic mastery';
        titleEl.classList.remove('stl-eyebrow--rainbow-dot');
        const tint = (TEST_TYPES[testFilter] && TEST_TYPES[testFilter].tint) || '139, 134, 255';
        titleEl.style.setProperty('--eyebrow-dot-bg', 'rgb(' + tint + ')');
        titleEl.style.setProperty('--eyebrow-dot-glow', 'rgba(' + tint + ', 0.55)');
      } else {
        titleEl.textContent = 'All-time topic mastery';
        titleEl.classList.add('stl-eyebrow--rainbow-dot');
        // Resolve the rainbow gradient through getComputedStyle —
        // nested var() inside an inline custom property doesn't
        // always paint the gradient (Chrome treats some chains as
        // <color> not <image>). Reading the computed value gives us
        // the literal linear-gradient(...) string which paints reliably.
        const cs = getComputedStyle(document.documentElement);
        const rainbow = (cs.getPropertyValue('--stl-rainbow') || '').trim()
          || 'linear-gradient(90deg, #5eead4 0%, #60a5fa 33%, #a78bfa 66%, #f0abfc 100%)';
        titleEl.style.setProperty('--eyebrow-dot-bg', rainbow);
        titleEl.style.setProperty('--eyebrow-dot-glow', 'rgba(167, 139, 250, 0.55)');
      }
    }
    // CTA stash — perfRows used by the AI-tailored test button.
    window.__stlAnalysisPerfRows = perfRows;
    window.__stlAnalysisAccent   = accent;
    // Render the Strengths/Weaknesses pair beneath the radar.
    renderHistoryRadarFocusInto({
      strengths: '#analysis-radar-strengths',
      weaknesses: '#analysis-radar-weaknesses',
    }, perfRows);
    // Expand toggle — visible only when there are more topics than the
    // default radar cap.
    const expandWrap = $('#analysis-radar-expand-wrap');
    const expandBtn  = $('#btn-analysis-radar-expand');
    if (expandWrap && expandBtn) {
      const expandable = perfRows.length > RADAR_DEFAULT_CAP;
      expandWrap.hidden = !expandable;
      const isExpanded = !!radarExpandedRegistry.get(radarCanvas);
      expandBtn.setAttribute('aria-pressed', isExpanded ? 'true' : 'false');
      const collapsedLabel = expandBtn.querySelector('[data-when="collapsed"]');
      const expandedLabel  = expandBtn.querySelector('[data-when="expanded"]');
      if (collapsedLabel) {
        collapsedLabel.textContent = 'Show all ' + perfRows.length + ' topics';
        collapsedLabel.hidden = isExpanded;
      }
      if (expandedLabel) expandedLabel.hidden = !isExpanded;
    }
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
    // Stamp the attempt id on state so saveResumeState can persist it
    // (refreshing on a past-attempt results page restores the same
    // attempt via loadAttempts() lookup).
    state.currentAttemptId = att.id || null;
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

    // Test-type filter chip row above the list. Click a chip to scope
    // the history to that test (or "All" to clear). Delegated because
    // chips are rebuilt every renderHistory() call. The same chip
    // state powers the Analysis page, so we re-render that too in
    // case both screens are mounted (sessionStorage-driven refreshes
    // can leave a stale Analysis chip group otherwise).
    const chips = $('#history-chips');
    if (chips) {
      chips.addEventListener('click', (e) => {
        const chip = e.target.closest('[data-history-filter]');
        if (!chip) return;
        historyFilter = chip.getAttribute('data-history-filter');
        renderHistory();
      });
    }

    // History → AI-tailored test button. Reads the perfRows cache that
    // renderHistory stashed on window after computing the all-time
    // aggregate, then launches a test inverse-weighted by mastery.
    const historyTailoredBtn = $('#btn-history-tailored');
    if (historyTailoredBtn) {
      historyTailoredBtn.addEventListener('click', () => {
        // Make sure the test-type filter and selected-test agree before
        // launching, so the question pool buildTest() picks from matches
        // the radar the user is looking at. If the filter is 'all',
        // we leave selected-test alone.
        if (historyFilter !== 'all' && historyFilter !== loadSelectedTest()) {
          saveSelectedTest(historyFilter);
          assembleBank();
        }
        const perfRows = window.__stlHistoryPerfRows || [];
        launchWeightedTailored(perfRows);
      });
    }

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

    // (History "Back to start" footer button removed — page ends on
    //  the AI CTA. Top-of-page nav handles backing out.)
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
  // Analysis screen wiring
  // ====================================================================
  const initAnalysis = () => {
    const radarSection = $('#analysis-radar-section');
    if (!radarSection) return;

    // Shared chip group — toggling on Analysis also scopes History.
    const chips = $('#analysis-chips');
    if (chips) {
      chips.addEventListener('click', (e) => {
        const chip = e.target.closest('[data-history-filter]');
        if (!chip) return;
        historyFilter = chip.getAttribute('data-history-filter');
        renderAnalysis();
      });
    }

    // Analysis → AI-tailored test button. Same launch path as History,
    // sourced from the Analysis-scoped perfRows cache.
    const tailoredBtn = $('#btn-analysis-tailored');
    if (tailoredBtn) {
      tailoredBtn.addEventListener('click', () => {
        if (historyFilter !== 'all' && historyFilter !== loadSelectedTest()) {
          saveSelectedTest(historyFilter);
          assembleBank();
        }
        const perfRows = window.__stlAnalysisPerfRows || [];
        launchWeightedTailored(perfRows);
      });
    }

    // Show-all-topics toggle. Lifts the default radar cap AND grows
    // the section so the larger topic count has room to breathe.
    const radarExpandBtn = $('#btn-analysis-radar-expand');
    if (radarExpandBtn) {
      radarExpandBtn.addEventListener('click', () => {
        const canvas = $('#analysis-radar');
        const perfRows = window.__stlAnalysisPerfRows || [];
        const accent   = window.__stlAnalysisAccent || 'rainbow';
        const nowExpanded = toggleRadarExpansion(canvas, perfRows, accent);
        radarExpandBtn.setAttribute('aria-pressed', nowExpanded ? 'true' : 'false');
        const collapsed = radarExpandBtn.querySelector('[data-when="collapsed"]');
        const expanded  = radarExpandBtn.querySelector('[data-when="expanded"]');
        if (collapsed) collapsed.hidden = nowExpanded;
        if (expanded)  expanded.hidden  = !nowExpanded;
        const section = $('#analysis-radar-section');
        if (section) section.classList.toggle('is-expanded', nowExpanded);
        const entry = radarChartRegistry.get(canvas);
        if (entry && entry.chart) {
          setTimeout(() => entry.chart.resize(), 60);
          setTimeout(() => entry.chart.resize(), 200);
          setTimeout(() => entry.chart.resize(), 400);
        }
      });
    }

    // (Analysis footer with "Back to start" was removed — top-of-page
    //  nav handles backing out.)
  };

  // ====================================================================
  // Admin tool — questions database
  // ====================================================================
  // Reads from window.STL_QUESTIONS_ALL (assembled by the loader above),
  // computes per-question signal stats from local attempt history, and
  // wires Publish / Unpublish / Edit actions that persist to
  // localStorage stl_question_overrides.

  // Default filter: 'active' = every state EXCEPT 'archived'. Archive is
  // a soft-delete; archived questions are hidden from the default admin
  // view and never appear in the quiz pool (STL_QUESTIONS filters to
  // state === 'live'). Choose 'archived' from the State dropdown to see
  // them and Unarchive (which restores to 'unpublished').
  const ADMIN_FILTERS_DEFAULT = {
    // `source` stays in the state object (and in filterAdminQuestions)
    // because the AI / Human-curated KPI tile presets still set it.
    // We just removed the standalone Source dropdown from the filter
    // row — the tiles cover the same cut.
    search: '', state: 'active', source: 'all', difficulty: 'all', topic: 'all',
    testType: 'all', subject: 'all', date: 'all', hasNote: false,
  };
  let adminFilters = { ...ADMIN_FILTERS_DEFAULT };

  // The "date" column shows when each question entered the bank.
  // Resolution priority:
  //   1. q.createdAt     — set explicitly on admin-added rows
  //   2. import.generatedAt — for questions that came in via a converter
  //                           import (joined via q.importId → STL_IMPORTS)
  //   3. q.updatedAt     — fallback for rows that have only been edited
  //   4. null            — display as "—"
  // Returned as a JS timestamp (ms) or null so sort comparators can work
  // numerically. Use effectiveDateLabel(q) for the rendered string.
  const _importDateCache = { stamp: 0, map: null };
  const _importDateMap = () => {
    // Cache the import→date lookup until STL_IMPORTS changes; the
    // import list mutates rarely (only when a new import file is
    // loaded), but renderAdminTable runs often, so caching matters.
    const list = window.STL_IMPORTS || [];
    if (_importDateCache.map && _importDateCache.stamp === list.length) {
      return _importDateCache.map;
    }
    const m = {};
    for (const imp of list) {
      if (!imp || !imp.id) continue;
      // generatedAt is a YYYY-MM-DD string from the Python converter.
      // Parse at noon UTC so timezone math doesn't slide the date.
      const t = imp.generatedAt ? Date.parse(imp.generatedAt + 'T12:00:00Z') : NaN;
      m[imp.id] = Number.isFinite(t) ? t : null;
    }
    _importDateCache.map = m;
    _importDateCache.stamp = list.length;
    return m;
  };
  const effectiveDate = (q) => {
    if (!q) return null;
    if (q.createdAt) {
      // createdAt may be ISO ("2026-05-25") or a numeric ms timestamp.
      const t = typeof q.createdAt === 'number' ? q.createdAt : Date.parse(q.createdAt);
      if (Number.isFinite(t)) return t;
    }
    if (q.importId) {
      const t = _importDateMap()[q.importId];
      if (t) return t;
    }
    if (q.updatedAt) {
      const t = typeof q.updatedAt === 'number' ? q.updatedAt : Date.parse(q.updatedAt);
      if (Number.isFinite(t)) return t;
    }
    return null;
  };
  const _MONTH_ABBREV = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const effectiveDateLabel = (q) => {
    const t = effectiveDate(q);
    if (!t) return '—';
    const d = new Date(t);
    return _MONTH_ABBREV[d.getMonth()] + ' ' + d.getDate();
  };

  // Date filter presets — applied in filterAdminQuestions. Each value is
  // a "questions newer than (now - N days)" window. "All" is the no-op
  // default; "no-date" matches rows where effectiveDate is null so the
  // operator can audit legacy / undated content.
  const DATE_FILTER_WINDOWS_DAYS = {
    'today': 1,
    '7d':    7,
    '30d':   30,
    '90d':   90,
  };
  const passesDateFilter = (q, value) => {
    if (!value || value === 'all') return true;
    const t = effectiveDate(q);
    if (value === 'no-date') return t == null;
    const days = DATE_FILTER_WINDOWS_DAYS[value];
    if (!days || t == null) return false;
    return (Date.now() - t) <= (days * 24 * 60 * 60 * 1000);
  };

  // KPI tile presets — clicking a tile resets every other filter to
  // its default and applies just this slice, so each tile is a clean
  // "view preset" rather than a sticky additional filter. Total resets
  // to defaults (the Active view of all questions). Keys match the
  // `data-kind` attribute on each <button class="stl-admin__kpi">.
  const KPI_PRESETS = {
    'total':         { ...ADMIN_FILTERS_DEFAULT },
    'live':          { ...ADMIN_FILTERS_DEFAULT, state: 'live' },
    'needs-review':  { ...ADMIN_FILTERS_DEFAULT, state: 'needs-review' },
    'unpublished':   { ...ADMIN_FILTERS_DEFAULT, state: 'unpublished' },
    'archived':      { ...ADMIN_FILTERS_DEFAULT, state: 'archived' },
    'ai':            { ...ADMIN_FILTERS_DEFAULT, source: 'ai-generated' },
    'human':         { ...ADMIN_FILTERS_DEFAULT, source: 'human-curated' },
  };

  // Sort state for the admin table. Default: ID ascending. Clicking a
  // header toggles direction; clicking a different header switches the
  // active column and sets direction back to ascending.
  let adminSort = { column: 'id', direction: 'asc' };

  // Sort comparator factory — returns a function suitable for
  // Array#sort given the current adminSort.
  const adminSortComparator = () => {
    const { column, direction } = adminSort;
    const dir = direction === 'desc' ? -1 : 1;
    // Numeric sort for difficulty + computed stats; string sort for
    // everything else. State has a custom rank (live > needs-review >
    // unpublished) so the most-active rows surface first.
    const stateRank = { live: 0, 'needs-review': 1, unpublished: 2, archived: 3 };
    const valueOf = (q) => {
      if (column === 'difficulty') return typeof q.difficulty === 'number' ? q.difficulty : 0;
      if (column === 'state')      return stateRank[q.state] != null ? stateRank[q.state] : 99;
      if (column === 'stats') {
        const s = computeQuestionStats(q.id);
        // Sort by attempt count primarily; tie-break by % correct.
        return s.total * 1000 + (s.total ? Math.round((s.correct / s.total) * 100) : 0);
      }
      if (column === 'date') {
        // Sort numerically by effective timestamp; undated rows sink to
        // the bottom in ascending order, top in descending.
        return effectiveDate(q) || 0;
      }
      return String(q[column] || '').toLowerCase();
    };
    return (a, b) => {
      const va = valueOf(a), vb = valueOf(b);
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      if (va < vb) return -1 * dir;
      if (va > vb) return  1 * dir;
      return 0;
    };
  };

  const setAdminSort = (column) => {
    if (adminSort.column === column) {
      adminSort.direction = adminSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      adminSort = { column, direction: 'asc' };
    }
    renderAdminTable();
  };

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
    'archived': 'Archived',
    'deleted': 'Deleted',
  }[s] || s);

  // Allowed state values — the single source of truth for validators
  // (CSV import, edit modal save, action handlers). 'deleted' is a
  // soft-delete: assembleBank() filters these out of STL_QUESTIONS_ALL
  // entirely so they vanish from the bank and the quiz. The override
  // sits in localStorage so a future "Restore deleted" feature can
  // bring them back if needed; until then they're invisible.
  const QUESTION_STATES = ['live', 'needs-review', 'unpublished', 'archived', 'deleted'];
  if (typeof window !== 'undefined') {
    window.STL_TEST_HOOKS = window.STL_TEST_HOOKS || {};
    window.STL_TEST_HOOKS.QUESTION_STATES = QUESTION_STATES;
  }

  // Truncate a stem to a single-line preview for the table cell.
  const stemPreview = (text, max = 90) => {
    const t = (text || '').replace(/\s+/g, ' ').trim();
    return t.length <= max ? t : t.slice(0, max - 1) + '…';
  };

  // Populate the topic dropdown from the bank. Re-runs whenever the
  // Subject filter changes so the topics list narrows to subjects in
  // the chosen section. When subject = 'all', every topic is shown.
  const populateTopicFilter = () => {
    const sel = $('#admin-filter-topic');
    if (!sel) return;
    const subjFilter = adminFilters.subject || 'all';
    const previous = sel.value;
    const topics = Array.from(new Set(
      (window.STL_QUESTIONS_ALL || [])
        .filter((q) => subjFilter === 'all' || (q.section || 'math') === subjFilter)
        .map((q) => q.topic)
        .filter(Boolean)
    )).sort();
    sel.innerHTML = '<option value="all">All topics</option>' +
      topics.map((t) => '<option value="' + escapeHtml(t) + '">' + escapeHtml(t) + '</option>').join('');
    // Preserve the prior selection if it's still valid; otherwise the
    // topic filter resets to "all" implicitly via its first option.
    if (previous && (previous === 'all' || topics.includes(previous))) {
      sel.value = previous;
      adminFilters.topic = previous;
    } else if (adminFilters.topic !== 'all') {
      adminFilters.topic = 'all';
    }
  };

  // Populate the Subject filter from the union of declared subjects
  // across all tests. Stable, label-keyed list.
  const populateSubjectFilter = () => {
    const sel = $('#admin-filter-subject');
    if (!sel) return;
    const set = new Set();
    TEST_TYPE_ORDER.forEach((tid) => {
      const cfg = TEST_TYPES[tid];
      const subjects = (cfg && cfg.subjects) ? cfg.subjects : ['math'];
      subjects.forEach((s) => set.add(s));
    });
    // Stable order — alphabetize by display name for the dropdown.
    const items = Array.from(set).map((id) => ({ id, name: subjectName(id) }));
    items.sort((a, b) => a.name.localeCompare(b.name));
    sel.innerHTML = '<option value="all">All subjects</option>' +
      items.map((it) => '<option value="' + escapeHtml(it.id) + '">' + escapeHtml(it.name) + '</option>').join('');
  };

  const filterAdminQuestions = () => {
    const all = window.STL_QUESTIONS_ALL || [];
    const f = adminFilters;
    const q = (f.search || '').toLowerCase().trim();
    return all.filter((item) => {
      // 'active' is a meta-filter: everything except archived. Single
      // explicit state values match exactly.
      if (f.state === 'active' && item.state === 'archived')          return false;
      if (f.state !== 'all' && f.state !== 'active' && item.state !== f.state) return false;
      // Test-type filter — legacy questions without a testType are
      // treated as SAT to match the bank-loader's quiz-pool behavior.
      if (f.testType && f.testType !== 'all' && (item.testType || 'SAT') !== f.testType) return false;
      if (f.source !== 'all'     && item.source !== f.source)         return false;
      // Difficulty filter compares the tier label for the row's
      // numeric difficulty (post-migration). Falls back to the raw
      // value if it's somehow still a string.
      if (f.difficulty !== 'all') {
        // Pass the question's own testType so the tier band reflects
        // the test's scale, not the user's selectedTest. An ACT
        // question with difficulty 28 should bucket as 'medium' for
        // ACT (≤28) regardless of what test the admin is on.
        const tier = typeof item.difficulty === 'number'
          ? tierLabelFor(item.difficulty, item.testType)
          : item.difficulty;
        if (tier !== f.difficulty) return false;
      }
      if (f.topic !== 'all'      && item.topic !== f.topic)           return false;
      // Subject filter — section is the major area (math, reading, etc.).
      // Untagged legacy questions default to 'math' to match the bank
      // loader's back-compat path.
      if (f.subject && f.subject !== 'all' && (item.section || 'math') !== f.subject) return false;
      if (q) {
        const haystack = (item.id + ' ' + (item.stem || '') + ' ' + (item.topic || '') + ' ' + (item.section || '')).toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (!passesDateFilter(item, f.date)) return false;
      if (f.hasNote) {
        // The note may live on the override (admin edited it) OR on the
        // base bank row (rare, but possible for hand-curated entries).
        // getQuestionNote() already walks both sources, so route through
        // it rather than re-implementing the precedence here.
        const note = getQuestionNote(item.id);
        if (!note || !note.trim()) return false;
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

  // Shallow equality over the five filter keys. Comparing by JSON
  // would be more concise but allocates per render — this fires on
  // every renderAdminTable() call so we keep it cheap.
  const filtersEqual = (a, b) => (
    a.search === b.search &&
    a.state === b.state &&
    a.source === b.source &&
    a.difficulty === b.difficulty &&
    a.topic === b.topic
  );

  // Toggle aria-pressed on every KPI tile so the active preset reads
  // as "you are here". When nothing matches (manual filter combo)
  // every tile is unpressed — that's intentional, not a bug.
  const syncActiveKpiTile = () => {
    // Scope to the Questions pane only — the Users tab also has a
    // .stl-admin__kpis strip with the same tile class but no
    // filter-shortcut behavior.
    $$('[data-pane="questions"] button.stl-admin__kpi').forEach((tile) => {
      const kind = tile.dataset.kind;
      const preset = KPI_PRESETS[kind];
      const isActive = preset && filtersEqual(adminFilters, preset);
      tile.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  };

  // Push adminFilters into the dropdown DOM so the controls stay in
  // sync after a KPI-tile click (otherwise the State select would
  // still display its previous value while the table reflects the
  // new filter — confusing).
  const syncFilterControls = () => {
    const setVal = (sel, val) => { const el = $(sel); if (el) el.value = val; };
    setVal('#admin-search',            adminFilters.search);
    setVal('#admin-filter-state',      adminFilters.state);
    setVal('#admin-filter-difficulty', adminFilters.difficulty);
    setVal('#admin-filter-subject',    adminFilters.subject || 'all');
    // Subject changed? Repopulate topics first so the new value is
    // selectable. (KPI preset reset always brings subject back to
    // 'all', which means every topic is valid — but be defensive.)
    populateTopicFilter();
    setVal('#admin-filter-topic',      adminFilters.topic);
    setVal('#admin-filter-test',       adminFilters.testType || 'all');
    setVal('#admin-filter-date',       adminFilters.date || 'all');
    // Has-note toggle — sync ARIA + visible label to the boolean state.
    const hasNoteBtn = $('#admin-filter-has-note');
    if (hasNoteBtn) {
      const on = !!adminFilters.hasNote;
      hasNoteBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      hasNoteBtn.setAttribute('aria-checked', on ? 'true' : 'false');
      const txt = hasNoteBtn.querySelector('.stl-admin__pill-toggle__text');
      if (txt) txt.textContent = on ? 'On' : 'Off';
    }
  };

  // Apply a KPI preset by name. Resets every filter to its default
  // first, then layers the preset's specifics on top — so clicking
  // "Live" doesn't carry over a stale Source filter from before.
  const applyKpiPreset = (kind) => {
    const preset = KPI_PRESETS[kind];
    if (!preset) return;
    adminFilters = { ...preset };
    syncFilterControls();
    renderAdminTable();
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
    const archivedCount    = all.filter((q) => q.state === 'archived').length;
    const activeCount      = all.length - archivedCount;
    const aiCount          = all.filter((q) => q.source === 'ai-generated').length;
    const humanCount       = all.filter((q) => q.source === 'human-curated').length;

    // KPI strip
    const setKpi = (sel, n) => { const el = $(sel); if (el) el.textContent = n; };
    setKpi('#kpi-total',       all.length);
    setKpi('#kpi-live',        liveCount);
    setKpi('#kpi-review',      reviewCount);
    setKpi('#kpi-unpublished', unpublishedCount);
    setKpi('#kpi-archived',    archivedCount);
    setKpi('#kpi-ai',          aiCount);
    setKpi('#kpi-human',       humanCount);
    // Tab count badge for the Questions tab — reflect the active
    // (non-archived) total so the chip matches what an admin sees by
    // default. Archived items are still findable via the State filter.
    setKpi('#tab-count-questions', activeCount);
    // Review-queue trigger badge — count and visibility stay in lockstep
    // with the bank's current needs-review tally.
    if (typeof updateReviewTriggerVisibility === 'function') updateReviewTriggerVisibility();

    // Mark the active KPI tile based on the current filters. A tile is
    // "active" when adminFilters matches its preset exactly. If no
    // preset matches (e.g., user combined State + Source manually),
    // none of the tiles light up — clean signal that you're outside a
    // preset slice.
    syncActiveKpiTile();

    summary.textContent = filtered.length === all.length
      ? 'Showing all ' + all.length + ' questions'
      : 'Showing ' + filtered.length + ' of ' + all.length + ' questions';

    // Apply current sort. Slice first so we don't mutate the original.
    filtered.sort(adminSortComparator());

    // Reflect sort state on the headers so the indicator caret renders.
    $$('.stl-admin__th--sortable').forEach((th) => {
      th.removeAttribute('data-sort-active');
      th.removeAttribute('data-sort-dir');
    });
    const activeTh = document.querySelector('.stl-admin__th--sortable[data-sort="' + adminSort.column + '"]');
    if (activeTh) {
      activeTh.setAttribute('data-sort-active', '1');
      activeTh.setAttribute('data-sort-dir', adminSort.direction);
    }

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
      const isArchived = q.state === 'archived';
      const toggleAction = isLive ? 'unpublish' : 'publish';
      const toggleLabel  = isLive ? 'Unpublish' : 'Publish';
      // Figure indicator: small icon next to the id when this row has
      // attached imagery (chart/svg/image/choiceCharts). Lets admins
      // spot which rows have visuals to maintain at a glance.
      const figureKind = detectFigureKind(q);
      const figureBadge = figureKind === 'none' ? '' :
        '<span class="stl-admin__figure-badge" title="Has figure: ' + figureKind + '" aria-label="Has ' + figureKind + ' figure">◫</span>';
      // Subject (section) display name — falls back to 'Math' for
      // legacy untagged questions. Used in the 2-line Subject/Topic cell
      // so admins can scan section coverage without leaving the table.
      const subjId = q.section || 'math';
      const subjLabel = subjectName(subjId);
      // Lucide-style icon SVGs, drawn at 16px with currentColor stroke.
      // Each icon ships inline so the action buttons stay self-contained
      // (no extra requests for an icon font / sprite).
      const ICON_PUBLISH    = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
      const ICON_UNPUBLISH  = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>';
      const ICON_EDIT       = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>';
      const ICON_ARCHIVE    = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>';
      const ICON_UNARCHIVE  = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h4"/><path d="M14 21h4a2 2 0 0 0 2-2V8"/><path d="m12 12-3 3 3 3"/><path d="M9 15h7"/></svg>';
      // Build action button HTML — each is icon-only with a title for
      // hover tooltip + aria-label for screen readers. data-tip mirrors
      // the title for the custom CSS tooltip below the button.
      const iconBtn = (action, label, icon, modClass) => (
        '<button type="button" class="stl-admin__icon-btn' + (modClass ? ' ' + modClass : '') +
          '" data-action="' + action + '" data-id="' + escapeHtml(q.id) +
          '" aria-label="' + escapeHtml(label) + '"' +
          ' title="' + escapeHtml(label) + '"' +
          ' data-tip="' + escapeHtml(label) + '">' + icon + '</button>'
      );
      const actionsHtml =
        (isArchived
          ? iconBtn('unarchive', 'Restore from archive', ICON_UNARCHIVE)
          : iconBtn(toggleAction, isLive ? 'Unpublish (hide from quiz)' : 'Publish (show in quiz)', isLive ? ICON_UNPUBLISH : ICON_PUBLISH)
        ) +
        iconBtn('edit', 'Edit question', ICON_EDIT) +
        (isArchived ? '' :
          iconBtn('archive', 'Archive (soft-delete)', ICON_ARCHIVE, 'stl-admin__icon-btn--danger'));
      return (
        '<tr class="stl-admin__row' + (isArchived ? ' is-archived' : '') + '" data-id="' + escapeHtml(q.id) + '">' +
          '<td class="stl-admin__td-id">' +
            '<div class="stl-admin__id">' + escapeHtml(q.id) + figureBadge + '</div>' +
            '<div class="stl-admin__id-stem">' + escapeHtml(stemPreview(q.stem)) + '</div>' +
          '</td>' +
          '<td>' + stateBadge + '</td>' +
          '<td>' + sourceBadge +
            '<div class="stl-admin__uploader">' + escapeHtml(q.uploader || '—') + '</div>' +
          '</td>' +
          '<td class="stl-admin__td-subj">' +
            '<div class="stl-admin__subj">' + escapeHtml(subjLabel) + '</div>' +
            '<div class="stl-admin__topic">' + escapeHtml(q.topic || '—') + '</div>' +
          '</td>' +
          '<td><span class="stl-admin__diff" data-tier="' + escapeHtml(tierLabelFor(q.difficulty, q.testType)) + '">' +
            escapeHtml(String(q.difficulty || '—')) +
          '</span></td>' +
          // Date cell — shows the effective entry date ("Aug 1" style).
          // title attribute carries the full ISO for hover, so the
          // compact short form doesn't sacrifice precision.
          '<td class="stl-admin__td-date" title="' + (effectiveDate(q) ? new Date(effectiveDate(q)).toISOString().slice(0,10) : 'no date on file') + '">' +
            escapeHtml(effectiveDateLabel(q)) +
          '</td>' +
          '<td>' + renderStatBar(s) + '</td>' +
          '<td class="stl-admin__td-actions">' + actionsHtml + '</td>' +
        '</tr>'
      );
    }).join('');

    tbody.innerHTML = rowsHtml;
  };

  // ----- edit modal ------------------------------------------------------
  let editingId = null;

  // Build the topic dropdown options from every distinct topic in
  // the bank, plus an "Other…" escape that reveals a freeform input.
  // Called once when the modal opens so freshly-added topics from a
  // previous edit show up too.
  const populateTopicDropdown = (selectedTopic) => {
    const sel = $('#edit-topic');
    if (!sel) return;
    const topics = Array.from(new Set(
      (window.STL_QUESTIONS_ALL || []).map((q) => q.topic).filter(Boolean)
    )).sort();
    // If the question's current topic isn't in the bank's topic list
    // (rare — only on a fresh insert), include it explicitly so it
    // selects correctly.
    if (selectedTopic && !topics.includes(selectedTopic)) topics.push(selectedTopic);
    const escapedOpts = topics.map((t) =>
      '<option value="' + escapeHtml(t) + '"' + (t === selectedTopic ? ' selected' : '') + '>' +
      escapeHtml(t) + '</option>'
    ).join('');
    sel.innerHTML = escapedOpts + '<option value="__other__">Other…</option>';
    // Hide the "Other..." text input; it appears only when __other__ is chosen.
    const otherInput = $('#edit-topic-other');
    if (otherInput) { otherInput.hidden = true; otherInput.value = ''; }
  };

  // ----- figure editor (admin) -------------------------------------------
  // Five "kinds" of figure are supported: none, image, svg, chart,
  // choiceCharts. The UI shows different fields per kind. Saved values
  // round-trip through the question's per-row override so admins can
  // attach/edit imagery without touching the source files.

  // Detect which kind a question currently has. Order matters: chart
  // wins over choiceCharts wins over svg wins over image — but in
  // practice a question only has one. We check chart first because
  // it's the "main" figure slot; choiceCharts is a separate concept.
  const detectFigureKind = (q) => {
    if (!q) return 'none';
    if (q.choiceCharts) return 'choiceCharts';
    if (q.chart) return 'chart';
    if (q.svg)   return 'svg';
    if (q.image) return 'image';
    return 'none';
  };

  // Toggle which sub-fields are visible based on the picker.
  const setFigureKindUI = (kind) => {
    const wrapper = $('#edit-figure-fs');
    if (!wrapper) return;
    wrapper.querySelectorAll('[data-figure-kind]').forEach((el) => {
      const kinds = (el.getAttribute('data-figure-kind') || '').split(',');
      el.hidden = !kinds.includes(kind);
    });
  };

  // Track Chart.js instances spawned by the multi-card preview so we
  // can destroy them between renders. Without this, every keystroke
  // in the choiceCharts JSON textarea spawns 4 fresh chart instances
  // attached to detached canvases — RAF/ResizeObserver leaks plus a
  // visible "growing" effect as old instances re-measure orphaned DOM.
  const previewChoiceCharts = [];
  const teardownPreviewChoiceCharts = () => {
    while (previewChoiceCharts.length) {
      const inst = previewChoiceCharts.pop();
      try { inst.destroy(); } catch (_) {}
    }
  };

  // Render a live preview of the current figure config inside the modal.
  // For single figures (image/svg/chart) we use the existing renderFigure
  // pipeline against #edit-figure-preview. For choiceCharts we render a
  // 2x2 mini-grid of the choice charts.
  const renderFigurePreview = () => {
    const kind = $('#edit-figure-kind').value;
    const single = $('#edit-figure-preview');
    const multi  = $('#edit-figure-choice-preview');
    // Tear down ALL prior chart instances before re-rendering — both
    // the single-figure registry and the multi-chart preview pool.
    if (single) {
      const prev = figureChartRegistry.get(single);
      if (prev) { try { prev.destroy(); } catch (_) {} figureChartRegistry.delete(single); }
      single.innerHTML = '';
      single.hidden = true;
    }
    teardownPreviewChoiceCharts();
    if (multi) {
      multi.innerHTML = '';
      multi.hidden = true;
    }
    const fig = readFigureFromForm({ silent: true });
    if (!fig || kind === 'none') return;
    if (kind === 'choiceCharts') {
      if (!Array.isArray(fig.choiceCharts) || fig.choiceCharts.length === 0) return;
      multi.hidden = false;
      fig.choiceCharts.forEach((cfg, idx) => {
        const card = document.createElement('div');
        card.className = 'stl-admin__choice-preview-card';
        card.innerHTML = '<span class="stl-admin__choice-letter">' + (LETTERS[idx] || (idx + 1)) + '</span>';
        const canvas = document.createElement('canvas');
        card.appendChild(canvas);
        multi.appendChild(card);
        if (window.Chart) {
          try {
            themeChart();
            const cjs = buildChartConfig(cfg);
            // Disable animation in the preview path so the admin sees
            // the final chart shape immediately on each keystroke
            // rather than re-animating the entry every time.
            cjs.options = cjs.options || {};
            cjs.options.animation = false;
            cjs.options.responsive = true;
            cjs.options.maintainAspectRatio = false;
            const inst = new window.Chart(canvas.getContext('2d'), cjs);
            previewChoiceCharts.push(inst);
          } catch (_) { /* preview only — silent */ }
        }
      });
      return;
    }
    // single figure
    renderFigure(single, fig);
  };

  // Pull the figure config out of the form fields for saving (or for
  // the preview). When `silent`, JSON parse errors are swallowed; when
  // the form is being saved, errors surface a toast and abort.
  const readFigureFromForm = (opts) => {
    const silent = !!(opts && opts.silent);
    const kind = $('#edit-figure-kind').value;
    if (kind === 'none') return { __clear: true };
    if (kind === 'image') {
      const url = $('#edit-figure-image-url').value.trim();
      const alt = $('#edit-figure-image-alt').value.trim();
      if (!url) return silent ? null : (toast('Image URL required'), null);
      return { image: url, imageAlt: alt };
    }
    if (kind === 'svg') {
      const svg = $('#edit-figure-svg').value.trim();
      if (!svg) return silent ? null : (toast('SVG source required'), null);
      return { svg };
    }
    if (kind === 'chart') {
      const raw = $('#edit-figure-chart').value.trim();
      const errEl = $('#edit-figure-chart-err');
      if (errEl) { errEl.hidden = true; errEl.textContent = ''; }
      if (!raw) return silent ? null : (toast('Chart JSON required'), null);
      try {
        const parsed = JSON.parse(raw);
        return { chart: parsed };
      } catch (e) {
        if (errEl) { errEl.textContent = 'JSON parse error: ' + e.message; errEl.hidden = false; }
        if (!silent) toast('Chart JSON is invalid');
        return null;
      }
    }
    if (kind === 'choiceCharts') {
      const raw = $('#edit-figure-choice-charts').value.trim();
      const errEl = $('#edit-figure-choice-charts-err');
      if (errEl) { errEl.hidden = true; errEl.textContent = ''; }
      if (!raw) return silent ? null : (toast('Choice charts JSON required'), null);
      try {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('must be a JSON array');
        return { choiceCharts: parsed };
      } catch (e) {
        if (errEl) { errEl.textContent = 'JSON parse error: ' + e.message; errEl.hidden = false; }
        if (!silent) toast('Choice charts JSON is invalid');
        return null;
      }
    }
    return null;
  };

  // Populate the editor fields from a question's existing figure data.
  const populateFigureEditor = (q) => {
    const kind = detectFigureKind(q);
    $('#edit-figure-kind').value = kind;
    $('#edit-figure-image-url').value = q.image || '';
    $('#edit-figure-image-alt').value = q.imageAlt || '';
    $('#edit-figure-svg').value = q.svg || '';
    $('#edit-figure-chart').value = q.chart ? JSON.stringify(q.chart, null, 2) : '';
    $('#edit-figure-choice-charts').value = q.choiceCharts ? JSON.stringify(q.choiceCharts, null, 2) : '';
    setFigureKindUI(kind);
    renderFigurePreview();
  };

  const openEditModal = (qid) => {
    const q = (window.STL_QUESTIONS_ALL || []).find((x) => x.id === qid);
    if (!q) { toast("Couldn't find that question"); return; }
    editingId = qid;
    $('#admin-modal-title').textContent = qid;

    $('#edit-stem').value        = q.stem        || '';
    $('#edit-explanation').value = q.explanation || '';
    populateTopicDropdown(q.topic || '');
    // Difficulty is now numeric; default to 580 (medium) for any
    // legacy row that still has a string value.
    const numDiff = typeof q.difficulty === 'number'
      ? q.difficulty
      : ({ easy: 480, medium: 580, hard: 680, insane: 760 }[q.difficulty] || 580);
    $('#edit-difficulty').value  = numDiff;
    $('#edit-state').value       = q.state       || 'live';
    $('#edit-answer').value      = q.answer == null ? '' : String(q.answer);

    const choicesList = $('#edit-choices-list');
    choicesList.innerHTML = '';
    // Clamp to MAX_CHOICES (4) regardless of incoming length so a
    // malformed question (or a future-schema record) can never bleed
    // a 5th input row into the editor. Also pads empties so all four
    // slots are always editable.
    const choices = normalizeChoices(q.choices);
    choices.forEach((c, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'stl-admin__choice-row';
      wrap.innerHTML =
        '<span class="stl-admin__choice-letter">' + LETTERS[i] + '</span>' +
        '<input type="text" class="stl-admin__input" data-choice-idx="' + i + '" value="' +
          escapeHtml(c) + '" />';
      choicesList.appendChild(wrap);
    });

    // Figure editor — populate from the merged question's current
    // figure data (chart/svg/image/choiceCharts), set the kind picker,
    // render the preview pane.
    populateFigureEditor(q);

    // Per-question note + attachments. Identical UI to the review
    // modal so notes captured during triage are editable here too.
    // buildNoteSectionHtml mints unique IDs so review + edit can
    // coexist without aria/label collisions.
    const noteHost = $('#edit-note-section');
    if (noteHost) noteHost.innerHTML = buildNoteSectionHtml(qid, 'edit');

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
    showAdminModal(modal);
    document.body.style.overflow = 'hidden';
    // Focus after the entry transition has settled so the textarea
    // doesn't fight the panel's transform for visual attention.
    setTimeout(() => $('#edit-stem').focus(), 240);
  };

  const closeEditModal = () => {
    // Flush any in-flight note text before tearing down — the blur
    // handler is enough for tab/click-away, but the X / Cancel buttons
    // close before blur fires.
    if (editingId) flushNoteFor(editingId);
    editingId = null;
    hideAdminModal($('#admin-modal'));
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

  // ----- review queue modal ---------------------------------------------
  // Full-page triage flow that paginates through a queue of questions
  // one at a time. Generalized over three sources:
  //
  //   • { kind: 'state',  state: 'needs-review' }
  //   • { kind: 'state',  state: 'archived'      }
  //   • { kind: 'import', importId: 'sat-math-…' }
  //
  // The header label, the trigger buttons, and the "queue cleared"
  // copy all adapt to the source. Decision semantics are identical
  // across sources — only the *default expectation* changes (you're
  // more likely to Approve from needs-review, more likely to Delete
  // from archived) — and the modal exposes the full set in every case
  // so a single keystroke can move any question to any state:
  //
  //   • Approve         → state 'live'         (A or →)
  //   • Keep in review  → state 'needs-review' (K)
  //   • Archive         → state 'archived'     (X)
  //   • Delete          → state 'deleted'      (Delete or Backspace)
  //                       Soft via assembleBank() filter — recoverable
  //                       by removing the override.
  //   • Skip            → no state change      (S)
  //   • Prev            → cursor -1            (←, when not deciding)
  //
  // We snapshot the queue at open time so mutations mid-session don't
  // shift neighbors; the snapshot is just IDs, so concurrent edits to
  // stem/choices/explanation still flow through. Each decision also
  // writes/loads the per-question `note` field from the override so
  // free-text annotations persist alongside the state change.
  let reviewQueueIds = [];
  let reviewQueueSource = null;  // {kind, state?, importId?, label}
  let reviewCursor = 0;
  let reviewKeyHandler = null;

  const collectReviewQueueIds = (source) => {
    const all = window.STL_QUESTIONS_ALL || [];
    if (!source) return [];
    if (source.kind === 'state') {
      return all.filter((q) => q && q.state === source.state).map((q) => q.id);
    }
    if (source.kind === 'import') {
      return all.filter((q) => q && q.importId === source.importId).map((q) => q.id);
    }
    return [];
  };

  // For sources that filter by `deleted` we need to bypass the
  // assembleBank() filter that hides deleted items. The review modal
  // is the recovery path for those, so it must be able to see them.
  // (Today we don't expose a "Review deleted" button — but keeping the
  // helper aware of the case so future work isn't blocked.)
  const collectReviewQueueIdsIncludingDeleted = (source) => {
    if (source && source.kind === 'state' && source.state === 'deleted') {
      const overrides = loadAdminOverrides();
      // Walk every override; resolve back to the base question. Slow but
      // tiny — deleted set is small by construction.
      return Object.keys(overrides).filter((id) => (overrides[id] || {}).state === 'deleted');
    }
    return collectReviewQueueIds(source);
  };

  // Where the trigger buttons live in the DOM, keyed by source kind/value.
  // updateReviewTriggerVisibility refreshes counts + hidden state for all
  // of them on every bank-updated event.
  const REVIEW_TRIGGERS = [
    { id: 'btn-admin-review',          countId: 'btn-admin-review-count',           source: { kind: 'state', state: 'needs-review' } },
    { id: 'btn-admin-review-archived', countId: 'btn-admin-review-archived-count',  source: { kind: 'state', state: 'archived'     } },
  ];
  const updateReviewTriggerVisibility = () => {
    REVIEW_TRIGGERS.forEach((t) => {
      const btn = $('#' + t.id);
      const countEl = $('#' + t.countId);
      if (!btn) return;
      const n = collectReviewQueueIds(t.source).length;
      if (countEl) countEl.textContent = String(n);
      // Only show on the Questions tab AND when at least one match exists.
      btn.hidden = (n === 0) || (btn.dataset.tabAction !== 'questions');
    });
  };

  const closeReviewQueue = () => {
    hideAdminModal($('#review-modal'));
    if (reviewKeyHandler) {
      document.removeEventListener('keydown', reviewKeyHandler);
      reviewKeyHandler = null;
    }
    reviewQueueIds = [];
    reviewQueueSource = null;
    reviewCursor = 0;
  };

  // Per-question note field — server-backed via /api/admin/note. The
  // localStorage shadow stays as a write-through cache so the UI
  // stays snappy on re-render and survives the network being slow
  // or temporarily down. Source of truth is the question_overrides
  // row in Supabase; every admin reads/writes the same record so
  // notes are now multi-admin-shared.
  //
  // Reads: synchronous getter returns the cached value (override or
  // base) for immediate UI render; asynchronous refresh fires in the
  // background and updates the cache + the visible textarea/strip
  // once the server responds.
  // Writes: write-through — update localStorage first (instant), then
  // POST to /api/admin/note. On 401/403/503 we keep the local copy and
  // surface a toast so the admin knows the change isn't yet shared.
  const getQuestionNote = (qid) => {
    const overrides = loadAdminOverrides();
    if (overrides[qid] && typeof overrides[qid].note === 'string') return overrides[qid].note;
    const q = (window.STL_QUESTIONS_ALL || []).find((x) => x && x.id === qid);
    return (q && typeof q.note === 'string') ? q.note : '';
  };
  // Track in-flight fetches so a card re-render mid-request doesn't
  // fire a duplicate. Keyed by qid → promise; cleared on settle.
  const _noteFetchesInFlight = new Map();
  const fetchQuestionNoteFromServer = (qid) => {
    if (!qid) return Promise.resolve(null);
    if (_noteFetchesInFlight.has(qid)) return _noteFetchesInFlight.get(qid);
    const p = fetch('/api/admin/note?qid=' + encodeURIComponent(qid), {
        credentials: 'same-origin',
      })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
      .then((payload) => {
        // Merge into the localStorage cache so subsequent renders are
        // instant, AND so the Has-note filter sees the right state.
        updateOverrides((overrides) => {
          const prior = overrides[qid] || {};
          overrides[qid] = {
            ...prior,
            note: payload.note || '',
            noteAttachments: payload.noteAttachments || [],
            noteUpdatedBy: payload.updatedBy || null,
            noteUpdatedAt: payload.updatedAt || null,
          };
          return overrides;
        });
        return payload;
      })
      .catch((err) => {
        // 401/403 → fall back to local-only mode silently. Any other
        // error logs but doesn't crash the UI.
        if (!/HTTP 40[13]/.test(err.message)) console.warn('[note] fetch failed', qid, err);
        return null;
      })
      .finally(() => _noteFetchesInFlight.delete(qid));
    _noteFetchesInFlight.set(qid, p);
    return p;
  };
  const saveQuestionNote = (qid, note) => {
    // Local cache first (instant) so blur/typing never loses data.
    updateOverrides((overrides) => {
      const prior = overrides[qid] || {};
      overrides[qid] = {
        ...prior,
        note: String(note || ''),
        updatedAt: Date.now(),
        updatedBy: 'joshua@sortino.co',
      };
      return overrides;
    });
    // Then push to the server. PUT is idempotent — we send the full
    // note + attachments shape so a stale-write doesn't drop fields.
    const currentAttachments = getQuestionAttachments(qid);
    return fetch('/api/admin/note?qid=' + encodeURIComponent(qid), {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: String(note || ''), noteAttachments: currentAttachments }),
      })
      .then((r) => {
        if (r.status === 401) { toast('Sign in to share notes with other admins'); return; }
        if (r.status === 403) { toast('Admin role required to share notes'); return; }
        if (r.status === 503) { toast('Notes storage not configured'); return; }
        if (!r.ok) toast('Note save failed (HTTP ' + r.status + ')');
      })
      .catch((err) => { console.warn('[note] save failed', qid, err); });
  };
  // Image attachments tied to the note. Stored on the override as
  // `noteAttachments: [{ name, mime, dataUrl, addedAt }, ...]`. Each
  // image is a base64 data URL — localStorage can hold a few MB total
  // across the override store, so the UI caps to <= 2 MB per image
  // after resizing on upload (clientside, see attachImagesToNote).
  const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;        // ~2 MB per image after compression
  const MAX_ATTACHMENT_DIMENSION = 1600;                // longest side, pre-compress
  const getQuestionAttachments = (qid) => {
    const overrides = loadAdminOverrides();
    const arr = (overrides[qid] && overrides[qid].noteAttachments) || [];
    return Array.isArray(arr) ? arr : [];
  };
  const saveQuestionAttachments = (qid, attachments) => {
    // Local cache first.
    updateOverrides((overrides) => {
      const prior = overrides[qid] || {};
      overrides[qid] = {
        ...prior,
        noteAttachments: Array.isArray(attachments) ? attachments : [],
        updatedAt: Date.now(),
        updatedBy: 'joshua@sortino.co',
      };
      return overrides;
    });
    // Server PUT — bundles the current note text so attachments and
    // text stay aligned. Same fail-soft semantics as saveQuestionNote.
    const currentNote = getQuestionNote(qid);
    return fetch('/api/admin/note?qid=' + encodeURIComponent(qid), {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: currentNote, noteAttachments: Array.isArray(attachments) ? attachments : [] }),
      })
      .then((r) => {
        if (r.status === 401) { toast('Sign in to share attachments'); return; }
        if (r.status === 403) { toast('Admin role required to share attachments'); return; }
        if (r.status === 503) { toast('Notes storage not configured'); return; }
        if (r.status === 400) return r.json().then((j) => toast('Rejected: ' + (j.error || 'invalid')));
        if (!r.ok) toast('Attachment save failed (HTTP ' + r.status + ')');
      })
      .catch((err) => { console.warn('[note] attachment save failed', qid, err); });
  };
  // Resize-and-compress an image File before storing. Keeps the longest
  // side at MAX_ATTACHMENT_DIMENSION, re-encodes as JPEG q=0.85 unless
  // the source is transparent PNG. Returns a Promise<data URL>.
  const readImageAsCompressedDataUrl = (file) => new Promise((resolve, reject) => {
    if (!/^image\//.test(file.type)) return reject(new Error('not an image: ' + file.type));
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('failed to decode image'));
      img.onload = () => {
        const longest = Math.max(img.width, img.height);
        const scale = longest > MAX_ATTACHMENT_DIMENSION ? MAX_ATTACHMENT_DIMENSION / longest : 1;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        // PNG keeps alpha; everything else compresses to JPEG.
        const isPng = file.type === 'image/png';
        const outMime = isPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outMime, isPng ? undefined : 0.85);
        // Hard cap — if even the compressed image is huge, reject.
        // Rough char-to-bytes: data URL chars * 0.75 ≈ bytes.
        const approxBytes = Math.floor(dataUrl.length * 0.75);
        if (approxBytes > MAX_ATTACHMENT_BYTES) {
          return reject(new Error('image too large after compression (' + Math.round(approxBytes/1024) + 'KB)'));
        }
        resolve({ name: file.name, mime: outMime, dataUrl, addedAt: Date.now() });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  // Append one or more File objects (e.g. from <input type=file multiple>
  // or a drop event) to a question's attachments. Returns a Promise that
  // resolves with the updated array.
  const attachImagesToNote = (qid, fileList) => {
    const files = Array.from(fileList || []).filter((f) => /^image\//.test(f.type));
    if (files.length === 0) return Promise.resolve(getQuestionAttachments(qid));
    return Promise.all(files.map(readImageAsCompressedDataUrl))
      .then((newOnes) => {
        const merged = getQuestionAttachments(qid).concat(newOnes);
        saveQuestionAttachments(qid, merged);
        return merged;
      });
  };
  const removeAttachment = (qid, index) => {
    const cur = getQuestionAttachments(qid);
    if (index < 0 || index >= cur.length) return cur;
    const next = cur.slice(0, index).concat(cur.slice(index + 1));
    saveQuestionAttachments(qid, next);
    return next;
  };
  // Builds the thumbnail strip HTML for a question's current
  // attachments. Each thumb has a click-to-open behaviour (opens the
  // data URL in a new tab for full-size view) and a × button to remove.
  const renderAttachmentsHtml = (qid) => {
    const att = getQuestionAttachments(qid);
    if (!att || att.length === 0) return '';
    return att.map((a, i) =>
      '<figure class="stl-review-card__attach" data-attach-idx="' + i + '">' +
        '<a href="' + a.dataUrl + '" target="_blank" rel="noopener" title="Open ' + escapeHtml(a.name) + '">' +
          '<img src="' + a.dataUrl + '" alt="' + escapeHtml(a.name) + '" />' +
        '</a>' +
        '<button type="button" class="stl-review-card__attach-remove" data-attach-remove="' + i + '" aria-label="Remove attachment">×</button>' +
        '<figcaption>' + escapeHtml(a.name) + '</figcaption>' +
      '</figure>'
    ).join('');
  };
  // Refresh just the thumbnail strip after add/remove without re-
  // rendering the whole review card (which would lose textarea focus
  // and any in-flight typing). Updates every visible strip for this
  // qid — both the review modal AND the edit modal can be hosting one,
  // and a paste in either should re-render both so the user sees the
  // image regardless of which surface they're looking at.
  const refreshAttachmentsStrip = (qid) => {
    document.querySelectorAll('[data-stl-attach-strip][data-qid="' + qid + '"]').forEach((el) => {
      el.innerHTML = renderAttachmentsHtml(qid);
    });
  };

  // Shared HTML builder for the per-question note section. Used by both
  // the review modal (one card visible at a time) and the edit modal
  // (note shown alongside the full editor). The two contexts can be in
  // the DOM simultaneously, so we key on data-attributes (data-stl-note-*)
  // instead of unique IDs. The single label/input pair keeps a programmatic
  // for/id association via a context-prefixed id so screen readers still
  // announce the label correctly.
  const buildNoteSectionHtml = (qid, ctx) => {
    const inputId  = (ctx || 'note') + '-note-input-' + qid.replace(/[^a-z0-9-]/gi, '_');
    const attachId = (ctx || 'note') + '-attach-input-' + qid.replace(/[^a-z0-9-]/gi, '_');
    return (
      '<div class="stl-review-card__note" data-stl-note="' + escapeHtml(qid) + '">' +
        '<label for="' + inputId + '" class="stl-eyebrow">Note</label>' +
        '<textarea id="' + inputId + '" class="stl-review-card__note-input"' +
          ' data-stl-note-input data-qid="' + escapeHtml(qid) + '"' +
          ' rows="3" placeholder="Optional — anything to flag, source URL, follow-up…">' +
          escapeHtml(getQuestionNote(qid)) +
        '</textarea>' +
        '<div class="stl-review-card__attachments" data-stl-attach-strip data-qid="' + escapeHtml(qid) + '">' +
          renderAttachmentsHtml(qid) +
        '</div>' +
        '<div class="stl-review-card__attach-row">' +
          '<label for="' + attachId + '" class="stl-btn stl-btn--ghost stl-review-card__attach-btn">' +
            '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><polyline points="21 15 16 10 5 21"/></svg>' +
            ' Attach image' +
          '</label>' +
          '<input type="file" id="' + attachId + '" data-stl-attach-input data-qid="' + escapeHtml(qid) + '"' +
            ' accept="image/*" multiple style="display:none" />' +
          '<span class="stl-review-card__attach-hint">Drag images onto the note, or paste from clipboard. Max ~2 MB after compression.</span>' +
        '</div>' +
        '<p class="stl-review-card__note-hint">Note + attachments save automatically.</p>' +
      '</div>'
    );
  };

  // Persist whatever's currently in any note textarea for the given
  // qid (handles both review-modal and edit-modal instances if they're
  // both somehow open). Idempotent — no-op when no value changed.
  const flushNoteFor = (qid) => {
    const inputs = document.querySelectorAll('[data-stl-note-input][data-qid="' + qid + '"]');
    if (!inputs.length) return;
    const next = String(inputs[0].value || '');
    const overrides = loadAdminOverrides();
    const prior = (overrides[qid] && typeof overrides[qid].note === 'string') ? overrides[qid].note : '';
    if (next === prior) return;
    saveQuestionNote(qid, next);
  };

  // Delegated handlers for the file picker + remove × buttons + drag/
  // drop + paste-from-clipboard. Bound once at module load on document
  // since the note DOM gets recreated on every cursor move (review) or
  // open (edit modal). Selectors key on data-stl-note-* attributes so a
  // single set of handlers serves both surfaces — see
  // buildNoteSectionHtml().
  document.addEventListener('change', (e) => {
    const attachInput = e.target && e.target.closest && e.target.closest('[data-stl-attach-input]');
    if (!attachInput) return;
    const qid = attachInput.dataset.qid;
    if (!qid) return;
    attachImagesToNote(qid, attachInput.files).then(() => {
      refreshAttachmentsStrip(qid);
      attachInput.value = '';
      toast('Attachment saved');
    }).catch((err) => {
      toast('Couldn\'t attach: ' + (err && err.message ? err.message : String(err)));
    });
  });
  document.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-attach-remove]');
    if (rm) {
      const wrap = rm.closest('[data-stl-attach-strip]');
      const qid = wrap && wrap.dataset.qid;
      const idx = Number(rm.getAttribute('data-attach-remove'));
      if (qid && Number.isFinite(idx)) {
        removeAttachment(qid, idx);
        refreshAttachmentsStrip(qid);
      }
    }
  });
  // Paste-from-clipboard inside any note textarea — common workflow
  // is screenshot → cmd-v.
  document.addEventListener('paste', (e) => {
    const noteInput = e.target && e.target.closest && e.target.closest('[data-stl-note-input]');
    if (!noteInput) return;
    const items = (e.clipboardData && e.clipboardData.items) || [];
    const imageFiles = [];
    for (const it of items) {
      if (it.kind === 'file' && /^image\//.test(it.type)) {
        const f = it.getAsFile();
        if (f) imageFiles.push(f);
      }
    }
    if (imageFiles.length === 0) return;
    e.preventDefault();
    const qid = noteInput.dataset.qid;
    attachImagesToNote(qid, imageFiles).then(() => {
      refreshAttachmentsStrip(qid);
      toast(imageFiles.length + ' image(s) attached');
    }).catch((err) => toast('Paste failed: ' + (err && err.message ? err.message : String(err))));
  });
  // Drag images onto the note area (either modal).
  document.addEventListener('dragover', (e) => {
    const noteEl = e.target.closest && e.target.closest('[data-stl-note]');
    if (!noteEl) return;
    e.preventDefault();
    noteEl.classList.add('is-drag-over');
  });
  document.addEventListener('dragleave', (e) => {
    const noteEl = e.target.closest && e.target.closest('[data-stl-note]');
    if (noteEl) noteEl.classList.remove('is-drag-over');
  });
  document.addEventListener('drop', (e) => {
    const noteEl = e.target.closest && e.target.closest('[data-stl-note]');
    if (!noteEl) return;
    e.preventDefault();
    noteEl.classList.remove('is-drag-over');
    const qid = noteEl.dataset.stlNote;
    if (!qid) return;
    const files = (e.dataTransfer && e.dataTransfer.files) || [];
    if (!files.length) return;
    attachImagesToNote(qid, files).then(() => {
      refreshAttachmentsStrip(qid);
      toast('Attachment saved');
    }).catch((err) => toast('Drop failed: ' + (err && err.message ? err.message : String(err))));
  });

  // Build the card body for a single question. Reuses formatRich (the
  // same renderer the live quiz uses), so any math / fractions / leftover
  // LaTeX renders identically here and during the test.
  const buildReviewCardHtml = (q) => {
    if (!q) return '';
    const subj = subjectName(q.section || 'math');
    const tier = tierLabelFor(q.difficulty, q.testType);
    const sourceLbl = q.source === 'ai-generated' ? 'AI' : 'Human';

    // Choices block — highlight the correct answer for fast scanning.
    let choicesHtml = '';
    if (Array.isArray(q.choices) && q.choices.length > 0) {
      const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
      choicesHtml = '<ol class="stl-review-card__choices">';
      q.choices.forEach((c, i) => {
        const isAns = (i === q.answer);
        choicesHtml += '<li class="stl-review-card__choice' + (isAns ? ' is-correct' : '') + '">'
          + '<span class="stl-review-card__choice-letter">' + (letters[i] || (i + 1)) + '</span>'
          + '<span class="stl-review-card__choice-text">' + formatRich(c) + '</span>'
          + (isAns ? '<span class="stl-review-card__choice-mark" aria-label="Correct answer">✓</span>' : '')
          + '</li>';
      });
      choicesHtml += '</ol>';
    } else {
      // SPR — show the typed answer.
      choicesHtml = '<div class="stl-review-card__spr">'
        + '<p class="stl-review-card__spr-label">Grid-in answer</p>'
        + '<p class="stl-review-card__spr-value">' + formatRich(String(q.answer || '—')) + '</p>'
        + '</div>';
    }

    // Optional figure (svg) and table. The live quiz renders tables by
    // building DOM nodes (see line ~3054); for the review card we just
    // need an HTML string, so an inline serializer is cleaner than
    // factoring out the existing path.
    let figureHtml = '';
    if (q.svg) {
      figureHtml += '<figure class="stl-review-card__figure">' + q.svg + '</figure>';
    }
    if (q.table) {
      const t = q.table;
      let tbl = '<table class="stl-quiz__table">';
      if (t.caption) tbl += '<caption>' + escapeHtml(t.caption) + '</caption>';
      if (Array.isArray(t.headers) && t.headers.length) {
        tbl += '<thead><tr>';
        t.headers.forEach((h) => { tbl += '<th scope="col">' + escapeHtml(String(h)) + '</th>'; });
        tbl += '</tr></thead>';
      }
      if (Array.isArray(t.rows) && t.rows.length) {
        tbl += '<tbody>';
        t.rows.forEach((row, i) => {
          const isTotals = t.totalsRow && i === t.rows.length - 1;
          tbl += '<tr' + (isTotals ? ' class="stl-quiz__table-totals"' : '') + '>';
          row.forEach((cell, j) => {
            if (j === 0 && t.firstColIsHeader) {
              tbl += '<th scope="row">' + escapeHtml(String(cell)) + '</th>';
            } else {
              tbl += '<td>' + escapeHtml(String(cell)) + '</td>';
            }
          });
          tbl += '</tr>';
        });
        tbl += '</tbody>';
      }
      tbl += '</table>';
      figureHtml += '<div class="stl-review-card__table-wrap">' + tbl + '</div>';
    }

    return (
      '<div class="stl-review-card">' +
        '<div class="stl-review-card__stem">' + formatRich(q.stem || '') + '</div>' +
        figureHtml +
        choicesHtml +
        (q.explanation
          ? '<details class="stl-review-card__explanation" open>' +
              '<summary>Explanation</summary>' +
              '<div class="stl-review-card__explanation-body">' + formatRich(q.explanation) + '</div>' +
            '</details>'
          : '') +
        // Per-question note field — free-text annotation persisted on
        // the override. We render the textarea inline so reviewers can
        // type while the question is visible without opening a separate
        // edit modal. The blur handler saves on focus loss; we also
        // save on every state-change action. The attachment row below
        // accepts dropped/picked images and stores them as base64 data
        // URLs on the same override (noteAttachments array). Same HTML
        // is used in the edit modal — see buildNoteSectionHtml.
        buildNoteSectionHtml(q.id, 'review') +
        '<dl class="stl-review-card__meta">' +
          '<div><dt>ID</dt><dd>' + escapeHtml(q.id) + '</dd></div>' +
          '<div><dt>Test</dt><dd>' + escapeHtml(q.testType || 'SAT') + ' · ' + escapeHtml(subj) + '</dd></div>' +
          '<div><dt>Topic</dt><dd>' + escapeHtml(q.topic || '—') + '</dd></div>' +
          '<div><dt>Difficulty</dt><dd>' + escapeHtml(String(q.difficulty || '—')) + ' (' + escapeHtml(tier) + ')</dd></div>' +
          '<div><dt>Source</dt><dd>' + escapeHtml(sourceLbl) + '</dd></div>' +
          (q.importId ? '<div><dt>Import</dt><dd>' + escapeHtml(q.importId) + '</dd></div>' : '') +
        '</dl>' +
      '</div>'
    );
  };

  // Persist whatever's currently in the review-modal note textarea, if
  // any. Called automatically on every cursor move + decision so notes
  // never get lost. No-op when the textarea isn't present (between
  // cards or after queue exhaustion). Thin wrapper around the shared
  // flushNoteFor() so both review and edit surfaces use the same path.
  const flushReviewNote = () => {
    // Pick the textarea that's actually live in the review modal —
    // scoped by data-stl-note-input + a visible review-modal ancestor.
    const input = document.querySelector('#review-modal [data-stl-note-input]') ||
                  document.querySelector('.stl-review-modal [data-stl-note-input]');
    if (!input) return;
    const qid = input.dataset.qid;
    if (qid) flushNoteFor(qid);
  };

  const renderReviewCursor = () => {
    const titleEl = $('#review-modal-title');
    const eyebrowEl = $('#review-modal-eyebrow');
    const metaEl = $('#review-modal-meta');
    const bodyEl = $('#review-modal-body');
    const doneEl = $('#review-modal-done');
    const footEl = document.querySelector('.stl-review-modal__foot');
    const footEls = [
      $('#btn-review-prev'), $('#btn-review-skip'),
      $('#btn-review-approve'), $('#btn-review-keep'),
      $('#btn-review-archive'), $('#btn-review-delete'),
    ];

    // Eyebrow + done-state copy adapt to the queue source so the user
    // always knows what list they're triaging.
    const sourceLabel = reviewQueueSource ? reviewQueueSource.label : 'Review queue';
    if (eyebrowEl) eyebrowEl.textContent = sourceLabel;

    // Queue exhausted — show the done state, hide body + foot.
    if (reviewCursor >= reviewQueueIds.length) {
      if (doneEl) doneEl.hidden = false;
      if (bodyEl) { bodyEl.innerHTML = ''; bodyEl.hidden = true; }
      if (footEl) footEl.hidden = true;
      if (titleEl) titleEl.textContent = reviewQueueIds.length + ' reviewed';
      if (metaEl) metaEl.textContent = '';
      footEls.forEach((el) => { if (el) el.disabled = true; });
      return;
    }

    if (doneEl) doneEl.hidden = true;
    if (bodyEl) bodyEl.hidden = false;
    if (footEl) footEl.hidden = false;
    footEls.forEach((el) => { if (el) el.disabled = false; });
    if ($('#btn-review-prev')) $('#btn-review-prev').disabled = (reviewCursor === 0);

    const qid = reviewQueueIds[reviewCursor];
    // The current question might be in STL_QUESTIONS_ALL OR (for the
    // deleted-state queue) only reachable via the override + base bank.
    let q = (window.STL_QUESTIONS_ALL || []).find((x) => x && x.id === qid);
    if (!q && reviewQueueSource && reviewQueueSource.kind === 'state' && reviewQueueSource.state === 'deleted') {
      // Reconstruct from the raw banks + override since assembleBank()
      // filtered the deleted item out of STL_QUESTIONS_ALL.
      const raw = [].concat(
        window.STL_QUESTIONS_HUMAN || [],
        window.STL_QUESTIONS_AI    || [],
        window.STL_QUESTIONS_ISEE  || [],
        window.STL_QUESTIONS_ACT   || [],
        window.STL_QUESTIONS_PSAT  || [],
        window.STL_QUESTIONS_SSAT  || [],
        window.STL_QUESTIONS_HSPT  || []
      );
      const base = raw.find((x) => x && x.id === qid);
      const ov = (loadAdminOverrides()[qid] || {});
      if (base) q = { ...base, ...ov };
    }
    if (!q) {
      // The question is genuinely gone (e.g. an import was deleted out
      // from under us during the session). Skip forward.
      reviewCursor++;
      renderReviewCursor();
      return;
    }
    if (titleEl) titleEl.textContent = (reviewCursor + 1) + ' of ' + reviewQueueIds.length;
    if (metaEl) {
      metaEl.innerHTML =
        '<span class="stl-admin__badge stl-admin__badge--' + q.state + '">' + escapeHtml(stateLabel(q.state)) + '</span>' +
        '<span class="stl-review-modal__meta-id">' + escapeHtml(q.id) + '</span>';
    }
    // Repoint the participant-view link at this question. Open in a
    // fresh tab so it doesn't disrupt the review session.
    const partLink = $('#btn-review-participant');
    if (partLink) partLink.href = location.pathname + '?preview-question=' + encodeURIComponent(q.id);
    if (bodyEl) {
      bodyEl.innerHTML = buildReviewCardHtml(q);
      bodyEl.scrollTop = 0;
    }
    // Fetch the latest note + attachments from the server. The
    // localStorage cache rendered an instant first paint; this
    // async refresh pulls anything another admin saved since our
    // last view and updates the textarea + thumb strip in place.
    // Stale-write protection: if the user has started typing, we
    // skip clobbering their textarea (the bank index keeps the
    // server value but the DOM stays).
    fetchQuestionNoteFromServer(q.id).then((payload) => {
      if (!payload) return;
      // Only update if we're still showing the same card.
      const currentQid = reviewQueueIds[reviewCursor];
      if (currentQid !== q.id) return;
      // Sync every textarea bound to this qid (review modal + edit
      // modal can coexist; updating both keeps them aligned without
      // clobbering focused input).
      document.querySelectorAll('[data-stl-note-input][data-qid="' + q.id + '"]').forEach((ta) => {
        if (document.activeElement !== ta && typeof payload.note === 'string') {
          ta.value = payload.note;
        }
      });
      refreshAttachmentsStrip(q.id);
    });
  };

  const advanceReviewCursor = (delta) => {
    flushReviewNote();
    reviewCursor = Math.max(0, reviewCursor + delta);
    renderReviewCursor();
  };

  const decideCurrentReview = (nextState) => {
    if (reviewCursor >= reviewQueueIds.length) return;
    flushReviewNote();
    const qid = reviewQueueIds[reviewCursor];
    // Light up the action that was clicked so the user sees the API
    // write is in flight. setQuestionState writes localStorage
    // synchronously and fires the API call as a background promise;
    // we attach a sentinel for ~600ms or until the next render, which-
    // ever is shorter, so the spinner doesn't flicker on a fast write.
    const btnMap = {
      live: '#btn-review-approve',
      'needs-review': '#btn-review-keep',
      archived: '#btn-review-archive',
      deleted: '#btn-review-delete',
    };
    const btn = btnMap[nextState] ? document.querySelector(btnMap[nextState]) : null;
    if (btn) {
      setButtonLoading(btn, true);
      // Clear right before the cursor advances so the spinner lifts
      // visibly. ~250ms is enough that a typical local write feels
      // confirmed without making fast clicks feel sluggish.
      setTimeout(() => setButtonLoading(btn, false), 250);
    }
    setQuestionState(qid, nextState);
    reviewCursor++;
    renderReviewCursor();
    updateReviewTriggerVisibility();
  };

  // Source presets — labels surfaced in the modal header.
  const REVIEW_SOURCES = {
    'needs-review': { kind: 'state', state: 'needs-review', label: 'Review queue · Needs review' },
    'archived':     { kind: 'state', state: 'archived',     label: 'Review queue · Archived' },
    // 'import' is constructed inline because importId is dynamic.
  };
  const openReviewQueue = (sourceArg) => {
    // Resolve the source. Default to needs-review for the legacy
    // single-argument call sites + the top-level "Review queue" button.
    let source = REVIEW_SOURCES['needs-review'];
    if (sourceArg && typeof sourceArg === 'object') {
      source = sourceArg;
      if (!source.label) {
        if (source.kind === 'import') source.label = 'Review queue · ' + (source.importId || 'Import');
        else if (source.kind === 'state') source.label = 'Review queue · ' + stateLabel(source.state);
      }
    } else if (typeof sourceArg === 'string' && REVIEW_SOURCES[sourceArg]) {
      source = REVIEW_SOURCES[sourceArg];
    }
    reviewQueueSource = source;
    reviewQueueIds = collectReviewQueueIdsIncludingDeleted(source);
    reviewCursor = 0;
    if (reviewQueueIds.length === 0) {
      toast('Nothing to review in this queue.');
      return;
    }
    reviewKeyHandler = (e) => {
      // Don't fire shortcuts while typing in the note textarea (or any
      // other input). The note saves on blur or on decision, so the
      // user can switch out via Tab + then use shortcuts.
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'Escape')     { e.preventDefault(); closeReviewQueue();           return; }
      if (e.key === 'a' || e.key === 'A') { e.preventDefault(); decideCurrentReview('live');         return; }
      if (e.key === 'k' || e.key === 'K') { e.preventDefault(); decideCurrentReview('needs-review'); return; }
      if (e.key === 'x' || e.key === 'X') { e.preventDefault(); decideCurrentReview('archived');     return; }
      if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); decideCurrentReview('deleted'); return; }
      if (e.key === 's' || e.key === 'S') { e.preventDefault(); advanceReviewCursor(+1);             return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); advanceReviewCursor(+1); return; }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); advanceReviewCursor(-1); return; }
    };
    document.addEventListener('keydown', reviewKeyHandler);
    renderReviewCursor();
    showAdminModal($('#review-modal'));
  };

  // Wire up the modal's buttons + the page-action triggers + per-card
  // note save on blur. Delegated so re-renders don't matter.
  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-admin-review'))          { e.preventDefault(); openReviewQueue('needs-review'); return; }
    if (e.target.closest('#btn-admin-review-archived')) { e.preventDefault(); openReviewQueue('archived');     return; }
    if (e.target.closest('#btn-review-approve')) { e.preventDefault(); decideCurrentReview('live');         return; }
    if (e.target.closest('#btn-review-keep'))    { e.preventDefault(); decideCurrentReview('needs-review'); return; }
    if (e.target.closest('#btn-review-archive')) { e.preventDefault(); decideCurrentReview('archived');     return; }
    if (e.target.closest('#btn-review-delete'))  { e.preventDefault(); decideCurrentReview('deleted');      return; }
    if (e.target.closest('#btn-review-skip'))    { e.preventDefault(); advanceReviewCursor(+1);             return; }
    if (e.target.closest('#btn-review-prev'))    { e.preventDefault(); advanceReviewCursor(-1);             return; }
    if (e.target.closest('[data-modal-close="review"]')) { e.preventDefault(); closeReviewQueue();         return; }
  });
  // Persist notes on blur so a typed value doesn't get lost if the
  // reviewer or editor clicks away without using a decision button.
  // Matches any note textarea regardless of host modal — data-stl-note-
  // input is set by buildNoteSectionHtml() on every instance.
  document.addEventListener('blur', (e) => {
    const ta = e.target && e.target.closest && e.target.closest('[data-stl-note-input]');
    if (!ta) return;
    const qid = ta.dataset.qid;
    if (qid) flushNoteFor(qid);
  }, true);

  // Keep all trigger button counts in sync with bank state.
  document.addEventListener('stl:bank-updated', updateReviewTriggerVisibility);

  // Save full edit from the modal form.
  const saveEditFromModal = () => {
    if (!editingId) return;
    // Flush any pending note text first — Save shouldn't drop a value
    // the user typed but didn't blur. The note write goes through its
    // own /api/admin/note endpoint and finishes async; the rest of the
    // save proceeds in parallel.
    flushNoteFor(editingId);
    const stem        = $('#edit-stem').value;
    const explanation = $('#edit-explanation').value;
    // Topic resolves from the dropdown; if "Other…" is selected, take
    // the freeform input (lower-cased, trimmed). Empty Other reverts
    // to the previously-saved topic.
    const topicSel    = $('#edit-topic');
    const otherInput  = $('#edit-topic-other');
    let topic;
    if (topicSel && topicSel.value === '__other__') {
      topic = (otherInput.value || '').trim().toLowerCase().replace(/\s+/g, '-');
    } else {
      topic = (topicSel ? topicSel.value : '').trim();
    }
    const difficulty  = Number($('#edit-difficulty').value);
    const state       = $('#edit-state').value;
    const answerRaw   = $('#edit-answer').value.trim();
    if (!Number.isFinite(difficulty) || difficulty < 200 || difficulty > 800) {
      toast('Difficulty must be 200–800');
      return;
    }

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

    // Block edits that would create a stem-collision with a *different*
    // question in the bank. Matching against the question being edited
    // is fine — that's just an unchanged stem.
    const dup = findDuplicateStem(stem, editingId);
    if (dup) {
      toast('Duplicate of ' + dup.id + ' — change the stem before saving');
      return;
    }

    // Figure config: read it BEFORE updating overrides so a JSON parse
    // error aborts the save without partial state. {__clear: true}
    // means "remove all figure data"; null means "validation failed —
    // already toasted, abort save".
    const figure = readFigureFromForm({ silent: false });
    if (figure === null) return;

    updateOverrides((overrides) => {
      const prior = overrides[editingId] || {};
      const next = {
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
      // Merge figure: kind=none nulls every figure key so the override
      // genuinely strips imagery; otherwise only the relevant kind's
      // keys are written. Always null the unused kinds so e.g.
      // switching from chart→svg doesn't leave a stale chart behind
      // (the merge layer would otherwise resurrect it).
      const FIGURE_KEYS = ['chart', 'svg', 'image', 'imageAlt', 'choiceCharts'];
      FIGURE_KEYS.forEach((k) => { next[k] = null; });
      if (figure && !figure.__clear) {
        Object.keys(figure).forEach((k) => { next[k] = figure[k]; });
      }
      overrides[editingId] = next;
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

  // ====================================================================
  // Add Questions modal — picker + manual + image + csv
  // ====================================================================
  // Three flows live behind a card picker:
  //   1. Manual    — type stem/choices/answer/explanation by hand
  //   2. Image     — upload a screenshot, AI extracts the question
  //   3. CSV       — bulk import from a spreadsheet
  // Drag-and-drop on the modal anywhere auto-routes to the matching
  // flow based on file extension. All three end up in the
  // localStorage admin-added bucket, which assembleBank merges into
  // the live + all banks.

  let addModalOpen = false;
  let addCurrentView = 'picker';

  // Pretty file-size formatter used by the dropzones.
  const fmtSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  };

  // --- modal open / close / view switching ---
  const setAddView = (view) => {
    addCurrentView = view;
    const modal = $('#add-modal');
    if (!modal) return;
    modal.classList.toggle('is-picker', view === 'picker');
    $$('.stl-add-modal__view').forEach((el) => {
      el.hidden = el.dataset.view !== view;
    });
    const back = $('#add-modal-back');
    if (back) back.hidden = view === 'picker';
    const title = $('#add-modal-title');
    if (title) {
      title.textContent = ({
        picker:   'How would you like to add?',
        manual:   'New question — manual',
        image:    'Upload image',
        json:     'Upload JSON',
        generate: 'Generate with AI',
      })[view] || 'Add questions';
    }
    // CRITICAL: reset the panel's scroll position whenever we switch
    // views. The panel is overflow-y:auto; without this reset the
    // previous view's scroll offset persists into the new view, which
    // makes the new view's header appear clipped (the user reports
    // this as "modal cut off"). Run on next frame so layout settles
    // before the scrollTop write — otherwise the browser may scroll
    // back to the old offset after we've reset.
    const panel = modal.querySelector('.stl-admin-modal__panel');
    if (panel) {
      requestAnimationFrame(() => { panel.scrollTop = 0; });
    }
  };

  const openAddModal = () => {
    if (addModalOpen) return;
    addModalOpen = true;
    const modal = $('#add-modal');
    showAdminModal(modal);
    document.body.style.overflow = 'hidden';
    setAddView('picker');
    // Each reset re-populates its own Test/Subject/Topic selectors
    // so freshly-added topics from prior edits show up immediately.
    resetAddManualForm();
    resetAddImageForm();
    resetAddCsvForm();
    resetAddGenerateForm();
    resetAddSimilarForm();
    resetAddJsonForm();
    // Reset the Upload Image tab back to Convert (default) and ensure
    // step 1 (upload) is the visible step inside that view.
    setAddImageMode('convert');
  };
  const closeAddModal = () => {
    addModalOpen = false;
    hideAdminModal($('#add-modal'));
    document.body.style.overflow = '';
  };

  // --- manual flow ---
  // Populate the Test dropdown from TEST_TYPES in admin order. Used
  // by both the manual form and the generate-with-AI form.
  const populateAddTestDropdown = (selSelector, selectedTest) => {
    const sel = $(selSelector);
    if (!sel) return;
    sel.innerHTML = TEST_TYPE_ORDER.map((id) => {
      const cfg = TEST_TYPES[id];
      if (!cfg) return '';
      return '<option value="' + escapeHtml(id) + '"' +
        (id === selectedTest ? ' selected' : '') + '>' +
        escapeHtml(cfg.name) + '</option>';
    }).join('');
  };
  // Populate the Subject dropdown for the chosen test. Falls back to
  // every subject the test declares (admin can add questions to a
  // subject they later toggle on).
  const populateAddSubjectDropdown = (selSelector, testId, selectedSubject) => {
    const sel = $(selSelector);
    if (!sel) return;
    const subjects = subjectsForTest(testId);
    sel.innerHTML = subjects.map((s) =>
      '<option value="' + escapeHtml(s.id) + '"' +
        (s.id === selectedSubject ? ' selected' : '') + '>' +
        escapeHtml(s.name) + '</option>'
    ).join('');
    // If the previously-selected subject doesn't exist in the new
    // test, the first option auto-selects via DOM default.
  };
  // Topic dropdown narrows to topics that exist for (test, subject).
  // 'Other…' lets admin add a brand-new topic — buildQuestionFromAddForm
  // normalizes it (lowercase, dash-separated). Renders empty-state
  // hint when the (test, subject) has no topics yet.
  const populateAddTopicDropdown = (testId, subjectId, selectedTopic) => {
    const sel = $('#add-topic');
    if (!sel) return;
    const topics = Array.from(new Set(
      (window.STL_QUESTIONS_ALL || [])
        .filter((q) => {
          if (testId && (q.testType || 'SAT') !== testId) return false;
          if (subjectId && (q.section || 'math') !== subjectId) return false;
          return true;
        })
        .map((q) => q.topic)
        .filter(Boolean)
    )).sort();
    if (selectedTopic && !topics.includes(selectedTopic)) topics.push(selectedTopic);
    const empty = topics.length === 0;
    sel.innerHTML =
      (empty ? '<option value="__other__" selected>(no topics yet — add one)</option>'
             : topics.map((t) => '<option value="' + escapeHtml(t) + '"' +
                  (t === selectedTopic ? ' selected' : '') + '>' + escapeHtml(t) + '</option>'
                ).join('') + '<option value="__other__">Other…</option>');
    const other = $('#add-topic-other');
    if (other) {
      // When there are no existing topics, auto-show the "new topic"
      // text input so the admin doesn't have to click into "Other…"
      other.hidden = !empty;
      if (!empty) other.value = '';
    }
  };
  // Sync the difficulty input to the chosen test's scoring scale.
  // Updates min/max/step/value/label/hint so the input + hint always
  // describe the right band (an ACT 1–36 question can't accidentally
  // be saved at SAT-580 difficulty). Used by both the manual form
  // (single difficulty) and the generate-form (min/max range).
  const _diffHintFor = (cfg) => {
    const t = cfg.tiers;
    const stepLbl = cfg.scoreStep === 1 ? '' : ' · ' + cfg.scoreStep + '-point steps';
    return cfg.scoreMin + '–' + cfg.scoreMax + stepLbl +
      ' · ≤' + t.easy + ' easy · ' + (t.easy + cfg.scoreStep) + '–' + t.medium + ' medium · ' +
      (t.medium + cfg.scoreStep) + '–' + t.hard + ' hard · ' + (t.hard + cfg.scoreStep) + '+ insane.';
  };
  const applyTestScaleToManualForm = (testId) => {
    const cfg = TEST_TYPES[testId] || TEST_TYPES.SAT;
    const inp = $('#add-difficulty');
    if (inp) {
      inp.min  = cfg.scoreMin;
      inp.max  = cfg.scoreMax;
      inp.step = cfg.scoreStep;
      // Only clobber the value if it's outside the new test's range.
      const cur = Number(inp.value);
      if (!Number.isFinite(cur) || cur < cfg.scoreMin || cur > cfg.scoreMax) {
        inp.value = cfg.scoreDefault;
      }
    }
    const lbl = $('#add-difficulty-label');
    if (lbl) lbl.textContent = 'Difficulty (' + cfg.name + ' score)';
    const hint = $('#add-difficulty-hint');
    if (hint) hint.textContent = _diffHintFor(cfg);
  };
  const applyTestScaleToGenerateForm = (testId) => {
    const cfg = TEST_TYPES[testId] || TEST_TYPES.SAT;
    const setBounds = (sel, val) => {
      const el = $(sel);
      if (!el) return;
      el.min  = cfg.scoreMin;
      el.max  = cfg.scoreMax;
      el.step = cfg.scoreStep;
      const cur = Number(el.value);
      if (!Number.isFinite(cur) || cur < cfg.scoreMin || cur > cfg.scoreMax) {
        el.value = val;
      }
    };
    // Min defaults to easy threshold + step (start of medium); max to hard.
    setBounds('#add-gen-diff-min', cfg.tiers.easy + cfg.scoreStep);
    setBounds('#add-gen-diff-max', cfg.tiers.hard);
    const lbl = $('#add-gen-diff-label');
    if (lbl) lbl.textContent = 'Difficulty range (' + cfg.name + ' score)';
    const hint = $('#add-gen-diff-hint');
    if (hint) hint.textContent = _diffHintFor(cfg);
  };

  const resetAddManualForm = (prefill) => {
    const form = $('#add-manual-form');
    if (!form) return;
    form.reset();
    // Test + Subject — default to the user's currently-selected test
    // and its first declared subject, unless the prefill (e.g. from
    // image-AI extraction) names one. The image extractor doesn't
    // currently return a test or subject, so prefill.testType is rare
    // — but we honor it if present for future server upgrades.
    const defaultTest = (prefill && prefill.testType) ||
                        (typeof loadSelectedTest === 'function' ? loadSelectedTest() : 'SAT');
    populateAddTestDropdown('#add-test', defaultTest);
    const defaultSubject = (prefill && prefill.section) ||
                           (subjectsForTest(defaultTest)[0] || { id: 'math' }).id;
    populateAddSubjectDropdown('#add-subject', defaultTest, defaultSubject);
    populateAddTopicDropdown(defaultTest, defaultSubject, prefill && prefill.topic);
    applyTestScaleToManualForm(defaultTest);
    // Now the input has the right scale — set the value if prefilled.
    if (prefill && Number.isFinite(Number(prefill.difficulty))) {
      $('#add-difficulty').value = prefill.difficulty;
    }
    $('#add-state').value = (prefill && prefill.state) || 'live';
    $('#add-stem').value = (prefill && prefill.stem) || '';
    $('#add-explanation').value = (prefill && prefill.explanation) || '';
    $('#add-answer').value = prefill && prefill.answer != null ? String(prefill.answer) : '';
    const choiceEls = $$('input[data-choice-idx]', form);
    // The HTML carries 4 fixed inputs; normalize so over/undersized
    // prefill arrays still map cleanly into those 4 slots.
    const choices = normalizeChoices(prefill && prefill.choices);
    choiceEls.forEach((el, i) => { el.value = choices[i] || ''; });
  };

  const buildQuestionFromAddForm = (sourceTag) => {
    const form = $('#add-manual-form');
    const stem = $('#add-stem').value.trim();
    if (!stem) { toast('Stem can\'t be empty'); return null; }

    const dup = findDuplicateStem(stem);
    if (dup) {
      toast('Duplicate of ' + dup.id + ' — that question is already in the bank');
      return null;
    }

    const choiceEls = $$('input[data-choice-idx]', form);
    const choices = choiceEls.map((el) => el.value).filter((v) => v.trim() !== '');
    const isGridIn = choices.length === 0;

    const answerRaw = $('#add-answer').value.trim();
    const answer = isGridIn ? answerRaw : Number(answerRaw);
    if (!isGridIn && (!Number.isFinite(answer) || answer < 0 || answer >= choices.length)) {
      toast('Answer must be a valid index into choices');
      return null;
    }
    if (isGridIn && !answerRaw) { toast('Grid-in needs an answer string'); return null; }

    const topicSel = $('#add-topic');
    const topicOther = $('#add-topic-other');
    let topic;
    if (topicSel.value === '__other__') {
      topic = (topicOther.value || '').trim().toLowerCase().replace(/\s+/g, '-');
      if (!topic) { toast('Pick a topic or fill in "Other…"'); return null; }
    } else {
      topic = topicSel.value.trim();
    }

    // Test + subject pulled from the per-form selectors. Both are
    // required so the question lands in the right pool — the user
    // picker for that test only sees its tagged subject's questions.
    const testType = ($('#add-test') && $('#add-test').value) || 'SAT';
    const section  = ($('#add-subject') && $('#add-subject').value) || 'math';
    const cfg = TEST_TYPES[testType] || TEST_TYPES.SAT;

    const difficulty = Number($('#add-difficulty').value);
    if (!Number.isFinite(difficulty) || difficulty < cfg.scoreMin || difficulty > cfg.scoreMax) {
      toast('Difficulty must be ' + cfg.scoreMin + '–' + cfg.scoreMax);
      return null;
    }

    const me = (window.STL_AUTH && window.STL_AUTH.getCurrentUser && window.STL_AUTH.getCurrentUser()) || null;
    const uploader = me ? me.email : 'unknown@studysignal.ai';

    return {
      id: newAdminQuestionId(),
      testType,
      section,
      topic,
      difficulty,
      stem,
      choices: isGridIn ? null : choices,
      answer,
      explanation: $('#add-explanation').value.trim(),
      state: $('#add-state').value,
      source: sourceTag === 'image' ? 'ai-generated' : 'human-curated',
      uploader,
      reviewStatus: $('#add-state').value === 'live' ? 'verified' : 'unreviewed',
      createdAt: new Date().toISOString().slice(0, 10),
      // Track origin for downstream analytics (e.g., did we image-import this?)
      addOrigin: sourceTag || 'manual',
    };
  };

  // --- image flow ---
  let addImageDataUri = null;
  let addImageFilename = null;

  const resetAddImageForm = () => {
    addImageDataUri = null;
    addImageFilename = null;
    const file = $('#add-image-file');  if (file) file.value = '';
    $('#add-image-preview').hidden = true;
    $('#add-image-status').hidden = true;
    const btn = $('#btn-add-image-convert');
    if (btn) btn.disabled = true;
  };

  const handleImageFile = (file) => {
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast('That doesn\'t look like an image'); return; }
    addImageFilename = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      addImageDataUri = e.target.result;
      const img = $('#add-image-preview-img');
      img.src = addImageDataUri;
      $('#add-image-preview').hidden = false;
      $('#add-image-name').textContent = file.name + ' · ' + fmtSize(file.size);
      const go = $('#btn-add-image-go');
      if (go) go.disabled = false;
    };
    reader.readAsDataURL(file);
  };

  // Active mode for the Upload Image view's tabs. 'convert' is the
  // existing single-question extraction; 'similar' is the multi-question
  // generation that auto-populates a step-2 form after the same upload.
  let addImageMode = 'convert';
  const setAddImageMode = (mode) => {
    addImageMode = (mode === 'similar') ? 'similar' : 'convert';
    // Tab pill active state.
    $$('.stl-add-image__tab').forEach((t) => {
      const on = t.dataset.imageTab === addImageMode;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    // Blurb + primary button label reflect the mode.
    const blurb = $('#add-image-mode-blurb');
    if (blurb) {
      blurb.textContent = addImageMode === 'similar'
        ? 'Upload a question; AI analyzes it then drafts similar ones. Step 2 lets you confirm what AI detected before generating.'
        : 'Upload a screenshot or photo of a question. AI extracts the stem, choices, answer, and explanation; you\'ll review before saving.';
    }
    const go = $('#btn-add-image-go');
    if (go) {
      go.textContent = addImageMode === 'similar'
        ? 'Analyze with AI'
        : 'Convert with AI';
    }
    // Reset to step 1 (upload) when the tab is switched mid-flow.
    showAddImageStep('upload');
  };

  // Step switching inside the Upload Image view. Steps are tagged via
  // data-step in the markup. Hides the others, scrolls to top of the
  // panel to defeat any prior scroll offset.
  const showAddImageStep = (step) => {
    const modal = $('#add-modal');
    if (!modal) return;
    $$('.stl-add-image__step', modal).forEach((el) => {
      el.hidden = el.dataset.step !== step;
    });
    const panel = modal.querySelector('.stl-admin-modal__panel');
    if (panel) requestAnimationFrame(() => { panel.scrollTop = 0; });
  };

  // Primary action on the Upload Image step 1. Branches on the active
  // tab — Convert (single question) vs Similar (analyze + step 2 form).
  const handleImageGoClick = async () => {
    if (!addImageDataUri) return;
    if (addImageMode === 'similar') {
      await analyzeImageForSimilar();
    } else {
      await convertImageWithAI();
    }
  };

  const convertImageWithAI = async () => {
    if (!addImageDataUri) return;
    const btn = $('#btn-add-image-go');
    const status = $('#add-image-status');
    const statusText = $('#add-image-status-text');
    btn.disabled = true;
    status.hidden = false;
    statusText.textContent = 'Asking AI to extract the question…';
    try {
      const res = await fetch('/api/admin/convert-image', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: addImageDataUri }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) { toast('Sign in as admin first'); }
        else if (res.status === 503) { toast('Vision API not configured — set ANTHROPIC_API_KEY'); }
        else { toast(data.error || 'Conversion failed'); }
        status.hidden = true;
        btn.disabled = false;
        return;
      }
      // Reject if the extracted stem already exists in the bank.
      const dup = findDuplicateStem(data.stem || '');
      if (dup) {
        status.hidden = true;
        btn.disabled = false;
        toast('Duplicate of ' + dup.id + ' — already in the bank');
        return;
      }
      // Successful extraction → switch to the manual view pre-filled
      // with the AI's output. Admin reviews before saving.
      status.hidden = true;
      setAddView('manual');
      resetAddManualForm({
        stem: data.stem || '',
        choices: data.choices || ['','','',''],
        answer: data.answer != null ? data.answer : '',
        explanation: data.explanation || '',
        topic: data.topic || '',
        difficulty: data.difficulty || 580,
        state: 'needs-review',  // image-extracted questions default to needs-review
      });
      $('#add-state').value = 'needs-review';
      toast('Extracted — review then click Add question');
    } catch (e) {
      console.warn('image convert error', e);
      toast('Network error — try again');
      status.hidden = true;
      btn.disabled = false;
    }
  };

  // Generate-similar tab: upload → analyze (convert-image API) →
  // step 2 form auto-populated with detected topic + difficulty.
  // The user confirms / edits, then clicks Generate (which fires the
  // similar-from-image API).
  const analyzeImageForSimilar = async () => {
    if (!addImageDataUri) return;
    const btn = $('#btn-add-image-go');
    const status = $('#add-image-status');
    const statusText = $('#add-image-status-text');
    btn.disabled = true;
    status.hidden = false;
    statusText.textContent = 'Analyzing source — detecting topic and difficulty…';
    try {
      const res = await fetch('/api/admin/convert-image', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: addImageDataUri }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) toast('Sign in as admin first');
        else if (res.status === 503) toast('Vision API not configured — set ANTHROPIC_API_KEY');
        else toast(data.error || 'Analysis failed');
        status.hidden = true;
        btn.disabled = false;
        return;
      }
      // Pre-populate the step-2 form. resetAddSimilarForm() is already
      // called on modal open; we just patch the detected fields.
      const topicEl = $('#add-sim-topic');
      const diffEl  = $('#add-sim-source-difficulty');
      if (topicEl) topicEl.value = data.topic || '';
      if (diffEl)  diffEl.value  = data.difficulty != null ? data.difficulty : '';
      // Source thumb in step 2.
      const thumb = $('#add-sim-source-thumb');
      if (thumb) thumb.src = addImageDataUri;
      const meta = $('#add-sim-source-meta');
      if (meta) meta.textContent = (addImageFilename || 'image') +
        (data.topic ? ' · ' + data.topic : '') +
        (data.difficulty != null ? ' · diff ' + data.difficulty : '');
      // Also pre-fill the source image into the post-generate review thumb.
      const srcImg = $('#add-sim-source-img');
      if (srcImg) srcImg.src = addImageDataUri;
      status.hidden = true;
      btn.disabled = false;
      // Show step 2.
      showAddImageStep('similar-form');
      refreshSimilarDiffMode();
    } catch (e) {
      console.warn('analyze for similar error', e);
      toast('Network error — try again');
      status.hidden = true;
      btn.disabled = false;
    }
  };

  // --- JSON flow ---
  // Bulk import via a JSON file or pasted JSON. Supports a single
  // question object or an array of questions. Every field is honored
  // including the optional figure fields (svg / image / chart / table).
  // The template downloader provides a complete example admins (or AI
  // assistants) can format against.
  let addJsonParsed = [];
  let addJsonErrors = [];
  // Items the dedup filter removed from this paste/import. Reported
  // to the user in the preview pane (positive signal: "we noticed
  // these would be duplicates and skipped them") rather than as errors.
  let addJsonDedupSkipped = [];

  const JSON_TEMPLATE = [
    {
      id: 'q-custom-001',
      testType: 'SAT',
      section: 'math',
      topic: 'linear-equations',
      difficulty: 540,
      state: 'live',
      source: 'human-curated',
      reviewStatus: 'verified',
      createdAt: '2026-05-14',
      stem: 'Solve for x: \\frac{2x - 5}{3} = 5',
      choices: ['8', '10', '12', '14'],
      answer: 1,
      explanation: 'Multiply both sides by 3: 2x - 5 = 15. Add 5: 2x = 20. Divide by 2: x = 10.'
    },
    {
      id: 'q-custom-002',
      testType: 'SAT',
      section: 'reading-writing',
      topic: 'words-in-context',
      difficulty: 620,
      state: 'live',
      source: 'human-curated',
      reviewStatus: 'verified',
      createdAt: '2026-05-14',
      passage: 'Marine biologist Dr. Lena Ortiz studies coral reefs that have survived repeated bleaching events. While most colonies in the area perished after the 2019 heat wave, a small cluster off the Indonesian coast remained _____, showing little sign of damage even as surrounding reefs collapsed.',
      stem: 'Which choice completes the text with the most logical and precise word or phrase?',
      choices: ['unscathed', 'visible', 'volatile', 'submerged'],
      answer: 0,
      explanation: '"Unscathed" means undamaged or unharmed — fits the contrast set up by "while most colonies perished".'
    },
    {
      id: 'q-custom-003-with-svg',
      testType: 'SAT',
      section: 'math',
      topic: 'geometry-angles',
      difficulty: 680,
      state: 'live',
      source: 'human-curated',
      reviewStatus: 'verified',
      createdAt: '2026-05-14',
      stem: 'In the figure, lines ℓ and m are parallel. What is the value of x?',
      // OPTIONAL figure: inline SVG. Renders via the q.svg path in
      // renderFigure(). Uses currentColor for stroke so it inherits
      // the quiz canvas text color; mark variables with .stl-svg-var
      // for italic accent typography.
      svg: '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines cut by a transversal"><line x1="20" y1="80" x2="380" y2="80" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="180" x2="380" y2="180" stroke="currentColor" stroke-width="1.5"/><line x1="80" y1="40" x2="320" y2="220" stroke="currentColor" stroke-width="1.5"/><text x="10" y="84" font-size="14" fill="currentColor">ℓ</text><text x="10" y="184" font-size="14" fill="currentColor">m</text><text x="180" y="70" font-size="14" fill="currentColor">110°</text><text x="200" y="200" font-size="14" fill="currentColor" class="stl-svg-var">x</text><text x="216" y="200" font-size="14" fill="currentColor">°</text></svg>',
      choices: ['70', '90', '110', '180'],
      answer: 2,
      explanation: 'Corresponding angles formed by parallel lines and a transversal are equal. The angle marked 110° corresponds to x°, so x = 110.'
    },
    {
      id: 'q-custom-004-with-image',
      testType: 'SAT',
      section: 'math',
      topic: 'data-analysis',
      difficulty: 560,
      state: 'live',
      source: 'human-curated',
      reviewStatus: 'verified',
      createdAt: '2026-05-14',
      stem: 'Based on the photograph, which species shows the largest size difference between males and females?',
      // OPTIONAL figure: hosted image URL. Renders via q.image / q.imageAlt.
      image: 'https://example.com/path/to/figure.png',
      imageAlt: 'Comparative size chart of three fish species',
      choices: ['Species A', 'Species B', 'Species C', 'They are all similar'],
      answer: 1,
      explanation: 'The chart shows Species B males are roughly twice the length of females; A and C show smaller dimorphism.'
    },
    {
      id: 'q-custom-005-with-chart',
      testType: 'SAT',
      section: 'math',
      topic: 'data-tables',
      difficulty: 540,
      state: 'live',
      source: 'human-curated',
      reviewStatus: 'verified',
      createdAt: '2026-05-14',
      stem: 'The bar chart shows quarterly revenue (in millions). Which quarter saw the largest absolute increase from the previous quarter?',
      // OPTIONAL figure: Chart.js config object. Renders a canvas via
      // renderFigure() → buildChartConfig(). Use ANY Chart.js config
      // that the runtime version supports.
      chart: {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{ label: 'Revenue ($M)', data: [40, 52, 58, 78] }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      },
      choices: ['Q1→Q2', 'Q2→Q3', 'Q3→Q4', 'They are equal'],
      answer: 2,
      explanation: 'Q3→Q4: 78 - 58 = 20. Q1→Q2: 12. Q2→Q3: 6. Largest is Q3→Q4.'
    },
    {
      id: 'q-custom-006-with-table',
      testType: 'SAT',
      section: 'math',
      topic: 'statistics',
      difficulty: 600,
      state: 'live',
      source: 'human-curated',
      reviewStatus: 'verified',
      createdAt: '2026-05-14',
      stem: 'Based on the table, what is the median commute time (minutes)?',
      // OPTIONAL figure: structured table. Renders via q.table —
      // caption, headers, rows, optional totalsRow flag for the
      // last row to render as a summary.
      table: {
        caption: 'Survey of commute times by mode of transport',
        headers: ['Mode', 'Riders', 'Avg. minutes'],
        rows: [
          ['Walking', 14, 12],
          ['Cycling', 22, 18],
          ['Bus', 41, 28],
          ['Driving', 63, 24],
          ['All modes', 140, 22]
        ],
        totalsRow: true
      },
      choices: ['12', '18', '22', '28'],
      answer: 2,
      explanation: 'The "All modes" row shows the population median at 22 minutes (also computable by weighted aggregation of the individual modes).'
    },
    {
      id: 'q-custom-007-grid-in',
      testType: 'SAT',
      section: 'math',
      topic: 'quadratics',
      difficulty: 660,
      state: 'live',
      source: 'human-curated',
      reviewStatus: 'verified',
      createdAt: '2026-05-14',
      stem: 'If t > 0 and t² - 4 = 0, what is the value of t?',
      // GRID-IN (student-produced response): choices is null, answer
      // is a STRING. The quiz UI shows a free-text input. SAT-equivalent
      // forms like "1/2", "0.5", ".5" all normalize equivalently.
      choices: null,
      answer: '2',
      explanation: 't² = 4 gives t = ±2. The constraint t > 0 picks t = 2.'
    }
  ];

  const downloadJsonTemplate = () => {
    const blob = new Blob([JSON.stringify(JSON_TEMPLATE, null, 2)], { type: 'application/json' });
    downloadBlob(blob, 'studysignal-questions-template.json');
    toast('Template downloaded');
  };

  const validateJsonQuestion = (q) => {
    const errors = [];
    if (!q || typeof q !== 'object') return { ok: false, errors: ['not an object'] };
    if (!q.stem || typeof q.stem !== 'string') errors.push('stem required (string)');
    if (q.difficulty == null || !Number.isFinite(Number(q.difficulty))) errors.push('difficulty required (number)');
    const isGridIn = q.choices === null || q.choices === undefined;
    if (!isGridIn) {
      if (!Array.isArray(q.choices) || q.choices.length !== 4) errors.push('choices must be an array of exactly 4 strings (or null for grid-in)');
      const a = Number(q.answer);
      if (!Number.isInteger(a) || a < 0 || a > 3) errors.push('answer must be an integer 0-3 for multiple choice');
    } else {
      if (q.answer == null || (typeof q.answer !== 'string' && typeof q.answer !== 'number')) {
        errors.push('grid-in answer must be a string or number');
      }
    }
    if (errors.length) return { ok: false, errors };
    return { ok: true };
  };

  // --- upload-schema adapter ----------------------------------------
  // A second JSON shape we accept: a curated dump using the "upload"
  // schema (snake_case test_type/subject/topic, format MCQ/SPR,
  // choices as [{label, text}], LaTeX-delimited question/explanation,
  // and an optional chart_svg field). This mirrors the standalone
  // Python converter at /sessions/.../outputs/convert_questions.py so
  // pasting a raw dump in the admin produces the same bank entries as
  // running the script offline.
  //
  // Detection: if the first item carries `test_type` or `format` or has
  // `question` (instead of `stem`), we treat the whole payload as an
  // upload-schema array.
  const looksLikeUploadSchema = (item) => {
    if (!item || typeof item !== 'object') return false;
    return ('test_type' in item) || ('format' in item) ||
           (('question' in item) && !('stem' in item));
  };

  // Long-form College Board taxonomy → short kebab-case slugs we use
  // throughout the bank. Anything we don't recognize falls back to a
  // best-effort slugify of the long name. Keep in sync with
  // TOPIC_SLUG in web/tools/convert_upload_questions.py — the in-app
  // adapter and the offline script must produce identical slugs.
  const UPLOAD_TOPIC_SLUGS = {
    // --- Heart of Algebra (originals from 2026-05-22 batch) ---
    'Solve linear equations in one variable':                                       'solve-linear-equation',
    'Translate word problems into linear equations':                                 'linear-word-problem',
    'Slope from two points, a table, or an equation':                                'slope-from-points',
    'Write a linear equation given slope and a point, or two points':                'write-linear-equation',
    'Convert between slope-intercept, point-slope, and standard form':               'linear-equation-forms',
    'Parallel and perpendicular lines':                                              'parallel-perpendicular-lines',
    'Interpret slope and y-intercept in context':                                    'slope-intercept-context',
    'Graph a linear function; identify x- and y-intercepts':                         'linear-graph-intercepts',
    // --- Heart of Algebra (extension from 2026-05-25 batch) ---
    'Linear function modeling':                                                      'linear-function-modeling',
    'Evaluate and interpret function notation':                                      'function-notation',
    'Solve a system of two linear equations':                                        'solve-linear-system',
    'Number of solutions to a linear equation or system':                            'number-of-solutions',
    'Linear inequalities in one variable':                                           'linear-inequality-one-var',
    'Linear inequalities in two variables':                                          'linear-inequality-two-var',
    'Systems of linear inequalities and feasible regions':                           'linear-inequality-systems',
    'Linear function from a table of values':                                        'linear-from-table',
    'Translate word problems into systems of equations':                             'system-word-problem',
    // --- Passport to Advanced Math ---
    'Combine like terms, distribute, and factor out a GCF':                          'combine-distribute-gcf',
    'Polynomial arithmetic':                                                         'polynomial-arithmetic',
    'Factor quadratics':                                                             'factor-quadratics',
    'Factor special products':                                                       'factor-special-products',
    'Solve quadratic equations by factoring':                                        'solve-quadratic-by-factoring',
    'Solve quadratic equations with the quadratic formula':                          'quadratic-formula',
    'Solve quadratic equations by completing the square':                            'complete-the-square',
    'Discriminant':                                                                  'discriminant',
    'Graph quadratic functions and translate between forms':                         'quadratic-graphing',
    'Vertex form, vertex, axis of symmetry, and max/min':                            'quadratic-vertex-form',
    'Simplify and operate on rational expressions':                                  'rational-expressions',
    'Solve rational equations and identify excluded values':                         'rational-equations',
    'Solve radical equations and check for extraneous roots':                        'radical-equations',
    'Solve absolute-value equations and inequalities':                               'absolute-value-equations',
    'Systems of one linear and one nonlinear equation':                              'linear-nonlinear-systems',
    'Properties of exponents':                                                       'exponent-properties',
    'Exponential growth and decay models':                                           'exponential-growth-decay',
    // --- Problem Solving & Data Analysis ---
    'Ratios, rates, and proportional relationships':                                 'ratios-rates-proportions',
    'Percentages':                                                                   'percentages',
    'Unit conversion and derived units':                                             'unit-conversion',
    'One-variable data: mean, median, range, and spread':                            'one-variable-data',
    'Two-variable data: scatterplots and models':                                    'scatterplots-and-models',
    'Probability and conditional probability from tables':                           'probability-from-tables',
    'Margin of error and inference from sample statistics':                          'margin-of-error',
    'Evaluating statistical claims':                                                 'evaluating-statistical-claims',
    // --- Geometry & Trigonometry ---
    'Area and perimeter of plane figures':                                           'area-perimeter',
    'Volume of solids':                                                              'volume-of-solids',
    'Surface area & scale factor':                                                   'surface-area-scale-factor',
    'Lines and angles':                                                              'lines-and-angles',
    'Triangle properties':                                                           'triangle-properties',
    'Pythagorean & special right triangles':                                         'pythagorean-special-triangles',
    'Right triangle trigonometry':                                                   'right-triangle-trig',
    'Circles':                                                                       'circles',
  };
  const slugifyTopic = (raw) => {
    if (!raw) return '';
    if (UPLOAD_TOPIC_SLUGS[raw]) return UPLOAD_TOPIC_SLUGS[raw];
    return String(raw).toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40);
  };
  // Subject 'Math' / 'Reading & Writing' → section slug.
  const subjectToSection = (raw) => {
    if (!raw) return 'math';
    const s = String(raw).toLowerCase().trim();
    if (s === 'math') return 'math';
    if (s === 'reading & writing' || s === 'reading and writing' || s === 'reading-writing') return 'reading-writing';
    if (s === 'english')  return 'english';
    if (s === 'reading')  return 'reading';
    if (s === 'science')  return 'science';
    if (s === 'verbal')   return 'verbal';
    return s.replace(/[^a-z0-9]+/g, '-');
  };

  // Strip $...$ and $$...$$ LaTeX delimiters (the bank's math renderer
  // works directly on \frac{}/\sqrt{} without delimiters). Literal
  // escaped dollars (\$) become real $.
  const stripLatexDelims = (s) => {
    if (!s) return s;
    s = String(s);
    s = s.replace(/\$\$([\s\S]+?)\$\$/g, '$1');           // display math
    s = s.replace(/(^|[^\\])\$([^$\n]+?)\$/g, '$1$2');    // inline math (single line)
    s = s.replace(/\\\$/g, '$');                          // literal dollar
    return s;
  };
  // Translate the LaTeX commands the bank renderer doesn't know into
  // their unicode equivalents (\frac and \sqrt are renderer-native).
  //
  // This MUST stay in lockstep with the table in
  // web/tools/convert_upload_questions.py — the offline converter and
  // the in-app paste flow have to produce identical bank entries from
  // the same upload, or dedup hashes won't match across the two paths
  // and the same item will land twice.
  //
  // Two non-obvious things:
  //
  //   • Each command is matched with a (?![A-Za-z]) lookahead so a
  //     PREFIX command (\ge) never eats the tail of a LONGER one (\geq
  //     was being silently corrupted to ≥q by the old `.replace('\\ge')`
  //     literal substring — see decisions log).
  //
  //   • Order in the table matters as a belt: \geq is listed before
  //     \ge so even if the lookahead were dropped the longer rule still
  //     wins. The lookahead is the suspenders.
  const translateLatexCommands = (s) => {
    if (!s) return s;
    let out = String(s)
      .replace(/\\dfrac/g, '\\frac')
      .replace(/\\tfrac/g, '\\frac')
      // \text{...} unwraps to plain prose. The renderer treats the inner
      // letters as ordinary text.
      .replace(/\\text\{([^{}]*)\}/g, '$1')
      // ^\circ is always the degree symbol in SAT geometry. Collapse
      // BEFORE the boundary-aware pass so we get `30°`, not `30^°`.
      .replace(/\^\\circ(?![A-Za-z])/g, '°')
      .replace(/\^\{\\circ\}/g, '°');
    // \overline{...} runs AFTER the boundary-aware table below so a
    // source like `\overline{DE}\parallel\overline{BC}` first becomes
    // `\overline{DE}∥\overline{BC}` (the table maps \parallel to ∥
    // because the next char `\` is not a letter, satisfying the
    // (?![A-Za-z]) guard), and then collapses to `DE∥BC` when the
    // overline regex runs. If we stripped overline first we'd lose the
    // separator and \parallel would refuse to match because the next
    // char (`B`) is a letter.

    // Token table — longest-first. Each entry is matched with
    // \\<cmd>(?![A-Za-z]) so prefix commands don't bleed into longer
    // ones. New entries: add them to BOTH this table and the Python
    // sibling in convert_upload_questions.py.
    const PAIRS = [
      ['\\Rightarrow',      '⇒'],
      ['\\Leftarrow',       '⇐'],
      ['\\Leftrightarrow',  '⇔'],
      ['\\rightarrow',      '→'],
      ['\\leftarrow',       '←'],
      ['\\leftrightarrow',  '↔'],
      ['\\approx',          '≈'],
      ['\\ldots',           '...'],
      ['\\cdots',           '⋯'],
      ['\\infty',           '∞'],
      ['\\geq',             '≥'],   // before \ge
      ['\\leq',             '≤'],   // before \le
      ['\\neq',             '≠'],   // before \ne
      ['\\cdot',            '·'],
      ['\\times',           '×'],
      ['\\div',             '÷'],
      ['\\pm',              '±'],
      ['\\mp',              '∓'],
      ['\\ge',              '≥'],
      ['\\le',              '≤'],
      ['\\ne',              '≠'],
      ['\\to',              '→'],
      ['\\sim',             '∼'],
      ['\\circ',            '°'],
      // Greek letters seen in SAT geometry/trig sources.
      ['\\theta',           'θ'],
      ['\\alpha',           'α'],
      ['\\beta',            'β'],
      ['\\gamma',           'γ'],
      ['\\delta',           'δ'],
      ['\\Delta',           'Δ'],
      ['\\phi',             'φ'],
      ['\\omega',           'ω'],
      ['\\Omega',           'Ω'],
      ['\\mu',              'μ'],
      ['\\lambda',          'λ'],
      ['\\sigma',           'σ'],
      ['\\Sigma',           'Σ'],
      ['\\pi',              'π'],
      // Trig / function names — strip backslash; renderer treats them
      // as ordinary identifiers.
      ['\\sin',             'sin'],
      ['\\cos',             'cos'],
      ['\\tan',             'tan'],
      ['\\csc',             'csc'],
      ['\\sec',             'sec'],
      ['\\cot',             'cot'],
      ['\\log',             'log'],
      ['\\ln',              'ln'],
      ['\\exp',             'exp'],
      // Sizing modifiers — strip entirely. \left( and \right) carry
      // their literal brackets, so the parens still render.
      ['\\left',             ''],
      ['\\right',            ''],
      ['\\bigg',             ''],
      ['\\Bigg',             ''],
      ['\\big',              ''],
      ['\\Big',              ''],
      // Script lowercase l (used as a variable in geometry sources).
      ['\\ell',              'ℓ'],
      // \dots / \dotsc / \dotsb — synonyms of \ldots.
      ['\\dotsc',            '...'],
      ['\\dotsb',            '...'],
      ['\\dots',             '...'],
      // Geometry symbols.
      ['\\parallel',         '∥'],
      ['\\nparallel',        '∦'],
      ['\\perp',             '⊥'],
      ['\\angle',            '∠'],
      ['\\triangle',         '△'],
      ['\\mid',              '|'],
    ];
    for (let i = 0; i < PAIRS.length; i++) {
      const [cmd, sub] = PAIRS[i];
      // Escape the leading backslash for the regex, then forbid a
      // following letter so \ge doesn't slice into \geq.
      const re = new RegExp(cmd.replace(/\\/g, '\\\\') + '(?![A-Za-z])', 'g');
      out = out.replace(re, sub);
    }
    // Thin-space commands — punctuation, no letter-boundary hazard.
    out = out
      .replace(/\\,/g, ' ').replace(/\\;/g, ' ')
      .replace(/\\:/g, ' ').replace(/\\!/g, '');
    // Wide-space + escape commands. Bank rows imported through older
    // converters preserved these as literal text ("10\%", "a = 2,\ b
    // = 3"), so the renderer sees them at runtime. Order matters:
    //   • \quad / \qquad take a single space (4em / 2em is overkill
    //     in inline math; one space reads correctly in answer choices)
    //   • Backslash-space (\<space>) is LaTeX's manual thin space —
    //     replace with a single normal space
    //   • Escaped literal punctuation (\% \& \$ \# \_ \{ \}) — restore
    //     to its real character. \$ is already handled by
    //     stripLatexDelims; doing it again is a no-op.
    // The regex order is deliberate: \quad/\qquad first (so the word
    // boundary inside doesn't get caught by the literal-escape pass
    // below). Then \<space>. Then the punctuation escapes.
    out = out
      .replace(/\\qquad\b/g, '  ')
      .replace(/\\quad\b/g, ' ')
      .replace(/\\ /g, ' ')
      .replace(/\\%/g, '%')
      .replace(/\\&/g, '&')
      .replace(/\\\$/g, '$')
      .replace(/\\#/g, '#')
      .replace(/\\_/g, '_')
      .replace(/\\\{/g, '{')
      .replace(/\\\}/g, '}');
    // \overline{...} → inner content. Runs LAST so the geometry pass
    // above could see `\parallel\overline{...}` and substitute before
    // the overline boundary disappeared. See comment above.
    return out.replace(/\\overline\{([^{}]*)\}/g, '$1');
  };
  const stripSprHint = (s) => String(s || '').replace(
    /^\s*>\s*\*?Enter your answer.*?\*?\s*$/gim, ''
  );

  // Markdown table detection. Returns { table, cleanedStem } if a table
  // is found in `stem`, or { table: null, cleanedStem: stem } otherwise.
  // Recognized shape:
  //   | a | b | c |
  //   |---|---|---|
  //   | 1 | 2 | 3 |
  const MD_TABLE_RE = /((?:^[ \t]*\|.*\|[ \t]*\n)+)(^[ \t]*\|[ \t]*:?-+:?[ \t]*(?:\|[ \t]*:?-+:?[ \t]*)+\|?[ \t]*\n)((?:^[ \t]*\|.*\|[ \t]*(?:\n|$))+)/m;
  const splitMdRow = (line) => {
    let s = String(line).trim();
    if (s.startsWith('|')) s = s.slice(1);
    if (s.endsWith('|'))   s = s.slice(0, -1);
    return s.split('|').map((c) => c.trim());
  };
  const tryNum = (s) => {
    if (typeof s !== 'string') return s;
    const t = s.trim();
    if (!t) return t;
    if (/^-?\d+$/.test(t)) return parseInt(t, 10);
    if (/^-?\d+\.\d+$/.test(t)) return parseFloat(t);
    return s;
  };
  const looksLikeVarLabel = (c) => typeof c === 'string' && /^[A-Za-z](?:[_^].+)?$/.test(c.trim());
  const extractMarkdownTable = (stem) => {
    const src = String(stem || '');
    const m = src.match(MD_TABLE_RE);
    if (!m) return { table: null, cleanedStem: src };
    const clean = (c) => translateLatexCommands(stripLatexDelims(c)).trim();
    const headerLines = m[1].split('\n').filter((l) => l.trim());
    const bodyLines   = m[3].split('\n').filter((l) => l.trim());
    const headers = splitMdRow(headerLines[headerLines.length - 1]).map(clean);
    let rows = bodyLines.map((ln) => splitMdRow(ln).map(clean));
    const transposed = looksLikeVarLabel(headers[0]) &&
                       rows.every((r) => looksLikeVarLabel(r[0]));
    let table;
    if (transposed) {
      const allRows = [headers].concat(rows).map((r) => r.map(tryNum));
      table = { rows: allRows, firstColIsHeader: true };
    } else {
      rows = rows.map((r) => r.map(tryNum));
      table = { headers: headers, rows: rows };
    }
    const cleanedStem = (src.slice(0, m.index).replace(/\s+$/, '') +
                        '\n\n' +
                        src.slice(m.index + m[0].length).replace(/^\s+/, ''))
                        .replace(/\n{3,}/g, '\n\n').trim();
    return { table: table, cleanedStem: cleanedStem };
  };

  const convertUploadText = (s) => {
    if (s == null) return '';
    let out = stripSprHint(String(s));
    out = stripLatexDelims(out);
    out = translateLatexCommands(out);
    return out.replace(/\n{3,}/g, '\n\n').trim();
  };

  // --- Dedup -------------------------------------------------------
  // Aggressive stem normalization → hash. Two questions hash
  // identically iff they differ only in whitespace / case /
  // punctuation in BOTH the stem prose AND the attached table data.
  // This is the same algorithm as `stem_hash()` in the Python
  // converter (web/tools/convert_upload_questions.py) — the offline
  // script and the in-app paste flow must agree on what counts as a
  // duplicate or the two paths will produce different bank entries
  // from the same upload.
  //
  // Why include the table? The bank's `stem` is prose-only; markdown
  // tables get extracted into `q.table` during the adapter step. Two
  // upload-schema questions that share the same prose but ship
  // different table values are NOT duplicates — without the table in
  // the hash we'd skip the second one and silently lose content.
  //
  // We use a plain string-as-hash (no SHA1) so the function stays
  // sync and dependency-free; collision risk is negligible for the
  // size of paste/import payloads we handle.
  // Renamed from normalizeStem to normalizeStemHash because the file
  // already defines a different normalizeStem near line 870 (used by
  // findDuplicateStem and CSV import). That earlier one preserves
  // internal spaces; this one strips all non-alphanumerics for a
  // hash-friendly fingerprint. Two declarations under the same name
  // is a SyntaxError ("Identifier 'normalizeStem' has already been
  // declared") that nukes the entire IIFE and bricks the app.
  const normalizeStemHash = (stem) => {
    if (!stem) return '';
    return String(stem)
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^a-z0-9]/g, '');
  };
  const tableSignature = (table) => {
    if (!table || !table.rows || !table.rows.length) return '';
    const parts = [];
    if (Array.isArray(table.headers)) parts.push(table.headers.map(String).join('|'));
    for (const r of table.rows) parts.push((r || []).map(String).join('|'));
    return normalizeStemHash(parts.join('||'));
  };
  const dedupKey = (stem, table) => normalizeStemHash(stem) + '##' + tableSignature(table);
  // Build a Set of dedup-keys already in the loaded bank. Reads from
  // window.STL_QUESTIONS_ALL (the assembled bank, includes archived
  // questions) so re-importing a previously-archived dump still
  // dedups correctly.
  const buildBankStemIndex = () => {
    const all = (typeof window !== 'undefined' && window.STL_QUESTIONS_ALL) || [];
    const idx = new Set();
    for (let i = 0; i < all.length; i++) {
      const q = all[i];
      if (!q || !q.stem) continue;
      idx.add(dedupKey(q.stem, q.table));
    }
    return idx;
  };

  // Convert one upload-schema item to a bank-shaped object. The bank's
  // validator (validateJsonQuestion) still runs on the OUTPUT — invalid
  // adapted items are surfaced as adapter errors before that runs.
  const adaptUploadSchemaItem = (raw) => {
    if (!raw || typeof raw !== 'object') return { ok: false, error: 'not an object' };
    const fmt = String(raw.format || 'MCQ').toUpperCase();
    const rawStem = raw.question != null ? raw.question : raw.stem;
    if (!rawStem) return { ok: false, error: 'missing question/stem' };

    // First clean stem text, then look for a markdown table inside it.
    const cleanedFirst = convertUploadText(rawStem);
    const tableInfo = extractMarkdownTable(cleanedFirst);

    const out = {
      testType: raw.test_type || raw.testType || 'SAT',
      section: subjectToSection(raw.subject || raw.section),
      topic: raw.topic_slug || slugifyTopic(raw.topic),
      difficulty: Number(raw.difficulty),
      state: raw.state || 'live',
      source: raw.source || 'human-curated',
      reviewStatus: raw.reviewStatus || 'verified',
      createdAt: raw.createdAt || new Date().toISOString().slice(0, 10),
      sourceId: raw.id || raw.sourceId,
      stem: tableInfo.cleanedStem,
      explanation: convertUploadText(raw.explanation),
    };
    if (tableInfo.table) out.table = tableInfo.table;
    // chart_svg passes through to q.svg if present and non-empty. (Our
    // upload dumps so far have an empty string; future drops may not.)
    if (raw.chart_svg && String(raw.chart_svg).trim()) out.svg = String(raw.chart_svg);

    if (fmt === 'MCQ') {
      const choices = Array.isArray(raw.choices) ? raw.choices : [];
      // choices may be either [{label,text}] or [string]. Handle both.
      const texts = choices.map((c) => (
        c && typeof c === 'object' ? convertUploadText(c.text) : convertUploadText(c)
      ));
      const labels = choices.map((c, i) => (
        c && typeof c === 'object' && c.label ? c.label : String.fromCharCode(65 + i)
      ));
      const ansIdx = labels.indexOf(String(raw.answer));
      if (ansIdx < 0) return { ok: false, error: 'MCQ answer "' + raw.answer + '" not in labels [' + labels.join(',') + ']' };
      out.choices = texts;
      out.answer = ansIdx;
    } else if (fmt === 'SPR') {
      out.choices = null;
      out.answer = String(raw.answer);
    } else {
      return { ok: false, error: 'unknown format: ' + fmt };
    }
    return { ok: true, item: out };
  };

  const parseJsonInput = (text) => {
    let parsed;
    try { parsed = JSON.parse(text); }
    catch (e) {
      addJsonParsed = [];
      addJsonErrors = [{ idx: 0, errors: ['invalid JSON: ' + e.message] }];
      addJsonDedupSkipped = [];
      renderJsonPreview();
      return;
    }
    let arr = Array.isArray(parsed) ? parsed : [parsed];
    // Auto-adapt upload-schema payloads. If the first valid-looking
    // item is in upload format, we rewrite EVERY item — mixed-schema
    // payloads aren't supported (and we've never seen one).
    const adapterErrors = [];
    if (arr.length && looksLikeUploadSchema(arr[0])) {
      const adapted = [];
      arr.forEach((raw, idx) => {
        const r = adaptUploadSchemaItem(raw);
        if (r.ok) adapted.push(r.item);
        else adapterErrors.push({ idx, errors: ['upload-schema adapt: ' + r.error] });
      });
      arr = adapted;
    }
    // Dedup against existing bank + dedup within this paste/import.
    // Skipped items are surfaced to the user as a count in the preview
    // (not as errors — they're a legitimate "already imported" signal,
    // not a failure). Default-on: every paste/import goes through this.
    const bankIndex = buildBankStemIndex();
    const intraSeen = new Set();
    const dedupSkipped = [];
    arr = arr.filter((q, idx) => {
      if (!q || !q.stem) return true; // let validator complain
      const h = dedupKey(q.stem, q.table);
      if (bankIndex.has(h)) {
        dedupSkipped.push({ idx, reason: 'duplicate of existing bank entry', sourceId: q.sourceId });
        return false;
      }
      if (intraSeen.has(h)) {
        dedupSkipped.push({ idx, reason: 'duplicate within this import', sourceId: q.sourceId });
        return false;
      }
      intraSeen.add(h);
      return true;
    });
    addJsonParsed = [];
    addJsonErrors = adapterErrors.slice();
    addJsonDedupSkipped = dedupSkipped;
    arr.forEach((q, idx) => {
      const v = validateJsonQuestion(q);
      if (v.ok) {
        // Merge with safe defaults for fields the admin may omit.
        addJsonParsed.push({
          id: q.id || newAdminQuestionId(),
          testType: q.testType || 'SAT',
          section: q.section || 'math',
          topic: q.topic || '',
          difficulty: Number(q.difficulty),
          state: q.state || 'live',
          source: q.source || 'human-curated',
          uploader: q.uploader,
          reviewStatus: q.reviewStatus || 'verified',
          createdAt: q.createdAt || new Date().toISOString().slice(0, 10),
          stem: q.stem,
          passage: q.passage || undefined,
          choices: (q.choices === null || q.choices === undefined) ? null : q.choices.map(String),
          answer: (q.choices === null || q.choices === undefined) ? String(q.answer) : Number(q.answer),
          explanation: q.explanation || '',
          // Optional figure fields — pass through as-is. The renderer
          // (renderFigure in app.js) picks svg / image / chart / table
          // in that priority order.
          svg: q.svg,
          image: q.image,
          imageAlt: q.imageAlt,
          chart: q.chart,
          table: q.table,
          // Upload-schema items get sourceId stamped by adaptUploadSchemaItem
          // so we can roundtrip back to the original Q1/Q2 IDs.
          sourceId: q.sourceId,
          addOrigin: 'json-import',
        });
      } else {
        addJsonErrors.push({ idx, errors: v.errors });
      }
    });
    renderJsonPreview();
  };

  // Expose adapter helpers so the import-adapter test suite can exercise
  // them directly without spinning up a DOM. Mirrors the offline Python
  // converter at /sessions/.../outputs/convert_questions.py — both code
  // paths must produce identical bank entries from the same upload row.
  if (typeof window !== 'undefined') {
    window.STL_TEST_HOOKS = window.STL_TEST_HOOKS || {};
    window.STL_TEST_HOOKS.adaptUploadSchemaItem = adaptUploadSchemaItem;
    window.STL_TEST_HOOKS.extractMarkdownTable = extractMarkdownTable;
    window.STL_TEST_HOOKS.stripLatexDelims = stripLatexDelims;
    window.STL_TEST_HOOKS.translateLatexCommands = translateLatexCommands;
    window.STL_TEST_HOOKS.looksLikeUploadSchema = looksLikeUploadSchema;
    window.STL_TEST_HOOKS.slugifyTopic = slugifyTopic;
    window.STL_TEST_HOOKS.subjectToSection = subjectToSection;
    window.STL_TEST_HOOKS.normalizeStem = normalizeStemHash;
    window.STL_TEST_HOOKS.tableSignature = tableSignature;
    window.STL_TEST_HOOKS.dedupKey = dedupKey;
    window.STL_TEST_HOOKS.buildBankStemIndex = buildBankStemIndex;
    window.STL_TEST_HOOKS.UPLOAD_TOPIC_SLUGS = UPLOAD_TOPIC_SLUGS;
  }

  const renderJsonPreview = () => {
    const preview = $('#add-json-preview');
    if (preview) preview.hidden = false;
    $('#add-json-valid-count').textContent = String(addJsonParsed.length);
    $('#add-json-invalid-count').textContent = String(addJsonErrors.length);
    const errEl = $('#add-json-errors');
    if (errEl) {
      // Build a combined message: error entries (red) + skipped
      // duplicates (info). Both are useful context but rendered
      // distinctly so an import with only dupes doesn't look broken.
      const errParts = addJsonErrors.length === 0
        ? []
        : addJsonErrors.map((e) =>
            '<p class="stl-hint stl-add-json__error">Entry #' + (e.idx + 1) + ': ' + escapeHtml(e.errors.join('; ')) + '</p>'
          );
      const dupeCount = (addJsonDedupSkipped || []).length;
      if (dupeCount > 0) {
        errParts.push(
          '<p class="stl-hint">Skipped ' + dupeCount + ' duplicate' +
          (dupeCount === 1 ? '' : 's') + ' (already present in the bank or repeated within this import).</p>'
        );
      }
      if (errParts.length === 0) {
        errEl.innerHTML = '<p class="stl-hint">All parsed entries are valid.</p>';
      } else {
        errEl.innerHTML = errParts.join('');
      }
    }
    const confirm = $('#btn-add-json-confirm');
    if (confirm) confirm.disabled = addJsonParsed.length === 0;
  };

  const resetAddJsonForm = () => {
    addJsonParsed = [];
    addJsonErrors = [];
    addJsonDedupSkipped = [];
    const fileInput = $('#add-json-file'); if (fileInput) fileInput.value = '';
    const paste = $('#add-json-paste'); if (paste) paste.value = '';
    const preview = $('#add-json-preview'); if (preview) preview.hidden = true;
    const confirm = $('#btn-add-json-confirm'); if (confirm) confirm.disabled = true;
  };

  const handleJsonFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const paste = $('#add-json-paste');
      if (paste) paste.value = String(text);
      parseJsonInput(String(text));
    };
    reader.readAsText(file);
  };

  // --- CSV flow ---
  // test_type and subject default to 'SAT' / 'math' when omitted, so
  // legacy templates without those columns still parse cleanly into
  // the original SAT-math pool. New templates should fill them.
  const CSV_TEMPLATE_HEADERS = [
    'test_type', 'subject',
    'topic', 'difficulty', 'stem',
    'choice_a', 'choice_b', 'choice_c', 'choice_d',
    'answer', 'explanation', 'state',
  ];
  const CSV_TEMPLATE_EXAMPLE = [
    'SAT', 'math',
    'word-problem', '580',
    'A train leaves at 9 AM going 60 mph. Another leaves at the same time from 360 miles away going 80 mph toward it. When do they meet?',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1',
    'Combined speed 140 mph. 360 / 140 ≈ 2.57 hours after 9 AM ≈ 11:34 AM (closest answer 11:30 AM).',
    'live',
  ];

  // Tiny RFC-4180-ish CSV parser. Handles quoted fields with commas
  // and escaped quotes ("" → "). Good enough for our admin use.
  const parseCSV = (text) => {
    const rows = [];
    let row = []; let field = ''; let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i], n = text[i + 1];
      if (inQuotes) {
        if (c === '"' && n === '"') { field += '"'; i++; continue; }
        if (c === '"') { inQuotes = false; continue; }
        field += c;
      } else {
        if (c === '"') { inQuotes = true; continue; }
        if (c === ',') { row.push(field); field = ''; continue; }
        if (c === '\r') continue;
        if (c === '\n') { row.push(field); field = ''; rows.push(row); row = []; continue; }
        field += c;
      }
    }
    if (field || row.length) { row.push(field); rows.push(row); }
    // Drop blank trailing rows.
    while (rows.length && rows[rows.length - 1].every((v) => !v)) rows.pop();
    return rows;
  };

  let addCsvParsed = [];   // [{ row, errors, question }]
  const resetAddCsvForm = () => {
    addCsvParsed = [];
    $('#add-csv-file').value = '';
    $('#add-csv-preview').hidden = true;
    $('#btn-add-csv-confirm').disabled = true;
  };

  const validateCsvRow = (row, headers, seenStems) => {
    const errors = [];
    const map = {};
    headers.forEach((h, i) => { map[h] = (row[i] || '').trim(); });

    if (!map.stem)  errors.push('missing stem');
    if (!map.topic) errors.push('missing topic');

    if (map.stem) {
      const dup = findDuplicateStem(map.stem);
      if (dup) errors.push('duplicate of ' + dup.id);
      const norm = normalizeStem(map.stem);
      if (seenStems && seenStems.has(norm)) {
        errors.push('duplicate of an earlier row in this CSV');
      } else if (seenStems) {
        seenStems.add(norm);
      }
    }
    // Test + subject — both optional, default to SAT/math for legacy
    // CSVs. When the test is named, validate difficulty against THAT
    // test's range (so an ACT 1-36 row doesn't pass with 580).
    const csvTestType = (map.test_type || 'SAT').trim().toUpperCase();
    const csvCfg = TEST_TYPES[csvTestType];
    if (!csvCfg) errors.push('test_type must be one of ' + TEST_TYPE_ORDER.join('/'));
    const csvSubject = ((map.subject || 'math').trim().toLowerCase()).replace(/\s+/g, '-');
    if (csvCfg) {
      const csvSubjects = (csvCfg.subjects && csvCfg.subjects.length) ? csvCfg.subjects : ['math'];
      if (!csvSubjects.includes(csvSubject)) {
        errors.push('subject must be one of ' + csvSubjects.join('/') + ' for ' + csvTestType);
      }
    }
    const diff = Number(map.difficulty);
    const dMin = csvCfg ? csvCfg.scoreMin : 200;
    const dMax = csvCfg ? csvCfg.scoreMax : 800;
    if (!Number.isFinite(diff) || diff < dMin || diff > dMax) {
      errors.push('difficulty must be ' + dMin + '-' + dMax + (csvCfg ? ' for ' + csvTestType : ''));
    }

    const choices = ['choice_a','choice_b','choice_c','choice_d']
      .map((k) => map[k] || '').filter((v) => v !== '');
    const isGridIn = choices.length === 0;
    let answer;
    if (isGridIn) {
      answer = map.answer;
      if (!answer) errors.push('grid-in needs an answer string');
    } else {
      answer = Number(map.answer);
      if (!Number.isFinite(answer) || answer < 0 || answer >= choices.length) {
        errors.push('answer must be a valid index into choices');
      }
    }

    const state = (map.state || 'live').trim();
    if (!QUESTION_STATES.includes(state)) errors.push('state must be one of ' + QUESTION_STATES.join('/'));

    if (errors.length) return { row, errors, question: null };

    const me = (window.STL_AUTH && window.STL_AUTH.getCurrentUser && window.STL_AUTH.getCurrentUser()) || null;
    const uploader = me ? me.email : 'unknown@studysignal.ai';

    return {
      row, errors: [], question: {
        id: newAdminQuestionId(),
        testType: csvTestType,
        section: csvSubject,
        topic: map.topic,
        difficulty: diff,
        stem: map.stem,
        choices: isGridIn ? null : choices,
        answer,
        explanation: map.explanation || '',
        state,
        source: 'human-curated',
        uploader,
        reviewStatus: state === 'live' ? 'verified' : 'unreviewed',
        createdAt: new Date().toISOString().slice(0, 10),
        addOrigin: 'csv',
      }
    };
  };

  const handleCsvFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = parseCSV(text);
      if (rows.length < 2) { toast('CSV needs a header row + at least one data row'); return; }
      const headers = rows[0].map((h) => (h || '').trim().toLowerCase());
      const seenStems = new Set();
      addCsvParsed = rows.slice(1).map((r) => validateCsvRow(r, headers, seenStems));
      const ok    = addCsvParsed.filter((p) => !p.errors.length).length;
      const bad   = addCsvParsed.filter((p) =>  p.errors.length).length;

      // Render preview table
      $('#add-csv-row-count').textContent = String(ok);
      $('#add-csv-error-count').textContent = String(bad);
      $('#add-csv-thead').innerHTML = '<tr>' + headers.map((h) =>
        '<th>' + escapeHtml(h) + '</th>'
      ).join('') + '<th>status</th></tr>';
      $('#add-csv-tbody').innerHTML = addCsvParsed.map((p) => {
        const tds = headers.map((_, i) => '<td>' + escapeHtml((p.row[i] || '').slice(0, 60)) + '</td>').join('');
        const status = p.errors.length
          ? '<td title="' + escapeHtml(p.errors.join(', ')) + '">⚠ ' + escapeHtml(p.errors.join('; ')) + '</td>'
          : '<td>✓ ok</td>';
        return '<tr class="' + (p.errors.length ? 'is-error' : '') + '">' + tds + status + '</tr>';
      }).join('');
      $('#add-csv-preview').hidden = false;
      $('#btn-add-csv-confirm').disabled = ok === 0;
    };
    reader.readAsText(file);
  };

  // CSV template download
  const downloadCsvTemplate = () => {
    const header = CSV_TEMPLATE_HEADERS.join(',');
    const example = CSV_TEMPLATE_EXAMPLE.map((v) => {
      // Quote any field containing a comma, quote, or newline.
      if (/[",\n]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
      return v;
    }).join(',');
    const csv = header + '\n' + example + '\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    downloadBlob(blob, 'studysignal-questions-template.csv');
    toast('Template downloaded');
  };

  // --- generate-with-AI flow ---
  // Holds the most recent batch returned from /api/admin/generate-questions.
  // Each entry: { question, selected, dup }. We build admin-quality
  // bank rows from these on save.
  let addGenBatch = [];

  // Populate Generate's topic dropdown narrowed to topics that exist
  // in the chosen (test, subject) pair. Used both at form reset and
  // whenever the test/subject selectors change.
  const populateGenerateTopicDropdown = (testId, subjectId) => {
    const sel = $('#add-gen-topic');
    if (!sel) return;
    const topics = Array.from(new Set(
      (window.STL_QUESTIONS_ALL || [])
        .filter((q) => {
          if (testId && (q.testType || 'SAT') !== testId) return false;
          if (subjectId && (q.section || 'math') !== subjectId) return false;
          return true;
        })
        .map((q) => q.topic)
        .filter(Boolean)
    )).sort();
    sel.innerHTML = '<option value="">All topics</option>' +
      topics.map((t) => '<option value="' + escapeHtml(t) + '">' + escapeHtml(t) + '</option>').join('');
  };

  const resetAddGenerateForm = () => {
    addGenBatch = [];
    const form = $('#add-generate-form');
    if (!form) return;
    // Test + Subject for the batch — defaults to user's currently
    // selected test + first declared subject.
    const defaultTest = (typeof loadSelectedTest === 'function' ? loadSelectedTest() : 'SAT');
    populateAddTestDropdown('#add-gen-test', defaultTest);
    const defaultSubject = (subjectsForTest(defaultTest)[0] || { id: 'math' }).id;
    populateAddSubjectDropdown('#add-gen-subject', defaultTest, defaultSubject);
    populateGenerateTopicDropdown(defaultTest, defaultSubject);
    applyTestScaleToGenerateForm(defaultTest);
    $('#add-gen-count').value = 5;
    $('#add-gen-state').value = 'needs-review';
    $('#add-gen-notes').value = '';
    $('#add-gen-topic').value = '';
    // Default checkbox state: only "multiple-choice" checked.
    $$('#add-gen-types input[type="checkbox"]').forEach((cb) => {
      cb.checked = cb.value === 'multiple-choice';
    });
    $('#add-gen-status').hidden = true;
    $('#add-gen-preview').hidden = true;
    form.hidden = false;
    const goBtn = $('#btn-add-gen-go');
    if (goBtn) goBtn.disabled = false;
    const saveBtn = $('#btn-add-gen-save');
    if (saveBtn) saveBtn.disabled = true;
  };

  const renderGenerateBatch = () => {
    const list = $('#add-gen-list');
    if (!list) return;
    // Header context — the test + subject these drafts will save under.
    const batchTest = ($('#add-gen-test') && $('#add-gen-test').value) || 'SAT';
    const batchSubject = ($('#add-gen-subject') && $('#add-gen-subject').value) || 'math';
    const batchSubjectLabel = subjectName(batchSubject);
    list.innerHTML = addGenBatch.map((entry, idx) => {
      const q = entry.question;
      const isGridIn = !Array.isArray(q.choices) || q.choices.length === 0;
      // Defensive cap: AI/server validation rejects ≠4-choice questions,
      // but if a draft slips through with 5+ entries we still only
      // render the first 4 in the preview.
      const cappedChoices = Array.isArray(q.choices) ? q.choices.slice(0, MAX_CHOICES) : [];
      const choices = isGridIn
        ? '<div class="stl-add-gen__item-choice is-correct">Grid-in answer: ' + escapeHtml(String(q.answer)) + '</div>'
        : cappedChoices.map((c, i) =>
            '<div class="stl-add-gen__item-choice' + (i === Number(q.answer) ? ' is-correct' : '') + '">'
              + String.fromCharCode(65 + i) + '. ' + escapeHtml(c) + (i === Number(q.answer) ? ' ✓' : '')
            + '</div>'
          ).join('');
      const dupFlag = entry.dup
        ? '<span class="stl-add-gen__item-flag">Duplicate of ' + escapeHtml(entry.dup.id) + '</span>'
        : '';
      return (
        '<div class="stl-add-gen__item' + (entry.selected ? '' : ' is-unchecked') + (entry.dup ? ' is-duplicate' : '') + '" data-idx="' + idx + '">'
          + '<label class="stl-add-gen__item-check">'
            + '<input type="checkbox" data-gen-idx="' + idx + '"' + (entry.selected ? ' checked' : '') + ' />'
          + '</label>'
          + '<div>'
            + '<div class="stl-add-gen__item-meta">'
              + '<span><strong>' + escapeHtml(batchTest) + '</strong> · ' + escapeHtml(batchSubjectLabel) + '</span>'
              + '<span><strong>Topic:</strong> ' + escapeHtml(q.topic || '—') + '</span>'
              + '<span><strong>Difficulty:</strong> ' + escapeHtml(String(q.difficulty)) + '</span>'
              + '<span><strong>Type:</strong> ' + (isGridIn ? 'Grid-in' : 'Multiple choice') + '</span>'
            + '</div>'
            + '<p class="stl-add-gen__item-stem">' + escapeHtml(q.stem) + '</p>'
            + '<div class="stl-add-gen__item-choices">' + choices + '</div>'
            + (q.explanation ? '<p class="stl-add-gen__item-explain">' + escapeHtml(q.explanation) + '</p>' : '')
            + dupFlag
          + '</div>'
        + '</div>'
      );
    }).join('');

    $('#add-gen-preview-count').textContent = addGenBatch.length;
    const selectedCount = addGenBatch.filter((e) => e.selected).length;
    const saveBtn = $('#btn-add-gen-save');
    if (saveBtn) {
      saveBtn.disabled = selectedCount === 0;
      saveBtn.textContent = selectedCount === 0
        ? 'Save selected'
        : 'Save ' + selectedCount + ' question' + (selectedCount === 1 ? '' : 's');
    }
  };

  const submitGenerateForm = async () => {
    const goBtn = $('#btn-add-gen-go');
    const status = $('#add-gen-status');
    const statusText = $('#add-gen-status-text');
    const form = $('#add-generate-form');

    const count = Number($('#add-gen-count').value);
    if (!Number.isFinite(count) || count < 1 || count > 20) {
      toast('Count must be 1–20'); return;
    }
    const testType = ($('#add-gen-test') && $('#add-gen-test').value) || 'SAT';
    const subject  = ($('#add-gen-subject') && $('#add-gen-subject').value) || 'math';
    const cfg = TEST_TYPES[testType] || TEST_TYPES.SAT;
    let dmin = Number($('#add-gen-diff-min').value);
    let dmax = Number($('#add-gen-diff-max').value);
    if (!Number.isFinite(dmin) || !Number.isFinite(dmax) ||
        dmin < cfg.scoreMin || dmax > cfg.scoreMax) {
      toast('Difficulty must be ' + cfg.scoreMin + '–' + cfg.scoreMax); return;
    }
    if (dmin > dmax) [dmin, dmax] = [dmax, dmin];

    const types = $$('#add-gen-types input[type="checkbox"]:checked').map((cb) => cb.value);
    const topic = $('#add-gen-topic').value;
    const topics = topic ? [topic] : 'all';
    const notes = $('#add-gen-notes').value.trim();

    goBtn.disabled = true;
    status.hidden = false;
    statusText.textContent = 'Asking AI to draft ' + count + ' ' + cfg.name + ' ' + subjectName(subject) + ' question' + (count === 1 ? '' : 's') + '…';

    try {
      const res = await fetch('/api/admin/generate-questions', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          count,
          testType,
          subject,
          difficultyMin: dmin,
          difficultyMax: dmax,
          topics,
          types: types.length ? types : 'all',
          notes,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) toast('Sign in as admin first');
        else if (res.status === 403) toast('Admin only');
        else if (res.status === 503) toast('AI not configured — set ANTHROPIC_API_KEY');
        else toast(data.error || 'Generation failed');
        status.hidden = true;
        goBtn.disabled = false;
        return;
      }

      const drafts = Array.isArray(data.questions) ? data.questions : [];
      if (drafts.length === 0) {
        toast('AI returned no usable questions — try different criteria');
        status.hidden = true;
        goBtn.disabled = false;
        return;
      }

      // Tag duplicates against the existing bank so the admin sees them
      // before saving. Default-deselect duplicates.
      addGenBatch = drafts.map((q) => {
        const dup = findDuplicateStem(q.stem);
        return { question: q, selected: !dup, dup };
      });

      status.hidden = true;
      goBtn.disabled = false;
      form.hidden = true;
      $('#add-gen-preview').hidden = false;
      $('#add-gen-preview-skipped').textContent = data.skipped || 0;
      renderGenerateBatch();
      const dupCount = addGenBatch.filter((e) => e.dup).length;
      if (dupCount) toast(dupCount + ' duplicate' + (dupCount === 1 ? '' : 's') + ' auto-deselected');
    } catch (e) {
      console.warn('generate error', e);
      toast('Network error — try again');
      status.hidden = true;
      goBtn.disabled = false;
    }
  };

  const saveGenerateBatch = () => {
    const defaultState = $('#add-gen-state').value || 'needs-review';
    // Tag the whole batch with the test + subject the admin chose at
    // generate time. The AI-side response carries q.testType / q.section
    // when the server echoes them back, but we override with the form's
    // values defensively — admin authority over routing.
    const batchTestType = ($('#add-gen-test') && $('#add-gen-test').value) || 'SAT';
    const batchSubject  = ($('#add-gen-subject') && $('#add-gen-subject').value) || 'math';
    const me = (window.STL_AUTH && window.STL_AUTH.getCurrentUser && window.STL_AUTH.getCurrentUser()) || null;
    const uploader = me ? me.email : 'unknown@studysignal.ai';

    const toSave = addGenBatch
      .filter((e) => e.selected && !e.dup)  // skip duplicates even if selected
      .map((e) => {
        const q = e.question;
        return {
          id: newAdminQuestionId(),
          testType: batchTestType,
          section: batchSubject,
          topic: q.topic,
          difficulty: q.difficulty,
          stem: q.stem,
          choices: Array.isArray(q.choices) ? q.choices : null,
          answer: q.answer,
          explanation: q.explanation || '',
          state: defaultState,
          source: 'ai-generated',
          uploader,
          reviewStatus: defaultState === 'live' ? 'verified' : 'unreviewed',
          createdAt: new Date().toISOString().slice(0, 10),
          addOrigin: 'ai-generate',
        };
      });

    if (toSave.length === 0) { toast('Nothing selected to save'); return; }

    addAdminQuestions(toSave);
    toast('Added ' + toSave.length + ' question' + (toSave.length === 1 ? '' : 's'));
    closeAddModal();
  };

  // --- similar-from-image flow ---
  // Source-image state: same shape as the convert-image flow, plus the
  // generated batch (selected/dup metadata). Both reset on modal open.
  let addSimImageDataUri = null;
  let addSimImageFilename = null;
  let addSimBatch = [];   // each entry: { question, selected, dup }

  const resetAddSimilarForm = () => {
    // Source image now lives in addImage* (shared step 1 of the
    // Upload Image view). This reset only clears step 2 form state
    // and the batch — the image and its preview belong to the parent.
    addSimImageDataUri = null;
    addSimImageFilename = null;
    addSimBatch = [];
    const status = $('#add-sim-status'); if (status) status.hidden = true;
    // Defaults — current selected test + first subject, count=5, state=live
    // (because admin reviews inline before saving), difficulty mode=match.
    const defaultTest = (typeof loadSelectedTest === 'function' ? loadSelectedTest() : 'SAT');
    populateAddTestDropdown('#add-sim-test', defaultTest);
    const defaultSubject = (subjectsForTest(defaultTest)[0] || { id: 'math' }).id;
    populateAddSubjectDropdown('#add-sim-subject', defaultTest, defaultSubject);
    applyTestScaleToSimilarForm(defaultTest);
    $('#add-sim-count').value = 5;
    $('#add-sim-state').value = 'live';
    $('#add-sim-notes').value = '';
    // Reset difficulty radios + hide custom range.
    const radios = $$('#add-sim-diff-mode input[type="radio"]');
    radios.forEach((r) => { r.checked = r.value === 'match'; });
    refreshSimilarDiffMode();
    // Button states.
    const goBtn = $('#btn-add-sim-go'); if (goBtn) goBtn.disabled = true;
    const saveBtn = $('#btn-add-sim-save'); if (saveBtn) saveBtn.disabled = true;
  };

  const refreshSimilarDiffMode = () => {
    const checked = $('#add-sim-diff-mode input[type="radio"]:checked');
    const mode = checked ? checked.value : 'match';
    const custom = $('#add-sim-diff-custom');
    if (custom) custom.hidden = (mode !== 'custom');
    const hint = $('#add-sim-diff-hint');
    if (hint) {
      hint.textContent = ({
        match:  '"Match" reuses the source\'s exact difficulty number.',
        band:   '"Band" varies within the source\'s tier (e.g., Hard 610–700 on SAT).',
        custom: 'Set the exact min/max scores the AI should sample from.',
      })[mode] || '';
    }
  };

  // Mirror the test-scale tweak the generate flow does for SAT vs ACT
  // vs ISEE etc. so the min/max inputs respect the test's score range.
  const applyTestScaleToSimilarForm = (testId) => {
    const cfg = TEST_TYPES[testId] || TEST_TYPES.SAT;
    const min = $('#add-sim-diff-min');
    const max = $('#add-sim-diff-max');
    if (min) { min.min = cfg.scoreMin; min.max = cfg.scoreMax; min.step = cfg.scoreStep; min.value = cfg.tiers ? cfg.tiers.medium : cfg.scoreDefault; }
    if (max) { max.min = cfg.scoreMin; max.max = cfg.scoreMax; max.step = cfg.scoreStep; max.value = cfg.tiers ? cfg.tiers.hard : cfg.scoreMax; }
  };

  const handleSimilarImageFile = (file) => {
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast('That doesn\'t look like an image'); return; }
    addSimImageFilename = file.name;
    const reader = new FileReader();
    reader.onload = (e) => {
      addSimImageDataUri = e.target.result;
      const img = $('#add-similar-preview-img');
      img.src = addSimImageDataUri;
      $('#add-similar-preview-img-wrap').hidden = false;
      $('#add-similar-image-name').textContent = file.name + ' · ' + fmtSize(file.size);
      // Also pre-render the source image into the post-generate preview
      // so the admin can compare drafts against the original.
      const previewImg = $('#add-sim-source-img');
      if (previewImg) previewImg.src = addSimImageDataUri;
      $('#btn-add-sim-go').disabled = false;
    };
    reader.readAsDataURL(file);
  };

  const clearSimilarImage = () => {
    addSimImageDataUri = null;
    addSimImageFilename = null;
    const fileInput = $('#add-similar-file'); if (fileInput) fileInput.value = '';
    $('#add-similar-preview-img-wrap').hidden = true;
    $('#btn-add-sim-go').disabled = true;
  };

  const renderSimilarBatch = () => {
    const list = $('#add-sim-list');
    if (!list) return;
    const batchTest = ($('#add-sim-test') && $('#add-sim-test').value) || 'SAT';
    const batchSubject = ($('#add-sim-subject') && $('#add-sim-subject').value) || 'math';
    const batchSubjectLabel = subjectName(batchSubject);
    list.innerHTML = addSimBatch.map((entry, idx) => {
      const q = entry.question;
      const isGridIn = !Array.isArray(q.choices) || q.choices.length === 0;
      const cappedChoices = Array.isArray(q.choices) ? q.choices.slice(0, MAX_CHOICES) : [];
      const choices = isGridIn
        ? '<div class="stl-add-gen__item-choice is-correct">Grid-in answer: ' + escapeHtml(String(q.answer)) + '</div>'
        : cappedChoices.map((c, i) =>
            '<div class="stl-add-gen__item-choice' + (i === Number(q.answer) ? ' is-correct' : '') + '">'
              + String.fromCharCode(65 + i) + '. ' + escapeHtml(c) + (i === Number(q.answer) ? ' ✓' : '')
            + '</div>'
          ).join('');
      const dupFlag = entry.dup
        ? '<span class="stl-add-gen__item-flag">Duplicate of ' + escapeHtml(entry.dup.id) + '</span>'
        : '';
      return (
        '<div class="stl-add-gen__item' + (entry.selected ? '' : ' is-unchecked') + (entry.dup ? ' is-duplicate' : '') + '" data-idx="' + idx + '">'
          + '<label class="stl-add-gen__item-check">'
            + '<input type="checkbox" data-sim-idx="' + idx + '"' + (entry.selected ? ' checked' : '') + ' />'
          + '</label>'
          + '<div>'
            + '<div class="stl-add-gen__item-meta">'
              + '<span><strong>' + escapeHtml(batchTest) + '</strong> · ' + escapeHtml(batchSubjectLabel) + '</span>'
              + '<span><strong>Topic:</strong> ' + escapeHtml(q.topic || '—') + '</span>'
              + '<span><strong>Difficulty:</strong> ' + escapeHtml(String(q.difficulty)) + '</span>'
              + '<span><strong>Type:</strong> ' + (isGridIn ? 'Grid-in' : 'Multiple choice') + '</span>'
            + '</div>'
            + '<p class="stl-add-gen__item-stem">' + escapeHtml(q.stem) + '</p>'
            + '<div class="stl-add-gen__item-choices">' + choices + '</div>'
            + (q.explanation ? '<p class="stl-add-gen__item-explain">' + escapeHtml(q.explanation) + '</p>' : '')
            + dupFlag
          + '</div>'
        + '</div>'
      );
    }).join('');
    $('#add-sim-preview-count').textContent = addSimBatch.length;
    const selectedCount = addSimBatch.filter((e) => e.selected).length;
    const saveBtn = $('#btn-add-sim-save');
    if (saveBtn) {
      saveBtn.disabled = selectedCount === 0;
      saveBtn.textContent = selectedCount === 0
        ? 'Save selected'
        : 'Save ' + selectedCount + ' question' + (selectedCount === 1 ? '' : 's');
    }
  };

  const submitSimilarForm = async () => {
    // The source image lives on the shared step-1 state (addImageDataUri)
    // since the upload happens inside the same Upload Image view.
    if (!addImageDataUri) { toast('Upload a source-question image first'); return; }
    const goBtn = $('#btn-add-sim-go');
    const status = $('#add-sim-status');
    const statusText = $('#add-sim-status-text');
    const form = $('#add-similar-form');

    const count = Number($('#add-sim-count').value);
    if (!Number.isFinite(count) || count < 1 || count > 20) {
      toast('Count must be 1–20'); return;
    }
    const testType = ($('#add-sim-test') && $('#add-sim-test').value) || 'SAT';
    const subject  = ($('#add-sim-subject') && $('#add-sim-subject').value) || 'math';
    const cfg = TEST_TYPES[testType] || TEST_TYPES.SAT;

    const diffModeEl = $('#add-sim-diff-mode input[type="radio"]:checked');
    const diffMode = diffModeEl ? diffModeEl.value : 'match';
    let difficultyMin = null, difficultyMax = null;
    if (diffMode === 'custom') {
      difficultyMin = Number($('#add-sim-diff-min').value);
      difficultyMax = Number($('#add-sim-diff-max').value);
      if (!Number.isFinite(difficultyMin) || !Number.isFinite(difficultyMax) ||
          difficultyMin < cfg.scoreMin || difficultyMax > cfg.scoreMax) {
        toast('Difficulty must be ' + cfg.scoreMin + '–' + cfg.scoreMax); return;
      }
      if (difficultyMin > difficultyMax) [difficultyMin, difficultyMax] = [difficultyMax, difficultyMin];
    }
    const notes = $('#add-sim-notes').value.trim();

    goBtn.disabled = true;
    status.hidden = false;
    statusText.textContent = 'Reading source + drafting ' + count + ' similar question' + (count === 1 ? '' : 's') + '…';

    try {
      // Include the admin-confirmed topic + source difficulty so the
      // backend prompt has the user's final values rather than re-inferring.
      const sourceTopic = ($('#add-sim-topic') && $('#add-sim-topic').value.trim()) || null;
      const sourceDifficulty = ($('#add-sim-source-difficulty') && Number($('#add-sim-source-difficulty').value)) || null;
      const res = await fetch('/api/admin/similar-from-image', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: addImageDataUri,
          count,
          testType,
          subject,
          sourceTopic,
          sourceDifficulty,
          difficultyMode: diffMode,
          difficultyMin,
          difficultyMax,
          notes,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 401) toast('Sign in as admin first');
        else if (res.status === 403) toast('Admin only');
        else if (res.status === 503) toast('AI not configured — set ANTHROPIC_API_KEY');
        else if (res.status === 413) toast('Image too large (max 5 MB)');
        else toast(data.error || 'Generation failed');
        status.hidden = true;
        goBtn.disabled = false;
        return;
      }
      const drafts = Array.isArray(data.questions) ? data.questions : [];
      if (drafts.length === 0) {
        toast('AI returned no usable questions — try a clearer image or different settings');
        status.hidden = true;
        goBtn.disabled = false;
        return;
      }
      // Tag duplicates so the admin sees them before saving.
      addSimBatch = drafts.map((q) => {
        const dup = findDuplicateStem(q.stem);
        return { question: q, selected: !dup, dup };
      });
      status.hidden = true;
      goBtn.disabled = false;
      // Navigate to step 3 (review list).
      showAddImageStep('similar-review');
      $('#add-sim-preview-skipped').textContent = data.skipped || 0;
      renderSimilarBatch();
      const dupCount = addSimBatch.filter((e) => e.dup).length;
      if (dupCount) toast(dupCount + ' duplicate' + (dupCount === 1 ? '' : 's') + ' auto-deselected');
    } catch (e) {
      console.warn('similar-from-image error', e);
      toast('Network error — try again');
      status.hidden = true;
      goBtn.disabled = false;
    }
  };

  const saveSimilarBatch = () => {
    // Default state from the form. Spec: AI-generated but bypass
    // needs-review queue since admin reviewed inline. Default is 'live'.
    const defaultState = $('#add-sim-state').value || 'live';
    const batchTestType = ($('#add-sim-test') && $('#add-sim-test').value) || 'SAT';
    const batchSubject  = ($('#add-sim-subject') && $('#add-sim-subject').value) || 'math';
    const me = (window.STL_AUTH && window.STL_AUTH.getCurrentUser && window.STL_AUTH.getCurrentUser()) || null;
    const uploader = me ? me.email : 'unknown@studysignal.ai';

    const toSave = addSimBatch
      .filter((e) => e.selected && !e.dup)
      .map((e) => {
        const q = e.question;
        return {
          id: newAdminQuestionId(),
          testType: batchTestType,
          section: batchSubject,
          topic: q.topic,
          difficulty: q.difficulty,
          stem: q.stem,
          choices: Array.isArray(q.choices) ? q.choices : null,
          answer: q.answer,
          explanation: q.explanation || '',
          state: defaultState,
          // Tagged ai-generated per spec; the addOrigin field
          // distinguishes this flow from the plain Generate-with-AI
          // flow when admins later filter.
          source: 'ai-generated',
          uploader,
          reviewStatus: 'verified',   // inline-reviewed = verified
          createdAt: new Date().toISOString().slice(0, 10),
          addOrigin: 'similar-from-image',
        };
      });

    if (toSave.length === 0) { toast('Nothing selected to save'); return; }
    addAdminQuestions(toSave);
    toast('Added ' + toSave.length + ' question' + (toSave.length === 1 ? '' : 's'));
    closeAddModal();
  };

  // --- drag-and-drop on the modal — route by extension ---
  const isImageFile = (f) => /^image\//.test(f.type) || /\.(png|jpe?g|gif|webp|heic)$/i.test(f.name);
  const isJsonFile  = (f) => f.type === 'application/json' || /\.json$/i.test(f.name);

  const wireAddDragAndDrop = () => {
    const modal = $('#add-modal');
    if (!modal) return;
    let dragDepth = 0;
    let activeCard = null;

    const setDragOverCard = (route) => {
      if (activeCard) activeCard.classList.remove('is-drag-over');
      if (route) {
        activeCard = modal.querySelector('.stl-add-picker__card[data-route="' + route + '"]');
        if (activeCard) activeCard.classList.add('is-drag-over');
      } else {
        activeCard = null;
      }
    };

    modal.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragDepth++;
      const file = e.dataTransfer && e.dataTransfer.items && e.dataTransfer.items[0];
      if (!file) return;
      // Highlight the picker card that matches the dragged file's
      // type, so the user sees where it'll go.
      const t = file.type || '';
      if (addCurrentView === 'picker') {
        if (/^image\//.test(t)) setDragOverCard('image');
        else if (t === 'text/csv') setDragOverCard('csv');
        else setDragOverCard(null);
      }
    });
    modal.addEventListener('dragover', (e) => { e.preventDefault(); });
    modal.addEventListener('dragleave', (e) => {
      dragDepth--;
      if (dragDepth <= 0) { dragDepth = 0; setDragOverCard(null); }
    });
    modal.addEventListener('drop', (e) => {
      e.preventDefault();
      dragDepth = 0;
      setDragOverCard(null);
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (!f) return;
      if (isImageFile(f)) {
        setAddView('image');
        handleImageFile(f);
      } else if (isJsonFile(f)) {
        setAddView('json');
        handleJsonFile(f);
      } else {
        toast('Unsupported file type');
      }
    });
  };

  const initAddModal = () => {
    if (!$('#add-modal')) return;

    // Close handlers
    $('#add-modal').addEventListener('click', (e) => {
      if (e.target.dataset.modalClose === 'add') closeAddModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && addModalOpen) closeAddModal();
    });

    // Picker card clicks → drill in
    $$('.stl-add-picker__card').forEach((card) => {
      card.addEventListener('click', () => {
        const route = card.dataset.route;
        if (route) setAddView(route);
      });
    });

    // Back arrow
    $('#add-modal-back').addEventListener('click', () => setAddView('picker'));

    // Manual form — Test → Subject → Topic cascade. Changing Test
    // re-populates the Subject options for that test, which then
    // re-populates the Topic options for the (test, subject) pair.
    // Also re-syncs the difficulty input to the chosen test's scale.
    const testSel = $('#add-test');
    const subjectSel = $('#add-subject');
    const topicSel = $('#add-topic');
    const topicOther = $('#add-topic-other');
    if (testSel) {
      testSel.addEventListener('change', () => {
        const tid = testSel.value;
        const firstSubj = (subjectsForTest(tid)[0] || { id: 'math' }).id;
        populateAddSubjectDropdown('#add-subject', tid, firstSubj);
        populateAddTopicDropdown(tid, firstSubj);
        applyTestScaleToManualForm(tid);
      });
    }
    if (subjectSel) {
      subjectSel.addEventListener('change', () => {
        populateAddTopicDropdown(testSel ? testSel.value : 'SAT', subjectSel.value);
      });
    }
    if (topicSel) {
      topicSel.addEventListener('change', () => {
        if (topicSel.value === '__other__') {
          topicOther.hidden = false;
          topicOther.focus();
        } else {
          topicOther.hidden = true;
        }
      });
    }
    $('#add-manual-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const q = buildQuestionFromAddForm('manual');
      if (!q) return;
      addAdminQuestion(q);
      toast('Added ' + q.id);
      closeAddModal();
    });

    // Image flow — shared step 1 (upload) drives both Convert and
    // Generate-similar tabs. The active tab decides what happens
    // when btn-add-image-go is clicked.
    const imageDrop = $('#add-image-dropzone');
    const imageFile = $('#add-image-file');
    if (imageDrop && imageFile) {
      imageDrop.addEventListener('click', () => imageFile.click());
      $('#add-image-pick').addEventListener('click', (e) => { e.stopPropagation(); imageFile.click(); });
      imageFile.addEventListener('change', (e) => handleImageFile(e.target.files[0]));
      $('#add-image-clear').addEventListener('click', resetAddImageForm);
    }
    const imageGo = $('#btn-add-image-go');
    if (imageGo) imageGo.addEventListener('click', handleImageGoClick);
    // Tab pills.
    $$('.stl-add-image__tab').forEach((tab) => {
      tab.addEventListener('click', () => setAddImageMode(tab.dataset.imageTab));
    });
    // Step-2 "Pick a different image" → back to step 1.
    const simBackToUpload = $('#add-sim-back-to-upload');
    if (simBackToUpload) {
      simBackToUpload.addEventListener('click', () => {
        showAddImageStep('upload');
      });
    }

    // CSV flow removed — replaced by JSON import (see JSON wiring
    // block further down). Leaving this guard for any preview build
    // that still ships the CSV dropzone in the DOM: each lookup is
    // null-safe so a missing element no longer throws and halts boot.
    const csvDrop = $('#add-csv-dropzone');
    if (csvDrop) {
      const csvFile = $('#add-csv-file');
      if (csvFile) {
        csvDrop.addEventListener('click', () => csvFile.click());
        const pickBtn = $('#add-csv-pick');
        if (pickBtn) pickBtn.addEventListener('click', (e) => { e.stopPropagation(); csvFile.click(); });
        csvFile.addEventListener('change', (e) => handleCsvFile(e.target.files[0]));
      }
      const csvConfirm = $('#btn-add-csv-confirm');
      if (csvConfirm) csvConfirm.addEventListener('click', () => {
        const ok = addCsvParsed.filter((p) => !p.errors.length).map((p) => p.question);
        if (ok.length === 0) { toast('No valid rows to add'); return; }
        addAdminQuestions(ok);
        toast('Added ' + ok.length + ' question' + (ok.length === 1 ? '' : 's'));
        closeAddModal();
      });
    }
    const dlLink = $('#add-csv-template-link');
    if (dlLink) dlLink.addEventListener('click', (e) => { e.preventDefault(); downloadCsvTemplate(); });
    const dlLink2 = $('#add-csv-template-link-2');
    if (dlLink2) dlLink2.addEventListener('click', (e) => { e.preventDefault(); downloadCsvTemplate(); });

    // Generate-with-AI flow
    const genForm = $('#add-generate-form');
    if (genForm) {
      genForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitGenerateForm();
      });
    }
    // Generate flow Test → Subject → Topic cascade.
    const genTestSel = $('#add-gen-test');
    const genSubjectSel = $('#add-gen-subject');
    if (genTestSel) {
      genTestSel.addEventListener('change', () => {
        const tid = genTestSel.value;
        const firstSubj = (subjectsForTest(tid)[0] || { id: 'math' }).id;
        populateAddSubjectDropdown('#add-gen-subject', tid, firstSubj);
        populateGenerateTopicDropdown(tid, firstSubj);
        applyTestScaleToGenerateForm(tid);
      });
    }
    if (genSubjectSel) {
      genSubjectSel.addEventListener('change', () => {
        populateGenerateTopicDropdown(genTestSel ? genTestSel.value : 'SAT', genSubjectSel.value);
      });
    }
    const backBtn = $('#add-gen-back-to-form');
    if (backBtn) backBtn.addEventListener('click', () => {
      $('#add-gen-preview').hidden = true;
      $('#add-generate-form').hidden = false;
    });
    const genList = $('#add-gen-list');
    if (genList) {
      // Delegated change handler for the per-row selection checkboxes.
      genList.addEventListener('change', (e) => {
        const cb = e.target.closest('input[data-gen-idx]');
        if (!cb) return;
        const idx = Number(cb.dataset.genIdx);
        if (Number.isFinite(idx) && addGenBatch[idx]) {
          addGenBatch[idx].selected = cb.checked;
          renderGenerateBatch();
        }
      });
    }
    const genSaveBtn = $('#btn-add-gen-save');
    if (genSaveBtn) genSaveBtn.addEventListener('click', saveGenerateBatch);

    // --- Similar-from-image flow wiring --------------------------------
    // The image upload is now shared with the Convert tab (step 1 of
    // the Upload Image view). After upload + Analyze, the user lands
    // on the step-2 form which is wired below: difficulty-mode radio,
    // test/subject cascade, generate submit, review-list checkboxes
    // and save handler.
    // Difficulty mode radio toggles the custom-range row's visibility.
    const simDiffRadios = $$('#add-sim-diff-mode input[type="radio"]');
    simDiffRadios.forEach((r) => r.addEventListener('change', refreshSimilarDiffMode));
    // Test → Subject cascade.
    const simTestSel = $('#add-sim-test');
    const simSubjectSel = $('#add-sim-subject');
    if (simTestSel) {
      simTestSel.addEventListener('change', () => {
        const tid = simTestSel.value;
        const firstSubj = (subjectsForTest(tid)[0] || { id: 'math' }).id;
        populateAddSubjectDropdown('#add-sim-subject', tid, firstSubj);
        applyTestScaleToSimilarForm(tid);
      });
    }
    if (simSubjectSel) {
      // No topic dropdown on this flow — AI infers topic from the image.
      simSubjectSel.addEventListener('change', () => { /* no-op for now */ });
    }
    const simForm = $('#add-similar-form');
    if (simForm) {
      simForm.addEventListener('submit', (e) => {
        e.preventDefault();
        submitSimilarForm();
      });
    }
    const simBackBtn = $('#add-sim-back-to-form');
    if (simBackBtn) simBackBtn.addEventListener('click', () => {
      showAddImageStep('similar-form');
    });
    const simList = $('#add-sim-list');
    if (simList) {
      simList.addEventListener('change', (e) => {
        const cb = e.target.closest('input[data-sim-idx]');
        if (!cb) return;
        const idx = Number(cb.dataset.simIdx);
        if (Number.isFinite(idx) && addSimBatch[idx]) {
          addSimBatch[idx].selected = cb.checked;
          renderSimilarBatch();
        }
      });
    }
    const simSaveBtn = $('#btn-add-sim-save');
    if (simSaveBtn) simSaveBtn.addEventListener('click', saveSimilarBatch);

    // --- JSON flow wiring -------------------------------------------
    const jsonDrop = $('#add-json-dropzone');
    const jsonFile = $('#add-json-file');
    if (jsonDrop && jsonFile) {
      jsonDrop.addEventListener('click', () => jsonFile.click());
      const pickBtn = $('#add-json-pick');
      if (pickBtn) pickBtn.addEventListener('click', (e) => { e.stopPropagation(); jsonFile.click(); });
      jsonFile.addEventListener('change', (e) => handleJsonFile(e.target.files[0]));
    }
    const jsonPaste = $('#add-json-paste');
    if (jsonPaste) {
      // Re-parse on every paste / typing pause so the preview reflects
      // the current text. A trailing debounce would be nicer but the
      // re-render is cheap enough to skip the timer dance.
      jsonPaste.addEventListener('input', () => parseJsonInput(jsonPaste.value));
    }
    const jsonConfirm = $('#btn-add-json-confirm');
    if (jsonConfirm) jsonConfirm.addEventListener('click', () => {
      if (addJsonParsed.length === 0) { toast('Nothing valid to add'); return; }
      addAdminQuestions(addJsonParsed);
      toast('Added ' + addJsonParsed.length + ' question' + (addJsonParsed.length === 1 ? '' : 's'));
      closeAddModal();
    });
    const jsonDl1 = $('#add-json-template-link');
    if (jsonDl1) jsonDl1.addEventListener('click', (e) => { e.preventDefault(); downloadJsonTemplate(); });
    const jsonDl2 = $('#add-json-template-link-2');
    if (jsonDl2) jsonDl2.addEventListener('click', (e) => { e.preventDefault(); downloadJsonTemplate(); });

    wireAddDragAndDrop();
  };

  // ----- admin screen wiring --------------------------------------------
  // ============================================================
  // Admin · Users tab
  // ============================================================
  // Aggregates users from two sources:
  //   • Backend (STL_AUTH.listUsers) — emails of anyone who's signed in
  //     since the app launched.
  //   • Local attempts — guest IDs from this device's localStorage
  //     plus any signed-in attempts that haven't been observed yet.
  // The result is a unified list keyed by email-or-guestId, with stats
  // computed from the attempts.
  let usersFilters = { search: '', type: 'all' };
  let usersSort = { col: 'lastSeen', dir: 'desc' };

  const computeUsersData = () => {
    const attempts = loadAttempts().filter((a) => !a.synthetic);
    // Pull explicit users from auth, if available. The list-users API
    // is optional — if STL_AUTH doesn't expose it (demo mode, no
    // backend wired), we'll synthesize users from attempt records.
    const explicit = (window.STL_AUTH && typeof window.STL_AUTH.listUsers === 'function')
      ? (window.STL_AUTH.listUsers() || [])
      : [];

    // Also include the currently-signed-in user as an explicit user
    // record, in case they haven't taken a test yet.
    const me = (window.STL_AUTH && window.STL_AUTH.getCurrentUser && window.STL_AUTH.getCurrentUser()) || null;

    const usersByKey = new Map();
    const seedUser = (key, baseUser) => {
      if (!usersByKey.has(key)) {
        usersByKey.set(key, {
          key,
          email: baseUser.email || null,
          guestId: baseUser.guestId || null,
          role: baseUser.role || (baseUser.email ? 'user' : 'guest'),
          createdAt: baseUser.createdAt || null,
          lastLoginAt: baseUser.lastLoginAt || null,
          attempts: [],
        });
      }
      return usersByKey.get(key);
    };

    explicit.forEach((u) => {
      seedUser('email:' + u.email, {
        email: u.email,
        role: u.role || 'user',
        createdAt: u.created_at || u.createdAt,
        lastLoginAt: u.last_login_at || u.lastLoginAt,
      });
    });
    if (me) {
      seedUser('email:' + me.email, {
        email: me.email,
        role: me.role || 'user',
      });
    }

    // Walk attempts and bucket them under email or guestId.
    attempts.forEach((att) => {
      const key = att.email ? 'email:' + att.email
                : att.guestId ? 'guest:' + att.guestId
                : 'guest:' + (ensureGuestId());
      const rec = seedUser(key, {
        email: att.email,
        guestId: att.guestId || (att.email ? null : ensureGuestId()),
      });
      rec.attempts.push(att);
    });

    // Compute per-user stats.
    const users = Array.from(usersByKey.values()).map((u) => {
      const tests = u.attempts.length;
      let bestScore = null;
      let totalCorrect = 0;
      let totalQuestions = 0;
      let lastSeen = null;
      u.attempts.forEach((att) => {
        const correct = (att.answers || []).filter((a) => a.correct).length;
        const total   = (att.answers || []).length;
        totalCorrect   += correct;
        totalQuestions += total;
        const pct = total ? Math.round((correct / total) * 100) : 0;
        if (bestScore == null || pct > bestScore) bestScore = pct;
        if (!lastSeen || att.completedAt > lastSeen) lastSeen = att.completedAt;
      });
      const accuracy = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : null;
      // Pick a more recent lastSeen between attempts and explicit auth lastLoginAt.
      const lastLogin = u.lastLoginAt ? new Date(u.lastLoginAt).getTime() : 0;
      const lastSeenMs = Math.max(lastSeen || 0, lastLogin);
      return {
        key: u.key,
        email: u.email,
        guestId: u.guestId,
        role: u.role,
        type: u.role === 'admin' ? 'admin' : (u.email ? 'user' : 'guest'),
        displayName: u.email || (u.guestId ? guestDisplayName(u.guestId) : 'Unknown'),
        tests,
        bestScore,
        accuracy,
        lastSeen: lastSeenMs || null,
        attempts: u.attempts,
      };
    });

    return users;
  };

  const fmtAgo = (ms) => {
    if (!ms) return '—';
    const diff = Date.now() - ms;
    const s = Math.floor(diff / 1000);
    if (s < 60)        return s + 's ago';
    const m = Math.floor(s / 60);
    if (m < 60)        return m + 'm ago';
    const h = Math.floor(m / 60);
    if (h < 24)        return h + 'h ago';
    const d = Math.floor(h / 24);
    if (d < 7)         return d + 'd ago';
    return new Date(ms).toLocaleDateString();
  };

  const renderUsersTable = () => {
    const tbody = $('#users-tbody');
    if (!tbody) return;
    let users = computeUsersData();

    // Filter
    const q = (usersFilters.search || '').trim().toLowerCase();
    if (q) {
      users = users.filter((u) =>
        (u.displayName || '').toLowerCase().includes(q) ||
        (u.email || '').toLowerCase().includes(q) ||
        (u.guestId || '').toLowerCase().includes(q)
      );
    }
    if (usersFilters.type !== 'all') {
      users = users.filter((u) => u.type === usersFilters.type);
    }

    // Sort
    const dir = usersSort.dir === 'asc' ? 1 : -1;
    const col = usersSort.col;
    users.sort((a, b) => {
      let av, bv;
      switch (col) {
        case 'user':     av = (a.displayName || '').toLowerCase(); bv = (b.displayName || '').toLowerCase(); break;
        case 'type':     av = a.type;        bv = b.type;        break;
        case 'tests':    av = a.tests;       bv = b.tests;       break;
        case 'best':     av = a.bestScore ?? -1; bv = b.bestScore ?? -1; break;
        case 'accuracy': av = a.accuracy ?? -1;  bv = b.accuracy ?? -1;  break;
        case 'lastSeen': av = a.lastSeen ?? 0;   bv = b.lastSeen ?? 0;   break;
        default: return 0;
      }
      if (av < bv) return -1 * dir;
      if (av > bv) return  1 * dir;
      return 0;
    });

    // KPIs
    const all = computeUsersData();
    $('#kpi-users-total').textContent       = all.length;
    $('#kpi-users-signed-in').textContent   = all.filter((u) => u.email).length;
    $('#kpi-users-guests').textContent      = all.filter((u) => !u.email).length;
    $('#kpi-users-admins').textContent      = all.filter((u) => u.type === 'admin').length;
    $('#kpi-users-tests').textContent       = all.reduce((s, u) => s + u.tests, 0);
    const sevenDaysAgo = Date.now() - 7 * 24 * 3600 * 1000;
    $('#kpi-users-active').textContent      = all.filter((u) => (u.lastSeen || 0) >= sevenDaysAgo).length;
    $('#tab-count-users').textContent       = all.length;

    // Sort indicators
    $$('[data-users-sort]').forEach((th) => {
      const active = th.dataset.usersSort === usersSort.col;
      th.dataset.sortActive = active ? '1' : '';
      th.dataset.sortDir    = active ? usersSort.dir : '';
    });

    // Body
    if (users.length === 0) {
      tbody.innerHTML = '';
      $('#users-empty').hidden = false;
    } else {
      $('#users-empty').hidden = true;
      tbody.innerHTML = users.map((u) => {
        const accStr = u.accuracy == null ? '—' : (u.accuracy + '%');
        const bestStr = u.bestScore == null ? '—' : (u.bestScore + '%');
        const idLine = u.email
          ? '<span class="stl-users__user-id">' + escapeHtml(u.email) + '</span>'
          : '<span class="stl-users__user-id">' + escapeHtml(u.guestId || '—') + '</span>';
        return '<tr class="stl-users__row" data-user-key="' + escapeHtml(u.key) + '">'
          + '<td>'
            + '<div class="stl-users__user">'
              + '<span class="stl-users__user-name">' + escapeHtml(u.displayName) + '</span>'
              + idLine
            + '</div>'
          + '</td>'
          + '<td><span class="stl-users__type" data-type="' + u.type + '">' + u.type + '</span></td>'
          + '<td class="stl-users__num">' + u.tests + '</td>'
          + '<td class="stl-users__pct">' + bestStr + '</td>'
          + '<td class="stl-users__pct">' + accStr + '</td>'
          + '<td class="stl-users__lastseen">' + fmtAgo(u.lastSeen) + '</td>'
        + '</tr>';
      }).join('');
    }

    $('#users-summary').textContent =
      users.length + ' user' + (users.length === 1 ? '' : 's')
      + (q ? ' matching "' + q + '"' : '');
  };

  // ----- strengths / weaknesses computation ----------------------------
  // Group answers by topic. Each topic accuracy = correct / total, with
  // a minimum sample size to filter noise. Strengths sorted high→low,
  // weaknesses low→high. Returns { strengths: [...], weaknesses: [...] }.
  const computeUserTopicStats = (attempts) => {
    const byTopic = new Map();
    attempts.forEach((att) => {
      const qById = new Map((att.questions || []).map((q) => [q.qid, q]));
      (att.answers || []).forEach((ans) => {
        const q = qById.get(ans.qid);
        const topic = (q && q.snap && q.snap.topic) || 'unknown';
        if (!byTopic.has(topic)) byTopic.set(topic, { correct: 0, total: 0 });
        const b = byTopic.get(topic);
        b.total++;
        if (ans.correct) b.correct++;
      });
    });
    const arr = Array.from(byTopic.entries()).map(([topic, b]) => ({
      topic,
      correct: b.correct,
      total: b.total,
      accuracy: b.total ? b.correct / b.total : 0,
    }));
    // Filter noise: require ≥3 attempts in a topic.
    const eligible = arr.filter((t) => t.total >= 3);
    const strengths  = eligible.slice().sort((a, b) => b.accuracy - a.accuracy)
      .filter((t) => t.accuracy >= 0.7).slice(0, 3);
    const weaknesses = eligible.slice().sort((a, b) => a.accuracy - b.accuracy)
      .filter((t) => t.accuracy < 0.6).slice(0, 3);
    return { strengths, weaknesses };
  };

  // ----- user detail modal ---------------------------------------------
  const openUserDetail = (key) => {
    const all = computeUsersData();
    const u = all.find((x) => x.key === key);
    if (!u) return;

    $('#user-detail-eyebrow').textContent = u.type.charAt(0).toUpperCase() + u.type.slice(1);
    $('#user-detail-title').textContent   = u.displayName;

    // 4 mini stats: tests · best · accuracy · last seen.
    $('#user-detail-stats').innerHTML = [
      ['Tests', u.tests],
      ['Best', u.bestScore == null ? '—' : u.bestScore + '%'],
      ['Accuracy', u.accuracy == null ? '—' : u.accuracy + '%'],
      ['Last seen', fmtAgo(u.lastSeen)],
    ].map(([lbl, val]) =>
      '<div class="stl-user-detail__stat">'
        + '<p class="stl-user-detail__stat-lbl">' + lbl + '</p>'
        + '<p class="stl-user-detail__stat-num">' + escapeHtml(String(val)) + '</p>'
      + '</div>'
    ).join('');

    // Strengths / weaknesses
    const stats = computeUserTopicStats(u.attempts || []);
    const renderTopicList = (arr, kind) => {
      if (arr.length === 0) {
        return '<li class="stl-user-detail__empty">Need more attempts to surface ' + kind + '.</li>';
      }
      return arr.map((t) =>
        '<li class="stl-user-detail__topic" data-kind="' + kind + '">'
          + '<span class="stl-user-detail__topic-name">' + escapeHtml(t.topic) + '</span>'
          + '<span class="stl-user-detail__topic-acc">' + Math.round(t.accuracy * 100) + '%</span>'
          + '<span class="stl-user-detail__topic-n">' + t.correct + '/' + t.total + '</span>'
        + '</li>'
      ).join('');
    };
    $('#user-detail-strengths').innerHTML  = renderTopicList(stats.strengths,  'strength');
    $('#user-detail-weaknesses').innerHTML = renderTopicList(stats.weaknesses, 'weakness');

    // Tests list (recent first)
    const sorted = (u.attempts || []).slice().sort((a, b) => b.completedAt - a.completedAt);
    if (sorted.length === 0) {
      $('#user-detail-tests').innerHTML = '<li class="stl-user-detail__empty">No tests taken yet.</li>';
    } else {
      $('#user-detail-tests').innerHTML = sorted.map((att) => {
        const correct = (att.answers || []).filter((a) => a.correct).length;
        const total   = (att.answers || []).length;
        const pct     = total ? Math.round((correct / total) * 100) : 0;
        const date    = new Date(att.completedAt).toLocaleString();
        const time    = formatDuration(att.totalElapsedMs || 0);
        return '<div class="stl-user-detail__test">'
          + '<span class="stl-user-detail__test-date">' + escapeHtml(date) + '</span>'
          + '<span class="stl-user-detail__test-target">target ' + (att.targetScore || '—') + '</span>'
          + '<span class="stl-user-detail__test-score">' + correct + '/' + total + ' · ' + pct + '%</span>'
          + '<span class="stl-user-detail__test-time">' + time + '</span>'
        + '</div>';
      }).join('');
    }

    showAdminModal($('#user-detail-modal'));
  };
  const closeUserDetail = () => hideAdminModal($('#user-detail-modal'));

  const initUsersTab = () => {
    const tbody = $('#users-tbody');
    if (!tbody) return;
    renderUsersTable();

    // Filter inputs
    const search = $('#users-search');
    if (search) {
      search.addEventListener('input', (e) => {
        usersFilters.search = e.target.value;
        renderUsersTable();
      });
    }
    const typeSel = $('#users-filter-type');
    if (typeSel) {
      typeSel.addEventListener('change', (e) => {
        usersFilters.type = e.target.value;
        renderUsersTable();
      });
    }
    const reset = $('#btn-users-clear');
    if (reset) {
      reset.addEventListener('click', () => {
        usersFilters = { search: '', type: 'all' };
        if (search) search.value = '';
        if (typeSel) typeSel.value = 'all';
        renderUsersTable();
      });
    }

    // Sortable headers
    $$('[data-users-sort]').forEach((th) => {
      th.addEventListener('click', () => {
        const col = th.dataset.usersSort;
        if (!col) return;
        if (usersSort.col === col) {
          usersSort.dir = usersSort.dir === 'asc' ? 'desc' : 'asc';
        } else {
          usersSort.col = col;
          usersSort.dir = (col === 'user' || col === 'type') ? 'asc' : 'desc';
        }
        renderUsersTable();
      });
    });

    // Row clicks → user detail modal
    tbody.addEventListener('click', (e) => {
      const tr = e.target.closest('tr.stl-users__row');
      if (tr && tr.dataset.userKey) openUserDetail(tr.dataset.userKey);
    });

    // Modal close handlers
    const userModal = $('#user-detail-modal');
    if (userModal) {
      userModal.addEventListener('click', (e) => {
        if (e.target.dataset.modalClose === 'user') closeUserDetail();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && userModal.classList.contains('is-open')) closeUserDetail();
      });
    }
  };

  // ----- tab switching (Users / Questions / Imports / Tests) ---------
  const setAdminTab = (name) => {
    if (!name) name = 'questions';
    $$('.stl-admin__tab').forEach((tab) => {
      const active = tab.dataset.tab === name;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    $$('.stl-admin__pane').forEach((pane) => {
      pane.hidden = pane.dataset.pane !== name;
    });
    // Tab-scoped page actions. Each carries `data-tab-action="<a>,<b>"`
    // listing the tabs where it should appear. The "Add questions" CTA
    // shows on Questions + Imports; the review-queue triggers show on
    // Questions only (their visibility is further narrowed by count in
    // updateReviewTriggerVisibility).
    $$('[data-tab-action]').forEach((btn) => {
      const allow = (btn.dataset.tabAction || '').split(',').map((s) => s.trim()).filter(Boolean);
      btn.hidden = allow.length > 0 && !allow.includes(name);
    });
    // After applying the tab-scope, refresh count-aware triggers so a
    // zero-count Review button stays hidden even when we just switched
    // to its parent tab.
    if (typeof updateReviewTriggerVisibility === 'function') updateReviewTriggerVisibility();
    // Title reflects the active section.
    const h1 = $('#admin-h1');
    if (h1) {
      const TITLES = { users: 'Users', questions: 'Questions', imports: 'Imports', tests: 'Tests' };
      h1.textContent = TITLES[name] || 'Admin';
    }
    // Refresh the tab's data when activating.
    if (name === 'users') renderUsersTable();
    if (name === 'tests') renderTestsPanel();
    if (name === 'imports') {
      // Always re-enter at the list view; clear any stale drilled-in
      // state. The detail view stays available via the card buttons.
      showImportsListView();
      renderImportsList();
    }
    // Sync the URL fragment so refresh keeps the active tab.
    try { history.replaceState({}, '', '#' + name); } catch (_) {}
  };
  const initAdminTabs = () => {
    $$('.stl-admin__tab').forEach((tab) => {
      tab.addEventListener('click', () => setAdminTab(tab.dataset.tab));
    });
    // Honor URL fragment if present (e.g., navigated from a deep link).
    const hash = (location.hash || '').replace(/^#/, '');
    if (hash === 'users' || hash === 'questions' || hash === 'imports' || hash === 'tests') {
      setAdminTab(hash);
    } else {
      setAdminTab('questions');
    }
  };

  // ----- Imports tab (admin) -----------------------------------------
  // Lists everything in window.STL_IMPORTS as a card grid. Each card has
  // a "View" affordance that drills into a detail view scoped to that
  // import's questions (matched by importId on each q row), plus a
  // "Delete" affordance that toggles the import-id in
  // stl_imports_deleted localStorage. Cascade-deleting is handled in
  // assembleBank() — questions with a deleted importId are filtered out
  // of STL_QUESTIONS_ALL entirely, so they disappear from the Questions
  // tab and the quiz pool until the operator restores.
  let currentImportId = null;

  const fmtDate = (iso) => {
    if (!iso) return '—';
    try {
      const d = new Date(iso + 'T12:00:00Z');
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (_) { return iso; }
  };

  const showImportsListView = () => {
    currentImportId = null;
    const listEl = $('#imports-list-view');
    const detailEl = $('#imports-detail-view');
    if (listEl) listEl.hidden = false;
    if (detailEl) detailEl.hidden = true;
  };
  const showImportsDetailView = (importId) => {
    currentImportId = importId;
    const listEl = $('#imports-list-view');
    const detailEl = $('#imports-detail-view');
    if (listEl) listEl.hidden = true;
    if (detailEl) detailEl.hidden = false;
    renderImportDetail(importId);
  };

  const renderImportsList = () => {
    const grid = $('#imports-grid');
    const empty = $('#imports-empty');
    const tabCount = $('#tab-count-imports');
    if (!grid) return;
    const imports = Array.isArray(window.STL_IMPORTS) ? window.STL_IMPORTS.slice() : [];
    const counts = buildImportCounts();
    const deleted = loadDeletedImports();
    // Sort newest-first so the latest batch surfaces at the top.
    imports.sort((a, b) => String(b.generatedAt || '').localeCompare(String(a.generatedAt || '')));
    if (tabCount) tabCount.textContent = imports.length;
    if (imports.length === 0) {
      grid.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    // Per-state breakdown for the card — helps the operator see at a
    // glance how an import is distributed without drilling in.
    const breakdownFor = (importId) => {
      const all = window.STL_QUESTIONS_ALL || [];
      const bucket = all.filter((q) => q && q.importId === importId);
      const out = { live: 0, 'needs-review': 0, unpublished: 0, archived: 0 };
      bucket.forEach((q) => { if (q.state in out) out[q.state]++; });
      return out;
    };

    grid.innerHTML = imports.map((imp) => {
      const liveCount = counts[imp.id] || 0;
      const declared = Number(imp.count) || liveCount;
      const isDeleted = deleted.has(imp.id);
      const stateBadgeClass = isDeleted ? 'stl-admin__badge--archived' : 'stl-admin__badge--live';
      const stateBadgeText  = isDeleted ? 'Deleted'                    : 'Active';
      const br = breakdownFor(imp.id);
      // Show drift between declared and currently-visible count so the
      // operator can spot archived/deleted bleed-off.
      const driftLine = liveCount === declared
        ? declared + ' questions'
        : liveCount + ' of ' + declared + ' currently in bank';
      // State chips: a horizontal strip of {state: count} bubbles.
      const chip = (state, n, label) => n > 0
        ? '<span class="stl-import-card__chip stl-import-card__chip--' + state + '" title="' + label + '">'
            + n + ' ' + label
          + '</span>'
        : '';
      const chips = isDeleted ? '' :
        '<div class="stl-import-card__chips">' +
          chip('live',         br['live'],         'live') +
          chip('needs-review', br['needs-review'], 'needs review') +
          chip('unpublished',  br['unpublished'],  'unpublished') +
          chip('archived',     br['archived'],     'archived') +
        '</div>';

      return (
        '<article class="stl-import-card' + (isDeleted ? ' is-deleted' : '') + '" role="listitem" data-import-id="' + escapeHtml(imp.id) + '">' +
          '<header class="stl-import-card__head">' +
            '<div class="stl-import-card__head-text">' +
              '<p class="stl-eyebrow stl-import-card__eyebrow">' + escapeHtml(imp.testType || 'SAT') + ' · ' + escapeHtml(subjectName(imp.section || 'math')) + '</p>' +
              '<h3 class="stl-import-card__title">' + escapeHtml(imp.label || imp.id) + '</h3>' +
              '<p class="stl-import-card__sub">' + escapeHtml(fmtDate(imp.generatedAt)) + ' · ' + escapeHtml(driftLine) + '</p>' +
            '</div>' +
            '<span class="stl-admin__badge ' + stateBadgeClass + '">' + stateBadgeText + '</span>' +
          '</header>' +
          chips +
          '<dl class="stl-import-card__meta">' +
            '<div><dt>Source</dt><dd>' + escapeHtml(imp.source || '—') + '</dd></div>' +
            '<div><dt>File</dt><dd><code>' + escapeHtml(imp.file || '—') + '</code></dd></div>' +
            '<div><dt>ID</dt><dd><code>' + escapeHtml(imp.id) + '</code></dd></div>' +
          '</dl>' +
          '<div class="stl-import-card__actions">' +
            '<button type="button" class="stl-btn stl-btn--ghost" data-import-action="view" data-import-id="' + escapeHtml(imp.id) + '">View questions</button>' +
            (isDeleted
              ? '<button type="button" class="stl-btn stl-btn--ghost" data-import-action="restore" data-import-id="' + escapeHtml(imp.id) + '">Restore</button>'
              : '<button type="button" class="stl-btn stl-btn--ghost" data-import-action="review" data-import-id="' + escapeHtml(imp.id) + '" ' +
                  (liveCount === 0 ? 'disabled' : '') + '>Review all questions</button>'
            ) +
            (isDeleted
              ? ''
              : '<button type="button" class="stl-btn stl-btn--danger" data-import-action="delete" data-import-id="' + escapeHtml(imp.id) + '">Delete all questions</button>'
            ) +
          '</div>' +
        '</article>'
      );
    }).join('');
  };

  // Detail view of a single import. We reuse the same icon-button row
  // pattern as renderAdminTable but skip the filter chrome — the
  // import scope IS the filter. Per-row actions (publish/unpublish/
  // edit/archive) reuse the same data-action / data-id contract so the
  // existing handler at the bottom of app.js picks them up.
  const renderImportDetail = (importId) => {
    const imp = (window.STL_IMPORTS || []).find((x) => x.id === importId);
    const titleEl = $('#import-detail-title');
    const subEl = $('#import-detail-sub');
    const summaryEl = $('#import-detail-summary');
    const tbody = $('#import-detail-tbody');
    const empty = $('#import-detail-empty');
    const restoreBtn = $('#btn-import-restore');
    const deleteBtn = $('#btn-import-delete');
    if (!tbody) return;
    if (titleEl) titleEl.textContent = imp ? (imp.label || imp.id) : importId;
    if (subEl && imp) {
      subEl.textContent = (imp.source || '—') + ' · ' + fmtDate(imp.generatedAt) +
        ' · file: ' + (imp.file || '—');
    }
    const isDeleted = loadDeletedImports().has(importId);
    if (restoreBtn) restoreBtn.hidden = !isDeleted;
    if (deleteBtn)  deleteBtn.hidden  = isDeleted;

    // For deleted imports, the questions are filtered OUT of
    // STL_QUESTIONS_ALL — we still want to show them in the detail view,
    // so source the rows from the raw bank (human + ai), bypassing the
    // deleted-imports filter.
    const rawHuman = window.STL_QUESTIONS_HUMAN || [];
    const rawAi    = window.STL_QUESTIONS_AI || [];
    const overrides = loadAdminOverrides();
    const humanDefaults = window.STL_QUESTIONS_HUMAN_DEFAULTS || {};
    const aiDefaults    = window.STL_QUESTIONS_AI_DEFAULTS || {};
    const merge = (defaults, q) => {
      const base = { ...defaults, ...q };
      const ov = overrides[base.id];
      return ov ? { ...base, ...ov } : base;
    };
    const rows = [
      ...rawHuman.map((q) => merge(humanDefaults, q)),
      ...rawAi.map((q)    => merge(aiDefaults,    q)),
    ].filter((q) => q && q.importId === importId);

    if (summaryEl) {
      summaryEl.textContent = isDeleted
        ? rows.length + ' questions in this import (currently EXCLUDED from the bank — restore to re-enable)'
        : 'Showing ' + rows.length + ' questions in this import';
    }
    if (rows.length === 0) {
      tbody.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    // Same icon set as renderAdminTable — keep visually consistent.
    const ICON_PUBLISH    = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>';
    const ICON_UNPUBLISH  = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>';
    const ICON_EDIT       = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>';
    const ICON_ARCHIVE    = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>';
    const ICON_UNARCHIVE  = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h4"/><path d="M14 21h4a2 2 0 0 0 2-2V8"/><path d="m12 12-3 3 3 3"/><path d="M9 15h7"/></svg>';

    tbody.innerHTML = rows.map((q) => {
      const s = computeQuestionStats(q.id);
      const stateBadge = '<span class="stl-admin__badge stl-admin__badge--' + q.state + '">' +
        escapeHtml(stateLabel(q.state)) + '</span>';
      const isLive = q.state === 'live';
      const isArchived = q.state === 'archived';
      const toggleAction = isLive ? 'unpublish' : 'publish';
      const subjLabel = subjectName(q.section || 'math');
      const iconBtn = (action, label, icon, modClass) => (
        '<button type="button" class="stl-admin__icon-btn' + (modClass ? ' ' + modClass : '') +
          '" data-action="' + action + '" data-id="' + escapeHtml(q.id) +
          '" aria-label="' + escapeHtml(label) + '"' +
          ' title="' + escapeHtml(label) + '"' +
          ' data-tip="' + escapeHtml(label) + '">' + icon + '</button>'
      );
      const actionsHtml =
        (isArchived
          ? iconBtn('unarchive', 'Restore from archive', ICON_UNARCHIVE)
          : iconBtn(toggleAction, isLive ? 'Unpublish (hide from quiz)' : 'Publish (show in quiz)', isLive ? ICON_UNPUBLISH : ICON_PUBLISH)
        ) +
        iconBtn('edit', 'Edit question', ICON_EDIT) +
        (isArchived ? '' :
          iconBtn('archive', 'Archive (soft-delete)', ICON_ARCHIVE, 'stl-admin__icon-btn--danger'));
      return (
        '<tr class="stl-admin__row' + (isArchived ? ' is-archived' : '') + '" data-id="' + escapeHtml(q.id) + '">' +
          '<td class="stl-admin__td-id">' +
            '<div class="stl-admin__id">' + escapeHtml(q.id) + '</div>' +
            '<div class="stl-admin__id-stem">' + escapeHtml(stemPreview(q.stem)) + '</div>' +
          '</td>' +
          '<td class="stl-admin__td-subj">' +
            '<div class="stl-admin__subj">' + escapeHtml(subjLabel) + '</div>' +
            '<div class="stl-admin__topic">' + escapeHtml(q.topic || '—') + '</div>' +
          '</td>' +
          '<td><span class="stl-admin__diff" data-tier="' + escapeHtml(tierLabelFor(q.difficulty, q.testType)) + '">' +
            escapeHtml(String(q.difficulty || '—')) +
          '</span> ' + stateBadge + '</td>' +
          '<td>' + renderStatBar(s) + '</td>' +
          '<td class="stl-admin__td-actions">' + actionsHtml + '</td>' +
        '</tr>'
      );
    }).join('');
  };

  const initImportsTab = () => {
    // Grid-level click delegation: View / Delete / Restore on a card.
    const grid = $('#imports-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-import-action]');
        if (!btn) return;
        const action = btn.dataset.importAction;
        const id = btn.dataset.importId;
        if (!id) return;
        if (action === 'view') {
          showImportsDetailView(id);
        } else if (action === 'review') {
          // Opens the generalized review modal scoped to this import.
          const imp = (window.STL_IMPORTS || []).find((x) => x.id === id);
          openReviewQueue({
            kind: 'import',
            importId: id,
            label: 'Review queue · ' + (imp && imp.label || id),
          });
        } else if (action === 'delete') {
          const imp = (window.STL_IMPORTS || []).find((x) => x.id === id);
          const cnt = (buildImportCounts()[id] || 0);
          const ok = confirm('Delete all questions in "' + (imp && imp.label || id) + '"?\n\n' +
            cnt + ' question(s) will be excluded from the bank. You can restore the import later from this same card.');
          if (!ok) return;
          setImportDeleted(id, true);
          renderImportsList();
          if (typeof renderAdminTable === 'function') renderAdminTable();
          toast('Import deleted — ' + cnt + ' questions excluded');
        } else if (action === 'restore') {
          setImportDeleted(id, false);
          renderImportsList();
          if (typeof renderAdminTable === 'function') renderAdminTable();
          toast('Import restored');
        }
      });
    }
    // Detail-view header buttons.
    const backBtn = $('#btn-imports-back');
    if (backBtn) backBtn.addEventListener('click', () => {
      showImportsListView();
      renderImportsList();
    });
    const delBtn = $('#btn-import-delete');
    if (delBtn) delBtn.addEventListener('click', () => {
      if (!currentImportId) return;
      const imp = (window.STL_IMPORTS || []).find((x) => x.id === currentImportId);
      const cnt = (buildImportCounts()[currentImportId] || 0);
      const ok = confirm('Delete import "' + (imp && imp.label || currentImportId) + '"?\n\n' +
        cnt + ' question(s) will be excluded from the bank. You can restore later.');
      if (!ok) return;
      setImportDeleted(currentImportId, true);
      renderImportDetail(currentImportId);
      renderImportsList();
      if (typeof renderAdminTable === 'function') renderAdminTable();
      toast('Import deleted — ' + cnt + ' questions excluded');
    });
    const restoreBtn = $('#btn-import-restore');
    if (restoreBtn) restoreBtn.addEventListener('click', () => {
      if (!currentImportId) return;
      setImportDeleted(currentImportId, false);
      renderImportDetail(currentImportId);
      renderImportsList();
      if (typeof renderAdminTable === 'function') renderAdminTable();
      toast('Import restored');
    });
    // Per-question icon buttons inside the detail view use the same
    // data-action / data-id contract as the Questions tab; the global
    // delegated handler down at the bottom of app.js already picks
    // them up. We only need to refresh THIS view after bank changes:
    document.addEventListener('stl:bank-updated', () => {
      if (currentImportId) renderImportDetail(currentImportId);
      // Also refresh the list view in case counts changed (archive
      // toggles affect per-import live counts).
      renderImportsList();
    });
  };

  // ----- Tests panel (admin) ---------------------------------------------
  // Renders three rows (one per TEST_TYPE) with wordmark + name +
  // tagline + question count + Active/Hidden toggle. Toggling writes
  // to localStorage stl_active_tests and re-renders the panel + tab
  // count. The user-facing entry router auto-respects the new state
  // on the next page load (or "Get started" click).
  //
  // Rule: at least ONE test must remain Active so the picker/score
  // entry has something to land on. Trying to hide the last active
  // test surfaces a toast and the toggle reverts.
  // Per-test collapsed state for the admin Tests panel — persisted so
  // an admin's preference survives reloads. Default: every test is
  // collapsed (subjects hidden until expanded). Stored as a flat list
  // of test IDs that are EXPANDED so the default-collapsed behavior
  // works without needing an entry for every test.
  const TESTS_EXPANDED_KEY = 'stl_admin_tests_expanded';
  const loadExpandedTests = () => {
    try {
      const raw = localStorage.getItem(TESTS_EXPANDED_KEY);
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      return new Set(Array.isArray(parsed) ? parsed.filter((t) => TEST_TYPES[t]) : []);
    } catch (_) { return new Set(); }
  };
  const saveExpandedTests = (set) => {
    try { localStorage.setItem(TESTS_EXPANDED_KEY, JSON.stringify([...set])); } catch (_) {}
  };

  const renderTestsPanel = () => {
    const panel = $('#tests-panel');
    if (!panel) return;
    const all = window.STL_QUESTIONS_ALL || [];
    const active = loadActiveTests();
    const expanded = loadExpandedTests();
    panel.innerHTML = TEST_TYPE_ORDER.map((id) => {
      const cfg = TEST_TYPES[id];
      if (!cfg) return '';
      const isActive = active.includes(id);
      const liveCount     = all.filter((q) => (q.testType || 'SAT') === id && q.state === 'live').length;
      const totalCount    = all.filter((q) => (q.testType || 'SAT') === id).length;
      // ---- Child subject rows --------------------------------------
      // Render one compact toggle per subject in this test's catalog.
      // Each shows the subject name + per-subject live/total counts so
      // admins can see coverage at a glance. Cascading rules:
      //   • Turning off the LAST enabled subject also flips the test
      //     off (handled in initTestsPanel below).
      //   • Turning the test off implicitly hides all subjects (the
      //     stored enabled list is preserved so re-activation restores
      //     the prior selection).
      //   • Turning the test on with all subjects previously off
      //     restores them all on (default).
      const subjects = subjectsForTest(id);
      const enabled = new Set(loadEnabledSubjects(id));
      // EFFECTIVE composition for this test (defaults merged with the
      // admin's per-test overrides). Used for both the row's Length
      // stat and the editable per-subject count + derived % badge.
      const eff = getEffectiveTestConfig(id) || { length: 0, subjectMix: {}, isOverridden: false };
      const subjectMix = eff.subjectMix || {};
      // testLength derives from sum(subjectMix), NOT eff.length. The
      // admin's change handler updates subjectMix only — if we read
      // eff.length here we'd compare each subject's new count against
      // a stale denominator (saw R&W=40 of total=30 → 133%). The quiz
      // itself already treats sum(subjectMix) as the real length (see
      // computeTestComposition), so deriving here keeps display and
      // runtime in lockstep.
      const testLength = Object.values(subjectMix).reduce((acc, v) => {
        const n = Number(v);
        return acc + (Number.isFinite(n) && n > 0 ? n : 0);
      }, 0);
      const subjectRows = subjects.map((s) => {
        const subjLive  = all.filter((q) => (q.testType || 'SAT') === id && (q.section || 'math') === s.id && q.state === 'live').length;
        const subjTotal = all.filter((q) => (q.testType || 'SAT') === id && (q.section || 'math') === s.id).length;
        const isOn = enabled.has(s.id);
        // Inline editable count input + live-derived %. Admin types a
        // new value, blur or Enter commits — handled by a delegated
        // listener in initTestsPanel below. data-comp-input carries
        // the test+subject pair so one handler covers all rows.
        const planCount = subjectMix[s.id];
        const sharePct = (planCount != null && testLength > 0)
          ? Math.round(planCount * 100 / testLength)
          : null;
        const compEditor =
          '<span class="stl-tests-subject__comp">' +
            '<input class="stl-tests-subject__count-input" type="number" min="0" step="1"' +
              ' value="' + (planCount != null ? planCount : 0) + '"' +
              ' data-comp-input="' + id + '|' + s.id + '"' +
              ' aria-label="Question count for ' + escapeHtml(s.name) + ' on ' + escapeHtml(cfg.name) + '" />' +
            '<span class="stl-tests-subject__comp-pct">' +
              (sharePct != null ? sharePct + '%' : '—') +
            '</span>' +
          '</span>';
        // Subject is interactable only when the parent test is Active.
        // When parent is off, render disabled-looking but still clickable
        // so admins can pre-stage which subjects to enable before
        // flipping the test on.
        return (
          '<div class="stl-tests-subject" data-subject-row="' + id + '|' + s.id +
            '" data-enabled="' + (isOn ? '1' : '0') + '">' +
            '<div class="stl-tests-subject__meta">' +
              '<span class="stl-tests-subject__name">' + escapeHtml(s.name) + '</span>' +
              compEditor +
              '<span class="stl-tests-subject__count">' + subjLive + ' live · ' + subjTotal + ' total</span>' +
            '</div>' +
            '<button type="button" class="stl-switch stl-switch--sm" data-subject-toggle="' + id + '|' + s.id + '"' +
              ' role="switch" aria-checked="' + (isOn ? 'true' : 'false') + '"' +
              ' aria-label="' + (isOn ? 'Disable' : 'Enable') + ' ' + s.name + ' for ' + cfg.name + '">' +
              '<span class="stl-switch__track"><span class="stl-switch__thumb"></span></span>' +
            '</button>' +
          '</div>'
        );
      }).join('');
      // If this test has a custom composition, append a small "Reset to
      // default" link at the bottom of the subject block so admins have
      // a one-click way back to the cfg defaults.
      const resetLink = eff.isOverridden
        ? '<div class="stl-tests-row__reset">' +
            '<button type="button" class="stl-link" data-comp-reset="' + id + '">Reset to default composition</button>' +
          '</div>'
        : '';
      // Theme color picker. Reads from the DB cache (resolveTint),
      // falls back to the hardcoded TEST_TYPES tint, falls back again
      // to lavender. Changes are POSTed to /api/admin/test-config so
      // every device picks them up on next page-load.
      const tintRgb = resolveTint(id) || cfg.tint || '139, 134, 255';
      const [tR, tG, tB] = tintRgb.split(',').map((s) => Number(s.trim()));
      const tintHex = '#' + [tR, tG, tB]
        .map((n) => Math.max(0, Math.min(255, Math.round(n || 0))).toString(16).padStart(2, '0'))
        .join('');
      const tintDefault = (cfg.tint || '139, 134, 255');
      const isTintCustom = tintRgb.replace(/\s+/g, '') !== tintDefault.replace(/\s+/g, '');
      const colorRow =
        '<div class="stl-tests-row__color">' +
          '<label class="stl-tests-row__color-label">' +
            '<span class="stl-tests-row__color-swatch" aria-hidden="true"' +
              ' style="background: rgb(' + tintRgb + ');"></span>' +
            '<span class="stl-tests-row__color-text">Theme color' +
              (isTintCustom ? ' <span class="stl-tests-row__overridden-dot" aria-label="customized">●</span>' : '') +
            '</span>' +
            '<input type="color" class="stl-tests-row__color-input" data-tint-input="' + id + '"' +
              ' value="' + tintHex + '"' +
              ' aria-label="Pick theme color for ' + cfg.name + '" />' +
          '</label>' +
          (isTintCustom
            ? '<button type="button" class="stl-link stl-tests-row__color-reset" data-tint-reset="' + id + '">Reset</button>'
            : '') +
        '</div>';
      // Collapse/expand state for this row. Single-subject tests have
      // nothing to expand into. Expansion is now driven entirely by
      // clicking the row-main area — no separate chevron control.
      const canExpand = subjects.length > 1;
      const isExpanded = canExpand && expanded.has(id);
      // Subjects stat — "enabled / total" so admins can see at a glance
      // which tests have partial subject coverage without expanding.
      const enabledCount = subjects.filter((s) => enabled.has(s.id)).length;
      const subjectsStat = '<div><dt>Subjects</dt><dd>' + enabledCount + '<small>/' + subjects.length + '</small></dd></div>';
      // Length stat = sum of the (currently effective) subject mix.
      // Updates live as admins edit per-subject counts in the expanded
      // panel below. The dot suffix (·) signals the override state so
      // admins know at a glance which tests they've customized.
      const lengthOverridden = eff.isOverridden;
      const lengthStat = (testLength)
        ? '<div title="Total questions per quiz (sum of subject mix below)' + (lengthOverridden ? ' — customized' : '') + '">'
            + '<dt>Length' + (lengthOverridden ? ' <span class="stl-tests-row__overridden-dot" aria-label="customized">●</span>' : '') + '</dt>'
            + '<dd>' + testLength + '<small> q</small></dd>'
          + '</div>'
        : '';
      return (
        '<div class="stl-tests-row" role="listitem" data-test="' + id +
          '" data-expanded="' + (isExpanded ? '1' : '0') +
          '" data-active="' + (isActive ? '1' : '0') +
          '" style="--tile-tint: ' + (resolveTint(id) || cfg.tint) + '">' +
          // Mark the main area with data-test-expand-zone when the row
          // is expandable so click delegation can fire the toggle from
          // anywhere inside. Buttons inside the row stop propagation
          // via the explicit data-test-toggle / data-subject-toggle
          // handlers below.
          '<div class="stl-tests-row__main"' +
            (canExpand ? ' data-test-expand-zone="' + id + '"' : '') +
            (canExpand ? ' role="button" tabindex="0"' : '') +
            (canExpand ? ' aria-expanded="' + (isExpanded ? 'true' : 'false') + '"' : '') +
            (canExpand ? ' aria-controls="tests-row-subjects-' + id + '"' : '') +
            '>' +
            '<div class="stl-tests-row__mark">' + cfg.wordmark + '</div>' +
            '<div class="stl-tests-row__meta">' +
              '<div class="stl-tests-row__name">' + escapeHtml(cfg.name) + '</div>' +
              '<div class="stl-tests-row__tagline">' + escapeHtml(cfg.tagline) + '</div>' +
            '</div>' +
            '<div class="stl-tests-row__counts">' +
              '<div><dt>Live</dt><dd>' + liveCount + '</dd></div>' +
              '<div><dt>Total</dt><dd>' + totalCount + '</dd></div>' +
              subjectsStat +
              lengthStat +
            '</div>' +
            '<button type="button" class="stl-switch" data-test-toggle="' + id + '"' +
              ' role="switch" aria-checked="' + (isActive ? 'true' : 'false') + '"' +
              ' aria-label="' + (isActive ? 'Hide' : 'Activate') + ' ' + cfg.name + '">' +
              '<span class="stl-switch__track"><span class="stl-switch__thumb"></span></span>' +
            '</button>' +
          '</div>' +
          (canExpand
            ? '<div class="stl-tests-row__subjects" id="tests-row-subjects-' + id + '"' +
                ' data-parent-active="' + (isActive ? '1' : '0') + '"' +
                (isExpanded ? '' : ' hidden') +
                '>' + subjectRows + colorRow + resetLink + '</div>'
            : '') +
        '</div>'
      );
    }).join('');

    // Tab badge: count of Active tests (so the chip reads "2/3" sort
    // of meaning at a glance — actually just the active count).
    const tab = $('#tab-count-tests');
    if (tab) tab.textContent = active.length + '/' + TEST_TYPE_ORDER.length;
  };

  const initTestsPanel = () => {
    const panel = $('#tests-panel');
    if (!panel) return;
    // Keyboard parity for the row-main expand-zone (role=button +
    // tabindex=0 in the markup). Enter / Space behaves like a click.
    panel.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const zone = e.target.closest('[data-test-expand-zone]');
      if (!zone || e.target !== zone) return;     // only on the wrapper itself
      e.preventDefault();
      const id = zone.getAttribute('data-test-expand-zone');
      const expanded = loadExpandedTests();
      if (expanded.has(id)) expanded.delete(id);
      else                  expanded.add(id);
      saveExpandedTests(expanded);
      renderTestsPanel();
    });
    panel.addEventListener('click', (e) => {
      // ---- Expand / collapse — click anywhere on row-main ---------
      // Whole row main acts as the expand/collapse target. Buttons
      // and switches inside use their own data-attributes which match
      // first below, so they don't fall through into this zone.
      const zone = e.target.closest('[data-test-expand-zone]');
      // Skip the click if it landed on an interactive control inside
      // the zone — toggles, links, future buttons. We need this guard
      // because the zone wraps the whole row-main; without it, every
      // toggle click would also try to expand.
      const inControl = zone && e.target.closest('button, a, [role="switch"], input, select');
      if (zone && !inControl) {
        const id = zone.getAttribute('data-test-expand-zone');
        if (!id) return;
        const expanded = loadExpandedTests();
        if (expanded.has(id)) expanded.delete(id);
        else                  expanded.add(id);
        saveExpandedTests(expanded);
        renderTestsPanel();
        return;
      }
      // ---- Parent test toggle ------------------------------------
      const sw = e.target.closest('[data-test-toggle]');
      if (sw) {
        const id = sw.getAttribute('data-test-toggle');
        const active = loadActiveTests();
        const isActive = active.includes(id);
        let next;
        if (isActive) {
          next = active.filter((t) => t !== id);
          if (next.length === 0) {
            toast('At least one test must stay Active');
            return;
          }
        } else {
          // Preserve TEST_TYPE_ORDER for stable iteration order in the picker.
          next = TEST_TYPE_ORDER.filter((t) => active.includes(t) || t === id);
          // When re-activating a test, ensure it has at least one
          // enabled subject — otherwise the user picker would be a
          // dead UI. Restore the full subject catalog for this test.
          const enabled = loadEnabledSubjects(id);
          if (enabled.length === 0) {
            const cfg = TEST_TYPES[id];
            const all = (cfg && cfg.subjects) ? cfg.subjects.slice() : ['math'];
            saveEnabledSubjects(id, all);
          }
        }
        saveActiveTests(next);
        if (!next.includes(loadSelectedTest())) {
          saveSelectedTest(next[0]);
          assembleBank();
        }
        renderTestsPanel();
        document.dispatchEvent(new CustomEvent('stl:active-tests-changed'));
        return;
      }
      // ---- Child subject toggle ----------------------------------
      const subSw = e.target.closest('[data-subject-toggle]');
      if (subSw) {
        const [testId, subjId] = subSw.getAttribute('data-subject-toggle').split('|');
        const cfg = TEST_TYPES[testId];
        if (!cfg) return;
        const allSubjects = (cfg.subjects && cfg.subjects.length) ? cfg.subjects : ['math'];
        const enabled = new Set(loadEnabledSubjects(testId));
        const wasOn = enabled.has(subjId);
        if (wasOn) enabled.delete(subjId);
        else        enabled.add(subjId);
        const next = allSubjects.filter((s) => enabled.has(s)); // preserve catalog order
        saveEnabledSubjects(testId, next);

        // ---- Cascade --------------------------------------------
        // If we just turned off the LAST enabled subject, the test
        // itself becomes meaningless — flip the parent test off too.
        // But never let the global Active-tests list drop to zero
        // (the entry router needs at least one valid landing test).
        const active = loadActiveTests();
        if (next.length === 0 && active.includes(testId)) {
          if (active.length <= 1) {
            // Only-test guard — keep the subject we just turned off
            // ON to avoid orphaning the whole product.
            enabled.add(subjId);
            saveEnabledSubjects(testId, allSubjects.filter((s) => enabled.has(s)));
            toast('At least one subject must stay enabled on the only Active test');
          } else {
            const newActive = active.filter((t) => t !== testId);
            saveActiveTests(newActive);
            if (!newActive.includes(loadSelectedTest())) {
              saveSelectedTest(newActive[0]);
              assembleBank();
            }
          }
        }
        // If we turned a subject ON for a test that's currently
        // Hidden, flip the test ON too (turning on a child implies
        // wanting the parent visible).
        if (!wasOn && !active.includes(testId)) {
          const newActive = TEST_TYPE_ORDER.filter((t) => active.includes(t) || t === testId);
          saveActiveTests(newActive);
        }

        renderTestsPanel();
        document.dispatchEvent(new CustomEvent('stl:active-tests-changed'));
        return;
      }
      // ---- Reset-to-default composition link --------------------
      // Removes any overrides for this test, falling back to the cfg
      // values in TEST_TYPES. Re-renders so the inputs repopulate.
      const resetBtn = e.target.closest('[data-comp-reset]');
      if (resetBtn) {
        const tid = resetBtn.getAttribute('data-comp-reset');
        if (tid) {
          resetTestComposition(tid);
          renderTestsPanel();
          toast('Reset ' + tid + ' to default composition');
        }
        return;
      }
      // ---- Reset theme color ------------------------------------
      // POSTs tint=<default> so the DB row falls back to the hardcoded
      // cfg.tint. Re-applies the accent + re-renders.
      const tintResetBtn = e.target.closest('[data-tint-reset]');
      if (tintResetBtn) {
        const tid = tintResetBtn.getAttribute('data-tint-reset');
        const defaultTint = (TEST_TYPES[tid] && TEST_TYPES[tid].tint) || '139, 134, 255';
        // Update local cache immediately so the UI reflects the
        // change before the API roundtrip resolves.
        if (!window.__STL_TEST_CONFIG_CACHE__) window.__STL_TEST_CONFIG_CACHE__ = {};
        window.__STL_TEST_CONFIG_CACHE__[tid] = {
          ...(window.__STL_TEST_CONFIG_CACHE__[tid] || {}),
          tint: defaultTint,
        };
        stlApiBackground('PUT', '/api/admin/test-config?id=' + encodeURIComponent(tid),
          { tint: defaultTint });
        // If this is the currently-selected test, repaint the accent.
        if (loadSelectedTest() === tid) applyTestAccent(tid);
        renderTestsPanel();
        toast('Reset ' + tid + ' theme color');
        return;
      }
    });

    // ---- Per-subject count input — live preview + commit ----------
    // 'input' fires on every keystroke; we use it to recompute the
    // sibling %% badges + the row's Length stat against the in-flight
    // values without persisting yet. 'change' (blur / Enter) is the
    // commit point — that's when we write to localStorage.
    //
    // Why split the two? Persisting on every keystroke would (a) hit
    // localStorage on every digit, (b) write half-typed values like
    // `4` when the admin meant `40`, and (c) force a full panel re-
    // render mid-type which yanks focus out of the input. So 'input'
    // is preview-only, 'change' commits.
    const recomputeRowPreview = (rowEl) => {
      const testId = rowEl.getAttribute('data-test');
      if (!testId) return;
      const inputs = rowEl.querySelectorAll('[data-comp-input]');
      // Sum every visible input's value. Negative / NaN counts as 0
      // for the preview — the commit handler still validates strictly.
      let sum = 0;
      const parsed = [];
      inputs.forEach((inp) => {
        const n = Number(inp.value);
        const safe = Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
        parsed.push({ inp, val: safe });
        sum += safe;
      });
      // Update each sibling % chip.
      parsed.forEach(({ inp, val }) => {
        const chip = inp.parentElement.querySelector('.stl-tests-subject__comp-pct');
        if (!chip) return;
        chip.textContent = sum > 0 ? Math.round(val * 100 / sum) + '%' : '—';
      });
      // Update the row's Length stat (the last <dd> in the counts dl).
      const lengthDd = rowEl.querySelector('.stl-tests-row__counts > div:last-of-type dd');
      if (lengthDd) {
        // Keep the unit suffix the renderer originally appended.
        const small = lengthDd.querySelector('small');
        lengthDd.textContent = String(sum);
        if (small) lengthDd.appendChild(small);
        else {
          const s = document.createElement('small');
          s.textContent = ' q';
          lengthDd.appendChild(s);
        }
      }
    };

    panel.addEventListener('input', (e) => {
      const input = e.target.closest('[data-comp-input]');
      if (!input) return;
      const row = input.closest('.stl-tests-row');
      if (row) recomputeRowPreview(row);
    });

    panel.addEventListener('change', (e) => {
      const input = e.target.closest('[data-comp-input]');
      if (!input) return;
      const [testId, subjId] = input.getAttribute('data-comp-input').split('|');
      const cfg = TEST_TYPES[testId];
      if (!cfg) return;
      // Parse + validate.
      const raw = Number(input.value);
      if (!Number.isFinite(raw) || raw < 0 || !Number.isInteger(raw)) {
        toast('Question count must be a whole number ≥ 0');
        renderTestsPanel();   // snap input back to the stored value
        return;
      }
      // Merge with the existing effective mix and persist.
      const eff = getEffectiveTestConfig(testId) || { subjectMix: {} };
      const nextMix = { ...(eff.subjectMix || {}) };
      if (raw === 0) {
        // 0 means "don't include this subject in the quiz" — keep the
        // key so the user can edit it back up; doesn't auto-disable
        // the subject toggle.
        nextMix[subjId] = 0;
      } else {
        nextMix[subjId] = raw;
      }
      updateTestComposition(testId, { subjectMix: nextMix });
      renderTestsPanel();
    });

    // ---- Theme color picker -----------------------------------------
    // The native <input type="color"> fires 'input' on every drag of
    // the eyedropper and 'change' on commit (close of the picker). We
    // listen on both: 'input' previews via applyTestAccent so the
    // admin sees the change live; 'change' POSTs to the API.
    const previewTintLocal = (testId, hex) => {
      const m = (hex || '').match(/^#?([0-9a-f]{6})$/i);
      if (!m) return;
      const n = parseInt(m[1], 16);
      const tint = ((n >> 16) & 0xff) + ', ' + ((n >> 8) & 0xff) + ', ' + (n & 0xff);
      if (!window.__STL_TEST_CONFIG_CACHE__) window.__STL_TEST_CONFIG_CACHE__ = {};
      window.__STL_TEST_CONFIG_CACHE__[testId] = {
        ...(window.__STL_TEST_CONFIG_CACHE__[testId] || {}),
        tint,
      };
      // Update the row's --tile-tint so the wordmark + KPIs repaint
      // immediately without re-rendering the whole panel.
      const row = panel.querySelector('.stl-tests-row[data-test="' + testId + '"]');
      if (row) row.style.setProperty('--tile-tint', tint);
      // Update the swatch chip next to the picker.
      const swatch = panel.querySelector('[data-tint-input="' + testId + '"]')
        ?.closest('.stl-tests-row__color')
        ?.querySelector('.stl-tests-row__color-swatch');
      if (swatch) swatch.style.background = 'rgb(' + tint + ')';
      // If this is the currently-selected test, repaint the global
      // accent too — score screen tier buttons, CTA, etc.
      if (loadSelectedTest() === testId) applyTestAccent(testId);
      return tint;
    };
    panel.addEventListener('input', (e) => {
      const tintInput = e.target.closest('[data-tint-input]');
      if (!tintInput) return;
      previewTintLocal(tintInput.getAttribute('data-tint-input'), tintInput.value);
    });
    panel.addEventListener('change', (e) => {
      const tintInput = e.target.closest('[data-tint-input]');
      if (!tintInput) return;
      const testId = tintInput.getAttribute('data-tint-input');
      const tint = previewTintLocal(testId, tintInput.value);
      if (!tint) return;
      stlApiBackground('PUT', '/api/admin/test-config?id=' + encodeURIComponent(testId),
        { tint });
      // Re-render the row so the Reset link shows up if this isn't the
      // default. Debounced by re-rendering the whole panel — cheap.
      renderTestsPanel();
      toast(testId + ' theme color updated');
    });

    // External listeners — keep the picker grid + score screen up to
    // date when admin toggles change.
    document.addEventListener('stl:active-tests-changed', () => {
      const grid = $('#picker-grid');
      if (grid) initPicker(); // re-render tiles
      renderScoreScreenForTest();
    });
  };

  // Single shared body-level tooltip for any element that opts in via
  // [data-tip]. Positioned via rect math so it escapes any parent
  // overflow:hidden / overflow:auto clip context (the admin table-wrap
  // has overflow-x:auto, which would crop a CSS pseudo-element tip).
  // Strips the native title= on hover-capable devices to avoid double
  // tooltips, and restores it on pointerleave so screen readers + a11y
  // tools still read the original. Bound to the whole document so it
  // works for any future [data-tip] consumer (not just admin icons).
  const initFloatingTooltip = () => {
    if (window._stlTipInited) return;
    window._stlTipInited = true;
    let tipEl = document.getElementById('stl-floating-tip');
    if (!tipEl) {
      tipEl = document.createElement('div');
      tipEl.id = 'stl-floating-tip';
      tipEl.className = 'stl-floating-tip';
      tipEl.setAttribute('role', 'tooltip');
      document.body.appendChild(tipEl);
    }
    let activeEl = null;
    let savedTitle = null;
    const place = (target) => {
      const r = target.getBoundingClientRect();
      const tipR = tipEl.getBoundingClientRect();
      // Default: above the target, centered horizontally.
      let top = r.top - tipR.height - 6;
      let left = r.left + (r.width - tipR.width) / 2;
      // If above-the-target would clip the viewport top, flip below.
      if (top < 4) top = r.bottom + 6;
      // Clamp horizontally so the tip never runs off either edge.
      const margin = 8;
      left = Math.max(margin, Math.min(left, window.innerWidth - tipR.width - margin));
      tipEl.style.top  = top  + 'px';
      tipEl.style.left = left + 'px';
    };
    const show = (target) => {
      const text = target.getAttribute('data-tip');
      if (!text) return;
      activeEl = target;
      // Stash + strip native title to avoid the OS-rendered double tip.
      const t = target.getAttribute('title');
      if (t != null) {
        savedTitle = t;
        target.removeAttribute('title');
      }
      tipEl.textContent = text;
      tipEl.style.opacity = '0';     // measure before placing
      tipEl.setAttribute('data-show', '1');
      // place after layout has measured the new content
      requestAnimationFrame(() => place(target));
    };
    const hide = () => {
      if (activeEl && savedTitle != null) {
        activeEl.setAttribute('title', savedTitle);
      }
      activeEl = null;
      savedTitle = null;
      tipEl.removeAttribute('data-show');
    };
    document.addEventListener('pointerover', (e) => {
      const target = e.target.closest('[data-tip]');
      if (!target || target === activeEl) return;
      show(target);
    });
    document.addEventListener('pointerout', (e) => {
      const target = e.target.closest('[data-tip]');
      if (!target) return;
      // Don't hide on internal moves (e.g. moving over a child SVG).
      const next = e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-tip]');
      if (next === target) return;
      hide();
    });
    // Reposition on scroll/resize while a tip is open so it tracks
    // the moving anchor.
    window.addEventListener('scroll',  () => { if (activeEl) place(activeEl); }, true);
    window.addEventListener('resize',  () => { if (activeEl) place(activeEl); });
    // Keyboard parity — focus shows the tip too.
    document.addEventListener('focusin', (e) => {
      const target = e.target.closest('[data-tip]');
      if (target) show(target);
    });
    document.addEventListener('focusout', () => hide());
  };

  const initAdmin = () => {
    const tbody = $('#admin-tbody');
    if (!tbody) return;

    populateSubjectFilter();
    populateTopicFilter();
    initFloatingTooltip();
    renderAdminTable();
    initUsersTab();
    initTestsPanel();
    renderTestsPanel();    // populate the tab badge even before the user opens the tab
    initImportsTab();
    renderImportsList();   // populate the Imports tab badge on first paint
    initAdminTabs();

    // Sortable headers — click toggles direction or switches column.
    $$('.stl-admin__th--sortable').forEach((th) => {
      th.addEventListener('click', () => {
        const col = th.dataset.sort;
        if (col) setAdminSort(col);
      });
    });

    // Filter inputs
    const onFilterChange = () => {
      adminFilters.search     = $('#admin-search').value;
      adminFilters.state      = $('#admin-filter-state').value;
      // The Source dropdown was removed 2026-05-25 — the AI / Human
      // KPI tile presets still set adminFilters.source. Anything other
      // than 'all' continues to filter correctly via filterAdminQuestions.
      adminFilters.difficulty = $('#admin-filter-difficulty').value;
      adminFilters.topic      = $('#admin-filter-topic').value;
      adminFilters.testType   = $('#admin-filter-test') ? $('#admin-filter-test').value : 'all';
      adminFilters.subject    = $('#admin-filter-subject') ? $('#admin-filter-subject').value : 'all';
      adminFilters.date       = $('#admin-filter-date') ? $('#admin-filter-date').value : 'all';
      renderAdminTable();
    };
    $('#admin-search').addEventListener('input', onFilterChange);
    $('#admin-filter-state').addEventListener('change', onFilterChange);
    $('#admin-filter-difficulty').addEventListener('change', onFilterChange);
    $('#admin-filter-topic').addEventListener('change', onFilterChange);
    const dateFilterSel = $('#admin-filter-date');
    if (dateFilterSel) dateFilterSel.addEventListener('change', onFilterChange);
    // Has-note toggle — button rather than select because it's boolean.
    // aria-pressed mirrors adminFilters.hasNote so screen readers and
    // CSS both pick up the state.
    const hasNoteBtn = $('#admin-filter-has-note');
    if (hasNoteBtn) {
      hasNoteBtn.addEventListener('click', () => {
        adminFilters.hasNote = !adminFilters.hasNote;
        syncFilterControls();
        renderAdminTable();
      });
    }
    const testFilterSel = $('#admin-filter-test');
    if (testFilterSel) testFilterSel.addEventListener('change', onFilterChange);
    // Subject filter — when it changes, also refresh the Topic
    // dropdown so its options narrow to the chosen section. The
    // refresh runs BEFORE re-rendering the table so the topic
    // <select> reflects valid options for the new subject scope.
    const subjectFilterSel = $('#admin-filter-subject');
    if (subjectFilterSel) {
      subjectFilterSel.addEventListener('change', () => {
        adminFilters.subject = subjectFilterSel.value;
        populateTopicFilter();
        adminFilters.topic = $('#admin-filter-topic').value;
        renderAdminTable();
      });
    }

    // KPI tiles double as filter shortcuts — tap "Live" to scope the
    // table to live questions, "AI-generated" for the AI subset, etc.
    // Tap "Total" to clear back to the default Active view. Scoped to
    // the Questions pane so the Users-tab tiles (same class, no
    // filter behavior) don't get bound.
    $$('[data-pane="questions"] button.stl-admin__kpi').forEach((tile) => {
      tile.addEventListener('click', () => {
        const kind = tile.dataset.kind;
        if (kind) applyKpiPreset(kind);
      });
    });

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
      // Archive = soft-delete: hides from default admin view + quiz
      // pool (state filter excludes 'archived'; the quiz pool only
      // serves state === 'live'). Round-trip: Unarchive restores to
      // 'unpublished' so the admin reviews before promoting back to
      // live. This is a single-state model — the prior state is not
      // preserved across the archive/unarchive cycle.
      if (action === 'archive')   setQuestionState(id, 'archived');
      if (action === 'unarchive') setQuestionState(id, 'unpublished');
      if (action === 'edit')      openEditModal(id);
    });

    // Modal close handlers (backdrop click, ×, Cancel, Esc)
    $('#admin-modal').addEventListener('click', (e) => {
      if (e.target.dataset.modalClose === '1') closeEditModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && $('#admin-modal').classList.contains('is-open')) closeEditModal();
    });

    // Topic dropdown — when the user selects "Other…" reveal the
    // freeform input, otherwise hide it. Other unchanged fields stay
    // populated; we only persist on Save.
    const topicSel = $('#edit-topic');
    const otherInput = $('#edit-topic-other');
    if (topicSel && otherInput) {
      topicSel.addEventListener('change', () => {
        if (topicSel.value === '__other__') {
          otherInput.hidden = false;
          otherInput.focus();
        } else {
          otherInput.hidden = true;
        }
      });
    }

    // Figure editor — kind picker + live preview on every keystroke.
    // We debounce the preview slightly (100ms) so a chart-config edit
    // mid-typing doesn't tear down/rebuild a Chart.js canvas every
    // keystroke. The kind picker fires immediately so visible field
    // sets toggle without delay.
    const figureKindSel = $('#edit-figure-kind');
    if (figureKindSel) {
      figureKindSel.addEventListener('change', () => {
        setFigureKindUI(figureKindSel.value);
        renderFigurePreview();
      });
    }
    let figurePreviewTimer = null;
    const schedulePreview = () => {
      clearTimeout(figurePreviewTimer);
      figurePreviewTimer = setTimeout(renderFigurePreview, 100);
    };
    ['#edit-figure-image-url', '#edit-figure-image-alt', '#edit-figure-svg',
     '#edit-figure-chart', '#edit-figure-choice-charts'].forEach((sel) => {
      const el = $(sel);
      if (el) el.addEventListener('input', schedulePreview);
    });

    // Save / Revert
    $('#admin-edit-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = $('#btn-edit-save');
      setButtonLoading(btn, true);
      try {
        // saveEditFromModal is sync today; wrap so future async paths
        // (e.g. awaiting the API roundtrip explicitly) keep the spinner
        // visible without changing the call site.
        await Promise.resolve(saveEditFromModal());
      } finally {
        setButtonLoading(btn, false);
      }
    });
    $('#btn-edit-revert').addEventListener('click', () => {
      if (editingId && confirm('Drop your override and restore this question to its base values?')) {
        revertOverride(editingId);
      }
    });

    // Back button — element was removed from the admin tabs nav,
    // so the listener is now optional. Guard so the missing node
    // doesn't throw during initAdmin().
    const adminBackBtn = document.getElementById('btn-admin-back');
    if (adminBackBtn) {
      adminBackBtn.addEventListener('click', () => showScreen('score', null, 'back'));
    }

    // Reset filters — defers to syncFilterControls() so the dropdowns
    // always reflect ADMIN_FILTERS_DEFAULT, even when defaults shift
    // (state default changed from 'all' to 'active' when archive
    // landed, and the old hardcoded '#admin-filter-state' = 'all' line
    // here drifted out of sync silently).
    const resetBtn = $('#btn-admin-clear-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        adminFilters = { ...ADMIN_FILTERS_DEFAULT };
        syncFilterControls();
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
      const adminBtn = $('#btn-admin-go');
      const devBtn   = $('#btn-dev-test');
      if (user) {
        signInBtn.hidden = true;
        userBlock.hidden = false;
        userEmailEl.textContent = user.email;
        // Repurposed from the old role badge into the dropdown
        // header label. No green admin chrome — the active Admin
        // nav tab is enough indication of role for admins.
        if (userRoleEl) {
          userRoleEl.textContent = user.role === 'admin' ? 'Signed in as admin' : 'Signed in';
        }
        // Surface the Admin shortcut in the header for admins. Hidden
        // for regular users; never rendered for signed-out users.
        if (adminBtn) adminBtn.hidden = user.role !== 'admin';
        // The dev Test button is also admin-gated in addition to the
        // localhost gate set during init. Admins on prod see it; the
        // splash mirrors this via its `data-splash-action="test"` twin.
        if (devBtn && user.role === 'admin') devBtn.hidden = false;
      } else {
        signInBtn.hidden = false;
        userBlock.hidden = true;
        if (adminBtn) adminBtn.hidden = true;
        // Re-hide the dev Test button on sign-out unless we're on localhost
        // (where init kept it visible).
        if (devBtn && !isLocalHost()) devBtn.hidden = true;
      }
      // Admin nav-tab visibility just changed — re-measure the active
      // tab so the underline slides to its new position if the user
      // signed out while on admin (or in if admin is now active).
      if (typeof updateNavIndicator === 'function') updateNavIndicator();
    };

    // User-menu dropdown wiring. Click the trigger to open; click
    // outside, press Escape, or activate any menu item closes it.
    //
    // Stacking context note: .stl-header carries backdrop-filter,
    // which makes the header a stacking context that traps every
    // descendant. The menu panel's z-index can never visually escape
    // its parent's SC, which is exactly the bug Joshua saw — the
    // panel rendered behind the navbar's tinted band. Fix: portal the
    // panel to <body> on open and absolutely position it under the
    // trigger; on close, return it home. Same pattern as the admin
    // modals (see task #27).
    const userMenuTrigger = $('#btn-user-menu');
    const userMenuPanel   = $('#user-menu');
    if (userMenuTrigger && userMenuPanel) {
      // Remember the original parent so we can restore on close —
      // important for screen-reader landmarks + future re-opens.
      const originalParent = userMenuPanel.parentNode;
      // Tag the portaled state so CSS can give it a body-level
      // z-index without affecting the in-header version.
      const PORTAL_CLASS = 'stl-header__usermenu-panel--portaled';

      const positionPanel = () => {
        const r = userMenuTrigger.getBoundingClientRect();
        // 8px gap matches the original `top: calc(100% + 8px)` rule
        // when the panel sat inside .stl-header__usermenu.
        userMenuPanel.style.position = 'fixed';
        userMenuPanel.style.top = (r.bottom + 8) + 'px';
        // Right-align to the trigger's right edge so the panel still
        // hangs from the same corner it always did.
        userMenuPanel.style.right = (window.innerWidth - r.right) + 'px';
        userMenuPanel.style.left = 'auto';
      };

      const openMenu = () => {
        // Move into <body> so we're outside .stl-header's SC.
        if (userMenuPanel.parentNode !== document.body) {
          document.body.appendChild(userMenuPanel);
          userMenuPanel.classList.add(PORTAL_CLASS);
        }
        userMenuPanel.hidden = false;
        positionPanel();
        userMenuTrigger.setAttribute('aria-expanded', 'true');
      };
      const closeMenu = () => {
        userMenuPanel.hidden = true;
        userMenuTrigger.setAttribute('aria-expanded', 'false');
        // Restore the panel to its original home so the DOM stays
        // structurally sound (and so a sign-out tear-down can find it
        // via the original parent).
        if (userMenuPanel.parentNode !== originalParent) {
          originalParent.appendChild(userMenuPanel);
          userMenuPanel.classList.remove(PORTAL_CLASS);
          // Clear inline positioning so the original CSS rules win
          // next time it opens.
          userMenuPanel.style.position = '';
          userMenuPanel.style.top = '';
          userMenuPanel.style.right = '';
          userMenuPanel.style.left = '';
        }
      };
      userMenuTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = userMenuTrigger.getAttribute('aria-expanded') === 'true';
        isOpen ? closeMenu() : openMenu();
      });
      // Reposition on resize/scroll so a sticky-header layout shift
      // doesn't strand the panel.
      window.addEventListener('resize', () => {
        if (userMenuTrigger.getAttribute('aria-expanded') === 'true') positionPanel();
      });
      window.addEventListener('scroll', () => {
        if (userMenuTrigger.getAttribute('aria-expanded') === 'true') positionPanel();
      }, { passive: true });
      // Click outside to dismiss.
      document.addEventListener('click', (e) => {
        if (userMenuTrigger.getAttribute('aria-expanded') !== 'true') return;
        if (userMenuPanel.contains(e.target) || userMenuTrigger.contains(e.target)) return;
        closeMenu();
      });
      // Esc to dismiss.
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && userMenuTrigger.getAttribute('aria-expanded') === 'true') {
          closeMenu();
          userMenuTrigger.focus();
        }
      });
      // Activating any menu item auto-closes (the items handle their
      // own action via their own listeners; this just dismisses the
      // panel after).
      userMenuPanel.addEventListener('click', (e) => {
        if (e.target.closest('.stl-header__usermenu-item')) closeMenu();
      });
    }

    if (signInBtn) {
      signInBtn.addEventListener('click', () => {
        // From any screen, route to the login flow. Capture the
        // current location/screen so post-sign-in we can return here.
        goToLoginScreen();
      });
    }
    if (signOutBtn) {
      signOutBtn.addEventListener('click', async () => {
        await window.STL_AUTH.signOut();
        // Drop the refresh-resume payload so the next user on this tab
        // doesn't land in the previous user's mid-quiz state.
        if (typeof clearResumeState === 'function') clearResumeState();
        toast('Signed out');
        showScreen('score', null, 'back');
      });
    }
    // Admin shortcut — header pill shown to admins only (visibility
    // managed in renderHeaderAuth). Click jumps straight to the
    // admin dashboard, going through requireAdminOrRedirect() so a
    // role downgrade in another tab still gets caught.
    const adminGoBtn = $('#btn-admin-go');
    if (adminGoBtn) {
      adminGoBtn.addEventListener('click', () => {
        if (visibleScreenName() === 'admin') { bounceNavIndicator(); return; }
        if (requireAdminOrRedirect()) showScreen('admin');
      });
    }

    // ---- login screen ----
    const loginForm      = $('#login-form');
    const loginEmail     = $('#login-email');
    const loginHint      = $('#login-hint');
    const loginSubmit    = $('#btn-login-submit');
    const loginPost      = $('#login-post');
    const loginSentEmail = $('#login-sent-email');
    const loginDemoBlk   = $('#login-demo');
    const loginDemoLnk   = $('#login-demo-link');
    const loginBack      = $('#btn-login-back');
    const loginResend    = $('#btn-login-resend');
    const loginResendLbl = $('#login-resend-label');
    const modeTag        = $('#login-mode-tag');

    // Track the email currently in the sent state so Resend has a
    // target. Track a cooldown so the button can't be spammed.
    let lastSentEmail = '';
    let cooldownEnd   = 0;
    let cooldownTimer = null;

    const RESEND_COOLDOWN_MS = 30 * 1000;

    const stopCooldown = () => {
      if (cooldownTimer) { clearInterval(cooldownTimer); cooldownTimer = null; }
    };
    const tickCooldown = () => {
      if (!loginResend) return;
      const remaining = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000));
      if (remaining <= 0) {
        loginResend.disabled = false;
        loginResendLbl.textContent = 'Resend email';
        stopCooldown();
      } else {
        loginResend.disabled = true;
        loginResendLbl.textContent = 'Resend in ' + remaining + 's';
      }
    };
    const startCooldown = () => {
      cooldownEnd = Date.now() + RESEND_COOLDOWN_MS;
      stopCooldown();
      tickCooldown();
      cooldownTimer = setInterval(tickCooldown, 1000);
    };

    const showLoginForm = () => {
      // Reset the form to its initial editable state.
      loginPost.classList.remove('is-revealed');
      loginPost.hidden = true;
      loginSubmit.dataset.state = 'idle';
      loginSubmit.disabled = false;
      loginEmail.disabled = false;
      loginEmail.readOnly = false;
      loginHint.textContent = "We never share or sell your email.";
      loginHint.classList.remove('is-error');
      stopCooldown();
      // Pre-fill the input with the last email so a tiny typo
      // correction doesn't require re-typing the whole thing.
      if (lastSentEmail) loginEmail.value = lastSentEmail;
      // Focus the input so a quick edit + Enter completes the loop.
      setTimeout(() => loginEmail.focus(), 30);
    };

    const showLoginSent = ({ email, devLink }) => {
      // Don't hide the form — morph it. Button changes color/label,
      // input locks (with a one-shot lavender pulse), post-send block
      // staggers in below.
      lastSentEmail = email;
      loginSentEmail.textContent = email;

      // Re-trigger the input-lock pulse animation by toggling readOnly.
      // (Setting readOnly when it's already true wouldn't restart the
      // animation; clearing first then reapplying does.)
      loginEmail.readOnly = false;
      void loginEmail.offsetWidth;     // force reflow
      loginEmail.readOnly = true;

      loginSubmit.dataset.state = 'sent';
      loginSubmit.disabled = true;

      // Fallback path: server returned a devLink (Resend not configured
      // or send failed). Surface the link on-page so sign-in still works.
      if (devLink) {
        loginDemoBlk.hidden = false;
        loginDemoLnk.href = devLink;
      } else {
        loginDemoBlk.hidden = true;
      }

      // Reveal the post-send block with a stagger animation. Toggle
      // `is-revealed` off then back on after a reflow so the animation
      // re-runs on every Send / Resend (otherwise CSS would only animate
      // on first reveal, since the element stays in the DOM).
      loginPost.classList.remove('is-revealed');
      loginPost.hidden = false;
      void loginPost.offsetWidth;       // force reflow before re-adding class
      loginPost.classList.add('is-revealed');

      startCooldown();
    };

    // Mode tag (footer of the auth card). Hidden in prod-with-real-
    // backend; shown only in demo mode as a "you're using local
    // storage" reminder. Avoids confusing copy when emails work.
    const updateModeTag = () => {
      if (!modeTag) return;
      if (window.STL_AUTH.mode === 'demo') {
        modeTag.hidden = false;
        modeTag.textContent = 'Demo mode · per-browser auth · no emails sent';
      } else {
        modeTag.hidden = true;
      }
    };

    const requestMagicLink = async (email) => {
      const res = await window.STL_AUTH.requestMagicLink(email);
      if (!res.ok) {
        loginHint.textContent = res.error === 'invalid-email'
          ? 'That doesn’t look like a valid email.'
          : 'Couldn’t send the link. Try again.';
        loginHint.classList.add('is-error');
        return false;
      }
      showLoginSent({ email, devLink: res.devLink });
      return true;
    };

    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        setButtonLoading(loginSubmit, true);
        try { await requestMagicLink(loginEmail.value.trim()); }
        finally { setButtonLoading(loginSubmit, false); }
      });
    }
    if (loginBack) {
      loginBack.addEventListener('click', showLoginForm);
    }
    if (loginResend) {
      loginResend.addEventListener('click', async () => {
        if (loginResend.disabled || !lastSentEmail) return;
        setButtonLoading(loginResend, true);
        try { await requestMagicLink(lastSentEmail); }
        finally { setButtonLoading(loginResend, false); }
        toast('Magic link resent');
      });
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
    if (forbiddenSignin) forbiddenSignin.addEventListener('click', () => goToLoginScreen());
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

  // ============================================================
  // Screen + quiz state persistence (refresh resume)
  // ============================================================
  // Keep the user where they were across a page refresh. Stored in
  // sessionStorage so it survives reload, dies with the tab, and never
  // leaks between users on a shared device. Distinct from the sign-in
  // intent system (that's for "after I sign in, route me back" — this
  // is for "I just hit refresh, take me where I was").
  //
  // What we persist:
  //   • screen   — visible screen name (splash/picker/score/quiz/review/results/regen/history/analysis/admin)
  //   • quiz     — full mid-test state when on the quiz screen:
  //                { testQids, answers, cursor, score, tiers,
  //                  includeLower, testStartedAt, totalElapsedSnapshot }
  //   • review   — { reviewCursor, activeReviewBucket } for review walk-through
  //   • results  — current attempt id so revisiting results shows the right one
  //   • history  — filter chip selection
  //
  // What we DON'T persist:
  //   • login screen — sign-in flows route differently post-auth
  //   • admin screen — refreshing admin re-runs the role gate
  const STL_RESUME_KEY = 'stl_resume_state';
  const STL_RESUME_TTL_MS = 24 * 60 * 60 * 1000;  // 24h — stale tabs

  const saveResumeState = () => {
    try {
      const screen = visibleScreenName();
      if (!screen || screen === 'login') {
        // login screen handles its own restore via the sign-in intent
        // system; persisting "login" here would re-route signed-out
        // refreshes to the login screen on every load.
        return;
      }
      const payload = { screen, at: Date.now() };
      if (screen === 'quiz' && state.test && state.test.length > 0) {
        payload.quiz = {
          testQids: state.test.map((q) => q.id),
          // Drop the verbose snap fields on each answer — we restore
          // questions by qid from the live bank, not from a snapshot.
          // Keep picked/signal/correct/perm because they're what the
          // user already entered.
          answers: state.answers.map((a) => ({
            qid: a.qid, picked: a.picked, signal: a.signal,
            correct: a.correct, perm: a.perm,
          })),
          cursor: state.cursor || 0,
          score: state.score || 0,
          tiers: state.tiers ? state.tiers.slice() : [],
          includeLower: loadIncludeLower(),
          testStartedAt: state.testStartedAt || null,
          // Capture the timer offset so restore doesn't drop elapsed time.
          totalElapsedSnapshot: typeof totalElapsedMs === 'function' ? totalElapsedMs() : 0,
        };
      } else if (screen === 'review' && state.reviewItems && state.reviewItems.length > 0) {
        payload.review = {
          reviewCursor: state.reviewCursor || 0,
          activeReviewBucket: state.activeReviewBucket || null,
          // Reviewing requires the test array to hydrate questions; same
          // qid-list approach as quiz.
          testQids: state.test.map((q) => q.id),
          answers: state.answers.map((a) => ({
            qid: a.qid, picked: a.picked, signal: a.signal,
            correct: a.correct, perm: a.perm,
          })),
          score: state.score || 0,
        };
      } else if (screen === 'history' || screen === 'analysis') {
        // Both pages share the same filter chip — persist once.
        payload.history = { filter: historyFilter || 'all' };
      } else if (screen === 'results' && state.currentAttemptId) {
        // Refreshing on a results screen restores via attempt id.
        // Shared attempts (?a= URLs) aren't local so they're skipped here
        // — they re-hydrate from the URL on next boot via the existing
        // ?a= handler.
        payload.results = { attemptId: state.currentAttemptId };
      }
      sessionStorage.setItem(STL_RESUME_KEY, JSON.stringify(payload));
    } catch (_) { /* sessionStorage disabled or quota exceeded */ }
  };

  const loadResumeState = () => {
    try {
      const raw = sessionStorage.getItem(STL_RESUME_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.at || Date.now() - data.at > STL_RESUME_TTL_MS) {
        sessionStorage.removeItem(STL_RESUME_KEY);
        return null;
      }
      return data;
    } catch (_) { return null; }
  };

  const clearResumeState = () => {
    try { sessionStorage.removeItem(STL_RESUME_KEY); } catch (_) {}
  };

  // Resume any persisted state on boot. Called AFTER auth init so
  // sign-in routing has had its turn (sign-in intent takes precedence).
  // Returns true if a resume was applied, false otherwise.
  const restoreResumeStateIfAny = () => {
    const data = loadResumeState();
    if (!data || !data.screen) return false;
    const screen = data.screen;
    try {
      // Quiz mid-test — hydrate state.test by looking up each qid in
      // the live bank, then restore the cursor and answers.
      if (screen === 'quiz' && data.quiz) {
        const all = window.STL_QUESTIONS_ALL || window.STL_QUESTIONS || [];
        const byId = new Map(all.map((q) => [q.id, q]));
        const test = (data.quiz.testQids || []).map((id) => byId.get(id)).filter(Boolean);
        // If any question got deleted between sessions, bail to safety
        // rather than serving a malformed quiz.
        if (test.length !== (data.quiz.testQids || []).length) {
          clearResumeState();
          return false;
        }
        state.test = test;
        state.answers = data.quiz.answers || [];
        state.cursor = Math.min(data.quiz.cursor || 0, test.length - 1);
        state.score = data.quiz.score || 0;
        state.tiers = data.quiz.tiers || [];
        // Restore the testStartedAt so the timer can continue from where
        // it was when the page was refreshed. We can't keep ticking
        // through the refresh — the elapsed snapshot was the last time
        // we saw it — so set testStartedAt back-dated by that snapshot.
        const snap = data.quiz.totalElapsedSnapshot || 0;
        state.testStartedAt = Date.now() - snap;
        state.testEndedAt = null;
        if (typeof startTimer === 'function') startTimer();
        // Pass direction='none' so the boot-time restore instantly
        // swaps screens without animating. Otherwise we see the boot
        // default (score) briefly, then a View Transition slides over
        // to the restored screen — reads as a flash on every refresh.
        showScreen('quiz', renderQuestion, 'none');
        return true;
      }
      if (screen === 'review' && data.review) {
        const all = window.STL_QUESTIONS_ALL || window.STL_QUESTIONS || [];
        const byId = new Map(all.map((q) => [q.id, q]));
        const test = (data.review.testQids || []).map((id) => byId.get(id)).filter(Boolean);
        if (test.length !== (data.review.testQids || []).length) {
          clearResumeState();
          return false;
        }
        state.test = test;
        state.answers = data.review.answers || [];
        state.score = data.review.score || 0;
        // Rebuild reviewItems in the same order showResults built it
        // (mastery → lucky → toReview), then jump to the saved cursor.
        const mastery = state.answers.filter((a) => a.correct && a.signal === 'green');
        const lucky   = state.answers.filter((a) => a.correct && a.signal !== 'green');
        const missed  = state.answers.filter((a) => !a.correct);
        state.reviewItems = [...mastery, ...lucky, ...missed].map((a) => ({
          ...a, question: test.find((q) => q.id === a.qid),
        }));
        state.reviewBucketCounts = { trueMastery: mastery.length, correct: mastery.length + lucky.length, lucky: lucky.length, toReview: missed.length };
        state.reviewCursor = Math.min(data.review.reviewCursor || 0, state.reviewItems.length - 1);
        state.activeReviewBucket = data.review.activeReviewBucket || null;
        showScreen('review', renderReview, 'none');
        return true;
      }
      if (screen === 'history') {
        if (data.history && data.history.filter) historyFilter = data.history.filter;
        renderHistory();
        showScreen('history', null, 'none');
        return true;
      }
      if (screen === 'analysis') {
        if (data.history && data.history.filter) historyFilter = data.history.filter;
        renderAnalysis();
        showScreen('analysis', null, 'none');
        return true;
      }
      // Score/picker/results screens have their own state already in
      // localStorage (selected test, last attempt, etc.) — just route
      // there. results without an attempt fall through to splash.
      if (screen === 'score' || screen === 'picker') {
        showScreen(screen, null, 'none');
        return true;
      }
      if (screen === 'results') {
        // First-load state.test is empty, so the old guard failed and
        // refreshing on results dumped the user to the picker. Now we
        // restore by attempt id from the saved payload — works for
        // BOTH a fresh attempt the user just completed AND a past
        // attempt opened from history (both stamp state.currentAttemptId
        // and then save the resume payload).
        const attemptId = data.results && data.results.attemptId;
        if (attemptId && typeof loadAttempts === 'function' &&
            typeof hydrateFromAttempt === 'function') {
          const att = loadAttempts().find((a) => a.id === attemptId);
          if (att && hydrateFromAttempt(att, { skipSave: true })) {
            // hydrateFromAttempt already calls showResults({ skipSave }).
            return true;
          }
        }
        // Fallback: if we're somehow already mid-state (state.test
        // populated by another path), re-render. Otherwise clear the
        // stale payload so subsequent refreshes don't keep trying.
        if (state.test && state.test.length > 0) {
          showResults({ skipSave: true });
          return true;
        }
        clearResumeState();
        return false;
      }
      // Admin — role-gate at restore time. If the user is still an
      // admin, route them straight back to the admin screen. If the
      // role was revoked, the requireAdminOrRedirect path will route
      // to login or forbidden instead of admin (good — don't strand
      // a downgraded user on a screen they can't view).
      if (screen === 'admin') {
        if (typeof requireAdminOrRedirect === 'function' && requireAdminOrRedirect()) {
          showScreen('admin', null, 'none');
          return true;
        }
        return true;
      }
    } catch (_) { clearResumeState(); }
    return false;
  };

  // ============================================================
  // Sign-in intent capture / restore
  // ============================================================
  // Three behaviors we want after sign-in:
  //   1. Returning user with attempts → land on History.
  //   2. User mid-flow (e.g., configuring a test on score screen) →
  //      resume that screen with state intact.
  //   3. Deep-linked URL (?a=…, ?admin=1, etc.) → land back at that URL.
  //
  // We capture the current URL + visible screen whenever we route
  // someone to login, then restore it after sign-in succeeds. The
  // Google flow does a full reload after sign-in, so this lives in
  // sessionStorage (survives reload, scoped to the tab, auto-cleaned
  // when the tab closes).
  //
  // 15-minute TTL — stale intents shouldn't hijack a fresh sign-in.
  const SIGN_IN_INTENT_KEY = 'stl_sign_in_intent';
  const SIGN_IN_INTENT_TTL = 15 * 60 * 1000;

  const captureSignInIntent = (extras) => {
    try {
      const intent = Object.assign({
        pathname: location.pathname,
        search:   location.search,
        hash:     location.hash,
        screen:   visibleScreenName(),
        at:       Date.now(),
      }, extras || {});
      sessionStorage.setItem(SIGN_IN_INTENT_KEY, JSON.stringify(intent));
    } catch (_) {}
  };

  const consumeSignInIntent = () => {
    try {
      const raw = sessionStorage.getItem(SIGN_IN_INTENT_KEY);
      if (!raw) return null;
      sessionStorage.removeItem(SIGN_IN_INTENT_KEY);
      const intent = JSON.parse(raw);
      if (!intent || !intent.at || Date.now() - intent.at > SIGN_IN_INTENT_TTL) return null;
      return intent;
    } catch (_) { return null; }
  };

  // Wrapper that captures intent BEFORE navigating to login. Use
  // everywhere `showScreen('login')` is called (instead of calling
  // it directly) so the post-sign-in restore has everything it needs.
  const goToLoginScreen = (extras) => {
    captureSignInIntent(extras);
    showScreen('login');
  };

  // Route the just-signed-in user to the right place.
  // Precedence:
  //   1. Captured intent (URL different from now → redirect; same URL
  //      → restore captured screen).
  //   2. User has past attempts → History.
  //   3. Default → entry screen (picker or score, depending on # active tests).
  const routePostSignIn = () => {
    const intent = consumeSignInIntent();
    if (intent) {
      const intentUrl = intent.pathname + (intent.search || '') + (intent.hash || '');
      const nowUrl    = location.pathname + (location.search || '') + (location.hash || '');
      if (intentUrl !== nowUrl) {
        // Different URL → reload to that URL so deep-link handlers
        // (?a=, ?admin=1, etc.) re-fire from a clean boot.
        location.replace(intentUrl);
        return true;
      }
      // Same URL → restore the captured screen if it's a usable one.
      // Skip:
      //   • 'login' — pointless to bounce back to the screen we just left
      //   • 'splash' — the post-sign-in default rule (History or entry
      //     screen) is a better destination than "click Get Started again"
      const restorableScreens = new Set(['picker', 'score', 'quiz', 'review', 'results', 'regen', 'history', 'analysis', 'admin']);
      if (intent.screen && restorableScreens.has(intent.screen)) {
        // Admin requires a role re-check before showing.
        if (intent.screen === 'admin') {
          if (requireAdminOrRedirect()) showScreen('admin');
          return true;
        }
        if (intent.screen === 'history')  renderHistory();   // populate before showing
        if (intent.screen === 'analysis') renderAnalysis();
        showScreen(intent.screen);
        return true;
      }
    }
    // No actionable intent → fall through to default rule.
    return false;
  };

  // Default post-sign-in destination when no specific intent was
  // captured. Users with prior attempts land on History (they want to
  // see their progress); first-timers land on the regular entry
  // screen (picker if multiple tests are Active, score otherwise).
  const defaultPostSignInScreen = () => {
    try {
      if (typeof loadAttempts === 'function' && loadAttempts().length > 0) {
        renderHistory();
        return 'history';
      }
    } catch (_) {}
    return entryScreenName();
  };

  // Role gate for the admin screen — call before navigating to admin.
  // Returns true if the user can view; false otherwise (and routes
  // to login or forbidden as appropriate).
  const requireAdminOrRedirect = () => {
    const user = window.STL_AUTH ? window.STL_AUTH.getCurrentUser() : null;
    if (!user) {
      // Capture the admin URL so post-sign-in we route back to it.
      goToLoginScreen({ adminPending: true });
      return false;
    }
    if (user.role !== 'admin') {
      showScreen('forbidden');
      return false;
    }
    return true;
  };

  // ----- boot ------------------------------------------------------------
  // app.js is now injected by bank-loader.js AFTER its API fetch resolves,
  // which means DOMContentLoaded has almost always already fired by the
  // time this script executes. addEventListener('DOMContentLoaded', …)
  // would silently never fire in that case, leaving the picker grid empty
  // (the cards never populate). Guard with a readyState check: if DOM is
  // already ready, run the boot inline.
  const __stlBoot = () => {
    // The bank is intentionally EMPTY at boot now — bank-loader.js
    // ships only the test_config snapshot, and per-test questions are
    // fetched lazily on test selection (see renderScoreScreenForTest).
    // The old "No questions loaded" hijack assumed the legacy static
    // bank files were always loaded by this point. Removing the guard:
    // the picker renders fine without a bank, and the score screen's
    // own loader handles the per-test fetch + spinner.
    //
    // True hard-failure surface: if the bank-loader didn't even
    // populate the test_config cache, the picker has nothing to show.
    // Catch that narrow case here.
    const tcCache = window.__STL_TEST_CONFIG_CACHE__ || {};
    if (Object.keys(tcCache).length === 0) {
      $('#stl-main').innerHTML =
        '<div class="stl-card stl-card--hero" style="padding:24px"><h2>Couldn\'t load tests.</h2>' +
        '<p>Refresh the page. If this keeps happening, the bank loader failed to initialize.</p></div>';
      return;
    }
    initPicker();
    initScore();
    initQuiz();
    initResults();
    initReview();
    initRegen();
    initRestart();
    initHistory();
    initAnalysis();
    initAdmin();
    initAddModal();
    initAuth();
    initMobileNav();

    // Boot-time accent paint. initScore already painted the test
    // accent (via renderScoreScreenForTest) but if the boot router
    // landed on splash or picker — where no test has been chosen yet —
    // we want the neutral white accent for dots/glows/hover so the
    // previous session's test color doesn't leak into the picker.
    const bootScreen = ['splash', 'picker', 'score'].find((s) => {
      const el = document.querySelector(`[data-screen="${s}"]`);
      return el && !el.hidden;
    });
    if (bootScreen === 'splash' || bootScreen === 'picker') {
      applyNeutralAccent();
    }
    // Hide the Highlight (math-color) toggle at boot — it should only
    // appear once the user is inside a quiz/review/results/regen flow.
    // The user's preference itself is still persisted via MATH_COLOR_KEY,
    // so toggling later survives across sessions even though the button
    // isn't visible at boot. showScreen() repaints visibility on nav.
    const mathColorBtnInit = $('#btn-toggle-math-color');
    if (mathColorBtnInit) {
      mathColorBtnInit.hidden = !(bootScreen === 'quiz' || bootScreen === 'review' || bootScreen === 'results' || bootScreen === 'regen');
    }

    // Add Questions button on the admin screen.
    const addBtn = $('#btn-admin-add');
    if (addBtn) addBtn.addEventListener('click', openAddModal);

    // Math color toggle in the header. Pref already applied at IIFE
    // boot above; this just wires the click handler. CSS handles the
    // visual change — no re-render needed.
    const mathColorBtn = $('#btn-toggle-math-color');
    if (mathColorBtn) {
      mathColorBtn.addEventListener('click', () => {
        const next = !loadMathColorPref();
        saveMathColorPref(next);
        applyMathColorPref(next);
      });
    }

    // Theme toggle (Dark ↔ Light). Pref already applied at boot via
    // an inline script in <head>, which prevents a dark flash for
    // light-mode users. This wires the click handler + keeps the
    // label in sync. CSS handles all the actual color flips through
    // :root[data-theme="light"] token overrides.
    const themeBtn   = $('#btn-toggle-theme');
    const themeLbl   = $('#btn-toggle-theme-lbl');
    const THEME_KEY  = 'stl_theme';
    const loadTheme  = () => {
      try { return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'; }
      catch (_) { return 'dark'; }
    };
    const applyTheme = (theme) => {
      const root = document.documentElement;
      if (theme === 'light') root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      if (themeBtn) {
        themeBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
        themeBtn.setAttribute('aria-label',
          theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      }
      // Label always describes the destination, not the current state —
      // matches the "Dark mode" / "Light mode" UX in macOS / VS Code etc.
      if (themeLbl) themeLbl.textContent = (theme === 'light') ? 'Dark mode' : 'Light mode';
    };
    // Sync UI to whatever the inline boot script already applied.
    applyTheme(loadTheme());
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const next = loadTheme() === 'light' ? 'dark' : 'light';
        try { localStorage.setItem(THEME_KEY, next); } catch (_) {}
        applyTheme(next);
      });
    }

    // Google Identity Services — render the official "Sign in with
    // Google" button into the login screen. The GSI script loads
    // async; this poller waits up to 5 seconds, then surfaces a
    // fallback message if it never showed up (network blocked, ad-
    // blocker, etc.). The Client ID lives in the <meta> tag in
    // index.html so both this code and the html-shipped button find
    // the same value.
    const initGoogleSignIn = (() => {
      let initialized = false;
      const clientIdMeta = document.querySelector('meta[name="google-signin-client_id"]');
      const clientId = clientIdMeta ? clientIdMeta.content : '';
      const handleCredential = async (response) => {
        if (!response || !response.credential) return;
        try {
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ credential: response.credential }),
          });
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            toast(({
              'google-not-configured': 'Google sign-in not configured',
              'aud-mismatch':          'Google client ID mismatch',
              'token-expired':         'Google token expired — try again',
              'email-not-verified':    'Your Google email must be verified',
              'signature-invalid':     'Could not verify Google token',
            })[data.error] || 'Google sign-in failed');
            return;
          }
          // Successful sign-in. Re-attribute any guest-tagged attempts
          // on this device to the user's email (same step magic-link
          // does). The session cookie is already set by the backend.
          //
          // Routing precedence:
          //   1. If a captured sign-in intent points to a DIFFERENT URL
          //      → reload there (deep-link return). consumeSignInIntent
          //      inside routePostSignIn handles this and returns true.
          //   2. Same URL but a captured screen → restore that screen.
          //   3. No captured intent → user with attempts → History;
      //          first-timer → entry screen (picker or score).
          migrateGuestToUser(data.email);
          if (window.STL_AUTH && typeof window.STL_AUTH.init === 'function') {
            await window.STL_AUTH.init();
          }
          if (routePostSignIn()) return;     // either redirected or restored a screen
          const dest = defaultPostSignInScreen();
          showScreen(dest);
          return;
        } catch (e) {
          console.warn('google sign-in error', e);
          toast('Network error — try again');
        }
      };

      const renderButton = () => {
        if (initialized) return true;
        if (!clientId) return false;
        if (!window.google || !window.google.accounts || !window.google.accounts.id) return false;
        const host = $('#google-signin-host');
        if (!host) return false;
        try {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredential,
            ux_mode: 'popup',
            auto_select: false,
          });
          window.google.accounts.id.renderButton(host, {
            type: 'standard',
            theme: 'filled_black',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left',
            width: 320,
          });
          initialized = true;
          return true;
        } catch (e) {
          console.warn('GSI init failed:', e);
          return false;
        }
      };

      return (forceReRender) => {
        // Caller can force a fresh render (used when the login screen
        // becomes visible — GSI's iframe doesn't recover well from
        // being mounted into a 0x0 hidden parent, so we re-render once
        // we know the host is visible).
        if (forceReRender) {
          const host = $('#google-signin-host');
          if (host) host.innerHTML = '';
          initialized = false;
        }
        if (renderButton()) return;
        // Script not loaded yet — poll for ~5s, then surface fallback.
        const t0 = Date.now();
        const timer = setInterval(() => {
          if (renderButton()) { clearInterval(timer); return; }
          if (Date.now() - t0 > 5000) {
            clearInterval(timer);
            const fb = $('#google-signin-fallback');
            if (fb) fb.hidden = false;
          }
        }, 200);
      };
    })();
    initGoogleSignIn();
    // Re-render the Google button whenever the login screen becomes
    // visible. GSI's iframe is created with 0x0 dimensions when its
    // parent is display:none, and doesn't auto-resize when the parent
    // shows. Re-rendering produces a fresh iframe sized correctly.
    document.addEventListener('stl:screen-changed', (e) => {
      if (e.detail && e.detail.name === 'login') {
        initGoogleSignIn(true);
      }
    });

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
        if (res.ok) {
          // Re-attribute any guest-tagged or legacy attempts on this
          // device to the user's email — they ARE that user, finally
          // identified.
          const migrated = migrateGuestToUser(res.user.email);
          if (migrated > 0) {
            toast('Signed in · linked ' + migrated + ' prior attempt' + (migrated === 1 ? '' : 's'));
          } else {
            toast('Signed in as ' + res.user.email);
          }
        } else {
          toast('That magic link is no longer valid');
        }
      }
      // Post-verification routing. Apply for any path that just signed
      // the user in (magic link, future flows). Precedence:
      //   1. ?admin=1 deep-link → admin screen (role-gated)
      //   2. captured sign-in intent (from sessionStorage) → restore
      //   3. user with attempts → History
      //   4. first-timer → entry screen
      // Skip when there was no login token to verify — that means this
      // is just a regular page load and the normal initial render
      // already showed the right screen.
      if (loginToken) {
        if (params.get('admin') === '1') {
          if (requireAdminOrRedirect()) setTimeout(() => showScreen('admin'), 0);
        } else if (!routePostSignIn()) {
          // No captured intent. Default by history presence.
          const dest = defaultPostSignInScreen();
          setTimeout(() => showScreen(dest), 0);
        }
      } else if (params.get('admin') === '1') {
        if (requireAdminOrRedirect()) {
          setTimeout(() => showScreen('admin'), 0);
        }
      } else {
        // Plain page load (no login token, no admin route). Try to
        // restore the user to wherever they were before refresh.
        // Runs after a microtask so the initial screen render settles
        // first — otherwise the restored screen flashes briefly behind
        // the default boot screen.
        setTimeout(() => {
          if (typeof restoreResumeStateIfAny === 'function') restoreResumeStateIfAny();
        }, 0);
      }
    });

    // History header button — re-renders the list every time you visit
    // so it picks up new attempts without a page reload. Clicking it
    // while already on the history page would no-op the navigation,
    // which feels dead — so play a small underline bounce instead
    // as "yep, you're here" feedback.
    const historyBtn = $('#btn-history');
    if (historyBtn) {
      historyBtn.addEventListener('click', () => {
        if (visibleScreenName() === 'history') { bounceNavIndicator(); return; }
        renderHistory();
        showScreen('history');
      });
    }

    // Analysis header button — re-renders the radar + S/W on each
    // visit so a freshly-finished test shows up immediately.
    const analysisBtn = $('#btn-analysis');
    if (analysisBtn) {
      analysisBtn.addEventListener('click', () => {
        if (visibleScreenName() === 'analysis') { bounceNavIndicator(); return; }
        renderAnalysis();
        showScreen('analysis');
      });
    }

    // "New test" header CTA — always routes through the test-type
    // picker so users get the explicit "which test?" step every time
    // they start fresh. Even with only one active test it's worth a
    // confirming click rather than dropping straight into the score
    // screen for that test (which feels like skipping a step). Forces
    // the forward slide so it always reads as "starting something new".
    // New test CTA click handler. If the user is in the middle of a
    // quiz or review, confirm before abandoning their progress —
    // clicking "New test" from quiz/review wipes the in-flight test
    // state, kills the timer, and routes to the picker. From any
    // other screen it's just a direct route.
    const newTestBtn = $('#btn-new-test');
    if (newTestBtn) {
      newTestBtn.addEventListener('click', () => {
        const current = visibleScreenName();
        if (current === 'quiz' || current === 'review') {
          if (!confirm('Abandon this test and start a new one? Your progress will be lost.')) {
            return;
          }
          // Wipe the in-flight test exactly the way the quiz Close
          // button does so the abandoned state can't be resumed.
          state.test = [];
          state.answers = [];
          state.cursor = 0;
          state.testStartedAt = null;
          state.testEndedAt   = null;
          if (typeof clearTimer === 'function') clearTimer();
          if (typeof clearResumeState === 'function') clearResumeState();
        }
        showScreen('picker', null, 'forward');
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

    // ?preview-question=<id> → open the live quiz UI on that one
    // question as if the user were a participant. Used by the "Participant
    // view" button in the admin Review modal so the reviewer can sanity
    // check what students will see (figure layout, math rendering,
    // choice order, traffic-light feedback after answering) without
    // taking a real attempt.
    //
    // The window.__STL_PREVIEW_MODE__ flag also tells saveAttempt() to
    // skip persisting, so previewing doesn't pollute the user's history
    // or analysis metrics. The mode banner mounts above the quiz top
    // bar so the previewer is never confused about whether they're in
    // a real attempt.
    const previewQid = params.get('preview-question');
    if (previewQid) {
      window.__STL_PREVIEW_MODE__ = true;
      // The question may be hidden (state==='deleted' or state==='archived')
      // and therefore missing from STL_QUESTIONS_ALL. Reconstruct from
      // the raw bank + override so the reviewer can preview ANY question
      // — including deleted ones — exactly as a participant would see
      // it if the question were live.
      const raw = [].concat(
        window.STL_QUESTIONS_HUMAN || [],
        window.STL_QUESTIONS_AI    || [],
        window.STL_QUESTIONS_ISEE  || [],
        window.STL_QUESTIONS_ACT   || [],
        window.STL_QUESTIONS_PSAT  || [],
        window.STL_QUESTIONS_SSAT  || [],
        window.STL_QUESTIONS_HSPT  || [],
        loadAdminAdded()
      );
      const base = raw.find((x) => x && x.id === previewQid);
      const ov = (loadAdminOverrides()[previewQid] || {});
      const q = base ? { ...base, ...ov } : null;
      if (q) {
        // Stage minimum quiz state so renderQuestion() works as-is.
        state.test = [q];
        state.cursor = 0;
        state.previewMode = true;
        state.attemptStartedAt = Date.now();
        // Mount the preview banner. Lazy-create so we don't bloat the
        // markup for every non-preview load.
        if (!document.querySelector('#preview-banner')) {
          const banner = document.createElement('div');
          banner.id = 'preview-banner';
          banner.className = 'stl-preview-banner';
          banner.innerHTML =
            '<span class="stl-preview-banner__badge">PREVIEW</span>' +
            '<span class="stl-preview-banner__text">Participant view of <code>' + escapeHtml(previewQid) + '</code> — answers won\'t be saved to history.</span>' +
            '<button type="button" class="stl-preview-banner__close" id="btn-preview-close" aria-label="Close preview">Close</button>';
          document.body.insertBefore(banner, document.body.firstChild);
          document.querySelector('#btn-preview-close').addEventListener('click', () => window.close());
        }
        showScreen('quiz', renderQuestion);
        // Bail out of any other boot-time routing — preview owns the
        // viewport.
        return;
      } else {
        toast('Preview: question "' + previewQid + '" not found in this bank.');
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
      devBtn.title = 'Dev: synthetic test + populate history (Shift+click = seed history only, no nav)';
      devBtn.addEventListener('click', (e) => {
        // Always populate history with a spread of attempts across all
        // test types so the History list and Analysis radar have
        // material to render. Shift-click skips the results screen so
        // you can stay on the current page while seeding.
        seedDevAttempts();
        if (e.shiftKey) return;
        runDevTest();
      });
    }

    // First-visit auto-seed on localhost. When you're developing and
    // hit the page fresh, you want History + Analysis to actually have
    // multi-test data without having to click anything. A one-shot
    // localStorage flag prevents re-seeding on every reload — clear it
    // (or call STL_DEV.resetSeed()) to seed again.
    if (isLocalHost() && typeof seedDevAttempts === 'function') {
      try {
        const SEED_FLAG = 'stl_dev_seeded_v1';
        const seeded = localStorage.getItem(SEED_FLAG);
        const have = (loadAttempts() || []).length;
        if (!seeded && have < 2) {
          console.log('[stl seed] auto-seeding dev attempts on first localhost visit');
          seedDevAttempts();
          try { localStorage.setItem(SEED_FLAG, String(Date.now())); } catch (_) {}
        }
        window.STL_DEV = window.STL_DEV || {};
        window.STL_DEV.resetSeed = () => {
          try { localStorage.removeItem(SEED_FLAG); } catch (_) {}
          console.log('[stl seed] flag cleared — next reload will auto-seed again');
        };
      } catch (e) {
        console.warn('[stl seed] auto-seed skipped:', e && e.message);
      }
    }

    // First paint: the score screen is already visible per the HTML
    // defaults. We deliberately do NOT trigger any mount animation
    // here — the page should appear instantly on first load. Mid-app
    // navigation (regen → score, restart → score) still uses the View
    // Transition path via showScreen('score', null, 'back').

    // Supabase backfill: fires once per device after the user signs
    // in. Idempotent — the migration sentinel guards the work, and
    // every API endpoint upserts. Anonymous boots are no-ops because
    // the API rejects unauthenticated writes; the next sign-in
    // triggers it.
    if (!supabaseMigrated()) {
      setTimeout(() => { runSupabaseBackfill().catch(() => {}); }, 1500);
    } else if (!notesBackfilled()) {
      // Migration already completed but the original runner skipped
      // notes (it only walked the question-field keys, not note +
      // noteAttachments). Catch that gap on this boot — separate
      // sentinel so we don't re-fire forever once it succeeds.
      setTimeout(() => { runNoteBackfill().catch(() => {}); }, 1500);
    }
  };

  // Fire the boot now or on DOMContentLoaded, whichever applies. bank-
  // loader.js injects this script tag AFTER its API fetch resolves, so
  // by the time we get here the DOM has usually already finished
  // parsing — readyState is 'interactive' or 'complete', meaning
  // DOMContentLoaded already fired and adding a listener for it would
  // be a no-op (the picker would render its header but never populate
  // its grid). Guard against both cases.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', __stlBoot);
  } else {
    // Microtask gap so any sync code that follows finishes first.
    Promise.resolve().then(__stlBoot);
  }
})();
