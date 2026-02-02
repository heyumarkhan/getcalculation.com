$filePath = "e:\Code\getcalculation.com\app\_components\data\calculators.ts"
$content = Get-Content $filePath -Raw

# Extract all calculator entries with physics subject
$pattern = @"
\{[^}]*?subject:\s*'physics'[^}]*?\}
"@

$matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

$exceeding = @()

foreach ($match in $matches) {
    $calcEntry = $match.Value
    
    # Extract name
    $nameMatch = [regex]::Match($calcEntry, "name:\s*'([^']*)'")
    $name = if ($nameMatch.Success) { $nameMatch.Groups[1].Value } else { "Unknown" }
    
    # Extract description
    $descMatch = [regex]::Match($calcEntry, "description:\s*'([^']*)'")
    $description = if ($descMatch.Success) { $descMatch.Groups[1].Value } else { "" }
    
    # Count words
    $wordCount = if ($description) { ($description -split '\s+' | Where-Object { $_ }).Count } else { 0 }
    
    if ($wordCount -gt 15) {
        $exceeding += @{
            Name = $name
            Description = $description
            WordCount = $wordCount
        }
    }
}

Write-Host "Physics calculators with descriptions exceeding 15 words:" -ForegroundColor Yellow
Write-Host "=======================================================" -ForegroundColor Yellow
$exceeding | ForEach-Object {
    Write-Host "`nCalculator: $($_.Name)" -ForegroundColor Cyan
    Write-Host "Word Count: $($_.WordCount)" -ForegroundColor Red
    Write-Host "Description: $($_.Description)"
}

Write-Host "`n`nTotal calculators exceeding limit: $($exceeding.Count)" -ForegroundColor Green
