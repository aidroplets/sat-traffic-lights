/**
 * ISEE Math (Mathematics Achievement) — fill batch 2.
 * testType: 'ISEE', section: 'math'.
 * Concatenates onto window.STL_QUESTIONS_ISEE.
 */
'use strict';
window.STL_QUESTIONS_ISEE = (window.STL_QUESTIONS_ISEE || []).concat([
  {
    id: 'q-iseem-fill2-001',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 4,
    stem: 'If 3x + 7 = 22, what is the value of x?',
    choices: ['3', '5', '7', '9'],
    answer: 1,
    explanation: 'Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5. (A) 3 forgets to subtract 7 first then mis-divides. (C) 7 wrongly does 22 − 7 − 8. (D) 9 adds 7 to 22 then mis-divides.'
  },
  {
    id: 'q-iseem-fill2-002',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 7,
    stem: 'If 5(x − 2) = 3x + 4, what is the value of x?',
    choices: ['3', '5', '7', '9'],
    answer: 2,
    explanation: 'Distribute: 5x − 10 = 3x + 4. Subtract 3x: 2x − 10 = 4. Add 10: 2x = 14. Divide: x = 7. (A) 3 forgets to distribute the 5. (B) 5 makes a sign error on the −10. (D) 9 adds instead of subtracts when isolating x.'
  },
  {
    id: 'q-iseem-fill2-003',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 6,
    stem: 'What is the slope of the line passing through the points (2, 3) and (6, 11)?',
    choices: ['8', '4', '\\frac{1}{2}', '2'],
    answer: 3,
    explanation: 'Slope = (y₂ − y₁)/(x₂ − x₁) = (11 − 3)/(6 − 2) = 8/4 = 2. (A) 8 uses only the y-difference. (B) 4 uses only the x-difference. (C) 1/2 inverts the formula (Δx/Δy).'
  },
  {
    id: 'q-iseem-fill2-004',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 6,
    stem: 'What is the distance between the points (1, 2) and (4, 6)?',
    choices: ['7', '5', '4', '3'],
    answer: 1,
    explanation: 'Use the distance formula: √((4−1)² + (6−2)²) = √(9 + 16) = √25 = 5. (A) 7 simply adds (4−1) + (6−2) = 3 + 4 = 7 instead of using the Pythagorean theorem. (C) 4 takes only the y-difference. (D) 3 takes only the x-difference.'
  },
  {
    id: 'q-iseem-fill2-005',
    section: 'math',
    topic: 'decimals',
    difficulty: 3,
    stem: 'What is 0.6 × 0.4?',
    choices: ['0.24', '0.024', '2.4', '24'],
    answer: 0,
    explanation: '6 × 4 = 24. There is one decimal place in each factor, so the product has 1 + 1 = 2 decimal places: 0.24. (B) 0.024 uses three decimal places. (C) 2.4 uses only one decimal place. (D) 24 ignores the decimals entirely.'
  },
  {
    id: 'q-iseem-fill2-006',
    section: 'math',
    topic: 'decimals',
    difficulty: 6,
    stem: 'What is 5.2 ÷ 0.04?',
    choices: ['1300', '130', '13', '1.3'],
    answer: 1,
    explanation: 'Multiply both numerator and denominator by 100 to clear the decimal in the divisor: 5.2 ÷ 0.04 = 520 ÷ 4 = 130. (A) 1300 multiplies both by an extra factor of 10 (5200 ÷ 4). (C) 13 multiplies only the divisor by 100 (5.2 ÷ 4). (D) 1.3 divides 5.2 by 4 directly, ignoring the decimal placement.'
  },
  {
    id: 'q-iseem-fill2-007',
    section: 'math',
    topic: 'exponents',
    difficulty: 4,
    stem: 'What is the value of 2³ × 2⁴?',
    choices: ['64', '128', '256', '512'],
    answer: 1,
    explanation: 'When multiplying powers with the same base, add exponents: 2³ × 2⁴ = 2⁷ = 128. (A) 64 = 2⁶ uses an exponent of 6 by mistake. (C) 256 = 2⁸ adds one extra exponent. (D) 512 = 2⁹ multiplies exponents (3 × 4 = 12 then mis-handled, or 2³ × 2⁶).'
  },
  {
    id: 'q-iseem-fill2-008',
    section: 'math',
    topic: 'exponents',
    difficulty: 8,
    stem: 'What is the value of (3²)³ ÷ 3⁴?',
    choices: ['81', '27', '3', '9'],
    answer: 3,
    explanation: '(3²)³ = 3⁶ (multiply exponents). Then 3⁶ ÷ 3⁴ = 3² = 9 (subtract exponents). (A) 81 = 3⁴ keeps the original exponent without subtracting. (B) 27 = 3³ off by one in the subtraction step. (C) 3 subtracts an extra exponent (3⁶ ÷ 3⁵).'
  },
  {
    id: 'q-iseem-fill2-009',
    section: 'math',
    topic: 'fractions',
    difficulty: 3,
    stem: 'Which fraction is equivalent to 6/8?',
    choices: ['\\frac{3}{4}', '\\frac{4}{5}', '\\frac{2}{3}', '\\frac{1}{2}'],
    answer: 0,
    explanation: 'Divide numerator and denominator by their common factor 2: 6/8 = 3/4. (B) 4/5 = 0.8, not 0.75. (C) 2/3 ≈ 0.667, not equal. (D) 1/2 = 4/8, not 6/8.'
  },
  {
    id: 'q-iseem-fill2-010',
    section: 'math',
    topic: 'fractions',
    difficulty: 7,
    stem: 'Which of the following is the largest fraction?',
    choices: ['\\frac{3}{5}', '\\frac{5}{8}', '\\frac{2}{3}', '\\frac{7}{10}'],
    answer: 3,
    explanation: 'Convert to decimals: 3/5 = 0.60, 5/8 = 0.625, 2/3 ≈ 0.667, 7/10 = 0.70. The largest is 7/10. (A) 3/5 = 0.60 is the smallest. (B) 5/8 = 0.625. (C) 2/3 ≈ 0.667 — close but not the largest.'
  },
  {
    id: 'q-iseem-fill2-011',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 5,
    stem: 'What is 3/4 + 5/6?',
    choices: ['\\frac{19}{12}', '\\frac{13}{12}', '\\frac{8}{12}', '\\frac{8}{10}'],
    answer: 0,
    explanation: 'Common denominator is 12: 3/4 = 9/12, 5/6 = 10/12. Sum: 9/12 + 10/12 = 19/12. (B) 13/12 forgets to convert one fraction (e.g. 3/12 + 10/12). (C) 8/12 adds 3 + 5 over the common denominator without converting. (D) 8/10 adds numerators and denominators directly (wrong rule).'
  },
  {
    id: 'q-iseem-fill2-012',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 7,
    stem: 'What is 2 1/3 ÷ 1 1/6?',
    choices: ['1', '\\frac{14}{9}', '2', '\\frac{7}{3}'],
    answer: 2,
    explanation: 'Convert: 2 1/3 = 7/3, 1 1/6 = 7/6. Divide by multiplying by reciprocal: 7/3 × 6/7 = 42/21 = 2. (A) 1 divides numerators only (7÷7=1) ignoring denominators. (B) 14/9 multiplies by 2/3 (mis-inverts 7/6 to 2/3). (D) 7/3 forgets to invert and just keeps the dividend.'
  },
  {
    id: 'q-iseem-fill2-013',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 3,
    stem: 'What is the area of a rectangle with length 8 cm and width 5 cm?',
    choices: ['13 cm²', '26 cm²', '40 cm²', '45 cm²'],
    answer: 2,
    explanation: 'Area of a rectangle = length × width = 8 × 5 = 40 cm². (A) 13 adds length and width. (B) 26 computes the perimeter (2(8+5) = 26). (D) 45 multiplies 9 × 5 (off-by-one on length).'
  },
  {
    id: 'q-iseem-fill2-014',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 8,
    stem: 'A triangle has a base of 12 inches and a height of 9 inches. What is its area?',
    choices: ['216 in²', '108 in²', '54 in²', '21 in²'],
    answer: 2,
    explanation: 'Area of a triangle = (1/2) × base × height = (1/2)(12)(9) = 54 in². (A) 216 doubles the rectangle area instead of halving. (B) 108 forgets the 1/2 factor. (D) 21 adds base and height.'
  },
  {
    id: 'q-iseem-fill2-015',
    section: 'math',
    topic: 'geometry-perimeter',
    difficulty: 3,
    stem: 'What is the perimeter of a square with side length 7 m?',
    choices: ['28 m', '49 m', '21 m', '14 m'],
    answer: 0,
    explanation: 'Perimeter of a square = 4 × side = 4 × 7 = 28 m. (B) 49 computes the area (7 × 7) rather than perimeter. (C) 21 multiplies by 3 (counts only three sides). (D) 14 doubles the side instead of multiplying by 4.'
  },
  {
    id: 'q-iseem-fill2-016',
    section: 'math',
    topic: 'geometry-perimeter',
    difficulty: 6,
    stem: 'A regular hexagon has a perimeter of 48 cm. What is the length of each side?',
    choices: ['12 cm', '10 cm', '6 cm', '8 cm'],
    answer: 3,
    explanation: 'A regular hexagon has 6 equal sides, so each side = 48 ÷ 6 = 8 cm. (A) 12 divides by 4 (treats it as a square). (B) 10 estimates but is too large (would give perimeter 60). (C) 6 mistakenly divides 48 by 8 (confusing number of sides).'
  },
  {
    id: 'q-iseem-fill2-017',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 4,
    stem: 'What is the volume of a rectangular box with length 4 ft, width 3 ft, and height 2 ft?',
    choices: ['9 ft³', '12 ft³', '48 ft³', '24 ft³'],
    answer: 3,
    explanation: 'Volume = length × width × height = 4 × 3 × 2 = 24 ft³. (A) 9 adds the dimensions. (B) 12 multiplies only length × width (the base area). (C) 48 doubles the volume incorrectly.'
  },
  {
    id: 'q-iseem-fill2-018',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 9,
    stem: 'A cube has a surface area of 96 cm². What is its volume?',
    choices: ['96 cm³', '64 cm³', '32 cm³', '16 cm³'],
    answer: 1,
    explanation: 'Surface area of a cube = 6s², so 6s² = 96 → s² = 16 → s = 4 cm. Volume = s³ = 4³ = 64 cm³. (A) 96 confuses surface area with volume. (C) 32 doubles s² instead of cubing s. (D) 16 stops at s² without cubing.'
  },
  {
    id: 'q-iseem-fill2-019',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 4,
    stem: 'What is the mean of the numbers 4, 7, 8, 10, and 11?',
    choices: ['7', '8', '9', '10'],
    answer: 1,
    explanation: 'Mean = (4 + 7 + 8 + 10 + 11)/5 = 40/5 = 8. (A) 7 picks the second value rather than computing. (C) 9 is the median+1 or a rounding error. (D) 10 picks the second-largest value.'
  },
  {
    id: 'q-iseem-fill2-020',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 6,
    stem: 'The mean of five test scores is 84. Four of the scores are 75, 80, 85, and 90. What is the fifth score?',
    choices: ['78', '85', '88', '90'],
    answer: 3,
    explanation: 'Total of all five scores = 5 × 84 = 420. Sum of the four known scores = 75 + 80 + 85 + 90 = 330. Fifth score = 420 − 330 = 90. (A) 78 subtracts incorrectly. (B) 85 picks an existing score by mistake. (C) 88 estimates without computing the total.'
  },
  {
    id: 'q-iseem-fill2-021',
    section: 'math',
    topic: 'number-sense',
    difficulty: 3,
    stem: 'What is the greatest common factor (GCF) of 18 and 24?',
    choices: ['12', '6', '3', '2'],
    answer: 1,
    explanation: 'Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Greatest common factor: 6. (A) 12 is a factor of 24 but not of 18. (C) 3 and (D) 2 are common factors but not the greatest.'
  },
  {
    id: 'q-iseem-fill2-022',
    section: 'math',
    topic: 'number-sense',
    difficulty: 6,
    stem: 'What is the least common multiple (LCM) of 6 and 8?',
    choices: ['14', '36', '48', '24'],
    answer: 3,
    explanation: 'Multiples of 6: 6, 12, 18, 24… Multiples of 8: 8, 16, 24… LCM = 24. (A) 14 adds 6 + 8. (B) 36 is a multiple of 6 only. (C) 48 is the product 6 × 8 — a common multiple but not the least.'
  },
  {
    id: 'q-iseem-fill2-023',
    section: 'math',
    topic: 'order-of-operations',
    difficulty: 4,
    stem: 'What is the value of 8 + 3 × (6 − 2)?',
    choices: ['20', '24', '32', '44'],
    answer: 0,
    explanation: 'Parentheses first: 6 − 2 = 4. Then multiply: 3 × 4 = 12. Then add: 8 + 12 = 20. (B) 24 multiplies 8 × 3 first. (C) 32 mishandles the parentheses. (D) 44 ignores order of operations: (8+3)×(6−2) = 44.'
  },
  {
    id: 'q-iseem-fill2-024',
    section: 'math',
    topic: 'order-of-operations',
    difficulty: 7,
    stem: 'What is the value of 20 − 2³ × 2 + 6 ÷ 3?',
    choices: ['14', '12', '6', '2'],
    answer: 2,
    explanation: 'Exponent first: 2³ = 8. Then multiplication and division left to right: 8 × 2 = 16, 6 ÷ 3 = 2. Now: 20 − 16 + 2 = 4 + 2 = 6. (A) 14 forgets to apply the exponent. (B) 12 computes 20 − 8 + 0. (D) 2 subtracts the last term instead of adding.'
  },
  {
    id: 'q-iseem-fill2-025',
    section: 'math',
    topic: 'percentage',
    difficulty: 3,
    stem: 'What is 25% of 80?',
    choices: ['20', '25', '15', '8'],
    answer: 0,
    explanation: '25% = 1/4. (1/4) × 80 = 20. (B) 25 just repeats the percent. (C) 15 estimates 20% of 75. (D) 8 computes 10% of 80.'
  },
  {
    id: 'q-iseem-fill2-026',
    section: 'math',
    topic: 'percentage',
    difficulty: 6,
    stem: 'A jacket originally priced at $80 is on sale for $60. What is the percent discount?',
    choices: ['33%', '20%', '15%', '25%'],
    answer: 3,
    explanation: 'Discount amount = 80 − 60 = 20. Percent discount = 20/80 = 1/4 = 25%. (A) 33% uses 20/60 (discount over sale price) instead of original price. (B) 20% uses the dollar amount as the percent directly. (C) 15% confuses the dollar discount.'
  },
  {
    id: 'q-iseem-fill2-027',
    section: 'math',
    topic: 'percentage',
    difficulty: 7,
    stem: 'After a 20% increase, the population of a town is 6,000. What was the original population?',
    choices: ['7,200', '5,200', '5,000', '4,800'],
    answer: 2,
    explanation: 'Let original = P. After a 20% increase: 1.2P = 6000 → P = 6000/1.2 = 5000. (A) 7,200 adds 20% to 6000 (wrong direction). (B) 5,200 estimates incorrectly. (D) 4,800 takes 80% of 6000 (treats as a 20% decrease).'
  },
  {
    id: 'q-iseem-fill2-028',
    section: 'math',
    topic: 'place-value',
    difficulty: 3,
    stem: 'In the number 47,395, what digit is in the hundreds place?',
    choices: ['3', '4', '7', '9'],
    answer: 0,
    explanation: 'Reading from right: 5 (ones), 9 (tens), 3 (hundreds), 7 (thousands), 4 (ten-thousands). The hundreds digit is 3. (B) 4 is in the ten-thousands place. (C) 7 is in the thousands place. (D) 9 is in the tens place.'
  },
  {
    id: 'q-iseem-fill2-029',
    section: 'math',
    topic: 'place-value',
    difficulty: 5,
    stem: 'What is the value of the digit 6 in the number 3,628,401?',
    choices: ['600,000', '6,000,000', '60,000', '6,000'],
    answer: 0,
    explanation: 'Place values from right in 3,628,401: 1 (ones), 0 (tens), 4 (hundreds), 8 (thousands), 2 (ten-thousands), 6 (hundred-thousands), 3 (millions). So the 6 represents 600,000. (B) 6,000,000 is the millions place. (C) 60,000 is ten-thousands. (D) 6,000 is the thousands place.'
  },
  {
    id: 'q-iseem-fill2-030',
    section: 'math',
    topic: 'probability',
    difficulty: 4,
    stem: 'A bag contains 3 red, 4 blue, and 5 green marbles. If one marble is drawn at random, what is the probability that it is blue?',
    choices: ['\\frac{1}{3}', '\\frac{1}{4}', '\\frac{4}{8}', '\\frac{5}{12}'],
    answer: 0,
    explanation: 'Total marbles = 3 + 4 + 5 = 12. P(blue) = 4/12 = 1/3. (B) 1/4 uses 3/12 (red probability). (C) 4/8 ignores the green marbles entirely. (D) 5/12 gives the green probability.'
  },
  {
    id: 'q-iseem-fill2-031',
    section: 'math',
    topic: 'probability',
    difficulty: 5,
    stem: 'Two fair coins are flipped. What is the probability that both land on heads?',
    choices: ['\\frac{1}{2}', '\\frac{1}{3}', '\\frac{1}{8}', '\\frac{1}{4}'],
    answer: 3,
    explanation: 'Each flip is independent with P(heads) = 1/2. P(both heads) = (1/2)(1/2) = 1/4. (A) 1/2 gives the probability for just one coin. (B) 1/3 incorrectly counts outcomes as {HH, HT, TT}, ignoring that HT and TH are distinct. (C) 1/8 multiplies an extra 1/2 (treats it as three coins).'
  },
  {
    id: 'q-iseem-fill2-032',
    section: 'math',
    topic: 'quadratics',
    difficulty: 6,
    stem: 'What are the solutions of x² − 5x + 6 = 0?',
    choices: ['x = 1 and x = 6', 'x = 2 and x = 3', 'x = −2 and x = −3', 'x = −1 and x = −6'],
    answer: 1,
    explanation: 'Factor: x² − 5x + 6 = (x − 2)(x − 3) = 0, so x = 2 or x = 3. (A) x = 1, 6 picks factors that multiply to 6 but do not sum to 5. (C) x = −2, −3 has correct magnitudes but wrong signs (would solve x² + 5x + 6 = 0). (D) x = −1, −6 mixes both errors.'
  },
  {
    id: 'q-iseem-fill2-033',
    section: 'math',
    topic: 'quadratics',
    difficulty: 5,
    stem: 'If x² − 9 = 0, what are the values of x?',
    choices: ['x = ±√3', 'x = ±9', 'x = 3 only', 'x = ±3'],
    answer: 3,
    explanation: 'x² = 9 means x = √9 or x = −√9, so x = ±3. (A) x = ±√3 takes the square root of 3 instead of 9. (B) x = ±9 forgets to take the square root. (C) x = 3 only forgets the negative root.'
  },
  {
    id: 'q-iseem-fill2-034',
    section: 'math',
    topic: 'rate-problem',
    difficulty: 4,
    stem: 'A car travels 180 miles in 3 hours. What is its average speed?',
    choices: ['60 mph', '75 mph', '50 mph', '45 mph'],
    answer: 0,
    explanation: 'Average speed = distance/time = 180/3 = 60 mph. (B) 75 divides 300/4 or similar mis-setup. (C) 50 estimates incorrectly. (D) 45 divides 180 by 4.'
  },
  {
    id: 'q-iseem-fill2-035',
    section: 'math',
    topic: 'rate-problem',
    difficulty: 7,
    stem: 'If 4 workers can paint a wall in 6 hours, how long will it take 3 workers to paint the same wall, assuming they work at the same rate?',
    choices: ['9 hours', '8 hours', '6 hours', '4.5 hours'],
    answer: 1,
    explanation: 'Total work = 4 workers × 6 hours = 24 worker-hours. With 3 workers: time = 24/3 = 8 hours. (A) 9 multiplies 6 × 1.5 incorrectly (should be 6 × 4/3 = 8). (C) 6 keeps the time the same (ignores worker change). (D) 4.5 divides 6 × 3/4 (treats as direct proportion).'
  },
  {
    id: 'q-iseem-fill2-036',
    section: 'math',
    topic: 'ratio',
    difficulty: 6,
    stem: 'In a class, the ratio of boys to girls is 3:5. If there are 24 students total, how many girls are there?',
    choices: ['9', '12', '15', '18'],
    answer: 2,
    explanation: 'Total ratio parts = 3 + 5 = 8. Each part = 24/8 = 3 students. Girls = 5 × 3 = 15. (A) 9 gives the number of boys (3 × 3). (B) 12 splits 24 in half (ignores the ratio). (D) 18 uses 3:5 → 18:6 incorrectly.'
  },
  {
    id: 'q-iseem-fill2-037',
    section: 'math',
    topic: 'ratio',
    difficulty: 5,
    stem: 'The ratio of cats to dogs at a shelter is 4:7. If there are 28 dogs, how many cats are there?',
    choices: ['24', '20', '16', '12'],
    answer: 2,
    explanation: 'Set up the proportion: 4/7 = c/28. Cross-multiply: 7c = 112 → c = 16. (A) 24 uses 28 − 4. (B) 20 computes 28 − 8. (D) 12 incorrectly uses 4/7 ≈ 0.43 × 28 ≈ 12 (rough estimate). Only 16 satisfies the exact ratio.'
  },
  {
    id: 'q-iseem-fill2-038',
    section: 'math',
    topic: 'word-problem',
    difficulty: 4,
    stem: 'Sara has $50. She buys 3 books that cost $12 each. How much money does she have left?',
    choices: ['$36', '$24', '$14', '$8'],
    answer: 2,
    explanation: 'Cost of 3 books = 3 × $12 = $36. Money left = $50 − $36 = $14. (A) $36 gives the cost rather than the change. (B) $24 = 2 × $12 (uses only 2 books). (D) $8 uses $50 − $42 (miscounts books).'
  },
  {
    id: 'q-iseem-fill2-039',
    section: 'math',
    topic: 'word-problem',
    difficulty: 6,
    stem: 'A train leaves a station at 9:00 AM traveling at 50 mph. How far has it traveled by 12:30 PM?',
    choices: ['125 miles', '150 miles', '175 miles', '200 miles'],
    answer: 2,
    explanation: 'Time elapsed = 3.5 hours. Distance = speed × time = 50 × 3.5 = 175 miles. (A) 125 = 50 × 2.5 (counts wrong start time). (B) 150 = 50 × 3 (ignores the half hour). (D) 200 = 50 × 4 (rounds up the time).'
  },
  {
    id: 'q-iseem-fill2-040',
    section: 'math',
    topic: 'word-problem',
    difficulty: 7,
    stem: 'Tom is twice as old as Jerry. In 5 years, the sum of their ages will be 40. How old is Tom now?',
    choices: ['25', '20', '15', '10'],
    answer: 1,
    explanation: 'Let Jerry = j; Tom = 2j. In 5 years: (j + 5) + (2j + 5) = 40 → 3j + 10 = 40 → 3j = 30 → j = 10. So Tom = 2j = 20. (A) 25 = 2j + 5 (Tom\'s age in 5 years). (C) 15 uses j + 5 (Jerry\'s future age). (D) 10 gives Jerry\'s current age.'
  }
]);
