$file = Get-Content -Path 'app\_components\data\calculators.ts' -Raw
$pattern = '\{\s+id: ([^,]+),[^}]*?name: [''"]([^''"]*)[''"],[^}]*?description: [''"]([^''"]*)[''"],[^}]*?category: [''"]Finance[''"]'

$matches = [regex]::Matches($file, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Singleline)

foreach ($match in $matches) {
  $desc = $match.Groups[3].Value
  $words = ($desc -split '\s+').Count
  $name = $match.Groups[2].Value
  
  if ($words -gt 15) {
    Write-Host "❌ $name : $words words" -ForegroundColor Red
    Write-Host "   $desc" -ForegroundColor Red
  } else {
    Write-Host "✅ $name : $words words" -ForegroundColor Green
  }
}
