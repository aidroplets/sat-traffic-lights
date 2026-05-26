/**
 * ACT Science — text-described data interpretation. All three
 * standard ACT Science passage types (data representation,
 * research summaries, conflicting viewpoints).
 *
 * testType: 'ACT' (set via DEFAULTS in questions-isee-act.js)
 * section: 'science'
 *
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';

window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  // ============================================================
  // PASSAGE 1 — Data Representation: Boiling points vs. altitude
  // ============================================================
  {
    id: 'q-actsc-001',
    section: 'science',
    topic: 'data-representation',
    difficulty: 17,
    passage: 'A study measured the boiling point of three liquids at varying altitudes. Liquid X boils at 100°C at sea level, 95°C at 1500 m, and 90°C at 3000 m. Liquid Y boils at 78°C at sea level, 74°C at 1500 m, and 70°C at 3000 m. Liquid Z boils at 56°C at sea level, 53°C at 1500 m, and 50°C at 3000 m.',
    stem: 'According to the data, what was the boiling point of Liquid Y at an altitude of 1500 m?',
    choices: ['74°C', '78°C', '70°C', '95°C'],
    answer: 0,
    explanation: 'The passage states directly that Liquid Y boils at 74°C at 1500 m. 70°C is Y at 3000 m, 78°C is Y at sea level, and 95°C is Liquid X at 1500 m.'
  },
  {
    id: 'q-actsc-002',
    section: 'science',
    topic: 'data-representation',
    difficulty: 24,
    passage: 'A study measured the boiling point of three liquids at varying altitudes. Liquid X boils at 100°C at sea level, 95°C at 1500 m, and 90°C at 3000 m. Liquid Y boils at 78°C at sea level, 74°C at 1500 m, and 70°C at 3000 m. Liquid Z boils at 56°C at sea level, 53°C at 1500 m, and 50°C at 3000 m.',
    stem: 'Based on the trends in the data, as altitude increases, the boiling point of each liquid:',
    choices: ['increases for all three liquids.', 'decreases for all three liquids.', 'remains constant for all three liquids.', 'increases for X and Y but decreases for Z.'],
    answer: 1,
    explanation: 'Each liquid shows a lower boiling point at each successive altitude (e.g., X: 100 to 95 to 90). All three decrease.'
  },
  {
    id: 'q-actsc-003',
    section: 'science',
    topic: 'data-representation',
    difficulty: 30,
    passage: 'A study measured the boiling point of three liquids at varying altitudes. Liquid X boils at 100°C at sea level, 95°C at 1500 m, and 90°C at 3000 m. Liquid Y boils at 78°C at sea level, 74°C at 1500 m, and 70°C at 3000 m. Liquid Z boils at 56°C at sea level, 53°C at 1500 m, and 50°C at 3000 m.',
    stem: 'If the trend continued linearly, the predicted boiling point of Liquid X at 4500 m would be closest to:',
    choices: ['92°C', '80°C', '88°C', '85°C'],
    answer: 3,
    explanation: 'Liquid X drops 5°C per 1500 m (100 to 95 to 90). Extrapolating one more interval to 4500 m gives 90 - 5 = 85°C.'
  },

  // ============================================================
  // PASSAGE 2 — Data Representation: Pendulum length vs. period
  // ============================================================
  {
    id: 'q-actsc-004',
    section: 'science',
    topic: 'data-representation',
    difficulty: 19,
    passage: 'Students measured the period (time for one complete swing, in seconds) of a pendulum at five different lengths. At 0.25 m the period was 1.00 s; at 0.50 m it was 1.42 s; at 1.00 m it was 2.00 s; at 1.50 m it was 2.46 s; and at 2.00 m it was 2.84 s. Each trial used the same 50 g brass bob released from a 10° angle.',
    stem: 'According to the data, what was the period of the pendulum at a length of 1.00 m?',
    choices: ['2.00 s', '1.00 s', '1.42 s', '2.46 s'],
    answer: 0,
    explanation: 'The passage states the period at 1.00 m was 2.00 s. 1.00 s is the period at 0.25 m.'
  },
  {
    id: 'q-actsc-005',
    section: 'science',
    topic: 'data-representation',
    difficulty: 26,
    passage: 'Students measured the period (time for one complete swing, in seconds) of a pendulum at five different lengths. At 0.25 m the period was 1.00 s; at 0.50 m it was 1.42 s; at 1.00 m it was 2.00 s; at 1.50 m it was 2.46 s; and at 2.00 m it was 2.84 s. Each trial used the same 50 g brass bob released from a 10° angle.',
    stem: 'A student claims that doubling the length of the pendulum doubles the period. The data:',
    choices: ['support this claim, since 0.25 m gave 1.00 s and 0.50 m gave 2.00 s.', 'support this claim, since 1.00 m gave 2.00 s and 2.00 m gave 4.00 s.', 'do not support this claim, because increasing length decreased the period.', 'do not support this claim, because doubling the length from 0.25 m to 0.50 m only increased the period from 1.00 s to 1.42 s.'],
    answer: 3,
    explanation: 'When length doubled from 0.25 to 0.50 m, the period rose from 1.00 to 1.42 s — not double. The claim is unsupported. Period did increase, ruling out option D.'
  },

  // ============================================================
  // PASSAGE 3 — Data Representation: Solubility vs. temperature
  // ============================================================
  {
    id: 'q-actsc-006',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 29,
    passage: 'Experiment 1: A chemist dissolved Salt A in 100 g of water at four temperatures and recorded grams dissolved at saturation: 14 g at 0°C, 32 g at 25°C, 64 g at 50°C, and 110 g at 75°C. Experiment 2: The same procedure was repeated with Salt B; values were 35 g at 0°C, 36 g at 25°C, 37 g at 50°C, and 38 g at 75°C. Experiment 3: The same procedure was repeated with Salt C; values were 180 g at 0°C, 130 g at 25°C, 95 g at 50°C, and 60 g at 75°C.',
    stem: 'Suppose 50 g of Salt A and 50 g of Salt C are each placed (separately) in 100 g of water at 25°C and stirred until no more dissolves. Based on Experiments 1 and 3, which statement is best supported?',
    choices: ['All of Salt A dissolves; only about 14 g of Salt C dissolves.', 'All of Salt C dissolves; only about 32 g of Salt A dissolves and the rest stays as solid.', 'All 50 g of both salts dissolves completely.', 'Neither salt dissolves at all at 25°C.'],
    answer: 1,
    explanation: 'At 25°C, Experiment 1 gives Salt A\'s solubility as 32 g per 100 g water — so only ~32 g of the 50 g sample dissolves. Experiment 3 gives Salt C as 130 g per 100 g water at 25°C, so all 50 g of Salt C dissolves easily. Option C swaps the salts; option A ignores Salt A\'s limit; option D contradicts both data points.'
  },
  {
    id: 'q-actsc-007',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 27,
    passage: 'Experiment 1: A chemist dissolved Salt A in 100 g of water at four temperatures and recorded grams dissolved at saturation: 14 g at 0°C, 32 g at 25°C, 64 g at 50°C, and 110 g at 75°C. Experiment 2: The same procedure was repeated with Salt B; values were 35 g at 0°C, 36 g at 25°C, 37 g at 50°C, and 38 g at 75°C. Experiment 3: The same procedure was repeated with Salt C; values were 180 g at 0°C, 130 g at 25°C, 95 g at 50°C, and 60 g at 75°C.',
    stem: 'Which statement best describes how solubility changes with temperature across the three experiments?',
    choices: ['All three salts become less soluble as temperature rises.', 'All three salts become more soluble as temperature rises.', 'Salts A and B become more soluble while Salt C becomes less soluble as temperature rises.', 'Salt A becomes less soluble while Salts B and C become more soluble as temperature rises.'],
    answer: 2,
    explanation: 'A rises (14 to 110), B rises slightly (35 to 38), C falls (180 to 60). Only option C captures all three trends correctly.'
  },
  {
    id: 'q-actsc-008',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 31,
    passage: 'Experiment 1: A chemist dissolved Salt A in 100 g of water at four temperatures and recorded grams dissolved at saturation: 14 g at 0°C, 32 g at 25°C, 64 g at 50°C, and 110 g at 75°C. Experiment 2: The same procedure was repeated with Salt B; values were 35 g at 0°C, 36 g at 25°C, 37 g at 50°C, and 38 g at 75°C. Experiment 3: The same procedure was repeated with Salt C; values were 180 g at 0°C, 130 g at 25°C, 95 g at 50°C, and 60 g at 75°C.',
    stem: 'Based on the data from Experiments 1 and 3, at approximately what temperature would Salt A and Salt C have the same solubility?',
    choices: ['Above 75°C', 'Below 0°C', 'Between 25°C and 50°C', 'Between 50°C and 75°C'],
    answer: 3,
    explanation: 'At 50°C, A = 64 and C = 95 (C still higher). At 75°C, A = 110 and C = 60 (A higher). They cross between 50°C and 75°C.'
  },

  // ============================================================
  // PASSAGE 4 — Data Representation: Population over years
  // ============================================================
  {
    id: 'q-actsc-009',
    section: 'science',
    topic: 'data-representation',
    difficulty: 18,
    passage: 'Researchers tracked the population of a deer herd in a national park from 2010 to 2022. The herd numbered 320 in 2010, 410 in 2013, 540 in 2016, 470 in 2019, and 380 in 2022. A wolf reintroduction program began in the park in 2017.',
    stem: 'In which year was the deer population the highest?',
    choices: ['2022', '2013', '2010', '2016'],
    answer: 3,
    explanation: 'The 2016 count of 540 is the largest value listed. 2010 = 320, 2013 = 410, 2022 = 380.'
  },
  {
    id: 'q-actsc-010',
    section: 'science',
    topic: 'data-representation',
    difficulty: 28,
    passage: 'Researchers tracked the population of a deer herd in a national park from 2010 to 2022. The herd numbered 320 in 2010, 410 in 2013, 540 in 2016, 470 in 2019, and 380 in 2022. A wolf reintroduction program began in the park in 2017.',
    stem: 'Which observation is most consistent with the hypothesis that wolf reintroduction reduced the deer population?',
    choices: ['Deer numbers were highest in 2022.', 'Deer numbers rose every year before 2010.', 'Deer numbers fell continuously from 2010 to 2022.', 'Deer numbers rose from 2010 to 2016 but fell from 2016 onward, after wolves were reintroduced in 2017.'],
    answer: 3,
    explanation: 'The data show growth before wolves (320 to 540) and decline after the 2017 reintroduction (540 to 470 to 380), which fits the hypothesis. Other options misread the trend.'
  },

  // ============================================================
  // PASSAGE 5 — Data Representation: Reaction rate vs. concentration
  // ============================================================
  {
    id: 'q-actsc-011',
    section: 'science',
    topic: 'data-representation',
    difficulty: 23,
    passage: 'A chemist measured the initial reaction rate (in mol/L/s) of a reaction at five concentrations of reactant Q, with all other conditions held constant. At 0.10 M, the rate was 0.02 mol/L/s. At 0.20 M, 0.08 mol/L/s. At 0.30 M, 0.18 mol/L/s. At 0.40 M, 0.32 mol/L/s. At 0.50 M, 0.50 mol/L/s.',
    stem: 'According to the data, when the concentration of Q doubled from 0.10 M to 0.20 M, the reaction rate:',
    choices: ['tripled.', 'quadrupled.', 'remained the same.', 'doubled.'],
    answer: 1,
    explanation: 'The rate went from 0.02 to 0.08 mol/L/s — a fourfold increase, not 2x or 3x.'
  },
  {
    id: 'q-actsc-012',
    section: 'science',
    topic: 'data-representation',
    difficulty: 33,
    passage: 'A chemist measured the initial reaction rate (in mol/L/s) of a reaction at five concentrations of reactant Q, with all other conditions held constant. At 0.10 M, the rate was 0.02 mol/L/s. At 0.20 M, 0.08 mol/L/s. At 0.30 M, 0.18 mol/L/s. At 0.40 M, 0.32 mol/L/s. At 0.50 M, 0.50 mol/L/s.',
    stem: 'Which mathematical relationship between rate (R) and concentration ([Q]) is most consistent with the data?',
    choices: ['R is proportional to [Q] squared.', 'R is proportional to [Q].', 'R is proportional to the square root of [Q].', 'R is independent of [Q].'],
    answer: 0,
    explanation: 'Dividing rate by concentration squared gives a constant: 0.02/0.01 = 2; 0.08/0.04 = 2; 0.18/0.09 = 2; 0.32/0.16 = 2; 0.50/0.25 = 2. So R = 2[Q]^2.'
  },

  // ============================================================
  // PASSAGE 6 — Data Representation: Soil moisture by depth
  // ============================================================
  {
    id: 'q-actsc-013',
    section: 'science',
    topic: 'data-representation',
    difficulty: 20,
    passage: 'Soil moisture (% by mass) was measured at four depths in three plots. Plot 1 (sandy): 8% at 10 cm, 6% at 30 cm, 5% at 60 cm, 4% at 100 cm. Plot 2 (loam): 22% at 10 cm, 24% at 30 cm, 25% at 60 cm, 26% at 100 cm. Plot 3 (clay): 35% at 10 cm, 38% at 30 cm, 41% at 60 cm, 44% at 100 cm.',
    stem: 'In which plot did soil moisture decrease as depth increased?',
    choices: ['Plot 3 only', 'Plot 1 only', 'Plot 2 only', 'Plots 2 and 3'],
    answer: 1,
    explanation: 'Plot 1 falls from 8% to 4% as depth increases. Plots 2 and 3 both rise (22 to 26 and 35 to 44).'
  },
  {
    id: 'q-actsc-014',
    section: 'science',
    topic: 'data-representation',
    difficulty: 25,
    passage: 'Soil moisture (% by mass) was measured at four depths in three plots. Plot 1 (sandy): 8% at 10 cm, 6% at 30 cm, 5% at 60 cm, 4% at 100 cm. Plot 2 (loam): 22% at 10 cm, 24% at 30 cm, 25% at 60 cm, 26% at 100 cm. Plot 3 (clay): 35% at 10 cm, 38% at 30 cm, 41% at 60 cm, 44% at 100 cm.',
    stem: 'At a depth of 60 cm, the soil moisture in Plot 3 is approximately how many times that in Plot 1?',
    choices: ['8 times', '6 times', '4 times', '2 times'],
    answer: 0,
    explanation: 'At 60 cm: Plot 3 = 41%, Plot 1 = 5%. 41/5 ≈ 8.2 — closest to 8 times.'
  },

  // ============================================================
  // PASSAGE 7 — Data Representation: Spring stretch
  // ============================================================
  {
    id: 'q-actsc-015',
    section: 'science',
    topic: 'data-representation',
    difficulty: 22,
    passage: 'A student hung masses from two springs and measured the stretch (in cm). Spring 1: 2 cm at 100 g, 4 cm at 200 g, 6 cm at 300 g, 8 cm at 400 g. Spring 2: 1 cm at 100 g, 2 cm at 200 g, 3 cm at 300 g, 4 cm at 400 g.',
    stem: 'Based on the data, which statement best compares the two springs?',
    choices: ['Spring 1 stretches more at low masses but less at high masses.', 'The two springs stretch the same amount at every mass tested.', 'Spring 2 stretches twice as much as Spring 1 at every mass tested.', 'Spring 1 stretches twice as much as Spring 2 at every mass tested.'],
    answer: 3,
    explanation: 'At every mass listed, Spring 1\'s stretch is exactly double Spring 2\'s (2 vs 1, 4 vs 2, 6 vs 3, 8 vs 4).'
  },
  {
    id: 'q-actsc-016',
    section: 'science',
    topic: 'data-representation',
    difficulty: 29,
    passage: 'A student hung masses from two springs and measured the stretch (in cm). Spring 1: 2 cm at 100 g, 4 cm at 200 g, 6 cm at 300 g, 8 cm at 400 g. Spring 2: 1 cm at 100 g, 2 cm at 200 g, 3 cm at 300 g, 4 cm at 400 g.',
    stem: 'Based on the trend, what stretch would be predicted for Spring 1 at a mass of 550 g, assuming the spring is not damaged?',
    choices: ['9 cm', '10 cm', '11 cm', '12 cm'],
    answer: 2,
    explanation: 'Spring 1 stretches 2 cm per 100 g, so at 550 g it would stretch 5.5 × 2 = 11 cm.'
  },

  // ============================================================
  // PASSAGE 8 — Research Summaries: Bacterial growth
  // ============================================================
  {
    id: 'q-actsc-017',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 19,
    passage: 'Experiment 1: Three samples of E. coli were grown on identical agar plates at 25°C, 30°C, and 37°C. After 24 hours, colonies were counted: 12, 45, and 89 respectively. Experiment 2: Fresh 37°C samples were re-grown on plates buffered to pH 5, pH 7, and pH 9. Colony counts after 24 hours were 23, 89, and 14 respectively. Experiment 3: The pH 7 sample was grown for varying times; counts were 12 at 6 h, 38 at 12 h, 89 at 24 h, and 142 at 48 h.',
    stem: 'In Experiment 1, the colony count was greatest at which temperature?',
    choices: ['30°C', '37°C', '25°C', 'The counts were equal at all three temperatures.'],
    answer: 1,
    explanation: 'Experiment 1 reports 89 colonies at 37°C, the highest of the three values (12, 45, 89).'
  },
  {
    id: 'q-actsc-018',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 26,
    passage: 'Experiment 1: Three samples of E. coli were grown on identical agar plates at 25°C, 30°C, and 37°C. After 24 hours, colonies were counted: 12, 45, and 89 respectively. Experiment 2: Fresh 37°C samples were re-grown on plates buffered to pH 5, pH 7, and pH 9. Colony counts after 24 hours were 23, 89, and 14 respectively. Experiment 3: The pH 7 sample was grown for varying times; counts were 12 at 6 h, 38 at 12 h, 89 at 24 h, and 142 at 48 h.',
    stem: 'Why was 37°C selected as the temperature for Experiment 2?',
    choices: ['It is required by all bacteria to grow.', 'It produced the highest colony count in Experiment 1.', 'It produced the lowest colony count in Experiment 1.', 'It was randomly chosen.'],
    answer: 1,
    explanation: 'Experiment 1 identified 37°C as the temperature giving the most growth (89 colonies). Researchers held that optimum constant to isolate the pH variable.'
  },
  {
    id: 'q-actsc-019',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 30,
    passage: 'Scientist 1 argues that the mass extinction at the Cretaceous-Paleogene (K-Pg) boundary 66 million years ago was caused primarily by an asteroid impact, citing the iridium-rich clay layer found globally and the 180 km Chicxulub crater dated to that time. Scientist 1 says dust and aerosols from the impact blocked sunlight for years, collapsing food webs. Scientist 2 argues that intense volcanic activity in the Deccan Traps was the primary cause. The eruptions began roughly 250,000 years before the impact and produced enormous amounts of sulfur and CO2, altering climate for tens of thousands of years. Scientist 2 considers the asteroid a final blow to ecosystems already in decline.',
    stem: 'Which of the following pieces of evidence is cited only by Scientist 1?',
    choices: ['Eruptions occurring 250,000 years before the boundary.', 'Sulfur and CO2 emissions altering climate.', 'The 180 km Chicxulub crater dated to the K-Pg boundary.', 'Ecosystems already in decline before the boundary.'],
    answer: 2,
    explanation: 'Scientist 1 names the iridium layer and the Chicxulub crater as evidence. The other three items are all from Scientist 2\'s case for the Deccan Traps.'
  },

  // ============================================================
  // PASSAGE 9 — Research Summaries: Plant growth and light
  // ============================================================
  {
    id: 'q-actsc-020',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 21,
    passage: 'Experiment 1: Bean seedlings were grown for 14 days under red, blue, green, or white light at equal intensity. Average heights (cm): red 18, blue 14, green 6, white 16. Experiment 2: New seedlings were grown under white light for 14 days at four intensities (in lux): 500, 1000, 2000, 4000. Heights: 9, 16, 22, 23. Experiment 3: Seedlings grown in red light for 14 days were transferred to darkness for 7 more days; final heights averaged 24 cm, but stems were thin and pale.',
    stem: 'In Experiment 1, the seedlings grew tallest under which color of light?',
    choices: ['Green', 'Red', 'Blue', 'White'],
    answer: 1,
    explanation: 'Experiment 1 lists 18 cm under red light — the largest of the four heights (18, 14, 6, 16).'
  },
  {
    id: 'q-actsc-021',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 27,
    passage: 'Experiment 1: Bean seedlings were grown for 14 days under red, blue, green, or white light at equal intensity. Average heights (cm): red 18, blue 14, green 6, white 16. Experiment 2: New seedlings were grown under white light for 14 days at four intensities (in lux): 500, 1000, 2000, 4000. Heights: 9, 16, 22, 23. Experiment 3: Seedlings grown in red light for 14 days were transferred to darkness for 7 more days; final heights averaged 24 cm, but stems were thin and pale.',
    stem: 'Which result from Experiment 2 suggests that increasing light intensity yields diminishing returns in height?',
    choices: ['Height rose from 9 to 16 cm when intensity doubled from 500 to 1000 lux.', 'Height rose from 16 to 22 cm when intensity doubled from 1000 to 2000 lux.', 'Height rose only from 22 to 23 cm when intensity doubled from 2000 to 4000 lux.', 'Height was greatest at 4000 lux.'],
    answer: 2,
    explanation: 'The smallest height increase came from the largest intensity jump (2000 to 4000 lux added only 1 cm), classic diminishing returns. The other choices ignore that comparison.'
  },
  {
    id: 'q-actsc-022',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 32,
    passage: 'Experiment 1: Bean seedlings were grown for 14 days under red, blue, green, or white light at equal intensity. Average heights (cm): red 18, blue 14, green 6, white 16. Experiment 2: New seedlings were grown under white light for 14 days at four intensities (in lux): 500, 1000, 2000, 4000. Heights: 9, 16, 22, 23. Experiment 3: Seedlings grown in red light for 14 days were transferred to darkness for 7 more days; final heights averaged 24 cm, but stems were thin and pale.',
    stem: 'A reviewer argues that height alone is a poor measure of plant health. Which result from Experiment 3 best supports that argument?',
    choices: ['Plants grew at all in darkness.', 'Plants reached 24 cm despite being thin and pale.', 'Plants started in red light.', 'Plants were grown for a total of 21 days.'],
    answer: 1,
    explanation: 'Experiment 3 explicitly notes that 24 cm plants were thin and pale — taller than any in Experiment 1 yet visibly unhealthy, undermining height-as-health.'
  },

  // ============================================================
  // PASSAGE 10 — Research Summaries: Fertilizer
  // ============================================================
  {
    id: 'q-actsc-023',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 23,
    passage: 'Experiment 1: Tomato plants were grown with 0, 5, 10, 20, or 40 g of fertilizer per plant. After 8 weeks, average fruit yield (kg) was 1.1, 1.8, 2.6, 3.0, and 1.4 respectively. Experiment 2: The 20 g treatment was repeated using three fertilizer brands (A, B, C) on otherwise identical plants. Yields were 3.0 (A), 2.8 (B), and 3.1 (C) kg.',
    stem: 'Which amount of fertilizer in Experiment 1 gave the highest yield?',
    choices: ['20 g', '40 g', '0 g', '10 g'],
    answer: 0,
    explanation: 'Yields were 1.1, 1.8, 2.6, 3.0, and 1.4 kg. The maximum (3.0 kg) occurred at 20 g.'
  },
  {
    id: 'q-actsc-024',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 29,
    passage: 'Experiment 1: Tomato plants were grown with 0, 5, 10, 20, or 40 g of fertilizer per plant. After 8 weeks, average fruit yield (kg) was 1.1, 1.8, 2.6, 3.0, and 1.4 respectively. Experiment 2: The 20 g treatment was repeated using three fertilizer brands (A, B, C) on otherwise identical plants. Yields were 3.0 (A), 2.8 (B), and 3.1 (C) kg.',
    stem: 'Which conclusion is best supported by both experiments together?',
    choices: ['Yield always increases with fertilizer amount.', 'Yield is unaffected by fertilizer amount or brand.', 'Yield increases with fertilizer amount up to a point and then declines, and brand has only a small effect at 20 g.', 'Brand C is consistently better than Brand A at all fertilizer levels.'],
    answer: 2,
    explanation: 'Experiment 1 shows yield rising then dropping (3.0 to 1.4 kg from 20 g to 40 g). Experiment 2 shows brands cluster within 0.3 kg at 20 g — small brand effect. Other options ignore the decline at 40 g or the small brand spread.'
  },

  // ============================================================
  // PASSAGE 11 — Research Summaries: Friction
  // ============================================================
  {
    id: 'q-actsc-025',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 25,
    passage: 'Experiment 1: A 2 kg wooden block was pulled across four surfaces. The minimum force (N) needed to start it sliding was: glass 4.0, polished wood 6.0, cardboard 9.0, sandpaper 14.0. Experiment 2: The cardboard surface was retested using blocks of 1, 2, 3, and 4 kg. Forces required were 4.5, 9.0, 13.5, and 18.0 N. Experiment 3: A thin film of oil was added between the 2 kg block and each surface from Experiment 1; required forces became 1.0, 1.5, 2.0, and 3.5 N.',
    stem: 'Based on Experiment 2, the relationship between block mass and force needed to start sliding is best described as:',
    choices: ['unrelated.', 'proportional to mass squared.', 'directly proportional.', 'inversely proportional.'],
    answer: 2,
    explanation: 'Force divided by mass is constant: 4.5/1 = 9.0/2 = 13.5/3 = 18.0/4 = 4.5 N/kg. That is direct proportionality.'
  },
  {
    id: 'q-actsc-026',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 31,
    passage: 'Experiment 1: A 2 kg wooden block was pulled across four surfaces. The minimum force (N) needed to start it sliding was: glass 4.0, polished wood 6.0, cardboard 9.0, sandpaper 14.0. Experiment 2: The cardboard surface was retested using blocks of 1, 2, 3, and 4 kg. Forces required were 4.5, 9.0, 13.5, and 18.0 N. Experiment 3: A thin film of oil was added between the 2 kg block and each surface from Experiment 1; required forces became 1.0, 1.5, 2.0, and 3.5 N.',
    stem: 'Comparing Experiments 1 and 3, on which surface did adding oil reduce the required force by the largest absolute amount?',
    choices: ['Cardboard', 'Polished wood', 'Sandpaper', 'Glass'],
    answer: 2,
    explanation: 'Reductions were: glass 4.0 to 1.0 = 3.0 N; polished wood 6.0 to 1.5 = 4.5 N; cardboard 9.0 to 2.0 = 7.0 N; sandpaper 14.0 to 3.5 = 10.5 N. Sandpaper drops most.'
  },

  // ============================================================
  // PASSAGE 12 — Research Summaries: Catalyst
  // ============================================================
  {
    id: 'q-actsc-027',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 24,
    passage: 'Experiment 1: Equal volumes of hydrogen peroxide were placed in three flasks. Flask A had no additive, Flask B had 1 g of crushed catalyst, Flask C had 1 g of intact catalyst (a single piece). Time to release 50 mL of oxygen gas: A 600 s, B 25 s, C 95 s. Experiment 2: Flask B was rerun at 10°C, 25°C, and 40°C. Times to release 50 mL of oxygen: 60 s, 25 s, 10 s.',
    stem: 'Which observation from Experiment 1 best shows that surface area affects reaction rate?',
    choices: ['Flask C reacted faster than Flask A.', 'All three flasks released the same amount of oxygen.', 'Flask B (crushed catalyst) reacted faster than Flask C (intact catalyst).', 'Flask A took 600 s with no catalyst.'],
    answer: 2,
    explanation: 'Both flasks B and C used 1 g of the same catalyst — the only difference is surface area (crushed vs. intact). B (25 s) is faster than C (95 s), isolating surface area as the cause.'
  },
  {
    id: 'q-actsc-028',
    section: 'science',
    topic: 'research-summaries',
    difficulty: 35,
    passage: 'Experiment 1: Equal volumes of hydrogen peroxide were placed in three flasks. Flask A had no additive, Flask B had 1 g of crushed catalyst, Flask C had 1 g of intact catalyst (a single piece). Time to release 50 mL of oxygen gas: A 600 s, B 25 s, C 95 s. Experiment 2: Flask B was rerun at 10°C, 25°C, and 40°C. Time to release 50 mL of oxygen: 60 s, 25 s, 10 s.',
    stem: 'A new trial uses 1 g of intact catalyst at 40°C. Based on the data, the time to release 50 mL of oxygen would most likely be:',
    choices: ['exactly 60 s, matching Flask B at 10°C.', 'greater than 600 s, because the intact catalyst is slow.', 'between 10 s and 95 s, because the intact form is slower than crushed but higher temperature is faster than 25°C.', 'less than 10 s, because both higher temperature and intact form speed the reaction.'],
    answer: 2,
    explanation: 'Crushed at 40°C took 10 s; intact at 25°C took 95 s. Switching to intact slows the reaction, but warming to 40°C speeds it. The result should fall between the two extremes (10–95 s), not exceed 600 s.'
  },

  // ============================================================
  // PASSAGE 13 — Conflicting Viewpoints: K-Pg extinction
  // ============================================================
  {
    id: 'q-actsc-029',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 22,
    passage: 'Scientist 1 argues that the mass extinction at the Cretaceous-Paleogene (K-Pg) boundary 66 million years ago was caused primarily by an asteroid impact, citing the iridium-rich clay layer found globally and the 180 km Chicxulub crater dated to that time. Scientist 1 says dust and aerosols from the impact blocked sunlight for years, collapsing food webs. Scientist 2 argues that intense volcanic activity in the Deccan Traps was the primary cause. The eruptions began roughly 250,000 years before the impact and produced enormous amounts of sulfur and CO2, altering climate for tens of thousands of years. Scientist 2 considers the asteroid a final blow to ecosystems already in decline.',
    stem: 'According to Scientist 1, the iridium-rich clay layer found globally is best explained by:',
    choices: ['volcanic ash from the Deccan Traps.', 'natural radioactive decay over millions of years.', 'deep-sea sediments rising onto continents.', 'fallout from a large asteroid impact.'],
    answer: 3,
    explanation: 'Scientist 1 cites the iridium layer as evidence of an asteroid impact. The other options are not mentioned by either scientist.'
  },
  {
    id: 'q-actsc-030',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 27,
    passage: 'Scientist 1 argues that the mass extinction at the Cretaceous-Paleogene (K-Pg) boundary 66 million years ago was caused primarily by an asteroid impact, citing the iridium-rich clay layer found globally and the 180 km Chicxulub crater dated to that time. Scientist 1 says dust and aerosols from the impact blocked sunlight for years, collapsing food webs. Scientist 2 argues that intense volcanic activity in the Deccan Traps was the primary cause. The eruptions began roughly 250,000 years before the impact and produced enormous amounts of sulfur and CO2, altering climate for tens of thousands of years. Scientist 2 considers the asteroid a final blow to ecosystems already in decline.',
    stem: 'Both scientists would agree that:',
    choices: ['the asteroid impact had no environmental effect.', 'the Deccan Traps eruptions had no environmental effect.', 'volcanic activity was the only cause of the extinction.', 'the asteroid impact occurred and contributed in some way to the extinction.'],
    answer: 3,
    explanation: 'Scientist 1 makes the impact the main cause, and Scientist 2 calls it a "final blow" to declining ecosystems — both accept the impact occurred and contributed. The other options each contradict at least one scientist.'
  },
  {
    id: 'q-actsc-031',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 33,
    passage: 'Scientist 1 argues that the mass extinction at the Cretaceous-Paleogene (K-Pg) boundary 66 million years ago was caused primarily by an asteroid impact, citing the iridium-rich clay layer found globally and the 180 km Chicxulub crater dated to that time. Scientist 1 says dust and aerosols from the impact blocked sunlight for years, collapsing food webs. Scientist 2 argues that intense volcanic activity in the Deccan Traps was the primary cause. The eruptions began roughly 250,000 years before the impact and produced enormous amounts of sulfur and CO2, altering climate for tens of thousands of years. Scientist 2 considers the asteroid a final blow to ecosystems already in decline.',
    stem: 'New evidence shows that many marine species were already in steep decline 100,000 years before the K-Pg boundary. This finding would most weaken the position of:',
    choices: ['Scientist 1, because it suggests another cause was already at work before the impact.', 'both scientists equally.', 'neither scientist.', 'Scientist 2, because the Deccan Traps had not yet erupted.'],
    answer: 0,
    explanation: 'Scientist 1 attributes the extinction primarily to the sudden impact. Pre-impact decline points to a slower driver — exactly the kind Scientist 2 proposes (the Deccan Traps, which began ~250,000 years earlier). It weakens Scientist 1, not Scientist 2.'
  },

  // ============================================================
  // PASSAGE 14 — Conflicting Viewpoints: Universe expansion
  // ============================================================
  {
    id: 'q-actsc-032',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 26,
    passage: 'Hypothesis A holds that the expansion of the universe is slowing over time because the gravitational pull of all matter eventually dominates. Under this view, distant supernovae should appear brighter than expected if expansion has been decelerating, because they are closer than a constant-rate model predicts. Hypothesis B holds that the expansion is accelerating, driven by a repulsive "dark energy" that becomes more important at large scales. Under this view, distant supernovae should appear fainter than a constant-rate model predicts because they are farther away than expected.',
    stem: 'According to Hypothesis B, distant supernovae should appear:',
    choices: ['fainter than a constant-rate model predicts.', 'invisible to current telescopes.', 'brighter than a constant-rate model predicts.', 'exactly as bright as a constant-rate model predicts.'],
    answer: 0,
    explanation: 'Hypothesis B explicitly predicts that supernovae appear fainter than a constant-rate model expects, because acceleration places them farther away.'
  },
  {
    id: 'q-actsc-033',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 30,
    passage: 'Hypothesis A holds that the expansion of the universe is slowing over time because the gravitational pull of all matter eventually dominates. Under this view, distant supernovae should appear brighter than expected if expansion has been decelerating, because they are closer than a constant-rate model predicts. Hypothesis B holds that the expansion is accelerating, driven by a repulsive "dark energy" that becomes more important at large scales. Under this view, distant supernovae should appear fainter than a constant-rate model predicts because they are farther away than expected.',
    stem: 'Astronomers find that distant Type Ia supernovae are systematically dimmer than a constant-rate model predicts. This finding:',
    choices: ['supports both hypotheses equally.', 'supports Hypothesis A and weakens Hypothesis B.', 'is consistent with neither hypothesis.', 'supports Hypothesis B and weakens Hypothesis A.'],
    answer: 3,
    explanation: 'A predicts brighter; B predicts fainter. Observed dimming matches B and contradicts A.'
  },
  {
    id: 'q-actsc-034',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 36,
    passage: 'Hypothesis A holds that the expansion of the universe is slowing over time because the gravitational pull of all matter eventually dominates. Under this view, distant supernovae should appear brighter than expected if expansion has been decelerating, because they are closer than a constant-rate model predicts. Hypothesis B holds that the expansion is accelerating, driven by a repulsive "dark energy" that becomes more important at large scales. Under this view, distant supernovae should appear fainter than a constant-rate model predicts because they are farther away than expected.',
    stem: 'A defender of Hypothesis A claims the dimming is caused by dust between us and the supernovae, not by an accelerating expansion. Which additional finding would most weaken that defense?',
    choices: ['Some nearby supernovae are also dimmer than expected.', 'Dust has been detected in our own galaxy.', 'Spectra of the supernovae show the same color shifts predicted with no dust present.', 'Supernovae are difficult to observe.'],
    answer: 2,
    explanation: 'Intervening dust would redden the spectra (preferentially absorb blue light). Spectra showing the predicted dust-free colors rules out dust as the cause, leaving acceleration. The other choices either support the dust idea or are irrelevant.'
  },

  // ============================================================
  // PASSAGE 15 — Conflicting Viewpoints: Bird flight evolution
  // ============================================================
  {
    id: 'q-actsc-035',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 24,
    passage: 'Student 1 argues that bird flight evolved from the ground up: small two-legged dinosaurs ran fast, flapped feathered forelimbs for added thrust and balance, and gradually achieved powered flight. As evidence, Student 1 notes that some living birds (such as roadrunners) use partial wing flapping while running. Student 2 argues that flight evolved from the trees down: small feathered dinosaurs climbed trees and leapt between branches, gliding on feathered limbs before evolving full powered flight. Student 2 cites fossils of small feathered species with claws suited to climbing and limb proportions matching modern gliding animals.',
    stem: 'Which observation, if true, would most directly support Student 1\'s ground-up hypothesis?',
    choices: ['A new fossil shows a fast-running dinosaur using flapping motions to maintain balance and increase speed.', 'A new fossil shows a flightless bird similar to an ostrich.', 'A new fossil shows a feathered dinosaur with specialized climbing claws.', 'A new fossil shows wing feathers shaped exactly like a modern eagle\'s.'],
    answer: 0,
    explanation: 'Student 1\'s key claim is that running with flapping forelimbs aided flight evolution. A fossil showing exactly that behavior directly supports the hypothesis. Climbing-claw fossils support Student 2; ostrich-like fossils don\'t address either origin.'
  },
  {
    id: 'q-actsc-036',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 28,
    passage: 'Student 1 argues that bird flight evolved from the ground up: small two-legged dinosaurs ran fast, flapped feathered forelimbs for added thrust and balance, and gradually achieved powered flight. As evidence, Student 1 notes that some living birds (such as roadrunners) use partial wing flapping while running. Student 2 argues that flight evolved from the trees down: small feathered dinosaurs climbed trees and leapt between branches, gliding on feathered limbs before evolving full powered flight. Student 2 cites fossils of small feathered species with claws suited to climbing and limb proportions matching modern gliding animals.',
    stem: 'Both students would most likely agree that:',
    choices: ['tree-climbing was the only path to flight.', 'flapping while running was the only path to flight.', 'feathered dinosaurs existed before fully powered flight evolved.', 'feathers evolved only after flight was already possible.'],
    answer: 2,
    explanation: 'Both hypotheses describe feathered dinosaurs as ancestors that did not yet have full powered flight (Student 1\'s flappers, Student 2\'s gliders). The other options each match only one hypothesis or contradict both.'
  },
  {
    id: 'q-actsc-037',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 34,
    passage: 'Student 1 argues that bird flight evolved from the ground up: small two-legged dinosaurs ran fast, flapped feathered forelimbs for added thrust and balance, and gradually achieved powered flight. As evidence, Student 1 notes that some living birds (such as roadrunners) use partial wing flapping while running. Student 2 argues that flight evolved from the trees down: small feathered dinosaurs climbed trees and leapt between branches, gliding on feathered limbs before evolving full powered flight. Student 2 cites fossils of small feathered species with claws suited to climbing and limb proportions matching modern gliding animals.',
    stem: 'A reviewer notes that Student 1\'s use of modern roadrunners is a weaker form of evidence than Student 2\'s use of fossils. The reviewer\'s reasoning is most likely that:',
    choices: ['modern animals can show that a behavior is possible but cannot prove it occurred in extinct ancestors, while fossils provide direct evidence from the past.', 'roadrunners do not actually flap their wings.', 'roadrunners are not birds.', 'fossils are always perfectly preserved.'],
    answer: 0,
    explanation: 'A behavior in a modern animal shows feasibility, not history. Fossils give direct (if incomplete) evidence about extinct species. The other options are factually wrong (roadrunners are birds and do flap; fossils are often poorly preserved).'
  },

  // ============================================================
  // PASSAGE 16 — Data Representation: Pressure vs. depth (ocean)
  // ============================================================
  {
    id: 'q-actsc-038',
    section: 'science',
    topic: 'data-representation',
    difficulty: 35,
    passage: 'Pressure (in atmospheres, atm) was recorded at five ocean depths during a research dive. At the surface (0 m) the pressure was 1.0 atm. At 50 m it was 6.0 atm. At 100 m it was 11.0 atm. At 200 m it was 21.0 atm. At 500 m it was 51.0 atm.',
    stem: 'A sealed flexible balloon containing 1.0 L of air is taken from the surface to 100 m. Assuming temperature is constant and volume is inversely proportional to pressure, the new volume of the balloon is closest to:',
    choices: ['11.0 L', '0.55 L', '0.05 L', '0.09 L'],
    answer: 3,
    explanation: 'Pressure rises from 1.0 atm at the surface to 11.0 atm at 100 m — an 11x increase. Inverse proportionality gives V_new = 1.0 L × (1.0/11.0) ≈ 0.09 L. Option A uses 21 atm (200 m); option C divides by 2; option D multiplies instead of dividing.'
  },
  {
    id: 'q-actsc-039',
    section: 'science',
    topic: 'data-representation',
    difficulty: 25,
    passage: 'Pressure (in atmospheres, atm) was recorded at five ocean depths during a research dive. At the surface (0 m) the pressure was 1.0 atm. At 50 m it was 6.0 atm. At 100 m it was 11.0 atm. At 200 m it was 21.0 atm. At 500 m it was 51.0 atm.',
    stem: 'Based on the data, the pressure increases by approximately how much for every additional 10 m of depth?',
    choices: ['5.0 atm', '1.0 atm', '0.1 atm', '0.5 atm'],
    answer: 1,
    explanation: 'From 0 to 100 m, pressure rises from 1.0 to 11.0 atm — that is 10 atm over 100 m, or about 1.0 atm per 10 m. The same rate (5 atm per 50 m) holds across the table.'
  },
  {
    id: 'q-actsc-040',
    section: 'science',
    topic: 'data-representation',
    difficulty: 32,
    passage: 'Pressure (in atmospheres, atm) was recorded at five ocean depths during a research dive. At the surface (0 m) the pressure was 1.0 atm. At 50 m it was 6.0 atm. At 100 m it was 11.0 atm. At 200 m it was 21.0 atm. At 500 m it was 51.0 atm.',
    stem: 'A submersible is rated to withstand a maximum external pressure of 80 atm. Based on the trend, the maximum safe operating depth is closest to:',
    choices: ['800 m', '600 m', '1000 m', '400 m'],
    answer: 0,
    explanation: 'Pressure rises by ~1 atm per 10 m above the 1 atm surface value. To reach 80 atm the dive depth needs ~(80 - 1) × 10 = 790 m, closest to 800 m.'
  }
]);
