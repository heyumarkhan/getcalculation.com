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
      <SEOSection title="Why Angular Momentum Matters in Physics">
        <p>
          Angular momentum is one of the most fundamental concepts in rotational dynamics, describing how objects resist changes to their rotational motion. Whether you're analyzing a spinning figure skater, calculating satellite trajectories, or studying atomic electron orbitals, understanding angular momentum is essential. This calculator helps you quickly compute angular momentum using multiple methods, apply conservation laws, and analyze how torque affects rotating systems—critical for physics students, engineers, and researchers working with rotational motion.
        </p>
        <p>
          From determining the stability of gyroscopes to predicting planetary orbits, angular momentum calculations are indispensable in both classical and quantum mechanics. Our tool supports various input methods including {createInternalLink('moment-of-inertia-calculator')} calculations, {createInternalLink('angular-velocity-calculator')} conversions, and {createInternalLink('torque-calculator')} relationships, making complex rotational dynamics accessible with instant, accurate results.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Angular Momentum Calculator">
        <SEOList
          items={[
            '<strong>Select Calculation Mode:</strong> Choose between rotational angular momentum (L = Iω), particle angular momentum (L = mvr), conservation problems, or torque-related calculations based on your specific problem.',
            '<strong>Enter Known Values:</strong> Input the required parameters such as moment of inertia, angular velocity, mass, velocity, radius, or torque depending on the selected mode. The calculator accepts various unit systems.',
            '<strong>Apply Unit Conversions:</strong> Select appropriate units for each parameter (kg·m² for moment of inertia, rad/s or rpm for angular velocity, m/s for linear velocity). The calculator automatically handles conversions.',
            '<strong>Review Results:</strong> Get instant angular momentum values in kg·m²/s or J·s, along with step-by-step calculations showing the formula applied and intermediate values for verification.',
            '<strong>Explore Related Calculations:</strong> Use conservation mode to solve problems where moment of inertia changes, or torque mode to find how angular momentum changes over time with applied torque.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Core Concept: Angular Momentum Formula and Conservation">
        <p>
          Angular momentum (L) quantifies the rotational motion of objects and is calculated using different formulas depending on the situation. For rigid bodies rotating about a fixed axis, the fundamental formula is:
        </p>
        <p className="font-semibold text-center my-4 text-lg">L = Iω</p>
        <p>
          Where <strong>L</strong> is angular momentum (kg·m²/s), <strong>I</strong> is moment of inertia (kg·m²), and <strong>ω</strong> is angular velocity (rad/s). For a point particle in circular motion, the formula becomes:
        </p>
        <p className="font-semibold text-center my-4 text-lg">L = mvr</p>
        <p>
          Where <strong>m</strong> is mass (kg), <strong>v</strong> is tangential velocity (m/s), and <strong>r</strong> is radius from the axis (m). The most general form uses the cross product:
        </p>
        <p className="font-semibold text-center my-4 text-lg">L = r × p = rp sin θ</p>
        <p>
          Where <strong>r</strong> is the position vector, <strong>p</strong> is linear momentum (mv), and <strong>θ</strong> is the angle between them. Angular momentum is a vector quantity directed perpendicular to the plane of rotation (using the right-hand rule).
        </p>

        <p className="mt-4"><strong>Conservation of Angular Momentum:</strong></p>
        <p>
          One of the most powerful principles in physics states that if no external torque acts on a system, total angular momentum remains constant:
        </p>
        <p className="font-semibold text-center my-4 text-lg">L₁ = L₂  or  I₁ω₁ = I₂ω₂</p>
        <p>
          This explains why ice skaters spin faster when pulling their arms in (decreasing I increases ω), why planets move faster near the sun, and how divers control somersault speed by changing body position.
        </p>

        <p className="mt-4"><strong>Torque and Angular Momentum Relationship:</strong></p>
        <p>
          Torque (τ) represents the rate of change of angular momentum, analogous to how force changes linear momentum:
        </p>
        <p className="font-semibold text-center my-4 text-lg">τ = dL/dt  or  ΔL = τ·Δt</p>
        <p>
          This relationship is fundamental for analyzing how forces affect rotational motion, from braking systems to motor acceleration and gyroscopic precession.
        </p>

        <p className="mt-4"><strong>Example Calculation:</strong></p>
        <p>
          A solid disk with mass 5 kg and radius 0.4 m rotates at 20 rad/s. Its moment of inertia is I = ½mr² = ½(5)(0.4)² = 0.4 kg·m². Therefore, angular momentum L = Iω = 0.4 × 20 = <strong>8 kg·m²/s</strong>. If external torque is negligible and the disk contracts to radius 0.3 m, new I = 0.225 kg·m², so conservation gives ω₂ = L/I₂ = 8/0.225 = <strong>35.6 rad/s</strong>.
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

      <SEOFAQ
        questions={[
          {
            question: 'What is angular momentum and how is it calculated?',
            answer: 'Angular momentum (L) measures the rotational motion of objects and is the rotational analog of linear momentum. For rigid bodies rotating about a fixed axis, it\'s calculated as L = Iω, where I is moment of inertia (kg·m²) and ω is angular velocity (rad/s). For point particles in circular motion, use L = mvr, where m is mass, v is tangential velocity, and r is radius. The general vector form is L = r × p. Angular momentum is measured in kg·m²/s or J·s and is directed along the rotation axis using the right-hand rule.'
          },
          {
            question: 'Why does an ice skater spin faster when pulling their arms in?',
            answer: 'When an ice skater pulls their arms inward, their moment of inertia (I) decreases because mass moves closer to the rotation axis. According to conservation of angular momentum (L = Iω = constant), if I decreases while no external torque acts, angular velocity (ω) must increase proportionally to keep L constant. Since ice friction provides minimal torque, L remains nearly constant, causing the skater to spin faster. The increased rotational kinetic energy comes from muscular work done pulling arms in against centrifugal effects.'
          },
          {
            question: 'What is the relationship between torque and angular momentum?',
            answer: 'Torque (τ) is the rate of change of angular momentum, expressed as τ = dL/dt. This is Newton\'s second law for rotation, analogous to F = dp/dt for linear motion. A net torque causes angular momentum to change over time—positive torque increases L, negative torque (like braking) decreases it. For a finite time interval, the angular impulse equals change in angular momentum: ΔL = τ·Δt. If no external torque acts (τ = 0), then dL/dt = 0, meaning angular momentum is conserved.'
          },
          {
            question: 'How do you calculate moment of inertia for different objects?',
            answer: 'Moment of inertia (I) depends on mass distribution and rotation axis. Common formulas include: solid disk I = ½mr², hollow cylinder I = mr², solid sphere I = (2/5)mr², hollow sphere I = (2/3)mr², thin rod through center I = (1/12)mL², and rod through end I = (1/3)mL². For complex objects, use the parallel axis theorem: I = I_cm + md², where I_cm is moment about center of mass and d is distance to new axis. For composite objects, sum individual contributions: I_total = I₁ + I₂ + I₃...'
          },
          {
            question: 'What are the units of angular momentum and can it be negative?',
            answer: 'Angular momentum is measured in kg·m²/s (kilogram-meter squared per second) or equivalently J·s (joule-seconds) in SI units. From L = Iω: moment of inertia (kg·m²) times angular velocity (rad/s) gives kg·m²/s. Yes, angular momentum can be negative depending on rotation direction and chosen coordinate system. By convention, counterclockwise rotation is typically positive, clockwise is negative. The sign indicates the direction of the L vector along the rotation axis (right-hand rule). In conservation problems, opposite rotations have opposite signs and algebraically sum.'
          }
        ]}
      />

      <SEOSection title="Conclusion">
        <p>
          Mastering angular momentum is essential for understanding rotational motion in physics, from everyday phenomena like spinning wheels to complex systems like planetary orbits and quantum mechanics. This calculator provides instant, accurate results for all your angular momentum calculations, whether you're solving conservation problems, analyzing torque effects, or computing rotational dynamics.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('rotational-kinetic-energy-calculator')} or the {createInternalLink('centripetal-force-calculator')} to complement your rotational motion analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
