import WeightOnOtherPlanetsCalculator from '../../../_components/calculators/WeightOnOtherPlanetsCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function WeightOnOtherPlanetsCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Weight on Other Planets Calculator: Calculate Weight W = m × g"
      description="Calculate your weight on different planets, moons, and celestial bodies using the formula W = m × g. Free online physics calculator comparing weight across Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, and the Sun."
      calculator={<WeightOnOtherPlanetsCalculator primaryColor="#820ECC" />}
      slug="physics/weight-on-other-planets-calculator"
      category="Mechanics"
      features={[
        "Calculate weight on all major planets",
        "Calculate weight on the Moon",
        "Compare weight across the solar system",
        "Support for multiple mass units (kg, g, lb, oz, stone)",
        "Support for multiple weight units (N, kN, lbf, kgf)",
        "Real gravity values for Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto, and the Sun",
        "Step-by-step calculations with formulas",
        "Visual comparison grid",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Weight on Other Planets">
        <p>
          Weight is a measure of the force of gravity acting on an object&apos;s mass. While an object&apos;s mass remains constant everywhere in the universe, its weight varies depending on the gravitational pull of the celestial body it&apos;s on. This fundamental concept in physics helps us understand how gravity differs across the solar system.
        </p>
        <p>
          Our <strong>Weight on Other Planets Calculator</strong> allows you to discover how much you would weigh on different planets, moons, and celestial bodies using the fundamental formula: <strong>W = m × g</strong>, where W is weight, m is mass, and g is gravitational acceleration. Whether you&apos;re curious about space exploration, studying physics, or learning about planetary science, this calculator provides accurate results for all major celestial bodies in our solar system.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Weight on Other Planets Calculator">
        <p>
          Our calculator is designed for ease of use and provides instant weight comparisons across the solar system:
        </p>
        <ol>
          <li><strong>Enter Your Mass:</strong> Input your mass in kilograms, pounds, grams, ounces, or stone</li>
          <li><strong>Select Weight Unit:</strong> Choose how you want the results displayed (Newtons, kilonewtons, pound-force, or kilogram-force)</li>
          <li><strong>Click Calculate:</strong> Get instant results showing your weight on all planets and the Moon</li>
          <li><strong>Review Results:</strong> See a visual grid comparing your weight across the solar system with gravity information for each body</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and displays step-by-step calculations for complete transparency and educational value.
        </p>
      </SEOSection>

      <SEOSection title="The Weight Formula: W = m × g">
        <p>
          The fundamental relationship between mass, gravity, and weight is expressed by the simple but powerful formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">W = m × g</p>
          <p className="text-sm text-gray-600 mt-2">
            Where:
            <br />
            <strong>W</strong> = Weight (Force measured in Newtons or other force units)
            <br />
            <strong>m</strong> = Mass (measured in kilograms or other mass units)
            <br />
            <strong>g</strong> = Gravitational Acceleration (measured in m/s²)
          </p>
        </div>

        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "Mass (m): An intrinsic property of matter that remains constant everywhere in the universe. It is measured in kilograms (SI unit) or other mass units. Your mass would be the same on Earth, Mars, or Jupiter.",
          "Weight (W): The force exerted on an object by gravity. It varies depending on the gravitational field of the celestial body. Weight is measured in Newtons (N) in the SI system, where 1 N = 1 kg⋅m/s².",
          "Gravitational Acceleration (g): The acceleration imparted to an object by gravity, measured in meters per second squared (m/s²). On Earth, g ≈ 9.81 m/s². On the Moon, g ≈ 1.62 m/s², making objects weigh only about 1/6 of their Earth weight.",
          "Relationship: Weight is directly proportional to both mass and gravity. Double your mass, and your weight doubles. Double the gravity, and your weight doubles. This is why astronauts weigh much less on the Moon than on Earth."
        ]} />

        <h3>Key Difference: Mass vs. Weight</h3>
        <p>
          A common source of confusion is the difference between mass and weight:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p><strong>Mass:</strong> The amount of matter in an object. Constant everywhere. Measured in kg. Does not change with location.</p>
          <p><strong>Weight:</strong> The force of gravity on an object. Varies with location. Measured in Newtons. Changes on different planets.</p>
        </div>
      </SEOSection>

      <SEOSection title="Gravity on Different Celestial Bodies">
        <p>
          Gravity varies significantly across the solar system due to differences in mass and radius of celestial bodies:
        </p>
        <SEOList items={[
          "The Sun: 274 m/s² (28 times Earth's gravity) - You would weigh 28 times more if you could stand on the Sun's surface",
          "Jupiter: 24.79 m/s² (2.5 times Earth's gravity) - The largest planet with immense gravitational pull",
          "Saturn: 10.44 m/s² (1.06 times Earth's gravity) - Slightly more than Earth due to its large size",
          "Neptune: 11.15 m/s² (1.14 times Earth's gravity) - Strong gravity despite being far from the Sun",
          "Earth: 9.81 m/s² (reference standard) - Our home planet's gravity",
          "Venus: 8.87 m/s² (0.90 times Earth's gravity) - Slightly less than Earth",
          "Mercury: 3.71 m/s² (0.38 times Earth's gravity) - Small planet with weak gravity",
          "Mars: 3.71 m/s² (0.38 times Earth's gravity) - Similar to Mercury, interesting for colonization studies",
          "Uranus: 8.87 m/s² (0.90 times Earth's gravity) - Similar to Venus",
          "Moon: 1.62 m/s² (0.17 times Earth's gravity) - Only about 1/6 of Earth's gravity",
          "Pluto: 0.62 m/s² (0.063 times Earth's gravity) - Extremely weak gravity, you could jump very high"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Our calculator supports a wide range of units for both mass and weight:
        </p>
        <SEOList items={[
          "Mass Units: Kilogram (kg), Gram (g), Pound (lb), Ounce (oz), Stone",
          "Weight Units: Newton (N), Kilonewton (kN), Pound-force (lbf), Kilogram-force (kgf)"
        ]} />
        <p>
          The calculator automatically converts between these units, allowing you to work with the most convenient units for your application or preference.
        </p>
      </SEOSection>

      <SEOSection title="Weight Comparison Across the Solar System">
        <p>
          Here are example weight calculations for a 70 kg person (154 lbs):
        </p>
        <SEOList items={[
          "The Sun: 19,180 N (extremely hot, not possible to stand on)",
          "Jupiter: 1,735 N (about 2.5 times heavier than on Earth)",
          "Saturn: 731 N (about the same as on Earth)",
          "Neptune: 780 N (slightly heavier than on Earth)",
          "Earth: 687 N (standard reference weight)",
          "Venus: 621 N (slightly lighter than on Earth)",
          "Mercury: 260 N (about 38% of Earth weight)",
          "Mars: 260 N (same as Mercury, interesting for future colonization)",
          "Moon: 113 N (only about 16% of Earth weight, you could jump 6 times higher)",
          "Pluto: 43 N (extremely light, you could almost float)"
        ]} />
      </SEOSection>

      <SEOSection title="Applications of Weight Calculations">
        <p>
          Understanding weight on other planets has practical applications in various fields:
        </p>
        <SEOList items={[
          "Space Exploration: Calculate equipment weight for missions to different planets and moons",
          "Astronaut Training: Understand forces astronauts will experience in different gravitational environments",
          "Planetary Colonization: Plan habitats and infrastructure for future settlements on Mars, the Moon, or other bodies",
          "Physics Education: Learn fundamental concepts of gravity and mass-weight relationships",
          "Spacecraft Design: Account for gravitational variations when designing spacecraft for different destinations",
          "Scientific Research: Study planetary characteristics and their effects on objects and humans",
          "Engineering: Design equipment that must function under different gravitational conditions",
          "Entertainment and Curiosity: Discover what you would weigh if you traveled through the solar system"
        ]} />
      </SEOSection>

      <SEOSection title="Why Does Gravity Vary?">
        <p>
          Gravitational acceleration depends on two main factors:
        </p>
        <SEOList items={[
          "Mass of the Celestial Body: Larger mass creates stronger gravity. Jupiter is much more massive than Earth, so it has stronger gravity. Pluto is much less massive, so it has weaker gravity.",
          "Distance from Center: Gravity decreases with distance from the center of the body. For consistency, we use the gravitational acceleration at the surface (or cloud tops for gas giants).",
          "Formula Relationship: Gravity follows Newton's law of universal gravitation: g = GM/r², where G is the gravitational constant, M is the mass of the celestial body, and r is the distance from its center."
        ]} />
      </SEOSection>

      <SEOSection title="Fascinating Weight Facts">
        <SEOList items={[
          "Moon Jumping: On the Moon with 1/6 gravity, you could jump about 6 times higher than on Earth with the same effort",
          "Jupiter's Extreme: If you could somehow stand on Jupiter's cloud tops, you would weigh 2.5 times more, making movement very difficult",
          "Mercury and Mars: Interestingly, Mercury and Mars have nearly identical surface gravity despite being very different planets",
          "The Sun's Surface: Standing on the Sun's surface (if possible) would subject you to 28 times Earth's gravity, crushing any known material instantly",
          "Weightlessness in Orbit: Astronauts in orbit aren't weightless because gravity disappears - they're in free fall, experiencing apparent weightlessness",
          "Weight vs. Mass: A 70 kg person weighs 687 N on Earth but still has a mass of 70 kg on any planet or in space"
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is the difference between mass and weight?",
            answer: "Mass is the amount of matter in an object and remains constant everywhere. Weight is the force of gravity on that mass and varies with gravitational acceleration. The formula W = m × g shows this relationship."
          },
          {
            question: "How much would I weigh on Mars?",
            answer: "You would weigh about 38% of your Earth weight on Mars. Mars has a surface gravity of 3.71 m/s², compared to Earth's 9.81 m/s². A 100 kg person would weigh about 38 kg on Mars."
          },
          {
            question: "Why is the Moon's gravity only 1/6 of Earth's?",
            answer: "The Moon is much smaller and less massive than Earth. Its gravitational acceleration at the surface is about 1.62 m/s² compared to Earth's 9.81 m/s². This makes the Moon's gravity about 1/6 of Earth's."
          },
          {
            question: "Can I stand on Jupiter?",
            answer: "Jupiter is a gas giant with no solid surface. However, if you could somehow stand at the cloud tops where gravity is 24.79 m/s², you would weigh about 2.5 times more than on Earth, making movement very difficult."
          },
          {
            question: "Why don't we calculate weight on planets beyond Pluto?",
            answer: "This calculator focuses on the major planets and Pluto (a dwarf planet). Objects beyond Pluto are either very distant or recently discovered dwarf planets with poorly defined gravity values."
          },
          {
            question: "Would my mass change on another planet?",
            answer: "No, your mass would remain exactly the same everywhere in the universe. Only your weight changes because it depends on local gravity. The formula W = m × g shows that weight changes, but m (mass) stays constant."
          },
          {
            question: "What units does the calculator support?",
            answer: "For mass: kilograms, grams, pounds, ounces, and stone. For weight: Newtons, kilonewtons, pound-force, and kilogram-force. The calculator automatically converts between all these units."
          },
          {
            question: "How accurate are the gravity values?",
            answer: "The values used are surface gravity measurements for each celestial body. For gas giants, these represent gravity at the cloud tops. Values are accurate to 2-3 decimal places and suitable for educational and practical purposes."
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
