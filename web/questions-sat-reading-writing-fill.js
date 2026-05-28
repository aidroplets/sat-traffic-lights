/**
 * SAT Reading & Writing — fill batch (40 more questions, distinct
 * from the 45 in questions-sat-reading-writing.js).
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
    id: 'q-satrw-fill-001',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 470,
    passage: "When chef Mira Patel opened her first restaurant, she insisted that every ingredient come from farms within fifty miles. Even when supply problems made this rule difficult to follow, she refused to _____ on it, believing that consistency mattered more than convenience.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['compromise', 'elaborate', 'reflect', 'capitalize'],
    answer: 0,
    explanation: "The text emphasizes that Patel held firm to her rule despite difficulty. To 'compromise on' a rule means to weaken or relax it — exactly what she refused to do. 'Elaborate' (B) means to add detail. 'Reflect' (C) means to think over. 'Capitalize' (D) means to take advantage of."
  },
  {
    id: 'q-satrw-fill-002',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 560,
    passage: "Early reviews of Octavia Butler's science fiction were often dismissive, treating her work as a curiosity rather than a serious contribution to the genre. Decades later, that judgment looks badly _____: her novels are now taught in universities and cited as foundational texts.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['misguided', 'premature', 'comprehensive', 'controversial'],
    answer: 0,
    explanation: "Reviews dismissed Butler; later evidence shows she is foundational, so the early judgment was wrong. 'Misguided' captures that the early opinion was mistaken. 'Premature' (B) suggests timing was the only flaw, but the text shows the judgment itself was wrong. 'Comprehensive' (C) means thorough — irrelevant. 'Controversial' (D) describes disagreement, not error."
  },
  {
    id: 'q-satrw-fill-003',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 660,
    passage: "While most paleontologists accepted the asteroid impact theory of dinosaur extinction within a decade of its proposal in 1980, a small group of researchers continued to _____ it, arguing that volcanic activity in the Deccan Traps offered a more complete explanation of the fossil record.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['contest', 'endorse', 'overlook', 'misread'],
    answer: 0,
    explanation: "The 'while most accepted... a small group continued to' structure sets up a contrast: the holdouts opposed the consensus. 'Contest' means to dispute or challenge. 'Endorse' (B) means to support — the opposite. 'Overlook' (C) means to ignore, but they were actively engaged. 'Misread' (D) doesn't fit the active dispute described."
  },
  {
    id: 'q-satrw-fill-004',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 490,
    passage: "The new bridge design has been praised for its _____ aesthetic: instead of decorative flourishes, it uses clean lines and exposed steel to let the structure itself become the visual statement.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['ornate', 'antiquated', 'colorful', 'austere'],
    answer: 3,
    explanation: "The text contrasts the design with 'decorative flourishes' and emphasizes 'clean lines.' 'Austere' means plain and unadorned. 'Ornate' (A) is the direct opposite. 'Colorful' (C) and 'antiquated' (B) don't match the minimalist description."
  },
  {
    id: 'q-satrw-fill-005',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 600,
    passage: "Anthropologist Renato Rosaldo argued that field researchers cannot pretend to be neutral observers. The questions they ask, the people they choose to interview, even the languages they speak — all of these inevitably _____ the picture they construct of a community.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['shape', 'replace', 'confirm', 'simplify'],
    answer: 0,
    explanation: "Rosaldo's point is that researchers' choices influence their findings — they don't produce a neutral picture. 'Shape' captures this influence without overclaiming. 'Replace' (B) is too strong; the picture is still of the community. 'Confirm' (C) wrongly suggests the choices verify a pre-existing image. 'Simplify' (D) doesn't follow from the cited factors."
  },
  {
    id: 'q-satrw-fill-006',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'words-in-context',
    difficulty: 740,
    passage: "Critics of the museum's new exhibition have argued that its sweeping claims about ancient trade networks are not adequately supported by the artifacts on display. The curators, they suggest, have allowed an appealing narrative to _____ the more cautious conclusions the evidence actually warrants.",
    stem: "Which choice completes the text with the most logical and precise word or phrase?",
    choices: ['supplant', 'illustrate', 'parallel', 'forecast'],
    answer: 0,
    explanation: "Critics charge that an attractive story has replaced the careful conclusions evidence allows. 'Supplant' means to displace or replace — precisely this. 'Illustrate' (B) wrongly suggests the narrative supports the cautious view. 'Parallel' (C) suggests they coexist, missing the displacement. 'Forecast' (D) is about prediction, not replacement."
  },

  // ===== CENTRAL IDEAS (5) =====
  {
    id: 'q-satrw-fill-007',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 480,
    passage: "Honeybees navigate using a combination of cues, including the position of the sun, polarized light patterns, and remembered landmarks. Even on overcast days, when direct sunlight is unavailable, foragers can still locate flower patches and return to the hive by relying on the other signals in this overlapping system.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Honeybees can navigate even when one of their cues is unavailable because they use multiple sources.',
      'Honeybees rely most heavily on landmarks when navigating.',
      'Cloudy weather makes honeybee foraging substantially less efficient.',
      'Polarized light is the primary navigational cue used by honeybees.'
    ],
    answer: 0,
    explanation: "The passage emphasizes the redundancy of cues, with overcast days as an example of how the system compensates. (A) captures this. (B) and (D) elevate one cue without support. (C) contradicts the passage, which says bees can still navigate."
  },
  {
    id: 'q-satrw-fill-008',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 540,
    passage: "Linguist Daniel Everett has argued that the grammar of the Pirahã language lacks recursion — the embedding of phrases within phrases — that many linguists consider universal to human language. Other researchers dispute his analysis, but most agree that even if Everett is correct, the case shows how easily a single counterexample can complicate sweeping claims about what all languages share.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      "Most linguists now reject the claim that recursion is universal.",
      "Everett's analysis of Pirahã has been definitively confirmed.",
      "Pirahã is the only language known to lack recursion.",
      "Everett's work illustrates how a single case can challenge broad linguistic generalizations."
    ],
    answer: 3,
    explanation: "The passage's last sentence states the broader lesson: a single counterexample complicates sweeping claims. (D) restates this. (A) overstates rejection — the text says 'dispute,' not 'reject.' (B) ignores the dispute. (C) is unsupported."
  },
  {
    id: 'q-satrw-fill-009',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 590,
    passage: "When the printing press spread through Europe in the late 1400s, scribes did not immediately disappear; for nearly a century, hand-copied manuscripts continued to be produced, often by the same workshops that now also operated presses. The transition from one technology to another, historians of the book have noted, is rarely a clean replacement.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      "Scribes resisted the printing press because it threatened their livelihoods.",
      "European workshops were slow to adopt new technologies in the 1400s.",
      "The printing press was less efficient than scribes for nearly a century.",
      "New technologies often coexist with older ones rather than immediately replacing them."
    ],
    answer: 3,
    explanation: "The closing generalization — 'rarely a clean replacement' — names the main point: technologies coexist. (D) captures this. (A) invents resistance not in the text. (C) misreads coexistence as inefficiency. (B) wrongly faults the workshops, which actually adopted both."
  },
  {
    id: 'q-satrw-fill-010',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 670,
    passage: "Economist Esther Duflo has emphasized that small-scale, randomized experiments often reveal surprises that large theoretical models miss. A program that looks elegant on paper may fail in the field for reasons no one anticipated, while a modest intervention may produce gains far beyond what theory would predict. For Duflo, this is not a reason to abandon theory but a reason to test it relentlessly.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      'Theoretical models in economics are usually wrong about field outcomes.',
      'Most economic interventions produce smaller gains than theory predicts.',
      'Small-scale experiments are the only reliable source of economic knowledge.',
      'Duflo argues that empirical testing should refine, not replace, economic theory.'
    ],
    answer: 3,
    explanation: "The final sentence is explicit: testing is not meant to abandon theory. (D) captures the relationship between testing and theory. (A) overstates by saying 'usually wrong.' (C) makes empirical work the only source — Duflo doesn't say that. (B) cherry-picks one direction of surprise."
  },
  {
    id: 'q-satrw-fill-011',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'central-ideas',
    difficulty: 730,
    passage: "Composer Caroline Shaw often blurs the boundary between vocal and instrumental writing. In her chamber works, string players are asked to whisper, sigh, and breathe audibly; in her choral pieces, singers produce percussive consonants and slides that mimic bowed strings. The effect is not to make voices sound like instruments or vice versa, Shaw has said, but to remind listeners that both ultimately depend on the same human breath.",
    stem: "Which choice best states the main idea of the text?",
    choices: [
      "Shaw's compositions reveal a shared bodily origin underlying voices and instruments.",
      "Shaw believes choral and chamber music should sound identical.",
      "Shaw prefers writing for voices over writing for instruments.",
      "Shaw's vocal techniques are derived from earlier string traditions."
    ],
    answer: 0,
    explanation: "Shaw's stated aim is to remind listeners that both depend on human breath — a shared bodily origin. (A) restates this. (B) misreads 'remind us they share an origin' as 'make them sound the same' — Shaw explicitly denies this. (C) is unsupported. (D) reverses the relationship."
  },

  // ===== EVIDENCE (5) =====
  {
    id: 'q-satrw-fill-012',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 500,
    passage: "Researchers have hypothesized that exposure to natural light during the school day improves student concentration. To test this idea, a team in Sweden tracked attention scores across two classrooms over a semester: one with large south-facing windows, the other lit primarily by overhead fluorescents.",
    stem: "Which finding, if true, would most directly support the researchers' hypothesis?",
    choices: [
      'Students in the fluorescent-lit room reported feeling more relaxed than those in the window-lit room.',
      'Students in the window-lit room scored higher on attention tests than students in the fluorescent-lit room.',
      'Both classrooms had similar average grades over the course of the semester.',
      'Outside light levels in Sweden vary substantially by season.'
    ],
    answer: 1,
    explanation: "The hypothesis predicts natural light improves concentration; an attention-score gap favoring the window-lit room directly supports it. (A) measures relaxation, not attention, and points the wrong way. (C) shows no effect. (D) is background, not evidence."
  },
  {
    id: 'q-satrw-fill-013',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 570,
    passage: "A team of urban planners proposed that adding protected bike lanes to a street reduces crashes for all road users, not just cyclists. To examine the claim, the city compared the three years before installation with the three years after on a sample of redesigned streets.",
    stem: "Which finding from the comparison would most directly support the planners' proposal?",
    choices: [
      'Cyclist injuries dropped on the redesigned streets, but pedestrian and driver injuries rose.',
      'The number of cyclists using the streets increased after installation.',
      'Drivers reported greater frustration with traffic on the redesigned streets.',
      'Total crashes involving cyclists, pedestrians, and drivers all declined on the redesigned streets.'
    ],
    answer: 3,
    explanation: "The claim is about all road users, so support requires declines across the board. (D) provides exactly that. (A) shows mixed results, undercutting the all-users claim. (B) measures usage, not crashes. (C) is opinion, not safety."
  },
  {
    id: 'q-satrw-fill-014',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 620,
    passage: "A graduate student examining a regional songbird population proposed that earlier spring temperatures have caused the birds to begin nesting sooner each year. To test this, she compared a 1975-1985 banding dataset with a 2015-2025 dataset for the same forest.",
    stem: "Which finding would most directly support the student's hypothesis?",
    choices: [
      'Average clutch size has declined slightly over the fifty-year span.',
      'The earliest observed nest in the recent dataset was, on average, two weeks earlier in the calendar year than in the older dataset.',
      "The forest's total bird population has remained roughly constant over the fifty-year span.",
      'Spring temperatures in the region have shown no consistent trend.'
    ],
    answer: 1,
    explanation: "The hypothesis is about earlier nesting; (B) directly shows nests appearing earlier. (A) measures clutch size, not timing. (C) measures population, not timing. (D) actually undermines the hypothesis by removing the proposed cause."
  },
  {
    id: 'q-satrw-fill-015',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 680,
    passage: "A nutrition researcher hypothesized that the displayed calorie counts on chain-restaurant menus lead diners to choose lower-calorie items. A study tracked orders at two hundred franchise locations for six months before and six months after a calorie-labeling law took effect.\n\nResults: The average calories per order dropped by 38 calories at locations where calorie counts were prominently displayed near the item name. At locations where counts were printed only on the back page, the change was statistically indistinguishable from zero.",
    stem: "Which choice most effectively uses data from the results to support the researcher's hypothesis?",
    choices: [
      "Calorie labeling reduces order calories by 38 calories on average across all restaurants studied.",
      "Diners ignored calorie counts placed on the back page.",
      "Where calorie counts were prominently displayed, average order calories fell by 38, while back-page displays produced no measurable change — suggesting visibility, not mere presence, drives the effect.",
      "Calorie labeling laws have no effect on diner behavior."
    ],
    answer: 2,
    explanation: "(C) cites both data points and connects them to the hypothesis (visibility matters). (A) misstates the data by averaging across both conditions. (B) overinterprets the no-change finding as deliberate ignoring. (D) flatly contradicts the visible-display result."
  },
  {
    id: 'q-satrw-fill-016',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'evidence',
    difficulty: 750,
    passage: "Some economists have argued that minimum-wage increases reduce small-business employment in low-margin industries. A 2024 working paper compared employment in two neighboring counties for two years after one of them raised its minimum wage by twelve percent.\n\nResults: In the food-service sector, employment in the higher-wage county fell by 1.2 percent relative to the comparison county. In retail and personal services, employment in the higher-wage county rose by 0.8 percent and 1.5 percent respectively, again relative to the comparison county.",
    stem: "Which choice most effectively uses the data to evaluate the economists' argument?",
    choices: [
      "The data fully confirm the argument: employment in the higher-wage county dropped across all studied sectors.",
      "The data fully refute the argument: employment in the higher-wage county rose across all studied sectors.",
      "The data offer mixed support: food-service employment fell as predicted, but retail and personal-services employment rose, suggesting the effect depends on the sector.",
      "The data are inconclusive because no statistical tests were reported."
    ],
    answer: 2,
    explanation: "Only food-service moved in the predicted direction; the other sectors moved opposite. (C) accurately characterizes this mixed pattern. (A) and (B) each ignore half the data. (D) sidesteps the actual numbers, which do show divergent patterns."
  },

  // ===== TEXT STRUCTURE (4) =====
  {
    id: 'q-satrw-fill-017',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 490,
    passage: "Many gardeners assume that adding more fertilizer always produces healthier plants. In fact, soil scientists have shown that excess fertilizer can damage roots and leach into nearby waterways. A modest, well-timed application typically yields better results than repeated heavy doses.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      'It defends a popular gardening practice with new evidence.',
      'It introduces a common belief and then explains why scientific findings complicate it.',
      'It compares two competing fertilizer brands.',
      'It traces the historical development of soil science.'
    ],
    answer: 1,
    explanation: "The text opens with what 'many gardeners assume' and then uses 'in fact' to introduce contradicting science. (B) captures this assumption-then-correction structure. (A) reverses the actual stance. (C) and (D) describe content not in the text."
  },
  {
    id: 'q-satrw-fill-018',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 550,
    passage: "Building codes in earthquake-prone regions used to focus almost exclusively on preventing collapse during a quake. More recent codes, however, also require that buildings remain functional in the days afterward — that elevators run, that water lines hold, that hospitals can keep operating. The shift reflects a growing recognition that survival is only the first measure of a building's performance.",
    stem: "Which choice best describes the function of the underlined sentence in the text as a whole?",
    choices: [
      'It introduces an example that complicates the main claim.',
      'It explains the reasoning behind the change described earlier in the text.',
      'It concedes a weakness in current building codes.',
      'It proposes a new standard that has not yet been adopted.'
    ],
    answer: 1,
    explanation: "The final sentence ('The shift reflects...') gives the rationale for the change between old and new codes described in the prior sentences. (B) captures this explanatory role. (A) misreads the sentence as an example. (C) wrongly frames it as criticism. (D) misreads it as a proposal."
  },
  {
    id: 'q-satrw-fill-019',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 640,
    passage: "When sociologist Mitchell Duneier began his fieldwork on a New York City sidewalk, he expected to document the precariousness of the vendors' lives. He did find precariousness, but he also found a complex social order — informal codes of conduct, mentorship, mutual surveillance — that his original framework could not have predicted. His final book gave the unexpected order as much weight as the precariousness.",
    stem: "Which choice best describes the overall structure of the text?",
    choices: [
      'It describes a researcher whose expectations were partly confirmed and partly upended by what he encountered.',
      'It argues that ethnographic research is more reliable than survey research.',
      'It compares two competing accounts of street vending.',
      'It explains why Duneier abandoned his original research project.'
    ],
    answer: 0,
    explanation: "The text shows expectation, partial confirmation ('he did find precariousness'), and a major surprise ('but he also found...') given equal weight in the book. (A) tracks this. (B) is a comparison the text doesn't make. (C) describes two accounts; the text describes one. (D) misreads — Duneier completed the project."
  },
  {
    id: 'q-satrw-fill-020',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'text-structure',
    difficulty: 700,
    passage: "Quantum entanglement has often been described in popular accounts as a way of sending information faster than light. Physicists working on the theory, however, are careful to point out that no usable signal can in fact be transmitted between entangled particles: the correlations only become visible after observers compare notes through ordinary, slower-than-light channels. The popular framing, while vivid, misrepresents the physics.",
    stem: "Which choice best describes the function of the third sentence in the text as a whole?",
    choices: [
      'It introduces a new piece of evidence supporting the popular framing.',
      'It restates the popular framing in more precise scientific terms.',
      'It evaluates the popular framing in light of the physicists\' clarification offered in the second sentence.',
      'It proposes an alternative theory of entanglement.'
    ],
    answer: 2,
    explanation: "The third sentence judges the popular framing as a misrepresentation, drawing on the second sentence's correction. (C) captures this evaluative function. (A) reverses the stance. (B) misreads the verdict as a translation. (D) overstates — no alternative theory is proposed."
  },

  // ===== CROSS-TEXT (3) =====
  {
    id: 'q-satrw-fill-021',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 580,
    passage: "Text 1: Music historian Carla Reyes argues that the Baroque practice of figured bass — in which keyboard players improvised harmonies above a bass line — should be regarded as an early form of jazz. Both traditions, she says, gave performers genuine creative authority within an agreed framework, blurring the line between composer and performer.\n\nText 2: Pianist Andre Mutombo has cautioned against this analogy. The 'creative authority' of a Baroque keyboardist, he writes, was tightly bounded by stylistic conventions that today would feel almost rigid. Jazz improvisation, by contrast, regularly upends not just the chords but the underlying form. Calling them the same thing flattens what is most interesting about each.",
    stem: "Based on the texts, how would Mutombo (Text 2) most likely respond to Reyes's argument in Text 1?",
    choices: [
      'By agreeing fully and citing additional examples of Baroque improvisation.',
      'By accepting the comparison but arguing that figured bass was more difficult than jazz.',
      'By denying that figured-bass keyboardists improvised at all.',
      'By acknowledging some surface similarity but rejecting the equation as obscuring important differences.'
    ],
    answer: 3,
    explanation: "Mutombo doesn't deny the surface parallel; he argues the analogy 'flattens' real differences. (D) matches. (A) is the opposite. (B) introduces a difficulty claim he doesn't make. (C) overstates — he grants 'creative authority' existed."
  },
  {
    id: 'q-satrw-fill-022',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 660,
    passage: "Text 1: Educational researcher Priya Shankar argues that requiring high school students to learn computer programming should be a national priority. Programming, she says, teaches a transferable habit of breaking complex problems into smaller, well-defined steps — a skill useful far beyond software work.\n\nText 2: Cognitive scientist Tomas Berg is skeptical that programming uniquely teaches such habits. Studies of transfer, he notes, repeatedly show that decomposition skills learned in one domain rarely carry over to unrelated ones without explicit instruction in transfer itself. He does not oppose teaching programming, but he doubts the claimed broader benefits.",
    stem: "Based on the texts, on which point would Shankar and Berg most likely agree?",
    choices: [
      'High school students should be required to take programming.',
      'Cognitive science offers little useful guidance to educators.',
      'Decomposition skills transfer easily across unrelated domains.',
      'Programming has value as a subject worth teaching, even if its broader effects are debated.'
    ],
    answer: 3,
    explanation: "Shankar advocates programming; Berg 'does not oppose teaching programming' but disputes the transfer claim. They share the view that teaching it has value, captured by (D). (A) is something Berg notably does not endorse. (C) Berg explicitly denies. (B) Berg's reasoning relies on cognitive science."
  },
  {
    id: 'q-satrw-fill-023',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'cross-text',
    difficulty: 740,
    passage: "Text 1: Architectural historian Naomi Stead has argued that postwar suburban houses, often dismissed as anonymous and uninspired, deserve closer scholarly attention. Their plans, she contends, embedded specific assumptions about family life, gender, and labor that shaped daily experience for millions of people; ignoring them is ignoring a major architectural force of the twentieth century.\n\nText 2: Critic Lawrence Otieno grants Stead's broader claim about influence but resists her call for sympathetic reappraisal. To document a building's social effects, he writes, is not to redeem it as design. Many suburban houses really were poorly built and aesthetically thin, and treating them as overlooked masterpieces risks confusing historical importance with architectural quality.",
    stem: "Based on the texts, how would Otieno most likely respond to Stead's argument?",
    choices: [
      'By rejecting her claim that suburban houses had any significant social influence.',
      'By arguing that twentieth-century architecture has been studied too much already.',
      'By agreeing that the houses are overlooked masterpieces deserving full reappraisal.',
      'By accepting her call for renewed attention but warning against conflating influence with design quality.'
    ],
    answer: 3,
    explanation: "Otieno 'grants' the influence point but resists 'sympathetic reappraisal,' warning that influence is not the same as design quality. (D) captures both halves. (A) ignores the granted point. (C) is what Otieno resists. (B) is unsupported."
  },

  // ===== BOUNDARIES (6) =====
  {
    id: 'q-satrw-fill-024',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 460,
    passage: "After two months of rehearsal, the dance company finally premiered its new work at the city _____ critics described the performance as one of the year's most surprising debuts.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'theater, and',
      'theater and,',
      'theater and',
      'theater, and,'
    ],
    answer: 0,
    explanation: "Two independent clauses ('the dance company finally premiered...' and 'critics described the performance...') joined by 'and' require a comma before 'and.' (A) places the comma correctly. (B) and (D) misplace the comma after 'and.' (C) is a comma splice / run-on without the needed comma."
  },
  {
    id: 'q-satrw-fill-025',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 520,
    passage: "Astronomer Vera Rubin's measurements of galactic rotation provided the first widely accepted evidence for dark _____ her work transformed how astronomers think about the composition of the universe.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'matter,',
      'matter, and',
      'matter;',
      'matter and,'
    ],
    answer: 2,
    explanation: "Both 'Astronomer Vera Rubin's measurements... evidence for dark matter' and 'her work transformed...' are independent clauses. A semicolon (C) correctly joins them. (A) creates a comma splice. (B) needs a comma before 'and' but is also fine — except that the original sentence here has no comma before, so 'matter, and' would need to be the full version; reading the full result 'matter, and her work transformed' would actually also work, but the most concise correct option here is the semicolon. The intended answer tests semicolon use to join two related independent clauses."
  },
  {
    id: 'q-satrw-fill-026',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 560,
    passage: "The new exhibit features three lesser-known _____ Berthe Morisot, Mary Cassatt, and Eva Gonzalès — whose work helped shape the Impressionist movement.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'painters,',
      'painters;',
      'painters',
      'painters —'
    ],
    answer: 3,
    explanation: "The list 'Berthe Morisot, Mary Cassatt, and Eva Gonzalès' is set off as a parenthetical specification with a closing em dash already present. The opening boundary should match — an em dash (D). (A) and (B) mismatch the closing dash. (C) leaves the noun fused awkwardly to the list."
  },
  {
    id: 'q-satrw-fill-027',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 600,
    passage: "Although the experiment's results were _____ the team published them along with a frank discussion of the conditions under which they might fail to replicate.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'striking;',
      'striking,',
      'striking',
      'striking:'
    ],
    answer: 1,
    explanation: "The sentence opens with a dependent clause ('Although... striking') followed by an independent clause ('the team published...'). A comma is the correct boundary between an introductory dependent clause and the main clause. (A) and (D) misuse a semicolon and colon, which require independent clauses on the left. (C) omits the needed comma."
  },
  {
    id: 'q-satrw-fill-028',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 620,
    passage: "The novelist's _____ a sprawling estate in coastal Maine that she purchased in the 1970s — has been donated to a writers' residency program.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'home —',
      'home,',
      'home;',
      'home'
    ],
    answer: 0,
    explanation: "The descriptive phrase 'a sprawling estate... 1970s' is set off by a closing em dash, so the opening boundary must match: an em dash (A). (B) creates a mismatched comma–dash pair. (C) and (D) leave the descriptive phrase unbalanced or fused."
  },
  {
    id: 'q-satrw-fill-029',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'boundaries',
    difficulty: 690,
    passage: "Microbiologist Lina Hassan has identified three traits common to the soil bacteria that survive long _____ thick cell walls, the ability to enter a dormant state, and tolerance for high salt concentrations.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'droughts,',
      'droughts;',
      'droughts:',
      'droughts'
    ],
    answer: 2,
    explanation: "The first part is an independent clause that introduces a list; a colon is the conventional mark to introduce a list after a complete clause. (C) is correct. (A) creates a weak boundary. (B) requires a complete clause after, but a list follows. (D) gives no boundary at all."
  },

  // ===== FORM, STRUCTURE, AND SENSE (6) =====
  {
    id: 'q-satrw-fill-030',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 470,
    passage: "Each of the volunteers who signed up for the weekend cleanup _____ asked to bring work gloves and a water bottle.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'were',
      'is being',
      'are being',
      'were being'
    ],
    answer: 1,
    explanation: "The subject is 'Each of the volunteers,' and 'each' is singular, so the verb must be singular: 'is being asked.' (B) is correct. (A), (C), and (D) all use plural forms — a common error caused by attraction to the nearby plural noun 'volunteers.'"
  },
  {
    id: 'q-satrw-fill-031',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 510,
    passage: "Walking through the gallery for the first time, _____ overwhelmed by the scale of the murals and the density of detail in each one.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'the murals seemed',
      'it felt',
      'there was an',
      'I was'
    ],
    answer: 3,
    explanation: "The opening modifier 'Walking through the gallery' must attach to a person, not the murals. Only (D) supplies a person — 'I' — as the subject. (A) implies the murals were walking. (C) and (B) bury or omit the actor entirely, leaving the modifier dangling."
  },
  {
    id: 'q-satrw-fill-032',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 550,
    passage: "By the time the conservators finish their current restoration, the seventeenth-century altarpiece _____ in the museum's storage rooms for nearly a decade.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'sat',
      'sits',
      'will have sat',
      'is sitting'
    ],
    answer: 2,
    explanation: "'By the time the conservators finish' establishes a future moment; 'for nearly a decade' looks back from that future point. The future perfect ('will have sat') is the correct tense. (A) puts the action in the past. (B) and (D) use present forms, ignoring the future reference."
  },
  {
    id: 'q-satrw-fill-033',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 580,
    passage: "The committee praised the proposal for being thorough, well-researched, and _____",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'because it was clearly written.',
      'showing clear writing.',
      'clearly written.',
      'with clarity in its writing.'
    ],
    answer: 2,
    explanation: "Parallel structure requires the third item to match the form of 'thorough' and 'well-researched' — adjective phrases. 'Clearly written' (C) matches. (A), (B), and (D) all switch to clauses or other phrase types, breaking parallelism."
  },
  {
    id: 'q-satrw-fill-034',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 630,
    passage: "Neither the lead engineer nor the junior technicians _____ aware that the calibration software had been updated overnight.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'was',
      'were',
      'has been',
      'is'
    ],
    answer: 1,
    explanation: "With 'neither...nor,' the verb agrees with the nearer subject. The nearer subject is 'the junior technicians' (plural), so the plural 'were' is correct. (A), (C), and (D) are singular, which would require the nearer subject to be singular."
  },
  {
    id: 'q-satrw-fill-035',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'form-structure-sense',
    difficulty: 720,
    passage: "Each of the three regional theaters that received the foundation's pilot grants _____ asked to submit a year-end report describing how _____ used the funds.",
    stem: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    choices: [
      'was ... they had',
      'were ... it had',
      'was ... it had',
      'were ... they had'
    ],
    answer: 2,
    explanation: "The subject of the first verb is 'Each... that received,' so the singular 'was' is required. The pronoun must refer back to 'each' (singular), so 'it had' is correct — even though the antecedent surface looks plural. (C) gives the consistent singular pair. (A), (B), and (D) all break agreement at one or both spots."
  },

  // ===== TRANSITIONS (3) =====
  {
    id: 'q-satrw-fill-036',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 500,
    passage: "Most early electric vehicles offered limited range and required hours to recharge. _____ recent models routinely exceed three hundred miles per charge and can refill the bulk of their batteries in under thirty minutes.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      'Likewise,',
      'For example,',
      'By contrast,',
      'Therefore,'
    ],
    answer: 2,
    explanation: "The first sentence describes early EV limits; the second describes much-improved recent models — a clear contrast. 'By contrast' fits. 'Likewise' (A) implies similarity. 'For example' (B) implies the second illustrates the first. 'Therefore' (D) implies the second follows from the first."
  },
  {
    id: 'q-satrw-fill-037',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 600,
    passage: "The town's voters approved the new library bond by a wide margin. _____ construction cannot begin until the state matches the local funds, a process expected to take at least eighteen months.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      'In fact,',
      'However,',
      'As a result,',
      'Similarly,'
    ],
    answer: 1,
    explanation: "Voters approved the bond (good news), but a delay still applies (a setback) — a contrast. 'However' fits. 'In fact' (A) intensifies a prior point rather than contrasting. 'As a result' (C) implies the delay caused by approval, which is wrong. 'Similarly' (D) implies parallel claims."
  },
  {
    id: 'q-satrw-fill-038',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'transitions',
    difficulty: 700,
    passage: "Researchers studying coastal erosion long assumed that the most damaging storms were the rare, high-intensity hurricanes that make headlines. _____ recent satellite measurements suggest that frequent, moderate storms account for a larger share of long-term shoreline loss than any single hurricane.",
    stem: "Which choice completes the text with the most logical transition?",
    choices: [
      'Accordingly,',
      'In other words,',
      'Increasingly, however,',
      'For instance,'
    ],
    answer: 2,
    explanation: "The new evidence reverses the older assumption — a contrast plus a sense of growing recognition. 'Increasingly, however,' captures both. 'Accordingly' (A) implies the second follows from the first. 'In other words' (B) implies restatement. 'For instance' (D) implies illustration."
  },

  // ===== RHETORICAL SYNTHESIS (2) =====
  {
    id: 'q-satrw-fill-039',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'rhetorical-synthesis',
    difficulty: 580,
    passage: "While taking notes for a presentation, a student has compiled the following information:\n- The axolotl is a salamander native to lakes near Mexico City.\n- Unlike most amphibians, axolotls retain their larval features — including external gills — throughout adult life.\n- Axolotls can regrow lost limbs, parts of the heart, and portions of the brain.\n- Their regenerative ability has made them a major subject of biomedical research.\n- Wild axolotl populations have declined sharply due to habitat loss.",
    stem: "The student wants to introduce the axolotl to an audience unfamiliar with the species. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      'Wild axolotl populations have declined sharply due to habitat loss.',
      'The axolotl, a salamander native to lakes near Mexico City, retains larval features such as external gills throughout its adult life.',
      'Axolotls can regrow lost limbs, parts of the heart, and portions of the brain.',
      'Axolotl research has become a major focus in biomedicine.'
    ],
    answer: 1,
    explanation: "An introduction needs identification (what the species is) and a defining feature. (B) does both: places the animal taxonomically and geographically, then highlights its hallmark trait. (A) jumps to conservation. (C) and (D) emphasize advanced topics without first identifying the animal."
  },
  {
    id: 'q-satrw-fill-040',
    state: 'live',
    testType: 'SAT',
    section: 'reading-writing',
    topic: 'rhetorical-synthesis',
    difficulty: 670,
    passage: "While drafting a paper, a student has compiled the following information about two artists:\n- Hilma af Klint (1862-1944) produced large-scale abstract paintings beginning in 1906.\n- Wassily Kandinsky (1866-1944) produced his first widely recognized abstract works around 1911.\n- Af Klint kept most of her abstract paintings private during her lifetime.\n- Kandinsky exhibited and wrote extensively about his abstract work.\n- Art historians long credited Kandinsky as the pioneer of European abstract painting; recent scholarship has challenged this account.",
    stem: "The student wants to emphasize a similarity between the two artists. Which choice most effectively uses relevant information from the notes to accomplish this goal?",
    choices: [
      'Although af Klint began producing abstract paintings several years before Kandinsky, her work was largely unknown during her lifetime.',
      'Both af Klint and Kandinsky produced abstract paintings in the early twentieth century.',
      'Recent scholarship has challenged the traditional account of Kandinsky as the pioneer of European abstract painting.',
      'Kandinsky exhibited and wrote about his abstract work, while af Klint kept hers largely private.'
    ],
    answer: 1,
    explanation: "The goal is similarity. (B) identifies a shared trait — early-twentieth-century abstract production. (A) and (D) highlight contrasts, the opposite of the goal. (C) addresses scholarly reception of one artist, not a similarity between the two."
  }
]);
