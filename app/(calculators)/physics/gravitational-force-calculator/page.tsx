import GravitationalForceCalculator from '../../../_components/calculators/GravitationalForceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GravitationalForceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Gravitational Force Calculator: Calculate F = G × (m₁ × m₂) / r²"
      description="Calculate gravitational force, mass, or distance using F = G × (m₁ × m₂) / r². Free online mechanics calculator for physics and astronomy with Newton's law of universal gravitation."
      calculator={<GravitationalForceCalculator />}
      slug="physics/gravitational-force-calculator"
      category="Mechanics"
      features={[
        "Calculate gravitational force, mass, or distance",
        "Instant mechanics calculations",
        "Multiple unit support (N, kg, m, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Gravitational Force: Newton's Law of Universal Gravitation">
        <p>
          Gravitational force is one of the four fundamental forces in nature and is responsible for keeping planets in orbit, holding galaxies together, and causing objects to fall to Earth. Sir Isaac Newton discovered that every object in the universe attracts every other object with a force proportional to their masses and inversely proportional to the square of the distance between them. Our Gravitational Force Calculator makes it easy to calculate gravitational force, mass, or distance using Newton&apos;s law of universal gravitation: <strong>F = G × (m₁ × m₂) / r²</strong>.
        </p>
        <p>
          This fundamental law describes the attractive force between any two objects with mass. Whether you&apos;re studying planetary motion, calculating orbital mechanics, or understanding the force between everyday objects, understanding gravitational force is essential to physics and astronomy. Despite being the weakest of the four fundamental forces, gravity has infinite range and shapes the large-scale structure of the universe.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Gravitational Force Calculator">
        <p>
          Our Gravitational Force Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Three Values:</strong> Input any three of the four values (gravitational force, mass 1, mass 2, or distance)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with automatic unit conversion</li>
        </ol>
        <p>
          The calculator uses Newton&apos;s law of universal gravitation: <strong>F = G × (m₁ × m₂) / r²</strong>
        </p>
        <p>
          You can rearrange this formula to solve for any variable:
        </p>
        <ul>
          <li><strong>Gravitational Force:</strong> F = G × (m₁ × m₂) / r²</li>
          <li><strong>Mass 1:</strong> m₁ = (F × r²) / (G × m₂)</li>
          <li><strong>Mass 2:</strong> m₂ = (F × r²) / (G × m₁)</li>
          <li><strong>Distance:</strong> r = √(G × m₁ × m₂ / F)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Understanding Newton's Law of Universal Gravitation">
        <p>
          Newton&apos;s law of universal gravitation is one of the most important equations in physics:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">F = G × (m₁ × m₂) / r²</p>
          <p className="text-sm text-gray-600 mt-2">Where: F = gravitational force, G = gravitational constant, m₁, m₂ = masses, r = distance</p>
        </div>
        
        <h3>What is the Gravitational Constant?</h3>
        <p>
          The gravitational constant (G) is a fundamental physical constant:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono text-center">G = 6.67430 × 10⁻¹¹ N⋅m²/kg²</p>
        </div>
        <p>
          This small value explains why gravitational forces between everyday objects are imperceptible, while the force between massive objects like planets is significant.
        </p>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Gravitational Force (F):</strong> The attractive force between two objects, measured in Newtons (N)</li>
          <li><strong>Mass (m₁, m₂):</strong> The amount of matter in each object, measured in kilograms (kg)</li>
          <li><strong>Distance (r):</strong> The distance between the centers of the two objects, measured in meters (m)</li>
          <li><strong>Inverse Square Law:</strong> Force decreases with the square of distance - double the distance, force becomes 1/4</li>
          <li><strong>Universal:</strong> The law applies to all objects with mass, from subatomic particles to galaxies</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Gravitational force calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Astronomy: Calculating orbital mechanics, planetary motion, and satellite trajectories",
          "Space Exploration: Designing spacecraft trajectories and orbital maneuvers",
          "Satellite Technology: Placing satellites in geostationary and other orbits",
          "Astrophysics: Understanding galaxy formation, star systems, and cosmic structure",
          "Engineering: Designing space missions and orbital systems",
          "Education: Teaching fundamental physics principles and celestial mechanics",
          "Research: Studying gravitational waves and general relativity",
          "Navigation: GPS systems account for gravitational effects",
          "Tides: Understanding ocean tides caused by Moon and Sun gravity"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your calculations. Our calculator supports multiple unit systems and automatically converts between them:
        </p>
        
        <h3>Force Units</h3>
        <ul>
          <li><strong>Metric:</strong> N (Newtons), kN (Kilonewtons), mN (Millinewtons)</li>
          <li><strong>Imperial:</strong> lb (Pounds-force), oz (Ounce-force)</li>
        </ul>

        <h3>Mass Units</h3>
        <ul>
          <li><strong>Metric:</strong> kg (Kilograms), g (Grams), mg (Milligrams), ton (Metric tons)</li>
          <li><strong>Imperial:</strong> lb (Pounds), oz (Ounces), ton (US tons)</li>
        </ul>

        <h3>Distance Units</h3>
        <ul>
          <li><strong>Metric:</strong> m (Meters), km (Kilometers), cm (Centimeters), mm (Millimeters)</li>
          <li><strong>Imperial:</strong> ft (Feet), in (Inches), mi (Miles)</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles unit conversions, so you can mix different unit systems. However, note that the gravitational constant G is always in SI units (N⋅m²/kg²), so conversions are done internally.
        </p>
      </SEOSection>

      <SEOSection title="Common Gravitational Force Calculations">
        <h3>Example 1: Calculating Gravitational Force Between Two Objects</h3>
        <p>Two objects with masses of 100 kg and 200 kg are 5 meters apart. What is the gravitational force between them?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = G × (m₁ × m₂) / r² = 6.67430 × 10⁻¹¹ × (100 × 200) / 5² = 5.34 × 10⁻⁸ N</p>
          <p className="text-sm text-gray-600 mt-1">This is an extremely small force, which is why we don&apos;t notice gravity between everyday objects</p>
        </div>

        <h3>Example 2: Earth-Moon Gravitational Force</h3>
        <p>Calculate the gravitational force between Earth (5.97 × 10²⁴ kg) and the Moon (7.35 × 10²² kg) at their average distance (3.84 × 10⁸ m).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = 6.67430 × 10⁻¹¹ × (5.97 × 10²⁴ × 7.35 × 10²²) / (3.84 × 10⁸)² ≈ 1.98 × 10²⁰ N</p>
          <p className="text-sm text-gray-600 mt-1">This massive force keeps the Moon in orbit around Earth</p>
        </div>

        <h3>Example 3: Calculating Mass from Force</h3>
        <p>The gravitational force between two objects is 1.0 × 10⁻⁶ N. One object has a mass of 500 kg, and they are 10 m apart. What is the mass of the second object?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m₂ = (F × r²) / (G × m₁) = (1.0 × 10⁻⁶ × 10²) / (6.67430 × 10⁻¹¹ × 500) ≈ 299.6 kg</p>
        </div>

        <h3>Example 4: Calculating Distance from Force</h3>
        <p>Two 1000 kg objects attract each other with a force of 6.67 × 10⁻⁶ N. How far apart are they?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">r = √(G × m₁ × m₂ / F) = √(6.67430 × 10⁻¹¹ × 1000 × 1000 / 6.67 × 10⁻⁶) ≈ 1.0 m</p>
        </div>

        <h3>Example 5: Gravitational Force on Earth's Surface</h3>
        <p>Calculate the gravitational force between Earth (5.97 × 10²⁴ kg) and a 70 kg person at Earth&apos;s surface (radius = 6.37 × 10⁶ m).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = 6.67430 × 10⁻¹¹ × (5.97 × 10²⁴ × 70) / (6.37 × 10⁶)² ≈ 686 N</p>
          <p className="text-sm text-gray-600 mt-1">This equals the person&apos;s weight: 686 N ≈ 70 kg × 9.8 m/s²</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding the Inverse Square Law">
        <p>
          Gravitational force follows an inverse square law with distance:
        </p>
        <ul>
          <li><strong>Double the Distance:</strong> Force becomes 1/4 (2² = 4)</li>
          <li><strong>Triple the Distance:</strong> Force becomes 1/9 (3² = 9)</li>
          <li><strong>Half the Distance:</strong> Force becomes 4 times stronger (0.5² = 0.25, so 1/0.25 = 4)</li>
        </ul>
        <p>
          This relationship means gravitational force decreases rapidly with distance, which is why the force between distant objects is so small, while nearby objects (like you and Earth) experience significant gravitational attraction.
        </p>
      </SEOSection>

      <SEOSection title="Gravitational Force vs. Weight">
        <p>
          It&apos;s important to understand the difference between gravitational force and weight:
        </p>
        <ul>
          <li><strong>Gravitational Force:</strong> The actual force between two objects (F = G × m₁ × m₂ / r²)</li>
          <li><strong>Weight:</strong> The gravitational force on an object due to Earth (W = m × g, where g = 9.8 m/s²)</li>
          <li><strong>Relationship:</strong> On Earth&apos;s surface, weight is a special case of gravitational force where one object is Earth</li>
          <li><strong>g (gravity):</strong> Can be derived from Newton&apos;s law: g = G × M_earth / r_earth² ≈ 9.8 m/s²</li>
        </ul>
        <p>
          When you calculate the gravitational force between a person and Earth using Newton&apos;s law, you get the same result as calculating weight using W = mg.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          While gravitational forces between everyday objects are too small to notice, understanding them has practical applications:
        </p>
        <SEOList items={[
          "Understanding Weight: Why objects have weight and why it changes on different planets",
          "Orbital Mechanics: How satellites stay in orbit and why they don&apos;t fall",
          "Space Exploration: Planning missions and understanding planetary motion",
          "Tides: Understanding ocean tides caused by gravitational forces",
          "GPS Technology: Accounting for gravitational effects on satellite clocks",
          "Astronomy: Understanding planetary systems, galaxies, and cosmic structure",
          "Physics Education: Learning fundamental forces and their properties"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between gravitational force, mass, and distance?",
            answer: "Gravitational force (F) is directly proportional to the product of the two masses (m₁ × m₂) and inversely proportional to the square of the distance (r²): F = G × (m₁ × m₂) / r². This means larger masses produce stronger forces, and increasing distance dramatically decreases the force (inverse square law)."
          },
          {
            question: "What is the gravitational constant G?",
            answer: "The gravitational constant (G) is 6.67430 × 10⁻¹¹ N⋅m²/kg². It&apos;s a fundamental physical constant that appears in Newton&apos;s law of universal gravitation. Despite being very small, it allows us to calculate gravitational forces between any two objects with mass. It was first measured by Henry Cavendish in 1798."
          },
          {
            question: "Why is gravitational force so weak between everyday objects?",
            answer: "Gravitational force is weak because the gravitational constant G is extremely small (6.67430 × 10⁻¹¹). This means you need very large masses (like planets) or very small distances to produce noticeable forces. For example, the gravitational force between two 1 kg objects 1 meter apart is only about 6.67 × 10⁻¹¹ Newtons - completely imperceptible."
          },
          {
            question: "How does distance affect gravitational force?",
            answer: "Gravitational force follows an inverse square law with distance. If you double the distance, the force becomes 1/4 as strong. If you triple the distance, the force becomes 1/9 as strong. This is because force is proportional to 1/r². The rapid decrease with distance explains why only nearby or very massive objects produce significant gravitational forces."
          },
          {
            question: "What's the difference between gravitational force and gravitational field?",
            answer: "Gravitational force (F) is the actual force between two objects. Gravitational field (g) is the force per unit mass that would be experienced by a test mass at a point in space. On Earth&apos;s surface, g ≈ 9.8 m/s². The field strength is related to force by: g = F/m, and for a point mass M, g = G × M / r²."
          },
          {
            question: "Can gravitational force be negative?",
            answer: "Gravitational force is always attractive, so it&apos;s always positive in magnitude. However, when working with vectors (forces with direction), gravitational force vectors point toward each other. The magnitude is always positive, but the direction indicates attraction."
          },
          {
            question: "How is gravitational force related to orbital motion?",
            answer: "Gravitational force provides the centripetal force needed for orbital motion. For a circular orbit, F_gravity = F_centripetal, so G × m₁ × m₂ / r² = m × v² / r. This relationship determines orbital speed and period. Without gravitational force, objects would move in straight lines rather than orbits."
          },
          {
            question: "Does Einstein's theory of relativity replace Newton's law?",
            answer: "Einstein&apos;s general relativity is a more complete theory that reduces to Newton&apos;s law for weak gravitational fields and low speeds. Newton&apos;s law is still accurate for most practical purposes (planets, satellites, everyday objects). General relativity is needed for extremely strong fields (black holes), high speeds, or when extreme precision is required (like GPS systems)."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding gravitational force and Newton&apos;s law of universal gravitation is fundamental to mechanics, astronomy, and our understanding of the universe. Our Gravitational Force Calculator simplifies these calculations, making it easy to solve problems involving gravitational attraction, orbital mechanics, and celestial motion.
        </p>
        <p>
          Whether you&apos;re calculating forces between planets, understanding orbital mechanics, or studying fundamental physics, this calculator provides accurate results with support for multiple unit systems. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('torque-calculator')} for rotational mechanics, or use our {createInternalLink('acceleration-calculator')} for acceleration calculations that often complement gravitational force analysis in orbital dynamics.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

