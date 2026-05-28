/**
 * PSAT Math — fill batch 2.
 * testType: 'PSAT', section: 'math'.
 * Concatenates onto window.STL_QUESTIONS_PSAT.
 */
'use strict';
window.STL_QUESTIONS_PSAT = (window.STL_QUESTIONS_PSAT || []).concat([
  // ───────────────────────── EASY (10 @ 420–460) ─────────────────────────
  {
    id: 'q-psatm-fill2-001',
    section: 'math',
    topic: 'linear-equation',
    difficulty: 430,
    stem: 'If 4x − 9 = 11, what is the value of x?',
    choices: ['2', '20', '5', '\\frac{1}{2}'],
    answer: 2, // C
    explanation: '4x − 9 = 11 → 4x = 20 → x = 5. (A) divides 11/4 wrongly without first adding 9; (B) is the value of 4x, not x; (D) inverts numerator and denominator after dividing.'
  },
  {
    id: 'q-psatm-fill2-002',
    section: 'math',
    topic: 'percent-of',
    difficulty: 420,
    stem: 'What is 25% of 84?',
    choices: ['21', '25', '42', '336'],
    answer: 0, // A
    explanation: '25% of 84 = 0.25 × 84 = 21 (one-fourth of 84). (B) just restates the percent; (C) takes half of 84; (D) multiplies by 4 instead of dividing.'
  },
  {
    id: 'q-psatm-fill2-003',
    section: 'math',
    topic: 'function-evaluation',
    difficulty: 440,
    stem: 'If f(x) = 5x − 4, what is f(3)?',
    choices: ['7', '15', '11', '8'],
    answer: 2, // C
    explanation: 'f(3) = 5(3) − 4 = 15 − 4 = 11. (A) computes 5 + 3 − 1; (B) forgets to subtract 4; (D) computes 4 + 4.'
  },
  {
    id: 'q-psatm-fill2-004',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 450,
    stem: 'A triangle has a base of 10 and a height of 6. What is its area?',
    choices: ['60', '16', '30', '32'],
    answer: 2, // C
    explanation: 'Area = (1/2)·b·h = (1/2)(10)(6) = 30. (A) forgets the 1/2; (B) sums base and height; (D) sums and squares part of the dimensions.'
  },
  {
    id: 'q-psatm-fill2-005',
    section: 'math',
    topic: 'mean',
    difficulty: 430,
    stem: 'What is the mean of 4, 9, 6, 11, and 10?',
    choices: ['8', '9', '10', '40'],
    answer: 0, // A
    explanation: 'Sum = 4 + 9 + 6 + 11 + 10 = 40. Mean = 40/5 = 8. (B) is the median; (C) drops the 4; (D) is the sum, not the mean.'
  },
  {
    id: 'q-psatm-fill2-006',
    section: 'math',
    topic: 'range',
    difficulty: 420,
    stem: 'What is the range of the data set {7, 12, 4, 19, 9}?',
    choices: ['5', '12', '15', '19'],
    answer: 2, // C
    explanation: 'Range = max − min = 19 − 4 = 15. (A) is the count plus an error; (B) is one of the data values; (D) is just the maximum.'
  },
  {
    id: 'q-psatm-fill2-007',
    section: 'math',
    topic: 'multiply-binomials',
    difficulty: 440,
    stem: 'What is (x − 6)(x + 2)?',
    choices: ['x² + 4x − 12', 'x² − 4x − 12', 'x² − 8x − 12', 'x² − 4x + 12'],
    answer: 1, // B
    explanation: 'FOIL: x² + 2x − 6x − 12 = x² − 4x − 12. (A) sign-flips the middle term; (C) adds outer/inner instead of subtracting; (D) drops a sign on the constant.'
  },
  {
    id: 'q-psatm-fill2-008',
    section: 'math',
    topic: 'exponents',
    difficulty: 460,
    stem: 'Simplify: \\frac{a⁵}{a²}.',
    choices: ['a²·⁵', 'a⁷', 'a³', 'a¹⁰'],
    answer: 2, // C
    explanation: 'Dividing like bases subtracts exponents: a^(5−2) = a³. (A) divides the exponents; (B) adds them; (D) multiplies them.'
  },
  {
    id: 'q-psatm-fill2-009',
    section: 'math',
    topic: 'proportion',
    difficulty: 440,
    stem: 'If 4/5 = x/30, what is x?',
    choices: ['6', '24', '34', '37.5'],
    answer: 1, // B
    explanation: 'Cross-multiply: 5x = 120 → x = 24. (A) divides 30 by 5; (C) adds 4 + 30; (D) computes 30·(5/4) instead of 30·(4/5).'
  },
  {
    id: 'q-psatm-fill2-010',
    section: 'math',
    topic: 'geometry-angles',
    difficulty: 450,
    stem: 'Two angles are supplementary. If one measures 65°, what is the measure of the other?',
    choices: ['25°', '115°', '90°', '295°'],
    answer: 1, // B
    explanation: 'Supplementary angles sum to 180°: 180 − 65 = 115. (A) treats them as complementary (sum to 90°); (C) is the complement of 90°; (D) subtracts from 360°.'
  },

  // ───────────────────────── MEDIUM (20 @ 490–560) ─────────────────────────
  {
    id: 'q-psatm-fill2-011',
    section: 'math',
    topic: 'percent-change',
    difficulty: 510,
    stem: 'A book’s price rose from $40 to $46. What is the percent increase?',
    choices: ['15%', '12%', '13%', '6%'],
    answer: 0, // A
    explanation: 'Increase = 6; percent change = 6/40 = 0.15 = 15%. (B) rounds incorrectly; (C) divides 6/46 (uses new price as base); (D) uses the raw dollar increase.'
  },
  {
    id: 'q-psatm-fill2-012',
    section: 'math',
    topic: 'geometry-pythagoras',
    difficulty: 500,
    stem: 'A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?',
    choices: ['15', '√21', '√225/2', '21'],
    answer: 0, // A
    explanation: '9² + 12² = 81 + 144 = 225, so hypotenuse = √225 = 15. (B) takes √(12² − 9²) by mistake; (C) divides by 2; (D) sums the legs.'
  },
  {
    id: 'q-psatm-fill2-013',
    section: 'math',
    topic: 'system-equations',
    difficulty: 540,
    stem: 'If 2x + y = 11 and y = x − 1, what is x?',
    choices: ['3', '4', '5', '2'],
    answer: 1, // B
    explanation: 'Substitute: 2x + (x − 1) = 11 → 3x − 1 = 11 → 3x = 12 → x = 4. (A) is y; (C) drops the −1 in substitution; (D) computes 11 − x = y, then guesses.'
  },
  {
    id: 'q-psatm-fill2-014',
    section: 'math',
    topic: 'quadratic',
    difficulty: 530,
    stem: 'What are the solutions of x² − 5x + 6 = 0?',
    choices: ['x = −2 or −3', 'x = 1 or 6', 'x = 2 or 3', 'x = −1 or −6'],
    answer: 2, // C
    explanation: 'Factor: (x − 2)(x − 3) = 0 → x = 2 or x = 3. (A) sign-flips both roots; (B) multiplies factors of 6 incorrectly; (D) gives the negatives of (B).'
  },
  {
    id: 'q-psatm-fill2-015',
    section: 'math',
    topic: 'word-problem-rate',
    difficulty: 510,
    stem: 'A car travels 240 miles in 4 hours at a constant speed. At the same rate, how far does it travel in 7 hours?',
    choices: ['420 miles', '360 miles', '480 miles', '280 miles'],
    answer: 0, // A
    explanation: 'Rate = 240/4 = 60 mph. Distance in 7 h = 60·7 = 420 miles. (B) computes 60·6; (C) computes 60·8; (D) uses 40 mph.'
  },
  {
    id: 'q-psatm-fill2-016',
    section: 'math',
    topic: 'parallel-perpendicular',
    difficulty: 540,
    stem: 'A line is perpendicular to y = (1/3)x + 4 and passes through (2, 1). What is its equation?',
    choices: ['y = (1/3)x + 1/3', 'y = −3x + 7', 'y = 3x − 5', 'y = −(1/3)x + 5/3'],
    answer: 1, // B
    explanation: 'Perpendicular slope = −3 (negative reciprocal of 1/3). Using point (2, 1): 1 = −3(2) + b → b = 7. So y = −3x + 7. (A) uses the same slope (parallel); (C) drops the negative on the perpendicular slope; (D) takes only the negative reciprocal of the slope but keeps a parallel-style intercept.'
  },
  {
    id: 'q-psatm-fill2-017',
    section: 'math',
    topic: 'inequality',
    difficulty: 520,
    stem: 'Which of the following is the solution set of 5 − 2x ≤ 13?',
    choices: ['x ≥ −4', 'x ≤ 4', 'x ≥ 9', 'x ≤ −4'],
    answer: 0, // A
    explanation: '−2x ≤ 8 → x ≥ −4 (flip the inequality when dividing by a negative). (B) drops the sign and forgets to flip; (C) ignores the −2 and adds; (D) forgets to flip.'
  },
  {
    id: 'q-psatm-fill2-018',
    section: 'math',
    topic: 'ratio',
    difficulty: 500,
    stem: 'A cookie recipe uses chocolate chips and oats in a ratio of 3:4 by weight. If a batch uses 28 ounces of oats, how many ounces of chocolate chips does it use?',
    choices: ['12', '21', '37', '24'],
    answer: 1, // B
    explanation: 'Set 3/4 = c/28 → 4c = 84 → c = 21 oz. (A) uses the wrong direction (28·3/7); (C) adds 28 + 9; (D) reads the ratio as 4:3 by mistake.'
  },
  {
    id: 'q-psatm-fill2-019',
    section: 'math',
    topic: 'probability',
    difficulty: 500,
    stem: 'A spinner has 8 equal sectors numbered 1 through 8. What is the probability of spinning a prime number?',
    choices: ['\\frac{3}{8}', '\\frac{5}{8}', '\\frac{1}{2}', '\\frac{3}{4}'],
    answer: 2, // C
    explanation: 'Primes from 1 to 8 are 2, 3, 5, and 7 — four numbers out of 8. P = 4/8 = 1/2. (A) miscounts (drops 2); (B) includes 1 as a prime; (D) overcounts including 1 and 9.'
  },
  {
    id: 'q-psatm-fill2-020',
    section: 'math',
    topic: 'function-composition',
    difficulty: 550,
    stem: 'If f(x) = x − 4 and g(x) = 2x + 1, what is g(f(5))?',
    choices: ['11', '7', '13', '3'],
    answer: 3, // D
    explanation: 'f(5) = 1; g(1) = 2(1) + 1 = 3. (A) computes g(5) = 11; (B) computes f(g(5)) = f(11) = 7; (C) computes 2·5 + 1 + 2.'
  },
  {
    id: 'q-psatm-fill2-021',
    section: 'math',
    topic: 'scatterplot',
    difficulty: 510,
    stem: 'A scatterplot shows the relationship between hours studied (x) and exam score (y) for 30 students. The data form a roughly linear cloud rising from lower left to upper right. Which of the following best describes the association?',
    choices: ['Strong negative linear', 'No association', 'Strong positive linear', 'Nonlinear'],
    answer: 2, // C
    explanation: 'A cloud rising from lower-left to upper-right indicates a positive linear association. (A) describes a left-to-right falling pattern; (B) describes a random scatter with no trend; (D) would show a curve, not a roughly straight band.'
  },
  {
    id: 'q-psatm-fill2-022',
    section: 'math',
    topic: 'line-of-best-fit',
    difficulty: 540,
    stem: 'A line of best fit for the relationship between minutes of exercise per day (x) and resting heart rate in beats per minute (y) is given by y = 80 − 0.4x. According to the model, by approximately how many beats per minute does the resting heart rate decrease for each additional 10 minutes of exercise per day?',
    choices: ['0.4', '8', '4', '40'],
    answer: 2, // C
    explanation: 'Slope is −0.4 bpm per minute. For 10 extra minutes: 10·0.4 = 4 bpm decrease. (A) is the per-minute slope only; (B) uses 8 minutes; (D) multiplies by 100.'
  },
  {
    id: 'q-psatm-fill2-023',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 420,
    stem: 'A rectangular prism has length 4, width 3, and height 5. What is its volume?',
    choices: ['60', '47', '94', '12'],
    answer: 0, // A
    explanation: 'V = lwh = 4·3·5 = 60. (B) is the surface area divided by 2; (C) is the surface area; (D) uses just l·w.'
  },
  {
    id: 'q-psatm-fill2-024',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 530,
    stem: 'A circle has a circumference of 12π. What is its radius?',
    choices: ['3', '6', '12', '36'],
    answer: 1, // B
    explanation: 'C = 2πr → 2πr = 12π → r = 6. (A) divides 12 by 4; (C) is the diameter; (D) squares the radius.'
  },
  {
    id: 'q-psatm-fill2-025',
    section: 'math',
    topic: 'similar-triangles',
    difficulty: 460,
    stem: 'Two similar triangles have a scale factor of 2:5. If the smaller triangle has a side of length 8, what is the corresponding side of the larger triangle?',
    choices: ['3.2', '16', '20', '11'],
    answer: 2, // C
    explanation: '2/5 = 8/x → 2x = 40 → x = 20. (A) goes the wrong direction (8·2/5); (B) doubles 8; (D) adds the difference 5 − 2 to 8.'
  },
  {
    id: 'q-psatm-fill2-026',
    section: 'math',
    topic: 'sequences',
    difficulty: 510,
    stem: 'In an arithmetic sequence, the first term is 7 and the common difference is 4. What is the 10th term?',
    choices: ['47', '40', '43', '44'],
    answer: 2, // C
    explanation: 'a_n = a_1 + (n − 1)d = 7 + 9·4 = 7 + 36 = 43. (A) uses 10·4 instead of 9·4; (B) computes 10·4; (D) uses 9·4 + 8.'
  },
  {
    id: 'q-psatm-fill2-027',
    section: 'math',
    topic: 'word-problem-mixture',
    difficulty: 430,
    stem: 'A 20-liter solution is 30% acid. How many liters of pure acid are in the solution?',
    choices: ['6', '14', '20', '3'],
    answer: 0, // A
    explanation: '0.30 × 20 = 6 liters of acid. (B) computes the water amount (20·0.7); (C) is the total; (D) divides 20 by 6.'
  },
  {
    id: 'q-psatm-fill2-028',
    section: 'math',
    topic: 'factor',
    difficulty: 530,
    stem: 'Which expression is equivalent to x² − 49?',
    choices: ['(x − 7)²', '(x + 7)(x − 7)', '(x − 7)(x − 7)', '(x + 7)²'],
    answer: 1, // B
    explanation: 'Difference of squares: a² − b² = (a + b)(a − b), so x² − 49 = (x + 7)(x − 7). (A) and (C) give x² − 14x + 49; (D) gives x² + 14x + 49.'
  },
  {
    id: 'q-psatm-fill2-029',
    section: 'math',
    topic: 'radicals',
    difficulty: 520,
    stem: 'Simplify: √72.',
    choices: ['6√2', '36√2', '12√2', '8√3'],
    answer: 0, // A
    explanation: '√72 = √(36 · 2) = 6√2. (B) keeps the 36 outside the radical; (C) doubles 6; (D) factors 72 as 64·... incorrectly.'
  },
  {
    id: 'q-psatm-fill2-030',
    section: 'math',
    topic: 'complex-numbers',
    difficulty: 460,
    stem: 'If i = √(−1), what is (3 + 2i) + (5 − 7i)?',
    choices: ['8 + 9i', '−2 − 5i', '8 − 9i', '8 − 5i'],
    answer: 3, // D
    explanation: 'Add real parts and imaginary parts separately: (3 + 5) + (2 − 7)i = 8 − 5i. (A) sign-flips the −7i; (B) subtracts real parts; (C) computes 2 − (−7) = 9 by sign error.'
  },

  // ───────────────────────── HARD (15 @ 590–660) ─────────────────────────
  {
    id: 'q-psatm-fill2-031',
    section: 'math',
    topic: 'quadratic',
    difficulty: 610,
    stem: 'The quadratic function f(x) = x² − 6x + 5 has its vertex at which point?',
    choices: ['(−3, 14)', '(6, 5)', '(3, −4)', '(3, 4)'],
    answer: 2, // C
    explanation: 'x-coord of vertex: x = −b/(2a) = 6/2 = 3. f(3) = 9 − 18 + 5 = −4. Vertex (3, −4). (A) sign-flips the x; (B) reads coefficients directly; (D) sign error on f(3).'
  },
  {
    id: 'q-psatm-fill2-032',
    section: 'math',
    topic: 'system-equations',
    difficulty: 620,
    stem: 'A movie theater sells adult tickets for $12 and child tickets for $8. On a certain night, 200 tickets were sold for a total of $2,080. How many adult tickets were sold?',
    choices: ['80', '120', '100', '140'],
    answer: 1, // B
    explanation: 'Let a = adults, c = children. a + c = 200 and 12a + 8c = 2080. Substitute c = 200 − a: 12a + 8(200 − a) = 2080 → 12a + 1600 − 8a = 2080 → 4a = 480 → a = 120. (A) is the number of children; (C) splits evenly; (D) uses 12a + 8c = 2240.'
  },
  {
    id: 'q-psatm-fill2-033',
    section: 'math',
    topic: 'word-problem-rate',
    difficulty: 600,
    stem: 'Pipe A fills a tank in 6 hours. Pipe B fills the same tank in 3 hours. Working together, how long will they take to fill the tank?',
    choices: ['4.5 hours', '9 hours', '2 hours', '1 hour'],
    answer: 2, // C
    explanation: 'Combined rate = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 tank per hour. Time = 1/(1/2) = 2 hours. (A) averages the two times; (B) adds the times; (D) takes half of 2.'
  },
  {
    id: 'q-psatm-fill2-034',
    section: 'math',
    topic: 'function-composition',
    difficulty: 520,
    stem: 'If f(x) = 2x + 3 and h(x) = f(f(x)), what is h(1)?',
    choices: ['5', '8', '13', '11'],
    answer: 2, // C
    explanation: 'f(1) = 5; h(1) = f(5) = 2(5) + 3 = 13. (A) is just f(1); (B) computes 5 + 3; (D) computes 2·5 + 1.'
  },
  {
    id: 'q-psatm-fill2-035',
    section: 'math',
    topic: 'geometry-pythagoras',
    difficulty: 520,
    stem: 'In a right triangle, the hypotenuse is 13 and one leg is 5. What is the length of the other leg?',
    choices: ['8', '12', '18', '√194'],
    answer: 1, // B
    explanation: 'Other leg = √(13² − 5²) = √(169 − 25) = √144 = 12. (A) subtracts the leg from the hypotenuse; (C) sums leg and hypotenuse; (D) adds the squares instead of subtracting.'
  },
  {
    id: 'q-psatm-fill2-036',
    section: 'math',
    topic: 'percent-change',
    difficulty: 640,
    stem: 'A stock’s price decreased by 20% one month and then increased by 25% the next month. What is the overall percent change in the stock’s price?',
    choices: ['5% increase', '5% decrease', '45% increase', 'No change'],
    answer: 3, // D
    explanation: 'Final = original × 0.80 × 1.25 = original × 1.00 = original. No net change. (A) treats the changes as additive (−20 + 25); (B) sign-flips the additive answer; (C) sums the magnitudes.'
  },
  {
    id: 'q-psatm-fill2-037',
    section: 'math',
    topic: 'geometry-angles',
    difficulty: 440,
    stem: 'In a triangle, two angles measure 47° and 88°. What is the measure of the third angle?',
    choices: ['135°', '45°', '47°', '88°'],
    answer: 1, // B
    explanation: 'Triangle angles sum to 180°: 180 − 47 − 88 = 45°. (A) subtracts from 270° instead of 180° (or adds the two given); (C) repeats the first angle; (D) repeats the second.'
  },
  {
    id: 'q-psatm-fill2-038',
    section: 'math',
    topic: 'similar-triangles',
    difficulty: 630,
    stem: 'Triangle ABC is similar to triangle DEF, with corresponding sides in the ratio AB:DE = 3:7. If the perimeter of triangle ABC is 24, what is the perimeter of triangle DEF?',
    choices: ['28', '10.3', '40', '56'],
    answer: 3, // D
    explanation: 'Perimeters scale by the same ratio: 3/7 = 24/P → 3P = 168 → P = 56. (A) computes 24 + 4; (B) goes the wrong direction (24·3/7); (C) adds 16 to the perimeter (uses the wrong scale).'
  },
  {
    id: 'q-psatm-fill2-039',
    section: 'math',
    topic: 'sequences',
    difficulty: 600,
    stem: 'A geometric sequence has first term 5 and common ratio 2. What is the 5th term?',
    choices: ['40', '50', '160', '80'],
    answer: 3, // D
    explanation: 'a_n = a_1·r^(n−1) = 5·2⁴ = 5·16 = 80. (A) uses 2³; (B) computes 5·10; (C) uses 2⁵.'
  },
  {
    id: 'q-psatm-fill2-040',
    section: 'math',
    topic: 'word-problem-mixture',
    difficulty: 650,
    stem: 'How many liters of pure water must be added to 10 liters of a 40% acid solution to dilute it to a 25% acid solution?',
    choices: ['4', '6', '15', '10'],
    answer: 1, // B
    explanation: 'Acid amount stays constant: 0.40·10 = 4 L of acid. New total = 10 + w; require 4/(10 + w) = 0.25 → 10 + w = 16 → w = 6 L. (A) divides 4 by 1; (C) is the new total volume; (D) doubles the original.'
  },
  {
    id: 'q-psatm-fill2-041',
    section: 'math',
    topic: 'radicals',
    difficulty: 520,
    stem: 'If √(x + 5) = 4, what is the value of x?',
    choices: ['11', '3', '21', '−1'],
    answer: 0, // A
    explanation: 'Square both sides: x + 5 = 16 → x = 11. Check: √16 = 4. ✓ (B) computes 4 − 1 from forgetting to square; (C) computes 4² + 5; (D) treats √(x + 5) = 4 as x + 5 = 4.'
  },
  {
    id: 'q-psatm-fill2-042',
    section: 'math',
    topic: 'probability',
    difficulty: 640,
    stem: 'A standard deck of 52 cards is shuffled, and one card is drawn. What is the probability that it is either a heart or a face card (jack, queen, or king)?',
    choices: ['\\frac{16}{52}', '\\frac{4}{13}', '\\frac{25}{52}', '\\frac{11}{26}'],
    answer: 3, // D
    explanation: 'P(heart) = 13/52; P(face) = 12/52; P(heart AND face) = 3/52 (J, Q, K of hearts). By inclusion–exclusion: P = (13 + 12 − 3)/52 = 22/52 = 11/26. (A) forgets to subtract the overlap; (B) reduces 16/52 incorrectly; (C) adds the overlap instead of subtracting.'
  },
  {
    id: 'q-psatm-fill2-043',
    section: 'math',
    topic: 'two-point-slope',
    difficulty: 610,
    stem: 'A line passes through points (a, 3) and (5, 11) and has slope 2. What is the value of a?',
    choices: ['1', '−1', '4', '9'],
    answer: 0, // A
    explanation: 'Slope = (11 − 3)/(5 − a) = 8/(5 − a) = 2 → 5 − a = 4 → a = 1. (B) computes 5 − 6; (C) sets numerator equal to denominator; (D) sign-flips at the end.'
  },
  {
    id: 'q-psatm-fill2-044',
    section: 'math',
    topic: 'line-of-best-fit',
    difficulty: 600,
    stem: 'For a sample of city neighborhoods, the line of best fit relating the number of parks (x) and the median home price in thousands of dollars (y) is y = 200 + 35x. Which of the following best describes the meaning of the slope 35 in this context?',
    choices: [
      'For each additional park, the median home price is predicted to increase by $35.',
      'For each additional park, the median home price is predicted to increase by $35,000.',
      'For each additional $1,000 in home price, the predicted number of parks increases by 35.',
      'When there are 35 parks, the median home price is $200,000.'
    ],
    answer: 1, // B
    explanation: 'The slope is the predicted change in y per unit change in x. y is in thousands of dollars, so 35 means $35,000 per additional park. (A) ignores the units of y; (C) reverses the role of x and y; (D) confuses slope with intercept.'
  },
  {
    id: 'q-psatm-fill2-045',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 660,
    stem: 'A circle in the xy-plane has center (3, −2) and passes through the point (6, 2). What is the equation of the circle?',
    choices: [
      '(x − 3)² + (y + 2)² = 25',
      '(x − 3)² + (y + 2)² = 5',
      '(x − 3)² + (y − 2)² = 25',
      '(x + 3)² + (y − 2)² = 25'
    ],
    answer: 0, // A
    explanation: 'Radius² = (6 − 3)² + (2 − (−2))² = 9 + 16 = 25. Center form: (x − 3)² + (y − (−2))² = (x − 3)² + (y + 2)² = 25. (B) uses the radius (5) instead of r²; (C) sign error on the y-center; (D) sign-flips both center coordinates.'
  },

  // ───────────────────────── INSANE (5 @ 680–740) ─────────────────────────
  {
    id: 'q-psatm-fill2-046',
    section: 'math',
    topic: 'quadratic',
    difficulty: 700,
    stem: 'For what value of c does the equation x² + 6x + c = 0 have exactly one real solution?',
    choices: ['3', '9', '12', '36'],
    answer: 1, // B
    explanation: 'Exactly one real solution when the discriminant b² − 4ac = 0: 36 − 4c = 0 → c = 9. Check: x² + 6x + 9 = (x + 3)² = 0 has the single root x = −3. ✓ (A) takes √9; (C) computes 6 + 6; (D) is b².'
  },
  {
    id: 'q-psatm-fill2-047',
    section: 'math',
    topic: 'system-equations',
    difficulty: 720,
    stem: 'For what value of k does the system 3x − 2y = 5 and 6x + ky = 10 have infinitely many solutions?',
    choices: ['4', '−2', '2', '−4'],
    answer: 3, // D
    explanation: 'Infinitely many solutions ⇔ the second equation is a scalar multiple of the first. Multiply the first by 2: 6x − 4y = 10. Match with 6x + ky = 10 → k = −4. (A) drops the negative; (B) and (C) ignore the multiplier.'
  },
  {
    id: 'q-psatm-fill2-048',
    section: 'math',
    topic: 'complex-numbers',
    difficulty: 690,
    stem: 'If i = √(−1), what is (2 + 3i)(4 − i)?',
    choices: ['5 + 10i', '8 − 3i', '11 + 14i', '11 + 10i'],
    answer: 3, // D
    explanation: 'FOIL: 2·4 + 2·(−i) + 3i·4 + 3i·(−i) = 8 − 2i + 12i − 3i² = 8 + 10i + 3 = 11 + 10i (since i² = −1). (A) forgets the −3i² → +3 contribution; (B) only multiplies real and the i² parts; (C) computes 12i + 2i instead of 12i − 2i.'
  },
  {
    id: 'q-psatm-fill2-049',
    section: 'math',
    topic: 'sequences',
    difficulty: 460,
    stem: 'The sum of the first n positive even integers is 2 + 4 + 6 + … + 2n = n(n + 1). What is the sum of the first 20 positive even integers?',
    choices: ['400', '210', '441', '420'],
    answer: 3, // D
    explanation: 'Apply the formula with n = 20: 20·21 = 420. (A) uses n²; (B) uses n(n + 1)/2 (sum of first n integers); (C) uses (n + 1)².'
  },
  {
    id: 'q-psatm-fill2-050',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 600,
    stem: 'A right circular cylinder has a height of 10 and a volume of 90π. What is the radius of its base?',
    choices: ['9', '√3', '√10', '3'],
    answer: 3, // D
    explanation: 'V = πr²h → 90π = πr²(10) → r² = 9 → r = 3. (A) takes the value of r² as r; (B) takes the cube root by mistake; (C) divides 90 by some other value.'
  }
]);
