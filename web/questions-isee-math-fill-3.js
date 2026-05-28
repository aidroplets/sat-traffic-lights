/**
 * ISEE Math (Mathematics Achievement) — fill batch 3.
 * testType: 'ISEE', section: 'math'.
 * Concatenates onto window.STL_QUESTIONS_ISEE.
 */
'use strict';
window.STL_QUESTIONS_ISEE = (window.STL_QUESTIONS_ISEE || []).concat([
  {
    id: 'q-iseem-fill3-001',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 4,
    stem: 'What is 3/4 + 1/6?',
    choices: ['\\frac{11}{12}', '\\frac{7}{12}', '\\frac{1}{2}', '\\frac{4}{10}'],
    answer: 0,
    explanation: 'Common denominator 12: 3/4 = 9/12 and 1/6 = 2/12. 9/12 + 2/12 = 11/12. (B) 7/12 subtracts instead of adds; (C) 1/2 averages incorrectly; (D) 4/10 adds numerators and denominators.'
  },
  {
    id: 'q-iseem-fill3-002',
    section: 'math',
    topic: 'percentage',
    difficulty: 3,
    stem: 'What is 25% of 80?',
    choices: ['16', '25', '20', '32'],
    answer: 2,
    explanation: '25% = 1/4, so 80 ÷ 4 = 20. (A) 16 is 20% of 80; (B) 25 is the percent itself; (D) 32 is 40% of 80.'
  },
  {
    id: 'q-iseem-fill3-003',
    section: 'math',
    topic: 'order-of-operations',
    difficulty: 4,
    stem: 'Evaluate: 12 - 3 × 2 + 4',
    choices: ['22', '14', '10', '4'],
    answer: 2,
    explanation: 'Multiply first: 3 × 2 = 6. Then 12 - 6 + 4 = 10. (A) 22 ignores order; (B) 14 forgets the subtraction step; (D) 4 evaluates left-to-right ignoring PEMDAS.'
  },
  {
    id: 'q-iseem-fill3-004',
    section: 'math',
    topic: 'decimals',
    difficulty: 3,
    stem: 'What is 0.6 × 0.4?',
    choices: ['0.24', '2.4', '0.024', '24'],
    answer: 0,
    explanation: '6 × 4 = 24. With one decimal place in each factor, the product has 2 decimal places: 0.24. (B) 2.4 misplaces the decimal; (C) 0.024 uses too many decimal places; (D) 24 ignores decimals.'
  },
  {
    id: 'q-iseem-fill3-005',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 4,
    stem: 'If 3x + 7 = 22, what is x?',
    choices: ['9', '15', '5', '7'],
    answer: 2,
    explanation: 'Subtract 7: 3x = 15. Divide by 3: x = 5. (A) 9 subtracts instead of dividing; (B) 15 forgets the division; (D) 7 uses the wrong intermediate value.'
  },
  {
    id: 'q-iseem-fill3-006',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 4,
    stem: 'A rectangle has length 8 cm and width 5 cm. What is its area?',
    choices: ['13 cm²', '26 cm²', '40 cm²', '80 cm²'],
    answer: 2,
    explanation: 'Area = length × width = 8 × 5 = 40 cm². (A) 13 adds the dimensions; (B) 26 is the perimeter; (D) 80 doubles the correct answer.'
  },
  {
    id: 'q-iseem-fill3-007',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 4,
    stem: 'The mean of 12, 16, 19, and 23 is:',
    choices: ['70', '15', '17', '17.5'],
    answer: 3,
    explanation: 'Sum = 12 + 16 + 19 + 23 = 70. Mean = 70 ÷ 4 = 17.5. (A) 70 is the sum; (B) 15 is just one value; (C) 17 truncates the decimal; (D) 17.5 is correct.'
  },
  {
    id: 'q-iseem-fill3-008',
    section: 'math',
    topic: 'probability',
    difficulty: 3,
    stem: 'A bag has 3 red, 5 blue, and 2 green marbles. What is the probability of drawing a blue marble?',
    choices: ['\\frac{1}{2}', '\\frac{3}{10}', '\\frac{5}{10}', '\\frac{2}{10}'],
    answer: 0,
    explanation: 'Total marbles = 10. P(blue) = 5/10 = 1/2. (B) 3/10 is P(red); (C) 5/10 is unsimplified; (D) 2/10 is P(green).'
  },
  {
    id: 'q-iseem-fill3-009',
    section: 'math',
    topic: 'ratio',
    difficulty: 5,
    stem: 'The ratio of cats to dogs at a shelter is 3:5. If there are 24 animals total, how many are cats?',
    choices: ['9', '15', '12', '8'],
    answer: 0,
    explanation: 'Total parts = 3 + 5 = 8. Each part = 24 ÷ 8 = 3. Cats = 3 × 3 = 9. (B) 15 is the dogs count; (C) 12 splits evenly; (D) 8 is the parts total.'
  },
  {
    id: 'q-iseem-fill3-010',
    section: 'math',
    topic: 'place-value',
    difficulty: 3,
    stem: 'In the number 7,348.56, what digit is in the hundredths place?',
    choices: ['3', '5', '6', '8'],
    answer: 2,
    explanation: 'After the decimal, the first digit (5) is tenths and the second digit (6) is hundredths. (A) 3 is in the hundreds place; (B) 5 is tenths; (D) 8 is ones.'
  },
  {
    id: 'q-iseem-fill3-011',
    section: 'math',
    topic: 'geometry-perimeter',
    difficulty: 5,
    stem: 'A square has an area of 49 cm². What is its perimeter?',
    choices: ['7 cm', '14 cm', '21 cm', '28 cm'],
    answer: 3,
    explanation: 'Side length = √49 = 7 cm. Perimeter = 4 × 7 = 28 cm. (A) 7 is just one side; (B) 14 is two sides; (C) 21 is three sides.'
  },
  {
    id: 'q-iseem-fill3-012',
    section: 'math',
    topic: 'exponents',
    difficulty: 5,
    stem: 'What is 2³ × 2⁴?',
    choices: ['2⁷', '2¹²', '4⁷', '2¹'],
    answer: 0,
    explanation: 'When multiplying same bases, add exponents: 2^(3+4) = 2⁷. (B) 2¹² multiplies exponents; (C) 4⁷ multiplies bases too; (D) 2¹ subtracts exponents.'
  },
  {
    id: 'q-iseem-fill3-013',
    section: 'math',
    topic: 'fractions',
    difficulty: 5,
    stem: 'Which fraction is equivalent to 0.375?',
    choices: ['\\frac{3}{4}', '\\frac{3}{5}', '\\frac{3}{8}', '\\frac{5}{8}'],
    answer: 2,
    explanation: '0.375 = 375/1000 = 3/8 (divide by 125). Check: 3 ÷ 8 = 0.375. (A) 3/4 = 0.75; (B) 3/5 = 0.6; (D) 5/8 = 0.625.'
  },
  {
    id: 'q-iseem-fill3-014',
    section: 'math',
    topic: 'word-problem',
    difficulty: 7,
    stem: 'Sarah has $48. She spends 1/3 on a book and 1/4 of what remains on lunch. How much does she have left?',
    choices: ['$24', '$20', '$16', '$32'],
    answer: 0,
    explanation: 'Book: 48 × 1/3 = $16. Remains: 48 - 16 = $32. Lunch: 32 × 1/4 = $8. Left: 32 - 8 = $24. (B) $20 takes 1/4 of a wrong base; (C) $16 is what she spent on the book; (D) $32 forgets the lunch deduction.'
  },
  {
    id: 'q-iseem-fill3-015',
    section: 'math',
    topic: 'geometry-angles',
    difficulty: 4,
    stem: 'Two angles are supplementary. One measures 67°. What is the measure of the other?',
    choices: ['23°', '33°', '293°', '113°'],
    answer: 3,
    explanation: 'Supplementary angles sum to 180°. 180 - 67 = 113°. (A) 23° is the complement; (B) 33° subtracts wrong; (C) 293° uses 360° instead.'
  },
  {
    id: 'q-iseem-fill3-016',
    section: 'math',
    topic: 'rate-problem',
    difficulty: 5,
    stem: 'A car travels 180 miles in 3 hours. At this rate, how far will it travel in 5 hours?',
    choices: ['300 mi', '240 mi', '360 mi', '540 mi'],
    answer: 0,
    explanation: 'Rate = 180/3 = 60 mph. Distance in 5 hours = 60 × 5 = 300 miles. (B) 240 adds 60 only once; (C) 360 uses 6 hours; (D) 540 multiplies 180 × 3.'
  },
  {
    id: 'q-iseem-fill3-017',
    section: 'math',
    topic: 'median',
    difficulty: 5,
    stem: 'Find the median of: 4, 9, 2, 7, 5, 11, 6.',
    choices: ['5', '7', '9', '6'],
    answer: 3,
    explanation: 'Sort: 2, 4, 5, 6, 7, 9, 11. Median is the middle value = 6. (A) 5 is one below; (B) 7 is one above; (C) 9 is the second-highest.'
  },
  {
    id: 'q-iseem-fill3-018',
    section: 'math',
    topic: 'inequalities',
    difficulty: 5,
    stem: 'Solve for x: 2x - 5 < 11',
    choices: ['x < 3', 'x > 8', 'x < 8', 'x < 16'],
    answer: 2,
    explanation: 'Add 5: 2x < 16. Divide by 2: x < 8. (A) x < 3 subtracts wrong; (B) x > 8 flips the sign incorrectly; (D) x < 16 forgets to divide.'
  },
  {
    id: 'q-iseem-fill3-019',
    section: 'math',
    topic: 'number-sense',
    difficulty: 4,
    stem: 'Which of the following is a prime number?',
    choices: ['21', '27', '29', '33'],
    answer: 2,
    explanation: '29 has no divisors other than 1 and itself. (A) 21 = 3 × 7; (B) 27 = 3³; (D) 33 = 3 × 11.'
  },
  {
    id: 'q-iseem-fill3-020',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 6,
    stem: 'What is the slope of the line passing through (2, 3) and (6, 11)?',
    choices: ['2', '\\frac{1}{2}', '4', '8'],
    answer: 0,
    explanation: 'Slope = (11 - 3)/(6 - 2) = 8/4 = 2. (B) 1/2 inverts the formula; (C) 4 uses only the run; (D) 8 uses only the rise.'
  },
  {
    id: 'q-iseem-fill3-021',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 4,
    stem: 'A rectangular prism has dimensions 4 cm × 3 cm × 5 cm. What is its volume?',
    choices: ['12 cm³', '47 cm³', '94 cm³', '60 cm³'],
    answer: 3,
    explanation: 'V = l × w × h = 4 × 3 × 5 = 60 cm³. (A) 12 multiplies only two dimensions; (B) 47 is half the surface area; (C) 94 is the surface area.'
  },
  {
    id: 'q-iseem-fill3-022',
    section: 'math',
    topic: 'sequences',
    difficulty: 7,
    stem: 'What is the next term in the sequence: 3, 7, 15, 31, ___?',
    choices: ['63', '47', '55', '62'],
    answer: 0,
    explanation: 'Each term doubles and adds 1: 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63. (B) 47 adds 16; (C) 55 mismatches the rule; (D) 62 doubles only.'
  },
  {
    id: 'q-iseem-fill3-023',
    section: 'math',
    topic: 'percentage',
    difficulty: 5,
    stem: 'A shirt costs $40. After a 15% discount, what is the sale price?',
    choices: ['$25', '$36', '$46', '$34'],
    answer: 3,
    explanation: 'Discount = 40 × 0.15 = $6. Sale price = 40 - 6 = $34. (A) $25 subtracts $15; (B) $36 uses 10% off; (C) $46 adds the markup.'
  },
  {
    id: 'q-iseem-fill3-024',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 5,
    stem: 'If 4(x - 3) = 20, what is x?',
    choices: ['2', '5', '8', '11'],
    answer: 2,
    explanation: 'Divide by 4: x - 3 = 5. Add 3: x = 8. (A) 2 subtracts 3 instead of adding; (B) 5 forgets the +3; (D) 11 uses 4x = 20 + 3 + 12.'
  },
  {
    id: 'q-iseem-fill3-025',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 5,
    stem: 'A circle has a radius of 5 cm. What is its circumference? (Use π ≈ 3.14)',
    choices: ['15.7 cm', '78.5 cm', '31.4 cm', '25 cm'],
    answer: 2,
    explanation: 'C = 2πr = 2 × 3.14 × 5 = 31.4 cm. (A) 15.7 uses πr only; (B) 78.5 is the area; (D) 25 ignores π.'
  },
  {
    id: 'q-iseem-fill3-026',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 5,
    stem: 'What is 2/3 ÷ 4/9?',
    choices: ['\\frac{8}{27}', '\\frac{6}{9}', '\\frac{1}{3}', '\\frac{3}{2}'],
    answer: 3,
    explanation: 'Divide by reciprocal: 2/3 × 9/4 = 18/12 = 3/2. (A) 8/27 multiplies straight across; (B) 6/9 averages; (C) 1/3 cancels incorrectly.'
  },
  {
    id: 'q-iseem-fill3-027',
    section: 'math',
    topic: 'ratio',
    difficulty: 5,
    stem: 'If 3 pencils cost $1.20, how much do 8 pencils cost?',
    choices: ['$2.40', '$3.20', '$3.60', '$4.80'],
    answer: 1,
    explanation: 'Per pencil: $1.20 ÷ 3 = $0.40. For 8: 0.40 × 8 = $3.20. (A) $2.40 doubles 3 pencils; (C) $3.60 uses 9 pencils; (D) $4.80 multiplies $1.20 × 4.'
  },
  {
    id: 'q-iseem-fill3-028',
    section: 'math',
    topic: 'word-problem',
    difficulty: 5,
    stem: 'A bus leaves at 9:45 AM and arrives at 1:20 PM. How long is the trip?',
    choices: ['3 h 35 min', '4 h 35 min', '3 h 25 min', '4 h 25 min'],
    answer: 0,
    explanation: 'From 9:45 AM to 12:45 PM is 3 hours. From 12:45 PM to 1:20 PM is 35 minutes. Total = 3 h 35 min. (B) 4 h 35 min over-counts an hour; (C) 3 h 25 min subtracts wrong; (D) 4 h 25 min uses 9:45 to 2:10.'
  },
  {
    id: 'q-iseem-fill3-029',
    section: 'math',
    topic: 'exponents',
    difficulty: 5,
    stem: 'Simplify: (3²)³',
    choices: ['3⁵', '9⁵', '27³', '3⁶'],
    answer: 3,
    explanation: 'Power of a power: multiply exponents. 3^(2×3) = 3⁶. (A) 3⁵ adds exponents; (B) 9⁵ mixes operations; (C) 27³ rewrites without simplifying — it equals 3⁹, not 3⁶.'
  },
  {
    id: 'q-iseem-fill3-030',
    section: 'math',
    topic: 'range',
    difficulty: 5,
    stem: 'What is the range of: 14, 8, 22, 19, 5, 27, 11?',
    choices: ['15', '14', '22', '32'],
    answer: 2,
    explanation: 'Range = max - min = 27 - 5 = 22. (A) 15 mis-subtracts; (B) 14 is one of the values; (D) 32 adds instead of subtracts.'
  },
  {
    id: 'q-iseem-fill3-031',
    section: 'math',
    topic: 'percentage',
    difficulty: 7,
    stem: 'A number is increased by 20%, then decreased by 20%. The final number is what percent of the original?',
    choices: ['100%', '96%', '104%', '80%'],
    answer: 1,
    explanation: 'Let original = 100. After +20%: 120. After -20% of 120: 120 - 24 = 96. So final/original = 96%. (A) 100% incorrectly assumes the operations cancel; (C) 104% reverses the order of effects; (D) 80% subtracts 20 from 100.'
  },
  {
    id: 'q-iseem-fill3-032',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 5,
    stem: 'If 2x + 3y = 12 and y = 2, what is x?',
    choices: ['3', '6', '4', '9'],
    answer: 0,
    explanation: 'Substitute: 2x + 3(2) = 12. 2x + 6 = 12. 2x = 6. x = 3. (B) 6 forgets to divide; (C) 4 splits 12 - 4 wrong; (D) 9 ignores the y term.'
  },
  {
    id: 'q-iseem-fill3-033',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 7,
    stem: 'A triangle has a base of 12 cm and a height of 9 cm. What is its area?',
    choices: ['108 cm²', '21 cm²', '42 cm²', '54 cm²'],
    answer: 3,
    explanation: 'A = (1/2) × b × h = (1/2)(12)(9) = 54 cm². (A) 108 forgets the 1/2; (B) 21 adds the dimensions; (C) 42 confuses with perimeter-style calculation.'
  },
  {
    id: 'q-iseem-fill3-034',
    section: 'math',
    topic: 'probability',
    difficulty: 6,
    stem: 'A fair six-sided die is rolled twice. What is the probability of getting a 4 on both rolls?',
    choices: ['\\frac{1}{6}', '\\frac{1}{12}', '\\frac{1}{36}', '\\frac{2}{6}'],
    answer: 2,
    explanation: 'Independent events: P(4) × P(4) = (1/6)(1/6) = 1/36. (A) 1/6 is one roll only; (B) 1/12 uses 6 × 2; (D) 2/6 adds probabilities.'
  },
  {
    id: 'q-iseem-fill3-035',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 6,
    stem: 'A circle has area 36π square units. What is its diameter?',
    choices: ['6', '12', '18', '36'],
    answer: 1,
    explanation: 'A = πr² → 36π = πr² → r² = 36 → r = 6. Diameter = 2r = 12. (A) 6 is the radius; (C) 18 multiplies r × 3; (D) 36 is r².'
  },
  {
    id: 'q-iseem-fill3-036',
    section: 'math',
    topic: 'word-problem',
    difficulty: 5,
    stem: 'Two trains leave the same station traveling in opposite directions. One travels at 50 mph, the other at 60 mph. How far apart are they after 3 hours?',
    choices: ['110 mi', '180 mi', '330 mi', '150 mi'],
    answer: 2,
    explanation: 'Combined speed = 50 + 60 = 110 mph. Distance apart = 110 × 3 = 330 mi. (A) 110 is just the combined speed; (B) 180 uses 60 mph alone; (D) 150 uses 50 mph alone.'
  },
  {
    id: 'q-iseem-fill3-037',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 6,
    stem: 'What is the distance between points (1, 2) and (4, 6)?',
    choices: ['3', '7', '25', '5'],
    answer: 3,
    explanation: 'Distance = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5. (A) 3 is just the x-difference; (B) 7 sums the differences; (C) 25 forgets the square root.'
  },
  {
    id: 'q-iseem-fill3-038',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 6,
    stem: 'The average of 4 numbers is 18. If three of the numbers are 15, 20, and 22, what is the fourth?',
    choices: ['15', '17', '21', '11'],
    answer: 0,
    explanation: 'Sum needed = 18 × 4 = 72. Sum of three = 15 + 20 + 22 = 57. Fourth = 72 - 57 = 15. (B) 17 averages incorrectly; (C) 21 over-estimates; (D) 11 subtracts wrong.'
  },
  {
    id: 'q-iseem-fill3-039',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 7,
    stem: 'Simplify: (1/2 + 1/3) ÷ (1/2 - 1/3)',
    choices: ['1', '5', '\\frac{5}{6}', '\\frac{6}{5}'],
    answer: 1,
    explanation: 'Numerator: 1/2 + 1/3 = 5/6. Denominator: 1/2 - 1/3 = 1/6. Divide: (5/6) ÷ (1/6) = (5/6)(6/1) = 5. (A) 1 cancels incorrectly; (C) 5/6 is just the numerator; (D) 6/5 inverts.'
  },
  {
    id: 'q-iseem-fill3-040',
    section: 'math',
    topic: 'geometry-angles',
    difficulty: 4,
    stem: 'In a triangle, two angles measure 45° and 65°. What is the third angle?',
    choices: ['70°', '110°', '90°', '80°'],
    answer: 0,
    explanation: 'Triangle angles sum to 180°. 180 - 45 - 65 = 70°. (B) 110 adds the two given angles; (C) 90 assumes a right triangle; (D) 80 subtracts wrong.'
  },
  {
    id: 'q-iseem-fill3-041',
    section: 'math',
    topic: 'quadratics',
    difficulty: 6,
    stem: 'If x² - 5x + 6 = 0, which of these is a solution?',
    choices: ['x = 1', 'x = 5', 'x = 6', 'x = 2'],
    answer: 3,
    explanation: 'Factor: (x - 2)(x - 3) = 0. Solutions: x = 2 or x = 3. Only x = 2 appears. (A) x = 1: 1 - 5 + 6 = 2 ≠ 0; (B) x = 5: 25 - 25 + 6 = 6 ≠ 0; (C) x = 6: 36 - 30 + 6 = 12 ≠ 0.'
  },
  {
    id: 'q-iseem-fill3-042',
    section: 'math',
    topic: 'percentage',
    difficulty: 6,
    stem: 'A jacket originally priced at $80 is on sale for $60. What is the percent decrease?',
    choices: ['20%', '25%', '33%', '75%'],
    answer: 1,
    explanation: 'Decrease = 80 - 60 = $20. Percent decrease = 20/80 = 0.25 = 25%. (A) 20% uses the dollar amount as percent; (C) 33% uses 20/60 (incorrect base); (D) 75% is the ratio of new to old.'
  },
  {
    id: 'q-iseem-fill3-043',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 8,
    stem: 'A cube has a surface area of 96 cm². What is its volume?',
    choices: ['16 cm³', '64 cm³', '48 cm³', '96 cm³'],
    answer: 1,
    explanation: 'Surface area = 6s² → 96 = 6s² → s² = 16 → s = 4. Volume = s³ = 64 cm³. (A) 16 is s²; (C) 48 is half the surface area; (D) 96 is the surface area.'
  },
  {
    id: 'q-iseem-fill3-044',
    section: 'math',
    topic: 'rate-problem',
    difficulty: 8,
    stem: 'Working alone, Alex can paint a fence in 6 hours. Working alone, Sam can paint it in 3 hours. How long if they work together?',
    choices: ['2 hours', '4.5 hours', '9 hours', '1.5 hours'],
    answer: 0,
    explanation: 'Combined rate = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2 fence per hour. Time = 1 ÷ (1/2) = 2 hours. (B) 4.5 averages times; (C) 9 adds times; (D) 1.5 halves the lower time.'
  },
  {
    id: 'q-iseem-fill3-045',
    section: 'math',
    topic: 'sequences',
    difficulty: 6,
    stem: 'In the arithmetic sequence 5, 11, 17, 23, ..., what is the 20th term?',
    choices: ['113', '119', '125', '105'],
    answer: 1,
    explanation: 'First term a = 5, common difference d = 6. nth term = a + (n-1)d = 5 + 19 × 6 = 5 + 114 = 119. (A) 113 uses 18d; (C) 125 uses 20d; (D) 105 uses (n-1)·d only without a.'
  },
  {
    id: 'q-iseem-fill3-046',
    section: 'math',
    topic: 'inequalities',
    difficulty: 6,
    stem: 'Solve for x: -3x + 4 ≥ 13',
    choices: ['x ≥ -3', 'x ≤ -3', 'x ≥ 3', 'x ≤ 3'],
    answer: 1,
    explanation: 'Subtract 4: -3x ≥ 9. Divide by -3 and flip: x ≤ -3. (A) x ≥ -3 forgets to flip; (C) x ≥ 3 forgets the negative; (D) x ≤ 3 forgets the negative on x.'
  },
  {
    id: 'q-iseem-fill3-047',
    section: 'math',
    topic: 'quadratics',
    difficulty: 9,
    stem: 'If x + 1/x = 4, what is x² + 1/x²?',
    choices: ['16', '14', '18', '15'],
    answer: 1,
    explanation: 'Square both sides: (x + 1/x)² = 16, so x² + 2 + 1/x² = 16. Therefore x² + 1/x² = 14. (A) 16 forgets to subtract 2; (C) 18 adds 2 instead of subtracting; (D) 15 subtracts 1.'
  },
  {
    id: 'q-iseem-fill3-048',
    section: 'math',
    topic: 'geometry-circle',
    difficulty: 8,
    stem: 'A square is inscribed in a circle with radius 5. What is the area of the square?',
    choices: ['25', '50', '100', '75'],
    answer: 1,
    explanation: 'Diagonal of square = diameter = 10. For a square, diagonal = s√2, so s = 10/√2. Area = s² = 100/2 = 50. (A) 25 uses radius²; (C) 100 uses diameter²; (D) 75 is unrelated.'
  },
  {
    id: 'q-iseem-fill3-049',
    section: 'math',
    topic: 'word-problem',
    difficulty: 8,
    stem: 'A mixture is 40% salt. How much pure water must be added to 20 liters of mixture so that the result is 25% salt?',
    choices: ['8 L', '10 L', '12 L', '15 L'],
    answer: 2,
    explanation: 'Salt amount = 0.40 × 20 = 8 L. Let x = water added. New equation: 8/(20+x) = 0.25. So 8 = 0.25(20+x) = 5 + 0.25x → 3 = 0.25x → x = 12 L. (A) 8 L is the salt amount; (B) 10 L uses wrong target; (D) 15 L over-dilutes to 8/35.'
  },
  {
    id: 'q-iseem-fill3-050',
    section: 'math',
    topic: 'probability',
    difficulty: 7,
    stem: 'A bag contains 4 red and 6 blue marbles. Two marbles are drawn without replacement. What is the probability both are red?',
    choices: ['\\frac{2}{15}', '\\frac{4}{25}', '\\frac{1}{6}', '\\frac{6}{25}'],
    answer: 0,
    explanation: 'P(first red) = 4/10 = 2/5. P(second red | first red) = 3/9 = 1/3. P(both red) = (2/5)(1/3) = 2/15. (B) 4/25 uses replacement (4/10)²; (C) 1/6 mis-cancels; (D) 6/25 confuses red and blue probabilities.'
  }
]);
