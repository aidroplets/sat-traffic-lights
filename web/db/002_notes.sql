-- 002_notes.sql — server-side admin notes + image attachments
-- Run once in the Supabase SQL editor (or via supabase migration apply).
--
-- Motivation: admin notes lived in localStorage so each admin saw only
-- their own. This migration moves them to the shared question_overrides
-- table so any admin can read what another admin wrote.
--
-- Schema additions:
--   note              free-text annotation (markdown allowed, rendered
--                     client-side via formatRich)
--   note_attachments  jsonb array of { name, mime, data_url, added_at }.
--                     Stored as data URLs inline for now — small images
--                     fit easily under jsonb row size limits (~1GB),
--                     and the table already serves itself via the
--                     existing /api/admin/* endpoints. When attachments
--                     grow we can flip to Supabase Storage + URLs in
--                     this same column without a schema change.
--   note_updated_by   email of the admin who last touched the note.
--                     Distinct from `updated_by` (state changes) so we
--                     can show "Note by X" attribution separately.
--   note_updated_at   timestamp of the last note write.

alter table public.question_overrides
  add column if not exists note              text,
  add column if not exists note_attachments  jsonb default '[]'::jsonb,
  add column if not exists note_updated_by   text,
  add column if not exists note_updated_at   timestamptz;

-- Index for the "every question with a note" listing endpoint.
create index if not exists question_overrides_has_note_idx
  on public.question_overrides ((note is not null and length(note) > 0));

-- Existing constraints on `state` shouldn't fire when only notes
-- change; if a row exists with no state (note-only), set state to
-- a placeholder. None of the API code does this today, but the
-- server-side upsert below uses `on conflict (question_id) do update`
-- so existing rows aren't affected.
