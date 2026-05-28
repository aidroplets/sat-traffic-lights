/**
 * SAT Reading & Writing — Hard band backfill (difficulty 620–700).
 * Covers all 8 Digital SAT R&W domains. Every question is intentionally
 * at the Hard band; do not include any easier items here.
 *
 * testType: 'SAT'  (explicit on each question — file inherits AI defaults)
 * section:  'reading-writing'
 * state:    'live'  (explicit; AI defaults file-level state is 'archived')
 */
'use strict';

window.STL_QUESTIONS_AI = (window.STL_QUESTIONS_AI || []).concat([
  // ===== WORDS IN CONTEXT (4) =====
  {
    id: 'q-satrw-hard-001',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 660,
    passage: "Reviewers of Geoffrey Hill's late poetry have often complained about its difficulty, but Hill himself was unmoved. He held that any poem whose meaning could be exhausted on a first reading was, by that very measure, _____: too pleased with its own clarity to risk the slower discoveries that demanding work invites.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['mercurial', 'derivative', 'opaque', 'prosaic'],
    answer: 3,
    explanation: "Hill criticizes poems that are too transparent — easily exhausted, too pleased with clarity. 'Prosaic' (D) means commonplace, lacking poetic depth — exactly the deficiency Hill names. 'Derivative' (B) means imitative, but the passage faults clarity, not imitation. 'Opaque' (C) is the opposite of clear and would be Hill's preference, not his complaint. 'Mercurial' (A) means changeable, unrelated to the contrast."
  },
  {
    id: 'q-satrw-hard-002',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 690,
    passage: "Asked at a 1962 press conference whether the new administration would restore funding to the cancelled rocket program, the secretary's reply was studiously _____: he neither confirmed that the program would resume nor ruled out the possibility, leaving reporters to parse a single sentence for half an hour after the briefing ended.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['equivocal', 'perfunctory', 'sanguine', 'candid'],
    answer: 0,
    explanation: "The secretary's reply 'neither confirmed... nor ruled out' — the textbook definition of equivocal (deliberately ambiguous, capable of multiple interpretations). 'Equivocal' (A) is right. 'Perfunctory' (B) means cursory or done as a formality; the reply was carefully crafted, not dismissive. 'Sanguine' (C) means optimistic, which the reply does not signal. 'Candid' (D) means frank, the opposite of the deliberate ambiguity described."
  },
  {
    id: 'q-satrw-hard-003',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 640,
    passage: "Although the city's transit agency has spent billions over the last decade on new rail extensions, the gains in ridership have been remarkably _____: every new line that opens seems to draw passengers chiefly from existing buses rather than from cars, leaving total system ridership essentially unchanged.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['copious', 'uniform', 'unprecedented', 'modest'],
    answer: 3,
    explanation: "The text says new lines mostly cannibalize bus ridership, leaving 'total system ridership essentially unchanged' — a small net gain despite huge spending. 'Modest' (D) captures small or limited. 'Copious' (A) means abundant, the opposite. 'Unprecedented' (C) suggests record-setting, again opposite. 'Uniform' (B) means consistent, but the passage is not contrasting variation; it is contrasting effort with outcome."
  },
  {
    id: 'q-satrw-hard-004',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 700,
    passage: "Biographers of the financier Hetty Green have struggled to reconcile the public caricature of her as _____ — refusing to heat her offices, eating cold oatmeal to avoid the cost of a stove — with the private record of substantial, anonymous gifts to hospitals and to the families of business associates who had fallen on hard times.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['parsimonious', 'unscrupulous', 'reticent', 'bombastic'],
    answer: 0,
    explanation: "The caricature is built on miserly behavior — refusing heat, eating cold oatmeal to save on a stove. 'Parsimonious' (A) means stingy with money, exactly fitting these examples. 'Unscrupulous' (B) means dishonest, which the examples do not show. 'Reticent' (C) means reserved in speech, irrelevant to the financial habits described. 'Bombastic' (D) means pompously verbose, opposite in tenor and unrelated to thrift."
  },

  // ===== TEXT STRUCTURE AND PURPOSE (4) =====
  {
    id: 'q-satrw-hard-005',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 650,
    passage: "Until the 1960s, most paleontologists assumed that the dinosaurs of the Late Cretaceous had already begun to decline before the Chicxulub impact, which then merely finished off a group in slow retreat. Newer fossil counts from the Hell Creek Formation have unsettled that picture: dinosaur diversity in the last few hundred thousand years before the impact appears, if anything, slightly higher than in the preceding interval. The data do not by themselves rule out a gradual decline elsewhere on the planet, but they remove what was once the strongest piece of evidence for one.",
    stem: "Which choice best describes the function of the underlined sentence (the final sentence) in the text as a whole?",
    choices: [
      'It introduces a competing hypothesis that the rest of the passage will go on to defend.',
      'It concedes a limitation of the new evidence while still affirming its principal effect on the older view.',
      'It restates the older view in order to argue for its eventual rehabilitation.',
      'It dismisses the older view as irrelevant to current debates in paleontology.'
    ],
    answer: 1,
    explanation: "The final sentence does two things: (i) acknowledges the new fossil counts 'do not by themselves rule out a gradual decline elsewhere' (a concession of limits), and (ii) insists they 'remove what was once the strongest piece of evidence for one' (preserving the main upshot against the older view). That is precisely the structure (B) describes. (A) is wrong: no new hypothesis is introduced. (C) is wrong: the older view is not being rehabilitated. (D) is too strong — the sentence carefully limits, rather than dismisses."
  },
  {
    id: 'q-satrw-hard-006',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 670,
    passage: "In the opening pages of her 1937 memoir, the aviator Beryl Markham describes a flight across the Sahara at night. She says almost nothing about her instruments, her route, or her destination. Instead, she lingers on the sound of the engine, on the way the moon makes the dunes look like a sea seen from very far above, on the strange thought that the people sleeping below her have no idea she is there. The chapter ends before the plane lands.",
    stem: "Which choice best states the main purpose of the text?",
    choices: [
      'To argue that Markham\'s memoir is more reliable as history than other accounts of early aviation.',
      'To explain how the technical demands of nighttime flying shaped Markham\'s prose style.',
      'To characterize the distinctive way Markham\'s memoir opens, emphasizing atmosphere and perception over narrative incident.',
      'To compare Markham\'s account of the Sahara flight with similar passages in other aviators\' memoirs.'
    ],
    answer: 2,
    explanation: "The text catalogs what Markham omits (instruments, route, destination, even the landing) and what she includes (engine sound, moonlit dunes, the thought of unseen sleepers). It is describing the texture and emphasis of her opening — atmosphere over plot. (C) names exactly that. (A) makes a reliability claim the text never makes. (B) inverts the relationship; the text is not arguing about technical demands. (D) involves comparison to other memoirs that the text never mentions."
  },
  {
    id: 'q-satrw-hard-007',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 630,
    passage: "Economists have long assumed that consumers respond to a price increase by buying less of a good and more of its substitutes. A small but persistent body of research, however, documents cases in which the opposite occurs: when the price of a staple food rises, the very poorest households sometimes consume more of it, because they can no longer afford the more nutritious foods that used to round out their diet. These so-called Giffen behaviors do not refute the standard model so much as mark the boundary at which its everyday assumptions cease to apply.",
    stem: "Which choice best describes the function of the third sentence in the text as a whole?",
    choices: [
      'It generalizes from a single case to a sweeping rejection of the standard model.',
      'It restates the second sentence in order to emphasize its surprising character.',
      'It situates the cases described in the second sentence relative to the standard model, characterizing them as a limit rather than a refutation.',
      'It introduces an additional category of consumer behavior that the rest of the passage will analyze.'
    ],
    answer: 2,
    explanation: "The third sentence interprets the Giffen cases by saying they 'do not refute the standard model so much as mark the boundary' where it no longer applies. That is exactly the work (C) describes — placing the second sentence's cases relative to the standard model and labeling them as a limiting case. (A) is contradicted by 'do not refute.' (B) is wrong because the third sentence adds analysis rather than restating. (D) is wrong because no new category is introduced; the sentence is interpreting what was already presented."
  },
  {
    id: 'q-satrw-hard-008',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure-and-purpose',
    difficulty: 680,
    passage: "The following is from a 1909 short story by Edith Wharton. The narrator has just been introduced to Mrs. Verriker, a wealthy widow whose social circle the narrator hopes to enter.\n\nShe received me, that first afternoon, with the cordial inattention of a woman who has long since perfected the art of seeming to listen. Her smile was steady, her questions were polite, and at no point during the half-hour I spent in her drawing-room did I feel that anything I said had reached her. When I rose to leave, she pressed my hand and named a day the following week, and I went down the steps into the bright street obscurely flattered, and not at all sure whether I had been asked back.",
    stem: "Which choice best describes the function of the underlined phrase ('the cordial inattention of a woman who has long since perfected the art of seeming to listen') in the text as a whole?",
    choices: [
      'It signals that Mrs. Verriker is unaware of the social conventions she is breaking.',
      'It offers an early judgment of Mrs. Verriker that the narrator will revise by the passage\'s end.',
      'It establishes the narrator\'s admiration for Mrs. Verriker\'s warmth.',
      'It introduces a paradox whose two halves the rest of the passage will then illustrate.'
    ],
    answer: 3,
    explanation: "The phrase yokes opposites — 'cordial' and 'inattention,' the 'art of seeming to listen.' The remainder of the passage then unpacks both halves: cordial signs (steady smile, polite questions, pressed hand, named day) coexist with absent attention (nothing reached her; uncertainty about whether she was actually invited back). That is the pattern in (D). (B) is wrong: the narrator's parting impression confirms, not revises, the opening judgment. (C) misreads — the narrator notes warmth without trusting it. (A) imputes social ignorance the text does not support; Mrs. Verriker is portrayed as expert at performance."
  },

  // ===== CROSS-TEXT CONNECTIONS (3) =====
  {
    id: 'q-satrw-hard-009',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text-connections',
    difficulty: 670,
    passage: "Text 1\nFor decades, ecologists treated old-growth forests as the natural endpoint of forest succession: left undisturbed, a young woodland will, on its own, mature into the cathedral-canopy stands that pre-industrial Europeans first encountered in North America. On this view, indigenous burning, clearing, and planting were essentially superficial — local, recent, and easily overwritten by natural processes once the human hand was removed.\n\nText 2\nArchaeologist Marina Suárez does not deny that forests recover after disturbance, nor that the species composition of an unmanaged stand will eventually shift toward shade-tolerant trees. Her quarrel is with the inference, common in older textbooks, that what nineteenth-century naturalists saw was the 'natural' state of the continent. Pollen cores and fire-scar records from the eastern woodlands, she argues, show centuries of low-intensity burning by indigenous communities; the open, mast-rich forests so often described in colonial diaries were, in part, a managed landscape briefly left alone after epidemic disease had collapsed the population that maintained it.",
    stem: "Based on the texts, how would Suárez (Text 2) most likely respond to the view of indigenous land use described in Text 1?",
    choices: [
      'By accepting that view as broadly correct, while adding minor qualifications about regional variation.',
      'By granting one component of that view — that forests recover after disturbance — while rejecting the broader claim that what naturalists observed was forest in its natural state.',
      'By rejecting the view entirely, on the grounds that forests do not, in fact, recover after disturbance.',
      'By arguing that pre-industrial European naturalists never actually described an old-growth landscape.'
    ],
    answer: 1,
    explanation: "Suárez explicitly grants two pieces of the textbook view ('does not deny that forests recover after disturbance, nor that... composition... will eventually shift'), so she is not rejecting it wholesale. Her objection is narrower: she denies the inference that the colonial-era forest was the 'natural' state. (B) captures both the partial agreement and the targeted disagreement. (A) understates the disagreement (regional variation is not the issue). (C) contradicts the text — she explicitly does not deny recovery. (D) is unsupported; the text accepts that naturalists described a real landscape but disputes how to characterize it."
  },
  {
    id: 'q-satrw-hard-010',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text-connections',
    difficulty: 690,
    passage: "Text 1\nIn a 2018 essay, philosopher Hana Park argued that randomized controlled trials (RCTs), long the gold standard in medicine, are now being applied uncritically in development economics. The contexts are not parallel: a drug's effect on cell biology generalizes across populations in a way that, say, a microcredit program's effect on household income does not. Park concluded that economists should treat the results of even well-run RCTs as evidence about the trial site, not as policy guidance for elsewhere.\n\nText 2\nEconomist Daniel Reyes shares Park's worry that RCT results are too quickly exported from one context to another. He resists, however, her stronger conclusion. The cure for over-generalization, on his view, is not to confine each trial's findings to its site but to do the patient theoretical work — combining trial results with mechanisms and prior knowledge — that lets researchers reason responsibly across contexts. To treat each RCT as evidence only about its own site, he argues, would discard most of what makes such trials useful in the first place.",
    stem: "Based on the texts, how would Reyes (Text 2) most likely characterize the position Park develops in Text 1?",
    choices: [
      'As correctly diagnosing a real problem in current practice but recommending an overcorrection that would waste much of the evidence RCTs produce.',
      'As resting on the mistaken assumption that RCT results never travel between contexts in any field, including medicine.',
      'As an unqualified endorsement of the way RCTs are currently used in development economics.',
      'As a reasonable claim that he is now persuaded to accept in full.'
    ],
    answer: 0,
    explanation: "Reyes 'shares Park's worry' (correct diagnosis) but 'resists... her stronger conclusion' that each trial's findings should stay confined to its site, calling that move an unnecessary discarding of useful evidence (the overcorrection). (A) names exactly that mixed reaction. (B) attributes a claim Park does not make — Park acknowledges medicine does generalize. (C) is the opposite of Park's actual position, which is critical of current practice. (D) misses the explicit 'He resists, however,' which marks substantive disagreement."
  },
  {
    id: 'q-satrw-hard-011',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text-connections',
    difficulty: 640,
    passage: "Text 1\nLiterary historian Eleanor Whitfield has long maintained that the Gothic novels of the 1790s should be read primarily as expressions of political anxiety. The crumbling castles, hidden chambers, and tyrannical patriarchs that crowd these books, she argues, register a culture haunted by recent revolutions and uncertain of its own institutions; what looks like escapist horror is in fact a coded engagement with the public crises of the moment.\n\nText 2\nIn a recent monograph, scholar Adaeze Onuoha grants that political readings of Gothic fiction can be illuminating, especially for novels by authors with documented political commitments. She cautions, however, that to make political anxiety the master key to the genre is to flatten it. Many of the period's most popular Gothic novels, she notes, were written by and for readers whose interest in the form had little to do with revolution and a great deal to do with the pleasures — formal, sensational, and erotic — that the genre's conventions made available.",
    stem: "Based on the texts, Onuoha (Text 2) would most likely characterize Whitfield's interpretation (Text 1) as:",
    choices: [
      'an outdated framework that has been entirely superseded by formalist readings.',
      'fundamentally mistaken in treating Gothic novels as engaged with anything outside themselves.',
      'a useful starting point that her own work intends to extend to additional novels.',
      'persuasive in some applications but too universal in its scope to do justice to the genre.'
    ],
    answer: 3,
    explanation: "Onuoha 'grants that political readings... can be illuminating' in some applications, then objects that making political anxiety the 'master key' flattens the genre. That is a partial-agreement-plus-scope-objection — what (D) describes. (B) is contradicted by her concession that political readings can be illuminating. (C) misreads: she is constraining Whitfield's framework, not extending it. (A) is too strong — she does not call the framework outdated or superseded; she calls it overextended."
  },

  // ===== CENTRAL IDEAS AND DETAILS (4) =====
  {
    id: 'q-satrw-hard-012',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 660,
    passage: "Hydrologist Ines Navarro has spent the last decade reconstructing the flow history of the Ebro River from a series of slack-water sediment deposits preserved in side canyons. Each deposit records a single large flood: the grain size encodes the discharge, and a layer of organic material near the top usually permits radiocarbon dating. The deposits have allowed Navarro to push the river's known flood record back roughly two millennia, well beyond the gauged record that begins only in 1910. What the new chronology shows, she argues, is not that twentieth-century floods on the Ebro have been unusually large — by the standard of the longer record they have been unremarkable — but that the gauged record alone substantially understates how often very large floods have occurred.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Navarro\'s sediment-based reconstruction shows that twentieth-century floods on the Ebro have been larger than the longer historical record would predict.',
      'Sediment deposits in side canyons preserve more reliable records of past floods than gauged data do.',
      'Navarro\'s extended chronology indicates that the modern instrumental record, taken alone, understates how frequently very large floods have struck the Ebro.',
      'Radiocarbon dating of organic material in flood deposits is the most accurate available method for reconstructing river histories.'
    ],
    answer: 2,
    explanation: "The closing sentence states Navarro's actual conclusion: not that recent floods are unusually large ('they have been unremarkable') but that 'the gauged record alone substantially understates how often very large floods have occurred.' (C) restates that exactly. (A) inverts the conclusion; the text says the opposite. (B) makes a methodological ranking the text does not make — only that gauged data alone misses earlier events. (D) overgeneralizes; the text never claims radiocarbon is the most accurate method overall."
  },
  {
    id: 'q-satrw-hard-013',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 640,
    passage: "Conventional histories of the steam engine credit James Watt's 1769 separate condenser as the breakthrough that launched the Industrial Revolution. Recent scholarship complicates that story in two ways. First, working steam engines on the Newcomen pattern had already been pumping water from British mines for more than half a century before Watt's patent, performing economically valuable work on a scale historians once neglected. Second, Watt's design itself depended on advances in cylinder boring developed for other purposes; without John Wilkinson's accurate iron-boring lathe, Watt's condenser would have leaked too badly to function. The new accounts therefore present Watt less as a lone inventor than as one beneficiary of an unusually productive workshop economy.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Watt\'s separate condenser was a less significant invention than historians have long believed.',
      'Recent scholarship situates Watt\'s condenser within an existing tradition of steam engineering and a network of supporting technologies, rather than treating it as a singular breakthrough.',
      'The Newcomen engine was, in economic terms, more important to the Industrial Revolution than Watt\'s engine was.',
      'Watt could not have produced the separate condenser without first inventing an accurate iron-boring lathe.'
    ],
    answer: 1,
    explanation: "The passage presents 'two ways' the conventional story is complicated — prior Newcomen engines and the Wilkinson lathe — and concludes that Watt is now seen 'less as a lone inventor than as one beneficiary of an unusually productive workshop economy.' (B) captures both the situating-in-tradition and the supporting-technologies points. (A) overstates: the text does not say the condenser was less significant, only that its context is fuller. (C) makes a comparative economic ranking the text does not. (D) misattributes the lathe — Wilkinson, not Watt, invented it."
  },
  {
    id: 'q-satrw-hard-014',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 680,
    passage: "Scholars of the Akkadian Empire have long debated whether its sudden collapse around 2200 BCE was driven primarily by political overreach or by environmental shock. A recent isotopic study of foraminifera shells from a marine core off the coast of Oman, combined with sediment analysis at the inland site of Tell Leilan, points to an abrupt three-century drying that began within a few decades of the empire's last imperial inscriptions. The authors are careful to note that drought alone does not explain why some city-states in the same region adapted while the imperial center did not; their conclusion is that environmental shock was the trigger, but that the shape of the collapse — which institutions failed first, which populations dispersed, which sites were reoccupied — remains a political and social story.",
    stem: "Based on the text, the authors of the recent study would most likely agree with which statement about the collapse of the Akkadian Empire?",
    choices: [
      'Environmental shock was the principal cause of the collapse, and political factors played essentially no role in the events that followed.',
      'Political overreach, rather than environmental change, was the primary driver of the collapse, as earlier scholars argued.',
      'Environmental shock initiated the collapse, but the specific course it took must be explained in political and social terms.',
      'Neither environmental nor political explanations can account for the collapse, because the available evidence is too fragmentary to support a conclusion.'
    ],
    answer: 2,
    explanation: "The authors explicitly conclude 'environmental shock was the trigger, but that the shape of the collapse... remains a political and social story.' (C) restates that two-step view exactly. (A) ignores the second half of their conclusion (the political/social story). (B) reverses their position. (D) is contradicted by the fact that they reach a definite conclusion based on the new evidence."
  },
  {
    id: 'q-satrw-hard-015',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas-and-details',
    difficulty: 620,
    passage: "The following is from Willa Cather's 1918 novel My Ántonia. Jim Burden, the narrator, is recalling his boyhood on the Nebraska prairie.\n\nThere were no fences in those days, and I could choose my own way over the grass uplands, trusting the pony to get me home again. Sometimes I followed the sunflower-bordered roads. Father Kelly had told me that sunflowers were introduced into that country by the Mormons; that at the time of the persecution, when they left Missouri and struck out into the wilderness to find a place where they could worship God in their own way, the members of the first exploring party, crossing the plains to Utah, scattered sunflower seed as they went. The next summer, when the long trains of wagons came through with all the women and children, they had the sunflower trail to follow.",
    stem: "According to the text, the sunflowers along the prairie roads served what function for the early Mormon migrants?",
    choices: [
      'They formed a visible trail that later groups of migrants could follow across the plains.',
      'They provided food for the women and children who followed the exploring party westward.',
      'They marked plots of land that the first exploring party had claimed for later settlement.',
      'They concealed the route taken by the first exploring party from those who had persecuted them.'
    ],
    answer: 0,
    explanation: "Father Kelly's account: the exploring party 'scattered sunflower seed as they went,' so that 'the next summer... the long trains of wagons came through... they had the sunflower trail to follow.' That is exactly (A). (C) is unsupported — there is no claim about land claims. (B) misreads — the sunflowers are described as marking the way, not as food. (D) inverts the function: the sunflowers were intended to be visible to fellow migrants, not to conceal the route."
  },

  // ===== INFERENCES (4) =====
  {
    id: 'q-satrw-hard-016',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 680,
    passage: "In a 2021 review of the literature on stretching and athletic performance, kinesiologist Marcus Brand reported a curious pattern. Static stretching performed immediately before a sprint or jump consistently reduces peak power output in the minutes that follow. The same stretching, performed at least an hour before the activity or as part of a separate session earlier in the day, shows no such cost — and, in some studies, modest benefits to range of motion that persist into the activity. Brand's review does not weigh in on whether athletes should stretch at all; it simply notes that the timing of the stretch, more than its presence or absence, is what the existing evidence is actually about. Coaches who debate whether to drop stretching from warm-ups, then, may be _____.",
    stem: "Which choice most logically completes the text?",
    choices: [
      'dismissing a small but consistent body of evidence for the benefits of pre-activity static stretching.',
      'underestimating the importance of range-of-motion training in elite athletic preparation.',
      'correctly drawing on the evidence to conclude that all stretching impairs performance.',
      'placing too much weight on a body of research that does not directly answer the question they are asking.'
    ],
    answer: 3,
    explanation: "Brand's central observation is that the literature is about timing, not about whether athletes should stretch at all. Coaches debating drop-or-keep are therefore using evidence that addresses a different question. (D) names that mismatch precisely. (B) is unsupported — the passage does not weigh range-of-motion training generally. (C) contradicts the passage, which says the cost depends on timing. (A) misreads: the passage notes a cost, not a benefit, of pre-activity static stretching."
  },
  {
    id: 'q-satrw-hard-017',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 700,
    passage: "Linguists have long noted that words borrowed into a language tend, over time, to drift toward the phonological shape of native words. A loanword whose original pronunciation is awkward in the host language is gradually reshaped — sounds substituted, syllables resegmented — until it can be produced and parsed without effort. Crucially, this process operates fastest in words that ordinary speakers use most often: the more a borrowing circulates in everyday speech, the less it sounds, after a few generations, like a borrowing at all. A linguist examining a centuries-old loanword in a host language and finding that it still sounds conspicuously foreign therefore has reason to suspect that the word has _____.",
    stem: "Which choice most logically completes the text?",
    choices: [
      'never been adopted into the host language\'s vocabulary in the first place.',
      'been borrowed only recently, despite appearing in older written records.',
      'remained largely confined to formal or specialized contexts rather than entering ordinary speech.',
      'undergone less phonological change than other loanwords from the same source language.'
    ],
    answer: 2,
    explanation: "The passage's chain: phonological assimilation is fastest in words used most often; therefore 'the more a borrowing circulates in everyday speech, the less it sounds... like a borrowing at all.' Contrapositive: a centuries-old loanword that still sounds foreign has not circulated much in everyday speech, i.e., has stayed in formal or specialized contexts. (C) draws exactly that inference. (A) is contradicted by the premise that the word is a centuries-old loanword. (B) requires throwing out the written record without warrant. (D) is true at the level of effect but does not follow as the inference; it merely restates the puzzle without giving the underlying reason the passage actually supports."
  },
  {
    id: 'q-satrw-hard-018',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 650,
    passage: "Researchers studying the foraging behavior of bumblebees have repeatedly observed a pattern they call 'flower constancy': within a single foraging trip, an individual bee tends to visit flowers of one species even when other rewarding species are equally available nearby. Switching species, experiments suggest, imposes a small cognitive cost — the bee must readjust its handling technique for each new flower shape. Constancy is therefore most pronounced in species whose flowers are mechanically complex to enter; for species with simple, open blossoms, the same bees will switch between species freely. A botanist looking for evidence of strong flower constancy among foraging bumblebees would therefore be best served by studying a population whose available flowers _____.",
    stem: "Which choice most logically completes the text?",
    choices: [
      'change in species composition rapidly across the foraging season.',
      'are predominantly of mechanically complex shapes, such as those requiring specialized handling.',
      'consist mostly of simple, open blossoms accessible to a wide range of pollinators.',
      'offer significantly higher nectar rewards than typical wildflowers.'
    ],
    answer: 1,
    explanation: "The passage establishes that flower constancy is 'most pronounced in species whose flowers are mechanically complex to enter,' because each species' handling technique is a cost to switch. To find strong constancy, the botanist should study bees with complex flowers available — (B). (A) introduces seasonal turnover, irrelevant to the within-trip behavior described. (C) selects the case where, the passage says, bees switch freely — the opposite of strong constancy. (D) raises a reward dimension the passage never connects to constancy."
  },
  {
    id: 'q-satrw-hard-019',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'inferences',
    difficulty: 630,
    passage: "Most modern cookbooks date a recipe by the first appearance of its name in print. Food historian Ruta Karpinski has argued that this practice routinely overstates how new the dish actually is. Recipes circulated for generations in spoken form among cooks before they were ever written down, and even after writing became common, household manuscripts — kept by individual families and rarely shared — often record dishes decades before any printed cookbook does. A dish that appears, fully developed and with a settled name, in the first cookbook to mention it has therefore probably _____.",
    stem: "Which choice most logically completes the text?",
    choices: [
      'been invented by the author of that cookbook in the years immediately preceding its publication.',
      'circulated in spoken or manuscript form for some time before reaching print.',
      'been borrowed from a printed source in another language that historians have not yet identified.',
      'fallen out of use in households shortly after appearing in the printed cookbook.'
    ],
    answer: 1,
    explanation: "Karpinski's argument is that print is a lagging indicator: dishes circulated orally and in family manuscripts before reaching cookbooks. So a dish appearing 'fully developed and with a settled name' on its first printed mention almost certainly had earlier oral or manuscript life — (B). (A) is exactly what the passage warns against assuming. (C) introduces a foreign-source explanation the passage does not mention. (D) addresses what happens after print, not before, and is unsupported."
  },

  // ===== COMMAND OF EVIDENCE (4) =====
  {
    id: 'q-satrw-hard-020',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'command-of-evidence',
    difficulty: 660,
    passage: "Sociologist Linnea Berg has proposed that the recent decline in U.S. teen driving rates reflects not a loss of interest in cars but a substitution: ride-hailing apps and improved public transit in many metropolitan areas have made it possible for teenagers to be mobile without holding a license. She predicts that the decline in licensure should be steepest in metropolitan areas where ride-hailing and transit alternatives are most developed, and shallow or absent in areas where those alternatives are not.",
    stem: "Which finding, if true, would most directly support Berg's hypothesis?",
    choices: [
      'A 2022 survey by Müller et al. of 1,400 U.S. teenagers found that the share who report wanting to learn to drive \"eventually\" has remained essentially unchanged since 2005.',
      'A 2021 Department of Transportation analysis found that teen licensure rates have fallen sharply in large metropolitan areas with extensive ride-hailing and transit, but have remained essentially flat in rural counties with neither.',
      'A 2020 industry report found that the average age at which Americans obtain a first driver\'s license has risen across all regions of the country since 2000.',
      'A 2019 study by Reyes and Park found that teenagers in cities with ride-hailing apps are more likely than teenagers elsewhere to be passengers in cars driven by adults.'
    ],
    answer: 1,
    explanation: "Berg's prediction is geographically specific: steepest decline where alternatives are most developed, shallow or absent where they are not. (B) reports exactly that pattern — sharp drops in metros with ride-hailing and transit, flat in rural counties without. (A) addresses interest in driving, not the geographic prediction. (C) is a uniform-across-regions finding that actually undercuts Berg's geographic contrast. (D) is about being a passenger in adult-driven cars, not about ride-hailing or transit substitution and not patterned to her geographic prediction."
  },
  {
    id: 'q-satrw-hard-021',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'command-of-evidence',
    difficulty: 690,
    passage: "Cognitive psychologist Hiroshi Tanaka has argued that the well-documented testing effect — the finding that retrieving information from memory strengthens later recall more than rereading the same information does — depends crucially on the difficulty of the retrieval. He predicts that retrieval which is too easy (e.g., when the answer is still fresh and obvious) should produce only modest gains over rereading, whereas retrieval that is effortful but ultimately successful should produce the largest gains.",
    stem: "Which finding, if true, would most directly support Tanaka's prediction?",
    choices: [
      'In a 2018 study by Müller et al., students who quizzed themselves three times spaced across a week recalled more material a month later than students who simply reread the text three times in one sitting.',
      'In a 2020 study by Okonkwo and Park, students who attempted to retrieve answers shortly after first encoding (when retrieval was easy) showed only small gains over rereading, while students whose retrieval was delayed enough to make it effortful — but who still recalled the material — showed substantially larger gains.',
      'In a 2017 study by Singh et al., students who reread their notes immediately before an exam scored slightly higher than students who took a self-test immediately before the exam.',
      'In a 2022 study by Lemaire and Costa, repeated retrieval was found to produce larger long-term recall gains than rereading across a wide range of subjects, including history, biology, and second-language vocabulary.'
    ],
    answer: 1,
    explanation: "Tanaka's prediction has two specific halves: easy retrieval = small gain over rereading; effortful-but-successful retrieval = large gain. (B) tests both halves directly with the matched comparison Tanaka requires. (A) shows a benefit of self-quizzing but does not contrast easy vs. effortful retrieval — it varies spacing. (C) is about a single immediate-test condition that does not isolate retrieval difficulty. (D) confirms that retrieval beats rereading across subjects, but says nothing about difficulty — the variable Tanaka's prediction turns on."
  },
  {
    id: 'q-satrw-hard-022',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'command-of-evidence',
    difficulty: 640,
    passage: "Marine ecologist Carolina Vega proposes that the decline in cod recruitment off the New England coast in the late 1990s was driven not principally by overfishing of adults but by a temperature-mediated reduction in the survival of cod larvae. She predicts that years with anomalously warm spring sea-surface temperatures should show much lower cod larval survival than years with cooler springs, and that this relationship should hold even after controlling for the size of the spawning adult population.",
    stem: "Which finding, if true, would most directly support Vega's hypothesis?",
    choices: [
      'A 2003 stock assessment found that the number of mature spawning cod in the region declined steadily through the 1990s, reaching historic lows by the decade\'s end.',
      'A 2015 study by Halloran et al. reported that haddock — a related groundfish — also showed reduced recruitment during the same period.',
      'A 2007 model of fisheries economics found that even modest reductions in catch limits would have allowed the cod stock to recover within a decade.',
      'A 2010 study by Olsen et al. found a strong negative correlation between spring sea-surface temperature and cod larval survival from 1980 to 2005, which remained statistically significant after the size of the spawning population was controlled for.'
    ],
    answer: 3,
    explanation: "Vega's prediction has two specific elements: (i) warm-spring years correlate with lower larval survival, (ii) the relationship survives controlling for adult spawning population size. (D) reports both directly. (A) addresses the spawning stock, which is the alternative explanation Vega is downplaying — and her prediction wants the temperature effect to remain after that variable is held constant. (C) is about recovery economics, not larval survival. (B) is suggestive of a shared environmental driver but does not test Vega's specific temperature mechanism."
  },
  {
    id: 'q-satrw-hard-023',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'command-of-evidence',
    difficulty: 670,
    passage: "Architectural historian Yusuf Demir has argued that the rapid spread of pointed-arch construction in twelfth-century western Europe was driven less by aesthetic preference than by the structural advantages the form offers in tall masonry walls. He predicts that the earliest pointed arches in any given region should appear in buildings whose walls are unusually tall for their date — where rounded arches would have transferred problematic lateral thrust — rather than in shorter buildings, where either form would suffice.",
    stem: "Which finding, if true, would most directly support Demir's hypothesis?",
    choices: [
      'In a 2019 survey of twelfth-century churches in northern France, the earliest pointed arches in each diocese were found in buildings whose nave walls exceeded the regional twelfth-century average by at least one-third.',
      'A 2014 study of medieval architectural treatises found that twelfth-century writers praised the visual elegance of the pointed arch.',
      'A 2021 review of cathedral construction documents found that pointed-arch and rounded-arch buildings cost roughly the same to construct in the twelfth century.',
      'A 2017 study found that pointed arches eventually became standard in nearly all major thirteenth-century European cathedrals, regardless of wall height.'
    ],
    answer: 0,
    explanation: "Demir's prediction is precise: the earliest pointed arches in a region should appear in unusually tall buildings, not in shorter ones. (A) confirms exactly that — earliest in each diocese were also tallest, exceeding the regional average by a third. (B) supports an aesthetic explanation, the alternative Demir is downplaying. (C) is about cost, not the height-driven structural argument. (D) describes thirteenth-century outcomes that postdate the pattern Demir's hypothesis is about."
  },

  // ===== BOUNDARIES (4) =====
  {
    id: 'q-satrw-hard-024',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 680,
    passage: "The team's two leading scorers — both rookies, both still adjusting to the professional game _____ combined for more than half of the team's points in the playoff series.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['—', ',', ';', ':'],
    answer: 0,
    explanation: "The sentence already opens a parenthetical with an em dash ('— both rookies, both still adjusting to the professional game'). To close that parenthetical and return to the main clause, the matched closer must also be an em dash. (A) is correct. (B) leaves the parenthetical without a matching closer, mixing dash and comma. (C) and (D) cannot close a dash-set parenthetical."
  },
  {
    id: 'q-satrw-hard-025',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 670,
    passage: "Ferguson's argument rests on a single, powerful claim _____ that any explanation of the financial crisis that does not place leveraged real-estate lending at the center cannot account for the timing of the collapse.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [',', ';', ':', ' —'],
    answer: 2,
    explanation: "What follows the blank is an elaboration that names and unpacks the 'single, powerful claim' just announced. A colon is the conventional choice for introducing such an elaboration after an independent clause that builds anticipation. (C) is correct. (A) is a comma splice — the second part is not a parenthetical or coordinator construction. (B) signals two independent equal-weight clauses, missing the announce-and-elaborate relationship. (D) (em dash with a leading space) is non-standard punctuation; even with the space removed, an em dash here would emphasize a break rather than the formal definition the colon supplies."
  },
  {
    id: 'q-satrw-hard-026',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 640,
    passage: "Although the gallery's curators initially hesitated to mount a retrospective of an artist whose career had spanned only seven _____ exhibition drew record crowds and was, by every measure the museum tracks, the most successful show of the season.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['years: the', 'years; the', 'years the', 'years, the'],
    answer: 3,
    explanation: "The sentence opens with a subordinate clause beginning 'Although...' that ends at 'years.' A subordinate clause attached to a main clause requires a comma at the join. (D) supplies that comma and continues correctly with 'the exhibition.' (B) misuses a semicolon, which can connect only two independent clauses (the 'Although' clause is dependent). (C) drops the necessary punctuation, producing a run-on. (A) misuses a colon: nothing in the first clause sets up the second as a definition, list, or quotation."
  },
  {
    id: 'q-satrw-hard-027',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 700,
    passage: "Tanaka's most influential paper — written in 1987, when he was still a graduate _____ argued that monetary policy works principally through household expectations rather than through the direct cost of credit.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['student,', 'student;', 'student—', 'student:'],
    answer: 2,
    explanation: "The parenthetical 'written in 1987, when he was still a graduate student' is opened with an em dash. The matched closer must also be an em dash. (C) is correct. (A) leaves the parenthetical mismatched (dash open, comma close). (B) cannot close a dash-set parenthetical. (D) cannot either; a colon introduces an elaboration of an independent clause and is not a parenthetical closer."
  },

  // ===== FORM, STRUCTURE, AND SENSE (3) =====
  {
    id: 'q-satrw-hard-028',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-and-sense',
    difficulty: 660,
    passage: "Working in cramped studios on the upper floors of converted warehouses, the painters of the Fourteenth Street School recorded the daily life of Depression-era New York with a directness that more academically trained artists, in their well-appointed studios uptown, _____.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['rarely match', 'were rarely matching', 'rarely matched', 'have rarely been matching'],
    answer: 2,
    explanation: "The sentence sets a Depression-era frame ('the painters of the Fourteenth Street School recorded... Depression-era New York' — simple past). The contrast clause about academically trained artists must sit in the same time frame, so a simple past form is required. 'Rarely matched' (C) is the simple past parallel to 'recorded.' (A) drifts into the present tense without warrant. (B) and (D) use progressive aspect, which implies ongoing matching activity inappropriate for the bounded historical period under discussion."
  },
  {
    id: 'q-satrw-hard-029',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-and-sense',
    difficulty: 700,
    passage: "Founded in 1832 to train freed people in trades that white-run institutions refused to teach, the Hampton Institute and its sister schools across the upper South _____ a network of educational opportunity that, despite chronic underfunding, persisted long after Reconstruction collapsed.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['establishes', 'has established', 'establish', 'established'],
    answer: 3,
    explanation: "The participial phrase 'Founded in 1832...' fixes the action in the past. The compound subject 'the Hampton Institute and its sister schools' takes a plural verb in the simple past: 'established.' (D) is correct. (A) is singular ('establishes' would also be present tense, doubly wrong). (B) is present perfect, which would imply continuing relevance up to the present and conflicts with the bounded post-Reconstruction frame. (C) is present tense, which clashes with 'Founded in 1832.'"
  },
  {
    id: 'q-satrw-hard-030',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-and-sense',
    difficulty: 650,
    passage: "Reviewing the manuscript late into the night, _____ struck not by the originality of the central argument but by the patient way each paragraph anticipated and disarmed the standard objections.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['the editor was', 'it was the editor who was', 'the manuscript was', 'there was an editor who was'],
    answer: 0,
    explanation: "The opening modifier 'Reviewing the manuscript late into the night' must attach to a person who can do the reviewing. The subject of the main clause must therefore be that person, and the simplest correct attachment is 'the editor was struck...' — option (A). (C) creates a dangling modifier, since a manuscript cannot review itself. (B) and (D) technically place 'the editor' in the sentence but bury her inside an existential or cleft construction so that she is not the grammatical subject of the main clause; the modifier still attaches awkwardly to 'it' or 'there.' Standard usage prefers the direct subject attachment in (A)."
  }
]);
