/**
 * PSAT Math fill batch (45 questions across the existing topic
 * coverage plus newly-introduced topic IDs). Digital PSAT format.
 *
 * testType: 'PSAT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'math'
 *
 * Concatenates onto window.STL_QUESTIONS_PSAT.
 */
'use strict';

window.STL_QUESTIONS_PSAT = (window.STL_QUESTIONS_PSAT || []).concat([
  // ───────────────────────── linear-equation (4) ─────────────────────────
  {
    id: 'q-psatm-001',
    section: 'math',
    topic: 'linear-equation',
    difficulty: 320,
    stem: 'If 3x + 7 = 25, what is the value of x?',
    choices: ['8', '6', '4', '\\frac{32}{3}'],
    answer: 1,
    explanation: '3x + 7 = 25 → 3x = 18 → x = 6. (A) divides 25 − 7 by something other than 3; (C) subtracts 7 then adds instead of dividing; (D) ignores the subtraction step.'
  },
  {
    id: 'q-psatm-002',
    section: 'math',
    topic: 'linear-equation',
    difficulty: 480,
    stem: 'If 5(2x − 3) = 4x + 9, what is the value of x?',
    choices: ['4', '1', '6', '2'],
    answer: 0,
    explanation: '10x − 15 = 4x + 9 → 6x = 24 → x = 4. (A) drops the 5 distribution on the −3; (B) sign error gives 6x = 12; (D) adds 15 + 9 then divides by 4 (treats RHS coefficient incorrectly).'
  },
  {
    id: 'q-psatm-003',
    section: 'math',
    topic: 'linear-equation',
    difficulty: 560,
    stem: 'For what value of c does the equation 2(x − c) = 3x + 4 have the solution x = −6?',
    choices: ['5', '−1', '1', '−5'],
    answer: 2,
    explanation: 'Substitute x = −6: 2(−6 − c) = 3(−6) + 4 → −12 − 2c = −14 → −2c = −2 → c = 1. Check: 2(−6 − 1) = −14; 3(−6) + 4 = −14. ✓ (A) sign-flips and includes an extra factor; (B) drops the constant; (D) drops the negative on the result.'
  },
  {
    id: 'q-psatm-004',
    section: 'math',
    topic: 'linear-equation',
    difficulty: 620,
    stem: 'If \\frac{x − 4}{3} + \\frac{2x + 1}{6} = 4, what is the value of x?',
    choices: ['\\frac{11}{4}', '\\frac{7}{2}', '\\frac{25}{4}', '\\frac{31}{4}'],
    answer: 3,
    explanation: 'Multiply both sides by 6: 2(x − 4) + (2x + 1) = 24 → 2x − 8 + 2x + 1 = 24 → 4x − 7 = 24 → 4x = 31 → x = 31/4. Check: (31/4 − 4)/3 + (2·31/4 + 1)/6 = (15/4)/3 + (33/2)/6 = 5/4 + 11/4 = 16/4 = 4. ✓ (A) drops a factor in clearing fractions; (B) treats the second fraction with denominator 6 as if it were 3; (C) sign error on the −8.'
  },

  // ───────────────────────── mean (3) ─────────────────────────
  {
    id: 'q-psatm-005',
    section: 'math',
    topic: 'mean',
    difficulty: 380,
    stem: 'The mean of five numbers is 12. What is the sum of the five numbers?',
    choices: ['12', '72', '17', '60'],
    answer: 3,
    explanation: 'Sum = mean × count = 12 × 5 = 60. (A) is the mean itself; (B) adds 12 + 5; (D) multiplies by 6 instead of 5.'
  },
  {
    id: 'q-psatm-006',
    section: 'math',
    topic: 'mean',
    difficulty: 500,
    stem: 'The mean of six test scores is 84. If the lowest score, 60, is removed, what is the mean of the remaining five scores?',
    choices: ['88.8', '82.8', '89.0', '90.0'],
    answer: 0,
    explanation: 'Original sum = 6 × 84 = 504. New sum = 504 − 60 = 444. New mean = 444/5 = 88.8. (A) divides the old mean by something else; (C) rounds incorrectly; (D) divides 450/5.'
  },
  {
    id: 'q-psatm-007',
    section: 'math',
    topic: 'mean',
    difficulty: 600,
    stem: 'A class of 20 students has a mean score of 75 on a test. After a 21st student takes the test, the mean rises to 76. What did the 21st student score?',
    choices: ['76', '96', '85', '95'],
    answer: 1,
    explanation: 'Old sum = 20 × 75 = 1500. New sum = 21 × 76 = 1596. The 21st score = 1596 − 1500 = 96. (A) is the new mean; (B) uses 5 × difference; (C) is off-by-one (uses 20 × 76 − 1500 + 19).'
  },

  // ───────────────────────── median (3) ─────────────────────────
  {
    id: 'q-psatm-008',
    section: 'math',
    topic: 'median',
    difficulty: 300,
    stem: 'What is the median of the data set {3, 8, 5, 12, 7}?',
    choices: ['35', '5', '7', '8'],
    answer: 2,
    explanation: 'Sort: 3, 5, 7, 8, 12. Middle value = 7. (A) is the second value when sorted; (C) is the fourth; (D) is the sum.'
  },
  {
    id: 'q-psatm-009',
    section: 'math',
    topic: 'median',
    difficulty: 470,
    stem: 'What is the median of {2, 4, 7, 9, 11, 14}?',
    choices: ['8', '\\frac{47}{6}', '9', '7'],
    answer: 0,
    explanation: 'Six values, so median = average of the 3rd and 4th = (7 + 9)/2 = 8. (A) and (C) pick one of the two middle values; (D) is the mean.'
  },
  {
    id: 'q-psatm-010',
    section: 'math',
    topic: 'median',
    difficulty: 520,
    stem: 'A data set has 10 values. The five smallest are 2, 3, 5, 6, 7 and the five largest are 9, 11, 12, 15, 20. What is the median?',
    choices: ['7', '9', '9.5', '8'],
    answer: 3,
    explanation: 'For 10 values, median = average of 5th and 6th values when sorted. Combined sorted list: 2, 3, 5, 6, 7, 9, 11, 12, 15, 20. The 5th and 6th are 7 and 9, so median = (7 + 9)/2 = 8. (A) is just the 5th value; (C) is just the 6th; (D) averages 9 and 10.'
  },

  // ───────────────────────── multiply-binomials (4) ─────────────────────────
  {
    id: 'q-psatm-011',
    section: 'math',
    topic: 'multiply-binomials',
    difficulty: 510,
    stem: 'What is the product (x + 3)(x + 5)?',
    choices: ['x² + 8', 'x² + 8x + 15', 'x² + 15', 'x² + 15x + 8'],
    answer: 1,
    explanation: 'FOIL: x·x + x·5 + 3·x + 3·5 = x² + 5x + 3x + 15 = x² + 8x + 15. (A) drops the linear term; (B) drops the linear term and uses only the constants; (D) swaps the linear and constant terms.'
  },
  {
    id: 'q-psatm-012',
    section: 'math',
    topic: 'multiply-binomials',
    difficulty: 470,
    stem: 'Expand (2x − 3)(x + 4).',
    choices: ['2x² + 11x − 12', '2x² − 11x + 12', '2x² + 5x − 12', '2x² − 5x − 12'],
    answer: 2,
    explanation: 'FOIL: 2x·x + 2x·4 + (−3)·x + (−3)·4 = 2x² + 8x − 3x − 12 = 2x² + 5x − 12. (B) sign error on the 8x term; (C) adds 8 + 3 instead of subtracting; (D) sign-flips the entire middle and constant.'
  },
  {
    id: 'q-psatm-013',
    section: 'math',
    topic: 'multiply-binomials',
    difficulty: 540,
    stem: 'If (3x + a)(x − 2) = 3x² + bx − 10, what is the value of b?',
    choices: ['1', '−11', '−1', '11'],
    answer: 2,
    explanation: 'Constant term: a·(−2) = −10 → a = 5. Linear term: 3x·(−2) + a·x = −6x + 5x = −x, so b = −1. (A) sums −6 and −5; (C) sign error on −6 + 5; (D) sums 6 and 5.'
  },
  {
    id: 'q-psatm-014',
    section: 'math',
    topic: 'multiply-binomials',
    difficulty: 620,
    stem: 'If (2x + 5)(x − k) = 2x² − 3x − 20, what is the value of k?',
    choices: ['−5/2', '\\frac{5}{2}', '4', '−4'],
    answer: 2,
    explanation: 'Constant: 5·(−k) = −20 → k = 4. Check linear: 2x·(−4) + 5x = −8x + 5x = −3x. ✓ (A) keeps the negative from the (−k); (B) divides −5 by 2; (D) uses 5/2 from a misread of leading coefficient.'
  },

  // ───────────────────────── percent-of (4) ─────────────────────────
  {
    id: 'q-psatm-015',
    section: 'math',
    topic: 'percent-of',
    difficulty: 250,
    stem: 'What is 30% of 80?',
    choices: ['18', '27', '24', '30'],
    answer: 2,
    explanation: '0.30 × 80 = 24. (A) computes 30% of 60; (C) computes 30% of 90; (D) is the percent itself.'
  },
  {
    id: 'q-psatm-016',
    section: 'math',
    topic: 'percent-of',
    difficulty: 470,
    stem: '15 is what percent of 60?',
    choices: ['20%', '25%', '40%', '15%'],
    answer: 1,
    explanation: '15/60 = 0.25 = 25%. (A) is the value 15 itself; (B) uses 12/60; (D) uses 24/60.'
  },
  {
    id: 'q-psatm-017',
    section: 'math',
    topic: 'percent-of',
    difficulty: 580,
    stem: 'A jacket is marked down 30% to a sale price of $63. What was the original price?',
    choices: ['$90.00', '$84.00', '$93.00', '$81.90'],
    answer: 0,
    explanation: 'Sale = 0.70 × original → original = 63/0.70 = $90. (A) adds 30% to 63; (B) divides 63 by 0.75; (D) adds $30 to $63.'
  },
  {
    id: 'q-psatm-018',
    section: 'math',
    topic: 'percent-of',
    difficulty: 640,
    stem: 'A quantity increases by 20% and then decreases by 25%. What is the overall percent change?',
    choices: ['0%', '−10%', '+5%', '−5%'],
    answer: 1,
    explanation: 'Final = original × 1.20 × 0.75 = 0.90 × original, a 10% decrease. (B) treats the changes as additive (20 − 25); (C) thinks they cancel; (D) uses 1.25 × 0.80 by mistake.'
  },

  // ───────────────────────── slope-intercept (3) ─────────────────────────
  {
    id: 'q-psatm-019',
    section: 'math',
    topic: 'slope-intercept',
    difficulty: 380,
    stem: 'What is the slope of the line y = −3x + 7?',
    choices: ['−3', '3', '−7', '7'],
    answer: 0,
    explanation: 'In y = mx + b, m is the slope, so m = −3. (A) confuses slope with intercept (and sign-flips); (C) drops the sign; (D) uses the y-intercept value.'
  },
  {
    id: 'q-psatm-020',
    section: 'math',
    topic: 'slope-intercept',
    difficulty: 510,
    stem: 'A line has slope 2 and passes through the point (3, 1). What is its y-intercept?',
    choices: ['−1', '1', '5', '−5'],
    answer: 3,
    explanation: 'y = 2x + b. At (3, 1): 1 = 6 + b → b = −5. (B) computes 1 − 2; (C) plugs the y of the given point; (D) sign error: 6 − 1 = 5.'
  },
  {
    id: 'q-psatm-021',
    section: 'math',
    topic: 'slope-intercept',
    difficulty: 520,
    stem: 'The equation 4x + 2y = 10 is rewritten in slope-intercept form. What is the slope?',
    choices: ['−2', '4', '−4', '2'],
    answer: 0,
    explanation: 'Solve for y: 2y = −4x + 10 → y = −2x + 5. Slope = −2. (A) forgets to divide by 2; (C) drops the negative; (D) uses the original x-coefficient.'
  },

  // ───────────────────────── two-point-slope (3) ─────────────────────────
  {
    id: 'q-psatm-022',
    section: 'math',
    topic: 'two-point-slope',
    difficulty: 490,
    stem: 'What is the slope of the line through (1, 2) and (4, 11)?',
    choices: ['\\frac{13}{5}', '\\frac{1}{3}', '3', '9'],
    answer: 2,
    explanation: 'm = (11 − 2)/(4 − 1) = 9/3 = 3. (A) inverts rise/run; (C) is the rise alone; (D) sums coordinates instead of subtracting.'
  },
  {
    id: 'q-psatm-023',
    section: 'math',
    topic: 'two-point-slope',
    difficulty: 520,
    stem: 'What is the slope of the line through (−2, 5) and (3, −5)?',
    choices: ['−1/2', '−2', '\\frac{1}{2}', '2'],
    answer: 1,
    explanation: 'm = (−5 − 5)/(3 − (−2)) = −10/5 = −2. (B) inverts; (C) inverts and drops the sign; (D) drops the sign.'
  },
  {
    id: 'q-psatm-024',
    section: 'math',
    topic: 'two-point-slope',
    difficulty: 600,
    stem: 'A line passes through (k, 4) and (2, k). If the slope of the line is 1, what is the value of k?',
    choices: ['2', '4', '3', '1'],
    answer: 2,
    explanation: 'm = (k − 4)/(2 − k) = 1 → k − 4 = 2 − k → 2k = 6 → k = 3. (A) sets numerator = 0; (B) is the x of the second point; (D) sets k − 4 = 0.'
  },

  // ───────────────────────── inequalities (3) ─────────────────────────
  {
    id: 'q-psatm-025',
    section: 'math',
    topic: 'inequalities',
    difficulty: 400,
    stem: 'Solve for x: 2x − 5 < 11.',
    choices: ['x < 3', 'x > 8', 'x < 8', 'x < 16'],
    answer: 2,
    explanation: '2x − 5 < 11 → 2x < 16 → x < 8. (A) divides 11 by some other value; (C) flips the inequality (which is wrong since we did not divide by a negative); (D) forgets to divide by 2.'
  },
  {
    id: 'q-psatm-026',
    section: 'math',
    topic: 'inequalities',
    difficulty: 530,
    stem: 'Solve for x: −3x + 4 ≥ 19.',
    choices: ['x ≥ 5', 'x ≥ −5', 'x ≤ −5', 'x ≤ 5'],
    answer: 2,
    explanation: '−3x ≥ 15 → x ≤ −5 (flip the inequality when dividing by a negative). (B) forgets to flip; (C) drops the sign and forgets to flip; (D) drops the sign.'
  },
  {
    id: 'q-psatm-027',
    section: 'math',
    topic: 'inequalities',
    difficulty: 540,
    stem: 'Which integer value of x satisfies the system 2x + 1 > 5 and 3x − 2 < 13?',
    choices: ['6', '2', '1', '3'],
    answer: 3,
    explanation: 'First: 2x > 4 → x > 2. Second: 3x < 15 → x < 5. So 2 < x < 5; integer choices are 3 and 4. Among answers, only 3 fits. (A) and (B) violate x > 2; (D) violates x < 5.'
  },

  // ───────────────────────── systems-of-equations (3) ─────────────────────────
  {
    id: 'q-psatm-028',
    section: 'math',
    topic: 'systems-of-equations',
    difficulty: 480,
    stem: 'Solve the system: x + y = 10 and x − y = 4. What is x?',
    choices: ['3', '14', '7', '5'],
    answer: 2,
    explanation: 'Add: 2x = 14 → x = 7. (A) is y = 3; (B) is the average; (D) is the sum.'
  },
  {
    id: 'q-psatm-029',
    section: 'math',
    topic: 'systems-of-equations',
    difficulty: 590,
    stem: 'Solve: 3x + 2y = 16 and x − y = 2. What is y?',
    choices: ['2', '1', '4', '3'],
    answer: 0,
    explanation: 'From the second: x = y + 2. Substitute: 3(y + 2) + 2y = 16 → 5y + 6 = 16 → y = 2. Then x = 4. (A) divides 5 by 5; (C) confuses x with y; (D) is the value of x.'
  },
  {
    id: 'q-psatm-030',
    section: 'math',
    topic: 'systems-of-equations',
    difficulty: 690,
    stem: 'For what value of k does the system 2x + 3y = 7 and 4x + ky = 13 have NO solution?',
    choices: ['13', '6', '3', '7'],
    answer: 1,
    explanation: 'No solution requires the lines to be parallel but not identical. Slopes equal: −2/3 = −4/k → k = 6. Check intercepts: with k = 6, second equation is 4x + 6y = 13, which is 2x + 3y = 6.5 ≠ 7, so the lines are parallel and distinct — no solution. (A) is the y-coefficient of the first; (C) and (D) are constants from the equations.'
  },

  // ───────────────────────── functions (3) ─────────────────────────
  {
    id: 'q-psatm-031',
    section: 'math',
    topic: 'functions',
    difficulty: 380,
    stem: 'If f(x) = 2x² − 3x + 1, what is f(−2)?',
    choices: ['15', '3', '11', '−13'],
    answer: 0,
    explanation: 'f(−2) = 2(4) − 3(−2) + 1 = 8 + 6 + 1 = 15. (A) sign error on the squaring (treats (−2)² as −4); (B) drops the +1 and forgets to flip the sign on −3x; (C) computes 2(−2)² − 3(−2) − 3 by mistake.'
  },
  {
    id: 'q-psatm-032',
    section: 'math',
    topic: 'functions',
    difficulty: 460,
    stem: 'If g(x) = 3x − 5 and g(a) = 16, what is the value of a?',
    choices: ['7', '43', '21', '\\frac{11}{3}'],
    answer: 0,
    explanation: '3a − 5 = 16 → 3a = 21 → a = 7. (A) divides 11 by 3 prematurely; (C) is the value of 3a; (D) computes 3·16 − 5.'
  },
  {
    id: 'q-psatm-033',
    section: 'math',
    topic: 'functions',
    difficulty: 520,
    stem: 'If f(x) = x² and g(x) = x + 2, what is f(g(3))?',
    choices: ['25', '9', '11', '13'],
    answer: 0,
    explanation: 'g(3) = 5; f(5) = 25. (A) computes f(3); (B) computes f(3) + 2; (C) computes g(3²) − ... distractor for misordered composition.'
  },

  // ───────────────────────── exponents (4) ─────────────────────────
  {
    id: 'q-psatm-034',
    section: 'math',
    topic: 'exponents',
    difficulty: 320,
    stem: 'Simplify: x³ · x⁴.',
    choices: ['x⁷', 'x¹²', '2x⁷', '2x¹²'],
    answer: 0,
    explanation: 'When multiplying like bases, add exponents: x^(3+4) = x⁷. (B) multiplies the exponents; (C) and (D) incorrectly add the bases’ coefficients.'
  },
  {
    id: 'q-psatm-035',
    section: 'math',
    topic: 'exponents',
    difficulty: 460,
    stem: 'Simplify: (2x²)³.',
    choices: ['2x⁵', '6x⁶', '8x⁶', '2x⁶'],
    answer: 2,
    explanation: '(2x²)³ = 2³ · x^(2·3) = 8x⁶. (A) adds exponents and forgets to cube the 2; (B) cubes the exponent correctly but forgets to cube the 2; (C) multiplies 2·3 instead of 2³.'
  },
  {
    id: 'q-psatm-036',
    section: 'math',
    topic: 'exponents',
    difficulty: 500,
    stem: 'If 2^(x+1) = 32, what is the value of x?',
    choices: ['16', '3', '5', '4'],
    answer: 3,
    explanation: '32 = 2⁵, so x + 1 = 5 → x = 4. (A) is the exponent of 8; (C) is the exponent of 32 (forgot to subtract 1); (D) is half of 32.'
  },
  {
    id: 'q-psatm-037',
    section: 'math',
    topic: 'exponents',
    difficulty: 680,
    stem: 'Simplify: (x⁻²y³)² · (x⁵y⁻¹).',
    choices: ['xy⁵', 'x⁻⁹y⁵', 'x⁹y⁵', 'xy⁷'],
    answer: 0,
    explanation: '(x⁻²y³)² = x⁻⁴y⁶. Multiply by x⁵y⁻¹: x^(−4+5) y^(6−1) = x¹ y⁵ = xy⁵. (B) drops the addition and uses subtraction on the x exponents; (C) ignores the negative on the first x exponent; (D) forgets to subtract 1 from the y exponent.'
  },

  // ───────────────────────── ratios (3) ─────────────────────────
  {
    id: 'q-psatm-038',
    section: 'math',
    topic: 'ratios',
    difficulty: 340,
    stem: 'The ratio of red to blue marbles in a jar is 3:5. If there are 25 blue marbles, how many red marbles are there?',
    choices: ['15', '45', '40', '8'],
    answer: 0,
    explanation: '3/5 = r/25 → 5r = 75 → r = 15. (A) subtracts 17 from 25; (C) computes 25·5/3 ≈ 41.7 → 40; (D) computes 25 − 5 + 25 distractor.'
  },
  {
    id: 'q-psatm-039',
    section: 'math',
    topic: 'ratios',
    difficulty: 420,
    stem: 'A recipe calls for flour and sugar in a 5:2 ratio. If 14 cups of sugar are used, how many cups of flour are needed?',
    choices: ['17', '5.6', '35', '28'],
    answer: 2,
    explanation: '5/2 = f/14 → 2f = 70 → f = 35. (A) computes 14·(2/5); (B) adds 14 + 3; (C) doubles 14.'
  },
  {
    id: 'q-psatm-040',
    section: 'math',
    topic: 'ratios',
    difficulty: 500,
    stem: 'In a club, the ratio of seniors to juniors is 4:3. If there are 35 students total, how many are seniors?',
    choices: ['21', '20', '28', '15'],
    answer: 1,
    explanation: 'Total parts = 4 + 3 = 7. Each part = 35/7 = 5. Seniors = 4·5 = 20. (A) and (C) swap seniors with juniors (juniors = 15) or compute 3·7; (D) computes 4·7.'
  },

  // ───────────────────────── probability (3) ─────────────────────────
  {
    id: 'q-psatm-041',
    section: 'math',
    topic: 'probability',
    difficulty: 380,
    stem: 'A bag contains 4 red, 3 green, and 5 blue marbles. If one marble is drawn at random, what is the probability that it is green?',
    choices: ['\\frac{1}{4}', '\\frac{1}{3}', '\\frac{3}{12}', '\\frac{3}{8}'],
    answer: 0,
    explanation: 'Total = 4 + 3 + 5 = 12. P(green) = 3/12 = 1/4. (A) and (C) are equal; the canonical reduced form is 1/4. (B) divides 3 by 9 (forgets the green in the total); (D) divides 3 by 8 (forgets the blue).'
  },
  {
    id: 'q-psatm-042',
    section: 'math',
    topic: 'probability',
    difficulty: 380,
    stem: 'A fair six-sided die is rolled. What is the probability of rolling a number greater than 4?',
    choices: ['\\frac{1}{2}', '\\frac{1}{3}', '\\frac{1}{6}', '\\frac{2}{3}'],
    answer: 1,
    explanation: 'Numbers > 4 are {5, 6}, so P = 2/6 = 1/3. (A) treats it as exactly one outcome; (C) uses 3/6 (counts 4 itself); (D) uses 4/6.'
  },
  {
    id: 'q-psatm-043',
    section: 'math',
    topic: 'probability',
    difficulty: 700,
    stem: 'A bag has 5 red and 7 blue chips. Two chips are drawn without replacement. What is the probability that both are red?',
    choices: ['\\frac{5}{33}', '\\frac{5}{36}', '\\frac{25}{144}', '\\frac{5}{24}'],
    answer: 0,
    explanation: 'P(both red) = (5/12)·(4/11) = 20/132 = 5/33. (A) drops one in the denominator wrongly; (C) uses (5/12)(4/12); (D) uses (5/12)² (with replacement).'
  },

  // ───────────────────────── area-of-shapes (2) ─────────────────────────
  {
    id: 'q-psatm-044',
    section: 'math',
    topic: 'area-of-shapes',
    difficulty: 360,
    stem: 'A rectangle has length 12 and width 5. What is its area?',
    choices: ['34', '17', '60', '120'],
    answer: 2,
    explanation: 'Area = length × width = 12 × 5 = 60. (A) sums the dimensions; (B) is the perimeter; (D) doubles the area.'
  },
  {
    id: 'q-psatm-045',
    section: 'math',
    topic: 'area-of-shapes',
    difficulty: 480,
    stem: 'A circle has a diameter of 10. What is its area, in terms of π?',
    choices: ['5π', '10π', '25π', '100π'],
    answer: 2,
    explanation: 'Radius = 5, so area = π·5² = 25π. (A) uses the radius itself; (B) uses the diameter; (D) squares the diameter without halving.'
  }
]);
