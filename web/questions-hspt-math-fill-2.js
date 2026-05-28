/**
 * HSPT Math — fill batch 2.
 * testType: 'HSPT', section: 'math'.
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';
window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ===== EASY (450-500) — 8 questions =====
  {
    id: 'q-hsptm-fill2-001',
    section: 'math',
    topic: 'arithmetic',
    difficulty: 455,
    stem: 'What is 132 - 47?',
    choices: ['75', '85', '95', '115'],
    answer: 1,
    explanation: '132 - 47: 132 - 40 = 92, then 92 - 7 = 85. Choice B is correct. A (75) subtracts 57 by mistake. C (95) subtracts only 37. D (115) subtracts 17.'
  },
  {
    id: 'q-hsptm-fill2-002',
    section: 'math',
    topic: 'fractions',
    difficulty: 465,
    stem: 'What is 5/6 - 1/3?',
    choices: ['\\frac{4}{3}', '\\frac{4}{6}', '\\frac{1}{2}', '\\frac{1}{3}'],
    answer: 2,
    explanation: 'Common denominator 6: 1/3 = 2/6, so 5/6 - 2/6 = 3/6 = 1/2. Choice C is correct. A (4/3) adds and flips. B (4/6) subtracts numerators without converting (5/6 - 1/6). D (1/3) subtracts denominators incorrectly.'
  },
  {
    id: 'q-hsptm-fill2-003',
    section: 'math',
    topic: 'decimals',
    difficulty: 470,
    stem: 'What is 0.8 - 0.35?',
    choices: ['0.45', '0.55', '0.43', '0.05'],
    answer: 0,
    explanation: 'Align decimals: 0.80 - 0.35 = 0.45. Choice A is correct. B (0.55) subtracts 0.25. C (0.43) is an arithmetic slip. D (0.05) misaligns the place values.'
  },
  {
    id: 'q-hsptm-fill2-004',
    section: 'math',
    topic: 'percent',
    difficulty: 475,
    stem: 'What is 25% of 80?',
    choices: ['25', '15', '20', '40'],
    answer: 2,
    explanation: '25% = 1/4, so 80 / 4 = 20. Choice C is correct. A (25) confuses the percent with the answer. B (15) is unrelated. D (40) computes 50% of 80.'
  },
  {
    id: 'q-hsptm-fill2-005',
    section: 'math',
    topic: 'exponents',
    difficulty: 485,
    stem: 'What is 5^2 + 1?',
    choices: ['11', '51', '36', '26'],
    answer: 3,
    explanation: '5^2 = 25, then 25 + 1 = 26. Choice D is correct. A (11) computes 5 × 2 + 1. B (51) treats 5^2 as 50, then adds 1. C (36) computes 6^2.'
  },
  {
    id: 'q-hsptm-fill2-006',
    section: 'math',
    topic: 'order-of-operations',
    difficulty: 490,
    stem: 'Evaluate: 20 - 4 × 3 + 2.',
    choices: ['10', '50', '14', '6'],
    answer: 0,
    explanation: 'Multiply first: 4 × 3 = 12. Then 20 - 12 + 2 = 8 + 2 = 10. Choice A is correct. B (50) does (20 - 4) × 3 + 2. C (14) does 20 - 4 × 3 = 16 then -2. D (6) treats - and + left-to-right wrongly as 20 - 12 - 2.'
  },
  {
    id: 'q-hsptm-fill2-007',
    section: 'math',
    topic: 'number-sense-multiples',
    difficulty: 495,
    stem: 'Which number is a multiple of both 4 and 6?',
    choices: ['10', '14', '24', '26'],
    answer: 2,
    explanation: 'A common multiple of 4 and 6 must be a multiple of LCM(4, 6) = 12. 24 = 12 × 2. Choice C is correct. A (10), B (14), and D (26) are not multiples of either 4 or 6.'
  },
  {
    id: 'q-hsptm-fill2-008',
    section: 'math',
    topic: 'geometry-rectangle',
    difficulty: 500,
    stem: 'A rectangle has length 9 and width 4. What is its perimeter?',
    choices: ['13', '36', '26', '18'],
    answer: 2,
    explanation: 'Perimeter = 2(L + W) = 2(9 + 4) = 2(13) = 26. Choice C is correct. A (13) gives only L + W. B (36) gives the area instead. D (18) doubles only the length.'
  },

  // ===== MEDIUM (550-600) — 16 questions =====
  {
    id: 'q-hsptm-fill2-009',
    section: 'math',
    topic: 'algebra-basic',
    difficulty: 555,
    stem: 'If 4x - 5 = 19, what is x?',
    choices: ['3', '5', '7', '6'],
    answer: 3,
    explanation: 'Add 5 to both sides: 4x = 24, so x = 6. Choice D is correct. A (3) computes 19/something incorrectly. B (5) computes 19 - 14. C (7) computes (19 + 9)/4 with a slip.'
  },
  {
    id: 'q-hsptm-fill2-010',
    section: 'math',
    topic: 'fractions',
    difficulty: 560,
    stem: 'What is 2/3 × 9/8?',
    choices: ['\\frac{11}{24}', '\\frac{3}{4}', '\\frac{18}{11}', '\\frac{4}{3}'],
    answer: 1,
    explanation: 'Multiply: (2 × 9) / (3 × 8) = 18/24 = 3/4. Choice B is correct. A (11/24) adds numerators. C (18/11) inverts denominator. D (4/3) flips one fraction first.'
  },
  {
    id: 'q-hsptm-fill2-011',
    section: 'math',
    topic: 'decimals',
    difficulty: 565,
    stem: 'What is 0.4 × 0.25?',
    choices: ['0.10', '0.65', '1.0', '0.01'],
    answer: 0,
    explanation: '4 × 25 = 100; total decimal places = 1 + 2 = 3, so 0.100 = 0.10. Choice A is correct. B (0.65) adds instead of multiplies. C (1.0) drops the decimals entirely. D (0.01) shifts the decimal one place too far.'
  },
  {
    id: 'q-hsptm-fill2-012',
    section: 'math',
    topic: 'percent',
    difficulty: 570,
    stem: 'A jacket is $80. It is on sale for 15% off. What is the sale price?',
    choices: ['$68', '$65', '$72', '$95'],
    answer: 0,
    explanation: '15% of 80 = 0.15 × 80 = 12. Sale price = 80 - 12 = 68. Choice A is correct. B ($65) subtracts $15 instead of 15%. C ($72) subtracts 10% only. D ($95) adds 15% instead of subtracting.'
  },
  {
    id: 'q-hsptm-fill2-013',
    section: 'math',
    topic: 'ratio',
    difficulty: 575,
    stem: 'The ratio of cats to dogs at a shelter is 3:5. If there are 24 cats, how many dogs are there?',
    choices: ['40', '32', '15', '45'],
    answer: 0,
    explanation: 'Set up 3/5 = 24/d. Cross-multiply: 3d = 120, d = 40. Choice A is correct. B (32) adds 8 (the difference). C (15) reverses the ratio (5/3 = 24/d gives ~14.4). D (45) uses 24 + 21 with bad scaling.'
  },
  {
    id: 'q-hsptm-fill2-014',
    section: 'math',
    topic: 'geometry-triangle',
    difficulty: 580,
    stem: 'Two angles of a triangle measure 55° and 65°. What is the third angle?',
    choices: ['50°', '120°', '70°', '60°'],
    answer: 3,
    explanation: 'Sum of triangle angles = 180°. Third angle = 180 - 55 - 65 = 60°. Choice D is correct. A (50°) uses 170 instead of 180. B (120°) sums the two given angles. C (70°) uses 190.'
  },
  {
    id: 'q-hsptm-fill2-015',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 585,
    stem: 'A circle has radius 7. What is its circumference, in terms of π?',
    choices: ['7π', '28π', '49π', '14π'],
    answer: 3,
    explanation: 'C = 2πr = 2π(7) = 14π. Choice D is correct. A (7π) uses πr (forgets the 2). B (28π) doubles the diameter. C (49π) gives the area πr².'
  },
  {
    id: 'q-hsptm-fill2-016',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 585,
    stem: 'The mean of four numbers is 12. Three of the numbers are 8, 11, and 14. What is the fourth?',
    choices: ['12', '13', '15', '17'],
    answer: 2,
    explanation: 'Sum of four = 4 × 12 = 48. Sum of three = 8 + 11 + 14 = 33. Fourth = 48 - 33 = 15. Choice C is correct. A (12) just repeats the mean. B (13) uses sum 46 by mistake. D (17) uses sum 50 by mistake.'
  },
  {
    id: 'q-hsptm-fill2-017',
    section: 'math',
    topic: 'probability',
    difficulty: 590,
    stem: 'A bag has 3 red, 4 blue, and 5 green marbles. What is the probability of drawing a blue marble (in simplest form)?',
    choices: ['\\frac{1}{4}', '\\frac{5}{12}', '\\frac{4}{12}', '\\frac{1}{3}'],
    answer: 3,
    explanation: 'Total = 3 + 4 + 5 = 12. P(blue) = 4/12 = 1/3. Choice D is correct. A (1/4) uses total 16 by mistake. B (5/12) uses green count. C (4/12) is the right value but not in simplest form.'
  },
  {
    id: 'q-hsptm-fill2-018',
    section: 'math',
    topic: 'word-problem-rate',
    difficulty: 595,
    stem: 'A car travels 180 miles in 3 hours. At the same rate, how far does it travel in 5 hours?',
    choices: ['240 miles', '300 miles', '360 miles', '540 miles'],
    answer: 1,
    explanation: 'Rate = 180/3 = 60 mph. Distance in 5 hours = 60 × 5 = 300 miles. Choice B is correct. A (240) uses 4 hours. C (360) uses 6 hours. D (540) multiplies 180 × 3.'
  },
  {
    id: 'q-hsptm-fill2-019',
    section: 'math',
    topic: 'word-problem-mixture',
    difficulty: 600,
    stem: '8 ounces of nuts cost $3.20. How much do 12 ounces cost at the same rate?',
    choices: ['$3.60', '$4.80', '$5.20', '$4.20'],
    answer: 1,
    explanation: 'Unit price = 3.20/8 = $0.40 per ounce. 12 × 0.40 = $4.80. Choice B is correct. A ($3.60) adds $0.40. C ($5.20) adds $2 to the cost. D ($4.20) adds $1 to the cost.'
  },
  {
    id: 'q-hsptm-fill2-020',
    section: 'math',
    topic: 'number-sense-primes',
    difficulty: 565,
    stem: 'Which of the following is a prime number?',
    choices: ['21', '27', '29', '33'],
    answer: 2,
    explanation: '29 has no divisors other than 1 and 29. Choice C is correct. A (21) = 3 × 7. B (27) = 3³. D (33) = 3 × 11.'
  },
  {
    id: 'q-hsptm-fill2-021',
    section: 'math',
    topic: 'exponents',
    difficulty: 570,
    stem: 'What is 3^3 × 3^2?',
    choices: ['3^6', '3^5', '9^5', '3^1'],
    answer: 1,
    explanation: 'When multiplying same bases, add exponents: 3 + 2 = 5, so 3^5. Choice B is correct. A (3^6) multiplies exponents. C (9^5) wrongly multiplies bases. D (3^1) subtracts exponents.'
  },
  {
    id: 'q-hsptm-fill2-022',
    section: 'math',
    topic: 'order-of-operations',
    difficulty: 580,
    stem: 'Evaluate: (8 + 4) ÷ 2 - 3.',
    choices: ['1', '7', '5', '3'],
    answer: 3,
    explanation: 'Parentheses first: 8 + 4 = 12. Then 12 ÷ 2 = 6, then 6 - 3 = 3. Choice D is correct. A (1) divides 12 by 4 instead. B (7) skips parentheses: 8 + 4÷2 - 3 = 8 + 2 - 3 = 7. C (5) divides 12 by 3 then subtracts.'
  },
  {
    id: 'q-hsptm-fill2-023',
    section: 'math',
    topic: 'algebra-basic',
    difficulty: 590,
    stem: 'If 3(x + 2) = 21, what is x?',
    choices: ['5', '6', '7', '9'],
    answer: 0,
    explanation: 'Distribute: 3x + 6 = 21, so 3x = 15, x = 5. Choice A is correct. B (6) divides 21 by some wrong number. C (7) computes 21/3 but forgets to subtract 2. D (9) computes (21 - 3) /2 incorrectly.'
  },
  {
    id: 'q-hsptm-fill2-024',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 595,
    stem: 'A rectangular box has length 5, width 3, and height 4. What is its volume?',
    choices: ['12', '47', '94', '60'],
    answer: 3,
    explanation: 'Volume = L × W × H = 5 × 3 × 4 = 60. Choice D is correct. A (12) gives 3 × 4 only (a face area). B (47) is unrelated. C (94) gives the surface area = 2(15 + 20 + 12) = 94.'
  },

  // ===== HARD (650-700) — 12 questions =====
  {
    id: 'q-hsptm-fill2-025',
    section: 'math',
    topic: 'algebra-basic',
    difficulty: 655,
    stem: 'If 2x + 3y = 17 and y = 3, what is x?',
    choices: ['4', '3', '5', '7'],
    answer: 0,
    explanation: 'Substitute y = 3: 2x + 9 = 17, so 2x = 8, x = 4. Choice A is correct. B (3) divides incorrectly. C (5) computes 17 - 9 = 8 but forgets to halve, then errors. D (7) uses 17 - 3 = 14, then 14/2.'
  },
  {
    id: 'q-hsptm-fill2-026',
    section: 'math',
    topic: 'fractions',
    difficulty: 660,
    stem: 'What is (3/4) ÷ (2/3)?',
    choices: ['\\frac{9}{8}', '\\frac{6}{12}', '\\frac{1}{2}', '\\frac{8}{9}'],
    answer: 0,
    explanation: 'Dividing fractions: multiply by reciprocal. (3/4) × (3/2) = 9/8. Choice A is correct. B (6/12) just multiplies straight: (3 × 2)/(4 × 3) without inverting. C (1/2) is the same multiplication error simplified. D (8/9) is the reciprocal of the right answer.'
  },
  {
    id: 'q-hsptm-fill2-027',
    section: 'math',
    topic: 'percent',
    difficulty: 665,
    stem: 'A number increased by 20% gives 96. What is the original number?',
    choices: ['76', '80', '76.8', '120'],
    answer: 1,
    explanation: 'Original × 1.20 = 96, so original = 96 / 1.20 = 80. Choice B is correct. A (76) subtracts 20 from 96. C (76.8) takes 80% of 96. D (120) divides 96 by 0.80 instead of 1.20.'
  },
  {
    id: 'q-hsptm-fill2-028',
    section: 'math',
    topic: 'ratio',
    difficulty: 670,
    stem: 'The ratio of boys to girls in a class is 4:5. If there are 36 students total, how many boys are there?',
    choices: ['16', '20', '14', '18'],
    answer: 0,
    explanation: 'Total parts = 4 + 5 = 9. Each part = 36/9 = 4. Boys = 4 × 4 = 16. Choice A is correct. B (20) gives girls. C (14) uses parts of 7. D (18) takes half (assumes equal split).'
  },
  {
    id: 'q-hsptm-fill2-029',
    section: 'math',
    topic: 'geometry-triangle',
    difficulty: 675,
    stem: 'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
    choices: ['10', '14', '12', '48'],
    answer: 0,
    explanation: 'By Pythagoras: c² = 6² + 8² = 36 + 64 = 100, so c = 10. Choice A is correct. B (14) just adds the legs. C (12) is the perimeter / something. D (48) gives 6 × 8.'
  },
  {
    id: 'q-hsptm-fill2-030',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 680,
    stem: 'A circle has area 36π. What is its circumference, in terms of π?',
    choices: ['6π', '18π', '12π', '36π'],
    answer: 2,
    explanation: 'Area = πr² = 36π, so r² = 36, r = 6. Then C = 2πr = 12π. Choice C is correct. A (6π) gives πr (the radius times π). B (18π) uses r = 9 by mistake. D (36π) repeats the area.'
  },
  {
    id: 'q-hsptm-fill2-031',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 685,
    stem: 'A student has test scores of 78, 84, and 90. What score on a fourth test gives a mean of 85?',
    choices: ['85', '86', '88', '92'],
    answer: 2,
    explanation: 'Sum needed = 4 × 85 = 340. Current sum = 78 + 84 + 90 = 252. Fourth score = 340 - 252 = 88. Choice C is correct. A (85) just repeats the target mean. B (86) uses 338 by mistake. D (92) uses 4 × 86 by mistake.'
  },
  {
    id: 'q-hsptm-fill2-032',
    section: 'math',
    topic: 'probability',
    difficulty: 690,
    stem: 'A fair coin is flipped 3 times. What is the probability of getting exactly 2 heads?',
    choices: ['\\frac{1}{8}', '\\frac{2}{3}', '\\frac{3}{8}', '\\frac{1}{2}'],
    answer: 2,
    explanation: 'Total outcomes = 2³ = 8. Favorable: HHT, HTH, THH = 3. P = 3/8. Choice C is correct. A (1/8) counts only one ordering (HHT). B (2/3) wrongly uses 2 out of 3 flips. D (1/2) gives P(any head).'
  },
  {
    id: 'q-hsptm-fill2-033',
    section: 'math',
    topic: 'word-problem-rate',
    difficulty: 695,
    stem: 'Working alone, Pat can paint a fence in 6 hours. Working alone, Sam can paint the same fence in 3 hours. How long does it take them working together?',
    choices: ['1.5 hours', '4.5 hours', '2.5 hours', '2 hours'],
    answer: 3,
    explanation: 'Combined rate = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 fence per hour. Time = 1 / (1/2) = 2 hours. Choice D is correct. A (1.5) halves the faster time. B (4.5) averages 6 and 3. C (2.5) averages 2 and 3.'
  },
  {
    id: 'q-hsptm-fill2-034',
    section: 'math',
    topic: 'word-problem-mixture',
    difficulty: 700,
    stem: 'A 10-gallon mixture is 30% juice. How many gallons of pure juice must be added to make the mixture 50% juice?',
    choices: ['2', '4', '5', '8'],
    answer: 1,
    explanation: 'Initial juice = 0.30 × 10 = 3 gal. Let x = gallons added. (3 + x)/(10 + x) = 0.5. So 3 + x = 5 + 0.5x, then 0.5x = 2, x = 4. Choice B is correct. A (2) ignores the new total. C (5) just halves the original 10. D (8) uses bad cross-multiplication.'
  },
  {
    id: 'q-hsptm-fill2-035',
    section: 'math',
    topic: 'number-sense-primes',
    difficulty: 670,
    stem: 'What is the prime factorization of 84?',
    choices: ['2 × 3 × 7', '2² × 3 × 7', '2 × 3² × 7', '4 × 21'],
    answer: 1,
    explanation: '84 = 2 × 42 = 2 × 2 × 21 = 2 × 2 × 3 × 7 = 2² × 3 × 7. Choice B is correct. A (2 × 3 × 7) = 42, missing one factor of 2. C (2 × 3² × 7) = 126. D (4 × 21) is not prime factorization (4 is not prime).'
  },
  {
    id: 'q-hsptm-fill2-036',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 690,
    stem: 'A cube has surface area 96 square units. What is its volume?',
    choices: ['16', '64', '48', '96'],
    answer: 1,
    explanation: 'Surface area = 6s² = 96, so s² = 16, s = 4. Volume = s³ = 64. Choice B is correct. A (16) gives s² (one face area). C (48) takes half the surface area. D (96) repeats the surface area.'
  },

  // ===== INSANE (730-770) — 4 questions =====
  {
    id: 'q-hsptm-fill2-037',
    section: 'math',
    topic: 'algebra-basic',
    difficulty: 735,
    stem: 'If 2(x - 3) + 4 = 3x - 7, what is x?',
    choices: ['1', '2', '3', '5'],
    answer: 3,
    explanation: 'Distribute: 2x - 6 + 4 = 3x - 7, so 2x - 2 = 3x - 7. Subtract 2x: -2 = x - 7. Add 7: x = 5. Choice D is correct. A (1) drops the constant terms. B (2) uses bad distribution (2x - 3). C (3) forgets to add 4 on the left.'
  },
  {
    id: 'q-hsptm-fill2-038',
    section: 'math',
    topic: 'percent',
    difficulty: 745,
    stem: 'A price is increased by 25%, then decreased by 20%. The final price is what percent of the original?',
    choices: ['95%', '105%', '100%', '120%'],
    answer: 2,
    explanation: 'After 25% increase: 1.25 × original. After 20% decrease: 0.80 × 1.25 = 1.00 × original. Final is 100% of original. Choice C is correct. A (95%) subtracts 25 - 20 = 5. B (105%) adds 25 - 20 = 5. D (120%) just adds the percents.'
  },
  {
    id: 'q-hsptm-fill2-039',
    section: 'math',
    topic: 'word-problem-rate',
    difficulty: 755,
    stem: 'Train A leaves a station traveling 50 mph. Two hours later, Train B leaves the same station traveling the same direction at 70 mph. How many hours after Train B leaves will it catch Train A?',
    choices: ['3', '10', '7', '5'],
    answer: 3,
    explanation: 'When B leaves, A is 100 miles ahead. B gains 70 - 50 = 20 mph on A. Time to catch up = 100/20 = 5 hours. Choice D is correct. A (3) uses gap of 60 miles. B (10) uses gap of 200. C (7) uses 140 miles gap.'
  },
  {
    id: 'q-hsptm-fill2-040',
    section: 'math',
    topic: 'geometry-triangle',
    difficulty: 765,
    stem: 'In a right triangle, one leg is 5 and the hypotenuse is 13. What is the area of the triangle?',
    choices: ['60', '30', '32.5', '15'],
    answer: 1,
    explanation: 'Other leg: c² = a² + b², so b² = 169 - 25 = 144, b = 12. Area = (1/2)(5)(12) = 30. Choice B is correct. A (60) forgets the 1/2. C (32.5) takes (1/2)(5)(13) using hypotenuse. D (15) takes (1/2)(5)(6) with bad b.'
  }
]);
