import IdealGasLawCalculator from '../../../_components/calculators/IdealGasLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function IdealGasLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Ideal Gas Law Calculator: Calculate PV = nRT"
      description="Calculate pressure, volume, moles, or temperature using the ideal gas law: PV = nRT. Free online thermodynamics calculator for physics, chemistry, and engineering with multiple unit support."
      calculator={<IdealGasLawCalculator />}
      slug="physics/ideal-gas-law-calculator"
      category="Thermodynamics"
      features={[
        "Calculate any variable in PV = nRT",
        "Multiple gas constant options",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding the Ideal Gas Law: The Foundation of Gas Behavior">
        <p>
          The Ideal Gas Law is one of the most fundamental equations in physics and chemistry, describing the relationship between pressure, volume, temperature, and the number of moles of an ideal gas. Whether you&apos;re studying thermodynamics, working on chemical reactions, or designing systems involving gases, understanding the ideal gas law is essential. Our Ideal Gas Law Calculator makes it easy to calculate any variable in the equation <strong>PV = nRT</strong>, making it perfect for various applications in physics, chemistry, and engineering.
        </p>
        <p>
          The ideal gas law combines several gas laws (Boyle&apos;s Law, Charles&apos;s Law, and Avogadro&apos;s Law) into a single equation. It provides an excellent approximation for the behavior of gases under most conditions, especially at low pressures and high temperatures where gases behave most ideally.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Ideal Gas Law Calculator">
        <p>
          Our Ideal Gas Law Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Select Gas Constant:</strong> Choose the appropriate gas constant (R) based on your unit preferences. Common options include L·atm/(mol·K) for chemistry problems and J/(mol·K) for physics problems.</li>
          <li><strong>Enter Three Values:</strong> Input any three of the four variables (pressure, volume, moles, or temperature)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with step-by-step solutions</li>
        </ol>
        <p>
          The calculator uses the fundamental ideal gas law formula: <strong>PV = nRT</strong>, where P is pressure, V is volume, n is the number of moles, R is the gas constant, and T is temperature.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Ideal Gas Law Formula">
        <p>
          The ideal gas law is expressed as:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">PV = nRT</p>
          <p className="text-sm text-gray-600 mt-2">Where: P = pressure, V = volume, n = number of moles, R = gas constant, T = temperature</p>
        </div>
        
        <h3>Rearranging the Formula</h3>
        <p>You can rearrange this formula to solve for any variable:</p>
        <ul>
          <li><strong>Pressure:</strong> P = nRT / V</li>
          <li><strong>Volume:</strong> V = nRT / P</li>
          <li><strong>Moles:</strong> n = PV / RT</li>
          <li><strong>Temperature:</strong> T = PV / nR</li>
        </ul>

        <h3>Gas Constant Values</h3>
        <p>The gas constant (R) has different values depending on the units used:</p>
        <ul>
          <li><strong>R = 8.314 J/(mol·K)</strong> or <strong>8.314 Pa·m³/(mol·K)</strong> - SI units (physics)</li>
          <li><strong>R = 0.0821 L·atm/(mol·K)</strong> - Common chemistry units</li>
          <li><strong>R = 62.364 L·torr/(mol·K)</strong> - Alternative chemistry units</li>
          <li><strong>R = 1.987 cal/(mol·K)</strong> - Calories per mole per Kelvin</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          The ideal gas law is used in countless real-world applications:
        </p>
        <SEOList items={[
          "Chemical Reactions: Calculating gas volumes and pressures in reactions",
          "Industrial Processes: Designing and operating gas systems in manufacturing",
          "HVAC Systems: Understanding air behavior in heating and cooling systems",
          "Scuba Diving: Calculating gas volumes at different pressures and depths",
          "Meteorology: Understanding atmospheric pressure and volume relationships",
          "Automotive Engineering: Analyzing engine combustion and exhaust systems",
          "Medical Applications: Calculating gas volumes in respiratory therapy",
          "Food Packaging: Determining gas pressures in modified atmosphere packaging"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your ideal gas law calculations:
        </p>
        <ul>
          <li><strong>Pressure:</strong> Pascals (Pa), Kilopascals (kPa), Atmospheres (atm), bar, psi, torr</li>
          <li><strong>Volume:</strong> Cubic meters (m³), Liters (L), Milliliters (mL), Cubic centimeters (cm³), Cubic feet (ft³), Gallons (gal)</li>
          <li><strong>Moles:</strong> Always in moles (mol) - the number of gas particles</li>
          <li><strong>Temperature:</strong> Kelvin (K), Celsius (°C), Fahrenheit (°F) - must use absolute temperature (Kelvin) in calculations</li>
          <li><strong>Gas Constant:</strong> Choose R based on your pressure and volume units</li>
        </ul>
        <p>
          <strong>Tip:</strong> Our calculator automatically converts between different units and handles the gas constant selection. When using L·atm/(mol·K), pressure should be in atm and volume in L. When using SI units, pressure should be in Pa and volume in m³.
        </p>
      </SEOSection>

      <SEOSection title="Common Ideal Gas Law Calculations">
        <h3>Example 1: Calculating Volume</h3>
        <p>What volume does 2.5 moles of gas occupy at 1.0 atm and 273 K?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V = nRT / P = (2.5 mol × 0.0821 L·atm/(mol·K) × 273 K) / 1.0 atm = 56.0 L</p>
        </div>

        <h3>Example 2: Calculating Pressure</h3>
        <p>What is the pressure of 0.5 moles of gas in a 10 L container at 300 K?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P = nRT / V = (0.5 mol × 0.0821 L·atm/(mol·K) × 300 K) / 10 L = 1.23 atm</p>
        </div>

        <h3>Example 3: Calculating Moles</h3>
        <p>How many moles of gas are in a 5.0 L container at 2.0 atm and 298 K?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">n = PV / RT = (2.0 atm × 5.0 L) / (0.0821 L·atm/(mol·K) × 298 K) = 0.409 mol</p>
        </div>

        <h3>Example 4: Calculating Temperature</h3>
        <p>At what temperature will 1.0 mole of gas at 1.0 atm occupy 22.4 L?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = PV / nR = (1.0 atm × 22.4 L) / (1.0 mol × 0.0821 L·atm/(mol·K)) = 273 K (0°C)</p>
        </div>
      </SEOSection>

      <SEOSection title="Ideal Gas Law vs. Real Gases">
        <p>
          The ideal gas law provides an excellent approximation for most gases under normal conditions, but it has limitations:
        </p>
        <ul>
          <li><strong>Ideal Gases:</strong> Assumes gas particles have no volume and no intermolecular forces. Works best at low pressure and high temperature.</li>
          <li><strong>Real Gases:</strong> At high pressures or low temperatures, gases deviate from ideal behavior due to particle volume and intermolecular forces.</li>
        </ul>
        <p>
          For most practical applications at standard temperature and pressure (STP), the ideal gas law provides accurate results. For more precise calculations at extreme conditions, equations like the Van der Waals equation may be needed.
        </p>
      </SEOSection>

      <SEOSection title="Standard Temperature and Pressure (STP)">
        <p>
          Standard Temperature and Pressure (STP) is a common reference point:
        </p>
        <ul>
          <li><strong>Standard Temperature:</strong> 273.15 K (0°C or 32°F)</li>
          <li><strong>Standard Pressure:</strong> 1 atm (101.325 kPa or 760 torr)</li>
          <li><strong>Molar Volume at STP:</strong> 22.4 L/mol for any ideal gas</li>
        </ul>
        <p>
          At STP, one mole of any ideal gas occupies 22.4 liters. This is a useful reference point for many calculations.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the ideal gas law and when is it used?",
            answer: "The ideal gas law (PV = nRT) describes the relationship between pressure, volume, temperature, and the number of moles of an ideal gas. It's used extensively in physics, chemistry, and engineering to calculate gas properties. It works best for gases at low pressure and high temperature where intermolecular forces and particle volume are negligible."
          },
          {
            question: "What value should I use for the gas constant (R)?",
            answer: "The gas constant value depends on your units. Use R = 0.0821 L·atm/(mol·K) when working with liters and atmospheres (common in chemistry). Use R = 8.314 J/(mol·K) or Pa·m³/(mol·K) when working with SI units (common in physics). Our calculator automatically handles the correct R value based on your selection."
          },
          {
            question: "Why must temperature be in Kelvin?",
            answer: "The ideal gas law requires absolute temperature (Kelvin) because the relationship between temperature and other gas properties is based on absolute zero. Celsius and Fahrenheit scales have negative values, but temperature in the gas law must be positive. Our calculator automatically converts to Kelvin internally."
          },
          {
            question: "Can I use the ideal gas law for real gases?",
            answer: "Yes, the ideal gas law provides a good approximation for real gases under most conditions, especially at low pressure and high temperature. At high pressures or low temperatures, real gases deviate from ideal behavior, and more complex equations (like Van der Waals) may be needed for accuracy."
          },
          {
            question: "What is the difference between moles and molecules?",
            answer: "Moles (n) represent the amount of substance. One mole contains Avogadro's number (6.022 × 10²³) of particles (atoms, molecules, etc.). The ideal gas law uses moles, not individual molecules, because it's more convenient for calculations involving macroscopic amounts of gas."
          },
          {
            question: "How do I convert between different pressure or volume units?",
            answer: "Our calculator automatically handles unit conversions. Simply select your preferred units for pressure and volume, and the calculator will convert everything internally to perform the calculation correctly. You can mix different units (e.g., atm and L, or Pa and m³) as long as you select the appropriate gas constant."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding the ideal gas law is fundamental to thermodynamics, chemistry, and engineering. Our Ideal Gas Law Calculator simplifies these calculations, making it easy to solve problems involving gas pressure, volume, temperature, and moles.
        </p>
        <p>
          Ready to explore more thermodynamics concepts? Check out our other calculators like the {createInternalLink('charles-law-calculator', 'Charles\'s Law Calculator')} for temperature-volume relationships, or the {createInternalLink('enthalpy-calculator', 'Enthalpy Calculator')} for heat content calculations that often complement gas law analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

