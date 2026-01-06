import TemperatureAtAltitudeCalculator from '../../../_components/calculators/TemperatureAtAltitudeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function TemperatureAtAltitudeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Temperature at Altitude Calculator: Calculate Temperature Decrease"
      description="Calculate temperature at any altitude using ICAO Standard Atmosphere or custom lapse rate method. Free online calculator with multiple unit support (°C, °F, K) for temperature and (m, km, ft) for altitude. Perfect for aviation, weather, and altitude effects."
      calculator={<TemperatureAtAltitudeCalculator />}
      slug="physics/temperature-at-altitude-calculator"
      category="Thermodynamics"
      features={[
        "ICAO Standard Atmosphere model",
        "Custom lapse rate calculation",
        "Multiple temperature units (°C, °F, K)",
        "Multiple altitude units (meters, kilometers, feet)",
        "Accurate atmospheric calculations",
        "Step-by-step solutions",
        "Aviation and weather applications",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Temperature at Altitude: Atmospheric Thermodynamics">
        <p>
          Temperature at altitude is a fundamental concept in atmospheric science, aviation, and weather forecasting. Temperature decreases with increasing altitude following predictable patterns defined by atmospheric models and lapse rates. Whether you&apos;re studying meteorology, planning aviation operations, analyzing weather patterns, or understanding Earth&apos;s atmosphere, calculating temperature at altitude is essential.
        </p>
        <p>
          Our Temperature at Altitude Calculator makes it easy to determine temperature at any altitude using two proven methods: the <strong>ICAO Standard Atmosphere model</strong> or the <strong>custom lapse rate method</strong>. With support for multiple unit systems and instant calculations, this tool is perfect for students, professionals, and anyone interested in atmospheric science.
        </p>
      </SEOSection>

      <SEOSection title="What is Temperature at Altitude?">
        <p>
          Temperature at altitude refers to the air temperature at a specific height above sea level. As altitude increases, atmospheric temperature typically decreases due to the way solar radiation interacts with the atmosphere. The rate at which temperature decreases with altitude is called the lapse rate.
        </p>
        <h3>Key Concepts:</h3>
        <ul>
          <li><strong>Altitude:</strong> Height above sea level, typically measured in meters, feet, or kilometers</li>
          <li><strong>Temperature:</strong> Thermal energy content of air, measured in Celsius, Fahrenheit, or Kelvin</li>
          <li><strong>Lapse Rate:</strong> The rate of temperature change with altitude, typically expressed as °C/km or °C/1000 ft</li>
          <li><strong>Troposphere:</strong> The lowest atmospheric layer where most weather occurs (0-11 km altitude)</li>
          <li><strong>Stratosphere:</strong> The layer above the troposphere where temperature increases with altitude</li>
          <li><strong>Sea Level Temperature:</strong> Reference temperature at altitude 0 meters (typically ~15°C)</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use Our Temperature at Altitude Calculator">
        <p>
          Our calculator offers two powerful methods for calculating temperature at altitude. Choose the approach that best fits your needs:
        </p>
        <h3>Method 1: ICAO Standard Atmosphere</h3>
        <ol>
          <li><strong>Select ICAO Method:</strong> Choose the ICAO Standard Atmosphere option</li>
          <li><strong>Enter Altitude:</strong> Input your desired altitude value</li>
          <li><strong>Select Units:</strong> Choose altitude units (meters, kilometers, feet) and temperature units (°C, °F, K)</li>
          <li><strong>Click Calculate:</strong> Get instant temperature at that altitude based on international standards</li>
        </ol>
        <h3>Method 2: Custom Lapse Rate</h3>
        <ol>
          <li><strong>Select Lapse Rate Method:</strong> Choose the custom lapse rate option</li>
          <li><strong>Enter Sea Level Temperature:</strong> Input the baseline temperature at sea level</li>
          <li><strong>Set Lapse Rate:</strong> Enter the temperature decrease per kilometer (or use presets: 6.5, 9.8, 6)</li>
          <li><strong>Enter Altitude:</strong> Specify the altitude where you want to calculate temperature</li>
          <li><strong>Click Calculate:</strong> Get the temperature instantly with detailed calculations</li>
        </ol>
      </SEOSection>

      <SEOSection title="Temperature at Altitude Formulas">
        <p>
          Different models use different formulas to calculate temperature at altitude. Here are the main approaches:
        </p>
        
        <h3>ICAO Standard Atmosphere Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg font-bold">T = T₀ + (Γ × Δh)</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where: T = temperature at altitude, T₀ = base temperature, Γ = lapse rate, Δh = altitude difference</p>
        </div>

        <h3>Lapse Rate Method Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg font-bold">T = T₀ - (L × h)</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where: T = temperature at altitude, T₀ = sea level temperature, L = lapse rate, h = altitude</p>
        </div>

        <h3>Temperature Unit Conversions</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="font-mono text-center">°F = (°C × 1.8) + 32</p>
          <p className="font-mono text-center">K = °C + 273.15</p>
        </div>
      </SEOSection>

      <SEOSection title="ICAO Standard Atmosphere Layers">
        <p>
          The ICAO (International Civil Aviation Organization) Standard Atmosphere model divides the lower atmosphere into distinct layers, each with different temperature characteristics:
        </p>
        <ul>
          <li><strong>Troposphere (0-11 km):</strong> Temperature decreases at 6.5°C/km. This is where weather occurs</li>
          <li><strong>Tropopause (11-20 km):</strong> Temperature remains nearly constant at -56.5°C</li>
          <li><strong>Stratosphere (20-32 km):</strong> Temperature increases at 1°C/km due to ozone absorption</li>
          <li><strong>Stratosphere (32-47 km):</strong> Temperature increases at 2.8°C/km</li>
        </ul>
        <p>
          The ICAO model provides highly accurate calculations for aviation, meteorology, and scientific applications up to 47 kilometers altitude.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Lapse Rates">
        <p>
          The lapse rate is the rate at which temperature changes with altitude. Different conditions create different lapse rates:
        </p>
        <ul>
          <li><strong>Standard Lapse Rate:</strong> 6.5°C/km - Average atmospheric condition used internationally</li>
          <li><strong>Dry Adiabatic Lapse Rate:</strong> 9.8°C/km - Occurs when dry air rises and cools without condensation</li>
          <li><strong>Moist Adiabatic Lapse Rate:</strong> ~6°C/km - Occurs when saturated air rises and water condenses</li>
          <li><strong>Environmental Lapse Rate:</strong> Variable - Actual temperature gradient in the atmosphere at a given time</li>
          <li><strong>Stable Atmosphere:</strong> Lapse rate less than 6.5°C/km - Resists vertical motion</li>
          <li><strong>Unstable Atmosphere:</strong> Lapse rate greater than 9.8°C/km - Promotes vertical motion and convection</li>
        </ul>
        <p>
          Understanding lapse rates is crucial for weather prediction, aviation safety, and understanding atmospheric stability.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Temperature at Altitude Calculations">
        <p>
          Temperature at altitude calculations have numerous real-world applications across various fields:
        </p>
        <SEOList items={[
          "Aviation: Calculating true airspeed, engine performance, and aircraft density altitude",
          "Weather Forecasting: Predicting cloud formation, precipitation, and atmospheric instability",
          "Mountain Climbing: Estimating temperature and conditions at high elevations",
          "Meteorology: Analyzing atmospheric structure and thermal characteristics",
          "Aerospace Engineering: Designing aircraft and missiles for various altitudes",
          "Weather Stations: Quality control and data analysis from weather observations",
          "Environmental Science: Studying climate patterns and temperature gradients",
          "Ballooning: Predicting temperatures during high-altitude balloon flights",
          "Renewable Energy: Wind resource assessment at different altitudes",
          "Air Quality: Understanding pollutant dispersion in different atmospheric layers"
        ]} />
      </SEOSection>

      <SEOSection title="Density Altitude and Temperature Effects">
        <p>
          Temperature at altitude directly affects air density, which has significant practical implications:
        </p>
        <ul>
          <li><strong>Density Altitude:</strong> The equivalent altitude at standard conditions with the same air density</li>
          <li><strong>Aircraft Performance:</strong> Higher density altitude means longer takeoff distance and reduced climb capability</li>
          <li><strong>Engine Performance:</strong> Cooler air (higher altitude) means richer fuel mixtures and reduced power output</li>
          <li><strong>Runway Requirements:</strong> Density altitude significantly affects aircraft runway length calculations</li>
          <li><strong>Lift Generation:</strong> Lower air density reduces lift, requiring higher airspeeds to generate adequate lift</li>
        </ul>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Accurate calculations require proper unit selection. Our calculator supports multiple unit systems:
        </p>
        
        <h3>Temperature Units</h3>
        <ul>
          <li><strong>Celsius (°C):</strong> Metric unit, freezing point of water = 0°C, boiling point = 100°C</li>
          <li><strong>Fahrenheit (°F):</strong> Imperial unit, freezing point of water = 32°F, boiling point = 212°F</li>
          <li><strong>Kelvin (K):</strong> Absolute temperature scale, 0 K = -273.15°C, no negative temperatures</li>
        </ul>

        <h3>Altitude Units</h3>
        <ul>
          <li><strong>Meters (m):</strong> Metric unit, standard in international aviation and meteorology</li>
          <li><strong>Kilometers (km):</strong> Larger metric unit for very high altitudes</li>
          <li><strong>Feet (ft):</strong> Imperial unit, commonly used in aviation (especially in North America)</li>
        </ul>

        <p>
          <strong>Common Conversions:</strong>
          <br />1 km = 1,000 m = 3,280.84 ft
          <br />1 ft = 0.3048 m = 0.0003048 km
        </p>
      </SEOSection>

      <SEOSection title="Common Temperature at Altitude Calculations">
        <h3>Example 1: Commercial Aircraft Cruising Altitude</h3>
        <p>What is the temperature at a typical commercial aircraft cruising altitude of 35,000 feet?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Altitude: 35,000 ft = 10,668 m</p>
          <p className="font-mono">Using ICAO Standard Atmosphere: T ≈ -56.5°C ≈ -69.7°F</p>
          <p className="text-sm text-gray-600 mt-2">This is in the Tropopause layer where temperature is nearly constant.</p>
        </div>

        <h3>Example 2: Mountain Summit Temperature</h3>
        <p>Estimate the temperature at Mount Everest&apos;s summit (8,849 m) on a day when sea level temperature is 20°C and the lapse rate is 6.5°C/km.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 20°C - (6.5°C/km × 8.849 km) = 20 - 57.5 = -37.5°C</p>
          <p className="text-sm text-gray-600 mt-2">Close to actual summit temperatures of -30°C to -40°C.</p>
        </div>

        <h3>Example 3: Weather Balloon Release</h3>
        <p>A weather balloon is released at sea level (15°C). If the lapse rate is 6.5°C/km, what temperature will it encounter at 5 km altitude?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 15°C - (6.5°C/km × 5 km) = 15 - 32.5 = -17.5°C</p>
          <p className="text-sm text-gray-600 mt-2">This predicts significant cooling within the troposphere.</p>
        </div>

        <h3>Example 4: Dry Air Rising</h3>
        <p>Dry air at sea level is 25°C. Using the dry adiabatic lapse rate of 9.8°C/km, what is the temperature at 2 km?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 25°C - (9.8°C/km × 2 km) = 25 - 19.6 = 5.4°C</p>
          <p className="text-sm text-gray-600 mt-2">Dry air cools faster than moist air during ascent.</p>
        </div>

        <h3>Example 5: Temperature Conversion at Altitude</h3>
        <p>If the temperature at 3 km altitude is -9.5°C in a standard atmosphere, what is this in Fahrenheit and Kelvin?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Fahrenheit: (-9.5 × 1.8) + 32 = 14.9°F</p>
          <p className="font-mono">Kelvin: -9.5 + 273.15 = 263.65 K</p>
          <p className="text-sm text-gray-600 mt-2">Same temperature expressed in three different scales.</p>
        </div>
      </SEOSection>

      <SEOSection title="Factors Affecting Temperature at Altitude">
        <p>
          While altitude is the primary factor determining temperature, several other conditions influence the relationship:
        </p>
        <ul>
          <li><strong>Latitude:</strong> Temperature variations are larger near the poles than the equator</li>
          <li><strong>Season:</strong> Seasonal temperature changes are more pronounced at higher altitudes</li>
          <li><strong>Time of Day:</strong> Daily temperature cycles weaken with altitude</li>
          <li><strong>Humidity:</strong> Affects lapse rate (moist air cools differently than dry air)</li>
          <li><strong>Atmospheric Pressure:</strong> Related to temperature and affects calculation accuracy</li>
          <li><strong>Solar Radiation:</strong> Influences tropospheric temperature structure</li>
          <li><strong>Terrain:</strong> Mountain valleys and peaks can have local variations</li>
          <li><strong>Air Masses:</strong> Different air masses have different temperature profiles</li>
        </ul>
      </SEOSection>

      <SEOSection title="Aviation and Temperature at Altitude">
        <p>
          For aviation applications, understanding temperature at altitude is critical for safe and efficient operations:
        </p>
        <ul>
          <li><strong>True Airspeed:</strong> Calculated from indicated airspeed using temperature correction</li>
          <li><strong>Density Altitude:</strong> Determines aircraft performance and runway requirements</li>
          <li><strong>Oxygen Requirements:</strong> Cabin pressure and supplemental oxygen needs depend on altitude and temperature</li>
          <li><strong>Engine Performance:</strong> Temperature affects engine power, requiring performance calculations</li>
          <li><strong>Fuel Consumption:</strong> Temperature changes affect fuel consumption rates</li>
          <li><strong>De-icing Systems:</strong> Temperature determines when anti-icing and de-icing systems are needed</li>
          <li><strong>Aircraft Structural Limits:</strong> Maximum operating altitudes often limited by temperature and structural concerns</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "Why does temperature decrease with altitude?",
            answer: "In the troposphere (lower atmosphere), temperature decreases with altitude primarily because the atmosphere is heated from below by solar radiation reflected from Earth's surface, not by direct radiation from the sun. As you move away from this heat source (the ground), temperature decreases at approximately 6.5°C per kilometer."
          },
          {
            question: "What is the difference between ICAO Standard Atmosphere and lapse rate methods?",
            answer: "The ICAO Standard Atmosphere is an internationally standardized model with fixed temperature profiles for different altitude layers, providing consistent reference values. The lapse rate method uses a constant temperature change per unit altitude, which is simpler but varies with actual atmospheric conditions. ICAO is more accurate for aviation and meteorology, while lapse rate is more flexible for specific conditions."
          },
          {
            question: "What is density altitude and why is it important?",
            answer: "Density altitude is the altitude at standard atmospheric conditions (15°C at sea level) that has the same air density as the current conditions. It's important in aviation because aircraft performance depends on air density, not actual altitude. High density altitudes (hot days at high elevation) require longer takeoff distances and reduce climb performance."
          },
          {
            question: "How accurate is the temperature at altitude calculator?",
            answer: "The ICAO model is highly accurate (within ±2°C) for calculating standard atmosphere temperatures up to 47 km. The lapse rate method accuracy depends on your input values and how well they match actual conditions. Real atmospheric temperatures can vary ±5-10°C from these values due to weather patterns and seasonal variations."
          },
          {
            question: "What is the standard lapse rate and when does it change?",
            answer: "The standard lapse rate is 6.5°C/km in the troposphere. It changes at different altitudes because different atmospheric layers have different temperature characteristics. The dry adiabatic lapse rate (9.8°C/km) applies to dry air rising, while the moist adiabatic rate (~6°C/km) applies to saturated air. These differences are crucial for weather prediction."
          },
          {
            question: "Can I use this calculator for altitudes above 50 km?",
            answer: "The ICAO model in our calculator is valid up to 47 km altitude. Above this, the stratosphere extends to about 50 km, but calculations become increasingly complex and less accurate. For specialized applications requiring higher altitudes, you would need additional atmospheric models or reference data."
          },
          {
            question: "How does humidity affect temperature at altitude?",
            answer: "Humidity affects the rate at which temperature changes with altitude (the lapse rate). Dry air cools at 9.8°C/km when rising (dry adiabatic rate), while moist air cools at about 6°C/km (moist adiabatic rate) because water vapor condensation releases latent heat. This is why moist air doesn't cool as quickly."
          },
          {
            question: "What are typical temperatures at common altitudes?",
            answer: "Sea level: 15°C (59°F); 1 km: 8.5°C (47°F); 5 km: -17.5°C (0°F); 10 km: -50°C (-58°F); 11 km: -56.5°C (-70°F, start of tropopause); 20 km: -56.5°C (remains constant). These values are based on ICAO Standard Atmosphere and may vary with weather conditions."
          }
        ]}
      />

      <SEOSection title="Related Calculators and Resources">
        <p>
          Our suite of physics calculators can help you with related atmospheric calculations:
        </p>
        <ul>
          <li>Air Density Calculator - Calculate air density at different altitudes and temperatures</li>
          <li>Atmospheric Pressure Calculator - Calculate pressure changes with altitude</li>
          <li>Dew Point Calculator - Determine moisture content and condensation levels</li>
          <li>Relative Humidity Calculator - Calculate humidity at different temperatures</li>
        </ul>
      </SEOSection>

      <SEOSection title="Why Choose Our Temperature at Altitude Calculator?">
        <p>
          Our free online calculator provides several key advantages:
        </p>
        <ul>
          <li><strong>Two Calculation Methods:</strong> Choose between ICAO Standard Atmosphere or custom lapse rate</li>
          <li><strong>Multiple Unit Systems:</strong> Work with °C, °F, K for temperature and m, km, ft for altitude</li>
          <li><strong>ICAO Accuracy:</strong> Based on international aviation standards for reliable results</li>
          <li><strong>Instant Results:</strong> No delays or complex procedures—just enter values and calculate</li>
          <li><strong>Detailed Explanations:</strong> Understand the formulas and methodology behind every calculation</li>
          <li><strong>Educational Value:</strong> Learn about atmospheric physics and temperature relationships</li>
          <li><strong>Always Free:</strong> No registration, subscriptions, or hidden fees</li>
          <li><strong>Mobile-Friendly:</strong> Use on any device with a web browser</li>
        </ul>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
