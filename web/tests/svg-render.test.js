/**
 * SVG render smoke test: spin up jsdom, drop every chart-bearing
 * question's SVG into a container, then read it back to confirm
 * the DOM parsed it cleanly. This is the closest we can get to a
 * "does it render?" check without an actual browser.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/svg-render.test.js
 *
 * Catches:
 *   • malformed SVG markup (jsdom errors / returns null)
 *   • SVGs that lose their root <svg> on innerHTML assignment
 *     (happens when the SVG is not a proper namespaced document)
 *   • SVGs that strip to empty after sanitization
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Resolve jsdom from /tmp (installed there to avoid touching the
// repo's empty package.json).
let JSDOM;
try {
  JSDOM = require('/tmp/node_modules/jsdom').JSDOM;
} catch (e) {
  try { JSDOM = require('jsdom').JSDOM; }
  catch (e2) {
    console.error('jsdom not installed. Run: npm install --no-save --prefix /tmp jsdom');
    process.exit(1);
  }
}

let passed = 0;
let failed = 0;
const t = (name, fn) => {
  try { fn(); console.log('  ✓', name); passed++; }
  catch (err) { console.log('  ✗', name); console.log('     ', err.message); failed++; }
};

const loadBank = (relPath) => {
  const window = {};
  const ctx = vm.createContext({ window });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', relPath), 'utf8'), ctx);
  return window.STL_QUESTIONS_AI || [];
};

console.log('SVG render smoke (jsdom)');

const QS = loadBank('questions-sat-math-import-2026-05-25.js');
const withSvg = QS.filter((q) => q.svg);

t('jsdom can parse a synthetic SVG fragment as a sanity baseline', () => {
  const dom = new JSDOM('<!doctype html><div id="x"></div>');
  const el = dom.window.document.getElementById('x');
  el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><rect width="10" height="10"/></svg>';
  const svg = el.querySelector('svg');
  if (!svg) throw new Error('jsdom failed to parse the baseline SVG');
  if (svg.getAttribute('viewBox') !== '0 0 10 10') throw new Error('viewBox attribute lost');
});

t('all 69 chart-bearing questions are present', () => {
  if (withSvg.length !== 69) throw new Error('expected 69, got ' + withSvg.length);
});

t('every chart SVG parses in jsdom and yields a non-empty <svg> root', () => {
  const dom = new JSDOM('<!doctype html><div id="x"></div>');
  const el = dom.window.document.getElementById('x');
  const offenders = [];
  for (const q of withSvg) {
    el.innerHTML = q.svg;
    const svg = el.querySelector('svg');
    if (!svg) { offenders.push(q.id + ' (' + q.sourceId + '): no <svg> after parse'); continue; }
    if (!svg.getAttribute('viewBox')) { offenders.push(q.id + ': viewBox lost on parse'); continue; }
    // A real chart should have at least one drawn element inside.
    if (svg.children.length === 0) { offenders.push(q.id + ': svg has no children'); continue; }
  }
  if (offenders.length) {
    throw new Error(offenders.length + '/' + withSvg.length + ' failures — first: ' + offenders[0]);
  }
});

t('charts include at least one shape primitive (line, rect, circle, polyline, path, polygon, text)', () => {
  const dom = new JSDOM('<!doctype html><div id="x"></div>');
  const el = dom.window.document.getElementById('x');
  const shapeTags = ['line', 'rect', 'circle', 'polyline', 'path', 'polygon', 'text'];
  const offenders = [];
  for (const q of withSvg) {
    el.innerHTML = q.svg;
    const svg = el.querySelector('svg');
    if (!svg) continue;
    const hasShape = shapeTags.some((tag) => svg.querySelector(tag));
    if (!hasShape) offenders.push(q.id + ' (' + q.sourceId + '): no drawable primitives');
  }
  if (offenders.length) {
    throw new Error(offenders.length + ' chart(s) have no shapes — first: ' + offenders[0]);
  }
});

t('no chart SVG contains <script> or on*= attributes (XSS guard)', () => {
  // The renderer drops q.svg straight into figure.innerHTML, so
  // anything event-handler-ish would execute. Bank should be clean.
  for (const q of withSvg) {
    if (/<script\b/i.test(q.svg)) throw new Error(q.id + ': <script> in svg');
    if (/\son\w+\s*=/i.test(q.svg)) throw new Error(q.id + ': on*= handler in svg');
    if (/javascript:/i.test(q.svg)) throw new Error(q.id + ': javascript: URL in svg');
  }
});

t('a representative scatterplot has both axis ticks AND data points', () => {
  // Scatterplots from this batch use <line> for axes/gridlines and
  // <circle> (or <text>) for data markers. If either is missing,
  // the figure is broken.
  const scatters = withSvg.filter((q) => q.topic === 'scatterplots-and-models');
  if (scatters.length === 0) throw new Error('no scatterplots found');
  const dom = new JSDOM('<!doctype html><div id="x"></div>');
  const el = dom.window.document.getElementById('x');
  const offenders = [];
  for (const q of scatters) {
    el.innerHTML = q.svg;
    const svg = el.querySelector('svg');
    if (!svg) { offenders.push(q.id + ': svg parse failed'); continue; }
    const lines = svg.querySelectorAll('line').length;
    const circles = svg.querySelectorAll('circle').length;
    // Some scatters draw points as <rect> markers instead of circles —
    // accept either as evidence of data.
    const rects = svg.querySelectorAll('rect').length;
    if (lines === 0) offenders.push(q.id + ': no axis/grid lines');
    if (circles === 0 && rects === 0) offenders.push(q.id + ': no point markers');
  }
  if (offenders.length) {
    throw new Error(offenders.length + ' scatterplot issue(s) — first: ' + offenders[0]);
  }
});

t('at most a handful of charts share identical full SVG content', () => {
  // Hand-curated upload occasionally reuses the same figure across
  // related questions (e.g. one rectangle figure → two problems asking
  // for area and perimeter respectively). Soft cap: ≤3 exact-content
  // dupe pairs across the batch is fine; more than that signals a
  // generator copy-paste bug, not editorial intent.
  const exact = new Map();
  for (const q of withSvg) {
    exact.set(q.svg, (exact.get(q.svg) || []).concat(q.id));
  }
  const dupeGroups = [...exact.values()].filter((ids) => ids.length > 1);
  if (dupeGroups.length > 3) {
    throw new Error(dupeGroups.length + ' exact-content SVG dupe groups (cap is 3) — first: ' +
                    dupeGroups[0].join(' / '));
  }
});

console.log('');
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
