import WaterDensityCalculator from '../../../_components/calculators/WaterDensityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WaterDensityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Water Density Calculator: Calculate Water Density at Any Temperature"
      description="Calculate water density at any temperature using accurate polynomial formulas. Free online physics calculator for fluid mechanics, chemistry, and engineering. Supports multiple temperature and density units."
      calculator={<WaterDensityCalculator />}
      slug="physics/water-density-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate water density from temperature",
        "Support for multiple temperature units (°C, °F, K)",
        "Support for multiple density units (kg/m³, g/cm³, g/L, lb/ft³, lb/gal)",
        "Accurate polynomial formula for 0-100°C",
        "Step-by-step calculation breakdown",
        "Detailed formula explanation",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Water Density: Temperature-Dependent Property">
        <p>
          Water density is a fundamental physical property that varies significantly with temperature, making it essential for calculations in fluid mechanics, chemistry, engineering, and environmental science. Unlike most substances, water exhibits unique behavior: it reaches its maximum density at approximately 4°C (39.2°F), which is why ice floats and why lakes freeze from the top down. Our Water Density Calculator provides accurate calculations of water density at any temperature using polynomial formulas that account for this temperature dependence.
        </p>
        <p>
          Whether you&apos;re designing fluid systems, calculating buoyancy, analyzing thermal expansion, solving chemistry problems, or understanding environmental processes, knowing water density at specific temperatures is crucial. Our calculator supports multiple temperature units (Celsius, Fahrenheit, Kelvin) and density units (kg/m³, g/cm³, g/L, lb/ft³, lb/gal), making it versatile for various applications and measurement systems.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Water Density Calculator">
        <p>
          Our Water Density Calculator is straightforward and user-friendly:
        </p>
        <SEOList ordered items={[
          '<strong>Enter Temperature:</strong> Input the water temperature in your preferred unit - Celsius (°C), Fahrenheit (°F), or Kelvin (K). The calculator automatically converts to Celsius for internal calculations.',
          '<strong>Select Output Unit:</strong> Choose your preferred density unit for the result - kilograms per cubic meter (kg/m³), grams per cubic centimeter (g/cm³), grams per liter (g/L), grams per milliliter (g/mL), pounds per cubic foot (lb/ft³), or pounds per US gallon (lb/gal).',
          '<strong>Calculate:</strong> Click Calculate to get the water density with a detailed step-by-step breakdown showing the polynomial formula used and conversion calculations.',
          '<strong>Review Results:</strong> The result displays the calculated density in your chosen unit, along with comprehensive calculation steps showing the temperature conversion and density calculation process.'
        ]} />
        <p>
          The calculator uses accurate polynomial formulas based on IAPWS (International Association for the Properties of Water and Steam) standards, providing reliable results for temperatures in the liquid water range (0-100°C at standard atmospheric pressure).
        </p>
      </SEOSection>

      <SEOSection title="Water Density Formula Explained">
        <p>
          Water density as a function of temperature is calculated using a polynomial formula:
        </p>

        <SEOFormula
          formula="ρ(T) = 999.83952 + 16.945176×T - 7.9870401×10⁻³×T² - 46.170461×10⁻⁶×T³ + 105.56302×10⁻⁹×T⁴ - 280.54253×10⁻¹²×T⁵"
          description="Where: ρ = Water density (kg/m³), T = Temperature (°C)"
        />

        <p>
          This polynomial formula is derived from empirical data and provides accurate water density values for temperatures between 0°C and 100°C at standard atmospheric pressure. The formula accounts for water&apos;s unique thermal expansion behavior, including the density maximum at approximately 4°C.
        </p>

        <h3>Key Characteristics of Water Density:</h3>
        <SEOList items={[
          '<strong>Maximum Density:</strong> Water reaches its maximum density of approximately 999.972 kg/m³ (or 0.999972 g/cm³) at about 4°C (39.2°F). This is a unique property of water.',
          '<strong>Temperature Range:</strong> The formula is most accurate for liquid water in the range of 0-100°C at standard atmospheric pressure. For ice (below 0°C) or steam (above 100°C), different formulas apply.',
          '<strong>Density Decrease:</strong> As temperature increases from 4°C, water density decreases. As temperature decreases from 4°C toward 0°C, water density also decreases (water expands as it approaches freezing).',
          '<strong>Standard Reference:</strong> At 4°C, water density is very close to 1000 kg/m³ (1 g/cm³), which is often used as a reference value. At 20°C (room temperature), water density is approximately 998.2 kg/m³.',
          '<strong>Pressure Dependency:</strong> The formula assumes standard atmospheric pressure (101.325 kPa). Water density increases slightly with pressure, but this effect is small for most practical applications.',
          '<strong>Impurity Effects:</strong> The formula applies to pure water. Dissolved salts, gases, or other impurities will affect density. Seawater, for example, has higher density due to dissolved salts.'
        ]} />
      </SEOSection>

      <SEOSection title="Water Density at Common Temperatures">
        <p>
          Here are water density values at common temperatures:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left p-2">Temperature</th>
                <th className="text-left p-2">Density (kg/m³)</th>
                <th className="text-left p-2">Density (g/cm³)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="p-2">0°C (32°F) - Freezing Point</td>
                <td className="p-2 font-mono">999.84 kg/m³</td>
                <td className="p-2 font-mono">0.99984 g/cm³</td>
              </tr>
              <tr className="border-b border-gray-200 bg-blue-50">
                <td className="p-2 font-semibold">4°C (39.2°F) - Maximum Density</td>
                <td className="p-2 font-mono font-semibold">999.97 kg/m³</td>
                <td className="p-2 font-mono font-semibold">0.99997 g/cm³</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">10°C (50°F)</td>
                <td className="p-2 font-mono">999.70 kg/m³</td>
                <td className="p-2 font-mono">0.99970 g/cm³</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">20°C (68°F) - Room Temperature</td>
                <td className="p-2 font-mono">998.21 kg/m³</td>
                <td className="p-2 font-mono">0.99821 g/cm³</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">25°C (77°F) - Standard Temperature</td>
                <td className="p-2 font-mono">997.05 kg/m³</td>
                <td className="p-2 font-mono">0.99705 g/cm³</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">50°C (122°F)</td>
                <td className="p-2 font-mono">988.04 kg/m³</td>
                <td className="p-2 font-mono">0.98804 g/cm³</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-2">80°C (176°F)</td>
                <td className="p-2 font-mono">971.80 kg/m³</td>
                <td className="p-2 font-mono">0.97180 g/cm³</td>
              </tr>
              <tr>
                <td className="p-2">100°C (212°F) - Boiling Point</td>
                <td className="p-2 font-mono">958.40 kg/m³</td>
                <td className="p-2 font-mono">0.95840 g/cm³</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Why Water Density Varies with Temperature">
        <p>
          Water density changes with temperature due to thermal expansion and contraction:
        </p>
        <SEOList items={[
          '<strong>Thermal Expansion:</strong> As most substances heat up, they expand and become less dense. Water follows this pattern above 4°C, but exhibits unique behavior below 4°C.',
          '<strong>Maximum Density at 4°C:</strong> Water is densest at approximately 4°C. Below this temperature, water actually expands slightly as it approaches freezing, making ice less dense than liquid water.',
          '<strong>Hydrogen Bonding:</strong> Water\'s unique density behavior is due to hydrogen bonding between water molecules. As temperature changes, the arrangement and spacing of molecules changes, affecting density.',
          '<strong>Ice Formation:</strong> When water freezes at 0°C, it expands significantly, making ice (density ~917 kg/m³) less dense than liquid water. This is why ice floats on water.',
          '<strong>Volume Changes:</strong> Density is inversely related to volume: as water expands (volume increases), density decreases. As water contracts (volume decreases), density increases.',
          '<strong>Practical Implications:</strong> This temperature dependence affects buoyancy calculations, thermal stratification in lakes, and design of systems that handle water at different temperatures.'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications of Water Density Calculations">
        <p>
          Water density calculations are essential in numerous applications:
        </p>
        <SEOList items={[
          '<strong>Buoyancy and Floating:</strong> Calculating whether objects will float or sink in water at different temperatures. Density determines buoyant force using Archimedes\' principle.',
          '<strong>Thermal Stratification:</strong> Understanding how lakes and oceans form layers based on temperature and density. Cold, dense water sinks; warm, less dense water rises.',
          '<strong>Marine Engineering:</strong> Designing ships, submarines, and marine structures. Understanding how water density affects displacement and buoyancy is crucial for stability.',
          '<strong>Chemical Engineering:</strong> Designing processes involving water, calculating mass flow rates, and sizing equipment. Density is needed for converting between mass and volume.',
          '<strong>Environmental Science:</strong> Analyzing water circulation patterns, thermal pollution effects, and ecosystem dynamics in aquatic environments.',
          '<strong>HVAC Systems:</strong> Calculating water properties for heating and cooling systems, heat exchangers, and thermal management.',
          '<strong>Laboratory Work:</strong> Precise density measurements for quality control, calibration, and experimental work in chemistry and physics.',
          '<strong>Water Treatment:</strong> Designing treatment processes, calculating chemical dosing, and understanding flow patterns in treatment facilities.',
          '<strong>Hydrology:</strong> Modeling water flow, understanding density-driven currents, and analyzing water movement in natural and engineered systems.',
          '<strong>Food Industry:</strong> Quality control, recipe formulation, and process design where water content and density are important parameters.'
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Water Density Units and Conversions">
        <p>
          Water density is commonly expressed in different units depending on the application:
        </p>
        <SEOList items={[
          '<strong>kg/m³ (Kilograms per cubic meter):</strong> SI base unit, most common in physics and engineering. At 4°C: ~1000 kg/m³. At 20°C: ~998 kg/m³.',
          '<strong>g/cm³ (Grams per cubic centimeter):</strong> Common in chemistry and materials science. Equal to 1/1000 of kg/m³. At 4°C: ~1.000 g/cm³.',
          '<strong>g/L (Grams per liter):</strong> Common in chemistry laboratories. Numerically equal to kg/m³. At 4°C: ~1000 g/L.',
          '<strong>g/mL (Grams per milliliter):</strong> Equivalent to g/cm³. Common in laboratory measurements.',
          '<strong>lb/ft³ (Pounds per cubic foot):</strong> Used in US engineering applications. At 4°C: ~62.43 lb/ft³. At 20°C: ~62.32 lb/ft³.',
          '<strong>lb/gal (Pounds per US gallon):</strong> Used in some US engineering and industrial applications. At 4°C: ~8.345 lb/gal.',
          '<strong>Conversion Factors:</strong> 1 kg/m³ = 0.001 g/cm³ = 0.001 g/mL = 1 g/L = 0.062428 lb/ft³ = 0.008345 lb/gal'
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the density of water?",
            answer: "Water density varies with temperature. At 4°C (maximum density), water has a density of approximately 999.97 kg/m³ (or 0.99997 g/cm³). At room temperature (20°C), water density is about 998.21 kg/m³. At 100°C (boiling point), water density is about 958.40 kg/m³. The density decreases as temperature increases above 4°C."
          },
          {
            question: "Why is water density maximum at 4°C?",
            answer: "Water reaches its maximum density at approximately 4°C due to hydrogen bonding between water molecules. Below 4°C, water begins to form a more open molecular structure in preparation for freezing, causing slight expansion and density decrease. Above 4°C, thermal expansion reduces density. This unique property is why ice floats and why lakes freeze from the top down."
          },
          {
            question: "How do you calculate water density from temperature?",
            answer: "Water density is calculated using a polynomial formula: ρ(T) = 999.83952 + 16.945176×T - 7.9870401×10⁻³×T² - 46.170461×10⁻⁶×T³ + 105.56302×10⁻⁹×T⁴ - 280.54253×10⁻¹²×T⁵, where T is temperature in Celsius and ρ is density in kg/m³. Our calculator automatically applies this formula and converts between different units."
          },
          {
            question: "What is the density of water at room temperature?",
            answer: "At room temperature (approximately 20°C or 68°F), water has a density of about 998.21 kg/m³ (0.99821 g/cm³ or 0.99821 g/mL). This is slightly less than the maximum density at 4°C due to thermal expansion."
          },
          {
            question: "Does water density change with pressure?",
            answer: "Yes, water density increases slightly with pressure, but the effect is small for most practical applications. The standard density formulas assume atmospheric pressure (101.325 kPa). For very high pressures (deep ocean, industrial processes), pressure effects become more significant and specialized formulas may be needed."
          },
          {
            question: "How does salt affect water density?",
            answer: "Dissolved salts increase water density. Seawater, with about 3.5% salt content, has a density of approximately 1025-1028 kg/m³ at 4°C, compared to pure water's 1000 kg/m³. This is why objects float higher in saltwater than in freshwater. Our calculator provides density for pure water; for saltwater or other solutions, additional corrections are needed."
          },
          {
            question: "What is the density of ice compared to water?",
            answer: "Ice has a lower density than liquid water - approximately 917 kg/m³ compared to about 1000 kg/m³ for liquid water at 0°C. This 9% density difference is why ice floats on water. When water freezes, it expands by about 9%, creating the open crystal structure of ice that makes it less dense."
          },
          {
            question: "How accurate is the water density calculator?",
            answer: "Our calculator uses a polynomial formula based on IAPWS (International Association for the Properties of Water and Steam) standards, providing accuracy within 0.01% for temperatures between 0-100°C at standard atmospheric pressure. For highly precise scientific applications, more specialized formulations may be used, but our calculator is accurate for most practical purposes."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Water density is a temperature-dependent property that is fundamental to understanding fluid behavior, buoyancy, thermal processes, and many engineering applications. Our Water Density Calculator provides accurate, easy-to-use calculations for water density at any temperature, supporting multiple units and providing detailed calculation steps.
        </p>
        <p>
          By understanding how water density varies with temperature, from its maximum at 4°C to lower values at higher temperatures, you can make informed decisions in design, analysis, and problem-solving across many fields. For related calculations, explore our {createInternalLink('water-viscosity-calculator')} for viscosity at different temperatures or our {createInternalLink('buoyancy-calculator')} to understand how density affects floating and sinking.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

