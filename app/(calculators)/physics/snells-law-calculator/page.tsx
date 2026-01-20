import SnellsLawCalculator from '../../../_components/calculators/SnellsLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SnellsLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Snell's Law Calculator: Calculate Light Refraction Angles Online"
      description="Calculate refraction angles and refractive indices using Snell's Law (n₁ sin θ₁ = n₂ sin θ₂). Free online optics calculator for light refraction, critical angle, and total internal reflection."
      calculator={<SnellsLawCalculator />}
      slug="physics/snells-law-calculator"
      category="Optics"
      features={[
        "Calculate refracted angles using Snell's Law formula",
        "Find refractive indices from angles and Snell's Law",
        "Support for degrees and radians",
        "Total internal reflection detection",
        "Critical angle calculations",
        "Degrees and radians angle support"
      ]}
    >
      <SEOSection title="Understanding Snell's Law and Light Refraction">
        <p>
          The <strong>Snell&apos;s Law Calculator</strong> is an essential tool for understanding light refraction and optics. Snell&apos;s Law, named after mathematician Willebrord Snell, describes how light bends when passing between two different media with different refractive indices. The fundamental relationship is: <strong>n₁ sin(θ₁) = n₂ sin(θ₂)</strong>, where n is the refractive index and θ is the angle from the normal to the interface.
        </p>
        <p>
          This Snell&apos;s Law calculator allows you to calculate refraction angles, find refractive indices, and understand phenomena like total internal reflection and critical angles. Whether you&apos;re studying optics in physics class, designing optical systems, or analyzing light behavior in materials, this Snell&apos;s Law calculator provides accurate calculations with step-by-step explanations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Snell's Law Calculator">
        <p>
          The Snell&apos;s Law calculator offers three calculation methods:
        </p>
        <ol>
          <li><strong>Find Refracted Angle (θ₂):</strong> Enter n₁, incident angle (θ₁), and n₂ to find the refraction angle using Snell&apos;s Law</li>
          <li><strong>Find Second Refractive Index (n₂):</strong> Enter n₁, incident angle (θ₁), and refracted angle (θ₂) to find the second medium&apos;s refractive index</li>
          <li><strong>Find First Refractive Index (n₁):</strong> Enter incident angle (θ₁), refracted angle (θ₂), and n₂ to find the first medium&apos;s refractive index</li>
        </ol>
        <p>
          Select your calculation method, enter the known values, choose degrees or radians for angles, and click Calculate. The Snell&apos;s Law calculator will instantly compute the result with detailed formulas.
        </p>
      </SEOSection>

      <SEOSection title="Snell's Law Formula and Explanation">
        <p>
          Snell&apos;s Law is expressed mathematically as:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">n₁ sin(θ₁) = n₂ sin(θ₂)</p>
          <p className="text-sm text-gray-600 mt-2">Where:</p>
          <ul className="text-sm text-gray-600 mt-1">
            <li>n₁ = refractive index of first medium</li>
            <li>θ₁ = angle of incidence (from normal)</li>
            <li>n₂ = refractive index of second medium</li>
            <li>θ₂ = angle of refraction (from normal)</li>
          </ul>
        </div>

        <p>
          Snell&apos;s Law describes the bending of light as it passes between media with different optical densities. The refractive index (n) is a property that determines how much light slows down in a medium compared to its speed in a vacuum. This Snell&apos;s Law calculator applies the formula to find any unknown angle or refractive index.
        </p>

        <h3>Key Relationships from Snell&apos;s Law:</h3>
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <ul className="space-y-2">
            <li><strong>Refracted Angle:</strong> θ₂ = arcsin((n₁/n₂) × sin(θ₁))</li>
            <li><strong>Second Refractive Index:</strong> n₂ = (n₁ × sin(θ₁)) / sin(θ₂)</li>
            <li><strong>First Refractive Index:</strong> n₁ = (n₂ × sin(θ₂)) / sin(θ₁)</li>
          </ul>
        </div>
      </SEOSection>

      <SEOSection title="Common Refractive Indices">
        <p>
          Here are typical refractive indices used in Snell&apos;s Law calculations:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Material</th>
                <th className="border border-gray-300 px-4 py-2">Refractive Index (n)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Vacuum</td>
                <td className="border border-gray-300 px-4 py-2">1.0 (reference)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Air</td>
                <td className="border border-gray-300 px-4 py-2">1.0003 ≈ 1.0</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Water</td>
                <td className="border border-gray-300 px-4 py-2">1.33</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Glass (crown)</td>
                <td className="border border-gray-300 px-4 py-2">1.52</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Glass (flint)</td>
                <td className="border border-gray-300 px-4 py-2">1.7</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Diamond</td>
                <td className="border border-gray-300 px-4 py-2">2.42</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Oil</td>
                <td className="border border-gray-300 px-4 py-2">1.46-1.49</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Critical Angle and Total Internal Reflection">
        <p>
          When light travels from a denser medium (higher n) to a less dense medium (lower n), a critical angle exists beyond which total internal reflection occurs. This Snell&apos;s Law calculator detects total internal reflection and provides critical angle information.
        </p>
        <p>
          <strong>Critical Angle Formula:</strong> θc = arcsin(n₂/n₁) when n₁ &gt; n₂
        </p>
        <p>
          When the incident angle exceeds the critical angle, light cannot refract into the second medium and instead reflects completely back into the first medium. This phenomenon is used in fiber optics, prisms, and other optical devices.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications of Snell's Law">
        <p>
          Snell&apos;s Law is fundamental to numerous optical and technological applications:
        </p>
        <SEOList items={[
          "Optical Lenses: Designing lenses for cameras, microscopes, and telescopes using Snell&apos;s Law calculations",
          "Fiber Optics: Utilizing total internal reflection in optical fibers for telecommunications",
          "Prisms: Using refraction to separate light into its component colors (spectroscopy)",
          "Rainbows: Understanding how water droplets refract sunlight at specific angles",
          "Diamond Cutting: Calculating cuts to maximize brilliance through refraction and reflection",
          "Contact Lenses: Designing corrective lenses based on refraction principles",
          "Underwater Vision: Understanding why objects appear displaced when viewed from water",
          "Astronomical Instruments: Designing telescopes and spectrometers with precise optical elements"
        ]} />
      </SEOSection>

      <SEOSection title="Snell's Law Examples">
        <h3>Example 1: Light Entering Water</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p>Light travels from air (n=1.0) to water (n=1.33) at an incident angle of 30°. Find the refraction angle.</p>
          <ul className="mt-2 space-y-1">
            <li>Given: n₁ = 1.0, θ₁ = 30°, n₂ = 1.33</li>
            <li>Using Snell&apos;s Law: 1.0 × sin(30°) = 1.33 × sin(θ₂)</li>
            <li>0.5 = 1.33 × sin(θ₂)</li>
            <li><strong>Result:</strong> θ₂ ≈ 22.08° (light bends toward normal)</li>
          </ul>
        </div>

        <h3>Example 2: Critical Angle in Glass</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p>Light traveling through glass (n=1.5) toward air (n=1.0). Find the critical angle.</p>
          <ul className="mt-2 space-y-1">
            <li>Critical Angle: sin(θc) = n₂/n₁ = 1.0/1.5 = 0.667</li>
            <li><strong>Result:</strong> θc ≈ 41.8°</li>
            <li>Beyond 41.8°, total internal reflection occurs, no light escapes to air</li>
          </ul>
        </div>

        <h3>Example 3: Light Exiting Diamond</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>Light in diamond (n=2.42) hits the surface at 40° incident angle. What happens?</p>
          <ul className="mt-2 space-y-1">
            <li>Critical angle: sin(θc) = 1.0/2.42 = 0.413</li>
            <li>Critical angle: θc ≈ 24.4°</li>
            <li>Since 40° &gt; 24.4°, <strong>total internal reflection occurs</strong></li>
            <li>Light reflects back into the diamond, not exiting</li>
          </ul>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Refractive Index">
        <p>
          The refractive index (n) is the ratio of the speed of light in a vacuum to its speed in a medium:
        </p>
        <p className="text-center font-mono text-lg my-4">n = c / v</p>
        <p>
          Where c is the speed of light in vacuum (3×10⁸ m/s) and v is the speed of light in the medium. Higher refractive indices mean light travels slower in the medium. This is why diamonds sparkle—their high refractive index (2.42) causes significant light bending and total internal reflection.
        </p>
      </SEOSection>

      <SEOFAQ questions={[
        {
          question: "What is Snell's Law and why is it important?",
          answer: "Snell's Law (n₁ sin θ₁ = n₂ sin θ₂) describes how light bends when passing between media with different refractive indices. It's fundamental to understanding light refraction and is essential for designing optical systems, lenses, fiber optics, and understanding natural phenomena like rainbows. This Snell's Law calculator applies the formula to find refraction angles or refractive indices in various optics problems."
        },
        {
          question: "What does refractive index mean?",
          answer: "Refractive index (n) measures how much a medium slows down light compared to its speed in vacuum. It's calculated as n = c/v, where c is light speed in vacuum and v is light speed in the medium. Higher refractive indices indicate light slows more in that medium. Air ≈ 1.0, water ≈ 1.33, glass ≈ 1.5, diamond ≈ 2.42. The Snell's Law calculator uses these values to compute refraction angles."
        },
        {
          question: "What is the critical angle and total internal reflection?",
          answer: "The critical angle is the incident angle beyond which light cannot refract into the second medium and instead reflects completely back into the first medium. This occurs when light travels from a denser to less dense medium. Critical angle formula: sin(θc) = n₂/n₁ (when n₁ > n₂). Total internal reflection is the phenomenon when incident angle exceeds critical angle. This Snell's Law calculator detects this condition and alerts you when it occurs."
        },
        {
          question: "How do you calculate the refraction angle using Snell's Law?",
          answer: "To calculate refraction angle, rearrange Snell's Law to: θ₂ = arcsin((n₁/n₂) × sin(θ₁)). Enter the incident angle (θ₁), first refractive index (n₁), and second refractive index (n₂) into this Snell's Law calculator. The calculator automatically performs the calculation and shows the refracted angle. Remember angles are measured from the normal (perpendicular) to the surface, not from the surface itself."
        },
        {
          question: "Why does light bend when entering water?",
          answer: "Light bends because it slows down when entering water. Water has a higher refractive index (1.33) than air (1.0). According to Snell's Law, when light enters a denser medium, it bends toward the normal to the surface. This is why objects underwater appear closer and distorted. This Snell's Law calculator helps predict exactly how much light will bend for any pair of media and incident angle."
        },
        {
          question: "What is the difference between angle of incidence and angle of refraction?",
          answer: "The angle of incidence (θ₁) is the angle between the incoming light ray and the normal (perpendicular) to the surface. The angle of refraction (θ₂) is the angle between the refracted light ray and the normal. Both are measured from the normal, not from the surface. Snell's Law relates these angles through the refractive indices: n₁ sin(θ₁) = n₂ sin(θ₂). This Snell's Law calculator uses this relationship for all calculations."
        }
      ]} />

      <SEOSection title="Conclusion">
        <p>
          The <strong>Snell's Law Calculator</strong> is an indispensable tool for students, scientists, and engineers working with light refraction and optics. By providing three calculation methods and instant results with detailed explanations, this Snell's Law calculator simplifies complex optical calculations. Whether you&apos;re studying physics, designing optical systems, or exploring light behavior in materials, accurate Snell's Law calculations are essential.
        </p>
        <p>
          Understanding light refraction through Snell's Law is fundamental to modern optics, from corrective lenses to fiber optic communications. Use this free online Snell's Law calculator to explore refraction, predict optical behavior, and master the principles of light behavior across different media.
        </p>
        <p>
          For related calculations, explore our {createInternalLink('wavelength-calculator', 'Wavelength Calculator')} and {createInternalLink('frequency-calculator', 'Frequency Calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
