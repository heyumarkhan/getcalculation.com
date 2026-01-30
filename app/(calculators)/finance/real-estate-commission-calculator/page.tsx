import RealEstateCommissionCalculator from '../../../_components/calculators/RealEstateCommissionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function RealEstateCommissionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Real Estate Commission Calculator: Calculate Agent Fees Instantly"
      description="Calculate real estate agent commission based on sale price and rate. Determine seller net proceeds and understand how commission affects your property sale profit."
      calculator={<RealEstateCommissionCalculator />}
      slug="finance/real-estate-commission-calculator"
      category="Finance"
      features={[
        "Accurate commission calculations for any property price",
        "Instant net proceeds calculation for sellers",
        "Multiple commission rate scenarios",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Real Estate Commission: What Sellers Need to Know">
        <p>
          Real estate commission is one of the largest expenses sellers face when selling a property. This percentage-based fee is paid to real estate agents and brokers for their services in marketing, showing, and facilitating the sale. Understanding how commission is calculated is critical for sellers negotiating their agreement with agents and estimating their net proceeds after the sale. If you're evaluating the overall financial impact of selling, you might also want to review the {createInternalLink('expense-ratio-calculator', 'expense analysis')} to understand your total property costs and fees.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to calculate real estate commission instantly:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the sale price of the property (the agreed-upon purchase price)</li>
          <li><strong>Step 2:</strong> Input the commission rate as a percentage (typically 5–6%, but negotiable)</li>
          <li><strong>Step 3:</strong> Click "Calculate" to see the commission amount and seller's net proceeds</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Real Estate Commission Formula">
        <p>
          Real estate commission is calculated as a percentage of the final sale price. This percentage varies by market, brokerage, and negotiation but typically ranges from 4% to 6%. The agent's commission is paid at closing from the sale proceeds, and it's split between the listing agent and the buyer's agent (usually 50/50, though this varies). Understanding this formula helps sellers estimate their take-home proceeds and negotiate more effectively with their agent.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Commission = Sale Price × (Commission Rate ÷ 100)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Imagine you're selling a home in a suburban market for $425,000 and your listing agreement specifies a 5.5% commission rate (standard for your area). Using the real estate commission formula:
        </p>
        <ul>
          <li>Sale Price: $425,000</li>
          <li>Commission Rate: 5.5%</li>
          <li>Commission = $425,000 × (5.5 ÷ 100) = $23,375</li>
          <li>Your Net Proceeds: $425,000 - $23,375 = $401,625 (before closing costs)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Real estate commission calculation is essential for anyone involved in property transactions, from individual homeowners to real estate professionals and brokers.</p>
        <SEOList items={[
          "Residential home sales (single-family and condo transactions)",
          "Investment property transactions and portfolio management",
          "Commercial real estate sales and lease negotiations",
          "Multi-property sales and estate liquidation",
          "Real estate agent commission comparisons and negotiations"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the standard real estate commission rate?",
            answer: "The standard commission rate varies by market but typically ranges from 4% to 6%. In most US markets, the average is around 5-5.5%, split equally between the listing agent and buyer's agent. However, rates are negotiable and can vary based on property type, market conditions, and local competition."
          },
          {
            question: "Can I negotiate the real estate commission rate?",
            answer: "Yes, absolutely. Real estate commission is negotiable. Sellers should discuss rates with multiple agents before listing and can request lower rates based on market conditions, property value, or competitive circumstances. Some agents may reduce rates for high-price properties or quick sales."
          },
          {
            question: "Who pays the real estate commission—buyer or seller?",
            answer: "Traditionally, the seller pays the entire commission, which is then split between the listing agent and buyer's agent. However, in rare cases or specific negotiations, the buyer may contribute. The commission is paid from the sale proceeds at closing."
          },
          {
            question: "How is the commission split between agents?",
            answer: "The total commission is typically split 50/50 between the listing agent and buyer's agent. However, this split varies by brokerage agreement and can be negotiated. Some brokers may take a portion of the agent's share as well."
          },
          {
            question: "Are there other costs besides commission that reduce seller proceeds?",
            answer: "Yes, in addition to commission, sellers typically pay closing costs including title insurance, attorney fees, property taxes, HOA fees, and potentially repair concessions. Net proceeds equal the sale price minus commission and all closing costs. Budget 8-10% of the sale price for total selling costs."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering real estate commission calculations is essential for any seller looking to understand the financial impact of selling a property. By calculating your commission upfront and negotiating effectively, you can maximize your net proceeds and make informed decisions about listing your home.
        </p>
        <p>
          Explore more real estate and finance tools: Check out our {createInternalLink('appreciation-calculator')} to track property value growth, or use the {createInternalLink('expense-ratio-calculator')} to analyze investment property returns.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
