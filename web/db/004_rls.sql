-- 004_rls.sql — Row-Level Security policies
--
-- Enable RLS on every table from day one. Today every API call uses the
-- Supabase service-role key (server-side only) which bypasses RLS, so
-- enabling RLS doesn't break anything immediately — it just adds a
-- defense-in-depth layer that prevents accidental exposure if the anon
-- key ever leaks or we wire student-facing direct-from-browser reads
-- later.
--
-- Policy intent (current authentication = our own JWT cookie, NOT
-- Supabase Auth, so auth.uid() / auth.jwt() are NULL for our users):
--
--   • Anon role        → no access by default. The bank read endpoint
--                        (/api/questions) uses the service-role key.
--   • Service role     → full access (bypasses RLS).
--   • Future Supabase Auth users → policies below allow per-user attempt
--                        access once we migrate to Supabase Auth.
--
-- When we eventually wire Supabase Auth for students, the per-user
-- attempts/attempt_answers policies start mattering. Until then, RLS
-- on those tables is a safety net.

-- ---- enable RLS on new + existing tables ----
alter table public.questions          enable row level security;
alter table public.imports            enable row level security;
alter table public.test_config        enable row level security;
-- already enabled in 001 but idempotent:
alter table public.users              enable row level security;
alter table public.attempts           enable row level security;
alter table public.attempt_answers    enable row level security;
alter table public.question_overrides enable row level security;
alter table public.magic_tokens       enable row level security;

-- ---- helper: is the requestor authenticated via Supabase Auth? ----
-- (Returns false for our JWT cookie users, who hit service-role-keyed
-- endpoints.) Kept around for forward-compat as we migrate auth.
create or replace function public.current_user_email()
  returns text language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', null);
$$;

-- ---- questions: public read live; admins read all ----
drop policy if exists "questions_select_live"  on public.questions;
drop policy if exists "questions_select_admin" on public.questions;
create policy "questions_select_live" on public.questions
  for select to anon, authenticated
  using (state = 'live');
create policy "questions_select_admin" on public.questions
  for select to authenticated
  using (public.current_user_email() in ('joshua@sortino.co', 'mweber0204@gmail.com'));
-- Writes intentionally have NO policy → only service-role can write.

-- ---- imports: public read active; admins read all ----
drop policy if exists "imports_select_active" on public.imports;
drop policy if exists "imports_select_admin"  on public.imports;
create policy "imports_select_active" on public.imports
  for select to anon, authenticated
  using (deleted_at is null);
create policy "imports_select_admin" on public.imports
  for select to authenticated
  using (public.current_user_email() in ('joshua@sortino.co', 'mweber0204@gmail.com'));

-- ---- test_config: public read ----
drop policy if exists "test_config_select_all" on public.test_config;
create policy "test_config_select_all" on public.test_config
  for select to anon, authenticated using (true);

-- ---- question_overrides: admins only (read + write) ----
drop policy if exists "overrides_admin_all" on public.question_overrides;
create policy "overrides_admin_all" on public.question_overrides
  for all to authenticated
  using (public.current_user_email() in ('joshua@sortino.co', 'mweber0204@gmail.com'))
  with check (public.current_user_email() in ('joshua@sortino.co', 'mweber0204@gmail.com'));

-- ---- attempts: user owns their rows (forward-compat for Supabase Auth) ----
drop policy if exists "attempts_user_select" on public.attempts;
drop policy if exists "attempts_user_insert" on public.attempts;
drop policy if exists "attempts_user_update" on public.attempts;
create policy "attempts_user_select" on public.attempts
  for select to authenticated using (auth.uid() = user_id);
create policy "attempts_user_insert" on public.attempts
  for insert to authenticated with check (auth.uid() = user_id);
create policy "attempts_user_update" on public.attempts
  for update to authenticated using (auth.uid() = user_id);

-- ---- attempt_answers: same scope via join ----
drop policy if exists "attempt_answers_user_all" on public.attempt_answers;
create policy "attempt_answers_user_all" on public.attempt_answers
  for all to authenticated
  using (
    exists (
      select 1 from public.attempts
      where attempts.id = attempt_answers.attempt_id
        and attempts.user_id = auth.uid()
    )
  );

-- ---- users: own row read; admins read all ----
drop policy if exists "users_own_select"   on public.users;
drop policy if exists "users_admin_select" on public.users;
create policy "users_own_select" on public.users
  for select to authenticated using (auth.uid() = id);
create policy "users_admin_select" on public.users
  for select to authenticated
  using (public.current_user_email() in ('joshua@sortino.co', 'mweber0204@gmail.com'));

-- magic_tokens: no public/anon access; service-role only (intentional).
