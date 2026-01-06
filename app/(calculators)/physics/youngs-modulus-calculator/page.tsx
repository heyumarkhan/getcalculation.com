import YoungsModulusCalculator from '../../../_components/calculators/YoungsModulusCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function YoungsModulusCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Young's Modulus Calculator — Stress, Strain & Elastic Modulus"
      description="Calculate Young's modulus (E), stress, strain, required force, or required cross-sectional area using standard elasticity formulas. Ideal for materials engineering and mechanics problems."
      calculator={<YoungsModulusCalculator />}
      slug="physics/youngs-modulus-calculator"
      category="Mechanics"
      features={["Calculate Young's modulus (E)", "Compute stress and strain", "Determine required force or area", "SI unit conversions and clear results"]}
    >
      <SEOSection title="What is Young's Modulus?">
        <p>Young's modulus (E) is a measure of a material's stiffness, defined as the ratio of stress to strain for linear elastic materials.</p>
        <p>Use this calculator to compute E from measured force, area, original length and deformation, or to compute required force/area for a target deformation.</p>
      </SEOSection>

      <SEOSection title="How to Use the Young's Modulus Calculator">
        <ol>
          <li>Select what you want to calculate: Young's modulus, stress, strain, force, or area.</li>
          <li>Enter the known values. Areas use mm² to make common engineering inputs easier (converted internally to m²).</li>
          <li>Press Calculate to get results in readable units (GPa for E when large, Pa for stress).</li>
        </ol>
      </SEOSection>

      <SEOSection title="Formulas and Units">
        <p>Stress (σ) = F / A (Pa where A in m²)</p>
        <p>Strain (ε) = ΔL / L₀ (unitless)</p>
        <p>Young's Modulus (E) = σ / ε (Pa, often reported in GPa)</p>
      </SEOSection>

      <SEOSection title="Practical Examples">
        <p>Example: A steel specimen (E ≈ 210 GPa) 1 m long stretches by 0.5 mm under a given force — the calculator can find stress/force/area as needed.</p>
      </SEOSection>

      <SEOFAQ
        questions={[
          { question: "What units should I use?", answer: "Enter force in Newtons (N), lengths in millimeters (mm), and area in mm². The calculator converts units internally to SI (m, m²) and returns E in GPa/Pa depending on magnitude." },
          { question: "What does a high Young's modulus mean?", answer: "A high Young's modulus indicates a stiffer material; for example steel (~200 GPa) is much stiffer than rubber (~0.01–0.1 GPa)." },
          { question: "Can I use this for large deformations?", answer: "No — Young's modulus applies to linear elastic region only. For large or plastic deformations, use appropriate nonlinear material models." },
          { question: "How is area entered?", answer: "Enter cross-sectional area in mm² for convenience; the calculator converts to m² when computing stress." }
        ]}
      />

      <SEOList items={["Young's modulus calculator","E modulus calculator","stress and strain calculator","elastic modulus calculator","material stiffness calculator","mechanics calculator","Young modulus online","calculate Young's modulus","Young's modulus GPa calculator"]} />
    </CalculatorPageTemplate>
  );
}
