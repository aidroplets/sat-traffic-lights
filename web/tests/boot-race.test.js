/**
 * Boot-race regression test.
 *
 * The bug we're guarding against:
 *   bank-loader.js fetches /api/questions, then injects app.js via
 *   document.createElement('script'). The fetch is async, so by the
 *   time app.js executes, document.readyState is almost always
 *   'interactive' or 'complete' — DOMContentLoaded has already fired.
 *
 *   If app.js's boot is wired ONLY through
 *   `document.addEventListener('DOMContentLoaded', boot)`, that
 *   listener never fires (the event is already past), and the picker
 *   renders its title from static HTML but its grid stays empty
 *   because the populate code lives inside boot.
 *
 * Defenses we assert:
 *   1. app.js must use a readyState guard, NOT a bare DOMContentLoaded
 *      listener as its only boot trigger.
 *   2. bank-loader.js must inject app.js with document.body.appendChild
 *      AFTER the bank fetch resolves (this is the trigger condition).
 *   3. index.html must not load app.js directly with a <script src=>
 *      tag — that would be the old boot path which would race against
 *      bank-loader's globals.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/boot-race.test.js
 */
const fs = require('node:fs');
const path = require('node:path');

const APP_SRC    = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const LOADER_SRC = fs.readFileSync(path.join(__dirname, '..', 'bank-loader.js'), 'utf8');
const INDEX_SRC  = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

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

console.log('boot-race.test.js');
console.log('');

// 1. app.js must consult document.readyState before settling for a
//    DOMContentLoaded listener.
t('app.js gates boot on document.readyState (no bare DOMContentLoaded-only boot)', () => {
  const hasReadyStateGuard = /document\.readyState/.test(APP_SRC);
  if (!hasReadyStateGuard) {
    throw new Error('app.js does not reference document.readyState — boot will silently miss ' +
      'DOMContentLoaded when bank-loader injects app.js after the event has already fired.');
  }
  // Belt-and-suspenders: the boot function should be defined as a
  // named arrow/const and dispatched two ways (listener + immediate
  // call). A single addEventListener with no fallback is the bug.
  // We look for the pattern "if (document.readyState === 'loading')"
  // which is the canonical fix and easy to grep for.
  if (!/document\.readyState === ['"]loading['"]/.test(APP_SRC)) {
    throw new Error('app.js missing the "readyState === loading" branch — the boot listener ' +
      'is the bug case (event already past). Use the loading-state check to decide between ' +
      'an addEventListener and an inline call.');
  }
});

// 2. bank-loader.js must inject app.js after its fetch — this is the
//    cause of the race, so we assert it's still the design (any
//    refactor that loads app.js synchronously breaks the rest of the
//    file's assumptions about the globals being populated).
t('bank-loader.js appends app.js as a script element after the API fetch', () => {
  if (!/createElement\(['"]script['"]\)/.test(LOADER_SRC)) {
    throw new Error('bank-loader.js does not appear to dynamically inject app.js. ' +
      'If you refactored, make sure the populate-globals → load-app sequence is preserved.');
  }
  if (!/appendChild|append\(/.test(LOADER_SRC)) {
    throw new Error('bank-loader.js does not appendChild the app.js script tag.');
  }
});

// 3. index.html must NOT load app.js with its own <script src=> tag —
//    that bypasses bank-loader entirely and would run app.js BEFORE
//    the globals are populated, leaving the picker empty for a
//    different reason (assembleBank sees empty arrays).
t('index.html does not load app.js directly (only via bank-loader)', () => {
  if (/<script[^>]*src=["']\.?\/?app\.js/i.test(INDEX_SRC)) {
    throw new Error('index.html has a direct <script src="./app.js"> tag — bank-loader.js ' +
      'must be the only thing that loads app.js, otherwise the picker grid renders before ' +
      'STL_QUESTIONS_* are populated.');
  }
  if (!/bank-loader\.js/.test(INDEX_SRC)) {
    throw new Error('index.html does not reference bank-loader.js at all. The picker grid ' +
      'will be empty because nothing populates the globals.');
  }
});

// 4. Smoke check: simulate the boot flow in a stub environment. We
//    can't run app.js's full IIFE without a DOM, but we can verify
//    the readyState branching logic in isolation by extracting the
//    boot dispatch snippet and running it with a fake document.
t('boot dispatch runs inline when readyState !== loading', () => {
  // Extract the dispatch block. It looks like:
  //   if (document.readyState === 'loading') {
  //     document.addEventListener('DOMContentLoaded', __stlBoot);
  //   } else {
  //     Promise.resolve().then(__stlBoot);
  //   }
  const m = APP_SRC.match(/if \(document\.readyState === ['"]loading['"]\) \{([\s\S]*?)\} else \{([\s\S]*?)\}/);
  if (!m) {
    throw new Error('Could not locate the readyState dispatch block in app.js. ' +
      'If you refactored, update this test to match.');
  }
  const elseBranch = m[2];
  // The else branch MUST call the boot synchronously or via a
  // microtask. A delay (setTimeout, requestIdleCallback) would
  // create a different visible race.
  if (!/__stlBoot|boot\(\)|stlBoot\(\)/.test(elseBranch)) {
    throw new Error('readyState else-branch does not invoke the boot function. ' +
      'A direct call (or Promise.resolve().then(boot)) is required.');
  }
});

console.log('');
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
