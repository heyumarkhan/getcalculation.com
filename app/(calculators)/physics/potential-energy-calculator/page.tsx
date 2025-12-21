import PotentialEnergyCalculator from '../../../_components/calculators/PotentialEnergyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function PotentialEnergyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Potential Energy Calculator: Calculate PE = m × g × h Instantly"
      description="Calculate potential energy, mass, height, or gravitational acceleration using PE = m × g × h. Free online mechanics calculator for physics and engineering with multiple unit support."
      calculator={<PotentialEnergyCalculator />}
      slug="physics/potential-energy-calculator"
      category="Mechanics"
      features={[
        "Calculate potential energy, mass, height, or gravity",
        "PE = m × g × h formula",
        "Standard Earth gravity (9.80665 m/s²) or custom values",
        "Multiple unit support (J, cal, BTU, kg, lb, m, ft, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Potential Energy: Stored Energy in Gravitational Fields">
        <p>
          Potential energy is one of the most fundamental concepts in physics, representing the energy stored in an object due to its position in a gravitational field. Whether you&apos;re studying mechanics, engineering, or understanding how energy transforms, knowing how to calculate potential energy is essential. Our Potential Energy Calculator makes it easy to calculate potential energy, mass, height, or gravitational acceleration using the fundamental formula: <strong>PE = m × g × h</strong>.
        </p>
        <p>
          Gravitational potential energy is the energy an object possesses because of its position relative to a reference point (usually Earth&apos;s surface). When you lift an object, you&apos;re doing work against gravity, storing energy that can be released when the object falls. This stored energy increases with mass, gravitational acceleration, and height - the higher and heavier an object, the more potential energy it has.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Potential Energy Calculator">
        <p>
          Our Potential Energy Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Choose Gravity:</strong> Check the box to use standard Earth gravity (9.80665 m/s²) or uncheck to enter a custom value</li>
          <li><strong>Enter Three Values:</strong> Input any three of the four values (potential energy, mass, gravity, or height)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with automatic unit conversion</li>
        </ol>
        <p>
          The calculator uses the fundamental potential energy formula: <strong>PE = m × g × h</strong>
        </p>
        <p>
          You can rearrange this formula to solve for any variable:
        </p>
        <ul>
          <li><strong>Potential Energy:</strong> PE = m × g × h</li>
          <li><strong>Mass:</strong> m = PE / (g × h)</li>
          <li><strong>Gravitational Acceleration:</strong> g = PE / (m × h)</li>
          <li><strong>Height:</strong> h = PE / (m × g)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Understanding the Potential Energy Formula">
        <p>
          The potential energy formula is one of the most important equations in mechanics:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">PE = m × g × h</p>
          <p className="text-sm text-gray-600 mt-2">Where: PE = potential energy, m = mass, g = gravitational acceleration, h = height</p>
        </div>
        
        <h3>What is Potential Energy?</h3>
        <p>
          Potential energy is stored energy that depends on an object&apos;s position or configuration. Gravitational potential energy specifically refers to the energy stored due to an object&apos;s position in a gravitational field:
        </p>
        <SEOList items={[
          "Energy stored by position: The higher an object is above a reference point, the more potential energy it has",
          "Relative to reference point: Potential energy is always measured relative to a chosen reference point (usually ground level where h = 0)",
          "Convertible to kinetic energy: When an object falls, potential energy converts to kinetic energy",
          "Work done against gravity: The potential energy equals the work done to lift the object to that height",
          "Conservative force: Gravity is a conservative force, meaning potential energy depends only on position, not path"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Potential Energy (PE):</strong> The energy stored in an object due to its position, measured in Joules (J), calories (cal), or BTUs</li>
          <li><strong>Mass (m):</strong> The amount of matter in the object, measured in kilograms (kg) or pounds (lb)</li>
          <li><strong>Gravitational Acceleration (g):</strong> The acceleration due to gravity, typically 9.80665 m/s² on Earth, measured in m/s² or ft/s²</li>
          <li><strong>Height (h):</strong> The vertical distance above the reference point, measured in meters (m) or feet (ft)</li>
          <li><strong>Reference Point:</strong> The point where potential energy is defined as zero (usually ground level or the lowest point)</li>
        </ul>

        <h3>Why is Standard Gravity Used?</h3>
        <p>
          Standard Earth gravity (9.80665 m/s²) is the average gravitational acceleration at Earth&apos;s surface. It varies slightly by location (latitude, altitude), but for most practical calculations, this standard value provides excellent accuracy. The calculator allows you to use standard gravity or enter a custom value for calculations on other planets, moons, or specific locations.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Potential energy calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Construction: Calculating energy requirements for lifting materials, cranes, and construction equipment",
          "Engineering: Designing systems that use or store potential energy, such as water reservoirs and hydroelectric dams",
          "Sports: Understanding energy in activities like pole vaulting, high jumping, and rock climbing",
          "Physics Research: Studying energy conservation, transformations, and gravitational systems",
          "Automotive: Understanding energy in vehicles on hills, calculating braking energy",
          "Renewable Energy: Hydroelectric power generation, understanding water storage energy",
          "Aerospace: Calculating energy requirements for launching objects, understanding orbital mechanics",
          "Civil Engineering: Dam design, water management, understanding stored water energy",
          "Architecture: Understanding energy implications of building height and design",
          "Amusement Parks: Designing roller coasters and rides that convert potential to kinetic energy"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports various units for energy, mass, acceleration, and distance:
        </p>
        
        <h3>Energy Units</h3>
        <ul>
          <li><strong>Joules (J):</strong> SI unit for energy (1 J = 1 kg·m²/s²)</li>
          <li><strong>Kilojoules (kJ):</strong> 1 kJ = 1000 J - common for larger energy values</li>
          <li><strong>Calories (cal):</strong> Common unit in chemistry and nutrition (1 cal = 4.184 J)</li>
          <li><strong>Kilocalories (kcal):</strong> 1 kcal = 1000 cal - used in food energy</li>
          <li><strong>BTU:</strong> British Thermal Unit (1 BTU ≈ 1055.06 J) - used in HVAC and energy systems</li>
          <li><strong>Electron-volts (eV):</strong> Used in particle physics (1 eV ≈ 1.602 × 10⁻¹⁹ J)</li>
          <li><strong>Watt-hours (Wh):</strong> Energy unit (1 Wh = 3600 J) - common in electrical systems</li>
        </ul>

        <h3>Mass Units</h3>
        <ul>
          <li><strong>Kilograms (kg):</strong> SI base unit for mass</li>
          <li><strong>Grams (g), Milligrams (mg):</strong> Metric subunits (1 kg = 1000 g = 1,000,000 mg)</li>
          <li><strong>Pounds (lb), Ounces (oz):</strong> Imperial/US units (1 lb ≈ 0.4536 kg)</li>
          <li><strong>Tons:</strong> Metric tons (1000 kg) or US tons (907.185 kg)</li>
        </ul>

        <h3>Acceleration Units</h3>
        <ul>
          <li><strong>m/s²:</strong> Meters per second squared - SI unit</li>
          <li><strong>ft/s²:</strong> Feet per second squared - Imperial unit (1 ft/s² ≈ 0.3048 m/s²)</li>
          <li><strong>cm/s²:</strong> Centimeters per second squared (1 cm/s² = 0.01 m/s²)</li>
        </ul>

        <h3>Distance/Height Units</h3>
        <ul>
          <li><strong>Meters (m):</strong> SI base unit for distance</li>
          <li><strong>Kilometers (km), Centimeters (cm), Millimeters (mm):</strong> Metric subunits</li>
          <li><strong>Feet (ft), Inches (in), Yards (yd), Miles (mi):</strong> Imperial/US units</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles all unit conversions, so you can input values in any supported unit and get results in your preferred unit.
        </p>
      </SEOSection>

      <SEOSection title="Common Potential Energy Calculations">
        <h3>Example 1: Calculating Potential Energy</h3>
        <p>A 5 kg object is lifted to a height of 10 meters above the ground. What is its potential energy?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 5 kg, g = 9.80665 m/s², h = 10 m</p>
          <p className="font-mono">PE = m × g × h = 5 kg × 9.80665 m/s² × 10 m = 490.33 J</p>
          <p className="text-sm text-gray-600 mt-1">The object has 490.33 Joules of potential energy stored</p>
        </div>

        <h3>Example 2: Calculating Height</h3>
        <p>An object with a mass of 2 kg has 1000 J of potential energy. How high is it above the reference point?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">PE = 1000 J, m = 2 kg, g = 9.80665 m/s²</p>
          <p className="font-mono">h = PE / (m × g) = 1000 J / (2 kg × 9.80665 m/s²) = 50.97 m</p>
          <p className="text-sm text-gray-600 mt-1">The object is approximately 51 meters above the reference point</p>
        </div>

        <h3>Example 3: Calculating Mass</h3>
        <p>A box has 500 J of potential energy when raised to a height of 5 meters. What is its mass?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">PE = 500 J, h = 5 m, g = 9.80665 m/s²</p>
          <p className="font-mono">m = PE / (g × h) = 500 J / (9.80665 m/s² × 5 m) = 10.2 kg</p>
          <p className="text-sm text-gray-600 mt-1">The box has a mass of approximately 10.2 kilograms</p>
        </div>

        <h3>Example 4: Potential Energy on Another Planet</h3>
        <p>An object with mass 10 kg is at a height of 20 m on the Moon, where gravity is 1.625 m/s². What is its potential energy?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 10 kg, g = 1.625 m/s² (Moon), h = 20 m</p>
          <p className="font-mono">PE = m × g × h = 10 kg × 1.625 m/s² × 20 m = 325 J</p>
          <p className="text-sm text-gray-600 mt-1">On the Moon, the object has 325 J of potential energy (less than on Earth due to lower gravity)</p>
        </div>

        <h3>Example 5: Energy Conversion</h3>
        <p>A 1000 kg car is at the top of a 50 m hill. If all its potential energy converts to kinetic energy at the bottom, what speed would it reach (ignoring friction)?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">First calculate PE: PE = 1000 kg × 9.80665 m/s² × 50 m = 490,333 J</p>
          <p className="font-mono">Using KE = ½mv² and PE = KE: v = √(2PE/m) = √(2 × 490333 / 1000) = 31.3 m/s (112.7 km/h)</p>
          <p className="text-sm text-gray-600 mt-1">The car would reach approximately 113 km/h at the bottom (in an ideal frictionless scenario)</p>
        </div>
      </SEOSection>

      <SEOSection title="Potential Energy vs. Kinetic Energy">
        <p>
          Understanding the relationship between potential and kinetic energy is fundamental:
        </p>
        <ul>
          <li><strong>Potential Energy:</strong> Stored energy due to position (PE = mgh)</li>
          <li><strong>Kinetic Energy:</strong> Energy of motion (KE = ½mv²)</li>
          <li><strong>Energy Conservation:</strong> In ideal systems, potential energy can convert to kinetic energy and vice versa, with total mechanical energy remaining constant</li>
          <li><strong>Conversion:</strong> When an object falls, PE decreases while KE increases. When an object is lifted, KE decreases (or work is done) while PE increases</li>
          <li><strong>Maximum PE:</strong> At the highest point, PE is maximum and KE is minimum (or zero)</li>
          <li><strong>Maximum KE:</strong> At the lowest point, KE is maximum and PE is minimum (or zero, depending on reference)</li>
        </ul>
        <p>
          This energy transformation is the basis for understanding many mechanical systems, from simple pendulums to complex machinery.
        </p>
      </SEOSection>

      <SEOSection title="Gravitational Acceleration on Different Celestial Bodies">
        <p>
          Gravitational acceleration varies by location. Here are some common values:
        </p>
        <SEOList items={[
          "Earth (standard): 9.80665 m/s² - our default value",
          "Moon: 1.625 m/s² - approximately 1/6 of Earth's gravity",
          "Mars: 3.711 m/s² - approximately 38% of Earth's gravity",
          "Jupiter: 24.79 m/s² - approximately 2.5 times Earth's gravity",
          "Sun: 274 m/s² - approximately 28 times Earth's gravity",
          "Mercury: 3.7 m/s² - similar to Mars",
          "Venus: 8.87 m/s² - similar to Earth",
          "Saturn: 10.44 m/s² - slightly higher than Earth",
          "Neptune: 11.15 m/s² - slightly higher than Earth",
          "Pluto: 0.62 m/s² - much lower than Earth"
        ]} />
        <p>
          The calculator allows you to enter custom gravitational acceleration values for calculations on different planets or in different gravitational environments.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding potential energy has practical applications in daily life:
        </p>
        <SEOList items={[
          "Stairs and Elevators: Understanding the energy cost of going up vs. down",
          "Storage: Stacking items higher increases their potential energy (consider stability)",
          "Sports: Understanding energy in activities like climbing, jumping, and throwing",
          "Vehicles: Understanding energy when driving on hills and mountains",
          "Water Systems: Understanding energy stored in elevated water tanks and reservoirs",
          "Construction: Understanding energy requirements for lifting and moving materials",
          "Energy Efficiency: Understanding potential energy helps optimize systems and reduce energy waste"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is potential energy and how is it calculated?",
            answer: "Potential energy is stored energy due to an object's position in a gravitational field. It's calculated using PE = m × g × h, where m is mass, g is gravitational acceleration (9.80665 m/s² on Earth), and h is height above a reference point. The formula shows that potential energy increases with mass, gravity, and height."
          },
          {
            question: "Why is height measured from a reference point?",
            answer: "Potential energy is always relative to a chosen reference point (usually ground level where h = 0). The reference point defines where potential energy is zero. All potential energy values are measured relative to this point, so changing the reference point changes the absolute value but not the energy differences between positions."
          },
          {
            question: "Can potential energy be negative?",
            answer: "Yes, potential energy can be negative if the reference point is chosen such that the object is below it. For example, if ground level is the reference point (h = 0) and an object is in a hole, its height would be negative, giving negative potential energy. The sign indicates position relative to the reference point."
          },
          {
            question: "What is the relationship between potential energy and kinetic energy?",
            answer: "Potential energy and kinetic energy are different forms of mechanical energy that can convert into each other. When an object falls, potential energy decreases while kinetic energy increases. In ideal systems (no friction), total mechanical energy (PE + KE) remains constant. This is the principle of conservation of mechanical energy."
          },
          {
            question: "How does gravity affect potential energy?",
            answer: "Gravitational acceleration (g) directly multiplies the potential energy. Higher gravity means more potential energy for the same mass and height. On planets with stronger gravity (like Jupiter), objects have more potential energy. On planets with weaker gravity (like the Moon), objects have less potential energy for the same mass and height."
          },
          {
            question: "What happens to potential energy when an object falls?",
            answer: "When an object falls, its height decreases, so potential energy decreases. This lost potential energy converts to kinetic energy (energy of motion). If there's no air resistance or friction, all the potential energy converts to kinetic energy. The object's speed increases as it falls, reaching maximum speed (and maximum KE) at the lowest point."
          },
          {
            question: "Why use standard Earth gravity (9.80665 m/s²)?",
            answer: "Standard Earth gravity is the average gravitational acceleration at Earth's surface. Actual gravity varies slightly by location (latitude, altitude, local geology), but the standard value (9.80665 m/s²) provides excellent accuracy for most calculations. It's an internationally accepted standard that simplifies calculations while maintaining precision."
          },
          {
            question: "How do I calculate potential energy on other planets?",
            answer: "Use the same formula PE = m × g × h, but use the gravitational acceleration of that planet. Uncheck 'Use standard Earth gravity' in the calculator and enter the planet's gravitational acceleration (e.g., 1.625 m/s² for the Moon, 3.711 m/s² for Mars). The calculator will use your custom value for all calculations."
          },
          {
            question: "What units should I use for potential energy calculations?",
            answer: "Use consistent SI units for best results: Joules (J) for energy, kilograms (kg) for mass, meters per second squared (m/s²) for acceleration, and meters (m) for height. However, the calculator supports many units and automatically converts between them, so you can use any compatible units (e.g., calories, pounds, feet) and get results in your preferred units."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding potential energy and the relationship between mass, gravity, height, and stored energy is fundamental to mechanics and physics. Our Potential Energy Calculator simplifies these calculations, making it easy to solve problems involving gravitational potential energy, energy storage, and energy transformations.
        </p>
        <p>
          Whether you&apos;re studying energy conservation, designing systems that store or use potential energy, or understanding everyday phenomena like objects on hills, this calculator provides accurate results with support for multiple units and standard or custom gravitational acceleration. Ready to explore more mechanics concepts? Check out our other calculators like the {createInternalLink('velocity-calculator')} for motion calculations, or use our {createInternalLink('gravitational-force-calculator')} for understanding gravitational forces that create potential energy.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

