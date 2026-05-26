/**
 * Screen-restore regression tests.
 *
 * Run from the repo root:
 *   node droplets/sat-traffic-lights/web/tests/screen-restore.test.js
 *
 * The contract being defended (bug: refreshing on a past-attempt
 * results page dumped the user back to the picker):
 *   1. SAFE_BOOT_SCREENS — the synchronous boot-time set used to
 *      un-hide the correct screen before paint — must include every
 *      screen the resume layer knows how to rehydrate, including
 *      'results'. Otherwise the page flashes the picker/splash for
 *      a frame before settling.
 *   2. saveResumeState must persist the current attempt id when
 *      screen === 'results', so the restore path has something to
 *      look up. Specifically: payload.results = { attemptId }.
 *   3. restoreResumeStateIfAny, on screen === 'results', must look
 *      the attempt up by id (from loadAttempts()) and call
 *      hydrateFromAttempt() rather than relying on state.test already
 *      being populated (which never happens on a fresh boot).
 *   4. hydrateFromAttempt must stamp state.currentAttemptId so the
 *      next save can persist it. Same for the fresh-attempt save
 *      path inside showResults (the just-saved att.id).
 *
 * These are source-level (contract) checks — fast, no DOM, no jsdom.
 * They're regression guards against the exact code paths the fix
 * relies on, not a full execution simulation.
 */
'use strict';

const fs   = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
const t = (name, fn) => {
  try {
    fn();
    console.log('  ✓', name);
    passed++;
  } catch (err) {
    console.log('  ✗', name);
    console.log('     ', err.message);
    failed++;
  }
};

const APP_PATH = path.join(__dirname, '..', 'app.js');
const src = fs.readFileSync(APP_PATH, 'utf8');

console.log('Screen-restore contract');

// ----- 1. SAFE_BOOT_SCREENS membership --------------------------------
t('SAFE_BOOT_SCREENS includes all restorable screens (incl. results)', () => {
  // Match: const SAFE_BOOT_SCREENS = new Set(['splash', 'picker', ...]);
  const m = src.match(/SAFE_BOOT_SCREENS\s*=\s*new Set\(\[([^\]]+)\]\)/);
  if (!m) throw new Error('SAFE_BOOT_SCREENS declaration not found in app.js');
  const screens = m[1]
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
  const required = ['splash', 'picker', 'score', 'history', 'analysis', 'admin', 'results'];
  required.forEach((s) => {
    if (!screens.includes(s)) {
      throw new Error(
        'SAFE_BOOT_SCREENS missing "' + s + '" — ' +
        'refresh on this screen will flash the boot default before restoring. ' +
        'Found: [' + screens.join(', ') + ']'
      );
    }
  });
});

// ----- 2. saveResumeState handles each screen type --------------------
t('saveResumeState writes payload.quiz on screen=quiz', () => {
  if (!/screen === 'quiz' && state\.test/.test(src)) {
    throw new Error('quiz save branch missing in saveResumeState');
  }
});

t('saveResumeState writes payload.review on screen=review', () => {
  if (!/screen === 'review' && state\.reviewItems/.test(src)) {
    throw new Error('review save branch missing in saveResumeState');
  }
});

t('saveResumeState writes payload.history on screen=history|analysis', () => {
  if (!/screen === 'history' \|\| screen === 'analysis'/.test(src)) {
    throw new Error('history/analysis save branch missing in saveResumeState');
  }
  if (!/payload\.history = \{ filter:/.test(src)) {
    throw new Error('history.filter not persisted');
  }
});

t('saveResumeState writes payload.results = { attemptId } on screen=results', () => {
  // The line should read something like:
  // } else if (screen === 'results' && state.currentAttemptId) {
  //   payload.results = { attemptId: state.currentAttemptId };
  // }
  if (!/screen === 'results' && state\.currentAttemptId/.test(src)) {
    throw new Error(
      'results save branch missing — ' +
      'saveResumeState must persist state.currentAttemptId for refresh-to-restore'
    );
  }
  if (!/payload\.results\s*=\s*\{\s*attemptId:\s*state\.currentAttemptId/.test(src)) {
    throw new Error('payload.results.attemptId assignment not found');
  }
});

// ----- 3. restoreResumeStateIfAny rehydrates each screen --------------
t('restoreResumeStateIfAny rehydrates results from attemptId via loadAttempts', () => {
  // Should call loadAttempts(), find by id, then hydrateFromAttempt
  if (!/data\.results\s*&&\s*data\.results\.attemptId/.test(src)) {
    throw new Error('results restore branch does not read data.results.attemptId');
  }
  if (!/loadAttempts\(\)\.find\(/.test(src)) {
    throw new Error('results restore does not look up attempt via loadAttempts().find()');
  }
  if (!/hydrateFromAttempt\(att,\s*\{\s*skipSave:\s*true\s*\}\)/.test(src)) {
    throw new Error('results restore does not call hydrateFromAttempt with skipSave');
  }
});

t('restoreResumeStateIfAny rehydrates history filter', () => {
  if (!/data\.history && data\.history\.filter/.test(src)) {
    throw new Error('history filter restore branch missing');
  }
});

t('restoreResumeStateIfAny rehydrates analysis filter', () => {
  // analysis branch shares the same filter restore logic
  const analysisBranch = src.match(/if \(screen === 'analysis'\)[\s\S]{0,400}/);
  if (!analysisBranch) throw new Error('analysis restore branch missing');
  if (!/historyFilter\s*=\s*data\.history\.filter/.test(analysisBranch[0])) {
    throw new Error('analysis restore does not apply historyFilter from saved data');
  }
});

// ----- 4. currentAttemptId is stamped at hydrate + save time ----------
t('hydrateFromAttempt stamps state.currentAttemptId from att.id', () => {
  // Match inside hydrateFromAttempt: state.currentAttemptId = att.id || null;
  if (!/state\.currentAttemptId\s*=\s*att\.id\s*\|\|\s*null/.test(src)) {
    throw new Error(
      'hydrateFromAttempt does not stamp state.currentAttemptId — ' +
      'the subsequent saveResumeState will have nothing to persist'
    );
  }
});

t('showResults stamps state.currentAttemptId for fresh attempts', () => {
  // Match inside the saveAttempt block: state.currentAttemptId = att.id;
  if (!/saveAttempt\(att\);[\s\S]{0,400}state\.currentAttemptId\s*=\s*att\.id/.test(src)) {
    throw new Error(
      'showResults does not stamp state.currentAttemptId after saveAttempt(att) — ' +
      'a fresh attempt would not be restorable on refresh'
    );
  }
});

// ----- 5. Per-screen restore branches all present ---------------------
t('restoreResumeStateIfAny has a branch for every persisted screen', () => {
  const screensExpected = ['quiz', 'review', 'history', 'analysis', 'score', 'picker', 'results', 'admin'];
  screensExpected.forEach((s) => {
    const re = new RegExp("screen === '" + s + "'");
    if (!re.test(src)) {
      throw new Error('restoreResumeStateIfAny missing branch for screen=' + s);
    }
  });
});

// ----- Summary --------------------------------------------------------
console.log('');
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed === 0 ? 0 : 1);
