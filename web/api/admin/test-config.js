/**
 * PUT /api/admin/test-config?id=<testId>
 *
 * Update a test_config row. Replaces these legacy localStorage writes:
 *   • saveTestCompositions   → length + subject_mix
 *   • saveActiveTests        → is_active
 *   • saveEnabledSubjects    → enabled_subjects
 *
 * Body (any subset; nulls clear):
 *   {
 *     isActive?:        boolean,
 *     length?:          integer | null,
 *     subjectMix?:      { math: int, 'reading-writing': int, ... } | null,
 *     enabledSubjects?: ['math', 'reading-writing', ...]
 *   }
 *
 * Auth: admin session cookie required.
 *
 * Behavior: upserts the row (test_config.test_id is the PK). Returns the
 * full row after the update so the client can refresh its cache without
 * re-fetching the whole config table.
 */
const { sendJson, sendError, requireAdmin, jsonBody, hasSupabase, getSupabase }
  = require('../_lib/admin');

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT');
    return sendError(res, 405, 'method not allowed');
  }
  if (!hasSupabase()) return sendError(res, 503, 'storage not configured');

  const url = new URL(req.url, 'http://localhost');
  const testId = String(url.searchParams.get('id') || '').trim().toUpperCase();
  if (!testId) return sendError(res, 400, 'id required');

  try {
    const body = await jsonBody(req);
    const patch = { test_id: testId, updated_by: session.email };
    if ('isActive'        in body) patch.is_active        = !!body.isActive;
    if ('length'          in body) patch.length           = body.length == null ? null : Number(body.length);
    if ('subjectMix'      in body) patch.subject_mix      = body.subjectMix == null ? null : body.subjectMix;
    if ('enabledSubjects' in body) patch.enabled_subjects = Array.isArray(body.enabledSubjects) ? body.enabledSubjects : [];
    if ('tint'            in body) {
      // Accept either an "R, G, B" string or a #rrggbb hex; normalize
      // to the "R, G, B" format the runtime expects. Null clears.
      if (body.tint == null) {
        patch.tint = null;
      } else {
        const t = String(body.tint).trim();
        const hex = t.match(/^#?([0-9a-f]{6})$/i);
        if (hex) {
          const n = parseInt(hex[1], 16);
          patch.tint = ((n >> 16) & 0xff) + ', ' + ((n >> 8) & 0xff) + ', ' + (n & 0xff);
        } else {
          // Expect "R, G, B" with optional whitespace; clamp each to 0-255.
          const parts = t.split(',').map((s) => Math.max(0, Math.min(255, Number(s.trim()))));
          if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) {
            return sendError(res, 400, 'tint must be "R, G, B" or #rrggbb');
          }
          patch.tint = parts.join(', ');
        }
      }
    }

    if (Object.keys(patch).length <= 2) {
      // Only test_id + updated_by → nothing to update.
      return sendError(res, 400, 'no fields to update');
    }

    const supa = await getSupabase();
    const { data, error } = await supa.from('test_config')
      .upsert(patch, { onConflict: 'test_id' })
      .select().single();
    if (error) return sendError(res, 500, 'update failed: ' + error.message);

    return sendJson(res, 200, {
      ok: true,
      testConfig: {
        testId:           data.test_id,
        isActive:         data.is_active,
        length:           data.length == null ? undefined : data.length,
        subjectMix:       data.subject_mix || undefined,
        enabledSubjects:  Array.isArray(data.enabled_subjects) ? data.enabled_subjects : [],
        tint:             data.tint || undefined,
        updatedBy:        data.updated_by || undefined,
        updatedAt:        data.updated_at ? new Date(data.updated_at).getTime() : undefined,
      },
    });
  } catch (e) {
    return sendError(res, 500, 'unexpected: ' + (e && e.message ? e.message : String(e)));
  }
};
