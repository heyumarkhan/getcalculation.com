import SchwarzschildRadiusCalculator from '../../../_components/calculators/SchwarzschildRadiusCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SchwarzschildRadiusCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Schwarzschild Radius Calculator: Calculate Black Hole Event Horizon"
      description="Calculate Schwarzschild radius for any mass. Determine event horizon size using the Schwarzschild equation Rs = 2GM/c². Free online physics calculator."
      calculator={<SchwarzschildRadiusCalculator />}
      slug="physics/schwarzschild-radius-calculator"
      category="Physics"
      features={[
        "Calculate Schwarzschild radius from mass",
        "Support for multiple mass units (kilograms, solar masses)",
        "Uses Schwarzschild equation Rs = 2GM/c²",
        "Instant results with step-by-step calculations",
        "Free and no registration required"
      ]}
    >
      <SEOSection title="Understanding the Schwarzschild Radius in Astrophysics">
        <p>
          The Schwarzschild radius is the critical radius at which any massive object becomes a black hole, creating an event horizon from which nothing can escape. This fundamental concept in general relativity governs the behavior of the most extreme objects in the universe. Understanding how to calculate this critical value helps physicists and astronomers determine the conditions under which stellar collapse occurs and analyze black hole properties. Explore our {createInternalLink('gravitational-force-calculator')} to understand the gravity effects that influence this process.
        </p>
        <p>
          Named after Karl Schwarzschild, who derived this solution in 1916, the Schwarzschild radius reveals the deep connection between gravity, spacetime, and the ultimate fate of massive stars. Whether you're studying astrophysics, cosmology, or curious about black holes, our calculator provides instant insights into the extreme physics governing these phenomena.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <ol>
          <li><strong>Enter Mass:</strong> Input the mass value in kilograms or solar masses (1 solar mass = 1.989 × 10³° kg).</li>
          <li><strong>Select Units:</strong> Choose your preferred units for both input mass and output radius (meters, kilometers, or miles).</li>
          <li><strong>Get Results:</strong> The calculator instantly displays the Schwarzschild radius with detailed step-by-step calculations showing the event horizon size.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Schwarzschild Radius Formula Explained">
        <p>
          The Schwarzschild radius defines the boundary of a black hole, derived from Einstein's field equations in general relativity:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Rs = 2GM / c²</p>
        </div>
        <p>
          Where: Rs = Schwarzschild Radius (meters), G = Gravitational Constant (6.674 × 10⁻¹¹ m³ kg⁻¹ s⁻²), M = Mass (kilograms), c = Speed of Light (2.998 × 10⁸ m/s)
        </p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Calculate the Schwarzschild radius for the Sun (mass = 1.989 × 10³⁰ kg):
        </p>
        <ul>
          <li>Given: M = 1.989 × 10³⁰ kg, G = 6.674 × 10⁻¹¹ m³ kg⁻¹ s⁻², c = 2.998 × 10⁸ m/s</li>
          <li>Rs = 2 × (6.674 × 10⁻¹¹) × (1.989 × 10³⁰) / (2.998 × 10⁸)²</li>
          <li>Rs = 2.653 × 10²⁰ / 8.988 × 10¹⁶</li>
          <li>Rs ≈ 2,954 meters ≈ 2.954 kilometers</li>
          <li>Result: If the Sun were compressed to a sphere with radius ~3 km, it would become a black hole</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications of Schwarzschild Radius">
        <SEOList items={[
          "<strong>Astrophysics:</strong> Studying black hole formation and properties from stellar collapse and gravitational interactions.",
          "<strong>Cosmology:</strong> Analyzing the evolution of supermassive black holes at galactic centers and their role in galaxy formation.",
          "<strong>Gravitational Lensing:</strong> Understanding light deflection around black holes and predicting observable effects from event horizon shadows.",
          "<strong>Hawking Radiation:</strong> Calculating evaporation rates for black holes using the Schwarzschild radius as a fundamental parameter.",
          "<strong>General Relativity:</strong> Testing predictions of Einstein's theory through {createInternalLink('gravitational-force-calculator')} and spacetime curvature calculations."
        ]} />
      </SEOSection>



      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "What is the Schwarzschild radius and how is it defined?",
            answer: "The Schwarzschild radius (Rs) is the radius of the event horizon of a non-rotating black hole, calculated using Rs = 2GM/c². It represents the boundary beyond which nothing, not even light traveling at c = 2.998 × 10⁸ m/s, can escape the gravitational pull. At this critical radius, the escape velocity equals the speed of light."
          },
          {
            question: "What is the Schwarzschild radius of the Sun and Earth?",
            answer: "For the Sun (mass 1.989 × 10³⁰ kg), the Schwarzschild radius is approximately 2.95 kilometers. For Earth (mass 5.972 × 10²⁴ kg), it's approximately 8.87 millimeters. If the Sun were compressed to a 3 km sphere or Earth to a 9 mm sphere, they would become black holes."
          },
          {
            question: "How does mass affect the Schwarzschild radius?",
            answer: "The Schwarzschild radius is directly proportional to mass (Rs ∝ M). Doubling the mass doubles the Schwarzschild radius. This linear relationship shows that more massive objects have larger event horizons. Stellar-mass black holes (10 solar masses) have radii of ~30 km, while supermassive black holes (millions of solar masses) have much larger event horizons."
          },
          {
            question: "What happens at the event horizon defined by the Schwarzschild radius?",
            answer: "At the Schwarzschild radius, the escape velocity equals the speed of light. This is the point of no return - anything crossing this boundary cannot escape the black hole's gravitational field. Time dilation becomes extreme, and from an external observer's perspective, time appears to stop at the event horizon."
          },
          {
            question: "How does the speed of light affect the Schwarzschild radius?",
            answer: "The Schwarzschild radius formula (Rs = 2GM/c²) directly depends on the speed of light. The c² term in the denominator shows that as light speed increases (hypothetically), the Schwarzschild radius decreases. The formula demonstrates that black holes exist because of the finite, invariant speed of light in the universe. Learn more with our " + "speed-of-light-calculator" + "."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The Schwarzschild radius is one of the most profound concepts in physics, revealing the extreme conditions where spacetime curvature becomes so severe that event horizons form. Understanding this calculation is essential for anyone studying black holes, general relativity, or modern astrophysics. The simple formula Rs = 2GM/c² encodes the relationship between mass and the ultimate cosmic fate.
        </p>
        <p>
          Our Schwarzschild Radius Calculator makes these complex relativistic calculations instant and accessible. Explore more physics tools: Check out our {createInternalLink('density-calculator')} to understand object compression or our {createInternalLink('acceleration-calculator')} for gravitational physics concepts.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

