/**
 * Square-root rendering regression tests.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/sqrt-render.test.js
 *
 * Contract (Mike's "messed up root symbol"): \sqrt must render via
 * KaTeX (a real, connected radical), NOT the legacy CSS √-glyph + border
 * treatment — whenever KaTeX is available. The radicand reaches the math
 * renderer already wrapped in <em class="stl-quiz__var"> variable tags
 * (from formatStemHtml/wrapExpressions); those HTML tags must be stripped
 * before the LaTeX is handed to KaTeX, otherwise KaTeX can't parse it.
 *
 * When KaTeX is NOT loaded (cold start), \sqrt must still fall back to
 * the legacy CSS radical so something renders before KaTeX arrives.
 *
 * Loads the real app.js in a stub-DOM vm sandbox with a STUBBED
 * window.katex so we exercise the actual routing logic.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let passed = 0, failed = 0;
const t = (name, fn) => {
  try { fn(); console.log('  ✓', name); passed++; }
  catch (e) { console.log('  ✗', name); console.log('     ', e.message); failed++; }
};

function el(tag) {
  const c = [];
  return {
    tagName: (tag || 'div').toUpperCase(), children: c,
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    dataset: {}, style: {}, attributes: {},
    addEventListener() {}, removeEventListener() {},
    appendChild(x) { c.push(x); return x; }, insertBefore(x) { c.push(x); return x; },
    setAttribute(k, v) { this.attributes[k] = v; }, getAttribute(k) { return this.attributes[k]; },
    removeAttribute() {}, querySelector() { return null; }, querySelectorAll() { return []; },
    getContext() { return {}; },
    set innerHTML(v) { this._i = v; c.length = 0; }, get innerHTML() { return this._i || ''; },
  };
}

// Build a fresh sandbox. `withKatex` controls whether window.katex exists.
function loadApp(withKatex) {
  const calls = [];
  const doc = {
    body: el('body'), documentElement: el('html'), head: el('head'),
    createElement: (t) => el(t), createElementNS: () => el(),
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => {},
    readyState: 'loading',
  };
  const ls = (() => { const m = new Map(); return {
    getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k), clear: () => m.clear(),
  }; })();
  const sb = {
    document: doc, localStorage: ls, sessionStorage: ls, window: null,
    STL_AUTH: null, CustomEvent: function () { return {}; },
    MutationObserver: function () { return { observe() {}, disconnect() {} }; },
    IntersectionObserver: function () { return { observe() {}, disconnect() {} }; },
    ResizeObserver: function () { return { observe() {}, disconnect() {} }; },
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    requestAnimationFrame: () => 0, cancelAnimationFrame() {},
    setTimeout, clearTimeout, setInterval, clearInterval,
    performance: { now: () => Date.now() }, console,
    location: { pathname: '/', search: '', hash: '' },
    history: { replaceState() {}, pushState() {} },
    navigator: { userAgent: 'node' },
    addEventListener: () => {}, removeEventListener: () => {}, fetch: () => Promise.reject(new Error('no net')),
  };
  if (withKatex) {
    sb.katex = {
      renderToString: (tex) => { calls.push(tex); return '<span class="katex-STUB">' + tex + '</span>'; },
    };
  }
  sb.window = sb;
  vm.createContext(sb);
  const root = path.resolve(__dirname, '..');
  for (const f of ['questions.js', 'questions-generated.js', 'questions-isee-act.js', 'auth.js', 'app.js']) {
    const p = path.join(root, f);
    if (!fs.existsSync(p)) continue;
    try { vm.runInContext(fs.readFileSync(p, 'utf8'), sb, { filename: f }); }
    catch (_) { /* boot needs real DOM; hooks already set */ }
  }
  return { hooks: sb.STL_TEST_HOOKS || {}, calls };
}

const STEM = 'What is the solution to \\sqrt{2x + 1} = 5?';

t('with KaTeX: \\sqrt routes to KaTeX, not the legacy CSS radical', () => {
  const { hooks, calls } = loadApp(true);
  if (typeof hooks.formatRich !== 'function') throw new Error('formatRich not exposed');
  const out = hooks.formatRich(STEM);
  if (out.indexOf('katex-STUB') === -1) throw new Error('KaTeX path not used: ' + out);
  if (out.indexOf('stl-math-sqrt') !== -1) throw new Error('legacy CSS radical leaked into KaTeX output');
});

t('with KaTeX: radicand HTML (<em> var wrappers) is stripped before KaTeX', () => {
  const { hooks, calls } = loadApp(true);
  hooks.formatRich(STEM);
  const sqrtCall = calls.find((c) => c.indexOf('\\sqrt') !== -1);
  if (!sqrtCall) throw new Error('katex never called with a \\sqrt expression');
  if (sqrtCall.indexOf('<') !== -1) throw new Error('HTML leaked into KaTeX input: ' + sqrtCall);
  if (!/\\sqrt\{\s*2x \+ 1\s*\}/.test(sqrtCall)) throw new Error('unexpected latex handed to KaTeX: ' + sqrtCall);
});

t('with KaTeX: nth-root \\sqrt[3]{x + 1} also routes to KaTeX', () => {
  const { hooks, calls } = loadApp(true);
  const out = hooks.formatRich('What is the solution to \\sqrt[3]{x + 1} = 3?');
  if (out.indexOf('katex-STUB') === -1) throw new Error('cube root not rendered via KaTeX');
  const call = calls.find((c) => c.indexOf('\\sqrt[3]') !== -1);
  if (!call) throw new Error('katex not called with \\sqrt[3]{...}');
});

t('cold start (no KaTeX): \\sqrt falls back to the legacy CSS radical', () => {
  const { hooks } = loadApp(false);
  const out = hooks.formatRich(STEM);
  if (out.indexOf('stl-math-sqrt') === -1) throw new Error('no CSS-radical fallback when KaTeX absent: ' + out);
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
