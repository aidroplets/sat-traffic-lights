/**
 * ACT Reading — short passages with 2-3 comprehension questions
 * each. Covers all four ACT Reading passage types.
 *
 * testType: 'ACT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'reading'
 *
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';

window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  // ============================================================
  // PASSAGE 1 — Literary Narrative (questions 1-3)
  // ============================================================
  {
    id: 'q-actrd-001',
    section: 'reading',
    topic: 'literary',
    difficulty: 24,
    passage: 'Mara had not visited the orchard since her grandfather sold the house. Walking the rutted lane now, she half expected the trees to recognize her, to lean down the way they once had when she was small enough to pass under the lowest branches without ducking. Instead the apples hung indifferently above her head, and the wind carried the same chemical smell she remembered from the neighbor\'s farm. She had told her sister she was coming only to take photographs. That, she now admitted, had been a useful lie. What she wanted was harder to name: not the orchard exactly, but the girl who used to belong to it.',
    stem: 'According to the passage, why did Mara tell her sister she was visiting the orchard?',
    choices: ['To buy apples from the new owner', 'To take photographs', 'To meet her grandfather', 'To see the neighbor\'s farm'],
    answer: 1,
    explanation: 'The passage states directly: "She had told her sister she was coming only to take photographs." The other options are not given as the reason she told her sister; (C) is impossible since the grandfather sold the house.'
  },
  {
    id: 'q-actrd-002',
    section: 'reading',
    topic: 'literary',
    difficulty: 26,
    passage: 'Mara had not visited the orchard since her grandfather sold the house. Walking the rutted lane now, she half expected the trees to recognize her, to lean down the way they once had when she was small enough to pass under the lowest branches without ducking. Instead the apples hung indifferently above her head, and the wind carried the same chemical smell she remembered from the neighbor\'s farm. She had told her sister she was coming only to take photographs. That, she now admitted, had been a useful lie. What she wanted was harder to name: not the orchard exactly, but the girl who used to belong to it.',
    stem: 'The phrase "useful lie" most nearly suggests that Mara\'s stated reason for visiting:',
    choices: ['was a misunderstanding between sisters that she now regrets', 'concealed a more private motive she preferred not to explain', 'was forced upon her by family obligations', 'was actively meant to deceive her sister for personal gain'],
    answer: 1,
    explanation: '"Useful" indicates the lie served a purpose — covering the harder-to-name desire to recover "the girl who used to belong" to the orchard. (A) overstates the harm; (C) ignores that she chose the lie deliberately; (D) has no support.'
  },
  {
    id: 'q-actrd-003',
    section: 'reading',
    topic: 'literary',
    difficulty: 31,
    passage: 'Mara had not visited the orchard since her grandfather sold the house. Walking the rutted lane now, she half expected the trees to recognize her, to lean down the way they once had when she was small enough to pass under the lowest branches without ducking. Instead the apples hung indifferently above her head, and the wind carried the same chemical smell she remembered from the neighbor\'s farm. She had told her sister she was coming only to take photographs. That, she now admitted, had been a useful lie. What she wanted was harder to name: not the orchard exactly, but the girl who used to belong to it.',
    stem: 'The contrast between trees that once "lean[ed] down" and apples that now hang "indifferently" primarily functions to:',
    choices: ['foreshadow a confrontation with the neighbor', 'emphasize that the orchard is no longer commercially productive', 'show that the change Mara senses is in herself, not the trees', 'criticize the new owner\'s neglect of the orchard'],
    answer: 2,
    explanation: 'The trees did not literally lean; that was Mara\'s childhood perception. Their current "indifference" mirrors her separation from her former self — a thought confirmed in the closing line about "the girl who used to belong to it." (A) and (B) project information not in the text; (D) has no setup.'
  },

  // ============================================================
  // PASSAGE 2 — Literary Narrative (questions 4-6)
  // ============================================================
  {
    id: 'q-actrd-004',
    section: 'reading',
    topic: 'literary',
    difficulty: 21,
    passage: 'My uncle Reza kept a single shelf of cassette tapes in the kitchen, between the jar of cardamom pods and a tin of tea so old the lid had fused shut. The tapes were labeled in his cramped hand: a city, a year, sometimes only a season. He said the music on them was unimportant; what mattered was the sound underneath — a tram passing, a vendor shouting, the rain. "Anyone can keep songs," he told me once, prying the tin open with the point of a knife. "I keep weather."',
    stem: 'Uncle Reza values his cassette tapes primarily for:',
    choices: ['the rare music recorded on them', 'the artistic skill of the musicians', 'the financial value they have gained over time', 'the ambient background sounds captured alongside the music'],
    answer: 3,
    explanation: 'Reza states the music is "unimportant" and that what matters is "the sound underneath — a tram passing, a vendor shouting, the rain." (A) and (C) directly contradict his stated view; (D) is never mentioned.'
  },
  {
    id: 'q-actrd-005',
    section: 'reading',
    topic: 'literary',
    difficulty: 28,
    passage: 'My uncle Reza kept a single shelf of cassette tapes in the kitchen, between the jar of cardamom pods and a tin of tea so old the lid had fused shut. The tapes were labeled in his cramped hand: a city, a year, sometimes only a season. He said the music on them was unimportant; what mattered was the sound underneath — a tram passing, a vendor shouting, the rain. "Anyone can keep songs," he told me once, prying the tin open with the point of a knife. "I keep weather."',
    stem: 'The narrator\'s description of the tea tin "so old the lid had fused shut" most likely serves to:',
    choices: ['introduce the conflict that drives the rest of the scene', 'suggest the kitchen is filled with objects preserved over long stretches of time', 'show that the narrator finds the kitchen unhygienic', 'criticize Uncle Reza for being unable to throw things out'],
    answer: 1,
    explanation: 'The detail places Reza\'s tapes among other items kept for years, reinforcing the broader theme of preservation that culminates in "I keep weather." (A) and (D) inject judgment the narrator does not express; (C) misreads the passage as setup for conflict.'
  },
  {
    id: 'q-actrd-006',
    section: 'reading',
    topic: 'literary',
    difficulty: 34,
    passage: 'My uncle Reza kept a single shelf of cassette tapes in the kitchen, between the jar of cardamom pods and a tin of tea so old the lid had fused shut. The tapes were labeled in his cramped hand: a city, a year, sometimes only a season. He said the music on them was unimportant; what mattered was the sound underneath — a tram passing, a vendor shouting, the rain. "Anyone can keep songs," he told me once, prying the tin open with the point of a knife. "I keep weather."',
    stem: 'In the context of the passage, Reza\'s closing statement "I keep weather" most strongly implies that he sees himself as:',
    choices: ['a critic who judges songs by the conditions in which they were recorded', 'a collector whose tapes are valuable because they are rare', 'a meteorologist who tracks climate changes through recordings', 'an archivist of fleeting, place-specific atmospheres rather than works of art'],
    answer: 3,
    explanation: '"Weather" is a metaphor — labels of city, year, and season; sounds of trams and vendors — for the ambient texture of a particular place and moment. (B) takes "weather" literally; (C) reframes him as a critic, which contradicts his dismissal of the music; (D) introduces market value not in the text.'
  },

  // ============================================================
  // PASSAGE 3 — Literary Narrative (questions 7-9)
  // ============================================================
  {
    id: 'q-actrd-007',
    section: 'reading',
    topic: 'literary',
    difficulty: 29,
    passage: 'When the bus finally pulled into Burnt River, Devon was the only passenger left. The driver, who had not spoken in two hundred miles, glanced at him in the long mirror and said, "First time?" Devon nodded. "Don\'t take the shortcut by the mill," the driver said. "Whatever the locals tell you. The road floods every spring and they like watching strangers learn that for themselves." He pulled the door lever. Devon climbed down into a wind that smelled of pine and creosote, his single duffel bag knocking against his knee.',
    stem: 'The driver\'s warning to Devon is best characterized as:',
    choices: ['a coded threat from someone Devon should fear', 'a sentimental farewell from a longtime friend', 'hostile and dismissive', 'practical advice paired with a wry comment about the locals'],
    answer: 3,
    explanation: 'The driver gives a concrete tip ("Don\'t take the shortcut by the mill... The road floods every spring") and remarks dryly that locals "like watching strangers learn that for themselves." (A), (C), and (D) misread the tone — neutral, knowing, faintly amused.'
  },
  {
    id: 'q-actrd-008',
    section: 'reading',
    topic: 'literary',
    difficulty: 25,
    passage: 'When the bus finally pulled into Burnt River, Devon was the only passenger left. The driver, who had not spoken in two hundred miles, glanced at him in the long mirror and said, "First time?" Devon nodded. "Don\'t take the shortcut by the mill," the driver said. "Whatever the locals tell you. The road floods every spring and they like watching strangers learn that for themselves." He pulled the door lever. Devon climbed down into a wind that smelled of pine and creosote, his single duffel bag knocking against his knee.',
    stem: 'The detail that Devon was "the only passenger left" most strongly suggests that Burnt River is:',
    choices: ['a town the bus driver dislikes', 'a remote destination most travelers do not choose', 'a popular tourist stop in the off-season', 'temporarily closed to outside visitors'],
    answer: 1,
    explanation: 'Combined with two hundred silent miles and the single duffel bag, the empty bus depicts Burnt River as the far end of a route few people take. (A) contradicts the empty bus; (C) and (D) have no support in the text.'
  },
  {
    id: 'q-actrd-009',
    section: 'reading',
    topic: 'literary',
    difficulty: 30,
    passage: 'When the bus finally pulled into Burnt River, Devon was the only passenger left. The driver, who had not spoken in two hundred miles, glanced at him in the long mirror and said, "First time?" Devon nodded. "Don\'t take the shortcut by the mill," the driver said. "Whatever the locals tell you. The road floods every spring and they like watching strangers learn that for themselves." He pulled the door lever. Devon climbed down into a wind that smelled of pine and creosote, his single duffel bag knocking against his knee.',
    stem: 'The author\'s choice to end the paragraph with sensory details — the wind, the smells of pine and creosote, the duffel bag at Devon\'s knee — primarily serves to:',
    choices: ['foreshadow that Devon will return to the bus', 'establish that Devon is a careful observer of nature', 'imply that the town has industrial pollution problems', 'shift the focus from the driver\'s words to Devon\'s arrival as a physical experience'],
    answer: 3,
    explanation: 'After the dialogue ends and the door opens, the prose moves from speech to sensation, grounding Devon\'s arrival in the body. (A) characterizes Devon beyond what the text supports; (C) and (D) project events and meanings not present.'
  },

  // ============================================================
  // PASSAGE 4 — Literary Narrative (question 10)
  // ============================================================
  {
    id: 'q-actrd-010',
    section: 'reading',
    topic: 'literary',
    difficulty: 23,
    passage: 'For the first three months after the move, Aleda referred to her new apartment as "the rental," even in her own head. The word kept the place at arm\'s length, the way one might use a fork to nudge an unfamiliar dish. Slowly, however, the rental became the apartment. The apartment became my apartment. By the time her mother visited in February, Aleda had begun calling it home, and was surprised to discover that the change had taken place without her noticing.',
    stem: 'The passage primarily traces:',
    choices: ['the financial difficulty of moving into a new city', 'a dispute between Aleda and her mother over a new apartment', 'the gradual shift in how Aleda mentally labels her living space', 'a single argument over what to call a piece of furniture'],
    answer: 2,
    explanation: 'The paragraph follows the progression "the rental" → "the apartment" → "my apartment" → "home," explicitly noting the shift "had taken place without her noticing." (A), (C), and (D) introduce conflicts the passage does not contain.'
  },

  // ============================================================
  // PASSAGE 5 — Social Science (questions 11-13)
  // ============================================================
  {
    id: 'q-actrd-011',
    section: 'reading',
    topic: 'social-science',
    difficulty: 19,
    passage: 'Behavioral economists distinguish between two systems of decision-making. The first is fast, automatic, and effortless — what allows you to swerve around a pothole without conscious thought. The second is slow, deliberate, and energy-hungry — the system you call on to balance a budget or to weigh a job offer. Most everyday choices are made by the first system, which is generally efficient but prone to predictable errors. The second system is more accurate when fully engaged, but it tires quickly. Researchers studying judgment have argued that many of the mistakes we treat as personal failings are, in fact, evidence of a tired second system handing the wheel back to the first.',
    stem: 'According to the passage, the second decision-making system differs from the first primarily in that the second is:',
    choices: ['faster but less accurate', 'used only by trained economists', 'incapable of making errors', 'slower, more deliberate, and tires quickly'],
    answer: 3,
    explanation: 'The passage describes the second system as "slow, deliberate, and energy-hungry" and notes "it tires quickly." (A) reverses the contrast; (C) and (D) contradict the passage.'
  },
  {
    id: 'q-actrd-012',
    section: 'reading',
    topic: 'social-science',
    difficulty: 27,
    passage: 'Behavioral economists distinguish between two systems of decision-making. The first is fast, automatic, and effortless — what allows you to swerve around a pothole without conscious thought. The second is slow, deliberate, and energy-hungry — the system you call on to balance a budget or to weigh a job offer. Most everyday choices are made by the first system, which is generally efficient but prone to predictable errors. The second system is more accurate when fully engaged, but it tires quickly. Researchers studying judgment have argued that many of the mistakes we treat as personal failings are, in fact, evidence of a tired second system handing the wheel back to the first.',
    stem: 'The author would most likely agree that a person who makes a poor decision late at night is:',
    choices: ['demonstrating a fundamental flaw in their character', 'unaffected by the two systems described', 'experiencing a temporary failure of the deliberate system', 'using the slow system more effectively than usual'],
    answer: 2,
    explanation: 'The closing sentence frames apparent personal failings as a "tired second system handing the wheel back to the first" — a temporary lapse, not a character flaw. (A) is the misreading the passage explicitly rejects; (C) and (D) contradict the passage.'
  },
  {
    id: 'q-actrd-013',
    section: 'reading',
    topic: 'social-science',
    difficulty: 32,
    passage: 'Behavioral economists distinguish between two systems of decision-making. The first is fast, automatic, and effortless — what allows you to swerve around a pothole without conscious thought. The second is slow, deliberate, and energy-hungry — the system you call on to balance a budget or to weigh a job offer. Most everyday choices are made by the first system, which is generally efficient but prone to predictable errors. The second system is more accurate when fully engaged, but it tires quickly. Researchers studying judgment have argued that many of the mistakes we treat as personal failings are, in fact, evidence of a tired second system handing the wheel back to the first.',
    stem: 'The metaphor of "handing the wheel back" most strongly conveys that the transition between systems is:',
    choices: ['a deliberate, conscious choice the person makes', 'an involuntary handoff that occurs when the deliberate system is depleted', 'a defect unique to people who are inexperienced', 'a permanent change in how the brain operates'],
    answer: 1,
    explanation: 'The image follows "a tired second system" — the wheel is given back without the person\'s active decision. (A) misses the involuntary nature; (C) ignores "tires quickly," which implies recovery; (D) introduces inexperience the passage never mentions.'
  },

  // ============================================================
  // PASSAGE 6 — Social Science (questions 14-16)
  // ============================================================
  {
    id: 'q-actrd-014',
    section: 'reading',
    topic: 'social-science',
    difficulty: 22,
    passage: 'In the late nineteenth century, many American cities built their first public libraries with money donated by industrialist Andrew Carnegie. The grants were generous but came with conditions: the local government had to provide the land and pledge to fund the library\'s ongoing operations. Carnegie\'s reasoning was practical. A building, however grand, would not serve readers if no one paid the librarians, bought new books, or kept the heat on in winter. By tying his gifts to a public commitment, he hoped to ensure that the institutions outlived him. Today, more than 1,500 of the original Carnegie buildings still stand, though many have been adapted to other uses.',
    stem: 'According to the passage, Carnegie required local governments to:',
    choices: [
      'match his donation dollar for dollar',
      'name the library after him',
      'provide land and commit to ongoing operating costs',
      'allow him to select the first librarian'
    ],
    answer: 2,
    explanation: 'The passage states the local government had to "provide the land and pledge to fund the library\'s ongoing operations." The other conditions are not in the text.'
  },
  {
    id: 'q-actrd-015',
    section: 'reading',
    topic: 'social-science',
    difficulty: 26,
    passage: 'In the late nineteenth century, many American cities built their first public libraries with money donated by industrialist Andrew Carnegie. The grants were generous but came with conditions: the local government had to provide the land and pledge to fund the library\'s ongoing operations. Carnegie\'s reasoning was practical. A building, however grand, would not serve readers if no one paid the librarians, bought new books, or kept the heat on in winter. By tying his gifts to a public commitment, he hoped to ensure that the institutions outlived him. Today, more than 1,500 of the original Carnegie buildings still stand, though many have been adapted to other uses.',
    stem: 'The author describes Carnegie\'s reasoning as "practical" because he:',
    choices: ['wished to maximize the publicity of his philanthropy', 'doubted that small towns deserved libraries', 'understood that an unfunded building cannot function as a library', 'preferred buildings of modest design over grand ones'],
    answer: 2,
    explanation: 'The next sentences spell out the practicality: "A building, however grand, would not serve readers if no one paid the librarians, bought new books, or kept the heat on in winter." (B), (C), and (D) attribute motives the passage does not support.'
  },
  {
    id: 'q-actrd-016',
    section: 'reading',
    topic: 'social-science',
    difficulty: 30,
    passage: 'In the late nineteenth century, many American cities built their first public libraries with money donated by industrialist Andrew Carnegie. The grants were generous but came with conditions: the local government had to provide the land and pledge to fund the library\'s ongoing operations. Carnegie\'s reasoning was practical. A building, however grand, would not serve readers if no one paid the librarians, bought new books, or kept the heat on in winter. By tying his gifts to a public commitment, he hoped to ensure that the institutions outlived him. Today, more than 1,500 of the original Carnegie buildings still stand, though many have been adapted to other uses.',
    stem: 'The final sentence, noting that many Carnegie buildings now serve "other uses," most strongly implies that:',
    choices: [
      'the buildings have failed in their original mission',
      'Carnegie\'s strategy of demanding civic commitment was ultimately unsuccessful',
      'the buildings have endured even as the communities around them have changed',
      'public libraries are no longer needed in modern American cities'
    ],
    answer: 2,
    explanation: 'The endurance of the structures (1,500 still standing) alongside changes in use suggests adaptation, not failure. (A) and (B) read the change as failure, ignoring "still stand"; (D) generalizes well beyond the passage.'
  },

  // ============================================================
  // PASSAGE 7 — Social Science (questions 17-19)
  // ============================================================
  {
    id: 'q-actrd-017',
    section: 'reading',
    topic: 'social-science',
    difficulty: 20,
    passage: 'Anthropologists who study gift exchange in small communities often note a paradox: gifts are described as freely given, yet they create powerful obligations to give in return. A neighbor who brings a basket of pears to your door does not present a bill, but most recipients quickly begin to feel they should bring something in return — perhaps preserves, perhaps a favor, perhaps simply attentive conversation. The exchange may take weeks or years to complete, but it rarely goes uncompleted. The point of such gifts, researchers argue, is not the pears themselves; it is the relationship the pears keep alive.',
    stem: 'According to the passage, the "paradox" of gift exchange is that gifts are:',
    choices: ['cheap to give but expensive to receive', 'regulated by formal contracts in small communities', 'always returned within the same week', 'described as freely given but actually create obligations to reciprocate'],
    answer: 3,
    explanation: 'The first sentence states: "gifts are described as freely given, yet they create powerful obligations to give in return." (A), (C), and (D) twist or contradict the text.'
  },
  {
    id: 'q-actrd-018',
    section: 'reading',
    topic: 'social-science',
    difficulty: 28,
    passage: 'Anthropologists who study gift exchange in small communities often note a paradox: gifts are described as freely given, yet they create powerful obligations to give in return. A neighbor who brings a basket of pears to your door does not present a bill, but most recipients quickly begin to feel they should bring something in return — perhaps preserves, perhaps a favor, perhaps simply attentive conversation. The exchange may take weeks or years to complete, but it rarely goes uncompleted. The point of such gifts, researchers argue, is not the pears themselves; it is the relationship the pears keep alive.',
    stem: 'The list of possible returns ("preserves... a favor... attentive conversation") is included primarily to illustrate that:',
    choices: ['most recipients prefer to return conversation rather than goods', 'reciprocation may take many different forms, not just material ones', 'pears are an especially valuable gift in such communities', 'communities require detailed records of every exchange'],
    answer: 1,
    explanation: 'The list ranges from another food, to a service, to attention itself, showing the wide variety of forms reciprocation can take. (B), (C), and (D) impose claims the text does not make.'
  },
  {
    id: 'q-actrd-019',
    section: 'reading',
    topic: 'social-science',
    difficulty: 35,
    passage: 'Anthropologists who study gift exchange in small communities often note a paradox: gifts are described as freely given, yet they create powerful obligations to give in return. A neighbor who brings a basket of pears to your door does not present a bill, but most recipients quickly begin to feel they should bring something in return — perhaps preserves, perhaps a favor, perhaps simply attentive conversation. The exchange may take weeks or years to complete, but it rarely goes uncompleted. The point of such gifts, researchers argue, is not the pears themselves; it is the relationship the pears keep alive.',
    stem: 'The passage as a whole most strongly supports the inference that, in the communities described, a refusal to ever return a gift would likely be seen as:',
    choices: ['an acceptable response when the original gift was small', 'a private financial decision with no broader meaning', 'evidence of unusually careful budgeting', 'a violation of the social bond the gift was meant to sustain'],
    answer: 3,
    explanation: 'If the point of the gift is "the relationship the pears keep alive," refusing to reciprocate would let the relationship lapse — a social, not just material, breach. (A), (C), and (D) treat the exchange as transactional, which the passage explicitly rejects.'
  },

  // ============================================================
  // PASSAGE 8 — Social Science (question 20)
  // ============================================================
  {
    id: 'q-actrd-020',
    section: 'reading',
    topic: 'social-science',
    difficulty: 24,
    passage: 'Urban planners once measured a neighborhood\'s health largely by traffic flow: how quickly a car could move from one end of a district to the other. Newer research argues that this metric measured the wrong thing. A street optimized for through-traffic is often unpleasant to walk on, dangerous for children, and bad for the small businesses that line it. Some cities have begun to evaluate streets instead by how often pedestrians stop, linger, and speak to one another — a measure not of speed, but of social density.',
    stem: 'The author of the passage would most likely view a neighborhood where pedestrians frequently stop and converse as:',
    choices: ['a healthier neighborhood than one optimized for fast traffic', 'a sign of failed traffic engineering', 'a temporary condition that planners try to eliminate', 'an obstacle to small business growth'],
    answer: 0,
    explanation: 'The passage frames such streets as the new and more accurate measure of a neighborhood\'s health, contrasting them favorably with car-optimized streets that are "unpleasant to walk on, dangerous for children, and bad for small businesses." (A), (C), and (D) reverse the author\'s position.'
  },

  // ============================================================
  // PASSAGE 9 — Humanities (questions 21-23)
  // ============================================================
  {
    id: 'q-actrd-021',
    section: 'reading',
    topic: 'humanities',
    difficulty: 21,
    passage: 'When I first heard a string quartet perform live, I was twelve, and I expected to be bored. Recordings, after all, had always seemed to me like polished little puzzles, complete and unalterable. The room that evening changed my mind. I could see the cellist breathe before each phrase, hear the catch of horsehair on string, watch the second violinist glance at her partner before a difficult entrance. The music was no longer a finished object but a series of small, visible decisions — and I left convinced that something essential had been hidden from me by every recording I had ever loved.',
    stem: 'Before the live performance, the narrator regarded recordings of classical music as:',
    choices: ['too long to enjoy', 'inferior to popular music', 'inaccessible to young listeners', 'finished, unalterable objects'],
    answer: 3,
    explanation: 'The narrator describes recordings as "polished little puzzles, complete and unalterable." (A), (C), and (D) introduce judgments the passage never makes.'
  },
  {
    id: 'q-actrd-022',
    section: 'reading',
    topic: 'humanities',
    difficulty: 27,
    passage: 'When I first heard a string quartet perform live, I was twelve, and I expected to be bored. Recordings, after all, had always seemed to me like polished little puzzles, complete and unalterable. The room that evening changed my mind. I could see the cellist breathe before each phrase, hear the catch of horsehair on string, watch the second violinist glance at her partner before a difficult entrance. The music was no longer a finished object but a series of small, visible decisions — and I left convinced that something essential had been hidden from me by every recording I had ever loved.',
    stem: 'The narrator emphasizes the "catch of horsehair on string" and the second violinist\'s glance most directly to convey:',
    choices: ['the visible, in-the-moment decisions that distinguish live performance', 'the visual flair the audience expects from performers', 'the unprofessional preparation of the quartet', 'the technical errors that live performance inevitably involves'],
    answer: 0,
    explanation: 'These details exemplify the "small, visible decisions" the narrator says replaced the "finished object" of recording. (A) treats them as errors, which the passage does not; (C) and (D) misread tone and intent.'
  },
  {
    id: 'q-actrd-023',
    section: 'reading',
    topic: 'humanities',
    difficulty: 33,
    passage: 'When I first heard a string quartet perform live, I was twelve, and I expected to be bored. Recordings, after all, had always seemed to me like polished little puzzles, complete and unalterable. The room that evening changed my mind. I could see the cellist breathe before each phrase, hear the catch of horsehair on string, watch the second violinist glance at her partner before a difficult entrance. The music was no longer a finished object but a series of small, visible decisions — and I left convinced that something essential had been hidden from me by every recording I had ever loved.',
    stem: 'The passage as a whole is best described as an account of how the narrator came to believe that:',
    choices: ['live performance reveals dimensions of music that recordings necessarily omit', 'recordings should be banned from music education', 'children should be exposed to music early in life', 'string quartets are superior to all other ensembles'],
    answer: 0,
    explanation: 'The closing sentence — that something essential "had been hidden from me by every recording I had ever loved" — is the broader insight. (A) overreaches; (C) and (D) introduce claims the passage does not argue.'
  },

  // ============================================================
  // PASSAGE 10 — Humanities (questions 24-26)
  // ============================================================
  {
    id: 'q-actrd-024',
    section: 'reading',
    topic: 'humanities',
    difficulty: 23,
    passage: 'For most of the twentieth century, the painter Hilma af Klint\'s abstract canvases sat in storage at the request of the artist herself. She had stipulated that her work not be shown publicly until at least twenty years after her death, believing the world was not yet ready to receive it. Critics now describe her as one of the earliest practitioners of abstract painting, predating Kandinsky by several years. Her own writings suggest she would have resisted that ranking. She painted, she said, not to claim a place in art history, but to record images she felt were given to her — a description that most modern museum labels still struggle to accommodate.',
    stem: 'According to the passage, af Klint stipulated that her work not be shown until:',
    choices: ['critics had ranked her above Kandinsky', 'a museum agreed to acquire the entire collection', 'after she signed each painting', 'at least twenty years after her death'],
    answer: 3,
    explanation: 'The passage states the work was not to be shown "until at least twenty years after her death." (A), (B), and (D) are not stipulations described in the passage.'
  },
  {
    id: 'q-actrd-025',
    section: 'reading',
    topic: 'humanities',
    difficulty: 29,
    passage: 'For most of the twentieth century, the painter Hilma af Klint\'s abstract canvases sat in storage at the request of the artist herself. She had stipulated that her work not be shown publicly until at least twenty years after her death, believing the world was not yet ready to receive it. Critics now describe her as one of the earliest practitioners of abstract painting, predating Kandinsky by several years. Her own writings suggest she would have resisted that ranking. She painted, she said, not to claim a place in art history, but to record images she felt were given to her — a description that most modern museum labels still struggle to accommodate.',
    stem: 'The passage suggests that af Klint would likely have considered the label "earliest practitioner of abstract painting":',
    choices: ['a misrepresentation of her motives, framed in terms of historical priority she did not seek', 'an accurate but incomplete account of her project', 'a deserved acknowledgment she had long awaited', 'an attack on her religious beliefs by hostile critics'],
    answer: 0,
    explanation: 'Her writings indicate she "would have resisted that ranking" and painted not "to claim a place in art history" but to record received images. (A) underplays her resistance; (B) and (D) reverse her stance.'
  },
  {
    id: 'q-actrd-026',
    section: 'reading',
    topic: 'humanities',
    difficulty: 35,
    passage: 'For most of the twentieth century, the painter Hilma af Klint\'s abstract canvases sat in storage at the request of the artist herself. She had stipulated that her work not be shown publicly until at least twenty years after her death, believing the world was not yet ready to receive it. Critics now describe her as one of the earliest practitioners of abstract painting, predating Kandinsky by several years. Her own writings suggest she would have resisted that ranking. She painted, she said, not to claim a place in art history, but to record images she felt were given to her — a description that most modern museum labels still struggle to accommodate.',
    stem: 'The closing remark that museum labels "still struggle to accommodate" af Klint\'s self-description most strongly implies that:',
    choices: ['museum labels are typically written without consulting the artist', 'her paintings are too large for most museums to exhibit', 'curators have refused to display her paintings in major exhibitions', 'modern art institutions have a settled vocabulary that does not easily encompass her stated motives'],
    answer: 3,
    explanation: 'The "struggle" lies between the institutional vocabulary (priority, movements, art history) and her own framing of received images. (A) is contradicted by the implied display; (C) and (D) introduce unrelated points.'
  },

  // ============================================================
  // PASSAGE 11 — Humanities (questions 27-29)
  // ============================================================
  {
    id: 'q-actrd-027',
    section: 'reading',
    topic: 'humanities',
    difficulty: 22,
    passage: 'My grandmother taught herself to read at fifty-two, after her last child left for college. She kept a notebook by the kitchen window in which she wrote down every unfamiliar word she encountered, along with a short definition copied from the dictionary. By the time she died, the notebook ran to four hundred pages. I have it still. Its early entries are tidy, almost schoolroom-careful; the later ones are looser, sometimes annotated with brief disagreements with the dictionary itself. She was, by then, no longer a beginner.',
    stem: 'According to the passage, the narrator\'s grandmother began teaching herself to read at age:',
    choices: ['fifty-two', 'forty-two', 'sixty-two', 'seventy-two'],
    answer: 0,
    explanation: 'The passage opens by stating she "taught herself to read at fifty-two."'
  },
  {
    id: 'q-actrd-028',
    section: 'reading',
    topic: 'humanities',
    difficulty: 26,
    passage: 'My grandmother taught herself to read at fifty-two, after her last child left for college. She kept a notebook by the kitchen window in which she wrote down every unfamiliar word she encountered, along with a short definition copied from the dictionary. By the time she died, the notebook ran to four hundred pages. I have it still. Its early entries are tidy, almost schoolroom-careful; the later ones are looser, sometimes annotated with brief disagreements with the dictionary itself. She was, by then, no longer a beginner.',
    stem: 'The contrast between the notebook\'s "schoolroom-careful" early entries and its later, looser ones primarily serves to:',
    choices: ['document her growth from a beginning reader into a confident, independent one', 'criticize the grandmother for losing discipline over time', 'suggest that her handwriting deteriorated as she aged', 'show that the dictionary became less reliable over the years'],
    answer: 0,
    explanation: 'The closing line — "She was, by then, no longer a beginner" — frames the change as growth into confidence and independence (she even disagrees with the dictionary). (A) and (C) misread the tone; (D) misattributes the change.'
  },
  {
    id: 'q-actrd-029',
    section: 'reading',
    topic: 'humanities',
    difficulty: 31,
    passage: 'My grandmother taught herself to read at fifty-two, after her last child left for college. She kept a notebook by the kitchen window in which she wrote down every unfamiliar word she encountered, along with a short definition copied from the dictionary. By the time she died, the notebook ran to four hundred pages. I have it still. Its early entries are tidy, almost schoolroom-careful; the later ones are looser, sometimes annotated with brief disagreements with the dictionary itself. She was, by then, no longer a beginner.',
    stem: 'The narrator\'s tone toward the grandmother is best described as:',
    choices: ['distantly clinical, focused on documenting her literacy', 'admiring, with quiet pride in her growth', 'wryly critical of her late start', 'mournful and burdened by her absence'],
    answer: 1,
    explanation: 'The careful preservation of the notebook, the noting of her growth, and the closing "She was, by then, no longer a beginner" all convey quiet admiration. (A) misses the warmth; (C) overstates grief; (D) inverts the tone.'
  },

  // ============================================================
  // PASSAGE 12 — Humanities (question 30)
  // ============================================================
  {
    id: 'q-actrd-030',
    section: 'reading',
    topic: 'humanities',
    difficulty: 22,
    passage: 'A photograph, the critic Maren Holst once wrote, is not a window but a wall with a small door cut into it. We are tempted to imagine that the camera has shown us the world; in fact it has shown us only what would fit through the door the photographer opened. The pleasure of looking at photographs, Holst argued, depends on remembering this. A viewer who forgets is no longer looking at a photograph; she is looking at a misleading copy of the world.',
    stem: 'In Holst\'s metaphor, the "door" represents:',
    choices: ['the photographer\'s deliberate choice of what to include and exclude', 'the camera lens itself, which physically captures all available light', 'the technical limitations of older cameras', 'the viewer\'s emotional response to the image'],
    answer: 0,
    explanation: 'Holst writes that photographs show "only what would fit through the door the photographer opened" — the door is the photographer\'s framing choice. (A) treats it literally; (C) and (D) miss the emphasis on authorship.'
  },

  // ============================================================
  // PASSAGE 13 — Natural Science (questions 31-33)
  // ============================================================
  {
    id: 'q-actrd-031',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 20,
    passage: 'Honeybees use a behavior called the waggle dance to share information about food sources with other workers in the hive. A returning forager performs a short, looping movement on a vertical comb. The angle of the straight portion of her dance, relative to gravity, corresponds to the direction of the food relative to the sun. The duration of that straight run encodes distance: longer waggles indicate sources farther from the hive. Other foragers cluster around the dancer, then leave to find the food themselves. Researchers can predict, with surprising accuracy, where a colony will forage simply by translating the dances they observe.',
    stem: 'According to the passage, the duration of the waggle run encodes information about the food source\'s:',
    choices: ['direction relative to the sun', 'sweetness', 'distance from the hive', 'discovery time'],
    answer: 2,
    explanation: 'The passage states: "The duration of that straight run encodes distance: longer waggles indicate sources farther from the hive." (C) is the role of the angle, not the duration.'
  },
  {
    id: 'q-actrd-032',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 26,
    passage: 'Honeybees use a behavior called the waggle dance to share information about food sources with other workers in the hive. A returning forager performs a short, looping movement on a vertical comb. The angle of the straight portion of her dance, relative to gravity, corresponds to the direction of the food relative to the sun. The duration of that straight run encodes distance: longer waggles indicate sources farther from the hive. Other foragers cluster around the dancer, then leave to find the food themselves. Researchers can predict, with surprising accuracy, where a colony will forage simply by translating the dances they observe.',
    stem: 'The passage suggests that an observer who could measure both the angle and the duration of a waggle dance would be able to determine:',
    choices: ['the time of day the food was first discovered', 'the species of flower being visited', 'the age of the dancing forager', 'both the direction and the distance of the food source'],
    answer: 3,
    explanation: 'Angle encodes direction (relative to the sun) and duration encodes distance, so both pieces of information can be recovered. (A), (C), and (D) describe data not encoded in the dance.'
  },
  {
    id: 'q-actrd-033',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 30,
    passage: 'Honeybees use a behavior called the waggle dance to share information about food sources with other workers in the hive. A returning forager performs a short, looping movement on a vertical comb. The angle of the straight portion of her dance, relative to gravity, corresponds to the direction of the food relative to the sun. The duration of that straight run encodes distance: longer waggles indicate sources farther from the hive. Other foragers cluster around the dancer, then leave to find the food themselves. Researchers can predict, with surprising accuracy, where a colony will forage simply by translating the dances they observe.',
    stem: 'The closing sentence about researchers predicting foraging locations primarily serves to:',
    choices: ['cast doubt on the accuracy of the waggle dance', 'introduce a new debate about animal communication', 'argue that bees should be studied only in laboratory settings', 'demonstrate that the dance reliably conveys usable navigational information'],
    answer: 3,
    explanation: 'If translating dances yields accurate predictions of where bees will forage, the dance is reliably conveying real navigational data. (A) inverts this; (C) and (D) introduce ideas not in the passage.'
  },

  // ============================================================
  // PASSAGE 14 — Natural Science (questions 34-36)
  // ============================================================
  {
    id: 'q-actrd-034',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 22,
    passage: 'Lichens are not, strictly speaking, single organisms. Each lichen is a partnership — usually between a fungus and a photosynthetic partner such as a green alga or a cyanobacterium. The fungus supplies structure and protection; the photosynthetic partner provides sugars produced from sunlight. Together they can colonize surfaces — bare rock, tree bark, glass — that neither partner could survive on alone. Some lichens grow only a fraction of a millimeter per year, yet individual colonies have been dated at more than four thousand years old. Their slow tenacity makes them sensitive indicators of air quality: the species present in a forest can reveal a decade of pollution patterns at a glance.',
    stem: 'The passage states that the fungal partner in a lichen primarily contributes:',
    choices: [
      'sugars produced from sunlight',
      'structure and protection',
      'long-distance transport of nutrients',
      'reproductive cells'
    ],
    answer: 1,
    explanation: '"The fungus supplies structure and protection." (A) describes the photosynthetic partner; (C) and (D) are not mentioned.'
  },
  {
    id: 'q-actrd-035',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 27,
    passage: 'Lichens are not, strictly speaking, single organisms. Each lichen is a partnership — usually between a fungus and a photosynthetic partner such as a green alga or a cyanobacterium. The fungus supplies structure and protection; the photosynthetic partner provides sugars produced from sunlight. Together they can colonize surfaces — bare rock, tree bark, glass — that neither partner could survive on alone. Some lichens grow only a fraction of a millimeter per year, yet individual colonies have been dated at more than four thousand years old. Their slow tenacity makes them sensitive indicators of air quality: the species present in a forest can reveal a decade of pollution patterns at a glance.',
    stem: 'The passage suggests that lichens function as useful indicators of air quality primarily because:',
    choices: ['they store pollutants permanently in their tissues', 'they grow rapidly enough to record short-term changes in pollution', 'they live long enough that the species present reflect years of exposure', 'they are easy to remove from rocks for laboratory testing'],
    answer: 2,
    explanation: 'The passage links sensitivity to pollution with longevity: "their slow tenacity" and "a decade of pollution patterns" depend on lichens persisting long enough to register changes. (A) contradicts the slow growth rate; (C) and (D) are not stated.'
  },
  {
    id: 'q-actrd-036',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 32,
    passage: 'Lichens are not, strictly speaking, single organisms. Each lichen is a partnership — usually between a fungus and a photosynthetic partner such as a green alga or a cyanobacterium. The fungus supplies structure and protection; the photosynthetic partner provides sugars produced from sunlight. Together they can colonize surfaces — bare rock, tree bark, glass — that neither partner could survive on alone. Some lichens grow only a fraction of a millimeter per year, yet individual colonies have been dated at more than four thousand years old. Their slow tenacity makes them sensitive indicators of air quality: the species present in a forest can reveal a decade of pollution patterns at a glance.',
    stem: 'The passage as a whole most strongly supports the inference that the success of lichens depends less on:',
    choices: ['the species of fungus involved than on the size of the colony', 'the abundance of nutrients on a given surface than on the partnership between two unlike organisms', 'sunlight than on the protection offered by the fungal partner', 'cooperation than on competition between partners'],
    answer: 1,
    explanation: 'The passage emphasizes that neither partner could survive alone on these surfaces; it is the partnership, not surface richness, that enables colonization. (B) understates the photosynthetic partner; (C) introduces a comparison not made; (D) reverses the cooperative theme.'
  },

  // ============================================================
  // PASSAGE 15 — Natural Science (questions 37-39)
  // ============================================================
  {
    id: 'q-actrd-037',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 24,
    passage: 'For most of the twentieth century, astronomers believed the expansion of the universe must be slowing down. Gravity, after all, pulls every object toward every other object; it seemed only a matter of time before this mutual attraction put the brakes on cosmic growth. In the late 1990s, however, two independent teams measuring distant supernovae arrived at a startling result: the expansion was actually accelerating. Some unknown influence — later named "dark energy" — appeared to be pushing galaxies apart faster than gravity could pull them together. The discovery upended decades of assumptions and earned the lead researchers a Nobel Prize.',
    stem: 'According to the passage, before the late 1990s, astronomers generally expected the universe\'s expansion to:',
    choices: ['reverse and begin contracting immediately', 'gradually slow down due to gravity', 'accelerate as galaxies moved apart', 'continue at a constant rate forever'],
    answer: 1,
    explanation: 'The passage states astronomers believed expansion "must be slowing down" because gravity would "put the brakes on cosmic growth." (A), (B), and (D) contradict that prior view.'
  },
  {
    id: 'q-actrd-038',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 28,
    passage: 'For most of the twentieth century, astronomers believed the expansion of the universe must be slowing down. Gravity, after all, pulls every object toward every other object; it seemed only a matter of time before this mutual attraction put the brakes on cosmic growth. In the late 1990s, however, two independent teams measuring distant supernovae arrived at a startling result: the expansion was actually accelerating. Some unknown influence — later named "dark energy" — appeared to be pushing galaxies apart faster than gravity could pull them together. The discovery upended decades of assumptions and earned the lead researchers a Nobel Prize.',
    stem: 'The author\'s decision to mention that the result came from "two independent teams" most directly serves to:',
    choices: ['lend credibility to a finding that contradicted prior expectations', 'show that the discovery was made simultaneously around the world', 'imply that the teams disagreed about what they had observed', 'suggest that competition slowed the announcement'],
    answer: 0,
    explanation: 'A startling, expectation-overturning result is more credible when reached independently by two groups. (A) overgeneralizes; (C) and (D) are not supported.'
  },
  {
    id: 'q-actrd-039',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 34,
    passage: 'For most of the twentieth century, astronomers believed the expansion of the universe must be slowing down. Gravity, after all, pulls every object toward every other object; it seemed only a matter of time before this mutual attraction put the brakes on cosmic growth. In the late 1990s, however, two independent teams measuring distant supernovae arrived at a startling result: the expansion was actually accelerating. Some unknown influence — later named "dark energy" — appeared to be pushing galaxies apart faster than gravity could pull them together. The discovery upended decades of assumptions and earned the lead researchers a Nobel Prize.',
    stem: 'The passage characterizes "dark energy" most precisely as:',
    choices: ['a kind of matter that absorbs visible light', 'a confirmed force whose mechanism has been fully described', 'a synonym for gravity acting on very large scales', 'a name given to an unidentified influence inferred from observed acceleration'],
    answer: 3,
    explanation: 'The passage calls it "some unknown influence — later named \'dark energy\'" — i.e., a label for an inferred but unidentified cause. (A) overstates current knowledge; (C) contradicts the passage by conflating it with gravity; (D) confuses dark energy with dark matter.'
  },

  // ============================================================
  // PASSAGE 16 — Natural Science (question 40)
  // ============================================================
  {
    id: 'q-actrd-040',
    section: 'reading',
    topic: 'natural-science',
    difficulty: 22,
    passage: 'A coral reef can look, to a casual snorkeler, like a single colorful structure. It is in fact a vast colony of tiny animals called polyps, each one a soft cylinder topped with a ring of tentacles. The polyps secrete a hard skeleton of calcium carbonate beneath themselves; over generations, these skeletons fuse into the reef\'s familiar shape. Most reef-building polyps host microscopic algae inside their tissues. The algae produce food through photosynthesis and share it with the polyp; the polyp, in return, supplies a sheltered home and the chemical raw materials the algae need. When water grows too warm, the partnership breaks down — the polyps expel the algae, and the reef bleaches white.',
    stem: 'The passage indicates that coral bleaching occurs when:',
    choices: ['a new species of polyp invades the colony', 'rising water temperatures cause polyps to expel the algae living inside them', 'polyps stop secreting calcium carbonate skeletons', 'snorkelers disturb the surface of the reef'],
    answer: 1,
    explanation: 'The closing sentence states: "When water grows too warm, the partnership breaks down — the polyps expel the algae, and the reef bleaches white." (A), (B), and (D) are not given as causes.'
  }
]);
