/**
 * Archive review-action regression test.
 *
 * The bug we're guarding against:
 *   1. The review modal's Archive button calls setQuestionState(id, 'archived').
 *      Day-1 of the Supabase migration narrowed the API's ALLOWED_STATES and
 *      both DB CHECK constraints (questions, question_overrides) to drop
 *      'archived', so the dual-write to /api/admin/question-state returned
 *      400 silently and the action effectively no-op'd server-side.
 *
 *   2. Independently, loadAdminOverrides() was hard-coded to return {} once
 *      the migration sentinel was set. That meant assembleBank() ignored
 *      the localStorage write made by setQuestionState(), so the UI didn'\''t
 *      reflect the new state until a full page reload (which would then
 *      pick up the API state — but the API write had been rejected per #1).
 *
 * Symptom: the admin clicked Archive and nothing visible happened.
 *
 * Defenses this test asserts:
 *   • The API'\''s ALLOWED_STATES set includes '\''archived'\''.
 *   • The DB migration file lists '\''archived'\'' in the questions.state CHECK.
 *   • loadAdminOverrides() returns localStorage data — NOT a hard-coded {} —
 *     so a fresh local write applies to the in-memory bank immediately.
 *   • The full set of question states the client treats as canonical
 *     (QUESTION_STATES) matches what the API will accept.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/archive-review-action.test.js
 */
const fs = require('node:fs');
const path = require('node:path');

const APP_SRC    = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const ADMIN_LIB  = fs.readFileSync(path.join(__dirname, '..', 'api', '_lib', 'admin.js'), 'utf8');
const MIGRATION  = fs.readFileSync(path.join(__dirname, '..', 'db', '003_questions.sql'), 'utf8');

let passed = 0;
let failed = 0;
const t = (name, fn) => {
  try {
    fn();
    passed += 1;
    console.log('  ✓ ' + name);
  } catch (e) {
    failed += 1;
    console.log('  ✗ ' + name + '\n    ' + e.message);
  }
};

console.log('archive-review-action.test.js');
console.log('');

// 1. The set of canonical states the client uses to issue writes.
// Extracted from app.js'\''s QUESTION_STATES declaration.
const CLIENT_STATES = (() => {
  const m = APP_SRC.match(/const QUESTION_STATES\s*=\s*\[([^\]]+)\]/);
  if (!m) throw new Error('QUESTION_STATES not found in app.js');
  return m[1].match(/['"]([^'"]+)['"]/g).map((s) => s.slice(1, -1));
})();

t('app.js declares the canonical QUESTION_STATES list', () => {
  if (!CLIENT_STATES.includes('archived')) {
    throw new Error('QUESTION_STATES is missing "archived" — the review modal sends it');
  }
  if (!CLIENT_STATES.includes('live')) throw new Error('QUESTION_STATES is missing "live"');
  if (!CLIENT_STATES.includes('deleted')) throw new Error('QUESTION_STATES is missing "deleted"');
});

t('API ALLOWED_STATES accepts every state the client issues', () => {
  // Pull the API'\''s allow-list from the file.
  const m = ADMIN_LIB.match(/ALLOWED_STATES\s*=\s*new Set\(\[([^\]]+)\]\)/);
  if (!m) throw new Error('ALLOWED_STATES set not found in api/_lib/admin.js');
  const apiStates = m[1].match(/['"]([^'"]+)['"]/g).map((s) => s.slice(1, -1));
  const missing = CLIENT_STATES.filter((s) => !apiStates.includes(s));
  if (missing.length > 0) {
    throw new Error('API ALLOWED_STATES is missing: ' + missing.join(', ') +
      '. The dual-write from setQuestionState() will 400 silently for these states.');
  }
});

t('DB CHECK constraint accepts every state the client issues (003_questions.sql)', () => {
  // Match the inline check on questions.state. It looks like:
  //   check (state in ('live', 'needs-review', 'unpublished', 'archived', 'deleted'))
  const m = MIGRATION.match(/check\s*\(\s*state\s+in\s*\(([^)]+)\)\s*\)/i);
  if (!m) throw new Error('state CHECK constraint not found in db/003_questions.sql');
  const dbStates = m[1].match(/['"]([^'"]+)['"]/g).map((s) => s.slice(1, -1));
  const missing = CLIENT_STATES.filter((s) => !dbStates.includes(s));
  if (missing.length > 0) {
    throw new Error('DB CHECK is missing: ' + missing.join(', ') +
      '. The Supabase insert/upsert for question_overrides will fail with constraint violation.');
  }
});

t('loadAdminOverrides() reads localStorage (no hard-coded return {})', () => {
  // Find the function definition and assert it does NOT have the
  // exact "if (supabaseMigrated()) return {};" guard that caused
  // the second bug.
  const fnMatch = APP_SRC.match(/const loadAdminOverrides\s*=\s*\(\)\s*=>\s*\{([\s\S]*?)\n\s{0,4}\};/);
  if (!fnMatch) throw new Error('loadAdminOverrides function not found in app.js');
  const body = fnMatch[1];
  if (/if\s*\(\s*supabaseMigrated\(\)\s*\)\s*return\s*\{\s*\}/.test(body)) {
    throw new Error('loadAdminOverrides has a "return {}" guard for supabaseMigrated() — ' +
      'this swallows local writes so the in-memory bank never reflects them. The function ' +
      'must read the localStorage map even post-migration.');
  }
  if (!/localStorage\.getItem/.test(body)) {
    throw new Error('loadAdminOverrides does not read from localStorage. ' +
      'updateOverrides() persists local edits there and assembleBank() consumes them via ' +
      'this helper — if it bypasses localStorage, the UI will not update on local writes.');
  }
});

t('assembleBank deduplicates by q.id (admin-added rows do not double up)', () => {
  // Loose check: assembleBank uses a Set keyed on q.id and applies it
  // to the merged list. The exact helper is dedupeById.
  if (!/dedupeById/.test(APP_SRC) && !/Set\([^)]*\)[\s\S]{0,80}q\.id/.test(APP_SRC)) {
    throw new Error('assembleBank does not appear to dedupe by id. With both localStorage ' +
      'admin-added AND API-returned rows present, every freshly-added question would render twice.');
  }
});

console.log('');
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
