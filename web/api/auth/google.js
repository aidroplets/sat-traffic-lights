/**
 * POST /api/auth/google
 *
 * Verifies a Google Identity Services ID token and mints the same
 * stl_session cookie that magic-link sign-in uses. Bridges Google
 * sign-in into the existing auth system so downstream code (admin
 * allowlist, /api/auth/me, user table) is identity-provider-agnostic.
 *
 * Body: { credential: <Google ID token JWT> }
 *
 * Verification steps (matches Google's published guidance):
 *   1. Decode the JWT header to find which key signed it (`kid`).
 *   2. Fetch Google's current public keys from the OIDC discovery
 *      endpoint and pick the matching key by `kid`.
 *   3. Verify the signature with that key using Node's crypto.verify.
 *   4. Check standard JWT claims: iss must be accounts.google.com (or
 *      the https:// variant); aud must match GOOGLE_CLIENT_ID; exp
 *      must be in the future; iat must not be in the future.
 *   5. Pull email + email_verified out and pass to auth.ensureUser.
 *
 * Failure modes return distinct status codes so the frontend toast
 * can guide the user.
 */
const crypto = require('node:crypto');
const auth = require('../_lib/auth.js');

// Cache Google's JWKs in module scope so we don't refetch on every
// request. Lambda cold starts reset it. ~6h TTL matches Google's
// header cache-control hints.
let JWKS_CACHE = { keys: [], fetchedAt: 0 };
const JWKS_TTL_MS = 6 * 60 * 60 * 1000;
const JWKS_URL = 'https://www.googleapis.com/oauth2/v3/certs';

const VALID_ISS = new Set(['accounts.google.com', 'https://accounts.google.com']);

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    req.on('data', (chunk) => { data += chunk; if (data.length > 16 * 1024) req.destroy(); });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

async function getJWKS() {
  if (JWKS_CACHE.keys.length && Date.now() - JWKS_CACHE.fetchedAt < JWKS_TTL_MS) {
    return JWKS_CACHE.keys;
  }
  const res = await fetch(JWKS_URL);
  if (!res.ok) throw new Error('JWKS fetch failed: ' + res.status);
  const data = await res.json();
  if (!data || !Array.isArray(data.keys)) throw new Error('JWKS shape invalid');
  JWKS_CACHE = { keys: data.keys, fetchedAt: Date.now() };
  return data.keys;
}

// Decode a base64url-encoded string to a Buffer.
function b64urlDecode(str) {
  const pad = str.length % 4;
  const padded = str.replace(/-/g, '+').replace(/_/g, '/') + (pad ? '='.repeat(4 - pad) : '');
  return Buffer.from(padded, 'base64');
}

// Build a Node KeyObject from a Google JWK (RSA with n + e fields).
function jwkToKeyObject(jwk) {
  if (jwk.kty !== 'RSA' || !jwk.n || !jwk.e) {
    throw new Error('Unsupported JWK type');
  }
  // crypto.createPublicKey supports JWK directly in Node 16+.
  return crypto.createPublicKey({ key: jwk, format: 'jwk' });
}

function verifyJWT(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) throw new Error('Malformed JWT (expected 3 segments)');
  const [headerB64, payloadB64, sigB64] = parts;
  let header, payload;
  try {
    header  = JSON.parse(b64urlDecode(headerB64).toString('utf8'));
    payload = JSON.parse(b64urlDecode(payloadB64).toString('utf8'));
  } catch (_) {
    throw new Error('JWT segments are not valid JSON');
  }
  return { header, payload, signature: b64urlDecode(sigB64), signingInput: headerB64 + '.' + payloadB64 };
}

const ALG_MAP = {
  RS256: { hash: 'sha256', padding: crypto.constants.RSA_PKCS1_PADDING },
};

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'method-not-allowed' }));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error('[google-auth] GOOGLE_CLIENT_ID env var not set');
    res.statusCode = 503;
    return res.end(JSON.stringify({ error: 'google-not-configured' }));
  }

  let body;
  try { body = await readBody(req); }
  catch (e) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'bad-json' })); }

  const credential = body && body.credential;
  if (!credential || typeof credential !== 'string') {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'missing-credential' }));
  }

  // ---- Decode + verify the ID token ----
  let parsed;
  try { parsed = verifyJWT(credential); }
  catch (e) {
    console.warn('[google-auth] malformed JWT:', e.message);
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'invalid-token' }));
  }
  const { header, payload, signature, signingInput } = parsed;

  if (!ALG_MAP[header.alg]) {
    console.warn('[google-auth] unexpected JWT alg:', header.alg);
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'unexpected-alg' }));
  }

  // Find the matching public key by kid.
  let keys;
  try { keys = await getJWKS(); }
  catch (e) {
    console.error('[google-auth] JWKS fetch failed:', e.message);
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: 'jwks-fetch-failed' }));
  }
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) {
    console.warn('[google-auth] no matching JWK for kid', header.kid);
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'unknown-key' }));
  }

  // Verify the signature.
  let signatureOk = false;
  try {
    const keyObj = jwkToKeyObject(jwk);
    const verifier = crypto.createVerify(ALG_MAP[header.alg].hash);
    verifier.update(signingInput);
    verifier.end();
    signatureOk = verifier.verify(keyObj, signature);
  } catch (e) {
    console.error('[google-auth] signature verify threw:', e.message);
  }
  if (!signatureOk) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'signature-invalid' }));
  }

  // ---- Validate claims ----
  const nowSec = Math.floor(Date.now() / 1000);
  if (!VALID_ISS.has(payload.iss)) {
    console.warn('[google-auth] bad iss:', payload.iss);
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'bad-iss' }));
  }
  if (payload.aud !== clientId) {
    console.warn('[google-auth] aud mismatch — got', payload.aud, 'expected', clientId);
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'aud-mismatch' }));
  }
  if (typeof payload.exp !== 'number' || payload.exp < nowSec) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'token-expired' }));
  }
  if (typeof payload.iat === 'number' && payload.iat > nowSec + 60) {
    // Tiny clock-skew tolerance (60s) in case Google's clock is ahead.
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'iat-in-future' }));
  }
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  if (!email) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'no-email' }));
  }
  // Google only sets email_verified=true when they've actually verified
  // the address. Reject unverified addresses outright — otherwise an
  // attacker could create a Google account claiming an email they don't
  // control.
  if (payload.email_verified === false) {
    res.statusCode = 403;
    return res.end(JSON.stringify({ error: 'email-not-verified' }));
  }

  // ---- Mint session ----
  try {
    await auth.ensureUser(email);
    auth.setSessionCookie(res, email);
    console.log('[google-auth] sign-in OK for', email);
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, email }));
  } catch (e) {
    console.error('[google-auth] session mint failed:', e.message);
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: 'session-failed' }));
  }
};
