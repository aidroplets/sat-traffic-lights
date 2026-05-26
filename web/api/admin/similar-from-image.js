/**
 * POST /api/admin/similar-from-image
 *
 * Reads an uploaded question image AND drafts N similar questions in
 * the same style/topic. Combines the vision call from convert-image.js
 * with the multi-question generation prompt from generate-questions.js.
 *
 * The image gives the AI the source's stem, choices, topic, and
 * difficulty implicitly; the request body gives the AI the target
 * count, difficulty mode, and any extra constraints the admin typed.
 *
 * Security: identical to the two endpoints above — admin auth via
 * stl_session cookie, ANTHROPIC_API_KEY only in env, never returned.
 *
 * Request body (JSON):
 *   {
 *     image:          "data:image/png;base64,...",    // source question
 *     count:          number,                          // 1..20
 *     testType:       'SAT'|'PSAT'|'ACT'|...,         // routing hint for AI
 *     subject:        'math'|'reading-writing'|...,    // section hint
 *     difficultyMode: 'match'|'band'|'custom',
 *     difficultyMin:  number|null,                    // required when mode='custom'
 *     difficultyMax:  number|null,                    // required when mode='custom'
 *     notes:          string,                          // free-form constraints
 *   }
 *
 * Response:
 *   200 { questions: [...], skipped: 0 }
 *   400 { error: 'image required' | 'count out of range' }
 *   401/403 { error }
 *   413 { error: 'image too large' }
 *   502 { error: 'AI returned malformed JSON' | 'AI request failed' }
 *   503 { error: 'AI not configured — set ANTHROPIC_API_KEY' }
 */
const { readSessionCookie, ADMIN_EMAILS } = require('../_lib/auth');

const MODEL = 'claude-sonnet-4-5-20250929';
const MAX_COUNT = 20;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const SUPPORTED_MIME = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);

// Per-test difficulty scales — mirror the cfg.tiers in app.js. Used to
// compute the band a source-question difficulty lives in when the
// admin chose difficultyMode='band'.
const TEST_BANDS = {
  SAT:  { min: 200, max: 800, tiers: { easy: 500, medium: 600, hard: 700 } },
  PSAT: { min: 160, max: 760, tiers: { easy: 460, medium: 560, hard: 660 } },
  ACT:  { min: 1,   max: 36,  tiers: { easy: 22,  medium: 28,  hard: 33  } },
  ISEE: { min: 1,   max: 9,   tiers: { easy: 4,   medium: 6,   hard: 8   } },
  SSAT: { min: 500, max: 800, tiers: { easy: 600, medium: 680, hard: 750 } },
  HSPT: { min: 200, max: 800, tiers: { easy: 500, medium: 600, hard: 700 } },
};

function clamp(n, lo, hi) {
  if (!Number.isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') return resolve(req.body);
    let data = '';
    // 8 MB raw cap — base64 inflates by ~33%, so 5 MB images fit.
    req.on('data', (chunk) => { data += chunk; if (data.length > 8 * 1024 * 1024) req.destroy(); });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function parseDataUri(uri) {
  if (typeof uri !== 'string') return null;
  const m = uri.match(/^data:([^;,]+);base64,(.+)$/);
  if (!m) return null;
  return { mediaType: m[1].toLowerCase(), base64: m[2] };
}

// Resolve the AI's target difficulty instruction string from the
// admin's mode choice + optional custom range. The actual source
// difficulty is INFERRED by the AI from the image — we just tell
// it whether to match, band, or hit a custom range.
function buildDifficultyInstruction(testType, mode, customMin, customMax) {
  const band = TEST_BANDS[testType] || TEST_BANDS.SAT;
  if (mode === 'custom') {
    const lo = clamp(Number(customMin), band.min, band.max);
    const hi = clamp(Number(customMax), band.min, band.max);
    const [a, b] = lo <= hi ? [lo, hi] : [hi, lo];
    return `Difficulty: distribute the generated questions evenly across the integer range ${a}–${b} (in the test's native score scale).`;
  }
  if (mode === 'band') {
    return `Difficulty: first identify the source question's difficulty band (easy/medium/hard/insane on the ${testType} scale: ` +
      `easy ≤${band.tiers.easy}, medium ≤${band.tiers.medium}, hard ≤${band.tiers.hard}, insane >${band.tiers.hard}). ` +
      `Then generate ALL new questions WITHIN that same band, distributing across the band's full range.`;
  }
  // default: match
  return 'Difficulty: every generated question must match the source question\'s exact difficulty score as closely as possible.';
}

function buildPrompt({ count, testType, subject, difficultyMode, customMin, customMax, notes }) {
  const diff = buildDifficultyInstruction(testType, difficultyMode, customMin, customMax);
  return `You are a senior ${testType} ${subject} curriculum writer. The image shows a single source question. Read it carefully — identify its topic, difficulty, format (multiple choice or grid-in), and rhetorical/mathematical structure.

Then generate ${count} NEW questions that are SIMILAR to the source in:
- TOPIC and concept tested
- FORMAT (same multiple-choice/grid-in shape; same number of choices for MC)
- DIFFICULTY (per the rule below)
- STYLE (similar prose register, similar passage length if reading)

But each new question must:
- Test the same SKILL with different numbers, scenarios, or wording.
- Have one indisputably correct answer; other choices wrong for explainable reasons.
- NOT be a near-paraphrase of the source.

${diff}

${notes ? 'EXTRA CONSTRAINTS from the admin:\n' + notes + '\n' : ''}

Spread answer index roughly evenly across the batch (A/B/C/D each ~25%) for multiple choice.

Return ONLY a JSON object of this exact shape (no prose, no markdown fences):

{
  "sourceTopic": "lowercase-dash-separated-topic",
  "sourceDifficulty": 580,
  "questions": [
    {
      "topic": "lowercase-dash-separated-topic",
      "difficulty": 580,
      "stem": "...",
      "choices": ["A","B","C","D"],
      "answer": 2,
      "explanation": "..."
    }
  ]
}

For grid-in questions set "choices" to null and "answer" to the typed answer string (e.g. "12", "1/4", "3.5"). For multiple-choice, "choices" is exactly 4 strings and "answer" is the 0-based index. Each "topic" is lowercase-dash-separated. Each "difficulty" is an integer in the test's native score scale.`;
}

async function callClaudeVision(apiKey, mediaType, base64, prompt) {
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
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: prompt },
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
  return blocks.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
}

function extractJSON(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf('{');
  const end   = raw.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) throw new Error('No JSON object in response');
  return JSON.parse(raw.slice(start, end + 1));
}

// Validate one generated question, return the cleaned object or null
// if invalid. Mirrors the rules in generate-questions.js so the front
// end's review screen sees the same shape from both endpoints.
function validateQuestion(q, scoreMin, scoreMax) {
  if (!q || typeof q !== 'object') return null;
  const stem = typeof q.stem === 'string' ? q.stem.trim() : '';
  if (!stem) return null;
  const topic = typeof q.topic === 'string' ? q.topic.trim().toLowerCase().replace(/\s+/g, '-') : '';
  const difficulty = Number(q.difficulty);
  if (!Number.isFinite(difficulty) || difficulty < scoreMin || difficulty > scoreMax) return null;
  const isGridIn = q.choices === null || q.choices === undefined;
  let choices = null;
  let answer = q.answer;
  if (!isGridIn) {
    if (!Array.isArray(q.choices) || q.choices.length !== 4) return null;
    choices = q.choices.map((c) => String(c));
    const ai = Number(q.answer);
    if (!Number.isInteger(ai) || ai < 0 || ai > 3) return null;
    answer = ai;
  } else {
    if (typeof answer !== 'string' && typeof answer !== 'number') return null;
    answer = String(answer);
  }
  const explanation = typeof q.explanation === 'string' ? q.explanation.trim() : '';
  return { topic, difficulty, stem, choices, answer, explanation };
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'method not allowed' }));
  }

  // ---- auth ----
  const session = readSessionCookie(req);
  if (!session || !session.email) { res.statusCode = 401; return res.end(JSON.stringify({ error: 'unauthorized' })); }
  if (!ADMIN_EMAILS.has(session.email)) { res.statusCode = 403; return res.end(JSON.stringify({ error: 'admin only' })); }

  // ---- env ----
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) { res.statusCode = 503; return res.end(JSON.stringify({ error: 'AI not configured — set ANTHROPIC_API_KEY' })); }

  // ---- params ----
  let body;
  try { body = await readBody(req); }
  catch (e) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'bad JSON body' })); }

  const parsed = parseDataUri(body.image);
  if (!parsed) { res.statusCode = 400; return res.end(JSON.stringify({ error: 'image required (expecting a data URI)' })); }
  if (!SUPPORTED_MIME.has(parsed.mediaType)) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'unsupported image format — use PNG, JPEG, GIF, or WEBP' }));
  }
  const approxBytes = Math.floor(parsed.base64.length * 0.75);
  if (approxBytes > MAX_IMAGE_BYTES) { res.statusCode = 413; return res.end(JSON.stringify({ error: 'image too large (max 5 MB)' })); }

  const count = clamp(Number(body.count), 1, MAX_COUNT);
  const testType = TEST_BANDS[body.testType] ? body.testType : 'SAT';
  const subject  = typeof body.subject === 'string' && body.subject ? body.subject : 'math';
  const difficultyMode = ['match', 'band', 'custom'].includes(body.difficultyMode) ? body.difficultyMode : 'match';
  const notes = typeof body.notes === 'string' ? body.notes.trim().slice(0, 1500) : '';
  const band = TEST_BANDS[testType];

  const prompt = buildPrompt({
    count, testType, subject, difficultyMode,
    customMin: body.difficultyMin, customMax: body.difficultyMax, notes,
  });

  // ---- call AI ----
  let text;
  try {
    text = await callClaudeVision(apiKey, parsed.mediaType, parsed.base64, prompt);
  } catch (e) {
    console.error('similar-from-image: anthropic call failed', e.message);
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: 'AI request failed' }));
  }

  // ---- parse ----
  let result;
  try { result = extractJSON(text); }
  catch (e) {
    console.error('similar-from-image: parse failed', e.message, text.slice(0, 200));
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: 'AI returned malformed JSON' }));
  }
  if (!result || !Array.isArray(result.questions)) {
    res.statusCode = 502;
    return res.end(JSON.stringify({ error: 'AI did not return a questions array' }));
  }

  // ---- validate each draft ----
  const cleaned = [];
  let skipped = 0;
  for (const q of result.questions) {
    const v = validateQuestion(q, band.min, band.max);
    if (v) cleaned.push(v); else skipped++;
  }

  res.statusCode = 200;
  return res.end(JSON.stringify({
    questions: cleaned,
    skipped,
    sourceTopic: result.sourceTopic || null,
    sourceDifficulty: result.sourceDifficulty || null,
  }));
};
