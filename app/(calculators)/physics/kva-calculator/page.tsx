import KVACalculator from '../../../_components/calculators/KVACalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function KVACalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="kVA Calculator: Calculate Apparent Power for AC Electrical Systems"
      description="Calculate kVA (kilovolt-amperes) from voltage and current for 1-phase and 3-phase systems. Free electrical power calculator for apparent power, real power, and power factor."
      calculator={<KVACalculator />}
      slug="physics/kva-calculator"
      category="Electronics"
      features={[
        "Calculate kVA from voltage and current for 1-phase and 3-phase systems",
        "Find kVA from real power and power factor",
        "Calculate real power from kVA and power factor",
        "Determine power factor from kVA and kW",
        "Support for industrial and commercial AC systems",
        "Instant calculations with step-by-step formulas"
      ]}
    >
      <SEOSection title="Understanding kVA and Apparent Power in Electrical Systems">
        <p>
          The <strong>kVA Calculator</strong> is an essential tool for anyone working with AC electrical power systems. kVA (kilovolt-amperes) represents <strong>apparent power</strong>, the total power in an AC circuit including both real power (kW) and reactive power (kVAR). Understanding the relationship between kVA, kW, and power factor is crucial for electrical design, equipment selection, and energy management.
        </p>
        <p>
          This kVA calculator allows you to calculate apparent power from voltage and current, convert between kVA and kW using power factor, and determine power factor from electrical measurements. Whether you&apos;re sizing transformers, generators, or selecting electrical equipment, accurate kVA calculations are essential for proper system design and safety.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the kVA Calculator">
        <p>
          The kVA calculator offers four calculation methods:
        </p>
        <ol>
          <li><strong>Find kVA from Voltage & Current:</strong> Enter voltage (V) and current (A) for 1-phase or 3-phase systems to calculate apparent power</li>
          <li><strong>Find kVA from kW & Power Factor:</strong> Enter real power (kW) and power factor to find apparent power (kVA)</li>
          <li><strong>Find kW from kVA & Power Factor:</strong> Enter apparent power (kVA) and power factor to find real power (kW)</li>
          <li><strong>Find Power Factor from kVA & kW:</strong> Enter kVA and kW to calculate the power factor</li>
        </ol>
        <p>
          Select your calculation method, enter the known values, and click Calculate. The kVA calculator instantly computes results with detailed step-by-step formulas for verification.
        </p>
      </SEOSection>

      <SEOSection title="kVA Formulas and Calculations">
        <p>
          The kVA calculator uses these fundamental electrical formulas:
        </p>
        
        <h3>1. Single-Phase kVA Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">kVA = (V × I) / 1000</p>
          <p className="text-sm text-gray-600 mt-2">Where: V = Voltage (volts), I = Current (amperes)</p>
        </div>

        <h3>2. Three-Phase kVA Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">kVA = (√3 × V × I) / 1000 ≈ (1.732 × V × I) / 1000</p>
          <p className="text-sm text-gray-600 mt-2">Where: √3 ≈ 1.732, V = Line voltage (volts), I = Line current (amperes)</p>
        </div>

        <h3>3. kVA from Real Power and Power Factor</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">kVA = kW / Power Factor</p>
          <p className="text-sm text-gray-600 mt-2">Where: kW = Real power, Power Factor = 0 to 1</p>
        </div>

        <h3>4. Real Power from Apparent Power and Power Factor</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">kW = kVA × Power Factor</p>
          <p className="text-sm text-gray-600 mt-2">Where: kVA = Apparent power, Power Factor = 0 to 1</p>
        </div>

        <h3>5. Power Factor from Apparent and Real Power</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Power Factor = kW / kVA</p>
          <p className="text-sm text-gray-600 mt-2">Where: kW = Real power, kVA = Apparent power</p>
        </div>
      </SEOSection>

      <SEOSection title="kVA, kW, and Power Factor Relationships">
        <p>
          Understanding the relationship between apparent power (kVA), real power (kW), and power factor is fundamental to electrical system design:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Symbol</th>
                <th className="border border-gray-300 px-4 py-2">Unit</th>
                <th className="border border-gray-300 px-4 py-2">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Apparent Power</td>
                <td className="border border-gray-300 px-4 py-2">S</td>
                <td className="border border-gray-300 px-4 py-2">kVA</td>
                <td className="border border-gray-300 px-4 py-2">Total power = √(kW² + kVAR²)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Real Power</td>
                <td className="border border-gray-300 px-4 py-2">P</td>
                <td className="border border-gray-300 px-4 py-2">kW</td>
                <td className="border border-gray-300 px-4 py-2">Power doing useful work</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Reactive Power</td>
                <td className="border border-gray-300 px-4 py-2">Q</td>
                <td className="border border-gray-300 px-4 py-2">kVAR</td>
                <td className="border border-gray-300 px-4 py-2">Power stored and returned to circuit</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Power Factor</td>
                <td className="border border-gray-300 px-4 py-2">PF</td>
                <td className="border border-gray-300 px-4 py-2">Dimensionless</td>
                <td className="border border-gray-300 px-4 py-2">PF = kW / kVA (0 to 1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Typical Power Factor Values by Load Type">
        <p>
          Power factor varies depending on the type of electrical load. This kVA calculator accounts for different load types:
        </p>
        <SEOList items={[
          "Residential loads (incandescent, resistive): 0.95-1.0",
          "Industrial motors (induction motors): 0.70-0.90",
          "Electronics and computers (capacitive): 0.50-0.75",
          "Metal halide lamps: 0.50-0.60",
          "Fluorescent lamps with ballast: 0.50-0.95",
          "Synchronous motors: 0.95-1.0",
          "Typical commercial average: 0.85-0.90",
          "Well-designed industrial facility: 0.90-0.95"
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications of kVA Calculator">
        <p>
          The kVA calculator is essential for numerous electrical engineering and industrial applications:
        </p>
        <SEOList items={[
          "Transformer Sizing: Selecting appropriate transformers for power distribution based on load requirements",
          "Generator Selection: Determining generator capacity for backup power and emergency systems",
          "Electrical Panel Design: Calculating breaker and conductor sizes for proper protection",
          "Motor Starting: Understanding inrush currents and sizing starter equipment",
          "Power Factor Correction: Designing capacitor banks to improve power factor and reduce costs",
          "Load Analysis: Analyzing electrical loads for HVAC, lighting, and machinery",
          "Energy Audits: Measuring actual power consumption for efficiency improvements",
          "Facility Planning: Estimating power requirements for new facilities or expansions"
        ]} />
      </SEOSection>

      <SEOSection title="kVA Calculator Examples">
        <h3>Example 1: 3-Phase Industrial Motor</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p>Calculate kVA for a 3-phase motor with line voltage 480V and current 100A.</p>
          <ul className="mt-2 space-y-1">
            <li>System: 3-phase</li>
            <li>Voltage (V) = 480V</li>
            <li>Current (I) = 100A</li>
            <li>Formula: kVA = (√3 × V × I) / 1000 = (1.732 × 480 × 100) / 1000</li>
            <li><strong>Result:</strong> kVA = 83.14 kVA</li>
          </ul>
        </div>

        <h3>Example 2: Calculate kVA from kW and Power Factor</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p>Find kVA for a facility with 50 kW real power and 0.85 power factor.</p>
          <ul className="mt-2 space-y-1">
            <li>Real Power (kW) = 50 kW</li>
            <li>Power Factor = 0.85</li>
            <li>Formula: kVA = kW / Power Factor = 50 / 0.85</li>
            <li><strong>Result:</strong> kVA = 58.82 kVA</li>
          </ul>
        </div>

        <h3>Example 3: Calculate Real Power from kVA</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>Find real power for a 100 kVA load with 0.9 power factor.</p>
          <ul className="mt-2 space-y-1">
            <li>Apparent Power (kVA) = 100 kVA</li>
            <li>Power Factor = 0.9</li>
            <li>Formula: kW = kVA × Power Factor = 100 × 0.9</li>
            <li><strong>Result:</strong> kW = 90 kW</li>
          </ul>
        </div>
      </SEOSection>

      <SEOSection title="Single-Phase vs Three-Phase Systems">
        <p>
          The kVA calculation differs between single-phase and three-phase systems:
        </p>
        <p>
          <strong>Single-Phase Systems:</strong> Common in residential and small commercial applications. Uses simple formula: kVA = (V × I) / 1000. Typical voltages: 120V, 240V, 208V.
        </p>
        <p>
          <strong>Three-Phase Systems:</strong> Used in industrial and large commercial applications for more efficient power distribution. Includes √3 (1.732) factor in formula: kVA = (√3 × V × I) / 1000. Typical voltages: 208V, 277V, 480V, 600V, 2300V, 4160V.
        </p>
        <p>
          This kVA calculator automatically applies the correct formula based on your selection. Three-phase systems deliver approximately 1.732 times more power than single-phase systems at the same voltage and current.
        </p>
      </SEOSection>

      <SEOFAQ questions={[
        {
          question: "What is kVA and how is it different from kW?",
          answer: "kVA (kilovolt-amperes) is apparent power—the total power in an AC circuit. kW (kilowatts) is real power—the power that does useful work. The difference is power factor. In AC circuits: kW = kVA × Power Factor. A circuit with low power factor has high kVA but lower kW, meaning inefficient power use. This kVA calculator helps convert between these quantities based on actual system characteristics."
        },
        {
          question: "Why do I need to know kVA when sizing transformers and generators?",
          answer: "Transformers and generators are rated in kVA because they handle total power (apparent power), not just useful power. A device rated for 100 kVA can supply 100 kVA regardless of power factor. But the real power output (kW) depends on the power factor of your load. This kVA calculator helps you correctly size equipment to handle your actual loads without oversizing or undersizing."
        },
        {
          question: "What is power factor and why is it important?",
          answer: "Power factor (PF) is the ratio of real power to apparent power: PF = kW/kVA. It ranges from 0 to 1, where 1.0 is ideal. Inductive loads (motors, inductors) reduce power factor, forcing utilities to supply more kVA than necessary. Low power factor increases costs and requires larger transformers and conductors. This kVA calculator helps identify power factor issues so you can correct them with capacitor banks."
        },
        {
          question: "How do I calculate kVA for a 3-phase motor?",
          answer: "Use the formula: kVA = (√3 × V × I) / 1000, where √3 ≈ 1.732, V is line voltage, and I is line current. For example, a 480V 3-phase motor drawing 100A uses (1.732 × 480 × 100) / 1000 = 83.14 kVA. This kVA calculator performs these calculations instantly. The 3-phase factor (√3) accounts for the three-phase voltage distribution."
        },
        {
          question: "What's the relationship between kVA, kW, and kVAR?",
          answer: "These quantities form a power triangle: kVA² = kW² + kVAR², where kVAR is reactive power. Real power (kW) does useful work, reactive power (kVAR) is stored and returned to the circuit, and apparent power (kVA) is the total. Power factor = kW/kVA. This kVA calculator helps you understand and optimize these relationships for your electrical system."
        },
        {
          question: "How can I improve power factor and reduce kVA demand?",
          answer: "Power factor can be improved by installing capacitor banks that compensate for inductive loads (motors, inductors). Typical target is 0.95 or higher. Improving from 0.75 to 0.95 significantly reduces kVA demand and utility costs. This kVA calculator helps you determine how much capacitance is needed. Consult an electrical engineer for proper power factor correction design."
        }
      ]} />

      <SEOSection title="Conclusion">
        <p>
          The <strong>kVA Calculator</strong> is an indispensable tool for electrical professionals, facility managers, and engineers working with AC power systems. By providing four calculation methods and instant results with detailed formulas, this kVA calculator simplifies apparent power calculations for equipment sizing, power factor analysis, and electrical system design.
        </p>
        <p>
          Understanding kVA, kW, and power factor relationships is fundamental to efficient electrical system design and operation. Whether you&apos;re sizing transformers, selecting generators, or designing power distribution systems, accurate kVA calculations are essential. Use this free online kVA calculator to optimize your electrical systems and reduce energy costs.
        </p>
        <p>
          For related calculations, explore our {createInternalLink('power-factor-calculator', 'Power Factor Calculator')} and {createInternalLink('electrical-power-calculator', 'Electrical Power Calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
