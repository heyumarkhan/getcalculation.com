import CapacitorCalculator from '../../../_components/calculators/CapacitorCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function CapacitorCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Capacitor Calculator"
      description="Calculate capacitance, charge, or voltage with unit conversions."
      calculator={<CapacitorCalculator />}
      slug="physics/capacitor-calculator"
      category="Electronics"
      features={[
        'Solve for capacitance, charge, or voltage',
        'Supports C, V, Q unit conversions',
        'Step-by-step calculation text',
        'Embed-ready, mobile-friendly UI',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Capacitor Calculator: Q = C × V">
        <p>
          The Capacitor Calculator lets you solve for capacitance, charge, or voltage using the core relationship Q = C × V. Enter two known values to find the third, with support for SI prefixes across charge (C, mC, µC, nC), voltage (V, mV, kV), and capacitance (F, mF, µF, nF, pF). Pair it with {createInternalLink('capacitive-reactance-calculator', 'Capacitive Reactance Calculator')} or {createInternalLink('capacitors-in-series-calculator', 'Capacitors in Series Calculator')} for broader circuit planning.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Capacitor Calculator">
        <SEOList ordered items={[
          '<strong>Select mode:</strong> Solve for capacitance (C), charge (Q), or voltage (V).',
          '<strong>Enter known values:</strong> Provide the two quantities you have with units.',
          '<strong>Choose output unit:</strong> Pick the unit you want for the result.',
          '<strong>Click Calculate:</strong> View the result plus step-by-step math.',
          '<strong>Reset anytime:</strong> Start fresh with default values.'
        ]} />
      </SEOSection>

      <SEOSection title="Core Formulas">
        <SEOFormula
          formula="Q = C \times V"
          description="Charge equals capacitance times voltage. Rearrange to solve for any variable."
        />
        <SEOList items={[
          '<strong>Capacitance:</strong> C = Q / V',
          '<strong>Charge:</strong> Q = C × V',
          '<strong>Voltage:</strong> V = Q / C'
        ]} />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <SEOList items={[
          '<strong>Find C:</strong> Q = 10 µC, V = 5 V → C ≈ 2 µF',
          '<strong>Find Q:</strong> C = 100 µF, V = 12 V → Q ≈ 1200 µC',
          '<strong>Find V:</strong> Q = 2 mC, C = 4 µF → V ≈ 500 V'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Which units can I use?',
            answer: 'Charge: C, mC, µC, nC. Voltage: V, mV, kV. Capacitance: F, mF, µF, nF, pF.'
          },
          {
            question: 'Is this for DC or AC?',
            answer: 'The algebra works for both; for AC reactance use the Capacitive Reactance Calculator.'
          },
          {
            question: 'Can I mix units?',
            answer: 'Yes—enter each value with its unit; the calculator handles conversions automatically.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
