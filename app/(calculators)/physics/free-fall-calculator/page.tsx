import FreeFallCalculator from '../../../_components/calculators/FreeFallCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function FreeFallCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Free Fall Calculator: Calculate Velocity, Time & Height in Free Fall"
      description="Calculate free fall motion: velocity, time, and height using gravity acceleration. Free online physics calculator for kinematics problems with step-by-step solutions and multiple unit support."
      calculator={<FreeFallCalculator />}
      slug="physics/free-fall-calculator"
      category="Kinematics"
      features={[
        "Calculate velocity, time, or height in free fall",
        "Support for custom gravity values",
        "Optional initial velocity input",
        "Multiple unit conversions (m/s, ft/s, m, ft, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Free Fall: Motion Under Gravity">
        <p>
          Free fall is a fundamental concept in physics that describes the motion of an object falling solely under the influence of gravity, with no air resistance or other forces acting upon it. Whether you&apos;re studying kinematics, solving physics problems, or analyzing projectile motion, understanding free fall is essential. Our Free Fall Calculator makes it easy to calculate velocity, time, or height using the standard free fall equations: <strong>v = v₀ + gt</strong>, <strong>h = v₀t + (1/2)gt²</strong>, and <strong>v² = v₀² + 2gh</strong>.
        </p>
        <p>
          In true free fall, the only force acting on the object is gravity, which provides a constant downward acceleration. On Earth, this acceleration is approximately 9.80665 m/s² (32.174 ft/s²), though it varies slightly with location and altitude.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Free Fall Calculator">
        <p>
          Our Free Fall Calculator is designed for simplicity and accuracy:
        </p>
        <ol>
          <li><strong>Enter Gravity:</strong> Input the gravitational acceleration (default: 9.80665 m/s² for Earth)</li>
          <li><strong>Enter Initial Velocity (Optional):</strong> If the object starts with an initial velocity, enter it (default: 0 for true free fall)</li>
          <li><strong>Provide Known Values:</strong> Enter at least 2 of: final velocity, time, or height</li>
          <li><strong>Calculate:</strong> Leave the value you want to calculate empty and click Calculate</li>
        </ol>
        <p>
          The calculator uses the fundamental free fall equations to solve for the missing variable.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Free Fall Formulas">
        <p>
          Free fall motion is described by three key equations:
        </p>
        
        <h3>1. Velocity-Time Equation</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">v = v₀ + gt</p>
          <p className="text-sm text-gray-600 mt-2">Where: v = final velocity, v₀ = initial velocity, g = gravity, t = time</p>
        </div>
        <p>
          This equation calculates the final velocity after a given time. If the object starts from rest (v₀ = 0), the equation simplifies to v = gt.
        </p>

        <h3>2. Height-Time Equation</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">h = v₀t + (1/2)gt²</p>
          <p className="text-sm text-gray-600 mt-2">Where: h = height/distance, v₀ = initial velocity, g = gravity, t = time</p>
        </div>
        <p>
          This equation calculates the distance fallen after a given time. If the object starts from rest, it simplifies to h = (1/2)gt².
        </p>

        <h3>3. Velocity-Height Equation</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">v² = v₀² + 2gh</p>
          <p className="text-sm text-gray-600 mt-2">Where: v = final velocity, v₀ = initial velocity, g = gravity, h = height</p>
        </div>
        <p>
          This equation relates velocity to height without requiring time. It&apos;s particularly useful when you know the height but not the time.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Free fall calculations are used in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Physics Education: Teaching kinematics, acceleration, and motion under gravity",
          "Engineering: Designing safety systems, calculating impact forces, and analyzing drop tests",
          "Sports: Analyzing diving, skydiving, and bungee jumping physics",
          "Aerospace: Calculating re-entry trajectories and parachute deployment",
          "Construction: Analyzing falling objects, safety calculations, and demolition",
          "Entertainment: Creating realistic physics in games and simulations",
          "Research: Studying gravity, testing equipment, and conducting experiments",
          "Safety Engineering: Calculating fall distances and impact velocities for safety systems"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Free fall calculations use various units depending on the application:
        </p>
        <ul>
          <li><strong>Velocity:</strong> m/s (SI), ft/s (US), km/h, mph</li>
          <li><strong>Time:</strong> seconds (s), milliseconds (ms), minutes (min)</li>
          <li><strong>Height/Distance:</strong> meters (m), feet (ft), kilometers (km), miles (mi)</li>
          <li><strong>Gravity:</strong> m/s² (SI), ft/s² (US), or g (standard gravity = 9.80665 m/s²)</li>
        </ul>
        <p>
          <strong>Standard Values:</strong>
        </p>
        <ul>
          <li>Earth&apos;s gravity: g = 9.80665 m/s² = 32.174 ft/s²</li>
          <li>Moon&apos;s gravity: g = 1.62 m/s² (about 1/6 of Earth&apos;s)</li>
          <li>Mars&apos;s gravity: g = 3.71 m/s² (about 38% of Earth&apos;s)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Free Fall Calculations">
        <h3>Example 1: Object Dropped from Rest</h3>
        <p>An object is dropped from a height of 100 meters. What is its velocity when it hits the ground? (g = 9.80665 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v₀ = 0 m/s, h = 100 m, g = 9.80665 m/s²</p>
          <p className="font-mono">v² = v₀² + 2gh = 0² + 2 × 9.80665 × 100 = 1961.33</p>
          <p className="font-mono">v = √1961.33 = 44.29 m/s</p>
        </div>

        <h3>Example 2: Time to Fall</h3>
        <p>How long does it take for an object to fall 50 meters from rest? (g = 9.80665 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v₀ = 0 m/s, h = 50 m, g = 9.80665 m/s²</p>
          <p className="font-mono">h = (1/2)gt²</p>
          <p className="font-mono">50 = 0.5 × 9.80665 × t²</p>
          <p className="font-mono">t² = 10.194, t = 3.193 s</p>
        </div>

        <h3>Example 3: Height After Time</h3>
        <p>How far does an object fall in 3 seconds from rest? (g = 9.80665 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v₀ = 0 m/s, t = 3 s, g = 9.80665 m/s²</p>
          <p className="font-mono">h = (1/2)gt² = 0.5 × 9.80665 × 3² = 44.13 m</p>
        </div>

        <h3>Example 4: With Initial Velocity</h3>
        <p>An object is thrown downward with an initial velocity of 10 m/s. What is its velocity after falling 20 meters? (g = 9.80665 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v₀ = 10 m/s, h = 20 m, g = 9.80665 m/s²</p>
          <p className="font-mono">v² = v₀² + 2gh = 10² + 2 × 9.80665 × 20 = 492.27</p>
          <p className="font-mono">v = √492.27 = 22.19 m/s</p>
        </div>
      </SEOSection>

      <SEOSection title="Free Fall vs. Other Motion">
        <p>
          Understanding the difference between free fall and other types of motion is important:
        </p>
        <ul>
          <li><strong>Free Fall:</strong> Motion under gravity only, no air resistance or other forces</li>
          <li><strong>Terminal Velocity:</strong> When air resistance balances gravity, velocity becomes constant</li>
          <li><strong>Projectile Motion:</strong> Motion with both horizontal and vertical components</li>
          <li><strong>Constant Velocity:</strong> Motion with no acceleration (different from free fall)</li>
        </ul>
        <p>
          Our calculator assumes true free fall (no air resistance). For real-world applications with air resistance, you would need more complex calculations involving terminal velocity.
        </p>
      </SEOSection>

      <SEOSection title="Gravity Variations">
        <p>
          Gravity varies depending on location:
        </p>
        <ul>
          <li><strong>Earth&apos;s Surface:</strong> Approximately 9.80665 m/s² (varies from 9.78 to 9.83 m/s²)</li>
          <li><strong>Altitude:</strong> Gravity decreases slightly with altitude (about 0.003 m/s² per kilometer)</li>
          <li><strong>Latitude:</strong> Gravity is slightly stronger at the poles than at the equator</li>
          <li><strong>Other Planets:</strong> Each planet has its own gravitational acceleration</li>
        </ul>
        <p>
          For most calculations, using the standard value of 9.80665 m/s² is sufficient, but our calculator allows you to input custom gravity values for different scenarios.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is free fall?",
            answer: "Free fall is the motion of an object falling solely under the influence of gravity, with no air resistance or other forces. In free fall, all objects accelerate at the same rate regardless of their mass (in a vacuum)."
          },
          {
            question: "Do heavier objects fall faster?",
            answer: "No! In true free fall (vacuum), all objects fall at the same rate regardless of mass. This was famously demonstrated by Galileo. In air, heavier objects may appear to fall faster due to air resistance, but in a vacuum, a feather and a hammer fall at the same rate."
          },
          {
            question: "What is the acceleration due to gravity?",
            answer: "On Earth's surface, the standard acceleration due to gravity is 9.80665 m/s² (32.174 ft/s²). This value varies slightly with location, altitude, and latitude, but 9.80665 m/s² is the standard value used in most calculations."
          },
          {
            question: "Can I use this calculator for objects thrown upward?",
            answer: "Yes! If an object is thrown upward, use a negative initial velocity. The calculator will calculate the motion correctly, including the upward phase and the downward free fall phase."
          },
          {
            question: "What about air resistance?",
            answer: "This calculator assumes no air resistance (true free fall). In reality, air resistance affects falling objects, especially at high velocities. For calculations involving air resistance, you would need to account for terminal velocity and use more complex equations."
          },
          {
            question: "How do I calculate free fall on other planets?",
            answer: "Simply change the gravity value in the calculator. For example, on the Moon, use g = 1.62 m/s². On Mars, use g = 3.71 m/s². The calculator will work with any gravity value you provide."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding free fall is fundamental to kinematics and has countless practical applications in physics, engineering, and everyday life. Our Free Fall Calculator simplifies these calculations, supporting custom gravity values and multiple unit conversions to make solving free fall problems easy and accurate.
        </p>
        <p>
          Ready to explore more kinematics concepts? Check out our {createInternalLink('velocity-calculator', 'Velocity Calculator')} for general velocity calculations, our {createInternalLink('acceleration-calculator', 'Acceleration Calculator')} for acceleration analysis, or our {createInternalLink('terminal-velocity-calculator', 'Terminal Velocity Calculator')} for motion with air resistance.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

