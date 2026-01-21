import PowerDissipationCalculator from '../../../_components/calculators/PowerDissipationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Power Dissipation Calculator | Calculate Heat Loss in Resistors';
const description = 'Calculate power dissipation in resistors, capacitors, and electrical components using voltage, current, and resistance formulas.';
const keywords = [
  'power dissipation calculator',
  'power dissipation formula',
  'resistor power calculator',
  'heat dissipation calculator',
  'power loss calculator',
  'resistor wattage calculator',
  'electrical power dissipation',
  'power consumption calculator',
  'i2r loss calculator',
  'joule heating calculator',
  'thermal power calculator',
  'resistor heat calculator',
  'power rating calculator',
  'capacitor esr power loss',
  'component power calculator',
  'circuit power dissipation',
  'ohmic heating calculator',
  'electrical heat loss',
  'power dissipation resistance',
  'watt dissipation calculator',
  'energy dissipation calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/power-dissipation-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/power-dissipation-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function PowerDissipationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Power Dissipation Calculator"
      description="Calculate power dissipation (heat loss) in electrical components including resistors, capacitors, and circuits."
      calculator={<PowerDissipationCalculator />}
      slug="physics/power-dissipation-calculator"
      category="Physics"
      features={[
        'Four calculation methods: resistor P=V²/R, component P=V×I, resistor P=I²×R, capacitor ESR loss',
        'Unit-flexible inputs for voltage (V, kV, mV), current (A, mA, μA), resistance (Ω, kΩ, MΩ, mΩ)',
        'Capacitor power dissipation with ESR and frequency analysis',
        'Automatic calculation of related parameters (current, voltage, resistance)',
        'Shows power in watts with energy dissipation as heat',
        'Perfect for circuit design, thermal management, and component selection'
      ]}
    >
      <SEOSection title="Understanding Power Dissipation">
        <p>
          The Power Dissipation Calculator determines the rate at which electrical energy converts to heat in components. Power dissipation occurs in all real-world electrical components due to resistance, causing Joule heating (I²R losses). Key formulas include P = V²/R, P = I²R, and P = VI. Dissipated power appears as heat, requiring thermal management through heat sinks, cooling, or proper component power ratings. Critical for circuit design, reliability engineering, thermal analysis, and preventing component failure from overheating.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Power Dissipation Calculator">
        <SEOList
          items={[
            'Select calculation method based on known parameters: voltage/resistance, voltage/current, current/resistance, or capacitor ESR.',
            'For resistors with voltage: enter voltage and resistance to find P = V²/R.',
            'For components with V and I: enter voltage and current to find P = V × I.',
            'For resistors with current: enter current and resistance to find P = I²R.',
            'For capacitors: enter capacitance, frequency, voltage, and ESR for power loss in ESR.',
            'Choose appropriate units for each quantity (voltage, current, resistance, capacitance).',
            'Click Calculate to get power dissipation with related circuit parameters.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Power Dissipation Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">P = V² / R</p>
            <p className="text-sm text-gray-600">Power dissipated in resistor with known voltage and resistance</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">P = I² × R</p>
            <p className="text-sm text-gray-600">Power dissipated in resistor with known current and resistance (Joule heating)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">P = V × I</p>
            <p className="text-sm text-gray-600">Power consumed/dissipated by any component (general formula)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">P = I² × ESR (capacitor)</p>
            <p className="text-sm text-gray-600">Power loss in capacitor ESR, where I = V / Xc and Xc = 1/(2πfC)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Resistor Power Ratings">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Power Rating</th>
                <th className="px-4 py-2 border">Typical Package</th>
                <th className="px-4 py-2 border">Max Voltage (100Ω)</th>
                <th className="px-4 py-2 border">Max Current (10Ω)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2 border">1/8 W (0.125 W)</td><td className="px-4 py-2 border">0805 SMD</td><td className="px-4 py-2 border">3.5 V</td><td className="px-4 py-2 border">112 mA</td></tr>
              <tr><td className="px-4 py-2 border">1/4 W (0.25 W)</td><td className="px-4 py-2 border">1206 SMD</td><td className="px-4 py-2 border">5 V</td><td className="px-4 py-2 border">158 mA</td></tr>
              <tr><td className="px-4 py-2 border">1/2 W (0.5 W)</td><td className="px-4 py-2 border">Through-hole</td><td className="px-4 py-2 border">7.1 V</td><td className="px-4 py-2 border">224 mA</td></tr>
              <tr><td className="px-4 py-2 border">1 W</td><td className="px-4 py-2 border">Through-hole</td><td className="px-4 py-2 border">10 V</td><td className="px-4 py-2 border">316 mA</td></tr>
              <tr><td className="px-4 py-2 border">2 W</td><td className="px-4 py-2 border">Through-hole</td><td className="px-4 py-2 border">14.1 V</td><td className="px-4 py-2 border">447 mA</td></tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Power Dissipation Calculator">
        <SEOList
          items={[
            'Circuit design: select resistor power ratings to prevent thermal failure',
            'Thermal management: calculate heat sink requirements for power components',
            'LED circuits: determine current limiting resistor wattage',
            'Power supplies: calculate efficiency losses in voltage regulators and MOSFETs',
            'Battery systems: estimate heat generation in charging/discharging circuits',
            'Motor control: analyze power losses in H-bridge drivers and switching circuits',
            'Audio amplifiers: determine output stage heat dissipation requirements',
            'Capacitor selection: evaluate ESR power loss in filtering and power applications'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>LED current limiting:</strong> V = 12V, R = 6Ω → P = 144/6 = 24W (requires ≥25W resistor)</li>
          <li><strong>Circuit current:</strong> V = 5V, I = 0.5A → P = 5 × 0.5 = 2.5W</li>
          <li><strong>Joule heating:</strong> I = 2A, R = 10Ω → P = 4 × 10 = 40W (significant heat generation)</li>
          <li><strong>Small signal:</strong> V = 3.3V, R = 1kΩ → P = 10.89/1000 = 0.011W (1/8W resistor sufficient)</li>
          <li><strong>Capacitor ESR:</strong> 100μF, 60Hz, 120V, ESR = 0.1Ω → Xc = 26.5Ω, I = 4.53A, P = 2.05W</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is power dissipation and why does it matter?',
              answer: 'Power dissipation is the conversion of electrical energy to heat in components due to resistance. It matters because excessive heat causes component failure, reduced lifespan, circuit malfunction, and potential fire hazards. Always select components with power ratings 2× higher than calculated dissipation for safety margin.'
            },
            {
              question: 'How do I choose the right resistor power rating?',
              answer: 'Calculate dissipated power using P = I²R or P = V²/R, then select a resistor rated for at least 2× that power. Common ratings: 1/8W, 1/4W, 1/2W, 1W, 2W. For 0.3W dissipation, use minimum 1/2W resistor (preferably 1W for reliability). Derate power at high ambient temperatures.'
            },
            {
              question: 'What is the difference between P = V²/R and P = I²R?',
              answer: 'Both formulas calculate the same power dissipation, just using different known quantities. Use P = V²/R when you know voltage across the resistor. Use P = I²R when you know current through it. They give identical results since V = IR (Ohm\'s law).'
            },
            {
              question: 'What is ESR and why does it cause power loss in capacitors?',
              answer: 'ESR (Equivalent Series Resistance) is the internal resistance of a capacitor. AC current flowing through ESR causes I²R heating, wasting power as heat. High-frequency applications (switching power supplies, inverters) require low-ESR capacitors to minimize power loss and heat generation. ESR typically ranges from 0.01Ω to 1Ω.'
            },
            {
              question: 'How much heat does dissipated power generate?',
              answer: '1 watt = 3.412 BTU/hr of heat. For every watt dissipated, temperature rises until heat dissipation (convection, conduction, radiation) equals power input. Without cooling, 5W in a small resistor can cause 100+°C temperature rise. Use heat sinks, forced air, or derating for high-power applications.'
            },
            {
              question: 'Can I use this calculator for AC circuits?',
              answer: 'Yes, but use RMS (root mean square) values for voltage and current in AC circuits. For pure resistors, P = V_rms × I_rms works. For reactive components (capacitors, inductors), only resistive parts dissipate power. Pure reactance stores and releases energy without dissipation.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
