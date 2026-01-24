import OhmsLawPowerCalculator from '../../../_components/calculators/OhmsLawPowerCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function OhmsLawPowerCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Ohm's Law Power Calculator - Electrical Power Calculations"
      description="Calculate electrical power, voltage, current, and resistance using Ohm's Law formulas."
      calculator={<OhmsLawPowerCalculator />}
      slug="physics/ohms-law-power-calculator"
      category="Electromagnetism"
      features={[
        'Calculates power, voltage, current, or resistance',
        'Multiple calculation modes for flexibility',
        'Bidirectional conversion support',
        'Real-time results display',
        'Ohm Law and power formulas',
        'Instant electrical calculations',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Ohm's Law Power Calculator?">
        <p>
          Ohm's Law Power Calculator computes electrical power, voltage, current, and resistance using fundamental electricity formulas. It combines Ohm's Law (V = I * R) with power equations (P = V * I) to solve any unknown electrical parameter when others are known.
        </p>
        <p className="mt-4">
          This calculator is essential for circuit design, electrical troubleshooting, power consumption analysis, and understanding relationships between voltage, current, resistance, and power in DC and AC circuits.
        </p>
      </SEOSection>

      <SEOSection title="Ohm's Law and Power Formulas">
        <SEOFormula
          formula="P = V * I"
          description="Power (watts) equals voltage multiplied by current (amps)."
        />
        <SEOFormula
          formula="V = I * R"
          description="Voltage equals current multiplied by resistance (Ohms)."
        />
        <SEOFormula
          formula="I = V / R"
          description="Current equals voltage divided by resistance."
        />
        <SEOFormula
          formula="R = V / I"
          description="Resistance equals voltage divided by current."
        />
        <SEOFormula
          formula="P = I^2 * R"
          description="Power equals current squared multiplied by resistance."
        />
        <SEOFormula
          formula="P = V^2 / R"
          description="Power equals voltage squared divided by resistance."
        />
      </SEOSection>

      <SEOSection title="Key Electrical Relationships">
        <p className="mb-4">
          Ohm's Law and power equations describe fundamental electrical relationships:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Voltage and Current:</strong> Voltage drives current through resistance; higher voltage increases current.</li>
          <li><strong>Current and Resistance:</strong> Resistance opposes current flow; higher resistance reduces current at fixed voltage.</li>
          <li><strong>Power Consumption:</strong> Power increases with voltage squared and current squared, proportionally with resistance.</li>
          <li><strong>Energy Efficiency:</strong> Lower current at same power means less heat loss in transmission lines.</li>
          <li><strong>Thermal Effects:</strong> Resistive elements dissipate power as heat proportional to I^2 * R.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p className="mb-4">
          Ohm's Law Power calculations apply to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Circuit Design:</strong> Selecting resistors, capacitors, and power supplies for electronics.</li>
          <li><strong>Home Electrical:</strong> Understanding circuit breaker ratings and wire gauge requirements.</li>
          <li><strong>Motor Selection:</strong> Matching motor power ratings to load requirements and supply voltage.</li>
          <li><strong>Power Distribution:</strong> Calculating transmission line losses and voltage drops.</li>
          <li><strong>Solar Systems:</strong> Matching panel voltage/current output to inverter specifications.</li>
          <li><strong>Battery Systems:</strong> Determining discharge rates and charging requirements.</li>
          <li><strong>Troubleshooting:</strong> Identifying faulty components by measuring voltage, current, and resistance.</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use the Ohm's Law Power Calculator">
        <SEOList ordered items={[
          '<strong>Select calculation mode:</strong> Choose whether to calculate power, voltage, current, or resistance.',
          '<strong>Enter known values:</strong> Input the two or three parameters required for calculation.',
          '<strong>Click Calculate:</strong> The calculator solves for unknown values using Ohm Law formulas.',
          '<strong>Review results:</strong> Inspect power, voltage, current, and resistance values.',
          '<strong>Verify with formulas:</strong> Check displayed formulas to understand relationships.'
        ]} />
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> A light bulb rated 60W operates at 120V household voltage. What current flows and what is the filament resistance?</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Given: P = 60W, V = 120V</li>
          <li>Find I: I = P / V = 60 / 120 = 0.5 amps</li>
          <li>Find R: R = V / I = 120 / 0.5 = 240 Ohms</li>
          <li>Verify: P = V * I = 120 * 0.5 = 60W</li>
          <li>The filament has 240 Ohms resistance and draws 0.5 amps at 120V producing 60 watts of heat and light.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Common Electrical Scenarios">
        <p className="mb-4">
          Use Ohm Law Power calculations for typical electrical problems:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Resistor Sizing:</strong> Calculate required resistance to limit current or drop voltage.</li>
          <li><strong>Wire Selection:</strong> Determine wire gauge from current rating and voltage drop limits.</li>
          <li><strong>Power Supply Rating:</strong> Match supply voltage and current capacity to device requirements.</li>
          <li><strong>Fuse Selection:</strong> Choose fuse rating based on circuit maximum current.</li>
          <li><strong>Heat Dissipation:</strong> Calculate power dissipation in resistors for thermal design.</li>
          <li><strong>Battery Runtime:</strong> Estimate battery life from capacity (Ah) and current draw (A).</li>
          <li><strong>Extension Cord Length:</strong> Determine acceptable cord length for voltage drop limits.</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is Ohm Law exactly?',
            answer: 'Ohm Law states that voltage equals current multiplied by resistance: V = I * R. It describes the linear relationship between these three fundamental electrical quantities.'
          },
          {
            question: 'Why is power important in electrical circuits?',
            answer: 'Power determines how much energy is consumed or delivered per unit time. Higher power means more energy (heat, light, motion) per second, affecting efficiency, heat dissipation, and supply requirements.'
          },
          {
            question: 'When should I use P = V*I vs P = I^2*R?',
            answer: 'Use P = V * I when you know voltage and current. Use P = I^2 * R when you know current and resistance. Both give the same power value; choose based on available parameters.'
          },
          {
            question: 'What happens if resistance is zero?',
            answer: 'Zero resistance means no voltage drop across that element (short circuit). Current becomes theoretically infinite if voltage is applied, which is why short circuits are dangerous and require protection.'
          },
          {
            question: 'How does wire gauge relate to Ohm Law?',
            answer: 'Wire gauge determines resistance per length. Thicker wires (lower gauge numbers) have lower resistance, allowing higher current with less voltage drop and heat generation.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
