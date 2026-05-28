/**
 * Figure-aware dedup tests.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/dedup-figure.test.js
 *
 * Contract: many figure-based questions share a generic stem ("In the
 * figure shown, what is the value of x?") and differ ONLY by their
 * SVG/image/chart. The import dedup key must include a figure signature
 * so two such questions are NOT collapsed into one. Same stem + same
 * figure still dedups; same stem + different figure does not.
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

function el(tag) { const c = []; return {
  tagName: (tag || 'div').toUpperCase(), children: c,
  classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
  dataset: {}, style: {}, attributes: {}, addEventListener() {}, removeEventListener() {},
  appendChild(x) { c.push(x); return x; }, insertBefore(x) { c.push(x); return x; },
  setAttribute() {}, getAttribute() {}, removeAttribute() {},
  querySelector() { return null; }, querySelectorAll() { return []; }, getContext() { return {}; },
  set innerHTML(v) { this._i = v; }, get innerHTML() { return this._i || ''; },
}; }
const doc = { body: el(), documentElement: el(), head: el(), createElement: (t) => el(t),
  createElementNS: () => el(), getElementById: () => null, querySelector: () => null,
  querySelectorAll: () => [], addEventListener() {}, removeEventListener() {}, dispatchEvent() {}, readyState: 'loading' };
const ls = (() => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null),
  setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), clear() {} }; })();
const sb = { document: doc, localStorage: ls, sessionStorage: ls, window: null, STL_AUTH: null,
  CustomEvent: function () { return {}; }, MutationObserver: function () { return { observe() {}, disconnect() {} }; },
  IntersectionObserver: function () { return { observe() {}, disconnect() {} }; },
  ResizeObserver: function () { return { observe() {}, disconnect() {} }; },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  requestAnimationFrame: () => 0, cancelAnimationFrame() {}, setTimeout, clearTimeout, setInterval, clearInterval,
  performance: { now: () => Date.now() }, console, location: { pathname: '/', search: '', hash: '' },
  history: { replaceState() {} }, navigator: { userAgent: 'node' },
  addEventListener() {}, removeEventListener() {}, fetch: () => Promise.reject(new Error('no net')) };
sb.window = sb; vm.createContext(sb);
const root = path.resolve(__dirname, '..');
for (const f of ['questions.js', 'questions-generated.js', 'questions-isee-act.js', 'auth.js', 'app.js']) {
  const p = path.join(root, f); if (!fs.existsSync(p)) continue;
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), sb, { filename: f }); } catch (_) {}
}
const H = sb.STL_TEST_HOOKS || {};
const key = (q) => H.dedupKey(q.stem, q.table, H.figureSignature(q));

const STEM = 'In the figure shown, what is the value of x?';
const A = { stem: STEM, svg: '<svg viewBox="0 0 100 100"><line x1="0" y1="0" x2="50" y2="50"/></svg>' };
const B = { stem: STEM, svg: '<svg viewBox="0 0 100 100"><circle cx="40" cy="40" r="9"/></svg>' };
const A2 = { stem: STEM, svg: A.svg };

t('hooks exposed (dedupKey + figureSignature)', () => {
  if (typeof H.dedupKey !== 'function' || typeof H.figureSignature !== 'function') throw new Error('missing hooks');
});
t('same stem + DIFFERENT svg → different dedup keys (both import)', () => {
  if (key(A) === key(B)) throw new Error('figure-only-differing questions collapsed to one key');
});
t('same stem + SAME svg → identical dedup keys (still dedups)', () => {
  if (key(A) !== key(A2)) throw new Error('identical questions did not dedup');
});
t('no-figure question still keys on stem alone (back-compat)', () => {
  const q = { stem: STEM };
  if (H.figureSignature(q) !== '') throw new Error('empty figure should yield empty signature');
  if (key(q) !== H.dedupKey(STEM, undefined, '')) throw new Error('no-figure key changed shape');
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
