import MassMomentOfInertiaCalculator from '../../../_components/calculators/MassMomentOfInertiaCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import type { Metadata } from 'next';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Mass Moment of Inertia Calculator - Rotational Dynamics',
  description: 'Calculate mass moment of inertia for spheres, disks, cylinders, rods, and rectangles using standard formulas.',
  keywords: [
    'Mass Moment of Inertia Calculator',
    'moment of inertia calculator',
    'rotational inertia',
    'calculate moment of inertia',
    'I = MR² calculator',
    'sphere moment of inertia',
    'disk moment of inertia',
    'cylinder moment of inertia',
    'rod moment of inertia',
    'rectangular moment of inertia',
    'parallel axis theorem',
    'rotational dynamics calculator',
    'moment of inertia formula',
    'rotational physics calculator',
    'angular momentum calculator',
    'rotational kinematics',
    'mechanics calculator',
    'dynamics calculator',
    'inertia physics',
    'moment of inertia physics'
  ],
  openGraph: {
    title: 'Mass Moment of Inertia Calculator - Shapes & Objects',
    description: 'Compute rotational inertia for common geometric shapes with mass and dimension inputs.',
    type: 'website',
    url: 'https://getcalculation.com/physics/mass-moment-of-inertia-calculator',
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics/mass-moment-of-inertia-calculator',
  },
};

export default function MassMomentOfInertiaPage() {
  return (
    <CalculatorPageTemplate
      title="Mass Moment of Inertia Calculator"
      description="Calculate rotational inertia for various shapes and use the parallel axis theorem."
      calculator={<MassMomentOfInertiaCalculator />}
      slug="physics/mass-moment-of-inertia-calculator"
      category="Mechanics"
      features={[
        'Calculate moment of inertia for 6 common shapes',
        'Sphere: I = (2/5)MR²',
        'Disk: I = (1/2)MR²',
        'Rod: I = (1/12)ML² (about center)',
        'Cylinder: perpendicular and parallel axis options',
        'Rectangular block: multiple axis orientations',
        'Parallel axis theorem: I = I_center + Md²',
        'Mass and length unit conversions',
        '#820ECC themed design'
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Moment of Inertia?</h2>
        <p className="mb-4">
          <strong>Mass Moment of Inertia Calculator</strong> computes the rotational inertia (I) of objects, which measures resistance to angular acceleration. It's the rotational analog of mass in linear motion—the larger the moment of inertia, the harder it is to spin an object.
        </p>
        <p>
          Moment of inertia depends on both the object's mass and how that mass is distributed relative to the axis of rotation. It is critical in rotational dynamics, mechanical engineering, and dynamics analysis.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Formulas</h2>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600 mb-4 space-y-3">
          <div>
            <p className="font-mono font-bold"><strong>Solid Sphere:</strong> I = (2/5) × M × R²</p>
          </div>
          <div>
            <p className="font-mono font-bold"><strong>Disk (perpendicular):</strong> I = (1/2) × M × R²</p>
          </div>
          <div>
            <p className="font-mono font-bold"><strong>Rod (about center):</strong> I = (1/12) × M × L²</p>
          </div>
          <div>
            <p className="font-mono font-bold"><strong>Solid Cylinder (along axis):</strong> I = (1/2) × M × R²</p>
          </div>
          <div>
            <p className="font-mono font-bold"><strong>Solid Cylinder (perpendicular):</strong> I = (1/12) × M × (3R² + H²)</p>
          </div>
          <div>
            <p className="font-mono font-bold"><strong>Rectangular Block (about center):</strong> I = (1/12) × M × (W² + H²)</p>
          </div>
          <div>
            <p className="font-mono font-bold mb-2"><strong>Parallel Axis Theorem:</strong> I = I_cm + M × d²</p>
            <p className="text-sm text-gray-700">Where I_cm is inertia about center of mass, M is mass, d is distance from center of mass to new axis.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Concepts</h2>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Rotational Analog of Mass:</strong> Just as mass resists linear acceleration (F = ma), moment of inertia resists angular acceleration (τ = Iα).</li>
          <li><strong>Mass Distribution Matters:</strong> Two objects with the same mass but different distributions have different moments of inertia. Moving mass farther from the axis increases I dramatically.</li>
          <li><strong>Units:</strong> Moment of inertia is measured in kg⋅m² (SI) or lb⋅ft² (US customary).</li>
          <li><strong>Parallel Axis Theorem:</strong> Allows calculation of I about any parallel axis if you know I about the center of mass. Essential for complex shapes.</li>
          <li><strong>Rotational Kinetic Energy:</strong> KE_rot = (1/2) × I × ω², where ω is angular velocity. Higher I means more energy to spin at same speed.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Moment of Inertia Examples</h2>
        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <div>
            <h4 className="font-semibold text-gray-800">Example 1: Spinning Disk</h4>
            <p className="text-sm">A metal disk: M = 5 kg, R = 0.3 m</p>
            <p className="text-sm mt-1"><strong>I = (1/2) × 5 × 0.3² = 0.225 kg⋅m²</strong></p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">Example 2: Rotating Rod</h4>
            <p className="text-sm">A rod spinning about its center: M = 2 kg, L = 1 m</p>
            <p className="text-sm mt-1"><strong>I = (1/12) × 2 × 1² = 0.167 kg⋅m²</strong></p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">Example 3: Off-Center Axis</h4>
            <p className="text-sm">Using parallel axis theorem for a 1 kg sphere about external tangent axis</p>
            <p className="text-sm">I_center = (2/5) × 1 × 0.1² = 0.004 kg⋅m² (R = 0.1 m)</p>
            <p className="text-sm">I_external = 0.004 + 1 × 0.1² = 0.014 kg⋅m²</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li>Select the shape (sphere, disk, rod, cylinder, rectangle, or compound).</li>
          <li>Enter the object's mass in your preferred unit (kg, g, lb).</li>
          <li>Enter relevant dimensions (radius, length, width, height).</li>
          <li>For cylinders and rectangles, choose the axis of rotation.</li>
          <li>Click <strong>Calculate</strong> to find the moment of inertia instantly.</li>
          <li>For complex shapes, use the compound mode with the parallel axis theorem.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Mechanical Engineering:</strong> Design of flywheels, shafts, and rotating machinery.</li>
          <li><strong>Automotive:</strong> Engine design, wheel dynamics, and vehicle stability analysis.</li>
          <li><strong>Robotics:</strong> Motor selection, joint design, and motion planning.</li>
          <li><strong>Aerospace:</strong> Propeller and rotor design, aircraft dynamics.</li>
          <li><strong>Structural Analysis:</strong> Torsional vibration analysis and stress prediction.</li>
          <li><strong>Sports Engineering:</strong> Equipment design (bats, disks, gyroscopes).</li>
          <li><strong>Biomechanics:</strong> Human joint analysis and movement dynamics.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>{createInternalLink('torque-calculator')} - Calculate torque and rotational force</li>
          <li>{createInternalLink('angular-velocity-calculator')} - Compute angular velocity and rotational speed</li>
          <li>{createInternalLink('mechanical-advantage-calculator')} - Analyze simple machines and levers</li>
          <li>{createInternalLink('kinetic-energy-calculator')} - Calculate rotational kinetic energy</li>
          <li>{createInternalLink('conservation-of-momentum-calculator')} - Analyze collision and momentum problems</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the difference between mass moment of inertia and polar moment of inertia?</h3>
            <p>Mass moment of inertia (I) is used in rotational dynamics (τ = Iα) and includes mass distribution. Polar moment of inertia (J) is used in torsion analysis for stress and angle of twist, and is a geometric property often of cross-sections.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Why does mass distribution matter for moment of inertia?</h3>
            <p>Moment of inertia increases with the square of distance from the axis (I ∝ M × d²). Moving mass farther away dramatically increases resistance to rotation. A heavy rim has much higher moment of inertia than a solid core of same mass.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I calculate moment of inertia for irregular shapes?</h3>
            <p>For irregular shapes, use integration: I = ∫ r² dm. Or decompose the shape into standard forms and sum their moments of inertia using the parallel axis theorem.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the parallel axis theorem?</h3>
            <p>The parallel axis theorem states I = I_cm + M × d², where I_cm is inertia about the center of mass, M is total mass, and d is distance to the new parallel axis. It allows quick calculation for off-center axes.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How does moment of inertia affect angular acceleration?</h3>
            <p>Angular acceleration is inversely proportional to moment of inertia: α = τ / I. Higher I means lower angular acceleration for the same torque—the object resists rotation more.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What happens to moment of inertia if I scale an object larger?</h3>
            <p>If you scale all dimensions by factor k and keep the same density, mass scales as k³ and distances scale as k, so moment of inertia scales as k⁵ (I ∝ M × d² scales as k³ × k²).</p>
          </div>
        </div>
      </section>
    </CalculatorPageTemplate>
  );
}
