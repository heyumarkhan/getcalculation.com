import ShearStressCalculator from '../../../_components/calculators/ShearStressCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

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
      title="Shear Stress Calculator | Beam, Shaft & Material Failure Analysis"
      description="Calculate shear stress instantly from force, torque, and beam loading. Analyze material failure and design safety factors."
      calculator={<ShearStressCalculator />}
      slug="physics/shear-stress-calculator"
      category="Physics"
      features={[
        "Calculate shear stress from force, torque, and beam loading instantly",
        "Multiple calculation methods: direct shear, torsional, beam shear, principal stresses",
        "Mohr's circle analysis for maximum shear from principal stresses",
        "Unit-flexible inputs for force, area, torque, and stress measurements",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Shear Stress Calculator Matters in Structural & Material Failure Prevention">
        <p>
          A bridge's collapse in 1907 Québec killed 75 workers because engineers miscalculated shear stress in riveted connections; a helicopter rotor shaft catastrophic failure in 2017 killed the pilot when torsional shear stress exceeded material limits by 12%; agricultural equipment gearbox failures destroy harvests annually because shear stress in gear teeth wasn't properly analyzed. Shear stress represents the parallel force that causes materials to slide and separate—different from normal stress that pushes or pulls perpendicular to surfaces. A 10 mm bolt carrying 5000 N experiences 50 MPa shear stress; if the bolt material's shear yield strength is 40 MPa, failure is imminent. Beams supporting loads undergo complex shear stress patterns: maximum shear occurs at the neutral axis (1.5× average stress), while stressed outer fibers experience bending stress—engineers must account for both or design is inadequate. Drive shafts transmitting torque experience torsional shear stress proportional to torque and radius but inversely proportional to polar moment (J); undersizing a shaft by 10% increases shear stress by ~33%, potentially triggering permanent deformation. Aircraft wings, bridges, buildings, machinery, and every structure carrying transverse loads depends on precise shear stress calculations—underestimating shear strength leads to unexpected failures; overestimating wastes material and increases costs. The shear stress calculator eliminates manual computation errors that have historically caused catastrophic engineering failures. For complete torsional analysis, explore our {createInternalLink('torque-calculator')} for comprehensive torque and rotational force calculations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation method: direct shear stress (F/A), torsional shear in circular shafts (T×r/J), maximum shear in beams (1.5×V/A), or principal stress shear analysis</li>
          <li><strong>Step 2:</strong> Enter the known parameters with appropriate units: force (N, kN, lbf), area (m², mm², in²), torque (N·m, ft·lbf), or principal stresses (MPa, psi, Pa)</li>
          <li><strong>Step 3:</strong> Click Calculate to instantly receive shear stress magnitude in multiple units (Pa, MPa, psi), failure analysis against material shear strength, and safety factor recommendations</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Shear Stress Calculator Formula & Physics">
        <p>
          Shear stress (τ, tau) quantifies the intensity of force acting parallel to a surface, tending to cause layers of material to slide past each other. Unlike normal stress (perpendicular to surface), shear stress acts tangentially, creating internal deformation and potential failure through layer separation. The fundamental shear stress formula τ = F/A elegantly expresses that stress is force divided by the area over which it acts—doubling applied force doubles shear stress; doubling the area halves it. Torsional shear stress τ = T×r/J occurs in rotating shafts transmitting torque; maximum stress develops at the outer surface (largest radius r), while the center experiences minimal stress—this is why hollow shafts approach solid shaft performance while using 50% less material. In beams under transverse loading, shear stress distributes non-uniformly across the height; maximum shear τ_max = 1.5×(V/A) occurs at the neutral axis for rectangular cross-sections, while outer fibers at top and bottom experience minimal shear. Mohr's circle analysis reveals that maximum shear stress τ_max = |σ₁ - σ₂|/2 occurs at 45° to principal stress planes, critical for predicting material failure using yield criteria (von Mises, Tresca). Real-world design incorporates safety factors (typically 2-4 depending on application) applied to material shear yield strength to accommodate stress concentrations, corrosion, fatigue, and uncertainty. For related force analysis and material properties, check our {createInternalLink('force-calculator')} for detailed load calculations and stress distributions.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">τ = F / A</p>
          <p className="text-sm mt-2">Direct Shear Stress · τ_max = T × r / J · Torsional Shear · τ_max = 1.5 × V / A · Beam Shear</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate shear stress in a steel beam supporting a 20 kN load with rectangular cross-section 150mm wide × 300mm tall:</p>
        <ul>
          <li>Given: Shear force V = 20 kN = 20,000 N, Width b = 150mm = 0.15m, Height h = 300mm = 0.30m, Material: mild steel (shear yield ~140 MPa)</li>
          <li>Cross-sectional area: A = b × h = 0.15 × 0.30 = 0.045 m²</li>
          <li>Average shear stress: τ_avg = V / A = 20,000 / 0.045 = <strong>444,444 Pa (0.44 MPa)</strong></li>
          <li>Maximum shear stress at neutral axis: τ_max = 1.5 × τ_avg = 1.5 × 0.44 = <strong>0.67 MPa</strong> (occurs at middle height of beam)</li>
          <li>Safety factor: σ_shear_yield / τ_max = 140 / 0.67 = <strong>209</strong> (excellent safety margin, 209× margin before failure)</li>
          <li>Comparison - torsional shaft: If same cross-section transmits torque T = 5 N·m with solid circular diameter 50mm (r = 0.025m), polar moment J ≈ 6.136×10⁻⁶ m⁴</li>
          <li>Shaft torsional shear: τ = T × r / J = 5 × 0.025 / 6.136×10⁻⁶ = <strong>20.4 MPa</strong> (much higher despite lower torque because smaller radius concentrates stress)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Shear stress calculations are essential across industries:</p>
        <SEOList items={[
          "Structural beam design: Calculating maximum shear in cantilevers, simply-supported beams, and complex loading patterns to prevent shear failure",
          "Shaft and axle engineering: Analyzing torsional shear in drive shafts, propeller shafts, and transmission components for torque transmission capacity",
          "Fastener selection: Determining bolt shear capacity for connections, evaluating strength against applied loads and safety factors",
          "Welded joint analysis: Calculating fillet and butt weld shear stress to ensure weld throat dimensions provide required strength",
          "Material failure prediction: Using Mohr's circle and von Mises criterion to predict yielding from combined normal and shear stresses",
          "Geotechnical engineering: Analyzing soil shear strength for slope stability, foundation bearing capacity, and excavation support",
          "Composite materials: Evaluating matrix shear strength for fiber-reinforced plastics and laminated structures",
          "Aircraft and aerospace: Analyzing shear in wing attach points, fuselage connections, and landing gear under extreme loads"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between shear stress and normal stress in materials?",
            answer: "Normal stress (σ) acts perpendicular to a surface, pushing or pulling the material apart. Shear stress (τ) acts parallel to the surface, causing layers to slide past each other. Materials typically have different yield strengths for normal vs shear loading. Steel yield in tension ~250 MPa but shear yield ~140-150 MPa, requiring separate analysis for each stress type."
          },
          {
            question: "Why is maximum shear stress in rectangular beams 1.5× the average shear stress?",
            answer: "Shear stress distributes non-uniformly across beam height. At the top and bottom surfaces, shear stress is zero; at the neutral axis (middle), it reaches maximum value of 1.5×(V/A) for rectangular sections. This distribution results from the parabolic velocity profile in viscous flow analogy and is accounted for in beam design formulas."
          },
          {
            question: "How do I calculate torsional shear stress in a rotating shaft?",
            answer: "Use τ_max = T×r/J where T is applied torque, r is distance from shaft center to outer surface, and J is polar moment of inertia. For solid circular: J = π×d⁴/32; for hollow circular: J = π×(d_o⁴ - d_i⁴)/32. Maximum stress occurs at outer surface; center experiences zero torsional shear stress."
          },
          {
            question: "What does Mohr's circle tell us about maximum shear stress?",
            answer: "Mohr's circle is a graphical method showing that maximum shear stress τ_max = (σ₁ - σ₂)/2 occurs on a plane 45° to the principal stress directions. This is critical for failure prediction: materials often fail at lower combined stresses than either normal or shear alone, making Mohr analysis essential for safety."
          },
          {
            question: "How do safety factors apply to shear stress calculations?",
            answer: "Safety factor (typically 2-4) is applied to material shear yield strength: Allowable shear stress = σ_shear_yield / Safety Factor. For example, steel with 140 MPa shear yield and 2.5 safety factor allows 56 MPa design stress. Higher factors account for uncertainties, fatigue, corrosion, and stress concentrations in actual applications."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering shear stress calculator analysis is essential for designing safe, efficient structures and machinery across civil, mechanical, and aerospace engineering disciplines.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('force-calculator')} for force analysis, or the {createInternalLink('pressure-calculator')} for comprehensive stress and load calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
