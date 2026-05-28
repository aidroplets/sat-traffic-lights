/**
 * HSPT Quantitative Skills — fill batch 2.
 * testType: 'HSPT', section: 'quantitative-skills'.
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';
window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ===== NUMBER SERIES (13) =====
  {
    id: 'q-hsptqs-fill2-001',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 460,
    stem: 'What number comes next in this series? 7, 14, 21, 28, 35, ?',
    choices: ['40', '41', '42', '43'],
    answer: 2,
    explanation: 'Multiples of 7 (arithmetic, +7). 35 + 7 = 42. Distractors: 40 (+5), 41 (+6), 43 (+8).'
  },
  {
    id: 'q-hsptqs-fill2-002',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 470,
    stem: 'What number comes next in this series? 100, 90, 80, 70, ?',
    choices: ['65', '60', '55', '50'],
    answer: 1,
    explanation: 'Arithmetic, decreasing by 10. 70 − 10 = 60. Distractors: 65 (−5), 55 (−15), 50 (−20).'
  },
  {
    id: 'q-hsptqs-fill2-003',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 490,
    stem: 'What number comes next in this series? 3, 9, 27, 81, ?',
    choices: ['162', '243', '324', '486'],
    answer: 1,
    explanation: 'Geometric, ×3 each step. 81 × 3 = 243. Distractors: 162 (×2), 324 (×4), 486 (×6).'
  },
  {
    id: 'q-hsptqs-fill2-004',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 540,
    stem: 'What number comes next in this series? 5, 11, 17, 23, 29, ?',
    choices: ['33', '34', '35', '36'],
    answer: 2,
    explanation: 'Arithmetic, +6 each step. 29 + 6 = 35. Distractors: 33 (+4), 34 (+5), 36 (+7).'
  },
  {
    id: 'q-hsptqs-fill2-005',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 560,
    stem: 'What number comes next in this series? 2, 4, 7, 11, 16, ?',
    choices: ['20', '21', '22', '23'],
    answer: 2,
    explanation: 'Differences increase by 1: +2, +3, +4, +5, +6. 16 + 6 = 22. Distractors: 20 (+4), 21 (+5), 23 (+7).'
  },
  {
    id: 'q-hsptqs-fill2-006',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 470,
    stem: 'What number comes next in this series? 64, 32, 16, 8, ?',
    choices: ['2', '3', '4', '6'],
    answer: 2,
    explanation: 'Geometric, ÷2 each step. 8 ÷ 2 = 4. Distractors: 2 (÷4), 3 (−5), 6 (−2).'
  },
  {
    id: 'q-hsptqs-fill2-007',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 580,
    stem: 'What number comes next in this series? 1, 3, 6, 10, 15, ?',
    choices: ['18', '19', '20', '21'],
    answer: 3,
    explanation: 'Triangular numbers; differences +2, +3, +4, +5, +6. 15 + 6 = 21. Distractors: 18, 19, 20 use smaller increments.'
  },
  {
    id: 'q-hsptqs-fill2-008',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 590,
    stem: 'What number comes next in this series? 2, 5, 11, 23, 47, ?',
    choices: ['93', '94', '95', '96'],
    answer: 2,
    explanation: 'Each term is ×2 + 1: 2→5→11→23→47→95. 47 × 2 + 1 = 95. Distractors: 93 (×2 − 1), 94 (just doubled), 96 (×2 + 2).'
  },
  {
    id: 'q-hsptqs-fill2-009',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 600,
    stem: 'What number comes next in this series? 1, 4, 2, 8, 4, 16, ?',
    choices: ['8', '12', '32', '20'],
    answer: 0,
    explanation: 'Two interleaved sequences: odd positions 1, 2, 4, 8 (×2) and even positions 4, 8, 16, 32 (×2). The next (7th) term continues the odd sequence: 4 × 2 = 8. Distractors: 12, 20, 32 confuse which sub-sequence is next.'
  },
  {
    id: 'q-hsptqs-fill2-010',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 540,
    stem: 'What number comes next in this series? 4, 9, 16, 25, 36, ?',
    choices: ['42', '45', '48', '49'],
    answer: 3,
    explanation: 'Perfect squares 2², 3², 4², 5², 6², 7² = 49. Distractors: 42, 45, 48 break the square pattern.'
  },
  {
    id: 'q-hsptqs-fill2-011',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 680,
    stem: 'What number comes next in this series? 100, 50, 51, 17, 18, ?',
    choices: ['6', '5', '9', '4'],
    answer: 0,
    explanation: 'Alternating ÷2 and +1, but the divisor changes: 100/2=50, 50+1=51, 51/3=17, 17+1=18, 18/3=6. Distractors: 5 (off by 1), 9 (÷2 instead), 4 (over-divided).'
  },
  {
    id: 'q-hsptqs-fill2-012',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 700,
    stem: 'What number comes next in this series? 2, 3, 5, 8, 13, 21, ?',
    choices: ['28', '30', '34', '35'],
    answer: 2,
    explanation: 'Fibonacci-like: each term is the sum of the previous two. 13 + 21 = 34. Distractors: 28, 30, 35 are off-by-one or off-by-two.'
  },
  {
    id: 'q-hsptqs-fill2-013',
    section: 'quantitative-skills',
    topic: 'number-series',
    difficulty: 740,
    stem: 'What number comes next in this series? 1, 2, 6, 24, 120, ?',
    choices: ['600', '720', '480', '240'],
    answer: 1,
    explanation: 'Factorials: 1!, 2!, 3!, 4!, 5!, 6! Each term is multiplied by the next integer. 120 × 6 = 720. Distractors: 600 (×5), 480 (×4), 240 (just doubled).'
  },

  // ===== GEOMETRIC COMPARISON (12) =====
  {
    id: 'q-hsptqs-fill2-014',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 460,
    stem: 'Examine these three figures. (A) A square with side 5. (B) A square with side 6. (C) A square with side 4. Which has the greatest perimeter?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'Perimeters: A = 20; B = 24; C = 16. B is greatest. Distractors: A=20 middle, C=16 smallest, not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-015',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 480,
    stem: 'Examine these three figures. (A) A rectangle 5 by 8. (B) A square with side 7. (C) A rectangle 4 by 10. Which statement is true?',
    choices: ['A is greatest', 'A > B > C', 'C > B > A', 'B is greatest'],
    answer: 3,
    explanation: 'Areas: A = 40; B = 49; C = 40. B (49) is greatest; A and C tie at 40. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-016',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 500,
    stem: 'Examine these three figures. (A) A square with perimeter 16. (B) A square with side 5. (C) A rectangle 3 by 6. Which has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'A: side 4, area 16. B: 5×5 = 25. C: 3×6 = 18. B is greatest. Distractors: A=16 smallest, C=18 middle, not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-017',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 540,
    stem: 'Examine these three figures. (A) A right triangle with legs 8 and 10. (B) A rectangle 4 by 9. (C) A square with side 6. Which has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 0,
    explanation: 'Areas: A = (1/2)(8)(10) = 40; B = 36; C = 36. A is greatest. Distractors: B and C tie at 36; not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-018',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 560,
    stem: 'Examine these three figures. (A) A square with side 4. (B) A rectangle 2 by 8. (C) A rectangle 3 by 5. Which statement is true?',
    choices: ['A = B and both > C', 'A > B > C', 'B > A > C', 'A = B = C'],
    answer: 0,
    explanation: 'Areas: A = 16; B = 16; C = 15. So A = B = 16, both greater than C = 15. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-019',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 580,
    stem: 'Examine these three figures. (A) A circle with radius 4. (B) A square with side 7. (C) A rectangle 5 by 10. Using π ≈ 3.14, which has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 0,
    explanation: 'Areas: A = π·16 ≈ 50.24; B = 49; C = 50. A is greatest (just over C). Distractors: B=49 smallest, C=50 close second, not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-020',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 600,
    stem: 'Examine these three figures. (A) A square with diagonal of length 8. (B) A square with side 7. (C) A rectangle 4 by 9. Which statement is true?',
    choices: ['A > B > C', 'C > B > A', 'A = B = C', 'B > C > A'],
    answer: 3,
    explanation: 'A: diagonal 8 → 2·side² = 64, area = 32. B: 7×7 = 49. C: 4×9 = 36. So B (49) > C (36) > A (32). Distractors flip the ordering or claim equality.'
  },
  {
    id: 'q-hsptqs-fill2-021',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 620,
    stem: 'Examine these three solids. (A) A cube with side 4. (B) A rectangular box 2 by 5 by 8. (C) A rectangular box 3 by 3 by 7. Which has the greatest volume?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'Volumes: A = 64; B = 80; C = 63. B is greatest. Distractors: A=64 middle, C=63 smallest, not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-022',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 660,
    stem: 'Examine these three figures. (A) A square with perimeter 20. (B) A circle with circumference 20. (C) A rectangle with perimeter 20 and width 3. Using π ≈ 3.14, which statement is true?',
    choices: ['A > B > C', 'A = B = C', 'C > A > B', 'B > A > C'],
    answer: 3,
    explanation: 'A: side 5, area 25. B: circumference 20 → r = 20/(2π) ≈ 3.18, area ≈ π·10.13 ≈ 31.8. C: width 3, length 7, area 21. B (≈31.8) > A (25) > C (21). Circle wins for fixed perimeter.'
  },
  {
    id: 'q-hsptqs-fill2-023',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 670,
    stem: 'Examine these three figures. (A) A right triangle with legs 8 and 6. (B) A square with side 7. (C) A rectangle 4 by 7. Which has the greatest perimeter?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'A: legs 6 and 8, hypotenuse 10 (3-4-5 scaled). Perimeter = 6+8+10 = 24. B = 4·7 = 28. C = 2(4+7) = 22. B is greatest. Distractors: A=24 middle, C=22 smallest.'
  },
  {
    id: 'q-hsptqs-fill2-024',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 690,
    stem: 'Examine these three solids. (A) A cube with surface area 54. (B) A cube with side 4. (C) A rectangular box 2 by 3 by 6. Which has the greatest volume?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 1,
    explanation: 'A: surface area 54 = 6s², so s² = 9, s = 3, volume = 27. B: 4³ = 64. C: 2·3·6 = 36. B is greatest. Distractors: A=27 smallest, C=36 middle, not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-025',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 730,
    stem: 'Examine these three figures. (A) An equilateral triangle with side 6. (B) A square with side 4. (C) A regular hexagon with side 3. Using √3 ≈ 1.73, which has the greatest area?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 2,
    explanation: 'A: (√3/4)·6² ≈ (1.73/4)·36 ≈ 15.6. B: 4² = 16. C: regular hexagon = (3√3/2)·s² = (3·1.73/2)·9 ≈ 23.4. C is greatest. Distractors: A≈15.6 smallest, B=16 middle.'
  },

  // ===== NON-GEOMETRIC COMPARISON (12) =====
  {
    id: 'q-hsptqs-fill2-026',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 460,
    stem: 'Compare: (A) 1/2 of 60  (B) 1/3 of 60  (C) 1/4 of 60. Which is greatest?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 0,
    explanation: 'A = 30; B = 20; C = 15. A is greatest. Distractors: B=20 middle, C=15 smallest, not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-027',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 480,
    stem: 'Compare: (A) 4 + 5  (B) 3 × 3  (C) 18 ÷ 2. Which statement is true?',
    choices: ['A = B = C', 'A > B > C', 'A < B < C', 'A > B and B = C'],
    answer: 0,
    explanation: 'A = 9; B = 9; C = 9. All equal 9. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-028',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 500,
    stem: 'Compare: (A) 20% of 50  (B) 1/4 of 40  (C) 0.5 × 30. Which statement is true?',
    choices: ['A > B > C', 'A = B = C', 'C > A > B', 'A = B and both < C'],
    answer: 3,
    explanation: 'A = 10; B = 10; C = 15. So A = B = 10, both less than C = 15. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-029',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 540,
    stem: 'Compare: (A) 3²  (B) 2³  (C) 5 + 3. Which statement is true?',
    choices: ['A > B = C', 'A = B = C', 'A < B < C', 'B > A > C'],
    answer: 0,
    explanation: 'A = 9; B = 8; C = 8. A is greatest, B = C = 8. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-030',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 560,
    stem: 'Compare: (A) 3/4 of 40  (B) 50% of 60  (C) 1/2 × 60. Which statement is true?',
    choices: ['A > B = C', 'B > A > C', 'A < B < C', 'A = B = C'],
    answer: 3,
    explanation: 'A = (3/4)(40) = 30; B = 50% of 60 = 30; C = (1/2)(60) = 30. All equal 30. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-031',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 570,
    stem: 'Compare: (A) 2 × 7 + 1  (B) 3 × 5  (C) 4² − 1. Which statement is true?',
    choices: ['A = B = C', 'A < B < C', 'A > B > C', 'B < A = C'],
    answer: 0,
    explanation: 'A = 14 + 1 = 15; B = 15; C = 16 − 1 = 15. All equal 15. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-032',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 580,
    stem: 'Compare: (A) 0.4 × 25  (B) 1/2 of 22  (C) 30% of 40. Which is the smallest?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 0,
    explanation: 'A = 10; B = 11; C = 12. A is smallest. Distractors: B middle, C largest, not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-033',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 590,
    stem: 'Compare: (A) (1/2)²  (B) 1/4  (C) 0.25. Which statement is true?',
    choices: ['A = B = C', 'A < B = C', 'A > B > C', 'A = B < C'],
    answer: 0,
    explanation: 'A = 1/4; B = 1/4; C = 0.25 = 1/4. All equal. Distractors confuse decimal/fraction equivalence.'
  },
  {
    id: 'q-hsptqs-fill2-034',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 610,
    stem: 'Compare: (A) 7 × 8  (B) 9 × 6  (C) 5² + 32. Which is greatest?',
    choices: ['(A)', '(B)', '(C)', 'All equal'],
    answer: 2,
    explanation: 'A = 56; B = 54; C = 25 + 32 = 57. C is greatest. Distractors: A=56 middle, B=54 smallest, not all equal.'
  },
  {
    id: 'q-hsptqs-fill2-035',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 640,
    stem: 'Compare: (A) 2/3 of 27  (B) 3/4 of 24  (C) 5/6 of 24. Which statement is true?',
    choices: ['A = B = C', 'A > B > C', 'A < B = C', 'A = B and both < C'],
    answer: 3,
    explanation: 'A = (2/3)(27) = 18; B = (3/4)(24) = 18; C = (5/6)(24) = 20. So A = B = 18, both less than C = 20. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-036',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 670,
    stem: 'Compare: (A) 2⁴  (B) 4²  (C) 3² + 7. Which statement is true?',
    choices: ['A < B < C', 'A = B = C', 'A > B = C', 'B > A > C'],
    answer: 1,
    explanation: 'A = 16; B = 16; C = 9 + 7 = 16. All equal. Distractors set false orderings.'
  },
  {
    id: 'q-hsptqs-fill2-037',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 740,
    stem: 'Compare: (A) (3 + 4)²  (B) 3² + 4²  (C) 5 × 9 + 4. Which statement is true?',
    choices: ['A = B = C', 'A = C and both > B', 'A > B = C', 'B < A < C'],
    answer: 1,
    explanation: 'A = 7² = 49; B = 9 + 16 = 25; C = 45 + 4 = 49. So A = C = 49, both > B = 25. Distractors confuse the perfect-square expansion.'
  },

  // ===== NUMBER MANIPULATION (13) =====
  {
    id: 'q-hsptqs-fill2-038',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 460,
    stem: 'What number is 5 more than half of 20?',
    choices: ['10', '15', '20', '25'],
    answer: 1,
    explanation: 'Half of 20 = 10. 10 + 5 = 15. Distractors: 10 (forgot the +5), 20 (added 10 instead of 5), 25 (used full 20).'
  },
  {
    id: 'q-hsptqs-fill2-039',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 480,
    stem: 'What number is twice the sum of 7 and 8?',
    choices: ['15', '23', '30', '32'],
    answer: 2,
    explanation: '7 + 8 = 15; twice 15 = 30. Distractors: 15 (forgot to double), 23 (7 + 2·8), 32 (added 2 instead of multiplying).'
  },
  {
    id: 'q-hsptqs-fill2-040',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 500,
    stem: 'What number is 1/4 of the product of 8 and 6?',
    choices: ['10', '12', '14', '16'],
    answer: 1,
    explanation: '8 × 6 = 48; 1/4 of 48 = 12. Distractors: 10, 14, 16 are common arithmetic slips.'
  },
  {
    id: 'q-hsptqs-fill2-041',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 540,
    stem: 'What number, when increased by 8, equals 3 times 7?',
    choices: ['11', '12', '13', '14'],
    answer: 2,
    explanation: '3 × 7 = 21; 21 − 8 = 13. Distractors: 11 (used 19), 12 (off by 1), 14 (added 8 to wrong total).'
  },
  {
    id: 'q-hsptqs-fill2-042',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 560,
    stem: 'What number is 1/2 of the difference between 50 and 14?',
    choices: ['16', '17', '19', '18'],
    answer: 3,
    explanation: '50 − 14 = 36; half of 36 = 18. Distractors: 16, 17, 19 are off-by-one or off-by-two.'
  },
  {
    id: 'q-hsptqs-fill2-043',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 570,
    stem: 'What number is 3 less than 1/3 of 45?',
    choices: ['9', '10', '11', '12'],
    answer: 3,
    explanation: '1/3 of 45 = 15; 15 − 3 = 12. Distractors: 9 (subtracted 6), 10 (used 1/3 of 39), 11 (off by 1).'
  },
  {
    id: 'q-hsptqs-fill2-044',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 580,
    stem: 'What number, when added to its own half, equals 21?',
    choices: ['12', '13', '14', '15'],
    answer: 2,
    explanation: 'Let n + n/2 = 21, so (3/2)n = 21, n = 14. Distractors: 12 (used n + n/3), 13 (off by 1), 15 (used 22.5 / 1.5).'
  },
  {
    id: 'q-hsptqs-fill2-045',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 600,
    stem: 'What number is 1/5 of the sum of 17 and 33?',
    choices: ['8', '9', '10', '11'],
    answer: 2,
    explanation: '17 + 33 = 50; 1/5 of 50 = 10. Distractors: 8, 9, 11 are common slips.'
  },
  {
    id: 'q-hsptqs-fill2-046',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 660,
    stem: 'What number is 2/3 of 1/2 of 90?',
    choices: ['25', '30', '35', '45'],
    answer: 1,
    explanation: '1/2 of 90 = 45; 2/3 of 45 = 30. Distractors: 25 (off), 35 (added instead), 45 (forgot 2/3 step).'
  },
  {
    id: 'q-hsptqs-fill2-047',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 680,
    stem: 'When 4 is subtracted from a number and the result is multiplied by 3, the answer is 27. What is the number?',
    choices: ['11', '12', '14', '13'],
    answer: 3,
    explanation: 'Let n: 3(n − 4) = 27 → n − 4 = 9 → n = 13. Distractors: 11 (used 21/3+4), 12 (off by 1), 14 (added 4 twice).'
  },
  {
    id: 'q-hsptqs-fill2-048',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 690,
    stem: 'What is 1/4 of the difference between the square of 9 and the square of 7?',
    choices: ['6', '7', '8', '9'],
    answer: 2,
    explanation: '9² = 81, 7² = 49, difference = 32; 1/4 of 32 = 8. Distractors: 6, 7, 9 are off-by-one or off-by-two.'
  },
  {
    id: 'q-hsptqs-fill2-049',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 700,
    stem: 'What number is 3 times the difference between 1/2 of 24 and 1/4 of 24?',
    choices: ['12', '15', '16', '18'],
    answer: 3,
    explanation: '1/2 of 24 = 12; 1/4 of 24 = 6; difference = 6; 3 × 6 = 18. Distractors: 12 (forgot the ×3), 15, 16 are arithmetic slips.'
  },
  {
    id: 'q-hsptqs-fill2-050',
    section: 'quantitative-skills',
    topic: 'number-manipulation',
    difficulty: 750,
    stem: 'A number is doubled and then 7 is added. The result is 5 more than 4 times the original number. What is the number?',
    choices: ['1', '2', '3', '4'],
    answer: 0,
    explanation: 'Let n: 2n + 7 = 4n + 5 → 7 − 5 = 4n − 2n → 2 = 2n → n = 1. Distractors: 2, 3, 4 fail to satisfy 2n + 7 = 4n + 5 (2: 11 vs 13; 3: 13 vs 17; 4: 15 vs 21).'
  }
]);
