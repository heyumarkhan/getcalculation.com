import YieldToMaturityCalculator from '../../../_components/calculators/YieldToMaturityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function YieldToMaturityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Yield to Maturity Calculator: Calculate YTM for Bonds"
      description="Calculate yield to maturity (YTM) for bonds accurately. Use our YTM calculator to compute bond returns based on face value, coupon rate, current price, and maturity date. Perfect for bond investors and financial analysis."
      calculator={<YieldToMaturityCalculator />}
      slug="finance/yield-to-maturity-calculator"
      category="Finance"
      features={[
        'Calculate yield to maturity (YTM) for bonds',
        'Support for various coupon rates and bond prices',
        'Shows annual coupon, total coupons, and YTM percentage',
        'Step-by-step calculation breakdown',
        'Embeddable and mobile-friendly'
      ]}
    >
      <SEOSection title="Yield to Maturity Calculator — Bond YTM Calculator">
        <p>
          Our <strong>Yield to Maturity Calculator</strong> (also called a YTM Calculator) helps investors determine the total return on a bond investment. Enter the bond's face value, coupon rate, current market price, and years to maturity to instantly calculate the yield to maturity. This is essential for bond investors making informed investment decisions.
        </p>
      </SEOSection>

      <SEOSection title="What is Yield to Maturity (YTM)?">
        <p>
          <strong>Yield to Maturity (YTM)</strong> is the total annual return an investor will receive if a bond is held until maturity. It takes into account the bond's coupon payments, the purchase price, and the face value at maturity. YTM is expressed as an annual percentage and helps investors compare different bonds and assess their return potential.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Yield to Maturity Calculator">
        <ol>
          <li>Enter the bond's face value (par value) — typically $1,000.</li>
          <li>Enter the coupon rate — the annual interest rate paid by the bond.</li>
          <li>Enter the current market price of the bond.</li>
          <li>Enter the years to maturity — the remaining time until the bond matures.</li>
          <li>Click Calculate to see the YTM and detailed calculation steps.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Key Bond Metrics">
        <p>
          The Yield to Maturity Calculator shows several important metrics:
        </p>
        <SEOList items={[
          "Annual Coupon: The dollar amount paid annually (Face Value × Coupon Rate)",
          "Total Coupons: Sum of all coupon payments until maturity (Annual Coupon × Years to Maturity)",
          "Yield to Maturity (YTM): The annual return percentage if held to maturity"
        ]} />
      </SEOSection>

      <SEOSection title="YTM vs. Current Yield — Difference">
        <p>
          <strong>Current Yield</strong> only considers the annual coupon payment divided by the current price. <strong>Yield to Maturity (YTM)</strong> considers the coupon payments plus the gain or loss from the difference between the purchase price and face value at maturity. YTM provides a more complete picture of bond returns.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Bond Examples">
        <p>
          Using a Yield to Maturity Calculator helps in scenarios like:
        </p>
        <SEOList items={[
          "Premium Bonds: Trading above face value (high coupon rate or falling interest rates)",
          "Discount Bonds: Trading below face value (low coupon rate or rising interest rates)",
          "Par Bonds: Trading at face value (when coupon rate equals market yield)",
          "Comparing bonds with different maturity dates and coupon rates"
        ]} />
      </SEOSection>

      <SEOSection title="SEO & Embedding">
        <p>
          This page is optimized for keywords such as "yield to maturity calculator", "YTM calculator", "bond YTM", "calculate bond return", and "yield calculator". The calculator is embeddable and structured for automatic sitemap generation, making it perfect for financial websites and bond analysis tools.
        </p>
        <SEOList items={["yield to maturity calculator", "YTM calculator", "bond calculator", "bond yield calculator", "calculate YTM"]} />
      </SEOSection>

      <SEOFAQ questions={[{
        question: 'What is yield to maturity?',
        answer: 'Yield to maturity (YTM) is the total annual return an investor will receive if a bond is held until maturity, accounting for all coupon payments and the difference between the purchase price and face value.'
      }, {
        question: 'How do I calculate YTM?',
        answer: 'YTM is calculated using the formula: YTM ≈ (Annual Return) / Average Investment, where Annual Return = (Coupons + Price Gain/Loss) / Years to Maturity. Our calculator uses this approximation method.'
      }, {
        question: 'Why use a YTM calculator?',
        answer: 'YTM calculators help investors quickly assess bond returns and compare different bonds. Manually calculating YTM is complex and time-consuming; our calculator provides instant, accurate results.'
      }, {
        question: 'What if the bond price is above face value?',
        answer: 'If the current price is above face value, the bond is trading at a premium (usually due to coupon rates being higher than market rates). The YTM will be lower than the coupon rate.'
      }]} />
    </CalculatorPageTemplate>
  );
}
