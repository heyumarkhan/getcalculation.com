import EnthalpyCalculator from '../../../_components/calculators/EnthalpyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function EnthalpyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Enthalpy Calculator: Calculate Enthalpy Change & Heat Content"
      description="Calculate enthalpy change using multiple methods: ΔH = ΔU + PΔV, ΔH = Q (at constant pressure), or ΔH = m × c × ΔT. Free online thermodynamics calculator for physics, chemistry, and engineering."
      calculator={<EnthalpyCalculator />}
      slug="physics/enthalpy-calculator"
      category="Thermodynamics"
      features={[
        "Calculate enthalpy change using three different methods",
        "Support for multiple calculation modes",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Enthalpy: The Heat Content of Systems">
        <p>
          Enthalpy is one of the most important thermodynamic properties in physics and chemistry, representing the total heat content of a system. Whether you&apos;re studying thermodynamics, working on chemical reactions, or designing thermal systems, understanding enthalpy is essential. Our Enthalpy Calculator makes it easy to calculate enthalpy change using multiple methods, making it perfect for various applications in physics, chemistry, and engineering.
        </p>
        <p>
          Enthalpy (H) is defined as the sum of internal energy (U) and the product of pressure (P) and volume (V): <strong>H = U + PV</strong>. For most practical purposes, we work with enthalpy change (ΔH), which represents the heat transferred at constant pressure. This makes enthalpy particularly useful for analyzing chemical reactions, phase changes, and heat transfer processes.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Enthalpy Calculator">
        <p>
          Our Enthalpy Calculator offers three different calculation modes to suit various scenarios:
        </p>
        <ol>
          <li><strong>Enthalpy Mode (ΔH = ΔU + PΔV):</strong> Calculate enthalpy change from internal energy change, pressure, and volume change. Enter any three values to calculate the fourth.</li>
          <li><strong>Constant Pressure Mode (ΔH = Q):</strong> At constant pressure, enthalpy change equals heat transfer. Simply enter the heat transfer value.</li>
          <li><strong>Specific Heat Mode (ΔH = m × c × ΔT):</strong> Calculate enthalpy change from mass, specific heat capacity, and temperature change. Perfect for heating and cooling processes.</li>
        </ol>
        <p>
          Select your preferred calculation mode, enter the known values, choose your units, and click Calculate to get instant results with step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Enthalpy Formulas">
        <p>
          Enthalpy can be calculated using several fundamental formulas:
        </p>
        
        <h3>1. Fundamental Enthalpy Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">H = U + PV</p>
          <p className="text-sm text-gray-600 mt-2">Where: H = enthalpy, U = internal energy, P = pressure, V = volume</p>
        </div>

        <h3>2. Enthalpy Change Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ΔH = ΔU + PΔV</p>
          <p className="text-sm text-gray-600 mt-2">Where: ΔH = enthalpy change, ΔU = internal energy change, P = pressure, ΔV = volume change</p>
        </div>

        <h3>3. Constant Pressure Enthalpy</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ΔH = Q (at constant pressure)</p>
          <p className="text-sm text-gray-600 mt-2">Where: ΔH = enthalpy change, Q = heat transfer</p>
        </div>

        <h3>4. Specific Heat Enthalpy</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ΔH = m × c × ΔT</p>
          <p className="text-sm text-gray-600 mt-2">Where: ΔH = enthalpy change, m = mass, c = specific heat capacity, ΔT = temperature change</p>
        </div>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Enthalpy calculations are essential in numerous real-world applications:
        </p>
        <SEOList items={[
          "Chemical Reactions: Determining heat released or absorbed in chemical processes",
          "Phase Changes: Calculating energy required for melting, vaporization, or freezing",
          "HVAC Systems: Designing heating and cooling systems for buildings",
          "Power Generation: Analyzing thermal efficiency in power plants",
          "Food Processing: Calculating energy requirements for cooking and preservation",
          "Material Science: Understanding thermal properties of materials",
          "Environmental Engineering: Analyzing heat transfer in environmental systems"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your enthalpy calculations:
        </p>
        <ul>
          <li><strong>Enthalpy/Energy:</strong> Joules (J), Kilojoules (kJ), Calories (cal), Kilocalories (kcal), BTU, Watt-hours (Wh)</li>
          <li><strong>Pressure:</strong> Pascals (Pa), Kilopascals (kPa), Megapascals (MPa), bar, atmospheres (atm), psi, torr</li>
          <li><strong>Volume:</strong> Cubic meters (m³), Liters (L), Milliliters (mL), Cubic centimeters (cm³), Cubic feet (ft³), Cubic inches (in³), Gallons (gal)</li>
          <li><strong>Mass:</strong> Kilograms (kg), Grams (g), Pounds (lb), Ounces (oz)</li>
          <li><strong>Specific Heat:</strong> J/(kg·K), kJ/(kg·K), cal/(g·°C), kcal/(kg·°C), BTU/(lb·°F)</li>
          <li><strong>Temperature:</strong> Kelvin (K), Celsius (°C), Fahrenheit (°F)</li>
        </ul>
        <p>
          <strong>Tip:</strong> Our calculator automatically converts between different units, so you can mix units as needed. The calculator ensures all calculations are performed in consistent base units internally.
        </p>
      </SEOSection>

      <SEOSection title="Common Enthalpy Calculations">
        <h3>Example 1: Enthalpy Change from Internal Energy</h3>
        <p>A system undergoes a process where internal energy changes by 500 J, pressure is 101325 Pa, and volume increases by 0.001 m³. What is the enthalpy change?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ΔH = ΔU + PΔV = 500 J + (101325 Pa × 0.001 m³) = 601.325 J</p>
        </div>

        <h3>Example 2: Constant Pressure Process</h3>
        <p>At constant pressure, 2500 J of heat is transferred to a system. What is the enthalpy change?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ΔH = Q = 2500 J (at constant pressure)</p>
        </div>

        <h3>Example 3: Heating Water</h3>
        <p>Calculate the enthalpy change when 2 kg of water (specific heat = 4184 J/(kg·K)) is heated from 20°C to 80°C.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ΔH = m × c × ΔT = 2 kg × 4184 J/(kg·K) × 60 K = 502,080 J = 502.08 kJ</p>
        </div>
      </SEOSection>

      <SEOSection title="Enthalpy vs. Internal Energy: Understanding the Difference">
        <p>
          While enthalpy and internal energy are related, they have distinct meanings:
        </p>
        <ul>
          <li><strong>Internal Energy (U):</strong> The total energy contained within a system, including kinetic and potential energy of molecules</li>
          <li><strong>Enthalpy (H):</strong> Internal energy plus the product of pressure and volume (H = U + PV)</li>
        </ul>
        <p>
          The key difference is that enthalpy accounts for the work done by or on the system due to volume changes at constant pressure. This makes enthalpy particularly useful for processes occurring at constant pressure, which is common in many real-world applications.
        </p>
        <p>
          For constant pressure processes, enthalpy change equals heat transfer (ΔH = Q), making it easier to measure and calculate than internal energy change alone.
        </p>
      </SEOSection>

      <SEOSection title="Enthalpy in Chemical Reactions">
        <p>
          Enthalpy plays a crucial role in chemical thermodynamics:
        </p>
        <ul>
          <li><strong>Exothermic Reactions:</strong> Reactions that release heat have negative enthalpy change (ΔH &lt; 0)</li>
          <li><strong>Endothermic Reactions:</strong> Reactions that absorb heat have positive enthalpy change (ΔH &gt; 0)</li>
          <li><strong>Standard Enthalpy of Formation:</strong> The enthalpy change when one mole of a compound forms from its elements</li>
          <li><strong>Enthalpy of Combustion:</strong> The enthalpy change when a substance burns completely in oxygen</li>
        </ul>
        <p>
          Understanding enthalpy changes helps predict whether reactions will occur spontaneously and how much energy they will release or require.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is enthalpy and why is it important?",
            answer: "Enthalpy (H) is a thermodynamic property representing the total heat content of a system, defined as H = U + PV. It's important because at constant pressure, enthalpy change equals heat transfer, making it easier to measure and calculate than internal energy alone. Enthalpy is essential for analyzing chemical reactions, phase changes, and heat transfer processes."
          },
          {
            question: "What's the difference between enthalpy and internal energy?",
            answer: "Internal energy (U) is the total energy within a system. Enthalpy (H) is internal energy plus the product of pressure and volume (H = U + PV). For constant pressure processes, enthalpy change equals heat transfer, making enthalpy more convenient to work with in many practical applications."
          },
          {
            question: "When should I use ΔH = Q vs. ΔH = ΔU + PΔV?",
            answer: "Use ΔH = Q when working at constant pressure, as this is the most common scenario in chemical reactions and many physical processes. Use ΔH = ΔU + PΔV when you need to account for both internal energy change and pressure-volume work, or when you have specific values for internal energy change, pressure, and volume change."
          },
          {
            question: "Can enthalpy be negative?",
            answer: "Yes, enthalpy change (ΔH) can be negative. A negative enthalpy change indicates an exothermic process that releases heat to the surroundings. A positive enthalpy change indicates an endothermic process that absorbs heat from the surroundings."
          },
          {
            question: "What units should I use for enthalpy calculations?",
            answer: "Enthalpy is typically measured in energy units: Joules (J), Kilojoules (kJ), Calories (cal), or BTU. Our calculator supports all common energy units and automatically converts between them. Ensure consistency with other units in your calculation (pressure in Pa, volume in m³, etc.)."
          },
          {
            question: "How do I calculate enthalpy change for a chemical reaction?",
            answer: "For chemical reactions at constant pressure, enthalpy change equals the heat of reaction. You can calculate it using standard enthalpies of formation, or measure it directly using calorimetry. Our calculator's constant pressure mode (ΔH = Q) is perfect for this application."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding enthalpy is fundamental to thermodynamics, chemistry, and engineering. Our Enthalpy Calculator simplifies these calculations, making it easy to solve problems involving heat content, energy changes, and thermal processes.
        </p>
        <p>
          Ready to explore more thermodynamics concepts? Check out our other calculators like the {createInternalLink('specific-heat-calculator', 'Specific Heat Calculator')} for heat capacity calculations, or the {createInternalLink('charles-law-calculator', 'Charles\'s Law Calculator')} for ideal gas law calculations that often complement enthalpy analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

