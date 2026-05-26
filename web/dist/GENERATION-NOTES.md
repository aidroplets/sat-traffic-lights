# SAT Traffic Lights — AI question generation methodology

This document records how the AI-generated questions in `questions-generated.js` were produced, so a human reviewer can audit the process before promoting any of them from `state: 'needs-review'` to `state: 'live'`.

## What "AI-generated" means here

Each question in `questions-generated.js` was produced by Claude (Anthropic's LLM) following the same schema used by the human-curated bank in `questions.js`. None of these questions are copied from real SAT/ACT material; they are originals written to match the SAT's typical content distribution and difficulty conventions.

## Provenance fields (set automatically via the file's defaults block)

```js
window.STL_QUESTIONS_AI_DEFAULTS = {
  source: 'ai-generated',
  uploader: 'AI Generated',
  state: 'needs-review',
  reviewStatus: 'unreviewed',
};
```

Per-question fields that override the defaults:
- `createdAt` — ISO date the batch was generated
- `model` — the LLM identifier (e.g., `claude-opus-4`)
- `batch` — string tag used to track which generation pass produced the item

## Distribution targets

Mirrors the human-curated bank:

| Section / topic | Easy | Medium | Hard | Insane |
|---|---|---|---|---|
| Math — algebra | ~6 | ~5 | ~2 | ~1 |
| Math — word-problem | ~10 | ~6 | ~1 | — |
| Math — functions | ~3 | ~3 | ~2 | ~1 |
| Math — geometry | ~3 | ~3 | ~1 | — |
| Math — statistics | ~2 | ~2 | — | — |
| Math — systems | ~1 | ~2 | — | — |
| Math — exponents | ~2 | ~2 | ~1 | — |

(approximate; the actual generated batch may shift ±2 per cell to keep the total at 100)

## Self-validation steps applied to each question

For every generated item, the model was instructed to:

1. **Re-solve the problem from scratch** before committing the `answer` field
2. **Sanity-check the difficulty tier** against the rubric:
   - `easy` (≤ 500): one-step, clean arithmetic
   - `medium` (501–600): 2–3 steps; pick the right setup from a word problem
   - `hard` (601–700): multi-step / non-obvious / specific theorem
   - `insane` (701–800): perfect-scorer-tier; the trick is the whole problem
3. **Avoid duplicating** any existing question's prompt, numbers, or premise
4. **Verify the explanation** walks through the solution that yields the recorded answer
5. **For multiple choice**, ensure exactly one choice is correct and distractors are plausible (common arithmetic slips, sign errors, or off-by-one mistakes — not random numbers)

Despite these steps, **errors will slip through**. The expected error rate is 2–5% (≈ 2–5 wrong-key questions per 100). The `state: 'needs-review'` default ensures none of these questions reach a real test until a human approves them.

## Reviewer workflow

1. Visit `/?admin=1`
2. Filter to **State: Needs review** + **Source: AI-generated**
3. For each question:
   - Click **Edit** to see stem, choices, answer, explanation
   - Solve it independently
   - If correct → set state to **Live** and save
   - If wrong → fix the answer/explanation, save, then promote to Live
   - If unsalvageable → leave state as **Unpublished** (the bank keeps the record but it never enters the quiz pool)

## Batch log

Each generation pass appended to a sub-array tagged with its `batch` identifier. The current passes:

| Batch | Date | Count | Model | Status |
|---|---|---|---|---|
| `batch-1-2026-04-29` | 2026-04-29 | 100 | claude-opus-4 | All needs-review; awaiting human audit |

### Batch 1 distribution (45 / 38 / 14 / 3)

- 45 easy: linear-equations (5), word-problem (10), functions (8), polynomials (3), data-analysis (5), algebra (3), geometry (3), statistics+probability (2), proportions (2), percents (2), exponents (2)
- 38 medium: linear-equations (4), word-problem (8), functions (4), coordinate-geometry (4), systems (3), polynomials (4), inequalities (2), quadratics (3), geometry (3), statistics+probability (3)
- 14 hard: algebra (3), word-problem (2), functions (3), coordinate-geometry (2), systems (2), statistics (1), geometry (1)
- 3 insane: functions (1), algebra (1), coordinate-geometry (1)

Grid-in (free-response) ratio: ~15% (15 of 100), matching the human-curated bank.

ID range: q-8001 through q-8100.

This table is updated after each generation pass.
