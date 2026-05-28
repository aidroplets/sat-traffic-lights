/**
 * HSPT Verbal Skills — fill batch (40 more questions, distinct from
 * the 50 in questions-hspt-verbal-skills.js).
 *
 * testType: 'HSPT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'verbal-skills'
 *
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';

window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([

  /* ============================================================== *
   * ANALOGIES · 10 questions
   * ============================================================== */

  {
    id: 'q-hsptv-fill-001', section: 'verbal-skills', topic: 'analogies', difficulty: 410,
    stem: 'PUPPY : DOG :: KITTEN : ?',
    choices: ['mouse', 'paw', 'cat', 'litter'],
    answer: 2,
    explanation: 'A puppy is a young dog; a kitten is a young CAT. Young-to-adult relationship. "Litter" describes a group of young, "paw" is a body part, and "mouse" is unrelated.'
  },
  {
    id: 'q-hsptv-fill-002', section: 'verbal-skills', topic: 'analogies', difficulty: 440,
    stem: 'GLOVE : HAND :: SOCK : ?',
    choices: ['knit', 'shoe', 'wool', 'foot'],
    answer: 3,
    explanation: 'A glove is worn on the hand; a sock is worn on the FOOT. Garment-to-body-part. "Shoe" also goes on the foot but is itself a garment, "wool" is a material, and "knit" is a verb.'
  },
  {
    id: 'q-hsptv-fill-003', section: 'verbal-skills', topic: 'analogies', difficulty: 540,
    stem: 'CHAPTER : BOOK :: SCENE : ?',
    choices: ['actor', 'play', 'stage', 'script'],
    answer: 1,
    explanation: 'A chapter is a section of a book; a scene is a section of a PLAY. Part-to-whole relationship. "Actor" performs in a scene, "stage" is a setting, and "script" is the written form — none are the whole that the scene composes.'
  },
  {
    id: 'q-hsptv-fill-004', section: 'verbal-skills', topic: 'analogies', difficulty: 510,
    stem: 'DOCTOR : HOSPITAL :: TEACHER : ?',
    choices: ['student', 'school', 'lesson', 'chalk'],
    answer: 1,
    explanation: 'A doctor works in a hospital; a teacher works in a SCHOOL. Worker-to-workplace. "Student" is a recipient, "lesson" is the activity, and "chalk" is a tool.'
  },
  {
    id: 'q-hsptv-fill-005', section: 'verbal-skills', topic: 'analogies', difficulty: 520,
    stem: 'HUNGRY : EAT :: TIRED : ?',
    choices: ['yawn', 'rest', 'work', 'sleep'],
    answer: 3,
    explanation: 'When hungry, the response is to eat (the action that resolves the need); when tired, the response is to SLEEP. Need-to-resolving-action. "Yawn" is a symptom, "rest" is partial relief, and "work" worsens the need.'
  },
  {
    id: 'q-hsptv-fill-006', section: 'verbal-skills', topic: 'analogies', difficulty: 600,
    stem: 'MICROSCOPE : SMALL :: TELESCOPE : ?',
    choices: ['near', 'large', 'distant', 'glass'],
    answer: 2,
    explanation: 'A microscope makes small things visible; a telescope makes DISTANT things visible. Instrument-to-object-it-reveals. "Large" is a synonym trap (telescopes don\'t magnify size, they bring far things closer), "near" is the opposite, and "glass" is a material.'
  },
  {
    id: 'q-hsptv-fill-007', section: 'verbal-skills', topic: 'analogies', difficulty: 600,
    stem: 'WHISPER : SHOUT :: GLANCE : ?',
    choices: ['stare', 'blink', 'see', 'wink'],
    answer: 0,
    explanation: 'A whisper is a brief, soft form of speaking; a shout is a sustained, loud form. A glance is a brief look; a STARE is a sustained, intense look. Brief-to-sustained intensity pair. "Blink" closes the eyes, "see" is generic, and "wink" is an unrelated gesture.'
  },
  {
    id: 'q-hsptv-fill-008', section: 'verbal-skills', topic: 'analogies', difficulty: 670,
    stem: 'NOVICE : EXPERT :: SAPLING : ?',
    choices: ['leaf', 'forest', 'seed', 'oak'],
    answer: 3,
    explanation: 'A novice is an early stage; an expert is the developed stage. A sapling is a young tree; an OAK (mature tree) is the developed stage. Beginner-to-mature pair. "Seed" is even earlier, "leaf" is a part, and "forest" is a group.'
  },
  {
    id: 'q-hsptv-fill-009', section: 'verbal-skills', topic: 'analogies', difficulty: 690,
    stem: 'PARCHED : THIRST :: RAVENOUS : ?',
    choices: ['food', 'thirst', 'hunger', 'animal'],
    answer: 2,
    explanation: 'Parched describes extreme thirst; ravenous describes extreme HUNGER. Adjective-to-the-need-it-intensifies. "Food" is what satisfies hunger (not the state), "thirst" repeats the original term, and "animal" plays on the word but isn\'t the abstract noun.'
  },
  {
    id: 'q-hsptv-fill-010', section: 'verbal-skills', topic: 'analogies', difficulty: 740,
    stem: 'EPHEMERAL : ETERNITY :: TRIVIAL : ?',
    choices: ['gravity', 'humor', 'minor', 'silence'],
    answer: 0,
    explanation: 'Ephemeral (fleeting) is the opposite of eternity (lasting forever); trivial (unimportant) is the opposite of GRAVITY (importance, seriousness). Adjective-to-its-opposite-noun. "Minor" is a synonym of trivial, "humor" is unrelated, and "silence" is a different concept.'
  },

  /* ============================================================== *
   * ANTONYMS · 10 questions
   * ============================================================== */

  {
    id: 'q-hsptv-fill-011', section: 'verbal-skills', topic: 'antonyms', difficulty: 410,
    stem: 'EMPTY',
    choices: ['hollow', 'full', 'open', 'broken'],
    answer: 1,
    explanation: 'EMPTY means containing nothing; the opposite is FULL. "Hollow" is a near-synonym, "open" is a different attribute, and "broken" is unrelated.'
  },
  {
    id: 'q-hsptv-fill-012', section: 'verbal-skills', topic: 'antonyms', difficulty: 420,
    stem: 'BEGIN',
    choices: ['start', 'pause', 'finish', 'try'],
    answer: 2,
    explanation: 'To BEGIN is to start; the opposite is to FINISH. "Start" is a synonym, "pause" is a temporary stop (not the end), and "try" is unrelated.'
  },
  {
    id: 'q-hsptv-fill-013', section: 'verbal-skills', topic: 'antonyms', difficulty: 600,
    stem: 'FRUGAL',
    choices: ['wasteful', 'careful', 'wealthy', 'thrifty'],
    answer: 0,
    explanation: 'FRUGAL means careful with money or resources; the opposite is WASTEFUL. "Thrifty" and "careful" are synonyms; "wealthy" describes amount of money, not spending behavior.'
  },
  {
    id: 'q-hsptv-fill-014', section: 'verbal-skills', topic: 'antonyms', difficulty: 620,
    stem: 'CANDID',
    choices: ['cheerful', 'evasive', 'frank', 'loud'],
    answer: 1,
    explanation: 'CANDID means honest and straightforward; the opposite is EVASIVE (avoiding direct answers). "Frank" is a synonym, "cheerful" is unrelated, and "loud" describes volume.'
  },
  {
    id: 'q-hsptv-fill-015', section: 'verbal-skills', topic: 'antonyms', difficulty: 580,
    stem: 'ALOOF',
    choices: ['distant', 'cold', 'sociable', 'tall'],
    answer: 2,
    explanation: 'ALOOF means emotionally distant or unfriendly; the opposite is SOCIABLE. "Distant" and "cold" are synonyms; "tall" plays on the sound but means height.'
  },
  {
    id: 'q-hsptv-fill-016', section: 'verbal-skills', topic: 'antonyms', difficulty: 590,
    stem: 'AUGMENT',
    choices: ['enlarge', 'argue', 'predict', 'diminish'],
    answer: 3,
    explanation: 'To AUGMENT is to make larger or increase; the opposite is to DIMINISH. "Enlarge" is a synonym, "argue" plays on the sound (augment vs argument), and "predict" is unrelated.'
  },
  {
    id: 'q-hsptv-fill-017', section: 'verbal-skills', topic: 'antonyms', difficulty: 530,
    stem: 'CONCEAL',
    choices: ['cover', 'reveal', 'destroy', 'protect'],
    answer: 1,
    explanation: 'To CONCEAL is to hide; the opposite is to REVEAL. "Cover" is a synonym, "destroy" is a different action, and "protect" is related to concealing but not opposite.'
  },
  {
    id: 'q-hsptv-fill-018', section: 'verbal-skills', topic: 'antonyms', difficulty: 660,
    stem: 'BREVITY',
    choices: ['bravery', 'wordiness', 'silence', 'shortness'],
    answer: 1,
    explanation: 'BREVITY means shortness, especially in speech; the opposite is WORDINESS. "Shortness" is a synonym, "bravery" is a sound-alike trap, and "silence" is the absence of speech, not its opposite extreme.'
  },
  {
    id: 'q-hsptv-fill-019', section: 'verbal-skills', topic: 'antonyms', difficulty: 690,
    stem: 'DISPEL',
    choices: ['scatter', 'gather', 'spell', 'announce'],
    answer: 1,
    explanation: 'To DISPEL is to drive away or scatter (e.g., dispel doubts); the opposite is to GATHER. "Scatter" is a synonym, "spell" is a sound-alike trap, and "announce" is unrelated.'
  },
  {
    id: 'q-hsptv-fill-020', section: 'verbal-skills', topic: 'antonyms', difficulty: 740,
    stem: 'GARRULOUS',
    choices: ['talkative', 'taciturn', 'cheerful', 'angry'],
    answer: 1,
    explanation: 'GARRULOUS means excessively talkative; the opposite is TACITURN (reserved, saying little). "Talkative" is a synonym, "cheerful" describes mood, and "angry" is unrelated.'
  },

  /* ============================================================== *
   * CLASSIFICATION · 10 questions
   * ============================================================== */

  {
    id: 'q-hsptv-fill-021', section: 'verbal-skills', topic: 'classification', difficulty: 510,
    stem: 'Which word does NOT belong with the others?',
    choices: ['salmon', 'trout', 'shark', 'dolphin'],
    answer: 3,
    explanation: 'Salmon, trout, and shark are all fish. DOLPHIN is a marine mammal (breathes air, gives birth to live young), so it does not belong.'
  },
  {
    id: 'q-hsptv-fill-022', section: 'verbal-skills', topic: 'classification', difficulty: 510,
    stem: 'Which word does NOT belong with the others?',
    choices: ['violin', 'flute', 'guitar', 'cello'],
    answer: 1,
    explanation: 'Violin, guitar, and cello are all stringed instruments. FLUTE is a wind instrument, so it does not belong.'
  },
  {
    id: 'q-hsptv-fill-023', section: 'verbal-skills', topic: 'classification', difficulty: 530,
    stem: 'Which word does NOT belong with the others?',
    choices: ['Mercury', 'Venus', 'Moon', 'Mars'],
    answer: 2,
    explanation: 'Mercury, Venus, and Mars are all planets. MOON is a natural satellite (of Earth), not a planet, so it does not belong.'
  },
  {
    id: 'q-hsptv-fill-024', section: 'verbal-skills', topic: 'classification', difficulty: 560,
    stem: 'Which word does NOT belong with the others?',
    choices: ['rye', 'wheat', 'barley', 'lettuce'],
    answer: 3,
    explanation: 'Wheat, rye, and barley are all grains (cereal crops). LETTUCE is a leafy vegetable, so it does not belong.'
  },
  {
    id: 'q-hsptv-fill-025', section: 'verbal-skills', topic: 'classification', difficulty: 580,
    stem: 'Which word does NOT belong with the others?',
    choices: ['amber', 'silver', 'gold', 'copper'],
    answer: 0,
    explanation: 'Silver, gold, and copper are all metals (elements). AMBER is fossilized tree resin (organic, not a metal), so it does not belong.'
  },
  {
    id: 'q-hsptv-fill-026', section: 'verbal-skills', topic: 'classification', difficulty: 590,
    stem: 'Which word does NOT belong with the others?',
    choices: ['kayak', 'canoe', 'submarine', 'raft'],
    answer: 2,
    explanation: 'Kayak, canoe, and raft are all surface watercraft propelled by people without an engine. SUBMARINE is an engine-powered, underwater vessel, so it does not belong.'
  },
  {
    id: 'q-hsptv-fill-027', section: 'verbal-skills', topic: 'classification', difficulty: 620,
    stem: 'Which word does NOT belong with the others?',
    choices: ['cobra', 'python', 'viper', 'iguana'],
    answer: 3,
    explanation: 'Cobra, python, and viper are all snakes. IGUANA is a lizard (has legs), so it does not belong.'
  },
  {
    id: 'q-hsptv-fill-028', section: 'verbal-skills', topic: 'classification', difficulty: 650,
    stem: 'Which word does NOT belong with the others?',
    choices: ['Spanish', 'French', 'Latin', 'Portuguese'],
    answer: 2,
    explanation: 'Spanish, French, and Portuguese are all living Romance languages spoken today. LATIN is the dead/classical ancestor language; it has no native speakers, so it does not belong with the modern Romance languages.'
  },
  {
    id: 'q-hsptv-fill-029', section: 'verbal-skills', topic: 'classification', difficulty: 680,
    stem: 'Which word does NOT belong with the others?',
    choices: ['hexagon', 'pentagon', 'octagon', 'oval'],
    answer: 3,
    explanation: 'Hexagon, pentagon, and octagon are all polygons (closed figures with straight sides). OVAL is a curved, closed figure with no straight sides, so it does not belong.'
  },
  {
    id: 'q-hsptv-fill-030', section: 'verbal-skills', topic: 'classification', difficulty: 730,
    stem: 'Which word does NOT belong with the others?',
    choices: ['quartz', 'granite', 'feldspar', 'mica'],
    answer: 1,
    explanation: 'Quartz, feldspar, and mica are all MINERALS (single chemical substances). GRANITE is a ROCK composed of those very minerals — a mixture, not a single mineral — so it does not belong.'
  },

  /* ============================================================== *
   * LOGIC · 10 questions
   * Each conclusion is true / false / uncertain (3 choices).
   * ============================================================== */

  {
    id: 'q-hsptv-fill-031', section: 'verbal-skills', topic: 'logic', difficulty: 480,
    stem: 'All triangles have three sides. The figure has three sides. Therefore, the figure is a triangle. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'TRUE. A closed figure with three sides is by definition a triangle, so the conclusion follows. (Note: the premise as stated relies on the standard geometric definition; in the HSPT context this is treated as a valid identification.)'
  },
  {
    id: 'q-hsptv-fill-032', section: 'verbal-skills', topic: 'logic', difficulty: 510,
    stem: 'Maria is taller than Lin. Lin is taller than Priya. Therefore, Priya is the shortest of the three. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'TRUE — by transitivity. Maria > Lin > Priya, so Priya is shorter than both Lin and Maria, making her the shortest of the three.'
  },
  {
    id: 'q-hsptv-fill-033', section: 'verbal-skills', topic: 'logic', difficulty: 540,
    stem: 'All mammals are warm-blooded. A snake is not warm-blooded. Therefore, a snake is not a mammal. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'TRUE — valid contrapositive. "All mammals are warm-blooded" means "if not warm-blooded, then not a mammal." A snake fails the warm-blooded test, so it cannot be a mammal.'
  },
  {
    id: 'q-hsptv-fill-034', section: 'verbal-skills', topic: 'logic', difficulty: 580,
    stem: 'Some vegetables are green. Spinach is a vegetable. Therefore, spinach is green. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 2,
    explanation: 'UNCERTAIN — based on the premises alone. We are only told SOME vegetables are green; spinach being a vegetable does not guarantee it falls in the green subset. (Real-world knowledge that spinach is green is irrelevant; logic problems judge only what the premises support.)'
  },
  {
    id: 'q-hsptv-fill-035', section: 'verbal-skills', topic: 'logic', difficulty: 600,
    stem: 'No reptiles have fur. Lizards are reptiles. Therefore, lizards have fur. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 1,
    explanation: 'FALSE. The premises directly contradict the conclusion: if no reptiles have fur and lizards are reptiles, then lizards do not have fur.'
  },
  {
    id: 'q-hsptv-fill-036', section: 'verbal-skills', topic: 'logic', difficulty: 640,
    stem: 'To pass the class a student must complete all assignments. Jen completed all assignments. Therefore, Jen passed the class. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 2,
    explanation: 'UNCERTAIN — completing assignments is stated as NECESSARY, not SUFFICIENT. Other requirements (exams, attendance) might also exist. The premises only say it is required, not that it alone guarantees passing.'
  },
  {
    id: 'q-hsptv-fill-037', section: 'verbal-skills', topic: 'logic', difficulty: 660,
    stem: 'Every dancer in the troupe is also a singer. No singer in the troupe wears glasses. Therefore, no dancer in the troupe wears glasses. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'TRUE — by chained syllogism. Every dancer is a singer, and no singer wears glasses, so no dancer wears glasses either.'
  },
  {
    id: 'q-hsptv-fill-038', section: 'verbal-skills', topic: 'logic', difficulty: 690,
    stem: 'If a book is on the top shelf, it is a hardcover. The book in question is a hardcover. Therefore, it is on the top shelf. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 2,
    explanation: 'UNCERTAIN — affirming the consequent. Top-shelf books are all hardcover, but the conditional says nothing about hardcovers elsewhere. The book could be a hardcover sitting on a different shelf.'
  },
  {
    id: 'q-hsptv-fill-039', section: 'verbal-skills', topic: 'logic', difficulty: 700,
    stem: 'All pears are sweeter than all lemons. Some apples are sweeter than every pear. Therefore, those apples are sweeter than every lemon. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'TRUE — by chained inequality. If those apples > every pear, and every pear > every lemon, then by transitivity those apples > every lemon.'
  },
  {
    id: 'q-hsptv-fill-040', section: 'verbal-skills', topic: 'logic', difficulty: 750,
    stem: 'Most members of the club voted for the proposal. Marco is a member of the club. Therefore, Marco voted for the proposal. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 2,
    explanation: 'UNCERTAIN. "Most" means more than half but not all. Marco is a member, but he might be in the minority who did NOT vote for it. The premises do not determine which group he is in.'
  },
]);
