import CharlesLawCalculator from '../../../_components/calculators/CharlesLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function CharlesLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Charles's Law Calculator: Calculate Volume & Temperature (V₁/T₁ = V₂/T₂)"
      description="Calculate volume or temperature using Charles's Law: V₁/T₁ = V₂/T₂. Free online thermodynamics calculator for ideal gas law calculations with temperature and volume relationships."
      calculator={<CharlesLawCalculator />}
      slug="physics/charles-law-calculator"
      category="Thermodynamics"
      features={[
        "Calculate initial/final volume or temperature",
        "Charles's Law formula: V₁/T₁ = V₂/T₂",
        "Multiple unit support (L, mL, m³, °C, °F, K)",
        "Instant thermodynamics calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Charles's Law: The Temperature-Volume Relationship">
        <p>
          Charles&apos;s Law is one of the fundamental gas laws in thermodynamics, describing how the volume of a gas changes with temperature when pressure remains constant. Named after French scientist Jacques Charles, this law states that for a given amount of gas at constant pressure, volume is directly proportional to absolute temperature (in Kelvin). Whether you&apos;re studying physics, chemistry, engineering, or working with gases, understanding Charles&apos;s Law is essential. Our Charles&apos;s Law Calculator makes it easy to calculate volume or temperature using the formula: <strong>V₁/T₁ = V₂/T₂</strong>.
        </p>
        <p>
          Charles&apos;s Law is part of the ideal gas law family and is crucial for understanding gas behavior. When you heat a gas, its particles move faster and spread out, increasing the volume. When you cool a gas, its particles move slower and come closer together, decreasing the volume. This relationship is linear when temperature is measured in Kelvin, making it perfect for calculations involving gas expansion and compression at constant pressure.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Charles's Law Calculator">
        <p>
          Our Charles&apos;s Law Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Three Values:</strong> Input any three of the four values (initial volume, initial temperature, final volume, or final temperature)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for volume (L, mL, m³, etc.) and temperature (°C, °F, K)</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with automatic unit conversion</li>
        </ol>
        <p>
          The calculator uses Charles&apos;s Law formula: <strong>V₁/T₁ = V₂/T₂</strong>
        </p>
        <p>
          You can rearrange this formula to solve for any variable:
        </p>
        <ul>
          <li><strong>Initial Volume:</strong> V₁ = V₂ × T₁ / T₂</li>
          <li><strong>Final Volume:</strong> V₂ = V₁ × T₂ / T₁</li>
          <li><strong>Initial Temperature:</strong> T₁ = V₁ × T₂ / V₂</li>
          <li><strong>Final Temperature:</strong> T₂ = V₂ × T₁ / V₁</li>
        </ul>
        <p>
          <strong>Important:</strong> All temperature calculations are performed using absolute temperature (Kelvin). The calculator automatically converts between Celsius, Fahrenheit, and Kelvin, but the law requires absolute temperature for accuracy.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Charles's Law Formula">
        <p>
          Charles&apos;s Law is expressed mathematically as:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">V₁/T₁ = V₂/T₂</p>
          <p className="text-sm text-gray-600 mt-2">Where: V = volume, T = absolute temperature (Kelvin), subscripts 1 and 2 refer to initial and final states</p>
        </div>
        
        <h3>What is Charles's Law?</h3>
        <p>
          Charles&apos;s Law states that the volume of a given amount of gas is directly proportional to its absolute temperature when pressure and amount of gas remain constant. This means:
        </p>
        <SEOList items={[
          "As temperature increases, volume increases proportionally",
          "As temperature decreases, volume decreases proportionally",
          "The relationship is linear when temperature is in Kelvin",
          "Pressure must remain constant for the law to apply",
          "The amount of gas (number of moles) must remain constant"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Volume (V):</strong> The space occupied by the gas, measured in liters (L), milliliters (mL), cubic meters (m³), or other volume units</li>
          <li><strong>Temperature (T):</strong> Must be in absolute temperature (Kelvin) for the law to work correctly. The calculator converts from Celsius and Fahrenheit automatically</li>
          <li><strong>Absolute Zero:</strong> The theoretical temperature at which gas volume would be zero (0 K = -273.15°C = -459.67°F)</li>
          <li><strong>Constant Pressure:</strong> The law applies only when pressure remains constant during the temperature change</li>
          <li><strong>Ideal Gas Behavior:</strong> The law is most accurate for ideal gases at low pressures and high temperatures</li>
        </ul>

        <h3>Why Must Temperature Be in Kelvin?</h3>
        <p>
          Charles&apos;s Law requires absolute temperature because the relationship is based on the fact that volume is proportional to kinetic energy. At absolute zero (0 K), particles would theoretically have no motion, so volume would be zero. Using Kelvin ensures the proportionality constant is meaningful. Using Celsius or Fahrenheit would give incorrect results because their zero points don&apos;t correspond to absolute zero.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Charles&apos;s Law calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Hot Air Balloons: Understanding how heating air expands the balloon and creates lift",
          "Automotive: Engine design, understanding gas expansion in cylinders",
          "HVAC Systems: Air conditioning and heating calculations, duct design",
          "Aerospace: Gas behavior at different altitudes and temperatures",
          "Chemistry: Gas reactions, volumetric analysis, stoichiometry",
          "Meteorology: Understanding atmospheric gas behavior with temperature changes",
          "Industrial Processes: Gas storage, compression, and expansion calculations",
          "Food Industry: Understanding gas expansion in packaging and storage",
          "Medical: Respiratory systems, understanding lung volume changes",
          "Engineering: Thermal expansion of gases in systems and pipelines"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports various units for volume and temperature:
        </p>
        
        <h3>Volume Units</h3>
        <ul>
          <li><strong>Liters (L):</strong> Most common unit for gas volume (1 L = 1000 mL = 0.001 m³)</li>
          <li><strong>Milliliters (mL):</strong> Useful for small volumes (1 mL = 0.001 L)</li>
          <li><strong>Cubic Meters (m³):</strong> SI unit for volume (1 m³ = 1000 L)</li>
          <li><strong>Cubic Centimeters (cm³):</strong> Equivalent to milliliters (1 cm³ = 1 mL)</li>
          <li><strong>Cubic Feet (ft³), Cubic Inches (in³):</strong> Imperial units for volume</li>
          <li><strong>Gallons, Quarts, Pints, Fluid Ounces:</strong> US customary volume units</li>
        </ul>

        <h3>Temperature Units</h3>
        <ul>
          <li><strong>Kelvin (K):</strong> Absolute temperature scale, required for Charles&apos;s Law calculations</li>
          <li><strong>Celsius (°C):</strong> Common temperature scale (K = °C + 273.15)</li>
          <li><strong>Fahrenheit (°F):</strong> US temperature scale (K = (°F + 459.67) × 5/9)</li>
        </ul>

        <p>
          <strong>Conversion Formulas:</strong>
        </p>
        <ul>
          <li>Kelvin to Celsius: °C = K - 273.15</li>
          <li>Celsius to Kelvin: K = °C + 273.15</li>
          <li>Fahrenheit to Kelvin: K = (°F + 459.67) × 5/9</li>
          <li>Kelvin to Fahrenheit: °F = K × 9/5 - 459.67</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles all temperature conversions, converting inputs to Kelvin for calculations and then converting results back to your selected unit.
        </p>
      </SEOSection>

      <SEOSection title="Common Charles's Law Calculations">
        <h3>Example 1: Calculating Final Volume</h3>
        <p>A gas occupies 2.0 L at 20°C. What will be its volume at 80°C if pressure remains constant?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V₁ = 2.0 L, T₁ = 20°C = 293.15 K, T₂ = 80°C = 353.15 K</p>
          <p className="font-mono">V₂ = V₁ × T₂ / T₁ = 2.0 L × 353.15 K / 293.15 K = 2.41 L</p>
          <p className="text-sm text-gray-600 mt-1">The gas expands from 2.0 L to 2.41 L as temperature increases</p>
        </div>

        <h3>Example 2: Calculating Final Temperature</h3>
        <p>A gas occupies 500 mL at 25°C. If it is cooled to 250 mL at constant pressure, what is the final temperature?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V₁ = 500 mL, T₁ = 25°C = 298.15 K, V₂ = 250 mL</p>
          <p className="font-mono">T₂ = V₂ × T₁ / V₁ = 250 mL × 298.15 K / 500 mL = 149.08 K = -124.07°C</p>
          <p className="text-sm text-gray-600 mt-1">The gas cools significantly as its volume is halved</p>
        </div>

        <h3>Example 3: Calculating Initial Volume</h3>
        <p>A gas at 100°C has a volume of 3.5 L. What was its initial volume at 0°C if pressure was constant?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T₁ = 0°C = 273.15 K, V₂ = 3.5 L, T₂ = 100°C = 373.15 K</p>
          <p className="font-mono">V₁ = V₂ × T₁ / T₂ = 3.5 L × 273.15 K / 373.15 K = 2.56 L</p>
          <p className="text-sm text-gray-600 mt-1">The gas contracted from 3.5 L to 2.56 L as it cooled</p>
        </div>

        <h3>Example 4: Hot Air Balloon Application</h3>
        <p>Air in a balloon at 20°C occupies 1000 m³. What volume will it occupy when heated to 80°C (typical operating temperature)?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V₁ = 1000 m³, T₁ = 20°C = 293.15 K, T₂ = 80°C = 353.15 K</p>
          <p className="font-mono">V₂ = V₁ × T₂ / T₁ = 1000 m³ × 353.15 K / 293.15 K = 1204.6 m³</p>
          <p className="text-sm text-gray-600 mt-1">The balloon expands by about 20% when heated, creating the lift needed for flight</p>
        </div>
      </SEOSection>

      <SEOSection title="Charles's Law vs. Other Gas Laws">
        <p>
          Charles&apos;s Law is one of several fundamental gas laws. Understanding how they relate helps in comprehensive gas calculations:
        </p>
        <ul>
          <li><strong>Boyle&apos;s Law:</strong> P₁V₁ = P₂V₂ (pressure-volume relationship at constant temperature)</li>
          <li><strong>Charles&apos;s Law:</strong> V₁/T₁ = V₂/T₂ (volume-temperature relationship at constant pressure) - This calculator</li>
          <li><strong>Gay-Lussac&apos;s Law:</strong> P₁/T₁ = P₂/T₂ (pressure-temperature relationship at constant volume)</li>
          <li><strong>Combined Gas Law:</strong> P₁V₁/T₁ = P₂V₂/T₂ (combines Boyle&apos;s, Charles&apos;s, and Gay-Lussac&apos;s laws)</li>
          <li><strong>Ideal Gas Law:</strong> PV = nRT (the most general gas law, where n is moles and R is the gas constant)</li>
        </ul>
        <p>
          Charles&apos;s Law is a special case of the Ideal Gas Law when pressure and amount of gas are constant. It&apos;s essential for understanding how gases behave when only temperature changes.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding Charles&apos;s Law has practical applications in daily life:
        </p>
        <SEOList items={[
          "Hot Air Balloons: Understanding how heating air creates lift",
          "Tire Pressure: Understanding why tire pressure changes with temperature (though pressure also changes, not just volume)",
          "Baking: Understanding how gases in dough expand when heated",
          "Refrigerators: Understanding gas compression and expansion in cooling cycles",
          "Weather: Understanding why warm air rises and expands",
          "Balloons: Understanding why balloons expand in hot weather and contract in cold weather",
          "Engines: Understanding gas expansion in internal combustion engines"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is Charles's Law and when does it apply?",
            answer: "Charles's Law states that the volume of a gas is directly proportional to its absolute temperature when pressure and amount of gas remain constant. It applies to ideal gases when pressure doesn't change during the temperature change. The formula is V₁/T₁ = V₂/T₂, where temperatures must be in Kelvin."
          },
          {
            question: "Why must temperature be in Kelvin for Charles's Law?",
            answer: "Kelvin is the absolute temperature scale where zero represents absolute zero (no molecular motion). Charles's Law is based on the relationship between volume and kinetic energy, which depends on absolute temperature. Using Celsius or Fahrenheit would give incorrect results because their zero points don't correspond to the point where volume would theoretically be zero."
          },
          {
            question: "What happens if pressure changes during the temperature change?",
            answer: "Charles's Law only applies when pressure remains constant. If pressure changes, you need to use the Combined Gas Law (P₁V₁/T₁ = P₂V₂/T₂) or the Ideal Gas Law (PV = nRT) to account for all three variables: pressure, volume, and temperature."
          },
          {
            question: "Can Charles's Law be used for all gases?",
            answer: "Charles's Law is most accurate for ideal gases (gases that follow the ideal gas law perfectly) at low pressures and moderate temperatures. Real gases deviate from ideal behavior, especially at high pressures or very low temperatures, but the law provides good approximations for many practical applications."
          },
          {
            question: "How do I convert between Celsius, Fahrenheit, and Kelvin?",
            answer: "To Kelvin: K = °C + 273.15, or K = (°F + 459.67) × 5/9. From Kelvin: °C = K - 273.15, or °F = K × 9/5 - 459.67. Our calculator automatically handles these conversions, so you can input temperatures in any unit and get results in your preferred unit."
          },
          {
            question: "What is the relationship between volume and temperature in Charles's Law?",
            answer: "Volume and temperature are directly proportional in Charles's Law. This means if you double the absolute temperature (in Kelvin), the volume doubles. If you halve the temperature, the volume halves. The relationship is linear when graphed with temperature in Kelvin on the x-axis and volume on the y-axis."
          },
          {
            question: "Can volume or temperature be zero in Charles's Law?",
            answer: "According to Charles's Law, at absolute zero (0 K), the volume would theoretically be zero. However, this is a theoretical limit - real gases condense to liquids or solids before reaching absolute zero. Volume and temperature must both be greater than zero for practical calculations."
          },
          {
            question: "How is Charles's Law related to the Ideal Gas Law?",
            answer: "Charles's Law is a special case of the Ideal Gas Law (PV = nRT). When pressure (P) and amount of gas (n, number of moles) are constant, the Ideal Gas Law simplifies to V/T = constant, which is Charles's Law. Both laws describe gas behavior, with the Ideal Gas Law being more general."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding Charles&apos;s Law and the relationship between volume and temperature is fundamental to thermodynamics and gas physics. Our Charles&apos;s Law Calculator simplifies these calculations, making it easy to solve problems involving gas expansion and contraction at constant pressure.
        </p>
        <p>
          Whether you&apos;re studying gas laws, designing thermal systems, or understanding everyday phenomena like hot air balloons, this calculator provides accurate results with support for multiple units and automatic temperature conversions. Ready to explore more thermodynamics concepts? Check out our other calculators like the {createInternalLink('specific-heat-calculator')} for heat energy calculations, or use our {createInternalLink('relative-humidity-calculator')} for understanding air properties and humidity relationships.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

