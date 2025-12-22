import FrictionLossCalculator from '../../../_components/calculators/FrictionLossCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function FrictionLossCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Friction Loss Calculator: Calculate Head Loss & Pressure Drop in Pipes"
      description="Calculate head loss and pressure drop in pipes using Darcy-Weisbach or Hazen-Williams equations. Free online fluid mechanics calculator for pipe sizing and pump selection."
      calculator={<FrictionLossCalculator />}
      slug="physics/friction-loss-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate head loss using Darcy-Weisbach equation",
        "Calculate head loss using Hazen-Williams equation",
        "Calculate pressure drop from head loss",
        "Support for multiple units",
        "Auto-calculate friction factor",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Friction Loss: Essential for Pipe System Design">
        <p>
          Friction loss, also known as head loss or pressure drop, is the energy lost due to friction as fluid flows through pipes, fittings, and valves. Understanding friction loss is critical for designing efficient piping systems, selecting appropriate pumps, and ensuring adequate flow rates. Our Friction Loss Calculator makes it easy to determine head loss and pressure drop using the <strong>Darcy-Weisbach</strong> or <strong>Hazen-Williams</strong> equations.
        </p>
        <p>
          Whether you&apos;re an engineer designing water distribution systems, a plumber sizing pipes, or a technician troubleshooting flow problems, this calculator simplifies friction loss calculations with support for multiple units and both major calculation methods.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Friction Loss Calculator">
        <p>
          Our Friction Loss Calculator supports two calculation methods. Follow these steps:
        </p>
        <ol>
          <li><strong>Select Method:</strong> Choose between Darcy-Weisbach (more accurate, requires friction factor) or Hazen-Williams (simpler, uses C coefficient)</li>
          <li><strong>Enter Pipe Dimensions:</strong> Input pipe length and diameter</li>
          <li><strong>Enter Flow Parameters:</strong> Input velocity or flow rate (Darcy-Weisbach) or flow rate (Hazen-Williams)</li>
          <li><strong>Enter Additional Parameters:</strong> Friction factor (optional for Darcy-Weisbach) or Hazen-Williams coefficient</li>
          <li><strong>Enter Fluid Density:</strong> Input fluid density for pressure loss calculation (default: 1000 kg/m³ for water)</li>
          <li><strong>Click Calculate:</strong> The calculator will compute head loss and pressure drop with step-by-step solutions</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding Friction Loss Formulas">
        <h3>Darcy-Weisbach Equation</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">h_f = f × (L/D) × (v²/(2g))</p>
          <p className="text-sm text-gray-600 mt-2">Where: h_f = Head loss, f = Friction factor, L = Pipe length, D = Pipe diameter, v = Velocity, g = Gravitational acceleration</p>
        </div>
        <p>
          The Darcy-Weisbach equation is the most accurate method for calculating friction loss. It applies to all flow regimes (laminar and turbulent) and all pipe types. The friction factor (f) depends on the Reynolds number and pipe roughness.
        </p>

        <h3>Hazen-Williams Equation</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">h_f = 10.67 × L × (Q^1.852) / (C^1.852 × D^4.8704)</p>
          <p className="text-sm text-gray-600 mt-2">Where: h_f = Head loss, L = Pipe length, Q = Flow rate, C = Hazen-Williams coefficient, D = Pipe diameter</p>
        </div>
        <p>
          The Hazen-Williams equation is simpler and widely used for water distribution systems. It&apos;s most accurate for turbulent flow in pipes with diameters between 50 mm and 3,600 mm and velocities between 0.3 m/s and 3 m/s.
        </p>

        <h3>Pressure Loss</h3>
        <p>
          Head loss can be converted to pressure loss using:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ΔP = ρ × g × h_f</p>
          <p className="text-sm text-gray-600 mt-2">Where: ΔP = Pressure loss, ρ = Fluid density, g = Gravitational acceleration, h_f = Head loss</p>
        </div>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Friction loss calculations are essential in numerous engineering applications:
        </p>
        <SEOList items={[
          "Water Distribution Systems: Designing municipal water supply networks and ensuring adequate pressure",
          "Pump Selection: Determining required pump head to overcome friction losses",
          "Pipe Sizing: Selecting appropriate pipe diameters to minimize head loss",
          "HVAC Systems: Calculating pressure drops in heating and cooling systems",
          "Industrial Piping: Designing process piping for chemical and manufacturing plants",
          "Irrigation Systems: Ensuring adequate water pressure throughout agricultural systems",
          "Fire Protection: Designing sprinkler systems with adequate flow and pressure",
          "Plumbing Design: Sizing pipes for residential and commercial buildings",
          "Oil and Gas Pipelines: Calculating pressure drops in long-distance pipelines",
          "Wastewater Systems: Designing sewer and treatment plant piping"
        ]} />
      </SEOSection>

      <SEOSection title="Friction Factor and Hazen-Williams Coefficient">
        <h3>Friction Factor (f) - Darcy-Weisbach</h3>
        <p>
          The friction factor depends on flow regime and pipe characteristics:
        </p>
        <ul>
          <li><strong>Laminar Flow (Re &lt; 2300):</strong> f = 64 / Re (independent of roughness)</li>
          <li><strong>Turbulent Flow (Re &gt; 2300):</strong> f depends on Reynolds number and relative roughness</li>
          <li><strong>Typical Values:</strong>
            <ul className="ml-4 mt-1">
              <li>Smooth pipes: 0.01 - 0.02</li>
              <li>Commercial steel: 0.02 - 0.03</li>
              <li>Rough pipes: 0.03 - 0.05</li>
            </ul>
          </li>
        </ul>

        <h3>Hazen-Williams Coefficient (C)</h3>
        <p>
          The C coefficient represents pipe smoothness and condition:
        </p>
        <ul>
          <li><strong>New, Smooth Pipes:</strong> 130-150 (PVC, copper, new steel)</li>
          <li><strong>Good Condition:</strong> 100-130 (well-maintained pipes)</li>
          <li><strong>Average Condition:</strong> 80-100 (typical older pipes)</li>
          <li><strong>Poor Condition:</strong> 60-80 (corroded or rough pipes)</li>
          <li><strong>Very Rough:</strong> 40-60 (heavily corroded or tuberculated pipes)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Friction Loss Calculations">
        <h3>Example 1: Water Distribution (Hazen-Williams)</h3>
        <p>A 200 m long, 150 mm diameter PVC pipe carries 50 L/s of water. C = 140. What is the head loss?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">h_f = 10.67 × L × (Q^1.852) / (C^1.852 × D^4.8704)</p>
          <p className="font-mono">h_f = 10.67 × 200 × (0.05^1.852) / (140^1.852 × 0.15^4.8704)</p>
          <p className="font-mono">h_f = 10.67 × 200 × 0.00347 / (12,340 × 0.00000123) = 4.67 m</p>
        </div>

        <h3>Example 2: Industrial Pipe (Darcy-Weisbach)</h3>
        <p>A 100 m long, 200 mm diameter steel pipe carries water at 2 m/s. Friction factor f = 0.025. What is the head loss?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">h_f = f × (L/D) × (v²/(2g))</p>
          <p className="font-mono">h_f = 0.025 × (100 / 0.2) × (2² / (2 × 9.80665))</p>
          <p className="font-mono">h_f = 0.025 × 500 × 0.204 = 2.55 m</p>
        </div>

        <h3>Example 3: Pressure Loss Calculation</h3>
        <p>If head loss is 5 m and water density is 1000 kg/m³, what is the pressure loss?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ΔP = ρ × g × h_f = 1000 kg/m³ × 9.80665 m/s² × 5 m = 49,033 Pa = 49.0 kPa</p>
        </div>

        <h3>Example 4: Pump Head Requirement</h3>
        <p>A system requires 30 L/s flow through 500 m of 100 mm diameter pipe (C = 120). What pump head is needed?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">h_f = 10.67 × 500 × (0.03^1.852) / (120^1.852 × 0.1^4.8704)</p>
          <p className="font-mono">h_f = 10.67 × 500 × 0.00124 / (8,640 × 0.0000001) = 76.5 m</p>
          <p className="text-sm text-gray-600 mt-1">Pump must provide at least 76.5 m of head to overcome friction loss</p>
        </div>
      </SEOSection>

      <SEOSection title="Factors Affecting Friction Loss">
        <p>
          Several factors influence friction loss in pipes:
        </p>
        <ul>
          <li><strong>Pipe Length:</strong> Head loss is directly proportional to pipe length</li>
          <li><strong>Pipe Diameter:</strong> Larger diameters reduce friction loss (inverse relationship)</li>
          <li><strong>Flow Velocity:</strong> Higher velocities increase friction loss (velocity squared relationship)</li>
          <li><strong>Pipe Roughness:</strong> Rougher pipes have higher friction factors and greater head loss</li>
          <li><strong>Fluid Properties:</strong> Viscosity and density affect friction (especially in laminar flow)</li>
          <li><strong>Flow Regime:</strong> Turbulent flow has higher friction loss than laminar flow</li>
          <li><strong>Pipe Material:</strong> Different materials have different roughness characteristics</li>
          <li><strong>Pipe Age:</strong> Corrosion and scaling increase roughness over time</li>
        </ul>
      </SEOSection>

      <SEOSection title="Darcy-Weisbach vs. Hazen-Williams">
        <p>
          Understanding when to use each method:
        </p>
        <ul>
          <li><strong>Darcy-Weisbach:</strong>
            <ul className="ml-4 mt-1">
              <li>More accurate and theoretically sound</li>
              <li>Applies to all fluids (not just water)</li>
              <li>Works for all flow regimes</li>
              <li>Requires friction factor calculation</li>
              <li>Better for precise engineering calculations</li>
            </ul>
          </li>
          <li><strong>Hazen-Williams:</strong>
            <ul className="ml-4 mt-1">
              <li>Simpler and easier to use</li>
              <li>Widely used in water distribution</li>
              <li>Empirical formula (less theoretically rigorous)</li>
              <li>Best for water at typical temperatures</li>
              <li>Limited to turbulent flow in specific diameter ranges</li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>Recommendation:</strong> Use Darcy-Weisbach for precise calculations and non-water fluids. Use Hazen-Williams for quick estimates in water distribution systems.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is friction loss in pipes?",
            answer: "Friction loss (also called head loss or pressure drop) is the energy lost due to friction as fluid flows through pipes. It's caused by the interaction between the fluid and the pipe walls, resulting in a decrease in pressure and available energy. Friction loss must be overcome by pumps to maintain flow rates."
          },
          {
            question: "How do I calculate friction loss?",
            answer: "Use either the Darcy-Weisbach equation: h_f = f × (L/D) × (v²/(2g)), or the Hazen-Williams equation: h_f = 10.67 × L × (Q^1.852) / (C^1.852 × D^4.8704). The Darcy-Weisbach method is more accurate and works for all fluids, while Hazen-Williams is simpler and commonly used for water distribution systems."
          },
          {
            question: "What is the difference between head loss and pressure loss?",
            answer: "Head loss is the energy loss expressed as an equivalent height of fluid (in meters or feet). Pressure loss is the actual pressure drop (in Pascals or psi). They're related by: ΔP = ρ × g × h_f, where ρ is fluid density and g is gravitational acceleration. Head loss is often preferred because it's independent of fluid density."
          },
          {
            question: "How do I find the friction factor?",
            answer: "For laminar flow (Re < 2300), f = 64/Re. For turbulent flow, use the Moody chart or Swamee-Jain equation, which depends on Reynolds number and relative roughness (roughness/diameter). Our calculator automatically estimates the friction factor if not provided, based on Reynolds number and typical pipe roughness."
          },
          {
            question: "What is a good Hazen-Williams C value?",
            answer: "C values range from 40 (very rough pipes) to 150 (new smooth pipes). Typical values: 130-150 for new PVC/copper, 100-120 for average condition pipes, 80-100 for older pipes, and 60-80 for poor condition pipes. Higher C values mean less friction loss."
          },
          {
            question: "How does pipe diameter affect friction loss?",
            answer: "Friction loss decreases significantly with increasing pipe diameter. In the Darcy-Weisbach equation, head loss is inversely proportional to diameter (h_f ∝ 1/D). In Hazen-Williams, it's inversely proportional to D^4.8704, meaning doubling the diameter reduces head loss by approximately 30 times for the same flow rate."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding and calculating friction loss is fundamental to designing efficient piping systems, selecting appropriate pumps, and ensuring adequate flow rates. Our Friction Loss Calculator simplifies these calculations, supporting both the accurate Darcy-Weisbach method and the convenient Hazen-Williams method.
        </p>
        <p>
          Ready to explore more fluid mechanics concepts? Check out our other calculators like the {createInternalLink('reynolds-number-calculator', 'Reynolds Number Calculator')} for flow regime determination, or the {createInternalLink('force-calculator', 'Force Calculator')} for mechanics calculations that complement fluid flow analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

