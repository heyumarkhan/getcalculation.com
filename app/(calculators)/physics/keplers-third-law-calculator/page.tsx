import KeplersThirdLawCalculator from '../../../_components/calculators/KeplersThirdLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function KeplersThirdLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Kepler's Third Law Calculator: Calculate Orbital Period, Semi-Major Axis & Mass (T² = (4π²/GM) × a³)"
      description="Calculate orbital period, semi-major axis, or mass using Kepler's Third Law: T² = (4π²/GM) × a³. Free online physics calculator for orbital mechanics, planetary motion, and astrophysics with comprehensive unit support."
      calculator={<KeplersThirdLawCalculator />}
      slug="physics/keplers-third-law-calculator"
      category="Mechanics"
      features={[
        "Calculate orbital period from semi-major axis and mass",
        "Calculate semi-major axis from orbital period and mass",
        "Calculate mass from orbital period and semi-major axis",
        "Support for multiple time units (seconds, minutes, hours, days, years)",
        "Support for multiple distance units (meters, kilometers, AU, light-years, parsecs)",
        "Support for multiple mass units (kilograms, solar masses, Earth masses)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Kepler's Third Law: The Foundation of Orbital Mechanics">
        <p>
          Kepler&apos;s Third Law, also known as the Law of Harmonies, is one of the three fundamental laws of planetary motion discovered by German astronomer Johannes Kepler in the early 17th century. This law states that the square of the orbital period of a planet is directly proportional to the cube of the semi-major axis of its orbit. Our Kepler&apos;s Third Law Calculator simplifies these calculations, allowing you to determine orbital period, semi-major axis, or mass using the relationship: <strong>T² = (4π²/GM) × a³</strong>, where T is the orbital period, a is the semi-major axis, G is the gravitational constant, and M is the mass of the central body.
        </p>
        <p>
          Whether you&apos;re studying planetary motion, designing satellite orbits, exploring exoplanets, or understanding the dynamics of binary star systems, Kepler&apos;s Third Law provides the fundamental relationship between orbital parameters. Our calculator helps you solve for any of the three key variables, making complex orbital mechanics calculations simple and accessible.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Kepler's Third Law Calculator">
        <p>
          Our Kepler&apos;s Third Law Calculator offers three calculation modes:
        </p>
        <SEOList ordered items={[
          '<strong>Calculate Orbital Period (T):</strong> Enter the semi-major axis (a) and the mass (M) of the central body. The calculator determines the orbital period using T² = (4π²/GM) × a³.',
          '<strong>Calculate Semi-Major Axis (a):</strong> Enter the orbital period (T) and the mass (M) of the central body. The calculator determines the semi-major axis using a³ = (GM/4π²) × T².',
          '<strong>Calculate Mass (M):</strong> Enter the orbital period (T) and the semi-major axis (a). The calculator determines the mass of the central body using M = (4π²/G) × (a³/T²).'
        ]} />
        <p>
          Select your calculation mode, enter the known values with your preferred units, and click Calculate to get instant results with detailed step-by-step solutions. The calculator supports multiple units for time (seconds, minutes, hours, days, years), distance (meters, kilometers, astronomical units, light-years, parsecs), and mass (kilograms, solar masses, Earth masses, Jupiter masses, grams, tons).
        </p>
      </SEOSection>

      <SEOSection title="Kepler's Third Law Formula Explained">
        <p>
          The mathematical form of Kepler&apos;s Third Law, derived from Newton&apos;s laws of motion and universal gravitation, is:
        </p>
        <SEOFormula
          formula="T² = (4π²/GM) × a³"
          description="Where: T = Orbital Period, a = Semi-Major Axis, G = Gravitational Constant, M = Mass of Central Body"
        />

        <h3>Components of Kepler&apos;s Third Law:</h3>
        <SEOList items={[
          '<strong>Orbital Period (T):</strong> The time taken for an object to complete one full orbit around the central body, measured in seconds, minutes, hours, days, or years. For planets, this is the length of a year.',
          '<strong>Semi-Major Axis (a):</strong> Half the longest diameter of an elliptical orbit, representing the average distance from the central body. For circular orbits, this equals the radius. Measured in meters, kilometers, or astronomical units (AU).',
          '<strong>Gravitational Constant (G):</strong> A fundamental physical constant with value 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻². This constant appears in Newton\'s law of universal gravitation and connects mass to gravitational force.',
          '<strong>Mass (M):</strong> The mass of the central body around which the object orbits. For planetary motion, this is typically the mass of the Sun. Measured in kilograms, solar masses, or other mass units.',
          '<strong>Mathematical Relationship:</strong> The square of the period is proportional to the cube of the semi-major axis, meaning doubling the semi-major axis increases the period by a factor of √8 ≈ 2.83.'
        ]} />

        <h3>Rearranging the Formula:</h3>
        <p>You can rearrange Kepler&apos;s Third Law to solve for any of the three variables:</p>
        <SEOList items={[
          '<strong>Orbital Period:</strong> T = √[(4π²/GM) × a³]',
          '<strong>Semi-Major Axis:</strong> a = ∛[(GM/4π²) × T²]',
          '<strong>Mass:</strong> M = (4π²/G) × (a³/T²)'
        ]} />

        <h3>Physical Interpretation:</h3>
        <p>
          Kepler&apos;s Third Law reveals a fundamental relationship in orbital mechanics: objects farther from the central body take longer to complete their orbits. This law applies not only to planets orbiting the Sun but also to moons orbiting planets, satellites orbiting Earth, binary star systems, and any two-body gravitational system. The constant ratio T²/a³ depends only on the mass of the central body, making this law invaluable for determining masses of celestial objects.
        </p>
      </SEOSection>

      <SEOSection title="Kepler's Laws of Planetary Motion">
        <p>
          Kepler&apos;s Third Law is part of a set of three laws that revolutionized our understanding of planetary motion:
        </p>
        <SEOList items={[
          '<strong>Kepler\'s First Law (Law of Ellipses):</strong> Planets orbit the Sun in elliptical paths, with the Sun at one focus of the ellipse. This replaced the ancient belief in perfectly circular orbits.',
          '<strong>Kepler\'s Second Law (Law of Equal Areas):</strong> A line joining a planet and the Sun sweeps out equal areas in equal intervals of time. This means planets move faster when closer to the Sun and slower when farther away.',
          '<strong>Kepler\'s Third Law (Law of Harmonies):</strong> The square of the orbital period is proportional to the cube of the semi-major axis. This law connects orbital distance and period mathematically, allowing calculation of one from the other.'
        ]} />
        <p>
          These three laws, published between 1609 and 1619, laid the foundation for Newton&apos;s theory of universal gravitation and modern orbital mechanics. They remain fundamental tools in astronomy, astrophysics, and space exploration today.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications of Kepler's Third Law">
        <p>
          Kepler&apos;s Third Law is essential in numerous applications across astronomy, astrophysics, and space engineering:
        </p>
        <SEOList items={[
          '<strong>Planetary Science:</strong> Calculating orbital periods and distances for planets, moons, asteroids, and comets in our solar system. Verifying that observed planetary orbits obey Kepler\'s laws.',
          '<strong>Exoplanet Discovery:</strong> Determining the masses of stars by observing the orbital periods and semi-major axes of planets orbiting them. This technique has been crucial in the discovery and characterization of thousands of exoplanets.',
          '<strong>Satellite Design:</strong> Calculating the orbital period and altitude required for satellites in Earth orbit. For geostationary satellites, this law determines that they must orbit at approximately 35,786 km above Earth\'s surface.',
          '<strong>Binary Star Systems:</strong> Determining the masses of stars in binary systems by measuring their orbital periods and semi-major axes. This is one of the most accurate methods for measuring stellar masses.',
          '<strong>Space Mission Planning:</strong> Designing spacecraft trajectories and transfer orbits. Understanding orbital mechanics is essential for missions to Mars, the outer planets, and beyond.',
          '<strong>Astrophysics Research:</strong> Studying the dynamics of star clusters, galaxies, and other gravitational systems. Kepler\'s laws apply to any two-body gravitational system.',
          '<strong>Astronomical Observations:</strong> Predicting planetary positions, calculating transit times, and understanding the timing of astronomical events.',
          '<strong>Education and Research:</strong> Teaching fundamental concepts of orbital mechanics, planetary science, and astrophysics in academic settings.'
        ]} />
      </SEOSection>

      <SEOSection title="Examples: Planets in Our Solar System">
        <p>
          The planets in our solar system perfectly demonstrate Kepler&apos;s Third Law:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Planet</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Semi-Major Axis (AU)</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Orbital Period (Years)</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">T²/a³ (Constant)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Mercury</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">0.387</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">0.241</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Venus</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">0.723</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">0.615</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Earth</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Mars</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.524</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.881</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Jupiter</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">5.203</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">11.862</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Saturn</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">9.539</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">29.458</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Uranus</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">19.18</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">84.015</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Neptune</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">30.06</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">164.79</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.000</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Notice that for all planets, the ratio T²/a³ is constant (approximately 1.000 when using Earth&apos;s orbital period and semi-major axis as reference), demonstrating Kepler&apos;s Third Law. This constancy arises because all planets orbit the same central body (the Sun) with the same mass.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is Kepler's Third Law?",
            answer: "Kepler's Third Law, also known as the Law of Harmonies, states that the square of the orbital period (T) of a planet is proportional to the cube of the semi-major axis (a) of its orbit. Mathematically: T² = (4π²/GM) × a³, where G is the gravitational constant and M is the mass of the central body. This law applies to any two-body gravitational system."
          },
          {
            question: "How do you calculate orbital period using Kepler's Third Law?",
            answer: "To calculate orbital period (T) from semi-major axis (a) and mass (M), use the formula: T = √[(4π²/GM) × a³]. First, convert all values to base units (seconds for time, meters for distance, kilograms for mass). Calculate T² = (4π²/GM) × a³, then take the square root to find T. Our calculator performs these calculations automatically with unit conversions."
          },
          {
            question: "How do you calculate semi-major axis using Kepler's Third Law?",
            answer: "To calculate semi-major axis (a) from orbital period (T) and mass (M), rearrange Kepler's Third Law: a = ∛[(GM/4π²) × T²]. First, convert all values to base units. Calculate a³ = (GM/4π²) × T², then take the cube root to find a. Our calculator handles these calculations with proper unit conversions automatically."
          },
          {
            question: "Can you calculate the mass of a star using Kepler's Third Law?",
            answer: "Yes! Kepler's Third Law can be rearranged to calculate mass: M = (4π²/G) × (a³/T²). By observing the orbital period and semi-major axis of a planet or companion star, astronomers can determine the mass of the central star. This technique is commonly used in exoplanet research and binary star studies to measure stellar masses accurately."
          },
          {
            question: "What is the semi-major axis?",
            answer: "The semi-major axis is half the longest diameter of an elliptical orbit. For a circular orbit, it equals the radius. It represents the average distance from the orbiting object to the central body. In our solar system, Earth's semi-major axis is 1 astronomical unit (AU), approximately 149.6 million kilometers."
          },
          {
            question: "Does Kepler's Third Law apply to circular orbits?",
            answer: "Yes, Kepler's Third Law applies to both elliptical and circular orbits. For a circular orbit, the semi-major axis equals the radius of the circle. The law works the same way: T² = (4π²/GM) × r³, where r is the radius of the circular orbit."
          },
          {
            question: "What are the units for Kepler's Third Law calculations?",
            answer: "Kepler's Third Law requires consistent units: orbital period in seconds, semi-major axis in meters, mass in kilograms, and gravitational constant G = 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻². Our calculator supports multiple units (years, days, hours for time; AU, kilometers, light-years for distance; solar masses, Earth masses for mass) and automatically converts to base units for calculations."
          },
          {
            question: "How accurate is Kepler's Third Law?",
            answer: "Kepler's Third Law is highly accurate for two-body systems in Newtonian gravity. It works perfectly for planets orbiting the Sun (as shown in our solar system table where T²/a³ is constant). For systems with more bodies or relativistic effects, additional corrections may be needed, but for most practical applications in astronomy and space engineering, Kepler's laws provide excellent accuracy."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Kepler&apos;s Third Law is a cornerstone of orbital mechanics, providing the fundamental relationship between orbital period, distance, and mass in gravitational systems. Our Kepler&apos;s Third Law Calculator provides a powerful and accurate tool for determining orbital parameters, making complex calculations simple and accessible for students, researchers, and space engineers.
        </p>
        <p>
          By simplifying orbital mechanics calculations with comprehensive unit support and detailed step-by-step solutions, this calculator empowers users to explore planetary motion, design satellite orbits, study exoplanets, and understand the dynamics of gravitational systems. For related calculations, explore our {createInternalLink('gravitational-force-calculator')} for gravitational force calculations or our {createInternalLink('schwarzschild-radius-calculator')} for black hole physics related to massive objects.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

