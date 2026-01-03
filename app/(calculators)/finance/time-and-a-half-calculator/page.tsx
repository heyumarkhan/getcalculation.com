import OvertimeCalculator from '../../../_components/calculators/OvertimeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function TimeAndAHalfCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Time and a Half Calculator: Calculate 1.5× Overtime Pay"
      description="Accurately calculate time and a half (1.5×) overtime pay. Free online finance calculator to compute regular pay, overtime pay at 1.5×, and total gross pay quickly. Perfect for payroll, budgeting, and verifying paychecks."
      calculator={<OvertimeCalculator />}
      slug="finance/time-and-a-half-calculator"
      category="Finance"
      features={[
        "Quickly compute time and a half (1.5×) overtime pay",
        "Show regular pay, overtime pay, and total gross pay",
        "Supports total-hours or separate regular/overtime hours inputs",
        "Customizable overtime threshold (default 40 hours)",
        "Step-by-step calculation breakdown",
        "Mobile-friendly and embeddable"
      ]}
    >
      <SEOSection title="Time and a Half Calculator (1.5×) — Quick Payroll Tool">
        <p>
          Our <strong>Time and a Half Calculator</strong> helps you calculate overtime pay at the standard 1.5× rate. Enter your hours and hourly rate to instantly see regular pay, overtime pay calculated at time and a half, and your total gross pay. This tool is ideal for employees, payroll administrators, and anyone who needs a fast, accurate overtime calculation.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Time and a Half Calculator">
        <ol>
          <li>Choose whether to enter total hours or separate regular and overtime hours.</li>
          <li>Enter your regular hourly rate.</li>
          <li>Confirm the overtime threshold (default 40 hours) if needed.</li>
          <li>Click Calculate to view the breakdown and step-by-step formula.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Why Use This Calculator">
        <p>
          The calculator is optimized for clarity and SEO: it targets keywords like "time and a half calculator", "1.5x overtime calculator", "overtime pay calculator", and "calculate overtime pay". It is embeddable and structured for easy sitemap generation and indexing.
        </p>
        <SEOList items={["time and a half calculator", "1.5x overtime calculator", "overtime pay calculator", "calculate overtime pay", "overtime calculator embed"]} />
      </SEOSection>

      <SEOFAQ questions={[{
        question: 'What is time and a half?',
        answer: 'Time and a half means earning 1.5× your regular hourly rate for overtime hours. This calculator computes overtime pay at 1.5× and adds it to your regular pay to show total gross pay.'
      }, {
        question: 'How do I calculate overtime at 1.5×?',
        answer: 'Overtime Pay = Overtime Hours × (Regular Rate × 1.5). Total Gross Pay = Regular Pay + Overtime Pay.'
      }]} />
    </CalculatorPageTemplate>
  );
}
