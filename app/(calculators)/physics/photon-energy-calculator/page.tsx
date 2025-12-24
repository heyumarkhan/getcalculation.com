import PhotonEnergyCalculator from '../../../_components/calculators/PhotonEnergyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function PhotonEnergyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Photon Energy Calculator: Calculate Energy from Frequency or Wavelength"
      description="Calculate photon energy from frequency (E = hf) or wavelength (E = hc/λ). Free online quantum physics calculator with Planck's constant and speed of light."
      calculator={<PhotonEnergyCalculator />}
      slug="physics/photon-energy-calculator"
      category="Quantum Physics"
      features={[
        "Calculate photon energy from frequency",
        "Calculate photon energy from wavelength",
        "Calculate frequency from energy",
        "Calculate wavelength from energy",
        "Multiple unit conversions (J, eV, Hz, nm, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Photon Energy: Quantum Physics Fundamentals">
        <p>
          Photon energy is a fundamental concept in quantum physics, representing the energy carried by a single photon of electromagnetic radiation. Photons are the quantum particles of light and all electromagnetic radiation, and their energy is directly related to their frequency and wavelength. Our Photon Energy Calculator makes it easy to calculate photon energy using two formulas: <strong>E = hf</strong> (from frequency) or <strong>E = hc/λ</strong> (from wavelength), where h is Planck&apos;s constant and c is the speed of light.
        </p>
        <p>
          Understanding photon energy is essential for fields ranging from quantum mechanics and optics to spectroscopy, photovoltaics, and medical imaging. The energy of a photon determines its ability to interact with matter, making it crucial for understanding atomic transitions, chemical reactions, and the photoelectric effect.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Photon Energy Calculator">
        <p>
          Our Photon Energy Calculator offers two calculation modes:
        </p>
        <ol>
          <li><strong>From Frequency:</strong> Enter the frequency to calculate photon energy using E = hf</li>
          <li><strong>From Wavelength:</strong> Enter the wavelength to calculate photon energy using E = hc/λ</li>
        </ol>
        <p>
          Simply select your calculation mode, enter the required value (leave one empty to calculate), choose your units, and click Calculate to get instant results with step-by-step solutions. You can also calculate frequency or wavelength from a known photon energy.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Photon Energy Formulas">
        <p>
          Photon energy can be calculated using different formulas depending on available information:
        </p>
        
        <h3>1. From Frequency</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">E = hf</p>
          <p className="text-sm text-gray-600 mt-2">Where: E = photon energy, h = Planck&apos;s constant (6.626 × 10⁻³⁴ J·s), f = frequency</p>
        </div>
        <p>
          This formula directly relates photon energy to frequency. Higher frequency photons have more energy, which is why gamma rays are more energetic than radio waves.
        </p>

        <h3>2. From Wavelength</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">E = hc / λ</p>
          <p className="text-sm text-gray-600 mt-2">Where: E = photon energy, h = Planck&apos;s constant, c = speed of light (2.998 × 10⁸ m/s), λ = wavelength</p>
        </div>
        <p>
          This formula relates photon energy to wavelength. Since c = fλ, we can substitute to get E = hc/λ. Shorter wavelengths correspond to higher energy photons.
        </p>

        <h3>Key Constants</h3>
        <ul>
          <li><strong>Planck&apos;s Constant (h):</strong> 6.62607015 × 10⁻³⁴ J·s (or 4.135667696 × 10⁻¹⁵ eV·s)</li>
          <li><strong>Speed of Light (c):</strong> 2.99792458 × 10⁸ m/s (approximately 3 × 10⁸ m/s)</li>
          <li><strong>hc Product:</strong> 1.98644586 × 10⁻²⁵ J·m (useful for wavelength calculations)</li>
        </ul>

        <h3>Related Formulas</h3>
        <ul>
          <li><strong>Frequency from Energy:</strong> f = E / h</li>
          <li><strong>Wavelength from Energy:</strong> λ = hc / E</li>
          <li><strong>Wavelength-Frequency Relationship:</strong> c = fλ</li>
          <li><strong>Energy in eV:</strong> E(eV) = 1240 / λ(nm) (approximate formula for visible light)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Photon energy calculations are used in numerous scientific and technological applications:
        </p>
        <SEOList items={[
          "Quantum Mechanics: Understanding atomic transitions and energy levels",
          "Photovoltaics: Calculating solar cell efficiency and bandgap requirements",
          "Spectroscopy: Analyzing atomic and molecular spectra",
          "Medical Imaging: X-ray and gamma-ray imaging dose calculations",
          "Photochemistry: Understanding light-induced chemical reactions",
          "Optics: Designing lasers and optical systems",
          "Astrophysics: Analyzing stellar spectra and cosmic radiation",
          "Photoelectric Effect: Understanding electron emission from materials",
          "Fluorescence: Calculating excitation and emission energies",
          "UV Protection: Understanding sunscreen effectiveness and UV damage",
          "LED Technology: Designing efficient light-emitting diodes",
          "Fiber Optics: Calculating transmission properties of optical fibers"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Photon energy calculations use various units depending on the application:
        </p>
        <ul>
          <li><strong>Energy:</strong> J (Joules), eV (Electron volts), kJ (Kilojoules), meV (Millielectron volts), keV (Kiloelectron volts), MeV (Megaelectron volts)</li>
          <li><strong>Frequency:</strong> Hz (Hertz), kHz (Kilohertz), MHz (Megahertz), GHz (Gigahertz), THz (Terahertz)</li>
          <li><strong>Wavelength:</strong> m (Meters), cm (Centimeters), mm (Millimeters), μm (Micrometers), nm (Nanometers), Å (Angstroms)</li>
        </ul>
        <p>
          <strong>Common Values:</strong>
        </p>
        <ul>
          <li>1 eV = 1.602 × 10⁻¹⁹ J (electron volt, commonly used in atomic physics)</li>
          <li>Visible light: 400-700 nm (1.77-3.10 eV)</li>
          <li>UV light: 10-400 nm (3.10-124 eV)</li>
          <li>X-rays: 0.01-10 nm (124-124,000 eV)</li>
          <li>Gamma rays: &lt;0.01 nm (&gt;124,000 eV)</li>
          <li>Radio waves: &gt;1 m (&lt;1.24 × 10⁻⁶ eV)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Photon Energy Calculations">
        <h3>Example 1: Visible Light Photon</h3>
        <p>Calculate the energy of a photon with wavelength 550 nm (green light).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = 550 nm = 5.5 × 10⁻⁷ m</p>
          <p className="font-mono">E = hc/λ = (6.626 × 10⁻³⁴ J·s × 2.998 × 10⁸ m/s) / (5.5 × 10⁻⁷ m)</p>
          <p className="font-mono">E = 3.61 × 10⁻¹⁹ J = 2.25 eV</p>
        </div>

        <h3>Example 2: X-Ray Photon</h3>
        <p>Calculate the energy of an X-ray photon with wavelength 0.1 nm.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">λ = 0.1 nm = 1 × 10⁻¹⁰ m</p>
          <p className="font-mono">E = hc/λ = (6.626 × 10⁻³⁴ × 2.998 × 10⁸) / (1 × 10⁻¹⁰)</p>
          <p className="font-mono">E = 1.986 × 10⁻¹⁵ J = 12,400 eV = 12.4 keV</p>
        </div>

        <h3>Example 3: Frequency to Energy</h3>
        <p>Calculate the energy of a photon with frequency 5 × 10¹⁴ Hz (visible light).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">f = 5 × 10¹⁴ Hz</p>
          <p className="font-mono">E = hf = (6.626 × 10⁻³⁴ J·s) × (5 × 10¹⁴ Hz)</p>
          <p className="font-mono">E = 3.313 × 10⁻¹⁹ J = 2.07 eV</p>
        </div>

        <h3>Example 4: Quick Approximation</h3>
        <p>For visible light, a quick approximation: E(eV) ≈ 1240 / λ(nm)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">For λ = 620 nm (red light):</p>
          <p className="font-mono">E ≈ 1240 / 620 = 2.0 eV</p>
        </div>
      </SEOSection>

      <SEOSection title="Electromagnetic Spectrum and Photon Energy">
        <p>
          The electromagnetic spectrum spans a wide range of photon energies:
        </p>
        <ul>
          <li><strong>Radio Waves:</strong> Longest wavelengths, lowest energy (&lt;10⁻⁶ eV)</li>
          <li><strong>Microwaves:</strong> 10⁻⁶ to 10⁻³ eV</li>
          <li><strong>Infrared:</strong> 10⁻³ to 1.77 eV (wavelengths: 1 mm to 700 nm)</li>
          <li><strong>Visible Light:</strong> 1.77 to 3.10 eV (wavelengths: 700 to 400 nm)</li>
          <li><strong>Ultraviolet:</strong> 3.10 to 124 eV (wavelengths: 400 to 10 nm)</li>
          <li><strong>X-Rays:</strong> 124 to 124,000 eV (wavelengths: 10 to 0.01 nm)</li>
          <li><strong>Gamma Rays:</strong> Highest energy (&gt;124,000 eV, wavelengths &lt;0.01 nm)</li>
        </ul>
        <p>
          Higher energy photons can ionize atoms, break chemical bonds, and penetrate matter more effectively. This is why X-rays and gamma rays are used in medical imaging and why UV light can cause skin damage.
        </p>
      </SEOSection>

      <SEOSection title="Photoelectric Effect and Photon Energy">
        <p>
          The photoelectric effect demonstrates the particle nature of light and the importance of photon energy:
        </p>
        <ul>
          <li><strong>Threshold Energy:</strong> Each material has a work function (minimum energy to eject electrons)</li>
          <li><strong>Energy Requirement:</strong> Photon energy must exceed the work function for electron emission</li>
          <li><strong>Kinetic Energy:</strong> Excess photon energy becomes kinetic energy of ejected electrons: KE = E - φ</li>
          <li><strong>Frequency Dependence:</strong> Higher frequency (higher energy) photons can eject electrons, while lower frequency photons cannot, regardless of intensity</li>
          <li><strong>Applications:</strong> Photocells, solar panels, photomultiplier tubes, and image sensors</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is a photon?",
            answer: "A photon is a quantum particle of light and all electromagnetic radiation. It has zero rest mass, travels at the speed of light, and carries energy proportional to its frequency. Photons exhibit both wave-like and particle-like properties (wave-particle duality)."
          },
          {
            question: "How does photon energy relate to frequency and wavelength?",
            answer: "Photon energy is directly proportional to frequency (E = hf) and inversely proportional to wavelength (E = hc/λ). Higher frequency or shorter wavelength photons have more energy. This is why gamma rays are more energetic than radio waves."
          },
          {
            question: "What is Planck's constant?",
            answer: "Planck's constant (h = 6.626 × 10⁻³⁴ J·s) is a fundamental constant in quantum mechanics that relates the energy of a photon to its frequency. It was discovered by Max Planck and is fundamental to quantum theory."
          },
          {
            question: "Why is electron volt (eV) commonly used for photon energy?",
            answer: "The electron volt is convenient for atomic and subatomic physics because it's on the same scale as atomic energy levels. 1 eV is the energy gained by an electron accelerated through 1 volt. Many atomic transitions are in the eV range, making it more practical than joules for these calculations."
          },
          {
            question: "Can I calculate frequency or wavelength from photon energy?",
            answer: "Yes! From energy, you can calculate frequency using f = E/h, or wavelength using λ = hc/E. Our calculator supports calculating any of these three quantities when you know the other two."
          },
          {
            question: "What is the relationship between photon energy and color?",
            answer: "In visible light, different photon energies correspond to different colors. Red light (longer wavelength, ~620-750 nm) has lower energy (~1.65-2.0 eV), while violet light (shorter wavelength, ~380-450 nm) has higher energy (~2.75-3.26 eV). The energy determines the color we perceive."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding photon energy is fundamental to quantum physics, optics, and modern technology. Our Photon Energy Calculator simplifies these calculations, supporting multiple calculation modes and units to make determining photon energy, frequency, and wavelength easy and accurate.
        </p>
        <p>
          Ready to explore more quantum and wave concepts? Check out our {createInternalLink('wavelength-calculator', 'Wavelength Calculator')} for wave properties, our {createInternalLink('frequency-calculator', 'Frequency Calculator')} for frequency calculations, or our {createInternalLink('wavelength-to-frequency-calculator', 'Wavelength to Frequency Calculator')} for conversions.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

