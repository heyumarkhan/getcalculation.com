import FreeFallTimeCalculator from '../../../_components/calculators/FreeFallTimeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function FreeFallTimeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Free Fall Time Calculator"
      description="Calculate free fall time from height using t = √(2h/g) with gravity input."
      calculator={<FreeFallTimeCalculator />}
      slug="physics/free-fall-time-calculator"
      category="Kinematics"
      features={[
        't = √(2h/g) computation',
        'Adjustable gravity input',
        'Supports meters and feet heights',
        'Step-by-step calculation text',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Free Fall Time Calculator: t = √(2h/g)">
        <p>
          The Free Fall Time Calculator computes time of fall from a height using t = √(2h/g). Enter height in meters or feet, adjust gravity if needed, and get time in seconds with detailed working. Compare with the {createInternalLink('free-fall-calculator', 'Free Fall Calculator')} for velocity and distance, or use the {createInternalLink('velocity-calculator', 'Velocity Calculator')} to explore motion changes after impact.
        </p>
      </SEOSection>

      <SEOSection title="How to Use">
        <SEOList ordered items={[
          '<strong>Enter height:</strong> Input drop height in meters or feet.',
          '<strong>Set gravity:</strong> Use 9.81 m/s² for Earth or customize.',
          '<strong>Calculate:</strong> Click Calculate to get time in seconds.',
          '<strong>Review steps:</strong> See the formula application and conversions.',
          '<strong>Reset:</strong> Clear inputs to run another scenario.'
        ]} />
      </SEOSection>

      <SEOSection title="Core Formula">
        <SEOFormula
          formula="t = \sqrt{\frac{2h}{g}}"
          description="Time depends on height h and gravitational acceleration g assuming zero initial velocity."
        />
        <SEOList items={[
          'Increase height → longer fall time',
          'Higher gravity → shorter fall time',
          'Assumes no air resistance and zero initial velocity'
        ]} />
      </SEOSection>

      <SEOSection title="Applications">
        <SEOList items={[
          'Physics labs estimating drop times',
          'Engineering safety timing for drops',
          'STEM education demonstrations',
          'Quick gravity comparisons (Earth vs. Moon)',
          'Sports and motion timing scenarios'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Can I change gravity?',
            answer: 'Yes. Set g to 9.81 m/s² for Earth or adjust for Moon, Mars, or custom tests.'
          },
          {
            question: 'Does this include air resistance?',
            answer: 'No. It assumes ideal free fall with zero drag and zero initial velocity.'
          },
          {
            question: 'Which units are supported?',
            answer: 'Height in meters or feet; time output in seconds.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
