import WetBulbCalculator from '../../../_components/calculators/WetBulbCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WetBulbCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wet Bulb Calculator: Calculate Wet Bulb Temperature from Dry Bulb & Humidity"
      description="Calculate wet bulb temperature from dry bulb temperature and relative humidity using psychrometric formulas. Free online calculator for HVAC, meteorology, and thermal comfort analysis."
      calculator={<WetBulbCalculator />}
      slug="physics/wet-bulb-calculator"
      category="Thermodynamics"
      features={[
        "Calculate wet bulb temperature from dry bulb and relative humidity",
        "Support for Celsius, Fahrenheit, and Kelvin",
        "Instant psychrometric calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wet Bulb Temperature: A Key Concept in Thermodynamics">
        <p>
          Wet bulb temperature is a fundamental concept in thermodynamics, meteorology, and HVAC (Heating, Ventilation, and Air Conditioning) systems. It represents the lowest temperature that can be achieved by evaporating water into the air at constant pressure. Our Wet Bulb Calculator makes it easy to calculate wet bulb temperature from dry bulb temperature and relative humidity using established psychrometric formulas.
        </p>
        <p>
          The wet bulb temperature is always lower than or equal to the dry bulb temperature (ambient air temperature). The difference between these temperatures depends on the relative humidity: when humidity is 100%, the wet bulb and dry bulb temperatures are equal. As humidity decreases, the wet bulb temperature becomes lower, indicating the air&apos;s capacity to absorb moisture through evaporation.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Wet Bulb Calculator">
        <p>
          Our Wet Bulb Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Dry Bulb Temperature:</strong> Input the ambient air temperature (the temperature you would read on a standard thermometer)</li>
          <li><strong>Enter Relative Humidity:</strong> Input the relative humidity as a percentage (0-100%)</li>
          <li><strong>Select Temperature Unit:</strong> Choose your preferred unit (°C, °F, or K)</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the wet bulb temperature</li>
        </ol>
        <p>
          The calculator uses Stull&apos;s psychrometric formula, which provides accurate results for most practical applications in HVAC, meteorology, and thermal comfort analysis.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Wet Bulb Temperature Formula">
        <p>
          The wet bulb temperature is calculated using psychrometric relationships that account for the interaction between temperature, humidity, and evaporation. The formula used in our calculator is based on Stull&apos;s approximation:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">Tw ≈ T × arctan(0.151977 × √(RH + 8.313659)) + arctan(T + RH) - arctan(RH - 1.676331) + 0.00391838 × RH^(3/2) × arctan(0.023101 × RH) - 4.686035</p>
          <p className="text-sm text-gray-600 mt-2">Where: Tw = Wet Bulb Temperature, T = Dry Bulb Temperature, RH = Relative Humidity (%)</p>
        </div>
        <p>
          This formula provides accurate results for temperatures ranging from -50°C to 60°C and relative humidity from 0% to 100%, making it suitable for most real-world applications.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>Wet bulb temperature calculations are essential in numerous fields and applications:</p>
        <SEOList items={[
          "HVAC Systems: Designing and optimizing air conditioning and heating systems for energy efficiency",
          "Meteorology: Understanding weather patterns, heat waves, and climate conditions",
          "Thermal Comfort: Assessing human comfort levels in indoor and outdoor environments",
          "Industrial Processes: Controlling humidity and temperature in manufacturing and storage facilities",
          "Agriculture: Managing greenhouse environments and crop storage conditions",
          "Sports and Safety: Evaluating heat stress and determining safe conditions for outdoor activities",
          "Energy Efficiency: Optimizing cooling tower performance and evaporative cooling systems"
        ]} />
      </SEOSection>

      <SEOSection title="Wet Bulb vs. Dry Bulb vs. Dew Point">
        <p>Understanding the relationship between different temperature measurements is crucial:</p>
        <ul>
          <li><strong>Dry Bulb Temperature:</strong> The ambient air temperature measured by a standard thermometer. This is the temperature you typically see in weather reports.</li>
          <li><strong>Wet Bulb Temperature:</strong> The lowest temperature achievable through evaporative cooling. It&apos;s always less than or equal to the dry bulb temperature.</li>
          <li><strong>Dew Point Temperature:</strong> The temperature at which air becomes saturated and condensation begins. It&apos;s always less than or equal to the wet bulb temperature.</li>
        </ul>
        <p>
          The relationship is: <strong>Dry Bulb ≥ Wet Bulb ≥ Dew Point</strong>. When relative humidity is 100%, all three temperatures are equal.
        </p>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>Our calculator supports multiple temperature units for your convenience:</p>
        <ul>
          <li><strong>Celsius (°C):</strong> The standard metric unit, commonly used in scientific and international applications</li>
          <li><strong>Fahrenheit (°F):</strong> Commonly used in the United States for weather and HVAC applications</li>
          <li><strong>Kelvin (K):</strong> The absolute temperature scale used in scientific calculations</li>
        </ul>
        <p>
          <strong>Relative Humidity:</strong> Always entered as a percentage (0-100%). A value of 0% means completely dry air, while 100% means the air is fully saturated with water vapor.
        </p>
      </SEOSection>

      <SEOSection title="Common Wet Bulb Temperature Calculations">
        <h3>Example 1: Comfortable Indoor Environment</h3>
        <p>Calculate the wet bulb temperature for a room at 25°C with 50% relative humidity:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Dry Bulb: 25°C, RH: 50%</p>
          <p className="font-mono">Wet Bulb: ~18.5°C</p>
          <p className="text-sm text-gray-600 mt-2">This indicates comfortable conditions with good evaporative cooling potential.</p>
        </div>

        <h3>Example 2: Hot and Humid Conditions</h3>
        <p>Calculate the wet bulb temperature for outdoor conditions at 35°C with 80% relative humidity:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Dry Bulb: 35°C, RH: 80%</p>
          <p className="font-mono">Wet Bulb: ~32.5°C</p>
          <p className="text-sm text-gray-600 mt-2">High wet bulb temperature indicates limited cooling potential and potential heat stress.</p>
        </div>

        <h3>Example 3: Dry Desert Conditions</h3>
        <p>Calculate the wet bulb temperature for desert conditions at 40°C with 20% relative humidity:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Dry Bulb: 40°C, RH: 20%</p>
          <p className="font-mono">Wet Bulb: ~24°C</p>
          <p className="text-sm text-gray-600 mt-2">Low humidity allows significant evaporative cooling, making the wet bulb much lower than dry bulb.</p>
        </div>
      </SEOSection>

      <SEOSection title="Heat Stress and Safety Considerations">
        <p>
          Wet bulb temperature is critical for assessing heat stress and safety conditions. The wet bulb globe temperature (WBGT) index, which incorporates wet bulb temperature, is used to determine safe working conditions:
        </p>
        <ul>
          <li><strong>Low Risk (&lt; 25°C WBGT):</strong> Normal activities can proceed with standard precautions</li>
          <li><strong>Moderate Risk (25-28°C WBGT):</strong> Increased rest periods and hydration required</li>
          <li><strong>High Risk (28-31°C WBGT):</strong> Strenuous activities should be limited, frequent breaks necessary</li>
          <li><strong>Extreme Risk (&gt; 31°C WBGT):</strong> Outdoor activities should be suspended or moved indoors</li>
        </ul>
        <p>
          Understanding wet bulb temperature helps prevent heat-related illnesses and ensures safe working and living conditions.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between wet bulb and dry bulb temperature?",
            answer: "Dry bulb temperature is the ambient air temperature measured by a standard thermometer. Wet bulb temperature is the lowest temperature achievable through evaporative cooling and is always less than or equal to the dry bulb temperature. The difference indicates the air's capacity to absorb moisture."
          },
          {
            question: "Why is wet bulb temperature important?",
            answer: "Wet bulb temperature is crucial for HVAC system design, thermal comfort assessment, heat stress evaluation, and understanding the cooling potential of air. It helps determine how effectively evaporative cooling can work in a given environment."
          },
          {
            question: "Can wet bulb temperature be higher than dry bulb temperature?",
            answer: "No, wet bulb temperature is always less than or equal to dry bulb temperature. When relative humidity is 100%, they are equal. As humidity decreases, the wet bulb temperature becomes lower than the dry bulb temperature."
          },
          {
            question: "What is a dangerous wet bulb temperature?",
            answer: "Wet bulb temperatures above 35°C (95°F) are considered extremely dangerous as they approach the human body's core temperature, making it difficult for the body to cool itself through sweating. Prolonged exposure can lead to heat stroke and death."
          },
          {
            question: "How does wet bulb temperature relate to air conditioning?",
            answer: "Air conditioning systems use the difference between dry bulb and wet bulb temperatures to determine cooling capacity. A larger difference indicates more cooling potential. HVAC engineers use wet bulb temperature to size cooling equipment and optimize energy efficiency."
          },
          {
            question: "What units should I use for wet bulb temperature calculations?",
            answer: "You can use Celsius (°C), Fahrenheit (°F), or Kelvin (K). The calculator automatically handles conversions. Celsius is most common in scientific applications, while Fahrenheit is often used in HVAC and weather reporting in the United States."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding and calculating wet bulb temperature is essential for anyone working with HVAC systems, meteorology, thermal comfort, or heat stress assessment. Our Wet Bulb Calculator simplifies these complex psychrometric calculations, making it easy to determine wet bulb temperature from dry bulb temperature and relative humidity.
        </p>
        <p>
          Whether you&apos;re designing an HVAC system, assessing thermal comfort, or evaluating safety conditions, accurate wet bulb temperature calculations are crucial. Explore our other physics calculators, such as our {createInternalLink('velocity-calculator', 'Velocity Calculator')} or {createInternalLink('acceleration-calculator', 'Acceleration Calculator')}, for more physics calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

