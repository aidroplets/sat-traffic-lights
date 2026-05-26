/**
 * SAT Traffic Lights — question bank (human-curated).
 *
 * Each question:
 *   id          string, unique
 *   section     'math' | 'reading' | 'writing'
 *   difficulty  'easy' | 'medium' | 'hard' | 'insane'
 *   topic       short tag, used by the regenerate-from-misses step
 *   passage     optional context (reading / data questions)
 *   stem        the question itself
 *   choices     array of strings — OMIT (or empty) for grid-in
 *   answer      number index into choices, OR string for grid-in
 *   explanation 1–3 sentence walkthrough shown in review
 *
 * File-level metadata (window.STL_QUESTIONS_HUMAN_DEFAULTS below)
 * applies to every question in this file. Per-question overrides are
 * supported. The runtime loader merges defaults → base → admin
 * overrides (from localStorage) before serving questions. See
 * `loadQuestions()` in app.js.
 *
 * Provenance contract:
 *   • This file is for questions a HUMAN provided / curated.
 *   • Sibling file questions-generated.js holds AI-generated content.
 *   • Both are loaded into a single merged bank; the admin tool can
 *     filter by source.
 *
 * Difficulty rubric (matches the score-tier system):
 *   easy   ≤ 500 SAT level — one-step, clean arithmetic
 *   medium 501–600 — 2–3 steps, picks the right setup from a word problem
 *   hard   601–700 — multi-step / non-obvious / specific theorem
 *   insane 701–800 — perfect-scorer-tier; the trick is the whole problem
 */

// Defaults applied to every question in this file. Per-question
// fields override these (e.g., a single question manually marked
// state: 'unpublished' will keep that value through the merge).
window.STL_QUESTIONS_HUMAN_DEFAULTS = {
  source: 'human-curated',
  uploader: 'joshua@sortino.co',
  state: 'live',                // ready for the live quiz pool
  createdAt: '2026-04-27',
  reviewStatus: 'verified',     // human-curated = human-verified by definition
};
// Helper: produce a sampled curve as `[{x,y},...]` for use in line charts
// where the visual is a continuous function (rational, exponential, etc.)
// rather than discrete data points. n controls smoothness; 60 is plenty
// for the SAT-scale charts in this bank.
const _curve = (fn, xMin, xMax, n) => {
  n = n || 60;
  const out = new Array(n + 1);
  for (let i = 0; i <= n; i++) {
    const x = xMin + (xMax - xMin) * (i / n);
    out[i] = { x: x, y: fn(x) };
  }
  return out;
};

// The raw human-curated array. Renamed from STL_QUESTIONS to make
// the merge layer in app.js the single source of truth (so future
// admin overrides + AI-generated questions can blend in cleanly).
// app.js reads this + STL_QUESTIONS_AI and assembles STL_QUESTIONS.
window.STL_QUESTIONS_HUMAN = [

  // =============== Q-7006 ===============
  {
    id: 'q-7006', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'On Saturday afternoon, Armand sent m text messages each hour for 5 hours, and Tyrone sent p text messages each hour for 4 hours. Which of the following represents the total number of messages sent by Armand and Tyrone on Saturday afternoon?',
    choices: ['9mp', '20mp', '5m + 4p', '4m + 5p'],
    answer: 2,
    explanation: 'Armand sent 5m messages (m per hour × 5 hours). Tyrone sent 4p messages (p per hour × 4 hours). Total: 5m + 4p.'
  },

  // =============== Q-7008 ===============
  {
    id: 'q-7008', section: 'math', difficulty: 'easy', topic: 'linear-equations',
    stem: 'If (x − 1)/3 = k and k = 3, what is the value of x?',
    choices: ['2', '4', '9', '10'],
    answer: 3,
    explanation: 'Substitute k = 3: (x − 1)/3 = 3, so x − 1 = 9, giving x = 10.'
  },

  // =============== Q-7009 ===============
  {
    id: 'q-7009', section: 'math', difficulty: 'easy', topic: 'polynomials',
    stem: '(x²y − 3y² + 5xy²) − (−x²y + 3xy² − 3y²). Which of the following is equivalent to the expression above?',
    choices: ['4x²y²', '8xy² − 6y²', '2x²y + 2xy²', '2x²y + 8xy² − 6y²'],
    answer: 2,
    explanation: 'Distribute the negative sign: x²y − 3y² + 5xy² + x²y − 3xy² + 3y² = 2x²y + 2xy².'
  },

  // =============== Q-7010 (grid-in) ===============
  {
    id: 'q-7010', section: 'math', difficulty: 'easy', topic: 'quadratics',
    stem: 'If t > 0 and t² − 4 = 0, what is the value of t?',
    answer: '2',
    explanation: 't² = 4 gives t = ±2. The constraint t > 0 picks t = 2.'
  },

  // =============== Q-7011 (grid-in) ===============
  {
    id: 'q-7011', section: 'math', difficulty: 'medium', topic: 'systems',
    stem: 'x + y = −9 and x + 2y = −25. According to the system of equations above, what is the value of x?',
    answer: '7',
    explanation: 'Subtract the first equation from the second: y = −16. Plug back in: x − 16 = −9, so x = 7.'
  },

  // =============== Q-7012 ===============
  {
    id: 'q-7012', section: 'math', difficulty: 'easy', topic: 'proportions',
    stem: 'If y = kx, where k is a constant, and y = 24 when x = 6, what is the value of y when x = 5?',
    choices: ['6', '15', '20', '23'],
    answer: 2,
    explanation: 'Find k: 24 = 6k, so k = 4. Then y = 4 · 5 = 20.'
  },

  // =============== Q-7013 (inline SVG — was parallel-lines figure) ===============
  // Two horizontal parallel lines (ℓ at top, m at bottom) crossed by two
  // slanted parallel transversals (s and t, both with the same negative
  // slope going up-and-to-the-right). ∠1 sits at the top-right intersection
  // (t ∩ ℓ); ∠2 sits at the bottom-left intersection (s ∩ m), in the upper-
  // left region of that crossing. The angles are co-exterior to each other
  // across the parallel system → supplementary → ∠2 = 180° − 35° = 145°.
  {
    id: 'q-7013', section: 'math', difficulty: 'medium', topic: 'geometry',
    svg:
      '<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img"' +
      ' aria-label="Two pairs of parallel lines crossing, with angles 1 and 2 marked.">' +
        // horizontal lines (ℓ, m)
        '<line x1="40" y1="80" x2="320" y2="80" stroke="currentColor" stroke-width="1.6"/>' +
        '<line x1="40" y1="170" x2="320" y2="170" stroke="currentColor" stroke-width="1.6"/>' +
        // slanted parallel transversals (s on the left, t on the right)
        '<line x1="80" y1="225" x2="220" y2="20" stroke="currentColor" stroke-width="1.6"/>' +
        '<line x1="180" y1="225" x2="320" y2="20" stroke="currentColor" stroke-width="1.6"/>' +
        // line labels (italic + lavender via .stl-svg-var)
        '<text x="335" y="84" class="stl-svg-var">ℓ</text>' +
        '<text x="335" y="174" class="stl-svg-var">m</text>' +
        '<text x="220" y="14" class="stl-svg-var">s</text>' +
        '<text x="320" y="14" class="stl-svg-var">t</text>' +
        // angle labels — placed in the angle interior the SAT image marks
        '<text x="278" y="68" class="stl-svg-num">1</text>' +
        '<text x="105" y="158" class="stl-svg-num">2</text>' +
      '</svg>',
    stem: 'In the figure, lines ℓ and m are parallel, and lines s and t are parallel. If the measure of ∠1 is 35°, what is the measure of ∠2?',
    choices: ['35°', '55°', '70°', '145°'],
    answer: 3,
    explanation: '∠1 and ∠2 are co-interior (same-side interior) angles formed by the parallel lines, so they are supplementary: ∠2 = 180° − 35° = 145°.'
  },

  // =============== Q-7014 (4 choice scatterplots, no main figure) ===============
  // Originally a screenshot of four candidate scatterplots A–D illustrating
  // different correlation patterns. Now rendered live as four small Chart.js
  // scatter plots in a 2-col grid. The four patterns:
  //   A: weak / no association (cloud in upper-half)
  //   B: low-y cluster with a small uptick at the right end
  //   C: strong positive association (points trend up-right)
  //   D: strong negative association (points trend down-right) ← correct
  // Sample points are hand-picked to make the patterns visually
  // distinguishable at the mini-chart size; SAT print uses similar
  // schematic clouds rather than real measured data.
  {
    id: 'q-7014', section: 'math', difficulty: 'easy', topic: 'data-analysis',
    stem: 'Which of the following graphs best shows a strong negative association between d and t?',
    choices: ['Graph A', 'Graph B', 'Graph C', 'Graph D'],
    choiceCharts: [
      // A: scattered cloud in the upper half — weak / no clear trend
      {
        type: 'scatter', xLabel: 'd', yLabel: 't',
        xMin: 0, xMax: 8, xTicks: 2, yMin: 0, yMax: 10, yTicks: 2,
        datasets: [{
          kind: 'points',
          data: [
            { x: 1, y: 8 }, { x: 1, y: 7 }, { x: 2, y: 9 },
            { x: 2, y: 6 }, { x: 2, y: 5 }, { x: 3, y: 8 },
            { x: 3, y: 7 }, { x: 3, y: 6 }, { x: 3, y: 5 },
            { x: 4, y: 8 }, { x: 4, y: 7 }, { x: 4, y: 5 },
            { x: 5, y: 7 }, { x: 5, y: 6 }, { x: 5, y: 4 },
            { x: 6, y: 6 }, { x: 6, y: 5 }
          ]
        }]
      },
      // B: low cluster with a small rise at the right end — no real trend
      {
        type: 'scatter', xLabel: 'd', yLabel: 't',
        xMin: 0, xMax: 8, xTicks: 2, yMin: 0, yMax: 10, yTicks: 2,
        datasets: [{
          kind: 'points',
          data: [
            { x: 0.5, y: 1 }, { x: 1, y: 0.5 }, { x: 1, y: 1 },
            { x: 1.5, y: 1 }, { x: 2, y: 1.5 }, { x: 2, y: 1 },
            { x: 2.5, y: 0.5 }, { x: 3, y: 1 }, { x: 3.5, y: 0.5 },
            { x: 4, y: 1 }, { x: 4.5, y: 1 }, { x: 5, y: 2 },
            { x: 5.5, y: 2.5 }, { x: 6, y: 4 }
          ]
        }]
      },
      // C: strong positive association — points trend up and to the right
      {
        type: 'scatter', xLabel: 'd', yLabel: 't',
        xMin: 0, xMax: 8, xTicks: 2, yMin: 0, yMax: 10, yTicks: 2,
        datasets: [{
          kind: 'points',
          data: [
            { x: 1, y: 1 },   { x: 1.5, y: 2 }, { x: 2, y: 2.5 },
            { x: 2.5, y: 3 }, { x: 3, y: 3.5 }, { x: 3.5, y: 4 },
            { x: 4, y: 5 },   { x: 4.5, y: 5.5 }, { x: 5, y: 6 },
            { x: 5.5, y: 7 }, { x: 6, y: 7.5 }, { x: 6.5, y: 8 }
          ]
        }]
      },
      // D: strong negative association — points trend down and to the right (correct)
      {
        type: 'scatter', xLabel: 'd', yLabel: 't',
        xMin: 0, xMax: 8, xTicks: 2, yMin: 0, yMax: 10, yTicks: 2,
        datasets: [{
          kind: 'points',
          data: [
            { x: 1, y: 9 },   { x: 1.5, y: 8.5 }, { x: 2, y: 8 },
            { x: 2.5, y: 7.5 }, { x: 3, y: 7 }, { x: 3.5, y: 6 },
            { x: 4, y: 5.5 }, { x: 4.5, y: 4.5 }, { x: 5, y: 4 },
            { x: 5.5, y: 3 }, { x: 6, y: 2.5 }, { x: 6.5, y: 2 }
          ]
        }]
      }
    ],
    answer: 3,
    explanation: 'A strong negative association is a tight cloud of points trending downward from upper-left to lower-right. Graph D shows that pattern.'
  },

  // =============== Q-7015 ===============
  {
    id: 'q-7015', section: 'math', difficulty: 'easy', topic: 'inequalities',
    stem: 'Which of the following numbers is NOT a solution of the inequality 3x − 5 ≥ 4x − 3?',
    choices: ['−1', '−2', '−3', '−5'],
    answer: 0,
    explanation: 'Solve: 3x − 5 ≥ 4x − 3 simplifies to x ≤ −2. Test x = −1: 3(−1) − 5 = −8 and 4(−1) − 3 = −7. Since −8 is not ≥ −7, −1 is NOT a solution.'
  },

  // =============== Q-7016 (table — was histogram) ===============
  // The original figure was a histogram showing the seed-count distribution
  // for 12 apples. Same information presented as a frequency table here.
  {
    id: 'q-7016', section: 'math', difficulty: 'medium', topic: 'statistics',
    table: {
      caption: 'Number of seeds in each of 12 apples',
      headers: ['Number of seeds', 'Number of apples'],
      rows: [
        [3, 2],
        [5, 4],
        [6, 1],
        [7, 2],
        [9, 3]
      ]
    },
    stem: 'Based on the seed counts above, which is closest to the average (arithmetic mean) number of seeds per apple?',
    choices: ['4', '5', '6', '7'],
    answer: 2,
    explanation: 'Sum of seeds = 2(3) + 4(5) + 1(6) + 2(7) + 3(9) = 73. Mean = 73 ÷ 12 ≈ 6.08, closest to 6.'
  },

  // =============== Q-7018 (chart — was line-graph image) ===============
  {
    id: 'q-7018', section: 'math', difficulty: 'easy', topic: 'functions',
    chart: {
      type: 'line',
      title: 'Total Cost of Renting a Boat by the Hour',
      xLabel: 'Time (hours)',
      yLabel: 'Total cost (dollars)',
      xMin: 0, xMax: 5, xTicks: 1,
      yMin: 0, yMax: 22, yTicks: 2,
      datasets: [{
        kind: 'line',
        data: [
          { x: 0, y: 5 }, { x: 1, y: 8 }, { x: 2, y: 11 },
          { x: 3, y: 14 }, { x: 4, y: 17 }, { x: 5, y: 20 }
        ]
      }]
    },
    stem: 'The graph displays the total cost C, in dollars, of renting a boat for h hours. What does the C-intercept represent in the graph?',
    choices: [
      'The initial cost of renting the boat',
      'The total number of boats rented',
      'The total number of hours the boat is rented',
      'The increase in cost to rent the boat for each additional hour'
    ],
    answer: 0,
    explanation: 'The C-intercept is the value of C when h = 0 — the cost before any time has elapsed, i.e. the flat starting fee.'
  },

  // =============== Q-7019 (chart — was piecewise function image) ===============
  {
    id: 'q-7019', section: 'math', difficulty: 'medium', topic: 'functions',
    chart: {
      type: 'line',
      title: 'y = f(x)',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -6, xMax: 5, xTicks: 1,
      yMin: -3, yMax: 4, yTicks: 1,
      datasets: [{
        kind: 'line',
        data: [
          { x: -5, y: 1 }, { x: -3, y: -2 }, { x: 2, y: 3 }, { x: 4, y: 1 }
        ]
      }]
    },
    stem: 'The complete graph of the function f is shown. For what value of x is f(x) at its minimum?',
    choices: ['−5', '−3', '−2', '3'],
    answer: 1,
    explanation: 'The lowest point on the graph occurs at x = −3 (where y = −2).'
  },

  // =============== Q-7020 ===============
  {
    id: 'q-7020', section: 'math', difficulty: 'medium', topic: 'word-problem',
    stem: 'A food truck sells salads for $6.50 each and drinks for $2.00 each. The food truck\'s revenue from selling a total of 209 salads and drinks in one day was $836.50. How many salads were sold that day?',
    choices: ['77', '93', '99', '105'],
    answer: 1,
    explanation: 'Let s be salads, d drinks. s + d = 209 and 6.5s + 2d = 836.5. Substitute d = 209 − s: 6.5s + 2(209 − s) = 836.5 → 4.5s = 418.5 → s = 93.'
  },

  // =============== Q-7021 (chart — was line-graph image, grid-in) ===============
  {
    id: 'q-7021', section: 'math', difficulty: 'medium', topic: 'data-analysis',
    chart: {
      type: 'line',
      title: 'Portable Media Players Sold Worldwide, 2006–2011',
      xLabel: 'Year',
      yLabel: 'Number sold (millions)',
      xMin: 2005, xMax: 2012, xTicks: 1,
      yMin: 0, yMax: 180, yTicks: 20,
      datasets: [{
        kind: 'line',
        data: [
          { x: 2006, y: 50 }, { x: 2007, y: 60 }, { x: 2008, y: 100 },
          { x: 2009, y: 125 }, { x: 2010, y: 150 }, { x: 2011, y: 160 }
        ]
      }]
    },
    stem: 'According to the line graph, the number of portable media players sold in 2008 is what fraction of the number sold in 2011? (Enter as a fraction or decimal.)',
    answer: '0.625',
    explanation: 'From the graph: 2008 ≈ 100 million, 2011 ≈ 160 million. Fraction = 100/160 = 5/8 = 0.625.'
  },

  // =============== Q-7022 (svg — converted from image) ===============
  // Coordinate plane: x ∈ [-2, 9], y ∈ [-2, 9]. Two curves intersect at (4, 5).
  //   Linear:      y = -5x + 25, visible (3.2, 9) at top → (5.4, -2) at bottom
  //   Exponential: y = 2^(x-4) + 4, asymptote near y=4 on the left, exits the
  //                top-right around (6.32, 9)
  // Origin at svg (80, 245), 25 px per math unit.
  {
    id: 'q-7022', section: 'math', difficulty: 'medium', topic: 'systems',
    svg:
      '<svg viewBox="0 0 340 320" xmlns="http://www.w3.org/2000/svg" role="img"' +
      ' aria-label="Coordinate plane with a steep negatively-sloped line and an exponential curve. They intersect at (4, 5).">' +
        '<g stroke="currentColor" stroke-width="0.5" opacity="0.18">' +
          '<line x1="30"  y1="20" x2="30"  y2="295"/>' +
          '<line x1="55"  y1="20" x2="55"  y2="295"/>' +
          '<line x1="105" y1="20" x2="105" y2="295"/>' +
          '<line x1="130" y1="20" x2="130" y2="295"/>' +
          '<line x1="155" y1="20" x2="155" y2="295"/>' +
          '<line x1="180" y1="20" x2="180" y2="295"/>' +
          '<line x1="205" y1="20" x2="205" y2="295"/>' +
          '<line x1="230" y1="20" x2="230" y2="295"/>' +
          '<line x1="255" y1="20" x2="255" y2="295"/>' +
          '<line x1="280" y1="20" x2="280" y2="295"/>' +
          '<line x1="305" y1="20" x2="305" y2="295"/>' +
          '<line x1="30" y1="20"  x2="305" y2="20"/>' +
          '<line x1="30" y1="45"  x2="305" y2="45"/>' +
          '<line x1="30" y1="70"  x2="305" y2="70"/>' +
          '<line x1="30" y1="95"  x2="305" y2="95"/>' +
          '<line x1="30" y1="120" x2="305" y2="120"/>' +
          '<line x1="30" y1="145" x2="305" y2="145"/>' +
          '<line x1="30" y1="170" x2="305" y2="170"/>' +
          '<line x1="30" y1="195" x2="305" y2="195"/>' +
          '<line x1="30" y1="220" x2="305" y2="220"/>' +
          '<line x1="30" y1="270" x2="305" y2="270"/>' +
          '<line x1="30" y1="295" x2="305" y2="295"/>' +
        '</g>' +
        '<defs>' +
          '<marker id="stl-q7022-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
            '<path d="M0,0 L8,4 L0,8 z" fill="currentColor"/>' +
          '</marker>' +
        '</defs>' +
        '<line x1="30" y1="245" x2="320" y2="245" stroke="currentColor" stroke-width="1.4" marker-end="url(#stl-q7022-arrow)"/>' +
        '<line x1="80" y1="295" x2="80"  y2="12"  stroke="currentColor" stroke-width="1.4" marker-end="url(#stl-q7022-arrow)"/>' +
        '<text x="328" y="249" class="stl-svg-var">x</text>' +
        '<text x="74"  y="14"  class="stl-svg-var">y</text>' +
        '<text x="68"  y="259" class="stl-svg-num" font-style="italic">O</text>' +
        '<g text-anchor="middle">' +
          '<text x="30"  y="259" class="stl-svg-num">−2</text>' +
          '<text x="55"  y="259" class="stl-svg-num">−1</text>' +
          '<text x="105" y="259" class="stl-svg-num">1</text>' +
          '<text x="130" y="259" class="stl-svg-num">2</text>' +
          '<text x="155" y="259" class="stl-svg-num">3</text>' +
          '<text x="180" y="259" class="stl-svg-num">4</text>' +
          '<text x="205" y="259" class="stl-svg-num">5</text>' +
          '<text x="230" y="259" class="stl-svg-num">6</text>' +
          '<text x="255" y="259" class="stl-svg-num">7</text>' +
          '<text x="280" y="259" class="stl-svg-num">8</text>' +
          '<text x="305" y="259" class="stl-svg-num">9</text>' +
        '</g>' +
        '<g text-anchor="end">' +
          '<text x="73" y="299" class="stl-svg-num">−2</text>' +
          '<text x="73" y="274" class="stl-svg-num">−1</text>' +
          '<text x="73" y="224" class="stl-svg-num">1</text>' +
          '<text x="73" y="199" class="stl-svg-num">2</text>' +
          '<text x="73" y="174" class="stl-svg-num">3</text>' +
          '<text x="73" y="149" class="stl-svg-num">4</text>' +
          '<text x="73" y="124" class="stl-svg-num">5</text>' +
          '<text x="73" y="99"  class="stl-svg-num">6</text>' +
          '<text x="73" y="74"  class="stl-svg-num">7</text>' +
          '<text x="73" y="49"  class="stl-svg-num">8</text>' +
          '<text x="73" y="24"  class="stl-svg-num">9</text>' +
        '</g>' +
        '<line x1="160" y1="20" x2="215" y2="295" stroke="currentColor" stroke-width="1.8"/>' +
        '<path d="M30,144.6 L42.5,144.4 L55,144.2 L67.5,143.9 L80,143.4 ' +
                'L92.5,142.8 L105,141.9 L117.5,140.6 L130,138.75 L142.5,136.2 ' +
                'L155,132.5 L167.5,127.3 L180,120 L192.5,109.6 L205,95 ' +
                'L217.5,74.3 L230,45 L238,20" ' +
              'fill="none" stroke="currentColor" stroke-width="1.8"/>' +
      '</svg>',
    stem: 'The graph shows a system of one linear equation and one nonlinear equation. What is the solution (x, y) to this system?',
    choices: ['(0, 0)', '(0, 4)', '(4, 5)', '(5, 0)'],
    answer: 2,
    explanation: 'A solution to the system is a point that lies on both curves. Reading the graph, the line and the exponential curve cross at (4, 5).'
  },

  // =============== Q-7023 ===============
  {
    id: 'q-7023', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'On the first day of a semester, a film club has 90 members. Each day after the first day, 10 new members join. If no one leaves, how many total members will the club have 4 days after the first day?',
    choices: ['400', '130', '94', '90'],
    answer: 1,
    explanation: 'Starting members: 90. New members over 4 days: 10 × 4 = 40. Total = 90 + 40 = 130.'
  },

  // =============== Q-7024 (chart — was linear-function image) ===============
  {
    id: 'q-7024', section: 'math', difficulty: 'easy', topic: 'functions',
    chart: {
      type: 'line',
      xLabel: 'x',
      yLabel: 'y',
      xMin: -2, xMax: 14, xTicks: 2,
      yMin: -2, yMax: 10, yTicks: 1,
      datasets: [{
        kind: 'line',
        data: [{ x: 0, y: 8 }, { x: 8, y: -4 }]
      }]
    },
    stem: 'The graph of the linear function f is shown, where y = f(x). What is the y-intercept of the graph of f?',
    choices: ['(0, 0)', '(0, −16/11)', '(0, −8)', '(0, 8)'],
    answer: 3,
    explanation: 'The line crosses the y-axis at y = 8.'
  },

  // =============== Q-7025 ===============
  {
    id: 'q-7025', section: 'math', difficulty: 'easy', topic: 'systems',
    stem: 's + 7r = 27 and r = 3. What is the solution (r, s) to the given system of equations?',
    choices: ['(6, 3)', '(3, 6)', '(3, 27)', '(27, 3)'],
    answer: 1,
    explanation: 'Substitute r = 3: s + 21 = 27, so s = 6. The solution is (r, s) = (3, 6).'
  },

  // =============== Q-7026 (grid-in) ===============
  {
    id: 'q-7026', section: 'math', difficulty: 'easy', topic: 'statistics',
    stem: '23, 27, 27, 32, 35, 36, 52. What is the range of the 7 scores shown?',
    answer: '29',
    explanation: 'Range = max − min = 52 − 23 = 29.'
  },

  // =============== Q-7027 ===============
  {
    id: 'q-7027', section: 'math', difficulty: 'easy', topic: 'linear-equations',
    stem: 'If 4x − 28 = −24, what is the value of x − 7?',
    choices: ['−24', '−22', '−6', '−1'],
    answer: 2,
    explanation: '4x = 4 gives x = 1. Therefore x − 7 = −6.'
  },

  // =============== Q-7028 ===============
  {
    id: 'q-7028', section: 'math', difficulty: 'easy', topic: 'geometry',
    stem: 'A right circular cylinder has a base diameter of 22 centimeters and a height of 6 centimeters. What is the volume, in cubic centimeters, of the cylinder?',
    choices: ['132π', '264π', '726π', '2,904π'],
    answer: 2,
    explanation: 'V = πr²h. Radius = 11, height = 6. V = π(11)²(6) = 726π.'
  },

  // =============== Q-7029 (chart + 4 choice charts) ===============
  // Original was a screenshot of a rational function plus 4 candidate
  // transformed graphs A–D. Now rendered as live Chart.js: the original
  // sits in the figure; each candidate is a small chart in a 2-col grid.
  // The base function is f(x) = 6/(x+1) — chosen so all four common
  // transformation distractors fit in a single shared y-range (−6..12):
  //   • A: f(x) − 5  (vertical down shift)        — sign-error distractor
  //   • B: f(x)       (no transformation)           — "didn't shift" distractor
  //   • C: f(x − 3)   (horizontal right shift by 3) — wrong axis distractor
  //   • D: f(x) + 5  (correct, up shift by 5)
  // Choice text labels stay as Graph A..D for the radio-input fallback
  // and review screen.
  {
    id: 'q-7029', section: 'math', difficulty: 'medium', topic: 'functions',
    chart: {
      type: 'line',
      title: 'y = f(x), for x ≥ 0',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0, xMax: 10, xTicks: 2,
      yMin: -6, yMax: 13, yTicks: 2,
      datasets: [{
        kind: 'line', smooth: true,
        data: _curve(function (x) { return 6 / (x + 1); }, 0, 10)
      }]
    },
    stem: 'The graph of the rational function f is shown, where y = f(x) and x ≥ 0. Which of the following is the graph of y = f(x) + 5, where x ≥ 0?',
    choices: ['Graph A', 'Graph B', 'Graph C', 'Graph D'],
    choiceCharts: [
      // A: f(x) − 5
      {
        type: 'line', xLabel: 'x', yLabel: 'y',
        xMin: 0, xMax: 10, xTicks: 2, yMin: -6, yMax: 13, yTicks: 2,
        datasets: [{
          kind: 'line', smooth: true,
          data: _curve(function (x) { return 6 / (x + 1) - 5; }, 0, 10)
        }]
      },
      // B: f(x) (unchanged)
      {
        type: 'line', xLabel: 'x', yLabel: 'y',
        xMin: 0, xMax: 10, xTicks: 2, yMin: -6, yMax: 13, yTicks: 2,
        datasets: [{
          kind: 'line', smooth: true,
          data: _curve(function (x) { return 6 / (x + 1); }, 0, 10)
        }]
      },
      // C: f(x − 3) — shifted right by 3; only plot for x ≥ 3 (domain
      // of the shifted curve)
      {
        type: 'line', xLabel: 'x', yLabel: 'y',
        xMin: 0, xMax: 10, xTicks: 2, yMin: -6, yMax: 13, yTicks: 2,
        datasets: [{
          kind: 'line', smooth: true,
          data: _curve(function (x) { return 6 / ((x - 3) + 1); }, 3, 10, 40)
        }]
      },
      // D: f(x) + 5 — correct
      {
        type: 'line', xLabel: 'x', yLabel: 'y',
        xMin: 0, xMax: 10, xTicks: 2, yMin: -6, yMax: 13, yTicks: 2,
        datasets: [{
          kind: 'line', smooth: true,
          data: _curve(function (x) { return 6 / (x + 1) + 5; }, 0, 10)
        }]
      }
    ],
    answer: 3,
    explanation: 'Adding 5 to f(x) shifts the entire graph upward by 5 units. Graph D shows the original curve translated up: every y-value is exactly 5 greater.'
  },

  // =============== Q-7030 (text-only — was right-triangle figure) ===============
  {
    id: 'q-7030', section: 'math', difficulty: 'medium', topic: 'trigonometry',
    stem: 'In a right triangle, the leg adjacent to angle x° has length 11 and the hypotenuse has length 28. What is the value of cos x°? (Enter as a fraction or decimal.)',
    answer: '0.392857',
    explanation: 'cos x° = adjacent/hypotenuse = 11/28 ≈ 0.393.'
  },

  // =============== Q-7031 ===============
  {
    id: 'q-7031', section: 'math', difficulty: 'easy', topic: 'percents',
    stem: 'What is 20% of 440?',
    choices: ['44', '88', '880', '1,760'],
    answer: 1,
    explanation: '0.20 × 440 = 88.'
  },

  // =============== Q-7032 (chart — was argon line graph) ===============
  {
    id: 'q-7032', section: 'math', difficulty: 'easy', topic: 'data-analysis',
    chart: {
      type: 'line',
      xLabel: 'Temperature (kelvins)',
      yLabel: 'Pressure (psi)',
      xMin: 0, xMax: 850, xTicks: 100,
      yMin: 0, yMax: 36, yTicks: 6,
      datasets: [{
        kind: 'line',
        data: [{ x: 0, y: 2 }, { x: 800, y: 16 }]
      }]
    },
    stem: 'Argon is placed in a container with a constant volume. The graph shows the estimated pressure y (psi) of the argon when its temperature is x kelvins. What is the estimated pressure of the argon when the temperature is 600 kelvins?',
    choices: ['6', '12', '300', '600'],
    answer: 1,
    explanation: 'Reading the line at x = 600 K gives y ≈ 12 psi.'
  },

  // =============== Q-7033 ===============
  {
    id: 'q-7033', section: 'math', difficulty: 'easy', topic: 'functions',
    stem: 'The function f is defined by f(x) = 4x − 3. What is the value of f(10)?',
    choices: ['−30', '37', '40', '43'],
    answer: 1,
    explanation: 'f(10) = 4(10) − 3 = 37.'
  },

  // =============== Q-7034 ===============
  {
    id: 'q-7034', section: 'math', difficulty: 'medium', topic: 'polynomials',
    stem: 'Which expression is equivalent to 16x³y² + 14xy?',
    choices: ['2xy(8xy + 7)', '2xy(8x²y + 7)', '14xy(2x²y + 1)', '14xy(8x²y + 1)'],
    answer: 1,
    explanation: 'Factor out the GCF 2xy: 16x³y² + 14xy = 2xy(8x²y + 7).'
  },

  // =============== Q-7035 ===============
  {
    id: 'q-7035', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'A veterinarian recommends that each day a certain rabbit eat 25 calories per pound of the rabbit\'s weight, plus an additional 11 calories. Which equation represents this situation, where c is the total calories the vet recommends if the rabbit\'s weight is x pounds?',
    choices: ['c = 25x', 'c = 36x', 'c = 11x + 25', 'c = 25x + 11'],
    answer: 3,
    explanation: 'Per-pound calories (25x) plus a fixed 11 → c = 25x + 11.'
  },

  // =============== Q-7036 ===============
  {
    id: 'q-7036', section: 'math', difficulty: 'easy', topic: 'linear-equations',
    stem: 'Line r in the xy-plane has a slope of 4 and passes through the point (0, 6). Which equation defines line r?',
    choices: ['y = −6x + 4', 'y = 6x + 4', 'y = 4x − 6', 'y = 4x + 6'],
    answer: 3,
    explanation: 'Slope-intercept form with m = 4 and y-intercept b = 6 gives y = 4x + 6.'
  },

  // =============== Q-7037 (grid-in) ===============
  {
    id: 'q-7037', section: 'math', difficulty: 'easy', topic: 'algebra',
    stem: 'If 6n = 12, what is the value of n + 4?',
    answer: '6',
    explanation: 'n = 2, so n + 4 = 6.'
  },

  // =============== Q-7038 (chart — was scatterplot image) ===============
  {
    id: 'q-7038', section: 'math', difficulty: 'medium', topic: 'data-analysis',
    chart: {
      type: 'scatter',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0, xMax: 11, xTicks: 1,
      yMin: 0, yMax: 11, yTicks: 1,
      datasets: [
        { kind: 'best-fit', from: { x: 0, y: 0 }, to: { x: 10, y: 10 } },
        {
          kind: 'points',
          data: [
            { x: 1, y: 1 }, { x: 1, y: 1.5 }, { x: 2, y: 2.5 },
            { x: 3, y: 1.5 }, { x: 3, y: 3 }, { x: 4, y: 4 },
            { x: 4, y: 4.5 }, { x: 5, y: 6.5 }, { x: 7, y: 7 },
            { x: 10, y: 10 }
          ]
        }
      ]
    },
    stem: 'The scatterplot shows 10 data points and a line of best fit. For how many of the 10 data points is the actual y-value greater than the y-value predicted by the line of best fit?',
    choices: ['3', '4', '6', '7'],
    answer: 1,
    explanation: 'Counting points visibly above the line of best fit (y = x): roughly 4.'
  },

  // =============== Q-7039 (FIXED: 116 is the only legal value) ===============
  {
    id: 'q-7039', section: 'math', difficulty: 'medium', topic: 'geometry',
    stem: 'In △RST, the measure of ∠R is 63°. Which of the following could be the measure, in degrees, of ∠S?',
    choices: ['116', '118', '126', '180'],
    answer: 0,
    explanation: 'A triangle\'s angles sum to 180°. With ∠R = 63°, ∠S + ∠T = 117°, so ∠S < 117°. Only 116° satisfies this; 118°, 126°, and 180° are all too large.'
  },

  // =============== Q-7040 (FIXED: B is correct) ===============
  {
    id: 'q-7040', section: 'math', difficulty: 'easy', topic: 'polynomials',
    stem: 'Which expression is equivalent to (8x³ + 8) − (x³ − 2)?',
    choices: ['8x³ + 6', '7x³ + 10', '8x³ + 10', '7x³ + 6'],
    answer: 1,
    explanation: 'Distribute the negative: 8x³ + 8 − x³ + 2 = 7x³ + 10.'
  },

  // =============== Q-7041 (FIXED: B = 48) ===============
  {
    id: 'q-7041', section: 'math', difficulty: 'hard', topic: 'radicals',
    stem: 'If 4√(2x) = 16, what is the value of 6x?',
    choices: ['24', '48', '72', '96'],
    answer: 1,
    explanation: 'Divide by 4: √(2x) = 4. Square: 2x = 16, so x = 8. Therefore 6x = 48.'
  },

  // =============== Q-7042 (chart — was used-cars line graph) ===============
  {
    id: 'q-7042', section: 'math', difficulty: 'easy', topic: 'data-analysis',
    chart: {
      type: 'line',
      title: 'Used Car Lot — Cars for Sale by Model Year',
      xLabel: 'Model year',
      yLabel: 'Percent of cars for sale',
      xMin: 2009, xMax: 2020, xTicks: 1,
      yMin: 0, yMax: 16, yTicks: 5,
      datasets: [{
        kind: 'line',
        data: [
          { x: 2010, y: 12 }, { x: 2011, y: 12 }, { x: 2012, y: 12 },
          { x: 2013, y: 8 },  { x: 2014, y: 4 },  { x: 2015, y: 9 },
          { x: 2016, y: 10 }, { x: 2017, y: 10 }, { x: 2018, y: 11 },
          { x: 2019, y: 11 }
        ]
      }]
    },
    stem: 'The line graph shows the percent of cars for sale at a used car lot on a given day, by model year. For what model year is the percent of cars for sale the smallest?',
    choices: ['2012', '2013', '2014', '2015'],
    answer: 2,
    explanation: 'The lowest value on the graph is at 2014 (≈ 4%).'
  },

  // =============== Q-7043 ===============
  {
    id: 'q-7043', section: 'math', difficulty: 'easy', topic: 'functions',
    stem: 'The equation s = 40 + 3t gives the speed s, in miles per hour, of a certain car t seconds after it began to accelerate. What is the speed of the car 5 seconds after it began to accelerate?',
    choices: ['40', '43', '45', '55'],
    answer: 3,
    explanation: 's = 40 + 3(5) = 55 mph.'
  },

  // =============== Q-7044 (grid-in) ===============
  {
    id: 'q-7044', section: 'math', difficulty: 'easy', topic: 'functions',
    stem: 'The function f is defined by f(x) = x² + x + 71. What is the value of f(2)?',
    answer: '77',
    explanation: 'f(2) = 4 + 2 + 71 = 77.'
  },

  // =============== Q-7045 (table — was two-way table image) ===============
  {
    id: 'q-7045', section: 'math', difficulty: 'easy', topic: 'probability',
    table: {
      caption: 'Mascot vote totals by grade level (80 students surveyed)',
      headers: ['Mascot', 'Sixth', 'Seventh', 'Eighth', 'Total'],
      firstColIsHeader: true,
      totalsRow: true,
      rows: [
        ['Badger', 4, 9, 9, 22],
        ['Lion', 9, 2, 9, 20],
        ['Longhorn', 4, 6, 4, 14],
        ['Tiger', 6, 9, 9, 24],
        ['Total', 23, 26, 31, 80]
      ]
    },
    stem: 'The table gives the distribution of votes for a new school mascot and grade level for 80 students. If one of these students is selected at random, what is the probability of selecting a student whose vote was for a lion?',
    choices: ['1/9', '1/5', '1/4', '2/3'],
    answer: 2,
    explanation: '20 of 80 students voted for the lion. Probability = 20/80 = 1/4.'
  },

  // =============== Q-7046 (grid-in) ===============
  {
    id: 'q-7046', section: 'math', difficulty: 'medium', topic: 'word-problem',
    stem: 'An event planner is planning a party. It costs the planner a one-time fee of $35 to rent the venue and $10.25 per attendee. The planner has a budget of $300. What is the greatest number of attendees possible without exceeding the budget?',
    answer: '25',
    explanation: '35 + 10.25a ≤ 300 → 10.25a ≤ 265 → a ≤ 25.85… The greatest whole number is 25.'
  },

  // =============== Q-7048 (FIXED: m^4 q^4 z^-1 not m^4 q^-2) ===============
  {
    id: 'q-7048', section: 'math', difficulty: 'hard', topic: 'exponents',
    stem: 'Which expression is equivalent to (m⁴q⁴z⁻¹)(mq⁵z³), where m, q, and z are positive?',
    choices: ['m⁴q²⁰z⁻³', 'm⁵q⁹z²', 'm⁶q⁸z⁻¹', 'm²⁰q¹²z⁻²'],
    answer: 1,
    explanation: 'Add exponents on like bases: m^(4+1) · q^(4+5) · z^(−1+3) = m⁵q⁹z².'
  },

  // =============== Q-7049 ===============
  {
    id: 'q-7049', section: 'math', difficulty: 'easy', topic: 'functions',
    stem: 'An airplane descends from an altitude of 9,500 feet to 5,000 feet at a constant rate of 400 feet per minute. What type of function best models the relationship between the descending airplane\'s altitude and time?',
    choices: ['Decreasing exponential', 'Decreasing linear', 'Increasing exponential', 'Increasing linear'],
    answer: 1,
    explanation: 'A constant rate of change is linear; the altitude decreases over time, so decreasing linear.'
  },

  // =============== Q-7050 (grid-in) ===============
  {
    id: 'q-7050', section: 'math', difficulty: 'hard', topic: 'systems',
    stem: 'The solution to the system y = 4x + 1 and 4y = 15x − 8 is (x, y). What is the value of x − y?',
    answer: '35',
    explanation: 'Substitute: 4(4x + 1) = 15x − 8 → 16x + 4 = 15x − 8 → x = −12. Then y = 4(−12) + 1 = −47. So x − y = −12 − (−47) = 35.'
  },

  // =============== Q-7051 (grid-in) ===============
  {
    id: 'q-7051', section: 'math', difficulty: 'medium', topic: 'systems',
    stem: 'The solution to the system 3x + 6 = 4y and 3x + 4 = 2y is (x, y). What is the value of y?',
    answer: '1',
    explanation: 'Both equations express 3x: 3x = 4y − 6 and 3x = 2y − 4. Set equal: 4y − 6 = 2y − 4 → 2y = 2 → y = 1.'
  },

  // =============== Q-7052 ===============
  {
    id: 'q-7052', section: 'math', difficulty: 'easy', topic: 'ratios',
    stem: 'An object\'s speed is 64 yards per second. What is the object\'s speed, in feet per second? (1 yard = 3 feet)',
    choices: ['61', '67', '94', '192'],
    answer: 3,
    explanation: '64 × 3 = 192 ft/s.'
  },

  // =============== Q-7053 (chart — was scatterplot image) ===============
  {
    id: 'q-7053', section: 'math', difficulty: 'medium', topic: 'data-analysis',
    chart: {
      type: 'scatter',
      xLabel: 'x',
      yLabel: 'y',
      xMin: 0, xMax: 15, xTicks: 2,
      yMin: 0, yMax: 20, yTicks: 2,
      datasets: [
        { kind: 'best-fit', from: { x: 0, y: 3.4 }, to: { x: 14, y: 17.4 } },
        {
          kind: 'points',
          data: [
            { x: 4, y: 6 }, { x: 6, y: 10 }, { x: 8, y: 11 },
            { x: 9, y: 13.5 }, { x: 12, y: 15 }, { x: 14, y: 16 }
          ]
        }
      ]
    },
    stem: 'The scatterplot shows the relationship between two variables x and y, with a line of best fit. Which equation best represents the line of best fit?',
    choices: ['y = x + 3.4', 'y = x − 3.4', 'y = −x + 3.4', 'y = −x − 3.4'],
    answer: 0,
    explanation: 'Positive slope (≈ 1) and y-intercept ≈ 3.4 → y = x + 3.4.'
  },

  // =============== Q-7054 (grid-in) ===============
  {
    id: 'q-7054', section: 'math', difficulty: 'easy', topic: 'functions',
    stem: 'The function f is defined by f(x) = 4x. For what value of x does f(x) = 8?',
    answer: '2',
    explanation: '4x = 8 gives x = 2.'
  },

  // =============== Q-7055 ===============
  {
    id: 'q-7055', section: 'math', difficulty: 'easy', topic: 'percents',
    stem: 'Of 300,000 paper clips, 234,000 are size large. What percentage of the paper clips are size large?',
    choices: ['22%', '33%', '66%', '78%'],
    answer: 3,
    explanation: '234,000 ÷ 300,000 = 0.78 = 78%.'
  },

  // =============== Q-7056 ===============
  {
    id: 'q-7056', section: 'math', difficulty: 'easy', topic: 'geometry',
    stem: 'What is the perimeter, in inches, of a rectangle with a length of 4 inches and a width of 9 inches?',
    choices: ['13', '17', '22', '26'],
    answer: 3,
    explanation: 'P = 2(4 + 9) = 26 inches.'
  },

  // =============== Q-7057 ===============
  {
    id: 'q-7057', section: 'math', difficulty: 'medium', topic: 'functions',
    stem: 'The function f(x) = 8x + 4 gives the estimated height, in feet, of a willow tree x years after its height was first measured. Which statement is the best interpretation of 4 in this context?',
    choices: [
      'The tree will be measured each year for 4 years.',
      'The tree is estimated to grow to a maximum height of 4 feet.',
      'The estimated height of the tree increased by 4 feet each year.',
      'The estimated height of the tree was 4 feet when it was first measured.'
    ],
    answer: 3,
    explanation: 'The constant term is the y-intercept — the value of f at x = 0, i.e. the initial height.'
  },

  // =============== Q-7058 (grid-in) ===============
  {
    id: 'q-7058', section: 'math', difficulty: 'easy', topic: 'statistics',
    stem: 'What is the median of the data shown? 73, 74, 75, 77, 79, 82, 84, 85, 91',
    answer: '79',
    explanation: 'With 9 sorted values, the median is the 5th: 79.'
  },

  // =============== Q-7059 ===============
  {
    id: 'q-7059', section: 'math', difficulty: 'easy', topic: 'linear-equations',
    stem: '66x = 66x. How many solutions does the given equation have?',
    choices: ['Exactly one', 'Exactly two', 'Infinitely many', 'Zero'],
    answer: 2,
    explanation: 'Both sides are identical, so the equation is true for every real x.'
  },

  // =============== Q-7060 (grid-in) ===============
  {
    id: 'q-7060', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'Vivian bought party hats and cupcakes for $71. Each package of party hats cost $3, and each cupcake cost $1. If Vivian bought 10 packages of party hats, how many cupcakes did she buy?',
    answer: '41',
    explanation: 'Hats cost 10 × $3 = $30. Remaining $41 buys 41 cupcakes at $1 each.'
  },

  // =============== Q-7061 (chart — was line on xy-plane) ===============
  {
    id: 'q-7061', section: 'math', difficulty: 'medium', topic: 'coordinate-geometry',
    chart: {
      type: 'line',
      xLabel: 'Company A',
      yLabel: 'Company B',
      xMin: 0, xMax: 100, xTicks: 10,
      yMin: 0, yMax: 50, yTicks: 10,
      datasets: [{
        kind: 'line',
        data: [{ x: 0, y: 40 }, { x: 60, y: 0 }]
      }]
    },
    stem: 'The graph shows the relationship between the number of shares of stock from Company A, x, and the number of shares of stock from Company B, y, that Simone can purchase. Which equation could represent this relationship?',
    choices: ['y = 8x + 12', '8x + 12y = 480', 'y = 12x + 8', '12x + 8y = 480'],
    answer: 1,
    explanation: 'Intercepts are (60, 0) and (0, 40). Intercept form: x/60 + y/40 = 1, equivalent to 8x + 12y = 480.'
  },

  // =============== Q-7062 ===============
  {
    id: 'q-7062', section: 'math', difficulty: 'easy', topic: 'functions',
    stem: 'The function f is defined by f(x) = (−8)(2)ˣ + 22. What is the y-intercept of the graph of y = f(x) in the xy-plane?',
    choices: ['(0, 14)', '(0, 2)', '(0, 22)', '(0, −8)'],
    answer: 0,
    explanation: 'f(0) = (−8)(1) + 22 = 14, so the y-intercept is (0, 14).'
  },

  // =============== Q-7063 (grid-in) ===============
  {
    id: 'q-7063', section: 'math', difficulty: 'medium', topic: 'linear-equations',
    stem: 'Line ℓ is defined by 3y + 12x = 5. Line n is perpendicular to line ℓ in the xy-plane. What is the slope of line n?',
    answer: '0.25',
    explanation: 'Rewrite: y = −4x + 5/3, so slope of ℓ is −4. Perpendicular slope = negative reciprocal = 1/4 = 0.25.'
  },

  // =============== Q-7064 ===============
  {
    id: 'q-7064', section: 'math', difficulty: 'medium', topic: 'algebra',
    stem: '|−5x + 13| = 73. What is the sum of the solutions to the given equation?',
    choices: ['146/5', '−12', '0', '26/5'],
    answer: 3,
    explanation: 'Cases: −5x + 13 = 73 → x = −12, and −5x + 13 = −73 → x = 86/5. Sum = −12 + 86/5 = 26/5.'
  },

  // =============== Q-7065 ===============
  {
    id: 'q-7065', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'A landscaping company estimates the price of a job, in dollars, using the expression 60 + 12nh, where n is the number of landscapers and h is the total hours the job takes using n landscapers. Which is the best interpretation of the number 12?',
    choices: [
      'The company charges $12 per hour for each landscaper.',
      'A minimum of 12 landscapers will work on each job.',
      'The price of every job increases by $12 every hour.',
      'Each landscaper works 12 hours a day.'
    ],
    answer: 0,
    explanation: '12 multiplies both n (workers) and h (hours), so it\'s the dollars per hour per landscaper.'
  },

  // =============== Q-7066 ===============
  {
    id: 'q-7066', section: 'math', difficulty: 'medium', topic: 'radicals',
    stem: '√(2k² + 17) − x = 0. If k > 0 and x = 7, what is the value of k?',
    choices: ['2', '3', '4', '5'],
    answer: 2,
    explanation: 'Square: 2k² + 17 = 49 → 2k² = 32 → k² = 16 → k = 4 (since k > 0).'
  },

  // =============== Q-7067 (text-only — was parallel-lines figure) ===============
  {
    id: 'q-7067', section: 'math', difficulty: 'medium', topic: 'coordinate-geometry',
    stem: 'In the xy-plane, line ℓ passes through the points (−5, 0) and (0, 2), and line k passes through the points (p, 0) and (0, −4). If lines ℓ and k are parallel, what is the value of p?',
    choices: ['4', '5', '8', '10'],
    answer: 3,
    explanation: 'Line ℓ has slope (2 − 0)/(0 − (−5)) = 2/5. Parallel lines share slope, so line k also has slope 2/5: (−4 − 0)/(0 − p) = 2/5 → 4/p = 2/5 → p = 10.'
  },

  // =============== Q-7068 ===============
  {
    id: 'q-7068', section: 'math', difficulty: 'medium', topic: 'exponents',
    stem: 'A radioactive substance decays at an annual rate of 13 percent. If the initial amount is 325 grams, which function f models the remaining amount, in grams, t years later?',
    choices: ['f(t) = 325(0.87)ᵗ', 'f(t) = 325(0.13)ᵗ', 'f(t) = 0.87(325)ᵗ', 'f(t) = 0.13(325)ᵗ'],
    answer: 0,
    explanation: '13% decay leaves 87% each year, so f(t) = initial × (0.87)ᵗ = 325(0.87)ᵗ.'
  },

  // =============== Q-7069 ===============
  {
    id: 'q-7069', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'A musician earns $0.09 each time the song is downloaded and $0.002 each time it\'s streamed. Which expression represents the total earnings, in dollars, if downloaded d times and streamed s times?',
    choices: ['0.002d + 0.09s', '0.002d − 0.09s', '0.09d + 0.002s', '0.09d − 0.002s'],
    answer: 2,
    explanation: 'Earnings = $0.09 × d (downloads) + $0.002 × s (streams).'
  },

  // =============== Q-7070 ===============
  {
    id: 'q-7070', section: 'math', difficulty: 'easy', topic: 'linear-equations',
    stem: 'ℓ = 24 + 3.5m. When an object of mass m kg is attached to a spring, the spring stretches to a length of ℓ cm. What is m when ℓ is 73?',
    choices: ['14', '27.7', '73', '279.5'],
    answer: 0,
    explanation: '73 = 24 + 3.5m → 49 = 3.5m → m = 14.'
  },

  // =============== Q-7071 ===============
  {
    id: 'q-7071', section: 'math', difficulty: 'easy', topic: 'proportions',
    stem: 'A quality control manager at a factory selects 7 lightbulbs at random for inspection out of every 400 lightbulbs produced. At this rate, how many lightbulbs will be inspected if the factory produces 20,000 lightbulbs?',
    choices: ['300', '350', '400', '450'],
    answer: 1,
    explanation: '7/400 × 20,000 = 350.'
  },

  // =============== Q-7072 ===============
  {
    id: 'q-7072', section: 'math', difficulty: 'easy', topic: 'proportions',
    stem: 'The amount of money a performer earns is directly proportional to the number of people attending the performance. The performer earns $120 at a performance where 8 people attend. How much will the performer earn when 20 people attend?',
    choices: ['$960', '$480', '$300', '$240'],
    answer: 2,
    explanation: 'k = 120/8 = 15. Earnings at 20 people = 15 × 20 = $300.'
  },

  // =============== Q-7073 ===============
  {
    id: 'q-7073', section: 'math', difficulty: 'easy', topic: 'linear-equations',
    stem: 'When 4 times the number x is added to 12, the result is 8. What number results when 2 times x is added to 7?',
    choices: ['−1', '5', '8', '9'],
    answer: 1,
    explanation: '4x + 12 = 8 → x = −1. Then 2(−1) + 7 = 5.'
  },

  // =============== Q-7074 ===============
  {
    id: 'q-7074', section: 'math', difficulty: 'medium', topic: 'quadratics',
    stem: 'y = x² − 6x + 8. The equation above represents a parabola in the xy-plane. Which of the following equivalent forms displays the x-intercepts as constants or coefficients?',
    choices: ['y − 8 = x² − 6x', 'y + 1 = (x − 3)²', 'y = x(x − 6) + 8', 'y = (x − 2)(x − 4)'],
    answer: 3,
    explanation: 'In factored form (x − 2)(x − 4), the roots 2 and 4 are visible directly.'
  },

  // =============== Q-7075 ===============
  {
    id: 'q-7075', section: 'math', difficulty: 'easy', topic: 'functions',
    stem: 'A function f satisfies f(2) = 3 and f(3) = 5. A function g satisfies g(3) = 2 and g(5) = 6. What is the value of f(g(3))?',
    choices: ['2', '3', '5', '6'],
    answer: 1,
    explanation: 'g(3) = 2, then f(2) = 3.'
  },

  // =============== Q-7076 ===============
  {
    id: 'q-7076', section: 'math', difficulty: 'medium', topic: 'systems',
    stem: 'A worker uses a forklift to move boxes that weigh either 40 pounds or 65 pounds each. Let x be the number of 40-pound boxes and y be the number of 65-pound boxes. The forklift can carry up to either 45 boxes or a weight of 2,400 pounds. Which system of inequalities represents this relationship?',
    choices: [
      '40x + 65y ≤ 2,400 and x + y ≤ 45',
      'x/40 + y/65 ≤ 2,400 and x + y ≤ 45',
      '40x + 65y ≤ 45 and x + y ≤ 2,400',
      'x + y ≤ 2,400 and 40x + 65y ≤ 2,400'
    ],
    answer: 0,
    explanation: 'Weight constraint: 40x + 65y ≤ 2,400. Count constraint: x + y ≤ 45.'
  },

  // =============== Q-7077 (chart — was air-passenger scatterplot) ===============
  {
    id: 'q-7077', section: 'math', difficulty: 'medium', topic: 'data-analysis',
    chart: {
      type: 'scatter',
      title: 'Miles Traveled by Air Passengers in Country X, 1960–2005',
      xLabel: 'Year',
      yLabel: 'Number of miles traveled (billions)',
      xMin: 1960, xMax: 2010, xTicks: 10,
      yMin: 0, yMax: 700, yTicks: 100,
      datasets: [
        { kind: 'best-fit', from: { x: 1960, y: 0 }, to: { x: 2010, y: 700 } },
        {
          kind: 'points',
          data: [
            { x: 1960, y: 30 },  { x: 1965, y: 60 },  { x: 1970, y: 120 },
            { x: 1975, y: 150 }, { x: 1980, y: 220 }, { x: 1985, y: 330 },
            { x: 1990, y: 360 }, { x: 1995, y: 420 }, { x: 2000, y: 520 },
            { x: 2005, y: 590 }
          ]
        }
      ]
    },
    stem: 'The scatterplot shows miles traveled by air passengers in Country X from 1960 to 2005, with a line of best fit. Which year best approximates the year in which the number of miles traveled was 550 billion?',
    choices: ['1997', '2000', '2003', '2008'],
    answer: 1,
    explanation: 'Reading the line of best fit at y = 550 billion gives a year close to 2000.'
  },

  // =============== Q-7078 (table — was two-way table image) ===============
  {
    id: 'q-7078', section: 'math', difficulty: 'medium', topic: 'probability',
    table: {
      caption: 'Results on the bar exam of 200 law school graduates',
      headers: ['', 'Passed bar exam', 'Did not pass bar exam'],
      firstColIsHeader: true,
      rows: [
        ['Took review course', 18, 82],
        ['Did not take review course', 7, 93]
      ]
    },
    stem: 'The table summarizes the results of 200 law school graduates who took the bar exam. If one graduate who passed is chosen at random for an interview, what is the probability that the person did not take the review course?',
    choices: ['18/25', '7/25', '25/200', '7/200'],
    answer: 1,
    explanation: 'Total who passed: 18 + 7 = 25. Of those, 7 didn\'t take the course. Probability = 7/25.'
  },

  // =============== Q-7079 ===============
  {
    id: 'q-7079', section: 'math', difficulty: 'medium', topic: 'statistics',
    stem: 'A survey was taken of the value of homes in a county. The mean home value was $165,000 and the median was $125,000. Which situation could explain the difference?',
    choices: [
      'The homes have values that are close to each other.',
      'There are a few homes that are valued much less than the rest.',
      'There are a few homes that are valued much more than the rest.',
      'Many of the homes have values between $125,000 and $165,000.'
    ],
    answer: 2,
    explanation: 'Mean > median signals right-skew: a few high-value homes pulling the average up.'
  },

  // =============== Q-7080 ===============
  {
    id: 'q-7080', section: 'math', difficulty: 'hard', topic: 'algebra',
    stem: 'I = P/(4πr²). At a large distance r from a radio antenna, the intensity I of the signal is related to the power P by the formula above. Which expresses the square of the distance from the antenna in terms of I and P?',
    choices: ['r² = IP/(4π)', 'r² = P/(4πI)', 'r² = 4πI/P', 'r² = I/(4πP)'],
    answer: 1,
    explanation: 'Multiply both sides by 4πr²: 4πIr² = P. Divide by 4πI: r² = P/(4πI).'
  },

  // =============== Q-7081 (inline SVG — was piecewise function image) ===============
  // The piecewise function rendered here, matching the SAT answer key:
  //   (−4, 0) → (0, 2) → (1, 1) → (3, 1)
  // Coordinate mapping in SVG: 1 unit = 25 px. Origin O at (160, 140).
  // So for example x = -4 maps to 160 + (-4)*25 = 60, y = 0 maps to 140.
  // Dot positions (closed circles) at each vertex; the function reads
  // II = III = 1 (in / at the right end of the flat segment), I = 0
  // (leftmost dot is on the x-axis), so the answer is C (II and III only).
  {
    id: 'q-7081', section: 'math', difficulty: 'hard', topic: 'functions',
    svg:
      '<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" role="img"' +
      ' aria-label="Piecewise graph of f(x) with vertices at (-4,0), (0,2), (1,1), and (3,1).">' +
        // grid (faint hairlines)
        '<g stroke="currentColor" stroke-width="0.5" opacity="0.18">' +
          // vertical grid lines (every 25 px from x = -5 unit to x = 6 unit)
          '<line x1="35" y1="40" x2="35" y2="240"/>' +
          '<line x1="60" y1="40" x2="60" y2="240"/>' +
          '<line x1="85" y1="40" x2="85" y2="240"/>' +
          '<line x1="110" y1="40" x2="110" y2="240"/>' +
          '<line x1="135" y1="40" x2="135" y2="240"/>' +
          '<line x1="185" y1="40" x2="185" y2="240"/>' +
          '<line x1="210" y1="40" x2="210" y2="240"/>' +
          '<line x1="235" y1="40" x2="235" y2="240"/>' +
          '<line x1="260" y1="40" x2="260" y2="240"/>' +
          '<line x1="285" y1="40" x2="285" y2="240"/>' +
          '<line x1="310" y1="40" x2="310" y2="240"/>' +
          // horizontal grid lines (every 25 px from y = 4 unit down to y = -4 unit)
          '<line x1="20" y1="40" x2="320" y2="40"/>' +
          '<line x1="20" y1="65" x2="320" y2="65"/>' +
          '<line x1="20" y1="90" x2="320" y2="90"/>' +
          '<line x1="20" y1="115" x2="320" y2="115"/>' +
          '<line x1="20" y1="165" x2="320" y2="165"/>' +
          '<line x1="20" y1="190" x2="320" y2="190"/>' +
          '<line x1="20" y1="215" x2="320" y2="215"/>' +
          '<line x1="20" y1="240" x2="320" y2="240"/>' +
        '</g>' +
        // axes with arrowheads
        '<defs>' +
          '<marker id="stl-svg-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">' +
            '<path d="M0,0 L8,4 L0,8 z" fill="currentColor"/>' +
          '</marker>' +
        '</defs>' +
        '<line x1="20" y1="140" x2="316" y2="140" stroke="currentColor" stroke-width="1.4" marker-end="url(#stl-svg-arrow)"/>' +
        '<line x1="160" y1="240" x2="160" y2="44" stroke="currentColor" stroke-width="1.4" marker-end="url(#stl-svg-arrow)"/>' +
        // axis labels
        '<text x="305" y="155" class="stl-svg-var">x</text>' +
        '<text x="166" y="38" class="stl-svg-var">y</text>' +
        '<text x="148" y="156" class="stl-svg-num" font-style="italic">O</text>' +
        '<text x="183" y="156" class="stl-svg-num">1</text>' +
        '<text x="146" y="119" class="stl-svg-num">1</text>' +
        // the function graph: piecewise polyline + closed dots at each vertex
        '<polyline points="60,140 160,90 185,115 235,115" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
        '<circle cx="60" cy="140" r="4" fill="currentColor"/>' +
        '<circle cx="160" cy="90" r="4" fill="currentColor"/>' +
        '<circle cx="185" cy="115" r="4" fill="currentColor"/>' +
        '<circle cx="235" cy="115" r="4" fill="currentColor"/>' +
        // function name callout
        '<text x="200" y="76" class="stl-svg-var">y = f(x)</text>' +
      '</svg>',
    stem: 'The complete graph of the function f is shown. Which of the following are equal to 1? I. f(−4)   II. f(3/2)   III. f(3)',
    choices: ['III only', 'I and III only', 'II and III only', 'I, II, and III'],
    answer: 2,
    explanation: 'f(3/2) = 1 (in the flat segment at y = 1) and f(3) = 1 (right end of that segment); f(−4) is at y = 0, not 1. So II and III only.'
  },

  // =============== Q-7082 (grid-in) ===============
  {
    id: 'q-7082', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'A coastal geologist estimates that a certain country\'s beaches are eroding at a rate of 1.5 feet per year. According to the geologist\'s estimate, how long will it take, in years, for the country\'s beaches to erode by 21 feet?',
    answer: '14',
    explanation: '21 ÷ 1.5 = 14 years.'
  },

  // =============== Q-7083 (grid-in) ===============
  {
    id: 'q-7083', section: 'math', difficulty: 'medium', topic: 'functions',
    stem: 'In the xy-plane, the point (3, 6) lies on the graph of the function f(x) = 3x² − bx + 12. What is the value of b?',
    answer: '11',
    explanation: '6 = 3(9) − 3b + 12 → 6 = 39 − 3b → 3b = 33 → b = 11.'
  },

  // =============== Q-7084 (grid-in) ===============
  {
    id: 'q-7084', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'In one semester, Doug and Laura spent a combined 250 hours in the tutoring lab. If Doug spent 40 more hours in the lab than Laura did, how many hours did Laura spend in the lab?',
    answer: '105',
    explanation: 'Let L = Laura\'s hours, Doug = L + 40. Total: 2L + 40 = 250 → L = 105.'
  },

  // =============== Q-7085 (grid-in) ===============
  {
    id: 'q-7085', section: 'math', difficulty: 'easy', topic: 'linear-equations',
    stem: 'Jane made an initial deposit to a savings account. Each week thereafter she deposited a fixed amount. The equation a = 18t + 15 models the amount a, in dollars, after t weekly deposits. What was Jane\'s initial deposit, in dollars?',
    answer: '15',
    explanation: 'At t = 0 (before any weekly deposit), a = 15.'
  },

  // =============== Q-7086 ===============
  {
    id: 'q-7086', section: 'math', difficulty: 'medium', topic: 'exponents',
    stem: 'Which of the following is equal to a^(2/3), for all values of a?',
    choices: ['√(a³)', '∛(a³)', '∛(a^(1/2))', '∛(a²)'],
    answer: 3,
    explanation: 'a^(2/3) = (a²)^(1/3) = ∛(a²).'
  },

  // =============== Q-7087 ===============
  {
    id: 'q-7087', section: 'math', difficulty: 'easy', topic: 'algebra',
    stem: 'If 5/x = 15/(x + 20), what is the value of x/5?',
    choices: ['10', '5', '2', '1/2'],
    answer: 2,
    explanation: 'Cross-multiply: 5(x + 20) = 15x → 100 = 10x → x = 10. So x/5 = 2.'
  },

  // =============== Q-7088 ===============
  {
    id: 'q-7088', section: 'math', difficulty: 'hard', topic: 'systems',
    stem: 'If (x, y) is a solution to the system 2x − 3y = −14 and 3x − 2y = −6, what is the value of x − y?',
    choices: ['−20', '−8', '−4', '8'],
    answer: 2,
    explanation: 'Solving: y = 6, x = 2 → x − y = −4.'
  },

  // =============== Q-7089 (table — was x/f(x) figure) ===============
  {
    id: 'q-7089', section: 'math', difficulty: 'medium', topic: 'polynomials',
    table: {
      headers: ['x', 'f(x)'],
      rows: [
        [0, 3],
        [2, 1],
        [4, 0],
        [5, '−2']
      ]
    },
    stem: 'The function f is defined by a polynomial. Some values of x and f(x) are shown in the table. Which must be a factor of f(x)?',
    choices: ['x − 2', 'x − 3', 'x − 4', 'x − 5'],
    answer: 2,
    explanation: 'f(4) = 0, so by the factor theorem (x − 4) is a factor.'
  },

  // =============== Q-7090 (grid-in) ===============
  {
    id: 'q-7090', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'At a lunch stand, each hamburger has 50 more calories than each order of fries. If 2 hamburgers and 3 orders of fries have a total of 1700 calories, how many calories does a hamburger have?',
    answer: '370',
    explanation: 'Let f = fries calories, h = f + 50. Then 2(f + 50) + 3f = 1700 → 5f = 1600 → f = 320, h = 370.'
  },

  // =============== Q-7091 (chart — was hike distance-vs-time graph) ===============
  // Time uses minutes since 12:00 PM as a numeric x-axis so we can place
  // the lunch-break plateau at 1:10 PM (x = 70) → 1:40 PM (x = 100), which
  // a category axis can't represent precisely. Tick labels are formatted
  // back to "12:00 P.M." style by the chart options. The plateau (flat
  // y for 30 minutes) is the visible lunch break — that's the answer cue.
  {
    id: 'q-7091', section: 'math', difficulty: 'medium', topic: 'data-analysis',
    chart: {
      type: 'line',
      title: 'Marilyn\'s Hike',
      xLabel: 'Time',
      yLabel: 'Distance from campsite (miles)',
      xMin: 0, xMax: 180, xTicks: 30,
      yMin: 0, yMax: 2,  yTicks: 0.5,
      datasets: [{
        kind: 'line',
        data: [
          { x: 0,   y: 0 },     // 12:00 PM
          { x: 15,  y: 0.4 },
          { x: 30,  y: 1.25 },
          { x: 45,  y: 1.0 },
          { x: 60,  y: 1.2 },
          { x: 70,  y: 1.2 },   // 1:10 PM — lunch starts
          { x: 100, y: 1.2 },   // 1:40 PM — lunch ends (30-min plateau)
          { x: 120, y: 1.55 },  // 2:00 PM — peak
          { x: 150, y: 0.9 },
          { x: 180, y: 0.05 }   // 3:00 PM — back near camp
        ]
      }]
    },
    stem: 'The graph shows Marilyn\'s distance from her campsite during a 3-hour hike. She stopped for 30 minutes during her hike to have lunch. Based on the graph, which of the following is closest to the time she finished lunch and continued her hike? (X-axis ticks are minutes after 12:00 P.M.)',
    choices: ['12:40 P.M.', '1:10 P.M.', '1:40 P.M.', '2:00 P.M.'],
    answer: 2,
    explanation: 'The flat (no-distance-change) segment lasts from x = 70 (1:10 P.M.) to x = 100 (1:40 P.M.) — that\'s the 30-minute lunch break. She resumed at 1:40 P.M.'
  },

  // =============== Q-7093 (chart — was album-sales line graph) ===============
  // Original was a line of points "Years since 1997" on x — keeping the
  // same convention (x = 0 → 1997, x = 12 → 2009) so the question's
  // mention of 2000 maps cleanly to x = 3.
  {
    id: 'q-7093', section: 'math', difficulty: 'easy', topic: 'data-analysis',
    chart: {
      type: 'line',
      title: 'Annual Music Album Sales',
      xLabel: 'Years since 1997',
      yLabel: 'Sales (millions of music albums)',
      xMin: 0, xMax: 12, xTicks: 1,
      yMin: 0, yMax: 1000, yTicks: 200,
      datasets: [{
        kind: 'line',
        data: [
          { x: 0, y: 660 }, { x: 1, y: 720 }, { x: 2, y: 760 },
          { x: 3, y: 780 }, { x: 4, y: 760 }, { x: 5, y: 690 },
          { x: 6, y: 670 }, { x: 7, y: 680 }, { x: 8, y: 620 },
          { x: 9, y: 600 }, { x: 10, y: 510 }, { x: 11, y: 430 },
          { x: 12, y: 380 }
        ]
      }]
    },
    stem: 'The graph shows the total number of music album sales, in millions, each year from 1997 through 2009. Based on the graph, which of the following best describes the general trend in music album sales from 1997 through 2009?',
    choices: [
      'Sales generally increased each year since 1997.',
      'Sales generally decreased each year since 1997.',
      'Sales increased until 2000 and then generally decreased.',
      'Sales generally remained steady from 1997 through 2009.'
    ],
    answer: 2,
    explanation: 'Sales rise to a peak around 2000 (x = 3), then decline through 2009.'
  },

  // =============== Q-7094 ===============
  {
    id: 'q-7094', section: 'math', difficulty: 'easy', topic: 'polynomials',
    stem: 'Which of the following is the sum of the two polynomials (3x² − 5x + 2) and (5x² − 2x − 6)?',
    choices: ['8x² − 7x − 4', '8x² + 7x − 4', '8x⁴ − 7x² − 4', '8x⁴ + 7x² − 4'],
    answer: 0,
    explanation: 'Combine like terms: 8x² − 7x − 4.'
  },

  // =============== Q-7095 (table — was n/f(n) figure) ===============
  {
    id: 'q-7095', section: 'math', difficulty: 'easy', topic: 'functions',
    table: {
      headers: ['n', 'f(n)'],
      rows: [
        [1, '−2'],
        [2, 1],
        [3, 4],
        [4, 7]
      ]
    },
    stem: 'The table above shows some values of the linear function f. Which of the following defines f?',
    choices: ['f(n) = n − 3', 'f(n) = 2n − 4', 'f(n) = 3n − 5', 'f(n) = 4n − 6'],
    answer: 2,
    explanation: 'Differences are constant 3, so slope = 3. Using f(1) = −2: f(n) = 3n − 5 (since 3·1 − 5 = −2). Verify f(2) = 1, f(3) = 4, f(4) = 7. ✓'
  },

  // =============== Q-7096 ===============
  {
    id: 'q-7096', section: 'math', difficulty: 'easy', topic: 'fractions',
    stem: 'If (3/5)w = 4/3, what is the value of w?',
    choices: ['9/20', '4/5', '5/4', '20/9'],
    answer: 3,
    explanation: 'w = (4/3) ÷ (3/5) = (4/3) × (5/3) = 20/9.'
  },

  // =============== Q-7097 ===============
  {
    id: 'q-7097', section: 'math', difficulty: 'medium', topic: 'linear-equations',
    stem: 'The average number of students per classroom at Central High School from 2000 to 2010 can be modeled by y = 0.56x + 27.2, where x is years since 2000. Which best describes the meaning of the number 0.56?',
    choices: [
      'The total number of students at the school in 2000',
      'The average number of students per classroom in 2000',
      'The estimated increase in the average number of students per classroom each year',
      'The estimated difference between the average number of students per classroom in 2010 and in 2000'
    ],
    answer: 2,
    explanation: 'In y = mx + b, m is the rate of change. Here that\'s the per-year increase in the average.'
  },

  // =============== Q-7098 ===============
  {
    id: 'q-7098', section: 'math', difficulty: 'medium', topic: 'word-problem',
    stem: 'Nate walks 25 meters in 13.7 seconds. If he walks at this same rate, which is closest to the distance he will walk in 4 minutes?',
    choices: ['150 meters', '450 meters', '700 meters', '1,400 meters'],
    answer: 1,
    explanation: 'Rate ≈ 1.825 m/s. In 240 s: ≈ 438 m, closest to 450.'
  },

  // =============== Q-7099 (grid-in) ===============
  {
    id: 'q-7099', section: 'math', difficulty: 'easy', topic: 'polynomials',
    stem: 'If the expression (−3x² + 5x − 2) − (x² − 2x − 1) is rewritten in the form ax² + bx + c, where a, b, and c are constants, what is the value of b?',
    answer: '7',
    explanation: 'Distribute: −3x² + 5x − 2 − x² + 2x + 1 = −4x² + 7x − 1, so b = 7.'
  },

  // =============== Q-7100 (table — was figure of presidents' ages) ===============
  {
    id: 'q-7100', section: 'math', difficulty: 'medium', topic: 'statistics',
    table: {
      caption: 'Ages of the first 12 U.S. presidents at the beginning of their terms in office',
      headers: ['President', 'Age (years)'],
      firstColIsHeader: true,
      rows: [
        ['Washington', 57],
        ['Adams', 62],
        ['Jefferson', 58],
        ['Madison', 58],
        ['Monroe', 59],
        ['Adams', 58],
        ['Jackson', 62],
        ['Van Buren', 55],
        ['Harrison', 68],
        ['Tyler', 51],
        ['Polk', 50],
        ['Taylor', 65]
      ]
    },
    stem: 'The table above lists the ages of the first 12 U.S. presidents when they began their terms in office. What was the mean age, in years, of these presidents at the beginning of their terms? (Round to the nearest tenth.)',
    answer: '58.6',
    explanation: 'Sum of ages: 57 + 62 + 58 + 58 + 59 + 58 + 62 + 55 + 68 + 51 + 50 + 65 = 703. Mean = 703/12 ≈ 58.6.'
  },

  // =============== Q-7101 ===============
  {
    id: 'q-7101', section: 'math', difficulty: 'easy', topic: 'functions',
    stem: 'If f(x) = −2x + 5, what is f(−3x) equal to?',
    choices: ['−6x − 5', '6x + 5', '6x − 5', '6x² − 15x'],
    answer: 1,
    explanation: 'f(−3x) = −2(−3x) + 5 = 6x + 5.'
  },

  // =============== Q-7102 ===============
  {
    id: 'q-7102', section: 'math', difficulty: 'medium', topic: 'polynomials',
    stem: 'Which of the following is equivalent to the expression 3(2x + 1)(4x + 1)?',
    choices: ['45x', '24x² + 3', '24x² + 18x + 3', '18x² + 6'],
    answer: 2,
    explanation: '(2x + 1)(4x + 1) = 8x² + 6x + 1. Multiply by 3: 24x² + 18x + 3.'
  },

  // =============== Q-7103 (FIXED: A = 6x+2y=15 has slope -3) ===============
  {
    id: 'q-7103', section: 'math', difficulty: 'medium', topic: 'coordinate-geometry',
    stem: 'Which equation represents a line that is parallel to the line y = −3x + 4?',
    choices: ['6x + 2y = 15', '3x − y = 7', '2x − 3y = 6', 'x + 3y = 1'],
    answer: 0,
    explanation: 'Parallel lines share slope. y = −3x + 4 has slope −3. Rewriting A: 2y = −6x + 15 → y = −3x + 7.5. Slope −3. ✓'
  },

  // =============== Q-7104 ===============
  {
    id: 'q-7104', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'The monthly membership fee for an online television and movie service is $9.80. The cost of viewing television shows is included; renting each movie costs an additional $1.50. For one month, Jill\'s total fees were $12.80. How many movies did Jill rent online that month?',
    choices: ['1', '2', '3', '4'],
    answer: 1,
    explanation: '9.80 + 1.50m = 12.80 → m = 2.'
  },

  // =============== Q-7105 ===============
  {
    id: 'q-7105', section: 'math', difficulty: 'medium', topic: 'coordinate-geometry',
    stem: 'Line ℓ in the xy-plane contains points from each of Quadrants II, III, and IV, but no points from Quadrant I. Which of the following must be true?',
    choices: [
      'The slope of line ℓ is undefined.',
      'The slope of line ℓ is zero.',
      'The slope of line ℓ is positive.',
      'The slope of line ℓ is negative.'
    ],
    answer: 3,
    explanation: 'A line through II, III, and IV but not I must descend from upper-left to lower-right — i.e., have negative slope.'
  },

  // =============== Q-7106 (table — was figure of mosquito population) ===============
  {
    id: 'q-7106', section: 'math', difficulty: 'medium', topic: 'data-analysis',
    table: {
      caption: 'Estimated mosquito population in a swamp over 20 weeks',
      headers: ['Time (weeks)', 'Population'],
      rows: [
        [0, '100'],
        [5, '1,000'],
        [10, '10,000'],
        [15, '100,000'],
        [20, '1,000,000']
      ]
    },
    stem: 'The population of mosquitoes in a swamp is estimated over the course of twenty weeks, as shown in the table. Which best describes the relationship between time and the estimated population of mosquitoes during the twenty weeks?',
    choices: ['Increasing linear', 'Decreasing linear', 'Exponential growth', 'Exponential decay'],
    answer: 2,
    explanation: 'Population multiplies by 10 every 5 weeks — that\'s exponential growth.'
  },

  // =============== Q-7107 ===============
  {
    id: 'q-7107', section: 'math', difficulty: 'medium', topic: 'inequalities',
    stem: 'If 3p − 2 ≥ 1, what is the least possible value of 3p + 2?',
    choices: ['5', '3', '2', '1'],
    answer: 0,
    explanation: '3p ≥ 3, so 3p + 2 ≥ 5. The least value is 5.'
  },

  // =============== Q-7108 (chart — was gestation scatterplot, FIXED answer) ===============
  // Earlier the agent picked D (10) by reading point "D" at gestation 50,
  // not the rightmost point. The rightmost point is at gestation 60 days
  // with a life expectancy of 3 years — so the correct answer is A (3).
  {
    id: 'q-7108', section: 'math', difficulty: 'easy', topic: 'data-analysis',
    chart: {
      type: 'scatter',
      title: 'Gestation Period versus Life Expectancy',
      xLabel: 'Gestation period (days)',
      yLabel: 'Life expectancy (years)',
      xMin: 10, xMax: 65, xTicks: 5,
      yMin: 0, yMax: 12, yTicks: 2,
      datasets: [{
        kind: 'points',
        data: [
          { x: 15, y: 2 },  { x: 25, y: 2 },  { x: 25, y: 7 },
          { x: 30, y: 4 },  { x: 30, y: 6 },  { x: 30, y: 10 },
          { x: 45, y: 8 },  { x: 50, y: 8 },  { x: 50, y: 10 },
          { x: 60, y: 3 }
        ]
      }]
    },
    stem: 'A curator at a wildlife society created the scatterplot to examine the relationship between the gestation period and life expectancy of 10 species of animals. What is the life expectancy, in years, of the animal that has the longest gestation period?',
    choices: ['3', '4', '8', '10'],
    answer: 0,
    explanation: 'The rightmost point on the scatterplot has a gestation period of 60 days (the longest) and a life expectancy of 3 years.'
  },

  // =============== Q-7109 ===============
  {
    id: 'q-7109', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'One of the requirements for becoming a court reporter is the ability to type 225 words per minute. Donald can currently type 180 words per minute, and believes that with practice he can increase his typing speed by 5 words per minute each month. Which expression represents the number of words per minute Donald believes he\'ll type m months from now?',
    choices: ['5 + 180m', '225 + 5m', '180 + 5m', '180 − 5m'],
    answer: 2,
    explanation: 'Starting speed 180, +5 per month: 180 + 5m.'
  }

];
