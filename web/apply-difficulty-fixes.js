/**
 * Difficulty patcher — applies a JSON fix-list of {id, corrected}
 * tuples to the right `difficulty: NN` field across every question
 * source file.
 *
 * Strategy:
 *   1. For each fix entry, find the `id: 'q-XXX'` literal across all
 *      questions-*.js files.
 *   2. Locate the smallest enclosing object literal (scan back to '{',
 *      forward to matching '}').
 *   3. Within that object scope, replace `difficulty: <number>` with
 *      the corrected value.
 *
 * Object-scope-bounded matching avoids the regex-collision bug from
 * earlier (where greedy `]` matching bit on `[Q]` notation in choice
 * strings).
 *
 * Usage:
 *   node apply-difficulty-fixes.js <fix-list.json>
 */
'use strict';
const fs   = require('node:fs');
const path = require('node:path');

const fixListPath = process.argv[2];
if (!fixListPath) {
  console.error('Usage: node apply-difficulty-fixes.js <fix-list.json>');
  process.exit(1);
}
const fixes = JSON.parse(fs.readFileSync(fixListPath, 'utf8'));
console.log('Fixes to apply:', fixes.length);

// All question source files (everything matching questions*.js).
const dir = __dirname;
const files = fs.readdirSync(dir)
  .filter((f) => f.startsWith('questions') && f.endsWith('.js') && !f.includes('-fixes'))
  .map((f) => path.join(dir, f));

const fileContents = new Map();
for (const f of files) fileContents.set(f, fs.readFileSync(f, 'utf8'));

let applied = 0;
let notFound = 0;
const notFoundIds = [];

for (const fix of fixes) {
  const id = fix.id;
  const corrected = fix.corrected;
  if (!id || typeof corrected !== 'number') continue;

  let found = false;
  for (const [filepath, content] of fileContents.entries()) {
    const idLiteral = "'" + id + "'";
    const idIdx = content.indexOf(idLiteral);
    if (idIdx === -1) continue;

    // Find the enclosing object — walk back to most recent '{', then
    // forward through balanced braces to find the closing '}'.
    const objStart = content.lastIndexOf('{', idIdx);
    if (objStart === -1) continue;
    let depth = 0, end = -1;
    for (let i = objStart; i < content.length; i++) {
      const ch = content[i];
      if (ch === '{') depth++;
      else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end === -1) continue;

    const objText = content.slice(objStart, end + 1);
    // Scoped replacement of difficulty: <number> within this object.
    const newObj = objText.replace(/difficulty:\s*\d+/, 'difficulty: ' + corrected);
    if (newObj === objText) continue;   // no difficulty field, or already correct

    const newContent = content.slice(0, objStart) + newObj + content.slice(end + 1);
    fileContents.set(filepath, newContent);
    applied++;
    found = true;
    break;
  }
  if (!found) { notFound++; notFoundIds.push(id); }
}

// Write back changed files only.
let written = 0;
for (const [filepath, content] of fileContents.entries()) {
  const original = fs.readFileSync(filepath, 'utf8');
  if (content !== original) {
    fs.writeFileSync(filepath, content);
    written++;
    console.log('  wrote', path.basename(filepath));
  }
}

console.log('\nApplied:', applied, '| not-found:', notFound, '| files written:', written);
if (notFoundIds.length) {
  console.log('Not-found IDs:', notFoundIds.slice(0, 10).join(', '), notFoundIds.length > 10 ? '...' : '');
}
