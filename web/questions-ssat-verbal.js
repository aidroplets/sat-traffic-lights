/**
 * SSAT Verbal — synonyms + analogies.
 *
 * Tagged for the per-test/per-subject filter system:
 *   testType: 'SSAT'
 *   section:  'verbal'
 *   topic:    'synonyms' | 'analogies'
 *
 * Difficulty maps to the SSAT 500–800 scale (tiers: easy ≤600,
 * medium 610–680, hard 690–750, insane 760+). Each question's
 * difficulty was chosen to match real SSAT prep material conventions —
 * not auto-assigned. Spread:
 *   ~10 easy (≤600)
 *   ~20 medium (660)
 *   ~16 hard (720)
 *   ~4  insane (770)
 *
 * Source content is original. Vocabulary draws from common SSAT
 * Upper Level word lists (synonyms drill set + analogy relationship
 * types: synonym, antonym, degree, part/whole, agent/tool,
 * action/object, characteristic/excess, cause/effect, place,
 * group, lacks).
 *
 * Concatenates onto window.STL_QUESTIONS_SSAT so the existing math
 * questions stay in the same pool — assembleBank picks up everything
 * under that array name. Loaded AFTER questions-isee-act.js (which
 * sets the SSAT array and DEFAULTS).
 */
'use strict';

window.STL_QUESTIONS_SSAT = (window.STL_QUESTIONS_SSAT || []).concat([

  /* ============================================================== *
   * SYNONYMS · 25 questions
   * Stem format: word in ALL-CAPS (SSAT convention).
   * Each explanation: definition + brief why-others-fail.
   * ============================================================== */

  // ----- EASY (≤600) -----
  {
    id: 'q-ssatv-001', section: 'verbal', topic: 'synonyms', difficulty: 600,
    stem: 'CANDID',
    choices: ['cunning', 'cheerful', 'frank', 'reluctant'],
    answer: 2,
    explanation: 'CANDID means open and honest in expression. "Frank" is the closest synonym. "Cheerful" describes mood, "cunning" implies deceit (the opposite), "reluctant" means unwilling.'
  },
  {
    id: 'q-ssatv-002', section: 'verbal', topic: 'synonyms', difficulty: 560,
    stem: 'ABUNDANT',
    choices: ['distant', 'scarce', 'plentiful', 'fragile'],
    answer: 2,
    explanation: 'ABUNDANT means existing in large quantities — "plentiful". "Scarce" is the antonym; "fragile" and "distant" are unrelated.'
  },
  {
    id: 'q-ssatv-003', section: 'verbal', topic: 'synonyms', difficulty: 580,
    stem: 'FATIGUED',
    choices: ['curious', 'weary', 'anxious', 'puzzled'],
    answer: 1,
    explanation: 'FATIGUED means extremely tired, which matches "weary". The other choices describe different mental states unrelated to exhaustion.'
  },
  {
    id: 'q-ssatv-004', section: 'verbal', topic: 'synonyms', difficulty: 600,
    stem: 'VIGILANT',
    choices: ['energetic', 'watchful', 'fearless', 'gentle'],
    answer: 1,
    explanation: 'VIGILANT means keeping careful watch for danger or difficulty — "watchful". The other choices describe traits sometimes associated with vigilance but are not synonyms.'
  },
  {
    id: 'q-ssatv-005', section: 'verbal', topic: 'synonyms', difficulty: 560,
    stem: 'CONCEAL',
    choices: ['hide', 'destroy', 'reveal', 'display'],
    answer: 0,
    explanation: 'CONCEAL means to keep from sight or to keep secret — "hide". "Display" and "reveal" are antonyms; "destroy" is unrelated.'
  },

  // ----- MEDIUM (610-680) -----
  {
    id: 'q-ssatv-006', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'RELUCTANT',
    choices: ['unwilling', 'humble', 'eager', 'curious'],
    answer: 0,
    explanation: 'RELUCTANT means hesitant or showing unwillingness. "Eager" is the antonym.'
  },
  {
    id: 'q-ssatv-007', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'PREVAIL',
    choices: ['surrender', 'triumph', 'invent', 'depart'],
    answer: 1,
    explanation: 'To PREVAIL is to prove more powerful than opposing forces — "triumph". "Surrender" is the opposite.'
  },
  {
    id: 'q-ssatv-008', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'FRUGAL',
    choices: ['cheerful', 'thrifty', 'wasteful', 'greedy'],
    answer: 1,
    explanation: 'FRUGAL means sparing with money — "thrifty". "Wasteful" is the opposite; "greedy" implies wanting more, not careful spending.'
  },
  {
    id: 'q-ssatv-009', section: 'verbal', topic: 'synonyms', difficulty: 600,
    stem: 'NOVICE',
    choices: ['rebel', 'beginner', 'leader', 'expert'],
    answer: 1,
    explanation: 'A NOVICE is someone new to a field — a "beginner". "Expert" is the opposite end of the spectrum.'
  },
  {
    id: 'q-ssatv-010', section: 'verbal', topic: 'synonyms', difficulty: 670,
    stem: 'INNATE',
    choices: ['inborn', 'foreign', 'temporary', 'learned'],
    answer: 0,
    explanation: 'INNATE qualities are present from birth — "inborn". "Learned" qualities are acquired, the opposite.'
  },
  {
    id: 'q-ssatv-011', section: 'verbal', topic: 'synonyms', difficulty: 680,
    stem: 'LUCID',
    choices: ['lucky', 'lazy', 'confused', 'clear'],
    answer: 3,
    explanation: 'LUCID means easily understood or expressed clearly. "Confused" is the antonym; "lucky" is a near-rhyme distractor unrelated in meaning.'
  },
  {
    id: 'q-ssatv-012', section: 'verbal', topic: 'synonyms', difficulty: 670,
    stem: 'DOCILE',
    choices: ['stubborn', 'clever', 'obedient', 'silent'],
    answer: 2,
    explanation: 'DOCILE describes someone easily managed or willing to obey — "obedient". "Stubborn" is the opposite.'
  },
  {
    id: 'q-ssatv-013', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'EVADE',
    choices: ['avoid', 'observe', 'arrest', 'confront'],
    answer: 0,
    explanation: 'To EVADE is to escape or avoid (a person, action, or question). "Confront" is the opposite.'
  },
  {
    id: 'q-ssatv-014', section: 'verbal', topic: 'synonyms', difficulty: 660,
    stem: 'RECTIFY',
    choices: ['forget', 'celebrate', 'correct', 'argue'],
    answer: 2,
    explanation: 'To RECTIFY means to put right or correct (a mistake or fault). The other choices are unrelated actions.'
  },
  {
    id: 'q-ssatv-015', section: 'verbal', topic: 'synonyms', difficulty: 680,
    stem: 'PRUDENT',
    choices: ['noisy', 'cautious', 'reckless', 'generous'],
    answer: 1,
    explanation: 'PRUDENT means showing care and thought for the future — "cautious". "Reckless" is the antonym.'
  },

  // ----- HARD (690-750) -----
  {
    id: 'q-ssatv-016', section: 'verbal', topic: 'synonyms', difficulty: 720,
    stem: 'AUSTERE',
    choices: ['severe', 'cheerful', 'lavish', 'fragile'],
    answer: 0,
    explanation: 'AUSTERE means severe or strict in manner, attitude, or appearance. "Lavish" describes the opposite — extravagant and richly decorated.'
  },
  {
    id: 'q-ssatv-017', section: 'verbal', topic: 'synonyms', difficulty: 730,
    stem: 'LACONIC',
    choices: ['humorous', 'tropical', 'wordy', 'terse'],
    answer: 3,
    explanation: 'LACONIC means using few words; "terse" is the closest synonym. "Wordy" is the antonym; "tropical" is a sound-alike distractor.'
  },
  {
    id: 'q-ssatv-018', section: 'verbal', topic: 'synonyms', difficulty: 720,
    stem: 'INNOCUOUS',
    choices: ['native', 'poisonous', 'obvious', 'harmless'],
    answer: 3,
    explanation: 'INNOCUOUS means causing no harm or offense — "harmless". "Poisonous" is the opposite.'
  },
  {
    id: 'q-ssatv-019', section: 'verbal', topic: 'synonyms', difficulty: 720,
    stem: 'PRECARIOUS',
    choices: ['stable', 'colorful', 'risky', 'rapid'],
    answer: 2,
    explanation: 'PRECARIOUS means dangerously unstable or uncertain — "risky". "Stable" is the antonym.'
  },
  {
    id: 'q-ssatv-020', section: 'verbal', topic: 'synonyms', difficulty: 730,
    stem: 'OSTENTATIOUS',
    choices: ['showy', 'religious', 'modest', 'ancient'],
    answer: 0,
    explanation: 'OSTENTATIOUS means designed to attract attention through showy display — "showy". "Modest" is the opposite.'
  },
  {
    id: 'q-ssatv-021', section: 'verbal', topic: 'synonyms', difficulty: 730,
    stem: 'EQUIVOCAL',
    choices: ['certain', 'rapid', 'equal', 'ambiguous'],
    answer: 3,
    explanation: 'EQUIVOCAL means open to more than one interpretation — "ambiguous". "Equal" is a sound-alike distractor (same Latin root) but means evenly matched.'
  },
  {
    id: 'q-ssatv-022', section: 'verbal', topic: 'synonyms', difficulty: 740,
    stem: 'EBULLIENT',
    choices: ['exuberant', 'silent', 'nervous', 'wealthy'],
    answer: 0,
    explanation: 'EBULLIENT describes someone overflowing with enthusiasm or excitement — "exuberant" (literally "boiling over").'
  },
  {
    id: 'q-ssatv-023', section: 'verbal', topic: 'synonyms', difficulty: 730,
    stem: 'PERFUNCTORY',
    choices: ['perfect', 'superficial', 'faithful', 'optional'],
    answer: 1,
    explanation: 'PERFUNCTORY actions are carried out with minimum effort or reflection — "superficial". "Perfect" sounds similar but means thorough/flawless, the opposite.'
  },

  // ----- INSANE (760+) -----
  {
    id: 'q-ssatv-024', section: 'verbal', topic: 'synonyms', difficulty: 770,
    stem: 'PUSILLANIMOUS',
    choices: ['cowardly', 'tiny', 'silent', 'strong-willed'],
    answer: 0,
    explanation: 'PUSILLANIMOUS means showing a lack of courage or determination — "cowardly". From Latin "pusillus" (small) + "animus" (spirit) — small-spirited.'
  },
  {
    id: 'q-ssatv-025', section: 'verbal', topic: 'synonyms', difficulty: 770,
    stem: 'PROPITIOUS',
    choices: ['noisy', 'shrinking', 'favorable', 'expensive'],
    answer: 2,
    explanation: 'PROPITIOUS means giving or indicating a good chance of success — "favorable". Often used of timing, weather, or omens.'
  },

  /* ============================================================== *
   * ANALOGIES · 25 questions
   * Stem format: A : B :: C : ?
   * Relationships vary: young/adult, container/contained,
   * synonym, antonym, degree, part/whole, agent/tool,
   * place, group, characteristic excess, cause/effect, lacks.
   * ============================================================== */

  // ----- EASY (≤600) -----
  {
    id: 'q-ssatv-026', section: 'verbal', topic: 'analogies', difficulty: 540,
    stem: 'PUPPY : DOG :: KITTEN : ?',
    choices: ['mouse', 'paw', 'cat', 'tail'],
    answer: 2,
    explanation: 'A puppy is the young of a dog; a kitten is the young of a CAT. The relationship is young animal to its adult form.'
  },
  {
    id: 'q-ssatv-027', section: 'verbal', topic: 'analogies', difficulty: 580,
    stem: 'LIBRARY : BOOKS :: BAKERY : ?',
    choices: ['bread', 'oven', 'flour', 'recipe'],
    answer: 0,
    explanation: 'A library is a place where books are stored/sold; a bakery is a place where BREAD is stored/sold. The relationship is place to its primary product.'
  },
  {
    id: 'q-ssatv-028', section: 'verbal', topic: 'analogies', difficulty: 580,
    stem: 'THIRST : DRINK :: HUNGER : ?',
    choices: ['cook', 'taste', 'eat', 'plate'],
    answer: 2,
    explanation: 'Thirst is satisfied by drinking; hunger is satisfied by EATING. The relationship is need to the action that satisfies it.'
  },
  {
    id: 'q-ssatv-029', section: 'verbal', topic: 'analogies', difficulty: 600,
    stem: 'SAW : CARPENTER :: BRUSH : ?',
    choices: ['painter', 'comb', 'hair', 'wall'],
    answer: 0,
    explanation: 'A saw is the tool of a carpenter; a brush is the tool of a PAINTER. Tool-to-user relationship.'
  },
  {
    id: 'q-ssatv-030', section: 'verbal', topic: 'analogies', difficulty: 580,
    stem: 'PETAL : FLOWER :: LEAF : ?',
    choices: ['shade', 'stem', 'green', 'tree'],
    answer: 3,
    explanation: 'A petal is a part of a flower; a leaf is a part of a TREE (or any plant — but TREE fits the part-to-whole shape best among the choices).'
  },

  // ----- MEDIUM (610-680) -----
  {
    id: 'q-ssatv-031', section: 'verbal', topic: 'analogies', difficulty: 660,
    stem: 'NOVEL : AUTHOR :: SYMPHONY : ?',
    choices: ['composer', 'conductor', 'orchestra', 'audience'],
    answer: 0,
    explanation: 'A novel is created by an author; a symphony is created by a COMPOSER. The conductor PERFORMS a symphony but doesn\'t write it.'
  },
  {
    id: 'q-ssatv-032', section: 'verbal', topic: 'analogies', difficulty: 670,
    stem: 'WHISPER : SHOUT :: SIP : ?',
    choices: ['swallow', 'spill', 'drink', 'gulp'],
    answer: 3,
    explanation: 'A whisper is a quiet form of speech; a shout is the same action at extreme volume. A sip is a small drink; a GULP is the same action at extreme volume. Degree relationship.'
  },
  {
    id: 'q-ssatv-033', section: 'verbal', topic: 'analogies', difficulty: 670,
    stem: 'LION : PRIDE :: WOLF : ?',
    choices: ['howl', 'forest', 'pack', 'fang'],
    answer: 2,
    explanation: 'A pride is the collective noun for a group of lions; a PACK is the collective noun for a group of wolves.'
  },
  {
    id: 'q-ssatv-034', section: 'verbal', topic: 'analogies', difficulty: 670,
    stem: 'FAMINE : FOOD :: DROUGHT : ?',
    choices: ['land', 'rain', 'water', 'desert'],
    answer: 2,
    explanation: 'A famine is a severe lack of food; a drought is a severe lack of WATER. Lacks-relationship.'
  },
  {
    id: 'q-ssatv-035', section: 'verbal', topic: 'analogies', difficulty: 660,
    stem: 'CHAPTER : BOOK :: ACT : ?',
    choices: ['actor', 'play', 'stage', 'scene'],
    answer: 1,
    explanation: 'A chapter is a major division of a book; an act is a major division of a PLAY. Part-to-whole relationship.'
  },
  {
    id: 'q-ssatv-036', section: 'verbal', topic: 'analogies', difficulty: 680,
    stem: 'METER : LENGTH :: KILOGRAM : ?',
    choices: ['volume', 'mass', 'distance', 'weight'],
    answer: 1,
    explanation: 'A meter measures length; a kilogram measures MASS. (Weight is a related concept but technically measured in newtons; the SI unit of mass is the kilogram.)'
  },
  {
    id: 'q-ssatv-037', section: 'verbal', topic: 'analogies', difficulty: 660,
    stem: 'PILOT : COCKPIT :: CHEF : ?',
    choices: ['restaurant', 'oven', 'kitchen', 'menu'],
    answer: 2,
    explanation: 'A pilot works in a cockpit; a chef works in a KITCHEN. Worker-to-workplace relationship.'
  },
  {
    id: 'q-ssatv-038', section: 'verbal', topic: 'analogies', difficulty: 670,
    stem: 'INFANT : ADULT :: SAPLING : ?',
    choices: ['seed', 'forest', 'tree', 'bark'],
    answer: 2,
    explanation: 'An infant grows into an adult; a sapling (young tree) grows into a TREE. Young-to-mature relationship.'
  },
  {
    id: 'q-ssatv-039', section: 'verbal', topic: 'analogies', difficulty: 670,
    stem: 'SCULPTOR : CHISEL :: CARPENTER : ?',
    choices: ['apron', 'wood', 'house', 'hammer'],
    answer: 3,
    explanation: 'A sculptor uses a chisel as a primary tool; a carpenter uses a HAMMER. Worker-to-tool relationship. (Wood is the material, not the tool.)'
  },
  {
    id: 'q-ssatv-040', section: 'verbal', topic: 'analogies', difficulty: 680,
    stem: 'INVENT : EDISON :: COMPOSE : ?',
    choices: ['einstein', 'mozart', 'painter', 'shakespeare'],
    answer: 1,
    explanation: 'Edison is famous for inventing; MOZART is famous for composing music. Action-to-famous-doer relationship. (Shakespeare wrote plays but is not primarily known as a composer.)'
  },

  // ----- HARD (690-750) -----
  {
    id: 'q-ssatv-041', section: 'verbal', topic: 'analogies', difficulty: 720,
    stem: 'CACOPHONY : SOUND :: STENCH : ?',
    choices: ['noise', 'smell', 'taste', 'perfume'],
    answer: 1,
    explanation: 'A cacophony is an unpleasant sound; a stench is an unpleasant SMELL. Bad-instance-to-sense-category relationship.'
  },
  {
    id: 'q-ssatv-042', section: 'verbal', topic: 'analogies', difficulty: 730,
    stem: 'MENDACIOUS : TRUTH :: DESTITUTE : ?',
    choices: ['home', 'poverty', 'food', 'money'],
    answer: 3,
    explanation: 'A mendacious person lacks truth (lies often); a destitute person lacks MONEY. Lacks-relationship — both adjectives describe the absence of the second word.'
  },
  {
    id: 'q-ssatv-043', section: 'verbal', topic: 'analogies', difficulty: 720,
    stem: 'GLUTTON : EAT :: MISER : ?',
    choices: ['hoard', 'spend', 'argue', 'sleep'],
    answer: 0,
    explanation: 'A glutton is someone who eats excessively; a miser is someone who HOARDS (money) excessively. Person-to-their-defining-excessive-action relationship.'
  },
  {
    id: 'q-ssatv-044', section: 'verbal', topic: 'analogies', difficulty: 720,
    stem: 'ARID : DESERT :: VERDANT : ?',
    choices: ['ocean', 'tundra', 'mountain', 'jungle'],
    answer: 3,
    explanation: 'Arid (very dry) describes a desert; verdant (lush green with vegetation) describes a JUNGLE. Adjective-to-place relationship.'
  },
  {
    id: 'q-ssatv-045', section: 'verbal', topic: 'analogies', difficulty: 730,
    stem: 'PROFOUND : SHALLOW :: ABUNDANT : ?',
    choices: ['wide', 'common', 'scarce', 'plentiful'],
    answer: 2,
    explanation: 'Profound and shallow are antonyms (deep vs. not deep); abundant and SCARCE are antonyms (plentiful vs. lacking). Antonym pair.'
  },
  {
    id: 'q-ssatv-046', section: 'verbal', topic: 'analogies', difficulty: 740,
    stem: 'PERFIDIOUS : LOYALTY :: APATHETIC : ?',
    choices: ['emotion', 'interest', 'sleep', 'movement'],
    answer: 1,
    explanation: 'A perfidious person lacks loyalty (is treacherous); an apathetic person lacks INTEREST (is unconcerned). Adjective-to-quality-it-lacks.'
  },
  {
    id: 'q-ssatv-047', section: 'verbal', topic: 'analogies', difficulty: 740,
    stem: 'SLEEP : INSOMNIA :: APPETITE : ?',
    choices: ['hunger', 'meal', 'anorexia', 'glutton'],
    answer: 2,
    explanation: 'Insomnia is the inability to sleep; ANOREXIA is the loss/lack of appetite. Normal-function-to-its-clinical-deficit relationship.'
  },
  {
    id: 'q-ssatv-048', section: 'verbal', topic: 'analogies', difficulty: 720,
    stem: 'GERMINATE : SEED :: HATCH : ?',
    choices: ['bird', 'egg', 'shell', 'nest'],
    answer: 1,
    explanation: 'A seed germinates (begins to grow); an EGG hatches (breaks open as the chick emerges). Beginning-of-life action paired with what undergoes it.'
  },

  // ----- INSANE (760+) -----
  {
    id: 'q-ssatv-049', section: 'verbal', topic: 'analogies', difficulty: 770,
    stem: 'ZENITH : NADIR :: APEX : ?',
    choices: ['base', 'middle', 'summit', 'edge'],
    answer: 0,
    explanation: 'Zenith (highest point) and nadir (lowest point) are opposites; apex (peak) and BASE (lowest part) are opposites. Antonym pair across both halves.'
  },
  {
    id: 'q-ssatv-050', section: 'verbal', topic: 'analogies', difficulty: 770,
    stem: 'TYRO : EXPERT :: NEOPHYTE : ?',
    choices: ['veteran', 'apprentice', 'novice', 'student'],
    answer: 0,
    explanation: 'A tyro is a beginner; an expert is the opposite. A neophyte is also a beginner; a VETERAN (someone with long experience) is the opposite. Synonyms for novice paired with their antonyms.'
  },
]);
