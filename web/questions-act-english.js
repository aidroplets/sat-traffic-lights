/**
 * ACT English — punctuation, usage, sentence structure, style,
 * transitions. Sentence-level format (no passages) — equivalent
 * skill coverage in a single-question shape.
 *
 * testType: 'ACT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'english'
 *
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';

window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  // ===== PUNCTUATION (9) =====
  {
    id: 'q-acten-001',
    section: 'english',
    topic: 'punctuation',
    difficulty: 18,
    stem: "Choose the best version of the underlined portion: 'My sister who lives in Denver, is visiting next week.'",
    choices: ['sister who lives in Denver, is', 'sister who lives in Denver is', 'sister, who lives in Denver, is', 'sister, who lives in Denver is'],
    answer: 2,
    explanation: "A nonrestrictive clause ('who lives in Denver') needs commas on BOTH sides. (A) is missing the opening comma; (C) has no commas at all; (D) is missing the closing comma. Commas around nonessential information must come in pairs."
  },
  {
    id: 'q-acten-002',
    section: 'english',
    topic: 'punctuation',
    difficulty: 20,
    stem: "Choose the best version of the underlined portion: 'The dog wagged _its tail_ when I came home.'",
    choices: ['its\'s tail', 'it\'s tail', 'its\' tail', 'its tail'],
    answer: 3,
    explanation: "'Its' is the possessive pronoun; no apostrophe. 'It's' (B) is the contraction for 'it is.' (C) and (D) are not standard English forms. Possessive pronouns (its, his, hers, ours, theirs) never take an apostrophe."
  },
  {
    id: 'q-acten-003',
    section: 'english',
    topic: 'punctuation',
    difficulty: 24,
    stem: "Choose the best version of the underlined portion: 'We packed three things for the trip _sunscreen, water, and snacks._'",
    choices: ['trip; sunscreen, water, and snacks.', 'trip sunscreen, water, and snacks.', 'trip, sunscreen, water, and snacks.', 'trip: sunscreen, water, and snacks.'],
    answer: 3,
    explanation: "A colon introduces a list after an independent clause. (A) lacks any punctuation between the clause and the list. (B) creates a comma splice/run-on. (D) misuses a semicolon, which must join two independent clauses; the list isn't a clause."
  },
  {
    id: 'q-acten-004',
    section: 'english',
    topic: 'punctuation',
    difficulty: 26,
    stem: "Choose the best version of the underlined portion: 'The storm knocked out _power, however, the generator_ kept the lights on.'",
    choices: ['power; however, the generator', 'power, however the generator', 'power however the generator', 'power, however, the generator'],
    answer: 0,
    explanation: "'However' is a conjunctive adverb, not a conjunction. To join two independent clauses with 'however,' use a semicolon before and a comma after. (A) is a comma splice. (B) is a run-on. (D) is also a comma splice."
  },
  {
    id: 'q-acten-005',
    section: 'english',
    topic: 'punctuation',
    difficulty: 23,
    stem: "Choose the best version of the underlined portion: 'The _children's toys were_ scattered across the floor.'",
    choices: ['children toys\' were', 'childrens toys\' were', 'children\'s toys were', 'childrens\' toys were'],
    answer: 2,
    explanation: "'Children' is already plural (irregular plural), so the possessive adds 's: children's. (B) treats 'childrens' as a plural, which isn't a word. (C) and (D) misplace the apostrophe entirely."
  },
  {
    id: 'q-acten-006',
    section: 'english',
    topic: 'punctuation',
    difficulty: 29,
    stem: "Choose the best version of the underlined portion: 'The professor a renowned expert in marine biology spoke for two hours.'",
    choices: ['professor, a renowned expert in marine biology spoke', 'professor, a renowned expert in marine biology, spoke', 'professor a renowned expert in marine biology, spoke', 'professor a renowned expert in marine biology spoke'],
    answer: 1,
    explanation: "An appositive phrase ('a renowned expert in marine biology') renaming the subject must be set off by commas on BOTH sides. (A) has none; (B) and (C) have only one. Like nonrestrictive clauses, appositives need a pair of commas."
  },
  {
    id: 'q-acten-007',
    section: 'english',
    topic: 'punctuation',
    difficulty: 30,
    stem: "Choose the best version of the underlined portion: 'After running the marathon _the runner exhausted but elated, raised_ his arms in victory.'",
    choices: ['the runner, exhausted but elated raised', 'the runner exhausted, but elated raised', 'the runner exhausted but elated, raised', 'the runner, exhausted but elated, raised'],
    answer: 3,
    explanation: "The descriptive phrase 'exhausted but elated' is a nonessential modifier of 'the runner' and needs commas on both sides. (A) and (C) have only one comma; (D) misplaces commas, separating coordinate adjectives improperly and losing the second comma."
  },
  {
    id: 'q-acten-008',
    section: 'english',
    topic: 'punctuation',
    difficulty: 32,
    stem: "Choose the best version of the underlined portion: 'Three cities Boston, Chicago, and _Denver were_ chosen as finalists.'",
    choices: ['Denver, were', 'Denver; were', 'Denver were', 'Denver—were'],
    answer: 3,
    explanation: "When the appositive list itself contains commas, dashes set the entire appositive off from the main sentence. The opening dash is implied (or present) before 'Boston,' and a closing dash before 'were' restores clarity. (A) has no closing punctuation; (B) creates an awkward comma; (D) misuses a semicolon."
  },
  {
    id: 'q-acten-009',
    section: 'english',
    topic: 'punctuation',
    difficulty: 34,
    stem: "Choose the best version of the underlined portion: 'The committee selected three finalists Maria, who had the most experience Jamal, whose research was groundbreaking and Lin, the youngest applicant.'",
    choices: ['finalists: Maria, who had the most experience; Jamal, whose research was groundbreaking; and Lin,', 'finalists, Maria, who had the most experience, Jamal, whose research was groundbreaking, and Lin,', 'finalists; Maria, who had the most experience, Jamal, whose research was groundbreaking, and Lin,', 'finalists Maria, who had the most experience Jamal, whose research was groundbreaking and Lin,'],
    answer: 0,
    explanation: "When list items themselves contain commas, separate the items with semicolons. A colon properly introduces the list after the independent clause. (A) has no punctuation at all. (C) creates ambiguity—readers can't tell where one item ends. (D) misuses a semicolon to introduce a list."
  },

  // ===== USAGE (9) =====
  {
    id: 'q-acten-010',
    section: 'english',
    topic: 'usage',
    difficulty: 17,
    stem: "Choose the best version of the underlined portion: 'Each of the students _have_ submitted their essay.'",
    choices: ['are having', 'were having', 'have', 'has'],
    answer: 3,
    explanation: "The subject is 'each,' which is singular, so the verb must be 'has.' The intervening phrase 'of the students' doesn't change the subject. (A), (C), and (D) all use plural or progressive forms that disagree with the singular subject."
  },
  {
    id: 'q-acten-011',
    section: 'english',
    topic: 'usage',
    difficulty: 19,
    stem: "Choose the best version of the underlined portion: 'There are _less_ cars on the road today than yesterday.'",
    choices: ['less', 'lesser', 'fewer', 'least'],
    answer: 2,
    explanation: "Use 'fewer' for countable nouns (cars) and 'less' for uncountable nouns (traffic, water). (A) is wrong because cars are countable. (C) means 'smaller in importance.' (D) is the superlative and requires comparing three or more groups."
  },
  {
    id: 'q-acten-012',
    section: 'english',
    topic: 'usage',
    difficulty: 22,
    stem: "Choose the best version of the underlined portion: 'Between you and _I,_ this movie is overrated.'",
    choices: ['mine,', 'I,', 'me,', 'myself,'],
    answer: 2,
    explanation: "After a preposition ('between'), use the objective case: 'me.' (A) uses the subjective case incorrectly. (C) is a reflexive pronoun, which requires an antecedent in the same clause. (D) is possessive."
  },
  {
    id: 'q-acten-013',
    section: 'english',
    topic: 'usage',
    difficulty: 24,
    stem: "Choose the best version of the underlined portion: 'The team _are celebrating_ its championship win.'",
    choices: ['are celebrating', 'have celebrated', 'is celebrating', 'were celebrating'],
    answer: 2,
    explanation: "Collective nouns like 'team' take a singular verb in American English when acting as a unit. The pronoun 'its' later in the sentence confirms singular treatment. (A) and (C) use plural verbs. (D) uses present perfect, which conflicts with the ongoing celebration implied."
  },
  {
    id: 'q-acten-014',
    section: 'english',
    topic: 'usage',
    difficulty: 26,
    stem: "Choose the best version of the underlined portion: 'Neither the manager nor the employees _was aware_ of the change.'",
    choices: ['were aware', 'has been aware', 'is aware', 'was aware'],
    answer: 0,
    explanation: "With 'neither/nor' (or 'either/or'), the verb agrees with the noun closer to it. Here 'employees' is closer and is plural, so use 'were.' (A) and (C) use singular verbs. (D) is also singular and changes the tense unnecessarily."
  },
  {
    id: 'q-acten-015',
    section: 'english',
    topic: 'usage',
    difficulty: 28,
    stem: "Choose the best version of the underlined portion: 'By the time we arrived, the concert _has already started._'",
    choices: ['had already started.', 'already started.', 'has already started.', 'was already starting.'],
    answer: 0,
    explanation: "Past perfect ('had started') is required because the action was completed before another past action ('arrived'). (A) is present perfect, which doesn't match the past context. (C) is simple past, ignoring the sequence. (D) suggests the start was ongoing, which contradicts 'already.'"
  },
  {
    id: 'q-acten-016',
    section: 'english',
    topic: 'usage',
    difficulty: 30,
    stem: "Choose the best version of the underlined portion: 'The data _suggests_ that climate patterns are shifting rapidly.'",
    choices: ['suggests', 'has suggested', 'suggest', 'is suggesting'],
    answer: 2,
    explanation: "In formal/academic writing tested on the ACT, 'data' is treated as a plural noun (the singular is 'datum'), requiring the plural verb 'suggest.' (A) and (C) treat it as singular. (D) uses present perfect, changing the meaning and still treating 'data' as singular."
  },
  {
    id: 'q-acten-017',
    section: 'english',
    topic: 'usage',
    difficulty: 31,
    stem: "Choose the best version of the underlined portion: 'If she _would have studied_ harder, she would have passed the exam.'",
    choices: ['had studied', 'studied', 'would studied', 'would have studied'],
    answer: 0,
    explanation: "In a contrary-to-fact past conditional, the 'if' clause uses past perfect ('had studied'), and the result clause uses 'would have' + past participle. (A) and (C) incorrectly put 'would' in the if-clause. (D) uses simple past, breaking the conditional structure."
  },
  {
    id: 'q-acten-018',
    section: 'english',
    topic: 'usage',
    difficulty: 33,
    stem: "Choose the best version of the underlined portion: 'The committee, along with its three advisors, _are reviewing_ the proposal.'",
    choices: ['have reviewed', 'were reviewing', 'are reviewing', 'is reviewing'],
    answer: 3,
    explanation: "The subject is 'committee' (singular). Phrases set off by commas like 'along with its three advisors' do NOT affect subject-verb agreement. (A), (C), and (D) all use plural verbs. Only phrases with 'and' create compound subjects."
  },

  // ===== SENTENCE STRUCTURE (9) =====
  {
    id: 'q-acten-019',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 18,
    stem: "Choose the best version of the underlined portion: 'I love _hiking, I go_ every weekend.'",
    choices: ['hiking, I go', 'hiking, and I going', 'hiking. I go', 'hiking I go'],
    answer: 2,
    explanation: "(A) is a comma splice—two independent clauses joined by only a comma. A period correctly separates them. (B) is a run-on. (D) introduces a grammatical error ('I going' is not a complete verb)."
  },
  {
    id: 'q-acten-020',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 21,
    stem: "Choose the best version of the underlined portion: 'Walking through the park, _the flowers smelled wonderful_ to me.'",
    choices: ['the flowers smelled wonderful', 'I noticed that the flowers smelled wonderful', 'the smell of the flowers was wonderful', 'wonderful was how the flowers smelled'],
    answer: 1,
    explanation: "The opening modifier 'Walking through the park' must describe a person who can walk—not flowers. (A), (C), and (D) all create dangling modifiers because flowers/smell can't walk. Only (B) puts a person ('I') as the subject, fixing the dangling modifier."
  },
  {
    id: 'q-acten-021',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 23,
    stem: "Choose the best version of the underlined portion: 'She enjoys _hiking, swimming, and to bike_ on weekends.'",
    choices: [
      'hiking, swimming, and to bike',
      'hiking, swimming, and biking',
      'to hike, swimming, and biking',
      'hiking, to swim, and biking'
    ],
    answer: 1,
    explanation: "Parallel structure requires items in a list to share the same grammatical form. All three should be gerunds (-ing form): hiking, swimming, biking. (A), (C), and (D) all mix gerunds with infinitives ('to bike,' 'to hike,' 'to swim'), breaking parallelism."
  },
  {
    id: 'q-acten-022',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 25,
    stem: "Choose the best version of the underlined portion: '_Because the weather was bad, the game was canceled._'",
    choices: ['Because the weather was bad, the game was canceled.', 'Because the weather was bad, so the game was canceled.', 'Because the weather was bad. The game was canceled.', 'The weather was bad because the game was canceled.'],
    answer: 0,
    explanation: "The original correctly subordinates one clause to the other with 'because' and uses a comma after the introductory dependent clause. (B) creates a fragment ('Because the weather was bad'). (C) reverses cause and effect. (D) doubles up subordinators ('Because' + 'so'), which is incorrect."
  },
  {
    id: 'q-acten-023',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 27,
    stem: "Choose the best version of the underlined portion: 'The musician _practicing for hours every day, she_ finally mastered the piece.'",
    choices: ['practiced for hours every day, she', 'practiced for hours every day and', 'who practiced for hours every day', 'practicing for hours every day, she'],
    answer: 2,
    explanation: "The original is a fragment because 'practicing' isn't a complete verb. (A) creates a fragment with no main verb for 'musician.' (B) creates a comma splice/run-on. (C) leaves the sentence with two complete predicates joined awkwardly. (D) correctly adds a relative clause modifying 'musician,' leaving 'finally mastered' as the main verb."
  },
  {
    id: 'q-acten-024',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 28,
    stem: "Choose the best version of the underlined portion: 'The new policy will not only _reduce costs but also it improves_ efficiency.'",
    choices: ['reduce costs but also it improves', 'be reducing costs but also improving', 'reduce costs but also improve', 'reduce costs but it also improves'],
    answer: 2,
    explanation: "The 'not only X but also Y' construction requires X and Y to be parallel. After 'will not only reduce,' Y must also be a base verb: 'improve.' (A) and (C) shift to a new clause with 'it.' (D) shifts both verbs to progressive form, which doesn't match 'will.'"
  },
  {
    id: 'q-acten-025',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 30,
    stem: "Choose the best version of the underlined portion: 'Driving through the mountains, _spectacular views appeared at every turn._'",
    choices: ['we saw spectacular views at every turn.', 'spectacular views appeared at every turn.', 'every turn revealed spectacular views.', 'there were spectacular views at every turn.'],
    answer: 0,
    explanation: "'Driving through the mountains' must modify a person/people who drive. (A), (C), and (D) all create dangling modifiers because views, turns, and 'there' can't drive. Only (B) places 'we' (the drivers) as the subject."
  },
  {
    id: 'q-acten-026',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 32,
    stem: "Choose the best version of the underlined portion: 'The author argued that the policy was both _ineffective and that it was unjust._'",
    choices: ['ineffective and unjust.', 'ineffective and was unjust.', 'ineffective and that it was unjust.', 'ineffective and it was unjust.'],
    answer: 0,
    explanation: "After 'both,' the items joined by 'and' must be parallel. 'Both ineffective and unjust' joins two adjectives—perfectly parallel. (A) pairs an adjective with a 'that' clause. (C) pairs an adjective with an independent clause. (D) pairs an adjective with a verb phrase."
  },
  {
    id: 'q-acten-027',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 35,
    stem: "Choose the best version of the underlined portion: 'Having reviewed the manuscript carefully, _several errors were noted by the editor_ before publication.'",
    choices: ['the editor noted several errors', 'several errors were noted by the editor', 'there were several errors that the editor noted', 'several errors had been noted by the editor'],
    answer: 0,
    explanation: "The participial phrase 'Having reviewed the manuscript carefully' must modify the person who reviewed it—the editor. (A), (C), and (D) put 'errors' or 'there' as the subject, creating a dangling modifier (errors didn't review the manuscript). Only (B) makes the editor the subject."
  },

  // ===== STYLE / WORD CHOICE (9) =====
  {
    id: 'q-acten-028',
    section: 'english',
    topic: 'style',
    difficulty: 19,
    stem: "Which choice is the most concise? 'The reason why she was late was because of the fact that her car broke down.'",
    choices: ['Her being late was due to the fact that her car had broken down.', 'She was late because her car broke down.', 'The reason she was late was that her car broke down.', 'The reason why she was late was because of the fact that her car broke down.'],
    answer: 1,
    explanation: "(C) is shortest while preserving meaning. (A) contains multiple redundancies ('reason why,' 'was because,' 'of the fact that'). (B) trims some but keeps wordy phrasing. (D) uses awkward gerund construction and 'due to the fact that.'"
  },
  {
    id: 'q-acten-029',
    section: 'english',
    topic: 'style',
    difficulty: 22,
    stem: "Which choice is the most concise? 'The committee made the final decision to postpone the event.'",
    choices: ['made the final decision to postpone', 'made a decision that they would postpone', 'came to the conclusion that they should postpone', 'decided to postpone'],
    answer: 3,
    explanation: "(B) is the most concise verb phrase. (A) uses 'made the final decision,' which can be replaced by the simple verb 'decided.' (C) and (D) are even more wordy with no gain in clarity."
  },
  {
    id: 'q-acten-030',
    section: 'english',
    topic: 'style',
    difficulty: 24,
    stem: "Choose the best version of the underlined portion: 'The annual yearly report will be _released in the month of June_ next year.'",
    choices: ['released during the month of June', 'released in June', 'released in the month of June', 'released sometime in June'],
    answer: 1,
    explanation: "'June' is already a month, so 'in the month of June' is redundant. (B) is the most concise. (A), (C), and (D) all repeat the month idea unnecessarily. Note also the original sentence has 'annual yearly,' another redundancy outside the underlined portion."
  },
  {
    id: 'q-acten-031',
    section: 'english',
    topic: 'style',
    difficulty: 25,
    stem: "Which choice is the most concise? 'In my own personal opinion, I think the proposal needs revisions.'",
    choices: ['In my own personal opinion, I think the proposal', 'In my opinion, I think the proposal', 'The proposal', 'In my personal opinion, the proposal'],
    answer: 2,
    explanation: "Since the entire sentence is the writer's opinion, opinion phrases are redundant. (D) eliminates them entirely. (A) has triple redundancy ('my own personal'). (B) and (C) still have 'I think' or 'opinion,' which restate that the writer is sharing a view."
  },
  {
    id: 'q-acten-032',
    section: 'english',
    topic: 'style',
    difficulty: 27,
    stem: "Choose the best version of the underlined portion: 'The scientist made a discovery that was new and unprecedented, _which had never been seen before._'",
    choices: ['and groundbreaking.', 'and totally unique.', 'DELETE the underlined portion (and end with a period).', 'which had never been seen before.'],
    answer: 2,
    explanation: "'New,' 'unprecedented,' 'never been seen,' 'unique,' and 'groundbreaking' all mean roughly the same thing. The sentence already says 'new and unprecedented,' so any addition is redundant. Deleting yields a clean, concise sentence."
  },
  {
    id: 'q-acten-033',
    section: 'english',
    topic: 'style',
    difficulty: 28,
    stem: "Choose the best version of the underlined portion: 'The hikers _quickly and rapidly_ ascended the trail.'",
    choices: ['with quickness', 'quickly', 'in a rapid and quick fashion', 'quickly and rapidly'],
    answer: 1,
    explanation: "'Quickly' and 'rapidly' are synonyms—using both is redundant. (B) uses one word and is most concise. (C) is wordy ('with quickness' = 'quickly'). (D) is even more redundant and verbose."
  },
  {
    id: 'q-acten-034',
    section: 'english',
    topic: 'style',
    difficulty: 30,
    stem: "Choose the best version of the underlined portion: 'The novel _explores themes of identity, also examining issues of belonging,_ in modern society.'",
    choices: ['explores themes of identity and belonging', 'is exploring themes of identity, in addition to examining belonging,', 'explores themes of identity, also examining issues of belonging,', 'explores themes of identity, and it also examines issues of belonging,'],
    answer: 0,
    explanation: "(B) combines two related ideas concisely. (A) creates an awkward participial phrase. (C) is wordy with 'and it also' and 'examines issues of.' (D) shifts to progressive tense and adds 'in addition to.' Concision favors combining parallel objects after one verb."
  },
  {
    id: 'q-acten-035',
    section: 'english',
    topic: 'style',
    difficulty: 31,
    stem: "Choose the best version of the underlined portion: 'The architect designed a building that _was tall in height and possessed a structure of unique design._'",
    choices: ['had height and a uniqueness about its design.', 'was tall and uniquely designed.', 'rose to a tall height with a design that was unique.', 'was tall in height and possessed a structure of unique design.'],
    answer: 1,
    explanation: "(B) is most concise and removes redundancies ('tall in height,' 'possessed a structure of'). (A), (C), and (D) all contain redundant phrases ('tall in height,' 'rose to a tall height') or wordy constructions ('possessed a structure of unique design')."
  },
  {
    id: 'q-acten-036',
    section: 'english',
    topic: 'style',
    difficulty: 34,
    stem: "Choose the best version of the underlined portion: 'The researchers' findings, _which were the result of years of careful and meticulous study,_ challenged conventional wisdom.'",
    choices: ['which had resulted from years of study that was careful and meticulous,', 'the result of years of meticulous study,', 'which were the result of years of careful and meticulous study,', 'being the result of careful study over many years that were meticulous,'],
    answer: 1,
    explanation: "(B) drops the relative pronoun and verb ('which were'), uses a single adjective ('meticulous' implies 'careful'), and is the tightest. (A) is redundant ('careful and meticulous'). (C) is awkwardly ordered. (D) is wordy and also doubles synonyms."
  },

  // ===== TRANSITIONS (9) =====
  {
    id: 'q-acten-037',
    section: 'english',
    topic: 'transitions',
    difficulty: 18,
    stem: "Which transition word best fits the logical relationship? 'The team practiced for hours every day. _____, they lost the championship game.'",
    choices: ['Therefore', 'Similarly', 'However', 'Furthermore'],
    answer: 2,
    explanation: "The relationship is contrast: practiced hard BUT lost. 'However' signals contrast. (A) signals cause-effect (the opposite). (B) adds information (no contrast). (D) signals comparison/likeness."
  },
  {
    id: 'q-acten-038',
    section: 'english',
    topic: 'transitions',
    difficulty: 20,
    stem: "Which transition word best fits the logical relationship? 'The bridge was structurally unsound. _____, the city closed it for repairs.'",
    choices: ['Meanwhile', 'Therefore', 'In contrast', 'Nevertheless'],
    answer: 1,
    explanation: "Cause and effect: unsound bridge → closed for repairs. 'Therefore' signals consequence. (A) signals contrast. (C) signals contrast. (D) signals simultaneous time, not causation."
  },
  {
    id: 'q-acten-039',
    section: 'english',
    topic: 'transitions',
    difficulty: 23,
    stem: "Which transition word best fits the logical relationship? 'The new restaurant has excellent food. _____, the service is impressively fast.'",
    choices: ['Otherwise', 'On the other hand', 'In addition', 'However'],
    answer: 2,
    explanation: "Both clauses give positive qualities of the restaurant—addition, not contrast. 'In addition' adds a similar point. (A) and (D) signal contrast. (C) signals an alternative or warning ('do this, otherwise...')."
  },
  {
    id: 'q-acten-040',
    section: 'english',
    topic: 'transitions',
    difficulty: 25,
    stem: "Which transition word best fits the logical relationship? 'Many people believe coffee dehydrates you. _____, recent studies show it does not significantly affect hydration.'",
    choices: ['Likewise', 'For example', 'Consequently', 'In fact'],
    answer: 3,
    explanation: "The second clause corrects/refines the first—the studies contradict the popular belief. 'In fact' introduces a corrective or strengthening counterpoint. (A) provides an example. (B) signals consequence. (D) signals similarity."
  },
  {
    id: 'q-acten-041',
    section: 'english',
    topic: 'transitions',
    difficulty: 26,
    stem: "Which transition word best fits the logical relationship? 'The company posted record profits this quarter. _____, employee morale has reached an all-time low.'",
    choices: ['As a result', 'Furthermore', 'Similarly', 'Ironically'],
    answer: 3,
    explanation: "Record profits would normally boost morale, but morale is low—an unexpected, contradictory pairing. 'Ironically' captures this. (A) signals expected cause-effect. (B) and (D) suggest the second idea continues or matches the first."
  },
  {
    id: 'q-acten-042',
    section: 'english',
    topic: 'transitions',
    difficulty: 28,
    stem: "Which transition word best fits the logical relationship? 'The proposal received unanimous support from the board. _____, it required only minor revisions before approval.'",
    choices: ['Consequently', 'For instance', 'Nevertheless', 'In contrast'],
    answer: 0,
    explanation: "Unanimous support naturally leads to easy approval—a cause-effect relationship. 'Consequently' fits. (A) and (C) signal contrast, which doesn't apply. (D) introduces an example, but the second clause isn't an example of unanimous support."
  },
  {
    id: 'q-acten-043',
    section: 'english',
    topic: 'transitions',
    difficulty: 29,
    stem: "Which transition word best fits the logical relationship? 'Critics praised the novel's intricate plot. _____, some readers found its pacing too slow to enjoy.'",
    choices: ['For this reason,', 'Moreover', 'Therefore,', 'That said,'],
    answer: 3,
    explanation: "The sentence shifts from praise to a qualifying critique—'that said' acknowledges the previous point while pivoting to a contrasting one. (A) adds in the same direction. (C) and (D) signal cause-effect, which doesn't fit (praise doesn't cause readers to dislike pacing)."
  },
  {
    id: 'q-acten-044',
    section: 'english',
    topic: 'transitions',
    difficulty: 32,
    stem: "Which transition word best fits the logical relationship? 'The expedition leader had detailed maps and modern equipment. _____, even experienced climbers can be surprised by sudden weather changes.'",
    choices: ['Therefore,', 'In summary,', 'Likewise,', 'Still,'],
    answer: 3,
    explanation: "Despite preparation, danger remains—a contrast/concession. 'Still' signals 'in spite of what was just said.' (A) signals similarity. (C) signals cause-effect (preparation does not cause surprise). (D) is a summary marker, but no summary follows."
  },
  {
    id: 'q-acten-045',
    section: 'english',
    topic: 'transitions',
    difficulty: 36,
    stem: "Which transition word best fits the logical relationship? 'Solar panels reduce long-term energy costs and lower carbon emissions. _____, the high upfront installation cost prevents many homeowners from adopting them.'",
    choices: ['Accordingly,', 'By the same token,', 'In particular,', 'Even so,'],
    answer: 3,
    explanation: "Despite clear benefits, adoption is limited—classic concession/contrast. 'Even so' (meaning 'despite that') is precise here. (A) signals consequence. (B) signals an example or specification, but the second clause isn't an example of benefits. (D) signals a parallel/similar idea, but cost is opposed to benefits, not parallel."
  }
]);
