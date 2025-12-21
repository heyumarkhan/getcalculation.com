import WavelengthCalculator from '../../../_components/calculators/WavelengthCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WavelengthCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wavelength Calculator: Calculate λ = v/f Instantly"
      description="Calculate wavelength, velocity, or frequency using λ = v/f or λ = c/f for electromagnetic waves. Free online waves calculator for physics and engineering with multiple unit support."
      calculator={<WavelengthCalculator />}
      slug="physics/wavelength-calculator"
      category="Waves"
      features={[
        "Calculate wavelength, velocity, or frequency",
        "Support for general waves and electromagnetic waves",
        "Instant wave physics calculations",
        "Multiple unit support (m, nm, Hz, GHz, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wavelength: The Foundation of Wave Physics">
        <p>
          Wavelength is one of the most fundamental concepts in wave physics, optics, and electromagnetic theory. It describes the distance between consecutive points of the same phase in a wave, such as the distance between two peaks or two troughs. Whether you&apos;re studying physics, engineering, working with light, sound, or radio waves, understanding wavelength is essential. Our Wavelength Calculator makes it easy to calculate wavelength, velocity, or frequency using the fundamental formula: <strong>λ = v/f</strong> (wavelength equals velocity divided by frequency).
        </p>
        <p>
          Wavelength determines many properties of waves, including color (for light), pitch (for sound), and the ability to interact with objects. It&apos;s crucial for understanding everything from visible light and radio waves to sound waves and water waves. Our calculator supports both general waves and electromagnetic waves, automatically using the speed of light for electromagnetic calculations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Wavelength Calculator">
        <p>
          Our Wavelength Calculator offers two calculation modes for maximum flexibility. Follow these steps:
        </p>
        
        <h3>General Waves Mode (λ = v/f)</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;General Waves&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (wavelength, velocity, or frequency)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>

        <h3>Electromagnetic Waves Mode (λ = c/f)</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Electromagnetic Waves&quot; from the dropdown</li>
          <li><strong>Enter Wavelength or Frequency:</strong> Input either wavelength or frequency</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Speed of Light:</strong> Automatically set to c = 299,792,458 m/s</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding the Wavelength Formula">
        <p>
          The wavelength formula is one of the most important equations in wave physics:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">λ = v / f</p>
          <p className="text-sm text-gray-600 mt-2">Where: λ = wavelength, v = velocity, f = frequency</p>
        </div>
        
        <h3>For Electromagnetic Waves</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">λ = c / f</p>
          <p className="text-sm text-gray-600 mt-2">Where: c = speed of light (299,792,458 m/s)</p>
        </div>

        <h3>What is Wavelength?</h3>
        <p>
          Wavelength (λ) is the spatial period of a wave - the distance over which the wave&apos;s shape repeats. It&apos;s measured as the distance between:
        </p>
        <SEOList items={[
          "Two consecutive peaks (crests)",
          "Two consecutive troughs",
          "Any two corresponding points in the same phase"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Wavelength (λ):</strong> The distance between consecutive wave points, measured in m (meters), nm (nanometers), cm, etc.</li>
          <li><strong>Velocity (v):</strong> The speed at which the wave propagates, measured in m/s, km/s, etc.</li>
          <li><strong>Frequency (f):</strong> The number of wave cycles per second, measured in Hz (Hertz), kHz, MHz, GHz, etc.</li>
          <li><strong>Speed of Light (c):</strong> Constant for electromagnetic waves: 299,792,458 m/s</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Wavelength calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Optics: Understanding light colors, laser design, and optical systems",
          "Electronics: Radio frequency design, antenna sizing, and wireless communication",
          "Telecommunications: Cell phone networks, Wi-Fi, and satellite communication",
          "Medical Imaging: MRI, X-rays, and ultrasound technology",
          "Astronomy: Analyzing light from stars and galaxies",
          "Audio Engineering: Sound wave analysis and speaker design",
          "Chemistry: Spectroscopy and molecular analysis",
          "Remote Sensing: Radar, lidar, and satellite imaging",
          "Material Science: X-ray diffraction and crystal analysis"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your calculations. Our calculator supports multiple unit systems and automatically converts between them:
        </p>
        
        <h3>Wavelength Units</h3>
        <ul>
          <li><strong>Metric:</strong> m (meters), cm (centimeters), mm (millimeters), μm (micrometers), nm (nanometers), km (kilometers)</li>
          <li><strong>Imperial:</strong> ft (feet), in (inches)</li>
        </ul>
        <p><strong>Note:</strong> Nanometers (nm) are commonly used for visible light wavelengths (400-700 nm)</p>

        <h3>Velocity Units</h3>
        <ul>
          <li><strong>Metric:</strong> m/s (meters per second), km/s (kilometers per second), km/h (kilometers per hour)</li>
          <li><strong>Imperial:</strong> mph (miles per hour), ft/s (feet per second)</li>
          <li><strong>Special:</strong> c (speed of light = 299,792,458 m/s)</li>
        </ul>

        <h3>Frequency Units</h3>
        <ul>
          <li>Hz (Hertz), kHz (Kilohertz = 1,000 Hz), MHz (Megahertz = 1,000,000 Hz), GHz (Gigahertz = 1,000,000,000 Hz), THz (Terahertz = 1,000,000,000,000 Hz)</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles unit conversions, so you can mix different unit systems. For example, you can input wavelength in nanometers, frequency in THz, and get velocity in m/s.
        </p>
      </SEOSection>

      <SEOSection title="Common Wavelength Calculations">
        <h3>Example 1: Calculating Wavelength from Frequency (Light)</h3>
        <p>What is the wavelength of red light with a frequency of 4.3 × 10¹⁴ Hz? (Electromagnetic wave)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = c / f = 299,792,458 m/s / 4.3 × 10¹⁴ Hz = 6.97 × 10⁻⁷ m = 697 nm</p>
          <p className="text-sm text-gray-600 mt-1">This is indeed in the red light range (620-750 nm)</p>
        </div>

        <h3>Example 2: Calculating Frequency from Wavelength (Radio)</h3>
        <p>A radio station broadcasts at a wavelength of 3.41 m. What is its frequency?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = c / λ = 299,792,458 m/s / 3.41 m = 87.9 MHz</p>
          <p className="text-sm text-gray-600 mt-1">This is in the FM radio band (88-108 MHz)</p>
        </div>

        <h3>Example 3: Sound Wave Wavelength</h3>
        <p>What is the wavelength of a sound wave with frequency 440 Hz traveling in air at 343 m/s?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = v / f = 343 m/s / 440 Hz = 0.779 m = 77.9 cm</p>
          <p className="text-sm text-gray-600 mt-1">This is the wavelength of the musical note A4 (440 Hz)</p>
        </div>

        <h3>Example 4: Calculating Velocity from Wavelength and Frequency</h3>
        <p>A wave has a wavelength of 2.5 m and a frequency of 120 Hz. What is its velocity?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = λ × f = 2.5 m × 120 Hz = 300 m/s</p>
        </div>

        <h3>Example 5: Visible Light Spectrum</h3>
        <p>Calculate the frequency of blue light with wavelength 450 nm.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = c / λ = 299,792,458 m/s / (450 × 10⁻⁹ m) = 6.66 × 10¹⁴ Hz = 666 THz</p>
        </div>
      </SEOSection>

      <SEOSection title="Electromagnetic Spectrum and Wavelengths">
        <p>
          The electromagnetic spectrum spans a wide range of wavelengths:
        </p>
        <ul>
          <li><strong>Gamma Rays:</strong> Less than 0.01 nm - highest energy, shortest wavelength</li>
          <li><strong>X-Rays:</strong> 0.01 nm - 10 nm - medical imaging, security scanning</li>
          <li><strong>Ultraviolet (UV):</strong> 10 nm - 400 nm - sunburn, sterilization</li>
          <li><strong>Visible Light:</strong> 400 nm - 700 nm - what we can see (violet to red)</li>
          <li><strong>Infrared (IR):</strong> 700 nm - 1 mm - heat, remote controls</li>
          <li><strong>Microwaves:</strong> 1 mm - 1 m - cooking, radar, Wi-Fi</li>
          <li><strong>Radio Waves:</strong> 1 m - 100 km - broadcasting, communication</li>
        </ul>
        <p>
          All electromagnetic waves travel at the speed of light (c) in vacuum, so wavelength and frequency are inversely related: shorter wavelength = higher frequency = higher energy.
        </p>
      </SEOSection>

      <SEOSection title="Wavelength in Different Media">
        <p>
          Wavelength changes when waves enter different media, but frequency remains constant:
        </p>
        <ul>
          <li><strong>Light in Vacuum:</strong> λ = c/f (c = 299,792,458 m/s)</li>
          <li><strong>Light in Water:</strong> λ = v/f (v ≈ 225,000,000 m/s, about 75% of c)</li>
          <li><strong>Light in Glass:</strong> λ = v/f (v ≈ 200,000,000 m/s, about 67% of c)</li>
          <li><strong>Sound in Air:</strong> λ = v/f (v ≈ 343 m/s at 20°C)</li>
          <li><strong>Sound in Water:</strong> λ = v/f (v ≈ 1,500 m/s)</li>
        </ul>
        <p>
          When a wave enters a medium where it travels slower, the wavelength decreases proportionally, but frequency stays the same. This is why objects appear shifted when viewed through water or glass.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding wavelength has practical applications in daily life:
        </p>
        <SEOList items={[
          "Wi-Fi and Bluetooth: Understanding why different frequencies have different ranges and speeds",
          "Radio Stations: Knowing why AM (longer wavelength) travels farther than FM",
          "Color Perception: Understanding why different colors have different wavelengths",
          "Sunglasses: UV protection blocks shorter wavelengths that can damage eyes",
          "Remote Controls: Infrared wavelengths used for TV and device control",
          "Medical Imaging: X-rays use short wavelengths to see through tissue",
          "GPS: Understanding how satellite signals work at specific wavelengths"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between wavelength, velocity, and frequency?",
            answer: "Wavelength (λ) equals velocity (v) divided by frequency (f): λ = v/f. This means wavelength is inversely proportional to frequency - higher frequency waves have shorter wavelengths. For electromagnetic waves, velocity is the speed of light (c), so λ = c/f. You can rearrange this to solve for velocity (v = λ × f) or frequency (f = v/λ)."
          },
          {
            question: "What are the most common wavelength units?",
            answer: "For visible light, nanometers (nm) are most common (400-700 nm range). For radio waves, meters are used. For very short wavelengths (X-rays, gamma rays), picometers or smaller units are used. Meters (m) are the SI base unit. The choice depends on the wavelength range - nanometers for light, meters for radio, micrometers for infrared."
          },
          {
            question: "How does wavelength relate to color?",
            answer: "For visible light, wavelength directly determines color. Violet light has the shortest wavelengths (around 400-450 nm), while red light has the longest (around 620-750 nm). The visible spectrum spans approximately 400-700 nm. Shorter wavelengths appear blue/violet, longer wavelengths appear red/orange. White light contains all visible wavelengths."
          },
          {
            question: "What's the difference between wavelength and frequency?",
            answer: "Wavelength (λ) is a distance measurement - the spatial period of a wave. Frequency (f) is a time measurement - how many cycles occur per second. They're inversely related: λ = v/f. Higher frequency means shorter wavelength (for constant velocity). Frequency is measured in Hz, wavelength in meters or nanometers."
          },
          {
            question: "Why does wavelength change in different media?",
            answer: "Wavelength changes because wave velocity changes in different media, but frequency remains constant. When light enters water, it slows down (velocity decreases), so wavelength decreases proportionally. The relationship λ = v/f means if v decreases and f stays constant, λ must decrease. This is why objects appear shifted when viewed through water or glass."
          },
          {
            question: "What is the speed of light and why is it constant?",
            answer: "The speed of light in vacuum (c) is 299,792,458 m/s (approximately 3 × 10⁸ m/s). It's a fundamental constant of nature. According to Einstein's theory of relativity, the speed of light in vacuum is constant for all observers, regardless of their motion. This constancy is why electromagnetic waves always use c in the formula λ = c/f."
          },
          {
            question: "How do I calculate wavelength for sound waves?",
            answer: "For sound waves, use λ = v/f where v is the speed of sound in the medium. Sound speed in air at 20°C is approximately 343 m/s. So for a 440 Hz sound wave in air: λ = 343 m/s / 440 Hz = 0.779 m. Sound speed varies with temperature and medium - faster in water (≈1500 m/s) and solids."
          },
          {
            question: "What wavelength range is visible to humans?",
            answer: "The visible spectrum for humans ranges from approximately 380-400 nm (violet) to 700-750 nm (red). This corresponds to frequencies of about 400-790 THz. Different animals see different ranges - some can see ultraviolet (shorter than 400 nm) or infrared (longer than 700 nm). The peak sensitivity for human vision is around 555 nm (green-yellow)."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding wavelength and the relationship λ = v/f is fundamental to wave physics, optics, and electromagnetic theory. Our Wavelength Calculator simplifies these calculations, making it easy to solve problems involving light, sound, radio waves, and other wave phenomena.
        </p>
        <p>
          Whether you&apos;re calculating wavelengths for electromagnetic waves, analyzing sound waves, or working with any wave phenomenon, this calculator provides accurate results with support for multiple unit systems and both general and electromagnetic wave modes. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('velocity-calculator')} for motion calculations, or use our {createInternalLink('acceleration-calculator')} for acceleration problems that often complement wave analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

