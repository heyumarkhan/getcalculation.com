import WireResistanceCalculator from '../../../_components/calculators/WireResistanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function WireResistanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wire Resistance Calculator: Calculate R = ρ × L / A Instantly"
      description="Calculate wire resistance, length, diameter, or resistivity using R = ρ × L / A formula. Free online physics calculator with support for 11 materials, temperature correction, and multiple unit systems (Ω, mΩ, kΩ, MΩ)."
      calculator={<WireResistanceCalculator />}
      slug="physics/wire-resistance-calculator"
      category="Electricity"
      features={[
        "Calculate resistance, length, diameter, or resistivity",
        "11 common wire materials (copper, aluminum, silver, gold, etc.)",
        "Custom resistivity support",
        "Temperature correction (20°C reference)",
        "Multiple unit systems (Ω, mΩ, kΩ, MΩ)",
        "Length units: mm, cm, m, km, ft, in",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wire Resistance: Fundamentals of Electrical Resistance">
        <p>
          Wire resistance is a fundamental concept in electrical engineering and physics that determines how much an electrical conductor opposes the flow of electric current. Understanding wire resistance is essential for designing electrical circuits, selecting appropriate wire sizes, calculating power loss, and ensuring safe electrical installations. Whether you&apos;re studying physics, designing circuits, working on electrical projects, or calculating cable specifications, our Wire Resistance Calculator provides instant, accurate results.
        </p>
        <p>
          Using the fundamental formula <strong>R = ρ × L / A</strong> (resistance equals resistivity times length divided by cross-sectional area), our calculator makes it easy to determine any parameter. With support for 11 common materials and temperature correction, you can calculate precise resistance values for your specific applications.
        </p>
      </SEOSection>

      <SEOSection title="What is Wire Resistance?">
        <p>
          Wire resistance is the opposition to the flow of electric current through a conductor. It depends on three main factors: the material&apos;s resistivity, the wire&apos;s length, and its cross-sectional area. Higher resistance means more energy is dissipated as heat when current flows through the wire.
        </p>
        <h3>Key Characteristics:</h3>
        <ul>
          <li><strong>Resistivity (ρ):</strong> Material property measured in Ω·mm²/m, varies by material and temperature</li>
          <li><strong>Length (L):</strong> Longer wires have higher resistance (direct relationship)</li>
          <li><strong>Cross-sectional Area (A):</strong> Thicker wires have lower resistance (inverse relationship)</li>
          <li><strong>Temperature:</strong> Most conductors increase in resistivity with temperature</li>
          <li><strong>Material:</strong> Different materials (copper, aluminum, silver) have different resistivities</li>
          <li><strong>Measured in Ohms (Ω):</strong> Standard unit of electrical resistance</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use Our Wire Resistance Calculator">
        <p>
          Our calculator offers four flexible calculation modes. Choose based on what you want to find:
        </p>
        <h3>Calculation Modes</h3>
        <ol>
          <li><strong>Resistance (R):</strong> Calculate the resistance of a wire given length, diameter, and material</li>
          <li><strong>Length (L):</strong> Find required wire length given desired resistance and diameter</li>
          <li><strong>Diameter (D):</strong> Determine required wire diameter for target resistance and length</li>
          <li><strong>Resistivity (ρ):</strong> Calculate resistivity of a material from measured wire properties</li>
        </ol>
        <h3>Steps:</h3>
        <ol>
          <li><strong>Select Calculation Type:</strong> Choose what you want to calculate</li>
          <li><strong>Choose Material:</strong> Select from 11 common materials or enter custom resistivity</li>
          <li><strong>Set Temperature:</strong> Enter temperature if different from 20°C (optional)</li>
          <li><strong>Enter Known Values:</strong> Input all required measurements</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed formulas</li>
        </ol>
      </SEOSection>

      <SEOSection title="Wire Resistance Formula and Explanation">
        <p>
          The fundamental wire resistance formula is based on Ohm&apos;s Law and material properties:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg font-bold">R = ρ × L / A</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where:</p>
          <p className="text-sm text-gray-600 text-center">R = Resistance (Ω)</p>
          <p className="text-sm text-gray-600 text-center">ρ (rho) = Resistivity (Ω·mm²/m)</p>
          <p className="text-sm text-gray-600 text-center">L = Wire length (mm)</p>
          <p className="text-sm text-gray-600 text-center">A = Cross-sectional area (mm²)</p>
        </div>

        <h3>Understanding Each Component:</h3>
        <ul>
          <li><strong>Resistivity (ρ):</strong> An intrinsic property of materials that determines how strongly they oppose current flow. Copper has low resistivity (~0.017 Ω·mm²/m), making it ideal for wiring. Nichrome has high resistivity (~1.1), making it suitable for heating elements.</li>
          <li><strong>Length (L):</strong> Resistance increases linearly with length. Doubling the length doubles the resistance. This is why long-distance power transmission requires large diameter wires.</li>
          <li><strong>Cross-sectional Area (A):</strong> Resistance decreases with larger area. Doubling the diameter quadruples the area, reducing resistance to one-quarter.</li>
        </ul>

        <h3>Cross-sectional Area Calculation:</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-center">A = π × r² = π × (D/2)²</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where D is the wire diameter and r is the radius</p>
        </div>
      </SEOSection>

      <SEOSection title="Common Wire Materials and Resistivity">
        <p>
          Different materials have different resistivity values. Here are 11 common materials at 20°C:
        </p>
        <ul>
          <li><strong>Silver (0.0159 Ω·mm²/m):</strong> Best conductor, too expensive for most applications</li>
          <li><strong>Copper (0.0172 Ω·mm²/m):</strong> Most common for electrical wiring, excellent conductivity and cost-effective</li>
          <li><strong>Gold (0.0244 Ω·mm²/m):</strong> Good conductor, used in high-reliability electronics and connectors</li>
          <li><strong>Aluminum (0.0282 Ω·mm²/m):</strong> Second most common, lower cost than copper, lighter weight</li>
          <li><strong>Tungsten (0.0533 Ω·mm²/m):</strong> Used in light bulb filaments and high-temperature applications</li>
          <li><strong>Nickel (0.0699 Ω·mm²/m):</strong> Used in resistors and heating elements</li>
          <li><strong>Iron (0.0974 Ω·mm²/m):</strong> Used in transformers and inductors</li>
          <li><strong>Manganin (0.44 Ω·mm²/m):</strong> Precision resistors, stable over temperature range</li>
          <li><strong>Constantan (0.49 Ω·mm²/m):</strong> Thermocouple wire, low temperature coefficient</li>
          <li><strong>Stainless Steel (0.72 Ω·mm²/m):</strong> Corrosion resistant, used in harsh environments</li>
          <li><strong>Nichrome (1.1 Ω·mm²/m):</strong> Heating element wire, can withstand high temperatures</li>
        </ul>
      </SEOSection>

      <SEOSection title="Temperature Effects on Wire Resistance">
        <p>
          Resistance changes with temperature according to the temperature coefficient formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-mono text-center">ρ(T) = ρ₀ × [1 + α × (T - T₀)]</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where: α = temperature coefficient, T₀ = reference temperature (20°C)</p>
        </div>

        <h3>Temperature Coefficients of Common Materials:</h3>
        <ul>
          <li><strong>Copper:</strong> 0.00393 per °C (resistance increases ~0.4% per °C)</li>
          <li><strong>Aluminum:</strong> 0.00391 per °C</li>
          <li><strong>Silver:</strong> 0.0038 per °C</li>
          <li><strong>Constantan:</strong> 0.000008 per °C (nearly constant, used for precision)</li>
          <li><strong>Nichrome:</strong> 0.0004 per °C (low temperature coefficient for heating elements)</li>
        </ul>

        <p>
          For example, copper wire at 40°C has ~3.9% higher resistance than at 20°C. This is why electrical calculations must account for operating temperature, especially in high-power applications.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications of Wire Resistance Calculation">
        <p>
          Wire resistance calculations are critical for numerous applications:
        </p>
        <SEOList items={[
          "Electrical Wiring: Selecting appropriate wire gauge for home and building installations",
          "Power Transmission: Calculating losses in long-distance power distribution lines",
          "Circuit Design: Determining voltage drops across wires in electronic circuits",
          "Heat Generation: Designing heating elements with specific resistance values",
          "Precision Instruments: Using low-resistance materials for measurement equipment",
          "Electromagnets: Calculating coil resistance and power consumption",
          "Automotive: Sizing battery cables to minimize voltage drop",
          "Renewable Energy: Calculating losses in solar panel and wind turbine wiring",
          "Safety: Ensuring wire sizes provide adequate current capacity without overheating",
          "Cost Optimization: Balancing wire cost against power loss in electrical systems"
        ]} />
      </SEOSection>

      <SEOSection title="Wire Gauge and Resistance Relationship">
        <p>
          Wire gauge (AWG - American Wire Gauge) is inversely related to resistance. Larger gauge numbers mean thinner wires with higher resistance:
        </p>
        <ul>
          <li><strong>AWG 24 (0.511 mm):</strong> High resistance, used for signal wiring</li>
          <li><strong>AWG 18 (1.024 mm):</strong> Medium resistance, common household wiring</li>
          <li><strong>AWG 12 (2.053 mm):</strong> Low resistance, higher current capacity</li>
          <li><strong>AWG 6 (4.115 mm):</strong> Very low resistance, heavy-duty applications</li>
          <li><strong>AWG 000 (10.405 mm):</strong> Extremely low resistance, power distribution</li>
        </ul>
        <p>
          Each AWG step represents approximately 20-26% change in cross-sectional area, resulting in similar resistance changes.
        </p>
      </SEOSection>

      <SEOSection title="Voltage Drop Calculation">
        <p>
          Voltage drop in a wire is an important consideration in electrical system design:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-mono text-center">V_drop = I × R</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where: I = current (A), R = wire resistance (Ω)</p>
        </div>

        <p>
          Electrical codes typically limit voltage drop to 3% for branch circuits and 5% for combined feeders. Using our calculator to ensure wire resistance is low enough prevents excessive voltage drop and loss of efficiency.
        </p>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports multiple unit systems for flexibility:
        </p>
        
        <h3>Resistance Units</h3>
        <ul>
          <li><strong>Ω (Ohms):</strong> Standard unit</li>
          <li><strong>mΩ (Milliohms):</strong> 0.001 Ω, used for low-resistance applications</li>
          <li><strong>kΩ (Kilohms):</strong> 1,000 Ω, common in electronics</li>
          <li><strong>MΩ (Megaohms):</strong> 1,000,000 Ω, used for insulation resistance</li>
        </ul>

        <h3>Length Units</h3>
        <ul>
          <li><strong>mm (Millimeters):</strong> Metric precision unit</li>
          <li><strong>cm (Centimeters):</strong> Metric convenient unit</li>
          <li><strong>m (Meters):</strong> Standard metric unit</li>
          <li><strong>km (Kilometers):</strong> Large distances (power transmission)</li>
          <li><strong>ft (Feet):</strong> Imperial unit</li>
          <li><strong>in (Inches):</strong> Imperial precision unit</li>
        </ul>

        <h3>Diameter Units</h3>
        <ul>
          <li><strong>mm (Millimeters):</strong> Most common for wire diameter</li>
          <li><strong>cm (Centimeters):</strong> Larger wires</li>
          <li><strong>in (Inches):</strong> Imperial measurements</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Wire Resistance Calculations">
        <h3>Example 1: Household Electrical Wire</h3>
        <p>Calculate resistance of a 50-meter copper wire with 2.5 mm diameter at 20°C</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ = 0.0172 Ω·mm²/m, A = π × (1.25)² = 4.91 mm²</p>
          <p className="font-mono">R = 0.0172 × 50 / 4.91 = 0.175 Ω</p>
          <p className="text-sm text-gray-600 mt-2">A 50m household wire has 0.175 ohms resistance</p>
        </div>

        <h3>Example 2: Finding Required Wire Diameter</h3>
        <p>What diameter copper wire is needed for maximum 0.1 Ω resistance over 100 meters?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ = 0.0172, L = 100 m, R = 0.1 Ω</p>
          <p className="font-mono">A = ρ × L / R = 0.0172 × 100 / 0.1 = 17.2 mm²</p>
          <p className="font-mono">D = 2 × √(A/π) = 2 × √(17.2/π) = 4.68 mm</p>
          <p className="text-sm text-gray-600 mt-2">Use copper wire approximately 4.7 mm in diameter (~8 AWG)</p>
        </div>

        <h3>Example 3: Temperature Effect</h3>
        <p>Copper wire resistance at 60°C vs 20°C (same wire and current)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ(20°C) = 0.0172 Ω·mm²/m</p>
          <p className="font-mono">ρ(60°C) = 0.0172 × [1 + 0.00393 × (60-20)] = 0.0191 Ω·mm²/m</p>
          <p className="font-mono">Resistance increases by (0.0191/0.0172) = 11% at 60°C</p>
          <p className="text-sm text-gray-600 mt-2">Temperature has significant effect on wire resistance</p>
        </div>

        <h3>Example 4: Voltage Drop in Long Wire</h3>
        <p>Calculate voltage drop in 200m aluminum wire carrying 20A current (diameter 4 mm)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">R = ρ × L / A = 0.0282 × 200 / 12.57 = 0.449 Ω</p>
          <p className="font-mono">V_drop = I × R = 20 × 0.449 = 8.98 V</p>
          <p className="text-sm text-gray-600 mt-2">Nearly 9V drop over 200m - significant for low-voltage systems</p>
        </div>

        <h3>Example 5: Heating Wire Selection</h3>
        <p>Design a heating element with nichrome wire requiring 500Ω resistance, 2 meters long</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ (nichrome) = 1.1 Ω·mm²/m, L = 2000 mm</p>
          <p className="font-mono">A = ρ × L / R = 1.1 × 2000 / 500 = 4.4 mm²</p>
          <p className="font-mono">D = 2 × √(4.4/π) = 2.36 mm</p>
          <p className="text-sm text-gray-600 mt-2">Use 2.36 mm diameter nichrome wire for target resistance</p>
        </div>
      </SEOSection>

      <SEOSection title="Power Dissipation and Heating">
        <p>
          Wire resistance causes power dissipation as heat, following these formulas:
        </p>
        <ul>
          <li><strong>Power Loss:</strong> P = I² × R (watts)</li>
          <li><strong>Voltage Drop:</strong> V = I × R</li>
          <li><strong>Efficiency:</strong> Lower resistance equals less power loss and better efficiency</li>
        </ul>
        <p>
          In long-distance power transmission, reducing wire resistance by using larger diameter conductors saves enormous amounts of energy that would otherwise be wasted as heat.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is wire resistance and why does it matter?",
            answer: "Wire resistance is the opposition to current flow in a conductor. It matters because it causes voltage drops, power losses (as heat), and affects circuit performance. Lower resistance in wiring is crucial for efficient power delivery and proper circuit operation."
          },
          {
            question: "How does wire diameter affect resistance?",
            answer: "Resistance is inversely proportional to the cross-sectional area. Doubling the diameter quadruples the area, reducing resistance to one-quarter. Thicker wires have much lower resistance than thin wires of the same material and length."
          },
          {
            question: "Why does copper make the best household wiring?",
            answer: "Copper has several advantages: (1) Low resistivity (0.0172 Ω·mm²/m) - excellent current-carrying ability; (2) Good ductility - can be drawn into wires; (3) Corrosion resistance - long-term reliability; (4) Cost-effective for most applications compared to silver or gold."
          },
          {
            question: "What is the temperature coefficient and why is it important?",
            answer: "The temperature coefficient describes how resistivity changes with temperature. Copper's coefficient is 0.00393, meaning resistance increases 0.393% per °C. This is important because operating temperature affects actual resistance and must be calculated for accurate circuit design."
          },
          {
            question: "How do I calculate the required wire size for an application?",
            answer: "Use the formula A = ρ × L / R, where you know the resistivity (material), length (distance), and desired maximum resistance. Then calculate diameter from area using D = 2 × √(A/π). Our calculator automates this entire process for accuracy."
          },
          {
            question: "What is voltage drop and how does it relate to wire resistance?",
            answer: "Voltage drop is the loss of voltage across a wire due to its resistance, calculated as V = I × R. Electrical codes limit voltage drop to ensure proper equipment operation. Lower wire resistance reduces voltage drop and improves efficiency."
          },
          {
            question: "Can I use aluminum wire instead of copper?",
            answer: "Aluminum can be used but requires larger diameter (about 1.6x larger) due to higher resistivity (0.0282 vs 0.0172). Aluminum is lighter and less expensive, making it practical for long-distance power transmission and outdoor applications."
          },
          {
            question: "How much does temperature affect wire resistance?",
            answer: "For copper, resistance increases approximately 0.4% per degree Celsius above 20°C. So at 60°C (40°C increase), copper wire has about 11% higher resistance. This is why high-power applications must account for temperature effects."
          }
        ]}
      />

      <SEOSection title="Related Calculators and Resources">
        <p>
          Our suite of electrical physics calculators can help with related calculations:
        </p>
        <ul>
          <li>Ohm&apos;s Law Calculator - Calculate voltage, current, power, and resistance</li>
          <li>Electrical Power Calculator - Calculate power, voltage, current relationships</li>
          <li>Wire Size Calculator - Select appropriate wire gauge for applications</li>
          <li>DC Wire Size Calculator - Calculate wire sizing for DC systems</li>
        </ul>
      </SEOSection>

      <SEOSection title="Why Choose Our Wire Resistance Calculator?">
        <p>
          Our free online calculator provides significant advantages:
        </p>
        <ul>
          <li><strong>Four Calculation Modes:</strong> Calculate resistance, length, diameter, or resistivity</li>
          <li><strong>11 Materials:</strong> Pre-loaded with common wiring materials plus custom resistivity option</li>
          <li><strong>Temperature Correction:</strong> Automatic resistance adjustment for different operating temperatures</li>
          <li><strong>Multiple Units:</strong> Support for metric and imperial units for all measurements</li>
          <li><strong>Instant Results:</strong> No downloads or complicated procedures—just enter and calculate</li>
          <li><strong>Educational:</strong> Learn about resistivity, material properties, and electrical principles</li>
          <li><strong>Professional:</strong> Accurate calculations suitable for engineering and design work</li>
          <li><strong>Always Free:</strong> No registration, subscriptions, or hidden fees</li>
        </ul>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
