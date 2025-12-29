import WiensLawCalculator from '../../../_components/calculators/WiensLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WiensLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wien's Law Calculator: Calculate Peak Wavelength λ_max × T = b"
      description="Calculate peak wavelength or temperature using Wien's displacement law: λ_max × T = b. Free online physics calculator for black body radiation, thermal physics, and astrophysics. Calculate the wavelength of maximum emission from temperature or vice versa."
      calculator={<WiensLawCalculator primaryColor="#820ECC" />}
      slug="physics/wiens-law-calculator"
      category="Thermodynamics"
      features={[
        "Calculate peak wavelength from temperature",
        "Calculate temperature from peak wavelength",
        "Preset values for Sun, stars, and common objects",
        "Multiple unit support (m, cm, mm, μm, nm, Å for wavelength; K, °C, °F for temperature)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Wien's Displacement Law">
        <p>
          Wien&apos;s displacement law, discovered by German physicist Wilhelm Wien in 1893, is a fundamental principle in thermal physics and black body radiation. It describes the relationship between the temperature of a black body and the wavelength at which it emits the most radiation. This law is crucial for understanding thermal radiation, stellar physics, and the behavior of hot objects.
        </p>
        <p>
          Our <strong>Wien&apos;s Law Calculator</strong> makes it easy to calculate peak wavelength or temperature using the fundamental relationship: <strong>λ_max × T = b</strong>, where λ_max is the peak wavelength, T is temperature, and b is Wien&apos;s displacement constant. Whether you&apos;re studying thermal physics, analyzing stellar spectra, or working with thermal imaging, this calculator provides accurate results with comprehensive unit support.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Wien's Law Calculator">
        <p>
          Our calculator is designed for ease of use and provides accurate results for Wien&apos;s law calculations:
        </p>
        <ol>
          <li><strong>Select a Preset Object (Optional):</strong> Choose from preset values for the Sun, incandescent bulb, candle flame, red hot iron, room temperature, or cosmic microwave background to quickly populate the calculator with known values.</li>
          <li><strong>Choose Calculation Type:</strong> Select what you want to calculate:
            <ul>
              <li><strong>Peak Wavelength:</strong> Calculate the wavelength of maximum emission from temperature (λ_max = b/T)</li>
              <li><strong>Temperature:</strong> Determine temperature from peak wavelength (T = b/λ_max)</li>
            </ul>
          </li>
          <li><strong>Enter Values:</strong> Input the required parameter based on your calculation type</li>
          <li><strong>Select Units:</strong> Choose appropriate units for wavelength (m, cm, mm, μm, nm, Å) and temperature (K, °C, °F)</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed step-by-step calculations</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and uses Wien&apos;s displacement constant (b = 2.897771955 × 10⁻³ m·K) for accurate calculations.
        </p>
      </SEOSection>

      <SEOSection title="Wien's Displacement Law: λ_max × T = b">
        <p>
          Wien&apos;s displacement law states that the product of the peak wavelength and temperature is a constant:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">λ_max × T = b</p>
          <p className="text-sm text-gray-600 mt-2">
            Where:
            <br />
            <strong>λ_max</strong> = Peak wavelength (meters, nanometers, etc.)
            <br />
            <strong>T</strong> = Temperature (Kelvin)
            <br />
            <strong>b</strong> = Wien&apos;s displacement constant = 2.897771955 × 10⁻³ m·K
          </p>
        </div>

        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "Peak Wavelength (λ_max): The wavelength at which a black body emits the most radiation. This corresponds to the peak of the black body radiation spectrum. Hotter objects have shorter peak wavelengths (shift toward blue/violet), while cooler objects have longer peak wavelengths (shift toward red/infrared).",
          "Temperature (T): The absolute temperature of the black body in Kelvin. Temperature determines the overall shape and peak position of the black body radiation spectrum.",
          "Wien's Constant (b): A fundamental physical constant with the value 2.897771955 × 10⁻³ m·K. This constant relates temperature and peak wavelength for all black bodies."
        ]} />

        <h3>Derived Formulas</h3>
        <p>
          From the main formula, we can solve for either variable:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="font-mono"><strong>Calculate Peak Wavelength:</strong> λ_max = b / T</p>
          <p className="font-mono"><strong>Calculate Temperature:</strong> T = b / λ_max</p>
        </div>
        <p>
          These relationships show that temperature and peak wavelength are inversely proportional - as temperature increases, peak wavelength decreases, and vice versa.
        </p>
      </SEOSection>

      <SEOSection title="Black Body Radiation and Color">
        <p>
          Wien&apos;s law explains why objects change color as they heat up:
        </p>
        <SEOList items={[
          "Room Temperature (~20°C): Peak wavelength in infrared (~10 μm) - not visible to human eyes",
          "Red Hot (~1000 K): Peak wavelength in red/infrared (~2.9 μm) - appears red",
          "Yellow Hot (~3000 K): Peak wavelength in yellow (~970 nm) - appears yellow-white (like incandescent bulbs)",
          "White Hot (~6000 K): Peak wavelength in blue-green (~483 nm) - appears white (like the Sun)",
          "Blue Hot (~10,000 K): Peak wavelength in ultraviolet (~290 nm) - appears blue-white (like hot stars)"
        ]} />
        <p>
          This relationship is why we can estimate the temperature of stars by observing their color - hotter stars appear bluer, while cooler stars appear redder.
        </p>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Our calculator supports a wide range of units for each parameter, performing automatic conversions to ensure accuracy:
        </p>
        <SEOList items={[
          "Wavelength: Meters (m), Centimeters (cm), Millimeters (mm), Micrometers (μm), Nanometers (nm), Angstroms (Å)",
          "Temperature: Kelvin (K), Celsius (°C), Fahrenheit (°F)"
        ]} />
        <p>
          The calculator automatically converts between these units, so you can work with the units most convenient for your application. For example, you can input temperature in Celsius and get wavelength in nanometers, which is common in spectroscopy and astronomy.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Wien's Law">
        <p>
          Wien&apos;s displacement law is fundamental in numerous fields and applications:
        </p>
        <SEOList items={[
          "Astrophysics: Determining stellar temperatures from observed peak wavelengths in stellar spectra",
          "Thermal Imaging: Understanding the wavelength range of thermal cameras and infrared detectors",
          "Industrial Processes: Monitoring temperatures in furnaces, kilns, and high-temperature processes",
          "Lighting: Designing incandescent and LED lighting systems based on desired color temperature",
          "Remote Sensing: Measuring surface temperatures of planets, moons, and other celestial bodies",
          "Materials Science: Analyzing thermal properties and emission characteristics of materials",
          "Climate Science: Understanding Earth's radiation balance and greenhouse effects",
          "Medical Imaging: Using thermal imaging for diagnostic purposes"
        ]} />
      </SEOSection>

      <SEOSection title="Common Examples and Values">
        <p>
          Here are some common examples of Wien&apos;s law in action:
        </p>
        <SEOList items={[
          "Sun (5,778 K): Peak wavelength ~501 nm (green-blue) - appears white/yellow to our eyes",
          "Incandescent Bulb (2,800 K): Peak wavelength ~1,035 nm (infrared) - appears warm white/yellow",
          "Candle Flame (1,800 K): Peak wavelength ~1,610 nm (infrared) - appears orange/yellow",
          "Red Hot Iron (1,000 K): Peak wavelength ~2,898 nm (infrared) - appears red",
          "Room Temperature (293 K): Peak wavelength ~9,890 nm (far infrared) - not visible",
          "Cosmic Microwave Background (2.725 K): Peak wavelength ~1.06 mm (microwave) - remnant radiation from the Big Bang"
        ]} />
        <p>
          These examples illustrate how Wien&apos;s law applies across a vast range of temperatures, from the cosmic microwave background to the hottest stars.
        </p>
      </SEOSection>

      <SEOSection title="Relationship to Black Body Spectrum">
        <p>
          Wien&apos;s law is part of the broader understanding of black body radiation:
        </p>
        <SEOList items={[
          "Black Body Spectrum: The complete distribution of radiation emitted by a black body at a given temperature, described by Planck's law",
          "Peak Wavelength: The wavelength where the black body spectrum reaches its maximum intensity, given by Wien's law",
          "Stefan-Boltzmann Law: Relates total power radiated to temperature (L = 4πR²σT⁴)",
          "Planck's Law: Describes the complete spectral distribution of black body radiation"
        ]} />
        <p>
          Together, these laws provide a complete description of thermal radiation, with Wien&apos;s law specifically identifying where the peak emission occurs.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is Wien's displacement constant?",
            answer: "Wien's displacement constant (b) is a fundamental physical constant equal to 2.897771955 × 10⁻³ m·K. It relates the peak wavelength of black body radiation to its temperature through the equation λ_max × T = b."
          },
          {
            question: "Why does peak wavelength decrease as temperature increases?",
            answer: "This is a fundamental property of black body radiation. As temperature increases, the black body spectrum shifts toward shorter wavelengths (higher frequencies). This is why hot objects appear bluer and cool objects appear redder."
          },
          {
            question: "Can I calculate temperature if I know the peak wavelength?",
            answer: "Yes! Using the formula T = b/λ_max, you can determine temperature from peak wavelength. Select 'Temperature' as your calculation type and enter the peak wavelength value."
          },
          {
            question: "What is a black body?",
            answer: "A black body is an idealized object that absorbs all incident radiation and emits radiation according to its temperature. Real objects approximate black bodies, and stars are often treated as black bodies for temperature calculations."
          },
          {
            question: "Why is Wien's law important in astronomy?",
            answer: "Wien's law allows astronomers to determine stellar temperatures by measuring the peak wavelength in a star's spectrum. This is one of the primary methods for classifying stars and understanding stellar evolution."
          },
          {
            question: "Does Wien's law apply to all objects?",
            answer: "Wien's law applies to black bodies, which are idealized objects. Real objects approximate black bodies, and the law works well for many practical applications, especially at high temperatures where thermal radiation dominates."
          },
          {
            question: "What is the difference between peak wavelength and average wavelength?",
            answer: "Peak wavelength (λ_max) is the wavelength where the black body spectrum has maximum intensity, given by Wien's law. Average wavelength is different and would be calculated differently. Wien's law specifically refers to the peak wavelength."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Wien&apos;s Law Calculator provides a powerful tool for students, physicists, and astronomers working with thermal radiation and black body physics. By using the fundamental relationship λ_max × T = b, you can calculate peak wavelength or temperature, enabling accurate analysis of thermal emission and stellar properties.
        </p>
        <p>
          Whether you&apos;re studying thermal physics, analyzing stellar spectra, working with thermal imaging, or exploring black body radiation, this calculator simplifies complex Wien&apos;s law calculations. Explore our other {createInternalLink('luminosity-calculator', 'Physics Calculators')} like the {createInternalLink('heat-transfer-calculator', 'Heat Transfer Calculator')} and {createInternalLink('specific-heat-calculator', 'Specific Heat Calculator')} for related thermodynamics calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

