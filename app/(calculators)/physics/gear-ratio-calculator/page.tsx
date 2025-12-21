import GearRatioCalculator from '../../../_components/calculators/GearRatioCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GearRatioCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Gear Ratio Calculator: Calculate GR from Teeth or Speeds"
      description="Calculate gear ratio from number of teeth or speeds using GR = Driven/Driving or GR = Input Speed/Output Speed. Free online mechanics calculator for mechanical engineering and physics."
      calculator={<GearRatioCalculator />}
      slug="physics/gear-ratio-calculator"
      category="Mechanics"
      features={[
        "Calculate gear ratio from teeth or speeds",
        "Two calculation methods",
        "Instant mechanics calculations",
        "Multiple speed unit support (rpm, rps, rad/s, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Gear Ratio: Essential for Mechanical Systems">
        <p>
          Gear ratio is one of the most fundamental concepts in mechanical engineering and rotational mechanics. It describes the relationship between the rotational speeds or number of teeth of two meshing gears, determining how speed and torque are transferred in mechanical systems. Whether you&apos;re designing transmissions, analyzing machinery, or studying mechanical advantage, understanding gear ratios is essential. Our Gear Ratio Calculator makes it easy to calculate gear ratios using two methods: from the number of teeth on each gear, or from the input and output speeds.
        </p>
        <p>
          Gear ratios determine how mechanical power is transmitted through gear systems. A gear ratio greater than 1 means speed reduction (output rotates slower but with more torque), while a ratio less than 1 means speed increase (output rotates faster but with less torque). This fundamental principle is used in everything from bicycle gears and automotive transmissions to industrial machinery and robotics.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Gear Ratio Calculator">
        <p>
          Our Gear Ratio Calculator offers two calculation methods for maximum flexibility. Follow these steps:
        </p>
        
        <h3>Method 1: Using Number of Teeth</h3>
        <ol>
          <li><strong>Select Method:</strong> Choose &quot;Using Number of Teeth&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (gear ratio, driving gear teeth, or driven gear teeth)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>

        <h3>Method 2: Using Speeds</h3>
        <ol>
          <li><strong>Select Method:</strong> Choose &quot;Using Speeds&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (gear ratio, input speed, or output speed)</li>
          <li><strong>Select Speed Unit:</strong> Choose your preferred speed unit (rpm, rps, rad/s, deg/s)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding Gear Ratio Formulas">
        <p>
          Gear ratio can be calculated using two equivalent formulas:
        </p>
        
        <h3>Formula 1: Using Number of Teeth</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Gear Ratio = Driven Teeth / Driving Teeth</p>
          <p className="text-sm text-gray-600 mt-2">GR = N_driven / N_driving</p>
        </div>

        <h3>Formula 2: Using Speeds</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Gear Ratio = Input Speed / Output Speed</p>
          <p className="text-sm text-gray-600 mt-2">GR = ω_input / ω_output</p>
        </div>

        <h3>What is Gear Ratio?</h3>
        <p>
          Gear ratio (GR) describes how many times the driving gear must rotate to make the driven gear rotate once. It determines:
        </p>
        <SEOList items={[
          "Speed relationship: How output speed relates to input speed",
          "Torque relationship: How output torque relates to input torque (inversely proportional)",
          "Mechanical advantage: The trade-off between speed and force",
          "Power transmission: How rotational power is transmitted through the system"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Gear Ratio (GR):</strong> The ratio of driven gear properties to driving gear properties, typically expressed as X:1</li>
          <li><strong>Driving Gear (Input):</strong> The gear that receives power and drives the system</li>
          <li><strong>Driven Gear (Output):</strong> The gear that receives power from the driving gear</li>
          <li><strong>Number of Teeth:</strong> The count of teeth on each gear - directly relates to gear ratio</li>
          <li><strong>Speed Reduction:</strong> GR &gt; 1 means output is slower but has more torque</li>
          <li><strong>Speed Increase:</strong> GR &lt; 1 means output is faster but has less torque</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Gear ratio calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Automotive: Transmission design, differential gears, and engine power transfer",
          "Bicycles: Gear shifting systems and mechanical advantage",
          "Manufacturing: Industrial machinery, conveyor systems, and production equipment",
          "Robotics: Joint actuation, precision motion control, and power transmission",
          "Aerospace: Aircraft engines, landing gear, and control systems",
          "Marine: Propeller systems, winches, and steering mechanisms",
          "Wind Energy: Wind turbine gearboxes and power generation",
          "Machining: Lathes, mills, and CNC machine tool drives",
          "Clocks & Watches: Precision timekeeping mechanisms"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports different units depending on the calculation method:
        </p>
        
        <h3>Gear Ratio</h3>
        <p>
          Gear ratio is dimensionless and expressed as a ratio (e.g., 3:1, 0.5:1). It represents how many times one quantity relates to another.
        </p>

        <h3>Number of Teeth</h3>
        <p>
          Number of teeth is a count and has no units. It&apos;s always a positive integer representing the number of teeth on a gear.
        </p>

        <h3>Speed Units</h3>
        <ul>
          <li><strong>rpm:</strong> Revolutions per minute - most common for rotational speed</li>
          <li><strong>rps:</strong> Revolutions per second - 1 rps = 60 rpm</li>
          <li><strong>rad/s:</strong> Radians per second - SI unit for angular velocity</li>
          <li><strong>deg/s:</strong> Degrees per second - alternative angular velocity unit</li>
        </ul>
        <p><strong>Conversions:</strong></p>
        <ul>
          <li>1 rpm = 1/60 rps = π/30 rad/s ≈ 0.1047 rad/s</li>
          <li>1 rad/s = 60/(2π) rpm ≈ 9.549 rpm</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles speed unit conversions, so you can input speeds in any supported unit and get consistent results.
        </p>
      </SEOSection>

      <SEOSection title="Common Gear Ratio Calculations">
        <h3>Example 1: Calculating Gear Ratio from Teeth</h3>
        <p>A driving gear has 20 teeth and a driven gear has 60 teeth. What is the gear ratio?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Gear Ratio = Driven Teeth / Driving Teeth = 60 / 20 = 3:1</p>
          <p className="text-sm text-gray-600 mt-1">This means the driven gear rotates 3 times slower than the driving gear, but with 3 times more torque</p>
        </div>

        <h3>Example 2: Calculating Driven Gear Teeth</h3>
        <p>You need a gear ratio of 4:1. If the driving gear has 15 teeth, how many teeth should the driven gear have?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Driven Teeth = Gear Ratio × Driving Teeth = 4 × 15 = 60 teeth</p>
        </div>

        <h3>Example 3: Calculating Gear Ratio from Speeds</h3>
        <p>The input gear rotates at 1200 rpm and the output gear rotates at 300 rpm. What is the gear ratio?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Gear Ratio = Input Speed / Output Speed = 1200 rpm / 300 rpm = 4:1</p>
        </div>

        <h3>Example 4: Calculating Output Speed</h3>
        <p>With a gear ratio of 2:1, if the input rotates at 1000 rpm, what is the output speed?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Output Speed = Input Speed / Gear Ratio = 1000 rpm / 2 = 500 rpm</p>
        </div>

        <h3>Example 5: Speed Increase (Ratio &lt; 1)</h3>
        <p>A driving gear with 40 teeth meshes with a driven gear of 20 teeth. What is the gear ratio and output speed if input is 600 rpm?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Gear Ratio = 20 / 40 = 0.5:1 (or 1:2)</p>
          <p className="font-mono">Output Speed = 600 rpm / 0.5 = 1200 rpm</p>
          <p className="text-sm text-gray-600 mt-1">The output rotates twice as fast as the input, but with half the torque</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Speed Reduction vs. Speed Increase">
        <p>
          Gear ratios can be used for either speed reduction or speed increase:
        </p>
        <ul>
          <li><strong>Speed Reduction (GR &gt; 1):</strong> Output rotates slower than input, but with proportionally more torque. Common in applications requiring high torque, like lifting mechanisms or vehicle transmissions for starting.</li>
          <li><strong>Speed Increase (GR &lt; 1):</strong> Output rotates faster than input, but with proportionally less torque. Used when high speed is needed, like in some power tools or high-speed machinery.</li>
          <li><strong>1:1 Ratio:</strong> Equal speeds and torques - often used for coupling or when no speed change is needed.</li>
        </ul>
        <p>
          The trade-off between speed and torque is fundamental: you can&apos;t increase both simultaneously - power (speed × torque) remains constant in ideal systems.
        </p>
      </SEOSection>

      <SEOSection title="Gear Ratio and Mechanical Advantage">
        <p>
          Gear ratio directly relates to mechanical advantage:
        </p>
        <ul>
          <li><strong>Mechanical Advantage:</strong> The ratio of output force to input force, equal to the gear ratio</li>
          <li><strong>Torque Multiplication:</strong> For GR &gt; 1, output torque = input torque × GR</li>
          <li><strong>Power Conservation:</strong> Power (P = τ × ω) remains constant: Input Power = Output Power</li>
          <li><strong>Efficiency:</strong> Real systems have some energy loss due to friction, but gear ratios still apply</li>
        </ul>
        <p>
          This means gear systems allow you to trade speed for torque (or vice versa) while maintaining power, which is essential for many mechanical applications.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding gear ratios has practical applications in daily life:
        </p>
        <SEOList items={[
          "Bicycles: Understanding gear shifting and choosing the right gear for terrain",
          "Automotive: Understanding how transmission gears work and affect performance",
          "Power Tools: Understanding drill speeds and torque settings",
          "Clocks: Understanding how clock mechanisms maintain accurate time",
          "Wind-Up Toys: Understanding how gears create motion",
          "Machinery: Understanding industrial equipment operation",
          "Robotics: Understanding how robot joints and actuators work"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between gear ratio, number of teeth, and speeds?",
            answer: "Gear ratio can be calculated in two equivalent ways: (1) GR = Driven Teeth / Driving Teeth, or (2) GR = Input Speed / Output Speed. These formulas give the same result because gears with more teeth rotate slower when meshed. A gear ratio greater than 1 means speed reduction (output slower), while less than 1 means speed increase (output faster)."
          },
          {
            question: "What does a gear ratio of 3:1 mean?",
            answer: "A gear ratio of 3:1 means the driving gear must rotate 3 times for the driven gear to rotate once. This results in the output rotating 3 times slower than the input, but with 3 times more torque. It's a speed reduction gear system, useful when you need high torque at low speed."
          },
          {
            question: "How do I calculate gear ratio from number of teeth?",
            answer: "Gear ratio equals the number of teeth on the driven gear divided by the number of teeth on the driving gear: GR = Driven Teeth / Driving Teeth. For example, if a driving gear has 20 teeth and the driven gear has 60 teeth, the gear ratio is 60/20 = 3:1."
          },
          {
            question: "How does gear ratio affect torque?",
            answer: "Gear ratio directly multiplies torque. If the gear ratio is 3:1, the output torque is 3 times the input torque (assuming no friction losses). This is the inverse relationship to speed - as speed decreases by the gear ratio, torque increases by the same factor. Power (torque × speed) remains constant."
          },
          {
            question: "Can gear ratio be less than 1?",
            answer: "Yes, a gear ratio less than 1 (like 0.5:1 or 1:2) means speed increase. The driven gear rotates faster than the driving gear, but with proportionally less torque. This occurs when the driven gear has fewer teeth than the driving gear. It's useful when high speed is needed at the output."
          },
          {
            question: "What's the difference between driving gear and driven gear?",
            answer: "The driving gear (input gear) is the one that receives power and drives the system. The driven gear (output gear) is the one that receives power from the driving gear. Gear ratio is always calculated as driven/driving or output/input, so it shows how the driven gear relates to the driving gear."
          },
          {
            question: "How do I calculate output speed from gear ratio?",
            answer: "Output speed equals input speed divided by gear ratio: Output Speed = Input Speed / Gear Ratio. For example, with a 2:1 gear ratio and 1000 rpm input, output speed = 1000 / 2 = 500 rpm. For speed increase (GR < 1), divide by the ratio to get a higher output speed."
          },
          {
            question: "What is a good gear ratio?",
            answer: "The best gear ratio depends on the application. For high torque applications (lifting, starting vehicles), ratios of 3:1 to 10:1 or higher are common. For high-speed applications, ratios less than 1 (like 0.5:1) are used. Bicycles often use ratios from about 0.5:1 to 4:1. The choice depends on balancing speed and torque requirements for your specific needs."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding gear ratio and the relationships between number of teeth, speeds, and torque is fundamental to mechanical engineering and rotational mechanics. Our Gear Ratio Calculator simplifies these calculations, making it easy to solve problems involving gear systems, transmission design, and mechanical advantage.
        </p>
        <p>
          Whether you&apos;re designing gear systems, analyzing machinery, or understanding mechanical advantage, this calculator provides accurate results with support for multiple calculation methods and speed units. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('torque-calculator')} for torque calculations that often complement gear ratio analysis, or use our {createInternalLink('velocity-calculator')} for velocity calculations in mechanical systems.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

