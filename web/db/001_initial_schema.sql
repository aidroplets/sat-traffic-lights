-- Study Signal — initial schema
-- Run this once in your Supabase project's SQL editor.

-- ---- users ------------------------------------------------------------
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  role          text not null default 'user' check (role in ('user', 'admin')),
  created_at    timestamptz not null default now(),
  last_login_at timestamptz
);

create index if not exists users_email_idx on public.users (email);

-- ---- magic tokens (for email magic-link auth) -------------------------
create table if not exists public.magic_tokens (
  token       text primary key,
  email       text not null,
  expires_at  timestamptz not null,
  used_at     timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists magic_tokens_email_idx on public.magic_tokens (email);

-- ---- question state overrides ----------------------------------------
-- Mirrors the localStorage stl_question_overrides shape. Only admins
-- can write here (enforced by the API layer).
create table if not exists public.question_overrides (
  question_id  text primary key,
  state        text check (state in ('live', 'unpublished', 'needs-review')),
  stem         text,
  choices      jsonb,
  answer       text,
  explanation  text,
  topic        text,
  difficulty   integer check (difficulty between 200 and 800),
  updated_by   text,                                  -- email
  updated_at   timestamptz not null default now()
);

-- ---- attempts (synced from clients on completion) --------------------
create table if not exists public.attempts (
  id           text primary key,                      -- att_<ts>_<rand> from the client
  user_id      uuid references public.users(id) on delete set null,
  email        text,                                  -- denormalized for analytics convenience
  data         jsonb not null,                        -- full attempt payload (includes snaps)
  completed_at timestamptz not null default now()
);

create index if not exists attempts_user_idx on public.attempts (user_id);
create index if not exists attempts_completed_idx on public.attempts (completed_at desc);

-- ---- per-question outcomes (denormalized for the admin stat bar) -----
-- One row per (question, attempt). Lets the admin tool compute
-- signal-color stats quickly without scanning the full attempts.data.
create table if not exists public.attempt_answers (
  id           bigserial primary key,
  attempt_id   text not null references public.attempts(id) on delete cascade,
  question_id  text not null,
  picked       text,
  signal       text check (signal in ('green', 'yellow', 'red')),
  is_correct   boolean,
  perm         jsonb,
  created_at   timestamptz not null default now()
);

create index if not exists attempt_answers_qid_idx on public.attempt_answers (question_id);
create index if not exists attempt_answers_signal_idx on public.attempt_answers (signal);

-- ---- Row Level Security ----------------------------------------------
-- Service role (used by the API layer) bypasses RLS. Anon (client-side
-- direct reads, if we ever do that) is locked out.
alter table public.users              enable row level security;
alter table public.magic_tokens       enable row level security;
alter table public.question_overrides enable row level security;
alter table public.attempts           enable row level security;
alter table public.attempt_answers    enable row level security;

-- Policy intentionally omitted — no anon access. All reads/writes go
-- through the API layer, which authenticates with the service role
-- key. Add per-table policies later if you decide to expose direct
-- Supabase client access from the browser.

-- ---- bootstrap admins -------------------------------------------------
-- Insert the seed admin users (idempotent). The auth API also marks
-- bootstrap admins automatically on first sign-in, but pre-seeding
-- means the row exists from day one.
insert into public.users (email, role)
values
  ('joshua@sortino.co', 'admin'),
  ('mweber0204@gmail.com', 'admin')
on conflict (email) do update set role = excluded.role;
