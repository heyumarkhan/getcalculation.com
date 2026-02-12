import YoungsModulusCalculator from '../../../_components/calculators/YoungsModulusCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function YoungsModulusCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Young's Modulus Calculator: Stress, Strain, and Material Stiffness"
      description="Calculate Young's modulus, stress, or strain from force, area, and elongation. Compare material stiffness for design and control. Free calculator for engineers."
      calculator={<YoungsModulusCalculator />}
      slug="physics/youngs-modulus-calculator"
      category="Physics"
      features={[
        "Calculate Young's modulus with fast, precise elasticity formulas",
        "Simple inputs for stress, strain, force, area, and elongation",
        "Clear, mobile-friendly layout for lab and field use",
        "Instant results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Young's Modulus Matters in Real Designs">
        <p>
          Young's modulus links force, deformation, and material stiffness, making it essential for structural design, product testing, and quality control. Engineers use it to predict how beams, rods, and components will elongate under load, validate material specifications, and avoid excessive deflection. Whether you are checking tensile test data or selecting a material for a lightweight structure, accurate elasticity calculations keep projects safe and efficient. If you are also estimating load-driven behavior, the {createInternalLink('force-calculator')} provides a helpful companion for verifying applied forces.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Choose the values you have: force, area, original length, and elongation.</li>
          <li><strong>Step 2:</strong> Enter the measurements in consistent units (N, m, and m² or their metric equivalents).</li>
          <li><strong>Step 3:</strong> Click Calculate to compute stress, strain, and Young's modulus in Pa or GPa.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Young's Modulus Calculator Formula">
        <p>
          Young's modulus measures material stiffness by comparing stress to strain in the linear elastic region. Stress is force distributed over area, and strain is the relative change in length. Combining these relationships yields a direct formula for elasticity, helping engineers compare materials like steel, aluminum, and polymers using consistent mechanical properties.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">E = σ/ε = (F/A) / (ΔL/L₀) = (F·L₀)/(A·ΔL)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          A metal rod 2.0 m long stretches by 1.2 mm under a 12,000 N tensile force. The cross-sectional area is 300 mm². Find Young's modulus.
        </p>
        <ul>
          <li>Input: F = 12,000 N, L₀ = 2.0 m, A = 300 mm² = 3.0 × 10⁻⁴ m², ΔL = 1.2 mm = 1.2 × 10⁻³ m</li>
          <li>Result: E = (12,000 × 2.0) / (3.0 × 10⁻⁴ × 1.2 × 10⁻³) ≈ 6.67 × 10¹⁰ Pa = 66.7 GPa</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>
          Young's modulus calculations appear across engineering, manufacturing, and materials science:
        </p>
        <SEOList
          items={[
            "Structural engineering to check deflection and stiffness requirements in beams and columns",
            "Materials selection for aerospace, automotive, and consumer products where weight and rigidity matter",
            "Quality control in tensile testing to verify supplier specifications and compliance"
          ]}
        />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ
          questions={[
            {
              question: "What does a higher Young's modulus mean?",
              answer: "A higher Young's modulus indicates a stiffer material that deforms less under the same stress. For example, steel is much stiffer than rubber or plastics."
            },
            {
              question: "Can Young's modulus be used beyond the elastic range?",
              answer: "No. The formula applies only in the linear elastic region. Once a material yields or plastically deforms, the stress-strain relationship is no longer linear."
            },
            {
              question: "What units should I use for the inputs?",
              answer: "Use Newtons for force, meters for length, and square meters for area. If you enter mm or mm², convert them to meters and m² to keep results consistent."
            },
            {
              question: "How is Young's modulus different from tensile strength?",
              answer: "Young's modulus measures stiffness (elastic response), while tensile strength measures the maximum stress a material can withstand before failure."
            },
            {
              question: "What typical values should I expect?",
              answer: "Approximate values include aluminum at 69 GPa, steel at 200 GPa, and common polymers between 1–5 GPa."
            }
          ]}
        />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering Young's modulus is easy with the right tools, helping you compare stiffness, validate test data, and build safer designs.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('acceleration-calculator')} or the popular {createInternalLink('displacement-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
