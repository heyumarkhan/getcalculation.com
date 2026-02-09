import AbsoluteHumidityCalculator from '../../../_components/calculators/AbsoluteHumidityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function AbsoluteHumidityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Absolute Humidity Calculator - Calculate Water Vapor Content Instantly"
      description="Calculate absolute humidity from temperature and relative humidity. Free physics calculator with instant results for HVAC, meteorology, and atmospheric science."
      calculator={<AbsoluteHumidityCalculator />}
      slug="physics/absolute-humidity-calculator"
      category="Physics"
      features={[
        "Instant absolute humidity calculations",
        "Support for multiple humidity units (g/m³, kg/m³)",
        "Temperature in Celsius, Fahrenheit, or Kelvin",
        "Step-by-step calculation breakdown",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Absolute Humidity Matters">
        <p>
          From designing comfortable indoor spaces to forecasting weather patterns, understanding the actual water vapor content in air is critical. Unlike relative humidity percentages that change with temperature, absolute humidity measures the true mass of water in the air—essential for HVAC engineers, meteorologists, and climate scientists. Our absolute humidity calculator instantly computes water vapor content from temperature and relative humidity, helping you make informed decisions about air quality and system design. For related weather measurements, explore our {createInternalLink('dew-point-calculator')} for thermal energy conversions.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the air temperature in Celsius, Fahrenheit, or Kelvin.</li>
          <li><strong>Step 2:</strong> Input the relative humidity as a percentage (0-100%).</li>
          <li><strong>Step 3:</strong> Click Calculate to instantly see absolute humidity in g/m³ or kg/m³ with detailed calculation steps.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Absolute Humidity Calculator Formula">
        <p>
          Absolute humidity represents the actual mass of water vapor present in a unit volume of air. It depends on temperature and relative humidity—warmer air can hold more water vapor, and higher relative humidity means more moisture is present. This formula combines saturation vapor pressure physics with the ideal gas law to calculate the true water content.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">AH = (RH/100) × (e_s × M_w) / (R × T)</p>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Where: AH = absolute humidity (g/m³), RH = relative humidity (%), e_s = saturation vapor pressure (Pa), M_w = molar mass of water (18.015 g/mol), R = gas constant (8.314 J/(mol·K)), T = temperature (K)
        </p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate absolute humidity when temperature is 25°C and relative humidity is 60%:</p>
        <ul>
          <li>Temperature: 25°C = 298.15 K</li>
          <li>Relative humidity: 60%</li>
          <li>Saturation vapor pressure at 25°C: ≈ 3,169 Pa</li>
          <li>Calculation: AH = (60/100) × (3,169 × 18.015) / (8.314 × 298.15)</li>
          <li>Result: AH ≈ 12.75 g/m³ (comfortable indoor conditions)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Absolute humidity calculations are essential across numerous industries and applications:</p>
        <SEOList items={[
          "HVAC Engineering: Designing ventilation systems and dehumidifiers to maintain optimal indoor air quality and comfort",
          "Weather Forecasting: Understanding atmospheric moisture for precipitation prediction and weather pattern analysis",
          "Agriculture: Managing greenhouse conditions and crop storage to prevent mold and optimize growing environments",
          "Industrial Manufacturing: Controlling humidity in electronics production, food processing, and pharmaceutical facilities",
          "Climate Science: Monitoring water vapor trends and atmospheric changes related to global climate patterns"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is absolute humidity and why does it matter?",
            answer: "Absolute humidity is the actual mass of water vapor in a unit volume of air (measured in g/m³), unlike relative humidity which is a percentage. It matters because it represents the true water content independent of temperature, crucial for HVAC design, dehumidification calculations, and scientific measurements."
          },
          {
            question: "How does absolute humidity differ from relative humidity?",
            answer: "Absolute humidity measures the actual amount of water in the air (g/m³), while relative humidity expresses moisture as a percentage (0-100%) of maximum possible at that temperature. Absolute humidity can stay constant while relative humidity changes with temperature—heating air without adding water decreases relative humidity but not absolute humidity."
          },
          {
            question: "What is the formula for calculating absolute humidity?",
            answer: "AH = (RH/100) × (e_s × M_w) / (R × T), where RH is relative humidity (%), e_s is saturation vapor pressure, M_w is molar mass of water (18.015 g/mol), R is gas constant (8.314 J/(mol·K)), and T is temperature in Kelvin."
          },
          {
            question: "What are typical absolute humidity values for comfort?",
            answer: "Indoor comfort typically occurs at 5-15 g/m³ absolute humidity depending on temperature. At 20°C and 50% relative humidity, absolute humidity is about 8.6 g/m³. Higher values (>15 g/m³) can promote mold growth, while lower values (<5 g/m³) can cause dry skin and respiratory discomfort."
          },
          {
            question: "How does temperature affect absolute humidity?",
            answer: "For a given air mass, absolute humidity remains constant if no water is added or removed, even when temperature changes. However, the maximum possible absolute humidity (at 100% RH) increases exponentially with temperature—warm air can hold much more water vapor than cold air."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering absolute humidity calculations empowers you to design better HVAC systems, forecast weather accurately, and maintain optimal indoor air quality. Our calculator makes these psychrometric calculations instant and accessible.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('relative-humidity-calculator')} for comparative humidity analysis or discover the {createInternalLink('dew-point-calculator')} for additional atmospheric measurements.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

