import AccelerationDueToGravityCalculator from '../../../_components/calculators/AccelerationDueToGravityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function AccelerationDueToGravityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Acceleration due to Gravity Calculator: Calculate g = GM/r²"
      description="Calculate acceleration due to gravity for any celestial body using g = GM/r². Free online physics calculator with preset values for Earth, Moon, Mars, Jupiter, and other planets. Supports custom mass and radius inputs."
      calculator={<AccelerationDueToGravityCalculator />}
      slug="physics/acceleration-due-to-gravity-calculator"
      category="Mechanics"
      features={[
        "Calculate gravity acceleration for any celestial body",
        "Preset values for Earth, Moon, Mars, Jupiter, and more",
        "Custom mass and radius inputs",
        "Multiple unit support (m/s², ft/s², Earth gravities)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Acceleration due to Gravity">
        <p>
          Acceleration due to gravity, denoted as <strong>g</strong>, is the acceleration that objects experience when falling freely under the influence of gravity. This fundamental constant varies depending on the celestial body&apos;s mass and radius. On Earth, the standard value is approximately <strong>9.80665 m/s²</strong>, but this value differs significantly on other planets, moons, and celestial bodies.
        </p>
        <p>
          Our Acceleration due to Gravity Calculator makes it easy to calculate gravitational acceleration using the universal formula: <strong>g = GM/r²</strong>, where G is the gravitational constant, M is the mass of the celestial body, and r is its radius. Whether you&apos;re studying physics, planning space missions, or simply curious about gravity on different planets, this calculator provides accurate results instantly.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Acceleration due to Gravity Calculator">
        <p>
          Our calculator offers two convenient methods to calculate gravitational acceleration:
        </p>
        <ol>
          <li><strong>Select a Celestial Body:</strong> Choose from preset values for Earth, Moon, Mars, Jupiter, Saturn, Venus, Mercury, Sun, Neptune, or Uranus</li>
          <li><strong>Custom Calculation:</strong> Enter the mass and radius of any celestial body to calculate its gravitational acceleration</li>
          <li><strong>Choose Units:</strong> Select your preferred units for mass, radius, and acceleration</li>
          <li><strong>Click Calculate:</strong> Get instant results with step-by-step calculations</li>
        </ol>
        <p>
          The calculator automatically uses the formula: <strong>g = GM/r²</strong>, where G = 6.67430 × 10⁻¹¹ m³/kg·s²
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Gravity Formula: g = GM/r²">
        <p>
          The acceleration due to gravity formula is derived from Newton&apos;s law of universal gravitation:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">g = GM/r²</p>
          <p className="text-sm text-gray-600 mt-2">
            Where:<br />
            g = acceleration due to gravity (m/s²)<br />
            G = gravitational constant (6.67430 × 10⁻¹¹ m³/kg·s²)<br />
            M = mass of the celestial body (kg)<br />
            r = radius of the celestial body (m)
          </p>
        </div>
        
        <h3>Derivation from Newton&apos;s Law</h3>
        <p>
          Newton&apos;s law of universal gravitation states: <strong>F = GMm/r²</strong>, where F is the gravitational force between two objects of masses M and m, separated by distance r.
        </p>
        <p>
          For an object of mass m near the surface of a celestial body of mass M and radius r, the gravitational force is F = GMm/r². By Newton&apos;s second law (F = ma), we get:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ma = GMm/r²</p>
          <p className="font-mono mt-2">a = GM/r²</p>
          <p className="font-mono mt-2">g = GM/r²</p>
        </div>
      </SEOSection>

      <SEOSection title="Gravity Values for Different Celestial Bodies">
        <p>
          Acceleration due to gravity varies significantly across different celestial bodies:
        </p>
        <SEOList items={[
          "Earth: 9.80665 m/s² (standard gravity)",
          "Moon: 1.62 m/s² (about 1/6 of Earth's gravity)",
          "Mars: 3.71 m/s² (about 38% of Earth's gravity)",
          "Jupiter: 24.79 m/s² (about 2.5 times Earth's gravity)",
          "Saturn: 10.44 m/s² (slightly more than Earth)",
          "Venus: 8.87 m/s² (slightly less than Earth)",
          "Mercury: 3.7 m/s² (similar to Mars)",
          "Sun: 274.0 m/s² (about 28 times Earth's gravity)",
          "Neptune: 11.15 m/s² (slightly more than Earth)",
          "Uranus: 8.87 m/s² (similar to Venus)"
        ]} />
        <p>
          <strong>Note:</strong> These values are calculated at the surface of each celestial body. Gravity decreases with altitude according to the inverse square law.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Understanding acceleration due to gravity is essential in many fields:
        </p>
        <SEOList items={[
          "Space Exploration: Planning missions to other planets and calculating landing forces",
          "Engineering: Designing structures, vehicles, and equipment for different gravitational environments",
          "Physics Education: Teaching fundamental concepts of gravitation and mechanics",
          "Astronomy: Understanding planetary formation and orbital mechanics",
          "Sports Science: Analyzing athletic performance in different gravitational conditions",
          "Aerospace: Calculating fuel requirements and trajectory planning",
          "Geophysics: Studying Earth's gravitational field variations"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports multiple units for convenience:
        </p>
        <ul>
          <li><strong>Mass:</strong> Kilograms (kg), Grams (g), Metric Tons (t), Pounds (lb), Earth Masses</li>
          <li><strong>Radius:</strong> Meters (m), Kilometers (km), Centimeters (cm), Feet (ft), Miles (mi), Earth Radii</li>
          <li><strong>Acceleration:</strong> m/s² (meters per second squared), ft/s² (feet per second squared), g (Earth gravities, where 1 g = 9.80665 m/s²)</li>
        </ul>
        <p>
          <strong>Tip:</strong> The calculator automatically converts between units, so you can mix different unit systems. For example, you can enter mass in Earth masses and radius in kilometers, and get acceleration in m/s².
        </p>
      </SEOSection>

      <SEOSection title="Common Gravity Calculations">
        <h3>Example 1: Earth&apos;s Gravity</h3>
        <p>Calculate Earth&apos;s gravitational acceleration using Earth&apos;s mass (5.972 × 10²⁴ kg) and radius (6.371 × 10⁶ m):</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">g = GM/r²</p>
          <p className="font-mono mt-2">g = (6.67430 × 10⁻¹¹ × 5.972 × 10²⁴) / (6.371 × 10⁶)²</p>
          <p className="font-mono mt-2">g = 9.80665 m/s²</p>
        </div>

        <h3>Example 2: Moon&apos;s Gravity</h3>
        <p>Calculate the Moon&apos;s gravitational acceleration using Moon&apos;s mass (7.342 × 10²² kg) and radius (1.737 × 10⁶ m):</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">g = GM/r²</p>
          <p className="font-mono mt-2">g = (6.67430 × 10⁻¹¹ × 7.342 × 10²²) / (1.737 × 10⁶)²</p>
          <p className="font-mono mt-2">g = 1.62 m/s²</p>
        </div>

        <h3>Example 3: Custom Celestial Body</h3>
        <p>Calculate gravity for a hypothetical planet with mass 2 × 10²⁴ kg and radius 5 × 10⁶ m:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">g = GM/r²</p>
          <p className="font-mono mt-2">g = (6.67430 × 10⁻¹¹ × 2 × 10²⁴) / (5 × 10⁶)²</p>
          <p className="font-mono mt-2">g = 5.34 m/s²</p>
        </div>
      </SEOSection>

      <SEOSection title="Factors Affecting Gravity">
        <p>
          Several factors influence the acceleration due to gravity:
        </p>
        <ul>
          <li><strong>Mass:</strong> Larger mass results in stronger gravitational acceleration</li>
          <li><strong>Radius:</strong> Larger radius results in weaker gravitational acceleration (inverse square relationship)</li>
          <li><strong>Altitude:</strong> Gravity decreases with distance from the surface (g ∝ 1/r²)</li>
          <li><strong>Planetary Shape:</strong> Non-spherical bodies have varying gravity at different locations</li>
          <li><strong>Rotation:</strong> Centrifugal force from rotation slightly reduces effective gravity at the equator</li>
        </ul>
      </SEOSection>

      <SEOSection title="Gravity vs. Weight">
        <p>
          It&apos;s important to distinguish between gravity and weight:
        </p>
        <ul>
          <li><strong>Gravity (g):</strong> The acceleration due to gravitational force, measured in m/s²</li>
          <li><strong>Weight (W):</strong> The force exerted by gravity on an object, calculated as W = mg, measured in Newtons</li>
        </ul>
        <p>
          While gravity is a property of the celestial body, weight depends on both gravity and the object&apos;s mass. An object weighs less on the Moon not because the Moon&apos;s gravity is different (it is), but because the gravitational acceleration is lower.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the standard value of g on Earth?",
            answer: "The standard acceleration due to gravity on Earth is 9.80665 m/s². This value is used as a reference and is defined by the International System of Units (SI)."
          },
          {
            question: "Why does gravity vary on different planets?",
            answer: "Gravity depends on the planet's mass and radius. Larger planets with more mass have stronger gravity, but larger radius reduces surface gravity. The formula g = GM/r² shows this relationship."
          },
          {
            question: "How does altitude affect gravity?",
            answer: "Gravity decreases with altitude according to the inverse square law. As you move farther from the center of a planet, the gravitational acceleration decreases. At twice the radius, gravity is 1/4 as strong."
          },
          {
            question: "Can I calculate gravity for any object?",
            answer: "Yes! The formula g = GM/r² works for any celestial body. However, for very small objects, the gravitational acceleration is negligible. The formula is most useful for planets, moons, stars, and other large celestial bodies."
          },
          {
            question: "What is the gravitational constant G?",
            answer: "The gravitational constant (G = 6.67430 × 10⁻¹¹ m³/kg·s²) is a fundamental physical constant that appears in Newton's law of universal gravitation. It determines the strength of gravitational attraction between objects."
          },
          {
            question: "How is gravity different from gravitational force?",
            answer: "Gravity (g) is the acceleration due to gravitational force, measured in m/s². Gravitational force (F) is the actual force between two objects, calculated as F = GMm/r², measured in Newtons. Weight is the gravitational force on an object."
          },
          {
            question: "Why is the Moon's gravity weaker than Earth's?",
            answer: "The Moon has less mass (about 1/81 of Earth's mass) and a smaller radius, but the radius effect is more significant. Using g = GM/r², the Moon's smaller mass and radius result in gravity that's about 1/6 of Earth's gravity."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Physics Concepts">
        <p>
          Understanding acceleration due to gravity connects to many other physics concepts:
        </p>
        <SEOList items={[
          "Free Fall Motion: Objects falling under gravity follow equations like v = gt and h = ½gt²",
          "Projectile Motion: Gravity affects the trajectory of projectiles",
          "Orbital Mechanics: Gravity determines orbital velocities and periods",
          "Weight and Mass: Weight = mg, where g is gravitational acceleration",
          "Potential Energy: PE = mgh, where g is gravitational acceleration",
          "Escape Velocity: The speed needed to escape a planet's gravity depends on g"
        ]} />
        <p>
          Explore our other physics calculators like the {createInternalLink('free-fall-calculator', 'Free Fall Calculator')}, {createInternalLink('projectile-motion-calculator', 'Projectile Motion Calculator')}, and {createInternalLink('gravitational-force-calculator', 'Gravitational Force Calculator')} to see how gravity affects motion and forces.
        </p>
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Acceleration due to gravity is a fundamental concept in physics that explains how objects fall and how celestial bodies interact. Our Acceleration due to Gravity Calculator makes it easy to calculate gravitational acceleration for any celestial body, whether you&apos;re using preset values for planets or custom mass and radius inputs.
        </p>
        <p>
          Understanding gravity is essential for space exploration, engineering, and physics education. Use this calculator to explore how gravity varies across the solar system and beyond, and discover the fascinating physics behind one of nature&apos;s fundamental forces.
        </p>
        <p>
          Ready to explore more physics concepts? Check out our other {createInternalLink('physics', 'Physics calculators')} for related topics in mechanics, kinematics, and gravitational physics.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

