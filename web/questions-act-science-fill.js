/**
 * ACT Science — fill batch.
 * testType: 'ACT', section: 'science'.
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';
window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([

  // ============================================================
  // PASSAGE 1 — Data Representation: Glacier retreat
  // ============================================================
  {
    id: 'q-actsc-fill-001',
    section: 'science',
    topic: 'data-representation',
    difficulty: 19,
    passage: 'Researchers measured the position of the terminus (front edge) of an alpine glacier each decade from 1960 to 2020. Distances are reported as meters of retreat from the 1960 position. In 1970 the terminus had retreated 45 m. In 1980 it had retreated 110 m. In 1990 it had retreated 195 m. In 2000 it had retreated 320 m. In 2010 it had retreated 495 m. In 2020 it had retreated 720 m. Average summer air temperature at a nearby weather station rose from 11.2°C in the 1960s to 14.1°C in the 2010s.',
    stem: 'According to the data, the total distance the terminus had retreated by 2000 was:',
    choices: ['195 m', '110 m', '320 m', '495 m'],
    answer: 2,
    explanation: 'The passage states the terminus had retreated 320 m by 2000. 195 m is the 1990 value; 110 m is the 1980 value; 495 m is the 2010 value.'
  },
  {
    id: 'q-actsc-fill-002',
    section: 'science',
    topic: 'data-representation',
    difficulty: 27,
    passage: 'Researchers measured the position of the terminus (front edge) of an alpine glacier each decade from 1960 to 2020. Distances are reported as meters of retreat from the 1960 position. In 1970 the terminus had retreated 45 m. In 1980 it had retreated 110 m. In 1990 it had retreated 195 m. In 2000 it had retreated 320 m. In 2010 it had retreated 495 m. In 2020 it had retreated 720 m. Average summer air temperature at a nearby weather station rose from 11.2°C in the 1960s to 14.1°C in the 2010s.',
    stem: 'During which decade did the terminus retreat the greatest additional distance?',
    choices: ['1970s (1970 to 1980)', '1980s (1980 to 1990)', '1990s (1990 to 2000)', '2010s (2010 to 2020)'],
    answer: 3,
    explanation: 'Decadal additions: 1970s 65 m (110-45); 1980s 85 m (195-110); 1990s 125 m (320-195); 2000s 175 m; 2010s 225 m (720-495). The 2010s show the largest single-decade jump.'
  },
  {
    id: 'q-actsc-fill-003',
    section: 'science',
    topic: 'data-representation',
    difficulty: 33,
    passage: 'Researchers measured the position of the terminus (front edge) of an alpine glacier each decade from 1960 to 2020. Distances are reported as meters of retreat from the 1960 position. In 1970 the terminus had retreated 45 m. In 1980 it had retreated 110 m. In 1990 it had retreated 195 m. In 2000 it had retreated 320 m. In 2010 it had retreated 495 m. In 2020 it had retreated 720 m. Average summer air temperature at a nearby weather station rose from 11.2°C in the 1960s to 14.1°C in the 2010s.',
    stem: 'If the trend in decadal retreat continues, the terminus position in 2030 would most likely be approximately how many meters from the 1960 position?',
    choices: ['820 m', '720 m', '1100 m', '975 m'],
    answer: 3,
    explanation: 'Decadal additions grew by roughly 25-50 m each decade (65, 85, 125, 175, 225). Extending the trend by ~30 m gives ~255 m for the 2020s, so ~720 + 255 = ~975 m. Choice A only adds 100 m; choice B is the 2020 value; choice C overshoots.'
  },

  // ============================================================
  // PASSAGE 2 — Data Representation: Antacid neutralization
  // ============================================================
  {
    id: 'q-actsc-fill-004',
    section: 'science',
    topic: 'data-representation',
    difficulty: 21,
    passage: 'A pharmacist tested five brands of antacid tablets. Each tablet was crushed and added to 50 mL of dilute hydrochloric acid (initial pH 1.5). The final pH of the solution was recorded after 5 minutes. Brand A: final pH 2.1. Brand B: final pH 3.4. Brand C: final pH 4.8. Brand D: final pH 6.2. Brand E: final pH 7.0. All tablets weighed the same (1.5 g) and the trial was performed at 22°C.',
    stem: 'Which brand raised the pH of the acid the least?',
    choices: ['Brand A', 'Brand C', 'Brand E', 'Brand B'],
    answer: 0,
    explanation: 'Brand A produced the smallest pH change (1.5 to 2.1, a rise of only 0.6). Higher final pH values mean more neutralization.'
  },
  {
    id: 'q-actsc-fill-005',
    section: 'science',
    topic: 'data-representation',
    difficulty: 29,
    passage: 'A pharmacist tested five brands of antacid tablets. Each tablet was crushed and added to 50 mL of dilute hydrochloric acid (initial pH 1.5). The final pH of the solution was recorded after 5 minutes. Brand A: final pH 2.1. Brand B: final pH 3.4. Brand C: final pH 4.8. Brand D: final pH 6.2. Brand E: final pH 7.0. All tablets weighed the same (1.5 g) and the trial was performed at 22°C.',
    stem: 'Which conclusion is most consistent with the data?',
    choices: ['All five brands left the solution acidic.', 'Brand E produced a slightly basic solution.', 'Brand C produced a more basic solution than Brand D.', 'Brands of equal mass do not always neutralize acid equally well.'],
    answer: 3,
    explanation: 'Each tablet weighed 1.5 g yet final pH varied from 2.1 (Brand A) to 7.0 (Brand E) — same mass, very different neutralization. Brand E reached pH 7.0 (neutral, not basic). All brands except E remained acidic, so choice A is wrong. Brand C (4.8) is more acidic, not more basic, than Brand D (6.2).'
  },

  // ============================================================
  // PASSAGE 3 — Data Representation: Radioactive half-life
  // ============================================================
  {
    id: 'q-actsc-fill-006',
    section: 'science',
    topic: 'data-representation',
    difficulty: 22,
    passage: 'A 200 g sample of a radioactive isotope was placed in a sealed container. Mass of the original isotope remaining was measured every 30 days. At day 0: 200 g. At day 30: 141 g. At day 60: 100 g. At day 90: 71 g. At day 120: 50 g. At day 150: 35 g. At day 180: 25 g.',
    stem: 'After how many days did the mass of the original isotope first fall to half (100 g) of its starting value?',
    choices: ['60 days', '90 days', '30 days', '120 days'],
    answer: 0,
    explanation: 'The table shows mass at day 60 = 100 g, exactly half of the 200 g start.'
  },
  {
    id: 'q-actsc-fill-007',
    section: 'science',
    topic: 'data-representation',
    difficulty: 26,
    passage: 'A 200 g sample of a radioactive isotope was placed in a sealed container. Mass of the original isotope remaining was measured every 30 days. At day 0: 200 g. At day 30: 141 g. At day 60: 100 g. At day 90: 71 g. At day 120: 50 g. At day 180: 25 g. At day 240: 12.5 g.',
    stem: 'Based on the trend, the mass of the original isotope at day 300 would be closest to:',
    choices: ['12.5 g', '0 g', '6.25 g', '25 g'],
    answer: 2,
    explanation: 'The mass halves roughly every 60 days (200, 100, 50, 25, 12.5 at 60-day intervals). From day 240 (12.5 g) to day 300 is one more half-life, giving ~6.25 g. The mass approaches zero but does not reach it.'
  },

  // ============================================================
  // PASSAGE 4 — Data Representation: Tree rings
  // ============================================================
  {
    id: 'q-actsc-fill-008',
    section: 'science',
    topic: 'data-representation',
    difficulty: 24,
    passage: 'A dendrochronologist measured the width (in mm) of annual growth rings in a single Douglas fir, decade by decade. Average ring width: 1950s 2.8 mm; 1960s 3.2 mm; 1970s 3.0 mm; 1980s 1.4 mm; 1990s 1.1 mm; 2000s 1.7 mm; 2010s 2.1 mm. Annual rainfall at the site (cm/year, decade average) was: 1950s 84; 1960s 96; 1970s 90; 1980s 48; 1990s 41; 2000s 60; 2010s 72.',
    stem: 'Which decade showed both the smallest average ring width and the lowest annual rainfall?',
    choices: ['1980s', '1950s', '2010s', '1990s'],
    answer: 3,
    explanation: 'The 1990s had the smallest ring width (1.1 mm) and the lowest rainfall (41 cm). The 1980s had the second-smallest of each.'
  },
  {
    id: 'q-actsc-fill-009',
    section: 'science',
    topic: 'data-representation',
    difficulty: 28,
    passage: 'A dendrochronologist measured the width (in mm) of annual growth rings in a single Douglas fir, decade by decade. Average ring width: 1950s 2.8 mm; 1960s 3.2 mm; 1970s 3.0 mm; 1980s 1.4 mm; 1990s 1.1 mm; 2000s 1.7 mm; 2010s 2.1 mm. Annual rainfall at the site (cm/year, decade average) was: 1950s 84; 1960s 96; 1970s 90; 1980s 48; 1990s 41; 2000s 60; 2010s 72.',
    stem: 'Based on the data, the relationship between rainfall and ring width is best described as:',
    choices: ['no clear relationship.', 'inverse — wetter decades produced narrower rings.', 'positive — wetter decades produced wider rings.', 'positive only above 60 cm of rainfall.'],
    answer: 2,
    explanation: 'Both variables track together: the highest rainfall decades (1960s 96 cm, 1970s 90 cm) match the widest rings (3.2 and 3.0 mm), while the driest decades (1990s 41, 1980s 48) match the narrowest. That is a positive relationship across the full range.'
  },

  // ============================================================
  // PASSAGE 5 — Data Representation: Capacitor discharge
  // ============================================================
  {
    id: 'q-actsc-fill-010',
    section: 'science',
    topic: 'data-representation',
    difficulty: 23,
    passage: 'A charged capacitor was connected across a fixed resistor and the voltage across the capacitor (V) was measured every second as it discharged. At t = 0 s, V = 12.0 V. At t = 1 s, V = 8.8 V. At t = 2 s, V = 6.5 V. At t = 3 s, V = 4.8 V. At t = 4 s, V = 3.5 V. At t = 5 s, V = 2.6 V.',
    stem: 'Between t = 0 s and t = 5 s, the voltage decreased by approximately:',
    choices: ['9.4 V', '12.0 V', '6.5 V', '2.6 V'],
    answer: 0,
    explanation: 'Voltage went from 12.0 V to 2.6 V, a decrease of 9.4 V. Choice B is the start value; C is the value at t = 2 s; D is the final value.'
  },
  {
    id: 'q-actsc-fill-011',
    section: 'science',
    topic: 'data-representation',
    difficulty: 32,
    passage: 'A charged capacitor was connected across a fixed resistor and the voltage across the capacitor (V) was measured every second as it discharged. At t = 0 s, V = 12.0 V. At t = 1 s, V = 8.8 V. At t = 2 s, V = 6.5 V. At t = 3 s, V = 4.8 V. At t = 4 s, V = 3.5 V. At t = 5 s, V = 2.6 V.',
    stem: 'The voltage decrease is largest in the first second and progressively smaller in each later second. The shape of the discharge curve is best described as:',
    choices: ['linear with constant slope.', 'increasing exponentially.', 'flat after t = 1 s.', 'exponential decay — falling rapidly at first then leveling off.'],
    answer: 3,
    explanation: 'Drops per second: 3.2, 2.3, 1.7, 1.3, 0.9 V. Each successive interval shrinks, signaling exponential decay (steep at first, flatter later). A linear curve would have constant drops; the voltage clearly is not flat.'
  },

  // ============================================================
  // PASSAGE 6 — Data Representation: Rainfall vs corn yield
  // ============================================================
  {
    id: 'q-actsc-fill-012',
    section: 'science',
    topic: 'data-representation',
    difficulty: 25,
    passage: 'A county agricultural office tracked corn yield (bushels per acre) against total growing-season rainfall (cm) for seven seasons in the same field. Season 1: 18 cm rain, 95 bu/acre. Season 2: 26 cm, 132 bu/acre. Season 3: 34 cm, 168 bu/acre. Season 4: 41 cm, 184 bu/acre. Season 5: 48 cm, 175 bu/acre. Season 6: 56 cm, 142 bu/acre. Season 7: 63 cm, 110 bu/acre.',
    stem: 'Yield reached its maximum at which seasonal rainfall amount?',
    choices: ['41 cm', '34 cm', '56 cm', '48 cm'],
    answer: 0,
    explanation: 'Yields were 95, 132, 168, 184, 175, 142, 110 — the peak (184 bu/acre) occurred at 41 cm of rainfall.'
  },
  {
    id: 'q-actsc-fill-013',
    section: 'science',
    topic: 'data-representation',
    difficulty: 26,
    passage: 'A county agricultural office tracked corn yield (bushels per acre) against total growing-season rainfall (cm) for seven seasons in the same field. Season 1: 18 cm rain, 95 bu/acre. Season 2: 26 cm, 132 bu/acre. Season 3: 34 cm, 168 bu/acre. Season 4: 41 cm, 184 bu/acre. Season 5: 48 cm, 175 bu/acre. Season 6: 56 cm, 142 bu/acre. Season 7: 63 cm, 110 bu/acre.',
    stem: 'Which conclusion is best supported by the data?',
    choices: ['Yield rises continuously with rainfall.', 'Yield drops to zero above 60 cm of rainfall.', 'Both very low and very high rainfall reduce yield, with a peak in the middle.', 'Rainfall has no measurable effect on yield.'],
    answer: 2,
    explanation: 'Yield rises from 95 to 184 bu/acre, then falls back to 110 — a clear inverted-U with a middle peak. Choice A ignores the decline; choice B overstates the trend (yield is 110, not zero, at 63 cm); choice D contradicts the data.'
  },

  // ============================================================
  // PASSAGE 7 — Data Representation: Asteroid sizes
  // ============================================================
  {
    id: 'q-actsc-fill-014',
    section: 'science',
    topic: 'data-representation',
    difficulty: 20,
    passage: 'A survey catalogued five near-Earth asteroids by mean diameter (km), closest approach distance to Earth (million km), and estimated mass (kg). Asteroid Alpha: 0.4 km, 7.5 million km, 1.0e11 kg. Asteroid Beta: 1.2 km, 22.0 million km, 2.7e12 kg. Asteroid Gamma: 0.9 km, 14.5 million km, 1.1e12 kg. Asteroid Delta: 2.0 km, 4.0 million km, 1.3e13 kg. Asteroid Epsilon: 0.2 km, 1.8 million km, 1.2e10 kg.',
    stem: 'Which asteroid has the largest mean diameter?',
    choices: ['Beta', 'Delta', 'Gamma', 'Alpha'],
    answer: 1,
    explanation: 'Diameters: Alpha 0.4, Beta 1.2, Gamma 0.9, Delta 2.0, Epsilon 0.2 km. Delta is largest at 2.0 km.'
  },
  {
    id: 'q-actsc-fill-015',
    section: 'science',
    topic: 'data-representation',
    difficulty: 28,
    passage: 'A survey catalogued five near-Earth asteroids by mean diameter (km), closest approach distance to Earth (million km), and estimated mass (kg). Asteroid Alpha: 0.4 km, 7.5 million km, 1.0e11 kg. Asteroid Beta: 1.2 km, 22.0 million km, 2.7e12 kg. Asteroid Gamma: 0.9 km, 14.5 million km, 1.1e12 kg. Asteroid Delta: 2.0 km, 4.0 million km, 1.3e13 kg. Asteroid Epsilon: 0.2 km, 1.8 million km, 1.2e10 kg.',
    stem: 'Which statement is best supported by the data?',
    choices: ['The asteroid with the smallest diameter also has the smallest mass.', 'The asteroid that comes closest to Earth is the largest.', 'Larger asteroids always pass closer to Earth.', 'The asteroid with the largest mass also has the smallest diameter.'],
    answer: 0,
    explanation: 'Epsilon has both the smallest diameter (0.2 km) and the smallest mass (1.2e10 kg). Delta is largest, but Epsilon (the smallest) makes the closest approach (1.8 million km), so choices B and C fail. Choice D is the opposite of the data.'
  },

  // ============================================================
  // PASSAGE 8 — Data Representation: Magnetic field vs distance
  // ============================================================
  {
    id: 'q-actsc-fill-016',
    section: 'science',
    topic: 'data-representation',
    difficulty: 26,
    passage: 'A student measured the magnetic field strength (in milliteslas, mT) at varying distances from the face of a strong neodymium magnet using a Hall-effect probe. At 1.0 cm the field was 240 mT. At 2.0 cm: 60 mT. At 3.0 cm: 27 mT. At 4.0 cm: 15 mT. At 5.0 cm: 9.6 mT. At 10.0 cm: 2.4 mT.',
    stem: 'When the distance from the magnet doubled from 1.0 cm to 2.0 cm, the field strength changed from 240 mT to:',
    choices: ['60 mT', '27 mT', '120 mT', '15 mT'],
    answer: 0,
    explanation: 'The table directly gives 60 mT at 2.0 cm. 120 mT would correspond to a 1/2 reduction; 27 mT is the 3.0 cm value; 15 mT is the 4.0 cm value.'
  },
  {
    id: 'q-actsc-fill-017',
    section: 'science',
    topic: 'data-representation',
    difficulty: 33,
    passage: 'A student measured the magnetic field strength (in milliteslas, mT) at varying distances from the face of a strong neodymium magnet using a Hall-effect probe. At 1.0 cm the field was 240 mT. At 2.0 cm: 60 mT. At 3.0 cm: 27 mT. At 4.0 cm: 15 mT. At 5.0 cm: 9.6 mT. At 10.0 cm: 2.4 mT.',
    stem: 'The data are most consistent with the field strength being proportional to:',
    choices: ['distance.', '1 / distance squared.', '1 / distance cubed.', 'distance cubed.'],
    answer: 1,
    explanation: 'Check the 1/r^2 prediction starting from 240 mT at 1.0 cm: at 2 cm expect 240/4 = 60 (matches); at 3 cm expect 240/9 = 26.7 (matches 27); at 5 cm expect 240/25 = 9.6 (matches); at 10 cm expect 240/100 = 2.4 (matches). The 1/r^2 fit is excellent. A 1/r^3 fit would predict only 30 mT at 2 cm, far from the observed 60.'
  },
  {
    id: 'q-actsc-fill-018',
    section: 'science',
    topic: 'data-representation',
    difficulty: 34,
    passage: 'A student measured the magnetic field strength (in milliteslas, mT) at varying distances from the face of a strong neodymium magnet using a Hall-effect probe. At 1.0 cm the field was 240 mT. At 2.0 cm: 60 mT. At 3.0 cm: 27 mT. At 4.0 cm: 15 mT. At 5.0 cm: 9.6 mT. At 10.0 cm: 2.4 mT.',
    stem: 'Based on the trend, the field at 20.0 cm would be closest to:',
    choices: ['1.2 mT', '2.4 mT', '0.0 mT', '0.6 mT'],
    answer: 3,
    explanation: 'The field follows ~1/distance squared (240 at 1 cm to 2.4 at 10 cm is a factor of 100 = 10^2). Doubling distance from 10 to 20 cm divides field by 4: 2.4 / 4 = 0.6 mT. Choice A halves; choice B keeps the 10 cm value; choice C overstates the drop.'
  },

  // ============================================================
  // PASSAGE 9 — Research Summary: Enzyme activity
  // ============================================================
  {
    id: 'q-actsc-fill-019',
    section: 'science',
    topic: 'research-summary',
    difficulty: 22,
    passage: 'Experiment 1: A biologist mixed 5 mL of an enzyme solution with 10 mL of a starch solution at five temperatures. After 10 minutes, the amount of starch broken down (mg) was: 5°C 4 mg; 20°C 18 mg; 35°C 42 mg; 50°C 30 mg; 65°C 5 mg. Experiment 2: The 35°C trial was repeated at four pH values (4, 6, 7, 9) buffered with the same buffer system. Starch broken down: pH 4 8 mg; pH 6 35 mg; pH 7 42 mg; pH 9 22 mg. Experiment 3: The pH 7, 35°C trial was repeated with enzyme volumes of 2, 5, 10, and 20 mL holding starch volume constant. Starch broken down: 18, 42, 60, 65 mg.',
    stem: 'In Experiment 1, the most starch was broken down at:',
    choices: ['65°C', '50°C', '5°C', '35°C'],
    answer: 3,
    explanation: 'Experiment 1 values: 4, 18, 42, 30, 5 mg — the maximum (42 mg) occurred at 35°C.'
  },
  {
    id: 'q-actsc-fill-020',
    section: 'science',
    topic: 'research-summary',
    difficulty: 27,
    passage: 'Experiment 1: A biologist mixed 5 mL of an enzyme solution with 10 mL of a starch solution at five temperatures. After 10 minutes, the amount of starch broken down (mg) was: 5°C 4 mg; 20°C 18 mg; 35°C 42 mg; 50°C 30 mg; 65°C 5 mg. Experiment 2: The 35°C trial was repeated at four pH values (4, 6, 7, 9) buffered with the same buffer system. Starch broken down: pH 4 8 mg; pH 6 35 mg; pH 7 42 mg; pH 9 22 mg. Experiment 3: The pH 7, 35°C trial was repeated with enzyme volumes of 2, 5, 10, and 20 mL holding starch volume constant. Starch broken down: 18, 42, 60, 65 mg.',
    stem: 'Why did the researcher hold temperature at 35°C for Experiment 2?',
    choices: ['Because all enzymes work best at 35°C.', 'Because 35°C produced the most starch breakdown in Experiment 1, isolating pH as the variable being changed.', 'To match human body temperature.', 'So that the enzyme would denature.'],
    answer: 1,
    explanation: 'Experiment 1 identified 35°C as the temperature giving maximum activity (42 mg). Holding it constant in Experiment 2 isolates pH as the only variable. The other choices either overgeneralize, are off-topic, or misuse the term denature.'
  },
  {
    id: 'q-actsc-fill-021',
    section: 'science',
    topic: 'research-summary',
    difficulty: 32,
    passage: 'Experiment 1: A biologist mixed 5 mL of an enzyme solution with 10 mL of a starch solution at five temperatures. After 10 minutes, the amount of starch broken down (mg) was: 5°C 4 mg; 20°C 18 mg; 35°C 42 mg; 50°C 30 mg; 65°C 5 mg. Experiment 2: The 35°C trial was repeated at four pH values (4, 6, 7, 9) buffered with the same buffer system. Starch broken down: pH 4 8 mg; pH 6 35 mg; pH 7 42 mg; pH 9 22 mg. Experiment 3: The pH 7, 35°C trial was repeated with enzyme volumes of 2, 5, 10, and 20 mL holding starch volume constant. Starch broken down: 18, 42, 60, 65 mg.',
    stem: 'Experiment 3 shows a clear pattern of diminishing returns. Which comparison best demonstrates that pattern?',
    choices: ['Going from 2 to 5 mL added 24 mg, but going from 10 to 20 mL added only 5 mg.', 'Adding any enzyme increases starch breakdown.', 'The 20 mL trial broke down the most starch.', 'The 2 mL trial broke down 18 mg, the 5 mL trial broke down 42 mg.'],
    answer: 0,
    explanation: 'A 3 mL increase (2 to 5) produced 24 mg of additional breakdown; a 10 mL increase (10 to 20) produced only 5 mg — a much smaller marginal gain per mL added. That is the textbook signature of diminishing returns. The other choices are true but do not show the diminishing pattern.'
  },

  // ============================================================
  // PASSAGE 10 — Research Summary: Solar panel angle
  // ============================================================
  {
    id: 'q-actsc-fill-022',
    section: 'science',
    topic: 'research-summary',
    difficulty: 24,
    passage: 'Experiment 1: A 100 W solar panel was tilted at angles of 0°, 15°, 30°, 45°, 60°, and 75° from horizontal at solar noon on June 21 at latitude 40° N. Power output (W): 71, 85, 95, 99, 91, 70. Experiment 2: The same panel was tested at angles of 30°, 45°, and 60° on December 21. Power output (W): 35, 48, 58. Experiment 3: A second panel of the same model was placed at 45° but oriented east instead of south at solar noon on June 21. Power output: 56 W.',
    stem: 'On June 21, the panel produced its maximum power at which tilt angle?',
    choices: ['0°', '30°', '45°', '60°'],
    answer: 2,
    explanation: 'Experiment 1 lists 99 W at 45° as the largest output (compared with 71, 85, 95, 91, and 70 W at the other angles).'
  },
  {
    id: 'q-actsc-fill-023',
    section: 'science',
    topic: 'research-summary',
    difficulty: 30,
    passage: 'Experiment 1: A 100 W solar panel was tilted at angles of 0°, 15°, 30°, 45°, 60°, and 75° from horizontal at solar noon on June 21 at latitude 40° N. Power output (W): 71, 85, 95, 99, 91, 70. Experiment 2: The same panel was tested at angles of 30°, 45°, and 60° on December 21. Power output (W): 35, 48, 58. Experiment 3: A second panel of the same model was placed at 45° but oriented east instead of south at solar noon on June 21. Power output: 56 W.',
    stem: 'Comparing Experiment 1 and Experiment 2, which conclusion is best supported?',
    choices: ['The optimal tilt angle is the same in summer and winter.', 'Maximum output is higher in summer than in winter at every common tilt angle tested.', 'Tilting the panel always reduces output.', 'In December, output was the same at 30° and 60°.'],
    answer: 1,
    explanation: 'At 30°, 45°, and 60° — the angles tested in both experiments — June values (95, 99, 91 W) all exceed December values (35, 48, 58 W). Choice A is wrong because Experiment 2 shows higher output at 60° than 45°, indicating a different optimum than June. Choices C and D contradict the data.'
  },
  {
    id: 'q-actsc-fill-024',
    section: 'science',
    topic: 'research-summary',
    difficulty: 35,
    passage: 'Experiment 1: A 100 W solar panel was tilted at angles of 0°, 15°, 30°, 45°, 60°, and 75° from horizontal at solar noon on June 21 at latitude 40° N. Power output (W): 71, 85, 95, 99, 91, 70. Experiment 2: The same panel was tested at angles of 30°, 45°, and 60° on December 21. Power output (W): 35, 48, 58. Experiment 3: A second panel of the same model was placed at 45° but oriented east instead of south at solar noon on June 21. Power output: 56 W.',
    stem: 'Experiment 3 was designed to test the effect of:',
    choices: ['panel age.', 'tilt angle.', 'compass orientation.', 'time of year.'],
    answer: 2,
    explanation: 'Experiment 3 keeps tilt (45°), date (June 21), and panel model the same as the corresponding Experiment 1 trial — only the compass orientation changes (south to east). That isolates orientation as the variable being tested.'
  },

  // ============================================================
  // PASSAGE 11 — Research Summary: Yeast fermentation
  // ============================================================
  {
    id: 'q-actsc-fill-025',
    section: 'science',
    topic: 'research-summary',
    difficulty: 21,
    passage: 'Experiment 1: 5 g of dry yeast and 50 g of glucose were mixed in 500 mL of water at 30°C. Carbon dioxide volume (mL) collected after 30 minutes was measured at four sugar concentrations (g of glucose per 500 mL water): 10 g 90 mL; 30 g 240 mL; 50 g 350 mL; 100 g 380 mL. Experiment 2: The 50 g trial was repeated at 10°C, 20°C, 30°C, 40°C, and 50°C. CO2 volumes after 30 min: 60, 180, 350, 410, 80 mL. Experiment 3: The 30°C, 50 g trial was repeated using maltose, sucrose, or fructose instead of glucose. CO2 volumes: maltose 90, sucrose 230, fructose 360 mL.',
    stem: 'In Experiment 1, doubling glucose from 50 g to 100 g changed the CO2 volume from 350 mL to:',
    choices: ['380 mL', '700 mL', '350 mL', '90 mL'],
    answer: 0,
    explanation: 'The 100 g trial produced 380 mL of CO2 — only a small increase, suggesting saturation. 700 mL would assume linear doubling; 350 mL is the 50 g value; 90 mL is the 10 g value.'
  },
  {
    id: 'q-actsc-fill-026',
    section: 'science',
    topic: 'research-summary',
    difficulty: 28,
    passage: 'Experiment 1: 5 g of dry yeast and 50 g of glucose were mixed in 500 mL of water at 30°C. Carbon dioxide volume (mL) collected after 30 minutes was measured at four sugar concentrations (g of glucose per 500 mL water): 10 g 90 mL; 30 g 240 mL; 50 g 350 mL; 100 g 380 mL. Experiment 2: The 50 g trial was repeated at 10°C, 20°C, 30°C, 40°C, and 50°C. CO2 volumes after 30 min: 60, 180, 350, 410, 80 mL. Experiment 3: The 30°C, 50 g trial was repeated using maltose, sucrose, or fructose instead of glucose. CO2 volumes: maltose 90, sucrose 230, fructose 360 mL.',
    stem: 'In Experiment 2, the temperature giving the most fermentation was:',
    choices: ['30°C', '50°C', '40°C', '20°C'],
    answer: 2,
    explanation: 'CO2 volumes were 60, 180, 350, 410, 80 mL at 10, 20, 30, 40, 50°C. The peak (410 mL) occurred at 40°C, just above the 30°C value used in Experiments 1 and 3.'
  },
  {
    id: 'q-actsc-fill-027',
    section: 'science',
    topic: 'research-summary',
    difficulty: 33,
    passage: 'Experiment 1: 5 g of dry yeast and 50 g of glucose were mixed in 500 mL of water at 30°C. Carbon dioxide volume (mL) collected after 30 minutes was measured at four sugar concentrations (g of glucose per 500 mL water): 10 g 90 mL; 30 g 240 mL; 50 g 350 mL; 100 g 380 mL. Experiment 2: The 50 g trial was repeated at 10°C, 20°C, 30°C, 40°C, and 50°C. CO2 volumes after 30 min: 60, 180, 350, 410, 80 mL. Experiment 3: The 30°C, 50 g trial was repeated using maltose, sucrose, or fructose instead of glucose. CO2 volumes: maltose 90, sucrose 230, fructose 360 mL.',
    stem: 'A baker must choose a sugar that produces the most rapid rise in dough at room temperature. Based on the CO2 data in Experiments 1 and 3, the best choice is:',
    choices: ['Maltose, because it produced 90 mL of CO2.', 'Sucrose, because it produced 230 mL of CO2.', 'Glucose, because it produced 350 mL of CO2.', 'Fructose, because it produced 360 mL of CO2 — more than glucose, sucrose, or maltose at the same conditions.'],
    answer: 3,
    explanation: 'In Experiment 3 (30°C, 50 g sugar), CO2 volumes were maltose 90, sucrose 230, fructose 360, with glucose at 350 mL from Experiment 1. Fructose produced the most CO2 of any sugar tested at the same conditions, so it would generate the fastest rise. Each other choice picks a sugar with less CO2 output.'
  },

  // ============================================================
  // PASSAGE 12 — Research Summary: Battery types
  // ============================================================
  {
    id: 'q-actsc-fill-028',
    section: 'science',
    topic: 'research-summary',
    difficulty: 25,
    passage: 'Experiment 1: Three new AA batteries (alkaline, lithium, NiMH rechargeable) each powered an identical 2 W flashlight bulb continuously. Time until the voltage fell below 1.0 V: alkaline 5.5 h; lithium 9.0 h; NiMH 3.5 h. Experiment 2: The same three batteries powered a 0.2 W LED lamp instead. Times: alkaline 80 h; lithium 110 h; NiMH 30 h. Experiment 3: The NiMH battery was recharged and re-tested on the 2 W bulb after 1, 5, 10, and 25 charge cycles. Times: 3.5, 3.4, 3.2, 2.8 h.',
    stem: 'Across Experiments 1 and 2, which battery type provided the longest run time at both power levels?',
    choices: ['Lithium', 'Alkaline', 'NiMH', 'They were equal.'],
    answer: 0,
    explanation: 'Lithium led at both: 9.0 h vs 5.5 h alkaline and 3.5 h NiMH on the bulb; 110 h vs 80 h alkaline and 30 h NiMH on the LED.'
  },
  {
    id: 'q-actsc-fill-029',
    section: 'science',
    topic: 'research-summary',
    difficulty: 31,
    passage: 'Experiment 1: Three new AA batteries (alkaline, lithium, NiMH rechargeable) each powered an identical 2 W flashlight bulb continuously. Time until the voltage fell below 1.0 V: alkaline 5.5 h; lithium 9.0 h; NiMH 3.5 h. Experiment 2: The same three batteries powered a 0.2 W LED lamp instead. Times: alkaline 80 h; lithium 110 h; NiMH 30 h. Experiment 3: The NiMH battery was recharged and re-tested on the 2 W bulb after 1, 5, 10, and 25 charge cycles. Times: 3.5, 3.4, 3.2, 2.8 h.',
    stem: 'Experiment 3 supports which conclusion about the NiMH battery?',
    choices: ['The NiMH battery cannot be recharged after the 25th cycle.', 'NiMH run time on the 2 W bulb declines gradually with repeated charge cycles.', 'Charging restored the NiMH battery to higher run times than when new.', 'The NiMH battery outperforms lithium after 25 cycles.'],
    answer: 1,
    explanation: 'Run times went from 3.5 h to 2.8 h over 25 cycles — a slow but consistent decline. Choice A is unsupported by the data; choice C contradicts it; choice D would require comparing 2.8 h to lithium\'s 9.0 h.'
  },

  // ============================================================
  // PASSAGE 13 — Research Summary: Daphnia heart rate
  // ============================================================
  {
    id: 'q-actsc-fill-030',
    section: 'science',
    topic: 'research-summary',
    difficulty: 24,
    passage: 'Experiment 1: Researchers placed individual Daphnia (water fleas) in a drop of water on a slide and counted heart beats per minute (bpm) under a microscope. Mean heart rate at 10°C: 120 bpm; 15°C: 175 bpm; 20°C: 240 bpm; 25°C: 290 bpm. Experiment 2: Daphnia at 20°C were exposed to caffeine concentrations of 0, 0.05%, 0.10%, and 0.20%. Mean heart rates: 240, 285, 320, 360 bpm. Experiment 3: Daphnia at 20°C were exposed to ethanol concentrations of 0, 1%, 2%, 5%. Mean heart rates: 240, 195, 140, 60 bpm.',
    stem: 'Across Experiment 1, as temperature rose from 10°C to 25°C, the mean heart rate:',
    choices: ['decreased steadily.', 'increased steadily.', 'rose then fell.', 'stayed roughly constant.'],
    answer: 1,
    explanation: 'Values were 120, 175, 240, 290 bpm — a steady, monotonic increase. The other patterns do not match.'
  },
  {
    id: 'q-actsc-fill-031',
    section: 'science',
    topic: 'research-summary',
    difficulty: 30,
    passage: 'Experiment 1: Researchers placed individual Daphnia (water fleas) in a drop of water on a slide and counted heart beats per minute (bpm) under a microscope. Mean heart rate at 10°C: 120 bpm; 15°C: 175 bpm; 20°C: 240 bpm; 25°C: 290 bpm. Experiment 2: Daphnia at 20°C were exposed to caffeine concentrations of 0, 0.05%, 0.10%, and 0.20%. Mean heart rates: 240, 285, 320, 360 bpm. Experiment 3: Daphnia at 20°C were exposed to ethanol concentrations of 0, 1%, 2%, 5%. Mean heart rates: 240, 195, 140, 60 bpm.',
    stem: 'A pharmacology student claims caffeine and ethanol have opposite effects on Daphnia heart rate. Which set of results best supports that claim?',
    choices: ['The 20°C control matched in both Experiments 2 and 3.', 'Heart rate rose with caffeine concentration but fell with ethanol concentration.', 'Both substances raised heart rate above the 240 bpm baseline.', 'Heart rate at 0% caffeine and 0% ethanol was 240 bpm.'],
    answer: 1,
    explanation: 'Caffeine series: 240, 285, 320, 360 (rising). Ethanol series: 240, 195, 140, 60 (falling). Opposite directions from the same baseline directly support the claim. Choices A and D describe the controls only; choice C is factually wrong about ethanol.'
  },

  // ============================================================
  // PASSAGE 14 — Research Summary: Aluminum thermal expansion
  // ============================================================
  {
    id: 'q-actsc-fill-032',
    section: 'science',
    topic: 'research-summary',
    difficulty: 22,
    passage: 'Experiment 1: A 1.000 m aluminum rod was heated in an oven and its length measured at five temperatures. Length (mm increase from 1.000 m): at 25°C 0.00 mm; 75°C 1.15 mm; 125°C 2.30 mm; 175°C 3.45 mm; 225°C 4.60 mm. Experiment 2: A 1.000 m steel rod was tested in the same way. Length increases: 0.00, 0.55, 1.10, 1.65, 2.20 mm. Experiment 3: A 0.500 m aluminum rod (same alloy) was tested. Length increases: 0.00, 0.58, 1.15, 1.73, 2.30 mm.',
    stem: 'In Experiment 1, the length increase per 50°C rise in temperature was approximately:',
    choices: ['0.55 mm', '1.15 mm', '2.30 mm', '4.60 mm'],
    answer: 1,
    explanation: 'Each 50°C step added 1.15 mm (0.00 to 1.15, 1.15 to 2.30, 2.30 to 3.45, 3.45 to 4.60). 0.55 mm is the steel value (Experiment 2); 2.30 and 4.60 mm are total expansions across larger spans.'
  },
  {
    id: 'q-actsc-fill-033',
    section: 'science',
    topic: 'research-summary',
    difficulty: 29,
    passage: 'Experiment 1: A 1.000 m aluminum rod was heated in an oven and its length measured at five temperatures. Length (mm increase from 1.000 m): at 25°C 0.00 mm; 75°C 1.15 mm; 125°C 2.30 mm; 175°C 3.45 mm; 225°C 4.60 mm. Experiment 2: A 1.000 m steel rod was tested in the same way. Length increases: 0.00, 0.55, 1.10, 1.65, 2.20 mm. Experiment 3: A 0.500 m aluminum rod (same alloy) was tested. Length increases: 0.00, 0.58, 1.15, 1.73, 2.30 mm.',
    stem: 'Comparing Experiments 1 and 2 at 225°C, aluminum expanded approximately how many times as much as steel?',
    choices: ['the same amount', '4 times as much', 'half as much', '2 times as much'],
    answer: 3,
    explanation: 'At 225°C: aluminum 4.60 mm, steel 2.20 mm. Ratio is 4.60 / 2.20 ≈ 2.1 — about 2 times as much.'
  },
  {
    id: 'q-actsc-fill-034',
    section: 'science',
    topic: 'research-summary',
    difficulty: 34,
    passage: 'Experiment 1: A 1.000 m aluminum rod was heated in an oven and its length measured at five temperatures. Length (mm increase from 1.000 m): at 25°C 0.00 mm; 75°C 1.15 mm; 125°C 2.30 mm; 175°C 3.45 mm; 225°C 4.60 mm. Experiment 2: A 1.000 m steel rod was tested in the same way. Length increases: 0.00, 0.55, 1.10, 1.65, 2.20 mm. Experiment 3: A 0.500 m aluminum rod (same alloy) was tested. Length increases: 0.00, 0.58, 1.15, 1.73, 2.30 mm.',
    stem: 'Comparing Experiments 1 and 3 at 225°C suggests that, at a given temperature change, the absolute length increase of an aluminum rod is:',
    choices: ['independent of original rod length.', 'larger for shorter rods.', 'roughly proportional to original rod length.', 'always 1.15 mm regardless of length.'],
    answer: 2,
    explanation: 'At 225°C, the 1.000 m rod expanded 4.60 mm and the 0.500 m rod expanded 2.30 mm — exactly half. Halving the length halved the expansion, indicating direct proportionality. The other choices contradict the 2:1 pattern.'
  },

  // ============================================================
  // PASSAGE 15 — Conflicting Viewpoints: Origin of the Moon
  // ============================================================
  {
    id: 'q-actsc-fill-035',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 23,
    passage: 'Scientist 1 favors the Giant Impact hypothesis: roughly 4.5 billion years ago a Mars-sized body (often called Theia) struck the early Earth at an oblique angle. Material vaporized from both bodies condensed in orbit and accreted into the Moon. Scientist 1 cites the Moon\'s relatively small iron core, the high angular momentum of the Earth-Moon system, and oxygen isotope ratios in lunar rocks that closely match Earth\'s mantle. Scientist 2 favors the Co-formation hypothesis: the Moon and Earth formed together from the same disk of dust and gas surrounding the young Sun. Scientist 2 cites the chemical similarity between Earth and the Moon and notes that no remnant of the proposed impactor Theia has ever been directly identified.',
    stem: 'Which piece of evidence is cited only by Scientist 1?',
    choices: ['The Moon and Earth share many chemical features.', 'No remnant of Theia has been directly identified.', 'The Moon has a relatively small iron core.', 'The Moon orbits Earth.'],
    answer: 2,
    explanation: 'Scientist 1 specifically lists the Moon\'s small iron core, the system\'s high angular momentum, and matching oxygen isotopes. Choice A is shared evidence cited by Scientist 2; choice B is Scientist 2\'s objection; choice D is not part of either case.'
  },
  {
    id: 'q-actsc-fill-036',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 27,
    passage: 'Scientist 1 favors the Giant Impact hypothesis: roughly 4.5 billion years ago a Mars-sized body (often called Theia) struck the early Earth at an oblique angle. Material vaporized from both bodies condensed in orbit and accreted into the Moon. Scientist 1 cites the Moon\'s relatively small iron core, the high angular momentum of the Earth-Moon system, and oxygen isotope ratios in lunar rocks that closely match Earth\'s mantle. Scientist 2 favors the Co-formation hypothesis: the Moon and Earth formed together from the same disk of dust and gas surrounding the young Sun. Scientist 2 cites the chemical similarity between Earth and the Moon and notes that no remnant of the proposed impactor Theia has ever been directly identified.',
    stem: 'Both scientists would most likely agree that:',
    choices: ['the Moon contains a large iron core.', 'lunar and Earth rocks share important chemical similarities.', 'Theia\'s remnants have been recovered from the Moon.', 'the Moon formed from material captured from the asteroid belt.'],
    answer: 1,
    explanation: 'Both views point to chemical similarity: Scientist 1 cites the matching oxygen isotopes, and Scientist 2 cites the chemical similarity directly. The other choices contradict at least one viewpoint.'
  },
  {
    id: 'q-actsc-fill-037',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 36,
    passage: 'Scientist 1 favors the Giant Impact hypothesis: roughly 4.5 billion years ago a Mars-sized body (often called Theia) struck the early Earth at an oblique angle. Material vaporized from both bodies condensed in orbit and accreted into the Moon. Scientist 1 cites the Moon\'s relatively small iron core, the high angular momentum of the Earth-Moon system, and oxygen isotope ratios in lunar rocks that closely match Earth\'s mantle. Scientist 2 favors the Co-formation hypothesis: the Moon and Earth formed together from the same disk of dust and gas surrounding the young Sun. Scientist 2 cites the chemical similarity between Earth and the Moon and notes that no remnant of the proposed impactor Theia has ever been directly identified.',
    stem: 'New analysis of returned lunar samples shows isotope ratios for tungsten and titanium that are slightly different from Earth\'s mantle in a pattern best explained by mixing with material from another body. This finding would most:',
    choices: ['support Scientist 1, by providing a chemical fingerprint of a separate impactor mixed into lunar material.', 'support Scientist 2, because any difference shows the Moon did not form from Earth.', 'weaken both scientists equally.', 'be irrelevant to either hypothesis.'],
    answer: 0,
    explanation: 'A small but real chemical signature from a "different" body matches what Scientist 1 predicts: Theia\'s material mixed into the Moon. Co-formation predicts essentially identical chemistry, so the difference weakens — not supports — Scientist 2. The finding is therefore directly relevant.'
  },

  // ============================================================
  // PASSAGE 16 — Conflicting Viewpoints: Cause of ice ages
  // ============================================================
  {
    id: 'q-actsc-fill-038',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 26,
    passage: 'Researcher A argues that the major glacial-interglacial cycles of the past million years are driven by Milankovitch cycles — periodic variations in Earth\'s orbital eccentricity (~100,000 years), axial tilt (~41,000 years), and precession (~26,000 years). These change how much sunlight reaches high northern latitudes in summer and trigger ice sheet growth or retreat. Researcher B argues that long-term variations in solar output, not orbital geometry, drive the cycles. Researcher B notes that solar activity rises and falls over decades to millennia and asserts that small but persistent changes in total solar irradiance can accumulate into climate-scale effects.',
    stem: 'According to Researcher A, glacial cycles are caused primarily by:',
    choices: ['changes in solar output.', 'volcanic eruptions.', 'atmospheric carbon dioxide.', 'periodic changes in Earth\'s orbit and tilt.'],
    answer: 3,
    explanation: 'Researcher A explicitly attributes glacial cycles to Milankovitch variations in eccentricity, tilt, and precession. The other choices are not part of A\'s case.'
  },
  {
    id: 'q-actsc-fill-039',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 32,
    passage: 'Researcher A argues that the major glacial-interglacial cycles of the past million years are driven by Milankovitch cycles — periodic variations in Earth\'s orbital eccentricity (~100,000 years), axial tilt (~41,000 years), and precession (~26,000 years). These change how much sunlight reaches high northern latitudes in summer and trigger ice sheet growth or retreat. Researcher B argues that long-term variations in solar output, not orbital geometry, drive the cycles. Researcher B notes that solar activity rises and falls over decades to millennia and asserts that small but persistent changes in total solar irradiance can accumulate into climate-scale effects.',
    stem: 'Geologists report that ice-core records show glacial cycles repeating with strong dominant periods near 100,000 and 41,000 years. This finding most directly:',
    choices: ['supports Researcher B, because solar output varies over decades to millennia.', 'is consistent with neither researcher.', 'supports Researcher A, because the periods match orbital cycle lengths.', 'supports both researchers equally.'],
    answer: 2,
    explanation: 'Researcher A predicts climate cycles aligned with orbital periods of ~100,000 years (eccentricity) and ~41,000 years (tilt) — exactly the periods seen in the cores. Researcher B\'s decades-to-millennia solar variations do not naturally produce those specific long periods.'
  },
  {
    id: 'q-actsc-fill-040',
    section: 'science',
    topic: 'conflicting-viewpoints',
    difficulty: 33,
    passage: 'Researcher A argues that the major glacial-interglacial cycles of the past million years are driven by Milankovitch cycles — periodic variations in Earth\'s orbital eccentricity (~100,000 years), axial tilt (~41,000 years), and precession (~26,000 years). These change how much sunlight reaches high northern latitudes in summer and trigger ice sheet growth or retreat. Researcher B argues that long-term variations in solar output, not orbital geometry, drive the cycles. Researcher B notes that solar activity rises and falls over decades to millennia and asserts that small but persistent changes in total solar irradiance can accumulate into climate-scale effects.',
    stem: 'A new direct measurement shows that total solar output has varied by less than 0.2% over the past million years. This finding most weakens:',
    choices: ['Researcher A, because A relies on solar output.', 'Researcher B, because B requires meaningful long-term changes in solar output to drive glacial cycles.', 'both researchers equally.', 'neither researcher.'],
    answer: 1,
    explanation: 'Researcher B\'s case requires solar variability large enough to drive glacial cycles. A 0.2% cap on million-year variation undermines that mechanism. Researcher A does not depend on solar output, so A is not weakened.'
  }
]);
