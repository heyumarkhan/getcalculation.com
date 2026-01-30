import DividendYieldCalculator from '../../../_components/calculators/DividendYieldCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function DividendYieldCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Dividend Yield Calculator: Evaluate Stock Income Returns"
      description="Calculate dividend yield percentage to evaluate income returns on stock investments. Compare dividend-paying stocks with our instant, accurate dividend yield calculator."
      calculator={<DividendYieldCalculator />}
      slug="finance/dividend-yield-calculator"
      category="Finance"
      features={[
        "Accurate dividend yield calculations for any stock",
        "Compare income returns across multiple stocks",
        "Real-time percentage analysis for investment decisions",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Dividend Yield: Build Passive Income With Stocks">
        <p>
          Dividend yield is a critical metric for income-focused investors who want to evaluate how much passive income a stock generates relative to its current price. Whether you're building a dividend portfolio for retirement or supplementing your income, understanding dividend yield helps you identify the best dividend-paying stocks for your financial goals. For investors interested in evaluating the broader performance and growth of their investments beyond just dividend returns, you might also want to explore our {createInternalLink('appreciation-calculator', 'appreciation calculator')} to measure capital gains alongside income generation.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to calculate dividend yield instantly:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the current stock price per share (the price you paid or current market price)</li>
          <li><strong>Step 2:</strong> Input the annual dividend per share (the total dividends paid per share in a year)</li>
          <li><strong>Step 3:</strong> Click "Calculate" to get your dividend yield percentage and compare stocks</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Dividend Yield Formula">
        <p>
          Dividend yield measures what percentage of your stock investment you earn back annually in dividend payments. This metric is essential for income investors comparing dividend stocks, as it shows the real cash return on your investment independent of stock price appreciation. A higher dividend yield means more income per dollar invested, but investors must also consider dividend sustainability and stock price stability.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Dividend Yield (%) = (Annual Dividend Per Share ÷ Stock Price) × 100</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Imagine you own 100 shares of a utility company stock. The stock is currently trading at $80 per share, and the company pays an annual dividend of $3.20 per share. Using the dividend yield formula:
        </p>
        <ul>
          <li>Stock Price: $80 per share</li>
          <li>Annual Dividend Per Share: $3.20</li>
          <li>Dividend Yield = ($3.20 ÷ $80) × 100 = 4.0%</li>
          <li>Result: Your 100 shares generate $320 in annual dividend income, representing a 4% yield</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Dividend yield analysis is used by investors across various strategies and market conditions to build income-generating portfolios.</p>
        <SEOList items={[
          "Retirement portfolio construction and income planning",
          "Dividend stock screening and comparative analysis",
          "Monthly passive income estimation and budgeting",
          "Dividend reinvestment strategy evaluation",
          "Portfolio rebalancing and sector allocation decisions"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is considered a good dividend yield?",
            answer: "Good dividend yield depends on market conditions and your investment goals. Generally, 2%–3% is conservative and stable, 3%–5% is moderate and balanced, and 5%+ is high and may carry more risk. Compare yields within the same sector—utility stocks yield higher than tech stocks. Also compare to current interest rates for fixed income alternatives."
          },
          {
            question: "How does dividend yield differ from dividend growth?",
            answer: "Dividend yield is the current income return (annual dividend ÷ stock price). Dividend growth measures how much the dividend increases annually. A stock can have high current yield but low growth, or vice versa. Growth investors prioritize increasing dividends over time, while income investors prioritize high current yields."
          },
          {
            question: "Can dividend yield be higher than the company's earnings?",
            answer: "Yes, but it's a red flag. If dividend yield exceeds company earnings, the dividend may not be sustainable and the company might cut it. High yields can also indicate the stock price has fallen sharply, making the yield high but the company weakened. Always check the dividend payout ratio (annual dividend ÷ annual earnings) to verify sustainability."
          },
          {
            question: "How do taxes affect dividend yield returns?",
            answer: "Dividend income is taxed, which reduces your effective yield. Qualified dividends (held 60+ days) are typically taxed at capital gains rates (0%–20%), while non-qualified dividends are taxed as ordinary income. Tax-advantaged accounts (401k, IRA) shield dividend taxes. Calculate after-tax yield to understand your real net income."
          },
          {
            question: "Should I only invest in stocks with the highest dividend yield?",
            answer: "Not necessarily. High yields can indicate financial trouble or an inflated yield from a declining stock price. Balance high-yield stocks with moderate-yield quality companies. Consider dividend safety (payout ratio), dividend growth history, and stock price stability. Diversification across sectors and yields reduces risk."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering dividend yield calculation is essential for income-focused investors who want to build sustainable passive income from their stock portfolio. By comparing dividend yields across stocks, you can identify the best income-generating investments for your financial goals.
        </p>
        <p>
          Explore more finance tools: Check out our {createInternalLink('yield-to-maturity-calculator')} to evaluate bond income, or use the {createInternalLink('expense-ratio-calculator')} to understand how fund fees impact your dividend returns.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
