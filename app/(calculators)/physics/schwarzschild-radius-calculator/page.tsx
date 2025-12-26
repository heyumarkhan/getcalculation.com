import SchwarzschildRadiusCalculator from '../../../_components/calculators/SchwarzschildRadiusCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SchwarzschildRadiusCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Schwarzschild Radius Calculator: Calculate Event Horizon & Black Hole Mass (Rs = 2GM/c²)"
      description="Calculate Schwarzschild radius or mass using Rs = 2GM/c². Free online physics calculator for black holes, event horizons, general relativity, and astrophysics with comprehensive unit support."
      calculator={<SchwarzschildRadiusCalculator />}
      slug="physics/schwarzschild-radius-calculator"
      category="Quantum Mechanics"
      features={[
        "Calculate Schwarzschild radius from mass",
        "Calculate mass from Schwarzschild radius",
        "Support for solar masses, Earth masses, Jupiter masses, and more",
        "Multiple radius units (m, km, AU, light-years, parsecs)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Schwarzschild Radius: The Event Horizon of Black Holes">
        <p>
          The Schwarzschild radius is a fundamental concept in general relativity, representing the radius of the event horizon of a non-rotating black hole. Named after German physicist Karl Schwarzschild, who derived the solution to Einstein&apos;s field equations in 1916, this radius determines the boundary beyond which nothing, not even light, can escape the gravitational pull of a black hole. Our Schwarzschild Radius Calculator simplifies these calculations, allowing you to determine the Schwarzschild radius from mass or calculate the mass required for a given Schwarzschild radius using: <strong>Rs = 2GM/c²</strong>.
        </p>
        <p>
          Understanding the Schwarzschild radius is crucial for studying black holes, general relativity, and astrophysics. Whether you&apos;re exploring theoretical physics, studying stellar evolution, or simply curious about the extreme physics of black holes, this calculator provides accurate calculations using the precise physical constants.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Schwarzschild Radius Calculator">
        <p>
          Our Schwarzschild Radius Calculator offers two calculation modes:
        </p>
        <ol>
          <li><strong>Calculate Schwarzschild Radius (Rs):</strong> Enter the mass (M) of the object. The calculator determines the Schwarzschild radius using Rs = 2GM/c².</li>
          <li><strong>Calculate Mass (M):</strong> Enter the Schwarzschild radius (Rs). The calculator determines the mass required using M = Rs × c² / (2G).</li>
        </ol>
        <p>
          Select your calculation mode, enter the known value with your preferred units, and click Calculate to get instant results with detailed step-by-step solutions. The calculator supports multiple units for mass (kg, solar masses, Earth masses, Jupiter masses, grams, tons, pounds) and radius (meters, kilometers, miles, astronomical units, light-years, parsecs, centimeters, millimeters).
        </p>
      </SEOSection>

      <SEOSection title="The Schwarzschild Radius Formula Explained">
        <p>
          The fundamental formula for calculating the Schwarzschild radius is:
        </p>
        <SEOFormula
          formula="Rs = 2GM / c²"
          description="Where: Rs = Schwarzschild radius, G = Gravitational constant, M = Mass, c = Speed of light"
        />

        <h3>Components of the Schwarzschild Radius Formula:</h3>
        <SEOList items={[
          "<strong>Schwarzschild Radius (Rs):</strong> The radius of the event horizon of a non-rotating black hole, measured in meters or other distance units. This is the critical radius at which the escape velocity equals the speed of light.",
          "<strong>Gravitational Constant (G):</strong> A fundamental physical constant with value 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻². This constant appears in Newton's law of universal gravitation and Einstein's field equations.",
          "<strong>Mass (M):</strong> The mass of the object for which the Schwarzschild radius is calculated, typically measured in kilograms or solar masses. One solar mass (M☉) equals approximately 1.989 × 10³⁰ kg.",
          "<strong>Speed of Light (c):</strong> The universal constant representing the speed of light in vacuum, equal to 299,792,458 m/s. This fundamental constant connects space and time in relativity theory."
        ]} />

        <h3>Rearranging the Formula:</h3>
        <p>You can rearrange the Schwarzschild radius formula to solve for mass:</p>
        <ul>
          <li><strong>Schwarzschild Radius:</strong> Rs = 2GM / c²</li>
          <li><strong>Mass:</strong> M = Rs × c² / (2G)</li>
        </ul>

        <h3>Physical Interpretation:</h3>
        <p>
          The Schwarzschild radius represents the boundary between ordinary space and the interior of a black hole. For any given mass, if that mass is compressed within its Schwarzschild radius, it forms a black hole. The radius is directly proportional to mass: doubling the mass doubles the Schwarzschild radius. This relationship allows us to understand how massive objects must be compressed to form black holes.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Examples and Applications">
        <p>
          The Schwarzschild radius has profound implications in astrophysics and general relativity:
        </p>
        <SEOList items={[
          "<strong>Black Hole Formation:</strong> Understanding when stars collapse to form black holes. When a stellar core exceeds the Tolman-Oppenheimer-Volkoff limit (approximately 2-3 solar masses), it collapses within its Schwarzschild radius to form a black hole.",
          "<strong>Event Horizon Size:</strong> Calculating the size of black hole event horizons. For example, a black hole with 10 solar masses has a Schwarzschild radius of approximately 29.5 km, while supermassive black holes (millions of solar masses) have event horizons extending to astronomical units.",
          "<strong>Stellar Evolution:</strong> Studying the final stages of massive star evolution and understanding which stars will become black holes versus neutron stars or white dwarfs.",
          "<strong>Gravitational Wave Research:</strong> Calculating Schwarzschild radii for black hole mergers observed by LIGO and other gravitational wave detectors.",
          "<strong>General Relativity:</strong> Exploring the predictions of Einstein's theory of general relativity and understanding spacetime curvature near massive objects.",
          "<strong>Cosmology:</strong> Studying supermassive black holes at the centers of galaxies, which can have Schwarzschild radii comparable to the size of planetary orbits.",
          "<strong>Educational and Research:</strong> Teaching general relativity concepts, astrophysics, and the extreme physics of black holes in academic settings."
        ]} />
      </SEOSection>

      <SEOSection title="Common Schwarzschild Radius Values">
        <p>
          Understanding typical Schwarzschild radius values helps put calculations in context:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Object</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Mass</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Schwarzschild Radius</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Earth</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1 M⊕</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">8.87 mm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">If Earth became a black hole</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Sun</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1 M☉</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">2.95 km</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">If Sun became a black hole</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Stellar Black Hole</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">10 M☉</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">29.5 km</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Typical stellar-mass black hole</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Intermediate Black Hole</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1,000 M☉</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">2,950 km</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Rare intermediate-mass black holes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Supermassive Black Hole</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">10⁶ M☉</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">2.95 × 10⁶ km (20 AU)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Milky Way center (Sagittarius A*)</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Ultramassive Black Hole</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">10⁹ M☉</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">2.95 × 10⁹ km (20,000 AU)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Largest known supermassive black holes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          *Note: M⊕ = Earth mass (5.972 × 10²⁴ kg), M☉ = Solar mass (1.989 × 10³⁰ kg), AU = Astronomical Unit (1.496 × 10¹¹ m)
        </p>
      </SEOSection>

      <SEOSection title="Important Concepts and Limitations">
        <p>
          Understanding the Schwarzschild radius requires awareness of several important concepts:
        </p>
        <SEOList items={[
          "<strong>Non-Rotating Black Holes:</strong> The Schwarzschild radius applies specifically to non-rotating (static) black holes. Rotating black holes (Kerr black holes) have more complex event horizons described by the Kerr metric.",
          "<strong>Event Horizon vs. Physical Size:</strong> The Schwarzschild radius is the radius of the event horizon, not necessarily the physical size of the singularity at the center. The singularity is a point of infinite density with zero volume.",
          "<strong>Schwarzschild Metric:</strong> The Schwarzschild solution to Einstein's field equations describes spacetime geometry around a spherically symmetric, non-rotating mass. This metric predicts the existence of an event horizon at the Schwarzschild radius.",
          "<strong>Escape Velocity:</strong> At the Schwarzschild radius, the escape velocity equals the speed of light. This is why nothing can escape from within the event horizon.",
          "<strong>Time Dilation:</strong> Near the Schwarzschild radius, time dilation effects become extreme. Time appears to slow down from an external observer's perspective as objects approach the event horizon.",
          "<strong>Spaghettification:</strong> Tidal forces near the Schwarzschild radius stretch objects in the direction toward the black hole and compress them perpendicularly, an effect called spaghettification.",
          "<strong>Quantum Effects:</strong> Near the Planck scale, quantum gravity effects become important, and the classical Schwarzschild solution may not fully describe black hole physics."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the Schwarzschild radius?",
            answer: "The Schwarzschild radius (Rs) is the radius of the event horizon of a non-rotating black hole, calculated using the formula Rs = 2GM/c², where G is the gravitational constant, M is the mass, and c is the speed of light. It represents the boundary beyond which nothing, not even light, can escape the gravitational pull of a black hole."
          },
          {
            question: "What is the formula for Schwarzschild radius?",
            answer: "The Schwarzschild radius formula is Rs = 2GM/c², where Rs is the Schwarzschild radius, G is the gravitational constant (6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²), M is the mass, and c is the speed of light (299,792,458 m/s). This formula can be rearranged to find mass: M = Rs × c² / (2G)."
          },
          {
            question: "What is the Schwarzschild radius of the Sun?",
            answer: "The Schwarzschild radius of the Sun (1 solar mass = 1.989 × 10³⁰ kg) is approximately 2.95 kilometers. This means if the Sun were compressed into a sphere with a radius of 2.95 km, it would become a black hole. The actual radius of the Sun is about 696,000 km, so it is far from being a black hole."
          },
          {
            question: "What is the Schwarzschild radius of Earth?",
            answer: "The Schwarzschild radius of Earth (1 Earth mass = 5.972 × 10²⁴ kg) is approximately 8.87 millimeters (0.887 cm). If Earth were compressed into a sphere with a radius of less than 9 mm, it would become a black hole. The actual radius of Earth is about 6,371 km, so Earth is nowhere near becoming a black hole."
          },
          {
            question: "How do you calculate Schwarzschild radius?",
            answer: "To calculate the Schwarzschild radius, use the formula Rs = 2GM/c². First, determine the mass (M) in kilograms. Then multiply by the gravitational constant (G = 6.67430 × 10⁻¹¹), multiply by 2, and divide by the speed of light squared (c² = (299792458)² m²/s²). For example, for 1 solar mass (1.989 × 10³⁰ kg): Rs = 2 × 6.67430 × 10⁻¹¹ × 1.989 × 10³⁰ / (299792458)² ≈ 2,950 meters = 2.95 km."
          },
          {
            question: "What happens at the Schwarzschild radius?",
            answer: "The Schwarzschild radius marks the event horizon of a black hole. At this boundary: (1) the escape velocity equals the speed of light, (2) nothing can escape from inside this radius (including light), (3) time dilation becomes extreme from an external observer's perspective, and (4) spacetime curvature becomes so severe that all paths lead inward toward the singularity."
          },
          {
            question: "Can anything escape from inside the Schwarzschild radius?",
            answer: "No, nothing can escape from inside the Schwarzschild radius, not even light. This is why the boundary is called an 'event horizon' - events inside cannot be observed from outside. The escape velocity at the Schwarzschild radius equals the speed of light, and since nothing can travel faster than light, nothing can escape."
          },
          {
            question: "Is the Schwarzschild radius the same as the size of a black hole?",
            answer: "The Schwarzschild radius is the radius of the event horizon (the boundary of the black hole), not the size of the singularity itself. The singularity at the center is a point of infinite density with zero volume. The Schwarzschild radius tells us the size of the 'no-return zone' around a black hole, which is what we typically refer to as the 'size' of a black hole."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The Schwarzschild radius is a fundamental concept in general relativity that defines the event horizon of non-rotating black holes. Our Schwarzschild Radius Calculator provides a powerful and accurate tool for determining the Schwarzschild radius from mass or calculating the mass required for a given Schwarzschild radius using the relationship Rs = 2GM/c².
        </p>
        <p>
          By simplifying complex general relativity calculations and offering comprehensive unit support with detailed step-by-step solutions, this calculator empowers students, researchers, and physics enthusiasts to explore the fascinating physics of black holes and general relativity. For related calculations, explore our {createInternalLink('gravitational-force-calculator')} for gravitational force calculations or other physics calculators for exploring the fundamental laws of the universe.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

