import WavelengthToFrequencyCalculator from '../../../_components/calculators/WavelengthToFrequencyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WavelengthToFrequencyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wavelength to Frequency Calculator: Convert λ to f (f = c/λ)"
      description="Convert between wavelength and frequency using f = c/λ for electromagnetic waves or f = v/λ for general waves. Free online wave calculator with support for multiple units."
      calculator={<WavelengthToFrequencyCalculator />}
      slug="physics/wavelength-to-frequency-calculator"
      category="Waves"
      features={[
        "Convert wavelength to frequency",
        "Convert frequency to wavelength",
        "Support for electromagnetic waves (f = c/λ)",
        "Support for general waves (f = v/λ)",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wavelength and Frequency: Essential Wave Properties">
        <p>
          Wavelength and frequency are fundamental properties of waves that are inversely related. Understanding the relationship between wavelength (λ) and frequency (f) is essential for studying electromagnetic radiation, sound waves, and all types of wave phenomena. Our Wavelength to Frequency Calculator makes it easy to convert between these two critical wave properties using the formulas: <strong>f = c/λ</strong> for electromagnetic waves or <strong>f = v/λ</strong> for general waves.
        </p>
        <p>
          Whether you&apos;re working with radio waves, visible light, X-rays, sound waves, or any other wave phenomenon, this calculator simplifies wavelength-frequency conversions with support for multiple units and both electromagnetic and mechanical waves.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Wavelength to Frequency Calculator">
        <p>
          Our Wavelength to Frequency Calculator is designed for simplicity and accuracy. Follow these steps:
        </p>
        <ol>
          <li><strong>Select Wave Type:</strong> Choose between electromagnetic waves (uses speed of light) or general waves (requires velocity input)</li>
          <li><strong>Enter One Value:</strong> Input either wavelength or frequency (leave the other empty)</li>
          <li><strong>For General Waves:</strong> Enter the wave velocity in your preferred units</li>
          <li><strong>Select Units:</strong> Choose your preferred units for wavelength and frequency</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with step-by-step solutions</li>
        </ol>
        <p>
          The calculator uses the formula: <strong>f = c/λ</strong> for electromagnetic waves or <strong>f = v/λ</strong> for general waves.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Wavelength-Frequency Relationship">
        <p>
          The relationship between wavelength and frequency is fundamental to wave physics:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">f = c / λ</p>
          <p className="text-sm text-gray-600 mt-2">For electromagnetic waves: f = Frequency, c = Speed of light, λ = Wavelength</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg text-center mt-4">
          <p className="font-mono text-lg font-bold">f = v / λ</p>
          <p className="text-sm text-gray-600 mt-2">For general waves: f = Frequency, v = Velocity, λ = Wavelength</p>
        </div>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Wavelength (λ):</strong> The distance between two consecutive peaks or troughs of a wave, measured in meters (m), nanometers (nm), or other length units</li>
          <li><strong>Frequency (f):</strong> The number of complete wave cycles per second, measured in hertz (Hz), kilohertz (kHz), megahertz (MHz), or gigahertz (GHz)</li>
          <li><strong>Speed of Light (c):</strong> Constant value of 299,792,458 m/s for all electromagnetic waves in vacuum</li>
          <li><strong>Velocity (v):</strong> The speed at which a wave propagates through a medium (varies for different wave types and media)</li>
        </ul>

        <h3>Inverse Relationship</h3>
        <p>
          Wavelength and frequency have an <strong>inverse relationship</strong>: as wavelength increases, frequency decreases, and vice versa. This is because the product of wavelength and frequency equals the wave velocity (c for EM waves, v for general waves).
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Wavelength-frequency conversions are used in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Electromagnetic Spectrum: Converting between wavelength and frequency for radio, microwave, infrared, visible light, UV, X-ray, and gamma radiation",
          "Radio Communications: Calculating frequencies for radio stations, WiFi, Bluetooth, and cellular networks",
          "Optics: Determining frequencies of visible light colors and laser wavelengths",
          "Medical Imaging: Converting X-ray and gamma-ray wavelengths to frequencies",
          "Sound Waves: Calculating frequencies from wavelengths in air, water, or other media",
          "Spectroscopy: Analyzing atomic and molecular spectra by converting between wavelength and frequency",
          "Photography: Understanding how different wavelengths of light affect camera sensors",
          "Fiber Optics: Calculating frequencies for optical communication systems",
          "Astronomy: Analyzing light from stars and galaxies across the electromagnetic spectrum",
          "Material Science: Studying how materials interact with different wavelengths and frequencies"
        ]} />
      </SEOSection>

      <SEOSection title="The Electromagnetic Spectrum">
        <p>
          The electromagnetic spectrum spans a wide range of wavelengths and frequencies:
        </p>
        <ul>
          <li><strong>Radio Waves:</strong> Wavelength: 1 m - 100 km, Frequency: 3 kHz - 300 MHz</li>
          <li><strong>Microwaves:</strong> Wavelength: 1 mm - 1 m, Frequency: 300 MHz - 300 GHz</li>
          <li><strong>Infrared:</strong> Wavelength: 700 nm - 1 mm, Frequency: 300 GHz - 430 THz</li>
          <li><strong>Visible Light:</strong> Wavelength: 400 nm - 700 nm, Frequency: 430 THz - 750 THz
            <ul className="ml-4 mt-1">
              <li>Red: ~700 nm, ~430 THz</li>
              <li>Orange: ~600 nm, ~500 THz</li>
              <li>Yellow: ~580 nm, ~520 THz</li>
              <li>Green: ~550 nm, ~545 THz</li>
              <li>Blue: ~470 nm, ~640 THz</li>
              <li>Violet: ~400 nm, ~750 THz</li>
            </ul>
          </li>
          <li><strong>Ultraviolet:</strong> Wavelength: 10 nm - 400 nm, Frequency: 750 THz - 30 PHz</li>
          <li><strong>X-rays:</strong> Wavelength: 0.01 nm - 10 nm, Frequency: 30 PHz - 30 EHz</li>
          <li><strong>Gamma Rays:</strong> Wavelength: &lt; 0.01 nm, Frequency: &gt; 30 EHz</li>
        </ul>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Understanding wavelength and frequency units is crucial for accurate calculations:
        </p>
        <ul>
          <li><strong>Wavelength Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Meter (m): Base SI unit</li>
              <li>Nanometer (nm): 1 nm = 10⁻⁹ m (commonly used for visible light)</li>
              <li>Micrometer (μm): 1 μm = 10⁻⁶ m (used for infrared)</li>
              <li>Angstrom (Å): 1 Å = 10⁻¹⁰ m (used in spectroscopy)</li>
              <li>Centimeter (cm): 1 cm = 0.01 m</li>
              <li>Kilometer (km): 1 km = 1,000 m (used for radio waves)</li>
            </ul>
          </li>
          <li><strong>Frequency Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Hertz (Hz): Base SI unit, 1 Hz = 1 cycle per second</li>
              <li>Kilohertz (kHz): 1 kHz = 1,000 Hz</li>
              <li>Megahertz (MHz): 1 MHz = 1,000,000 Hz</li>
              <li>Gigahertz (GHz): 1 GHz = 1,000,000,000 Hz</li>
              <li>Terahertz (THz): 1 THz = 1,000,000,000,000 Hz</li>
            </ul>
          </li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Wavelength-Frequency Calculations">
        <h3>Example 1: Visible Light (Green)</h3>
        <p>What is the frequency of green light with a wavelength of 550 nm?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = c / λ = 299,792,458 m/s / (550 × 10⁻⁹ m) = 5.45 × 10¹⁴ Hz = 545 THz</p>
        </div>

        <h3>Example 2: Radio Wave</h3>
        <p>A radio station broadcasts at 101.5 MHz. What is the wavelength?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = c / f = 299,792,458 m/s / (101.5 × 10⁶ Hz) = 2.95 m</p>
        </div>

        <h3>Example 3: X-ray</h3>
        <p>An X-ray has a wavelength of 0.1 nm. What is its frequency?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = c / λ = 299,792,458 m/s / (0.1 × 10⁻⁹ m) = 3.00 × 10¹⁸ Hz = 3.00 EHz</p>
        </div>

        <h3>Example 4: Sound Wave</h3>
        <p>A sound wave in air (v = 343 m/s) has a wavelength of 0.5 m. What is its frequency?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = v / λ = 343 m/s / 0.5 m = 686 Hz</p>
        </div>

        <h3>Example 5: WiFi Signal</h3>
        <p>WiFi operates at 2.4 GHz. What is the wavelength?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = c / f = 299,792,458 m/s / (2.4 × 10⁹ Hz) = 0.125 m = 12.5 cm</p>
        </div>
      </SEOSection>

      <SEOSection title="Electromagnetic vs. General Waves">
        <p>
          Understanding the difference between electromagnetic and general waves:
        </p>
        <ul>
          <li><strong>Electromagnetic Waves:</strong>
            <ul className="ml-4 mt-1">
              <li>Travel at the speed of light in vacuum: c = 299,792,458 m/s</li>
              <li>Do not require a medium to propagate</li>
              <li>Include radio waves, microwaves, infrared, visible light, UV, X-rays, and gamma rays</li>
              <li>Formula: f = c / λ</li>
            </ul>
          </li>
          <li><strong>General/Mechanical Waves:</strong>
            <ul className="ml-4 mt-1">
              <li>Travel at speeds that depend on the medium (e.g., sound in air: ~343 m/s, sound in water: ~1,500 m/s)</li>
              <li>Require a medium to propagate</li>
              <li>Include sound waves, water waves, seismic waves, and other mechanical vibrations</li>
              <li>Formula: f = v / λ (where v is the wave velocity in the medium)</li>
            </ul>
          </li>
        </ul>
      </SEOSection>

      <SEOSection title="Energy and Photon Calculations">
        <p>
          For electromagnetic waves, you can also calculate photon energy using:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">E = h × f = h × c / λ</p>
          <p className="text-sm text-gray-600 mt-2">Where: E = Photon energy, h = Planck&apos;s constant (6.626 × 10⁻³⁴ J·s)</p>
        </div>
        <p>
          This relationship shows that shorter wavelengths (higher frequencies) correspond to higher energy photons. This is why gamma rays are more energetic than radio waves.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How do I convert wavelength to frequency?",
            answer: "For electromagnetic waves, use f = c / λ, where c = 299,792,458 m/s (speed of light). For general waves, use f = v / λ, where v is the wave velocity. Simply divide the speed by the wavelength to get the frequency. For example, a wavelength of 500 nm (visible light) corresponds to f = 299,792,458 / (500 × 10⁻⁹) = 5.996 × 10¹⁴ Hz ≈ 600 THz."
          },
          {
            question: "What's the relationship between wavelength and frequency?",
            answer: "Wavelength and frequency have an inverse relationship: as wavelength increases, frequency decreases, and vice versa. Their product equals the wave velocity (c for EM waves, v for general waves). This means f × λ = c for electromagnetic waves, or f × λ = v for general waves."
          },
          {
            question: "What is the speed of light used in calculations?",
            answer: "The speed of light in vacuum is exactly 299,792,458 meters per second (m/s). This is a fundamental constant used for all electromagnetic wave calculations. In other media, light travels slower, but for most practical purposes, we use the vacuum speed of light."
          },
          {
            question: "How do I convert frequency to wavelength?",
            answer: "For electromagnetic waves, use λ = c / f, where c = 299,792,458 m/s. For general waves, use λ = v / f, where v is the wave velocity. Simply divide the speed by the frequency to get the wavelength. For example, a frequency of 100 MHz (radio wave) corresponds to λ = 299,792,458 / (100 × 10⁶) = 2.998 m ≈ 3 m."
          },
          {
            question: "What units are commonly used for wavelength and frequency?",
            answer: "Wavelength is commonly measured in meters (m), nanometers (nm) for visible light, micrometers (μm) for infrared, and centimeters (cm) or meters for radio waves. Frequency is measured in hertz (Hz), with kilohertz (kHz) for radio, megahertz (MHz) for radio and TV, gigahertz (GHz) for microwaves and WiFi, and terahertz (THz) for infrared and visible light."
          },
          {
            question: "Can I use this calculator for sound waves?",
            answer: "Yes! Select 'General Waves' mode and enter the sound velocity in your medium. Sound travels at approximately 343 m/s in air at room temperature, 1,500 m/s in water, and 5,000 m/s in steel. Then enter either the wavelength or frequency to calculate the other."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding the relationship between wavelength and frequency is fundamental to wave physics, optics, and electromagnetic theory. Our Wavelength to Frequency Calculator simplifies these conversions, making it easy to work with electromagnetic waves, sound waves, and any other wave phenomena.
        </p>
        <p>
          Ready to explore more wave concepts? Check out our other calculators like the {createInternalLink('frequency-calculator', 'Frequency Calculator')} for period-based frequency calculations, or the {createInternalLink('force-calculator', 'Force Calculator')} for mechanics calculations that often complement wave analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

