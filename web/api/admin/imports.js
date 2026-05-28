/**
 * GET    /api/admin/imports
 * POST   /api/admin/imports?id=<importId>&action=delete
 * POST   /api/admin/imports?id=<importId>&action=restore
 *
 * Manage the imports registry — the table that backs the admin
 * Imports tab. Today the client toggles `stl_imports_deleted` in
 * localStorage; this endpoint moves that state to the DB so it's
 * shared across admins.
 *
 *   GET     — list all imports (active + soft-deleted)
 *   delete  — set deleted_at + deleted_by; cascade is handled in the
 *             read endpoint (questions filter by import_id presence)
 *   restore — clear deleted_at + deleted_by
 *
 * Auth: admin session cookie required.
 */
const { sendJson, sendError, requireAdmin, hasSupabase, getSupabase } =
  require('../_lib/admin');

function rowToClient(row) {
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

module.exports = async (req, res) => {
  const session = requireAdmin(req, res);
  if (!session) return;
  if (!hasSupabase()) return sendError(res, 503, 'storage not configured');

  const url = new URL(req.url, 'http://localhost');
  const id = String(url.searchParams.get('id') || '').trim();
  const action = String(url.searchParams.get('action') || '').trim();

  try {
    const supa = await getSupabase();

    if (req.method === 'GET') {
      const { data, error } = await supa.from('imports').select('*');
      if (error) return sendError(res, 500, 'read failed: ' + error.message);
      return sendJson(res, 200, { imports: (data || []).map(rowToClient) });
    }

    if (req.method === 'POST') {
      if (!id) return sendError(res, 400, 'id required');
      if (action === 'delete') {
        const { error } = await supa.from('imports')
          .update({ deleted_at: new Date().toISOString(), deleted_by: session.email })
          .eq('id', id);
        if (error) return sendError(res, 500, 'delete failed: ' + error.message);
        return sendJson(res, 200, { ok: true, id });
      }
      if (action === 'restore') {
        const { error } = await supa.from('imports')
          .update({ deleted_at: null, deleted_by: null })
          .eq('id', id);
        if (error) return sendError(res, 500, 'restore failed: ' + error.message);
        return sendJson(res, 200, { ok: true, id });
      }
      return sendError(res, 400, 'action must be delete or restore');
    }

    res.setHeader('Allow', 'GET, POST');
    return sendError(res, 405, 'method not allowed');
  } catch (e) {
    return sendError(res, 500, 'unexpected: ' + (e && e.message ? e.message : String(e)));
  }
};
