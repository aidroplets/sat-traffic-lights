/**
 * SAT Math — Batch 2 expansion.
 * Distributed across all 4 difficulty bands so the real-test sampler
 * has rich coverage. testType, section, state set explicitly per
 * question so the file inherits nothing from STL_QUESTIONS_AI_DEFAULTS
 * (which still has state='archived' from the 2026-05-06 bulk archive).
 */
'use strict';
window.STL_QUESTIONS_AI = (window.STL_QUESTIONS_AI || []).concat([
  // ============================================================
  // EASY BAND (10 @ 410–500)
  // ============================================================
  {
    id: 'q-satm-b2-001',
    testType: 'SAT',
    section: 'math',
    topic: 'linear-equations',
    difficulty: 420,
    state: 'unpublished',
    stem: 'If 3x + 7 = 25, what is the value of x?',
    choices: ['4', '8', '9', '6'],
    answer: 3,
    explanation: '3x + 7 = 25 → 3x = 18 → x = 6. (A) divides 25 by 6 wrongly; (B) is the value of x + 2; (C) divides 18 by 2 instead of 3.'
  },
  {
    id: 'q-satm-b2-002',
    testType: 'SAT',
    section: 'math',
    topic: 'percentages',
    difficulty: 430,
    state: 'unpublished',
    stem: 'A jacket originally priced at $80 is on sale for 15% off. What is the sale price?',
    choices: ['$12', '$65', '$68', '$95'],
    answer: 2,
    explanation: '15% of 80 is 12, so the sale price is 80 − 12 = $68. (A) gives only the discount, not the new price; (B) subtracts $15 instead of 15%; (D) adds the discount instead of subtracting it.'
  },
  {
    id: 'q-satm-b2-003',
    testType: 'SAT',
    section: 'math',
    topic: 'slope-intercept-form',
    difficulty: 450,
    state: 'unpublished',
    stem: 'What is the slope of the line y = -4x + 9?',
    choices: ['9', '4', '-4', '-9'],
    answer: 2,
    explanation: 'In y = mx + b form, m is the slope. Here m = -4. (A) and (D) confuse slope with intercept; (B) drops the negative sign.'
  },
  {
    id: 'q-satm-b2-004',
    testType: 'SAT',
    section: 'math',
    topic: 'ratios',
    difficulty: 440,
    state: 'unpublished',
    stem: 'In a class, the ratio of seniors to juniors is 5 to 3. If there are 24 juniors, how many seniors are there?',
    choices: ['8', '15', '40', '72'],
    answer: 2,
    explanation: 'Set up 5/3 = s/24, so s = (5)(24)/3 = 40. (A) divides 24 by 3; (B) multiplies 5 × 3; (D) multiplies 24 × 3.'
  },
  {
    id: 'q-satm-b2-005',
    testType: 'SAT',
    section: 'math',
    topic: 'exponents',
    difficulty: 460,
    state: 'unpublished',
    stem: 'What is the value of 2^3 \\cdot 2^4?',
    choices: ['2^7', '2^{12}', '4^7', '4^{12}'],
    answer: 0,
    explanation: 'Same base, add exponents: 2^3 · 2^4 = 2^{3+4} = 2^7. (B) multiplies exponents; (C) and (D) wrongly change the base.'
  },
  {
    id: 'q-satm-b2-006',
    testType: 'SAT',
    section: 'math',
    topic: 'statistics',
    difficulty: 470,
    state: 'unpublished',
    stem: 'What is the median of the data set {3, 8, 5, 12, 7, 9}?',
    choices: ['7', '8', '8.5', '7.5'],
    answer: 3,
    explanation: 'Sort: 3, 5, 7, 8, 9, 12. The two middle values are 7 and 8, so the median is (7 + 8)/2 = 7.5. (A) and (B) pick one middle value rather than averaging; (C) shifts by 1.'
  },
  {
    id: 'q-satm-b2-007',
    testType: 'SAT',
    section: 'math',
    topic: 'geometry',
    difficulty: 480,
    state: 'unpublished',
    stem: 'A rectangle has length 12 and width 5. What is its perimeter?',
    choices: ['17', '60', '120', '34'],
    answer: 3,
    explanation: 'Perimeter = 2(l + w) = 2(12 + 5) = 34. (A) just sums the two sides; (B) computes area; (C) doubles the area.'
  },
  {
    id: 'q-satm-b2-008',
    testType: 'SAT',
    section: 'math',
    topic: 'functions',
    difficulty: 490,
    state: 'unpublished',
    stem: 'If f(x) = x^2 - 3x + 2, what is f(4)?',
    choices: ['2', '12', '14', '6'],
    answer: 3,
    explanation: 'f(4) = 16 − 12 + 2 = 6. (A) computes only the constant term; (B) drops the middle term; (C) adds 14 by sign error.'
  },
  {
    id: 'q-satm-b2-009',
    testType: 'SAT',
    section: 'math',
    topic: 'inequalities',
    difficulty: 500,
    state: 'unpublished',
    stem: 'Which value of x is a solution to 2x − 5 > 7?',
    choices: ['5', '6', '7', '4'],
    answer: 2,
    explanation: '2x > 12, so x > 6. The only choice strictly greater than 6 is 7. (B) gives 2(6) − 5 = 7, not greater than 7; (A) and (D) are even smaller.'
  },
  {
    id: 'q-satm-b2-010',
    testType: 'SAT',
    section: 'math',
    topic: 'data-tables',
    difficulty: 480,
    state: 'unpublished',
    stem: 'A survey of 200 students recorded their primary commute. The frequencies were: bus 80, bike 30, walk 50, car 40. What fraction of students walk?',
    choices: ['\\frac{1}{5}', '\\frac{1}{4}', '\\frac{2}{5}', '\\frac{3}{10}'],
    answer: 1,
    explanation: '50 of 200 walk → 50/200 = 1/4. (A) is the car fraction; (C) is the bus fraction; (D) is the bike+walk combined.'
  },

  // ============================================================
  // MEDIUM BAND (14 @ 510–600)
  // ============================================================
  {
    id: 'q-satm-b2-011',
    testType: 'SAT',
    section: 'math',
    topic: 'systems-of-equations',
    difficulty: 520,
    state: 'unpublished',
    stem: 'If 2x + y = 11 and x − y = 1, what is the value of x?',
    choices: ['3', '5', '6', '4'],
    answer: 3,
    explanation: 'Add the two equations: 3x = 12, so x = 4. Then y = 3. (A) gives y; (B) and (C) come from sign errors when adding.'
  },
  {
    id: 'q-satm-b2-012',
    testType: 'SAT',
    section: 'math',
    topic: 'quadratics',
    difficulty: 540,
    state: 'unpublished',
    stem: 'What are the solutions to x^2 − 5x + 6 = 0?',
    choices: ['x = 2 and x = 3', 'x = -2 and x = -3', 'x = 1 and x = 6', 'x = -1 and x = -6'],
    answer: 0,
    explanation: 'Factor: (x − 2)(x − 3) = 0, giving x = 2 or x = 3. (B) sign-flips both roots; (C) and (D) factor the constant wrongly.'
  },
  {
    id: 'q-satm-b2-013',
    testType: 'SAT',
    section: 'math',
    topic: 'polynomials',
    difficulty: 530,
    state: 'unpublished',
    stem: 'What is the product (2x + 3)(x − 4)?',
    choices: ['2x^2 − 5x − 12', '2x^2 + 5x − 12', '2x^2 − 11x − 12', '2x^2 − 8x + 3'],
    answer: 0,
    explanation: 'FOIL: 2x·x + 2x·(−4) + 3·x + 3·(−4) = 2x² − 8x + 3x − 12 = 2x² − 5x − 12. (B) sign-flips the middle term; (C) sums absolute values; (D) drops the inner term.'
  },
  {
    id: 'q-satm-b2-014',
    testType: 'SAT',
    section: 'math',
    topic: 'slope-intercept-form',
    difficulty: 550,
    state: 'unpublished',
    stem: 'A line passes through (2, 3) and (6, 11). What is its slope?',
    choices: ['2', '\\frac{1}{2}', '4', '8'],
    answer: 0,
    explanation: 'Slope = (11 − 3)/(6 − 2) = 8/4 = 2. (B) inverts rise and run; (C) is just the run; (D) is just the rise.'
  },
  {
    id: 'q-satm-b2-015',
    testType: 'SAT',
    section: 'math',
    topic: 'percentages',
    difficulty: 560,
    state: 'unpublished',
    stem: 'A population grows from 250 to 320 in one year. What is the percent increase, rounded to the nearest whole percent?',
    choices: ['22%', '70%', '128%', '28%'],
    answer: 3,
    explanation: 'Increase = 320 − 250 = 70. Percent change = 70/250 = 0.28 = 28%. (A) divides 70 by 320; (B) reports raw increase as percent; (C) is the new value as a percent of the old, not the change.'
  },
  {
    id: 'q-satm-b2-016',
    testType: 'SAT',
    section: 'math',
    topic: 'exponents',
    difficulty: 570,
    state: 'unpublished',
    stem: 'Which expression is equivalent to \\frac{x^7}{x^3} for x \\ne 0?',
    choices: ['x^4', 'x^{10}', 'x^{21}', '\\frac{1}{x^4}'],
    answer: 0,
    explanation: 'Same base, subtract exponents: x^{7−3} = x^4. (B) adds exponents; (C) multiplies them; (D) flips the sign of the exponent.'
  },
  {
    id: 'q-satm-b2-017',
    testType: 'SAT',
    section: 'math',
    topic: 'ratios',
    difficulty: 580,
    state: 'unpublished',
    stem: 'A recipe calls for flour and sugar in a 4:1 ratio by weight. To make a batch using 600 g of flour and sugar combined, how much flour is required?',
    choices: ['120 g', '400 g', '450 g', '480 g'],
    answer: 3,
    explanation: 'Total parts = 5; flour = (4/5)(600) = 480 g. (A) computes the sugar; (B) takes 4/6 instead of 4/5; (C) takes 3/4 of 600.'
  },
  {
    id: 'q-satm-b2-018',
    testType: 'SAT',
    section: 'math',
    topic: 'statistics',
    difficulty: 590,
    state: 'unpublished',
    stem: 'The mean of five numbers is 14. If a sixth number is added and the new mean becomes 15, what is the sixth number?',
    choices: ['15', '17', '20', '21'],
    answer: 2,
    explanation: 'Original sum = 5 × 14 = 70. New sum = 6 × 15 = 90. The added value is 90 − 70 = 20. (A) just repeats the new mean; (B) adds 2 incorrectly; (D) miscounts the new total.'
  },
  {
    id: 'q-satm-b2-019',
    testType: 'SAT',
    section: 'math',
    topic: 'geometry',
    difficulty: 540,
    state: 'unpublished',
    stem: 'A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?',
    choices: ['13', '21', '\\sqrt{218}', '15'],
    answer: 3,
    explanation: 'h² = 81 + 144 = 225, so h = √225 = 15. (A) is a 5-12-13 confusion; (B) just sums the legs; (C) miscomputes 81 + 137.'
  },
  {
    id: 'q-satm-b2-020',
    testType: 'SAT',
    section: 'math',
    topic: 'trigonometry-basics',
    difficulty: 560,
    state: 'unpublished',
    stem: 'In a right triangle, the side opposite angle A has length 7 and the hypotenuse has length 25. What is sin A?',
    choices: ['\\frac{7}{25}', '\\frac{24}{25}', '\\frac{7}{24}', '\\frac{25}{7}'],
    answer: 0,
    explanation: 'sin A = opposite/hypotenuse = 7/25. (B) gives cos A (adjacent leg is 24); (C) gives tan A; (D) inverts the ratio.'
  },
  {
    id: 'q-satm-b2-021',
    testType: 'SAT',
    section: 'math',
    topic: 'polynomials',
    difficulty: 570,
    state: 'unpublished',
    stem: 'What is the result of (x^2 + 3x − 4) − (x^2 − 5x + 6)?',
    choices: ['8x − 10', '−2x − 10', '8x + 2', '−2x + 2'],
    answer: 0,
    explanation: 'Distribute the minus: (x² + 3x − 4) − (x² − 5x + 6) = x² − x² + 3x + 5x − 4 − 6 = 8x − 10. (B) sign-flips the x term; (C) and (D) drop the minus on the constant.'
  },
  {
    id: 'q-satm-b2-022',
    testType: 'SAT',
    section: 'math',
    topic: 'inequalities',
    difficulty: 580,
    state: 'unpublished',
    stem: 'How many integer values of x satisfy −3 \\le 2x + 1 < 9?',
    choices: ['5', '6', '7', '8'],
    answer: 1,
    explanation: 'Subtract 1: −4 ≤ 2x < 8. Divide by 2: −2 ≤ x < 4. Integers: −2, −1, 0, 1, 2, 3 — six values. (A) drops the −2; (C) includes 4; (D) over-counts.'
  },
  {
    id: 'q-satm-b2-023',
    testType: 'SAT',
    section: 'math',
    topic: 'exponential-functions',
    difficulty: 600,
    state: 'unpublished',
    stem: 'A bacteria culture doubles every 4 hours and starts at 50 cells. Which expression gives the population after t hours?',
    choices: ['50 \\cdot 2^{t}', '50 \\cdot 2^{t/4}', '50 + 2t', '50 \\cdot 4^{t/2}'],
    answer: 1,
    explanation: 'Doubling every 4 hours means the exponent is t/4: P(t) = 50 · 2^{t/4}. (A) doubles every hour; (C) is linear; (D) misuses base 4.'
  },
  {
    id: 'q-satm-b2-024',
    testType: 'SAT',
    section: 'math',
    topic: 'data-tables',
    difficulty: 540,
    state: 'unpublished',
    stem: 'A two-way table records favorite season by class. Of 60 ninth graders, 18 prefer summer; of 90 tenth graders, 36 prefer summer. What fraction of all students who prefer summer are tenth graders?',
    choices: ['\\frac{1}{3}', '\\frac{2}{5}', '\\frac{2}{3}', '\\frac{3}{5}'],
    answer: 2,
    explanation: 'Total summer = 18 + 36 = 54; tenth graders = 36. Fraction = 36/54 = 2/3. (A) inverts to ninth graders; (B) is 36/90 (within-class rate); (D) is a distractor close to 2/3.'
  },

  // ============================================================
  // HARD BAND (12 @ 610–700)
  // ============================================================
  {
    id: 'q-satm-b2-025',
    testType: 'SAT',
    section: 'math',
    topic: 'linear-equations',
    difficulty: 620,
    state: 'unpublished',
    stem: 'If \\frac{2x − 5}{3} = \\frac{x + 4}{2}, what is the value of x?',
    choices: ['22', '11', '−22', '\\frac{2}{3}'],
    answer: 0,
    explanation: 'Cross-multiply: 2(2x − 5) = 3(x + 4) → 4x − 10 = 3x + 12 → x = 22. (B) drops a factor of 2; (C) sign-flips; (D) is a fraction left over from a partial step.'
  },
  {
    id: 'q-satm-b2-026',
    testType: 'SAT',
    section: 'math',
    topic: 'systems-of-equations',
    difficulty: 640,
    state: 'unpublished',
    stem: 'A movie theater sells 200 tickets and earns $1,840. Adult tickets cost $12 and child tickets cost $7. How many adult tickets were sold?',
    choices: ['72', '112', '128', '88'],
    answer: 3,
    explanation: 'Let a = adult tickets. Then 12a + 7(200 − a) = 1840 → 12a + 1400 − 7a = 1840 → 5a = 440 → a = 88. (A) and (C) come from arithmetic slips; (B) gives the child total.'
  },
  {
    id: 'q-satm-b2-027',
    testType: 'SAT',
    section: 'math',
    topic: 'quadratics',
    difficulty: 650,
    state: 'unpublished',
    stem: 'The parabola y = x^2 − 6x + 11 has its vertex at which point?',
    choices: ['(3, 2)', '(−3, 2)', '(3, 20)', '(6, 11)'],
    answer: 0,
    explanation: 'Vertex x = −b/(2a) = 6/2 = 3. y at x = 3: 9 − 18 + 11 = 2. So vertex is (3, 2). (B) flips the sign; (C) misuses the formula; (D) reads coefficients as coordinates.'
  },
  {
    id: 'q-satm-b2-028',
    testType: 'SAT',
    section: 'math',
    topic: 'polynomials',
    difficulty: 670,
    state: 'unpublished',
    stem: 'If (x − 3) is a factor of p(x) = x^3 − 4x^2 + ax − 6, what is the value of a?',
    choices: ['1', '3', '5', '7'],
    answer: 2,
    explanation: 'By the Factor Theorem, p(3) = 0: 27 − 36 + 3a − 6 = 0 → 3a − 15 = 0 → a = 5. (A) and (B) come from arithmetic slips on the constant term; (D) drops the −6.'
  },
  {
    id: 'q-satm-b2-029',
    testType: 'SAT',
    section: 'math',
    topic: 'percentages',
    difficulty: 660,
    state: 'unpublished',
    stem: 'A stock loses 20% of its value in March and then gains 25% in April. If it started March at $80, what is its value at the end of April?',
    choices: ['$76', '$80', '$84', '$100'],
    answer: 1,
    explanation: 'After March: 80 × 0.80 = 64. After April: 64 × 1.25 = 80. The losses and gains exactly cancel. (A) and (C) come from naive subtraction or addition of percents; (D) keeps the gain on the original $80.'
  },
  {
    id: 'q-satm-b2-030',
    testType: 'SAT',
    section: 'math',
    topic: 'geometry',
    difficulty: 680,
    state: 'unpublished',
    stem: 'A circle has area 49\\pi. What is the circumference of the circle?',
    choices: ['7\\pi', '14\\pi', '49\\pi', '98\\pi'],
    answer: 1,
    explanation: 'πr² = 49π → r = 7. Circumference = 2πr = 14π. (A) drops the factor of 2; (C) confuses circumference with area; (D) doubles again unnecessarily.'
  },
  {
    id: 'q-satm-b2-031',
    testType: 'SAT',
    section: 'math',
    topic: 'trigonometry-basics',
    difficulty: 660,
    state: 'unpublished',
    stem: 'In a right triangle, sin\\theta = \\frac{3}{5}. What is cos\\theta?',
    choices: ['\\frac{3}{4}', '\\frac{4}{5}', '\\frac{5}{3}', '\\frac{5}{4}'],
    answer: 1,
    explanation: 'If sin θ = opposite/hypotenuse = 3/5, then by the Pythagorean identity cos² θ = 1 − 9/25 = 16/25, so cos θ = 4/5 (positive in first quadrant). (A) gives tan θ; (C) and (D) invert ratios.'
  },
  {
    id: 'q-satm-b2-032',
    testType: 'SAT',
    section: 'math',
    topic: 'functions',
    difficulty: 690,
    state: 'unpublished',
    stem: 'The function f is defined by f(x) = ax + b. If f(2) = 7 and f(5) = 19, what is the value of a + b?',
    choices: ['1', '4', '7', '11'],
    answer: 0,
    explanation: 'Slope a = (19 − 7)/(5 − 2) = 4. Then 4(2) + b = 7 → b = −3. So a + b = 4 + (−3) = 1. (B) gives just a; (C) gives just f(2); (D) sums absolute values incorrectly.'
  },
  {
    id: 'q-satm-b2-033',
    testType: 'SAT',
    section: 'math',
    topic: 'exponential-functions',
    difficulty: 670,
    state: 'unpublished',
    stem: 'A radioactive sample decays such that 10% of its mass is lost each year. If the sample starts at 200 g, which expression gives its mass in grams after t years?',
    choices: ['200(0.10)^t', '200(1.10)^t', '200 − 20t', '200(0.90)^t'],
    answer: 3,
    explanation: 'Each year, 90% remains: M(t) = 200(0.90)^t. (A) keeps only the 10% lost; (B) is exponential growth; (C) is linear decay, which would go negative.'
  },
  {
    id: 'q-satm-b2-034',
    testType: 'SAT',
    section: 'math',
    topic: 'inequalities',
    difficulty: 630,
    state: 'unpublished',
    stem: 'A sandwich shop spends $400 per day on fixed costs and $3 in materials per sandwich. Each sandwich sells for $7. What is the minimum number of sandwiches the shop must sell in a day to make at least $200 in profit?',
    choices: ['100', '120', '150', '200'],
    answer: 2,
    explanation: 'Profit = 7n − (400 + 3n) = 4n − 400. Need 4n − 400 ≥ 200 → n ≥ 150. (A) covers only fixed costs; (B) is a midpoint slip; (D) doubles the answer.'
  },
  {
    id: 'q-satm-b2-035',
    testType: 'SAT',
    section: 'math',
    topic: 'statistics',
    difficulty: 700,
    state: 'unpublished',
    stem: 'A data set has 12 values with mean 30. If a thirteenth value is added and the new mean is 32, what is the value that was added?',
    choices: ['32', '46', '50', '56'],
    answer: 3,
    explanation: 'Original sum = 12 × 30 = 360. New sum = 13 × 32 = 416. The added value is 416 − 360 = 56. (A) just gives the new mean; (B) and (C) come from arithmetic slips when computing the new sum.'
  },
  {
    id: 'q-satm-b2-036',
    testType: 'SAT',
    section: 'math',
    topic: 'data-tables',
    difficulty: 640,
    state: 'unpublished',
    stem: 'A survey of 250 customers classified each as a member or guest and as choosing delivery or pickup. 150 customers were members, and 90 of those members chose delivery. How many members chose pickup?',
    choices: ['40', '60', '90', '100'],
    answer: 1,
    explanation: '150 members total, 90 chose delivery, so 150 − 90 = 60 chose pickup. (A) and (D) come from arithmetic slips; (C) just restates the delivery count.'
  },

  // ============================================================
  // INSANE BAND (4 @ 710–800)
  // ============================================================
  {
    id: 'q-satm-b2-037',
    testType: 'SAT',
    section: 'math',
    topic: 'quadratics',
    difficulty: 730,
    state: 'unpublished',
    stem: 'For what value of c does the equation x^2 + 6x + c = 0 have exactly one real solution?',
    choices: ['3', '6', '9', '36'],
    answer: 2,
    explanation: 'Exactly one real solution means discriminant b² − 4ac = 0: 36 − 4c = 0 → c = 9. (A) takes b/2; (B) gives just b; (D) gives b² without dividing.'
  },
  {
    id: 'q-satm-b2-038',
    testType: 'SAT',
    section: 'math',
    topic: 'systems-of-equations',
    difficulty: 750,
    state: 'unpublished',
    stem: 'The system 3x + 2y = 12 and 6x + ky = 30 has no solution. What is the value of k?',
    choices: ['2', '3', '4', '5'],
    answer: 2,
    explanation: 'No solution means the lines are parallel but distinct: the left sides are proportional but the right sides are not. Multiply the first equation by 2: 6x + 4y = 24. For parallel lines, k must equal 4 (matching the y-coefficient ratio); 30 ≠ 24, so the lines are distinct. (A) and (B) ignore the doubling factor; (D) over-shoots.'
  },
  {
    id: 'q-satm-b2-039',
    testType: 'SAT',
    section: 'math',
    topic: 'exponential-functions',
    difficulty: 770,
    state: 'unpublished',
    stem: 'A population P(t) = 800 \\cdot (1.05)^t models a town\'s growth, where t is in years. Approximately how many years will it take for the population to double?',
    choices: ['10', '14', '20', '36'],
    answer: 1,
    explanation: 'Doubling: 1.05^t = 2. Take logs: t = log(2)/log(1.05) ≈ 0.693/0.0488 ≈ 14.2 years. The "Rule of 72" gives 72/5 ≈ 14.4. (A) underestimates; (C) and (D) come from confusing percent rate with linear growth.'
  },
  {
    id: 'q-satm-b2-040',
    testType: 'SAT',
    section: 'math',
    topic: 'trigonometry-basics',
    difficulty: 790,
    state: 'unpublished',
    stem: 'In a right triangle, sin(A) = cos(B), where A and B are the two acute angles. If A = 2x + 10 (degrees) and B = 4x − 10 (degrees), what is the value of x?',
    choices: ['10', '15', '20', '25'],
    answer: 1,
    explanation: 'For complementary acute angles in a right triangle, sin(A) = cos(B) iff A + B = 90°. So (2x + 10) + (4x − 10) = 90 → 6x = 90 → x = 15. (A) and (D) come from arithmetic slips; (C) ignores the +10/−10 cancellation.'
  }
]);
