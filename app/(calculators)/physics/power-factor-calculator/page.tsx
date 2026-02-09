import PowerFactorCalculator from '../../../_components/calculators/PowerFactorCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function PowerFactorCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Power Factor Calculator - Calculate AC Circuit Efficiency"
      description="Free power factor calculator to find PF, real power, and apparent power in AC circuits. Calculate power factor using PF = P/S formula with instant accurate results."
      calculator={<PowerFactorCalculator />}
      slug="physics/power-factor-calculator"
      category="Physics"
      features={[
        "Calculate power factor instantly",
        "Find real and apparent power",
        "AC circuit efficiency analysis",
        "Real-time accurate results",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Power Factor in Electrical Systems">
        <p>
          Power factor determines how efficiently electrical power flows through AC circuits. In factories, offices, and homes, not all electrical current does useful work—some oscillates back and forth, creating heat and losses without producing output. This wasted energy shows up as lower power factor values. Industrial facilities with motors, transformers, and fluorescent lighting often suffer from poor power factor, leading to utility penalties and higher electricity bills. Understanding power factor helps engineers optimize electrical systems, reduce energy waste, and cut costs. For related electrical measurements, explore our {createInternalLink('electrical-power-calculator')} to calculate voltage, current, and total power consumption in circuits.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the real power (active power) in watts that your circuit consumes</li>
          <li><strong>Step 2:</strong> Input the apparent power in volt-amperes (VA) drawn from the source</li>
          <li><strong>Step 3:</strong> Click "Calculate" to instantly determine the power factor using the formula PF = P/S</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Power Factor Calculator Formula">
        <p>
          Power factor measures the ratio of useful power (real power) to total power (apparent power) in AC circuits. This dimensionless number ranges from 0 to 1, where 1 represents perfect efficiency. The formula divides real power in watts by apparent power in volt-amperes, revealing how much of the electrical current actually performs work versus oscillating wastefully between source and load.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">PF = P / S</p>
          <p className="text-sm mt-2">Where PF = Power Factor, P = Real Power (W), S = Apparent Power (VA)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>An industrial motor draws 10,000 VA from the power supply while consuming 8,000 W of real power. Calculate the power factor:</p>
        <ul>
           <li>Real power (P): 8,000 W</li>
           <li>Apparent power (S): 10,000 VA</li>
           <li>Calculation: PF = 8,000 / 10,000 = 0.8</li>
           <li>Phase angle: φ = arccos(0.8) = 36.87°</li>
           <li>Result: Power factor is 0.8 or 80%, typical for induction motors</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
         <p>Power factor calculations are essential for electrical engineers, facility managers, and energy auditors working to optimize AC power systems and reduce energy costs.</p>
         <SEOList items={[
           "Industrial Facilities: Analyzing motor loads and implementing power factor correction to avoid utility penalties",
           "Electrical Engineering: Designing efficient AC circuits and sizing transformers for proper power delivery",
           "Energy Management: Reducing electricity demand charges by improving power factor in commercial buildings",
           "Manufacturing Plants: Optimizing power consumption of inductive machinery and production equipment",
           "Utility Billing: Understanding apparent power charges and calculating cost savings from power factor improvement"
         ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is power factor and why does it matter?",
            answer: "Power factor is the ratio of real power to apparent power (PF = P/S), indicating electrical efficiency in AC circuits. Values range from 0 to 1, where 1 is perfect efficiency. Low power factor means you're paying for more electrical current than you're using productively, resulting in higher utility bills and potential penalties from power companies."
          },
          {
            question: "What causes low power factor?",
            answer: "Low power factor is primarily caused by inductive loads like motors, transformers, welding equipment, and fluorescent lighting. These devices create magnetic fields that require reactive power, causing current to lag behind voltage. This reactive power doesn't perform useful work but still flows through the electrical system, reducing efficiency."
          },
           {
            question: "What is the difference between real and apparent power?",
            answer: "Real power (watts) is the actual power consumed to do useful work—running motors, lighting, heating. Apparent power (volt-amperes) is the total power flowing in the circuit, including both real power and reactive power. The power factor shows the relationship: PF = Real Power / Apparent Power."
          },
           {
            question: "How do you improve power factor?",
            answer: "Power factor is improved by adding capacitors to offset the lagging current from inductive loads. Capacitors provide leading reactive power that cancels out lagging reactive power from motors and transformers. This power factor correction reduces apparent power, lowers current draw, and can significantly cut electricity costs, especially in industrial settings."
          },
           {
            question: "What is a good power factor value?",
            answer: "A power factor of 1.0 (unity) is ideal but rare in practice. Most utilities require 0.85 to 0.95 or higher to avoid penalties. Typical induction motors operate at 0.8 to 0.9 power factor. Values below 0.8 are considered poor and often result in utility surcharges. Power factor correction can improve values to 0.95 or higher."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering power factor calculations empowers you to optimize AC electrical systems, reduce energy waste, and lower electricity costs. Our power factor calculator provides instant, accurate results for analyzing circuit efficiency and planning power factor correction projects.
        </p>
        <p>
           Explore more Physics tools: Check out our {createInternalLink('watt-calculator')} for electrical power calculations, or discover {createInternalLink('ohms-law-power-calculator')} to analyze voltage, current, and resistance relationships.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

