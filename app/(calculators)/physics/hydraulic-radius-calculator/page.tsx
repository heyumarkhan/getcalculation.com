import HydraulicRadiusCalculator from '../../../_components/calculators/HydraulicRadiusCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function HydraulicRadiusCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Hydraulic Radius Calculator: Calculate R = A/P for Open Channel Flow"
      description="Calculate hydraulic radius, cross-sectional area, or wetted perimeter using R = A / P. Free online fluid mechanics calculator for open channel flow, Manning equation, and engineering with comprehensive unit support."
      calculator={<HydraulicRadiusCalculator />}
      slug="physics/hydraulic-radius-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate hydraulic radius from area and wetted perimeter",
        "Calculate cross-sectional area from hydraulic radius and wetted perimeter",
        "Calculate wetted perimeter from hydraulic radius and area",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Hydraulic Radius: Essential for Open Channel Flow Analysis">
        <p>
          Hydraulic radius is a fundamental parameter in fluid mechanics, particularly in open channel flow analysis. It represents the ratio of the cross-sectional area of flow to the wetted perimeter - the portion of the channel perimeter that is in contact with the flowing fluid. Whether you&apos;re designing drainage systems, analyzing river flow, calculating flow in pipes, or working with the Manning equation, understanding hydraulic radius is essential. Our Hydraulic Radius Calculator makes it easy to calculate hydraulic radius, cross-sectional area, or wetted perimeter using the fundamental formula: <strong>R = A / P</strong>.
        </p>
        <p>
          Hydraulic radius is crucial in open channel flow calculations because it relates the flow area to the frictional resistance. Unlike hydraulic diameter (used for closed conduits), hydraulic radius is specifically designed for open channels and is a key parameter in the Manning equation for calculating flow velocity and discharge.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Hydraulic Radius Calculator">
        <p>
          Our Hydraulic Radius Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <SEOList ordered items={[
          "<strong>Enter Two Values:</strong> Input any two of the three values (hydraulic radius, cross-sectional area, or wetted perimeter)",
          "<strong>Leave One Empty:</strong> Leave the value you want to calculate empty",
          "<strong>Select Units:</strong> Choose your preferred units for each measurement",
          "<strong>Click Calculate:</strong> The calculator will instantly compute the missing value with detailed step-by-step solutions"
        ]} />
        <p>
          The calculator uses the hydraulic radius formula: <strong>R = A / P</strong>, where R is hydraulic radius, A is cross-sectional area, and P is wetted perimeter.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Hydraulic Radius Formula">
        <p>
          The hydraulic radius formula is:
        </p>
        <SEOFormula
          formula="R = A / P"
          description="Where: R = hydraulic radius, A = cross-sectional area of flow, P = wetted perimeter (perimeter in contact with fluid)"
        />
        
        <h3>Rearranging the Formula</h3>
        <p>You can rearrange this formula to solve for any variable:</p>
        <SEOList items={[
          "<strong>Hydraulic Radius:</strong> R = A / P",
          "<strong>Cross-sectional Area:</strong> A = R × P",
          "<strong>Wetted Perimeter:</strong> P = A / R"
        ]} />

        <h3>Key Principles</h3>
        <SEOList items={[
          "<strong>Geometric Relationship:</strong> Hydraulic radius relates the flow area to the wetted perimeter, providing a measure of flow efficiency",
          "<strong>Open Channel Flow:</strong> Hydraulic radius is specifically used for open channel flow (rivers, canals, ditches) where the fluid has a free surface",
          "<strong>Friction Effects:</strong> Larger hydraulic radius means less frictional resistance per unit area, leading to higher flow efficiency",
          "<strong>Manning Equation:</strong> Hydraulic radius is a key parameter in the Manning equation: v = (1/n) × R^(2/3) × S^(1/2)"
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Hydraulic radius calculations are used in numerous real-world scenarios:
        </p>
        <SEOList items={[
          "<strong>Civil Engineering:</strong> Designing drainage systems, stormwater management, sewer design, and flood control channels",
          "<strong>Hydraulic Engineering:</strong> Analyzing river flow, designing irrigation canals, calculating flow in open channels, and water resource management",
          "<strong>Environmental Engineering:</strong> Designing wastewater treatment channels, analyzing stream flow, and environmental flow calculations",
          "<strong>Agricultural Engineering:</strong> Designing irrigation ditches, calculating flow in agricultural channels, and water distribution systems",
          "<strong>Urban Planning:</strong> Designing storm drains, calculating flow capacity of channels, and urban drainage design",
          "<strong>Mining Engineering:</strong> Designing tailings channels, calculating flow in mining operations, and water management",
          "<strong>Construction:</strong> Designing temporary drainage during construction, calculating flow in construction channels, and site water management",
          "<strong>Research and Education:</strong> Teaching fluid mechanics concepts, analyzing flow characteristics, and research in hydraulics"
        ]} />
      </SEOSection>

      <SEOSection title="Hydraulic Radius vs. Hydraulic Diameter">
        <p>
          Understanding the difference between hydraulic radius and hydraulic diameter:
        </p>
        <SEOList items={[
          "<strong>Hydraulic Radius (R):</strong> R = A / P. Used primarily for open channel flow. Has units of length (m, ft). For a full circular pipe: R = D/4.",
          "<strong>Hydraulic Diameter (Dh):</strong> Dh = 4A / P = 4R. Used for closed conduits and non-circular pipes. Also has units of length. For a full circular pipe: Dh = D.",
          "<strong>Relationship:</strong> Hydraulic diameter equals four times hydraulic radius: Dh = 4R. They are related but used in different contexts.",
          "<strong>Application:</strong> Hydraulic radius is preferred for open channels (Manning equation), while hydraulic diameter is used for closed conduits (Darcy-Weisbach equation)."
        ]} />
      </SEOSection>

      <SEOSection title="Common Channel Shapes and Their Hydraulic Radius">
        <p>
          Different channel shapes have different relationships between area, perimeter, and hydraulic radius:
        </p>
        <SEOList items={[
          "<strong>Rectangular Channel:</strong> For width W and depth y: A = W × y, P = W + 2y, R = (W × y) / (W + 2y)",
          "<strong>Triangular Channel:</strong> For side slope z and depth y: A = z × y², P = 2y√(1 + z²), R = (z × y) / (2√(1 + z²))",
          "<strong>Trapezoidal Channel:</strong> For bottom width b, side slope z, and depth y: A = (b + zy) × y, P = b + 2y√(1 + z²), R = A / P",
          "<strong>Circular Channel (Partially Full):</strong> For diameter D and depth y: More complex formulas involving trigonometric functions",
          "<strong>Parabolic Channel:</strong> For top width T and depth y: A = (2/3) × T × y, P involves integration, R = A / P"
        ]} />
      </SEOSection>

      <SEOSection title="Manning Equation and Hydraulic Radius">
        <p>
          Hydraulic radius is a key parameter in the Manning equation for open channel flow:
        </p>
        <SEOFormula
          formula="v = (1/n) × R^(2/3) × S^(1/2)"
          description="Where: v = flow velocity, n = Manning's roughness coefficient, R = hydraulic radius, S = channel slope"
        />
        <p>
          The Manning equation shows that flow velocity is proportional to R^(2/3), meaning that channels with larger hydraulic radius (for the same area) will have higher flow velocities. This makes hydraulic radius a critical parameter in channel design and flow analysis.
        </p>
        <SEOList items={[
          "<strong>Flow Rate:</strong> Q = A × v = A × (1/n) × R^(2/3) × S^(1/2). Flow rate depends on both area and hydraulic radius.",
          "<strong>Design Optimization:</strong> Engineers optimize channel dimensions to maximize hydraulic radius while meeting other constraints (cost, space, etc.).",
          "<strong>Roughness Coefficient:</strong> Manning's n depends on channel material and condition, typically ranging from 0.01 (smooth) to 0.05 (rough)."
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your hydraulic radius calculations:
        </p>
        <SEOList items={[
          "<strong>Hydraulic Radius:</strong> Meters (m), Centimeters (cm), Millimeters (mm), Feet (ft), Inches (in), Yards (yd), Miles (mi)",
          "<strong>Cross-sectional Area:</strong> Square meters (m²), Square centimeters (cm²), Square millimeters (mm²), Square feet (ft²), Square inches (in²), Square yards (yd²), Acres (ac)",
          "<strong>Wetted Perimeter:</strong> Meters (m), Centimeters (cm), Millimeters (mm), Feet (ft), Inches (in), Yards (yd), Miles (mi)"
        ]} />
        <p>
          <strong>Tip:</strong> Our calculator automatically converts between different units, so you can mix units as needed. The calculator ensures all calculations are performed in consistent base units (m, m², m) internally.
        </p>
      </SEOSection>

      <SEOSection title="Common Hydraulic Radius Calculations">
        <h3>Example 1: Calculating Hydraulic Radius</h3>
        <p>A rectangular channel has a width of 5 m and a water depth of 2 m. What is the hydraulic radius?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">A = W × y = 5 m × 2 m = 10 m²</p>
          <p className="font-mono">P = W + 2y = 5 m + 2(2 m) = 9 m</p>
          <p className="font-mono">R = A / P = 10 m² / 9 m = 1.11 m</p>
        </div>

        <h3>Example 2: Calculating Area</h3>
        <p>A channel has a hydraulic radius of 0.5 m and a wetted perimeter of 8 m. What is the cross-sectional area?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">A = R × P = 0.5 m × 8 m = 4 m²</p>
        </div>

        <h3>Example 3: Calculating Wetted Perimeter</h3>
        <p>A channel has a cross-sectional area of 12 m² and a hydraulic radius of 1.5 m. What is the wetted perimeter?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P = A / R = 12 m² / 1.5 m = 8 m</p>
        </div>

        <h3>Example 4: Circular Pipe (Partially Full)</h3>
        <p>A circular pipe with diameter 1 m is half full (y = 0.5 m). What is the hydraulic radius?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">For half-full circular pipe: A = πD²/8 = π(1)²/8 = 0.393 m²</p>
          <p className="font-mono">P = πD/2 = π(1)/2 = 1.57 m</p>
          <p className="font-mono">R = A / P = 0.393 m² / 1.57 m = 0.25 m = D/4</p>
        </div>
      </SEOSection>

      <SEOSection title="Optimal Channel Design">
        <p>
          Understanding hydraulic radius helps in optimal channel design:
        </p>
        <SEOList items={[
          "<strong>Maximum Hydraulic Radius:</strong> For a given area, the shape with maximum hydraulic radius minimizes frictional losses and maximizes flow efficiency.",
          "<strong>Semicircular Channel:</strong> A semicircular channel has the maximum hydraulic radius for a given area, making it the most efficient shape.",
          "<strong>Rectangular Channels:</strong> For rectangular channels, the optimal width-to-depth ratio depends on constraints, but wider channels generally have larger hydraulic radius.",
          "<strong>Cost vs. Efficiency:</strong> Engineers balance hydraulic efficiency (larger R) with construction costs and space constraints.",
          "<strong>Design Standards:</strong> Many design codes specify minimum hydraulic radius values for different channel types and flow conditions."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "What is hydraulic radius?",
            answer: "Hydraulic radius (R) is the ratio of the cross-sectional area of flow to the wetted perimeter: R = A / P. It's a key parameter in open channel flow analysis, representing the efficiency of the flow cross-section. Hydraulic radius has units of length and is used in the Manning equation to calculate flow velocity and discharge in open channels."
          },
          {
            question: "How do you calculate hydraulic radius?",
            answer: "Hydraulic radius is calculated using R = A / P, where A is the cross-sectional area of flow and P is the wetted perimeter (the portion of the channel perimeter in contact with the fluid). For example, a rectangular channel with width 4 m and depth 1 m has: A = 4 m², P = 6 m, so R = 4/6 = 0.667 m."
          },
          {
            question: "What is the difference between hydraulic radius and hydraulic diameter?",
            answer: "Hydraulic radius (R = A/P) is used for open channel flow and has units of length. Hydraulic diameter (Dh = 4A/P = 4R) is used for closed conduits and also has units of length. They are related by Dh = 4R. For a full circular pipe, R = D/4 and Dh = D, where D is the pipe diameter."
          },
          {
            question: "Why is hydraulic radius important in open channel flow?",
            answer: "Hydraulic radius is important because it's a key parameter in the Manning equation (v = (1/n) × R^(2/3) × S^(1/2)), which is used to calculate flow velocity and discharge in open channels. Larger hydraulic radius means less frictional resistance per unit area, leading to higher flow velocities for the same channel slope and roughness."
          },
          {
            question: "What is wetted perimeter?",
            answer: "Wetted perimeter (P) is the length of the channel perimeter that is in contact with the flowing fluid. For a rectangular channel, P = width + 2 × depth. For a circular pipe partially full, the wetted perimeter is the arc length of the wetted portion. Only the portion in contact with water counts toward the wetted perimeter."
          },
          {
            question: "How does channel shape affect hydraulic radius?",
            answer: "Channel shape significantly affects hydraulic radius. For the same cross-sectional area, shapes with smaller wetted perimeter have larger hydraulic radius. A semicircular channel has the maximum hydraulic radius for a given area. Wide, shallow channels typically have larger hydraulic radius than narrow, deep channels with the same area."
          },
          {
            question: "What units are used for hydraulic radius?",
            answer: "Hydraulic radius has units of length, typically meters (m) in the SI system or feet (ft) in the imperial system. Since it's a ratio of area (length²) to perimeter (length), the result is a length. Common units include m, cm, mm, ft, and in."
          },
          {
            question: "Can hydraulic radius be used for closed conduits?",
            answer: "While hydraulic radius can be calculated for closed conduits, hydraulic diameter (Dh = 4R) is more commonly used for closed conduits and non-circular pipes. Hydraulic radius is primarily used for open channel flow where the fluid has a free surface. Both are related and provide measures of flow efficiency."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding and calculating hydraulic radius is essential for anyone working with open channel flow, drainage design, or hydraulic engineering. Our Hydraulic Radius Calculator simplifies these calculations, making it easy to determine hydraulic radius, cross-sectional area, or wetted perimeter for channels using the formula R = A / P.
        </p>
        <p>
          Whether you&apos;re designing drainage systems, analyzing river flow, calculating flow in irrigation channels, or solving hydraulic engineering problems, accurate hydraulic radius calculations are crucial. By supporting multiple units and providing detailed step-by-step solutions, this calculator empowers users to explore open channel flow and understand the fundamental relationships in fluid mechanics. For related calculations, explore our {createInternalLink('flow-rate-calculator')} for flow rate calculations, our {createInternalLink('pipe-flow-calculator')} for pipe flow analysis, or our {createInternalLink('reynolds-number-calculator')} for flow regime analysis that complements hydraulic radius calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

