import RCFilterCalculator from '@/app/_components/calculators/RCFilterCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'RC Filter Calculator | Cutoff Frequency, Impedance, and Time Constant';
const description = 'Calculate RC filter cutoff frequency, capacitive reactance, and time constant instantly with multiple methods.';
const keywords = [
  'RC filter calculator',
  'RC low pass filter calculator',
  'cutoff frequency calculator',
  'RC circuit calculator',
  'capacitive reactance calculator',
  'RC time constant calculator',
  'RC filter frequency',
  'RC filter impedance',
  'low pass filter RC',
  'RC filter design',
  'fc = 1/(2πRC)',
  'Xc = 1/(2πfC)',
  'RC filter equation',
  'filter design calculator',
  'electronics calculator',
  'first order filter calculator',
  'corner frequency calculator',
  'RC filter formula',
  'tau = RC calculator',
  'break frequency calculator',
  'half power frequency calculator',
  'filter rolloff calculator',
  'RC network calculator',
  'signal filtering calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/rc-filter-calculator'
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/rc-filter-calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  }
};

export default function RCFilterCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="RC Filter Calculator"
      description="Calculate RC filter parameters including cutoff frequency, impedance, and time constant."
      calculator={<RCFilterCalculator />}
      slug="physics/rc-filter-calculator"
      category="Physics"
      features={[
        'Calculate cutoff frequency from resistance and capacitance',
        'Compute capacitive reactance (impedance) at any frequency',
        'Determine time constant from R and C values',
        'Find cutoff frequency from time constant',
        'Outputs in multiple units (Hz, kHz, Ω, ms, µs)',
        'Supports common RC filter configurations'
      ]}
    >
      <SEOSection title="What is an RC Filter?">
        <p>
          An RC filter (resistor–capacitor filter) is a passive electronic filter circuit consisting of a resistor and capacitor. RC filters are fundamental building blocks in signal processing, used to attenuate or pass signals at different frequencies. The most common type is the low-pass RC filter, which allows low frequencies to pass while blocking high frequencies. RC filters are widely used in power supplies, audio systems, instrumentation, and data acquisition applications.
        </p>
        <p className="mt-3">
          The key characteristics of an RC filter are its cutoff frequency (corner frequency or half-power frequency), where the filter transitions from passing signals to blocking them. Understanding RC filter parameters is essential for circuit design and troubleshooting.
        </p>
      </SEOSection>

      <SEOSection title="RC Filter Formulas">
        <ul>
          <li><strong>Cutoff Frequency:</strong> f_c = 1 / (2πRC) where R is in ohms, C is in farads, and f_c is in Hz</li>
          <li><strong>Capacitive Reactance:</strong> X_c = 1 / (2πfC) representing impedance at frequency f</li>
          <li><strong>Time Constant:</strong> τ = RC measured in seconds; represents the time for the capacitor to charge/discharge to 63.2% of input</li>
          <li><strong>Cutoff from τ:</strong> f_c = 1 / (2πτ) using time constant to find cutoff frequency</li>
          <li><strong>Impedance at Cutoff:</strong> Z = R ≈ 0.707 × |Z_source| for maximum power transfer conditions</li>
          <li><strong>Phase Shift:</strong> φ = arctan(−X_c/R) determines phase delay through filter</li>
        </ul>
      </SEOSection>

      <SEOSection title="Understanding Cutoff Frequency">
        <p>
          The cutoff frequency (also called corner frequency or −3 dB frequency) is the frequency at which the filter attenuates the input signal by 3 decibels (to 70.7% of the original amplitude). Below the cutoff frequency, the low-pass filter passes the signal with minimal attenuation. Above the cutoff frequency, the filter increasingly attenuates the signal at approximately 20 dB per decade (first-order filter roll-off).
        </p>
        <p className="mt-3">
          For an RC low-pass filter, the cutoff frequency depends only on R and C: smaller component values yield higher cutoff frequencies. This relationship is fundamental to filter design—by choosing appropriate R and C values, engineers can precisely set the frequency response.
        </p>
      </SEOSection>

      <SEOSection title="RC Time Constant (τ) and Its Significance">
        <p>
          The time constant τ = RC represents the charging and discharging behavior of an RC circuit. After time τ, a capacitor charges to approximately 63.2% of the applied voltage (or discharges to 36.8%). After 5τ, the capacitor is considered fully charged (99.3%). The time constant is critical for understanding transient response and is directly related to the cutoff frequency: f_c = 1/(2πτ).
        </p>
        <p className="mt-3">
          Time constants are essential in timing circuits, integrators, differentiators, and filter design. A larger time constant results in a lower cutoff frequency and slower response time; a smaller time constant yields a higher cutoff frequency and faster response.
        </p>
      </SEOSection>

      <SEOSection title="Applications of RC Filters">
        <SEOList
          items={[
            '<strong>Power Supply Filtering:</strong> RC filters smooth DC outputs in power supplies to reduce ripple and noise from rectified AC voltage.',
            '<strong>Audio Processing:</strong> RC filters shape frequency response in amplifiers, removing high-frequency noise or unwanted harmonics.',
            '<strong>Anti-Aliasing Filters:</strong> RC filters prevent aliasing in analog-to-digital conversion by removing frequencies above the Nyquist frequency.',
            '<strong>Sensor Signal Conditioning:</strong> Filter noise from sensors and transducers before digitization in data acquisition systems.',
            '<strong>Coupling and Decoupling:</strong> AC coupling capacitors paired with resistors form high-pass RC filters; decoupling capacitors suppress noise.',
            '<strong>Timing Circuits:</strong> RC time constants set pulse durations, delay times, and oscillation frequencies in timers and oscillators.'
          ]}
        />
      </SEOSection>

      <SEOSection title="How to Use the RC Filter Calculator">
        <SEOList
          items={[
            '<strong>Method 1 – Cutoff Frequency from R & C:</strong> Enter resistance (Ω) and capacitance (F) to calculate the cutoff frequency using f_c = 1/(2πRC). Results display in Hz and kHz.',
            '<strong>Method 2 – Capacitive Reactance:</strong> Enter frequency (Hz) and capacitance (F) to find impedance at that frequency using X_c = 1/(2πfC).',
            '<strong>Method 3 – Time Constant:</strong> Enter resistance and capacitance to compute time constant τ = RC in milliseconds and microseconds.',
            '<strong>Method 4 – Cutoff from τ:</strong> Enter time constant (seconds) to determine cutoff frequency using f_c = 1/(2πτ).'
          ]}
        />
      </SEOSection>

      <SEOSection title="RC Filter Design Considerations">
        <ul>
          <li>Select R and C values using standard component values for easy sourcing and cost-effectiveness</li>
          <li>Ensure resistor tolerance (typically 1–5%) meets design accuracy requirements</li>
          <li>Use film or ceramic capacitors for lower ESR (equivalent series resistance) and better high-frequency performance</li>
          <li>Account for capacitor parasitics; at high frequencies, inductance becomes significant</li>
          <li>Calculate component power dissipation, especially for resistors handling continuous current</li>
          <li>Consider temperature coefficients; component values drift with temperature, shifting cutoff frequency</li>
          <li>For multiple filter stages, cascade with buffer amplifiers to prevent interaction and loading effects</li>
        </ul>
      </SEOSection>

      <SEOSection title="Worked Examples">
        <p><strong>Example 1: Cutoff Frequency</strong><br />
          R = 1 kΩ, C = 0.1 µF → f_c = 1 / (2π × 1000 × 10^−7) = 1591.5 Hz ≈ 1.59 kHz
        </p>
        <p className="mt-3"><strong>Example 2: Capacitive Reactance</strong><br />
          f = 1 kHz, C = 100 nF → X_c = 1 / (2π × 1000 × 10^−7) = 1591.5 Ω ≈ 1.59 kΩ
        </p>
        <p className="mt-3"><strong>Example 3: Time Constant</strong><br />
          R = 10 kΩ, C = 10 µF → τ = 10000 × 10^−5 = 0.1 s = 100 ms
        </p>
        <p className="mt-3"><strong>Example 4: Cutoff from Time Constant</strong><br />
          τ = 1 ms = 0.001 s → f_c = 1 / (2π × 0.001) ≈ 159.15 Hz
        </p>
      </SEOSection>

      <SEOSection title="RC Filter vs Other Filter Types">
        <ul>
          <li><strong>RC Filter:</strong> Simple, passive, first-order roll-off (20 dB/decade); no power supply needed; poor roll-off steepness.</li>
          <li><strong>RL Filter:</strong> Uses resistor and inductor; high-frequency attenuation; bulkier inductors; inductive parasitics affect performance.</li>
          <li><strong>Active Filters:</strong> Employ op-amps for gain and steeper roll-off; require power supply; more complex and expensive.</li>
          <li><strong>Digital Filters:</strong> Implemented in software or DSP; very flexible frequency response; introduces latency and requires ADC/DAC.</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the cutoff frequency of an RC filter?',
            answer: 'The cutoff frequency (−3 dB frequency) is the frequency at which the filter attenuates the signal to 70.7% of its input level. It is calculated as f_c = 1 / (2πRC), where R is in ohms and C is in farads.'
          },
          {
            question: 'How do I lower the cutoff frequency of an RC filter?',
            answer: 'To lower the cutoff frequency, increase either R or C (or both). Since f_c is inversely proportional to RC, larger component values yield lower cutoff frequencies. For example, doubling R or C halves the cutoff frequency.'
          },
          {
            question: 'What is time constant τ in RC circuits?',
            answer: 'The time constant τ = RC represents the time for a capacitor to charge to 63.2% (or discharge to 36.8%) of the applied voltage. It determines the response speed of the circuit. After 5τ, the capacitor is considered fully charged.'
          },
          {
            question: 'What is capacitive reactance (impedance)?',
            answer: 'Capacitive reactance X_c = 1 / (2πfC) is the opposition a capacitor presents to AC current at frequency f. At low frequencies, X_c is large (capacitor blocks); at high frequencies, X_c is small (capacitor conducts).'
          },
          {
            question: 'How steep is the RC filter roll-off?',
            answer: 'A first-order RC filter rolls off at approximately 20 dB per decade (or 6 dB per octave) above the cutoff frequency. This means the attenuation increases by 20 dB for every tenfold increase in frequency beyond f_c.'
          },
          {
            question: 'Can I cascade RC filters for steeper roll-off?',
            answer: 'Yes, cascading multiple RC filter stages increases roll-off steepness. For example, two identical stages yield 40 dB/decade (second-order). However, cascading can cause loading effects unless stages are buffered with op-amps.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
