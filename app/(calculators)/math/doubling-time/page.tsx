import DoublingTimeCalculator from '../../../_components/calculators/DoublingTimeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function DoublingTimePage() {
  return (
    <CalculatorPageTemplate
      title="Doubling Time Calculator - Rule of 70 & Exponential Growth"
      description="Calculate how long it takes for a quantity to double at a given growth rate. Perfect for population growth, investment returns, bacterial growth, and exponential processes."
      calculator={<DoublingTimeCalculator />}
      slug="math/doubling-time"
      category="Algebra"
      features={[
        "Calculate doubling time using Rule of 70",
        "Support for percentage and decimal growth rates",
        "Multiple time units (years, months, days, hours)",
        "Real-world examples and applications",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Doubling Time Calculator">
        <p>
          Our doubling time calculator helps you determine how long it takes for a quantity to double at a given growth rate. Simply enter your growth rate and select the appropriate format and time unit.
        </p>
        <SEOList items={[
          "Enter Growth Rate: Input your growth rate as a percentage (e.g., 5%) or decimal (e.g., 0.05).",
          "Select Rate Type: Choose whether your rate is a percentage or decimal value.",
          "Choose Time Unit: Select the time unit for your result (years, months, days, or hours).",
          "Calculate: Click the &apos;Calculate Doubling Time&apos; button to get your result."
        ]} />
      </SEOSection>

      <SEOSection title="What is Doubling Time?">
        <p>
          Doubling time is the period it takes for a quantity to double in size or value at a constant growth rate. It&apos;s a fundamental concept in exponential growth and is widely used in finance, biology, demography, and many other fields.
        </p>
        
        <h3>Why Doubling Time Matters</h3>
        <SEOList items={[
          "Investment Planning: Understanding how long it takes for investments to double.",
          "Population Studies: Analyzing population growth and demographic trends.",
          "Biological Research: Studying bacterial growth, viral replication, and cell division.",
          "Economic Analysis: Evaluating economic growth and inflation rates.",
          "Resource Planning: Planning for future resource needs and capacity."
        ]} />
      </SEOSection>

      <SEOSection title="The Rule of 70">
        <p>
          The Rule of 70 is a simple approximation for calculating doubling time when dealing with percentage growth rates. It&apos;s based on the mathematical relationship between exponential growth and the natural logarithm.
        </p>
        <SEOFormula 
          formula="Doubling Time ≈ 70 ÷ Growth Rate (%)"
          description="Rule of 70 for percentage growth rates"
        />
        <SEOExample
          title="Example: 5% annual growth"
          description="If a population grows at 5% per year:"
          calculation="Doubling Time = 70 ÷ 5 = 14 years"
          result="The population will double in approximately 14 years"
        />
        <p>
          The Rule of 70 works well for growth rates between 1% and 20%. For more precise calculations or rates outside this range, the natural logarithm method is used.
        </p>
      </SEOSection>

      <SEOSection title="Natural Logarithm Method">
        <p>
          For more precise calculations or when working with decimal growth rates, the natural logarithm method provides exact results.
        </p>
        <SEOFormula 
          formula="Doubling Time = ln(2) ÷ ln(1 + r)"
          description="Where r is the growth rate as a decimal"
        />
        <SEOExample
          title="Example: 0.05 decimal growth rate"
          description="If the growth rate is 0.05 (5% as decimal):"
          calculation="Doubling Time = ln(2) ÷ ln(1.05) = 0.693 ÷ 0.049 = 14.21 years"
          result="The quantity will double in approximately 14.21 years"
        />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Doubling time calculations are used extensively across many fields:
        </p>
        
        <h3>Finance and Economics</h3>
        <SEOList items={[
          "Investment Returns: How long for investments to double in value.",
          "Inflation Analysis: Understanding the impact of inflation on purchasing power.",
          "Economic Growth: Analyzing GDP growth and economic development.",
          "Retirement Planning: Calculating how long savings will last."
        ]} />
        
        <h3>Biology and Medicine</h3>
        <SEOList items={[
          "Bacterial Growth: Studying bacterial population growth in laboratories.",
          "Viral Replication: Understanding how quickly viruses spread.",
          "Cell Division: Analyzing cancer cell growth and treatment planning.",
          "Drug Development: Studying the effectiveness of antimicrobial treatments."
        ]} />
        
        <h3>Demographics and Social Sciences</h3>
        <SEOList items={[
          "Population Growth: Planning for future population needs.",
          "Urban Planning: Understanding city growth and infrastructure needs.",
          "Resource Management: Planning for water, energy, and food needs.",
          "Environmental Studies: Analyzing the impact of human activities."
        ]} />
      </SEOSection>

      <SEOSection title="Common Growth Rates and Their Doubling Times">
        <p>
          Here are some typical growth rates and their corresponding doubling times:
        </p>
        <SEOList items={[
          "1% per year → 70 years (Rule of 70)",
          "2% per year → 35 years",
          "3% per year → 23.3 years",
          "5% per year → 14 years",
          "7% per year → 10 years",
          "10% per year → 7 years"
        ]} />
        <p>
          These examples show how small changes in growth rate can significantly impact doubling time.
        </p>
      </SEOSection>

      <SEOSection title="Limitations and Considerations">
        <p>
          While doubling time calculations are useful, there are important limitations to consider:
        </p>
        <SEOList items={[
          "Constant Growth Assumption: Real-world growth rates often change over time.",
          "Resource Limitations: Exponential growth cannot continue indefinitely due to resource constraints.",
          "External Factors: Economic, environmental, and social factors can affect growth rates.",
          "Accuracy: The Rule of 70 is an approximation; exact calculations use logarithms.",
          "Time Scale: Results depend on the time unit chosen (years, months, etc.)."
        ]} />
      </SEOSection>

      <SEOSection title="Mathematical Background">
        <p>
          The doubling time formula is derived from exponential growth equations:
        </p>
        <SEOFormula 
          formula="A(t) = A₀ × (1 + r)ᵗ"
          description="Exponential growth formula"
        />
        <p>
          To find when A(t) = 2A₀ (doubling):
        </p>
        <SEOFormula 
          formula="2A₀ = A₀ × (1 + r)ᵗ"
          description="Setting final amount to double initial amount"
        />
        <SEOFormula 
          formula="2 = (1 + r)ᵗ"
          description="Simplifying the equation"
        />
        <SEOFormula 
          formula="ln(2) = t × ln(1 + r)"
          description="Taking natural logarithm of both sides"
        />
        <SEOFormula 
          formula="t = ln(2) ÷ ln(1 + r)"
          description="Solving for time t"
        />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What&apos;s the difference between the Rule of 70 and the natural logarithm method?",
            answer: "The Rule of 70 is a quick approximation (70 ÷ growth rate) that works well for rates between 1-20%. The natural logarithm method (ln(2) ÷ ln(1 + r)) gives exact results for any growth rate but requires a calculator."
          },
          {
            question: "Can I use this calculator for negative growth rates?",
            answer: "No, doubling time only applies to positive growth rates. For negative growth (decay), you would calculate &apos;halving time&apos; instead, which uses similar formulas but with decay rates."
          },
          {
            question: "How accurate is the Rule of 70?",
            answer: "The Rule of 70 is quite accurate for growth rates between 1% and 20%. For rates outside this range or when high precision is needed, use the natural logarithm method."
          },
          {
            question: "What if my growth rate is very high (over 20%)?",
            answer: "For very high growth rates, the Rule of 70 becomes less accurate. Use the natural logarithm method for precise calculations, and consider that such high growth rates are usually not sustainable long-term."
          },
          {
            question: "Can I use this for compound interest calculations?",
            answer: "Yes! Doubling time is directly applicable to compound interest. If your investment grows at 7% annually, it will double in about 10 years (70 ÷ 7 = 10)."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding doubling time is crucial for planning and analysis in many fields. Our <strong>Doubling Time Calculator</strong> makes it easy to calculate how long it takes for quantities to double at any growth rate.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('slope')} calculator for linear relationships, or use our {createInternalLink('area')} calculator for geometric calculations.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}
