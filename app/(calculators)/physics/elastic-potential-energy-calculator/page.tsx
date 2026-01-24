import ElasticPotentialEnergyCalculator from '../../../_components/calculators/ElasticPotentialEnergyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function ElasticPotentialEnergyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Elastic Potential Energy Calculator - Spring Energy Storage"
      description="Calculate elastic potential energy stored in springs using E = 1/2 kx² formula."
      calculator={<ElasticPotentialEnergyCalculator />}
      slug="physics/elastic-potential-energy-calculator"
      category="Mechanics"
      features={[
        'Calculates elastic potential energy in springs',
        'Spring constant and displacement input',
        'Bidirectional energy calculations',
        'Hooke Law force calculation',
        'Multiple calculation modes',
        'Real-time spring energy results',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Elastic Potential Energy?">
        <p>
          Elastic potential energy is the energy stored in elastic materials when they are stretched or compressed from their equilibrium position. This energy is recoverable - when released, the material returns to its original shape, converting stored energy back to kinetic energy or work.
        </p>
        <p className="mt-4">
          Springs, rubber bands, bow strings, and trampolines all store elastic potential energy. The energy depends on the spring constant (material stiffness) and displacement (how far stretched or compressed). Understanding elastic energy is fundamental in mechanical engineering, physics, and systems involving oscillation and vibration.
        </p>
      </SEOSection>

      <SEOSection title="Elastic Potential Energy Formula">
        <SEOFormula
          formula="E = (1/2) * k * x^2"
          description="Elastic potential energy (joules) where k = spring constant (N/m), x = displacement from equilibrium (m)."
        />
        <SEOFormula
          formula="k = 2E / x^2"
          description="Spring constant calculated from energy and displacement."
        />
        <SEOFormula
          formula="x = sqrt(2E / k)"
          description="Displacement calculated from energy and spring constant."
        />
        <SEOFormula
          formula="F = k * x"
          description="Hooke's Law: Spring force equals spring constant times displacement."
        />
      </SEOSection>

      <SEOSection title="Understanding Spring Constant">
        <p className="mb-4">
          The spring constant (k) measures material stiffness and resistance to deformation:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Higher k:</strong> Stiffer spring requires more force for same displacement; stores more energy.</li>
          <li><strong>Lower k:</strong> Softer spring easier to compress; stores less energy for same displacement.</li>
          <li><strong>Units:</strong> Newtons per meter (N/m) or pounds per inch (lb/in).</li>
          <li><strong>Material dependency:</strong> Steel springs have higher k than rubber; varies with wire diameter and coil count.</li>
          <li><strong>Energy scaling:</strong> Energy increases linearly with k but quadratically with displacement (x²).</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use the Elastic Potential Energy Calculator">
        <SEOList ordered items={[
          '<strong>Select calculation mode:</strong> Choose to calculate energy, spring constant, or displacement.',
          '<strong>Enter known values:</strong> Input spring constant (N/m) and displacement (m) for energy calculation.',
          '<strong>Click Calculate:</strong> Compute elastic potential energy and spring force.',
          '<strong>Review results:</strong> View energy (J), spring constant, displacement, and force.',
          '<strong>Verify with Hooke Law:</strong> Check force calculation F = kx for consistency.'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p className="mb-4">
          Elastic potential energy calculations apply to:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Suspension Systems:</strong> Car and bike suspensions absorb shock energy in springs and dampers.</li>
          <li><strong>Archery:</strong> Bow limbs store energy when drawn, releasing it to propel arrows.</li>
          <li><strong>Trampolines:</strong> Springs store jumper energy, returning it for bounce height.</li>
          <li><strong>Mechanical Watches:</strong> Mainsprings store winding energy to power timekeeping mechanisms.</li>
          <li><strong>Pogo Sticks:</strong> Compression springs convert gravitational potential to kinetic energy.</li>
          <li><strong>Crash Protection:</strong> Bumpers and crumple zones use elastic deformation to absorb impact energy.</li>
          <li><strong>Spring-Loaded Tools:</strong> Clamps, valves, and latches use spring energy for actuation.</li>
          <li><strong>Vibration Isolation:</strong> Spring mounts isolate machinery vibrations.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Energy Conservation in Springs">
        <p className="mb-4">
          Elastic systems demonstrate energy conservation principles:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Work-Energy Theorem:</strong> Work done compressing spring equals stored elastic energy.</li>
          <li><strong>Energy Transfer:</strong> Kinetic energy converts to elastic potential, then back to kinetic when released.</li>
          <li><strong>Simple Harmonic Motion:</strong> Springs oscillate with continuous energy exchange between kinetic and potential.</li>
          <li><strong>Period of Oscillation:</strong> T = 2π × sqrt(m/k), where m is mass, k is spring constant.</li>
          <li><strong>Energy Loss:</strong> Real springs lose energy to heat (damping), reducing amplitude over time.</li>
          <li><strong>Maximum Compression:</strong> Limited by material yield strength; exceeding causes permanent deformation.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> A spring with constant k = 200 N/m is compressed 0.3 meters. How much energy is stored?</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Given: k = 200 N/m, x = 0.3 m</li>
          <li>Calculate energy: E = (1/2) × k × x²</li>
          <li>E = 0.5 × 200 × (0.3)² = 0.5 × 200 × 0.09 = 9 joules</li>
          <li>Calculate force at maximum compression: F = k × x = 200 × 0.3 = 60 N</li>
          <li>The spring stores 9 J of energy and exerts 60 N restoring force when compressed 0.3 m.</li>
          <li>If released, this 9 J converts to kinetic energy, launching a mass or doing work.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Spring Types and Characteristics">
        <p className="mb-4">
          Different spring types have varying energy storage characteristics:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Compression Springs:</strong> Store energy when compressed (car suspensions, pogo sticks).</li>
          <li><strong>Extension Springs:</strong> Store energy when stretched (garage doors, trampolines).</li>
          <li><strong>Torsion Springs:</strong> Store energy when twisted (clothespins, mousetraps).</li>
          <li><strong>Leaf Springs:</strong> Flat springs used in vehicle suspensions (trucks, trailers).</li>
          <li><strong>Wave Springs:</strong> Compact springs with high load capacity (valves, clutches).</li>
          <li><strong>Gas Springs:</strong> Use compressed gas instead of metal (office chairs, hatchbacks).</li>
          <li><strong>Constant Force Springs:</strong> Provide near-constant force over displacement range.</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Why does elastic energy depend on x² rather than x?',
            answer: 'Because force increases linearly with displacement (F = kx), and work is force integrated over distance. Work = ∫F dx = ∫kx dx = (1/2)kx². The quadratic relationship means doubling displacement quadruples stored energy.'
          },
          {
            question: 'What happens if I compress a spring beyond its elastic limit?',
            answer: 'The spring undergoes plastic deformation and will not return to its original shape. The material yields permanently, and the spring constant changes. Always stay within the elastic range (linear region of stress-strain curve).'
          },
          {
            question: 'How is elastic potential energy different from gravitational potential energy?',
            answer: 'Gravitational PE depends linearly on height (mgh), while elastic PE depends quadratically on displacement ((1/2)kx²). Gravitational force is constant; spring force increases with displacement. Both are conservative forces allowing energy conversion.'
          },
          {
            question: 'Can negative displacement give negative energy?',
            answer: 'No. Since energy depends on x², displacement direction (positive or negative) does not matter. Compression and extension by the same amount store identical energy. Energy is always positive or zero.'
          },
          {
            question: 'How do I measure spring constant experimentally?',
            answer: 'Hang known masses on the spring and measure displacement for each mass. Plot force (F = mg) vs displacement (x). Spring constant k is the slope of the linear fit. Ensure you stay in the elastic region.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
