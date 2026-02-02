#!/usr/bin/env node
/**
 * Update remaining physics calculator icons
 * Run with: node update_remaining_icons.js
 */

const fs = require('fs');
const path = require('path');

const REMAINING_ICONS = {
  'cloud-base-calculator': '☁️',
  'friction-factor-calculator': '🌊',
  'rc-circuit-calculator': '🔄',
  'e-mc2-calculator': '⚛️',
  'copper-wire-weight-calculator': '🧵',
  'contact-lens-vertex-calculator': '👁️',
  'frequency-of-light-calculator': '🌈',
  'cutoff-frequency-calculator': '〰️',
  'de-broglie-wavelength-calculator': '💫',
  'density-mass-volume-calculator': '🧮',
  'cube-density-calculator': '📦',
  'calorimetry-calculator': '🧪',
  'flow-rate-calculator': '💧',
  'electric-motor-torque-calculator': '⚙️',
  'electric-field-calculator': '⚡',
  'angle-of-incidence-calculator': '∠',
  'average-velocity-calculator': '➡️',
  'bulk-modulus-calculator': '💪',
  'coulombs-law-calculator': '⚛️',
  'density-altitude-calculator': '☁️',
  'diffraction-grating-calculator': '〰️',
  'diffusion-coefficient-calculator': '💨',
  'doppler-shift-calculator': '🔊',
  'effective-load-calculator': '⚖️',
  'elasticity-calculator': '🎯',
  'equilibrium-constant-calculator': '⚖️',
  'fermi-energy-calculator': '⚛️',
  'flux-calculator': '📊',
  'focal-length-calculator': '🔍',
  'frequency-wavelength-calculator': '〰️',
  'gamma-radiation-calculator': '☢️',
  'hall-effect-calculator': '🧲',
  'heat-flux-calculator': '🔥',
  'hydrostatic-pressure-calculator': '🌊',
  'index-of-refraction-calculator': '🔍',
  'ionic-strength-calculator': '⚛️',
  'joule-heating-calculator': '🔥',
  'keq-calculator': '⚖️',
  'kinetic-friction-coefficient-calculator': '🚗',
  'laminar-flow-calculator': '🌊',
  'light-pressure-calculator': '💡',
  'lorentz-force-calculator': '🧲',
  'molar-mass-calculator': '🧪',
  'nusselt-number-calculator': '📊',
};

function updateIcons() {
  const filepath = path.join(__dirname, 'app', '_components', 'data', 'calculators.ts');
  
  try {
    let content = fs.readFileSync(filepath, 'utf-8');
    let changedCount = 0;
    
    // For each calculator, find and replace its icon
    for (const [calcId, icon] of Object.entries(REMAINING_ICONS)) {
      // Create a regex to find the specific calculator's icon field
      const pattern = new RegExp(
        `(id:\\s*'${calcId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',[\\s\\S]*?icon:\\s*)'[^']*'(,)`,
        'g'
      );
      
      const matches = content.match(pattern);
      if (matches) {
        // Replace just the first occurrence for this calculator
        content = content.replace(
          pattern,
          `$1${icon}$2`
        );
        changedCount++;
        console.log(`✓ Updated ${calcId} → ${icon}`);
      } else {
        console.log(`⚠️  Not found: ${calcId}`);
      }
    }
    
    // Write back to file
    fs.writeFileSync(filepath, content, 'utf-8');
    
    console.log(`\n✅ Successfully updated ${changedCount} remaining calculator icons!`);
  } catch (error) {
    console.error('❌ Error updating icons:', error.message);
    process.exit(1);
  }
}

updateIcons();
