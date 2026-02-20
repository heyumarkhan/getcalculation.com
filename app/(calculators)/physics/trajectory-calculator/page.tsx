import TrajectoryCalculator from '../../../_components/calculators/TrajectoryCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Trajectory Calculator | Projectile Motion Range, Height & Time';
const description = 'Calculate projectile trajectory including range, maximum height, time of flight, initial velocity, and landing velocity.';
const keywords = [
  'trajectory calculator',
  'projectile motion calculator',
  'projectile calculator',
  'range calculator physics',
  'projectile range calculator',
  'time of flight calculator',
  'maximum height projectile',
  'landing velocity calculator',
  'launch angle calculator',
  'parabolic motion calculator',
  'ballistic trajectory calculator',
  'projectile physics calculator',
  'kinematics calculator',
  'projectile motion physics',
  'trajectory equation calculator',
  'ballistics calculator',
  'throw distance calculator',
  'projectile path calculator',
  'motion calculator physics',
  'horizontal projectile motion',
  'vertical projectile motion'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/trajectory-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/trajectory-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function TrajectoryCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Trajectory Calculator | Projectile Motion Range, Height & Landing Velocity"
      description="Calculate projectile trajectory instantly. Find range, maximum height, time of flight, and landing velocity for any launch angle and initial velocity."
      calculator={<TrajectoryCalculator />}
      slug="physics/trajectory-calculator"
      category="Physics"
      features={[
        "Calculate range, maximum height, and time of flight instantly",
        "Multiple calculation methods for all trajectory parameters",
        "Support for elevated launch positions and custom gravity",
        "Unit-flexible inputs (m/s, km/h, mph, ft/s)",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Calculating Projectile Trajectory Matters in Real-World Scenarios">
        <p>
          From a soccer player's free kick curving into the goal, to a firefighter directing water from a ladder truck, to aerospace engineers predicting satellite reentry paths—trajectory calculations shape decisions across industries that depend on precision. Every projectile follows a parabolic path governed by initial velocity, launch angle, and gravitational acceleration. A golf ball sliced at 35° travels 265 yards while a 45° shot at identical speed reaches 277 yards; understanding this 4.5% difference explains why launch angle optimization wins tournaments. In ballistics, adjusting elevation by just 2° can shift artillery impact zones by 500+ meters at 40km distance. Industrial applications like fountain design, water jet cutting, and material conveyor systems all require trajectory analysis to maximize efficiency and safety. Whether designing a basketball court's rim height or predicting debris landing zones in mining operations, accurate trajectory calculations prevent costly design failures. For related projectile mechanics analysis, explore our {createInternalLink('velocity-calculator')} to understand velocity components at any point in the flight path.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation method: complete trajectory analysis, find initial velocity, find launch angle, or calculate landing velocity</li>
          <li><strong>Step 2:</strong> Enter known parameters with units: initial velocity (m/s, km/h, mph), launch angle (0-90°), initial height, and gravity (default 9.81 m/s²)</li>
          <li><strong>Step 3:</strong> Click Calculate to instantly retrieve range, maximum height, time of flight, velocity components, and landing conditions with detailed trajectory visualization</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Trajectory Calculator Formula & Physics">
        <p>
          Trajectory (also called projectile motion) describes the curved path an object follows when launched with initial velocity and subject to constant gravitational acceleration. The fundamental principle separates motion into two independent components: horizontal motion at constant velocity (no acceleration in x-direction) and vertical motion with constant downward acceleration due to gravity. This independence is key—the time an object spends in air depends only on vertical parameters (initial velocity component and initial height), while horizontal distance depends on horizontal velocity and time. The range equation R = (v₀² × sin(2θ)) / g elegantly shows that range depends on the square of initial velocity (doubling velocity quadruples range) and varies with sine of double the launch angle (meaning 30° and 60° produce identical ranges). Maximum height H = h₀ + (v₀ × sin(θ))² / (2g) reveals that vertical velocity component squared divided by 2g gives peak height above launch point. For comprehensive force and acceleration analysis related to projectile motion, check our {createInternalLink('acceleration-calculator')} for detailed kinematic calculations.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">R = (v₀² × sin(2θ)) / g</p>
          <p className="text-sm mt-2">Range for flat ground · H = h₀ + (v₀ × sin(θ))² / (2g) · Maximum Height</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate trajectory for an athlete throwing a javelin 25 meters at 30° launch angle from ground level:</p>
        <ul>
          <li>Given: Initial velocity v₀ = 20 m/s, Launch angle θ = 30°, Initial height h₀ = 0 m, Gravity g = 9.81 m/s²</li>
          <li>Horizontal velocity component: vₓ = 20 × cos(30°) = 20 × 0.866 = 17.32 m/s (constant throughout flight)</li>
          <li>Vertical velocity component: vᵧ₀ = 20 × sin(30°) = 20 × 0.5 = 10 m/s (decreases due to gravity)</li>
          <li>Time to reach maximum height: t_max = vᵧ₀ / g = 10 / 9.81 ≈ 1.02 seconds</li>
          <li>Maximum height: H = (10)² / (2 × 9.81) = 100 / 19.62 ≈ 5.10 meters above launch point</li>
          <li>Total flight time: t_total = 2 × t_max ≈ 2.04 seconds (time to rise equals time to fall from same height)</li>
          <li>Range: R = (20² × sin(60°)) / 9.81 = (400 × 0.866) / 9.81 ≈ 35.35 meters</li>
          <li>Landing velocity: Equal in magnitude to launch velocity (20 m/s) but 30° downward instead of upward</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Trajectory calculations are essential across numerous fields:</p>
        <SEOList items={[
          "Ballistics and military: Artillery range tables, mortar fire calculations, missile trajectory predictions, and bombing precision depend on trajectory analysis for target acquisition",
          "Sports science and athletics: Optimizing javelin throw angles, shot put technique, basketball rim angle approach, and soccer free kick curvature to maximize distance or accuracy",
          "Water system design: Fountain trajectories, water jet cutting machines, fire hose spray patterns, and irrigation system reach calculations all require precise trajectory modeling",
          "Aerospace engineering: Satellite launch angles, reentry trajectory planning, and rocket staging analysis use trajectory calculations for mission success",
          "Game development and simulation: Realistic projectile physics for video games, physics engines, and interactive simulations depend on accurate trajectory equations",
          "Safety engineering and hazard analysis: Predicting debris landing zones in mining/demolition, designing protective barriers, and calculating splash zones for industrial processes",
          "Agriculture and equipment design: Crop duster flight paths, grain auger discharge patterns, and manure spreader coverage depend on trajectory analysis"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the optimal launch angle for maximum range?",
            answer: "For projectile motion on flat ground with no air resistance, 45° launch angle produces maximum range. However, this applies only to level ground launching and landing. For elevated launches (starting from height h₀ > 0), the optimal angle becomes slightly less than 45° because the projectile has extra time to travel horizontally during descent. Real-world projectiles with air resistance typically achieve maximum range at 30-35° depending on the projectile's shape, mass, and velocity."
          },
          {
            question: "Why do two different launch angles produce the same range?",
            answer: "Complementary angles (like 30° and 60°) reach identical ranges at the same initial velocity because the range formula uses sin(2θ), which treats 30° and 60° identically: sin(60°) = sin(120°) = 0.866. The low-angle trajectory (30°) sacrifices height for horizontal distance, while the high-angle shot (60°) achieves the same range through higher flight time. Both require identical horizontal distance traveled: 30° travels fast and low; 60° travels slower but higher."
          },
          {
            question: "How does initial height affect trajectory range and flight time?",
            answer: "Launching from height h₀ > 0 increases both range and time of flight because the projectile has extra vertical distance to travel downward. The time aloft depends on vertical motion: t = (v₀ × sin(θ) + √((v₀ × sin(θ))² + 2gh₀)) / g. With more time in air, horizontal distance increases. The optimal launch angle for maximum range also decreases when launching from elevation due to the additional vertical distance available."
          },
          {
            question: "Does this calculator account for air resistance and drag?",
            answer: "No, this calculator assumes ideal projectile motion (vacuum or negligible air resistance). Real projectiles experience drag force proportional to velocity squared, reducing range by 20-50% depending on object shape, size, and initial velocity. Aerodynamic effects include drag (opposing motion), Magnus force (from spin), and turbulence. For precision applications like professional ballistics, military calculations, or competitive sports, add 15-35% corrections to calculated ranges."
          },
          {
            question: "What happens if I launch at 90° (straight up)?",
            answer: "At 90° launch angle, horizontal velocity component is zero (vₓ = v₀ × cos(90°) = 0), so range equals zero—the projectile lands exactly at the launch point. Maximum height becomes H = h₀ + v₀²/(2g), achieved at time t_max = v₀/g. Total flight time is t_total = 2v₀/g. The object returns with velocity magnitude equal to initial velocity but directed downward (v₀ downward from height h₀). This is the highest possible launch for given initial velocity magnitude."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering trajectory calculator principles empowers you to predict motion across engineering disciplines, sports optimization, and safety-critical applications. Whether you're designing fountains, optimizing athletic performance, or planning ballistic calculations, understanding projectile motion transforms approximation into precision.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('kinetic-energy-calculator')} to understand energy changes during flight, or the {createInternalLink('force-calculator')} for detailed force analysis in projectile systems.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
