/**
 * ACT Math — fill batch 2 (40 more questions).
 * testType: 'ACT', section: 'math'.
 * Concatenates onto window.STL_QUESTIONS_ACT.
 */
'use strict';
window.STL_QUESTIONS_ACT = (window.STL_QUESTIONS_ACT || []).concat([
  // 1. elementary-algebra (easy) - answer A
  {
    id: 'q-actm-fill2-001',
    section: 'math',
    topic: 'elementary-algebra',
    difficulty: 19,
    stem: 'If 4x - 7 = 21, what is the value of x?',
    choices: ['7', '5', '3.5', '8.5', '14'],
    answer: 0,
    explanation: '4x - 7 = 21 -> 4x = 28 -> x = 7 (A). (B) computed (21-7)/... arithmetic slip. (C) divided 21 by 4 ignoring -7 then halved. (D) sign error: (21+7)/... wrong split. (E) divided 28 by 2 instead of 4.'
  },
  // 2. elementary-algebra (medium) - answer B
  {
    id: 'q-actm-fill2-002',
    section: 'math',
    topic: 'elementary-algebra',
    difficulty: 25,
    stem: 'Simplify: 3(2x - 5) - 2(x - 4).',
    choices: ['4x - 23', '4x - 7', '4x + 3', '8x - 7', '6x - 9'],
    answer: 1,
    explanation: '3(2x-5) = 6x - 15; 2(x-4) = 2x - 8; subtract: 6x - 15 - 2x + 8 = 4x - 7 (B). (A) sign error on the -8: -15 - 8 = -23. (C) sign on -15 dropped: +15 - 8 + ... wrong sign. (D) forgot to subtract 2x. (E) distributed 3 only on x.'
  },
  // 3. intermediate-algebra-functions (medium) - answer C
  {
    id: 'q-actm-fill2-003',
    section: 'math',
    topic: 'intermediate-algebra-functions',
    difficulty: 26,
    stem: 'If f(x) = 2x^2 - 3x + 1, what is f(-2)?',
    choices: ['-1', '3', '15', '11', '-15'],
    answer: 2,
    explanation: 'f(-2) = 2(4) - 3(-2) + 1 = 8 + 6 + 1 = 15 (C). (A) treated (-2)^2 as -4: -8 + 6 + 1 = -1. (B) wrong sign on middle: 8 - 6 + 1 = 3. (D) used 2(4) + 3 + ... slip. (E) all signs wrong.'
  },
  // 4. intermediate-algebra-functions (hard) - answer D
  {
    id: 'q-actm-fill2-004',
    section: 'math',
    topic: 'intermediate-algebra-functions',
    difficulty: 25,
    stem: 'If f(x) = x + 3 and g(x) = x^2, what is g(f(2))?',
    choices: ['7', '13', '11', '25', '4'],
    answer: 3,
    explanation: 'f(2) = 5; g(5) = 25 (D). (A) computed f(g(2)): g(2)=4, f(4)=7 (wrong order). (B) g(2)+f(2)+... arithmetic. (C) added f(2)+g(2)+2 confusion. (E) just g(2) = 4.'
  },
  // 5. intermediate-algebra-quadratic (medium) - answer E
  {
    id: 'q-actm-fill2-005',
    section: 'math',
    topic: 'intermediate-algebra-quadratic',
    difficulty: 24,
    stem: 'What are the solutions to x^2 - 5x + 6 = 0?',
    choices: ['x = 1, 6', 'x = -2, -3', 'x = -1, -6', 'x = 5, 6', 'x = 2, 3'],
    answer: 4,
    explanation: '(x-2)(x-3) = 0, so x = 2 or 3 (E). (A) factored as (x-1)(x-6): product 6 but sum 7 not 5. (B) sign error in factoring. (C) sign error on (A). (D) used coefficients directly.'
  },
  // 6. intermediate-algebra-quadratic (hard) - answer A
  {
    id: 'q-actm-fill2-006',
    section: 'math',
    topic: 'intermediate-algebra-quadratic',
    difficulty: 30,
    stem: 'If x^2 + bx + 12 = 0 has roots that differ by 1, and both roots are positive integers, what is b?',
    choices: ['-7', '7', '-8', '8', '-13'],
    answer: 0,
    explanation: 'Positive integer roots multiplying to 12 differing by 1: 3 and 4. Sum = 7, so b = -(sum) = -7 (A). (B) forgot Vieta sign (sum = -b). (C) used pair 4 and 2 (differ by 2). (D) sign error of (C). (E) used pair 1 and 12.'
  },
  // 7. plane-geometry-angles (easy) - answer B
  {
    id: 'q-actm-fill2-007',
    section: 'math',
    topic: 'plane-geometry-angles',
    difficulty: 20,
    stem: 'In a triangle, two angles measure 47 degrees and 68 degrees. What is the measure of the third angle?',
    choices: ['25', '65', '45', '115', '155'],
    answer: 1,
    explanation: '180 - 47 - 68 = 65 (B). (A) arithmetic slip 180-47-... mis-subtract. (C) used 160 instead of 180. (D) added the two given angles: 47+68 = 115 (forgot to subtract from 180). (E) used 270 instead of 180.'
  },
  // 8. plane-geometry-angles (hard) - answer C
  {
    id: 'q-actm-fill2-008',
    section: 'math',
    topic: 'plane-geometry-angles',
    difficulty: 30,
    stem: 'Two parallel lines are cut by a transversal. One of the eight angles formed measures (3x + 10) degrees and a co-interior (same-side interior) angle measures (2x + 30) degrees. What is x?',
    choices: ['8', '20', '28', '32', '52'],
    answer: 2,
    explanation: 'Co-interior angles are supplementary: (3x+10) + (2x+30) = 180 -> 5x + 40 = 180 -> x = 28 (C). (A) used 5x = 40 (forgot 180). (B) treated angles as equal: 3x+10 = 2x+30 -> x = 20. (D) used 90 instead of 180: 5x = 50 + ... arithmetic slip. (E) sign slip: 5x = 220 + 40.'
  },
  // 9. plane-geometry-area (medium) - answer D
  {
    id: 'q-actm-fill2-009',
    section: 'math',
    topic: 'plane-geometry-area',
    difficulty: 23,
    stem: 'A trapezoid has parallel sides of lengths 6 and 10, and height 4. What is its area?',
    choices: ['16', '24', '40', '32', '60'],
    answer: 3,
    explanation: 'Area = (1/2)(b1+b2)(h) = (1/2)(16)(4) = 32 (D). (A) used (1/2)(6+10)/... forgot height factor. (B) 6*4 only one base. (C) 10*4 only one base. (E) 6*10 multiplied bases without (1/2)*h.'
  },
  // 10. plane-geometry-area (medium) - answer E
  {
    id: 'q-actm-fill2-010',
    section: 'math',
    topic: 'plane-geometry-area',
    difficulty: 27,
    stem: 'A rectangle has length 12 and width 5. A second rectangle has length 8 and width 9. Which has the larger area, and by how much?',
    choices: ['First, by 12', 'First, by 4', 'Second, by 4', 'They are equal', 'Second, by 12'],
    answer: 4,
    explanation: 'First area = 60; second = 72; second is larger by 12 (E). (A) right number, wrong rectangle. (B) and (C) used perimeter difference: 34-34 = 0... arithmetic slip producing 4. (D) compared perimeters (both = 34) and concluded equal.'
  },
  // 11. plane-geometry-circumference (easy) - answer A
  {
    id: 'q-actm-fill2-011',
    section: 'math',
    topic: 'plane-geometry-circumference',
    difficulty: 21,
    stem: 'A circle has radius 7. What is its circumference, in terms of pi?',
    choices: ['14pi', '7pi', '49pi', '28pi', '21pi'],
    answer: 0,
    explanation: 'C = 2*pi*r = 14pi (A). (B) used pi*r. (C) computed area pi*r^2. (D) used 2*pi*d (doubled diameter). (E) used 3r.'
  },
  // 12. plane-geometry-circumference (hard) - answer B
  {
    id: 'q-actm-fill2-012',
    section: 'math',
    topic: 'plane-geometry-circumference',
    difficulty: 30,
    stem: 'A circle has circumference 18pi. A 60-degree arc of this circle has what length?',
    choices: ['1.5pi', '3pi', '6pi', '9pi', '60pi'],
    answer: 1,
    explanation: 'Arc length = (60/360)*18pi = (1/6)*18pi = 3pi (B). (A) used 60/720. (C) used 60/180 = 1/3. (D) used 60/120 = 1/2. (E) multiplied 60*pi ignoring fraction.'
  },
  // 13. plane-geometry-pythagoras (easy) - answer C
  {
    id: 'q-actm-fill2-013',
    section: 'math',
    topic: 'plane-geometry-pythagoras',
    difficulty: 20,
    stem: 'A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?',
    choices: ['7.5', '21', '15', '108', '225'],
    answer: 2,
    explanation: '9^2 + 12^2 = 81 + 144 = 225; sqrt(225) = 15 (C). (A) divided 15 by 2. (B) added legs: 9+12 = 21. (D) 9*12 product. (E) forgot square root.'
  },
  // 14. plane-geometry-pythagoras (hard) - answer D
  {
    id: 'q-actm-fill2-014',
    section: 'math',
    topic: 'plane-geometry-pythagoras',
    difficulty: 29,
    stem: 'A right triangle has hypotenuse 13 and one leg 5. What is the length of the other leg?',
    choices: ['8', '18', '194', '12', 'sqrt(194)'],
    answer: 3,
    explanation: '5^2 + b^2 = 169 -> b^2 = 144 -> b = 12 (D). (A) 13-5 = 8 subtraction shortcut. (B) 13+5 = 18. (C) added squares: 25+169 = 194. (E) sqrt of (C).'
  },
  // 15. plane-geometry-volume (medium) - answer E
  {
    id: 'q-actm-fill2-015',
    section: 'math',
    topic: 'plane-geometry-volume',
    difficulty: 24,
    stem: 'A rectangular box has dimensions 4 by 5 by 6. What is its volume?',
    choices: ['15', '60', '74', '148', '120'],
    answer: 4,
    explanation: 'V = 4*5*6 = 120 (E). (A) sum of dims 4+5+6. (B) one face 5*6. (C) partial sub-step in surface area. (D) full surface area 2(20+24+30).'
  },
  // 16. plane-geometry-volume (insane) - answer A
  {
    id: 'q-actm-fill2-016',
    section: 'math',
    topic: 'plane-geometry-volume',
    difficulty: 26,
    stem: 'A right circular cone has radius 6 and height 8. What is its volume, in terms of pi?',
    choices: ['96pi', '32pi', '144pi', '288pi', '48pi'],
    answer: 0,
    explanation: 'V = (1/3)*pi*r^2*h = (1/3)*pi*36*8 = 96pi (A). (B) used (1/3)*r*h*pi without squaring r. (C) used (1/2) factor instead of (1/3). (D) full cylinder pi*r^2*h. (E) used (1/3)*r^2*h/... slip.'
  },
  // 17. coordinate-geometry-circle (medium) - answer B
  {
    id: 'q-actm-fill2-017',
    section: 'math',
    topic: 'coordinate-geometry-circle',
    difficulty: 26,
    stem: 'What is the equation of a circle centered at (3, -2) with radius 5?',
    choices: ['(x+3)^2 + (y-2)^2 = 25', '(x-3)^2 + (y+2)^2 = 25', '(x-3)^2 + (y+2)^2 = 5', '(x+3)^2 + (y+2)^2 = 25', '(x-3)^2 + (y-2)^2 = 25'],
    answer: 1,
    explanation: 'Standard form: (x-h)^2 + (y-k)^2 = r^2 with (h,k)=(3,-2), r=5: (x-3)^2 + (y+2)^2 = 25 (B). (A) flipped both signs. (C) used r not r^2. (D) sign error on x. (E) sign error on y.'
  },
  // 18. coordinate-geometry-circle (hard) - answer C
  {
    id: 'q-actm-fill2-018',
    section: 'math',
    topic: 'coordinate-geometry-circle',
    difficulty: 32,
    stem: 'The equation x^2 + y^2 - 6x + 8y = 0 represents a circle. What is its radius?',
    choices: ['sqrt(7)', '7', '5', '10', '25'],
    answer: 2,
    explanation: 'Complete the square: (x-3)^2 - 9 + (y+4)^2 - 16 = 0 -> (x-3)^2 + (y+4)^2 = 25, so r = 5 (C). (A) computed sqrt of partial sum. (B) computed 3+4. (D) doubled the radius. (E) gave r^2.'
  },
  // 19. coordinate-geometry-midpoint (easy) - answer D
  {
    id: 'q-actm-fill2-019',
    section: 'math',
    topic: 'coordinate-geometry-midpoint',
    difficulty: 19,
    stem: 'What is the midpoint of the segment with endpoints (2, 5) and (8, -1)?',
    choices: ['(10, 4)', '(3, 3)', '(6, -6)', '(5, 2)', '(5, 3)'],
    answer: 3,
    explanation: 'Midpoint: ((2+8)/2, (5+(-1))/2) = (5, 2) (D). (A) sum without dividing. (B) added then divided wrong. (C) used differences instead of sums. (E) y arithmetic slip: (5-(-1))/2 = 3.'
  },
  // 20. coordinate-geometry-midpoint (medium) - answer E
  {
    id: 'q-actm-fill2-020',
    section: 'math',
    topic: 'coordinate-geometry-midpoint',
    difficulty: 27,
    stem: 'The midpoint of segment AB is (4, -1). If A is (1, 5), what are the coordinates of B?',
    choices: ['(2.5, 2)', '(7, 7)', '(3, -6)', '(5, 4)', '(7, -7)'],
    answer: 4,
    explanation: 'Midpoint M = ((1+Bx)/2, (5+By)/2) = (4, -1) -> Bx = 7, By = -7. So B = (7, -7) (E). (A) gave the midpoint values not B. (B) sign error on y. (C) computed M-A = (3,-6) (the half-vector, not B). (D) added (4,5) wrong direction.'
  },
  // 21. coordinate-geometry-slope (medium) - answer A
  {
    id: 'q-actm-fill2-021',
    section: 'math',
    topic: 'coordinate-geometry-slope',
    difficulty: 23,
    stem: 'What is the slope of the line through (2, 3) and (6, 11)?',
    choices: ['2', '0.5', '-2', '4', '8'],
    answer: 0,
    explanation: 'm = (11-3)/(6-2) = 8/4 = 2 (A). (B) inverted: dx/dy = 4/8. (C) sign error. (D) only computed dx. (E) only computed dy.'
  },
  // 22. coordinate-geometry-slope (hard) - answer B
  {
    id: 'q-actm-fill2-022',
    section: 'math',
    topic: 'coordinate-geometry-slope',
    difficulty: 30,
    stem: 'Line L has equation 3x - 4y = 12. What is the slope of a line perpendicular to L?',
    choices: ['\\frac{3}{4}', '\\frac{-4}{3}', '\\frac{4}{3}', '\\frac{-3}{4}', '-3'],
    answer: 1,
    explanation: 'Slope of L: 3x-4y=12 -> y = (3/4)x - 3, slope = 3/4. Perpendicular slope = -4/3 (B). (A) gave the slope of L itself. (C) reciprocal without sign change. (D) negated original. (E) used coefficient -3 from constant.'
  },
  // 23. pre-algebra-percent (easy) - answer C
  {
    id: 'q-actm-fill2-023',
    section: 'math',
    topic: 'pre-algebra-percent',
    difficulty: 18,
    stem: 'What is 25% of 80?',
    choices: ['15', '25', '20', '40', '320'],
    answer: 2,
    explanation: '0.25 * 80 = 20 (C). (A) miscomputed 80/... slip. (B) confused with 25 itself. (D) used 50%. (E) divided 80/0.25 instead of multiplying.'
  },
  // 24. pre-algebra-percent (medium) - answer D
  {
    id: 'q-actm-fill2-024',
    section: 'math',
    topic: 'pre-algebra-percent',
    difficulty: 26,
    stem: 'A shirt originally priced at $40 is on sale for 30% off. What is the sale price?',
    choices: ['$12', '$10', '$30', '$28', '$52'],
    answer: 3,
    explanation: '30% of 40 = 12 discount; 40 - 12 = $28 (D). (A) gave the discount, not the sale price. (B) used 25% instead of 30%. (C) subtracted $10 (used 25% then rounded). (E) added discount instead of subtracting.'
  },
  // 25. pre-algebra-ratios (medium) - answer E
  {
    id: 'q-actm-fill2-025',
    section: 'math',
    topic: 'pre-algebra-ratios',
    difficulty: 24,
    stem: 'In a class, the ratio of girls to boys is 3:5. If there are 24 students total, how many girls are in the class?',
    choices: ['15', '8', '12', '3', '9'],
    answer: 4,
    explanation: 'Total parts = 8; each part = 24/8 = 3; girls = 3*3 = 9 (E). (A) gave boys. (B) divided 24 by 3. (C) used 1:1 split. (D) gave one part only.'
  },
  // 26. pre-algebra-ratios (hard) - answer A
  {
    id: 'q-actm-fill2-026',
    section: 'math',
    topic: 'pre-algebra-ratios',
    difficulty: 23,
    stem: 'A recipe uses sugar and flour in a ratio of 2:7. If 21 cups of flour are used, how many cups of sugar are needed?',
    choices: ['6', '3', '4.5', '14', '9'],
    answer: 0,
    explanation: '2/7 = s/21 -> s = 6 (A). (B) used 1:7 ratio. (C) used 21/... half. (D) inverted: 21*(2/3). (E) used 21*3/7.'
  },
  // 27. sequences (medium) - answer B
  {
    id: 'q-actm-fill2-027',
    section: 'math',
    topic: 'sequences',
    difficulty: 25,
    stem: 'What is the 10th term of the arithmetic sequence 4, 7, 10, 13, ...?',
    choices: ['28', '31', '34', '37', '40'],
    answer: 1,
    explanation: 'a_n = 4 + (n-1)*3; a_10 = 4 + 27 = 31 (B). (A) used n-2: 4+24. (C) used n=10 instead of n-1: 4+30. (D) 4+11*3 (off-by-one the other way). (E) used common difference 4: 4+9*4.'
  },
  // 28. sequences (hard) - answer C
  {
    id: 'q-actm-fill2-028',
    section: 'math',
    topic: 'sequences',
    difficulty: 31,
    stem: 'In a geometric sequence, the first term is 3 and the common ratio is 2. What is the 6th term?',
    choices: ['32', '64', '96', '192', '48'],
    answer: 2,
    explanation: 'a_n = 3 * 2^(n-1); a_6 = 3*2^5 = 3*32 = 96 (C). (A) just 2^5 alone. (B) used 2^6 alone. (D) used 3*2^6 (off-by-one). (E) used 3*2^4.'
  },
  // 29. log (hard) - answer D
  {
    id: 'q-actm-fill2-029',
    section: 'math',
    topic: 'log',
    difficulty: 22,
    stem: 'What is the value of log_2(32)?',
    choices: ['4', '6', '16', '5', '32'],
    answer: 3,
    explanation: '2^5 = 32, so log_2(32) = 5 (D). (A) 2^4 = 16 off-by-one. (B) 2^6 = 64 off-by-one other way. (C) gave half of 32. (E) gave the argument.'
  },
  // 30. log (insane) - answer E
  {
    id: 'q-actm-fill2-030',
    section: 'math',
    topic: 'log',
    difficulty: 28,
    stem: 'If log(x) + log(4) = log(20), what is x? (All logs are base 10.)',
    choices: ['16', '24', '80', '4', '5'],
    answer: 4,
    explanation: 'log(4x) = log(20) -> 4x = 20 -> x = 5 (E). (A) subtracted: 20-4. (B) added: 20+4. (C) multiplied: 20*4. (D) gave the multiplier itself.'
  },
  // 31. evaluate-function (easy) - answer A
  {
    id: 'q-actm-fill2-031',
    section: 'math',
    topic: 'evaluate-function',
    difficulty: 21,
    stem: 'If f(x) = 3x - 4, what is f(5)?',
    choices: ['11', '15', '19', '7', '-1'],
    answer: 0,
    explanation: 'f(5) = 3(5) - 4 = 15 - 4 = 11 (A). (B) forgot the -4. (C) added 4 instead of subtracting. (D) computed 3+4 then... slip. (E) computed 3-4.'
  },
  // 32. evaluate-function (hard) - answer B
  {
    id: 'q-actm-fill2-032',
    section: 'math',
    topic: 'evaluate-function',
    difficulty: 24,
    stem: 'If h(x) = \\frac{x^2 + 1}{x - 2}, what is h(3)?',
    choices: ['5', '10', '2', '8', '-10'],
    answer: 1,
    explanation: 'h(3) = (9+1)/(3-2) = 10/1 = 10 (B). (A) used (9+1)/2 with denominator 2. (C) (9-7)/... slip. (D) (9-1)/1. (E) sign error in denominator: 1/(2-3) = -1 then 10*(-1).'
  },
  // 33. algebra-exponents (medium) - answer C
  {
    id: 'q-actm-fill2-033',
    section: 'math',
    topic: 'algebra-exponents',
    difficulty: 24,
    stem: 'Simplify: (2x^3)(5x^4).',
    choices: ['10x^12', '7x^7', '10x^7', '7x^12', '10x^1'],
    answer: 2,
    explanation: 'Multiply coefficients: 10. Add exponents: x^(3+4) = x^7. Result: 10x^7 (C). (A) multiplied exponents 3*4 instead of adding. (B) added coefficients 2+5. (D) added coefficients and multiplied exponents. (E) subtracted exponents.'
  },
  // 34. algebra-exponents (insane) - answer D
  {
    id: 'q-actm-fill2-034',
    section: 'math',
    topic: 'algebra-exponents',
    difficulty: 27,
    stem: 'Simplify: (8x^6 / 2x^2)^2.',
    choices: ['16x^16', '4x^8', '64x^8', '16x^8', '16x^4'],
    answer: 3,
    explanation: 'Inside: 8/2 = 4, x^(6-2) = x^4. So 4x^4. Square: 16x^8 (D). (A) used x^(4*4) for the squaring. (B) forgot to square coefficient. (C) squared 8 not 4. (E) forgot to square the exponent.'
  },
  // 35. algebra-systems (medium) - answer E
  {
    id: 'q-actm-fill2-035',
    section: 'math',
    topic: 'algebra-systems',
    difficulty: 27,
    stem: 'What is the solution (x, y) to the system: 2x + y = 7 and x - y = 2?',
    choices: ['(1, 3)', '(2, 3)', '(3, -1)', '(5, -3)', '(3, 1)'],
    answer: 4,
    explanation: 'Add: 3x = 9 -> x = 3; then y = x - 2 = 1. So (3, 1) (E). (A) swapped x and y. (B) miscomputed first equation. (C) sign error on y. (D) used subtraction wrong way.'
  },
  // 36. algebra-systems (hard) - answer A
  {
    id: 'q-actm-fill2-036',
    section: 'math',
    topic: 'algebra-systems',
    difficulty: 26,
    stem: 'What is x in the system: 3x + 2y = 16 and 5x - 2y = 16?',
    choices: ['4', '2', '8', '0', '6'],
    answer: 0,
    explanation: 'Add equations: 8x = 32 -> x = 4 (A). (B) divided 16 by 8 incorrectly. (C) added wrong: 8x = 64. (D) subtracted equations: -2x = 0 (sign distractor). (E) arithmetic slip 16-10.'
  },
  // 37. algebra-inequality (medium) - answer B
  {
    id: 'q-actm-fill2-037',
    section: 'math',
    topic: 'algebra-inequality',
    difficulty: 25,
    stem: 'Solve for x: -3x + 5 > 14.',
    choices: ['x > -3', 'x < -3', 'x < 3', 'x > 3', 'x < -19/3'],
    answer: 1,
    explanation: '-3x > 9 -> x < -3 (flip inequality when dividing by negative) (B). (A) forgot to flip. (C) forgot the negative sign on -3x. (D) (A) and (C) combined. (E) used -3x > 19 (added 5 instead of subtracting).'
  },
  // 38. algebra-inequality (insane) - answer C
  {
    id: 'q-actm-fill2-038',
    section: 'math',
    topic: 'algebra-inequality',
    difficulty: 34,
    stem: 'For how many integer values of x is |x - 4| < 5?',
    choices: ['10', '5', '9', '11', '4'],
    answer: 2,
    explanation: '|x-4| < 5 means -5 < x-4 < 5, so -1 < x < 9. Integers: 0,1,2,3,4,5,6,7,8 = 9 values (C). (A) included 9: 0..9 = 10. (B) just counted up to 5. (D) included both endpoints: -1..9 = 11. (E) used 4 from center.'
  },
  // 39. trig-basic (medium) - answer D
  {
    id: 'q-actm-fill2-039',
    section: 'math',
    topic: 'trig-basic',
    difficulty: 21,
    stem: 'In a right triangle, the side opposite angle A has length 3 and the hypotenuse has length 5. What is sin(A)?',
    choices: ['\\frac{4}{5}', '\\frac{3}{4}', '\\frac{5}{3}', '\\frac{3}{5}', '\\frac{4}{3}'],
    answer: 3,
    explanation: 'sin = opposite/hypotenuse = 3/5 (D). (A) cos(A) using adjacent (4) over hypotenuse. (B) tan(A) = opp/adj. (C) inverted sin: hyp/opp. (E) inverted tan.'
  },
  // 40. trig-basic (hard) - answer E
  {
    id: 'q-actm-fill2-040',
    section: 'math',
    topic: 'trig-basic',
    difficulty: 31,
    stem: 'In a right triangle, cos(theta) = 5/13. If theta is acute, what is sin(theta)?',
    choices: ['\\frac{13}{12}', '\\frac{5}{12}', '\\frac{12}{5}', '\\frac{8}{13}', '\\frac{12}{13}'],
    answer: 4,
    explanation: 'sin^2 + cos^2 = 1 -> sin^2 = 1 - 25/169 = 144/169; sin = 12/13 (since acute) (E). (A) inverted answer. (B) used tan = opp/adj inverted. (C) gave tan(theta). (D) used 13-5 = 8 subtraction error instead of Pythagoras.'
  }
]);
