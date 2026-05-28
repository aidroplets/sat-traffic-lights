/**
 * SSAT Math — fill batch 2.
 * testType: 'SSAT', section: 'math'.
 * Concatenates onto window.STL_QUESTIONS_SSAT.
 */
'use strict';
window.STL_QUESTIONS_SSAT = (window.STL_QUESTIONS_SSAT || []).concat([
  // ===== EASY (560-600) =====
  {
    id: 'q-ssatm-fill2-001',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 570,
    stem: 'What is 2/3 + 1/4?',
    choices: ['\\frac{11}{12}', '\\frac{5}{12}', '\\frac{8}{12}', '\\frac{3}{7}', '\\frac{7}{12}'],
    answer: 0,
    explanation: 'Common denominator 12: 2/3 = 8/12, 1/4 = 3/12. Sum = 11/12. (B) subtracts instead of adds. (C) forgets to add the 3/12 piece. (D) adds numerators and denominators directly. (E) miscomputes 8+3 as 7.'
  },
  {
    id: 'q-ssatm-fill2-002',
    section: 'math',
    topic: 'percent',
    difficulty: 580,
    stem: 'What is 15% of 80?',
    choices: ['8', '12', '10', '15', '16'],
    answer: 1,
    explanation: '15% of 80 = 0.15 x 80 = 12. (A) computes 10% only. (C) computes 80/8. (D) confuses 15% with 15. (E) computes 20% of 80.'
  },
  {
    id: 'q-ssatm-fill2-003',
    section: 'math',
    topic: 'decimals',
    difficulty: 560,
    stem: 'What is 0.6 x 0.4?',
    choices: ['0.024', '2.4', '0.24', '0.0024', '24'],
    answer: 2,
    explanation: '6 x 4 = 24; two decimal places total, so 0.24. (A) uses three decimal places. (B) uses one decimal place. (D) uses four decimal places. (E) drops the decimal entirely.'
  },
  {
    id: 'q-ssatm-fill2-004',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 590,
    stem: 'If 3x + 5 = 20, what is x?',
    choices: ['3', '8', '\\frac{15}{3}', '5', '\\frac{5}{3}'],
    answer: 3,
    explanation: '3x = 15, so x = 5. (A) divides 15 by 5 instead of 3. (B) adds 5 instead of subtracting. (C) leaves 15/3 unsimplified — wrong-form distractor. (E) reverses the division.'
  },
  {
    id: 'q-ssatm-fill2-005',
    section: 'math',
    topic: 'geometry-perimeter',
    difficulty: 580,
    stem: 'A rectangle has length 9 and width 4. What is its perimeter?',
    choices: ['26', '13', '36', '40', '18'],
    answer: 0,
    explanation: 'P = 2(L+W) = 2(13) = 26. (B) adds L + W only. (C) computes area instead. (D) adds 36 + 4 confusion. (E) uses 2L only.'
  },
  {
    id: 'q-ssatm-fill2-006',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 590,
    stem: 'What is the mean of 4, 6, 8, 10, and 12?',
    choices: ['6', '7', '9', '10', '8'],
    answer: 4,
    explanation: 'Sum = 40; mean = 40/5 = 8. (A) takes the smallest. (B) divides by 6 instead of 5. (C) is the median misread. (D) takes the second-largest.'
  },
  {
    id: 'q-ssatm-fill2-007',
    section: 'math',
    topic: 'number-sense',
    difficulty: 570,
    stem: 'Which of the following is the largest?',
    choices: ['0.5', '0.51', '0.499', '0.45', '0.05'],
    answer: 1,
    explanation: '0.51 > 0.50 > 0.499 > 0.45 > 0.05. (A) ignores the hundredths digit. (C) thinks more digits = larger. (D) confuses length with magnitude. (E) misreads the place value.'
  },
  {
    id: 'q-ssatm-fill2-008',
    section: 'math',
    topic: 'exponents',
    difficulty: 600,
    stem: 'What is 2^5?',
    choices: ['10', '16', '32', '25', '64'],
    answer: 2,
    explanation: '2^5 = 2x2x2x2x2 = 32. (A) computes 2x5. (B) computes 2^4. (D) computes 5^2. (E) computes 2^6.'
  },

  // ===== MEDIUM (640-680) =====
  {
    id: 'q-ssatm-fill2-009',
    section: 'math',
    topic: 'ratio',
    difficulty: 650,
    stem: 'In a class, the ratio of boys to girls is 3:5. If there are 24 students total, how many boys are there?',
    choices: ['9', '8', '12', '15', '16'],
    answer: 0,
    explanation: 'Total parts = 8; each part = 24/8 = 3. Boys = 3 x 3 = 9. (B) takes parts directly. (C) reverses ratio (12 vs 12 split halved). (D) gives girls count. (E) miscomputes parts.'
  },
  {
    id: 'q-ssatm-fill2-010',
    section: 'math',
    topic: 'percent',
    difficulty: 660,
    stem: 'A shirt costs $40. If the price is increased by 25%, what is the new price?',
    choices: ['$45', '$55', '$60', '$50', '$65'],
    answer: 3,
    explanation: '25% of 40 = 10; new price = 40 + 10 = $50. (A) uses 12.5% increase. (B) uses 37.5% by mistake. (C) doubles 25% then adds. (E) adds 25 directly.'
  },
  {
    id: 'q-ssatm-fill2-011',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 650,
    stem: 'If 2(x - 3) = x + 4, what is x?',
    choices: ['1', '10', '7', '5', '14'],
    answer: 1,
    explanation: 'Distribute: 2x - 6 = x + 4, so x = 10. (A) drops the negative. (C) sets 2x - 3 = x + 4. (D) forgets to distribute. (E) doubles the answer.'
  },
  {
    id: 'q-ssatm-fill2-012',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 660,
    stem: 'A triangle has base 10 and height 6. What is its area?',
    choices: ['16', '24', '30', '36', '60'],
    answer: 2,
    explanation: 'A = (1/2)(b)(h) = (1/2)(10)(6) = 30. (A) adds base and height. (B) computes (1/2)(8)(6). (D) multiplies 6 x 6. (E) forgets the 1/2 factor.'
  },
  {
    id: 'q-ssatm-fill2-013',
    section: 'math',
    topic: 'word-problem',
    difficulty: 670,
    stem: 'Maya is twice as old as Ben. In 5 years, the sum of their ages will be 31. How old is Ben now?',
    choices: ['5', '8', '10', '12', '7'],
    answer: 4,
    explanation: 'Let Ben = b, Maya = 2b. (b+5) + (2b+5) = 31, so 3b = 21, b = 7. (A) ignores the +5 terms. (B) sets 3b + 5 = 31. (C) gives Maya minus 4. (D) computes 31/2.5 rounded.'
  },
  {
    id: 'q-ssatm-fill2-014',
    section: 'math',
    topic: 'probability',
    difficulty: 660,
    stem: 'A bag contains 3 red, 4 blue, and 5 green marbles. What is the probability of drawing a blue marble?',
    choices: ['\\frac{1}{3}', '\\frac{1}{4}', '\\frac{4}{12}', '\\frac{4}{9}', '\\frac{1}{2}'],
    answer: 0,
    explanation: 'Total = 12; P(blue) = 4/12 = 1/3. (B) divides by 16. (C) leaves it unsimplified — wrong-form distractor. (D) excludes blue from the denominator (4/(3+5+1) error). (E) doubles the numerator.'
  },
  {
    id: 'q-ssatm-fill2-015',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 670,
    stem: 'What is the slope of the line through (2, 3) and (6, 11)?',
    choices: ['\\frac{1}{2}', '2', '\\frac{4}{8}', '\\frac{3}{2}', '8'],
    answer: 1,
    explanation: 'Slope = (11-3)/(6-2) = 8/4 = 2. (A) reverses rise/run. (C) reverses and leaves unsimplified. (D) confuses computation. (E) reports rise only.'
  },
  {
    id: 'q-ssatm-fill2-016',
    section: 'math',
    topic: 'sequences',
    difficulty: 660,
    stem: 'In the arithmetic sequence 5, 8, 11, 14, ..., what is the 10th term?',
    choices: ['29', '30', '35', '32', '38'],
    answer: 3,
    explanation: 'a_n = 5 + (n-1)(3); a_10 = 5 + 9(3) = 32. (A) uses (n-1)(3) without the start value, then adds 1. (B) uses 10(3). (C) uses 5 + 10(3). (E) uses 5 + 11(3).'
  },
  {
    id: 'q-ssatm-fill2-017',
    section: 'math',
    topic: 'inequalities',
    difficulty: 670,
    stem: 'If -3x + 7 > 1, which of the following is true?',
    choices: ['x > 2', 'x > -2', 'x < 2', 'x < -2', 'x = 2'],
    answer: 2,
    explanation: '-3x > -6, so x < 2 (flip inequality when dividing by negative). (A) forgets to flip. (B) flips sign of constant only. (D) flips both signs incorrectly. (E) treats inequality as equation.'
  },
  {
    id: 'q-ssatm-fill2-018',
    section: 'math',
    topic: 'absolute-value',
    difficulty: 650,
    stem: 'What is the value of |3 - 8| + |−4|?',
    choices: ['1', '5', '7', '12', '9'],
    answer: 4,
    explanation: '|3-8| = |-5| = 5; |-4| = 4; 5 + 4 = 9. (A) computes 5 - 4. (B) drops the second term. (C) computes |3-8| as 7. (D) uses 8 + 4.'
  },
  {
    id: 'q-ssatm-fill2-019',
    section: 'math',
    topic: 'factoring',
    difficulty: 670,
    stem: 'Which expression is equivalent to x^2 - 9?',
    choices: ['(x-3)(x+3)', '(x+3)(x+3)', '(x-3)(x-3)', '(x-9)(x+1)', 'x(x-9)'],
    answer: 0,
    explanation: 'Difference of squares: x^2 - 9 = (x-3)(x+3). (B) gives x^2 + 6x + 9. (C) gives x^2 - 6x + 9. (D) gives x^2 - 8x - 9. (E) gives x^2 - 9x.'
  },
  {
    id: 'q-ssatm-fill2-020',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 670,
    stem: 'A rectangular box has dimensions 3 by 4 by 5. What is its volume?',
    choices: ['12', '20', '47', '60', '94'],
    answer: 3,
    explanation: 'V = 3 x 4 x 5 = 60. (A) multiplies 3x4 only. (B) multiplies 4x5 only. (C) computes half the surface area. (E) computes full surface area.'
  },
  {
    id: 'q-ssatm-fill2-021',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 660,
    stem: 'What is (3/4) divided by (2/3)?',
    choices: ['\\frac{1}{2}', '\\frac{9}{8}', '\\frac{6}{12}', '\\frac{8}{9}', '\\frac{6}{7}'],
    answer: 1,
    explanation: 'Multiply by reciprocal: (3/4) x (3/2) = 9/8. (A) cross-cancels incorrectly. (C) multiplies straight across. (D) inverts the wrong fraction. (E) adds numerators and denominators.'
  },
  {
    id: 'q-ssatm-fill2-022',
    section: 'math',
    topic: 'exponents',
    difficulty: 680,
    stem: 'What is (3^2)(3^3)?',
    choices: ['3^6', '6^5', '3^5', '9^5', '27^5'],
    answer: 2,
    explanation: 'Same base, add exponents: 3^(2+3) = 3^5. (A) multiplies exponents. (B) adds bases. (D) multiplies bases. (E) multiplies bases as 3x9.'
  },
  {
    id: 'q-ssatm-fill2-023',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 680,
    stem: 'The mean of four numbers is 12. If three of the numbers are 8, 11, and 14, what is the fourth?',
    choices: ['15', '12', '13', '9', '17'],
    answer: 0,
    explanation: 'Sum must equal 4 x 12 = 48. Known sum = 33; fourth = 48 - 33 = 15. (B) assumes equal to mean. (C) takes median attempt. (D) computes 12 - 3. (E) uses sum 50 - 33.'
  },
  {
    id: 'q-ssatm-fill2-024',
    section: 'math',
    topic: 'number-sense',
    difficulty: 660,
    stem: 'How many positive factors does 36 have?',
    choices: ['4', '6', '8', '9', '12'],
    answer: 3,
    explanation: '36 = 2^2 x 3^2; factor count = (2+1)(2+1) = 9. They are 1, 2, 3, 4, 6, 9, 12, 18, 36. (A) counts only proper factors below sqrt. (B) misses pairs. (C) miscounts. (E) double counts.'
  },

  // ===== HARD (700-740) =====
  {
    id: 'q-ssatm-fill2-025',
    section: 'math',
    topic: 'word-problem',
    difficulty: 710,
    stem: 'A train travels 180 miles in 3 hours, then 200 miles in 4 hours. What is the average speed for the entire trip, in miles per hour?',
    choices: ['50', '55', '57', '60', '54'],
    answer: 4,
    explanation: 'Total distance = 380; total time = 7; average = 380/7 ≈ 54.3, closest to 54. (A) averages incorrectly low. (B) averages the two speeds (60 and 50) instead of weighting by time. (C) takes 380/6.67 by miscounting time. (D) takes the higher speed only.'
  },
  {
    id: 'q-ssatm-fill2-026',
    section: 'math',
    topic: 'percent',
    difficulty: 720,
    stem: 'A jacket costs $80 after a 20% discount. What was the original price?',
    choices: ['$96', '$100', '$104', '$120', '$160'],
    answer: 1,
    explanation: '80 = 0.80 x original, so original = 80/0.80 = $100. (A) adds 20% to $80. (C) adds 30%. (D) uses 1/(1-0.33). (E) doubles 80.'
  },
  {
    id: 'q-ssatm-fill2-027',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 710,
    stem: 'If x + y = 10 and x - y = 4, what is xy?',
    choices: ['12', '15', '24', '40', '21'],
    answer: 4,
    explanation: 'Adding: 2x = 14, x = 7; then y = 3. xy = 21. (A) gives x x (x-y) confusion. (B) gives 5 x 3. (C) gives 8 x 3. (D) takes the product of sum and difference / 2 wrong.'
  },
  {
    id: 'q-ssatm-fill2-028',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 720,
    stem: 'A circle has radius 6. What is its area, in terms of pi?',
    choices: ['36pi', '24pi', '30pi', '12pi', '72pi'],
    answer: 0,
    explanation: 'A = pi r^2 = pi(36) = 36pi. (B) uses 2 pi r (circumference formula). (C) uses 5r. (D) uses 2r. (E) doubles the answer.'
  },
  {
    id: 'q-ssatm-fill2-029',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 720,
    stem: 'What is the distance between the points (1, 2) and (4, 6)?',
    choices: ['3', '4', '5', '7', '25'],
    answer: 2,
    explanation: 'd = sqrt((4-1)^2 + (6-2)^2) = sqrt(9+16) = sqrt(25) = 5. (A) takes x-distance only. (B) takes y-distance only. (D) adds the distances. (E) forgets the square root.'
  },
  {
    id: 'q-ssatm-fill2-030',
    section: 'math',
    topic: 'probability',
    difficulty: 730,
    stem: 'Two fair coins are flipped. What is the probability of getting at least one head?',
    choices: ['\\frac{1}{4}', '\\frac{1}{3}', '\\frac{1}{2}', '\\frac{3}{4}', '\\frac{2}{3}'],
    answer: 3,
    explanation: 'P(no heads) = 1/4; P(at least one) = 1 - 1/4 = 3/4. Or list HH, HT, TH, TT: 3 of 4 have heads. (A) gives P(both heads). (B) misses the TT case. (C) confuses with single coin. (E) miscounts outcomes.'
  },
  {
    id: 'q-ssatm-fill2-031',
    section: 'math',
    topic: 'ratio',
    difficulty: 710,
    stem: 'If 4 workers can paint a wall in 6 hours, how long will it take 3 workers (working at the same rate)?',
    choices: ['4.5 hours', '6 hours', '7 hours', '9 hours', '8 hours'],
    answer: 4,
    explanation: 'Worker-hours = 4 x 6 = 24; with 3 workers, time = 24/3 = 8 hours. (A) uses direct proportion. (B) gives same time. (C) adds 1 hour. (D) multiplies wrong: 3 x 3.'
  },
  {
    id: 'q-ssatm-fill2-032',
    section: 'math',
    topic: 'sequences',
    difficulty: 730,
    stem: 'In the geometric sequence 2, 6, 18, 54, ..., what is the 6th term?',
    choices: ['162', '486', '324', '729', '972'],
    answer: 1,
    explanation: 'Ratio = 3; a_6 = 2 x 3^5 = 2 x 243 = 486. (A) gives a_5. (C) gives 2 x 162 wrong step. (D) uses 3^6. (E) uses 4 x 243.'
  },
  {
    id: 'q-ssatm-fill2-033',
    section: 'math',
    topic: 'inequalities',
    difficulty: 720,
    stem: 'If 2 ≤ x ≤ 6 and -3 ≤ y ≤ 1, what is the largest possible value of x - y?',
    choices: ['3', '5', '9', '7', '12'],
    answer: 2,
    explanation: 'Maximize x - y by taking x max and y min: 6 - (-3) = 9. (A) takes x min - y max. (B) takes x max - y max. (D) takes x min - y min. (E) adds magnitudes incorrectly.'
  },
  {
    id: 'q-ssatm-fill2-034',
    section: 'math',
    topic: 'factoring',
    difficulty: 730,
    stem: 'If x^2 - 5x + 6 = 0, what are the values of x?',
    choices: ['1 and 6', '6 and -1', '-2 and -3', '2 and 3', '-1 and -6'],
    answer: 3,
    explanation: 'Factor: (x-2)(x-3) = 0, so x = 2 or 3. (A) factors as (x-1)(x-6) gives x^2 - 7x + 6. (B) mixes signs. (C) flips signs. (E) factors with both negatives.'
  },
  {
    id: 'q-ssatm-fill2-035',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 740,
    stem: 'A cube has surface area 96. What is its volume?',
    choices: ['64', '36', '48', '16', '96'],
    answer: 0,
    explanation: 'Surface area = 6s^2 = 96, so s^2 = 16, s = 4. Volume = 4^3 = 64. (B) computes 6 x 6. (C) computes 96/2. (D) gives s^2. (E) gives surface area as volume.'
  },
  {
    id: 'q-ssatm-fill2-036',
    section: 'math',
    topic: 'word-problem',
    difficulty: 720,
    stem: 'A solution is 30% salt. How many liters of pure water must be added to 10 liters of this solution to make a 20% salt solution?',
    choices: ['2', '3', '4', '6', '5'],
    answer: 4,
    explanation: 'Salt amount stays at 0.30 x 10 = 3 liters. New volume V satisfies 3/V = 0.20, so V = 15. Water added = 15 - 10 = 5 liters. (A) uses ratio difference. (B) approximates. (C) divides wrong. (D) adds 6 from concentration drop estimate.'
  },

  // ===== INSANE (760-780) =====
  {
    id: 'q-ssatm-fill2-037',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 770,
    stem: 'If \\frac{x+1}{x-2} = 3, what is x?',
    choices: ['\\frac{5}{2}', '\\frac{7}{2}', '4', '5', '7'],
    answer: 1,
    explanation: 'x + 1 = 3(x-2); x + 1 = 3x - 6; 7 = 2x; x = 7/2. (A) misses sign. (C) drops the +1. (D) ignores subtraction. (E) gives 2x value.'
  },
  {
    id: 'q-ssatm-fill2-038',
    section: 'math',
    topic: 'probability',
    difficulty: 770,
    stem: 'A bag has 5 red and 3 blue marbles. Two marbles are drawn without replacement. What is the probability that both are red?',
    choices: ['\\frac{25}{64}', '\\frac{5}{8}', '\\frac{5}{14}', '\\frac{5}{16}', '\\frac{3}{14}'],
    answer: 2,
    explanation: 'P = (5/8)(4/7) = 20/56 = 5/14. (A) uses with replacement: (5/8)^2. (B) ignores second draw. (D) treats as (5/8)(5/8)/2.5 confusion. (E) uses blue count in numerator.'
  },
  {
    id: 'q-ssatm-fill2-039',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 760,
    stem: 'A line has slope 2 and passes through (1, 5). At what point does it cross the y-axis?',
    choices: ['(0, 2)', '(0, 5)', '(0, 10)', '(0, 3)', '(0, 7)'],
    answer: 3,
    explanation: 'y = 2x + b; plug in (1,5): 5 = 2 + b, b = 3. So y-intercept is (0, 3). (A) uses slope as intercept. (B) keeps original y. (C) doubles y. (E) adds slope to y.'
  },
  {
    id: 'q-ssatm-fill2-040',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 780,
    stem: 'A square is inscribed in a circle of radius 5. What is the area of the square?',
    choices: ['25', '75', '100', '50pi', '50'],
    answer: 4,
    explanation: 'Diameter = diagonal = 10. For a square with diagonal d, area = d^2/2 = 100/2 = 50. (A) uses radius as side. (B) miscomputes diagonal/side. (C) uses diameter as side. (D) computes circle area variant.'
  }
]);
