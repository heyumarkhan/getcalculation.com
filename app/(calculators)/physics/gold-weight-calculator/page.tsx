import GoldWeightCalculator from '../../../_components/calculators/GoldWeightCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function GoldWeightCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Gold Weight Calculator – Precious Metal Converter"
      description="Convert and calculate gold weights across units and karats with pure gold content analysis."
      calculator={<GoldWeightCalculator />}
      slug="physics/gold-weight-calculator"
      category="Physics"
      features={[
        'Converts grams, troy ounces, kilograms, pounds, carats',
        'Gold purity calculator from 9K to 24K',
        'Pure gold content calculation',
        'Support for 8 weight units',
        'Real-time conversions',
        'Fineness and karat analysis',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Gold Weight Calculator?">
        <p>
          A gold weight calculator converts precious metal weights between metric, imperial, and specialized units while accounting for gold purity (karatage). It calculates the pure gold content based on alloy fineness, essential for jewelry appraisals, bullion trading, gemstone valuation, and precious metal investments.
        </p>
        <p className="mt-4">
          Use this calculator to convert between grams, troy ounces, kilograms, and carats while determining the actual pure gold amount in any alloy karat measurement from 9K to 24K.
        </p>
      </SEOSection>

      <SEOSection title="Gold Purity Standards">
        <p className="mb-4">Gold purity is measured in karats (K), indicating the fraction of pure gold in an alloy:</p>
        <SEOList items={[
          '<strong>24K Gold:</strong> 100% pure (999.9 fine gold) – Softest, most valuable',
          '<strong>22K Gold:</strong> 91.7% pure – Commonly used in jewelry and coins',
          '<strong>20K Gold:</strong> 83.3% pure – Fine jewelry and decorative items',
          '<strong>18K Gold:</strong> 75% pure – High-quality jewelry, ideal balance of purity and durability',
          '<strong>14K Gold:</strong> 58.3% pure – Most popular for jewelry; durable and practical',
          '<strong>10K Gold:</strong> 41.7% pure – Entry-level, durability for rings',
          '<strong>9K Gold:</strong> 37.5% pure – Legal minimum for "gold" in most countries'
        ]} />
      </SEOSection>

      <SEOSection title="Weight Unit Conversions">
        <SEOFormula
          formula="\text{Weight (g)} = \text{Weight (troy oz)} \times 31.1035"
          description="Convert troy ounces to grams (standard precious metal unit)."
        />
        <SEOFormula
          formula="\text{Weight (g)} = \text{Weight (oz)} \times 28.3495"
          description="Convert avoirdupois ounces to grams."
        />
        <SEOFormula
          formula="\text{Pure Gold (g)} = \text{Total Weight (g)} \times \frac{\text{Karat}}{24}"
          description="Calculate pure gold content from total weight and karat fineness."
        />
        <SEOFormula
          formula="\text{Fineness (\%)} = \frac{\text{Karat}}{24} \times 100"
          description="Determine gold purity percentage from karat number."
        />
      </SEOSection>

      <SEOSection title="How to Use the Gold Weight Calculator">
        <SEOList ordered items={[
          '<strong>Enter gold weight:</strong> Input the amount in your preferred unit (g, oz, troy oz, etc.).',
          '<strong>Select input unit:</strong> Choose from 8 supported weight measurements.',
          '<strong>Select gold purity:</strong> Pick karat rating from 9K to 24K.',
          '<strong>Click Calculate:</strong> Get instant conversions to all units and pure gold content.',
          '<strong>Review results:</strong> See total weight conversions and pure gold breakdown by unit.'
        ]} />
      </SEOSection>

      <SEOSection title="Applications and Uses">
        <p className="mb-4">
          Gold weight calculation is critical in:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Jewelry Appraisal:</strong> Determining value based on purity and weight.</li>
          <li><strong>Precious Metal Trading:</strong> Converting market prices across weight units.</li>
          <li><strong>Gemstone Valuation:</strong> Assessing weight in carats for diamonds and gems.</li>
          <li><strong>Bullion Investment:</strong> Comparing troy ounce spot prices.</li>
          <li><strong>Coin and Medal Manufacturing:</strong> Precise alloy composition control.</li>
          <li><strong>Scrap Gold Calculation:</strong> Estimating value from total and pure gold weight.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Key Gold Weight Terms">
        <p className="mb-4">
          <strong>Troy Ounce:</strong> Specialized unit for precious metals; 1 troy oz = 31.1035 grams (not the same as regular ounces).
        </p>
        <p className="mb-4">
          <strong>Fineness:</strong> Measure of purity as a decimal (e.g., 0.917 for 22K gold, meaning 91.7% pure).
        </p>
        <p className="mb-4">
          <strong>Karatage:</strong> Fraction of pure gold per 24 parts (e.g., 18K = 18 parts pure gold out of 24).
        </p>
        <p>
          <strong>Alloy:</strong> Mixture of gold with other metals (copper, silver, nickel) to improve durability and reduce cost.
        </p>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> You have a 14K gold ring weighing 5 grams.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>14K gold contains 58.3% pure gold (14 ÷ 24).</li>
          <li>Pure gold = 5 g × 0.583 = 2.915 grams.</li>
          <li>In troy ounces: 5 g ÷ 31.1035 = 0.1607 troy oz total.</li>
          <li>Pure gold: 2.915 g ÷ 31.1035 = 0.0937 troy oz pure gold.</li>
          <li>At $2000 per troy oz: Value ≈ 0.0937 × $2000 = $187.40.</li>
        </ol>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the difference between troy ounce and regular ounce?',
            answer: 'A troy ounce (31.1035 g) is specifically for precious metals and gemstones. A regular ounce (28.3495 g) is for general weights. Always use troy ounces for gold pricing.'
          },
          {
            question: 'Is 14K gold better than 18K?',
            answer: '18K is purer (75% vs 58.3%) and more valuable, but 14K is more durable for rings. Choice depends on use and budget.'
          },
          {
            question: 'How do I calculate the value of my gold?',
            answer: 'Multiply pure gold weight in troy ounces by the current spot price. Use this calculator to find pure gold content first.'
          },
          {
            question: 'Can I use this for other precious metals?',
            answer: 'Yes. Weight conversions apply to all metals. For silver, platinum, and palladium, apply the same karat/fineness logic with appropriate purity levels.'
          },
          {
            question: 'What does "fineness" mean?',
            answer: 'Fineness is the purity of gold expressed as a decimal (0.999 = 99.9% pure). It corresponds to karat: 24K = 0.999 fineness.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
