/**
 * GET /api/questions
 *
 * The canonical bank read. Returns every non-deleted question merged
 * with its override row (if any), so callers get the same shape they
 * would get from the legacy `assembleBank()` in app.js.
 *
 * Response shape:
 *   {
 *     questions: [
 *       { id, sourceId, testType, section, topic, difficulty, state,
 *         source, stem, choices, answer, explanation, passage, table,
 *         svg, uploader, reviewStatus, importId, ...metadata, note?,
 *         noteAttachments?, updatedBy?, updatedAt? },
 *       ...
 *     ],
 *     imports: [ { id, label, source, generatedAt, testType, section,
 *                  count, deletedAt, deletedBy }, ... ],
 *     testConfig: [ { testId, isActive, length, subjectMix,
 *                     enabledSubjects, updatedBy, updatedAt }, ... ],
 *     generatedAt: '2026-05-25T22:30:00.000Z',
 *   }
 *
 * Caching strategy: we set Cache-Control with a SHORT s-maxage (30s) so
 * Vercel's edge CDN serves repeated boot loads instantly, while admin
 * edits propagate within ~30 seconds. The client also keeps a
 * localStorage cache keyed by `generatedAt` for offline / cold-fetch
 * resilience.
 *
 * Filters (optional query params, all narrow the result):
 *   ?testType=SAT
 *   ?section=math
 *   ?state=live              (default: returns ALL non-deleted; admins
 *                              filter client-side. anon callers should
 *                              filter to state=live)
 *   ?includeDeleted=1        (admins only — returns even soft-deleted rows)
 *
 * Why include overrides server-side: the override table is small
 * (one row per admin-edited question, < 100 rows today) so applying
 * the merge here keeps the client trivial and avoids a 2nd fetch.
 */
const {
  sendJson,
  sendError,
  requireSupabaseInProd,
  hasSupabase,
  getSupabase,
} = require('./_lib/admin');
const { readSessionCookie, ADMIN_EMAILS } = require('./_lib/auth');

// Snake_case → camelCase shape the client already expects. Mirrors
// assembleBank()'s merge in app.js.
function rowToClient(row, override) {
  const merged = {
    id:           row.id,
    sourceId:     row.source_id || undefined,
    testType:     row.test_type,
    section:      row.section,
    topic:        row.topic || undefined,
    difficulty:   row.difficulty == null ? undefined : row.difficulty,
    state:        row.state,
    source:       row.source,
    stem:         row.stem,
    choices:      row.choices,
    answer:       row.answer,
    explanation:  row.explanation || undefined,
    passage:      row.passage || undefined,
    table:        row.table_data || undefined,
    svg:          row.svg || undefined,
    uploader:     row.uploader || undefined,
    reviewStatus: row.review_status || undefined,
    importId:     row.import_id || undefined,
    ...(row.metadata && typeof row.metadata === 'object' ? row.metadata : {}),
  };
  // Strip undefined to keep the JSON tight.
  for (const k of Object.keys(merged)) if (merged[k] === undefined) delete merged[k];

  if (override) {
    // Override fields that exist on the row replace the base values.
    // Schema in 001_init.sql: state, stem, choices, answer, explanation,
    // topic, difficulty, plus the note bundle from 002.
    const ovr = {};
    if (override.state != null)       ovr.state = override.state;
    if (override.stem != null)        ovr.stem = override.stem;
    if (override.choices != null)     ovr.choices = override.choices;
    if (override.answer != null)      ovr.answer = override.answer;
    if (override.explanation != null) ovr.explanation = override.explanation;
    if (override.topic != null)       ovr.topic = override.topic;
    if (override.difficulty != null)  ovr.difficulty = override.difficulty;
    if (override.note)                ovr.note = override.note;
    if (Array.isArray(override.note_attachments) && override.note_attachments.length) {
      ovr.noteAttachments = override.note_attachments.map((a) => ({
        name: a.name || 'attachment',
        mime: a.mime || 'image/png',
        dataUrl: a.data_url || '',
        addedAt: a.added_at || 0,
      }));
    }
    if (override.updated_by) ovr.updatedBy = override.updated_by;
    if (override.updated_at) ovr.updatedAt = new Date(override.updated_at).getTime();
    return { ...merged, ...ovr };
  }
  return merged;
}

function importRowToClient(row) {
  return {
    id:          row.id,
    label:       row.label,
    source:      row.source_file || undefined,
    generatedAt: row.generated_at || undefined,
    testType:    row.test_type || undefined,
    section:     row.section || undefined,
    count:       row.count == null ? undefined : row.count,
    deletedAt:   row.deleted_at ? new Date(row.deleted_at).getTime() : undefined,
    deletedBy:   row.deleted_by || undefined,
  };
}

function testConfigRowToClient(row) {
  return {
    testId:           row.test_id,
    isActive:         row.is_active,
    length:           row.length == null ? undefined : row.length,
    subjectMix:       row.subject_mix || undefined,
    enabledSubjects:  Array.isArray(row.enabled_subjects) ? row.enabled_subjects : [],
    tint:             row.tint || undefined,
    updatedBy:        row.updated_by || undefined,
    updatedAt:        row.updated_at ? new Date(row.updated_at).getTime() : undefined,
  };
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendError(res, 405, 'method not allowed');
  }
  if (!requireSupabaseInProd(res)) return;

  const url = new URL(req.url, 'http://localhost');
  const testType  = url.searchParams.get('testType');
  const section   = url.searchParams.get('section');
  const stateFlt  = url.searchParams.get('state');
  const includeDel = url.searchParams.get('includeDeleted') === '1';

  const session = readSessionCookie(req);
  const isAdmin = !!(session && ADMIN_EMAILS.has(session.email));

  // Non-admins can never see soft-deleted rows.
  const showDeleted = isAdmin && includeDel;

  try {
    if (!hasSupabase()) {
      // Dev fallback: empty bank. The client's localStorage cache
      // covers reload. Production already guarded above.
      return sendJson(res, 200, {
        questions: [],
        imports: [],
        testConfig: [],
        generatedAt: new Date().toISOString(),
      });
    }

    const supa = await getSupabase();

    // Fetch questions (paginated by Supabase default limit of 1000;
    // we use range() to walk the whole table). Filters narrow the SQL
    // so the JSON we ship to the client stays small for filtered loads.
    let qBuilder = supa.from('questions').select('*');
    if (testType) qBuilder = qBuilder.eq('test_type', testType);
    if (section)  qBuilder = qBuilder.eq('section', section);
    if (stateFlt) qBuilder = qBuilder.eq('state', stateFlt);
    if (!showDeleted) qBuilder = qBuilder.neq('state', 'deleted');

    // Walk in chunks of 1000 to bypass PostgREST's default ceiling.
    const allQuestionRows = [];
    let offset = 0;
    const PAGE = 1000;
    // Safety: cap at 20 pages (20k rows) so a runaway query can't
    // exhaust the function's memory.
    for (let i = 0; i < 20; i++) {
      const { data, error } = await qBuilder.range(offset, offset + PAGE - 1);
      if (error) return sendError(res, 500, 'questions read failed: ' + error.message);
      if (!data || data.length === 0) break;
      allQuestionRows.push(...data);
      if (data.length < PAGE) break;
      offset += PAGE;
    }

    // Fetch override rows for the same set, then merge.
    const ids = allQuestionRows.map((r) => r.id);
    const overridesById = {};
    if (ids.length > 0) {
      // Chunk the IN clause to keep PostgREST URL length sane.
      for (let i = 0; i < ids.length; i += 200) {
        const chunk = ids.slice(i, i + 200);
        const { data: overs, error: ovErr } = await supa.from('question_overrides')
          .select('*').in('question_id', chunk);
        if (ovErr) return sendError(res, 500, 'overrides read failed: ' + ovErr.message);
        for (const o of (overs || [])) overridesById[o.question_id] = o;
      }
    }

    // Fetch imports (anon sees active, admins see all).
    let impBuilder = supa.from('imports').select('*');
    if (!isAdmin) impBuilder = impBuilder.is('deleted_at', null);
    const { data: importRows, error: impErr } = await impBuilder;
    if (impErr) return sendError(res, 500, 'imports read failed: ' + impErr.message);

    // Fetch test_config.
    const { data: tcRows, error: tcErr } = await supa.from('test_config').select('*');
    if (tcErr) return sendError(res, 500, 'test_config read failed: ' + tcErr.message);

    const questions = allQuestionRows.map((r) => rowToClient(r, overridesById[r.id]));
    const imports   = (importRows || []).map(importRowToClient);
    const testConfig = (tcRows || []).map(testConfigRowToClient);

    // CDN: edge-cache for 30s, allow stale-while-revalidate for 5 min.
    // Admins get a no-store so they always see their own write through.
    if (isAdmin) {
      res.setHeader('Cache-Control', 'no-store, private');
    } else {
      res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=300, public');
    }
    return sendJson(res, 200, {
      questions,
      imports,
      testConfig,
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    return sendError(res, 500, 'unexpected: ' + (e && e.message ? e.message : String(e)));
  }
};
