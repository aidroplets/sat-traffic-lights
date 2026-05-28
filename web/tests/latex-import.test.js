/**
 * LaTeX import/render regression tests for the 2026-05-27 "one per level"
 * SAT-math batch, which shipped bank-shaped fields with raw-LaTeX text.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/latex-import.test.js
 *
 * Covers the gaps that surfaced:
 *   • \dfrac / \tfrac must render as fractions (were showing literal "dfrac{1}{4}")
 *   • \text{...} must render as its content (was showing literal "text{...}")
 *   • mis-escaped currency "\12" must read as "$12"
 *   • orphaned "$" (e.g. "c$") must be dropped, real currency "$12" kept
 *   • markdown tables embedded in a stem must lift into q.table
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let passed = 0, failed = 0;
const t = (name, fn) => { try { fn(); console.log('  ✓', name); passed++; }
  catch (e) { console.log('  ✗', name); console.log('     ', e.message); failed++; } };

function el(tag) { const c = []; return { tagName: (tag || 'div').toUpperCase(), children: c,
  classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }, dataset: {}, style: {}, attributes: {},
  addEventListener() {}, removeEventListener() {}, appendChild(x) { c.push(x); return x; }, insertBefore(x) { c.push(x); return x; },
  setAttribute() {}, getAttribute() {}, removeAttribute() {}, querySelector() { return null; }, querySelectorAll() { return []; },
  getContext() { return {}; }, set innerHTML(v) { this._i = v; }, get innerHTML() { return this._i || ''; } }; }
const doc = { body: el(), documentElement: el(), head: el(), createElement: (t) => el(t), createElementNS: () => el(),
  getElementById: () => null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, removeEventListener() {}, dispatchEvent() {}, readyState: 'loading' };
const ls = (() => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), clear() {} }; })();
const sb = { document: doc, localStorage: ls, sessionStorage: ls, window: null, STL_AUTH: null, CustomEvent: function () { return {}; },
  MutationObserver: function () { return { observe() {}, disconnect() {} }; }, IntersectionObserver: function () { return { observe() {}, disconnect() {} }; },
  ResizeObserver: function () { return { observe() {}, disconnect() {} }; }, matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
  requestAnimationFrame: () => 0, cancelAnimationFrame() {}, setTimeout, clearTimeout, setInterval, clearInterval,
  performance: { now: () => Date.now() }, console, location: { pathname: '/', search: '', hash: '' }, history: { replaceState() {} },
  navigator: { userAgent: 'node' }, addEventListener() {}, removeEventListener() {}, fetch: () => Promise.reject(new Error('no net')) };
sb.window = sb; vm.createContext(sb);
const root = path.resolve(__dirname, '..');
for (const f of ['questions.js', 'questions-generated.js', 'questions-isee-act.js', 'auth.js', 'app.js']) {
  const p = path.join(root, f); if (!fs.existsSync(p)) continue;
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), sb, { filename: f }); } catch (_) {}
}
const H = sb.STL_TEST_HOOKS || {};
const F = H.formatRich;

t('\\dfrac renders as a fraction, not literal "dfrac"', () => {
  const o = F('\\;\\dfrac{1}{4}');
  if (!o.includes('stl-math-displayfrac')) throw new Error('no fraction: ' + o);
  if (/dfrac/.test(o)) throw new Error('literal dfrac leaked: ' + o);
});
t('\\tfrac renders as a fraction', () => {
  if (!F('\\tfrac{3}{2}').includes('stl-math-displayfrac')) throw new Error('tfrac not rendered');
});
t('\\text{...} renders as its content', () => {
  const o = F('\\text{hours}');
  if (!o.includes('hours')) throw new Error('text content missing: ' + o);
  if (/text\{/.test(o)) throw new Error('literal text{ leaked: ' + o);
});
t('mis-escaped currency "\\12" reads as "$12"', () => {
  const o = F('adult tickets cost \\12 each');
  if (!o.includes('$12')) throw new Error('currency not recovered: ' + o);
  if (/\\12/.test(o)) throw new Error('literal backslash-12 leaked: ' + o);
});
t('orphaned "$" dropped, real currency kept', () => {
  const o = F('a and c$ is the number; pay \\52 total');
  if (/c\$/.test(o)) throw new Error('orphaned $ survived: ' + o);
  if (!o.includes('$52')) throw new Error('currency $52 lost: ' + o);
});
t('markdown table in a stem lifts into q.table', () => {
  if (typeof H.extractMarkdownTable !== 'function') throw new Error('extractMarkdownTable hook missing');
  const stem = 'The table shows values.\n\n| x | y |\n|---|---|\n| 0 | 9 |\n| 1 | 6 |\n\nWhat is m + b?';
  const r = H.extractMarkdownTable(stem);
  if (!r.table) throw new Error('no table extracted');
  if (/\|/.test(r.cleanedStem)) throw new Error('pipes left in cleaned stem: ' + r.cleanedStem);
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
