import BendAllowanceCalculator from '../../../_components/calculators/BendAllowanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function BendAllowanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Bend Allowance Calculator - Sheet Metal Bending Calculations"
      description="Calculate bend allowance, bend deduction, and setback for sheet metal fabrication."
      calculator={<BendAllowanceCalculator />}
      slug="physics/bend-allowance-calculator"
      category="Mechanics"
      features={[
        'Calculates bend allowance for sheet metal',
        'Bend deduction and outside setback',
        'K-factor adjustment (0-1 range)',
        'Millimeters or inches units',
        'Arc length calculation',
        'Material thickness and angle input',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Bend Allowance?">
        <p>
          Bend allowance is the length of the neutral axis between the bend lines in sheet metal bending. It represents the arc length of the bend measured along the neutral axis, accounting for material stretching and compression during the bending process.
        </p>
        <p className="mt-4">
          Understanding bend allowance is critical in sheet metal fabrication to calculate accurate flat pattern dimensions before bending. Without proper bend allowance calculations, parts will be undersized or oversized after bending, leading to scrap and rework.
        </p>
      </SEOSection>

      <SEOSection title="Bend Allowance Formula">
        <SEOFormula
          formula="BA = (pi/180) * (R + K*T) * A"
          description="Bend allowance in length units, where R = inside radius, K = K-factor, T = thickness, A = bend angle (degrees)."
        />
        <SEOFormula
          formula="BD = 2 * OSSB - BA"
          description="Bend deduction equals twice the outside setback minus bend allowance."
        />
        <SEOFormula
          formula="OSSB = tan(A/2) * (R + T)"
          description="Outside setback from tangent point to mold line intersection."
        />
        <SEOFormula
          formula="K-factor = t / T"
          description="K-factor is the ratio of neutral axis distance (t) to material thickness (T), typically 0.3 to 0.5."
        />
      </SEOSection>

      <SEOSection title="Understanding K-Factor">
        <p className="mb-4">
          The K-factor represents where the neutral axis lies within the material thickness during bending:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>K = 0.33:</strong> Typical for soft materials (aluminum, soft steel) - neutral axis at 1/3 thickness from inside.</li>
          <li><strong>K = 0.5:</strong> Common for hard materials (stainless steel, spring steel) - neutral axis at mid-thickness.</li>
          <li><strong>K = 0.4-0.45:</strong> Medium hardness materials (mild steel, brass).</li>
          <li><strong>Material dependency:</strong> K-factor varies with material properties, grain direction, and bend radius.</li>
          <li><strong>Testing required:</strong> Precise K-factors are determined through bending tests for specific materials and processes.</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use the Bend Allowance Calculator">
        <SEOList ordered items={[
          '<strong>Select units:</strong> Choose millimeters (mm) or inches (in) for your measurements.',
          '<strong>Enter material thickness:</strong> Input the sheet metal thickness.',
          '<strong>Input bend angle:</strong> Enter the angle of the bend (0-180 degrees, typically 90).',
          '<strong>Set inside radius:</strong> Enter the inside bend radius (often equals punch radius).',
          '<strong>Adjust K-factor:</strong> Use 0.33 for soft materials, 0.5 for hard, or custom value.',
          '<strong>Click Calculate:</strong> Get bend allowance, bend deduction, setback, and arc length.',
          '<strong>Apply to flat pattern:</strong> Use bend allowance to calculate developed length for fabrication.'
        ]} />
      </SEOSection>

      <SEOSection title="Sheet Metal Fabrication Applications">
        <p className="mb-4">
          Bend allowance calculations are essential for:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Flat Pattern Development:</strong> Calculating unfolded sheet metal dimensions before bending.</li>
          <li><strong>Press Brake Operations:</strong> Programming CNC press brakes with accurate bend parameters.</li>
          <li><strong>CAD/CAM Design:</strong> Creating accurate sheet metal models with proper bend compensation.</li>
          <li><strong>Bracket Fabrication:</strong> Manufacturing brackets, enclosures, and structural components.</li>
          <li><strong>HVAC Ductwork:</strong> Sizing duct sections for proper fit after bending.</li>
          <li><strong>Automotive Panels:</strong> Forming body panels and chassis components.</li>
          <li><strong>Electronics Enclosures:</strong> Creating boxes, chassis, and mounting plates.</li>
          <li><strong>Quality Control:</strong> Verifying part dimensions match design specifications.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Bend Deduction vs Bend Allowance">
        <p className="mb-4">
          Two methods exist for calculating flat patterns:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Bend Allowance (BA):</strong> Material added to account for the bend. Flat length = L1 + L2 + BA, where L1 and L2 are leg lengths.</li>
          <li><strong>Bend Deduction (BD):</strong> Material subtracted from total length. Flat length = L1 + L2 - BD, where L1 and L2 are mold line dimensions.</li>
          <li><strong>Which to use:</strong> BA is preferred when working from leg dimensions; BD when working from mold line dimensions.</li>
          <li><strong>Relationship:</strong> BD = 2 × OSSB - BA, so both methods yield the same flat length.</li>
          <li><strong>Industry preference:</strong> North American shops often use BD; European shops often use BA.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> 90-degree bend in 2mm thick aluminum with 1mm inside radius, K-factor 0.33.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>BA = (3.14159/180) × (1 + 0.33 × 2) × 90 = (0.01745) × (1.66) × 90 = 2.607 mm</li>
          <li>OSSB = tan(90/2) × (1 + 2) = tan(45) × 3 = 1 × 3 = 3 mm</li>
          <li>BD = 2 × 3 - 2.607 = 6 - 2.607 = 3.393 mm</li>
          <li>For 50mm + 50mm leg lengths: Flat = 50 + 50 + 2.607 = 102.607 mm</li>
          <li>Or using mold lines (53mm + 53mm): Flat = 53 + 53 - 3.393 = 102.607 mm (same result)</li>
        </ol>
      </SEOSection>

      <SEOSection title="Common Bending Parameters">
        <p className="mb-4">
          Typical values for sheet metal bending:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Minimum bend radius:</strong> Generally equals material thickness (1T) for soft materials, 2T-3T for hard.</li>
          <li><strong>Standard angles:</strong> 90° most common; 45°, 60°, 120°, 135° also frequent.</li>
          <li><strong>Thickness range:</strong> 0.5mm to 6mm for typical sheet metal; thicker requires specialized equipment.</li>
          <li><strong>Tolerance:</strong> Bend angle typically ±0.5° to ±1°; leg length ±0.1mm to ±0.5mm depending on process control.</li>
          <li><strong>Springback:</strong> Material returns slightly after bending; compensate by over-bending 2-5 degrees.</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the difference between bend allowance and bend deduction?',
            answer: 'Bend allowance is the arc length added to leg dimensions to get flat length. Bend deduction is the amount subtracted from mold line dimensions. Both methods calculate the same flat pattern but use different reference points.'
          },
          {
            question: 'How do I determine the K-factor for my material?',
            answer: 'K-factor is best determined by test bending. Bend a sample with known dimensions, measure the result, and back-calculate K-factor. Start with 0.33 for soft materials or 0.5 for hard materials as initial estimates.'
          },
          {
            question: 'Why is my bent part not matching the design dimensions?',
            answer: 'Common causes: incorrect K-factor, springback not compensated, wrong inside radius assumption, material thickness variation, or tooling wear. Verify your K-factor with test bends and adjust for springback.'
          },
          {
            question: 'Can I use the same K-factor for all bends in a part?',
            answer: 'Generally yes for the same material and thickness. However, tight bends (small R/T ratio) may require different K-factors than gentle bends. Sharp bends approach K=0.5 regardless of material.'
          },
          {
            question: 'What happens if the inside radius is zero (sharp bend)?',
            answer: 'Sharp bends (R=0) are possible but cause stress concentration and potential cracking. Use BA = K × T × A formula. K approaches 0.5 for sharp bends. Minimum practical radius is usually 0.5T to 1T.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
