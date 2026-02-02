const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', '_components', 'data', 'calculators.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Physics calculator icon assignments - organized by category
const iconAssignments = {
  // Electronics & Electrical
  '220-volt-wire-size-calculator': '⚡',
  'lc-filter-calculator': '🎛️',
  'capacitive-reactance-calculator': '🔌',
  'series-resistor-calculator': '🔗',
  'low-pass-filter-calculator': '📡',
  'rc-circuit-calculator': '⏱️',
  'rc-filter-calculator': '🎚️',
  'db-gain-calculator': '📢',
  'power-factor-calculator': '⚙️',
  'kva-calculator': '🔋',
  'electrical-power-calculator': '💡',
  'inductors-in-parallel-calculator': '🧲',
  'volt-to-electron-volt-calculator': '⚛️',
  'cutoff-frequency-calculator': '📊',
  'wire-size-calculator': '🔌',
  'dc-wire-size-calculator': '🔌',
  'breaker-size-calculator': '🔒',
  'parallel-resistor-calculator': '⚡',
  'ac-wattage-calculator': '🔌',
  'dipole-calculator': '📡',
  'antenna-length-calculator': '📻',
  'capacitance-calculator': '⚡',
  'capacitors-in-series-calculator': '🔗',
  'distance-attenuation-calculator': '📉',
  'frequency-calculator': '📻',
  'resonant-frequency-calculator': '🎵',
  'voltage-divider-calculator': '➗',
  'capacitor-calculator': '⚡',
  'inductive-reactance-calculator': '🧲',
  'capacitor-energy-calculator': '⚡',
  'rlc-impedance-calculator': '🔧',
  'rlc-circuit-calculator': '⚡',
  'wire-resistance-calculator': '🔌',
  'kva-to-amperage-calculator': '⚡',
  'power-dissipation-calculator': '🔥',
  
  // Mechanics & Forces
  'friction-calculator': '🛑',
  'normal-force-calculator': '⬆️',
  'kilogram-to-newtons-calculator': 'N',
  'acceleration-due-to-gravity-calculator': '🌍',
  'pneumatic-cylinder-force-calculator': '🔧',
  'piston-speed-calculator': '🏎️',
  'pressure-calculator': '💨',
  'hydrostatic-pressure-calculator': '🌊',
  'fpe-calculator': '💪',
  'stress-calculator': '⚖️',
  'elongation-calculator': '↔️',
  'torque-calculator': '🔧',
  'electric-motor-torque-calculator': '⚙️',
  'work-calculator': '⚡',
  'force-calculator': 'F',
  'centrifugal-force-calculator': '🌀',
  'wind-load-calculator': '💨',
  'net-force-calculator': '➡️',
  'tension-calculator': '↕️',
  'gravitational-force-calculator': '🌌',
  'gear-ratio-calculator': '⚙️',
  'belt-length-calculator': '🔗',
  'mechanical-advantage-calculator': '🔧',
  'section-modulus-calculator': '📐',
  'hoop-stress-calculator': '🔩',
  'shear-stress-calculator': '✂️',
  'fulcrum-calculator': '⚖️',
  'friction-coefficient-calculator': '🛑',
  
  // Kinematics & Motion
  'velocity-calculator': '🏃',
  'acceleration-calculator': '🚀',
  'free-fall-calculator': '⬇️',
  'free-fall-time-calculator': '⏱️',
  'projectile-motion-calculator': '🎯',
  'horizontal-projectile-motion-calculator': '➡️',
  'projectile-range-calculator': '🎯',
  'stopping-distance-calculator': '🚗',
  'displacement-calculator': '📏',
  'angular-velocity-calculator': '🔄',
  'angular-acceleration-calculator': '🔄',
  'angular-displacement-calculator': '🔄',
  'terminal-velocity-calculator': '⬇️',
  'ground-speed-calculator': '✈️',
  'trajectory-calculator': '📈',
  'momentum-calculator': '💥',
  'acceleration-force-mass-calculator': '🚀',
  'simple-pendulum-calculator': '⏰',
  
  // Energy & Thermodynamics
  'heat-transfer-calculator': '🔥',
  'evaporation-rate-calculator': '💧',
  'luminosity-calculator': '⭐',
  'wiens-law-calculator': '🌡️',
  'newtons-law-of-cooling-calculator': '❄️',
  'elastic-potential-energy-calculator': '🎯',
  'watt-calculator': '⚡',
  'watt-hour-calculator': '🔋',
  'kinetic-energy-calculator': '⚡',
  'impact-energy-calculator': '💥',
  'impulse-and-momentum-calculator': '💥',
  'potential-energy-calculator': '⛰️',
  'specific-heat-calculator': '🌡️',
  'calorimetry-calculator': '🔥',
  'enthalpy-calculator': '🌡️',
  'efficiency-calculator': '📊',
  'thermal-expansion-calculator': '🌡️',
  
  // Fluid Mechanics & Flow
  'standard-cubic-feet-per-minute-calculator': '🌬️',
  'friction-factor-calculator': '💧',
  'api-gravity-calculator': '🛢️',
  'flow-rate-calculator': '💧',
  'pipe-flow-calculator': '🚰',
  'hydraulic-radius-calculator': '📐',
  'buoyancy-calculator': '🛟',
  'density-mass-volume-calculator': '⚖️',
  'volume-to-mass-calculator': '⚖️',
  'specific-gravity-calculator': '⚖️',
  'density-of-a-cylinder-calculator': '🥫',
  'cube-density-calculator': '🧊',
  'sphere-density-calculator': '⚽',
  'bernoulli-equation-calculator': '💧',
  'ideal-gas-law-calculator': '🎈',
  'air-density-calculator': '🌬️',
  'gas-density-calculator': '⛽',
  'air-pressure-at-altitude-calculator': '🏔️',
  'reynolds-number-calculator': '💧',
  'orifice-flow-calculator': '💧',
  'friction-loss-calculator': '💧',
  'water-viscosity-calculator': '💧',
  'water-density-calculator': '💧',
  'water-heating-calculator': '🔥',
  'combined-gas-law-calculator': '⛽',
  
  // Astronomy & Space
  'distance-to-horizon-calculator': '🌅',
  'radar-horizon-calculator': '📡',
  'e-mc2-calculator': '☢️',
  'weight-on-other-planets-calculator': '🪐',
  'escape-velocity-calculator': '🚀',
  'schwarzschild-radius-calculator': '⚫',
  'orbital-period-calculator': '🛰️',
  'sun-angle-calculator': '☀️',
  'light-year-calculator': '🌌',
  'gravitational-time-dilation-calculator': '⏱️',
  'time-dilation-calculator': '⏰',
  'relativistic-kinetic-energy-calculator': '⚡',
  
  // Waves & Optics
  'sound-wavelength-calculator': '🔊',
  'wavenumber-calculator': '〰️',
  'speed-of-sound-calculator': '🔊',
  'mach-number-calculator': '✈️',
  'wavelength-calculator': '〰️',
  'wavelength-to-energy-calculator': '💡',
  'wavelength-to-frequency-calculator': '📻',
  'photon-energy-calculator': '💡',
  'wave-speed-calculator': '〰️',
  'speed-of-light-calculator': '💡',
  'frequency-of-light-calculator': '💡',
  'angular-frequency-calculator': '🔄',
  'de-broglie-wavelength-calculator': '〰️',
  'index-of-refraction-calculator': '🔍',
  'rydberg-equation-calculator': '⚛️',
  
  // Atmospheric & Weather
  'cloud-base-calculator': '☁️',
  'wet-bulb-calculator': '🌡️',
  'dew-point-calculator': '💧',
  'relative-humidity-calculator': '💧',
  'absolute-humidity-calculator': '💧',
  'temperature-at-altitude-calculator': '🏔️',
  'wind-correction-angle-calculator': '🧭',
  
  // Measurements & Tools
  'gold-weight-calculator': '🏅',
  'skin-depth-calculator': '📏',
  'arrow-speed-calculator': '🏹',
  'bullet-energy-calculator': '🔫',
  'bend-allowance-calculator': '📐',
  'magnitude-of-acceleration-calculator': '📊',
  'mass-moment-of-inertia-calculator': '🔄',
  'g-force-calculator': 'G',
  'copper-wire-weight-calculator': '🔶',
  'contact-lens-vertex-calculator': '👁️',
  'electric-field-calculator': '⚡',
  'polar-moment-of-inertia-calculator': '🔄',
  'power-to-weight-ratio-calculator': '⚡',
  'drag-equation-calculator': '💨',
  'maximum-height-calculator-for-projectile-motion': '⬆️',
  'btu-to-tons-converter': '❄️',
  'inverse-square-law-calculator': '📉',
  'speeds-and-feeds-calculator': '🔧',
  'conservation-of-momentum-calculator': '💥',
  'lightning-distance-calculator': '⚡',
  'hp-to-amps-calculator': '🔌',
  'watts-to-amps-calculator': '⚡',
  'earth-curvature-calculator': '🌍',
  'engine-displacement-calculator': '🏎️',
  'angular-momentum-calculator': '🔄'
};

let updatedCount = 0;

// Apply each icon replacement
for (const [calcId, icon] of Object.entries(iconAssignments)) {
  // Pattern to match the calculator and replace its icon
  const pattern = new RegExp(
    `(id:\\s*'${calcId}',[^}]*?icon:\\s*')([^']+)(')`,
    'g'
  );
  
  const before = content;
  content = content.replace(pattern, `$1${icon}$3`);
  
  if (content !== before) {
    updatedCount++;
    console.log(`✓ ${calcId}: ${icon}`);
  }
}

// Write the updated content back to the file
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n✅ Successfully assigned icons to ${updatedCount} Physics calculators!`);
