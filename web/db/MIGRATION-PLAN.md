# Migration plan — localStorage + bank-files → Supabase

Status: **draft**. No execution yet — this is the design.

Goal: make Supabase the single source of truth for users, questions, attempts, admin overrides, and test config. Eliminate the "every admin sees a different bank" problem and unblock multi-device sync. Keep the live quiz fast (sub-100ms first paint) by serving a pre-generated snapshot rather than fetching question-by-question.

---

## 1. Inventory — what exists today, where

### 1a. Already in Supabase (schema present, partially wired)

| Table              | Schema applied? | Client writes to it?                     |
|--------------------|-----------------|------------------------------------------|
| `users`            | ✓ (001)         | Magic-link login flow only               |
| `magic_tokens`     | ✓ (001)         | Stateless JWT — not actually used        |
| `question_overrides` | ✓ (001 + 002) | **Notes + attachments only** (see /api/admin/note) |
| `attempts`         | ✓ (001)         | ✗ — client writes `stl_attempts` localStorage |
| `attempt_answers`  | ✓ (001)         | ✗ — derived from `attempts.data` blob today |

### 1b. localStorage keys (declared in app.js)

| Key                              | Shape                                | Scope        | Migrate?  |
|----------------------------------|--------------------------------------|--------------|-----------|
| `stl_question_overrides`         | `{ qid → {state, stem, choices, answer, explanation, topic, difficulty, note, noteAttachments, updatedAt, updatedBy} }` | Admin-shared | **Yes** — to `question_overrides` (note + attachments already there; state/stem/etc. need wiring) |
| `stl_admin_added_questions`      | `[{q1}, {q2}, …]` ad-hoc admin rows  | Admin-shared | **Yes** — new `questions` table |
| `stl_test_compositions`          | `{ testId → {length, subjectMix} }`   | Admin-shared | **Yes** — new `test_compositions` table |
| `stl_active_tests`               | `[SAT, ACT, …]` which tests are live | Admin-shared | **Yes** — new `test_config` row or column |
| `stl_attempts`                    | `[{id, testType, completedAt, totalElapsedMs, answers:[…], targetScore, …}]` | Per-user    | **Yes** — `attempts` + `attempt_answers` (schema already there) |
| `stl_imports_deleted`             | `[importId, importId, …]`             | Admin-shared | **Yes** — column on a new `imports` table |
| `stl_enabled_subjects`            | `{ testId → [subjectId, …] }`         | Admin-shared OR per-user — **decide** | Yes |
| `stl_selected_test`               | string (`SAT`)                        | Per-user UI   | Keep local (it's a UI preference) |
| `stl_selected_subjects`           | `{ testId → [subjectId, …] }`         | Per-user UI   | Keep local |
| `stl_strict_difficulty`           | legacy                                | —             | Drop |
| `stl_dev_seeded_v1`               | dev fixture flag                      | —             | Drop |
| `stl_guest_id`                    | string                                | Per-user      | Keep local |
| `stl_include_lower`               | bool                                  | Per-user UI   | Keep local |
| `stl_math_color`                  | hex                                   | Per-user UI   | Keep local |
| `stl_admin_tests_expanded`        | bool array                            | Per-admin UI  | Keep local |
| `stl_resume_state`                | quiz resume payload                   | Per-user UI   | Keep local |
| `stl_sign_in_intent`              | auth-flow breadcrumb                  | Per-user UI   | Keep local |

### 1c. Static JS bank files (~53 files via `<script>` tags in index.html)

| File pattern                          | Test type | ~Rows |
|---------------------------------------|-----------|-------|
| `questions.js` (HUMAN_DEFAULTS)       | SAT       | ~115  |
| `questions-generated.js` (AI_DEFAULTS) | SAT       | ~440  |
| `questions-sat-math-2026-05-25.js`    | SAT       | 772   |
| `questions-sat-math-batch-2.js`       | SAT       | 40    |
| `questions-sat-reading-writing-*.js` (5 files) | SAT | ~700  |
| `questions-act-*.js` (7 files)        | ACT       | ~600  |
| `questions-psat-*.js` (4 files)       | PSAT      | ~240  |
| `questions-ssat-*.js` (5 files)       | SSAT      | ~360  |
| `questions-hspt-*.js` (8 files)       | HSPT      | ~580  |
| `questions-isee-*.js` (9 files)       | ISEE      | ~455  |
| **Total**                              |           | **~3,300+ rows** |

Each file declares a `STL_QUESTIONS_<TYPE>_DEFAULTS` object and pushes onto a `STL_QUESTIONS_<TYPE>` array. The client merges all of them into `STL_QUESTIONS_ALL` at module load via `assembleBank()`.

---

## 2. Target schema additions

Three new tables, plus extensions to existing ones.

### 2a. New: `questions` table

The canonical bank.

```sql
create table public.questions (
  id            text primary key,                -- existing q-* IDs
  source_id     text,                            -- Q### roundtrip to import source
  test_type     text not null,                   -- 'SAT' | 'ACT' | 'PSAT' | 'SSAT' | 'HSPT' | 'ISEE'
  section       text not null,                   -- 'math' | 'reading-writing' | 'english' | ...
  topic         text,
  difficulty    integer check (difficulty between 200 and 800),
  state         text not null default 'live'
                 check (state in ('live', 'needs-review', 'unpublished', 'deleted')),
  source        text not null default 'human-curated'
                 check (source in ('human-curated', 'ai-generated')),
  stem          text not null,
  choices       jsonb,                            -- array of strings; null for grid-in
  answer        jsonb not null,                   -- number (index) for MCQ, string for SPR
  explanation   text,
  table_data    jsonb,                            -- q.table — markdown-table figures
  svg           text,                             -- inline chart SVG
  passage       text,
  uploader      text,
  review_status text,
  import_id     text references public.imports(id) on delete set null,
  metadata      jsonb default '{}'::jsonb,        -- catch-all for less-used fields
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index on public.questions (test_type, section, state);
create index on public.questions (import_id);
create index on public.questions (topic);
```

### 2b. New: `imports` table

What today is `window.STL_IMPORTS` + `stl_imports_deleted`.

```sql
create table public.imports (
  id            text primary key,                -- 'sat-math-2026-05-25'
  label         text not null,
  source_file   text,                            -- 'questions.json'
  generated_at  date,
  test_type     text,
  section       text,
  count         integer,
  deleted_at    timestamptz,                     -- soft-delete flag (NULL = active)
  deleted_by    text,
  created_at    timestamptz not null default now()
);
```

### 2c. New: `test_config` table (or row in a `kv_config` table)

Today's `stl_test_compositions` + `stl_active_tests` + `stl_enabled_subjects` all describe per-test configuration that admins edit and everyone consumes. Combine into one row per test:

```sql
create table public.test_config (
  test_id           text primary key,            -- 'SAT', 'ACT', etc.
  is_active         boolean not null default true,
  length            integer,                     -- override; null = use code default
  subject_mix       jsonb,                       -- {math: 13, 'reading-writing': 17}
  enabled_subjects  text[] not null default '{}',
  updated_by        text,
  updated_at        timestamptz not null default now()
);
```

### 2d. Extend `question_overrides`

Today the table holds note/attachments (just shipped). To finish the migration, the per-question override semantics live there too:

```sql
-- already-present columns from 001: question_id, state, stem, choices, answer,
--                                    explanation, topic, difficulty, updated_by, updated_at
-- already-present from 002: note, note_attachments, note_updated_by, note_updated_at

-- nothing to add — the schema is sufficient. We just need to actually
-- write to `state`, `stem`, etc. from the client.
```

### 2e. Extend `users`

Add explicit columns we currently infer:

```sql
alter table public.users
  add column if not exists display_name text,
  add column if not exists settings     jsonb default '{}'::jsonb;
-- settings holds per-user UI prefs the user actually wants synced
-- across devices (e.g., math_color choice). Per-device-only state stays
-- in localStorage.
```

---

## 3. API endpoints to build

| Endpoint                              | Method | Purpose                                |
|---------------------------------------|--------|----------------------------------------|
| `/api/questions`                      | GET    | List questions (paginated, filtered) — public read |
| `/api/questions?ids=q1,q2,…`          | GET    | Batch fetch — used by review-modal etc. |
| `/api/questions/:id`                  | GET    | Single question                        |
| `/api/admin/question`                 | POST   | Create new question (admin-added flow) |
| `/api/admin/question/:id`             | PUT    | Edit (writes override row)             |
| `/api/admin/question/:id/state`       | PUT    | Quick state change (publish/unpublish/archive/delete) |
| `/api/admin/imports`                  | GET    | List imports (registry)                |
| `/api/admin/imports/:id/delete`       | POST   | Cascade-delete an import               |
| `/api/admin/imports/:id/restore`      | POST   | Reverse the cascade                    |
| `/api/test-config`                    | GET    | Read every test's length/mix/active    |
| `/api/admin/test-config/:test_id`     | PUT    | Update length/subjectMix/enabledSubjects |
| `/api/attempts`                       | GET    | Per-user attempt list                  |
| `/api/attempts`                       | POST   | Submit a finished attempt              |
| `/api/admin/notes` (already exists)   | GET    | List all notes across bank             |
| `/api/admin/note?qid=…` (already exists) | GET/PUT/DELETE | Single-question note            |

---

## 4. Snapshot strategy (the speed answer)

Naively fetching ~3,300 questions on every page load is slow (~600 KB JSON over the wire, plus DB round-trip). Solution: **pre-generate a static JSON snapshot at deploy time**, gzip-served from Vercel.

```
web/vercel-build.sh
  └─ node scripts/snapshot.js          # NEW — queries Supabase, writes web/dist/bank.json
  └─ build the rest of the static site
```

`bank.json` is loaded with a single `fetch('./bank.json')` at app boot, replacing all the `<script src="questions-*.js">` tags. Vercel's CDN caches it; admin edits trigger a redeploy that regenerates the snapshot.

Admin overrides (state changes, edits) are STILL queried live from Supabase per-render so changes appear without a redeploy. Snapshot = the heavy bank itself; overrides = the small per-row diffs.

---

## 5. Phased execution

Each phase is independently shippable + revertable.

### Phase 0 — finish wiring the schema we already have (~2 days, no client risk)

- [ ] Wire `setQuestionState()` to also POST to `/api/admin/question/:id/state`. Client writes both localStorage AND server; reads still prefer localStorage. **Zero user-visible change.**
- [ ] Same for `addAdminQuestion()` → POST to `/api/admin/question`.
- [ ] Same for `saveAttempt()` → POST to `/api/attempts`.
- [ ] Build the matching endpoints. All upsert-style so re-running is safe.
- [ ] Backfill: one-off script reads Joshua's + Mark's existing localStorage exports and inserts into Supabase. (Optional — if their state is small we can skip and let it re-populate naturally.)

### Phase 1 — questions table + admin write path (~3 days)

- [ ] Apply `003_questions.sql` migration (creates `questions` + `imports` + `test_config`).
- [ ] Build `scripts/seed-questions.mjs`: walks every `questions-*.js` file, extracts each `STL_QUESTIONS_*` array + defaults, inserts into `questions`. Idempotent (`on conflict (id) do update`).
- [ ] One-time run against prod to seed ~3,300 rows.
- [ ] Build the admin question endpoints (`POST /api/admin/question`, `PUT /api/admin/question/:id`).
- [ ] **No client read change yet** — bank still loads from JS files, just like today. The DB is shadow-populated.

### Phase 2 — snapshot + client read swap (~2 days, the user-visible cut)

- [ ] Build `scripts/snapshot.mjs`: queries `questions` (+ overrides merged + imports + test_config), writes `dist/bank.json`.
- [ ] Add to `vercel-build.sh` so every deploy regenerates the snapshot.
- [ ] Change `index.html`: remove the ~53 `<script src="questions-*.js">` tags, add a single `<link rel="preload" as="fetch" href="./bank.json">`.
- [ ] Add a tiny boot shim that fetches `bank.json` and populates `window.STL_QUESTIONS_*` from it — keeps `assembleBank()` unchanged.
- [ ] **Cut-over deploy.** First load is now one network round-trip for `bank.json` (cached by CDN after that). Subsequent loads come from disk cache.
- [ ] Delete the now-dead `questions-*.js` files (in a separate commit so the swap is easy to revert).

### Phase 3 — replace localStorage admin reads with DB reads (~2 days)

- [ ] `loadAdminOverrides()`: reads `/api/admin/overrides` (new endpoint, batch) on app load → caches in localStorage for the session. Writes already go to the DB from Phase 0.
- [ ] `loadTestCompositions()`, `loadActiveTests()`, `loadEnabledSubjects()`: same pattern → fetch from `/api/test-config` on app load.
- [ ] `loadAdminAdded()`: derived from `questions WHERE source = 'human-curated' AND id LIKE 'q-A%'` (admin-added IDs).
- [ ] `loadDeletedImports()`: from `imports WHERE deleted_at IS NOT NULL`.

After Phase 3 the localStorage entries become a **cache**, not a source of truth. A different admin's change appears at most one `bank-updated` event later.

### Phase 4 — per-user attempts moved to DB (~2 days)

- [ ] `loadAttempts()`: fetch `/api/attempts` for the current user; falls back to localStorage when unauthenticated (guest mode).
- [ ] `saveAttempt()`: already POSTs in Phase 0; remove the localStorage write for authenticated users (keep it for guests).
- [ ] Backfill script: any localStorage attempts get bulk-inserted on first sign-in.
- [ ] History tab + analysis tab read from `/api/attempts`.

### Phase 5 — deprecate + clean up (~1 day)

- [ ] Drop unused localStorage migration code (the ones we wrote earlier).
- [ ] Remove the dead `STL_QUESTIONS_<TYPE>_DEFAULTS` defaults globals.
- [ ] Document the new architecture in the README.
- [ ] Final regression pass: cold-load → quiz → submit → verify in Supabase + admin tab.

---

## 6. Risks + open decisions

### Risks

- **Boot performance regression.** Today's `<script>` tags load via parallel HTTP/2 + run sync. A single `bank.json` is faster overall but means the bank isn't ready until the fetch completes. Mitigation: preload + serve via Vercel edge cache.
- **Multi-admin write race.** Two admins editing the same question simultaneously. Mitigation: last-write-wins on `updated_at` is acceptable for SAT bank; if it ever matters, add an `if-match` header.
- **Snapshot staleness.** Edits don't show in the bank until next deploy. Mitigation: overrides table is read live, so any state/note change appears immediately. Only NEW questions need a redeploy to appear in the snapshot.
- **DB outage.** Supabase down → app stops working. Mitigation: client falls back to localStorage cache for the bank snapshot (last successful fetch); writes queue locally and retry.
- **Bank file regression.** Removing the `questions-*.js` files is invasive. Mitigation: keep them in git history; the snapshot is generated from DB so the JS files become legacy artifacts.

### Open decisions for Joshua

1. **Are `stl_enabled_subjects` and `stl_test_compositions` admin-shared or per-user?** I assumed admin-shared (every user gets the same config) because the admin "Tests" panel is where they're set. If they're per-user, swap to a `user_preferences` table.

2. **Do we keep the JS bank files in the repo after the snapshot ships?** Pro: easy revert. Con: 53 stale files lingering. I'd vote keep until Phase 5, then delete in one commit.

3. **Snapshot freshness.** Does Joshua want a manual "Regenerate bank.json" button in admin, or just rely on the deploy pipeline? Manual button is one extra endpoint that calls `scripts/snapshot.mjs` and writes to Vercel via the deploy hook.

4. **Attempts are large.** Each row carries the full snapshot of every question in the attempt (for replay). Over thousands of attempts this gets big. Worth normalizing into `attempt_answers` only? My take: keep the blob for now — JSONB is cheap and Supabase scales to TB without effort.

5. **RLS policies.** Today the API uses the service-role key (bypasses RLS). For Phase 4+ when we move attempts to the DB, do we want students to read their own attempts via the anon key + RLS? That'd let us cut some API endpoints. I'd defer until we have a real "students" cohort.

6. **Should the snapshot include admin overrides** (so the bank.json is the merged view), or stay as the raw bank with overrides applied client-side? Stay as raw + apply client-side — that way one admin edit doesn't invalidate the snapshot.

---

## 7. Effort estimate

- Phase 0: 1.5 days
- Phase 1: 2.5 days
- Phase 2: 2 days
- Phase 3: 1.5 days
- Phase 4: 1.5 days
- Phase 5: 0.5 day

Total: ~10 working days, achievable in 2 weeks calendar with focused sessions. Each phase is independently revertable so we can stop mid-way without rolling back to today.

---

## 7b. One-shot alternative (recommended given current state)

The phased plan above is the textbook approach when you have real users who can't tolerate downtime. Today studysignal has Joshua + Mark, no paying students, no public marketing pointing at it. The dual-write / shadow-population pattern that costs phased plan ~4 of its 10 days is **unnecessary insurance**. We can land the whole thing in one focused session.

### Why one-shot is actually cleaner

- No transitional code (dual-writes, "is localStorage or DB authoritative right now?" guards).
- The boot path goes async **once**. The async-tolerance change touches every read site once, not twice.
- Migration of existing localStorage state is a one-time backfill script, not a long-running compatibility layer.
- A bug in the cut-over deploy is fixed in-place because both Joshua and Mark are looking at it together.

### Risk delta vs phased

| | Phased | One-shot |
|---|---|---|
| Each commit reverts cleanly | ✓ | ✓ (whole branch reverts as one) |
| User-visible regression risk | low (gradual) | **moderate** (concentrated in 1 day) |
| Diagnostic difficulty if broken | easy (small surface) | **medium** (more touched at once) |
| Calendar duration | ~2 weeks | **~3 days** |
| Code complexity during transition | high (compat layer) | **none** |
| Code complexity after | clean | clean |

The risks are real but small — we have Vercel rollback (one click), a git revert, and ~3,300 questions that are static (no risk of "lost user-generated data" mid-cutover).

### One-shot execution plan (3 days)

#### Day 1 — backend in place, no client change yet

**Morning (3h)**
1. Apply `003_questions.sql`: creates `questions`, `imports`, `test_config` tables + indexes + RLS policies. (~30 min)
2. Build `scripts/seed-questions.mjs`: walks every `questions-*.js` file via `vm.runInNewContext`, harvests `STL_QUESTIONS_*` arrays + `_DEFAULTS` objects, merges, upserts to `questions`. Also builds `imports` rows from `STL_IMPORTS` and `test_config` rows from `TEST_TYPES` in `app.js`. (~2h)
3. Run seed against prod via Supabase service-role. Verify row counts: `select test_type, count(*) from questions group by 1`. (~30 min)

**Afternoon (4h)**
4. Build the API surface in one batch (~10 endpoints, mostly mirror images of one another):
   - `/api/questions` GET (list with filter)
   - `/api/questions/[id]` GET
   - `/api/admin/question` POST
   - `/api/admin/question/[id]` PUT (writes override row)
   - `/api/admin/question/[id]/state` PUT
   - `/api/admin/imports` GET
   - `/api/admin/imports/[id]/delete` POST
   - `/api/admin/imports/[id]/restore` POST
   - `/api/test-config` GET (every test row)
   - `/api/admin/test-config/[id]` PUT
   - `/api/attempts` GET + POST
   
   Each endpoint follows the same pattern as the existing `/api/admin/note.js` — session cookie check, ADMIN_EMAILS guard, validate body, upsert to Supabase. Maybe 30–60 lines each.

5. Smoke-test each endpoint with curl + a forged admin cookie. (~1h)

**End of Day 1:** Supabase has the full bank, every API endpoint works, the client hasn't changed at all. Site still loads exactly like before.

#### Day 2 — client cut-over (the user-visible day)

**Morning (3h)**

6. Build `scripts/snapshot.mjs`: queries `questions` (raw, no overrides applied), `imports`, `test_config`, writes `dist/bank.json` (~600 KB, gzip ~120 KB). Add the call to `vercel-build.sh`. (~1h)

7. Refactor app boot to be async:
   ```js
   // app.js boot section, replaces synchronous assembleBank() call
   const bootApp = async () => {
     const snapshot = await fetch('./bank.json').then(r => r.json());
     // Populate the existing globals so assembleBank() works unchanged
     window.STL_QUESTIONS_HUMAN_DEFAULTS = snapshot.defaults.human;
     window.STL_QUESTIONS_AI_DEFAULTS    = snapshot.defaults.ai;
     // ... one per test type
     window.STL_QUESTIONS_HUMAN = snapshot.questions.human;
     window.STL_QUESTIONS_AI    = snapshot.questions.ai;
     // ... etc
     window.STL_IMPORTS = snapshot.imports;
     // Load overrides + test_config in parallel
     const [overrides, testConfig] = await Promise.all([
       fetch('/api/admin/overrides').then(r => r.json()).catch(() => ({})),
       fetch('/api/test-config').then(r => r.json()).catch(() => ({})),
     ]);
     window.__STL_OVERRIDES_CACHE__ = overrides;
     window.__STL_TEST_CONFIG_CACHE__ = testConfig;
     assembleBank();
     // ... rest of init (init tabs, render, etc.)
   };
   document.addEventListener('DOMContentLoaded', bootApp);
   ```
   (~1.5h)

8. Add a tiny "Loading bank…" splash that shows for the ~200ms the fetch takes. (~30min)

**Afternoon (3h)**

9. Swap every localStorage write helper to call the API instead:
   - `setQuestionState` → PUT `/api/admin/question/:id/state`
   - `updateOverrides` → PUT `/api/admin/question/:id`
   - `addAdminQuestion` → POST `/api/admin/question`
   - `saveTestCompositions` → PUT `/api/admin/test-config/:id`
   - `saveActiveTests` → same
   - `saveEnabledSubjects` → same
   - `saveDeletedImports` → POST `/api/admin/imports/:id/delete`
   - `saveAttempt` → POST `/api/attempts` (skip when previewMode)
   
   Each is a one-function change. Keep the localStorage fallback for unauthenticated guests. (~2h)

10. Delete the 53 `<script src="questions-*.js">` tags from `index.html`. (~10min)

11. Smoke-test the full app: load → take a quiz → submit → log in as admin → edit a question → confirm it persisted → log in as Mark in a private window → confirm he sees the edit. (~1h)

12. Deploy. (~5min)

**End of Day 2:** Studysignal now reads from Supabase. Both admins share state. localStorage is a session-only cache.

#### Day 3 — backfill, polish, delete

**Morning (2h)**

13. Backfill script: walk your + Mark's existing localStorage exports (you can grab them via DevTools), insert into `question_overrides` and `attempts`. This catches all the work you've done on this branch that hasn't been written through to the DB yet. (~1.5h)

14. Verify in production: admin tab shows your real overrides + notes, attempts history shows your real attempts. (~30min)

**Afternoon (3h)**

15. Delete the now-dead bank JS files (`questions-*.js` × 53). Single commit titled "remove static bank files, replaced by Supabase + bank.json snapshot". (~30min)

16. Delete legacy localStorage migration code (the `archive→unpublished` IIFE we already removed, plus any other one-time migrations). (~15min)

17. Update the README + the brain's StudySignal page with the new architecture diagram. (~1h)

18. Final pass: load cold-cache, time the boot, check the snapshot size on the wire. (~1h)

**End of Day 3:** Done.

### What can go wrong (and the rollback)

- **Async boot fails because some code paths assume the bank is sync-loaded.** Rollback: `vercel rollback` to the previous deploy (one click, ~30s). The Supabase tables stay populated; client just goes back to reading static JS files.
- **API endpoint has a 500.** Rollback the deploy + push a fix. The localStorage cache keeps the UI usable while we patch.
- **Mark's existing localStorage gets clobbered by the backfill.** Mitigation: backfill MERGES with the server state (don't overwrite an existing server row with an empty client one). Have him export localStorage first as a safety net.
- **Bank.json blows past Vercel's response-size budget.** Unlikely (~120 KB gzipped) but if it happens we split by test type into 6 snapshots and fetch in parallel.

### When to NOT one-shot

If between today and execution we onboard real students, the calculus changes. The dual-write phased plan exists for that scenario. Until then, one-shot is the right call.

### Decision

If you say go, I run all of Days 1–3 in sequence. The 6 open decisions from §6 collapse to a default set unless you weigh in:

1. **Admin-shared** for `enabled_subjects` and `test_compositions` (consistent with current UI placement)
2. **Delete the bank JS files** at end of Day 3 (git history is the safety net)
3. **No manual "regenerate snapshot" button** — let the deploy pipeline handle it. Add later if needed.
4. **Keep the JSONB blob** for attempts; don't normalize. Cheap, scales, easier to reason about.
5. **Service-role only** for now; RLS for student access is a follow-up when we have real students.
6. **Raw snapshot** + apply overrides client-side. One edit doesn't invalidate the snapshot.

Say "go one-shot" and I start with the schema migration.

---

## 8. What I'd NOT migrate

Items I'm explicitly leaving in localStorage forever:

- `stl_resume_state` — quiz resume payload; ephemeral per-device.
- `stl_sign_in_intent` — auth flow breadcrumb.
- `stl_math_color`, `stl_include_lower`, `stl_admin_tests_expanded` — UI preferences, per-device.
- `stl_guest_id` — guest identifier; matters before sign-in.
- `stl_dev_seeded_v1` — local dev fixture.
- `stl_strict_difficulty` — legacy, drop entirely.

Anything else worth syncing across devices (e.g., dark-mode preference if we add one) goes into `users.settings` JSONB.

---

## 9. Sequencing dependency

```
Phase 0 ──┐
          ├─→ Phase 1 ──→ Phase 2 ──→ Phase 3 ──→ Phase 5
          │                          │
          └─────→ Phase 4 ───────────┘
```

Phase 4 (per-user attempts) can run in parallel with Phases 1–3 because the only shared dependency is the existence of the `questions` table for `attempt_answers.question_id`. Phase 5 (cleanup) must wait until 3 + 4 both ship and bake for a week.
