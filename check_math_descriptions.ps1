$lines = Get-Content -Path 'app\_components\data\calculators.ts'
$name = $null
$desc = $null
foreach ($line in $lines) {
  if ($line -match "^\s*name:\s*'(.*)'") { $name = $Matches[1] }
  if ($line -match "^\s*description:\s*'(.*)'") { $desc = $Matches[1] }
  if ($line -match "^\s*subject:\s*'math'") {
    if ($name -and $desc) {
      $words = ($desc -split '\s+').Count
      if ($words -gt 15) {
        Write-Host "OVER $name : $words words"
        Write-Host "DESC $desc"
      } else {
        Write-Host "OK $name : $words words"
      }
    }
    $name = $null
    $desc = $null
  }
}
