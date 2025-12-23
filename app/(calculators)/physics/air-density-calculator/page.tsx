import AirDensityCalculator from '../../../_components/calculators/AirDensityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function AirDensityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Air Density Calculator: Calculate Density, Pressure & Temperature Instantly"
      description="Calculate air density, pressure, or temperature using the ideal gas law ρ = P/(R×T). Free online thermodynamics calculator for aviation, meteorology, HVAC, and engineering with multiple unit support."
      calculator={<AirDensityCalculator />}
      slug="physics/air-density-calculator"
      category="Thermodynamics"
      features={[
        "Calculate air density from temperature and pressure",
        "Calculate pressure from density and temperature",
        "Calculate temperature from density and pressure",
        "Multiple unit support (kg/m³, lb/ft³, Pa, hPa, atm, psi, °C, °F, K)",
        "Uses ideal gas law for accurate calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Air Density: Essential for Aviation, Meteorology, and Engineering">
        <p>
          Air density is one of the most important properties in fluid mechanics, aerodynamics, meteorology, and engineering. It describes how much mass of air occupies a given volume and varies significantly with temperature, pressure, and altitude. Whether you&apos;re calculating aircraft performance, analyzing weather patterns, designing HVAC systems, or understanding atmospheric properties, knowing how to calculate air density is essential. Our Air Density Calculator makes it easy to calculate air density, pressure, or temperature using the ideal gas law: <strong>ρ = P / (R × T)</strong>, where ρ is density, P is pressure, R is the gas constant (287.05 J/(kg·K) for dry air), and T is temperature.
        </p>
        <p>
          Air density directly affects aircraft lift, engine performance, weather patterns, and countless engineering applications. As temperature increases, air expands and becomes less dense. As pressure increases, air becomes more dense. Understanding these relationships is crucial for aviation safety, weather prediction, and efficient system design.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Air Density Calculator">
        <p>
          Our Air Density Calculator offers three calculation modes. Follow these steps:
        </p>
        
        <h3>Mode 1: Calculate Air Density</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Air Density&quot; from the dropdown</li>
          <li><strong>Enter Temperature:</strong> Input the air temperature in your preferred unit (°C, °F, or K)</li>
          <li><strong>Enter Pressure:</strong> Input the atmospheric pressure in your preferred unit (hPa, Pa, atm, psi, etc.)</li>
          <li><strong>Select Units:</strong> Choose output density unit (kg/m³, lb/ft³, etc.)</li>
          <li><strong>Click Calculate:</strong> The calculator shows the air density using the ideal gas law</li>
        </ol>

        <h3>Mode 2: Calculate Pressure</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Pressure&quot; from the dropdown</li>
          <li><strong>Enter Temperature:</strong> Input the air temperature</li>
          <li><strong>Enter Air Density:</strong> Input the known air density</li>
          <li><strong>Click Calculate:</strong> The calculator shows the pressure required for that density at that temperature</li>
        </ol>

        <h3>Mode 3: Calculate Temperature</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Temperature&quot; from the dropdown</li>
          <li><strong>Enter Pressure:</strong> Input the atmospheric pressure</li>
          <li><strong>Enter Air Density:</strong> Input the known air density</li>
          <li><strong>Click Calculate:</strong> The calculator shows the temperature required for that density at that pressure</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding the Air Density Formula">
        <p>
          Air density is calculated using the ideal gas law, which relates density, pressure, and temperature:
        </p>

        <h3>Ideal Gas Law for Air Density</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">ρ = P / (R × T)</p>
          <p className="text-sm text-gray-600 mt-2">Where: ρ = density (kg/m³), P = pressure (Pa), R = 287.05 J/(kg·K), T = temperature (K)</p>
        </div>
        <p>
          This formula is derived from the ideal gas law: PV = nRT, rearranged for density. For dry air, the specific gas constant R = 287.05 J/(kg·K) is used. The formula assumes dry air conditions and ideal gas behavior, which is accurate for most practical applications.
        </p>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Air Density (ρ):</strong> Mass of air per unit volume, typically measured in kg/m³ or lb/ft³. At sea level standard conditions (15°C, 1013.25 hPa), air density is approximately 1.225 kg/m³.</li>
          <li><strong>Pressure (P):</strong> Atmospheric pressure, measured in Pascals (Pa), hectopascals (hPa), atmospheres (atm), or psi. Standard atmospheric pressure at sea level is 101,325 Pa = 1013.25 hPa = 1 atm.</li>
          <li><strong>Temperature (T):</strong> Air temperature in Kelvin. Must use absolute temperature (Kelvin) in the formula. Standard temperature is 15°C = 288.15 K.</li>
          <li><strong>Gas Constant (R):</strong> Specific gas constant for dry air = 287.05 J/(kg·K). This constant relates pressure, density, and temperature for air.</li>
        </ul>

        <h3>Standard Conditions</h3>
        <p>
          Standard atmospheric conditions at sea level:
        </p>
        <ul>
          <li><strong>Temperature:</strong> 15°C (59°F) = 288.15 K</li>
          <li><strong>Pressure:</strong> 101,325 Pa = 1013.25 hPa = 1 atm</li>
          <li><strong>Density:</strong> 1.225 kg/m³ (0.0765 lb/ft³)</li>
        </ul>
        <p>
          These standard conditions are commonly used as reference points in aviation, meteorology, and engineering calculations.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Air density calculations are essential in numerous real-world applications:
        </p>
        <SEOList items={[
          "Aviation: Calculating aircraft performance, lift, engine power output, and takeoff distances at different altitudes and temperatures",
          "Meteorology: Understanding weather patterns, atmospheric stability, and air mass characteristics",
          "HVAC Systems: Designing ventilation, air conditioning, and heating systems with proper air flow calculations",
          "Automotive Engineering: Analyzing engine performance, air intake, and aerodynamic drag at different conditions",
          "Sports: Understanding how altitude and temperature affect ball trajectory in sports like baseball, golf, and football",
          "Industrial Processes: Optimizing combustion, air handling, and process control systems",
          "Wind Energy: Calculating power output from wind turbines based on air density",
          "Aerodynamics: Designing vehicles, aircraft, and structures with proper air resistance calculations",
          "Weather Balloons: Understanding how air density changes with altitude for atmospheric research",
          "Environmental Engineering: Analyzing air quality, dispersion modeling, and pollution control"
        ]} />
      </SEOSection>

      <SEOSection title="Common Air Density Calculations">
        <h3>Example 1: Standard Sea Level Conditions</h3>
        <p>Calculate air density at standard sea level conditions (15°C, 1013.25 hPa).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 15°C = 288.15 K, P = 1013.25 hPa = 101,325 Pa</p>
          <p className="font-mono">ρ = P / (R × T) = 101,325 / (287.05 × 288.15) = 1.225 kg/m³</p>
          <p className="text-sm text-gray-600 mt-1">Result: Standard air density at sea level is 1.225 kg/m³</p>
        </div>

        <h3>Example 2: High Altitude (10,000 ft)</h3>
        <p>Calculate air density at 10,000 feet altitude where temperature is 5°C and pressure is 696 hPa.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 5°C = 278.15 K, P = 696 hPa = 69,600 Pa</p>
          <p className="font-mono">ρ = 69,600 / (287.05 × 278.15) = 0.872 kg/m³</p>
          <p className="text-sm text-gray-600 mt-1">Result: Air density at 10,000 ft is 0.872 kg/m³ (about 71% of sea level density)</p>
        </div>

        <h3>Example 3: Hot Summer Day</h3>
        <p>Calculate air density on a hot summer day at sea level: 35°C temperature, 1013.25 hPa pressure.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">T = 35°C = 308.15 K, P = 101,325 Pa</p>
          <p className="font-mono">ρ = 101,325 / (287.05 × 308.15) = 1.146 kg/m³</p>
          <p className="text-sm text-gray-600 mt-1">Result: Hot air is less dense (1.146 kg/m³) than standard air (1.225 kg/m³), affecting aircraft performance</p>
        </div>

        <h3>Example 4: Calculating Pressure from Density</h3>
        <p>What pressure is needed for air density of 1.0 kg/m³ at 20°C?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ = 1.0 kg/m³, T = 20°C = 293.15 K</p>
          <p className="font-mono">P = ρ × R × T = 1.0 × 287.05 × 293.15 = 84,143 Pa = 841.43 hPa</p>
          <p className="text-sm text-gray-600 mt-1">Result: Pressure of 841.43 hPa is needed, which corresponds to an altitude of about 1,500 meters</p>
        </div>

        <h3>Example 5: Calculating Temperature from Density</h3>
        <p>What temperature produces air density of 1.15 kg/m³ at sea level pressure (1013.25 hPa)?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ = 1.15 kg/m³, P = 101,325 Pa</p>
          <p className="font-mono">T = P / (ρ × R) = 101,325 / (1.15 × 287.05) = 306.6 K = 33.5°C</p>
          <p className="text-sm text-gray-600 mt-1">Result: Temperature of 33.5°C produces this density at sea level pressure</p>
        </div>
      </SEOSection>

      <SEOSection title="Factors Affecting Air Density">
        <p>
          Several factors influence air density in real-world conditions:
        </p>
        <ul>
          <li><strong>Temperature:</strong> Higher temperature decreases density (hot air expands). Air density decreases approximately 1% per 3°C (5.4°F) increase at constant pressure.</li>
          <li><strong>Pressure:</strong> Higher pressure increases density (more air molecules in same volume). Pressure decreases with altitude, causing density to decrease.</li>
          <li><strong>Altitude:</strong> As altitude increases, both pressure and temperature typically decrease, causing density to decrease significantly. Density at 10,000 ft is about 70% of sea level density.</li>
          <li><strong>Humidity:</strong> Water vapor is less dense than dry air, so humid air is slightly less dense than dry air at the same temperature and pressure. Our calculator assumes dry air conditions.</li>
          <li><strong>Composition:</strong> The ideal gas law assumes dry air. Polluted air or air with different gas composition may have slightly different properties.</li>
        </ul>
        <p>
          For most practical applications, temperature and pressure are the dominant factors, which is why our calculator focuses on these variables.
        </p>
      </SEOSection>

      <SEOSection title="Air Density vs. Altitude">
        <p>
          Air density decreases significantly with altitude due to decreasing pressure and temperature:
        </p>
        <ul>
          <li><strong>Sea Level:</strong> ~1.225 kg/m³ (standard conditions)</li>
          <li><strong>1,000 m (3,281 ft):</strong> ~1.112 kg/m³ (about 91% of sea level)</li>
          <li><strong>2,000 m (6,562 ft):</strong> ~1.007 kg/m³ (about 82% of sea level)</li>
          <li><strong>5,000 m (16,404 ft):</strong> ~0.736 kg/m³ (about 60% of sea level)</li>
          <li><strong>10,000 m (32,808 ft):</strong> ~0.413 kg/m³ (about 34% of sea level)</li>
        </ul>
        <p>
          This altitude-dependent density is why aircraft require longer takeoff distances at high-altitude airports and why engines produce less power at altitude.
        </p>
      </SEOSection>

      <SEOSection title="Temperature Effects on Air Density">
        <p>
          Temperature has a significant effect on air density at constant pressure:
        </p>
        <ul>
          <li><strong>-20°C (-4°F):</strong> ρ ≈ 1.395 kg/m³ (cold, dense air)</li>
          <li><strong>0°C (32°F):</strong> ρ ≈ 1.292 kg/m³</li>
          <li><strong>15°C (59°F):</strong> ρ ≈ 1.225 kg/m³ (standard)</li>
          <li><strong>30°C (86°F):</strong> ρ ≈ 1.164 kg/m³</li>
          <li><strong>40°C (104°F):</strong> ρ ≈ 1.127 kg/m³ (hot, less dense air)</li>
        </ul>
        <p>
          This temperature effect explains why aircraft perform better in cold weather (higher density = more lift) and why hot summer days can cause performance issues, especially at high-altitude airports.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is air density and why is it important?",
            answer: "Air density is the mass of air per unit volume, typically measured in kg/m³. It's important because it directly affects aircraft performance, engine power, weather patterns, and many engineering applications. Higher density means more air molecules in a given volume, which affects lift, drag, and combustion processes."
          },
          {
            question: "How do temperature and pressure affect air density?",
            answer: "At constant pressure, higher temperature decreases density (hot air expands). At constant temperature, higher pressure increases density (more molecules in same volume). The relationship is given by ρ = P/(R×T), where density is inversely proportional to temperature and directly proportional to pressure."
          },
          {
            question: "What is the standard air density at sea level?",
            answer: "Standard air density at sea level under standard conditions (15°C, 1013.25 hPa) is 1.225 kg/m³ (0.0765 lb/ft³). This is the reference density used in many aviation and engineering calculations."
          },
          {
            question: "How does altitude affect air density?",
            answer: "Air density decreases with altitude because both pressure and temperature typically decrease. At 10,000 feet, air density is about 70% of sea level density. This density reduction affects aircraft performance, engine power, and requires longer takeoff distances at high-altitude airports."
          },
          {
            question: "Why does the calculator use the ideal gas law?",
            answer: "The ideal gas law (ρ = P/(R×T)) provides accurate results for dry air under most conditions. It assumes air behaves as an ideal gas, which is valid for the temperature and pressure ranges typically encountered in aviation, meteorology, and engineering applications."
          },
          {
            question: "Does humidity affect air density?",
            answer: "Yes, humidity slightly affects air density. Water vapor is less dense than dry air, so humid air is slightly less dense than dry air at the same temperature and pressure. Our calculator assumes dry air conditions for simplicity, which is accurate for most applications. For precise calculations with humidity, more complex formulas are needed."
          },
          {
            question: "Why is air density important in aviation?",
            answer: "Air density directly affects aircraft performance. Higher density provides more lift (for wings) and more thrust (for propellers and jet engines). Aircraft require longer takeoff distances and have reduced performance at high altitudes or high temperatures where air density is lower. Density altitude is a critical parameter in flight planning."
          },
          {
            question: "How accurate is the air density calculation?",
            answer: "The ideal gas law calculation is very accurate for dry air under normal conditions. For most practical applications (aviation, HVAC, meteorology), the accuracy is within 1-2%. For extremely precise applications or when humidity effects are significant, more sophisticated models that account for humidity and non-ideal gas behavior may be needed."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding air density and the relationship ρ = P/(R×T) is fundamental to aviation, meteorology, HVAC engineering, and many other fields. Our Air Density Calculator simplifies these calculations, making it easy to determine air density, pressure, or temperature with support for multiple unit systems.
        </p>
        <p>
          Whether you&apos;re calculating aircraft performance, analyzing weather conditions, designing HVAC systems, or solving engineering problems, accurate air density calculations are essential. Ready to explore more thermodynamics concepts? Check out our other calculators like the {createInternalLink('relative-humidity-calculator', 'Relative Humidity Calculator')} for humidity calculations, the {createInternalLink('ideal-gas-law-calculator', 'Ideal Gas Law Calculator')} for more complex gas calculations, or the {createInternalLink('temperature', 'Temperature Converter')} for temperature conversions that often complement air density analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

