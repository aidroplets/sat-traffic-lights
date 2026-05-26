/**
 * Fraction upgrader — converts slash-fraction patterns in math questions
 * to display \frac{}{} syntax that the renderer in app.js stacks
 * textbook-style.
 *
 * Conservative pattern set (only upgrades unambiguous fractions):
 *
 *   1. (stuff)/(stuff)         e.g. (x + 2)/(x − 3)  →  \frac{x + 2}{x − 3}
 *   2. (stuff)/digit-or-letter e.g. (2x − 5)/3       →  \frac{2x − 5}{3}
 *   3. (stuff)/letter^digit    e.g. (a^5)/(a^2)      → handled by (1)
 *
 * Patterns we LEAVE ALONE (too risky / reads fine inline):
 *   - bare digit/digit  (e.g. 1/2 — inline OK in prose)
 *   - bare letter/letter  (e.g. x/y — could be division operator)
 *   - URLs, dates, anything outside an obvious math expression
 *
 * Usage:
 *   node upgrade-fractions.js              # dry-run, prints proposed changes
 *   node upgrade-fractions.js --apply      # write changes back
 *
 * Affects only fields where slash-fractions actually appear: stem,
 * choices[], and (deliberately not) explanation. Explanations stay
 * as-is for now since they often have inline `1/2` references that
 * read better in prose.
 */
'use strict';
const fs = require('node:fs');
const path = require('node:path');

const APPLY = process.argv.includes('--apply');
const dir = __dirname;
const files = fs.readdirSync(dir)
  .filter((f) => f.startsWith('questions') && f.endsWith('.js') && !f.includes('-fixes'))
  .map((f) => path.join(dir, f));

// The fraction pattern. Two forms:
//   A: ( ... )/( ... )    paren-numerator over paren-denominator
//   B: ( ... )/X          paren-numerator over single token (digit, letter,
//                          or letter^digit)
// We use balanced-paren scanning instead of regex to handle nested parens
// in the numerator (rare in this bank but the safe move).
function consumeBalancedParens(src, startIdx) {
  if (src.charAt(startIdx) !== '(') return null;
  let depth = 0;
  for (let i = startIdx; i < src.length; i++) {
    const ch = src.charAt(i);
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth === 0) return { body: src.slice(startIdx + 1, i), endIdx: i };
    }
  }
  return null;
}

// Walk the string left-to-right, finding `(` that start a fraction pattern.
// A `(` is a fraction-numerator opener iff what follows the matching `)`
// is `/` followed by another fraction component (paren group or simple
// token). We do a single left-to-right pass and emit \frac{}{} for each
// match, leaving non-matching parens alone.
function upgradeFractions(text) {
  if (text == null) return text;
  let out = '';
  let i = 0;
  let touched = false;
  while (i < text.length) {
    const ch = text.charAt(i);
    if (ch !== '(') { out += ch; i++; continue; }
    // Try: (NUM) / (DEN)  or  (NUM) / X
    const num = consumeBalancedParens(text, i);
    if (!num) { out += ch; i++; continue; }
    // Look BACKWARD: if a letter/digit token (and optional ^digit) sits
    // immediately before the `(` with no whitespace, it's a coefficient
    // that belongs INSIDE the numerator. Example: `n(n+1)/2` should
    // become `\frac{n(n+1)}{2}`, not `n\frac{n+1}{2}`. Same for
    // `2(x+1)/3` → `\frac{2(x+1)}{3}`.
    let coeffStart = i;
    let coeffText = '';
    {
      // Walk left from i-1 over a `[A-Za-z0-9²³⁰¹⁴⁵⁶⁷⁸⁹^]+` run with
      // no whitespace. Stop at the first whitespace or operator.
      let k = i - 1;
      while (k >= 0 && /[A-Za-z0-9²³⁰¹⁴⁵⁶⁷⁸⁹^]/.test(text.charAt(k))) k--;
      if (k < i - 1) {
        coeffStart = k + 1;
        coeffText = text.slice(coeffStart, i);
      }
    }
    let j = num.endIdx + 1;
    // Allow optional whitespace before /
    while (j < text.length && /\s/.test(text.charAt(j))) j++;
    if (text.charAt(j) !== '/') { out += ch; i++; continue; }
    j++;
    while (j < text.length && /\s/.test(text.charAt(j))) j++;
    // What's the denominator?
    let denBody = '';
    let denEnd = j;
    if (text.charAt(j) === '(') {
      const den = consumeBalancedParens(text, j);
      if (!den) { out += ch; i++; continue; }
      denBody = den.body;
      denEnd = den.endIdx + 1;
    } else {
      // Simple token: a sign-optional run of letter/digit/^/. characters
      // (e.g. 3, 12, x, a, x², a^5). Stop at whitespace, comma, dot+space,
      // operators outside of `^`, semicolons, closing parens.
      const STOP = /[\s,;)]/;
      const re = /^[A-Za-z0-9.\-+²³⁰¹⁴⁵⁶⁷⁸⁹^]+/;
      const m = text.slice(j).match(re);
      if (!m) { out += ch; i++; continue; }
      // Trim trailing punctuation that doesn't belong to the denominator
      let token = m[0];
      // Strip trailing `.` if next char is whitespace or end (sentence period).
      while (token.length && (
        (token.endsWith('.') && (j + token.length >= text.length || /\s/.test(text.charAt(j + token.length))))
      )) token = token.slice(0, -1);
      if (!token) { out += ch; i++; continue; }
      denBody = token;
      denEnd = j + token.length;
    }
    // Trim leading/trailing whitespace inside the bodies for clean output.
    const numClean = num.body.trim();
    const denClean = denBody.trim();
    if (!numClean || !denClean) { out += ch; i++; continue; }
    // If we picked up a coefficient before the `(`, fold it into the
    // numerator AND truncate the already-emitted `out` so we don't
    // duplicate it.
    let numerator;
    if (coeffText) {
      numerator = coeffText + '(' + numClean + ')';
      out = out.slice(0, out.length - coeffText.length);
    } else {
      numerator = numClean;
    }
    out += '\\frac{' + numerator + '}{' + denClean + '}';
    i = denEnd;
    touched = true;
  }
  return touched ? out : text;
}

let totalScanned = 0;
let totalUpgraded = 0;
let questionsTouched = 0;
const samples = [];

for (const filepath of files) {
  let content = fs.readFileSync(filepath, 'utf8');
  const original = content;

  // Walk through the file looking for `id: 'q-XXX'` markers, then upgrade
  // string fields within the enclosing object (stem and choices).
  // Same brace-bounded approach as apply-difficulty-fixes.js.
  const ID_RE = /id:\s*'([^']+)'/g;
  let m;
  const objects = [];
  while ((m = ID_RE.exec(content)) !== null) {
    const idIdx = m.index;
    const objStart = content.lastIndexOf('{', idIdx);
    if (objStart === -1) continue;
    let depth = 0, end = -1;
    for (let i = objStart; i < content.length; i++) {
      const ch = content[i];
      if (ch === '{') depth++;
      else if (ch === '}') { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end === -1) continue;
    objects.push({ id: m[1], objStart, end });
  }

  // Process objects in REVERSE order so earlier offsets stay valid.
  for (const obj of objects.slice().reverse()) {
    totalScanned++;
    const objText = content.slice(obj.objStart, obj.end + 1);
    // Upgrade string literals inside stem: '...' and choices: [...]
    // Also passages, but those are rare in math.
    let touched = false;
    const newObjText = objText.replace(
      /(stem|choices|passage)(\s*:\s*)((?:'[^'\\]*(?:\\.[^'\\]*)*'|\[[^\]]*\]))/g,
      (full, key, sep, value) => {
        // Walk through string literals within the value, applying
        // upgradeFractions to each.
        const newValue = value.replace(
          /'([^'\\]*(?:\\.[^'\\]*)*)'/g,
          (_, str) => {
            const before = str;
            const after = upgradeFractions(str);
            if (before !== after) {
              touched = true;
              if (samples.length < 12) samples.push({ id: obj.id, key, before: before.slice(0, 90), after: after.slice(0, 110) });
            }
            // Re-escape any backslashes that we just inserted so they
            // survive eval. Inside JS source strings, `\frac` would be
            // interpreted (\f is form feed!) — write `\\frac` instead.
            return "'" + after.replace(/\\frac/g, '\\\\frac').replace(/\\sqrt/g, '\\\\sqrt') + "'";
          }
        );
        return key + sep + newValue;
      }
    );
    if (touched) {
      questionsTouched++;
      content = content.slice(0, obj.objStart) + newObjText + content.slice(obj.end + 1);
    }
  }

  if (content !== original) {
    totalUpgraded++;
    if (APPLY) fs.writeFileSync(filepath, content);
  }
}

console.log('Files scanned:    ', files.length);
console.log('Questions scanned:', totalScanned);
console.log('Questions touched:', questionsTouched);
console.log('Files changed:    ', totalUpgraded, APPLY ? '(written)' : '(dry-run — pass --apply to write)');
console.log('\nSample transformations:');
for (const s of samples) {
  console.log('  ', s.id, '|', s.key);
  console.log('    BEFORE:', s.before);
  console.log('    AFTER: ', s.after);
}
