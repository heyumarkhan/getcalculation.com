import EfficiencyCalculator from '../../../_components/calculators/EfficiencyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function EfficiencyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Efficiency Calculator: Calculate Efficiency, Output & Input for Any System"
      description="Calculate efficiency percentage, output, or input for any system or process. Free online efficiency calculator for engines, machines, energy systems, and more. Works with energy, power, and work calculations."
      calculator={<EfficiencyCalculator />}
      slug="physics/efficiency-calculator"
      category="Thermodynamics"
      features={[
        "Calculate efficiency from output and input",
        "Calculate output from input and efficiency",
        "Calculate input from output and efficiency",
        "Works with energy, power, and work values",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Efficiency: The Key to Performance Analysis">
        <p>
          Efficiency is one of the most important concepts in physics and engineering, representing how well a system converts input energy into useful output. Whether you&apos;re analyzing engine performance, evaluating energy systems, or optimizing processes, understanding efficiency is essential. Our Efficiency Calculator makes it easy to calculate efficiency percentage, output, or input for any system using the fundamental efficiency formula.
        </p>
        <p>
          Efficiency is always expressed as a percentage, with 100% representing perfect efficiency (all input converted to useful output) and lower percentages indicating energy losses. In real-world systems, perfect efficiency is impossible due to friction, heat loss, and other factors. Our calculator helps you determine efficiency, calculate expected output based on efficiency, or determine required input to achieve desired output.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Efficiency Calculator">
        <p>
          Our Efficiency Calculator offers three different calculation modes:
        </p>
        <ol>
          <li><strong>Calculate Efficiency:</strong> Enter useful output and total input values. The calculator determines efficiency as a percentage (0% to 100%).</li>
          <li><strong>Calculate Output:</strong> Enter total input and efficiency percentage. The calculator determines the useful output that will be produced.</li>
          <li><strong>Calculate Input:</strong> Enter useful output and efficiency percentage. The calculator determines the required input to achieve that output.</li>
        </ol>
        <p>
          Select your calculation mode, enter the known values (using consistent units), and click Calculate to get instant results with detailed step-by-step solutions. The calculator works with any units—energy, power, work, or other quantities—as long as output and input use the same units.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Efficiency Formula">
        <p>
          The efficiency formula is fundamental to physics and engineering:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">Efficiency = (Useful Output ÷ Total Input) × 100%</p>
          <p className="text-sm text-gray-600 mt-2">Where: Efficiency is expressed as a percentage (0% to 100%)</p>
        </div>
        
        <h3>Rearranging the Formula</h3>
        <p>You can rearrange this formula to solve for any variable:</p>
        <ul>
          <li><strong>Output:</strong> Output = (Input × Efficiency) ÷ 100%</li>
          <li><strong>Input:</strong> Input = (Output × 100%) ÷ Efficiency</li>
          <li><strong>Efficiency:</strong> Efficiency = (Output ÷ Input) × 100%</li>
        </ul>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Useful Output:</strong> The desired energy, power, or work produced by the system</li>
          <li><strong>Total Input:</strong> The total energy, power, or work supplied to the system</li>
          <li><strong>Energy Loss:</strong> Input - Output = Energy lost to friction, heat, sound, etc.</li>
          <li><strong>Perfect Efficiency:</strong> 100% efficiency means all input is converted to useful output (theoretically impossible in practice)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Types of Efficiency in Physics">
        <p>
          Different types of efficiency are used in various physics applications:
        </p>
        <SEOList items={[
          "Thermal Efficiency: Ratio of work output to heat input in heat engines (typically 20-40% for gasoline engines, 30-50% for diesel engines)",
          "Mechanical Efficiency: Ratio of useful mechanical work to input work (accounts for friction losses)",
          "Electrical Efficiency: Ratio of useful electrical output to electrical input (power supplies, motors, generators)",
          "Energy Efficiency: Overall efficiency of energy conversion systems (solar panels, batteries, fuel cells)",
          "Carnot Efficiency: Maximum theoretical efficiency for heat engines (depends on hot and cold reservoir temperatures)",
          "Volumetric Efficiency: Ratio of actual air/fuel intake to theoretical maximum in engines",
          "Overall Efficiency: Combined efficiency of multiple systems in series"
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Efficiency calculations are essential in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Automotive Engineering: Calculating engine efficiency, fuel economy, and power output",
          "Renewable Energy: Evaluating solar panel efficiency, wind turbine efficiency, and battery performance",
          "Industrial Processes: Analyzing manufacturing efficiency, machine performance, and production optimization",
          "HVAC Systems: Calculating heating and cooling system efficiency (SEER, EER ratings)",
          "Electrical Systems: Evaluating motor efficiency, generator efficiency, and power supply efficiency",
          "Thermal Systems: Analyzing boiler efficiency, heat pump efficiency, and refrigeration systems",
          "Energy Management: Calculating energy savings, system optimization, and cost analysis",
          "Research & Development: Evaluating experimental systems, comparing technologies, and optimizing designs"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our Efficiency Calculator works with any units, as long as output and input use the same units:
        </p>
        <ul>
          <li><strong>Energy:</strong> Joules (J), kilojoules (kJ), calories (cal), kilocalories (kcal), BTU, watt-hours (Wh), kilowatt-hours (kWh)</li>
          <li><strong>Power:</strong> Watts (W), kilowatts (kW), horsepower (hp), BTU/hour</li>
          <li><strong>Work:</strong> Joules (J), foot-pounds (ft-lb), Newton-meters (N·m)</li>
          <li><strong>Efficiency:</strong> Always expressed as a percentage (%)</li>
        </ul>
        <p>
          <strong>Important:</strong> Always use consistent units for output and input. For example, if output is in watts, input must also be in watts. The calculator will give you the same efficiency percentage regardless of the units used (as long as they&apos;re consistent).
        </p>
      </SEOSection>

      <SEOSection title="Common Efficiency Calculations">
        <h3>Example 1: Engine Efficiency</h3>
        <p>A gasoline engine produces 150,000 J of useful work from 500,000 J of fuel energy input. What is its efficiency?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Efficiency = (Output ÷ Input) × 100%</p>
          <p className="font-mono">Efficiency = (150,000 J ÷ 500,000 J) × 100%</p>
          <p className="font-mono">Efficiency = 0.30 × 100% = 30%</p>
          <p className="font-mono mt-2">Energy lost = 500,000 J - 150,000 J = 350,000 J (70% lost as heat)</p>
        </div>

        <h3>Example 2: Solar Panel Output</h3>
        <p>A solar panel with 22% efficiency receives 1,000 W of solar energy. What useful electrical power does it produce?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Output = (Input × Efficiency) ÷ 100%</p>
          <p className="font-mono">Output = (1,000 W × 22%) ÷ 100%</p>
          <p className="font-mono">Output = 220 W ÷ 1 = 220 W</p>
          <p className="font-mono mt-2">Energy lost = 1,000 W - 220 W = 780 W (78% not converted to electricity)</p>
        </div>

        <h3>Example 3: Required Input</h3>
        <p>An electric motor needs to produce 5 kW of mechanical power. If the motor is 85% efficient, what electrical power input is required?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Input = (Output × 100%) ÷ Efficiency</p>
          <p className="font-mono">Input = (5 kW × 100%) ÷ 85%</p>
          <p className="font-mono">Input = 500 ÷ 85 = 5.88 kW</p>
          <p className="font-mono mt-2">Energy lost = 5.88 kW - 5 kW = 0.88 kW (15% lost as heat)</p>
        </div>
      </SEOSection>

      <SEOSection title="Typical Efficiency Ranges">
        <p>
          Real-world efficiency values vary widely by system type:
        </p>
        <ul>
          <li><strong>Internal Combustion Engines:</strong> 20-40% (gasoline), 30-50% (diesel), 25-45% (natural gas)</li>
          <li><strong>Electric Motors:</strong> 70-95% (higher for larger motors)</li>
          <li><strong>Generators:</strong> 85-98% (electrical generation)</li>
          <li><strong>Solar Panels:</strong> 15-25% (commercial), up to 45% (research/laboratory)</li>
          <li><strong>Wind Turbines:</strong> 30-50% (theoretical maximum is 59.3% - Betz limit)</li>
          <li><strong>Batteries:</strong> 70-95% (charge/discharge efficiency)</li>
          <li><strong>LED Lights:</strong> 10-30% (electrical to visible light conversion)</li>
          <li><strong>Heat Pumps:</strong> 200-400% (COP - Coefficient of Performance, not true efficiency)</li>
          <li><strong>Steam Turbines:</strong> 30-50% (power generation)</li>
          <li><strong>Fuel Cells:</strong> 40-60% (chemical to electrical energy conversion)</li>
        </ul>
        <p>
          <strong>Note:</strong> Perfect efficiency (100%) is theoretically impossible in real systems due to the laws of thermodynamics and energy losses from friction, heat, sound, and other factors.
        </p>
      </SEOSection>

      <SEOSection title="Energy Losses and Improving Efficiency">
        <p>
          Understanding where energy is lost helps improve efficiency:
        </p>
        <SEOList items={[
          "Heat Loss: Energy converted to waste heat (common in engines, motors, and electrical devices)",
          "Friction: Mechanical energy lost to friction in moving parts",
          "Resistance: Electrical energy lost to resistance in wires and components",
          "Sound and Vibration: Energy converted to sound and vibration",
          "Light: Energy lost as unwanted light or radiation",
          "Incomplete Combustion: Chemical energy not fully converted in fuel-burning systems"
        ]} />
        <p>
          Improving efficiency often involves reducing these losses through better design, materials, maintenance, and system optimization.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is efficiency and why is it important?",
            answer: "Efficiency is the ratio of useful output to total input, expressed as a percentage. It's important because it measures how well a system converts input energy into useful output. Higher efficiency means less energy waste, lower operating costs, and better performance. Efficiency is crucial for comparing systems, optimizing designs, and reducing energy consumption."
          },
          {
            question: "Can efficiency be greater than 100%?",
            answer: "No, efficiency cannot be greater than 100% in normal systems. Efficiency greater than 100% would violate the law of conservation of energy, as it would imply that more energy is produced than is put in. However, some systems like heat pumps have coefficients of performance (COP) greater than 1, which can be confusing—this is not true efficiency but rather a measure of heat transfer relative to work input."
          },
          {
            question: "What units should I use for efficiency calculations?",
            answer: "You can use any units (energy, power, work) as long as output and input use the same units. Common units include joules, watts, kilowatt-hours, calories, or BTU. Efficiency is always expressed as a percentage. The key is consistency—output and input must use matching units for accurate calculations."
          },
          {
            question: "How do I improve efficiency?",
            answer: "Improving efficiency typically involves reducing energy losses: minimize friction through better lubrication and design, reduce heat loss through insulation, optimize system design, use more efficient components, perform regular maintenance, and reduce unnecessary energy consumption. Each system type has specific optimization strategies."
          },
          {
            question: "What's the difference between efficiency and effectiveness?",
            answer: "Efficiency is the ratio of useful output to input (a quantitative measure), while effectiveness is how well a system achieves its intended purpose (a qualitative measure). A system can be efficient but not effective (produces output efficiently but doesn't meet requirements) or effective but not efficient (meets requirements but wastes energy)."
          },
          {
            question: "Why is perfect efficiency (100%) impossible?",
            answer: "Perfect efficiency is impossible due to the laws of thermodynamics, particularly the second law. Energy losses occur through friction, heat transfer, sound, vibration, and other unavoidable processes. Real systems always have some energy dissipation, making 100% efficiency a theoretical ideal that cannot be achieved in practice."
          },
          {
            question: "How do I calculate efficiency for multiple systems in series?",
            answer: "For systems in series, multiply individual efficiencies: Overall Efficiency = Efficiency₁ × Efficiency₂ × Efficiency₃ × ... For example, if a generator is 90% efficient and a motor is 85% efficient, the overall efficiency is 0.90 × 0.85 = 0.765 or 76.5%. Each system's losses compound, reducing overall efficiency."
          },
          {
            question: "What is Carnot efficiency?",
            answer: "Carnot efficiency is the maximum theoretical efficiency for a heat engine operating between two temperature reservoirs. It's given by: η = 1 - (T_cold / T_hot), where temperatures are in Kelvin. This represents the absolute maximum efficiency possible for any heat engine, and real engines always operate below this limit."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Efficiency is a fundamental concept in physics and engineering that measures how well systems convert input into useful output. Our Efficiency Calculator simplifies these calculations, making it easy to determine efficiency, calculate expected output, or determine required input for any system or process.
        </p>
        <p>
          Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('kinetic-energy-calculator', 'Kinetic Energy Calculator')} for energy calculations, or the {createInternalLink('watt-calculator', 'Watt Calculator')} for power calculations that often complement efficiency analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

