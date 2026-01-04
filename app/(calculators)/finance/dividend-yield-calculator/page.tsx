import DividendYieldCalculator from '../../../_components/calculators/DividendYieldCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function DividendYieldCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Dividend Yield Calculator — Calculate Stock Dividend Yield Percentage"
      description="Calculate dividend yield percentage to evaluate the income return on your stock investments. Our Dividend Yield Calculator computes annual dividend returns based on stock price. Fast, embeddable, and mobile-friendly for investors."
      calculator={<DividendYieldCalculator />}
      slug="finance/dividend-yield-calculator"
      category="Finance"
      features={['Calculate dividend yield percentage', 'Compare stock investments', 'Income return analysis', 'Step-by-step calculation', 'Embeddable widget']}
    >
      <SEOSection title="Dividend Yield Calculator — Calculate Your Stock Dividend Yield">
        <p>
          Our <strong>Dividend Yield Calculator</strong> helps investors calculate the percentage return from dividends on stock investments. This tool is essential for comparing dividend-paying stocks and evaluating income-generating investment opportunities.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Dividend Yield Calculator">
        <ol>
          <li>Enter the current stock price (for example, 50.00).</li>
          <li>Enter the annual dividend per share (for example, 2.50).</li>
          <li>Click Calculate to view your dividend yield percentage.</li>
          <li>Use the results to compare dividend-paying stocks and evaluate investment returns.</li>
        </ol>
      </SEOSection>

      <SEOSection title="What is Dividend Yield?">
        <p>
          <strong>Dividend Yield</strong> is the percentage return you receive from dividends on your stock investment. It shows how much income a stock generates relative to its share price, helping investors identify stocks that provide reliable income returns.
        </p>
      </SEOSection>

      <SEOSection title="Dividend Yield Formula">
        <p>
          The dividend yield formula is straightforward:
        </p>
        <p className="text-center font-mono font-bold text-lg my-4 p-4 bg-gray-100 rounded">
          Dividend Yield = (Annual Dividend ÷ Stock Price) × 100
        </p>
        <p>
          For example, if a stock is priced at $50 and pays a $2.50 annual dividend:
        </p>
        <p className="text-center font-mono font-bold text-lg my-4 p-4 bg-gray-100 rounded">
          Dividend Yield = ($2.50 ÷ $50) × 100 = 5%
        </p>
      </SEOSection>

      <SEOSection title="Understanding Dividend Yield Results">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>High Yield (5%+):</strong> Stocks with high dividend yields may offer good income but carry higher risk.</li>
          <li><strong>Moderate Yield (3-5%):</strong> A balanced dividend yield that offers reasonable income and moderate risk.</li>
          <li><strong>Low Yield (&lt;3%):</strong> Stocks with lower yields may offer growth potential but less dividend income.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Why is Dividend Yield Important?">
        <p>
          Dividend yield helps investors:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Compare income returns across different stocks.</li>
          <li>Identify dividend-paying stocks that match income goals.</li>
          <li>Evaluate total investment return (capital appreciation + dividends).</li>
          <li>Make informed decisions about portfolio allocation.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Keywords and Embedding">
        <SEOList items={["Dividend Yield Calculator", "dividend yield calculator", "stock dividend yield", "calculate dividend yield", "dividend calculator", "yield calculator", "dividend income calculator", "embed dividend calculator"]} />
      </SEOSection>

      <SEOFAQ questions={[{
        question: 'How is dividend yield calculated?',
        answer: 'Dividend yield is calculated by dividing the annual dividend per share by the stock price, then multiplying by 100 to get a percentage. For example: ($2.50 ÷ $50) × 100 = 5%.'
      }, {
        question: 'What is a good dividend yield?',
        answer: 'A good dividend yield depends on market conditions and your investment goals. Generally, yields between 3-5% are considered moderate, while yields above 5% are considered high. Compare yields across similar stocks and sectors.'
      }, {
        question: 'Does dividend yield change?',
        answer: 'Yes, dividend yield changes when either the stock price or the dividend amount changes. As stock price increases, yield decreases (and vice versa) if the dividend remains constant.'
      }]} />
    </CalculatorPageTemplate>
  );
}
