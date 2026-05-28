/**
 * GET  /api/attempts
 * POST /api/attempts
 *
 * Per-user attempt history. Replaces the `stl_attempts` localStorage
 * key with a server-backed list keyed by `attempts.user_id`.
 *
 *   GET   — returns the signed-in user's attempts, newest first
 *   POST  — upserts one attempt (idempotent on attempt id)
 *
 * Body for POST:
 *   {
 *     id:                string (client-generated UUID/ULID)
 *     testType:          'SAT' | 'ACT' | ...
 *     completedAt:       number (ms since epoch)
 *     totalElapsedMs?:   number
 *     targetScore?:      number
 *     answers:           [{ qid, selectedIndex|gridIn, correct, timeMs, ... }, ...]
 *     ...                everything else is stored alongside in data (JSONB blob)
 *   }
 *
 * Schema (001_init.sql): attempts has just id, user_id, email, data,
 * completed_at — everything else lives in the `data` JSONB blob. That's
 * intentional: the client already stores the full attempt as a blob in
 * localStorage, and this endpoint keeps the wire format identical.
 *
 * Auth: signed-in user (any role). Guests still write to localStorage;
 * the backfill script will replay them on first sign-in.
 */
const { sendJson, sendError, jsonBody, hasSupabase, getSupabase } = require('./_lib/admin');
const { readSessionCookie } = require('./_lib/auth');

async function userIdForEmail(supa, email) {
  const { data, error } = await supa.from('users').select('id').eq('email', email).maybeSingle();
  if (error) throw new Error('user lookup failed: ' + error.message);
  return data ? data.id : null;
}

module.exports = async (req, res) => {
  const session = readSessionCookie(req);
  if (!session || !session.email) return sendError(res, 401, 'unauthorized');
  if (!hasSupabase()) return sendError(res, 503, 'storage not configured');

  try {
    const supa = await getSupabase();
    const userId = await userIdForEmail(supa, session.email);
    if (!userId) return sendError(res, 403, 'user not provisioned');

    if (req.method === 'GET') {
      const { data, error } = await supa.from('attempts')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false })
        .limit(500);
      if (error) return sendError(res, 500, 'read failed: ' + error.message);
      const attempts = (data || []).map((row) => ({
        id: row.id,
        // Spread the blob so the client gets the exact shape it had in
        // localStorage. completed_at column is the source of truth for
        // ordering but the blob's completedAt should match.
        ...(row.data && typeof row.data === 'object' ? row.data : {}),
      }));
      res.setHeader('Cache-Control', 'no-store, private');
      return sendJson(res, 200, { attempts });
    }

    if (req.method === 'POST') {
      const body = await jsonBody(req);
      if (!body || typeof body !== 'object') return sendError(res, 400, 'body must be object');
      if (!body.id) return sendError(res, 400, 'id required');
      if (!body.completedAt) return sendError(res, 400, 'completedAt required');

      const completedIso = new Date(Number(body.completedAt)).toISOString();
      const { error } = await supa.from('attempts')
        .upsert({
          id: body.id,
          user_id: userId,
          email: session.email,
          completed_at: completedIso,
          data: body,
        }, { onConflict: 'id' });
      if (error) return sendError(res, 500, 'save failed: ' + error.message);

      return sendJson(res, 200, { ok: true, id: body.id });
    }

    res.setHeader('Allow', 'GET, POST');
    return sendError(res, 405, 'method not allowed');
  } catch (e) {
    return sendError(res, 500, 'unexpected: ' + (e && e.message ? e.message : String(e)));
  }
};
