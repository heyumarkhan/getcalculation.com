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
Write-Host "Calculators needing icons (icon = '??' or '?' or '???'):"
Write-Host ""

$needingIcons = $physicCalcs | Where-Object { $_.icon -match '^\?+$' }
Write-Host "Total needing icons: $($needingIcons.Count)"
Write-Host ""

foreach ($calc in $needingIcons) {
    Write-Host "ID: $($calc.id) | Current icon: '$($calc.icon)' | Color: $($calc.color)"
}
