/**
 * HSPT Verbal Skills — analogies, antonyms, verbal classification, logic.
 *
 * Tagged for the per-test/per-subject filter:
 *   testType: 'HSPT'
 *   section:  'verbal-skills'
 *   topic:    'analogies' | 'antonyms' | 'classification' | 'logic'
 *
 * Difficulty maps to the HSPT 200–800 scale (tiers easy ≤500,
 * medium 510–600, hard 610–700, insane 710+). Spread across 50
 * questions:
 *   ~10 easy
 *   ~20 medium
 *   ~16 hard
 *   ~4  insane
 *
 * Sub-format conventions follow real HSPT content:
 *   • Analogies: A : B :: C : ?
 *   • Antonyms: stem in ALL-CAPS, pick OPPOSITE
 *   • Classification: 4 words, pick the one that DOES NOT belong
 *   • Logic: 2-3 facts, then a conclusion to label
 *     (true / false / uncertain)
 *
 * Concatenates onto window.STL_QUESTIONS_HSPT so the existing
 * mathematics questions stay in the same pool. Loaded after
 * questions-isee-act.js (which seeds the HSPT array + DEFAULTS).
 */
'use strict';

window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([

  /* ============================================================== *
   * ANALOGIES · 12 questions
   * Mix of relationship types: animal/home, tool/action, body
   * pairing, time hierarchy, worker/place, worker/tool, animal/group,
   * lacks-relationship, instrument/measure, adj/noun, degree.
   * ============================================================== */

  {
    id: 'q-hsptv-001', section: 'verbal-skills', topic: 'analogies', difficulty: 410,
    stem: 'BIRD : NEST :: BEE : ?',
    choices: ['sting', 'flower', 'honey', 'hive'],
    answer: 3,
    explanation: 'A bird lives in a nest; a bee lives in a HIVE. Animal-to-home relationship.'
  },
  {
    id: 'q-hsptv-002', section: 'verbal-skills', topic: 'analogies', difficulty: 420,
    stem: 'PEN : WRITE :: SCISSORS : ?',
    choices: ['sharp', 'cut', 'paper', 'metal'],
    answer: 1,
    explanation: 'A pen is used to write; scissors are used to CUT. Tool-to-its-purpose relationship.'
  },
  {
    id: 'q-hsptv-003', section: 'verbal-skills', topic: 'analogies', difficulty: 440,
    stem: 'HAND : FIVE :: OCTOPUS : ?',
    choices: ['ocean', 'soft', 'eight', 'tentacle'],
    answer: 2,
    explanation: 'A hand has five fingers; an octopus has EIGHT tentacles. Whole-to-count-of-its-parts relationship.'
  },
  {
    id: 'q-hsptv-004', section: 'verbal-skills', topic: 'analogies', difficulty: 470,
    stem: 'SHOE : FOOT :: HAT : ?',
    choices: ['head', 'hair', 'wear', 'cloth'],
    answer: 0,
    explanation: 'A shoe is worn on the foot; a hat is worn on the HEAD. Garment-to-body-part it covers.'
  },
  {
    id: 'q-hsptv-005', section: 'verbal-skills', topic: 'analogies', difficulty: 480,
    stem: 'HOUR : DAY :: DAY : ?',
    choices: ['week', 'time', 'minute', 'calendar'],
    answer: 0,
    explanation: 'An hour is a unit that makes up a day; a day is a unit that makes up a WEEK. Smaller-to-larger time unit.'
  },
  {
    id: 'q-hsptv-006', section: 'verbal-skills', topic: 'analogies', difficulty: 510,
    stem: 'SAILOR : SHIP :: PILOT : ?',
    choices: ['navigate', 'cockpit', 'sky', 'airplane'],
    answer: 3,
    explanation: 'A sailor operates a ship; a pilot operates an AIRPLANE. Worker-to-vessel-they-operate.'
  },
  {
    id: 'q-hsptv-007', section: 'verbal-skills', topic: 'analogies', difficulty: 520,
    stem: 'HAMMER : CARPENTER :: PAINTBRUSH : ?',
    choices: ['painter', 'canvas', 'art', 'color'],
    answer: 0,
    explanation: 'A hammer is a tool of a carpenter; a paintbrush is a tool of a PAINTER. Tool-to-user.'
  },
  {
    id: 'q-hsptv-008', section: 'verbal-skills', topic: 'analogies', difficulty: 540,
    stem: 'BEE : HIVE :: ANT : ?',
    choices: ['leaf', 'queen', 'worker', 'colony'],
    answer: 3,
    explanation: 'Bees live in a hive; ants live in a COLONY. Animal-to-its-collective-home/group.'
  },
  {
    id: 'q-hsptv-009', section: 'verbal-skills', topic: 'analogies', difficulty: 660,
    stem: 'DROUGHT : RAIN :: FAMINE : ?',
    choices: ['water', 'food', 'hunger', 'crop'],
    answer: 1,
    explanation: 'A drought is a severe lack of rain; a famine is a severe lack of FOOD. Lacks-relationship.'
  },
  {
    id: 'q-hsptv-010', section: 'verbal-skills', topic: 'analogies', difficulty: 540,
    stem: 'THERMOMETER : TEMPERATURE :: CLOCK : ?',
    choices: ['time', 'hands', 'tick', 'wall'],
    answer: 0,
    explanation: 'A thermometer measures temperature; a clock measures TIME. Instrument-to-quantity-measured.'
  },
  {
    id: 'q-hsptv-011', section: 'verbal-skills', topic: 'analogies', difficulty: 600,
    stem: 'BRAVE : COURAGE :: HUMBLE : ?',
    choices: ['small', 'modesty', 'pride', 'shy'],
    answer: 1,
    explanation: 'A brave person displays courage; a humble person displays MODESTY. Adjective-to-noun-trait it describes.'
  },
  {
    id: 'q-hsptv-012', section: 'verbal-skills', topic: 'analogies', difficulty: 580,
    stem: 'FRIGID : COLD :: SCORCHING : ?',
    choices: ['hot', 'sun', 'mild', 'fire'],
    answer: 0,
    explanation: 'Frigid is an extreme form of cold; scorching is an extreme form of HOT. Same-direction degree pair (extreme/moderate).'
  },

  /* ============================================================== *
   * ANTONYMS · 13 questions
   * Stem in ALL-CAPS — pick the OPPOSITE meaning.
   * ============================================================== */

  {
    id: 'q-hsptv-013', section: 'verbal-skills', topic: 'antonyms', difficulty: 410,
    stem: 'HAPPY',
    choices: ['tired', 'sad', 'glad', 'kind'],
    answer: 1,
    explanation: 'HAPPY means joyful; the opposite is SAD. "Glad" is a synonym, not an antonym.'
  },
  {
    id: 'q-hsptv-014', section: 'verbal-skills', topic: 'antonyms', difficulty: 410,
    stem: 'BIG',
    choices: ['old', 'small', 'wide', 'huge'],
    answer: 1,
    explanation: 'BIG means large; the opposite is SMALL. "Huge" is a synonym (an extreme form of big), not an antonym.'
  },
  {
    id: 'q-hsptv-015', section: 'verbal-skills', topic: 'antonyms', difficulty: 440,
    stem: 'ACCEPT',
    choices: ['decide', 'discuss', 'reject', 'receive'],
    answer: 2,
    explanation: 'To ACCEPT is to receive willingly; the opposite is to REJECT.'
  },
  {
    id: 'q-hsptv-016', section: 'verbal-skills', topic: 'antonyms', difficulty: 460,
    stem: 'BRAVE',
    choices: ['silent', 'foolish', 'cowardly', 'heroic'],
    answer: 2,
    explanation: 'BRAVE means showing courage; the opposite is COWARDLY. "Heroic" is a synonym.'
  },
  {
    id: 'q-hsptv-017', section: 'verbal-skills', topic: 'antonyms', difficulty: 510,
    stem: 'IGNORE',
    choices: ['reject', 'dismiss', 'forget', 'notice'],
    answer: 3,
    explanation: 'To IGNORE is to refuse to take notice of; the opposite is to NOTICE. "Dismiss" is closer to a synonym.'
  },
  {
    id: 'q-hsptv-018', section: 'verbal-skills', topic: 'antonyms', difficulty: 510,
    stem: 'PERMANENT',
    choices: ['lasting', 'distant', 'sturdy', 'temporary'],
    answer: 3,
    explanation: 'PERMANENT means lasting indefinitely; the opposite is TEMPORARY. "Lasting" is a synonym.'
  },
  {
    id: 'q-hsptv-019', section: 'verbal-skills', topic: 'antonyms', difficulty: 550,
    stem: 'HUMBLE',
    choices: ['arrogant', 'gentle', 'shy', 'wealthy'],
    answer: 0,
    explanation: 'HUMBLE means modest, having a low view of one\'s importance; the opposite is ARROGANT.'
  },
  {
    id: 'q-hsptv-020', section: 'verbal-skills', topic: 'antonyms', difficulty: 510,
    stem: 'WEALTHY',
    choices: ['rich', 'famous', 'poor', 'generous'],
    answer: 2,
    explanation: 'WEALTHY means having lots of money; the opposite is POOR. "Rich" is a synonym.'
  },
  {
    id: 'q-hsptv-021', section: 'verbal-skills', topic: 'antonyms', difficulty: 560,
    stem: 'ATTRACT',
    choices: ['observe', 'magnetize', 'repel', 'draw'],
    answer: 2,
    explanation: 'To ATTRACT is to draw toward; the opposite is to REPEL (push away). "Draw" and "magnetize" are synonyms.'
  },
  {
    id: 'q-hsptv-022', section: 'verbal-skills', topic: 'antonyms', difficulty: 600,
    stem: 'APPROVE',
    choices: ['endorse', 'request', 'condemn', 'wonder'],
    answer: 2,
    explanation: 'To APPROVE is to express favorable opinion; the opposite is to CONDEMN (express strong disapproval). "Endorse" is a synonym.'
  },
  {
    id: 'q-hsptv-023', section: 'verbal-skills', topic: 'antonyms', difficulty: 620,
    stem: 'LENIENT',
    choices: ['rich', 'strict', 'distant', 'gentle'],
    answer: 1,
    explanation: 'LENIENT means permissive, not strict; the opposite is STRICT. "Gentle" overlaps with lenient, not opposes it.'
  },
  {
    id: 'q-hsptv-024', section: 'verbal-skills', topic: 'antonyms', difficulty: 690,
    stem: 'PROFOUND',
    choices: ['wise', 'silent', 'shallow', 'serious'],
    answer: 2,
    explanation: 'PROFOUND means very deep (literally or in meaning); the opposite is SHALLOW. "Wise" overlaps in meaning, not opposes.'
  },
  {
    id: 'q-hsptv-025', section: 'verbal-skills', topic: 'antonyms', difficulty: 740,
    stem: 'AUSPICIOUS',
    choices: ['fortunate', 'unfavorable', 'noisy', 'royal'],
    answer: 1,
    explanation: 'AUSPICIOUS means promising or favorable; the opposite is UNFAVORABLE. "Fortunate" is a synonym.'
  },

  /* ============================================================== *
   * VERBAL CLASSIFICATION · 13 questions
   * 4 words shown — pick the one that DOES NOT belong with the
   * others. Stem phrasing is consistent for scannability.
   * ============================================================== */

  {
    id: 'q-hsptv-026', section: 'verbal-skills', topic: 'classification', difficulty: 410,
    stem: 'Which word does NOT belong with the others?',
    choices: ['orange', 'apple', 'carrot', 'banana'],
    answer: 2,
    explanation: 'Apple, banana, and orange are all fruits. CARROT is a vegetable, so it does not belong.'
  },
  {
    id: 'q-hsptv-027', section: 'verbal-skills', topic: 'classification', difficulty: 440,
    stem: 'Which word does NOT belong with the others?',
    choices: ['cat', 'horse', 'dog', 'robin'],
    answer: 3,
    explanation: 'Cat, dog, and horse are all mammals. ROBIN is a bird, so it does not belong.'
  },
  {
    id: 'q-hsptv-028', section: 'verbal-skills', topic: 'classification', difficulty: 440,
    stem: 'Which word does NOT belong with the others?',
    choices: ['green', 'red', 'square', 'brown'],
    answer: 2,
    explanation: 'Red, green, and brown are all colors. SQUARE is a shape, so it does not belong.'
  },
  {
    id: 'q-hsptv-029', section: 'verbal-skills', topic: 'classification', difficulty: 510,
    stem: 'Which word does NOT belong with the others?',
    choices: ['screwdriver', 'wrench', 'hammer', 'nail'],
    answer: 3,
    explanation: 'Hammer, screwdriver, and wrench are all tools. NAIL is a fastener (something tools work ON), so it does not belong.'
  },
  {
    id: 'q-hsptv-030', section: 'verbal-skills', topic: 'classification', difficulty: 510,
    stem: 'Which word does NOT belong with the others?',
    choices: ['rose', 'daisy', 'tulip', 'oak'],
    answer: 3,
    explanation: 'Rose, daisy, and tulip are all flowers. OAK is a tree, so it does not belong.'
  },
  {
    id: 'q-hsptv-031', section: 'verbal-skills', topic: 'classification', difficulty: 530,
    stem: 'Which word does NOT belong with the others?',
    choices: ['cube', 'triangle', 'square', 'circle'],
    answer: 0,
    explanation: 'Square, circle, and triangle are 2D shapes. CUBE is a 3D solid, so it does not belong.'
  },
  {
    id: 'q-hsptv-032', section: 'verbal-skills', topic: 'classification', difficulty: 540,
    stem: 'Which word does NOT belong with the others?',
    choices: ['mumble', 'whisper', 'shout', 'write'],
    answer: 3,
    explanation: 'Whisper, shout, and mumble are all ways of speaking. WRITE involves making marks, not vocal sound, so it does not belong.'
  },
  {
    id: 'q-hsptv-033', section: 'verbal-skills', topic: 'classification', difficulty: 620,
    stem: 'Which word does NOT belong with the others?',
    choices: ['owl', 'hawk', 'eagle', 'bat'],
    answer: 3,
    explanation: 'Eagle, hawk, and owl are all birds of prey. BAT is a flying mammal, so it does not belong.'
  },
  {
    id: 'q-hsptv-034', section: 'verbal-skills', topic: 'classification', difficulty: 640,
    stem: 'Which word does NOT belong with the others?',
    choices: ['sonnet', 'novel', 'ode', 'haiku'],
    answer: 1,
    explanation: 'Sonnet, ode, and haiku are all forms of POETRY. NOVEL is a long prose work, so it does not belong.'
  },
  {
    id: 'q-hsptv-035', section: 'verbal-skills', topic: 'classification', difficulty: 670,
    stem: 'Which word does NOT belong with the others?',
    choices: ['monsoon', 'cirrus', 'cumulus', 'stratus'],
    answer: 0,
    explanation: 'Cumulus, cirrus, and stratus are all types of clouds. MONSOON is a seasonal wind/rain pattern, not a cloud type, so it does not belong.'
  },
  {
    id: 'q-hsptv-036', section: 'verbal-skills', topic: 'classification', difficulty: 680,
    stem: 'Which word does NOT belong with the others?',
    choices: ['motorcycle', 'scooter', 'bicycle', 'automobile'],
    answer: 3,
    explanation: 'Bicycle, motorcycle, and scooter all have two wheels. AUTOMOBILE has four wheels, so it does not belong.'
  },
  {
    id: 'q-hsptv-037', section: 'verbal-skills', topic: 'classification', difficulty: 690,
    stem: 'Which word does NOT belong with the others?',
    choices: ['Einstein', 'Newton', 'Galileo', 'Hippocrates'],
    answer: 3,
    explanation: 'Galileo, Newton, and Einstein were all famous physicists. HIPPOCRATES was a physician (medicine), so he does not belong.'
  },
  {
    id: 'q-hsptv-038', section: 'verbal-skills', topic: 'classification', difficulty: 720,
    stem: 'Which word does NOT belong with the others?',
    choices: ['pansy', 'lily', 'fern', 'daisy'],
    answer: 2,
    explanation: 'Pansy, lily, and daisy are flowering plants. FERN is a non-flowering plant (reproduces via spores), so it does not belong.'
  },

  /* ============================================================== *
   * LOGIC · 12 questions
   * Format: "Read the statements. Then judge the conclusion as
   *         true / false / uncertain."
   * Tests transitive reasoning, contrapositives, and the difference
   * between necessary and sufficient conditions.
   * ============================================================== */

  {
    id: 'q-hsptv-039', section: 'verbal-skills', topic: 'logic', difficulty: 490,
    stem: 'All birds have feathers. A robin is a bird. Therefore, a robin has feathers. The conclusion is:',
    choices: ['true', 'uncertain', 'false'],
    answer: 0,
    explanation: 'TRUE. The conclusion follows directly from the two premises by simple deduction (universal statement + particular case).'
  },
  {
    id: 'q-hsptv-040', section: 'verbal-skills', topic: 'logic', difficulty: 500,
    stem: 'Cats are not dogs. Tom has a cat. Therefore, Tom has a dog. The conclusion is:',
    choices: ['uncertain', 'true', 'false'],
    answer: 2,
    explanation: 'FALSE — internally contradictory. The premises tell us Tom has a cat (which is not a dog), so the conclusion that Tom has a dog cannot be inferred. (Could be true that Tom ALSO has a dog, but the premises don\'t support that — and "uncertain" misses that the stated reasoning is invalid.)'
  },
  {
    id: 'q-hsptv-041', section: 'verbal-skills', topic: 'logic', difficulty: 510,
    stem: 'Apples are red. The fruit in the bowl is red. Therefore, the fruit in the bowl is apples. The conclusion is:',
    choices: ['true', 'uncertain', 'false'],
    answer: 1,
    explanation: 'UNCERTAIN. The premise tells us all apples are red, not that all red fruit is apples. The fruit could be cherries, strawberries, or other red fruits.'
  },
  {
    id: 'q-hsptv-042', section: 'verbal-skills', topic: 'logic', difficulty: 580,
    stem: 'Anna runs faster than Beth. Beth runs faster than Carol. Therefore, Anna runs faster than Carol. The conclusion is:',
    choices: ['uncertain', 'false', 'true'],
    answer: 2,
    explanation: 'TRUE — by transitivity. If A > B and B > C, then A > C.'
  },
  {
    id: 'q-hsptv-043', section: 'verbal-skills', topic: 'logic', difficulty: 600,
    stem: 'All roses are flowers. Some flowers fade quickly. Therefore, some roses fade quickly. The conclusion is:',
    choices: ['false', 'true', 'uncertain'],
    answer: 2,
    explanation: 'UNCERTAIN. We know some flowers fade quickly, but those particular flowers might be tulips or daffodils — not roses. We can\'t conclude that any of the fading flowers ARE roses.'
  },
  {
    id: 'q-hsptv-044', section: 'verbal-skills', topic: 'logic', difficulty: 620,
    stem: 'If it rains, the picnic is canceled. The picnic was held. Therefore, it did not rain. The conclusion is:',
    choices: ['false', 'true', 'uncertain'],
    answer: 1,
    explanation: 'TRUE — this is a valid contrapositive. "If rain → cancel" means "if not canceled → no rain". The picnic was held (not canceled), so it did not rain.'
  },
  {
    id: 'q-hsptv-045', section: 'verbal-skills', topic: 'logic', difficulty: 640,
    stem: 'Some students are athletes. All athletes are healthy. Therefore, some students are healthy. The conclusion is:',
    choices: ['uncertain', 'false', 'true'],
    answer: 2,
    explanation: 'TRUE. Some students are athletes, and every athlete is healthy — so the student-athletes are healthy, which means at least some students are healthy.'
  },
  {
    id: 'q-hsptv-046', section: 'verbal-skills', topic: 'logic', difficulty: 670,
    stem: 'All squares are rectangles. Not all rectangles are squares. The figure is a rectangle. Therefore, the figure is a square. The conclusion is:',
    choices: ['uncertain', 'false', 'true'],
    answer: 0,
    explanation: 'UNCERTAIN. Being a rectangle doesn\'t guarantee being a square (only some rectangles are). The figure might be a non-square rectangle.'
  },
  {
    id: 'q-hsptv-047', section: 'verbal-skills', topic: 'logic', difficulty: 690,
    stem: 'If a number is divisible by 6, it is divisible by 3. The number 9 is not divisible by 6. Therefore, 9 is not divisible by 3. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 1,
    explanation: 'FALSE — the conclusion misuses the conditional. "Divisible by 6 → divisible by 3" does NOT mean "not divisible by 6 → not divisible by 3". 9 is in fact divisible by 3 (9 ÷ 3 = 3), even though 9 is not divisible by 6.'
  },
  {
    id: 'q-hsptv-048', section: 'verbal-skills', topic: 'logic', difficulty: 700,
    stem: 'All firefighters are brave. Therefore, no coward is a firefighter. The conclusion is:',
    choices: ['false', 'true', 'uncertain'],
    answer: 1,
    explanation: 'TRUE — this is the valid contrapositive. "All F are B" is logically equivalent to "no non-B is F". A coward is by definition not brave, so a coward cannot be a firefighter.'
  },
  {
    id: 'q-hsptv-049', section: 'verbal-skills', topic: 'logic', difficulty: 690,
    stem: 'Every Monday Sam goes to the gym. Today Sam went to the gym. Therefore, today is Monday. The conclusion is:',
    choices: ['false', 'uncertain', 'true'],
    answer: 1,
    explanation: 'UNCERTAIN — affirming the consequent. Sam goes to the gym every Monday, but Sam might also go on other days. The premises don\'t rule out non-Monday gym visits.'
  },
  {
    id: 'q-hsptv-050', section: 'verbal-skills', topic: 'logic', difficulty: 730,
    stem: 'A is greater than B. B is less than C. Therefore, A is greater than C. The conclusion is:',
    choices: ['uncertain', 'true', 'false'],
    answer: 0,
    explanation: 'UNCERTAIN. Both A and C are greater than B, but we don\'t know how A and C compare to each other. A could be larger, smaller, or equal to C.'
  },
]);
