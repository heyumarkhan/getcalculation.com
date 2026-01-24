import InductorsInParallelCalculator from '../../../_components/calculators/InductorsInParallelCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function InductorsInParallelCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Inductors in Parallel Calculator - Total Inductance & Reactance"
      description="Compute total inductance for inductors in parallel and reactance at frequency."
      calculator={<InductorsInParallelCalculator />}
      slug="physics/inductors-in-parallel-calculator"
      category="Electromagnetism"
      features={[
        'Calculates equivalent inductance for up to 6 inductors in parallel',
        'Supports H, mH, and μH inputs',
        'Optional frequency input for reactance',
        'Instant unit conversions to H, mH, and μH',
        'Primary color #820ECC',
        'Embed-ready layout and shareable',
        'SEO optimized for inductor calculations'
      ]}
    >
      <SEOSection title="What is an Inductors in Parallel Calculator?">
        <p>
          An inductors in parallel calculator quickly computes the equivalent inductance of multiple inductors connected side by side across the same nodes. In parallel, inductive reactances combine like resistors in parallel: the reciprocal of the total inductance equals the sum of reciprocals of each branch. This tool saves time for circuit designers sizing filters, chokes, resonant tanks, and power electronics magnetics.
        </p>
        <p className="mt-4">
          Because parallel inductors raise total current capability and reduce net inductance, they are common in high-current supplies, EMI filters, and RF tuning networks. This calculator outputs total inductance in henries, millihenries, and microhenries, plus optional reactance at any chosen frequency.
        </p>
      </SEOSection>

      <SEOSection title="Inductors in Parallel Formulas">
        <SEOFormula
          formula="1 / L_total = 1 / L_1 + 1 / L_2 + … + 1 / L_n"
          description="Parallel inductance is the reciprocal of the sum of individual reciprocals."
        />
        <SEOFormula
          formula="L_total = 1 / (\u03a3 (1 / L_i))"
          description="Compute the total inductance directly from the reciprocal sum." 
        />
        <SEOFormula
          formula="X_L = 2\u03c0 f L"
          description="Inductive reactance grows linearly with frequency and inductance." 
        />
      </SEOSection>

      <SEOSection title="How to Use This Inductor Calculator">
        <SEOList
          ordered
          items={[
            '<strong>Enter each inductor value</strong> in H, mH, or \u03bcH.',
            '<strong>Use Add/Remove</strong> to include up to six parallel inductors.',
            '<strong>Optional:</strong> Enter frequency (Hz) to see total reactance.',
            '<strong>Click Calculate</strong> to get equivalent inductance and reactance.',
            '<strong>Review outputs</strong> in henries, millihenries, and microhenries for design documentation.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Why Combine Inductors in Parallel?">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Higher current handling:</strong> Splits current across windings to reduce copper losses.</li>
          <li><strong>Lower total inductance:</strong> Useful when a single inductor of small value is unavailable.</li>
          <li><strong>Thermal spreading:</strong> Heat shared between components improves reliability.</li>
          <li><strong>Availability:</strong> Combine standard values to hit non-standard inductance targets.</li>
          <li><strong>EMI filters:</strong> Parallel chokes paired with capacitors to shape impedance.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Design Tips for Parallel Inductors">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Match part values:</strong> Use similar inductances to balance current sharing.</li>
          <li><strong>DC resistance (DCR):</strong> Lower DCR inductors carry more current in parallel branches.</li>
          <li><strong>Core saturation:</strong> Ensure each inductor stays below its saturation current.</li>
          <li><strong>Temperature rise:</strong> Parallel devices reduce I²R losses in each winding.</li>
          <li><strong>Layout:</strong> Keep traces short and symmetric to minimize parasitics at high frequency.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Example Calculation">
        <p className="mb-3"><strong>Given:</strong> Three inductors in parallel: 4.7 mH, 6.8 mH, 10 mH at 60 Hz.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Convert to henries: 0.0047, 0.0068, 0.010 H.</li>
          <li>Reciprocal sum: 1/0.0047 + 1/0.0068 + 1/0.010 = 212.8 + 147.1 + 100 = 459.9.</li>
          <li>Total inductance: 1 / 459.9 = 0.00217 H = 2.17 mH.</li>
          <li>Reactance at 60 Hz: X<sub>L</sub> = 2\u03c0 × 60 × 0.00217 = 0.818 \u03a9.</li>
        </ol>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'How do inductors in parallel combine?',
            answer: 'They follow the reciprocal rule: the inverse of total inductance equals the sum of the inverses of each branch inductance.'
          },
          {
            question: 'Does frequency change the total inductance?',
            answer: 'No. Inductance is a physical property; frequency only affects reactance (X_L = 2\u03c0 f L).' 
          },
          {
            question: 'Do I need equal inductors in parallel?',
            answer: 'Not required, but matching values helps share current evenly and simplifies current balancing.'
          },
          {
            question: 'What happens to current sharing?',
            answer: 'Branches with lower inductance and DCR carry more AC and DC current. Keep DCR similar to balance currents.'
          },
          {
            question: 'Can I parallel inductors to reduce ripple?',
            answer: 'Yes. In power converters, paralleling inductors lowers ripple current per inductor and spreads thermal load.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
