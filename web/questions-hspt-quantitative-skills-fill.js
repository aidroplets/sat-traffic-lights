/**
 * HSPT Quantitative Skills — fill batch.
 * testType: 'HSPT', section: 'quantitative-skills'.
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';
window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ===== NUMBER SERIES (10) =====
  {
    id: 'q-hsptqs-fill-001',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 470,
    stem: 'What number comes next in this series? 2, 5, 8, 11, 14, ?',
    choices: ['15', '16', '17', '18'],
    answer: 2,
    explanation: 'Arithmetic sequence: each term increases by 3. 14 + 3 = 17. Distractors: 15 (added 1), 16 (added 2), 18 (added 4).'
  },
  {
    id: 'q-hsptqs-fill-002',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 490,
    stem: 'What number comes next in this series? 1, 2, 4, 8, 16, ?',
    choices: ['24', '32', '20', '18'],
    answer: 1,
    explanation: 'Geometric sequence: each term doubles (×2). 16 × 2 = 32. Distractors: 24 (added 8), 20 (added 4), 18 (added 2).'
  },
  {
    id: 'q-hsptqs-fill-003',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 460,
    stem: 'What number comes next in this series? 50, 45, 40, 35, 30, ?',
    choices: ['28', '26', '20', '25'],
    answer: 3,
    explanation: 'Arithmetic sequence: each term decreases by 5. 30 - 5 = 25. Distractors: 28 (subtracted 2), 26 (subtracted 4), 20 (subtracted 10).'
  },
  {
    id: 'q-hsptqs-fill-004',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 580,
    stem: 'What number comes next in this series? 1, 1, 2, 3, 5, 8, ?',
    choices: ['11', '12', '13', '14'],
    answer: 2,
    explanation: 'Fibonacci: each term is the sum of the previous two. 5 + 8 = 13. Distractors: 11, 12, 14 are off-by-one or off-by-two from the correct sum.'
  },
  {
    id: 'q-hsptqs-fill-005',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 590,
    stem: 'What number comes next in this series? 3, 6, 5, 10, 9, 18, ?',
    choices: ['16', '15', '19', '17'],
    answer: 3,
    explanation: 'Alternating pattern: ×2 then -1. 3×2=6, 6-1=5, 5×2=10, 10-1=9, 9×2=18, 18-1=17. Distractors: 16 (×2-2), 15 (subtracted 3), 19 (+1 instead of -1).'
  },
  {
    id: 'q-hsptqs-fill-006',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 660,
    stem: 'What number comes next in this series? 2, 6, 12, 20, 30, ?',
    choices: ['38', '40', '42', '44'],
    answer: 2,
    explanation: 'Differences increase by 2: +4, +6, +8, +10, +12. 30 + 12 = 42. (Equivalently n(n+1).) Distractors: 38, 40 (under-incremented), 44 (over-incremented).'
  },
  {
    id: 'q-hsptqs-fill-007',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 540,
    stem: 'What number comes next in this series? 1, 4, 9, 16, 25, ?',
    choices: ['30', '32', '34', '36'],
    answer: 3,
    explanation: 'Perfect squares: 1², 2², 3², 4², 5², 6². The next is 6² = 36. Distractors: 30, 32, 34 break the perfect-square pattern.'
  },
  {
    id: 'q-hsptqs-fill-008',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 540,
    stem: 'What number comes next in this series? 80, 40, 20, 10, 5, ?',
    choices: ['2', '2.5', '3', '4'],
    answer: 1,
    explanation: 'Geometric sequence: each term is halved (÷2). 5 ÷ 2 = 2.5. Distractors: 2 (subtracted 3), 3 (subtracted 2), 4 (subtracted 1).'
  },
  {
    id: 'q-hsptqs-fill-009',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 700,
    stem: 'What number comes next in this series? 2, 3, 5, 9, 17, ?',
    choices: ['25', '31', '34', '33'],
    answer: 3,
    explanation: 'Each term doubles the previous and subtracts 1: 2×2-1=3, 3×2-1=5, 5×2-1=9, 9×2-1=17, 17×2-1=33. Distractors: 25 (added 8 only), 31 (×2-3), 34 (just doubled).'
  },
  {
    id: 'q-hsptqs-fill-010',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 740,
    stem: 'What number comes next in this series? 1, 8, 27, 64, ?',
    choices: ['100', '125', '128', '216'],
    answer: 1,
    explanation: 'Perfect cubes: 1³, 2³, 3³, 4³, 5³ = 125. Distractors: 100 (squared instead of cubed), 128 (doubled 64), 216 (skipped to 6³).'
  },

  // ===== GEOMETRIC COMPARISON (10) =====
  {
    id: 'q-hsptqs-fill-011',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 460,
    stem: 'Examine these three figures. (A) A square with side 4. (B) A rectangle 3 by 6. (C) A rectangle 2 by 7. Which figure has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'Areas: A = 4×4 = 16; B = 3×6 = 18; C = 2×7 = 14. B is greatest. Distractors: A=16 and C=14 are smaller; not all equal.'
  },
  {
    id: 'q-hsptqs-fill-012',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 480,
    stem: 'Examine these three figures. (A) A square with side 5. (B) A rectangle 4 by 7. (C) A triangle with base 10 and height 6. Which figure has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 2,
    explanation: 'Areas: A = 25; B = 28; C = (1/2)(10)(6) = 30. C is greatest. Distractors: A=25 smallest, B=28 middle, not all equal.'
  },
  {
    id: 'q-hsptqs-fill-013',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 550,
    stem: 'Examine these three figures. (A) A square with perimeter 24. (B) A rectangle 4 by 8. (C) A square with side 7. Which statement is true?',
    choices: ['A > C > B', 'A > B > C', 'A = B = C', 'C > A > B'],
    answer: 3,
    explanation: 'A: side = 6, area = 36. B: 4×8 = 32. C: 7×7 = 49. So C > A > B (49 > 36 > 32). Distractors flip the order or claim equality.'
  },
  {
    id: 'q-hsptqs-fill-014',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 560,
    stem: 'Examine these three figures. (A) A circle with radius 3. (B) A square with side 5. (C) A rectangle 4 by 7. Using π ≈ 3.14, which figure has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 0,
    explanation: 'Areas: A = π·3² ≈ 28.26; B = 25; C = 28. A is greatest (just over C). Distractors: B=25 smallest, C=28 close second, not all equal.'
  },
  {
    id: 'q-hsptqs-fill-015',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 580,
    stem: 'Examine these three figures. (A) A square with side 6. (B) A rectangle 3 by 12. (C) A rectangle 4 by 9. Which statement is true?',
    choices: ['A = B = C', 'A > B > C', 'A < B < C', 'B > A > C'],
    answer: 0,
    explanation: 'Areas: A = 36; B = 36; C = 36. All three have equal area of 36. Distractors set up false orderings.'
  },
  {
    id: 'q-hsptqs-fill-016',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 600,
    stem: 'Examine these three figures. (A) A right triangle with legs 6 and 8. (B) A rectangle 3 by 9. (C) A square with side 5. Which figure has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'Areas: A = (1/2)(6)(8) = 24; B = 3×9 = 27; C = 5×5 = 25. B is greatest. Distractors: A=24 smallest, C=25 middle, not all equal.'
  },
  {
    id: 'q-hsptqs-fill-017',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 660,
    stem: 'Examine these three figures, all with the same perimeter of 24. (A) A square. (B) A rectangle 4 by 8. (C) An equilateral triangle. Which has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 0,
    explanation: 'A: square with side 6, area = 36. B: 4×8 = 32. C: equilateral triangle with side 8, area = (√3/4)(64) ≈ 27.7. The square (A) has the greatest area — for a fixed perimeter, the square beats both rectangle and equilateral triangle here.'
  },
  {
    id: 'q-hsptqs-fill-018',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 670,
    stem: 'Examine these three figures. (A) A circle with diameter 10. (B) A square with diagonal 10. (C) A square with side 7. Using π ≈ 3.14, which has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 0,
    explanation: 'A: radius 5, area = π·25 ≈ 78.5. B: diagonal 10 → side = 10/√2 ≈ 7.07, area ≈ 50. C: 7×7 = 49. A is greatest. Distractors: B≈50 middle, C=49 smallest.'
  },
  {
    id: 'q-hsptqs-fill-019',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 690,
    stem: 'Examine these three solids. (A) A cube with side 3. (B) A rectangular box 2 by 3 by 5. (C) A rectangular box 1 by 4 by 6. Which has the greatest volume?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'Volumes: A = 3³ = 27; B = 2·3·5 = 30; C = 1·4·6 = 24. B is greatest. Distractors: A=27 middle, C=24 smallest, not all equal.'
  },
  {
    id: 'q-hsptqs-fill-020',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 750,
    stem: 'Examine these three figures. (A) A square with side x. (B) A rectangle with sides x and 2x. (C) A circle with radius x. Using π ≈ 3.14, which has the greatest area for any x > 0?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 2,
    explanation: 'Areas in terms of x²: A = x²; B = 2x²; C = πx² ≈ 3.14x². Since 3.14 > 2 > 1, the circle (C) has the greatest area for any positive x. Distractors: A is smallest, B is middle.'
  },

  // ===== NON-GEOMETRIC COMPARISON (10) =====
  {
    id: 'q-hsptqs-fill-021',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 460,
    stem: 'Compare these three quantities: (A) 0.5 × 100  (B) 1/4 × 200  (C) 25% of 200. Which statement is true?',
    choices: ['A = B = C', 'A > B > C', 'A < B < C', 'A > B and B = C'],
    answer: 0,
    explanation: 'A = 50; B = 50; C = 50. All three equal 50. Distractors set up false orderings.'
  },
  {
    id: 'q-hsptqs-fill-022',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 490,
    stem: 'Compare these three quantities: (A) 1/2 of 80  (B) 1/4 of 100  (C) 1/5 of 150. Which statement is true?',
    choices: ['A = B = C', 'A < B < C', 'B > A > C', 'A > C > B'],
    answer: 3,
    explanation: 'A = 40; B = 25; C = 30. So A > C > B (40 > 30 > 25). Distractors flip the order or claim equality.'
  },
  {
    id: 'q-hsptqs-fill-023',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 550,
    stem: 'Compare these three quantities: (A) 2³  (B) 3²  (C) 4 × 2. Which statement is true?',
    choices: ['A = B = C', 'A = C and both < B', 'A < B < C', 'A > B > C'],
    answer: 1,
    explanation: 'A = 8; B = 9; C = 8. So A = C = 8, both less than B = 9. Distractors miss the A=C tie.'
  },
  {
    id: 'q-hsptqs-fill-024',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 570,
    stem: 'Compare these three quantities: (A) 0.25 × 80  (B) 30% of 60  (C) 1/3 of 60. Which is the smallest?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'A = 20; B = 18; C = 20. B = 18 is smallest. Distractors: A and C tie at 20; not all equal.'
  },
  {
    id: 'q-hsptqs-fill-025',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 590,
    stem: 'Compare these three quantities: (A) 5! / 4!  (B) 2³ - 3  (C) √25. Which statement is true?',
    choices: ['A = B = C', 'A > B > C', 'A < B < C', 'B > A > C'],
    answer: 0,
    explanation: 'A = 120/24 = 5; B = 8 - 3 = 5; C = √25 = 5. All equal 5. Distractors describe false orderings.'
  },
  {
    id: 'q-hsptqs-fill-026',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 600,
    stem: 'Compare these three quantities: (A) 2/3 of 90  (B) 3/4 of 80  (C) 5/6 of 72. Which statement is true?',
    choices: ['A > B > C', 'A < B < C', 'A = B = C', 'A = B and both > C'],
    answer: 2,
    explanation: 'A = (2/3)(90) = 60; B = (3/4)(80) = 60; C = (5/6)(72) = 60. All three equal 60. Distractors set up false orderings.'
  },
  {
    id: 'q-hsptqs-fill-027',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 660,
    stem: 'Compare these three quantities: (A) 3/4 of 16  (B) 60% of 20  (C) 0.5 × 28. Which is the greatest?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 2,
    explanation: 'A = 12; B = 12; C = 14. C = 14 is greatest. Distractors: A and B tie at 12; not all equal.'
  },
  {
    id: 'q-hsptqs-fill-028',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 680,
    stem: 'Compare these three quantities: (A) 0.4 × 0.5  (B) 1/5 of 1  (C) 25% of 0.8. Which statement is true?',
    choices: ['A > B > C', 'A < B < C', 'A = B = C', 'A = B and both > C'],
    answer: 2,
    explanation: 'A = 0.20; B = 0.20; C = 0.20. All three equal 0.2. Distractors propose false orderings.'
  },
  {
    id: 'q-hsptqs-fill-029',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 690,
    stem: 'Compare these three quantities: (A) 2 + 3 × 4  (B) (2 + 3) × 4  (C) 2 × 3 + 4. Which statement is true?',
    choices: ['A = B = C', 'A < B and A > C', 'A > B > C', 'B > A > C'],
    answer: 3,
    explanation: 'A = 2 + 12 = 14; B = 5 × 4 = 20; C = 6 + 4 = 10. So B > A > C. Distractors miss order of operations.'
  },
  {
    id: 'q-hsptqs-fill-030',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 740,
    stem: 'Compare these three quantities: (A) 3⁴  (B) 4³  (C) 9². Which statement is true?',
    choices: ['A = C and both > B', 'A > B > C', 'A < B < C', 'A = B = C'],
    answer: 0,
    explanation: 'A = 3⁴ = 81; B = 4³ = 64; C = 9² = 81. So A = C = 81, both greater than B = 64. Distractors miss the A=C equality.'
  },

  // ===== NUMBER MANIPULATION (10) =====
  {
    id: 'q-hsptqs-fill-031',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 470,
    stem: 'What number is 3 more than 1/2 of 20?',
    choices: ['10', '23', '15', '13'],
    answer: 3,
    explanation: '1/2 of 20 = 10; 10 + 3 = 13. Distractors: 10 (forgot the +3), 15 (added 5), 23 (added 3 to 20 instead of to half of 20).'
  },
  {
    id: 'q-hsptqs-fill-032',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 490,
    stem: 'What number is 5 less than 1/4 of 40?',
    choices: ['5', '10', '15', '35'],
    answer: 0,
    explanation: '1/4 of 40 = 10; 10 - 5 = 5. Distractors: 10 (forgot -5), 15 (added instead of subtracted), 35 (subtracted from 40).'
  },
  {
    id: 'q-hsptqs-fill-033',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 560,
    stem: 'What number is 50% more than 1/4 of 80?',
    choices: ['20', '25', '30', '40'],
    answer: 2,
    explanation: '1/4 of 80 = 20; 50% more than 20 = 20 + 10 = 30. Distractors: 20 (forgot the +50%), 25 (added 5), 40 (doubled instead of adding 50%).'
  },
  {
    id: 'q-hsptqs-fill-034',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 570,
    stem: 'What is 1/3 of 60% of 90?',
    choices: ['12', '18', '20', '54'],
    answer: 1,
    explanation: '60% of 90 = 54; 1/3 of 54 = 18. Distractors: 12 (wrong ordering), 20 (averaged), 54 (forgot the 1/3 step).'
  },
  {
    id: 'q-hsptqs-fill-035',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 580,
    stem: 'The product of 6 and a number is 30 less than 90. What is the number?',
    choices: ['8', '10', '12', '15'],
    answer: 1,
    explanation: '90 - 30 = 60; 6 × n = 60, so n = 10. Distractors: 8 (used 48), 12 (used 72), 15 (divided 90 directly).'
  },
  {
    id: 'q-hsptqs-fill-036',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 600,
    stem: 'What number is 1/2 of the sum of 12 and 18?',
    choices: ['12', '15', '18', '30'],
    answer: 1,
    explanation: 'Sum of 12 and 18 = 30; 1/2 of 30 = 15. Distractors: 12 and 18 (just one addend), 30 (forgot the 1/2 step).'
  },
  {
    id: 'q-hsptqs-fill-037',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 660,
    stem: 'What number, when doubled and then increased by 5, equals 25?',
    choices: ['10', '12', '15', '20'],
    answer: 0,
    explanation: 'Let n be the number. 2n + 5 = 25, so 2n = 20, n = 10. Distractors: 12 (used 29), 15 (mis-set the equation), 20 (forgot to halve).'
  },
  {
    id: 'q-hsptqs-fill-038',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 670,
    stem: 'What is 25% of 1/3 of 240, then doubled?',
    choices: ['20', '30', '60', '40'],
    answer: 3,
    explanation: '1/3 of 240 = 80; 25% of 80 = 20; doubled = 40. Distractors: 20 (forgot to double), 30 (averaged), 60 (overshot).'
  },
  {
    id: 'q-hsptqs-fill-039',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 700,
    stem: 'The sum of two numbers is 40, and one number is 4 times the other. What is the larger number?',
    choices: ['8', '24', '32', '36'],
    answer: 2,
    explanation: 'Let smaller = x, larger = 4x. x + 4x = 40 → 5x = 40 → x = 8. Larger = 4(8) = 32. Distractors: 8 (the smaller number), 24 (treated as 4x of 6), 36 (used 9x split).'
  },
  {
    id: 'q-hsptqs-fill-040',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 760,
    stem: 'What is the average of 1/2 of 60, 1/4 of 80, and 1/5 of 100?',
    choices: ['20', '22', '24', '25'],
    answer: 0,
    explanation: '1/2 of 60 = 30; 1/4 of 80 = 20; 1/5 of 100 = 10. Sum = 30 + 20 + 10 = 60. Average = 60/3 = 20. Distractors: 22, 24, 25 from miscomputed terms or skipping the divide-by-three step.'
  }
]);
