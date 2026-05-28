/**
 * ACT Reading — fill batch.
 * testType: 'ACT', section: 'reading'.
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';
window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  // ====================================================================
  // PROSE FICTION PASSAGE 1 — "The Lighthouse Keeper's Daughter" (Q1-3)
  // ====================================================================
  {
    id: 'q-actrd-fill-001',
    section: 'reading',
    topic: 'detail',
    difficulty: 20,
    passage: 'Mara had counted the steps to the lamp room since she was six — two hundred and four, every one of them slick with sea spray in winter. Her father had taught her to climb without holding the rail, claiming that a keeper who depended on a rail was a keeper who would, eventually, fall. On the night the storm took the Henrietta, Mara was twelve. She climbed without thinking, her bare feet finding each iron tread by memory, and reached the lamp just as her father lit the wick. He did not speak. He never spoke during the lighting. But when the beam swung out across the black water, he placed one hand on her shoulder, and Mara understood, for the first time, that the light was not for ships. It was for the people who waited.',
    stem: 'According to the passage, how many steps lead to the lamp room?',
    choices: ['Two hundred and four', 'One hundred and four', 'Two hundred and forty', 'Two hundred and fourteen'],
    answer: 0,
    explanation: 'The passage states "two hundred and four, every one of them slick with sea spray." Choices B, C, and D misread the specific number Mara had counted since age six.'
  },
  {
    id: 'q-actrd-fill-002',
    section: 'reading',
    topic: 'inference',
    difficulty: 28,
    passage: 'Mara had counted the steps to the lamp room since she was six — two hundred and four, every one of them slick with sea spray in winter. Her father had taught her to climb without holding the rail, claiming that a keeper who depended on a rail was a keeper who would, eventually, fall. On the night the storm took the Henrietta, Mara was twelve. She climbed without thinking, her bare feet finding each iron tread by memory, and reached the lamp just as her father lit the wick. He did not speak. He never spoke during the lighting. But when the beam swung out across the black water, he placed one hand on her shoulder, and Mara understood, for the first time, that the light was not for ships. It was for the people who waited.',
    stem: 'The father\'s instruction not to hold the rail most strongly suggests that he values:',
    choices: ['self-reliance developed through deliberate practice.', 'obedience to maritime tradition above personal safety.', 'physical strength over emotional connection.', 'silence as the highest form of teaching.'],
    answer: 0,
    explanation: 'His claim that "a keeper who depended on a rail" would "eventually, fall" frames the rule as building self-reliance through practice. B overreaches to "tradition"; C invents a contrast not in the text; D misreads his silence as a separate teaching philosophy.'
  },
  {
    id: 'q-actrd-fill-003',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 32,
    passage: 'Mara had counted the steps to the lamp room since she was six — two hundred and four, every one of them slick with sea spray in winter. Her father had taught her to climb without holding the rail, claiming that a keeper who depended on a rail was a keeper who would, eventually, fall. On the night the storm took the Henrietta, Mara was twelve. She climbed without thinking, her bare feet finding each iron tread by memory, and reached the lamp just as her father lit the wick. He did not speak. He never spoke during the lighting. But when the beam swung out across the black water, he placed one hand on her shoulder, and Mara understood, for the first time, that the light was not for ships. It was for the people who waited.',
    stem: 'The closing sentences ("It was for the people who waited.") primarily serve to:',
    choices: ['reveal that the lighthouse failed to save the Henrietta.', 'criticize sailors who venture out in dangerous storms.', 'reframe Mara\'s understanding of her family\'s purpose.', 'foreshadow Mara\'s eventual departure from the lighthouse.'],
    answer: 2,
    explanation: 'The phrase "Mara understood, for the first time" signals a shift in her understanding — the light\'s purpose is comfort for those ashore, reframing the family\'s role. A is implied by context but is not what the line accomplishes; B is unsupported; D adds a future event not in the passage.'
  },

  // ====================================================================
  // PROSE FICTION PASSAGE 2 — "The Inherited Bookstore" (Q4-6)
  // ====================================================================
  {
    id: 'q-actrd-fill-004',
    section: 'reading',
    topic: 'tone',
    difficulty: 22,
    passage: 'When Eli inherited the bookstore from his uncle, he expected dust. He did not expect the cat. She arrived on the third afternoon, slipping through the back door as if she had been doing so for years, which, he later learned, she had. Mrs. Park from the bakery next door explained that the cat — whose name was Pencil — had belonged to no one in particular and to everyone in turn. "Your uncle fed her tuna on Tuesdays," she said. "She will expect tuna on Tuesdays." Eli, who had moved across the country to escape a life that ran on schedules, looked down at Pencil, who was looking up at him with an expression of patient, executive expectation. He sighed. He bought the tuna.',
    stem: 'The passage\'s overall tone can best be described as:',
    choices: ['gently humorous.', 'mournful and reflective.', 'sharply ironic.', 'detached and clinical.'],
    answer: 0,
    explanation: 'Phrases like "patient, executive expectation" and "He sighed. He bought the tuna" create a gentle humor. B misreads the tone as sad; C overstates the irony; D ignores the warmth in the narration.'
  },
  {
    id: 'q-actrd-fill-005',
    section: 'reading',
    topic: 'inference',
    difficulty: 26,
    passage: 'When Eli inherited the bookstore from his uncle, he expected dust. He did not expect the cat. She arrived on the third afternoon, slipping through the back door as if she had been doing so for years, which, he later learned, she had. Mrs. Park from the bakery next door explained that the cat — whose name was Pencil — had belonged to no one in particular and to everyone in turn. "Your uncle fed her tuna on Tuesdays," she said. "She will expect tuna on Tuesdays." Eli, who had moved across the country to escape a life that ran on schedules, looked down at Pencil, who was looking up at him with an expression of patient, executive expectation. He sighed. He bought the tuna.',
    stem: 'It can most reasonably be inferred from the passage that Eli:',
    choices: ['intends to sell the bookstore as soon as possible.', 'dislikes cats and resents Mrs. Park\'s interference.', 'finds himself drawn back into a routine despite his intentions.', 'plans to rename the cat once he settles in.'],
    answer: 2,
    explanation: 'He moved to "escape a life that ran on schedules" but immediately accepts the Tuesday tuna ritual — a routine reasserting itself. A, B, and D add motives the passage doesn\'t support.'
  },
  {
    id: 'q-actrd-fill-006',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 30,
    passage: 'When Eli inherited the bookstore from his uncle, he expected dust. He did not expect the cat. She arrived on the third afternoon, slipping through the back door as if she had been doing so for years, which, he later learned, she had. Mrs. Park from the bakery next door explained that the cat — whose name was Pencil — had belonged to no one in particular and to everyone in turn. "Your uncle fed her tuna on Tuesdays," she said. "She will expect tuna on Tuesdays." Eli, who had moved across the country to escape a life that ran on schedules, looked down at Pencil, who was looking up at him with an expression of patient, executive expectation. He sighed. He bought the tuna.',
    stem: 'As used in the passage, the word "executive" most nearly means:',
    choices: ['governmental.', 'efficient.', 'commanding.', 'professional.'],
    answer: 2,
    explanation: 'The cat\'s expression conveys quiet authority — she expects to be obeyed. "Commanding" fits this tone of authority. A and D apply to literal job contexts not in play; B describes speed rather than authority.'
  },

  // ====================================================================
  // PROSE FICTION PASSAGE 3 — "The Track Meet" (Q7-9)
  // ====================================================================
  {
    id: 'q-actrd-fill-007',
    section: 'reading',
    topic: 'detail',
    difficulty: 19,
    passage: 'Devon had run the four hundred meters since seventh grade, and he had never beaten Marcus Whitfield. Marcus was taller, leaner, and — most maddening of all — kind. He would shake Devon\'s hand after every race and say something genuine, like "Your second hundred was incredible," which made it impossible to hate him. At the regional final, Devon drew lane four; Marcus drew lane six. The starter raised the pistol. Devon thought, briefly, of every morning he had spent in the empty hallway behind the gym, doing the high-knee drills his coach had taped to his locker. He thought of the spreadsheet on his phone, the one with eight months of split times. Then the pistol cracked, and he stopped thinking entirely, and ran.',
    stem: 'Which detail does the passage explicitly state about Marcus Whitfield?',
    choices: ['He attended a private school.', 'He was Devon\'s teammate.', 'He was taller and leaner than Devon.', 'He had never lost a race.'],
    answer: 2,
    explanation: 'The passage says "Marcus was taller, leaner, and — most maddening of all — kind." A and B add details not in the text; D overreaches — the passage says only that Devon had never beaten him.'
  },
  {
    id: 'q-actrd-fill-008',
    section: 'reading',
    topic: 'purpose',
    difficulty: 27,
    passage: 'Devon had run the four hundred meters since seventh grade, and he had never beaten Marcus Whitfield. Marcus was taller, leaner, and — most maddening of all — kind. He would shake Devon\'s hand after every race and say something genuine, like "Your second hundred was incredible," which made it impossible to hate him. At the regional final, Devon drew lane four; Marcus drew lane six. The starter raised the pistol. Devon thought, briefly, of every morning he had spent in the empty hallway behind the gym, doing the high-knee drills his coach had taped to his locker. He thought of the spreadsheet on his phone, the one with eight months of split times. Then the pistol cracked, and he stopped thinking entirely, and ran.',
    stem: 'The references to "the empty hallway" and "the spreadsheet on his phone" primarily serve to:',
    choices: ['emphasize Devon\'s loneliness as an athlete.', 'criticize the coach\'s reliance on technology.', 'show the depth of Devon\'s preparation entering the race.', 'suggest that Devon doubts his own ability.'],
    answer: 2,
    explanation: 'Both details are concrete evidence of months of disciplined training (drills, eight months of split times). A overinterprets "empty"; B is unsupported; D contradicts the focused, prepared posture of the moment.'
  },
  {
    id: 'q-actrd-fill-009',
    section: 'reading',
    topic: 'inference',
    difficulty: 33,
    passage: 'Devon had run the four hundred meters since seventh grade, and he had never beaten Marcus Whitfield. Marcus was taller, leaner, and — most maddening of all — kind. He would shake Devon\'s hand after every race and say something genuine, like "Your second hundred was incredible," which made it impossible to hate him. At the regional final, Devon drew lane four; Marcus drew lane six. The starter raised the pistol. Devon thought, briefly, of every morning he had spent in the empty hallway behind the gym, doing the high-knee drills his coach had taped to his locker. He thought of the spreadsheet on his phone, the one with eight months of split times. Then the pistol cracked, and he stopped thinking entirely, and ran.',
    stem: 'The final sentence ("Then the pistol cracked, and he stopped thinking entirely, and ran.") most strongly implies that Devon:',
    choices: ['has internalized his preparation so thoroughly that conscious thought is unnecessary.', 'has finally surrendered to defeat.', 'is acting impulsively against his coach\'s advice.', 'will outrun Marcus for the first time.'],
    answer: 0,
    explanation: 'The cataloging of months of training before the gun, followed by "stopped thinking entirely," signals automaticity born of practice — preparation has become instinct. B inverts the meaning; C invents a conflict; D predicts an outcome the passage carefully refuses to state.'
  },

  // ====================================================================
  // PROSE FICTION PASSAGE 4 — "The Greenhouse" (Q10-12)
  // ====================================================================
  {
    id: 'q-actrd-fill-010',
    section: 'reading',
    topic: 'inference',
    difficulty: 25,
    passage: 'My grandmother\'s greenhouse smelled of warm soil and tomato leaves, and inside it she became a different woman. Outside she was careful, precise — she balanced the household ledger to the cent. Inside the greenhouse she sang, sometimes wordlessly, and let dirt cake under her fingernails for days. She told me once, between rows of seedlings, that she had wanted to be a botanist before the war. I asked why she never went back to school afterward. She shrugged in a way that closed the question, then handed me a packet of seeds and said, "These ones don\'t mind being planted late."',
    stem: 'The contrast between the grandmother\'s behavior outside and inside the greenhouse most strongly suggests that the greenhouse:',
    choices: ['is the only warm place in her home.', 'reminds her of a specific person she has lost.', 'serves as a source of income for the family.', 'allows her to express a self that her daily life suppresses.'],
    answer: 3,
    explanation: 'Outside she is "careful, precise"; inside she "sang" and let dirt cake on her hands — a clear contrast between a constrained self and an expressive one. A is literal misreading; B and C add backstory not in the text.'
  },
  {
    id: 'q-actrd-fill-011',
    section: 'reading',
    topic: 'inference',
    difficulty: 31,
    passage: 'My grandmother\'s greenhouse smelled of warm soil and tomato leaves, and inside it she became a different woman. Outside she was careful, precise — she balanced the household ledger to the cent. Inside the greenhouse she sang, sometimes wordlessly, and let dirt cake under her fingernails for days. She told me once, between rows of seedlings, that she had wanted to be a botanist before the war. I asked why she never went back to school afterward. She shrugged in a way that closed the question, then handed me a packet of seeds and said, "These ones don\'t mind being planted late."',
    stem: 'The grandmother\'s remark about the seeds ("These ones don\'t mind being planted late.") functions in the passage primarily as:',
    choices: ['a literal piece of gardening instruction for the narrator.', 'an indirect reflection on her own deferred ambitions.', 'a complaint about the limitations of the growing season.', 'a warning about the difficulty of late-blooming crops.'],
    answer: 1,
    explanation: 'The line follows her shrug at the question about why she didn\'t return to school — the seeds become a metaphor for her own late-planted, perhaps unrealized, life. A reads only the literal surface; C and D miss the emotional resonance with the prior question.'
  },
  {
    id: 'q-actrd-fill-012',
    section: 'reading',
    topic: 'tone',
    difficulty: 28,
    passage: 'My grandmother\'s greenhouse smelled of warm soil and tomato leaves, and inside it she became a different woman. Outside she was careful, precise — she balanced the household ledger to the cent. Inside the greenhouse she sang, sometimes wordlessly, and let dirt cake under her fingernails for days. She told me once, between rows of seedlings, that she had wanted to be a botanist before the war. I asked why she never went back to school afterward. She shrugged in a way that closed the question, then handed me a packet of seeds and said, "These ones don\'t mind being planted late."',
    stem: 'The narrator\'s tone toward the grandmother can best be described as:',
    choices: ['admiring but tinged with quiet sadness.', 'bitter at her grandmother\'s wasted potential.', 'cheerfully nostalgic.', 'distant and analytical.'],
    answer: 0,
    explanation: 'The careful observation of the grandmother\'s contrast and the unanswered question carry both admiration and a quiet recognition of loss. B is too harsh; C ignores the deferred-ambition note; D misses the warmth of the recollection.'
  },

  // ====================================================================
  // SOCIAL SCIENCE PASSAGE 1 — "The Origins of Standard Time" (Q13-15)
  // ====================================================================
  {
    id: 'q-actrd-fill-013',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 21,
    passage: 'Before the late nineteenth century, every town in North America kept its own time, set by the position of the sun overhead. A train traveler crossing several hundred miles might pass through dozens of distinct local times, each differing from the next by minutes. For ordinary life this caused little trouble — neighbors agreed on noon by looking up — but for the railroads it was an operational nightmare. Schedules drawn up in one city were nearly unreadable in another, and collisions resulting from timetable confusion grew more frequent as rail networks expanded. In 1883, the major rail companies of the United States and Canada agreed to divide the continent into four standard time zones. The change took effect on a single November day, and within a generation, sun-noon had been replaced almost everywhere by clock-noon.',
    stem: 'The passage is primarily concerned with:',
    choices: ['describing how railroads transformed timekeeping in North America.', 'arguing that local time is more accurate than standard time.', 'explaining why train collisions were common in the 1800s.', 'comparing American and Canadian rail systems.'],
    answer: 0,
    explanation: 'The passage traces the shift from local sun-time to standard zones driven by the railroads. B reverses the author\'s neutral framing; C focuses on a supporting detail; D ignores that the two countries are mentioned only in passing.'
  },
  {
    id: 'q-actrd-fill-014',
    section: 'reading',
    topic: 'detail',
    difficulty: 22,
    passage: 'Before the late nineteenth century, every town in North America kept its own time, set by the position of the sun overhead. A train traveler crossing several hundred miles might pass through dozens of distinct local times, each differing from the next by minutes. For ordinary life this caused little trouble — neighbors agreed on noon by looking up — but for the railroads it was an operational nightmare. Schedules drawn up in one city were nearly unreadable in another, and collisions resulting from timetable confusion grew more frequent as rail networks expanded. In 1883, the major rail companies of the United States and Canada agreed to divide the continent into four standard time zones. The change took effect on a single November day, and within a generation, sun-noon had been replaced almost everywhere by clock-noon.',
    stem: 'According to the passage, before standardization, local time was determined by:',
    choices: ['the schedules of the major railway companies.', 'an agreement among neighboring towns.', 'the position of the sun in the sky.', 'an act of national legislation.'],
    answer: 2,
    explanation: 'The opening sentence states that town time was "set by the position of the sun overhead." A inverts cause and effect; B and D describe the standardization process, not the prior local system.'
  },
  {
    id: 'q-actrd-fill-015',
    section: 'reading',
    topic: 'inference',
    difficulty: 28,
    passage: 'Before the late nineteenth century, every town in North America kept its own time, set by the position of the sun overhead. A train traveler crossing several hundred miles might pass through dozens of distinct local times, each differing from the next by minutes. For ordinary life this caused little trouble — neighbors agreed on noon by looking up — but for the railroads it was an operational nightmare. Schedules drawn up in one city were nearly unreadable in another, and collisions resulting from timetable confusion grew more frequent as rail networks expanded. In 1883, the major rail companies of the United States and Canada agreed to divide the continent into four standard time zones. The change took effect on a single November day, and within a generation, sun-noon had been replaced almost everywhere by clock-noon.',
    stem: 'The passage suggests that the shift from sun-noon to clock-noon was driven primarily by:',
    choices: ['scientific advances in astronomical measurement.', 'the practical needs of a particular industry.', 'public demand for uniformity in daily life.', 'international diplomatic agreements.'],
    answer: 1,
    explanation: 'The passage explicitly traces the shift to railroad operational needs ("for the railroads it was an operational nightmare"). A is unsupported; C contradicts "for ordinary life this caused little trouble"; D overstates a private industry agreement.'
  },

  // ====================================================================
  // SOCIAL SCIENCE PASSAGE 2 — "The Cooperative Movement" (Q16-18)
  // ====================================================================
  {
    id: 'q-actrd-fill-016',
    section: 'reading',
    topic: 'detail',
    difficulty: 26,
    passage: 'Modern consumer cooperatives trace their organizational lineage to a group of twenty-eight weavers in Rochdale, England, who in 1844 pooled a small sum to open a member-owned grocery shop. The Rochdale Pioneers, as they came to be known, established several principles that still define cooperative enterprises today: open membership, democratic control on the basis of one member, one vote, and the distribution of surplus in proportion to a member\'s purchases rather than in proportion to capital invested. These principles spread quickly across Europe and, more slowly, to North America, where agricultural cooperatives took root in the late nineteenth century. By the early twentieth century, cooperatives counted millions of members worldwide, although in most national economies they remained a minority form of enterprise alongside investor-owned firms.',
    stem: 'According to the passage, in a cooperative based on Rochdale principles, surplus is distributed in proportion to:',
    choices: ['the amount of capital each member has invested.', 'the seniority of each member\'s involvement.', 'the number of votes each member has cast.', 'the volume of each member\'s purchases.'],
    answer: 3,
    explanation: 'The passage states surplus is distributed "in proportion to a member\'s purchases rather than in proportion to capital invested." A is the explicitly rejected method; B and C are not mentioned.'
  },
  {
    id: 'q-actrd-fill-017',
    section: 'reading',
    topic: 'compare-contrast',
    difficulty: 29,
    passage: 'Modern consumer cooperatives trace their organizational lineage to a group of twenty-eight weavers in Rochdale, England, who in 1844 pooled a small sum to open a member-owned grocery shop. The Rochdale Pioneers, as they came to be known, established several principles that still define cooperative enterprises today: open membership, democratic control on the basis of one member, one vote, and the distribution of surplus in proportion to a member\'s purchases rather than in proportion to capital invested. These principles spread quickly across Europe and, more slowly, to North America, where agricultural cooperatives took root in the late nineteenth century. By the early twentieth century, cooperatives counted millions of members worldwide, although in most national economies they remained a minority form of enterprise alongside investor-owned firms.',
    stem: 'The passage draws a contrast between cooperatives and investor-owned firms primarily by emphasizing differences in:',
    choices: ['geographical distribution.', 'the basis on which control and surplus are allocated.', 'the size of their membership over time.', 'the regulatory environments in which they operate.'],
    answer: 1,
    explanation: 'The defining features cited — one member, one vote, and distribution by purchases not capital — both contrast with how investor-owned firms allocate control and returns. A and D are not discussed; C describes growth, not the contrast itself.'
  },
  {
    id: 'q-actrd-fill-018',
    section: 'reading',
    topic: 'inference',
    difficulty: 33,
    passage: 'Modern consumer cooperatives trace their organizational lineage to a group of twenty-eight weavers in Rochdale, England, who in 1844 pooled a small sum to open a member-owned grocery shop. The Rochdale Pioneers, as they came to be known, established several principles that still define cooperative enterprises today: open membership, democratic control on the basis of one member, one vote, and the distribution of surplus in proportion to a member\'s purchases rather than in proportion to capital invested. These principles spread quickly across Europe and, more slowly, to North America, where agricultural cooperatives took root in the late nineteenth century. By the early twentieth century, cooperatives counted millions of members worldwide, although in most national economies they remained a minority form of enterprise alongside investor-owned firms.',
    stem: 'The final sentence most strongly implies that, despite their global spread, cooperatives:',
    choices: ['have failed to attract members in agricultural sectors.', 'were eventually outlawed in several countries.', 'never became the dominant organizational form in most economies.', 'lost their distinctive principles by the early twentieth century.'],
    answer: 2,
    explanation: 'The phrase "remained a minority form of enterprise alongside investor-owned firms" directly supports C. A contradicts the agricultural success mentioned; B and D are not stated.'
  },

  // ====================================================================
  // SOCIAL SCIENCE PASSAGE 3 — "Urban Foraging" (Q19-21)
  // ====================================================================
  {
    id: 'q-actrd-fill-019',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 22,
    passage: 'Anthropologists have long studied foraging societies in remote regions, but a recent strand of research turns the lens on cities. Urban foragers — residents who gather edible plants, mushrooms, and fallen fruit from parks, alleys, and abandoned lots — exist in nearly every large metropolitan area, although their numbers are difficult to count. Surveys conducted in five North American cities suggest that urban foragers come from a broad range of income levels and cultural backgrounds. Their motivations vary: some forage for food security, others for connection to a culinary tradition, others simply for the pleasure of recognizing the wild plants growing among the concrete. What unites them, the researchers argue, is a different way of seeing the city — one in which the line between cultivated and wild, public and private, is far less fixed than maps suggest.',
    stem: 'The passage is primarily concerned with:',
    choices: ['urging cities to legalize the gathering of wild plants in public spaces.', 'describing a research focus on a diverse and overlooked urban practice.', 'comparing urban foraging in North America with foraging in remote regions.', 'documenting the decline of traditional foraging societies.'],
    answer: 1,
    explanation: 'The passage describes a research strand examining urban foragers and their varied profile. A is policy advocacy not made; C is a setup the passage abandons; D is unrelated.'
  },
  {
    id: 'q-actrd-fill-020',
    section: 'reading',
    topic: 'detail',
    difficulty: 24,
    passage: 'Anthropologists have long studied foraging societies in remote regions, but a recent strand of research turns the lens on cities. Urban foragers — residents who gather edible plants, mushrooms, and fallen fruit from parks, alleys, and abandoned lots — exist in nearly every large metropolitan area, although their numbers are difficult to count. Surveys conducted in five North American cities suggest that urban foragers come from a broad range of income levels and cultural backgrounds. Their motivations vary: some forage for food security, others for connection to a culinary tradition, others simply for the pleasure of recognizing the wild plants growing among the concrete. What unites them, the researchers argue, is a different way of seeing the city — one in which the line between cultivated and wild, public and private, is far less fixed than maps suggest.',
    stem: 'According to the passage, surveys of urban foragers in five North American cities found that the foragers:',
    choices: ['came from a wide range of incomes and cultures.', 'were primarily from low-income neighborhoods.', 'shared a single cultural background.', 'were generally newcomers to the city.'],
    answer: 0,
    explanation: 'The passage states foragers "come from a broad range of income levels and cultural backgrounds." B and C contradict this; D is not mentioned.'
  },
  {
    id: 'q-actrd-fill-021',
    section: 'reading',
    topic: 'inference',
    difficulty: 32,
    passage: 'Anthropologists have long studied foraging societies in remote regions, but a recent strand of research turns the lens on cities. Urban foragers — residents who gather edible plants, mushrooms, and fallen fruit from parks, alleys, and abandoned lots — exist in nearly every large metropolitan area, although their numbers are difficult to count. Surveys conducted in five North American cities suggest that urban foragers come from a broad range of income levels and cultural backgrounds. Their motivations vary: some forage for food security, others for connection to a culinary tradition, others simply for the pleasure of recognizing the wild plants growing among the concrete. What unites them, the researchers argue, is a different way of seeing the city — one in which the line between cultivated and wild, public and private, is far less fixed than maps suggest.',
    stem: 'The researchers\' claim about a "different way of seeing the city" most strongly implies that, in their view, conventional maps:',
    choices: ['are inaccurate as guides to urban geography.', 'underrepresent the number of parks in most cities.', 'reinforce categorical distinctions that foragers experience as porous.', 'are unfamiliar to most urban foragers.'],
    answer: 2,
    explanation: 'The passage contrasts foragers\' fluid view of "cultivated and wild, public and private" with the fixed lines maps suggest — i.e., maps reinforce categories foragers find porous. A overstates inaccuracy; B and D are unsupported.'
  },

  // ====================================================================
  // HUMANITIES PASSAGE 1 — "Ekphrasis in Poetry" (Q22-24)
  // ====================================================================
  {
    id: 'q-actrd-fill-022',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 27,
    passage: 'Critics use the term ekphrasis to describe a poem that takes a work of visual art as its subject. The form is ancient — Homer devoted lines to the shield of Achilles — but it has flourished in modern poetry, where poets have written about photographs, sculptures, and paintings hanging in museums they may have visited only once. A successful ekphrastic poem does not merely describe its source. Rather, it enters into a kind of conversation with the artwork, sometimes affectionate, sometimes adversarial, often both. The poem may notice what the painting omits, or speak in the voice of a figure depicted, or trace a viewer\'s wandering attention across the canvas. In doing so, the poet acknowledges that no description is neutral; every act of looking is also an act of choosing.',
    stem: 'As used in the passage, the word "adversarial" most nearly means:',
    choices: ['confused.', 'humorous.', 'admiring.', 'oppositional.'],
    answer: 3,
    explanation: 'Paired with "affectionate," "adversarial" describes its opposite — a contentious, oppositional stance. A misreads tone; B and C weaken or invert the contrast.'
  },
  {
    id: 'q-actrd-fill-023',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 28,
    passage: 'Critics use the term ekphrasis to describe a poem that takes a work of visual art as its subject. The form is ancient — Homer devoted lines to the shield of Achilles — but it has flourished in modern poetry, where poets have written about photographs, sculptures, and paintings hanging in museums they may have visited only once. A successful ekphrastic poem does not merely describe its source. Rather, it enters into a kind of conversation with the artwork, sometimes affectionate, sometimes adversarial, often both. The poem may notice what the painting omits, or speak in the voice of a figure depicted, or trace a viewer\'s wandering attention across the canvas. In doing so, the poet acknowledges that no description is neutral; every act of looking is also an act of choosing.',
    stem: 'The author\'s central claim about successful ekphrastic poetry is that it:',
    choices: ['provides an accurate visual record of the artwork.', 'engages the artwork as an active interpretive partner rather than passively describing it.', 'must adopt the voice of a figure within the painting.', 'is best when it is affectionate rather than critical.'],
    answer: 1,
    explanation: 'The author rejects mere description ("does not merely describe") in favor of "conversation" — an active engagement. A is what the author rejects; C is one example, not the central claim; D contradicts the claim that both modes succeed.'
  },
  {
    id: 'q-actrd-fill-024',
    section: 'reading',
    topic: 'inference',
    difficulty: 34,
    passage: 'Critics use the term ekphrasis to describe a poem that takes a work of visual art as its subject. The form is ancient — Homer devoted lines to the shield of Achilles — but it has flourished in modern poetry, where poets have written about photographs, sculptures, and paintings hanging in museums they may have visited only once. A successful ekphrastic poem does not merely describe its source. Rather, it enters into a kind of conversation with the artwork, sometimes affectionate, sometimes adversarial, often both. The poem may notice what the painting omits, or speak in the voice of a figure depicted, or trace a viewer\'s wandering attention across the canvas. In doing so, the poet acknowledges that no description is neutral; every act of looking is also an act of choosing.',
    stem: 'The closing assertion that "every act of looking is also an act of choosing" most strongly implies that the author views ekphrastic poetry as:',
    choices: ['a flawed enterprise because no description can be objective.', 'a niche genre with limited modern application.', 'most effective when the poet has spent extensive time with the artwork.', 'valuable precisely because it foregrounds the interpretive nature of perception.'],
    answer: 3,
    explanation: 'The closing line is offered approvingly: the form\'s strength lies in making visible the chosen, interpretive nature of looking. A treats the same observation as a flaw; B contradicts "flourished in modern poetry"; C undermines the earlier "may have visited only once."'
  },

  // ====================================================================
  // HUMANITIES PASSAGE 2 — "The Sketchbook" (Q25-27)
  // ====================================================================
  {
    id: 'q-actrd-fill-025',
    section: 'reading',
    topic: 'purpose',
    difficulty: 25,
    passage: 'Long before they became collectible objects in their own right, artists\' sketchbooks were tools — portable workshops in which ideas were tested, abandoned, refined, and occasionally salvaged. A sketchbook page might hold a finished study beside three failed attempts at the same hand, with a shopping list scrawled in the margin. To later viewers, this disorder is part of the appeal: the sketchbook offers a glimpse of thought in motion, before the polish of the final canvas. But it is worth remembering that the artist did not draw with us in mind. The sketchbook\'s authority comes precisely from its privacy. It records what the artist was willing to try when no one was looking.',
    stem: 'The author\'s primary purpose in the passage is to:',
    choices: ['encourage readers to begin keeping their own sketchbooks.', 'reflect on what makes artists\' sketchbooks meaningful documents.', 'argue that finished paintings are less valuable than preparatory sketches.', 'criticize collectors who treat sketchbooks as commodities.'],
    answer: 1,
    explanation: 'The passage thoughtfully describes the sketchbook\'s role and the source of its appeal. A and C are recommendations the author does not make; D overreads the brief mention of collectability.'
  },
  {
    id: 'q-actrd-fill-026',
    section: 'reading',
    topic: 'inference',
    difficulty: 31,
    passage: 'Long before they became collectible objects in their own right, artists\' sketchbooks were tools — portable workshops in which ideas were tested, abandoned, refined, and occasionally salvaged. A sketchbook page might hold a finished study beside three failed attempts at the same hand, with a shopping list scrawled in the margin. To later viewers, this disorder is part of the appeal: the sketchbook offers a glimpse of thought in motion, before the polish of the final canvas. But it is worth remembering that the artist did not draw with us in mind. The sketchbook\'s authority comes precisely from its privacy. It records what the artist was willing to try when no one was looking.',
    stem: 'The author suggests that a sketchbook\'s value to later viewers depends, paradoxically, on the fact that:',
    choices: ['it is rarely seen by the public.', 'it contains both finished and unfinished work.', 'it was once carried into the field.', 'it was created without later viewers in mind.'],
    answer: 3,
    explanation: 'The author explicitly says the sketchbook\'s authority "comes precisely from its privacy" — i.e., it was not made for us. A describes a current condition, not the source of value; B and C are details, not the paradox the author identifies.'
  },
  {
    id: 'q-actrd-fill-027',
    section: 'reading',
    topic: 'tone',
    difficulty: 30,
    passage: 'Long before they became collectible objects in their own right, artists\' sketchbooks were tools — portable workshops in which ideas were tested, abandoned, refined, and occasionally salvaged. A sketchbook page might hold a finished study beside three failed attempts at the same hand, with a shopping list scrawled in the margin. To later viewers, this disorder is part of the appeal: the sketchbook offers a glimpse of thought in motion, before the polish of the final canvas. But it is worth remembering that the artist did not draw with us in mind. The sketchbook\'s authority comes precisely from its privacy. It records what the artist was willing to try when no one was looking.',
    stem: 'The author\'s tone in the passage can best be described as:',
    choices: ['skeptical and cautionary.', 'nostalgic and mournful.', 'enthusiastic and persuasive.', 'thoughtful and appreciative.'],
    answer: 3,
    explanation: 'The author appreciates the sketchbook ("disorder is part of the appeal") while thoughtfully noting the source of that appeal. A misses the warmth; B invents loss; C overstates the rhetorical pitch.'
  },

  // ====================================================================
  // HUMANITIES PASSAGE 3 — "Translating Poetry" (Q28-30)
  // ====================================================================
  {
    id: 'q-actrd-fill-028',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 29,
    passage: 'A translator of poetry is asked to perform two tasks that often conflict: to carry across the meaning of the original and to produce a poem that reads, in its new language, as a poem. The first task pulls toward literalness; the second toward invention. A translator who chooses pure literalness may produce a document useful for scholars but flat as poetry. A translator who chooses pure invention may produce a beautiful poem that, on examination, owes very little to the original. Most working translators move between these poles, sentence by sentence, granting themselves liberties in some places to preserve faithfulness in others. The result is, inevitably, a third thing — neither the original nor a free composition, but a negotiated object whose value depends on the wisdom of the negotiations.',
    stem: 'The author\'s main argument is that the best poetry translations:',
    choices: ['arise from continual, judgment-based compromises between literalness and invention.', 'err on the side of literal accuracy whenever possible.', 'should be done only by poets who also speak the source language fluently.', 'are best read alongside the original text.'],
    answer: 0,
    explanation: 'The passage describes successful translations as "negotiated" objects produced by moving "between these poles, sentence by sentence." B is one pole the author rejects in pure form; C and D are not discussed.'
  },
  {
    id: 'q-actrd-fill-029',
    section: 'reading',
    topic: 'compare-contrast',
    difficulty: 34,
    passage: 'A translator of poetry is asked to perform two tasks that often conflict: to carry across the meaning of the original and to produce a poem that reads, in its new language, as a poem. The first task pulls toward literalness; the second toward invention. A translator who chooses pure literalness may produce a document useful for scholars but flat as poetry. A translator who chooses pure invention may produce a beautiful poem that, on examination, owes very little to the original. Most working translators move between these poles, sentence by sentence, granting themselves liberties in some places to preserve faithfulness in others. The result is, inevitably, a third thing — neither the original nor a free composition, but a negotiated object whose value depends on the wisdom of the negotiations.',
    stem: 'According to the passage, a "pure literalness" translation differs from a "pure invention" translation primarily in that the former:',
    choices: ['is favored by working translators.', 'is more likely to be published in book form.', 'preserves the original\'s rhyme scheme.', 'serves scholarly purposes but tends to lack poetic life.'],
    answer: 3,
    explanation: 'The passage states a literal translation may be "useful for scholars but flat as poetry," contrasting it with the beautiful but unfaithful invention. A contradicts the passage; B and C introduce details the passage does not address.'
  },
  {
    id: 'q-actrd-fill-030',
    section: 'reading',
    topic: 'inference',
    difficulty: 35,
    passage: 'A translator of poetry is asked to perform two tasks that often conflict: to carry across the meaning of the original and to produce a poem that reads, in its new language, as a poem. The first task pulls toward literalness; the second toward invention. A translator who chooses pure literalness may produce a document useful for scholars but flat as poetry. A translator who chooses pure invention may produce a beautiful poem that, on examination, owes very little to the original. Most working translators move between these poles, sentence by sentence, granting themselves liberties in some places to preserve faithfulness in others. The result is, inevitably, a third thing — neither the original nor a free composition, but a negotiated object whose value depends on the wisdom of the negotiations.',
    stem: 'The phrase "the wisdom of the negotiations" most strongly implies that the author judges a translation\'s quality by:',
    choices: ['the soundness of the choices the translator makes about when to deviate and when to adhere.', 'the number of words it shares with the original.', 'the degree to which it pleases readers fluent in both languages.', 'the literary reputation of the translator at the time of publication.'],
    answer: 0,
    explanation: '"Negotiations" refers to the trade-offs between liberties and faithfulness; "wisdom" refers to the judgment behind those trade-offs. B reduces translation to word-counting; C and D introduce external criteria the author does not invoke.'
  },

  // ====================================================================
  // NATURAL SCIENCE PASSAGE 1 — "Mycorrhizal Networks" (Q31-33)
  // ====================================================================
  {
    id: 'q-actrd-fill-031',
    section: 'reading',
    topic: 'detail',
    difficulty: 22,
    passage: 'Beneath nearly every forest lies a living network whose existence was unsuspected for most of botanical history. Mycorrhizal fungi form sheaths around tree roots and extend microscopic threads, called hyphae, far into the surrounding soil. The arrangement is mutually beneficial: the fungi receive sugars produced by the tree through photosynthesis, while the tree receives water and minerals — particularly phosphorus — that the hyphae extract from soil too fine for roots to penetrate. Recent experiments using radioactive tracers have shown that, in some forests, neighboring trees of the same species exchange small quantities of carbon through these fungal connections. The biological function of this exchange remains debated. Some researchers see it as evidence of cooperation among trees; others suggest it may simply reflect the fungi\'s own metabolic activity, with the trees as incidental participants.',
    stem: 'According to the passage, mycorrhizal fungi extend microscopic threads into the soil that are called:',
    choices: ['sheaths.', 'tracers.', 'phosphorus.', 'hyphae.'],
    answer: 3,
    explanation: 'The passage explicitly defines hyphae as the microscopic threads. A is the structure around the root; B is a research tool; C is a mineral.'
  },
  {
    id: 'q-actrd-fill-032',
    section: 'reading',
    topic: 'compare-contrast',
    difficulty: 31,
    passage: 'Beneath nearly every forest lies a living network whose existence was unsuspected for most of botanical history. Mycorrhizal fungi form sheaths around tree roots and extend microscopic threads, called hyphae, far into the surrounding soil. The arrangement is mutually beneficial: the fungi receive sugars produced by the tree through photosynthesis, while the tree receives water and minerals — particularly phosphorus — that the hyphae extract from soil too fine for roots to penetrate. Recent experiments using radioactive tracers have shown that, in some forests, neighboring trees of the same species exchange small quantities of carbon through these fungal connections. The biological function of this exchange remains debated. Some researchers see it as evidence of cooperation among trees; others suggest it may simply reflect the fungi\'s own metabolic activity, with the trees as incidental participants.',
    stem: 'The two interpretations of carbon exchange between trees described in the passage differ primarily in whether they:',
    choices: ['accept the experimental data as valid.', 'attribute the exchange to tree behavior or to fungal activity.', 'view the exchange as common or rare in forests.', 'consider the exchange beneficial or harmful to trees.'],
    answer: 1,
    explanation: 'One view sees the exchange as cooperation among trees; the other sees it as fungal metabolism with trees "incidental." A and D mischaracterize the debate; C concerns frequency, not the disagreement.'
  },
  {
    id: 'q-actrd-fill-033',
    section: 'reading',
    topic: 'inference',
    difficulty: 28,
    passage: 'Beneath nearly every forest lies a living network whose existence was unsuspected for most of botanical history. Mycorrhizal fungi form sheaths around tree roots and extend microscopic threads, called hyphae, far into the surrounding soil. The arrangement is mutually beneficial: the fungi receive sugars produced by the tree through photosynthesis, while the tree receives water and minerals — particularly phosphorus — that the hyphae extract from soil too fine for roots to penetrate. Recent experiments using radioactive tracers have shown that, in some forests, neighboring trees of the same species exchange small quantities of carbon through these fungal connections. The biological function of this exchange remains debated. Some researchers see it as evidence of cooperation among trees; others suggest it may simply reflect the fungi\'s own metabolic activity, with the trees as incidental participants.',
    stem: 'The passage indicates that one advantage trees gain from mycorrhizal fungi is access to:',
    choices: ['sunlight in shaded areas of the forest.', 'minerals from soil too fine for roots to enter.', 'sugars synthesized by the fungi.', 'protection from soil-borne pathogens.'],
    answer: 1,
    explanation: 'The passage states the tree receives water and minerals "from soil too fine for roots to penetrate." A and D are unsupported; C reverses the direction of sugar transfer (tree to fungi).'
  },

  // ====================================================================
  // NATURAL SCIENCE PASSAGE 2 — "Catalysts" (Q34-36)
  // ====================================================================
  {
    id: 'q-actrd-fill-034',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 26,
    passage: 'A catalyst is a substance that increases the rate of a chemical reaction without itself being consumed by it. The catalyst lowers what chemists call the activation energy — the minimum energy two molecules must possess in order to react when they collide. Without a catalyst, only a small fraction of molecular collisions in a typical mixture have enough energy to react. With a well-chosen catalyst, a far larger fraction does, and a reaction that might take years can complete in minutes. Living systems rely on catalysts called enzymes for nearly every chemical transformation in the body, from the digestion of food to the replication of DNA. Industrial chemists, taking inspiration from biology, have spent over a century developing synthetic catalysts to manufacture fertilizers, fuels, and plastics on enormous scales.',
    stem: 'The passage is best described as:',
    choices: ['an argument that synthetic catalysts have surpassed biological enzymes in efficiency.', 'a history of industrial chemistry in the twentieth century.', 'a comparison between activation energy and reaction temperature.', 'an explanation of what catalysts do and why they are important.'],
    answer: 3,
    explanation: 'The passage defines catalysts, explains the activation-energy mechanism, and notes their biological and industrial importance. A makes a comparative claim not in the passage; B and C pick up minor threads as the whole.'
  },
  {
    id: 'q-actrd-fill-035',
    section: 'reading',
    topic: 'detail',
    difficulty: 21,
    passage: 'A catalyst is a substance that increases the rate of a chemical reaction without itself being consumed by it. The catalyst lowers what chemists call the activation energy — the minimum energy two molecules must possess in order to react when they collide. Without a catalyst, only a small fraction of molecular collisions in a typical mixture have enough energy to react. With a well-chosen catalyst, a far larger fraction does, and a reaction that might take years can complete in minutes. Living systems rely on catalysts called enzymes for nearly every chemical transformation in the body, from the digestion of food to the replication of DNA. Industrial chemists, taking inspiration from biology, have spent over a century developing synthetic catalysts to manufacture fertilizers, fuels, and plastics on enormous scales.',
    stem: 'According to the passage, the term "activation energy" refers to:',
    choices: ['the energy released when a reaction completes.', 'the minimum energy molecules need to react upon collision.', 'the energy required to manufacture a catalyst.', 'the heat generated by a chemical reaction.'],
    answer: 1,
    explanation: 'The passage defines activation energy as "the minimum energy two molecules must possess in order to react when they collide." A, C, and D describe other (or invented) energy concepts.'
  },
  {
    id: 'q-actrd-fill-036',
    section: 'reading',
    topic: 'inference',
    difficulty: 28,
    passage: 'A catalyst is a substance that increases the rate of a chemical reaction without itself being consumed by it. The catalyst lowers what chemists call the activation energy — the minimum energy two molecules must possess in order to react when they collide. Without a catalyst, only a small fraction of molecular collisions in a typical mixture have enough energy to react. With a well-chosen catalyst, a far larger fraction does, and a reaction that might take years can complete in minutes. Living systems rely on catalysts called enzymes for nearly every chemical transformation in the body, from the digestion of food to the replication of DNA. Industrial chemists, taking inspiration from biology, have spent over a century developing synthetic catalysts to manufacture fertilizers, fuels, and plastics on enormous scales.',
    stem: 'The passage suggests that the relationship between biological enzymes and synthetic catalysts is one in which:',
    choices: ['enzymes have replaced synthetic catalysts in most industrial uses.', 'synthetic catalysts work by entirely different mechanisms than enzymes.', 'enzymes are more energy-intensive to use than synthetic catalysts.', 'industrial chemistry has drawn inspiration from biological systems.'],
    answer: 3,
    explanation: 'The passage states industrial chemists developed catalysts "taking inspiration from biology." A and C reverse or invent comparisons; B contradicts the shared activation-energy framework.'
  },

  // ====================================================================
  // NATURAL SCIENCE PASSAGE 3 — "Light Pollution" (Q37-38)
  // ====================================================================
  {
    id: 'q-actrd-fill-037',
    section: 'reading',
    topic: 'purpose',
    difficulty: 25,
    passage: 'Light pollution — the brightening of the night sky by artificial illumination — is now measurable on every inhabited continent. Sky brightness has increased by an average of two percent per year over the past decade, according to citizen-science measurements collected by amateur astronomers worldwide. The ecological consequences are still being mapped. Migratory birds that navigate by stars become disoriented near brightly lit cities; sea turtle hatchlings, which rely on a darker horizon to find the ocean, instead crawl toward beachfront streetlights and perish. Even insect populations show measurable declines near continuously illuminated areas. Conservationists who once focused exclusively on land use and chemical pollution have begun to argue that the night itself is a habitat — one that has been altered, almost everywhere on Earth, with little public attention.',
    stem: 'The author\'s primary purpose in citing migratory birds, sea turtles, and insects is to:',
    choices: ['show that light pollution causes measurable ecological harm to multiple species.', 'argue that beachfront streetlights should be banned.', 'demonstrate that amateur astronomers underestimate light pollution.', 'criticize public officials who ignore environmental warnings.'],
    answer: 0,
    explanation: 'The three examples illustrate that the harm of light pollution extends across diverse species. B is one possible policy not advocated; C contradicts the role of citizen-science data; D adds a critique not in the text.'
  },
  {
    id: 'q-actrd-fill-038',
    section: 'reading',
    topic: 'inference',
    difficulty: 32,
    passage: 'Light pollution — the brightening of the night sky by artificial illumination — is now measurable on every inhabited continent. Sky brightness has increased by an average of two percent per year over the past decade, according to citizen-science measurements collected by amateur astronomers worldwide. The ecological consequences are still being mapped. Migratory birds that navigate by stars become disoriented near brightly lit cities; sea turtle hatchlings, which rely on a darker horizon to find the ocean, instead crawl toward beachfront streetlights and perish. Even insect populations show measurable declines near continuously illuminated areas. Conservationists who once focused exclusively on land use and chemical pollution have begun to argue that the night itself is a habitat — one that has been altered, almost everywhere on Earth, with little public attention.',
    stem: 'The closing claim that "the night itself is a habitat" most strongly suggests a shift among conservationists toward:',
    choices: ['regarding artificial light as a defining feature of modern cities.', 'treating darkness as an ecological resource that can be lost.', 'studying nocturnal animals more than diurnal ones.', 'advocating exclusively for the preservation of dark-sky parks.'],
    answer: 1,
    explanation: 'Calling the night a "habitat" reframes darkness as something living systems depend on and that can be degraded. A misses the conservation framing; C narrows research focus not claimed; D overstates one possible policy.'
  },

  // ====================================================================
  // NATURAL SCIENCE PASSAGE 4 — "Tardigrades" (Q39-40)
  // ====================================================================
  {
    id: 'q-actrd-fill-039',
    section: 'reading',
    topic: 'detail',
    difficulty: 21,
    passage: 'Tardigrades, sometimes called water bears, are microscopic animals that live in moss, lichen, and the thin films of water that coat soil. Adults rarely exceed half a millimeter in length and have eight stubby legs ending in claws. What makes tardigrades remarkable is not their size but their resilience. When their environment dries out, they enter a state called cryptobiosis, in which their metabolism slows to less than one percent of normal. In this state, tardigrades have survived temperatures near absolute zero, pressures greater than those at the bottom of the ocean, and even direct exposure to the vacuum of space during one orbital experiment. Returned to liquid water, they rehydrate within hours and resume ordinary life — feeding, moving, and reproducing as if no interruption had occurred.',
    stem: 'According to the passage, when tardigrades enter cryptobiosis, their metabolism slows to:',
    choices: ['roughly half of normal activity.', 'approximately ten percent of normal activity.', 'a complete halt for the duration of the dry period.', 'less than one percent of normal activity.'],
    answer: 3,
    explanation: 'The passage states their metabolism slows "to less than one percent of normal." A and B are wrong fractions; C overstates as a complete halt, which the passage does not claim.'
  },
  {
    id: 'q-actrd-fill-040',
    section: 'reading',
    topic: 'inference',
    difficulty: 36,
    passage: 'Tardigrades, sometimes called water bears, are microscopic animals that live in moss, lichen, and the thin films of water that coat soil. Adults rarely exceed half a millimeter in length and have eight stubby legs ending in claws. What makes tardigrades remarkable is not their size but their resilience. When their environment dries out, they enter a state called cryptobiosis, in which their metabolism slows to less than one percent of normal. In this state, tardigrades have survived temperatures near absolute zero, pressures greater than those at the bottom of the ocean, and even direct exposure to the vacuum of space during one orbital experiment. Returned to liquid water, they rehydrate within hours and resume ordinary life — feeding, moving, and reproducing as if no interruption had occurred.',
    stem: 'The passage\'s account of tardigrade resilience most strongly supports which of the following inferences?',
    choices: ['Tardigrades are likely to evolve into a larger species in the near future.', 'Tardigrades originated in outer space and arrived on Earth via meteorite.', 'The boundary between active life and suspended biological activity is, for some organisms, more porous than once assumed.', 'Most microscopic animals are capable of cryptobiosis.'],
    answer: 2,
    explanation: 'A creature whose metabolism can drop to under 1 percent and resume ordinary life implies the active/suspended boundary is not a sharp on/off line. A and B make claims the passage avoids; D overgeneralizes from one species.'
  }
]);
