import PayRaiseCalculator from '../../../_components/calculators/PayRaiseCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function PayRaiseCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Pay Raise Calculator: Salary Raise Calculator for New Pay"
      description="Use our salary raise calculator to estimate new pay, raise amount, and percent increase fast with clear steps for budgeting, HR planning, and compensation reviews."
      calculator={<PayRaiseCalculator />}
      slug="finance/pay-raise-calculator"
      category="Finance"
      features={[
        "Accurate raise and new pay results",
        "Simple inputs for quick use",
        "Mobile-friendly and readable layout",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Salary Raise Math Matters">
        <p>
          Negotiations, annual reviews, and promotion letters often quote raises in percent, but real budgets need exact numbers. This <strong>salary raise calculator</strong> converts a raise into a clear new pay figure and raise amount, which helps with planning taxes, savings, and monthly expenses. If you compare raise scenarios alongside overtime, the {createInternalLink('overtime-calculator')} can help validate total earnings.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter your current salary or hourly rate.</li>
          <li><strong>Step 2:</strong> Enter the raise as a percentage or fixed amount.</li>
          <li><strong>Step 3:</strong> Click Calculate to see the new pay and raise amount.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: salary raise calculator Formula">
        <p>
          A raise increases pay by a percent or a fixed amount. For percent raises, multiply current pay by the raise rate to get the raise amount, then add it to current pay. This is commonly used for salary increase calculations and compensation planning.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">New Pay = Current Pay × (1 + Raise%)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>An employee earns $60,000 and receives a 6% raise.</p>
        <ul>
          <li>Input: Current Pay = $60,000, Raise = 6%</li>
          <li>Result: New Pay = 60,000 × 1.06 = $63,600</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Use this calculator for salary planning, offer reviews, and budgeting decisions.</p>
        <SEOList items={[
          "HR compensation review workflows",
          "Personal budgeting after annual reviews",
          "Offer comparisons and raise negotiations"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How do I calculate a salary raise from percent?",
            answer: "Raise Amount = Current Pay × Raise%. Add it to current pay for the new salary."
          },
          {
            question: "What if my raise is a fixed amount?",
            answer: "Add the fixed raise amount directly to current pay to get the new salary."
          },
          {
            question: "Can I use this for hourly wages?",
            answer: "Yes. Enter your hourly rate and the raise to calculate the new hourly rate."
          },
          {
            question: "Does this include taxes or deductions?",
            answer: "No, results show gross pay changes before taxes or benefits deductions."
          },
          {
            question: "Why is raise percent different from bonus percent?",
            answer: "A raise permanently increases base pay, while bonuses are typically one-time payments."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering raise math is easy with the right tools. Use this calculator to plan income changes with confidence and clarity.
        </p>
        <p>
          Explore more Finance tools: Check out our {createInternalLink('markup-calculator')} or the popular {createInternalLink('time-and-a-half-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
