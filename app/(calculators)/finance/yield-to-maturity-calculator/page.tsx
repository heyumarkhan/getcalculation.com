import YieldToMaturityCalculator from '../../../_components/calculators/YieldToMaturityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function YieldToMaturityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Yield to Maturity Calculator: ytm calculator for bond returns"
      description="Use this ytm calculator to estimate bond yield to maturity, compare prices, and plan returns with fast, accurate results and clear steps."
      calculator={<YieldToMaturityCalculator />}
      slug="finance/yield-to-maturity-calculator"
      category="Finance"
      features={[
        "Accurate YTM estimates for bonds",
        "Simple inputs and clear outputs",
        "Mobile-friendly and readable layout",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Bond Investors Track YTM">
        <p>
          Bond pricing can be misleading if you only look at coupon rate. The <strong>ytm calculator</strong> shows the true annualized return based on price, coupons, and time to maturity. If you also compare cashflow changes for working income, our {createInternalLink('pay-raise-calculator')} can help you model pay adjustments alongside portfolio returns.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter face value, coupon rate, and current bond price.</li>
          <li><strong>Step 2:</strong> Enter years to maturity and coupon frequency if applicable.</li>
          <li><strong>Step 3:</strong> Click Calculate to see the estimated yield to maturity.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: ytm calculator Formula">
        <p>
          Yield to maturity estimates the annual return you earn if you hold a bond to maturity. A common approximation uses the annual coupon plus the annualized price change divided by the average of face value and price.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">YTM ≈ (C + (F − P) / n) / ((F + P) / 2)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A bond has a $1,000 face value, $50 annual coupon, price $960, and 5 years to maturity.</p>
        <ul>
          <li>Input: C = 50, F = 1000, P = 960, n = 5</li>
          <li>Result: YTM ≈ (50 + (1000 − 960)/5) / (980) = (50 + 8) / 980 ≈ 5.92%</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Use YTM to compare bonds, evaluate premiums/discounts, and plan fixed-income returns.</p>
        <SEOList items={["Comparing bond yields across maturities", "Assessing premium vs discount bonds", "Portfolio planning for fixed-income investors"]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What does YTM tell me about a bond?",
            answer: "It estimates the annualized return if you hold the bond to maturity, including coupons and price changes."
          },
          {
            question: "Is YTM the same as coupon rate?",
            answer: "No. Coupon rate is based on face value, while YTM is based on current price and time to maturity."
          },
          {
            question: "Why can YTM be higher than the coupon?",
            answer: "When a bond is priced below face value, the price gain at maturity increases the total return."
          },
          {
            question: "Does this calculator handle semiannual coupons?",
            answer: "Yes, you can adjust inputs for coupon frequency to estimate YTM accurately."
          },
          {
            question: "How do I compare YTM with other returns?",
            answer: "Use YTM as an annualized benchmark and compare it to other fixed-income or savings yields."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering bond returns is easy with the right tools. Use this calculator to compare yields and make confident investment decisions.
        </p>
        <p>
          Explore more Finance tools: Check out our {createInternalLink('markup-calculator')} or the popular {createInternalLink('time-and-a-half-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
