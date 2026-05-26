/**
 * SAT Traffic Lights — seed question bank.
 *
 * Each question:
 *   id          string, unique
 *   section     'math' | 'reading' | 'writing'
 *   difficulty  'easy' | 'medium' | 'hard' | 'insane'
 *   topic       short tag, used by the regenerate-from-misses step
 *   passage     optional context (reading / data questions)
 *   stem        the question itself
 *   choices     array of strings (omit for grid-in)
 *   answer      index into choices, or string for grid-in
 *   explanation 1–3 sentence walkthrough shown in review
 *
 * This file is a STARTER set. Drop more items into the array and they show up
 * automatically. Target: 1,000+ items (mix of generated and curated).
 */
window.STL_QUESTIONS = [
  // ============================================================ MATH · EASY
  {
    id: 'm-e-001', section: 'math', difficulty: 'easy', topic: 'algebra',
    stem: 'If 3x + 5 = 20, what is the value of x?',
    choices: ['3', '5', '7', '15'],
    answer: 1,
    explanation: 'Subtract 5 from both sides: 3x = 15. Divide by 3: x = 5.'
  },
  {
    id: 'm-e-002', section: 'math', difficulty: 'easy', topic: 'percents',
    stem: 'What is 20% of 250?',
    choices: ['25', '40', '50', '60'],
    answer: 2,
    explanation: '20% = 0.20. 0.20 × 250 = 50.'
  },
  {
    id: 'm-e-003', section: 'math', difficulty: 'easy', topic: 'linear-equations',
    stem: 'A line has slope 2 and passes through (0, 3). What is its equation?',
    choices: ['y = 2x − 3', 'y = 2x + 3', 'y = 3x + 2', 'y = −2x + 3'],
    answer: 1,
    explanation: 'Slope-intercept form: y = mx + b with m = 2 and b = 3.'
  },
  {
    id: 'm-e-004', section: 'math', difficulty: 'easy', topic: 'ratios',
    stem: 'The ratio of cats to dogs in a shelter is 3 : 5. If there are 24 animals total, how many are cats?',
    choices: ['8', '9', '12', '15'],
    answer: 1,
    explanation: '3 + 5 = 8 parts. 24 ÷ 8 = 3 per part. Cats = 3 × 3 = 9.'
  },
  {
    id: 'm-e-005', section: 'math', difficulty: 'easy', topic: 'geometry',
    stem: 'A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?',
    choices: ['10', '12', '14', '√48'],
    answer: 0,
    explanation: '6² + 8² = 36 + 64 = 100. √100 = 10.'
  },
  {
    id: 'm-e-006', section: 'math', difficulty: 'easy', topic: 'exponents',
    stem: 'Simplify: 2³ · 2².',
    choices: ['2⁵', '2⁶', '4⁵', '4⁶'],
    answer: 0,
    explanation: 'When multiplying powers with the same base, add exponents: 3 + 2 = 5.'
  },
  {
    id: 'm-e-007', section: 'math', difficulty: 'easy', topic: 'word-problem',
    stem: 'A shirt that normally costs $40 is on sale for 25% off. What is the sale price?',
    choices: ['$10', '$15', '$30', '$35'],
    answer: 2,
    explanation: '25% of $40 is $10. $40 − $10 = $30.'
  },
  {
    id: 'm-e-008', section: 'math', difficulty: 'easy', topic: 'fractions',
    stem: 'What is 1/2 + 1/3?',
    choices: ['1/5', '2/5', '5/6', '2/6'],
    answer: 2,
    explanation: 'Common denominator 6: 3/6 + 2/6 = 5/6.'
  },
  {
    id: 'm-e-009', section: 'math', difficulty: 'easy', topic: 'algebra',
    stem: 'If 2(x − 4) = 10, what is x?',
    choices: ['1', '7', '9', '14'],
    answer: 2,
    explanation: 'Distribute or divide: x − 4 = 5, so x = 9.'
  },
  {
    id: 'm-e-010', section: 'math', difficulty: 'easy', topic: 'units',
    stem: 'A car travels 180 miles in 3 hours. What is its average speed in miles per hour?',
    choices: ['45', '54', '60', '72'],
    answer: 2,
    explanation: 'Speed = distance ÷ time = 180 ÷ 3 = 60 mph.'
  },
  {
    id: 'm-e-011', section: 'math', difficulty: 'easy', topic: 'mean',
    stem: 'What is the mean of 4, 6, 8, 10, 12?',
    choices: ['7', '8', '9', '10'],
    answer: 1,
    explanation: 'Sum = 40, count = 5, mean = 40 ÷ 5 = 8.'
  },
  {
    id: 'm-e-012', section: 'math', difficulty: 'easy', topic: 'algebra',
    stem: 'If y = 4x and x = 7, what is y?',
    choices: ['11', '21', '24', '28'],
    answer: 3,
    explanation: 'Substitute: y = 4 × 7 = 28.'
  },

  // ========================================================== MATH · MEDIUM
  {
    id: 'm-m-001', section: 'math', difficulty: 'medium', topic: 'systems',
    stem: 'If 2x + y = 10 and x − y = 2, what is the value of x?',
    choices: ['2', '3', '4', '6'],
    answer: 2,
    explanation: 'Add equations: 3x = 12, so x = 4. (Then y = 2.)'
  },
  {
    id: 'm-m-002', section: 'math', difficulty: 'medium', topic: 'quadratics',
    stem: 'What are the solutions to x² − 5x + 6 = 0?',
    choices: ['x = 1, 6', 'x = 2, 3', 'x = −2, −3', 'x = −1, 6'],
    answer: 1,
    explanation: 'Factor: (x − 2)(x − 3) = 0, giving x = 2 or x = 3.'
  },
  {
    id: 'm-m-003', section: 'math', difficulty: 'medium', topic: 'functions',
    stem: 'If f(x) = 2x² − 3, what is f(4)?',
    choices: ['13', '21', '29', '32'],
    answer: 2,
    explanation: 'f(4) = 2(16) − 3 = 32 − 3 = 29.'
  },
  {
    id: 'm-m-004', section: 'math', difficulty: 'medium', topic: 'percents',
    stem: 'A price increases from 80 to 100. What is the percent increase?',
    choices: ['20%', '25%', '80%', '125%'],
    answer: 1,
    explanation: 'Change = 20. Percent increase = 20 ÷ 80 = 25%.'
  },
  {
    id: 'm-m-005', section: 'math', difficulty: 'medium', topic: 'geometry',
    stem: 'A circle has radius 5. What is its area?',
    choices: ['10π', '20π', '25π', '50π'],
    answer: 2,
    explanation: 'Area = πr² = π · 25 = 25π.'
  },
  {
    id: 'm-m-006', section: 'math', difficulty: 'medium', topic: 'linear-equations',
    stem: 'A line passes through (1, 4) and (3, 10). What is its slope?',
    choices: ['2', '3', '6', '7/2'],
    answer: 1,
    explanation: 'Slope = (10 − 4) ÷ (3 − 1) = 6 ÷ 2 = 3.'
  },
  {
    id: 'm-m-007', section: 'math', difficulty: 'medium', topic: 'exponents',
    stem: 'If 3ˣ = 81, what is x?',
    choices: ['2', '3', '4', '5'],
    answer: 2,
    explanation: '81 = 3⁴, so x = 4.'
  },
  {
    id: 'm-m-008', section: 'math', difficulty: 'medium', topic: 'inequalities',
    stem: 'Which value of x satisfies 2x − 5 > 7?',
    choices: ['x = 5', 'x = 6', 'x = 7', 'x = 4'],
    answer: 2,
    explanation: '2x > 12, so x > 6. Among the choices, 7 is the only value > 6.'
  },
  {
    id: 'm-m-009', section: 'math', difficulty: 'medium', topic: 'word-problem',
    stem: 'Maria runs at 6 mph. How long, in minutes, will it take her to run 9 miles?',
    choices: ['54', '60', '75', '90'],
    answer: 3,
    explanation: 'Time = 9 ÷ 6 = 1.5 hours = 90 minutes.'
  },
  {
    id: 'm-m-010', section: 'math', difficulty: 'medium', topic: 'statistics',
    stem: 'The mean of five numbers is 12. Four of them are 10, 11, 13, and 14. What is the fifth?',
    choices: ['10', '11', '12', '13'],
    answer: 2,
    explanation: 'Sum must be 60. 10 + 11 + 13 + 14 = 48. Fifth = 60 − 48 = 12.'
  },
  {
    id: 'm-m-011', section: 'math', difficulty: 'medium', topic: 'geometry',
    stem: 'A rectangle has perimeter 30 and width 5. What is its length?',
    choices: ['5', '10', '15', '20'],
    answer: 1,
    explanation: 'P = 2(L + W). 30 = 2(L + 5) → L + 5 = 15 → L = 10.'
  },
  {
    id: 'm-m-012', section: 'math', difficulty: 'medium', topic: 'probability',
    stem: 'A bag has 3 red, 4 blue, and 5 green marbles. What is the probability of drawing a blue marble?',
    choices: ['1/4', '1/3', '4/12', '4/9'],
    answer: 1,
    explanation: 'Total = 12. P(blue) = 4/12 = 1/3.'
  },

  // ============================================================ MATH · HARD
  {
    id: 'm-h-001', section: 'math', difficulty: 'hard', topic: 'quadratics',
    stem: 'If x² + bx + 16 = 0 has exactly one real solution, what is the positive value of b?',
    choices: ['4', '6', '8', '16'],
    answer: 2,
    explanation: 'One solution ↔ discriminant = 0. b² − 4(1)(16) = 0 → b² = 64 → b = 8 (positive).'
  },
  {
    id: 'm-h-002', section: 'math', difficulty: 'hard', topic: 'systems',
    stem: 'If 3a + 4b = 17 and a + 2b = 7, what is a?',
    choices: ['1', '3', '5', '7'],
    answer: 1,
    explanation: 'Multiply 2nd eq by 2: 2a + 4b = 14. Subtract from 1st: a = 3.'
  },
  {
    id: 'm-h-003', section: 'math', difficulty: 'hard', topic: 'functions',
    stem: 'If g(x) = (x + 2)² − 5, what is the minimum value of g?',
    choices: ['−5', '−2', '0', '2'],
    answer: 0,
    explanation: '(x + 2)² is minimized at x = −2, where it equals 0. So g_min = 0 − 5 = −5.'
  },
  {
    id: 'm-h-004', section: 'math', difficulty: 'hard', topic: 'geometry',
    stem: 'A right triangle has legs of length x and x + 7, and hypotenuse 13. What is x?',
    choices: ['4', '5', '6', '12'],
    answer: 1,
    explanation: 'x² + (x + 7)² = 169 → 2x² + 14x + 49 = 169 → x² + 7x − 60 = 0 → (x + 12)(x − 5) = 0 → x = 5.'
  },
  {
    id: 'm-h-005', section: 'math', difficulty: 'hard', topic: 'exponents',
    stem: 'If 2ˣ⁺¹ = 32, what is x?',
    choices: ['3', '4', '5', '6'],
    answer: 1,
    explanation: '32 = 2⁵, so x + 1 = 5, giving x = 4.'
  },
  {
    id: 'm-h-006', section: 'math', difficulty: 'hard', topic: 'rational',
    stem: 'Solve for x: (x + 1)/(x − 2) = 3.',
    choices: ['7/2', '5/2', '3', '4'],
    answer: 0,
    explanation: 'x + 1 = 3(x − 2) → x + 1 = 3x − 6 → 7 = 2x → x = 7/2.'
  },
  {
    id: 'm-h-007', section: 'math', difficulty: 'hard', topic: 'statistics',
    stem: 'A data set has mean 50 and standard deviation 5. A new value of 50 is added. What happens to the standard deviation?',
    choices: ['Increases', 'Decreases', 'Stays the same', 'Cannot be determined'],
    answer: 1,
    explanation: 'Adding a value equal to the mean reduces average squared deviation, so the standard deviation decreases.'
  },
  {
    id: 'm-h-008', section: 'math', difficulty: 'hard', topic: 'geometry',
    stem: 'A circle is inscribed in a square of side 8. What is the area of the region inside the square but outside the circle?',
    choices: ['64 − 16π', '64 − 8π', '64 − 4π', '32 − 8π'],
    answer: 0,
    explanation: 'Square area = 64. Inscribed circle has radius 4, area = 16π. Difference = 64 − 16π.'
  },
  {
    id: 'm-h-009', section: 'math', difficulty: 'hard', topic: 'word-problem',
    stem: 'A solution is 30% salt. How many liters of pure water must be added to 10 L of solution to make it 20% salt?',
    choices: ['2', '3', '5', '10'],
    answer: 2,
    explanation: 'Salt content stays 3 L. Need 3 / (10 + w) = 0.20 → 10 + w = 15 → w = 5.'
  },
  {
    id: 'm-h-010', section: 'math', difficulty: 'hard', topic: 'trig',
    stem: 'In a right triangle, sin θ = 3/5. What is cos θ (assuming θ is acute)?',
    choices: ['3/4', '4/5', '5/4', '5/3'],
    answer: 1,
    explanation: 'A 3-4-5 triangle: opposite = 3, hypotenuse = 5, adjacent = 4. cos θ = 4/5.'
  },
  {
    id: 'm-h-011', section: 'math', difficulty: 'hard', topic: 'percents',
    stem: 'A price is increased by 20%, then decreased by 20%. The final price is what percent of the original?',
    choices: ['96%', '98%', '100%', '104%'],
    answer: 0,
    explanation: '1.20 × 0.80 = 0.96, i.e. 96% of the original.'
  },
  {
    id: 'm-h-012', section: 'math', difficulty: 'hard', topic: 'systems',
    stem: 'For what value of k does the system 2x + 3y = 6 and 4x + ky = 12 have infinitely many solutions?',
    choices: ['3', '4', '6', '8'],
    answer: 2,
    explanation: 'Second equation must be a multiple of the first. 4 = 2·2, 12 = 2·6, so k = 2·3 = 6.'
  },

  // ========================================================== MATH · INSANE
  {
    id: 'm-i-001', section: 'math', difficulty: 'insane', topic: 'quadratics',
    stem: 'The parabola y = ax² + bx + c passes through (0, 3), (1, 2), and (2, 3). What is a + b + c?',
    choices: ['1', '2', '3', '4'],
    answer: 1,
    explanation: 'a + b + c is just y at x = 1, which is given as 2.'
  },
  {
    id: 'm-i-002', section: 'math', difficulty: 'insane', topic: 'functions',
    stem: 'Which statement best describes the symmetry of f(x) = x³ − x?',
    choices: [
      'f is even (f(−x) = f(x) for all x)',
      'f is odd (f(−x) = −f(x) for all x)',
      'f is neither even nor odd',
      'f is both even and odd'
    ],
    answer: 1,
    explanation: 'f(−x) = (−x)³ − (−x) = −x³ + x = −(x³ − x) = −f(x). That is the definition of an odd function.'
  },
  {
    id: 'm-i-003', section: 'math', difficulty: 'insane', topic: 'geometry',
    stem: 'An equilateral triangle and a regular hexagon have equal perimeters. What is the ratio of the area of the triangle to the area of the hexagon?',
    choices: ['1 : 2', '2 : 3', '3 : 4', '1 : 6'],
    answer: 1,
    explanation: 'Equal perimeter: triangle side 2s, hexagon side s. Triangle area = √3·s². Hexagon area = (3√3/2)·s². Ratio = √3 / (3√3/2) = 2/3.'
  },
  {
    id: 'm-i-004', section: 'math', difficulty: 'insane', topic: 'logs',
    stem: 'If log₂(x) + log₂(x − 6) = 4, what is x?',
    choices: ['2', '4', '8', '10'],
    answer: 2,
    explanation: 'log₂[x(x − 6)] = 4 → x(x − 6) = 16 → x² − 6x − 16 = 0 → (x − 8)(x + 2) = 0. Domain forces x = 8.'
  },
  {
    id: 'm-i-005', section: 'math', difficulty: 'insane', topic: 'sequences',
    stem: 'In an arithmetic sequence, the 4th term is 14 and the 9th term is 34. What is the 1st term?',
    choices: ['2', '4', '6', '10'],
    answer: 0,
    explanation: 'Common difference d = (34 − 14) / (9 − 4) = 4. a₁ = a₄ − 3d = 14 − 12 = 2.'
  },
  {
    id: 'm-i-006', section: 'math', difficulty: 'insane', topic: 'complex',
    stem: 'What is (2 + 3i)(2 − 3i)?',
    choices: ['4 − 9i', '4 + 9i', '13', '−5'],
    answer: 2,
    explanation: 'Difference of squares: 2² − (3i)² = 4 − (−9) = 13.'
  },
  {
    id: 'm-i-007', section: 'math', difficulty: 'insane', topic: 'systems',
    stem: 'What is the smallest positive value of k for which the line y = kx + 1 is tangent to the parabola y = x² + 2?',
    choices: ['1', '2', '3', '4'],
    answer: 1,
    explanation: 'Set equal: x² − kx + 1 = 0. Tangent ↔ discriminant 0: k² − 4 = 0, so k = ±2. Smallest positive value is 2.'
  },
  {
    id: 'm-i-008', section: 'math', difficulty: 'insane', topic: 'statistics',
    stem: 'A list of 7 distinct positive integers has median 10. What is the smallest possible value of the largest number?',
    choices: ['11', '12', '13', '14'],
    answer: 2,
    explanation: 'Median of 7 is the 4th. The three above must be > 10 and distinct: smallest are 11, 12, 13. So the largest is 13.'
  },
  {
    id: 'm-i-009', section: 'math', difficulty: 'insane', topic: 'geometry',
    stem: 'A cube has surface area 96. What is its volume?',
    choices: ['16', '32', '64', '96'],
    answer: 2,
    explanation: '6s² = 96 → s² = 16 → s = 4. Volume = s³ = 64.'
  },
  {
    id: 'm-i-010', section: 'math', difficulty: 'insane', topic: 'probability',
    stem: 'Two fair six-sided dice are rolled. What is the probability that the sum is exactly 8?',
    choices: ['1/9', '5/36', '1/6', '7/36'],
    answer: 1,
    explanation: 'Pairs summing to 8: (2,6),(3,5),(4,4),(5,3),(6,2) → 5 of 36.'
  },

  // ========================================================= READING · EASY
  {
    id: 'r-e-001', section: 'reading', difficulty: 'easy', topic: 'main-idea',
    passage: 'Ferns are some of the oldest plants on Earth. They reproduce using spores rather than seeds, and most species thrive in shaded, damp environments such as forest floors and stream banks.',
    stem: 'The main idea of the passage is best described as:',
    choices: [
      'Ferns are dying out due to habitat loss.',
      'Ferns are ancient plants with distinctive reproductive and habitat traits.',
      'Ferns are the most common plants in tropical climates.',
      'Ferns require sunlight to reproduce successfully.'
    ],
    answer: 1,
    explanation: 'The passage states ferns are old, reproduce by spores, and live in shaded damp habitats — a description of their key traits.'
  },
  {
    id: 'r-e-002', section: 'reading', difficulty: 'easy', topic: 'vocabulary',
    passage: 'The lecture was so dry that within ten minutes most students had begun to fidget restlessly in their seats.',
    stem: 'As used in the sentence, "dry" most nearly means:',
    choices: ['arid', 'dehydrated', 'tedious', 'humorless'],
    answer: 2,
    explanation: 'Context: students are restless within minutes — the lecture is boring. "Tedious" matches.'
  },
  {
    id: 'r-e-003', section: 'reading', difficulty: 'easy', topic: 'detail',
    passage: 'Honeybees communicate the location of food sources by performing a waggle dance inside the hive. The angle of the dance relative to vertical indicates the direction of the food relative to the sun.',
    stem: 'According to the passage, the angle of the waggle dance corresponds to:',
    choices: [
      'the distance to the food',
      'the type of flower',
      'the direction of the food relative to the sun',
      'the time of day'
    ],
    answer: 2,
    explanation: 'The passage explicitly says the angle indicates direction relative to the sun.'
  },
  {
    id: 'r-e-004', section: 'reading', difficulty: 'easy', topic: 'inference',
    passage: 'When Marcus saw his report card, he immediately texted his sister: "I have to tell Mom and Dad before they get the email tomorrow."',
    stem: 'It can reasonably be inferred from the text that Marcus:',
    choices: [
      'received excellent grades',
      'is worried about his parents’ reaction',
      'wants help studying',
      'is planning to drop out'
    ],
    answer: 1,
    explanation: 'Wanting to break the news himself before they see the email implies the news is bad and he is anticipating their reaction.'
  },

  // ======================================================= READING · MEDIUM
  {
    id: 'r-m-001', section: 'reading', difficulty: 'medium', topic: 'function',
    passage: 'It is true that the new policy is unpopular. Yet popularity has never been a reliable measure of wisdom; many of the laws we now consider essential were, at the time of their passage, deeply resented by the public.',
    stem: 'The author mentions resented laws primarily in order to:',
    choices: [
      'argue that the new policy will inevitably succeed',
      'illustrate that unpopularity does not imply unwisdom',
      'criticize the public for resisting reform',
      'compare the new policy to past failures'
    ],
    answer: 1,
    explanation: 'The example supports the claim that popularity is not the same as wisdom — illustrating that unpopular ≠ unwise.'
  },
  {
    id: 'r-m-002', section: 'reading', difficulty: 'medium', topic: 'tone',
    passage: 'Ms. Halverson surveyed the cluttered laboratory and let out a small, dignified sigh, as if even her exasperation refused to lower itself to the level of the mess.',
    stem: 'The tone of the description is best characterized as:',
    choices: ['admiring', 'sardonic', 'sorrowful', 'indifferent'],
    answer: 1,
    explanation: 'The dry, ironic image of a "dignified" sigh that "refuses" to acknowledge mess is sardonic, not sorrowful or admiring.'
  },
  {
    id: 'r-m-003', section: 'reading', difficulty: 'medium', topic: 'evidence',
    passage: 'Recent studies suggest that adolescents who keep consistent sleep schedules report fewer mood disturbances than peers with irregular sleep patterns, even when total nightly sleep is held constant.',
    stem: 'Which choice provides the best evidence for the conclusion that *consistency* of sleep, not duration alone, matters for adolescent mood?',
    choices: [
      'Adolescents need more sleep than adults.',
      'Mood disturbances were lower among consistent sleepers, even when total sleep was equal.',
      'Sleep schedules vary by season.',
      'Most adolescents do not get enough sleep.'
    ],
    answer: 1,
    explanation: 'The "even when total sleep was equal" clause directly isolates consistency as the operative factor.'
  },
  {
    id: 'r-m-004', section: 'reading', difficulty: 'medium', topic: 'vocabulary',
    passage: 'The committee’s recommendations were studiously vague, designed to give every faction the impression of having been heard while binding the institution to nothing.',
    stem: 'As used in the sentence, "studiously" most nearly means:',
    choices: ['academically', 'deliberately', 'reluctantly', 'naively'],
    answer: 1,
    explanation: 'The vagueness was *designed*, indicating intent — "deliberately" fits.'
  },

  // ========================================================= READING · HARD
  {
    id: 'r-h-001', section: 'reading', difficulty: 'hard', topic: 'two-passages',
    passage: 'Passage 1: Critics of the new highway argue that its construction will fragment habitats and reduce biodiversity in the region.\n\nPassage 2: While habitat fragmentation is a real concern, the highway’s opponents have ignored the substantial economic benefits — especially for rural counties — that improved transportation will deliver.',
    stem: 'The author of Passage 2 would most likely respond to Passage 1 by:',
    choices: [
      'agreeing that the highway should not be built',
      'acknowledging the environmental concern but arguing other factors outweigh it',
      'denying that habitat fragmentation occurs',
      'proposing alternative routes for the highway'
    ],
    answer: 1,
    explanation: 'Passage 2 explicitly concedes the habitat concern is "real" but introduces economic benefits as a counterweight.'
  },
  {
    id: 'r-h-002', section: 'reading', difficulty: 'hard', topic: 'inference',
    passage: 'For all its rhetorical fireworks, the senator’s speech advanced no proposal that had not already been circulating in the chamber for months.',
    stem: 'The author implies that the senator’s speech was:',
    choices: [
      'persuasive but technically illegal',
      'stylistically vivid but substantively unoriginal',
      'too brief to address its subject',
      'a faithful summary of opposing views'
    ],
    answer: 1,
    explanation: '"Rhetorical fireworks" praises style; "no proposal that had not already been circulating" denies originality of substance.'
  },
  {
    id: 'r-h-003', section: 'reading', difficulty: 'hard', topic: 'data',
    passage: 'A study of 400 office workers found that those who took a 15-minute walk during lunch reported a 22% reduction in afternoon fatigue compared with those who remained at their desks. Total caloric intake and sleep duration were comparable across groups.',
    stem: 'Which conclusion is best supported by the passage?',
    choices: [
      'A 15-minute walk eliminates afternoon fatigue.',
      'Diet and sleep are unrelated to fatigue.',
      'The lunchtime walk is associated with reduced afternoon fatigue, independent of diet or sleep.',
      'All office workers should walk during lunch.'
    ],
    answer: 2,
    explanation: 'The study controls for diet and sleep and reports an associated reduction — not elimination, and not a universal prescription.'
  },

  // ======================================================= READING · INSANE
  {
    id: 'r-i-001', section: 'reading', difficulty: 'insane', topic: 'rhetoric',
    passage: 'It is not, as some have urged, that we lack the means; the means are at hand, and have been for a generation. Nor is it, as others insist, that the public would resist; surveys consistently show majority support. What is missing — what has always been missing — is the will of those who claim to lead.',
    stem: 'The structure of the passage primarily functions to:',
    choices: [
      'enumerate evidence in support of a single proposed solution',
      'reject competing explanations in order to isolate a different cause',
      'concede that the speaker’s position is unpopular',
      'narrate a sequence of historical events'
    ],
    answer: 1,
    explanation: 'The passage uses a rhetorical pattern — "It is not… Nor is it… What is missing is…" — to dismiss two explanations and assert a third.'
  },
  {
    id: 'r-i-002', section: 'reading', difficulty: 'insane', topic: 'inference',
    passage: 'Whatever Pemberton’s private feelings may have been, his correspondence reveals only the careful neutrality of a man writing for posterity.',
    stem: 'The sentence most strongly suggests which of the following about Pemberton’s correspondence?',
    choices: [
      'It accurately preserves his unguarded opinions.',
      'It was edited by later historians to remove bias.',
      'It was crafted with an eye toward future readers and conceals his actual views.',
      'It is the primary source historians have rejected.'
    ],
    answer: 2,
    explanation: '"Careful neutrality… for posterity" implies the letters were composed with future readers in mind and therefore mask his real feelings.'
  },

  // ========================================================= WRITING · EASY
  {
    id: 'w-e-001', section: 'writing', difficulty: 'easy', topic: 'subject-verb',
    stem: 'Choose the option that produces a grammatically correct sentence: "The list of items ___ on the counter."',
    choices: ['are', 'is', 'were', 'have been'],
    answer: 1,
    explanation: 'The subject is "list" (singular), not "items." Singular verb "is" is required.'
  },
  {
    id: 'w-e-002', section: 'writing', difficulty: 'easy', topic: 'commas',
    stem: 'Select the most appropriate punctuation: "After the storm passed___ we walked outside."',
    choices: [', ', ': ', '; ', ' '],
    answer: 0,
    explanation: 'An introductory dependent clause is followed by a comma.'
  },
  {
    id: 'w-e-003', section: 'writing', difficulty: 'easy', topic: 'pronoun',
    stem: 'Choose the correct pronoun: "Each of the players brought ___ own equipment."',
    choices: ['their', 'his or her', 'they’re', 'theirs'],
    answer: 1,
    explanation: '"Each" is grammatically singular in formal usage; "his or her" agrees in number. (SAT prefers strict agreement.)'
  },
  {
    id: 'w-e-004', section: 'writing', difficulty: 'easy', topic: 'word-choice',
    stem: 'Choose the best word for the blank: "The committee will ___ its decision tomorrow."',
    choices: ['announce', 'pronounce', 'denounce', 'renounce'],
    answer: 0,
    explanation: '"Announce" is the standard verb for making a decision public.'
  },

  // ======================================================= WRITING · MEDIUM
  {
    id: 'w-m-001', section: 'writing', difficulty: 'medium', topic: 'transitions',
    stem: 'Select the most logical transition: "The team practiced for months. ___, they lost in the first round."',
    choices: ['Therefore', 'Nevertheless', 'For example', 'In addition'],
    answer: 1,
    explanation: 'The two clauses contrast — months of practice vs. an early loss — calling for "Nevertheless."'
  },
  {
    id: 'w-m-002', section: 'writing', difficulty: 'medium', topic: 'modifiers',
    stem: 'Which revision fixes the dangling modifier? "Walking through the park, the flowers were beautiful."',
    choices: [
      'Walking through the park, the flowers were beautiful.',
      'Walking through the park, we saw beautiful flowers.',
      'The flowers, walking through the park, were beautiful.',
      'Walking through the park; the flowers were beautiful.'
    ],
    answer: 1,
    explanation: 'The introductory phrase must modify the subject of the main clause — "we," not "the flowers."'
  },
  {
    id: 'w-m-003', section: 'writing', difficulty: 'medium', topic: 'parallelism',
    stem: 'Choose the option that maintains parallel structure: "She enjoys hiking, swimming, and ___."',
    choices: ['to bike', 'biking', 'a bike ride', 'rides bikes'],
    answer: 1,
    explanation: 'Match the -ing forms: hiking, swimming, biking.'
  },
  {
    id: 'w-m-004', section: 'writing', difficulty: 'medium', topic: 'punctuation',
    stem: 'Which punctuation is correct? "There are three things I love___ coffee, books, and rain."',
    choices: [', ', ': ', '; ', ' — '],
    answer: 1,
    explanation: 'A colon properly introduces a list following an independent clause.'
  },

  // ========================================================= WRITING · HARD
  {
    id: 'w-h-001', section: 'writing', difficulty: 'hard', topic: 'concision',
    stem: 'Choose the most concise version: "The reason that the experiment failed was due to the fact that the equipment malfunctioned."',
    choices: [
      'The reason that the experiment failed was due to the fact that the equipment malfunctioned.',
      'The experiment failed because the equipment malfunctioned.',
      'Due to the reason that the equipment malfunctioned, the experiment failed.',
      'The experiment, owing to equipment malfunction, failed.'
    ],
    answer: 1,
    explanation: '"The reason… was due to the fact that…" is redundant. "Because" expresses the same idea concisely.'
  },
  {
    id: 'w-h-002', section: 'writing', difficulty: 'hard', topic: 'logical-comparison',
    stem: 'Choose the option that produces a logical comparison: "The novels of García Márquez are more imaginative than ___."',
    choices: [
      'most other writers',
      'those of most other writers',
      'most other writers are',
      'most others'
    ],
    answer: 1,
    explanation: 'Compare novels to novels, not novels to writers. "Those" stands for "novels."'
  },
  {
    id: 'w-h-003', section: 'writing', difficulty: 'hard', topic: 'colon-vs-dash',
    stem: 'Which sentence uses punctuation correctly?',
    choices: [
      'The reason was simple, the road was closed.',
      'The reason was simple; the road was closed.',
      'The reason was simple — the road, was closed.',
      'The reason was simple: the road; was closed.'
    ],
    answer: 1,
    explanation: 'Two independent, related clauses are correctly joined with a semicolon.'
  },

  // ======================================================= WRITING · INSANE
  {
    id: 'w-i-001', section: 'writing', difficulty: 'insane', topic: 'agreement',
    stem: 'Choose the grammatically correct sentence:',
    choices: [
      'Neither the manager nor the employees was satisfied with the outcome.',
      'Neither the manager nor the employees were satisfied with the outcome.',
      'Neither the manager nor the employees is satisfied with the outcome.',
      'Neither the manager nor the employees has been satisfied with the outcome.'
    ],
    answer: 1,
    explanation: 'With "neither…nor," the verb agrees with the nearer subject ("employees," plural) → "were."'
  },
  {
    id: 'w-i-002', section: 'writing', difficulty: 'insane', topic: 'rhetorical-revision',
    stem: 'Which revision most effectively combines the sentences? "The novel was published in 1962. It was the author’s first major success."',
    choices: [
      'The novel, published in 1962, was the author’s first major success.',
      'The novel was published in 1962, and it was the author’s first major success.',
      'Published in 1962, the novel was the author’s first major success which was big.',
      'The novel, the author’s first major success, was published, and it was published in 1962.'
    ],
    answer: 0,
    explanation: 'A non-restrictive participial phrase tightly merges both facts without redundancy.'
  },
  {
    id: 'w-i-003', section: 'writing', difficulty: 'insane', topic: 'who-vs-whom',
    stem: 'Choose the correct pronoun: "The candidate ___ the committee selected has withdrawn."',
    choices: ['who', 'whom', 'whose', 'which'],
    answer: 1,
    explanation: 'The pronoun is the object of "selected" → use "whom."'
  },
];
