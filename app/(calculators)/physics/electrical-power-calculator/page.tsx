import ElectricalPowerCalculator from '../../../_components/calculators/ElectricalPowerCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ElectricalPowerCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Electrical Power Calculator: Calculate Power, Voltage, Current & Resistance"
      description="Free online electrical power calculator to calculate power (watts), voltage (volts), current (amperes), and resistance (ohms). Use electrical power formulas P = V × I, P = V²/R, and P = I²R with step-by-step solutions."
      calculator={<ElectricalPowerCalculator />}
      slug="physics/electrical-power-calculator"
      category="Electromagnetism"
      features={[
        "Calculate electrical power, voltage, current, or resistance",
        "Multiple electrical power formulas (P = VI, P = V²/R, P = I²R)",
        "Step-by-step calculations",
        "Instant results",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Electrical Power: Essential for Electrical Engineering">
        <p>
          Electrical power is a fundamental concept in physics and electrical engineering, representing the rate at which electrical energy is transferred, converted, or consumed in a circuit. Measured in watts (W), electrical power is crucial for designing circuits, sizing components, and understanding energy consumption. Our Electrical Power Calculator makes it easy to calculate power, voltage, current, or resistance using the fundamental electrical power formulas: <strong>P = V × I</strong>, <strong>P = V²/R</strong>, and <strong>P = I²R</strong>.
        </p>
        <p>
          Whether you&apos;re working on electrical circuit design, troubleshooting electrical systems, calculating energy consumption, or solving physics problems, understanding how to calculate electrical power is essential. Our calculator automatically selects the appropriate formula based on the values you provide, making complex electrical power calculations simple and accurate.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Electrical Power Calculator">
        <p>
          Our Electrical Power Calculator is designed for simplicity and accuracy. Follow these steps to calculate electrical power or related values:
        </p>
        <SEOList items={[
          'Enter any two of the four values: voltage (V), current (I), resistance (R), or electrical power (P)',
          'Leave the value you want to calculate empty',
          'Click Calculate to get instant results with step-by-step solutions',
          'The calculator automatically selects the correct electrical power formula based on your inputs',
          'All calculations use standard SI units (volts, amperes, ohms, watts)'
        ]} />
        <p>
          The calculator supports multiple electrical power formulas, so you can solve for any missing value regardless of which two values you know. This makes it perfect for circuit analysis, component sizing, and electrical design work.
        </p>
      </SEOSection>

      <SEOSection title="Electrical Power Formulas">
        <p>
          Electrical power can be calculated using three main formulas, each useful in different scenarios:
        </p>
        
        <div className="space-y-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Formula 1: Electrical Power from Voltage and Current</h3>
            <p className="font-mono text-lg font-bold text-center">P = V × I</p>
            <p className="text-sm text-gray-600 mt-2 text-center">Where: P = Electrical Power (W), V = Voltage (V), I = Current (A)</p>
            <p className="text-sm text-gray-700 mt-2">
              This is the most fundamental electrical power formula. It directly relates electrical power to voltage and current, making it perfect when you know both electrical potential difference and current flow. This formula works for both DC circuits and AC circuits with resistive loads.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Formula 2: Electrical Power from Voltage and Resistance</h3>
            <p className="font-mono text-lg font-bold text-center">P = V²/R</p>
            <p className="text-sm text-gray-600 mt-2 text-center">Where: P = Electrical Power (W), V = Voltage (V), R = Resistance (Ω)</p>
            <p className="text-sm text-gray-700 mt-2">
              This electrical power formula is useful when you know the voltage across a component and its resistance, but not the current. It&apos;s derived from combining P = VI with Ohm&apos;s Law (V = IR). This formula shows that electrical power is proportional to the square of voltage.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Formula 3: Electrical Power from Current and Resistance</h3>
            <p className="font-mono text-lg font-bold text-center">P = I²R</p>
            <p className="text-sm text-gray-600 mt-2 text-center">Where: P = Electrical Power (W), I = Current (A), R = Resistance (Ω)</p>
            <p className="text-sm text-gray-700 mt-2">
              This electrical power formula is ideal when you know the current flowing through a component and its resistance. It shows that electrical power is proportional to the square of current, which is why high-current circuits generate more heat and require proper wire sizing.
            </p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Rearranging Electrical Power Formulas">
        <p>
          You can rearrange these electrical power formulas to solve for any variable:
        </p>
        <ul className="space-y-2 mt-3">
          <li><strong>Voltage:</strong> V = P/I or V = √(P × R)</li>
          <li><strong>Current:</strong> I = P/V or I = √(P/R)</li>
          <li><strong>Resistance:</strong> R = V²/P or R = P/I²</li>
          <li><strong>Electrical Power:</strong> P = V × I or P = V²/R or P = I²R</li>
        </ul>
        <p className="mt-3">
          Our electrical power calculator automatically applies the correct rearrangement based on which values you provide. This makes it easy to solve for any missing parameter in electrical circuit calculations.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications of Electrical Power Calculations">
        <p>
          Electrical power calculations are essential in countless applications:
        </p>
        <SEOList items={[
          "Circuit Design: Calculating power requirements and component sizing for electronic circuits",
          "Energy Consumption: Determining electrical power consumption for appliances and devices",
          "Power Supply Sizing: Selecting appropriate power supplies and transformers",
          "Wire Sizing: Calculating electrical power to determine appropriate wire gauge",
          "Resistor Selection: Choosing resistors that can handle calculated electrical power (power rating)",
          "Heat Dissipation: Understanding how electrical power relates to heat generation",
          "Battery Capacity: Calculating electrical power requirements for battery sizing",
          "Motor Selection: Determining electrical power requirements for motors",
          "Electrical Safety: Understanding power limits for safe operation",
          "Energy Efficiency: Calculating electrical power to optimize energy consumption",
          "AC/DC Circuits: Calculating electrical power in both alternating and direct current circuits",
          "Electrical Engineering: Essential calculations for electrical system design and analysis"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Electrical Power Units">
        <p>
          Electrical power is measured in watts (W), with common multiples and conversions:
        </p>
        <ul>
          <li><strong>Watt (W):</strong> Base SI unit for electrical power (1 W = 1 J/s = 1 V × 1 A)</li>
          <li><strong>Kilowatt (kW):</strong> 1 kW = 1,000 W - commonly used for larger appliances and systems</li>
          <li><strong>Megawatt (MW):</strong> 1 MW = 1,000,000 W - used for power plants and large industrial systems</li>
          <li><strong>Horsepower (hp):</strong> 1 hp ≈ 746 W - commonly used for motors and engines</li>
          <li><strong>Milliwatt (mW):</strong> 1 mW = 0.001 W - used for low-power electronics</li>
        </ul>
        <p>
          <strong>Energy vs. Power:</strong> Electrical power (watts) is the rate of energy transfer, while electrical energy (watt-hours, kWh) is the total energy consumed over time. Electrical power × time = electrical energy.
        </p>
      </SEOSection>

      <SEOSection title="Common Electrical Power Calculations">
        <h3>Example 1: Calculating Electrical Power from Voltage and Current</h3>
        <p>A device operates at 120V and draws 2A of current. What is its electrical power consumption?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P = V × I</p>
          <p className="font-mono">P = 120 V × 2 A = 240 W</p>
          <p className="text-sm text-gray-600 mt-1">The device consumes 240 watts of electrical power</p>
        </div>

        <h3>Example 2: Calculating Current from Electrical Power and Voltage</h3>
        <p>A 1000W appliance operates at 120V. What current does it draw?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">I = P / V</p>
          <p className="font-mono">I = 1000 W ÷ 120 V = 8.33 A</p>
          <p className="text-sm text-gray-600 mt-1">The appliance draws 8.33 amperes of current</p>
        </div>

        <h3>Example 3: Calculating Resistance from Electrical Power and Current</h3>
        <p>A resistor dissipates 50W of electrical power when 5A flows through it. What is its resistance?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">R = P / I²</p>
          <p className="font-mono">R = 50 W ÷ (5 A)² = 50 ÷ 25 = 2 Ω</p>
          <p className="text-sm text-gray-600 mt-1">The resistor has a resistance of 2 ohms</p>
        </div>

        <h3>Example 4: Calculating Voltage from Electrical Power and Resistance</h3>
        <p>A 100W light bulb has a resistance of 144Ω. What voltage is required?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V = √(P × R)</p>
          <p className="font-mono">V = √(100 W × 144 Ω) = √14400 = 120 V</p>
          <p className="text-sm text-gray-600 mt-1">The light bulb requires 120 volts</p>
        </div>
      </SEOSection>

      <SEOSection title="Electrical Power in AC vs. DC Circuits">
        <p>
          Our electrical power calculator works for both AC and DC circuits:
        </p>
        <ul>
          <li><strong>DC Circuits:</strong> The formulas P = VI, P = V²/R, and P = I²R apply directly to DC circuits</li>
          <li><strong>AC Circuits (Resistive Loads):</strong> The same formulas apply when using RMS (root mean square) values for voltage and current</li>
          <li><strong>AC Circuits (Reactive Loads):</strong> For circuits with capacitors or inductors, apparent power (VA) differs from real power (W) due to power factor</li>
        </ul>
        <p>
          For most practical applications with resistive loads (lights, heaters, motors), our electrical power calculator provides accurate results for both AC and DC circuits.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is electrical power and how is it calculated?",
            answer: "Electrical power is the rate at which electrical energy is transferred or consumed, measured in watts (W). It's calculated using P = V × I (voltage times current), P = V²/R (voltage squared divided by resistance), or P = I²R (current squared times resistance). Our electrical power calculator can solve for any variable using these formulas."
          },
          {
            question: "What's the difference between electrical power and electrical energy?",
            answer: "Electrical power (watts) is the rate of energy transfer, while electrical energy (watt-hours, kWh) is the total energy consumed over time. Power × time = energy. For example, a 100W device running for 10 hours consumes 1000 watt-hours (1 kWh) of electrical energy."
          },
          {
            question: "How do I calculate electrical power from voltage and current?",
            answer: "Simply multiply voltage by current: P = V × I. For example, if a device operates at 120V and draws 2A, its electrical power is 120 × 2 = 240W. This is the most common electrical power calculation method."
          },
          {
            question: "Can I use this calculator for AC circuits?",
            answer: "Yes! Our electrical power calculator works for both AC and DC circuits when using resistive loads. For AC circuits, use RMS (root mean square) values for voltage and current. For circuits with reactive components (capacitors, inductors), additional power factor considerations may be needed."
          },
          {
            question: "How do I calculate current from electrical power and voltage?",
            answer: "Divide electrical power by voltage: I = P / V. For example, a 1000W device at 120V draws 1000 ÷ 120 = 8.33A. This calculation is essential for sizing circuit breakers and wire gauges."
          },
          {
            question: "What is the relationship between electrical power and heat?",
            answer: "Electrical power dissipated in a resistor is converted to heat. The formula P = I²R shows that power (and thus heat generation) is proportional to the square of current. This is why high-current circuits require larger wire gauges and better heat dissipation."
          },
          {
            question: "How do I calculate resistance from electrical power?",
            answer: "You can calculate resistance using R = V²/P (if you know voltage and power) or R = P/I² (if you know current and power). For example, if a resistor dissipates 50W at 10V, its resistance is (10)²/50 = 100/50 = 2Ω."
          },
          {
            question: "What units are used for electrical power calculations?",
            answer: "Standard SI units: volts (V) for voltage, amperes (A) for current, ohms (Ω) for resistance, and watts (W) for electrical power. Common multiples include kilowatts (kW) for larger values and milliwatts (mW) for smaller values."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding electrical power and how to calculate it is fundamental to electrical engineering, circuit design, and energy management. Our Electrical Power Calculator simplifies these calculations, making it easy to determine power, voltage, current, or resistance for any electrical circuit.
        </p>
        <p>
          Whether you&apos;re designing circuits, sizing components, calculating energy consumption, or solving physics problems, this calculator provides accurate results with step-by-step solutions. Ready to explore more electrical concepts? Check out our other calculators like the {createInternalLink('watt-calculator', 'Watt Calculator')} for additional power calculations, or use our {createInternalLink('wire-size-calculator', 'Wire Size Calculator')} to determine appropriate wire gauges based on current and electrical power requirements.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

