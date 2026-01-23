import SpeedOfSoundCalculator from '../../../_components/calculators/SpeedOfSoundCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata = {
  title: 'Speed of Sound Calculator: Calculate Sound Velocity and Mach Number',
  description: 'Calculate speed of sound in air, water, and other mediums. Compute Mach number, frequency, wavelength, and sound velocity with temperature corrections.',
  keywords: ['speed of sound calculator', 'sound velocity calculator', 'mach number calculator', 'speed of sound air', 'sound frequency wavelength', 'acoustic calculator', 'speed of sound water', 'mach calculator', 'supersonic calculator', 'sound speed'],
  openGraph: {
    title: 'Speed of Sound Calculator',
    description: 'Calculate speed of sound and Mach number with our free online calculator.',
    url: 'https://getcalculation.com/physics/speed-of-sound-calculator',
    siteName: 'GetCalculation.com',
    locale: 'en_US',
    type: 'website'
  }
};

export default function SpeedOfSoundCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Speed of Sound Calculator: Calculate Sound Velocity (v = 331.3 + 0.606×T)"
      description="Calculate speed of sound in any medium with temperature effects, Mach number, frequency, and wavelength calculations."
      calculator={<SpeedOfSoundCalculator />}
      slug="physics/speed-of-sound-calculator"
      category="Kinematics"
      features={[
        "Calculate speed of sound in air with temperature compensation",
        "Speed of sound in multiple mediums (water, steel, glass, aluminum)",
        "Mach number calculations for supersonic speeds",
        "Frequency and wavelength relationships",
        "Temperature-dependent calculations (Celsius and Fahrenheit)",
        "Multiple speed units (m/s, km/h, mph, ft/s, knots)",
        "Step-by-step solution breakdown"
      ]}
    >
      <SEOSection title="Understanding Speed of Sound: Complete Physics Guide">
        <p>
          Speed of sound is a fundamental property of any medium, representing how fast sound waves travel through it. Whether you&apos;re studying acoustics, aerospace engineering, or underwater communications, understanding sound velocity is essential. Our Speed of Sound Calculator makes it easy to calculate sound speed in various mediums with temperature effects using the formula: <strong>v = 331.3 + 0.606 × T</strong> (for air in Celsius), and to determine Mach numbers, frequency, and wavelength relationships.
        </p>
        <p>
          Sound travels at different speeds in different mediums. In air at sea level and 15°C (59°F), sound travels at approximately 340 m/s. In water, sound travels nearly 4.5 times faster (~1480 m/s), and in solids like steel, it travels even faster (~5000 m/s). Temperature significantly affects sound speed in gases, but has minimal effect in liquids and solids.
        </p>
        <p>
          The Mach number, named after physicist Ernst Mach, describes how fast an object moves relative to the speed of sound. Aircraft flying at Mach 1 travel at the speed of sound; Mach 2 means twice the speed of sound (supersonic). This calculator handles all the complex calculations and conversions automatically.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Speed of Sound Calculator">
        <p>
          Our Speed of Sound Calculator is designed for comprehensive acoustic calculations:
        </p>
        <ol>
          <li><strong>Select a Medium:</strong> Choose from air at various temperatures, water, seawater, or solid materials</li>
          <li><strong>Enter Temperature:</strong> If using air, set the temperature (or use defaults)</li>
          <li><strong>Enter Values:</strong> Input any one or combination of Mach number, velocity, frequency, or wavelength</li>
          <li><strong>Click Calculate:</strong> Get instant results with complete step-by-step breakdown</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and provides results in your preferred units.
        </p>
      </SEOSection>

      <SEOSection title="Speed of Sound Formula and Related Equations">
        <p>
          The speed of sound depends on the medium and, for gases, on temperature:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">v = 331.3 + 0.606 × T</p>
          <p className="text-sm text-gray-600 mt-2">Where: v = speed of sound (m/s), T = temperature (°C)</p>
        </div>

        <h3>Related Formulas</h3>
        <ul>
          <li><strong>Speed of Sound in Air:</strong> v = 331.3 + 0.606 × T (T in °C)</li>
          <li><strong>Mach Number:</strong> M = v_object / v_sound</li>
          <li><strong>Frequency and Wavelength:</strong> v = f × λ</li>
          <li><strong>Frequency from Wavelength:</strong> f = v / λ</li>
          <li><strong>Wavelength from Frequency:</strong> λ = v / f</li>
          <li><strong>Temperature Conversion:</strong> T(°C) = (T(°F) - 32) × 5/9</li>
        </ul>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Speed of Sound (v):</strong> Distance sound travels per unit time in a medium, typically in m/s, km/h, mph, or knots.</li>
          <li><strong>Mach Number (M):</strong> Dimensionless ratio of object velocity to sound velocity. M &lt; 1 is subsonic, M = 1 is sonic, M &gt; 1 is supersonic.</li>
          <li><strong>Frequency (f):</strong> Number of sound wave cycles per second, measured in Hertz (Hz).</li>
          <li><strong>Wavelength (λ):</strong> Distance between consecutive sound wave peaks, measured in meters or other length units.</li>
          <li><strong>Temperature Effect:</strong> In gases, sound speed increases with temperature. In liquids and solids, the effect is minimal.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Speed of Sound in Different Mediums">
        <p>
          Sound travels at dramatically different speeds depending on the medium:
        </p>

        <h3>Gases</h3>
        <SEOList items={[
          "Air (0°C): 331 m/s - Cold air condition",
          "Air (15°C): 340 m/s - Standard reference temperature",
          "Air (20°C): 343 m/s - Room temperature",
          "Air (25°C): 346 m/s - Warm room",
          "Hydrogen (20°C): 1284 m/s - Much faster than air due to low density"
        ]} />

        <h3>Liquids</h3>
        <SEOList items={[
          "Water (20°C): 1482 m/s - Fresh water at room temperature",
          "Seawater (20°C): 1521 m/s - Salt water sound travels faster",
          "Mercury (25°C): 1450 m/s - Similar to water despite different properties",
          "Ethanol (20°C): 1160 m/s - Organic liquid, slower than water"
        ]} />

        <h3>Solids</h3>
        <SEOList items={[
          "Aluminum (20°C): 6420 m/s - Low density solid",
          "Steel: 5000 m/s - High speed in dense metal",
          "Glass: 5960 m/s - Vitreous material",
          "Copper: 4760 m/s - Dense metal",
          "Diamond: 12000 m/s - Hardest natural material, fastest sound propagation"
        ]} />
      </SEOSection>

      <SEOSection title="Temperature Effects on Sound Speed">
        <p>
          Temperature has a significant effect on sound speed in air and other gases, but minimal effect in liquids and solids:
        </p>

        <h3>Temperature Dependency in Air</h3>
        <ul>
          <li><strong>Formula:</strong> v = 331.3 + 0.606 × T (T in °C)</li>
          <li><strong>Temperature Change Impact:</strong> For every 1°C increase, sound speed increases by ~0.6 m/s</li>
          <li><strong>Freezing Point (-20°C):</strong> 318.1 m/s</li>
          <li><strong>Standard Conditions (15°C):</strong> 340.3 m/s</li>
          <li><strong>Body Temperature (37°C):</strong> 353.8 m/s</li>
          <li><strong>Boiling Water (100°C):</strong> 387.3 m/s</li>
        </ul>

        <h3>Why Temperature Matters</h3>
        <ul>
          <li>Warmer air has molecules with higher kinetic energy, transferring sound waves faster</li>
          <li>Temperature affects humidity, which slightly changes sound propagation</li>
          <li>Meteorological inversions create unusual sound behavior in atmosphere</li>
          <li>Underwater sound speed varies with temperature and salinity</li>
        </ul>
      </SEOSection>

      <SEOSection title="Understanding Mach Number and Supersonic Flight">
        <p>
          Mach number is critical for aviation and aerospace applications:
        </p>

        <h3>Mach Number Classifications</h3>
        <ul>
          <li><strong>Subsonic (M &lt; 0.8):</strong> Commercial aircraft cruising, aerodynamic effects minimal</li>
          <li><strong>Transonic (0.8 &lt; M &lt; 1.3):</strong> Shock wave formation begins, critical flight regime</li>
          <li><strong>Sonic (M = 1):</strong> Exactly at sound speed, sound barrier breaking point</li>
          <li><strong>Supersonic (1 &lt; M &lt; 5):</strong> Beyond sound speed, shock cones form</li>
          <li><strong>Hypersonic (M &gt; 5):</strong> Extreme speeds, aerothermal heating dominant, spacecraft re-entry</li>
        </ul>

        <h3>Aviation Examples</h3>
        <ul>
          <li><strong>Commercial Airliner:</strong> Mach 0.85 (cruise speed ~490 mph)</li>
          <li><strong>Fighter Jet:</strong> Mach 2.0+ (supersonic, military applications)</li>
          <li><strong>Concorde (retired):</strong> Mach 2.04 (supersonic airliner)</li>
          <li><strong>Space Shuttle:</strong> Mach 25+ (re-entry hypersonic speeds)</li>
          <li><strong>Sound Barrier Broken:</strong> October 14, 1947 (Chuck Yeager at Mach 1.07)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequency and Wavelength in Sound">
        <p>
          Sound waves have relationships between speed, frequency, and wavelength described by the wave equation:
        </p>

        <h3>The Wave Equation</h3>
        <ul>
          <li><strong>Wave Equation:</strong> v = f × λ (Speed = Frequency × Wavelength)</li>
          <li><strong>Frequency:</strong> f = v / λ</li>
          <li><strong>Wavelength:</strong> λ = v / f</li>
        </ul>

        <h3>Human Hearing Range</h3>
        <ul>
          <li><strong>Frequency Range:</strong> 20 Hz to 20,000 Hz (20 kHz)</li>
          <li><strong>Infrasound:</strong> &lt; 20 Hz (below human hearing)</li>
          <li><strong>Ultrasound:</strong> &gt; 20 kHz (above human hearing)</li>
          <li><strong>Wavelengths in Air (at 340 m/s):</strong> From 17 m (20 Hz) to 0.017 m (20 kHz)</li>
        </ul>

        <h3>Sound Applications</h3>
        <ul>
          <li><strong>Ultrasound (40 kHz):</strong> Medical imaging, thickness gauges</li>
          <li><strong>Sonar (50 kHz):</strong> Underwater detection and ranging</li>
          <li><strong>Dog Whistle (25 kHz):</strong> Beyond human hearing but audible to dogs</li>
          <li><strong>Earthquake Waves:</strong> Infrasound propagation through earth</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "Why does sound travel faster in water than in air?",
            answer: "Sound travels faster in water (~1482 m/s) than in air (~340 m/s) because water molecules are much more densely packed and transmit vibrations more efficiently. Denser mediums generally allow faster sound propagation, which is why sound travels even faster in solids."
          },
          {
            question: "What is the sound barrier and why was it significant?",
            answer: "The sound barrier refers to Mach 1, the speed of sound. It was called a barrier because aircraft approaching this speed experienced extreme shock waves and aerodynamic effects. Chuck Yeager first broke the sound barrier on October 14, 1947, in the Bell X-1 aircraft flying at Mach 1.07."
          },
          {
            question: "How does temperature affect sound speed in air?",
            answer: "Temperature significantly affects sound speed in air. The formula v = 331.3 + 0.606 × T shows that speed increases ~0.6 m/s per degree Celsius. At 0°C, sound travels at 331 m/s; at 20°C (room temperature), it reaches 343 m/s. This is because warmer air molecules move faster, transmitting vibrations more quickly."
          },
          {
            question: "What is the relationship between frequency and wavelength?",
            answer: "Frequency and wavelength are inversely related through the wave equation: v = f × λ. Higher frequency sounds have shorter wavelengths, while lower frequency sounds have longer wavelengths. For example, at 340 m/s in air, a 100 Hz sound has a wavelength of 3.4 m, while a 10,000 Hz sound has a wavelength of 0.034 m."
          },
          {
            question: "Can sound travel in a vacuum?",
            answer: "No, sound cannot travel in a vacuum. Sound requires a medium (gas, liquid, or solid) to propagate because it depends on molecular vibrations to transmit. In space, there is no air or other medium, so sound cannot travel. This is why space is silent, and spacecraft must use radio waves to communicate."
          },
          {
            question: "What is the difference between subsonic and supersonic flight?",
            answer: "Subsonic flight means traveling below Mach 1 (below the speed of sound). Supersonic flight means traveling above Mach 1 (faster than sound). Supersonic aircraft experience shock waves and extremely high air friction and heating. Most commercial aircraft cruise at subsonic speeds (Mach 0.85) for safety, efficiency, and passenger comfort."
          }
        ]}
      />

      <SEOSection title="Practical Applications of Sound Speed">
        <p>
          Understanding sound speed is critical in numerous applications:
        </p>
        <SEOList items={[
          "Sonar and Underwater Communication: Determining accurate distances and locations underwater",
          "Ultrasound Medical Imaging: Measuring organ sizes and detecting abnormalities",
          "Acoustic Insulation: Designing walls and materials to block sound transmission",
          "Music and Audio: Understanding instrument frequencies, acoustics, and sound design",
          "Aircraft Design: Managing supersonic flight, shock waves, and aerodynamic heating",
          "Seismic Studies: Measuring earthquake waves traveling through earth layers",
          "Architectural Acoustics: Designing concert halls and auditoriums for optimal sound",
          "Shock Wave Research: Understanding phenomena from sonic booms to detonations",
          "Noise Control: Engineering solutions to reduce unwanted sound",
          "Meteorological Studies: Tracking sound speed variations in atmosphere"
        ]} />
      </SEOSection>

      <SEOSection title="Unit Conversions for Speed">
        <p>
          The calculator supports multiple speed units for flexibility:
        </p>

        <h3>Speed Unit Conversions</h3>
        <ul>
          <li><strong>m/s (meters per second)</strong> - SI standard unit</li>
          <li><strong>km/h (kilometers per hour)</strong> - Common metric unit</li>
          <li><strong>mph (miles per hour)</strong> - Imperial unit, common in USA</li>
          <li><strong>ft/s (feet per second)</strong> - Imperial unit</li>
          <li><strong>knots (nautical miles per hour)</strong> - Aviation and maritime standard</li>
        </ul>

        <h3>Quick Conversions</h3>
        <ul>
          <li>340 m/s = 1224 km/h = 761 mph = 1116 ft/s = 661 knots (speed of sound in air at 15°C)</li>
          <li>1 m/s = 3.6 km/h = 2.237 mph = 3.281 ft/s = 1.944 knots</li>
        </ul>
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          For comprehensive acoustic and motion calculations, explore related tools:
        </p>
        <ul>
          <li>{createInternalLink('velocity-calculator')} - Velocity and speed calculations</li>
          <li>{createInternalLink('density-mass-volume-calculator')} - Density and mass calculations</li>
          <li>{createInternalLink('volume-of-hemisphere')} - Volume calculations</li>
        </ul>
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The Speed of Sound Calculator is an essential tool for physicists, engineers, acousticians, and students. By understanding how sound travels at different speeds in different mediums, you can solve acoustic problems, design better sound systems, understand supersonic flight, and appreciate the physics of sound waves. Whether you're analyzing underwater communication, designing aircraft, or exploring acoustics, this calculator provides accurate, instant results with complete step-by-step breakdowns. Explore the fascinating world of sound propagation and its applications in science and technology!
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
