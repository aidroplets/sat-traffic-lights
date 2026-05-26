/**
 * HSPT Quantitative Skills — series, geometric comparison,
 * non-geometric comparison, number manipulation.
 *
 * testType: 'HSPT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'quantitative-skills'
 * topic: 'series' | 'geometric-comparison' | 'non-geometric-comparison' | 'manipulation'
 *
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';

window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ============================================================
  // SERIES (11 questions: q-hsptqs-001 through q-hsptqs-011)
  // ============================================================
  {
    id: 'q-hsptqs-001',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 420,
    stem: 'What number should come next in this series? 3, 6, 9, 12, 15, ___',
    choices: ['18', '16', '17', '20'],
    answer: 0,
    explanation: 'Each term increases by 3 (arithmetic with common difference 3): 15 + 3 = 18. Distractor 16 is +1, 17 is +2, 20 is +5 — none match the established pattern.'
  },
  {
    id: 'q-hsptqs-002',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 460,
    stem: 'What number should come next in this series? 2, 4, 8, 16, 32, ___',
    choices: ['60', '64', '128', '48'],
    answer: 1,
    explanation: 'Each term doubles the previous (×2): 32 × 2 = 64. Distractor 48 = 32 + 16 (adding the previous term once instead of doubling), 60 is just close to 64, 128 is two doublings ahead.'
  },
  {
    id: 'q-hsptqs-003',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 540,
    stem: 'What number should come next in this series? 1, 4, 9, 16, 25, ___',
    choices: ['30', '36', '49', '32'],
    answer: 1,
    explanation: 'These are the perfect squares: 1², 2², 3², 4², 5², so the next is 6² = 36. Distractor 30 = 25 + 5 (using only one differencing), 32 is doubling, 49 = 7² (skipping a term).'
  },
  {
    id: 'q-hsptqs-004',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 560,
    stem: 'What number should come next in this series? 1, 3, 7, 15, 31, ___',
    choices: ['93', '47', '55', '63'],
    answer: 3,
    explanation: 'Each term is double the previous plus 1: 1→3, 3→7, 7→15, 15→31, 31→63. Equivalently, the differences are 2, 4, 8, 16, 32 (doubling), so 31 + 32 = 63. Distractor 47 = 31 + 16 (re-uses last difference), 55 has no clear pattern, 93 = 31 × 3.'
  },
  {
    id: 'q-hsptqs-005',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 580,
    stem: 'What number should come next in this series? 50, 45, 41, 38, 36, ___',
    choices: ['35', '33', '36', '34'],
    answer: 0,
    explanation: 'The differences are −5, −4, −3, −2, so the next difference is −1: 36 − 1 = 35. Distractor 33 assumes a constant −3 from the last step, 34 assumes −2, 36 stays the same.'
  },
  {
    id: 'q-hsptqs-006',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 600,
    stem: 'What number should come next in this series? 2, 3, 5, 8, 12, 17, ___',
    choices: ['23', '22', '21', '24'],
    answer: 0,
    explanation: 'The differences are +1, +2, +3, +4, +5, so the next difference is +6: 17 + 6 = 23. Distractor 22 uses +5 again, 21 uses +4, 24 = 17 + 7.'
  },
  {
    id: 'q-hsptqs-007',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 595,
    stem: 'What number should come next in this series? 1, 2, 4, 7, 11, 16, 22, ___',
    choices: ['29', '28', '30', '32'],
    answer: 0,
    explanation: 'The differences are +1, +2, +3, +4, +5, +6, so the next is +7: 22 + 7 = 29. Distractor 28 uses +6 again, 30 uses +8, 32 = 22 + 10.'
  },
  {
    id: 'q-hsptqs-008',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 540,
    stem: 'What number should come next in this series? 80, 40, 20, 10, 5, ___',
    choices: ['2', '2.5', '1', '0'],
    answer: 1,
    explanation: 'Each term is half the previous (÷2): 5 ÷ 2 = 2.5. Distractor 0 assumes subtracting 5, 1 has no clear basis, 2 is close but the rule is exact halving.'
  },
  {
    id: 'q-hsptqs-009',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 660,
    stem: 'What number should come next in this series? 2, 6, 4, 12, 10, 30, 28, ___',
    choices: ['58', '56', '84', '90'],
    answer: 2,
    explanation: 'Two interleaved operations: ×3, then −2, then ×3, then −2... 2×3=6, 6−2=4, 4×3=12, 12−2=10, 10×3=30, 30−2=28, 28×3=84. Distractor 56 = 28×2, 58 = 28+30, 90 = 30×3.'
  },
  {
    id: 'q-hsptqs-010',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 680,
    stem: 'What number should come next in this series? 1, 1, 2, 3, 5, 8, 13, ___',
    choices: ['21', '18', '20', '26'],
    answer: 0,
    explanation: 'This is the Fibonacci sequence: each term equals the sum of the two preceding terms. 8 + 13 = 21. Distractor 18 = 13 + 5 (skipped a term), 20 has no clear basis, 26 = 13 × 2.'
  },
  {
    id: 'q-hsptqs-011',
    section: 'quantitative-skills',
    topic: 'series',
    difficulty: 730,
    stem: 'What number should come next in this series? 3, 4, 7, 11, 18, 29, 47, ___',
    choices: ['76', '58', '94', '65'],
    answer: 0,
    explanation: 'Each term is the sum of the two preceding (Fibonacci-like rule): 3+4=7, 4+7=11, 7+11=18, 11+18=29, 18+29=47, 29+47=76. Distractor 58 = 29×2, 65 has no basis, 94 = 47×2.'
  },

  // ============================================================
  // GEOMETRIC COMPARISON (11 questions: q-hsptqs-012 through q-hsptqs-022)
  // ============================================================
  {
    id: 'q-hsptqs-012',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 430,
    stem: 'Line A is 8 inches long. Line B is 4 inches long. Compared to B, line A is:',
    choices: ['twice as long', 'half as long', 'four times as long', 'the same length'],
    answer: 0,
    explanation: 'A ÷ B = 8 ÷ 4 = 2, so A is twice as long as B. Distractor "half" reverses the relationship, "same" ignores the difference, "four times" would require A to be 16.'
  },
  {
    id: 'q-hsptqs-013',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 480,
    stem: 'A square has a side of length s. A second square has a side of length 2s. The area of the second square is how many times the area of the first?',
    choices: ['3 times', '4 times', '8 times', '2 times'],
    answer: 1,
    explanation: 'Area of first square = s². Area of second = (2s)² = 4s². The ratio is 4. Distractor 2 confuses linear with area scaling, 3 has no basis, 8 = 2³ would apply to volume scaling of a cube.'
  },
  {
    id: 'q-hsptqs-014',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 510,
    stem: 'Angle A measures 30°. Angle B is twice angle A. Angle C is the supplement of angle B. Then angle C is:',
    choices: ['equal to angle B', 'equal to angle A', 'greater than angle B', 'a right angle'],
    answer: 2,
    explanation: 'Angle B = 2 × 30° = 60°. Supplement of B = 180° − 60° = 120°. So C = 120°, which is greater than B (60°). Distractor "equal to A" would require C = 30°, "equal to B" would require C = 60°, "right angle" would require C = 90°.'
  },
  {
    id: 'q-hsptqs-015',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 470,
    stem: 'Line A is twice as long as line B. Line B is half as long as line C. Then lines A and C are:',
    choices: ['cannot be determined', 'A is longer than C', 'C is longer than A', 'equal in length'],
    answer: 3,
    explanation: 'Let B = x. Then A = 2x and C = 2x (because B is half of C means C = 2B). So A = C. Distractor "A longer" or "C longer" misreads the ratios, "cannot be determined" overlooks that both relationships are explicit.'
  },
  {
    id: 'q-hsptqs-016',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 560,
    stem: 'A rectangle has length 10 and width 4. A square has a side of 6. Compared to the rectangle, the square has:',
    choices: ['equal area', 'less area', 'cannot be determined', 'greater area'],
    answer: 1,
    explanation: 'Rectangle area = 10 × 4 = 40. Square area = 6 × 6 = 36. So the square has less area (36 < 40). Distractor "equal" would need 36 = 40, "greater" reverses the inequality, "cannot be determined" ignores that both areas are computable.'
  },
  {
    id: 'q-hsptqs-017',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 590,
    stem: 'In triangle ABC, angle A = 80° and angle B = 40°. Then angle C is:',
    choices: ['greater than angle A and greater than angle B', 'less than angle A and less than angle B', 'equal to angle A', 'less than angle A but greater than angle B'],
    answer: 3,
    explanation: 'Angles in a triangle sum to 180°: C = 180° − 80° − 40° = 60°. Since 40° < 60° < 80°, C is less than A (60 < 80) but greater than B (60 > 40). Distractor "less than both" wrongly assumes C is the smallest, "greater than both" wrongly assumes C is the largest, "equal to A" would require C = 80°.'
  },
  {
    id: 'q-hsptqs-018',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 540,
    stem: 'Circle X has radius 3. Circle Y has radius 6. The area of Y is how many times the area of X?',
    choices: ['6 times', '3 times', '4 times', '2 times'],
    answer: 2,
    explanation: 'Area of X = π(3)² = 9π. Area of Y = π(6)² = 36π. Ratio = 36π ÷ 9π = 4. Distractor 2 confuses radius ratio with area ratio, 3 has no basis, 6 doubles the radius ratio.'
  },
  {
    id: 'q-hsptqs-019',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 640,
    stem: 'A cube has edge length 2. A second cube has edge length 4. The volume of the second cube is how many times the volume of the first?',
    choices: ['16 times', '4 times', '2 times', '8 times'],
    answer: 3,
    explanation: 'Volume of first = 2³ = 8. Volume of second = 4³ = 64. Ratio = 64 ÷ 8 = 8. Distractor 2 is linear scaling, 4 is area scaling, 16 doubles the correct answer.'
  },
  {
    id: 'q-hsptqs-020',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 660,
    stem: 'Angle A = 40°. Angle B is the complement of A. Angle C is the supplement of A. Then B + C equals:',
    choices: ['190°', '140°', '180°', '220°'],
    answer: 0,
    explanation: 'Complement of A: B = 90° − 40° = 50°. Supplement of A: C = 180° − 40° = 140°. So B + C = 50° + 140° = 190°. In general, B + C = (90 − A) + (180 − A) = 270 − 2A = 270 − 80 = 190°. Distractor 140° is C alone, 180° is the supplement total, 220° = 270 − 50 (subtracting B instead of 2A).'
  },
  {
    id: 'q-hsptqs-021',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 680,
    stem: 'Rectangle R has length L and width W with L > W. If both L and W are doubled, the perimeter and area of the new rectangle compared to R are:',
    choices: ['perimeter ×4, area ×8', 'perimeter ×4, area ×4', 'perimeter ×2, area ×2', 'perimeter ×2, area ×4'],
    answer: 3,
    explanation: 'Original perimeter = 2L + 2W. New perimeter = 2(2L) + 2(2W) = 4L + 4W = 2(2L+2W), so ×2. Original area = LW. New area = (2L)(2W) = 4LW, so ×4. Distractor "×2, ×2" forgets area scales by the square, "×4, ×4" doubles the perimeter factor, "×4, ×8" applies cube scaling.'
  },
  {
    id: 'q-hsptqs-022',
    section: 'quantitative-skills',
    topic: 'geometric-comparison',
    difficulty: 580,
    stem: 'Triangle T1 has base 6 and height 8. Triangle T2 has base 4 and height 9. Compared to T1, the area of T2 is:',
    choices: ['less than T1', 'equal to T1', 'greater than T1', 'cannot be determined'],
    answer: 0,
    explanation: 'Area of T1 = (1/2)(6)(8) = 24. Area of T2 = (1/2)(4)(9) = 18. So T2 (18) is less than T1 (24). Distractor "equal" requires 18 = 24, "greater" reverses the inequality, "cannot be determined" ignores that both areas are computable from the formula (1/2)bh.'
  },

  // ============================================================
  // NON-GEOMETRIC COMPARISON (11 questions: q-hsptqs-023 through q-hsptqs-033)
  // ============================================================
  {
    id: 'q-hsptqs-023',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 440,
    stem: 'Examine (a) 2 + 3, (b) 3 + 2, (c) 5 + 0. Which statement is true?',
    choices: ['c is greater than a and b', 'b equals c but is greater than a', 'a is greater than b and c', 'a, b, and c are all equal'],
    answer: 3,
    explanation: 'a = 5, b = 5, c = 5. All three equal 5, so they are all equal. The other choices each claim one or two values are larger, but every expression evaluates to the same number.'
  },
  {
    id: 'q-hsptqs-024',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 470,
    stem: 'Examine (a) 1/2, (b) 2/4, (c) 3/8. Which statement is true?',
    choices: ['a is greater than b and c', 'b is greater than a and c', 'a equals b and both are greater than c', 'a, b, and c are all equal'],
    answer: 2,
    explanation: 'a = 1/2 = 0.5, b = 2/4 = 0.5, c = 3/8 = 0.375. So a = b = 0.5 and both exceed c = 0.375. Distractor "a > b and c" wrongly separates a and b, "b greater" reverses, "all equal" ignores 3/8 ≠ 1/2.'
  },
  {
    id: 'q-hsptqs-025',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 500,
    stem: 'Examine (a) 25% of 80, (b) 1/5 of 80, (c) 80 ÷ 4. Which statement is true?',
    choices: ['c is greater than a and b', 'a equals c and both are greater than b', 'a, b, and c are all equal', 'b is greater than a and c'],
    answer: 1,
    explanation: 'a = 0.25 × 80 = 20. b = (1/5) × 80 = 16. c = 80 ÷ 4 = 20. So a = c = 20, both greater than b = 16. Distractor "all equal" misses b ≠ 20, "b greater" reverses, "c greater" ignores a = c.'
  },
  {
    id: 'q-hsptqs-026',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 540,
    stem: 'Examine (a) 3 × 4 + 2, (b) 3 × (4 + 2), (c) (3 × 4) + (3 × 2). Which statement is true?',
    choices: ['a is greater than b and c', 'b equals c and both are greater than a', 'b is greater than c and a', 'a, b, and c are all equal'],
    answer: 1,
    explanation: 'a = 12 + 2 = 14 (multiplication first). b = 3 × 6 = 18. c = 12 + 6 = 18. So b = c = 18 (this illustrates the distributive property), both greater than a = 14. Distractor "all equal" misses order-of-operations, "a greater" reverses.'
  },
  {
    id: 'q-hsptqs-027',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 460,
    stem: 'Examine (a) 0.5, (b) 1/2, (c) 50%. Which statement is true?',
    choices: ['a, b, and c are all equal', 'a is greater than b and c', 'c is greater than a and b', 'b is less than a and c'],
    answer: 0,
    explanation: 'a = 0.5, b = 1/2 = 0.5, c = 50% = 0.5. All three are different notations for the same value. Distractor "a greater", "c greater", "b less" each presume a difference where there is none.'
  },
  {
    id: 'q-hsptqs-028',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 580,
    stem: 'Examine (a) 2³, (b) 3², (c) 4 + 5. Which statement is true?',
    choices: ['a is greater than b and c', 'b equals c and both are greater than a', 'b is greater than a and c', 'a, b, and c are all equal'],
    answer: 1,
    explanation: 'a = 2³ = 8. b = 3² = 9. c = 4 + 5 = 9. So b = c = 9, both greater than a = 8. Distractor "all equal" misses 8 ≠ 9, "a greater" inverts, "b greater" ignores b = c.'
  },
  {
    id: 'q-hsptqs-029',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 600,
    stem: 'Examine (a) the average of 4 and 10, (b) the average of 6 and 8, (c) the average of 2 and 12. Which statement is true?',
    choices: ['a is greater than b and c', 'b is greater than a and c', 'c is greater than a and b', 'a, b, and c are all equal'],
    answer: 3,
    explanation: 'a = (4+10)/2 = 7. b = (6+8)/2 = 7. c = (2+12)/2 = 7. All three pairs sum to 14, so all averages are 7. Distractors each claim one is larger, but each average equals 7.'
  },
  {
    id: 'q-hsptqs-030',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 620,
    stem: 'Examine (a) 2/3, (b) 3/4, (c) 5/6. Which statement is true?',
    choices: ['a > b > c', 'b > a > c', 'c > b > a', 'a = b = c'],
    answer: 2,
    explanation: 'Convert to common denominator 12: a = 8/12, b = 9/12, c = 10/12. So c > b > a. Distractor "a > b > c" reverses, "all equal" ignores the actual values, "b > a > c" misorders.'
  },
  {
    id: 'q-hsptqs-031',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 640,
    stem: 'Examine (a) 15% of 200, (b) 30% of 100, (c) 60% of 50. Which statement is true?',
    choices: ['b is greater than a and c', 'c is less than a and b', 'a is greater than b and c', 'a, b, and c are all equal'],
    answer: 3,
    explanation: 'a = 0.15 × 200 = 30. b = 0.30 × 100 = 30. c = 0.60 × 50 = 30. All three equal 30 (each pair multiplies to the same product). Distractors each claim a difference where there is none.'
  },
  {
    id: 'q-hsptqs-032',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 670,
    stem: 'Examine (a) (−3)², (b) −3², (c) (−3)(−3). Which statement is true?',
    choices: ['a is greater than b and c', 'b is greater than a and c', 'a, b, and c are all equal', 'a equals c and both are greater than b'],
    answer: 3,
    explanation: 'a = (−3)² = 9. b = −3² = −(3²) = −9 (the negative is not squared). c = (−3)(−3) = 9. So a = c = 9, both greater than b = −9. Distractor "all equal" misses the sign convention, "b greater" inverts, "a greater" ignores a = c.'
  },
  {
    id: 'q-hsptqs-033',
    section: 'quantitative-skills',
    topic: 'non-geometric-comparison',
    difficulty: 740,
    stem: 'Examine (a) √64, (b) ∛64, (c) 64^(1/6). Which statement is true?',
    choices: ['a = b = c', 'a > b > c', 'b > a > c', 'c > b > a'],
    answer: 1,
    explanation: 'a = √64 = 8. b = ∛64 = 4. c = 64^(1/6) = 2 (since 2⁶ = 64). So a (8) > b (4) > c (2). Distractor "all equal" ignores root differences, "c > b > a" reverses, "b > a > c" misorders.'
  },

  // ============================================================
  // MANIPULATION (12 questions: q-hsptqs-034 through q-hsptqs-045)
  // ============================================================
  {
    id: 'q-hsptqs-034',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 410,
    stem: 'What number is 3 more than the product of 4 and 5?',
    choices: ['27', '23', '17', '20'],
    answer: 1,
    explanation: 'First find the product: 4 × 5 = 20. Then add 3: 20 + 3 = 23. Distractor 17 = 20 − 3 (subtraction instead of addition), 20 ignores the "+3", 27 = (4+5) × 3 mis-applies the operations.'
  },
  {
    id: 'q-hsptqs-035',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 450,
    stem: 'What number divided by 4 equals 7?',
    choices: ['32', '28', '24', '11'],
    answer: 1,
    explanation: 'Let n be the number. n ÷ 4 = 7 means n = 7 × 4 = 28. Distractor 11 = 7 + 4 (addition), 24 = 6 × 4 (off by one), 32 = 8 × 4 (off by one).'
  },
  {
    id: 'q-hsptqs-036',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 520,
    stem: 'Half of a number is 12. What is one-third of the same number?',
    choices: ['4', '6', '8', '9'],
    answer: 2,
    explanation: 'If half the number is 12, the number is 24. One-third of 24 is 8. Distractor 4 = 12/3 (takes 1/3 of 12 instead of the number), 6 = 12/2, 9 has no clear basis.'
  },
  {
    id: 'q-hsptqs-037',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 520,
    stem: 'What number is 8 less than twice 15?',
    choices: ['22', '7', '38', '14'],
    answer: 0,
    explanation: 'Twice 15 = 30. Then 8 less = 30 − 8 = 22. Distractor 7 = 15 − 8, 14 = 22 − 8 (subtracted twice), 38 = 30 + 8 (added instead of subtracted).'
  },
  {
    id: 'q-hsptqs-038',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 540,
    stem: 'The sum of 5 consecutive integers is 75. What is the smallest of these integers?',
    choices: ['13', '11', '15', '12'],
    answer: 0,
    explanation: 'For 5 consecutive integers, the average equals the middle one: 75 ÷ 5 = 15, so the integers are 13, 14, 15, 16, 17. The smallest is 13. Distractor 15 is the middle, 12 = 13 − 1, 11 = 13 − 2.'
  },
  {
    id: 'q-hsptqs-039',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 570,
    stem: 'What is 25% of 40% of 200?',
    choices: ['20', '15', '30', '25'],
    answer: 0,
    explanation: '40% of 200 = 0.40 × 200 = 80. Then 25% of 80 = 0.25 × 80 = 20. Equivalently 0.25 × 0.40 × 200 = 0.10 × 200 = 20. Distractor 15 has no clean basis, 25 confuses with 25%, 30 = 15% of 200.'
  },
  {
    id: 'q-hsptqs-040',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 540,
    stem: 'If 3 times a number, decreased by 5, equals 16, what is the number?',
    choices: ['8', '7', '5', '6'],
    answer: 1,
    explanation: 'Set up: 3n − 5 = 16, so 3n = 21, so n = 7. Check: 3(7) − 5 = 21 − 5 = 16. Distractor 8 = 24/3 (used 16+8 instead of 16+5), 6 = 18/3, 5 too small.'
  },
  {
    id: 'q-hsptqs-041',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 470,
    stem: 'What is the average of 12, 18, and 24?',
    choices: ['16', '17', '20', '18'],
    answer: 3,
    explanation: 'Sum = 12 + 18 + 24 = 54. Average = 54 ÷ 3 = 18. (As a check, the middle of an evenly spaced set is the mean.) Distractor 16 = (12+24)/2 ignores the middle, 17 has no basis, 20 is too large.'
  },
  {
    id: 'q-hsptqs-042',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 510,
    stem: 'What number is 4 more than 1/3 of 36?',
    choices: ['8', '16', '12', '40'],
    answer: 1,
    explanation: '1/3 of 36 = 12. Then 4 more = 12 + 4 = 16. Distractor 8 = 12 − 4 (subtraction instead of addition), 12 ignores the "+4", 40 = 36 + 4.'
  },
  {
    id: 'q-hsptqs-043',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 690,
    stem: 'A number is increased by 20% to get 60. What was the original number?',
    choices: ['50', '72', '48', '40'],
    answer: 0,
    explanation: 'Let n be the original. n × 1.20 = 60, so n = 60 ÷ 1.20 = 50. Check: 50 + 20% of 50 = 50 + 10 = 60. Distractor 48 = 60 × 0.8 (subtracted 20% from 60 instead of solving), 40 = 60 − 20, 72 = 60 × 1.2.'
  },
  {
    id: 'q-hsptqs-044',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 700,
    stem: 'The product of two consecutive even integers is 168. What is the larger integer?',
    choices: ['16', '18', '12', '14'],
    answer: 3,
    explanation: 'Try pairs: 12 × 14 = 168. So the larger is 14. (Algebraically, n(n+2) = 168, n² + 2n − 168 = 0, n = 12.) Distractor 12 is the smaller, 16 too large (14 × 16 = 224), 18 way too large.'
  },
  {
    id: 'q-hsptqs-045',
    section: 'quantitative-skills',
    topic: 'manipulation',
    difficulty: 760,
    stem: 'If half of a number plus one-third of the same number equals 25, what is the number?',
    choices: ['30', '24', '36', '18'],
    answer: 0,
    explanation: 'Let n be the number. Then n/2 + n/3 = 25. Common denominator 6: 3n/6 + 2n/6 = 5n/6 = 25, so n = 30. Check: 30/2 + 30/3 = 15 + 10 = 25. Distractor 18 gives 9 + 6 = 15, 24 gives 12 + 8 = 20, 36 gives 18 + 12 = 30.'
  }
]);
