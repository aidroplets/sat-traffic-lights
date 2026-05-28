/**
 * GET /api/admin/notes
 *
 * Returns every question_overrides row with a non-empty note OR at
 * least one attachment. Used by the "pull all questions with notes"
 * workflow — gives Claude (or any admin) one round-trip to see every
 * annotation in the bank.
 *
 * Response (200):
 *   {
 *     count: number,
 *     notes: [
 *       { qid, note, noteAttachments, updatedBy, updatedAt },
 *       ...
 *     ]
 *   }
 *
 * Auth: admin session cookie required.
 *
 * Errors:
 *   401 { error: 'unauthorized' }
 *   403 { error: 'admin only' }
 *   503 { error: 'storage not configured' }   // hasSupabase=false in prod
 */
const { readSessionCookie, ADMIN_EMAILS, hasSupabase, getSupabase } = require('../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const session = readSessionCookie(req);
  if (!session || !session.email) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ error: 'unauthorized' }));
  }
  if (!ADMIN_EMAILS.has(session.email)) {
    res.statusCode = 403;
    return res.end(JSON.stringify({ error: 'admin only' }));
  }

  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    return res.end(JSON.stringify({ error: 'method not allowed' }));
  }

  // Optional ?ids=q-x,q-y — narrows the result to a specific set so
  // the review-card render can fetch in batch without pulling the
  // entire bank's notes.
  const url = new URL(req.url, 'http://localhost');
  const idsParam = url.searchParams.get('ids');
  const idFilter = idsParam ? idsParam.split(',').map((s) => s.trim()).filter(Boolean) : null;

  if (!hasSupabase()) {
    if (process.env.VERCEL_ENV === 'production') {
      res.statusCode = 503;
      return res.end(JSON.stringify({ error: 'storage not configured' }));
    }
    // Dev fallback: there's no shared in-memory across cold starts, so
    // just return an empty list. Notes endpoint's in-memory cache is
    // per-instance.
    res.statusCode = 200;
    return res.end(JSON.stringify({ count: 0, notes: [] }));
  }

  try {
    const supa = await getSupabase();
    let q = supa.from('question_overrides')
      .select('question_id, note, note_attachments, note_updated_by, note_updated_at, updated_by')
      .or('note.not.is.null,note_attachments.neq.[]')
      .order('note_updated_at', { ascending: false });
    if (idFilter && idFilter.length > 0) {
      q = q.in('question_id', idFilter);
    }
    const { data, error } = await q;
    if (error) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: 'db read failed: ' + error.message }));
    }
    const notes = (data || [])
      .filter((row) => (row.note && row.note.trim()) || (Array.isArray(row.note_attachments) && row.note_attachments.length > 0))
      .map((row) => ({
        qid: row.question_id,
        note: row.note || '',
        noteAttachments: (row.note_attachments || []).map((a) => ({
          name: a.name || 'attachment',
          mime: a.mime || 'image/png',
          dataUrl: a.data_url || '',
          addedAt: a.added_at || 0,
        })),
        updatedBy: row.note_updated_by || row.updated_by || null,
        updatedAt: row.note_updated_at ? new Date(row.note_updated_at).getTime() : null,
      }));
    res.statusCode = 200;
    return res.end(JSON.stringify({ count: notes.length, notes }));
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'unexpected: ' + (e && e.message ? e.message : String(e)) }));
  }
};
