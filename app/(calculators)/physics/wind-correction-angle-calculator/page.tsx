import WindCorrectionAngleCalculator from '../../../_components/calculators/WindCorrectionAngleCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function WindCorrectionAngleCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Wind Correction Angle Calculator"
      description="Calculate wind correction angle and heading to fly with crosswind and headwind components."
      calculator={<WindCorrectionAngleCalculator />}
      slug="physics/wind-correction-angle-calculator"
      category="Kinematics & Motion"
      features={[
        'Computes wind correction angle (WCA)',
        'Heading to fly normalized to 0°–360°',
        'Ground speed with head/tailwind effect',
        'Crosswind and headwind/tailwind components',
        'Supports kt, mph, km/h, m/s',
        'Physics-grade trigonometric calculations',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Wind Correction Angle?">
        <p>
          Wind Correction Angle (WCA) is the heading adjustment a pilot makes to counteract crosswinds and maintain the desired ground track. WCA keeps the aircraft on course by offsetting wind drift that would otherwise push the aircraft left or right of the intended path.
        </p>
        <p className="mt-4">
          This calculator solves the essential navigation problem: given course, wind direction and speed, and true airspeed, find the required heading, WCA, and resulting ground speed.
        </p>
      </SEOSection>

      <SEOSection title="Core Formulas">
        <SEOFormula
          formula="\text{WCA} = \arcsin \left( \frac{V_w \cdot \sin(\Delta \theta)}{TAS} \right)"
          description="Wind correction angle is based on crosswind component over true airspeed, where Δθ = wind direction − course."
        />
        <SEOFormula
          formula="\text{Heading} = \text{Course} + \text{WCA}"
          description="Add the correction angle to the intended course; normalize to 0°–360°."
        />
        <SEOFormula
          formula="GS = TAS \cdot \cos(\text{WCA}) - V_w \cdot \cos(\Delta \theta)"
          description="Ground speed accounts for the along-track wind component after turning into the wind."
        />
        <SEOFormula
          formula="\text{Crosswind} = V_w \cdot \sin(\Delta \theta),\quad \text{Headwind} = V_w \cdot \cos(\Delta \theta)"
          description="Crosswind determines drift; headwind/tailwind determines speed gain or loss."
        />
      </SEOSection>

      <SEOSection title="How to Use the Wind Correction Angle Calculator">
        <SEOList ordered items={[
          '<strong>Enter desired course:</strong> Track you want to fly, in degrees true or magnetic.',
          '<strong>Enter wind direction:</strong> The direction the wind is coming from, in degrees.',
          '<strong>Enter wind speed and true airspeed:</strong> Use kt, mph, km/h, or m/s (same unit for both).',
          '<strong>Click Calculate:</strong> Get WCA, heading to fly, ground speed, and crosswind/headwind components.',
          '<strong>Review outputs:</strong> See steer-left/steer-right guidance and normalized heading for immediate use.'
        ]} />
      </SEOSection>

      <SEOSection title="Why WCA Matters for Pilots">
        <p>
          Crosswinds cause drift that can lead to off-course navigation, extra fuel burn, and increased workload. Computing WCA ensures accurate ground track, stable instrument approaches, safer VFR navigation, and consistent enroute performance.
        </p>
        <p className="mt-4">
          Use this calculator for flight planning, holding pattern entries, airway tracking, approach intercepts, and cross-country legs where wind varies with altitude.
        </p>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> Course 090°, wind 230° at 20 kt, TAS 120 kt.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Relative wind angle Δθ = 230° − 090° = 140°.</li>
          <li>Crosswind = 20 × sin(140°) ≈ 12.9 kt (from left).</li>
          <li>Headwind = 20 × cos(140°) ≈ −15.3 kt (tailwind).</li>
          <li>WCA = asin(12.9 / 120) ≈ 6.2° left.</li>
          <li>Heading = 090° + 6.2° = 096.2° (normalized 0°–360°).</li>
          <li>Ground speed ≈ 120 × cos(6.2°) − (−15.3) ≈ 133 kt.</li>
        </ol>
        <p>Fly a heading of about 096° to stay on a 090° track with a 133 kt ground speed.</p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Do I enter magnetic or true headings?',
            answer: 'Use the same reference for both course and wind direction (either both magnetic or both true) so the relative angle is correct.'
          },
          {
            question: 'What if crosswind exceeds true airspeed?',
            answer: 'If |crosswind| ≥ TAS, the required WCA may be infeasible; reduce wind or increase TAS to remain within the arcsin domain.'
          },
          {
            question: 'Does this account for wind shear with altitude?',
            answer: 'No, it assumes constant wind. Recompute WCA for each leg or altitude layer where winds differ.'
          },
          {
            question: 'Can I use different units for wind and TAS?',
            answer: 'Use the same unit for wind and true airspeed inputs; the calculator converts internally between kt, mph, km/h, and m/s.'
          },
          {
            question: 'Is the heading output already normalized?',
            answer: 'Yes. The calculator normalizes the heading to 0°–360° for immediate cockpit or planner use.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
