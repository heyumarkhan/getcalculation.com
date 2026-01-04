import RealEstateCommissionCalculator from '../../../_components/calculators/RealEstateCommissionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function RealEstateCommissionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Real Estate Commission Calculator — Calculate Agent Commission & Net Proceeds"
      description="Calculate real estate agent commission and net proceeds from a property sale. Our Real Estate Commission Calculator helps sellers and agents compute commission amounts using sale price and commission rate percentage. Fast, embeddable, and mobile-friendly."
      calculator={<RealEstateCommissionCalculator />}
      slug="finance/real-estate-commission-calculator"
      category="Finance"
      features={['Calculate agent commission', 'Net proceeds calculation', 'Percentage and fixed-rate support', 'Step-by-step calculation breakdown', 'Embeddable widget']}
    >
      <SEOSection title="Real Estate Commission Calculator — Calculate Agent Commission and Net Proceeds">
        <p>
          Our <strong>Real Estate Commission Calculator</strong> computes the commission amount an agent earns based on the property's sale price and the agreed commission rate, and shows the seller's net proceeds after commission. This is ideal for sellers, agents, and brokers who want quick, accurate commission estimates.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Real Estate Commission Calculator">
        <ol>
          <li>Enter the sale price of the property (for example, $350,000).</li>
          <li>Enter the commission rate as a percentage (for example, 6 for 6%).</li>
          <li>Click Calculate to view the commission amount and net proceeds.</li>
          <li>Use the results to negotiate commissions or estimate seller proceeds.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Keywords and Embedding">
        <SEOList items={["Real Estate Commission Calculator", "real estate commission calculator", "commission calculator", "real estate commission rate", "calculate agent commission", "seller net proceeds calculator", "real estate fees calculator", "embed real estate calculator"]} />
      </SEOSection>

      <SEOFAQ questions={[{
        question: 'How is real estate commission calculated?',
        answer: 'Real estate commission is typically calculated as a percentage of the sale price. Multiply the sale price by the commission percentage (divided by 100) to get the commission amount.'
      }, {
        question: 'What are net proceeds?',
        answer: 'Net proceeds equal the sale price minus the commission amount (and other closing costs if applicable). This calculator provides the commission and net proceeds based on the inputs.'
      }]} />
    </CalculatorPageTemplate>
  );
}
