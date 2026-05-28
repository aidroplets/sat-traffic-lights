/**
 * Auth client.
 *
 * Two-mode design:
 *
 *   • DEMO mode (default, no backend env vars):
 *       - Sign-in flow simulates the magic-link cycle in localStorage.
 *       - The "magic link" is shown on-page (no email sent).
 *       - User records and tokens live per-browser only.
 *       - joshua@sortino.co is bootstrapped as admin.
 *
 *   • PROD mode (when /api/auth/me returns 200 instead of 404):
 *       - Real backend at /api/auth/* (see api/auth/*.js).
 *       - Server issues an HttpOnly signed cookie on verify.
 *       - Roles come from the server.
 *
 * The frontend treats both modes identically. The only difference is
 * where the data lives.
 *
 * Public surface:
 *   STL_AUTH.getCurrentUser()   -> { email, role, createdAt } | null
 *   STL_AUTH.isAdmin()          -> boolean
 *   STL_AUTH.requestMagicLink(email) -> { ok, devToken? }
 *   STL_AUTH.verifyToken(token) -> { ok, user? }
 *   STL_AUTH.signOut()          -> Promise<void>
 *   STL_AUTH.subscribe(fn)      -> unsubscribe fn (notified on auth changes)
 *   STL_AUTH.mode               -> 'demo' | 'prod' (set after probe)
 */
(function () {
  'use strict';

  // localStorage keys (demo mode)
  const SK_USERS    = 'stl_auth_users_v1';
  const SK_TOKENS   = 'stl_auth_tokens_v1';
  const SK_SESSION  = 'stl_auth_session_v1';

  // Bootstrap admin emails — anyone in this list gets role='admin' on
  // first sign-in. In prod mode this is mirrored by an admin_emails
  // table on the server (and ADMIN_EMAILS in api/_lib/auth.js).
  const BOOTSTRAP_ADMINS = [
    'joshua@sortino.co',
    'mweber0204@gmail.com',
  ];

  let mode = 'demo';
  let cachedUser = null;
  const subscribers = new Set();

  // ---- helpers ---------------------------------------------------------

  const safeJSON = (s, fallback) => {
    try { return JSON.parse(s); } catch (_) { return fallback; }
  };
  const readUsers   = () => safeJSON(localStorage.getItem(SK_USERS), {});
  const writeUsers  = (u) => localStorage.setItem(SK_USERS, JSON.stringify(u));
  const readTokens  = () => safeJSON(localStorage.getItem(SK_TOKENS), {});
  const writeTokens = (t) => localStorage.setItem(SK_TOKENS, JSON.stringify(t));
  const readSession = () => safeJSON(localStorage.getItem(SK_SESSION), null);
  const writeSession = (s) => {
    if (s) localStorage.setItem(SK_SESSION, JSON.stringify(s));
    else   localStorage.removeItem(SK_SESSION);
  };

  const normalizeEmail = (email) => String(email || '').trim().toLowerCase();
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));

  const randomToken = () =>
    'tk_' + Math.random().toString(36).slice(2, 10) +
    Math.random().toString(36).slice(2, 10);

  const notify = () => subscribers.forEach((fn) => { try { fn(cachedUser); } catch (_) {} });

  const setCurrentUser = (user) => {
    cachedUser = user;
    notify();
  };

  // ---- mode probe ------------------------------------------------------
  // On boot, hit /api/auth/me. If the endpoint returns a structured
  // response (200 with user, or 401), we're in prod mode. If 404 or
  // network error, fall back to demo mode.

  const probeMode = async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (res.status === 200) {
        const data = await res.json();
        mode = 'prod';
        if (data && data.user) setCurrentUser(data.user);
        return;
      }
      if (res.status === 401) {
        mode = 'prod';
        setCurrentUser(null);
        return;
      }
      // 404 / 500 → no backend; demo
      mode = 'demo';
    } catch (_) {
      mode = 'demo';
    }
    // Demo mode: hydrate user from localStorage session.
    if (mode === 'demo') {
      const session = readSession();
      if (session && session.email) {
        const users = readUsers();
        const u = users[session.email];
        if (u) setCurrentUser(u);
      }
    }
  };

  // ---- demo-mode operations -------------------------------------------

  const demoCreateOrGetUser = (email) => {
    const users = readUsers();
    const e = normalizeEmail(email);
    if (!users[e]) {
      users[e] = {
        email: e,
        role: BOOTSTRAP_ADMINS.includes(e) ? 'admin' : 'user',
        createdAt: new Date().toISOString(),
      };
      writeUsers(users);
    }
    return users[e];
  };

  const demoRequestMagicLink = (email) => {
    if (!isValidEmail(email)) return { ok: false, error: 'invalid-email' };
    const e = normalizeEmail(email);
    demoCreateOrGetUser(e);
    const tokens = readTokens();
    const tok = randomToken();
    tokens[tok] = { email: e, expiresAt: Date.now() + 15 * 60 * 1000, used: false };
    writeTokens(tokens);
    // Surface the link in the UI — there's no real email in demo mode.
    return { ok: true, devToken: tok, devLink: location.origin + location.pathname + '?login=' + tok };
  };

  const demoVerifyToken = (tok) => {
    const tokens = readTokens();
    const entry = tokens[tok];
    if (!entry) return { ok: false, error: 'unknown-token' };
    if (entry.used) return { ok: false, error: 'token-used' };
    if (Date.now() > entry.expiresAt) return { ok: false, error: 'token-expired' };
    entry.used = true;
    tokens[tok] = entry;
    writeTokens(tokens);
    const users = readUsers();
    const user = users[entry.email];
    if (!user) return { ok: false, error: 'user-missing' };
    user.lastLoginAt = new Date().toISOString();
    users[entry.email] = user;
    writeUsers(users);
    writeSession({ email: entry.email });
    setCurrentUser(user);
    return { ok: true, user };
  };

  const demoSignOut = () => {
    writeSession(null);
    setCurrentUser(null);
  };

  // ---- prod-mode operations -------------------------------------------

  const prodRequestMagicLink = async (email) => {
    if (!isValidEmail(email)) return { ok: false, error: 'invalid-email' };
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizeEmail(email) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { ok: false, error: data.error || 'request-failed' };
      }
      const data = await res.json();
      // Server may return devLink in non-production environments.
      return { ok: true, devLink: data.devLink || null };
    } catch (e) {
      return { ok: false, error: 'network-error' };
    }
  };

  const prodVerifyToken = async (tok) => {
    try {
      const res = await fetch('/api/auth/verify?token=' + encodeURIComponent(tok), {
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        return { ok: false, error: data.error || 'verify-failed' };
      }
      const data = await res.json();
      if (data && data.user) setCurrentUser(data.user);
      return { ok: true, user: data.user };
    } catch (e) {
      return { ok: false, error: 'network-error' };
    }
  };

  const prodSignOut = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    } catch (_) {}
    setCurrentUser(null);
  };

  // ---- public api ------------------------------------------------------

  const STL_AUTH = {
    get mode() { return mode; },
    getCurrentUser: () => cachedUser,
    isAdmin: () => !!(cachedUser && cachedUser.role === 'admin'),
    requestMagicLink: (email) =>
      mode === 'prod' ? prodRequestMagicLink(email) : Promise.resolve(demoRequestMagicLink(email)),
    verifyToken: (tok) =>
      mode === 'prod' ? prodVerifyToken(tok) : Promise.resolve(demoVerifyToken(tok)),
    signOut: () =>
      mode === 'prod' ? prodSignOut() : Promise.resolve(demoSignOut()),
    subscribe: (fn) => {
      subscribers.add(fn);
      // Fire immediately with current state so subscribers can render
      // without waiting for the next change.
      try { fn(cachedUser); } catch (_) {}
      return () => subscribers.delete(fn);
    },
    // Run once at boot. Returns a promise so callers can await.
    init: probeMode,
  };

  window.STL_AUTH = STL_AUTH;
})();
