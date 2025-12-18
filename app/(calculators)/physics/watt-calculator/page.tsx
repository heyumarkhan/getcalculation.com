import WattCalculator from '../../../_components/calculators/WattCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WattCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Watt Calculator: Calculate Electrical Power, Voltage, Current & Resistance"
      description="Free online watt calculator to calculate electrical power (watts), voltage (volts), current (amperes), and resistance (ohms). Use formulas P = V × I, P = V²/R, and P = I²R with step-by-step solutions."
      calculator={<WattCalculator />}
      slug="physics/watt-calculator"
      category="Electromagnetism"
      features={[
        "Calculate power, voltage, current, or resistance",
        "Multiple formula support (P = VI, P = V²/R, P = I²R)",
        "Step-by-step calculations",
        "Instant results",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Electrical Power: The Watt Calculator">
        <p>
          Electrical power is one of the most fundamental concepts in physics and electrical engineering. Measured in watts (W), power represents the rate at which electrical energy is transferred or consumed. Our Watt Calculator makes it easy to calculate power, voltage, current, or resistance using the fundamental electrical formulas: <strong>P = V × I</strong>, <strong>P = V²/R</strong>, and <strong>P = I²R</strong>.
        </p>
        <p>
          Whether you&apos;re working on electrical circuits, designing electronic devices, or solving physics problems, understanding how to calculate power is essential. Our calculator automatically selects the appropriate formula based on the values you provide, making complex electrical calculations simple and accurate.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Watt Calculator">
        <p>
          Our Watt Calculator is designed for simplicity and accuracy. Follow these steps to calculate electrical power or related values:
        </p>
        <SEOList items={[
          'Enter any two of the four values: voltage (V), current (I), resistance (R), or power (P)',
          'Leave the value you want to calculate empty',
          'Click Calculate to get instant results with step-by-step solutions',
          'The calculator automatically selects the correct formula based on your inputs',
          'All calculations use standard SI units (volts, amperes, ohms, watts)'
        ]} />
        <p>
          The calculator supports multiple power formulas, so you can solve for any missing value regardless of which two values you know.
        </p>
      </SEOSection>

      <SEOSection title="Electrical Power Formulas">
        <p>
          Electrical power can be calculated using three main formulas, each useful in different scenarios:
        </p>
        
        <div className="space-y-4 mt-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Formula 1: Power from Voltage and Current</h3>
            <p className="font-mono text-lg font-bold text-center">P = V × I</p>
            <p className="text-sm text-gray-600 mt-2 text-center">Where: P = Power (W), V = Voltage (V), I = Current (A)</p>
            <p className="text-sm text-gray-700 mt-2">
              This is the most commonly used formula. It directly relates power to voltage and current, making it perfect when you know both electrical potential and current flow.
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Formula 2: Power from Voltage and Resistance</h3>
            <p className="font-mono text-lg font-bold text-center">P = V²/R</p>
            <p className="text-sm text-gray-600 mt-2 text-center">Where: P = Power (W), V = Voltage (V), R = Resistance (Ω)</p>
            <p className="text-sm text-gray-700 mt-2">
              This formula is useful when you know the voltage across a component and its resistance, but not the current. It&apos;s derived from combining P = VI with Ohm&apos;s Law (V = IR).
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Formula 3: Power from Current and Resistance</h3>
            <p className="font-mono text-lg font-bold text-center">P = I²R</p>
            <p className="text-sm text-gray-600 mt-2 text-center">Where: P = Power (W), I = Current (A), R = Resistance (Ω)</p>
            <p className="text-sm text-gray-700 mt-2">
              This formula is ideal when you know the current flowing through a component and its resistance. It shows that power is proportional to the square of current, which is why high-current circuits generate more heat.
            </p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Rearranging Power Formulas">
        <p>
          You can rearrange these formulas to solve for any variable:
        </p>
        <ul className="space-y-2 mt-3">
          <li><strong>Voltage:</strong> V = P/I or V = √(P × R)</li>
          <li><strong>Current:</strong> I = P/V or I = √(P/R)</li>
          <li><strong>Resistance:</strong> R = V²/P or R = P/I²</li>
          <li><strong>Power:</strong> P = V × I or P = V²/R or P = I²R</li>
        </ul>
        <p className="mt-3">
          Our calculator automatically applies the correct rearrangement based on which values you provide.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Electrical power calculations are essential in countless applications:
        </p>
        <SEOList items={[
          "Home Electronics: Calculating power consumption of appliances and devices",
          "Electrical Engineering: Designing circuits and determining component ratings",
          "Renewable Energy: Calculating solar panel output and battery capacity",
          "Automotive: Determining electrical system requirements for vehicles",
          "Industrial Applications: Sizing electrical equipment and wiring",
          "Physics Education: Understanding energy transfer and electrical principles",
          "Energy Efficiency: Calculating power usage and optimizing consumption"
        ]} />
      </SEOSection>

      <SEOSection title="Common Watt Calculator Examples">
        <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Example 1: Calculate Power from Voltage and Current</h3>
        <p>A device operates at 120 volts with a current of 2.5 amperes. What is its power consumption?</p>
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <p className="font-mono">P = V × I = 120 V × 2.5 A = 300 W</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Example 2: Calculate Power from Voltage and Resistance</h3>
        <p>A resistor with 50 ohms resistance has 10 volts across it. What power is dissipated?</p>
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <p className="font-mono">P = V²/R = (10 V)² ÷ 50 Ω = 100 ÷ 50 = 2 W</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Example 3: Calculate Power from Current and Resistance</h3>
        <p>A circuit element with 8 ohms resistance carries 3 amperes of current. What is the power?</p>
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <p className="font-mono">P = I²R = (3 A)² × 8 Ω = 9 × 8 = 72 W</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Example 4: Calculate Voltage from Power and Current</h3>
        <p>A 60-watt light bulb draws 0.5 amperes. What voltage does it require?</p>
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <p className="font-mono">V = P/I = 60 W ÷ 0.5 A = 120 V</p>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Example 5: Calculate Current from Power and Voltage</h3>
        <p>A 1500-watt heater operates at 120 volts. What current does it draw?</p>
        <div className="bg-gray-50 p-4 rounded-lg mt-2">
          <p className="font-mono">I = P/V = 1500 W ÷ 120 V = 12.5 A</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Electrical Units">
        <p>
          It&apos;s crucial to understand the standard electrical units used in power calculations:
        </p>
        <ul className="space-y-2 mt-3">
          <li><strong>Voltage (V):</strong> Measured in volts (V). Represents electrical potential difference or &quot;pressure&quot; that drives current.</li>
          <li><strong>Current (I):</strong> Measured in amperes (A). Represents the flow of electric charge through a conductor.</li>
          <li><strong>Resistance (R):</strong> Measured in ohms (Ω). Represents opposition to current flow in a circuit.</li>
          <li><strong>Power (P):</strong> Measured in watts (W). Represents the rate of energy transfer or consumption.</li>
        </ul>
        <p className="mt-3">
          <strong>Important:</strong> Always use consistent units throughout your calculations. Our calculator uses standard SI units, so all results are in volts, amperes, ohms, and watts.
        </p>
      </SEOSection>

      <SEOSection title="Ohm&apos;s Law and Power">
        <p>
          The power formulas are closely related to Ohm&apos;s Law, which states that <strong>V = I × R</strong>. By combining Ohm&apos;s Law with the basic power formula (P = V × I), we derive the alternative power formulas:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <p className="font-mono text-sm">
            From V = I × R and P = V × I:<br />
            P = V × I = (I × R) × I = I²R<br />
            P = V × I = V × (V/R) = V²/R
          </p>
        </div>
        <p className="mt-3">
          This relationship shows why all three power formulas are equivalent and can be used interchangeably depending on which values you know.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between watts, volts, and amperes?",
            answer: "Watts (W) measure power (energy per unit time), volts (V) measure voltage (electrical potential), and amperes (A) measure current (charge flow rate). Power is the product of voltage and current: P = V × I."
          },
          {
            question: "Can I calculate power if I only know voltage and resistance?",
            answer: "Yes! Use the formula P = V²/R. Our calculator automatically applies this formula when you enter voltage and resistance values."
          },
          {
            question: "How do I calculate current from power and voltage?",
            answer: "Use the formula I = P/V. Simply divide power (in watts) by voltage (in volts) to get current in amperes. Our calculator does this automatically."
          },
          {
            question: "What is the relationship between power and resistance?",
            answer: "Power is related to resistance through two formulas: P = V²/R (when you know voltage) and P = I²R (when you know current). Higher resistance with the same voltage results in lower power, while higher resistance with the same current results in higher power."
          },
          {
            question: "Why does power equal I²R?",
            answer: "This formula shows that power is proportional to the square of current. It comes from combining P = V × I with Ohm&apos;s Law (V = I × R), giving P = (I × R) × I = I²R. This is why high-current circuits generate significant heat."
          },
          {
            question: "Can the calculator handle AC (alternating current) calculations?",
            answer: "Our calculator uses the standard DC (direct current) power formulas. For AC circuits, you would need to consider RMS (root mean square) values for voltage and current, but the basic formulas remain the same: P = V_rms × I_rms."
          },
          {
            question: "What happens if I enter values that don&apos;t satisfy the power formulas?",
            answer: "The calculator will detect inconsistencies and display an error message. For example, if you enter voltage, current, and power values that don&apos;t satisfy P = V × I, it will alert you to check your inputs."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          You might also find these calculators useful for electrical and physics calculations:
        </p>
        <SEOList items={[
          `Use our ${createInternalLink('velocity-calculator', 'Velocity Calculator')} for motion and kinematics calculations`,
          `Check out other physics calculators for related electrical and mechanical problems`,
          `Explore math calculators like ${createInternalLink('area')} for geometric calculations that complement physics work`
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding electrical power is fundamental to physics, electrical engineering, and everyday electronics. Our Watt Calculator simplifies these essential calculations, allowing you to quickly determine power, voltage, current, or resistance using any combination of known values.
        </p>
        <p>
          Whether you&apos;re a student learning electrical principles, an engineer designing circuits, or a homeowner calculating energy consumption, this tool provides accurate, step-by-step solutions for all your electrical power calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
