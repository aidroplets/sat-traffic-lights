/**
 * ACT English — fill batch 2 (50 more questions, distinct from the
 * 45 in questions-act-english.js and the 40 in questions-act-english-fill.js).
 *
 * testType: 'ACT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'english'
 *
 * Concatenates onto window.STL_QUESTIONS_ACT.
 *
 * Distribution:
 *   - 13 punctuation, 13 usage, 12 sentence-structure, 12 rhetorical-skill
 *   - difficulty: 10 easy (18-22), 20 medium (24-28), 15 hard (30-33), 5 insane (34-36)
 *   - answer index spread across A/B/C/D
 */
'use strict';

window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  // ===== PUNCTUATION (13) =====
  {
    id: 'q-acten-fill2-001',
    section: 'english',
    topic: 'punctuation',
    difficulty: 19,
    stem: "The new librarian [Ms. Alvarez,] organized a poetry night every Thursday. Which is best?",
    choices: ['NO CHANGE', 'Ms. Alvarez', ', Ms. Alvarez', ', Ms. Alvarez,'],
    answer: 3,
    explanation: "Rule: an appositive that renames a noun and is non-essential takes a comma on BOTH sides. 'Ms. Alvarez' renames 'the new librarian' and must be set off with paired commas. (A) has only a closing comma. (B) drops both. (C) has only an opening comma."
  },
  {
    id: 'q-acten-fill2-002',
    section: 'english',
    topic: 'punctuation',
    difficulty: 20,
    stem: "After running for nearly an hour [, Marcus] stopped to catch his breath. Which is best?",
    choices: ['NO CHANGE', ' Marcus', '; Marcus', ': Marcus'],
    answer: 0,
    explanation: "Rule: an introductory adverbial phrase is set off from the main clause by a comma. (B) creates a run-together construction. (C) misuses a semicolon (which joins two independent clauses). (D) misuses a colon (which follows an independent clause introducing a list or explanation)."
  },
  {
    id: 'q-acten-fill2-003',
    section: 'english',
    topic: 'punctuation',
    difficulty: 30,
    stem: "The package [arrived, this morning] before I left for work. Which is best?",
    choices: ['NO CHANGE', 'arrived this morning,', 'arrived this morning', 'arrived; this morning,'],
    answer: 2,
    explanation: "Rule: do not separate a verb from its object/adverb with a single comma, and do not place a comma between two essential adverbial elements. 'This morning' modifies 'arrived'; no commas are needed. (A) wrongly inserts a comma between verb and adverb. (B) places a comma between subject-verb-adverb and the following essential adverbial. (D) misuses a semicolon."
  },
  {
    id: 'q-acten-fill2-004',
    section: 'english',
    topic: 'punctuation',
    difficulty: 25,
    stem: "Her favorite hobbies [are reading, painting, and gardening]. Which is best?",
    choices: ['NO CHANGE', 'are; reading, painting and gardening', 'are: reading, painting, and gardening', 'are, reading, painting, and gardening'],
    answer: 0,
    explanation: "Rule: do not insert any punctuation between a linking verb and its subject complement. 'Are' must be followed directly by the list. (B) misuses a semicolon and drops the Oxford comma. (C) misuses a colon — the colon must follow an independent clause, but 'Her favorite hobbies are' is not yet complete. (D) places a comma between verb and complement."
  },
  {
    id: 'q-acten-fill2-005',
    section: 'english',
    topic: 'punctuation',
    difficulty: 24,
    stem: "My grandfather [who immigrated from Poland] still tells stories about the old country. Which is best?",
    choices: ['NO CHANGE', ', who immigrated from Poland', '; who immigrated from Poland,', ', who immigrated from Poland,'],
    answer: 3,
    explanation: "Rule: a non-restrictive 'who' clause adding extra information about a specific noun takes paired commas. Since the speaker has only one grandfather (proper-noun-like), the clause is non-essential. (A) drops both commas. (B) drops the closing comma. (C) misuses a semicolon."
  },
  {
    id: 'q-acten-fill2-006',
    section: 'english',
    topic: 'punctuation',
    difficulty: 25,
    stem: "The hike was exhausting [the view, however,] was worth every step. Which is best?",
    choices: ['NO CHANGE', '; the view, however,', ', the view however,', '. The view however'],
    answer: 1,
    explanation: "Rule: two independent clauses joined by a conjunctive adverb ('however') require a semicolon before and a comma after. (A) is a comma splice. (C) is a comma splice and drops the comma before 'however.' (D) is a fused construction missing the comma after 'however.'"
  },
  {
    id: 'q-acten-fill2-007',
    section: 'english',
    topic: 'punctuation',
    difficulty: 26,
    stem: "The conference will feature three speakers [Dr. Lin a biologist Dr. Patel a chemist] and Dr. Reyes, a physicist. Which is best?",
    choices: ['NO CHANGE', ': Dr. Lin, a biologist, Dr. Patel, a chemist,', ': Dr. Lin, a biologist; Dr. Patel, a chemist;', '; Dr. Lin a biologist; Dr. Patel a chemist;'],
    answer: 2,
    explanation: "Rule: when items in a series themselves contain commas, separate the items with semicolons to avoid confusion. A colon introduces the list after the independent clause. (A) lacks all needed punctuation. (B) uses commas only, blurring item boundaries. (D) drops the appositive commas inside each item."
  },
  {
    id: 'q-acten-fill2-008',
    section: 'english',
    topic: 'punctuation',
    difficulty: 27,
    stem: "The film, [which won three awards last year,] is being re-released this summer. Which is best?",
    choices: ['NO CHANGE', 'which won three awards last year', 'which won three awards last year is', 'that won three awards last year'],
    answer: 0,
    explanation: "Rule: a non-restrictive 'which' clause requires commas on both sides. The opening comma is already present, so we must close the clause with a comma before the verb 'is.' (B) drops the closing comma. (C) drops the closing comma AND duplicates the verb. (D) switches to 'that' (restrictive), but the opening comma already marks the clause as non-restrictive — these conventions must agree."
  },
  {
    id: 'q-acten-fill2-009',
    section: 'english',
    topic: 'punctuation',
    difficulty: 28,
    stem: "Renovating the old theater took longer than expected [the result however was] spectacular. Which is best?",
    choices: ['NO CHANGE', '; the result, however, was', ', the result, however was', '. the result however was'],
    answer: 1,
    explanation: "Rule: join two independent clauses with a semicolon, and set off the parenthetical conjunctive adverb 'however' with paired commas. (A) is a fused sentence. (C) is a comma splice missing the second comma around 'however.' (D) lowercases the start of a new sentence and omits commas around 'however.'"
  },
  {
    id: 'q-acten-fill2-010',
    section: 'english',
    topic: 'punctuation',
    difficulty: 30,
    stem: "The committee endorsed only one candidate [Senator Ortega,] whose record on education was strongest. Which is best?",
    choices: ['NO CHANGE', ', Senator Ortega', '; Senator Ortega,', ': Senator Ortega'],
    answer: 3,
    explanation: "Rule: a colon may follow an independent clause to introduce a noun (or appositive) that specifies what came before. 'Only one candidate' is the slot, and 'Senator Ortega' fills it. (A) uses a comma but drops the closing comma needed if treated as appositive. (B) uses a comma where a colon better signals the specification. (C) misuses a semicolon, which would require an independent clause to follow."
  },
  {
    id: 'q-acten-fill2-011',
    section: 'english',
    topic: 'punctuation',
    difficulty: 31,
    stem: "The detective examined the evidence [carefully, before, drawing] any conclusions. Which is best?",
    choices: ['NO CHANGE', 'carefully before, drawing', 'carefully, before drawing', 'carefully before drawing'],
    answer: 3,
    explanation: "Rule: do not place commas around a restrictive prepositional phrase ('before drawing any conclusions') that is essential to the meaning. No commas are needed at all. (A) inserts two unnecessary commas. (B) and (C) each insert one. The phrase modifies 'examined' tightly and should not be set off."
  },
  {
    id: 'q-acten-fill2-012',
    section: 'english',
    topic: 'punctuation',
    difficulty: 32,
    stem: "She had only one ambition [: to publish a novel] before her thirtieth birthday. Which is best?",
    choices: ['NO CHANGE', ', to publish a novel', '; to publish a novel', ' to publish, a novel'],
    answer: 0,
    explanation: "Rule: a colon following an independent clause may introduce an infinitive phrase that explains or specifies the preceding noun. 'She had only one ambition' is independent; the colon properly introduces what that ambition is. (B) is acceptable in casual prose but loses the emphatic specification. (C) misuses a semicolon. (D) creates a comma splice between verb and object."
  },
  {
    id: 'q-acten-fill2-013',
    section: 'english',
    topic: 'punctuation',
    difficulty: 34,
    stem: "The professor's argument [, though carefully reasoned, ultimately failed] to persuade the skeptical reviewers. Which is best?",
    choices: ['NO CHANGE', ' though carefully reasoned ultimately failed', ', though carefully reasoned ultimately failed,', ', though carefully reasoned ultimately, failed'],
    answer: 0,
    explanation: "Rule: a non-restrictive participial/adverbial interrupter is set off with paired commas, and no extra comma should appear between the subject and verb. (B) drops both commas, fusing the interrupter into the subject. (C) misplaces the closing comma after 'failed,' separating the interrupter incorrectly. (D) wrongly inserts a comma between 'ultimately' and 'failed.'"
  },

  // ===== USAGE (13) =====
  {
    id: 'q-acten-fill2-014',
    section: 'english',
    topic: 'usage',
    difficulty: 18,
    stem: "Neither of the twins [have] finished their homework yet. Which is best?",
    choices: ['NO CHANGE', 'are having', 'have been', 'has'],
    answer: 3,
    explanation: "Rule: 'neither' is singular and takes a singular verb. 'Neither of the twins has finished' is correct. (A), (B), (C) all use plural or progressive forms, ignoring that the indefinite pronoun 'neither,' not 'twins,' is the subject."
  },
  {
    id: 'q-acten-fill2-015',
    section: 'english',
    topic: 'usage',
    difficulty: 19,
    stem: "Between you and [I,] this is the best chowder in town. Which is best?",
    choices: ['NO CHANGE', 'me,', 'myself,', 'I personally,'],
    answer: 1,
    explanation: "Rule: pronouns following a preposition take the objective case. 'Between' is a preposition, so 'between you and me' is correct. (A) uses subjective 'I.' (C) misuses the reflexive 'myself,' which requires an antecedent in the same clause. (D) is wordy and still subjective."
  },
  {
    id: 'q-acten-fill2-016',
    section: 'english',
    topic: 'usage',
    difficulty: 20,
    stem: "If she [had known] about the change, she would have left earlier. Which is best?",
    choices: ['NO CHANGE', 'would have known', 'would of known', 'has known'],
    answer: 0,
    explanation: "Rule: in a past contrary-to-fact conditional, the 'if' clause uses the past perfect ('had known') and the result clause uses 'would have' + past participle. (B) wrongly uses 'would have' in the if-clause. (C) is the nonstandard 'would of.' (D) uses the present perfect, breaking the time frame."
  },
  {
    id: 'q-acten-fill2-017',
    section: 'english',
    topic: 'usage',
    difficulty: 30,
    stem: "The committee released [their] final report on Friday. Which is best?",
    choices: ['NO CHANGE', 'they\'re', 'it\'s', 'its'],
    answer: 3,
    explanation: "Rule: collective nouns acting as a single unit take singular pronouns ('its'). The committee here is acting as one body. (A) uses plural 'their.' (B) is the contraction 'they are.' (C) is the contraction 'it is.'"
  },
  {
    id: 'q-acten-fill2-018',
    section: 'english',
    topic: 'usage',
    difficulty: 22,
    stem: "The student who studies hardest will [recieve] the scholarship. Which is best?",
    choices: ['NO CHANGE', 'receive', 'recieved', 'received'],
    answer: 1,
    explanation: "Rule: 'i before e except after c' — 'receive' is correct. The sentence is in future tense ('will'), so the base form is needed. (A) misspells. (C) misspells AND uses past tense. (D) uses past tense after 'will.'"
  },
  {
    id: 'q-acten-fill2-019',
    section: 'english',
    topic: 'usage',
    difficulty: 24,
    stem: "Each of the dancers [was practicing his or her routine] before the curtain rose. Which is best?",
    choices: ['NO CHANGE', 'were practicing his or her routine', 'was practicing their routine', 'were practicing their routine'],
    answer: 0,
    explanation: "Rule: 'each' is singular and requires a singular verb ('was') and singular pronoun ('his or her'). (B) keeps the singular pronoun but uses plural verb. (C) keeps singular verb but uses plural pronoun, which the ACT considers nonstandard with 'each.' (D) uses both plural verb and plural pronoun."
  },
  {
    id: 'q-acten-fill2-020',
    section: 'english',
    topic: 'usage',
    difficulty: 25,
    stem: "The novelist's latest book is [more shorter] than her previous one. Which is best?",
    choices: ['NO CHANGE', 'more short', 'shorter', 'shortest'],
    answer: 2,
    explanation: "Rule: do not double a comparative — use either the '-er' suffix or 'more,' not both. 'Shorter' is the proper comparative form. (A) doubles up. (B) uses 'more' with a one-syllable adjective, which is nonstandard. (D) is the superlative, used for three or more items."
  },
  {
    id: 'q-acten-fill2-021',
    section: 'english',
    topic: 'usage',
    difficulty: 26,
    stem: "Of the two finalists, Lila is [the most talented] singer. Which is best?",
    choices: ['NO CHANGE', 'the talented', 'talented more', 'the more talented'],
    answer: 3,
    explanation: "Rule: when comparing exactly TWO items, use the comparative ('more talented'), not the superlative ('most talented'). (A) wrongly uses superlative for two. (B) loses the comparison. (C) is ungrammatical word order."
  },
  {
    id: 'q-acten-fill2-022',
    section: 'english',
    topic: 'usage',
    difficulty: 27,
    stem: "She [layed] the manuscript on the table and walked out of the room. Which is best?",
    choices: ['NO CHANGE', 'lay', 'laid', 'lain'],
    answer: 2,
    explanation: "Rule: 'lay' (transitive — to put down) has principal parts lay/laid/laid. The simple past of the transitive verb is 'laid.' (A) is the misspelling 'layed.' (B) is the past tense of intransitive 'lie' or the present of 'lay.' (D) is the past participle of intransitive 'lie.'"
  },
  {
    id: 'q-acten-fill2-023',
    section: 'english',
    topic: 'usage',
    difficulty: 28,
    stem: "There are [less options] available than there were last year. Which is best?",
    choices: ['NO CHANGE', 'fewer options', 'lesser options', 'fewer of options'],
    answer: 1,
    explanation: "Rule: use 'fewer' for count nouns and 'less' for non-count nouns. 'Options' are countable, so 'fewer options.' (A) misuses 'less.' (C) 'lesser' means inferior in quality, not smaller in number. (D) is ungrammatical."
  },
  {
    id: 'q-acten-fill2-024',
    section: 'english',
    topic: 'usage',
    difficulty: 30,
    stem: "Maya is one of those readers who [devours] every novel on the bestseller list. Which is best?",
    choices: ['NO CHANGE', 'is devouring', 'has devoured', 'devour'],
    answer: 3,
    explanation: "Rule: in a 'one of those X who' construction, the relative pronoun's antecedent is the plural noun ('readers'), so the verb is plural: 'who devour.' (A) treats 'who' as singular ('Maya'). (B) and (C) shift number/aspect inconsistently with the timeless general claim."
  },
  {
    id: 'q-acten-fill2-025',
    section: 'english',
    topic: 'usage',
    difficulty: 31,
    stem: "The committee will award the prize to [whomever] submits the most original entry. Which is best?",
    choices: ['NO CHANGE', 'whoever', 'whom', 'who ever'],
    answer: 1,
    explanation: "Rule: the case of 'who/whom' is determined by its function INSIDE its own clause, not by the preceding preposition. 'Whoever submits' is the subject of 'submits,' so the subjective 'whoever' is correct. The entire clause is the object of 'to.' (A) wrongly uses objective. (C) drops the '-ever' and becomes ungrammatical. (D) splits the word."
  },
  {
    id: 'q-acten-fill2-026',
    section: 'english',
    topic: 'usage',
    difficulty: 33,
    stem: "Either the manager or the assistants [is] responsible for closing the shop. Which is best?",
    choices: ['NO CHANGE', 'are', 'has been', 'was'],
    answer: 1,
    explanation: "Rule: with 'either...or' (or 'neither...nor'), the verb agrees with the NEAREST subject. The nearest subject is the plural 'assistants,' so 'are' is correct. (A), (C), (D) use singular forms that agree with the farther subject, violating the proximity rule."
  },

  // ===== SENTENCE STRUCTURE (12) =====
  {
    id: 'q-acten-fill2-027',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 19,
    stem: "[Walking through the museum, Aiden was impressed by the paintings.] Which is best?",
    choices: ['NO CHANGE', 'Walking through the museum, the paintings impressed Aiden.', 'The paintings impressed Aiden, walking through the museum.', 'Walking through the museum, impressed Aiden by the paintings.'],
    answer: 0,
    explanation: "Rule: an opening participial phrase must modify the subject of the main clause. 'Walking through the museum' must describe a person, so 'Aiden' belongs at the head of the main clause. (B) is a dangling modifier — paintings cannot walk. (C) is ambiguous and awkward. (D) lacks a clear subject."
  },
  {
    id: 'q-acten-fill2-028',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 20,
    stem: "[The road was icy, we drove very slowly.] Which is best?",
    choices: ['NO CHANGE', 'The road was icy we drove very slowly.', 'The road was icy, however we drove very slowly.', 'Because the road was icy, we drove very slowly.'],
    answer: 3,
    explanation: "Rule: two independent clauses cannot be joined by a comma alone (comma splice). Adding a subordinating conjunction makes one clause dependent and fixes the splice while clarifying causation. (A) is a comma splice. (B) is a fused (run-on) sentence. (C) is another comma splice and adds an illogical contrast word."
  },
  {
    id: 'q-acten-fill2-029',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 22,
    stem: "[While reviewing the contract carefully.] We noticed several typos. Which is best?",
    choices: ['NO CHANGE', 'While reviewing the contract carefully', 'Reviewing the contract carefully.', 'While reviewing the contract carefully,'],
    answer: 3,
    explanation: "Rule: a subordinate clause beginning with 'while' is a fragment unless attached to an independent clause; the comma joins it to 'we noticed.' (A) leaves a fragment. (B) drops the comma after the introductory subordinate clause. (C) creates a participial fragment with a period."
  },
  {
    id: 'q-acten-fill2-030',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 23,
    stem: "[To win the championship, hours of practice were needed by the team.] Which is best?",
    choices: ['NO CHANGE', 'To win the championship, the team needed hours of practice.', 'Hours of practice was needed by the team to win the championship.', 'Needing hours of practice, the championship required the team.'],
    answer: 1,
    explanation: "Rule: an opening infinitive phrase ('To win the championship') must logically modify the subject of the main clause; the agent who wins must appear as that subject. (B) makes 'the team' the subject. (A) dangles and uses passive voice. (C) drops the modifier issue but uses awkward passive and bad agreement. (D) creates a nonsensical modifier."
  },
  {
    id: 'q-acten-fill2-031',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 24,
    stem: "Selena enjoys [hiking, swimming, and to bike] on weekends. Which is best?",
    choices: ['NO CHANGE', 'to hike, swimming, and biking', 'to hike, to swim, and biking', 'hiking, swimming, and biking'],
    answer: 3,
    explanation: "Rule: items in a series must be in parallel grammatical form. All three should be gerunds: 'hiking, swimming, and biking.' (A) mixes a gerund pair with an infinitive. (B) and (C) mix infinitives and gerunds inconsistently."
  },
  {
    id: 'q-acten-fill2-032',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 25,
    stem: "[Nervous about the audition Marcus, practiced his monologue all morning.] Which is best?",
    choices: ['NO CHANGE', 'Nervous, about the audition Marcus practiced his monologue all morning.', 'Nervous about the audition, Marcus practiced his monologue all morning.', 'Nervous about the audition Marcus practiced, his monologue all morning.'],
    answer: 2,
    explanation: "Rule: an introductory adjective phrase is set off from the main clause by a single comma after the phrase, with no commas inside. (A) misplaces the comma after 'Marcus.' (B) misplaces it after 'Nervous.' (D) places the comma between verb and object."
  },
  {
    id: 'q-acten-fill2-033',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 34,
    stem: "The new policy was [not only unpopular but also confusing] to enforce. Which is best?",
    choices: ['NO CHANGE', 'not only unpopular but it was also confusing', 'not only unpopular but also it was confusing', 'unpopular not only but confusing also'],
    answer: 0,
    explanation: "Rule: correlative conjunctions ('not only...but also') require parallel grammatical structures on both sides. Two adjectives — 'unpopular' and 'confusing' — must follow each half. (B) makes the second half a clause and misplaces 'also.' (C) makes the second half a clause. (D) breaks the correlative pair entirely."
  },
  {
    id: 'q-acten-fill2-034',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 34,
    stem: "[Having finished the experiment, the data was analyzed by the students.] Which is best?",
    choices: ['NO CHANGE', 'The data, having finished the experiment, was analyzed by the students.', 'Having finished the experiment, the students analyzed the data.', 'After finishing, the experiment, the data was analyzed by the students.'],
    answer: 2,
    explanation: "Rule: a perfect-participial opener ('having finished') must modify the subject; only people can finish an experiment. (C) properly attaches the phrase to 'the students.' (A) dangles, with 'data' implausibly finishing the experiment. (B) puts the modifier next to the wrong noun. (D) creates a misplaced comma and still dangles."
  },
  {
    id: 'q-acten-fill2-035',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 30,
    stem: "The director argued that the script needed [to be revised, to add more dialogue, and tightening] the ending. Which is best?",
    choices: ['NO CHANGE', 'to be revised, to add more dialogue, and to tighten', 'revising, adding more dialogue, and to tighten', 'revision, more dialogue added, and tightening'],
    answer: 1,
    explanation: "Rule: a series following 'needed' must be parallel — three infinitives in this case. 'To be revised, to add more dialogue, and to tighten the ending.' (A) mixes infinitives with a gerund. (C) starts with gerunds then switches to an infinitive. (D) jumbles noun and gerund forms."
  },
  {
    id: 'q-acten-fill2-036',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 31,
    stem: "[Driving down the coast, we saw the cliffs glow at sunset.] Which is best?",
    choices: ['NO CHANGE', 'Driving down the coast, the cliffs seemed to glow at sunset.', 'The cliffs, driving down the coast, seemed to glow at sunset.', 'Driving down the coast and the cliffs seemed to glow at sunset.'],
    answer: 0,
    explanation: "Rule: an introductory participial phrase must modify the subject of the main clause. Cliffs cannot drive, so 'we' must head the main clause. (B) is a classic dangling modifier — cliffs implausibly driving. (C) places the modifier next to 'cliffs.' (D) creates a fragment-like 'and' juncture with no main subject for the modifier."
  },
  {
    id: 'q-acten-fill2-037',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 32,
    stem: "Rosa was praised both for her [dedication and because she had creativity.] Which is best?",
    choices: ['NO CHANGE', 'dedication and creating things.', 'dedication and her creativity.', 'dedicating and creating.'],
    answer: 2,
    explanation: "Rule: 'both...and' requires parallel structures on each side. Two nouns — 'dedication' and 'creativity' — preserve parallelism. (A) follows a noun with a clause. (B) follows a noun with a gerund phrase. (D) drops the noun on the first half by switching to a gerund and changes the meaning."
  },
  {
    id: 'q-acten-fill2-038',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 35,
    stem: "[Although the data appeared promising, but the researchers remained skeptical of the results.] Which is best?",
    choices: ['NO CHANGE', 'The data appeared promising, although but the researchers remained skeptical of the results.', 'Although the data appeared promising, the researchers remained skeptical of the results.', 'Although the data appeared promising; the researchers remained skeptical of the results.'],
    answer: 2,
    explanation: "Rule: do not pair a subordinating conjunction ('although') with a coordinating conjunction ('but') in the same sentence; one or the other does the contrast. (A) doubles up. (B) reorders the doubling but keeps it. (D) misuses a semicolon — semicolons join two independent clauses, but 'Although the data appeared promising' is dependent."
  },

  // ===== RHETORICAL SKILL (12) =====
  {
    id: 'q-acten-fill2-039',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 20,
    stem: "[At this point in time,] the city council voted to delay the project. Which choice is the most concise and effective?",
    choices: ['NO CHANGE', 'At this time,', 'Then,', 'In present circumstances of the moment,'],
    answer: 2,
    explanation: "Rule: prefer concise wording that preserves meaning. 'Then' communicates the same information in one word. (A) is a classic redundancy ('point' + 'time'). (B) is still wordy. (D) is even more bloated and adds no information."
  },
  {
    id: 'q-acten-fill2-040',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 30,
    stem: "Sentence: 'The cake was [a perfect circular round shape].' Which choice is the most concise and effective?",
    choices: ['NO CHANGE', 'a perfectly circular shape', 'circular', 'shaped in a circular roundness'],
    answer: 2,
    explanation: "Rule: avoid redundancy and unnecessary modifiers. 'Circular' alone conveys 'round shape.' (A) stacks three synonyms. (B) is still slightly redundant ('circular shape'). (D) is inflated phrasing for a simple word."
  },
  {
    id: 'q-acten-fill2-041',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 25,
    stem: "An essay about urban gardens needs an introductory sentence. Which choice best engages the reader and previews the topic?",
    choices: [
      'NO CHANGE: Urban gardens are gardens that exist in urban places.',
      'Many people have many opinions about gardens, both urban and rural.',
      'This essay will discuss urban gardens.',
      'In neighborhoods once paved over with concrete, raised beds of tomatoes and basil are quietly transforming city blocks.'
    ],
    answer: 3,
    explanation: "Rule: an effective opener is specific, vivid, and previews the essay's focus. (D) uses concrete imagery ('raised beds of tomatoes and basil') and frames the transformation theme. (A) is circular and uninformative. (B) is vague and generic. (C) baldly announces intent in a way the ACT considers weak rhetoric."
  },
  {
    id: 'q-acten-fill2-042',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 24,
    stem: "Paragraph 3 discusses a coral reef's color loss; paragraph 4 begins, '[On a related note,] warming oceans also threaten kelp forests.' Which transition is best?",
    choices: ['NO CHANGE', 'However,', 'Similarly,', 'In conclusion,'],
    answer: 2,
    explanation: "Rule: the right transition signals the logical relationship between paragraphs. The two paragraphs describe parallel ecological harms, so a comparison transition is needed. 'Similarly' makes that relationship explicit. (A) is vague filler. (B) signals contrast, which contradicts the parallel relationship. (D) signals a final summary, which doesn't fit a body-paragraph transition."
  },
  {
    id: 'q-acten-fill2-043',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 25,
    stem: "An essay about the history of bicycles includes the sentence: 'My uncle prefers riding a tandem with my aunt on Sundays.' What should the writer do?",
    choices: [
      'Keep it, because it adds a personal touch.',
      'Delete it, because it strays from the essay\'s focus on the history of bicycles.',
      'Keep it, because it provides specific detail about bicycles.',
      'Delete it, because it is grammatically incorrect.'
    ],
    answer: 1,
    explanation: "Rule: every sentence in an essay must support the central topic. A personal anecdote about a relative's hobby is irrelevant to a HISTORY of bicycles. (A) and (C) prioritize style over relevance. (D) is wrong because the sentence is grammatical; the issue is purpose."
  },
  {
    id: 'q-acten-fill2-044',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 26,
    stem: "After describing a chef's preparation steps, the writer wants to emphasize the chef's calm focus during the rush. Which addition best accomplishes this?",
    choices: [
      'NO CHANGE: She worked.',
      'She moved efficiently, never raising her voice or hurrying her hands.',
      'She made a lot of food really fast that night.',
      'She had been a chef for many years.'
    ],
    answer: 1,
    explanation: "Rule: when asked to convey a specific impression, choose the option whose details create that impression. (B) uses 'never raising her voice' and 'never hurrying her hands' to show calm focus directly. (A) is too vague. (C) emphasizes speed and quantity, not calm. (D) gives biographical context unrelated to the moment described."
  },
  {
    id: 'q-acten-fill2-045',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 27,
    stem: "A paragraph contains four sentences. The third sentence reads, 'Bees navigate by the sun's polarized light.' This essay focuses on the dangers urban lighting poses to migratory birds. The writer is considering deleting this sentence. Should it be deleted?",
    choices: [
      'Kept, because it adds scientific detail to the paragraph.',
      'Deleted, because the essay\'s focus is on birds, not bees.',
      'Kept, because bees and birds both navigate.',
      'Deleted, because the sentence is too technical for a general audience.'
    ],
    answer: 1,
    explanation: "Rule: information must be ON-TOPIC. The essay is about birds and urban light; a sentence about bees and the sun's polarized light is off-subject. (A) and (C) defend irrelevant content. (D) wrongly invokes audience-level objections; the actual flaw is topical drift."
  },
  {
    id: 'q-acten-fill2-046',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 28,
    stem: "The writer wants to conclude an essay on volunteering with a sentence that echoes the introduction's idea that 'small acts ripple outward.' Which best does this?",
    choices: [
      'In conclusion, volunteering is good for everyone.',
      'A single afternoon of volunteering, then, may travel further than we ever see.',
      'Many people volunteer, and many more should.',
      'Volunteering can be fun and rewarding.'
    ],
    answer: 1,
    explanation: "Rule: an effective conclusion echoes the essay's controlling image or idea. The 'ripple' image is mirrored by 'travel further than we ever see.' (A) is generic and announces a conclusion. (C) is exhortation that ignores the ripple motif. (D) is generic praise."
  },
  {
    id: 'q-acten-fill2-047',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 30,
    stem: "Sentences in a paragraph appear in this order: [1] The committee tested three prototypes. [2] The third prototype outperformed the others by every measure. [3] Each was assembled from the same components. [4] After two weeks of trials, the committee declared a winner. To improve coherence, where should sentence 3 be placed?",
    choices: [
      'Where it is now (after sentence 2).',
      'Before sentence 1.',
      'After sentence 1.',
      'After sentence 4.'
    ],
    answer: 2,
    explanation: "Rule: ideas should flow logically — setup, then result. Sentence 3 explains the testing setup ('same components'); it belongs immediately after sentence 1, which introduces the prototypes. (A) interrupts the result. (B) precedes the introduction of the prototypes. (D) follows the conclusion, where it has no narrative purpose."
  },
  {
    id: 'q-acten-fill2-048',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 31,
    stem: "An essay's stated goal is 'to explain how composting reduces household waste.' Which sentence, if added, BEST supports this purpose?",
    choices: [
      'A typical American household sends about 20 percent of its trash to landfills as food scraps.',
      'Composting bins come in many colors and sizes.',
      'My grandmother kept a compost pile behind the garden shed.',
      'Some people prefer recycling to composting.'
    ],
    answer: 0,
    explanation: "Rule: support the essay's stated purpose with relevant, quantified detail. (A) provides a concrete statistic that directly demonstrates how composting could cut waste. (B) is a stylistic detail unrelated to waste reduction. (C) is anecdotal and off-purpose. (D) introduces an unrelated comparison."
  },
  {
    id: 'q-acten-fill2-049',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 32,
    stem: "A passage describes a quiet bookstore. The writer wants to add a sentence that reinforces the atmosphere of hush and stillness. Which choice does this best?",
    choices: [
      'A radio crackled in the back, broadcasting baseball scores.',
      'The bell above the door jangled brightly each time someone entered.',
      'A child shouted from the children\'s section, demanding a picture book.',
      'Customers shuffled between shelves, their footsteps absorbed by worn wooden floors.'
    ],
    answer: 3,
    explanation: "Rule: chosen detail must match the intended mood. 'Shuffled,' 'absorbed,' and 'worn wooden floors' all evoke quiet stillness. (A) introduces noise (radio, baseball). (B) introduces a bright jangle. (C) introduces shouting — all contradict the hush."
  },
  {
    id: 'q-acten-fill2-050',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 36,
    stem: "An essay arguing that nighttime city skies should be darker concludes with: '[The stars, hidden for so long behind a haze of streetlight, are not gone — they are only waiting for us to turn down the lights.]' The writer is considering replacing this with: 'In conclusion, cities should reduce light pollution.' Should the original be kept?",
    choices: [
      'Replace it, because the proposed sentence is shorter and clearer.',
      'Keep it, because it restates the argument with vivid imagery that appeals to the reader\'s sense of loss and possibility.',
      'Replace it, because the original is too poetic for a persuasive essay.',
      'Keep it, because it introduces a new argument.'
    ],
    answer: 1,
    explanation: "Rule: a strong conclusion does more than restate — it lands the argument with emotional and rhetorical force. The original uses imagery ('hidden behind a haze') and a turn ('not gone — only waiting') that re-engages the reader. (A) confuses concision with effectiveness. (C) misjudges register; persuasive essays welcome vivid imagery. (D) is factually wrong — the original restates, it does not introduce."
  }
]);
