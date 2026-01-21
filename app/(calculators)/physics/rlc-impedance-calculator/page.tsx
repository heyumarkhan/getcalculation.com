import RLCImpedanceCalculator from '../../../_components/calculators/RLCImpedanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'RLC Impedance Calculator | Series RLC Reactance, Phase, Resonance';
const description = 'Calculate series RLC impedance magnitude, phase angle, resonance, reactance, Q factor, and current.';
const keywords = [
  'RLC impedance calculator',
  'series rlc calculator',
  'rlc circuit impedance',
  'rlc reactance calculator',
  'rlc resonance calculator',
  'reactance calculator',
  'quality factor calculator',
  'bandwidth calculator',
  'phase angle calculator',
  'inductive reactance calculator',
  'capacitive reactance calculator',
  'resonant frequency calculator',
  'tune capacitance resonance',
  'series rlc current calculator',
  'voltage drop rlc',
  'complex impedance calculator',
  'ac circuit calculator',
  'electrical engineering calculator',
  'physics electronics calculator',
  'power factor phase calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/rlc-impedance-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/rlc-impedance-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RLCImpedanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="RLC Impedance Calculator"
      description="Calculate series RLC impedance, reactance, resonance frequency, phase angle, Q factor, and current."
      calculator={<RLCImpedanceCalculator />}
      slug="physics/rlc-impedance-calculator"
      category="Electromagnetism"
      features={[
        'Four methods: series impedance, resonance & Q, tune capacitance, current & voltage drops',
        'Inputs with flexible units for R, L, C, frequency, and source voltage',
        'Computes reactance (X_L, X_C), impedance magnitude, and phase lead/lag',
        'Resonant frequency, Q factor, and -3 dB bandwidth for series RLC',
        'Capacitance tuning for target resonance frequency',
        'AC current and voltage drops across R, L, and C'
      ]}
    >
      <SEOSection title="RLC Impedance Overview">
        <p>
          The RLC Impedance Calculator analyzes series resistor-inductor-capacitor circuits. It computes inductive and capacitive reactance, impedance magnitude, and phase angle to show whether the circuit is inductive (current lags) or capacitive (current leads). It also provides resonant frequency, quality factor, bandwidth, and tuning capacitance for target resonance—essential for filters, audio crossovers, RF matching, and power electronics.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the RLC Calculator">
        <SEOList
          items={[
            'Choose a method: series impedance, resonance & Q, tune capacitance, or current & voltage drops.',
            'Enter R, L, C, and frequency with appropriate units; add source voltage for current calculations.',
            'Click Calculate to get reactance, impedance magnitude, phase angle, Q factor, or voltage drops.',
            'Interpret phase: inductive (+φ) means current lags; capacitive (-φ) means current leads.',
            'Use tuning mode to find capacitance needed for a target resonant frequency.'
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
            <p className="font-mono font-bold text-lg">|Z| = √(R² + (X_L - X_C)²)</p>
            <p className="text-sm text-gray-600">Series impedance magnitude</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">f₀ = 1 / (2π √(LC))</p>
            <p className="text-sm text-gray-600">Resonant frequency</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">Q = (1/R) √(L/C)</p>
            <p className="text-sm text-gray-600">Quality factor (series RLC)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Series RLC Circuits">
        <SEOList
          items={[
            'Filters: band-pass and notch filters with defined bandwidth and Q.',
            'Audio: crossover networks for speakers and instrument tone shaping.',
            'RF: impedance matching, tuning coils, and antenna resonance.',
            'Power: power factor correction and transient damping.',
            'Test & measurement: ringing control and timing circuits.',
            'Education: visualize phase shift and resonance behavior.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Impedance:</strong> R=50 Ω, L=10 mH, C=1 µF, f=1 kHz → |Z| ≈ 62 Ω, φ ≈ -38° (capacitive).</li>
          <li><strong>Resonance:</strong> L=10 mH, C=1 µF → f₀ ≈ 1591.5 Hz, Q (R=50 Ω) ≈ 0.63.</li>
          <li><strong>Tuning:</strong> L=2 mH, target f=10 kHz → C ≈ 1.27 µF, X_L = X_C ≈ 125.7 Ω.</li>
          <li><strong>Current:</strong> Vs=120 V, |Z|=62 Ω → I ≈ 1.94 A; voltage magnitudes VR=97 V, VL=122 V, VC=122 V (phase-shifted).</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'How do I know if the circuit is inductive or capacitive?',
              answer: 'Compare reactances: if X_L > X_C, the circuit is inductive (current lags). If X_C > X_L, it is capacitive (current leads). At resonance, X_L = X_C and phase is 0°.'
            },
            {
              question: 'What does the Q factor mean?',
              answer: 'Q measures sharpness of resonance. Higher Q gives narrower bandwidth and larger reactive voltages. For series RLC, Q = (1/R)·√(L/C).' 
            },
            {
              question: 'How do I tune to a target frequency?',
              answer: 'Use the tune capacitance mode: pick inductance L and target frequency f, then compute C = 1 / ((2πf)² L).' 
            },
            {
              question: 'Why are VL and VC larger than the source voltage?',
              answer: 'In reactive circuits, individual reactive voltage magnitudes can exceed source voltage due to phase, but they partially cancel, leaving the net source voltage.'
            },
            {
              question: 'What changes reduce bandwidth?',
              answer: 'Lower resistance or higher Q reduces bandwidth (BW ≈ f₀ / Q). Increasing resistance broadens bandwidth and lowers peak current.'
            },
            {
              question: 'Is this calculator for parallel RLC?',
              answer: 'This tool focuses on series RLC. For parallel circuits, formulas differ (admittance, susceptance).'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
