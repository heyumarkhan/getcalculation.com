import BernoulliEquationCalculator from '../../../_components/calculators/BernoulliEquationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOFAQ } from '../../../_components/ui/SEOContent';
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
      category="Fluid Mechanics"
      features={[
        "Solve for any variable in Bernoulli's equation",
        "Calculate pressure at any point in fluid flow",
        "Calculate velocity from pressure and height",
        "Calculate height from pressure and velocity",
        "Calculate fluid density from flow parameters",
        "Multiple unit support (Pa, kPa, psi, atm, bar)",
        "Common fluid density reference table",
        "Step-by-step energy conservation analysis"
      ]}
    >
      <SEOSection title="Understanding Bernoulli's Equation">
        <p>
          Bernoulli's equation is a fundamental principle in fluid dynamics that describes the conservation of energy in flowing fluids. Named after Swiss mathematician Daniel Bernoulli (1700-1782), this equation relates pressure, velocity, and elevation in a flowing fluid, demonstrating that total energy remains constant along a streamline.
        </p>
        <p>
          The equation states: <strong>P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂</strong>, where P represents static pressure, ½ρv² represents dynamic pressure (kinetic energy per unit volume), and ρgh represents hydrostatic pressure (potential energy per unit volume). This powerful relationship explains phenomena from airplane lift to the operation of carburetors and venturi meters.
        </p>
        <p>
          Our Bernoulli equation calculator allows you to solve for any variable in the equation—pressure, velocity, height, or even fluid density—making it an essential tool for engineers, students, and professionals working with fluid systems, hydraulics, aerodynamics, and pipeline design.
        </p>
      </SEOSection>

      <SEOSection title="What is Bernoulli's Equation?">
        <p>
          Bernoulli's equation is a mathematical statement of the conservation of energy for flowing fluids. It demonstrates that as fluid velocity increases, pressure decreases, and vice versa. The equation applies to inviscid (frictionless), incompressible flow along a streamline, making it particularly useful for analyzing water flow, air flow around aircraft wings, and fluid transport in pipes.
        </p>
        <p>
          The three terms in Bernoulli's equation represent different forms of energy per unit volume:
        </p>
        <ul>
          <li><strong>Pressure Energy (P):</strong> The static pressure of the fluid, measured in Pascals (Pa). This is the force per unit area exerted by the fluid at rest.</li>
          <li><strong>Kinetic Energy (½ρv²):</strong> The dynamic pressure due to fluid motion, where ρ is density (kg/m³) and v is velocity (m/s). Faster-moving fluids have higher kinetic energy.</li>
          <li><strong>Potential Energy (ρgh):</strong> The hydrostatic pressure due to elevation, where g is gravitational acceleration (9.81 m/s²) and h is height (m). Higher elevations correspond to greater potential energy.</li>
        </ul>
        <p>
          When fluid flows from point 1 to point 2, the sum of these three energy components remains constant (assuming no energy loss to friction or heat). This principle enables us to predict how pressure, velocity, or elevation changes affect the other variables in a fluid system.
        </p>
      </SEOSection>

      <SEOSection title="Bernoulli Equation Formula and Variables">
        <p>
          The complete Bernoulli equation in its most common form is:
        </p>
        <p className="text-center text-xl font-mono my-4">
          P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂ = constant
        </p>
        <p>
          Each variable in this equation has a specific physical meaning:
        </p>
        <ul>
          <li><strong>P (Pressure):</strong> Static pressure measured in Pascals (Pa), kilopascals (kPa), atmospheres (atm), pounds per square inch (psi), or bars. Common values range from atmospheric pressure (~101,325 Pa) to high pressures in hydraulic systems (millions of Pa).</li>
          <li><strong>ρ (Rho - Density):</strong> Fluid density measured in kg/m³. Water has a density of approximately 1000 kg/m³, air at sea level is about 1.2 kg/m³, and mercury is 13,546 kg/m³.</li>
          <li><strong>v (Velocity):</strong> Fluid velocity measured in m/s, km/h, mph, ft/s, or knots. This represents the speed at which the fluid is moving at a specific point.</li>
          <li><strong>g (Gravitational Acceleration):</strong> Constant value of 9.81 m/s² (or 32.2 ft/s² in imperial units), representing Earth's gravitational field strength.</li>
          <li><strong>h (Height/Elevation):</strong> Vertical position measured in meters, feet, centimeters, or inches relative to a reference point. Positive h values are above the reference, negative values are below.</li>
        </ul>
        <p>
          The equation can be rearranged to solve for any unknown variable when the other five are known. Our calculator handles all unit conversions automatically, allowing you to work in your preferred measurement system.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Bernoulli Equation Calculator">
        <p>
          Using our Bernoulli equation calculator is straightforward and requires following these steps:
        </p>
        <ol>
          <li><strong>Select what to solve for:</strong> Choose which variable you want to calculate (P₁, P₂, v₁, v₂, h₁, h₂, or ρ) from the dropdown menu.</li>
          <li><strong>Enter Point 1 parameters:</strong> Input the pressure, velocity, and height at the first point in your fluid system. The field you're solving for will be disabled.</li>
          <li><strong>Enter Point 2 parameters:</strong> Input the pressure, velocity, and height at the second point in your fluid system.</li>
          <li><strong>Set fluid density:</strong> Enter the density of the fluid (default is 1000 kg/m³ for water). A reference table of common fluid densities is provided.</li>
          <li><strong>Select units:</strong> Choose your preferred units for each parameter from the dropdown menus (pressure in Pa/kPa/psi/atm/bar, velocity in m/s/mph/km/h/knots/ft/s, height in m/cm/ft/in/km, density in kg/m³/g/cm³/lb/ft³/lb/in³).</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the unknown variable and display the result with the selected unit.</li>
          <li><strong>Interpret results:</strong> Review the calculated value in the context of your fluid system. Use the Reset button to clear all fields and start a new calculation.</li>
        </ol>
        <p>
          The calculator performs all necessary unit conversions internally, ensuring accurate results regardless of which unit system you choose. It also validates inputs to prevent physically impossible results, such as negative velocity squared values.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Bernoulli's Equation">
        <p>
          Bernoulli's equation has numerous practical applications across engineering, physics, and everyday life:
        </p>
        <ul>
          <li><strong>Aircraft Design and Aerodynamics:</strong> Explains how airplane wings generate lift. Air flowing over the curved upper surface travels faster than air below, creating lower pressure above and higher pressure below, resulting in upward lift force.</li>
          <li><strong>Venturi Meters:</strong> Devices that measure fluid flow rate by creating a constriction in a pipe. As fluid accelerates through the narrow section, pressure drops, and the pressure difference correlates to flow rate.</li>
          <li><strong>Carburetors:</strong> Use Bernoulli's principle to draw fuel into an airstream. Fast-moving air creates low pressure that pulls fuel from the carburetor bowl into the engine.</li>
          <li><strong>Hydraulic Systems:</strong> Design of pipes, pumps, and fluid distribution networks requires understanding how pressure and velocity change with pipe diameter and elevation changes.</li>
          <li><strong>Blood Flow:</strong> Medical applications include understanding blood pressure variations in arteries and veins, particularly in conditions like arterial stenosis (narrowing).</li>
          <li><strong>Spray Bottles and Atomizers:</strong> Squeezing a spray bottle creates fast-moving air that reduces pressure, drawing liquid up through a tube and dispersing it as a spray.</li>
          <li><strong>Pitot Tubes:</strong> Instruments on aircraft that measure airspeed by comparing static pressure to total pressure (static + dynamic).</li>
          <li><strong>Hydroelectric Dams:</strong> Water falling from height (high potential energy) accelerates and can drive turbines, converting potential energy to kinetic energy and then electrical energy.</li>
          <li><strong>HVAC Systems:</strong> Design of air ducts and ventilation systems to ensure proper air flow and pressure distribution throughout buildings.</li>
          <li><strong>Water Distribution:</strong> Municipal water systems use Bernoulli's equation to ensure adequate pressure at all points in the network, accounting for elevation changes and pipe diameter variations.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Bernoulli Equation for Different Scenarios">
        <p>
          While the full Bernoulli equation includes pressure, velocity, and height terms, certain scenarios allow for simplifications:
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Horizontal Flow (h₁ = h₂)</h3>
        <p>
          When fluid flows horizontally with no elevation change, the potential energy terms cancel out, simplifying to: <strong>P₁ + ½ρv₁² = P₂ + ½ρv₂²</strong>. This is common in analyzing flow through horizontal pipes or ducts.
        </p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Flow from a Reservoir (v₁ ≈ 0)</h3>
        <p>
          When fluid flows from a large reservoir where velocity is negligible, the equation reduces to: <strong>P₁ + ρgh₁ = P₂ + ½ρv₂² + ρgh₂</strong>. This applies to water tanks, dams, and gravity-fed systems.
        </p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Static Fluid (v₁ = v₂ = 0)</h3>
        <p>
          For a stationary fluid, Bernoulli's equation reduces to the hydrostatic pressure equation: <strong>P₁ + ρgh₁ = P₂ + ρgh₂</strong>, or <strong>ΔP = ρgΔh</strong>. This describes pressure variation with depth in lakes, oceans, and fluid containers.
        </p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Constant Pressure Flow</h3>
        <p>
          In systems where pressure remains constant (P₁ = P₂), such as open-channel flow exposed to atmosphere, the equation becomes: <strong>½ρv₁² + ρgh₁ = ½ρv₂² + ρgh₂</strong>, relating velocity changes to elevation changes.
        </p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Continuity Equation Connection</h3>
        <p>
          Bernoulli's equation is often used with the continuity equation (A₁v₁ = A₂v₂) for incompressible flow. If pipe area changes from A₁ to A₂, velocity must change inversely, which then affects pressure according to Bernoulli's equation.
        </p>
      </SEOSection>

      <SEOSection title="Limitations and Assumptions of Bernoulli's Equation">
        <p>
          Bernoulli's equation provides excellent results under specific conditions, but it's important to understand its limitations:
        </p>
        <ul>
          <li><strong>Inviscid Flow Assumption:</strong> The equation assumes no viscosity (internal friction) in the fluid. Real fluids have viscosity, which causes energy loss. For highly viscous fluids like honey or motor oil, Bernoulli's equation may be less accurate without correction factors.</li>
          <li><strong>Incompressible Flow:</strong> Assumes constant fluid density. This works well for liquids and low-speed gas flow (Mach number &lt; 0.3). For high-speed gas flow (compressible flow), modified equations accounting for density changes are needed.</li>
          <li><strong>Steady Flow:</strong> Assumes flow conditions don't change with time. Transient or pulsating flows (like in reciprocating pumps) require time-dependent analysis.</li>
          <li><strong>Streamline Flow:</strong> The equation applies along a single streamline. Comparing points on different streamlines requires accounting for energy differences between streamlines.</li>
          <li><strong>No Energy Addition or Removal:</strong> Assumes no pumps, turbines, or heat transfer between the two points. These devices add or remove energy, requiring modified energy equations.</li>
          <li><strong>No Friction Losses:</strong> Pipe friction, bends, valves, and fittings cause energy loss (head loss) not accounted for in the basic equation. Engineers add friction loss terms for practical pipe flow calculations.</li>
          <li><strong>Negligible Shaft Work:</strong> Rotating machinery (pumps, fans, turbines) performs work on or extracts work from the fluid, which must be included as additional terms.</li>
        </ul>
        <p>
          Despite these limitations, Bernoulli's equation provides valuable insights and reasonably accurate results for many engineering applications, especially when combined with empirical correction factors for real-world effects.
        </p>
      </SEOSection>

      <SEOSection title="Bernoulli's Equation vs. Energy Equation">
        <p>
          Bernoulli's equation is a specific case of the more general energy equation for fluid flow. Understanding the relationship helps clarify when to use each:
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Bernoulli's Equation (Ideal Flow)</h3>
        <p>
          Applies to inviscid, incompressible, steady flow with no energy addition: <strong>P/ρg + v²/2g + h = constant</strong> (when divided by ρg to express in "head" form with units of length).
        </p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Extended Energy Equation (Real Flow)</h3>
        <p>
          Includes friction losses, pump work, and turbine work: <strong>P₁/ρg + v₁²/2g + h₁ + H_pump = P₂/ρg + v₂²/2g + h₂ + H_turbine + h_loss</strong>, where H_pump is head added by pumps, H_turbine is head extracted by turbines, and h_loss represents friction and minor losses.
        </p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">When to Use Each</h3>
        <ul>
          <li><strong>Use Bernoulli's Equation:</strong> For quick estimates, conceptual understanding, flow around bodies (airfoils, cars), short pipe sections with minimal friction, and academic problems.</li>
          <li><strong>Use Energy Equation:</strong> For real pipe systems with significant length, systems with pumps or turbines, flows with substantial friction, and detailed engineering design requiring accuracy.</li>
        </ul>
        <p>
          Many engineering textbooks present Bernoulli's equation first for conceptual clarity, then introduce the energy equation with loss terms for practical applications. Our calculator focuses on the ideal Bernoulli equation but can be used as a starting point before applying correction factors for real systems.
        </p>
      </SEOSection>

      <SEOSection title="Common Fluid Densities and Properties">
        <p>
          Accurate density values are essential for Bernoulli calculations. Here are densities of common fluids at standard conditions (20°C, 1 atm unless noted):
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Liquids</h3>
        <ul>
          <li><strong>Water (pure):</strong> 1000 kg/m³ (998 kg/m³ at 20°C, 1000 kg/m³ at 4°C where density is maximum)</li>
          <li><strong>Seawater:</strong> 1025 kg/m³ (varies with salinity and temperature, typically 1020-1030 kg/m³)</li>
          <li><strong>Gasoline:</strong> 720 kg/m³ (varies by grade and additives, typical range 700-750 kg/m³)</li>
          <li><strong>Diesel fuel:</strong> 850 kg/m³ (typically 820-950 kg/m³ depending on grade)</li>
          <li><strong>Motor oil (SAE 30):</strong> 900 kg/m³ (varies with temperature and viscosity grade)</li>
          <li><strong>Mercury:</strong> 13,546 kg/m³ (extremely dense liquid metal used in barometers and manometers)</li>
          <li><strong>Ethanol (alcohol):</strong> 789 kg/m³ (less dense than water, used in fuel blends)</li>
          <li><strong>Glycerin:</strong> 1260 kg/m³ (viscous liquid used in pharmaceuticals and cosmetics)</li>
          <li><strong>Milk:</strong> 1030 kg/m³ (slightly denser than water due to dissolved solids)</li>
          <li><strong>Blood (human):</strong> 1060 kg/m³ (denser than water due to cells and proteins)</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Gases (at 20°C, 1 atm)</h3>
        <ul>
          <li><strong>Air:</strong> 1.2 kg/m³ (varies significantly with temperature and pressure)</li>
          <li><strong>Oxygen (O₂):</strong> 1.33 kg/m³</li>
          <li><strong>Nitrogen (N₂):</strong> 1.17 kg/m³</li>
          <li><strong>Carbon dioxide (CO₂):</strong> 1.84 kg/m³ (denser than air)</li>
          <li><strong>Helium (He):</strong> 0.166 kg/m³ (much lighter than air, used in balloons)</li>
          <li><strong>Hydrogen (H₂):</strong> 0.084 kg/m³ (lightest gas)</li>
        </ul>
        <p>
          Note: Gas densities are highly dependent on temperature and pressure. Use the ideal gas law (ρ = PM/RT) to calculate density at different conditions, where P is pressure, M is molar mass, R is the gas constant, and T is absolute temperature.
        </p>
      </SEOSection>

      <SEOSection title="Practical Examples and Problem Solving">
        <h3 className="text-lg font-semibold mt-4 mb-2">Example 1: Water Flow Through a Pipe</h3>
        <p>
          Water flows through a horizontal pipe that narrows from 10 cm diameter to 5 cm diameter. At the wide section, pressure is 200 kPa and velocity is 2 m/s. Find the pressure in the narrow section.
        </p>
        <p>
          <strong>Solution:</strong> First, use continuity (A₁v₁ = A₂v₂) to find v₂. Since area is proportional to diameter squared, v₂ = v₁(D₁/D₂)² = 2(10/5)² = 8 m/s. Using Bernoulli for horizontal flow: P₁ + ½ρv₁² = P₂ + ½ρv₂². Solving: P₂ = 200,000 + ½(1000)(2² - 8²) = 200,000 - 30,000 = 170,000 Pa = 170 kPa. Pressure decreases as velocity increases.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Example 2: Water Tank Outlet Velocity</h3>
        <p>
          A water tank has water surface at height 10 m above an outlet. Find the velocity of water exiting the outlet (assuming negligible velocity at the surface).
        </p>
        <p>
          <strong>Solution:</strong> Using Bernoulli with P₁ = P₂ = atmospheric pressure, v₁ ≈ 0, h₁ = 10 m, h₂ = 0: ρgh₁ = ½ρv₂². Simplifying: v₂ = √(2gh₁) = √(2 × 9.81 × 10) = 14.0 m/s. This is Torricelli's theorem, a special case of Bernoulli's equation.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Example 3: Airplane Wing Lift</h3>
        <p>
          Air flows over an airplane wing at 100 m/s with pressure 101 kPa. Under the wing, air flows at 90 m/s. Find the pressure difference (air density = 1.2 kg/m³).
        </p>
        <p>
          <strong>Solution:</strong> Using Bernoulli at the same elevation: P_top + ½ρv_top² = P_bottom + ½ρv_bottom². Pressure difference: ΔP = P_bottom - P_top = ½ρ(v_top² - v_bottom²) = ½(1.2)(100² - 90²) = 1140 Pa ≈ 1.14 kPa. This pressure difference creates upward lift force.
        </p>
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          For comprehensive fluid dynamics and physics calculations, explore these related tools:
        </p>
        <ul>
          <li>{createInternalLink('pressure-calculator')} - Calculate pressure using force and area</li>
          <li>{createInternalLink('velocity-calculator')} - Velocity and speed calculations</li>
          <li>{createInternalLink('density-mass-volume-calculator')} - Density, mass, and volume relationships</li>
          <li>{createInternalLink('pipe-flow-calculator')} - Pipe flow and friction loss analysis</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is Bernoulli's equation in simple terms?",
            answer: "Bernoulli's equation states that in flowing fluid, the sum of pressure energy, kinetic energy, and potential energy remains constant. When fluid speeds up (kinetic energy increases), pressure must decrease to maintain constant total energy. This explains why fast-moving fluids have lower pressure than slow-moving fluids."
          },
          {
            question: "What are the three main terms in Bernoulli's equation?",
            answer: "The three terms are: (1) Static pressure (P) - the force per unit area exerted by the fluid, (2) Dynamic pressure (½ρv²) - kinetic energy per unit volume due to fluid motion, and (3) Hydrostatic pressure (ρgh) - potential energy per unit volume due to elevation. Each term has units of pressure (Pa) or energy per unit volume (J/m³)."
          },
          {
            question: "When does Bernoulli's equation not apply?",
            answer: "Bernoulli's equation doesn't apply accurately to: (1) highly viscous fluids where friction is significant, (2) compressible flow (high-speed gases), (3) unsteady or turbulent flow, (4) flows with pumps or turbines between measurement points, (5) flows with significant heat transfer, or (6) comparisons between different streamlines. Real pipe systems require friction loss corrections."
          },
          {
            question: "How is Bernoulli's equation used in airplane wings?",
            answer: "Air flowing over the curved upper surface of a wing travels faster than air flowing under the flatter bottom surface. According to Bernoulli's equation, faster-moving air has lower pressure. The pressure difference (higher pressure below, lower pressure above) creates a net upward force called lift that keeps the airplane airborne."
          },
          {
            question: "What is the difference between static and dynamic pressure?",
            answer: "Static pressure (P) is the actual pressure of the fluid that would be measured by a sensor moving with the fluid. Dynamic pressure (½ρv²) is the kinetic energy per unit volume associated with fluid motion. Total pressure is the sum of static and dynamic pressure. As velocity increases, dynamic pressure increases and static pressure decreases to maintain constant total pressure (in ideal flow)."
          },
          {
            question: "Can Bernoulli's equation be used for gases?",
            answer: "Yes, Bernoulli's equation can be used for gases when flow velocity is low (Mach number < 0.3), so density remains approximately constant. Examples include HVAC systems, low-speed wind tunnels, and ventilation ducts. For high-speed gas flow where density changes significantly (compressible flow), modified equations accounting for gas compressibility must be used instead."
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
