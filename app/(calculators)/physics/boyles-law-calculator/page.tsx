import BoylesLawCalculator from '../../../_components/calculators/BoylesLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function BoylesLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Boyle's Law Calculator: Calculate Pressure & Volume (P₁V₁ = P₂V₂)"
      description="Calculate pressure or volume using Boyle's Law: P₁V₁ = P₂V₂. Free online thermodynamics calculator for ideal gas law calculations with pressure and volume relationships at constant temperature."
      calculator={<BoylesLawCalculator />}
      slug="physics/boyles-law-calculator"
      category="Thermodynamics"
      features={[
        "Calculate initial/final pressure or volume",
        "Boyle's Law formula: P₁V₁ = P₂V₂",
        "Multiple unit support (Pa, atm, psi, bar, L, mL, m³, etc.)",
        "Instant thermodynamics calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Boyle's Law: The Pressure-Volume Relationship">
        <p>
          Boyle&apos;s Law is one of the fundamental gas laws in thermodynamics, describing how the volume of a gas changes with pressure when temperature remains constant. Named after Irish scientist Robert Boyle, this law states that for a given amount of gas at constant temperature, pressure and volume have an inverse relationship. Whether you&apos;re studying physics, chemistry, engineering, or working with gases, understanding Boyle&apos;s Law is essential. Our Boyle&apos;s Law Calculator makes it easy to calculate pressure or volume using the formula: <strong>P₁V₁ = P₂V₂</strong>.
        </p>
        <p>
          Boyle&apos;s Law is part of the ideal gas law family and is crucial for understanding gas behavior. When you compress a gas (increase pressure), its volume decreases. When you expand a gas (decrease pressure), its volume increases. This inverse relationship is fundamental to understanding how gases behave in closed systems, making it perfect for calculations involving gas compression, expansion, and storage at constant temperature.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Boyle's Law Calculator">
        <p>
          Our Boyle&apos;s Law Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Three Values:</strong> Input any three of the four values (initial pressure, initial volume, final pressure, or final volume)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for pressure (atm, Pa, psi, bar, etc.) and volume (L, mL, m³, etc.)</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with automatic unit conversion</li>
        </ol>
        <p>
          The calculator uses Boyle&apos;s Law formula: <strong>P₁V₁ = P₂V₂</strong>
        </p>
        <p>
          You can rearrange this formula to solve for any variable:
        </p>
        <ul>
          <li><strong>Initial Pressure:</strong> P₁ = P₂V₂ / V₁</li>
          <li><strong>Final Pressure:</strong> P₂ = P₁V₁ / V₂</li>
          <li><strong>Initial Volume:</strong> V₁ = P₂V₂ / P₁</li>
          <li><strong>Final Volume:</strong> V₂ = P₁V₁ / P₂</li>
        </ul>
        <p>
          <strong>Important:</strong> Temperature must remain constant for Boyle&apos;s Law to apply. The law describes the inverse relationship between pressure and volume when temperature and amount of gas are held constant.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Boyle's Law Formula">
        <p>
          Boyle&apos;s Law is expressed mathematically as:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">P₁V₁ = P₂V₂</p>
          <p className="text-sm text-gray-600 mt-2">Where: P = pressure, V = volume, subscripts 1 and 2 refer to initial and final states</p>
        </div>
        
        <h3>What is Boyle's Law?</h3>
        <p>
          Boyle&apos;s Law states that the pressure and volume of a given amount of gas have an inverse relationship when temperature and amount of gas remain constant. This means:
        </p>
        <SEOList items={[
          "As pressure increases, volume decreases proportionally",
          "As pressure decreases, volume increases proportionally",
          "The product of pressure and volume remains constant (P × V = constant)",
          "Temperature must remain constant for the law to apply",
          "The amount of gas (number of moles) must remain constant"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Pressure (P):</strong> The force exerted per unit area, measured in Pascals (Pa), atmospheres (atm), pounds per square inch (psi), bar, or other pressure units</li>
          <li><strong>Volume (V):</strong> The space occupied by the gas, measured in liters (L), milliliters (mL), cubic meters (m³), or other volume units</li>
          <li><strong>Inverse Relationship:</strong> When one variable doubles, the other halves, maintaining the constant product P × V</li>
          <li><strong>Constant Temperature:</strong> The law applies only when temperature remains constant during the pressure/volume change</li>
          <li><strong>Ideal Gas Behavior:</strong> The law is most accurate for ideal gases at constant temperature</li>
        </ul>

        <h3>Why is Boyle's Law Important?</h3>
        <p>
          Boyle&apos;s Law is fundamental to understanding gas behavior in countless applications, from scuba diving and breathing to industrial gas storage and compression. It helps predict how gases will behave when compressed or expanded, which is essential for designing systems involving gases, calculating gas storage requirements, and understanding respiratory mechanics.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Boyle&apos;s Law calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Scuba Diving: Understanding how air volume changes with depth and pressure",
          "Respiratory Medicine: Understanding lung volume changes with pressure in breathing",
          "Industrial Gas Storage: Calculating gas volumes at different pressures",
          "Automotive: Understanding gas behavior in engines and pneumatic systems",
          "Chemistry: Gas reactions, volumetric analysis, and stoichiometry",
          "Meteorology: Understanding atmospheric pressure and volume relationships",
          "Medical Devices: Ventilators, anesthesia systems, and breathing apparatus",
          "Food Industry: Understanding gas behavior in packaging and preservation",
          "Aerospace: Understanding gas behavior at different altitudes",
          "Engineering: Gas compression, expansion, and storage system design"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports various units for pressure and volume:
        </p>
        
        <h3>Pressure Units</h3>
        <ul>
          <li><strong>Pascals (Pa):</strong> SI unit for pressure (1 Pa = 1 N/m²)</li>
          <li><strong>Kilopascals (kPa):</strong> Common unit (1 kPa = 1000 Pa)</li>
          <li><strong>Atmospheres (atm):</strong> Standard atmospheric pressure (1 atm = 101,325 Pa)</li>
          <li><strong>Pounds per Square Inch (psi):</strong> Imperial unit (1 psi ≈ 6,895 Pa)</li>
          <li><strong>Bar:</strong> Metric unit (1 bar = 100,000 Pa = 0.9869 atm)</li>
          <li><strong>Torr (mmHg):</strong> Based on mercury column (1 Torr = 133.322 Pa)</li>
          <li><strong>Millimeters of Mercury (mmHg):</strong> Common in medical applications</li>
        </ul>

        <h3>Volume Units</h3>
        <ul>
          <li><strong>Liters (L):</strong> Most common unit for gas volume (1 L = 1000 mL = 0.001 m³)</li>
          <li><strong>Milliliters (mL):</strong> Useful for small volumes (1 mL = 0.001 L)</li>
          <li><strong>Cubic Meters (m³):</strong> SI unit for volume (1 m³ = 1000 L)</li>
          <li><strong>Cubic Centimeters (cm³):</strong> Equivalent to milliliters (1 cm³ = 1 mL)</li>
          <li><strong>Cubic Feet (ft³), Cubic Inches (in³):</strong> Imperial units for volume</li>
          <li><strong>Gallons, Quarts, Pints, Fluid Ounces:</strong> US customary volume units</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles all unit conversions. You can input values in any supported unit and get results in the same unit or convert between units as needed.
        </p>
      </SEOSection>

      <SEOSection title="Common Boyle's Law Calculations">
        <h3>Example 1: Calculating Final Volume</h3>
        <p>A gas occupies 2.0 L at 1.0 atm. What will be its volume at 2.0 atm if temperature remains constant?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P₁ = 1.0 atm, V₁ = 2.0 L, P₂ = 2.0 atm</p>
          <p className="font-mono">V₂ = P₁V₁ / P₂ = (1.0 atm × 2.0 L) / 2.0 atm = 1.0 L</p>
          <p className="text-sm text-gray-600 mt-1">The gas compresses from 2.0 L to 1.0 L as pressure doubles</p>
        </div>

        <h3>Example 2: Calculating Final Pressure</h3>
        <p>A gas occupies 500 mL at 2.0 atm. If it expands to 1000 mL at constant temperature, what is the final pressure?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P₁ = 2.0 atm, V₁ = 500 mL, V₂ = 1000 mL</p>
          <p className="font-mono">P₂ = P₁V₁ / V₂ = (2.0 atm × 500 mL) / 1000 mL = 1.0 atm</p>
          <p className="text-sm text-gray-600 mt-1">The pressure halves as volume doubles</p>
        </div>

        <h3>Example 3: Scuba Diving Application</h3>
        <p>A scuba diver&apos;s lungs contain 6.0 L of air at the surface (1.0 atm). What volume will the air occupy at a depth where pressure is 3.0 atm?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P₁ = 1.0 atm, V₁ = 6.0 L, P₂ = 3.0 atm</p>
          <p className="font-mono">V₂ = P₁V₁ / P₂ = (1.0 atm × 6.0 L) / 3.0 atm = 2.0 L</p>
          <p className="text-sm text-gray-600 mt-1">The air in the lungs compresses to 2.0 L at depth, which is why divers must breathe compressed air</p>
        </div>

        <h3>Example 4: Gas Storage Calculation</h3>
        <p>Gas is stored at 10.0 atm in a 50.0 L container. What volume would it occupy at atmospheric pressure (1.0 atm)?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P₁ = 10.0 atm, V₁ = 50.0 L, P₂ = 1.0 atm</p>
          <p className="font-mono">V₂ = P₁V₁ / P₂ = (10.0 atm × 50.0 L) / 1.0 atm = 500 L</p>
          <p className="text-sm text-gray-600 mt-1">The gas expands to 500 L when released to atmospheric pressure</p>
        </div>
      </SEOSection>

      <SEOSection title="Boyle's Law vs. Other Gas Laws">
        <p>
          Boyle&apos;s Law is one of several fundamental gas laws. Understanding how they relate helps in comprehensive gas calculations:
        </p>
        <ul>
          <li><strong>Boyle&apos;s Law:</strong> P₁V₁ = P₂V₂ (pressure-volume relationship at constant temperature) - This calculator</li>
          <li><strong>Charles&apos;s Law:</strong> V₁/T₁ = V₂/T₂ (volume-temperature relationship at constant pressure)</li>
          <li><strong>Gay-Lussac&apos;s Law:</strong> P₁/T₁ = P₂/T₂ (pressure-temperature relationship at constant volume)</li>
          <li><strong>Combined Gas Law:</strong> P₁V₁/T₁ = P₂V₂/T₂ (combines Boyle&apos;s, Charles&apos;s, and Gay-Lussac&apos;s laws)</li>
          <li><strong>Ideal Gas Law:</strong> PV = nRT (the most general gas law, where n is moles and R is the gas constant)</li>
        </ul>
        <p>
          Boyle&apos;s Law is a special case of the Ideal Gas Law when temperature and amount of gas are constant. It&apos;s essential for understanding how gases behave when only pressure and volume change.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding Boyle&apos;s Law has practical applications in daily life:
        </p>
        <SEOList items={[
          "Scuba Diving: Understanding how breathing air compresses at depth and expands during ascent",
          "Breathing: Understanding lung volume changes during respiration",
          "Balloons: Understanding why balloons shrink when squeezed and expand when released",
          "Syringes: Understanding how pulling the plunger reduces pressure and draws in fluid",
          "Bicycle Pumps: Understanding how compressing air increases pressure",
          "Gas Cylinders: Understanding how compressed gas storage works",
          "Weather Balloons: Understanding how balloons expand as they rise to lower pressure altitudes",
          "Medical Devices: Understanding ventilators, anesthesia systems, and respiratory devices"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is Boyle's Law and when does it apply?",
            answer: "Boyle's Law states that the pressure and volume of a gas have an inverse relationship when temperature and amount of gas remain constant. It applies to ideal gases when temperature doesn't change during the pressure/volume change. The formula is P₁V₁ = P₂V₂, meaning as pressure increases, volume decreases proportionally, and vice versa."
          },
          {
            question: "Why must temperature be constant for Boyle's Law?",
            answer: "Boyle's Law describes the relationship between pressure and volume specifically when temperature is constant. If temperature changes, you need to use the Combined Gas Law (P₁V₁/T₁ = P₂V₂/T₂) or the Ideal Gas Law (PV = nRT) to account for all three variables: pressure, volume, and temperature."
          },
          {
            question: "What happens if temperature changes during the pressure/volume change?",
            answer: "If temperature changes, Boyle's Law alone cannot accurately describe the gas behavior. You would need to use the Combined Gas Law or Ideal Gas Law to account for the temperature change. Boyle's Law is only valid when temperature remains constant."
          },
          {
            question: "Can Boyle's Law be used for all gases?",
            answer: "Boyle's Law is most accurate for ideal gases (gases that follow the ideal gas law perfectly) at constant temperature. Real gases deviate from ideal behavior, especially at high pressures or very low temperatures, but the law provides good approximations for many practical applications at moderate conditions."
          },
          {
            question: "How do I convert between different pressure units?",
            answer: "Common conversions: 1 atm = 101,325 Pa = 14.7 psi = 760 Torr = 1.01325 bar. Our calculator automatically handles these conversions, so you can input pressures in any supported unit and get results in your preferred unit."
          },
          {
            question: "What is the relationship between pressure and volume in Boyle's Law?",
            answer: "Pressure and volume are inversely proportional in Boyle's Law. This means if you double the pressure, the volume halves (assuming constant temperature). If you halve the pressure, the volume doubles. The product P × V remains constant, so P₁V₁ = P₂V₂."
          },
          {
            question: "Can pressure or volume be zero in Boyle's Law?",
            answer: "According to Boyle's Law, as pressure approaches infinity, volume approaches zero, and vice versa. However, these are theoretical limits. Real gases cannot be compressed to zero volume, and infinite pressure is physically impossible. Both pressure and volume must be positive for practical calculations."
          },
          {
            question: "How is Boyle's Law related to the Ideal Gas Law?",
            answer: "Boyle's Law is a special case of the Ideal Gas Law (PV = nRT). When temperature (T) and amount of gas (n) are constant, the Ideal Gas Law simplifies to PV = constant, which is Boyle's Law. Both laws describe gas behavior, with the Ideal Gas Law being more general and accounting for temperature and amount of gas."
          },
          {
            question: "What are some real-world examples of Boyle's Law?",
            answer: "Common examples include: scuba diving (air volume changes with depth/pressure), breathing (lung volume changes with pressure), syringes (pulling plunger reduces pressure), balloons (volume changes when squeezed), gas storage cylinders, bicycle pumps, and medical ventilators. All of these involve pressure and volume changes at constant temperature."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding Boyle&apos;s Law and the inverse relationship between pressure and volume is fundamental to thermodynamics and gas physics. Our Boyle&apos;s Law Calculator simplifies these calculations, making it easy to solve problems involving gas compression and expansion at constant temperature.
        </p>
        <p>
          Whether you&apos;re studying gas laws, designing systems involving gases, or understanding everyday phenomena like breathing and scuba diving, this calculator provides accurate results with support for multiple units and automatic conversions. Ready to explore more thermodynamics concepts? Check out our other calculators like the {createInternalLink('charles-law-calculator', 'Charles\'s Law Calculator')} for volume-temperature relationships, or use our {createInternalLink('ideal-gas-law-calculator', 'Ideal Gas Law Calculator')} for comprehensive gas law calculations that combine pressure, volume, temperature, and amount of gas.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

