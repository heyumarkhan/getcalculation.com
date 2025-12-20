import FlowRateCalculator from '../../../_components/calculators/FlowRateCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function FlowRateCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Flow Rate Calculator: Calculate Q = A × v or Q = V/t Instantly"
      description="Calculate volumetric flow rate, area, velocity, volume, or time using Q = A × v or Q = V/t. Free online fluid mechanics calculator for physics and engineering with multiple unit support."
      calculator={<FlowRateCalculator />}
      slug="physics/flow-rate-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate flow rate, area, velocity, volume, or time",
        "Two calculation methods: Q = A × v or Q = V/t",
        "Instant fluid mechanics calculations",
        "Multiple unit support (m³/s, L/s, gal/min, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Flow Rate: Essential Fluid Mechanics Concept">
        <p>
          Flow rate is one of the most fundamental concepts in fluid mechanics and hydraulic engineering. It describes how much fluid passes through a given area per unit time. Whether you&apos;re studying physics, engineering, working on plumbing systems, or designing fluid transport systems, understanding flow rate is essential. Our Flow Rate Calculator makes it easy to calculate volumetric flow rate, area, velocity, volume, or time using two fundamental formulas: <strong>Q = A × v</strong> (flow rate equals area times velocity) or <strong>Q = V/t</strong> (flow rate equals volume divided by time).
        </p>
        <p>
          Volumetric flow rate tells you the volume of fluid flowing through a system per unit time. This is crucial for understanding fluid dynamics, designing pipe systems, calculating pump requirements, and analyzing fluid transport in countless applications from household plumbing to industrial processes.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Flow Rate Calculator">
        <p>
          Our Flow Rate Calculator offers two calculation methods for maximum flexibility. Follow these steps:
        </p>
        
        <h3>Method 1: Using Area and Velocity (Q = A × v)</h3>
        <ol>
          <li><strong>Select Method:</strong> Choose &quot;Using Area and Velocity&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (flow rate, area, or velocity)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>

        <h3>Method 2: Using Volume and Time (Q = V/t)</h3>
        <ol>
          <li><strong>Select Method:</strong> Choose &quot;Using Volume and Time&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (flow rate, volume, or time)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding Flow Rate Formulas">
        <p>
          Flow rate can be calculated using two equivalent formulas depending on what information you have:
        </p>
        
        <h3>Formula 1: Q = A × v</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Q = A × v</p>
          <p className="text-sm text-gray-600 mt-2">Where: Q = flow rate, A = cross-sectional area, v = velocity</p>
        </div>
        <p>
          This formula relates flow rate to the cross-sectional area through which the fluid flows and the velocity of the fluid. It&apos;s particularly useful when you know the pipe diameter or channel dimensions and the fluid speed.
        </p>

        <h3>Formula 2: Q = V/t</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Q = V/t</p>
          <p className="text-sm text-gray-600 mt-2">Where: Q = flow rate, V = volume, t = time</p>
        </div>
        <p>
          This formula relates flow rate to the volume of fluid that passes through a point and the time it takes. It&apos;s useful when measuring how much fluid has flowed over a known period.
        </p>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Volumetric Flow Rate (Q):</strong> The volume of fluid passing through a cross-section per unit time, measured in m³/s, L/s, gal/min, etc.</li>
          <li><strong>Cross-Sectional Area (A):</strong> The area perpendicular to the flow direction, measured in m², cm², ft², etc.</li>
          <li><strong>Velocity (v):</strong> The speed at which the fluid flows, measured in m/s, cm/s, ft/s, etc.</li>
          <li><strong>Volume (V):</strong> The total volume of fluid, measured in m³, L, gal, etc.</li>
          <li><strong>Time (t):</strong> The duration over which the flow occurs, measured in seconds, minutes, hours, etc.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Flow rate calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Plumbing & HVAC: Designing water supply systems, calculating pipe sizes, and sizing pumps",
          "Chemical Engineering: Process design, reactor design, and chemical transport systems",
          "Civil Engineering: Water distribution networks, sewage systems, and stormwater management",
          "Automotive: Fuel injection systems, cooling systems, and hydraulic systems",
          "Aerospace: Fuel systems, hydraulic systems, and environmental control systems",
          "Medical: IV drip rates, blood flow measurements, and medical device design",
          "Environmental Engineering: Water treatment plants, wastewater management, and pollution control",
          "Oil & Gas: Pipeline design, well production rates, and fluid transport",
          "Manufacturing: Process fluid management, cooling systems, and material handling"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your calculations. Our calculator supports multiple unit systems and automatically converts between them:
        </p>
        
        <h3>Flow Rate Units</h3>
        <ul>
          <li><strong>Metric:</strong> m³/s (cubic meters per second), L/s (liters per second), L/min (liters per minute), L/h (liters per hour), mL/s (milliliters per second)</li>
          <li><strong>Imperial:</strong> gal/min (gallons per minute), gal/h (gallons per hour), ft³/s (cubic feet per second), ft³/min (cubic feet per minute), in³/s (cubic inches per second)</li>
        </ul>
        <p><strong>Note:</strong> 1 m³/s = 1000 L/s = 264.172 gal/min (US)</p>

        <h3>Area Units</h3>
        <ul>
          <li><strong>Metric:</strong> m² (square meters), cm² (square centimeters), mm² (square millimeters)</li>
          <li><strong>Imperial:</strong> ft² (square feet), in² (square inches)</li>
        </ul>

        <h3>Velocity Units</h3>
        <ul>
          <li><strong>Metric:</strong> m/s (meters per second), cm/s (centimeters per second), mm/s (millimeters per second), km/h (kilometers per hour)</li>
          <li><strong>Imperial:</strong> ft/s (feet per second), in/s (inches per second), mph (miles per hour)</li>
        </ul>

        <h3>Volume Units</h3>
        <ul>
          <li><strong>Metric:</strong> m³ (cubic meters), L (liters), mL (milliliters), cm³ (cubic centimeters)</li>
          <li><strong>Imperial:</strong> ft³ (cubic feet), in³ (cubic inches), gal (gallons US)</li>
        </ul>

        <h3>Time Units</h3>
        <ul>
          <li>Seconds (s), minutes (min), hours (h), milliseconds (ms), days</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles unit conversions, so you can mix different unit systems. For example, you can input area in cm², velocity in m/s, and get flow rate in L/s.
        </p>
      </SEOSection>

      <SEOSection title="Common Flow Rate Calculations">
        <h3>Example 1: Calculating Flow Rate from Area and Velocity</h3>
        <p>Water flows through a pipe with a cross-sectional area of 0.0314 m² (diameter of 20 cm) at a velocity of 2 m/s. What is the flow rate?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Q = A × v = 0.0314 m² × 2 m/s = 0.0628 m³/s = 62.8 L/s</p>
        </div>

        <h3>Example 2: Calculating Velocity from Flow Rate and Area</h3>
        <p>A pipe has a flow rate of 50 L/s and a cross-sectional area of 0.005 m². What is the velocity of the fluid?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = Q / A = 50 L/s / 0.005 m² = 0.05 m³/s / 0.005 m² = 10 m/s</p>
        </div>

        <h3>Example 3: Calculating Area from Flow Rate and Velocity</h3>
        <p>You need a flow rate of 100 L/min at a velocity of 1 m/s. What cross-sectional area is required?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">A = Q / v = (100 L/min) / (1 m/s) = (1.667 L/s) / (1 m/s) = 0.001667 m³/s / 1 m/s = 0.001667 m² = 16.67 cm²</p>
        </div>

        <h3>Example 4: Calculating Flow Rate from Volume and Time</h3>
        <p>50 liters of water flow through a pipe in 30 seconds. What is the flow rate?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Q = V / t = 50 L / 30 s = 1.667 L/s</p>
        </div>

        <h3>Example 5: Calculating Volume from Flow Rate and Time</h3>
        <p>A pump delivers water at a rate of 10 gal/min. How much water is delivered in 2 hours?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V = Q × t = 10 gal/min × 120 min = 1,200 gallons</p>
        </div>

        <h3>Example 6: Calculating Time from Flow Rate and Volume</h3>
        <p>How long will it take to fill a 500-liter tank at a flow rate of 25 L/min?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">t = V / Q = 500 L / 25 L/min = 20 minutes</p>
        </div>
      </SEOSection>

      <SEOSection title="Flow Rate in Different Pipe Sizes">
        <p>
          Understanding the relationship between flow rate, area, and velocity is crucial for pipe system design:
        </p>
        <ul>
          <li><strong>Constant Flow Rate:</strong> When flow rate is constant, velocity increases as pipe diameter decreases (smaller area = higher velocity)</li>
          <li><strong>Constant Velocity:</strong> Larger pipes allow higher flow rates at the same velocity</li>
          <li><strong>Pipe Sizing:</strong> Engineers use flow rate calculations to determine appropriate pipe diameters for given flow requirements</li>
          <li><strong>Pressure Drop:</strong> Higher velocities (from smaller pipes) typically result in greater pressure losses</li>
        </ul>
        <p>
          This relationship is why water flows faster through narrow pipes and slower through wide pipes when the flow rate is constant.
        </p>
      </SEOSection>

      <SEOSection title="Volumetric Flow Rate vs. Mass Flow Rate">
        <p>
          It&apos;s important to distinguish between volumetric and mass flow rates:
        </p>
        <ul>
          <li><strong>Volumetric Flow Rate (Q):</strong> Volume of fluid per unit time (m³/s, L/s) - what our calculator measures</li>
          <li><strong>Mass Flow Rate (ṁ):</strong> Mass of fluid per unit time (kg/s, lb/s) - related by density: ṁ = ρ × Q</li>
        </ul>
        <p>
          For incompressible fluids like water, volumetric flow rate is commonly used. For compressible fluids like gases, mass flow rate is often more relevant because volume changes with pressure and temperature.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding flow rate has practical applications in daily life:
        </p>
        <SEOList items={[
          "Home Plumbing: Calculating water usage, sizing pipes, and designing irrigation systems",
          "Gardening: Determining sprinkler flow rates and watering schedules",
          "Swimming Pools: Calculating pump flow rates and filtration requirements",
          "Aquariums: Setting appropriate flow rates for filters and circulation",
          "Water Conservation: Measuring and reducing water consumption",
          "Shower Heads: Understanding flow rates for water-efficient fixtures",
          "Automotive: Understanding fuel and coolant flow rates"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between flow rate, area, and velocity?",
            answer: "Flow rate (Q) equals cross-sectional area (A) times velocity (v): Q = A × v. This means for a constant flow rate, smaller areas result in higher velocities, and larger areas result in lower velocities. Conversely, for a constant area, higher velocities produce higher flow rates."
          },
          {
            question: "What are the most common flow rate units?",
            answer: "Common units include m³/s (cubic meters per second) and L/s (liters per second) in the metric system, and gal/min (gallons per minute) and ft³/s (cubic feet per second) in the imperial system. The choice depends on the application and industry standards."
          },
          {
            question: "How do I calculate flow rate for a circular pipe?",
            answer: "For a circular pipe, first calculate the cross-sectional area: A = π × (d/2)² = π × r², where d is diameter and r is radius. Then use Q = A × v. You can also combine these: Q = π × r² × v for a circular pipe."
          },
          {
            question: "What's the difference between volumetric flow rate and mass flow rate?",
            answer: "Volumetric flow rate (Q) measures volume per time (m³/s, L/s), while mass flow rate (ṁ) measures mass per time (kg/s). They're related by density: ṁ = ρ × Q. Our calculator focuses on volumetric flow rate, which is most common for liquids."
          },
          {
            question: "How does pipe diameter affect flow rate?",
            answer: "For a constant velocity, larger pipe diameters allow higher flow rates because area increases with the square of the diameter. For a constant flow rate, smaller diameters result in higher velocities. Pipe diameter has a squared relationship with area: A = π × (d/2)²."
          },
          {
            question: "Can flow rate change in a pipe system?",
            answer: "For incompressible fluids in a closed system, volumetric flow rate is constant throughout (continuity principle). However, velocity changes with pipe diameter - smaller pipes have higher velocities. Pressure and head losses affect the driving force but don't change flow rate in steady flow."
          },
          {
            question: "How is flow rate used in pump sizing?",
            answer: "Flow rate is one of the key parameters for pump selection. Engineers calculate the required flow rate based on system needs, then select pumps that can deliver that flow rate at the required pressure. Flow rate determines pump capacity, while head/pressure determines pump power requirements."
          },
          {
            question: "What flow rate units are used in different industries?",
            answer: "Water utilities often use L/s or m³/h. HVAC uses gal/min (GPM) or ft³/min (CFM). Chemical and process industries commonly use m³/h or L/min. Medical applications use mL/min or mL/h. The choice depends on industry standards and typical flow ranges."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding flow rate and the relationships Q = A × v and Q = V/t is fundamental to fluid mechanics, hydraulic engineering, and many practical applications. Our Flow Rate Calculator simplifies these calculations, making it easy to solve problems involving fluid flow, pipe sizing, and system design.
        </p>
        <p>
          Whether you&apos;re calculating flow rates for plumbing systems, designing fluid transport systems, or analyzing fluid dynamics, this calculator provides accurate results with support for multiple unit systems and two calculation methods. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('velocity-calculator')} for velocity calculations, or use our {createInternalLink('volume')} calculator for volume calculations that complement flow rate analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

