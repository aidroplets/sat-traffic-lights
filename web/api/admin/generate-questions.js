/**
 * POST /api/admin/generate-questions
 *
 * Generates SAT/ACT practice questions via Claude. Admin-only.
 *
 * Security:
 *   • ANTHROPIC_API_KEY lives ONLY in this server runtime. It is read
 *     from process.env and used to call api.anthropic.com server-to-server.
 *     The key is never embedded in any response, never logged, and never
 *     reaches the browser.
 *   • Caller must be authenticated via the stl_session cookie AND in the
 *     admin allowlist. Non-admins get 401/403.
 *
 * Request body (JSON):
 *   {
 *     count:       number,      // 1..20
 *     difficultyMin: number,    // 200..800 (clamped)
 *     difficultyMax: number,    // 200..800 (clamped, must be >= min)
 *     topics:      string[]|'all',  // existing topic slugs, or 'all'
 *     types:       string[]|'all',  // 'word-problem','data-analysis','algebra','geometry','grid-in', etc.
 *     notes:       string,      // free-form constraints from admin
 *   }
 *
 * Response:
 *   200 { questions: [...] }   // each question matches the bank schema
 *   401 { error: 'unauthorized' }
 *   403 { error: 'admin only' }
 *   503 { error: 'AI not configured — set ANTHROPIC_API_KEY' }
 *   502 { error: 'AI returned malformed JSON' }
 */
const { readSessionCookie, ADMIN_EMAILS } = require('../_lib/auth');

const MODEL = 'claude-sonnet-4-5-20250929';
const MAX_COUNT = 20;

function clamp(n, lo, hi) {
  if (!Number.isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    req.on('data', (chunk) => { data += chunk; if (data.length > 32 * 1024) req.destroy(); });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function buildPrompt({ count, difficultyMin, difficultyMax, topics, types, notes }) {
  const topicsTxt = topics === 'all' || !topics?.length
    ? 'any standard SAT math topic (algebra, word-problem, data-analysis, geometry, statistics, exponents, functions, etc.)'
    : topics.join(', ');
  const typesTxt = types === 'all' || !types?.length
    ? 'any combination of multiple-choice and grid-in'
    : types.join(', ');

  return `You are a senior SAT-prep curriculum writer. Generate ${count} new SAT math questions.

Constraints:
- Difficulty range (SAT score equivalent): ${difficultyMin}-${difficultyMax}. Distribute across the range; don't pile them all at one end.
- Topics: ${topicsTxt}
- Types: ${typesTxt}
- Each question must be standalone, original, and unambiguous. Single best answer for MC.
- For grid-in, set "choices" to null and "answer" to the typed answer string (e.g. "12", "1/4", "3.5").
- For multiple-choice, "choices" is an array of 4 strings and "answer" is the 0-based index of the correct one.
- Explanation must show the reasoning steps a tutor would walk through, not just the final answer.
${notes ? '- Additional constraints from the admin: ' + notes : ''}

Return ONLY a JSON object of this exact shape (no prose, no markdown fences):

{
  "questions": [
    {
      "topic": "word-problem",
      "difficulty": 580,
      "stem": "...",
      "choices": ["...","...","...","..."],
      "answer": 2,
      "explanation": "..."
    }
  ]
}

Each "topic" must be lowercase, dash-separated. Each "difficulty" must be an integer 200-800 in increments of 10.`;
}

async function callClaude(apiKey, prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
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
  // Tolerate accidental ```json fences or leading prose.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const raw = fenced ? fenced[1] : text;
  // Find the first { and last } to slice the JSON object.
  const start = raw.indexOf('{');
  const end   = raw.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) throw new Error('No JSON object in response');
  return JSON.parse(raw.slice(start, end + 1));
}

function validateQuestion(q, i) {
  const errs = [];
  if (typeof q.stem !== 'string' || !q.stem.trim()) errs.push('stem missing');
  if (typeof q.topic !== 'string' || !q.topic.trim()) errs.push('topic missing');
  const diff = Number(q.difficulty);
  if (!Number.isFinite(diff) || diff < 200 || diff > 800) errs.push('difficulty out of range');
  if (typeof q.explanation !== 'string') errs.push('explanation missing');
  const isGridIn = q.choices === null || q.choices === undefined;
  if (!isGridIn) {
    if (!Array.isArray(q.choices) || q.choices.length !== 4) errs.push('choices must be array of 4');
    const ans = Number(q.answer);
    if (!Number.isFinite(ans) || ans < 0 || ans > 3) errs.push('answer must be index 0-3');
  } else {
    if (typeof q.answer !== 'string' || !q.answer.trim()) errs.push('grid-in answer missing');
  }
  return errs;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'method not allowed' }));
  }

  // ---- auth ----
  const session = readSessionCookie(req);
  if (!session || !session.email) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'unauthorized' }));
  }
  if (!ADMIN_EMAILS.has(session.email)) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'admin only' }));
  }

  // ---- env ----
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'AI not configured — set ANTHROPIC_API_KEY' }));
  }

  // ---- params ----
  let body;
  try { body = await readBody(req); }
  catch (e) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'bad JSON body' }));
  }

  const count = clamp(Math.floor(Number(body.count)), 1, MAX_COUNT);
  let difficultyMin = clamp(Math.round(Number(body.difficultyMin) / 10) * 10, 200, 800);
  let difficultyMax = clamp(Math.round(Number(body.difficultyMax) / 10) * 10, 200, 800);
  if (difficultyMax < difficultyMin) [difficultyMin, difficultyMax] = [difficultyMax, difficultyMin];
  const topics = Array.isArray(body.topics) ? body.topics.map(String).filter(Boolean) : 'all';
  const types  = Array.isArray(body.types)  ? body.types.map(String).filter(Boolean)  : 'all';
  const notes  = typeof body.notes === 'string' ? body.notes.slice(0, 1000) : '';

  // ---- call AI ----
  const prompt = buildPrompt({ count, difficultyMin, difficultyMax, topics, types, notes });
  let text;
  try {
    text = await callClaude(apiKey, prompt);
  } catch (e) {
    console.error('generate-questions: anthropic call failed', e.message);
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'AI request failed' }));
  }

  // ---- parse + validate ----
  let parsed;
  try { parsed = extractJSON(text); }
  catch (e) {
    console.error('generate-questions: parse failed', e.message, text.slice(0, 200));
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'AI returned malformed JSON' }));
  }

  const questions = Array.isArray(parsed.questions) ? parsed.questions : [];
  const validated = questions.map((q, i) => ({
    question: q,
    errors: validateQuestion(q, i),
  }));
  const ok = validated.filter((v) => v.errors.length === 0).map((v) => v.question);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify({
    questions: ok,
    skipped: validated.length - ok.length,
    requested: count,
  }));
};
