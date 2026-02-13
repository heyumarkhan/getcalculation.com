import TemperatureAtAltitudeCalculator from '../../../_components/calculators/TemperatureAtAltitudeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function TemperatureAtAltitudeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Temperature at Altitude Calculator: Atmospheric Analysis Tool"
      description="Calculate air temperature at any altitude using environmental lapse rate. Determine atmospheric conditions for aviation, weather, and environmental science. Free calculator."
      calculator={<TemperatureAtAltitudeCalculator />}
      slug="physics/temperature-at-altitude-calculator"
      category="Physics"
      features={[
        "Calculate temperature at any altitude using standard lapse rates",
        "Support for multiple altitude measurements and temperature units",
        "Accurate atmospheric modeling for aviation and meteorology",
        "Instant results with detailed calculation steps",
        "Free and no registration required"
      ]}
    >
      <SEOSection title="Understanding Temperature Variations with Altitude">
        <p>
          Temperature at altitude is a fundamental atmospheric property that changes predictably as you ascend through the Earth's atmosphere. In the troposphere, the lowest layer where weather occurs, temperature decreases at an approximately constant rate known as the environmental lapse rate. This relationship is critical for aviation operations, weather forecasting, mountain climbing safety, and understanding climate patterns. Pilots, meteorologists, and environmental scientists rely on accurate temperature-altitude calculations to make informed decisions about flight operations and weather predictions. Understanding how {createInternalLink('air-pressure-at-altitude-calculator')} relates to temperature variations helps predict atmospheric behavior across different elevation zones.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to determine atmospheric temperature at any altitude:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the sea-level temperature (typically 15°C or 59°F at standard conditions).</li>
          <li><strong>Step 2:</strong> Input the altitude in your preferred unit (meters, feet, or kilometers).</li>
          <li><strong>Step 3:</strong> Click Calculate to get the temperature at that altitude using the standard environmental lapse rate.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Temperature at Altitude Formula">
        <p>
          Temperature decreases with altitude at a predictable rate in the troposphere. The standard environmental lapse rate is approximately 6.5°C per 1,000 meters (or about 3.6°F per 1,000 feet). This linear relationship allows us to calculate temperature at any altitude if we know the sea-level temperature. The formula assumes standard atmospheric conditions and works reliably up to about 11 kilometers (36,000 feet), which covers most aviation operations and weather applications.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">T = T₀ - (L × h)</p>
          <p className="text-sm text-gray-600 mt-2">Where: T = temperature at altitude, T₀ = sea-level temperature, L = lapse rate (°C/m), h = altitude (m)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Calculate the temperature at 3,000 meters altitude when sea-level temperature is 15°C:
        </p>
        <ul>
          <li>Given: T₀ = 15°C (sea-level temperature)</li>
          <li>Given: h = 3,000 meters altitude</li>
          <li>Standard lapse rate: L = 0.0065°C/meter (6.5°C per 1,000 m)</li>
          <li>Formula: T = 15 - (0.0065 × 3,000)</li>
          <li>Calculation: T = 15 - 19.5</li>
          <li>Result: T = -4.5°C at 3,000 meters</li>
          <li>Interpretation: Temperature decreases by approximately 6.5°C for every 1,000 meters of altitude gained</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications of Temperature-Altitude Calculations">
        <p>
          Temperature at altitude calculations are essential across multiple industries and scientific fields:
        </p>
        <SEOList items={[
          "Aviation Operations: Pilots use temperature-altitude data to calculate aircraft performance, determine density altitude, and plan safe flight operations. Understanding {createInternalLink('speed-of-sound-calculator')} relationships requires knowing atmospheric temperature at cruise altitude.",
          "Weather Forecasting: Meteorologists model atmospheric stability and predict cloud formation, precipitation, and severe weather patterns using temperature gradients with altitude.",
          "Mountain Climbing and High-Altitude Safety: Climbers assess oxygen availability, hypothermia risk, and physiological effects at different elevations to plan safer expeditions.",
          "Atmospheric Science Research: Environmental scientists study climate change, ozone depletion, and atmospheric composition at various altitudes using temperature measurements.",
          "Environmental Engineering: Designing pollution dispersion models, atmospheric filtration systems, and understanding air quality variations with elevation."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "Why does temperature decrease with altitude?",
            answer: "The atmosphere is primarily heated from below by the Earth's surface absorbing solar radiation, which then radiates heat upward. The greenhouse gases (CO₂, water vapor, methane) in the lower atmosphere trap this heat. Higher altitudes have fewer gas molecules to absorb radiation, resulting in colder temperatures. This is why the lower atmosphere (troposphere) shows a consistent temperature decrease with altitude."
          },
          {
            question: "What is the standard environmental lapse rate?",
            answer: "The standard environmental lapse rate is 6.5°C per 1,000 meters (or 3.56°F per 1,000 feet) of altitude in the troposphere. This rate can vary based on humidity, time of day, and geographic location. Dry air has a slightly different lapse rate (about 9.8°C per 1,000 m) than moist air (about 6°C per 1,000 m), which is why our calculator allows customization for different conditions."
          },
          {
            question: "How high does the standard lapse rate apply?",
            answer: "The standard environmental lapse rate applies reliably up to the tropopause, which is approximately 11-12 kilometers (36,000-39,000 feet) above sea level. Above the tropopause in the stratosphere, temperature actually increases with altitude due to ozone absorption of ultraviolet radiation. Most aviation operations occur within the troposphere where this calculator is highly accurate."
          },
          {
            question: "What is density altitude and how does it relate to temperature at altitude?",
            answer: "Density altitude is the altitude at which the air has a certain density. Since density decreases with both increasing altitude and increasing temperature, warm air at high altitude creates conditions that affect aircraft performance as if the altitude were even higher. Pilots must account for temperature at altitude when calculating actual aircraft performance capabilities."
          },
          {
            question: "Can I use this calculator for the stratosphere?",
            answer: "No, this calculator is designed for the troposphere (up to about 11 km altitude) where temperature decreases with altitude. In the stratosphere above that altitude, temperature actually increases due to ozone absorption of solar radiation. For calculations above 12 km, you would need a different model that accounts for stratospheric conditions."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering temperature-altitude calculations is essential for anyone working in aviation, meteorology, environmental science, or high-altitude operations. The predictable relationship between temperature and altitude in the troposphere makes it easy to calculate atmospheric conditions at any elevation using the standard environmental lapse rate.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('air-density-calculator')} for other atmospheric property analysis and related calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
