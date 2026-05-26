/**
 * SSAT Reading Comprehension — short original passages with 2-3
 * comprehension questions each. Mix of literary, science, social
 * studies, arts. SSAT Upper Level scored section.
 *
 * testType: 'SSAT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'reading-comprehension'
 *
 * Topics:
 *   main-idea | detail | inference | vocab-in-context | tone | purpose
 *
 * Difficulty maps to the SSAT 500-800 scale (tiers: easy <=600,
 * medium 610-680, hard 690-750, insane 760+). Spread:
 *   8  easy (<=600)
 *   16 medium (660)
 *   12 hard (720)
 *   4  insane (770)
 *
 * Topic spread targets ~7 each (main-idea 7, detail 7, inference 7,
 * vocab-in-context 7, tone 6, purpose 6).
 *
 * 15 original passages. Mix:
 *   4 literary fiction
 *   3 personal narrative / poetry-adjacent
 *   3 natural science (animal behavior, environment, astronomy)
 *   3 social studies (history, geography, economics)
 *   3 arts/humanities (music, painting, architecture)
 *
 * All passages are ORIGINAL; do not quote real published works.
 *
 * Concatenates onto window.STL_QUESTIONS_SSAT so the existing SSAT
 * verbal + math pools stay together. Loaded AFTER questions-isee-act.js
 * (which sets the SSAT array and DEFAULTS so testType='SSAT').
 */
'use strict';

window.STL_QUESTIONS_SSAT = (window.STL_QUESTIONS_SSAT || []).concat([

  /* ============================================================== *
   * PASSAGE 1 — Literary fiction (modern short story)
   * Quiet domestic scene; testing inference + tone + main idea.
   * ============================================================== */

  {
    id: 'q-ssatrc-001',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 600,
    passage: 'Mira sat at the kitchen table long after the others had gone to bed, turning the chipped coffee mug in her hands. The radiator hissed. Outside, a single car eased down the slick street and disappeared. She had rehearsed the conversation a dozen times during dinner, smiling at the right moments, laughing when her brother told the old story about the canoe. Now, in the lamplight, the words she had practiced felt thin, like paper held up to a window. She would tell them tomorrow. Tomorrow, she promised the empty kitchen, and rinsed the mug and set it carefully upside down on the rack.',
    stem: 'The passage is mainly about',
    choices: ['a woman struggling to share something difficult with her family.', 'a woman who has lost interest in her family.', 'a quiet evening interrupted by an unexpected visitor.', 'the comfort a person finds in everyday household tasks.'],
    answer: 0,
    explanation: 'The passage centers on Mira "rehears[ing] the conversation a dozen times" and putting off telling her family ("She would tell them tomorrow"). (A) misreads her behavior at dinner, where she engages warmly. (C) invents a visitor; the car merely passes. (D) is too narrow — the rinsed mug is one detail, not the focus.'
  },

  {
    id: 'q-ssatrc-002',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 720,
    passage: 'Mira sat at the kitchen table long after the others had gone to bed, turning the chipped coffee mug in her hands. The radiator hissed. Outside, a single car eased down the slick street and disappeared. She had rehearsed the conversation a dozen times during dinner, smiling at the right moments, laughing when her brother told the old story about the canoe. Now, in the lamplight, the words she had practiced felt thin, like paper held up to a window. She would tell them tomorrow. Tomorrow, she promised the empty kitchen, and rinsed the mug and set it carefully upside down on the rack.',
    stem: 'The tone of the passage can best be described as',
    choices: ['bitter and resentful.', 'quietly anxious.', 'cheerful and grateful.', 'urgent and alarmed.'],
    answer: 1,
    explanation: 'The hissing radiator, the car that "disappeared," and the words that "felt thin, like paper" combine into a hushed, uneasy mood. (A) ignores her hesitation. (B) overreaches — she shows no resentment toward her family. (D) is too strong; she defers, she does not panic.'
  },

  {
    id: 'q-ssatrc-003',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'Mira sat at the kitchen table long after the others had gone to bed, turning the chipped coffee mug in her hands. The radiator hissed. Outside, a single car eased down the slick street and disappeared. She had rehearsed the conversation a dozen times during dinner, smiling at the right moments, laughing when her brother told the old story about the canoe. Now, in the lamplight, the words she had practiced felt thin, like paper held up to a window. She would tell them tomorrow. Tomorrow, she promised the empty kitchen, and rinsed the mug and set it carefully upside down on the rack.',
    stem: 'The simile "like paper held up to a window" most strongly suggests that Mira feels her words are',
    choices: [
      'beautifully written.',
      'too fragile or transparent to do their job.',
      'too long for the moment.',
      'borrowed from someone else.'
    ],
    answer: 1,
    explanation: 'Paper held to a window is thin and see-through; combined with "felt thin," the simile conveys fragility and inadequacy. (A) misses the negative connotation. (C) is unsupported. (D) introduces an idea (plagiarism) the passage never raises.'
  },

  /* ============================================================== *
   * PASSAGE 2 — Natural science (animal behavior — octopus)
   * Detail + purpose + vocab.
   * ============================================================== */

  {
    id: 'q-ssatrc-004',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 580,
    passage: 'For most of the twentieth century, biologists assumed that intelligence belonged to vertebrates: mammals, birds, and a few unusually clever fish. The octopus quietly upended that assumption. With nine brain-like clusters of nerves — one central, eight distributed through its arms — an octopus can solve mazes, open childproof jars, and recognize individual human keepers. In one aquarium experiment, an octopus learned to squirt water at a specific overhead lamp that flickered, apparently to short it out. Such behavior is remarkable not only because the octopus has no skeleton or backbone, but because its lineage diverged from ours more than five hundred million years ago. Whatever an octopus is doing when it solves a problem, it is doing it differently than we are.',
    stem: 'According to the passage, an octopus has how many clusters of nerves?',
    choices: ['One', 'Five hundred million', 'Eight', 'Nine'],
    answer: 3,
    explanation: 'The passage states the octopus has "nine brain-like clusters of nerves — one central, eight distributed through its arms." (A) and (B) name the parts of the nine. (D) refers to years since divergence, not nerve clusters.'
  },

  {
    id: 'q-ssatrc-005',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 720,
    passage: 'For most of the twentieth century, biologists assumed that intelligence belonged to vertebrates: mammals, birds, and a few unusually clever fish. The octopus quietly upended that assumption. With nine brain-like clusters of nerves — one central, eight distributed through its arms — an octopus can solve mazes, open childproof jars, and recognize individual human keepers. In one aquarium experiment, an octopus learned to squirt water at a specific overhead lamp that flickered, apparently to short it out. Such behavior is remarkable not only because the octopus has no skeleton or backbone, but because its lineage diverged from ours more than five hundred million years ago. Whatever an octopus is doing when it solves a problem, it is doing it differently than we are.',
    stem: 'The author mentions the lamp experiment primarily to',
    choices: ['warn aquariums to use protective covers on their lights.', 'explain how octopuses produce water jets.', 'prove that octopuses dislike bright light.', 'illustrate how octopuses can act with apparent purpose.'],
    answer: 3,
    explanation: 'The example follows the claim that an octopus can "solve mazes" and is offered as a vivid case of goal-directed behavior ("apparently to short it out"). (A) is practical advice the passage does not give. (C) overreads the example. (D) confuses an example with an anatomy lesson.'
  },

  {
    id: 'q-ssatrc-006',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 660,
    passage: 'For most of the twentieth century, biologists assumed that intelligence belonged to vertebrates: mammals, birds, and a few unusually clever fish. The octopus quietly upended that assumption. With nine brain-like clusters of nerves — one central, eight distributed through its arms — an octopus can solve mazes, open childproof jars, and recognize individual human keepers. In one aquarium experiment, an octopus learned to squirt water at a specific overhead lamp that flickered, apparently to short it out. Such behavior is remarkable not only because the octopus has no skeleton or backbone, but because its lineage diverged from ours more than five hundred million years ago. Whatever an octopus is doing when it solves a problem, it is doing it differently than we are.',
    stem: 'As used in the passage, the word "upended" most nearly means',
    choices: ['turned upside down physically.', 'overturned or contradicted.', 'gently questioned.', 'finished or completed.'],
    answer: 1,
    explanation: 'The octopus "upended that assumption" — the object is an idea, not a physical object, so the figurative meaning ("overturned, contradicted") fits. (A) is the literal meaning, wrong here. (C) and (D) are too weak; the octopus has clearly disproved the assumption.'
  },

  /* ============================================================== *
   * PASSAGE 3 — Social studies (economics — early paper money)
   * Main idea + detail + inference.
   * ============================================================== */

  {
    id: 'q-ssatrc-007',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 660,
    passage: 'Long before paper money was common in Europe, merchants in the Tang and Song dynasties of China were already trading slips of printed paper for goods. The earliest of these notes, called jiaozi, were issued in the eleventh century by private merchant houses in Sichuan. Carrying strings of heavy iron coins across mountains was slow and dangerous; a paper receipt that could be redeemed in a distant city was lighter and far easier to hide. The state soon recognized both the convenience and the risk: when too many notes were printed, prices climbed and the notes lost value. By the thirteenth century, the imperial government had taken over their issue, setting the stage for centuries of experiments with paper currency.',
    stem: 'Which of the following best states the main idea of the passage?',
    choices: ['The Song dynasty invented printing as a way to make money.', 'Iron coins were too heavy for ordinary use.', 'The Sichuan region produced China\'s wealthiest merchants.', 'Paper money emerged in China to solve practical problems and was eventually controlled by the state.'],
    answer: 3,
    explanation: 'The passage traces paper money from a merchant convenience ("lighter and far easier to hide") to government issue ("the imperial government had taken over their issue"). (A) is one supporting detail. (B) is unsupported. (D) confuses paper money with the invention of printing itself.'
  },

  {
    id: 'q-ssatrc-008',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 600,
    passage: 'Long before paper money was common in Europe, merchants in the Tang and Song dynasties of China were already trading slips of printed paper for goods. The earliest of these notes, called jiaozi, were issued in the eleventh century by private merchant houses in Sichuan. Carrying strings of heavy iron coins across mountains was slow and dangerous; a paper receipt that could be redeemed in a distant city was lighter and far easier to hide. The state soon recognized both the convenience and the risk: when too many notes were printed, prices climbed and the notes lost value. By the thirteenth century, the imperial government had taken over their issue, setting the stage for centuries of experiments with paper currency.',
    stem: 'According to the passage, the first jiaozi were issued by',
    choices: ['the Tang dynasty\'s imperial mint.', 'European trading companies.', 'private merchant houses in Sichuan.', 'thirteenth-century government officials.'],
    answer: 2,
    explanation: 'The passage says jiaozi were "issued in the eleventh century by private merchant houses in Sichuan." (A) and (D) refer to the later state takeover. (C) reverses the geography — Europe is what China preceded.'
  },

  {
    id: 'q-ssatrc-009',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'Long before paper money was common in Europe, merchants in the Tang and Song dynasties of China were already trading slips of printed paper for goods. The earliest of these notes, called jiaozi, were issued in the eleventh century by private merchant houses in Sichuan. Carrying strings of heavy iron coins across mountains was slow and dangerous; a paper receipt that could be redeemed in a distant city was lighter and far easier to hide. The state soon recognized both the convenience and the risk: when too many notes were printed, prices climbed and the notes lost value. By the thirteenth century, the imperial government had taken over their issue, setting the stage for centuries of experiments with paper currency.',
    stem: 'The passage suggests that issuing too much paper money tended to cause',
    choices: ['a rise in prices and a loss of trust in the notes.', 'the collapse of the imperial government.', 'a shortage of iron coins.', 'an immediate ban on paper currency.'],
    answer: 0,
    explanation: 'The passage says when "too many notes were printed, prices climbed and the notes lost value" — the textbook description of inflation. (A) is unsupported. (C) is contradicted: the state regulated rather than banned. (D) overstates the consequences.'
  },

  /* ============================================================== *
   * PASSAGE 4 — Personal narrative / poetry-adjacent
   * Nostalgic memory of a grandfather's workshop.
   * ============================================================== */

  {
    id: 'q-ssatrc-010',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 660,
    passage: 'My grandfather\'s workshop smelled of cedar shavings and machine oil, a smell I have never been able to find anywhere else. He would set me on an upturned crate while he planed a board, and the long curls of wood would fall around my sneakers in soft, pale ribbons. He rarely spoke. When he did, it was usually to point: see how the grain runs here, see how this knot will catch the blade. I learned to listen for the things he did not say. Years later, when the workshop was sold and the tools scattered, I kept one of his pencils, dull and flat, in a drawer near my desk.',
    stem: 'The tone of the passage is best described as',
    choices: ['bitter and accusing.', 'nostalgic and tender.', 'amused and playful.', 'detached and analytical.'],
    answer: 1,
    explanation: 'The smell "I have never been able to find anywhere else," the kept pencil, and the soft physical details create warmth tinged with loss. (B) is contradicted by the affectionate descriptions. (C) misses the loss in the closing line. (D) ignores the speaker\'s emotional investment.'
  },

  {
    id: 'q-ssatrc-011',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'My grandfather\'s workshop smelled of cedar shavings and machine oil, a smell I have never been able to find anywhere else. He would set me on an upturned crate while he planed a board, and the long curls of wood would fall around my sneakers in soft, pale ribbons. He rarely spoke. When he did, it was usually to point: see how the grain runs here, see how this knot will catch the blade. I learned to listen for the things he did not say. Years later, when the workshop was sold and the tools scattered, I kept one of his pencils, dull and flat, in a drawer near my desk.',
    stem: 'The statement "I learned to listen for the things he did not say" most strongly suggests that the grandfather',
    choices: ['expected the narrator to read his mind in dangerous situations.', 'communicated meaningfully even without many words.', 'frequently lost his temper in silence.', 'preferred written notes to spoken instructions.'],
    answer: 1,
    explanation: 'The grandfather "rarely spoke" but pointed and demonstrated; the narrator presents this as a kind of teaching, not a problem. (B) introduces anger the passage never shows. (C) is too extreme ("dangerous"). (D) invents written notes that are not in the passage.'
  },

  {
    id: 'q-ssatrc-012',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 770,
    passage: 'My grandfather\'s workshop smelled of cedar shavings and machine oil, a smell I have never been able to find anywhere else. He would set me on an upturned crate while he planed a board, and the long curls of wood would fall around my sneakers in soft, pale ribbons. He rarely spoke. When he did, it was usually to point: see how the grain runs here, see how this knot will catch the blade. I learned to listen for the things he did not say. Years later, when the workshop was sold and the tools scattered, I kept one of his pencils, dull and flat, in a drawer near my desk.',
    stem: 'The author most likely ends the passage with the detail of the kept pencil in order to',
    choices: ['imply that the narrator now works as a carpenter.', 'make a quiet symbol of how the grandfather\'s influence persists.', 'criticize the family for selling the workshop.', 'show how cluttered the narrator\'s desk has become.'],
    answer: 1,
    explanation: 'A "dull and flat" pencil kept "near my desk" is small and worn, yet the narrator chose it from scattered tools — its smallness against its keeping is what makes it symbolic of lasting influence. (A) misreads the loving placement as clutter. (B) is unsupported. (D) projects an accusation absent from the gentle final line.'
  },

  /* ============================================================== *
   * PASSAGE 5 — Astronomy (natural science)
   * Detail + main idea + vocab.
   * ============================================================== */

  {
    id: 'q-ssatrc-013',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 660,
    passage: 'A comet is essentially a dirty snowball wandering on a long, lazy orbit. Most spend their lives in the cold outer reaches of the solar system, far past Neptune, where sunlight is too weak to do them any harm. Occasionally, a passing star or a gravitational nudge sends one looping toward the Sun. As it warms, the ice on its surface turns directly to gas, dragging dust along with it. The result is the comet\'s famous tail, which can stretch for millions of kilometers and always points away from the Sun, regardless of the direction the comet is traveling. After a few close passes, much of that loose ice is gone, and the comet is reduced to a darker, quieter version of itself.',
    stem: 'The passage is mainly concerned with',
    choices: ['the difference between comets and asteroids.', 'how scientists predict when a comet will return.', 'how comets form their tails and change as they approach the Sun.', 'the discovery of new comets beyond Neptune.'],
    answer: 2,
    explanation: 'The passage moves from where comets live, to what happens when one approaches the Sun, to how the tail forms and the comet wears down — a unified description of comet behavior near the Sun. (B) is not the focus. (C) and (D) are topics the passage never discusses.'
  },

  {
    id: 'q-ssatrc-014',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 600,
    passage: 'A comet is essentially a dirty snowball wandering on a long, lazy orbit. Most spend their lives in the cold outer reaches of the solar system, far past Neptune, where sunlight is too weak to do them any harm. Occasionally, a passing star or a gravitational nudge sends one looping toward the Sun. As it warms, the ice on its surface turns directly to gas, dragging dust along with it. The result is the comet\'s famous tail, which can stretch for millions of kilometers and always points away from the Sun, regardless of the direction the comet is traveling. After a few close passes, much of that loose ice is gone, and the comet is reduced to a darker, quieter version of itself.',
    stem: 'According to the passage, a comet\'s tail',
    choices: ['points toward the nearest planet.', 'always points away from the Sun.', 'has no fixed direction.', 'always points in the direction the comet is traveling.'],
    answer: 1,
    explanation: 'The passage explicitly states the tail "always points away from the Sun, regardless of the direction the comet is traveling." (A) is the opposite of the passage. (C) and (D) contradict the explicit claim.'
  },

  {
    id: 'q-ssatrc-015',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 660,
    passage: 'A comet is essentially a dirty snowball wandering on a long, lazy orbit. Most spend their lives in the cold outer reaches of the solar system, far past Neptune, where sunlight is too weak to do them any harm. Occasionally, a passing star or a gravitational nudge sends one looping toward the Sun. As it warms, the ice on its surface turns directly to gas, dragging dust along with it. The result is the comet\'s famous tail, which can stretch for millions of kilometers and always points away from the Sun, regardless of the direction the comet is traveling. After a few close passes, much of that loose ice is gone, and the comet is reduced to a darker, quieter version of itself.',
    stem: 'As used in the passage, the word "lazy" most nearly means',
    choices: ['careless and sloppy.', 'unwilling to work.', 'slow and unhurried.', 'unusually short.'],
    answer: 2,
    explanation: 'A "long, lazy orbit" describes the comet\'s slow, drawn-out motion. (A) and (B) are common meanings of "lazy" applied to people, not orbits. (D) is the opposite of "long."'
  },

  /* ============================================================== *
   * PASSAGE 6 — Arts/humanities (architecture — Gothic cathedrals)
   * Purpose + inference.
   * ============================================================== */

  {
    id: 'q-ssatrc-016',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 660,
    passage: 'Walk into a Gothic cathedral and the eye is pulled upward almost against your will. That was the point. Twelfth-century builders, working with stone that wanted to crumble under its own weight, devised pointed arches and external supports called flying buttresses. These innovations let them push walls thinner and higher than ever before, and to fill the new space with sheets of colored glass. The light that resulted was meant to feel like nothing on earth: shifting, jewel-toned, almost weightless. For a worshipper standing on a worn flagstone floor, the message was clear without a single word being spoken — heaven was up, and architecture could lead you there.',
    stem: 'The author wrote this passage primarily to',
    choices: ['explain how Gothic architecture used technical innovations to create a spiritual effect.', 'describe the dangers of medieval stone construction.', 'argue that Gothic cathedrals are the most beautiful buildings ever made.', 'compare Gothic architecture with modern building styles.'],
    answer: 0,
    explanation: 'The passage names two innovations (pointed arches, flying buttresses) and links them to a deliberate spiritual effect ("heaven was up"). (A) is too sweeping a claim. (C) introduces a comparison the passage does not make. (D) treats supporting context as the main aim.'
  },

  {
    id: 'q-ssatrc-017',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'Walk into a Gothic cathedral and the eye is pulled upward almost against your will. That was the point. Twelfth-century builders, working with stone that wanted to crumble under its own weight, devised pointed arches and external supports called flying buttresses. These innovations let them push walls thinner and higher than ever before, and to fill the new space with sheets of colored glass. The light that resulted was meant to feel like nothing on earth: shifting, jewel-toned, almost weightless. For a worshipper standing on a worn flagstone floor, the message was clear without a single word being spoken — heaven was up, and architecture could lead you there.',
    stem: 'The passage suggests that flying buttresses were important because they',
    choices: ['made cathedrals cheaper to build.', 'eliminated the need for stone in construction.', 'were decorative carvings on the cathedral floor.', 'allowed walls to be thinner so larger windows became possible.'],
    answer: 3,
    explanation: 'The buttresses "let them push walls thinner and higher than ever before, and to fill the new space with sheets of colored glass" — the structural payoff was bigger windows. (B) is unsupported. (C) is contradicted; cathedrals are stone. (D) misidentifies what buttresses are.'
  },

  /* ============================================================== *
   * PASSAGE 7 — Literary fiction (boy at lakefront)
   * Tone + detail + main idea.
   * ============================================================== */

  {
    id: 'q-ssatrc-018',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 600,
    passage: 'Toby was the only one still on the dock when the camp bell sounded for dinner. He could see the others in clusters on the path, towels slung over shoulders, laughing about something he had not been near enough to hear. He counted to ten. Then he counted to ten again. The lake at his feet was perfectly flat, the color of weak tea, and held a wobbling reflection of the diving board nobody had used today because the wind had been wrong. Toby touched the cold rail. He did not jump. After a while he picked up his towel, which was still folded, still dry, and walked very slowly up the path.',
    stem: 'The passage is mainly about',
    choices: [
      'a boy choosing not to take a risk and feeling apart from others.',
      'a camp counselor preparing for a swim test.',
      'the dangers of swimming in cold lakes.',
      'a friendly competition between cabins at a summer camp.'
    ],
    answer: 0,
    explanation: 'Toby counts twice, "did not jump," carries away a "still folded, still dry" towel, and walks "very slowly" — the passage shows hesitation and isolation. (B) misidentifies the character. (C) is not addressed. (D) is contradicted by the laughing group he is not part of.'
  },

  {
    id: 'q-ssatrc-019',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 600,
    passage: 'Toby was the only one still on the dock when the camp bell sounded for dinner. He could see the others in clusters on the path, towels slung over shoulders, laughing about something he had not been near enough to hear. He counted to ten. Then he counted to ten again. The lake at his feet was perfectly flat, the color of weak tea, and held a wobbling reflection of the diving board nobody had used today because the wind had been wrong. Toby touched the cold rail. He did not jump. After a while he picked up his towel, which was still folded, still dry, and walked very slowly up the path.',
    stem: 'As used in the passage, the word "wobbling" most nearly means',
    choices: ['gently shaking or unsteady.', 'brightly colored.', 'rapidly spinning.', 'completely still.'],
    answer: 0,
    explanation: 'A "wobbling reflection" on a "perfectly flat" lake describes the slight, unsteady ripple of an image on water. (A) is too active. (C) is unrelated to motion. (D) contradicts the very idea of "wobbling."'
  },

  {
    id: 'q-ssatrc-020',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 720,
    passage: 'Toby was the only one still on the dock when the camp bell sounded for dinner. He could see the others in clusters on the path, towels slung over shoulders, laughing about something he had not been near enough to hear. He counted to ten. Then he counted to ten again. The lake at his feet was perfectly flat, the color of weak tea, and held a wobbling reflection of the diving board nobody had used today because the wind had been wrong. Toby touched the cold rail. He did not jump. After a while he picked up his towel, which was still folded, still dry, and walked very slowly up the path.',
    stem: 'The mood of the passage is best described as',
    choices: ['lonely and subdued.', 'comic and lighthearted.', 'frantic and panicked.', 'triumphant and proud.'],
    answer: 0,
    explanation: 'Toby is alone on the dock, hears laughter "he had not been near enough to hear," and walks away "very slowly" with a dry towel — quiet isolation. (A) and (D) clash with his withdrawal. (C) overstates: he is still and slow, not frantic.'
  },

  /* ============================================================== *
   * PASSAGE 8 — Social studies (geography — the Sahel)
   * Detail + inference + vocab.
   * ============================================================== */

  {
    id: 'q-ssatrc-021',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 660,
    passage: 'The Sahel is a wide belt of dry grassland that runs across Africa just south of the Sahara. The name comes from an Arabic word meaning "shore," and that is exactly how early travelers thought of it: a coastline of green at the edge of the great desert. Rain falls in the Sahel in a single short season, and the rest of the year is dust and sun. For thousands of years, herders have moved cattle, sheep, and goats slowly across this landscape, following the rains. In recent decades, longer droughts and growing populations have squeezed both pasture and water, forcing herding families to travel farther each year and pushing some toward the cities.',
    stem: 'According to the passage, the word "Sahel" comes from an Arabic word meaning',
    choices: ['"desert."', '"grassland."', '"shore."', '"south."'],
    answer: 2,
    explanation: 'The passage says the name "comes from an Arabic word meaning \'shore.\'" (A), (C), and (D) are related to the region but are not the meaning given in the passage.'
  },

  {
    id: 'q-ssatrc-022',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 660,
    passage: 'The Sahel is a wide belt of dry grassland that runs across Africa just south of the Sahara. The name comes from an Arabic word meaning "shore," and that is exactly how early travelers thought of it: a coastline of green at the edge of the great desert. Rain falls in the Sahel in a single short season, and the rest of the year is dust and sun. For thousands of years, herders have moved cattle, sheep, and goats slowly across this landscape, following the rains. In recent decades, longer droughts and growing populations have squeezed both pasture and water, forcing herding families to travel farther each year and pushing some toward the cities.',
    stem: 'As used in the passage, the word "belt" most nearly means',
    choices: ['a punch or hit.', 'a musical performance style.', 'a long, narrow region or zone.', 'a strap worn around the waist.'],
    answer: 2,
    explanation: 'The Sahel is described as "a wide belt of dry grassland that runs across Africa" — a geographical zone. (A) is the literal everyday meaning. (C) is verb-slang ("to belt"). (D) is unrelated to geography.'
  },

  {
    id: 'q-ssatrc-023',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 660,
    passage: 'The Sahel is a wide belt of dry grassland that runs across Africa just south of the Sahara. The name comes from an Arabic word meaning "shore," and that is exactly how early travelers thought of it: a coastline of green at the edge of the great desert. Rain falls in the Sahel in a single short season, and the rest of the year is dust and sun. For thousands of years, herders have moved cattle, sheep, and goats slowly across this landscape, following the rains. In recent decades, longer droughts and growing populations have squeezed both pasture and water, forcing herding families to travel farther each year and pushing some toward the cities.',
    stem: 'As used in the passage, the word "squeezed" most nearly means',
    choices: ['reduced or made scarce.', 'sweetly flavored.', 'physically pressed with the hand.', 'extracted as juice.'],
    answer: 0,
    explanation: 'Droughts and population growth "squeezed both pasture and water" — i.e., pressed their supply down. (A) is the literal physical meaning. (C) is unrelated. (D) suits fruit, not pastures.'
  },

  /* ============================================================== *
   * PASSAGE 9 — Arts/humanities (music — jazz improvisation)
   * Main idea + tone + purpose.
   * ============================================================== */

  {
    id: 'q-ssatrc-024',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 660,
    passage: 'People who do not know jazz often assume improvisation means making it all up — a player simply blowing whatever notes come to mind. The truth is closer to the opposite. Skilled improvisers spend years studying scales, chord progressions, and the recorded solos of musicians who came before them. When they finally take a chorus, they are choosing in real time from a vast inner library of patterns, quotations, and rhythmic ideas. The freedom you hear is the freedom of a writer working in a familiar language. The conversation feels spontaneous because every musician on the stand has done the unglamorous work that makes spontaneity possible.',
    stem: 'The passage is mainly about',
    choices: ['why jazz is more difficult than classical music.', 'the importance of writing your own jazz compositions.', 'the history of jazz in the twentieth century.', 'how jazz improvisation depends on extensive prior study.'],
    answer: 3,
    explanation: 'The passage corrects the myth that improvisation is "making it all up," then explains that years of study ("scales, chord progressions, and the recorded solos") are what enables the in-the-moment freedom. (A) is a comparison the passage does not make. (C) is unsupported. (D) confuses improvisation with composition.'
  },

  {
    id: 'q-ssatrc-025',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 660,
    passage: 'People who do not know jazz often assume improvisation means making it all up — a player simply blowing whatever notes come to mind. The truth is closer to the opposite. Skilled improvisers spend years studying scales, chord progressions, and the recorded solos of musicians who came before them. When they finally take a chorus, they are choosing in real time from a vast inner library of patterns, quotations, and rhythmic ideas. The freedom you hear is the freedom of a writer working in a familiar language. The conversation feels spontaneous because every musician on the stand has done the unglamorous work that makes spontaneity possible.',
    stem: 'The author\'s tone in this passage is best described as',
    choices: ['doubtful and hesitant.', 'angry and defensive.', 'respectful and instructive.', 'mocking toward jazz musicians.'],
    answer: 2,
    explanation: 'The author corrects a misconception with care, praises the "unglamorous work," and explains the craft — respectful and clearly aimed at teaching. (A) reverses the attitude. (C) overstates the gentle correction. (D) is contradicted by the confident, declarative style.'
  },

  {
    id: 'q-ssatrc-026',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 770,
    passage: 'People who do not know jazz often assume improvisation means making it all up — a player simply blowing whatever notes come to mind. The truth is closer to the opposite. Skilled improvisers spend years studying scales, chord progressions, and the recorded solos of musicians who came before them. When they finally take a chorus, they are choosing in real time from a vast inner library of patterns, quotations, and rhythmic ideas. The freedom you hear is the freedom of a writer working in a familiar language. The conversation feels spontaneous because every musician on the stand has done the unglamorous work that makes spontaneity possible.',
    stem: 'The author compares improvisation to "the freedom of a writer working in a familiar language" mainly to',
    choices: ['argue that jazz musicians should also be writers.', 'suggest that jazz should be taught only in writing courses.', 'criticize musicians who do not read music.', 'show that real freedom in improvisation depends on mastery of a shared system.'],
    answer: 3,
    explanation: 'A writer who knows the language can compose freely; the analogy makes the point that improvisational freedom rests on mastery, not on absence of structure. (A) is too literal. (C) and (D) are unsupported and miss the analogy.'
  },

  /* ============================================================== *
   * PASSAGE 10 — Literary fiction (sister returning home)
   * Inference + vocab.
   * ============================================================== */

  {
    id: 'q-ssatrc-027',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'Lena had not been back in nine years, and the town had agreed not to wait for her. The diner on Main Street was a yoga studio now. The empty lot where the carnival used to set up was a parking garage. Even the trees seemed shorter, though she suspected this had more to do with her than with them. She drove past her old high school twice before she recognized it; someone had painted the trim a serious, adult gray. At the stoplight she pressed her palm flat to the warm steering wheel and reminded herself, gently, that she had also changed.',
    stem: 'It can most reasonably be inferred from the passage that Lena',
    choices: ['is surprised by how much the town has changed and is adjusting her expectations.', 'is angry at the town for changing without her.', 'has come home expecting nothing to be the same.', 'plans to move back permanently.'],
    answer: 0,
    explanation: 'Lena is repeatedly caught off guard (the diner, the lot, missing the school) and has to remind herself "that she had also changed" — surprise leading to adjustment. (A) misreads her gentle tone. (B) clashes with how surprised she keeps being. (D) is unsupported.'
  },

  {
    id: 'q-ssatrc-028',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 660,
    passage: 'Lena had not been back in nine years, and the town had agreed not to wait for her. The diner on Main Street was a yoga studio now. The empty lot where the carnival used to set up was a parking garage. Even the trees seemed shorter, though she suspected this had more to do with her than with them. She drove past her old high school twice before she recognized it; someone had painted the trim a serious, adult gray. At the stoplight she pressed her palm flat to the warm steering wheel and reminded herself, gently, that she had also changed.',
    stem: 'As used in the passage, the word "serious" most nearly means',
    choices: ['sober and grown-up.', 'sincerely meant.', 'humorless and grave.', 'medically dangerous.'],
    answer: 0,
    explanation: 'The trim is described as "a serious, adult gray" — paired with "adult," "serious" carries the sense of mature or sober. (A) overshoots into glumness. (C) misses the visual context. (D) is wrong (no health context).'
  },

  /* ============================================================== *
   * PASSAGE 11 — Natural science (frogs and listening for breeding)
   * Detail + inference + main idea.
   * ============================================================== */

  {
    id: 'q-ssatrc-029',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 660,
    passage: 'On warm spring evenings, biologists in some parts of the country head out with clipboards to listen for frogs. Different species sing different songs, and a trained ear can identify several at once: the high trill of a tree frog, the low croak of a bullfrog, the thumb-on-comb chatter of a chorus frog. By recording how loud and how varied the chorus is, scientists can estimate which species are breeding in a given pond — and which have gone quiet. The work requires no fancy equipment, only patience, repetition, and a notebook that tolerates a little mud. In a field that often relies on expensive sensors, the humble frog survey is a reminder that careful listening still counts.',
    stem: 'The passage is mainly about',
    choices: ['a low-tech method scientists use to monitor frog populations.', 'why frogs sing at night.', 'the cost of modern environmental sensors.', 'how to tell a tree frog from a bullfrog by sight.'],
    answer: 0,
    explanation: 'The passage describes biologists listening with clipboards, identifying species by song, and ends by praising "the humble frog survey." (B) reverses the method (sound, not sight). (C) is not the focus. (D) is mentioned only to contrast with the survey.'
  },

  {
    id: 'q-ssatrc-030',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 580,
    passage: 'On warm spring evenings, biologists in some parts of the country head out with clipboards to listen for frogs. Different species sing different songs, and a trained ear can identify several at once: the high trill of a tree frog, the low croak of a bullfrog, the thumb-on-comb chatter of a chorus frog. By recording how loud and how varied the chorus is, scientists can estimate which species are breeding in a given pond — and which have gone quiet. The work requires no fancy equipment, only patience, repetition, and a notebook that tolerates a little mud. In a field that often relies on expensive sensors, the humble frog survey is a reminder that careful listening still counts.',
    stem: 'According to the passage, a chorus frog\'s call is described as',
    choices: ['a thumb-on-comb chatter.', 'a low croak.', 'a long whistle.', 'a high trill.'],
    answer: 0,
    explanation: 'The passage says "the thumb-on-comb chatter of a chorus frog." (A) is the tree frog. (B) is the bullfrog. (D) is not in the passage.'
  },

  {
    id: 'q-ssatrc-031',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 720,
    passage: 'On warm spring evenings, biologists in some parts of the country head out with clipboards to listen for frogs. Different species sing different songs, and a trained ear can identify several at once: the high trill of a tree frog, the low croak of a bullfrog, the thumb-on-comb chatter of a chorus frog. By recording how loud and how varied the chorus is, scientists can estimate which species are breeding in a given pond — and which have gone quiet. The work requires no fancy equipment, only patience, repetition, and a notebook that tolerates a little mud. In a field that often relies on expensive sensors, the humble frog survey is a reminder that careful listening still counts.',
    stem: 'The author would most likely agree that',
    choices: ['frogs are the most important animals in any ecosystem.', 'expensive sensors are useless in environmental science.', 'simple, attentive observation can still produce valuable scientific data.', 'amateur volunteers should not contribute to scientific surveys.'],
    answer: 2,
    explanation: 'The closing line — "careful listening still counts" — endorses simple, attentive observation as scientifically valuable. (A) is too strong; the passage acknowledges sensors exist, not that they are useless. (C) overgeneralizes. (D) is the opposite of the passage\'s admiring tone toward low-tech work.'
  },

  /* ============================================================== *
   * PASSAGE 12 — Social studies (history — Library of Alexandria)
   * Purpose + detail.
   * ============================================================== */

  {
    id: 'q-ssatrc-032',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 660,
    passage: 'No one knows exactly what was lost when the great Library of Alexandria fell into ruin. Founded in the third century BCE, the library aimed to collect, in one place, every scroll worth reading in the known world. Officials reportedly searched ships in the harbor for books to copy, sometimes returning the copies and keeping the originals. Scholars from across the Mediterranean lived nearby on royal stipends, comparing editions and arguing in the shade. The library declined gradually over centuries, through fires, political turmoil, and shrinking budgets, rather than in a single dramatic blaze. What perished was not only books, but a particular dream: that human knowledge could be gathered, sorted, and shared under one roof.',
    stem: 'The author most likely included the detail about searching ships in the harbor in order to',
    choices: ['show how aggressively the library worked to acquire texts.', 'explain how Alexandria became a major port.', 'criticize the harbor authorities for being too lenient.', 'prove that ships were the only source of new books.'],
    answer: 0,
    explanation: 'The detail — and the parenthetical that copies were returned but originals were sometimes kept — illustrates the library\'s "every scroll worth reading" ambition. (B) inverts the point. (C) is unsupported. (D) overgeneralizes from one example.'
  },

  {
    id: 'q-ssatrc-033',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 600,
    passage: 'No one knows exactly what was lost when the great Library of Alexandria fell into ruin. Founded in the third century BCE, the library aimed to collect, in one place, every scroll worth reading in the known world. Officials reportedly searched ships in the harbor for books to copy, sometimes returning the copies and keeping the originals. Scholars from across the Mediterranean lived nearby on royal stipends, comparing editions and arguing in the shade. The library declined gradually over centuries, through fires, political turmoil, and shrinking budgets, rather than in a single dramatic blaze. What perished was not only books, but a particular dream: that human knowledge could be gathered, sorted, and shared under one roof.',
    stem: 'According to the passage, the Library of Alexandria',
    choices: ['was destroyed in a single, catastrophic fire.', 'remained in operation until the modern era.', 'was rebuilt by the Roman Empire.', 'declined gradually over centuries.'],
    answer: 3,
    explanation: 'The passage says the library "declined gradually over centuries... rather than in a single dramatic blaze." (A) is explicitly contradicted. (C) and (D) are not in the passage.'
  },

  /* ============================================================== *
   * PASSAGE 13 — Arts/humanities (painting — Vermeer-style light study)
   * Vocab + tone.
   * ============================================================== */

  {
    id: 'q-ssatrc-034',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 660,
    passage: 'Stand in front of a small Dutch interior painting from the seventeenth century — a woman pouring milk, a girl reading a letter — and you may notice that the room itself seems to be the real subject. The painter has spent extraordinary care on the dull plaster wall, the warmth of a window\'s rectangle of light, the way a brass nail catches a single white spark. Figures stand quietly within these rooms, not posed for the viewer, but absorbed in their own small task. The effect is intimate without being intrusive. We are not asked to admire the people; we are simply allowed to be in the room with them, briefly, before slipping back out.',
    stem: 'As used in the passage, the word "absorbed" most nearly means',
    choices: ['fully concentrated on.', 'soaked up like a sponge.', 'completely covered.', 'rudely ignored.'],
    answer: 0,
    explanation: 'The figures are "absorbed in their own small task," meaning fully focused. (A) is a literal physical meaning. (C) and (D) do not match the gentle, attentive scene the author describes.'
  },

  {
    id: 'q-ssatrc-035',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 720,
    passage: 'Stand in front of a small Dutch interior painting from the seventeenth century — a woman pouring milk, a girl reading a letter — and you may notice that the room itself seems to be the real subject. The painter has spent extraordinary care on the dull plaster wall, the warmth of a window\'s rectangle of light, the way a brass nail catches a single white spark. Figures stand quietly within these rooms, not posed for the viewer, but absorbed in their own small task. The effect is intimate without being intrusive. We are not asked to admire the people; we are simply allowed to be in the room with them, briefly, before slipping back out.',
    stem: 'The tone of the passage is best described as',
    choices: ['gloomy and resigned.', 'sarcastic and dismissive.', 'urgent and persuasive.', 'reverent and observant.'],
    answer: 3,
    explanation: 'Phrases like "extraordinary care," "intimate without being intrusive," and "simply allowed to be in the room" convey quiet admiration and close attention. (B) is the opposite. (C) is too forceful for the hushed description. (D) misses the warmth.'
  },

  /* ============================================================== *
   * PASSAGE 14 — Personal narrative (early-morning bakery)
   * Main idea + tone + purpose.
   * ============================================================== */

  {
    id: 'q-ssatrc-036',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 720,
    passage: 'My first job was at a small bakery, and my first shift began at four in the morning. The owner, Mrs. Aliyev, did not believe in pep talks. She handed me an apron, pointed at a sack of flour, and said, "Carry it like it is full of eggs." For the first week I was useless. I dropped a loaf, scorched a tray of rolls, and spilled an entire bowl of dough onto my shoes. Mrs. Aliyev did not yell. She simply showed me, again, the way her fingers folded the dough, the way she rotated the trays. By the end of the month, I knew the difference between flour that was tired and flour that was awake. I have never forgotten it.',
    stem: 'The passage is mainly about',
    choices: ['a recipe for handmade bread.', 'how a difficult boss made the narrator quit a job.', 'the value of patient, hands-on instruction in learning a craft.', 'why bakeries open so early in the morning.'],
    answer: 2,
    explanation: 'The passage moves from the narrator\'s early failures to Mrs. Aliyev\'s quiet, repeated demonstrations to genuine mastery — a portrait of patient teaching. (A) misreads Mrs. Aliyev. (C) and (D) are not the focus.'
  },

  {
    id: 'q-ssatrc-037',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 720,
    passage: 'My first job was at a small bakery, and my first shift began at four in the morning. The owner, Mrs. Aliyev, did not believe in pep talks. She handed me an apron, pointed at a sack of flour, and said, "Carry it like it is full of eggs." For the first week I was useless. I dropped a loaf, scorched a tray of rolls, and spilled an entire bowl of dough onto my shoes. Mrs. Aliyev did not yell. She simply showed me, again, the way her fingers folded the dough, the way she rotated the trays. By the end of the month, I knew the difference between flour that was tired and flour that was awake. I have never forgotten it.',
    stem: 'The narrator\'s attitude toward Mrs. Aliyev is best described as',
    choices: ['amused but uninterested.', 'grateful and admiring.', 'pitying and protective.', 'fearful and resentful.'],
    answer: 1,
    explanation: 'Mrs. Aliyev "did not yell" and patiently demonstrated; the narrator says "I have never forgotten it" — gratitude and admiration. (A) and (B) are contradicted. (D) reverses the power dynamic.'
  },

  {
    id: 'q-ssatrc-038',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 770,
    passage: 'My first job was at a small bakery, and my first shift began at four in the morning. The owner, Mrs. Aliyev, did not believe in pep talks. She handed me an apron, pointed at a sack of flour, and said, "Carry it like it is full of eggs." For the first week I was useless. I dropped a loaf, scorched a tray of rolls, and spilled an entire bowl of dough onto my shoes. Mrs. Aliyev did not yell. She simply showed me, again, the way her fingers folded the dough, the way she rotated the trays. By the end of the month, I knew the difference between flour that was tired and flour that was awake. I have never forgotten it.',
    stem: 'The narrator most likely includes the contrast between "flour that was tired and flour that was awake" in order to',
    choices: ['show that flour can spoil if left too long.', 'demonstrate that the narrator developed a craftsperson\'s sensitivity to the material.', 'introduce a scientific term used in chemistry.', 'criticize bakeries that use old ingredients.'],
    answer: 1,
    explanation: 'The figurative language ("tired"/"awake") is the narrator\'s way of saying they began to feel small differences only an experienced baker would notice — proof of acquired skill. (A) takes the words too literally. (C) makes an accusation absent from the warm tone. (D) treats poetic phrasing as scientific vocabulary.'
  },

  /* ============================================================== *
   * PASSAGE 15 — Personal narrative / poetry-adjacent
   * (winter walk) — Detail + inference.
   * ============================================================== */

  {
    id: 'q-ssatrc-039',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 660,
    passage: 'There is a particular hour, about a week after the first heavy snowfall, when the neighborhood goes quiet in a way that feels almost rehearsed. Plows have come and gone. Children have already discovered the best sledding hill, gotten cold, and gone home. I like to walk then. The streetlights buzz on early. My boots squeak in the dry, crusted snow. Somewhere a dog barks once and stops, as if it had also expected the silence and was only checking. I do not bring my phone on these walks. I do not need to remember anything. I am only there to be one of the small warm things still moving through the cold.',
    stem: 'According to the passage, the narrator does NOT bring on these walks',
    choices: ['a sled.', 'a phone.', 'a coat.', 'boots.'],
    answer: 1,
    explanation: 'The narrator says, "I do not bring my phone on these walks." (B) is contradicted ("My boots squeak"). (C) is not directly addressed but warmth is implied. (D) is associated with the children, not the narrator.'
  },

  {
    id: 'q-ssatrc-040',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 770,
    passage: 'There is a particular hour, about a week after the first heavy snowfall, when the neighborhood goes quiet in a way that feels almost rehearsed. Plows have come and gone. Children have already discovered the best sledding hill, gotten cold, and gone home. I like to walk then. The streetlights buzz on early. My boots squeak in the dry, crusted snow. Somewhere a dog barks once and stops, as if it had also expected the silence and was only checking. I do not bring my phone on these walks. I do not need to remember anything. I am only there to be one of the small warm things still moving through the cold.',
    stem: 'The closing sentence most strongly suggests that the narrator values these walks as a chance to',
    choices: ['avoid neighbors the narrator dislikes.', 'document the neighborhood for a writing project.', 'feel a humble, living place in a quiet world.', 'compete with other walkers in the cold.'],
    answer: 2,
    explanation: 'Calling oneself "one of the small warm things still moving through the cold" frames the walk as a quiet act of being present and alive, modestly, among other living things. (A) invents competition. (C) is contradicted ("I do not need to remember anything"). (D) projects a hostility absent from the gentle tone.'
  }

]);
