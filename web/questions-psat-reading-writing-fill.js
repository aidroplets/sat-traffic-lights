/**
 * PSAT Reading & Writing — fill batch.
 * testType: 'PSAT', section: 'reading-writing'.
 * Concatenates onto window.STL_QUESTIONS_PSAT.
 */
'use strict';
window.STL_QUESTIONS_PSAT = (window.STL_QUESTIONS_PSAT || []).concat([
  // ===== words-in-context (6) =====
  {
    id: 'q-psatrw-fill-001',
    state: 'live',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 380,
    stem: 'Although the museum displays only a small portion of its collection, the rest of its artifacts are not lost; they are merely ______ in climate-controlled storage rooms beneath the building.\n\nWhich choice completes the text with the most logical and precise word?',
    choices: ['discarded', 'invented', 'destroyed', 'stored'],
    answer: 3,
    explanation: '"Stored" matches the cue phrase "in climate-controlled storage rooms" and contrasts with "lost." Distractors: "discarded" and "destroyed" contradict the cue that the artifacts still exist; "invented" makes no sense for existing objects.'
  },
  {
    id: 'q-psatrw-fill-002',
    state: 'live',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 540,
    stem: 'Marine biologist Lina Okafor argues that octopuses are far more ______ than previously believed: in laboratory tests, individuals readily learn to open jars, navigate mazes, and even mimic the behavior of their tank-mates.\n\nWhich choice completes the text with the most logical and precise word?',
    choices: ['aggressive', 'colorful', 'cooperative', 'intelligent'],
    answer: 3,
    explanation: '"Intelligent" fits the listed evidence (learning, navigating, mimicking — all cognitive feats). Distractors: "aggressive," "colorful," and "cooperative" describe traits the evidence does not support.'
  },
  {
    id: 'q-psatrw-fill-003',
    state: 'live',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 530,
    stem: 'The senator\'s response to the proposal was deliberately ______: rather than commit to a position, she offered vague phrases that could be interpreted to support either side.\n\nWhich choice completes the text with the most logical and precise word?',
    choices: ['enthusiastic', 'detailed', 'ambiguous', 'hostile'],
    answer: 2,
    explanation: '"Ambiguous" matches "vague phrases" that could mean either thing. Distractors: "enthusiastic" and "detailed" contradict the senator\'s evasiveness; "hostile" overstates and ignores the dual-interpretation cue.'
  },
  {
    id: 'q-psatrw-fill-004',
    state: 'live',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 620,
    stem: 'Linguist Hadiya Rao notes that what may seem like an ______ feature of English spelling — its many silent letters — actually preserves a fossil record of the language\'s history, marking sounds that were once pronounced but have since fallen away.\n\nWhich choice completes the text with the most logical and precise word?',
    choices: ['arbitrary', 'efficient', 'ancient', 'familiar'],
    answer: 0,
    explanation: '"Arbitrary" (seemingly random/without reason) contrasts with the explanation that the silent letters actually preserve history. Distractors: "efficient" contradicts the criticism implied; "ancient" and "familiar" do not set up the contrast the sentence requires.'
  },
  {
    id: 'q-psatrw-fill-005',
    state: 'live',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 700,
    stem: 'In her review of recent housing policy proposals, economist Mei Tanaka warns against ______ solutions: complex urban problems, she contends, rarely yield to interventions that target a single variable while ignoring the broader system in which it operates.\n\nWhich choice completes the text with the most logical and precise word?',
    choices: ['expensive', 'reductive', 'untested', 'temporary'],
    answer: 1,
    explanation: '"Reductive" (oversimplifying by isolating one factor) matches the criticism of single-variable interventions. Distractors: "expensive," "untested," and "temporary" miss the central complaint about oversimplification.'
  },
  {
    id: 'q-psatrw-fill-006',
    state: 'live',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 450,
    stem: 'Although early reviewers dismissed the novel as ______, contemporary critics now praise its understated prose, recognizing that its quiet style allows the emotional weight of the story to emerge gradually.\n\nWhich choice completes the text with the most logical and precise word?',
    choices: ['dull', 'lengthy', 'realistic', 'humorous'],
    answer: 0,
    explanation: '"Dull" sets up the expected contrast with later praise of the "understated" style. Distractors: "lengthy," "realistic," and "humorous" do not contrast with quiet/understated prose in the way the sentence requires.'
  },

  // ===== central-ideas (5) =====
  {
    id: 'q-psatrw-fill-007',
    state: 'live',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 460,
    stem: 'When honeybees return to the hive after finding food, they perform a "waggle dance" on the vertical surface of the comb. The angle of the dance relative to gravity tells other bees the direction of the food relative to the sun, and the duration of the waggle indicates how far away the food is.\n\nWhich choice best states the main idea of the text?',
    choices: [
      'Honeybees prefer to communicate in darkness inside the hive.',
      'The waggle dance allows bees to share specific information about food location.',
      'Bees use the sun more than gravity to find their way back to the hive.',
      'Scientists do not yet understand why bees dance after finding food.'
    ],
    answer: 1,
    explanation: 'The text explains that the dance encodes both direction and distance — i.e., specific location info. Distractors: A, C are unsupported details; D contradicts the clear explanation provided.'
  },
  {
    id: 'q-psatrw-fill-008',
    state: 'live',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 540,
    stem: 'Architect Soraya Bell\'s recent designs reject the notion that sustainability and beauty are at odds. Her residential projects use reclaimed timber, passive solar orientation, and rainwater capture, yet they have been praised in design publications for their elegant proportions and warm interiors. Bell argues that ecological constraints, far from limiting creativity, actually push designers toward more thoughtful solutions.\n\nWhich choice best states the main idea of the text?',
    choices: [
      'Bell believes that environmental design constraints can produce more beautiful buildings.',
      'Bell prefers reclaimed materials because they are less expensive than new ones.',
      'Critics initially disliked Bell\'s sustainable houses but later changed their minds.',
      'Most contemporary architects now design with sustainability as a primary goal.'
    ],
    answer: 0,
    explanation: 'The passage centers on Bell\'s claim that ecological constraints enhance, rather than limit, design quality. Distractors: B is unsupported (cost not mentioned); C misreads the praise; D overgeneralizes beyond Bell.'
  },
  {
    id: 'q-psatrw-fill-009',
    state: 'live',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 540,
    stem: 'In the cloud forests of Costa Rica, the strangler fig begins life as a seed deposited high in the branches of a host tree. Its roots descend slowly toward the ground, eventually wrapping the host trunk in a dense lattice. Decades later, when the host tree dies and decays, the fig remains standing — a hollow column where another tree once stood.\n\nWhich choice best states the main idea of the text?',
    choices: [
      'The strangler fig grows faster than most other rainforest trees.',
      'The strangler fig depends on its host tree even after the host has died.',
      'The strangler fig gradually replaces the host tree it grows around.',
      'The strangler fig produces seeds that are spread by birds in the canopy.'
    ],
    answer: 2,
    explanation: 'The passage traces the fig\'s lifecycle from seedling to standing in place of the host — i.e., gradual replacement. Distractors: A, D introduce unsupported claims; B contradicts the text (the fig stands after the host decays).'
  },
  {
    id: 'q-psatrw-fill-010',
    state: 'live',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 630,
    stem: 'Historian Esteban Quiroga challenges the popular image of medieval European villages as static and isolated. Drawing on parish records, court documents, and merchant ledgers, he shows that ordinary villagers regularly traveled to nearby market towns, exchanged goods with traders from distant regions, and migrated in response to economic opportunity. Far from being trapped, Quiroga argues, medieval people moved through a world more connected than is often assumed.\n\nWhich choice best states the main idea of the text?',
    choices: [
      'Quiroga\'s research relies primarily on parish records rather than other sources.',
      'Medieval villagers traveled less than people in later historical periods.',
      'Most historians now agree that medieval villages were highly mobile.',
      'Quiroga uses historical records to argue that medieval villagers were more mobile than commonly believed.'
    ],
    answer: 3,
    explanation: 'The passage describes Quiroga\'s sources and his thesis: medieval mobility was greater than popular images suggest. Distractors: A overstates one source; B contradicts the text; C overstates consensus.'
  },
  {
    id: 'q-psatrw-fill-011',
    state: 'live',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 720,
    stem: 'Conventional economic models treat decision-makers as rational agents who weigh costs and benefits before acting. Behavioral economist Priya Nair contends, however, that this assumption obscures a basic feature of human choice: people often rely on mental shortcuts shaped by recent experience, social context, and emotional state. These shortcuts are not failures of reasoning but adaptations to a world in which exhaustive deliberation would be impossibly costly.\n\nWhich choice best states the main idea of the text?',
    choices: [
      'Nair argues that mental shortcuts are sensible adaptations rather than reasoning errors.',
      'Nair believes that economic models should be replaced with psychological theories.',
      'People who rely on mental shortcuts make worse decisions than those who deliberate.',
      'Behavioral economics has fully replaced traditional economic theory in academic study.'
    ],
    answer: 0,
    explanation: 'Nair\'s key claim is that shortcuts are adaptive, not flawed. Distractors: B overstates her position; C contradicts her argument; D overstates the field\'s status.'
  },

  // ===== evidence (5) =====
  {
    id: 'q-psatrw-fill-012',
    state: 'live',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 460,
    stem: 'A student is researching the effects of background music on memory. She hypothesizes that listening to instrumental music while studying improves recall on a vocabulary test compared to studying in silence.\n\nWhich finding, if true, would most strongly support the student\'s hypothesis?',
    choices: [
      'Most students in the study reported enjoying instrumental music more than silence.',
      'Students who studied with instrumental music scored higher on the vocabulary test than those who studied in silence.',
      'Instrumental music has been shown to reduce stress in unrelated laboratory studies.',
      'Some students who listened to music reported feeling more focused during studying.'
    ],
    answer: 1,
    explanation: 'Direct comparison of test scores is the only choice that targets recall, the dependent variable. Distractors: A, D measure preference/feelings, not recall; C is unrelated to the specific hypothesis.'
  },
  {
    id: 'q-psatrw-fill-013',
    state: 'live',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 540,
    stem: 'A team of ecologists claims that planting native wildflowers along highway medians increases the local pollinator population. To test this, they monitored bee and butterfly counts on twenty miles of medians for three years before and three years after planting.\n\nWhich result would most directly support the ecologists\' claim?',
    choices: [
      'Drivers reported finding the wildflower medians more attractive than the previous turfgrass.',
      'Native wildflowers required less mowing and watering than the turfgrass they replaced.',
      'Bee and butterfly counts on the medians were significantly higher in the three years after planting than before.',
      'Other regions that planted wildflowers along roads also reported increased bird sightings.'
    ],
    answer: 2,
    explanation: 'The hypothesis is about pollinator populations on the studied medians; the comparison of before/after counts directly tests it. Distractors: A is aesthetic; B is about maintenance; D measures birds in other regions, not pollinators in this study.'
  },
  {
    id: 'q-psatrw-fill-014',
    state: 'live',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 540,
    stem: 'A historian argues that the spread of paper-making technology from East Asia to the Mediterranean during the 8th and 9th centuries dramatically lowered the cost of producing books, expanding literacy beyond the wealthy elite.\n\nWhich finding, if true, would most strongly support the historian\'s argument?',
    choices: [
      'Some scholars in the 9th-century Mediterranean continued to prefer parchment over paper for important documents.',
      'Paper-making in East Asia had been practiced for centuries before it spread westward.',
      'Many of the earliest paper books from the Mediterranean have not survived to the present day.',
      'Surviving records show that the price of books in Mediterranean cities fell sharply within decades of paper\'s arrival, and the number of literate people in those cities grew correspondingly.'
    ],
    answer: 3,
    explanation: 'The argument links paper to lower costs and broader literacy; D provides exactly that linked evidence. Distractors: A works against the claim; B is a background fact; C explains a gap, not the claim.'
  },
  {
    id: 'q-psatrw-fill-015',
    state: 'live',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 650,
    stem: 'A psychology researcher hypothesizes that brief mindfulness exercises before a math exam reduce test anxiety enough to improve student performance. She designs a study in which one group of students performs a five-minute breathing exercise immediately before the exam while a comparable group sits quietly.\n\nWhich result would most directly support her hypothesis?',
    choices: [
      'Students in the breathing group reported feeling calmer after the exam.',
      'Neither group showed a difference in heart rate during the exam.',
      'Students in both groups expressed interest in continuing mindfulness practice.',
      'Students in the breathing group earned significantly higher exam scores than the quiet group.'
    ],
    answer: 3,
    explanation: 'The hypothesis claims improved performance; only D measures performance. Distractors: A measures only feelings; B shows no effect; C is about future interest.'
  },
  {
    id: 'q-psatrw-fill-016',
    state: 'live',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 660,
    stem: 'Materials scientist Renaldo Ortiz hypothesizes that a new ceramic coating he has developed will significantly extend the working life of industrial cutting tools by reducing wear at high temperatures.\n\nWhich finding from a controlled trial would most directly support Ortiz\'s hypothesis?',
    choices: [
      'Coated cutting tools required less frequent sharpening than uncoated tools used under identical conditions.',
      'The coating could be applied to a wider range of tool shapes than earlier coatings.',
      'Workers in the trial preferred the appearance of the coated tools.',
      'The coating was less expensive to manufacture than competing ceramic coatings.'
    ],
    answer: 0,
    explanation: 'A targets the specific claim — reduced wear extending working life. Distractors: B, C, D address versatility, aesthetics, and cost — not durability under heat.'
  },

  // ===== text-structure (4) =====
  {
    id: 'q-psatrw-fill-017',
    state: 'live',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 460,
    stem: 'The following text is from a 2024 article about urban gardening.\n\n"Rooftop gardens have become a popular way to grow vegetables in dense cities. They make use of unused space, reduce building cooling costs in summer, and give residents access to fresh produce. However, they also face challenges: high winds, heavy soil that strains roof structures, and limited water access can make them difficult to maintain."\n\nWhich choice best describes the function of the underlined sentence (the second sentence) in the text as a whole?',
    choices: [
      'It introduces a counterargument that the rest of the text refutes.',
      'It lists benefits of rooftop gardens that the text then balances against challenges.',
      'It defines a technical term that is essential to understanding the rest of the text.',
      'It poses a question that the remainder of the text attempts to answer.'
    ],
    answer: 1,
    explanation: 'The second sentence lists three benefits; the third sentence then introduces challenges with "However." Distractors: A reverses the structure; C and D misidentify the sentence\'s role.'
  },
  {
    id: 'q-psatrw-fill-018',
    state: 'live',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 540,
    stem: 'The following text is adapted from a 2025 essay on language learning.\n\n"For decades, language teachers emphasized memorizing grammar rules and vocabulary lists. More recent research, however, suggests that learners acquire languages most effectively when they engage in meaningful conversation from the beginning — even before they have mastered formal rules. This shift has prompted many programs to redesign their curricula around spoken interaction."\n\nWhich choice best describes the overall structure of the text?',
    choices: [
      'It defends a traditional teaching method against recent criticism.',
      'It presents an older approach, contrasts it with newer findings, and notes a resulting change in practice.',
      'It describes a study and then evaluates the study\'s methodology.',
      'It traces the history of a language program from its founding to the present.'
    ],
    answer: 1,
    explanation: 'The text has three moves: old approach -> contrasting research -> resulting change. Distractors: A reverses the stance; C and D misidentify the content as study evaluation or program history.'
  },
  {
    id: 'q-psatrw-fill-019',
    state: 'live',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 620,
    stem: 'The following text is from a 2023 piece on public transportation.\n\n"The argument that ridership declines justify cutting bus service has a certain logic: fewer riders, fewer routes. Yet this reasoning ignores a crucial feedback loop. As routes are cut, remaining service becomes less convenient, prompting more riders to abandon transit, which in turn justifies further cuts. The result is a downward spiral that ends not in efficiency but in collapse."\n\nWhich choice best describes the function of the second sentence in the text as a whole?',
    choices: [
      'It introduces an objection to the reasoning described in the first sentence.',
      'It restates the claim of the first sentence using more technical language.',
      'It provides a specific example that supports the conclusion of the text.',
      'It identifies a historical source for the argument described in the text.'
    ],
    answer: 0,
    explanation: 'The second sentence pivots ("Yet this reasoning ignores...") to introduce an objection that the rest of the text develops. Distractors: B misreads it as restatement; C and D misidentify it as example or attribution.'
  },
  {
    id: 'q-psatrw-fill-020',
    state: 'live',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 700,
    stem: 'The following text is adapted from a 2024 essay on scientific publishing.\n\n"Peer review is often described as the gold standard of scientific quality control. In practice, however, the process varies enormously across journals, with some sending manuscripts to four or more independent reviewers and others relying on a single editor\'s judgment. Reformers argue that this inconsistency undermines the very credibility the system is meant to provide, and they have begun proposing public, structured reviews as an alternative."\n\nWhich choice best describes the overall structure of the text?',
    choices: [
      'It defines a concept, describes a problem with how the concept is implemented, and notes a proposed reform.',
      'It compares two competing scientific theories and concludes that one is superior.',
      'It traces the history of peer review from its origins to its current form.',
      'It evaluates a single scientific study and identifies methodological flaws.'
    ],
    answer: 0,
    explanation: 'The structure is: define peer review -> identify inconsistency problem -> note proposed reform. Distractors: B, C, D describe structures the text does not have.'
  },

  // ===== cross-text (3) =====
  {
    id: 'q-psatrw-fill-021',
    state: 'live',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 540,
    stem: 'Text 1\nEducator Mira Sandoval argues that homework reinforces classroom learning by giving students extended, independent practice with new material. Without this practice, she contends, lessons fade quickly from memory and skills fail to develop fully.\n\nText 2\nEducation researcher Bao Vu acknowledges that practice matters but cautions against the assumption that practice must happen at home. In Vu\'s view, in-class practice — supervised, immediate, and free of household distractions — better serves students who lack quiet study spaces or parental support.\n\nBased on the texts, how would Vu (Text 2) most likely respond to Sandoval\'s argument in Text 1?',
    choices: [
      'By rejecting the idea that practice plays any role in learning new material.',
      'By agreeing that practice is important but disputing that it must occur at home.',
      'By arguing that classroom lessons are themselves unnecessary if practice is sufficient.',
      'By suggesting that homework should be graded more strictly than classwork.'
    ],
    answer: 1,
    explanation: 'Vu accepts the value of practice (matches Sandoval) but objects specifically to the home location (disputes Sandoval). Distractors: A contradicts Vu; C and D introduce positions Vu does not take.'
  },
  {
    id: 'q-psatrw-fill-022',
    state: 'live',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 640,
    stem: 'Text 1\nIn a recent paper, paleontologist Hugo Bermudez argues that small, feathered dinosaurs likely used their feathers primarily for display and temperature regulation rather than flight. He notes that many feathered species had wing structures incapable of supporting powered flight.\n\nText 2\nPaleontologist Lan Trinh agrees that feathers had non-flight functions in many small dinosaurs but emphasizes that some species — particularly those with asymmetrical wing feathers — show clear adaptations consistent with at least gliding behavior. She cautions against treating "non-flight" and "flight-related" as mutually exclusive categories.\n\nBased on the texts, how would Trinh (Text 2) most likely respond to Bermudez\'s argument in Text 1?',
    choices: [
      'By rejecting the idea that feathers ever served display or thermal functions.',
      'By agreeing entirely with Bermudez and offering additional supporting examples.',
      'By accepting much of Bermudez\'s claim while arguing that some species likely also used feathers for gliding.',
      'By insisting that all feathered dinosaurs were capable of powered flight.'
    ],
    answer: 2,
    explanation: 'Trinh agrees feathers had non-flight roles but adds that some species show gliding adaptations. Distractors: A and D contradict Trinh; B ignores her qualification.'
  },
  {
    id: 'q-psatrw-fill-023',
    state: 'live',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 720,
    stem: 'Text 1\nUrban planner Yusra Idris contends that bike lanes installed on busy commercial streets reliably increase foot traffic to nearby shops. Slower vehicle speeds, she argues, encourage pedestrians to linger, browse, and make unplanned purchases.\n\nText 2\nEconomist Rolf Aasen examines retail sales data from twelve cities that recently added bike lanes to commercial corridors. He finds that average sales did rise modestly after installation, but the effect varied widely: some streets saw substantial gains, others none at all. Aasen attributes the variation to factors such as parking availability, store mix, and adjacent residential density.\n\nBased on the texts, how would Aasen (Text 2) most likely respond to Idris\'s argument in Text 1?',
    choices: [
      'By denying that bike lanes have any measurable effect on retail activity.',
      'By insisting that bike lanes harm retail businesses by removing parking.',
      'By agreeing with Idris\'s general claim while arguing that the effect is less uniform than she suggests.',
      'By concluding that bike lanes should not be added to commercial streets.'
    ],
    answer: 2,
    explanation: 'Aasen finds a modest average increase (consistent with Idris) but stresses the variation depends on local factors (qualifies her). Distractors: A, B, D contradict his actual findings or recommendation.'
  },

  // ===== boundaries (6) =====
  {
    id: 'q-psatrw-fill-024',
    state: 'live',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 430,
    stem: 'After three weeks of careful editing ______ the short film was finally ready to be submitted to the regional festival.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [', and review,', '. And review', '; and review', ' and review;'],
    answer: 0,
    explanation: 'A comma after the long introductory phrase ("After three weeks of careful editing and review") sets it off from the main clause. Distractors: B creates a fragment; C misuses a semicolon between non-clauses; D punctuates the boundary in the wrong place.'
  },
  {
    id: 'q-psatrw-fill-025',
    state: 'live',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 510,
    stem: 'The marathon route winds through three distinct neighborhoods ______ each with its own character, history, and crowd of cheering residents.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [' and', ',', '.', ';'],
    answer: 1,
    explanation: 'A comma correctly attaches the descriptive (non-clause) phrase "each with its own character..." to the main clause. Distractors: A creates an awkward construction; C creates a fragment; D requires two independent clauses.'
  },
  {
    id: 'q-psatrw-fill-026',
    state: 'live',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 530,
    stem: 'The novel is set in a small coastal town ______ however, the events it depicts could plausibly take place in any close-knit community.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [',', ';', ' —', ':'],
    answer: 1,
    explanation: 'Two independent clauses joined by the conjunctive adverb "however" require a semicolon (or period) before "however." Distractors: A creates a comma splice; C and D do not pair correctly with the conjunctive adverb construction.'
  },
  {
    id: 'q-psatrw-fill-027',
    state: 'live',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 540,
    stem: 'In the early 1900s, photographer Adelaide Lin documented the changing skyline of her city ______ images now considered an invaluable record of an era of rapid construction.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [' produced', '. Producing', '; producing', ', producing'],
    answer: 3,
    explanation: 'A comma plus the present participle "producing" creates a participial phrase that modifies the main clause. Distractors: A creates a run-on; B creates a fragment; C misuses a semicolon (no second independent clause follows).'
  },
  {
    id: 'q-psatrw-fill-028',
    state: 'live',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 640,
    stem: 'Many cookbook authors recommend toasting whole spices before grinding them ______ doing so releases volatile oils that intensify the flavor of the finished dish.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [',', ' —', ':', '. While'],
    answer: 2,
    explanation: 'A colon properly introduces an explanation/elaboration of the preceding independent clause. Distractors: A creates a comma splice between independent clauses; B creates an unwarranted dash break; D produces a fragment.'
  },
  {
    id: 'q-psatrw-fill-029',
    state: 'live',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 700,
    stem: 'The geneticist\'s most-cited paper ______ a 1998 study tracing variation in a single corn gene back to its wild ancestor in southern Mexico ______ is still required reading in introductory plant biology courses.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['—  ...  —', ',  ...  ,', '(  ...  )', ';  ...  ;'],
    answer: 0,
    explanation: 'A pair of em dashes correctly sets off the long, internally-punctuated nonessential phrase. Distractors: B and C are technically possible but commas/parens become hard to read with internal commas; D misuses semicolons (which separate independent clauses).'
  },

  // ===== form-structure-sense (6) =====
  {
    id: 'q-psatrw-fill-030',
    state: 'live',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 440,
    stem: 'Each of the volunteers at the food bank ______ asked to attend a brief orientation before beginning their first shift.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['are', 'were', 'is', 'have been'],
    answer: 2,
    explanation: 'The subject "Each" is singular and takes the singular verb "is." Distractors: A, B, D are all plural forms.'
  },
  {
    id: 'q-psatrw-fill-031',
    state: 'live',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 450,
    stem: 'Walking along the riverbank at sunrise, ______.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'a heron was spotted by Marisol fishing in the shallows',
      'the shallows revealed a heron to Marisol',
      'Marisol spotted a heron fishing in the shallows',
      'there was a heron Marisol spotted in the shallows'
    ],
    answer: 2,
    explanation: 'The introductory participial phrase "Walking along the riverbank at sunrise" must modify the subject of the main clause (the person walking, Marisol). Distractors: A, B, D place a non-walker (heron, shallows, "there") in the subject slot.'
  },
  {
    id: 'q-psatrw-fill-032',
    state: 'live',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 530,
    stem: 'The committee, along with several outside consultants, ______ planning to release its recommendations later this month.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['are', 'is', 'were', 'have been'],
    answer: 1,
    explanation: '"The committee" is the singular subject; the parenthetical "along with..." phrase does not change the verb agreement. Distractors: A, C, D are plural.'
  },
  {
    id: 'q-psatrw-fill-033',
    state: 'live',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 550,
    stem: 'Last summer, while Diego ______ in the campus library, he discovered a stack of letters that an early astronomy professor had left behind in the 1890s.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['works', 'is working', 'was working', 'has worked'],
    answer: 2,
    explanation: 'The narrative is in the past ("Last summer," "discovered"), and the action was ongoing — past progressive ("was working") fits. Distractors: A is present; B is present progressive; D is present perfect.'
  },
  {
    id: 'q-psatrw-fill-034',
    state: 'live',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 620,
    stem: 'The new training program teaches employees how to identify customer needs, how to respond to common complaints, and ______.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: [
      'how to escalate complex issues',
      'escalating complex issues',
      'they should escalate complex issues',
      'when complex issues are escalated'
    ],
    answer: 0,
    explanation: 'Parallelism requires a third "how to" phrase to match "how to identify..." and "how to respond..." Distractors: B, C, D break the parallel structure.'
  },
  {
    id: 'q-psatrw-fill-035',
    state: 'live',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 660,
    stem: 'Although the playwrights had spent months revising the script, neither of them ______ satisfied with the opening scene as it stood on the day of the first rehearsal.\n\nWhich choice completes the text so that it conforms to the conventions of Standard English?',
    choices: ['were', 'have been', 'are', 'was'],
    answer: 3,
    explanation: '"Neither" is grammatically singular and pairs with "was." Distractors: A, B, C use plural forms.'
  },

  // ===== transitions (3) =====
  {
    id: 'q-psatrw-fill-036',
    state: 'live',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 460,
    stem: 'The new bike-share program in Belmar has attracted thousands of users in its first month. ______, city officials are already considering expanding the network into nearby neighborhoods.\n\nWhich choice completes the text with the most logical transition?',
    choices: ['However', 'For example', 'As a result', 'Nevertheless'],
    answer: 2,
    explanation: 'The first sentence describes a cause (high usage); the second describes its consequence (expansion plans). "As a result" signals cause-effect. Distractors: A and D signal contrast; B signals example.'
  },
  {
    id: 'q-psatrw-fill-037',
    state: 'live',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 540,
    stem: 'For years, conservationists believed that the regional wolf population was steadily declining. ______, recent satellite-collar data suggest the population has stabilized at a low but sustainable level.\n\nWhich choice completes the text with the most logical transition?',
    choices: ['Similarly', 'Therefore', 'In addition', 'However'],
    answer: 3,
    explanation: 'The recent data contradicts the prior belief; "However" signals the contrast. Distractors: A signals similarity; B signals causation; C signals addition.'
  },
  {
    id: 'q-psatrw-fill-038',
    state: 'live',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 640,
    stem: 'The composer wrote the entire symphony in a single feverish month and refused to revise more than a handful of measures. ______, his contemporaries reported that he often spent years fine-tuning shorter pieces, sometimes producing a dozen drafts of a single song.\n\nWhich choice completes the text with the most logical transition?',
    choices: ['Consequently', 'For instance', 'Likewise', 'By contrast'],
    answer: 3,
    explanation: 'The two sentences contrast the composer\'s behavior on the symphony (fast, no revision) with his behavior on shorter pieces (slow, many drafts). Distractors: A signals cause; B signals example; C signals similarity.'
  },

  // ===== rhetorical-synthesis (2) =====
  {
    id: 'q-psatrw-fill-039',
    state: 'live',
    section: 'reading-writing',
    topic: 'rhetorical-synthesis',
    difficulty: 560,
    stem: 'While researching a tide-pool ecosystem, a student took the following notes:\n- Tide pools form when seawater is trapped in rocky depressions at low tide.\n- Organisms in tide pools must survive sudden changes in temperature, salinity, and oxygen.\n- Sea anemones, hermit crabs, and small fish are common tide-pool residents.\n- Researchers study tide pools to understand how organisms adapt to extreme conditions.\n\nThe student wants to emphasize a reason that scientists are interested in tide pools. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      'Sea anemones, hermit crabs, and small fish are common tide-pool residents.',
      'Because tide-pool organisms must survive sudden changes in temperature, salinity, and oxygen, researchers study them to understand adaptation to extreme conditions.',
      'Tide pools form when seawater is trapped in rocky depressions at low tide.',
      'Tide pools contain a variety of marine organisms that interest scientists.'
    ],
    answer: 1,
    explanation: 'B integrates the harsh-conditions note with the research-purpose note, directly explaining why scientists study tide pools. Distractors: A, C, D omit the research motivation.'
  },
  {
    id: 'q-psatrw-fill-040',
    state: 'live',
    section: 'reading-writing',
    topic: 'rhetorical-synthesis',
    difficulty: 660,
    stem: 'While researching the history of public libraries, a student took the following notes:\n- The first tax-supported public library in the United States opened in Peterborough, New Hampshire, in 1833.\n- Before then, most American libraries required paid memberships.\n- Industrialist Andrew Carnegie funded more than 1,600 public library buildings in the U.S. between 1883 and 1929.\n- Today, public libraries offer free internet access, programs for children, and community meeting spaces in addition to lending books.\n\nThe student wants to emphasize how the role of public libraries has expanded beyond lending books. Which choice most effectively uses relevant information from the notes to accomplish this goal?',
    choices: [
      'The first tax-supported public library in the U.S. opened in Peterborough, New Hampshire, in 1833.',
      'Before tax-supported libraries existed, most American libraries required paid memberships.',
      'Andrew Carnegie funded more than 1,600 public library buildings between 1883 and 1929.',
      'In addition to lending books, today\'s public libraries offer free internet access, programs for children, and community meeting spaces.'
    ],
    answer: 3,
    explanation: 'D directly emphasizes the expanded modern role beyond book lending. Distractors: A, B, C focus on historical origins or funding, not the contemporary expansion.'
  }
]);
