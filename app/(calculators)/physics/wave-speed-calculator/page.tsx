import WaveSpeedCalculator from '../../../_components/calculators/WaveSpeedCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WaveSpeedCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wave Speed Calculator: Calculate v = f × λ Instantly"
      description="Calculate wave speed from frequency and wavelength (v = f × λ) or from distance and time (v = d / t). Free online physics calculator for waves, sound, light, and electromagnetic waves with multiple unit support."
      calculator={<WaveSpeedCalculator />}
      slug="physics/wave-speed-calculator"
      category="Waves"
      features={[
        "Calculate wave speed from frequency and wavelength",
        "Calculate wave speed from distance and time",
        "Calculate frequency or wavelength from wave speed",
        "Multiple unit support (m/s, km/h, Hz, GHz, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wave Speed: The Foundation of Wave Physics">
        <p>
          Wave speed is one of the most fundamental concepts in wave physics, describing how fast a wave propagates through a medium. Whether you&apos;re studying sound waves, light waves, water waves, or electromagnetic waves, understanding wave speed is essential. Our Wave Speed Calculator makes it easy to calculate wave speed using two fundamental formulas: <strong>v = f × λ</strong> (wave speed equals frequency times wavelength) or <strong>v = d / t</strong> (wave speed equals distance divided by time).
        </p>
        <p>
          Wave speed determines how quickly energy and information travel through a medium. For electromagnetic waves like light, the speed in vacuum is constant at the speed of light (c = 299,792,458 m/s). For sound waves, the speed depends on the medium and temperature. Understanding wave speed is crucial for everything from designing communication systems to understanding how sound travels.
        </p>
        <p>
          Our calculator supports two calculation modes: frequency-wavelength mode (v = f × λ) for wave physics calculations, and distance-time mode (v = d / t) for measuring wave propagation over time. This flexibility makes it perfect for students, engineers, and scientists working with any type of wave.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Wave Speed Calculator">
        <p>
          Our Wave Speed Calculator offers two calculation modes for maximum flexibility. Follow these steps:
        </p>
        
        <h3>Frequency & Wavelength Mode (v = f × λ)</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Frequency & Wavelength&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (wave speed, frequency, or wavelength)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>

        <h3>Distance & Time Mode (v = d / t)</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Distance & Time&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (wave speed, distance, or time)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding the Wave Speed Formula">
        <p>
          Wave speed can be calculated using two fundamental relationships:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">v = f × λ</p>
          <p className="text-sm text-gray-600 mt-2">Where: v = wave speed, f = frequency, λ = wavelength</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">v = d / t</p>
          <p className="text-sm text-gray-600 mt-2">Where: v = wave speed, d = distance, t = time</p>
        </div>

        <h3>What is Wave Speed?</h3>
        <p>
          Wave speed (v) is the rate at which a wave propagates through a medium. It represents how fast the wave&apos;s energy and information travel. Key characteristics:
        </p>
        <SEOList items={[
          "Wave speed depends on the medium (faster in solids, slower in gases)",
          "For electromagnetic waves in vacuum, speed is constant (speed of light)",
          "For sound waves, speed depends on temperature and medium density",
          "Wave speed is independent of frequency and wavelength (for a given medium)"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Wave Speed (v):</strong> The velocity at which a wave propagates, measured in m/s, km/h, etc.</li>
          <li><strong>Frequency (f):</strong> The number of wave cycles per second, measured in Hz, kHz, MHz, GHz, etc.</li>
          <li><strong>Wavelength (λ):</strong> The distance between consecutive wave points, measured in m, nm, cm, etc.</li>
          <li><strong>Distance (d):</strong> The distance the wave travels, measured in m, km, etc.</li>
          <li><strong>Time (t):</strong> The time taken for the wave to travel the distance, measured in s, ms, etc.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Wave speed calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Acoustics: Understanding how sound travels through air, water, and solids",
          "Optics: Calculating light speed in different media for lens and fiber optic design",
          "Telecommunications: Designing radio, Wi-Fi, and cellular networks",
          "Seismology: Analyzing earthquake waves and their propagation through Earth",
          "Medical Imaging: Ultrasound and MRI technology rely on wave speed calculations",
          "Oceanography: Studying water waves, tsunamis, and ocean currents",
          "Engineering: Designing antennas, waveguides, and communication systems",
          "Astronomy: Understanding how light and radio waves travel through space",
          "Music: Understanding how sound waves travel and interact in concert halls"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports various units for all measurements:
        </p>
        
        <h3>Wave Speed Units:</h3>
        <ul>
          <li><strong>Metric:</strong> m/s (meters per second), km/s (kilometers per second), km/h (kilometers per hour)</li>
          <li><strong>Imperial:</strong> mph (miles per hour), ft/s (feet per second)</li>
          <li><strong>Special:</strong> c (speed of light = 299,792,458 m/s)</li>
        </ul>

        <h3>Frequency Units:</h3>
        <ul>
          <li>Hz (Hertz), kHz (Kilohertz = 1,000 Hz), MHz (Megahertz = 1,000,000 Hz), GHz (Gigahertz = 1,000,000,000 Hz), THz (Terahertz = 1,000,000,000,000 Hz)</li>
        </ul>

        <h3>Wavelength Units:</h3>
        <ul>
          <li><strong>Metric:</strong> m (meters), cm (centimeters), mm (millimeters), μm (micrometers), nm (nanometers), km (kilometers)</li>
          <li><strong>Imperial:</strong> ft (feet), in (inches)</li>
        </ul>

        <h3>Distance Units:</h3>
        <ul>
          <li><strong>Metric:</strong> m (meters), cm (centimeters), mm (millimeters), km (kilometers)</li>
          <li><strong>Imperial:</strong> ft (feet), in (inches), mi (miles)</li>
        </ul>

        <h3>Time Units:</h3>
        <ul>
          <li>s (seconds), ms (milliseconds), μs (microseconds), ns (nanoseconds), min (minutes), h (hours)</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles unit conversions, so you can mix different unit systems. For example, you can input frequency in GHz, wavelength in nanometers, and get wave speed in m/s.
        </p>
      </SEOSection>

      <SEOSection title="Common Wave Speed Calculations">
        <h3>Example 1: Calculating Wave Speed from Frequency and Wavelength (Light)</h3>
        <p>What is the speed of a light wave with frequency 5.0 × 10¹⁴ Hz and wavelength 600 nm?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = f × λ</p>
          <p className="font-mono">v = 5.0 × 10¹⁴ Hz × 600 × 10⁻⁹ m</p>
          <p className="font-mono">v = 3.0 × 10⁸ m/s = 300,000 km/s</p>
          <p className="text-sm text-gray-600 mt-1">This equals the speed of light, as expected for electromagnetic waves in vacuum</p>
        </div>

        <h3>Example 2: Calculating Wave Speed from Distance and Time (Sound)</h3>
        <p>A sound wave travels 1,715 meters in 5 seconds. What is its speed?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = d / t</p>
          <p className="font-mono">v = 1,715 m / 5 s = 343 m/s</p>
          <p className="text-sm text-gray-600 mt-1">This is the speed of sound in air at approximately 20°C</p>
        </div>

        <h3>Example 3: Calculating Frequency from Wave Speed and Wavelength</h3>
        <p>A wave has a speed of 340 m/s and a wavelength of 0.5 m. What is its frequency?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = v / λ</p>
          <p className="font-mono">f = 340 m/s / 0.5 m = 680 Hz</p>
          <p className="text-sm text-gray-600 mt-1">This is in the audible range for humans (20 Hz - 20,000 Hz)</p>
        </div>

        <h3>Example 4: Calculating Wavelength from Wave Speed and Frequency</h3>
        <p>A radio wave has a speed of 3.0 × 10⁸ m/s and a frequency of 100 MHz. What is its wavelength?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = v / f</p>
          <p className="font-mono">λ = 3.0 × 10⁸ m/s / 100 × 10⁶ Hz = 3.0 m</p>
          <p className="text-sm text-gray-600 mt-1">This is a typical wavelength for FM radio waves</p>
        </div>

        <h3>Example 5: Sound Wave in Water</h3>
        <p>A sound wave in water has a frequency of 1,000 Hz. If the speed of sound in water is 1,500 m/s, what is the wavelength?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = v / f</p>
          <p className="font-mono">λ = 1,500 m/s / 1,000 Hz = 1.5 m</p>
          <p className="text-sm text-gray-600 mt-1">Sound travels faster in water than in air, resulting in longer wavelengths</p>
        </div>
      </SEOSection>

      <SEOSection title="Wave Speed in Different Media">
        <p>
          Wave speed varies significantly depending on the medium:
        </p>
        
        <h3>Speed of Light (Electromagnetic Waves)</h3>
        <ul>
          <li><strong>Vacuum:</strong> 299,792,458 m/s (constant, denoted as c)</li>
          <li><strong>Air:</strong> Approximately 299,700,000 m/s (slightly slower than vacuum)</li>
          <li><strong>Water:</strong> Approximately 225,000,000 m/s (about 75% of c)</li>
          <li><strong>Glass:</strong> Approximately 200,000,000 m/s (about 67% of c)</li>
          <li><strong>Diamond:</strong> Approximately 124,000,000 m/s (about 41% of c)</li>
        </ul>

        <h3>Speed of Sound</h3>
        <ul>
          <li><strong>Air (0°C):</strong> 331 m/s</li>
          <li><strong>Air (20°C):</strong> 343 m/s</li>
          <li><strong>Water:</strong> Approximately 1,500 m/s</li>
          <li><strong>Steel:</strong> Approximately 5,960 m/s</li>
          <li><strong>Aluminum:</strong> Approximately 6,420 m/s</li>
        </ul>

        <p>
          <strong>Key Insight:</strong> Sound travels faster in denser media (solids &gt; liquids &gt; gases), while light travels slower in denser media. This is because sound is a mechanical wave requiring a medium, while light is an electromagnetic wave that interacts with matter.
        </p>
      </SEOSection>

      <SEOSection title="The Relationship Between Wave Speed, Frequency, and Wavelength">
        <p>
          The fundamental relationship v = f × λ shows that:
        </p>
        <SEOList items={[
          "For a constant wave speed, frequency and wavelength are inversely proportional",
          "Higher frequency waves have shorter wavelengths (for the same speed)",
          "Lower frequency waves have longer wavelengths (for the same speed)",
          "Wave speed in a medium is constant (for electromagnetic waves in vacuum, it's always c)",
          "When frequency increases, wavelength decreases proportionally to maintain constant speed"
        ]} />
        <p>
          This relationship is fundamental to understanding wave behavior. For example, in the electromagnetic spectrum, radio waves have long wavelengths and low frequencies, while gamma rays have short wavelengths and very high frequencies, but all travel at the speed of light in vacuum.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding wave speed has practical applications in daily life:
        </p>
        <SEOList items={[
          "Thunder and Lightning: The delay between seeing lightning and hearing thunder helps calculate distance (sound travels at ~343 m/s)",
          "Echo Location: Bats and dolphins use sound wave speed to navigate and locate prey",
          "Medical Ultrasound: Doctors use sound wave speed in tissue to create images",
          "GPS Systems: Understanding light speed is crucial for accurate positioning",
          "Radio Communication: Wave speed determines signal propagation and timing",
          "Musical Instruments: Understanding how sound waves travel affects instrument design",
          "Seismic Monitoring: Earthquake wave speeds help determine epicenter location",
          "Underwater Communication: Sonar systems rely on sound wave speed in water"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the formula for wave speed?",
            answer: "Wave speed can be calculated using two formulas: v = f × λ (wave speed = frequency × wavelength) or v = d / t (wave speed = distance / time). The first formula is most commonly used in wave physics, while the second is useful for measuring wave propagation over time."
          },
          {
            question: "What is the speed of light?",
            answer: "The speed of light in vacuum (c) is exactly 299,792,458 meters per second (approximately 3 × 10⁸ m/s). This is a fundamental constant of nature. All electromagnetic waves (light, radio, X-rays, etc.) travel at this speed in vacuum, but slow down when passing through matter."
          },
          {
            question: "What is the speed of sound?",
            answer: "The speed of sound depends on the medium and temperature. In air at 20°C, sound travels at approximately 343 m/s. In water, it's about 1,500 m/s, and in steel, it's about 5,960 m/s. Sound travels faster in denser media and at higher temperatures."
          },
          {
            question: "How does wave speed relate to frequency and wavelength?",
            answer: "Wave speed (v) equals frequency (f) times wavelength (λ): v = f × λ. This means for a constant wave speed, frequency and wavelength are inversely proportional. Higher frequency means shorter wavelength, and lower frequency means longer wavelength. This relationship is fundamental to all wave phenomena."
          },
          {
            question: "Why does light slow down in water or glass?",
            answer: "Light slows down in matter because it interacts with atoms and molecules. The speed of light in a medium is c/n, where c is the speed of light in vacuum and n is the refractive index. Water has n ≈ 1.33, so light travels at about 225,000,000 m/s in water. However, frequency remains constant, so wavelength decreases."
          },
          {
            question: "Can wave speed be faster than the speed of light?",
            answer: "According to Einstein's theory of relativity, nothing with mass can travel faster than the speed of light in vacuum. However, the phase velocity of waves can sometimes exceed c in certain media (though this doesn't violate relativity as no information travels faster than c). For practical purposes, wave speed in vacuum is the universal speed limit."
          },
          {
            question: "How do I calculate wave speed for sound waves?",
            answer: "For sound waves, you can use v = f × λ if you know frequency and wavelength, or v = d / t if you measure distance and time. The speed of sound in air at 20°C is approximately 343 m/s. In other media, use the appropriate speed: water ≈ 1,500 m/s, steel ≈ 5,960 m/s."
          },
          {
            question: "What units are used for wave speed?",
            answer: "Wave speed is typically measured in meters per second (m/s) in the SI system. Other common units include kilometers per hour (km/h), miles per hour (mph), feet per second (ft/s), and for light, the speed of light (c). The calculator supports all these units and automatically converts between them."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding wave speed and the relationships v = f × λ and v = d / t is fundamental to wave physics, acoustics, optics, and electromagnetic theory. Our Wave Speed Calculator simplifies these calculations, making it easy to solve problems involving light, sound, radio waves, and other wave phenomena.
        </p>
        <p>
          Whether you&apos;re calculating wave speeds for electromagnetic waves, analyzing sound propagation, or working with any wave phenomenon, this calculator provides accurate results with support for multiple unit systems and two flexible calculation modes. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('wavelength-calculator', 'Wavelength Calculator')} for wavelength calculations, the {createInternalLink('frequency-calculator', 'Frequency Calculator')} for frequency problems, or the {createInternalLink('velocity-calculator', 'Velocity Calculator')} for general motion calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

