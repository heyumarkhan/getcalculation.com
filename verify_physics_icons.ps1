$file = Get-Content -Path "e:\Code\getcalculation.com\app\_components\data\calculators.ts" -Raw

# Match all physics calculators with their IDs and icons
$pattern = "id:\s*'([^']+)'[^}]*?subject:\s*'physics'[^}]*?icon:\s*'([^']*)'[^}]*?color:\s*'([^']*)'"
$matches = [regex]::Matches($file, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

$physicCalcs = @()
foreach ($match in $matches) {
    $physicCalcs += @{
        id = $match.Groups[1].Value
        icon = $match.Groups[2].Value
        color = $match.Groups[3].Value
    }
}

Write-Host "Physics Calculators: Total = $($physicCalcs.Count)"
Write-Host ""

$withPlaceholders = $physicCalcs | Where-Object { $_.icon -match '^\?+$' }
$withValidIcons = $physicCalcs | Where-Object { $_.icon -notmatch '^\?+$' }

Write-Host "Calculators with valid icons: $($withValidIcons.Count) ✅"
Write-Host "Calculators with placeholders: $($withPlaceholders.Count) ❌"
Write-Host ""

if ($withValidIcons.Count -gt 0) {
    Write-Host "Sample of assigned icons:"
    $withValidIcons | Select-Object -First 10 | ForEach-Object {
        Write-Host "  $($_.id): $($_.icon)"
    }
    Write-Host ""
    Write-Host "... and $(($withValidIcons.Count - 10)) more"
}

if ($withPlaceholders.Count -gt 0) {
    Write-Host ""
    Write-Host "Still need icons:"
    $withPlaceholders | ForEach-Object {
        Write-Host "  $($_.id): '$($_.icon)'"
    }
}
