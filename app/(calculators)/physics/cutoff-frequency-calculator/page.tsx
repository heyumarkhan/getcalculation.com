import CutoffFrequencyCalculator from '../../../_components/calculators/CutoffFrequencyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';


export default function CutoffFrequencyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Cutoff Frequency Calculator"
      description="Calculate cutoff frequency for RC and RL filters using component values and formulas."
      calculator={<CutoffFrequencyCalculator />}
      slug="physics/cutoff-frequency-calculator"
      category="Electronics"
      features={[
        'RC low pass/high pass filters',
        'RL low pass/high pass filters',
        'Calculate fc from components',
        'Calculate components from fc',
        '-3dB point determination',
        'Multiple frequency units',
        'Resistance and component conversions',
        'Step-by-step calculation display'
      ]}
    >
      <SEOSection title="What is Cutoff Frequency?">
        <p>
          Cutoff frequency (fc), also known as the corner frequency or -3dB point, is the frequency at which the output power of a filter circuit is reduced to half (-3dB) of its input power. At this frequency, the voltage gain is reduced by a factor of 1/√2 (approximately 0.707).
        </p>
        <p className="mt-4">
          The cutoff frequency is a critical parameter in RC and RL filters for:
        </p>
        <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
          <li><strong>RC Low Pass Filters:</strong> Allow low frequencies to pass, attenuate high frequencies</li>
          <li><strong>RC High Pass Filters:</strong> Block low frequencies, allow high frequencies to pass</li>
          <li><strong>RL Low Pass Filters:</strong> Use inductance instead of capacitance for filtering</li>
          <li><strong>RL High Pass Filters:</strong> Inductive high pass filtering</li>
        </ul>
        <p className="mt-4">
          Understanding cutoff frequency is essential for circuit design, audio processing, signal conditioning, and EMI/RFI filtering.
        </p>
      </SEOSection>

      <SEOSection title="Cutoff Frequency Formulas">
        <p className="mb-4">
          The cutoff frequency depends on the filter type and components used in the circuit.
        </p>
        <SEOFormula
          formula="fc = \frac{1}{2\pi RC}"
          description="RC Low Pass / High Pass Filter: Where fc is cutoff frequency in Hz, R is resistance in ohms, and C is capacitance in farads."
        />
        <SEOFormula
          formula="fc = \frac{R}{2\pi L}"
          description="RL Low Pass / High Pass Filter: Where fc is cutoff frequency in Hz, R is resistance in ohms, and L is inductance in henries."
        />
        <SEOFormula
          formula="fc = \frac{1}{2\pi \tau} \text{ where } \tau = RC"
          description="Alternative Formula (RC - Time Constant): Where τ (tau) is the RC time constant in seconds."
        />
        <SEOFormula
          formula="\phi = -45° \text{ (for first-order filters)}"
          description="Phase Shift at Cutoff Frequency: At the cutoff frequency, the phase shift is -45 degrees."
        />
      </SEOSection>

      <SEOSection title="How to Use the Cutoff Frequency Calculator">
        <p className="mb-4">
          This calculator helps you determine the cutoff frequency of filter circuits or calculate required component values.
        </p>
        <SEOList ordered items={[
          '<strong>Select Filter Type:</strong> Choose between RC Low Pass, RC High Pass, RL Low Pass, or RL High Pass filters.',
          '<strong>Enter Component Values:</strong> Input resistance (R) in Ω, kΩ, or MΩ, and either capacitance (C) or inductance (L) with appropriate units.',
          '<strong>Click Calculate from Components:</strong> The calculator will compute the cutoff frequency and display step-by-step calculations.',
          '<strong>Calculate Component Values:</strong> Alternatively, enter desired cutoff frequency and one component value, then click "Calculate Component" to find the other component value needed.',
          '<strong>Review Results:</strong> View detailed calculation steps showing the mathematical process and final cutoff frequency value.'
        ]} />
      </SEOSection>

      <SEOSection title="Understanding -3dB Point">
        <p className="mb-4">
          The -3dB point is the standard definition for cutoff frequency in filter design. At this frequency:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Power is reduced to 50% of the input power (Pout = 0.5 × Pin)</li>
          <li>Voltage magnitude is reduced to 70.7% of input (Vout = 0.707 × Vin)</li>
          <li>This equals -3 decibels in logarithmic terms (20 log₁₀(0.707) ≈ -3dB)</li>
          <li>The phase shift is exactly -45° for first-order filters</li>
        </ul>
        <p>
          Above the cutoff frequency, signals are progressively attenuated at a rate of 20dB per decade for first-order filters.
        </p>
      </SEOSection>

      <SEOSection title="RC Filter Applications">
        <p className="mb-4">
          RC filters (using resistors and capacitors) are widely used in:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Audio Processing:</strong> Removing high-frequency noise from analog signals</li>
          <li><strong>Power Supplies:</strong> Filtering ripple from rectified AC voltage</li>
          <li><strong>Signal Conditioning:</strong> Preparing sensor signals for analog-to-digital conversion</li>
          <li><strong>EMI/RFI Suppression:</strong> Protecting circuits from electromagnetic interference</li>
          <li><strong>Tone Controls:</strong> In audio amplifiers and equalizers</li>
        </ul>
        <p>
          RC circuits are preferred for lower frequencies because capacitors are more practical and affordable than inductors at low frequencies.
        </p>
      </SEOSection>

      <SEOSection title="RL Filter Applications">
        <p className="mb-4">
          RL filters (using resistors and inductors) are common in:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Power Electronics:</strong> Filtering high-frequency switching noise from power supplies</li>
          <li><strong>RF Circuits:</strong> Radio frequency circuit applications</li>
          <li><strong>Motor Control:</strong> Protecting motor control circuits from switching transients</li>
          <li><strong>High-Frequency Applications:</strong> More practical than RC for frequencies above several MHz</li>
        </ul>
        <p>
          RL circuits are preferred at higher frequencies where inductors become more practical and capacitive coupling is less desirable.
        </p>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4">
          <strong>Example:</strong> Design an RC low pass filter with a cutoff frequency of 1 kHz and a 10 kΩ resistor.
        </p>
        <p className="mb-4">
          <strong>Solution:</strong>
        </p>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
          <li>Use formula: fc = 1 / (2πRC)</li>
          <li>Rearrange: C = 1 / (2π × fc × R)</li>
          <li>Substitute: C = 1 / (2π × 1000 × 10000)</li>
          <li>Calculate: C = 1 / (62,831,853) = 15.9 nanofarads</li>
        </ol>
        <p>
          You would use a 10 kΩ resistor and a 15.9 nF capacitor (standard value: 16 nF) to achieve approximately 1 kHz cutoff frequency.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the difference between cutoff frequency and corner frequency?',
            answer: 'Cutoff frequency and corner frequency are the same thing—both refer to the -3dB point where the output power is reduced to half of the input power.'
          },
          {
            question: 'Why is the cutoff frequency called the -3dB point?',
            answer: 'Because 20 log₁₀(0.707) = -3.01 dB, and 0.707 is the voltage ratio at the cutoff frequency. This is a standard logarithmic measure used in electronics.'
          },
          {
            question: 'Do RC and RL filters have the same cutoff frequency formula?',
            answer: 'No. RC filters use fc = 1/(2πRC), while RL filters use fc = R/(2πL). However, both follow the same principle of defining the -3dB point.'
          },
          {
            question: 'Can I use this calculator for higher-order filters?',
            answer: 'This calculator is designed for first-order filters. Higher-order filters have more complex transfer functions and may have multiple cutoff frequencies.'
          },
          {
            question: 'What happens above the cutoff frequency in a low pass filter?',
            answer: 'Above the cutoff frequency, the signal is attenuated at approximately 20 dB per decade (or 6 dB per octave) for a first-order filter, depending on the filter order.'
          },
          {
            question: 'How do I choose between RC and RL filters?',
            answer: 'For low frequencies (< 10 kHz), use RC filters—capacitors are smaller and cheaper. For high frequencies (> 1 MHz), RL filters are often more practical.'
          },
          {
            question: 'What is the phase shift at the cutoff frequency?',
            answer: 'At the cutoff frequency, the phase shift is -45 degrees for both RC and RL first-order filters, regardless of filter type.'
          },
          {
            question: 'Can I design a filter without knowing the cutoff frequency?',
            answer: 'Yes, but cutoff frequency is a fundamental parameter. Knowing it helps determine component values and ensure proper signal filtering and protection.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
