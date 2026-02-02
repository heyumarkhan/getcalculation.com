#!/usr/bin/env node
/**
 * Update remaining physics calculator icons - batch 3
 * Run with: node update_batch3.js
 */

const fs = require('fs');
const path = require('path');

const BATCH3_ICONS = {
  'dew-point-calculator': '💧',
  'density-of-cylinder-calculator': '📦',
  'polar-moment-of-inertia-calculator': '📐',
  'gravitational-force-calculator': '🌍',
  'enthalpy-calculator': '🔥',
  'efficiency-calculator': '⚡',
  'gas-density-calculator': '💨',
  'capacitors-in-series-calculator': '🔋',
  'distance-attenuation-calculator': '📉',
  'resonant-frequency-calculator': '〰️',
  'dc-wire-size-calculator': '🔌',
  'centrifugal-force-calculator': '🌀',
  'dipole-calculator': '⚛️',
};

function updateIcons() {
  const filepath = path.join(__dirname, 'app', '_components', 'data', 'calculators.ts');
  
  try {
    let content = fs.readFileSync(filepath, 'utf-8');
    let changedCount = 0;
    
    // For each calculator, find and replace its icon
    for (const [calcId, icon] of Object.entries(BATCH3_ICONS)) {
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
    
    console.log(`\n✅ Successfully updated ${changedCount} calculator icons!`);
  } catch (error) {
    console.error('❌ Error updating icons:', error.message);
    process.exit(1);
  }
}

updateIcons();
