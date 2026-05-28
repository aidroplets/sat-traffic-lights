/**
 * ISEE Reading Comprehension (Upper Level) — short original
 * passages with 2-3 comprehension questions each.
 *
 * testType: 'ISEE' (set via DEFAULTS in questions-isee-act.js)
 * section: 'reading-comprehension'
 *
 * Concatenates onto window.STL_QUESTIONS_ISEE.
 */
'use strict';

(function () {
  // ---------- PASSAGES ----------
  // Reused below to keep each question self-contained while avoiding
  // copy-paste drift. Each passage is original and 80-150 words.

  const P_HUM_PORTRAIT =
    'When the painter Cecily Marlow accepted the commission to paint a portrait of the aging shipping magnate, she expected a routine assignment. Instead, she found her subject restless, unwilling to sit for more than ten minutes at a stretch. Marlow soon abandoned the studio entirely. She followed the magnate through his warehouses, sketching him as he barked orders or paused, momentarily lost, before a wall of ledgers. The finished canvas, exhibited the following spring, startled critics. Rather than the polished, ceremonial portrait the family had requested, Marlow delivered a study of a man dwarfed by the empire he had built. One reviewer called it cruel; another, the truest likeness of an industrialist ever painted. The family quietly placed it in storage, where it remained for forty years.';

  const P_HUM_FOLK_MUSIC =
    'For most of the nineteenth century, the ballads sung in the mountain villages of central Europe were considered beneath serious study. Composers borrowed from them freely but rarely credited their sources. That changed when a young musicologist named Hana Vrba began traveling from village to village with a wax-cylinder recorder strapped to a mule. Vrba transcribed more than two thousand songs over a decade, often persuading reluctant elderly singers to perform pieces they themselves dismissed as childish. Her published collection, released in 1903, did not become a popular success. It did, however, supply later composers with raw material for symphonies, operas, and film scores. Vrba never received royalties, and her name is absent from most concert programs that still draw on her archive.';

  const P_HUM_NOVEL_TRANSLATION =
    'A translator faces a peculiar problem: every choice is also a refusal. To render a single sentence in a new language, one must decide which of its meanings to preserve and which to let go. The novelist Adalia Quint, whose work has appeared in nineteen languages, once compared the process to packing a suitcase for a long journey. Some treasured items must be left at home. Quint argued that the best translations are not the most literal, but those willing to make small betrayals in service of a larger fidelity. A translator who insists on capturing every nuance, she warned, risks producing prose so cluttered that the original voice disappears beneath it. Better, she said, to choose a few things well.';

  const P_HUM_PHILOSOPHY_FRIENDSHIP =
    'Ancient philosophers were unusually concerned with friendship, treating it as a serious subject of inquiry rather than a private matter. Aristotle distinguished three kinds: friendships of utility, in which each party benefits materially; friendships of pleasure, founded on shared enjoyment; and friendships of virtue, in which two people of good character delight in each other simply for who they are. Only the third, he argued, is durable. The other two dissolve once the benefit or the pleasure runs out. Modern readers sometimes find this taxonomy cold, but Aristotle was not dismissing the lesser kinds. He thought most of our connections would be useful or pleasant rather than virtuous, and that this was perfectly natural. He simply wanted us to notice the difference.';

  const P_HIST_SUFFRAGE =
    'The campaign to extend voting rights in the British Isles did not move forward in a single direction. Throughout the nineteenth century, supporters of universal suffrage were repeatedly forced to choose between incremental reforms that excluded many groups and broader demands that risked defeat in Parliament. The Reform Acts of 1832 and 1867 enlarged the electorate but left the majority of working men, and all women, without the vote. Some reformers accepted these compromises as foundations for later expansion. Others, including a vocal minority of women organizers, argued that each partial victory hardened the exclusion of those left behind. Both groups proved partly right. The compromises did expand the franchise eventually; they also delayed full equality by decades, as later campaigners discovered when they pressed for it.';

  const P_HIST_LIBRARY_ALEXANDRIA =
    'Few institutions of the ancient world have generated more myth than the Library of Alexandria. Popular accounts often describe a single catastrophic fire that erased centuries of learning. The historical record is less dramatic and more troubling. The library declined gradually, over perhaps three centuries, through neglect, political instability, fluctuating royal patronage, and at least two episodes of fire damage. By the time the institution effectively ceased to function, much of its collection had already migrated to smaller libraries scattered around the Mediterranean, while other works had simply ceased to be copied. The losses were real but slow, the result of a thousand small failures of attention rather than a single calamity. The myth of the great fire is more memorable, but the truth is harder to act on.';

  const P_HIST_RAILROAD_SURVEYOR =
    'Annika Brandt was twenty-four when she joined the survey team mapping a rail route through the northern forests. The men on the crew assumed she would last a single season. She lasted eleven. Brandt kept meticulous field journals, recording not only elevations and bearings but weather, soil conditions, and the behavior of local wildlife. When the rail line was finally completed, the chief engineer credited her notes for two route adjustments that avoided seasonal flooding. Brandt herself received no formal acknowledgment in the official report. Her journals, donated to a regional archive after her death, were rediscovered in the 1980s by a graduate student who used them to reconstruct the changing climate of the region across half a century — a use Brandt could not have anticipated.';

  const P_HIST_PRINTING_PRESS =
    'The arrival of the printing press in fifteenth-century Europe is often described as a revolution that occurred all at once. In practice, the change unfolded over generations. The earliest printed books closely imitated handwritten manuscripts, down to the typefaces designed to mimic scribal hands. Many readers initially regarded printed editions as inferior copies, suitable for students but not for serious libraries. Print won acceptance only as printers gradually developed conventions of their own — title pages, page numbers, indexes, standardized spelling — that made the new medium genuinely useful in ways manuscripts could not match. By the time these conventions were widespread, the press had quietly remade the European intellectual landscape. The revolution was real; it simply moved at the pace of habit, not of invention.';

  const P_SCI_OCTOPUS =
    'The common octopus possesses a nervous system unlike that of any vertebrate. Roughly two-thirds of its neurons reside not in the central brain but in the arms themselves. Each arm can taste, touch, and to a limited extent decide. An octopus retrieving food from a complicated container may use one arm to probe an opening while another, seemingly independently, explores a different surface. Researchers have shown that severed arms continue to react to stimuli for some minutes after separation, suggesting genuine local processing rather than mere reflex. This decentralized arrangement complicates familiar assumptions about where, exactly, an animal does its thinking. It also makes octopuses awkward subjects for behavioral experiments designed around vertebrate brains, which has slowed scientific understanding of an otherwise well-studied creature.';

  const P_SCI_LICHEN =
    'A lichen is not a single organism but a partnership. Most lichens consist of a fungus living in close cooperation with one or more species of algae or cyanobacteria. The fungal partner provides structure, anchoring the lichen to rock or bark and shielding its photosynthetic partners from drying out. The algae or bacteria, in turn, supply sugars produced by photosynthesis. Until recently, biologists treated this two-partner model as definitive. New genetic studies have complicated the picture: many lichens turn out to host a third partner, a yeast embedded in the outer layer, whose role remains unclear. The discovery has forced taxonomists to reconsider species long thought to be well understood, a reminder that even familiar life forms can harbor entire unsuspected relationships.';

  const P_SCI_DARK_SKY =
    'Astronomers have long worried about light pollution, the steady brightening of the night sky caused by artificial illumination. The newer concern is satellites. Constellations of small communications satellites, deployed in low orbits to provide internet service, reflect sunlight back toward Earth and appear in long-exposure images as bright streaks across otherwise dark fields. Individual satellites can sometimes be dimmed by adjusting their surfaces, and observatories have developed software to remove some streaks from data after the fact. Neither remedy is complete. As more constellations are launched, the cumulative effect on certain kinds of observation — particularly searches for faint, distant objects — is expected to grow. Astronomers and satellite operators are negotiating over standards, but the underlying tension between expanding orbital infrastructure and ground-based science is unlikely to vanish.';

  const P_SCI_SOIL_FUNGI =
    'Beneath a healthy forest floor lies a network of fungal threads so fine that a single teaspoon of soil may contain several kilometers of them. These threads, called hyphae, weave between tree roots and form partnerships with them. The fungi receive sugars the trees produce through photosynthesis; in return, they extend the trees\' effective root surface enormously, gathering water and minerals that the roots alone could never reach. Recent experiments suggest that the fungal network sometimes carries chemical signals between trees, allowing one tree under attack by insects to alert its neighbors. The findings remain contested, and researchers caution against romanticizing the forest as a single intelligent organism. Still, the picture of trees as isolated competitors for light has become harder to defend.';

  const P_CON_REMOTE_WORK =
    'Five years after remote work became common in many industries, its long-term effects remain difficult to assess. Surveys consistently show that employees working from home report higher satisfaction and reclaim time previously spent commuting. Productivity studies are more mixed. Some find modest gains in individual output; others note declines in the kind of unplanned collaboration that drives innovation in research-heavy fields. Managers themselves are divided. Some praise the flexibility remote arrangements offer; others worry about training new employees and maintaining a coherent culture across distance. What seems clear is that no single arrangement suits every kind of work. The organizations adapting most successfully are not those clinging to either extreme but those willing to revise their assumptions as evidence accumulates.';

  const P_CON_URBAN_TREES =
    'City planners have begun treating urban trees less as decoration than as infrastructure. A mature tree provides measurable shade, lowering nearby surface temperatures by several degrees during summer heat waves. Trees also intercept rainfall, reducing strain on storm drains, and absorb a small but real fraction of airborne pollutants. These benefits, totaled across a neighborhood, can be quantified in dollars. Yet trees are expensive to plant, slow to mature, and easily killed by drought, road salt, or careless construction. Cities that succeed in growing dense urban canopies tend to be those that fund maintenance budgets for decades, not single planting drives. The challenge is political as much as horticultural: trees do not vote, and their benefits arrive long after the officials who planted them have left office.';

  const P_CON_EDUCATION_ASSESSMENT =
    'Standardized testing has been a feature of public education for more than a century, and arguments about it have evolved without ever quite resolving. Defenders point out that well-designed tests provide a common measure across schools and can identify students who need additional support. Critics counter that any single measure inevitably narrows what teachers teach, since instruction tends to follow whatever is being measured. Both observations are correct. The harder question is what to do about them. Some districts have experimented with combining test scores with portfolios of student work, classroom observations, and teacher recommendations. These richer evaluations are more informative and considerably more expensive. Whether the additional information justifies the additional cost is a question communities have answered differently, and not always permanently.';

  // ---------- DEFAULT FIELDS ----------
  const D = (q) => Object.assign({ section: 'reading-comprehension' }, q);

  const QS = [
    // ===== HUM_PORTRAIT — 3 questions =====
    D({
      id: 'q-iseerc-001',
      topic: 'vocab-in-context',
      difficulty: 5,
      passage: P_HUM_PORTRAIT,
      stem: 'As used in the passage, the word "barked" most nearly means',
      choices: ['wrote in a notebook.', 'whispered quietly.', 'laughed at length.', 'shouted in a sharp manner.'],
      answer: 3,
      explanation: 'The magnate "barked orders" to his workers, indicating loud, sharp commands. (A) is the opposite. (C) and (D) do not fit a passage describing someone running a busy warehouse.',
    }),
    D({
      id: 'q-iseerc-002',
      topic: 'detail',
      difficulty: 4,
      passage: P_HUM_PORTRAIT,
      stem: 'According to the passage, why did Marlow leave the studio?',
      choices: ['The light in the warehouses was better for painting.', 'The family insisted on a more documentary style.', 'The magnate could not sit still for long periods.', 'She wanted access to the magnate\'s ledgers.'],
      answer: 2,
      explanation: 'The passage states the magnate was "unwilling to sit for more than ten minutes at a stretch," after which "Marlow soon abandoned the studio entirely." (A) misuses the ledger detail, which is a sketching subject, not a motive. (C) and (D) are not in the passage; the family in fact wanted a polished portrait.',
    }),
    D({
      id: 'q-iseerc-003',
      topic: 'inference',
      difficulty: 7,
      passage: P_HUM_PORTRAIT,
      stem: 'It can most reasonably be inferred from the passage that the family commissioned the portrait primarily because they',
      choices: ['expected a flattering, ceremonial image of the magnate.', 'wanted to support a struggling young artist.', 'planned to donate the work to a public gallery.', 'hoped Marlow would document daily life in the warehouses.'],
      answer: 0,
      explanation: 'The passage contrasts what Marlow delivered with "the polished, ceremonial portrait the family had requested." That phrase implies the family expected exactly such a flattering image. (A) is unsupported. (C) describes Marlow\'s method, not the commission. (D) contradicts the family\'s decision to place the painting in storage.',
    }),

    // ===== HUM_FOLK_MUSIC — 3 questions =====
    D({
      id: 'q-iseerc-004',
      topic: 'purpose',
      difficulty: 6,
      passage: P_HUM_FOLK_MUSIC,
      stem: 'The author\'s primary purpose in the passage is to',
      choices: ['trace the rise of central European symphonic traditions over a full century.', 'describe a researcher whose unrecognized work became foundational for later composers.', 'argue that wax-cylinder recordings should replace modern transcription methods.', 'criticize composers who borrowed from folk songs without permission.'],
      answer: 1,
      explanation: 'The passage profiles Vrba and notes that her unfunded archive supplied "later composers" with material while she remained largely uncredited. (A) captures both halves. (B) is not the author\'s claim. (C) is mentioned only in passing as background. (D) is too broad; the focus is one researcher.',
    }),
    D({
      id: 'q-iseerc-005',
      topic: 'tone',
      difficulty: 6,
      passage: P_HUM_FOLK_MUSIC,
      stem: 'In the passage, the author describes the elderly singers as',
      choices: ['reluctant and dismissive of their own material.', 'professional concert performers.', 'hostile toward Vrba and her recordings.', 'eager and self-promoting.'],
      answer: 0,
      explanation: 'The passage describes "reluctant elderly singers" who dismissed the songs "as childish." (A) is the opposite. (C) is contradicted by the village setting. (D) overstates; they are reluctant but not hostile.',
    }),
    D({
      id: 'q-iseerc-006',
      topic: 'tone',
      difficulty: 7,
      passage: P_HUM_FOLK_MUSIC,
      stem: 'The author\'s attitude toward Vrba\'s legacy can best be described as',
      choices: ['detached and skeptical.', 'nostalgic for a vanished musical world.', 'respectful but quietly critical of her continued obscurity.', 'enthusiastic and celebratory.'],
      answer: 2,
      explanation: 'The closing observation that "her name is absent from most concert programs that still draw on her archive" registers a quiet protest, while the rest of the passage treats her work seriously. (A) is too strong; the tone is reserved. (B) misses the evident respect. (D) misreads the focus, which is on Vrba, not on lost music.',
    }),

    // ===== HUM_NOVEL_TRANSLATION — 2 questions =====
    D({
      id: 'q-iseerc-007',
      topic: 'main-idea',
      difficulty: 6,
      passage: P_HUM_NOVEL_TRANSLATION,
      stem: 'Which of the following best expresses the main idea of the passage?',
      choices: ['Good translation requires deliberate choices about what to preserve and what to omit.', 'Modern translators rely too heavily on metaphor when discussing their craft.', 'Translators should always preserve the literal meaning of every sentence.', 'Quint\'s novels are more popular in translation than in their original language.'],
      answer: 0,
      explanation: 'The passage frames translation as a matter of choice — "every choice is also a refusal" — and endorses Quint\'s view that "small betrayals" serve a larger fidelity. (A) directly contradicts the passage. (C) and (D) are not addressed.',
    }),
    D({
      id: 'q-iseerc-008',
      topic: 'vocab-in-context',
      difficulty: 8,
      passage: P_HUM_NOVEL_TRANSLATION,
      stem: 'As used in the passage, the word "fidelity" most nearly means',
      choices: ['precision in word-for-word reproduction.', 'consistency across multiple translations.', 'faithfulness to the original work as a whole.', 'romantic loyalty.'],
      answer: 2,
      explanation: '"Fidelity" appears alongside "small betrayals" of literal meaning, in service of preserving the original\'s broader voice — i.e., faithfulness to the work as a whole. (A) is the everyday sense, not the contextual one. (C) is what Quint warns against. (D) is unrelated to the passage.',
    }),

    // ===== HUM_PHILOSOPHY_FRIENDSHIP — 3 questions =====
    D({
      id: 'q-iseerc-009',
      topic: 'detail',
      difficulty: 4,
      passage: P_HUM_PHILOSOPHY_FRIENDSHIP,
      stem: 'According to the passage, Aristotle considered which kind of friendship most lasting?',
      choices: ['Friendships of pleasure, because they bring enjoyment.', 'Friendships of virtue, between people of good character.', 'Friendships of utility, because both parties benefit.', 'Friendships among philosophers specifically.'],
      answer: 1,
      explanation: 'The passage states that "Only the third" — the friendship of virtue — "is durable." (A) and (B) describe the categories Aristotle considered less stable. (D) is not in the passage.',
    }),
    D({
      id: 'q-iseerc-010',
      topic: 'tone',
      difficulty: 4,
      passage: P_HUM_PHILOSOPHY_FRIENDSHIP,
      stem: 'The author\'s description of Aristotle\'s taxonomy as something modern readers "sometimes find cold" suggests the author\'s own attitude is one of',
      choices: [
        'gentle disagreement with that modern reaction.',
        'enthusiastic endorsement of the modern reaction.',
        'open hostility toward Aristotle.',
        'complete indifference to the question.',
      ],
      answer: 0,
      explanation: 'The author immediately rebuts the cold-reading, noting Aristotle "was not dismissing the lesser kinds." That measured pushback constitutes gentle disagreement with the modern reaction. (B) reverses it. (C) and (D) overstate; the author engages thoughtfully, not with hostility or indifference.',
    }),
    D({
      id: 'q-iseerc-011',
      topic: 'tone',
      difficulty: 6,
      passage: P_HUM_PHILOSOPHY_FRIENDSHIP,
      stem: 'The author\'s tone toward Aristotle\'s view of friendship is best described as',
      choices: ['dismissive and ironic.', 'admiring but uncertain.', 'sharply critical.', 'sympathetic and explanatory.'],
      answer: 3,
      explanation: 'The author defends Aristotle against the charge of coldness and explains his point patiently ("He simply wanted us to notice the difference"). (B) and (D) misread the supportive framing. (C) overstates the uncertainty; the author is plainly comfortable with the taxonomy.',
    }),

    // ===== HIST_SUFFRAGE — 3 questions =====
    D({
      id: 'q-iseerc-012',
      topic: 'main-idea',
      difficulty: 7,
      passage: P_HIST_SUFFRAGE,
      stem: 'Which of the following best states the main idea of the passage?',
      choices: ['Women played no significant role in nineteenth-century suffrage debates.', 'British suffrage reformers were uniformly opposed to incremental change.', 'Compromise expanded the electorate over time but also delayed full equality.', 'The Reform Acts of 1832 and 1867 immediately granted universal suffrage.'],
      answer: 2,
      explanation: 'The passage closes by noting both groups "proved partly right": compromises eventually expanded the franchise yet "also delayed full equality by decades." (A) and (D) contradict the passage. (C) misstates the Reform Acts, which left many groups out.',
    }),
    D({
      id: 'q-iseerc-013',
      topic: 'detail',
      difficulty: 5,
      passage: P_HIST_SUFFRAGE,
      stem: 'According to the passage, the Reform Acts of 1832 and 1867',
      choices: ['extended the vote to all adult women.', 'were rejected by Parliament before passing.', 'enlarged the electorate but excluded most working men and all women.', 'eliminated property qualifications for voting.'],
      answer: 2,
      explanation: 'The passage states the Acts "enlarged the electorate but left the majority of working men, and all women, without the vote." (A) directly contradicts the passage. (C) is wrong; the Acts passed. (D) is not stated.',
    }),
    D({
      id: 'q-iseerc-014',
      topic: 'purpose',
      difficulty: 8,
      passage: P_HIST_SUFFRAGE,
      stem: 'The author most likely includes the observation that "both groups proved partly right" in order to',
      choices: ['praise the vocal minority of women organizers above other reformers.', 'reject the historical importance of the Reform Acts.', 'present a balanced assessment of competing reform strategies.', 'argue that all political compromise is ultimately self-defeating.'],
      answer: 2,
      explanation: 'The phrase is paired with concessions to each side: compromises expanded the franchise but also delayed equality. That dual acknowledgment is the hallmark of a balanced assessment. (A) and (B) overstate. (D) misreads; the women organizers are described, not exalted.',
    }),

    // ===== HIST_LIBRARY_ALEXANDRIA — 3 questions =====
    D({
      id: 'q-iseerc-015',
      topic: 'main-idea',
      difficulty: 6,
      passage: P_HIST_LIBRARY_ALEXANDRIA,
      stem: 'Which of the following best states the main idea of the passage?',
      choices: ['The library was never as significant as ancient writers claimed.', 'A single fire destroyed the Library of Alexandria almost overnight.', 'The library\'s decline was gradual and resulted from many small failures.', 'Modern historians cannot agree on when the library was founded.'],
      answer: 2,
      explanation: 'The passage explicitly contrasts the popular myth of "a single catastrophic fire" with a gradual decline over "perhaps three centuries" caused by "a thousand small failures of attention." (A) is the myth the passage rejects. (C) and (D) are not addressed.',
    }),
    D({
      id: 'q-iseerc-016',
      topic: 'vocab-in-context',
      difficulty: 4,
      passage: P_HIST_LIBRARY_ALEXANDRIA,
      stem: 'As used in the passage, the word "calamity" most nearly means',
      choices: ['recovery.', 'investigation.', 'celebration.', 'disaster.'],
      answer: 3,
      explanation: '"Calamity" is contrasted with the slow accumulation of failures, marking it as a single dramatic event — a disaster. (A) and (D) are essentially opposites. (C) is unrelated to the contrast the sentence draws.',
    }),
    D({
      id: 'q-iseerc-017',
      topic: 'inference',
      difficulty: 8,
      passage: P_HIST_LIBRARY_ALEXANDRIA,
      stem: 'The passage suggests that the popular fire myth persists because',
      choices: ['no historical records survive about the library\'s actual decline.', 'it is more memorable than the slower, more diffuse historical reality.', 'modern historians have failed to investigate the institution.', 'ancient writers themselves were unanimous that a fire occurred.'],
      answer: 1,
      explanation: 'The closing line says "The myth of the great fire is more memorable, but the truth is harder to act on" — explicitly attributing the myth\'s persistence to its memorability. (B) and (C) contradict the passage, which describes a recoverable historical record. (D) is not stated.',
    }),

    // ===== HIST_RAILROAD_SURVEYOR — 2 questions =====
    D({
      id: 'q-iseerc-018',
      topic: 'vocab-in-context',
      difficulty: 5,
      passage: P_HIST_RAILROAD_SURVEYOR,
      stem: 'As used in the passage, the word "meticulous" most nearly means',
      choices: ['careless.', 'illustrated with drawings.', 'brief and informal.', 'extremely careful and detailed.'],
      answer: 3,
      explanation: 'Brandt kept "meticulous field journals, recording not only elevations and bearings but weather, soil conditions, and the behavior of local wildlife" — a careful, detailed practice. (A) is the opposite. (C) contradicts the long list of recorded categories. (D) is not implied by the word itself.',
    }),
    D({
      id: 'q-iseerc-019',
      topic: 'inference',
      difficulty: 7,
      passage: P_HIST_RAILROAD_SURVEYOR,
      stem: 'It can most reasonably be inferred from the passage that the graduate student of the 1980s used Brandt\'s journals in a way that',
      choices: ['closely resembled the original purpose of the survey.', 'undermined Brandt\'s reputation as a careful observer.', 'recreated the route of the railroad for tourists.', 'extended the journals\' usefulness far beyond their original purpose.'],
      answer: 3,
      explanation: 'The journals were originally engineering field notes, but the student used them to "reconstruct the changing climate" — a use the passage explicitly says Brandt "could not have anticipated." (A) is the opposite of the inference. (B) is unsupported. (D) contradicts the praise of her meticulousness.',
    }),

    // ===== HIST_PRINTING_PRESS — 2 questions =====
    D({
      id: 'q-iseerc-020',
      topic: 'main-idea',
      difficulty: 6,
      passage: P_HIST_PRINTING_PRESS,
      stem: 'Which of the following best states the main idea of the passage?',
      choices: ['The printing revolution was real but unfolded slowly through new conventions.', 'Title pages and indexes were borrowed directly from medieval manuscripts.', 'Manuscripts remained more popular than printed books well into the modern era.', 'The printing press transformed Europe instantly when it was invented.'],
      answer: 0,
      explanation: 'The passage contrasts the popular "all at once" view with the actual gradual change driven by new conventions, calling the revolution "real" but moving "at the pace of habit." (A) and (D) misread the passage. (C) is not supported; manuscripts lost ground over time.',
    }),
    D({
      id: 'q-iseerc-021',
      topic: 'purpose',
      difficulty: 5,
      passage: P_HIST_PRINTING_PRESS,
      stem: 'The author most likely mentions title pages, page numbers, and indexes in order to',
      choices: ['suggest that these features were copied from earlier scrolls.', 'identify innovations that helped print eventually surpass manuscripts.', 'argue that early printers were uncreative imitators of scribes.', 'demonstrate that print was technologically inferior to manuscript.'],
      answer: 1,
      explanation: 'The passage says these were "conventions of their own" that made print "genuinely useful in ways manuscripts could not match." That use of these features is what the author is highlighting. (B), (C), and (D) reverse or contradict the passage.',
    }),

    // ===== SCI_OCTOPUS — 3 questions =====
    D({
      id: 'q-iseerc-022',
      topic: 'detail',
      difficulty: 4,
      passage: P_SCI_OCTOPUS,
      stem: 'According to the passage, approximately what fraction of an octopus\'s neurons are located in its arms?',
      choices: [
        'About one-tenth.',
        'About one-third.',
        'About two-thirds.',
        'Nearly all.',
      ],
      answer: 2,
      explanation: 'The passage states that "Roughly two-thirds of its neurons reside not in the central brain but in the arms themselves." (A), (B), and (D) misstate the proportion.',
    }),
    D({
      id: 'q-iseerc-023',
      topic: 'inference',
      difficulty: 4,
      passage: P_SCI_OCTOPUS,
      stem: 'The passage most strongly suggests that experiments on octopus behavior have been slow to progress because',
      choices: ['researchers are unwilling to study invertebrates.', 'most behavioral methods were developed for animals with centralized brains.', 'octopuses cannot survive in laboratory environments.', 'octopus arms cannot be observed in detail.'],
      answer: 1,
      explanation: 'The passage says octopuses are "awkward subjects for behavioral experiments designed around vertebrate brains, which has slowed scientific understanding." (B) restates this directly. (A), (C), and (D) are unsupported.',
    }),
    D({
      id: 'q-iseerc-024',
      topic: 'vocab-in-context',
      difficulty: 6,
      passage: P_SCI_OCTOPUS,
      stem: 'As used in the passage, the word "decentralized" most nearly means',
      choices: ['unique to a single species.', 'distributed across many locations rather than one.', 'organized around a single central command.', 'damaged.'],
      answer: 1,
      explanation: 'The passage describes neurons spread across the arms, contrasting this with central control — i.e., distributed rather than centralized. (A) is unrelated. (C) is the opposite meaning. (D) confuses uniqueness with anatomy.',
    }),

    // ===== SCI_LICHEN — 2 questions =====
    D({
      id: 'q-iseerc-025',
      topic: 'main-idea',
      difficulty: 5,
      passage: P_SCI_LICHEN,
      stem: 'Which of the following best states the main idea of the passage?',
      choices: ['Fungi cannot survive without sunlight.', 'Lichens are partnerships whose composition is more complex than once thought.', 'Lichens are simple single-celled organisms.', 'Yeasts are the most important organisms in any lichen.'],
      answer: 1,
      explanation: 'The passage opens by defining lichens as partnerships and closes by noting that new genetic studies have "complicated the picture" with a third partner. (A) and (C) contradict the passage. (D) overstates the third partner\'s role, which "remains unclear."',
    }),
    D({
      id: 'q-iseerc-026',
      topic: 'purpose',
      difficulty: 7,
      passage: P_SCI_LICHEN,
      stem: 'The author most likely uses the example of the recently discovered yeast in order to',
      choices: ['suggest that traditional biology is unreliable.', 'demonstrate that yeasts cause disease in lichens.', 'illustrate how new evidence can revise long-settled biological categories.', 'argue that lichens should be reclassified as a single species.'],
      answer: 2,
      explanation: 'The passage notes the discovery "has forced taxonomists to reconsider species long thought to be well understood" — exactly the role of the example. (A) and (D) are not in the passage. (C) overstates the modest, professional revision the passage describes.',
    }),

    // ===== SCI_DARK_SKY — 3 questions =====
    D({
      id: 'q-iseerc-027',
      topic: 'detail',
      difficulty: 5,
      passage: P_SCI_DARK_SKY,
      stem: 'According to the passage, satellites in low orbits affect ground-based astronomy by',
      choices: ['causing satellites to fall into the atmosphere on a regular schedule.', 'blocking radio signals between observatories.', 'reflecting sunlight that appears as bright streaks in long-exposure images.', 'requiring observatories to operate only during the day.'],
      answer: 2,
      explanation: 'The passage says satellites "reflect sunlight back toward Earth and appear in long-exposure images as bright streaks." (A) and (D) are not in the passage. (C) confuses satellite re-entry with the issue under discussion.',
    }),
    D({
      id: 'q-iseerc-028',
      topic: 'tone',
      difficulty: 7,
      passage: P_SCI_DARK_SKY,
      stem: 'The author\'s overall tone in describing the conflict between satellites and astronomy is best described as',
      choices: ['measured and pragmatic.', 'optimistic and dismissive of astronomers\' concerns.', 'nostalgic for an earlier era of stargazing.', 'alarmed and accusatory.'],
      answer: 0,
      explanation: 'The passage acknowledges partial remedies ("Neither remedy is complete"), describes ongoing negotiation, and predicts the tension is "unlikely to vanish." That balanced framing is measured and pragmatic. (A) and (D) overstate the emotion. (C) misreads the author\'s sympathy with astronomers.',
    }),
    D({
      id: 'q-iseerc-029',
      topic: 'inference',
      difficulty: 8,
      passage: P_SCI_DARK_SKY,
      stem: 'It can most reasonably be inferred from the passage that, even with current mitigations, satellite constellations are most likely to interfere with',
      choices: ['communications between adjacent observatories.', 'searches for faint, distant astronomical objects.', 'short-exposure photography of the moon.', 'naked-eye stargazing in well-lit cities.'],
      answer: 1,
      explanation: 'The passage explicitly singles out "searches for faint, distant objects" as the kind of observation expected to grow more affected. (A) misplaces the issue (cities are already light-polluted). (C) is unaffected since short exposures rarely capture satellite streaks of moon imagery. (D) introduces an unmentioned topic.',
    }),

    // ===== SCI_SOIL_FUNGI — 2 questions =====
    D({
      id: 'q-iseerc-030',
      topic: 'detail',
      difficulty: 5,
      passage: P_SCI_SOIL_FUNGI,
      stem: 'According to the passage, what do trees provide to the fungi in their root partnership?',
      choices: ['Minerals collected by the fungal hyphae.', 'Water drawn from deep groundwater.', 'Sugars produced through photosynthesis.', 'Protection from grazing animals.'],
      answer: 2,
      explanation: 'The passage states "The fungi receive sugars the trees produce through photosynthesis." (B) and (C) describe what fungi give to trees, not what trees give to fungi. (D) is not in the passage.',
    }),
    D({
      id: 'q-iseerc-031',
      topic: 'tone',
      difficulty: 8,
      passage: P_SCI_SOIL_FUNGI,
      stem: 'The author\'s attitude toward the claim that forests act as "a single intelligent organism" is best described as',
      choices: ['completely neutral.', 'cautious and qualified.', 'enthusiastically supportive.', 'sharply dismissive.'],
      answer: 1,
      explanation: 'The author notes the findings "remain contested" and warns "against romanticizing the forest." That tempered language is cautious and qualified. (A) overstates support. (C) is too strong; the author still acknowledges that the lonely-competitor view "has become harder to defend." (D) ignores the explicit warning.',
    }),

    // ===== CON_REMOTE_WORK — 3 questions =====
    D({
      id: 'q-iseerc-032',
      topic: 'main-idea',
      difficulty: 6,
      passage: P_CON_REMOTE_WORK,
      stem: 'Which of the following best states the main idea of the passage?',
      choices: ['Most companies have already returned fully to in-person work.', 'Productivity declines uniformly when employees work from home.', 'The long-term effects of remote work are mixed, and the best arrangements are flexible ones.', 'Remote work has been universally praised by managers and employees alike.'],
      answer: 2,
      explanation: 'The passage notes mixed survey and productivity results and concludes that adaptive organizations are succeeding. (B) captures this. (A), (C), and (D) contradict the passage.',
    }),
    D({
      id: 'q-iseerc-033',
      topic: 'vocab-in-context',
      difficulty: 6,
      passage: P_CON_REMOTE_WORK,
      stem: 'As used in the passage, the word "coherent" most nearly means',
      choices: ['profitable.', 'unified or consistent.', 'temporary.', 'silent.'],
      answer: 1,
      explanation: 'A "coherent culture across distance" is one that holds together — unified or consistent. (B), (C), and (D) do not fit a culture being maintained across distance.',
    }),
    D({
      id: 'q-iseerc-034',
      topic: 'inference',
      difficulty: 7,
      passage: P_CON_REMOTE_WORK,
      stem: 'The passage suggests that organizations adapting most successfully to remote work are those that',
      choices: [
        'enforce the same policy on every team.',
        'commit firmly to either fully remote or fully in-person work.',
        'adjust their assumptions as new evidence emerges.',
        'eliminate management oversight entirely.',
      ],
      answer: 2,
      explanation: 'The passage closes with the claim that successful organizations are "willing to revise their assumptions as evidence accumulates." (A) and (B) are essentially the opposite. (D) is not in the passage.',
    }),

    // ===== CON_URBAN_TREES — 3 questions =====
    D({
      id: 'q-iseerc-035',
      topic: 'detail',
      difficulty: 5,
      passage: P_CON_URBAN_TREES,
      stem: 'According to the passage, mature urban trees provide which of the following measurable benefits?',
      choices: [
        'They eliminate the need for storm drains entirely.',
        'They lower nearby surface temperatures during heat waves.',
        'They reduce a city\'s population density.',
        'They prevent the use of road salt in winter.',
      ],
      answer: 1,
      explanation: 'The passage states a mature tree "lower[s] nearby surface temperatures by several degrees during summer heat waves." (A) overstates; trees only reduce strain on drains. (C) and (D) are not in the passage; road salt is a threat to trees, not the reverse.',
    }),
    D({
      id: 'q-iseerc-036',
      topic: 'purpose',
      difficulty: 9,
      passage: P_CON_URBAN_TREES,
      stem: 'The author most likely concludes the passage with the observation that "trees do not vote" in order to',
      choices: ['argue that trees should be granted legal personhood.', 'highlight the political difficulty of funding long-term tree maintenance.', 'suggest that urban trees are inherently nonpartisan.', 'criticize voters who oppose new park construction.'],
      answer: 1,
      explanation: 'The remark connects the long horizon of tree benefits with the short horizon of political careers — explaining why funding maintenance is hard. (A) and (D) are jokes the author does not make. (C) shifts the target unfairly.',
    }),
    D({
      id: 'q-iseerc-037',
      topic: 'inference',
      difficulty: 9,
      passage: P_CON_URBAN_TREES,
      stem: 'The passage most strongly implies that single, well-publicized "tree-planting drives" tend to be',
      choices: ['opposed by the cities that need them most.', 'insufficient on their own without sustained maintenance funding.', 'illegal in most modern jurisdictions.', 'the most cost-effective way to expand urban canopy.'],
      answer: 1,
      explanation: 'The passage explicitly contrasts "single planting drives" with cities that "fund maintenance budgets for decades," implying drives alone are inadequate. (A) reverses the implication. (C) and (D) are not in the passage.',
    }),

    // ===== CON_EDUCATION_ASSESSMENT — 3 questions =====
    D({
      id: 'q-iseerc-038',
      topic: 'main-idea',
      difficulty: 6,
      passage: P_CON_EDUCATION_ASSESSMENT,
      stem: 'Which of the following best states the main idea of the passage?',
      choices: ['Both supporters and critics of standardized testing make valid points, leaving the harder question of what to do.', 'Test scores reliably measure all aspects of student learning.', 'Portfolios are objectively superior to standardized tests.', 'Standardized tests should be eliminated from public education.'],
      answer: 0,
      explanation: 'The passage grants that "Both observations are correct" and frames the harder question as what communities should do. (B) reflects this even-handed framing. (A) and (C) take stronger positions than the passage. (D) is the opposite of what critics say.',
    }),
    D({
      id: 'q-iseerc-039',
      topic: 'purpose',
      difficulty: 8,
      passage: P_CON_EDUCATION_ASSESSMENT,
      stem: 'The author most likely mentions districts that combine test scores with portfolios and observations in order to',
      choices: ['criticize districts unwilling to spend more on assessment.', 'demonstrate that standardized testing has been entirely abandoned.', 'argue that all districts should adopt this approach immediately.', 'illustrate a richer but more expensive alternative whose value communities weigh differently.'],
      answer: 3,
      explanation: 'The passage describes such districts as offering "more informative and considerably more expensive" evaluations whose worth communities decide for themselves. (A) and (C) overstate the author\'s endorsement. (D) is contradicted by the rest of the passage.',
    }),
    D({
      id: 'q-iseerc-040',
      topic: 'vocab-in-context',
      difficulty: 9,
      passage: P_CON_EDUCATION_ASSESSMENT,
      stem: 'As used in the final sentence, the word "permanently" most nearly suggests that communities have',
      choices: ['never seriously considered the question of assessment cost.', 'sometimes reversed their earlier decisions about assessment.', 'reached final agreement on the question of assessment.', 'been forced to keep the same policy without revision.'],
      answer: 1,
      explanation: 'The phrase "not always permanently" implies that some answers have been changed later — i.e., communities have sometimes reversed their decisions. (A) reverses the meaning. (B) ignores the negation. (D) contradicts the rest of the paragraph, which describes active deliberation.',
    }),
  ];

  window.STL_QUESTIONS_ISEE = (window.STL_QUESTIONS_ISEE || []).concat(QS);
})();
