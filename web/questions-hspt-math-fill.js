/**
 * HSPT Math — fill batch (40 more questions).
 * testType: 'HSPT', section: 'math'.
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';
window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ===== EASY (450-500) — 8 questions =====
  {
    id: 'q-hsptm-fill-001',
    section: 'math',
    topic: 'arithmetic',
    difficulty: 460,
    stem: 'What is 48 + 27 - 15?',
    choices: ['60', '70', '75', '90'],
    answer: 0,
    explanation: '48 + 27 = 75, then 75 - 15 = 60. Choice A is correct. B (70) subtracts 5 instead of 15. C (75) forgets to subtract. D (90) adds 15 instead of subtracting.'
  },
  {
    id: 'q-hsptm-fill-002',
    section: 'math',
    topic: 'fractions',
    difficulty: 470,
    stem: 'What is 1/2 + 1/4?',
    choices: ['\\frac{1}{6}', '\\frac{3}{4}', '\\frac{2}{6}', '\\frac{1}{3}'],
    answer: 1,
    explanation: 'Common denominator 4: 1/2 = 2/4, so 2/4 + 1/4 = 3/4. Choice B is correct. A (1/6) wrongly adds denominators. C (2/6) adds both numerators and denominators. D (1/3) is unrelated.'
  },
  {
    id: 'q-hsptm-fill-003',
    section: 'math',
    topic: 'decimals',
    difficulty: 475,
    stem: 'What is 0.6 + 0.45?',
    choices: ['0.51', '0.105', '1.05', '1.5'],
    answer: 2,
    explanation: 'Align decimals: 0.60 + 0.45 = 1.05. Choice C is correct. A (0.51) misaligns place values. B (0.105) drops the integer carry. D (1.5) ignores the .05.'
  },
  {
    id: 'q-hsptm-fill-004',
    section: 'math',
    topic: 'order-of-operations',
    difficulty: 480,
    stem: 'Evaluate: 6 + 2 × 3.',
    choices: ['24', '11', '8', '12'],
    answer: 3,
    explanation: 'Multiplication before addition: 2 × 3 = 6, then 6 + 6 = 12. Choice D is correct. A (24) treats it as (6 + 2) × 3. B (11) and C (8) are arithmetic mistakes.'
  },
  {
    id: 'q-hsptm-fill-005',
    section: 'math',
    topic: 'exponents',
    difficulty: 480,
    stem: 'What is 2^4?',
    choices: ['16', '8', '6', '24'],
    answer: 0,
    explanation: '2^4 = 2 × 2 × 2 × 2 = 16. Choice A is correct. B (8) computes 2^3. C (6) wrongly does 2 × 4 first wrong, then? unclear. D (24) does 2^4 = 24 (off by halving).'
  },
  {
    id: 'q-hsptm-fill-006',
    section: 'math',
    topic: 'percent',
    difficulty: 490,
    stem: 'What is 25% of 80?',
    choices: ['25', '15', '40', '20'],
    answer: 3,
    explanation: '25% = 1/4, and 80 ÷ 4 = 20. Choice D is correct. A (25) just echoes the percent number. B (15) is wrong arithmetic. C (40) is half (50%).'
  },
  {
    id: 'q-hsptm-fill-007',
    section: 'math',
    topic: 'geometry-rectangle',
    difficulty: 495,
    stem: 'A rectangle has length 9 and width 4. What is its perimeter?',
    choices: ['36', '13', '26', '18'],
    answer: 2,
    explanation: 'P = 2(L + W) = 2(9 + 4) = 2(13) = 26. Choice C is correct. A (36) computes area instead. B (13) forgets the factor of 2. D (18) doubles only one side.'
  },
  {
    id: 'q-hsptm-fill-008',
    section: 'math',
    topic: 'number-sense-multiples',
    difficulty: 500,
    stem: 'Which of these is a multiple of 6?',
    choices: ['16', '26', '34', '42'],
    answer: 3,
    explanation: '42 = 6 × 7, so 42 is a multiple of 6. Choice D is correct. A (16) is not divisible by 6 (16/6 ≈ 2.67). B (26) is not (26/6 ≈ 4.33). C (34) is not (34/6 ≈ 5.67).'
  },

  // ===== MEDIUM (550-600) — 16 questions =====
  {
    id: 'q-hsptm-fill-009',
    section: 'math',
    topic: 'algebra-basic',
    difficulty: 550,
    stem: 'If 3x + 4 = 19, what is x?',
    choices: ['5', '7', '6', '15'],
    answer: 0,
    explanation: 'Subtract 4: 3x = 15. Divide by 3: x = 5. Choice A is correct. B (7) subtracts 5 by mistake. C (6) forgets to divide cleanly. D (15) skips the division step.'
  },
  {
    id: 'q-hsptm-fill-010',
    section: 'math',
    topic: 'ratio',
    difficulty: 555,
    stem: 'In a class the ratio of boys to girls is 3:5. If there are 24 students, how many are girls?',
    choices: ['9', '15', '12', '20'],
    answer: 1,
    explanation: 'Total parts = 3 + 5 = 8. Each part = 24/8 = 3. Girls = 5 × 3 = 15. Choice B is correct. A (9) gives the boys count. C (12) is half the class. D (20) misuses the ratio.'
  },
  {
    id: 'q-hsptm-fill-011',
    section: 'math',
    topic: 'geometry-triangle',
    difficulty: 560,
    stem: 'Two angles of a triangle measure 50° and 70°. What is the third angle?',
    choices: ['80°', '70°', '60°', '90°'],
    answer: 2,
    explanation: 'Triangle angles sum to 180°: 180 - 50 - 70 = 60°. Choice C is correct. A (80) miscalculates 180 - 50 - 50. B (70) repeats one of the given angles. D (90) assumes a right triangle.'
  },
  {
    id: 'q-hsptm-fill-012',
    section: 'math',
    topic: 'probability',
    difficulty: 560,
    stem: 'A bag has 4 red, 3 blue, and 5 green marbles. What is the probability of drawing a blue marble?',
    choices: ['\\frac{3}{8}', '\\frac{1}{3}', '\\frac{3}{5}', '\\frac{1}{4}'],
    answer: 3,
    explanation: 'Total marbles = 4 + 3 + 5 = 12. P(blue) = 3/12 = 1/4. Choice D is correct. A (3/8) excludes red incorrectly. B (1/3) uses 3/9. C (3/5) uses wrong total.'
  },
  {
    id: 'q-hsptm-fill-013',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 565,
    stem: 'Find the mean of 8, 12, 15, and 9.',
    choices: ['11', '10', '12', '15'],
    answer: 0,
    explanation: 'Sum = 8 + 12 + 15 + 9 = 44. Mean = 44/4 = 11. Choice A is correct. B (10) underestimates. C (12) is the median-ish guess. D (15) is the max.'
  },
  {
    id: 'q-hsptm-fill-014',
    section: 'math',
    topic: 'word-problem-rate',
    difficulty: 570,
    stem: 'A car travels 150 miles in 3 hours. At the same rate, how far will it travel in 5 hours?',
    choices: ['200 miles', '250 miles', '300 miles', '450 miles'],
    answer: 1,
    explanation: 'Rate = 150/3 = 50 mph. Distance in 5 hours = 50 × 5 = 250 miles. Choice B is correct. A (200) uses 4 hours. C (300) doubles wrongly. D (450) multiplies 150 × 3.'
  },
  {
    id: 'q-hsptm-fill-015',
    section: 'math',
    topic: 'exponents',
    difficulty: 575,
    stem: 'What is 3^2 × 3^3?',
    choices: ['9', '27', '243', '729'],
    answer: 2,
    explanation: 'Same base: add exponents. 3^(2+3) = 3^5 = 243. Choice C is correct. A (9) is just 3^2. B (27) is 3^3. D (729) is 3^6, multiplying exponents instead of adding.'
  },
  {
    id: 'q-hsptm-fill-016',
    section: 'math',
    topic: 'fractions',
    difficulty: 575,
    stem: 'What is 2/3 ÷ 4/9?',
    choices: ['\\frac{8}{27}', '\\frac{2}{3}', '\\frac{1}{2}', '\\frac{3}{2}'],
    answer: 3,
    explanation: 'Divide by flipping the second fraction: 2/3 × 9/4 = 18/12 = 3/2. Choice D is correct. A (8/27) multiplies instead of divides. B (2/3) just repeats the first fraction. C (1/2) results from a dropped step.'
  },
  {
    id: 'q-hsptm-fill-017',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 580,
    stem: 'A circle has radius 7. What is its circumference? (Use π ≈ 22/7.)',
    choices: ['44', '154', '22', '49'],
    answer: 0,
    explanation: 'C = 2πr = 2 × (22/7) × 7 = 44. Choice A is correct. B (154) computes area πr². C (22) uses πr instead of 2πr. D (49) is r².'
  },
  {
    id: 'q-hsptm-fill-018',
    section: 'math',
    topic: 'percent',
    difficulty: 580,
    stem: 'A shirt costs $40. After a 15% discount, what is the sale price?',
    choices: ['$25', '$34', '$36', '$6'],
    answer: 1,
    explanation: 'Discount = 0.15 × 40 = $6. Sale price = 40 - 6 = $34. Choice B is correct. A ($25) subtracts 15 directly. C ($36) uses 10% off. D ($6) gives the discount, not the price.'
  },
  {
    id: 'q-hsptm-fill-019',
    section: 'math',
    topic: 'number-sense-primes',
    difficulty: 585,
    stem: 'Which of the following is prime?',
    choices: ['21', '27', '29', '33'],
    answer: 2,
    explanation: '29 has no factors other than 1 and itself. Choice C is correct. A (21 = 3 × 7), B (27 = 3³), and D (33 = 3 × 11) all have small prime factors.'
  },
  {
    id: 'q-hsptm-fill-020',
    section: 'math',
    topic: 'decimals',
    difficulty: 590,
    stem: 'What is 0.4 × 0.25?',
    choices: ['1.0', '0.65', '0.01', '0.10'],
    answer: 3,
    explanation: '4 × 25 = 100, and the product has 1 + 2 = 3 decimal places, giving 0.100 = 0.10. Choice D is correct. A (1.0) drops decimal places entirely. B (0.65) adds the decimals incorrectly. C (0.01) uses too many decimal places.'
  },
  {
    id: 'q-hsptm-fill-021',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 590,
    stem: 'A rectangular box has length 5, width 3, and height 4. What is its volume?',
    choices: ['60', '47', '94', '12'],
    answer: 0,
    explanation: 'V = L × W × H = 5 × 3 × 4 = 60. Choice A is correct. B (47) gives surface-area-related miscount. C (94) is the surface area 2(15+20+12). D (12) skips one factor.'
  },
  {
    id: 'q-hsptm-fill-022',
    section: 'math',
    topic: 'word-problem-mixture',
    difficulty: 595,
    stem: 'A 10-liter solution is 20% salt. How many liters of pure salt are in it?',
    choices: ['2', '5', '4', '10'],
    answer: 0,
    explanation: '20% of 10 = 0.20 × 10 = 2 liters of salt. Choice A is correct. B (5) uses 50%. C (4) uses 40%. D (10) gives total volume.'
  },
  {
    id: 'q-hsptm-fill-023',
    section: 'math',
    topic: 'order-of-operations',
    difficulty: 595,
    stem: 'Evaluate: (8 - 3) × 2 + 6 ÷ 2.',
    choices: ['14', '16', '11', '13'],
    answer: 3,
    explanation: 'Parentheses: 8 - 3 = 5. Then 5 × 2 = 10 and 6 ÷ 2 = 3. Sum: 10 + 3 = 13. Choice D is correct. A (14) forgets a step. B (16) treats the whole left side wrong. C (11) computes 8 - 3 × 2 + 6 ÷ 2 without parens.'
  },
  {
    id: 'q-hsptm-fill-024',
    section: 'math',
    topic: 'probability',
    difficulty: 600,
    stem: 'A fair six-sided die is rolled. What is the probability of rolling an even number greater than 2?',
    choices: ['\\frac{1}{2}', '\\frac{1}{3}', '\\frac{2}{3}', '\\frac{1}{6}'],
    answer: 1,
    explanation: 'Even numbers > 2: {4, 6} — that is 2 outcomes out of 6. P = 2/6 = 1/3. Choice B is correct. A (1/2) counts all evens. C (2/3) inverts. D (1/6) counts only one outcome.'
  },

  // ===== HARD (650-700) — 12 questions =====
  {
    id: 'q-hsptm-fill-025',
    section: 'math',
    topic: 'algebra-basic',
    difficulty: 655,
    stem: 'If 2(x + 3) = 4x - 6, what is x?',
    choices: ['6', '3', '0', '12'],
    answer: 0,
    explanation: 'Distribute: 2x + 6 = 4x - 6. Subtract 2x: 6 = 2x - 6. Add 6: 12 = 2x, so x = 6. Choice A is correct. B (3) drops the distribution. C (0) has wrong sign. D (12) forgets to divide by 2.'
  },
  {
    id: 'q-hsptm-fill-026',
    section: 'math',
    topic: 'geometry-triangle',
    difficulty: 660,
    stem: 'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
    choices: ['12', '10', '14', '48'],
    answer: 1,
    explanation: 'Pythagorean theorem: 6² + 8² = 36 + 64 = 100, so hypotenuse = √100 = 10. Choice B is correct. A (12) is wrong sum. C (14) adds legs directly. D (48) is the area times 2.'
  },
  {
    id: 'q-hsptm-fill-027',
    section: 'math',
    topic: 'word-problem-mixture',
    difficulty: 665,
    stem: 'How many liters of pure water must be added to 8 liters of a 25% acid solution to dilute it to a 10% acid solution?',
    choices: ['8', '10', '12', '20'],
    answer: 2,
    explanation: 'Acid amount stays the same: 0.25 × 8 = 2 liters of acid. Let x be water added. Then 2 / (8 + x) = 0.10, so 8 + x = 20, giving x = 12. Choice C is correct. A (8) doubles the original. B (10) misreads the equation. D (20) is the new total volume, not water added.'
  },
  {
    id: 'q-hsptm-fill-028',
    section: 'math',
    topic: 'percent',
    difficulty: 670,
    stem: 'A jacket is marked up 20% from its cost, then sold at a 10% discount on the marked price. If the cost was $50, what is the final selling price?',
    choices: ['$55', '$60', '$57', '$54'],
    answer: 3,
    explanation: 'Marked price: 50 × 1.20 = $60. After 10% discount: 60 × 0.90 = $54. Choice D is correct. A ($55) takes net 10% increase only. B ($60) stops at marked price. C ($57) miscomputes the discount.'
  },
  {
    id: 'q-hsptm-fill-029',
    section: 'math',
    topic: 'ratio',
    difficulty: 675,
    stem: 'The ratio of cats to dogs at a shelter is 4:7. If there are 12 more dogs than cats, how many cats are at the shelter?',
    choices: ['16', '20', '24', '28'],
    answer: 0,
    explanation: 'Let cats = 4k, dogs = 7k. Then 7k - 4k = 12, so 3k = 12, k = 4. Cats = 4 × 4 = 16. Choice A is correct. B (20) uses k = 5. C (24) double-counts. D (28) is the dogs count.'
  },
  {
    id: 'q-hsptm-fill-030',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 680,
    stem: 'The mean of five numbers is 14. If four of the numbers are 10, 12, 16, and 18, what is the fifth number?',
    choices: ['12', '14', '16', '18'],
    answer: 1,
    explanation: 'Sum of all 5 = 14 × 5 = 70. Sum of given four = 10 + 12 + 16 + 18 = 56. Fifth number = 70 - 56 = 14. Choice B is correct. A (12) uses wrong total. C (16) repeats a value. D (18) repeats max.'
  },
  {
    id: 'q-hsptm-fill-031',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 685,
    stem: 'A circle has area 36π. What is its circumference?',
    choices: ['6π', '18π', '12π', '36π'],
    answer: 2,
    explanation: 'A = πr² = 36π, so r² = 36, r = 6. Then C = 2πr = 12π. Choice C is correct. A (6π) is πr. B (18π) miscomputes. D (36π) repeats area.'
  },
  {
    id: 'q-hsptm-fill-032',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 690,
    stem: 'A cube has surface area 96 square inches. What is its volume in cubic inches?',
    choices: ['16', '32', '48', '64'],
    answer: 3,
    explanation: 'Cube has 6 equal faces, so each face = 96/6 = 16 sq in, meaning side = 4 in. Volume = 4³ = 64. Choice D is correct. A (16) is one face. B (32) doubles a face. C (48) is half the surface area.'
  },
  {
    id: 'q-hsptm-fill-033',
    section: 'math',
    topic: 'word-problem-rate',
    difficulty: 690,
    stem: 'Aiden can mow a lawn in 3 hours and Brooke can mow the same lawn in 6 hours. Working together, how long will it take them?',
    choices: ['2 hours', '4.5 hours', '1.5 hours', '3 hours'],
    answer: 0,
    explanation: 'Combined rate = 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2 lawn per hour. Time = 1 ÷ (1/2) = 2 hours. Choice A is correct. B (4.5) averages times. C (1.5) is half of A. D (3) just keeps the faster time.'
  },
  {
    id: 'q-hsptm-fill-034',
    section: 'math',
    topic: 'fractions',
    difficulty: 695,
    stem: 'What is (3/4 - 1/3) ÷ (1/2)?',
    choices: ['\\frac{5}{24}', '\\frac{5}{12}', '\\frac{5}{6}', '\\frac{10}{12}'],
    answer: 2,
    explanation: 'Inside: 3/4 - 1/3 = 9/12 - 4/12 = 5/12. Then 5/12 ÷ 1/2 = 5/12 × 2/1 = 10/12 = 5/6. Choice C is correct. A (5/24) divides by 2 incorrectly. B (5/12) stops too early. D (10/12) is unsimplified.'
  },
  {
    id: 'q-hsptm-fill-035',
    section: 'math',
    topic: 'number-sense-primes',
    difficulty: 700,
    stem: 'What is the prime factorization of 84?',
    choices: ['2 × 3 × 14', '2² × 3 × 7', '2 × 6 × 7', '2³ × 3 × 7'],
    answer: 1,
    explanation: '84 = 4 × 21 = 2² × 3 × 7. Choice B is correct. A (2 × 3 × 14) leaves 14 unfactored. C (2 × 6 × 7) leaves 6 unfactored. D (2³ × 3 × 7 = 168) is wrong.'
  },
  {
    id: 'q-hsptm-fill-036',
    section: 'math',
    topic: 'algebra-basic',
    difficulty: 700,
    stem: 'If x/4 + 5 = 12, what is the value of x?',
    choices: ['7', '17', '28', '32'],
    answer: 2,
    explanation: 'Subtract 5: x/4 = 7. Multiply by 4: x = 28. Choice C is correct. A (7) skips multiplying by 4. B (17) adds instead of subtracts. D (32) multiplies first, off-step.'
  },

  // ===== INSANE (730-770) — 4 questions =====
  {
    id: 'q-hsptm-fill-037',
    section: 'math',
    topic: 'geometry-triangle',
    difficulty: 740,
    stem: 'A triangle has sides 13, 14, and 15. Its area is 84. What is the length of the altitude drawn to the side of length 14?',
    choices: ['6', '12', '11', '14'],
    answer: 1,
    explanation: 'Area = (1/2) × base × height. With base 14: 84 = (1/2)(14)(h) = 7h, so h = 12. Choice B is correct. A (6) divides 84 by 14. C (11) is unrelated. D (14) repeats the base.'
  },
  {
    id: 'q-hsptm-fill-038',
    section: 'math',
    topic: 'probability',
    difficulty: 750,
    stem: 'Two cards are drawn without replacement from a standard deck of 52 cards. What is the probability that both are aces?',
    choices: ['\\frac{1}{169}', '\\frac{1}{2652}', '\\frac{4}{52}', '\\frac{1}{221}'],
    answer: 3,
    explanation: 'P(first ace) = 4/52 = 1/13; P(second ace | first ace) = 3/51 = 1/17. Product = 1/(13 × 17) = 1/221. Choice D is correct. A (1/169) uses 13² assuming replacement. B (1/2652) forgets to multiply the 4 × 3 = 12 favorable pairs. C (4/52) is just a single ace probability.'
  },
  {
    id: 'q-hsptm-fill-039',
    section: 'math',
    topic: 'word-problem-mixture',
    difficulty: 755,
    stem: 'A merchant mixes coffee worth $6 per pound with coffee worth $9 per pound to make 30 pounds of a blend worth $7 per pound. How many pounds of the $6 coffee are used?',
    choices: ['10', '15', '20', '25'],
    answer: 2,
    explanation: 'Let x = pounds of $6 coffee. Then (30 - x) = pounds of $9 coffee. Equation: 6x + 9(30 - x) = 7(30) = 210. So 6x + 270 - 9x = 210, giving -3x = -60, x = 20. Choice C is correct. A (10) reverses the answer for the $9 coffee count incorrectly. B (15) splits evenly, ignoring the price weighting. D (25) overweights cheap coffee.'
  },
  {
    id: 'q-hsptm-fill-040',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 765,
    stem: 'A square is inscribed in a circle of radius 5. What is the area of the square?',
    choices: ['25', '50', '75', '100'],
    answer: 1,
    explanation: 'Diagonal of the square equals the diameter = 10. For a square with side s, diagonal = s√2, so s = 10/√2 = 5√2. Area = s² = (5√2)² = 50. Choice B is correct. A (25) uses radius as the side. C (75) is unrelated. D (100) uses diameter as the side.'
  }
]);
