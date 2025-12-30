import OvertimeCalculator from '../../../_components/calculators/OvertimeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import SEOInternalLink from '../../../_components/ui/SEOInternalLink';

export default function OvertimeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Overtime Calculator: Calculate Overtime Pay (Time and a Half)"
      description="Calculate your overtime pay accurately with our free overtime calculator. Supports time and a half (1.5x), double time (2x), and custom multipliers. Calculate regular pay, overtime pay, and total gross pay instantly."
      calculator={<OvertimeCalculator />}
      slug="finance/overtime-calculator"
      category="Finance"
      features={[
        "Calculate overtime pay with time and a half (1.5x)",
        "Support for double time (2x) and custom multipliers",
        "Automatic calculation from total hours or separate inputs",
        "Customizable overtime threshold (default 40 hours)",
        "Step-by-step calculation breakdown",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Overtime Pay: Your Complete Guide">
        <p>
          Whether you&apos;re an employee tracking your earnings or an employer calculating payroll, understanding <strong>overtime pay</strong> is essential. Overtime compensation ensures that workers are fairly paid for hours worked beyond their standard workweek. Our <strong>overtime calculator</strong> makes it easy to determine exactly how much you should earn for those extra hours, taking into account your regular pay rate, overtime multiplier, and the number of hours worked.
        </p>
        <p>
          In the United States, the Fair Labor Standards Act (FLSA) requires that non-exempt employees receive overtime pay at a rate of at least one and one-half times their regular pay rate for hours worked over 40 in a workweek. However, some states have additional requirements, and some employers offer more generous overtime rates. Our <strong>overtime calculator</strong> handles all these scenarios, allowing you to customize the overtime threshold and multiplier to match your specific situation.
        </p>
        <p>
          This comprehensive guide will walk you through everything you need to know about calculating overtime pay, from understanding the basic formula to handling complex scenarios. We&apos;ll also show you how to use our <strong>overtime calculator</strong> to get instant, accurate results for your overtime calculations.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use Our Overtime Calculator">
        <p>
          Our <strong>overtime calculator</strong> is designed for simplicity and accuracy. Follow these steps to calculate your overtime pay:
        </p>
        <ol>
          <li><strong>Choose Calculation Mode:</strong> Select &quot;Total Hours&quot; if you know your total hours worked, or &quot;Separate&quot; if you want to enter regular and overtime hours separately.</li>
          <li><strong>Enter Your Hours:</strong> 
            <ul>
              <li>If using &quot;Total Hours&quot; mode, enter your total hours worked for the week.</li>
              <li>If using &quot;Separate&quot; mode, enter your regular hours and overtime hours separately.</li>
            </ul>
          </li>
          <li><strong>Enter Your Pay Rate:</strong> Input your regular hourly pay rate (before overtime).</li>
          <li><strong>Set Overtime Threshold:</strong> The default is 40 hours per week (standard in the U.S.), but you can adjust this if your situation differs.</li>
          <li><strong>Set Overtime Multiplier:</strong> The default is 1.5 (time and a half), but you can change this to 2.0 (double time) or any other multiplier your employer uses.</li>
          <li><strong>Calculate:</strong> Click the &quot;Calculate&quot; button to see your pay breakdown instantly.</li>
        </ol>
        <p>
          The calculator will automatically show you your regular pay, overtime pay, and total gross pay, along with a detailed step-by-step calculation.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Overtime Pay Formula">
        <p>
          The formula for calculating overtime pay is straightforward:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold mb-2">Overtime Pay = Overtime Hours × (Regular Rate × Overtime Multiplier)</p>
          <p className="font-mono text-lg font-bold">Total Gross Pay = Regular Pay + Overtime Pay</p>
        </div>
        
        <h3>Breaking Down the Formula</h3>
        <ul>
          <li><strong>Regular Pay:</strong> Regular Hours × Regular Rate</li>
          <li><strong>Overtime Rate:</strong> Regular Rate × Overtime Multiplier (typically 1.5 for time and a half)</li>
          <li><strong>Overtime Pay:</strong> Overtime Hours × Overtime Rate</li>
          <li><strong>Total Gross Pay:</strong> Regular Pay + Overtime Pay</li>
        </ul>

        <h3>Example Calculation</h3>
        <p>Let&apos;s say you work 45 hours in a week at $25 per hour with a 1.5x overtime multiplier:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 font-mono text-sm">
            <li>Regular Hours: 40 hours (up to the 40-hour threshold)</li>
            <li>Overtime Hours: 5 hours (45 - 40)</li>
            <li>Regular Pay: 40 × $25 = $1,000</li>
            <li>Overtime Rate: $25 × 1.5 = $37.50</li>
            <li>Overtime Pay: 5 × $37.50 = $187.50</li>
            <li>Total Gross Pay: $1,000 + $187.50 = $1,187.50</li>
          </ul>
        </div>
      </SEOSection>

      <SEOSection title="Overtime Laws and Regulations">
        <p>
          Understanding overtime laws is crucial for both employees and employers. Here&apos;s what you need to know:
        </p>
        
        <h3>Federal Overtime Requirements (FLSA)</h3>
        <SEOList items={[
          "Non-exempt employees must receive overtime pay for hours worked over 40 in a workweek",
          "Overtime rate must be at least 1.5 times the regular rate of pay",
          "The workweek is a fixed 7-day period (doesn't have to be Sunday-Saturday)",
          "Overtime is calculated per workweek, not per day",
          "Some employees are exempt from overtime (salaried executives, professionals, etc.)"
        ]} />

        <h3>State Overtime Laws</h3>
        <p>
          Many states have additional overtime requirements that are more generous than federal law:
        </p>
        <SEOList items={[
          "California: Overtime after 8 hours per day OR 40 hours per week, with double time after 12 hours",
          "Nevada: Overtime after 8 hours per day if employer has 50+ employees",
          "Alaska: Overtime after 8 hours per day",
          "Colorado: Overtime after 12 hours per day OR 40 hours per week",
          "Some states have daily overtime requirements in addition to weekly requirements"
        ]} />

        <p>
          <strong>Important:</strong> When both federal and state laws apply, employers must follow whichever law is more favorable to the employee. Always check your state&apos;s specific overtime requirements.
        </p>
      </SEOSection>

      <SEOSection title="Common Overtime Scenarios">
        <p>
          Here are some common scenarios where our <strong>overtime calculator</strong> can help:
        </p>
        
        <h3>Scenario 1: Standard Weekly Overtime</h3>
        <p>You work 42 hours in a week at $20/hour with 1.5x overtime:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono text-sm">Regular: 40 hrs × $20 = $800</p>
          <p className="font-mono text-sm">Overtime: 2 hrs × $30 = $60</p>
          <p className="font-mono text-sm font-bold">Total: $860</p>
        </div>

        <h3>Scenario 2: Double Time on Holidays</h3>
        <p>You work 45 hours including 5 hours on a holiday with 2x pay:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono text-sm">Regular: 40 hrs × $25 = $1,000</p>
          <p className="font-mono text-sm">Holiday Overtime: 5 hrs × $50 (2x) = $250</p>
          <p className="font-mono text-sm font-bold">Total: $1,250</p>
        </div>

        <h3>Scenario 3: Multiple Overtime Rates</h3>
        <p>Some employers offer different rates for different situations. Use our calculator multiple times for each rate, or calculate manually for complex scenarios.</p>
      </SEOSection>

      <SEOSection title="Overtime Multipliers Explained">
        <p>
          The overtime multiplier determines how much extra you earn for overtime hours:
        </p>
        
        <h3>Time and a Half (1.5x)</h3>
        <p>
          This is the standard overtime rate required by federal law. If your regular rate is $20/hour, your overtime rate would be $30/hour (20 × 1.5).
        </p>

        <h3>Double Time (2.0x)</h3>
        <p>
          Some employers offer double time for holidays, weekends, or hours beyond a certain threshold. If your regular rate is $20/hour, double time would be $40/hour (20 × 2.0).
        </p>

        <h3>Custom Multipliers</h3>
        <p>
          Some employers offer custom multipliers like 1.75x or 2.5x for specific situations. Our calculator supports any multiplier you need.
        </p>
      </SEOSection>

      <SEOSection title="Tips for Accurate Overtime Calculations">
        <SEOList items={[
          "Always verify your overtime threshold with your employer or HR department",
          "Check your state's specific overtime laws, as they may differ from federal requirements",
          "Keep accurate records of your hours worked, including start and end times",
          "Understand whether you're exempt or non-exempt from overtime requirements",
          "For salaried employees, calculate your hourly rate by dividing annual salary by 2,080 hours (40 hours × 52 weeks)",
          "Some employers calculate overtime on a daily basis in addition to weekly - check your state laws",
          "Holiday pay and overtime pay are separate - you may be entitled to both",
          "If you work multiple jobs, overtime is calculated separately for each employer"
        ]} />
      </SEOSection>

      <SEOSection title="Overtime vs. Regular Pay: Key Differences">
        <p>
          Understanding the difference between regular pay and overtime pay is essential:
        </p>
        <ul>
          <li><strong>Regular Pay:</strong> Your standard hourly rate for hours up to the overtime threshold (typically 40 hours per week)</li>
          <li><strong>Overtime Pay:</strong> Enhanced pay rate (typically 1.5x) for hours worked beyond the threshold</li>
          <li><strong>Total Gross Pay:</strong> The sum of regular pay and overtime pay before deductions</li>
        </ul>
        <p>
          It&apos;s important to note that overtime is calculated on your regular rate of pay, not including bonuses, commissions, or other additional compensation (though these may affect your regular rate calculation in some cases).
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Our <strong>overtime calculator</strong> is useful in many situations:
        </p>
        <SEOList items={[
          "Employees: Verify your paycheck accuracy and ensure you're being paid correctly",
          "Employers: Calculate payroll accurately and ensure compliance with labor laws",
          "HR Professionals: Process payroll and answer employee questions about overtime",
          "Accountants: Calculate overtime for client payroll processing",
          "Job Seekers: Understand potential earnings when considering positions with overtime",
          "Budget Planning: Estimate take-home pay including overtime for financial planning",
          "Wage Disputes: Calculate what you should have been paid for overtime hours",
          "Time Tracking: Verify hours worked and overtime eligibility"
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes to Avoid">
        <p>
          When calculating overtime, avoid these common mistakes:
        </p>
        <SEOList items={[
          "Forgetting to count all hours worked, including breaks that weren't taken",
          "Using the wrong overtime threshold (check if your state has daily overtime requirements)",
          "Calculating overtime on a daily basis when it should be weekly (or vice versa)",
          "Not including all forms of compensation when calculating the regular rate",
          "Assuming salaried employees are always exempt from overtime",
          "Mixing up regular pay rate with overtime pay rate in calculations",
          "Not accounting for different overtime rates for different types of work",
          "Forgetting that overtime resets each workweek"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How is overtime calculated?",
            answer: "Overtime is calculated by multiplying your overtime hours by your overtime rate. The overtime rate is your regular hourly rate multiplied by the overtime multiplier (typically 1.5 for time and a half). For example, if you work 5 overtime hours at $25/hour with a 1.5x multiplier, your overtime pay would be: 5 hours × ($25 × 1.5) = 5 × $37.50 = $187.50."
          },
          {
            question: "What is time and a half?",
            answer: "Time and a half means you earn 1.5 times your regular hourly rate for overtime hours. If your regular rate is $20/hour, time and a half would be $30/hour. This is the minimum overtime rate required by federal law for non-exempt employees working over 40 hours per week."
          },
          {
            question: "How many hours is overtime?",
            answer: "In the United States, overtime typically begins after 40 hours worked in a workweek. However, some states have additional requirements. For example, California requires overtime after 8 hours in a single day, and double time after 12 hours in a day. Always check your state's specific overtime laws."
          },
          {
            question: "Do salaried employees get overtime?",
            answer: "It depends. Salaried employees who are classified as exempt (executive, administrative, professional, etc.) are not entitled to overtime. However, salaried non-exempt employees are entitled to overtime. To calculate overtime for a salaried non-exempt employee, first determine their hourly rate by dividing their weekly salary by the number of hours their salary is intended to cover."
          },
          {
            question: "Can I calculate overtime for multiple weeks?",
            answer: "Yes, but remember that overtime is calculated per workweek. You'll need to calculate each week separately. Our calculator handles one workweek at a time. For multiple weeks, calculate each week individually and add the totals together."
          },
          {
            question: "What if I work different rates for different hours?",
            answer: "If you work at different rates during the same workweek, your regular rate for overtime purposes is typically calculated as a weighted average of all rates. However, for simplicity, our calculator assumes a single regular rate. For complex scenarios with multiple rates, you may need to calculate manually or use the calculator multiple times."
          },
          {
            question: "Is overtime calculated daily or weekly?",
            answer: "Under federal law, overtime is calculated weekly (per workweek). However, some states require daily overtime in addition to weekly overtime. For example, California requires overtime after 8 hours in a day, regardless of weekly hours. Check your state's specific requirements."
          },
          {
            question: "What is double time?",
            answer: "Double time means you earn 2.0 times your regular hourly rate. This is often offered for holidays, weekends, or hours beyond a certain threshold (like after 12 hours in California). Double time is not required by federal law but may be required by state law or offered by employers as an incentive."
          },
          {
            question: "How do I calculate overtime for a 45-hour workweek?",
            answer: "For a 45-hour workweek at $25/hour with 1.5x overtime: Regular pay = 40 hours × $25 = $1,000. Overtime pay = 5 hours × ($25 × 1.5) = 5 × $37.50 = $187.50. Total = $1,187.50. Use our overtime calculator for instant results."
          },
          {
            question: "Can I change the overtime threshold?",
            answer: "Yes! Our calculator allows you to customize the overtime threshold. While 40 hours is standard in the U.S., you can adjust it to match your specific situation, such as for states with daily overtime requirements or different work arrangements."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Calculating overtime pay accurately is essential for ensuring you receive fair compensation for your work. Our <strong>overtime calculator</strong> simplifies this process, providing instant, accurate calculations for regular pay, overtime pay, and total gross pay.
        </p>
        <p>
          Whether you&apos;re an employee verifying your paycheck, an employer processing payroll, or someone planning their budget, understanding overtime calculations helps you make informed financial decisions. Remember to always verify your specific overtime requirements with your employer or state labor department, as laws can vary.
        </p>
        <p>
          Ready to explore more financial calculations? Check out our other finance calculators for budgeting, savings, loans, and more. Our <strong>overtime calculator</strong> is just one of many tools designed to help you manage your finances with confidence.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

