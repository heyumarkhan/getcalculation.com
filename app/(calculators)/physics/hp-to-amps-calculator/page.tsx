import HpToAmpsCalculator from '../../../_components/calculators/HpToAmpsCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function HpToAmpsCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="HP to Amps Calculator: Convert Horsepower to Amperes (I = hp × 746 / V)"
      description="Convert horsepower to amperes using I = (hp × 746) / (V × efficiency). Free online motor current calculator for sizing circuit breakers and wire gauges."
      calculator={<HpToAmpsCalculator />}
      slug="physics/hp-to-amps-calculator"
      category="Electromagnetism"
      features={[
        "Convert horsepower to amperes",
        "Calculate current from motor horsepower",
        "Support for motor efficiency",
        "Calculate horsepower from current and voltage",
        "Calculate voltage from horsepower and current",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding HP to Amps Conversion: Essential for Motor Sizing">
        <p>
          Converting horsepower (hp) to amperes (amps) is a critical calculation in electrical engineering, especially when sizing circuit breakers, wire gauges, and electrical protection devices for motors. Understanding this conversion helps ensure safe and efficient electrical installations. Our HP to Amps Calculator makes it easy to determine motor current draw using the formula: <strong>I = (hp × 746) / (V × efficiency)</strong>.
        </p>
        <p>
          Whether you&apos;re an electrician sizing circuit breakers, an engineer designing motor control systems, or a technician troubleshooting motor issues, this calculator simplifies horsepower-to-amperes conversions with support for motor efficiency and multiple units.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our HP to Amps Calculator">
        <p>
          Our HP to Amps Calculator is designed for simplicity and accuracy. Follow these steps:
        </p>
        <ol>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (horsepower, voltage, or current)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Enter Efficiency (Optional):</strong> Input motor efficiency as percentage (0-100) or decimal (0-1) for more accurate calculations</li>
          <li><strong>Select Units:</strong> Choose your preferred units for horsepower, voltage, and current</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with step-by-step solutions</li>
        </ol>
        <p>
          The calculator uses the formula: <strong>I = (hp × 746) / (V × efficiency)</strong>, where 746 watts equals 1 horsepower.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the HP to Amps Formula">
        <p>
          The relationship between horsepower, voltage, and current is derived from electrical power formulas:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">I = (hp × 746) / (V × efficiency)</p>
          <p className="text-sm text-gray-600 mt-2">Where: I = Current (Amps), hp = Horsepower, V = Voltage, efficiency = Motor efficiency</p>
        </div>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Horsepower (hp):</strong> A unit of power equal to 746 watts (approximately). Represents the mechanical power output of a motor</li>
          <li><strong>Voltage (V):</strong> The electrical potential difference across the motor terminals, measured in volts (V)</li>
          <li><strong>Current (I):</strong> The electrical current flowing through the motor, measured in amperes (A)</li>
          <li><strong>Efficiency (η):</strong> The ratio of mechanical power output to electrical power input, typically expressed as a percentage (70-95% for most motors)</li>
          <li><strong>Power (P):</strong> Electrical power input = V × I, measured in watts (W)</li>
        </ul>

        <h3>Derivation</h3>
        <p>
          The formula is derived from:
        </p>
        <ul>
          <li>1 hp = 746 watts (mechanical power)</li>
          <li>Electrical power input = V × I (watts)</li>
          <li>Efficiency = Mechanical output / Electrical input</li>
          <li>Therefore: hp × 746 = (V × I) × efficiency</li>
          <li>Solving for I: <strong>I = (hp × 746) / (V × efficiency)</strong></li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          HP to Amps calculations are essential in numerous electrical engineering applications:
        </p>
        <SEOList items={[
          "Circuit Breaker Sizing: Determining the correct circuit breaker rating to protect motor circuits",
          "Wire Gauge Selection: Choosing appropriate wire sizes based on motor current draw to prevent overheating",
          "Motor Control Design: Sizing contactors, relays, and motor starters for proper operation",
          "Electrical Panel Design: Calculating total current requirements for panels with multiple motors",
          "Energy Efficiency Analysis: Comparing motor efficiency and power consumption",
          "Troubleshooting: Diagnosing motor problems by comparing actual current draw to calculated values",
          "Generator Sizing: Determining generator capacity needed to start and run motors",
          "Voltage Drop Calculations: Ensuring adequate voltage at motor terminals under load",
          "Power Factor Correction: Sizing capacitors for power factor improvement",
          "Electrical Code Compliance: Meeting NEC and other electrical code requirements for motor circuits"
        ]} />
      </SEOSection>

      <SEOSection title="Motor Efficiency Considerations">
        <p>
          Motor efficiency is crucial for accurate current calculations:
        </p>
        <ul>
          <li><strong>Typical Efficiency Ranges:</strong>
            <ul className="ml-4 mt-1">
              <li>Small motors (&lt; 1 hp): 60-75%</li>
              <li>Medium motors (1-10 hp): 75-85%</li>
              <li>Large motors (&gt; 10 hp): 85-95%</li>
              <li>Premium efficiency motors: 90-96%</li>
            </ul>
          </li>
          <li><strong>Factors Affecting Efficiency:</strong>
            <ul className="ml-4 mt-1">
              <li>Motor type (induction, synchronous, DC)</li>
              <li>Motor size and design</li>
              <li>Load conditions (efficiency varies with load)</li>
              <li>Motor age and condition</li>
              <li>Operating temperature</li>
            </ul>
          </li>
          <li><strong>Why Efficiency Matters:</strong>
            <ul className="ml-4 mt-1">
              <li>Lower efficiency means higher current draw for the same horsepower</li>
              <li>Actual current = Calculated current / efficiency</li>
              <li>Using 100% efficiency gives minimum current (worst-case for sizing)</li>
              <li>Using actual efficiency gives more accurate current values</li>
            </ul>
          </li>
        </ul>
      </SEOSection>

      <SEOSection title="Common HP to Amps Calculations">
        <h3>Example 1: Basic Calculation</h3>
        <p>A 5 hp motor operates at 240 V. What is the current draw (assuming 100% efficiency)?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">I = (hp × 746) / V = (5 hp × 746 W/hp) / 240 V = 3,730 W / 240 V = 15.54 A</p>
        </div>

        <h3>Example 2: With Efficiency</h3>
        <p>A 10 hp motor operates at 480 V with 85% efficiency. What is the current draw?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">I = (hp × 746) / (V × efficiency) = (10 hp × 746 W/hp) / (480 V × 0.85)</p>
          <p className="font-mono">I = 7,460 W / 408 V = 18.28 A</p>
        </div>

        <h3>Example 3: Calculate Horsepower from Current</h3>
        <p>A motor draws 25 A at 240 V with 80% efficiency. What is the horsepower?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">hp = (I × V × efficiency) / 746 = (25 A × 240 V × 0.80) / 746 W/hp</p>
          <p className="font-mono">hp = 4,800 W / 746 W/hp = 6.43 hp</p>
        </div>

        <h3>Example 4: Three-Phase Motor</h3>
        <p>A 20 hp three-phase motor operates at 480 V with 90% efficiency. What is the current per phase?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">I = (hp × 746) / (V × efficiency × √3) = (20 hp × 746 W/hp) / (480 V × 0.90 × 1.732)</p>
          <p className="font-mono">I = 14,920 W / 748.2 V = 19.95 A per phase</p>
          <p className="text-sm text-gray-600 mt-1">Note: For three-phase, multiply voltage by √3 (1.732)</p>
        </div>

        <h3>Example 5: Circuit Breaker Sizing</h3>
        <p>A 7.5 hp motor at 208 V with 85% efficiency. What size circuit breaker is needed?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">I = (7.5 hp × 746 W/hp) / (208 V × 0.85) = 5,595 W / 176.8 V = 31.64 A</p>
          <p className="font-mono">Circuit breaker size = 31.64 A × 1.25 (NEC requirement) = 39.55 A</p>
          <p className="font-mono">Use next standard size: 40 A circuit breaker</p>
        </div>
      </SEOSection>

      <SEOSection title="Single-Phase vs. Three-Phase Motors">
        <p>
          The calculation differs slightly for three-phase motors:
        </p>
        <ul>
          <li><strong>Single-Phase Motors:</strong>
            <ul className="ml-4 mt-1">
              <li>Formula: I = (hp × 746) / (V × efficiency)</li>
              <li>Use line-to-neutral voltage</li>
              <li>Common voltages: 120V, 240V</li>
            </ul>
          </li>
          <li><strong>Three-Phase Motors:</strong>
            <ul className="ml-4 mt-1">
              <li>Formula: I = (hp × 746) / (V × efficiency × √3)</li>
              <li>Use line-to-line voltage</li>
              <li>Multiply by √3 (1.732) to account for three-phase power</li>
              <li>Common voltages: 208V, 240V, 480V, 600V</li>
              <li>Current is per phase</li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>Note:</strong> Our calculator provides single-phase calculations. For three-phase, divide the result by √3 or use the line-to-line voltage directly with the three-phase formula.
        </p>
      </SEOSection>

      <SEOSection title="NEC Code Requirements">
        <p>
          The National Electrical Code (NEC) provides requirements for motor circuit sizing:
        </p>
        <ul>
          <li><strong>Full-Load Current (FLC):</strong> The current a motor draws at rated horsepower and voltage</li>
          <li><strong>Circuit Breaker Sizing:</strong> Typically 125% of full-load current for standard motors</li>
          <li><strong>Wire Sizing:</strong> Must handle at least 125% of full-load current</li>
          <li><strong>Motor Starter Sizing:</strong> Based on full-load current and motor type</li>
          <li><strong>Locked Rotor Current:</strong> Starting current can be 5-7 times full-load current</li>
        </ul>
        <p>
          Always consult the NEC and local electrical codes for specific requirements in your area.
        </p>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Understanding power and electrical units is crucial for accurate calculations:
        </p>
        <ul>
          <li><strong>Horsepower Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Horsepower (hp): 1 hp = 746 watts (mechanical power)</li>
              <li>Kilowatt (kW): 1 kW = 1.341 hp</li>
              <li>Watt (W): 1 hp = 745.7 W (approximately 746 W)</li>
            </ul>
          </li>
          <li><strong>Voltage Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Volt (V): Base SI unit</li>
              <li>Kilovolt (kV): 1 kV = 1,000 V</li>
              <li>Millivolt (mV): 1 V = 1,000 mV</li>
            </ul>
          </li>
          <li><strong>Current Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Ampere (A): Base SI unit</li>
              <li>Milliampere (mA): 1 A = 1,000 mA</li>
              <li>Kiloampere (kA): 1 kA = 1,000 A</li>
            </ul>
          </li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How do I convert horsepower to amperes?",
            answer: "Use the formula I = (hp × 746) / (V × efficiency), where I is current in amperes, hp is horsepower, V is voltage, and efficiency is motor efficiency (as a decimal). For example, a 5 hp motor at 240 V with 85% efficiency draws: I = (5 × 746) / (240 × 0.85) = 3,730 / 204 = 18.28 A."
          },
          {
            question: "What is the relationship between horsepower and watts?",
            answer: "1 horsepower equals approximately 746 watts. This conversion factor is used because 1 hp was originally defined as the power needed to lift 550 pounds one foot in one second, which equals 746 watts. The exact value is 745.7 watts, but 746 is commonly used for calculations."
          },
          {
            question: "Why is motor efficiency important in HP to amps calculations?",
            answer: "Motor efficiency accounts for energy losses in the motor. A motor with 85% efficiency means only 85% of the electrical input power becomes mechanical output. Lower efficiency means higher current draw for the same horsepower. Using actual efficiency gives more accurate current values for proper circuit sizing."
          },
          {
            question: "How do I calculate amps for a three-phase motor?",
            answer: "For three-phase motors, use I = (hp × 746) / (V × efficiency × √3), where V is the line-to-line voltage and √3 ≈ 1.732. The current calculated is per phase. For example, a 10 hp motor at 480 V with 90% efficiency: I = (10 × 746) / (480 × 0.90 × 1.732) = 7,460 / 748.2 = 9.97 A per phase."
          },
          {
            question: "What size circuit breaker do I need for a motor?",
            answer: "According to NEC, circuit breakers for motors should be sized at 125% of the full-load current. First calculate the full-load current using I = (hp × 746) / (V × efficiency), then multiply by 1.25 and round up to the next standard breaker size. For example, if calculated current is 18 A, use 18 × 1.25 = 22.5 A, so use a 25 A breaker."
          },
          {
            question: "Can I use this calculator for DC motors?",
            answer: "Yes, the basic formula I = (hp × 746) / (V × efficiency) works for DC motors. However, DC motors may have different efficiency characteristics, and you should use the motor's rated efficiency. The calculator provides accurate results for any motor type when you input the correct efficiency value."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Converting horsepower to amperes is essential for proper electrical system design, motor circuit protection, and code compliance. Our HP to Amps Calculator simplifies these calculations, making it easy to determine motor current draw, size circuit breakers, and select appropriate wire gauges.
        </p>
        <p>
          Ready to explore more electrical concepts? Check out our other calculators like the {createInternalLink('watt-calculator', 'Watt Calculator')} for power calculations, or the {createInternalLink('watt-hour-calculator', 'Watt-hour Calculator')} for energy consumption calculations that complement motor analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

