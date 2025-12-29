import MachNumberCalculator from '../../../_components/calculators/MachNumberCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function MachNumberCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Mach Number Calculator: Calculate M = v/c"
      description="Calculate Mach number, velocity, or speed of sound using M = v/c. Free online physics calculator for aerodynamics and fluid dynamics. Calculate Mach number from velocity and speed of sound, or use temperature to find speed of sound in air."
      calculator={<MachNumberCalculator primaryColor="#820ECC" />}
      slug="physics/mach-number-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate Mach number from velocity and speed of sound",
        "Calculate velocity from Mach number and speed of sound",
        "Calculate speed of sound from temperature (for air)",
        "Multiple unit support (m/s, km/h, mph, ft/s, knots)",
        "Temperature-based speed of sound calculation",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Mach Number">
        <p>
          Mach number is a dimensionless quantity used in fluid dynamics and aerodynamics to express the speed of an object relative to the speed of sound in the surrounding medium. Named after Austrian physicist Ernst Mach, this fundamental parameter is crucial for understanding compressible flow, supersonic flight, and the behavior of objects moving through fluids at high speeds.
        </p>
        <p>
          Our <strong>Mach Number Calculator</strong> makes it easy to calculate Mach number, velocity, or speed of sound using the fundamental relationship: <strong>M = v/c</strong>, where M is the Mach number, v is the velocity of the object, and c is the speed of sound in the medium. Whether you&apos;re studying aerodynamics, working on aerospace projects, or analyzing high-speed flows, this calculator provides accurate results with comprehensive unit support.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Mach Number Calculator">
        <p>
          Our calculator is designed for ease of use and provides accurate results for Mach number calculations:
        </p>
        <ol>
          <li><strong>Select Calculation Type:</strong> Choose what you want to calculate:
            <ul>
              <li><strong>Mach Number:</strong> Calculate M from velocity and speed of sound (M = v/c)</li>
              <li><strong>Velocity:</strong> Calculate velocity from Mach number and speed of sound (v = M × c)</li>
              <li><strong>Speed of Sound:</strong> Calculate speed of sound from temperature for air (c = √(γ × R × T))</li>
            </ul>
          </li>
          <li><strong>Enter Values:</strong> Input the required parameters based on your calculation type</li>
          <li><strong>Use Temperature (Optional):</strong> Check the box to calculate speed of sound from temperature instead of entering it directly</li>
          <li><strong>Select Units:</strong> Choose appropriate units for velocity (m/s, km/h, mph, ft/s, knots) and temperature (K, °C, °F)</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed step-by-step calculations</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and uses the speed of sound formula for air when temperature is provided.
        </p>
      </SEOSection>

      <SEOSection title="The Mach Number Formula: M = v/c">
        <p>
          The fundamental relationship between Mach number, velocity, and speed of sound is expressed by the simple formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">M = v / c</p>
          <p className="text-sm text-gray-600 mt-2">
            Where:
            <br />
            <strong>M</strong> = Mach number (dimensionless)
            <br />
            <strong>v</strong> = Velocity of the object (m/s, km/h, mph, etc.)
            <br />
            <strong>c</strong> = Speed of sound in the medium (m/s, km/h, mph, etc.)
          </p>
        </div>

        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "Mach Number (M): A dimensionless quantity representing the ratio of object speed to the speed of sound. M < 1 is subsonic, M = 1 is sonic, M > 1 is supersonic, and M > 5 is hypersonic.",
          "Velocity (v): The speed of the object relative to the medium. Common units include meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), feet per second (ft/s), and knots.",
          "Speed of Sound (c): The speed at which sound waves propagate through the medium. For air, this depends on temperature and can be calculated using c = √(γ × R × T), where γ = 1.4 (adiabatic index), R = 287 J/(kg·K) (gas constant), and T is temperature in Kelvin."
        ]} />

        <h3>Derived Formulas</h3>
        <p>
          From the main formula, we can solve for any variable:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="font-mono"><strong>Calculate Velocity:</strong> v = M × c</p>
          <p className="font-mono"><strong>Calculate Speed of Sound (from temperature):</strong> c = √(γ × R × T)</p>
        </div>
      </SEOSection>

      <SEOSection title="Speed of Sound in Air">
        <p>
          The speed of sound in air depends on temperature. Our calculator uses the formula derived from the ideal gas law:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">c = √(γ × R × T)</p>
          <p className="text-sm text-gray-600 mt-2">
            Where:
            <br />
            <strong>c</strong> = Speed of sound (m/s)
            <br />
            <strong>γ</strong> = Adiabatic index = 1.4 (for air)
            <br />
            <strong>R</strong> = Gas constant = 287 J/(kg·K) (for air)
            <br />
            <strong>T</strong> = Temperature (Kelvin)
          </p>
        </div>
        <p>
          At standard sea-level conditions (15°C or 288.15 K), the speed of sound in air is approximately <strong>343 m/s</strong> (1,125 ft/s, 767 mph, 1,235 km/h). This value increases with temperature, as warmer air has higher molecular speeds.
        </p>
      </SEOSection>

      <SEOSection title="Mach Number Regimes">
        <p>
          Mach number is used to classify different flow regimes:
        </p>
        <SEOList items={[
          "Subsonic (M < 1): Object moves slower than sound. Flow is incompressible, and pressure waves can travel ahead of the object.",
          "Sonic (M = 1): Object moves at the speed of sound. This is the critical Mach number where compressibility effects become significant.",
          "Supersonic (1 < M < 5): Object moves faster than sound. Shock waves form, and compressibility effects are dominant.",
          "Hypersonic (M > 5): Object moves much faster than sound. Extreme compressibility effects, high temperatures, and significant aerodynamic heating occur."
        ]} />
        <p>
          Understanding these regimes is crucial for aircraft design, rocket propulsion, and high-speed fluid dynamics applications.
        </p>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Our calculator supports a wide range of units for each parameter, performing automatic conversions to ensure accuracy:
        </p>
        <SEOList items={[
          "Velocity: Meters per second (m/s), Kilometers per hour (km/h), Miles per hour (mph), Feet per second (ft/s), Knots",
          "Speed of Sound: Same units as velocity (m/s, km/h, mph, ft/s, knots)",
          "Temperature: Kelvin (K), Celsius (°C), Fahrenheit (°F)"
        ]} />
        <p>
          The calculator automatically converts between these units, so you can work with the units most convenient for your application. For example, you can input velocity in mph and speed of sound in m/s, and the calculator will handle the conversion correctly.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Mach Number">
        <p>
          Mach number calculations are fundamental in numerous fields and applications:
        </p>
        <SEOList items={[
          "Aerospace Engineering: Designing aircraft, rockets, and spacecraft that operate at various Mach numbers",
          "Aircraft Performance: Understanding flight characteristics at different speeds relative to sound",
          "Supersonic Flight: Analyzing the behavior of objects traveling faster than sound",
          "Wind Tunnel Testing: Scaling and interpreting test results for high-speed flows",
          "Rocket Propulsion: Designing nozzles and analyzing exhaust flow characteristics",
          "Compressible Flow Analysis: Understanding how fluids behave at high speeds",
          "Shock Wave Analysis: Studying the formation and behavior of shock waves",
          "Aerodynamic Heating: Calculating heat generation at hypersonic speeds"
        ]} />
      </SEOSection>

      <SEOSection title="Common Mach Number Values">
        <p>
          Here are some common Mach number values for reference:
        </p>
        <SEOList items={[
          "Commercial Aircraft: Typically 0.75-0.85 (subsonic cruise)",
          "Concorde: 2.04 (supersonic passenger aircraft)",
          "SR-71 Blackbird: 3.2-3.3 (high-altitude reconnaissance)",
          "Space Shuttle: Up to 25 during re-entry (hypersonic)",
          "Bullet: 2-3 (supersonic)",
          "Sound Barrier: M = 1.0 (sonic speed)",
          "Typical Fighter Jet: 1.5-2.5 (supersonic)"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is Mach 1?",
            answer: "Mach 1 is the speed of sound. At sea level and 15°C, this is approximately 343 m/s (767 mph, 1,235 km/h). Mach 1 represents the sonic speed where an object travels at exactly the speed of sound."
          },
          {
            question: "How does temperature affect the speed of sound?",
            answer: "The speed of sound increases with temperature. For air, the relationship is c = √(γ × R × T), where T is temperature in Kelvin. Warmer air has a higher speed of sound because molecules move faster and can transmit pressure waves more quickly."
          },
          {
            question: "What is the difference between subsonic and supersonic?",
            answer: "Subsonic (M < 1) means slower than sound, where flow is relatively incompressible. Supersonic (M > 1) means faster than sound, where compressibility effects dominate and shock waves form. The transition occurs at M = 1 (sonic speed)."
          },
          {
            question: "Can I calculate velocity if I know the Mach number and speed of sound?",
            answer: "Yes! Using the formula v = M × c, you can calculate velocity by multiplying Mach number and speed of sound. Select 'Velocity' as your calculation type and enter the Mach number and speed of sound values."
          },
          {
            question: "Why is Mach number important in aerodynamics?",
            answer: "Mach number determines the flow regime (subsonic, supersonic, hypersonic) and affects compressibility, shock wave formation, drag characteristics, and aerodynamic heating. Different Mach number regimes require different design approaches."
          },
          {
            question: "Does Mach number depend on altitude?",
            answer: "Indirectly, yes. While Mach number itself is a ratio, the speed of sound depends on temperature, which decreases with altitude in the troposphere. Therefore, the same Mach number at different altitudes corresponds to different actual speeds."
          },
          {
            question: "What is the speed of sound at different temperatures?",
            answer: "At 0°C: 331 m/s, at 15°C: 343 m/s, at 20°C: 343 m/s, at 30°C: 349 m/s. The speed increases by approximately 0.6 m/s per degree Celsius. Our calculator can compute this automatically from temperature."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The Mach Number Calculator provides a powerful tool for students, engineers, and anyone working with high-speed flows and aerodynamics. By using the fundamental formula M = v/c, you can calculate Mach number, velocity, or speed of sound, enabling accurate analysis of compressible flow behavior.
        </p>
        <p>
          Whether you&apos;re designing aircraft, analyzing rocket performance, studying fluid dynamics, or working on aerospace projects, this calculator simplifies complex Mach number calculations. Explore our other {createInternalLink('velocity-calculator', 'Physics Calculators')} like the {createInternalLink('drag-equation-calculator', 'Drag Equation Calculator')} and {createInternalLink('terminal-velocity-calculator', 'Terminal Velocity Calculator')} for related aerodynamics calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

