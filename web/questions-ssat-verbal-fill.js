/**
 * SSAT Verbal — fill batch (40 more questions, distinct from the
 * 50 in questions-ssat-verbal.js).
 *
 * testType: 'SSAT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'verbal'
 *
 * Concatenates onto window.STL_QUESTIONS_SSAT.
 */
'use strict';

window.STL_QUESTIONS_SSAT = (window.STL_QUESTIONS_SSAT || []).concat([

  /* ============================================================== *
   * SYNONYMS · 20 questions (q-ssatv-fill-001 — q-ssatv-fill-020)
   * Distribution: 4 easy / 8 medium / 6 hard / 2 insane
   * Answer indices targeted: 5×A, 5×B, 5×C, 5×D
   * ============================================================== */

  // ----- EASY (560-600) -----
  {
    id: 'q-ssatv-fill-001', section: 'verbal', topic: 'synonyms', difficulty: 600,
    stem: 'VEX',
    choices: ['annoy', 'praise', 'doubt', 'rescue'],
    answer: 0,
    explanation: 'VEX means to irritate or annoy. "Praise" is roughly opposite, "doubt" is mental uncertainty, "rescue" is unrelated.'
  },
  {
    id: 'q-ssatv-fill-002', section: 'verbal', topic: 'synonyms', difficulty: 580,
    stem: 'SURLY',
    choices: ['talkative', 'grumpy', 'gentle', 'fearful'],
    answer: 1,
    explanation: 'SURLY means bad-tempered and rude — "grumpy". "Gentle" is the opposite mood; "talkative" and "fearful" describe unrelated traits.'
  },
  {
    id: 'q-ssatv-fill-003', section: 'verbal', topic: 'synonyms', difficulty: 600,
    stem: 'SCRUTINIZE',
    choices: ['ignore', 'soften', 'examine', 'admire'],
    answer: 2,
    explanation: 'To SCRUTINIZE is to examine closely and critically. "Ignore" is the opposite; "admire" describes feeling rather than careful inspection.'
  },
  {
    id: 'q-ssatv-fill-004', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'JOCULAR',
    choices: ['serious', 'lazy', 'awkward', 'humorous'],
    answer: 3,
    explanation: 'JOCULAR means fond of joking — "humorous". "Serious" is the antonym; the others describe unrelated qualities.'
  },

  // ----- MEDIUM (640-680) -----
  {
    id: 'q-ssatv-fill-005', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'METICULOUS',
    choices: ['careful', 'reckless', 'gentle', 'eager'],
    answer: 0,
    explanation: 'METICULOUS means showing great attention to detail — "careful" (often described as exceedingly careful). "Reckless" is the opposite.'
  },
  {
    id: 'q-ssatv-fill-006', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'GARRULOUS',
    choices: ['silent', 'talkative', 'angry', 'wise'],
    answer: 1,
    explanation: 'GARRULOUS means excessively talkative, especially about trivial matters. "Silent" is the antonym.'
  },
  {
    id: 'q-ssatv-fill-007', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'BREVITY',
    choices: ['courage', 'beauty', 'shortness', 'sorrow'],
    answer: 2,
    explanation: 'BREVITY means concise and exact use of words — "shortness" (especially of speech or writing). "Courage" sounds similar to "bravery" but is unrelated.'
  },
  {
    id: 'q-ssatv-fill-008', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'GREGARIOUS',
    choices: ['lonely', 'rude', 'stingy', 'sociable'],
    answer: 3,
    explanation: 'GREGARIOUS means fond of company — "sociable". "Lonely" suggests the opposite condition.'
  },
  {
    id: 'q-ssatv-fill-009', section: 'verbal', topic: 'synonyms', difficulty: 700,
    stem: 'ABET',
    choices: ['assist', 'punish', 'doubt', 'precede'],
    answer: 0,
    explanation: 'To ABET is to encourage or assist (often in wrongdoing). "Punish" is roughly opposite in spirit; "doubt" and "precede" are unrelated.'
  },
  {
    id: 'q-ssatv-fill-010', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'ACRID',
    choices: ['sweet', 'bitter', 'damp', 'plain'],
    answer: 1,
    explanation: 'ACRID means having an irritatingly strong, bitter taste or smell — "bitter". "Sweet" is the antonym.'
  },
  {
    id: 'q-ssatv-fill-011', section: 'verbal', topic: 'synonyms', difficulty: 670,
    stem: 'STOIC',
    choices: ['cheerful', 'cowardly', 'unemotional', 'graceful'],
    answer: 2,
    explanation: 'STOIC describes a person who endures pain or hardship without showing feelings — "unemotional". "Cowardly" is roughly opposite.'
  },
  {
    id: 'q-ssatv-fill-012', section: 'verbal', topic: 'synonyms', difficulty: 680,
    stem: 'LANGUID',
    choices: ['sturdy', 'noisy', 'curious', 'sluggish'],
    answer: 3,
    explanation: 'LANGUID means displaying little energy or spirit — "sluggish". "Sturdy" suggests vigor; the others are unrelated.'
  },

  // ----- HARD (700-740) -----
  {
    id: 'q-ssatv-fill-013', section: 'verbal', topic: 'synonyms', difficulty: 720,
    stem: 'SUPPLANT',
    choices: ['replace', 'request', 'soften', 'celebrate'],
    answer: 0,
    explanation: 'To SUPPLANT is to take the place of, especially through force or scheming — "replace". The other choices share no semantic ground.'
  },
  {
    id: 'q-ssatv-fill-014', section: 'verbal', topic: 'synonyms', difficulty: 720,
    stem: 'TACITURN',
    choices: ['lively', 'reserved', 'tactful', 'punctual'],
    answer: 1,
    explanation: 'TACITURN means reserved or saying little — "reserved". Note the trap: "tactful" sounds similar but means diplomatic, not silent.'
  },
  {
    id: 'q-ssatv-fill-015', section: 'verbal', topic: 'synonyms', difficulty: 700,
    stem: 'IMPASSE',
    choices: ['shortcut', 'breakthrough', 'deadlock', 'detour'],
    answer: 2,
    explanation: 'An IMPASSE is a situation in which no progress is possible — "deadlock". "Breakthrough" is the antonym; "shortcut" and "detour" suggest the path continues.'
  },
  {
    id: 'q-ssatv-fill-016', section: 'verbal', topic: 'synonyms', difficulty: 720,
    stem: 'SAGACIOUS',
    choices: ['stubborn', 'modest', 'youthful', 'wise'],
    answer: 3,
    explanation: 'SAGACIOUS means having keen mental discernment and good judgment — "wise". The other choices describe traits sometimes paired with wisdom but are not synonyms.'
  },
  {
    id: 'q-ssatv-fill-017', section: 'verbal', topic: 'synonyms', difficulty: 730,
    stem: 'DEMUR',
    choices: ['object', 'apologize', 'falter', 'flatter'],
    answer: 0,
    explanation: 'To DEMUR is to raise objections or show reluctance — "object". Do not confuse with "demure" (modest); "demur" is a verb of politely opposing.'
  },
  {
    id: 'q-ssatv-fill-018', section: 'verbal', topic: 'synonyms', difficulty: 740,
    stem: 'SURFEIT',
    choices: ['shortage', 'excess', 'demand', 'imitation'],
    answer: 1,
    explanation: 'A SURFEIT is an excessive amount of something. "Shortage" is the antonym; the others are semantically distant.'
  },

  // ----- INSANE (760-780) -----
  {
    id: 'q-ssatv-fill-019', section: 'verbal', topic: 'synonyms', difficulty: 770,
    stem: 'INEFFABLE',
    choices: ['common', 'ordinary', 'indescribable', 'unfortunate'],
    answer: 2,
    explanation: 'INEFFABLE means too great or extreme to be expressed in words — "indescribable". "Common" and "ordinary" describe the opposite (easily expressed); "unfortunate" is unrelated.'
  },
  {
    id: 'q-ssatv-fill-020', section: 'verbal', topic: 'synonyms', difficulty: 770,
    stem: 'MERCURIAL',
    choices: ['stable', 'metallic', 'liquid', 'volatile'],
    answer: 3,
    explanation: 'MERCURIAL describes a person prone to sudden, unpredictable changes of mood — "volatile". "Stable" is the antonym; "metallic" and "liquid" play on the literal element mercury, but the figurative sense is required.'
  },

  /* ============================================================== *
   * ANALOGIES · 20 questions (q-ssatv-fill-021 — q-ssatv-fill-040)
   * Distribution: 4 easy / 8 medium / 6 hard / 2 insane
   * Answer indices targeted: 5×A, 5×B, 5×C, 5×D
   * Relationship types vary across each tier.
   * ============================================================== */

  // ----- EASY (560-600) -----
  {
    id: 'q-ssatv-fill-021', section: 'verbal', topic: 'analogies', difficulty: 540,
    stem: 'CALF : COW :: FOAL : ?',
    choices: ['horse', 'mane', 'saddle', 'meadow'],
    answer: 0,
    explanation: 'A calf is the young of a cow; a foal is the young of a HORSE. Young animal to its adult form. "Mane" is a body part; "saddle" is gear; "meadow" is habitat.'
  },
  {
    id: 'q-ssatv-fill-022', section: 'verbal', topic: 'analogies', difficulty: 580,
    stem: 'GLOVE : HAND :: SOCK : ?',
    choices: ['shoe', 'foot', 'wool', 'toe'],
    answer: 1,
    explanation: 'A glove covers a hand; a sock covers a FOOT. Covering-to-body-part. "Shoe" also covers the foot but is the wrong shape — the relationship is the worn item to the body part it fits, not item to item; "toe" is only part of the foot.'
  },
  {
    id: 'q-ssatv-fill-023', section: 'verbal', topic: 'analogies', difficulty: 580,
    stem: 'OVEN : BAKE :: REFRIGERATOR : ?',
    choices: ['cook', 'open', 'cool', 'store'],
    answer: 2,
    explanation: 'The function of an oven is to bake (heat); the function of a refrigerator is to COOL. "Store" is true but secondary; "cool" matches the temperature-changing function paired with "bake".'
  },
  {
    id: 'q-ssatv-fill-024', section: 'verbal', topic: 'analogies', difficulty: 580,
    stem: 'HAPPY : SAD :: GENEROUS : ?',
    choices: ['kind', 'wealthy', 'humble', 'stingy'],
    answer: 3,
    explanation: 'Happy and sad are antonyms; generous and STINGY are antonyms. "Kind" is a near-synonym of generous, not its opposite.'
  },

  // ----- MEDIUM (640-680) -----
  {
    id: 'q-ssatv-fill-025', section: 'verbal', topic: 'analogies', difficulty: 660,
    stem: 'CHAPTER : BOOK :: SCENE : ?',
    choices: ['play', 'actor', 'stage', 'curtain'],
    answer: 0,
    explanation: 'A chapter is a subdivision of a book; a scene is a subdivision of a PLAY. Part-to-whole. The other choices are related to plays but are not the structural whole.'
  },
  {
    id: 'q-ssatv-fill-026', section: 'verbal', topic: 'analogies', difficulty: 670,
    stem: 'STETHOSCOPE : DOCTOR :: GAVEL : ?',
    choices: ['lawyer', 'judge', 'witness', 'jury'],
    answer: 1,
    explanation: 'A stethoscope is the characteristic tool of a doctor; a gavel is the characteristic tool of a JUDGE. Tool-to-user. A lawyer argues but does not wield the gavel.'
  },
  {
    id: 'q-ssatv-fill-027', section: 'verbal', topic: 'analogies', difficulty: 660,
    stem: 'WARM : HOT :: COOL : ?',
    choices: ['mild', 'damp', 'cold', 'breezy'],
    answer: 2,
    explanation: 'Warm is a milder version of hot; cool is a milder version of COLD. Degree relationship along a temperature scale. "Mild" describes warmth, not extreme cold.'
  },
  {
    id: 'q-ssatv-fill-028', section: 'verbal', topic: 'analogies', difficulty: 680,
    stem: 'DROUGHT : RAIN :: FAMINE : ?',
    choices: ['hunger', 'farmer', 'drink', 'food'],
    answer: 3,
    explanation: 'A drought is a severe lack of rain; a famine is a severe lack of FOOD. "Lacks" relationship. "Hunger" is the result of famine, not what is missing.'
  },
  {
    id: 'q-ssatv-fill-029', section: 'verbal', topic: 'analogies', difficulty: 660,
    stem: 'BEE : HIVE :: BEAVER : ?',
    choices: ['lodge', 'dam', 'river', 'pond'],
    answer: 0,
    explanation: 'A hive is the home a bee builds; a LODGE is the home a beaver builds. Animal to its constructed dwelling. A dam is a beaver structure, but the lodge is the residence.'
  },
  {
    id: 'q-ssatv-fill-030', section: 'verbal', topic: 'analogies', difficulty: 670,
    stem: 'SCISSORS : CUT :: NEEDLE : ?',
    choices: ['thread', 'sew', 'point', 'tailor'],
    answer: 1,
    explanation: 'Scissors are used to cut; a needle is used to SEW. Tool-to-action. "Thread" pairs with the needle but is not its action; "tailor" is the user, not the action.'
  },
  {
    id: 'q-ssatv-fill-031', section: 'verbal', topic: 'analogies', difficulty: 650,
    stem: 'GROVE : TREES :: ARCHIPELAGO : ?',
    choices: ['oceans', 'sailors', 'islands', 'beaches'],
    answer: 2,
    explanation: 'A grove is a group of trees; an archipelago is a group of ISLANDS. Collective grouping.'
  },
  {
    id: 'q-ssatv-fill-032', section: 'verbal', topic: 'analogies', difficulty: 680,
    stem: 'RULER : LENGTH :: SCALE : ?',
    choices: ['music', 'climb', 'fish', 'weight'],
    answer: 3,
    explanation: 'A ruler measures length; a scale measures WEIGHT. Instrument-to-quantity-measured. The other choices use the word "scale" in unrelated senses.'
  },

  // ----- HARD (700-740) -----
  {
    id: 'q-ssatv-fill-033', section: 'verbal', topic: 'analogies', difficulty: 710,
    stem: 'COWARD : BRAVERY :: PAUPER : ?',
    choices: ['wealth', 'beggar', 'pity', 'rags'],
    answer: 0,
    explanation: 'A coward lacks bravery; a pauper lacks WEALTH. "Lacks" relationship. "Beggar" is a near-synonym, "rags" is an associated image, "pity" is a reaction.'
  },
  {
    id: 'q-ssatv-fill-034', section: 'verbal', topic: 'analogies', difficulty: 720,
    stem: 'CACOPHONY : SOUND :: STENCH : ?',
    choices: ['garbage', 'odor', 'noise', 'taste'],
    answer: 1,
    explanation: 'A cacophony is a harsh, unpleasant sound; a stench is a harsh, unpleasant ODOR. Unpleasant intensity within a sense. "Garbage" can produce a stench but is not the category.'
  },
  {
    id: 'q-ssatv-fill-035', section: 'verbal', topic: 'analogies', difficulty: 700,
    stem: 'OBSTINATE : YIELD :: TIMID : ?',
    choices: ['flee', 'hide', 'venture', 'tremble'],
    answer: 2,
    explanation: 'An obstinate person refuses to yield; a timid person refuses to VENTURE (take bold action). Trait-to-action-it-resists. "Tremble" and "hide" are things timid people DO, not what they avoid.'
  },
  {
    id: 'q-ssatv-fill-036', section: 'verbal', topic: 'analogies', difficulty: 730,
    stem: 'TIRADE : SCOLD :: EULOGY : ?',
    choices: ['mourn', 'ridicule', 'lecture', 'praise'],
    answer: 3,
    explanation: 'A tirade is an extended speech intended to scold; a eulogy is an extended speech intended to PRAISE. Speech-to-purpose. "Mourn" describes the audience\'s feeling at a funeral, not the eulogy\'s purpose.'
  },
  {
    id: 'q-ssatv-fill-037', section: 'verbal', topic: 'analogies', difficulty: 740,
    stem: 'EMACIATED : THIN :: PARCHED : ?',
    choices: ['dry', 'cracked', 'thirsty', 'baked'],
    answer: 0,
    explanation: 'Emaciated is an extreme degree of thin; parched is an extreme degree of DRY. Degree relationship. "Thirsty" describes a related sensation in a person, not the intensified state of dryness itself; "cracked" is a result.'
  },
  {
    id: 'q-ssatv-fill-038', section: 'verbal', topic: 'analogies', difficulty: 730,
    stem: 'CARTOGRAPHER : MAP :: CHOREOGRAPHER : ?',
    choices: ['stage', 'dance', 'music', 'studio'],
    answer: 1,
    explanation: 'A cartographer creates maps; a choreographer creates DANCES. Maker-to-product. "Stage" and "studio" are settings; "music" is what dance is set to, not what is created.'
  },

  // ----- INSANE (760-780) -----
  {
    id: 'q-ssatv-fill-039', section: 'verbal', topic: 'analogies', difficulty: 770,
    stem: 'PHILANTHROPIST : GENEROSITY :: ASCETIC : ?',
    choices: ['piety', 'wealth', 'self-denial', 'solitude'],
    answer: 2,
    explanation: 'A philanthropist is defined by generosity; an ascetic is defined by SELF-DENIAL (the renunciation of comforts). "Solitude" and "piety" are common but secondary; the core defining trait is austerity.'
  },
  {
    id: 'q-ssatv-fill-040', section: 'verbal', topic: 'analogies', difficulty: 780,
    stem: 'PUGNACIOUS : FIGHT :: LOQUACIOUS : ?',
    choices: ['listen', 'whisper', 'argue', 'talk'],
    answer: 3,
    explanation: 'A pugnacious person is eager to fight; a loquacious person is eager to TALK. Trait-to-characteristic-action. "Argue" requires conflict; "whisper" specifies manner; "listen" is the opposite tendency.'
  }

]);
