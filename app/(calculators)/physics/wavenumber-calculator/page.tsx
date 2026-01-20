import WavenumberCalculator from '../../../_components/calculators/WavenumberCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WavenumberCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wavenumber Calculator: Calculate Spectroscopic Wavenumber Online"
      description="Calculate wavenumber from wavelength, frequency, or energy. Free online wavenumber calculator for spectroscopy with cm⁻¹, m⁻¹ conversions and SEO-optimized content."
      calculator={<WavenumberCalculator />}
      slug="physics/wavenumber-calculator"
      category="Optics"
      features={[
        "Calculate wavenumber from wavelength, frequency, or energy",
        "Multiple unit support (cm⁻¹, m⁻¹, nm⁻¹, μm⁻¹)",
        "Three calculation methods for different applications",
        "Spectroscopy-optimized wavenumber conversions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wavenumber in Spectroscopy and Physics">
        <p>
          The <strong>Wavenumber Calculator</strong> is an essential tool for spectroscopy, quantum mechanics, and optics applications. Wavenumber (ν̃) is the spatial frequency of a wave, representing the number of wavelengths per unit distance. It&apos;s the reciprocal of wavelength and is commonly expressed in reciprocal centimeters (cm⁻¹) in spectroscopic applications. This wavenumber calculator allows you to convert between wavelength, frequency, energy, and wavenumber with precision.
        </p>
        <p>
          Wavenumber is fundamental in infrared (IR) spectroscopy, Raman spectroscopy, UV-Vis spectroscopy, and molecular spectroscopy. Understanding wavenumber calculations is crucial for analyzing molecular vibrations, electronic transitions, and spectral data. Our wavenumber calculator supports multiple methods to accommodate various experimental and theoretical scenarios in physics and chemistry.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Wavenumber Calculator">
        <p>
          This wavenumber calculator offers three calculation methods for maximum flexibility:
        </p>
        <ol>
          <li><strong>From Wavelength:</strong> Enter the wavelength (λ) in meters, nanometers, or other units to calculate wavenumber using ν̃ = 1/λ</li>
          <li><strong>From Frequency:</strong> Enter the frequency (f) in Hz, THz, or other units to calculate wavenumber using ν̃ = f/c (where c is the speed of light)</li>
          <li><strong>From Energy:</strong> Enter photon energy (E) in eV, joules, or other units to calculate wavenumber using ν̃ = E/(hc)</li>
        </ol>
        <p>
          Select your input method, enter the value with appropriate units, choose your preferred wavenumber unit (typically cm⁻¹ for spectroscopy), and click Calculate to get instant wavenumber results.
        </p>
      </SEOSection>

      <SEOSection title="Wavenumber Formulas and Equations">
        <p>
          The wavenumber calculator uses these fundamental formulas:
        </p>
        
        <h3>1. Wavenumber from Wavelength</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ν̃ = 1/λ</p>
          <p className="text-sm text-gray-600 mt-2">Where: ν̃ = wavenumber, λ = wavelength</p>
        </div>
        <p>
          This is the most fundamental wavenumber formula. Wavenumber is simply the reciprocal of wavelength. For example, a wavelength of 1000 nm corresponds to a wavenumber of 10,000 cm⁻¹. This relationship is central to all spectroscopic wavenumber calculations.
        </p>

        <h3>2. Wavenumber from Frequency</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ν̃ = f/c</p>
          <p className="text-sm text-gray-600 mt-2">Where: ν̃ = wavenumber, f = frequency, c = speed of light (2.998×10⁸ m/s)</p>
        </div>
        <p>
          This formula converts frequency to wavenumber. Since c = λf, and ν̃ = 1/λ, we get ν̃ = f/c. This wavenumber calculation is useful when working with electromagnetic radiation frequencies in spectroscopy.
        </p>

        <h3>3. Wavenumber from Energy</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ν̃ = E/(hc)</p>
          <p className="text-sm text-gray-600 mt-2">Where: ν̃ = wavenumber, E = energy, h = Planck&apos;s constant (6.626×10⁻³⁴ J·s), c = speed of light</p>
        </div>
        <p>
          This formula relates photon energy to wavenumber. Since E = hf and ν̃ = f/c, we derive ν̃ = E/(hc). This wavenumber calculation is essential in photochemistry and quantum mechanics applications.
        </p>
      </SEOSection>

      <SEOSection title="Wavenumber Units and Conversions">
        <p>
          Wavenumber can be expressed in various units, with the wavenumber calculator supporting:
        </p>
        <SEOList items={[
          "cm⁻¹ (per centimeter) — Most common in IR spectroscopy, Raman spectroscopy, and molecular spectroscopy",
          "m⁻¹ (per meter) — SI unit for wavenumber, used in theoretical physics",
          "nm⁻¹ (per nanometer) — Useful for UV-Vis spectroscopy and optical applications",
          "μm⁻¹ (per micrometer) — Common in mid-infrared and thermal radiation studies"
        ]} />
        <p>
          The wavenumber calculator automatically handles conversions: 1 m⁻¹ = 0.01 cm⁻¹, 1 cm⁻¹ = 10⁷ nm⁻¹. In spectroscopy, cm⁻¹ (wavenumbers) is the standard unit because it provides convenient numerical values for molecular vibrations (typically 400-4000 cm⁻¹ for IR spectroscopy).
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications of Wavenumber Calculator">
        <p>
          The wavenumber calculator is essential for numerous scientific and technical applications:
        </p>
        <SEOList items={[
          "Infrared Spectroscopy: Converting IR wavelengths to wavenumbers for identifying functional groups and molecular vibrations",
          "Raman Spectroscopy: Analyzing Raman shifts expressed in wavenumber units for molecular fingerprinting",
          "UV-Vis Spectroscopy: Calculating wavenumbers for electronic transitions and absorption spectra",
          "Quantum Mechanics: Determining energy levels and transition states using wavenumber calculations",
          "Photochemistry: Relating photon energies to wavenumbers for photochemical reactions",
          "Molecular Spectroscopy: Characterizing rotational, vibrational, and electronic transitions",
          "Laser Physics: Specifying laser wavelengths and frequencies in wavenumber units",
          "Atmospheric Science: Analyzing atmospheric absorption and emission spectra using wavenumbers"
        ]} />
      </SEOSection>

      <SEOSection title="Wavenumber Calculator Examples">
        <h3>Example 1: IR Spectroscopy Wavenumber Calculation</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p>Calculate the wavenumber for a carbonyl (C=O) stretch with wavelength 5.75 μm (typical IR absorption).</p>
          <ul className="mt-2 space-y-1">
            <li>Input: λ = 5.75 μm = 5750 nm</li>
            <li>Formula: ν̃ = 1/λ</li>
            <li><strong>Result:</strong> ν̃ = 1/(5.75×10⁻⁶ m) = 1739 cm⁻¹</li>
            <li>This wavenumber is characteristic of carbonyl stretching vibrations</li>
          </ul>
        </div>

        <h3>Example 2: Wavenumber from Visible Light Frequency</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p>Calculate wavenumber for green light with frequency 5.5×10¹⁴ Hz.</p>
          <ul className="mt-2 space-y-1">
            <li>Input: f = 5.5×10¹⁴ Hz = 550 THz</li>
            <li>Formula: ν̃ = f/c</li>
            <li><strong>Result:</strong> ν̃ = (5.5×10¹⁴ Hz)/(3×10⁸ m/s) = 18,333 cm⁻¹</li>
            <li>This corresponds to green light at approximately 545 nm</li>
          </ul>
        </div>

        <h3>Example 3: Wavenumber from Photon Energy</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>Calculate wavenumber for a photon with energy 2.5 eV (typical UV range).</p>
          <ul className="mt-2 space-y-1">
            <li>Input: E = 2.5 eV</li>
            <li>Formula: ν̃ = E/(hc)</li>
            <li><strong>Result:</strong> ν̃ = 20,161 cm⁻¹</li>
            <li>This corresponds to UV radiation at approximately 496 nm</li>
          </ul>
        </div>
      </SEOSection>

      <SEOSection title="Wavenumber in Spectroscopy: Why cm⁻¹?">
        <p>
          In spectroscopy, wavenumber is almost universally expressed in cm⁻¹ (reciprocal centimeters) rather than the SI unit m⁻¹. This convention provides several practical advantages:
        </p>
        <SEOList items={[
          "Convenient numerical ranges: IR vibrations fall in 400-4000 cm⁻¹, easy to remember and compare",
          "Direct proportionality to energy: Higher wavenumbers mean higher energies, simplifying spectral interpretation",
          "Historical consistency: Spectroscopic tables and databases use cm⁻¹ as the standard unit",
          "Resolution matching: Wavenumber resolution matches typical spectrometer capabilities",
          "Linear energy scale: Unlike wavelength, wavenumber scales linearly with photon energy"
        ]} />
        <p>
          The wavenumber calculator supports cm⁻¹ as the default output unit for compatibility with spectroscopic conventions while offering other units for specialized applications.
        </p>
      </SEOSection>

      <SEOSection title="Wavenumber vs Wavelength vs Frequency">
        <p>
          Understanding the relationships between wavenumber, wavelength, and frequency is crucial for spectroscopy:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Property</th>
                <th className="border border-gray-300 px-4 py-2">Symbol</th>
                <th className="border border-gray-300 px-4 py-2">Common Units</th>
                <th className="border border-gray-300 px-4 py-2">Relationship</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Wavelength</td>
                <td className="border border-gray-300 px-4 py-2">λ</td>
                <td className="border border-gray-300 px-4 py-2">nm, μm, Å</td>
                <td className="border border-gray-300 px-4 py-2">λ = c/f = 1/ν̃</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Frequency</td>
                <td className="border border-gray-300 px-4 py-2">f</td>
                <td className="border border-gray-300 px-4 py-2">Hz, THz</td>
                <td className="border border-gray-300 px-4 py-2">f = c/λ = cν̃</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Wavenumber</td>
                <td className="border border-gray-300 px-4 py-2">ν̃</td>
                <td className="border border-gray-300 px-4 py-2">cm⁻¹, m⁻¹</td>
                <td className="border border-gray-300 px-4 py-2">ν̃ = 1/λ = f/c</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          This wavenumber calculator seamlessly converts between all these quantities, making it easy to work across different spectroscopic techniques and units.
        </p>
      </SEOSection>

      <SEOFAQ questions={[
        {
          question: "What is wavenumber and how is it calculated?",
          answer: "Wavenumber (ν̃) is the spatial frequency of a wave, representing the number of wavelengths per unit distance. It is calculated as the reciprocal of wavelength: ν̃ = 1/λ. Wavenumber can also be calculated from frequency (ν̃ = f/c) or energy (ν̃ = E/hc). The most common unit is cm⁻¹ (reciprocal centimeters), widely used in spectroscopy. The Wavenumber Calculator provides all three calculation methods for convenience."
        },
        {
          question: "Why is wavenumber used in spectroscopy instead of wavelength?",
          answer: "Wavenumber is preferred in spectroscopy because it is directly proportional to energy (E = hcν̃), making spectral interpretation more intuitive. Higher wavenumbers correspond to higher energies and higher frequencies. Wavenumber also provides a linear energy scale, unlike wavelength which has an inverse relationship with energy. The standard unit cm⁻¹ gives convenient numerical values for molecular vibrations and transitions, making wavenumber the universal language of spectroscopy."
        },
        {
          question: "How do you convert wavelength to wavenumber?",
          answer: "To convert wavelength to wavenumber, use the formula ν̃ = 1/λ, where λ must be in the same length unit as the desired wavenumber reciprocal unit. For cm⁻¹ (most common in spectroscopy), convert wavelength to cm first, then take the reciprocal. For example, 5000 nm = 500 nm = 0.0005 cm, so ν̃ = 1/0.0005 = 2000 cm⁻¹. The Wavenumber Calculator handles these conversions automatically with multiple wavelength units (nm, μm, Å, m)."
        },
        {
          question: "What is the difference between wavenumber and frequency?",
          answer: "Wavenumber (ν̃) is spatial frequency measured in reciprocal length units (cm⁻¹, m⁻¹), while frequency (f) is temporal frequency measured in Hz (cycles per second). They are related by ν̃ = f/c, where c is the speed of light. Wavenumber represents wavelengths per unit distance, while frequency represents oscillations per unit time. In spectroscopy, wavenumber is preferred because it's directly proportional to energy and provides convenient numerical ranges."
        },
        {
          question: "What wavenumber range is used in IR spectroscopy?",
          answer: "Infrared (IR) spectroscopy typically uses wavenumbers from 400 to 4000 cm⁻¹. This range covers molecular vibrations: stretching vibrations (2500-4000 cm⁻¹), bending vibrations (1000-1500 cm⁻¹), and fingerprint region (400-1500 cm⁻¹). Specific functional groups have characteristic wavenumber ranges: O-H stretch (~3600 cm⁻¹), C=O stretch (~1700 cm⁻¹), C-H stretch (~3000 cm⁻¹). The Wavenumber Calculator helps convert IR wavelengths to these standard spectroscopic wavenumber units."
        },
        {
          question: "How do you calculate wavenumber from energy in eV?",
          answer: "To calculate wavenumber from energy in electron volts (eV), use the formula ν̃ = E/(hc), where h is Planck's constant (6.626×10⁻³⁴ J·s) and c is the speed of light (2.998×10⁸ m/s). First convert eV to joules (1 eV = 1.602×10⁻¹⁹ J), then divide by hc. For convenience, you can use the conversion factor: ν̃ (cm⁻¹) = 8065.54 × E (eV). The Wavenumber Calculator performs this calculation automatically with eV, meV, keV inputs."
        }
      ]} />

      <SEOSection title="Conclusion">
        <p>
          The <strong>Wavenumber Calculator</strong> is an indispensable tool for spectroscopists, chemists, physicists, and researchers working with electromagnetic radiation. By providing three calculation methods—from wavelength, frequency, and energy—this wavenumber calculator accommodates all common spectroscopic scenarios. Whether you&apos;re analyzing IR spectra, working with Raman shifts, or studying electronic transitions, accurate wavenumber calculations are essential.
        </p>
        <p>
          Understanding wavenumber and its relationships to wavelength, frequency, and energy is fundamental to modern spectroscopy. This wavenumber calculator simplifies these conversions with support for multiple units and instant, accurate results optimized for spectroscopic applications. Use this free online wavenumber calculator to streamline your spectroscopic data analysis and enhance your research efficiency.
        </p>
        <p>
          For related calculations, explore our {createInternalLink('wavelength-calculator', 'Wavelength Calculator')}, {createInternalLink('frequency-calculator', 'Frequency Calculator')}, and {createInternalLink('sound-wavelength-calculator', 'Sound Wavelength Calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
