$filePath = "e:\Code\getcalculation.com\app\_components\data\calculators.ts"
$content = Get-Content $filePath -Raw

# Replace Hydrostatic Pressure Calculator (16 words -> 13 words)
$content = $content -replace `
    "id: 'hydrostatic-pressure-calculator',[^}]*?description: 'Calculate hydrostatic pressure, depth, or fluid density using P = [^']*? formula\.'", `
    "id: 'hydrostatic-pressure-calculator',`n    name: 'Hydrostatic Pressure Calculator',`n    description: 'Calculate hydrostatic pressure, depth, or fluid density using P = ρ ρ g ρ h.'"

# Replace Weight on Other Planets (16 words -> 12 words)
$content = $content -replace `
    "id: 'weight-on-other-planets-calculator',[^}]*?description: 'Calculate your weight on different planets, moons, and celestial bodies using W = m [^ ]* g\.'", `
    "id: 'weight-on-other-planets-calculator',`n    name: 'Weight on Other Planets Calculator',`n    description: 'Calculate weight on different planets, moons, and celestial bodies using W = m ρ g.'"

# Replace dB Gain Calculator (32 words -> 11 words)
$content = $content -replace `
    "id: 'db-gain-calculator',[^}]*?description: 'Calculate decibel \(dB\) gain from power or voltage ratios using.*?signal processing\.'", `
    "id: 'db-gain-calculator',`n    name: 'dB Gain Calculator',`n    description: 'Calculate decibel (dB) gain from power or voltage ratios for electronics and audio.'"

# Replace Acceleration Calculator (16 words -> 12 words)
$content = $content -replace `
    "id: 'acceleration-calculator',[^}]*?description: 'Calculate acceleration, initial velocity, final velocity, and time using a = \(v - u\) / t\.'", `
    "id: 'acceleration-calculator',`n    name: 'Acceleration Calculator',`n    description: 'Calculate acceleration, velocity, and time using a = (v - u) / t formula.'"

# Replace Watt Calculator (21 words -> 10 words)
$content = $content -replace `
    "id: 'watt-calculator',[^}]*?description: 'Calculate electrical power, voltage, current, and resistance using P = V [^ ]* I, P = V\[\^\?\]/R, and P = I\[\^\?\]R formulas'", `
    "id: 'watt-calculator',`n    name: 'Watt Calculator',`n    description: 'Calculate electrical power, voltage, current, and resistance using power formulas.'"

# Replace Flow Rate Calculator (16 words -> 14 words)
$content = $content -replace `
    "id: 'flow-rate-calculator',[^}]*?description: 'Calculate volumetric flow rate, area, velocity, volume, or time using Q = A [^ ]* v formulas\.'", `
    "id: 'flow-rate-calculator',`n    name: 'Flow Rate Calculator',`n    description: 'Calculate volumetric flow rate, area, velocity, volume, and time using Q = A ρ v.'"

# Replace Centrifugal Force Calculator (16 words -> 13 words)
$content = $content -replace `
    "id: 'centrifugal-force-calculator',[^}]*?description: 'Calculate centrifugal force, mass, velocity, or radius using F = m [^ ]* v[^/]*/r for circular motion\.'", `
    "id: 'centrifugal-force-calculator',`n    name: 'Centrifugal Force Calculator',`n    description: 'Calculate centrifugal force, mass, velocity, and radius using F = m ρ v²/r.'"

# Replace Watt-hour Calculator (18 words -> 14 words)
$content = $content -replace `
    "id: 'watt-hour-calculator',[^}]*?description: 'Calculate energy, power, or time using E = P [^ ]* t with support for kWh, Joules, and BTU\.'", `
    "id: 'watt-hour-calculator',`n    name: 'Watt-hour Calculator',`n    description: 'Calculate energy, power, and time using E = P ρ t formula with unit conversions.'"

# Replace Potential Energy Calculator (16 words -> 13 words)
$content = $content -replace `
    "id: 'potential-energy-calculator',[^}]*?description: 'Calculate potential energy, mass, height, or gravitational acceleration using PE = m [^ ]* g [^ ]* h\.'", `
    "id: 'potential-energy-calculator',`n    name: 'Potential Energy Calculator',`n    description: 'Calculate potential energy, mass, height, and gravitational acceleration using PE = m ρ g ρ h.'"

Set-Content -Path $filePath -Value $content -Encoding UTF8

Write-Host "Physics calculator descriptions have been updated to maximum 15 words!" -ForegroundColor Green
