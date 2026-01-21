import CombinedGasLawCalculator from '../../../_components/calculators/CombinedGasLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Combined Gas Law Calculator | P₁V₁/T₁ = P₂V₂/T₂';
const description = 'Calculate gas pressure, volume, and temperature changes using the combined gas law formula.';
const keywords = [
  'combined gas law calculator',
  'gas law calculator',
  'ideal gas law calculator',
  'pressure volume temperature calculator',
  'PVT calculator',
  'gas state calculator',
  'thermodynamics calculator',
  'boyle charles law calculator',
  'gas compression calculator',
  'gas expansion calculator',
  'pv=nrt calculator',
  'gas equation calculator',
  'physics gas calculator',
  'chemistry gas law',
  'pressure temperature calculator',
  'volume pressure calculator',
  'combined gas equation',
  'gas properties calculator',
  'thermodynamic state calculator',
  'ideal gas state calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/combined-gas-law-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/combined-gas-law-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function CombinedGasLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Combined Gas Law Calculator"
      description="Calculate pressure, volume, and temperature relationships for gas state changes using the combined gas law."
      calculator={<CombinedGasLawCalculator />}
      slug="physics/combined-gas-law-calculator"
      category="Physics"
      features={[
        'Four methods: find final temperature, initial volume, final pressure, final volume',
        'Unit-flexible inputs for pressure (Pa, atm, bar, psi), volume (L, m³, mL), temperature (K, °C, °F)',
        'Automatic unit conversions for all quantities',
        'Shows initial and final states with complete parameters',
        'Combined gas law formula: (P₁V₁)/T₁ = (P₂V₂)/T₂',
        'Ideal for thermodynamics, chemistry, and engineering problems'
      ]}
    >
      <SEOSection title="Combined Gas Law Overview">
        <p>
          The Combined Gas Law Calculator relates pressure, volume, and temperature for a fixed amount of gas. It combines Boyle's Law (P∝1/V), Charles's Law (V∝T), and Gay-Lussac's Law (P∝T) into one equation: (P₁V₁)/T₁ = (P₂V₂)/T₂. Essential for predicting gas behavior during compression, expansion, heating, and cooling—used in thermodynamics, chemistry labs, HVAC systems, and pneumatic engineering.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Combined Gas Law Calculator">
        <SEOList
          items={[
            'Select the parameter to find: final temperature, initial volume, final pressure, or final volume.',
            'Enter known initial and final state values (pressure, volume, temperature).',
            'Choose appropriate units: pressure (Pa, kPa, atm, bar, psi, mmHg), volume (m³, L, mL, cm³, ft³), temperature (K, °C, °F).',
            'Click Calculate to get the unknown parameter with automatic unit conversions.',
            'Results display both initial and final states with complete gas properties.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Combined Gas Law Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">(P₁V₁) / T₁ = (P₂V₂) / T₂</p>
            <p className="text-sm text-gray-600">Combined gas law (constant amount of gas)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">T₂ = (P₂ × V₂ × T₁) / (P₁ × V₁)</p>
            <p className="text-sm text-gray-600">Final temperature</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">P₂ = (P₁ × V₁ × T₂) / (V₂ × T₁)</p>
            <p className="text-sm text-gray-600">Final pressure</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">V₂ = (P₁ × V₁ × T₂) / (P₂ × T₁)</p>
            <p className="text-sm text-gray-600">Final volume</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Applications of the Combined Gas Law">
        <SEOList
          items={[
            'Chemistry: predict gas behavior in reactions and experiments at different conditions',
            'HVAC systems: calculate air properties during compression and expansion cycles',
            'Pneumatics: design compressed air systems and actuators',
            'Diving physics: understand gas volume changes with depth and temperature',
            'Weather balloons: predict altitude vs. volume expansion',
            'Industrial processes: gas storage, processing, and transportation'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Heating gas:</strong> P₁ = 1 atm, V₁ = 10 L, T₁ = 300 K → heat to T₂ = 400 K at constant volume → P₂ = 1.33 atm.</li>
          <li><strong>Compression:</strong> P₁ = 1 atm, V₁ = 20 L, T₁ = 273 K → compress to V₂ = 10 L at T₂ = 300 K → P₂ ≈ 2.20 atm.</li>
          <li><strong>Expansion:</strong> P₁ = 2 bar, V₁ = 5 L, T₁ = 350 K → expand to P₂ = 1 bar, T₂ = 300 K → V₂ ≈ 8.57 L.</li>
          <li><strong>Cooling:</strong> P₁ = 101325 Pa, V₁ = 1 m³, T₁ = 400 K → cool to T₂ = 300 K at constant volume → P₂ = 75994 Pa.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is the combined gas law?',
              answer: 'The combined gas law relates pressure, volume, and temperature for a fixed amount of gas: (P₁V₁)/T₁ = (P₂V₂)/T₂. It combines Boyle\'s, Charles\'s, and Gay-Lussac\'s laws.'
            },
            {
              question: 'When is the combined gas law valid?',
              answer: 'Valid for ideal gases (low pressure, high temperature) with constant moles. Real gases deviate at high pressure or low temperature where intermolecular forces matter.'
            },
            {
              question: 'Why must temperature be in Kelvin?',
              answer: 'Gas laws require absolute temperature (Kelvin) because volume and pressure are proportional to absolute temperature, not Celsius or Fahrenheit scales with arbitrary zeros.'
            },
            {
              question: 'How does the combined gas law differ from the ideal gas law?',
              answer: 'Combined gas law: (P₁V₁)/T₁ = (P₂V₂)/T₂ (constant moles). Ideal gas law: PV = nRT (includes moles n). Combined law is for state changes with fixed amount.'
            },
            {
              question: 'What happens if volume is constant?',
              answer: 'If V₁ = V₂, the law simplifies to P₁/T₁ = P₂/T₂ (Gay-Lussac\'s Law): pressure is directly proportional to temperature.'
            },
            {
              question: 'Can I use this for real gases?',
              answer: 'It\'s an approximation. Real gases follow van der Waals or virial equations at high pressure/low temperature. For most conditions (room temp, ~1 atm), ideal behavior is close.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
