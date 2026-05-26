/**
 * SSAT Reading Comprehension — fill batch.
 * testType: 'SSAT', section: 'reading-comprehension'.
 * Concatenates onto window.STL_QUESTIONS_SSAT.
 */
'use strict';
window.STL_QUESTIONS_SSAT = (window.STL_QUESTIONS_SSAT || []).concat([
  // ============================================================
  // PASSAGE 1 — Literary fiction (lighthouse keeper)
  // ============================================================
  {
    id: 'q-ssatrc-fill-001',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 660,
    passage: 'Mira had tended the lighthouse for eleven winters, and in that time she had grown accustomed to the company of weather. The wind was a chatty neighbor, the fog a stubborn guest who overstayed every visit. When the supply boat finally arrived in April, the young pilot remarked that she must be terribly lonely out on the rocks. Mira only smiled. She did not bother explaining that loneliness, in her experience, was something one carried inland from cities, not something one found at the edge of the sea.',
    stem: 'The passage is primarily concerned with',
    choices: [
      'Mira\'s preparations for the arrival of the supply boat each spring',
      'a misunderstanding between Mira and the pilot about the nature of solitude',
      'the dangerous weather conditions that surround the lighthouse',
      'the difficulty of maintaining a working lighthouse in modern times'
    ],
    answer: 1,
    explanation: 'The passage centers on the pilot assuming Mira is lonely (line: "she must be terribly lonely") and Mira\'s contrasting view that loneliness is "carried inland from cities." (A) The boat is incidental. (C) Weather is a metaphor, not a danger. (D) Maintenance is never discussed.'
  },
  {
    id: 'q-ssatrc-fill-002',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 600,
    passage: 'Mira had tended the lighthouse for eleven winters, and in that time she had grown accustomed to the company of weather. The wind was a chatty neighbor, the fog a stubborn guest who overstayed every visit. When the supply boat finally arrived in April, the young pilot remarked that she must be terribly lonely out on the rocks. Mira only smiled. She did not bother explaining that loneliness, in her experience, was something one carried inland from cities, not something one found at the edge of the sea.',
    stem: 'As used in the passage, "tended" most nearly means',
    choices: [
      'leaned toward',
      'stretched out',
      'offered politely',
      'looked after'
    ],
    answer: 3,
    explanation: '"Tended the lighthouse for eleven winters" describes ongoing caretaking work, so "looked after" fits. (A) and (B) describe other senses of "tend"/"extend." (C) confuses "tendered" with "tended."'
  },
  {
    id: 'q-ssatrc-fill-003',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'Mira had tended the lighthouse for eleven winters, and in that time she had grown accustomed to the company of weather. The wind was a chatty neighbor, the fog a stubborn guest who overstayed every visit. When the supply boat finally arrived in April, the young pilot remarked that she must be terribly lonely out on the rocks. Mira only smiled. She did not bother explaining that loneliness, in her experience, was something one carried inland from cities, not something one found at the edge of the sea.',
    stem: 'The passage suggests that Mira does not explain herself to the pilot because',
    choices: [
      'she believes the pilot would not understand her perspective',
      'she is too tired from her work to engage in conversation',
      'she resents the pilot\'s late arrival with supplies',
      'she has been instructed to limit contact with visitors'
    ],
    answer: 0,
    explanation: 'Mira "did not bother explaining" implies she sees no point — her view of loneliness contradicts what city dwellers like the pilot would assume. (B), (C), and (D) introduce motives the passage never supports.'
  },

  // ============================================================
  // PASSAGE 2 — Natural science (octopus cognition)
  // ============================================================
  {
    id: 'q-ssatrc-fill-004',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 680,
    passage: 'Octopuses have long puzzled biologists who study intelligence. With two-thirds of their neurons distributed across their eight arms rather than centralized in a brain, an octopus does not so much command its limbs as collaborate with them. An arm can taste a crab, decide it is edible, and begin to grip it before the central brain has weighed in. This arrangement defies the assumption, common in vertebrate research, that thought must originate in a single command center. To understand the octopus, scientists are learning to abandon the idea of a single thinker behind every action.',
    stem: 'The passage is mainly about',
    choices: [
      'how octopuses use camouflage to capture prey such as crabs',
      'why octopus neurons differ chemically from vertebrate neurons',
      'how the octopus body challenges traditional ideas about intelligence',
      'the difficulty of training octopuses for laboratory experiments'
    ],
    answer: 2,
    explanation: 'The passage describes distributed neurons and ends by noting scientists must "abandon the idea of a single thinker," making (C) the central claim. (A) Camouflage is not mentioned. (B) Chemistry is not discussed. (D) Training is not addressed.'
  },
  {
    id: 'q-ssatrc-fill-005',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 580,
    passage: 'Octopuses have long puzzled biologists who study intelligence. With two-thirds of their neurons distributed across their eight arms rather than centralized in a brain, an octopus does not so much command its limbs as collaborate with them. An arm can taste a crab, decide it is edible, and begin to grip it before the central brain has weighed in. This arrangement defies the assumption, common in vertebrate research, that thought must originate in a single command center. To understand the octopus, scientists are learning to abandon the idea of a single thinker behind every action.',
    stem: 'According to the passage, what fraction of an octopus\'s neurons are located in its arms?',
    choices: [
      'one-third',
      'one-half',
      'two-thirds',
      'three-quarters'
    ],
    answer: 2,
    explanation: 'The passage states "two-thirds of their neurons distributed across their eight arms." Other fractions are simply incorrect.'
  },
  {
    id: 'q-ssatrc-fill-006',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 720,
    passage: 'Octopuses have long puzzled biologists who study intelligence. With two-thirds of their neurons distributed across their eight arms rather than centralized in a brain, an octopus does not so much command its limbs as collaborate with them. An arm can taste a crab, decide it is edible, and begin to grip it before the central brain has weighed in. This arrangement defies the assumption, common in vertebrate research, that thought must originate in a single command center. To understand the octopus, scientists are learning to abandon the idea of a single thinker behind every action.',
    stem: 'The example of an arm tasting and gripping a crab is included primarily to',
    choices: [
      'demonstrate the octopus\'s preferred diet in the wild',
      'compare octopus reflexes to those of vertebrate predators',
      'show that octopuses make mistakes when their arms act independently',
      'illustrate how decisions in an octopus can occur outside the central brain'
    ],
    answer: 3,
    explanation: 'The crab example follows directly from the claim that arms collaborate rather than wait for orders, supporting (D). (A) Diet is incidental. (C) No mistake is described — the action is successful. (B) No vertebrate comparison is made in this example.'
  },

  // ============================================================
  // PASSAGE 3 — Personal narrative (grandfather's workshop)
  // ============================================================
  {
    id: 'q-ssatrc-fill-007',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 580,
    passage: 'My grandfather kept a workshop behind the garage, and to step inside it was to enter a museum he had curated only for himself. Each tool hung on a pegboard outline traced in black marker, so even a missing wrench announced its absence. Sawdust gathered like snow in the corners, and the air carried the warm sweetness of cedar shavings. He never invited me in, exactly, but he never sent me out, either. I learned to sit on an overturned crate and watch, and I learned that some kinds of love do not require any words at all.',
    stem: 'The tone of the passage is best described as',
    choices: [
      'critical and disappointed',
      'fond and reflective',
      'anxious and uncertain',
      'amused and ironic'
    ],
    answer: 1,
    explanation: 'Phrases like "warm sweetness of cedar shavings" and "some kinds of love do not require any words" convey affection and looking back, supporting (B). (A) No criticism appears. (C) No anxiety is shown. (D) Tone is sincere, not ironic.'
  },
  {
    id: 'q-ssatrc-fill-008',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 700,
    passage: 'My grandfather kept a workshop behind the garage, and to step inside it was to enter a museum he had curated only for himself. Each tool hung on a pegboard outline traced in black marker, so even a missing wrench announced its absence. Sawdust gathered like snow in the corners, and the air carried the warm sweetness of cedar shavings. He never invited me in, exactly, but he never sent me out, either. I learned to sit on an overturned crate and watch, and I learned that some kinds of love do not require any words at all.',
    stem: 'It can be inferred from the passage that the grandfather',
    choices: [
      'wished his grandchild would help with woodworking projects',
      'considered the workshop a sacred space that should remain private',
      'was reluctant to share his workshop with any family members',
      'expressed warmth through actions and tolerance rather than speech'
    ],
    answer: 3,
    explanation: 'The grandfather "never invited me in...but he never sent me out either," and the narrator concludes "some kinds of love do not require any words." This points to (D). (A) The grandchild watched, not helped. (C) The grandchild was tolerated. (B) "Sacred" overstates the text.'
  },
  {
    id: 'q-ssatrc-fill-009',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 680,
    passage: 'My grandfather kept a workshop behind the garage, and to step inside it was to enter a museum he had curated only for himself. Each tool hung on a pegboard outline traced in black marker, so even a missing wrench announced its absence. Sawdust gathered like snow in the corners, and the air carried the warm sweetness of cedar shavings. He never invited me in, exactly, but he never sent me out, either. I learned to sit on an overturned crate and watch, and I learned that some kinds of love do not require any words at all.',
    stem: 'As used in the passage, "curated" most nearly means',
    choices: [
      'arranged with care',
      'healed slowly',
      'opened to visitors',
      'preserved with chemicals'
    ],
    answer: 0,
    explanation: 'A workshop "curated only for himself" with tools precisely arranged means "arranged with care." (B) confuses "curated" with "cured." (C) contradicts "only for himself." (D) is a different sense of preservation.'
  },

  // ============================================================
  // PASSAGE 4 — Social studies (the printing press in Korea)
  // ============================================================
  {
    id: 'q-ssatrc-fill-010',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 660,
    passage: 'Long before Gutenberg cast his famous metal types in fifteenth-century Mainz, Korean artisans of the Goryeo dynasty had developed movable metal type of their own. The Jikji, a Buddhist text printed in 1377, is generally regarded as the oldest surviving book made with this technology. For complicated reasons of geography and language, however, the Korean innovation did not spread widely beyond East Asia. Histories of printing written in European languages tended for centuries to overlook the earlier achievement, a pattern scholars have only recently begun to correct.',
    stem: 'According to the passage, the Jikji was printed in what year?',
    choices: [
      '1377',
      '1455',
      '1492',
      '1517'
    ],
    answer: 0,
    explanation: 'The passage explicitly identifies "the Jikji, a Buddhist text printed in 1377." Other dates are distractors associated with European events.'
  },
  {
    id: 'q-ssatrc-fill-011',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 680,
    passage: 'Long before Gutenberg cast his famous metal types in fifteenth-century Mainz, Korean artisans of the Goryeo dynasty had developed movable metal type of their own. The Jikji, a Buddhist text printed in 1377, is generally regarded as the oldest surviving book made with this technology. For complicated reasons of geography and language, however, the Korean innovation did not spread widely beyond East Asia. Histories of printing written in European languages tended for centuries to overlook the earlier achievement, a pattern scholars have only recently begun to correct.',
    stem: 'The passage is primarily concerned with',
    choices: [
      'arguing that Gutenberg copied his ideas from Korean artisans',
      'tracing the spread of Buddhist texts across medieval Asia',
      'noting an early non-European invention often missing from standard histories',
      'explaining the technical differences between Korean and European type'
    ],
    answer: 2,
    explanation: 'The passage establishes Korean priority and notes European histories "overlook the earlier achievement," which scholars are now correcting — choice (C). (A) No copying is alleged. (B) Buddhist texts are mentioned only as one example. (D) Technical comparison is not made.'
  },
  {
    id: 'q-ssatrc-fill-012',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 760,
    passage: 'Long before Gutenberg cast his famous metal types in fifteenth-century Mainz, Korean artisans of the Goryeo dynasty had developed movable metal type of their own. The Jikji, a Buddhist text printed in 1377, is generally regarded as the oldest surviving book made with this technology. For complicated reasons of geography and language, however, the Korean innovation did not spread widely beyond East Asia. Histories of printing written in European languages tended for centuries to overlook the earlier achievement, a pattern scholars have only recently begun to correct.',
    stem: 'The passage suggests that the omission of Korean printing from European histories was largely the result of',
    choices: [
      'deliberate efforts by European printers to discredit competitors',
      'the destruction of most early Korean printed materials',
      'limits of geography, language, and the perspective of the historians involved',
      'a lack of evidence that the Jikji was actually printed with movable type'
    ],
    answer: 2,
    explanation: 'The passage cites "complicated reasons of geography and language" and the focus of European-language histories — supporting (C). (A) "Deliberate" is not stated. (B) No destruction is mentioned. (D) The Jikji is described as "generally regarded" as authentic.'
  },

  // ============================================================
  // PASSAGE 5 — Arts/humanities (jazz improvisation)
  // ============================================================
  {
    id: 'q-ssatrc-fill-013',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 700,
    passage: 'A common misconception about jazz improvisation is that the soloist invents every note in the moment, free of plan or preparation. The truth is closer to the opposite. A skilled improviser has spent years internalizing scales, chord patterns, and phrases until they can be summoned without conscious thought. What sounds spontaneous is in fact the product of a vocabulary so deeply absorbed that the musician can speak in it freely, the way a poet who has memorized the dictionary may seem to invent language at will.',
    stem: 'The author\'s primary purpose in the passage is to',
    choices: [
      'argue that jazz musicians deserve more public recognition',
      'correct a popular misunderstanding about how improvisation works',
      'compare contemporary jazz unfavorably with classical music',
      'describe a step-by-step method for learning to improvise'
    ],
    answer: 1,
    explanation: 'The opening identifies a "common misconception" and the rest of the passage corrects it, matching (B). (A) Recognition is not the focus. (C) No comparison with classical music is made. (D) No method is offered.'
  },
  {
    id: 'q-ssatrc-fill-014',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 600,
    passage: 'A common misconception about jazz improvisation is that the soloist invents every note in the moment, free of plan or preparation. The truth is closer to the opposite. A skilled improviser has spent years internalizing scales, chord patterns, and phrases until they can be summoned without conscious thought. What sounds spontaneous is in fact the product of a vocabulary so deeply absorbed that the musician can speak in it freely, the way a poet who has memorized the dictionary may seem to invent language at will.',
    stem: 'According to the passage, the apparent spontaneity of jazz improvisation is the result of',
    choices: [
      'sudden bursts of inspiration during performance',
      'the influence of a small group of legendary improvisers',
      'careful written planning of each solo before the show',
      'years of internalizing scales, chord patterns, and phrases'
    ],
    answer: 3,
    explanation: 'The passage states improvisers spend "years internalizing scales, chord patterns, and phrases" — choice (D). (A) Inspiration is the misconception. (C) Written planning is not described. (B) No legendary figures are cited.'
  },
  {
    id: 'q-ssatrc-fill-015',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 660,
    passage: 'A common misconception about jazz improvisation is that the soloist invents every note in the moment, free of plan or preparation. The truth is closer to the opposite. A skilled improviser has spent years internalizing scales, chord patterns, and phrases until they can be summoned without conscious thought. What sounds spontaneous is in fact the product of a vocabulary so deeply absorbed that the musician can speak in it freely, the way a poet who has memorized the dictionary may seem to invent language at will.',
    stem: 'The tone of the passage can best be described as',
    choices: [
      'admiring but matter-of-fact in correcting an error',
      'dismissive of jazz as a serious art form',
      'nostalgic for an earlier era of jazz performance',
      'frustrated with audiences who do not understand music'
    ],
    answer: 0,
    explanation: 'The author respects jazz musicians (the analogy to poets is admiring) while calmly correcting a misunderstanding, matching (A). (B) The author admires the form. (C) No nostalgia is shown. (D) No frustration with audiences appears.'
  },

  // ============================================================
  // PASSAGE 6 — Literary fiction (the new student)
  // ============================================================
  {
    id: 'q-ssatrc-fill-016',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 660,
    passage: 'Theo arrived at the school in October, which everyone agreed was the worst possible month for a transfer. By then friend groups had hardened into shapes that did not easily admit a stranger. He chose a desk by the window on his first day and produced from his bag, with deliberate slowness, a book in a language no one in the class could read. Whether this was a defense or an invitation, it was difficult to tell. The girl behind him watched for a long moment, then leaned forward and asked him, quite seriously, what the title meant.',
    stem: 'The overall tone of the passage can best be described as',
    choices: [
      'bitter and accusing',
      'cheerful and energetic',
      'observant and quietly hopeful',
      'mocking and sarcastic'
    ],
    answer: 2,
    explanation: 'The passage notices small details (the window seat, the deliberate slowness) and ends on the girl\'s sincere question — observant and hopeful (C). (A) No bitterness. (B) The mood is too quiet for "cheerful." (D) No mockery.'
  },
  {
    id: 'q-ssatrc-fill-017',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 600,
    passage: 'Theo arrived at the school in October, which everyone agreed was the worst possible month for a transfer. By then friend groups had hardened into shapes that did not easily admit a stranger. He chose a desk by the window on his first day and produced from his bag, with deliberate slowness, a book in a language no one in the class could read. Whether this was a defense or an invitation, it was difficult to tell. The girl behind him watched for a long moment, then leaned forward and asked him, quite seriously, what the title meant.',
    stem: 'As used in the passage, "admit" most nearly means',
    choices: [
      'confess',
      'recognize as true',
      'apologize for',
      'allow in'
    ],
    answer: 3,
    explanation: 'Friend groups that "did not easily admit a stranger" means they did not let new people enter — "allow in." Other senses of "admit" (confessing, apologizing) do not fit groups including a person.'
  },
  {
    id: 'q-ssatrc-fill-018',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 700,
    passage: 'Theo arrived at the school in October, which everyone agreed was the worst possible month for a transfer. By then friend groups had hardened into shapes that did not easily admit a stranger. He chose a desk by the window on his first day and produced from his bag, with deliberate slowness, a book in a language no one in the class could read. Whether this was a defense or an invitation, it was difficult to tell. The girl behind him watched for a long moment, then leaned forward and asked him, quite seriously, what the title meant.',
    stem: 'The passage is best described as a portrait of',
    choices: [
      'a small but significant moment of possible connection',
      'the rigid social hierarchy of a typical school',
      'a student who refuses to engage with his new classmates',
      'a teacher\'s efforts to welcome a transfer student'
    ],
    answer: 0,
    explanation: 'The passage builds to the girl leaning forward and asking a sincere question — a small moment of possible connection, supporting (A). (B) Hierarchy is a backdrop. (C) Theo\'s engagement is ambiguous, not refused. (D) No teacher appears.'
  },

  // ============================================================
  // PASSAGE 7 — Natural science (mycorrhizal networks)
  // ============================================================
  {
    id: 'q-ssatrc-fill-019',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 680,
    passage: 'Beneath the floor of a healthy forest runs a quiet exchange that few visitors imagine. Threadlike fungi called mycorrhizae wrap themselves around the roots of trees and connect one tree to another in vast underground webs. Through these connections, sugars produced by larger trees can flow to seedlings struggling in the shade, and chemical alarm signals can travel from a tree under insect attack to its neighbors. The forest is not, in other words, a collection of solitary individuals competing for light. It is, at least in part, a cooperative enterprise.',
    stem: 'According to the passage, mycorrhizae allow trees to share which of the following?',
    choices: [
      'water and oxygen',
      'sugars and chemical signals',
      'pollen and seeds',
      'soil and minerals only'
    ],
    answer: 1,
    explanation: 'The passage states "sugars...can flow" and "chemical alarm signals can travel" through the network, matching (B). (A), (C), and (D) list items not mentioned in this exchange.'
  },
  {
    id: 'q-ssatrc-fill-020',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 720,
    passage: 'Beneath the floor of a healthy forest runs a quiet exchange that few visitors imagine. Threadlike fungi called mycorrhizae wrap themselves around the roots of trees and connect one tree to another in vast underground webs. Through these connections, sugars produced by larger trees can flow to seedlings struggling in the shade, and chemical alarm signals can travel from a tree under insect attack to its neighbors. The forest is not, in other words, a collection of solitary individuals competing for light. It is, at least in part, a cooperative enterprise.',
    stem: 'The author\'s primary purpose in the passage is to',
    choices: [
      'persuade readers to plant more trees in their neighborhoods',
      'describe the life cycle of forest fungi',
      'warn readers about insect threats to mature trees',
      'reframe the forest as a connected, partly cooperative system'
    ],
    answer: 3,
    explanation: 'The passage moves from describing mycorrhizal networks to the conclusion that the forest is "at least in part, a cooperative enterprise," supporting (D). (A) No call to action is given. (B) The fungal life cycle is not described. (C) Insects are an example, not the focus.'
  },
  {
    id: 'q-ssatrc-fill-021',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 600,
    passage: 'Beneath the floor of a healthy forest runs a quiet exchange that few visitors imagine. Threadlike fungi called mycorrhizae wrap themselves around the roots of trees and connect one tree to another in vast underground webs. Through these connections, sugars produced by larger trees can flow to seedlings struggling in the shade, and chemical alarm signals can travel from a tree under insect attack to its neighbors. The forest is not, in other words, a collection of solitary individuals competing for light. It is, at least in part, a cooperative enterprise.',
    stem: 'The tone of the passage can best be described as',
    choices: [
      'urgent and alarmed',
      'informative and quietly admiring',
      'skeptical and questioning',
      'playful and humorous'
    ],
    answer: 1,
    explanation: 'Phrases like "quiet exchange," "vast underground webs," and "cooperative enterprise" combine factual reporting with appreciation, matching (B). (A) No urgency. (C) No skepticism. (D) Tone is too thoughtful for "playful."'
  },

  // ============================================================
  // PASSAGE 8 — Social studies (the Silk Road as exchange)
  // ============================================================
  {
    id: 'q-ssatrc-fill-022',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'It is tempting to picture the Silk Road as a single highway crossing Asia, with caravans of merchants traveling from Chang\'an to the Mediterranean and back. In reality, the so-called road was a shifting network of routes, and few traders ever covered its full length. Goods passed from hand to hand in a long relay, gaining stories and changing prices at every market. What traveled most freely along these paths was not silk or spices but ideas: religions, alphabets, agricultural techniques, even musical scales moved between cultures who never met face to face.',
    stem: 'The passage suggests that the most important effect of the Silk Road was',
    choices: [
      'the rapid enrichment of merchants who traveled its full length',
      'the standardization of trade routes across all of Asia',
      'the exchange of ideas between cultures with no direct contact',
      'the eventual replacement of land routes with sea routes'
    ],
    answer: 2,
    explanation: 'The passage emphasizes that ideas — religions, alphabets, techniques — "moved between cultures who never met face to face," matching (C). (A) Few covered the full length. (B) Routes were "shifting," not standardized. (D) Sea routes are not discussed.'
  },
  {
    id: 'q-ssatrc-fill-023',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 660,
    passage: 'It is tempting to picture the Silk Road as a single highway crossing Asia, with caravans of merchants traveling from Chang\'an to the Mediterranean and back. In reality, the so-called road was a shifting network of routes, and few traders ever covered its full length. Goods passed from hand to hand in a long relay, gaining stories and changing prices at every market. What traveled most freely along these paths was not silk or spices but ideas: religions, alphabets, agricultural techniques, even musical scales moved between cultures who never met face to face.',
    stem: 'As used in the passage, "relay" most nearly means',
    choices: [
      'a broadcast signal',
      'a written record',
      'a competitive race',
      'a successive handoff'
    ],
    answer: 3,
    explanation: 'Goods "passed from hand to hand in a long relay" describes a series of handoffs — choice (D). (A) and (B) are unrelated senses. (C) suggests competition not implied here.'
  },
  {
    id: 'q-ssatrc-fill-024',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 700,
    passage: 'It is tempting to picture the Silk Road as a single highway crossing Asia, with caravans of merchants traveling from Chang\'an to the Mediterranean and back. In reality, the so-called road was a shifting network of routes, and few traders ever covered its full length. Goods passed from hand to hand in a long relay, gaining stories and changing prices at every market. What traveled most freely along these paths was not silk or spices but ideas: religions, alphabets, agricultural techniques, even musical scales moved between cultures who never met face to face.',
    stem: 'The passage is mainly concerned with',
    choices: [
      'correcting a simplified picture of the Silk Road and its true effects',
      'identifying which goods were most valuable on the Silk Road',
      'arguing that the Silk Road has been overrated by historians',
      'tracing the development of silk production in ancient China'
    ],
    answer: 0,
    explanation: 'The passage opens with the "tempting" picture, contrasts it with reality, and concludes with what really traveled — supporting (A). (B) Specific goods are mentioned only briefly. (C) No claim of overrating. (D) Silk production is not discussed.'
  },

  // ============================================================
  // PASSAGE 9 — Arts/humanities (Gothic cathedral architecture)
  // ============================================================
  {
    id: 'q-ssatrc-fill-025',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 580,
    passage: 'The medieval builders who raised the great Gothic cathedrals worked without blueprints in the modern sense. A master mason held the design in memory, traced it in chalk on plaster floors, and adjusted it as the walls rose. Stones were cut to fit specific positions, and a ribbed vault might be tested only when the wooden scaffolding came down. That so many of these buildings still stand, after seven or eight centuries, is a testament not to perfect plans but to the steady accumulation of practical knowledge passed from one generation of builders to the next.',
    stem: 'According to the passage, medieval master masons recorded their designs primarily',
    choices: [
      'in detailed paper blueprints filed at the cathedral',
      'in models built of wood and clay',
      'in memory and in chalk drawings on plaster floors',
      'in books copied by monks at nearby monasteries'
    ],
    answer: 2,
    explanation: 'The passage states the master mason "held the design in memory, traced it in chalk on plaster floors" — matching (C). (A) Contradicts "without blueprints." (B) and (D) are not mentioned.'
  },
  {
    id: 'q-ssatrc-fill-026',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'The medieval builders who raised the great Gothic cathedrals worked without blueprints in the modern sense. A master mason held the design in memory, traced it in chalk on plaster floors, and adjusted it as the walls rose. Stones were cut to fit specific positions, and a ribbed vault might be tested only when the wooden scaffolding came down. That so many of these buildings still stand, after seven or eight centuries, is a testament not to perfect plans but to the steady accumulation of practical knowledge passed from one generation of builders to the next.',
    stem: 'The passage implies that the durability of Gothic cathedrals is best explained by',
    choices: [
      'gradually refined building knowledge passed between generations',
      'the unusual strength of the stones available to medieval masons',
      'the strict supervision of cathedral construction by religious authorities',
      'the absence of natural disasters in medieval European cities'
    ],
    answer: 0,
    explanation: 'The passage names the cause as "the steady accumulation of practical knowledge passed from one generation of builders to the next," matching (A). (B), (C), and (D) introduce explanations the passage never offers.'
  },
  {
    id: 'q-ssatrc-fill-027',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 760,
    passage: 'The medieval builders who raised the great Gothic cathedrals worked without blueprints in the modern sense. A master mason held the design in memory, traced it in chalk on plaster floors, and adjusted it as the walls rose. Stones were cut to fit specific positions, and a ribbed vault might be tested only when the wooden scaffolding came down. That so many of these buildings still stand, after seven or eight centuries, is a testament not to perfect plans but to the steady accumulation of practical knowledge passed from one generation of builders to the next.',
    stem: 'The author mentions that vaults were "tested only when the wooden scaffolding came down" primarily to',
    choices: [
      'criticize medieval builders for taking dangerous shortcuts',
      'show the suspense and risk involved in cathedral construction',
      'explain why so many cathedrals were never actually completed',
      'highlight the inferiority of medieval methods compared to modern ones'
    ],
    answer: 1,
    explanation: 'Showing that the structure\'s success was unknown until the supports were removed dramatizes the risk and suspense the masons accepted, supporting (B). (A) The passage admires, not criticizes. (C) Many cathedrals were completed. (D) The passage praises medieval methods.'
  },

  // ============================================================
  // PASSAGE 10 — Personal narrative (early morning swim)
  // ============================================================
  {
    id: 'q-ssatrc-fill-028',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 600,
    passage: 'I was the first one to the pool every morning that summer, slipping in before the sun cleared the trees. The water held the chill of the previous night and made my shoulders flinch as I pushed off the wall. By the third lap I no longer noticed the cold; by the tenth, I had forgotten the stiffness in my legs and the worries waiting at home. Whatever happened later in the day, I had at least this: forty minutes of motion that belonged entirely to me.',
    stem: 'The tone of the passage is best described as',
    choices: [
      'quietly grateful',
      'angry and resentful',
      'distant and clinical',
      'fearful and hesitant'
    ],
    answer: 0,
    explanation: 'The narrator describes the swim as a refuge — "I had at least this: forty minutes...that belonged entirely to me" — conveying quiet gratitude (A). (B) No anger. (C) The voice is personal, not clinical. (D) Initial flinch passes; no fear remains.'
  },
  {
    id: 'q-ssatrc-fill-029',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 660,
    passage: 'I was the first one to the pool every morning that summer, slipping in before the sun cleared the trees. The water held the chill of the previous night and made my shoulders flinch as I pushed off the wall. By the third lap I no longer noticed the cold; by the tenth, I had forgotten the stiffness in my legs and the worries waiting at home. Whatever happened later in the day, I had at least this: forty minutes of motion that belonged entirely to me.',
    stem: 'The passage suggests that the narrator values morning swimming primarily because it',
    choices: [
      'helps the narrator improve as a competitive swimmer',
      'allows the narrator to socialize with other early swimmers',
      'fulfills a strict physical training requirement',
      'gives the narrator time away from troubles waiting elsewhere'
    ],
    answer: 3,
    explanation: 'The narrator forgets "the worries waiting at home" and claims forty minutes "that belonged entirely to me," matching (D). (A) No competition is mentioned. (B) The narrator is alone. (C) No requirement is described.'
  },
  {
    id: 'q-ssatrc-fill-030',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 760,
    passage: 'I was the first one to the pool every morning that summer, slipping in before the sun cleared the trees. The water held the chill of the previous night and made my shoulders flinch as I pushed off the wall. By the third lap I no longer noticed the cold; by the tenth, I had forgotten the stiffness in my legs and the worries waiting at home. Whatever happened later in the day, I had at least this: forty minutes of motion that belonged entirely to me.',
    stem: 'The author\'s sequence "By the third lap...by the tenth..." most likely serves to',
    choices: [
      'demonstrate how quickly the narrator was able to swim each lap',
      'mark a gradual transition from physical discomfort to mental relief',
      'emphasize the monotony and tedium of swimming long distances',
      'compare the narrator\'s pace to that of other swimmers'
    ],
    answer: 1,
    explanation: 'Each numbered lap marks a layer of discomfort dropping away, ending with mental release — supporting (B). (A) Speed isn\'t the focus. (C) The passage celebrates, not criticizes. (D) No other swimmers are present.'
  },

  // ============================================================
  // PASSAGE 11 — Astronomy (light pollution)
  // ============================================================
  {
    id: 'q-ssatrc-fill-031',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 660,
    passage: 'For most of human history, the night sky was a shared inheritance, visible from the doorstep of nearly every village. In the last hundred years, however, electric light spilling upward from cities has erased the stars for the majority of people on Earth. Astronomers call this haze "skyglow," and they note that even towns hours from a major city can lose sight of the Milky Way. Recovering the dark sky does not require turning off the lights; it asks only that we aim them downward, where they were meant to shine in the first place.',
    stem: 'The main idea of the passage is that',
    choices: [
      'astronomers should be given control over city lighting policies',
      'modern lighting has hidden the night sky, but a simple change could help',
      'the Milky Way is no longer visible from any populated region on Earth',
      'street lights are unnecessary in most modern cities'
    ],
    answer: 1,
    explanation: 'The passage describes the loss of the night sky and ends with a simple fix — aiming lights downward — supporting (B). (A) Policy control isn\'t proposed. (C) "Majority" is not "any." (D) The passage does not call for fewer lights.'
  },
  {
    id: 'q-ssatrc-fill-032',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 640,
    passage: 'For most of human history, the night sky was a shared inheritance, visible from the doorstep of nearly every village. In the last hundred years, however, electric light spilling upward from cities has erased the stars for the majority of people on Earth. Astronomers call this haze "skyglow," and they note that even towns hours from a major city can lose sight of the Milky Way. Recovering the dark sky does not require turning off the lights; it asks only that we aim them downward, where they were meant to shine in the first place.',
    stem: 'As used in the passage, "inheritance" most nearly means',
    choices: [
      'a sum of money received from a relative',
      'a legal document of ownership',
      'a collection of family memories',
      'something passed down to be shared'
    ],
    answer: 3,
    explanation: 'A "shared inheritance" describing the night sky available to all means something handed down for common use — choice (D). The other senses are too narrow or unrelated.'
  },
  {
    id: 'q-ssatrc-fill-033',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 580,
    passage: 'For most of human history, the night sky was a shared inheritance, visible from the doorstep of nearly every village. In the last hundred years, however, electric light spilling upward from cities has erased the stars for the majority of people on Earth. Astronomers call this haze "skyglow," and they note that even towns hours from a major city can lose sight of the Milky Way. Recovering the dark sky does not require turning off the lights; it asks only that we aim them downward, where they were meant to shine in the first place.',
    stem: 'According to the passage, what term do astronomers use for the haze that hides the stars?',
    choices: [
      'starshade',
      'lightfog',
      'skyglow',
      'nightblur'
    ],
    answer: 2,
    explanation: 'The passage explicitly states: "Astronomers call this haze \'skyglow.\'" The other terms are invented distractors.'
  },

  // ============================================================
  // PASSAGE 12 — Literary fiction (the lost letter)
  // ============================================================
  {
    id: 'q-ssatrc-fill-034',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 740,
    passage: 'Cleo found the letter at the back of a drawer she had emptied a dozen times before. The envelope was stamped but never mailed, addressed in her mother\'s slanted hand to a city Cleo had not known her mother had ever visited. She held it for a long while in the kitchen light without opening it. Whatever was inside, her mother had decided once not to send. Cleo wondered whether discovering it now was a kind of permission, or merely an accident she ought to respect.',
    stem: 'It can be inferred from the passage that Cleo hesitates to open the letter because she is unsure',
    choices: [
      'whether the letter contains bad news she would rather not know',
      'whether reading it would honor or violate her mother\'s original choice',
      'whether the letter is genuine or a forgery left by someone else',
      'whether her mother is still alive to discuss the letter\'s contents'
    ],
    answer: 1,
    explanation: 'Cleo wonders whether the discovery is "a kind of permission, or merely an accident she ought to respect" — directly framing (B). (A), (C), and (D) introduce concerns the passage does not raise.'
  },
  {
    id: 'q-ssatrc-fill-035',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 660,
    passage: 'Cleo found the letter at the back of a drawer she had emptied a dozen times before. The envelope was stamped but never mailed, addressed in her mother\'s slanted hand to a city Cleo had not known her mother had ever visited. She held it for a long while in the kitchen light without opening it. Whatever was inside, her mother had decided once not to send. Cleo wondered whether discovering it now was a kind of permission, or merely an accident she ought to respect.',
    stem: 'The detail that the drawer "she had emptied a dozen times before" is included primarily to',
    choices: [
      'show that Cleo is unusually careless about her belongings',
      'criticize Cleo\'s mother for hiding things from her family',
      'indicate that Cleo\'s home is small and crowded',
      'suggest that the letter\'s appearance feels strange or inexplicable'
    ],
    answer: 3,
    explanation: 'A drawer emptied many times yet still hiding the letter heightens the mystery — supporting (D). (A) The passage doesn\'t suggest carelessness. (B) No criticism of the mother. (C) Home size isn\'t at issue.'
  },
  {
    id: 'q-ssatrc-fill-036',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 600,
    passage: 'Cleo found the letter at the back of a drawer she had emptied a dozen times before. The envelope was stamped but never mailed, addressed in her mother\'s slanted hand to a city Cleo had not known her mother had ever visited. She held it for a long while in the kitchen light without opening it. Whatever was inside, her mother had decided once not to send. Cleo wondered whether discovering it now was a kind of permission, or merely an accident she ought to respect.',
    stem: 'The tone of the passage is best described as',
    choices: [
      'thoughtful and uncertain',
      'angry and accusing',
      'lighthearted and curious',
      'cold and detached'
    ],
    answer: 0,
    explanation: 'Cleo holds the letter "for a long while" and considers competing interpretations — thoughtful and uncertain (A). (B) No anger. (C) The mood is too weighty for "lighthearted." (D) Her wondering shows engagement, not detachment.'
  },

  // ============================================================
  // PASSAGE 13 — Natural science (monarch butterfly migration)
  // ============================================================
  {
    id: 'q-ssatrc-fill-037',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 640,
    passage: 'No single monarch butterfly completes the famous migration from Canada to the mountains of central Mexico. The trip takes several generations. Butterflies that emerge in late summer enter a special non-breeding state, fly south for thousands of kilometers, and overwinter clustered in oyamel fir trees. In spring, their descendants begin a relay back north, with each new generation living only a few weeks and traveling part of the way. How any of them know the route, having never made it before, is a question scientists have not fully answered.',
    stem: 'According to the passage, monarch butterflies that overwinter in Mexico cluster in trees of which species?',
    choices: [
      'sugar maple',
      'eastern white pine',
      'oyamel fir',
      'red oak'
    ],
    answer: 2,
    explanation: 'The passage names "oyamel fir trees" as the overwintering site. Other tree species are not mentioned.'
  },
  {
    id: 'q-ssatrc-fill-038',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 700,
    passage: 'No single monarch butterfly completes the famous migration from Canada to the mountains of central Mexico. The trip takes several generations. Butterflies that emerge in late summer enter a special non-breeding state, fly south for thousands of kilometers, and overwinter clustered in oyamel fir trees. In spring, their descendants begin a relay back north, with each new generation living only a few weeks and traveling part of the way. How any of them know the route, having never made it before, is a question scientists have not fully answered.',
    stem: 'The passage is mainly about',
    choices: [
      'how the monarch migration is shared across multiple generations',
      'recent threats to monarch overwintering sites in Mexico',
      'why monarchs prefer warmer climates over colder ones',
      'the techniques scientists use to tag and track butterflies'
    ],
    answer: 0,
    explanation: 'The opening claim — no single butterfly completes the trip — frames the rest as an explanation of multi-generation migration, supporting (A). (B) Threats are not discussed. (C) Climate preference isn\'t the focus. (D) No tagging techniques appear.'
  },
  {
    id: 'q-ssatrc-fill-039',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 700,
    passage: 'No single monarch butterfly completes the famous migration from Canada to the mountains of central Mexico. The trip takes several generations. Butterflies that emerge in late summer enter a special non-breeding state, fly south for thousands of kilometers, and overwinter clustered in oyamel fir trees. In spring, their descendants begin a relay back north, with each new generation living only a few weeks and traveling part of the way. How any of them know the route, having never made it before, is a question scientists have not fully answered.',
    stem: 'As used in the passage, "overwinter" most nearly means',
    choices: [
      'survive a single night of cold',
      'spend the winter season in a particular place',
      'fly through stormy winter weather',
      'reproduce during the coldest months'
    ],
    answer: 1,
    explanation: 'Butterflies "overwinter clustered in oyamel fir trees" means they pass the winter season there — choice (B). (A) is too brief. (C) and (D) describe activities the passage does not assign to the overwintering behavior.'
  },

  // ============================================================
  // PASSAGE 14 — Arts/humanities (a painter's small studio)
  // ============================================================
  {
    id: 'q-ssatrc-fill-040',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 780,
    passage: 'The painter Rosa Bento worked her entire career in a studio scarcely larger than a closet, and she insisted that the constraint had been a gift. With no room to step back from a canvas, she was forced to paint in fragments, completing a square inch at a time and trusting that the parts would cohere when she finally carried the finished work into the courtyard for inspection. Critics sometimes mistake her surfaces for the result of careful planning. They are, in fact, an act of faith repeated thousands of times.',
    stem: 'As used in the passage, "cohere" most nearly means',
    choices: [
      'fade gradually',
      'stick together as a unified whole',
      'be separated into parts',
      'attract public attention'
    ],
    answer: 1,
    explanation: 'Bento trusts that fragments painted one inch at a time would "cohere" — that is, hold together as a unified picture — choice (B). (A) is unrelated. (C) is the opposite. (D) confuses cohere with attract.'
  }
]);
