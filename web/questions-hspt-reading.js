/**
 * HSPT Reading — vocabulary in context + comprehension. Short
 * passages (60-150 words) with 2-3 questions each.
 *
 * testType: 'HSPT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'reading'
 *
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';

window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ============================================================
  // VOCAB-IN-CONTEXT (12 questions) — passage = null
  // ============================================================
  {
    id: 'q-hsptrd-001',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 510,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'After the long hike, the children were eager for a hearty meal.'?",
    choices: ['substantial', 'warm', 'brave', 'kind'],
    answer: 0,
    explanation: "After a long hike, the children would want a substantial (large, satisfying) meal. 'Hearty' can mean kind ('hearty laugh'), brave ('hearty crew'), or warm ('hearty welcome'), but here it describes the size and substance of the meal."
  },
  {
    id: 'q-hsptrd-002',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 460,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The teacher gave a brief explanation before the test began.'?",
    choices: ['inform', 'short', 'legal document', 'underwear'],
    answer: 1,
    explanation: "Context shows the explanation came before the test, suggesting it was short. 'Brief' can also mean a legal document, underwear, or to inform someone, but those meanings do not fit a teacher's pre-test explanation."
  },
  {
    id: 'q-hsptrd-003',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 600,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The negotiator's candid remarks about the company's troubles surprised the board.'?",
    choices: ['private', 'frank', 'angry', 'shy'],
    answer: 1,
    explanation: "Remarks that 'surprised the board' about troubles suggests the speaker was frank (open and honest). 'Candid' is not a synonym for angry, private, or shy."
  },
  {
    id: 'q-hsptrd-004',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 540,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The senator's vague answer left reporters frustrated and confused.'?",
    choices: ['distant', 'gentle', 'foreign', 'unclear'],
    answer: 3,
    explanation: "An answer that left reporters 'frustrated and confused' must have been unclear. 'Vague' is sometimes loosely associated with distance or gentleness, but here the context demands 'unclear.'"
  },
  {
    id: 'q-hsptrd-005',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 560,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The author's prose was so dense that even careful readers struggled.'?",
    choices: ['compact and difficult', 'heavy in weight', 'foggy', 'foolish'],
    answer: 0,
    explanation: "If careful readers struggled, the prose was compact and difficult to penetrate. 'Dense' can mean foolish (a 'dense person'), heavy (high mass), or foggy ('dense fog'), but only 'compact and difficult' fits writing."
  },
  {
    id: 'q-hsptrd-006',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 580,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The new evidence served to undermine the prosecutor's case.'?",
    choices: ['highlight', 'weaken', 'finalize', 'dig beneath'],
    answer: 1,
    explanation: "New evidence acting against the prosecutor's case would weaken it. 'Undermine' literally means to dig beneath, but the figurative meaning ('weaken') is what fits a courtroom context."
  },
  {
    id: 'q-hsptrd-007',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 600,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'Her reserved manner at the party led some guests to think she was unfriendly.'?",
    choices: ['restrained', 'booked in advance', 'protected', 'set aside'],
    answer: 0,
    explanation: "A 'manner' that seemed unfriendly was restrained or quiet. 'Reserved' can mean set aside ('reserved seat') or booked in advance ('reserved table'), but those meanings do not describe behavior."
  },
  {
    id: 'q-hsptrd-008',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 630,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The committee chair tried to temper the harsh language of the report.'?",
    choices: ['moderate', 'harden metal', 'season food', 'mood'],
    answer: 0,
    explanation: "To 'temper' harsh language is to moderate or soften it. 'Temper' can also mean a mood (a 'bad temper'), to harden metal, or to season food, but only 'moderate' fits revising a report."
  },
  {
    id: 'q-hsptrd-009',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 660,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The detective's grave expression told us the news was serious.'?",
    choices: ['burial site', 'solemn', 'engraved', 'dig up'],
    answer: 1,
    explanation: "An expression conveying serious news is solemn. 'Grave' can mean a burial place or be a verb meaning to engrave, but those meanings cannot describe an expression."
  },
  {
    id: 'q-hsptrd-010',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 690,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'Although the proposal seemed bold, its author maintained a measured tone throughout the speech.'?",
    choices: ['rhythmic', 'sized', 'evaluated', 'controlled'],
    answer: 3,
    explanation: "Contrast with 'bold' suggests the tone was controlled and deliberate. 'Measured' can mean sized (something whose dimensions were taken), rhythmic ('measured beat'), or evaluated, but here it describes restraint."
  },
  {
    id: 'q-hsptrd-011',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 720,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The judge dismissed the lawyer's objection as a specious argument unworthy of further debate.'?",
    choices: ['genuine', 'rare', 'detailed', 'plausible but false'],
    answer: 3,
    explanation: "An argument 'unworthy of further debate' is one that seems convincing on the surface but is actually false — the precise meaning of 'specious.' It does not mean genuine, rare, or detailed."
  },
  {
    id: 'q-hsptrd-012',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 750,
    passage: null,
    stem: "What is the meaning of the underlined word in this sentence: 'The diplomat's equivocal response neither confirmed nor denied the rumors.'?",
    choices: ['ambiguous', 'private', 'forceful', 'equal'],
    answer: 0,
    explanation: "A response that 'neither confirmed nor denied' is intentionally ambiguous — the definition of 'equivocal.' The word shares a root with 'equal' but does not mean equal here."
  },

  // ============================================================
  // PASSAGE 1 — Octopus camouflage (science)
  // ============================================================
  {
    id: 'q-hsptrd-013',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 470,
    passage: "The octopus is one of the most remarkable masters of disguise in the animal kingdom. Within seconds, it can change the color of its skin to match a sandy seafloor, a coral reef, or even a checkered pattern. Special cells called chromatophores hold tiny sacs of pigment that expand or contract on command from the octopus's brain. A second layer of cells reflects light to fine-tune the effect. Scientists are still studying how the octopus chooses the right pattern, since most species are colorblind. Many researchers believe the animal senses light and color through its skin itself.",
    stem: "What is the main idea of this passage?",
    choices: ['Octopuses live in many ocean environments around the world.', 'Octopuses are the smartest animals in the ocean.', 'Chromatophores are the only cells that allow camouflage.', 'The octopus uses specialized skin cells to change color quickly, even though it cannot see color.'],
    answer: 3,
    explanation: "The passage opens by calling the octopus a 'master of disguise' and goes on to describe both the cell mechanism and the colorblindness puzzle. The other choices are either too narrow (chromatophores), unsupported (smartest), or off-topic (habitats)."
  },
  {
    id: 'q-hsptrd-014',
    section: 'reading',
    topic: 'detail',
    difficulty: 520,
    passage: "The octopus is one of the most remarkable masters of disguise in the animal kingdom. Within seconds, it can change the color of its skin to match a sandy seafloor, a coral reef, or even a checkered pattern. Special cells called chromatophores hold tiny sacs of pigment that expand or contract on command from the octopus's brain. A second layer of cells reflects light to fine-tune the effect. Scientists are still studying how the octopus chooses the right pattern, since most species are colorblind. Many researchers believe the animal senses light and color through its skin itself.",
    stem: "According to the passage, what do chromatophores contain?",
    choices: ['sacs of pigment', 'tiny mirrors', 'nerve endings', 'muscle fibers'],
    answer: 0,
    explanation: "The passage states chromatophores 'hold tiny sacs of pigment that expand or contract.' Mirrors and nerve endings are not mentioned, and muscle fibers are not the contents of these cells."
  },
  {
    id: 'q-hsptrd-015',
    section: 'reading',
    topic: 'inference',
    difficulty: 620,
    passage: "The octopus is one of the most remarkable masters of disguise in the animal kingdom. Within seconds, it can change the color of its skin to match a sandy seafloor, a coral reef, or even a checkered pattern. Special cells called chromatophores hold tiny sacs of pigment that expand or contract on command from the octopus's brain. A second layer of cells reflects light to fine-tune the effect. Scientists are still studying how the octopus chooses the right pattern, since most species are colorblind. Many researchers believe the animal senses light and color through its skin itself.",
    stem: "Why do scientists find octopus camouflage puzzling?",
    choices: ['The animal can match colors that its eyes cannot perceive.', 'The brain works too slowly to control the cells.', 'Octopuses lack chromatophores in some regions.', 'The skin reflects too much light to camouflage well.'],
    answer: 0,
    explanation: "The puzzle is that octopuses are 'colorblind' yet still produce accurate color matches — the inference is that vision alone cannot explain the behavior. The other choices contradict the passage."
  },

  // ============================================================
  // PASSAGE 2 — Lighthouse keeper memoir (literature)
  // ============================================================
  {
    id: 'q-hsptrd-016',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 510,
    passage: "Grandfather had been a lighthouse keeper for forty years, and he often said the lamp was a friend who never spoke. On stormy nights, while the wind rattled the iron door, he would climb the spiral staircase carrying a small kerosene lantern in one hand and a ledger in the other. He recorded the hour, the wind direction, and the names of any ships that passed safely. To Grandfather, these notes were a kind of prayer — proof that someone, somewhere, would always be watching for the lost.",
    stem: "What is the main idea of this passage?",
    choices: ['The grandfather kept a careful weather diary for the government.', 'Lighthouse keeping is a dying profession.', 'Storms made the lighthouse difficult to operate.', 'The grandfather found deep meaning in his solitary work as a lighthouse keeper.'],
    answer: 3,
    explanation: "The closing line — that the records were 'a kind of prayer' — captures the meaning he found in his work. The other choices either focus on a single detail or add information not in the passage."
  },
  {
    id: 'q-hsptrd-017',
    section: 'reading',
    topic: 'inference',
    difficulty: 590,
    passage: "Grandfather had been a lighthouse keeper for forty years, and he often said the lamp was a friend who never spoke. On stormy nights, while the wind rattled the iron door, he would climb the spiral staircase carrying a small kerosene lantern in one hand and a ledger in the other. He recorded the hour, the wind direction, and the names of any ships that passed safely. To Grandfather, these notes were a kind of prayer — proof that someone, somewhere, would always be watching for the lost.",
    stem: "Why does the narrator say the lamp was 'a friend who never spoke'?",
    choices: [
      "Grandfather was lonely and treated the lamp as company.",
      "The lamp gave Grandfather instructions silently.",
      "Grandfather was unable to hear well.",
      "The lamp made no noise when lit."
    ],
    answer: 0,
    explanation: "The image of a silent friend across forty years of solitary watch suggests companionship in loneliness. There is no evidence of hearing loss or that the lamp gave instructions; the noise observation is too literal."
  },
  {
    id: 'q-hsptrd-018',
    section: 'reading',
    topic: 'purpose',
    difficulty: 670,
    passage: "Grandfather had been a lighthouse keeper for forty years, and he often said the lamp was a friend who never spoke. On stormy nights, while the wind rattled the iron door, he would climb the spiral staircase carrying a small kerosene lantern in one hand and a ledger in the other. He recorded the hour, the wind direction, and the names of any ships that passed safely. To Grandfather, these notes were a kind of prayer — proof that someone, somewhere, would always be watching for the lost.",
    stem: "What is the author's main purpose in this passage?",
    choices: ['to honor a relative whose quiet work carried great meaning', 'to warn about the dangers of storms at sea', 'to teach readers how a lighthouse functions', 'to argue that lighthouse keepers should keep records'],
    answer: 0,
    explanation: "The reverent, personal tone and the metaphor of the records as 'a kind of prayer' point to honoring the grandfather. The passage neither instructs about mechanics nor argues a position."
  },

  // ============================================================
  // PASSAGE 3 — Hummingbird metabolism (science)
  // ============================================================
  {
    id: 'q-hsptrd-019',
    section: 'reading',
    topic: 'detail',
    difficulty: 480,
    passage: "Hummingbirds have the fastest metabolism of any warm-blooded animal. To keep their wings beating up to eighty times per second, they must consume nearly their own body weight in nectar each day. A hummingbird's heart can race at twelve hundred beats per minute, and its body temperature climbs higher than that of most other birds. To survive cold nights, many species enter a state called torpor, slowing their heart and lowering their temperature until dawn. Without this nightly shutdown, a hummingbird would starve before morning.",
    stem: "According to the passage, how does a hummingbird survive cold nights?",
    choices: ['by eating extra nectar before bed', 'by hiding in tree hollows for warmth', 'by entering a state of torpor that slows its heart', 'by huddling with other hummingbirds'],
    answer: 2,
    explanation: "The passage directly states that 'many species enter a state called torpor, slowing their heart and lowering their temperature.' The other strategies are not mentioned."
  },
  {
    id: 'q-hsptrd-020',
    section: 'reading',
    topic: 'inference',
    difficulty: 580,
    passage: "Hummingbirds have the fastest metabolism of any warm-blooded animal. To keep their wings beating up to eighty times per second, they must consume nearly their own body weight in nectar each day. A hummingbird's heart can race at twelve hundred beats per minute, and its body temperature climbs higher than that of most other birds. To survive cold nights, many species enter a state called torpor, slowing their heart and lowering their temperature until dawn. Without this nightly shutdown, a hummingbird would starve before morning.",
    stem: "Why does the passage describe torpor as a 'shutdown'?",
    choices: ['Body functions slow dramatically to save energy.', 'Hummingbirds become unable to wake up.', 'Torpor permanently damages the heart.', 'The hummingbird stops breathing entirely.'],
    answer: 0,
    explanation: "Torpor slows the heart and lowers temperature so the bird burns less fuel — a temporary slowdown. The passage notes the bird wakes by dawn, ruling out permanent damage or stopped breathing."
  },
  {
    id: 'q-hsptrd-021',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 540,
    passage: "Hummingbirds have the fastest metabolism of any warm-blooded animal. To keep their wings beating up to eighty times per second, they must consume nearly their own body weight in nectar each day. A hummingbird's heart can race at twelve hundred beats per minute, and its body temperature climbs higher than that of most other birds. To survive cold nights, many species enter a state called torpor, slowing their heart and lowering their temperature until dawn. Without this nightly shutdown, a hummingbird would starve before morning.",
    stem: "What is the main idea of this passage?",
    choices: ['Nectar is the most efficient food source in nature.', 'Cold weather is the greatest threat to hummingbirds.', 'The hummingbird\'s extreme metabolism forces it to use unusual survival strategies.', 'Hummingbirds are the smallest birds in the world.'],
    answer: 2,
    explanation: "Every sentence connects metabolism to survival demands — eating, heart rate, and torpor. The other choices either are not stated (smallest, nectar efficiency) or take one detail too far (cold being the 'greatest' threat)."
  },

  // ============================================================
  // PASSAGE 4 — Library founding (history)
  // ============================================================
  {
    id: 'q-hsptrd-022',
    section: 'reading',
    topic: 'detail',
    difficulty: 500,
    passage: "In 1731, Benjamin Franklin and a group of friends in Philadelphia formed a club called the Junto. Members met weekly to discuss politics, philosophy, and scientific experiments. Because books were scarce and expensive in colonial America, the friends agreed to pool their personal libraries so that any member could borrow what he needed. The arrangement worked so well that the group decided to make the books available to the wider public for a small annual fee. The result, the Library Company of Philadelphia, became one of the first lending libraries in North America.",
    stem: "According to the passage, why did Junto members pool their books?",
    choices: ['Books were scarce and expensive in colonial America.', 'The Junto needed proof of its activities for the city.', 'Members wanted to fund a new club building.', 'Each member owned the same titles.'],
    answer: 0,
    explanation: "The passage gives the reason directly: 'books were scarce and expensive in colonial America.' The other choices are not stated."
  },
  {
    id: 'q-hsptrd-023',
    section: 'reading',
    topic: 'purpose',
    difficulty: 610,
    passage: "In 1731, Benjamin Franklin and a group of friends in Philadelphia formed a club called the Junto. Members met weekly to discuss politics, philosophy, and scientific experiments. Because books were scarce and expensive in colonial America, the friends agreed to pool their personal libraries so that any member could borrow what he needed. The arrangement worked so well that the group decided to make the books available to the wider public for a small annual fee. The result, the Library Company of Philadelphia, became one of the first lending libraries in North America.",
    stem: "What is the author's main purpose in this passage?",
    choices: ['to compare colonial libraries with modern ones', 'to explain how a small club helped create early American lending libraries', 'to describe how books are made and bound', 'to argue that Franklin was the greatest librarian in history'],
    answer: 1,
    explanation: "The passage traces a cause-and-effect chain from the Junto to a public library — the author's purpose is informative. No comparison or argument about Franklin's greatness appears."
  },

  // ============================================================
  // PASSAGE 5 — Volcano types (science)
  // ============================================================
  {
    id: 'q-hsptrd-024',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 520,
    passage: "Not all volcanoes look or behave alike. Shield volcanoes, like those in Hawaii, have wide gentle slopes built up by countless layers of runny lava that flowed far before cooling. Stratovolcanoes, such as Mount Fuji, are tall and steep because they form from thicker, slower lava and explosive bursts of ash. Cinder cones are smaller, often appearing in clusters, and are made mostly of fragments thrown into the air during a single eruption. The shape of any volcano, then, tells geologists something about the kind of magma that built it.",
    stem: "What is the main idea of this passage?",
    choices: ['Cinder cones erupt more often than other volcanoes.', 'Magma is the most dangerous substance on Earth.', 'A volcano\'s shape reveals what kind of material formed it.', 'Hawaiian volcanoes are the safest in the world.'],
    answer: 2,
    explanation: "The closing sentence ties everything together: shape tells geologists about the magma. The other options are unsupported or contradict the passage."
  },
  {
    id: 'q-hsptrd-025',
    section: 'reading',
    topic: 'detail',
    difficulty: 470,
    passage: "Not all volcanoes look or behave alike. Shield volcanoes, like those in Hawaii, have wide gentle slopes built up by countless layers of runny lava that flowed far before cooling. Stratovolcanoes, such as Mount Fuji, are tall and steep because they form from thicker, slower lava and explosive bursts of ash. Cinder cones are smaller, often appearing in clusters, and are made mostly of fragments thrown into the air during a single eruption. The shape of any volcano, then, tells geologists something about the kind of magma that built it.",
    stem: "What gives shield volcanoes their gentle slopes?",
    choices: ['ash deposits from neighboring volcanoes', 'wind erosion over millions of years', 'runny lava that flowed far before cooling', 'frequent earthquakes that flattened their peaks'],
    answer: 2,
    explanation: "The passage explains the wide slopes are 'built up by countless layers of runny lava that flowed far before cooling.' Earthquakes, wind, and ash deposits are not mentioned."
  },

  // ============================================================
  // PASSAGE 6 — School newspaper (literature/social)
  // ============================================================
  {
    id: 'q-hsptrd-026',
    section: 'reading',
    topic: 'inference',
    difficulty: 560,
    passage: "Mara had wanted to write for the school paper since fifth grade. When she finally walked into the meeting in September, she discovered only three other students sitting at a long folding table. The faculty advisor, Mr. Halpern, looked up from a stack of papers and smiled tiredly. 'Welcome to the staff,' he said. 'Now, who wants to write about the parking lot resurfacing project?' Mara had hoped for stories about elections or the football team. She nodded slowly, opened her notebook, and reminded herself that every reporter had to start somewhere.",
    stem: "What can be inferred about Mara's feelings at the end of the passage?",
    choices: ['She is excited to write about parking lots.', 'She regrets joining the newspaper at all.', 'She plans to ask Mr. Halpern for a different teacher.', 'She is disappointed but determined to make the best of the assignment.'],
    answer: 3,
    explanation: "She nods 'slowly' and reminds herself that 'every reporter had to start somewhere,' showing both disappointment and resolve. Excitement and regret overstate her reaction; nothing is said about a different teacher."
  },
  {
    id: 'q-hsptrd-027',
    section: 'reading',
    topic: 'purpose',
    difficulty: 640,
    passage: "Mara had wanted to write for the school paper since fifth grade. When she finally walked into the meeting in September, she discovered only three other students sitting at a long folding table. The faculty advisor, Mr. Halpern, looked up from a stack of papers and smiled tiredly. 'Welcome to the staff,' he said. 'Now, who wants to write about the parking lot resurfacing project?' Mara had hoped for stories about elections or the football team. She nodded slowly, opened her notebook, and reminded herself that every reporter had to start somewhere.",
    stem: "Why does the author mention that Mara had wanted to write for the paper since fifth grade?",
    choices: ['to suggest she was unqualified', 'to make the gap between her dream and the assignment more striking', 'to show that the paper had a long history', 'to explain that she was the youngest reporter'],
    answer: 1,
    explanation: "The early ambition contrasts with the dull first assignment, sharpening the moment of disappointment. Nothing in the passage hints at her being unqualified or unusually young."
  },
  {
    id: 'q-hsptrd-028',
    section: 'reading',
    topic: 'detail',
    difficulty: 430,
    passage: "Mara had wanted to write for the school paper since fifth grade. When she finally walked into the meeting in September, she discovered only three other students sitting at a long folding table. The faculty advisor, Mr. Halpern, looked up from a stack of papers and smiled tiredly. 'Welcome to the staff,' he said. 'Now, who wants to write about the parking lot resurfacing project?' Mara had hoped for stories about elections or the football team. She nodded slowly, opened her notebook, and reminded herself that every reporter had to start somewhere.",
    stem: "How many other students were at the meeting when Mara arrived?",
    choices: ['none', 'three', 'five', 'two'],
    answer: 1,
    explanation: "The passage states 'only three other students sitting at a long folding table.' The other counts are not supported."
  },

  // ============================================================
  // PASSAGE 7 — Maglev trains (science/technology)
  // ============================================================
  {
    id: 'q-hsptrd-029',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 600,
    passage: "Magnetic levitation, or maglev, trains do not roll on wheels. Instead, powerful electromagnets along the track lift the train a small distance into the air and push it forward. Because the train never touches the rail, friction nearly disappears, and the cars can travel faster than three hundred miles per hour while running quietly. Building a maglev line is expensive — the magnets, the smooth guideway, and the constant power supply all cost more than ordinary rail. For that reason, only a handful of cities have built full maglev systems despite the technology's clear advantages.",
    stem: "What is the main idea of this passage?",
    choices: ['All major cities are building maglev lines.', 'Maglev trains are dangerous to passengers.', 'Maglev trains offer impressive performance but are limited by high cost.', 'Wheels cause every problem in modern rail travel.'],
    answer: 2,
    explanation: "The passage praises maglev's speed and quietness but ends by explaining why few cities adopt it: cost. The other choices contradict the text or overstate it."
  },
  {
    id: 'q-hsptrd-030',
    section: 'reading',
    topic: 'inference',
    difficulty: 600,
    passage: "Magnetic levitation, or maglev, trains do not roll on wheels. Instead, powerful electromagnets along the track lift the train a small distance into the air and push it forward. Because the train never touches the rail, friction nearly disappears, and the cars can travel faster than three hundred miles per hour while running quietly. Building a maglev line is expensive — the magnets, the smooth guideway, and the constant power supply all cost more than ordinary rail. For that reason, only a handful of cities have built full maglev systems despite the technology's clear advantages.",
    stem: "Based on the passage, why are conventional trains slower than maglev trains?",
    choices: ['Conventional trains cannot run at night.', 'Conventional rails are not straight enough.', 'Wheels on rails create friction that limits speed.', 'Conventional trains use weaker engines.'],
    answer: 2,
    explanation: "The passage explains that without rail contact, 'friction nearly disappears.' The implication is that wheels on rails do create friction that slows trains. Engine strength, time of day, and track straightness are not discussed."
  },

  // ============================================================
  // PASSAGE 8 — Community garden (social)
  // ============================================================
  {
    id: 'q-hsptrd-031',
    section: 'reading',
    topic: 'purpose',
    difficulty: 530,
    passage: "When the city closed the empty lot at the corner of Maple and Eighth, neighbors feared it would attract trash and become an eyesore. Instead, a small group of residents asked permission to plant a community garden. Within a year, raised beds held tomatoes, peppers, and sunflowers tall enough to peek over the fence. Children helped weed the rows on Saturday mornings, and elderly residents traded recipes from across folding tables. The garden produced more than vegetables: it produced friendships among people who had lived on the same block for years without ever meeting.",
    stem: "What is the author's main purpose in this passage?",
    choices: ['to criticize the city for closing the lot', 'to argue that all empty lots should become gardens', 'to show how a community garden brought neighbors together', 'to teach readers how to grow tomatoes'],
    answer: 2,
    explanation: "The closing line — friendships among neighbors who had never met — captures the author's purpose. There are no growing instructions, no criticism, and no broad policy argument."
  },
  {
    id: 'q-hsptrd-032',
    section: 'reading',
    topic: 'detail',
    difficulty: 460,
    passage: "When the city closed the empty lot at the corner of Maple and Eighth, neighbors feared it would attract trash and become an eyesore. Instead, a small group of residents asked permission to plant a community garden. Within a year, raised beds held tomatoes, peppers, and sunflowers tall enough to peek over the fence. Children helped weed the rows on Saturday mornings, and elderly residents traded recipes from across folding tables. The garden produced more than vegetables: it produced friendships among people who had lived on the same block for years without ever meeting.",
    stem: "What did neighbors first fear about the empty lot?",
    choices: ['It would be sold to a developer.', 'It would lower nearby home values.', 'It would become a parking lot.', 'It would attract trash and become an eyesore.'],
    answer: 3,
    explanation: "The passage states neighbors 'feared it would attract trash and become an eyesore.' Other concerns are not mentioned."
  },
  {
    id: 'q-hsptrd-033',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 580,
    passage: "When the city closed the empty lot at the corner of Maple and Eighth, neighbors feared it would attract trash and become an eyesore. Instead, a small group of residents asked permission to plant a community garden. Within a year, raised beds held tomatoes, peppers, and sunflowers tall enough to peek over the fence. Children helped weed the rows on Saturday mornings, and elderly residents traded recipes from across folding tables. The garden produced more than vegetables: it produced friendships among people who had lived on the same block for years without ever meeting.",
    stem: "What is the main idea of this passage?",
    choices: ['Elderly residents have the best recipes.', 'Empty lots in cities should always be turned into gardens.', 'A community garden transformed an empty lot and brought neighbors together.', 'Sunflowers grow well in raised beds.'],
    answer: 2,
    explanation: "The passage tracks the lot's transformation and ends with the garden producing 'friendships' as well as food — the central point. The other choices are too broad, too narrow, or unsupported."
  },

  // ============================================================
  // PASSAGE 9 — Jazz origins (arts/music)
  // ============================================================
  {
    id: 'q-hsptrd-034',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 650,
    passage: "Jazz was born in New Orleans around the start of the twentieth century, when musicians from many backgrounds began mixing styles that had grown up beside one another for decades. African rhythms, European brass-band traditions, Caribbean dance music, and the blues all met in the city's parades, dance halls, and street corners. Performers improvised on familiar tunes, trading short solos that responded to one another in real time. From this lively conversation, a brand-new American art form emerged — one that would soon spread far beyond Louisiana to shape music around the world.",
    stem: "What is the main idea of this passage?",
    choices: ['New Orleans is the only city where jazz can develop.', 'Jazz arose in New Orleans as a blend of musical traditions that already shared the city.', 'Brass bands were the most important influence on jazz.', 'Improvisation is the only feature that defines jazz.'],
    answer: 1,
    explanation: "The passage emphasizes the meeting of multiple traditions in one place. The other choices isolate one detail or overstate it."
  },
  {
    id: 'q-hsptrd-035',
    section: 'reading',
    topic: 'purpose',
    difficulty: 680,
    passage: "Jazz was born in New Orleans around the start of the twentieth century, when musicians from many backgrounds began mixing styles that had grown up beside one another for decades. African rhythms, European brass-band traditions, Caribbean dance music, and the blues all met in the city's parades, dance halls, and street corners. Performers improvised on familiar tunes, trading short solos that responded to one another in real time. From this lively conversation, a brand-new American art form emerged — one that would soon spread far beyond Louisiana to shape music around the world.",
    stem: "Why does the author describe jazz performance as a 'lively conversation'?",
    choices: ['to emphasize the back-and-forth response between improvising musicians', 'to indicate that audiences talked along with the music', 'to suggest that jazz musicians often spoke during performances', 'to compare jazz to a debate over which style was best'],
    answer: 0,
    explanation: "The earlier sentence describes solos 'that responded to one another in real time' — the conversation metaphor captures musical exchange, not actual speech, debate, or audience chatter."
  },

  // ============================================================
  // PASSAGE 10 — Sleep and learning (science)
  // ============================================================
  {
    id: 'q-hsptrd-036',
    section: 'reading',
    topic: 'detail',
    difficulty: 590,
    passage: "Researchers studying memory have discovered that sleep does far more than rest the body. During the deepest stages of sleep, the brain replays the day's experiences and strengthens the connections between brain cells that were active during learning. A student who studies for an exam and then sleeps a full night tends to remember more than a classmate who studies for the same length of time but stays awake. Even short naps can help: a twenty-minute rest after practicing a new skill often leads to better performance later that afternoon.",
    stem: "According to the passage, what happens during the deepest stages of sleep?",
    choices: ['The brain replays the day\'s experiences and strengthens connections.', 'The body produces extra energy for the next day.', 'Memories are erased to make room for new ones.', 'The brain shuts down completely to recover.'],
    answer: 0,
    explanation: "The passage states that during deepest sleep 'the brain replays the day's experiences and strengthens the connections.' The other choices contradict the passage."
  },
  {
    id: 'q-hsptrd-037',
    section: 'reading',
    topic: 'inference',
    difficulty: 670,
    passage: "Researchers studying memory have discovered that sleep does far more than rest the body. During the deepest stages of sleep, the brain replays the day's experiences and strengthens the connections between brain cells that were active during learning. A student who studies for an exam and then sleeps a full night tends to remember more than a classmate who studies for the same length of time but stays awake. Even short naps can help: a twenty-minute rest after practicing a new skill often leads to better performance later that afternoon.",
    stem: "What can be inferred about students who pull all-night study sessions before exams?",
    choices: ['They study more efficiently than other students.', 'They will need fewer breaks during the test.', 'They will fail the exam.', 'They may remember less of what they studied than well-rested classmates.'],
    answer: 3,
    explanation: "The passage compares well-rested students to those who 'stay awake' and finds the rested students remember more — the inference applies directly to all-nighters. 'Will fail' and 'study more efficiently' overshoot the evidence."
  },

  // ============================================================
  // PASSAGE 11 — Mountain rescue (literature)
  // ============================================================
  {
    id: 'q-hsptrd-038',
    section: 'reading',
    topic: 'inference',
    difficulty: 740,
    passage: "By the time the radio crackled, the wind had erased every footprint on the ridge. Anders zipped his coat to the chin and counted the bundles in his pack a second time: rope, flares, two thermal blankets, the small stove. He had made this climb a hundred times in good weather and perhaps a dozen in storms like this. Every climb in foul weather had ended with someone safe at the bottom — though never, he reminded himself, because of luck. He stepped off the platform and into the white.",
    stem: "What can be inferred about Anders from this passage?",
    choices: ['He believes careful preparation, not luck, is what saves lives.', 'He resents being called out in bad weather.', 'He doubts he will succeed and is preparing for the worst.', 'He is a beginner attempting his first storm rescue.'],
    answer: 0,
    explanation: "Counting his supplies a second time and the line 'never, he reminded himself, because of luck' show his belief in preparation. He is clearly experienced, not doubtful, and not resentful."
  },
  {
    id: 'q-hsptrd-039',
    section: 'reading',
    topic: 'purpose',
    difficulty: 700,
    passage: "By the time the radio crackled, the wind had erased every footprint on the ridge. Anders zipped his coat to the chin and counted the bundles in his pack a second time: rope, flares, two thermal blankets, the small stove. He had made this climb a hundred times in good weather and perhaps a dozen in storms like this. Every climb in foul weather had ended with someone safe at the bottom — though never, he reminded himself, because of luck. He stepped off the platform and into the white.",
    stem: "Why does the author list the items in Anders's pack?",
    choices: ['to suggest that he is forgetful and must double-check everything', 'to imply that he is overpacked and slow', 'to compare his gear with what other climbers carry', 'to show readers how thoroughly he prepares for danger'],
    answer: 3,
    explanation: "The detailed inventory underlines his careful preparation, which the closing lines also emphasize. 'Forgetful' and 'overpacked' are unsupported, and no other climbers' gear is mentioned."
  },
  {
    id: 'q-hsptrd-040',
    section: 'reading',
    topic: 'purpose',
    difficulty: 770,
    passage: "By the time the radio crackled, the wind had erased every footprint on the ridge. Anders zipped his coat to the chin and counted the bundles in his pack a second time: rope, flares, two thermal blankets, the small stove. He had made this climb a hundred times in good weather and perhaps a dozen in storms like this. Every climb in foul weather had ended with someone safe at the bottom — though never, he reminded himself, because of luck. He stepped off the platform and into the white.",
    stem: "Why does the author end the passage with the phrase 'into the white'?",
    choices: ['to show that the storm has stopped', 'to imply that the mountain is covered in cherry blossoms', 'to leave the reader with a vivid image of stepping into the unknown of a blizzard', 'to suggest that Anders has become invisible to himself'],
    answer: 2,
    explanation: "'The white' refers to the blinding snow of the storm and creates a powerful closing image of unknown danger. The passage clearly establishes the storm and contains nothing about blossoms or stopped weather."
  }
]);
