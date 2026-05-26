/**
 * GET /api/test-config
 *
 * Returns every test's config row. Public read (it drives the picker
 * + score input which run before sign-in).
 *
 *   { testConfig: [ { testId, isActive, length, subjectMix,
 *                     enabledSubjects, updatedBy, updatedAt }, ... ] }
 *
 * Edge-cached for 60s. Admins do a fresh read after writes via the
 * admin endpoint's response or by re-fetching.
 */
const {
  sendJson,
  sendError,
  requireSupabaseInProd,
  hasSupabase,
  getSupabase,
} = require('./_lib/admin');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendError(res, 405, 'method not allowed');
  }
  if (!requireSupabaseInProd(res)) return;

  try {
    if (!hasSupabase()) {
      return sendJson(res, 200, { testConfig: [] });
    }
    const supa = await getSupabase();
    const { data, error } = await supa.from('test_config').select('*');
    if (error) return sendError(res, 500, 'read failed: ' + error.message);
    const testConfig = (data || []).map((row) => ({
      testId:           row.test_id,
      isActive:         row.is_active,
      length:           row.length == null ? undefined : row.length,
      subjectMix:       row.subject_mix || undefined,
      enabledSubjects:  Array.isArray(row.enabled_subjects) ? row.enabled_subjects : [],
      tint:             row.tint || undefined,
      updatedBy:        row.updated_by || undefined,
      updatedAt:        row.updated_at ? new Date(row.updated_at).getTime() : undefined,
    }));
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300, public');
    return sendJson(res, 200, { testConfig });
  } catch (e) {
    return sendError(res, 500, 'unexpected: ' + (e && e.message ? e.message : String(e)));
  }
};
