import SignificantFiguresCalculator from '../../../_components/calculators/SignificantFiguresCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SignificantFiguresPage() {
  return (
    <CalculatorPageTemplate
      title="Significant Figures Calculator - Sig Fig Calculator & Rounding Tool"
      description="Calculate significant figures, round numbers to specified precision, and perform arithmetic operations while maintaining proper significant figures. Essential for chemistry, physics, and scientific calculations."
      calculator={<SignificantFiguresCalculator />}
      slug="math/significant-figures"
      category="Algebra"
      features={[
        "Count significant figures in any number",
        "Round numbers to specified significant figures",
        "Perform addition and multiplication with proper sig figs",
        "Handle scientific notation and decimals",
        "Step-by-step explanations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Significant Figures Calculator">
        <p>
          Our significant figures calculator helps you work with precision in scientific calculations. You can count significant figures, round numbers, or perform arithmetic operations while maintaining proper precision.
        </p>
        <SEOList items={[
          "Select Operation: Choose to count sig figs, round numbers, add, or multiply.",
          "Enter Numbers: Input your numbers (supports decimals, scientific notation, etc.).",
          "Calculate: Click the appropriate button to get your result.",
          "Get Results: View the significant figures count, rounded values, and explanations."
        ]} />
      </SEOSection>

      <SEOSection title="What Are Significant Figures?">
        <p>
          Significant figures (sig figs) are the digits in a number that carry meaning in terms of precision. They indicate how precisely a measurement was made and help maintain accuracy in calculations.
        </p>
        
        <h3>Why Significant Figures Matter</h3>
        <SEOList items={[
          "Precision Communication: They tell you how precise a measurement is.",
          "Calculation Accuracy: They prevent overstating the precision of results.",
          "Scientific Standards: They are essential in chemistry, physics, and engineering.",
          "Error Prevention: They help avoid false precision in calculations."
        ]} />
      </SEOSection>

      <SEOSection title="Rules for Counting Significant Figures">
        <p>
          Understanding the rules for counting significant figures is crucial for accurate scientific work:
        </p>
        
        <h3>Rule 1: Non-Zero Digits</h3>
        <p>All non-zero digits are always significant.</p>
        <SEOExample
          title="Examples"
          description="123 has 3 significant figures, 4567 has 4 significant figures"
          calculation="123 → 3 sig figs, 4567 → 4 sig figs"
          result="All digits are significant"
        />
        
        <h3>Rule 2: Zeros Between Non-Zero Digits</h3>
        <p>Zeros between non-zero digits are always significant.</p>
        <SEOExample
          title="Examples"
          description="102 has 3 significant figures, 1002 has 4 significant figures"
          calculation="102 → 3 sig figs, 1002 → 4 sig figs"
          result="Zeros between digits count"
        />
        
        <h3>Rule 3: Leading Zeros</h3>
        <p>Leading zeros (zeros before the first non-zero digit) are never significant.</p>
        <SEOExample
          title="Examples"
          description="0.00123 has 3 significant figures, 0.000456 has 3 significant figures"
          calculation="0.00123 → 3 sig figs, 0.000456 → 3 sig figs"
          result="Leading zeros don&apos;t count"
        />
        
        <h3>Rule 4: Trailing Zeros</h3>
        <p>Trailing zeros are significant only if there&apos;s a decimal point in the number.</p>
        <SEOExample
          title="Examples"
          description="1200 has 2 significant figures, 1200. has 4 significant figures"
          calculation="1200 → 2 sig figs, 1200. → 4 sig figs"
          result="Decimal point makes trailing zeros significant"
        />
      </SEOSection>

      <SEOSection title="Scientific Notation and Significant Figures">
        <p>
          Scientific notation makes it easier to identify significant figures. Only the digits in the mantissa (the number before the &apos;e&apos;) count as significant figures.
        </p>
        <SEOFormula 
          formula="1.23 × 10⁴ has 3 significant figures"
          description="Only digits in mantissa count"
        />
        <SEOFormula 
          formula="1.230 × 10⁴ has 4 significant figures"
          description="Trailing zero in mantissa is significant"
        />
        <SEOExample
          title="Examples"
          description="Scientific notation examples:"
          calculation="2.5e3 → 2 sig figs, 1.230e-4 → 4 sig figs"
          result="Only mantissa digits count toward significant figures"
        />
      </SEOSection>

      <SEOSection title="Arithmetic with Significant Figures">
        <p>
          When performing calculations, the result must have the same precision as the least precise measurement used in the calculation.
        </p>
        
        <h3>Addition and Subtraction</h3>
        <p>The result has the same number of decimal places as the number with the fewest decimal places.</p>
        <SEOExample
          title="Example: 12.34 + 5.6"
          description="12.34 has 2 decimal places, 5.6 has 1 decimal place"
          calculation="12.34 + 5.6 = 17.94 → 17.9 (1 decimal place)"
          result="Result has 1 decimal place (least precise)"
        />
        
        <h3>Multiplication and Division</h3>
        <p>The result has the same number of significant figures as the number with the fewest significant figures.</p>
        <SEOExample
          title="Example: 2.3 × 4.567"
          description="2.3 has 2 sig figs, 4.567 has 4 sig figs"
          calculation="2.3 × 4.567 = 10.5041 → 11 (2 sig figs)"
          result="Result has 2 significant figures (least precise)"
        />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Significant figures are essential in many scientific and engineering fields:
        </p>
        <SEOList items={[
          "Chemistry: Laboratory measurements, molar mass calculations, and stoichiometry.",
          "Physics: Experimental data analysis, uncertainty calculations, and error propagation.",
          "Engineering: Tolerance specifications, manufacturing precision, and quality control.",
          "Medicine: Dosage calculations, laboratory test results, and diagnostic measurements.",
          "Environmental Science: Pollution measurements, climate data, and environmental monitoring.",
          "Research: Data analysis, statistical calculations, and scientific reporting."
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes and How to Avoid Them">
        <p>
          Understanding common mistakes helps ensure accurate significant figure calculations:
        </p>
        <SEOList items={[
          "Mistake: Counting leading zeros as significant. Solution: Remember that leading zeros are never significant.",
          "Mistake: Forgetting about trailing zeros. Solution: Check if there&apos;s a decimal point to determine if trailing zeros are significant.",
          "Mistake: Overstating precision in results. Solution: Always use the least precise measurement as your guide.",
          "Mistake: Confusing decimal places with significant figures. Solution: Remember they are different concepts.",
          "Mistake: Not considering scientific notation. Solution: Only count digits in the mantissa."
        ]} />
      </SEOSection>

      <SEOSection title="Rounding to Significant Figures">
        <p>
          When rounding to a specific number of significant figures, follow these steps:
        </p>
        <SEOList items={[
          "Identify the digit at the desired significant figure position.",
          "Look at the digit immediately to the right.",
          "If the next digit is 5 or greater, round up.",
          "If the next digit is less than 5, round down.",
          "Replace all digits to the right with zeros (or remove them if after decimal point)."
        ]} />
        <SEOExample
          title="Example: Round 123.456 to 3 significant figures"
          description="The third significant figure is 3, the next digit is 4"
          calculation="123.456 → 123 (4 &lt; 5, so round down)"
          result="123.456 rounded to 3 sig figs = 123"
        />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What&apos;s the difference between decimal places and significant figures?",
            answer: "Decimal places count digits after the decimal point, while significant figures count all meaningful digits regardless of decimal position. For example, 12.34 has 2 decimal places but 4 significant figures."
          },
          {
            question: "How do I handle zeros in the middle of a number?",
            answer: "Zeros between non-zero digits are always significant. For example, 1002 has 4 significant figures because the zeros are between the 1 and 2."
          },
          {
            question: "What about numbers ending in zeros without a decimal point?",
            answer: "Trailing zeros without a decimal point are ambiguous. 1200 could mean 2, 3, or 4 significant figures. Use scientific notation (1.2 × 10³) to clarify precision."
          },
          {
            question: "How do significant figures work with exact numbers?",
            answer: "Exact numbers (like counting 5 apples) have infinite significant figures and don&apos;t limit the precision of calculations. Only measured numbers limit precision."
          },
          {
            question: "Can I have more significant figures than decimal places?",
            answer: "Yes! For example, 1.23 has 3 significant figures but only 2 decimal places. Significant figures count all meaningful digits, not just those after the decimal."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering significant figures is essential for accurate scientific work. Our <strong>Significant Figures Calculator</strong> makes it easy to count, round, and perform calculations while maintaining proper precision.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('slope')} calculator for linear relationships, or use our {createInternalLink('area')} calculator for geometric calculations.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}
