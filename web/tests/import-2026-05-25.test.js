/**
 * Render-shape + dedup + import-registry tests for the consolidated
 * 2026-05-25 SAT Math import.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/import-2026-05-25.test.js
 *
 * Scope: every question in questions-sat-math-2026-05-25.js must render
 * correctly in the live app. We can't actually mount the DOM in node,
 * but we can verify the bank's schema invariants that the renderer
 * relies on:
 *   • non-empty stem, no raw \LaTeX commands left over
 *   • MCQ: choices array of length 4, answer is int 0-3
 *   • SPR: choices null/[] and answer is non-empty string
 *   • topic slug present in UPLOAD_TOPIC_SLUGS (or matches a slug
 *     already in the bank — fail otherwise so an off-by-one in the
 *     slug map gets caught here)
 *   • each q.svg is well-formed XML and uses viewBox
 *   • each q.table has either headers+rows or firstColIsHeader+rows
 *   • each question has an importId pointing at an entry in STL_IMPORTS
 *     (the new joining-key the admin Imports tab keys on)
 *
 * Plus regression guards for the May 2026 round of converter bugs:
 *   • The Python `\ge` substring-replace used to corrupt `\geq` to `≥q`
 *     because it had no word boundary. Both translateLatexCommands (JS)
 *     and convert_latex_commands (Python) now use a (?![A-Za-z])
 *     lookahead. This test scans the bank file for `≥q` / `≤q` / `\geq`
 *     / `\leq` patterns to catch any regression.
 *   • Raw LaTeX commands like `\Rightarrow`, `\theta`, `\sin` were
 *     leaking through to the bank because the converter table only
 *     covered ~12 commands. Now we expect ZERO raw `\word` patterns in
 *     stems, choices, or explanations (other than `\frac`/`\sqrt` which
 *     the renderer handles natively).
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
const eq = (a, b, msg) => {
  if (JSON.stringify(a) !== JSON.stringify(b)) {
    throw new Error((msg ? msg + ' — ' : '') + 'expected ' + JSON.stringify(b) + ' got ' + JSON.stringify(a));
  }
};
const truthy = (v, msg) => { if (!v) throw new Error(msg || 'expected truthy, got ' + v); };

// Load the bank file in a sandboxed vm context. The file emits both
// STL_IMPORTS and STL_QUESTIONS_AI; we want both back.
const loadBank = (relPath) => {
  const window = {};
  const ctx = vm.createContext({ window });
  const code = fs.readFileSync(path.join(__dirname, '..', relPath), 'utf8');
  vm.runInContext(code, ctx);
  return {
    questions: window.STL_QUESTIONS_AI || [],
    imports:   window.STL_IMPORTS      || [],
  };
};

// Same normalizeStem + dedup contract as app.js's adapter.
const normalizeStem = (stem) => {
  if (!stem) return '';
  return String(stem).toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9]/g, '');
};
const tableSignature = (table) => {
  if (!table || !table.rows || !table.rows.length) return '';
  const parts = [];
  if (Array.isArray(table.headers)) parts.push(table.headers.map(String).join('|'));
  for (const r of table.rows) parts.push((r || []).map(String).join('|'));
  return normalizeStem(parts.join('||'));
};
const dedupKey = (stem, table) => normalizeStem(stem) + '##' + tableSignature(table);

// Pull UPLOAD_TOPIC_SLUGS out of app.js so we can validate every
// emitted topic slug is one the in-app adapter recognizes.
const APP_SRC = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const SLUGS_BLOCK = (() => {
  const m = APP_SRC.match(/const\s+UPLOAD_TOPIC_SLUGS\s*=\s*\{([\s\S]*?)\};/);
  if (!m) throw new Error('UPLOAD_TOPIC_SLUGS not found in app.js');
  return m[1];
})();
const KNOWN_SLUGS = new Set();
SLUGS_BLOCK.replace(/:\s*'([^']+)'/g, (_m, slug) => { KNOWN_SLUGS.add(slug); return _m; });

const BANK_FILE = 'questions-sat-math-2026-05-25.js';

console.log('2026-05-25 import — render-shape, dedup, import-registry contract');

// =========================================================
// 1) Bank loads cleanly and STL_IMPORTS registry is populated.
// =========================================================

const { questions: QS, imports: IMP } = loadBank(BANK_FILE);

t('bank file loads as a non-empty array', () => {
  truthy(Array.isArray(QS), 'expected an array');
  truthy(QS.length > 0, 'expected at least one question');
});

t('STL_IMPORTS registry self-registered', () => {
  truthy(Array.isArray(IMP), 'expected STL_IMPORTS to be an array');
  truthy(IMP.length === 1, 'expected exactly one entry, got ' + IMP.length);
  const e = IMP[0];
  if (e.id !== 'sat-math-2026-05-25') throw new Error('bad id: ' + e.id);
  if (!e.label || !e.source || !e.generatedAt || !e.file || !e.count) {
    throw new Error('STL_IMPORTS entry missing required fields');
  }
  if (e.count !== QS.length) {
    throw new Error('STL_IMPORTS count ' + e.count + ' ≠ actual ' + QS.length);
  }
});

t('expected ~772 questions emitted (792 input - 4 cross-bank - 16 intra-upload)', () => {
  // Exact bound: any change to dedup baseline or source order must
  // pass through here. Loosen slightly if you add more bank files to
  // the converter's --existing-stems list.
  eq(QS.length, 772);
});

t('every question has the SAT Math identity', () => {
  for (const q of QS) {
    if (q.testType !== 'SAT') throw new Error(q.id + ': testType ' + q.testType);
    if (q.section !== 'math') throw new Error(q.id + ': section ' + q.section);
    if (q.state !== 'live')   throw new Error(q.id + ': state ' + q.state);
  }
});

t('every question carries importId pointing at STL_IMPORTS', () => {
  const knownIds = new Set(IMP.map((i) => i.id));
  for (const q of QS) {
    if (!q.importId) throw new Error(q.id + ': missing importId');
    if (!knownIds.has(q.importId)) {
      throw new Error(q.id + ': importId "' + q.importId + '" not in STL_IMPORTS');
    }
  }
});

t('every question has a non-empty stem', () => {
  const bad = QS.filter((q) => !q.stem || !q.stem.trim());
  if (bad.length) throw new Error(bad.length + ' missing stem — first: ' + bad[0].id);
});

t('every question has a known topic slug', () => {
  const allowed = new Set(KNOWN_SLUGS);
  const bad = QS.filter((q) => !allowed.has(q.topic));
  if (bad.length) {
    const sample = bad.slice(0, 3).map((q) => `${q.id}=${q.topic}`).join(', ');
    throw new Error(bad.length + ' questions with unknown topic slugs — sample: ' + sample);
  }
});

t('topic distribution is non-trivial (at least 40 distinct topics)', () => {
  const topics = new Set(QS.map((q) => q.topic));
  if (topics.size < 40) {
    throw new Error('only ' + topics.size + ' topics — expected ≥40 across the SAT Math taxonomy');
  }
});

// =========================================================
// 2) MCQ and SPR shape invariants.
// =========================================================

t('MCQ questions have exactly 4 choices and answer index 0-3', () => {
  const mcq = QS.filter((q) => Array.isArray(q.choices) && q.choices.length > 0);
  if (mcq.length === 0) throw new Error('no MCQ questions found');
  for (const q of mcq) {
    if (q.choices.length !== 4) throw new Error(q.id + ': ' + q.choices.length + ' choices');
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) {
      throw new Error(q.id + ': bad answer index ' + q.answer);
    }
    for (const c of q.choices) {
      if (typeof c !== 'string' || !c.trim()) throw new Error(q.id + ': empty/non-string choice');
    }
  }
});

t('MCQ choice text does not contain raw LaTeX delimiters', () => {
  const mcq = QS.filter((q) => Array.isArray(q.choices) && q.choices.length > 0);
  const offenders = [];
  for (const q of mcq) {
    for (const c of q.choices) {
      if (/\$\\;|\\dfrac/.test(c)) offenders.push(q.id + ': ' + c);
    }
  }
  if (offenders.length) {
    throw new Error(offenders.length + ' choices with un-stripped LaTeX — first: ' + offenders[0]);
  }
});

t('SPR questions have empty choices and a non-empty string answer', () => {
  const spr = QS.filter((q) => !Array.isArray(q.choices) || q.choices.length === 0);
  if (spr.length === 0) throw new Error('no SPR questions found');
  for (const q of spr) {
    if (typeof q.answer !== 'string' || !q.answer.trim()) {
      throw new Error(q.id + ': SPR answer must be a non-empty string, got ' + q.answer);
    }
  }
});

t('every question has a non-empty explanation', () => {
  const bad = QS.filter((q) => !q.explanation || !q.explanation.trim());
  if (bad.length) throw new Error(bad.length + ' missing explanation — first: ' + bad[0].id);
});

t('every question has a sourceId in Q### shape', () => {
  for (const q of QS) {
    if (!/^Q\d+$/.test(q.sourceId || '')) {
      throw new Error(q.id + ': sourceId "' + q.sourceId + '" should match /^Q\\d+$/');
    }
  }
});

// =========================================================
// 3) Figure / table / svg shape invariants.
// =========================================================

t('chart SVGs are present in the expected order of magnitude (60+)', () => {
  const withSvg = QS.filter((q) => q.svg);
  if (withSvg.length < 60) throw new Error('only ' + withSvg.length + ' svgs — expected ≥60');
});

t('every q.svg is well-formed XML with a balanced <svg>...</svg>', () => {
  const withSvg = QS.filter((q) => q.svg);
  for (const q of withSvg) {
    const svg = q.svg;
    if (!/^<svg\b/.test(svg)) throw new Error(q.id + ': svg does not start with <svg');
    if (!/<\/svg>\s*$/.test(svg)) throw new Error(q.id + ': svg does not end with </svg>');
    const opens  = (svg.match(/<svg\b/g) || []).length;
    const closes = (svg.match(/<\/svg>/g) || []).length;
    if (opens !== closes) throw new Error(q.id + ': unbalanced svg tags ' + opens + '/' + closes);
    if (/<script\b/i.test(svg)) throw new Error(q.id + ': svg contains <script>');
  }
});

t('every q.svg has a viewBox so it scales in the figure container', () => {
  const withSvg = QS.filter((q) => q.svg);
  for (const q of withSvg) {
    if (!/viewBox\s*=\s*"/.test(q.svg)) {
      throw new Error(q.id + ': svg missing viewBox attribute');
    }
  }
});

t('every q.table has rows + either headers or firstColIsHeader', () => {
  const withTable = QS.filter((q) => q.table);
  if (withTable.length === 0) throw new Error('no tables found — expected ~50');
  for (const q of withTable) {
    const tbl = q.table;
    if (!Array.isArray(tbl.rows) || tbl.rows.length === 0) {
      throw new Error(q.id + ': table missing rows');
    }
    const hasHeaders = Array.isArray(tbl.headers) && tbl.headers.length > 0;
    const hasFirstColHeader = tbl.firstColIsHeader === true;
    if (!hasHeaders && !hasFirstColHeader) {
      throw new Error(q.id + ': table needs either headers or firstColIsHeader');
    }
    for (const r of tbl.rows) {
      if (!Array.isArray(r)) throw new Error(q.id + ': table row not an array');
      for (const cell of r) {
        if (cell == null) throw new Error(q.id + ': table cell is null');
      }
    }
  }
});

t('chart-bearing questions stem does not also contain raw <svg>', () => {
  for (const q of QS) {
    if (/<svg\b/.test(q.stem)) throw new Error(q.id + ': stem contains raw <svg>');
  }
});

// =========================================================
// 4) Regression: no raw LaTeX commands leaked into the bank.
// =========================================================
// These guard against the May 2026 converter table being too narrow
// (\Rightarrow, \theta, \sin, \cos, \tan, \to, \infty, \circ, \tfrac,
// \text — all of which used to show as raw backslash text in the UI).
// The only \-commands the renderer natively handles are \frac and \sqrt
// — anything else MUST be converted to unicode at import time.

const UNCONVERTED_OK = new Set(['frac', 'sqrt']);

t('no raw \\command (besides \\frac/\\sqrt) in any stem', () => {
  const offenders = [];
  for (const q of QS) {
    const m = (q.stem || '').match(/\\([A-Za-z]+)/g);
    if (m) {
      const bad = m.filter((tok) => !UNCONVERTED_OK.has(tok.slice(1)));
      if (bad.length) offenders.push(q.id + ': ' + bad.slice(0, 3).join(', '));
    }
  }
  if (offenders.length) {
    throw new Error(offenders.length + ' offenders — first: ' + offenders.slice(0, 3).join(' | '));
  }
});

t('no raw \\command (besides \\frac/\\sqrt) in any explanation', () => {
  const offenders = [];
  for (const q of QS) {
    const m = (q.explanation || '').match(/\\([A-Za-z]+)/g);
    if (m) {
      const bad = m.filter((tok) => !UNCONVERTED_OK.has(tok.slice(1)));
      if (bad.length) offenders.push(q.id + ': ' + bad.slice(0, 3).join(', '));
    }
  }
  if (offenders.length) {
    throw new Error(offenders.length + ' offenders — first: ' + offenders.slice(0, 3).join(' | '));
  }
});

t('no raw \\command in any MCQ choice', () => {
  const offenders = [];
  for (const q of QS) {
    if (!Array.isArray(q.choices)) continue;
    for (const c of q.choices) {
      const m = (c || '').match(/\\([A-Za-z]+)/g);
      if (m) {
        const bad = m.filter((tok) => !UNCONVERTED_OK.has(tok.slice(1)));
        if (bad.length) offenders.push(q.id + ': ' + bad.slice(0, 3).join(', '));
      }
    }
  }
  if (offenders.length) {
    throw new Error(offenders.length + ' offenders — first: ' + offenders.slice(0, 3).join(' | '));
  }
});

t('no prefix-collision footprint (≥q, ≤q) anywhere in the file', () => {
  // The Python `\ge` substring-replace used to corrupt `\geq` to `≥q`
  // because it had no word boundary. Scan the raw file text for any
  // residue.
  const raw = fs.readFileSync(path.join(__dirname, '..', BANK_FILE), 'utf8');
  if (/≥q\b/.test(raw)) throw new Error('found ≥q residue (the \\geq bug)');
  if (/≤q\b/.test(raw)) throw new Error('found ≤q residue (the \\leq bug)');
});

// =========================================================
// 5) Dedup — no intra-batch collisions.
// =========================================================

t('no two questions in the batch share a (stem, table) dedup key', () => {
  const seen = new Map();
  for (const q of QS) {
    const h = dedupKey(q.stem, q.table);
    if (seen.has(h)) {
      throw new Error('intra-batch dupe: ' + q.id + ' (' + q.sourceId +
                      ') matches ' + seen.get(h));
    }
    seen.set(h, q.id + ' / ' + q.sourceId);
  }
});

t('tableSignature distinguishes tables with same shape but different rows', () => {
  const t1 = { rows: [['x', 1, 2, 3], ['y', 4, 5, 6]], firstColIsHeader: true };
  const t2 = { rows: [['x', 1, 2, 3], ['y', 7, 8, 9]], firstColIsHeader: true };
  if (tableSignature(t1) === tableSignature(t2)) {
    throw new Error('different y rows should produce different signatures');
  }
});

t('dedupKey(stem, undefined) === dedupKey(stem, null) for stem-only questions', () => {
  const k1 = dedupKey('What is 2 + 2?', null);
  const k2 = dedupKey('What is 2 + 2?', undefined);
  eq(k1, k2);
});

// =========================================================
// 6) Wiring — index.html points at the new file, app.js exposes the
//    Imports tab plumbing.
// =========================================================

t('index.html loads the bank via bank-loader.js (post-Supabase-migration)', () => {
  // Pre-migration: 53 <script src="questions-*.js"> tags in index.html.
  // Post-migration (2026-05-25): a single bank-loader.js fetches the
  // bank from /api/questions and populates the legacy globals before
  // app.js runs. The per-batch JS files remain on disk as a one-release
  // safety net but are no longer loaded.
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  if (!/bank-loader\.js/.test(html)) {
    throw new Error('bank-loader.js not wired in index.html');
  }
  // Sanity: per-batch script tags should have been removed. We allow
  // bank-loader and app.js but flag any straggling questions-*.js tag.
  const stragglers = html.match(/<script[^>]*src="\.\/questions-[^"]+\.js"/g) || [];
  if (stragglers.length > 0) {
    throw new Error('stale per-batch script tags still present: ' + stragglers.join(', '));
  }
});

t('app.js wires Imports tab plumbing (registry + cascade-delete)', () => {
  if (!/STL_IMPORTS_DELETED_KEY/.test(APP_SRC)) {
    throw new Error('STL_IMPORTS_DELETED_KEY not defined in app.js');
  }
  if (!/loadDeletedImports/.test(APP_SRC) || !/setImportDeleted/.test(APP_SRC)) {
    throw new Error('cascade-delete helpers missing from app.js');
  }
  if (!/data-pane="imports"/.test(fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8'))) {
    throw new Error('Imports admin pane missing from index.html');
  }
  if (!/renderImportsList|renderImportDetail/.test(APP_SRC)) {
    throw new Error('Imports tab render functions missing');
  }
});

t('assembleBank filters out questions whose importId is in the deleted set', () => {
  // Source-grep: assembleBank must call loadDeletedImports() and use
  // it to filter the assembled list. We don't want a later refactor
  // to silently drop the cascade.
  if (!/loadDeletedImports\(\)/.test(APP_SRC)) {
    throw new Error('assembleBank does not call loadDeletedImports');
  }
});

console.log('');
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
