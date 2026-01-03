import PayRaiseCalculator from '../../../_components/calculators/PayRaiseCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function PayRaiseCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Pay Raise Calculator: Salary Raise Calculator & Raise Percentage Tool"
      description="Calculate salary increases and pay raises quickly. Use our pay raise calculator to compute new salary, raise amount, and percent increase. Perfect for payroll, HR, and personal budgeting."
      calculator={<PayRaiseCalculator />}
      slug="finance/pay-raise-calculator"
      category="Finance"
      features={[
        'Calculate new salary after a raise',
        'Support for percentage or fixed amount raises',
        'Shows raise amount, percent increase, and new pay',
        'Step-by-step calculation breakdown',
        'Embeddable and mobile-friendly'
      ]}
    >
      <SEOSection title="Pay Raise Calculator — Salary Raise Calculator">
        <p>
          Our <strong>Pay Raise Calculator</strong> (also referenced as a <strong>salary raise calculator</strong>) helps you determine the impact of a raise on your salary or hourly pay. Enter your current pay and the raise (as a percentage or fixed amount) to instantly view the raise amount, percent increase, and new pay.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Salary Raise Calculator">
        <ol>
          <li>Choose whether your raise is a percent or a fixed amount.</li>
          <li>Enter your current salary or pay.</li>
          <li>Enter the raise amount or percentage.</li>
          <li>Click Calculate to view results and calculation steps.</li>
        </ol>
      </SEOSection>

      <SEOSection title="SEO & Embedding">
        <p>
          This page is optimized for keywords such as "salary raise calculator", "pay raise calculator", "raise percentage calculator", and "calculate salary raise". The calculator is embeddable and structured for automatic sitemap generation.
        </p>
        <SEOList items={["salary raise calculator", "pay raise calculator", "raise percentage calculator", "calculate salary raise", "salary increase calculator"]} />
      </SEOSection>

      <SEOFAQ questions={[{
        question: 'How do I calculate a salary raise?',
        answer: 'If you have a percentage raise, multiply your current salary by the percent (divide by 100) to find the raise amount. Add that amount to your current salary to find the new salary.'
      }, {
        question: 'Can I enter a fixed raise amount?',
        answer: 'Yes — switch to the amount mode and enter the fixed raise amount. The calculator will also show the equivalent percent increase.'
      }]} />
    </CalculatorPageTemplate>
  );
}
