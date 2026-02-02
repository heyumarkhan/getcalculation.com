import re

file_path = r"e:\Code\getcalculation.com\app\_components\data\calculators.ts"

# Read file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Dictionary of replacements: old description -> new description
replacements = {
    # Hydrostatic Pressure - 16 words to 13 words
    "description: 'Calculate hydrostatic pressure, depth, or fluid density using P = ? ρ g ρ h formula.',": 
    "description: 'Calculate hydrostatic pressure, depth, or fluid density using P = ? ρ g ρ h.',",
    
    # Weight on Other Planets - 16 words to 12 words
    "description: 'Calculate your weight on different planets, moons, and celestial bodies using W = m ρ g.',":
    "description: 'Calculate weight on different planets, moons, and celestial bodies using W = m ρ g.',",
    
    # dB Gain Calculator - 32 words to 11 words
    "description: 'Calculate decibel (dB) gain from power or voltage ratios using dB = 10?log10(P2/P1) for power and dB = 20?log10(V2/V1) for voltage. Free online physics calculator for electronics, audio engineering, and signal processing.',":
    "description: 'Calculate decibel (dB) gain from power or voltage ratios for electronics and audio.',",
    
    # Acceleration Calculator - 16 words to 12 words
    "description: 'Calculate acceleration, initial velocity, final velocity, and time using a = (v - u) / t.',":
    "description: 'Calculate acceleration, velocity, and time using a = (v - u) / t formula.',",
    
    # Watt Calculator - 21 words to 10 words
    "description: 'Calculate electrical power, voltage, current, and resistance using P = V ? I, P = V?/R, and P = I?R formulas":
    "description: 'Calculate electrical power, voltage, current, and resistance using power formulas.'",
    
    # Flow Rate Calculator - 16 words to 14 words
    "description: 'Calculate volumetric flow rate, area, velocity, volume, or time using Q = A ρ v formulas.',":
    "description: 'Calculate volumetric flow rate, area, velocity, volume, and time using Q = A ρ v.',",
    
    # Centrifugal Force Calculator - 16 words to 13 words
    "description: 'Calculate centrifugal force, mass, velocity, or radius using F = m ρ v?/r for circular motion.',":
    "description: 'Calculate centrifugal force, mass, velocity, and radius using F = m ρ v?/r.',",
    
    # Watt-hour Calculator - 18 words to 14 words
    "description: 'Calculate energy, power, or time using E = P ρ t with support for kWh, Joules, and BTU.',":
    "description: 'Calculate energy, power, and time using E = P ρ t formula with unit conversions.',",
    
    # Potential Energy Calculator - 16 words to 13 words
    "description: 'Calculate potential energy, mass, height, or gravitational acceleration using PE = m ρ g ρ h.',":
    "description: 'Calculate potential energy, mass, height, and gravitational acceleration using PE = m ρ g ρ h.',",
}

# Apply replacements
for old, new in replacements.items():
    if old in content:
        content = content.replace(old, new)
        print(f"✓ Replaced: {old[:60]}...")
    else:
        print(f"✗ Not found: {old[:60]}...")

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✓ Physics calculator descriptions updated!")
