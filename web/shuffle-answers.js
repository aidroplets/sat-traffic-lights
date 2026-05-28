/**
 * One-shot shuffle utility — fixes answer-index skew across the
 * AI-generated question banks. Authoring agents (including me)
 * defaulted to the same answer position too often; a real test
 * spreads correct answers ~evenly across A/B/C/D so test-takers
 * can't game the position.
 *
 * Strategy:
 *   • Load each target file, parse out the question array literal.
 *   • For each question, derive a deterministic seed from q.id, use
 *     it to seed a Fisher-Yates shuffle of the choices array.
 *   • Recompute answer to point at the original correct option in
 *     its new position.
 *   • Write the file back.
 *
 * Deterministic seeding (vs. Math.random) means the shuffle is
 * reproducible — re-running this script produces the same output.
 *
 * Usage:
 *   node shuffle-answers.js
 *
 * Run ONCE after a generation pass with skewed distributions. Re-
 * running is safe (idempotent — same seed → same shuffle), but it
 * also means every run rotates everything to the same position;
 * if you want to actually re-rotate, change the SEED_SALT below.
 */
'use strict';
const fs   = require('node:fs');
const path = require('node:path');

const SEED_SALT = 'stl-2026-05-13';   // change to force a re-shuffle

// Mulberry32 — small, fast, deterministic PRNG.
const mulberry32 = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
// FNV-1a string hash → 32-bit seed
const hashSeed = (str) => {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
};

const TARGET_FILES = [
  'questions-ssat-verbal.js',
  'questions-hspt-verbal-skills.js',
  'questions-hspt-quantitative-skills.js',
  'questions-hspt-language-skills.js',
  'questions-isee-quantitative-reasoning.js',
  'questions-act-english.js',
  'questions-act-math-fill.js',
  'questions-isee-verbal-reasoning.js',
  'questions-isee-math-fill.js',
  'questions-sat-reading-writing.js',
  'questions-act-reading.js',
  'questions-act-science.js',
  'questions-ssat-reading.js',
  'questions-psat-reading-writing.js',
  'questions-hspt-reading.js',
  'questions-isee-reading-comprehension.js',
  'questions-psat-math-fill.js',
];

// Load each file in a sandboxed window, shuffle its array, write back.
const dir = __dirname;
let totalShuffled = 0;

for (const filename of TARGET_FILES) {
  const filepath = path.join(dir, filename);
  if (!fs.existsSync(filepath)) {
    console.warn('SKIP (missing):', filename);
    continue;
  }

  // Sandbox-load the file so it appends onto a clean window.
  const sandbox = { window: {}, document: { addEventListener: () => {} } };
  const before = {};
  // Snapshot all current STL_QUESTIONS_* arrays into sandbox.window so
  // .concat() onto an existing array works correctly when the file
  // appends to an existing one.
  for (const k of ['STL_QUESTIONS_HUMAN','STL_QUESTIONS_AI','STL_QUESTIONS_ISEE','STL_QUESTIONS_ACT','STL_QUESTIONS_PSAT','STL_QUESTIONS_SSAT','STL_QUESTIONS_HSPT']) {
    sandbox.window[k] = [];
    before[k] = [];
  }
  // Use vm to run the file in our sandbox without polluting global.
  const vm = require('node:vm');
  const code = fs.readFileSync(filepath, 'utf8');
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox, { filename });
  } catch (e) {
    console.error('FAIL load', filename, '-', e.message);
    continue;
  }

  // Find which array(s) grew vs the snapshot — those are this file's questions.
  let touched = 0;
  const updates = [];   // array of { id, newChoices, newAnswer }
  for (const arrKey of Object.keys(sandbox.window)) {
    if (!Array.isArray(sandbox.window[arrKey])) continue;
    if (!arrKey.startsWith('STL_QUESTIONS_')) continue;
    const arr = sandbox.window[arrKey];
    const baselineLen = before[arrKey] ? before[arrKey].length : 0;
    if (arr.length <= baselineLen) continue;
    const ours = arr.slice(baselineLen);   // questions added by this file

    for (const q of ours) {
      if (!Array.isArray(q.choices) || typeof q.answer !== 'number') continue;
      const correctChoice = q.choices[q.answer];
      const seed = hashSeed(SEED_SALT + ':' + (q.id || ''));
      const rng = mulberry32(seed);
      const indexes = q.choices.map((_, i) => i);
      // Fisher-Yates
      for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
      }
      const newChoices = indexes.map((i) => q.choices[i]);
      const newAnswer = newChoices.indexOf(correctChoice);
      // Sanity: if shuffle was the identity (rare for length-4) skip
      const isIdentity = indexes.every((v, i) => v === i);
      if (isIdentity) continue;
      updates.push({ id: q.id, newChoices, newAnswer });
      touched++;
    }
  }

  if (touched === 0) {
    console.log(filename.padEnd(46), '— no shuffle needed');
    continue;
  }

  // Apply updates back to the file content via a careful regex pass.
  // Each update finds the question's `id: 'q-xxx-NNN'` block and
  // rewrites its choices: [...] and answer: N lines. We match the
  // smallest object that contains the id.
  let content = code;
  let applied = 0;
  for (const u of updates) {
    // Regex: find the object literal containing `id: '<id>'`. Look for
    // the opening `{` before the id, then capture up to the matching
    // closing `}`. We approximate by finding the next `},` after the id.
    const idLiteral = "'" + u.id + "'";
    const idIdx = content.indexOf(idLiteral);
    if (idIdx === -1) { continue; }
    // Find the start of this object: walk back to the most recent `{`.
    const objStart = content.lastIndexOf('{', idIdx);
    if (objStart === -1) continue;
    // Find matching close `}` by counting braces.
    let depth = 0, end = -1;
    for (let i = objStart; i < content.length; i++) {
      const ch = content[i];
      if (ch === '{') depth++;
      else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end === -1) continue;
    const objText = content.slice(objStart, end + 1);

    // Replace `choices: [ ... ]` and `answer: <n>` within objText.
    const choicesLiteral = 'choices: [' +
      u.newChoices.map((c) => "'" + String(c).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'").join(', ') +
      ']';
    let newObj = objText.replace(/choices:\s*\[[\s\S]*?\]/, choicesLiteral);
    newObj = newObj.replace(/answer:\s*\d+/, 'answer: ' + u.newAnswer);

    if (newObj === objText) continue;
    content = content.slice(0, objStart) + newObj + content.slice(end + 1);
    applied++;
  }

  if (applied > 0) {
    fs.writeFileSync(filepath, content);
    totalShuffled += applied;
    console.log(filename.padEnd(46), '— shuffled', applied, 'of', touched, 'questions');
  } else {
    console.log(filename.padEnd(46), '— matched 0 / wanted', touched);
  }
}

console.log('\nTotal shuffled:', totalShuffled);
