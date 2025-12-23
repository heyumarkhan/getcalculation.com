import WaterViscosityCalculator from '../../../_components/calculators/WaterViscosityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WaterViscosityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Water Viscosity Calculator: Calculate Dynamic & Kinematic Viscosity by Temperature"
      description="Calculate dynamic and kinematic viscosity of water at any temperature using μ = A × 10^(B/(T - C)). Free online fluid mechanics calculator for physics and engineering with temperature-dependent viscosity calculations."
      calculator={<WaterViscosityCalculator />}
      slug="physics/water-viscosity-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate water viscosity from temperature",
        "Dynamic and kinematic viscosity calculations",
        "Temperature input in °C, °F, or K",
        "Multiple viscosity unit support",
        "Temperature-dependent density calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Water Viscosity: Essential Fluid Property">
        <p>
          Viscosity is one of the most important properties in fluid mechanics, describing a fluid&apos;s resistance to flow. For water, viscosity changes significantly with temperature, making it crucial for engineers, physicists, and scientists working with fluid systems. Our Water Viscosity Calculator makes it easy to determine both dynamic and kinematic viscosity of water at any temperature using the empirical correlation: <strong>μ = A × 10^(B/(T - C))</strong>, where A = 2.414×10⁻⁵ Pa·s, B = 247.8 K, C = 140 K, and T is temperature in Kelvin.
        </p>
        <p>
          Understanding water viscosity is essential for designing hydraulic systems, predicting flow behavior, calculating Reynolds numbers, and optimizing engineering applications ranging from plumbing to chemical processing. As temperature increases, water viscosity decreases, which significantly affects flow characteristics in pipes, channels, and industrial processes.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Water Viscosity Calculator">
        <p>
          Our Water Viscosity Calculator is designed for accuracy and ease of use. Follow these steps:
        </p>
        <ol>
          <li><strong>Enter Temperature:</strong> Input the temperature of water in your preferred unit (°C, °F, or K)</li>
          <li><strong>Select Viscosity Units:</strong> Choose your preferred units for dynamic viscosity (Pa·s, cP, P, etc.) and kinematic viscosity (m²/s, cSt, St, etc.)</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute dynamic viscosity, kinematic viscosity, and water density</li>
          <li><strong>View Results:</strong> Results are displayed with step-by-step calculations showing the formulas used</li>
        </ol>
        <p>
          The calculator uses the empirical formula: <strong>μ = 2.414×10⁻⁵ × 10^(247.8/(T - 140))</strong> for dynamic viscosity, where T is temperature in Kelvin. Kinematic viscosity is calculated as <strong>ν = μ / ρ</strong>, where ρ is the temperature-dependent density of water.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Water Viscosity Formulas">
        <p>
          Water viscosity is calculated using empirical correlations based on experimental data:
        </p>
        
        <h3>Dynamic Viscosity Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">μ = A × 10^(B/(T - C))</p>
          <p className="text-sm text-gray-600 mt-2">Where: μ = dynamic viscosity (Pa·s), A = 2.414×10⁻⁵ Pa·s, B = 247.8 K, C = 140 K, T = temperature (Kelvin)</p>
        </div>
        <p>
          This formula accurately predicts water viscosity over a wide temperature range, accounting for the exponential decrease in viscosity as temperature increases.
        </p>

        <h3>Kinematic Viscosity Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">ν = μ / ρ</p>
          <p className="text-sm text-gray-600 mt-2">Where: ν = kinematic viscosity (m²/s), μ = dynamic viscosity, ρ = density (kg/m³)</p>
        </div>
        <p>
          Kinematic viscosity relates dynamic viscosity to fluid density, providing a measure of viscous forces relative to inertial forces in the fluid.
        </p>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Dynamic Viscosity (μ):</strong> Also called absolute viscosity, measures a fluid&apos;s internal resistance to flow. Units include Pa·s, cP (centipoise), and P (poise). Higher values indicate more viscous (thicker) fluids.</li>
          <li><strong>Kinematic Viscosity (ν):</strong> Dynamic viscosity divided by density, measured in m²/s, cSt (centistokes), or St (stokes). Used in flow calculations where density effects are important.</li>
          <li><strong>Temperature Dependence:</strong> Water viscosity decreases approximately 2-3% per degree Celsius increase. At 20°C, water viscosity is about 1.002 mPa·s, while at 100°C it drops to about 0.282 mPa·s.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Temperature Effects on Water Viscosity">
        <p>
          Temperature has a profound effect on water viscosity, with viscosity decreasing as temperature increases:
        </p>
        <ul>
          <li><strong>0°C (32°F):</strong> Dynamic viscosity ≈ 1.792 mPa·s, Kinematic viscosity ≈ 1.792×10⁻⁶ m²/s</li>
          <li><strong>20°C (68°F):</strong> Dynamic viscosity ≈ 1.002 mPa·s, Kinematic viscosity ≈ 1.004×10⁻⁶ m²/s</li>
          <li><strong>40°C (104°F):</strong> Dynamic viscosity ≈ 0.653 mPa·s, Kinematic viscosity ≈ 0.659×10⁻⁶ m²/s</li>
          <li><strong>60°C (140°F):</strong> Dynamic viscosity ≈ 0.467 mPa·s, Kinematic viscosity ≈ 0.477×10⁻⁶ m²/s</li>
          <li><strong>80°C (176°F):</strong> Dynamic viscosity ≈ 0.355 mPa·s, Kinematic viscosity ≈ 0.367×10⁻⁶ m²/s</li>
          <li><strong>100°C (212°F):</strong> Dynamic viscosity ≈ 0.282 mPa·s, Kinematic viscosity ≈ 0.294×10⁻⁶ m²/s</li>
        </ul>
        <p>
          This temperature dependence is critical for understanding flow behavior, as higher temperatures lead to lower viscosity, which affects flow rates, pressure drops, and mixing characteristics.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Water viscosity calculations are essential in numerous engineering and scientific applications:
        </p>
        <SEOList items={[
          "Hydraulic Systems: Designing pumps, pipes, and fluid transport systems with temperature-varying viscosity",
          "Heat Transfer: Calculating convective heat transfer coefficients that depend on fluid viscosity",
          "Chemical Processing: Optimizing mixing, reactions, and flow rates in temperature-controlled processes",
          "Reynolds Number Calculations: Determining flow regimes using viscosity in the Re = (ρ × v × D) / μ formula",
          "Pipe Flow Design: Accounting for temperature-dependent viscosity in pressure drop and flow rate calculations",
          "Cooling Systems: Designing cooling towers, heat exchangers, and HVAC systems",
          "Marine Engineering: Analyzing ship resistance and propeller efficiency affected by water temperature",
          "Environmental Engineering: Modeling water flow in rivers, treatment plants, and natural systems",
          "Medical Applications: Understanding blood flow and drug delivery in temperature-varying environments",
          "Food Processing: Designing pasteurization and sterilization processes where temperature affects fluid properties"
        ]} />
      </SEOSection>

      <SEOSection title="Common Water Viscosity Calculations">
        <h3>Example 1: Room Temperature Water (20°C)</h3>
        <p>Calculate the dynamic and kinematic viscosity of water at 20°C.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 20°C = 293.15 K</p>
          <p className="font-mono">μ = 2.414×10⁻⁵ × 10^(247.8/(293.15 - 140)) = 0.001002 Pa·s = 1.002 mPa·s</p>
          <p className="font-mono">ρ ≈ 998.2 kg/m³</p>
          <p className="font-mono">ν = μ / ρ = 0.001002 / 998.2 = 1.004×10⁻⁶ m²/s = 1.004 cSt</p>
          <p className="text-sm text-gray-600 mt-1">Result: Dynamic viscosity = 1.002 mPa·s, Kinematic viscosity = 1.004 cSt</p>
        </div>

        <h3>Example 2: Hot Water (80°C)</h3>
        <p>Calculate the viscosity of water at 80°C for a heating system design.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 80°C = 353.15 K</p>
          <p className="font-mono">μ = 2.414×10⁻⁵ × 10^(247.8/(353.15 - 140)) = 0.000355 Pa·s = 0.355 mPa·s</p>
          <p className="font-mono">ν = 0.000355 / 971.8 = 0.365×10⁻⁶ m²/s = 0.365 cSt</p>
          <p className="text-sm text-gray-600 mt-1">Result: Viscosity is significantly lower at higher temperatures, affecting flow rates and pressure drops.</p>
        </div>

        <h3>Example 3: Cold Water (5°C)</h3>
        <p>Calculate viscosity for cold water applications.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 5°C = 278.15 K</p>
          <p className="font-mono">μ = 2.414×10⁻⁵ × 10^(247.8/(278.15 - 140)) = 0.001519 Pa·s = 1.519 mPa·s</p>
          <p className="text-sm text-gray-600 mt-1">Result: Cold water has higher viscosity, requiring more pump power for the same flow rate.</p>
        </div>
      </SEOSection>

      <SEOSection title="Dynamic vs. Kinematic Viscosity">
        <p>
          Understanding the difference between dynamic and kinematic viscosity is crucial:
        </p>
        <ul>
          <li><strong>Dynamic Viscosity (μ):</strong>
            <ul className="ml-4 mt-1">
              <li>Measures internal resistance to flow</li>
              <li>Units: Pa·s, cP, P</li>
              <li>Used in shear stress calculations: τ = μ × (dv/dy)</li>
              <li>Independent of fluid density</li>
              <li>Important for force and pressure calculations</li>
            </ul>
          </li>
          <li><strong>Kinematic Viscosity (ν):</strong>
            <ul className="ml-4 mt-1">
              <li>Relates viscosity to density</li>
              <li>Units: m²/s, cSt, St</li>
              <li>Used in Reynolds number: Re = (v × D) / ν</li>
              <li>Accounts for both viscous and inertial effects</li>
              <li>Important for flow regime determination</li>
            </ul>
          </li>
        </ul>
        <p>
          For water, kinematic viscosity is typically used in flow calculations because it naturally incorporates density effects, making it more convenient for engineering applications.
        </p>
      </SEOSection>

      <SEOSection title="Factors Affecting Water Viscosity">
        <p>
          While temperature is the primary factor, several other conditions affect water viscosity:
        </p>
        <ul>
          <li><strong>Temperature:</strong> Primary factor - viscosity decreases exponentially with increasing temperature</li>
          <li><strong>Pressure:</strong> Minor effect for liquids - viscosity increases slightly with pressure, but effect is small for most applications</li>
          <li><strong>Dissolved Substances:</strong> Salts and other solutes can increase viscosity slightly</li>
          <li><strong>Contamination:</strong> Particulates and impurities can affect measured viscosity</li>
          <li><strong>Phase State:</strong> Ice has much higher viscosity than liquid water</li>
        </ul>
        <p>
          For most engineering applications, temperature is the dominant factor, and our calculator focuses on this primary dependency.
        </p>
      </SEOSection>

      <SEOSection title="Water Viscosity in Engineering Design">
        <p>
          Viscosity plays a critical role in engineering design:
        </p>
        <SEOList items={[
          "Pump Selection: Higher viscosity requires more pump power and may affect pump efficiency",
          "Pipe Sizing: Viscosity affects pressure drop calculations using Darcy-Weisbach or Hazen-Williams equations",
          "Heat Exchangers: Viscosity influences convective heat transfer coefficients and flow patterns",
          "Mixing Systems: Viscosity affects mixing time, power requirements, and efficiency",
          "Filtration: Higher viscosity reduces filtration rates and increases backpressure",
          "Fluid Transport: Viscosity directly impacts flow rates and energy consumption",
          "Process Control: Temperature control is often used to manage viscosity in industrial processes"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is water viscosity and why does it matter?",
            answer: "Water viscosity is a measure of water's resistance to flow. It matters because it affects flow rates, pressure drops, pump power requirements, heat transfer, and mixing characteristics. As temperature increases, water viscosity decreases, significantly impacting fluid system performance."
          },
          {
            question: "How does temperature affect water viscosity?",
            answer: "Water viscosity decreases exponentially as temperature increases. At 0°C, viscosity is about 1.792 mPa·s, while at 100°C it drops to about 0.282 mPa·s - a reduction of over 84%. This temperature dependence is crucial for designing systems that operate at different temperatures."
          },
          {
            question: "What is the difference between dynamic and kinematic viscosity?",
            answer: "Dynamic viscosity (μ) measures a fluid's internal resistance to flow and is independent of density. Kinematic viscosity (ν) is dynamic viscosity divided by density (ν = μ/ρ) and accounts for both viscous and inertial effects. Dynamic viscosity is used in force calculations, while kinematic viscosity is commonly used in flow regime analysis and Reynolds number calculations."
          },
          {
            question: "What is the viscosity of water at room temperature?",
            answer: "At 20°C (68°F), water has a dynamic viscosity of approximately 1.002 mPa·s (0.001002 Pa·s) and a kinematic viscosity of about 1.004×10⁻⁶ m²/s (1.004 cSt). These values are commonly used as reference points in engineering calculations."
          },
          {
            question: "How accurate is the water viscosity formula?",
            answer: "The formula μ = A × 10^(B/(T - C)) is accurate to within about 1-2% for temperatures between 0°C and 100°C, which covers most engineering applications. For extremely accurate calculations or temperatures outside this range, more complex correlations or experimental data may be needed."
          },
          {
            question: "Can I use this calculator for other fluids?",
            answer: "No, this calculator is specifically designed for pure water. Other fluids have different viscosity-temperature relationships and require different formulas. For example, oils have much higher viscosities, and their temperature dependence follows different correlations."
          },
          {
            question: "Why is water viscosity important in Reynolds number calculations?",
            answer: "Viscosity is a key component of the Reynolds number formula: Re = (ρ × v × D) / μ. Reynolds number determines whether flow is laminar, transitional, or turbulent. Since water viscosity changes with temperature, the same flow conditions can result in different Reynolds numbers and flow regimes at different temperatures."
          },
          {
            question: "What units are commonly used for water viscosity?",
            answer: "Dynamic viscosity is commonly expressed in mPa·s (millipascal-seconds) or cP (centipoise), where 1 mPa·s = 1 cP. Kinematic viscosity is often given in cSt (centistokes) or m²/s. Our calculator supports multiple units for convenience in different engineering applications."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding water viscosity and its temperature dependence is fundamental to fluid mechanics, hydraulic engineering, and many practical applications. Our Water Viscosity Calculator simplifies these calculations, making it easy to determine both dynamic and kinematic viscosity at any temperature.
        </p>
        <p>
          Whether you&apos;re designing hydraulic systems, calculating Reynolds numbers, optimizing heat transfer processes, or analyzing fluid flow, accurate viscosity values are essential. Ready to explore more fluid mechanics concepts? Check out our other calculators like the {createInternalLink('reynolds-number-calculator', 'Reynolds Number Calculator')} for flow regime analysis, the {createInternalLink('flow-rate-calculator', 'Flow Rate Calculator')} for flow rate calculations, or the {createInternalLink('friction-loss-calculator', 'Friction Loss Calculator')} for pipe flow analysis - all of which use viscosity in their calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

