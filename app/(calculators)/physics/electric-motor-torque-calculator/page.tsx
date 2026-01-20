import ElectricMotorTorqueCalculator from '../../../_components/calculators/ElectricMotorTorqueCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Electric Motor Torque Calculator | Shaft Torque from Power and Speed';
const description = 'Calculate electric motor torque from power, speed, efficiency, torque constant, or force-radius. Supports N·m and lb·ft with rpm and rad/s conversions.';
const keywords = [
  'electric motor torque calculator',
  'motor torque from power',
  'shaft torque calculator',
  'torque from horsepower',
  'torque from kilowatts',
  'rpm to torque calculator',
  'motor torque constant',
  'Kt torque calculator',
  'torque from current',
  'electric motor efficiency torque',
  'shaft power to torque',
  'lb ft torque calculator',
  'Nm torque calculator',
  'motor speed torque',
  'electric drive torque',
  'industrial motor torque',
  'servo motor torque',
  'dc motor torque',
  'ac motor torque',
  'engineering torque calculator',
  'physics torque calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/electric-motor-torque-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/electric-motor-torque-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function ElectricMotorTorquePage() {
  return (
    <CalculatorPageTemplate
      title="Electric Motor Torque Calculator"
      description="Find electric motor shaft torque from power, speed, efficiency, torque constant, or force-radius with instant unit conversions."
      calculator={<ElectricMotorTorqueCalculator />}
      slug="physics/electric-motor-torque-calculator"
      category="Mechanics"
      features={[
        'Four methods: power-speed, power-efficiency-speed, torque constant-current, force-radius',
        'Supports kW, W, HP input power with rpm or rad/s speeds',
        'Outputs torque in newton-meters and pound-feet',
        'Includes torque constant conversion (N·m/A, oz-in/A, lb·ft/A)',
        'Step-by-step calculation details',
        'Mobile-friendly and ready to embed'
      ]}
    >
      <SEOSection title="Electric Motor Torque Calculator Overview">
        <p>
          Torque is the turning force produced at a motor shaft. This Electric Motor Torque Calculator converts power, speed, current, or mechanical force into shaft torque with automatic unit handling for N·m and lb·ft. It is useful for sizing motors, checking drive requirements, and validating nameplate values.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Calculator">
        <SEOList
          items={[
            'Power + Speed: Enter output power (kW, W, HP) and shaft speed (rpm or rad/s) to compute τ = P / ω.',
            'Input Power + Efficiency + Speed: Enter input power, efficiency (%), and speed to get load torque with losses accounted.',
            'Torque Constant + Current: Enter motor torque constant Kt and armature current to calculate electromagnetic torque.',
            'Force + Radius: Enter tangential force and pulley radius to find torque using τ = F × r.'
          ]}
        />
        <p>
          Choose a method, fill in the fields, and click Calculate. Results show N·m plus lb·ft with the applied formula.
        </p>
      </SEOSection>

      <SEOSection title="Key Formulas for Motor Torque">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ = P / ω</p>
            <p className="text-sm text-gray-600">Torque from mechanical output power and angular speed</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ = (P_in × η) / ω</p>
            <p className="text-sm text-gray-600">Torque from input power, efficiency, and speed</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ = Kt × I</p>
            <p className="text-sm text-gray-600">Torque from motor torque constant and current</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ = F × r</p>
            <p className="text-sm text-gray-600">Torque from tangential force and radius</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <SEOList
          items={[
            'Torque: N·m (SI), lb·ft (imperial)',
            'Power: W, kW, HP',
            'Speed: rpm converted to rad/s automatically',
            'Torque constant: N·m/A, oz-in/A, lb·ft/A',
            'Force: N, lbf, kgf',
            'Radius: m, cm, mm, in, ft'
          ]}
        />
        <p>
          The calculator handles all conversions internally so you can mix inputs. The output always shows N·m with a helpful lb·ft equivalent.
        </p>
      </SEOSection>

      <SEOSection title="Applications">
        <SEOList
          items={[
            'Sizing electric motors for conveyors, pumps, and fans',
            'Validating nameplate horsepower against required torque',
            'Checking servo motor torque with Kt and current',
            'Estimating startup torque for belts and pulleys',
            'Comparing AC and DC motor torque at different speeds',
            'Designing gearboxes and couplings for required torque capacity'
          ]}
        />
      </SEOSection>

      <SEOSection title="Worked Examples">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Power & Speed:</strong> A 5 kW motor at 1800 rpm delivers τ = 5 kW × 60 / (2π × 1800) ≈ 26.5 N·m.</li>
          <li><strong>Input Power & Efficiency:</strong> A 4 kW input, 90% efficient motor at 1500 rpm gives τ ≈ (4000 × 0.9) / (2π × 1500/60) ≈ 22.9 N·m.</li>
          <li><strong>Kt & Current:</strong> Kt = 0.65 N·m/A with 10 A yields τ = 6.5 N·m (≈ 4.79 lb·ft).</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'How do I get torque from horsepower and rpm?',
              answer: 'Use τ = (HP × 745.7) / ω, where ω = 2π × rpm / 60. The calculator handles this automatically.'
            },
            {
              question: 'What is motor torque constant Kt?',
              answer: 'Kt links current to torque (N·m/A). Enter Kt and current to get electromagnetic torque directly.'
            },
            {
              question: 'Do I need efficiency?',
              answer: 'If you know input power and efficiency, you can estimate shaft torque. If you only know output power, use the basic power-speed method.'
            },
            {
              question: 'Can I mix units like HP and rpm?',
              answer: 'Yes. The calculator converts HP to watts and rpm to rad/s before solving for torque.'
            },
            {
              question: 'Is lb·ft shown?',
              answer: 'Yes. Results show N·m plus lb·ft for quick imperial referencing.'
            },
            {
              question: 'Where can I learn more about torque?',
              answer: `See the ${createInternalLink('torque-calculator', 'torque calculator')} for basic lever-arm torque calculations.`
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
