-- 003_questions.sql — canonical question bank + imports registry + test config
--
-- Replaces the static questions-*.js files (rsynced to the mirror at deploy
-- time) with a real database table. Joined by:
--   questions.import_id  → imports.id        (which batch a question came in via)
--   imports.test_type    → test_config.test_id (cross-reference for filter UIs)
--
-- The question_overrides table from 001 + 002 already covers per-question
-- admin edits (state, stem, choices, answer, explanation, topic, difficulty,
-- note, note_attachments). The client merges base + override at render time.
--
-- Why these columns specifically — mirrors the existing window.STL_QUESTIONS_*
-- shape in app.js's assembleBank() merge so the seed script is a 1:1 copy.

-- ---- imports (created first so questions.import_id FK works) ----
create table if not exists public.imports (
  id            text primary key,                       -- e.g. 'sat-math-2026-05-25'
  label         text not null,                          -- "SAT Math — 2026-05-25 batch"
  source_file   text,                                   -- 'questions.json'
  generated_at  date,
  test_type     text,                                   -- 'SAT' | 'ACT' | ...
  section       text,                                   -- 'math' | 'reading-writing' | ...
  count         integer,
  deleted_at    timestamptz,                            -- soft-delete flag
  deleted_by    text,
  created_at    timestamptz not null default now()
);

-- ---- questions (the bank itself) ----
create table if not exists public.questions (
  id            text primary key,                       -- existing q-* IDs (q-7000, q-8000, q-satm-2025-001, ...)
  source_id     text,                                   -- 'Q123' — roundtrip to upload-schema source
  test_type     text not null,                          -- mirrors window.STL_QUESTIONS_*_DEFAULTS.testType
  section       text not null,                          -- 'math' | 'reading-writing' | 'english' | 'reading' | 'science' | 'verbal' | etc.
  topic         text,
  difficulty    integer check (difficulty is null or difficulty between 1 and 800),
  -- 1-36 = ACT scale, 200-800 = SAT scale, 1-12 = SSAT/ISEE percentile-ish;
  -- we accept the union and rely on test_type for interpretation.
  state         text not null default 'live'
                 check (state in ('live', 'needs-review', 'unpublished', 'archived', 'deleted')),
  source        text not null default 'human-curated'
                 check (source in ('human-curated', 'ai-generated')),
  stem          text not null,
  choices       jsonb,                                  -- array of strings; null for grid-in (SPR)
  answer        jsonb not null,                         -- integer (index) for MCQ, string for SPR
  explanation   text,
  passage       text,
  table_data    jsonb,                                  -- markdown-table figures lifted into structured form
  svg           text,                                   -- inline chart/figure SVG
  uploader      text,
  review_status text,
  import_id     text references public.imports(id) on delete set null,
  metadata      jsonb default '{}'::jsonb,              -- catch-all for less-used fields (model, batch, reviewedBy, etc.)
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists questions_test_section_state_idx on public.questions (test_type, section, state);
create index if not exists questions_topic_idx              on public.questions (topic);
create index if not exists questions_import_id_idx          on public.questions (import_id);
create index if not exists questions_state_idx              on public.questions (state)
  where state != 'deleted';

-- ---- test_config (per-test settings the admin Tests panel writes) ----
-- Today this lives in localStorage as stl_test_compositions + stl_active_tests
-- + stl_enabled_subjects. Combine into a single row per test for atomic updates.
create table if not exists public.test_config (
  test_id           text primary key,                   -- 'SAT' | 'ACT' | 'PSAT' | 'SSAT' | 'HSPT' | 'ISEE'
  is_active         boolean not null default true,
  length            integer,                            -- null = use code default
  subject_mix       jsonb,                              -- {math: 13, 'reading-writing': 17}
  enabled_subjects  text[] not null default '{}',       -- ['math', 'reading-writing']
  -- Theme tint as an "R, G, B" string (matches the format JS feeds to
  -- rgba(var(--stl-tint), 0.5) without parsing). NULL on initial
  -- insert; the seed script + admin Tests panel write the canonical
  -- values from TEST_TYPES.tint.
  tint              text,
  updated_by        text,
  updated_at        timestamptz not null default now()
);

-- ---- users extensions ----
alter table public.users
  add column if not exists display_name text,
  add column if not exists settings     jsonb default '{}'::jsonb;
-- settings: per-user UI prefs that should sync across devices
-- (math_color, etc.). Device-only state stays in localStorage.

-- Touch trigger so updated_at auto-bumps on every row update. Reused
-- across question_overrides, questions, and test_config.
create or replace function public.touch_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists questions_touch        on public.questions;
drop trigger if exists test_config_touch       on public.test_config;
create trigger questions_touch       before update on public.questions      for each row execute function public.touch_updated_at();
create trigger test_config_touch     before update on public.test_config    for each row execute function public.touch_updated_at();
