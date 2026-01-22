import IndexOfRefractionCalculator from '../../../_components/calculators/IndexOfRefractionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Index of Refraction Calculator | Snell\'s Law & Critical Angle';
const description = 'Calculate index of refraction, apply Snell\'s law for angle calculations, find critical angles for total internal reflection, and determine light speed in media.';
const keywords = [
  'index of refraction calculator',
  'refractive index calculator',
  'snells law calculator',
  'critical angle calculator',
  'refraction calculator',
  'light bending calculator',
  'optical density',
  'n equals c over v',
  'total internal reflection',
  'angle of refraction',
  'incident angle',
  'refracted ray',
  'optical medium',
  'light speed calculator',
  'physics optics',
  'prism calculator',
  'lens refraction',
  'optical constant',
  'brewster angle',
  'dispersion calculator',
  'wavelength refraction',
  'glass index',
  'water refraction',
  'diamond refraction'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/index-of-refraction-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/index-of-refraction-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function IndexOfRefractionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Index of Refraction Calculator"
      description="Calculate index of refraction, apply Snell's law, find critical angles, and determine light speed in different optical media."
      calculator={<IndexOfRefractionCalculator />}
      slug="physics/index-of-refraction-calculator"
      category="Physics"
      features={[
        'Four calculation methods: index of refraction n=c/v, Snell\'s law n₁sin(θ₁)=n₂sin(θ₂), critical angle θc=arcsin(n₂/n₁), speed in medium v=c/n',
        'Unit-flexible inputs for speed (m/s, km/s, km/h, mph, ft/s) and angles (degrees, radians)',
        'Snell\'s law solver: find refracted angle, second medium index, or incident parameters',
        'Critical angle calculator with total internal reflection analysis',
        'Light speed reduction calculations with percentage and slowdown factors',
        'Automatic validation for physical constraints (speed < c, angles ≤ 90°, n₁ > n₂ for critical angle)'
      ]}
    >
      <SEOSection title="Understanding Index of Refraction">
        <p>
          The index of refraction (or refractive index), denoted as <strong>n</strong>, measures how much light slows down when passing through a material compared to its speed in a vacuum. The fundamental relationship is <strong>n = c / v</strong>, where c is the speed of light in vacuum (approximately 299,792,458 m/s) and v is the speed of light in the material. A higher index means light travels slower in that medium—for example, water has n ≈ 1.33, meaning light travels at 75% of its vacuum speed.
        </p>
        <p>
          When light crosses the boundary between two materials with different refractive indices, it bends—a phenomenon called refraction. The amount of bending is governed by <strong>Snell&apos;s Law: n₁ sin(θ₁) = n₂ sin(θ₂)</strong>, where θ₁ is the incident angle and θ₂ is the refracted angle. Light bends toward the normal when entering a denser medium (higher n) and away from the normal when entering a less dense medium. This bending is responsible for optical effects like rainbows, mirages, and the apparent bending of objects in water.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Index of Refraction Calculator">
        <SEOList
          items={[
            'Select your calculation method: calculate index (n = c/v), apply Snell\'s law for angle/index calculations, find critical angle for total internal reflection, or determine light speed in a medium',
            'For index calculation: Enter the speed of light in vacuum and the speed in the medium with your preferred units (m/s, km/s, etc.)',
            'For Snell\'s law: Choose what to find (refracted angle θ₂ or second medium index n₂), then input the known values including incident medium index n₁, incident angle θ₁, and either n₂ or θ₂',
            'For critical angle: Enter the indices of both media, ensuring n₁ > n₂ (light traveling from denser to less dense medium)',
            'For speed in medium: Input the refractive index of the material and optionally specify the speed of light constant',
            'Click Calculate to see detailed results including step-by-step calculations, angle conversions, and physical interpretations',
            'Results include verification checks, percentage slowdowns, and warnings for total internal reflection when applicable'
          ]}
        />
      </SEOSection>

      <SEOSection title="Index of Refraction Formulas">
        <p>
          The fundamental formulas for refractive index and light refraction are:
        </p>
        <div className="bg-gray-50 p-6 rounded-lg my-4">
          <div className="space-y-3">
            <div>
              <strong>Index of Refraction:</strong>
              <div className="ml-4 mt-1">n = c / v</div>
              <div className="text-sm text-gray-600 ml-4">where c = 299,792,458 m/s (speed of light in vacuum), v = speed in medium</div>
            </div>
            <div>
              <strong>Snell&apos;s Law:</strong>
              <div className="ml-4 mt-1">n₁ sin(θ₁) = n₂ sin(θ₂)</div>
              <div className="text-sm text-gray-600 ml-4">Relates incident and refracted angles across interface between media</div>
            </div>
            <div>
              <strong>Refracted Angle:</strong>
              <div className="ml-4 mt-1">θ₂ = arcsin[(n₁/n₂) × sin(θ₁)]</div>
              <div className="text-sm text-gray-600 ml-4">Solved from Snell&apos;s law for refracted angle</div>
            </div>
            <div>
              <strong>Critical Angle:</strong>
              <div className="ml-4 mt-1">θc = arcsin(n₂/n₁) where n₁ &gt; n₂</div>
              <div className="text-sm text-gray-600 ml-4">Minimum incident angle for total internal reflection</div>
            </div>
            <div>
              <strong>Speed in Medium:</strong>
              <div className="ml-4 mt-1">v = c / n</div>
              <div className="text-sm text-gray-600 ml-4">Light speed reduced by factor of n</div>
            </div>
            <div>
              <strong>Wavelength Change:</strong>
              <div className="ml-4 mt-1">λ_medium = λ_vacuum / n</div>
              <div className="text-sm text-gray-600 ml-4">Wavelength decreases proportionally to index (frequency unchanged)</div>
            </div>
          </div>
        </div>
        <p>
          Total internal reflection occurs when light travels from a denser medium (higher n) to a less dense medium (lower n) at an angle greater than the critical angle θc. At this critical angle, the refracted ray travels along the interface (θ₂ = 90°). For angles exceeding θc, no refraction occurs—all light is reflected back into the denser medium, a principle used in fiber optics and prisms.
        </p>
      </SEOSection>

      <SEOSection title="Common Refractive Indices">
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Material</th>
                <th className="border border-gray-300 px-4 py-2">Index (n)</th>
                <th className="border border-gray-300 px-4 py-2">Speed (×10⁸ m/s)</th>
                <th className="border border-gray-300 px-4 py-2">Critical Angle to Air</th>
                <th className="border border-gray-300 px-4 py-2">Applications</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Vacuum</td>
                <td className="border border-gray-300 px-4 py-2">1.000</td>
                <td className="border border-gray-300 px-4 py-2">2.998</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">Reference standard</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Air (STP)</td>
                <td className="border border-gray-300 px-4 py-2">1.0003</td>
                <td className="border border-gray-300 px-4 py-2">2.997</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">Atmosphere, optics</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Water</td>
                <td className="border border-gray-300 px-4 py-2">1.333</td>
                <td className="border border-gray-300 px-4 py-2">2.25</td>
                <td className="border border-gray-300 px-4 py-2">48.6°</td>
                <td className="border border-gray-300 px-4 py-2">Aquatic optics, lenses</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Crown Glass</td>
                <td className="border border-gray-300 px-4 py-2">1.52</td>
                <td className="border border-gray-300 px-4 py-2">1.97</td>
                <td className="border border-gray-300 px-4 py-2">41.1°</td>
                <td className="border border-gray-300 px-4 py-2">Windows, eyeglasses</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Flint Glass</td>
                <td className="border border-gray-300 px-4 py-2">1.62</td>
                <td className="border border-gray-300 px-4 py-2">1.85</td>
                <td className="border border-gray-300 px-4 py-2">38.1°</td>
                <td className="border border-gray-300 px-4 py-2">Prisms, high-index lenses</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Sapphire</td>
                <td className="border border-gray-300 px-4 py-2">1.77</td>
                <td className="border border-gray-300 px-4 py-2">1.69</td>
                <td className="border border-gray-300 px-4 py-2">34.4°</td>
                <td className="border border-gray-300 px-4 py-2">Watch crystals, optics</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Diamond</td>
                <td className="border border-gray-300 px-4 py-2">2.42</td>
                <td className="border border-gray-300 px-4 py-2">1.24</td>
                <td className="border border-gray-300 px-4 py-2">24.4°</td>
                <td className="border border-gray-300 px-4 py-2">Jewelry, high dispersion</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Index of Refraction">
        <SEOList
          items={[
            '<strong>Optical Lenses:</strong> Lens design relies on precise refractive indices to achieve desired focal lengths. Higher index materials allow thinner lenses with the same optical power, crucial for eyeglasses and camera systems.',
            '<strong>Fiber Optics:</strong> Total internal reflection in optical fibers (core n ≈ 1.48, cladding n ≈ 1.46) enables long-distance light transmission with minimal loss, forming the backbone of internet and telecommunications.',
            '<strong>Prism Spectroscopy:</strong> Dispersion (n varies with wavelength) separates white light into colors. Flint glass prisms with high dispersion create rainbows, used in spectrometers and wavelength analysis.',
            '<strong>Microscopy:</strong> Immersion oils (n ≈ 1.515) matching glass slide index reduce refraction at interfaces, improving resolution and light gathering in high-magnification microscopy.',
            '<strong>Gemology:</strong> Refractive index measurement identifies gemstones (diamond n = 2.42, ruby n = 1.76). Refractometers measure the critical angle to determine n with high precision.',
            '<strong>Atmospheric Optics:</strong> Refraction in Earth\'s atmosphere (n varies with altitude and temperature) causes mirages, atmospheric refraction of sunlight, and the apparent flattening of the sun at sunset.',
            '<strong>Antireflective Coatings:</strong> Quarter-wave coatings with intermediate refractive index (n_coating = √(n_glass × n_air)) minimize reflections on camera lenses and eyeglasses through destructive interference.',
            '<strong>Contact Lens Design:</strong> Matching the refractive index of lens material to cornea and tear film minimizes optical aberrations and maximizes comfort in vision correction.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 1: Calculate Index of Water</h4>
            <p><strong>Given:</strong> Light speed in water v = 2.25 × 10⁸ m/s, c = 3.00 × 10⁸ m/s</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">n = c / v = (3.00 × 10⁸) / (2.25 × 10⁸) = 1.333</p>
            <p><strong>Result:</strong> Water has refractive index 1.333, meaning light travels at 75% of its vacuum speed in water.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 2: Snell&apos;s Law - Light Entering Glass</h4>
            <p><strong>Given:</strong> Air (n₁ = 1.0) to glass (n₂ = 1.5), incident angle θ₁ = 30°</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">sin(θ₂) = (n₁/n₂) × sin(θ₁) = (1.0/1.5) × sin(30°)</p>
            <p className="ml-4">sin(θ₂) = 0.667 × 0.5 = 0.333</p>
            <p className="ml-4">θ₂ = arcsin(0.333) = 19.47°</p>
            <p><strong>Result:</strong> Light bends toward normal from 30° to 19.47° when entering the denser glass medium.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 3: Critical Angle for Fiber Optics</h4>
            <p><strong>Given:</strong> Glass fiber core n₁ = 1.48, cladding n₂ = 1.46</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">θc = arcsin(n₂/n₁) = arcsin(1.46/1.48)</p>
            <p className="ml-4">θc = arcsin(0.9865) = 80.6°</p>
            <p><strong>Result:</strong> Light at angles &gt; 80.6° undergoes total internal reflection, enabling fiber optic transmission.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 4: Diamond Brilliance</h4>
            <p><strong>Given:</strong> Diamond n = 2.42, air n = 1.0</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">θc = arcsin(1.0/2.42) = arcsin(0.413) = 24.4°</p>
            <p className="ml-4">Speed in diamond: v = c/n = (3.00 × 10⁸)/2.42 = 1.24 × 10⁸ m/s</p>
            <p><strong>Result:</strong> Diamond&apos;s low critical angle (24.4°) and high dispersion create brilliant internal reflections, enhancing sparkle.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 5: Atmospheric Refraction</h4>
            <p><strong>Given:</strong> Light from space (n = 1.000) entering atmosphere (n ≈ 1.0003 at sea level), θ₁ = 45°</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">sin(θ₂) = (1.000/1.0003) × sin(45°) = 0.9997 × 0.7071 = 0.7069</p>
            <p className="ml-4">θ₂ = arcsin(0.7069) = 44.98°</p>
            <p><strong>Result:</strong> Small but measurable bending (0.02°) causes stars to appear slightly higher in the sky than their true position.</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Dispersion and Wavelength Dependence">
        <p>
          The refractive index of materials varies with wavelength—a phenomenon called <strong>dispersion</strong>. Short wavelengths (blue light) typically experience higher refractive indices than long wavelengths (red light), causing them to bend more when entering a medium. This is why prisms separate white light into a rainbow: different colors refract by different amounts. The relationship n(λ) can be approximated by the Cauchy equation or more accurately by the Sellmeier equation.
        </p>
        <p>
          In crown glass, for example, blue light (λ = 486 nm) has n ≈ 1.523 while red light (λ = 656 nm) has n ≈ 1.514. This 0.009 difference, though small, is sufficient to create the spectacular color separation in prisms and the chromatic aberration in simple lenses. The <strong>Abbe number</strong> quantifies dispersion: V = (n_d - 1)/(n_F - n_C), where lower values indicate higher dispersion. Flint glass (V ≈ 30-40) disperses light more than crown glass (V ≈ 55-65), making it ideal for spectroscopy but requiring correction in imaging applications.
        </p>
        <p>
          When light enters a medium, its frequency remains constant but its wavelength changes according to λ_medium = λ_vacuum / n. This wavelength compression is why underwater objects can appear different in color—the shorter wavelengths in the medium affect how light interacts with matter. Understanding dispersion is critical for designing achromatic lenses (which correct for chromatic aberration), spectrometers, and any optical system requiring accurate color reproduction.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Why does light slow down in a material?',
            answer: 'Light slows down in materials because electromagnetic waves interact with the electrons in atoms. When light enters a medium, it induces oscillations in the electron clouds of atoms. These oscillating electrons re-emit electromagnetic radiation that interferes with the original wave, creating a combined wave that propagates more slowly than in vacuum. The individual photons still travel at c between atoms, but the continuous absorption and re-emission process creates an effective slower speed v = c/n. Denser materials with more electrons per unit volume typically have higher refractive indices and slower light speeds.'
          },
          {
            question: 'What causes total internal reflection?',
            answer: 'Total internal reflection occurs when light travels from a denser medium (higher n) to a less dense medium (lower n) at an angle greater than the critical angle θc = arcsin(n₂/n₁). At the critical angle, Snell\'s law predicts θ₂ = 90° (refracted ray parallel to interface). For angles exceeding θc, sin(θ₂) would need to be greater than 1, which is impossible. Therefore, no refraction occurs—all light reflects back into the denser medium. This principle enables fiber optic cables to guide light over long distances with minimal loss, and creates brilliant reflections in cut diamonds.'
          },
          {
            question: 'How do you use Snell\'s law to find the angle of refraction?',
            answer: 'To find the refracted angle θ₂ using Snell\'s law: (1) Identify the refractive indices n₁ (incident medium) and n₂ (refracted medium), (2) Measure the incident angle θ₁ from the normal (perpendicular to interface), (3) Apply n₁ sin(θ₁) = n₂ sin(θ₂), (4) Solve for θ₂ = arcsin[(n₁/n₂) × sin(θ₁)]. Important: The angle must be measured from the normal, not the surface. If (n₁/n₂) × sin(θ₁) > 1, total internal reflection occurs and there is no refracted ray. Light bends toward the normal when n₂ > n₁ (entering denser medium) and away when n₂ < n₁.'
          },
          {
            question: 'What is the critical angle and how is it calculated?',
            answer: 'The critical angle θc is the minimum incident angle at which total internal reflection occurs when light travels from a denser to a less dense medium (n₁ > n₂). It\'s calculated using θc = arcsin(n₂/n₁). At this angle, the refracted ray grazes along the interface (θ₂ = 90°). For incident angles greater than θc, all light reflects back—no transmission occurs. Example: For glass (n = 1.5) to air (n = 1.0), θc = arcsin(1.0/1.5) = 41.8°. Critical angles are crucial for designing fiber optics, prisms, and understanding phenomena like mirages and the sparkle of gemstones.'
          },
          {
            question: 'Why does a straw look bent in water?',
            answer: 'A straw appears bent at the water surface due to refraction—light bending as it crosses the air-water interface. Light from the submerged portion of the straw travels through water (n = 1.33) and bends away from the normal when entering air (n = 1.0). Your eye traces the refracted ray backward in a straight line, making the underwater portion appear shallower and displaced from its true position. The bending angle depends on your viewing angle and follows Snell\'s law. This same effect makes pools appear shallower than they actually are (apparent depth = real depth / n), creating a safety hazard.'
          },
          {
            question: 'What is the difference between refractive index and critical angle?',
            answer: 'Refractive index (n) is an intrinsic property of a material measuring how much light slows down in that medium (n = c/v), typically between 1 (vacuum) and 2.4 (diamond). Critical angle (θc) is a geometric property that emerges when light travels between two specific materials with different indices. It\'s calculated from the indices using θc = arcsin(n₂/n₁) and only exists when light goes from higher to lower index (n₁ > n₂). While n is a material constant, θc depends on the pair of materials at an interface. For example, glass has one n value but different critical angles for glass-air, glass-water, and glass-oil interfaces.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
