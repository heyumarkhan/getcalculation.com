import CPMCalculator from '../../../_components/calculators/CPMCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';

export default function CPMCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="CPM Calculator: Calculate Cost Per Thousand Impressions"
      description="Calculate cost per mille (CPM) from ad spend and impressions. Free online CPM calculator for display ads, social media, and digital advertising campaigns. Analyze pricing efficiency instantly."
      calculator={<CPMCalculator />}
      slug="finance/cpm-calculator"
      category="Finance"
    >
      <div className="mt-6 text-gray-700">CPM Calculator — calculate cost per thousand impressions using ad spend and impressions.</div>
    </CalculatorPageTemplate>
  );
}
