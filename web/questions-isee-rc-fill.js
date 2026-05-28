/**
 * ISEE Reading Comprehension — fill batch.
 * testType: 'ISEE', section: 'reading-comprehension'.
 * Concatenates onto window.STL_QUESTIONS_ISEE.
 */
'use strict';
window.STL_QUESTIONS_ISEE = (window.STL_QUESTIONS_ISEE || []).concat([
  // ===== PASSAGE 1: Humanities — Bauhaus design (Q1-3) =====
  {
    id: 'q-iseerc-fill-001',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 6,
    passage: 'The Bauhaus school, founded in Germany in 1919, sought to dissolve the traditional boundary between fine art and craft. Its instructors believed that a chair, a teapot, and a painting deserved equal artistic seriousness. Students worked in metal shops, weaving studios, and printing rooms, often rotating through several disciplines before specializing. This integrated approach produced furniture and lamps now considered icons of modern design. Yet the school operated for only fourteen years before political pressure forced its closure in 1933. Its faculty scattered across Europe and the United States, planting the seeds of what would become the international modernist style.',
    stem: 'The passage is primarily concerned with',
    choices: [
      'describing the philosophy and influence of a short-lived design school',
      'tracing the personal lives of Bauhaus instructors after 1933',
      'arguing that handcrafted objects are superior to mass-produced ones',
      'explaining why political movements often target educational institutions'
    ],
    answer: 0,
    explanation: 'The passage describes the Bauhaus mission (lines 1-3), its methods (lines 3-5), and its lasting influence despite closure (lines 6-9). (A) captures both philosophy and influence. (B) treats a closing detail as the focus. (C) is never argued — the passage praises integration, not handcraft over machine. (D) generalizes beyond the specific case.'
  },
  {
    id: 'q-iseerc-fill-002',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 4,
    passage: 'The Bauhaus school, founded in Germany in 1919, sought to dissolve the traditional boundary between fine art and craft. Its instructors believed that a chair, a teapot, and a painting deserved equal artistic seriousness. Students worked in metal shops, weaving studios, and printing rooms, often rotating through several disciplines before specializing. This integrated approach produced furniture and lamps now considered icons of modern design. Yet the school operated for only fourteen years before political pressure forced its closure in 1933. Its faculty scattered across Europe and the United States, planting the seeds of what would become the international modernist style.',
    stem: 'According to the passage, students at the Bauhaus typically',
    choices: [
      'specialized in a single craft from their first day',
      'studied only painting and sculpture before graduating',
      'rotated through multiple workshops before choosing a specialty',
      'were required to design at least one building'
    ],
    answer: 2,
    explanation: 'Lines 4-5 state students worked in several shops and "rotating through several disciplines before specializing." (A) reverses this. (B) excludes the metal, weaving, and printing studios named. (D) is unsupported.'
  },
  {
    id: 'q-iseerc-fill-003',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 6,
    passage: 'The Bauhaus school, founded in Germany in 1919, sought to dissolve the traditional boundary between fine art and craft. Its instructors believed that a chair, a teapot, and a painting deserved equal artistic seriousness. Students worked in metal shops, weaving studios, and printing rooms, often rotating through several disciplines before specializing. This integrated approach produced furniture and lamps now considered icons of modern design. Yet the school operated for only fourteen years before political pressure forced its closure in 1933. Its faculty scattered across Europe and the United States, planting the seeds of what would become the international modernist style.',
    stem: 'As used in the passage, "dissolve" most nearly means',
    choices: [
      'liquefy',
      'celebrate',
      'reinforce',
      'eliminate'
    ],
    answer: 3,
    explanation: 'The Bauhaus aimed to remove the boundary between art and craft. (D) "eliminate" fits. (A) is the literal scientific sense, not the figurative use here. (B) and (C) are opposites of the meaning.'
  },

  // ===== PASSAGE 2: History — Erie Canal (Q4-6) =====
  {
    id: 'q-iseerc-fill-004',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 6,
    passage: 'When ground was first broken on the Erie Canal in 1817, critics dismissed the project as "Clinton\'s Ditch," a vanity scheme of New York governor DeWitt Clinton. Few engineers in North America had ever built locks, and the proposed route stretched 363 miles through forests and swamps. Yet by 1825 barges were moving freight from Buffalo to Albany at one-tenth the cost of overland hauling. Towns sprouted along the towpath, and New York City, connected by river to the canal\'s eastern terminus, swelled into the nation\'s busiest port. The mockery faded; engineers from across the continent traveled to study the locks they had once called impossible.',
    stem: 'The passage is best described as',
    choices: [
      'an account of how a doubted project transformed a region',
      'a defense of one politician against unfair criticism',
      'a technical manual for canal construction',
      'a comparison between water and rail transportation'
    ],
    answer: 0,
    explanation: 'The passage moves from skepticism (lines 1-3) to economic and engineering success (lines 4-9). (A) captures both the doubt and the transformation. (C) is too narrow — no technical detail is given. (B) treats Clinton incidentally. (D) introduces rail, which the passage does not.'
  },
  {
    id: 'q-iseerc-fill-005',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 7,
    passage: 'When ground was first broken on the Erie Canal in 1817, critics dismissed the project as "Clinton\'s Ditch," a vanity scheme of New York governor DeWitt Clinton. Few engineers in North America had ever built locks, and the proposed route stretched 363 miles through forests and swamps. Yet by 1825 barges were moving freight from Buffalo to Albany at one-tenth the cost of overland hauling. Towns sprouted along the towpath, and New York City, connected by river to the canal\'s eastern terminus, swelled into the nation\'s busiest port. The mockery faded; engineers from across the continent traveled to study the locks they had once called impossible.',
    stem: 'The author\'s attitude toward the early critics of the canal is best described as',
    choices: [
      'gently ironic',
      'openly hostile',
      'fully sympathetic',
      'rigorously neutral'
    ],
    answer: 0,
    explanation: 'The author quotes the dismissive nickname "Clinton\'s Ditch" and notes "the mockery faded" once the locks succeeded — a quietly ironic framing. (A) fits. (B) overstates the calm tone. (C) sides with the critics, which the author does not. (D) misses the wry framing.'
  },
  {
    id: 'q-iseerc-fill-006',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 5,
    passage: 'When ground was first broken on the Erie Canal in 1817, critics dismissed the project as "Clinton\'s Ditch," a vanity scheme of New York governor DeWitt Clinton. Few engineers in North America had ever built locks, and the proposed route stretched 363 miles through forests and swamps. Yet by 1825 barges were moving freight from Buffalo to Albany at one-tenth the cost of overland hauling. Towns sprouted along the towpath, and New York City, connected by river to the canal\'s eastern terminus, swelled into the nation\'s busiest port. The mockery faded; engineers from across the continent traveled to study the locks they had once called impossible.',
    stem: 'The tone of the passage is best described as',
    choices: [
      'wistful and nostalgic',
      'admiring and matter-of-fact',
      'alarmed and urgent',
      'detached and indifferent'
    ],
    answer: 1,
    explanation: 'The author lays out facts in measured prose but clearly admires the achievement (the closing image of doubters becoming students). (B) fits. (A) implies longing not present. (C) overstates the calm prose. (D) ignores the evident admiration.'
  },

  // ===== PASSAGE 3: Science — Mycorrhizal networks (Q7-9) =====
  {
    id: 'q-iseerc-fill-007',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 6,
    passage: 'Beneath the floor of a temperate forest lies a network so vast that biologists sometimes describe it as a wood-wide web. Threadlike fungi called mycorrhizae wrap themselves around tree roots, exchanging mineral nutrients for the sugars trees produce through photosynthesis. Recent experiments using radioactive tracers suggest that these fungal threads can also shuttle carbon between trees of different species, sometimes from a healthy parent to a struggling sapling. Researchers caution that the metaphor of a "web" can be overdrawn — the system is not deliberate cooperation — but the data make clear that no tree in such a forest stands truly alone.',
    stem: 'The central idea of the passage is that',
    choices: [
      'mycorrhizal fungi are harmful parasites that drain trees of nutrients',
      'forest trees are connected through fungi in ways once underestimated',
      'radioactive tracers are the only reliable tool in modern forestry',
      'temperate forests produce more sugar than tropical ones'
    ],
    answer: 1,
    explanation: 'The passage describes the underground fungal network and the new evidence of nutrient exchange (lines 1-7). (B) captures this. (A) contradicts the mutualism described. (C) overstates one tool. (D) is unsupported.'
  },
  {
    id: 'q-iseerc-fill-008',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 4,
    passage: 'Beneath the floor of a temperate forest lies a network so vast that biologists sometimes describe it as a wood-wide web. Threadlike fungi called mycorrhizae wrap themselves around tree roots, exchanging mineral nutrients for the sugars trees produce through photosynthesis. Recent experiments using radioactive tracers suggest that these fungal threads can also shuttle carbon between trees of different species, sometimes from a healthy parent to a struggling sapling. Researchers caution that the metaphor of a "web" can be overdrawn — the system is not deliberate cooperation — but the data make clear that no tree in such a forest stands truly alone.',
    stem: 'According to the passage, mycorrhizal fungi receive which of the following from trees?',
    choices: [
      'sugars produced by photosynthesis',
      'mineral nutrients from the soil',
      'radioactive carbon tracers',
      'water drawn from underground streams'
    ],
    answer: 0,
    explanation: 'Lines 3-4 state the fungi exchange minerals "for the sugars trees produce through photosynthesis." (B) reverses the exchange. (C) is a research tool, not what trees give. (D) is not mentioned.'
  },
  {
    id: 'q-iseerc-fill-009',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 8,
    passage: 'Beneath the floor of a temperate forest lies a network so vast that biologists sometimes describe it as a wood-wide web. Threadlike fungi called mycorrhizae wrap themselves around tree roots, exchanging mineral nutrients for the sugars trees produce through photosynthesis. Recent experiments using radioactive tracers suggest that these fungal threads can also shuttle carbon between trees of different species, sometimes from a healthy parent to a struggling sapling. Researchers caution that the metaphor of a "web" can be overdrawn — the system is not deliberate cooperation — but the data make clear that no tree in such a forest stands truly alone.',
    stem: 'The author mentions that "the system is not deliberate cooperation" most likely in order to',
    choices: [
      'reject the findings of the radioactive tracer studies',
      'argue that fungi are unintelligent organisms',
      'qualify the metaphor and warn against overinterpretation',
      'introduce a new theory about plant communication'
    ],
    answer: 2,
    explanation: 'The phrase appears with "Researchers caution that the metaphor of a web can be overdrawn" (lines 7-8), tempering enthusiasm. (C) fits. (A) misreads — the data are accepted. (B) is too sweeping. (D) is not introduced.'
  },

  // ===== PASSAGE 4: Contemporary — Urban green roofs (Q10-12) =====
  {
    id: 'q-iseerc-fill-010',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 4,
    passage: 'Green roofs — flat building tops planted with shallow-rooted vegetation — have moved from architectural curiosity to practical infrastructure in many large cities. A layer of sedum or native grasses absorbs rainwater that would otherwise overwhelm storm drains, lowers cooling costs by shading the building beneath, and provides a small refuge for pollinators in neighborhoods otherwise paved over. Installation is not cheap, and not every building can bear the added weight. Still, several cities now offer tax incentives for green roofs, treating them less as aesthetic flourishes than as components of a working drainage and climate system.',
    stem: 'The passage is primarily about',
    choices: [
      'the historical origins of rooftop gardening',
      'the structural engineering required to support heavy buildings',
      'the practical benefits and adoption of green roofs in cities',
      'the decline of pollinator populations in rural areas'
    ],
    answer: 2,
    explanation: 'The passage lists benefits (drainage, cooling, pollinators) and notes growing municipal adoption (lines 5-9). (C) covers both. (A) is not the focus. (B) is mentioned only as a constraint. (D) shifts to rural settings the passage does not discuss.'
  },
  {
    id: 'q-iseerc-fill-011',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 5,
    passage: 'Green roofs — flat building tops planted with shallow-rooted vegetation — have moved from architectural curiosity to practical infrastructure in many large cities. A layer of sedum or native grasses absorbs rainwater that would otherwise overwhelm storm drains, lowers cooling costs by shading the building beneath, and provides a small refuge for pollinators in neighborhoods otherwise paved over. Installation is not cheap, and not every building can bear the added weight. Still, several cities now offer tax incentives for green roofs, treating them less as aesthetic flourishes than as components of a working drainage and climate system.',
    stem: 'As used in the passage, "flourishes" most nearly means',
    choices: [
      'thrives',
      'decorative additions',
      'musical phrases',
      'sudden movements'
    ],
    answer: 1,
    explanation: 'The contrast is "less as aesthetic flourishes than as components of a working system" — meaning ornaments versus functional parts. (B) fits. (A) confuses with the verb sense. (C) and (D) are valid dictionary senses but wrong for context.'
  },
  {
    id: 'q-iseerc-fill-012',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 6,
    passage: 'Green roofs — flat building tops planted with shallow-rooted vegetation — have moved from architectural curiosity to practical infrastructure in many large cities. A layer of sedum or native grasses absorbs rainwater that would otherwise overwhelm storm drains, lowers cooling costs by shading the building beneath, and provides a small refuge for pollinators in neighborhoods otherwise paved over. Installation is not cheap, and not every building can bear the added weight. Still, several cities now offer tax incentives for green roofs, treating them less as aesthetic flourishes than as components of a working drainage and climate system.',
    stem: 'The passage suggests that the cities offering tax incentives view green roofs primarily as',
    choices: [
      'functional elements of urban infrastructure',
      'experimental art installations',
      'symbols of municipal prestige',
      'temporary measures until storm drains are upgraded'
    ],
    answer: 0,
    explanation: 'The closing lines say cities treat them "less as aesthetic flourishes than as components of a working drainage and climate system." (A) fits. (B) and (C) describe the older view. (D) is unsupported.'
  },

  // ===== PASSAGE 5: Humanities — Glenn Gould and recording (Q13-15) =====
  {
    id: 'q-iseerc-fill-013',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 7,
    passage: 'In 1964, the pianist Glenn Gould stunned the music world by abandoning the concert stage at age thirty-one. He preferred the recording studio, where he could splice together the finest moments from many takes and present, he said, the truest version of a piece. Critics accused him of producing performances no human could give live. Gould was unbothered. The concert hall, he argued, was a holdover from an age before microphones, when listeners had no other way to hear music. Recording, in his view, was not a copy of performance but a separate art with its own rules — closer to filmmaking than to theater.',
    stem: 'It can be inferred from the passage that Gould believed live concerts were',
    choices: [
      'a tradition kept alive mainly by technological limits of an earlier era',
      'the only authentic way to experience classical music',
      'inferior whenever performed by pianists under thirty',
      'too commercially profitable to be replaced by studio recording'
    ],
    answer: 0,
    explanation: 'Lines 6-7: the concert hall was "a holdover from an age before microphones, when listeners had no other way to hear music." (A) captures the historical-contingency argument. (B) reverses his view. (C) misreads the age detail (his own retirement). (D) introduces commerce, which the passage does not.'
  },
  {
    id: 'q-iseerc-fill-014',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 4,
    passage: 'In 1964, the pianist Glenn Gould stunned the music world by abandoning the concert stage at age thirty-one. He preferred the recording studio, where he could splice together the finest moments from many takes and present, he said, the truest version of a piece. Critics accused him of producing performances no human could give live. Gould was unbothered. The concert hall, he argued, was a holdover from an age before microphones, when listeners had no other way to hear music. Recording, in his view, was not a copy of performance but a separate art with its own rules — closer to filmmaking than to theater.',
    stem: 'According to the passage, Gould compared recording to',
    choices: [
      'painting',
      'theater',
      'filmmaking',
      'sculpture'
    ],
    answer: 2,
    explanation: 'The final clause: recording was "closer to filmmaking than to theater." (C) is correct. (B) is the contrast Gould rejected. (A) and (D) are not mentioned.'
  },
  {
    id: 'q-iseerc-fill-015',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 7,
    passage: 'In 1964, the pianist Glenn Gould stunned the music world by abandoning the concert stage at age thirty-one. He preferred the recording studio, where he could splice together the finest moments from many takes and present, he said, the truest version of a piece. Critics accused him of producing performances no human could give live. Gould was unbothered. The concert hall, he argued, was a holdover from an age before microphones, when listeners had no other way to hear music. Recording, in his view, was not a copy of performance but a separate art with its own rules — closer to filmmaking than to theater.',
    stem: 'The author\'s primary purpose is to',
    choices: [
      'convince readers that live performance is obsolete',
      'review the technical equipment used in 1960s studios',
      'criticize Gould for his retirement from the stage',
      'present a pianist\'s unconventional view of recorded music'
    ],
    answer: 3,
    explanation: 'The passage explains Gould\'s reasoning without endorsing or attacking it. (D) fits. (A) overstates the author\'s stance. (B) is not the focus. (C) misreads — the tone is neutral, not critical.'
  },

  // ===== PASSAGE 6: History — Women in early radio (Q16-18) =====
  {
    id: 'q-iseerc-fill-016',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 7,
    passage: 'In the first decade of commercial radio, broadcasters in the United States debated whether women should read the news. Several station managers argued that female voices, pitched higher than men\'s, would not carry well over the primitive transmitters of the 1920s. The objection was framed as technical, but listening tests soon undermined it: audiences understood female announcers as easily as male ones. The reluctance to hire women persisted nonetheless, and was usually justified on grounds of "authority" rather than acoustics. Only during the labor shortages of the Second World War did women regularly read national news, and many of those positions vanished again when peace returned.',
    stem: 'The passage is mainly concerned with',
    choices: [
      'the engineering of early radio transmitters',
      'how technical objections masked other reasons for excluding women from on-air news roles',
      'the contributions of women to wartime journalism',
      'the rise and fall of commercial radio in the United States'
    ],
    answer: 1,
    explanation: 'The passage sets up a "technical" objection (lines 2-4), refutes it with listening tests, then notes the exclusion continued under a different rationale (lines 5-7). (B) captures this arc. (A) is a narrow detail. (C) is part of one example. (D) overgeneralizes.'
  },
  {
    id: 'q-iseerc-fill-017',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 4,
    passage: 'In the first decade of commercial radio, broadcasters in the United States debated whether women should read the news. Several station managers argued that female voices, pitched higher than men\'s, would not carry well over the primitive transmitters of the 1920s. The objection was framed as technical, but listening tests soon undermined it: audiences understood female announcers as easily as male ones. The reluctance to hire women persisted nonetheless, and was usually justified on grounds of "authority" rather than acoustics. Only during the labor shortages of the Second World War did women regularly read national news, and many of those positions vanished again when peace returned.',
    stem: 'The passage states that listening tests in the 1920s showed that',
    choices: [
      'female voices carried less clearly than male voices',
      'station managers preferred lower-pitched voices',
      'most listeners could not distinguish male from female voices',
      'audiences could understand female announcers as well as male ones'
    ],
    answer: 3,
    explanation: 'Lines 4-5 state listening tests undermined the objection: "audiences understood female announcers as easily as male ones." (D) is correct. (A) restates the claim the tests refuted. (B) and (C) are not what the tests measured.'
  },
  {
    id: 'q-iseerc-fill-018',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 7,
    passage: 'In the first decade of commercial radio, broadcasters in the United States debated whether women should read the news. Several station managers argued that female voices, pitched higher than men\'s, would not carry well over the primitive transmitters of the 1920s. The objection was framed as technical, but listening tests soon undermined it: audiences understood female announcers as easily as male ones. The reluctance to hire women persisted nonetheless, and was usually justified on grounds of "authority" rather than acoustics. Only during the labor shortages of the Second World War did women regularly read national news, and many of those positions vanished again when peace returned.',
    stem: 'The author\'s tone in describing the "authority" justification is best described as',
    choices: [
      'enthusiastic',
      'apologetic',
      'skeptical',
      'reverent'
    ],
    answer: 2,
    explanation: 'The author places "authority" in quotation marks and immediately notes the underlying reluctance persisted — signaling doubt. (C) fits. (A) and (D) imply approval. (B) implies regret on the author\'s behalf, which the neutral prose does not show.'
  },

  // ===== PASSAGE 7: Science — Octopus camouflage (Q19-21) =====
  {
    id: 'q-iseerc-fill-019',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 4,
    passage: 'The common octopus changes color in less than a second. Beneath its skin lie thousands of tiny sacs called chromatophores, each filled with a different pigment and surrounded by muscles. When the muscles contract, the sac stretches into a flat disk and its color appears on the surface; when they relax, the color hides. What makes the trick remarkable is that octopuses are believed to be colorblind. Researchers suspect the animals "see" color through light-sensitive cells in their skin, allowing the body to match its surroundings without the brain ever forming a colored image of them.',
    stem: 'According to the passage, when the muscles around a chromatophore contract, the sac',
    choices: [
      'turns invisible',
      'stretches into a flat disk',
      'releases pigment into the bloodstream',
      'shrinks below the skin surface'
    ],
    answer: 1,
    explanation: 'Lines 3-4: "When the muscles contract, the sac stretches into a flat disk and its color appears on the surface." (B) is correct. (A) describes the relaxed state. (C) is unsupported. (D) reverses the mechanism.'
  },
  {
    id: 'q-iseerc-fill-020',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 7,
    passage: 'The common octopus changes color in less than a second. Beneath its skin lie thousands of tiny sacs called chromatophores, each filled with a different pigment and surrounded by muscles. When the muscles contract, the sac stretches into a flat disk and its color appears on the surface; when they relax, the color hides. What makes the trick remarkable is that octopuses are believed to be colorblind. Researchers suspect the animals "see" color through light-sensitive cells in their skin, allowing the body to match its surroundings without the brain ever forming a colored image of them.',
    stem: 'The passage suggests that the octopus\'s ability to camouflage is unusual mainly because',
    choices: [
      'most camouflaging animals rely on color vision in their eyes',
      'most marine animals lack chromatophores',
      'no other animal can change color this quickly',
      'octopuses live in environments without color'
    ],
    answer: 0,
    explanation: 'The passage calls the trick remarkable because octopuses are colorblind yet match their surroundings (lines 5-7), implying camouflage usually depends on seeing color. (A) fits. (B) is not stated. (C) and (D) are unsupported.'
  },
  {
    id: 'q-iseerc-fill-021',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 6,
    passage: 'The common octopus changes color in less than a second. Beneath its skin lie thousands of tiny sacs called chromatophores, each filled with a different pigment and surrounded by muscles. When the muscles contract, the sac stretches into a flat disk and its color appears on the surface; when they relax, the color hides. What makes the trick remarkable is that octopuses are believed to be colorblind. Researchers suspect the animals "see" color through light-sensitive cells in their skin, allowing the body to match its surroundings without the brain ever forming a colored image of them.',
    stem: 'As used in the passage, "trick" most nearly means',
    choices: [
      'deceptive scheme',
      'illusion meant to fool',
      'remarkable feat',
      'magical ritual'
    ],
    answer: 2,
    explanation: 'The passage calls the rapid color change a "trick" in the sense of an impressive accomplishment. (C) fits. (A) and (B) imply intent to deceive humans. (D) is metaphorical but not the meaning here.'
  },

  // ===== PASSAGE 8: Contemporary — Public libraries reinvented (Q22-24) =====
  {
    id: 'q-iseerc-fill-022',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 5,
    passage: 'Visit a city library today and you may find rows of three-dimensional printers humming beside the reference desk, sewing machines available by the hour, and a recording booth tucked behind the periodicals. Librarians, once the keepers of fragile books, increasingly serve as guides to expensive tools that few households could afford to own. The change has not been universally welcomed: some patrons miss the hush of older reading rooms. Yet circulation numbers, which had been falling for years, have steadied since the new programs began. The library, it seems, has redefined what it lends — but not its central promise of free access.',
    stem: 'The author\'s attitude toward the changes at city libraries is best described as',
    choices: [
      'sharply critical',
      'cautiously approving',
      'mournfully nostalgic',
      'utterly indifferent'
    ],
    answer: 1,
    explanation: 'The author notes both complaints and benefits, and concludes the library has "redefined what it lends — but not its central promise" — a quietly favorable take. (B) fits. (A) ignores the favorable closing. (C) sides with the patrons who miss old reading rooms. (D) misreads the engaged prose.'
  },
  {
    id: 'q-iseerc-fill-023',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 6,
    passage: 'Visit a city library today and you may find rows of three-dimensional printers humming beside the reference desk, sewing machines available by the hour, and a recording booth tucked behind the periodicals. Librarians, once the keepers of fragile books, increasingly serve as guides to expensive tools that few households could afford to own. The change has not been universally welcomed: some patrons miss the hush of older reading rooms. Yet circulation numbers, which had been falling for years, have steadied since the new programs began. The library, it seems, has redefined what it lends — but not its central promise of free access.',
    stem: 'The author mentions that "circulation numbers... have steadied" most likely in order to',
    choices: [
      'criticize libraries for tracking patrons\' borrowing habits',
      'argue that older reading rooms were more popular',
      'prove that three-dimensional printing is profitable',
      'suggest that the new programs have helped reverse a downward trend'
    ],
    answer: 3,
    explanation: 'The detail follows mention of falling numbers, presenting the steadying as evidence the new model is working. (D) fits. (A) introduces a critique not in the text. (B) reverses the implication. (C) confuses programs with profit.'
  },
  {
    id: 'q-iseerc-fill-024',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 9,
    passage: 'Visit a city library today and you may find rows of three-dimensional printers humming beside the reference desk, sewing machines available by the hour, and a recording booth tucked behind the periodicals. Librarians, once the keepers of fragile books, increasingly serve as guides to expensive tools that few households could afford to own. The change has not been universally welcomed: some patrons miss the hush of older reading rooms. Yet circulation numbers, which had been falling for years, have steadied since the new programs began. The library, it seems, has redefined what it lends — but not its central promise of free access.',
    stem: 'As used in the passage, "promise" most nearly means',
    choices: [
      'a sworn legal pledge',
      'an expectation of future success',
      'a publicly announced campaign',
      'a fundamental commitment'
    ],
    answer: 3,
    explanation: 'The library\'s "central promise of free access" refers to its core, defining commitment. (D) fits. (A) is too narrowly legal. (B) is the "showing promise" sense. (C) is a different dictionary use.'
  },

  // ===== PASSAGE 9: Humanities — Haiku in translation (Q25-27) =====
  {
    id: 'q-iseerc-fill-025',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 8,
    passage: 'Translating haiku into English poses a peculiar problem. The traditional Japanese form is built on syllable groups of five, seven, and five — but the Japanese unit, the on, is not equivalent to an English syllable. An English translator who slavishly fills seventeen syllables often pads the poem with words the original never contained. Some translators discard the count entirely, aiming instead to preserve the haiku\'s sudden turn of perception. Others split the difference, accepting an extra syllable here, dropping one there. None of these solutions is wholly satisfying, which is perhaps why the same brief poem can yield half a dozen translations, each defensible on its own terms.',
    stem: 'The passage suggests that a translator who insists on exactly seventeen English syllables risks',
    choices: [
      'omitting essential images from the original',
      'introducing words not present in the original',
      'rendering the poem in prose rather than verse',
      'producing a poem longer than the original by several lines'
    ],
    answer: 1,
    explanation: 'Lines 4-5: such a translator "often pads the poem with words the original never contained." (B) restates this. (A) is the opposite risk (omission). (C) and (D) are not raised.'
  },
  {
    id: 'q-iseerc-fill-026',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 6,
    passage: 'Translating haiku into English poses a peculiar problem. The traditional Japanese form is built on syllable groups of five, seven, and five — but the Japanese unit, the on, is not equivalent to an English syllable. An English translator who slavishly fills seventeen syllables often pads the poem with words the original never contained. Some translators discard the count entirely, aiming instead to preserve the haiku\'s sudden turn of perception. Others split the difference, accepting an extra syllable here, dropping one there. None of these solutions is wholly satisfying, which is perhaps why the same brief poem can yield half a dozen translations, each defensible on its own terms.',
    stem: 'As used in the passage, "slavishly" most nearly means',
    choices: [
      'cruelly',
      'wearily',
      'too rigidly',
      'reluctantly'
    ],
    answer: 2,
    explanation: 'The translator who "slavishly fills seventeen syllables" follows the rule too strictly, padding the poem. (C) fits. (A) misreads the literal sense. (B) and (D) do not match the context.'
  },
  {
    id: 'q-iseerc-fill-027',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 6,
    passage: 'Translating haiku into English poses a peculiar problem. The traditional Japanese form is built on syllable groups of five, seven, and five — but the Japanese unit, the on, is not equivalent to an English syllable. An English translator who slavishly fills seventeen syllables often pads the poem with words the original never contained. Some translators discard the count entirely, aiming instead to preserve the haiku\'s sudden turn of perception. Others split the difference, accepting an extra syllable here, dropping one there. None of these solutions is wholly satisfying, which is perhaps why the same brief poem can yield half a dozen translations, each defensible on its own terms.',
    stem: 'The author\'s tone toward the various translation approaches is best described as',
    choices: [
      'dismissive',
      'celebratory',
      'mocking',
      'evenhanded'
    ],
    answer: 3,
    explanation: 'The author lays out three approaches and concludes none is wholly satisfying yet each is defensible — fair-minded treatment. (D) fits. (A) and (C) overstate criticism. (B) overstates praise.'
  },

  // ===== PASSAGE 10: History — Chinese paper money (Q28-30) =====
  {
    id: 'q-iseerc-fill-028',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 5,
    passage: 'Long before European banks issued paper money, merchants in Sichuan, China, were using it. By the early eleventh century, the bronze coins required for routine trade in the region had grown so heavy that a single transaction might demand several porters. To ease the burden, private merchants began issuing paper certificates redeemable for stored coin. The certificates passed from hand to hand, and the imperial government, recognizing both the convenience and the danger of unregulated issue, eventually took over the practice. The notes that resulted, called jiaozi, are widely regarded as the earliest official paper currency, predating European equivalents by more than five hundred years.',
    stem: 'According to the passage, the original problem that paper certificates were created to solve was',
    choices: [
      'the shortage of bronze in the region',
      'the difficulty of transporting heavy coins',
      'the unwillingness of merchants to trust the government',
      'the high cost of European banking services'
    ],
    answer: 1,
    explanation: 'Lines 2-4: the bronze coins had grown so heavy that "a single transaction might demand several porters." (B) is correct. (A) is the opposite — coins were plentiful but heavy. (C) and (D) are not stated.'
  },
  {
    id: 'q-iseerc-fill-029',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 7,
    passage: 'Long before European banks issued paper money, merchants in Sichuan, China, were using it. By the early eleventh century, the bronze coins required for routine trade in the region had grown so heavy that a single transaction might demand several porters. To ease the burden, private merchants began issuing paper certificates redeemable for stored coin. The certificates passed from hand to hand, and the imperial government, recognizing both the convenience and the danger of unregulated issue, eventually took over the practice. The notes that resulted, called jiaozi, are widely regarded as the earliest official paper currency, predating European equivalents by more than five hundred years.',
    stem: 'The passage suggests that the imperial government took over the issue of paper notes because',
    choices: [
      'merchants asked for state protection from theft',
      'private certificates were too heavy to transport',
      'unregulated paper issue could create economic risks',
      'bronze coins had become entirely worthless'
    ],
    answer: 2,
    explanation: 'Lines 5-7 say the government recognized "both the convenience and the danger of unregulated issue." (C) names that danger. (A) and (D) are unsupported. (B) misreads the entire point of switching to paper.'
  },
  {
    id: 'q-iseerc-fill-030',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 5,
    passage: 'Long before European banks issued paper money, merchants in Sichuan, China, were using it. By the early eleventh century, the bronze coins required for routine trade in the region had grown so heavy that a single transaction might demand several porters. To ease the burden, private merchants began issuing paper certificates redeemable for stored coin. The certificates passed from hand to hand, and the imperial government, recognizing both the convenience and the danger of unregulated issue, eventually took over the practice. The notes that resulted, called jiaozi, are widely regarded as the earliest official paper currency, predating European equivalents by more than five hundred years.',
    stem: 'The passage is best described as',
    choices: [
      'an account of how a practical solution evolved into the first official paper currency',
      'a comparison between Chinese and European banking systems',
      'an argument that bronze coinage should be abandoned',
      'a biography of the merchants of Sichuan'
    ],
    answer: 0,
    explanation: 'The passage traces the development from heavy coins to merchant certificates to government-issued jiaozi. (A) fits. (B) is one closing comparison. (C) is not argued. (D) is too narrow.'
  },

  // ===== PASSAGE 11: Science — Light pollution and astronomy (Q31-33) =====
  {
    id: 'q-iseerc-fill-031',
    section: 'reading-comprehension',
    topic: 'main-idea',
    difficulty: 6,
    passage: 'A century ago, an observer in almost any town could step outside on a clear night and trace the band of the Milky Way overhead. Today the same observer in most populated areas sees only a handful of bright stars against a hazy gray sky. The cause is not pollution in the chemical sense but light itself: streetlamps, billboards, and parking lots scatter their glow into the atmosphere, washing out fainter sources. Astronomers have responded by retreating to mountaintops in remote deserts, where dry air and distance from cities preserve dark skies. Even there, the steady spread of satellite constellations is beginning to draw bright streaks across long-exposure photographs.',
    stem: 'The passage is mainly about',
    choices: [
      'how light pollution and other forms of brightness have eroded the visibility of the night sky',
      'how astronomers choose locations for their observatories',
      'the history of streetlamp design',
      'the chemical pollutants released by parking lots'
    ],
    answer: 0,
    explanation: 'The passage describes how city light dims the sky and how even remote observatories now face satellite trails (lines 3-9). (A) fits. (B) is one detail. (C) and (D) are not the focus.'
  },
  {
    id: 'q-iseerc-fill-032',
    section: 'reading-comprehension',
    topic: 'detail',
    difficulty: 4,
    passage: 'A century ago, an observer in almost any town could step outside on a clear night and trace the band of the Milky Way overhead. Today the same observer in most populated areas sees only a handful of bright stars against a hazy gray sky. The cause is not pollution in the chemical sense but light itself: streetlamps, billboards, and parking lots scatter their glow into the atmosphere, washing out fainter sources. Astronomers have responded by retreating to mountaintops in remote deserts, where dry air and distance from cities preserve dark skies. Even there, the steady spread of satellite constellations is beginning to draw bright streaks across long-exposure photographs.',
    stem: 'The passage states that astronomers have built observatories in remote deserts because such places offer',
    choices: [
      'cheaper land and lower taxes',
      'easier access to satellites',
      'milder weather year-round',
      'dry air and distance from city lights'
    ],
    answer: 3,
    explanation: 'Lines 6-7: "mountaintops in remote deserts, where dry air and distance from cities preserve dark skies." (D) is direct. (A) and (C) are not mentioned. (B) is the opposite — satellites are a problem there.'
  },
  {
    id: 'q-iseerc-fill-033',
    section: 'reading-comprehension',
    topic: 'tone',
    difficulty: 6,
    passage: 'A century ago, an observer in almost any town could step outside on a clear night and trace the band of the Milky Way overhead. Today the same observer in most populated areas sees only a handful of bright stars against a hazy gray sky. The cause is not pollution in the chemical sense but light itself: streetlamps, billboards, and parking lots scatter their glow into the atmosphere, washing out fainter sources. Astronomers have responded by retreating to mountaintops in remote deserts, where dry air and distance from cities preserve dark skies. Even there, the steady spread of satellite constellations is beginning to draw bright streaks across long-exposure photographs.',
    stem: 'The tone of the passage is best described as',
    choices: [
      'cheerful and excited',
      'concerned but measured',
      'angry and accusing',
      'amused and playful'
    ],
    answer: 1,
    explanation: 'The author describes loss (Milky Way fading, satellite streaks) without rhetorical heat — concerned but restrained. (B) fits. (A) and (D) miss the loss being described. (C) overstates the calm prose.'
  },

  // ===== PASSAGE 12: Contemporary — Year-round school calendars (Q34-36) =====
  {
    id: 'q-iseerc-fill-034',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 7,
    passage: 'Several school districts have experimented with year-round calendars, replacing the long summer break with shorter, more frequent vacations. Supporters point to studies suggesting that students forget less material when time away from class is brief. Opponents counter that the change disrupts family schedules and complicates the staffing of summer camps and seasonal jobs. The evidence on academic gains is mixed: some studies find modest improvements, others none at all. What seems clearer is that the calendar suits some communities — particularly those serving students who lack enrichment opportunities during long breaks — better than others. No single schedule appears optimal for every district.',
    stem: 'The author\'s primary purpose is to',
    choices: [
      'present a balanced overview of an ongoing educational debate',
      'criticize school districts for experimenting with student schedules',
      'argue that year-round calendars should be adopted everywhere',
      'recommend the elimination of summer vacations entirely'
    ],
    answer: 0,
    explanation: 'The passage gives both sides and concludes "no single schedule appears optimal for every district" — balanced exposition. (A) fits. (C) and (D) take a position the passage avoids. (B) misreads the neutral tone.'
  },
  {
    id: 'q-iseerc-fill-035',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 4,
    passage: 'Several school districts have experimented with year-round calendars, replacing the long summer break with shorter, more frequent vacations. Supporters point to studies suggesting that students forget less material when time away from class is brief. Opponents counter that the change disrupts family schedules and complicates the staffing of summer camps and seasonal jobs. The evidence on academic gains is mixed: some studies find modest improvements, others none at all. What seems clearer is that the calendar suits some communities — particularly those serving students who lack enrichment opportunities during long breaks — better than others. No single schedule appears optimal for every district.',
    stem: 'According to the passage, supporters of year-round calendars argue that',
    choices: [
      'students enjoy shorter vacations more than long ones',
      'students forget less material when time away from class is shorter',
      'family schedules are easier to plan around frequent breaks',
      'summer camps benefit from a continuous school year'
    ],
    answer: 1,
    explanation: 'Lines 3-4: supporters cite studies that "students forget less material when time away from class is brief." (B) is direct. (A) is unsupported. (C) is the opponents\' concern. (D) reverses the disruption noted.'
  },
  {
    id: 'q-iseerc-fill-036',
    section: 'reading-comprehension',
    topic: 'inference',
    difficulty: 9,
    passage: 'Several school districts have experimented with year-round calendars, replacing the long summer break with shorter, more frequent vacations. Supporters point to studies suggesting that students forget less material when time away from class is brief. Opponents counter that the change disrupts family schedules and complicates the staffing of summer camps and seasonal jobs. The evidence on academic gains is mixed: some studies find modest improvements, others none at all. What seems clearer is that the calendar suits some communities — particularly those serving students who lack enrichment opportunities during long breaks — better than others. No single schedule appears optimal for every district.',
    stem: 'The passage implies that long summer breaks may be most harmful to students who',
    choices: [
      'live near year-round schools',
      'attend many enrichment programs over the summer',
      'have few opportunities for enrichment during the break',
      'work seasonal jobs during the summer months'
    ],
    answer: 2,
    explanation: 'Lines 7-8: the year-round calendar especially helps "students who lack enrichment opportunities during long breaks." Therefore long breaks most hurt those students. (C) fits. (A), (B), and (D) reverse or miss the implication.'
  },

  // ===== PASSAGE 13: Humanities — Found-object sculpture (Q37-38) =====
  {
    id: 'q-iseerc-fill-037',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 5,
    passage: 'When a sculptor mounts a discarded bicycle wheel on a wooden stool and labels it art, viewers often feel cheated. The materials are ordinary; no chisel has touched them. Defenders of such "found-object" sculpture argue that the artist\'s contribution lies not in carving but in selection — in seeing significance where others see junk. The argument can persuade or irritate, but it cannot easily be dismissed. After all, every photographer also chooses rather than makes a subject, and few would deny that a photograph can be art. The sculptor of found objects merely extends the same principle into three dimensions.',
    stem: 'As used in the passage, "selection" most nearly means',
    choices: [
      'voting',
      'careful choosing',
      'random sampling',
      'editing for length'
    ],
    answer: 1,
    explanation: 'The artist\'s contribution lies "in selection — in seeing significance where others see junk" — that is, deliberate choosing. (B) fits. (A) is unrelated. (C) implies no judgment. (D) refers to text editing.'
  },
  {
    id: 'q-iseerc-fill-038',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 7,
    passage: 'When a sculptor mounts a discarded bicycle wheel on a wooden stool and labels it art, viewers often feel cheated. The materials are ordinary; no chisel has touched them. Defenders of such "found-object" sculpture argue that the artist\'s contribution lies not in carving but in selection — in seeing significance where others see junk. The argument can persuade or irritate, but it cannot easily be dismissed. After all, every photographer also chooses rather than makes a subject, and few would deny that a photograph can be art. The sculptor of found objects merely extends the same principle into three dimensions.',
    stem: 'The author mentions photography most likely in order to',
    choices: [
      'show that photography is a more legitimate art than sculpture',
      'support the defenders\' argument by analogy',
      'criticize viewers who reject found-object sculpture',
      'introduce a new art form for discussion'
    ],
    answer: 1,
    explanation: 'The author cites photography as a parallel — also based on choosing rather than making — to back the defenders\' position. (B) fits. (A) is not the comparison. (C) misreads the tone. (D) is incidental.'
  },

  // ===== PASSAGE 14: Science — Coral bleaching (Q39-40) =====
  {
    id: 'q-iseerc-fill-039',
    section: 'reading-comprehension',
    topic: 'vocab-in-context',
    difficulty: 7,
    passage: 'A coral may look like a single organism, but each polyp houses tiny algae that supply most of the coral\'s food in exchange for shelter. When water temperatures climb beyond a narrow range, the relationship breaks down: the coral expels the algae and turns ghostly white, a phenomenon called bleaching. A bleached coral is not yet dead, and if cooler water returns within weeks, the algae can recolonize. But repeated bleaching events drain the coral of reserves, and a reef that bleaches every few years rarely recovers its former diversity. The pattern is now common enough that some scientists describe certain reefs as already inhabiting a different biological era.',
    stem: 'As used in the passage, "expels" most nearly means',
    choices: [
      'invites in',
      'absorbs',
      'replicates',
      'casts out'
    ],
    answer: 3,
    explanation: 'The coral "expels the algae and turns ghostly white" — meaning it ejects them. (D) fits. (A) and (B) are opposites. (C) is unrelated.'
  },
  {
    id: 'q-iseerc-fill-040',
    section: 'reading-comprehension',
    topic: 'purpose',
    difficulty: 9,
    passage: 'A coral may look like a single organism, but each polyp houses tiny algae that supply most of the coral\'s food in exchange for shelter. When water temperatures climb beyond a narrow range, the relationship breaks down: the coral expels the algae and turns ghostly white, a phenomenon called bleaching. A bleached coral is not yet dead, and if cooler water returns within weeks, the algae can recolonize. But repeated bleaching events drain the coral of reserves, and a reef that bleaches every few years rarely recovers its former diversity. The pattern is now common enough that some scientists describe certain reefs as already inhabiting a different biological era.',
    stem: 'The closing sentence about reefs "inhabiting a different biological era" most likely serves to',
    choices: [
      'argue that bleached reefs cannot be studied scientifically',
      'predict the rapid recovery of coral populations',
      'recommend specific policies for ocean management',
      'suggest that the changes to reefs are now severe enough to mark a new ecological state'
    ],
    answer: 3,
    explanation: 'After describing how repeated bleaching prevents recovery, the author notes scientists see this as a transition into a new state. (D) fits. (A) and (B) are unsupported. (C) is not what the passage does.'
  }
]);
