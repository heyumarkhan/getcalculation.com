import RelativeHumidityCalculator from '../../../_components/calculators/RelativeHumidityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function RelativeHumidityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Relative Humidity Calculator: Calculate RH from Temperature & Dew Point"
      description="Calculate relative humidity, dry bulb temperature, or dew point temperature using psychrometric formulas. Free online thermodynamics calculator for HVAC, meteorology, and environmental analysis."
      calculator={<RelativeHumidityCalculator />}
      slug="physics/relative-humidity-calculator"
      category="Thermodynamics"
      features={[
        "Calculate relative humidity, dry bulb, or dew point",
        "Instant psychrometric calculations",
        "Support for Celsius, Fahrenheit, and Kelvin",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Relative Humidity: Essential for Climate and Comfort">
        <p>
          Relative humidity is one of the most important concepts in thermodynamics, meteorology, and environmental science. It describes the amount of water vapor present in air relative to the maximum amount the air can hold at that temperature. Whether you&apos;re working in HVAC, studying weather patterns, or analyzing environmental conditions, understanding relative humidity is essential. Our Relative Humidity Calculator makes it easy to calculate relative humidity, dry bulb temperature, or dew point temperature using established psychrometric formulas.
        </p>
        <p>
          Relative humidity (RH) is expressed as a percentage, ranging from 0% (completely dry air) to 100% (saturated air, where condensation occurs). It&apos;s a crucial parameter for understanding comfort levels, predicting weather, designing HVAC systems, and analyzing air quality. The relationship between temperature, dew point, and relative humidity is fundamental to psychrometrics - the study of air and water vapor mixtures.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Relative Humidity Calculator">
        <p>
          Our Relative Humidity Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (dry bulb temperature, dew point temperature, or relative humidity)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Temperature Unit:</strong> Choose your preferred temperature unit (°C, °F, or K)</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value using psychrometric formulas</li>
        </ol>
        <p>
          The calculator uses the Magnus formula to calculate saturation vapor pressure and relative humidity:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-sm font-bold">RH = (e/es) × 100%</p>
          <p className="text-xs text-gray-600 mt-2">Where: e = actual vapor pressure, es = saturation vapor pressure</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Relative Humidity and Psychrometrics">
        <p>
          Relative humidity is calculated using vapor pressure relationships:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">RH = (e/es) × 100%</p>
          <p className="text-sm text-gray-600 mt-2">Where: RH = relative humidity, e = actual vapor pressure, es = saturation vapor pressure</p>
        </div>
        
        <h3>What is Relative Humidity?</h3>
        <p>
          Relative humidity (RH) is the ratio of the actual amount of water vapor in the air to the maximum amount the air can hold at that temperature, expressed as a percentage:
        </p>
        <SEOList items={[
          "0% RH: Completely dry air with no water vapor",
          "50% RH: Air contains half the maximum water vapor it can hold",
          "100% RH: Saturated air - any additional moisture will condense",
          "Above 100%: Supersaturated (rare, unstable condition)"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Dry Bulb Temperature:</strong> The actual air temperature measured by a standard thermometer, measured in °C, °F, or K</li>
          <li><strong>Dew Point Temperature:</strong> The temperature at which air becomes saturated and condensation begins, measured in °C, °F, or K</li>
          <li><strong>Relative Humidity (RH):</strong> The percentage of water vapor in air relative to saturation, always expressed as %</li>
          <li><strong>Vapor Pressure:</strong> The partial pressure exerted by water vapor in the air</li>
          <li><strong>Saturation Vapor Pressure:</strong> The maximum vapor pressure at a given temperature</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Relative humidity calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "HVAC Systems: Designing heating, ventilation, and air conditioning for comfort and efficiency",
          "Meteorology: Weather forecasting, climate analysis, and atmospheric studies",
          "Indoor Air Quality: Maintaining healthy humidity levels in buildings",
          "Agriculture: Crop management, greenhouse climate control, and storage conditions",
          "Industrial Processes: Manufacturing, food processing, and material storage",
          "Medical: Hospital climate control and infection prevention",
          "Museums & Archives: Preserving artifacts and documents",
          "Data Centers: Preventing equipment damage from condensation",
          "Construction: Concrete curing, paint application, and material handling"
        ]} />
      </SEOSection>

      <SEOSection title="Temperature Units and Measurements">
        <p>
          Our calculator supports multiple temperature units and automatically converts between them:
        </p>
        
        <h3>Temperature Units</h3>
        <ul>
          <li><strong>Celsius (°C):</strong> Most common for scientific and international use</li>
          <li><strong>Fahrenheit (°F):</strong> Common in the United States for weather and HVAC</li>
          <li><strong>Kelvin (K):</strong> Absolute temperature scale used in scientific calculations</li>
        </ul>
        <p><strong>Conversions:</strong></p>
        <ul>
          <li>°F = (°C × 9/5) + 32</li>
          <li>°C = (°F - 32) × 5/9</li>
          <li>K = °C + 273.15</li>
        </ul>

        <h3>Relative Humidity</h3>
        <p>
          Relative humidity is always expressed as a percentage (%), ranging from 0% to 100%. It&apos;s a dimensionless ratio, so it doesn&apos;t require unit conversion.
        </p>

        <p>
          <strong>Tip:</strong> The calculator automatically handles temperature unit conversions, so you can input temperatures in any unit and get consistent results. All internal calculations use Celsius, then convert to your preferred unit for display.
        </p>
      </SEOSection>

      <SEOSection title="Common Relative Humidity Calculations">
        <h3>Example 1: Calculating Relative Humidity</h3>
        <p>The dry bulb temperature is 25°C and the dew point is 15°C. What is the relative humidity?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Using psychrometric formulas: RH ≈ 58%</p>
          <p className="text-sm text-gray-600 mt-1">This is a comfortable humidity level for most indoor environments</p>
        </div>

        <h3>Example 2: Calculating Dew Point</h3>
        <p>The dry bulb temperature is 20°C and relative humidity is 60%. What is the dew point?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Dew Point ≈ 12°C</p>
          <p className="text-sm text-gray-600 mt-1">If the temperature drops to 12°C, condensation will begin to form</p>
        </div>

        <h3>Example 3: High Humidity Scenario</h3>
        <p>On a hot day, the temperature is 30°C and the dew point is 28°C. What is the relative humidity?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">RH ≈ 89%</p>
          <p className="text-sm text-gray-600 mt-1">This is very high humidity - the air feels muggy and uncomfortable</p>
        </div>

        <h3>Example 4: Low Humidity Scenario</h3>
        <p>In winter, indoor temperature is 22°C and relative humidity is 30%. What is the dew point?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Dew Point ≈ 4°C</p>
          <p className="text-sm text-gray-600 mt-1">Low humidity can cause dry skin and respiratory discomfort</p>
        </div>

        <h3>Example 5: Using Fahrenheit</h3>
        <p>The temperature is 75°F and the dew point is 65°F. What is the relative humidity?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">RH ≈ 72%</p>
          <p className="text-sm text-gray-600 mt-1">The calculator automatically converts Fahrenheit to Celsius for calculations</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding the Relationship Between Temperature and Humidity">
        <p>
          The relationship between temperature, dew point, and relative humidity is fundamental:
        </p>
        <ul>
          <li><strong>Temperature Increase:</strong> Warmer air can hold more water vapor, so relative humidity decreases if moisture content stays constant</li>
          <li><strong>Temperature Decrease:</strong> Cooler air holds less water vapor, so relative humidity increases as temperature drops</li>
          <li><strong>Dew Point:</strong> When temperature equals dew point, relative humidity is 100% and condensation occurs</li>
          <li><strong>Constant Dew Point:</strong> If dew point stays constant, relative humidity increases as temperature decreases</li>
        </ul>
        <p>
          This is why relative humidity is often higher in the morning (cooler temperatures) and lower in the afternoon (warmer temperatures), even if the actual amount of water vapor in the air hasn&apos;t changed.
        </p>
      </SEOSection>

      <SEOSection title="Comfort and Health Implications">
        <p>
          Relative humidity significantly affects human comfort and health:
        </p>
        <ul>
          <li><strong>Optimal Range:</strong> 30-60% RH is generally considered comfortable for most people</li>
          <li><strong>Low Humidity (&lt;30%):</strong> Can cause dry skin, irritated eyes, respiratory problems, and static electricity</li>
          <li><strong>High Humidity (&gt;60%):</strong> Can feel muggy, promote mold growth, and make it harder for the body to cool through evaporation</li>
          <li><strong>Very High Humidity (&gt;80%):</strong> Can be uncomfortable and promote bacterial and fungal growth</li>
          <li><strong>100% RH:</strong> Saturated air - condensation forms on surfaces, fog appears</li>
        </ul>
        <p>
          HVAC systems are designed to maintain relative humidity within the comfort range while providing temperature control.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding relative humidity has practical applications in daily life:
        </p>
        <SEOList items={[
          "Home Comfort: Understanding why air feels different at the same temperature",
          "Weather Forecasting: Interpreting humidity in weather reports",
          "Home Maintenance: Preventing mold, condensation, and damage",
          "Health: Understanding why low humidity causes dry skin in winter",
          "Cooking: Understanding how humidity affects baking and food storage",
          "Gardening: Managing greenhouse or indoor plant environments",
          "Energy Efficiency: Optimizing HVAC system operation"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between dry bulb temperature, dew point, and relative humidity?",
            answer: "Relative humidity (RH) is calculated from the ratio of actual vapor pressure (determined by dew point) to saturation vapor pressure (determined by dry bulb temperature): RH = (e/es) × 100%. When dry bulb and dew point are equal, RH = 100% and condensation occurs. The larger the difference between dry bulb and dew point, the lower the relative humidity."
          },
          {
            question: "What is a comfortable relative humidity level?",
            answer: "For most people, relative humidity between 30-60% is comfortable. Below 30% can feel dry and cause irritation, while above 60% can feel muggy and promote mold growth. The ideal range depends on temperature, activity level, and personal preference. HVAC systems typically aim for 40-50% RH."
          },
          {
            question: "Can relative humidity be above 100%?",
            answer: "Relative humidity above 100% is called supersaturation and is rare and unstable. In normal conditions, RH cannot exceed 100% - any excess moisture condenses as dew, fog, or precipitation. When RH reaches 100%, the air is saturated and the temperature equals the dew point."
          },
          {
            question: "Why does relative humidity change throughout the day?",
            answer: "Relative humidity changes because it's temperature-dependent. Even if the actual amount of water vapor stays constant, RH increases as temperature decreases (air can hold less moisture) and decreases as temperature increases (air can hold more moisture). This is why RH is often highest in the early morning (coolest) and lowest in the afternoon (warmest)."
          },
          {
            question: "What's the difference between relative humidity and absolute humidity?",
            answer: "Relative humidity (RH) is the percentage of water vapor relative to the maximum the air can hold at that temperature. Absolute humidity is the actual mass of water vapor per unit volume of air (g/m³). RH changes with temperature, while absolute humidity represents the actual moisture content regardless of temperature."
          },
          {
            question: "How is relative humidity measured?",
            answer: "Relative humidity is measured using hygrometers or psychrometers. Common types include: (1) Psychrometers (wet-bulb/dry-bulb thermometers), (2) Electronic hygrometers using capacitive or resistive sensors, (3) Hair hygrometers using the expansion/contraction of human hair. Modern digital hygrometers are most common for home use."
          },
          {
            question: "What happens when relative humidity reaches 100%?",
            answer: "At 100% RH, the air is saturated with water vapor. The dry bulb temperature equals the dew point temperature. Any additional moisture or further cooling causes condensation - water vapor turns into liquid water, forming dew, fog, or precipitation. This is why you see condensation on cold surfaces when humidity is high."
          },
          {
            question: "How does relative humidity affect HVAC systems?",
            answer: "HVAC systems control both temperature and humidity. High humidity makes cooling less efficient (evaporative cooling is reduced) and can cause condensation problems. Low humidity requires humidification. Modern systems use dehumidification during cooling and humidification during heating to maintain optimal 40-50% RH for comfort and health."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding relative humidity and the relationships between temperature, dew point, and vapor pressure is fundamental to thermodynamics, meteorology, and environmental control. Our Relative Humidity Calculator simplifies these calculations, making it easy to solve problems involving air moisture, comfort analysis, and HVAC design.
        </p>
        <p>
          Whether you&apos;re analyzing weather conditions, designing HVAC systems, or understanding indoor air quality, this calculator provides accurate results with support for multiple temperature units. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('wet-bulb-calculator')} for related psychrometric calculations, or use our {createInternalLink('specific-heat-calculator')} for thermal energy calculations that complement humidity analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

