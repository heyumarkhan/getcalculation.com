import PipeFlowCalculator from '../../../_components/calculators/PipeFlowCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function PipeFlowCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Pipe Flow Calculator: Calculate Flow Rate, Velocity, Diameter & Area"
      description="Calculate pipe flow rate, velocity, diameter, or cross-sectional area using Q = A × v = π × (D/2)² × v. Free online fluid mechanics calculator for plumbing, HVAC, and engineering with multiple unit support."
      calculator={<PipeFlowCalculator />}
      slug="physics/pipe-flow-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate flow rate, velocity, diameter, or area",
        "Supports circular pipes with diameter or custom area",
        "Multiple unit support (L/s, m³/s, gal/min, m/s, ft/s, mm, in, etc.)",
        "Automatic unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Pipe Flow: Essential Fluid Mechanics for Engineering">
        <p>
          Pipe flow calculations are fundamental in fluid mechanics, plumbing, HVAC, chemical engineering, and countless industrial applications. Whether you&apos;re designing water distribution systems, sizing pipes for industrial processes, or calculating flow rates in HVAC systems, understanding the relationships between flow rate, velocity, pipe diameter, and cross-sectional area is essential. Our Pipe Flow Calculator makes it easy to calculate any of these parameters using the fundamental relationship: <strong>Q = A × v = π × (D/2)² × v</strong>, where Q is flow rate, A is cross-sectional area, v is velocity, and D is pipe diameter.
        </p>
        <p>
          The relationship between flow rate, area, and velocity is governed by the continuity equation for incompressible flow. For a given flow rate, smaller pipes require higher velocities, while larger pipes allow lower velocities. Understanding these relationships is crucial for designing efficient pipe systems, minimizing pressure losses, and optimizing flow characteristics.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Pipe Flow Calculator">
        <p>
          Our Pipe Flow Calculator offers four calculation modes. Follow these steps:
        </p>
        
        <h3>Mode 1: Calculate Flow Rate</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Flow Rate (Q)&quot; from the dropdown</li>
          <li><strong>Enter Velocity:</strong> Input the fluid velocity in the pipe</li>
          <li><strong>Enter Diameter or Area:</strong> Input either the pipe diameter (for circular pipes) or cross-sectional area</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator shows the flow rate</li>
        </ol>

        <h3>Mode 2: Calculate Velocity</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Velocity (v)&quot; from the dropdown</li>
          <li><strong>Enter Flow Rate:</strong> Input the volumetric flow rate</li>
          <li><strong>Enter Diameter or Area:</strong> Input either pipe diameter or cross-sectional area</li>
          <li><strong>Click Calculate:</strong> The calculator shows the fluid velocity</li>
        </ol>

        <h3>Mode 3: Calculate Pipe Diameter</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Pipe Diameter (D)&quot; from the dropdown</li>
          <li><strong>Enter Flow Rate:</strong> Input the desired flow rate</li>
          <li><strong>Enter Velocity:</strong> Input the desired or maximum velocity</li>
          <li><strong>Click Calculate:</strong> The calculator shows the required pipe diameter</li>
        </ol>

        <h3>Mode 4: Calculate Area</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Cross-Sectional Area (A)&quot; from the dropdown</li>
          <li><strong>Enter Flow Rate:</strong> Input the flow rate</li>
          <li><strong>Enter Velocity:</strong> Input the velocity</li>
          <li><strong>Click Calculate:</strong> The calculator shows the required cross-sectional area</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding Pipe Flow Formulas">
        <p>
          Pipe flow calculations are based on the continuity equation for incompressible flow:
        </p>

        <h3>Fundamental Flow Rate Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Q = A × v</p>
          <p className="text-sm text-gray-600 mt-2">Where: Q = flow rate, A = cross-sectional area, v = velocity</p>
        </div>

        <h3>Circular Pipe Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Q = π × (D/2)² × v = (π × D² × v) / 4</p>
          <p className="text-sm text-gray-600 mt-2">Where: D = pipe diameter</p>
        </div>

        <h3>Rearranged Formulas</h3>
        <ul>
          <li><strong>Velocity:</strong> v = Q / A = Q / (π × (D/2)²) = 4Q / (π × D²)</li>
          <li><strong>Diameter:</strong> D = 2 × √(Q / (π × v)) = √(4Q / (π × v))</li>
          <li><strong>Area:</strong> A = Q / v = π × (D/2)²</li>
        </ul>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Flow Rate (Q):</strong> Volumetric flow rate, the volume of fluid passing through a cross-section per unit time. Measured in m³/s, L/s, gal/min, etc.</li>
          <li><strong>Velocity (v):</strong> Average velocity of the fluid in the pipe. Measured in m/s, ft/s, etc. For circular pipes, this is the average velocity across the cross-section.</li>
          <li><strong>Pipe Diameter (D):</strong> Internal diameter of the circular pipe. Measured in m, mm, in, etc.</li>
          <li><strong>Cross-Sectional Area (A):</strong> Area perpendicular to flow direction. For circular pipes: A = π × (D/2)². Measured in m², cm², etc.</li>
          <li><strong>Continuity Principle:</strong> For incompressible flow in a pipe, flow rate is constant (Q remains constant), so velocity increases when area decreases and vice versa.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Pipe flow calculations are essential in numerous engineering and practical applications:
        </p>
        <SEOList items={[
          "Plumbing: Designing water supply systems, sizing pipes for residential and commercial buildings",
          "HVAC: Calculating air flow in ducts, sizing ventilation systems, and designing air distribution",
          "Chemical Engineering: Designing process piping, sizing reactors, and optimizing flow in industrial plants",
          "Water Distribution: Designing municipal water systems, fire hydrant systems, and irrigation networks",
          "Oil & Gas: Sizing pipelines, calculating flow rates in refineries, and designing transport systems",
          "Power Plants: Designing cooling water systems, steam lines, and condensate return systems",
          "Food Processing: Sizing pipes for liquid food transport, pasteurization systems, and bottling lines",
          "Pharmaceuticals: Designing clean-in-place (CIP) systems, process piping, and sterile fluid transfer",
          "Wastewater Treatment: Sizing sewer pipes, designing treatment plant piping, and calculating flows",
          "Fire Protection: Sizing fire sprinkler systems, calculating required flow rates, and designing hydrant systems"
        ]} />
      </SEOSection>

      <SEOSection title="Common Pipe Flow Calculations">
        <h3>Example 1: Calculate Flow Rate in a Water Pipe</h3>
        <p>Water flows through a 50 mm diameter pipe at 2 m/s. Calculate the flow rate.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">D = 50 mm = 0.05 m, v = 2 m/s</p>
          <p className="font-mono">A = π × (D/2)² = π × (0.05/2)² = π × 0.00125 = 0.001963 m²</p>
          <p className="font-mono">Q = A × v = 0.001963 × 2 = 0.003926 m³/s = 3.926 L/s</p>
          <p className="text-sm text-gray-600 mt-1">Result: Flow rate is 3.926 L/s (approximately 14.1 m³/h or 62.1 gal/min)</p>
        </div>

        <h3>Example 2: Calculate Velocity for Given Flow Rate</h3>
        <p>What velocity is needed to achieve a flow rate of 10 L/s in a 40 mm diameter pipe?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Q = 10 L/s = 0.01 m³/s, D = 40 mm = 0.04 m</p>
          <p className="font-mono">A = π × (0.04/2)² = 0.001257 m²</p>
          <p className="font-mono">v = Q / A = 0.01 / 0.001257 = 7.96 m/s</p>
          <p className="text-sm text-gray-600 mt-1">Result: Velocity is 7.96 m/s (quite high - may cause excessive pressure loss)</p>
        </div>

        <h3>Example 3: Sizing Pipe for Desired Flow Rate</h3>
        <p>You need a flow rate of 20 L/s at a maximum velocity of 2 m/s. What pipe diameter is required?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Q = 20 L/s = 0.02 m³/s, v = 2 m/s</p>
          <p className="font-mono">D = 2 × √(Q / (π × v)) = 2 × √(0.02 / (π × 2))</p>
          <p className="font-mono">D = 2 × √(0.003183) = 2 × 0.0564 = 0.1128 m = 112.8 mm</p>
          <p className="text-sm text-gray-600 mt-1">Result: Required diameter is approximately 113 mm (next standard size might be 125 mm)</p>
        </div>

        <h3>Example 4: Flow Rate in HVAC Duct</h3>
        <p>An HVAC duct with cross-sectional area of 0.5 m² carries air at 5 m/s. Calculate the flow rate.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">A = 0.5 m², v = 5 m/s</p>
          <p className="font-mono">Q = A × v = 0.5 × 5 = 2.5 m³/s</p>
          <p className="text-sm text-gray-600 mt-1">Result: Air flow rate is 2.5 m³/s (150 m³/min or 5,297 CFM)</p>
        </div>

        <h3>Example 5: Comparing Different Pipe Sizes</h3>
        <p>Compare flow rates for 25 mm and 50 mm pipes at the same velocity (2 m/s).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">For 25 mm: Q = π × (0.025/2)² × 2 = 0.000982 m³/s = 0.982 L/s</p>
          <p className="font-mono">For 50 mm: Q = π × (0.05/2)² × 2 = 0.003927 m³/s = 3.927 L/s</p>
          <p className="text-sm text-gray-600 mt-1">Result: Doubling diameter increases flow rate by 4 times (area increases by 4)</p>
        </div>
      </SEOSection>

      <SEOSection title="Flow Rate, Velocity, and Pipe Size Relationships">
        <p>
          Understanding the relationships between flow rate, velocity, and pipe size is crucial:
        </p>
        <ul>
          <li><strong>Constant Flow Rate:</strong> If flow rate is constant, velocity is inversely proportional to area. Smaller pipes = higher velocity, larger pipes = lower velocity.</li>
          <li><strong>Constant Velocity:</strong> If velocity is constant, flow rate is directly proportional to area. Larger pipes allow higher flow rates.</li>
          <li><strong>Diameter Effect:</strong> Flow rate is proportional to diameter squared (Q ∝ D²). Doubling diameter quadruples flow rate at the same velocity.</li>
          <li><strong>Velocity Limits:</strong> Typical design velocities: Water 1-3 m/s, Air in ducts 3-10 m/s, Oil 1-2 m/s. Higher velocities increase pressure loss and noise.</li>
          <li><strong>Pressure Drop:</strong> Higher velocities result in greater friction losses and pressure drops, requiring more pump power.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Pipe Flow Design Considerations">
        <p>
          When designing pipe systems, several factors should be considered:
        </p>
        <SEOList items={[
          "Velocity Limits: Typical velocities are 1-3 m/s for water to minimize pressure loss and erosion",
          "Pressure Drop: Higher velocities cause greater friction losses - calculate using {createInternalLink('friction-loss-calculator', 'friction loss formulas')}",
          "Cost Optimization: Larger pipes cost more but reduce velocity, pressure drop, and operating costs",
          "Standard Sizes: Pipe diameters come in standard sizes - select the next larger standard size",
          "Future Capacity: Design with 20-30% excess capacity for future expansion",
          "Minimum Velocity: Ensure minimum velocity to prevent sedimentation (typically 0.5-0.6 m/s for water)",
          "Maximum Velocity: Avoid velocities that cause excessive noise, erosion, or pressure loss",
          "Reynolds Number: Use {createInternalLink('reynolds-number-calculator', 'Reynolds number')} to determine flow regime (laminar vs turbulent)"
        ]} />
      </SEOSection>

      <SEOSection title="Circular vs. Non-Circular Pipes">
        <p>
          While most pipes are circular, the calculator can handle non-circular shapes:
        </p>
        <ul>
          <li><strong>Circular Pipes:</strong> Use diameter input. Most common for water, gas, and oil pipelines. Formula: A = π × (D/2)²</li>
          <li><strong>Rectangular Ducts:</strong> Use area input. Common in HVAC systems. Area = width × height</li>
          <li><strong>Square Ducts:</strong> Use area input. Area = side²</li>
          <li><strong>Oval Ducts:</strong> Use area input. More complex geometry, area must be calculated separately</li>
          <li><strong>Custom Shapes:</strong> Use area input. Calculate area based on specific geometry</li>
        </ul>
        <p>
          For non-circular shapes, simply enter the cross-sectional area directly, and the calculator will use Q = A × v for all calculations.
        </p>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          The calculator supports multiple unit systems for convenience:
        </p>
        
        <h3>Flow Rate Units</h3>
        <ul>
          <li><strong>Metric:</strong> m³/s, L/s, L/min, L/h, mL/s</li>
          <li><strong>Imperial:</strong> gal/min (GPM), gal/h, ft³/s (CFS), ft³/min (CFM), in³/s</li>
        </ul>
        <p><strong>Common Conversions:</strong> 1 L/s = 15.85 gal/min, 1 m³/s = 1,000 L/s = 15,850 gal/min</p>

        <h3>Velocity Units</h3>
        <ul>
          <li><strong>Metric:</strong> m/s, cm/s, mm/s, km/h</li>
          <li><strong>Imperial:</strong> ft/s, in/s, mph</li>
        </ul>
        <p><strong>Common Conversions:</strong> 1 m/s = 3.281 ft/s = 3.6 km/h = 2.237 mph</p>

        <h3>Diameter/Length Units</h3>
        <ul>
          <li><strong>Metric:</strong> m, cm, mm</li>
          <li><strong>Imperial:</strong> ft, in</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between flow rate, velocity, and pipe diameter?",
            answer: "Flow rate (Q), velocity (v), and pipe diameter (D) are related by Q = A × v = π × (D/2)² × v. For a constant flow rate, doubling the diameter reduces velocity by 4 times (velocity ∝ 1/D²). For a constant velocity, doubling the diameter increases flow rate by 4 times (Q ∝ D²)."
          },
          {
            question: "How do I calculate flow rate in a pipe?",
            answer: "Use Q = A × v, where A is cross-sectional area and v is velocity. For circular pipes: Q = π × (D/2)² × v. You need to know either the diameter (for circular pipes) or the cross-sectional area, plus the velocity. Our calculator can determine any variable if you know the other two."
          },
          {
            question: "What is a typical flow velocity in pipes?",
            answer: "Typical design velocities vary by fluid: Water systems (1-3 m/s), HVAC air ducts (3-10 m/s), Oil pipelines (1-2 m/s), Steam lines (20-40 m/s). Higher velocities increase pressure loss and may cause noise or erosion. Lower velocities may allow sedimentation."
          },
          {
            question: "How does pipe diameter affect flow rate?",
            answer: "Flow rate is proportional to diameter squared (Q ∝ D²) at constant velocity. This means doubling the pipe diameter increases flow rate by 4 times. However, if flow rate is constant, doubling diameter reduces velocity by 4 times. This relationship is why pipe sizing is critical for system design."
          },
          {
            question: "Can I use this calculator for non-circular pipes?",
            answer: "Yes! For non-circular pipes (rectangular ducts, square ducts, etc.), use the area input option instead of diameter. Calculate the cross-sectional area of your shape (width × height for rectangular, etc.) and enter it. The calculator will use Q = A × v for all calculations."
          },
          {
            question: "What flow rate units are commonly used?",
            answer: "Common units include L/s (liters per second) and m³/s for metric systems, and gal/min (GPM - gallons per minute) for imperial systems. HVAC often uses ft³/min (CFM - cubic feet per minute) for air flow. The choice depends on the application and industry standards."
          },
          {
            question: "How do I size a pipe for a given flow rate?",
            answer: "First, determine your desired maximum velocity (typically 1-3 m/s for water). Then use D = 2 × √(Q / (π × v)) to calculate required diameter. Round up to the next standard pipe size. Consider pressure drop, cost, and future capacity needs."
          },
          {
            question: "What is the continuity equation in pipe flow?",
            answer: "The continuity equation states that for incompressible flow, the volumetric flow rate (Q) is constant throughout a pipe system: Q = A₁ × v₁ = A₂ × v₂. This means if pipe area decreases, velocity increases proportionally, and vice versa. This principle underlies all pipe flow calculations."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding pipe flow and the relationship Q = A × v = π × (D/2)² × v is fundamental to fluid mechanics, plumbing, HVAC, and engineering design. Our Pipe Flow Calculator simplifies these calculations, making it easy to determine flow rate, velocity, pipe diameter, or cross-sectional area with support for multiple unit systems.
        </p>
        <p>
          Whether you&apos;re designing water systems, sizing HVAC ducts, calculating flow rates in industrial processes, or solving engineering problems, accurate pipe flow calculations are essential. Ready to explore more fluid mechanics concepts? Check out our other calculators like the {createInternalLink('flow-rate-calculator', 'Flow Rate Calculator')} for general flow calculations, the {createInternalLink('friction-loss-calculator', 'Friction Loss Calculator')} for pressure drop calculations, or the {createInternalLink('reynolds-number-calculator', 'Reynolds Number Calculator')} for flow regime analysis - all of which complement pipe flow design.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

