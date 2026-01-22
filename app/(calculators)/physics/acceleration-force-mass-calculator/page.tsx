import AccelerationForceAndMassCalculator from '../../../_components/calculators/AccelerationForceAndMassCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Acceleration Calculator | Force, Mass & Kinematics';
const description = 'Calculate acceleration from force and mass using Newton\'s Second Law, kinematics equations, and velocity changes.';
const keywords = [
  'acceleration calculator',
  'acceleration using force and mass',
  'newtons second law calculator',
  'force mass acceleration calculator',
  'acceleration from force calculator',
  'acceleration kinematics calculator',
  'velocity acceleration calculator',
  'physics acceleration calculator',
  'f equals ma calculator',
  'a equals f divided by m',
  'net force acceleration calculator',
  'kinematic equations calculator',
  'velocity time acceleration calculator',
  'distance velocity acceleration calculator',
  'acceleration formula calculator',
  'acceleration physics calculator',
  'free fall acceleration calculator',
  'motion acceleration calculator',
  'constant acceleration calculator',
  'acceleration magnitude calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/acceleration-force-mass-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/acceleration-force-mass-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function AccelerationForceAndMassCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Acceleration Calculator"
      description="Calculate acceleration from force and mass using Newton's Second Law, kinematics, and velocity changes with flexible units."
      calculator={<AccelerationForceAndMassCalculator />}
      slug="physics/acceleration-force-mass-calculator"
      category="Physics"
      features={[
        'Four calculation methods: acceleration from force and mass (a=F/m), velocity and time changes, net force analysis, kinematic equations',
        'Unit-flexible inputs for force (N, kN, lbf, kgf), mass (kg, lb, g, ton), velocity (m/s, km/h, mph, ft/s)',
        'Newton\'s Second Law (F=m·a) with force and acceleration calculations',
        'Kinematics equation support (v²=v₀²+2·a·s) for distance-based acceleration calculations',
        'Net force analysis from multiple forces in different directions',
        'Calculates time intervals, distances, and required forces automatically',
        'Essential for physics education, mechanics problems, and motion analysis'
      ]}
    >
      <SEOSection title="Understanding Acceleration from Force and Mass">
        <p>
          The Acceleration Calculator computes acceleration using Newton's Second Law and kinematic equations for moving objects. Acceleration (a = F/m) is a fundamental physics quantity measuring the rate of velocity change. The calculator supports four methods: acceleration from force and mass, acceleration from velocity and time changes, net force analysis, and kinematic equations using distance. Essential for understanding classical mechanics, solving physics problems, analyzing vehicle motion, and engineering applications. Inputs use flexible unit systems for force (N, kN, lbf, kgf), mass (kg, lb, g, ton), velocity (m/s, km/h, mph), and distance (m, km, mi, ft).
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Acceleration Calculator">
        <SEOList
          items={[
            'Select calculation method: force and mass, velocity and time, net force, or kinematics.',
            'For force and mass method: enter force value and mass to calculate a = F/m.',
            'For velocity and time method: enter initial velocity, final velocity, and time interval.',
            'For net force method: enter two forces and mass to calculate acceleration from net force.',
            'For kinematics method: enter initial velocity, final velocity, and distance traveled.',
            'Choose appropriate units for force (N, lbf, kgf), mass (kg, lb, g), velocity (m/s, km/h, mph), distance (m, km, mi, ft).',
            'Click Calculate to get acceleration values, times, distances, and required forces.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Acceleration Formulas and Equations">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">a = F / m</p>
            <p className="text-sm text-gray-600">Acceleration from force and mass (Newton's Second Law)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">a = (v₂ - v₁) / t</p>
            <p className="text-sm text-gray-600">Acceleration from velocity and time changes</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">v₂² = v₁² + 2·a·s</p>
            <p className="text-sm text-gray-600">Kinematic equation relating velocity, acceleration, and distance</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">F = m × a</p>
            <p className="text-sm text-gray-600">Newton's Second Law (Force equals mass times acceleration)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">F_net = m × a</p>
            <p className="text-sm text-gray-600">Net force causes acceleration of object</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Acceleration in Real-World Applications">
        <SEOList
          items={[
            'Vehicle dynamics: car acceleration from engine force, braking deceleration, traction control',
            'Aerospace engineering: rocket acceleration, aircraft takeoff, g-force calculations',
            'Sports science: athlete sprint acceleration, impact forces in collisions, jump height analysis',
            'Elevator systems: acceleration profiles, comfort levels, emergency deceleration',
            'Safety analysis: crash deceleration, air bag deployment forces, seat belt requirements',
            'Conveyor systems: belt acceleration, load dynamics, safety margins',
            'Machinery: motor torque to acceleration conversion, industrial equipment analysis',
            'Physics education: solving kinematics problems, understanding forces and motion'
          ]}
        />
      </SEOSection>

      <SEOSection title="Common Acceleration Values Reference">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Scenario</th>
                <th className="px-4 py-2 border">Acceleration (m/s²)</th>
                <th className="px-4 py-2 border">G-Force</th>
                <th className="px-4 py-2 border">Time 0-100 km/h</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2 border">Gravity (free fall)</td><td className="px-4 py-2 border">9.81</td><td className="px-4 py-2 border">1.0</td><td className="px-4 py-2 border">-</td></tr>
              <tr><td className="px-4 py-2 border">Car (typical)</td><td className="px-4 py-2 border">5-7</td><td className="px-4 py-2 border">0.5-0.7</td><td className="px-4 py-2 border">~15 s</td></tr>
              <tr><td className="px-4 py-2 border">Sports car</td><td className="px-4 py-2 border">9-12</td><td className="px-4 py-2 border">0.9-1.2</td><td className="px-4 py-2 border">~8 s</td></tr>
              <tr><td className="px-4 py-2 border">Formula 1 car</td><td className="px-4 py-2 border">15-20</td><td className="px-4 py-2 border">1.5-2.0</td><td className="px-4 py-2 border">~5 s</td></tr>
              <tr><td className="px-4 py-2 border">Sprinter (20 m)</td><td className="px-4 py-2 border">4-5</td><td className="px-4 py-2 border">0.4-0.5</td><td className="px-4 py-2 border">~5 s</td></tr>
              <tr><td className="px-4 py-2 border">Elevator (typical)</td><td className="px-4 py-2 border">0.5-1.0</td><td className="px-4 py-2 border">0.05-0.1</td><td className="px-4 py-2 border">-</td></tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Force and mass:</strong> 50 N force on 10 kg object → a = 5 m/s² acceleration</li>
          <li><strong>Velocity and time:</strong> 0 to 20 m/s in 5 seconds → a = 4 m/s², distance = 50 m</li>
          <li><strong>Net force:</strong> 50 N forward and 30 N backward on 10 kg mass → net = 20 N, a = 2 m/s²</li>
          <li><strong>Kinematics:</strong> Starting at 0 m/s, ending at 20 m/s over 100 m → a = 2 m/s²</li>
          <li><strong>Car acceleration:</strong> 1500 kg car with 3000 N engine force → a = 2 m/s² (ignoring friction)</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is Newton\'s Second Law of Motion?',
              answer: 'Newton\'s Second Law states that Force equals mass times acceleration (F = m·a). This means a net force applied to an object causes it to accelerate proportionally to the force and inversely proportional to its mass. Double the force doubles acceleration; double the mass halves acceleration.'
            },
            {
              question: 'What is the difference between acceleration and velocity?',
              answer: 'Velocity (m/s) is the rate of position change and indicates how fast an object moves. Acceleration (m/s²) is the rate of velocity change and indicates how quickly motion is changing. An object moving at constant velocity (not accelerating) has zero acceleration despite having high velocity.'
            },
            {
              question: 'What is G-force?',
              answer: 'G-force is acceleration measured in multiples of gravitational acceleration (9.81 m/s²). 1 G equals 9.81 m/s². A 5 m/s² acceleration is approximately 0.5 G. High G-forces (like in race cars or fighter jets) can cause physical stress on human bodies.'
            },
            {
              question: 'How do friction and air resistance affect acceleration?',
              answer: 'Friction and air resistance are forces that oppose motion, reducing net force on the object. Real-world acceleration is lower than theoretical calculations because actual net force is (Applied Force - Friction - Air Resistance). This is why cars need more engine power at higher speeds to maintain acceleration.'
            },
            {
              question: 'Can acceleration be negative?',
              answer: 'Yes, negative acceleration (deceleration or negative acceleration) occurs when velocity decreases. A car braking has negative acceleration in the direction of motion. The sign indicates direction: positive means acceleration in positive direction, negative means acceleration opposite to positive direction.'
            },
            {
              question: 'How is kinematics different from dynamics?',
              answer: 'Kinematics describes motion without considering forces (position, velocity, acceleration). Dynamics explains motion by analyzing forces causing that motion (F=m·a). Kinematics asks "how fast?" while dynamics asks "why is it moving that way?" Both are complementary aspects of mechanics.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
