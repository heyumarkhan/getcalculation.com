export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
  subject: string; // 'math', 'physics', etc.
  keywords: string[];
  href: string;
  embedHref: string;
  icon: string;
  color: string;
}

export const calculators: Calculator[] = [
  {
    id: 'perimeter',
    name: 'Perimeter Calculator',
    description: 'Calculate the perimeter of rectangles, squares, and other polygons',
    category: 'Geometry',
    subject: 'math',
    keywords: ['perimeter', 'rectangle', 'square', 'polygon', 'length', 'width'],
    href: '/math/perimeter',
    embedHref: '/embed/math/perimeter',
    icon: '📐',
    color: 'blue'
  },
  {
    id: 'area',
    name: 'Area Calculator',
    description: 'Calculate the area of rectangles, squares, circles, and triangles',
    category: 'Geometry',
    subject: 'math',
    keywords: ['area', 'rectangle', 'square', 'circle', 'triangle', 'surface'],
    href: '/math/area',
    embedHref: '/embed/math/area',
    icon: '🔲',
    color: 'green'
  },
  {
    id: 'standard-form-to-slope-intercept',
    name: 'Standard Form to Slope Intercept',
    description: 'Convert linear equations from Ax + By = C to y = mx + b format',
    category: 'Algebra',
    subject: 'math',
    keywords: ['standard form', 'slope intercept', 'linear equation', 'algebra', 'graphing'],
    href: '/math/standard-form-to-slope-intercept',
    embedHref: '/embed/math/standard-form-to-slope-intercept',
    icon: '📈',
    color: 'orange'
  },
  {
    id: 'midpoint',
    name: 'Midpoint Calculator',
    description: 'Calculate the midpoint between two points on a coordinate plane',
    category: 'Geometry',
    subject: 'math',
    keywords: ['midpoint', 'coordinates', 'geometry', 'point', 'center', 'distance'],
    href: '/math/midpoint',
    embedHref: '/embed/math/midpoint',
    icon: '📍',
    color: 'blue'
  },
  {
    id: 'line-segment-length',
    name: 'Line Segment Length Calculator',
    description: 'Calculate the distance between two points using the distance formula',
    category: 'Geometry',
    subject: 'math',
    keywords: ['line segment', 'distance', 'coordinates', 'geometry', 'length', 'pythagorean'],
    href: '/math/line-segment-length',
    embedHref: '/embed/math/line-segment-length',
    icon: '📏',
    color: 'green'
  },
  {
    id: 'parabola',
    name: 'Parabola Calculator',
    description: 'Find vertex, focus, directrix, and other properties of a parabola from its equation',
    category: 'Algebra',
    subject: 'math',
    keywords: ['parabola', 'vertex', 'focus', 'directrix', 'quadratic', 'conic sections'],
    href: '/math/parabola',
    embedHref: '/embed/math/parabola',
    icon: '📈',
    color: 'purple'
  },
  {
    id: 'slope',
    name: 'Slope (Gradient) Calculator',
    description: 'Calculate the slope of a line between two points or from coordinates',
    category: 'Algebra',
    subject: 'math',
    keywords: ['slope', 'gradient', 'line', 'coordinates', 'algebra', 'linear'],
    href: '/math/slope',
    embedHref: '/embed/math/slope',
    icon: '📊',
    color: 'orange'
  },
  {
    id: 'triangular-prism-surface-area',
    name: 'Triangular Prism Surface Area Calculator',
    description: 'Calculate the surface area of a triangular prism from its dimensions',
    category: 'Geometry',
    subject: 'math',
    keywords: ['triangular prism', 'surface area', 'geometry', '3d', 'volume', 'prism'],
    href: '/math/triangular-prism-surface-area',
    embedHref: '/embed/math/triangular-prism-surface-area',
    icon: '🔺',
    color: 'purple'
  },
  {
    id: 'volume',
    name: 'Volume Calculator',
    description: 'Calculate volume for rectangular prisms and triangular pyramids',
    category: 'Geometry',
    subject: 'math',
    keywords: ['volume', 'rectangular prism', 'triangular pyramid', '3d', 'geometry', 'cubic'],
    href: '/math/volume',
    embedHref: '/embed/math/volume',
    icon: '📦',
    color: 'blue'
  },
  {
    id: 'similar-triangles',
    name: 'Similar Triangles Calculator',
    description: 'Find missing sides of similar triangles using proportions and scale factors',
    category: 'Geometry',
    subject: 'math',
    keywords: ['similar triangles', 'proportions', 'scale factor', 'geometry', 'triangles', 'ratio'],
    href: '/math/similar-triangles',
    embedHref: '/embed/math/similar-triangles',
    icon: '🔺',
    color: 'green'
  },
  {
    id: 'herons-formula',
    name: 'Heron\'s Formula Calculator',
    description: 'Calculate triangle area using Heron\'s formula when you know all three side lengths',
    category: 'Geometry',
    subject: 'math',
    keywords: ['herons formula', 'triangle area', 'geometry', 'sides', 'semi-perimeter', 'triangle'],
    href: '/math/herons-formula',
    embedHref: '/embed/math/herons-formula',
    icon: '📐',
    color: 'purple'
  },
  {
    id: 'diamond-problem',
    name: 'Diamond Problem Solver',
    description: 'Find two numbers that add to a given sum and multiply to a given product',
    category: 'Algebra',
    subject: 'math',
    keywords: ['diamond problem', 'algebra', 'quadratic', 'sum', 'product', 'factoring', 'solving'],
    href: '/math/diamond-problem',
    embedHref: '/embed/math/diamond-problem',
    icon: '💎',
    color: 'pink'
  },
  {
    id: 'cross-multiplication',
    name: 'Cross Multiplication Calculator',
    description: 'Solve proportions using cross multiplication to find missing values in ratios',
    category: 'Algebra',
    subject: 'math',
    keywords: ['cross multiplication', 'proportions', 'ratios', 'algebra', 'fractions', 'solving'],
    href: '/math/cross-multiplication',
    embedHref: '/embed/math/cross-multiplication',
    icon: '✖️',
    color: 'orange'
  },
  {
    id: 'velocity-calculator',
    name: 'Velocity Calculator',
    description: 'Calculate velocity, speed, distance, and time using physics formulas',
    category: 'Kinematics',
    subject: 'physics',
    keywords: ['velocity', 'speed', 'distance', 'time', 'physics', 'kinematics', 'motion'],
    href: '/physics/velocity-calculator',
    embedHref: '/embed/physics/velocity-calculator',
    icon: '🏃',
    color: 'blue'
  },
  {
    id: 'exponential-function',
    name: 'Exponential Function Calculator',
    description: 'Calculate exponential functions, growth, decay, and compound interest',
    category: 'Algebra',
    subject: 'math',
    keywords: ['exponential', 'function', 'growth', 'decay', 'compound interest', 'e', 'logarithm', 'algebra'],
    href: '/math/exponential-function',
    embedHref: '/embed/math/exponential-function',
    icon: '📈',
    color: 'green'
  },
  {
    id: 'standard-notation',
    name: 'Standard Notation Calculator',
    description: 'Convert between scientific notation and standard form, expand and simplify numbers',
    category: 'Algebra',
    subject: 'math',
    keywords: ['standard notation', 'scientific notation', 'expanded form', 'number conversion', 'decimal', 'exponent', 'algebra'],
    href: '/math/standard-notation',
    embedHref: '/embed/math/standard-notation',
    icon: '🔢',
    color: 'purple'
  },
  {
    id: 'round-to-nearest-cent',
    name: 'Round to Nearest Cent Calculator',
    description: 'Round decimal numbers to the nearest cent (2 decimal places) for currency calculations',
    category: 'Algebra',
    subject: 'math',
    keywords: ['round to nearest cent', 'currency rounding', 'decimal rounding', 'money calculations', 'financial math', 'rounding rules'],
    href: '/math/round-to-nearest-cent',
    embedHref: '/embed/math/round-to-nearest-cent',
    icon: '💰',
    color: 'green'
  },
  {
    id: 'inverse-modulo',
    name: 'Inverse Modulo Calculator',
    description: 'Calculate the modular multiplicative inverse of a number modulo n using the extended Euclidean algorithm',
    category: 'Algebra',
    subject: 'math',
    keywords: ['inverse modulo', 'modular inverse', 'extended euclidean algorithm', 'number theory', 'cryptography', 'discrete mathematics'],
    href: '/math/inverse-modulo',
    embedHref: '/embed/math/inverse-modulo',
    icon: '🔄',
    color: 'blue'
  },
  {
    id: 'triangular-pyramid-volume',
    name: 'Triangular Pyramid Volume Calculator',
    description: 'Calculate the volume of a triangular pyramid (tetrahedron) from base area and height or side lengths',
    category: 'Geometry',
    subject: 'math',
    keywords: ['triangular pyramid', 'tetrahedron', 'volume', 'geometry', '3d shapes', 'pyramid volume', 'triangular base'],
    href: '/math/triangular-pyramid-volume',
    embedHref: '/embed/math/triangular-pyramid-volume',
    icon: '🔺',
    color: 'orange'
  },
  {
    id: 'average-rate-of-change',
    name: 'Average Rate of Change Calculator',
    description: 'Calculate the average rate of change of a function between two points using the slope formula',
    category: 'Calculus',
    subject: 'math',
    keywords: ['average rate of change', 'slope', 'calculus', 'derivative', 'function', 'change rate', 'secant line'],
    href: '/math/average-rate-of-change',
    embedHref: '/embed/math/average-rate-of-change',
    icon: '📈',
    color: 'purple'
  },
  {
    id: 'quotient',
    name: 'Quotient Calculator',
    description: 'Calculate the quotient and remainder when dividing two numbers with step-by-step results',
    category: 'Algebra',
    subject: 'math',
    keywords: ['quotient', 'division', 'remainder', 'dividend', 'divisor', 'algebra', 'arithmetic', 'long division'],
    href: '/math/quotient',
    embedHref: '/embed/math/quotient',
    icon: '➗',
    color: 'blue'
  },
  {
    id: 'volume-of-hemisphere',
    name: 'Volume of Hemisphere Calculator',
    description: 'Calculate the volume of a hemisphere using the radius with step-by-step calculations',
    category: 'Geometry',
    subject: 'math',
    keywords: ['hemisphere volume', 'sphere volume', 'radius', 'geometry', '3d shapes', 'volume formula', 'semicircle'],
    href: '/math/volume-of-hemisphere',
    embedHref: '/embed/math/volume-of-hemisphere',
    icon: '🌗',
    color: 'purple'
  },
  {
    id: 'least-squares-regression',
    name: 'Least Squares Regression Calculator',
    description: 'Calculate linear regression using least squares method. Find best-fit line, correlation coefficient, and make predictions',
    category: 'Statistics',
    subject: 'math',
    keywords: ['least squares regression', 'linear regression', 'correlation coefficient', 'r-squared', 'best fit line', 'statistics', 'prediction', 'data analysis'],
    href: '/math/least-squares-regression',
    embedHref: '/embed/math/least-squares-regression',
    icon: '📊',
    color: 'blue'
  },
  {
    id: 'binomial-coefficient',
    name: 'Binomial Coefficient Calculator',
    description: 'Calculate binomial coefficients C(n,k) for combinations. Find the number of ways to choose k items from n items',
    category: 'Combinatorics',
    subject: 'math',
    keywords: ['binomial coefficient', 'combinations', 'factorial', 'combinatorics', 'C(n,k)', 'choose', 'counting', 'permutations'],
    href: '/math/binomial-coefficient',
    embedHref: '/embed/math/binomial-coefficient',
    icon: '🔢',
    color: 'purple'
  },
  {
    id: 'greater-than-or-less-than',
    name: 'Greater Than Or Less Than Calculator',
    description: 'Compare two numbers to determine which is greater, less than, or equal to the other',
    category: 'Algebra',
    subject: 'math',
    keywords: ['greater than', 'less than', 'equal to', 'comparison', 'inequality', 'algebra', 'numbers', 'compare'],
    href: '/math/greater-than-or-less-than',
    embedHref: '/embed/math/greater-than-or-less-than',
    icon: '⚖️',
    color: 'orange'
  },
  {
    id: 'sum-of-series',
    name: 'Sum of Series Calculator',
    description: 'Calculate the sum of arithmetic, geometric, and custom series with step-by-step solutions',
    category: 'Algebra',
    subject: 'math',
    keywords: ['sum of series', 'arithmetic series', 'geometric series', 'series sum', 'sequence', 'algebra', 'calculus', 'mathematical series'],
    href: '/math/sum-of-series',
    embedHref: '/embed/math/sum-of-series',
    icon: '∑',
    color: 'purple'
  },
  {
    id: 'proportion',
    name: 'Proportion Calculator',
    description: 'Solve proportions, check if ratios are proportional, or calculate scale factors with step-by-step solutions',
    category: 'Algebra',
    subject: 'math',
    keywords: ['proportion calculator', 'ratio calculator', 'scale factor', 'cross multiplication', 'algebra', 'mathematical proportions', 'solving proportions'],
    href: '/math/proportion',
    embedHref: '/embed/math/proportion',
    icon: '⚖️',
    color: 'green'
  },
  {
    id: 'semicircle-area',
    name: 'Semicircle Area Calculator',
    description: 'Calculate the area of a semicircle using radius, diameter, or circumference with step-by-step solutions',
    category: 'Geometry',
    subject: 'math',
    keywords: ['semicircle area', 'half circle area', 'radius', 'diameter', 'circumference', 'geometry', 'circle area', 'mathematical shapes'],
    href: '/math/semicircle-area',
    embedHref: '/embed/math/semicircle-area',
    icon: '🌗',
    color: 'blue'
  },
  {
    id: 'gcf',
    name: 'GCF Calculator - Greatest Common Factor',
    description: 'Find the greatest common factor of two or more numbers using the Euclidean algorithm with step-by-step solutions',
    category: 'Algebra',
    subject: 'math',
    keywords: ['gcf', 'greatest common factor', 'gcd', 'highest common factor', 'euclidean algorithm', 'factors', 'divisibility', 'number theory'],
    href: '/math/gcf',
    embedHref: '/embed/math/gcf',
    icon: '🔢',
    color: 'green'
  },
  {
    id: 'triangle-45-45-90',
    name: '45-45-90 Triangle Calculator',
    description: 'Calculate sides, area, and perimeter of a 45-45-90 triangle (isosceles right triangle) with step-by-step solutions',
    category: 'Geometry',
    subject: 'math',
    keywords: ['45-45-90 triangle', 'isosceles right triangle', 'special right triangle', 'geometry', 'trigonometry', 'pythagorean theorem', 'triangle calculator'],
    href: '/math/triangle-45-45-90',
    embedHref: '/embed/math/triangle-45-45-90',
    icon: '📐',
    color: 'blue'
  },
  {
    id: 'geometric-sequence',
    name: 'Geometric Sequence Calculator',
    description: 'Calculate the nth term and sum of a geometric sequence with step-by-step solutions and sequence visualization',
    category: 'Algebra',
    subject: 'math',
    keywords: ['geometric sequence', 'geometric series', 'common ratio', 'nth term', 'sequence sum', 'algebra', 'mathematical sequences', 'series calculator'],
    href: '/math/geometric-sequence',
    embedHref: '/embed/math/geometric-sequence',
    icon: '📊',
    color: 'purple'
  },
  {
    id: 'point-slope-form',
    name: 'Point Slope Form Calculator',
    description: 'Convert between point-slope form, slope-intercept form, and standard form of linear equations with step-by-step solutions',
    category: 'Algebra',
    subject: 'math',
    keywords: ['point slope form', 'slope intercept form', 'standard form', 'linear equation', 'slope', 'algebra', 'graphing', 'line equation'],
    href: '/math/point-slope-form',
    embedHref: '/embed/math/point-slope-form',
    icon: '📈',
    color: 'orange'
  },
  {
    id: 'circle-equation',
    name: 'Equation of a Circle Calculator',
    description: 'Find the equation of a circle from center and radius, or from three points on the circle with step-by-step solutions',
    category: 'Geometry',
    subject: 'math',
    keywords: ['circle equation', 'equation of circle', 'standard form', 'general form', 'center radius', 'three points', 'geometry', 'conic sections'],
    href: '/math/circle-equation',
    embedHref: '/embed/math/circle-equation',
    icon: '⭕',
    color: 'blue'
  },
  {
    id: 'pythagorean-theorem',
    name: 'Pythagorean Theorem Calculator',
    description: 'Calculate the length of any side of a right triangle using the Pythagorean theorem with step-by-step solutions',
    category: 'Geometry',
    subject: 'math',
    keywords: ['pythagorean theorem', 'right triangle', 'hypotenuse', 'legs', 'geometry', 'triangle', 'a² + b² = c²', 'distance formula'],
    href: '/math/pythagorean-theorem',
    embedHref: '/embed/math/pythagorean-theorem',
    icon: '🔺',
    color: 'red'
  },
  {
    id: 'arc-length',
    name: 'Arc Length Calculator',
    description: 'Calculate the length of an arc using radius and central angle with step-by-step solutions',
    category: 'Geometry',
    subject: 'math',
    keywords: ['arc length', 'circle', 'radius', 'central angle', 'geometry', 'circumference', 'sector', 'arc formula'],
    href: '/math/arc-length',
    embedHref: '/embed/math/arc-length',
    icon: '🔄',
    color: 'blue'
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage changes, and percentage relationships with step-by-step solutions',
    category: 'Algebra',
    subject: 'math',
    keywords: ['percentage calculator', 'percentage change', 'percentage increase', 'percentage decrease', 'percentage of', 'math calculator', 'algebra'],
    href: '/math/percentage',
    embedHref: '/embed/math/percentage',
    icon: '📊',
    color: 'purple'
  },
  {
    id: 'average',
    name: 'Average Calculator',
    description: 'Calculate arithmetic, geometric, harmonic, and weighted averages with step-by-step solutions',
    category: 'Statistics',
    subject: 'math',
    keywords: ['average calculator', 'arithmetic mean', 'geometric mean', 'harmonic mean', 'weighted average', 'math calculator', 'statistics'],
    href: '/math/average',
    embedHref: '/embed/math/average',
    icon: '📈',
    color: 'green'
  },
  {
    id: 'decimal-to-percent',
    name: 'Decimal to Percent Calculator',
    description: 'Convert between decimals, percentages, and fractions with step-by-step solutions',
    category: 'Algebra',
    subject: 'math',
    keywords: ['decimal to percent calculator', 'percent to decimal calculator', 'fraction to percent calculator', 'percent to fraction calculator', 'decimal converter', 'math calculator'],
    href: '/math/decimal-to-percent',
    embedHref: '/embed/math/decimal-to-percent',
    icon: '🔄',
    color: 'blue'
  },
  {
    id: 'trigonometry',
    name: 'Trigonometry Calculator',
    description: 'Calculate all six trigonometric functions (sin, cos, tan, csc, sec, cot) for any angle in degrees or radians',
    category: 'Trigonometry',
    subject: 'math',
    keywords: ['trigonometry calculator', 'sin cos tan', 'trigonometric functions', 'angle calculator', 'sine cosine tangent', 'csc sec cot', 'radians degrees'],
    href: '/math/trigonometry',
    embedHref: '/embed/math/trigonometry',
    icon: '📐',
    color: 'purple'
  },
  {
    id: 'right-triangle',
    name: 'Right Triangle Side and Angle Calculator',
    description: 'Calculate missing sides and angles in right triangles using Pythagorean theorem and trigonometry',
    category: 'Geometry',
    subject: 'math',
    keywords: ['right triangle calculator', 'pythagorean theorem', 'triangle sides', 'triangle angles', 'hypotenuse', 'legs', 'trigonometry', 'geometry'],
    href: '/math/right-triangle',
    embedHref: '/embed/math/right-triangle',
    icon: '🔺',
    color: 'green'
  }
];

export const subjects = [
  'All',
  'Math',
  'Physics'
];

export const categories = [
  'All',
  'Geometry',
  'Algebra',
  'Trigonometry',
  'Statistics',
  'Calculus',
  'Kinematics',
  'Combinatorics'
];
