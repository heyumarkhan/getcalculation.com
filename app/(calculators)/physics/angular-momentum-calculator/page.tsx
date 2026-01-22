import AngularMomentumCalculator from '../../../_components/calculators/AngularMomentumCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Angular Momentum Calculator | L = Iω, mvr, Torque & Conservation';
const description = 'Calculate angular momentum for rotating objects and particles. Find L = Iω, mvr, apply conservation laws, and analyze torque effects with instant results.';
const keywords = [
  'angular momentum calculator',
  'moment of inertia calculator',
  'rotational motion calculator',
  'conservation of angular momentum',
  'torque calculator',
  'angular velocity calculator',
  'L = Iω calculator',
  'L = mvr calculator',
  'rotational dynamics',
  'angular impulse calculator',
  'spinning motion calculator',
  'gyroscope calculator',
  'circular motion physics',
  'rotational kinetic energy',
  'angular momentum formula',
  'physics calculator',
  'moment of inertia units',
  'rad/s to rpm converter',
  'rotational mechanics',
  'angular momentum conservation',
  'torque and angular momentum',
  'ice skater physics',
  'planetary orbit calculator',
  'quantum angular momentum'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/angular-momentum-calculator'
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/angular-momentum-calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  }
};

export default function AngularMomentumCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Angular Momentum Calculator"
      description="Calculate angular momentum for rotating objects, particles in circular motion, conservation problems, and torque effects. Supports multiple calculation methods with comprehensive unit conversion."
      calculator={<AngularMomentumCalculator />}
      slug="physics/angular-momentum-calculator"
      category="Physics"
      features={[
        'Calculate rotational angular momentum (L = Iω)',
        'Calculate particle angular momentum (L = mvr)',
        'Apply conservation of angular momentum',
        'Analyze torque and angular impulse (τ = dL/dt)',
        'Multiple unit systems with automatic conversion',
        'Step-by-step calculations with detailed results'
      ]}
    >
      <SEOSection title="What is Angular Momentum?">
        <p>
          Angular momentum (L) is a fundamental quantity in rotational motion that measures the rotational inertia and angular velocity of a rotating object or particle moving in a curved path. It is the rotational analog of linear momentum (p = mv) and is conserved in isolated systems, making it crucial for understanding everything from spinning tops to planetary orbits.
        </p>
        <p>
          For a rigid body rotating about a fixed axis, angular momentum is given by <strong>L = Iω</strong>, where I is the moment of inertia and ω is the angular velocity. For a point mass or particle in circular motion, it's expressed as <strong>L = mvr</strong> or more generally as the cross product <strong>L = r × p</strong>, where r is the position vector and p is linear momentum.
        </p>
        <p>
          Angular momentum is a vector quantity directed along the axis of rotation (using the right-hand rule) and is measured in kg·m²/s or J·s in SI units. Its conservation is one of the most powerful principles in physics, explaining phenomena from ice skaters spinning faster when they pull their arms in to the stability of gyroscopes.
        </p>
      </SEOSection>

      <SEOSection title="Angular Momentum Formulas">
        <p><strong>Rotational Angular Momentum:</strong></p>
        <ul>
          <li><strong>L = Iω</strong> - Basic rotational formula (moment of inertia × angular velocity)</li>
          <li><strong>ω = L/I</strong> - Angular velocity from angular momentum</li>
          <li><strong>I = L/ω</strong> - Moment of inertia from angular momentum</li>
        </ul>

        <p className="mt-4"><strong>Particle Angular Momentum:</strong></p>
        <ul>
          <li><strong>L = mvr</strong> - For circular motion (perpendicular case)</li>
          <li><strong>L = r × p = rp sin θ</strong> - General vector cross product</li>
          <li><strong>L = mr²ω</strong> - Alternative form using angular velocity</li>
        </ul>

        <p className="mt-4"><strong>Conservation of Angular Momentum:</strong></p>
        <ul>
          <li><strong>L₁ = L₂</strong> - Total angular momentum remains constant</li>
          <li><strong>I₁ω₁ = I₂ω₂</strong> - Conservation for changing moment of inertia</li>
          <li><strong>ω₂ = ω₁(I₁/I₂)</strong> - Final angular velocity after inertia change</li>
        </ul>

        <p className="mt-4"><strong>Torque and Angular Momentum:</strong></p>
        <ul>
          <li><strong>τ = dL/dt</strong> - Torque is the rate of change of angular momentum</li>
          <li><strong>ΔL = τ·Δt</strong> - Angular impulse (change in angular momentum)</li>
          <li><strong>τ = Iα</strong> - Torque from angular acceleration (alternative form)</li>
        </ul>

        <p className="mt-4"><strong>Related Quantities:</strong></p>
        <ul>
          <li><strong>KE = ½Iω² = L²/(2I)</strong> - Rotational kinetic energy</li>
          <li><strong>p = mv</strong> - Linear momentum</li>
          <li><strong>ω = v/r</strong> - Angular velocity for circular motion</li>
        </ul>
      </SEOSection>

      <SEOSection title="Moment of Inertia for Common Objects">
        <p>The moment of inertia depends on the object's mass distribution and axis of rotation:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Object</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Axis of Rotation</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Moment of Inertia (I)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Point mass</td>
                <td className="border border-gray-300 px-4 py-2">Distance r from axis</td>
                <td className="border border-gray-300 px-4 py-2">I = mr²</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Solid disk/cylinder</td>
                <td className="border border-gray-300 px-4 py-2">Through center</td>
                <td className="border border-gray-300 px-4 py-2">I = ½mr²</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Hollow cylinder/hoop</td>
                <td className="border border-gray-300 px-4 py-2">Through center</td>
                <td className="border border-gray-300 px-4 py-2">I = mr²</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Solid sphere</td>
                <td className="border border-gray-300 px-4 py-2">Through center</td>
                <td className="border border-gray-300 px-4 py-2">I = (2/5)mr²</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Hollow sphere</td>
                <td className="border border-gray-300 px-4 py-2">Through center</td>
                <td className="border border-gray-300 px-4 py-2">I = (2/3)mr²</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Thin rod</td>
                <td className="border border-gray-300 px-4 py-2">Through center</td>
                <td className="border border-gray-300 px-4 py-2">I = (1/12)mL²</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Thin rod</td>
                <td className="border border-gray-300 px-4 py-2">Through end</td>
                <td className="border border-gray-300 px-4 py-2">I = (1/3)mL²</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Rectangular plate</td>
                <td className="border border-gray-300 px-4 py-2">Through center</td>
                <td className="border border-gray-300 px-4 py-2">I = (1/12)m(a² + b²)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          where m is mass, r is radius, L is length, and a, b are the dimensions of the rectangular plate.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Conservation of Angular Momentum">
        <p>
          The law of conservation of angular momentum states that if no external torque acts on a system, the total angular momentum remains constant. This is expressed as:
        </p>
        <p className="font-semibold mt-2">L₁ = L₂ or I₁ω₁ = I₂ω₂</p>
        <p className="mt-2">
          This principle explains many fascinating phenomena:
        </p>

        <p className="mt-4"><strong>Ice Skater Effect:</strong></p>
        <p>
          When a figure skater pulls their arms inward during a spin, their moment of inertia decreases (I₂ &lt; I₁). To conserve angular momentum, their angular velocity must increase (ω₂ &gt; ω₁), causing them to spin faster. When they extend their arms, the opposite occurs.
        </p>

        <p className="mt-4"><strong>Diver's Somersault:</strong></p>
        <p>
          A diver can control their rotation speed in mid-air by changing body position. Tucking into a ball reduces moment of inertia and increases rotation speed, while extending the body slows rotation for a clean water entry.
        </p>

        <p className="mt-4"><strong>Planetary Orbits:</strong></p>
        <p>
          Planets move faster when closer to the sun (perihelion) and slower when farther away (aphelion). As the orbital radius decreases, angular velocity increases to conserve angular momentum, explaining Kepler's second law.
        </p>

        <p className="mt-4"><strong>Energy Considerations:</strong></p>
        <p>
          While angular momentum is conserved, rotational kinetic energy may change. When a skater pulls in their arms, work is done against centrifugal effects, increasing their kinetic energy even though angular momentum stays constant. The energy comes from muscular work.
        </p>
      </SEOSection>

      <SEOSection title="Torque and Angular Momentum Relationship">
        <p>
          Torque (τ) is the rotational analog of force and represents the rate of change of angular momentum:
        </p>
        <p className="font-semibold mt-2">τ = dL/dt</p>
        <p className="mt-2">
          This relationship is Newton's second law for rotation. Just as force causes a change in linear momentum (F = dp/dt), torque causes a change in angular momentum. For a finite time interval:
        </p>
        <p className="font-semibold mt-2">ΔL = τ·Δt (Angular Impulse)</p>

        <p className="mt-4"><strong>Applications of Torque-Angular Momentum:</strong></p>
        
        <p className="mt-3"><strong>1. Gyroscopes:</strong></p>
        <p>
          When a torque is applied to a spinning gyroscope, it doesn't tilt in the expected direction. Instead, the change in angular momentum is perpendicular to both the torque and the existing angular momentum, causing precession. This principle is used in navigation systems and stability control.
        </p>

        <p className="mt-3"><strong>2. Braking Systems:</strong></p>
        <p>
          Friction brakes apply a torque opposite to the wheel's rotation, reducing angular momentum over time. The stopping distance depends on the magnitude of the braking torque and the initial angular momentum.
        </p>

        <p className="mt-3"><strong>3. Motor Acceleration:</strong></p>
        <p>
          Electric motors produce torque to increase the angular momentum of rotating parts. The time required to reach operating speed depends on the motor torque and the total moment of inertia of all rotating components.
        </p>

        <p className="mt-3"><strong>4. Satellite Attitude Control:</strong></p>
        <p>
          Satellites use reaction wheels or control moment gyroscopes to change their orientation. By applying internal torques to spin up or slow down these wheels, they can alter their angular momentum without external forces.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Angular Momentum">
        <SEOList
          items={[
            '<strong>Figure Skating and Gymnastics:</strong> Athletes manipulate their moment of inertia to control rotation speed during spins, jumps, and aerial maneuvers, demonstrating conservation of angular momentum.',
            '<strong>Gyroscopes and Navigation:</strong> Gyroscopes maintain orientation due to conservation of angular momentum, used in aircraft instruments, smartphones, and inertial navigation systems for ships and spacecraft.',
            '<strong>Planetary Motion:</strong> Angular momentum explains planetary and satellite orbits, Kepler\'s laws of planetary motion, and why planets sweep out equal areas in equal times (Kepler\'s second law).',
            '<strong>Atomic and Quantum Physics:</strong> Electrons in atoms possess quantized angular momentum, fundamental to atomic structure, spectroscopy, and understanding chemical bonding and electron orbitals.',
            '<strong>Rotational Machinery:</strong> Flywheels store energy in rotational form using high angular momentum, providing smooth power delivery in engines and energy storage systems.',
            '<strong>Helicopter and Drone Stability:</strong> Counter-rotating rotors or tail rotors balance angular momentum to prevent unwanted rotation of the aircraft body, essential for stable flight control.',
            '<strong>Astronomy and Astrophysics:</strong> Angular momentum explains galaxy rotation, black hole formation, pulsar spin, and the formation of planetary systems from rotating gas clouds.',
            '<strong>Sports Equipment:</strong> Spinning balls (football spirals, golf ball backspin) use angular momentum for stability and trajectory control; spinning wheels on bicycles provide gyroscopic stability.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Calculation Examples">
        <p><strong>Example 1: Rotating Disk</strong></p>
        <p className="mt-2">
          A solid disk with mass m = 5 kg and radius r = 0.4 m rotates at ω = 20 rad/s. Calculate its angular momentum.
        </p>
        <p className="mt-2">
          For a solid disk: I = ½mr² = ½(5)(0.4)² = 0.4 kg·m²<br />
          Angular momentum: L = Iω = 0.4 × 20 = <strong>8 kg·m²/s</strong>
        </p>

        <p className="mt-4"><strong>Example 2: Particle in Circular Motion</strong></p>
        <p className="mt-2">
          A 2 kg mass moves in a circle of radius 3 m at speed 10 m/s. Find its angular momentum.
        </p>
        <p className="mt-2">
          L = mvr = 2 × 10 × 3 = <strong>60 kg·m²/s</strong><br />
          Angular velocity: ω = v/r = 10/3 = 3.33 rad/s<br />
          Verification: L = mr²ω = 2(3²)(3.33) = 60 kg·m²/s ✓
        </p>

        <p className="mt-4"><strong>Example 3: Ice Skater (Conservation)</strong></p>
        <p className="mt-2">
          A skater with I₁ = 3 kg·m² spins at ω₁ = 5 rad/s. She pulls in her arms, reducing I to I₂ = 1.5 kg·m². Find her new angular velocity.
        </p>
        <p className="mt-2">
          Initial L: L = I₁ω₁ = 3 × 5 = 15 kg·m²/s<br />
          Final velocity: ω₂ = L/I₂ = 15/1.5 = <strong>10 rad/s</strong><br />
          She spins twice as fast! Initial KE = ½(3)(5²) = 37.5 J<br />
          Final KE = ½(1.5)(10²) = 75 J (energy increased due to work done)
        </p>

        <p className="mt-4"><strong>Example 4: Torque Application</strong></p>
        <p className="mt-2">
          A torque of 12 N·m is applied to a wheel for 3 seconds. If the wheel initially has L₀ = 20 kg·m²/s, find its final angular momentum.
        </p>
        <p className="mt-2">
          Change in L: ΔL = τΔt = 12 × 3 = 36 kg·m²/s<br />
          Final L: Lf = L₀ + ΔL = 20 + 36 = <strong>56 kg·m²/s</strong>
        </p>
      </SEOSection>

      <SEOSection title="Tips for Angular Momentum Calculations">
        <SEOList
          items={[
            '<strong>Use Consistent Units:</strong> Convert all quantities to SI units (kg, m, rad/s) before calculating. Angular velocity must be in radians per second, not RPM or degrees per second.',
            '<strong>Identify the Correct Formula:</strong> Use L = Iω for rigid rotating bodies and L = mvr for point particles in circular motion. For general cases, use L = r × p (cross product).',
            '<strong>Direction Matters:</strong> Angular momentum is a vector. Use the right-hand rule: curl fingers in the direction of rotation, thumb points in L direction. Counterclockwise is typically positive.',
            '<strong>Check Conservation Conditions:</strong> Angular momentum is only conserved when net external torque is zero. Internal forces (like pulling arms in) don\'t affect total angular momentum.',
            '<strong>Calculate Moment of Inertia Correctly:</strong> Use the appropriate formula for the object\'s shape and axis. For complex objects, sum individual contributions: I_total = I₁ + I₂ + ...',
            '<strong>Watch for Sign Conventions:</strong> Positive torque increases angular momentum; negative torque (braking) decreases it. Ensure torque direction aligns with your coordinate system.',
            '<strong>Energy vs. Momentum:</strong> Remember that angular momentum can be conserved while rotational kinetic energy changes (or vice versa). They are independent conservation laws.',
            '<strong>Verify with Alternative Methods:</strong> For particles, check that L = mvr = Iω where I = mr². Both methods should give the same result for circular motion.'
          ]}
        />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the difference between angular momentum and linear momentum?',
            answer: 'Linear momentum (p = mv) describes translational motion in a straight line, while angular momentum (L = Iω or L = r × p) describes rotational motion. Linear momentum depends on mass and velocity; angular momentum depends on moment of inertia (or position) and angular velocity. Both are conserved quantities but apply to different types of motion. Angular momentum is a vector perpendicular to the plane of rotation, while linear momentum is along the direction of motion.'
          },
          {
            question: 'Why does an ice skater spin faster when pulling their arms in?',
            answer: 'When an ice skater pulls their arms inward, their moment of inertia (I) decreases because mass is brought closer to the axis of rotation. According to conservation of angular momentum (L = Iω = constant), if I decreases, angular velocity (ω) must increase proportionally to keep L constant. Since external torque from ice friction is minimal, L remains nearly constant, causing the skater to spin faster. The increased kinetic energy comes from muscular work done while pulling arms in.'
          },
          {
            question: 'How is torque related to angular momentum?',
            answer: 'Torque (τ) is the rate of change of angular momentum: τ = dL/dt. This is Newton\'s second law for rotation, analogous to F = dp/dt for linear motion. A net torque causes angular momentum to change over time. If no external torque acts on a system (τ = 0), then dL/dt = 0, meaning angular momentum is conserved. The angular impulse (change in L) equals torque multiplied by time: ΔL = τ·Δt.'
          },
          {
            question: 'What are the units of angular momentum?',
            answer: 'In SI units, angular momentum is measured in kg·m²/s (kilogram-meter squared per second) or equivalently J·s (joule-seconds). From L = Iω: I is in kg·m² and ω is in rad/s (radians per second are dimensionless), giving kg·m²/s. From L = mvr: mass (kg) × velocity (m/s) × radius (m) also gives kg·m²/s. In quantum mechanics, angular momentum is often expressed in units of ℏ (reduced Planck constant) = 1.055 × 10⁻³⁴ J·s.'
          },
          {
            question: 'Can angular momentum be negative?',
            answer: 'Yes, angular momentum can be negative depending on the direction of rotation and your chosen coordinate system. By convention, counterclockwise rotation (when viewed from above) is typically positive, and clockwise is negative. The sign indicates the direction of the angular momentum vector along the axis of rotation (using the right-hand rule). In conservation problems, opposite rotations can cancel: if two objects rotate in opposite directions, their angular momenta have opposite signs and the total L is the algebraic sum.'
          },
          {
            question: 'How do you calculate moment of inertia for different shapes?',
            answer: 'Moment of inertia (I) depends on both mass distribution and axis of rotation. Common formulas: solid disk (I = ½mr²), hollow cylinder (I = mr²), solid sphere (I = 2/5mr²), thin rod through center (I = 1/12mL²), and point mass (I = mr²). For complex objects, use the parallel axis theorem: I = I_cm + md², where I_cm is moment of inertia about the center of mass and d is the distance to the new axis. For composite objects, sum individual moments of inertia.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
