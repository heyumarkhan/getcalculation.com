import VonMisesStressCalculator from '../../../_components/calculators/VonMisesStressCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function VonMisesStressCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Von Mises Stress Calculator - Equivalent Stress Analysis"
      description="Calculate Von Mises stress for 2D and 3D stress states with safety factor."
      calculator={<VonMisesStressCalculator />}
      slug="physics/von-mises-stress-calculator"
      category="Mechanics"
      features={[
        'Calculates Von Mises equivalent stress for 2D and 3D states',
        'Supports plane stress and general 3D stress analysis',
        'Computes principal stresses for 2D cases',
        'Safety factor calculation with yield strength',
        'Preset examples for common loading conditions',
        'Instant results in MPa or psi',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Von Mises Stress?">
        <p>
          Von Mises stress (also called equivalent stress or effective stress) is a scalar value used in mechanical engineering to predict yielding of materials under complex, multiaxial stress states. Named after Richard von Mises, this stress criterion combines normal stresses (σ<sub>x</sub>, σ<sub>y</sub>, σ<sub>z</sub>) and shear stresses (τ<sub>xy</sub>, τ<sub>yz</sub>, τ<sub>zx</sub>) into a single number that can be compared directly to material yield strength from uniaxial tension tests.
        </p>
        <p className="mt-4">
          The Von Mises Stress Calculator is essential for structural engineers, mechanical designers, finite element analysts, and materials scientists performing failure analysis, safety assessments, and design optimization. When Von Mises stress exceeds the material's yield strength, plastic deformation begins. This calculator handles both 2D plane stress (thin plates, shells) and 3D general stress states (solid components, pressure vessels, machinery parts).
        </p>
      </SEOSection>

      <SEOSection title="Von Mises Stress Formula">
        <SEOFormula
          formula="σ_v = √(σ_x² - σ_x·σ_y + σ_y² + 3τ_xy²)"
          description="2D plane stress: combines in-plane normal and shear stresses."
        />
        <SEOFormula
          formula="σ_v = √(σ_x² + σ_y² + σ_z² - σ_x·σ_y - σ_y·σ_z - σ_z·σ_x + 3(τ_xy² + τ_yz² + τ_zx²))"
          description="3D general stress: accounts for all six independent stress components."
        />
        <SEOFormula
          formula="σ_v = √(0.5 × ((σ₁ - σ₂)² + (σ₂ - σ₃)² + (σ₃ - σ₁)²))"
          description="Alternative form using principal stresses σ₁, σ₂, σ₃."
        />
        <p className="mt-4 text-gray-700">
          Von Mises yield criterion: Material yields when σ<sub>v</sub> ≥ σ<sub>yield</sub>. Safety factor SF = σ<sub>yield</sub> / σ<sub>v</sub>.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Von Mises Stress Calculator">
        <SEOList
          ordered
          items={[
            '<strong>Select stress state:</strong> Choose 2D plane stress (thin plates, shells) or 3D general stress (solid parts).',
            '<strong>Use preset examples</strong> (uniaxial tension, pure shear, biaxial, combined) or enter custom values.',
            '<strong>Enter normal stresses</strong> σ<sub>x</sub>, σ<sub>y</sub> (and σ<sub>z</sub> for 3D) in MPa or psi.',
            '<strong>Enter shear stresses</strong> τ<sub>xy</sub> (and τ<sub>yz</sub>, τ<sub>zx</sub> for 3D) in matching units.',
            '<strong>Optional:</strong> Enter material yield strength to calculate safety factor.',
            '<strong>Click Calculate</strong> to get Von Mises stress, principal stresses (2D), and safety factor.',
            '<strong>Review results:</strong> Von Mises stress should be below yield strength for safe design (SF ≥ 2 recommended).'
          ]}
        />
      </SEOSection>

      <SEOSection title="Understanding Von Mises Yield Criterion">
        <p className="mb-4">
          Key concepts in Von Mises stress analysis:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Distortion energy theory:</strong> Von Mises criterion assumes yielding occurs when distortion strain energy reaches a critical value, ignoring hydrostatic (volumetric) stress effects.</li>
          <li><strong>Ductile materials:</strong> Excellent for metals like steel, aluminum, copper; less accurate for brittle materials (use maximum principal stress instead).</li>
          <li><strong>Multiaxial stress:</strong> Converts 3D stress tensor (6 components) into scalar equivalent stress for direct comparison with uniaxial test data.</li>
          <li><strong>Principal stresses:</strong> Maximum, intermediate, and minimum normal stresses on planes with zero shear; rotated stress state.</li>
          <li><strong>Yield surface:</strong> In 3D principal stress space, Von Mises forms a cylinder; points inside = elastic, outside = plastic.</li>
          <li><strong>Safety factor:</strong> SF = 1 means imminent yielding; SF ≥ 1.5-2.0 typical for static loads; SF ≥ 3-6 for fatigue or dynamic loads.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Applications of Von Mises Stress Calculations">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Finite Element Analysis (FEA):</strong> Post-processing stress results from ANSYS, Abaqus, COMSOL to identify critical failure zones.</li>
          <li><strong>Pressure vessels:</strong> ASME Boiler and Pressure Vessel Code uses Von Mises for combined hoop, longitudinal, and radial stresses in tanks, pipes.</li>
          <li><strong>Mechanical design:</strong> Shafts under torsion + bending, gears with contact stress, bolted joints, welded connections.</li>
          <li><strong>Aerospace structures:</strong> Aircraft fuselage, wing spars, landing gear under combined aerodynamic and inertial loads.</li>
          <li><strong>Automotive components:</strong> Engine blocks, suspension arms, chassis frames experiencing multiaxial cyclic stresses.</li>
          <li><strong>Material selection:</strong> Comparing Von Mises stress to yield/ultimate strengths of candidate materials (steel vs. aluminum vs. titanium).</li>
          <li><strong>Failure analysis:</strong> Reverse-engineering fractures by reconstructing stress state at failure location.</li>
          <li><strong>Manufacturing processes:</strong> Metal forming (forging, rolling, extrusion) where plastic flow initiates at Von Mises yield.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Von Mises vs Other Failure Theories">
        <p className="mb-4">
          Comparing stress failure criteria:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Von Mises (Distortion Energy):</strong> Best for ductile metals; predicts yielding based on shear strain energy; circular yield surface in π-plane.</li>
          <li><strong>Tresca (Maximum Shear Stress):</strong> Conservative for ductile materials; τ<sub>max</sub> = (σ<sub>1</sub> - σ<sub>3</sub>)/2 ≤ τ<sub>yield</sub>; hexagonal yield surface, simpler calculation.</li>
          <li><strong>Maximum Principal Stress:</strong> Suitable for brittle materials (cast iron, ceramics); σ<sub>1</sub> ≤ σ<sub>tensile</sub>; doesn't account for multiaxial benefit.</li>
          <li><strong>Mohr-Coulomb:</strong> Accounts for different tensile/compressive strengths; used for soils, concrete, rocks.</li>
          <li><strong>Comparison:</strong> Von Mises ~15% less conservative than Tresca; for pure shear, Von Mises predicts yield at τ = 0.577σ<sub>y</sub>, Tresca at τ = 0.5σ<sub>y</sub>.</li>
          <li><strong>Experimental validation:</strong> Von Mises matches test data for ductile metals within 5-10%; Tresca underpredicts capacity slightly.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example: Combined Loading">
        <p className="mb-4"><strong>Scenario:</strong> Steel shaft (σ<sub>yield</sub> = 250 MPa) under σ<sub>x</sub> = 80 MPa tension and τ<sub>xy</sub> = 60 MPa torsional shear.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Given: σ<sub>x</sub> = 80 MPa, σ<sub>y</sub> = 0, τ<sub>xy</sub> = 60 MPa (plane stress, 2D)</li>
          <li>Von Mises formula: σ<sub>v</sub> = √(σ<sub>x</sub>² - σ<sub>x</sub>·σ<sub>y</sub> + σ<sub>y</sub>² + 3τ<sub>xy</sub>²)</li>
          <li>Substitute: σ<sub>v</sub> = √(80² - 80×0 + 0² + 3×60²)</li>
          <li>Calculate: σ<sub>v</sub> = √(6400 + 0 + 0 + 10800) = √17200</li>
          <li>Result: σ<sub>v</sub> = 131.1 MPa</li>
          <li>Safety factor: SF = 250 / 131.1 = 1.91 (marginally safe for static load)</li>
          <li>Principal stresses: σ<sub>1</sub> = 40 + √(40² + 60²) = 112.1 MPa, σ<sub>2</sub> = -32.1 MPa</li>
          <li><strong>Conclusion:</strong> Design safe with SF ≈ 2, but consider upsizing for fatigue or dynamic loads (SF ≥ 3 recommended).</li>
        </ol>
      </SEOSection>

      <SEOSection title="Material Yield Strengths (Reference)">
        <p className="mb-4">
          Typical yield strengths for Von Mises safety factor calculations:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Mild steel (A36):</strong> 250 MPa (36 ksi)</li>
          <li><strong>High-strength steel (A572 Grade 50):</strong> 345 MPa (50 ksi)</li>
          <li><strong>Stainless steel (304):</strong> 215 MPa (31 ksi)</li>
          <li><strong>Aluminum 6061-T6:</strong> 275 MPa (40 ksi)</li>
          <li><strong>Aluminum 7075-T6:</strong> 505 MPa (73 ksi)</li>
          <li><strong>Titanium Ti-6Al-4V:</strong> 880 MPa (128 ksi)</li>
          <li><strong>Copper (annealed):</strong> 70 MPa (10 ksi)</li>
          <li><strong>Brass (70/30):</strong> 125 MPa (18 ksi)</li>
          <li><strong>Cast iron (gray):</strong> Not applicable (brittle; use max principal stress)</li>
        </ul>
        <p className="mt-4 text-gray-700">
          Note: Values vary with heat treatment, work hardening, and alloy composition. Always verify with material certifications or ASTM standards.
        </p>
      </SEOSection>

      <SEOSection title="2D vs 3D Stress States">
        <p className="mb-4">
          When to use each mode:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>2D Plane Stress:</strong> Thin-walled structures (thickness ≪ lateral dimensions): sheet metal, pressure vessel walls, aircraft skin, roof panels. Assumes σ<sub>z</sub> = τ<sub>yz</sub> = τ<sub>zx</sub> = 0 on free surfaces.</li>
          <li><strong>3D General Stress:</strong> Solid components with loading in all directions: bearing blocks, gear teeth, engine pistons, thick-walled pressure vessels. Requires all six stress components.</li>
          <li><strong>Plane Strain:</strong> Long structures (dams, tunnels, retaining walls) with constrained z-direction; use generalized plane strain FEA, not this calculator.</li>
          <li><strong>Axisymmetric:</strong> Rotating shafts, pressure vessels with axial symmetry; simplifies to 2D with hoop stress; can approximate with 2D calculator.</li>
          <li><strong>Simplification errors:</strong> Using 2D for 3D problems underestimates Von Mises stress by 0-30% depending on neglected out-of-plane stresses.</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the difference between Von Mises stress and principal stress?',
            answer: 'Principal stresses are the maximum, intermediate, and minimum normal stresses on planes with zero shear stress—they describe the stress state orientation. Von Mises stress is a scalar combining all stress components into an equivalent uniaxial stress for yielding prediction. Principal stresses are directional; Von Mises is magnitude only.'
          },
          {
            question: 'When should I use Von Mises vs Tresca failure criterion?',
            answer: 'Use Von Mises for ductile metals (steel, aluminum, copper) when accurate prediction is needed; it matches experimental data closely. Use Tresca for conservative design or when computational simplicity is required. Von Mises predicts ~15% higher allowable stress than Tresca for the same yield strength. For brittle materials (cast iron, glass), use maximum principal stress theory instead.'
          },
          {
            question: 'What safety factor should I target for Von Mises stress?',
            answer: 'Static loads with well-defined geometry: SF ≥ 1.5-2.0. Dynamic/cyclic loads (fatigue): SF ≥ 3-6 depending on stress concentration and cycles. Uncertain loading or critical components: SF ≥ 2.5-4. Aerospace/medical: SF ≥ 1.25-1.5 with extensive testing. Check industry codes (ASME, AISC, Eurocode) for specific requirements.'
          },
          {
            question: 'Can I use Von Mises stress for fatigue analysis?',
            answer: 'Von Mises stress is a starting point for fatigue, but full fatigue analysis requires stress amplitude, mean stress, stress concentrations, surface finish, and S-N curves. Use Von Mises to identify high-stress locations, then apply Goodman, Soderberg, or Gerber criteria with alternating/mean stress decomposition. Most FEA software offers dedicated fatigue modules.'
          },
          {
            question: 'Why does my FEA software show higher Von Mises stress than my hand calculation?',
            answer: 'Common reasons: 1) Stress concentrations at holes, fillets, corners (use Kt factors), 2) Mesh refinement reveals local peaks, 3) Your hand calc uses average/nominal stress; FEA shows point-wise maximum, 4) Boundary conditions or load assumptions differ, 5) Nonlinear material/geometry effects in FEA. Validate FEA with simple benchmark problems (beam bending, pressure vessel) before trusting complex results.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
