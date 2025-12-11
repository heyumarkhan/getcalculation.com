import React from 'react';
import Link from 'next/link';

interface SEOInternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function SEOInternalLink({ 
  href, 
  children, 
  className = "text-blue-600 hover:text-blue-800 underline",
  title 
}: SEOInternalLinkProps) {
  return (
    <Link 
      href={href} 
      className={className}
      title={title}
    >
      {children}
    </Link>
  );
}

// Predefined internal links for common calculator references
export const INTERNAL_LINKS = {
  area: { href: '/math/area', title: 'Area Calculator' },
  circumference: { href: '/math/circumference', title: 'Circumference Calculator' },
  volume: { href: '/math/volume', title: 'Volume Calculator' },
  perimeter: { href: '/math/perimeter', title: 'Perimeter Calculator' },
  slope: { href: '/math/slope', title: 'Slope Calculator' },
  parabola: { href: '/math/parabola', title: 'Parabola Calculator' },
  diamondProblem: { href: '/math/diamond-problem', title: 'Diamond Problem Solver' },
  crossMultiplication: { href: '/math/cross-multiplication', title: 'Cross Multiplication Calculator' },
  heronsFormula: { href: '/math/herons-formula', title: 'Heron\'s Formula Calculator' },
  similarTriangles: { href: '/math/similar-triangles', title: 'Similar Triangles Calculator' },
  lineSegment: { href: '/math/line-segment-length', title: 'Line Segment Length Calculator' },
  midpoint: { href: '/math/midpoint', title: 'Midpoint Calculator' },
  triangularPrism: { href: '/math/triangular-prism-surface-area', title: 'Triangular Prism Surface Area Calculator' },
  standardForm: { href: '/math/standard-form-to-slope-intercept', title: 'Standard Form to Slope Intercept Calculator' },
  averageRateOfChange: { href: '/math/average-rate-of-change', title: 'Average Rate of Change Calculator' },
  binomialCoefficient: { href: '/math/binomial-coefficient', title: 'Binomial Coefficient Calculator' },
  exponentialFunction: { href: '/math/exponential-function', title: 'Exponential Function Calculator' },
  leastSquaresRegression: { href: '/math/least-squares-regression', title: 'Least Squares Regression Calculator' },
  quotient: { href: '/math/quotient', title: 'Quotient Calculator' },
  sumOfSeries: { href: '/math/sum-of-series', title: 'Sum of Series Calculator' },
  volumeOfHemisphere: { href: '/math/volume-of-hemisphere', title: 'Volume of Hemisphere Calculator' },
  'volume-of-hemisphere': { href: '/math/volume-of-hemisphere', title: 'Volume of Hemisphere Calculator' },
  'cylinder-volume': { href: '/math/cylinder-volume', title: 'Cylinder Volume Calculator' },
  proportion: { href: '/math/proportion', title: 'Proportion Calculator' },
  average: { href: '/math/average', title: 'Average Calculator' },
  percentage: { href: '/math/percentage', title: 'Percentage Calculator' },
  multiplication: { href: '/math/multiplication', title: 'Multiplication Calculator' },
  'triangle-45-45-90': { href: '/math/triangle-45-45-90', title: '45-45-90 Triangle Calculator' },
  'circle-equation': { href: '/math/circle-equation', title: 'Equation of a Circle Calculator' },
  'radius-of-a-circle': { href: '/math/radius-of-a-circle', title: 'Radius of a Circle Calculator' },
  'area-of-a-circle': { href: '/math/area-of-a-circle', title: 'Area of a Circle Calculator' },
  'distance-formula': { href: '/math/distance-formula', title: 'Distance Formula Calculator' },
  'angle-between-two-vectors': { href: '/math/angle-between-two-vectors', title: 'Angle Between Two Vectors Calculator' },
  'diagonal-of-rectangle': { href: '/math/diagonal-of-rectangle', title: 'Diagonal of a Rectangle Calculator' },
  'sphere-volume': { href: '/math/sphere-volume', title: 'Sphere Volume Calculator' },
  'right-triangle': { href: '/math/right-triangle', title: 'Right Triangle Calculator' },
  hexagon: { href: '/math/hexagon', title: 'Hexagon Calculator' },
  octagon: { href: '/math/octagon', title: 'Octagon Calculator' },
  'herons-formula': { href: '/math/herons-formula', title: 'Heron\'s Formula Calculator' },
  'pythagorean-theorem': { href: '/math/pythagorean-theorem', title: 'Pythagorean Theorem Calculator' },
  trigonometry: { href: '/math/trigonometry', title: 'Trigonometry Calculator' },
  remainder: { href: '/math/remainder', title: 'Remainder Calculator' },
  inverseModulo: { href: '/math/inverse-modulo', title: 'Inverse Modulo Calculator' },
  log: { href: '/math/log', title: 'Log Calculator' },
  'percent-error': { href: '/math/percent-error', title: 'Percent Error Calculator' }
} as const;

// Helper function to create internal links
export function createInternalLink(key: keyof typeof INTERNAL_LINKS, text?: string) {
  const link = INTERNAL_LINKS[key];
  return (
    <SEOInternalLink href={link.href} title={link.title}>
      {text || link.title}
    </SEOInternalLink>
  );
}
