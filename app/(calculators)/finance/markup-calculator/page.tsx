import MarkupCalculator from '../../../_components/calculators/MarkupCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function MarkupCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Markup Calculator: Calculate Selling Price with Markup Percentage"
      description="Calculate selling price based on cost and markup. Use our markup calculator to compute profit margin, markup amount, and selling price. Perfect for retail, ecommerce, and pricing decisions."
      calculator={<MarkupCalculator />}
      slug="finance/markup-calculator"
      category="Finance"
      features={[
        'Calculate selling price from cost price and markup',
        'Support for percentage or fixed amount markup',
        'Shows markup amount, markup percent, and selling price',
        'Step-by-step calculation breakdown',
        'Embeddable and mobile-friendly'
      ]}
    >
      <SEOSection title="Markup Calculator — Calculate Selling Price">
        <p>
          Our <strong>Markup Calculator</strong> helps you determine the selling price by applying a markup to your cost price. Enter your cost and the markup (as a percentage or fixed amount) to instantly view the markup amount, markup percent, and selling price.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Markup Calculator">
        <ol>
          <li>Choose whether your markup is a percent or a fixed amount.</li>
          <li>Enter your cost price.</li>
          <li>Enter the markup amount or percentage.</li>
          <li>Click Calculate to view results and calculation steps.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Markup vs. Margin — Key Difference">
        <p>
          Many people confuse markup with margin. <strong>Markup</strong> is the amount added to the cost price to arrive at the selling price. <strong>Margin</strong> is the profit expressed as a percentage of the selling price. Our markup calculator focuses on calculating selling price from cost price using markup.
        </p>
      </SEOSection>

      <SEOSection title="SEO & Embedding">
        <p>
          This page is optimized for keywords such as "markup calculator", "selling price calculator", "markup percentage calculator", and "cost price calculator". The calculator is embeddable and structured for automatic sitemap generation.
        </p>
        <SEOList items={["markup calculator", "selling price calculator", "markup percentage calculator", "cost price calculator", "profit margin calculator"]} />
      </SEOSection>

      <SEOFAQ questions={[{
        question: 'What is markup?',
        answer: 'Markup is the amount or percentage added to the cost of a product to arrive at the selling price. For example, a 25% markup on a $50 item adds $12.50, making the selling price $62.50.'
      }, {
        question: 'How do I calculate selling price with markup?',
        answer: 'Selling Price = Cost Price + (Cost Price × Markup Percentage). Or if you have a fixed markup amount: Selling Price = Cost Price + Markup Amount.'
      }, {
        question: 'Can I enter a fixed markup amount?',
        answer: 'Yes — switch to the amount mode and enter the fixed markup amount. The calculator will also show the equivalent percent markup.'
      }]} />
    </CalculatorPageTemplate>
  );
}
