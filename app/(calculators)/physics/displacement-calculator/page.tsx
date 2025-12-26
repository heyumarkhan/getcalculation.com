import DisplacementCalculator from '../../../_components/calculators/DisplacementCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function DisplacementCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Displacement Calculator: Calculate Displacement from Position, Velocity & Acceleration"
      description="Calculate displacement from initial and final positions, velocity, acceleration, and time. Free online physics calculator for kinematics, motion analysis, and physics problems with comprehensive unit support."
      calculator={<DisplacementCalculator />}
      slug="physics/displacement-calculator"
      category="Kinematics"
      features={[
        "Calculate displacement from initial and final positions",
        "Calculate displacement from velocity and time (constant velocity)",
        "Calculate displacement from initial velocity, acceleration, and time",
        "Calculate displacement from initial and final velocities and time",
        "Calculate displacement from initial and final velocities and acceleration",
        "Support for multiple distance, time, velocity, and acceleration units",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Displacement: The Change in Position">
        <p>
          Displacement is a fundamental concept in physics that represents the change in position of an object. Unlike distance, which is a scalar quantity measuring the total path length traveled, displacement is a vector quantity that has both magnitude and direction. It represents the straight-line distance and direction from the initial position to the final position. Our Displacement Calculator simplifies these calculations, allowing you to determine displacement using various methods: from initial and final positions (<strong>Δx = x - x₀</strong>), from velocity and time (<strong>s = vt</strong>), from kinematics equations, and more.
        </p>
        <p>
          Whether you&apos;re studying kinematics, analyzing motion, solving physics problems, or calculating the position change of moving objects, understanding displacement is crucial. Our calculator supports multiple calculation methods based on the information you have available, making complex motion calculations simple and accessible.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Displacement Calculator">
        <p>
          Our Displacement Calculator offers five calculation methods:
        </p>
        <SEOList ordered items={[
          '<strong>From Initial and Final Positions:</strong> Enter the initial position (x₀) and final position (x). The calculator determines displacement using Δx = x - x₀.',
          '<strong>From Velocity and Time (Constant Velocity):</strong> Enter velocity (v) and time (t). The calculator determines displacement using s = v × t. This applies when velocity is constant (no acceleration).',
          '<strong>From Initial Velocity, Acceleration, and Time:</strong> Enter initial velocity (v₀), acceleration (a), and time (t). The calculator determines displacement using s = v₀t + (1/2)at².',
          '<strong>From Initial and Final Velocities and Time:</strong> Enter initial velocity (v₀), final velocity (v), and time (t). The calculator determines displacement using s = (v₀ + v) × t / 2. This uses average velocity.',
          '<strong>From Initial and Final Velocities and Acceleration:</strong> Enter initial velocity (v₀), final velocity (v), and acceleration (a). The calculator determines displacement using s = (v² - v₀²) / (2a).'
        ]} />
        <p>
          Select your calculation method, enter the known values with your preferred units, and click Calculate to get instant results with detailed step-by-step solutions. The calculator supports multiple units for distance (meters, kilometers, centimeters, feet, inches, miles), time (seconds, minutes, hours, milliseconds), velocity (m/s, km/h, mph, ft/s), and acceleration (m/s², ft/s², g).
        </p>
      </SEOSection>

      <SEOSection title="Displacement Formulas Explained">
        <p>
          Displacement can be calculated using different formulas depending on the available information:
        </p>

        <h3>1. From Initial and Final Positions:</h3>
        <SEOFormula
          formula="Δx = x - x₀"
          description="Where: Δx = Displacement, x = Final Position, x₀ = Initial Position"
        />

        <h3>2. From Velocity and Time (Constant Velocity):</h3>
        <SEOFormula
          formula="s = v × t"
          description="Where: s = Displacement, v = Velocity, t = Time (applies when velocity is constant)"
        />

        <h3>3. From Initial Velocity, Acceleration, and Time:</h3>
        <SEOFormula
          formula="s = v₀t + (1/2)at²"
          description="Where: s = Displacement, v₀ = Initial Velocity, a = Acceleration, t = Time"
        />

        <h3>4. From Initial and Final Velocities and Time:</h3>
        <SEOFormula
          formula="s = (v₀ + v) × t / 2"
          description="Where: s = Displacement, v₀ = Initial Velocity, v = Final Velocity, t = Time (uses average velocity)"
        />

        <h3>5. From Initial and Final Velocities and Acceleration:</h3>
        <SEOFormula
          formula="s = (v² - v₀²) / (2a)"
          description="Where: s = Displacement, v₀ = Initial Velocity, v = Final Velocity, a = Acceleration"
        />

        <h3>Understanding the Components:</h3>
        <SEOList items={[
          '<strong>Displacement (Δx or s):</strong> The change in position, a vector quantity with both magnitude and direction. Measured in meters, kilometers, feet, or other distance units. Displacement can be positive, negative, or zero.',
          '<strong>Initial Position (x₀):</strong> The starting position of the object. Measured in distance units.',
          '<strong>Final Position (x):</strong> The ending position of the object. Measured in distance units.',
          '<strong>Velocity (v):</strong> The rate of change of position. For constant velocity, displacement = velocity × time. Measured in m/s, km/h, mph, or other velocity units.',
          '<strong>Initial Velocity (v₀):</strong> The velocity at the start of the time interval. Measured in velocity units.',
          '<strong>Final Velocity (v):</strong> The velocity at the end of the time interval. Measured in velocity units.',
          '<strong>Acceleration (a):</strong> The rate of change of velocity. Measured in m/s², ft/s², or other acceleration units.',
          '<strong>Time (t):</strong> The duration of the motion. Measured in seconds, minutes, hours, or other time units.'
        ]} />
      </SEOSection>

      <SEOSection title="Displacement vs. Distance: Understanding the Difference">
        <p>
          It&apos;s important to understand the difference between displacement and distance:
        </p>
        <SEOList items={[
          '<strong>Displacement:</strong> A vector quantity representing the change in position from initial to final point. It has both magnitude and direction. Displacement can be zero if the object returns to its starting point, even if it traveled a long distance.',
          '<strong>Distance:</strong> A scalar quantity representing the total path length traveled. It has only magnitude, no direction. Distance is always positive or zero and is the sum of all path segments traveled.',
          '<strong>Key Differences:</strong> If you walk 10 meters east, then 10 meters west, your displacement is 0 m (you\'re back where you started), but your distance traveled is 20 m. Displacement is the shortest path between two points, while distance is the actual path length.',
          '<strong>When They\'re Equal:</strong> Displacement equals distance only when motion is in a straight line in one direction without reversing.'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications of Displacement Calculations">
        <p>
          Displacement calculations are essential in numerous applications:
        </p>
        <SEOList items={[
          '<strong>Kinematics and Motion Analysis:</strong> Analyzing the motion of objects, calculating position changes, and solving kinematics problems in physics.',
          '<strong>Projectile Motion:</strong> Calculating the horizontal and vertical displacement of projectiles, such as balls thrown, bullets fired, or rockets launched.',
          '<strong>Vehicle Motion:</strong> Determining the change in position of vehicles, calculating distances traveled, and analyzing motion in traffic analysis.',
          '<strong>Sports Physics:</strong> Analyzing the displacement of athletes, calculating jumps, throws, and movements in various sports.',
          '<strong>Robotics and Automation:</strong> Calculating the displacement of robotic arms, automated systems, and positioning mechanisms.',
          '<strong>GPS and Navigation:</strong> Understanding position changes in navigation systems, tracking movement, and calculating route changes.',
          '<strong>Astronomy:</strong> Calculating the displacement of planets, satellites, and celestial objects over time.',
          '<strong>Engineering Design:</strong> Analyzing motion in mechanical systems, calculating displacements in structures under load, and designing moving parts.',
          '<strong>Physics Education:</strong> Teaching fundamental concepts of motion, vectors, and kinematics in academic settings.',
          '<strong>Animation and Simulation:</strong> Calculating position changes in computer graphics, game physics, and motion simulations.'
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Positive and Negative Displacement">
        <p>
          Displacement is a vector quantity and can be positive or negative depending on the coordinate system:
        </p>
        <SEOList items={[
          '<strong>Positive Displacement:</strong> Motion in the positive direction (typically right, east, or upward depending on the coordinate system). For example, moving from position x₀ = 2 m to x = 5 m gives displacement Δx = +3 m.',
          '<strong>Negative Displacement:</strong> Motion in the negative direction (typically left, west, or downward). For example, moving from position x₀ = 5 m to x = 2 m gives displacement Δx = -3 m.',
          '<strong>Zero Displacement:</strong> When the final position equals the initial position, displacement is zero, regardless of the distance traveled. For example, walking in a circle and returning to the starting point.',
          '<strong>One-Dimensional Motion:</strong> In straight-line motion along one axis, displacement is simply the difference between final and initial positions.',
          '<strong>Two/Three-Dimensional Motion:</strong> Displacement is a vector with components in multiple directions, calculated using vector mathematics.'
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is displacement?",
            answer: "Displacement is the change in position of an object, represented as a vector quantity with both magnitude and direction. It's calculated as the difference between final position and initial position: Δx = x - x₀. Unlike distance, which measures total path length, displacement represents the straight-line change in position from start to end point."
          },
          {
            question: "What is the difference between displacement and distance?",
            answer: "Displacement is a vector quantity (has magnitude and direction) representing the change in position from initial to final point. Distance is a scalar quantity (magnitude only) representing the total path length traveled. Displacement can be zero if an object returns to its starting point, while distance is always the sum of all path segments traveled."
          },
          {
            question: "How do you calculate displacement from velocity and time?",
            answer: "For constant velocity motion, displacement equals velocity multiplied by time: s = v × t. For example, if an object moves at 10 m/s for 5 seconds, displacement = 10 m/s × 5 s = 50 m. This formula only applies when velocity is constant (no acceleration)."
          },
          {
            question: "What is the displacement formula with acceleration?",
            answer: "When acceleration is present, displacement can be calculated using: s = v₀t + (1/2)at², where v₀ is initial velocity, a is acceleration, and t is time. This formula accounts for both the initial velocity contribution and the acceleration contribution to displacement over time."
          },
          {
            question: "Can displacement be negative?",
            answer: "Yes, displacement can be negative, zero, or positive. It's a vector quantity, so its sign indicates direction. In one-dimensional motion, negative displacement typically means motion in the negative direction (left, west, or downward depending on coordinate system). Zero displacement means the object returned to its starting position."
          },
          {
            question: "What is the formula for displacement without time?",
            answer: "When you know initial velocity (v₀), final velocity (v), and acceleration (a) but not time, you can calculate displacement using: s = (v² - v₀²) / (2a). This formula is derived from the kinematics equations and eliminates the time variable."
          },
          {
            question: "How do you calculate displacement from average velocity?",
            answer: "Displacement equals average velocity multiplied by time: s = v_avg × t. When you know initial and final velocities, average velocity is (v₀ + v) / 2, so displacement = (v₀ + v) × t / 2. This formula works for any motion with constant acceleration."
          },
          {
            question: "What are the units for displacement?",
            answer: "Displacement has units of length. Common units include meters (m), kilometers (km), centimeters (cm), millimeters (mm), feet (ft), inches (in), miles (mi), and yards (yd). The unit depends on the coordinate system and the scale of motion being analyzed."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Displacement is a fundamental concept in kinematics that represents the change in position of an object. Our Displacement Calculator provides a powerful and accurate tool for determining displacement using various methods, making complex motion calculations simple and accessible for students, engineers, and physics enthusiasts.
        </p>
        <p>
          By supporting multiple calculation methods with comprehensive unit conversions and detailed step-by-step solutions, this calculator empowers users to solve displacement problems regardless of the available information. For related calculations, explore our {createInternalLink('velocity-calculator')} for velocity calculations or our {createInternalLink('acceleration-calculator')} for acceleration analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

