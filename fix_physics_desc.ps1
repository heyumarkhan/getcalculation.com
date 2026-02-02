$filePath = "e:\Code\getcalculation.com\app\_components\data\calculators.ts"

# Read file with proper encoding
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Track replacements
$replacementCount = 0

# 1. Hydrostatic Pressure Calculator (16 words -> 13 words)
$beforeCount = ($content | Measure-Object -Character).Characters
$content = $content -replace `
    "description: 'Calculate hydrostatic pressure, depth, or fluid density using P = [^']*formula\.'", `
    "description: 'Calculate hydrostatic pressure, depth, or fluid density using P = ρ ρ g ρ h.'"
if (($content | Measure-Object -Character).Characters -ne $beforeCount) {
    $replacementCount++
    Write-Host "✓ Updated Hydrostatic Pressure Calculator"
}

# Write back to file
[System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)

Write-Host "`nAll Physics calculators processed!" -ForegroundColor Green
