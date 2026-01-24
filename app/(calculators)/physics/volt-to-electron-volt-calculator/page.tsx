import VoltToElectronVoltCalculator from '../../../_components/calculators/VoltToElectronVoltCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function VoltToElectronVoltCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Volt to Electron Volt Calculator"
      description="Convert voltage to electron volts or joules with charge multiples."
      calculator={<VoltToElectronVoltCalculator />}
      slug="physics/volt-to-electron-volt-calculator"
      category="Electromagnetism"
      features={[
        'Converts V, kV, mV to eV/keV/MeV',
        'Includes Joule output',
        'Charge multiplier for multiple electrons',
        'Step-by-step calculation text',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Volt to Electron Volt Calculator">
        <p>
          The Volt to Electron Volt Calculator converts electric potential to particle energy using E = q × V, where 1 eV = 1 V × e. Enter voltage in volts, kilovolts, or millivolts, set a charge multiplier for multiple elementary charges, and output energy in eV, keV, MeV, or Joules. Pair it with the {createInternalLink('photon-energy-calculator', 'Photon Energy Calculator')} for wavelength-to-eV comparisons.
        </p>
      </SEOSection>

      <SEOSection title="How to Use">
        <SEOList ordered items={[
          '<strong>Enter voltage:</strong> Input V, kV, or mV.',
          '<strong>Set charge multiplier:</strong> Use 1 for one electron charge or higher for multiple charges.',
          '<strong>Choose output:</strong> Select eV, keV, MeV, or Joules.',
          '<strong>Calculate:</strong> Click Calculate to get energy with steps.',
          '<strong>Reset:</strong> Clear inputs to run another scenario.'
        ]} />
      </SEOSection>

      <SEOSection title="Core Formula">
        <SEOFormula
          formula="E = q \times V"
          description="Energy equals charge in elementary charges times voltage; 1 eV = 1 V × e."
        />
        <SEOList items={[
          'E (eV) = V (volts) × number of charges',
          'Convert to Joules by multiplying eV by 1.602×10⁻¹⁹',
          'Scale to keV or MeV for high-energy applications'
        ]} />
      </SEOSection>

      <SEOSection title="Applications">
        <SEOList items={[
          'Particle accelerator voltage-to-energy estimates',
          'Detector calibration from potential difference',
          'Semiconductor device bias to energy comparisons',
          'Educational demos on electron volts',
          'Quick Joule equivalents for engineering'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Why does 1 V equal 1 eV per electron?',
            answer: 'An electron gains 1 eV of energy when accelerated through a 1-volt potential difference.'
          },
          {
            question: 'How do I convert to Joules?',
            answer: 'The calculator multiplies eV by 1.602×10⁻19 J/eV when you choose Joule output.'
          },
          {
            question: 'Can I use other charge amounts?',
            answer: 'Yes. Set the charge multiplier for multiple elementary charges to scale energy accordingly.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
