import RLCCircuitCalculator from '../../../_components/calculators/RLCCircuitCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'RLC Circuit Calculator | Impedance, Resonance, Phase, Power Factor';
const description = 'Analyze RLC circuits for impedance, resonance, phase angle, power factor, and current.';
const keywords = [
  'rlc circuit calculator',
  'series rlc calculator',
  'parallel rlc calculator',
  'rlc impedance calculator',
  'rlc resonance calculator',
  'rlc reactance calculator',
  'rlc phase angle calculator',
  'power factor calculator',
  'bandwidth calculator',
  'quality factor calculator',
  'tune rlc circuit',
  'rlc current calculator',
  'rlc voltage drop',
  'ac circuit calculator',
  'complex impedance calculator',
  'electrical engineering calculator',
  'electronics calculator',
  'physics electromagnetism calculator',
  'series parallel rlc',
  'impedance magnitude calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/rlc-circuit-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/rlc-circuit-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RLCCircuitCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="RLC Circuit Calculator"
      description="Compute series and parallel RLC impedance, resonance, phase shift, power factor, and current."
      calculator={<RLCCircuitCalculator />}
      slug="physics/rlc-circuit-calculator"
      category="Electromagnetism"
      features={[
        'Four methods: series impedance, parallel impedance, resonance & Q, current & power',
        'Unit-flexible inputs for R, L, C, frequency, and source voltage',
        'Series and parallel impedance magnitude and phase',
        'Resonant frequency, quality factor, and -3 dB bandwidth',
        'Capacitance/inductance effects shown via reactance and phase',
        'Power factor and real power for series RLC'
      ]}
    >
      <SEOSection title="RLC Circuit Overview">
        <p>
          The RLC Circuit Calculator evaluates resistor-inductor-capacitor networks in series and parallel. It computes reactance (X_L, X_C), impedance magnitude and phase, power factor, current, and resonance metrics (f₀, Q, bandwidth). Use it for filter design, power factor correction, audio crossovers, RF tuning, and electronics labs.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the RLC Circuit Calculator">
        <SEOList
          items={[
            'Select a mode: series impedance, parallel impedance, resonance & Q, or current & power.',
            'Enter component values (R, L, C) and frequency; add source voltage for current/power.',
            'Review outputs for impedance magnitude, phase angle, reactance balance, and resonance.',
            'Use power mode to get current, power factor, and real power.',
            'Adjust L or C to see how resonance and phase shift change.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Key RLC Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">X_L = 2π f L</p>
            <p className="text-sm text-gray-600">Inductive reactance</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">X_C = 1 / (2π f C)</p>
            <p className="text-sm text-gray-600">Capacitive reactance</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">|Z_series| = √(R² + (X_L - X_C)²)</p>
            <p className="text-sm text-gray-600">Series impedance</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">|Z_parallel| = 1 / √(G² + B²)</p>
            <p className="text-sm text-gray-600">Parallel impedance (G = 1/R, B = ωC - 1/(ωL))</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">f₀ = 1 / (2π √(LC)),  Q = (1/R) √(L/C)</p>
            <p className="text-sm text-gray-600">Resonant frequency and quality factor (series)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Applications">
        <SEOList
          items={[
            'Filter design: band-pass, band-stop, and tuning networks',
            'Power factor correction and reactive compensation',
            'Audio: speaker crossovers and tone-shaping circuits',
            'RF: impedance matching, antenna tuning, and oscillators',
            'Industrial AC circuits: phase and current management',
            'Education: visualize resonance, phase, and reactance balance'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Scenarios">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Series impedance:</strong> R=50 Ω, L=10 mH, C=1 µF, f=1 kHz → |Z| ≈ 62 Ω, φ ≈ -38°.</li>
          <li><strong>Parallel impedance:</strong> R=200 Ω || L=5 mH || C=2 µF at 1 kHz → |Z| ≈ 154 Ω, φ ≈ +21° (inductive).</li>
          <li><strong>Resonance:</strong> L=10 mH, C=1 µF → f₀ ≈ 1591.5 Hz, Q (R=50 Ω) ≈ 0.63.</li>
          <li><strong>Power mode:</strong> Vs=120 V, |Z|=62 Ω → I ≈ 1.94 A, PF ≈ 0.80.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'When is an RLC circuit inductive or capacitive?',
              answer: 'If X_L > X_C the circuit is inductive (current lags); if X_C > X_L it is capacitive (current leads). At resonance, X_L = X_C and phase is 0°.'
            },
            {
              question: 'What does power factor indicate?',
              answer: 'Power factor is the cosine of the phase angle between voltage and current. PF < 1 indicates reactive power; PF = 1 at perfect resonance in series RLC.'
            },
            {
              question: 'How is parallel impedance calculated?',
              answer: 'Use admittance: Y = G + jB with G = 1/R and B = ωC - 1/(ωL). Impedance magnitude |Z| = 1 / |Y|, phase = -atan(B/G).' 
            },
            {
              question: 'How do I shift resonance?',
              answer: 'Increase C or L to lower f₀; decrease either to raise f₀. Small changes in C are common for fine tuning.'
            },
            {
              question: 'Is this for AC only?',
              answer: 'Yes. RLC behavior matters in AC or time-varying signals. At DC, capacitors open-circuit and inductors short-circuit after transients.'
            },
            {
              question: 'What about parallel resonance?',
              answer: 'This tool focuses on series resonance formulas; parallel resonance (tank circuits) can be approximated via admittance but uses different Q definitions.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
