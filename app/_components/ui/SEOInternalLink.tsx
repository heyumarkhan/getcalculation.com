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
  'similar-triangles': { href: '/math/similar-triangles', title: 'Similar Triangles Calculator' },
  isoscelesTriangle: { href: '/math/isosceles-triangle', title: 'Isosceles Triangle Calculator' },
  'isosceles-triangle': { href: '/math/isosceles-triangle', title: 'Isosceles Triangle Calculator' },
  lineSegment: { href: '/math/line-segment-length', title: 'Line Segment Length Calculator' },
  midpoint: { href: '/math/midpoint', title: 'Midpoint Calculator' },
  triangularPrism: { href: '/math/triangular-prism-surface-area', title: 'Triangular Prism Surface Area Calculator' },
  'triangular-prism': { href: '/math/triangular-prism-surface-area', title: 'Triangular Prism Calculator' },
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
  'polygon': { href: '/math/polygon', title: 'Polygon Calculator' },
  'rectangular-prism': { href: '/math/rectangular-prism', title: 'Rectangular Prism Calculator' },
  'hypotenuse': { href: '/math/hypotenuse', title: 'Hypotenuse Calculator' },
  'sphere-volume': { href: '/math/sphere-volume', title: 'Sphere Volume Calculator' },
  'right-triangle': { href: '/math/right-triangle', title: 'Right Triangle Calculator' },
  'equilateral-triangle': { href: '/math/equilateral-triangle', title: 'Equilateral Triangle Calculator' },
  'triangle-angle': { href: '/math/triangle-angle', title: 'Triangle Angle Calculator' },
  hexagon: { href: '/math/hexagon', title: 'Hexagon Calculator' },
  octagon: { href: '/math/octagon', title: 'Octagon Calculator' },
  'herons-formula': { href: '/math/herons-formula', title: 'Heron\'s Formula Calculator' },
  'pythagorean-theorem': { href: '/math/pythagorean-theorem', title: 'Pythagorean Theorem Calculator' },
  trigonometry: { href: '/math/trigonometry', title: 'Trigonometry Calculator' },
  remainder: { href: '/math/remainder', title: 'Remainder Calculator' },
  inverseModulo: { href: '/math/inverse-modulo', title: 'Inverse Modulo Calculator' },
  log: { href: '/math/log', title: 'Log Calculator' },
  'percent-error': { href: '/math/percent-error', title: 'Percent Error Calculator' },
  // Physics calculators
  'velocity-calculator': { href: '/physics/velocity-calculator', title: 'Velocity Calculator' },
  'acceleration-calculator': { href: '/physics/acceleration-calculator', title: 'Acceleration Calculator' },
  'watt-calculator': { href: '/physics/watt-calculator', title: 'Watt Calculator' },
  'wet-bulb-calculator': { href: '/physics/wet-bulb-calculator', title: 'Wet Bulb Calculator' },
  'density-mass-volume-calculator': { href: '/physics/density-mass-volume-calculator', title: 'Density Mass Volume Calculator' },
  'specific-heat-calculator': { href: '/physics/specific-heat-calculator', title: 'Specific Heat Calculator' },
  'flow-rate-calculator': { href: '/physics/flow-rate-calculator', title: 'Flow Rate Calculator' },
  'torque-calculator': { href: '/physics/torque-calculator', title: 'Torque Calculator' },
  'power-to-weight-ratio-calculator': { href: '/physics/power-to-weight-ratio-calculator', title: 'Power-to-Weight Ratio Calculator' },
  'wavelength-calculator': { href: '/physics/wavelength-calculator', title: 'Wavelength Calculator' },
  'relative-humidity-calculator': { href: '/physics/relative-humidity-calculator', title: 'Relative Humidity Calculator' },
  'gravitational-force-calculator': { href: '/physics/gravitational-force-calculator', title: 'Gravitational Force Calculator' },
  'gear-ratio-calculator': { href: '/physics/gear-ratio-calculator', title: 'Gear Ratio Calculator' },
  'charles-law-calculator': { href: '/physics/charles-law-calculator', title: 'Charles\'s Law Calculator' },
  'potential-energy-calculator': { href: '/physics/potential-energy-calculator', title: 'Potential Energy Calculator' },
  'enthalpy-calculator': { href: '/physics/enthalpy-calculator', title: 'Enthalpy Calculator' },
  'ideal-gas-law-calculator': { href: '/physics/ideal-gas-law-calculator', title: 'Ideal Gas Law Calculator' },
  'frequency-calculator': { href: '/physics/frequency-calculator', title: 'Frequency Calculator' },
  'wire-size-calculator': { href: '/physics/wire-size-calculator', title: 'Wire Size Calculator' },
  'parallel-resistor-calculator': { href: '/physics/parallel-resistor-calculator', title: 'Parallel Resistor Calculator' },
  'force-calculator': { href: '/physics/force-calculator', title: 'Force Calculator' },
  'reynolds-number-calculator': { href: '/physics/reynolds-number-calculator', title: 'Reynolds Number Calculator' },
  'watt-hour-calculator': { href: '/physics/watt-hour-calculator', title: 'Watt-hour Calculator' },
  'wavelength-to-frequency-calculator': { href: '/physics/wavelength-to-frequency-calculator', title: 'Wavelength to Frequency Calculator' },
  'hp-to-amps-calculator': { href: '/physics/hp-to-amps-calculator', title: 'HP to Amps Calculator' },
  'friction-loss-calculator': { href: '/physics/friction-loss-calculator', title: 'Friction Loss Calculator' },
  'impulse-momentum-calculator': { href: '/physics/impulse-momentum-calculator', title: 'Impulse and Momentum Calculator' },
  'coulombs-law-calculator': { href: '/physics/coulombs-law-calculator', title: 'Coulomb\'s Law Calculator' }
} as const;

// Helper function to create internal links (returns React component)
export function createInternalLink(key: keyof typeof INTERNAL_LINKS, text?: string) {
  const link = INTERNAL_LINKS[key];
  if (!link) {
    console.warn(`Internal link key "${String(key)}" not found in INTERNAL_LINKS`);
    return <span>{text || String(key)}</span>;
  }
  return (
    <SEOInternalLink href={link.href} title={link.title}>
      {text || link.title}
    </SEOInternalLink>
  );
}

// Helper function to create internal link HTML string for use in SEOList
export function createInternalLinkHTML(key: keyof typeof INTERNAL_LINKS, text?: string): string {
  const link = INTERNAL_LINKS[key];
  if (!link) {
    console.warn(`Internal link key "${String(key)}" not found in INTERNAL_LINKS`);
    return text || String(key);
  }
  const linkText = text || link.title;
  return `<a href="${link.href}" title="${link.title}" class="text-blue-600 hover:text-blue-800 underline">${linkText}</a>`;
}
