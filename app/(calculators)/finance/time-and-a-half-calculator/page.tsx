import TimeAndAHalfCalculator from '../../../_components/calculators/TimeAndAHalfCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function TimeAndAHalfCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Time and a Half Calculator: 1.5× Overtime Pay in Seconds"
      description="Use our Time and a Half Calculator to compute 1.5× overtime pay, regular pay, and total gross earnings fast. Accurate, simple, and free."
      calculator={<TimeAndAHalfCalculator />}
      slug="finance/time-and-a-half-calculator"
      category="Finance"
      features={[
        "Accurate time-and-a-half payroll calculations",
        "Simple inputs with clear results",
        "Mobile-friendly and embeddable design",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Time and a Half Matters for Paychecks">
        <p>
          Overtime pay disputes are common, especially when hours and multipliers change week to week. This <strong>Time and a Half Calculator</strong> gives you a quick, reliable way to verify 1.5× earnings and avoid payroll surprises. If you&apos;re reviewing compensation changes alongside overtime, consider our {createInternalLink('overtime-calculator')} for broader overtime scenarios.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter your regular hourly rate and total hours worked.</li>
          <li><strong>Step 2:</strong> Set the overtime threshold (typically 40 hours per week).</li>
          <li><strong>Step 3:</strong> Click Calculate to see overtime pay and total gross pay.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Time and a Half Calculator Formula">
        <p>
          Time and a half means each overtime hour is paid at 1.5 times your regular rate. The calculator splits regular hours and overtime hours, then sums the two pay amounts. This method is ideal for payroll checks, budgeting, and wage compliance.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Total Pay = (Regular Hours × Rate) + (Overtime Hours × Rate × 1.5)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>An employee works 46 hours at $24/hour with a 40-hour threshold.</p>
        <ul>
          <li>Input: Regular hours = 40, Overtime hours = 6, Rate = $24</li>
          <li>Result: Total Pay = (40 × 24) + (6 × 24 × 1.5) = $960 + $216 = $1,176</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Use this tool for fast payroll verification and financial planning in real-world settings.</p>
        <SEOList items={[
          "Payroll verification for hourly employees",
          "Budgeting weekly income with overtime",
          "Checking pay stubs for wage compliance"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is time and a half pay?",
            answer: "It is overtime pay at 1.5× your regular hourly rate for qualifying overtime hours."
          },
          {
            question: "When does time and a half apply?",
            answer: "Most U.S. roles apply it after 40 hours in a workweek, but local laws vary."
          },
          {
            question: "How is overtime pay calculated?",
            answer: "Overtime Pay = Overtime Hours × (Regular Rate × 1.5)."
          },
          {
            question: "Does this calculator handle different thresholds?",
            answer: "Yes, you can set a custom overtime threshold to match your policy."
          },
          {
            question: "Can I use this for biweekly payroll?",
            answer: "Yes, just enter the correct total hours and rate for the pay period."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering time-and-a-half calculations is easy with the right tools. Use this calculator to confirm overtime pay fast and avoid surprises on payday.
        </p>
        <p>
          Explore more Finance tools: Check out our {createInternalLink('pay-raise-calculator')} or the popular {createInternalLink('markup-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
