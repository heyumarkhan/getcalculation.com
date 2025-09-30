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
  'Kinematics'
];
