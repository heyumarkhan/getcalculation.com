import ShearStressCalculator from '../../../_components/calculators/ShearStressCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Shear Stress Calculator | Torque, Beam, Principal Stresses';
const description = 'Calculate shear stress from force, torque, beam loading, and principal stresses for engineering design.';
const keywords = [
  'shear stress calculator',
  'shear stress formula',
  'torsional shear stress calculator',
  'beam shear stress calculator',
  'maximum shear stress calculator',
  'shear force calculator',
  'principal stress shear calculator',
  'shaft shear stress calculator',
  'mohr circle shear stress',
  'shear stress in beams',
  'shear stress torque calculator',
  'structural shear calculator',
  'mechanics shear stress',
  'engineering shear stress',
  'material shear stress',
  'shear strain calculator',
  'polar moment shear',
  'rectangular beam shear',
  'physics shear stress',
  'structural mechanics calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/shear-stress-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/shear-stress-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function ShearStressCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Shear Stress Calculator"
      description="Calculate shear stress from force, torque, beam loading, and principal stresses."
      calculator={<ShearStressCalculator />}
      slug="physics/shear-stress-calculator"
      category="Physics"
      features={[
        'Four methods: force & area, torque (shaft), beam shear, max shear from principal stresses',
        'Unit-flexible inputs for force, area, torque, radius, stress',
        'Computes shear stress in Pa, MPa, psi with automatic conversions',
        'Torsional shear stress in solid circular shafts',
        'Maximum shear stress in rectangular beams (1.5 factor)',
        'Mohr\'s circle principal stress analysis for maximum shear'
      ]}
    >
      <SEOSection title="Shear Stress Calculator Overview">
        <p>
          The Shear Stress Calculator determines shear stress (τ) from applied forces, torque, beam loading, and principal stresses. Shear stress occurs when forces act parallel to a surface, causing layers to slide. Critical for structural design, shaft torque analysis, beam mechanics, and failure prediction. Essential for mechanical, civil, and aerospace engineers evaluating material strength.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Shear Stress Calculator">
        <SEOList
          items={[
            'Select a method: force & area, torque (shaft), beam shear, or max shear from principal stresses.',
            'Enter known values: force and area, torque and radius, beam dimensions, or principal stresses.',
            'Choose appropriate units for force (N, kN, lbf), area (m², mm²), stress (Pa, MPa, psi).',
            'Click Calculate to get shear stress magnitude with formulas and conversions.',
            'Results show shear stress in multiple units and relevant context (average, max, location).'
          ]}
        />
      </SEOSection>

      <SEOSection title="Shear Stress Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ = F / A</p>
            <p className="text-sm text-gray-600">Direct shear stress (force parallel to area)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ_max = T × r / J</p>
            <p className="text-sm text-gray-600">Torsional shear stress in circular shaft (J = polar moment)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ_max = 1.5 × V / A</p>
            <p className="text-sm text-gray-600">Maximum shear stress in rectangular beam (V = shear force)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ_max = |σ₁ - σ₂| / 2</p>
            <p className="text-sm text-gray-600">Maximum shear from principal stresses (Mohr's circle)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Shear Stress Analysis">
        <SEOList
          items={[
            'Shaft design: torque transmission in drive shafts, axles, and rotating machinery',
            'Beam analysis: transverse loading, cantilevers, and structural supports',
            'Bolt and fastener design: shear loading in connections and joints',
            'Material failure prediction: von Mises and Tresca yield criteria',
            'Welding: shear stress in fillet and butt welds',
            'Soil mechanics: shear strength and slope stability'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Bolt shear:</strong> F = 5000 N, A = 0.01 m² → τ = 500,000 Pa (0.5 MPa).</li>
          <li><strong>Shaft torque:</strong> T = 100 N·m, r = 0.05 m (solid circular) → τ_max ≈ 10.2 MPa.</li>
          <li><strong>Beam shear:</strong> V = 10 kN, b = 0.2 m, h = 0.3 m → τ_max ≈ 0.25 MPa (at neutral axis).</li>
          <li><strong>Principal stresses:</strong> σ₁ = 100 MPa, σ₂ = 50 MPa → τ_max = 25 MPa (at 45° plane).</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is shear stress?',
              answer: 'Shear stress is force per unit area acting parallel to a surface, causing layers to slide. It differs from normal stress (perpendicular force).'
            },
            {
              question: 'How does torque create shear stress?',
              answer: 'Torque twists a shaft, creating torsional shear stress. Maximum shear occurs at the outer surface (largest radius) of circular shafts.'
            },
            {
              question: 'Why is beam shear stress multiplied by 1.5?',
              answer: 'For rectangular beams, shear stress is not uniform across the height. Maximum shear at the neutral axis is 1.5× the average (V/A).'
            },
            {
              question: 'What is Mohr\'s circle?',
              answer: 'A graphical method to find principal stresses and maximum shear stress. Maximum shear τ_max = (σ₁ - σ₂) / 2 occurs at 45° to principal planes.'
            },
            {
              question: 'What materials resist shear well?',
              answer: 'Metals like steel have high shear strength. Brittle materials (concrete, ceramics) are weak in shear. Design accounts for material shear yield/ultimate strength.'
            },
            {
              question: 'Is shear stress important in welds?',
              answer: 'Yes. Fillet welds primarily carry shear stress. Weld throat thickness and length determine shear capacity and joint safety.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
