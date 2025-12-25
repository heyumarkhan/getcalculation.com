import WavelengthToEnergyCalculator from '../../../_components/calculators/WavelengthToEnergyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WavelengthToEnergyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wavelength to Energy Calculator: Convert Photon Wavelength to Energy (E = hc/λ)"
      description="Convert between photon wavelength and energy using E = hc/λ. Free online physics calculator for quantum mechanics, spectroscopy, and electromagnetic radiation calculations."
      calculator={<WavelengthToEnergyCalculator />}
      slug="physics/wavelength-to-energy-calculator"
      category="Quantum Mechanics"
      features={[
        "Calculate energy from wavelength",
        "Calculate wavelength from energy",
        "Support for multiple units (eV, J, kJ/mol, kcal/mol, cm⁻¹, nm, μm, etc.)",
        "Uses Planck's constant and speed of light",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wavelength to Energy Conversion: Fundamental in Quantum Mechanics">
        <p>
          The relationship between photon wavelength and energy is one of the most fundamental concepts in quantum mechanics and modern physics. This relationship, expressed by the equation <strong>E = hc/λ</strong>, connects the particle and wave nature of light and electromagnetic radiation. Understanding this conversion is essential for physicists, chemists, engineers, and anyone working with light, spectroscopy, or quantum phenomena.
        </p>
        <p>
          Our Wavelength to Energy Calculator simplifies these conversions, allowing you to determine the energy of a photon from its wavelength, or conversely, find the wavelength corresponding to a specific photon energy. This calculator is invaluable for spectroscopy, photochemistry, laser physics, and understanding the electromagnetic spectrum, from radio waves to gamma rays.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Wavelength to Energy Calculator">
        <p>
          Our Wavelength to Energy Calculator offers two calculation modes:
        </p>
        <ol>
          <li><strong>Calculate Energy from Wavelength:</strong> Enter the photon wavelength and select appropriate units. The calculator determines the photon energy using E = hc/λ.</li>
          <li><strong>Calculate Wavelength from Energy:</strong> Enter the photon energy and select appropriate units. The calculator determines the corresponding wavelength using λ = hc/E.</li>
        </ol>
        <p>
          Select your calculation mode, enter the known value with your preferred units, and click Calculate to get instant results with detailed step-by-step solutions. The calculator supports multiple units for wavelength (m, nm, μm, mm, cm, Å) and energy (J, eV, meV, keV, MeV, kJ/mol, kcal/mol, cm⁻¹).
        </p>
      </SEOSection>

      <SEOSection title="The Wavelength to Energy Formula Explained">
        <p>
          The fundamental relationship between photon wavelength and energy is given by:
        </p>
        <SEOFormula
          formula="E = hc / λ"
          description="Where: E = Photon Energy, h = Planck's Constant (6.62607015 × 10⁻³⁴ J·s), c = Speed of Light (299,792,458 m/s), λ = Wavelength"
        />

        <h3>Key Components:</h3>
        <SEOList items={[
          "<strong>Photon Energy (E):</strong> The energy carried by a single photon, typically measured in electronvolts (eV) for atomic and molecular transitions, or Joules (J) for general use. One eV equals 1.602176634 × 10⁻¹⁹ J.",
          "<strong>Planck's Constant (h):</strong> 6.62607015 × 10⁻³⁴ J·s - a fundamental constant of nature that relates the energy of a photon to its frequency. It was discovered by Max Planck and is central to quantum mechanics.",
          "<strong>Speed of Light (c):</strong> 299,792,458 m/s - the speed at which all electromagnetic radiation travels in vacuum. This constant connects wavelength and frequency (c = λf).",
          "<strong>Wavelength (λ):</strong> The distance between consecutive peaks (or troughs) of a wave, typically measured in nanometers (nm) for visible light, micrometers (μm) for infrared, or meters for radio waves."
        ]} />

        <h3>Rearranging the Formula:</h3>
        <p>You can rearrange the formula to solve for wavelength:</p>
        <ul>
          <li><strong>Energy:</strong> E = hc / λ</li>
          <li><strong>Wavelength:</strong> λ = hc / E</li>
        </ul>

        <h3>Relationship to Frequency:</h3>
        <p>
          Since c = λf (where f is frequency), the energy formula can also be written as <strong>E = hf</strong>, showing that photon energy is directly proportional to frequency. Higher frequency (shorter wavelength) photons carry more energy.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications of Wavelength to Energy Conversions">
        <p>
          Wavelength to energy conversions are essential in numerous fields and applications:
        </p>
        <SEOList items={[
          "<strong>Spectroscopy:</strong> Analyzing atomic and molecular spectra, identifying chemical compounds, and determining electronic transitions. Different wavelengths correspond to different energy levels in atoms and molecules.",
          "<strong>Photochemistry:</strong> Understanding photochemical reactions, designing light-activated processes, and calculating photon energies required for breaking chemical bonds.",
          "<strong>Laser Physics:</strong> Designing lasers, determining laser wavelengths and energies, and understanding laser-material interactions.",
          "<strong>Solar Energy:</strong> Calculating photon energies in solar radiation, understanding photovoltaic cell operation, and optimizing solar panel design.",
          "<strong>Quantum Mechanics:</strong> Studying quantum effects, understanding the photoelectric effect, and analyzing quantum energy levels.",
          "<strong>Medical Physics:</strong> Understanding X-ray energies, calculating radiation doses, and designing medical imaging equipment.",
          "<strong>Astronomy and Astrophysics:</strong> Analyzing light from stars and galaxies, determining stellar temperatures, and studying cosmic radiation.",
          "<strong>Materials Science:</strong> Understanding optical properties of materials, designing photonic devices, and analyzing band gaps in semiconductors."
        ]} />
      </SEOSection>

      <SEOSection title="The Electromagnetic Spectrum and Photon Energies">
        <p>
          Different regions of the electromagnetic spectrum correspond to vastly different photon energies:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Region</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Wavelength Range</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Energy Range</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Gamma Rays</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">&lt; 0.01 nm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">&gt; 100 keV</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Nuclear processes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>X-Rays</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">0.01 - 10 nm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">100 eV - 100 keV</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Medical imaging</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Ultraviolet</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">10 - 400 nm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">3 - 124 eV</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Sunlight, blacklights</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Visible Light</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">400 - 700 nm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.8 - 3.1 eV</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Rainbow colors</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Infrared</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">700 nm - 1 mm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.24 meV - 1.8 eV</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Heat radiation</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Microwave</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1 mm - 1 m</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1.24 μeV - 1.24 meV</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Microwave ovens</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800"><strong>Radio</strong></td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">&gt; 1 m</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">&lt; 1.24 μeV</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Radio stations</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Common Energy Units and Conversions">
        <p>
          Different fields use different energy units. Here are the most common:
        </p>
        <SEOList items={[
          "<strong>Electronvolt (eV):</strong> Most common in atomic and molecular physics. 1 eV = 1.602176634 × 10⁻¹⁹ J. Typical values: Visible light photons have 1.8-3.1 eV.",
          "<strong>Joule (J):</strong> SI unit of energy. Used in general physics. Visible light photons have approximately 3 × 10⁻¹⁹ J.",
          "<strong>kJ/mol and kcal/mol:</strong> Used in chemistry for bond energies and reaction energies. These are per-mole values, which the calculator converts to per-photon values using Avogadro's number.",
          "<strong>Wavenumber (cm⁻¹):</strong> Common in infrared and Raman spectroscopy. Represents the number of waves per centimeter. Energy in cm⁻¹ = E / (hc), where E is in Joules.",
          "<strong>Conversion Examples:</strong> 500 nm (visible light) ≈ 2.48 eV ≈ 3.97 × 10⁻¹⁹ J ≈ 240 kJ/mol ≈ 57.4 kcal/mol"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How do you convert wavelength to energy?",
            answer: "To convert wavelength to energy, use the formula E = hc/λ, where E is energy, h is Planck's constant (6.62607015 × 10⁻³⁴ J·s), c is the speed of light (299,792,458 m/s), and λ is wavelength. For example, a 500 nm photon has energy E = (6.626 × 10⁻³⁴ × 2.998 × 10⁸) / (500 × 10⁻⁹) ≈ 3.97 × 10⁻¹⁹ J or about 2.48 eV."
          },
          {
            question: "What is the formula for photon energy?",
            answer: "The formula for photon energy is E = hc/λ, where E is energy, h is Planck's constant, c is the speed of light, and λ is wavelength. It can also be written as E = hf, where f is frequency, since c = λf. This fundamental relationship connects the particle nature (energy) and wave nature (wavelength/frequency) of light."
          },
          {
            question: "What is Planck's constant?",
            answer: "Planck's constant (h = 6.62607015 × 10⁻³⁴ J·s) is a fundamental constant of nature discovered by Max Planck. It relates the energy of a photon to its frequency: E = hf. It's central to quantum mechanics and represents the quantization of energy in quantum systems."
          },
          {
            question: "What energy does visible light have?",
            answer: "Visible light photons have energies ranging from approximately 1.8 eV (red, ~700 nm) to 3.1 eV (violet, ~400 nm). In Joules, this is about 2.9 × 10⁻¹⁹ J to 5.0 × 10⁻¹⁹ J. Different colors correspond to different photon energies, which is why different wavelengths of light can have different effects in photochemical reactions."
          },
          {
            question: "Can you convert kJ/mol to wavelength?",
            answer: "Yes! kJ/mol is a per-mole energy unit. To convert to wavelength, first convert to per-photon energy by dividing by Avogadro's number (6.022 × 10²³), then use λ = hc/E. For example, 240 kJ/mol = (240 × 10³) / (6.022 × 10²³) J/photon ≈ 3.99 × 10⁻¹⁹ J/photon, which corresponds to approximately 500 nm wavelength."
          },
          {
            question: "What is the relationship between wavelength and energy?",
            answer: "Wavelength and energy are inversely related: E = hc/λ. This means shorter wavelengths have higher energy, and longer wavelengths have lower energy. For example, X-rays (very short wavelength) have much higher energy than radio waves (very long wavelength). This inverse relationship is fundamental to understanding the electromagnetic spectrum."
          },
          {
            question: "Why do shorter wavelengths have more energy?",
            answer: "Shorter wavelengths have more energy because of the formula E = hc/λ. Since h and c are constants, energy is inversely proportional to wavelength. Physically, shorter wavelength photons oscillate more rapidly (higher frequency), and higher frequency means more energy per photon. This is why ultraviolet light can cause sunburn (high energy) while visible light cannot."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The conversion between wavelength and energy is fundamental to understanding quantum mechanics, spectroscopy, and the behavior of electromagnetic radiation. Our Wavelength to Energy Calculator provides a powerful and accurate tool for converting between these related quantities using the relationship E = hc/λ.
        </p>
        <p>
          By simplifying complex calculations and offering comprehensive unit support with detailed step-by-step solutions, this calculator empowers students, researchers, and professionals to analyze photon energies and wavelengths effectively across the entire electromagnetic spectrum. For related calculations, explore our {createInternalLink('wavelength-calculator')} for wavelength calculations or our {createInternalLink('frequency-calculator')} for frequency-related conversions.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

