/**
 * Math-rendering regression tests.
 *
 * Run from the repo root:
 *   node web/tests/math-render.test.js
 *
 * Covers three rendering rules that have all bit users in the past:
 *   1. Multi-letter runs flush against a digit (e.g. "14xy") split into
 *      individual italic variables so the entire token reads as math.
 *   2. Bare digit exponents (`x^2`, `x^10`, `x^-3`) render as <sup>,
 *      not as a literal `^` followed by digits.
 *   3. The whole expression run wraps in <span class="stl-quiz__expr">
 *      so the digits/operators inherit the accent color and the run
 *      can be flagged white-space:nowrap by CSS.
 *
 * The tests load app.js in a stub-DOM sandbox and pull formatRich and
 * its components off STL_TEST_HOOKS — same pattern as choice-input.test.js.
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

let passed = 0;
let failed = 0;
const t = (name, fn) => {
  try { fn(); console.log('  ✓', name); passed++; }
  catch (err) { console.log('  ✗', name); console.log('     ', err.message); failed++; }
};
const has = (haystack, needle, msg) => {
  if (!haystack.includes(needle)) {
    throw new Error((msg || '') + ' expected output to contain ' + JSON.stringify(needle) + ', got ' + JSON.stringify(haystack));
  }
};
const lacks = (haystack, needle, msg) => {
  if (haystack.includes(needle)) {
    throw new Error((msg || '') + ' expected output to NOT contain ' + JSON.stringify(needle) + ', got ' + JSON.stringify(haystack));
  }
};

// ---- minimal stub DOM ------------------------------------------------
function makeStubElement(tag = 'div') {
  const children = [];
  return {
    tagName: (tag || 'div').toUpperCase(),
    children,
    classList: { add(){}, remove(){}, toggle(){}, contains(){return false;} },
    dataset: {}, style: {}, attributes: {},
    addEventListener(){}, removeEventListener(){},
    appendChild(c){ children.push(c); return c; },
    setAttribute(k,v){ this.attributes[k] = v; },
    getAttribute(k){ return this.attributes[k]; },
    querySelector(){ return null; },
    querySelectorAll(){ return []; },
    set innerHTML(v){ this._inner = v; children.length = 0; },
    get innerHTML(){ return this._inner || ''; },
  };
}
const stubDoc = {
  body: makeStubElement('body'),
  documentElement: makeStubElement('html'),
  createElement: (tag) => makeStubElement(tag),
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener(){}, removeEventListener(){}, dispatchEvent(){},
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
  MutationObserver: function(){ return { observe(){}, disconnect(){} }; },
  matchMedia: () => ({ matches: false, addEventListener(){}, removeEventListener(){} }),
  setTimeout, clearTimeout, setInterval, clearInterval,
  performance: { now: () => Date.now() },
  console,
};
sandbox.window = sandbox;
vm.createContext(sandbox);

const root = path.resolve(__dirname, '..');
for (const f of ['questions.js', 'questions-generated.js', 'auth.js', 'app.js']) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f }); }
  catch (e) { /* DOM bits during init are fine to swallow */ }
}

const hooks = sandbox.STL_TEST_HOOKS;
if (!hooks || typeof hooks.formatRich !== 'function') {
  console.error('FAIL: formatRich not exposed via window.STL_TEST_HOOKS');
  process.exit(1);
}
const { formatRich, formatStemHtml, renderMath } = hooks;

// ---- tests -----------------------------------------------------------
console.log('formatStemHtml() — single-letter variables');

t('single letter "x" preceded by digit gets italicized', () => {
  has(formatStemHtml('5x'), '<em class="stl-quiz__var">x</em>');
});

t('English word "expression" stays plain', () => {
  has(formatStemHtml('Which expression'), 'expression');
  lacks(formatStemHtml('Which expression'), '<em');
});

t('"a" article stays plain in prose', () => {
  has(formatStemHtml('A bar chart'), 'A bar chart');
  lacks(formatStemHtml('A bar chart'), '<em class="stl-quiz__var">A</em>');
});

console.log('formatStemHtml() — past-whitespace math-context check');

t('trailing "a" in "10a² + a" italicizes (operator past whitespace)', () => {
  has(formatStemHtml('10a² + a'),
    '<em class="stl-quiz__var">a</em>² + <em class="stl-quiz__var">a</em>');
});

t('middle "a" in "8a² + a + 8" italicizes (operator on both sides past space)', () => {
  has(formatStemHtml('8a² + a + 8'),
    '² + <em class="stl-quiz__var">a</em> + 8');
});

t('leading "a" in "a + 5" italicizes (operator past space on right)', () => {
  has(formatStemHtml('a + 5'), '<em class="stl-quiz__var">a</em> + 5');
});

t('"a" in "There are 5, a total" stays plain (`,` is not in the strict operator set)', () => {
  const out = formatStemHtml('There are 5, a total of 10.');
  lacks(out, '<em class="stl-quiz__var">a</em>');
  lacks(out, '<em class="stl-quiz__var">A</em>');
});

t('"I" in "I am alone" stays plain (no math context past whitespace)', () => {
  const out = formatStemHtml('I am alone');
  lacks(out, '<em class="stl-quiz__var">I</em>');
});

t('"A" sentence-leading capital stays plain (no math past whitespace)', () => {
  const out = formatStemHtml('Apples cost 5 dollars. A few are free.');
  lacks(out, '<em class="stl-quiz__var">A</em>');
});

console.log('formatStemHtml() — multi-letter runs adjacent to digits');

t('"xy" preceded by digit splits into per-letter <em>s', () => {
  const out = formatStemHtml('14xy');
  has(out, '<em class="stl-quiz__var">x</em><em class="stl-quiz__var">y</em>');
});

t('"xyz" preceded by digit splits into per-letter <em>s', () => {
  const out = formatStemHtml('5xyz');
  has(out, '<em class="stl-quiz__var">x</em><em class="stl-quiz__var">y</em><em class="stl-quiz__var">z</em>');
});

t('"axis" in "X-axis" stays as a plain word', () => {
  const out = formatStemHtml('X-axis');
  // X is single-letter, gets italicized; "axis" is multi-letter, NOT
  // adjacent to a digit, must stay plain.
  lacks(out, '<em class="stl-quiz__var">a</em>');
  lacks(out, '<em class="stl-quiz__var">x</em><em class="stl-quiz__var">i</em>');
});

t('"dollars" in "100 dollars" stays as a plain word (whitespace separator)', () => {
  const out = formatStemHtml('100 dollars');
  lacks(out, '<em class="stl-quiz__var">d</em>');
});

console.log('renderMath() — bare digit exponents');

t('"x^2" renders ^2 as <sup>', () => {
  const out = renderMath('x^2');
  has(out, '<sup class="stl-math-sup">2</sup>');
  lacks(out, 'x^2');
});

t('"x^10" renders ^10 as <sup> (multi-digit)', () => {
  const out = renderMath('x^10');
  has(out, '<sup class="stl-math-sup">10</sup>');
});

t('"x^-3" renders negative exponent', () => {
  const out = renderMath('x^-3');
  has(out, '<sup class="stl-math-sup">-3</sup>');
});

t('"a^(1/2)" still renders fraction superscript', () => {
  const out = renderMath('a^(1/2)');
  has(out, 'stl-math-fracsup');
  has(out, '<span class="stl-math-num">1</span>');
  has(out, '<span class="stl-math-den">2</span>');
});

console.log('formatRich() — full pipeline on the polynomial-factoring case');

t('"35x^3y + 14xy" wraps the whole expression and italicizes "xy"', () => {
  const out = formatRich('Which expression is equivalent to 35x^3y + 14xy?');
  // The whole math run is in an expression span.
  has(out, '<span class="stl-quiz__expr">');
  // x^3 became a superscript, not a literal caret.
  has(out, '<sup class="stl-math-sup">3</sup>');
  lacks(out, '^3');
  // "xy" at the end is two italicized variables, not plain text.
  has(out, '<em class="stl-quiz__var">x</em><em class="stl-quiz__var">y</em>');
});

t('answer choice "7xy(5x^2 + 2)" renders as one expression with superscript', () => {
  const out = formatRich('7xy(5x^2 + 2)');
  has(out, '<span class="stl-quiz__expr">');
  has(out, '<sup class="stl-math-sup">2</sup>');
  has(out, '<em class="stl-quiz__var">x</em><em class="stl-quiz__var">y</em>');
});

console.log('renderMath() — \\frac{} display fractions');

t('"\\frac{1}{2}" produces a stacked display fraction', () => {
  const out = renderMath('\\frac{1}{2}');
  has(out, 'stl-math-displayfrac');
  has(out, '<span class="stl-math-displayfrac__num">1</span>');
  has(out, '<span class="stl-math-displayfrac__den">2</span>');
  lacks(out, '\\frac');
});

t('"\\frac{2x-5}{3}" handles a multi-character numerator', () => {
  const out = renderMath('\\frac{2x-5}{3}');
  has(out, 'stl-math-displayfrac__num');
  has(out, '2x-5</span>');
  has(out, '<span class="stl-math-displayfrac__den">3</span>');
});

t('"\\frac{x^2}{y}" renders the ^2 exponent inside the numerator', () => {
  const out = renderMath('\\frac{x^2}{y}');
  has(out, 'stl-math-displayfrac');
  has(out, '<sup class="stl-math-sup">2</sup>');
});

t('two \\frac calls in one string both render', () => {
  const out = renderMath('\\frac{1}{2} + \\frac{3}{4}');
  // Two displayfrac wrappers, two numerators, two denominators.
  const numCount = (out.match(/stl-math-displayfrac__num/g) || []).length;
  const denCount = (out.match(/stl-math-displayfrac__den/g) || []).length;
  if (numCount !== 2 || denCount !== 2) {
    throw new Error('expected 2 num + 2 den, got ' + numCount + ' / ' + denCount);
  }
});

t('nested "\\frac{\\frac{1}{2}}{3}" resolves inside-out', () => {
  const out = renderMath('\\frac{\\frac{1}{2}}{3}');
  // Outer frac wraps inner frac in its numerator.
  has(out, 'stl-math-displayfrac__num');
  // Inner 1/2 fraction rendered.
  has(out, '<span class="stl-math-displayfrac__num">1</span>');
  has(out, '<span class="stl-math-displayfrac__den">2</span>');
  // Outer denominator is just `3`.
  has(out, '<span class="stl-math-displayfrac__den">3</span>');
});

t('malformed "\\frac{1}" with no second {} leaves source partially intact', () => {
  // Should NOT infinite-loop. Output may keep the literal text but must
  // terminate with no thrown error.
  const out = renderMath('\\frac{1} oops');
  if (typeof out !== 'string') throw new Error('expected string output');
  has(out, 'oops');
});

console.log('renderMath() — \\sqrt{} radicals');

t('"\\sqrt{2}" renders a √ glyph plus a vinculum body', () => {
  const out = renderMath('\\sqrt{2}');
  has(out, 'stl-math-sqrt');
  has(out, '<span class="stl-math-sqrt__radical">√</span>');
  has(out, '<span class="stl-math-sqrt__body">2</span>');
});

t('"\\sqrt{x+1}" renders the radicand inline', () => {
  const out = renderMath('\\sqrt{x+1}');
  has(out, 'stl-math-sqrt__body">x+1</span>');
});

t('"\\sqrt{\\frac{1}{2}}" nests a fraction under the radical', () => {
  const out = renderMath('\\sqrt{\\frac{1}{2}}');
  has(out, 'stl-math-sqrt');
  has(out, 'stl-math-displayfrac');
  has(out, '<span class="stl-math-displayfrac__num">1</span>');
});

console.log('formatRich() — \\frac integrated through the full pipeline');

t('"Solve for x: \\frac{2x-5}{3} = 1" italicizes x and stacks the fraction', () => {
  const out = formatRich('Solve for x: \\frac{2x-5}{3} = 1');
  // x in "Solve for x:" should be italicized variable.
  has(out, '<em class="stl-quiz__var">x</em>');
  // x inside the numerator should also be italicized.
  has(out, 'stl-math-displayfrac__num');
  // No raw \frac left in output.
  lacks(out, '\\frac');
});

console.log('');
console.log(`${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
