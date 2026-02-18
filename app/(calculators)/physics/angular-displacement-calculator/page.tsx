import AngularDisplacementCalculator from '../../../_components/calculators/AngularDisplacementCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

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
      <SEOSection title="Why Angular Displacement Matters in Rotational Motion">
        <p>
          Angular displacement is a fundamental concept in rotational kinematics that describes how far an object has rotated about an axis. Whether you're calculating wheel rotations for vehicle distance traveled, designing gear systems for machinery, analyzing planetary orbits, or programming robotic arm movements, understanding angular displacement is essential. This calculator helps engineers, physics students, and designers quickly determine rotation angles, convert between units, and solve complex rotational motion problems with instant, accurate results.
        </p>
        <p>
          From motors and turbines spinning thousands of revolutions per minute to Earth's daily rotation and satellite orbital mechanics, angular displacement calculations are everywhere in physics and engineering. Our tool integrates seamlessly with related calculations like {createInternalLink('angular-velocity-calculator')} for determining rotation rates, {createInternalLink('angular-frequency-calculator')} for analyzing oscillation and rotation frequencies, and {createInternalLink('torque-calculator')} for rotational force dynamics, providing a comprehensive rotational motion analysis toolkit.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Angular Displacement Calculator">
        <p>Follow these simple steps to calculate angular displacement accurately:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation mode - constant angular velocity (θ = ωt), constant acceleration (θ = ω₀t + ½αt²), velocity change (ωf² = ω₀² + 2αθ), or revolutions to displacement conversion.</li>
          <li><strong>Step 2:</strong> Enter your known values such as angular velocity (ω), time (t), angular acceleration (α), initial/final velocities, or number of revolutions. The calculator accepts multiple units including rad/s, rpm, degrees, radians, and revolutions.</li>
          <li><strong>Step 3:</strong> Review comprehensive results showing angular displacement in radians, degrees, and revolutions, plus additional calculations like arc length, final velocity, or time depending on the selected mode.</li>
          <li><strong>Step 4:</strong> Verify your results make physical sense - check that rotation speeds and displacements are reasonable for your application (e.g., a car tire vs. a hard drive platter).</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Angular Displacement Formula">
        <p>
          Angular displacement (θ, theta) represents the angle through which an object rotates about a fixed axis. It's the rotational equivalent of linear displacement, measuring how far something has turned from its starting position. The simplest formula for constant angular velocity is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">θ = ωt</p>
        </div>
        <p>
          Where <strong>θ</strong> (theta) is angular displacement in radians, <strong>ω</strong> (omega) is angular velocity in rad/s, and <strong>t</strong> is time in seconds. This fundamental relationship shows that angular displacement equals angular velocity multiplied by time - the rotational analog of distance = speed × time.
        </p>
        <p className="mt-4">
          For situations involving angular acceleration (α), the formula expands to:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">θ = ω₀t + ½αt²</p>
        </div>
        <p>
          Where <strong>ω₀</strong> is initial angular velocity and <strong>α</strong> is angular acceleration in rad/s². When you know velocity change but not time, use:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">ωf² = ω₀² + 2αθ</p>
        </div>
        <p>
          Rearranged: <strong>θ = (ωf² - ω₀²)/(2α)</strong>. These equations parallel linear kinematics, making them intuitive once you understand translational motion.
        </p>

        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A motor accelerates from rest to 3000 RPM in 5 seconds with constant acceleration. Find the angular displacement during acceleration.</p>
        <ul>
          <li><strong>Given:</strong> ω₀ = 0 (starts from rest), ωf = 3000 RPM, t = 5s</li>
          <li><strong>Step 1:</strong> Convert RPM to rad/s: ωf = 3000 × (2π/60) = 100π rad/s ≈ 314.16 rad/s</li>
          <li><strong>Step 2:</strong> Find angular acceleration: α = (ωf - ω₀)/t = 314.16/5 = 62.83 rad/s²</li>
          <li><strong>Step 3:</strong> Calculate displacement: θ = ω₀t + ½αt² = 0 + ½(62.83)(25) = 785.4 rad</li>
          <li><strong>Alternative:</strong> Using average velocity: θ = (ω₀ + ωf)t/2 = (0 + 314.16)(5)/2 = 785.4 rad ✓</li>
          <li><strong>Convert:</strong> 785.4 rad = 785.4/(2π) ≈ 125 revolutions = 45,000°</li>
          <li><strong>Result:</strong> The motor rotates through 785.4 radians or 125 complete revolutions</li>
        </ul>
      </SEOSection>
      <SEOSection title="The Core Concept: Angular Displacement Formula">
        <p>
          Angular displacement (θ, theta) represents the angle through which an object rotates about a fixed axis. It's the rotational equivalent of linear displacement, measuring how far something has turned from its starting position. The simplest formula for constant angular velocity is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">θ = ωt</p>
        </div>
        <p>
          Where <strong>θ</strong> (theta) is angular displacement in radians, <strong>ω</strong> (omega) is angular velocity in rad/s, and <strong>t</strong> is time in seconds. This fundamental relationship shows that angular displacement equals angular velocity multiplied by time - the rotational analog of distance = speed × time.
        </p>
        <p className="mt-4">
          For situations involving angular acceleration (α), the formula expands to:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">θ = ω₀t + ½αt²</p>
        </div>
        <p>
          Where <strong>ω₀</strong> is initial angular velocity and <strong>α</strong> is angular acceleration in rad/s². When you know velocity change but not time, use:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">ωf² = ω₀² + 2αθ</p>
        </div>
        <p>
          Rearranged: <strong>θ = (ωf² - ω₀²)/(2α)</strong>. These equations parallel linear kinematics, making them intuitive once you understand translational motion.
        </p>

        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A motor accelerates from rest to 3000 RPM in 5 seconds with constant acceleration. Find the angular displacement during acceleration.</p>
        <ul>
          <li><strong>Given:</strong> ω₀ = 0 (starts from rest), ωf = 3000 RPM, t = 5s</li>
          <li><strong>Step 1:</strong> Convert RPM to rad/s: ωf = 3000 × (2π/60) = 100π rad/s ≈ 314.16 rad/s</li>
          <li><strong>Step 2:</strong> Find angular acceleration: α = (ωf - ω₀)/t = 314.16/5 = 62.83 rad/s²</li>
          <li><strong>Step 3:</strong> Calculate displacement: θ = ω₀t + ½αt² = 0 + ½(62.83)(25) = 785.4 rad</li>
          <li><strong>Alternative:</strong> Using average velocity: θ = (ω₀ + ωf)t/2 = (0 + 314.16)(5)/2 = 785.4 rad ✓</li>
          <li><strong>Convert:</strong> 785.4 rad = 785.4/(2π) ≈ 125 revolutions = 45,000°</li>
          <li><strong>Result:</strong> The motor rotates through 785.4 radians or 125 complete revolutions</li>
        </ul>
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

      <SEOSection title="Practical Applications of Angular Displacement">
        <SEOList
          items={[
            '<strong>Automotive Engineering:</strong> Calculate distance traveled from wheel rotations, design speedometer systems, analyze tire wear patterns, and determine gear ratios. Essential for transmission design, odometer calibration, and vehicle dynamics analysis.',
            '<strong>Rotating Machinery and Motors:</strong> Track shaft rotations in turbines, engines, pumps, and motors. Determine work output, analyze acceleration profiles, calculate energy consumption, and design control systems for precise positioning in industrial automation.',
            '<strong>Robotics and Servo Control:</strong> Program robotic arm joint angles, control gripper positioning, plan motion trajectories, and implement closed-loop feedback systems using encoder measurements of angular displacement for precision automation.',
            '<strong>Astronomy and Space:</strong> Calculate planetary positions, satellite orbital parameters, Earth\'s rotation effects, precession of equinoxes, and celestial body movements. Predict positions for navigation, telescopic observation, and space mission planning.',
            '<strong>Hard Drives and Data Storage:</strong> Determine read/write head positioning on spinning platters, calculate data track access times, optimize seek algorithms, and analyze rotational latency in computer storage systems operating at thousands of RPM.',
            '<strong>Sports Biomechanics:</strong> Analyze rotation in figure skating spins, diving somersaults, gymnastics twists, golf swings, and baseball pitches. Measure angular displacement to optimize athletic performance, improve technique, and prevent injuries.',
            '<strong>Navigation and Gyroscopes:</strong> Measure orientation changes in aircraft, ships, spacecraft, and smartphones using gyroscopic instruments. Integrate angular displacement measurements for inertial navigation without external references.',
            '<strong>Clock Mechanisms:</strong> Design gear trains for watch movements, pendulum systems, and digital clock displays. Calculate hour, minute, and second hand positions, ensuring accurate timekeeping through precise angular displacement ratios.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ
          questions={[
            {
              question: 'What is angular displacement and how is it calculated?',
              answer: 'Angular displacement (θ) is the angle through which an object rotates about a fixed axis, measured in radians, degrees, or revolutions. For constant angular velocity, calculate it using θ = ωt (angular velocity × time). For constant acceleration, use θ = ω₀t + ½αt² or θ = (ωf² - ω₀²)/(2α). Angular displacement differs from linear displacement - it describes rotation, not translation. All points on a rigid rotating object have the same angular displacement, though they travel different linear distances depending on their distance from the rotation axis.'
            },
            {
              question: 'How do you convert revolutions to radians and degrees?',
              answer: 'To convert revolutions to radians: multiply by 2π (θ_rad = n × 2π). To convert to degrees: multiply by 360 (θ_deg = n × 360). Conversely, radians to revolutions: divide by 2π (n = θ/2π), and degrees to revolutions: divide by 360 (n = θ/360). Example: 5 revolutions = 10π rad ≈ 31.42 rad = 1800°. Always use radians in physics formulas like θ = ωt and s = rθ, though practical measurements often use revolutions (like engine RPM) or degrees.'
            },
            {
              question: 'What is the difference between angular displacement and angular distance?',
              answer: 'Angular displacement is a vector quantity representing net rotation from start to finish, including direction (positive for counterclockwise, negative for clockwise). Angular distance is a scalar representing total angle traveled regardless of direction. Example: if an object rotates 1.5 revolutions clockwise then 0.5 counterclockwise, angular distance = 2 revolutions (4π rad total traveled), but angular displacement = -1 revolution (-2π rad net rotation). Displacement considers the shortest path between orientations; distance counts all rotation.'
            },
            {
              question: 'How is angular displacement related to arc length?',
              answer: 'Arc length (s) is the linear distance traveled along a circular path, related by s = rθ, where r is radius and θ must be in radians. This fundamental relationship shows that points farther from the rotation axis (larger r) travel greater linear distances for the same angular displacement. Example: for one complete revolution (θ = 2π rad) at radius r = 1m, arc length s = 1 × 2π ≈ 6.28m (the circumference). This connects rotational and translational motion, essential for calculating wheel travel distances.'
            },
            {
              question: 'What formula do I use for angular displacement with acceleration?',
              answer: 'For constant angular acceleration, use θ = ω₀t + ½αt² when you know time, or θ = (ωf² - ω₀²)/(2α) when you know initial/final velocities but not time. If starting from rest (ω₀ = 0), the first simplifies to θ = ½αt². Also useful: θ = (ω₀ + ωf)t/2 using average velocity. These are rotational analogs of linear kinematic equations (like s = v₀t + ½at²). Choose based on which quantities you know: time, velocities, or acceleration.'
            }
          ]}
        />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering angular displacement calculations is essential for understanding rotational motion in physics and engineering. Whether you're designing machinery, analyzing planetary orbits, or programming robotic systems, this calculator provides instant, accurate results for all your angular displacement needs.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('angular-velocity-calculator')} or the {createInternalLink('kinetic-energy-calculator')} to complete your rotational motion analysis toolkit.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
