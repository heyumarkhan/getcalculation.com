import CoulombsLawCalculator from '../../../_components/calculators/CoulombsLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function CoulombsLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Coulomb's Law Calculator: Calculate Electrostatic Force (F = k×q₁×q₂/r²)"
      description="Calculate electrostatic force using F = k × (q₁ × q₂) / r². Free online electrostatics calculator for charge interactions and electric force calculations."
      calculator={<CoulombsLawCalculator />}
      slug="physics/coulombs-law-calculator"
      category="Electromagnetism"
      features={[
        "Calculate electrostatic force from charges and distance",
        "Calculate charge from force and distance",
        "Calculate distance from force and charges",
        "Support for positive and negative charges",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Coulomb's Law: Fundamental Electrostatics">
        <p>
          Coulomb&apos;s Law describes the electrostatic force between two charged particles. This fundamental law of electrostatics, discovered by Charles-Augustin de Coulomb in 1785, quantifies how electric charges interact with each other. Our Coulomb&apos;s Law Calculator makes it easy to calculate electrostatic forces using the formula: <strong>F = k × (q₁ × q₂) / r²</strong>.
        </p>
        <p>
          Whether you&apos;re studying electrostatics, analyzing charge interactions, or designing electrical systems, this calculator simplifies Coulomb&apos;s Law calculations with support for multiple units and both positive and negative charges.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Coulomb's Law Calculator">
        <p>
          Our Coulomb&apos;s Law Calculator is designed for simplicity and accuracy. Follow these steps:
        </p>
        <ol>
          <li><strong>Enter Three Values:</strong> Input any three of the four values (force, charge 1, charge 2, or distance)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Use Negative Values:</strong> Enter negative charges with a minus sign (e.g., -1.6e-19 for an electron)</li>
          <li><strong>Select Units:</strong> Choose your preferred units for force, charge, and distance</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with step-by-step solutions</li>
        </ol>
        <p>
          The calculator uses the formula: <strong>F = k × (q₁ × q₂) / r²</strong>, where k = 8.99 × 10⁹ N·m²/C².
        </p>
      </SEOSection>

      <SEOSection title="Understanding Coulomb's Law Formula">
        <p>
          Coulomb&apos;s Law is expressed as:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">F = k × (q₁ × q₂) / r²</p>
          <p className="text-sm text-gray-600 mt-2">Where: F = Electrostatic force, k = Coulomb&apos;s constant, q₁, q₂ = Charges, r = Distance between charges</p>
        </div>

        <h3>Key Components</h3>
        <ul>
          <li><strong>Force (F):</strong> The magnitude of the electrostatic force between two charges, measured in Newtons (N)</li>
          <li><strong>Coulomb&apos;s Constant (k):</strong> k = 8.99 × 10⁹ N·m²/C² (approximately 9 × 10⁹ N·m²/C²)</li>
          <li><strong>Charges (q₁, q₂):</strong> The magnitudes of the two charges, measured in Coulombs (C)</li>
          <li><strong>Distance (r):</strong> The separation distance between the two charges, measured in meters (m)</li>
        </ul>

        <h3>Force Direction</h3>
        <ul>
          <li><strong>Like Charges:</strong> Charges with the same sign (both positive or both negative) repel each other</li>
          <li><strong>Opposite Charges:</strong> Charges with opposite signs (one positive, one negative) attract each other</li>
          <li><strong>Force Magnitude:</strong> The formula gives the magnitude; the direction depends on charge signs</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Coulomb&apos;s Law calculations are essential in numerous real-world scenarios:
        </p>
        <SEOList items={[
          "Atomic Physics: Understanding forces between electrons and nuclei in atoms",
          "Particle Physics: Analyzing interactions between charged particles",
          "Electrostatic Precipitators: Designing air pollution control systems",
          "Electrostatic Spraying: Optimizing paint and coating applications",
          "Capacitor Design: Understanding charge interactions in capacitors",
          "Electrostatic Separation: Separating materials based on charge",
          "Lightning Protection: Understanding charge buildup and discharge",
          "Electrostatic Printing: Xerography and laser printing technologies",
          "Ion Traps: Confining charged particles for research",
          "Electrostatic Discharge (ESD): Preventing damage in electronics"
        ]} />
      </SEOSection>

      <SEOSection title="Coulomb's Constant">
        <p>
          Coulomb&apos;s constant (k) is a fundamental constant in electrostatics:
        </p>
        <ul>
          <li><strong>Value:</strong> k = 8.99 × 10⁹ N·m²/C² (approximately 9 × 10⁹ N·m²/C²)</li>
          <li><strong>Alternative Form:</strong> k = 1 / (4πε₀), where ε₀ is the permittivity of free space</li>
          <li><strong>Permittivity of Free Space:</strong> ε₀ = 8.85 × 10⁻¹² C²/(N·m²)</li>
          <li><strong>Relationship:</strong> k = 1 / (4π × 8.85 × 10⁻¹²) ≈ 8.99 × 10⁹ N·m²/C²</li>
        </ul>
        <p>
          The constant appears in all electrostatic force calculations and relates the force to charge magnitudes and separation distance.
        </p>
      </SEOSection>

      <SEOSection title="Common Coulomb's Law Calculations">
        <h3>Example 1: Two Point Charges</h3>
        <p>Two charges of +2 μC and +3 μC are separated by 0.5 m. What is the force between them?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = k × (q₁ × q₂) / r²</p>
          <p className="font-mono">F = (8.99 × 10⁹) × (2 × 10⁻⁶ × 3 × 10⁻⁶) / (0.5)²</p>
          <p className="font-mono">F = (8.99 × 10⁹) × (6 × 10⁻¹²) / 0.25 = 0.216 N (repulsive)</p>
        </div>

        <h3>Example 2: Electron and Proton</h3>
        <p>An electron (q = -1.6 × 10⁻¹⁹ C) and a proton (q = +1.6 × 10⁻¹⁹ C) are 1 × 10⁻¹⁰ m apart. What is the force?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = (8.99 × 10⁹) × (1.6 × 10⁻¹⁹ × 1.6 × 10⁻¹⁹) / (1 × 10⁻¹⁰)²</p>
          <p className="font-mono">F = (8.99 × 10⁹) × (2.56 × 10⁻³⁸) / (1 × 10⁻²⁰) = 2.3 × 10⁻⁸ N (attractive)</p>
        </div>

        <h3>Example 3: Finding Distance</h3>
        <p>Two charges of +5 μC each experience a force of 0.1 N. What is the distance between them?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">r = √(k × q₁ × q₂ / F)</p>
          <p className="font-mono">r = √((8.99 × 10⁹) × (5 × 10⁻⁶ × 5 × 10⁻⁶) / 0.1)</p>
          <p className="font-mono">r = √(2.2475) = 1.5 m</p>
        </div>

        <h3>Example 4: Finding Charge</h3>
        <p>A charge experiences a force of 0.05 N when 0.2 m from a +10 μC charge. What is the magnitude of the first charge?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">q₁ = (F × r²) / (k × q₂)</p>
          <p className="font-mono">q₁ = (0.05 × 0.2²) / (8.99 × 10⁹ × 10 × 10⁻⁶)</p>
          <p className="font-mono">q₁ = 0.002 / 89,900 = 2.22 × 10⁻⁸ C = 22.2 nC</p>
        </div>
      </SEOSection>

      <SEOSection title="Charge Properties">
        <p>
          Understanding charge properties is essential for Coulomb&apos;s Law:
        </p>
        <ul>
          <li><strong>Elementary Charge:</strong> e = 1.602 × 10⁻¹⁹ C (charge of a proton or electron)</li>
          <li><strong>Charge Quantization:</strong> All charges are integer multiples of the elementary charge</li>
          <li><strong>Charge Conservation:</strong> Total charge in an isolated system remains constant</li>
          <li><strong>Charge Types:</strong>
            <ul className="ml-4 mt-1">
              <li>Positive charges: Protons, positive ions</li>
              <li>Negative charges: Electrons, negative ions</li>
              <li>Neutral: Equal numbers of positive and negative charges</li>
            </ul>
          </li>
        </ul>
      </SEOSection>

      <SEOSection title="Comparison with Gravitational Force">
        <p>
          Coulomb&apos;s Law is mathematically similar to Newton&apos;s Law of Universal Gravitation:
        </p>
        <ul>
          <li><strong>Coulomb&apos;s Law:</strong> F = k × (q₁ × q₂) / r²</li>
          <li><strong>Gravitational Law:</strong> F = G × (m₁ × m₂) / r²</li>
        </ul>
        <p>
          <strong>Key Differences:</strong>
        </p>
        <ul>
          <li>Electrostatic force can be attractive or repulsive (depends on charge signs)</li>
          <li>Gravitational force is always attractive</li>
          <li>Electrostatic force is much stronger than gravitational force for atomic-scale particles</li>
          <li>Coulomb&apos;s constant (k ≈ 9 × 10⁹) is much larger than gravitational constant (G ≈ 6.67 × 10⁻¹¹)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Understanding charge and force units is crucial for accurate calculations:
        </p>
        <ul>
          <li><strong>Charge Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Coulomb (C): Base SI unit</li>
              <li>Millicoulomb (mC): 1 mC = 0.001 C</li>
              <li>Microcoulomb (μC): 1 μC = 10⁻⁶ C</li>
              <li>Nanocoulomb (nC): 1 nC = 10⁻⁹ C</li>
              <li>Elementary charge (e): 1 e = 1.602 × 10⁻¹⁹ C</li>
            </ul>
          </li>
          <li><strong>Force Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Newton (N): Base SI unit</li>
              <li>Kilonewton (kN): 1 kN = 1,000 N</li>
              <li>Millinewton (mN): 1 mN = 0.001 N</li>
              <li>Dyne: 1 dyn = 10⁻⁵ N</li>
            </ul>
          </li>
          <li><strong>Distance Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Meter (m): Base SI unit</li>
              <li>Centimeter (cm): 1 cm = 0.01 m</li>
              <li>Millimeter (mm): 1 mm = 0.001 m</li>
              <li>Micrometer (μm): 1 μm = 10⁻⁶ m</li>
              <li>Nanometer (nm): 1 nm = 10⁻⁹ m</li>
            </ul>
          </li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is Coulomb's Law?",
            answer: "Coulomb's Law describes the electrostatic force between two charged particles: F = k × (q₁ × q₂) / r², where F is the force, k is Coulomb's constant (8.99 × 10⁹ N·m²/C²), q₁ and q₂ are the charges, and r is the distance between them. Like charges repel, opposite charges attract."
          },
          {
            question: "How do I calculate electrostatic force?",
            answer: "Use the formula F = k × (q₁ × q₂) / r², where k = 8.99 × 10⁹ N·m²/C². For example, two charges of +2 μC and +3 μC separated by 0.5 m: F = (8.99 × 10⁹) × (2 × 10⁻⁶ × 3 × 10⁻⁶) / (0.5)² = 0.216 N (repulsive force)."
          },
          {
            question: "What is Coulomb's constant?",
            answer: "Coulomb's constant (k) is 8.99 × 10⁹ N·m²/C² (approximately 9 × 10⁹). It can also be expressed as k = 1 / (4πε₀), where ε₀ is the permittivity of free space (8.85 × 10⁻¹² C²/(N·m²)). This constant appears in all electrostatic force calculations."
          },
          {
            question: "Do like charges attract or repel?",
            answer: "Like charges (both positive or both negative) repel each other. Opposite charges (one positive, one negative) attract each other. The force magnitude is always positive, but the direction depends on the charge signs."
          },
          {
            question: "How does distance affect electrostatic force?",
            answer: "Electrostatic force is inversely proportional to the square of the distance (F ∝ 1/r²). Doubling the distance reduces the force by a factor of 4. Tripling the distance reduces the force by a factor of 9. This is called an inverse-square law relationship."
          },
          {
            question: "Can Coulomb's Law be used for multiple charges?",
            answer: "For multiple charges, use the principle of superposition: calculate the force from each charge separately, then add them vectorially. The total force on a charge is the vector sum of all individual forces from other charges in the system."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding Coulomb&apos;s Law is fundamental to electrostatics, atomic physics, and electrical engineering. Our Coulomb&apos;s Law Calculator simplifies these calculations, making it easy to determine electrostatic forces, charges, and distances in various applications.
        </p>
        <p>
          Ready to explore more electromagnetism concepts? Check out our other calculators like the {createInternalLink('watt-calculator', 'Watt Calculator')} for electrical power calculations, or the {createInternalLink('hp-to-amps-calculator', 'HP to Amps Calculator')} for motor current calculations that complement electrostatic analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

