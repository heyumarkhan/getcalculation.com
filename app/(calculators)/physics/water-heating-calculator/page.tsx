import WaterHeatingCalculator from '../../../_components/calculators/WaterHeatingCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Water Heating Calculator | Energy, Time, Temperature Rise';
const description = 'Calculate water heating energy, time, temperature rise, and required mass with automatic unit conversions.';
const keywords = [
  'water heating calculator',
  'hot water energy calculator',
  'water heater sizing',
  'water heating time calculator',
  'energy to heat water',
  'kWh to heat water',
  'BTU to heat water',
  'water heating temperature rise',
  'specific heat of water',
  'heat water calculation',
  'water heating efficiency',
  'heater power to time',
  'water heating formula',
  'water heating cost calculator',
  'mass of water to heat',
  'ΔT water heating',
  'Q = m c ΔT water',
  'water heating physics',
  'engineering water heating',
  'thermal energy calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/water-heating-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/water-heating-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function WaterHeatingPage() {
  return (
    <CalculatorPageTemplate
      title="Water Heating Calculator"
      description="Calculate hot water energy, heating time, temperature rise, and required mass with unit conversions."
      calculator={<WaterHeatingCalculator />}
      slug="physics/water-heating-calculator"
      category="Thermodynamics"
      features={[
        'Four methods: energy, time from power, temperature rise, mass from energy',
        'Supports °C, °F, K temperatures and kWh, kJ, J, BTU energy',
        'Power in kW, W, or BTU/h with efficiency factor',
        'Outputs Joules, kWh, BTU plus time in seconds, minutes, hours',
        'Assumes water specific heat by default (4186 J/kg·°C) but editable',
        'Mobile-friendly and ready to embed'
      ]}
    >
      <SEOSection title="Water Heating Calculator Overview">
        <p>
          This Water Heating Calculator estimates the energy required to heat water, the time based on heater power, the resulting temperature rise from a given energy input, or the mass of water you can heat with a known energy. It is tuned for domestic and engineering use cases with automatic unit conversions.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Water Heating Calculator">
        <SEOList
          items={[
            'Select a method: energy, time from power, temperature rise, or mass from energy.',
            'Enter water mass, starting and target temperatures, and specific heat (defaults to water).',
            'Optionally enter energy (kWh, kJ, J, BTU) or heater power (kW, W, BTU/h) with efficiency.',
            'Click Calculate to see results in Joules, kWh, BTU, and time (if applicable).'
          ]}
        />
      </SEOSection>

      <SEOSection title="Core Water Heating Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">Q = m × c × ΔT</p>
            <p className="text-sm text-gray-600">Energy to heat water from start to target temperature</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">t = Q / (P × η)</p>
            <p className="text-sm text-gray-600">Heating time from heater power and efficiency</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">ΔT = Q / (m × c)</p>
            <p className="text-sm text-gray-600">Temperature rise from supplied energy</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">m = Q / (c × ΔT)</p>
            <p className="text-sm text-gray-600">Water mass that can be heated with known energy</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <SEOList
          items={[
            'Energy: J, kJ, kWh, BTU',
            'Power: W, kW, BTU/h',
            'Temperature: °C, °F, K',
            'Mass: kg, g, lb, oz',
            'Specific heat: default 4186 J/kg·°C (water), editable for other fluids'
          ]}
        />
      </SEOSection>

      <SEOSection title="Applications">
        <SEOList
          items={[
            'Sizing residential and commercial water heaters',
            'Estimating energy cost for hot water production',
            'Designing solar thermal or heat pump water systems',
            'Process heating in food, pharma, and beverage plants',
            'Laboratory and pilot heating calculations',
            'HVAC hydronic heating estimates'
          ]}
        />
      </SEOSection>

      <SEOSection title="Worked Examples">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Energy:</strong> Heat 50 L (≈50 kg) from 15°C to 55°C → Q ≈ 8.4 kWh.</li>
          <li><strong>Time:</strong> A 3 kW heater at 90% efficiency needs t ≈ 8.4 kWh / (3 kW × 0.9) ≈ 3.1 h.</li>
          <li><strong>Temperature Rise:</strong> Supplying 2 kWh to 20 kg of water raises temperature by ΔT ≈ 21.5°C.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What specific heat should I use?',
              answer: 'Use 4186 J/kg·°C for liquid water near room temperature. Adjust if you are heating other fluids.'
            },
            {
              question: 'How does efficiency affect heating time?',
              answer: 'Higher efficiency lowers time because more input power becomes heat. Electric resistance heaters are near 100%; gas heaters vary.'
            },
            {
              question: 'Can I mix °F and kWh?',
              answer: 'Yes. The calculator converts °F to °C and kWh to Joules before solving Q = m × c × ΔT.'
            },
            {
              question: 'Is this the same as specific heat calculations?',
              answer: `For water, it uses the same formula as ${createInternalLink('specific-heat-calculator', 'specific heat calculations')} with water-specific inputs.`
            },
            {
              question: 'Does it include latent heat for boiling?',
              answer: 'No. This tool covers sensible heating below boiling. For phase change, include latent heat separately.'
            },
            {
              question: 'How do I estimate cost?',
              answer: 'Multiply kWh by your electricity rate or BTU by fuel cost per BTU. The calculator outputs kWh and BTU to help.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
