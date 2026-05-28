/**
 * HSPT Language Skills — fill batch.
 * testType: 'HSPT', section: 'language-skills'.
 * Concatenates onto window.STL_QUESTIONS_HSPT.
 */
'use strict';
window.STL_QUESTIONS_HSPT = (window.STL_QUESTIONS_HSPT || []).concat([
  // ===== CAPITALIZATION (8) — answer pattern: 0,1,2,3,0,1,2,3 =====
  {
    id: 'q-hsptls-fill-001',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 470,
    stem: 'Which sentence has a capitalization error?',
    choices: [
      '(A) my family visited the Lincoln Memorial last Saturday.',
      '(B) The principal asked us to read a book by Mark Twain.',
      '(C) My family celebrates Thanksgiving every November.',
      '(D) No error'
    ],
    answer: 0,
    explanation: 'The first word of every sentence must be capitalized: "My." (B) correctly capitalizes the author\'s name. (C) correctly capitalizes the holiday and month.'
  },
  {
    id: 'q-hsptls-fill-002',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 460,
    stem: 'Which sentence has a capitalization error?',
    choices: [
      '(A) My cousin moved to New Mexico in August.',
      '(B) Next summer we are driving to the grand canyon.',
      '(C) The Statue of Liberty stands in New York Harbor.',
      '(D) No error'
    ],
    answer: 1,
    explanation: 'Specific geographic landmarks are proper nouns: "Grand Canyon" must be capitalized. (A) correctly capitalizes the state and month. (C) correctly capitalizes the named landmark and harbor.'
  },
  {
    id: 'q-hsptls-fill-003',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 560,
    stem: 'Which sentence has a capitalization error?',
    choices: [
      '(A) I take French and biology this semester.',
      '(B) My uncle, a doctor, lives on Maple Street.',
      '(C) We hiked the appalachian Trail last spring.',
      '(D) No error'
    ],
    answer: 2,
    explanation: 'Both words of the proper-noun trail name need capitals: "Appalachian Trail." (A) is correct — languages are always capitalized but general school subjects like biology are not. (B) correctly leaves "uncle" and "doctor" lowercase (not used as titles before names) and capitalizes the street name.'
  },
  {
    id: 'q-hsptls-fill-004',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 580,
    stem: 'Which sentence has a capitalization error?',
    choices: [
      '(A) She speaks Spanish, English, and a little Italian.',
      '(B) The Pacific Ocean borders the western United States.',
      '(C) We watched the leaves change in Vermont this season.',
      '(D) No error'
    ],
    answer: 3,
    explanation: 'No error. (A) correctly capitalizes the names of three languages. (B) correctly capitalizes the proper-noun ocean and country while leaving the directional adjective "western" lowercase. (C) correctly capitalizes the proper-noun state but leaves "season" as a common noun.'
  },
  {
    id: 'q-hsptls-fill-005',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 590,
    stem: 'Which sentence has a capitalization error?',
    choices: [
      '(A) The President of our school club resigned yesterday.',
      '(B) Mom said we could visit Grandma during winter break.',
      '(C) The Civil War ended in 1865 after four years.',
      '(D) No error'
    ],
    answer: 0,
    explanation: 'Common nouns naming positions are lowercase unless used as a title before a name: "president" should not be capitalized here. (B) correctly capitalizes "Mom" and "Grandma" because they are used as substitutes for proper names. (C) correctly capitalizes the named historical event.'
  },
  {
    id: 'q-hsptls-fill-006',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 660,
    stem: 'Which sentence has a capitalization error?',
    choices: [
      '(A) The Renaissance produced many famous Italian artists.',
      '(B) I asked my Dad whether the Fourth of July fireworks were canceled.',
      '(C) We read a passage from the Bible during the ceremony.',
      '(D) No error'
    ],
    answer: 1,
    explanation: 'When preceded by a possessive pronoun like "my," words such as dad, mom, and uncle are common nouns and should be lowercase. (A) correctly capitalizes the historical period and the nationality-derived adjective. (C) correctly capitalizes the religious text.'
  },
  {
    id: 'q-hsptls-fill-007',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 680,
    stem: 'Which sentence has a capitalization error?',
    choices: [
      '(A) Senator Harris will speak at the convention on Tuesday.',
      '(B) She earned a degree in chemistry from Yale University.',
      '(C) After traveling South, we settled in a small Georgia town.',
      '(D) No error'
    ],
    answer: 2,
    explanation: 'When used as a direction rather than a region, "south" should be lowercase: "traveling south." (A) correctly capitalizes the title used before a name. (B) correctly leaves the field of study lowercase and capitalizes the proper-noun school.'
  },
  {
    id: 'q-hsptls-fill-008',
    section: 'language-skills',
    topic: 'capitalization',
    difficulty: 740,
    stem: 'Which sentence has a capitalization error?',
    choices: [
      '(A) My favorite novel, A Tale of Two Cities, opens in London and Paris.',
      '(B) Our class read selections from the Iliad and the Odyssey.',
      '(C) The treaty was signed by representatives of the British government.',
      '(D) No error'
    ],
    answer: 3,
    explanation: 'No error. (A) correctly capitalizes the major words of the title (with lowercase "of") and the city names. (B) correctly capitalizes the titles of epic poems while keeping the leading "the" lowercase, since it is not part of either title. (C) correctly capitalizes the adjective derived from a proper noun ("British").'
  },

  // ===== PUNCTUATION (8) — answer pattern: 0,1,2,3,0,1,2,3 =====
  {
    id: 'q-hsptls-fill-009',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 470,
    stem: 'Which sentence has a punctuation error?',
    choices: [
      '(A) The store is closed on Sundays holidays, and Mondays.',
      '(B) Did you remember to pack your lunch?',
      '(C) "Watch out!" she shouted from the doorway.',
      '(D) No error'
    ],
    answer: 0,
    explanation: 'Items in a series must be separated by commas: "Sundays, holidays, and Mondays." (B) correctly ends a question with a question mark. (C) correctly punctuates a quotation with the exclamation point inside the quotation marks.'
  },
  {
    id: 'q-hsptls-fill-010',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 490,
    stem: 'Which sentence has a punctuation error?',
    choices: [
      '(A) The dog wagged its tail when it saw me.',
      '(B) My brothers car is parked in the driveway.',
      '(C) We ordered pizza, salad, and breadsticks for dinner.',
      '(D) No error'
    ],
    answer: 1,
    explanation: 'Singular possessives need an apostrophe + s: "brother\'s car." (A) correctly uses "its" (no apostrophe) for the possessive pronoun. (C) correctly uses commas in a series.'
  },
  {
    id: 'q-hsptls-fill-011',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 560,
    stem: 'Which sentence has a punctuation error?',
    choices: [
      '(A) The recipe calls for flour, sugar, and butter.',
      '(B) "I\'ll meet you at noon," he promised.',
      '(C) After the movie ended we went out for ice cream.',
      '(D) No error'
    ],
    answer: 2,
    explanation: 'A long introductory clause should be set off with a comma: "After the movie ended, we went out." (A) correctly uses commas in a series. (B) correctly punctuates a quotation, with the comma inside the quotation marks.'
  },
  {
    id: 'q-hsptls-fill-012',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 570,
    stem: 'Which sentence has a punctuation error?',
    choices: [
      '(A) Maria\'s coat, which she bought last week, is already torn.',
      '(B) Please bring the following items: a notebook, a pen, and a calculator.',
      '(C) The students who finished early were allowed to leave.',
      '(D) No error'
    ],
    answer: 3,
    explanation: 'No error. (A) correctly uses commas around a nonrestrictive "which" clause. (B) correctly uses a colon after an independent clause to introduce a list, with commas separating the items. (C) correctly omits commas around a restrictive "who" clause that identifies which students.'
  },
  {
    id: 'q-hsptls-fill-013',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 590,
    stem: 'Which sentence has a punctuation error?',
    choices: [
      '(A) Theres no place like home after a long trip.',
      '(B) We arrived early; however, the doors were still locked.',
      '(C) The coach said, "Practice begins at four."',
      '(D) No error'
    ],
    answer: 0,
    explanation: 'Contractions need an apostrophe: "There\'s." (B) correctly uses a semicolon to join two independent clauses connected by a conjunctive adverb followed by a comma. (C) correctly punctuates a direct quotation.'
  },
  {
    id: 'q-hsptls-fill-014',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 660,
    stem: 'Which sentence has a punctuation error?',
    choices: [
      '(A) My sister\'s friends arrived just before noon.',
      '(B) The team won the championship, the fans rushed onto the field.',
      '(C) Although it was raining, the parade continued on schedule.',
      '(D) No error'
    ],
    answer: 1,
    explanation: 'This is a comma splice: two independent clauses joined only by a comma. It needs a semicolon, period, or coordinating conjunction. (A) correctly uses a singular possessive apostrophe. (C) correctly sets off a dependent introductory clause with a comma.'
  },
  {
    id: 'q-hsptls-fill-015',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 680,
    stem: 'Which sentence has a punctuation error?',
    choices: [
      '(A) We packed sandwiches, fruit, and water for the hike.',
      '(B) The committee\'s decision, while controversial, was final.',
      '(C) My oldest brother, Daniel is a pilot for a major airline.',
      '(D) No error'
    ],
    answer: 2,
    explanation: 'When a name is used as a nonrestrictive appositive, it must be set off by commas on both sides: "My oldest brother, Daniel, is a pilot." (A) correctly uses commas in a series. (B) correctly uses commas to set off a parenthetical phrase.'
  },
  {
    id: 'q-hsptls-fill-016',
    section: 'language-skills',
    topic: 'punctuation',
    difficulty: 740,
    stem: 'Which sentence has a punctuation error?',
    choices: [
      '(A) Several books on the shelf — most of them novels — belonged to my grandmother.',
      '(B) The mayor\'s speech, though brief, drew loud applause.',
      '(C) We invited Anna, who lives next door, to dinner on Friday.',
      '(D) No error'
    ],
    answer: 3,
    explanation: 'No error. (A) correctly uses paired em dashes to set off a parenthetical insertion. (B) correctly sets off a parenthetical adjective phrase with commas. (C) correctly uses commas to set off a nonrestrictive "who" clause.'
  },

  // ===== USAGE (8) — answer pattern: 0,1,2,3,0,1,2,3 =====
  {
    id: 'q-hsptls-fill-017',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 460,
    stem: 'Which sentence has a usage error?',
    choices: [
      '(A) Each of the players have a uniform.',
      '(B) She and I went to the concert together.',
      '(C) The book on the shelf belongs to him.',
      '(D) No error'
    ],
    answer: 0,
    explanation: 'Subject-verb agreement: "Each" is singular and takes "has," not "have." (B) correctly uses subject pronouns "She and I." (C) correctly uses the object pronoun "him" after the preposition "to."'
  },
  {
    id: 'q-hsptls-fill-018',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 480,
    stem: 'Which sentence has a usage error?',
    choices: [
      '(A) My sister and I are studying for the test.',
      '(B) The package was delivered to my mother and I.',
      '(C) Whom did you see at the game?',
      '(D) No error'
    ],
    answer: 1,
    explanation: 'After a preposition use the object pronoun: "to my mother and me." (A) correctly uses the subject pronoun "I" as part of a compound subject. (C) correctly uses "Whom" as the object of the verb "did see."'
  },
  {
    id: 'q-hsptls-fill-019',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 560,
    stem: 'Which sentence has a usage error?',
    choices: [
      '(A) She runs faster than I do.',
      '(B) The committee has reached its decision.',
      '(C) Neither the dog nor the cats wants to go outside.',
      '(D) No error'
    ],
    answer: 2,
    explanation: 'In a "neither...nor" construction the verb agrees with the nearer subject. "Cats" is plural, so the verb must be "want," not "wants." (A) correctly uses the subject pronoun in a comparison. (B) correctly treats "committee" as a singular collective noun with the singular pronoun "its."'
  },
  {
    id: 'q-hsptls-fill-020',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 580,
    stem: 'Which sentence has a usage error?',
    choices: [
      '(A) She is one of those students who always finish their homework.',
      '(B) Between you and me, the test was harder than expected.',
      '(C) He has lived in three different countries during his career.',
      '(D) No error'
    ],
    answer: 3,
    explanation: 'No error. (A) correctly uses plural "finish" because the relative clause refers to "students," not "one." (B) correctly uses the object pronoun "me" after the preposition "between." (C) correctly uses the present perfect "has lived" to describe an action continuing into the present.'
  },
  {
    id: 'q-hsptls-fill-021',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 590,
    stem: 'Which sentence has a usage error?',
    choices: [
      '(A) The team played good despite the rough weather.',
      '(B) She felt bad about missing the rehearsal.',
      '(C) He sings well enough to join the choir.',
      '(D) No error'
    ],
    answer: 0,
    explanation: 'The adverb "well" — not the adjective "good" — is needed to modify the verb "played": "played well." (B) correctly uses "bad" because "felt" is a linking verb requiring an adjective predicate. (C) correctly uses the adverb "well" to modify "sings."'
  },
  {
    id: 'q-hsptls-fill-022',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 660,
    stem: 'Which sentence has a usage error?',
    choices: [
      '(A) Each of the contestants has a number pinned to her shirt.',
      '(B) If I was you, I would apologize immediately.',
      '(C) Neither the coach nor the players were happy with the call.',
      '(D) No error'
    ],
    answer: 1,
    explanation: 'Contrary-to-fact conditions take the subjunctive: "If I were you." (A) correctly uses singular "has" because "Each" is singular. (C) correctly uses plural "were" because in a "neither...nor" construction the verb agrees with the nearer subject ("players").'
  },
  {
    id: 'q-hsptls-fill-023',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 680,
    stem: 'Which sentence has a usage error?',
    choices: [
      '(A) The award was presented to whoever earned the most points.',
      '(B) Lying on the couch, the puppy chewed the slipper.',
      '(C) My brother runs more faster than anyone on the team.',
      '(D) No error'
    ],
    answer: 2,
    explanation: 'Avoid the double comparative: use either "faster" or "more quickly," not "more faster." (A) correctly uses the subject pronoun "whoever" because it is the subject of "earned" within its clause. (B) correctly attaches the participial phrase "Lying on the couch" to the puppy.'
  },
  {
    id: 'q-hsptls-fill-024',
    section: 'language-skills',
    topic: 'usage',
    difficulty: 740,
    stem: 'Which sentence has a usage error?',
    choices: [
      '(A) The data she collected suggest a clear pattern.',
      '(B) Either the manager or the assistants are responsible for closing.',
      '(C) Neither of the proposals were accepted by the board.',
      '(D) No error'
    ],
    answer: 2,
    explanation: '"Neither" is singular and takes a singular verb: "Neither of the proposals was accepted." (A) correctly treats "data" as a plural noun, taking the plural verb "suggest." (B) correctly applies the proximity rule in an "either...or" construction: the verb agrees with the nearer subject "assistants" (plural), so "are" is correct.'
  },

  // ===== SPELLING (8) — answer pattern: 0,1,2,3,0,1,2,3 =====
  {
    id: 'q-hsptls-fill-025',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 470,
    stem: 'Which sentence contains a misspelled word?',
    choices: [
      '(A) The wether forecast called for snow this evening.',
      '(B) She received a beautiful necklace for her birthday.',
      '(C) The library closes at nine o\'clock on weekdays.',
      '(D) No error'
    ],
    answer: 0,
    explanation: '"Wether" is misspelled; the correct word for atmospheric conditions is "weather." (B) "received" follows the i-before-e-except-after-c rule. (C) "library" and "o\'clock" are spelled correctly.'
  },
  {
    id: 'q-hsptls-fill-026',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 490,
    stem: 'Which sentence contains a misspelled word?',
    choices: [
      '(A) The principal addressed the entire student body.',
      '(B) Tomorow we will visit the science museum downtown.',
      '(C) She wore a beautiful dress to the celebration.',
      '(D) No error'
    ],
    answer: 1,
    explanation: '"Tomorow" should be spelled "tomorrow" with two r\'s. (A) "principal" (head of school) is correctly spelled. (C) "beautiful" and "celebration" are correctly spelled.'
  },
  {
    id: 'q-hsptls-fill-027',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 560,
    stem: 'Which sentence contains a misspelled word?',
    choices: [
      '(A) The committee will meet on Thursday afternoon.',
      '(B) We received the package yesterday morning.',
      '(C) She made an embarassing mistake during the speech.',
      '(D) No error'
    ],
    answer: 2,
    explanation: '"Embarassing" is misspelled; the correct spelling is "embarrassing" with two r\'s and two s\'s. (A) "committee" correctly has double m, t, and e. (B) "received" is correctly spelled.'
  },
  {
    id: 'q-hsptls-fill-028',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 580,
    stem: 'Which sentence contains a misspelled word?',
    choices: [
      '(A) The argument between them lasted for an hour.',
      '(B) Her perseverance helped her finish the marathon.',
      '(C) The accommodations at the hotel were comfortable.',
      '(D) No error'
    ],
    answer: 3,
    explanation: 'No error. (A) "argument" correctly drops the e from "argue." (B) "perseverance" is correctly spelled. (C) "accommodations" is correctly spelled with two c\'s and two m\'s.'
  },
  {
    id: 'q-hsptls-fill-029',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 590,
    stem: 'Which sentence contains a misspelled word?',
    choices: [
      '(A) The athletes practiced their manuevers all afternoon.',
      '(B) The doctor recommended a healthy diet and exercise.',
      '(C) Their conversation was both pleasant and informative.',
      '(D) No error'
    ],
    answer: 0,
    explanation: '"Manuevers" is misspelled; the correct spelling is "maneuvers." (B) "recommended" is correctly spelled with one c and double m. (C) "conversation" is correctly spelled.'
  },
  {
    id: 'q-hsptls-fill-030',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 660,
    stem: 'Which sentence contains a misspelled word?',
    choices: [
      '(A) The architect designed an unusual building downtown.',
      '(B) Her acheivement was recognized at the assembly.',
      '(C) We will definitely attend the awards ceremony.',
      '(D) No error'
    ],
    answer: 1,
    explanation: '"Acheivement" is misspelled; the correct spelling is "achievement" (i before e except after c). (A) "architect" and "unusual" are correctly spelled. (C) "definitely" (often misspelled "definately") is correctly spelled.'
  },
  {
    id: 'q-hsptls-fill-031',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 680,
    stem: 'Which sentence contains a misspelled word?',
    choices: [
      '(A) The judge issued a clear and concise statement.',
      '(B) The conscientious worker arrived early every day.',
      '(C) We took a brief intermision before the second act.',
      '(D) No error'
    ],
    answer: 2,
    explanation: '"Intermision" is misspelled; the correct spelling is "intermission" with two s\'s. (A) "concise" is correctly spelled. (B) "conscientious" — a tricky word — is spelled correctly here.'
  },
  {
    id: 'q-hsptls-fill-032',
    section: 'language-skills',
    topic: 'spelling',
    difficulty: 740,
    stem: 'Which sentence contains a misspelled word?',
    choices: [
      '(A) The judge\'s decision was widely considered just and impartial.',
      '(B) Her conscientious approach to research earned recognition.',
      '(C) The writer\'s perseverance led to publication of the novel.',
      '(D) No error'
    ],
    answer: 3,
    explanation: 'No error. (A) "impartial" is correctly spelled. (B) "conscientious" — a notoriously tricky word — is spelled correctly. (C) "perseverance" (only one r before the second e) is spelled correctly.'
  },

  // ===== COMPOSITION (8) — answer pattern: 0,1,2,3,0,1,2,3 =====
  {
    id: 'q-hsptls-fill-033',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 480,
    stem: 'Which is the best version of the underlined sentence? "The storm was very strong. It knocked down many trees."',
    choices: [
      '(A) The strong storm knocked down many trees.',
      '(B) The storm was very strong, and it knocked down many trees.',
      '(C) Because of the very strong storm, it knocked down many trees.',
      '(D) The storm, being very strong, knocked down many trees.'
    ],
    answer: 0,
    explanation: '(A) is the most concise and clear: it combines the two ideas without redundancy. (B) is acceptable but wordier. (C) creates an unclear pronoun reference for "it." (D) is awkward and uses unnecessary participial phrasing.'
  },
  {
    id: 'q-hsptls-fill-034',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 490,
    stem: 'Which is the best way to combine these sentences? "Maria likes painting. She also enjoys playing the piano."',
    choices: [
      '(A) Maria likes painting; in addition, she also enjoys playing the piano.',
      '(B) Maria likes painting and playing the piano.',
      '(C) Maria, who likes painting, enjoys playing the piano too.',
      '(D) Maria, liking painting, enjoys playing the piano.'
    ],
    answer: 1,
    explanation: '(B) achieves parallel structure ("painting and playing") and is the most concise. (A) is redundant ("in addition" + "also"). (C) is grammatically fine but wordier and demotes painting to a relative clause. (D) is awkwardly phrased.'
  },
  {
    id: 'q-hsptls-fill-035',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 560,
    stem: 'Which sentence best combines the following? "The chef prepared the meal. The meal was delicious. Everyone enjoyed it."',
    choices: [
      '(A) The chef prepared the meal that was delicious, and everyone enjoyed it.',
      '(B) Everyone enjoyed the meal that the chef prepared, and it was delicious.',
      '(C) The chef prepared a delicious meal, which everyone enjoyed.',
      '(D) The chef\'s meal that was delicious was enjoyed by everyone.'
    ],
    answer: 2,
    explanation: '(C) is concise and flows naturally, using "delicious" as a modifier and a relative clause for the reaction. (A) is wordier and uses an awkward construction. (B) buries the cause in a trailing clause. (D) is awkward and uses unnecessary passive voice.'
  },
  {
    id: 'q-hsptls-fill-036',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 570,
    stem: 'Which transition best fits in the blank? "The team practiced for hours every day. _____ they lost the championship game."',
    choices: [
      '(A) Therefore,',
      '(B) For instance,',
      '(C) Similarly,',
      '(D) Nevertheless,'
    ],
    answer: 3,
    explanation: '"Nevertheless" signals contrast — the team practiced hard yet still lost. (A) "Therefore" suggests cause and effect, which is the opposite logical relationship. (B) "For instance" introduces an example, not a contrast. (C) "Similarly" introduces a comparison.'
  },
  {
    id: 'q-hsptls-fill-037',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 590,
    stem: 'Which sentence best combines these ideas? "The novel was published in 1925. It has remained popular ever since."',
    choices: [
      '(A) The novel, which was published in 1925, has remained popular ever since.',
      '(B) Although the novel was published in 1925, it has remained popular ever since.',
      '(C) The novel was published in 1925, but it has remained popular ever since.',
      '(D) The novel published in 1925, and it has remained popular ever since.'
    ],
    answer: 0,
    explanation: '(A) uses a nonrestrictive relative clause to fold the publication date into a single, smooth sentence. (B) misuses "Although," which implies contrast not present here. (C) misuses "but" for the same reason. (D) is a sentence fragment merged with an independent clause and is grammatically incorrect.'
  },
  {
    id: 'q-hsptls-fill-038',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 670,
    stem: 'Which sentence shows the best parallel structure?',
    choices: [
      '(A) The instructor told us to read the chapter, take notes, and that we should review the diagrams.',
      '(B) The instructor told us to read the chapter, to take notes, and to review the diagrams.',
      '(C) The instructor told us reading the chapter, to take notes, and reviewing the diagrams.',
      '(D) The instructor told us read the chapter, taking notes, and reviewing the diagrams.'
    ],
    answer: 1,
    explanation: '(B) keeps all three items in parallel infinitive form ("to read...to take...to review"). (A) breaks parallelism by switching to a "that" clause. (C) mixes gerunds and infinitives. (D) is grammatically incorrect because "told us read" omits "to."'
  },
  {
    id: 'q-hsptls-fill-039',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 690,
    stem: 'Choose the version of the sentence that is clearest and most concise: "Due to the fact that it was raining heavily, the outdoor concert that had been planned was canceled by the organizers."',
    choices: [
      '(A) Due to the fact that it was raining heavily, the outdoor concert that had been planned was canceled by the organizers.',
      '(B) Due to heavy rain, the planned outdoor concert had been canceled by the organizers.',
      '(C) Because it was raining heavily, the organizers canceled the planned outdoor concert.',
      '(D) Heavy rain caused the organizers to cancel the planned outdoor concert that had been planned.'
    ],
    answer: 2,
    explanation: '(C) replaces wordy phrases ("Due to the fact that") with "Because," uses active voice, and avoids redundancy. (A) is wordy and passive. (B) keeps unnecessary passive voice and the verbose noun phrase. (D) is redundant ("planned...that had been planned").'
  },
  {
    id: 'q-hsptls-fill-040',
    section: 'language-skills',
    topic: 'composition',
    difficulty: 750,
    stem: 'Which arrangement of the following sentences forms the most logical paragraph? (1) Within decades it became one of the most studied works of American literature. (2) Harper Lee published her only novel in 1960. (3) The book sold millions of copies almost immediately. (4) She had been working on the manuscript for several years before its release.',
    choices: [
      '(A) 4, 2, 3, 1',
      '(B) 2, 3, 1, 4',
      '(C) 4, 2, 1, 3',
      '(D) 2, 4, 3, 1'
    ],
    answer: 3,
    explanation: '(D) follows logical chronology and progression: introduce the publication (2), give background on its development (4), report immediate reception (3), then describe long-term influence (1). (A) leads with background before introducing what the book is. (B) ends with background, which is anticlimactic and out of order. (C) ends with the immediate reception after the long-term influence, reversing the time scale.'
  }
]);
