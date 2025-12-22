import ReynoldsNumberCalculator from '../../../_components/calculators/ReynoldsNumberCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ReynoldsNumberCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Reynolds Number Calculator: Calculate Flow Regime (Re = ρvD/μ)"
      description="Calculate Reynolds number or any variable using Re = (ρ × v × D) / μ. Free online fluid mechanics calculator with flow regime determination (laminar, transitional, turbulent)."
      calculator={<ReynoldsNumberCalculator />}
      slug="physics/reynolds-number-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate Reynolds number from fluid properties",
        "Calculate density, velocity, diameter, or viscosity",
        "Automatic flow regime determination",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Reynolds Number: Essential Fluid Mechanics">
        <p>
          The Reynolds number is one of the most important dimensionless quantities in fluid mechanics. It predicts whether fluid flow will be laminar, transitional, or turbulent. Understanding and calculating the Reynolds number is essential for engineers, physicists, and anyone working with fluid systems. Our Reynolds Number Calculator makes it easy to determine flow characteristics and solve for any variable in the Reynolds number equation.
        </p>
        <p>
          Named after Osborne Reynolds, who first described it in 1883, the Reynolds number represents the ratio of inertial forces to viscous forces in a fluid flow. This ratio determines the flow regime, which affects everything from pipe design to aircraft aerodynamics.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Reynolds Number Calculator">
        <p>
          Our Reynolds Number Calculator is designed for accuracy and ease of use. Follow these steps:
        </p>
        <ol>
          <li><strong>Enter Four Values:</strong> Input any four of the five values (Reynolds number, density, velocity, diameter, or viscosity)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will compute the missing value and display the flow regime if calculating Reynolds number</li>
        </ol>
        <p>
          The calculator uses the formula: <strong>Re = (ρ × v × D) / μ</strong>, where Re is Reynolds number, ρ is density, v is velocity, D is characteristic length/diameter, and μ is dynamic viscosity.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Reynolds Number Formula">
        <p>
          The Reynolds number is calculated using:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">Re = (ρ × v × D) / μ</p>
          <p className="text-sm text-gray-600 mt-2">Where: Re = Reynolds number (dimensionless), ρ = density, v = velocity, D = characteristic length/diameter, μ = dynamic viscosity</p>
        </div>

        <h3>Alternative Form Using Kinematic Viscosity</h3>
        <p>
          The Reynolds number can also be expressed using kinematic viscosity (ν = μ/ρ):
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">Re = (v × D) / ν</p>
          <p className="text-sm text-gray-600 mt-2">Where: ν = kinematic viscosity = μ/ρ</p>
        </div>

        <h3>Key Variables</h3>
        <ul>
          <li><strong>Density (ρ):</strong> Mass per unit volume of the fluid (kg/m³)</li>
          <li><strong>Velocity (v):</strong> Average velocity of the fluid (m/s)</li>
          <li><strong>Characteristic Length (D):</strong> For pipes, this is the diameter; for other geometries, it&apos;s a representative length scale (m)</li>
          <li><strong>Dynamic Viscosity (μ):</strong> Measure of a fluid&apos;s resistance to flow (Pa·s)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Flow Regimes: Laminar, Transitional, and Turbulent">
        <p>
          The Reynolds number determines the flow regime:
        </p>
        <ul>
          <li><strong>Laminar Flow (Re &lt; 2300):</strong>
            <ul className="ml-4 mt-1">
              <li>Smooth, orderly flow with parallel streamlines</li>
              <li>Low energy dissipation</li>
              <li>Predictable and stable</li>
              <li>Common in small pipes, slow flows, or highly viscous fluids</li>
            </ul>
          </li>
          <li><strong>Transitional Flow (2300 ≤ Re ≤ 4000):</strong>
            <ul className="ml-4 mt-1">
              <li>Unstable flow between laminar and turbulent</li>
              <li>Flow can switch between regimes</li>
              <li>Difficult to predict behavior</li>
            </ul>
          </li>
          <li><strong>Turbulent Flow (Re &gt; 4000):</strong>
            <ul className="ml-4 mt-1">
              <li>Chaotic, irregular flow with eddies and mixing</li>
              <li>Higher energy dissipation</li>
              <li>Better mixing and heat transfer</li>
              <li>Common in large pipes, fast flows, or low-viscosity fluids</li>
            </ul>
          </li>
        </ul>
        <p>
          <strong>Note:</strong> These thresholds (2300 and 4000) are approximate and can vary depending on pipe roughness, entrance conditions, and other factors.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Reynolds number calculations are critical in numerous engineering and scientific applications:
        </p>
        <SEOList items={[
          "Pipe Flow Design: Determining pipe sizes and flow rates for water, oil, and gas systems",
          "Aerodynamics: Analyzing airflow over aircraft wings, vehicles, and structures",
          "Heat Exchangers: Designing efficient heat transfer systems",
          "Chemical Processing: Optimizing mixing and flow in reactors and pipelines",
          "Biomedical Engineering: Understanding blood flow in arteries and medical devices",
          "Environmental Engineering: Modeling water flow in rivers, channels, and treatment systems",
          "HVAC Systems: Designing air and fluid distribution systems",
          "Marine Engineering: Analyzing ship hull resistance and propeller efficiency"
        ]} />
      </SEOSection>

      <SEOSection title="Common Reynolds Number Calculations">
        <h3>Example 1: Water Flow in a Pipe</h3>
        <p>Water (ρ = 1000 kg/m³, μ = 0.001 Pa·s) flows at 2 m/s through a 0.1 m diameter pipe. What is the Reynolds number?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Re = (ρ × v × D) / μ = (1000 × 2 × 0.1) / 0.001 = 200,000</p>
          <p className="text-sm text-gray-600 mt-1">Result: Turbulent flow (Re &gt; 4000)</p>
        </div>

        <h3>Example 2: Air Flow Over a Wing</h3>
        <p>Air (ρ = 1.225 kg/m³, μ = 1.81 × 10⁻⁵ Pa·s) flows at 50 m/s over a wing with chord length 2 m. What is the Reynolds number?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Re = (1.225 × 50 × 2) / (1.81 × 10⁻⁵) = 6,767,955</p>
          <p className="text-sm text-gray-600 mt-1">Result: Turbulent flow (Re &gt; 4000)</p>
        </div>

        <h3>Example 3: Oil Flow in a Small Pipe</h3>
        <p>Oil (ρ = 900 kg/m³, μ = 0.1 Pa·s) flows at 0.5 m/s through a 0.02 m diameter pipe. What is the Reynolds number?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Re = (900 × 0.5 × 0.02) / 0.1 = 90</p>
          <p className="text-sm text-gray-600 mt-1">Result: Laminar flow (Re &lt; 2300)</p>
        </div>

        <h3>Example 4: Calculating Required Velocity</h3>
        <p>For water (ρ = 1000 kg/m³, μ = 0.001 Pa·s) in a 0.05 m pipe, what velocity gives Re = 2000 (transitional flow)?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = (Re × μ) / (ρ × D) = (2000 × 0.001) / (1000 × 0.05) = 0.04 m/s</p>
        </div>
      </SEOSection>

      <SEOSection title="Factors Affecting Reynolds Number">
        <p>
          Several factors influence the Reynolds number and flow regime:
        </p>
        <ul>
          <li><strong>Fluid Properties:</strong> Density and viscosity vary with temperature and pressure</li>
          <li><strong>Flow Velocity:</strong> Higher velocities increase Reynolds number, promoting turbulence</li>
          <li><strong>Characteristic Length:</strong> Larger diameters or lengths increase Reynolds number</li>
          <li><strong>Surface Roughness:</strong> Rough surfaces can trigger turbulence at lower Reynolds numbers</li>
          <li><strong>Entrance Conditions:</strong> Flow development length affects the transition point</li>
          <li><strong>Temperature:</strong> Viscosity changes significantly with temperature, affecting Reynolds number</li>
        </ul>
      </SEOSection>

      <SEOSection title="Reynolds Number in Different Geometries">
        <p>
          The characteristic length (D) depends on the geometry:
        </p>
        <ul>
          <li><strong>Circular Pipe:</strong> D = pipe diameter</li>
          <li><strong>Rectangular Duct:</strong> D = hydraulic diameter = 4 × (cross-sectional area) / (wetted perimeter)</li>
          <li><strong>Flow Over a Plate:</strong> D = length along the flow direction</li>
          <li><strong>Flow Around a Sphere:</strong> D = sphere diameter</li>
          <li><strong>Flow Around a Cylinder:</strong> D = cylinder diameter</li>
        </ul>
        <p>
          For non-circular geometries, the hydraulic diameter is commonly used to maintain consistency with circular pipe correlations.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the Reynolds number and why is it important?",
            answer: "The Reynolds number (Re) is a dimensionless quantity that predicts whether fluid flow will be laminar, transitional, or turbulent. It's calculated as Re = (ρ × v × D) / μ, where ρ is density, v is velocity, D is characteristic length, and μ is dynamic viscosity. It's crucial for designing fluid systems, predicting flow behavior, and optimizing engineering applications."
          },
          {
            question: "What are the Reynolds number thresholds for flow regimes?",
            answer: "For pipe flow, the approximate thresholds are: Laminar flow (Re < 2300), Transitional flow (2300 ≤ Re ≤ 4000), and Turbulent flow (Re > 4000). These values can vary based on pipe roughness, entrance conditions, and other factors. For other geometries, the thresholds may differ."
          },
          {
            question: "How do I calculate Reynolds number?",
            answer: "Use the formula Re = (ρ × v × D) / μ, where you need the fluid density (ρ), flow velocity (v), characteristic length/diameter (D), and dynamic viscosity (μ). Our calculator can solve for any of these variables if you know the other four values."
          },
          {
            question: "What is the difference between dynamic and kinematic viscosity?",
            answer: "Dynamic viscosity (μ) is the absolute viscosity measured in Pa·s, representing a fluid's resistance to flow. Kinematic viscosity (ν) is dynamic viscosity divided by density (ν = μ/ρ), measured in m²/s. The Reynolds number can be written as Re = (v × D) / ν using kinematic viscosity."
          },
          {
            question: "Why does Reynolds number determine flow regime?",
            answer: "Reynolds number represents the ratio of inertial forces (tending to cause turbulence) to viscous forces (tending to dampen turbulence). Low Re means viscous forces dominate (laminar flow), while high Re means inertial forces dominate (turbulent flow). The transition occurs when these forces are balanced."
          },
          {
            question: "Can Reynolds number be negative?",
            answer: "No, Reynolds number is always positive since it's calculated from positive physical quantities (density, velocity, diameter, viscosity). However, in some contexts, negative velocities might be used to indicate reverse flow, but the magnitude of Re would still be positive."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The Reynolds number is fundamental to understanding fluid flow behavior. Our Reynolds Number Calculator simplifies these calculations, making it easy to determine flow regimes and solve for any variable in the Reynolds number equation.
        </p>
        <p>
          Ready to explore more fluid mechanics concepts? Check out our other calculators like the {createInternalLink('flow-rate-calculator', 'Flow Rate Calculator')} for flow rate calculations, or the {createInternalLink('velocity-calculator', 'Velocity Calculator')} for velocity calculations that often complement Reynolds number analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

