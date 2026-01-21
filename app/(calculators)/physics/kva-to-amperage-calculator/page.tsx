import KvaToAmperageCalculator from '../../../_components/calculators/KvaToAmperageCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'kVA to Amperage Calculator | Convert kVA to Amps';
const description = 'Calculate current (amps) from apparent power (kVA) for single-phase, three-phase AC, and DC electrical systems.';
const keywords = [
  'kva to amperage calculator',
  'kva to amps calculator',
  'kva to current calculator',
  'apparent power to current calculator',
  'kva calculator',
  'amperage from kva',
  'single phase kva to amps',
  'three phase kva to amps',
  'electrical power calculator',
  'voltage current calculator',
  'kva conversion calculator',
  'electrical current calculator',
  'power to amperage calculator',
  'kva to a calculator',
  'calculate amps from kva',
  'kva amperage conversion',
  'electrical load calculator',
  'transformer sizing calculator',
  'circuit amperage calculator',
  'ac power calculator',
  'kva amp calculator',
  'electrical engineering calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/kva-to-amperage-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/kva-to-amperage-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function KvaToAmperageCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="kVA to Amperage Calculator"
      description="Calculate electrical current (amperes) from apparent power (kVA) for single-phase, three-phase AC, and DC systems."
      calculator={<KvaToAmperageCalculator />}
      slug="physics/kva-to-amperage-calculator"
      category="Physics"
      features={[
        'Four calculation methods: single-phase AC, three-phase AC, DC power, and reverse kVA calculation',
        'Unit-flexible inputs for voltage (V, kV, mV) and current (A, mA, kA)',
        'Automatic conversions between units',
        'Accurate formulas for AC and DC electrical systems',
        'Shows complete calculations with step-by-step explanations',
        'Perfect for transformer sizing, circuit design, and electrical load calculations'
      ]}
    >
      <SEOSection title="Understanding kVA to Amperage Conversion">
        <p>
          The kVA to Amperage Calculator converts apparent power (kVA - kilovolt-amperes) to electrical current (amperes). kVA represents the total power in an AC circuit, combining real power (kW) and reactive power (kVAR). This calculator is essential for electrical engineers, electricians, and technicians sizing transformers, generators, circuit breakers, and electrical distribution systems. Different formulas apply for single-phase AC (I = S/V), three-phase AC (I = S/(√3×V)), and DC systems (I = P/V).
        </p>
      </SEOSection>

      <SEOSection title="How to Use the kVA to Amperage Calculator">
        <SEOList
          items={[
            'Select calculation method: single-phase AC, three-phase AC, DC power, or calculate kVA from current.',
            'Enter the apparent power in kVA (or kW for DC systems).',
            'Input the voltage value and select the unit (V, kV, or mV).',
            'For three-phase systems, enter the line-to-line voltage.',
            'For reverse calculations, enter current and voltage to find kVA.',
            'Click Calculate to get the current in amperes with detailed calculation steps.'
          ]}
        />
      </SEOSection>

      <SEOSection title="kVA to Amperage Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">I = S / V</p>
            <p className="text-sm text-gray-600">Single-phase AC current (amps) from apparent power (VA) and voltage (V)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">I = S / (√3 × V)</p>
            <p className="text-sm text-gray-600">Three-phase AC line current from apparent power and line-to-line voltage</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">I = P / V</p>
            <p className="text-sm text-gray-600">DC current from real power (W) and voltage (V)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">S = V × I</p>
            <p className="text-sm text-gray-600">Apparent power (VA) from voltage and current (reverse calculation)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Applications of kVA to Amperage Calculator">
        <SEOList
          items={[
            'Transformer sizing: determine required transformer capacity for electrical loads',
            'Generator selection: calculate generator size needed for specific current demands',
            'Circuit breaker sizing: ensure proper protection for electrical circuits',
            'Electrical panel design: size main breakers and feeder cables',
            'Motor control: calculate starting and running currents for motor circuits',
            'Industrial power distribution: plan electrical infrastructure for factories and facilities',
            'Building electrical systems: design residential and commercial power systems',
            'Renewable energy: size inverters and conductors for solar and wind systems'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Single-phase AC:</strong> 10 kVA at 230 V → I = 10,000 VA / 230 V = 43.48 A</li>
          <li><strong>Three-phase AC:</strong> 50 kVA at 400 V line-to-line → I = 50,000 VA / (√3 × 400 V) = 72.17 A per phase</li>
          <li><strong>DC system:</strong> 5 kW at 48 V DC → I = 5,000 W / 48 V = 104.17 A</li>
          <li><strong>Reverse calculation:</strong> 100 A at 120 V single-phase → S = 120 V × 100 A = 12 kVA</li>
          <li><strong>High voltage:</strong> 200 kVA at 11 kV three-phase → I = 200,000 VA / (√3 × 11,000 V) = 10.50 A</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is kVA and how does it differ from kW?',
              answer: 'kVA (kilovolt-amperes) is apparent power - the total power in an AC circuit. kW (kilowatts) is real power - the actual power doing work. They relate by power factor: kW = kVA × PF. For DC systems, kVA = kW because there\'s no reactive power.'
            },
            {
              question: 'Why is the three-phase formula different from single-phase?',
              answer: 'Three-phase systems distribute power across three conductors with phases 120° apart. The √3 factor (≈1.732) accounts for the phase relationship. This allows three-phase systems to deliver more power with less conductor material than single-phase.'
            },
            {
              question: 'What voltage should I use for three-phase calculations?',
              answer: 'Use line-to-line voltage (voltage between any two phases), not phase-to-neutral. Common three-phase voltages: 208V, 240V, 400V, 415V, 480V, 600V. The calculator computes line current (current in each conductor).'
            },
            {
              question: 'How do I size a transformer using this calculator?',
              answer: 'Calculate total load current, add 25% safety margin, then select a transformer rated for that current at your voltage. For example, if load draws 80A at 240V, total is 80 × 1.25 = 100A, requiring a transformer rated ≥24 kVA (100A × 240V / 1000).'
            },
            {
              question: 'Does power factor affect kVA to amperage conversion?',
              answer: 'Power factor doesn\'t appear in the formula because kVA is apparent power (already includes reactive component). If you have kW instead, first convert: kVA = kW / power_factor, then use this calculator. Typical power factors: 0.8-0.95 for motors, 0.95-1.0 for resistive loads.'
            },
            {
              question: 'Can I use this for circuit breaker sizing?',
              answer: 'Yes, calculate the load current then apply NEC (National Electrical Code) safety factors. Generally, breaker rating should be 125% of continuous load current. For example, 40A continuous load requires minimum 50A breaker (40 × 1.25).'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
