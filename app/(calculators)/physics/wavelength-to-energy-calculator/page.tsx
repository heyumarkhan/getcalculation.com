import WavelengthToEnergyCalculator from '../../../_components/calculators/WavelengthToEnergyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WavelengthToEnergyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wavelength to Energy Calculator: Convert Photon Wavelength to Energy"
      description="Calculate photon energy from wavelength using Planck-Einstein relation. Convert between wavelength and energy instantly. Free online physics calculator."
      calculator={<WavelengthToEnergyCalculator />}
      slug="physics/wavelength-to-energy-calculator"
      category="Physics"
      features={[
        "Calculate photon energy from wavelength",
        "Support for multiple units (eV, Joules, nanometers, meters)",
        "Uses Planck constant and speed of light",
        "Instant results with step-by-step calculations",
        "Free and no registration required"
      ]}
    >
      <SEOSection title="Understanding Photon Energy and Wavelength">
        <p>
          Photon energy is directly related to electromagnetic wavelength through the Planck-Einstein relation. Every photon carries energy determined by its frequency, which is inversely related to wavelength. Understanding this relationship is essential for physics students, spectroscopy professionals, and anyone working with light and radiation. The relationship between wavelength and {createInternalLink('frequency-calculator')} explains why different colors of light have different energies.
        </p>
        <p>
          Shorter wavelengths produce higher energy photons, while longer wavelengths produce lower energy photons. This principle explains why ultraviolet light damages skin while infrared mostly produces heat. Our calculator makes it simple to convert between wavelength and photon energy without complex manual calculations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <ol>
          <li><strong>Enter Wavelength:</strong> Input the wavelength value in nanometers, micrometers, or meters.</li>
          <li><strong>Select Your Unit:</strong> Choose the appropriate unit for wavelength measurement to ensure accurate conversion.</li>
          <li><strong>Get Results:</strong> The calculator instantly displays photon energy in Joules, electron volts (eV), and other common units with detailed step-by-step calculations.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Photon Energy Formula: E = hc/λ">
        <p>
          The Planck-Einstein relation connects photon energy to wavelength through fundamental constants:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">E = hc / λ</p>
        </div>
        <p>
          Where: E = Photon Energy (Joules), h = Planck's Constant (6.626 × 10⁻³⁴ J·s), c = Speed of Light (2.998 × 10⁸ m/s), λ = Wavelength (meters)
        </p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Calculate the energy of a green light photon with wavelength 500 nanometers:
        </p>
        <ul>
          <li>Given: λ = 500 nm = 500 × 10⁻⁹ m = 5 × 10⁻⁷ m</li>
          <li>E = (6.626 × 10⁻³⁴ × 2.998 × 10⁸) / (5 × 10⁻⁷)</li>
          <li>E = (1.986 × 10⁻²⁵) / (5 × 10⁻⁷)</li>
          <li>E = 3.97 × 10⁻¹⁹ Joules = 2.48 electron volts (eV)</li>
          <li>Result: A green photon carries about 2.48 eV of energy</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications of Wavelength-Energy Conversion">
        <SEOList items={[
          "<strong>Spectroscopy:</strong> Analyzing light absorbed or emitted by materials to identify chemical composition and electron energy transitions.",
          "<strong>Photochemistry:</strong> Determining whether light at a given wavelength has sufficient energy to trigger chemical reactions.",
          "<strong>Solar Energy:</strong> Calculating photon energies in solar radiation to optimize photovoltaic cell design and energy conversion.",
          "<strong>Medical Imaging:</strong> Understanding X-ray and gamma-ray energies for safe and effective diagnostic imaging applications.",
          "<strong>Laser Engineering:</strong> Selecting laser wavelengths based on required photon energy for cutting, welding, and material processing."
        ]} />
      </SEOSection>



      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "How do you convert wavelength to energy?",
            answer: "Use the formula E = hc/λ, where E is energy in Joules, h is Planck's constant (6.626 × 10⁻³⁴ J·s), c is light speed (2.998 × 10⁸ m/s), and λ is wavelength in meters. For a 500 nm (green light) photon: E = (6.626 × 10⁻³⁴ × 2.998 × 10⁸) / (500 × 10⁻⁹) ≈ 3.97 × 10⁻¹⁹ J or 2.48 eV."
          },
          {
            question: "Why is the relationship between wavelength and energy inverse?",
            answer: "The formula E = hc/λ shows that as wavelength (λ) increases, energy (E) decreases. This inverse relationship comes from the fact that shorter wavelengths correspond to higher frequencies, and since E = hf (where f is frequency), higher frequency means higher energy. Ultraviolet light (short wavelength) carries more energy than red light (long wavelength)."
          },
          {
            question: "What is Planck's constant and why is it important?",
            answer: "Planck's constant (h = 6.626 × 10⁻³⁴ J·s) is a fundamental constant relating photon energy to frequency. It was discovered by Max Planck and is central to quantum mechanics, showing that energy is quantized in discrete packets called photons. Without Planck's constant, we couldn't calculate photon energy from wavelength or frequency."
          },
          {
            question: "What energy does visible light have?",
            answer: "Visible light photons range from about 1.8 eV (red, ~700 nm) to 3.1 eV (violet, ~400 nm), or approximately 2.9 × 10⁻¹⁹ J to 5.0 × 10⁻¹⁹ J. This is why visible light can't ionize most atoms (that requires UV light with energy > 3.1 eV) but can still excite electrons to higher energy states."
          },
          {
            question: "How does wavelength relate to {createInternalLink('displacement-calculator')}?",
            answer: "Wavelength is a distance measurement representing the space between consecutive wave peaks. While a displacement calculator measures distance traveled, wavelength specifically refers to the spatial extent of one complete oscillation in a wave. Both use distance units, but wavelength describes wave structure while displacement describes motion."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding the relationship between wavelength and photon energy is essential for quantum physics, spectroscopy, and modern optics. The Planck-Einstein relation E = hc/λ elegantly connects quantum mechanics with observable light properties, enabling precise calculations across all electromagnetic wavelengths.
        </p>
        <p>
          Our Wavelength to Energy Calculator eliminates tedious calculations, providing instant results with detailed step-by-step explanations. Master photon energy conversions for spectroscopy, solar energy, and physics research. Explore more physics tools: Check out our {createInternalLink('wavelength-calculator')} or our {createInternalLink('acceleration-calculator')} for related physics concepts.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

