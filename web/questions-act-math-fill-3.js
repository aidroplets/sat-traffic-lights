/**
 * ACT Math — fill batch 3.
 * testType: 'ACT', section: 'math'.
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';
window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  {
    id: 'q-actm-fill3-001',
    section: 'math',
    topic: 'pre-algebra-percent',
    difficulty: 19,
    stem: 'A jacket originally costs $80. It is marked down by 25%. What is the sale price?',
    choices: ['$55', '$60', '$65', '$70', '$75'],
    answer: 1,
    explanation: 'Discount = 25% of $80 = $20. Sale = $80 - $20 = $60. (B). Distractors: (A) $55 subtracts 25 then 5; (C) $65 confuses 15% off; (D) $70 uses 12.5% off; (E) $75 subtracts only $5.'
  },
  {
    id: 'q-actm-fill3-002',
    section: 'math',
    topic: 'pre-algebra-ratios',
    difficulty: 20,
    stem: 'A recipe uses flour and sugar in the ratio 5:2. If 35 cups of flour are used, how many cups of sugar are needed?',
    choices: ['10', '12', '14', '13', '16'],
    answer: 2,
    explanation: 'Set 5/2 = 35/x. Cross multiply: 5x = 70, x = 14. (C). Distractors: (A) 10 uses 7:2; (B) 12 misreads ratio; (D) 13 misadds; (E) 16 uses 5:2.3.'
  },
  {
    id: 'q-actm-fill3-003',
    section: 'math',
    topic: 'pre-algebra-arithmetic',
    difficulty: 18,
    stem: 'What is the value of 3 + 4 × 5 - 2?',
    choices: ['13', '17', '19', '20', '21'],
    answer: 4,
    explanation: 'Order of operations: 4 × 5 = 20. Then 3 + 20 - 2 = 21. (E). Distractors: (A) 13 wrong order; (B) 17 forgets to subtract 2; (C) 19 misadds; (D) 20 ignores +3 and −2.'
  },
  {
    id: 'q-actm-fill3-004',
    section: 'math',
    topic: 'elementary-algebra',
    difficulty: 19,
    stem: 'If 3x - 7 = 2x + 5, what is the value of x?',
    choices: ['-12', '-2', '12', '2', '24'],
    answer: 2,
    explanation: 'Subtract 2x: x - 7 = 5. Add 7: x = 12. (C). Distractors: (A) -12 sign error; (B) -2 subtracts wrong; (D) 2 forgets to add 7; (E) 24 doubles.'
  },
  {
    id: 'q-actm-fill3-005',
    section: 'math',
    topic: 'algebra-exponents',
    difficulty: 21,
    stem: 'Simplify (2x^3)^2 · x^4.',
    choices: ['2x^9', '4x^9', '4x^11', '4x^10', '8x^10'],
    answer: 3,
    explanation: '(2x^3)^2 = 4x^6. Then 4x^6 · x^4 = 4x^10. (D). Distractors: (A) 2x^9 forgets to square 2; (B) 4x^9 adds wrong; (C) 4x^11 multiplies exponents; (E) 8x^10 cubes 2.'
  },
  {
    id: 'q-actm-fill3-006',
    section: 'math',
    topic: 'algebra-inequality',
    difficulty: 22,
    stem: 'Solve for x: -3x + 6 > 15.',
    choices: ['x < -3', 'x > -3', 'x < 3', 'x > 3', 'x < 7'],
    answer: 0,
    explanation: 'Subtract 6: -3x > 9. Divide by -3 and flip: x < -3. (A). Distractors: (B) x > -3 forgets to flip; (C) x < 3 sign error; (D) x > 3 forgets flip and sign; (E) x < 7 keeps 6.'
  },
  {
    id: 'q-actm-fill3-007',
    section: 'math',
    topic: 'algebra-systems',
    difficulty: 24,
    stem: 'Solve the system: 2x + y = 10 and x - y = 2. What is x?',
    choices: ['2', '3', '5', '4', '6'],
    answer: 3,
    explanation: 'Add equations: 3x = 12, so x = 4. (D). Distractors: (A) 2 finds y; (B) 3 averages; (C) 5 uses 2x = 10; (E) 6 misadds.'
  },
  {
    id: 'q-actm-fill3-008',
    section: 'math',
    topic: 'algebra-roots',
    difficulty: 23,
    stem: 'Simplify √48.',
    choices: ['4√3', '2√6', '2√12', '4√6', '6√2'],
    answer: 0,
    explanation: '48 = 16 · 3, so √48 = 4√3. (A). Distractors: (B) 2√6 uses 4·12 wrong; (C) 2√12 not simplified; (D) 4√6 wrong factor; (E) 6√2 uses 36·... wrong.'
  },
  {
    id: 'q-actm-fill3-009',
    section: 'math',
    topic: 'intermediate-algebra-quadratic',
    difficulty: 25,
    stem: 'What are the solutions to x^2 - 5x + 6 = 0?',
    choices: ['x = -1, -6', 'x = -2, -3', 'x = 2, 3', 'x = 1, 6', 'x = 3, 5'],
    answer: 2,
    explanation: 'Factor: (x-2)(x-3) = 0. So x = 2 or 3. (C). Distractors: (A) and (B) sign errors; (D) uses wrong factors of 6; (E) uses sum and product confused.'
  },
  {
    id: 'q-actm-fill3-010',
    section: 'math',
    topic: 'intermediate-algebra-functions',
    difficulty: 24,
    stem: 'If f(x) = 2x^2 - 3x + 1, what is f(-2)?',
    choices: ['-9', '-1', '3', '11', '15'],
    answer: 4,
    explanation: 'f(-2) = 2(4) - 3(-2) + 1 = 8 + 6 + 1 = 15. (E). Distractors: (A) -9 uses wrong sign on 2x^2; (B) -1 errors on 3x; (C) 3 forgets +1; (D) 11 uses 2(-2)^2 = -8.'
  },
  {
    id: 'q-actm-fill3-011',
    section: 'math',
    topic: 'intermediate-algebra-logarithms',
    difficulty: 22,
    stem: 'What is log_2(32)?',
    choices: ['3', '4', '6', '5', '16'],
    answer: 3,
    explanation: '2^5 = 32, so log_2(32) = 5. (D). Distractors: (A) 3 thinks 2^3=32 wrong; (B) 4 thinks 2^4; (C) 6 thinks 2^6; (E) 16 divides.'
  },
  {
    id: 'q-actm-fill3-012',
    section: 'math',
    topic: 'coordinate-geometry-slope',
    difficulty: 22,
    stem: 'What is the slope of the line through (2, 3) and (5, 12)?',
    choices: ['\\frac{1}{3}', '3', '4', '5', '9'],
    answer: 1,
    explanation: 'Slope = (12-3)/(5-2) = 9/3 = 3. (B). Distractors: (A) 1/3 inverts; (C) 4 uses (12-3)/3 wrong; (D) 5 uses x diff wrong; (E) 9 forgets to divide.'
  },
  {
    id: 'q-actm-fill3-013',
    section: 'math',
    topic: 'coordinate-geometry-circle',
    difficulty: 22,
    stem: 'A circle has equation (x-3)^2 + (y+4)^2 = 25. What is its center and radius?',
    choices: ['(-3, 4), r=5', '(-3, 4), r=25', '(3, 4), r=5', '(3, -4), r=25', '(3, -4), r=5'],
    answer: 4,
    explanation: 'Standard form (x-h)^2+(y-k)^2=r^2 gives h=3, k=-4, r=5. (E). Distractors: (A) sign-flips center; (B) reads 25 as radius and signs; (C) sign on y; (D) reads 25 as radius.'
  },
  {
    id: 'q-actm-fill3-014',
    section: 'math',
    topic: 'coordinate-geometry-midpoint',
    difficulty: 20,
    stem: 'Find the midpoint of the segment with endpoints (-4, 6) and (8, -2).',
    choices: ['(2, 2)', '(2, 4)', '(4, 2)', '(4, 4)', '(6, 4)'],
    answer: 0,
    explanation: 'Midpoint = ((-4+8)/2, (6+(-2))/2) = (2, 2). (A). Distractors: (B) y wrong; (C) swaps coords; (D) both wrong; (E) uses sum without dividing.'
  },
  {
    id: 'q-actm-fill3-015',
    section: 'math',
    topic: 'coordinate-geometry-distance',
    difficulty: 24,
    stem: 'What is the distance between (1, 2) and (4, 6)?',
    choices: ['3', '4', '7', '25', '5'],
    answer: 4,
    explanation: '√((4-1)^2+(6-2)^2) = √(9+16) = √25 = 5. (E). Distractors: (A) 3 uses x diff only; (B) 4 uses y diff only; (C) 7 sums diffs; (D) 25 forgets sqrt.'
  },
  {
    id: 'q-actm-fill3-016',
    section: 'math',
    topic: 'plane-geometry-angles',
    difficulty: 21,
    stem: 'Two angles are supplementary. One angle measures 65°. What is the measure of the other?',
    choices: ['25°', '35°', '115°', '105°', '125°'],
    answer: 2,
    explanation: 'Supplementary angles sum to 180°. 180 - 65 = 115°. (C). Distractors: (A) 25° uses complementary; (B) 35° errors; (D) 105° subtracts wrong; (E) 125° uses 190.'
  },
  {
    id: 'q-actm-fill3-017',
    section: 'math',
    topic: 'plane-geometry-area',
    difficulty: 19,
    stem: 'What is the area of a triangle with base 10 and height 6?',
    choices: ['16', '30', '32', '60', '120'],
    answer: 1,
    explanation: 'Area = (1/2)(10)(6) = 30. (B). Distractors: (A) 16 adds; (C) 32 squares wrong; (D) 60 forgets the 1/2; (E) 120 uses bh and doubles.'
  },
  {
    id: 'q-actm-fill3-018',
    section: 'math',
    topic: 'plane-geometry-perimeter',
    difficulty: 18,
    stem: 'A rectangle has length 9 cm and width 4 cm. What is its perimeter?',
    choices: ['13 cm', '18 cm', '26 cm', '22 cm', '36 cm'],
    answer: 2,
    explanation: 'P = 2(L+W) = 2(13) = 26 cm. (C). Distractors: (A) 13 sums once; (B) 18 doubles length; (D) 22 misadds; (E) 36 gives area.'
  },
  {
    id: 'q-actm-fill3-019',
    section: 'math',
    topic: 'plane-geometry-circumference',
    difficulty: 22,
    stem: 'A circle has radius 7. What is its circumference (in terms of π)?',
    choices: ['7π', '14π', '21π', '28π', '49π'],
    answer: 1,
    explanation: 'C = 2πr = 14π. (B). Distractors: (A) 7π uses r; (C) 21π misuses; (D) 28π uses 4r; (E) 49π gives area.'
  },
  {
    id: 'q-actm-fill3-020',
    section: 'math',
    topic: 'plane-geometry-pythagoras',
    difficulty: 23,
    stem: 'A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?',
    choices: ['15', '13', '14', '17', '21'],
    answer: 0,
    explanation: '√(81+144) = √225 = 15. (A). Distractors: (B) 13 uses 5,12,13 wrong; (C) 14 errors; (D) 17 sums; (E) 21 sums legs.'
  },
  {
    id: 'q-actm-fill3-021',
    section: 'math',
    topic: 'plane-geometry-volume',
    difficulty: 25,
    stem: 'A cylinder has radius 3 and height 10. What is its volume (in terms of π)?',
    choices: ['30π', '60π', '100π', '300π', '90π'],
    answer: 4,
    explanation: 'V = πr^2h = π(9)(10) = 90π. (E). Distractors: (A) 30π uses 2πrh; (B) 60π uses 2πr·h; (C) 100π uses r=π; (D) 300π forgets r squared.'
  },
  {
    id: 'q-actm-fill3-022',
    section: 'math',
    topic: 'plane-geometry-similar',
    difficulty: 26,
    stem: 'Two similar triangles have corresponding sides in ratio 3:5. If the smaller triangle has perimeter 24, what is the perimeter of the larger?',
    choices: ['14.4', '20', '40', '32', '120'],
    answer: 2,
    explanation: 'Perimeters share the same ratio: 24/x = 3/5, so x = 40. (C). Distractors: (A) 14.4 uses 5:3 inverted; (B) 20 misuses; (D) 32 adds 8; (E) 120 uses area ratio.'
  },
  {
    id: 'q-actm-fill3-023',
    section: 'math',
    topic: 'trig-basic',
    difficulty: 21,
    stem: 'In a right triangle, the side opposite angle θ has length 5 and the hypotenuse has length 13. What is sin(θ)?',
    choices: ['\\frac{5}{12}', '\\frac{5}{13}', '\\frac{12}{13}', '\\frac{13}{5}', '\\frac{13}{12}'],
    answer: 1,
    explanation: 'sin = opp/hyp = 5/13. (B). Distractors: (A) 5/12 uses adj instead; (C) 12/13 gives cos; (D) 13/5 inverts; (E) 13/12 uses sec.'
  },
  {
    id: 'q-actm-fill3-024',
    section: 'math',
    topic: 'trig-graphs',
    difficulty: 26,
    stem: 'What is the period of f(x) = sin(3x)?',
    choices: ['π/3', '2π/3', 'π', '3π', '6π'],
    answer: 1,
    explanation: 'Period of sin(bx) = 2π/b = 2π/3. (B). Distractors: (A) π/3 forgets the 2; (C) π halves; (D) 3π multiplies; (E) 6π uses 2π·3.'
  },
  {
    id: 'q-actm-fill3-025',
    section: 'math',
    topic: 'sequences',
    difficulty: 24,
    stem: 'What is the 10th term of the arithmetic sequence 4, 7, 10, 13, ...?',
    choices: ['28', '30', '33', '40', '31'],
    answer: 4,
    explanation: 'a_n = 4 + (n-1)·3. a_10 = 4 + 27 = 31. (E). Distractors: (A) 28 uses (n)·3; (B) 30 uses 4+(n-1)·... wrong; (C) 33 uses 3+10·3; (D) 40 multiplies.'
  },
  {
    id: 'q-actm-fill3-026',
    section: 'math',
    topic: 'complex-numbers',
    difficulty: 28,
    stem: 'What is (2 + 3i)(1 - 2i)?',
    choices: ['2 - 6i', '8 - i', '8 - 4i', '-4 + 7i', '-4 - i'],
    answer: 1,
    explanation: '(2+3i)(1-2i) = 2 - 4i + 3i - 6i^2 = 2 - i + 6 = 8 - i. (B). Distractors: (A) ignores i^2 = -1; (C) sign error; (D) wrong sign; (E) wrong real.'
  },
  {
    id: 'q-actm-fill3-027',
    section: 'math',
    topic: 'matrices',
    difficulty: 23,
    stem: 'What is the determinant of the matrix [[3, 4], [1, 2]]?',
    choices: ['2', '-2', '0', '6', '10'],
    answer: 0,
    explanation: 'det = 3·2 - 4·1 = 6 - 4 = 2. (A). Distractors: (B) -2 sign error; (C) 0 subtracts wrong; (D) 6 ignores second product; (E) 10 adds.'
  },
  {
    id: 'q-actm-fill3-028',
    section: 'math',
    topic: 'evaluate-function',
    difficulty: 22,
    stem: 'If g(x) = \\frac{x+3}{x-1}, what is g(4)?',
    choices: ['\\frac{1}{3}', '\\frac{4}{3}', '3', '\\frac{7}{3}', '7'],
    answer: 3,
    explanation: 'g(4) = (4+3)/(4-1) = 7/3. (D). Distractors: (A) 1/3 = (4-3)/(4+1) wrong; (B) 4/3 misreads; (C) 3 = 4-1; (E) 7 forgets denominator.'
  },
  {
    id: 'q-actm-fill3-029',
    section: 'math',
    topic: 'log',
    difficulty: 24,
    stem: 'If log_3(x) = 4, what is x?',
    choices: ['12', '27', '81', '64', '243'],
    answer: 2,
    explanation: 'x = 3^4 = 81. (C). Distractors: (A) 12 = 3·4; (B) 27 = 3^3; (D) 64 = 4^3; (E) 243 = 3^5.'
  },
  {
    id: 'q-actm-fill3-030',
    section: 'math',
    topic: 'probability',
    difficulty: 25,
    stem: 'A bag contains 4 red, 3 blue, and 5 green marbles. What is the probability of drawing a blue marble?',
    choices: ['\\frac{1}{4}', '\\frac{1}{3}', '\\frac{3}{8}', '\\frac{3}{5}', '\\frac{5}{12}'],
    answer: 0,
    explanation: 'Total = 12. P(blue) = 3/12 = 1/4. (A). Distractors: (B) 1/3 = 3/9 ignores green; (C) 3/8 ignores red; (D) 3/5 wrong total; (E) 5/12 picks green.'
  },
  {
    id: 'q-actm-fill3-031',
    section: 'math',
    topic: 'statistics-mean',
    difficulty: 21,
    stem: 'What is the mean of 6, 8, 10, 12, 14?',
    choices: ['8', '9', '11', '12', '10'],
    answer: 4,
    explanation: 'Sum = 50, mean = 50/5 = 10. (E). Distractors: (A) 8 takes second value; (B) 9 averages first two; (C) 11 averages middle two; (D) 12 picks larger.'
  },
  {
    id: 'q-actm-fill3-032',
    section: 'math',
    topic: 'statistics-median',
    difficulty: 20,
    stem: 'What is the median of 3, 7, 2, 9, 5?',
    choices: ['5', '3', '2', '7', '9'],
    answer: 0,
    explanation: 'Sorted: 2, 3, 5, 7, 9. Median = 5. (A). Distractors: (B) second; (C) min; (D) fourth; (E) max.'
  },
  {
    id: 'q-actm-fill3-033',
    section: 'math',
    topic: 'pre-algebra-percent',
    difficulty: 25,
    stem: 'A number is increased by 20%, then decreased by 20%. The final value is what percent of the original?',
    choices: ['80%', '96%', '90%', '100%', '104%'],
    answer: 1,
    explanation: '1.2 · 0.8 = 0.96, so 96%. (B). Distractors: (A) 80% subtracts; (C) 90% averages; (D) 100% assumes cancel; (E) 104% reverses order.'
  },
  {
    id: 'q-actm-fill3-034',
    section: 'math',
    topic: 'algebra-systems',
    difficulty: 21,
    stem: 'If 4x + 3y = 24 and x = 3, what is y?',
    choices: ['4', '2', '3', '6', '8'],
    answer: 0,
    explanation: '4(3)+3y = 24, so 3y = 12, y = 4. (A). Distractors: (B) 2 uses 12/6; (C) 3 = x; (D) 6 = 24/4; (E) 8 = 24/3.'
  },
  {
    id: 'q-actm-fill3-035',
    section: 'math',
    topic: 'intermediate-algebra-quadratic',
    difficulty: 28,
    stem: 'What is the vertex of the parabola y = x^2 - 6x + 5?',
    choices: ['(-3, -4)', '(-3, 14)', '(3, 4)', '(3, -4)', '(6, 5)'],
    answer: 3,
    explanation: 'x = -b/2a = 6/2 = 3. y = 9 - 18 + 5 = -4. Vertex (3, -4). (D). Distractors: (A) wrong x sign; (B) sign on y; (C) sign on y; (E) uses coefficients.'
  },
  {
    id: 'q-actm-fill3-036',
    section: 'math',
    topic: 'coordinate-geometry-slope',
    difficulty: 23,
    stem: 'What is the slope of a line perpendicular to y = (2/3)x + 5?',
    choices: ['\\frac{-3}{2}', '\\frac{-2}{3}', '\\frac{2}{3}', '\\frac{3}{2}', '5'],
    answer: 0,
    explanation: 'Perpendicular slope = negative reciprocal of 2/3 = -3/2. (A). Distractors: (B) negates only; (C) keeps original; (D) reciprocal without negative; (E) y-intercept.'
  },
  {
    id: 'q-actm-fill3-037',
    section: 'math',
    topic: 'plane-geometry-volume',
    difficulty: 25,
    stem: 'A sphere has radius 6. What is its volume in terms of π?',
    choices: ['72π', '144π', '288π', '216π', '864π'],
    answer: 2,
    explanation: 'V = (4/3)πr^3 = (4/3)π(216) = 288π. (C). Distractors: (A) 72π uses 1/3πr^2; (B) 144π misuses; (D) 216π = r^3; (E) 864π forgets 1/3.'
  },
  {
    id: 'q-actm-fill3-038',
    section: 'math',
    topic: 'trig-basic',
    difficulty: 31,
    stem: 'If cos(θ) = 3/5 and θ is in Quadrant I, what is tan(θ)?',
    choices: ['\\frac{3}{4}', '\\frac{3}{5}', '\\frac{4}{5}', '\\frac{4}{3}', '\\frac{5}{3}'],
    answer: 3,
    explanation: 'cos=3/5 means adj=3, hyp=5, so opp=4 (3-4-5). tan = opp/adj = 4/3. (D). Distractors: (A) 3/4 inverts; (B) 3/5 = cos; (C) 4/5 = sin; (E) 5/3 = sec.'
  },
  {
    id: 'q-actm-fill3-039',
    section: 'math',
    topic: 'sequences',
    difficulty: 30,
    stem: 'In a geometric sequence, the first term is 3 and the common ratio is 2. What is the 6th term?',
    choices: ['48', '64', '128', '192', '96'],
    answer: 4,
    explanation: 'a_n = 3·2^(n-1). a_6 = 3·2^5 = 3·32 = 96. (E). Distractors: (A) 48 = 3·16; (B) 64 = 2^6; (C) 128 = 2^7; (D) 192 = 3·64.'
  },
  {
    id: 'q-actm-fill3-040',
    section: 'math',
    topic: 'complex-numbers',
    difficulty: 32,
    stem: 'What is i^27?',
    choices: ['1', '-1', '-i', 'i', '0'],
    answer: 2,
    explanation: 'i cycles every 4: i^1=i, i^2=-1, i^3=-i, i^4=1. 27 mod 4 = 3, so i^27 = -i. (C). Distractors: (A) 1 = i^4 cycle; (B) -1 = i^2; (D) i misses sign; (E) 0 nonsense.'
  },
  {
    id: 'q-actm-fill3-041',
    section: 'math',
    topic: 'matrices',
    difficulty: 27,
    stem: 'If A = [[1, 2], [3, 4]] and B = [[2, 0], [1, 3]], what is the entry in row 1, column 1 of AB?',
    choices: ['2', '3', '5', '6', '4'],
    answer: 4,
    explanation: '(AB)_11 = 1·2 + 2·1 = 2 + 2 = 4. (E). Distractors: (A) 2 ignores second product; (B) 3 misuses; (C) 5 adds wrong; (D) 6 uses 1·2+2·2.'
  },
  {
    id: 'q-actm-fill3-042',
    section: 'math',
    topic: 'probability',
    difficulty: 31,
    stem: 'A fair coin is flipped 3 times. What is the probability of getting exactly 2 heads?',
    choices: ['\\frac{1}{8}', '\\frac{1}{4}', '\\frac{1}{2}', '\\frac{5}{8}', '\\frac{3}{8}'],
    answer: 4,
    explanation: 'C(3,2)=3 ways out of 2^3=8 outcomes. P = 3/8. (E). Distractors: (A) 1/8 only one arrangement; (B) 1/4 uses 2/8; (C) 1/2 confuses; (D) 5/8 includes 3 heads.'
  },
  {
    id: 'q-actm-fill3-043',
    section: 'math',
    topic: 'algebra-roots',
    difficulty: 24,
    stem: 'Solve √(x+5) = 4.',
    choices: ['-1', '1', '9', '11', '21'],
    answer: 3,
    explanation: 'Square both sides: x+5 = 16, x = 11. (D). Distractors: (A) -1 = 5-... wrong; (B) 1 misuses; (C) 9 uses x+5=9; (E) 21 uses x=16+5.'
  },
  {
    id: 'q-actm-fill3-044',
    section: 'math',
    topic: 'intermediate-algebra-functions',
    difficulty: 25,
    stem: 'If f(x) = x^2 + 1 and g(x) = 2x - 3, what is f(g(2))?',
    choices: ['1', '2', '5', '10', '17'],
    answer: 1,
    explanation: 'g(2) = 4-3 = 1. f(1) = 1+1 = 2. (B). Distractors: (A) 1 = g(2); (C) 5 = f(2); (D) 10 = g(f(2)); (E) 17 = f(4).'
  },
  {
    id: 'q-actm-fill3-045',
    section: 'math',
    topic: 'log',
    difficulty: 28,
    stem: 'If log(x) + log(4) = log(20), what is x?',
    choices: ['1', '5', '4', '16', '24'],
    answer: 1,
    explanation: 'log(4x) = log(20), so 4x = 20, x = 5. (B). Distractors: (A) 1 misuses; (C) 4 = log argument; (D) 16 = 20-4; (E) 24 adds.'
  },
  {
    id: 'q-actm-fill3-046',
    section: 'math',
    topic: 'trig-graphs',
    difficulty: 25,
    stem: 'What is the amplitude of f(x) = -3sin(2x) + 4?',
    choices: ['-3', '2', '4', '3', '7'],
    answer: 3,
    explanation: 'Amplitude is |coefficient of sin| = |-3| = 3. (D). Distractors: (A) -3 keeps sign; (B) 2 = period coefficient; (C) 4 = vertical shift; (E) 7 = max value.'
  },
  {
    id: 'q-actm-fill3-047',
    section: 'math',
    topic: 'plane-geometry-pythagoras',
    difficulty: 27,
    stem: 'A right triangle has hypotenuse 17 and one leg of length 8. What is the length of the other leg?',
    choices: ['9', '12', '13', '15', '21'],
    answer: 3,
    explanation: 'Other leg = √(289-64) = √225 = 15. (D). Distractors: (A) 9 = 17-8; (B) 12 errors; (C) 13 wrong triple; (E) 21 sums.'
  },
  {
    id: 'q-actm-fill3-048',
    section: 'math',
    topic: 'intermediate-algebra-logarithms',
    difficulty: 30,
    stem: 'Solve for x: 2^(x+1) = 8^x.',
    choices: ['\\frac{1}{2}', '1', '2', '3', '4'],
    answer: 0,
    explanation: '8 = 2^3, so 2^(x+1) = 2^(3x). Then x+1 = 3x, so 2x = 1, x = 1/2. (A). Distractors: (B) 1 misuses; (C) 2 from x+1=3x ignored; (D) 3 = log base; (E) 4 misuses.'
  },
  {
    id: 'q-actm-fill3-049',
    section: 'math',
    topic: 'sequences',
    difficulty: 23,
    stem: 'The sum of the first n positive integers is given by \\frac{n(n+1)}{2}. What is the sum of the integers from 1 to 20?',
    choices: ['100', '190', '200', '210', '420'],
    answer: 3,
    explanation: '20·21/2 = 420/2 = 210. (D). Distractors: (A) 100 uses 10^2; (B) 190 = 19·10; (C) 200 = 20·10; (E) 420 forgets to halve.'
  },
  {
    id: 'q-actm-fill3-050',
    section: 'math',
    topic: 'probability',
    difficulty: 36,
    stem: 'Two cards are drawn without replacement from a standard 52-card deck. What is the probability that both are hearts?',
    choices: ['\\frac{1}{16}', '\\frac{1}{17}', '\\frac{13}{204}', '\\frac{1}{4}', '\\frac{169}{2704}'],
    answer: 1,
    explanation: 'P = (13/52)(12/51) = (1/4)(12/51) = 12/204 = 1/17. (B). Distractors: (A) 1/16 = (1/4)^2 wrong; (C) 13/204 misimplifies; (D) 1/4 single draw; (E) 169/2704 with replacement.'
  }
]);
