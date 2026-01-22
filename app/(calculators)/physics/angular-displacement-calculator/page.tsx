import AngularDisplacementCalculator from '../../../_components/calculators/AngularDisplacementCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Angular Displacement Calculator | θ = ωt, Rotational Motion Formulas';
const description = 'Calculate angular displacement, rotation angle, and arc length. Find θ using ωt, acceleration equations, and revolutions with comprehensive solutions.';
const keywords = [
  'angular displacement calculator',
  'rotational displacement calculator',
  'theta calculator',
  'angular motion calculator',
  'rotation angle calculator',
  'angular distance calculator',
  'theta equals omega t',
  'angular kinematics calculator',
  'arc length calculator rotation',
  'revolutions to radians',
  'rotational motion physics',
  'angular position calculator',
  'circular motion displacement',
  'rotation calculator',
  'angular displacement formula',
  'omega t calculator',
  'rotational kinematics',
  'angular velocity displacement',
  'turning angle calculator',
  'rotation physics calculator',
  'angular acceleration displacement',
  'degrees to radians displacement',
  'rotational distance',
  'circular path calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/angular-displacement-calculator'
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/angular-displacement-calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  }
};

export default function AngularDisplacementCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Angular Displacement Calculator"
      description="Calculate angular displacement for rotating objects and circular motion. Supports constant velocity, angular acceleration, velocity changes, and revolution-based calculations with multiple units."
      calculator={<AngularDisplacementCalculator />}
      slug="physics/angular-displacement-calculator"
      category="Physics"
      features={[
        'Calculate angular displacement (θ = ωt)',
        'Solve with angular acceleration (θ = ω₀t + ½αt²)',
        'Find displacement from velocity change',
        'Convert revolutions to angular displacement and arc length',
        'Multiple angle units (radians, degrees, revolutions)',
        'Comprehensive rotational motion analysis'
      ]}
    >
      <SEOSection title="What is Angular Displacement?">
        <p>
          Angular displacement (θ, theta) is the angle through which a point, line, or body rotates in a specified direction about a specified axis. It is the angular analog of linear displacement in translational motion and represents the change in angular position of a rotating object. Angular displacement is a fundamental concept in rotational kinematics, describing how much an object has rotated from its initial position.
        </p>
        <p>
          Unlike angular distance (which is always positive and measures the total angle traveled), angular displacement is a vector quantity that includes direction. Positive angular displacement typically represents counterclockwise rotation, while negative values indicate clockwise rotation when viewed from a standard perspective. The magnitude tells us how far the object has rotated, regardless of the path taken.
        </p>
        <p>
          Angular displacement is measured in radians (rad) in the SI system, though degrees (°) and revolutions (rev) are also commonly used. One complete revolution equals 2π radians or 360 degrees. Understanding angular displacement is essential for analyzing rotating machinery, planetary motion, gyroscopes, circular motion, and any system involving rotation or revolution.
        </p>
      </SEOSection>

      <SEOSection title="Angular Displacement Formulas and Equations">
        <p><strong>Basic Angular Displacement (Constant Angular Velocity):</strong></p>
        <ul>
          <li><strong>θ = ωt</strong> - Angular displacement equals angular velocity times time</li>
          <li><strong>ω = θ/t</strong> - Angular velocity from displacement and time</li>
          <li><strong>t = θ/ω</strong> - Time required for given displacement at constant velocity</li>
        </ul>

        <p className="mt-4"><strong>Angular Displacement with Constant Angular Acceleration:</strong></p>
        <ul>
          <li><strong>θ = θ₀ + ω₀t + ½αt²</strong> - Displacement with initial position, velocity, and acceleration</li>
          <li><strong>θ = ω₀t + ½αt²</strong> - Displacement from rest (θ₀ = 0)</li>
          <li><strong>ωf² = ω₀² + 2αθ</strong> - Relates final velocity, initial velocity, acceleration, and displacement</li>
          <li><strong>θ = (ωf² - ω₀²)/(2α)</strong> - Displacement from velocity change (derived from above)</li>
          <li><strong>θ = (ω₀ + ωf)t/2</strong> - Using average angular velocity</li>
        </ul>

        <p className="mt-4"><strong>Revolutions and Arc Length:</strong></p>
        <ul>
          <li><strong>θ = n × 2π</strong> - Angular displacement in radians from n revolutions</li>
          <li><strong>n = θ/(2π)</strong> - Number of revolutions from angular displacement</li>
          <li><strong>s = rθ</strong> - Arc length (linear distance) from radius and angular displacement</li>
          <li><strong>θ = s/r</strong> - Angular displacement from arc length and radius</li>
        </ul>

        <p className="mt-4"><strong>Angular Velocity and Acceleration Relationships:</strong></p>
        <ul>
          <li><strong>ωf = ω₀ + αt</strong> - Final angular velocity</li>
          <li><strong>α = (ωf - ω₀)/t</strong> - Angular acceleration from velocity change</li>
          <li><strong>ω_avg = (ω₀ + ωf)/2</strong> - Average angular velocity</li>
          <li><strong>θ = ω_avg × t</strong> - Displacement using average velocity</li>
        </ul>

        <p className="mt-4"><strong>Unit Conversions:</strong></p>
        <ul>
          <li><strong>1 revolution = 2π radians = 360 degrees</strong></li>
          <li><strong>1 radian = 180/π degrees ≈ 57.2958°</strong></li>
          <li><strong>1 degree = π/180 radians ≈ 0.0174533 rad</strong></li>
          <li><strong>Angular velocity:</strong> 1 rpm = 2π/60 rad/s ≈ 0.1047 rad/s</li>
        </ul>
      </SEOSection>

      <SEOSection title="Angular Kinematics Equations Summary">
        <p>The rotational kinematic equations are analogous to linear kinematics, with direct parallels:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Linear Motion</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Angular Motion</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">s = vt</td>
                <td className="border border-gray-300 px-4 py-2">θ = ωt</td>
                <td className="border border-gray-300 px-4 py-2">Displacement (constant velocity)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">s = v₀t + ½at²</td>
                <td className="border border-gray-300 px-4 py-2">θ = ω₀t + ½αt²</td>
                <td className="border border-gray-300 px-4 py-2">Displacement with acceleration</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">v² = v₀² + 2as</td>
                <td className="border border-gray-300 px-4 py-2">ω² = ω₀² + 2αθ</td>
                <td className="border border-gray-300 px-4 py-2">Velocity-displacement relation</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">v = v₀ + at</td>
                <td className="border border-gray-300 px-4 py-2">ω = ω₀ + αt</td>
                <td className="border border-gray-300 px-4 py-2">Velocity with acceleration</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">s = (v₀ + v)t/2</td>
                <td className="border border-gray-300 px-4 py-2">θ = (ω₀ + ω)t/2</td>
                <td className="border border-gray-300 px-4 py-2">Using average velocity</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Where: s = linear displacement, v = linear velocity, a = linear acceleration, θ = angular displacement, ω = angular velocity, α = angular acceleration, t = time
        </p>
      </SEOSection>

      <SEOSection title="Understanding Angular Displacement Direction and Sign Convention">
        <p>
          Angular displacement is a vector quantity with both magnitude and direction, making sign convention important for accurate calculations:
        </p>

        <p className="mt-4"><strong>Standard Sign Convention:</strong></p>
        <ul>
          <li><strong>Positive (+):</strong> Counterclockwise rotation when viewed from the positive axis direction (right-hand rule). If you curl your right hand fingers in the direction of rotation, your thumb points in the direction of positive angular displacement.</li>
          <li><strong>Negative (-):</strong> Clockwise rotation. This is the opposite of the positive direction and represents rotation in the conventional "clock hands" direction.</li>
        </ul>

        <p className="mt-4"><strong>Angular Displacement vs. Angular Distance:</strong></p>
        <p>
          Angular displacement differs from angular distance (path length). If an object rotates 1.5 revolutions clockwise from a starting point:
        </p>
        <ul>
          <li>Angular distance = 1.5 × 2π = 3π radians (always positive, total angle traveled)</li>
          <li>Angular displacement = -1.5 × 2π = -3π radians (includes direction, net rotation from start)</li>
        </ul>

        <p className="mt-4"><strong>Multiple Revolutions:</strong></p>
        <p>
          For objects that complete multiple rotations, angular displacement can exceed 2π radians. A wheel that rotates 5 complete revolutions has an angular displacement of 10π radians (≈31.4 rad), even though it returns to orientations it has visited before. This is important for tracking cumulative rotation in motors, wheels, and machinery.
        </p>

        <p className="mt-4"><strong>Shortest Path vs. Actual Path:</strong></p>
        <p>
          Sometimes we're interested in the shortest angular displacement between two orientations. For example, rotating from 350° to 10° can be described as:
        </p>
        <ul>
          <li>+20° (counterclockwise, shorter path)</li>
          <li>-340° (clockwise, longer path)</li>
        </ul>
        <p>
          Both represent the same final orientation, but the actual angular displacement depends on the physical path taken during rotation.
        </p>
      </SEOSection>

      <SEOSection title="Relationship Between Angular and Linear Displacement">
        <p>
          For a point on a rotating object at distance r from the axis of rotation, there is a direct relationship between angular displacement and linear displacement along the circular path:
        </p>

        <p className="mt-4"><strong>Arc Length Formula:</strong></p>
        <p className="font-semibold">s = rθ</p>
        <p className="mt-2">
          Where s is the linear distance traveled along the arc, r is the radius (distance from rotation axis), and θ is the angular displacement in radians. This fundamental relationship connects rotational and translational motion.
        </p>

        <p className="mt-4"><strong>Important Points:</strong></p>
        <ul>
          <li><strong>Radians required:</strong> The formula s = rθ only works when θ is in radians, not degrees or revolutions. This is because radians are the "natural" unit for angles in mathematics and physics.</li>
          <li><strong>Radius dependence:</strong> Points farther from the rotation axis travel greater linear distances for the same angular displacement. A point at r = 2m travels twice as far as a point at r = 1m for the same rotation angle.</li>
          <li><strong>All points same angle:</strong> Every point on a rigid rotating object undergoes the same angular displacement, but linear displacements vary with radius.</li>
        </ul>

        <p className="mt-4"><strong>Practical Examples:</strong></p>
        <p className="mt-2">
          <strong>1. Wheel rolling:</strong> A bicycle wheel with radius 0.33m rolling through one complete revolution:
        </p>
        <ul>
          <li>Angular displacement: θ = 2π rad (one revolution)</li>
          <li>Linear distance traveled: s = rθ = 0.33 × 2π ≈ 2.07m (the circumference)</li>
        </ul>

        <p className="mt-3">
          <strong>2. Earth's rotation:</strong> A person standing at Earth's equator (r ≈ 6,378 km) during 6 hours:
        </p>
        <ul>
          <li>Angular displacement: θ = (6/24) × 2π = π/2 rad (quarter rotation)</li>
          <li>Linear distance traveled: s = 6,378,000 × π/2 ≈ 10,018 km</li>
        </ul>

        <p className="mt-3">
          <strong>3. Hard drive platter:</strong> Point at r = 4cm on a hard drive spinning at 7200 RPM for 1 second:
        </p>
        <ul>
          <li>Angular displacement: θ = 7200 × (2π/60) = 240π rad (120 revolutions)</li>
          <li>Linear distance: s = 0.04 × 240π ≈ 30.16m</li>
        </ul>
      </SEOSection>

      <SEOSection title="Applications of Angular Displacement">
        <SEOList
          items={[
            '<strong>Rotating Machinery:</strong> Motors, turbines, engines, and gearboxes require angular displacement calculations to determine shaft rotations, gear ratios, and mechanical work output. Critical for industrial automation and mechanical engineering.',
            '<strong>Wheels and Vehicles:</strong> Calculate distance traveled from wheel rotations, determine speedometer readings, analyze tire wear patterns, and design transmission systems. Essential for automotive engineering and transportation.',
            '<strong>Astronomy and Celestial Mechanics:</strong> Track planetary positions, satellite orbits, Earth\'s rotation, precession of equinoxes, and apparent motion of celestial objects. Angular displacement helps predict positions and calculate orbital periods.',
            '<strong>Robotics and Servo Motors:</strong> Precise angular displacement control enables accurate robotic arm positioning, joint articulation, and automated movement. Encoder feedback measures actual displacement for closed-loop control.',
            '<strong>Gyroscopes and Navigation:</strong> Gyroscopic instruments measure angular displacement to determine orientation changes in aircraft, ships, spacecraft, and smartphones. Inertial navigation systems integrate angular displacement over time.',
            '<strong>Sports Biomechanics:</strong> Analyze rotation in figure skating spins, diving somersaults, gymnastics twists, and golf swings. Angular displacement measurements help optimize athletic performance and technique.',
            '<strong>Hard Drives and Optical Media:</strong> Calculate data track positioning on spinning disks, determine read/write head positioning, and compute access times. Angular displacement directly affects data storage and retrieval speeds.',
            '<strong>Pendulum and Oscillatory Motion:</strong> Measure swing amplitude in pendulum clocks, seismometers, and oscillating systems. Angular displacement from equilibrium determines restoring forces and period of oscillation.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Angular Displacement in Different Scenarios">
        <p><strong>Scenario 1: Constant Angular Velocity (Uniform Rotation)</strong></p>
        <p className="mt-2">
          When an object rotates at constant angular velocity (α = 0), the motion is uniform circular motion. Examples include:
        </p>
        <ul>
          <li>Clock hands moving at steady rates</li>
          <li>Ceiling fans at constant speed</li>
          <li>Record players and turntables</li>
          <li>Earth's rotation (approximately constant)</li>
        </ul>
        <p className="mt-2">
          For uniform rotation: θ = ωt. The angular displacement is directly proportional to time. Double the time, double the displacement.
        </p>

        <p className="mt-4"><strong>Scenario 2: Constant Angular Acceleration (Starting/Stopping)</strong></p>
        <p className="mt-2">
          When angular acceleration is constant, use the full kinematic equations. Examples include:
        </p>
        <ul>
          <li>Electric motors starting from rest</li>
          <li>Vehicle wheels accelerating or braking</li>
          <li>Spinning tops gradually slowing due to friction</li>
          <li>Centrifuges reaching operating speed</li>
        </ul>
        <p className="mt-2">
          Key equation: θ = ω₀t + ½αt². The displacement includes both the initial velocity contribution (ω₀t) and the acceleration contribution (½αt²).
        </p>

        <p className="mt-4"><strong>Scenario 3: Finding Displacement from Velocity Change</strong></p>
        <p className="mt-2">
          When you know initial and final angular velocities but not time, use ω² = ω₀² + 2αθ, rearranged as θ = (ω² - ω₀²)/(2α). Useful for:
        </p>
        <ul>
          <li>Calculating braking distance for rotating machinery</li>
          <li>Determining acceleration distance for motors</li>
          <li>Analyzing energy changes in rotational systems</li>
        </ul>

        <p className="mt-4"><strong>Scenario 4: Converting Revolutions to Displacement</strong></p>
        <p className="mt-2">
          Many practical measurements are in revolutions (engine RPM, drill speeds, wheel rotations). Convert to radians for calculations:
        </p>
        <ul>
          <li>Car engine: 3000 RPM for 2 seconds = (3000/60) × 2 = 100 rev = 200π rad</li>
          <li>Bicycle: wheel rotates 50 times = 100π rad ≈ 314.16 rad</li>
          <li>Washing machine: spin cycle at 1200 RPM for 5 min = 6000 rev = 12000π rad</li>
        </ul>
      </SEOSection>

      <SEOSection title="Calculation Examples with Detailed Solutions">
        <p><strong>Example 1: Basic Angular Displacement (Constant Velocity)</strong></p>
        <p className="mt-2">
          A ceiling fan rotates at ω = 300 RPM. How much angular displacement occurs in 10 seconds?
        </p>
        <p className="mt-2">
          Convert RPM to rad/s: ω = 300 × (2π/60) = 10π rad/s ≈ 31.42 rad/s<br />
          Angular displacement: θ = ωt = 31.42 × 10 = <strong>314.2 rad</strong><br />
          In revolutions: n = θ/(2π) = 314.2/(2π) = 50 revolutions<br />
          In degrees: θ = 314.2 × (180/π) = 18,000°
        </p>

        <p className="mt-4"><strong>Example 2: Angular Displacement with Acceleration</strong></p>
        <p className="mt-2">
          A motor starts from rest and accelerates at α = 2 rad/s² for 5 seconds. Find angular displacement.
        </p>
        <p className="mt-2">
          Given: θ₀ = 0, ω₀ = 0 (starts from rest), α = 2 rad/s², t = 5s<br />
          Using θ = ω₀t + ½αt²:<br />
          θ = 0 × 5 + ½(2)(5²) = 0 + ½(2)(25) = <strong>25 rad</strong><br />
          Final velocity: ωf = ω₀ + αt = 0 + 2(5) = 10 rad/s<br />
          Verification: θ = (ω₀ + ωf)t/2 = (0 + 10)(5)/2 = 25 rad ✓<br />
          In revolutions: 25/(2π) ≈ 3.98 revolutions
        </p>

        <p className="mt-4"><strong>Example 3: Displacement from Velocity Change</strong></p>
        <p className="mt-2">
          A flywheel spinning at ω₀ = 50 rad/s is braked to ωf = 10 rad/s with α = -5 rad/s². How much does it rotate during braking?
        </p>
        <p className="mt-2">
          Using θ = (ωf² - ω₀²)/(2α):<br />
          θ = (10² - 50²)/(2 × (-5)) = (100 - 2500)/(-10) = -2400/(-10) = <strong>240 rad</strong><br />
          Time taken: t = (ωf - ω₀)/α = (10 - 50)/(-5) = 8 seconds<br />
          In revolutions: 240/(2π) ≈ 38.2 revolutions<br />
          Verification: θ = ω₀t + ½αt² = 50(8) + ½(-5)(64) = 400 - 160 = 240 rad ✓
        </p>

        <p className="mt-4"><strong>Example 4: Arc Length from Angular Displacement</strong></p>
        <p className="mt-2">
          A car tire with radius r = 0.3m rotates through θ = 100 rad. How far does the car travel?
        </p>
        <p className="mt-2">
          Arc length: s = rθ = 0.3 × 100 = <strong>30 m</strong><br />
          Number of revolutions: n = 100/(2π) ≈ 15.9 revolutions<br />
          Tire circumference: C = 2πr = 2π(0.3) ≈ 1.885 m<br />
          Verification: Distance = n × C = 15.9 × 1.885 ≈ 30 m ✓
        </p>

        <p className="mt-4"><strong>Example 5: Combined Acceleration Problem</strong></p>
        <p className="mt-2">
          A drill bit accelerates from 500 RPM to 1500 RPM in 3 seconds. Find: (a) angular acceleration, (b) angular displacement during acceleration.
        </p>
        <p className="mt-2">
          Convert to rad/s: ω₀ = 500(2π/60) ≈ 52.36 rad/s, ωf = 1500(2π/60) ≈ 157.08 rad/s<br />
          (a) Angular acceleration: α = (ωf - ω₀)/t = (157.08 - 52.36)/3 = <strong>34.91 rad/s²</strong><br />
          (b) Angular displacement: θ = (ω₀ + ωf)t/2 = (52.36 + 157.08)(3)/2 = <strong>314.16 rad</strong><br />
          Alternative: θ = ω₀t + ½αt² = 52.36(3) + ½(34.91)(9) ≈ 314.16 rad ✓<br />
          In revolutions: 314.16/(2π) = 50 revolutions
        </p>
      </SEOSection>

      <SEOSection title="Tips for Angular Displacement Calculations">
        <SEOList
          items={[
            '<strong>Always Use Radians for Formulas:</strong> Mathematical formulas like θ = ωt and s = rθ require angles in radians. Convert degrees or revolutions to radians before calculating: multiply degrees by π/180, or revolutions by 2π.',
            '<strong>Identify the Correct Equation:</strong> For constant velocity use θ = ωt. For constant acceleration from rest use θ = ½αt². For velocity change use θ = (ω² - ω₀²)/(2α). Choose based on known quantities.',
            '<strong>Check Sign Conventions:</strong> Establish positive direction (usually counterclockwise) at the start. Keep signs consistent throughout calculations. Negative angular displacement indicates clockwise rotation.',
            '<strong>Distinguish Displacement from Distance:</strong> Angular displacement is the net rotation (vector) while angular distance is total rotation traveled (scalar). A complete revolution has 2π rad displacement if ending at start, but could have traveled many more radians.',
            '<strong>Convert Units Carefully:</strong> RPM to rad/s: multiply by 2π/60. Degrees to radians: multiply by π/180. Revolutions to radians: multiply by 2π. Double-check unit conversions before calculating.',
            '<strong>Verify with Alternative Methods:</strong> Use θ = (ω₀ + ωf)t/2 to check results from θ = ω₀t + ½αt². Both should give identical answers if calculations are correct.',
            '<strong>Consider Physical Reasonableness:</strong> Does the result make sense? A car tire rotating 1000 rad in 1 second would mean about 160 revolutions per second (9600 RPM) - unrealistic for a car tire, possible for a hard drive.',
            '<strong>Link to Linear Motion:</strong> Remember s = rθ connects angular and linear displacement. Use this to verify results make physical sense by calculating actual distances traveled at known radii.'
          ]}
        />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is angular displacement and how is it different from linear displacement?',
            answer: 'Angular displacement (θ) is the angle through which an object rotates about a fixed axis, measured in radians, degrees, or revolutions. Linear displacement is the straight-line distance between starting and ending positions. For a rotating object, angular displacement is the same for all points on the object, while linear displacement varies with distance from the rotation axis (s = rθ). Angular displacement describes rotation; linear displacement describes translation.'
          },
          {
            question: 'How do you calculate angular displacement with the formula θ = ωt?',
            answer: 'The formula θ = ωt applies when angular velocity (ω) is constant. Multiply the angular velocity in rad/s by the time in seconds to get angular displacement in radians. For example, if ω = 10 rad/s and t = 5s, then θ = 10 × 5 = 50 rad. Remember to convert other units to rad/s first: 1 rpm = 2π/60 rad/s ≈ 0.1047 rad/s. After calculating, you can convert radians to degrees (multiply by 180/π) or revolutions (divide by 2π).'
          },
          {
            question: 'What is the difference between angular displacement and angular distance?',
            answer: 'Angular displacement is a vector quantity representing the net rotation from start to finish, including direction (sign). Angular distance is a scalar representing the total angle traveled regardless of direction. Example: if an object rotates 1.5 revolutions clockwise then 0.5 revolutions counterclockwise, the angular distance is 2 revolutions (4π rad total traveled), but the angular displacement is -1 revolution (-2π rad net rotation, ending 1 revolution clockwise from start).'
          },
          {
            question: 'How do you convert revolutions to radians and degrees?',
            answer: 'To convert revolutions to radians, multiply by 2π: θ(rad) = n × 2π. To convert to degrees, multiply by 360: θ(°) = n × 360. Conversely, radians to revolutions: n = θ/(2π), and degrees to revolutions: n = θ/360. Example: 5 revolutions = 5 × 2π = 10π rad ≈ 31.42 rad = 1800°. These conversions are essential because physics formulas require radians, but practical measurements often use revolutions or degrees.'
          },
          {
            question: 'How is angular displacement related to arc length?',
            answer: 'Arc length (s) is the linear distance traveled along a circular path, related to angular displacement by s = rθ, where r is the radius and θ must be in radians. This means a point at radius r travels a linear distance of rθ along the arc. Points farther from the rotation axis (larger r) travel greater distances for the same angular displacement. Example: for θ = 2π rad (one complete circle) and r = 1m, the arc length is s = 1 × 2π ≈ 6.28m, which is the circumference.'
          },
          {
            question: 'What angular displacement formula do I use with angular acceleration?',
            answer: 'For constant angular acceleration, use θ = ω₀t + ½αt² (displacement over time) or θ = (ωf² - ω₀²)/(2α) (displacement from velocity change). The first requires knowing time, the second doesn\'t. If starting from rest (ω₀ = 0), simplifies to θ = ½αt². Also useful: θ = (ω₀ + ωf)t/2 using average velocity. Choose based on which quantities you know. These are rotational analogs of linear kinematic equations.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
