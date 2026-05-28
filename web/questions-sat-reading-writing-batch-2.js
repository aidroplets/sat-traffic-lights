/**
 * SAT Reading & Writing — Batch 2 expansion.
 * Distributed across all 4 difficulty bands so the real-test sampler
 * has rich coverage. testType, section, state set explicitly per
 * question so the file inherits nothing from STL_QUESTIONS_AI_DEFAULTS
 * (which still has state='archived' from the 2026-05-06 bulk archive).
 */
'use strict';
window.STL_QUESTIONS_AI = (window.STL_QUESTIONS_AI || []).concat([
  // ============================================================
  // EASY BAND (10 @ 410–500)
  // ============================================================
  {
    id: 'q-satrw-b2-001',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 420,
    state: 'live',
    passage: "Her grandmother's recipes were _____: precise about the order of operations but vague about quantities, as if she expected the cook to taste her way to the right amount.",
    stem: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['exhaustive', 'rigid', 'idiosyncratic', 'standardized'],
    answer: 2,
    explanation: 'The recipes mix precision in one dimension with vagueness in another — a personal, quirky style. "Idiosyncratic" (C) names exactly that. "Exhaustive" (A) implies completeness, contradicted by the vagueness. "Rigid" (B) and "standardized" (D) miss the looseness about quantities.'
  },
  {
    id: 'q-satrw-b2-002',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 440,
    state: 'live',
    passage: "Honeybees communicate the location of food sources through a behavior known as the waggle dance. The dancing bee moves in a figure-eight pattern, and the angle of the central straight run relative to vertical encodes the direction of the food source relative to the sun. The duration of the run encodes the distance.",
    stem: 'According to the text, what does the duration of the waggle run convey?',
    choices: [
      'The species of plant providing the food.',
      'The direction of the food source relative to the sun.',
      'The distance to the food source.',
      'The number of bees needed to harvest the food.'
    ],
    answer: 2,
    explanation: 'The text states explicitly: "The duration of the run encodes the distance." (B) is what the angle conveys, not the duration. (A) and (D) are not mentioned at all.'
  },
  {
    id: 'q-satrw-b2-003',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 450,
    state: 'live',
    passage: "After spending three years restoring the old farmhouse ____ the family finally moved in last spring.",
    stem: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [', ', '; ', ': ', ' — '],
    answer: 0,
    explanation: 'The introductory adverbial phrase ("After spending three years restoring the old farmhouse") is followed by an independent clause; a comma is the conventional separator. (B) a semicolon requires an independent clause on both sides. (C) a colon would signal that what follows is a definition or list. (D) an em dash is grammatically possible but heavier than the situation calls for; the comma is the conventional choice.'
  },
  {
    id: 'q-satrw-b2-004',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-and-sense',
    difficulty: 460,
    state: 'live',
    passage: "Marisol, along with her two younger siblings, _____ to the soccer practice every Saturday.",
    stem: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['walk', 'are walking', 'have walked', 'walks'],
    answer: 3,
    explanation: 'The grammatical subject is "Marisol" (singular) — "along with her two younger siblings" is a parenthetical phrase that does not change the number of the subject. The singular verb "walks" agrees. (A), (B), and (C) all use plural-verb forms.'
  },
  {
    id: 'q-satrw-b2-005',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 480,
    state: 'live',
    passage: "Most people assume that bats use echolocation simply to detect obstacles, but the picture is richer than that. Recent recordings show that the same calls allow bats to identify the species of moths they pursue, distinguish ripe fruit from unripe, and even recognize the calls of individual neighbors in their roosts.",
    stem: 'Which choice best describes the function of the second sentence?',
    choices: [
      'It introduces a new study that contradicts the first sentence.',
      'It questions the methodology of earlier echolocation research.',
      'It restates the popular assumption mentioned in the first sentence.',
      'It elaborates on the claim made in the first sentence by providing specific examples.'
    ],
    answer: 3,
    explanation: 'The second sentence supports "the picture is richer" by listing three specific abilities. (A) is wrong: the second sentence supports rather than contradicts. (B) is unsupported. (C) gets the relationship backward — the second sentence pushes past the popular assumption, not restates it.'
  },
  {
    id: 'q-satrw-b2-006',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 490,
    state: 'live',
    passage: "When the city raised parking-meter rates downtown by 25%, businesses braced for a drop in customer traffic. Six months later, sales were essentially unchanged — but turnover at metered spots had risen sharply. Drivers were leaving sooner once they had finished their errands, freeing up spaces that would previously have stayed occupied for the full meter limit. The result is that, on a given block during business hours, _____",
    stem: 'Which choice most logically completes the text?',
    choices: [
      'fewer different customers are now able to find a parking space than before.',
      'parking-meter revenue per block has fallen relative to the year before.',
      'businesses have had to lower their prices to retain customers.',
      'more different customers are now able to find a parking space than before.'
    ],
    answer: 3,
    explanation: 'Faster turnover at the same number of spots means more cars cycle through per unit time, so more different customers find parking. (A) reverses the logic. (B) is inconsistent with revenue holding up (rates rose, sales unchanged). (C) is unsupported.'
  },
  {
    id: 'q-satrw-b2-007',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'command-of-evidence',
    difficulty: 470,
    state: 'live',
    passage: "A student is researching the claim that high-school students who eat breakfast on test days perform measurably better on standardized exams than students who skip breakfast.",
    stem: 'Which finding, if true, would most directly support the claim?',
    choices: [
      'Students who eat breakfast on test days report feeling less anxious during the test.',
      'High schools in wealthier districts are more likely than those in poorer districts to provide free breakfast to students.',
      'A nutrition handbook recommends that adolescents eat breakfast every day.',
      'A controlled study of 800 high-school students found that those randomly assigned to eat breakfast on test days scored, on average, 4% higher than those assigned to skip it.'
    ],
    answer: 3,
    explanation: '(D) directly tests the causal claim with a controlled experiment that measures the outcome (test scores). (A) measures perception, not score. (B) speaks to access, not effect. (C) is a recommendation, not evidence of the effect on scores.'
  },
  {
    id: 'q-satrw-b2-008',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text-connections',
    difficulty: 500,
    state: 'live',
    passage: "Text 1: Architecture critic Lin Chao argues that contemporary museums increasingly compete with the artworks they house. Dramatic atria and sweeping staircases, she writes, encourage visitors to photograph the building rather than spend time with the collection.\n\nText 2: Museum director Hannah Voss responds that visually striking architecture is precisely what brings new audiences through the door — audiences who, once inside, do go on to engage with the collection. Without the building as draw, she contends, the works would simply have fewer viewers.",
    stem: "Based on the texts, how would Voss (Text 2) most likely respond to Chao's claim in Text 1?",
    choices: [
      'By agreeing that dramatic architecture distracts from the collection but arguing that the trade-off is justified.',
      'By denying that visitors photograph the building at all.',
      'By arguing that the architecture is a net positive because it expands the audience that ends up engaging with the collection.',
      'By proposing that museums should suspend new construction until the issue is studied further.'
    ],
    answer: 2,
    explanation: 'Voss\'s explicit position: striking architecture brings in new audiences who then engage with the collection — a net gain, not a trade-off. (A) misrepresents her as conceding the distraction claim. (B) is too strong; she doesn\'t deny the photographing. (D) is not in her position.'
  },
  {
    id: 'q-satrw-b2-009',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 480,
    state: 'live',
    passage: "The committee\'s vote on the proposal was nearly _____: only one member abstained, and the rest voted in favor.",
    stem: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['contested', 'arbitrary', 'reluctant', 'unanimous'],
    answer: 3,
    explanation: '"Only one member abstained, and the rest voted in favor" describes near-unanimity. (A) "contested" implies division, the opposite. (B) "arbitrary" describes a lack of principle, not vote distribution. (C) "reluctant" is unsupported by the text.'
  },
  {
    id: 'q-satrw-b2-010',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 490,
    state: 'live',
    passage: "In Octavia E. Butler\'s short story \"Speech Sounds,\" a pandemic has stripped most of humanity of language. The protagonist, Rye, navigates a fragmented Los Angeles where misunderstandings — even simple ones — can turn fatal in seconds. Yet near the end of the story, Rye discovers two children who have somehow retained the ability to speak, and she resolves to protect them, recognizing in their preserved speech a fragile thread back to a world that the rest have lost.",
    stem: 'Which choice best states the main idea of the text?',
    choices: [
      'Butler\'s story shows that language loss inevitably leads to violence.',
      'In Butler\'s story, Rye\'s discovery of speaking children gives her a renewed sense of purpose grounded in protecting what little of the old world remains.',
      'Butler\'s story is primarily a critique of how cities respond to public-health crises.',
      'Rye\'s journey through Los Angeles teaches her that survival depends on solitude.'
    ],
    answer: 1,
    explanation: '(B) captures both halves of the text: the loss-and-violence setting AND the children-as-thread-back resolution. (A) takes only the first half. (C) misreads the focus. (D) is contradicted by the protective resolve at the end.'
  },

  // ============================================================
  // MEDIUM BAND (14 @ 510–600)
  // ============================================================
  {
    id: 'q-satrw-b2-011',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 520,
    state: 'live',
    passage: "Critics of the new highway praised the engineering but found the route _____: it cut through three established neighborhoods that had been promised, in earlier planning documents, that the road would skirt them entirely.",
    stem: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['exemplary', 'circuitous', 'expedient', 'duplicitous'],
    answer: 3,
    explanation: 'The route violated promises made in earlier documents — a kind of two-faced behavior. "Duplicitous" (D) means deceitful in a double-dealing way. (A) means model, the opposite tone. (B) means roundabout, irrelevant. (C) means convenient, missing the moral charge.'
  },
  {
    id: 'q-satrw-b2-012',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 540,
    state: 'live',
    passage: "It was once standard among economists to model households as if they were a single decision-maker — what the literature called a \"unitary\" household. Beginning in the 1980s, however, a wave of empirical work showed that the income brought into a household by a wife was spent on a measurably different mix of goods than income brought in by a husband, even after controlling for total household income. The unitary model could not accommodate this finding without contortion. Newer \"collective\" models, which treat the household as a small bargaining group, have largely replaced it in serious applied work.",
    stem: 'Which choice best describes the overall structure of the text?',
    choices: [
      'It identifies an older theoretical model, presents empirical evidence that undermined it, and notes the model that has replaced it.',
      'It critiques both the older and newer household models without endorsing either.',
      'It recounts a personal disagreement between two economists.',
      'It traces the legal history of household income reporting.'
    ],
    answer: 0,
    explanation: 'The text is exactly: old model → empirical challenge → newer model. (A) names this. (B) is wrong: the text endorses the move to collective models. (C) and (D) are off-topic.'
  },
  {
    id: 'q-satrw-b2-013',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text-connections',
    difficulty: 560,
    state: 'live',
    passage: "Text 1: Linguist Adam Holt argues that emoji function as a true writing system: they have a consistent inventory, learned conventions of use, and they can be combined to convey meanings beyond any single symbol. Holt cites studies in which strangers, given a sequence of emoji, reliably converged on similar interpretations.\n\nText 2: Linguist Sara Delgado disagrees. She points out that emoji depend on a surrounding written or spoken context for their meaning to settle: presented in isolation, the same sequence will be read by different people in radically different ways. A true writing system, she argues, must be able to stand alone.",
    stem: "Based on the texts, how would Delgado (Text 2) most likely characterize the studies Holt (Text 1) cites?",
    choices: [
      'As confirming that emoji are a complete writing system in their own right.',
      'As likely involving sequences whose interpretation was steered by surrounding context, undermining the conclusion that emoji stand alone.',
      'As irrelevant to the question of how emoji function in everyday messaging.',
      'As proof that strangers cannot reach agreement on emoji meaning.'
    ],
    answer: 1,
    explanation: 'Delgado\'s key claim is that emoji rely on context. She would suspect that Holt\'s studies — in which strangers converged — must have provided some context guiding the convergence. (A) directly contradicts her view. (C) understates her engagement; she would treat them as relevant but flawed. (D) overstates and misreads — the strangers in Holt\'s studies did agree.'
  },
  {
    id: 'q-satrw-b2-014',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 530,
    state: 'live',
    passage: "Coral reefs cover less than 0.1% of the ocean floor, yet they host roughly a quarter of all known marine species. Marine biologists attribute this concentration of life to the structural complexity of the reef itself: every crevice and overhang creates a distinct microhabitat in which a particular species can specialize. When reefs lose that three-dimensional structure — through bleaching, storm damage, or physical breakage — the loss of species follows even when water quality remains otherwise unchanged.",
    stem: 'Which choice best states the central idea of the text?',
    choices: [
      'Coral reefs face many threats, of which bleaching is the most severe.',
      'Marine biologists have not yet agreed on how to measure reef biodiversity.',
      'Most marine species can survive equally well outside of reefs.',
      'The biodiversity of coral reefs depends crucially on their physical, three-dimensional structure, not only on water quality.'
    ],
    answer: 3,
    explanation: '(D) captures both halves: structural complexity supports diversity, and losing that structure reduces species even with good water. (A) overemphasizes one threat. (B) is unsupported. (C) is contradicted.'
  },
  {
    id: 'q-satrw-b2-015',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 570,
    state: 'live',
    passage: "Behavioral ecologists have long noted that birds that breed in dense colonies tend to have less elaborate songs than closely related species that breed alone. A leading explanation is that song complexity evolves in part to help females locate and identify a mate at a distance; in dense colonies, where suitable males are visible at any moment, the selective pressure for that function is weaker. From this, a researcher would predict that, all else equal, _____",
    stem: 'Which choice most logically completes the text?',
    choices: [
      'colonial-breeding species in which males are visually obscured from females by vegetation should evolve more elaborate songs than colonial-breeding species in open habitats.',
      'solitary-breeding species should evolve simpler songs over time as their populations grow denser.',
      'song complexity should be unrelated to mating system across all bird species.',
      'colonial-breeding species should always have more elaborate songs than solitary-breeding species.'
    ],
    answer: 0,
    explanation: 'The mechanism: song complexity evolves where females struggle to locate males. Even within colonies, vegetation could obscure males, restoring the selective pressure for complex song. (A) draws exactly that prediction. (B) reverses the relationship. (C) ignores the mechanism. (D) contradicts the original observation.'
  },
  {
    id: 'q-satrw-b2-016',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'command-of-evidence',
    difficulty: 590,
    state: 'live',
    passage: "Sociologist Daniela Reyes hypothesizes that workers who report having a close friend at their workplace are less likely to leave their employer in a given year than otherwise comparable workers who do not.",
    stem: "Which finding, if true, would most directly support Reyes\'s hypothesis?",
    choices: [
      'A 2022 longitudinal study of 4,200 U.S. workers found that, after controlling for age, job role, and salary, those who reported a close workplace friendship at the start of the year were 27% less likely to leave their employer over the next twelve months.',
      'A 2021 survey found that 64% of U.S. workers say they have at least one close friend at work.',
      'A 2020 study found that workers in industries with high turnover are less likely to form close workplace friendships.',
      'A 2019 review article argued that workplace friendships make workers happier overall.'
    ],
    answer: 0,
    explanation: '(A) directly tests the hypothesis: it controls for confounders, measures friendship at one time, and tracks the outcome (leaving) prospectively. (B) is a snapshot, no outcome. (C) addresses a different direction of relationship. (D) speaks to a different outcome (happiness).'
  },
  {
    id: 'q-satrw-b2-017',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 540,
    state: 'live',
    passage: "The exhibit included paintings from three artists ____ Mary Cassatt, Berthe Morisot, and Édouard Manet.",
    stem: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [' — ', '; ', ': ', ', '],
    answer: 2,
    explanation: 'A colon (C) introduces a list when the preceding text is an independent clause that frames it. (A) an em dash works for emphasis but is heavier and less conventional for a straight list. (B) a semicolon is wrong because what follows is not an independent clause. (D) a comma after "artists" without restructuring would create a run-on with the appositive list.'
  },
  {
    id: 'q-satrw-b2-018',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-and-sense',
    difficulty: 550,
    state: 'live',
    passage: "Although the orchestra had rehearsed the new symphony for only three weeks, the conductor _____ confident that the premiere would go well.",
    stem: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['were', 'are', 'was', 'have been'],
    answer: 2,
    explanation: 'The subject "the conductor" is singular and the sentence is in the past (matching "had rehearsed"). "Was" (C) is the agreeing past-singular form. (A) and (B) are plural; (D) is plural present-perfect.'
  },
  {
    id: 'q-satrw-b2-019',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 580,
    state: 'live',
    passage: "Geologists once believed that the towering basalt cliffs along the river had formed gradually, layer by layer, over millions of years. Field work in the 1990s, however, revealed that nearly the entire formation had been laid down in just a few catastrophic eruptions, each separated by long quiet intervals. The cliffs are still ancient — but their visible structure is the record of a small number of brief, dramatic events rather than steady accumulation.",
    stem: 'Which choice best describes the function of the underlined sentence (the final sentence) in the text as a whole?',
    choices: [
      'It introduces a new topic that the rest of the text will go on to develop.',
      'It dismisses the new field work as inconclusive.',
      'It reconciles the older view with the new evidence by drawing a careful distinction.',
      'It calls for additional research before any conclusion can be drawn.'
    ],
    answer: 2,
    explanation: 'The final sentence holds onto what was right in the old view ("still ancient") while clarifying what the new evidence changes ("dramatic events rather than steady accumulation") — exactly the reconciling move (C). (A) is wrong; the sentence wraps up rather than introducing. (B) misreads — it accepts the field work. (D) is unsupported.'
  },
  {
    id: 'q-satrw-b2-020',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 600,
    state: 'live',
    passage: "Until quite recently, scholars who studied medieval European cookbooks treated the dishes they recorded as a guide to what people of the period actually ate. Food historian Gisela Brun has cautioned against this assumption. Most surviving cookbooks were produced for wealthy households or court kitchens, she points out, and the recipes they record are skewed toward elaborate banquet dishes rather than the everyday meals of the broader population. A scholar who relied solely on these cookbooks to reconstruct medieval diet would therefore likely _____",
    stem: 'Which choice most logically completes the text?',
    choices: [
      'underestimate the role of grains and pottage in everyday medieval life.',
      'overestimate the role of grains and pottage in everyday medieval life.',
      'arrive at a balanced picture of both elite and ordinary medieval diets.',
      'find that medieval cooking was almost identical to modern European cooking.'
    ],
    answer: 0,
    explanation: 'The cookbooks oversample elaborate banquet dishes and undersample everyday food. A scholar relying on them would therefore underestimate the importance of staples like grains and pottage. (B) reverses the bias. (C) contradicts the source-skew. (D) is unsupported.'
  },
  {
    id: 'q-satrw-b2-021',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text-connections',
    difficulty: 590,
    state: 'live',
    passage: "Text 1: Education researcher Jamal Pierce contends that early-elementary students learn arithmetic facts more durably when they practice them in short, distributed sessions across the week than when they practice them in a single long session. He cites controlled trials in which the distributed group outperformed the massed group on a delayed test six weeks later.\n\nText 2: Cognitive scientist Mei Tanaka does not dispute Pierce\'s evidence on six-week retention. She argues, however, that the relevant question for classroom design is not retention at six weeks but skill at the end of the school year. On year-end measures, she notes, the gap between distributed and massed practice often narrows substantially as both groups continue to use the facts in daily classwork.",
    stem: "Based on the texts, how would Tanaka (Text 2) most likely respond to Pierce's recommendation to favor distributed practice?",
    choices: [
      'By denying that the trials Pierce cites measured retention accurately.',
      'By accepting his short-term findings but questioning whether the advantage persists over the timescale that matters most for classroom planning.',
      'By proposing that arithmetic facts are not worth teaching at all in early elementary.',
      'By arguing that massed practice produces better retention at six weeks than distributed practice does.'
    ],
    answer: 1,
    explanation: 'Tanaka explicitly does not dispute the six-week evidence — she questions whether that timescale is the right one. (B) names this stance precisely. (A) misrepresents her concession. (C) and (D) misstate her position.'
  },
  {
    id: 'q-satrw-b2-022',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 580,
    state: 'live',
    passage: "Ana approached the negotiation with a _____ that surprised her colleagues: where they had expected pointed demands, she instead asked open questions and listened at length before offering any position of her own.",
    stem: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['belligerence', 'reticence', 'conciliation', 'extravagance'],
    answer: 2,
    explanation: 'Ana traded "pointed demands" for open questions and patient listening — a posture aimed at finding common ground. "Conciliation" (C) names this. (A) "belligerence" is the opposite. (B) "reticence" captures only the listening, not the active question-asking, and misses the cooperative aim. (D) "extravagance" is unrelated.'
  },
  {
    id: 'q-satrw-b2-023',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 560,
    state: 'live',
    passage: "In her short story \"The Cartographer\'s Wife,\" the novelist Aliyah Mensah introduces Beatriz as a woman who has spent thirty years annotating, in private, the maps her husband published under his name alone. The story is narrated from Beatriz\'s point of view, but it never settles into bitterness; instead, the annotations themselves become a kind of parallel map, more honest than her husband\'s and known only to her.",
    stem: 'Which choice best describes the main idea of the text?',
    choices: [
      'Mensah\'s story is primarily a critique of the publishing industry.',
      'Beatriz\'s private annotations are presented as her own, more truthful response to a body of work that publicly excluded her.',
      'Beatriz spends the story trying to convince her husband to credit her work.',
      'Mensah\'s story argues that women should not work in cartography.'
    ],
    answer: 1,
    explanation: '(B) captures both the structural fact (the annotations) and the tone (not bitterness, but a parallel map). (A) reads in a critique the text does not make. (C) is contradicted — the annotations are private, not used to confront the husband. (D) is plainly absent.'
  },
  {
    id: 'q-satrw-b2-024',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 590,
    state: 'live',
    passage: "The new policy required only one signature ____ the principal had to sign every form personally, regardless of the number submitted.",
    stem: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [' — ', ', and ', ', ', '; '],
    answer: 3,
    explanation: 'Two independent clauses ("The new policy required only one signature" and "the principal had to sign every form personally...") are joined by a semicolon (D). (A) an em dash is informally acceptable but the semicolon is the conventionally correct mark for two independent clauses. (B) "and" without a preceding comma alone would be wrong; the comma+and would force a meaning shift the sentence does not support. (C) a comma alone creates a comma splice.'
  },

  // ============================================================
  // HARD BAND (12 @ 610–700)
  // ============================================================
  {
    id: 'q-satrw-b2-025',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 620,
    state: 'live',
    passage: "Reviewers of the second novel were quick to note its _____: where the first book had read as a single, sustained voice, the second moved restlessly among registers — at one moment academic, at the next colloquial, at the next nearly liturgical — without any apparent organizing principle.",
    stem: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['heterogeneity', 'austerity', 'precocity', 'fluency'],
    answer: 0,
    explanation: 'The reviewers note that the second novel moves among registers without an organizing principle — a mixed, varied texture. "Heterogeneity" (A) names that mixedness. (B) "austerity" implies stripped-down, opposite. (C) "precocity" is a temporal/maturity word, irrelevant. (D) "fluency" would be praise; the reviewers are noting a problem.'
  },
  {
    id: 'q-satrw-b2-026',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 650,
    state: 'live',
    passage: "It has long been argued, in defense of the standardized written exam, that grading anonymously frees the evaluator from biases that might otherwise creep into a face-to-face assessment. A series of studies published over the last decade has muddled this picture. Even when names are removed, evaluators frequently form impressions of the writer — about region, social class, level of formal schooling — from features of the prose itself: vocabulary, idiom, sentence rhythm. These impressions, the studies show, then shape the score in measurable ways. Anonymity does not, it seems, sever the link between the writer and the reader\'s assumptions about who that writer must be.",
    stem: 'Which choice best describes the function of the final sentence in the text as a whole?',
    choices: [
      'It draws a synthesizing conclusion that reframes the practice of anonymous grading in light of the studies just summarized.',
      'It introduces a competing hypothesis that the rest of the text will defend.',
      'It restates the original defense of anonymous grading approvingly.',
      'It calls for the abandonment of standardized written exams.'
    ],
    answer: 0,
    explanation: 'The final sentence pulls together what the studies showed and reframes the anonymity defense in light of it — a synthesizing conclusion. (A) names this. (B) is wrong; it is a closing claim, not an introduction. (C) reverses the sense — it complicates rather than restates. (D) over-extrapolates; nothing in the text recommends abandonment.'
  },
  {
    id: 'q-satrw-b2-027',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text-connections',
    difficulty: 660,
    state: 'live',
    passage: "Text 1: Historian Petra Kowal contends that the rise of cheap pocket-format paperbacks in the 1940s expanded the American reading audience in ways that earlier histories of publishing have understated. Library borrowing data, she shows, undercounts new readers because many of the people drawn in by paperbacks were buyers, not borrowers.\n\nText 2: Historian Charles Adair grants Kowal\'s point about library data but argues that the size of the new reading audience has nonetheless been exaggerated. Many paperback purchases, he shows, were made by readers who already borrowed regularly from libraries; what the paperback offered them was a more convenient or private way to read, not a first encounter with the practice.",
    stem: "Based on the texts, Adair (Text 2) would most likely view Kowal\'s reliance on paperback sales figures as evidence of an expanded reading audience as:",
    choices: [
      'persuasive, since sales figures are inherently more reliable than borrowing records.',
      'irrelevant, since the sales figures Kowal cites have been shown to be fabricated.',
      'definitive evidence that the paperback era had no measurable effect on reading rates.',
      'partially flawed, because a portion of those sales reflects existing readers shifting format rather than new readers entering the practice.'
    ],
    answer: 3,
    explanation: 'Adair concedes Kowal\'s critique of library data but argues that paperback sales overstate the new audience because many buyers were existing readers. (D) captures this exactly. (A) misses his concern about format-switching. (B) accuses fabrication, which Adair does not. (C) overstates — he says the audience is exaggerated, not that the effect was zero.'
  },
  {
    id: 'q-satrw-b2-028',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 640,
    state: 'live',
    passage: "In an interview late in her career, the choreographer Yvonne Rainer remarked that her early work had been received almost entirely as a polemic against ballet — a refusal of its virtuosity, its narrative, its spectacle. That reception, she said, was not wrong, but it had crowded out something quieter that she had been after at the same time: a sustained interest in pedestrian movement (walking, lifting, carrying) as a thing worth watching in its own right, independent of any contrast with the tradition she was rejecting.",
    stem: 'Which choice best states the main idea of the text?',
    choices: [
      'Rainer regrets the polemical framing of her early work and now considers it a mistake.',
      'Rainer felt that the polemical reading of her early work, while accurate, had eclipsed a quieter, affirmative interest in pedestrian movement that ran alongside it.',
      'Rainer\'s early work was misunderstood as anti-ballet when it was in fact a defense of ballet.',
      'Rainer disavowed her early choreography in favor of more traditional forms.'
    ],
    answer: 1,
    explanation: '(B) precisely tracks the structure: the polemical reading was correct as far as it went, but it crowded out a parallel positive interest. (A) misreads — she does not call the polemical framing a mistake. (C) flips her stance toward ballet. (D) is contradicted; she\'s clarifying, not disavowing.'
  },
  {
    id: 'q-satrw-b2-029',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 670,
    state: 'live',
    passage: "Field linguists have long observed that, in languages with grammatical gender, speakers occasionally extend the gender of an existing noun to a new loanword on the basis of a phonological rather than a semantic resemblance — for instance, treating a borrowed word as feminine simply because it ends in a sound that, in the borrowing language, marks most feminine nouns. A consequence of this pattern, if it is general, is that two unrelated languages that happen to share the same phonological cue for feminine gender will, _____",
    stem: 'Which choice most logically completes the text?',
    choices: [
      'when borrowing the same word from a third language, sometimes assign it the same gender even though the assignment in each case is independent.',
      'when borrowing the same word from a third language, always assign it different genders, since the borrowings are independent.',
      'tend to lose grammatical gender altogether within a few generations.',
      'borrow nouns from each other much more often than from any unrelated language.'
    ],
    answer: 0,
    explanation: 'If both languages assign gender by the same phonological cue, then a loanword from a third language ending in that cue will, in each language independently, be assigned the same gender. (A) captures the prediction without overstating frequency. (B) reverses the inference. (C) and (D) introduce claims the passage does not support.'
  },
  {
    id: 'q-satrw-b2-030',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'command-of-evidence',
    difficulty: 680,
    state: 'live',
    passage: "Ecologist Renée Solberg has proposed that the apparent recovery of a once-overhunted deer population in a regional forest is largely an artifact of where the surveys are conducted: the official counts focus on the open meadows where deer are easiest to see, but in this forest, deer have shifted increasingly into the densely wooded interior over the past decade.",
    stem: "Which finding, if true, would most directly support Solberg's proposal?",
    choices: [
      'A 2023 camera-trap survey of the forest interior, where official counts are not conducted, found deer densities lower than those in the meadows.',
      'A 2022 review found that the methodology of the official surveys is consistent with that used in other regional forests.',
      'A 2023 camera-trap survey of the forest interior, where official counts are not conducted, found deer densities substantially higher than those reported by the official meadow surveys.',
      'A 2021 study found that deer populations across the country have generally rebounded from earlier overhunting.'
    ],
    answer: 2,
    explanation: 'Solberg argues the recovery may be real but is being misallocated by survey design — that interior counts would show even more deer than the meadows. (C) directly supports this. (A) actually undermines her, by showing the interior holds fewer deer than where surveys focus. (B) and (D) are tangential.'
  },
  {
    id: 'q-satrw-b2-031',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 630,
    state: 'live',
    passage: "Although she had trained as a chemist ____ Dr. Alvarez spent most of her career writing about the history of science.",
    stem: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [' — ', '; ', ', ', ': '],
    answer: 2,
    explanation: 'A subordinate clause beginning with "Although" is followed by an independent clause; a comma is the conventional separator. (A) an em dash is too heavy here. (B) a semicolon requires two independent clauses, but the first clause is subordinate. (D) a colon would signal that what follows is a definition or list.'
  },
  {
    id: 'q-satrw-b2-032',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-and-sense',
    difficulty: 650,
    state: 'live',
    passage: "The committee, after reviewing the proposals submitted by all eight candidates, _____ to delay any final decision until the next quarterly meeting.",
    stem: 'Which choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['have voted', 'were voting', 'are voting', 'voted'],
    answer: 3,
    explanation: 'The subject "the committee" takes a singular verb in U.S. usage. The reviewing happened "after" reviewing, so the main verb should be in simple past, agreeing in time with the perfective sub-action. "Voted" (D) is singular past and aligns with the timeline. (A) and (B), (C) are plural; (A) is also perfective in a way that clashes with the temporal anchor.'
  },
  {
    id: 'q-satrw-b2-033',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 690,
    state: 'live',
    passage: "Detractors of the late composer\'s symphonies have often dismissed his orchestration as _____ — at every climax, every section of the orchestra is doubled, tripled, scored against itself, until the texture is so dense that no single line can be heard. His admirers reply that this same density is the point: the listener is not meant to follow individual lines but to be enveloped in the resulting sound.",
    stem: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['parsimonious', 'overwrought', 'restrained', 'derivative'],
    answer: 1,
    explanation: 'The detractors\' complaint, made specific by the description ("doubled, tripled, scored against itself, ... so dense"), is that the orchestration is excessive. "Overwrought" (B) means worked-up to excess. (A) "parsimonious" and (C) "restrained" mean the opposite. (D) "derivative" addresses originality, not density.'
  },
  {
    id: 'q-satrw-b2-034',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 700,
    state: 'live',
    passage: "Studies of consumer choice in supermarkets have repeatedly found that, when many varieties of a product are displayed side by side, shoppers are less likely to buy any of them than when only a few varieties are displayed. The standard explanation is that comparing many options imposes a cognitive cost large enough to push some shoppers into postponing the decision altogether. If this explanation is correct, the effect should be strongest among shoppers who lack a strong prior preference for one variety, since these are the shoppers for whom the comparison cost is least offset by an easy default. A retailer hoping to maximize unit sales of a category in which most shoppers do not arrive with a strong brand preference would therefore be best served by _____",
    stem: 'Which choice most logically completes the text?',
    choices: [
      'displaying a wide range of varieties to give those undecided shoppers more freedom to choose.',
      'displaying only a small number of varieties so that undecided shoppers are not pushed into postponing the decision.',
      'reorganizing the store so that the category in question is displayed near the entrance.',
      'training staff to ask shoppers about their preferences before they reach the display.'
    ],
    answer: 1,
    explanation: 'The argument: many varieties depress purchase, especially among shoppers without a strong default. The retailer\'s population is precisely such shoppers. So the retailer should reduce the number of varieties displayed to lower the comparison cost. (B) draws this conclusion. (A) does the opposite. (C) and (D) introduce factors the passage does not link to the effect.'
  },
  {
    id: 'q-satrw-b2-035',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 670,
    state: 'live',
    passage: "In her essay \"On Late Style,\" critic Esther Halloway pushes back against the popular image of late-career artistic work as a serene summing-up. The truly interesting late works, she argues, are not the ones in which an aging artist consolidates a lifetime of habits into a final, smooth statement, but the ones in which the artist seems to break with those habits — leaving rough edges, abandoning earlier symmetries, sometimes embarrassing his or her own admirers — as if the proximity of an end gave the artist permission to risk what a younger, career-conscious self could not.",
    stem: 'Which choice best states the main idea of the text?',
    choices: [
      'For Halloway, the most compelling late-career works are those in which the artist breaks with established habits and accepts new risks rather than smoothing them over.',
      'Halloway argues that all late-career artistic work tends to be smoother and more consolidated than earlier work.',
      'Halloway argues that artists should retire at the height of their powers rather than continue working into late career.',
      'Halloway holds that the popular image of late-style serenity is broadly correct.'
    ],
    answer: 0,
    explanation: 'Halloway\'s claim is precisely that interesting late work breaks with prior habits, not that it consolidates them. (A) captures this. (B) and (D) describe the popular image she pushes back against. (C) is a recommendation she does not make.'
  },
  {
    id: 'q-satrw-b2-036',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text-connections',
    difficulty: 690,
    state: 'live',
    passage: "Text 1: Economic historian Daniel Wexler argues that the rapid spread of railway networks across nineteenth-century Europe was the principal driver of regional industrialization in the period: where railways arrived, factories followed within a decade.\n\nText 2: Economic historian Inger Magnusson does not dispute the strong correlation Wexler observes, but she argues that the causal arrow may run partly in the other direction. In several regions for which detailed records survive, she shows, the political coalitions that lobbied successfully to bring a railway line into a region were assembled by industrialists who had already begun building factories there and needed cheaper transport for their finished goods.",
    stem: "Based on the texts, how would Magnusson (Text 2) most likely respond to Wexler\'s claim that railways drove industrialization?",
    choices: [
      'By denying that any correlation between railways and industrialization exists.',
      'By accepting the correlation but arguing that, at least in some regions, the direction of cause is partly the reverse of what Wexler proposes.',
      'By arguing that railways had no measurable effect on factory location anywhere in nineteenth-century Europe.',
      'By proposing that political coalitions were the sole driver of both railway construction and factory location.'
    ],
    answer: 1,
    explanation: 'Magnusson explicitly accepts the correlation and challenges only its causal direction in some regions. (B) describes this exactly. (A) and (C) overstate her objection. (D) attributes to her a single-cause claim she does not make.'
  },

  // ============================================================
  // INSANE BAND (4 @ 710–800)
  // ============================================================
  {
    id: 'q-satrw-b2-037',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 730,
    state: 'live',
    passage: "Defenders of the late philosopher\'s prose have argued that what readers initially mistake for obscurity is in fact a deliberate _____: the philosopher refused, on principle, to deliver any conclusion in a form that could be lifted from its argument and circulated as a slogan, because doing so would, in his view, betray the work the conclusion had cost him to reach.",
    stem: 'Which choice completes the text with the most logical and precise word or phrase?',
    choices: ['unguardedness', 'pedantry', 'recalcitrance', 'profligacy'],
    answer: 2,
    explanation: 'The philosopher\'s prose resists being summarized — it deliberately refuses the easy take-away. "Recalcitrance" (C) names a principled refusal/resistance. (A) "unguardedness" implies open candor, opposite. (B) "pedantry" implies fussy correctness about detail, missing the resistance-on-principle. (D) "profligacy" implies wasteful excess, irrelevant.'
  },
  {
    id: 'q-satrw-b2-038',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 750,
    state: 'live',
    passage: "Comparative studies of human and bird vocal learning have noted a striking parallel: in both groups, individuals raised in social isolation during a critical early window develop adult vocalizations that are noticeably impoverished — not absent, but lacking the structural complexity of vocalizations in socially raised individuals. In both groups, this impoverishment persists even when the isolated individual is later given extensive exposure to normal adult vocalizations. A reasonable inference from this pattern is that, for both humans and the bird species in question, the developmental role of early social exposure cannot be _____",
    stem: 'Which choice most logically completes the text?',
    choices: [
      'fully reproduced by exposure during later life, even if that exposure is extensive.',
      'observed in any individual raised in the wild rather than in captivity.',
      'distinguished from genetic factors using current methods.',
      'detected at all unless the individual is raised in social isolation for many years.'
    ],
    answer: 0,
    explanation: 'Key fact: impoverishment "persists even when the isolated individual is later given extensive exposure." So later exposure cannot substitute for the early window. (A) captures this. (B) is unrelated. (C) introduces a method-claim the passage does not make. (D) is internally backward.'
  },
  {
    id: 'q-satrw-b2-039',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'command-of-evidence',
    difficulty: 770,
    state: 'live',
    passage: "Cognitive scientist Hira Bashir hypothesizes that the well-documented benefit of brief, frequent breaks during sustained mental work is not principally caused, as the conventional account holds, by the recovery of a depletable cognitive resource. Rather, she proposes, it is caused by the spontaneous review of recently encountered material that occurs during the brief, unstructured moments the breaks afford.",
    stem: "Which finding, if true, would most directly support Bashir's hypothesis over the conventional account?",
    choices: [
      'Workers who report feeling tired by mid-afternoon are also more likely to take breaks.',
      'A 2023 controlled study found that workers whose breaks were filled with a demanding secondary task showed almost none of the post-break performance gains seen in workers whose breaks were left unstructured, even though both groups had stepped away from the primary task for the same length of time.',
      'A 2022 review found that the optimal length of a break is about ten minutes for most adults.',
      'A 2021 survey found that most office workers prefer breaks that last between five and fifteen minutes.'
    ],
    answer: 1,
    explanation: 'The conventional account would predict that simply stepping away should restore the depletable resource and yield gains. Bashir\'s account predicts that gains depend on the unstructured time being available for spontaneous review. (B) is the discriminating result: equal break length, but only the unstructured break yields the gain — directly supporting Bashir over the conventional account. (A), (C), and (D) do not distinguish between the two accounts.'
  },
  {
    id: 'q-satrw-b2-040',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 790,
    state: 'live',
    passage: "Few historical claims are as durable, or as imprecise, as the assertion that the printing press \"democratized\" reading in early modern Europe. Recent quantitative work by book historians has begun to put pressure on the assertion in two directions at once. On the demand side, surveys of probate inventories suggest that book ownership in the first century of print was concentrated in a relatively narrow stratum of clergy, professionals, and well-off urban households — broader than the manuscript-era reading public, but not by an order of magnitude. On the supply side, however, the same surveys document a steep decline in the per-copy price of a typical book over the same period, opening the door, at least in principle, to ownership well below the strata where it actually clustered. The standard story, in short, is too coarse to track what the new evidence shows.",
    stem: 'Which choice best describes the function of the underlined sentence (the final sentence) in the text as a whole?',
    choices: [
      'It abandons the inquiry as ultimately undecidable.',
      'It synthesizes the two strands of new evidence into a single conclusion: that the popular formulation is not so much wrong as insufficiently fine-grained.',
      'It restates the popular formulation in stronger terms.',
      'It calls for the demand-side evidence to be discarded in favor of the supply-side evidence.'
    ],
    answer: 1,
    explanation: 'The text presents two strands of evidence (demand-side narrowness, supply-side affordability) and the final sentence pulls them together by saying the standard story is "too coarse" — i.e., not wrong as such, but insufficiently fine-grained. (B) captures this synthesis. (A) is wrong; the text does not give up. (C) reverses the move. (D) is contradicted; the text uses both strands.'
  }
]);
