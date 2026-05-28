/**
 * POST /api/auth/logout  → clear the session cookie.
 */
const auth = require('../_lib/auth.js');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method-not-allowed' });
    return;
  }
  auth.clearSessionCookie(res);
  res.status(200).json({ ok: true });
};
