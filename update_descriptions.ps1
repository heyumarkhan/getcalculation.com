$file = Get-Content -Path 'app\_components\data\calculators.ts' -Raw

# Real Estate Commission
$file = $file -replace "description: 'Calculate real estate agent commission and seller net proceeds from a property sale using sale price and commission rate\.'", "description: 'Calculate agent commission and seller net proceeds from property sales.'"

# Cash Back
$file = $file -replace "description: 'Calculate cashback earned from purchases using a cashback percentage\. Determine dollar rewards and effective return for credit card offers and promotions\.'", "description: 'Calculate cashback rewards from purchases and credit card offers.'"

# Dividend Yield
$file = $file -replace "description: 'Calculate dividend yield percentage to evaluate the income return on stock investments based on stock price and annual dividend\.'", "description: 'Calculate dividend yield percentage for stock investments and income.'"

# CTR Calculator
$file = $file -replace "description: 'Calculate click-through rate \(CTR\) from clicks and impressions\. Analyze digital marketing campaign performance with CTR formula\. Essential for PPC, email, and social media marketing analytics\.'", "description: 'Calculate click-through rate for digital marketing campaigns.'"

# ROAS Calculator
$file = $file -replace "description: 'Calculate return on ad spend \(ROAS\) from revenue and ad costs\. Measure advertising profitability for Google Ads, Facebook, and digital marketing campaigns\. Essential for evaluating campaign ROI\.'", "description: 'Calculate return on ad spend from revenue and ad costs.'"

# CPM Calculator
$file = $file -replace "description: 'Calculate cost per mille \(CPM\) from ad spend and impressions\. Analyze display and social media advertising pricing efficiency\. Essential for evaluating impression-based campaign costs\.'", "description: 'Calculate cost per impression for display and social media ads.'"

# Yield to Maturity
$file = $file -replace "description: 'Calculate yield to maturity \(YTM\) for bonds\. Free online YTM calculator to determine bond returns based on face value, coupon rate, current price, and maturity date\.'", "description: 'Calculate bond yield to maturity based on price and coupon rate.'"

# Price Elasticity
$file = $file -replace "description: 'Calculate price elasticity of demand \(PED\) to understand how quantity demanded changes with price changes\. Determine if demand is elastic, inelastic, or unit elastic\.'", "description: 'Calculate price elasticity to understand demand price sensitivity.'"

# Year Over Year Growth
$file = $file -replace "description: 'Calculate year-over-year growth \(YoY\) to measure business performance, revenue growth, and annual metrics changes\. Track growth rate for financial analysis\.'", "description: 'Calculate year-over-year growth to measure business performance.'"

Set-Content -Path 'app\_components\data\calculators.ts' -Value $file
Write-Host "Updated Finance calculator descriptions to max 15 words each"
