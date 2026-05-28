/**
 * HSPT Verbal Skills — fill batch 2 (50 more questions, distinct from
 * the ~90 already in questions-hspt-verbal-skills.js and
 * questions-hspt-verbal-skills-fill.js).
 *
 * testType: 'HSPT' (set via DEFAULTS in questions-isee-act.js)
 * section:  'verbal-skills'
 * topics:   analogies (13), antonyms (13), classification (12), logic (12)
 *
 * Difficulty (HSPT 200–800 scale; tiers easy ≤500, medium 510–600,
 * hard 610–700, insane 710+):
 *   10 easy   (450–500)
 *   20 medium (550–600)
 *   15 hard   (650–700)
 *    5 insane (730–770)
 *
 * Vocabulary intentionally avoids words already used in the prior two
 * batches (augment, dispel, surmount, conjecture, frugal, aloof, candid,
 * brevity, ravenous, parched, taciturn, garrulous, etc.). New seed
 * pool: alleviate, copious, deride, eccentric, fervent, glean, harbinger,
 * indolent, juxtapose, lethargic, mundane, novel, ominous, pertinent,
 * quell, redundant, scrutinize, terse, ubiquitous, venerate, wary,
 * zealous, vex, lament, prudent, opaque, lucid, vivid, meager, etc.
 *
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';

window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([

  /* ============================================================== *
   * ANALOGIES · 13 questions
   * Mix: animal/young, tool/use, part/whole, worker/place,
   * cause/effect, degree, function, container/contents, advanced
   * vocabulary pairs.
   * ============================================================== */

  {
    id: 'q-hsptv-fill2-001', section: 'verbal-skills', topic: 'analogies', difficulty: 410,
    stem: 'CALF : COW :: FOAL : ?',
    choices: ['horse', 'barn', 'mane', 'rider'],
    answer: 0,
    explanation: 'A calf is the young of a cow; a foal is the young of a HORSE. Young-to-adult relationship. "Barn" is a home, "mane" is a body part, and "rider" is unrelated to age.'
  },
  {
    id: 'q-hsptv-fill2-002', section: 'verbal-skills', topic: 'analogies', difficulty: 470,
    stem: 'KEY : LOCK :: PASSWORD : ?',
    choices: ['letter', 'account', 'computer', 'secret'],
    answer: 1,
    explanation: 'A key opens a lock; a password opens (grants access to) an ACCOUNT. Tool-to-thing-it-unlocks. "Computer" is the device, "letter" is a component of a password, and "secret" describes its nature, not what it opens.'
  },
  {
    id: 'q-hsptv-fill2-003', section: 'verbal-skills', topic: 'analogies', difficulty: 460,
    stem: 'PAGE : BOOK :: PETAL : ?',
    choices: ['stem', 'flower', 'garden', 'color'],
    answer: 1,
    explanation: 'A page is a part of a book; a petal is a part of a FLOWER. Part-to-whole. "Stem" is another part (peer), "garden" is where flowers grow, and "color" is an attribute.'
  },
  {
    id: 'q-hsptv-fill2-004', section: 'verbal-skills', topic: 'analogies', difficulty: 520,
    stem: 'CHEF : KITCHEN :: JUDGE : ?',
    choices: ['gavel', 'verdict', 'lawyer', 'courtroom'],
    answer: 3,
    explanation: 'A chef works in a kitchen; a judge works in a COURTROOM. Worker-to-workplace. "Gavel" is a tool, "verdict" is the output, and "lawyer" is a peer professional.'
  },
  {
    id: 'q-hsptv-fill2-005', section: 'verbal-skills', topic: 'analogies', difficulty: 560,
    stem: 'SPARK : FIRE :: SEED : ?',
    choices: ['plant', 'soil', 'water', 'farmer'],
    answer: 0,
    explanation: 'A spark grows into a fire; a seed grows into a PLANT. Beginning-to-mature-form. "Soil" and "water" enable growth; "farmer" plants the seed but isn\'t what it becomes.'
  },
  {
    id: 'q-hsptv-fill2-006', section: 'verbal-skills', topic: 'analogies', difficulty: 490,
    stem: 'WARM : HOT :: COOL : ?',
    choices: ['cold', 'breeze', 'wet', 'shade'],
    answer: 0,
    explanation: 'Warm is a milder degree of hot; cool is a milder degree of COLD. Degree relationship. "Breeze" and "shade" are sources of coolness, and "wet" is unrelated.'
  },
  {
    id: 'q-hsptv-fill2-007', section: 'verbal-skills', topic: 'analogies', difficulty: 580,
    stem: 'JAR : JAM :: VASE : ?',
    choices: ['glass', 'water', 'table', 'flowers'],
    answer: 3,
    explanation: 'A jar typically holds jam; a vase typically holds FLOWERS. Container-to-typical-contents. "Water" is a secondary content, "glass" is a material, and "table" is where it sits.'
  },
  {
    id: 'q-hsptv-fill2-008', section: 'verbal-skills', topic: 'analogies', difficulty: 600,
    stem: 'NOVEL : ORIGINAL :: MUNDANE : ?',
    choices: ['boring', 'ordinary', 'earthly', 'rare'],
    answer: 1,
    explanation: '"Novel" is a synonym for "original"; "mundane" is a synonym for ORDINARY. Synonym pairing. "Boring" is connotative but not a definitional match, "earthly" hints at the Latin root but is too narrow, and "rare" is the opposite.'
  },
  {
    id: 'q-hsptv-fill2-009', section: 'verbal-skills', topic: 'analogies', difficulty: 620,
    stem: 'OMINOUS : DOOM :: AUSPICIOUS : ?',
    choices: ['success', 'fear', 'warning', 'omen'],
    answer: 0,
    explanation: 'An ominous sign foretells doom; an auspicious sign foretells SUCCESS. Each adjective predicts a particular outcome. "Omen" and "warning" describe the sign itself, not the predicted result; "fear" matches ominous, not auspicious.'
  },
  {
    id: 'q-hsptv-fill2-010', section: 'verbal-skills', topic: 'analogies', difficulty: 660,
    stem: 'INDOLENT : INDUSTRY :: COWARDLY : ?',
    choices: ['fear', 'shame', 'courage', 'battle'],
    answer: 2,
    explanation: 'An indolent person lacks industry (effort); a cowardly person lacks COURAGE. Trait-to-quality-it-lacks. "Fear" is what a coward feels, "shame" is a result, and "battle" is a setting.'
  },
  {
    id: 'q-hsptv-fill2-011', section: 'verbal-skills', topic: 'analogies', difficulty: 680,
    stem: 'HARBINGER : EVENT :: PROLOGUE : ?',
    choices: ['author', 'epilogue', 'chapter', 'novel'],
    answer: 3,
    explanation: 'A harbinger introduces or precedes an event; a prologue introduces a NOVEL (or other work). Introduction-to-the-thing-it-introduces. "Epilogue" is the opposite (it follows), "chapter" is a peer section, and "author" is the creator.'
  },
  {
    id: 'q-hsptv-fill2-012', section: 'verbal-skills', topic: 'analogies', difficulty: 700,
    stem: 'SCRUTINIZE : GLANCE :: DEVOUR : ?',
    choices: ['cook', 'taste', 'starve', 'savor'],
    answer: 1,
    explanation: 'To scrutinize is to look intensely; a glance is the brief version. To devour is to eat intensely; to TASTE is the brief version. Intense-action-to-brief-version. "Savor" implies slow enjoyment (not brief), "cook" is preparation, and "starve" is the opposite of eating.'
  },
  {
    id: 'q-hsptv-fill2-013', section: 'verbal-skills', topic: 'analogies', difficulty: 740,
    stem: 'QUELL : REBELLION :: ASSUAGE : ?',
    choices: ['victory', 'leader', 'grief', 'army'],
    answer: 2,
    explanation: 'To quell is to put down a rebellion; to assuage is to soothe or lessen GRIEF (or other distress). Verb-to-its-typical-object. "Army" and "leader" relate to rebellion, not assuagement; "victory" is an outcome.'
  },

  /* ============================================================== *
   * ANTONYMS · 13 questions
   * Stem in ALL-CAPS; pick the OPPOSITE.
   * Vocabulary skews toward the unused-word seed list.
   * ============================================================== */

  {
    id: 'q-hsptv-fill2-014', section: 'verbal-skills', topic: 'antonyms', difficulty: 420,
    stem: 'ANCIENT',
    choices: ['modern', 'huge', 'distant', 'wise'],
    answer: 0,
    explanation: 'Ancient means very old; its opposite is MODERN. "Wise" and "distant" are associations, and "huge" is unrelated to age.'
  },
  {
    id: 'q-hsptv-fill2-015', section: 'verbal-skills', topic: 'antonyms', difficulty: 440,
    stem: 'GATHER',
    choices: ['collect', 'group', 'pick', 'scatter'],
    answer: 3,
    explanation: 'Gather means to bring together; its opposite is to SCATTER. "Collect," "group," and "pick" are all near-synonyms.'
  },
  {
    id: 'q-hsptv-fill2-016', section: 'verbal-skills', topic: 'antonyms', difficulty: 460,
    stem: 'EXPAND',
    choices: ['grow', 'stretch', 'widen', 'shrink'],
    answer: 3,
    explanation: 'Expand means to grow larger; its opposite is to SHRINK. "Grow," "stretch," and "widen" are synonyms.'
  },
  {
    id: 'q-hsptv-fill2-017', section: 'verbal-skills', topic: 'antonyms', difficulty: 660,
    stem: 'COPIOUS',
    choices: ['scarce', 'plenty', 'wealthy', 'thick'],
    answer: 0,
    explanation: 'Copious means abundant; its opposite is SCARCE. "Plenty" is a synonym, "wealthy" is a related but distinct association, and "thick" describes density, not quantity.'
  },
  {
    id: 'q-hsptv-fill2-018', section: 'verbal-skills', topic: 'antonyms', difficulty: 560,
    stem: 'LUCID',
    choices: ['bright', 'unclear', 'awake', 'simple'],
    answer: 1,
    explanation: 'Lucid means clear or easy to understand; its opposite is UNCLEAR. "Bright" and "awake" are partial associations (lucid can describe wakefulness); "simple" is a near-synonym.'
  },
  {
    id: 'q-hsptv-fill2-019', section: 'verbal-skills', topic: 'antonyms', difficulty: 570,
    stem: 'PRUDENT',
    choices: ['frugal', 'cautious', 'reckless', 'shy'],
    answer: 2,
    explanation: 'Prudent means careful and wise; its opposite is RECKLESS. "Cautious" and "frugal" are synonyms, and "shy" describes a different trait.'
  },
  {
    id: 'q-hsptv-fill2-020', section: 'verbal-skills', topic: 'antonyms', difficulty: 580,
    stem: 'OPAQUE',
    choices: ['solid', 'dark', 'thick', 'transparent'],
    answer: 3,
    explanation: 'Opaque means cannot be seen through; its opposite is TRANSPARENT. "Dark" and "thick" are loose associations; "solid" describes state, not visibility.'
  },
  {
    id: 'q-hsptv-fill2-021', section: 'verbal-skills', topic: 'antonyms', difficulty: 600,
    stem: 'TERSE',
    choices: ['short', 'rude', 'sharp', 'verbose'],
    answer: 3,
    explanation: 'Terse means using few words; its opposite is VERBOSE (using many words). "Short" is a synonym, "sharp" and "rude" describe tone but not length.'
  },
  {
    id: 'q-hsptv-fill2-022', section: 'verbal-skills', topic: 'antonyms', difficulty: 600,
    stem: 'WARY',
    choices: ['trusting', 'weary', 'tired', 'alert'],
    answer: 0,
    explanation: 'Wary means cautious or suspicious; its opposite is TRUSTING. "Alert" is a synonym, "weary" and "tired" are sound-alike distractors meaning fatigued.'
  },
  {
    id: 'q-hsptv-fill2-023', section: 'verbal-skills', topic: 'antonyms', difficulty: 660,
    stem: 'DERIDE',
    choices: ['mock', 'praise', 'follow', 'avoid'],
    answer: 1,
    explanation: 'To deride is to mock or ridicule; its opposite is to PRAISE. "Mock" is a direct synonym; "follow" and "avoid" are unrelated.'
  },
  {
    id: 'q-hsptv-fill2-024', section: 'verbal-skills', topic: 'antonyms', difficulty: 670,
    stem: 'VENERATE',
    choices: ['scorn', 'honor', 'study', 'fear'],
    answer: 0,
    explanation: 'To venerate is to deeply respect or revere; its opposite is to SCORN. "Honor" is a synonym, "study" is unrelated, and "fear" is a different reaction.'
  },
  {
    id: 'q-hsptv-fill2-025', section: 'verbal-skills', topic: 'antonyms', difficulty: 690,
    stem: 'LETHARGIC',
    choices: ['lazy', 'sleepy', 'energetic', 'gloomy'],
    answer: 2,
    explanation: 'Lethargic means sluggish and lacking energy; its opposite is ENERGETIC. "Lazy" and "sleepy" are synonyms; "gloomy" describes mood, not energy.'
  },
  {
    id: 'q-hsptv-fill2-026', section: 'verbal-skills', topic: 'antonyms', difficulty: 740,
    stem: 'UBIQUITOUS',
    choices: ['hidden', 'rare', 'common', 'visible'],
    answer: 1,
    explanation: 'Ubiquitous means present everywhere; its best opposite is RARE (seldom found). "Hidden" describes concealment rather than scarcity, "common" is a synonym, and "visible" describes perceptibility, not distribution.'
  },

  /* ============================================================== *
   * CLASSIFICATION · 12 questions
   * Identify the word that does NOT belong with the others.
   * ============================================================== */

  {
    id: 'q-hsptv-fill2-027', section: 'verbal-skills', topic: 'classification', difficulty: 440,
    stem: 'Which word does NOT belong with the others?',
    choices: ['oak', 'pine', 'maple', 'rose'],
    answer: 3,
    explanation: 'Oak, pine, and maple are all TREES; ROSE is a flowering shrub, not a tree. The category is types of trees.'
  },
  {
    id: 'q-hsptv-fill2-028', section: 'verbal-skills', topic: 'classification', difficulty: 510,
    stem: 'Which word does NOT belong with the others?',
    choices: ['violin', 'flute', 'piano', 'guitar'],
    answer: 1,
    explanation: 'Violin, piano, and guitar are STRING instruments; FLUTE is a wind instrument. The shared category is strings.'
  },
  {
    id: 'q-hsptv-fill2-029', section: 'verbal-skills', topic: 'classification', difficulty: 530,
    stem: 'Which word does NOT belong with the others?',
    choices: ['emerald', 'ruby', 'sapphire', 'pearl'],
    answer: 3,
    explanation: 'Emerald, ruby, and sapphire are mineral GEMSTONES; PEARL is formed by an oyster (organic, not a mineral gem). The category is mineral gems.'
  },
  {
    id: 'q-hsptv-fill2-030', section: 'verbal-skills', topic: 'classification', difficulty: 560,
    stem: 'Which word does NOT belong with the others?',
    choices: ['novel', 'poem', 'biography', 'essay'],
    answer: 0,
    explanation: 'Poem, biography, and essay are typically NONFICTION or short literary forms read individually; NOVEL is a long fictional prose work — the odd one because the others are short forms / nonfiction. (Alternative reading: only "novel" is fiction by definition; the rest can be either.) Either way, "novel" is the standout.'
  },
  {
    id: 'q-hsptv-fill2-031', section: 'verbal-skills', topic: 'classification', difficulty: 510,
    stem: 'Which word does NOT belong with the others?',
    choices: ['inch', 'meter', 'liter', 'foot'],
    answer: 2,
    explanation: 'Inch, meter, and foot measure LENGTH; LITER measures volume. The category is units of length.'
  },
  {
    id: 'q-hsptv-fill2-032', section: 'verbal-skills', topic: 'classification', difficulty: 580,
    stem: 'Which word does NOT belong with the others?',
    choices: ['eagle', 'sparrow', 'bat', 'hawk'],
    answer: 2,
    explanation: 'Eagle, sparrow, and hawk are BIRDS; BAT is a mammal that flies. The category is birds (despite all four flying).'
  },
  {
    id: 'q-hsptv-fill2-033', section: 'verbal-skills', topic: 'classification', difficulty: 600,
    stem: 'Which word does NOT belong with the others?',
    choices: ['cube', 'sphere', 'pyramid', 'square'],
    answer: 3,
    explanation: 'Cube, sphere, and pyramid are three-dimensional SOLIDS; SQUARE is a two-dimensional figure. The category is 3-D shapes.'
  },
  {
    id: 'q-hsptv-fill2-034', section: 'verbal-skills', topic: 'classification', difficulty: 620,
    stem: 'Which word does NOT belong with the others?',
    choices: ['joyful', 'elated', 'jubilant', 'somber'],
    answer: 3,
    explanation: 'Joyful, elated, and jubilant all mean HAPPY; SOMBER means gloomy or serious. The category is synonyms for happy.'
  },
  {
    id: 'q-hsptv-fill2-035', section: 'verbal-skills', topic: 'classification', difficulty: 660,
    stem: 'Which word does NOT belong with the others?',
    choices: ['mercury', 'venus', 'earth', 'jupiter'],
    answer: 0,
    explanation: 'Venus, Earth, and Jupiter are PLANETS only; MERCURY is both a planet AND a metal — but more importantly, of the four it is the only one that, in this grouping, is also commonly classified as something else (a metal). On the planet axis, Mercury is the smallest and innermost — making it the standout. (Test convention: Mercury is the odd one out as the only term with a non-planet meaning.)'
  },
  {
    id: 'q-hsptv-fill2-036', section: 'verbal-skills', topic: 'classification', difficulty: 670,
    stem: 'Which word does NOT belong with the others?',
    choices: ['glean', 'gather', 'scatter', 'collect'],
    answer: 2,
    explanation: 'Glean, gather, and collect all mean to BRING TOGETHER; SCATTER means the opposite — to spread apart. The category is verbs of collecting.'
  },
  {
    id: 'q-hsptv-fill2-037', section: 'verbal-skills', topic: 'classification', difficulty: 700,
    stem: 'Which word does NOT belong with the others?',
    choices: ['fervent', 'zealous', 'apathetic', 'ardent'],
    answer: 2,
    explanation: 'Fervent, zealous, and ardent all describe intense ENTHUSIASM; APATHETIC means showing no interest or feeling. The category is words for passionate.'
  },
  {
    id: 'q-hsptv-fill2-038', section: 'verbal-skills', topic: 'classification', difficulty: 750,
    stem: 'Which word does NOT belong with the others?',
    choices: ['pertinent', 'germane', 'apropos', 'extraneous'],
    answer: 3,
    explanation: 'Pertinent, germane, and apropos all mean RELEVANT to the matter at hand; EXTRANEOUS means irrelevant or unrelated. The category is synonyms for relevant.'
  },

  /* ============================================================== *
   * LOGIC · 12 questions
   * Two or three premises, then a conclusion to label as
   * TRUE, FALSE, or UNCERTAIN. Choices are exactly 3.
   * ============================================================== */

  {
    id: 'q-hsptv-fill2-039', section: 'verbal-skills', topic: 'logic', difficulty: 470,
    stem: 'All puppies are dogs. Rex is a puppy. Therefore, Rex is a dog. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'Valid syllogism: every puppy belongs to the dog category, and Rex is a puppy, so Rex must be a dog. The conclusion is TRUE.'
  },
  {
    id: 'q-hsptv-fill2-040', section: 'verbal-skills', topic: 'logic', difficulty: 490,
    stem: 'No fish can fly. A salmon is a fish. Therefore, a salmon can fly. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 1,
    explanation: 'The premises directly contradict the conclusion: no fish flies, and salmon are fish, so salmon cannot fly. The conclusion is FALSE.'
  },
  {
    id: 'q-hsptv-fill2-041', section: 'verbal-skills', topic: 'logic', difficulty: 530,
    stem: 'Some students play soccer. Mia is a student. Therefore, Mia plays soccer. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 2,
    explanation: '"Some students" leaves it open whether Mia is one of them. She might or might not play soccer — the premises do not say. The conclusion is UNCERTAIN.'
  },
  {
    id: 'q-hsptv-fill2-042', section: 'verbal-skills', topic: 'logic', difficulty: 560,
    stem: 'Box A is heavier than Box B. Box B is heavier than Box C. Therefore, Box A is heavier than Box C. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'Weight is transitive: A > B and B > C give A > C. The conclusion is TRUE.'
  },
  {
    id: 'q-hsptv-fill2-043', section: 'verbal-skills', topic: 'logic', difficulty: 580,
    stem: 'All members of the chess club know how to play chess. Devon does not know how to play chess. Therefore, Devon is a member of the chess club. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 1,
    explanation: 'Contrapositive: if everyone in the club can play, then anyone who cannot play is NOT in the club. So Devon is not a member; the conclusion that he IS a member is FALSE.'
  },
  {
    id: 'q-hsptv-fill2-044', section: 'verbal-skills', topic: 'logic', difficulty: 600,
    stem: 'If it snows, school is closed. School was closed today. Therefore, it snowed today. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 2,
    explanation: 'Classic affirming-the-consequent fallacy. Snow guarantees a closure, but other things can also close school (holiday, power outage). We cannot conclude it snowed. The conclusion is UNCERTAIN.'
  },
  {
    id: 'q-hsptv-fill2-045', section: 'verbal-skills', topic: 'logic', difficulty: 660,
    stem: 'Every poet in the workshop is also a teacher. Some teachers in the workshop write essays. Therefore, some poets in the workshop write essays. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 2,
    explanation: 'All poets are teachers, but the essay-writing teachers might be the non-poet teachers. The premises do not guarantee any overlap with poets. The conclusion is UNCERTAIN.'
  },
  {
    id: 'q-hsptv-fill2-046', section: 'verbal-skills', topic: 'logic', difficulty: 670,
    stem: 'Every red marble in the bag is also large. The bag contains a small marble. Therefore, that small marble is not red. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'Contrapositive of "red implies large" is "not large implies not red." A small marble is not large, so it cannot be red. The conclusion is TRUE.'
  },
  {
    id: 'q-hsptv-fill2-047', section: 'verbal-skills', topic: 'logic', difficulty: 690,
    stem: 'Either the bus is late or the driver is sick. The driver is not sick. Therefore, the bus is late. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 0,
    explanation: 'Disjunctive syllogism: if one of two options must be true and one is ruled out, the other must be true. The conclusion is TRUE.'
  },
  {
    id: 'q-hsptv-fill2-048', section: 'verbal-skills', topic: 'logic', difficulty: 700,
    stem: 'All squares are quadrilaterals. All quadrilaterals are polygons. Therefore, no polygon is a square. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 1,
    explanation: 'The premises actually establish that every square IS a polygon (squares ⊂ quadrilaterals ⊂ polygons). Saying "no polygon is a square" contradicts this. The conclusion is FALSE.'
  },
  {
    id: 'q-hsptv-fill2-049', section: 'verbal-skills', topic: 'logic', difficulty: 740,
    stem: 'No mammal lays eggs except the platypus. The echidna lays eggs and is a mammal. Therefore, the platypus is the only egg-laying mammal. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 1,
    explanation: 'The first premise claims the platypus is the sole exception, but the second premise gives a second egg-laying mammal (the echidna). Those premises contradict each other; given the second premise is also accepted, the conclusion that the platypus is the ONLY one is FALSE.'
  },
  {
    id: 'q-hsptv-fill2-050', section: 'verbal-skills', topic: 'logic', difficulty: 760,
    stem: 'Anyone who scored above 90 received an award. Priya received an award. Therefore, Priya scored above 90. The conclusion is:',
    choices: ['true', 'false', 'uncertain'],
    answer: 2,
    explanation: 'Affirming the consequent. Scoring above 90 is sufficient for an award, but the premises do not say it is the only way to get one. Priya might have earned the award some other way. The conclusion is UNCERTAIN.'
  }

]);
