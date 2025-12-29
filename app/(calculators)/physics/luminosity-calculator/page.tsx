import LuminosityCalculator from '../../../_components/calculators/LuminosityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function LuminosityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Luminosity Calculator: Calculate Stellar Luminosity L = 4πR²σT⁴"
      description="Calculate stellar luminosity using the Stefan-Boltzmann law: L = 4πR²σT⁴. Free online physics calculator for astronomy and astrophysics. Calculate luminosity, radius, or temperature of stars with preset values for Sun, Sirius, Vega, and more."
      calculator={<LuminosityCalculator primaryColor="#820ECC" />}
      slug="physics/luminosity-calculator"
      category="Thermodynamics"
      features={[
        "Calculate luminosity, radius, or temperature",
        "Preset values for Sun, Sirius, Vega, Betelgeuse, and more",
        "Multiple unit support (Watts, Solar Luminosities, Solar Radii, Kelvin, Celsius, Fahrenheit)",
        "Step-by-step calculations using Stefan-Boltzmann law",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Stellar Luminosity">
        <p>
          Luminosity is one of the most fundamental properties of stars, representing the total amount of energy a star emits per unit time. Unlike brightness, which depends on distance, luminosity is an intrinsic property that reveals the true energy output of a celestial object. Understanding stellar luminosity is crucial for astronomers studying stellar evolution, classifying stars, and understanding the life cycles of celestial bodies.
        </p>
        <p>
          Our <strong>Luminosity Calculator</strong> uses the Stefan-Boltzmann law to calculate stellar luminosity from a star&apos;s radius and surface temperature. The formula <strong>L = 4πR²σT⁴</strong> connects these fundamental stellar properties, allowing you to determine any one of these values when the other two are known. Whether you&apos;re studying astrophysics, working on astronomy projects, or simply curious about stellar properties, this calculator provides accurate results instantly.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Luminosity Calculator">
        <p>
          Our calculator is designed for ease of use and provides accurate results for stellar luminosity calculations:
        </p>
        <ol>
          <li><strong>Select a Preset Star (Optional):</strong> Choose from preset values for the Sun, Sirius, Vega, Betelgeuse, Rigel, or Proxima Centauri to quickly populate the calculator with known stellar data.</li>
          <li><strong>Choose Calculation Type:</strong> Select what you want to calculate:
            <ul>
              <li><strong>Luminosity:</strong> Calculate total energy output from radius and temperature</li>
              <li><strong>Radius:</strong> Determine stellar radius from luminosity and temperature</li>
              <li><strong>Temperature:</strong> Find surface temperature from luminosity and radius</li>
            </ul>
          </li>
          <li><strong>Enter Values:</strong> Input the required parameters based on your calculation type</li>
          <li><strong>Select Units:</strong> Choose appropriate units for each parameter (Watts, Solar Luminosities, Solar Radii, Kelvin, etc.)</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed step-by-step calculations</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and uses the Stefan-Boltzmann constant (σ = 5.670374419 × 10⁻⁸ W/(m²·K⁴)) for accurate calculations.
        </p>
      </SEOSection>

      <SEOSection title="The Stefan-Boltzmann Law: L = 4πR²σT⁴">
        <p>
          The Stefan-Boltzmann law is a fundamental principle in physics that describes how the total energy radiated per unit surface area of a black body is related to its temperature. For stars, this law connects luminosity, radius, and surface temperature:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">L = 4πR²σT⁴</p>
          <p className="text-sm text-gray-600 mt-2">
            Where:
            <br />
            <strong>L</strong> = Luminosity (Watts)
            <br />
            <strong>R</strong> = Radius (meters)
            <br />
            <strong>σ</strong> = Stefan-Boltzmann constant = 5.670374419 × 10⁻⁸ W/(m²·K⁴)
            <br />
            <strong>T</strong> = Surface Temperature (Kelvin)
            <br />
            <strong>4πR²</strong> = Surface Area of the star
          </p>
        </div>

        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "Luminosity (L): The total power output of a star, measured in Watts. This represents all the energy the star emits across all wavelengths per second.",
          "Surface Area (4πR²): The total surface area of a sphere with radius R. For stars, this represents the area from which radiation is emitted.",
          "Stefan-Boltzmann Constant (σ): A fundamental physical constant that relates temperature to radiated power per unit area. Its value is 5.670374419 × 10⁻⁸ W/(m²·K⁴).",
          "Temperature (T): The surface temperature of the star in Kelvin. Temperature has a fourth-power relationship with luminosity, meaning small temperature changes result in large luminosity changes."
        ]} />

        <h3>Derived Formulas</h3>
        <p>
          From the main formula, we can solve for any variable:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="font-mono"><strong>Calculate Radius:</strong> R = √(L / (4πσT⁴))</p>
          <p className="font-mono"><strong>Calculate Temperature:</strong> T = ⁴√(L / (4πR²σ))</p>
        </div>
      </SEOSection>

      <SEOSection title="Stellar Properties and Examples">
        <p>
          Stars vary dramatically in their properties. Here are some examples of well-known stars and their characteristics:
        </p>
        <SEOList items={[
          "Sun: Our star has a luminosity of 3.828 × 10²⁶ W, radius of 6.957 × 10⁸ m, and surface temperature of 5,778 K. This serves as the reference point (1 L☉, 1 R☉).",
          "Sirius A: The brightest star in the night sky has a luminosity of 9.8 × 10²⁷ W (25.4 L☉), radius of 1.19 × 10⁹ m (1.71 R☉), and temperature of 9,940 K.",
          "Vega: A bright blue-white star with luminosity of 3.7 × 10²⁷ W (40 L☉), radius of 1.6 × 10⁹ m (2.3 R☉), and temperature of 9,602 K.",
          "Betelgeuse: A red supergiant with enormous luminosity of 1.26 × 10³¹ W (126,000 L☉), radius of 6.17 × 10¹¹ m (887 R☉), and relatively cool temperature of 3,600 K.",
          "Rigel: A blue supergiant with luminosity of 1.2 × 10³² W (120,000 L☉), radius of 7.8 × 10¹⁰ m (112 R☉), and high temperature of 12,100 K.",
          "Proxima Centauri: The closest star to Earth is a red dwarf with luminosity of 1.7 × 10²³ W (0.0017 L☉), radius of 1.07 × 10⁸ m (0.154 R☉), and temperature of 3,042 K."
        ]} />
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Our calculator supports a wide range of units for each parameter, performing automatic conversions to ensure accuracy:
        </p>
        <SEOList items={[
          "Luminosity: Watts (W), Kilowatts (kW), Megawatts (MW), Gigawatts (GW), Terawatts (TW), Solar Luminosities (L☉)",
          "Radius: Meters (m), Kilometers (km), Solar Radii (R☉), Astronomical Units (AU), Light-years (ly)",
          "Temperature: Kelvin (K), Celsius (°C), Fahrenheit (°F)"
        ]} />
        <p>
          The calculator automatically converts between these units, so you can work with the units most convenient for your application. Solar units (L☉ and R☉) are particularly useful in astronomy for comparing stars to our Sun.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Luminosity Calculations">
        <p>
          Luminosity calculations are fundamental in various fields of astronomy and physics:
        </p>
        <SEOList items={[
          "Stellar Classification: Determining where stars fall on the Hertzsprung-Russell diagram based on their luminosity and temperature",
          "Stellar Evolution: Understanding how stars change in luminosity as they age and evolve through different stages",
          "Distance Measurements: Using luminosity to calculate distances to stars through the distance modulus formula",
          "Exoplanet Studies: Understanding the energy environment around stars to assess habitability of exoplanets",
          "Cosmology: Studying the evolution of galaxies and the universe by analyzing stellar populations",
          "Astrophysics Research: Modeling stellar interiors, atmospheres, and energy transport mechanisms"
        ]} />
      </SEOSection>

      <SEOSection title="The Temperature-Luminosity Relationship">
        <p>
          The Stefan-Boltzmann law reveals a crucial relationship: luminosity is proportional to the fourth power of temperature. This means:
        </p>
        <SEOList items={[
          "A star that is twice as hot will be 16 times (2⁴) more luminous, assuming the same radius",
          "Small temperature differences result in large luminosity differences",
          "This relationship explains why hot blue stars are much more luminous than cool red stars of similar size",
          "The temperature dependence is so strong that even small temperature variations can significantly affect a star&apos;s energy output"
        ]} />
        <p>
          This fourth-power relationship is why temperature is such a critical factor in determining stellar luminosity and why stellar classification systems often use temperature as a primary parameter.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between luminosity and brightness?",
            answer: "Luminosity is the total energy output of a star (intrinsic property), while brightness (apparent magnitude) is how bright a star appears from Earth (depends on distance). A dim star close to Earth can have the same apparent brightness as a very luminous star far away."
          },
          {
            question: "Why do we use the Stefan-Boltzmann law for stars?",
            answer: "Stars approximate black bodies, which means they emit radiation according to the Stefan-Boltzmann law. This law accurately describes the relationship between a star's temperature, size, and total energy output."
          },
          {
            question: "What is a Solar Luminosity (L☉)?",
            answer: "A Solar Luminosity is a unit of luminosity equal to the Sun's luminosity (3.828 × 10²⁶ W). It's commonly used in astronomy to express stellar luminosities in a more intuitive way. For example, a star with 100 L☉ is 100 times more luminous than the Sun."
          },
          {
            question: "Can I calculate the temperature of a star if I know its luminosity and radius?",
            answer: "Yes! Using the formula T = ⁴√(L / (4πR²σ)), you can determine the surface temperature. Select 'Temperature' as your calculation type and enter the luminosity and radius values."
          },
          {
            question: "Why is temperature raised to the fourth power?",
            answer: "The fourth-power relationship comes from the physics of black body radiation. The energy radiated per unit area is proportional to T⁴, and since luminosity is energy per unit time over the entire surface area, it maintains this T⁴ dependence."
          },
          {
            question: "What is the Stefan-Boltzmann constant?",
            answer: "The Stefan-Boltzmann constant (σ = 5.670374419 × 10⁻⁸ W/(m²·K⁴)) is a fundamental physical constant that relates the temperature of a black body to the power it radiates per unit area. It was discovered through experimental observations and theoretical work by Josef Stefan and Ludwig Boltzmann."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The Luminosity Calculator provides a powerful tool for students, astronomers, and anyone interested in stellar physics. By using the Stefan-Boltzmann law (L = 4πR²σT⁴), you can calculate luminosity, radius, or temperature of stars, enabling deeper understanding of stellar properties and evolution.
        </p>
        <p>
          Whether you&apos;re studying astrophysics, working on astronomy projects, or exploring the properties of stars, this calculator simplifies complex stellar calculations. Explore our other {createInternalLink('acceleration-due-to-gravity-calculator', 'Physics Calculators')} like the {createInternalLink('heat-transfer-calculator', 'Heat Transfer Calculator')} and {createInternalLink('standard-cubic-feet-per-minute-calculator', 'Standard Cubic Feet per Minute Calculator')} for related physics calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

