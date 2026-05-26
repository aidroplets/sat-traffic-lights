# SAT Traffic Lights

A 30-question SAT/ACT practice droplet with a **Green / Yellow / Red** confidence
signal after each question — eliminates the "guessed right by accident" blind
spot that other prep apps miss.

## Flow

1. **Score target** — student enters a desired score (200–800). This gates the
   difficulty pool:
   - ≤500 → easy only
   - 501–600 → easy + medium
   - 601–700 → easy + medium + hard
   - 701–800 → all difficulties (incl. *insane*)
2. **30-question test** — randomized from the eligible pool. After each item the
   student picks **GREEN** (confident) / **YELLOW** (unsure) / **RED** (no clue)
   instead of a generic Submit.
3. **Review (optional)** — only items that were *not BOTH correct AND green*
   are shown, with the full explanation. The student can walk through them one
   at a time, or skip straight to step 4.
4. **Regenerate** — from either the results screen or after review, the
   student can launch:
   - a **custom tailored test** built from just the topics they missed, or
   - a **new regular test** (fresh randomized 30 from the same difficulty pool).

All questions are 4-option multiple choice (A/B/C/D). The displayed order of
the choices is shuffled on every render, so the same question can have its
correct answer at A one time and D the next — students can't cheat by
memorizing letter positions.

## Question bank

Lives in [`web/questions.js`](web/questions.js). Each question:

```js
{
  id: 'm-easy-001',
  section: 'math' | 'reading' | 'writing',
  difficulty: 'easy' | 'medium' | 'hard' | 'insane',
  topic: 'algebra',           // free-form tag, used by the regen step
  passage: '…optional…',
  stem: 'What is 2 + 2?',
  choices: ['2', '3', '4', '5'],   // exactly 4 entries
  answer: 2,                       // index into choices (0–3)
  explanation: 'Sum the two…',
}
```

Drop new items into the array (or import from another file) and the app picks
them up on next load. Target: 1,000+ unique items.

## Run

From the repo root:

```sh
npx --yes serve .
```

Then open <http://localhost:3000/droplets/sat-traffic-lights/web/>.
