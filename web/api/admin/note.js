/**
 * /api/admin/note?qid=<question-id>
 *
 * Server-side admin note for a single question. Admins write notes
 * via the review modal; this endpoint persists them to the shared
 * question_overrides table so every admin sees the same notes.
 *
 *   GET  ?qid=<id>             → { qid, note, noteAttachments, updatedBy, updatedAt }
 *   PUT  ?qid=<id>  body={...} → 200 { ok: true } on upsert
 *   DELETE ?qid=<id>           → 200 { ok: true } clears note + attachments
 *
 * Body for PUT (JSON):
 *   {
 *     note: string | null,
 *     noteAttachments: [
 *       { name: string, mime: 'image/png'|'image/jpeg'|..., dataUrl: 'data:image/...;base64,...' },
 *       ...
 *     ]
 *   }
 *
 * Auth: admin session cookie required. Without Supabase env vars
 * configured, the endpoint falls back to a process-local in-memory
 * cache so the wire flow works in dev — but writes don't survive a
 * cold start. Production MUST have SUPABASE_URL +
 * SUPABASE_SERVICE_ROLE_KEY set (and the 002_notes.sql migration
 * applied to the Claude database).
 *
 * Responses:
 *   200  { qid, note, noteAttachments, updatedBy, updatedAt }
 *   400  { error: 'qid required' | 'invalid body' | 'attachment too large' }
 *   401  { error: 'unauthorized' }
 *   403  { error: 'admin only' }
 *   503  { error: 'storage not configured' }   // hasSupabase=false in prod
 */
const { readSessionCookie, ADMIN_EMAILS, hasSupabase, getSupabase } = require('../_lib/auth');

// Per-attachment soft cap: ~2 MB after base64 → ~2.7 MB on the wire.
// The frontend already compresses to ≤2 MB before sending, but we
// enforce again here so a forged client can't blow up the row.
const MAX_ATTACHMENT_BYTES = 2 * 1024 * 1024;
const MAX_ATTACHMENTS_PER_NOTE = 20;
// Allowed image MIMEs — JSON-injection-safe; matches the client's
// readImageAsCompressedDataUrl output set.
const ALLOWED_MIMES = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);

// Dev fallback — process-local Map keyed by qid. Resets on cold start.
// Mirrors the same shape as the Supabase row so the response is
// identical regardless of backend.
const dev = new Map();

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      // Hard wire cap: 30 MB raw to allow up to ~20 attachments × ~1.5 MB
      // base64-encoded each, plus headroom for the text note + envelope.
      if (data.length > 30 * 1024 * 1024) req.destroy();
    });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

// Validate one attachment payload from the request body. Returns a
// sanitized object suitable for storage, or throws with a 400-ready msg.
function validateAttachment(a, i) {
  if (!a || typeof a !== 'object') throw new Error('attachments[' + i + '] not an object');
  const mime = String(a.mime || '').toLowerCase();
  if (!ALLOWED_MIMES.has(mime)) throw new Error('attachments[' + i + '] disallowed mime: ' + mime);
  const dataUrl = String(a.dataUrl || '');
  if (!dataUrl.startsWith('data:' + mime + ';base64,')) {
    throw new Error('attachments[' + i + '] dataUrl prefix mismatch');
  }
  // Approximate decoded size: base64 chars * 3/4. Faster than decoding.
  const b64 = dataUrl.slice(('data:' + mime + ';base64,').length);
  const approxBytes = Math.floor(b64.length * 3 / 4);
  if (approxBytes > MAX_ATTACHMENT_BYTES) {
    throw new Error('attachments[' + i + '] too large (' + Math.round(approxBytes/1024) + 'KB)');
  }
  return {
    name: String(a.name || 'attachment').slice(0, 200),
    mime,
    data_url: dataUrl,
    added_at: a.addedAt ? Number(a.addedAt) : Date.now(),
  };
}

// Convert a Supabase row (snake_case) into the client-facing shape.
function rowToPayload(row) {
  if (!row) return null;
  const att = Array.isArray(row.note_attachments) ? row.note_attachments : [];
  return {
    qid: row.question_id,
    note: row.note || '',
    noteAttachments: att.map((a) => ({
      name: a.name || 'attachment',
      mime: a.mime || 'image/png',
      dataUrl: a.data_url || '',
      addedAt: a.added_at || 0,
    })),
    updatedBy: row.note_updated_by || row.updated_by || null,
    updatedAt: row.note_updated_at ? new Date(row.note_updated_at).getTime() : null,
  };
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // ---- Auth ----
  const session = readSessionCookie(req);
  if (!session || !session.email) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ error: 'unauthorized' }));
  }
  if (!ADMIN_EMAILS.has(session.email)) {
    res.statusCode = 403;
    return res.end(JSON.stringify({ error: 'admin only' }));
  }

  // ---- qid ----
  const url = new URL(req.url, 'http://localhost');
  const qid = String(url.searchParams.get('qid') || '').trim();
  if (!qid) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'qid required' }));
  }

  // ---- Backend pick ----
  // Production REQUIRES Supabase; dev falls back to in-memory so the
  // wire works locally without DB. The frontend cache layer (see
  // localStorage shadow) covers the dev cold-start reset.
  const usingSupabase = hasSupabase();
  if (process.env.VERCEL_ENV === 'production' && !usingSupabase) {
    res.statusCode = 503;
    return res.end(JSON.stringify({ error: 'storage not configured' }));
  }

  try {
    if (req.method === 'GET') {
      if (usingSupabase) {
        const supa = await getSupabase();
        const { data, error } = await supa.from('question_overrides')
          .select('question_id, note, note_attachments, note_updated_by, note_updated_at, updated_by')
          .eq('question_id', qid).maybeSingle();
        if (error) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: 'db read failed: ' + error.message }));
        }
        const payload = rowToPayload(data) || { qid, note: '', noteAttachments: [], updatedBy: null, updatedAt: null };
        res.statusCode = 200;
        return res.end(JSON.stringify(payload));
      }
      // dev fallback
      const row = dev.get(qid);
      const payload = row || { qid, note: '', noteAttachments: [], updatedBy: null, updatedAt: null };
      res.statusCode = 200;
      return res.end(JSON.stringify(payload));
    }

    if (req.method === 'PUT') {
      const body = await readBody(req);
      const rawNote = body && typeof body.note === 'string' ? body.note : '';
      const note = rawNote.length > 50000 ? rawNote.slice(0, 50000) : rawNote;
      const rawAtt = Array.isArray(body && body.noteAttachments) ? body.noteAttachments : [];
      if (rawAtt.length > MAX_ATTACHMENTS_PER_NOTE) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: 'too many attachments (max ' + MAX_ATTACHMENTS_PER_NOTE + ')' }));
      }
      let validated;
      try { validated = rawAtt.map(validateAttachment); }
      catch (e) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ error: e.message }));
      }
      const nowIso = new Date().toISOString();

      if (usingSupabase) {
        const supa = await getSupabase();
        const { data, error } = await supa.from('question_overrides')
          .upsert({
            question_id: qid,
            note,
            note_attachments: validated,
            note_updated_by: session.email,
            note_updated_at: nowIso,
          }, { onConflict: 'question_id' })
          .select().single();
        if (error) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: 'db write failed: ' + error.message }));
        }
        res.statusCode = 200;
        return res.end(JSON.stringify(rowToPayload(data)));
      }
      // dev fallback
      const row = {
        qid,
        note,
        noteAttachments: validated.map((a) => ({
          name: a.name, mime: a.mime, dataUrl: a.data_url, addedAt: a.added_at,
        })),
        updatedBy: session.email,
        updatedAt: Date.now(),
      };
      dev.set(qid, row);
      res.statusCode = 200;
      return res.end(JSON.stringify(row));
    }

    if (req.method === 'DELETE') {
      const nowIso = new Date().toISOString();
      if (usingSupabase) {
        const supa = await getSupabase();
        const { error } = await supa.from('question_overrides')
          .upsert({
            question_id: qid,
            note: null,
            note_attachments: [],
            note_updated_by: session.email,
            note_updated_at: nowIso,
          }, { onConflict: 'question_id' });
        if (error) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: 'db delete failed: ' + error.message }));
        }
      } else {
        dev.delete(qid);
      }
      res.statusCode = 200;
      return res.end(JSON.stringify({ ok: true }));
    }

    res.statusCode = 405;
    res.setHeader('Allow', 'GET, PUT, DELETE');
    return res.end(JSON.stringify({ error: 'method not allowed' }));
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'unexpected: ' + (e && e.message ? e.message : String(e)) }));
  }
};
