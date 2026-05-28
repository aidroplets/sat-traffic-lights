/**
 * bank-loader.js — instant boot via a tiny test_config snapshot.
 *
 * Design (post-2026-05-26):
 *   • Tests don't change often, so the 6-row test_config is baked into
 *     this file as a snapshot. The picker can render immediately —
 *     no network round-trip on initial load.
 *   • Questions DO change often (3k+ rows, edited daily). They're
 *     fetched lazily per test the moment one is selected (see
 *     loadQuestionsForTest in app.js). A spinner shows during the
 *     fetch, and the result is cached in-memory + in localStorage for
 *     the session.
 *   • A background refresh of /api/test-config still runs, so admin
 *     edits to the test snapshot (length, subject mix, tint, etc.)
 *     propagate within seconds without a redeploy.
 *
 * Boot sequence:
 *   1. index.html ships <script src="bank-loader.js">.
 *   2. We populate window.__STL_TEST_CONFIG_CACHE__ from the inline
 *      snapshot synchronously.
 *   3. We initialize every window.STL_QUESTIONS_* bucket as an empty
 *      array (so assembleBank() in app.js doesn't ReferenceError).
 *   4. We inject app.js immediately — the picker renders without
 *      waiting on anything.
 *   5. In the background, we refresh test_config from /api/test-config
 *      so admin edits land within ~edge-cache-ttl of the change.
 *   6. When a test is selected, app.js calls loadQuestionsForTest(id)
 *      which fetches /api/questions?testType=X for just that test.
 *
 * The previous full-bank initial fetch is gone. Admin tab still wants
 * the full bank — it calls loadAllQuestions() on entry. */
(function () {
  'use strict';

  const APP_SRC = './app.js?v=2026-05-28-sampling';

  // --- Inline test_config snapshot ----------------------------------
  // 6 rows × ~100 bytes each = 600 bytes total. Tests are added once
  // every few months; the deploy pipeline keeps this in sync. Admin
  // edits override these via the background test_config refresh below.
  //
  // Format MUST match what /api/test-config returns so the runtime
  // can swap them with no shape changes. Tint is the canonical brand
  // color per test, used by applyTestAccent + picker tiles + chips.
  const TEST_CONFIG_SNAPSHOT = [
    { testId: 'SAT',  isActive: true, length: 30,  subjectMix: { math: 13, 'reading-writing': 17 }, enabledSubjects: ['math', 'reading-writing'], tint: '139, 134, 255' },
    { testId: 'PSAT', isActive: true, length: 98,  subjectMix: { math: 44, 'reading-writing': 54 }, enabledSubjects: ['math', 'reading-writing'], tint: '96, 165, 250'  },
    { testId: 'ACT',  isActive: true, length: 215, subjectMix: { math: 60, english: 75, reading: 40, science: 40 }, enabledSubjects: ['math', 'english', 'reading', 'science'], tint: '74, 222, 128' },
    { testId: 'ISEE', isActive: true, length: 160, subjectMix: { math: 47, 'quantitative-reasoning': 37, 'verbal-reasoning': 40, 'reading-comprehension': 36 }, enabledSubjects: ['math', 'quantitative-reasoning', 'verbal-reasoning', 'reading-comprehension'], tint: '251, 146, 60' },
    { testId: 'SSAT', isActive: true, length: 150, subjectMix: { math: 50, verbal: 60, 'reading-comprehension': 40 }, enabledSubjects: ['math', 'verbal', 'reading-comprehension'], tint: '244, 114, 182' },
    { testId: 'HSPT', isActive: true, length: 298, subjectMix: { math: 64, 'verbal-skills': 60, 'quantitative-skills': 52, reading: 62, 'language-skills': 60 }, enabledSubjects: ['math', 'verbal-skills', 'quantitative-skills', 'reading', 'language-skills'], tint: '250, 204, 21' },
  ];

  // Empty defaults so the merge in assembleBank() is a no-op (every
  // row coming from the API has its own state/topic/etc. inlined). The
  // GLOBALS must be defined before app.js's IIFE first calls
  // assembleBank(), otherwise the bank reads undefined and explodes.
  const EMPTY_DEFAULTS = Object.freeze({});

  function initEmptyGlobals() {
    window.STL_QUESTIONS_HUMAN_DEFAULTS = EMPTY_DEFAULTS;
    window.STL_QUESTIONS_AI_DEFAULTS    = EMPTY_DEFAULTS;
    window.STL_QUESTIONS_PSAT_DEFAULTS  = EMPTY_DEFAULTS;
    window.STL_QUESTIONS_ACT_DEFAULTS   = EMPTY_DEFAULTS;
    window.STL_QUESTIONS_SSAT_DEFAULTS  = EMPTY_DEFAULTS;
    window.STL_QUESTIONS_HSPT_DEFAULTS  = EMPTY_DEFAULTS;
    window.STL_QUESTIONS_ISEE_DEFAULTS  = EMPTY_DEFAULTS;

    window.STL_QUESTIONS_HUMAN = [];
    window.STL_QUESTIONS_AI    = [];
    window.STL_QUESTIONS_PSAT  = [];
    window.STL_QUESTIONS_ACT   = [];
    window.STL_QUESTIONS_SSAT  = [];
    window.STL_QUESTIONS_HSPT  = [];
    window.STL_QUESTIONS_ISEE  = [];
    window.STL_IMPORTS         = [];
  }

  function populateTestConfigCache(rows) {
    const tcMap = {};
    for (const row of (rows || [])) tcMap[row.testId] = row;
    window.__STL_TEST_CONFIG_CACHE__ = tcMap;
  }

  // Lazy per-test question loader. Called from app.js when the user
  // selects a test (picker tile click, score-screen render, etc.).
  // Idempotent: tests already loaded in this session no-op. In-flight
  // requests are deduplicated via a per-test promise map.
  //
  // On success the relevant STL_QUESTIONS_* bucket is populated and
  // a `stl:bank-updated` event fires so the rest of the app re-
  // assembles. Errors throw so the caller can show an error UI.
  const loadedTests = new Set();
  const inflight = new Map();
  async function loadQuestionsForTest(testId) {
    if (!testId) return;
    if (loadedTests.has(testId)) return;
    if (inflight.has(testId)) return inflight.get(testId);
    const p = (async () => {
      const url = '/api/questions?testType=' + encodeURIComponent(testId);
      const r = await fetch(url, { credentials: 'same-origin' });
      if (!r.ok) throw new Error('Bank fetch ' + testId + ' → HTTP ' + r.status);
      const data = await r.json();
      // Route every question into the right bucket. SAT splits between
      // HUMAN and AI by source; every other test gets its own bucket.
      for (const q of (data.questions || [])) {
        const t = (q.testType || testId || 'SAT').toUpperCase();
        if (t === 'SAT') {
          const isAI = q.source === 'ai-generated';
          (isAI ? window.STL_QUESTIONS_AI : window.STL_QUESTIONS_HUMAN).push(q);
        } else if (window['STL_QUESTIONS_' + t]) {
          window['STL_QUESTIONS_' + t].push(q);
        } else {
          window.STL_QUESTIONS_HUMAN.push(q);
        }
      }
      // Refresh the test-config cache from the response in case admin
      // edited tints/lengths since the snapshot loaded.
      if (Array.isArray(data.testConfig)) populateTestConfigCache(data.testConfig);
      // Imports for this test type get merged in (admins viewing the
      // imports tab look at this; the cascade-delete filter needs them).
      if (Array.isArray(data.imports)) {
        window.STL_IMPORTS = (window.STL_IMPORTS || []).concat(
          data.imports.filter((imp) => !(window.STL_IMPORTS || []).some((x) => x.id === imp.id))
        );
      }
      loadedTests.add(testId);
      if (typeof window.assembleBank === 'function') window.assembleBank();
      document.dispatchEvent(new CustomEvent('stl:bank-updated'));
    })();
    inflight.set(testId, p);
    try { return await p; }
    finally { inflight.delete(testId); }
  }
  // Full-bank loader for the admin tab. Fetches /api/questions with no
  // testType filter — same shape as the legacy initial-load path.
  // Idempotent: once 'all' is loaded, no-op.
  let allLoaded = false;
  let allInflight = null;
  async function loadAllQuestions() {
    if (allLoaded) return;
    if (allInflight) return allInflight;
    allInflight = (async () => {
      const r = await fetch('/api/questions', { credentials: 'same-origin' });
      if (!r.ok) throw new Error('Full bank fetch → HTTP ' + r.status);
      const data = await r.json();
      // Wipe and refill — admin path is authoritative.
      window.STL_QUESTIONS_HUMAN.length = 0;
      window.STL_QUESTIONS_AI.length    = 0;
      window.STL_QUESTIONS_PSAT.length  = 0;
      window.STL_QUESTIONS_ACT.length   = 0;
      window.STL_QUESTIONS_SSAT.length  = 0;
      window.STL_QUESTIONS_HSPT.length  = 0;
      window.STL_QUESTIONS_ISEE.length  = 0;
      for (const q of (data.questions || [])) {
        const t = (q.testType || 'SAT').toUpperCase();
        if (t === 'SAT') {
          (q.source === 'ai-generated' ? window.STL_QUESTIONS_AI : window.STL_QUESTIONS_HUMAN).push(q);
        } else if (window['STL_QUESTIONS_' + t]) {
          window['STL_QUESTIONS_' + t].push(q);
        } else {
          window.STL_QUESTIONS_HUMAN.push(q);
        }
      }
      window.STL_IMPORTS = data.imports || [];
      if (Array.isArray(data.testConfig)) populateTestConfigCache(data.testConfig);
      // Mark every test as loaded so subsequent per-test calls no-op.
      for (const row of (data.testConfig || [])) loadedTests.add(row.testId);
      loadedTests.add('SAT'); loadedTests.add('PSAT'); loadedTests.add('ACT');
      loadedTests.add('SSAT'); loadedTests.add('HSPT'); loadedTests.add('ISEE');
      allLoaded = true;
      if (typeof window.assembleBank === 'function') window.assembleBank();
      document.dispatchEvent(new CustomEvent('stl:bank-updated'));
    })();
    try { return await allInflight; }
    finally { allInflight = null; }
  }

  function appendAppScript() {
    const s = document.createElement('script');
    s.src = APP_SRC;
    s.defer = false;
    document.body.appendChild(s);
  }

  // Background refresh of test_config — picks up admin edits between
  // deploys. Fires AFTER app.js loads so it can't block the picker.
  async function refreshTestConfigInBackground() {
    try {
      const r = await fetch('/api/test-config', { credentials: 'same-origin' });
      if (!r.ok) return;
      const data = await r.json();
      if (Array.isArray(data.testConfig) && data.testConfig.length > 0) {
        populateTestConfigCache(data.testConfig);
        // Notify so the picker / score screen can repaint accents if
        // the user has it open while a tint was edited elsewhere.
        document.dispatchEvent(new CustomEvent('stl:test-config-updated', { detail: data.testConfig }));
      }
    } catch (_) {
      // Network hiccup — picker still has the hardcoded snapshot,
      // questions still load on demand. No-op silently.
    }
  }

  // ---- Boot --------------------------------------------------------
  // Synchronous, no awaits — picker is ready before any network call.
  populateTestConfigCache(TEST_CONFIG_SNAPSHOT);
  initEmptyGlobals();

  // Expose the loaders so app.js can call them on test selection /
  // admin entry. The functions live on window so the app's IIFE can
  // reach them without a hoisting dance.
  window.__STL_LOAD_QUESTIONS_FOR_TEST__ = loadQuestionsForTest;
  window.__STL_LOAD_ALL_QUESTIONS__      = loadAllQuestions;

  appendAppScript();
  // Don't block on the test-config refresh — it runs after the page
  // is interactive and updates the cache in place if anything changed.
  setTimeout(refreshTestConfigInBackground, 100);
})();
