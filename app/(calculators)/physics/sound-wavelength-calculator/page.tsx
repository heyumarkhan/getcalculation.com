import SoundWavelengthCalculator from '../../../_components/calculators/SoundWavelengthCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SoundWavelengthCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Sound Wavelength Calculator: Calculate λ = v/f"
      description="Calculate sound wavelength, velocity, or frequency using λ = v/f. Free online physics calculator for acoustics and wave physics. Calculate wavelength from frequency and speed of sound, or use temperature to find speed of sound in air."
      calculator={<SoundWavelengthCalculator primaryColor="#820ECC" />}
      slug="physics/sound-wavelength-calculator"
      category="Waves"
      features={[
        "Calculate wavelength from velocity and frequency",
        "Calculate velocity from wavelength and frequency",
        "Calculate frequency from wavelength and velocity",
        "Temperature-based speed of sound calculation for air",
        "Multiple unit support (m, cm, mm for wavelength; m/s, km/h, mph for velocity; Hz, kHz, MHz for frequency)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Sound Wavelength">
        <p>
          Wavelength is a fundamental property of waves, representing the distance between two consecutive points in phase (e.g., two consecutive crests or troughs). For sound waves, wavelength determines the pitch we perceive and is crucial for understanding how sound propagates through different media. The relationship between wavelength, frequency, and velocity is fundamental to wave physics and acoustics.
        </p>
        <p>
          Our <strong>Sound Wavelength Calculator</strong> makes it easy to calculate wavelength, velocity, or frequency using the fundamental relationship: <strong>λ = v/f</strong>, where λ (lambda) is wavelength, v is velocity (speed of sound), and f is frequency. Whether you&apos;re studying acoustics, working on audio engineering projects, or analyzing wave behavior, this calculator provides accurate results with comprehensive unit support.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Sound Wavelength Calculator">
        <p>
          Our calculator is designed for ease of use and provides accurate results for wavelength calculations:
        </p>
        <ol>
          <li><strong>Select Calculation Type:</strong> Choose what you want to calculate:
            <ul>
              <li><strong>Wavelength:</strong> Calculate λ from velocity and frequency (λ = v/f)</li>
              <li><strong>Velocity:</strong> Calculate velocity from wavelength and frequency (v = λ × f)</li>
              <li><strong>Frequency:</strong> Calculate frequency from wavelength and velocity (f = v/λ)</li>
            </ul>
          </li>
          <li><strong>Enter Values:</strong> Input the required parameters based on your calculation type</li>
          <li><strong>Use Temperature (Optional):</strong> Check the box to calculate speed of sound from temperature instead of entering it directly</li>
          <li><strong>Select Units:</strong> Choose appropriate units for wavelength (m, cm, mm), velocity (m/s, km/h, mph), frequency (Hz, kHz, MHz), and temperature (K, °C, °F)</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed step-by-step calculations</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and uses the speed of sound formula for air when temperature is provided.
        </p>
      </SEOSection>

      <SEOSection title="The Wavelength Formula: λ = v/f">
        <p>
          The fundamental relationship between wavelength, velocity, and frequency is expressed by the formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">λ = v / f</p>
          <p className="text-sm text-gray-600 mt-2">
            Where:
            <br />
            <strong>λ</strong> = Wavelength (meters, centimeters, etc.)
            <br />
            <strong>v</strong> = Velocity / Speed of sound (m/s, km/h, mph, etc.)
            <br />
            <strong>f</strong> = Frequency (Hertz, kHz, MHz, etc.)
          </p>
        </div>

        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "Wavelength (λ): The distance between two consecutive points in phase on a wave. For sound, this determines the pitch - shorter wavelengths correspond to higher frequencies (higher pitch), and longer wavelengths correspond to lower frequencies (lower pitch).",
          "Velocity (v): The speed at which the wave propagates through the medium. For sound waves, this is the speed of sound, which depends on the medium and temperature. In air at 20°C, the speed of sound is approximately 343 m/s.",
          "Frequency (f): The number of complete wave cycles per second, measured in Hertz (Hz). Frequency determines pitch - higher frequencies produce higher-pitched sounds, while lower frequencies produce lower-pitched sounds."
        ]} />

        <h3>Derived Formulas</h3>
        <p>
          From the main formula, we can solve for any variable:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="font-mono"><strong>Calculate Velocity:</strong> v = λ × f</p>
          <p className="font-mono"><strong>Calculate Frequency:</strong> f = v / λ</p>
        </div>
        <p>
          These relationships are fundamental in wave physics, allowing you to determine any one of these three quantities when the other two are known.
        </p>
      </SEOSection>

      <SEOSection title="Speed of Sound in Air">
        <p>
          The speed of sound in air depends on temperature. Our calculator uses the formula derived from the ideal gas law:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">c = √(γ × R × T)</p>
          <p className="text-sm text-gray-600 mt-2">
            Where:
            <br />
            <strong>c</strong> = Speed of sound (m/s)
            <br />
            <strong>γ</strong> = Adiabatic index = 1.4 (for air)
            <br />
            <strong>R</strong> = Gas constant = 287 J/(kg·K) (for air)
            <br />
            <strong>T</strong> = Temperature (Kelvin)
          </p>
        </div>
        <p>
          At standard room temperature (20°C or 293.15 K), the speed of sound in air is approximately <strong>343 m/s</strong> (1,125 ft/s, 767 mph, 1,235 km/h). This value increases with temperature, as warmer air has higher molecular speeds, allowing sound waves to propagate faster.
        </p>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Our calculator supports a wide range of units for each parameter, performing automatic conversions to ensure accuracy:
        </p>
        <SEOList items={[
          "Wavelength: Meters (m), Centimeters (cm), Millimeters (mm), Feet (ft), Inches (in), Kilometers (km)",
          "Velocity: Meters per second (m/s), Kilometers per hour (km/h), Miles per hour (mph), Feet per second (ft/s), Knots",
          "Frequency: Hertz (Hz), Kilohertz (kHz), Megahertz (MHz), Gigahertz (GHz)",
          "Temperature: Kelvin (K), Celsius (°C), Fahrenheit (°F)"
        ]} />
        <p>
          The calculator automatically converts between these units, so you can work with the units most convenient for your application. For example, you can input wavelength in centimeters, velocity in m/s, and frequency in kHz, and the calculator will handle all conversions correctly.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Wavelength Calculations">
        <p>
          Wavelength calculations are fundamental in numerous fields and applications:
        </p>
        <SEOList items={[
          "Acoustics: Understanding how sound waves behave in different environments and media",
          "Audio Engineering: Designing speakers, microphones, and audio systems based on wavelength characteristics",
          "Musical Instruments: Understanding how instrument size and design relate to wavelength and pitch",
          "Architecture: Designing concert halls and auditoriums with proper acoustics based on wavelength",
          "Ultrasound: Medical imaging and therapeutic applications using high-frequency sound waves",
          "Sonar: Underwater navigation and detection systems using sound waves",
          "Wave Physics: Studying wave behavior, interference, and resonance phenomena",
          "Telecommunications: Understanding signal propagation and antenna design"
        ]} />
      </SEOSection>

      <SEOSection title="Common Sound Wavelength Examples">
        <p>
          Here are some common sound wavelength values for reference (at 20°C, speed of sound ≈ 343 m/s):
        </p>
        <SEOList items={[
          "Low Bass (20 Hz): Approximately 17.15 meters (56.3 feet)",
          "Middle C (261.63 Hz): Approximately 1.31 meters (4.3 feet)",
          "A4 (440 Hz): Approximately 0.78 meters (2.56 feet)",
          "High Treble (10,000 Hz): Approximately 3.43 centimeters (1.35 inches)",
          "Ultrasound (20,000 Hz): Approximately 1.72 centimeters (0.68 inches)",
          "Medical Ultrasound (1 MHz): Approximately 0.343 millimeters"
        ]} />
        <p>
          These examples illustrate how wavelength decreases as frequency increases, and how different frequencies correspond to different audible ranges and applications.
        </p>
      </SEOSection>

      <SEOSection title="Relationship Between Wavelength and Pitch">
        <p>
          Wavelength and frequency have an inverse relationship that directly affects the pitch we perceive:
        </p>
        <SEOList items={[
          "Shorter Wavelength = Higher Frequency = Higher Pitch: High-pitched sounds like a whistle or bird chirp have short wavelengths and high frequencies.",
          "Longer Wavelength = Lower Frequency = Lower Pitch: Low-pitched sounds like a bass drum or tuba have long wavelengths and low frequencies.",
          "Constant Speed: For a given medium at constant temperature, the speed of sound is constant, so wavelength and frequency are inversely proportional.",
          "Temperature Effect: As temperature increases, the speed of sound increases, which means the wavelength increases for a given frequency, though the pitch remains the same."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between wavelength and frequency?",
            answer: "Wavelength and frequency are inversely proportional when velocity is constant: λ = v/f. As frequency increases, wavelength decreases, and vice versa. This means higher-pitched sounds have shorter wavelengths, and lower-pitched sounds have longer wavelengths."
          },
          {
            question: "How does temperature affect sound wavelength?",
            answer: "Temperature affects the speed of sound, which in turn affects wavelength. At higher temperatures, sound travels faster, so for a given frequency, the wavelength is longer. However, the perceived pitch remains the same because frequency doesn't change."
          },
          {
            question: "What is the speed of sound in air?",
            answer: "The speed of sound in air depends on temperature. At 20°C (68°F), it's approximately 343 m/s (1,125 ft/s, 767 mph). At 0°C, it's about 331 m/s, and it increases by approximately 0.6 m/s per degree Celsius."
          },
          {
            question: "Can I calculate frequency if I know the wavelength and speed of sound?",
            answer: "Yes! Using the formula f = v/λ, you can calculate frequency by dividing velocity by wavelength. Select 'Frequency' as your calculation type and enter the wavelength and velocity values."
          },
          {
            question: "Why is wavelength important in acoustics?",
            answer: "Wavelength determines how sound waves interact with objects and spaces. It affects diffraction, reflection, resonance, and standing wave formation. Understanding wavelength is crucial for designing acoustic spaces, speakers, and audio systems."
          },
          {
            question: "What is the audible frequency range for humans?",
            answer: "The typical human audible range is approximately 20 Hz to 20,000 Hz (20 kHz). Frequencies below 20 Hz are infrasonic, and frequencies above 20 kHz are ultrasonic. This range corresponds to wavelengths from about 17 meters (low bass) to 1.7 centimeters (high treble) at room temperature."
          },
          {
            question: "How does wavelength affect sound propagation?",
            answer: "Wavelength affects how sound waves bend around obstacles (diffraction), reflect off surfaces, and form standing waves in enclosed spaces. Longer wavelengths diffract more easily around obstacles, while shorter wavelengths are more directional and create sharper shadows."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The Sound Wavelength Calculator provides a powerful tool for students, engineers, and anyone working with sound waves and acoustics. By using the fundamental formula λ = v/f, you can calculate wavelength, velocity, or frequency, enabling accurate analysis of wave behavior and sound propagation.
        </p>
        <p>
          Whether you&apos;re designing audio systems, studying acoustics, working on musical instruments, or analyzing wave physics, this calculator simplifies complex wavelength calculations. Explore our other {createInternalLink('wavelength-calculator', 'Physics Calculators')} like the {createInternalLink('frequency-calculator', 'Frequency Calculator')} and {createInternalLink('mach-number-calculator', 'Mach Number Calculator')} for related wave and sound calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

