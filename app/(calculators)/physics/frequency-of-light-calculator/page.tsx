import { Metadata } from 'next';
import FrequencyOfLightCalculator from '@/app/_components/calculators/FrequencyOfLightCalculator';
import CalculatorPageTemplate from '@/app/_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '@/app/_components/ui/SEOContent';
import { createInternalLink } from '@/app/_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Frequency of Light Calculator - Convert Wavelength to Frequency',
  description: 'Calculate light frequency from wavelength using the speed of light constant with support for multiple units.',
  keywords: [
    'frequency of light calculator',
    'light frequency calculator',
    'calculate light frequency',
    'wavelength to frequency',
    'frequency wavelength converter',
    'speed of light calculator',
    'light wave calculator',
    'electromagnetic frequency',
    'optics calculator',
    'physics frequency calculator',
    'wavelength frequency relation',
    'light speed calculation',
    'photon frequency calculator',
    'electromagnetic spectrum',
    'visible light wavelength'
  ],
  openGraph: {
    title: 'Frequency of Light Calculator',
    description: 'Calculate light frequency from wavelength using the speed of light constant',
    type: 'website',
    url: 'https://getcalculation.com/physics/frequency-of-light-calculator'
  }
};

export default function FrequencyOfLightPage() {
  return (
    <CalculatorPageTemplate
      title="Frequency of Light Calculator"
      description="Calculate light frequency from wavelength using the speed of light constant."
      calculator={<FrequencyOfLightCalculator />}
      slug="physics/frequency-of-light-calculator"
      category="Optics"
      features={[
        'f = c / λ computation',
        'Multiple wavelength units (m, cm, mm, μm, nm, Å)',
        'Multiple frequency units (Hz, kHz, MHz, GHz, THz, PHz)',
        'Step-by-step calculation display',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Frequency of Light Calculator: f = c / λ">
        <p>
          The Frequency of Light Calculator converts between wavelength and frequency using the relationship f = c / λ, where c is the speed of light. Light exists as electromagnetic waves, and frequency represents how many wave cycles occur per second. Higher frequency light has shorter wavelengths and carries more energy. Use this calculator to explore the wave-particle nature of light and understand the electromagnetic spectrum from radio waves to gamma rays.
        </p>
      </SEOSection>

      <SEOSection title="How to Use">
        <SEOList ordered items={[
          '<strong>Enter wavelength:</strong> Input wavelength and select units (m, cm, mm, μm, nm, Å).',
          '<strong>Or enter frequency:</strong> Input frequency and select units (Hz, kHz, MHz, GHz, THz, PHz).',
          '<strong>Calculate:</strong> Click "Calculate from Wavelength" or "Calculate from Frequency".',
          '<strong>Review steps:</strong> See unit conversions and the formula application.',
          '<strong>View results:</strong> Get the corresponding frequency or wavelength value.'
        ]} />
      </SEOSection>

      <SEOSection title="Core Formula">
        <SEOFormula
          formula="f = \frac{c}{\lambda}"
          description="Light frequency depends on the speed of light (c) and wavelength (λ). Higher frequency = shorter wavelength."
        />
        <SEOList items={[
          'c = 299,792,458 m/s (speed of light in vacuum)',
          'λ (lambda) = wavelength in meters',
          'f = frequency in Hertz (Hz)',
          'Inverse relationship: λ × f = c'
        ]} />
      </SEOSection>

      <SEOSection title="Light Wavelength & Frequency Examples">
        <SEOList items={[
          '<strong>Red light:</strong> ~700 nm wavelength, ~428 THz frequency',
          '<strong>Green light:</strong> ~550 nm wavelength, ~545 THz frequency',
          '<strong>Blue light:</strong> ~450 nm wavelength, ~667 THz frequency',
          '<strong>Infrared:</strong> >700 nm wavelength, <428 THz frequency',
          '<strong>Ultraviolet:</strong> <380 nm wavelength, >789 THz frequency'
        ]} />
      </SEOSection>

      <SEOSection title="Applications in Physics & Technology">
        <p>
          Light frequency calculations are essential in spectroscopy, laser design, optical communications, and photonics. Physicists use frequency measurements to identify elements through their spectral signatures, identify materials, and analyze light behavior. Engineers design optical systems at specific frequencies for telecommunications, photography, and medical imaging. Understanding wavelength-frequency relationships helps in studying the full electromagnetic spectrum and its applications.
        </p>
      </SEOSection>

      <SEOSection title="The Speed of Light Constant">
        <p>
          The speed of light (c = 299,792,458 m/s) is a fundamental constant in physics. This speed is the same in all reference frames and is the ultimate speed limit in the universe. It appears throughout Einstein's theory of relativity and is essential in quantum mechanics. All electromagnetic waves—from radio to gamma rays—travel at this speed, but at different frequencies and wavelengths. Using this calculator ensures accurate conversions using the precise scientific value.
        </p>
      </SEOSection>

      <SEOFAQ questions={[
        {
          question: 'What is the relationship between wavelength and frequency?',
          answer: 'They are inversely proportional: as wavelength increases, frequency decreases. The product of wavelength and frequency always equals the speed of light (c = λ × f).'
        },
        {
          question: 'Why does visible light have different colors at different frequencies?',
          answer: 'Human eyes detect different frequencies as different colors. Red light has lower frequency (~428 THz), while blue light has higher frequency (~667 THz). Our brain interprets these frequency differences as distinct colors.'
        },
        {
          question: 'Can I use this calculator for other electromagnetic waves?',
          answer: 'Yes! This formula applies to all electromagnetic waves: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, and gamma rays. They all travel at the speed of light with different wavelengths and frequencies.'
        },
        {
          question: 'What units should I use?',
          answer: 'Choose units based on the context. Visible light is typically in nanometers (nm) or angstroms (Å). Radio waves are measured in meters (m). Frequency can be in Hertz, kilohertz, megahertz, gigahertz, terahertz, or petahertz.'
        }
      ]} />
    </CalculatorPageTemplate>
  );
}

