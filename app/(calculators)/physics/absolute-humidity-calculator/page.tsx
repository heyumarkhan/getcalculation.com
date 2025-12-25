import AbsoluteHumidityCalculator from '../../../_components/calculators/AbsoluteHumidityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function AbsoluteHumidityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Absolute Humidity Calculator: Calculate Absolute Humidity from Temperature & RH"
      description="Calculate absolute humidity, temperature, or relative humidity using psychrometric formulas. Free online physics calculator for HVAC, meteorology, and atmospheric science."
      calculator={<AbsoluteHumidityCalculator />}
      slug="physics/absolute-humidity-calculator"
      category="Thermodynamics"
      features={[
        "Calculate absolute humidity from temperature and relative humidity",
        "Calculate temperature from absolute humidity and relative humidity",
        "Calculate relative humidity from absolute humidity and temperature",
        "Multiple unit support (g/m³, kg/m³, g/kg)",
        "Temperature in °C, °F, or Kelvin",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Absolute Humidity: The Actual Water Vapor Content">
        <p>
          Absolute humidity is a fundamental measure in atmospheric science and HVAC engineering, representing the actual mass of water vapor present in a unit volume of air. Unlike relative humidity, which expresses moisture content as a percentage of the maximum possible at a given temperature, absolute humidity provides an absolute measure that is independent of temperature. Understanding absolute humidity is crucial for applications ranging from weather forecasting and climate science to HVAC system design and indoor air quality management.
        </p>
        <p>
          Our Absolute Humidity Calculator simplifies these complex psychrometric calculations, allowing you to determine absolute humidity, temperature, or relative humidity when you know the other two variables. The calculator uses the Magnus formula for saturation vapor pressure and the ideal gas law to provide accurate results with comprehensive unit support and detailed step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Absolute Humidity Calculator">
        <p>
          Our Absolute Humidity Calculator offers three calculation modes:
        </p>
        <ol>
          <li><strong>Calculate Absolute Humidity:</strong> Enter temperature and relative humidity. The calculator determines the absolute humidity (mass of water vapor per unit volume).</li>
          <li><strong>Calculate Temperature:</strong> Enter absolute humidity and relative humidity. The calculator uses an iterative method to determine the temperature.</li>
          <li><strong>Calculate Relative Humidity:</strong> Enter absolute humidity and temperature. The calculator determines the relative humidity percentage.</li>
        </ol>
        <p>
          Select your calculation mode, enter the known values with your preferred units, and click Calculate to get instant results with detailed step-by-step solutions. The calculator supports multiple units for absolute humidity (g/m³, kg/m³, g/kg) and temperature (°C, °F, K).
        </p>
      </SEOSection>

      <SEOSection title="The Absolute Humidity Formula Explained">
        <p>
          The fundamental formula for calculating absolute humidity derives from the ideal gas law and psychrometric relationships:
        </p>
        <SEOFormula
          formula="AH = (RH/100) × (e_s × M_w) / (R × T)"
          description="Where: AH = Absolute Humidity, RH = Relative Humidity (%), e_s = Saturation Vapor Pressure, M_w = Molar Mass of Water (18.01528 g/mol), R = Gas Constant (8.314462618 J/(mol·K)), T = Temperature (Kelvin)"
        />

        <h3>Components of the Absolute Humidity Formula:</h3>
        <SEOList items={[
          "<strong>Absolute Humidity (AH):</strong> The mass of water vapor per unit volume of air, typically expressed in g/m³ (grams per cubic meter). This is the actual amount of water in the air, not a percentage.",
          "<strong>Relative Humidity (RH):</strong> The ratio of the current water vapor pressure to the saturation vapor pressure, expressed as a percentage (0-100%). At 100% RH, the air is saturated with water vapor.",
          "<strong>Saturation Vapor Pressure (e_s):</strong> The maximum vapor pressure of water at a given temperature. This increases exponentially with temperature and is calculated using the Magnus formula: e_s = 611.2 × exp((17.67 × T) / (T + 243.5)), where T is in Celsius and the result is in Pascals.",
          "<strong>Molar Mass of Water (M_w):</strong> 18.01528 g/mol - the molecular weight of water vapor.",
          "<strong>Gas Constant (R):</strong> 8.314462618 J/(mol·K) - the universal gas constant used in the ideal gas law.",
          "<strong>Temperature (T):</strong> The air temperature in Kelvin. The absolute humidity is inversely proportional to temperature when relative humidity is constant."
        ]} />

        <h3>Rearranging the Formula:</h3>
        <p>You can rearrange the absolute humidity formula to solve for different variables:</p>
        <ul>
          <li><strong>Absolute Humidity:</strong> AH = (RH/100) × (e_s × M_w) / (R × T)</li>
          <li><strong>Relative Humidity:</strong> RH = (AH × R × T) / (e_s × M_w) × 100</li>
          <li><strong>Temperature:</strong> Solved iteratively (requires numerical methods as temperature appears in both e_s and T terms)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications of Absolute Humidity Calculations">
        <p>
          Absolute humidity calculations are essential in numerous fields and applications:
        </p>
        <SEOList items={[
          "<strong>HVAC Engineering:</strong> Designing heating, ventilation, and air conditioning systems to control indoor air quality and comfort. Absolute humidity helps determine dehumidification requirements.",
          "<strong>Meteorology and Weather Forecasting:</strong> Understanding atmospheric moisture content, cloud formation, and precipitation potential. Weather models use absolute humidity data extensively.",
          "<strong>Indoor Air Quality Management:</strong> Maintaining healthy humidity levels in buildings. High absolute humidity can promote mold growth, while low levels can cause discomfort and health issues.",
          "<strong>Agriculture:</strong> Managing greenhouse environments and crop storage conditions. Optimal absolute humidity levels vary by crop type.",
          "<strong>Industrial Processes:</strong> Controlling humidity in manufacturing processes, food processing, pharmaceutical production, and material storage.",
          "<strong>Aviation:</strong> Understanding atmospheric conditions for flight safety. High absolute humidity at altitude can affect aircraft performance.",
          "<strong>Health and Medicine:</strong> Maintaining appropriate humidity levels in hospitals, laboratories, and respiratory therapy equipment.",
          "<strong>Climate Science:</strong> Studying long-term humidity trends and their relationship to climate change and global warming."
        ]} />
      </SEOSection>

      <SEOSection title="Absolute Humidity vs. Relative Humidity">
        <p>
          Understanding the difference between absolute and relative humidity is crucial:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Aspect</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Absolute Humidity</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Relative Humidity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Definition</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Mass of water vapor per unit volume (g/m³)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Percentage of saturation (0-100%)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Temperature Dependency</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Can remain constant as temperature changes (if no water is added/removed)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Changes significantly with temperature (even if water content is constant)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Typical Range</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">0-30 g/m³ (depends on temperature)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">0-100%</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Use Cases</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Scientific measurements, HVAC design, mass balance calculations</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Weather reports, comfort indicators, general understanding</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          <strong>Key Insight:</strong> If you have air at 25°C with 50% relative humidity, heating it to 30°C without adding or removing water will decrease the relative humidity (since the saturation vapor pressure increases), but the absolute humidity remains constant.
        </p>
      </SEOSection>

      <SEOSection title="Typical Absolute Humidity Values">
        <p>
          Understanding typical absolute humidity ranges helps put calculations in context:
        </p>
        <SEOList items={[
          "<strong>Cold Conditions (0-10°C):</strong> Typically 0-5 g/m³. Cold air holds very little moisture.",
          "<strong>Moderate Conditions (10-20°C):</strong> Typically 5-12 g/m³. Comfortable indoor conditions usually fall in this range.",
          "<strong>Warm Conditions (20-30°C):</strong> Typically 12-25 g/m³. Higher temperatures allow more moisture in the air.",
          "<strong>Hot/Humid Conditions (30-40°C):</strong> Can reach 25-35 g/m³. Tropical climates often experience these high values.",
          "<strong>Desert Conditions:</strong> Very low absolute humidity (often &lt;5 g/m³) despite high temperatures, because the air has very little water vapor.",
          "<strong>Saturated Air (100% RH):</strong> The maximum possible absolute humidity at any temperature, equal to (e_s × M_w) / (R × T). At 20°C, this is approximately 17.3 g/m³."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is absolute humidity?",
            answer: "Absolute humidity is the actual mass of water vapor present in a unit volume of air, typically measured in grams per cubic meter (g/m³). Unlike relative humidity, it is an absolute measure that doesn't depend on temperature for interpretation."
          },
          {
            question: "How is absolute humidity different from relative humidity?",
            answer: "Absolute humidity measures the actual amount of water vapor in the air (g/m³), while relative humidity is a percentage (0-100%) representing how much water vapor is present relative to the maximum possible at that temperature. Absolute humidity can remain constant while relative humidity changes with temperature."
          },
          {
            question: "What is the formula for absolute humidity?",
            answer: "Absolute humidity (AH) = (RH/100) × (e_s × M_w) / (R × T), where RH is relative humidity (%), e_s is saturation vapor pressure, M_w is the molar mass of water (18.01528 g/mol), R is the gas constant (8.314462618 J/(mol·K)), and T is temperature in Kelvin."
          },
          {
            question: "How does temperature affect absolute humidity?",
            answer: "For a given air mass, absolute humidity can remain constant as temperature changes (if no water is added or removed). However, the maximum possible absolute humidity (at 100% relative humidity) increases dramatically with temperature. Warmer air can hold much more water vapor than colder air."
          },
          {
            question: "What is a typical absolute humidity value?",
            answer: "Typical values range from 0-5 g/m³ in cold conditions to 25-35 g/m³ in hot, humid conditions. Indoor comfort typically occurs at 5-15 g/m³, depending on temperature. The maximum possible absolute humidity at 20°C (68°F) is approximately 17.3 g/m³."
          },
          {
            question: "Why is absolute humidity important in HVAC?",
            answer: "HVAC engineers use absolute humidity to calculate dehumidification requirements, determine equipment sizing, and ensure proper indoor air quality. It helps in designing systems that remove a specific mass of water per hour, which is more practical than working with relative humidity percentages."
          },
          {
            question: "Can absolute humidity exceed 100%?",
            answer: "No, but this question reveals a common confusion. Absolute humidity is measured in g/m³ and has no upper percentage limit (though it does have a physical maximum based on temperature). The 0-100% range applies to relative humidity. At 100% relative humidity, absolute humidity is at its maximum possible value for that temperature."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Absolute humidity is a fundamental parameter in atmospheric science, HVAC engineering, and environmental control. Our Absolute Humidity Calculator provides a powerful and accurate tool for determining absolute humidity, temperature, or relative humidity using established psychrometric formulas.
        </p>
        <p>
          By simplifying complex calculations and offering comprehensive unit support with detailed step-by-step solutions, this calculator empowers professionals and students to make informed decisions about air quality, comfort, and system design. For related calculations, explore our {createInternalLink('relative-humidity-calculator')} for relative humidity conversions, or our {createInternalLink('wet-bulb-calculator')} for additional psychrometric properties.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

