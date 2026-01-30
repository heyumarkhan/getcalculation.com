import PriceElasticityCalculator from '../../../_components/calculators/PriceElasticityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function PriceElasticityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Elasticity Calculator: Price Elasticity of Demand Calculation"
      description="Calculate price elasticity of demand (PED) to understand how consumer behavior responds to price changes. Use our elasticity calculator for smart pricing decisions and market analysis."
      calculator={<PriceElasticityCalculator />}
      slug="finance/price-elasticity-of-demand-calculator"
      category="Finance"
      features={[
        "Calculates price elasticity of demand coefficient",
        "Identifies elastic, inelastic, or unit elastic demand",
        "Determines pricing power and revenue impact",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Pricing Strategy Depends on Understanding Elasticity">
        <p>
          One of the most critical mistakes businesses make is using the same pricing approach for all products. A {createInternalLink('markup-calculator')} tells you what margin to add, but an <strong>elasticity calculator</strong> tells you whether customers will actually accept that price increase. Price elasticity of demand (PED) measures how sensitive consumer behavior is to price changes — and this insight is fundamental to maximizing revenue and market share. Without understanding elasticity, you're essentially guessing on pricing decisions that directly impact profitability.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the initial quantity demanded before the price change</li>
          <li><strong>Step 2:</strong> Enter the initial price per unit</li>
          <li><strong>Step 3:</strong> Enter the final quantity and price after the change, then calculate</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Elasticity Calculator Formula">
        <p>
          Price elasticity of demand quantifies the responsiveness of consumer behavior to price changes. This metric reveals whether your customers are price-sensitive or will tolerate price increases. The elasticity coefficient tells you exactly how much quantity demanded will change for every 1% change in price.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">PED = (% Change in Quantity) / (% Change in Price)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A coffee shop increases the price of lattes from $4.00 to $4.50 (a 12.5% increase). Monthly sales drop from 1,000 lattes to 850 lattes (a 15% decrease).</p>
        <ul>
          <li>% Change in Quantity: ((850 - 1000) / 1000) × 100 = -15%</li>
          <li>% Change in Price: ((4.50 - 4.00) / 4.00) × 100 = +12.5%</li>
          <li>PED: -15% / 12.5% = -1.2 (elastic demand)</li>
        </ul>
        <p>The coefficient of -1.2 means that for every 1% price increase, quantity demanded drops by 1.2%. This is elastic demand — the price increase actually reduced total revenue despite higher unit prices.</p>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Price elasticity directly impacts business decisions across industries:</p>
        <SEOList items={[
          "Retail pricing: Identify which product categories can sustain price increases without losing sales volume",
          "Dynamic pricing strategies: Use elasticity data to set different prices for different customer segments",
          "Revenue optimization: Raise prices on inelastic goods, lower prices on elastic goods to maximize revenue",
          "Competitive analysis: Monitor how competitors' elasticity compares to yours in the marketplace"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What does an elasticity coefficient of -2.0 mean?",
            answer: "An elasticity coefficient of -2.0 indicates elastic demand. For every 1% price increase, quantity demanded drops by 2%. This is problematic for revenue — a price hike will decrease total revenue because demand is too price-sensitive. These products require volume-focused, competitive pricing strategies."
          },
          {
            question: "How do I know if demand is elastic or inelastic?",
            answer: "If the elasticity coefficient's absolute value is greater than 1 (like -1.5 or -2.0), demand is elastic — customers are price-sensitive. If it's less than 1 (like -0.5), demand is inelastic — customers are less price-sensitive and will tolerate price increases."
          },
          {
            question: "Why do luxury goods have higher elasticity?",
            answer: "Luxury and non-essential goods have higher elasticity because customers can easily reduce consumption or switch to alternatives. When prices rise, people simply buy less or choose competitors. Essential goods like medicine have lower elasticity because people must buy them regardless of price."
          },
          {
            question: "How does elasticity help with profit maximization?",
            answer: "For inelastic demand (PED < 1), raising prices increases revenue without much sales loss. For elastic demand (PED > 1), lowering prices increases total revenue by boosting volume. Understanding this prevents costly pricing mistakes that reduce profitability."
          },
          {
            question: "What factors make demand more elastic?",
            answer: "Availability of substitute products, luxury vs. necessity status, and portion of budget spent all increase elasticity. Products with many substitutes, luxury items, and products consuming a large budget percentage are more elastic. Essential goods with no substitutes are inelastic."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering price elasticity is essential for strategic pricing and revenue optimization. Understanding how your customers respond to price changes transforms pricing from guesswork into data-driven decision-making that protects margins while maintaining market competitiveness.
        </p>
        <p>
          Explore more finance tools: Check out our {createInternalLink('cpm-calculator')} or the popular {createInternalLink('dividend-yield-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
