const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app', '_components', 'data', 'calculators.ts');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Array of replacement objects
const replacements = [
  {
    name: 'Hydrostatic Pressure Calculator',
    pattern: /description: 'Calculate hydrostatic pressure, depth, or fluid density using P = [^']*formula\.'/,
    replacement: "description: 'Calculate hydrostatic pressure, depth, or fluid density using P = ρ ρ g ρ h.'"
  },
  {
    name: 'Weight on Other Planets Calculator',
    pattern: /description: 'Calculate your weight on different planets, moons, and celestial bodies using W = m [^ ]* g\.'/,
    replacement: "description: 'Calculate weight on different planets, moons, and celestial bodies using W = m ρ g.'"
  },
  {
    name: 'dB Gain Calculator',
    pattern: /description: 'Calculate decibel \(dB\) gain from power or voltage ratios using dB = [^']*signal processing\.'/,
    replacement: "description: 'Calculate decibel (dB) gain from power or voltage ratios for electronics and audio.'"
  },
  {
    name: 'Acceleration Calculator',
    pattern: /description: 'Calculate acceleration, initial velocity, final velocity, and time using a = \(v - u\) \/ t\.'/,
    replacement: "description: 'Calculate acceleration, velocity, and time using a = (v - u) / t formula.'"
  },
  {
    name: 'Watt Calculator',
    pattern: /description: 'Calculate electrical power, voltage, current, and resistance using P = V [^ ]* I, P = V[^/]*\/R, and P = I[^/]*\/R formulas'/,
    replacement: "description: 'Calculate electrical power, voltage, current, and resistance using power formulas.'"
  },
  {
    name: 'Flow Rate Calculator',
    pattern: /description: 'Calculate volumetric flow rate, area, velocity, volume, or time using Q = A [^ ]* v formulas\.'/,
    replacement: "description: 'Calculate volumetric flow rate, area, velocity, volume, and time using Q = A ρ v.'"
  },
  {
    name: 'Centrifugal Force Calculator',
    pattern: /description: 'Calculate centrifugal force, mass, velocity, or radius using F = m [^ ]* v[^/]*\/r for circular motion\.'/,
    replacement: "description: 'Calculate centrifugal force, mass, velocity, and radius using F = m ρ v²/r.'"
  },
  {
    name: 'Watt-hour Calculator',
    pattern: /description: 'Calculate energy, power, or time using E = P [^ ]* t with support for kWh, Joules, and BTU\.'/,
    replacement: "description: 'Calculate energy, power, and time using E = P ρ t formula with unit conversions.'"
  },
  {
    name: 'Potential Energy Calculator',
    pattern: /description: 'Calculate potential energy, mass, height, or gravitational acceleration using PE = m [^ ]* g [^ ]* h\.'/,
    replacement: "description: 'Calculate potential energy, mass, height, and gravitational acceleration using PE = m ρ g ρ h.'"
  }
];

// Apply replacements
let replacedCount = 0;
replacements.forEach(({name, pattern, replacement}) => {
  if (pattern.test(content)) {
    content = content.replace(pattern, replacement);
    console.log(`✓ Updated: ${name}`);
    replacedCount++;
  } else {
    console.log(`✗ Not found: ${name}`);
  }
});

// Write the file back
fs.writeFileSync(filePath, content, 'utf8');

console.log(`\n✓ Successfully updated ${replacedCount} Physics calculators!`);
console.log('All descriptions are now limited to maximum 15 words.');
