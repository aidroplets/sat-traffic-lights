/**
 * POST /api/admin/convert-image
 *
 * Extracts a single SAT-style question from an uploaded image via
 * Claude Vision. Admin-only. Returns the structured question fields
 * which the frontend prefills into the manual review form.
 *
 * Security: identical model to generate-questions.js — admin auth,
 * server-side ANTHROPIC_API_KEY, key never leaves the server.
 *
 * Request body (JSON):
 *   { image: "data:image/png;base64,iVBORw0..." }
 *
 * Response:
 *   200 { stem, choices, answer, explanation, topic, difficulty }
 *   400 { error: 'image required' | 'unsupported image format' }
 *   401 { error: 'unauthorized' }
 *   403 { error: 'admin only' }
 *   413 { error: 'image too large' }
 *   502 { error: 'AI returned malformed JSON' | 'AI request failed' }
 *   503 { error: 'AI not configured — set ANTHROPIC_API_KEY' }
 */
const { readSessionCookie, ADMIN_EMAILS } = require('../_lib/auth');

const MODEL = 'claude-sonnet-4-5-20250929';
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;   // 5 MB after base64 decode
const SUPPORTED_MIME = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    // 8 MB raw cap; data URIs balloon ~33% over the source bytes.
    req.on('data', (chunk) => { data += chunk; if (data.length > 8 * 1024 * 1024) req.destroy(); });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

/**
 * Parse `data:image/png;base64,XXXX` → { mediaType, base64 }.
 * Returns null on malformed input.
 */
function parseDataUri(uri) {
  if (typeof uri !== 'string') return null;
  const m = uri.match(/^data:([^;,]+);base64,(.+)$/);
  if (!m) return null;
  return { mediaType: m[1].toLowerCase(), base64: m[2] };
}

const PROMPT = `You are a senior SAT-prep curriculum writer. The user has uploaded an image of a single SAT/ACT-style question. Read the image carefully and extract its content.

Return ONLY a JSON object of this exact shape (no prose, no markdown fences):

{
  "stem":        "the question text",
  "choices":     ["A","B","C","D"],
  "answer":      0,
  "explanation": "step-by-step solution a tutor would walk through",
  "topic":       "lowercase-dash-separated-topic",
  "difficulty":  580
}

Rules:
- "stem" is the full question text. Preserve numbers, units, and any short referenced quantities (e.g. tables, equations) inline. If there's an essential figure that can't be transcribed, briefly describe it in brackets at the end of the stem (e.g. "[see scatterplot in image]").
- "choices" is an array of EXACTLY 4 strings for multiple-choice. For grid-in (free response) questions, set "choices" to null and put the typed answer in "answer" as a string (e.g. "12", "1/4", "3.5").
- For multiple choice, "answer" is the 0-based index of the correct choice (so A=0, B=1, C=2, D=3).
- "topic" must be lowercase, dash-separated, and chosen to fit common SAT math categories (e.g. "algebra", "word-problem", "data-analysis", "geometry", "exponents", "functions", "statistics").
- "difficulty" is an integer 200-800 in increments of 10 — your best estimate of the SAT score range a student would need to reliably answer it.
- "explanation" walks through the reasoning, not just the final answer.
- If the image does NOT contain a single answerable SAT-style question (blurry, multi-question, off-topic), return: {"error":"not a single SAT question"}.`;

async function callClaudeVision(apiKey, mediaType, base64) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: base64 },
          },
          { type: 'text', text: PROMPT },
        ],
      }],
    }),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error('Anthropic API error ' + res.status + ': ' + txt.slice(0, 500));
  }
  const data = await res.json();
  const blocks = Array.isArray(data.content) ? data.content : [];
  const text = blocks.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
  return text;
}

function extractJSON(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('{');
  const end   = raw.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) throw new Error('No JSON object in response');
  return JSON.parse(raw.slice(start, end + 1));
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'method not allowed' }));
  }

  // ---- auth ----
  const session = readSessionCookie(req);
  if (!session || !session.email) {
    res.statusCode = 401;
    return res.end(JSON.stringify({ error: 'unauthorized' }));
  }
  if (!ADMIN_EMAILS.has(session.email)) {
    res.statusCode = 403;
    return res.end(JSON.stringify({ error: 'admin only' }));
  }

  // ---- env ----
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.statusCode = 503;
    return res.end(JSON.stringify({ error: 'AI not configured — set ANTHROPIC_API_KEY' }));
  }

  // ---- params ----
  let body;
  try { body = await readBody(req); }
  catch (e) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'bad JSON body' }));
  }

  const parsed = parseDataUri(body.image);
  if (!parsed) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'image required (expecting a data URI)' }));
  }
  if (!SUPPORTED_MIME.has(parsed.mediaType)) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'unsupported image format — use PNG, JPEG, GIF, or WEBP' }));
  }
  // Approximate decoded size — 4 base64 chars → 3 bytes.
  const approxBytes = Math.floor(parsed.base64.length * 0.75);
  if (approxBytes > MAX_IMAGE_BYTES) {
    res.statusCode = 413;
    return res.end(JSON.stringify({ error: 'image too large (max 5 MB)' }));
  }

  // ---- call AI ----
  let text;
  try {
    text = await callClaudeVision(apiKey, parsed.mediaType, parsed.base64);
  } catch (e) {
    console.error('convert-image: anthropic call failed', e.message);
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: 'AI request failed' }));
  }

  // ---- parse ----
  let result;
  try { result = extractJSON(text); }
  catch (e) {
    console.error('convert-image: parse failed', e.message, text.slice(0, 200));
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: 'AI returned malformed JSON' }));
  }

  // The model may return {error: "not a single SAT question"} as a
  // structured "I refuse to extract this" response. Surface that 1:1
  // so the admin sees a clear toast.
  if (result && typeof result.error === 'string') {
    res.statusCode = 422;
    return res.end(JSON.stringify({ error: result.error }));
  }

  // ---- validate the extracted shape ----
  const stem = typeof result.stem === 'string' ? result.stem.trim() : '';
  if (!stem) {
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: 'AI did not return a stem' }));
  }
  const isGridIn = result.choices === null || result.choices === undefined;
  let choices = null;
  let answer = result.answer;
  if (!isGridIn) {
    if (!Array.isArray(result.choices) || result.choices.length !== 4) {
      res.statusCode = 502;
      return res.end(JSON.stringify({ error: 'AI returned an invalid choices array' }));
    }
    choices = result.choices.map((c) => String(c));
    const ans = Number(answer);
    if (!Number.isFinite(ans) || ans < 0 || ans > 3) {
      res.statusCode = 502;
      return res.end(JSON.stringify({ error: 'AI returned an invalid answer index' }));
    }
    answer = ans;
  } else {
    answer = answer == null ? '' : String(answer);
  }

  let difficulty = Number(result.difficulty);
  if (!Number.isFinite(difficulty) || difficulty < 200 || difficulty > 800) difficulty = 580;
  // Snap to the 10-step grid the rest of the app uses.
  difficulty = Math.round(difficulty / 10) * 10;

  const topic = (typeof result.topic === 'string' && result.topic.trim())
    ? result.topic.trim().toLowerCase().replace(/\s+/g, '-')
    : 'word-problem';

  res.statusCode = 200;
  return res.end(JSON.stringify({
    stem,
    choices,
    answer,
    explanation: typeof result.explanation === 'string' ? result.explanation : '',
    topic,
    difficulty,
  }));
};
