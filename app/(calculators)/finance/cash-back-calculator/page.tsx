import CashBackCalculator from '../../../_components/calculators/CashBackCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function CashBackCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Cash Back Calculator — Calculate Cashback Earned & Effective Return"
      description="Calculate cashback earned from purchases using cashback percentage rates. Our Cash Back Calculator helps you compute rewards and effective returns for credit card offers and promotions. Fast, embeddable, and mobile-friendly."
      calculator={<CashBackCalculator />}
      slug="finance/cash-back-calculator"
      category="Finance"
      features={['Calculate cashback earned', 'Effective return percentage', 'Embeddable widget', 'Step-by-step calculation']}
    >
      <SEOSection title="Cash Back Calculator — Calculate Cashback and Rewards">
        <p>
          Use our <strong>Cash Back Calculator</strong> to determine how much cash back you'll earn on purchases based on a percentage reward rate. This tool is perfect for comparing card offers, promotional rates, and understanding the dollar value of rewards.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Cash Back Calculator">
        <ol>
          <li>Enter the purchase amount (for example, 120.50).</li>
          <li>Enter the cashback rate as a percentage (for example, 2 for 2%).</li>
          <li>Click Calculate to view cashback earned and the effective return percentage.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Keywords and Embedding">
        <SEOList items={["Cash Back Calculator", "cashback calculator", "cash back calculator", "credit card cashback", "calculate cash back", "cashback rewards calculator", "embed cashback calculator"]} />
      </SEOSection>

      <SEOFAQ questions={[{
        question: 'How is cash back calculated?',
        answer: 'Cash back is calculated by multiplying the purchase amount by the cashback percentage (divided by 100). For example, $100 at 2% cashback gives $2.00.'
      }, {
        question: 'Can I use this to compare card offers?',
        answer: 'Yes. Use the calculator to quickly compare different cashback rates and see the dollar value returned on typical purchases.'
      }]} />
    </CalculatorPageTemplate>
  );
}
