/**
 * HSPT Language Skills — capitalization, punctuation, usage,
 * spelling, composition.
 *
 * testType: 'HSPT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'language-skills'
 *
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';

window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ===== CAPITALIZATION (9 questions) =====
  {
    id: 'q-hsptls-001',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 420,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['The food in France was delicious.', 'My family visited Paris last summer.', 'No error', 'we toured the Eiffel Tower together.'],
    answer: 3,
    explanation: 'The first word of a sentence must always be capitalized. "we" should be "We". Other sentences correctly capitalize the first word and proper nouns (Paris, Eiffel Tower, France).'
  },
  {
    id: 'q-hsptls-002',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 470,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['I asked Mom if I could go to the movies.', 'We celebrate thanksgiving in November.', 'My favorite teacher is Mr. Jenkins.', 'No error'],
    answer: 1,
    explanation: 'Names of holidays must be capitalized. "thanksgiving" should be "Thanksgiving". When "Mom" is used as a name (without a possessive like "my"), it is capitalized; "Mr. Jenkins" is a proper name; "November" is correctly capitalized.'
  },
  {
    id: 'q-hsptls-003',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 460,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['No error', 'I am studying Spanish this year.', 'We drove south to florida for vacation.', 'The Atlantic Ocean borders the east coast.'],
    answer: 2,
    explanation: 'Names of specific places (states, countries) are proper nouns and must be capitalized. "florida" should be "Florida". Directions like "south" are lowercase when they indicate direction (not a region). Names of languages are always capitalized.'
  },
  {
    id: 'q-hsptls-004',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 560,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['I visited my Aunt last week.', 'My aunt lives in Texas.', 'Aunt Linda lives in the South.', 'No error'],
    answer: 0,
    explanation: 'A title like "aunt" is capitalized only when used as a name or directly before a name (Aunt Linda). When preceded by a possessive pronoun like "my", it is a common noun: "my aunt" should be lowercase. "the South" is capitalized because it refers to a region of the country.'
  },
  {
    id: 'q-hsptls-005',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 590,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['No error', 'I am taking History 101 next semester.', 'My favorite subject is history.', 'We learned about the civil war.'],
    answer: 3,
    explanation: 'The names of specific historical events are proper nouns and must be capitalized. "civil war" should be "Civil War". Specific course names with numbers (History 101) are capitalized; general subjects (history) are not.'
  },
  {
    id: 'q-hsptls-006',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 630,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['My uncle works at Microsoft Corporation.', 'She read the novel "To Kill a Mockingbird" in one weekend.', 'No error', 'The principal said, "school will close early today."'],
    answer: 3,
    explanation: 'The first word of a direct quotation that is a complete sentence must be capitalized. "school" should be "School". Major words in book titles are capitalized correctly; company names are proper nouns.'
  },
  {
    id: 'q-hsptls-007',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 670,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['The earth revolves around the sun.', 'My doctor recommended a Mediterranean diet.', 'We crossed the Golden Gate Bridge yesterday.', 'No error'],
    answer: 3,
    explanation: 'There is no error. Bridges with proper names are capitalized (Golden Gate Bridge); adjectives derived from proper nouns are capitalized (Mediterranean); when "earth" and "sun" are used in general contexts (not as planetary names in scientific lists), lowercase is acceptable and standard.'
  },
  {
    id: 'q-hsptls-008',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 700,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['I read an article in The New York Times.', 'The Queen of England addressed parliament.', 'No error', 'We hiked through Yellowstone National Park.'],
    answer: 1,
    explanation: '"Parliament" is a proper noun referring to a specific governing body and must be capitalized. Titles like "Queen" used with a place (Queen of England) are capitalized; newspaper names are proper nouns; national parks are proper nouns.'
  },
  {
    id: 'q-hsptls-009',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 740,
    stem: 'Find the sentence with a capitalization error. If there is no error, choose "No error".',
    choices: ['The Renaissance began in Italy.', 'No error', 'She earned a Bachelor of Arts in english literature.', 'We watched the Super Bowl on Sunday.'],
    answer: 2,
    explanation: 'Names of languages are always capitalized, even within a degree title. "english literature" should be "English literature". Specific named events (Super Bowl) and historical periods (Renaissance) are proper nouns.'
  },

  // ===== PUNCTUATION (9 questions) =====
  {
    id: 'q-hsptls-010',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 410,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['I love pizza, pasta, and bread.', 'Wow that was an amazing game', 'Where did you put my book?', 'No error'],
    answer: 1,
    explanation: 'A sentence expressing strong feeling needs an exclamation point (or at minimum a period). "Wow that was an amazing game" is missing end punctuation and a comma after the interjection: "Wow, that was an amazing game!" Other sentences correctly use a question mark and serial commas.'
  },
  {
    id: 'q-hsptls-011',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 520,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['No error', 'The dogs collar was too tight.', 'She said, "I will be there at noon."', 'We need eggs, milk, and bread.'],
    answer: 1,
    explanation: 'Singular possessive nouns require an apostrophe before the s. "dogs" should be "dog\'s". The other sentences correctly use serial commas and quotation marks with a comma before the quote.'
  },
  {
    id: 'q-hsptls-012',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 510,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['After the rain stopped we went outside.', 'I bought apples, bananas, and oranges.', 'No error', 'My brother, who is older, plays soccer.'],
    answer: 0,
    explanation: 'An introductory dependent clause must be set off with a comma. "After the rain stopped" should be followed by a comma: "After the rain stopped, we went outside." Nonessential clauses are correctly set off with commas, and serial commas are correct.'
  },
  {
    id: 'q-hsptls-013',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 540,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['Its going to be a long day.', 'The girls\' team won the championship.', 'We left early; the traffic was terrible.', 'No error'],
    answer: 0,
    explanation: '"Its" without an apostrophe is the possessive pronoun. Here we need the contraction for "it is", which is "It\'s". The plural possessive "girls\'" is correct, and a semicolon correctly joins two related independent clauses.'
  },
  {
    id: 'q-hsptls-014',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 580,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['I wanted to go to the party, however, I had too much homework.', 'No error', 'My favorite season is fall.', 'She asked, "When will the game start?"'],
    answer: 0,
    explanation: 'When "however" joins two independent clauses, it requires a semicolon before it (not a comma), because "however" is a conjunctive adverb, not a coordinating conjunction. Correct: "I wanted to go to the party; however, I had too much homework." A comma alone creates a comma splice.'
  },
  {
    id: 'q-hsptls-015',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 595,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['Mr. Smith my neighbor mows his lawn every Saturday.', 'No error', 'She asked whether I was coming.', 'The book, which I borrowed, is overdue.'],
    answer: 0,
    explanation: 'A nonessential appositive ("my neighbor") must be set off with commas on both sides: "Mr. Smith, my neighbor, mows his lawn every Saturday." An indirect question ends with a period (no question mark needed), and nonrestrictive clauses are correctly set off.'
  },
  {
    id: 'q-hsptls-016',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 650,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['She earned the title "Most Valuable Player."', 'The recipe calls for the following ingredients flour, sugar, and butter.', 'I have one goal: to graduate with honors.', 'No error'],
    answer: 1,
    explanation: 'A colon should introduce the list after "ingredients": "The recipe calls for the following ingredients: flour, sugar, and butter." A colon is correctly used to introduce an explanation, and the period inside quotation marks is the American convention.'
  },
  {
    id: 'q-hsptls-017',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 690,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['No error', 'We saw a three-act play last weekend.', 'My sister-in-law is visiting from Ohio.', 'The well written essay earned an A.'],
    answer: 3,
    explanation: 'Compound modifiers before a noun should be hyphenated. "well written essay" should be "well-written essay". Permanent compounds like "sister-in-law" use hyphens, and number-noun compound modifiers like "three-act" are correctly hyphenated.'
  },
  {
    id: 'q-hsptls-018',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 730,
    stem: 'Find the sentence with a punctuation error. If there is no error, choose "No error".',
    choices: ['My aunt who lives in Maine sent us cookies.', 'The author of three novels Jane Austen, is celebrated worldwide.', 'It was raining; therefore, we canceled the picnic.', 'No error'],
    answer: 1,
    explanation: 'A nonrestrictive appositive needs commas on both sides. "Jane Austen" is the appositive renaming "author"; the sentence needs a comma after "novels": "The author of three novels, Jane Austen, is celebrated worldwide." The semicolon-conjunctive adverb construction is correct, and "who lives in Maine" can be restrictive (no commas) if she has multiple aunts—acceptable as written.'
  },

  // ===== USAGE (9 questions) =====
  {
    id: 'q-hsptls-019',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 400,
    stem: 'Choose the correctly written sentence.',
    choices: ['My brother and me went to the store.', 'I and my brother went to the store.', 'Me and my brother went to the store.', 'My brother and I went to the store.'],
    answer: 3,
    explanation: 'When the pronoun is part of the subject, use the subjective form "I". The polite convention places "I" last: "My brother and I went to the store." A test: drop the other person—you would say "I went," not "Me went."'
  },
  {
    id: 'q-hsptls-020',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 530,
    stem: 'Choose the correctly written sentence.',
    choices: [
      'Their going to the park later.',
      'There going to the park later.',
      'They\'re going to the park later.',
      'Theyre going to the park later.'
    ],
    answer: 2,
    explanation: '"They\'re" is the contraction of "they are", which is needed here. "Their" shows possession; "There" indicates a place; "Theyre" is missing the apostrophe.'
  },
  {
    id: 'q-hsptls-021',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 500,
    stem: 'Choose the correctly written sentence.',
    choices: ['Each of the players have a uniform.', 'Each of the players have their uniform.', 'Each of the players has a uniform.', 'Each of the players are having a uniform.'],
    answer: 2,
    explanation: 'The subject "Each" is singular and requires a singular verb "has". The phrase "of the players" does not change the subject. Indefinite pronouns like each, every, either, and neither always take singular verbs.'
  },
  {
    id: 'q-hsptls-022',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 540,
    stem: 'Choose the correctly written sentence.',
    choices: ['Between you and myself, the test was difficult.', 'Between you and me, the test was difficult.', 'Between we, the test was difficult.', 'Between you and I, the test was difficult.'],
    answer: 1,
    explanation: 'After a preposition like "between", use the objective pronoun. "Me" is objective; "I" is subjective. "Myself" is a reflexive pronoun and cannot be used as an object of a preposition without the antecedent "I" appearing earlier.'
  },
  {
    id: 'q-hsptls-023',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 570,
    stem: 'Choose the correctly written sentence.',
    choices: ['She run faster than he.', 'She runs more faster than he does.', 'She runs faster than he.', 'She runs faster than him.'],
    answer: 2,
    explanation: 'After "than" in a comparison, use the subjective case because the verb is implied: "She runs faster than he [runs]." "More faster" is a double comparative; "She run" lacks subject-verb agreement.'
  },
  {
    id: 'q-hsptls-024',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 620,
    stem: 'Choose the correctly written sentence.',
    choices: ['The book has a deep affect on me.', 'The book effects me deeply every time I read it.', 'The book affects me deeply every time I read it.', 'The affect of the book is profound.'],
    answer: 2,
    explanation: '"Affect" is most commonly a verb meaning "to influence"; "effect" is most commonly a noun meaning "result". The sentence needs the verb form: "The book affects me." The other sentences misuse "effect" as a verb or "affect" as a noun.'
  },
  {
    id: 'q-hsptls-025',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 650,
    stem: 'Choose the correctly written sentence.',
    choices: ['I should have went to the meeting.', 'I should had gone to the meeting.', 'I should of gone to the meeting.', 'I should have gone to the meeting.'],
    answer: 3,
    explanation: 'The past participle of "go" is "gone", not "went". With "should have", use the past participle: "should have gone". "Should of" is a misspelling of the contraction "should\'ve"; "should had" is not a valid construction.'
  },
  {
    id: 'q-hsptls-026',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 690,
    stem: 'Choose the correctly written sentence.',
    choices: ['Neither the coach and the players were ready for the game.', 'Neither the coach or the players were ready for the game.', 'Neither the coach nor the players was ready for the game.', 'Neither the coach nor the players were ready for the game.'],
    answer: 3,
    explanation: 'In "neither...nor" constructions, the verb agrees with the closer subject. "Players" is plural, so use "were". "Neither" must pair with "nor" (not "or" or "and").'
  },
  {
    id: 'q-hsptls-027',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 700,
    stem: 'Choose the correctly written sentence.',
    choices: ['Lay down on the couch if you are tired.', 'Laid down on the couch if you are tired.', 'Lain down on the couch if you are tired.', 'Lie down on the couch if you are tired.'],
    answer: 3,
    explanation: '"Lie" means to recline (intransitive—no object); "lay" means to place something (transitive—needs an object). The command is to recline yourself, so use "lie down". A common confusion is that "lay" is also the past tense of "lie", but in present-tense commands, "lie" is correct.'
  },

  // ===== SPELLING (9 questions) =====
  {
    id: 'q-hsptls-028',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 400,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['believe', 'recieve', 'No errors', 'achieve'],
    answer: 1,
    explanation: '"Recieve" is misspelled; the correct spelling is "receive". Remember the rule: "i before e except after c". Believe and achieve correctly follow "i before e".'
  },
  {
    id: 'q-hsptls-029',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 540,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['tomorrow', 'definately', 'No errors', 'separate'],
    answer: 1,
    explanation: '"Definately" is misspelled; the correct spelling is "definitely" (think of the root "finite"). Tomorrow has one m and two r\'s; separate has an "a" in the middle (a common trap, often misspelled "seperate").'
  },
  {
    id: 'q-hsptls-030',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 480,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['accomodate', 'No errors', 'occurrence', 'embarrass'],
    answer: 0,
    explanation: '"Accomodate" is misspelled; the correct spelling is "accommodate" with two c\'s and two m\'s. Embarrass correctly has two r\'s and two s\'s; occurrence has two c\'s and two r\'s.'
  },
  {
    id: 'q-hsptls-031',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 520,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['No errors', 'necessary', 'truely', 'beginning'],
    answer: 2,
    explanation: '"Truely" is misspelled; the correct spelling is "truly". The silent "e" in "true" is dropped before the suffix "-ly". Necessary has one c and two s\'s; beginning has two n\'s.'
  },
  {
    id: 'q-hsptls-032',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 560,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['February', 'No errors', 'calendar', 'rythm'],
    answer: 3,
    explanation: '"Rythm" is misspelled; the correct spelling is "rhythm". This word has no traditional vowels and is commonly misspelled. Calendar (often misspelled "calender") and February are spelled correctly.'
  },
  {
    id: 'q-hsptls-033',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 600,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['mischievous', 'No errors', 'priviledge', 'conscientious'],
    answer: 2,
    explanation: '"Priviledge" is misspelled; the correct spelling is "privilege" (no "d"). Conscientious is spelled correctly (related to "conscience"); mischievous is spelled correctly (no extra "i" before -ous).'
  },
  {
    id: 'q-hsptls-034',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 640,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['maintenance', 'independance', 'No errors', 'perseverance'],
    answer: 1,
    explanation: '"Independance" is misspelled; the correct spelling is "independence" with an "e" before "-nce". Maintenance and perseverance are spelled correctly; both end in "-ance" while "independence" ends in "-ence" (a common confusion).'
  },
  {
    id: 'q-hsptls-035',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 680,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['millennium', 'liaison', 'questionnaire', 'No errors'],
    answer: 3,
    explanation: 'No errors. Questionnaire correctly has two n\'s; millennium correctly has two l\'s and two n\'s; liaison correctly has the "ia" and "i" pattern. All three are commonly misspelled but correct as shown.'
  },
  {
    id: 'q-hsptls-036',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 740,
    stem: 'Which word is misspelled? If there are no misspellings, choose "No errors".',
    choices: ['No errors', 'inoculate', 'occassion', 'supersede'],
    answer: 2,
    explanation: '"Occassion" is misspelled; the correct spelling is "occasion" with two c\'s and one s. Supersede is spelled correctly (note the "-sede" ending, unlike "precede"); inoculate has only one n and one c.'
  },

  // ===== COMPOSITION (9 questions) =====
  {
    id: 'q-hsptls-037',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 430,
    stem: 'Which sentence is most clearly written?',
    choices: ['The reason I was late is because my alarm did not go off.', 'I was late because my alarm did not go off.', 'My alarm not going off was the reason for me being late.', 'The reason that I was late was due to the fact that my alarm did not go off.'],
    answer: 1,
    explanation: 'Choice B is the most concise and direct. The other choices are wordy and redundant: "The reason is because" is redundant (use "because" alone); "due to the fact that" is wordy padding; choice D uses awkward gerund constructions.'
  },
  {
    id: 'q-hsptls-038',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 470,
    stem: 'Which sentence is most clearly written?',
    choices: ['Walking down the street, the trees looked beautiful.', 'Walking down the street, beautiful trees were noticed.', 'The trees, walking down the street, looked beautiful.', 'Walking down the street, I noticed the beautiful trees.'],
    answer: 3,
    explanation: 'Choice B correctly attaches the introductory participial phrase "Walking down the street" to its subject "I" (the person doing the walking). The other choices contain dangling modifiers because trees cannot walk.'
  },
  {
    id: 'q-hsptls-039',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 510,
    stem: 'Which sentence is most clearly written?',
    choices: ['My hobbies are to read, to hike, and baking.', 'My hobbies are reading, hiking, and to bake.', 'My hobbies are to read, hiking, and baking.', 'My hobbies are reading, hiking, and baking.'],
    answer: 3,
    explanation: 'Choice C maintains parallel structure by using gerund (-ing) forms throughout: reading, hiking, baking. The other choices mix gerunds with infinitives (to bake, to read), violating parallel structure.'
  },
  {
    id: 'q-hsptls-040',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 550,
    stem: 'Which sentence is most clearly written?',
    choices: ['The new policy is being implemented now by the company at this time.', 'At the present time, the company will implement the new policy.', 'The company is now implementing the new policy.', 'The new policy will be implemented at the present time by the company.'],
    answer: 2,
    explanation: 'Choice C is the most concise and uses the active voice. "At the present time" can be replaced by "now"; choices A and D use passive voice unnecessarily; choice D is also redundant ("now" and "at this time" mean the same thing).'
  },
  {
    id: 'q-hsptls-041',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 590,
    stem: 'Which sentence is most clearly written?',
    choices: ['The teacher told the student, "You made an error."', 'The teacher told that the student had made an error to her.', 'The teacher told the student that the student had made an error.', 'The teacher told the student that she had made an error.'],
    answer: 0,
    explanation: 'Choice C eliminates ambiguity. In choice A, "she" could refer to either the teacher or the student. Choice B is clear but awkwardly repetitive; choice D is grammatically tangled. A direct quotation removes pronoun ambiguity.'
  },
  {
    id: 'q-hsptls-042',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 630,
    stem: 'Which sentence is most clearly written?',
    choices: ['Having finished the exam, the bell rang and we all left.', 'We left when the bell rang, having finished the exam by us.', 'The bell rang having finished the exam and we left.', 'Having finished the exam, we left when the bell rang.'],
    answer: 3,
    explanation: 'Choice B correctly attaches the participial phrase "Having finished the exam" to its subject "we". In choice A, the bell did not finish the exam (dangling modifier); choice C has the same dangling-modifier problem; choice D is awkward with "by us".'
  },
  {
    id: 'q-hsptls-043',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 670,
    stem: 'Which sentence is most clearly written?',
    choices: ['She not only enjoys hiking but also to swim in the lake.', 'She enjoys not only to hike but also swimming in the lake.', 'Not only does she enjoy hiking, but to swim in the lake also.', 'She enjoys not only hiking but also swimming in the lake.'],
    answer: 3,
    explanation: 'Choice B maintains parallel structure with "not only...but also": both elements are gerunds (hiking, swimming). The other choices mix gerunds and infinitives, breaking the parallelism required by correlative conjunctions.'
  },
  {
    id: 'q-hsptls-044',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 695,
    stem: 'Which sentence is most clearly written?',
    choices: ['The committee, after lengthy debate, decided to postpone the vote until next week.', 'To postpone the vote until next week was decided by the committee after lengthy debate.', 'After lengthy debate, the committee decided to postpone the vote until next week.', 'The committee decided to postpone, after lengthy debate, the vote until next week.'],
    answer: 2,
    explanation: 'Choice B places the introductory phrase first, keeping the subject and verb close together for clarity. Choice A is acceptable but interrupts the subject-verb flow; choice C splits the verb from its object awkwardly; choice D uses unnecessary passive voice.'
  },
  {
    id: 'q-hsptls-045',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 760,
    stem: 'Which sentence is most clearly written?',
    choices: [
      'The scientist explained that the experiment, although it was complex, it produced clear results.',
      'Although complex, the experiment produced clear results, the scientist explained.',
      'The scientist explained that, although complex, the experiment produced clear results.',
      'The experiment was complex but the scientist explained it produced clear results clearly.'
    ],
    answer: 2,
    explanation: 'Choice C is concise and grammatically clean: the introductory modifier "although complex" properly modifies "the experiment", and the structure is logical. Choice A has a redundant "it"; choice B is awkward with the trailing attribution; choice D is wordy and has the redundant "results clearly".'
  }
]);
