/**
 * Shared admin-API helpers. Every /api/admin/* endpoint funnels through
 * here for auth, body parsing, and the JSON envelope so we don't repeat
 * the same 30 lines of guardrail in each file.
 *
 * Usage:
 *   const { requireAdmin, jsonBody, sendJson, sendError } = require('../_lib/admin');
 *   module.exports = async (req, res) => {
 *     const session = requireAdmin(req, res);
 *     if (!session) return;                  // already wrote 401/403
 *     const body = await jsonBody(req);
 *     // ... do work, then:
 *     return sendJson(res, 200, { ... });
 *   };
 */
const { readSessionCookie, ADMIN_EMAILS, hasSupabase, getSupabase } = require('./auth');

const MAX_BODY_BYTES = 30 * 1024 * 1024; // 30 MB upper bound (matches note.js)

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}
function sendError(res, status, message) {
  sendJson(res, status, { error: message });
}

// Returns the session if the requester is an admin; otherwise writes a
// 401/403 and returns null. Callers must early-return on null.
function requireAdmin(req, res) {
  const session = readSessionCookie(req);
  if (!session || !session.email) {
    sendError(res, 401, 'unauthorized');
    return null;
  }
  if (!ADMIN_EMAILS.has(session.email)) {
    sendError(res, 403, 'admin only');
    return null;
  }
  return session;
}

// Public-read endpoints don't require admin but DO need Supabase to be
// configured in prod. Returns true if OK to proceed; otherwise writes a
// 503 and returns false.
function requireSupabaseInProd(res) {
  if (process.env.VERCEL_ENV === 'production' && !hasSupabase()) {
    sendError(res, 503, 'storage not configured');
    return false;
  }
  return true;
}

function jsonBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > MAX_BODY_BYTES) req.destroy();
    });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

// Allowed values, mirrored from app.js + bank files. Reject anything
// outside these so an admin typo doesn't corrupt the row.
// 'archived' is a distinct state from 'unpublished': the review modal's
// Archive button sets it as a soft-delete that's still surfaced in the
// admin Archived view. Day-1 migration narrowed this set to exclude
// 'archived' — that was wrong; the client still issues it and the
// modal action returns a 400 if we drop it.
const ALLOWED_STATES = new Set(['live', 'needs-review', 'unpublished', 'archived', 'deleted']);
const ALLOWED_SOURCES = new Set(['human-curated', 'ai-generated']);

module.exports = {
  sendJson,
  sendError,
  requireAdmin,
  requireSupabaseInProd,
  jsonBody,
  hasSupabase,
  getSupabase,
  ALLOWED_STATES,
  ALLOWED_SOURCES,
};
