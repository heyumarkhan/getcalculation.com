import SpeedOfLightCalculator from '../../../_components/calculators/SpeedOfLightCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SpeedOfLightCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Speed of Light Calculator: Calculate Distance, Time, Frequency & Wavelength"
      description="Calculate distance, time, frequency, and wavelength using the speed of light (c = 299,792,458 m/s). Free online physics calculator for optics, astronomy, telecommunications, and electromagnetic wave calculations."
      calculator={<SpeedOfLightCalculator />}
      slug="physics/speed-of-light-calculator"
      category="Optics & Waves"
      features={[
        "Calculate distance from time (d = c × t)",
        "Calculate time from distance (t = d / c)",
        "Calculate frequency from wavelength (f = c / λ)",
        "Calculate wavelength from frequency (λ = c / f)",
        "Support for multiple units (light-years, AU, light-seconds, nm, Hz, etc.)",
        "Uses exact speed of light constant (299,792,458 m/s)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding the Speed of Light: A Fundamental Constant of Nature">
        <p>
          The speed of light in vacuum, denoted as <strong>c</strong>, is one of the most fundamental constants in physics. It has a value of <strong>299,792,458 meters per second</strong> (approximately 3 × 10⁸ m/s or 186,282 miles per second). This constant is universal and plays a crucial role in special relativity, electromagnetism, quantum mechanics, and our understanding of space and time. Our Speed of Light Calculator simplifies calculations involving the speed of light, allowing you to determine distance, time, frequency, and wavelength using the fundamental relationships: <strong>d = c × t</strong>, <strong>t = d / c</strong>, <strong>f = c / λ</strong>, and <strong>λ = c / f</strong>.
        </p>
        <p>
          Whether you&apos;re studying optics, astronomy, telecommunications, electromagnetic waves, or relativistic physics, understanding and working with the speed of light is essential. Our calculator helps you perform accurate calculations with comprehensive unit support, including light-years, astronomical units, light-seconds, and more.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Speed of Light Calculator">
        <p>
          Our Speed of Light Calculator offers four calculation methods:
        </p>
        <SEOList ordered items={[
          '<strong>Calculate Distance from Time:</strong> Enter the time for light to travel, and the calculator determines the distance traveled using d = c × t. Useful for understanding distances in light-years, light-seconds, etc.',
          '<strong>Calculate Time from Distance:</strong> Enter the distance, and the calculator determines how long it takes light to travel that distance using t = d / c. Essential for astronomy and understanding cosmic distances.',
          '<strong>Calculate Frequency from Wavelength:</strong> Enter the wavelength of electromagnetic radiation, and the calculator determines the frequency using f = c / λ. Fundamental for optics and wave physics.',
          '<strong>Calculate Wavelength from Frequency:</strong> Enter the frequency of electromagnetic radiation, and the calculator determines the wavelength using λ = c / f. Essential for telecommunications and spectroscopy.'
        ]} />
        <p>
          Select your calculation method, enter the known value with your preferred units, and click Calculate to get instant results with detailed step-by-step solutions. The calculator supports multiple units for distance (meters, kilometers, light-years, AU, light-seconds, etc.), time (seconds, milliseconds, years, etc.), wavelength (meters, nanometers, micrometers, etc.), and frequency (Hz, kHz, MHz, GHz, THz).
        </p>
      </SEOSection>

      <SEOSection title="The Speed of Light Formulas Explained">
        <p>
          The speed of light constant enables several fundamental relationships:
        </p>

        <h3>1. Distance from Time:</h3>
        <SEOFormula
          formula="d = c × t"
          description="Where: d = Distance, c = Speed of Light (299,792,458 m/s), t = Time"
        />
        <p>
          This formula calculates how far light travels in a given time. For example, light travels approximately 299,792,458 meters (about 299,792 kilometers) in one second.
        </p>

        <h3>2. Time from Distance:</h3>
        <SEOFormula
          formula="t = d / c"
          description="Where: t = Time, d = Distance, c = Speed of Light (299,792,458 m/s)"
        />
        <p>
          This formula calculates how long it takes light to travel a given distance. For example, light takes about 8 minutes and 20 seconds to travel from the Sun to Earth (1 AU ≈ 150 million km).
        </p>

        <h3>3. Frequency from Wavelength:</h3>
        <SEOFormula
          formula="f = c / λ"
          description="Where: f = Frequency, c = Speed of Light (299,792,458 m/s), λ = Wavelength"
        />
        <p>
          This formula relates the frequency and wavelength of electromagnetic waves. For any electromagnetic wave, the product of frequency and wavelength equals the speed of light: c = f × λ.
        </p>

        <h3>4. Wavelength from Frequency:</h3>
        <SEOFormula
          formula="λ = c / f"
          description="Where: λ = Wavelength, c = Speed of Light (299,792,458 m/s), f = Frequency"
        />
        <p>
          This formula determines the wavelength of electromagnetic radiation from its frequency. Higher frequency corresponds to shorter wavelength.
        </p>

        <h3>Understanding the Speed of Light Constant:</h3>
        <SEOList items={[
          '<strong>Exact Value:</strong> c = 299,792,458 m/s (exactly, as defined by the International System of Units)',
          '<strong>Approximate Value:</strong> c ≈ 3 × 10⁸ m/s or 186,282 miles per second',
          '<strong>Universal Constant:</strong> The speed of light in vacuum is the same for all observers, regardless of their motion (Einstein\'s principle of relativity)',
          '<strong>Maximum Speed:</strong> According to special relativity, nothing can travel faster than the speed of light in vacuum',
          '<strong>Wavelength-Frequency Relationship:</strong> The speed of light connects frequency and wavelength: c = f × λ, where f is frequency and λ is wavelength'
        ]} />
      </SEOSection>

      <SEOSection title="Common Units and Conversions">
        <p>
          Working with the speed of light often involves specialized units:
        </p>
        <SEOList items={[
          '<strong>Light-year (ly):</strong> The distance light travels in one year, approximately 9.461 × 10¹⁵ meters or 9.461 trillion kilometers. Used for astronomical distances.',
          '<strong>Astronomical Unit (AU):</strong> The average distance from Earth to the Sun, approximately 1.496 × 10¹¹ meters. Light takes about 8 minutes and 20 seconds to travel 1 AU.',
          '<strong>Light-second (ls):</strong> The distance light travels in one second, equal to 299,792,458 meters (approximately 299,792 kilometers).',
          '<strong>Light-minute (lm):</strong> The distance light travels in one minute, equal to 299,792,458 × 60 meters.',
          '<strong>Light-hour (lh):</strong> The distance light travels in one hour, equal to 299,792,458 × 3600 meters.',
          '<strong>Frequency Units:</strong> Hertz (Hz), kilohertz (kHz), megahertz (MHz), gigahertz (GHz), terahertz (THz) for electromagnetic waves.',
          '<strong>Wavelength Units:</strong> Meters (m), nanometers (nm), micrometers (μm), millimeters (mm), centimeters (cm), Angstroms (Å) for electromagnetic radiation.'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications of Speed of Light Calculations">
        <p>
          Speed of light calculations are essential in numerous fields and applications:
        </p>
        <SEOList items={[
          '<strong>Astronomy and Astrophysics:</strong> Understanding cosmic distances, calculating light travel times from stars and galaxies, determining how long ago light was emitted from distant objects, and understanding the observable universe.',
          '<strong>Telecommunications:</strong> Calculating signal propagation delays in fiber-optic cables, satellite communications, and radio transmissions. Signal delays are critical in network design.',
          '<strong>GPS and Navigation:</strong> Accounting for light travel time in GPS calculations, understanding satellite signal delays, and precise positioning systems.',
          '<strong>Optics and Photonics:</strong> Relating frequency and wavelength in optical systems, designing lasers, optical fibers, and photonic devices.',
          '<strong>Spectroscopy:</strong> Converting between wavelength and frequency in electromagnetic spectra, analyzing atomic and molecular transitions, and identifying chemical compounds.',
          '<strong>Special Relativity:</strong> Understanding time dilation, length contraction, and the fundamental limits imposed by the speed of light.',
          '<strong>Quantum Mechanics:</strong> Relating photon energy, frequency, and wavelength using E = hf = hc/λ, where h is Planck\'s constant.',
          '<strong>Electromagnetic Wave Theory:</strong> Understanding wave propagation, calculating wave properties, and analyzing electromagnetic field behavior.',
          '<strong>Medical Imaging:</strong> Understanding X-ray, MRI, and other imaging technologies that use electromagnetic radiation.',
          '<strong>Wireless Communications:</strong> Designing antennas, calculating frequencies and wavelengths for radio, Wi-Fi, cellular, and other wireless technologies.'
        ]} />
      </SEOSection>

      <SEOSection title="Interesting Facts About the Speed of Light">
        <p>
          The speed of light has profound implications for our understanding of physics and the universe:
        </p>
        <SEOList items={[
          '<strong>Universal Speed Limit:</strong> According to Einstein\'s special relativity, nothing with mass can reach or exceed the speed of light. As objects approach the speed of light, they require infinite energy to accelerate further.',
          '<strong>Time Dilation:</strong> Moving clocks run slower relative to stationary clocks. This effect becomes significant at speeds approaching the speed of light.',
          '<strong>Length Contraction:</strong> Objects moving at high speeds appear shorter in the direction of motion to stationary observers.',
          '<strong>Mass-Energy Equivalence:</strong> E = mc² relates mass and energy, where c is the speed of light. This equation shows that mass can be converted to energy and vice versa.',
          '<strong>Cosmic Distance Ladder:</strong> Light-years provide a natural unit for astronomical distances, allowing astronomers to measure and communicate vast cosmic distances.',
          '<strong>Seeing into the Past:</strong> When we observe distant stars and galaxies, we see them as they were in the past. For example, light from the nearest star (Proxima Centauri) takes about 4.24 years to reach Earth, so we see it as it was 4.24 years ago.',
          '<strong>Redshift and Cosmology:</strong> The expansion of the universe causes light from distant galaxies to be redshifted, providing evidence for the Big Bang and cosmic expansion.'
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the speed of light?",
            answer: "The speed of light in vacuum is exactly 299,792,458 meters per second (approximately 3 × 10⁸ m/s or 186,282 miles per second). It is a universal constant and the maximum speed at which information and matter can travel in the universe. This constant is fundamental to physics, appearing in equations of special relativity, electromagnetism, and quantum mechanics."
          },
          {
            question: "How do you calculate distance from time using the speed of light?",
            answer: "To calculate the distance light travels in a given time, use the formula: d = c × t, where d is distance, c is the speed of light (299,792,458 m/s), and t is time. For example, light travels approximately 299,792,458 meters (about 299,792 kilometers) in one second. In one year, light travels one light-year, which is approximately 9.461 × 10¹⁵ meters."
          },
          {
            question: "How long does it take light to travel from the Sun to Earth?",
            answer: "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth. The average distance from Earth to the Sun is about 1.496 × 10¹¹ meters (1 Astronomical Unit), so using t = d / c: t = 1.496 × 10¹¹ m / 299,792,458 m/s ≈ 499 seconds ≈ 8 minutes and 19 seconds."
          },
          {
            question: "What is the relationship between frequency and wavelength?",
            answer: "For electromagnetic waves, frequency (f) and wavelength (λ) are related through the speed of light: c = f × λ, where c is the speed of light (299,792,458 m/s). This means: f = c / λ and λ = c / f. Higher frequency corresponds to shorter wavelength, and vice versa. This relationship applies to all electromagnetic radiation, from radio waves to gamma rays."
          },
          {
            question: "Why is the speed of light constant?",
            answer: "According to Einstein's special theory of relativity, the speed of light in vacuum is constant for all observers, regardless of their motion relative to the light source. This principle is one of the foundational postulates of special relativity and has been verified by numerous experiments. This constancy leads to remarkable consequences like time dilation and length contraction."
          },
          {
            question: "Can anything travel faster than the speed of light?",
            answer: "According to current physics understanding, nothing with mass can reach or exceed the speed of light in vacuum. As objects with mass approach the speed of light, they require increasingly more energy to accelerate, approaching infinite energy at the speed of light. However, some phenomena like quantum entanglement appear to have instantaneous effects, though no information is actually transmitted faster than light."
          },
          {
            question: "What is a light-year?",
            answer: "A light-year is the distance that light travels in one year in vacuum. It is approximately 9.461 × 10¹⁵ meters or 9.461 trillion kilometers (about 5.879 trillion miles). Light-years are used to measure vast astronomical distances, such as distances between stars and galaxies. For example, the nearest star to Earth (Proxima Centauri) is about 4.24 light-years away."
          },
          {
            question: "How does the speed of light affect telecommunications?",
            answer: "The speed of light determines signal propagation delays in all communication systems. Even at light speed, signals take time to travel: approximately 3.33 microseconds per kilometer in vacuum (or about 5 microseconds per kilometer in fiber-optic cables). These delays are critical in GPS systems, satellite communications, and high-frequency trading networks where milliseconds matter."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The speed of light is a fundamental constant that connects distance, time, frequency, and wavelength in physics. Our Speed of Light Calculator provides a powerful and accurate tool for performing calculations involving this universal constant, making complex physics problems simple and accessible for students, scientists, engineers, and astronomy enthusiasts.
        </p>
        <p>
          By supporting multiple calculation methods with comprehensive unit conversions and detailed step-by-step solutions, this calculator empowers users to solve problems in optics, astronomy, telecommunications, and electromagnetic wave theory. For related calculations, explore our {createInternalLink('wavelength-to-energy-calculator')} for photon energy calculations or our {createInternalLink('velocity-calculator')} for general velocity calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

