/**
 * POST /api/auth/login  → request a magic link.
 * Body: { email }
 *
 * Returns: { ok: true, devLink? }
 *   - In production with email service configured, devLink is omitted
 *     and the link arrives via email.
 *   - In dev / preview without RESEND_API_KEY, devLink is included so
 *     the user can self-serve.
 */
const auth = require('../_lib/auth.js');

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e || '').trim());

// Rate-limit per email. Backed by an in-memory map per serverless
// instance — cold starts reset it, which is fine in practice.
//
// Limits:
//   • Cooldown    — at most one send per LOGIN_COOLDOWN_MS per email
//   • Hourly cap  — at most LOGIN_HOURLY_MAX sends in a rolling hour
//
// Throttled requests respond with { ok: true } anyway (silent
// success), so an attacker can't enumerate which emails recently
// requested a link. The on-screen 30s cooldown reinforces patience
// without leaking server state.
const LOGIN_COOLDOWN_MS = 30 * 1000;
const LOGIN_HOURLY_MAX  = 5;
const LOGIN_HOUR_MS     = 60 * 60 * 1000;
const sendHistory = new Map();

function isThrottled(email) {
  const now = Date.now();
  const arr = (sendHistory.get(email) || []).filter((t) => now - t < LOGIN_HOUR_MS);
  if (arr.length === 0) return false;
  if (now - arr[arr.length - 1] < LOGIN_COOLDOWN_MS) return true;
  if (arr.length >= LOGIN_HOURLY_MAX) return true;
  return false;
}
function recordSend(email) {
  const now = Date.now();
  const arr = (sendHistory.get(email) || []).filter((t) => now - t < LOGIN_HOUR_MS);
  arr.push(now);
  sendHistory.set(email, arr);
}

async function maybeSendEmail(email, link) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[magic-link] RESEND_API_KEY not set — falling back to devLink');
    return { sent: false, reason: 'no-api-key' };
  }
  const from = process.env.AUTH_FROM_EMAIL || 'noreply@studysignal.ai';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: email,
        subject: 'Your Study Signal sign-in link',
        text: 'Click to sign in: ' + link + '\n\nThis link expires in 15 minutes.',
        html: `<p>Click to sign in: <a href="${link}">${link}</a></p><p>This link expires in 15 minutes.</p>`,
      }),
    });
    const bodyText = await res.text().catch(() => '');
    // Log every send outcome — success or failure — so Vercel's
    // function logs become diagnostic. Resend returns 200 with a
    // message id on accept; bad domain / sandbox restriction returns
    // 4xx with an error reason. Either way we want it visible.
    if (res.ok) {
      console.log('[magic-link] sent', { to: email, from, status: res.status, body: bodyText.slice(0, 300) });
      return { sent: true };
    } else {
      console.error('[magic-link] Resend rejected', { to: email, from, status: res.status, body: bodyText.slice(0, 500) });
      return { sent: false, reason: 'resend-rejected', status: res.status };
    }
  } catch (e) {
    console.error('[magic-link] fetch threw', { to: email, from, message: e && e.message });
    return { sent: false, reason: 'fetch-threw' };
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method-not-allowed' });
    return;
  }
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (_) { body = {}; }
  }
  const email = body && body.email;
  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'invalid-email' });
    return;
  }
  const normalized = String(email).trim().toLowerCase();
  // Silent success on throttled requests. The frontend already shows
  // the same "we sent it" state and a 30s cooldown — no need to leak
  // throttle state here.
  if (isThrottled(normalized)) {
    res.status(200).json({ ok: true, throttled: true });
    return;
  }
  try {
    await auth.ensureUser(normalized);
    const tok = await auth.createMagicToken(normalized);
    const origin = req.headers.origin || ('https://' + (req.headers.host || 'localhost'));
    const link = origin + '/?login=' + encodeURIComponent(tok);
    const { sent } = await maybeSendEmail(normalized, link);
    recordSend(normalized);
    // Surface the dev link only when email actually failed (so a
    // user can still sign in if Resend is misconfigured), or in
    // non-production environments for local testing.
    const showDevLink = !sent || process.env.VERCEL_ENV !== 'production';
    res.status(200).json({ ok: true, devLink: showDevLink ? link : null });
  } catch (e) {
    console.error('login error', e);
    res.status(500).json({ error: 'server-error' });
  }
};
