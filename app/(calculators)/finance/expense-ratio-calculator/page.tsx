import ExpenseRatioCalculator from '../../../_components/calculators/ExpenseRatioCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ExpenseRatioCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Expense Ratio Calculator: Compare Fund Costs Instantly"
      description="Calculate expense ratio to evaluate mutual fund and ETF costs. Understand how management fees impact your investment returns with our simple, accurate expense ratio calculator."
      calculator={<ExpenseRatioCalculator />}
      slug="finance/expense-ratio-calculator"
      category="Finance"
      features={[
        "Calculates expense ratio as a percentage",
        "Compares fund costs across fund types",
        "Shows how fees impact long-term returns",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Understanding Expense Ratio Matters for Investors">
        <p>
          When you invest in mutual funds or ETFs, hidden costs can quietly erode your wealth over time. An <strong>expense ratio</strong> is the annual fee expressed as a percentage of your fund assets — and seemingly small differences compound dramatically over decades. Our {createInternalLink('year-over-year-growth-calculator')} helps you see how investments grow when fees are minimized. Understanding your fund's expense ratio is the first step to protecting your investment returns and making smarter portfolio decisions.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the total annual expenses of the fund (management fees, administrative costs, operational expenses)</li>
          <li><strong>Step 2:</strong> Enter the fund's total assets under management (AUM)</li>
          <li><strong>Step 3:</strong> Click Calculate to see the expense ratio percentage</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Expense Ratio Formula">
        <p>
          The expense ratio quantifies the cost of owning a mutual fund or ETF as a percentage of assets. This crucial metric appears in fund prospectuses and directly impacts your net investment returns. Lower expense ratios preserve more capital for compound growth.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Expense Ratio = (Annual Expenses / Fund Assets) × 100</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Suppose you're evaluating an actively managed mutual fund with $200 million in assets under management. The fund incurs $1.2 million in annual operating expenses, including management fees ($800,000), administrative costs ($300,000), and marketing expenses ($100,000).</p>
        <ul>
          <li>Annual Expenses: $1,200,000</li>
          <li>Fund Assets: $200,000,000</li>
          <li>Expense Ratio: ($1,200,000 / $200,000,000) × 100 = 0.60%</li>
        </ul>
        <p>This means investors collectively pay 0.60% of their assets annually to operate the fund. For a $50,000 investment, that's $300 per year in fees.</p>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Expense ratios are critical in evaluating investment funds across different scenarios:</p>
        <SEOList items={[
          "Comparing index funds (typically 0.03%–0.20%) vs. active funds (0.50%–1.50%) to understand cost-performance trade-offs",
          "Evaluating ETF funds based on recurring expense ratios and total cost of ownership over 20+ years",
          "Assessing how a 0.5% difference in expense ratio reduces retirement savings by $100,000+ over 30 years",
          "Identifying low-cost fund families for tax-efficient, long-term portfolio building"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between expense ratio and management fee?",
            answer: "The management fee is one component of the expense ratio. The expense ratio includes management fees, administrative costs, distribution fees, and other operating expenses. The expense ratio is the total annual cost expressed as a percentage of fund assets."
          },
          {
            question: "What is a good expense ratio for a mutual fund?",
            answer: "Passive index funds typically have expense ratios below 0.20% and offer excellent value. Actively managed funds average 0.50%–1.50%. Ratios above 2.00% are considered high and significantly impact long-term returns. For ETFs, look for ratios under 0.25% for broad market exposure."
          },
          {
            question: "How much do high expense ratios cost over time?",
            answer: "The impact compounds significantly. On a $100,000 investment over 30 years assuming 7% annual returns, a 1.00% expense ratio vs. 0.10% costs you approximately $190,000 in lost wealth. This is why minimizing fund costs matters for retirement investors."
          },
          {
            question: "Are there hidden costs beyond the expense ratio?",
            answer: "Yes. The expense ratio doesn't include trading costs, bid-ask spreads, or taxes on capital gains distributions. Some funds also charge sales loads (upfront fees), 12b-1 marketing fees, or redemption fees. Always review the prospectus for complete fee disclosure."
          },
          {
            question: "How often should I check my funds' expense ratios?",
            answer: "Review fund expense ratios annually during portfolio rebalancing or if you receive updated prospectuses. If your fund's expenses increase significantly or you find lower-cost alternatives, consider switching. Many advisors review expense ratios every 2–3 years when rebalancing portfolios."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering expense ratios is essential for long-term wealth building. By understanding and minimizing fund costs, you keep more money invested and working for you. Even small percentage differences in expense ratios compound into meaningful wealth differences over decades.
        </p>
        <p>
          Explore more finance tools: Check out our {createInternalLink('dividend-yield-calculator')} or the popular {createInternalLink('appreciation-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
