"""
Convert a "upload-schema" questions.json into the StudySignal
question-bank JS format.

Source schema (per item):
    test_type, subject, topic, topic_number, skill, difficulty, format
    question, choices [{label,text}], answer, chart_svg, explanation

Bank schema (emitted):
    id, testType, section, topic, difficulty, state, sourceId,
    stem, choices, answer, explanation
    (+ optional svg: raw <svg>...</svg> when chart_svg is present)
    (+ optional table: {headers, rows, firstColIsHeader, totalsRow, caption})

Conversion logic:
  • LaTeX delimiters $...$ and $$...$$ are stripped (the bank renderer
    doesn't use them; \frac{}/\sqrt{} survive intact).
  • Common LaTeX commands → unicode (\cdot, \times, \le, \pi, ...).
  • \dfrac → \frac (renderer alias).
  • \$ → $ (literal dollar).
  • Markdown tables (a | row, then |---|---|, then data rows) are
    extracted from the question stem and converted to a `q.table`
    object. The first row of cells becomes the header row UNLESS the
    table is transposed (first cell of each row is a one-letter
    label like "x"/"y"), in which case firstColIsHeader=true and no
    header row is emitted.
  • SPR-only blockquotes (> *Enter your answer in the box.*) are
    dropped — the input UI already conveys this.
  • chart_svg (when non-empty) passes through to q.svg verbatim. The
    bank's existing q.svg renderer handles inline SVG for any figure
    type — scatterplots, bar charts, geometric figures.
  • Dedup: when --existing-stems is passed, we hash every stem in the
    referenced bank files and skip uploads whose normalized stem
    matches. Same hash function as the in-app adapter so both paths
    agree.

CLI:
    python3 convert_upload_questions.py \
        --input  /sessions/.../uploads/questions-XXXX.json \
        --output /Users/.../web/questions-sat-math-import-YYYY-MM-DD.js \
        --existing-stems '/Users/.../web/questions*.js'

Defaults preserved for the 2026-05-22 first import.

This is the source of truth — the admin Add Questions / JSON Import
flow in app.js has a parallel JS port (see `adaptUploadSchemaItem`,
`extractMarkdownTable`, `dedupStemHash`) so both paths convert
AND dedup identically.
"""
import argparse
import glob
import hashlib
import json
import re
import sys
from pathlib import Path

DEFAULT_INPUT  = Path('/sessions/affectionate-cool-mccarthy/mnt/uploads/questions.json')
DEFAULT_OUTPUT = Path('/sessions/affectionate-cool-mccarthy/mnt/aidroplets.com/droplets/sat-traffic-lights/web/questions-sat-math-import-2026-05-22.js')

# College Board topic sentence → short kebab slug. Keep in sync with
# UPLOAD_TOPIC_SLUGS in app.js. New entries here MUST also be added
# there or the in-app paste flow will fall back to a slugify() that
# may diverge.
TOPIC_SLUG = {
    # --- Heart of Algebra (originals from 2026-05-22 batch) ---
    'Solve linear equations in one variable':                                        'solve-linear-equation',
    'Translate word problems into linear equations':                                  'linear-word-problem',
    'Slope from two points, a table, or an equation':                                 'slope-from-points',
    'Write a linear equation given slope and a point, or two points':                 'write-linear-equation',
    'Convert between slope-intercept, point-slope, and standard form':                'linear-equation-forms',
    'Parallel and perpendicular lines':                                               'parallel-perpendicular-lines',
    'Interpret slope and y-intercept in context':                                     'slope-intercept-context',
    'Graph a linear function; identify x- and y-intercepts':                          'linear-graph-intercepts',

    # --- Heart of Algebra (extension) ---
    'Linear function modeling':                                                       'linear-function-modeling',
    'Evaluate and interpret function notation':                                       'function-notation',
    'Solve a system of two linear equations':                                         'solve-linear-system',
    'Number of solutions to a linear equation or system':                             'number-of-solutions',
    'Linear inequalities in one variable':                                            'linear-inequality-one-var',
    'Linear inequalities in two variables':                                           'linear-inequality-two-var',
    'Systems of linear inequalities and feasible regions':                            'linear-inequality-systems',
    'Linear function from a table of values':                                         'linear-from-table',
    'Translate word problems into systems of equations':                              'system-word-problem',

    # --- Passport to Advanced Math ---
    'Combine like terms, distribute, and factor out a GCF':                           'combine-distribute-gcf',
    'Polynomial arithmetic':                                                          'polynomial-arithmetic',
    'Factor quadratics':                                                              'factor-quadratics',
    'Factor special products':                                                        'factor-special-products',
    'Solve quadratic equations by factoring':                                         'solve-quadratic-by-factoring',
    'Solve quadratic equations with the quadratic formula':                           'quadratic-formula',
    'Solve quadratic equations by completing the square':                             'complete-the-square',
    'Discriminant':                                                                   'discriminant',
    'Graph quadratic functions and translate between forms':                          'quadratic-graphing',
    'Vertex form, vertex, axis of symmetry, and max/min':                             'quadratic-vertex-form',
    'Simplify and operate on rational expressions':                                   'rational-expressions',
    'Solve rational equations and identify excluded values':                          'rational-equations',
    'Solve radical equations and check for extraneous roots':                         'radical-equations',
    'Solve absolute-value equations and inequalities':                                'absolute-value-equations',
    'Systems of one linear and one nonlinear equation':                               'linear-nonlinear-systems',
    'Properties of exponents':                                                        'exponent-properties',
    'Exponential growth and decay models':                                            'exponential-growth-decay',

    # --- Problem Solving & Data Analysis ---
    'Ratios, rates, and proportional relationships':                                  'ratios-rates-proportions',
    'Percentages':                                                                    'percentages',
    'Unit conversion and derived units':                                              'unit-conversion',
    'One-variable data: mean, median, range, and spread':                             'one-variable-data',
    'Two-variable data: scatterplots and models':                                     'scatterplots-and-models',
    'Probability and conditional probability from tables':                            'probability-from-tables',
    'Margin of error and inference from sample statistics':                           'margin-of-error',
    'Evaluating statistical claims':                                                  'evaluating-statistical-claims',

    # --- Geometry & Trigonometry ---
    'Area and perimeter of plane figures':                                            'area-perimeter',
    'Volume of solids':                                                               'volume-of-solids',
    'Surface area & scale factor':                                                    'surface-area-scale-factor',
    'Lines and angles':                                                               'lines-and-angles',
    'Triangle properties':                                                            'triangle-properties',
    'Pythagorean & special right triangles':                                          'pythagorean-special-triangles',
    'Right triangle trigonometry':                                                    'right-triangle-trig',
    'Circles':                                                                        'circles',
}

# --- LaTeX / markdown stem conversion --------------------------------

def strip_latex_delims(s: str) -> str:
    # display first, then inline (don't let $$ get caught as two $).
    s = re.sub(r'\$\$(.+?)\$\$', r'\1', s, flags=re.DOTALL)
    s = re.sub(r'(?<!\\)\$(.+?)(?<!\\)\$', r'\1', s, flags=re.DOTALL)
    s = s.replace(r'\$', '$')
    return s


def convert_latex_commands(s: str) -> str:
    # \dfrac and \tfrac both want a renderer-native \frac.
    s = s.replace(r'\dfrac', r'\frac')
    s = s.replace(r'\tfrac', r'\frac')

    # \text{...} is just typographic emphasis on a non-math run — drop the
    # wrapper and keep the inner text. Nested braces are rare in the
    # source we've seen; if they appear, the outer \text{...} still
    # unwraps cleanly via a non-greedy match.
    s = re.sub(r'\\text\{([^{}]*)\}', r'\1', s)

    # ^\circ is always the degree symbol in SAT geometry — collapse it
    # before generic command processing so we get `30°` instead of `30^°`
    # (the renderer's superscript regex only matches digit bodies).
    s = re.sub(r'\^\\circ\b', '°', s)
    s = re.sub(r'\^\{\\circ\}', '°', s)
    # \overline runs AFTER the boundary-aware table below so a source
    # like `\overline{DE}\parallel\overline{BC}` first becomes
    # `\overline{DE}∥\overline{BC}` (parallel before overline-strip) and
    # then `DE∥BC`. If we stripped overline first we'd get `DE\parallelBC`
    # with no whitespace, and the boundary check on `\parallel` would
    # then fail because the next char (`B`) is a letter.

    # Order matters: every entry uses a regex with a trailing
    # (?![A-Za-z]) lookahead so a *prefix* command (\ge) never eats the
    # tail of a longer one (\geq). LONGEST-FIRST ordering inside this
    # list is a belt — the lookahead is the suspenders.
    repl = [
        (r'\Rightarrow',  '⇒'),
        (r'\Leftarrow',   '⇐'),
        (r'\Leftrightarrow', '⇔'),
        (r'\rightarrow',  '→'),
        (r'\leftarrow',   '←'),
        (r'\leftrightarrow', '↔'),
        (r'\approx',      '≈'),
        (r'\ldots',       '...'),
        (r'\cdots',       '⋯'),
        (r'\infty',       '∞'),
        (r'\geq',         '≥'),   # MUST come before \ge
        (r'\leq',         '≤'),   # MUST come before \le
        (r'\neq',         '≠'),   # MUST come before \ne
        (r'\cdot',        '·'),
        (r'\times',       '×'),
        (r'\div',         '÷'),
        (r'\pm',          '±'),
        (r'\mp',          '∓'),
        (r'\ge',          '≥'),
        (r'\le',          '≤'),
        (r'\ne',          '≠'),
        (r'\to',          '→'),
        (r'\sim',         '∼'),
        (r'\circ',        '°'),
        # Greek letters used in SAT geometry/trig sources.
        (r'\theta',       'θ'),
        (r'\alpha',       'α'),
        (r'\beta',        'β'),
        (r'\gamma',       'γ'),
        (r'\delta',       'δ'),
        (r'\Delta',       'Δ'),
        (r'\phi',         'φ'),
        (r'\omega',       'ω'),
        (r'\Omega',       'Ω'),
        (r'\mu',          'μ'),
        (r'\lambda',      'λ'),
        (r'\sigma',       'σ'),
        (r'\Sigma',       'Σ'),
        (r'\pi',          'π'),
        # Trig / function names — strip the backslash so they render as
        # plain letters. The renderer treats them as ordinary identifiers.
        (r'\sin',         'sin'),
        (r'\cos',         'cos'),
        (r'\tan',         'tan'),
        (r'\csc',         'csc'),
        (r'\sec',         'sec'),
        (r'\cot',         'cot'),
        (r'\log',         'log'),
        (r'\ln',          'ln'),
        (r'\exp',         'exp'),
        # Sizing modifiers — strip entirely. \left( and \right) come
        # with their literal brackets so the parens still render.
        (r'\left',        ''),
        (r'\right',       ''),
        (r'\bigg',        ''),
        (r'\Bigg',        ''),
        (r'\big',         ''),
        (r'\Big',         ''),
        # Script lowercase l — used as a variable in geometry sources.
        (r'\ell',         'ℓ'),
        # \dots / \dotsc / \dotsb — synonyms of \ldots.
        (r'\dotsc',       '...'),
        (r'\dotsb',       '...'),
        (r'\dots',        '...'),
    ]
    # Geometry symbols. \parallel and \perp can be followed by a backslash
    # (when used adjacent to \overline{...}) so the (?![A-Za-z]) lookahead
    # still passes — backslash isn't a letter.
    repl_geom = [
        (r'\parallel',    '∥'),
        (r'\nparallel',   '∦'),
        (r'\perp',        '⊥'),
        (r'\angle',       '∠'),
        (r'\triangle',    '△'),
        (r'\mid',         '|'),
    ]
    for k, v in repl_geom + repl:
        # Match command then anything that's NOT a letter — this is what
        # protects \ge from matching inside \geq (g e q → q is a letter).
        # Re-escape backslash for the regex.
        pattern = re.escape(k) + r'(?![A-Za-z])'
        s = re.sub(pattern, v, s)

    # Thin-space commands have no trailing letter-boundary issue (they
    # are punctuation), so handle them with literal replace after the
    # boundary-aware pass.
    for k, v in [(r'\,', ' '), (r'\;', ' '), (r'\:', ' '), (r'\!', '')]:
        s = s.replace(k, v)

    # \overline{X} → X (drop wrapper). Runs LAST so a source like
    # `\overline{DE}\parallel\overline{BC}` was already turned into
    # `\overline{DE}∥\overline{BC}` by the geometry pass above, and then
    # collapses cleanly to `DE∥BC` here.
    s = re.sub(r'\\overline\{([^{}]*)\}', r'\1', s)
    return s


def strip_spr_hint(s: str) -> str:
    return re.sub(
        r'^\s*>\s*\*?Enter your answer.*?\*?\s*$',
        '',
        s,
        flags=re.IGNORECASE | re.MULTILINE,
    )


# --- Markdown table extraction ---------------------------------------

MD_TABLE_RE = re.compile(
    r'((?:^[ \t]*\|.*\|[ \t]*\n)+)'        # one or more pipe-rows
    r'(^[ \t]*\|[ \t]*:?-+:?[ \t]*(?:\|[ \t]*:?-+:?[ \t]*)+\|?[ \t]*\n)'  # separator
    r'((?:^[ \t]*\|.*\|[ \t]*(?:\n|$))+)', # one or more data rows
    re.MULTILINE,
)


def split_md_row(line: str) -> list:
    # Strip leading/trailing pipes, then split.
    line = line.strip()
    if line.startswith('|'): line = line[1:]
    if line.endswith('|'):   line = line[:-1]
    return [c.strip() for c in line.split('|')]


def parse_markdown_table(header_block: str, sep_line: str, body_block: str) -> dict:
    header_lines = [ln for ln in header_block.splitlines() if ln.strip()]
    body_lines   = [ln for ln in body_block.splitlines() if ln.strip()]
    headers = split_md_row(header_lines[-1])
    rows = [split_md_row(ln) for ln in body_lines]

    def clean(cell: str) -> str:
        return convert_latex_commands(strip_latex_delims(cell)).strip()

    headers = [clean(c) for c in headers]
    rows = [[clean(c) for c in r] for r in rows]

    def looks_like_var_label(c: str) -> bool:
        return bool(re.match(r'^[A-Za-z](?:[_^].+)?$', c))

    transposed = (
        looks_like_var_label(headers[0]) and
        all(looks_like_var_label(r[0]) for r in rows)
    )

    if transposed:
        all_rows = [headers] + rows
        all_rows = [[try_num(c) for c in r] for r in all_rows]
        return {
            'rows': all_rows,
            'firstColIsHeader': True,
        }
    else:
        rows = [[try_num(c) for c in r] for r in rows]
        return {
            'headers': headers,
            'rows': rows,
        }


def try_num(s):
    if not isinstance(s, str): return s
    t = s.strip()
    if not t: return t
    try:
        if re.match(r'^-?\d+$', t): return int(t)
        if re.match(r'^-?\d+\.\d+$', t): return float(t)
    except Exception:
        pass
    return s


def extract_table_from_stem(stem: str):
    m = MD_TABLE_RE.search(stem)
    if not m: return stem, None
    table = parse_markdown_table(m.group(1), m.group(2), m.group(3))
    cleaned = stem[:m.start()].rstrip() + '\n\n' + stem[m.end():].lstrip()
    cleaned = re.sub(r'\n{3,}', '\n\n', cleaned).strip()
    return cleaned, table


def convert_text(s: str) -> str:
    if s is None: return ''
    s = strip_spr_hint(s)
    s = strip_latex_delims(s)
    s = convert_latex_commands(s)
    s = re.sub(r'\n{3,}', '\n\n', s).strip()
    return s


# --- Dedup -----------------------------------------------------------

def _normalize(s: str) -> str:
    if not s: return ''
    s = s.lower()
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'[^a-z0-9]', '', s)
    return s


def stem_hash(stem: str, table: dict = None) -> str:
    """Normalize stem + table to a single SHA1 hash. Mirrors
    `normalizeStem(stem) + tableSignature(table)` in app.js.

    Why include the table? The bank's `stem` field has any markdown
    table extracted out into `q.table`, so a hash computed from
    `stem` alone would collide on questions that share the same
    prose but ship different tables (e.g. "What is the rate of change
    of the function?" with different value rows). We hash the
    canonical stem AND a stable text dump of the table cells so two
    questions are duplicates iff they're truly identical content.

    The input `stem` can be either:
      • a raw upload-schema question (LaTeX-delimited, markdown table
        still embedded) — we extract the table internally before
        hashing, so the upload-side and bank-side hash the same.
      • an already-converted bank stem with the table passed
        separately.
    """
    if not stem: return ''
    canonical = convert_text(stem)
    # If the caller didn't separate the table, try extracting it
    # ourselves so an upload's raw question hashes identically to its
    # post-emit (stem, table) pair.
    if table is None:
        canonical, table = extract_table_from_stem(canonical)
    table_part = ''
    if table and table.get('rows'):
        # Stable, JSON-y dump of rows + headers (if present).
        parts = []
        if 'headers' in table:
            parts.append('|'.join(str(c) for c in table['headers']))
        for r in table['rows']:
            parts.append('|'.join(str(c) for c in r))
        table_part = '||'.join(parts)
    combined = _normalize(canonical) + '##' + _normalize(table_part)
    return hashlib.sha1(combined.encode('utf-8')).hexdigest()


# Pull stem hashes out of every existing bank file. We grab each
# stem AND its table block (if any) so the dedup hash sees the same
# data on both sides.
STEM_RE = re.compile(r"stem:\s*'((?:\\.|[^'])*)'")
SOURCE_ID_RE = re.compile(r"sourceId:\s*'([^']+)'")
ID_RE = re.compile(r"^\s*id:\s*'([^']+)'", re.M)

# A `table: { ... }` block. Match opening brace, then balanced-ish
# scan until the matching close. We assume tables don't contain `}`
# inside a string (true for our generator's output).
TABLE_BLOCK_RE = re.compile(r"table:\s*\{")


def js_unescape(s: str) -> str:
    """Reverse js_string()'s escaping for accurate hashing."""
    out = []
    i = 0
    while i < len(s):
        c = s[i]
        if c == '\\' and i + 1 < len(s):
            n = s[i + 1]
            if   n == 'n':  out.append('\n')
            elif n == 't':  out.append('\t')
            elif n == "'":  out.append("'")
            elif n == '"':  out.append('"')
            elif n == '\\': out.append('\\')
            else:           out.append(n)
            i += 2
        else:
            out.append(c)
            i += 1
    return ''.join(out)


def _balanced_slice(seg: str, open_pos: int, open_ch: str, close_ch: str) -> str:
    """Return the substring of `seg` covering a balanced
    open_ch..close_ch starting at `open_pos`. Quote-aware so JS
    single-quoted strings containing the brackets don't unbalance
    the scan. Returns '' if no matching close is found."""
    if open_pos >= len(seg) or seg[open_pos] != open_ch:
        return ''
    depth = 0
    in_str = False
    i = open_pos
    while i < len(seg):
        c = seg[i]
        if in_str:
            if c == '\\' and i + 1 < len(seg):
                i += 2; continue
            if c == "'":
                in_str = False
            i += 1; continue
        if c == "'":
            in_str = True
            i += 1; continue
        if c == open_ch:
            depth += 1
        elif c == close_ch:
            depth -= 1
            if depth == 0:
                return seg[open_pos:i + 1]
        i += 1
    return ''


def _extract_table_after(text: str, start: int, window: int = 4000) -> dict:
    """Look for a `table: { ... }` block in the next `window` chars
    after `start`, BUT only within the current question's object —
    we stop at the next `id: '...'` line. Without that boundary we
    would grab the table from a later sibling question and assign it
    to a no-table question, fatally poisoning the dedup hash.

    Uses balanced brace/bracket scans so the nested `[...]` row
    arrays don't break parsing — earlier non-greedy regexes were
    stopping at the first closing bracket and emitting empty `rows`."""
    seg = text[start:start + window]
    # Truncate at the next `id: '...'` so we never reach into the next
    # bank entry.
    next_id = re.search(r"\n\s*id:\s*'", seg)
    if next_id:
        seg = seg[:next_id.start()]
    m = TABLE_BLOCK_RE.search(seg)
    if not m: return None
    brace_open = m.end() - 1  # position of `{`
    block_text = _balanced_slice(seg, brace_open, '{', '}')
    if not block_text: return None

    table = {}
    # rows: [ ... ] — find the opening `[` and slice balanced.
    rm = re.search(r'rows:\s*\[', block_text)
    if rm:
        rows_slice = _balanced_slice(block_text, rm.end() - 1, '[', ']')
        if rows_slice:
            inner = rows_slice[1:-1]  # drop outer [ ]
            rows = []
            j = 0
            while j < len(inner):
                if inner[j] == '[':
                    row_slice = _balanced_slice(inner, j, '[', ']')
                    if not row_slice: break
                    cells_src = row_slice[1:-1]
                    cells = []
                    for cell_match in re.finditer(
                        r"'((?:\\.|[^'])*)'|(-?\d+(?:\.\d+)?)",
                        cells_src,
                    ):
                        if cell_match.group(1) is not None:
                            cells.append(js_unescape(cell_match.group(1)))
                        else:
                            cells.append(cell_match.group(2))
                    rows.append(cells)
                    j += len(row_slice)
                else:
                    j += 1
            table['rows'] = rows
    # headers: [ ... ]  (flat array — single-level)
    headers_match = re.search(r'headers:\s*\[([^\]]*)\]', block_text)
    if headers_match:
        hs = []
        for h_match in re.finditer(
            r"'((?:\\.|[^'])*)'|(-?\d+(?:\.\d+)?)",
            headers_match.group(1),
        ):
            hs.append(js_unescape(h_match.group(1)) if h_match.group(1) is not None else h_match.group(2))
        table['headers'] = hs
    if re.search(r'firstColIsHeader:\s*true', block_text):
        table['firstColIsHeader'] = True
    return table


def collect_existing_stems(globs: list, exclude: list = None) -> set:
    """Build the dedup baseline by scraping `stem: '...'` strings out of
    bank .js files. Files in `exclude` (absolute paths) are skipped so
    a re-run that overwrites its own output doesn't compute dedup
    against itself. We also look ahead for an attached `table: { ... }`
    block so the hash matches what the source upload would produce."""
    seen = set()
    files = []
    for g in globs:
        files.extend(glob.glob(g))
    exclude_set = set(str(Path(p).resolve()) for p in (exclude or []))
    for fp in sorted(set(files)):
        if str(Path(fp).resolve()) in exclude_set:
            continue
        try:
            text = open(fp).read()
        except Exception:
            continue
        for m in STEM_RE.finditer(text):
            stem = js_unescape(m.group(1))
            table = _extract_table_after(text, m.end())
            seen.add(stem_hash(stem, table))
    return seen


# --- JS escape -------------------------------------------------------

def js_string(s: str) -> str:
    return "'" + (s.replace('\\', '\\\\')
                    .replace("'", "\\'")
                    .replace('\n', '\\n')
                    .replace('\r', '')) + "'"


def js_table(t: dict) -> str:
    parts = ['{']
    if 'caption' in t:
        parts.append(f'      caption: {js_string(t["caption"])},')
    if 'headers' in t:
        hs = ', '.join(js_string(h) if isinstance(h, str) else str(h) for h in t['headers'])
        parts.append(f'      headers: [{hs}],')
    rows_lines = []
    for r in t['rows']:
        cells = ', '.join(js_string(c) if isinstance(c, str) else str(c) for c in r)
        rows_lines.append(f'        [{cells}]')
    parts.append('      rows: [')
    parts.append(',\n'.join(rows_lines))
    parts.append('      ],')
    if t.get('firstColIsHeader'):
        parts.append('      firstColIsHeader: true,')
    if t.get('totalsRow'):
        parts.append('      totalsRow: true,')
    parts.append('    }')
    return '\n'.join(parts)


def emit_question(q: dict, seq: int, id_prefix: str, import_id: str = '') -> str:
    new_id = f'{id_prefix}-{seq:03d}'
    topic = TOPIC_SLUG[q['topic']]

    raw_stem = q['question']
    raw_expl = q['explanation']

    pre_stem = convert_latex_commands(strip_latex_delims(strip_spr_hint(raw_stem)))
    cleaned, table = extract_table_from_stem(pre_stem)
    stem = re.sub(r'\n{3,}', '\n\n', cleaned).strip()
    explanation = convert_text(raw_expl)

    lines = [
        '  {',
        f"    id: '{new_id}',",
        "    testType: 'SAT',",
        "    section: 'math',",
        f"    topic: '{topic}',",
        f"    difficulty: {q['difficulty']},",
        "    state: 'live',",
        f"    sourceId: '{q['id']}',",
    ]
    if import_id:
        lines.append(f"    importId: '{import_id}',")
    lines.append(f"    stem: {js_string(stem)},")
    if table:
        lines.append(f'    table: {js_table(table)},')

    # chart_svg → q.svg pass-through (only when non-empty).
    chart_svg = (q.get('chart_svg') or '').strip()
    if chart_svg:
        # Keep on a single line; the renderer doesn't care about
        # newlines but our linter / diff readability does. Strip
        # inter-tag whitespace runs but preserve content.
        compact = re.sub(r'\n\s*', '', chart_svg)
        lines.append(f'    svg: {js_string(compact)},')

    if q['format'] == 'MCQ':
        labels = [c['label'] for c in q['choices']]
        texts  = [convert_text(c['text']) for c in q['choices']]
        ans_idx = labels.index(q['answer'])
        choices_js = ', '.join(js_string(t) for t in texts)
        lines.append(f'    choices: [{choices_js}],')
        lines.append(f'    answer: {ans_idx},')
    else:
        lines.append('    choices: [],')
        lines.append(f'    answer: {js_string(str(q["answer"]))},')

    lines.append(f'    explanation: {js_string(explanation)}')
    lines.append('  }')
    return '\n'.join(lines)


def main():
    ap = argparse.ArgumentParser(description='Upload-schema → bank-schema converter')
    ap.add_argument('--input',  type=Path, default=DEFAULT_INPUT,
                    help='upload-schema questions.json path')
    ap.add_argument('--output', type=Path, default=DEFAULT_OUTPUT,
                    help='output bank-schema .js path')
    ap.add_argument('--existing-stems', action='append', default=[],
                    help='glob(s) of existing bank .js files to dedup against. '
                         'Pass multiple --existing-stems flags to add more.')
    ap.add_argument('--id-prefix', default='q-satm-im',
                    help='id prefix for emitted questions (default q-satm-im)')
    ap.add_argument('--header-label', default='SAT Math',
                    help='label used in the file header comment')
    ap.add_argument('--import-id', default='',
                    help='ID written into the STL_IMPORTS registry and stamped on '
                         'every emitted question via the importId field. The Imports '
                         'admin tab keys on this. Defaults to the output filename '
                         'stem if omitted.')
    ap.add_argument('--import-label', default='',
                    help='human-readable label for the STL_IMPORTS registry entry '
                         '(shown in the Imports admin tab). Defaults to --header-label.')
    ap.add_argument('--dedup-report', type=Path, default=None,
                    help='if set, write a JSON dedup report to this path')
    args = ap.parse_args()
    # Default import_id from the output filename: questions-sat-math-2026-05-25.js
    # → 'sat-math-2026-05-25'. Stable and human-readable.
    if not args.import_id:
        stem = args.output.stem  # filename without extension
        args.import_id = re.sub(r'^questions-(sat-math-)?(import-)?', '', stem)
        args.import_id = args.import_id or stem
    if not args.import_label:
        args.import_label = args.header_label + ' — ' + args.import_id

    data = json.loads(args.input.read_text())
    print(f'Loaded {len(data)} questions from {args.input}', file=sys.stderr)

    # Exclude our own output from the baseline — otherwise re-runs that
    # overwrite the same file would compute dedup against themselves and
    # nuke nearly every question.
    existing = collect_existing_stems(args.existing_stems, exclude=[args.output])
    if args.existing_stems:
        print(f'Dedup baseline: {len(existing)} unique stem hashes from '
              f'{len(args.existing_stems)} glob(s)', file=sys.stderr)

    # Group by topic for readable output, while tracking dedup.
    by_topic = {}
    skipped_dupes = []   # (source_id, topic) of skipped uploads
    skipped_unmapped = []
    intra_seen = set()   # also dedup within the upload itself
    intra_dupes = []

    for q in data:
        if q['topic'] not in TOPIC_SLUG:
            skipped_unmapped.append((q['id'], q['topic']))
            continue
        h = stem_hash(q['question'])
        if h in existing:
            skipped_dupes.append((q['id'], q['topic']))
            continue
        if h in intra_seen:
            intra_dupes.append((q['id'], q['topic']))
            continue
        intra_seen.add(h)
        by_topic.setdefault(q['topic'], []).append(q)

    seq = 0
    table_count = 0
    svg_count = 0
    blocks = []
    for long_topic in TOPIC_SLUG:
        bucket = by_topic.get(long_topic, [])
        if not bucket: continue
        slug = TOPIC_SLUG[long_topic]
        block_lines = [
            '  // ============================================================',
            f'  // {long_topic}',
            f'  //   slug: {slug}   |   {len(bucket)} questions',
            '  // ============================================================',
        ]
        for q in bucket:
            seq += 1
            entry = emit_question(q, seq, args.id_prefix, args.import_id)
            if '    table: {' in entry: table_count += 1
            if '    svg: ' in entry:    svg_count += 1
            block_lines.append(entry)
            block_lines.append(',')
        blocks.append('\n'.join(block_lines))

    body = '\n\n'.join(blocks)
    body = re.sub(r',(\s*)$', r'\1', body)

    # Today's date — stamped into the registry so the Imports admin tab
    # can show when each batch landed.
    from datetime import date as _date
    generated_at = _date.today().isoformat()

    header = (
        '/**\n'
        f' * {args.header_label} — generated import batch.\n'
        ' *\n'
        f' * {seq} questions, {svg_count} with chart SVGs, {table_count} with markdown tables.\n'
        f' * {len(skipped_dupes)} skipped as duplicates of existing bank entries.\n'
        f' * {len(intra_dupes)} skipped as duplicates within this upload.\n'
        f' * {len(skipped_unmapped)} skipped: topic not in TOPIC_SLUG.\n'
        ' *\n'
        f' * Import id: {args.import_id}\n'
        f' * Source:    {args.input.name}\n'
        ' * Each question carries `importId` (joins to STL_IMPORTS) and `sourceId`\n'
        ' * (Q1, Q2, ... — roundtrip back to the source if we regenerate).\n'
        ' *\n'
        ' * Generated by web/tools/convert_upload_questions.py — the Python\n'
        ' * source of truth for upload-schema → bank-schema mapping. Mirrors\n'
        ' * the in-app JS adapter `adaptUploadSchemaItem` in app.js so the\n'
        ' * admin paste/import flow converts and dedups identically.\n'
        ' */\n'
        '\'use strict\';\n'
        '\n'
        '// Self-register this import in the global registry. The admin\n'
        '// Imports tab reads STL_IMPORTS to build its card list; the\n'
        '// assembleBank() pipeline reads it to support "delete import"\n'
        '// cascades (see stl_imports_deleted localStorage key in app.js).\n'
        'window.STL_IMPORTS = (window.STL_IMPORTS || []).concat([{\n'
        f"  id:          '{args.import_id}',\n"
        f"  label:       {js_string(args.import_label)},\n"
        f"  source:      '{args.input.name}',\n"
        f"  generatedAt: '{generated_at}',\n"
        f"  file:        '{args.output.name}',\n"
        "  testType:    'SAT',\n"
        "  section:     'math',\n"
        f"  count:       {seq},\n"
        '}]);\n'
        '\n'
        'window.STL_QUESTIONS_AI = (window.STL_QUESTIONS_AI || []).concat([\n'
    )
    footer = '\n]);\n'

    args.output.write_text(header + body + footer)
    print(f'Wrote {seq} questions ({table_count} with q.table, {svg_count} with svg) to {args.output}', file=sys.stderr)
    print(f'  Skipped {len(skipped_dupes)} cross-bank duplicates', file=sys.stderr)
    print(f'  Skipped {len(intra_dupes)} intra-upload duplicates', file=sys.stderr)
    print(f'  Skipped {len(skipped_unmapped)} unmapped-topic uploads', file=sys.stderr)

    if args.dedup_report:
        report = {
            'input':         str(args.input),
            'output':        str(args.output),
            'total_input':   len(data),
            'emitted':       seq,
            'tables':        table_count,
            'svgs':          svg_count,
            'skipped_cross_bank': [{'id': i, 'topic': t} for i, t in skipped_dupes],
            'skipped_intra_upload': [{'id': i, 'topic': t} for i, t in intra_dupes],
            'skipped_unmapped':     [{'id': i, 'topic': t} for i, t in skipped_unmapped],
            'baseline_size': len(existing),
        }
        args.dedup_report.write_text(json.dumps(report, indent=2))
        print(f'  Wrote dedup report → {args.dedup_report}', file=sys.stderr)


if __name__ == '__main__':
    main()
