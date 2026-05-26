/**
 * GET /api/auth/me  → return the current authenticated user (or 401).
 *
 * The frontend uses this endpoint as the "is the backend live?" probe.
 * Returning either 200 (with user) or 401 (no session) puts the auth
 * client into prod mode. A 404 / 500 / network error puts it into demo
 * mode (localStorage-backed).
 */
const auth = require('../_lib/auth.js');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method-not-allowed' });
    return;
  }
  const session = auth.readSessionCookie(req);
  if (!session) {
    res.status(401).json({ error: 'unauthenticated' });
    return;
  }
  try {
    const user = await auth.ensureUser(session.email);
    res.status(200).json({
      ok: true,
      user: { email: user.email, role: user.role, createdAt: user.createdAt || user.created_at },
    });
  } catch (e) {
    console.error('me error', e);
    res.status(500).json({ error: 'server-error' });
  }
};
