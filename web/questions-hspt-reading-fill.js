/**
 * HSPT Reading — fill batch.
 * testType: 'HSPT', section: 'reading'.
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';
window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ===== Passage 1: Fiction — Maya and the bus (Q1-3) =====
  {
    id: 'q-hsptrd-fill-001',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 480,
    passage: 'Maya pressed her forehead against the cold bus window and watched her old neighborhood slide past. The bakery where she had spent every Saturday morning was now boarded up, its bright awning faded to gray. The park where she once chased pigeons looked smaller, almost shy. She had been gone only two years, but the streets seemed to belong to someone else now. When the bus stopped at the corner of Elm and Vine, Maya almost did not get off. Then she saw Mrs. Pham waving from the porch, and her feet remembered the way home before her mind did.',
    stem: 'What is the main idea of the passage?',
    choices: [
      'Maya returns to a neighborhood that feels both familiar and changed.',
      'Maya is afraid of riding the bus alone.',
      'Mrs. Pham has been waiting on the porch for two years.',
      'The bakery in Maya\'s neighborhood has gone out of business.'
    ],
    answer: 0,
    explanation: 'The passage centers on Maya seeing changes ("boarded up," "smaller") yet still being recognized by Mrs. Pham — familiar and changed. (B) misreads her hesitation as fear of buses. (C) exaggerates one detail. (D) is only one example, not the main idea.'
  },
  {
    id: 'q-hsptrd-fill-002',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 560,
    passage: 'Maya pressed her forehead against the cold bus window and watched her old neighborhood slide past. The bakery where she had spent every Saturday morning was now boarded up, its bright awning faded to gray. The park where she once chased pigeons looked smaller, almost shy. She had been gone only two years, but the streets seemed to belong to someone else now. When the bus stopped at the corner of Elm and Vine, Maya almost did not get off. Then she saw Mrs. Pham waving from the porch, and her feet remembered the way home before her mind did.',
    stem: 'In the passage, the word "shy" most nearly means',
    choices: [
      'frightened of strangers.',
      'hidden by trees.',
      'unable to speak.',
      'modest or smaller than expected.'
    ],
    answer: 3,
    explanation: 'The park "looked smaller, almost shy" pairs "shy" with "smaller" — meaning unassuming or reduced. (A) and (C) treat "shy" only as a personality trait. (B) invents a detail.'
  },
  {
    id: 'q-hsptrd-fill-003',
    section: 'reading',
    topic: 'inference',
    difficulty: 660,
    passage: 'Maya pressed her forehead against the cold bus window and watched her old neighborhood slide past. The bakery where she had spent every Saturday morning was now boarded up, its bright awning faded to gray. The park where she once chased pigeons looked smaller, almost shy. She had been gone only two years, but the streets seemed to belong to someone else now. When the bus stopped at the corner of Elm and Vine, Maya almost did not get off. Then she saw Mrs. Pham waving from the porch, and her feet remembered the way home before her mind did.',
    stem: 'The final sentence suggests that Maya',
    choices: [
      'has forgotten how to walk after the bus ride.',
      'feels physically uncomfortable in the cold.',
      'still has a bond with the neighborhood that is deeper than memory.',
      'is angry at Mrs. Pham for waving at her.'
    ],
    answer: 2,
    explanation: '"Her feet remembered the way home before her mind did" implies an instinctive, deep connection. (A) reads literally. (B) and (D) are unsupported.'
  },

  // ===== Passage 2: History — Roman roads (Q4-6) =====
  {
    id: 'q-hsptrd-fill-004',
    section: 'reading',
    topic: 'detail',
    difficulty: 470,
    passage: 'The Romans built more than 50,000 miles of paved roads across their empire. These roads were not just for soldiers, although armies could march along them at impressive speed. Merchants used them to move grain, oil, and cloth between distant cities. Messengers carried letters from one province to another in days rather than weeks. Engineers planned each road in nearly straight lines, cutting through forests and bridging rivers. Many of those routes still lie beneath modern European highways. The roads outlasted the empire itself, proving that good infrastructure can shape a region long after its builders are gone.',
    stem: 'According to the passage, who used the Roman roads?',
    choices: [
      'Only soldiers in the Roman army.',
      'Soldiers, merchants, and messengers.',
      'Only farmers and grain merchants.',
      'Mainly tourists from other empires.'
    ],
    answer: 1,
    explanation: 'The passage names armies, merchants, and messengers. (A) and (C) drop groups the passage names. (D) is invented.'
  },
  {
    id: 'q-hsptrd-fill-005',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 580,
    passage: 'The Romans built more than 50,000 miles of paved roads across their empire. These roads were not just for soldiers, although armies could march along them at impressive speed. Merchants used them to move grain, oil, and cloth between distant cities. Messengers carried letters from one province to another in days rather than weeks. Engineers planned each road in nearly straight lines, cutting through forests and bridging rivers. Many of those routes still lie beneath modern European highways. The roads outlasted the empire itself, proving that good infrastructure can shape a region long after its builders are gone.',
    stem: 'The main idea of the passage is that',
    choices: [
      'Roman engineers preferred straight lines to curves.',
      'modern highways are mostly built on top of older roads.',
      'Roman roads served many purposes and left a lasting impact.',
      'the Roman army moved more quickly than its enemies.'
    ],
    answer: 2,
    explanation: 'The passage describes multiple uses and the long legacy. (A), (B), and (D) each take one supporting detail.'
  },
  {
    id: 'q-hsptrd-fill-006',
    section: 'reading',
    topic: 'purpose',
    difficulty: 670,
    passage: 'The Romans built more than 50,000 miles of paved roads across their empire. These roads were not just for soldiers, although armies could march along them at impressive speed. Merchants used them to move grain, oil, and cloth between distant cities. Messengers carried letters from one province to another in days rather than weeks. Engineers planned each road in nearly straight lines, cutting through forests and bridging rivers. Many of those routes still lie beneath modern European highways. The roads outlasted the empire itself, proving that good infrastructure can shape a region long after its builders are gone.',
    stem: 'The author\'s primary purpose in the final sentence is to',
    choices: [
      'criticize the Roman empire for collapsing.',
      'draw a broader lesson about the value of well-built infrastructure.',
      'compare Roman engineers to modern highway designers.',
      'warn readers that ancient roads can be dangerous.'
    ],
    answer: 1,
    explanation: 'The closing sentence generalizes from Rome to "good infrastructure" lasting beyond its builders. (A) misreads tone. (C) and (D) are invented.'
  },

  // ===== Passage 3: Science — Octopus camouflage (Q7-9) =====
  {
    id: 'q-hsptrd-fill-007',
    section: 'reading',
    topic: 'detail',
    difficulty: 490,
    passage: 'An octopus can change the color and texture of its skin in less than a second. Tiny sacs called chromatophores hold red, yellow, and brown pigments. When muscles around each sac stretch it open, the color spreads across the skin. Special bumps called papillae can rise or flatten, letting the octopus mimic the rough surface of a coral or the smooth side of a stone. Scientists are still puzzled by one fact: most octopuses are colorblind. Researchers think the animals may sense light through their skin, which would let them match a background they cannot actually see.',
    stem: 'According to the passage, chromatophores hold pigments of which colors?',
    choices: [
      'Red, yellow, and brown.',
      'Blue, green, and purple.',
      'Black, white, and gray.',
      'Only red and yellow.'
    ],
    answer: 0,
    explanation: 'The passage states "red, yellow, and brown pigments." Other choices alter the list.'
  },
  {
    id: 'q-hsptrd-fill-008',
    section: 'reading',
    topic: 'inference',
    difficulty: 600,
    passage: 'An octopus can change the color and texture of its skin in less than a second. Tiny sacs called chromatophores hold red, yellow, and brown pigments. When muscles around each sac stretch it open, the color spreads across the skin. Special bumps called papillae can rise or flatten, letting the octopus mimic the rough surface of a coral or the smooth side of a stone. Scientists are still puzzled by one fact: most octopuses are colorblind. Researchers think the animals may sense light through their skin, which would let them match a background they cannot actually see.',
    stem: 'The passage suggests that scientists find octopus camouflage puzzling because',
    choices: [
      'octopuses change color too slowly to escape predators.',
      'octopuses dislike bright reefs.',
      'chromatophores only work in deep water.',
      'most octopuses cannot see the colors they manage to match.'
    ],
    answer: 3,
    explanation: 'The passage calls colorblindness the puzzling fact, since octopuses match what they cannot see. (A) contradicts "less than a second." (B) and (C) are unsupported.'
  },
  {
    id: 'q-hsptrd-fill-009',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 470,
    passage: 'An octopus can change the color and texture of its skin in less than a second. Tiny sacs called chromatophores hold red, yellow, and brown pigments. When muscles around each sac stretch it open, the color spreads across the skin. Special bumps called papillae can rise or flatten, letting the octopus mimic the rough surface of a coral or the smooth side of a stone. Scientists are still puzzled by one fact: most octopuses are colorblind. Researchers think the animals may sense light through their skin, which would let them match a background they cannot actually see.',
    stem: 'In the passage, the word "mimic" most nearly means',
    choices: [
      'mock playfully.',
      'replace permanently.',
      'imitate closely.',
      'destroy gradually.'
    ],
    answer: 2,
    explanation: 'The papillae let the skin look like coral or stone — imitate. (A) is the everyday "make fun of" sense. (B) and (D) reverse meaning.'
  },

  // ===== Passage 4: Fiction — Eli's first day at the bakery (Q10-12) =====
  {
    id: 'q-hsptrd-fill-010',
    section: 'reading',
    topic: 'tone',
    difficulty: 540,
    passage: 'On his first morning at the bakery, Eli arrived an hour early and stood outside in the dark. He had practiced tying his apron in front of a mirror the night before. When the door finally opened, the smell of warm yeast hit him so hard that he laughed out loud. Mrs. Ortega handed him a tray of unbaked rolls without saying a word, and Eli understood that this was a kind of welcome. By noon his arms ached, his apron was dusted in flour, and a small grin had settled onto his face that he could not seem to shake.',
    stem: 'The tone of the passage can best be described as',
    choices: [
      'tense and worried.',
      'sarcastic and bitter.',
      'warm and hopeful.',
      'cold and distant.'
    ],
    answer: 2,
    explanation: 'Words like "laughed out loud," "welcome," and "small grin" create warmth and hope. (A) misreads early nerves. (B) has no sarcasm. (D) ignores Mrs. Ortega\'s gesture.'
  },
  {
    id: 'q-hsptrd-fill-011',
    section: 'reading',
    topic: 'inference',
    difficulty: 620,
    passage: 'On his first morning at the bakery, Eli arrived an hour early and stood outside in the dark. He had practiced tying his apron in front of a mirror the night before. When the door finally opened, the smell of warm yeast hit him so hard that he laughed out loud. Mrs. Ortega handed him a tray of unbaked rolls without saying a word, and Eli understood that this was a kind of welcome. By noon his arms ached, his apron was dusted in flour, and a small grin had settled onto his face that he could not seem to shake.',
    stem: 'It can be inferred from the passage that Eli',
    choices: [
      'had worked at several bakeries before.',
      'planned to quit the job by the end of the day.',
      'disliked Mrs. Ortega from the start.',
      'was nervous but eager to do well.'
    ],
    answer: 3,
    explanation: 'Arriving early and rehearsing the apron show nerves; the grin and laughter show eagerness. (A), (B), (C) contradict the text.'
  },
  {
    id: 'q-hsptrd-fill-012',
    section: 'reading',
    topic: 'detail',
    difficulty: 460,
    passage: 'On his first morning at the bakery, Eli arrived an hour early and stood outside in the dark. He had practiced tying his apron in front of a mirror the night before. When the door finally opened, the smell of warm yeast hit him so hard that he laughed out loud. Mrs. Ortega handed him a tray of unbaked rolls without saying a word, and Eli understood that this was a kind of welcome. By noon his arms ached, his apron was dusted in flour, and a small grin had settled onto his face that he could not seem to shake.',
    stem: 'What did Mrs. Ortega give Eli when the door opened?',
    choices: [
      'A clean apron.',
      'A loaf of bread.',
      'A tray of unbaked rolls.',
      'A list of instructions.'
    ],
    answer: 2,
    explanation: 'The passage says she handed him "a tray of unbaked rolls." Other items are not mentioned.'
  },

  // ===== Passage 5: Science — Lichens (Q13-15) =====
  {
    id: 'q-hsptrd-fill-013',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 590,
    passage: 'A lichen looks like a single plant clinging to a rock, but it is actually two organisms living as one. A fungus provides shelter and traps moisture from the air. Inside the fungus, tiny algae or bacteria use sunlight to make sugar, which both partners share. This partnership lets lichens grow in places where neither partner could survive alone, from frozen tundra to dry desert stones. Some lichens grow only a millimeter each year, yet a single patch may be hundreds of years old. Scientists who study air pollution often look at lichens first, because they vanish quickly when the air turns dirty.',
    stem: 'The main idea of the passage is that',
    choices: [
      'lichens are a successful partnership of two different organisms.',
      'lichens are the slowest growing plants on Earth.',
      'algae prefer rocks to soil.',
      'air pollution kills almost all desert plants.'
    ],
    answer: 0,
    explanation: 'The passage describes the fungus-algae partnership and its benefits. (B) and (C) overstate details; (D) generalizes beyond lichens.'
  },
  {
    id: 'q-hsptrd-fill-014',
    section: 'reading',
    topic: 'purpose',
    difficulty: 660,
    passage: 'A lichen looks like a single plant clinging to a rock, but it is actually two organisms living as one. A fungus provides shelter and traps moisture from the air. Inside the fungus, tiny algae or bacteria use sunlight to make sugar, which both partners share. This partnership lets lichens grow in places where neither partner could survive alone, from frozen tundra to dry desert stones. Some lichens grow only a millimeter each year, yet a single patch may be hundreds of years old. Scientists who study air pollution often look at lichens first, because they vanish quickly when the air turns dirty.',
    stem: 'The author mentions that lichens "vanish quickly when the air turns dirty" mainly to',
    choices: [
      'warn readers that lichens may soon go extinct.',
      'show that lichens prefer cold weather.',
      'argue that all pollution comes from cities.',
      'explain why scientists use lichens as indicators of air quality.'
    ],
    answer: 3,
    explanation: 'The line follows the claim that scientists "look at lichens first" — they serve as pollution indicators. (A) overstates. (B) and (C) are unsupported.'
  },
  {
    id: 'q-hsptrd-fill-015',
    section: 'reading',
    topic: 'detail',
    difficulty: 560,
    passage: 'A lichen looks like a single plant clinging to a rock, but it is actually two organisms living as one. A fungus provides shelter and traps moisture from the air. Inside the fungus, tiny algae or bacteria use sunlight to make sugar, which both partners share. This partnership lets lichens grow in places where neither partner could survive alone, from frozen tundra to dry desert stones. Some lichens grow only a millimeter each year, yet a single patch may be hundreds of years old. Scientists who study air pollution often look at lichens first, because they vanish quickly when the air turns dirty.',
    stem: 'According to the passage, what does the fungus contribute to the partnership?',
    choices: [
      'Sugar produced from sunlight.',
      'Shelter and trapped moisture.',
      'A bright green color.',
      'Resistance to sunlight.'
    ],
    answer: 1,
    explanation: 'The passage states the fungus "provides shelter and traps moisture." Sugar comes from algae or bacteria.'
  },

  // ===== Passage 6: Social studies — Iceland geothermal (Q16-18) =====
  {
    id: 'q-hsptrd-fill-016',
    section: 'reading',
    topic: 'detail',
    difficulty: 500,
    passage: 'Iceland sits on a seam in the Earth\'s crust where two great plates pull apart. Heat from deep underground rises close to the surface, warming pockets of groundwater into steam. For more than a century, Icelanders have piped this steam into greenhouses, swimming pools, and even sidewalks that melt their own snow. Today nearly every home in the country is heated by geothermal energy, and most of its electricity comes from the same source. The island\'s small population, only about 380,000 people, makes it easier to share a few large power plants. Few countries can copy the model exactly, but many are studying Iceland\'s example.',
    stem: 'According to the passage, geothermal steam in Iceland is used for all of the following EXCEPT',
    choices: [
      'heating greenhouses.',
      'melting snow on sidewalks.',
      'fueling cars and trucks.',
      'warming swimming pools.'
    ],
    answer: 2,
    explanation: 'The passage names greenhouses, sidewalks, and pools but never vehicles. (A), (B), (D) are listed.'
  },
  {
    id: 'q-hsptrd-fill-017',
    section: 'reading',
    topic: 'inference',
    difficulty: 670,
    passage: 'Iceland sits on a seam in the Earth\'s crust where two great plates pull apart. Heat from deep underground rises close to the surface, warming pockets of groundwater into steam. For more than a century, Icelanders have piped this steam into greenhouses, swimming pools, and even sidewalks that melt their own snow. Today nearly every home in the country is heated by geothermal energy, and most of its electricity comes from the same source. The island\'s small population, only about 380,000 people, makes it easier to share a few large power plants. Few countries can copy the model exactly, but many are studying Iceland\'s example.',
    stem: 'The passage suggests that other countries cannot easily copy Iceland\'s model because',
    choices: [
      'geothermal energy is too expensive in every country.',
      'few countries are interested in studying Iceland.',
      'geothermal steam is only useful for melting snow.',
      'most countries lack both the geology and the small population that make Iceland\'s system work.'
    ],
    answer: 3,
    explanation: 'The passage cites the rare geology (plate seam) and small population. (A) goes beyond the passage. (B) and (C) contradict the text.'
  },
  {
    id: 'q-hsptrd-fill-018',
    section: 'reading',
    topic: 'tone',
    difficulty: 610,
    passage: 'Iceland sits on a seam in the Earth\'s crust where two great plates pull apart. Heat from deep underground rises close to the surface, warming pockets of groundwater into steam. For more than a century, Icelanders have piped this steam into greenhouses, swimming pools, and even sidewalks that melt their own snow. Today nearly every home in the country is heated by geothermal energy, and most of its electricity comes from the same source. The island\'s small population, only about 380,000 people, makes it easier to share a few large power plants. Few countries can copy the model exactly, but many are studying Iceland\'s example.',
    stem: 'The author\'s tone in describing Iceland\'s system is best described as',
    choices: [
      'admiring but realistic.',
      'doubtful and dismissive.',
      'urgent and alarmed.',
      'puzzled and unsure.'
    ],
    answer: 0,
    explanation: 'The author praises the system ("nearly every home") but admits "few countries can copy" it — admiring yet realistic. Other choices misread tone.'
  },

  // ===== Passage 7: Fiction — Old radio in the attic (Q19-21) =====
  {
    id: 'q-hsptrd-fill-019',
    section: 'reading',
    topic: 'inference',
    difficulty: 580,
    passage: 'In the attic, behind a stack of yellowed magazines, Daniel found a wooden radio the size of a toaster. The dial still turned with a soft click, and a faint smell of dust and varnish drifted up from inside. He carried it down to his grandfather, who set it carefully on the kitchen table. "I haven\'t seen this in forty years," his grandfather said, running a thumb along the worn knob. "Your great-grandmother listened to the news on it every night." Daniel did not know what to say, so he simply pulled out a chair and waited for the old man to speak again.',
    stem: 'It can be inferred that Daniel\'s grandfather feels',
    choices: [
      'annoyed that the radio was disturbed.',
      'eager to throw the old radio away.',
      'moved by the memories the radio brings back.',
      'confused about who owned the radio.'
    ],
    answer: 2,
    explanation: 'He handles it carefully, recalls his mother, and pauses — emotional memory. Other choices contradict his careful treatment.'
  },
  {
    id: 'q-hsptrd-fill-020',
    section: 'reading',
    topic: 'tone',
    difficulty: 640,
    passage: 'In the attic, behind a stack of yellowed magazines, Daniel found a wooden radio the size of a toaster. The dial still turned with a soft click, and a faint smell of dust and varnish drifted up from inside. He carried it down to his grandfather, who set it carefully on the kitchen table. "I haven\'t seen this in forty years," his grandfather said, running a thumb along the worn knob. "Your great-grandmother listened to the news on it every night." Daniel did not know what to say, so he simply pulled out a chair and waited for the old man to speak again.',
    stem: 'The tone of the passage is best described as',
    choices: [
      'tense and frightening.',
      'quiet and reflective.',
      'humorous and lighthearted.',
      'angry and bitter.'
    ],
    answer: 1,
    explanation: 'Soft details (click, dust, careful handling) and Daniel\'s patient silence create a quiet, reflective mood.'
  },
  {
    id: 'q-hsptrd-fill-021',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 470,
    passage: 'In the attic, behind a stack of yellowed magazines, Daniel found a wooden radio the size of a toaster. The dial still turned with a soft click, and a faint smell of dust and varnish drifted up from inside. He carried it down to his grandfather, who set it carefully on the kitchen table. "I haven\'t seen this in forty years," his grandfather said, running a thumb along the worn knob. "Your great-grandmother listened to the news on it every night." Daniel did not know what to say, so he simply pulled out a chair and waited for the old man to speak again.',
    stem: 'In the passage, the word "worn" most nearly means',
    choices: [
      'dressed in.',
      'tired and weak.',
      'smoothed by long use.',
      'painted brightly.'
    ],
    answer: 2,
    explanation: 'A radio knob that has been used for decades has been smoothed by use. (A) and (B) are unrelated meanings; (D) reverses the image.'
  },

  // ===== Passage 8: History — Ada Lovelace (Q22-24) =====
  {
    id: 'q-hsptrd-fill-022',
    section: 'reading',
    topic: 'detail',
    difficulty: 560,
    passage: 'Ada Lovelace grew up in nineteenth-century London, the daughter of a famous poet. Her mother insisted she study mathematics, hoping the subject would steady her imagination. The plan worked in an unexpected way. As a young woman, Ada met the inventor Charles Babbage, who was designing a machine he called the Analytical Engine. While translating an article about the engine, Ada added long notes of her own. In one note she described how the machine could be told to follow a step-by-step plan to solve any problem, not just numbers. Many historians now call those notes the first computer program ever written.',
    stem: 'According to the passage, why did Ada\'s mother insist she study mathematics?',
    choices: [
      'She hoped the subject would steady Ada\'s imagination.',
      'She wanted Ada to follow her father into poetry.',
      'Charles Babbage had asked her to.',
      'Mathematics was the most popular subject in London.'
    ],
    answer: 0,
    explanation: 'The passage states the mother hoped math "would steady her imagination." Other choices distort or invent.'
  },
  {
    id: 'q-hsptrd-fill-023',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 600,
    passage: 'Ada Lovelace grew up in nineteenth-century London, the daughter of a famous poet. Her mother insisted she study mathematics, hoping the subject would steady her imagination. The plan worked in an unexpected way. As a young woman, Ada met the inventor Charles Babbage, who was designing a machine he called the Analytical Engine. While translating an article about the engine, Ada added long notes of her own. In one note she described how the machine could be told to follow a step-by-step plan to solve any problem, not just numbers. Many historians now call those notes the first computer program ever written.',
    stem: 'The main idea of the passage is that',
    choices: [
      'Ada Lovelace combined imagination and mathematics to write what is now considered the first computer program.',
      'Charles Babbage was a more important inventor than Ada Lovelace.',
      'Ada\'s mother regretted forcing her to study mathematics.',
      'Nineteenth-century London was the center of the computer industry.'
    ],
    answer: 0,
    explanation: 'The passage tracks Ada from upbringing to her notes being called the first program. (B), (C), (D) are contradicted or unsupported.'
  },
  {
    id: 'q-hsptrd-fill-024',
    section: 'reading',
    topic: 'purpose',
    difficulty: 700,
    passage: 'Ada Lovelace grew up in nineteenth-century London, the daughter of a famous poet. Her mother insisted she study mathematics, hoping the subject would steady her imagination. The plan worked in an unexpected way. As a young woman, Ada met the inventor Charles Babbage, who was designing a machine he called the Analytical Engine. While translating an article about the engine, Ada added long notes of her own. In one note she described how the machine could be told to follow a step-by-step plan to solve any problem, not just numbers. Many historians now call those notes the first computer program ever written.',
    stem: 'The author writes "The plan worked in an unexpected way" mainly to',
    choices: [
      'criticize Ada\'s mother for poor planning.',
      'introduce the idea that Ada combined math with imagination instead of replacing it.',
      'argue that mathematics is the most useful school subject.',
      'suggest that Ada disliked her famous father.'
    ],
    answer: 1,
    explanation: 'The line sets up the surprise: math did not tame imagination — it joined it (her notes). (A), (C), (D) misread the line.'
  },

  // ===== Passage 9: Arts/humanities — Street murals (Q25-27) =====
  {
    id: 'q-hsptrd-fill-025',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 550,
    passage: 'Walk down almost any street in Philadelphia, and a wall will tell you a story. The city is home to more than 4,000 outdoor murals, many of them painted by local artists working with neighborhood residents. A mural may show the history of a block, honor a teacher who never left, or simply turn a blank brick wall into a garden of color. Volunteers help mix paint, hold ladders, and decide what should be shown. The finished murals do more than decorate. They give a neighborhood a public place to point to and say, "We made this together."',
    stem: 'The main idea of the passage is that',
    choices: [
      'Philadelphia has more murals than any other city in the world.',
      'painting murals requires a lot of paint and ladders.',
      'Philadelphia\'s street murals are a shared project that gives neighborhoods identity.',
      'most murals are painted to celebrate famous teachers.'
    ],
    answer: 2,
    explanation: 'The passage emphasizes community participation and identity. (A) is unsupported. (B) and (D) take small details.'
  },
  {
    id: 'q-hsptrd-fill-026',
    section: 'reading',
    topic: 'purpose',
    difficulty: 620,
    passage: 'Walk down almost any street in Philadelphia, and a wall will tell you a story. The city is home to more than 4,000 outdoor murals, many of them painted by local artists working with neighborhood residents. A mural may show the history of a block, honor a teacher who never left, or simply turn a blank brick wall into a garden of color. Volunteers help mix paint, hold ladders, and decide what should be shown. The finished murals do more than decorate. They give a neighborhood a public place to point to and say, "We made this together."',
    stem: 'The author includes the quotation at the end of the passage in order to',
    choices: [
      'show that murals are mostly about painting techniques.',
      'compare Philadelphia to other cities with murals.',
      'criticize residents who do not help paint.',
      'highlight the sense of shared ownership the murals create.'
    ],
    answer: 3,
    explanation: '"We made this together" reinforces the shared, communal claim. Other choices misread.'
  },
  {
    id: 'q-hsptrd-fill-027',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 540,
    passage: 'Walk down almost any street in Philadelphia, and a wall will tell you a story. The city is home to more than 4,000 outdoor murals, many of them painted by local artists working with neighborhood residents. A mural may show the history of a block, honor a teacher who never left, or simply turn a blank brick wall into a garden of color. Volunteers help mix paint, hold ladders, and decide what should be shown. The finished murals do more than decorate. They give a neighborhood a public place to point to and say, "We made this together."',
    stem: 'In the passage, "honor" most nearly means',
    choices: [
      'pay tribute to.',
      'follow the rules of.',
      'invite to a meeting.',
      'pay a salary to.'
    ],
    answer: 0,
    explanation: 'A mural that "honors a teacher" pays tribute. The other meanings of "honor" do not fit this context.'
  },

  // ===== Passage 10: Science — Honeybee dance (Q28-30) =====
  {
    id: 'q-hsptrd-fill-028',
    section: 'reading',
    topic: 'detail',
    difficulty: 580,
    passage: 'When a honeybee finds a rich patch of flowers, she returns to the hive and dances. The pattern looks chaotic, but it carries clear directions. A short, round dance means food is close, within about a hundred feet. A figure-eight "waggle" dance means the food is farther away. The angle of the waggle relative to straight up tells the other bees the angle to fly relative to the sun. The length of the waggle tells how far. Within minutes, dozens of hive mates leave to find the same flowers, guided by a message that uses no sound at all.',
    stem: 'According to the passage, a short, round dance signals that',
    choices: [
      'food is far from the hive.',
      'food is close to the hive.',
      'a predator is near the hive.',
      'the queen has left the hive.'
    ],
    answer: 1,
    explanation: 'The passage says a "round dance means food is close." Other choices are unsupported.'
  },
  {
    id: 'q-hsptrd-fill-029',
    section: 'reading',
    topic: 'inference',
    difficulty: 690,
    passage: 'When a honeybee finds a rich patch of flowers, she returns to the hive and dances. The pattern looks chaotic, but it carries clear directions. A short, round dance means food is close, within about a hundred feet. A figure-eight "waggle" dance means the food is farther away. The angle of the waggle relative to straight up tells the other bees the angle to fly relative to the sun. The length of the waggle tells how far. Within minutes, dozens of hive mates leave to find the same flowers, guided by a message that uses no sound at all.',
    stem: 'It can be inferred from the passage that honeybee communication',
    choices: [
      'is mostly accidental and easily misunderstood.',
      'uses precise spatial information without spoken language.',
      'depends on the queen translating each dance.',
      'works only when bees are inside the hive at night.'
    ],
    answer: 1,
    explanation: 'The dance encodes angle and distance with no sound — precise spatial information. Other choices contradict the text.'
  },
  {
    id: 'q-hsptrd-fill-030',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 590,
    passage: 'When a honeybee finds a rich patch of flowers, she returns to the hive and dances. The pattern looks chaotic, but it carries clear directions. A short, round dance means food is close, within about a hundred feet. A figure-eight "waggle" dance means the food is farther away. The angle of the waggle relative to straight up tells the other bees the angle to fly relative to the sun. The length of the waggle tells how far. Within minutes, dozens of hive mates leave to find the same flowers, guided by a message that uses no sound at all.',
    stem: 'The passage is mainly about',
    choices: [
      'how honeybees defend their hives from predators.',
      'how the queen bee chooses where to live.',
      'why honeybees prefer certain flowers over others.',
      'how a bee\'s dance gives directions to nearby food sources.'
    ],
    answer: 3,
    explanation: 'Every sentence supports the dance-as-direction idea. Others are not discussed.'
  },

  // ===== Passage 11: Fiction — Soccer tryout (Q31-33) =====
  {
    id: 'q-hsptrd-fill-031',
    section: 'reading',
    topic: 'tone',
    difficulty: 480,
    passage: 'Lena tied her cleats with hands that would not stop shaking. The tryout list had sixty names on it, and the team would only keep eighteen. Around her, other girls were jogging, joking, stretching as if this were just another practice. Lena stared at her own knees and tried to remember why she had signed up. Then Coach Rivers blew the whistle. The first drill was a simple sprint to the corner flag and back, something Lena had done a thousand times. Her legs took over before her doubts could. By the time she reached the flag, she was almost smiling.',
    stem: 'The tone of the passage shifts from',
    choices: [
      'angry to calm.',
      'nervous to determined.',
      'bored to excited.',
      'confident to embarrassed.'
    ],
    answer: 1,
    explanation: 'Shaking hands and doubt show nerves; "legs took over" and "almost smiling" show determination. Other shifts are not supported.'
  },
  {
    id: 'q-hsptrd-fill-032',
    section: 'reading',
    topic: 'inference',
    difficulty: 600,
    passage: 'Lena tied her cleats with hands that would not stop shaking. The tryout list had sixty names on it, and the team would only keep eighteen. Around her, other girls were jogging, joking, stretching as if this were just another practice. Lena stared at her own knees and tried to remember why she had signed up. Then Coach Rivers blew the whistle. The first drill was a simple sprint to the corner flag and back, something Lena had done a thousand times. Her legs took over before her doubts could. By the time she reached the flag, she was almost smiling.',
    stem: 'It can be inferred that Lena',
    choices: [
      'had never played soccer before that day.',
      'will refuse to keep playing if she is cut from the team.',
      'expected the tryout to be much harder than it was.',
      'has practiced enough that her body knows the drills even when her mind worries.'
    ],
    answer: 3,
    explanation: 'The phrase "done a thousand times" plus "legs took over" implies trained instincts. (A) contradicts that experience; (B) and (C) are unsupported.'
  },
  {
    id: 'q-hsptrd-fill-033',
    section: 'reading',
    topic: 'detail',
    difficulty: 460,
    passage: 'Lena tied her cleats with hands that would not stop shaking. The tryout list had sixty names on it, and the team would only keep eighteen. Around her, other girls were jogging, joking, stretching as if this were just another practice. Lena stared at her own knees and tried to remember why she had signed up. Then Coach Rivers blew the whistle. The first drill was a simple sprint to the corner flag and back, something Lena had done a thousand times. Her legs took over before her doubts could. By the time she reached the flag, she was almost smiling.',
    stem: 'How many spots were available on the team?',
    choices: [
      'Sixty.',
      'Eighteen.',
      'Twelve.',
      'Forty-two.'
    ],
    answer: 1,
    explanation: 'The passage states the team would "only keep eighteen." Sixty is the number of tryout names.'
  },

  // ===== Passage 12: History — Wright brothers (Q34-36) =====
  {
    id: 'q-hsptrd-fill-034',
    section: 'reading',
    topic: 'purpose',
    difficulty: 660,
    passage: 'Most early flight pioneers built powerful engines and assumed flight would follow. The Wright brothers tried the opposite. Before they ever attached an engine, they spent four years studying gliders. They watched birds bank and turn. They built a small wind tunnel in their bicycle shop to test more than two hundred wing shapes. Only after they could steer a glider through gusts of wind did they bolt on a lightweight motor. On a cold December morning in 1903, that careful approach paid off. Their first powered flight lasted only twelve seconds, but it solved a puzzle that had defeated wealthier inventors for years.',
    stem: 'The author\'s primary purpose in the passage is to',
    choices: [
      'explain why the Wright brothers\' patient, study-first approach succeeded.',
      'criticize the Wright brothers for taking too long to fly.',
      'argue that bicycle shops were the best place to invent things.',
      'compare the Wright brothers\' fortunes to those of European inventors.'
    ],
    answer: 0,
    explanation: 'The passage contrasts "engines first" pioneers with the brothers\' patient method that "paid off." Other choices misread.'
  },
  {
    id: 'q-hsptrd-fill-035',
    section: 'reading',
    topic: 'detail',
    difficulty: 510,
    passage: 'Most early flight pioneers built powerful engines and assumed flight would follow. The Wright brothers tried the opposite. Before they ever attached an engine, they spent four years studying gliders. They watched birds bank and turn. They built a small wind tunnel in their bicycle shop to test more than two hundred wing shapes. Only after they could steer a glider through gusts of wind did they bolt on a lightweight motor. On a cold December morning in 1903, that careful approach paid off. Their first powered flight lasted only twelve seconds, but it solved a puzzle that had defeated wealthier inventors for years.',
    stem: 'According to the passage, the Wright brothers tested wing shapes',
    choices: [
      'on the wings of live birds.',
      'by attaching them to powerful engines.',
      'in a large laboratory in Europe.',
      'in a small wind tunnel in their bicycle shop.'
    ],
    answer: 3,
    explanation: 'The passage names the wind tunnel in the bicycle shop. Other locations are not mentioned.'
  },
  {
    id: 'q-hsptrd-fill-036',
    section: 'reading',
    topic: 'vocab-in-context',
    difficulty: 720,
    passage: 'Most early flight pioneers built powerful engines and assumed flight would follow. The Wright brothers tried the opposite. Before they ever attached an engine, they spent four years studying gliders. They watched birds bank and turn. They built a small wind tunnel in their bicycle shop to test more than two hundred wing shapes. Only after they could steer a glider through gusts of wind did they bolt on a lightweight motor. On a cold December morning in 1903, that careful approach paid off. Their first powered flight lasted only twelve seconds, but it solved a puzzle that had defeated wealthier inventors for years.',
    stem: 'In the passage, the word "bank" most nearly means',
    choices: [
      'a place to keep money.',
      'tilt to one side while turning.',
      'pile up snow.',
      'rely upon for support.'
    ],
    answer: 1,
    explanation: 'Birds "bank and turn" — they tilt as they turn. Other senses of "bank" do not fit.'
  },

  // ===== Passage 13: Social studies — Farmers' markets (Q37-38) =====
  {
    id: 'q-hsptrd-fill-037',
    section: 'reading',
    topic: 'main-idea',
    difficulty: 570,
    passage: 'Thirty years ago, most American towns had a single supermarket and little else. Today, the same towns often host weekly farmers\' markets where neighbors can buy tomatoes still warm from the field. Sellers and buyers usually live within a few miles of each other, which keeps money circulating in the area. Farmers learn what shoppers want, and shoppers learn the names of the people who grew their food. Some markets even accept food assistance benefits, making fresh produce easier to afford. Markets cannot replace grocery stores, but they have become a small but lively part of how communities feed themselves.',
    stem: 'The main idea of the passage is that',
    choices: [
      'farmers\' markets are slowly replacing supermarkets across the country.',
      'food assistance benefits should only be used at farmers\' markets.',
      'farmers\' markets give towns a local, community-centered way to share food and money.',
      'tomatoes taste better when bought directly from a farmer.'
    ],
    answer: 2,
    explanation: 'The passage emphasizes local money, names, and community. (A) contradicts "cannot replace." (B) and (D) overstate details.'
  },
  {
    id: 'q-hsptrd-fill-038',
    section: 'reading',
    topic: 'tone',
    difficulty: 740,
    passage: 'Thirty years ago, most American towns had a single supermarket and little else. Today, the same towns often host weekly farmers\' markets where neighbors can buy tomatoes still warm from the field. Sellers and buyers usually live within a few miles of each other, which keeps money circulating in the area. Farmers learn what shoppers want, and shoppers learn the names of the people who grew their food. Some markets even accept food assistance benefits, making fresh produce easier to afford. Markets cannot replace grocery stores, but they have become a small but lively part of how communities feed themselves.',
    stem: 'The author\'s overall tone toward farmers\' markets can best be described as',
    choices: [
      'enthusiastic but balanced.',
      'critical and skeptical.',
      'nostalgic and sad.',
      'detached and indifferent.'
    ],
    answer: 0,
    explanation: 'Words like "lively" and the inclusive picture show enthusiasm; "cannot replace grocery stores" shows balance. Other tones do not fit.'
  },

  // ===== Passage 14: Arts/humanities — Origami (Q39-40) =====
  {
    id: 'q-hsptrd-fill-039',
    section: 'reading',
    topic: 'purpose',
    difficulty: 730,
    passage: 'Origami began as a gentle art of folding paper into cranes and frogs, but in the last few decades it has crossed into surprising places. Engineers at hospitals fold tiny medical devices that travel through narrow blood vessels and then unfold inside the body. Space agencies study how to pack a giant solar panel into a small rocket using a folding pattern based on the same principles. Even car designers borrow origami ideas to make airbags that open quickly and evenly. The traditional paper crane and the modern satellite panel may look different, but both rely on the same patient art of folding.',
    stem: 'The author\'s primary purpose in the passage is to',
    choices: [
      'show how an old art form has inspired modern technology.',
      'explain step-by-step how to fold a paper crane.',
      'argue that engineers should learn origami before college.',
      'compare Japanese culture to American culture.'
    ],
    answer: 0,
    explanation: 'The passage links a traditional art to modern devices, panels, and airbags. Other choices misread or invent.'
  },
  {
    id: 'q-hsptrd-fill-040',
    section: 'reading',
    topic: 'inference',
    difficulty: 770,
    passage: 'Origami began as a gentle art of folding paper into cranes and frogs, but in the last few decades it has crossed into surprising places. Engineers at hospitals fold tiny medical devices that travel through narrow blood vessels and then unfold inside the body. Space agencies study how to pack a giant solar panel into a small rocket using a folding pattern based on the same principles. Even car designers borrow origami ideas to make airbags that open quickly and evenly. The traditional paper crane and the modern satellite panel may look different, but both rely on the same patient art of folding.',
    stem: 'It can be inferred from the passage that the value of origami in modern engineering lies mainly in its ability to',
    choices: [
      'make machines look more beautiful and traditional.',
      'use only paper as a building material.',
      'replace older manufacturing methods entirely.',
      'allow large objects to be packed small and then expanded reliably.'
    ],
    answer: 3,
    explanation: 'Each example (medical device, solar panel, airbag) involves a small folded form that opens into a larger one — packing then expanding. Other choices contradict or overreach.'
  }
]);
