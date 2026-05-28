#!/usr/bin/env node
/**
 * Seed every existing questions-*.js file into Supabase's `questions`
 * table, plus build `imports` rows from STL_IMPORTS and `test_config`
 * rows from TEST_TYPES.
 *
 * Idempotent — uses `upsert` on `id` (questions), `id` (imports),
 * `test_id` (test_config). Safe to re-run.
 *
 * Run from web/:
 *   . "$(ls /sessions/*\/mnt/'Personal Assistant'/.tokens/op-bootstrap.sh | head -1)"
 *   export SUPABASE_URL="https://cwqccqvcstndafyfdoha.supabase.co"
 *   export SUPABASE_SERVICE_ROLE_KEY="$(op item get 'Subspace API Key' --vault Claude --fields password --reveal)"
 *   node --experimental-vm-modules scripts/seed-questions.mjs
 *
 * Or via the published prod env (Vercel already has both vars set):
 *   vercel env pull .env.local && node scripts/seed-questions.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WEB_DIR   = join(__dirname, '..');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars.');
  process.exit(1);
}

// --- Step 1: load every questions-*.js into a sandboxed `window` so the
//             defaults blocks + question-array pushes execute against it. ---
const bankFiles = readdirSync(WEB_DIR)
  .filter((f) => /^questions(-.+)?\.js$/.test(f))
  .filter((f) => !/upgrade-fractions/.test(f))  // not a bank file
  .sort();

console.log(`Loading ${bankFiles.length} bank files…`);
const sandbox = { window: {}, document: { addEventListener(){} } };
const ctx = vm.createContext(sandbox);
for (const f of bankFiles) {
  try {
    const code = readFileSync(join(WEB_DIR, f), 'utf8');
    if (!code.trim()) continue;        // some files were emptied during the import retirement
    vm.runInContext(code, ctx);
  } catch (e) {
    console.warn(`  ⚠ ${f}: ${e.message}`);
  }
}
const { window } = sandbox;
console.log('  STL_QUESTIONS_HUMAN:', (window.STL_QUESTIONS_HUMAN || []).length);
console.log('  STL_QUESTIONS_AI:   ', (window.STL_QUESTIONS_AI    || []).length);
console.log('  STL_QUESTIONS_ACT:  ', (window.STL_QUESTIONS_ACT   || []).length);
console.log('  STL_QUESTIONS_PSAT: ', (window.STL_QUESTIONS_PSAT  || []).length);
console.log('  STL_QUESTIONS_SSAT: ', (window.STL_QUESTIONS_SSAT  || []).length);
console.log('  STL_QUESTIONS_HSPT: ', (window.STL_QUESTIONS_HSPT  || []).length);
console.log('  STL_QUESTIONS_ISEE: ', (window.STL_QUESTIONS_ISEE  || []).length);
console.log('  STL_IMPORTS:        ', (window.STL_IMPORTS         || []).length);

// --- Step 2: merge defaults + per-question rows for each bank ---
const banks = [
  { defaults: window.STL_QUESTIONS_HUMAN_DEFAULTS, rows: window.STL_QUESTIONS_HUMAN },
  { defaults: window.STL_QUESTIONS_AI_DEFAULTS,    rows: window.STL_QUESTIONS_AI    },
  { defaults: window.STL_QUESTIONS_ACT_DEFAULTS,   rows: window.STL_QUESTIONS_ACT   },
  { defaults: window.STL_QUESTIONS_PSAT_DEFAULTS,  rows: window.STL_QUESTIONS_PSAT  },
  { defaults: window.STL_QUESTIONS_SSAT_DEFAULTS,  rows: window.STL_QUESTIONS_SSAT  },
  { defaults: window.STL_QUESTIONS_HSPT_DEFAULTS,  rows: window.STL_QUESTIONS_HSPT  },
  { defaults: window.STL_QUESTIONS_ISEE_DEFAULTS,  rows: window.STL_QUESTIONS_ISEE  },
];

// Shape one in-memory row into the Supabase questions table row.
const rowToDb = (q) => ({
  id:            q.id,
  source_id:     q.sourceId || null,
  test_type:     q.testType || 'SAT',
  section:       q.section  || 'math',
  topic:         q.topic    || null,
  difficulty:    Number.isFinite(q.difficulty) ? q.difficulty : null,
  state:         q.state    || 'live',
  source:        q.source   || 'human-curated',
  stem:          q.stem,
  // choices may be array or null (for SPR). DB column is jsonb so we
  // pass-through; null grid-in stays null.
  choices:       Array.isArray(q.choices) && q.choices.length > 0 ? q.choices : null,
  answer:        q.answer,
  explanation:   q.explanation || null,
  passage:       q.passage     || null,
  table_data:    q.table       || null,
  svg:           q.svg         || null,
  uploader:      q.uploader    || null,
  review_status: q.reviewStatus|| null,
  import_id:     q.importId    || null,
  // Any other fields that don't have a dedicated column get bagged.
  metadata: (() => {
    const known = new Set([
      'id','sourceId','testType','section','topic','difficulty','state','source',
      'stem','choices','answer','explanation','passage','table','svg','uploader',
      'reviewStatus','importId',
    ]);
    const meta = {};
    for (const k of Object.keys(q)) if (!known.has(k)) meta[k] = q[k];
    return meta;
  })(),
});

const allRows = [];
for (const bank of banks) {
  const defaults = bank.defaults || {};
  for (const q of (bank.rows || [])) {
    // Merge defaults under per-row fields (per-row wins).
    allRows.push(rowToDb({ ...defaults, ...q }));
  }
}
console.log(`Total question rows to upsert: ${allRows.length}`);

// --- Step 3: chunked upsert to Supabase REST API ---
const supaHeaders = {
  apikey: SERVICE_KEY,
  Authorization: 'Bearer ' + SERVICE_KEY,
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates,return=minimal',
};
const CHUNK = 200;
async function upsert(table, rows, onConflict) {
  let total = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const slice = rows.slice(i, i + CHUNK);
    const url = `${SUPABASE_URL}/rest/v1/${table}` + (onConflict ? `?on_conflict=${onConflict}` : '');
    const r = await fetch(url, {
      method: 'POST',
      headers: supaHeaders,
      body: JSON.stringify(slice),
    });
    if (!r.ok) {
      console.error(`Upsert ${table} chunk ${i}-${i + slice.length} failed: HTTP ${r.status}\n` + await r.text());
      process.exit(2);
    }
    total += slice.length;
    process.stdout.write(`\r  ${table}: ${total}/${rows.length} upserted`);
  }
  process.stdout.write('\n');
}

// --- Step 4: imports rows ---
const importRows = (window.STL_IMPORTS || []).map((imp) => ({
  id:           imp.id,
  label:        imp.label || imp.id,
  source_file:  imp.source || null,
  generated_at: imp.generatedAt || null,
  test_type:    imp.testType || null,
  section:      imp.section  || null,
  count:        Number.isFinite(imp.count) ? imp.count : null,
}));

// --- Step 5: test_config rows. Read TEST_TYPES from app.js statically. ---
// app.js exports nothing useful from outside the IIFE, so we parse the
// TEST_TYPES object out of the source with a quick regex slice. Falls back
// to empty if not found.
// `tint` carries the canonical brand color per test. Stored as
// "R, G, B" (the format the runtime feeds straight into
// rgba(var(--stl-tint), 0.x) without parsing). Admin Tests panel
// overrides at runtime via /api/admin/test-config?id=X PUT.
const TEST_TYPES_FALLBACK = [
  { test_id: 'SAT',  is_active: true, length: 30,  subject_mix: { math: 13, 'reading-writing': 17 }, enabled_subjects: ['math', 'reading-writing'], tint: '139, 134, 255' },
  { test_id: 'PSAT', is_active: true, length: 98,  subject_mix: { math: 44, 'reading-writing': 54 }, enabled_subjects: ['math', 'reading-writing'], tint: '96, 165, 250'  },
  { test_id: 'ACT',  is_active: true, length: 215, subject_mix: { math: 60, english: 75, reading: 40, science: 40 }, enabled_subjects: ['math', 'english', 'reading', 'science'], tint: '74, 222, 128' },
  { test_id: 'ISEE', is_active: true, length: 160, subject_mix: { math: 47, 'quantitative-reasoning': 37, 'verbal-reasoning': 40, 'reading-comprehension': 36 }, enabled_subjects: ['math', 'quantitative-reasoning', 'verbal-reasoning', 'reading-comprehension'], tint: '251, 146, 60' },
  { test_id: 'SSAT', is_active: true, length: 150, subject_mix: { math: 50, verbal: 60, 'reading-comprehension': 40 }, enabled_subjects: ['math', 'verbal', 'reading-comprehension'], tint: '244, 114, 182' },
  { test_id: 'HSPT', is_active: true, length: 298, subject_mix: { math: 64, 'verbal-skills': 60, 'quantitative-skills': 52, reading: 62, 'language-skills': 60 }, enabled_subjects: ['math', 'verbal-skills', 'quantitative-skills', 'reading', 'language-skills'], tint: '250, 204, 21' },
];

await upsert('imports',     importRows,     'id');
await upsert('test_config', TEST_TYPES_FALLBACK, 'test_id');
await upsert('questions',   allRows,        'id');

// --- Verify counts ---
async function count(table) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    method: 'HEAD',
    headers: { ...supaHeaders, Prefer: 'count=exact' },
  });
  return r.headers.get('content-range')?.split('/')[1] || '?';
}
console.log(`\nFinal counts in Supabase:`);
console.log(`  questions:   ${await count('questions')}`);
console.log(`  imports:     ${await count('imports')}`);
console.log(`  test_config: ${await count('test_config')}`);
console.log('Done.');
