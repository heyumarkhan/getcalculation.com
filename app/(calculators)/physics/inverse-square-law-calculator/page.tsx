import InverseSquareLawCalculator from '../../../_components/calculators/InverseSquareLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function InverseSquareLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Inverse Square Law Calculator: Calculate Intensity, Distance & Source Strength (I = k/r²)"
      description="Calculate intensity, distance, or source strength using the inverse square law: I = k/r². Free online physics calculator for light, sound, radiation, and electromagnetic fields with comprehensive unit support."
      calculator={<InverseSquareLawCalculator />}
      slug="physics/inverse-square-law-calculator"
      category="Mechanics"
      features={[
        "Calculate intensity from distance and source strength",
        "Calculate distance from intensity and source strength",
        "Calculate source strength from intensity and distance",
        "Support for multiple distance units (m, cm, mm, km, ft, in, mi)",
        "Support for multiple intensity units (W/m², lux, foot-candles)",
        "Support for multiple source strength units (W⋅m², lumens)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding the Inverse Square Law: Fundamental Principle of Physics">
        <p>
          The inverse square law is a fundamental principle in physics that states that a specified physical quantity (such as intensity, force, or field strength) is inversely proportional to the square of the distance from the source. This law applies to many phenomena including light, sound, radiation, gravitational force, and electric fields. Our Inverse Square Law Calculator simplifies these calculations, allowing you to determine intensity, distance, or source strength using the relationship: <strong>I = k / r²</strong>, where I is the intensity, k is the source strength (constant), and r is the distance from the source.
        </p>
        <p>
          Whether you&apos;re calculating light intensity for photography, sound levels for acoustics, radiation exposure for safety, or gravitational/electric forces, understanding the inverse square law is crucial. Our calculator helps you solve for any of the three variables, making complex physics calculations simple and accessible.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Inverse Square Law Calculator">
        <p>
          Our Inverse Square Law Calculator offers three calculation modes:
        </p>
        <SEOList ordered items={[
          '<strong>Calculate Intensity (I):</strong> Enter the source strength (k) and distance (r) from the source. The calculator determines the intensity using I = k / r².',
          '<strong>Calculate Distance (r):</strong> Enter the intensity (I) and source strength (k). The calculator determines the distance using r = √(k / I).',
          '<strong>Calculate Source Strength (k):</strong> Enter the intensity (I) and distance (r). The calculator determines the source strength using k = I × r².'
        ]} />
        <p>
          Select your calculation mode, enter the known values with your preferred units, and click Calculate to get instant results with detailed step-by-step solutions. The calculator supports multiple units for distance (meters, kilometers, centimeters, millimeters, feet, inches, miles), intensity (watts per square meter, lux, foot-candles), and source strength (watts × square meters, lumens).
        </p>
      </SEOSection>

      <SEOSection title="The Inverse Square Law Formula Explained">
        <p>
          The mathematical form of the inverse square law is:
        </p>
        <SEOFormula
          formula="I = k / r²"
          description="Where: I = Intensity, k = Source Strength (constant), r = Distance from source"
        />

        <h3>Components of the Inverse Square Law:</h3>
        <SEOList items={[
          '<strong>Intensity (I):</strong> The physical quantity being measured at a point, such as light intensity, sound intensity, radiation intensity, or field strength. Measured in units like W/m² (watts per square meter), lux (lumens per square meter), or appropriate units for the specific phenomenon.',
          '<strong>Source Strength (k):</strong> A constant that represents the strength or power of the source. This depends on the total power, energy, or strength of the source. For point sources, k = Power / (4π) for spherical radiation. Measured in units like W⋅m² (watts × square meters) or lumens.',
          '<strong>Distance (r):</strong> The distance from the source to the point where intensity is measured. Measured in meters, centimeters, kilometers, feet, inches, or miles.',
          '<strong>Mathematical Relationship:</strong> Intensity decreases with the square of distance. Doubling the distance reduces intensity to 1/4 (one-fourth) of the original value. Tripling the distance reduces intensity to 1/9 (one-ninth).'
        ]} />

        <h3>Rearranging the Formula:</h3>
        <p>You can rearrange the inverse square law to solve for any variable:</p>
        <SEOList items={[
          '<strong>Intensity:</strong> I = k / r²',
          '<strong>Distance:</strong> r = √(k / I)',
          '<strong>Source Strength:</strong> k = I × r²'
        ]} />

        <h3>Physical Interpretation:</h3>
        <p>
          The inverse square law arises from geometric spreading. For a point source radiating uniformly in all directions, the energy spreads over the surface of a sphere with area 4πr². As the distance doubles, the same amount of energy spreads over four times the area, resulting in one-quarter the intensity. This fundamental relationship applies to any phenomenon where energy, force, or field spreads uniformly from a point source.
        </p>
      </SEOSection>

      <SEOSection title="Applications of the Inverse Square Law">
        <p>
          The inverse square law applies to numerous physical phenomena:
        </p>
        <SEOList items={[
          '<strong>Light Intensity:</strong> Light from a point source (like a light bulb) follows the inverse square law. If you move twice as far from a light source, the light intensity becomes 1/4 as bright. This is crucial in photography, lighting design, and optical measurements.',
          '<strong>Sound Intensity:</strong> Sound waves from a point source spread spherically, following the inverse square law. Moving twice as far from a sound source reduces sound intensity to 1/4. This principle is used in acoustics, audio engineering, and noise control.',
          '<strong>Radiation Intensity:</strong> Radioactive sources, X-ray machines, and other radiation sources follow the inverse square law. This is critical for radiation safety, medical imaging, and nuclear safety calculations.',
          '<strong>Gravitational Force:</strong> Newton\'s law of universal gravitation follows an inverse square relationship: F = G(m₁m₂) / r². The gravitational force between two objects decreases with the square of distance.',
          '<strong>Electric Force:</strong> Coulomb\'s law for electric forces between charges follows the inverse square law: F = k(q₁q₂) / r². Electric field strength also follows this relationship.',
          '<strong>Magnetic Field:</strong> Magnetic field strength from a magnetic dipole follows an inverse cube law at large distances, but many magnetic phenomena involve inverse square relationships.',
          '<strong>Electromagnetic Radiation:</strong> The intensity of electromagnetic waves (radio, microwave, infrared, visible, ultraviolet, X-rays, gamma rays) follows the inverse square law for point sources.',
          '<strong>Thermal Radiation:</strong> Heat transfer by radiation follows the inverse square law, important in thermal engineering and heat transfer calculations.'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Examples and Applications">
        <p>
          The inverse square law has practical applications in many fields:
        </p>
        <SEOList items={[
          '<strong>Photography and Lighting:</strong> Understanding how light intensity changes with distance helps photographers position lights correctly and calculate proper exposure. Moving a light twice as far requires four times the power for the same illumination.',
          '<strong>Sound Engineering:</strong> Audio engineers use the inverse square law to position microphones and speakers correctly, calculate sound levels at different distances, and design sound systems for venues.',
          '<strong>Radiation Safety:</strong> Medical professionals, nuclear workers, and safety engineers use the inverse square law to calculate safe distances from radiation sources and determine exposure limits.',
          '<strong>Astronomy:</strong> Astronomers use the inverse square law to calculate the luminosity of stars based on their apparent brightness and distance. The law explains why distant stars appear dimmer.',
          '<strong>Wireless Communication:</strong> Radio and wireless signal strength decreases with distance following the inverse square law (in free space), important for designing communication systems and antenna placement.',
          '<strong>Medical Imaging:</strong> X-ray and gamma-ray imaging systems must account for the inverse square law when calculating radiation doses and positioning sources.',
          '<strong>Security Systems:</strong> Motion sensors, security lights, and other systems rely on understanding how signal or light intensity changes with distance.',
          '<strong>Industrial Applications:</strong> Quality control, material testing, and industrial processes that involve radiation, light, or sound must account for distance effects.'
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Distance Effects: Practical Examples">
        <p>
          The inverse square law has dramatic effects on intensity as distance changes:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Distance Ratio</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Intensity Ratio</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1× (Reference)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1× (100%)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">At 1 meter: 100 W/m²</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">2×</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1/4× (25%)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">At 2 meters: 25 W/m²</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">3×</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1/9× (11.1%)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">At 3 meters: 11.1 W/m²</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">4×</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1/16× (6.25%)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">At 4 meters: 6.25 W/m²</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">5×</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1/25× (4%)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">At 5 meters: 4 W/m²</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">10×</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1/100× (1%)</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">At 10 meters: 1 W/m²</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          This table demonstrates how quickly intensity decreases with distance. Doubling the distance always results in one-quarter the intensity, making the inverse square law a powerful tool for understanding and predicting how physical quantities change with distance.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the inverse square law?",
            answer: "The inverse square law states that a specified physical quantity (such as intensity, force, or field strength) is inversely proportional to the square of the distance from the source. Mathematically: I = k / r², where I is the intensity, k is the source strength (a constant), and r is the distance from the source. This law applies to light, sound, radiation, gravitational force, and electric fields."
          },
          {
            question: "Why does intensity decrease with the square of distance?",
            answer: "The inverse square law arises from geometric spreading. For a point source radiating uniformly in all directions, the energy spreads over the surface area of a sphere, which is 4πr². As distance doubles, the same amount of energy spreads over four times the area (since area is proportional to r²), resulting in one-quarter the intensity. This geometric relationship applies to any phenomenon where energy spreads uniformly from a point source."
          },
          {
            question: "How do you calculate intensity using the inverse square law?",
            answer: "To calculate intensity (I) from distance (r) and source strength (k), use the formula: I = k / r². First, ensure all values are in consistent units. Then divide the source strength by the square of the distance. For example, if k = 100 W⋅m² and r = 2 m, then I = 100 / (2)² = 100 / 4 = 25 W/m²."
          },
          {
            question: "How do you calculate distance from intensity and source strength?",
            answer: "To calculate distance (r) from intensity (I) and source strength (k), rearrange the inverse square law: r = √(k / I). Take the square root of the source strength divided by the intensity. For example, if k = 100 W⋅m² and I = 25 W/m², then r = √(100 / 25) = √4 = 2 m."
          },
          {
            question: "What are some real-world applications of the inverse square law?",
            answer: "The inverse square law applies to many phenomena: light intensity (photography, lighting design), sound intensity (acoustics, audio engineering), radiation intensity (medical imaging, nuclear safety), gravitational force (astronomy, orbital mechanics), electric force (electrostatics), and electromagnetic radiation (wireless communication, radio transmission). Understanding this law is crucial in fields ranging from photography to radiation safety to astronomy."
          },
          {
            question: "Does the inverse square law always apply?",
            answer: "The inverse square law applies to point sources that radiate uniformly in all directions in free space. It may not apply exactly in situations with: extended sources (not point-like), non-uniform radiation patterns, reflections or scattering, absorption in the medium, near-field effects (very close to the source), or when the source is not isotropic. However, for most practical purposes with point sources at reasonable distances, the inverse square law provides accurate predictions."
          },
          {
            question: "How does doubling the distance affect intensity?",
            answer: "Doubling the distance always reduces intensity to 1/4 (one-fourth or 25%) of the original value. This is because intensity is inversely proportional to the square of distance: if r becomes 2r, then I = k / (2r)² = k / (4r²) = (1/4) × (k / r²) = (1/4) × I_original. This relationship holds regardless of the starting distance, as long as the source follows the inverse square law."
          },
          {
            question: "What units are used for inverse square law calculations?",
            answer: "Units depend on the specific application. For light intensity: lux (lm/m²), foot-candles, or W/m². For sound: W/m² or dB. For radiation: W/m², Gy/h, or rem/h. Distance is typically in meters, centimeters, or feet. Source strength (k) has units that make the equation dimensionally consistent: for intensity in W/m² and distance in m, k has units of W⋅m². Our calculator supports multiple unit conversions for convenience."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The inverse square law is a fundamental principle in physics that explains how intensity, force, and field strength decrease with distance from a source. Our Inverse Square Law Calculator provides a powerful and accurate tool for determining intensity, distance, or source strength, making complex physics calculations simple and accessible for students, engineers, and professionals.
        </p>
        <p>
          By simplifying inverse square law calculations with comprehensive unit support and detailed step-by-step solutions, this calculator empowers users to solve problems in lighting, acoustics, radiation safety, astronomy, and many other fields. For related calculations, explore our {createInternalLink('gravitational-force-calculator')} for gravitational force calculations or our {createInternalLink('wavelength-to-energy-calculator')} for electromagnetic radiation energy conversions.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

