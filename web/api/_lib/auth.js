/**
 * Server-side auth helpers, shared across /api/auth/* functions.
 *
 * Two backends, picked by env-var presence:
 *   • Supabase (preferred) — when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set
 *   • In-memory dev store — fallback so the functions still work locally
 *     without external services. Resets every cold start, but lets us
 *     validate the wiring end-to-end.
 *
 * Sessions are signed JWTs in an HttpOnly cookie. We sign with the
 * AUTH_JWT_SECRET env var (any random ≥32-char string).
 */
const crypto = require('crypto');

// Admin allowlist. Mirrors BOOTSTRAP_ADMINS in auth.js (frontend
// demo-mode equivalent). When Supabase is wired up, this should
// migrate to an admin_emails table for runtime editability without
// a redeploy. For now: edit here + redeploy to add an admin.
const ADMIN_EMAILS = new Set([
  'joshua@sortino.co',
  'mweber0204@gmail.com',
]);

const COOKIE_NAME = 'stl_session';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;   // 30 days
const TOKEN_TTL_MS   = 15 * 60 * 1000;             // 15 minutes

const hasSupabase = () =>
  !!(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

// ---- minimal JWT (HS256) — no external deps ----
const b64url = (buf) => Buffer.from(buf).toString('base64')
  .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlJSON = (obj) => b64url(JSON.stringify(obj));
const fromB64url = (s) => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

function getSecret() {
  const s = process.env.AUTH_JWT_SECRET;
  if (!s || s.length < 32) {
    // In production we refuse to sign with a known-public fallback —
    // anyone reading the public GitHub mirror could forge admin sessions.
    // The dev fallback is only allowed outside of Vercel's production env.
    if (process.env.VERCEL_ENV === 'production') {
      throw new Error('AUTH_JWT_SECRET is required (>=32 chars) in production');
    }
    console.warn('[auth] AUTH_JWT_SECRET missing or short — using DEV fallback. Do NOT use in production.');
    return 'dev-secret-change-me-' + 'x'.repeat(20);
  }
  return s;
}

function signJWT(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const data = b64urlJSON(header) + '.' + b64urlJSON(payload);
  const sig = b64url(crypto.createHmac('sha256', getSecret()).update(data).digest());
  return data + '.' + sig;
}
function verifyJWT(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [h, p, s] = parts;
  const expected = b64url(crypto.createHmac('sha256', getSecret()).update(h + '.' + p).digest());
  if (s !== expected) return null;
  try {
    const payload = JSON.parse(fromB64url(p).toString());
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (_) { return null; }
}

function setSessionCookie(res, email) {
  const token = signJWT({
    email,
    iat: Date.now(),
    exp: Date.now() + SESSION_TTL_MS,
  });
  const isProd = process.env.VERCEL_ENV === 'production';
  const cookie = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    isProd ? 'Secure' : '',
    `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`,
  ].filter(Boolean).join('; ');
  res.setHeader('Set-Cookie', cookie);
}
function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0`);
}
function readSessionCookie(req) {
  const raw = (req.headers.cookie || '').split(';').map((s) => s.trim());
  const m = raw.find((s) => s.startsWith(COOKIE_NAME + '='));
  if (!m) return null;
  return verifyJWT(m.slice(COOKIE_NAME.length + 1));
}

// ---- in-memory dev store (process-local) ----
// This module is imported by every function instance. In Vercel
// serverless, instances are short-lived, so the store resets on cold
// starts. Good enough to validate the auth flow without a database.
const dev = {
  users: new Map(),     // email -> { email, role, createdAt, lastLoginAt }
  tokens: new Map(),    // tok   -> { email, expiresAt, used }
};

async function ensureUser(email) {
  const e = String(email).trim().toLowerCase();
  if (hasSupabase()) {
    const supa = await getSupabase();
    const { data: existing } = await supa.from('users').select('*').eq('email', e).maybeSingle();
    if (existing) return existing;
    const role = ADMIN_EMAILS.has(e) ? 'admin' : 'user';
    const { data: created } = await supa.from('users')
      .insert({ email: e, role, created_at: new Date().toISOString() })
      .select().single();
    return created;
  }
  // dev fallback
  if (!dev.users.has(e)) {
    dev.users.set(e, {
      email: e,
      role: ADMIN_EMAILS.has(e) ? 'admin' : 'user',
      createdAt: new Date().toISOString(),
    });
  }
  return dev.users.get(e);
}

// Magic tokens are self-contained signed JWTs with the recipient's
// email and a 15-min expiry. Verification is stateless — no shared
// store needed — which is critical because Vercel serverless
// functions are stateless across instances. (Previously used an
// in-memory map; the click would land on a different instance and
// the token wouldn't be found → "invalid or expired" errors.)
//
// Tradeoff: tokens are NOT single-use within their 15-min window.
// Acceptable for an email magic link with this short an expiry —
// the threat model already assumes inbox access, and the session
// cookie issued on first verify is HttpOnly + signed.
//
// When Supabase is wired up later we can layer a "tokens used"
// table on top to enforce single-use without changing the wire
// format. The dev in-memory `tokens` map is left in place but no
// longer touched.
async function createMagicToken(email) {
  const e = String(email).trim().toLowerCase();
  return signJWT({
    email: e,
    purpose: 'magic',
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS,
  });
}

async function consumeMagicToken(tok) {
  const payload = verifyJWT(tok);
  if (!payload) return null;
  if (payload.purpose !== 'magic') return null;
  if (!payload.email) return null;
  return payload.email;
}

async function touchLastLogin(email) {
  const e = String(email).trim().toLowerCase();
  if (hasSupabase()) {
    const supa = await getSupabase();
    await supa.from('users').update({ last_login_at: new Date().toISOString() }).eq('email', e);
    return;
  }
  const u = dev.users.get(e);
  if (u) { u.lastLoginAt = new Date().toISOString(); dev.users.set(e, u); }
}

// ---- Supabase client (lazy) ----
let _supabase = null;
async function getSupabase() {
  if (_supabase) return _supabase;
  // Use dynamic import so Vercel doesn't require @supabase/supabase-js
  // when the env vars aren't set (dev fallback path).
  const mod = await import('@supabase/supabase-js');
  _supabase = mod.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _supabase;
}

module.exports = {
  ADMIN_EMAILS,
  hasSupabase,
  setSessionCookie,
  clearSessionCookie,
  readSessionCookie,
  ensureUser,
  createMagicToken,
  consumeMagicToken,
  touchLastLogin,
  // Exported for endpoints that need direct Supabase access (notes,
  // attachments, future override sync, etc.). Returns the lazy
  // singleton client. Callers must `await` and check hasSupabase()
  // first to avoid throwing on dev/local without env vars.
  getSupabase,
};
