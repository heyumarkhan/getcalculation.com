$file = Get-Content -Path "e:\Code\getcalculation.com\app\_components\data\calculators.ts" -Raw

$matches = [regex]::Matches($file, "subject:\s*'physics'[^}]*?description:\s*'([^']*)'", [System.Text.RegularExpressions.RegexOptions]::Singleline)

$exceeding = @()

foreach ($match in $matches) {
    $description = $match.Groups[1].Value.Trim()
    $wordCount = ($description -split '\s+').Count
    if ($wordCount -gt 15) {
        $exceeding += @{
            description = $description
            wordCount = $wordCount
        }
    }
}

Write-Host "Physics calculators with descriptions exceeding 15 words:"
Write-Host "=========================================================="
Write-Host "Total exceeding: $($exceeding.Count)"
Write-Host ""

$exceeding | ForEach-Object {
    Write-Host "Word Count: $($_.wordCount)"
    Write-Host "Description: $($_.description)"
    Write-Host ""
}
