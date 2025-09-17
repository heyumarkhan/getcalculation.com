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
