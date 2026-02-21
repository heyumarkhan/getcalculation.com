import AngularMomentumCalculator from '../../../_components/calculators/AngularMomentumCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

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
      <SEOSection title="Why Understanding Angular Momentum is Critical for Rotational Systems">
        <p>
          Angular momentum is the fundamental quantity that determines how rotating objects behave when forces act upon them—from the precise gyroscopic stability keeping satellites oriented in space to the dramatic spin acceleration when a figure skater pulls their arms inward during a triple axel. Engineers designing flywheel energy storage systems must calculate angular momentum to optimize rotational inertia for maximum energy capacity, while aerospace engineers rely on angular momentum conservation to control spacecraft attitude without expending fuel. In quantum mechanics, angular momentum becomes quantized, explaining electron shell structure and the magnetic properties of atoms that enable MRI scanners and quantum computers. Without accurate angular momentum calculations, helicopter tail rotor design would be impossible (preventing catastrophic spin), turbine efficiency would drop dramatically, and even simple bicycle stability at speed would remain a mystery.
        </p>
        <p>
          This calculator handles the complex mathematics of angular momentum using L = Iω for rigid body rotation, L = mvr for point particles in circular motion, and conservation principles for system analysis. Whether you're determining how much {createInternalLink('torque-calculator')} force is required to change a wheel's rotation rate or calculating the {createInternalLink('angular-velocity-calculator')} increase when redistributing mass closer to an axis, accurate angular momentum calculations prevent mechanical failures, optimize performance, and deepen understanding of rotational physics from macroscopic machinery to subatomic particles.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation mode—rigid body rotation (L = Iω), point particle circular motion (L = mvr), conservation of angular momentum (I₁ω₁ = I₂ω₂), or torque-angular momentum relationship (τ = ΔL/Δt). Each mode requires different input parameters.</li>
          <li><strong>Step 2:</strong> Enter your known values with appropriate units. For rigid body mode, input moment of inertia (kg·m²) and angular velocity (rad/s or rpm). For particle mode, enter mass (kg), tangential velocity (m/s), and radius (m). For conservation problems, provide initial and final moment of inertia or angular velocities.</li>
          <li><strong>Step 3:</strong> Click calculate to instantly obtain angular momentum in kg·m²/s (or J·s). The calculator displays step-by-step work showing which formula was applied, unit conversions performed, and intermediate calculations for verification and learning.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Angular Momentum Formula">
        <p>
          Angular momentum (L) is the rotational analog of linear momentum, quantifying how much rotational motion an object possesses. For rigid bodies rotating about a fixed axis, the fundamental relationship connects moment of inertia and angular velocity. The formula depends on whether you're analyzing a rigid rotating object or a point particle in circular motion.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">L = Iω (rigid body rotation)</p>
          <p className="font-mono text-lg font-bold mt-2">L = mvr (point particle circular motion)</p>
          <p className="font-mono text-lg font-bold mt-2">I₁ω₁ = I₂ω₂ (conservation of angular momentum)</p>
        </div>
        <p>
          Where <strong>L</strong> = angular momentum (kg·m²/s), <strong>I</strong> = moment of inertia (kg·m²), <strong>ω</strong> = angular velocity (rad/s), <strong>m</strong> = mass (kg), <strong>v</strong> = tangential velocity (m/s), and <strong>r</strong> = radius from rotation axis (m). Conservation of angular momentum states that when no external torque acts on a system, total angular momentum remains constant—explaining why ice skaters spin faster when pulling their arms in (decreasing I forces ω to increase), why planets sweep equal areas in equal times (Kepler's second law), and how helicopters prevent body rotation.
        </p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          A flywheel (solid disk) with mass 12 kg and radius 0.5 m rotates at 300 rpm. First, convert angular velocity: ω = 300 rpm × (2π/60) = 31.42 rad/s. The moment of inertia for a solid disk is I = ½mr² = ½(12 kg)(0.5 m)² = 1.5 kg·m². Applying L = Iω:
        </p>
        <ul>
          <li>Input: I = 1.5 kg·m², ω = 31.42 rad/s</li>
          <li>Calculation: L = 1.5 × 31.42</li>
          <li>Result: <strong>L = 47.13 kg·m²/s</strong></li>
        </ul>
        <p className="mt-2">
          If braking torque τ = 15 N·m is applied for 2 seconds, the change in angular momentum is ΔL = τ·Δt = 15 × 2 = 30 kg·m²/s, reducing the flywheel's angular momentum to 47.13 - 30 = 17.13 kg·m²/s, and decreasing angular velocity to ω = L/I = 17.13/1.5 = 11.42 rad/s (109 rpm).
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications of Angular Momentum">
        <SEOList
          items={[
            '<strong>Figure Skating and Gymnastics:</strong> Athletes manipulate their moment of inertia during spins and aerial maneuvers. By pulling arms or legs closer to the body, they decrease I and increase ω (conservation of L), spinning faster. Extending limbs slows rotation for controlled landings.',
            '<strong>Gyroscopes and Navigation Systems:</strong> Gyroscopes maintain orientation due to conservation of angular momentum, resisting external torques. Used in aircraft instruments, spacecraft attitude control, smartphone orientation sensors, and inertial navigation for ships and submarines.',
            '<strong>Planetary Motion and Astrophysics:</strong> Angular momentum explains planetary orbits, Kepler\'s laws, and why planets sweep equal areas in equal times. Conservation governs galaxy rotation, black hole accretion disks, pulsar spin rates, and planetary system formation from rotating gas clouds.',
            '<strong>Automotive Engineering:</strong> Flywheels store rotational energy using high angular momentum, providing smooth power delivery in engines. Braking systems apply torque to reduce angular momentum of wheels. Vehicle stability control systems monitor and adjust angular momentum during turns.',
            '<strong>Helicopter and Drone Stability:</strong> Counter-rotating rotors or tail rotors balance angular momentum to prevent unwanted aircraft body rotation. Reaction wheels in satellites change angular momentum without external forces, enabling precise attitude control.',
            '<strong>Quantum Mechanics and Atomic Physics:</strong> Electrons possess quantized angular momentum in atomic orbitals, fundamental to understanding atomic structure, chemical bonding, spectroscopy, and magnetic properties of materials. Spin angular momentum is intrinsic to elementary particles.',
            '<strong>Sports Physics:</strong> Spinning footballs maintain stable flight (spiral), golf ball backspin increases lift, and baseball curve balls exploit Magnus effect. Bicycle wheels provide gyroscopic stability at speed. Discus and hammer throw techniques maximize angular momentum for distance.',
            '<strong>Industrial Machinery:</strong> Turbines, motors, and rotating equipment are designed considering angular momentum for efficiency and safety. Sudden load changes can cause dangerous torques. Balancing rotating parts minimizes vibration and bearing wear.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is angular momentum and how is it different from linear momentum?",
            answer: "Angular momentum (L) is the rotational equivalent of linear momentum, measuring the amount of rotational motion an object possesses. While linear momentum is p = mv (mass × velocity), angular momentum for rigid bodies is L = Iω (moment of inertia × angular velocity). For point particles in circular motion, L = mvr where r is the distance from the rotation axis. Angular momentum is a vector quantity directed along the rotation axis (determined by the right-hand rule) with units of kg·m²/s. The key difference is that angular momentum depends not just on mass and velocity, but also on how that mass is distributed relative to the rotation axis—objects with mass farther from the axis have greater angular momentum at the same angular speed."
          },
          {
            question: "Why does an ice skater spin faster when pulling their arms inward?",
            answer: "This dramatic effect demonstrates conservation of angular momentum. When a skater pulls their arms and legs closer to their body during a spin, they reduce their moment of inertia (I) because mass moves closer to the rotation axis. Since ice provides negligible external torque, angular momentum L must remain constant (L = Iω = constant). If I decreases while L stays constant, angular velocity ω must increase proportionally—the skater spins faster. A skater might reduce I from 3 kg·m² to 0.5 kg·m² (6× reduction), causing spin rate to increase from 1 to 6 revolutions per second. The extra rotational kinetic energy comes from muscular work done pulling mass inward against centrifugal effects."
          },
          {
            question: "How do you calculate moment of inertia for different shapes?",
            answer: "Moment of inertia (I) measures how mass is distributed around a rotation axis and varies with object shape. Common formulas include: solid disk/cylinder I = ½mr², hollow cylinder I = mr², solid sphere I = ⅖mr², hollow sphere I = ⅔mr², thin rod through center I = 1/12 mL², rod through end I = ⅓mL², and rectangular plate through center I = 1/12 m(a²+b²). For composite objects, calculate each component's I and sum them. The parallel axis theorem extends this: I = I_cm + md², where I_cm is moment of inertia about the center of mass and d is the distance to the new parallel axis. Online calculators typically include preset shapes with automatic I calculation."
          },
          {
            question: "What is the relationship between torque and angular momentum?",
            answer: "Torque (τ) is the rate of change of angular momentum, expressed as τ = dL/dt—the rotational version of Newton's second law (F = dp/dt). A net external torque causes angular momentum to change over time. For a finite time interval, angular impulse equals change in angular momentum: ΔL = τ·Δt. For example, applying 20 N·m torque for 3 seconds changes angular momentum by ΔL = 20 × 3 = 60 kg·m²/s. If no external torque acts (τ = 0), then dL/dt = 0, meaning angular momentum is conserved. This principle explains why gyroscopes resist orientation changes—changing their angular momentum requires applying torque, making them perfect for navigation and stabilization."
          },
          {
            question: "Can angular momentum be negative, and what are its units?",
            answer: "Yes, angular momentum can be negative depending on rotation direction and coordinate system convention. Angular momentum is measured in kg·m²/s (kilogram-meter squared per second) or equivalently J·s (joule-seconds). By convention, counterclockwise rotation (when viewed from above) is typically positive, while clockwise rotation is negative, following the right-hand rule: curl your fingers in the rotation direction, and your thumb points in the angular momentum vector direction. In conservation problems, opposite rotations have opposite signs that algebraically cancel—a spinning merry-go-round with L = +100 kg·m²/s and a person walking on it with L = -20 kg·m²/s (opposite direction) yields total system angular momentum of 80 kg·m²/s."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering angular momentum calculations is fundamental for understanding rotational motion across physics and engineering—from predicting how flywheel energy storage systems perform to analyzing satellite attitude control, designing stable gyroscopes, or even explaining why bicycle wheels provide stability at speed. This Angular Momentum Calculator eliminates the complex mathematics of moment of inertia distributions and conservation principles, delivering instant, accurate results for rigid body rotation, point particle circular motion, and torque-induced angular momentum changes.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('kinetic-energy-calculator')} to analyze the rotational energy associated with angular momentum.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
