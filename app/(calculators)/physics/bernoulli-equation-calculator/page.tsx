import BernoulliEquationCalculator from '../../../_components/calculators/BernoulliEquationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata = {
  title: 'Bernoulli Equation Calculator - Calculate Pressure, Velocity & Height in Fluid Flow',
  description: 'Calculate pressure, velocity, and height using Bernoulli equation for fluid dynamics. Free Bernoulli equation calculator with multiple units and detailed fluid flow analysis.',
  keywords: [
    'bernoulli equation calculator',
    'bernoulli calculator',
    'fluid dynamics calculator',
    'bernoulli principle calculator',
    'pressure velocity calculator',
    'fluid flow calculator',
    'bernoulli theorem calculator',
    'calculate bernoulli equation',
    'fluid mechanics calculator',
    'bernoulli formula',
    'pressure height calculator',
    'velocity pressure calculator',
    'fluid energy calculator',
    'hydraulic calculator',
    'aerodynamics calculator',
    'pipe flow calculator',
    'venturi calculator',
    'fluid pressure calculator',
    'bernoulli law calculator'
  ],
  openGraph: {
    title: 'Bernoulli Equation Calculator - Fluid Dynamics & Pressure Analysis',
    description: 'Free online Bernoulli equation calculator for fluid flow analysis. Calculate pressure, velocity, and height with multiple unit conversions.',
    type: 'website',
    url: 'https://getcalculation.com/physics/bernoulli-equation-calculator',
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics/bernoulli-equation-calculator',
  },
};

export default function BernoulliEquationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Bernoulli Equation Calculator: Calculate Pressure, Velocity & Height (P + ½ρv² + ρgh)"
      description="Calculate pressure, velocity, and height using Bernoulli equation for fluid dynamics. Free calculator with multiple units for fluid flow analysis."
      calculator={<BernoulliEquationCalculator />}
      slug="physics/bernoulli-equation-calculator"
      category="Physics"
      features={[
        "Calculate pressure, velocity, or height instantly",
        "Solve for any variable in Bernoulli's equation",
        "Multiple unit support (Pa, kPa, psi, m/s, ft)",
        "Instant results with accurate fluid dynamics",
        "Free and easy to use"
      ]}
    >
      <SEOSection title="Why the Bernoulli Equation Calculator Is Essential for Fluid Dynamics">
        <p>
          Every aerospace engineer designing wing profiles, every hydraulic systems technician troubleshooting pressure drops, and every civil engineer analyzing water mains faces the same challenge: understanding how pressure, velocity, and elevation interact in flowing fluids. The Bernoulli equation P + ½ρv² + ρgh = constant is the fundamental relationship that governs energy conservation in fluid flow, explaining why airplane wings generate lift, why narrow pipes have lower pressure than wide pipes, and why water shoots faster from the bottom of a tank than the top. Get the calculation wrong, and your aircraft design might lack sufficient lift at takeoff speed, your hydraulic system might cavitate and fail catastrophically, or your municipal water distribution network might deliver inadequate pressure to upper floors.
        </p>
        <p>
          Bernoulli's principle—discovered by Swiss mathematician Daniel Bernoulli in 1738—states that as fluid {createInternalLink('velocity-calculator', 'velocity')} increases, pressure decreases proportionally to maintain constant total energy along a streamline. This counterintuitive phenomenon is why race cars use ground-effect aerodynamics (fast-moving air underneath creates suction), why spray bottles work (squeeze bulb accelerates air, reducing pressure to draw liquid up a tube), and why venturi meters measure flow rate by detecting pressure changes in pipe constrictions. Industrial applications span everything from designing fuel injectors and carburetors to analyzing {createInternalLink('pipe-flow-calculator', 'pipe flow')} in oil refineries, sizing pumps for irrigation systems, and predicting flood velocities through dam spillways. Our calculator eliminates tedious manual calculations, handles complex unit conversions between metric and imperial systems, and instantly solves for any unknown variable (pressure, velocity, height, or density) when you provide the other parameters—so you can focus on engineering decisions rather than algebraic rearrangements.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select which variable to solve for (pressure P₁ or P₂, velocity v₁ or v₂, height h₁ or h₂, or fluid density ρ) and enter the known values for all other parameters at both point 1 and point 2 in your fluid system.</li>
          <li><strong>Step 2:</strong> Choose your preferred units from the dropdown menus for each parameter (pressure in Pa/kPa/psi/atm/bar, velocity in m/s/mph/km/h/ft/s, height in m/cm/ft/in, density in kg/m³/g/cm³/lb/ft³).</li>
          <li><strong>Step 3:</strong> Click Calculate and review the computed value along with the complete Bernoulli equation showing how energy is conserved between the two points in your fluid flow system.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Bernoulli Equation Calculator Formula">
        <p>
          Bernoulli's equation mathematically expresses energy conservation in flowing fluids through the relationship P + ½ρv² + ρgh = constant along a streamline. The three terms represent pressure energy (P, static pressure in Pascals), kinetic energy (½ρv², dynamic pressure where ρ is density in kg/m³ and v is velocity in m/s), and potential energy (ρgh, hydrostatic pressure where g = 9.81 m/s² is gravitational acceleration and h is elevation in meters). When comparing two points in a fluid system, the equation becomes P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂, meaning if velocity increases at point 2, pressure must decrease proportionally to maintain constant total energy (assuming the same elevation).
        </p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p className="font-semibold text-center">Bernoulli Equation:</p>
          <p className="font-mono text-lg font-bold text-center mt-2">P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where: P = pressure (Pa), ρ = density (kg/m³), v = velocity (m/s), g = 9.81 m/s², h = height (m)</p>
          <p className="text-sm mt-3"><strong>Energy components:</strong></p>
          <p className="text-sm">• Static pressure: P (force per unit area)</p>
          <p className="text-sm">• Dynamic pressure: ½ρv² (kinetic energy per unit volume)</p>
          <p className="text-sm">• Hydrostatic pressure: ρgh (potential energy per unit volume)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Water flows through a horizontal pipe that narrows from 10 cm diameter to 5 cm diameter. At the wide section (point 1), pressure is 200 kPa and velocity is 2 m/s. Calculate the pressure at the narrow section (point 2). Water density ρ = 1000 kg/m³.
        </p>
        <ul>
          <li><strong>Given:</strong> P₁ = 200 kPa = 200,000 Pa, v₁ = 2 m/s, D₁ = 10 cm, D₂ = 5 cm, ρ = 1000 kg/m³, horizontal pipe (h₁ = h₂)</li>
          <li><strong>Step 1 – Find v₂ using continuity equation:</strong> A₁v₁ = A₂v₂, so v₂ = v₁(A₁/A₂) = v₁(D₁/D₂)² = 2 × (10/5)² = 2 × 4 = 8 m/s</li>
          <li><strong>Step 2 – Apply Bernoulli for horizontal flow:</strong> P₁ + ½ρv₁² = P₂ + ½ρv₂² (potential energy terms cancel)</li>
          <li><strong>Step 3 – Solve for P₂:</strong> P₂ = P₁ + ½ρ(v₁² − v₂²) = 200,000 + ½(1000)(2² − 8²)</li>
          <li><strong>Step 4 – Calculate:</strong> P₂ = 200,000 + 500(4 − 64) = 200,000 + 500(−60) = 200,000 − 30,000 = 170,000 Pa</li>
          <li><strong>Result:</strong> Pressure at the narrow section is <strong>170 kPa</strong>, which is 30 kPa lower than at the wide section. This pressure drop occurs because velocity quadrupled (from 2 to 8 m/s) as the pipe area decreased by a factor of 4. The faster-moving water in the narrow section has higher kinetic energy, so static pressure must decrease to conserve total energy. This principle is used in venturi meters to measure flow rate by detecting pressure changes.</li>
        </ul>
      </SEOSection>



      <SEOSection title="Practical Applications">
        <p>The Bernoulli equation is fundamental to analyzing fluid behavior across multiple engineering disciplines and everyday phenomena:</p>
        <SEOList items={[
          "<strong>Aircraft Wing Design & Aerodynamics:</strong> Air flowing over the curved upper wing surface travels faster than air underneath, creating lower pressure above the wing. This pressure difference (Bernoulli effect) generates upward lift force that keeps airplanes airborne and allows for controlled flight at various speeds and altitudes.",
          "<strong>Venturi Meters & Flow Measurement:</strong> Industrial flow meters use pipe constrictions where fluid accelerates and pressure drops predictably. By measuring the pressure difference between the wide and narrow sections, engineers calculate volumetric flow rate for oil pipelines, water treatment plants, and chemical processing.",
          "<strong>Hydraulic & Piping System Design:</strong> Municipal water distribution networks, oil refineries, and irrigation systems require Bernoulli calculations to ensure adequate pressure delivery despite elevation changes, pipe diameter variations, and flow velocity differences throughout the distribution network.",
          "<strong>Carburetors & Fuel Injection Systems:</strong> Internal combustion engines use Bernoulli's principle to atomize fuel: fast-moving air through a venturi creates low pressure that draws liquid fuel from a reservoir, mixing it with air for efficient combustion in the engine cylinders.",
          "<strong>Medical Applications & Cardiovascular Analysis:</strong> Doctors apply Bernoulli's equation to understand blood flow dynamics in arteries and veins, particularly when analyzing stenosis (arterial narrowing) where increased velocity creates pressure drops that can indicate cardiovascular disease severity.",
          "<strong>Spray Bottles, Perfume Atomizers & Paint Guns:</strong> Squeezing the bulb or pressing the trigger accelerates air through a narrow passage, reducing pressure according to Bernoulli's principle. This low-pressure region draws liquid up through a tube and disperses it as fine droplets for even distribution."
        ]} />
      </SEOSection>



      <SEOFAQ
        questions={[
          {
            question: "What is the Bernoulli equation and what does it calculate?",
            answer: "The Bernoulli equation P + ½ρv² + ρgh = constant states that in flowing fluid, the sum of pressure (P), kinetic energy per unit volume (½ρv²), and potential energy per unit volume (ρgh) remains constant along a streamline. It calculates how pressure, velocity, and elevation interact in fluid flow: when velocity increases, pressure decreases proportionally to conserve total energy."
          },
          {
            question: "How do I use the Bernoulli equation to find pressure or velocity?",
            answer: "To find an unknown variable, measure or know the values at two points in your fluid system. For example, to find pressure P₂: rearrange P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂ to get P₂ = P₁ + ½ρ(v₁² − v₂²) + ρg(h₁ − h₂). Plug in known values for density ρ, velocities v₁ and v₂, heights h₁ and h₂, and pressure P₁ to calculate P₂."
          },
          {
            question: "Why does pressure decrease when fluid velocity increases?",
            answer: "Energy conservation requires that total energy (pressure + kinetic + potential) remains constant in ideal fluid flow. When velocity increases, kinetic energy (½ρv²) increases. To maintain constant total energy, static pressure (P) must decrease by an equivalent amount. This is why narrow pipe sections (high velocity) have lower pressure than wide sections (low velocity)."
          },
          {
            question: "What are the limitations of Bernoulli's equation?",
            answer: "Bernoulli's equation assumes inviscid (frictionless) flow, incompressible fluid, steady conditions, and no energy addition/removal. It doesn't account for friction losses in real pipes, viscosity effects, compressible gas flow at high speeds (Mach > 0.3), turbulence, pumps/turbines, or heat transfer. For accurate real-world calculations, engineers add friction loss terms and correction factors."
          },
          {
            question: "How is Bernoulli's equation applied to airplane wings?",
            answer: "Airplane wings are curved on top and flatter below, causing air to flow faster over the upper surface than the lower surface. Bernoulli's equation predicts that faster-moving air (higher velocity v) has lower pressure (P). The pressure difference—higher pressure below, lower pressure above—creates an upward net force (lift) that supports the aircraft's weight during flight."
          }
        ]}
      />

      <SEOSection title="Conclusion">
        <p>
          Mastering the Bernoulli equation is straightforward with the right tools—our calculator handles the complex algebraic rearrangements and unit conversions so you can focus on analyzing fluid behavior and making engineering decisions. Whether you're designing hydraulic systems, analyzing aerodynamic lift, sizing venturi flow meters, or studying fluid mechanics fundamentals, accurate Bernoulli calculations prevent design errors and ensure your systems perform as intended. The ability to quickly solve for any unknown variable (pressure, velocity, height, or density) when given the other parameters makes this tool invaluable for mechanical engineers, aerospace engineers, civil engineers, and physics students.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('flow-rate-calculator', 'Flow Rate Calculator')} for volumetric flow analysis in pipes and channels, or dive into related concepts with the {createInternalLink('density-mass-volume-calculator', 'Density Mass Volume Calculator')} to understand fluid properties that govern Bernoulli equation calculations. Start solving fluid dynamics problems today and unlock precise flow predictions!
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
