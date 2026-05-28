/**
 * reseed-sat-math.mjs — DESTRUCTIVE.
 *
 * Deletes ALL questions where test_type='SAT' AND section='math' from
 * Supabase, then imports a fresh batch from a bank-shaped JSON file.
 *
 * Usage (from web/):
 *   export SUPABASE_URL="https://<proj>.supabase.co"
 *   export SUPABASE_SERVICE_ROLE_KEY="<service-role-key>"   # never printed
 *   node scripts/reseed-sat-math.mjs /abs/path/to/questions.json
 *
 * The import mirrors the app's bank-shaped JSON import:
 *   • SVGs are auto-centered via the SHIPPING centerSvgFigure (loaded out
 *     of app.js, so no logic drift)
 *   • choices array (MCQ) or null (SPR); answer Number (MCQ) or String (SPR)
 *   • each row stamped with import_id so the batch shows in the Imports tab
 *
 * Prints before/after counts. Refuses to run if the JSON contains any
 * non-SAT / non-math rows (guards against pointing it at the wrong file).
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SRC = process.argv[2];
if (!SUPABASE_URL || !SERVICE_KEY) { console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY'); process.exit(1); }
if (!SRC || !fs.existsSync(SRC)) { console.error('Pass an absolute path to the JSON file as argv[1]'); process.exit(1); }

const IMPORT_ID = 'sat-math-fresh-' + new Date().toISOString().slice(0, 10);

// ---- load the shipping centerSvgFigure out of app.js (no DOM) ----------
function loadCenterSvg() {
  function el(t) { const c = []; return { tagName: (t || 'div').toUpperCase(), children: c,
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
  try { vm.runInContext(fs.readFileSync(path.join(WEB, 'app.js'), 'utf8'), sb, { filename: 'app.js' }); } catch (_) {}
  const H = sb.STL_TEST_HOOKS || {};
  return {
    centerSvgFigure: typeof H.centerSvgFigure === 'function' ? H.centerSvgFigure : ((s) => s),
    extractMarkdownTable: typeof H.extractMarkdownTable === 'function' ? H.extractMarkdownTable : ((s) => ({ table: null, cleanedStem: s })),
  };
}
const { centerSvgFigure, extractMarkdownTable } = loadCenterSvg();

// ---- read + validate the source ---------------------------------------
const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
if (!Array.isArray(src)) { console.error('Expected a JSON array'); process.exit(1); }
const offenders = src.filter((q) => (q.testType || 'SAT') !== 'SAT' || (q.section || 'math') !== 'math');
if (offenders.length) { console.error(`Refusing: ${offenders.length} rows are not SAT/math (e.g. ${offenders[0].id})`); process.exit(1); }

const rowToDb = (q) => {
  const isGridIn = q.choices === null || q.choices === undefined;
  // Lift an inline markdown table out of the stem into structured table
  // data (matches the app's bank-shaped import). No-op when absent.
  const tbl = extractMarkdownTable(q.stem);
  return {
    id:            q.id,
    source_id:     q.sourceId || null,
    test_type:     q.testType || 'SAT',
    section:       q.section  || 'math',
    topic:         q.topic    || null,
    difficulty:    Number.isFinite(Number(q.difficulty)) ? Number(q.difficulty) : null,
    state:         q.state    || 'live',
    source:        q.source   || 'human-curated',
    stem:          tbl.cleanedStem,
    choices:       isGridIn ? null : q.choices.map(String),
    answer:        isGridIn ? String(q.answer) : Number(q.answer),
    explanation:   q.explanation || null,
    passage:       q.passage || null,
    table_data:    q.table || tbl.table || null,
    svg:           q.svg ? centerSvgFigure(String(q.svg)) : null,
    uploader:      q.uploader || null,
    review_status: q.reviewStatus || 'verified',
    import_id:     IMPORT_ID,
    metadata:      {},
  };
};
const rows = src.map(rowToDb);
const centered = src.filter((q) => q.svg).length;
console.log(`Source: ${rows.length} rows (${centered} with SVG, centered on import). import_id=${IMPORT_ID}`);

// ---- Supabase REST helpers --------------------------------------------
const H = { apikey: SERVICE_KEY, Authorization: 'Bearer ' + SERVICE_KEY, 'Content-Type': 'application/json' };
const Q = `${SUPABASE_URL}/rest/v1/questions`;
async function countSatMath() {
  const r = await fetch(`${Q}?test_type=eq.SAT&section=eq.math&select=id`, { method: 'HEAD', headers: { ...H, Prefer: 'count=exact' } });
  return r.headers.get('content-range')?.split('/')[1] || '?';
}
async function main() {
  const before = await countSatMath();
  console.log(`SAT/math currently in DB: ${before}`);

  console.log('Deleting all SAT/math…');
  const del = await fetch(`${Q}?test_type=eq.SAT&section=eq.math`, { method: 'DELETE', headers: { ...H, Prefer: 'return=minimal' } });
  if (!del.ok && del.status !== 204) { console.error('DELETE failed: HTTP ' + del.status + '\n' + await del.text()); process.exit(2); }
  console.log(`After delete: ${await countSatMath()}`);

  // imports row so the batch is visible/manageable in the Imports tab
  await fetch(`${SUPABASE_URL}/rest/v1/imports?on_conflict=id`, {
    method: 'POST', headers: { ...H, Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify([{ id: IMPORT_ID, label: 'SAT Math (fresh ' + IMPORT_ID.slice(-10) + ')', test_type: 'SAT', section: 'math', count: rows.length, generated_at: new Date().toISOString().slice(0, 10) }]),
  }).catch(() => {});

  console.log('Inserting fresh rows…');
  const CHUNK = 200; let total = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const slice = rows.slice(i, i + CHUNK);
    const r = await fetch(`${Q}?on_conflict=id`, { method: 'POST', headers: { ...H, Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(slice) });
    if (!r.ok) { console.error(`Insert chunk ${i} failed: HTTP ${r.status}\n` + await r.text()); process.exit(3); }
    total += slice.length; process.stdout.write(`\r  inserted ${total}/${rows.length}`);
  }
  process.stdout.write('\n');
  console.log(`SAT/math after import: ${await countSatMath()}`);
  console.log('Done.');
}
main().catch((e) => { console.error(e); process.exit(9); });
