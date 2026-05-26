/**
 * POST   /api/admin/question        — create a new question (admin-added)
 * PUT    /api/admin/question?id=X   — full edit (writes override row)
 * DELETE /api/admin/question?id=X   — soft-delete (sets state='deleted' via override)
 *
 * Body (POST/PUT, JSON):
 *   {
 *     id?         — server generates `q-a-<ts>-<rand>` for POST if omitted
 *     testType    — 'SAT' | 'ACT' | ...
 *     section     — 'math' | 'reading-writing' | ...
 *     topic?      — string
 *     difficulty? — int (any test scale; questions table validates 1..800)
 *     state?      — 'live' | 'needs-review' | 'unpublished' | 'deleted' (default 'live')
 *     source?     — 'human-curated' | 'ai-generated' (default 'human-curated')
 *     stem        — required (string)
 *     choices?    — array of strings; omit for SPR (grid-in)
 *     answer      — required (int for MCQ, string for SPR)
 *     explanation?— string
 *     passage?    — string
 *     table?      — object (markdown-table figure)
 *     svg?        — string (inline figure)
 *     importId?   — text reference to imports.id
 *     metadata?   — object (free-form extras)
 *   }
 *
 * Auth: admin session cookie required.
 *
 * For POST: inserts into `questions` directly so the row is canonical.
 * For PUT: writes to `question_overrides` so the original `questions`
 *           row stays untouched (preserves the import roundtrip).
 * For DELETE: writes state='deleted' to overrides (soft).
 */
const { sendJson, sendError, requireAdmin, jsonBody, hasSupabase, getSupabase,
        ALLOWED_STATES, ALLOWED_SOURCES } = require('../_lib/admin');

const KNOWN_KEYS = new Set([
  'id', 'sourceId', 'testType', 'section', 'topic', 'difficulty',
  'state', 'source', 'stem', 'choices', 'answer', 'explanation',
  'passage', 'table', 'svg', 'uploader', 'reviewStatus', 'importId',
]);

function validateForInsert(body) {
  if (!body || typeof body !== 'object') throw new Error('body must be object');
  if (!body.testType) throw new Error('testType required');
  if (!body.section)  throw new Error('section required');
  if (typeof body.stem !== 'string' || !body.stem.trim()) throw new Error('stem required');
  if (body.answer == null) throw new Error('answer required');
  if (body.state && !ALLOWED_STATES.has(body.state)) throw new Error('invalid state');
  if (body.source && !ALLOWED_SOURCES.has(body.source)) throw new Error('invalid source');
}

// Generate a unique id for admin-added questions. The legacy app.js
// used `q-a-${ts}-${rand}`; keep that prefix so the existing
// "Admin added" filter in the admin tab still works.
function newId() {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `q-a-${ts}-${rand}`;
}

// Shape body (camelCase) → questions row (snake_case + metadata bag).
function bodyToRow(body, defaultId) {
  const id = body.id || defaultId || newId();
  const metadata = {};
  for (const k of Object.keys(body)) {
    if (!KNOWN_KEYS.has(k)) metadata[k] = body[k];
  }
  // Caller may pass an explicit metadata object — merge it.
  if (body.metadata && typeof body.metadata === 'object') {
    Object.assign(metadata, body.metadata);
    delete metadata.metadata;
  }
  return {
    id,
    source_id:     body.sourceId || null,
    test_type:     body.testType,
    section:       body.section,
    topic:         body.topic || null,
    difficulty:    Number.isFinite(body.difficulty) ? body.difficulty : null,
    state:         body.state || 'live',
    source:        body.source || 'human-curated',
    stem:          body.stem,
    choices:       Array.isArray(body.choices) && body.choices.length > 0 ? body.choices : null,
    answer:        body.answer,
    explanation:   body.explanation || null,
    passage:       body.passage || null,
    table_data:    body.table || null,
    svg:           body.svg || null,
    uploader:      body.uploader || null,
    review_status: body.reviewStatus || null,
    import_id:     body.importId || null,
    metadata,
  };
}

// PUT writes to question_overrides. Only fields the admin actually
// changed should be set; nulls are meaningful (means "revert to base")
// so we let the caller pass null explicitly.
function bodyToOverride(body, qid, email) {
  const ovr = { question_id: qid, updated_by: email };
  if ('state'       in body) ovr.state       = body.state;
  if ('stem'        in body) ovr.stem        = body.stem;
  if ('choices'     in body) ovr.choices     = body.choices;
  if ('answer'      in body) ovr.answer      = body.answer;
  if ('explanation' in body) ovr.explanation = body.explanation;
  if ('topic'       in body) ovr.topic       = body.topic;
  if ('difficulty'  in body) ovr.difficulty  = body.difficulty;
  return ovr;
}

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (!hasSupabase()) return sendError(res, 503, 'storage not configured');

  const url = new URL(req.url, 'http://localhost');
  const qid = String(url.searchParams.get('id') || '').trim();

  try {
    const supa = await getSupabase();

    if (req.method === 'POST') {
      const body = await jsonBody(req);
      try { validateForInsert(body); }
      catch (e) { return sendError(res, 400, e.message); }
      const row = bodyToRow(body, qid || null);
      const { data, error } = await supa.from('questions')
        .upsert(row, { onConflict: 'id' })
        .select().single();
      if (error) return sendError(res, 500, 'insert failed: ' + error.message);
      return sendJson(res, 201, { id: data.id, question: data });
    }

    if (req.method === 'PUT') {
      if (!qid) return sendError(res, 400, 'id required');
      const body = await jsonBody(req);
      if (body.state && !ALLOWED_STATES.has(body.state)) return sendError(res, 400, 'invalid state');
      const ovr = bodyToOverride(body, qid, session.email);
      const { data, error } = await supa.from('question_overrides')
        .upsert(ovr, { onConflict: 'question_id' })
        .select().single();
      if (error) return sendError(res, 500, 'update failed: ' + error.message);
      return sendJson(res, 200, { ok: true, override: data });
    }

    if (req.method === 'DELETE') {
      if (!qid) return sendError(res, 400, 'id required');
      const { error } = await supa.from('question_overrides')
        .upsert({ question_id: qid, state: 'deleted', updated_by: session.email },
                { onConflict: 'question_id' });
      if (error) return sendError(res, 500, 'delete failed: ' + error.message);
      return sendJson(res, 200, { ok: true });
    }

    res.setHeader('Allow', 'POST, PUT, DELETE');
    return sendError(res, 405, 'method not allowed');
  } catch (e) {
    return sendError(res, 500, 'unexpected: ' + (e && e.message ? e.message : String(e)));
  }
};
