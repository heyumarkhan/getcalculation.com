import CapacitorsInSeriesCalculator from '../../../_components/calculators/CapacitorsInSeriesCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function CapacitorsInSeriesCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Capacitors in Series Calculator"
      description="Calculate equivalent capacitance for capacitors in series with unit conversions."
      calculator={<CapacitorsInSeriesCalculator />}
      slug="physics/capacitors-in-series-calculator"
      category="Electronics"
      features={[
        'Compute equivalent capacitance for series capacitors',
        'Add or remove capacitors dynamically',
        'Supports µF, nF, pF inputs and outputs',
        'Step-by-step calculation details',
        'Embed-ready and mobile-friendly',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Capacitors in Series: How It Works">
        <p>
          Capacitors connected in series share the same charge while voltage divides across each capacitor. The equivalent capacitance is smaller than any individual capacitor and follows the reciprocal relationship. Use this Capacitors in Series Calculator to quickly find total capacitance with support for µF, nF, and pF, plus step-by-step math. Pair it with {createInternalLink('capacitive-reactance-calculator', 'Capacitive Reactance Calculator')} or {createInternalLink('series-resistor-calculator', 'Series Resistor Calculator')} for complete circuit analysis.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Capacitors in Series Calculator">
        <SEOList ordered items={[
          '<strong>Enter each capacitor:</strong> Value plus unit (µF, nF, or pF).',
          '<strong>Add or remove:</strong> Include as many capacitors as needed for your series string.',
          '<strong>Select output unit:</strong> Choose µF, nF, or pF for the result.',
          '<strong>Click Calculate:</strong> Get equivalent capacitance with detailed steps.',
          '<strong>Reset anytime:</strong> Restore defaults to start over.'
        ]} />
      </SEOSection>

      <SEOSection title="Series Capacitance Formula">
        <SEOFormula
          formula="\frac{1}{C_{eq}} = \sum \frac{1}{C_i}"
          description="Equivalent capacitance in series equals the reciprocal of the sum of reciprocals."
        />
        <SEOList items={[
          '<strong>Series rule:</strong> Total capacitance decreases as more capacitors are added in series.',
          '<strong>Voltage sharing:</strong> Each capacitor sees a portion of the total voltage based on its value.',
          '<strong>Charge consistency:</strong> Charge (Q) is the same on every capacitor in series.'
        ]} />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <SEOList items={[
          '<strong>10 µF and 22 µF:</strong> Ceq ≈ 6.88 µF',
          '<strong>100 nF, 220 nF, 330 nF:</strong> Ceq ≈ 53.7 nF',
          '<strong>1 µF, 1 µF, 1 µF:</strong> Ceq ≈ 0.333 µF'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Do voltage ratings matter in series?',
            answer: 'Yes. Ensure each capacitor\'s voltage rating exceeds its share of the total voltage.'
          },
          {
            question: 'Why is Ceq smaller than any single capacitor?',
            answer: 'Series connection increases effective plate spacing, reducing total capacitance.'
          },
          {
            question: 'Which units can I use?',
            answer: 'Enter values in µF, nF, or pF and choose any of these for the result.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
