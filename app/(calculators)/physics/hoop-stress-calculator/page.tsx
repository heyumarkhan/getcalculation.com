import HoopStressCalculator from '../../../_components/calculators/HoopStressCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Hoop Stress Calculator | Pressure Vessel Design & Analysis';
const description = 'Calculate hoop stress, axial stress, and minimum wall thickness for pressure vessels, pipes, and cylindrical containers.';
const keywords = [
  'hoop stress calculator',
  'pressure vessel calculator',
  'hoop stress formula',
  'tangential stress calculator',
  'circumferential stress calculator',
  'pipe stress calculator',
  'pressure vessel design calculator',
  'wall thickness calculator',
  'cylindrical pressure vessel',
  'thin wall pressure vessel',
  'thick wall pressure vessel',
  'vessel stress analysis',
  'maximum pressure calculator',
  'pressure vessel thickness',
  'cylinder stress calculator',
  'longitudinal stress calculator',
  'radial stress calculator',
  'vessel design calculator',
  'piping stress calculator',
  'pressure container calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/hoop-stress-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/hoop-stress-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function HoopStressCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Hoop Stress Calculator | Pressure Vessel Design & Wall Thickness"
      description="Calculate hoop stress instantly for pressure vessels and cylindrical pipes. Find wall thickness, allowable pressure, and stress components."
      calculator={<HoopStressCalculator />}
      slug="physics/hoop-stress-calculator"
      category="Physics"
      features={[
        "Calculate hoop stress, axial stress, and radial stress components instantly",
        "Determine minimum wall thickness for safe pressure vessel design",
        "Support for thin-wall and thick-wall vessel calculations",
        "Unit-flexible inputs for pressure and dimensions",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Hoop Stress Calculator Matters in Industrial Pressure Systems">
        <p>
          A single miscalculation in hoop stress has catastrophic consequences: industrial pressure vessels explode, pipelines rupture, boilers fail catastrophically, and workers face severe injuries or death. The 2005 West Texas City refinery explosion killed 15 workers and injured 180 because pressure vessel stress calculations were inadequate; the 2019 San Juan Capistrano gas explosion devastated neighborhoods when hoop stress exceeded design limits. Every boiler, natural gas pipeline, hydraulic accumulator, and pressurized tank depends on precise hoop stress calculations to survive service conditions safely. A 500mm diameter vessel operating at just 2 MPa (20 bar) with 5mm wall thickness generates 40 MPa hoop stress—the circumferential force equivalent to a car pressing down on every millimeter. Without proper hoop stress analysis, vessels fail unpredictably; with precise calculations, they operate reliably for decades. Industries from petroleum refining (crude oil vessels at 30+ MPa) to aerospace (cabin pressurization at 0.07 MPa) to food processing (sterilization autoclaves at 2+ MPa) depend on the hoop stress calculator to verify vessel safety. ASME Section VIII code requires hoop stress calculations for all pressure vessel designs; insurers demand code compliance; regulatory agencies fine violators. The formula σ_h = pr/t reveals the brutal simplicity: doubling pressure or radius doubles hoop stress; doubling wall thickness halves it. Understanding hoop stress transforms guesswork into precision engineering. For related stress analysis in structural materials, explore our {createInternalLink('pressure-calculator')} for comprehensive force and stress calculations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation type: hoop/axial stress from known dimensions, minimum thickness sizing, maximum pressure rating, or strain analysis with material properties</li>
          <li><strong>Step 2:</strong> Enter vessel parameters with units: internal pressure (MPa, psi, bar), radius or diameter (mm, inches), wall thickness (mm, inches), and material properties if calculating strain</li>
          <li><strong>Step 3:</strong> Click Calculate to instantly receive hoop stress (circumferential), axial stress (longitudinal), radial stress components, minimum thickness requirements, and compliance verification against ASME code allowables</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Hoop Stress Calculator Formula">
        <p>
          Hoop stress (also called circumferential stress or tangential stress) is the tension stress acting circumferentially around a cylindrical pressure vessel's walls, perpendicular to the longitudinal (axial) direction. When internal pressure forces outward uniformly, the hoop stress carries the heaviest load—typically twice the axial stress—making it the critical design parameter in pressure vessel engineering. The fundamental hoop stress formula σ_h = pr/t elegantly expresses that stress increases linearly with pressure (p) and radius (r) but decreases inversely with wall thickness (t). For thin-walled vessels (diameter-to-thickness ratio d/t &gt; 20), this simple formula accurately predicts failure; for thick-walled vessels, more complex Lamé equations apply. The axial stress σ_a = pr/(2t) acts along the cylinder axis and equals half the hoop stress because it distributes only across the end cap area. Hoop strain ε_h = (σ_h - ν(σ_a + σ_r))/E quantifies deformation, where ν is Poisson's ratio (typically 0.27-0.34 for metals) and E is Young's modulus (200 GPa for steel). Real-world design adds safety factors (typically 3.5-4.0 on yield strength per ASME code) and corrosion allowances (1-3mm) to calculated thickness. The hoop stress calculator automates these calculations, eliminating manual math errors that could prove fatal. For related force and stress analysis in structures, check our {createInternalLink('force-calculator')} for detailed load calculations.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">σ_h = p × r / t</p>
          <p className="text-sm mt-2">Hoop Stress · σ_a = p × r / (2 × t) · Axial Stress · t = p × r / σ_allowable · Min Thickness</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Design a pressure vessel for 10 bar (1 MPa) working pressure with 500mm inner diameter and 5mm wall thickness:</p>
        <ul>
          <li>Given: Internal pressure p = 1 MPa, Radius r = 250mm, Wall thickness t = 5mm, Material: mild steel (yield strength 250 MPa)</li>
          <li>Calculate hoop stress: σ_h = (1 MPa × 250 mm) / 5 mm = 250/5 = <strong>50 MPa</strong> (circumferential tension)</li>
          <li>Calculate axial stress: σ_a = (1 MPa × 250 mm) / (2 × 5 mm) = 250/10 = <strong>25 MPa</strong> (longitudinal tension)</li>
          <li>Safety factor check: Yield strength = 250 MPa, ASME allowable stress = 250 MPa / 4 = 62.5 MPa, Actual stress 50 MPa &lt; 62.5 MPa ✓ (SAFE)</li>
          <li>Add corrosion allowance: Assume 2mm corrosion allowance for 10-year service life, Required thickness = 5mm + 2mm = <strong>7mm actual design thickness</strong></li>
          <li>Verify d/t ratio: 500mm / 7mm = 71.4 &gt; 20 ✓ (Thin-wall approximation valid, formula applies)</li>
          <li>Maximum safe pressure with current 5mm thickness: p_max = σ_allowable × t / r = 62.5 × 5 / 250 = <strong>1.25 MPa (12.5 bar)</strong> before safety margin exhausted</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Hoop stress calculations are critical across industries:</p>
        <SEOList items={[
          "Pressure vessel design: Boilers, storage tanks, accumulators, autoclaves, and reactors must withstand internal pressure without rupture or permanent deformation",
          "Pipeline engineering: Natural gas, crude oil, and water transmission pipelines require hoop stress analysis for safe operating pressure limits and wall thickness specifications",
          "Hydraulic systems: Cylinders, pumps, manifolds, and accumulators operate at 70-350 bar; hoop stress determines burst limits and service life",
          "Aerospace engineering: Fuselage pressurization, fuel tanks, and pneumatic systems require weight-optimized design using precise hoop stress calculations",
          "Automotive applications: Fuel tanks, air suspension systems, and compressed air storage require hoop stress verification for safety certification",
          "Code compliance: ASME Section VIII, PED, BPVC, and local regulations mandate hoop stress calculations for design approval and insurance coverage",
          "Fatigue analysis: Cycling pressure creates fatigue stresses; hoop stress amplitude determines endurance limits and inspection intervals",
          "Material selection: Hoop stress directly influences material choices; high-pressure vessels require titanium or special stainless alloys over mild steel"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Why is hoop stress greater than axial stress in cylindrical pressure vessels?",
            answer: "Hoop stress is twice axial stress because pressure acts circumferentially around the entire vessel perimeter, while axial stress concentrates only on the end cap area. The circumferential direction (hoop) carries continuous load from 360° of vessel circumference; the axial direction carries load only from the end cap cross-section. Hoop stress is the critical design constraint in thin-walled vessel codes and standards."
          },
          {
            question: "When is the thin-wall hoop stress formula valid versus thick-wall?",
            answer: "Use the simple thin-wall formula σ_h = pr/t when diameter-to-thickness ratio (d/t) exceeds 20. For d/t &lt; 20, use thick-wall Lamé equations σ_h = p(2r_o² + r_i²)/(r_o² - r_i²) where r_o and r_i are outer and inner radii. Most industrial pressure vessels fall in the thin-wall regime (d/t = 50-200), making the simple formula adequate and faster for design calculations."
          },
          {
            question: "What safety factors must I apply to hoop stress for ASME code compliance?",
            answer: "ASME Section VIII requires minimum 3.5-4.0 safety factor on yield strength. Allowable stress = (Yield Strength) / 4 for static loading. For example, mild steel with 250 MPa yield strength allows 62.5 MPa hoop stress. Always consult the relevant code section for your jurisdiction; other standards (PED, local regulations) may impose different factors. Safety factors account for material variability, fabrication defects, corrosion, and fatigue."
          },
          {
            question: "How does corrosion affect hoop stress calculations and design thickness?",
            answer: "Add a corrosion allowance (typically 1-3mm depending on fluid and service life) to calculated minimum thickness. Example: calculated 4mm thickness + 2mm corrosion allowance = 6mm design thickness. Over 10 years, vessel wall corrodes down to 4mm; at this point, vessel must be removed from service or re-thickened. Hoop stress increases as thickness decreases, making periodic inspection critical for corroding fluids."
          },
          {
            question: "How do I convert between gauge pressure and absolute pressure for hoop stress calculations?",
            answer: "Most industrial pressure gauges measure gauge pressure (above atmospheric). Absolute pressure = gauge pressure + 101.325 kPa. For example, 10 bar gauge = 10 + 1.013 = 11.013 bar absolute. Most hoop stress formulas use absolute pressure (to correctly handle vacuum vessels), but industry practice typically applies gauge pressure directly for non-vacuum vessels, which introduces minimal error (&lt; 1%) for pressures above 1 bar."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering hoop stress calculation is non-negotiable for anyone designing, inspecting, or operating pressurized equipment. This calculator eliminates manual computation errors and ensures code compliance, safety, and reliability across industrial applications.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('pressure-calculator')} for fluid pressure analysis, or the {createInternalLink('strain-calculator')} for comprehensive strain and deformation calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
