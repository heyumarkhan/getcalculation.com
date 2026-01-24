import DistanceAttenuationCalculator from '../../../_components/calculators/DistanceAttenuationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function DistanceAttenuationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Distance Attenuation Calculator"
      description="Calculate sound level drop with distance using the inverse square law."
      calculator={<DistanceAttenuationCalculator />}
      slug="physics/distance-attenuation-calculator"
      category="Waves"
      features={[
        'Compute level drop between two distances',
        'Inverse square law with 20·log10 ratio',
        'Shows loss and resulting dB',
        'Step-by-step calculation text',
        'Embed-ready, mobile-friendly UI',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Distance Attenuation: Inverse Square Law for Sound">
        <p>
          The Distance Attenuation Calculator estimates how sound level decreases as you move away from a source. Using the inverse square law, sound pressure level drops by 6 dB every time distance doubles in free field. Enter source level, reference distance, and target distance to get the resulting level and total loss. Pair this with {createInternalLink('db-gain-calculator', 'dB Gain Calculator')} or {createInternalLink('sound-wavelength-calculator', 'Sound Wavelength Calculator')} for deeper audio system planning.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Distance Attenuation Calculator">
        <SEOList ordered items={[
          '<strong>Enter source level (dB):</strong> SPL or level at the reference point.',
          '<strong>Set reference distance:</strong> Typically 1 meter from the source.',
          '<strong>Set target distance:</strong> Where you want the predicted level.',
          '<strong>Click Calculate:</strong> Get resulting level and total attenuation.',
          '<strong>Review steps:</strong> See the 20·log10 distance ratio math.'
        ]} />
      </SEOSection>

      <SEOSection title="Inverse Square Law Formula">
        <SEOFormula
          formula="L_2 = L_1 - 20 \log_{10}\!\left(\frac{r_2}{r_1}\right)"
          description="Sound level decreases by 20·log10 of the distance ratio in free field."
        />
        <SEOList items={[
          '<strong>L₁:</strong> Level at reference distance (dB)',
          '<strong>L₂:</strong> Level at target distance (dB)',
          '<strong>r₁, r₂:</strong> Reference and target distances',
          '<strong>Free field:</strong> Assumes no reflections; real rooms may differ'
        ]} />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <SEOList items={[
          '<strong>90 dB @1 m to 10 m:</strong> Loss ≈ 20 dB → 70 dB',
          '<strong>85 dB @2 m to 8 m:</strong> Loss ≈ 12 dB → 73 dB',
          '<strong>100 dB @0.5 m to 4 m:</strong> Loss ≈ 18 dB → 82 dB'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Why 20 log10 instead of 10 log10?',
            answer: 'Sound pressure level scales with amplitude; doubling distance halves pressure, giving 20·log10 for distance ratios.'
          },
          {
            question: 'Does this include room reflections?',
            answer: 'No. It assumes free-field conditions. Real spaces may show less attenuation due to reflections.'
          },
          {
            question: 'Can I use feet instead of meters?',
            answer: 'Yes. The ratio is unitless—just keep both distances in the same unit.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
