import ProjectileRangeCalculator from '../../../_components/calculators/ProjectileRangeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function ProjectileRangeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Projectile Range Calculator – Projectile Motion"
      description="Calculate projectile range, time of flight, and peak height from launch speed and angle."
      calculator={<ProjectileRangeCalculator />}
      slug="physics/projectile-range-calculator"
      category="Kinematics"
      features={[
        'Computes range, time of flight, and max height',
        'Supports launch height above landing level',
        'Unit options: m/s, km/h, mph, ft/s',
        'Editable gravity for different planets',
        'Step-by-step formula reference',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Projectile Range?">
        <p>
          Projectile range is the horizontal distance a projectile travels before hitting the landing level. It depends on launch speed, launch angle, initial height, and gravity. At equal launch and landing heights, range is maximized at a 45° launch angle, but with non-zero launch height the optimal angle shifts lower.
        </p>
        <p className="mt-4">
          Use this calculator to determine range, time of flight, and peak height for any launch speed, angle, and initial height. It is ideal for physics problems, ballistics estimates, sports trajectory analysis, and engineering tests where accurate flight distances are required.
        </p>
      </SEOSection>

      <SEOSection title="Projectile Motion Formulas">
        <SEOFormula
          formula="t_{flight} = \frac{v_0 \sin\theta + \sqrt{v_0^2 \sin^2\theta + 2 g h_0}}{g}"
          description="Time of flight with launch height h₀, launch speed v₀, angle θ, and gravity g."
        />
        <SEOFormula
          formula="R = v_0 \cos\theta \times t_{flight}"
          description="Horizontal range equals horizontal velocity times time of flight."
        />
        <SEOFormula
          formula="h_{max} = h_0 + \frac{v_0^2 \sin^2\theta}{2g}"
          description="Maximum height measured from the landing reference level."
        />
        <SEOFormula
          formula="R_{level} = \frac{v_0^2 \sin(2\theta)}{g} \quad (h_0 = 0)"
          description="Simplified range when launch and landing heights are the same."
        />
      </SEOSection>

      <SEOSection title="How to Use the Projectile Range Calculator">
        <SEOList ordered items={[
          '<strong>Enter launch speed:</strong> Choose units m/s, km/h, mph, or ft/s.',
          '<strong>Set launch angle:</strong> Angle above horizontal in degrees.',
          '<strong>Add launch height:</strong> Height above landing level (meters).',
          '<strong>Adjust gravity if needed:</strong> Default 9.81 m/s², change for other planets.',
          '<strong>Click Calculate:</strong> Get range, time of flight, and maximum height with instant results.'
        ]} />
      </SEOSection>

      <SEOSection title="Optimizing Range">
        <p>
          For launches where start and landing heights are equal, maximum range occurs at 45°. If the launch point is higher, optimal angles are typically below 45° because gravity acts longer on higher arcs. Increasing launch speed, reducing gravity, or lowering drag (not modeled here) increases range.
        </p>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> v₀ = 30 m/s, θ = 40°, h₀ = 2 m, g = 9.81 m/s².</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>t = (30·sin40° + √((30·sin40°)² + 2·9.81·2)) / 9.81 ≈ 2.07 s</li>
          <li>Range R = 30·cos40° · 2.07 ≈ 47.6 m</li>
          <li>Max height hmax = 2 + (30²·sin²40°)/(2·9.81) ≈ 10.4 m</li>
        </ol>
        <p>Result: About 47.6 meters range, 2.07 seconds flight time, and 10.4 meters peak height.</p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Does this calculator include air resistance?',
            answer: 'No. It assumes ideal projectile motion without drag. Use it for vacuum or low-drag approximations.'
          },
          {
            question: 'Which angle gives maximum range?',
            answer: 'If launch and landing heights are equal, 45° maximizes range. With launch height above target, optimal angles are typically below 45°.'
          },
          {
            question: 'Can I change gravity?',
            answer: 'Yes. Enter any gravity value to model trajectories on Earth, Moon, Mars, or custom environments.'
          },
          {
            question: 'What units should I use?',
            answer: 'Use consistent speed units; the calculator converts internally. Output distances are shown in meters and times in seconds.'
          },
          {
            question: 'Is launch height required?',
            answer: 'No. Leave height at 0 for ground-level launches. Enter a positive height for elevated launches to extend range.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
