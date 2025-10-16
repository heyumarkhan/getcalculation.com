import InverseVariationCalculator from '../../../_components/calculators/InverseVariationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection } from '../../../_components/ui/SEOContent';

export default function InverseVariationPage() {
  return (
    <CalculatorPageTemplate
      title="Inverse Variation Calculator: Solve y = k / x"
      description="Solve inverse variation problems (y = k / x). Find y, k, or x given any two values. Step-by-step solutions and examples."
      calculator={<InverseVariationCalculator />}
      slug="math/inverse-variation"
      category="Algebra"
      features={[
        'Solve for y given k and x',
        'Compute k given x and y',
        'Solve for x given k and y',
        'Step-by-step explanations',
        'Easy-to-use examples'
      ]}
    >
      <SEOSection title="About Inverse Variation">
        <p>
          Inverse variation describes relationships where one quantity varies inversely with another. When two variables x and y are inversely proportional, they satisfy <strong>y = k / x</strong>, where k is the constant of variation. Use this tool to solve for any missing value and see worked steps.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
