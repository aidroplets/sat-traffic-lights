/**
 * One-shot patcher: add `state: 'live'` to every SAT R&W question.
 *
 * Why: the questions-sat-reading-writing*.js files concat onto
 * STL_QUESTIONS_AI, which inherits state='archived' from the file-level
 * STL_QUESTIONS_AI_DEFAULTS in questions-generated.js. The file-level
 * default applies because the original SAT human/AI batches were
 * intentionally archived 2026-05-06. The new R&W content needs to opt
 * back in by setting state explicitly per question.
 *
 * Strategy: find each `id: 'q-satrw...'` literal, walk back to the `{`
 * that starts the object, then insert `state: 'live',` immediately
 * after `id: '...',` if no `state:` field exists yet.
 *
 * Idempotent — re-running won't double-insert.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const dir = __dirname;
const targetFiles = [
  'questions-sat-reading-writing.js',
  'questions-sat-reading-writing-fill.js',
  'questions-sat-reading-writing-fill-2.js',
  'questions-psat-reading-writing.js',
  'questions-psat-reading-writing-fill.js',
];

let totalInserted = 0;
for (const name of targetFiles) {
  const filepath = path.join(dir, name);
  let content = fs.readFileSync(filepath, 'utf8');
  const original = content;

  // For each q-satrw id occurrence, find the enclosing object and insert
  // state if missing. Process from END to BEGINNING so offsets stay stable.
  const ID_RE = /id:\s*'(q-(?:sat|psat)rw[^']+)'/g;
  const matches = [];
  let m;
  while ((m = ID_RE.exec(content)) !== null) matches.push({ idx: m.index, len: m[0].length });

  let inserted = 0;
  for (const match of matches.slice().reverse()) {
    const objStart = content.lastIndexOf('{', match.idx);
    if (objStart === -1) continue;
    let depth = 0, end = -1;
    for (let i = objStart; i < content.length; i++) {
      const ch = content[i];
      if (ch === '{') depth++;
      else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end === -1) continue;
    const objText = content.slice(objStart, end + 1);
    if (/\bstate\s*:/.test(objText)) continue;     // already has state
    // Insert "state: 'live'," immediately after the id line.
    // Find the end of the id line within objText so we preserve indentation.
    const idLineEnd = content.indexOf('\n', match.idx);
    if (idLineEnd === -1 || idLineEnd > end) continue;
    // Detect indentation of the id line so the new line lines up.
    const lineStart = content.lastIndexOf('\n', match.idx) + 1;
    const indent = content.slice(lineStart, match.idx).match(/^[ \t]*/)[0];
    const insertion = '\n' + indent + "state: 'live',";
    content = content.slice(0, idLineEnd) + insertion + content.slice(idLineEnd);
    inserted++;
  }

  if (content !== original) {
    fs.writeFileSync(filepath, content);
    console.log('  ' + name + ': +' + inserted + ' state: live');
    totalInserted += inserted;
  } else {
    console.log('  ' + name + ': no changes (already live or no matches)');
  }
}
console.log('\nTotal state:live inserted:', totalInserted);
