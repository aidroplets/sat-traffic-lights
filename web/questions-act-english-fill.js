/**
 * ACT English — fill batch (40 more questions, distinct from the
 * 45 in questions-act-english.js).
 *
 * testType: 'ACT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'english'
 *
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';

window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  // ===== PUNCTUATION (10) =====
  {
    id: 'q-acten-fill-001',
    section: 'english',
    topic: 'punctuation',
    difficulty: 19,
    stem: "On Saturday morning [my brother, and I] went hiking in the foothills. Which is best?",
    choices: ['NO CHANGE', 'my brother, and I,', 'my brother and I,', 'my brother and I'],
    answer: 3,
    explanation: "Rule: do not place a comma between a compound subject of two items joined by 'and.' 'My brother and I' is the subject; no comma separates a subject from its verb or its second half. (A) and (B) wrongly insert commas; (C) drops a comma between subject 'I' and verb 'went.'"
  },
  {
    id: 'q-acten-fill-002',
    section: 'english',
    topic: 'punctuation',
    difficulty: 21,
    stem: "The bakery is famous for [it's] cinnamon rolls. Which is best?",
    choices: ['NO CHANGE', 'their', 'its\'', 'its'],
    answer: 3,
    explanation: "Rule: 'its' is the possessive pronoun; 'it's' is a contraction for 'it is.' The bakery owns the cinnamon rolls, so the possessive 'its' is correct. (A) means 'it is.' (B) is plural and disagrees with singular 'bakery.' (C) is not a word."
  },
  {
    id: 'q-acten-fill-003',
    section: 'english',
    topic: 'punctuation',
    difficulty: 23,
    stem: "We brought everything we needed for the picnic [blankets, sandwiches and lemonade]. Which is best?",
    choices: ['NO CHANGE', 'blankets sandwiches, and lemonade', 'blankets, sandwiches, and lemonade', 'blankets; sandwiches; and lemonade'],
    answer: 2,
    explanation: "Rule: items in a series of three or more take commas between every item, including the Oxford comma before 'and' (ACT prefers it). (A) drops the serial comma. (B) drops the first internal comma. (D) misuses semicolons, which separate list items only when individual items already contain commas."
  },
  {
    id: 'q-acten-fill-004',
    section: 'english',
    topic: 'punctuation',
    difficulty: 25,
    stem: "The chef prepared three signature dishes [risotto braised lamb, and chocolate torte]. Which is best?",
    choices: ['NO CHANGE', '; risotto, braised lamb, and chocolate torte', ', risotto, braised lamb, and chocolate torte', ': risotto, braised lamb, and chocolate torte'],
    answer: 3,
    explanation: "Rule: a colon introduces a list that follows an independent clause. 'The chef prepared three signature dishes' is a complete clause, so a colon properly sets up the list. (A) lacks the leading punctuation and the first internal comma. (B) misuses a semicolon, which must join two independent clauses. (C) creates a run-on with only commas."
  },
  {
    id: 'q-acten-fill-005',
    section: 'english',
    topic: 'punctuation',
    difficulty: 26,
    stem: "The train was delayed for nearly an hour [, nevertheless we] arrived in time for the wedding. Which is best?",
    choices: ['NO CHANGE', 'nevertheless we', ', nevertheless, we', '; nevertheless, we'],
    answer: 3,
    explanation: "Rule: 'nevertheless' is a conjunctive adverb, not a conjunction. To join two independent clauses with one, use a semicolon before and a comma after. (A) and (C) are comma splices. (B) is a fused (run-on) sentence."
  },
  {
    id: 'q-acten-fill-006',
    section: 'english',
    topic: 'punctuation',
    difficulty: 28,
    stem: "The two [women's] coats were left in the closet by mistake. Which is best?",
    choices: ['NO CHANGE', 'womens', 'womens\'', 'woman\'s'],
    answer: 0,
    explanation: "Rule: 'women' is already an irregular plural, so the plural possessive simply adds 's: women's. (B) is a misspelling and lacks the apostrophe. (C) treats 'womens' as if it were a regular plural. (D) is the singular possessive but the sentence specifies 'two,' so plural is required."
  },
  {
    id: 'q-acten-fill-007',
    section: 'english',
    topic: 'punctuation',
    difficulty: 30,
    stem: "Eager to begin her presentation [, the candidate, walked confidently] to the podium. Which is best?",
    choices: ['NO CHANGE', ' the candidate, walked confidently', ', the candidate walked confidently', ', the candidate walked, confidently'],
    answer: 2,
    explanation: "Rule: an introductory participial phrase ('Eager to begin her presentation') is followed by a single comma, and no comma should split the subject ('the candidate') from its verb ('walked'). (A) and (B) insert an illegal comma between subject and verb. (D) splits the verb from its adverb."
  },
  {
    id: 'q-acten-fill-008',
    section: 'english',
    topic: 'punctuation',
    difficulty: 31,
    stem: "Three cities have hosted the conference in recent years [: Atlanta, Georgia; Austin, Texas; and Boise, Idaho]. Which is best?",
    choices: ['NO CHANGE', ': Atlanta, Georgia, Austin, Texas, and Boise, Idaho', '; Atlanta, Georgia, Austin, Texas, and Boise, Idaho', ', Atlanta, Georgia; Austin, Texas; and Boise, Idaho'],
    answer: 0,
    explanation: "Rule: when items in a series themselves contain commas (city, state pairs), use semicolons to separate the items. The colon properly introduces the list after an independent clause. (B) and (D) lose the semicolons, making the city-state pairings impossible to parse. (C) misuses a semicolon as the introducer."
  },
  {
    id: 'q-acten-fill-009',
    section: 'english',
    topic: 'punctuation',
    difficulty: 32,
    stem: "The senator's speech [—delivered with surprising warmth—] won over even her sharpest critics. Which is best?",
    choices: ['NO CHANGE', ', delivered with surprising warmth—', '—delivered with surprising warmth,', ' delivered with surprising warmth'],
    answer: 0,
    explanation: "Rule: dashes, like commas, must come in matched pairs around a parenthetical insertion. (B) and (C) mix one dash with one comma — punctuation marks setting off a parenthetical must match. (D) drops all punctuation, leaving the modifier crammed into the subject without separation."
  },
  {
    id: 'q-acten-fill-010',
    section: 'english',
    topic: 'punctuation',
    difficulty: 34,
    stem: "Marie Curie [—the first person to win two Nobel Prizes,] remains one of science's most celebrated figures. Which is best?",
    choices: ['NO CHANGE', ', the first person to win two Nobel Prizes,', ', the first person to win two Nobel Prizes —', 'the first person to win two Nobel Prizes,'],
    answer: 1,
    explanation: "Rule: an appositive renaming a noun must be set off by a matching pair of punctuation marks — two commas, two dashes, or two parentheses. (A) and (C) mix a dash with a comma. (D) uses only one comma, leaving the appositive incorrectly attached to the subject."
  },

  // ===== USAGE (10) =====
  {
    id: 'q-acten-fill-011',
    section: 'english',
    topic: 'usage',
    difficulty: 18,
    stem: "Each of the volunteers [were given] a name tag at the front desk. Which is best?",
    choices: ['NO CHANGE', 'were giving', 'was given', 'have been given'],
    answer: 2,
    explanation: "Rule: subject-verb agreement. The subject is 'Each' (singular indefinite pronoun), not 'volunteers' (object of the preposition 'of'). 'Each' takes a singular verb: 'was given.' (A) and (B) wrongly use plural 'were.' (D) is plural ('have')."
  },
  {
    id: 'q-acten-fill-012',
    section: 'english',
    topic: 'usage',
    difficulty: 20,
    stem: "Neither the teacher nor the students [was ready] for the surprise fire drill. Which is best?",
    choices: ['NO CHANGE', 'has been ready', 'is ready', 'were ready'],
    answer: 3,
    explanation: "Rule: with 'neither/nor,' the verb agrees with the nearer subject. 'Students' (plural) is closer, so use 'were ready.' (A) and (C) treat the subject as singular. (B) is also singular ('has')."
  },
  {
    id: 'q-acten-fill-013',
    section: 'english',
    topic: 'usage',
    difficulty: 22,
    stem: "Between you and [me], the new policy will not last long. Which is best?",
    choices: ['NO CHANGE', 'I', 'myself', 'mine'],
    answer: 0,
    explanation: "Rule: pronoun case after a preposition. 'Between' is a preposition, so it takes an object pronoun. 'Me' is the object form, so NO CHANGE is correct. (B) 'I' is a subject pronoun — wrong here. (C) 'myself' is reflexive and needs an antecedent in the same clause. (D) 'mine' is possessive."
  },
  {
    id: 'q-acten-fill-014',
    section: 'english',
    topic: 'usage',
    difficulty: 24,
    stem: "By the time the rescue team arrived, the lost hikers [drank] all the water in their canteens. Which is best?",
    choices: ['NO CHANGE', 'have drunk', 'had drunk', 'drink'],
    answer: 2,
    explanation: "Rule: past perfect tense ('had + past participle') marks an action completed before another past action. The drinking happened before the team arrived, so 'had drunk' is correct. (A) is simple past — fails to show sequence. (B) is present perfect — wrong tense for past narration. (D) is present tense."
  },
  {
    id: 'q-acten-fill-015',
    section: 'english',
    topic: 'usage',
    difficulty: 25,
    stem: "Walking through the museum, [the paintings impressed me] more than the sculptures did. Which is best?",
    choices: ['NO CHANGE', 'impressing me were the paintings', 'the paintings was impressive to me', 'I was impressed by the paintings'],
    answer: 3,
    explanation: "Rule: a dangling modifier. The opening phrase 'Walking through the museum' must modify the subject of the main clause — and only a person can walk. Only (D) makes 'I' the subject and resolves the dangle. (A) makes the paintings the walker. (B) is contorted and still leaves the participle dangling. (C) keeps the dangler and adds an agreement error."
  },
  {
    id: 'q-acten-fill-016',
    section: 'english',
    topic: 'usage',
    difficulty: 26,
    stem: "Anyone who wants to attend the lecture should bring [his or her] student ID. Which is best?",
    choices: ['NO CHANGE', 'their', 'they\'re', 'there'],
    answer: 0,
    explanation: "Rule: pronoun-antecedent agreement. 'Anyone' is a singular indefinite pronoun and, in formal/standardized-test usage, takes a singular pronoun: 'his or her,' so NO CHANGE is correct. (B) is plural and disagrees with the singular antecedent in formal grammar. (C) is the contraction 'they are.' (D) is an adverb of place."
  },
  {
    id: 'q-acten-fill-017',
    section: 'english',
    topic: 'usage',
    difficulty: 27,
    stem: "The team [, along with their coach,] are traveling to nationals next month. Which is best?",
    choices: ['NO CHANGE', ' along with their coach are', ', along with their coach is', ', along with their coach, is'],
    answer: 3,
    explanation: "Rule: phrases like 'along with,' 'as well as,' and 'in addition to' do NOT change the number of the subject. 'Team' is the subject (singular collective treated as a unit) and takes 'is.' (A) and (B) use plural 'are.' (C) drops a needed comma after the parenthetical."
  },
  {
    id: 'q-acten-fill-018',
    section: 'english',
    topic: 'usage',
    difficulty: 29,
    stem: "Lila is taller [than he], though she is two years younger. Which is best?",
    choices: ['NO CHANGE', 'than him', 'then he', 'then him'],
    answer: 0,
    explanation: "Rule: in comparisons after 'than,' the implied verb determines case. The full thought is 'taller than he is,' so the subject pronoun 'he' is required, making NO CHANGE correct. (B) treats 'than' as a preposition. (C) and (D) confuse 'then' (time) with 'than' (comparison)."
  },
  {
    id: 'q-acten-fill-019',
    section: 'english',
    topic: 'usage',
    difficulty: 30,
    stem: "After years of training, the gymnast [could have] qualified for the Olympic team. Which is best?",
    choices: ['NO CHANGE', 'could of', 'could had', 'could of had'],
    answer: 0,
    explanation: "Rule: the correct modal-perfect form is 'could have + past participle,' so NO CHANGE is right. (B) 'could of' is never standard English; it is a phonetic mishearing of the contraction 'could've.' (C) doubles past tense incorrectly. (D) compounds both errors."
  },
  {
    id: 'q-acten-fill-020',
    section: 'english',
    topic: 'usage',
    difficulty: 33,
    stem: "She is one of those managers who [insists] on reviewing every detail personally. Which is best?",
    choices: ['NO CHANGE', 'has insisted', 'is insisting', 'insist'],
    answer: 3,
    explanation: "Rule: in 'one of those X who…' constructions, the relative pronoun 'who' refers to the plural noun ('managers'), so the verb is plural: 'insist.' (A), (B), and (C) are singular and miss the antecedent. This is a classic ACT trap."
  },

  // ===== SENTENCE-STRUCTURE (10) =====
  {
    id: 'q-acten-fill-021',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 19,
    stem: "The road was icy [, so the driver slowed] to a crawl. Which is best?",
    choices: ['NO CHANGE', ', the driver slowed', ' the driver slowed', '; the driver, slowed'],
    answer: 0,
    explanation: "Rule: a comma alone cannot join two independent clauses (comma splice). The comma + coordinating conjunction 'so' creates a proper compound sentence, so NO CHANGE is correct. (B) is a comma splice. (C) is a fused/run-on sentence. (D) misplaces a comma between subject and verb."
  },
  {
    id: 'q-acten-fill-022',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 21,
    stem: "[Because the storm knocked out power for the entire neighborhood.] We lit candles and played board games. Which is best?",
    choices: ['NO CHANGE', 'Knocking out power for the entire neighborhood,', 'The storm knocked out power for the entire neighborhood;', 'Because the storm knocked out power for the entire neighborhood,'],
    answer: 3,
    explanation: "Rule: a subordinate clause beginning with 'because' is a fragment if punctuated as its own sentence. Joining it to the main clause with a comma fixes the fragment. (A) is a fragment. (B) creates a dangling modifier. (C) misuses a semicolon to join a clause that depends on what follows."
  },
  {
    id: 'q-acten-fill-023',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 23,
    stem: "Her favorite hobbies are hiking, painting, [and to play] the guitar. Which is best?",
    choices: ['NO CHANGE', 'and she plays', 'and playing', 'as well as to play'],
    answer: 2,
    explanation: "Rule: parallel structure. Items in a series must take the same grammatical form. 'Hiking' and 'painting' are gerunds, so the third item must also be a gerund: 'playing.' (A) and (D) shift to an infinitive. (B) shifts to a full clause."
  },
  {
    id: 'q-acten-fill-024',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 24,
    stem: "[I love this novel it has] a surprise ending I never saw coming. Which is best?",
    choices: ['NO CHANGE', 'I love this novel, it has', 'I love this novel; it has', 'I love this novel having'],
    answer: 2,
    explanation: "Rule: two independent clauses must be joined by a semicolon, by a period, or by a comma + coordinating conjunction. (A) is a fused sentence (run-on). (B) is a comma splice. (D) makes the second half a participial phrase that dangles."
  },
  {
    id: 'q-acten-fill-025',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 26,
    stem: "The committee approved the budget, hired a new director, [and a fundraising plan was launched]. Which is best?",
    choices: ['NO CHANGE', 'and launching a fundraising plan', 'and launched a fundraising plan', 'and a fundraising plan, launched'],
    answer: 2,
    explanation: "Rule: parallel structure across a list of verbs. The first two items are simple past active verbs ('approved,' 'hired'), so the third must match: 'launched.' (A) shifts to a passive clause. (B) shifts to a gerund. (D) is fragmentary and changes the agent."
  },
  {
    id: 'q-acten-fill-026',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 27,
    stem: "Although the recipe looked complicated [. The cook completed] it in under an hour. Which is best?",
    choices: ['NO CHANGE', ', the cook completed', '; the cook completed', ' the cook, completed'],
    answer: 1,
    explanation: "Rule: an introductory subordinate clause starting with 'although' must connect to the main clause with a comma, not be cut off by a period (which leaves a fragment). (A) is a fragment. (C) misuses a semicolon to join a dependent clause to an independent one. (D) splits subject from verb."
  },
  {
    id: 'q-acten-fill-027',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 28,
    stem: "The athlete trained for months not only to qualify for the championship [but also winning] a medal was her goal. Which is best?",
    choices: ['NO CHANGE', 'but also to win', 'but winning', 'but also she wanted to win'],
    answer: 1,
    explanation: "Rule: correlative conjunctions ('not only … but also') require parallel grammatical forms on either side. 'To qualify' (infinitive) must pair with 'to win' (infinitive). (A) and (C) shift to a gerund/clause. (D) breaks parallelism by switching to a full independent clause."
  },
  {
    id: 'q-acten-fill-028',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 30,
    stem: "[Running across the finish line, the crowd cheered] for the exhausted marathoner. Which is best?",
    choices: ['NO CHANGE', 'Running across the finish line, the marathoner heard the crowd cheer', 'The crowd cheered, running across the finish line,', 'When running across the finish line, the cheering crowd'],
    answer: 1,
    explanation: "Rule: a participial phrase at the start of a sentence must modify the subject of the main clause. The crowd was not running; the marathoner was. Only (B) makes the marathoner the subject and resolves the dangling modifier. (A), (C), and (D) keep or worsen the dangle."
  },
  {
    id: 'q-acten-fill-029',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 31,
    stem: "The director was praised both for her clear vision [and because she could collaborate well] with every department. Which is best?",
    choices: ['NO CHANGE', 'and for collaborating well', 'and she collaborated well', 'as well as collaborating well'],
    answer: 1,
    explanation: "Rule: 'both … and' requires identical grammatical structures on each side. 'For her clear vision' is a prepositional phrase, so the second half must mirror it: 'for collaborating well.' (A) shifts to a clause. (C) drops the preposition entirely. (D) abandons the 'both/and' pairing."
  },
  {
    id: 'q-acten-fill-030',
    section: 'english',
    topic: 'sentence-structure',
    difficulty: 35,
    stem: "[To dance gracefully, to sing on key, and acting convincingly are] skills the role demands. Which is best?",
    choices: ['NO CHANGE', 'To dance gracefully, to sing on key, and to act convincingly are', 'Dancing gracefully, singing on key, and to act convincingly are', 'To dance gracefully, singing on key, and acting convincingly are'],
    answer: 1,
    explanation: "Rule: parallel structure across a series of three. All items must share the same form. (B) keeps all three as infinitives ('to dance, to sing, to act'). (A), (C), and (D) each break the pattern by mixing infinitives with gerunds — the textbook ACT parallelism trap at high difficulty."
  },

  // ===== RHETORICAL-SKILL (10) =====
  {
    id: 'q-acten-fill-031',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 20,
    stem: "The recipe is quick to prepare. [Furthermore], it requires only five ingredients. Which transition word fits best?",
    choices: ['NO CHANGE', 'However', 'Nevertheless', 'In contrast'],
    answer: 0,
    explanation: "Rule: choose a transition that matches the logical relationship. The two sentences add positive points (quick AND simple), so an additive transition like 'Furthermore' is right. (B), (C), and (D) all signal contrast, which the sentences do not have."
  },
  {
    id: 'q-acten-fill-032',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 22,
    stem: "The lecture lasted nearly two hours [, and during this lengthy two-hour period of time]. Which is best?",
    choices: ['NO CHANGE', ', and during this period', ', and during the long lecture period of time', ', during which time period'],
    answer: 1,
    explanation: "Rule: eliminate redundancy. 'Nearly two hours' already establishes the length and time, so 'lengthy two-hour period of time' merely repeats it. (B) compresses the idea cleanly. (A), (C), and (D) all repeat 'time' or 'period' or 'long.'"
  },
  {
    id: 'q-acten-fill-033',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 24,
    stem: "[At this point in time, in the year 2024,] electric vehicles outsold gas vehicles in Norway. Which is best?",
    choices: ['NO CHANGE', 'At this point in 2024,', 'In 2024,', 'In the year of 2024 currently,'],
    answer: 2,
    explanation: "Rule: prefer the most concise option that preserves meaning. 'In 2024' says everything needed; 'at this point in time' and 'currently' add nothing. (A), (B), and (D) are wordy/redundant."
  },
  {
    id: 'q-acten-fill-034',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 25,
    stem: "Many readers expected the novel to be a comedy. [Similarly], it turned out to be a sober meditation on grief. Which transition fits best?",
    choices: ['NO CHANGE', 'Therefore', 'However', 'For example'],
    answer: 2,
    explanation: "Rule: transitions must reflect logic. The second sentence reverses the expectation set up in the first, so a contrast word ('However') is required. (A) signals similarity. (B) signals cause/effect. (D) introduces an example."
  },
  {
    id: 'q-acten-fill-035',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 26,
    stem: "The committee will [combine together] feedback from all departments before finalizing the report. Which is best?",
    choices: ['NO CHANGE', 'combine', 'combine and put together', 'be combining together'],
    answer: 1,
    explanation: "Rule: avoid redundancy. 'Combine' inherently means 'put together,' so 'combine together' is doubled. (B) is the cleanest. (A), (C), and (D) all repeat the togetherness idea."
  },
  {
    id: 'q-acten-fill-036',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 27,
    stem: "Writing this letter to express my sincere appreciation, I wanted to thank you. The author wants to revise for concision. Which is best?",
    choices: ['I am writing to express my sincere appreciation and wanted to take this opportunity to thank you.', 'I wanted to write you this letter as a way to thank you and to express my appreciation.', 'Thank you for everything; I appreciate it sincerely.', 'In writing you this letter, I wanted to express the appreciation that I sincerely feel and to thank you.'],
    answer: 2,
    explanation: "Rule: concision — say it once. 'Thank you' and 'appreciate' overlap, and the meta-language about 'writing this letter' is filler. (C) delivers both ideas in one short sentence. (A), (B), and (D) all repeat the thanks/appreciation pair in bloated frames."
  },
  {
    id: 'q-acten-fill-037',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 30,
    stem: "The proposal addresses cost overruns, missed deadlines, and staffing shortages. [Likewise], it offers a clear timeline for fixing each problem. Which transition fits best?",
    choices: ['NO CHANGE', 'In addition', 'On the other hand', 'Otherwise'],
    answer: 1,
    explanation: "Rule: transitions must match logic. The second sentence ADDS a feature of the same proposal, so an additive transition ('In addition') is right. (A) 'Likewise' signals similarity between two different things. (C) and (D) signal contrast or alternative — neither applies."
  },
  {
    id: 'q-acten-fill-038',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 31,
    stem: "Consider this revision: 'The new exhibit is genuinely awesome and totally cool, with paintings that are super interesting.' Used in a formal museum brochure, the writer should choose: Which is best?",
    choices: ['NO CHANGE', 'The new exhibit is impressive, featuring paintings of remarkable depth.', 'The new exhibit is, like, really really good and you should see it.', 'The new exhibit is genuinely awesome and the paintings rule.'],
    answer: 1,
    explanation: "Rule: tone must match audience and venue. A museum brochure calls for formal, precise language. (B) replaces colloquialisms ('awesome,' 'cool,' 'super') with elevated diction. (A), (C), and (D) all use slang or casual filler unfit for the context."
  },
  {
    id: 'q-acten-fill-039',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 33,
    stem: "Paragraph: '[1] The chef tested twelve versions of the sauce. [2] She rejected nine for being too sweet. [3] Tasting is essential to recipe development. [4] The final three she served to the judges.' Sentence 3 is best placed: Which is best?",
    choices: ['where it is now (after sentence 2)', 'before sentence 1', 'after sentence 4', 'deleted entirely'],
    answer: 3,
    explanation: "Rule: sentences that interrupt a narrative with a generic platitude weaken the paragraph. Sentences 1, 2, and 4 narrate a specific testing process; sentence 3 is a vague generalization that breaks the chain wherever placed. Deleting it tightens the paragraph. (A), (B), and (C) all keep the disruptive sentence."
  },
  {
    id: 'q-acten-fill-040',
    section: 'english',
    topic: 'rhetorical-skill',
    difficulty: 34,
    stem: "The writer wants to end the essay with an image that echoes its opening line, 'A single lamp burned in the cottage window.' Which closing best fulfills this goal? Which is best?",
    choices: ['Years later, the cottage stood empty, but the same lamp still flickered in the window each night.', 'The family eventually moved to a larger home in the city.', 'Cottages of that era were typically built from local fieldstone.', 'The lamp had been a gift from her grandmother decades earlier.'],
    answer: 0,
    explanation: "Rule: rhetorical purpose — the prompt asks for a closing that ECHOES the opening image (the lamp in the window). (A) returns explicitly to that image, creating a frame. (B) abandons it. (C) is an unrelated factual aside. (D) mentions the lamp but as backstory, not as the closing image."
  }
]);
