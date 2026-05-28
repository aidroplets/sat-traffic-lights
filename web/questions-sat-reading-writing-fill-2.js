/**
 * SAT Reading & Writing — fill batch 2 (50 more questions, distinct
 * from the prior 85 in questions-sat-reading-writing.js and
 * questions-sat-reading-writing-fill.js).
 *
 * testType: 'SAT' (set explicitly on each question)
 * section: 'reading-writing'
 *
 * Concatenates onto window.STL_QUESTIONS_AI.
 */
'use strict';

window.STL_QUESTIONS_AI = (window.STL_QUESTIONS_AI || []).concat([
  // ===== WORDS IN CONTEXT (6) =====
  {
    id: 'q-satrw-fill2-001',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 460,
    passage: "When the city council first proposed building a light-rail line, residents were skeptical. Two decades later, daily ridership has surpassed every projection, and even early opponents now _____ that the system has reshaped the region for the better.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['concede', 'predict', 'demand', 'forget'],
    answer: 0,
    explanation: "Early opponents grudgingly admitting they were wrong is captured by 'concede.' 'Predict' (B) is forward-looking, but the change has already happened. 'Demand' (C) doesn't fit reluctant agreement. 'Forget' (D) makes no sense — they remember and now agree."
  },
  {
    id: 'q-satrw-fill2-002',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 580,
    passage: "Although Marisol's first novel sold modestly, critics praised the precision of its prose. By her third book, what once seemed like quiet craft had grown more _____: long sentences spilled across pages, and characters paused for half a chapter to consider a single memory.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['restrained', 'expansive', 'derivative', 'tentative'],
    answer: 1,
    explanation: "The text contrasts early 'precision' with later writing that sprawls — long sentences, half-chapter pauses. 'Expansive' captures this widening. 'Restrained' (A) is the opposite. 'Derivative' (C) means imitative, not in the text. 'Tentative' (D) means hesitant, also unsupported."
  },
  {
    id: 'q-satrw-fill2-003',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 670,
    passage: "Ecologist Yuki Tanaka warns that conservation policies often treat species as if they existed in isolation. In practice, she argues, removing a single predator can _____ effects throughout an ecosystem — altering prey populations, plant communities, and even soil chemistry in ways that take decades to fully appear.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['contain', 'reverse', 'cascade', 'localize'],
    answer: 2,
    explanation: "Tanaka describes effects spreading through multiple levels of the system over time. 'Cascade' captures a chain of downstream consequences. 'Contain' (A) and 'localize' (D) suggest limiting the spread — the opposite. 'Reverse' (B) misreads — the changes go forward, not backward."
  },
  {
    id: 'q-satrw-fill2-004',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 480,
    passage: "The director's instructions to her cast were unusually _____: she gave them only a setting, a relationship, and a single emotional beat to hit, then asked them to invent the rest of the scene themselves.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['detailed', 'aggressive', 'rehearsed', 'sparse'],
    answer: 3,
    explanation: "The director gave 'only' three small inputs and asked actors to invent the rest — minimal direction. 'Sparse' fits. 'Detailed' (A) is the opposite. 'Aggressive' (B) and 'rehearsed' (C) describe a quality not in the text."
  },
  {
    id: 'q-satrw-fill2-005',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 590,
    passage: "Critics of the proposed tax cut argued that its benefits, despite being advertised as broad-based, would in fact _____ on a small number of high-income households, leaving most middle-income families with negligible gains.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['concentrate', 'depend', 'diminish', 'reflect'],
    answer: 0,
    explanation: "Critics say the benefits would cluster among a 'small number' of households rather than spreading. 'Concentrate on' captures this clustering. 'Depend on' (B) shifts meaning to causation. 'Diminish on' (C) is non-idiomatic and wrong-direction. 'Reflect on' (D) means to think over."
  },
  {
    id: 'q-satrw-fill2-006',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 690,
    passage: "Historian Devon Ashworth's reassessment of the eighteenth-century pamphleteers does not so much overturn earlier accounts as _____ them: where his predecessors saw a unified rhetorical movement, Ashworth identifies dozens of internal disagreements that prior scholars had smoothed over but rarely erased outright.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['discredit', 'complicate', 'corroborate', 'paraphrase'],
    answer: 1,
    explanation: "The 'not so much... as' structure rules out simple overturning; Ashworth adds internal disagreement that earlier work 'smoothed over.' 'Complicate' captures this — making the picture messier without rejecting it. 'Discredit' (A) is the overturning he isn't doing. 'Corroborate' (C) means confirm. 'Paraphrase' (D) means restate."
  },

  // ===== CENTRAL IDEAS (5) =====
  {
    id: 'q-satrw-fill2-007',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 470,
    passage: "Long before refrigeration, communities along the Mediterranean preserved fish by salting and drying it in the sun. The technique kept protein available through winter months, allowed fishers to sell their catch in distant inland markets, and reshaped trade routes across the region. Salt-cured fish, in short, was less a humble food than a piece of economic infrastructure.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Modern refrigeration has made traditional fish-curing techniques obsolete.',
      'Mediterranean fishers preferred salting fish to other methods of preservation.',
      'Salt-curing fish supported nutrition and trade in ways that gave the practice broad economic significance.',
      'The flavor of cured fish improved as drying techniques became more sophisticated.'
    ],
    answer: 2,
    explanation: "The text moves from a preservation technique to its economic ripple effects, ending with the explicit claim that cured fish was 'economic infrastructure.' (C) captures this. (A) and (D) introduce ideas not in the text. (B) is a narrow detail, not the main idea."
  },
  {
    id: 'q-satrw-fill2-008',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 560,
    passage: "Engineers designing wind turbines once sought to extract as much energy from each gust as possible. More recent designs, however, deliberately let some wind pass unharvested. The reason is durability: turbines pushed to their theoretical maximum break down sooner and require expensive maintenance. Letting some energy slip through, paradoxically, raises a turbine's lifetime output.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Wind turbines are now less efficient than they used to be.',
      'Maintenance costs are the largest single expense in operating a wind farm.',
      'Engineers have shifted from designing turbines for raw per-gust output to designing them for longevity, which raises lifetime output.',
      'Modern turbines extract more energy per gust than older models.'
    ],
    answer: 2,
    explanation: "The text contrasts an older 'extract as much as possible per gust' approach with newer designs that sacrifice peak extraction for durability and higher lifetime output. (C) names this shift. (A) misreads — efficiency over a turbine's life is higher, not lower. (B) is unsupported. (D) flatly contradicts the text."
  },
  {
    id: 'q-satrw-fill2-009',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 600,
    passage: "Until the 1970s, archaeological surveys of the American Southwest tended to focus on monumental sites: large pueblos, ceremonial complexes, distinctive rock art. The smaller scatter of broken pottery and hearths between those sites was often passed over. A new generation of researchers has argued that those overlooked traces, taken together, may reveal more about everyday life than the monuments ever did.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Recent archaeologists argue that small, mundane traces deserve attention because they may illuminate daily life better than monumental sites do.',
      'Monumental sites in the Southwest have been thoroughly excavated.',
      'Broken pottery is the most common artifact found at Southwestern sites.',
      'Older archaeological methods produced unreliable conclusions about ceremonial life.'
    ],
    answer: 0,
    explanation: "The text contrasts an old monument-focused approach with a new view that values mundane traces. (A) captures the new claim. (B) and (C) are unsupported assertions. (D) overstates — the text says older work overlooked, not that it was unreliable about what it did study."
  },
  {
    id: 'q-satrw-fill2-010',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 670,
    passage: "Composer Ana Lima has spent two decades writing music that combines Western orchestral instruments with traditional Brazilian percussion. Critics sometimes describe her work as 'fusion,' a label she gently resists. The word, she says, suggests two complete traditions being stirred together; her own pieces, by contrast, treat the two as already entangled — as parts of a single musical world she grew up inside.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Lima believes that Western orchestral music is more sophisticated than Brazilian percussion.',
      "Lima rejects the 'fusion' label because it implies a separation between traditions she experiences as already unified.",
      'Lima has stopped using Western orchestral instruments in her recent work.',
      "Critics have failed to recognize Lima's contributions to Brazilian music."
    ],
    answer: 1,
    explanation: "Lima objects to 'fusion' because it presumes two separate traditions, while she sees them as one entangled world. (B) captures this. (A) reverses her stance. (C) is unsupported. (D) is a complaint she doesn't make."
  },
  {
    id: 'q-satrw-fill2-011',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 740,
    passage: "Philosopher Karim Hassan has argued that the standard distinction between 'theoretical' and 'applied' research distorts how knowledge actually develops. Many of the discoveries we now classify as theoretical, he points out, were originally pursued in response to specific practical problems; many supposedly applied breakthroughs, in turn, depended on questions no one could yet say were useful. To insist on the distinction is to invent a tidy history that the science itself never had.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Hassan argues that applied research is generally more valuable than theoretical research.',
      'Hassan urges scientists to abandon practical problems and focus on theory.',
      "Hassan claims that the theoretical/applied divide is a retrospective fiction that misrepresents how scientific work actually unfolds.",
      'Hassan believes that most scientific breakthroughs of the past century have been applied rather than theoretical.'
    ],
    answer: 2,
    explanation: "Hassan's main claim is that the distinction itself is a tidy invention — a 'fiction' applied after the fact. (C) captures this. (A) and (B) misread him as taking a side within the divide. (D) attributes a historical tally he doesn't make."
  },

  // ===== EVIDENCE (5) =====
  {
    id: 'q-satrw-fill2-012',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 490,
    passage: "A high-school teacher hypothesized that students who read the assigned chapter before class would score higher on weekly quizzes than students who read it only afterward. To test this, she compared quiz scores for two groups of students over a semester.",
    stem: "Which finding, if true, would most directly support the teacher's hypothesis?",
    choices: [
      'Students reported enjoying the class discussions more when they had read the chapter beforehand.',
      'Students who read after class said they understood the chapter better.',
      'Both groups eventually finished the textbook by the end of the semester.',
      "Students who read before class scored, on average, twelve points higher on the weekly quizzes than students who read after class."
    ],
    answer: 3,
    explanation: "The hypothesis is about quiz scores; (D) compares the two groups' quiz scores directly and shows the predicted difference. (A) and (B) measure self-reported feelings, not scores. (C) measures completion, not performance."
  },
  {
    id: 'q-satrw-fill2-013',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 560,
    passage: "A city's transit agency claims that adding express buses on the busiest commuter route has reduced average travel times for all riders on that route, not just those using the express service.",
    stem: "Which finding would most directly support the agency's claim?",
    choices: [
      "Average end-to-end travel time on the route fell after the express buses were introduced, including for riders on local-service buses.",
      'Express buses on the route have higher ridership than the local buses.',
      'Riders on the express buses report higher satisfaction than local-bus riders.',
      'The agency hired additional drivers to staff the new express buses.'
    ],
    answer: 0,
    explanation: "The claim is about travel times for ALL riders. (A) shows the predicted decline including the local-bus riders. (B) measures usage. (C) measures satisfaction. (D) is operational, not outcome."
  },
  {
    id: 'q-satrw-fill2-014',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 620,
    passage: "A pediatric researcher proposed that children who participate in group sports for at least three hours per week develop stronger emotional regulation skills than children who do not. To test this, she administered a standardized emotional regulation assessment to two hundred ten-year-olds whose weekly sports participation had been tracked for two years.\n\nResults: Children with at least three hours of weekly group-sports participation scored, on average, 14 points higher on the assessment than children with less than one hour. Children with one to three hours scored 6 points higher than the low-participation group.",
    stem: "Which choice most effectively uses data from the results to support the researcher's hypothesis?",
    choices: [
      'All children in the study scored within a normal range on the assessment.',
      "Children meeting the three-hour threshold scored 14 points higher than low-participation peers, with intermediate participation showing a smaller 6-point gap — a pattern consistent with the researcher's prediction.",
      'Group sports are the only activity that improves emotional regulation.',
      'High-participation children may have had stronger skills before joining group sports.'
    ],
    answer: 1,
    explanation: "(B) cites the specific 14-point and 6-point gaps and ties them to the hypothesis. (A) is irrelevant to the comparison. (C) overgeneralizes beyond the study. (D) raises a confound but does not 'support' the hypothesis."
  },
  {
    id: 'q-satrw-fill2-015',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 680,
    passage: "An ecologist proposed that beavers reintroduced to a degraded watershed would increase the diversity of fish species downstream by creating ponds and slow-water habitats. To test this, her team surveyed fish populations at twelve downstream sites, six of which were below newly established beaver dams and six of which were not.",
    stem: "Which finding would most directly support the ecologist's hypothesis?",
    choices: [
      'Water temperatures were slightly cooler at sites below beaver dams.',
      'The number of beavers in the watershed has increased over the study period.',
      "Sites below beaver dams supported, on average, 40 percent more fish species than the comparison sites.",
      'Local anglers reported greater satisfaction at sites below beaver dams.'
    ],
    answer: 2,
    explanation: "The hypothesis is about fish-species diversity downstream. (C) directly compares species counts between dam and non-dam sites — the exact prediction. (A) measures temperature. (B) measures beaver count, not the predicted effect on fish. (D) is opinion."
  },
  {
    id: 'q-satrw-fill2-016',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 600,
    passage: "Some labor economists have argued that requiring two weeks of advance scheduling notice for hourly workers improves attendance without harming employer flexibility. A 2024 study compared attendance and labor-cost data for one hundred retail stores in a state that recently passed such a law against one hundred similar stores in a neighboring state without the law, over two years.\n\nResults: Unscheduled absences fell by 18 percent in the law-state stores relative to the comparison stores. Total labor costs rose by 0.4 percent in the law-state stores — a difference that did not reach statistical significance.",
    stem: "Which choice most effectively uses the data to evaluate the economists' argument?",
    choices: [
      "The data refute the argument: labor costs rose in the law-state stores.",
      "The data are inconclusive because no worker satisfaction was measured.",
      "The data fully prove the argument because attendance improved.",
      "The data are consistent with the argument: absences fell substantially while the small rise in labor costs was not statistically significant, suggesting attendance gains came without a meaningful cost penalty."
    ],
    answer: 3,
    explanation: "(D) accurately handles both prongs of the argument: attendance improved AND the cost rise was not statistically significant — exactly what the economists predicted. (A) overweights a non-significant result. (C) overstates from one variable. (B) demands a measure outside the argument."
  },

  // ===== TEXT STRUCTURE (5) =====
  {
    id: 'q-satrw-fill2-017',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 460,
    passage: "Many people picture honeybees as the only important pollinators, but native bees — bumblebees, mason bees, sweat bees, and dozens of others — actually do most of the pollination work in many North American ecosystems. Conservation programs that focus solely on honeybee hives can miss the broader pollinator decline that threatens these less famous species.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      'It identifies a popular misconception and then explains a broader reality that the misconception obscures.',
      'It compares the lifecycles of two species of bees.',
      "It explains why honeybee populations are growing.",
      'It traces the history of beekeeping in North America.'
    ],
    answer: 0,
    explanation: "The text opens with what 'many people picture' and corrects it ('but native bees... actually do most...'), then notes a downstream blind spot. (A) tracks this misconception-then-correction structure. (B), (C), and (D) describe content not in the text."
  },
  {
    id: 'q-satrw-fill2-018',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 540,
    passage: "For decades, urban planners assumed that wider roads would reduce traffic congestion. Studies of cities that added lanes, however, consistently found the opposite: within a few years, congestion returned to previous levels and often grew worse. The phenomenon, now called 'induced demand,' shows that when driving becomes easier, more people drive, and the new capacity is quickly absorbed.",
    stem: "Which choice best describes the function of the third sentence in the text as a whole?",
    choices: [
      'It introduces a counterexample that complicates the studies described in the second sentence.',
      "It names and explains the phenomenon documented in the first two sentences.",
      'It proposes a policy solution to congestion.',
      'It questions the reliability of the studies cited earlier.'
    ],
    answer: 1,
    explanation: "The third sentence labels what the prior sentences described and gives the mechanism. (B) captures this naming-and-explaining role. (A) misreads it as a counterexample. (C) and (D) describe moves the sentence does not make."
  },
  {
    id: 'q-satrw-fill2-019',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 620,
    passage: "Linguist Priya Singh's recent study of speech rates across languages began as an attempt to settle a long-standing debate: do speakers of 'fast' languages like Japanese actually convey information more quickly than speakers of 'slow' languages like Mandarin? Her data showed they do not. The fast-language speakers used more syllables per second, but each syllable carried less information, so the rate at which meaning was transmitted came out roughly equal.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      'It introduces a long-standing debate, presents a study designed to settle it, and reports the study\'s surprising answer.',
      'It compares two competing theories of language acquisition.',
      'It defends Japanese against the charge of being a fast language.',
      "It traces the historical development of speech-rate research."
    ],
    answer: 0,
    explanation: "The text frames a debate, names the study, and gives the unexpected resolution. (A) tracks this. (B) and (D) describe moves not made. (C) misreads — the text isn't defending Japanese; it's reporting an information-rate finding."
  },
  {
    id: 'q-satrw-fill2-020',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 690,
    passage: "Architectural historians once treated the modest brick warehouses of nineteenth-century port cities as utilitarian leftovers — buildings worth preserving only as background to grander structures. A more recent generation of scholars has begun to reverse that judgment. The warehouses, they argue, embody distinctive engineering solutions to load, ventilation, and fire risk that the showier buildings of the period rarely had to confront. To overlook them is to study the period's architecture without its largest body of evidence.",
    stem: "Which choice best describes the function of the third sentence in the text as a whole?",
    choices: [
      'It introduces a piece of evidence supporting the older view described in the first sentence.',
      'It restates the older view in more technical language.',
      'It restates the recent scholars\' position by giving the substantive reasons behind their reassessment.',
      'It proposes a new theory not held by the recent scholars.'
    ],
    answer: 2,
    explanation: "The third sentence ('they argue...') unpacks WHY the recent scholars value the warehouses. (C) captures this elaboration of the reassessment. (A) reverses the stance. (B) misreads it as restating the old view. (D) misattributes."
  },
  {
    id: 'q-satrw-fill2-021',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 750,
    passage: "When biographer Lila Okonkwo set out to write about the chemist Rosalind Franklin, she expected her main task to be correcting decades of underacknowledgment. The archival record, however, surprised her. Franklin's contributions had been recognized — sometimes generously — by colleagues during her lifetime; the underacknowledgment came mostly later, in the popular retellings that hardened in the 1970s. Okonkwo's book ended up tracing not the original neglect but the slow construction of a misleading legend.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      "It describes a biographer who began with one question and, after the evidence pushed back, ended up writing about a different question entirely.",
      'It argues that Franklin received less credit than she deserved during her lifetime.',
      "It compares two biographies of Franklin.",
      'It explains why Okonkwo abandoned her project.'
    ],
    answer: 0,
    explanation: "The text shows Okonkwo's expected project, the archival surprise, and the resulting shift to a different inquiry. (A) tracks this. (B) is the opposite of what the archives showed. (C) describes a comparison not made. (D) misreads — the project was completed, not abandoned."
  },

  // ===== CROSS-TEXT (4) =====
  {
    id: 'q-satrw-fill2-022',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 570,
    passage: "Text 1: Education researcher Adaeze Onyeka argues that homework in elementary school produces little measurable academic benefit. Studies she reviews show essentially no correlation between homework hours and test scores for children under twelve, while families report meaningful stress around evening assignments. She concludes that schools should sharply reduce or eliminate homework in those grades.\n\nText 2: Teacher educator Rafael Mendes accepts Onyeka's data but draws a different conclusion. Test scores, he writes, are a narrow measure. Even if homework doesn't move them in the short term, the routine of completing small daily tasks at home helps children build self-management habits that pay off in middle and high school — benefits a one-year correlation simply cannot capture.",
    stem: "Based on the texts, how would Mendes (Text 2) most likely respond to Onyeka's conclusion in Text 1?",
    choices: [
      'By disputing the studies Onyeka cites and offering contrary evidence on test scores.',
      'By arguing that family stress is the primary issue and outweighs any other concerns.',
      'By agreeing that homework should be eliminated in elementary school.',
      "By accepting her evidence about test scores but arguing that other long-term benefits make her policy conclusion premature."
    ],
    answer: 3,
    explanation: "Mendes accepts the data but disputes the conclusion by pointing to longer-term self-management benefits a short-window study can't capture. (D) matches. (A) wrongly says he disputes the data. (C) is the opposite of his stance. (B) misreads — he downplays the family-stress angle."
  },
  {
    id: 'q-satrw-fill2-023',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 640,
    passage: "Text 1: Curator Diane Holloway has championed traveling exhibitions as a way to bring great works of art to audiences who cannot easily visit major museums. Loans, she argues, democratize access; the slight risk to objects in transit is more than balanced by the cultural reach achieved.\n\nText 2: Conservator Ibrahim Adetokunbo agrees that broader access matters but raises a quieter concern. Each transit cycle — packing, unpacking, climate fluctuation, vibration — incrementally damages even well-protected objects. The damage is invisible at first but accumulates across decades. The question, he suggests, is not whether to lend at all but how often a single object should be moved before its lifetime should be considered effectively spent.",
    stem: "Based on the texts, how would Adetokunbo (Text 2) most likely respond to Holloway's argument in Text 1?",
    choices: [
      'By denying that traveling exhibitions reach new audiences.',
      'By agreeing fully and proposing more aggressive lending schedules.',
      "By accepting the value of access while asking Holloway to consider how often each object can sustainably be moved.",
      'By insisting that objects should never leave their home museums.'
    ],
    answer: 2,
    explanation: "Adetokunbo grants the access point ('agrees that broader access matters') but raises cumulative damage and asks how often is too often. (C) captures this both/and stance. (A), (B), and (D) each overshoot in one direction or another."
  },
  {
    id: 'q-satrw-fill2-024',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 680,
    passage: "Text 1: Economist Hana Park argues that universal basic income (UBI) trials in mid-sized cities have produced encouraging results: recipients showed improved health metrics, slightly higher employment, and lower rates of household financial distress. She views these findings as strong evidence that a national program would work.\n\nText 2: Economist Marcus Greene reviews the same trials and offers a narrower reading. The improvements, he notes, depended partly on the trials being small: surrounding labor markets, prices, and rents were unaffected by the limited cash injection. A nationwide program, he warns, could shift those broader conditions in ways that might erode or even reverse the very gains the trials reported.",
    stem: "Based on the texts, how would Greene (Text 2) most likely respond to Park's conclusion in Text 1?",
    choices: [
      'By rejecting Park\'s data on the grounds that the trials were too small to measure anything reliably.',
      'By agreeing that a national UBI program would clearly produce the same gains.',
      'By denying that recipients in the trials experienced any improvements.',
      "By accepting the trial results but warning that they may not extrapolate cleanly to a nationwide program with broader market effects."
    ],
    answer: 3,
    explanation: "Greene accepts the trial findings ('reviews the same trials') but argues the small-scale conditions don't transfer to a national program. (D) captures this scale-of-evidence concern. (A) misstates — he doesn't reject the data. (B) is Park's stance. (C) flatly denies what the trials showed."
  },
  {
    id: 'q-satrw-fill2-025',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 740,
    passage: "Text 1: Literary critic Helena Vargas argues that contemporary poetry's turn toward autobiographical, first-person work represents a narrowing of the form. By tying meaning so tightly to a particular speaker's experience, she writes, today's poetry forecloses the imaginative range earlier traditions cultivated through invented voices and dramatic monologue.\n\nText 2: Poet-critic Naveen Rao does not deny that first-person work dominates current poetry, but he resists Vargas's verdict. The 'first person' in serious contemporary practice, he argues, is rarely a transparent autobiographical I; it is itself a constructed voice — selected, edited, sometimes wholly invented — that performs many of the functions Vargas attributes to dramatic monologue. The narrowing she describes, in short, exists more in the label than in the work.",
    stem: "Based on the texts, how would Rao (Text 2) most likely respond to Vargas's claim in Text 1?",
    choices: [
      "By granting that first-person work dominates current poetry while disputing the claim that this dominance constitutes a narrowing of the form.",
      'By agreeing fully with Vargas and adding examples of overly autobiographical poems.',
      'By denying that first-person poems are common in current practice.',
      "By arguing that dramatic monologue is no longer a valid poetic form."
    ],
    answer: 0,
    explanation: "Rao concedes the prevalence of first-person work but argues the 'I' is constructed and does the work Vargas misses. (A) captures the concession + dispute structure. (B) is the opposite. (C) denies the prevalence he explicitly grants. (D) reverses his actual point about dramatic monologue."
  },

  // ===== BOUNDARIES (8) =====
  {
    id: 'q-satrw-fill2-026',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 460,
    passage: "After three rounds of revision, the architect finally finished the design _____ submitted it to the planning commission for approval.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['design, and she', 'design and', 'design; she', 'design she'],
    answer: 1,
    explanation: "Two verbs ('finished' and 'submitted') share one subject ('the architect'), so a coordinating conjunction without a comma joins them as a compound predicate. (B) is correct. (A) introduces an unneeded second subject. (C) creates two independent clauses with a redundant subject. (D) is a run-on."
  },
  {
    id: 'q-satrw-fill2-027',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 480,
    passage: "Although the storm caused widespread damage along the _____ the harbor itself remained largely _____ thanks to a seawall completed only the year before.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['coast, and; intact and', 'coast,; intact;', 'coast,; intact,', 'coast;; intact'],
    answer: 2,
    explanation: "The first blank ends a subordinate clause ('Although...'), so a comma is needed to attach it to the main clause. The second blank ends an independent clause that is then completed by a participial phrase, so a comma is correct. (C) supplies both commas. (A), (B), and (D) misuse semicolons or add an unneeded conjunction."
  },
  {
    id: 'q-satrw-fill2-028',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 530,
    passage: "Marine biologist Inez Dawodu has spent two decades studying coral reef _____ her most recent project focuses on reef resilience after bleaching events.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['ecosystems and', 'ecosystems,', 'ecosystems', 'ecosystems;'],
    answer: 3,
    explanation: "Two complete independent clauses ('Dawodu has spent... ecosystems' and 'her most recent project focuses...') need a stop. A semicolon (D) correctly joins closely related independent clauses. (A) is a run-on with only 'and.' (B) is a comma splice. (C) is a fused sentence."
  },
  {
    id: 'q-satrw-fill2-029',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 560,
    passage: "The committee's final report — a document running more than four hundred _____ on a single recommendation: that the agency rebuild its data infrastructure from scratch.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['pages — converged', 'pages, converged', 'pages converged', 'pages; converged'],
    answer: 0,
    explanation: "The phrase 'a document running... pages' is a parenthetical inserted with an em dash; it must close with a matching em dash before the main verb 'converged.' (A) supplies the matching dash. (B) mismatches dash and comma. (C) drops the closing punctuation. (D) wrongly puts a semicolon mid-clause."
  },
  {
    id: 'q-satrw-fill2-030',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 590,
    passage: "Ojibwe author Louise Erdrich, whose novels often draw on her family's experiences in the upper Midwest, runs an independent _____ Birchbark Books, in Minneapolis.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['bookstore;', 'bookstore,', 'bookstore', 'bookstore:'],
    answer: 1,
    explanation: "The store name 'Birchbark Books' is a nonrestrictive appositive renaming 'bookstore,' so it should be set off with a comma (and the closing comma already after 'Books'). (B) is correct. (A) and (D) wrongly impose a stop or list-introducer mid-clause. (C) drops needed punctuation."
  },
  {
    id: 'q-satrw-fill2-031',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 660,
    passage: "When violinist Hilary Hahn revisited the unaccompanied works of Bach in her 2018 _____ she said in interviews that she approached the pieces as if encountering them for the first time.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['recording and', 'recording;', 'recording,', 'recording'],
    answer: 2,
    explanation: "The opening 'When... recording' is a long introductory subordinate clause that requires a comma before the main clause begins ('she said'). (C) supplies it. (A) creates a fused construction with no main clause. (B) wrongly stops mid-sentence. (D) is a run-on."
  },
  {
    id: 'q-satrw-fill2-032',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 690,
    passage: "Three of the festival's headliners — a violinist from Seoul, a percussionist from _____ a vocalist from Lagos — appeared on the same stage for the closing performance.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['Buenos Aires, and', 'Buenos Aires and', 'Buenos Aires; and', 'Buenos Aires —, and'],
    answer: 0,
    explanation: "The em-dash interruption contains an internal list of three appositives. Within the list, items separated by commas with 'and' before the last item is standard. (A) is correct. (B) drops the serial comma but more importantly creates list ambiguity given the dash; (C) inserts an unneeded semicolon. (D) doubles dash and comma incorrectly."
  },
  {
    id: 'q-satrw-fill2-033',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 740,
    passage: "Critics have long disagreed about the meaning of the novel's enigmatic final scene; some read it as a quiet act of forgiveness, _____ as a deliberate refusal to forgive at all.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['others, however,', 'others however', 'others; however,', 'and others, however'],
    answer: 0,
    explanation: "After the semicolon ends one independent clause, the second half is a parallel fragment-style continuation: 'some read it as X, others [read it] as Y.' 'However' between commas appears as an interrupter inside the second branch. (A) handles this correctly. (B) drops needed commas around 'however.' (C) creates a third independent clause requiring a verb that isn't there. (D) introduces a coordinating conjunction that the prior semicolon already replaced."
  },

  // ===== FORM, STRUCTURE, AND SENSE (8) =====
  {
    id: 'q-satrw-fill2-034',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 470,
    passage: "Each of the museum's three new galleries _____ a different period of South Asian sculpture, from the early Buddhist works to the late medieval bronzes.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['represent', 'represents', 'are representing', 'have represented'],
    answer: 1,
    explanation: "The subject 'each' is singular, taking a singular verb regardless of the prepositional phrase 'of the museum's three new galleries.' (B) 'represents' agrees. (A) and (C) treat the subject as plural. (D) shifts tense unnecessarily."
  },
  {
    id: 'q-satrw-fill2-035',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 490,
    passage: "By the time the next generation of telescopes comes online, astronomers _____ data from the current generation for nearly two decades.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['analyzed', 'analyze', 'will have been analyzing', 'are analyzing'],
    answer: 2,
    explanation: "The action begins now and continues up to a future reference point ('by the time... comes online'), which calls for the future perfect progressive. (C) is correct. (A) is simple past. (B) is simple present. (D) is present progressive — none captures the duration ending in the future."
  },
  {
    id: 'q-satrw-fill2-036',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 540,
    passage: "Although the new policy was intended to simplify hiring, its actual effect on the department's recruiters _____ to make the process more cumbersome.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['were', 'are', 'have been', 'was'],
    answer: 3,
    explanation: "The subject is the singular 'effect,' not 'recruiters.' Singular subject in past tense matching 'was intended' takes singular 'was.' (D) is correct. (A) and (C) are plural. (B) is plural and present tense."
  },
  {
    id: 'q-satrw-fill2-037',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 560,
    passage: "Among the architects whose work most clearly anticipated mid-century modernism _____ the Vienna-based designer Margarete Schütte-Lihotzky, whose 1926 Frankfurt Kitchen redefined domestic space.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['is', 'are', 'were', 'have been'],
    answer: 0,
    explanation: "Inverted sentence: the true subject ('Margarete Schütte-Lihotzky') is singular and follows the verb. (A) 'is' agrees. (B), (C), and (D) are plural and would only fit if multiple architects followed."
  },
  {
    id: 'q-satrw-fill2-038',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 580,
    passage: "The committee, after reviewing the proposals from each of the seven _____ to recommend that the city fund only the two with the strongest evaluation plans.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['departments, are voting', 'departments, voted', 'departments, were voting', 'departments voted'],
    answer: 1,
    explanation: "'The committee' is singular and the action is past, so 'voted' fits. The intervening phrase 'after reviewing... departments' is a participial modifier set off by commas — both commas needed. (B) supplies the second comma plus the correct singular past verb. (A) and (C) use plural verbs. (D) drops the closing comma."
  },
  {
    id: 'q-satrw-fill2-039',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 640,
    passage: "Walking carefully along the icy path, _____ noticed that several branches had snapped under the weight of the previous night's snowfall.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['the broken branches were obvious to her', 'her observations included broken branches', 'she', 'a number of broken branches were noted'],
    answer: 2,
    explanation: "The introductory participial phrase 'Walking carefully along the icy path' must modify the subject of the main clause — a person doing the walking. Only (C) supplies a person ('she') as the subject. (A), (B), and (D) all create dangling modifiers because they put non-walkers in the subject slot."
  },
  {
    id: 'q-satrw-fill2-040',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 670,
    passage: "Neither the lead engineer nor the project's three subcontractors _____ willing to accept responsibility for the delay, leaving the client with no clear party to hold accountable.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['was', 'is', 'has been', 'were'],
    answer: 3,
    explanation: "With 'neither... nor,' the verb agrees with the closer subject. The closer subject is 'the project's three subcontractors' — plural — so (D) 'were' agrees. (A), (B), and (C) are singular."
  },
  {
    id: 'q-satrw-fill2-041',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 590,
    passage: "If the delegation _____ the original draft of the treaty more carefully before signing, several of the disputes that emerged in the following decade might have been avoided.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: ['read', 'had read', 'would have read', 'reads'],
    answer: 1,
    explanation: "The sentence is a third-conditional construction: an unreal past condition tied to a past consequence. The if-clause requires the past perfect ('had read'); the result clause uses 'might have been avoided.' (B) is correct. (A) and (D) are wrong tenses. (C) wrongly puts the conditional 'would' inside the if-clause."
  },

  // ===== TRANSITIONS (5) =====
  {
    id: 'q-satrw-fill2-042',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 480,
    passage: "Most birds rely on visual cues to migrate, following coastlines, mountain ranges, and stars. _____ some species, including certain warblers, appear to use Earth's magnetic field as well, allowing them to navigate even on overcast nights.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ['Therefore,', 'However,', 'For example,', 'In summary,'],
    answer: 1,
    explanation: "The first sentence describes the typical visual-cue strategy; the second introduces an exception. 'However' marks the contrast. 'Therefore' (A) wrongly suggests cause-effect. 'For example' (C) misframes the exception as a typical case. 'In summary' (D) misframes it as a wrap-up."
  },
  {
    id: 'q-satrw-fill2-043',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 550,
    passage: "Studies in the 1990s suggested that adults could not generate new neurons. More recent imaging and tracing techniques have shown that certain brain regions, especially the hippocampus, do produce new neurons throughout adulthood. _____ the once-confident claim that the adult brain is fixed has had to be substantially revised.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ['Nevertheless,', 'For instance,', 'As a result,', 'In contrast,'],
    answer: 2,
    explanation: "The third sentence states a downstream consequence of the new findings. 'As a result' marks this cause-effect link. 'Nevertheless' (A) and 'In contrast' (D) wrongly suggest opposition. 'For instance' (B) wrongly frames the revision as an example."
  },
  {
    id: 'q-satrw-fill2-044',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 600,
    passage: "Volcanic ash deposits offer geologists a powerful dating tool: each major eruption leaves a distinctive chemical signature in nearby sediment layers. _____ some volcanic regions produce ashes whose chemistry varies so little between eruptions that even careful analysis cannot reliably tell one event from another.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ['Likewise,', 'Furthermore,', 'For example,', 'Even so,'],
    answer: 3,
    explanation: "The first sentence touts ash as a 'powerful dating tool'; the second names a real limitation. 'Even so' acknowledges the strength while introducing the qualification. 'Likewise' (A) and 'Furthermore' (B) signal continuation, not contrast. 'For example' (C) wrongly treats the limitation as a confirming case."
  },
  {
    id: 'q-satrw-fill2-045',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 660,
    passage: "Public-health researchers have noted that simple interventions — handwashing campaigns, free vaccinations at pharmacies, text-message reminders — often deliver larger gains per dollar than expensive new treatments. _____ funding agencies tend to favor the high-cost interventions, partly because their effects on individual patients are easier to dramatize.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ['Yet', 'Therefore', 'Specifically', 'In fact'],
    answer: 0,
    explanation: "The second sentence reports behavior that runs counter to the first sentence's evidence. 'Yet' marks this counterintuitive contrast. 'Therefore' (B) wrongly implies the funding pattern follows from the evidence. 'Specifically' (C) and 'In fact' (D) signal elaboration or confirmation, not contradiction."
  },
  {
    id: 'q-satrw-fill2-046',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 730,
    passage: "Linguists once treated grammatical complexity as a rough proxy for a language's expressive power, assuming that languages with elaborate case systems and verb morphology could convey distinctions that simpler languages could not. Cross-linguistic work over the past three decades, however, has shown that languages compensate: what one language packs into morphology another distributes across word order, particles, or context. _____ the older assumption survives in popular accounts that still rank languages from 'simple' to 'complex.'",
    stem: "Which choice completes the text with the most logical transition?",
    choices: ['Consequently,', 'For example,', 'Likewise,', 'Despite this,'],
    answer: 3,
    explanation: "The third sentence reports that the popular ranking persists despite the contrary scholarly evidence in the second sentence. 'Despite this' marks that resistance-to-evidence relationship. 'Consequently' (A) wrongly implies the persistence follows from the new findings. 'For example' (B) and 'Likewise' (C) misframe the relationship as one of agreement."
  },

  // ===== RHETORICAL SYNTHESIS (4) =====
  {
    id: 'q-satrw-fill2-047',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'rhetorical-synthesis',
    difficulty: 520,
    passage: "While researching a presentation on community gardens, a student gathered the following notes:\n• Brookside Community Garden was founded in 2008 on a vacant lot in central Philadelphia.\n• It now grows produce on twelve raised beds.\n• In 2024 it donated more than 4,000 pounds of vegetables to nearby food pantries.\n• Volunteers from the surrounding neighborhood maintain the garden year-round.",
    stem: "The student wants to emphasize the garden's contribution to local food security. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      'Brookside Community Garden was founded in 2008 on a vacant lot in central Philadelphia and is maintained by neighborhood volunteers.',
      'In 2024, the twelve raised beds at Brookside Community Garden produced food year-round.',
      "Founded in 2008, Brookside Community Garden donated more than 4,000 pounds of vegetables from its twelve raised beds to nearby food pantries in 2024, helping address local food security.",
      'Brookside Community Garden, founded in 2008 in central Philadelphia, is maintained by volunteers from the surrounding neighborhood.'
    ],
    answer: 2,
    explanation: "The goal is to emphasize the garden's contribution to local food security. Only (C) names the donation amount and the recipients (food pantries) and ties them explicitly to food security. (A), (B), and (D) describe the garden but omit the donation evidence."
  },
  {
    id: 'q-satrw-fill2-048',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'rhetorical-synthesis',
    difficulty: 590,
    passage: "While drafting a paper on early film history, a student gathered the following notes:\n• 'A Trip to the Moon' (1902) was directed by Georges Méliès.\n• It runs about thirteen minutes — long for its era.\n• It uses elaborate hand-painted sets and trick photography.\n• Many film historians consider it one of the earliest examples of narrative science fiction in cinema.",
    stem: "The student wants to introduce the film to readers unfamiliar with early cinema. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "'A Trip to the Moon' is thirteen minutes long.",
      'Hand-painted sets and trick photography were used in 1902.',
      "Georges Méliès directed many films in the early twentieth century.",
      "Directed by Georges Méliès in 1902, 'A Trip to the Moon' is a thirteen-minute film often regarded as one of the earliest works of narrative science fiction in cinema."
    ],
    answer: 3,
    explanation: "An introduction for unfamiliar readers needs the title, director, year, length, and historical significance. (D) supplies all four cleanly. (A), (B), and (C) each include only one or two facts and would not orient a new reader."
  },
  {
    id: 'q-satrw-fill2-049',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'rhetorical-synthesis',
    difficulty: 660,
    passage: "While preparing a science-fair report, a student gathered the following notes about the Antarctic icefish:\n• The icefish (family Channichthyidae) lives in waters around Antarctica.\n• Unlike almost all other vertebrates, it has no hemoglobin in its blood.\n• Its blood is therefore nearly transparent.\n• It survives because cold Antarctic water holds more dissolved oxygen than warm water, and because the fish has an unusually large heart and wide blood vessels.",
    stem: "The student wants to highlight what makes the icefish biologically unusual. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      'Antarctic icefish are found in cold polar waters.',
      "The Antarctic icefish is biologically unusual in that, unlike nearly all other vertebrates, it lacks hemoglobin entirely; its nearly transparent blood is sustained by oxygen-rich cold water, an enlarged heart, and wide blood vessels.",
      'Cold polar water holds more dissolved oxygen than warm water.',
      'The icefish belongs to the family Channichthyidae.'
    ],
    answer: 1,
    explanation: "The goal is to highlight biological unusualness. (B) names the no-hemoglobin trait, the visible consequence (transparent blood), and the compensating mechanisms — the full picture of what makes the fish unusual. (A), (C), and (D) each give one supporting fact without explaining the unusual physiology."
  },
  {
    id: 'q-satrw-fill2-050',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'rhetorical-synthesis',
    difficulty: 600,
    passage: "While drafting a paper on urban heat, a student gathered the following notes:\n• Asphalt and dark roofing absorb solar energy and re-radiate it as heat.\n• City centers can run 5 to 10°F hotter than surrounding areas — the 'urban heat island' effect.\n• A 2024 study found that planting street trees in three pilot neighborhoods reduced average summertime surface temperatures by 4°F.\n• The same study found that painting roofs with reflective coatings reduced summertime surface temperatures by 3°F.",
    stem: "The student wants to argue that simple, low-cost interventions can meaningfully reduce urban heat. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      "City centers can run 5 to 10°F hotter than surrounding areas because asphalt and dark roofing absorb solar energy.",
      'A 2024 study examined two interventions in three pilot neighborhoods.',
      "Reflective roof coatings reduced summertime surface temperatures by 3°F in a 2024 study.",
      "A 2024 study showed that two simple interventions — planting street trees and applying reflective roof coatings — reduced summertime surface temperatures in pilot neighborhoods by 4°F and 3°F respectively, meaningfully countering an urban heat island effect that can otherwise reach 5 to 10°F."
    ],
    answer: 3,
    explanation: "The argument requires both the size of the problem and the magnitude of the interventions. Only (D) names both interventions, both magnitudes (4°F and 3°F), and contextualizes them against the 5–10°F urban heat island. (A) describes the problem only. (B) is too vague. (C) cites only one intervention."
  }
]);
