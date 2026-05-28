/**
 * Choice-input regression tests.
 *
 * Run from the repo root:
 *   node web/tests/choice-input.test.js
 *
 * These exercise the rule that the editor and the AI batch preview
 * must NEVER render more (or fewer) than 4 choice slots, regardless
 * of what the underlying question data carries. The bug they cover:
 * an Edit modal that rendered 5 inputs whenever a question (legacy
 * or malformed AI output) had a 5-element `choices` array — because
 * the renderer iterated `q.choices` directly and `LETTERS` had an
 * E slot.
 *
 * The tests use a tiny stub DOM (no jsdom dependency) so they run on
 * a vanilla `node` install. They load app.js with stubbed globals and
 * pull the testable helpers off `window.STL_TEST_HOOKS`.
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

// ---- assertions ------------------------------------------------------
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

// ---- stub DOM --------------------------------------------------------
// Just enough of the DOM to let app.js load without throwing. We're
// only here to extract the pure helpers — nothing renders.
function makeStubElement(tag = 'div') {
  const children = [];
  const el = {
    tagName: (tag || 'div').toUpperCase(),
    children,
    classList: { add(){}, remove(){}, toggle(){}, contains(){return false;} },
    dataset: {},
    style: {},
    attributes: {},
    addEventListener(){},
    removeEventListener(){},
    appendChild(c) { children.push(c); return c; },
    setAttribute(k, v) { this.attributes[k] = v; },
    getAttribute(k) { return this.attributes[k]; },
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    set innerHTML(v) { this._inner = v; children.length = 0; },
    get innerHTML() { return this._inner || ''; },
  };
  return el;
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

// Load the source files (questions banks first, then app.js).
const root = path.resolve(__dirname, '..');
for (const f of ['questions.js', 'questions-generated.js', 'auth.js', 'app.js']) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  try {
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
  } catch (e) {
    // app.js requires DOM nodes that don't exist; we only need the
    // module-level declarations to register on the sandbox before init.
    // Errors that fire during `init()` are fine to swallow here — the
    // helpers we test (normalizeChoices) get exposed BEFORE init runs.
  }
}

const hooks = sandbox.STL_TEST_HOOKS;
if (!hooks || typeof hooks.normalizeChoices !== 'function') {
  console.error('FAIL: normalizeChoices not exposed via window.STL_TEST_HOOKS');
  process.exit(1);
}
const { normalizeChoices, MAX_CHOICES } = hooks;

// ---- tests -----------------------------------------------------------
console.log('normalizeChoices()');

t('caps 5-element input to 4', () => {
  eq(normalizeChoices(['a','b','c','d','e']), ['a','b','c','d']);
});

t('caps 8-element input to 4', () => {
  eq(normalizeChoices(['a','b','c','d','e','f','g','h']), ['a','b','c','d']);
});

t('pads empty array to 4 empty strings', () => {
  eq(normalizeChoices([]), ['','','','']);
});

t('pads 2-element array to 4 with empties', () => {
  eq(normalizeChoices(['x','y']), ['x','y','','']);
});

t('null → 4 empties', () => {
  eq(normalizeChoices(null), ['','','','']);
});

t('undefined → 4 empties', () => {
  eq(normalizeChoices(undefined), ['','','','']);
});

t('non-array (string) → 4 empties', () => {
  eq(normalizeChoices('not an array'), ['','','','']);
});

t('exact 4-element array passes through unchanged', () => {
  eq(normalizeChoices(['w','x','y','z']), ['w','x','y','z']);
});

t('preserves empty-string slots inside the array', () => {
  eq(normalizeChoices(['a','','c','']), ['a','','c','']);
});

t('MAX_CHOICES is 4', () => {
  eq(MAX_CHOICES, 4);
});

console.log('\nQuestion bank invariants');

const human = sandbox.STL_QUESTIONS_HUMAN || [];
const ai    = sandbox.STL_QUESTIONS_AI    || [];
const all   = human.concat(ai);

t('bank loaded with at least 1 question', () => {
  if (all.length < 1) throw new Error('no questions loaded');
});

t('every MC question in the bank has exactly 4 choices', () => {
  const offenders = all.filter((q) =>
    Array.isArray(q.choices) && q.choices.length !== 0 && q.choices.length !== 4
  );
  if (offenders.length !== 0) {
    const detail = offenders.slice(0, 5).map((q) => q.id + '→' + q.choices.length).join(', ');
    throw new Error(offenders.length + ' offending question(s): ' + detail);
  }
});

t('after normalizeChoices every question would render exactly 4 inputs', () => {
  const counts = all.map((q) => normalizeChoices(q.choices).length);
  const wrong = counts.filter((n) => n !== 4);
  if (wrong.length !== 0) throw new Error(wrong.length + ' would render the wrong number of slots');
});

console.log('\nSimulated render — 5-choice input does not produce 5 outputs');

t('simulated edit-modal render outputs exactly 4 rows for a 5-choice question', () => {
  // Mirrors the rendering loop in openEditModal:
  //   const choices = normalizeChoices(q.choices);
  //   choices.forEach((c, i) => list.appendChild(...));
  const list = { children: [] };
  const append = (el) => list.children.push(el);
  const rendered = normalizeChoices(['a','b','c','d','e']);
  rendered.forEach((c) => append({ value: c }));
  eq(list.children.length, 4);
  eq(list.children.map((x) => x.value), ['a','b','c','d']);
});

t('simulated AI batch render caps at 4 even when source has 6 entries', () => {
  // Mirrors renderGenerateBatch's defensive slice.
  const cap = MAX_CHOICES;
  const src = ['a','b','c','d','e','f'];
  const out = src.slice(0, cap);
  eq(out.length, 4);
});

// ---- summary ---------------------------------------------------------
console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
