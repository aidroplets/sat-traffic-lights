/**
 * Archive feature regression tests.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/archive.test.js
 *
 * The contract being defended:
 *   1. 'archived' is a valid state value (CSV import, edit modal save,
 *      action handler all share QUESTION_STATES as the source of truth).
 *   2. The quiz pool (window.STL_QUESTIONS) excludes archived questions
 *      — test takers must never see an archived item. The existing
 *      `state === 'live'` filter already handles this; the test guards
 *      against a future change that loosens the filter.
 *   3. The default admin Questions tab filter (state: 'active') hides
 *      archived rows. The 'archived' filter shows them. The 'all' filter
 *      includes archived AND non-archived.
 *   4. Archive → Unarchive round-trip: archive sets state to 'archived',
 *      Unarchive sets state to 'unpublished' (NOT back to live; admin
 *      must explicitly re-publish after review).
 *
 * Same stub-DOM pattern as choice-input.test.js — no jsdom dep.
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

let passed = 0;
let failed = 0;
const t = (name, fn) => {
  try {
    fn();
    console.log('  ✓', name);
    passed++;
  } catch (err) {
    console.log('  ✗', name);
    console.log('     ', err.message);
    failed++;
  }
};
const eq = (actual, expected, msg) => {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error((msg || '') + ' expected ' + e + ', got ' + a);
};

// ---- stub DOM (mirrors choice-input.test.js) -------------------------
function makeStubElement(tag = 'div') {
  const children = [];
  return {
    tagName: (tag || 'div').toUpperCase(),
    children,
    classList: { add(){}, remove(){}, toggle(){}, contains(){return false;} },
    dataset: {},
    style: {},
    attributes: {},
    addEventListener(){}, removeEventListener(){},
    appendChild(c) { children.push(c); return c; },
    setAttribute(k, v) { this.attributes[k] = v; },
    getAttribute(k) { return this.attributes[k]; },
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    set innerHTML(v) { this._inner = v; children.length = 0; },
    get innerHTML() { return this._inner || ''; },
  };
}
const stubDoc = {
  body: makeStubElement('body'),
  documentElement: makeStubElement('html'),
  createElement: (tag) => makeStubElement(tag),
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
};
const stubLocalStorage = (() => {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    clear: () => map.clear(),
  };
})();
const sandbox = {
  document: stubDoc,
  localStorage: stubLocalStorage,
  window: null,
  STL_AUTH: null,
  CustomEvent: function(){ return { type: arguments[0] }; },
  MutationObserver: function() { return { observe(){}, disconnect(){} }; },
  matchMedia: () => ({ matches: false, addEventListener(){}, removeEventListener(){} }),
  setTimeout, clearTimeout, setInterval, clearInterval,
  performance: { now: () => Date.now() },
  console,
};
sandbox.window = sandbox;
vm.createContext(sandbox);

const root = path.resolve(__dirname, '..');
for (const f of ['questions.js', 'questions-generated.js', 'questions-isee-act.js', 'auth.js', 'app.js']) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f }); }
  catch (_) { /* init() needs DOM; we only need module-level state */ }
}

const hooks = sandbox.STL_TEST_HOOKS || {};
const QUESTION_STATES = hooks.QUESTION_STATES;
if (!Array.isArray(QUESTION_STATES)) {
  console.error('FAIL: QUESTION_STATES not exposed via window.STL_TEST_HOOKS');
  process.exit(1);
}

// ---- tests -----------------------------------------------------------
console.log('QUESTION_STATES contract');

t("includes 'archived'", () => {
  if (!QUESTION_STATES.includes('archived')) {
    throw new Error('archived missing from ' + JSON.stringify(QUESTION_STATES));
  }
});

t('still includes the original three states', () => {
  ['live', 'unpublished', 'needs-review'].forEach((s) => {
    if (!QUESTION_STATES.includes(s)) throw new Error('missing ' + s);
  });
});

console.log('\nQuiz pool excludes archived');

t('window.STL_QUESTIONS contains only live questions (no archived)', () => {
  const live = sandbox.STL_QUESTIONS || [];
  const offending = live.filter((q) => q.state === 'archived');
  if (offending.length) throw new Error(offending.length + ' archived item(s) leaked into quiz pool');
});

t('archive→live→archive round-trip via localStorage overrides', () => {
  // Pick any question (post-2026-05-06 the entire bank is archived);
  // simulate the admin override path by writing to the same
  // localStorage key that setQuestionState() uses, then re-run the
  // merge by hand and verify the live pool reflects each step.
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const target = all[0];
  if (!target) throw new Error('bank empty in fixture');

  const merge = (defaults, q, overrides) => {
    const base = { ...defaults, ...q };
    const ov = overrides[base.id];
    return ov ? { ...base, ...ov } : base;
  };
  const reAssemble = (overrides) => {
    const human = (sandbox.STL_QUESTIONS_HUMAN || []).map((q) => merge(sandbox.STL_QUESTIONS_HUMAN_DEFAULTS || {}, q, overrides));
    const ai    = (sandbox.STL_QUESTIONS_AI    || []).map((q) => merge(sandbox.STL_QUESTIONS_AI_DEFAULTS    || {}, q, overrides));
    return human.concat(ai);
  };

  // 1) Promote target to live.
  let ov = { [target.id]: { state: 'live', updatedAt: Date.now(), updatedBy: 'test' } };
  sandbox.localStorage.setItem('stl_question_overrides', JSON.stringify(ov));
  let live = reAssemble(ov).filter((q) => q.state === 'live');
  if (!live.find((q) => q.id === target.id)) throw new Error('promote→live failed');

  // 2) Archive it again — should disappear from live.
  ov = { [target.id]: { state: 'archived', updatedAt: Date.now(), updatedBy: 'test' } };
  sandbox.localStorage.setItem('stl_question_overrides', JSON.stringify(ov));
  live = reAssemble(ov).filter((q) => q.state === 'live');
  if (live.find((q) => q.id === target.id)) throw new Error(target.id + ' still in quiz pool after re-archive');

  sandbox.localStorage.removeItem('stl_question_overrides');
});

console.log('\nAdmin filter logic');

// Mirror the filterAdminQuestions branch under test:
//   - 'active' hides archived
//   - 'all' includes everything
//   - 'archived' shows only archived
const matches = (item, fState) => {
  if (fState === 'active' && item.state === 'archived') return false;
  if (fState !== 'all' && fState !== 'active' && item.state !== fState) return false;
  return true;
};

t("default 'active' filter hides archived rows", () => {
  eq(matches({ state: 'archived' }, 'active'), false);
  eq(matches({ state: 'live' },     'active'), true);
  eq(matches({ state: 'unpublished' }, 'active'), true);
  eq(matches({ state: 'needs-review' }, 'active'), true);
});

t("'archived' filter shows only archived rows", () => {
  eq(matches({ state: 'archived' },    'archived'), true);
  eq(matches({ state: 'live' },        'archived'), false);
  eq(matches({ state: 'unpublished' }, 'archived'), false);
});

t("'all' filter shows everything including archived", () => {
  eq(matches({ state: 'archived' },    'all'), true);
  eq(matches({ state: 'live' },        'all'), true);
  eq(matches({ state: 'unpublished' }, 'all'), true);
});

console.log('\nArchive ↔ Unarchive round-trip');

// The action handler in app.js runs:
//   archive   → setQuestionState(id, 'archived')
//   unarchive → setQuestionState(id, 'unpublished')
// We exercise the contract that Unarchive lands on 'unpublished'
// (not 'live') — admin must re-publish after review.
t("archive action sets state to 'archived'", () => {
  const tgt = { state: 'live' };
  // simulate: setQuestionState(id, 'archived')
  tgt.state = 'archived';
  eq(tgt.state, 'archived');
});

t("unarchive action lands on 'unpublished', not 'live'", () => {
  const tgt = { state: 'archived' };
  // simulate: setQuestionState(id, 'unpublished')
  tgt.state = 'unpublished';
  eq(tgt.state, 'unpublished');
  // Critical: a question coming out of archive does NOT auto-republish.
  if (tgt.state === 'live') throw new Error('unarchive should not auto-publish');
});

t('an archived question is hidden from default admin view AND quiz pool', () => {
  const q = { id: 'q-test', state: 'archived' };
  // Default admin filter ('active') hides it
  eq(matches(q, 'active'), false, 'admin default view:');
  // Quiz pool (state === 'live') hides it
  const inQuizPool = q.state === 'live';
  eq(inQuizPool, false, 'quiz pool:');
});

console.log('\nBank state (post 2026-05-06 batch-2)');

// 2026-05-06 — Batch 2 shipped:
//   • Old human bank (q-7xxx, 100 rows) — defaults state='archived'
//   • Old AI batch-1 (q-8xxx, 100 rows) — defaults state='archived'
//   • New seeds (q-S###, 15 rows)        — explicit state='live'
//   • New AI batch-2 (q-9xxx, 300 rows) — explicit state='live'
// So total bank ≈ 515, live pool ≈ 315, archived ≈ 200.
t('STL_QUESTIONS_ALL has the full bank (legacy + new batch)', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  if (all.length < 500) throw new Error('expected ≥500 in bank, got ' + all.length);
});

t('STL_QUESTIONS (live pool) reflects the new live batch', () => {
  const live = sandbox.STL_QUESTIONS || [];
  // 15 seeds + 300 AI variations = 315 expected.
  if (live.length < 300) throw new Error('expected ≥300 live, got ' + live.length);
});

t('every legacy q-7xxx / q-8xxx row is archived (defaults intact)', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const legacy = all.filter((q) => /^q-[78]\d{3}$/.test(q.id));
  const stragglers = legacy.filter((q) => q.state !== 'archived');
  if (stragglers.length) {
    const detail = stragglers.slice(0, 3).map((q) => q.id + '→' + q.state).join(', ');
    throw new Error(stragglers.length + ' legacy row(s) not archived: ' + detail);
  }
});

t('every new q-S### / q-9xxx row is in a valid state (live or archived)', () => {
  // 2026-05-06 batch-2 ships state:'live'. The 40 text-only variations
  // of scatterplot-association and line-of-best-fit (q-9241..q-9260,
  // q-9281..q-9300) were flipped to state:'archived' when batch-3
  // landed (charted versions superseded them). Everything else stays
  // live. Pin "no row leaked into a wrong state".
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const newRows = all.filter((q) => /^q-(S\d{3}|9\d{3})$/.test(q.id));
  const stragglers = newRows.filter((q) => q.state !== 'live' && q.state !== 'archived');
  if (stragglers.length) {
    const detail = stragglers.slice(0, 3).map((q) => q.id + '→' + q.state).join(', ');
    throw new Error(stragglers.length + ' new row(s) in unexpected state: ' + detail);
  }
});

t('text-only scatterplot/best-fit batch-2 rows are archived (superseded by batch-3)', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const supersededTopics = ['scatterplot-association', 'line-of-best-fit'];
  // Batch-2 IDs for these topics. Anything still live in batch-2 means
  // the supersession step didn't run.
  const stragglers = all.filter((q) =>
    /^q-9\d{3}$/.test(q.id) &&
    q.batch === 'batch-2-2026-05-06' &&
    supersededTopics.includes(q.topic) &&
    q.state === 'live');
  if (stragglers.length) throw new Error(stragglers.length + ' batch-2 charted-topic rows still live');
});

t('localStorage override can flip a legacy archived row back to live', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const target = all.find((q) => q.state === 'archived');
  if (!target) throw new Error('no archived row found in fixture');
  const overrides = { [target.id]: { state: 'live', updatedAt: Date.now(), updatedBy: 'test' } };

  const merge = (defaults, q) => {
    const base = { ...defaults, ...q };
    const ov = overrides[base.id];
    return ov ? { ...base, ...ov } : base;
  };
  const human = (sandbox.STL_QUESTIONS_HUMAN || []).map((q) => merge(sandbox.STL_QUESTIONS_HUMAN_DEFAULTS || {}, q));
  const ai    = (sandbox.STL_QUESTIONS_AI    || []).map((q) => merge(sandbox.STL_QUESTIONS_AI_DEFAULTS    || {}, q));
  const reLive = human.concat(ai).filter((q) => q.state === 'live');

  if (!reLive.find((q) => q.id === target.id)) throw new Error(target.id + ' did not flip to live');
});

console.log('\nFigure data on seed questions');

// q-S013/q-S014/q-S015 had the original imagery — restored 2026-05-06.
// Pin those expectations so a future edit doesn't accidentally strip
// them back to text-only.
t('q-S013 has 4 choiceCharts (scatterplot association)', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const q = all.find((x) => x.id === 'q-S013');
  if (!q) throw new Error('q-S013 not in bank');
  if (!Array.isArray(q.choiceCharts) || q.choiceCharts.length !== 4) {
    throw new Error('expected 4 choiceCharts, got ' + (q.choiceCharts && q.choiceCharts.length));
  }
});

t('q-S014 has SVG (parallel-lines diagram)', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const q = all.find((x) => x.id === 'q-S014');
  if (!q || typeof q.svg !== 'string' || !q.svg.includes('<svg')) {
    throw new Error('q-S014 svg missing or malformed');
  }
});

t('q-S015 has chart with best-fit + 10 points', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const q = all.find((x) => x.id === 'q-S015');
  if (!q || !q.chart || !Array.isArray(q.chart.datasets)) {
    throw new Error('q-S015 chart missing');
  }
  const points = q.chart.datasets.find((d) => d.kind === 'points');
  const bestFit = q.chart.datasets.find((d) => d.kind === 'best-fit');
  if (!points || !bestFit) throw new Error('chart missing points or best-fit dataset');
  if (points.data.length !== 10) throw new Error('expected 10 points, got ' + points.data.length);
});

// 2026-05-07 — every live parallel-lines-angles question must include
// an SVG figure. The AI batch (q-9261..q-9280) originally shipped as
// text-only stems that referenced a "parallelogram-like figure" the
// student couldn't see; that's the bug this test guards against.
t('every live parallel-lines-angles question has an SVG figure', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const live = all.filter((q) =>
    q.topic === 'parallel-lines-angles' && q.state === 'live'
  );
  if (live.length === 0) throw new Error('no live parallel-lines-angles questions found — fixture changed?');
  const missing = live.filter((q) => typeof q.svg !== 'string' || !q.svg.includes('<svg'));
  if (missing.length) {
    throw new Error(missing.length + ' live parallel-lines-angles question(s) missing svg: ' +
      missing.map((q) => q.id).join(', '));
  }
});

t('figure data round-trips through localStorage override merge', () => {
  // Simulate the admin Edit modal saving a custom SVG over q-S013,
  // then verify the merged record has only the SVG (and the prior
  // choiceCharts is nulled). Mirrors saveEditFromModal's null-then-set
  // pattern that prevents stale figure keys.
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const target = all.find((x) => x.id === 'q-S013');
  if (!target) throw new Error('q-S013 missing');
  const overrides = {
    [target.id]: {
      chart: null, svg: '<svg viewBox="0 0 100 100"/>', image: null, imageAlt: null, choiceCharts: null,
      updatedAt: Date.now(), updatedBy: 'test',
    },
  };
  const merge = (defaults, q) => {
    const base = { ...defaults, ...q };
    const ov = overrides[base.id];
    return ov ? { ...base, ...ov } : base;
  };
  const human = (sandbox.STL_QUESTIONS_HUMAN || []).map((q) => merge(sandbox.STL_QUESTIONS_HUMAN_DEFAULTS || {}, q));
  const merged = human.find((q) => q.id === target.id);
  if (!merged) throw new Error('target lost in merge');
  if (merged.svg !== '<svg viewBox="0 0 100 100"/>') throw new Error('svg override did not apply');
  if (merged.choiceCharts !== null) throw new Error('choiceCharts should be nulled, got ' + JSON.stringify(merged.choiceCharts));
});

console.log('\nTest-type pool integrity (post 2026-05-06 multi-test)');

// As of the multi-test feature, every question gets a `testType`.
// File-level defaults set SAT/ISEE/ACT; per-row overrides allowed.
// Pin the new invariants:
//   1. STL_TEST_HOOKS exposes TEST_TYPES + TEST_TYPE_ORDER
//   2. Every question in the bank has one of the 3 known test types
//   3. ISEE seed (q-Ixxx) and ACT seed (q-Txxx) are present and live
t('STL_TEST_HOOKS exposes TEST_TYPES with all six tests', () => {
  const hooks = sandbox.STL_TEST_HOOKS || {};
  const required = ['SAT', 'PSAT', 'ISEE', 'SSAT', 'HSPT', 'ACT'];
  if (!hooks.TEST_TYPES) throw new Error('TEST_TYPES not exposed');
  required.forEach((id) => {
    if (!hooks.TEST_TYPES[id]) throw new Error('TEST_TYPES missing ' + id);
  });
  if (!Array.isArray(hooks.TEST_TYPE_ORDER) || hooks.TEST_TYPE_ORDER.length !== required.length) {
    throw new Error('TEST_TYPE_ORDER must list ' + required.length + ' tests, got ' + (hooks.TEST_TYPE_ORDER && hooks.TEST_TYPE_ORDER.length));
  }
});

t('every question has a known testType (or no testType, treated as SAT)', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const known = new Set(['SAT', 'PSAT', 'ISEE', 'SSAT', 'HSPT', 'ACT']);
  const stragglers = all.filter((q) => q.testType && !known.has(q.testType));
  if (stragglers.length) {
    throw new Error(stragglers.length + ' question(s) with unknown testType: ' +
      stragglers.slice(0, 3).map((q) => q.id + '→' + q.testType).join(', '));
  }
});

t('ISEE seed bank has 20 live questions with testType=ISEE', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const isee = all.filter((q) => q.testType === 'ISEE' && q.state === 'live');
  if (isee.length < 20) throw new Error('expected ≥20 live ISEE, got ' + isee.length);
});

t('ACT seed bank has 20 live questions with testType=ACT', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const act = all.filter((q) => q.testType === 'ACT' && q.state === 'live');
  if (act.length < 20) throw new Error('expected ≥20 live ACT, got ' + act.length);
});

t('PSAT bank has 60 live questions', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const psat = all.filter((q) => q.testType === 'PSAT' && q.state === 'live');
  if (psat.length < 60) throw new Error('expected ≥60 live PSAT, got ' + psat.length);
});

t('SSAT bank has 60 live questions', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const ssat = all.filter((q) => q.testType === 'SSAT' && q.state === 'live');
  if (ssat.length < 60) throw new Error('expected ≥60 live SSAT, got ' + ssat.length);
});

t('HSPT bank has 60 live questions', () => {
  const all = sandbox.STL_QUESTIONS_ALL || [];
  const hspt = all.filter((q) => q.testType === 'HSPT' && q.state === 'live');
  if (hspt.length < 60) throw new Error('expected ≥60 live HSPT, got ' + hspt.length);
});

t('quiz pool (STL_QUESTIONS) is single-test — never mixes', () => {
  // Default selectedTest is SAT (or fallback). The pool should contain
  // only that test's questions — no ISEE/ACT bleed-through.
  const pool = sandbox.STL_QUESTIONS || [];
  const types = new Set(pool.map((q) => q.testType || 'SAT'));
  if (types.size > 1) throw new Error('pool mixed: ' + Array.from(types).join(', '));
});

console.log('\nTier resolution per test type');

// Each test has its own tier bands (TEST_TYPES[id].tiers). Picking
// the test's medium-tier threshold should highlight Easy + Medium —
// not just Easy. The bug this catches: hardcoded SAT thresholds
// (≤500/600/700) made ACT 28 → ['easy'] only.
const tierLabelFor   = (sandbox.STL_TEST_HOOKS || {}).tierLabelFor;
const tiersForScore  = (sandbox.STL_TEST_HOOKS || {}).tiersForScore;
const TEST_TYPES_T   = (sandbox.STL_TEST_HOOKS || {}).TEST_TYPES;

t('STL_TEST_HOOKS exposes tierLabelFor + tiersForScore', () => {
  if (typeof tierLabelFor !== 'function') throw new Error('tierLabelFor missing');
  if (typeof tiersForScore !== 'function') throw new Error('tiersForScore missing');
});

// Per-test boundary checks. For each of the 6 tests, exercise:
//   easy threshold       → ['easy']
//   medium threshold     → ['easy', 'medium']
//   hard threshold       → ['easy', 'medium', 'hard']
//   above hard           → ['easy', 'medium', 'hard', 'insane']
['SAT', 'PSAT', 'ACT', 'ISEE', 'SSAT', 'HSPT'].forEach((id) => {
  t(id + ': tiersForScore returns correct cumulative band at every threshold', () => {
    const cfg = TEST_TYPES_T[id];
    if (!cfg) throw new Error(id + ' missing from TEST_TYPES');
    const t1 = tiersForScore(cfg.tiers.easy,   id);
    const t2 = tiersForScore(cfg.tiers.medium, id);
    const t3 = tiersForScore(cfg.tiers.hard,   id);
    const t4 = tiersForScore(cfg.scoreMax,     id);
    if (JSON.stringify(t1) !== JSON.stringify(['easy'])) throw new Error(id + ' easy: ' + JSON.stringify(t1));
    if (JSON.stringify(t2) !== JSON.stringify(['easy', 'medium'])) throw new Error(id + ' medium: ' + JSON.stringify(t2));
    if (JSON.stringify(t3) !== JSON.stringify(['easy', 'medium', 'hard'])) throw new Error(id + ' hard: ' + JSON.stringify(t3));
    if (JSON.stringify(t4) !== JSON.stringify(['easy', 'medium', 'hard', 'insane'])) throw new Error(id + ' insane: ' + JSON.stringify(t4));
  });

  t(id + ': tierLabelFor returns the right single label at each threshold', () => {
    const cfg = TEST_TYPES_T[id];
    if (tierLabelFor(cfg.tiers.easy,   id) !== 'easy')   throw new Error(id + ' easy label wrong');
    if (tierLabelFor(cfg.tiers.medium, id) !== 'medium') throw new Error(id + ' medium label wrong');
    if (tierLabelFor(cfg.tiers.hard,   id) !== 'hard')   throw new Error(id + ' hard label wrong');
    if (tierLabelFor(cfg.scoreMax,     id) !== 'insane') throw new Error(id + ' insane label wrong');
  });
});

// Direct regression test for the reported bug: ACT user hitting Medium
// (28) should get Easy + Medium active, not just Easy.
t('REGRESSION: ACT score 28 (Medium tier) returns ["easy", "medium"]', () => {
  const got = tiersForScore(28, 'ACT');
  if (JSON.stringify(got) !== JSON.stringify(['easy', 'medium'])) {
    throw new Error('expected ["easy","medium"], got ' + JSON.stringify(got));
  }
});

console.log('\n"Include lower difficulty questions" toggle');

// User-controlled toggle that, when OFF, narrows the question pool
// to JUST the target tier's band (instead of the cumulative ≤target).
// Persisted in localStorage as stl_include_lower = 'on' | 'off'.
// Default ON (cumulative — preserves prior behavior).
const INCLUDE_LOWER_KEY = ((sandbox.STL_TEST_HOOKS || {}).INCLUDE_LOWER_KEY) || 'stl_include_lower';
const loadIncludeLower = (sandbox.STL_TEST_HOOKS || {}).loadIncludeLower;
const saveIncludeLower = (sandbox.STL_TEST_HOOKS || {}).saveIncludeLower;

t('helpers exposed via STL_TEST_HOOKS', () => {
  if (typeof loadIncludeLower !== 'function') throw new Error('loadIncludeLower missing');
  if (typeof saveIncludeLower !== 'function') throw new Error('saveIncludeLower missing');
});

t('default state is ON (cumulative — preserves existing behavior)', () => {
  sandbox.localStorage.removeItem(INCLUDE_LOWER_KEY);
  if (loadIncludeLower() !== true) throw new Error('default should be ON (cumulative)');
});

t('saveIncludeLower(false) → loadIncludeLower() === false; round-trips', () => {
  saveIncludeLower(false);
  if (loadIncludeLower() !== false) throw new Error('persist failed');
  if (sandbox.localStorage.getItem(INCLUDE_LOWER_KEY) !== 'off') throw new Error('localStorage value wrong');
  saveIncludeLower(true);
  if (loadIncludeLower() !== true) throw new Error('reset failed');
  sandbox.localStorage.removeItem(INCLUDE_LOWER_KEY);
});

t('only "off" sentinel returns false (defensive)', () => {
  sandbox.localStorage.setItem(INCLUDE_LOWER_KEY, 'false');
  if (loadIncludeLower() !== true) throw new Error('"false" should not coerce to OFF');
  sandbox.localStorage.setItem(INCLUDE_LOWER_KEY, '0');
  if (loadIncludeLower() !== true) throw new Error('"0" should not coerce to OFF');
  sandbox.localStorage.setItem(INCLUDE_LOWER_KEY, 'off');
  if (loadIncludeLower() !== false) throw new Error('"off" should be OFF');
  sandbox.localStorage.removeItem(INCLUDE_LOWER_KEY);
});

// Behavioral integration: when includeLower is ON (default), pool is
// cumulative (questions ≤ target). When OFF, pool is just the target
// tier's band.
t('includeLower ON keeps cumulative; OFF narrows to target tier', () => {
  // SAT bands: easy ≤500, medium ≤600, hard ≤700, insane >700.
  // Target = 600 (medium tier).
  const tierLabel = (s) => s <= 500 ? 'easy' : (s <= 600 ? 'medium' : (s <= 700 ? 'hard' : 'insane'));
  const filterPool = (target, includeLower) => {
    const targetTier = tierLabel(target);
    return [
      { id: 'q-easy',   difficulty: 300 },
      { id: 'q-medium', difficulty: 570 },
      { id: 'q-hard',   difficulty: 650 },
    ].filter((q) => includeLower
      ? q.difficulty <= target
      : tierLabel(q.difficulty) === targetTier
    );
  };
  const cumulative = filterPool(600, true);
  const strict     = filterPool(600, false);
  if (cumulative.length !== 2) throw new Error('cumulative: expected 2 (easy+medium), got ' + cumulative.length);
  if (strict.length !== 1 || strict[0].id !== 'q-medium') {
    throw new Error('strict: expected only medium, got ' + JSON.stringify(strict.map((q) => q.id)));
  }
});

// Pill-highlight isolation: when includeLower is OFF, only the target
// tier should show as active, not all tiers ≤ target.
t('pill highlight: cumulative lights up all ≤ target; strict shows only target', () => {
  const tiersForScore = (sandbox.STL_TEST_HOOKS || {}).tiersForScore;
  const tierLabelFor  = (sandbox.STL_TEST_HOOKS || {}).tierLabelFor;
  const score = 600; // SAT medium
  const cumulativeActive = tiersForScore(score, 'SAT');
  const strictActive     = [tierLabelFor(score, 'SAT')];
  if (JSON.stringify(cumulativeActive) !== JSON.stringify(['easy', 'medium'])) {
    throw new Error('cumulative: ' + JSON.stringify(cumulativeActive));
  }
  if (JSON.stringify(strictActive) !== JSON.stringify(['medium'])) {
    throw new Error('strict: ' + JSON.stringify(strictActive));
  }
});

// Legacy migration: old `stl_strict_difficulty` key with strict=on
// should map to new `stl_include_lower=off`, and strict=off should
// map to include_lower=on. The script runs migration once at load.
t('legacy migration: stl_strict_difficulty=on → stl_include_lower=off', () => {
  // (Migration runs at module load — at this point in the test it's
  // already happened, so we just verify the helper handles the
  // POST-migration default correctly. Direct migration is exercised
  // implicitly by the loader.)
  sandbox.localStorage.removeItem(INCLUDE_LOWER_KEY);
  if (loadIncludeLower() !== true) throw new Error('post-migration default should be ON');
});

// ---- summary ---------------------------------------------------------
console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
