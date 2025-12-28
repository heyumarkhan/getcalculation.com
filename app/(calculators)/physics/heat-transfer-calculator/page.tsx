import HeatTransferCalculator from '../../../_components/calculators/HeatTransferCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function HeatTransferCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Heat Transfer Calculator: Calculate Conduction, Convection & Radiation"
      description="Calculate heat transfer rate for conduction (Q = k×A×(T₁-T₂)/d), convection (Q = h×A×(T_surface-T_fluid)), or radiation (Q = ε×σ×A×(T₁⁴-T₂⁴)). Free online thermodynamics calculator."
      calculator={<HeatTransferCalculator />}
      slug="physics/heat-transfer-calculator"
      category="Thermodynamics"
      features={[
        "Calculate heat transfer rate for conduction, convection, or radiation",
        "Calculate thermal conductivity, convection coefficient, or emissivity",
        "Multiple calculation modes",
        "Comprehensive unit support",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Heat Transfer: The Three Fundamental Modes">
        <p>
          Heat transfer is one of the most important processes in thermodynamics, engineering, and physics. It describes how thermal energy moves from regions of higher temperature to regions of lower temperature. Whether you&apos;re designing HVAC systems, analyzing thermal performance, or studying thermodynamics, understanding heat transfer is essential. Our Heat Transfer Calculator makes it easy to calculate heat transfer rates for all three fundamental modes: <strong>conduction</strong>, <strong>convection</strong>, and <strong>radiation</strong>.
        </p>
        <p>
          Heat transfer occurs through three distinct mechanisms, each with its own formula and characteristics. Conduction occurs through direct contact in solids, convection involves fluid movement, and radiation transfers energy through electromagnetic waves. Understanding these modes is crucial for thermal design, energy efficiency, and solving practical engineering problems.
        </p>
        <p>
          Our calculator supports all three modes, allowing you to calculate heat transfer rates, thermal properties, and other parameters for each mechanism. Whether you&apos;re analyzing heat flow through a wall, calculating convective heat transfer from a surface, or determining radiative heat exchange, this calculator provides accurate results with comprehensive unit support.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Heat Transfer Calculator">
        <p>
          Our Heat Transfer Calculator supports three modes of heat transfer. Follow these steps:
        </p>
        <ol>
          <li><strong>Select Mode:</strong> Choose Conduction, Convection, or Radiation</li>
          <li><strong>Enter Values:</strong>
            <ul>
              <li>Conduction: Enter 5 of 6 values (Q, k, A, T₁, T₂, d)</li>
              <li>Convection: Enter 4 of 5 values (Q, h, A, T_surface, T_fluid)</li>
              <li>Radiation: Enter 4 of 5 values (Q, ε, A, T₁, T₂)</li>
            </ul>
          </li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding the Three Modes of Heat Transfer">
        <h3>1. Conduction</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Q = k × A × (T₁ - T₂) / d</p>
          <p className="text-sm text-gray-600 mt-2">Where: Q = heat transfer rate, k = thermal conductivity, A = area, T₁-T₂ = temperature difference, d = thickness</p>
        </div>
        <p>
          Conduction is heat transfer through direct contact in solids or stationary fluids. It occurs when molecules vibrate and transfer energy to neighboring molecules. The rate of conduction depends on:
        </p>
        <SEOList items={[
          "Thermal Conductivity (k): Material property indicating how well a material conducts heat",
          "Area (A): Larger areas allow more heat flow",
          "Temperature Difference (T₁ - T₂): Greater differences drive faster heat transfer",
          "Thickness (d): Thicker materials reduce heat flow"
        ]} />
        <p>
          <strong>Examples:</strong> Heat flow through walls, heat transfer in metal rods, thermal conduction in electronic devices
        </p>

        <h3>2. Convection</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Q = h × A × (T_surface - T_fluid)</p>
          <p className="text-sm text-gray-600 mt-2">Where: Q = heat transfer rate, h = convection coefficient, A = area, T_surface - T_fluid = temperature difference</p>
        </div>
        <p>
          Convection is heat transfer through fluid motion (liquids or gases). It combines conduction and fluid flow, making it more complex than pure conduction. The rate depends on:
        </p>
        <SEOList items={[
          "Convection Coefficient (h): Depends on fluid properties, flow velocity, and surface conditions",
          "Area (A): Surface area in contact with the fluid",
          "Temperature Difference: Between surface and bulk fluid temperature",
          "Flow Type: Natural (buoyancy-driven) or forced (pump/fan-driven) convection"
        ]} />
        <p>
          <strong>Examples:</strong> Heat transfer from radiators, cooling of electronic components, heat exchange in heat exchangers
        </p>

        <h3>3. Radiation</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Q = ε × σ × A × (T₁⁴ - T₂⁴)</p>
          <p className="text-sm text-gray-600 mt-2">Where: Q = heat transfer rate, ε = emissivity, σ = Stefan-Boltzmann constant, A = area, T₁⁴-T₂⁴ = temperature difference to fourth power</p>
        </div>
        <p>
          Radiation is heat transfer through electromagnetic waves, requiring no medium. All objects emit and absorb radiation. The rate depends on:
        </p>
        <SEOList items={[
          "Emissivity (ε): Surface property ranging from 0 (perfect reflector) to 1 (perfect blackbody)",
          "Stefan-Boltzmann Constant (σ): 5.670374419 × 10⁻⁸ W/(m²·K⁴)",
          "Area (A): Surface area emitting/absorbing radiation",
          "Temperature to Fourth Power: Very sensitive to temperature - small changes cause large effects"
        ]} />
        <p>
          <strong>Examples:</strong> Solar heating, heat loss from hot surfaces, thermal imaging, space heating
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Heat transfer calculations are essential in numerous fields and applications:
        </p>
        <SEOList items={[
          "HVAC Design: Calculating heating and cooling loads, sizing equipment, designing ductwork",
          "Building Construction: Thermal insulation design, energy efficiency analysis, building codes compliance",
          "Electronics: Heat sink design, thermal management, preventing overheating",
          "Automotive: Engine cooling, cabin heating, brake cooling",
          "Power Generation: Heat exchanger design, boiler efficiency, turbine cooling",
          "Manufacturing: Process heating, material processing, quality control",
          "Aerospace: Thermal protection systems, spacecraft thermal management",
          "Food Industry: Cooking processes, food preservation, thermal processing",
          "Chemical Engineering: Reactor design, distillation, heat recovery",
          "Renewable Energy: Solar thermal systems, geothermal applications"
        ]} />
      </SEOSection>

      <SEOSection title="Common Thermal Properties">
        <h3>Thermal Conductivity Values (k)</h3>
        <ul>
          <li><strong>Metals:</strong> Copper (385 W/(m·K)), Aluminum (205 W/(m·K)), Steel (50 W/(m·K))</li>
          <li><strong>Insulators:</strong> Fiberglass (0.04 W/(m·K)), Polystyrene (0.03 W/(m·K)), Air (0.024 W/(m·K))</li>
          <li><strong>Liquids:</strong> Water (0.6 W/(m·K)), Oil (0.15 W/(m·K))</li>
        </ul>

        <h3>Convection Coefficient Values (h)</h3>
        <ul>
          <li><strong>Natural Convection (Air):</strong> 5-25 W/(m²·K)</li>
          <li><strong>Natural Convection (Water):</strong> 100-1000 W/(m²·K)</li>
          <li><strong>Forced Convection (Air):</strong> 25-250 W/(m²·K)</li>
          <li><strong>Forced Convection (Water):</strong> 500-15,000 W/(m²·K)</li>
        </ul>

        <h3>Emissivity Values (ε)</h3>
        <ul>
          <li><strong>Polished Metals:</strong> 0.02-0.1 (low emissivity, good reflectors)</li>
          <li><strong>Oxidized Metals:</strong> 0.3-0.8 (moderate emissivity)</li>
          <li><strong>Non-metals:</strong> 0.8-0.95 (high emissivity)</li>
          <li><strong>Blackbody:</strong> 1.0 (perfect emitter and absorber)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Heat Transfer Calculations">
        <h3>Example 1: Conduction Through a Wall</h3>
        <p>A wall with thermal conductivity 0.5 W/(m·K), area 10 m², thickness 0.2 m, and temperature difference 20°C. What is the heat transfer rate?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Q = k × A × (T₁ - T₂) / d</p>
          <p className="font-mono">Q = 0.5 W/(m·K) × 10 m² × 20°C / 0.2 m = 500 W</p>
          <p className="text-sm text-gray-600 mt-1">The heat transfer rate is 500 W</p>
        </div>

        <h3>Example 2: Convection from a Surface</h3>
        <p>A surface at 80°C with area 2 m² in air at 20°C. Convection coefficient is 15 W/(m²·K). What is the heat transfer rate?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Q = h × A × (T_surface - T_fluid)</p>
          <p className="font-mono">Q = 15 W/(m²·K) × 2 m² × (80°C - 20°C) = 1,800 W</p>
          <p className="text-sm text-gray-600 mt-1">The heat transfer rate is 1,800 W</p>
        </div>

        <h3>Example 3: Radiation from a Surface</h3>
        <p>A surface at 500 K with emissivity 0.8 and area 1 m² radiating to surroundings at 300 K. What is the heat transfer rate?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Q = ε × σ × A × (T₁⁴ - T₂⁴)</p>
          <p className="font-mono">Q = 0.8 × 5.67×10⁻⁸ W/(m²·K⁴) × 1 m² × (500⁴ - 300⁴) K⁴</p>
          <p className="font-mono">Q = 0.8 × 5.67×10⁻⁸ × 1 × (6.25×10¹⁰ - 8.1×10⁹) = 2,470 W</p>
          <p className="text-sm text-gray-600 mt-1">The heat transfer rate is approximately 2,470 W</p>
        </div>
      </SEOSection>

      <SEOSection title="Factors Affecting Heat Transfer">
        <p>
          Several factors influence heat transfer rates:
        </p>
        <SEOList items={[
          "Temperature Difference: Larger differences drive faster heat transfer",
          "Surface Area: Larger areas allow more heat flow",
          "Material Properties: Thermal conductivity, emissivity, and convection coefficients",
          "Geometry: Shape and orientation affect heat transfer",
          "Flow Conditions: Velocity and turbulence in convection",
          "Surface Conditions: Roughness, coatings, and surface treatments",
          "Environmental Conditions: Ambient temperature, pressure, and humidity"
        ]} />
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding heat transfer has practical applications:
        </p>
        <SEOList items={[
          "Home Insulation: Reducing heat loss through walls and windows",
          "Cooking: Understanding heat transfer in ovens, stoves, and grills",
          "Clothing: Thermal insulation and breathability",
          "Electronics: Preventing overheating in computers and phones",
          "Automotive: Engine cooling and cabin comfort",
          "Energy Efficiency: Reducing heating and cooling costs",
          "Safety: Preventing burns and thermal hazards"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What are the three modes of heat transfer?",
            answer: "The three modes are: (1) Conduction - heat transfer through direct contact in solids, Q = k×A×(T₁-T₂)/d; (2) Convection - heat transfer through fluid motion, Q = h×A×(T_surface-T_fluid); (3) Radiation - heat transfer through electromagnetic waves, Q = ε×σ×A×(T₁⁴-T₂⁴). Each mode has different characteristics and applications."
          },
          {
            question: "How do you calculate heat transfer rate?",
            answer: "The formula depends on the mode: Conduction uses Q = k×A×(T₁-T₂)/d, convection uses Q = h×A×(T_surface-T_fluid), and radiation uses Q = ε×σ×A×(T₁⁴-T₂⁴). Enter the known values and leave one empty to calculate it. Our calculator handles all three modes with automatic unit conversion."
          },
          {
            question: "What is thermal conductivity?",
            answer: "Thermal conductivity (k) is a material property that measures how well a material conducts heat. It's measured in W/(m·K). High thermal conductivity (like metals) means heat flows easily; low thermal conductivity (like insulators) means heat flows slowly. Typical values range from 0.02 W/(m·K) for air to 400 W/(m·K) for copper."
          },
          {
            question: "What is convection coefficient?",
            answer: "The convection coefficient (h) measures the effectiveness of convective heat transfer between a surface and a fluid. It depends on fluid properties, flow velocity, and surface conditions. Values range from about 5 W/(m²·K) for natural convection in air to over 10,000 W/(m²·K) for forced convection in water."
          },
          {
            question: "What is emissivity?",
            answer: "Emissivity (ε) is a surface property ranging from 0 to 1 that describes how well a surface emits and absorbs thermal radiation. A value of 0 means a perfect reflector (no emission), while 1 means a perfect blackbody (maximum emission). Polished metals have low emissivity (0.02-0.1), while most non-metals have high emissivity (0.8-0.95)."
          },
          {
            question: "Why is radiation proportional to T⁴?",
            answer: "Radiation is proportional to the fourth power of temperature (T⁴) due to the Stefan-Boltzmann law. This means small temperature changes cause large changes in radiative heat transfer. For example, doubling the temperature increases radiation by 16 times (2⁴ = 16). This makes radiation dominant at high temperatures."
          },
          {
            question: "Which mode of heat transfer is most important?",
            answer: "The dominant mode depends on the situation: Conduction is important in solids and through walls. Convection dominates in fluids and at surfaces. Radiation becomes important at high temperatures and in vacuum. Often, multiple modes occur simultaneously, and the total heat transfer is the sum of all modes."
          },
          {
            question: "How do I reduce heat transfer?",
            answer: "To reduce heat transfer: Use insulation (low thermal conductivity), reduce surface area, minimize temperature differences, use reflective surfaces (low emissivity) for radiation, and reduce flow velocity for convection. Thermal insulation is the most common method for reducing unwanted heat transfer in buildings and equipment."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding heat transfer and the three fundamental modes (conduction, convection, and radiation) is essential for thermodynamics, thermal engineering, and countless practical applications. Our Heat Transfer Calculator simplifies these calculations, making it easy to determine heat transfer rates, thermal properties, and other parameters for all three modes.
        </p>
        <p>
          Whether you&apos;re designing thermal systems, analyzing energy efficiency, solving physics problems, or simply curious about how heat moves, this calculator provides accurate results with comprehensive unit support. Ready to explore more thermodynamics concepts? Check out our other calculators like the {createInternalLink('specific-heat-calculator', 'Specific Heat Calculator')} for thermal energy calculations, the {createInternalLink('calorimetry-calculator', 'Calorimetry Calculator')} for heat measurement, or the {createInternalLink('dew-point-calculator', 'Dew Point Calculator')} for humidity and thermal comfort analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

