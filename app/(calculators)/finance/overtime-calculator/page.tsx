import OvertimeCalculator from '../../../_components/calculators/OvertimeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function OvertimeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Overtime Calculator: Calculate Overtime Pay & Hourly Earnings"
      description="Calculate overtime pay instantly with our free overtime calculator. Supports time and a half (1.5x), double time (2x), and custom multipliers. Determine total gross pay, overtime earnings, and more."
      calculator={<OvertimeCalculator />}
      slug="finance/overtime-calculator"
      category="Finance"
      features={[
        "Calculate overtime pay with time and a half (1.5x)",
        "Support for double time (2x) and custom multipliers",
        "Automatic calculation from total or separate hours",
        "Customizable overtime threshold (default 40 hours/week)",
        "Step-by-step calculation breakdown",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Overtime Pay Matters: Understanding Your Earnings">
        <p>
          Overtime compensation is a critical component of fair wage practices for salaried and hourly workers. When you work beyond standard hours, you deserve additional compensation that reflects the value of your extra effort. Our {createInternalLink('pay-raise-calculator')} helps you calculate salary increases, but our <strong>overtime calculator</strong> is specifically designed to handle the complexities of overtime pay calculations—whether you&apos;re managing weekly hours, dealing with time-and-a-half rates, or handling custom multipliers used by your employer.
        </p>
        <p>
          Under the Fair Labor Standards Act (FLSA), non-exempt employees in the United States are entitled to overtime pay at a minimum rate of 1.5 times their regular hourly rate for hours worked over 40 per week. However, some states mandate even higher rates, and many employers offer more generous overtime multipliers. Understanding how to calculate your overtime pay ensures you receive proper compensation and helps you verify payroll accuracy.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Choose your calculation mode—enter total hours or separate regular/overtime hours.</li>
          <li><strong>Step 2:</strong> Input your regular hourly pay rate.</li>
          <li><strong>Step 3:</strong> Set your overtime threshold (default 40 hours) and multiplier (default 1.5), then click Calculate.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Overtime Calculator Formula">
        <p>
          The overtime pay formula is straightforward: multiply your overtime hours by your overtime rate (which is your regular rate times the overtime multiplier). Your total gross pay is the sum of regular pay and overtime pay. This simple approach ensures fair compensation across various work arrangements and industries.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Total Gross Pay = (Regular Hours × Regular Rate) + (Overtime Hours × Regular Rate × Multiplier)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A worker completes 48 hours in a week at $22/hour with 1.5x overtime multiplier:</p>
        <ul>
          <li>Regular hours: 40 × $22 = $880</li>
          <li>Overtime hours: 8 × $22 × 1.5 = $264</li>
          <li>Total gross pay: $880 + $264 = $1,144</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>
          An <strong>overtime calculator</strong> is indispensable for employees, employers, accountants, and HR professionals who need to ensure accurate payroll calculations and legal compliance.
        </p>
        <SEOList items={[
          "Employees verifying paycheck accuracy and overtime earnings",
          "Employers processing payroll and ensuring wage compliance",
          "HR professionals managing employee compensation",
          "Accountants calculating overtime for client payroll",
          "Job seekers estimating income from overtime-eligible positions"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How is overtime pay calculated?",
            answer: "Overtime pay is calculated by multiplying your overtime hours by your overtime rate (regular rate × overtime multiplier). For example, 8 overtime hours at $25/hour with 1.5x multiplier = 8 × ($25 × 1.5) = $300 in overtime pay."
          },
          {
            question: "What is time and a half (1.5x)?",
            answer: "Time and a half means you earn 1.5 times your regular hourly rate for overtime hours. If your regular rate is $20/hour, time and a half would be $30/hour. This is the minimum overtime rate required by federal law for non-exempt employees working over 40 hours per week."
          },
          {
            question: "When does overtime start?",
            answer: "Under federal law, overtime typically begins after 40 hours worked in a workweek. However, some states require daily overtime (e.g., after 8 hours in California). Always check your state's specific overtime laws and your employer's overtime policy."
          },
          {
            question: "Are salaried employees eligible for overtime?",
            answer: "It depends on job classification. Salaried employees classified as exempt (executives, professionals, etc.) are not entitled to overtime. However, salaried non-exempt employees are entitled to overtime pay. Calculate their hourly rate by dividing weekly salary by standard hours."
          },
          {
            question: "Can I customize the overtime multiplier?",
            answer: "Yes! Our overtime calculator supports any multiplier you need. The standard is 1.5x (time and a half), but some employers offer 2.0x (double time) for holidays or premium hours, or custom rates like 1.75x."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering overtime pay calculations is easy with the right tools. Our <strong>overtime calculator</strong> provides instant, accurate results for regular pay, overtime earnings, and total gross pay—helping you verify your paycheck and ensure fair compensation.
        </p>
        <p>
          Explore more finance tools: Check out our {createInternalLink('time-and-a-half-calculator')} or the popular {createInternalLink('markup-calculator')} for related financial calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

