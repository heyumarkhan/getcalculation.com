import TrajectoryCalculator from '../../../_components/calculators/TrajectoryCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

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
      title="Trajectory Calculator"
      description="Calculate projectile motion trajectory parameters including range, maximum height, time of flight, and landing conditions."
      calculator={<TrajectoryCalculator />}
      slug="physics/trajectory-calculator"
      category="Physics"
      features={[
        'Four calculation methods: complete trajectory, initial velocity, launch angle, landing velocity',
        'Unit-flexible inputs for velocity (m/s, km/h, mph, ft/s) and distance (m, km, ft, mi)',
        'Supports elevated launch positions with initial height parameter',
        'Calculates horizontal range, maximum height, and time of flight',
        'Determines optimal launch angles for given range and velocity',
        'Perfect for physics education, ballistics, sports science, and engineering'
      ]}
    >
      <SEOSection title="Understanding Projectile Trajectory">
        <p>
          The Trajectory Calculator analyzes projectile motion - the curved path an object follows when thrown, launched, or projected near Earth's surface. Projectiles follow parabolic trajectories under constant gravitational acceleration, with independent horizontal (constant velocity) and vertical (accelerated) motion components. Key parameters include initial velocity, launch angle, range (horizontal distance), maximum height, and time of flight. Essential for ballistics, sports analysis, engineering design, artillery calculations, and physics education on kinematics and motion.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Trajectory Calculator">
        <SEOList
          items={[
            'Select calculation method: complete trajectory, find initial velocity, find launch angle, or landing velocity.',
            'For complete trajectory: enter initial velocity, launch angle (0-90°), gravity, and initial height.',
            'For initial velocity: enter desired range, launch angle, and initial conditions.',
            'For launch angle: enter initial velocity and desired range (finds two possible angles).',
            'For landing velocity: calculates impact speed and angle at landing.',
            'Choose appropriate units for velocity and distance measurements.',
            'Click Calculate to get comprehensive trajectory analysis with all motion parameters.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Projectile Motion Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">R = (v₀² × sin(2θ)) / g</p>
            <p className="text-sm text-gray-600">Range for flat ground (initial height = 0)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">H = h₀ + (v₀ × sin(θ))² / (2g)</p>
            <p className="text-sm text-gray-600">Maximum height above ground</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">t = (v₀ × sin(θ) + √((v₀ × sin(θ))² + 2gh₀)) / g</p>
            <p className="text-sm text-gray-600">Time of flight with initial height h₀</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">vₓ = v₀ × cos(θ), vᵧ = v₀ × sin(θ) - gt</p>
            <p className="text-sm text-gray-600">Velocity components at time t</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Trajectory Calculator">
        <SEOList
          items={[
            'Ballistics: artillery trajectory planning, weapon system design, range tables',
            'Sports science: optimize throwing techniques (javelin, shot put, basketball)',
            'Engineering: fountain design, water jet analysis, material transport systems',
            'Military: mortar fire calculations, missile trajectory prediction, bombing runs',
            'Physics education: demonstrate parabolic motion, teach kinematics principles',
            'Game development: realistic projectile physics for games and simulations',
            'Safety engineering: design protective barriers, predict debris landing zones',
            'Aerospace: rocket staging analysis, atmospheric reentry predictions'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>45° launch:</strong> v₀ = 20 m/s, θ = 45°, h₀ = 0 → Range = 40.77 m, Max height = 10.19 m, Time = 2.89 s</li>
          <li><strong>Optimal angle:</strong> For maximum range on flat ground, launch angle = 45° (no air resistance)</li>
          <li><strong>Elevated launch:</strong> v₀ = 15 m/s, θ = 30°, h₀ = 5 m → Range ≈ 23.5 m, Time ≈ 2.17 s</li>
          <li><strong>Find velocity:</strong> Range = 50 m, θ = 40°, h₀ = 0 → Required v₀ ≈ 22.6 m/s</li>
          <li><strong>Two angles:</strong> v₀ = 25 m/s, Range = 50 m → θ₁ = 27.3° (low), θ₂ = 62.7° (high)</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is the optimal launch angle for maximum range?',
              answer: 'On flat ground (h₀ = 0) with no air resistance, 45° gives maximum range. For elevated launches (h₀ > 0), the optimal angle is slightly less than 45°. With air resistance, optimal angles are typically 30-35° depending on projectile shape and velocity.'
            },
            {
              question: 'Why are there two possible launch angles for the same range?',
              answer: 'Two angles achieve the same range: a low trajectory (faster, shorter flight time) and high trajectory (slower horizontal speed, longer flight time). They are complementary: θ₁ + θ₂ = 90°. Example: 30° and 60° both reach the same range at the same initial velocity.'
            },
            {
              question: 'How does initial height affect trajectory?',
              answer: 'Launching from height h₀ > 0 increases range and time of flight. The projectile has extra potential energy converting to kinetic energy during descent. Maximum range angle becomes less than 45° for elevated launches.'
            },
            {
              question: 'Does the calculator account for air resistance?',
              answer: 'No, this calculator uses ideal projectile motion (vacuum conditions). Real projectiles experience drag force proportional to velocity squared, reducing range by 20-50% depending on shape, speed, and air density. Aerodynamic calculations require numerical methods.'
            },
            {
              question: 'What happens at 90° launch angle (straight up)?',
              answer: 'At θ = 90°, horizontal velocity component vₓ = 0, so range R = 0. The projectile goes straight up and lands at the launch point. Maximum height H = h₀ + v₀²/(2g). Time of flight t = 2v₀/g (for h₀ = 0).'
            },
            {
              question: 'How accurate is the calculator for sports applications?',
              answer: 'Very accurate for initial analysis, but real sports projectiles (basketballs, golf balls) experience significant air resistance and spin effects (Magnus force). Use results as baseline estimates. For precision, add 10-30% correction for drag depending on object size and speed.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
