/**
 * SSAT Math — fill batch (40 more questions across 17 topics) to
 * expand the existing 60-question Quantitative bank.  5-choice format.
 *
 * testType: 'SSAT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'math'
 *
 * Difficulty tiers (SSAT 500-800):
 *   easy  ≤600       (8 questions)
 *   medium 610-680  (16 questions)
 *   hard  690-750  (12 questions)
 *   insane 760+     (4 questions)
 *
 * Answer index spread (target ~8 each across A/B/C/D/E):
 *   A=8, B=8, C=8, D=8, E=8
 *
 * Concatenates onto window.STL_QUESTIONS_SSAT.
 */
'use strict';

window.STL_QUESTIONS_SSAT = (window.STL_QUESTIONS_SSAT || []).concat([

  /* ================================================================ *
   * algebra-linear · 3 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-001',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 580,
    stem: 'If 4x − 7 = 21, what is the value of x?',
    choices: ['7', '5', '6', '14', '3.5'],
    answer: 0,
    explanation: 'Add 7 to both sides: 4x = 28. Divide by 4: x = 7. (B) 5 = (21 − 7)/? sloppy. (C) 6 = 21/? error. (D) 14 = 28/2 (divided by 2 instead of 4). (E) 3.5 = 14/4 (combined two errors).',
  },
  {
    id: 'q-ssatm-fill-002',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 660,
    stem: 'If 2(x + 3) = 5x − 9, what is x?',
    choices: ['1', '3', '5', '−5', '15'],
    answer: 2,
    explanation: 'Distribute: 2x + 6 = 5x − 9. Subtract 2x: 6 = 3x − 9. Add 9: 15 = 3x, so x = 5. (A) 1 = forgot to distribute the 2 to the 3. (B) 3 = sign slip on the −9. (D) −5 = sign error when isolating x. (E) 15 = stopped at 3x = 15 without dividing.',
  },
  {
    id: 'q-ssatm-fill-003',
    section: 'math',
    topic: 'algebra-linear',
    difficulty: 720,
    stem: 'If \\frac{x + 2}{3} = \\frac{x − 4}{2}, what is x?',
    choices: ['8', '−16', '4', '−8', '16'],
    answer: 4,
    explanation: 'Cross-multiply: 2(x + 2) = 3(x − 4) → 2x + 4 = 3x − 12. Subtract 2x: 4 = x − 12. Add 12: x = 16. (A) 8 = halved the answer. (B) −16 = sign flip throughout. (C) 4 = stopped at 4 = x − 12. (D) −8 = sign error after distributing.',
  },

  /* ================================================================ *
   * exponents · 3 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-004',
    section: 'math',
    topic: 'exponents',
    difficulty: 590,
    stem: 'What is the value of 2³ · 2²?',
    choices: ['16', '32', '64', '10', '8'],
    answer: 1,
    explanation: 'Same base: add exponents. 2³ · 2² = 2⁵ = 32. (A) 16 = 2⁴ (multiplied exponents and dropped one). (C) 64 = 2⁶ (multiplied 3·2 to get exponent). (D) 10 = 8 + 2 (added the values). (E) 8 = 2³ only (forgot the 2² factor).',
  },
  {
    id: 'q-ssatm-fill-005',
    section: 'math',
    topic: 'exponents',
    difficulty: 670,
    stem: 'What is the value of (3²)³?',
    choices: ['81', '243', '27', '729', '9'],
    answer: 3,
    explanation: 'Power of a power: multiply exponents. (3²)³ = 3⁶ = 729. (A) 81 = 3⁴ (added 2 + 3 instead of multiplying, then ·? error). (B) 243 = 3⁵ (added exponents). (C) 27 = 3³ (used only the outer exponent). (E) 9 = 3² (used only the inner exponent).',
  },
  {
    id: 'q-ssatm-fill-006',
    section: 'math',
    topic: 'exponents',
    difficulty: 730,
    stem: 'If 2ⁿ = 64, what is the value of 2ⁿ⁻²?',
    choices: ['16', '32', '8', '62', '4'],
    answer: 0,
    explanation: '2ⁿ = 64 = 2⁶, so n = 6. Then 2ⁿ⁻² = 2⁴ = 16. (B) 32 = 2⁵ (only subtracted 1 from the exponent). (C) 8 = 2³ (subtracted 3 from exponent). (D) 62 = 64 − 2 (subtracted 2 from the value, not the exponent). (E) 4 = 2² (used n − 2 as the answer instead of as the exponent).',
  },

  /* ================================================================ *
   * fractions-arithmetic · 3 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-007',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 570,
    stem: 'What is 2/3 + 1/4?',
    choices: ['\\frac{3}{7}', '\\frac{1}{2}', '\\frac{11}{12}', '\\frac{3}{12}', '\\frac{8}{12}'],
    answer: 2,
    explanation: 'Common denominator 12: 2/3 = 8/12 and 1/4 = 3/12. Sum = 11/12. (A) 3/7 = added numerators and denominators. (B) 1/2 = guessed simplification. (D) 3/12 = added only the 1/4 expression. (E) 8/12 = forgot to add 1/4.',
  },
  {
    id: 'q-ssatm-fill-008',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 650,
    stem: 'What is 3/5 ÷ 2/3?',
    choices: ['\\frac{6}{15}', '\\frac{2}{5}', '\\frac{5}{6}', '\\frac{15}{6}', '\\frac{9}{10}'],
    answer: 4,
    explanation: 'Dividing by a fraction = multiply by its reciprocal: 3/5 · 3/2 = 9/10. (A) 6/15 = 3/5 · 2/3 (multiplied without flipping). (B) 2/5 = 3/5 − 1/5 random subtraction. (C) 5/6 = flipped the wrong fraction (used 5/3 · ? mix-up). (D) 15/6 = 5/2 · 3/1 (flipped both fractions).',
  },
  {
    id: 'q-ssatm-fill-009',
    section: 'math',
    topic: 'fractions-arithmetic',
    difficulty: 710,
    stem: 'What is (1 1/2) · (2/3) + 1/4?',
    choices: ['\\frac{3}{4}', '\\frac{5}{4}', '1', '\\frac{7}{12}', '\\frac{13}{12}'],
    answer: 1,
    explanation: '1 1/2 = 3/2. Then 3/2 · 2/3 = 1. Add 1/4: 1 + 1/4 = 5/4. (A) 3/4 = subtracted 1/4 instead of adding. (C) 1 = stopped before adding 1/4. (D) 7/12 = 1/3 + 1/4 (used 1/3 for 3/2·2/3 by error). (E) 13/12 = 3/4 + 1/3 (mismatched numerators).',
  },

  /* ================================================================ *
   * geometry-area · 3 questions (incl. 1 insane)
   * ================================================================ */
  {
    id: 'q-ssatm-fill-010',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 600,
    stem: 'A triangle has a base of 10 and a height of 6. What is its area?',
    choices: ['60', '16', '32', '30', '20'],
    answer: 3,
    explanation: 'Area of a triangle = (1/2) · base · height = (1/2)(10)(6) = 30. (A) 60 = base · height (forgot the 1/2). (B) 16 = base + height. (C) 32 = 2(base + height) (perimeter-style mix-up). (E) 20 = (1/2)(base + height)·? incorrect formula.',
  },
  {
    id: 'q-ssatm-fill-011',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 660,
    stem: 'The area of a square is 49 square inches. What is the length of one side?',
    choices: ['7 in', '24.5 in', '14 in', '12.25 in', '49 in'],
    answer: 0,
    explanation: 'For a square, area = side². So side = √49 = 7 inches. (B) 24.5 = 49/2 (divided area in half). (C) 14 = 2·7 (doubled the side). (D) 12.25 = 49/4 (divided by 4). (E) 49 = used the area as the side length.',
  },
  {
    id: 'q-ssatm-fill-012',
    section: 'math',
    topic: 'geometry-area',
    difficulty: 770,
    stem: 'A rectangular garden is 12 ft by 8 ft. A 2-ft-wide path is built around the outside of the garden. What is the area of the path alone?',
    choices: ['96 sq ft', '40 sq ft', '96 sq ft (path)', '88 sq ft', '64 sq ft'],
    answer: 3,
    explanation: 'Outer rectangle: (12 + 2·2) by (8 + 2·2) = 16 by 12, area = 192. Inner garden area = 12·8 = 96. Path area = 192 − 96 = 88. (A) 96 sq ft = inner garden area only. (B) 40 = 4 corner squares + something incorrect. (C) 96 (path) = labeled the garden area as path. (E) 64 = (16 − 8)·8 partial slice only.',
  },

  /* ================================================================ *
   * geometry-perimeter · 2 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-013',
    section: 'math',
    topic: 'geometry-perimeter',
    difficulty: 640,
    stem: 'A regular hexagon has a perimeter of 48 cm. What is the length of one side?',
    choices: ['6 cm', '8 cm', '12 cm', '4 cm', '16 cm'],
    answer: 1,
    explanation: 'A regular hexagon has 6 equal sides. Side = 48/6 = 8 cm. (A) 6 cm = used the number of sides as the answer. (C) 12 = 48/4 (treated it as a square). (D) 4 = 48/12 (used 12 sides). (E) 16 = 48/3 (used 3 sides).',
  },
  {
    id: 'q-ssatm-fill-014',
    section: 'math',
    topic: 'geometry-perimeter',
    difficulty: 720,
    stem: 'The length of a rectangle is 3 more than twice its width. If the perimeter is 36 inches, what is the width?',
    choices: ['10 in', '15 in', '6 in', '5 in', '8 in'],
    answer: 3,
    explanation: 'Let w = width; length = 2w + 3. Perimeter = 2(w) + 2(2w + 3) = 6w + 6 = 36. So 6w = 30, w = 5. (A) 10 = solved for length without subtracting 3. (B) 15 = 36 ÷ ? misuse. (C) 6 = 36/6 (forgot the +6). (E) 8 = used length 2w + 3 with w = 5/2 then misapplied.',
  },

  /* ================================================================ *
   * geometry-volume · 3 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-015',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 590,
    stem: 'A rectangular box is 5 cm long, 4 cm wide, and 3 cm tall. What is its volume?',
    choices: ['12 cm³', '47 cm³', '94 cm³', '20 cm³', '60 cm³'],
    answer: 4,
    explanation: 'Volume = l·w·h = 5·4·3 = 60 cm³. (A) 12 = 4·3 (only two dimensions). (B) 47 = surface area of one face computation error. (C) 94 = surface area = 2(20 + 15 + 12) (computed surface area instead). (D) 20 = 5·4 (only two dimensions).',
  },
  {
    id: 'q-ssatm-fill-016',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 670,
    stem: 'A cube has a volume of 125 cubic inches. What is the length of one edge?',
    choices: ['25 in', '12.5 in', '5 in', '15 in', '√125 in'],
    answer: 2,
    explanation: 'For a cube, volume = edge³. So edge = ∛125 = 5 inches (since 5·5·5 = 125). (A) 25 = √125 rounded or used square root instead. (B) 12.5 = 125/10. (D) 15 = 125/? slip. (E) √125 = took square root instead of cube root.',
  },
  {
    id: 'q-ssatm-fill-017',
    section: 'math',
    topic: 'geometry-volume',
    difficulty: 740,
    stem: 'A rectangular tank has a base of 8 ft by 5 ft and is filled with water to a depth of 3 ft. If 1 cubic foot of water = 7.5 gallons, how many gallons of water are in the tank?',
    choices: ['900', '120', '450', '40', '600'],
    answer: 0,
    explanation: 'Volume = 8·5·3 = 120 cubic ft. Gallons = 120·7.5 = 900. (B) 120 = stopped at cubic feet. (C) 450 = 60·7.5 (used 6·5·? wrong base area). (D) 40 = 8·5 only (skipped depth). (E) 600 = 80·7.5 (used 80 cubic ft).',
  },

  /* ================================================================ *
   * coordinate-geometry · 2 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-018',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 660,
    stem: 'What is the slope of the line through the points (2, 5) and (6, 13)?',
    choices: ['\\frac{1}{2}', '4', '−2', '2', '8'],
    answer: 3,
    explanation: 'Slope = (y₂ − y₁)/(x₂ − x₁) = (13 − 5)/(6 − 2) = 8/4 = 2. (A) 1/2 = inverted (used Δx/Δy). (B) 4 = used Δx only. (C) −2 = sign error subtracting in wrong order. (E) 8 = used Δy only.',
  },
  {
    id: 'q-ssatm-fill-019',
    section: 'math',
    topic: 'coordinate-geometry',
    difficulty: 720,
    stem: 'What is the distance between the points (1, 2) and (4, 6)?',
    choices: ['7', '√7', '25', '√25', '5'],
    answer: 4,
    explanation: 'Distance = √((4−1)² + (6−2)²) = √(9 + 16) = √25 = 5. (A) 7 = 3 + 4 (added legs without squaring). (B) √7 = √(4 − ?) sign error inside the radical. (C) 25 = forgot to take the square root. (D) √25 = unsimplified — equal in value to 5 but the simplified answer is 5.',
  },

  /* ================================================================ *
   * mean-statistics · 3 questions (incl. 1 insane)
   * ================================================================ */
  {
    id: 'q-ssatm-fill-020',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 580,
    stem: 'What is the average (mean) of 4, 8, 10, and 14?',
    choices: ['9', '10', '36', '8', '7'],
    answer: 0,
    explanation: 'Sum = 4 + 8 + 10 + 14 = 36. Mean = 36/4 = 9. (B) 10 = the median (between 8 and 10 estimated). (C) 36 = the sum (forgot to divide). (D) 8 = picked a value from the list. (E) 7 = 36/? slip with 5 numbers.',
  },
  {
    id: 'q-ssatm-fill-021',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 660,
    stem: 'The average of 5 numbers is 12. If one of the numbers is removed and the average of the remaining 4 is 10, what number was removed?',
    choices: ['2', '20', '14', '22', '60'],
    answer: 1,
    explanation: 'Sum of all 5 = 5·12 = 60. Sum of remaining 4 = 4·10 = 40. Removed number = 60 − 40 = 20. (A) 2 = 12 − 10 (subtracted averages directly). (C) 14 = 12 + 2. (D) 22 = 60 − 38 (arithmetic slip). (E) 60 = total sum (forgot to subtract remaining sum).',
  },
  {
    id: 'q-ssatm-fill-022',
    section: 'math',
    topic: 'mean-statistics',
    difficulty: 760,
    stem: 'The average of three numbers is 15. The smallest is 6 and the median is 14. What is the largest?',
    choices: ['20', '24', '15', '25', '21'],
    answer: 3,
    explanation: 'Sum = 3·15 = 45. Largest = 45 − 6 − 14 = 25. (A) 20 = 14 + 6 (added smallest and median). (B) 24 = 45 − 6 − ? slip. (C) 15 = used the average as the largest. (E) 21 = 45/? wrong divisor.',
  },

  /* ================================================================ *
   * percent · 3 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-023',
    section: 'math',
    topic: 'percent',
    difficulty: 600,
    stem: 'What is 30% of 80?',
    choices: ['2.4', '240', '24', '26', '50'],
    answer: 2,
    explanation: '30% of 80 = 0.30 · 80 = 24. (A) 2.4 = 0.30 · 8 (decimal slip). (B) 240 = 30·80/10 (forgot to divide by 100). (D) 26 = 80 − 30 − 24 confusion. (E) 50 = 80 − 30 (subtracted instead of taking percent).',
  },
  {
    id: 'q-ssatm-fill-024',
    section: 'math',
    topic: 'percent',
    difficulty: 670,
    stem: 'A jacket originally priced at $80 is on sale for $60. What is the percent discount?',
    choices: ['20%', '33%', '75%', '40%', '25%'],
    answer: 4,
    explanation: 'Discount = 80 − 60 = $20. Percent discount = 20/80 = 0.25 = 25%. (A) 20% = used the dollar amount as percent. (B) 33% = 20/60 (used the sale price as the base). (C) 75% = 60/80 (the price you pay, not the discount). (D) 40% = 20·2 (random doubling).',
  },
  {
    id: 'q-ssatm-fill-025',
    section: 'math',
    topic: 'percent',
    difficulty: 700,
    stem: 'After a 20% increase, a price becomes $90. What was the original price?',
    choices: ['$72', '$75', '$70', '$108', '$110'],
    answer: 1,
    explanation: 'Let x be original. Then 1.20x = 90, so x = 90/1.2 = 75. (A) $72 = 90 − 20% of 90 = 90 − 18 (took 20% off the new price). (C) $70 = 90 − 20 (subtracted 20 directly). (D) $108 = 90·1.20 (added 20% instead of removing it). (E) $110 = 90 + 20.',
  },

  /* ================================================================ *
   * probability · 2 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-026',
    section: 'math',
    topic: 'probability',
    difficulty: 650,
    stem: 'A bag contains 3 red, 4 blue, and 5 green marbles. What is the probability of drawing a red marble at random?',
    choices: ['\\frac{1}{4}', '\\frac{3}{12}', '\\frac{3}{9}', '\\frac{1}{3}', '\\frac{4}{12}'],
    answer: 0,
    explanation: 'Total marbles = 3 + 4 + 5 = 12. P(red) = 3/12 = 1/4. (B) 3/12 = correct value but unsimplified — pick the simplified form. (C) 3/9 = used only red+blue+green minus one wrong total. (D) 1/3 = 3/9 simplified (same wrong total). (E) 4/12 = used the count of blue marbles instead.',
  },
  {
    id: 'q-ssatm-fill-027',
    section: 'math',
    topic: 'probability',
    difficulty: 730,
    stem: 'A fair coin is flipped 3 times. What is the probability of getting exactly 2 heads?',
    choices: ['\\frac{1}{2}', '\\frac{1}{4}', '\\frac{3}{8}', '\\frac{2}{3}', '\\frac{1}{8}'],
    answer: 2,
    explanation: 'There are 2³ = 8 equally likely outcomes. The arrangements with exactly 2 heads are HHT, HTH, THH — 3 outcomes. Probability = 3/8. (A) 1/2 = guessed since heads is half. (B) 1/4 = 2/8 (forgot one arrangement). (D) 2/3 = ratio of heads to total flips. (E) 1/8 = probability of one specific outcome (e.g., HHT).',
  },

  /* ================================================================ *
   * ratio · 2 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-028',
    section: 'math',
    topic: 'ratio',
    difficulty: 640,
    stem: 'In a class, the ratio of boys to girls is 3:5. If there are 24 students total, how many girls are there?',
    choices: ['9', '8', '12', '15', '5'],
    answer: 3,
    explanation: 'Total parts = 3 + 5 = 8. Each part = 24/8 = 3 students. Girls = 5·3 = 15. (A) 9 = boys (3·3). (B) 8 = total parts. (C) 12 = half of 24 (ignored ratio). (E) 5 = used the ratio number directly.',
  },
  {
    id: 'q-ssatm-fill-029',
    section: 'math',
    topic: 'ratio',
    difficulty: 710,
    stem: 'The ratio of red to blue paint in a mix is 2:7. If 14 quarts of red paint are used, how many quarts of blue paint are needed?',
    choices: ['4', '21', '7', '28', '49'],
    answer: 4,
    explanation: 'Set up 2/7 = 14/x. Cross-multiply: 2x = 98, so x = 49. (A) 4 = 14/?. (B) 21 = 14 + 7 (added the ratio number). (C) 7 = used the ratio number directly. (D) 28 = 14·2 (used the wrong scale factor).',
  },

  /* ================================================================ *
   * word-problem · 3 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-030',
    section: 'math',
    topic: 'word-problem',
    difficulty: 600,
    stem: 'Maria buys 4 notebooks at $3 each and 2 pens at $2 each. How much does she spend in total?',
    choices: ['$14', '$16', '$20', '$10', '$24'],
    answer: 1,
    explanation: 'Notebooks: 4·3 = 12. Pens: 2·2 = 4. Total = 12 + 4 = 16. (A) $14 = 12 + 2 (forgot to multiply pens). (C) $20 = 4·3 + 2·2·2 (extra pen). (D) $10 = added quantities and prices wrongly. (E) $24 = 4·3·2 (multiplied everything together).',
  },
  {
    id: 'q-ssatm-fill-031',
    section: 'math',
    topic: 'word-problem',
    difficulty: 660,
    stem: 'A train travels 180 miles in 3 hours. At the same average speed, how far will it travel in 5 hours?',
    choices: ['300 mi', '60 mi', '240 mi', '540 mi', '900 mi'],
    answer: 0,
    explanation: 'Speed = 180/3 = 60 mph. In 5 hours: 60·5 = 300 miles. (B) 60 mi = the speed in mph. (C) 240 mi = 180 + 60 (added one extra hour). (D) 540 mi = 180·3 (multiplied by original time). (E) 900 mi = 180·5 (multiplied distance by new time).',
  },
  {
    id: 'q-ssatm-fill-032',
    section: 'math',
    topic: 'word-problem',
    difficulty: 730,
    stem: 'Tom is twice as old as Sara. In 5 years, the sum of their ages will be 40. How old is Sara now?',
    choices: ['15', '20', '5', '10', '25'],
    answer: 3,
    explanation: 'Let Sara = s, Tom = 2s. In 5 years: (s + 5) + (2s + 5) = 40, so 3s + 10 = 40, 3s = 30, s = 10. (A) 15 = 10 + 5 (Sara\'s age in 5 years). (B) 20 = Tom\'s age now (2·10). (C) 5 = the “in 5 years” amount. (E) 25 = Tom\'s age in 5 years.',
  },

  /* ================================================================ *
   * decimals · 2 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-033',
    section: 'math',
    topic: 'decimals',
    difficulty: 650,
    stem: 'What is 0.4 · 0.25?',
    choices: ['1.0', '0.1', '0.01', '0.4', '0.65'],
    answer: 1,
    explanation: '4·25 = 100. Decimal places: 1 + 2 = 3, so 0.100 = 0.1. (A) 1.0 = 4·25/100 then misplaced decimal. (C) 0.01 = added one extra decimal place. (D) 0.4 = ignored the 0.25 factor. (E) 0.65 = added 0.4 + 0.25 (added instead of multiplied).',
  },
  {
    id: 'q-ssatm-fill-034',
    section: 'math',
    topic: 'decimals',
    difficulty: 720,
    stem: 'What is 7.2 ÷ 0.4?',
    choices: ['1.8', '0.18', '18', '180', '28.8'],
    answer: 2,
    explanation: 'Multiply both numerator and denominator by 10: 7.2/0.4 = 72/4 = 18. (A) 1.8 = 7.2/4 (ignored the decimal in 0.4). (B) 0.18 = decimal misplaced two places. (D) 180 = decimal misplaced one place to the right. (E) 28.8 = 7.2·4 (multiplied instead of dividing).',
  },

  /* ================================================================ *
   * number-sense · 2 questions (incl. 1 insane)
   * ================================================================ */
  {
    id: 'q-ssatm-fill-035',
    section: 'math',
    topic: 'number-sense',
    difficulty: 670,
    stem: 'Which of the following is a prime number?',
    choices: ['29', '21', '27', '33', '15'],
    answer: 0,
    explanation: '29 has no divisors other than 1 and itself, so it is prime. (B) 21 = 3·7. (C) 27 = 3³. (D) 33 = 3·11. (E) 15 = 3·5.',
  },
  {
    id: 'q-ssatm-fill-036',
    section: 'math',
    topic: 'number-sense',
    difficulty: 780,
    stem: 'What is the greatest common factor (GCF) of 84 and 126?',
    choices: ['6', '14', '21', '7', '42'],
    answer: 4,
    explanation: '84 = 2²·3·7 and 126 = 2·3²·7. GCF = 2·3·7 = 42. (A) 6 = 2·3 (missed the factor of 7). (B) 14 = 2·7 (missed the 3). (C) 21 = 3·7 (missed the 2). (D) 7 = only one common prime.',
  },

  /* ================================================================ *
   * sequences · 2 questions
   * ================================================================ */
  {
    id: 'q-ssatm-fill-037',
    section: 'math',
    topic: 'sequences',
    difficulty: 660,
    stem: 'What is the next term in the sequence 3, 7, 11, 15, ...?',
    choices: ['16', '18', '20', '19', '23'],
    answer: 3,
    explanation: 'Each term increases by 4 (arithmetic sequence). 15 + 4 = 19. (A) 16 = 15 + 1 (used wrong common difference). (B) 18 = 15 + 3 (used 3 as the difference). (C) 20 = 15 + 5. (E) 23 = skipped one term ahead (15 + 4 + 4).',
  },
  {
    id: 'q-ssatm-fill-038',
    section: 'math',
    topic: 'sequences',
    difficulty: 740,
    stem: 'In the sequence 2, 6, 18, 54, ..., what is the 6th term?',
    choices: ['162', '486', '216', '108', '648'],
    answer: 1,
    explanation: 'Geometric sequence with ratio 3. Terms: 2, 6, 18, 54, 162, 486. The 6th term is 486. (A) 162 = the 5th term. (C) 216 = 54·4 (used wrong ratio). (D) 108 = 54·2 (used wrong ratio). (E) 648 = 162·4 (used wrong ratio after correct 5th term).',
  },

  /* ================================================================ *
   * order-of-operations · 1 question
   * ================================================================ */
  {
    id: 'q-ssatm-fill-039',
    section: 'math',
    topic: 'order-of-operations',
    difficulty: 670,
    stem: 'What is the value of 12 − 3 · (4 − 2)² ÷ 6?',
    choices: ['6', '0', '4', '8', '10'],
    answer: 4,
    explanation: 'Inside parentheses: 4 − 2 = 2. Exponent: 2² = 4. Multiply/divide left to right: 3·4 = 12, then 12÷6 = 2. Subtract: 12 − 2 = 10. (A) 6 = 12 − 6. (B) 0 = (12 − 3·4) = 0 (skipped the ÷6). (C) 4 = arithmetic slip. (D) 8 = 12 − 4 (computed exponent only).',
  },

  /* ================================================================ *
   * inequalities · 1 question (insane)
   * ================================================================ */
  {
    id: 'q-ssatm-fill-040',
    section: 'math',
    topic: 'inequalities',
    difficulty: 770,
    stem: 'If −3x + 5 > 14, which of the following describes all values of x?',
    choices: ['x > −3', 'x > 3', 'x < −3', 'x < 3', 'x ≥ −3'],
    answer: 2,
    explanation: 'Subtract 5: −3x > 9. Divide by −3 and FLIP the inequality (dividing by a negative): x < −3. (A) x > −3 = forgot to flip. (B) x > 3 = sign error and forgot to flip. (D) x < 3 = sign error on the −3 result. (E) x ≥ −3 = wrong direction and used ≥ instead of strict <.',
  },

]);
