# Backend setup — Study Signal

Goal: turn the demo-mode auth + admin into a real production system in ~10 minutes of clicking. After this is done, the app uses real magic-link emails, real Postgres, real role-based access — no code changes required.

## What you'll set up

- **Supabase** — Postgres + table editor (free tier handles us forever for v1)
- **Resend** — email delivery for the magic links (free 3,000/month)
- **Vercel env vars** — wire it together

The auth API at `api/auth/*.js` already detects whether these env vars exist. Without them, the app stays in demo mode (per-browser localStorage). With them, it transparently becomes a real backend.

## 1. Supabase project (5 min)

1. Sign up at <https://supabase.com> with `joshua@sortino.co`
2. New project → name `studysignal`, set a strong DB password (save it somewhere; you won't need it day-to-day, the connection uses keys)
3. Pick the region closest to you / Vercel's edge (`us-east-1` is a safe default for `iad1`)
4. Wait ~2 minutes for the project to provision
5. **Settings → API** — copy these two values:
   - `Project URL`  →  becomes `SUPABASE_URL`
   - `service_role` secret  →  becomes `SUPABASE_SERVICE_ROLE_KEY`
   - **DO NOT use the `anon` key for the API — we need service role to bypass RLS for auth bookkeeping**
6. **SQL Editor** → paste the contents of `db/001_initial_schema.sql` → Run. This creates `users`, `magic_tokens`, `attempts`, `attempt_answers`, `question_overrides` tables, plus the RLS lock and the seed admin row for `joshua@sortino.co`.

## 2. Resend (3 min)

1. Sign up at <https://resend.com> with `joshua@sortino.co`
2. **API Keys** → Create API Key → copy the value (becomes `RESEND_API_KEY`)
3. **Domains** → Add Domain → `studysignal.ai`
   - Resend will give you DNS records (SPF + DKIM + DMARC). Add them at Hover (same DNS panel where you added the Vercel A records earlier).
   - Wait for verification (usually 5-15 minutes for `.ai` at Hover)
4. From email: `noreply@studysignal.ai` once the domain is verified. Until then, you can use `onboarding@resend.dev` (Resend's sandbox sender) for testing — it only delivers to your verified email, but that's fine for the admin-only phase.

## 3. Vercel env vars (2 min)

In the Vercel dashboard for `aidroplets-sat-traffic-lights`:

**Settings → Environment Variables**

| Key | Value | Environments |
|---|---|---|
| `SUPABASE_URL` | (from step 1.5) | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | (from step 1.5) | Production, Preview, Development |
| `RESEND_API_KEY` | (from step 2.2) | Production, Preview |
| `AUTH_FROM_EMAIL` | `noreply@studysignal.ai` (or `onboarding@resend.dev` while domain verifies) | Production, Preview |
| `AUTH_JWT_SECRET` | a random ≥32-char string. Generate one: `openssl rand -hex 32` | Production, Preview, Development |

Hit **Save** — Vercel will offer to redeploy. Accept.

## 4. Add `@supabase/supabase-js` as a dependency

The serverless functions need the Supabase client. From the droplet directory:

```bash
cd droplets/sat-traffic-lights
npm init -y
npm install @supabase/supabase-js
```

This creates `package.json` + `node_modules/`. Vercel installs deps automatically on deploy. Commit the resulting `package.json` and `package-lock.json` (the `.gitignore` already excludes `node_modules`).

## 5. Verify

After Vercel redeploys with the env vars set:

1. Hit <https://studysignal.ai/?admin=1>. You'll be redirected to the login screen.
2. Enter `joshua@sortino.co` → Send magic link.
3. Check your email (or the dev link if Resend isn't fully configured yet).
4. Click the link → you should land on the admin dashboard with the **Admin** role badge in the header.
5. Open the **Network** tab in DevTools — `/api/auth/me` should return 200 with your user; that proves prod mode is active.

If anything breaks, the API logs in Vercel's **Functions** tab will tell you what's wrong (most often: missing env var, or RLS blocking a query because we used the anon key by accident).

## Architecture notes

- **JWT in HttpOnly cookie**, signed with `AUTH_JWT_SECRET`. 30-day expiry. The cookie is `Secure` in production, `Lax` SameSite. It's set on `/`, scoped to the domain.
- **Magic tokens** are 32 hex chars, stored in `magic_tokens` with a 15-minute TTL. Single-use (`used_at` is set when consumed).
- **Roles**: stored on the `users` row. `joshua@sortino.co` is auto-promoted to admin on first sign-in (via the `ADMIN_EMAILS` set in `api/_lib/auth.js`). To add more admins later, either edit that file or update the row directly in Supabase.
- **No anon Supabase access** — the API layer is the only thing talking to Supabase, using the service role key. Browsers never see the service role.
- **Demo fallback** stays in the codebase. Useful when developing locally without a backend, or if Supabase ever goes down — the auth gracefully degrades to localStorage instead of erroring.

## Future extensions

- **Regular user signup**: already works in demo mode. To enable in prod, just expose the login screen from the score screen too (currently it's accessible via the header **Sign in** button).
- **Question state sync**: the `question_overrides` table is ready. The admin tool currently writes to localStorage; add a `POST /api/admin/override` endpoint that mirrors writes to the table (and an admin-only guard).
- **Cross-device attempt history**: the `attempts` + `attempt_answers` tables are ready. Add a `POST /api/attempts` that's called from `saveAttempt()` and a `GET /api/attempts` that hydrates the history list.
- **Admin allowlist editor**: currently hardcoded in `_lib/auth.js`. To make it dynamic, add an `admin_emails` table and read from it in `ensureUser`.
