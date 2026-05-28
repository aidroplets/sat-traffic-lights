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
      if (!Array.isArray(q.choices) || q.choices.length === 0) return false;
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
  };

  // current-question render state
  let currentPick = null;        // ORIGINAL index into q.choices
  let currentPerm = null;        // permutation used for the current render

  // ----- screen control --------------------------------------------------
  const screens = ['score', 'quiz', 'results', 'review', 'regen'];
  const showScreen = (name) => {
    screens.forEach((s) => {
      const el = document.querySelector(`[data-screen="${s}"]`);
      if (el) el.hidden = (s !== name);
    });
    $('#btn-restart').hidden = (name === 'score');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    showScreen('quiz');
    renderQuestion();
  };

  // ----- quiz ------------------------------------------------------------
  const renderQuestion = () => {
    currentPick = null;
    const q = state.test[state.cursor];
    currentPerm = permutation(q.choices.length);

    const total = state.test.length;
    $('#quiz-counter').textContent = `Question ${state.cursor + 1} of ${total}`;
    $('#quiz-difficulty').textContent = q.difficulty;
    $('#quiz-difficulty').setAttribute('data-d', q.difficulty);
    $('#quiz-topic').textContent = q.topic;
    $('#quiz-progress-fill').style.width = `${((state.cursor) / total) * 100}%`;

    const passageEl = $('#quiz-passage');
    if (q.passage) {
      passageEl.textContent = q.passage;
      passageEl.hidden = false;
    } else {
      passageEl.hidden = true;
    }
    $('#quiz-stem').textContent = q.stem;

    const choicesEl = $('#quiz-choices');
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
      label.querySelector('.stl-choice__text').textContent = text;
      label.addEventListener('click', () => selectChoice(label, origIdx));
      choicesEl.appendChild(label);
    });

    $$('.stl-signal__btn').forEach((b) => { b.disabled = false; });
  };

  const selectChoice = (labelEl, origIdx) => {
    $$('.stl-choice', $('#quiz-choices')).forEach((el) => el.classList.remove('is-selected'));
    labelEl.classList.add('is-selected');
    currentPick = origIdx;
    const input = labelEl.querySelector('input');
    if (input) input.checked = true;
  };

  const isCorrect = (q, origIdx) =>
    origIdx != null && Number(origIdx) === Number(q.answer);

  const handleSignal = (signal) => {
    const q = state.test[state.cursor];
    if (currentPick == null && signal !== 'red') {
      alert('Pick an answer first — Green and Yellow lock in your selection.');
      return;
    }
    state.answers.push({
      qid: q.id,
      picked: currentPick,        // original-index, or null when Red w/o pick
      signal,
      correct: isCorrect(q, currentPick),
      perm: currentPerm.slice(),  // remember what they actually saw
    });

    state.cursor += 1;
    if (state.cursor >= state.test.length) {
      showResults();
    } else {
      renderQuestion();
    }
  };

  const handleSkip = () => {
    const q = state.test[state.cursor];
    state.answers.push({
      qid: q.id,
      picked: null,
      signal: 'skip',
      correct: false,
      perm: currentPerm.slice(),
    });
    state.cursor += 1;
    if (state.cursor >= state.test.length) {
      showResults();
    } else {
      renderQuestion();
    }
  };

  const initQuiz = () => {
    $$('.stl-signal__btn').forEach((btn) => {
      btn.addEventListener('click', () => handleSignal(btn.dataset.signal));
    });
    $('#btn-skip-question').addEventListener('click', handleSkip);
  };

  // ----- results ---------------------------------------------------------
  const showResults = () => {
    const total = state.test.length;
    const correct = state.answers.filter((a) => a.correct).length;
    const trueMastery = state.answers.filter((a) => a.correct && a.signal === 'green').length;
    const lucky = state.answers.filter((a) => a.correct && a.signal !== 'green').length;
    const review = state.answers.filter((a) => !(a.correct && a.signal === 'green'));

    $('#stat-correct').textContent = `${correct}/${total}`;
    $('#stat-true-mastery').textContent = String(trueMastery);
    $('#stat-lucky').textContent = String(lucky);
    $('#stat-review').textContent = String(review.length);

    const pct = Math.round((correct / total) * 100);
    let headline = 'Nice work.';
    if (pct >= 90) headline = 'Outstanding.';
    else if (pct >= 75) headline = 'Strong showing.';
    else if (pct >= 50) headline = 'Solid baseline — let’s tighten things up.';
    else headline = 'Lots of room to grow — that’s why you’re here.';
    $('#results-headline').textContent = headline;
    $('#results-sub').textContent =
      `You answered ${correct} of ${total} correctly. ${trueMastery} were true mastery (green + correct), ` +
      `${lucky} were correct but not confident, and ${review.length} need review.`;

    state.reviewItems = review.map((a) => ({
      ...a,
      question: state.test.find((q) => q.id === a.qid),
    }));
    state.reviewCursor = 0;

    const reviewBtn = $('#btn-start-review');
    const tailoredBtn = $('#btn-results-tailored');
    reviewBtn.disabled = state.reviewItems.length === 0;
    tailoredBtn.disabled = state.reviewItems.length === 0;
    reviewBtn.textContent =
      state.reviewItems.length === 0
        ? 'Nothing to review'
        : `Walk through review (${state.reviewItems.length})`;
    tailoredBtn.title =
      state.reviewItems.length === 0
        ? 'Perfect mastery — no missed topics to drill.'
        : '';

    showScreen('results');
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
      renderReview();
      showScreen('review');
    });
    $('#btn-results-tailored').addEventListener('click', launchTailored);
    $('#btn-results-fresh').addEventListener('click', () => startTest(state.score));
  };

  // ----- review ----------------------------------------------------------
  const renderReview = () => {
    const item = state.reviewItems[state.reviewCursor];
    const q = item.question;
    $('#review-counter').textContent = `Review ${state.reviewCursor + 1} of ${state.reviewItems.length}`;
    const result = item.correct
      ? `correct · ${item.signal}`
      : (item.picked == null ? 'skipped' : `missed · ${item.signal}`);
    $('#review-result').textContent = result;
    $('#review-result').setAttribute('data-d', q.difficulty);
    $('#review-topic').textContent = q.topic;

    const passageEl = $('#review-passage');
    if (q.passage) {
      passageEl.textContent = q.passage;
      passageEl.hidden = false;
    } else {
      passageEl.hidden = true;
    }
    $('#review-stem').textContent = q.stem;

    const choicesEl = $('#review-choices');
    choicesEl.innerHTML = '';
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
      li.querySelector('.stl-choice__text').textContent =
        text + (isAnswer ? '   ✓ correct' : (isPicked ? '   ✗ your answer' : ''));
      choicesEl.appendChild(li);
    });

    $('#review-explanation').textContent = q.explanation || '';
    $('#btn-review-prev').disabled = state.reviewCursor === 0;
    $('#btn-review-next').textContent =
      state.reviewCursor === state.reviewItems.length - 1 ? 'Finish review' : 'Next';
  };

  const initReview = () => {
    $('#btn-review-prev').addEventListener('click', () => {
      if (state.reviewCursor > 0) {
        state.reviewCursor -= 1;
        renderReview();
      }
    });
    $('#btn-review-next').addEventListener('click', () => {
      if (state.reviewCursor < state.reviewItems.length - 1) {
        state.reviewCursor += 1;
        renderReview();
      } else {
        showRegen();
      }
    });
  };

  // ----- regen -----------------------------------------------------------
  const showRegen = () => {
    const topics = new Set(state.reviewItems.map((r) => r.question.topic));
    const tailoredBtn = $('#btn-regen-tailored');
    if (topics.size === 0) {
      $('#regen-sub').textContent =
        'You nailed this round — no missed topics to drill. Take a fresh test or restart with a new score.';
      tailoredBtn.disabled = true;
    } else {
      $('#regen-sub').textContent =
        `Drill the ${topics.size} topic(s) you missed (${[...topics].join(', ')}), take a fresh randomized test, or start over.`;
      tailoredBtn.disabled = false;
    }
    showScreen('regen');
  };

  const initRegen = () => {
    $('#btn-regen-tailored').addEventListener('click', launchTailored);
    $('#btn-regen-fresh').addEventListener('click', () => startTest(state.score));
    $('#btn-regen-no').addEventListener('click', () => showScreen('score'));
  };

  // ----- restart ---------------------------------------------------------
  const initRestart = () => {
    $('#btn-restart').addEventListener('click', () => {
      if (confirm('Restart and lose this attempt?')) {
        state.test = [];
        state.answers = [];
        state.cursor = 0;
        showScreen('score');
      }
    });
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
    showScreen('score');
  });
})();
