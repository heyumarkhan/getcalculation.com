import FrequencyCalculator from '../../../_components/calculators/FrequencyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function FrequencyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Frequency Calculator: Calculate Frequency from Period, Wavelength & Velocity"
      description="Calculate frequency from period (f = 1/T), wavelength and velocity (f = v/λ), or electromagnetic waves (f = c/λ). Free online waves calculator for physics and engineering."
      calculator={<FrequencyCalculator />}
      slug="physics/frequency-calculator"
      category="Waves"
      features={[
        "Calculate frequency from period",
        "Calculate frequency from wavelength and velocity",
        "Calculate frequency for electromagnetic waves",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Frequency: The Heartbeat of Waves">
        <p>
          Frequency is one of the most fundamental properties of waves, representing how many complete wave cycles occur per unit of time. Whether you&apos;re studying sound waves, electromagnetic radiation, mechanical vibrations, or any oscillatory phenomenon, understanding frequency is essential. Our Frequency Calculator makes it easy to calculate frequency using multiple methods, making it perfect for various applications in physics, engineering, and technology.
        </p>
        <p>
          Frequency (f) is measured in Hertz (Hz), where 1 Hz equals one cycle per second. It&apos;s inversely related to period (T) and directly related to wavelength (λ) and wave velocity (v). Understanding these relationships is crucial for analyzing wave behavior in different contexts.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Frequency Calculator">
        <p>
          Our Frequency Calculator offers three different calculation modes to suit various scenarios:
        </p>
        <ol>
          <li><strong>From Period (f = 1/T):</strong> Calculate frequency from the period of oscillation. Enter either period or frequency to calculate the other.</li>
          <li><strong>From Wavelength (f = v/λ):</strong> Calculate frequency from wavelength and wave velocity. Enter any two values to calculate the third.</li>
          <li><strong>Electromagnetic Waves (f = c/λ):</strong> Calculate frequency for electromagnetic waves using the speed of light. Enter either wavelength or frequency to calculate the other.</li>
        </ol>
        <p>
          Select your preferred calculation mode, enter the known values, choose your units, and click Calculate to get instant results with step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Frequency Formulas">
        <p>
          Frequency can be calculated using several fundamental formulas:
        </p>
        
        <h3>1. Frequency from Period</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">f = 1 / T</p>
          <p className="text-sm text-gray-600 mt-2">Where: f = frequency, T = period</p>
        </div>

        <h3>2. Frequency from Wavelength and Velocity</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">f = v / λ</p>
          <p className="text-sm text-gray-600 mt-2">Where: f = frequency, v = wave velocity, λ = wavelength</p>
        </div>

        <h3>3. Frequency for Electromagnetic Waves</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">f = c / λ</p>
          <p className="text-sm text-gray-600 mt-2">Where: f = frequency, c = speed of light (299,792,458 m/s), λ = wavelength</p>
        </div>

        <h3>Rearranging the Formulas</h3>
        <p>You can rearrange these formulas to solve for other variables:</p>
        <ul>
          <li><strong>Period:</strong> T = 1 / f</li>
          <li><strong>Wavelength:</strong> λ = v / f or λ = c / f</li>
          <li><strong>Velocity:</strong> v = λ × f</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Frequency calculations are essential in numerous real-world applications:
        </p>
        <SEOList items={[
          "Audio Engineering: Designing speakers, microphones, and audio systems",
          "Radio Communications: Calculating carrier frequencies and bandwidth",
          "Medical Imaging: Understanding ultrasound and MRI frequencies",
          "Optics: Analyzing light waves, colors, and electromagnetic radiation",
          "Music: Understanding pitch, notes, and musical intervals",
          "Electronics: Designing oscillators, filters, and signal processing circuits",
          "Telecommunications: Planning wireless networks and data transmission",
          "Astronomy: Analyzing electromagnetic radiation from celestial objects"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your frequency calculations:
        </p>
        <ul>
          <li><strong>Frequency:</strong> Hertz (Hz), Kilohertz (kHz), Megahertz (MHz), Gigahertz (GHz), Terahertz (THz)</li>
          <li><strong>Period:</strong> Seconds (s), Milliseconds (ms), Microseconds (μs), Nanoseconds (ns), Minutes (min), Hours (h)</li>
          <li><strong>Wavelength:</strong> Meters (m), Centimeters (cm), Millimeters (mm), Micrometers (μm), Nanometers (nm), Kilometers (km)</li>
          <li><strong>Velocity:</strong> Meters per second (m/s), Kilometers per second (km/s), Kilometers per hour (km/h), Miles per hour (mph), Feet per second (ft/s), Speed of light (c)</li>
        </ul>
        <p>
          <strong>Tip:</strong> Our calculator automatically converts between different units, so you can mix units as needed. The calculator ensures all calculations are performed in consistent base units internally.
        </p>
      </SEOSection>

      <SEOSection title="Common Frequency Calculations">
        <h3>Example 1: Frequency from Period</h3>
        <p>A pendulum completes one full swing in 2 seconds. What is its frequency?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = 1 / T = 1 / 2 s = 0.5 Hz</p>
        </div>

        <h3>Example 2: Frequency from Wavelength and Velocity</h3>
        <p>A sound wave has a wavelength of 0.68 m and travels at 340 m/s. What is its frequency?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = v / λ = 340 m/s / 0.68 m = 500 Hz</p>
        </div>

        <h3>Example 3: Electromagnetic Wave Frequency</h3>
        <p>What is the frequency of red light with a wavelength of 700 nm?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = c / λ = 299,792,458 m/s / (700 × 10⁻⁹ m) = 4.28 × 10¹⁴ Hz = 428 THz</p>
        </div>

        <h3>Example 4: Radio Wave Frequency</h3>
        <p>A radio station broadcasts at 101.5 MHz. What is the wavelength of the radio waves?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = c / f = 299,792,458 m/s / (101.5 × 10⁶ Hz) = 2.95 m</p>
        </div>
      </SEOSection>

      <SEOSection title="Frequency vs. Period: Understanding the Relationship">
        <p>
          Frequency and period are inversely related:
        </p>
        <ul>
          <li><strong>Frequency (f):</strong> The number of complete cycles per unit time (measured in Hz)</li>
          <li><strong>Period (T):</strong> The time for one complete cycle (measured in seconds)</li>
        </ul>
        <p>
          The relationship is simple: <strong>f = 1 / T</strong> or <strong>T = 1 / f</strong>. If a wave has a high frequency, it has a short period, and vice versa. For example, a frequency of 100 Hz means 100 cycles per second, so the period is 1/100 = 0.01 seconds.
        </p>
      </SEOSection>

      <SEOSection title="Frequency in Different Wave Types">
        <p>
          Frequency plays different roles depending on the wave type:
        </p>
        <ul>
          <li><strong>Sound Waves:</strong> Frequency determines pitch. Higher frequency = higher pitch. Human hearing range: 20 Hz to 20,000 Hz</li>
          <li><strong>Electromagnetic Waves:</strong> Frequency determines the type of radiation (radio, microwave, infrared, visible light, ultraviolet, X-ray, gamma ray)</li>
          <li><strong>Mechanical Waves:</strong> Frequency affects wave speed and energy. Higher frequency waves often carry more energy</li>
          <li><strong>Oscillations:</strong> Frequency describes how fast something vibrates or oscillates</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is frequency and why is it important?",
            answer: "Frequency (f) is the number of complete wave cycles that occur per unit of time, measured in Hertz (Hz). It's important because it determines many wave properties: pitch in sound, color in light, and energy in electromagnetic radiation. Frequency is fundamental to understanding wave behavior in physics, engineering, and technology."
          },
          {
            question: "What's the difference between frequency and period?",
            answer: "Frequency (f) is the number of cycles per second, while period (T) is the time for one complete cycle. They are inversely related: f = 1/T. If frequency is high, period is short, and vice versa. For example, 50 Hz means 50 cycles per second, so the period is 1/50 = 0.02 seconds."
          },
          {
            question: "How do I calculate frequency from wavelength?",
            answer: "To calculate frequency from wavelength, you need the wave velocity: f = v/λ. For electromagnetic waves, use the speed of light: f = c/λ, where c = 299,792,458 m/s. Our calculator handles both general waves and electromagnetic waves automatically."
          },
          {
            question: "What units are used for frequency?",
            answer: "Frequency is measured in Hertz (Hz), where 1 Hz = 1 cycle per second. Common multiples include: kHz (kilohertz, 10³ Hz), MHz (megahertz, 10⁶ Hz), GHz (gigahertz, 10⁹ Hz), and THz (terahertz, 10¹² Hz). The unit is named after Heinrich Hertz, who first demonstrated electromagnetic waves."
          },
          {
            question: "Can frequency be negative?",
            answer: "No, frequency cannot be negative. Frequency represents the number of cycles per unit time, which is always a positive value. However, in some mathematical contexts, negative frequencies are used to represent phase relationships, but physically, frequency is always positive."
          },
          {
            question: "How does frequency relate to energy?",
            answer: "For electromagnetic waves, frequency is directly proportional to energy: E = hf, where h is Planck's constant. Higher frequency electromagnetic waves (like X-rays and gamma rays) have more energy than lower frequency waves (like radio waves). For mechanical waves, higher frequency often means higher energy, but the relationship depends on amplitude and wave type."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding frequency is fundamental to waves, oscillations, and many areas of physics and engineering. Our Frequency Calculator simplifies these calculations, making it easy to solve problems involving period, wavelength, velocity, and electromagnetic radiation.
        </p>
        <p>
          Ready to explore more wave concepts? Check out our other calculators like the {createInternalLink('wavelength-calculator', 'Wavelength Calculator')} for wavelength calculations, or the {createInternalLink('velocity-calculator', 'Velocity Calculator')} for motion calculations that often complement frequency analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

