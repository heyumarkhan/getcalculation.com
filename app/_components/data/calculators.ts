export interface Calculator {
  id: string;
  name: string;
  description: string;
  category: string;
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
    keywords: ['perimeter', 'rectangle', 'square', 'polygon', 'length', 'width'],
    href: '/perimeter',
    embedHref: '/embed/perimeter',
    icon: '📐',
    color: 'blue'
  },
  {
    id: 'area',
    name: 'Area Calculator',
    description: 'Calculate the area of rectangles, squares, circles, and triangles',
    category: 'Geometry',
    keywords: ['area', 'rectangle', 'square', 'circle', 'triangle', 'surface'],
    href: '/area',
    embedHref: '/embed/area',
    icon: '🔲',
    color: 'green'
  },
  {
    id: 'volume',
    name: 'Volume Calculator',
    description: 'Calculate the volume of cubes, cylinders, and rectangular prisms',
    category: 'Geometry',
    keywords: ['volume', 'cube', 'cylinder', 'prism', '3d', 'space'],
    href: '/volume',
    embedHref: '/embed/volume',
    icon: '📦',
    color: 'purple'
  },
  {
    id: 'standard-form-to-slope-intercept',
    name: 'Standard Form to Slope Intercept',
    description: 'Convert linear equations from Ax + By = C to y = mx + b format',
    category: 'Algebra',
    keywords: ['standard form', 'slope intercept', 'linear equation', 'algebra', 'graphing'],
    href: '/standard-form-to-slope-intercept',
    embedHref: '/embed/standard-form-to-slope-intercept',
    icon: '📈',
    color: 'orange'
  },
  {
    id: 'midpoint',
    name: 'Midpoint Calculator',
    description: 'Calculate the midpoint between two points on a coordinate plane',
    category: 'Geometry',
    keywords: ['midpoint', 'coordinates', 'geometry', 'point', 'center', 'distance'],
    href: '/midpoint',
    embedHref: '/embed/midpoint',
    icon: '📍',
    color: 'blue'
  },
  {
    id: 'line-segment-length',
    name: 'Line Segment Length Calculator',
    description: 'Calculate the distance between two points using the distance formula',
    category: 'Geometry',
    keywords: ['line segment', 'distance', 'coordinates', 'geometry', 'length', 'pythagorean'],
    href: '/line-segment-length',
    embedHref: '/embed/line-segment-length',
    icon: '📏',
    color: 'green'
  },
  {
    id: 'parabola',
    name: 'Parabola Calculator',
    description: 'Find vertex, focus, directrix, and other properties of a parabola from its equation',
    category: 'Algebra',
    keywords: ['parabola', 'vertex', 'focus', 'directrix', 'quadratic', 'conic sections'],
    href: '/parabola',
    embedHref: '/embed/parabola',
    icon: '📈',
    color: 'purple'
  },
  {
    id: 'slope',
    name: 'Slope (Gradient) Calculator',
    description: 'Calculate the slope of a line between two points or from coordinates',
    category: 'Algebra',
    keywords: ['slope', 'gradient', 'line', 'coordinates', 'algebra', 'linear'],
    href: '/slope',
    embedHref: '/embed/slope',
    icon: '📊',
    color: 'orange'
  },
  {
    id: 'triangular-prism-surface-area',
    name: 'Triangular Prism Surface Area Calculator',
    description: 'Calculate the surface area of a triangular prism from its dimensions',
    category: 'Geometry',
    keywords: ['triangular prism', 'surface area', 'geometry', '3d', 'volume', 'prism'],
    href: '/triangular-prism-surface-area',
    embedHref: '/embed/triangular-prism-surface-area',
    icon: '🔺',
    color: 'purple'
  },
  {
    id: 'volume',
    name: 'Volume Calculator',
    description: 'Calculate volume for rectangular prisms and triangular pyramids',
    category: 'Geometry',
    keywords: ['volume', 'rectangular prism', 'triangular pyramid', '3d', 'geometry', 'cubic'],
    href: '/volume',
    embedHref: '/embed/volume',
    icon: '📦',
    color: 'blue'
  }
];

export const categories = [
  'All',
  'Geometry',
  'Algebra',
  'Trigonometry',
  'Statistics',
  'Calculus'
];
