import GayLussacsLawCalculator from '../../../_components/calculators/GayLussacsLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GayLussacsLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Gay-Lussac's Law Calculator: Calculate Pressure & Temperature (P₁/T₁ = P₂/T₂)"
      description="Calculate pressure or temperature using Gay-Lussac's Law: P₁/T₁ = P₂/T₂. Free online thermodynamics calculator for ideal gas law calculations with pressure and temperature relationships at constant volume."
      calculator={<GayLussacsLawCalculator />}
      slug="physics/gay-lussacs-law-calculator"
      category="Thermodynamics"
      features={[
        "Calculate initial/final pressure or temperature",
        "Gay-Lussac's Law formula: P₁/T₁ = P₂/T₂",
        "Multiple unit support (Pa, atm, psi, °C, °F, K)",
        "Instant thermodynamics calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Gay-Lussac's Law: The Pressure-Temperature Relationship">
        <p>
          Gay-Lussac&apos;s Law is one of the fundamental gas laws in thermodynamics, describing how the pressure of a gas changes with temperature when volume remains constant. Named after French chemist Joseph Louis Gay-Lussac, this law states that for a given amount of gas at constant volume, pressure is directly proportional to absolute temperature (in Kelvin). Whether you&apos;re studying physics, chemistry, engineering, or working with gases, understanding Gay-Lussac&apos;s Law is essential. Our Gay-Lussac&apos;s Law Calculator makes it easy to calculate pressure or temperature using the formula: <strong>P₁/T₁ = P₂/T₂</strong>.
        </p>
        <p>
          Gay-Lussac&apos;s Law is part of the ideal gas law family and is crucial for understanding gas behavior in closed containers. When you heat a gas in a fixed volume, its particles move faster and collide more frequently with the container walls, increasing the pressure. When you cool a gas, its particles move slower and collide less frequently, decreasing the pressure. This relationship is linear when temperature is measured in Kelvin, making it perfect for calculations involving pressure changes at constant volume.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Gay-Lussac's Law Calculator">
        <p>
          Our Gay-Lussac&apos;s Law Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Three Values:</strong> Input any three of the four values (initial pressure, initial temperature, final pressure, or final temperature)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for pressure (Pa, atm, psi, etc.) and temperature (°C, °F, K)</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with automatic unit conversion</li>
        </ol>
        <p>
          The calculator uses Gay-Lussac&apos;s Law formula: <strong>P₁/T₁ = P₂/T₂</strong>
        </p>
        <p>
          You can rearrange this formula to solve for any variable:
        </p>
        <ul>
          <li><strong>Initial Pressure:</strong> P₁ = P₂ × T₁ / T₂</li>
          <li><strong>Final Pressure:</strong> P₂ = P₁ × T₂ / T₁</li>
          <li><strong>Initial Temperature:</strong> T₁ = P₁ × T₂ / P₂</li>
          <li><strong>Final Temperature:</strong> T₂ = P₂ × T₁ / P₁</li>
        </ul>
        <p>
          <strong>Important:</strong> All temperature calculations are performed using absolute temperature (Kelvin). The calculator automatically converts between Celsius, Fahrenheit, and Kelvin, but the law requires absolute temperature for accuracy.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Gay-Lussac's Law Formula">
        <p>
          Gay-Lussac&apos;s Law is expressed mathematically as:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">P₁/T₁ = P₂/T₂</p>
          <p className="text-sm text-gray-600 mt-2">Where: P = pressure, T = absolute temperature (Kelvin), subscripts 1 and 2 refer to initial and final states</p>
        </div>
        
        <h3>What is Gay-Lussac's Law?</h3>
        <p>
          Gay-Lussac&apos;s Law states that the pressure of a given amount of gas is directly proportional to its absolute temperature when volume and amount of gas remain constant. This means:
        </p>
        <SEOList items={[
          "As temperature increases, pressure increases proportionally",
          "As temperature decreases, pressure decreases proportionally",
          "The relationship is linear when temperature is in Kelvin",
          "Volume must remain constant for the law to apply",
          "The amount of gas (number of moles) must remain constant"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Pressure (P):</strong> The force per unit area exerted by the gas on its container, measured in Pascals (Pa), atmospheres (atm), pounds per square inch (psi), or other pressure units</li>
          <li><strong>Temperature (T):</strong> Must be in absolute temperature (Kelvin) for the law to work correctly. The calculator converts from Celsius and Fahrenheit automatically</li>
          <li><strong>Absolute Zero:</strong> The theoretical temperature at which gas pressure would be zero (0 K = -273.15°C = -459.67°F)</li>
          <li><strong>Constant Volume:</strong> The law applies only when volume remains constant during the temperature change</li>
          <li><strong>Ideal Gas Behavior:</strong> The law is most accurate for ideal gases at low pressures and high temperatures</li>
        </ul>

        <h3>Why Must Temperature Be in Kelvin?</h3>
        <p>
          Gay-Lussac&apos;s Law requires absolute temperature because the relationship is based on the fact that pressure is proportional to kinetic energy. At absolute zero (0 K), particles would theoretically have no motion, so pressure would be zero. Using Kelvin ensures the proportionality constant is meaningful. Using Celsius or Fahrenheit would give incorrect results because their zero points don&apos;t correspond to absolute zero.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Gay-Lussac&apos;s Law calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Pressure Cookers: Understanding how heating increases pressure in sealed containers",
          "Automotive: Tire pressure changes with temperature, engine design",
          "Aerospace: Understanding pressure changes in aircraft cabins and fuel systems",
          "Chemistry: Gas reactions in closed vessels, pressure-temperature relationships",
          "HVAC Systems: Understanding pressure changes in refrigeration and air conditioning systems",
          "Industrial Processes: Gas storage tanks, understanding pressure buildup with temperature",
          "Medical: Understanding pressure changes in medical gas cylinders and equipment",
          "Food Industry: Understanding pressure changes in sealed containers during processing",
          "Engineering: Pressure vessel design, understanding thermal expansion effects",
          "Meteorology: Understanding atmospheric pressure relationships with temperature"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports various units for pressure and temperature:
        </p>
        
        <h3>Pressure Units</h3>
        <ul>
          <li><strong>Pascal (Pa):</strong> SI unit for pressure (1 Pa = 1 N/m²)</li>
          <li><strong>Kilopascal (kPa):</strong> Common unit (1 kPa = 1000 Pa)</li>
          <li><strong>Megapascal (MPa):</strong> Used for high pressures (1 MPa = 1,000,000 Pa)</li>
          <li><strong>Atmosphere (atm):</strong> Standard atmospheric pressure (1 atm = 101,325 Pa)</li>
          <li><strong>Pounds per Square Inch (psi):</strong> Common in US engineering (1 psi = 6894.76 Pa)</li>
          <li><strong>Bar:</strong> Metric unit (1 bar = 100,000 Pa)</li>
          <li><strong>Torr and mmHg:</strong> Used in medical and scientific applications (1 torr = 1 mmHg = 133.322 Pa)</li>
        </ul>

        <h3>Temperature Units</h3>
        <ul>
          <li><strong>Kelvin (K):</strong> Absolute temperature scale, required for Gay-Lussac&apos;s Law calculations</li>
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

      <SEOSection title="Common Gay-Lussac's Law Calculations">
        <h3>Example 1: Calculating Final Pressure</h3>
        <p>A gas in a sealed container has a pressure of 1.0 atm at 20°C. What will be its pressure at 80°C if volume remains constant?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P₁ = 1.0 atm, T₁ = 20°C = 293.15 K, T₂ = 80°C = 353.15 K</p>
          <p className="font-mono">P₂ = P₁ × T₂ / T₁ = 1.0 atm × 353.15 K / 293.15 K = 1.20 atm</p>
          <p className="text-sm text-gray-600 mt-1">The pressure increases from 1.0 atm to 1.20 atm as temperature increases</p>
        </div>

        <h3>Example 2: Calculating Final Temperature</h3>
        <p>A gas in a rigid container has a pressure of 2.0 atm at 25°C. If the pressure increases to 3.0 atm at constant volume, what is the final temperature?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P₁ = 2.0 atm, T₁ = 25°C = 298.15 K, P₂ = 3.0 atm</p>
          <p className="font-mono">T₂ = P₂ × T₁ / P₁ = 3.0 atm × 298.15 K / 2.0 atm = 447.23 K = 174.08°C</p>
          <p className="text-sm text-gray-600 mt-1">The temperature increases significantly as pressure increases</p>
        </div>

        <h3>Example 3: Calculating Initial Pressure</h3>
        <p>A gas at 100°C has a pressure of 1.5 atm in a sealed container. What was its initial pressure at 0°C if volume was constant?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T₁ = 0°C = 273.15 K, P₂ = 1.5 atm, T₂ = 100°C = 373.15 K</p>
          <p className="font-mono">P₁ = P₂ × T₁ / T₂ = 1.5 atm × 273.15 K / 373.15 K = 1.10 atm</p>
          <p className="text-sm text-gray-600 mt-1">The pressure decreased from 1.5 atm to 1.10 atm as it cooled</p>
        </div>

        <h3>Example 4: Tire Pressure Application</h3>
        <p>A car tire is inflated to 32 psi at 20°C. What will be the pressure when the tire heats up to 50°C during driving (assuming volume remains approximately constant)?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P₁ = 32 psi, T₁ = 20°C = 293.15 K, T₂ = 50°C = 323.15 K</p>
          <p className="font-mono">P₂ = P₁ × T₂ / T₁ = 32 psi × 323.15 K / 293.15 K = 35.3 psi</p>
          <p className="text-sm text-gray-600 mt-1">The tire pressure increases by about 10% when heated, which is why tire pressure should be checked when tires are cold</p>
        </div>
      </SEOSection>

      <SEOSection title="Gay-Lussac's Law vs. Other Gas Laws">
        <p>
          Gay-Lussac&apos;s Law is one of several fundamental gas laws. Understanding how they relate helps in comprehensive gas calculations:
        </p>
        <ul>
          <li><strong>Boyle&apos;s Law:</strong> P₁V₁ = P₂V₂ (pressure-volume relationship at constant temperature)</li>
          <li><strong>Charles&apos;s Law:</strong> V₁/T₁ = V₂/T₂ (volume-temperature relationship at constant pressure)</li>
          <li><strong>Gay-Lussac&apos;s Law:</strong> P₁/T₁ = P₂/T₂ (pressure-temperature relationship at constant volume) - This calculator</li>
          <li><strong>Combined Gas Law:</strong> P₁V₁/T₁ = P₂V₂/T₂ (combines Boyle&apos;s, Charles&apos;s, and Gay-Lussac&apos;s laws)</li>
          <li><strong>Ideal Gas Law:</strong> PV = nRT (the most general gas law, where n is moles and R is the gas constant)</li>
        </ul>
        <p>
          Gay-Lussac&apos;s Law is a special case of the Ideal Gas Law when volume and amount of gas are constant. It&apos;s essential for understanding how gases behave when only temperature changes in a fixed volume container.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding Gay-Lussac&apos;s Law has practical applications in daily life:
        </p>
        <SEOList items={[
          "Tire Pressure: Understanding why tire pressure changes with temperature (though volume also changes slightly)",
          "Pressure Cookers: Understanding how heating increases pressure in sealed containers",
          "Aerosol Cans: Understanding why cans should not be heated (pressure increases dangerously)",
          "Gas Cylinders: Understanding pressure changes in propane tanks and other gas containers",
          "Weather: Understanding how temperature affects atmospheric pressure",
          "Automotive: Understanding pressure changes in fuel systems and engine components",
          "Medical: Understanding pressure changes in oxygen tanks and medical gas systems"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is Gay-Lussac's Law and when does it apply?",
            answer: "Gay-Lussac's Law states that the pressure of a gas is directly proportional to its absolute temperature when volume and amount of gas remain constant. It applies to ideal gases when volume doesn't change during the temperature change. The formula is P₁/T₁ = P₂/T₂, where temperatures must be in Kelvin."
          },
          {
            question: "Why must temperature be in Kelvin for Gay-Lussac's Law?",
            answer: "Kelvin is the absolute temperature scale where zero represents absolute zero (no molecular motion). Gay-Lussac's Law is based on the relationship between pressure and kinetic energy, which depends on absolute temperature. Using Celsius or Fahrenheit would give incorrect results because their zero points don't correspond to the point where pressure would theoretically be zero."
          },
          {
            question: "What happens if volume changes during the temperature change?",
            answer: "Gay-Lussac's Law only applies when volume remains constant. If volume changes, you need to use the Combined Gas Law (P₁V₁/T₁ = P₂V₂/T₂) or the Ideal Gas Law (PV = nRT) to account for all three variables: pressure, volume, and temperature."
          },
          {
            question: "Can Gay-Lussac's Law be used for all gases?",
            answer: "Gay-Lussac's Law is most accurate for ideal gases (gases that follow the ideal gas law perfectly) at low pressures and moderate temperatures. Real gases deviate from ideal behavior, especially at high pressures or very low temperatures, but the law provides good approximations for many practical applications."
          },
          {
            question: "How do I convert between Celsius, Fahrenheit, and Kelvin?",
            answer: "To Kelvin: K = °C + 273.15, or K = (°F + 459.67) × 5/9. From Kelvin: °C = K - 273.15, or °F = K × 9/5 - 459.67. Our calculator automatically handles these conversions, so you can input temperatures in any unit and get results in your preferred unit."
          },
          {
            question: "What is the relationship between pressure and temperature in Gay-Lussac's Law?",
            answer: "Pressure and temperature are directly proportional in Gay-Lussac's Law. This means if you double the absolute temperature (in Kelvin), the pressure doubles. If you halve the temperature, the pressure halves. The relationship is linear when graphed with temperature in Kelvin on the x-axis and pressure on the y-axis."
          },
          {
            question: "Can pressure or temperature be zero in Gay-Lussac's Law?",
            answer: "According to Gay-Lussac's Law, at absolute zero (0 K), the pressure would theoretically be zero. However, this is a theoretical limit - real gases condense to liquids or solids before reaching absolute zero. Pressure and temperature must both be greater than zero for practical calculations."
          },
          {
            question: "How is Gay-Lussac's Law related to the Ideal Gas Law?",
            answer: "Gay-Lussac's Law is a special case of the Ideal Gas Law (PV = nRT). When volume (V) and amount of gas (n, number of moles) are constant, the Ideal Gas Law simplifies to P/T = constant, which is Gay-Lussac's Law. Both laws describe gas behavior, with the Ideal Gas Law being more general."
          },
          {
            question: "Why does tire pressure increase when driving?",
            answer: "Tire pressure increases when driving primarily due to Gay-Lussac's Law. As the tire heats up from friction and road contact, the temperature of the air inside increases. Since the tire volume is relatively constant, the pressure increases proportionally with temperature. This is why tire pressure should be checked when tires are cold."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding Gay-Lussac&apos;s Law and the relationship between pressure and temperature is fundamental to thermodynamics and gas physics. Our Gay-Lussac&apos;s Law Calculator simplifies these calculations, making it easy to solve problems involving pressure changes at constant volume.
        </p>
        <p>
          Whether you&apos;re studying gas laws, designing pressure systems, or understanding everyday phenomena like tire pressure changes, this calculator provides accurate results with support for multiple units and automatic temperature conversions. Ready to explore more thermodynamics concepts? Check out our other calculators like the {createInternalLink('charles-law-calculator', "Charles's Law Calculator")} for volume-temperature relationships, the {createInternalLink('boyles-law-calculator', "Boyle's Law Calculator")} for pressure-volume relationships, or the {createInternalLink('heat-transfer-calculator', 'Heat Transfer Calculator')} for thermal energy calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

