import MomentumCalculator from '../../../_components/calculators/MomentumCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Momentum Calculator | Physics & Collision Analysis';
const description = 'Calculate linear momentum, impulse, momentum change, and collision dynamics with comprehensive unit support.';
const keywords = [
  'momentum calculator',
  'linear momentum calculator',
  'impulse momentum calculator',
  'collision calculator',
  'momentum physics calculator',
  'mass times velocity calculator',
  'momentum change calculator',
  'conservation of momentum calculator',
  'kinetic energy calculator',
  'impulse force time calculator',
  'elastic collision calculator',
  'inelastic collision calculator',
  'momentum conservation calculator',
  'physics momentum calculator',
  'p equals mv calculator',
  'momentum velocity calculator',
  'momentum force calculator',
  'collision momentum calculator',
  'momentum analysis calculator',
  'physics kinematics calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/momentum-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/momentum-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function MomentumCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Momentum Calculator"
      description="Calculate linear momentum, impulse-momentum relationships, and collision dynamics with multiple unit systems."
      calculator={<MomentumCalculator />}
      slug="physics/momentum-calculator"
      category="Physics"
      features={[
        'Four calculation methods: linear momentum (p = m·v), impulse-momentum relationships, momentum change, collision analysis',
        'Unit-flexible inputs for mass (kg, g, lb, ton), velocity (m/s, km/h, mph, ft/s), force (N, kN, lbf, kgf)',
        'Calculates momentum, impulse, kinetic energy, velocity changes, and energy loss in collisions',
        'Conservation of momentum for perfectly inelastic collisions',
        'Supports positive and negative velocities for directional analysis',
        'Perfect for physics education, collision safety analysis, and mechanics applications'
      ]}
    >
      <SEOSection title="Understanding Momentum in Physics">
        <p>
          The Momentum Calculator computes linear momentum and analyzes impulse-momentum relationships for moving objects and collision scenarios. Momentum (p = m·v) is a fundamental physics quantity representing the quantity of motion in an object. The calculator supports four methods: linear momentum calculation, impulse-momentum theorem (J = Δp), momentum change between two velocities, and collision analysis with energy conservation. Essential for kinematics, dynamics, collision safety analysis, and classical mechanics applications. Inputs use flexible unit systems for mass (kg, lb, g), velocity (m/s, km/h, mph), force (N, lbf), and time intervals.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Momentum Calculator">
        <SEOList
          items={[
            'Select calculation method: linear momentum, impulse-momentum, momentum change, or collision analysis.',
            'For linear momentum: enter mass and velocity to calculate p = m·v and kinetic energy.',
            'For impulse-momentum: enter force, time duration, mass, and final velocity to find impulse and momentum change.',
            'For momentum change: enter mass, initial velocity, and final velocity to calculate Δp and velocity change.',
            'For collision analysis: enter mass and velocity for both objects to analyze post-collision dynamics.',
            'Choose appropriate units for mass (kg, lb, g), velocity (m/s, km/h, mph), force (N, lbf), and time (s, ms, min).',
            'Click Calculate to get momentum values, impulse, energy changes, and collision results.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Momentum Formulas and Equations">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">p = m × v</p>
            <p className="text-sm text-gray-600">Linear momentum (SI unit: kg·m/s)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">J = F × t</p>
            <p className="text-sm text-gray-600">Impulse (force applied over time interval)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">J = Δp = m·Δv</p>
            <p className="text-sm text-gray-600">Impulse-momentum theorem (change in momentum)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">m₁v₁ + m₂v₂ = (m₁ + m₂)v_f</p>
            <p className="text-sm text-gray-600">Conservation of momentum in perfectly inelastic collision</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">KE = ½m·v²</p>
            <p className="text-sm text-gray-600">Kinetic energy (related to momentum)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Momentum in Real-World Applications">
        <SEOList
          items={[
            'Vehicle collision analysis: calculating impact forces, safety systems design (airbags, seatbelts), crash testing',
            'Sports physics: calculating momentum in collisions, ball-player interactions, injury prevention',
            'Rocket propulsion: analyzing thrust and momentum changes in spacecraft',
            'Industrial safety: conveyor belt impacts, machinery guarding, moving object hazards',
            'Ballistics and firearms: calculating bullet momentum and recoil forces',
            'Sports equipment design: racket/bat momentum transfer, golf ball impact, throwing mechanics',
            'Particle physics: analyzing collision events in accelerators, momentum conservation in reactions',
            'Marine engineering: ship momentum, docking procedures, collision avoidance'
          ]}
        />
      </SEOSection>

      <SEOSection title="Momentum Comparison Table">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Object</th>
                <th className="px-4 py-2 border">Mass (kg)</th>
                <th className="px-4 py-2 border">Velocity (m/s)</th>
                <th className="px-4 py-2 border">Momentum (kg·m/s)</th>
                <th className="px-4 py-2 border">Kinetic Energy (J)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2 border">Walking person</td><td className="px-4 py-2 border">70</td><td className="px-4 py-2 border">1.4</td><td className="px-4 py-2 border">98</td><td className="px-4 py-2 border">69</td></tr>
              <tr><td className="px-4 py-2 border">Running person</td><td className="px-4 py-2 border">70</td><td className="px-4 py-2 border">7</td><td className="px-4 py-2 border">490</td><td className="px-4 py-2 border">1,715</td></tr>
              <tr><td className="px-4 py-2 border">Car (90 km/h)</td><td className="px-4 py-2 border">1500</td><td className="px-4 py-2 border">25</td><td className="px-4 py-2 border">37,500</td><td className="px-4 py-2 border">468,750</td></tr>
              <tr><td className="px-4 py-2 border">Truck (90 km/h)</td><td className="px-4 py-2 border">15000</td><td className="px-4 py-2 border">25</td><td className="px-4 py-2 border">375,000</td><td className="px-4 py-2 border">4,687,500</td></tr>
              <tr><td className="px-4 py-2 border">Baseball pitch</td><td className="px-4 py-2 border">0.145</td><td className="px-4 py-2 border">40</td><td className="px-4 py-2 border">5.8</td><td className="px-4 py-2 border">116</td></tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Linear momentum:</strong> 70 kg person running at 7 m/s → p = 490 kg·m/s, KE = 1,715 J</li>
          <li><strong>Impulse-momentum:</strong> 100 N force × 2 seconds on 5 kg mass → impulse = 200 N·s, velocity change = 40 m/s</li>
          <li><strong>Momentum change:</strong> 1000 kg vehicle from 20 m/s to 15 m/s → Δp = -5,000 kg·m/s (deceleration)</li>
          <li><strong>Collision:</strong> 5 kg object at 20 m/s hits 3 kg stationary object → final velocity = 12.5 m/s (perfectly inelastic)</li>
          <li><strong>Energy loss:</strong> Before collision KE = 1,000 J, after KE = 391 J → 609 J lost to deformation/heat</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is the difference between momentum and kinetic energy?',
              answer: 'Momentum (p = m·v) measures quantity of motion and is vector-based (has direction). Kinetic energy (KE = ½m·v²) measures motion energy and is scalar (no direction). A heavier slow object and lighter fast object can have same momentum but different kinetic energies.'
            },
            {
              question: 'What is the impulse-momentum theorem?',
              answer: 'The impulse-momentum theorem states that impulse (J = F·t) equals change in momentum (Δp = m·Δv). This relationship shows how force applied over time changes an object\'s motion. Longer contact time with same force creates larger momentum change.'
            },
            {
              question: 'Is momentum conserved in collisions?',
              answer: 'Yes, total momentum is conserved in all collisions in isolated systems (no external forces). In elastic collisions, kinetic energy is also conserved. In inelastic collisions, kinetic energy is converted to heat, sound, and deformation, but momentum remains conserved.'
            },
            {
              question: 'What is a perfectly inelastic collision?',
              answer: 'A perfectly inelastic collision occurs when two objects stick together after impact. Final velocity is found using conservation of momentum: m₁v₁ + m₂v₂ = (m₁ + m₂)v_f. Kinetic energy loss is maximum in perfectly inelastic collisions.'
            },
            {
              question: 'Why do airbags reduce injury in car crashes?',
              answer: 'Airbags increase the time duration (Δt) over which momentum change occurs. Since impulse J = F·Δt, increasing time decreases the force needed to stop the passenger. Lower force reduces injury. Same principle applies to soft landing materials, crumple zones in cars.'
            },
            {
              question: 'How does momentum relate to Newton\'s second law?',
              answer: 'Newton\'s second law can be expressed as F = dp/dt (force equals rate of momentum change). This form shows that forces cause momentum changes. Constant force on constant mass produces constant acceleration, which continuously increases momentum.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
