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
  'sum-of-series': { href: '/math/sum-of-series', title: 'Sum of Series Calculator' },
  geometricSequence: { href: '/math/geometric-sequence', title: 'Geometric Sequence Calculator' },
  'geometric-sequence': { href: '/math/geometric-sequence', title: 'Geometric Sequence Calculator' },
  arithmeticSequence: { href: '/math/arithmetic-sequence', title: 'Arithmetic Sequence Calculator' },
  'arithmetic-sequence': { href: '/math/arithmetic-sequence', title: 'Arithmetic Sequence Calculator' },
  roundToNearestCent: { href: '/math/round-to-nearest-cent', title: 'Round to Nearest Cent Calculator' },
  'round-to-nearest-cent': { href: '/math/round-to-nearest-cent', title: 'Round to Nearest Cent Calculator' },
  roundToNearestThousand: { href: '/math/round-to-nearest-thousand', title: 'Round to the Nearest Thousand Calculator' },
  'round-to-nearest-thousand': { href: '/math/round-to-nearest-thousand', title: 'Round to the Nearest Thousand Calculator' },
  significantFigures: { href: '/math/significant-figures', title: 'Significant Figures Calculator' },
  'significant-figures': { href: '/math/significant-figures', title: 'Significant Figures Calculator' },
  volumeOfHemisphere: { href: '/math/volume-of-hemisphere', title: 'Volume of Hemisphere Calculator' },
  'volume-of-hemisphere': { href: '/math/volume-of-hemisphere', title: 'Volume of Hemisphere Calculator' },
  'cylinder-volume': { href: '/math/cylinder-volume', title: 'Cylinder Volume Calculator' },
  proportion: { href: '/math/proportion', title: 'Proportion Calculator' },
  fraction: { href: '/math/fraction', title: 'Fraction Calculator' },
  gcf: { href: '/math/gcf', title: 'GCF Calculator' },
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
  'electrical-power-calculator': { href: '/physics/electrical-power-calculator', title: 'Electrical Power Calculator' },
  'volt-to-electron-volt-calculator': { href: '/physics/volt-to-electron-volt-calculator', title: 'Volt to Electron Volt Calculator' },
  'power-factor-calculator': { href: '/physics/power-factor-calculator', title: 'Power Factor Calculator' },
  'free-fall-time-calculator': { href: '/physics/free-fall-time-calculator', title: 'Free Fall Time Calculator' },
  'contact-lens-vertex-calculator': { href: '/physics/contact-lens-vertex-calculator', title: 'Contact Lens Vertex Calculator' },
  'wet-bulb-calculator': { href: '/physics/wet-bulb-calculator', title: 'Wet Bulb Calculator' },
  'density-mass-volume-calculator': { href: '/physics/density-mass-volume-calculator', title: 'Density Mass Volume Calculator' },
  'volume-to-mass-calculator': { href: '/physics/volume-to-mass-calculator', title: 'Volume to Mass Calculator' },
  'buoyancy-calculator': { href: '/physics/buoyancy-calculator', title: 'Buoyancy Calculator' },
  'specific-heat-calculator': { href: '/physics/specific-heat-calculator', title: 'Specific Heat Calculator' },
  'calorimetry-calculator': { href: '/physics/calorimetry-calculator', title: 'Calorimetry Calculator' },
  'flow-rate-calculator': { href: '/physics/flow-rate-calculator', title: 'Flow Rate Calculator' },
  'pipe-flow-calculator': { href: '/physics/pipe-flow-calculator', title: 'Pipe Flow Calculator' },
  'hydraulic-radius-calculator': { href: '/physics/hydraulic-radius-calculator', title: 'Hydraulic Radius Calculator' },
  'torque-calculator': { href: '/physics/torque-calculator', title: 'Torque Calculator' },
  'power-to-weight-ratio-calculator': { href: '/physics/power-to-weight-ratio-calculator', title: 'Power-to-Weight Ratio Calculator' },
  'wavelength-calculator': { href: '/physics/wavelength-calculator', title: 'Wavelength Calculator' },
  'relative-humidity-calculator': { href: '/physics/relative-humidity-calculator', title: 'Relative Humidity Calculator' },
  'absolute-humidity-calculator': { href: '/physics/absolute-humidity-calculator', title: 'Absolute Humidity Calculator' },
  'dipole-calculator': { href: '/physics/dipole-calculator', title: 'Dipole Calculator' },
  'antenna-length-calculator': { href: '/physics/antenna-length-calculator', title: 'Antenna Length Calculator' },
  'wavelength-to-energy-calculator': { href: '/physics/wavelength-to-energy-calculator', title: 'Wavelength to Energy Calculator' },
  'capacitance-calculator': { href: '/physics/capacitance-calculator', title: 'Capacitance Calculator' },
  'ohms-law-resistance-calculator': { href: '/physics/ohms-law-resistance-calculator', title: "Ohm's Law Resistance Calculator" },
  'schwarzschild-radius-calculator': { href: '/physics/schwarzschild-radius-calculator', title: 'Schwarzschild Radius Calculator' },
  'drag-equation-calculator': { href: '/physics/drag-equation-calculator', title: 'Drag Equation Calculator' },
  'maximum-height-calculator-for-projectile-motion': { href: '/physics/maximum-height-calculator-for-projectile-motion', title: 'Maximum Height Calculator for Projectile Motion' },
  'mechanical-advantage-calculator': { href: '/physics/mechanical-advantage-calculator', title: 'Mechanical Advantage Calculator' },
  'btu-to-tons-converter': { href: '/physics/btu-to-tons-converter', title: 'BTU to Tons Converter' },
  'keplers-third-law-calculator': { href: '/physics/keplers-third-law-calculator', title: "Kepler's Third Law Calculator" },
  'section-modulus-calculator': { href: '/physics/section-modulus-calculator', title: 'Section Modulus Calculator' },
  'inverse-square-law-calculator': { href: '/physics/inverse-square-law-calculator', title: 'Inverse Square Law Calculator' },
  'displacement-calculator': { href: '/physics/displacement-calculator', title: 'Displacement Calculator' },
  'gravitational-force-calculator': { href: '/physics/gravitational-force-calculator', title: 'Gravitational Force Calculator' },
  'gear-ratio-calculator': { href: '/physics/gear-ratio-calculator', title: 'Gear Ratio Calculator' },
  'charles-law-calculator': { href: '/physics/charles-law-calculator', title: 'Charles\'s Law Calculator' },
  'boyles-law-calculator': { href: '/physics/boyles-law-calculator', title: 'Boyle\'s Law Calculator' },
  'potential-energy-calculator': { href: '/physics/potential-energy-calculator', title: 'Potential Energy Calculator' },
  'enthalpy-calculator': { href: '/physics/enthalpy-calculator', title: 'Enthalpy Calculator' },
  'efficiency-calculator': { href: '/physics/efficiency-calculator', title: 'Efficiency Calculator' },
  'ideal-gas-law-calculator': { href: '/physics/ideal-gas-law-calculator', title: 'Ideal Gas Law Calculator' },
  'air-pressure-at-altitude-calculator': { href: '/physics/air-pressure-at-altitude-calculator', title: 'Air Pressure at Altitude Calculator' },
  'capacitors-in-series-calculator': { href: '/physics/capacitors-in-series-calculator', title: 'Capacitors in Series Calculator' },
  'frequency-calculator': { href: '/physics/frequency-calculator', title: 'Frequency Calculator' },
  'wire-size-calculator': { href: '/physics/wire-size-calculator', title: 'Wire Size Calculator' },
  'dc-wire-size-calculator': { href: '/physics/dc-wire-size-calculator', title: 'DC Wire Size Calculator' },
  'parallel-resistor-calculator': { href: '/physics/parallel-resistor-calculator', title: 'Parallel Resistor Calculator' },
  'force-calculator': { href: '/physics/force-calculator', title: 'Force Calculator' },
  'friction-calculator': { href: '/physics/friction-calculator', title: 'Friction Calculator' },
  'kilogram-to-newtons-calculator': { href: '/physics/kilogram-to-newtons-calculator', title: 'Kilogram to Newtons Calculator' },
  'g-force-calculator': { href: '/physics/g-force-calculator', title: 'G Force Calculator' },
  'centrifugal-force-calculator': { href: '/physics/centrifugal-force-calculator', title: 'Centrifugal Force Calculator' },
  'wind-load-calculator': { href: '/physics/wind-load-calculator', title: 'Wind Load Calculator' },
  'reynolds-number-calculator': { href: '/physics/reynolds-number-calculator', title: 'Reynolds Number Calculator' },
  'watt-hour-calculator': { href: '/physics/watt-hour-calculator', title: 'Watt-hour Calculator' },
  'wavelength-to-frequency-calculator': { href: '/physics/wavelength-to-frequency-calculator', title: 'Wavelength to Frequency Calculator' },
  'hp-to-amps-calculator': { href: '/physics/hp-to-amps-calculator', title: 'HP to Amps Calculator' },
  'friction-loss-calculator': { href: '/physics/friction-loss-calculator', title: 'Friction Loss Calculator' },
  'impulse-momentum-calculator': { href: '/physics/impulse-momentum-calculator', title: 'Impulse and Momentum Calculator' },
  'coulombs-law-calculator': { href: '/physics/coulombs-law-calculator', title: 'Coulomb\'s Law Calculator' },
  'time-dilation-calculator': { href: '/physics/time-dilation-calculator', title: 'Time Dilation Calculator' },
  'terminal-velocity-calculator': { href: '/physics/terminal-velocity-calculator', title: 'Terminal Velocity Calculator' },
  'resonant-frequency-calculator': { href: '/physics/resonant-frequency-calculator', title: 'Resonant Frequency Calculator' },
  'angular-velocity-calculator': { href: '/physics/angular-velocity-calculator', title: 'Angular Velocity Calculator' },
  'belt-length-calculator': { href: '/physics/belt-length-calculator', title: 'Belt Length Calculator' },
  'net-force-calculator': { href: '/physics/net-force-calculator', title: 'Net Force Calculator' },
  'tension-calculator': { href: '/physics/tension-calculator', title: 'Tension Calculator' },
  'hookes-law-calculator': { href: '/physics/hookes-law-calculator', title: 'Hooke\'s Law Calculator' },
  'free-fall-calculator': { href: '/physics/free-fall-calculator', title: 'Free Fall Calculator' },
  'projectile-motion-calculator': { href: '/physics/projectile-motion-calculator', title: 'Projectile Motion Calculator' },
  'kinetic-energy-calculator': { href: '/physics/kinetic-energy-calculator', title: 'Kinetic Energy Calculator' },
  'impact-energy-calculator': { href: '/physics/impact-energy-calculator', title: 'Impact Energy Calculator' },
  'arrow-speed-calculator': { href: '/physics/arrow-speed-calculator', title: 'Arrow Speed Calculator' },
  'water-viscosity-calculator': { href: '/physics/water-viscosity-calculator', title: 'Water Viscosity Calculator' },
  'water-density-calculator': { href: '/physics/water-density-calculator', title: 'Water Density Calculator' },
  'engine-displacement-calculator': { href: '/physics/engine-displacement-calculator', title: 'Engine Displacement Calculator' },
  'watts-to-amps-calculator': { href: '/physics/watts-to-amps-calculator', title: 'Watts to Amps Calculator' },
  'conservation-of-momentum-calculator': { href: '/physics/conservation-of-momentum-calculator', title: 'Conservation of Momentum Calculator' },
  'dew-point-calculator': { href: '/physics/dew-point-calculator', title: 'Dew Point Calculator' },
  'orbital-period-calculator': { href: '/physics/orbital-period-calculator', title: 'Orbital Period Calculator' },
  'horizontal-projectile-motion-calculator': { href: '/physics/horizontal-projectile-motion-calculator', title: 'Horizontal Projectile Motion Calculator' },
  'normal-force-calculator': { href: '/physics/normal-force-calculator', title: 'Normal Force Calculator' },
  'acceleration-due-to-gravity-calculator': { href: '/physics/acceleration-due-to-gravity-calculator', title: 'Acceleration due to Gravity Calculator' },
  'pneumatic-cylinder-force-calculator': { href: '/physics/pneumatic-cylinder-force-calculator', title: 'Pneumatic Cylinder Force Calculator' },
  'standard-cubic-feet-per-minute-calculator': { href: '/physics/standard-cubic-feet-per-minute-calculator', title: 'Standard Cubic Feet per Minute Calculator' },
  'air-density-calculator': { href: '/physics/air-density-calculator', title: 'Air Density Calculator' },
  'gas-density-calculator': { href: '/physics/gas-density-calculator', title: 'Gas Density Calculator' },
  'luminosity-calculator': { href: '/physics/luminosity-calculator', title: 'Luminosity Calculator' },
  'heat-transfer-calculator': { href: '/physics/heat-transfer-calculator', title: 'Heat Transfer Calculator' },
  'pressure-calculator': { href: '/physics/pressure-calculator', title: 'Pressure Calculator' },
  'hydrostatic-pressure-calculator': { href: '/physics/hydrostatic-pressure-calculator', title: 'Hydrostatic Pressure Calculator' },
  'mach-number-calculator': { href: '/physics/mach-number-calculator', title: 'Mach Number Calculator' },
  'sound-wavelength-calculator': { href: '/physics/sound-wavelength-calculator', title: 'Sound Wavelength Calculator' },
  'db-gain-calculator': { href: '/physics/db-gain-calculator', title: 'dB Gain Calculator' },
  'wiens-law-calculator': { href: '/physics/wiens-law-calculator', title: 'Wien\'s Law Calculator' },
  'newtons-law-of-cooling-calculator': { href: '/physics/newtons-law-of-cooling-calculator', title: 'Newton\'s Law of Cooling Calculator' },
  'e-mc2-calculator': { href: '/physics/e-mc2-calculator', title: 'E = mc^2 Calculator' },
  'radar-horizon-calculator': { href: '/physics/radar-horizon-calculator', title: 'Radar Horizon Calculator' },
  'distance-to-horizon-calculator': { href: '/physics/distance-to-horizon-calculator', title: 'Distance to Horizon Calculator' },
  'capacitor-calculator': { href: '/physics/capacitor-calculator', title: 'Capacitor Calculator' },
  'capacitive-reactance-calculator': { href: '/physics/capacitive-reactance-calculator', title: 'Capacitive Reactance Calculator' },
  'series-resistor-calculator': { href: '/physics/series-resistor-calculator', title: 'Series Resistor Calculator' },
  'photon-energy-calculator': { href: '/physics/photon-energy-calculator', title: 'Photon Energy Calculator' },
  'frequency-of-light-calculator': { href: '/physics/frequency-of-light-calculator', title: 'Frequency of Light Calculator' },
  'angular-frequency-calculator': { href: '/physics/angular-frequency-calculator', title: 'Angular Frequency Calculator' },
  'wind-correction-angle-calculator': { href: '/physics/wind-correction-angle-calculator', title: 'Wind Correction Angle Calculator' },
  'cutoff-frequency-calculator': { href: '/physics/cutoff-frequency-calculator', title: 'Cutoff Frequency Calculator' },
  'projectile-range-calculator': { href: '/physics/projectile-range-calculator', title: 'Projectile Range Calculator' },
  'gold-weight-calculator': { href: '/physics/gold-weight-calculator', title: 'Gold Weight Calculator' },
  'skin-depth-calculator': { href: '/physics/skin-depth-calculator', title: 'Skin Depth Calculator' },
  'ohms-law-power-calculator': { href: '/physics/ohms-law-power-calculator', title: 'Ohm\'s Law Power Calculator' },
  'bend-allowance-calculator': { href: '/physics/bend-allowance-calculator', title: 'Bend Allowance Calculator' },
  'elastic-potential-energy-calculator': { href: '/physics/elastic-potential-energy-calculator', title: 'Elastic Potential Energy Calculator' },
  'light-year-calculator': { href: '/physics/light-year-calculator', title: 'Light Year Calculator' },
  'copper-wire-weight-calculator': { href: '/physics/copper-wire-weight-calculator', title: 'Copper Wire Weight Calculator' },
  'inductors-in-parallel-calculator': { href: '/physics/inductors-in-parallel-calculator', title: 'Inductors in Parallel Calculator' },
  // Finance calculators
  'pay-raise-calculator': { href: '/finance/pay-raise-calculator', title: 'Pay Raise Calculator' },
  'markup-calculator': { href: '/finance/markup-calculator', title: 'Markup Calculator' },
  'time-and-a-half-calculator': { href: '/finance/time-and-a-half-calculator', title: 'Time and a Half Calculator' },
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
