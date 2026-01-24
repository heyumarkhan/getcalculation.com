import EEqualsMc2Calculator from '../../../_components/calculators/EEqualsMc2Calculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function EMC2CalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="E = mc^2 Calculator"
      description="Calculate energy from mass using E = mc^2 with unit conversions."
      calculator={<EEqualsMc2Calculator />}
      slug="physics/e-mc2-calculator"
      category="Physics"
      features={[
        'Einstein mass-energy equivalence',
        'Convert kg, g, lb to energy',
        'Output in J, kJ, MJ, GJ',
        'Step-by-step calculation text',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="E = mc^2 Calculator: Mass to Energy">
        <p>
          The E = mc^2 Calculator converts mass to energy using Einstein&apos;s mass–energy equivalence. Enter mass in kilograms, grams, or pounds and choose Joules, kJ, MJ, or GJ for the result. Pair it with the {createInternalLink('potential-energy-calculator', 'Potential Energy Calculator')} to compare stored energy from gravity with relativistic mass energy.
        </p>
      </SEOSection>

      <SEOSection title="How to Use">
        <SEOList ordered items={[
          '<strong>Enter mass:</strong> Provide the mass value in kg, g, or lb.',
          '<strong>Select units:</strong> Choose your input mass unit and desired energy unit.',
          '<strong>Calculate:</strong> Click Calculate to apply E = mc^2 instantly.',
          '<strong>Review steps:</strong> See the detailed calculation with constants and conversions.',
          '<strong>Reset:</strong> Clear inputs to run another scenario.'
        ]} />
      </SEOSection>

      <SEOSection title="Core Formula">
        <SEOFormula
          formula="E = m \times c^2"
          description="Energy equals mass multiplied by the speed of light squared (c = 299,792,458 m/s)."
        />
        <SEOList items={[
          'Mass in kilograms is standard SI input',
          'Energy output available in J, kJ, MJ, or GJ',
          'Speed of light constant: 299,792,458 m/s'
        ]} />
      </SEOSection>

      <SEOSection title="Applications">
        <SEOList items={[
          'Estimate theoretical energy from matter-antimatter conversion',
          'Benchmark energy content versus chemical or potential energy',
          'Educational demonstrations of relativity basics',
          'Quick unit conversions for engineering studies',
          'Physics coursework and research notes'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What value of c is used?',
            answer: 'The calculator uses the speed of light in vacuum: 299,792,458 meters per second.'
          },
          {
            question: 'Can I enter negative mass?',
            answer: 'No. Mass must be zero or positive for a valid physical result.'
          },
          {
            question: 'Which energy units are supported?',
            answer: 'Joules, kilojoules, megajoules, and gigajoules are available for output.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
