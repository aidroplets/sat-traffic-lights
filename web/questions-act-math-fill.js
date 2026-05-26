/**
 * ACT Math — fill batch (45 questions across 20 topics) to expand
 * the existing 20-question bank. ACT Math is 5-choice (A-E).
 *
 * testType: 'ACT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'math'
 *
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';

window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  // ───────────────────────── pre-algebra-percent (3) ─────────────────────────
  {
    id: 'q-actm-001',
    section: 'math',
    topic: 'pre-algebra-percent',
    difficulty: 23,
    stem: 'A jacket originally priced at $80 is on sale for 25% off. What is the sale price?',
    choices: ['$65', '$55', '$20', '$60', '$75'],
    answer: 3,
    explanation: '25% of 80 = 20, so sale price = 80 − 20 = $60. (A) is the discount itself, not the sale price; (B) subtracts $25 instead of 25%; (D) computes 80 − 0.25·60; (E) subtracts only $5.'
  },
  {
    id: 'q-actm-002',
    section: 'math',
    topic: 'pre-algebra-percent',
    difficulty: 26,
    stem: 'After a 20% increase, the population of a town is 9,000. What was the population before the increase?',
    choices: ['8,800', '7,200', '7,500', '11,250', '8,000'],
    answer: 2,
    explanation: 'Let original = x. Then 1.20x = 9000, so x = 9000/1.20 = 7,500. (A) decreases 9000 by 20% (a common mistake when reversing a percent change); (C) subtracts 1000; (D) subtracts 200; (E) increases by 25% the wrong direction.'
  },
  {
    id: 'q-actm-003',
    section: 'math',
    topic: 'pre-algebra-percent',
    difficulty: 30,
    stem: 'A stock rises 25% one day and then falls 20% the next day. What is the overall percent change from its original price?',
    choices: ['+45%', '+2%', '+5%', '0%', '−5%'],
    answer: 3,
    explanation: 'New price = P · 1.25 · 0.80 = P · 1.00, an overall 0% change. (A) is the naïve subtraction 25 − 20 − 10 trap; (D) is +5% trap from 25−20; (E) just adds the percents.'
  },

  // ───────────────────────── pre-algebra-ratios (2) ─────────────────────────
  {
    id: 'q-actm-004',
    section: 'math',
    topic: 'pre-algebra-ratios',
    difficulty: 22,
    stem: 'The ratio of cats to dogs at a shelter is 4:7. If there are 28 cats, how many dogs are there?',
    choices: ['52', '16', '25', '31', '49'],
    answer: 4,
    explanation: '4/7 = 28/d gives 4d = 196, so d = 49. (A) inverts the ratio (28·4/7); (B) subtracts 3; (C) adds 3; (E) uses the wrong proportion 28+21.'
  },
  {
    id: 'q-actm-005',
    section: 'math',
    topic: 'pre-algebra-ratios',
    difficulty: 24,
    stem: 'A class of 36 students has a boys-to-girls ratio of 5:4. How many more boys than girls are in the class?',
    choices: ['4', '8', '20', '9', '1'],
    answer: 0,
    explanation: '5+4 = 9 parts, so each part = 36/9 = 4. Boys = 20, girls = 16, difference = 4. (A) divides 36 by 36; (C) takes 36/4·something; (D) is one part; (E) is the boys count itself.'
  },

  // ───────────────────────── elementary-algebra (3) ─────────────────────────
  {
    id: 'q-actm-006',
    section: 'math',
    topic: 'elementary-algebra',
    difficulty: 18,
    stem: 'If 3(x − 4) = 21, what is the value of x?',
    choices: ['7', '11', '15', '9', '3'],
    answer: 1,
    explanation: 'Divide both sides by 3: x − 4 = 7, then add 4: x = 11. (A) divides 21 by 7 wrongly; (B) is x − 4; (C) miscombines; (E) takes 3·5 trap.'
  },
  {
    id: 'q-actm-007',
    section: 'math',
    topic: 'elementary-algebra',
    difficulty: 24,
    stem: 'Simplify: (3x²y)(−2xy³).',
    choices: ['−6x³y⁴', '−5x³y⁴', '6x³y⁴', '−6x²y⁴', '−6x²y³'],
    answer: 0,
    explanation: 'Multiply coefficients: 3·(−2) = −6. Add exponents: x^(2+1)·y^(1+3) = x³y⁴. So −6x³y⁴. (B) forgets to add x exponents; (C) adds coefficients; (D) drops the negative; (E) misadds y exponents.'
  },
  {
    id: 'q-actm-008',
    section: 'math',
    topic: 'elementary-algebra',
    difficulty: 27,
    stem: 'If 5(x + 2) − 3 = 2(x − 1) + 18, what is x?',
    choices: ['3', '7', '4', '1', '5'],
    answer: 0,
    explanation: 'Expand: 5x + 10 − 3 = 2x − 2 + 18 → 5x + 7 = 2x + 16 → 3x = 9 → x = 3. (A) drops the +7; (C) adds wrong; (D) drops a sign on −1; (E) miscombines constants.'
  },

  // ───────────────────────── algebra-exponents (3) ─────────────────────────
  {
    id: 'q-actm-009',
    section: 'math',
    topic: 'algebra-exponents',
    difficulty: 21,
    stem: 'Simplify: 2³ · 2⁴.',
    choices: ['2¹²', '4⁷', '2⁷', '4¹²', '8'],
    answer: 2,
    explanation: 'When multiplying powers with the same base, add exponents: 2^(3+4) = 2⁷. (B) multiplies the exponents; (C)/(D) wrongly multiply the bases; (E) is just 2³.'
  },
  {
    id: 'q-actm-010',
    section: 'math',
    topic: 'algebra-exponents',
    difficulty: 27,
    stem: 'If x⁻² = 1/9 and x > 0, what is x?',
    choices: ['3', '9', '\\frac{1}{9}', '81', '\\frac{1}{3}'],
    answer: 0,
    explanation: 'x⁻² = 1/x², so 1/x² = 1/9 → x² = 9 → x = 3 (positive). (A) is x⁻² itself; (B) treats x⁻² as x; (D) is x²; (E) is x⁴.'
  },
  {
    id: 'q-actm-011',
    section: 'math',
    topic: 'algebra-exponents',
    difficulty: 32,
    stem: 'Simplify: (16x⁸)^(3/4).',
    choices: ['12x⁶', '8x⁶', '8x⁸', '64x¹¹', '64x⁶'],
    answer: 1,
    explanation: '16^(3/4) = (16^(1/4))³ = 2³ = 8. (x⁸)^(3/4) = x^(8·3/4) = x⁶. So 8x⁶. (B) leaves x exponent unchanged; (C) takes 16·3/4 = 12 wrongly; (D) takes 16^(3/4) as 16^(3) something; (E) adds 8+3.'
  },

  // ───────────────────────── algebra-inequality (2) ─────────────────────────
  {
    id: 'q-actm-012',
    section: 'math',
    topic: 'algebra-inequality',
    difficulty: 22,
    stem: 'Solve for x: −3x + 5 > 14.',
    choices: ['x > 3', 'x > −3', 'x > 19/3', 'x < −3', 'x < 3'],
    answer: 3,
    explanation: '−3x > 9. Divide by −3 and FLIP: x < −3. (A) forgets to flip; (C)/(D) drop the sign on −3; (E) divides by 3 without subtracting properly.'
  },
  {
    id: 'q-actm-013',
    section: 'math',
    topic: 'algebra-inequality',
    difficulty: 30,
    stem: 'Which of the following is the solution set for |2x − 1| ≤ 5?',
    choices: ['x ≥ −2', '−2 ≤ x ≤ 3', '−3 ≤ x ≤ 2', 'x ≤ 3', 'x ≤ −2 or x ≥ 3'],
    answer: 1,
    explanation: '|2x − 1| ≤ 5 means −5 ≤ 2x − 1 ≤ 5 → −4 ≤ 2x ≤ 6 → −2 ≤ x ≤ 3. (A)/(B) keep only one side; (D) swaps signs; (E) is the solution to ≥ 5, not ≤ 5.'
  },

  // ───────────────────────── algebra-systems (2) ─────────────────────────
  {
    id: 'q-actm-014',
    section: 'math',
    topic: 'algebra-systems',
    difficulty: 25,
    stem: 'If 2x + y = 11 and x − y = 1, what is the value of x?',
    choices: ['4', '3', '5', '6', '2'],
    answer: 0,
    explanation: 'Add the equations: 3x = 12, so x = 4. (B) is from a sign error on adding y; (D) solves for y; (E) misadds 11+1 then divides by 2.'
  },
  {
    id: 'q-actm-015',
    section: 'math',
    topic: 'algebra-systems',
    difficulty: 31,
    stem: 'A vendor sells small drinks for $2 and large drinks for $5. On Saturday, the vendor sold 80 drinks for $295 in total. How many small drinks were sold?',
    choices: ['35', '25', '55', '30', '45'],
    answer: 0,
    explanation: 'Let s = small, l = large. s + l = 80 and 2s + 5l = 295. Substitute l = 80 − s: 2s + 5(80 − s) = 295 → 2s + 400 − 5s = 295 → −3s = −105 → s = 35. So 35 small drinks. (A) solves a slightly different system; (D) is the count of large drinks; (E) miscomputes.'
  },

  // ───────────────────── intermediate-algebra-quadratic (3) ─────────────────────
  {
    id: 'q-actm-016',
    section: 'math',
    topic: 'intermediate-algebra-quadratic',
    difficulty: 23,
    stem: 'What are the solutions to x² − 5x + 6 = 0?',
    choices: ['x = −1 and x = −6', 'x = −2 and x = −3', 'x = 6 only', 'x = 1 and x = 6', 'x = 2 and x = 3'],
    answer: 4,
    explanation: 'Factor: (x − 2)(x − 3) = 0, so x = 2 or x = 3. (A) flips signs; (B) misfactors; (D) flips signs of the b=1, c=6 misread; (E) drops a root.'
  },
  {
    id: 'q-actm-017',
    section: 'math',
    topic: 'intermediate-algebra-quadratic',
    difficulty: 29,
    stem: 'What is the sum of the solutions of 2x² − 7x − 15 = 0?',
    choices: ['\\frac{7}{2}', '5', '−15/2', '−5/2', '\\frac{15}{2}'],
    answer: 0,
    explanation: 'For ax² + bx + c = 0, sum of roots = −b/a = 7/2. (A) is c/a; (B) drops a sign; (D) reverses sign of −b/a; (E) is approximate guess.'
  },
  {
    id: 'q-actm-018',
    section: 'math',
    topic: 'intermediate-algebra-quadratic',
    difficulty: 34,
    stem: 'For what value of k does the equation x² + kx + 16 = 0 have exactly one real solution?',
    choices: ['−16', '−8', '4', '8 only', '−8 or 8'],
    answer: 4,
    explanation: 'Discriminant = 0: k² − 4(1)(16) = 0 → k² = 64 → k = ±8. Both values yield a double root. (A) takes c=16 as k; (B)/(D) keep only one sign; (C) takes √16.'
  },

  // ───────────────────── intermediate-algebra-functions (2) ─────────────────────
  {
    id: 'q-actm-019',
    section: 'math',
    topic: 'intermediate-algebra-functions',
    difficulty: 22,
    stem: 'If f(x) = 2x² − 3x + 1, what is f(−2)?',
    choices: ['11', '15', '−1', '−13', '3'],
    answer: 1,
    explanation: 'f(−2) = 2(4) − 3(−2) + 1 = 8 + 6 + 1 = 15. (A) drops the sign on −3·(−2); (B) treats (−2)² as −4; (C) drops the +1 and other sign error; (D) adds 8 + 6 − 3.'
  },
  {
    id: 'q-actm-020',
    section: 'math',
    topic: 'intermediate-algebra-functions',
    difficulty: 25,
    stem: 'If f(x) = 3x − 1 and g(x) = x² + 2, what is f(g(2))?',
    choices: ['17', '23', '11', '5', '20'],
    answer: 0,
    explanation: 'g(2) = 4 + 2 = 6. f(6) = 3(6) − 1 = 17. (A) is f(2); (B) is g(3) trick; (D) is 3·6 + 2; (E) computes 3·8 − 1 misordering.'
  },

  // ───────────────────────── evaluate-function (2) ─────────────────────────
  {
    id: 'q-actm-021',
    section: 'math',
    topic: 'evaluate-function',
    difficulty: 19,
    stem: 'If h(x) = 4x − 7, what is h(5)?',
    choices: ['−2', '20', '27', '13', '33'],
    answer: 3,
    explanation: 'h(5) = 4·5 − 7 = 20 − 7 = 13. (A) is 7 − 4·5 + ... wrong sign; (C) forgets to subtract 7; (D) adds instead of subtracts; (E) computes 4·(5+5) − 7.'
  },
  {
    id: 'q-actm-022',
    section: 'math',
    topic: 'evaluate-function',
    difficulty: 24,
    stem: 'If f(x) = \\frac{x + 2}{x − 3}, what is f(1)?',
    choices: ['−1', '−3/2', '0', '\\frac{3}{2}', '3'],
    answer: 1,
    explanation: 'f(1) = (1 + 2)/(1 − 3) = 3/(−2) = −3/2. (B) computes (1−3)/(1+2); (C) misreads numerator; (D) drops the negative; (E) computes only numerator.'
  },

  // ───────────────────────── log (2) ─────────────────────────
  {
    id: 'q-actm-023',
    section: 'math',
    topic: 'log',
    difficulty: 22,
    stem: 'What is log₂(32)?',
    choices: ['16', '2', '6', '4', '5'],
    answer: 4,
    explanation: '2⁵ = 32, so log₂(32) = 5. (A) is log₂(4); (B) is log₂(16); (D) is log₂(64); (E) is 32/2.'
  },
  {
    id: 'q-actm-024',
    section: 'math',
    topic: 'log',
    difficulty: 28,
    stem: 'If log₃(x) + log₃(4) = log₃(36), what is x?',
    choices: ['32', '40', '9', '3', '4'],
    answer: 2,
    explanation: 'log₃(4x) = log₃(36), so 4x = 36 → x = 9. (A) is √9; (B) confuses x with 4; (D) subtracts 4 from 36; (E) adds 4 + 36.'
  },

  // ───────────────────── coordinate-geometry-slope (2) ─────────────────────
  {
    id: 'q-actm-025',
    section: 'math',
    topic: 'coordinate-geometry-slope',
    difficulty: 22,
    stem: 'What is the slope of the line through points (2, 3) and (8, 15)?',
    choices: ['6', '1', '2', '\\frac{1}{2}', '3'],
    answer: 2,
    explanation: 'Slope = (15 − 3)/(8 − 2) = 12/6 = 2. (A) inverts the formula; (D) uses Δy/(Δx − 2); (E) uses Δx alone.'
  },
  {
    id: 'q-actm-026',
    section: 'math',
    topic: 'coordinate-geometry-slope',
    difficulty: 24,
    stem: 'A line passes through (−1, 4) and is perpendicular to the line y = (1/3)x + 7. What is the slope of the line through (−1, 4)?',
    choices: ['−3', '3', '−1/3', '7', '\\frac{1}{3}'],
    answer: 0,
    explanation: 'Perpendicular slopes are negative reciprocals: negative reciprocal of 1/3 is −3. (B) keeps the same slope with sign flip but doesn\'t take reciprocal; (C) just keeps original; (D) drops the negative; (E) is the y-intercept.'
  },

  // ───────────────────── coordinate-geometry-midpoint (2) ─────────────────────
  {
    id: 'q-actm-027',
    section: 'math',
    topic: 'coordinate-geometry-midpoint',
    difficulty: 23,
    stem: 'What is the midpoint of the segment with endpoints (−2, 5) and (6, −1)?',
    choices: ['(2, 3)', '(8, −6)', '(4, 4)', '(8, 6)', '(2, 2)'],
    answer: 4,
    explanation: 'Midpoint = ((−2 + 6)/2, (5 + (−1))/2) = (2, 2). (B) misadds the y; (C) divides differently; (D)/(E) compute differences (the distance components) instead of averages.'
  },
  {
    id: 'q-actm-028',
    section: 'math',
    topic: 'coordinate-geometry-midpoint',
    difficulty: 25,
    stem: 'The midpoint of segment AB is (3, −2). If A = (−1, 4), what are the coordinates of B?',
    choices: ['(1, 1)', '(2, 2)', '(7, −8)', '(4, −6)', '(7, 6)'],
    answer: 2,
    explanation: 'If midpoint is ((x₁ + x₂)/2, (y₁ + y₂)/2) = (3, −2), then x₂ = 2(3) − (−1) = 7 and y₂ = 2(−2) − 4 = −8. So B = (7, −8). (A) averages instead of doubling; (B) treats midpoint as A; (C) makes a sign error on y; (E) drops the sign.'
  },

  // ───────────────────── coordinate-geometry-circle (2) ─────────────────────
  {
    id: 'q-actm-029',
    section: 'math',
    topic: 'coordinate-geometry-circle',
    difficulty: 23,
    stem: 'What is the equation of a circle with center (2, −3) and radius 5?',
    choices: ['(x − 2)² + (y − 3)² = 25', '(x + 2)² + (y − 3)² = 25', '(x + 2)² + (y + 3)² = 5', '(x − 2)² + (y + 3)² = 25', '(x − 2)² + (y + 3)² = 5'],
    answer: 3,
    explanation: 'Standard form: (x − h)² + (y − k)² = r². With (h, k) = (2, −3) and r = 5: (x − 2)² + (y + 3)² = 25. (A) uses r instead of r²; (B) flips signs of center; (D) flips sign of k; (E) flips center sign and uses r.'
  },
  {
    id: 'q-actm-030',
    section: 'math',
    topic: 'coordinate-geometry-circle',
    difficulty: 30,
    stem: 'A circle has equation x² + y² − 6x + 8y = 0. What is its radius?',
    choices: ['1', '5', '14', '25', '7'],
    answer: 1,
    explanation: 'Complete the square: (x² − 6x + 9) + (y² + 8y + 16) = 9 + 16 → (x − 3)² + (y + 4)² = 25, so r = √25 = 5. (A) takes constant 0; (C) adds halves; (D) uses 2r; (E) leaves r².'
  },

  // ───────────────────── plane-geometry-angles (2) ─────────────────────
  {
    id: 'q-actm-031',
    section: 'math',
    topic: 'plane-geometry-angles',
    difficulty: 23,
    stem: 'Two angles of a triangle measure 47° and 68°. What is the measure of the third angle?',
    choices: ['115°', '55°', '75°', '45°', '65°'],
    answer: 4,
    explanation: 'Triangle angles sum to 180°: 180 − 47 − 68 = 65°. (A) subtracts 5; (B) miscomputes 47 + 68 then subtracts; (D) subtracts wrong; (E) is the supplement of 65 (180 − 65).'
  },
  {
    id: 'q-actm-032',
    section: 'math',
    topic: 'plane-geometry-angles',
    difficulty: 28,
    stem: 'Two parallel lines are cut by a transversal. One of the angles formed measures 110°. What is the measure of an alternate interior angle to it?',
    choices: ['55°', '35°', '250°', '110°', '70°'],
    answer: 3,
    explanation: 'Alternate interior angles between parallel lines are congruent, so the angle is 110°. (A) is 110/π-style guess; (B) is half of 110; (C) is supplement; (E) is 360 − 110.'
  },

  // ───────────────────── plane-geometry-area (2) ─────────────────────
  {
    id: 'q-actm-033',
    section: 'math',
    topic: 'plane-geometry-area',
    difficulty: 21,
    stem: 'A rectangle has length 12 cm and width 5 cm. What is its area, in square centimeters?',
    choices: ['34', '120', '17', '60', '24'],
    answer: 3,
    explanation: 'Area = length × width = 12 × 5 = 60. (A) adds the two dimensions; (B) computes 2·12 = 24; (C) is the perimeter; (E) doubles area.'
  },
  {
    id: 'q-actm-034',
    section: 'math',
    topic: 'plane-geometry-area',
    difficulty: 32,
    stem: 'In an equilateral triangle, each side has length 6. What is the area of the triangle?',
    choices: ['12√3', '9√3', '36', '18', '18√3'],
    answer: 1,
    explanation: 'Area of equilateral triangle = (s²·√3)/4 = (36·√3)/4 = 9√3. (B) uses s²/3 form; (C) drops √3; (D) doubles area; (E) is s².'
  },

  // ───────────────────── plane-geometry-circumference (2) ─────────────────────
  {
    id: 'q-actm-035',
    section: 'math',
    topic: 'plane-geometry-circumference',
    difficulty: 21,
    stem: 'What is the circumference of a circle with radius 7?',
    choices: ['14', '7π', '49π', '28π', '14π'],
    answer: 4,
    explanation: 'C = 2πr = 2π(7) = 14π. (A) drops the 2; (C) doubles diameter; (D) is the area πr²; (E) drops the π.'
  },
  {
    id: 'q-actm-036',
    section: 'math',
    topic: 'plane-geometry-circumference',
    difficulty: 22,
    stem: 'A circle has circumference 20π. What is its diameter?',
    choices: ['100', '10', '40', '400', '20'],
    answer: 4,
    explanation: 'C = πd, so d = C/π = 20π/π = 20. (A) gives the radius; (C) doubles the diameter; (D)/(E) are unrelated computations.'
  },

  // ───────────────────── plane-geometry-pythagoras (2) ─────────────────────
  {
    id: 'q-actm-037',
    section: 'math',
    topic: 'plane-geometry-pythagoras',
    difficulty: 22,
    stem: 'In a right triangle, the legs measure 9 and 12. What is the length of the hypotenuse?',
    choices: ['21', '225', '108', '15', '3'],
    answer: 3,
    explanation: '9² + 12² = 81 + 144 = 225. Hypotenuse = √225 = 15. (A) subtracts the legs; (C) adds the legs; (D) multiplies; (E) forgets to take the square root.'
  },
  {
    id: 'q-actm-038',
    section: 'math',
    topic: 'plane-geometry-pythagoras',
    difficulty: 30,
    stem: 'A right triangle has hypotenuse 13 and one leg of length 5. What is the length of the other leg?',
    choices: ['18', '8', '12', '14', '√194'],
    answer: 2,
    explanation: '13² − 5² = 169 − 25 = 144. √144 = 12. (A) is 13 − 5; (C) is 13 + 1; (D) is 13 + 5; (E) is √(169 + 25) — the trap of adding instead of subtracting.'
  },

  // ───────────────────── plane-geometry-volume (2) ─────────────────────
  {
    id: 'q-actm-039',
    section: 'math',
    topic: 'plane-geometry-volume',
    difficulty: 23,
    stem: 'A rectangular box has length 4, width 3, and height 5. What is its volume?',
    choices: ['47', '94', '20', '12', '60'],
    answer: 4,
    explanation: 'V = lwh = 4·3·5 = 60. (A) is l·w; (B) is w·... partial; (C) is half the surface area; (E) is full surface area 2(12 + 15 + 20) = 94.'
  },
  {
    id: 'q-actm-040',
    section: 'math',
    topic: 'plane-geometry-volume',
    difficulty: 24,
    stem: 'A cylinder has radius 3 and height 10. What is its volume?',
    choices: ['60π', '90π', '300π', '100π', '30π'],
    answer: 1,
    explanation: 'V = πr²h = π(9)(10) = 90π. (A) uses r instead of r²; (B) is lateral area; (D) confuses formula; (E) uses r·h·... drop a 3.'
  },

  // ───────────────────────── trig-basic (3) ─────────────────────────
  {
    id: 'q-actm-041',
    section: 'math',
    topic: 'trig-basic',
    difficulty: 21,
    stem: 'In a right triangle, the side opposite angle A has length 5 and the hypotenuse has length 13. What is sin A?',
    choices: ['\\frac{5}{13}', '\\frac{5}{12}', '\\frac{12}{13}', '\\frac{13}{12}', '\\frac{13}{5}'],
    answer: 0,
    explanation: 'sin A = opposite/hypotenuse = 5/13. (A) is tan A; (C) is cos A; (D) is csc A; (E) is sec A.'
  },
  {
    id: 'q-actm-042',
    section: 'math',
    topic: 'trig-basic',
    difficulty: 30,
    stem: 'If sin θ = 3/5 and θ is acute, what is cos θ?',
    choices: ['\\frac{5}{3}', '\\frac{3}{4}', '\\frac{5}{4}', '\\frac{3}{5}', '\\frac{4}{5}'],
    answer: 4,
    explanation: 'Use sin²θ + cos²θ = 1: cos²θ = 1 − 9/25 = 16/25 → cos θ = 4/5 (positive since acute). (A) is sin θ itself; (C) is sec θ; (D) is csc θ; (E) is tan θ.'
  },
  {
    id: 'q-actm-043',
    section: 'math',
    topic: 'trig-basic',
    difficulty: 31,
    stem: 'A 25-foot ladder leans against a vertical wall. The base of the ladder is 7 feet from the wall. To the nearest tenth of a degree, what angle does the ladder make with the ground?',
    choices: ['73.7°', '16.3°', '56.0°', '34.0°', '76.4°'],
    answer: 0,
    explanation: 'cos θ = adjacent/hypotenuse = 7/25 = 0.28, so θ = arccos(0.28) ≈ 73.7°. (A) uses arctan(7/24)-style guess; (B) uses arctan(7/something); (C) is the complement 90 − 34 wrong; (E) is arccos with a near-miss.'
  },

  // ───────────────────────── sequences (2) ─────────────────────────
  {
    id: 'q-actm-044',
    section: 'math',
    topic: 'sequences',
    difficulty: 25,
    stem: 'In the arithmetic sequence 4, 7, 10, 13, …, what is the 20th term?',
    choices: ['57', '60', '64', '63', '61'],
    answer: 4,
    explanation: 'a_n = a₁ + (n − 1)d = 4 + 19·3 = 4 + 57 = 61. (A) forgets to add a₁; (B) uses 20·3; (D) uses 20·3 + 3; (E) uses 4 + 20·3.'
  },
  {
    id: 'q-actm-045',
    section: 'math',
    topic: 'sequences',
    difficulty: 33,
    stem: 'The first three terms of a geometric sequence are 5, 15, 45. What is the 6th term?',
    choices: ['135', '3,645', '1,215', '10,935', '405'],
    answer: 2,
    explanation: 'Common ratio r = 3. a_n = a₁·r^(n−1) = 5·3⁵ = 5·243 = 1,215. (A) is the 4th term; (B) is the 5th term; (D) is the 7th term; (E) is the 8th term — typical off-by-one traps.'
  }
]);
