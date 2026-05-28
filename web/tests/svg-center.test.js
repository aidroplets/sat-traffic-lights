/**
 * SVG figure auto-centering tests.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/svg-center.test.js
 *
 * The contract: centerSvgFigure(svg) measures the drawn-content bounding
 * box (excluding the full-bleed background rect) and slides the viewBox
 * window + background rect so the content sits dead-center — both
 * horizontally and vertically — without moving any element coordinate.
 *
 * Loads the REAL function out of app.js via a stub-DOM vm sandbox (same
 * pattern as the other source-level tests) so we exercise the shipping
 * code, not a re-implementation.
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

// ---- stub DOM so app.js loads + exposes STL_TEST_HOOKS -----------------
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
const doc = {
  body: el('body'), documentElement: el('html'), head: el('head'),
  createElement: (t) => el(t), createElementNS: () => el(),
  getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
  addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => {},
  // 'loading' so the boot handler registers on DOMContentLoaded (which
  // never fires here) instead of running inline and touching #stl-main.
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
sb.window = sb;
vm.createContext(sb);
const root = path.resolve(__dirname, '..');
for (const f of ['questions.js', 'questions-generated.js', 'questions-isee-act.js', 'auth.js', 'app.js']) {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) continue;
  try { vm.runInContext(fs.readFileSync(p, 'utf8'), sb, { filename: f }); }
  catch (_) { /* boot needs a real DOM; module-level hooks are already set */ }
}
const center = (sb.STL_TEST_HOOKS || {}).centerSvgFigure;

// Parse a viewBox out of an SVG string → [x,y,w,h]
const vb = (svg) => {
  const m = svg.match(/viewBox\s*=\s*"([\d.\-\s,]+)"/i);
  if (!m) return null;
  return m[1].trim().split(/[\s,]+/).map(Number);
};

t('centerSvgFigure is exposed via STL_TEST_HOOKS', () => {
  if (typeof center !== 'function') throw new Error('not a function');
});

// The real off-center dot-plot from the 2026-05-25 SAT import (q-satm-2025-...).
const DOTPLOT = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 170" font-family="Helvetica, Arial, sans-serif" font-size="12"><rect x="0" y="0" width="420" height="170" rx="8" fill="#ffffff"/><line x1="52" y1="128" x2="403" y2="128" stroke="#222" stroke-width="1.4"/><g fill="#1d2733"><circle cx="60.0" cy="119.0" r="5"/><circle cx="115.8" cy="119.0" r="5"/><circle cx="115.8" cy="106.0" r="5"/><circle cx="171.7" cy="119.0" r="5"/><circle cx="171.7" cy="106.0" r="5"/><circle cx="171.7" cy="93.0" r="5"/><circle cx="227.5" cy="119.0" r="5"/><circle cx="227.5" cy="106.0" r="5"/><circle cx="283.3" cy="119.0" r="5"/><circle cx="395.0" cy="119.0" r="5"/></g><g text-anchor="middle" fill="#222"><text x="60.0" y="144">4</text><text x="115.8" y="144">5</text><text x="171.7" y="144">6</text><text x="227.5" y="144">7</text><text x="283.3" y="144">8</text><text x="339.2" y="144">9</text><text x="395.0" y="144">10</text></g><text x="227" y="164" text-anchor="middle" fill="#222">Score</text></svg>';

t('dot plot: content gets centered horizontally + vertically in the viewBox', () => {
  const out = center(DOTPLOT);
  const v = vb(out);
  if (!v) throw new Error('no viewBox in output');
  const [x, y, w, h] = v;
  // size preserved
  if (w !== 420 || h !== 170) throw new Error('viewBox size changed: ' + v.join(' '));
  // Content x-extent is the axis line 52..403 → center 227.5. The
  // viewBox center (x + w/2) must land on it.
  const cxWindow = x + w / 2;
  if (Math.abs(cxWindow - 227.5) > 1) throw new Error('not h-centered: window cx=' + cxWindow);
  // Content y-extent: top dot 88 .. "Score" baseline 164 → center 126.
  const cyWindow = y + h / 2;
  if (Math.abs(cyWindow - 126) > 2) throw new Error('not v-centered: window cy=' + cyWindow);
});

t('dot plot: background rect is moved to fill the repositioned window', () => {
  const out = center(DOTPLOT);
  const v = vb(out);
  const rect = out.match(/<rect\b[^>]*>/i)[0];
  const rx = parseFloat((rect.match(/\bx\s*=\s*"([^"]*)"/) || [])[1]);
  const ry = parseFloat((rect.match(/\by\s*=\s*"([^"]*)"/) || [])[1]);
  if (Math.abs(rx - v[0]) > 0.6) throw new Error('bg rect x ' + rx + ' != viewBox x ' + v[0]);
  if (Math.abs(ry - v[1]) > 0.6) throw new Error('bg rect y ' + ry + ' != viewBox y ' + v[1]);
});

t('idempotent: centering an already-centered svg is a no-op', () => {
  const once = center(DOTPLOT);
  const twice = center(once);
  if (once !== twice) throw new Error('second pass changed the svg');
});

t('no viewBox → returned unchanged', () => {
  const s = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="2"/></svg>';
  if (center(s) !== s) throw new Error('mutated an svg with no viewBox');
});

t('path-based figure (parabola) is measured without throwing', () => {
  const para = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect x="0" y="0" width="300" height="200" fill="#fff"/><path d="M 40 180 Q 120 -40 200 180" stroke="#222" fill="none"/></svg>';
  const out = center(para);
  const v = vb(out);
  if (!v) throw new Error('no viewBox');
  // Control point y=-40 over-bounds upward; content x-extent 40..200 →
  // center 120, so window cx should land near 120.
  if (Math.abs((v[0] + v[2] / 2) - 120) > 1) throw new Error('parabola not h-centered: ' + (v[0] + v[2] / 2));
});

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
