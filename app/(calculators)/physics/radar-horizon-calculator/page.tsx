import RadarHorizonCalculator from '../../../_components/calculators/RadarHorizonCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function RadarHorizonCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Radar Horizon Calculator"
      description="Calculate radar horizon distance from antenna heights with Earth curvature."
      calculator={<RadarHorizonCalculator />}
      slug="physics/radar-horizon-calculator"
      category="Electromagnetism"
      features={[
        'Uses 4/3 Earth radius model',
        'Supports meters, feet, km, miles, nautical miles',
        'Step-by-step range breakdown',
        'Mobile-friendly embed-ready UI',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Radar Horizon Calculator: 4/3 Earth Radius Model">
        <p>
          The Radar Horizon Calculator estimates line-of-sight range using the standard k = 4/3 Earth radius adjustment: d ≈ 4.12 ( √h<sub>radar</sub> + √h<sub>target</sub> ). Enter antenna and target heights in meters or feet and choose output in kilometers, miles, or nautical miles. Pair it with the {createInternalLink('distance-to-horizon-calculator', 'Distance to Horizon Calculator')} for optical LOS comparisons.
        </p>
      </SEOSection>

      <SEOSection title="How to Use">
        <SEOList ordered items={[
          '<strong>Set heights:</strong> Enter radar antenna height and optional target height.',
          '<strong>Select units:</strong> Heights in meters or feet; output in km, mi, or nm.',
          '<strong>Compute:</strong> Click Calculate to apply the 4/3 Earth radius model.',
          '<strong>Review steps:</strong> See the worked formula and converted distance.',
          '<strong>Reset:</strong> Clear inputs to run another scenario quickly.'
        ]} />
      </SEOSection>

      <SEOSection title="Core Formula">
        <SEOFormula
          formula="d_{km} = 4.12 \times (\sqrt{h_{radar}} + \sqrt{h_{target}})"
          description="Distance in kilometers using antenna heights in meters with the 4/3 Earth radius approximation."
        />
        <SEOList items={[
          'Single-site horizon (target near ground): d ≈ 4.12 × √h_radar',
          'Add target height for ship-to-ship or aircraft-to-aircraft links',
          'Use nautical miles by selecting nm in the output'
        ]} />
      </SEOSection>

      <SEOSection title="Practical Tips">
        <SEOList items={[
          'Higher antenna height extends radar line-of-sight dramatically due to square-root scaling',
          'Nautical miles are standard for maritime and aviation planning',
          'Use meters for engineering specs; feet for tower datasheets',
          '4/3 Earth radius model approximates standard atmospheric refraction',
          'For optical LOS, compare with the Distance to Horizon Calculator'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Why use the 4/3 Earth radius model?',
            answer: 'It approximates standard atmospheric refraction, extending the effective horizon compared to pure geometric Earth radius.'
          },
          {
            question: 'Which units are supported?',
            answer: 'Heights: meters or feet. Output: kilometers, miles, or nautical miles.'
          },
          {
            question: 'Does this include clutter or ducting?',
            answer: 'No. It provides clear-air line-of-sight range only; terrain, ducting, or clutter are not included.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
