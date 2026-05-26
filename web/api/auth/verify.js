/**
 * GET /api/auth/verify?token=...  → consume a magic token, set session.
 * Returns: { ok, user }  on success (and sets the stl_session cookie)
 *          { error }     on failure
 */
const auth = require('../_lib/auth.js');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method-not-allowed' });
    return;
  }
  const tok = (req.query && req.query.token) || '';
  if (!tok) {
    res.status(400).json({ error: 'missing-token' });
    return;
  }
  try {
    const email = await auth.consumeMagicToken(tok);
    if (!email) {
      res.status(401).json({ error: 'invalid-or-expired' });
      return;
    }
    const user = await auth.ensureUser(email);
    await auth.touchLastLogin(email);
    auth.setSessionCookie(res, email);
    res.status(200).json({
      ok: true,
      user: { email: user.email, role: user.role, createdAt: user.createdAt || user.created_at },
    });
  } catch (e) {
    console.error('verify error', e);
    res.status(500).json({ error: 'server-error' });
  }
};
