#!/usr/bin/env node
/**
 * Update final batch physics calculator icons
 * Run with: node update_final_batch.js
 */

const fs = require('fs');
const path = require('path');

const FINAL_BATCH_ICONS = {
  'drag-equation-calculator': '💨',
  'maximum-height-calculator-for-projectile-motion': '📈',
  'lightning-distance-calculator': '⚡',
  'hp-to-amps-calculator': '⚡',
  'friction-loss-calculator': '📉',
  'earth-curvature-calculator': '🌍',
  'inverse-square-law-calculator': '📊',
  'engine-displacement-calculator': '🚗',
  'gravitational-time-dilation-calculator': '⏰',
  'fulcrum-calculator': '⚙️',
  'ground-speed-calculator': '🚀',
  'trajectory-calculator': '📍',
  'hoop-stress-calculator': '📐',
  'acceleration-force-mass-calculator': '⚡',
  'simple-pendulum-calculator': '🔄',
  'capacitor-energy-calculator': '⚡',
  'voltage-divider-calculator': '⚡',
};

function updateIcons() {
  const filepath = path.join(__dirname, 'app', '_components', 'data', 'calculators.ts');
  
  try {
    let content = fs.readFileSync(filepath, 'utf-8');
    let changedCount = 0;
    
    // For each calculator, find and replace its icon
    for (const [calcId, icon] of Object.entries(FINAL_BATCH_ICONS)) {
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
