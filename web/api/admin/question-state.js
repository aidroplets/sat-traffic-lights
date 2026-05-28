/**
 * PUT /api/admin/question-state?id=<qid>
 *
 * Lightweight state-only change. Replaces the legacy
 * `setQuestionState(qid, nextState)` localStorage write.
 *
 * Body:
 *   { state: 'live' | 'needs-review' | 'unpublished' | 'deleted' }
 *
 * Auth: admin session cookie required.
 *
 * Implementation: upserts the override row's `state` column. The bank
 * read endpoint merges base+override at read time, so the change shows
 * up on next /api/questions fetch.
 */
const { sendJson, sendError, requireAdmin, jsonBody, hasSupabase, getSupabase,
        ALLOWED_STATES } = require('../_lib/admin');

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    return sendError(res, 405, 'method not allowed');
  }
  if (!hasSupabase()) return sendError(res, 503, 'storage not configured');

  const url = new URL(req.url, 'http://localhost');
  const qid = String(url.searchParams.get('id') || '').trim();
  if (!qid) return sendError(res, 400, 'id required');

  try {
    const body = await jsonBody(req);
    const next = String(body && body.state || '').trim();
    if (!ALLOWED_STATES.has(next)) return sendError(res, 400, 'invalid state');

    const supa = await getSupabase();
    const { data, error } = await supa.from('question_overrides')
      .upsert({
        question_id: qid,
        state: next,
        updated_by: session.email,
      }, { onConflict: 'question_id' })
      .select().single();
    if (error) return sendError(res, 500, 'update failed: ' + error.message);
    return sendJson(res, 200, { ok: true, state: data.state });
  } catch (e) {
    return sendError(res, 500, 'unexpected: ' + (e && e.message ? e.message : String(e)));
  }
};
