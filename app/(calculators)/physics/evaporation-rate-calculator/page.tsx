import EvaporationRateCalculator from '../../../_components/calculators/EvaporationRateCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function EvaporationRateCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Evaporation Rate Calculator: Calculate Water Evaporation Rate"
      description="Calculate evaporation rate from mass, volume, or area and time. Free online thermodynamics calculator for water evaporation, pool maintenance, HVAC, and environmental analysis."
      calculator={<EvaporationRateCalculator />}
      slug="physics/evaporation-rate-calculator"
      category="Thermodynamics"
      features={[
        "Calculate evaporation rate from mass and time",
        "Calculate evaporation rate from volume and time",
        "Calculate area-specific evaporation rate",
        "Multiple unit support (kg/h, L/h, g/s, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Evaporation Rate: Essential for Water Management and HVAC">
        <p>
          Evaporation rate is a critical parameter in thermodynamics, environmental science, and water management. It measures how quickly a liquid (typically water) transforms into vapor, which is essential for understanding water loss, pool maintenance, HVAC systems, and environmental processes. Our Evaporation Rate Calculator makes it easy to calculate evaporation rates from mass, volume, or area and time using fundamental thermodynamic principles.
        </p>
        <p>
          Evaporation occurs when molecules at the surface of a liquid gain enough energy to escape into the gas phase. The rate of evaporation depends on several factors including temperature, humidity, air movement, surface area, and the properties of the liquid. Understanding evaporation rates is crucial for water conservation, pool and spa management, industrial processes, and climate analysis.
        </p>
        <p>
          Our calculator supports three calculation modes: mass-time mode for basic evaporation rate calculations, volume-time mode for liquid volume measurements, and area-specific mode for determining evaporation rates per unit area, which is essential for large-scale applications like reservoirs, pools, and industrial processes.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Evaporation Rate Calculator">
        <p>
          Our Evaporation Rate Calculator offers three calculation modes for maximum flexibility. Follow these steps:
        </p>
        
        <h3>Mass & Time Mode</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Mass & Time&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (evaporation rate, mass evaporated, or time period)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>

        <h3>Volume & Time Mode</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Volume & Time&quot; from the dropdown</li>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (evaporation rate, volume evaporated, or time period)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Note:</strong> This mode assumes water density of 1 kg/L</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>

        <h3>Area-Specific Mode</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Area-Specific&quot; from the dropdown</li>
          <li><strong>Enter Three Values:</strong> Input any three of the four values (evaporation rate, mass evaporated, surface area, or time period)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding Evaporation Rate Formulas">
        <p>
          Evaporation rate can be calculated using several formulas depending on the available data:
        </p>
        
        <h3>Basic Evaporation Rate (Mass & Time)</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Evaporation Rate = Mass / Time</p>
          <p className="text-sm text-gray-600 mt-2">Where: Rate is in kg/s, kg/h, etc., Mass in kg, g, etc., Time in s, h, etc.</p>
        </div>

        <h3>Volume-Based Evaporation Rate</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Evaporation Rate = Volume / Time</p>
          <p className="text-sm text-gray-600 mt-2">Where: Assumes water density = 1 kg/L. Volume in L, mL, etc., Time in s, h, etc.</p>
        </div>

        <h3>Area-Specific Evaporation Rate</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Evaporation Rate = Mass / (Area × Time)</p>
          <p className="text-sm text-gray-600 mt-2">Where: Rate per unit area, Area in m², cm², etc.</p>
        </div>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Evaporation Rate:</strong> The mass or volume of liquid that evaporates per unit time, measured in kg/h, L/h, g/s, etc.</li>
          <li><strong>Mass Evaporated:</strong> The total mass of liquid that has evaporated, measured in kg, g, etc.</li>
          <li><strong>Volume Evaporated:</strong> The total volume of liquid that has evaporated, measured in L, mL, etc.</li>
          <li><strong>Time Period:</strong> The duration over which evaporation occurs, measured in s, min, h, day, etc.</li>
          <li><strong>Surface Area:</strong> The area of the liquid surface exposed to air, measured in m², cm², etc.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Evaporation rate calculations are essential in numerous fields and applications:
        </p>
        <SEOList items={[
          "Pool and Spa Management: Calculating water loss and refill requirements",
          "HVAC Systems: Understanding humidification and dehumidification processes",
          "Water Conservation: Estimating water loss from reservoirs, lakes, and ponds",
          "Industrial Processes: Controlling evaporation in manufacturing and chemical processes",
          "Agriculture: Managing irrigation and water resources",
          "Environmental Science: Studying water cycles and climate patterns",
          "Cooling Systems: Designing evaporative cooling systems",
          "Food Processing: Controlling moisture loss in food preservation",
          "Meteorology: Understanding atmospheric water vapor and precipitation",
          "Swimming Pool Maintenance: Determining water replacement needs"
        ]} />
      </SEOSection>

      <SEOSection title="Factors Affecting Evaporation Rate">
        <p>
          Several factors influence the rate of evaporation:
        </p>
        <SEOList items={[
          "Temperature: Higher temperatures increase molecular energy and evaporation rate",
          "Humidity: Lower relative humidity increases evaporation rate",
          "Air Movement: Wind or air circulation increases evaporation by removing saturated air",
          "Surface Area: Larger surface areas increase total evaporation",
          "Liquid Properties: Different liquids have different evaporation rates (volatility)",
          "Atmospheric Pressure: Lower pressure can increase evaporation rate",
          "Surface Conditions: Rough surfaces may increase evaporation area"
        ]} />
        <p>
          <strong>Note:</strong> Our calculator provides basic evaporation rate calculations. For precise predictions, additional factors like temperature, humidity, and wind speed should be considered using more complex models.
        </p>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports various units for all measurements:
        </p>
        
        <h3>Evaporation Rate Units:</h3>
        <ul>
          <li><strong>Mass-based:</strong> kg/s, kg/min, kg/h, kg/day, g/s, g/min, g/h</li>
          <li><strong>Volume-based:</strong> L/s, L/min, L/h, mL/s, mL/min, gal/h</li>
        </ul>

        <h3>Mass Units:</h3>
        <ul>
          <li>kg (kilograms), g (grams), mg (milligrams), lb (pounds), oz (ounces)</li>
        </ul>

        <h3>Volume Units:</h3>
        <ul>
          <li>L (liters), mL (milliliters), m³ (cubic meters), cm³ (cubic centimeters), gal (US gallons), ft³ (cubic feet)</li>
        </ul>

        <h3>Time Units:</h3>
        <ul>
          <li>s (seconds), min (minutes), h (hours), day (days), ms (milliseconds)</li>
        </ul>

        <h3>Area Units:</h3>
        <ul>
          <li>m² (square meters), cm² (square centimeters), mm² (square millimeters), ft² (square feet), in² (square inches)</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles unit conversions, so you can mix different unit systems. For example, you can input mass in kg, time in hours, and get evaporation rate in kg/h.
        </p>
      </SEOSection>

      <SEOSection title="Common Evaporation Rate Calculations">
        <h3>Example 1: Pool Water Loss</h3>
        <p>A swimming pool loses 50 kg of water over 24 hours. What is the evaporation rate?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Evaporation Rate = Mass / Time</p>
          <p className="font-mono">Rate = 50 kg / 24 h = 2.08 kg/h</p>
          <p className="text-sm text-gray-600 mt-1">This is a typical evaporation rate for a pool on a warm, dry day</p>
        </div>

        <h3>Example 2: Volume-Based Calculation</h3>
        <p>A container loses 10 liters of water in 5 hours. What is the evaporation rate?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Evaporation Rate = Volume / Time</p>
          <p className="font-mono">Rate = 10 L / 5 h = 2 L/h</p>
          <p className="text-sm text-gray-600 mt-1">Assuming water density = 1 kg/L, this equals 2 kg/h</p>
        </div>

        <h3>Example 3: Area-Specific Evaporation</h3>
        <p>A 100 m² pond loses 500 kg of water in 10 hours. What is the area-specific evaporation rate?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Evaporation Rate = Mass / (Area × Time)</p>
          <p className="font-mono">Rate = 500 kg / (100 m² × 10 h) = 0.5 kg/(m²·h)</p>
          <p className="text-sm text-gray-600 mt-1">This gives the evaporation rate per square meter per hour</p>
        </div>

        <h3>Example 4: Time to Evaporate</h3>
        <p>How long will it take to evaporate 1 kg of water at a rate of 0.1 kg/h?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Time = Mass / Evaporation Rate</p>
          <p className="font-mono">Time = 1 kg / 0.1 kg/h = 10 hours</p>
        </div>

        <h3>Example 5: Mass Evaporated</h3>
        <p>How much water evaporates in 8 hours at a rate of 1.5 kg/h?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Mass = Evaporation Rate × Time</p>
          <p className="font-mono">Mass = 1.5 kg/h × 8 h = 12 kg</p>
        </div>
      </SEOSection>

      <SEOSection title="Evaporation in Different Environments">
        <p>
          Evaporation rates vary significantly depending on environmental conditions:
        </p>
        <ul>
          <li><strong>Indoor Pools:</strong> Typically 0.5-2 kg/(m²·day) depending on air temperature and humidity</li>
          <li><strong>Outdoor Pools:</strong> Can range from 2-10 kg/(m²·day) depending on weather conditions</li>
          <li><strong>Reservoirs:</strong> Varies from 1-8 mm/day depending on climate, wind, and temperature</li>
          <li><strong>Small Containers:</strong> Can be much higher due to increased surface-to-volume ratio</li>
          <li><strong>Industrial Processes:</strong> Varies widely based on process conditions and liquid properties</li>
        </ul>
        <p>
          <strong>Important:</strong> Actual evaporation rates depend on many factors including temperature, humidity, wind speed, and solar radiation. Our calculator provides basic calculations based on measured mass/volume changes. For predictive calculations, use specialized models that account for all environmental factors.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding evaporation rates has practical applications:
        </p>
        <SEOList items={[
          "Pool Maintenance: Calculating water replacement needs and costs",
          "Water Conservation: Estimating water loss from open containers",
          "HVAC Design: Sizing humidification and dehumidification systems",
          "Gardening: Understanding water loss from plant containers",
          "Home Maintenance: Calculating water loss from fountains and water features",
          "Industrial Planning: Estimating process water requirements",
          "Environmental Monitoring: Tracking water loss from natural water bodies"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is evaporation rate?",
            answer: "Evaporation rate is the amount of liquid (mass or volume) that evaporates per unit time. It's typically measured in kg/h, L/h, or g/s. For area-specific applications, it's measured as mass per unit area per unit time, such as kg/(m²·h)."
          },
          {
            question: "How do you calculate evaporation rate?",
            answer: "Evaporation rate can be calculated as: Rate = Mass / Time, or Rate = Volume / Time (assuming water density). For area-specific rates: Rate = Mass / (Area × Time). Simply divide the amount of liquid evaporated by the time period over which it occurred."
          },
          {
            question: "What factors affect evaporation rate?",
            answer: "Key factors include temperature (higher = faster), relative humidity (lower = faster), air movement/wind (more = faster), surface area (larger = faster), and the properties of the liquid itself. Atmospheric pressure and surface conditions also play roles."
          },
          {
            question: "What is a typical pool evaporation rate?",
            answer: "Typical pool evaporation rates range from 0.5-2 kg/(m²·day) for indoor pools and 2-10 kg/(m²·day) for outdoor pools, depending on temperature, humidity, and wind conditions. A typical residential pool might lose 2-5 mm of water per day."
          },
          {
            question: "How do I reduce evaporation rate?",
            answer: "To reduce evaporation: use pool covers, reduce water temperature, increase humidity, reduce air movement over the surface, and minimize surface area. Pool covers can reduce evaporation by 90-95%."
          },
          {
            question: "What units are used for evaporation rate?",
            answer: "Common units include kg/h, kg/day, L/h, g/s for total rates, and kg/(m²·h), mm/day for area-specific rates. The choice depends on the application - pools often use kg/(m²·day), while industrial processes may use kg/h."
          },
          {
            question: "Can I calculate evaporation rate from volume measurements?",
            answer: "Yes, if you know the liquid density. For water, density is approximately 1 kg/L, so volume measurements can be directly converted to mass. Our calculator handles this conversion automatically in volume-time mode."
          },
          {
            question: "How does temperature affect evaporation rate?",
            answer: "Temperature has a significant effect - evaporation rate approximately doubles for every 10°C increase in temperature. This is because higher temperatures give molecules more kinetic energy to escape the liquid phase. The relationship follows an exponential pattern described by the Clausius-Clapeyron equation."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding evaporation rate is essential for water management, HVAC design, pool maintenance, and environmental analysis. Our Evaporation Rate Calculator simplifies these calculations, making it easy to determine evaporation rates from mass, volume, or area and time measurements.
        </p>
        <p>
          Whether you&apos;re managing a pool, designing HVAC systems, studying environmental processes, or working on industrial applications, this calculator provides accurate results with comprehensive unit support and multiple calculation modes. Ready to explore more thermodynamics concepts? Check out our other calculators like the {createInternalLink('dew-point-calculator', 'Dew Point Calculator')} for humidity calculations, the {createInternalLink('wet-bulb-calculator', 'Wet Bulb Calculator')} for psychrometric analysis, or the {createInternalLink('flow-rate-calculator', 'Flow Rate Calculator')} for fluid flow calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

