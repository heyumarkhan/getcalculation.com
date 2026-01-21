import FrictionCoefficientCalculator from '../../../_components/calculators/FrictionCoefficientCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Friction Coefficient Calculator | Calculate μ, Force & Normal Force';
const description = 'Calculate coefficient of friction, friction force, and normal force for static and kinetic friction scenarios.';
const keywords = [
  'friction coefficient calculator',
  'coefficient of friction calculator',
  'friction calculator',
  'static friction coefficient',
  'kinetic friction coefficient',
  'friction force calculator',
  'normal force calculator',
  'mu friction calculator',
  'coefficient of static friction calculator',
  'coefficient of kinetic friction calculator',
  'friction physics calculator',
  'surface friction calculator',
  'sliding friction calculator',
  'rolling friction calculator',
  'friction equation calculator',
  'calculate friction coefficient',
  'friction factor calculator',
  'inclined plane friction calculator',
  'mechanics friction calculator',
  'engineering friction calculator',
  'tribology calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/friction-coefficient-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/friction-coefficient-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function FrictionCoefficientCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Friction Coefficient Calculator"
      description="Calculate coefficient of friction (μ), friction force, and normal force for various surfaces and scenarios."
      calculator={<FrictionCoefficientCalculator />}
      slug="physics/friction-coefficient-calculator"
      category="Physics"
      features={[
        'Four calculation methods: find coefficient μ, friction force, normal force, and inclined surfaces',
        'Unit-flexible inputs for force (N, kN, lbf, kgf) and mass (kg, g, lb, oz)',
        'Automatic unit conversions for all force quantities',
        'Supports horizontal and inclined surface calculations',
        'Friction classification guide (low, moderate, high friction)',
        'Perfect for physics, engineering, and materials science applications'
      ]}
    >
      <SEOSection title="Understanding Coefficient of Friction">
        <p>
          The Friction Coefficient Calculator computes the coefficient of friction (μ), a dimensionless value representing resistance between two surfaces in contact. Friction prevents sliding and depends on material properties, surface roughness, and contact conditions. Static friction (μₛ) prevents motion initiation, while kinetic friction (μₖ) resists ongoing motion. The basic formula F = μN relates friction force (F) to normal force (N). Essential for mechanical design, vehicle dynamics, material selection, and physics education.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Friction Coefficient Calculator">
        <SEOList
          items={[
            'Select calculation method: find coefficient μ, friction force, normal force, or analyze inclined surfaces.',
            'For coefficient calculation: enter friction force and normal force with units.',
            'For force calculations: input known coefficient and one force value.',
            'For inclined surfaces: enter mass, gravity, and incline angle (0° for horizontal).',
            'Choose appropriate force units (N, kN, lbf, kgf) or mass units (kg, g, lb, oz).',
            'Click Calculate to get results with friction classification and physical interpretation.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Friction Coefficient Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">μ = F / N</p>
            <p className="text-sm text-gray-600">Coefficient of friction from friction force (F) and normal force (N)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">F = μ × N</p>
            <p className="text-sm text-gray-600">Friction force from coefficient and normal force</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">N = F / μ</p>
            <p className="text-sm text-gray-600">Normal force from friction force and coefficient</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">N = m × g × cos(θ)</p>
            <p className="text-sm text-gray-600">Normal force on inclined surface (angle θ from horizontal)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Typical Friction Coefficients">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Material Pair</th>
                <th className="px-4 py-2 border">Static μₛ</th>
                <th className="px-4 py-2 border">Kinetic μₖ</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2 border">Steel on steel (dry)</td><td className="px-4 py-2 border">0.74</td><td className="px-4 py-2 border">0.57</td></tr>
              <tr><td className="px-4 py-2 border">Rubber on dry concrete</td><td className="px-4 py-2 border">0.90</td><td className="px-4 py-2 border">0.70</td></tr>
              <tr><td className="px-4 py-2 border">Wood on wood</td><td className="px-4 py-2 border">0.40</td><td className="px-4 py-2 border">0.30</td></tr>
              <tr><td className="px-4 py-2 border">Ice on ice</td><td className="px-4 py-2 border">0.10</td><td className="px-4 py-2 border">0.03</td></tr>
              <tr><td className="px-4 py-2 border">Teflon on Teflon</td><td className="px-4 py-2 border">0.04</td><td className="px-4 py-2 border">0.04</td></tr>
              <tr><td className="px-4 py-2 border">Brake pad on steel</td><td className="px-4 py-2 border">0.40</td><td className="px-4 py-2 border">0.30</td></tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Friction Coefficient Calculator">
        <SEOList
          items={[
            'Automotive engineering: brake system design, tire grip analysis, vehicle stability',
            'Mechanical design: bearing selection, clutch sizing, belt drive calculations',
            'Materials science: surface characterization, lubricant testing, wear analysis',
            'Construction: slope stability, foundation design, structural safety',
            'Manufacturing: conveyor systems, machining operations, material handling',
            'Sports equipment: shoe design, playing surface optimization, safety equipment',
            'Physics education: mechanics problems, force analysis, motion prediction',
            'Safety engineering: slip resistance testing, fall prevention, equipment design'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Find coefficient:</strong> Friction force F = 50 N, Normal force N = 100 N → μ = 50/100 = 0.5 (moderate friction)</li>
          <li><strong>Friction force:</strong> μ = 0.7 (rubber on concrete), N = 200 N → F = 0.7 × 200 = 140 N</li>
          <li><strong>Normal force:</strong> μ = 0.3, F = 60 N → N = 60/0.3 = 200 N</li>
          <li><strong>Inclined surface:</strong> Mass = 10 kg, angle = 30°, g = 9.81 m/s² → N = 10 × 9.81 × cos(30°) ≈ 84.9 N</li>
          <li><strong>Ice on ice:</strong> F = 5 N, N = 100 N → μ = 0.05 (very low friction - expected for ice)</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is the difference between static and kinetic friction?',
              answer: 'Static friction (μₛ) prevents an object at rest from starting to move. Kinetic friction (μₖ) resists motion once the object is sliding. Static friction is typically higher: μₛ > μₖ. This is why it\'s harder to start pushing a heavy box than to keep it moving.'
            },
            {
              question: 'Why is the coefficient of friction dimensionless?',
              answer: 'The coefficient μ = F/N is a ratio of two forces (both in Newtons), so units cancel out. It\'s a pure number representing the proportional relationship between friction and normal force, independent of measurement units. Typical values range from 0.01 (very slippery) to 1.5+ (very rough).'
            },
            {
              question: 'Does friction depend on surface area?',
              answer: 'No, in the idealized model, friction depends only on the normal force and coefficient μ, not contact area. However, in reality, extremely small or large contact areas can affect friction due to surface deformation, wear, and microscopic interactions. The simple F = μN model works well for most engineering applications.'
            },
            {
              question: 'How do I measure coefficient of friction experimentally?',
              answer: 'Place an object on an inclined plane and gradually increase the angle until it starts to slide. At the critical angle θ, μₛ = tan(θ). For kinetic friction, measure the force required to pull an object at constant velocity: μₖ = F_pull / N. Ensure consistent surface conditions and multiple trials for accuracy.'
            },
            {
              question: 'Can coefficient of friction be greater than 1?',
              answer: 'Yes! μ > 1 means friction force exceeds normal force. Rubber on dry asphalt can have μ ≈ 1.2-1.5. Very rough surfaces or adhesive contacts can exceed 1. There\'s no theoretical upper limit, though most common materials range from 0.1 to 1.0.'
            },
            {
              question: 'What factors affect the coefficient of friction?',
              answer: 'Material properties (hardness, elasticity), surface roughness, contamination (oil, water, dirt), temperature, contact pressure, sliding velocity, and surface treatments. Lubrication dramatically reduces friction (μ can drop from 0.5 to 0.05). Temperature changes can alter material properties and lubricant viscosity.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
