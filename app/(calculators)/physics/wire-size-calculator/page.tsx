import WireSizeCalculator from '../../../_components/calculators/WireSizeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WireSizeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wire Size Calculator: Calculate AWG, Current Capacity & Voltage Drop"
      description="Calculate wire gauge (AWG), maximum current capacity, or voltage drop for electrical wiring. Free online electrical engineering calculator with support for copper and aluminum wires."
      calculator={<WireSizeCalculator />}
      slug="physics/wire-size-calculator"
      category="Electromagnetism"
      features={[
        "Calculate wire gauge (AWG) from current and voltage drop",
        "Calculate maximum current capacity for wire size",
        "Calculate voltage drop for given wire size",
        "Support for copper and aluminum wires",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wire Sizing: Essential for Electrical Safety">
        <p>
          Proper wire sizing is critical for electrical safety, efficiency, and code compliance. Whether you&apos;re designing electrical circuits, installing wiring, or troubleshooting voltage drop issues, understanding wire gauge calculations is essential. Our Wire Size Calculator makes it easy to determine the appropriate American Wire Gauge (AWG) size, calculate maximum current capacity, or determine voltage drop for electrical installations.
        </p>
        <p>
          Wire size directly affects electrical resistance, current-carrying capacity, and voltage drop. Using undersized wires can lead to overheating, fire hazards, and excessive voltage drop that affects equipment performance. Our calculator helps ensure you select the correct wire size for your specific application.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Wire Size Calculator">
        <p>
          Our Wire Size Calculator offers three different calculation modes:
        </p>
        <ol>
          <li><strong>Calculate Wire Size (AWG):</strong> Enter current, supply voltage, maximum allowed voltage drop, and wire length. The calculator determines the minimum required wire gauge.</li>
          <li><strong>Calculate Maximum Current:</strong> Enter wire gauge (AWG), supply voltage, maximum voltage drop, and length. The calculator determines the maximum safe current capacity.</li>
          <li><strong>Calculate Voltage Drop:</strong> Enter wire gauge (AWG), current, supply voltage, and length. The calculator determines the actual voltage drop.</li>
        </ol>
        <p>
          Select your calculation mode, choose wire material (copper or aluminum), enter the known values, and click Calculate to get instant results with detailed step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Wire Size Formulas">
        <p>
          Wire size calculations are based on electrical resistance and Ohm&apos;s law:
        </p>
        
        <h3>1. Electrical Resistance</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">R = (ρ × L × 2) / A</p>
          <p className="text-sm text-gray-600 mt-2">Where: R = resistance, ρ = resistivity, L = length, A = cross-sectional area</p>
          <p className="text-sm text-gray-600 mt-1">Note: Length is multiplied by 2 for round-trip (out and back)</p>
        </div>

        <h3>2. Voltage Drop</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">V_drop = I × R</p>
          <p className="text-sm text-gray-600 mt-2">Where: V_drop = voltage drop, I = current, R = resistance</p>
        </div>

        <h3>3. Material Resistivity</h3>
        <ul>
          <li><strong>Copper:</strong> ρ = 1.68 × 10⁻⁸ Ω·m (at 20°C)</li>
          <li><strong>Aluminum:</strong> ρ = 2.65 × 10⁻⁸ Ω·m (at 20°C)</li>
        </ul>

        <h3>4. American Wire Gauge (AWG)</h3>
        <p>
          AWG is a standardized wire gauge system used in North America. Lower AWG numbers indicate larger wire diameters:
        </p>
        <ul>
          <li><strong>4/0 (0000):</strong> Largest common size, ~85 mm²</li>
          <li><strong>12 AWG:</strong> Common for 20A circuits, ~3.31 mm²</li>
          <li><strong>14 AWG:</strong> Common for 15A circuits, ~2.08 mm²</li>
          <li><strong>16 AWG:</strong> Common for low-current applications, ~1.31 mm²</li>
          <li><strong>Higher numbers:</strong> Smaller wires for low-current applications</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Wire size calculations are essential in numerous electrical applications:
        </p>
        <SEOList items={[
          "Residential Wiring: Determining wire size for home electrical circuits",
          "Commercial Buildings: Sizing wires for lighting, outlets, and equipment",
          "Industrial Applications: Calculating wire sizes for motors and machinery",
          "Renewable Energy: Sizing wires for solar panels and wind turbines",
          "Automotive: Determining wire gauge for vehicle electrical systems",
          "Low Voltage Systems: Sizing wires for security systems and data cables",
          "Power Distribution: Calculating wire sizes for feeders and branch circuits",
          "Voltage Drop Analysis: Ensuring adequate voltage at load points"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your wire size calculations:
        </p>
        <ul>
          <li><strong>Current:</strong> Amperes (A)</li>
          <li><strong>Voltage:</strong> Volts (V)</li>
          <li><strong>Voltage Drop:</strong> Volts (V) or percentage (%)</li>
          <li><strong>Length:</strong> Meters (m), Feet (ft), Kilometers (km), Miles (mi)</li>
          <li><strong>Wire Gauge:</strong> AWG (American Wire Gauge) - dimensionless number</li>
          <li><strong>Cross-Sectional Area:</strong> Square millimeters (mm²) or square inches</li>
          <li><strong>Resistance:</strong> Ohms (Ω)</li>
          <li><strong>Resistivity:</strong> Ohm-meters (Ω·m)</li>
        </ul>
        <p>
          <strong>Tip:</strong> Our calculator automatically handles unit conversions for length. The calculator uses round-trip distance (length × 2) for resistance calculations, which is standard practice for voltage drop calculations.
        </p>
      </SEOSection>

      <SEOSection title="Common Wire Size Calculations">
        <h3>Example 1: Determining Wire Size</h3>
        <p>A 120V circuit needs to carry 20A over 50 feet with a maximum 3% voltage drop. What wire size is needed?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Maximum voltage drop: 120V × 0.03 = 3.6V</p>
          <p className="font-mono">Required resistance: R = 3.6V / 20A = 0.18 Ω</p>
          <p className="font-mono">Required area: A = (1.68×10⁻⁸ Ω·m × 15.24 m × 2) / 0.18 Ω ≈ 2.85 mm²</p>
          <p className="font-mono">Result: 12 AWG wire (3.31 mm²) is required</p>
        </div>

        <h3>Example 2: Maximum Current Capacity</h3>
        <p>What is the maximum current for 14 AWG copper wire over 100 feet with a 3% voltage drop at 120V?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">14 AWG area: 2.08 mm²</p>
          <p className="font-mono">Resistance: R = (1.68×10⁻⁸ × 30.48 m × 2) / (2.08×10⁻⁶ m²) ≈ 0.49 Ω</p>
          <p className="font-mono">Maximum current: I = 3.6V / 0.49 Ω ≈ 7.3 A</p>
        </div>

        <h3>Example 3: Voltage Drop Calculation</h3>
        <p>What is the voltage drop for 16 AWG copper wire carrying 5A over 25 feet at 12V?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">16 AWG area: 1.31 mm²</p>
          <p className="font-mono">Resistance: R = (1.68×10⁻⁸ × 7.62 m × 2) / (1.31×10⁻⁶ m²) ≈ 0.20 Ω</p>
          <p className="font-mono">Voltage drop: V_drop = 5A × 0.20 Ω = 1.0 V (8.3%)</p>
        </div>
      </SEOSection>

      <SEOSection title="Wire Material: Copper vs. Aluminum">
        <p>
          The choice between copper and aluminum wires affects calculations:
        </p>
        <ul>
          <li><strong>Copper:</strong> Lower resistivity (1.68×10⁻⁸ Ω·m), better conductivity, more expensive, easier to work with</li>
          <li><strong>Aluminum:</strong> Higher resistivity (2.65×10⁻⁸ Ω·m), lighter weight, less expensive, requires larger gauge for same current</li>
        </ul>
        <p>
          Aluminum wire typically requires one or two AWG sizes larger than copper for the same current capacity. Always use the correct material resistivity in your calculations.
        </p>
      </SEOSection>

      <SEOSection title="Voltage Drop Guidelines">
        <p>
          Acceptable voltage drop depends on the application:
        </p>
        <ul>
          <li><strong>Branch Circuits:</strong> Typically 3% maximum voltage drop</li>
          <li><strong>Feeders:</strong> Typically 2% maximum voltage drop</li>
          <li><strong>Combined (Feeder + Branch):</strong> Typically 5% total maximum</li>
          <li><strong>Low Voltage Systems:</strong> May require even lower voltage drop (1-2%)</li>
        </ul>
        <p>
          Excessive voltage drop can cause equipment malfunction, reduced efficiency, and safety issues. Always consult local electrical codes for specific requirements.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is AWG and how does it relate to wire size?",
            answer: "AWG (American Wire Gauge) is a standardized system for measuring wire diameter. Lower AWG numbers indicate larger wire diameters. For example, 12 AWG is larger than 14 AWG. The system is logarithmic, so each 3-gauge decrease doubles the cross-sectional area and current-carrying capacity."
          },
          {
            question: "How do I choose between copper and aluminum wire?",
            answer: "Copper has better conductivity (lower resistance) but is more expensive. Aluminum is lighter and less expensive but requires larger gauge for the same current. Copper is more common in residential applications, while aluminum is often used in large commercial and industrial installations. Always use the correct material in calculations."
          },
          {
            question: "What is an acceptable voltage drop?",
            answer: "Acceptable voltage drop depends on the application. For branch circuits, 3% is typically the maximum. For feeders, 2% is common. Combined feeder and branch circuits should typically not exceed 5% total voltage drop. Always consult local electrical codes for specific requirements."
          },
          {
            question: "Why is wire length multiplied by 2 in calculations?",
            answer: "Wire length is multiplied by 2 because electrical current flows from the source to the load and back (round trip). The total resistance includes both the outgoing wire and the return wire, so we use 2× the one-way distance for accurate voltage drop calculations."
          },
          {
            question: "Can I use this calculator for DC and AC circuits?",
            answer: "This calculator works for DC circuits and AC circuits with resistive loads. For AC circuits with inductive or capacitive loads, additional factors (power factor, skin effect) may need consideration. For most residential and commercial applications, this calculator provides accurate results."
          },
          {
            question: "What safety factors should I consider?",
            answer: "Always consult local electrical codes and safety standards. This calculator provides theoretical values. In practice, consider: ambient temperature, wire bundling, installation method, and safety margins. When in doubt, consult a licensed electrician or electrical engineer."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Proper wire sizing is essential for electrical safety, efficiency, and code compliance. Our Wire Size Calculator simplifies these calculations, making it easy to determine appropriate wire gauge, current capacity, and voltage drop for electrical installations.
        </p>
        <p>
          Ready to explore more electrical concepts? Check out our other calculators like the {createInternalLink('watt-calculator', 'Watt Calculator')} for power calculations, or the {createInternalLink('frequency-calculator', 'Frequency Calculator')} for wave frequency analysis that often complements electrical engineering work.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

