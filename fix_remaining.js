#!/usr/bin/env node
/**
 * Fix the last few icons with ??? placeholders
 */

const fs = require('fs');
const path = require('path');

function fixIcons() {
  const filepath = path.join(__dirname, 'app', '_components', 'data', 'calculators.ts');
  
  try {
    let content = fs.readFileSync(filepath, 'utf-8');
    
    // Replace gay-lussacs-law-calculator
    content = content.replace(
      /id: 'gay-lussacs-law-calculator',[\s\S]*?icon: '[^']*',/,
      (match) => match.replace(/icon: '[^']*'/, "icon: '🌡️'")
    );
    
    // Replace temperature-at-altitude-calculator
    content = content.replace(
      /id: 'temperature-at-altitude-calculator',[\s\S]*?icon: '[^']*',/,
      (match) => match.replace(/icon: '[^']*'/, "icon: '❄️'")
    );
    
    // Write back
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log('✅ Fixed remaining ??? icons!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixIcons();
