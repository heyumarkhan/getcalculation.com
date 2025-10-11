import GreaterThanOrLessThanCalculator from '../../../_components/calculators/GreaterThanOrLessThanCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GreaterThanOrLessThanPage() {
  return (
    <CalculatorPageTemplate
      title="Greater Than Or Less Than Calculator - Compare Numbers Instantly"
      description="Compare two numbers instantly with our free greater than or less than calculator. Determine which number is larger, smaller, or equal with step-by-step explanations."
      calculator={<GreaterThanOrLessThanCalculator />}
      slug="math/greater-than-or-less-than"
      category="Algebra"
      features={[
        "Compare any two numbers",
        "Instant comparison results",
        "Clear mathematical expressions",
        "Step-by-step explanations",
        "Works with decimals and integers",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Greater Than Or Less Than Calculator">
        <p>
          Comparing numbers is straightforward with our calculator. You just need to enter two numbers you want to compare.
        </p>
        <SEOList items={[
          "Enter First Number: Input your first number in the 'Number 1' field.",
          "Enter Second Number: Input your second number in the 'Number 2' field.",
          "Compare: Click the 'Compare Numbers' button.",
          "Get Your Result: The calculator will instantly display which number is greater, less than, or equal to the other, along with the mathematical expression and explanation."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Comparison Symbols: What Do They Mean?">
        <p>
          Mathematical comparison symbols are fundamental to understanding relationships between numbers. Here's what each symbol means:
        </p>
        
        <h3>Greater Than Symbol (&gt;)</h3>
        <p>
          The greater than symbol (&gt;) indicates that the number on the left is larger than the number on the right. For example, 7 &gt; 3 means "7 is greater than 3." In real-world terms, this could represent comparing temperatures, prices, or any measurable quantity where one value exceeds another.
        </p>
        
        <h3>Less Than Symbol (&lt;)</h3>
        <p>
          The less than symbol (&lt;) indicates that the number on the left is smaller than the number on the right. For example, 2 &lt; 8 means "2 is less than 8." This is commonly used when comparing quantities, distances, or any values where one is smaller than another.
        </p>
        
        <h3>Equal To Symbol (=)</h3>
        <p>
          The equal to symbol (=) indicates that both numbers have the same value. For example, 5 = 5 means "5 is equal to 5." This represents perfect equality between two quantities.
        </p>

        <h3>Additional Comparison Symbols</h3>
        <p>
          While our calculator focuses on the three basic comparisons, mathematics also uses:
        </p>
        <SEOList items={[
          "Greater than or equal to (≥): The left number is greater than or equal to the right number",
          "Less than or equal to (≤): The left number is less than or equal to the right number",
          "Not equal to (≠): The numbers are different from each other"
        ]} />
      </SEOSection>

      <SEOSection title="The Mathematics Behind Number Comparison">
        <p>
          Number comparison is based on the fundamental properties of the real number system. When we compare two numbers, we're determining their relative positions on the number line.
        </p>
        
        <h3>Number Line Concept</h3>
        <p>
          All real numbers can be represented on a number line. Numbers to the right are greater than numbers to the left. This visual representation helps us understand that:
        </p>
        <SEOList items={[
          "Any positive number is greater than any negative number",
          "Zero is greater than any negative number",
          "Among positive numbers, the larger absolute value is greater",
          "Among negative numbers, the smaller absolute value is greater (closer to zero)"
        ]} />

        <h3>Decimal Comparison Rules</h3>
        <p>
          When comparing decimal numbers, we follow these rules:
        </p>
        <SEOList items={[
          "Compare the whole number parts first",
          "If whole numbers are equal, compare the tenths place",
          "If tenths are equal, compare the hundredths place",
          "Continue this process until you find a difference"
        ]} />
      </SEOSection>

      <SEOSection title="Step-by-Step Example: Comparing Numbers">
        <p>
          Let's work through an example to understand how number comparison works in practice.
        </p>
        <SEOExample
          title="Problem: Compare 3.7 and 3.65"
          description="Step 1: Align the numbers by their decimal points. 3.7 = 3.70, 3.65 = 3.65"
          calculation="Step 2: Compare whole numbers: 3 = 3 (equal). Step 3: Compare tenths place: 7 > 6"
          result="Answer: 3.7 > 3.65. The number 3.7 is greater than 3.65 because in the tenths place, 7 is greater than 6."
        />
      </SEOSection>

      <SEOSection title="Real-World Applications of Number Comparison">
        <p>
          Number comparison is essential in countless real-world scenarios across various fields and everyday life.
        </p>
        <SEOList items={[
          "Finance and Banking: Comparing interest rates, loan amounts, investment returns, and account balances to make informed financial decisions.",
          "Science and Research: Comparing experimental results, measurements, data points, and statistical values to draw meaningful conclusions.",
          "Shopping and Consumer Decisions: Comparing prices, discounts, product specifications, and reviews to find the best value.",
          "Sports and Athletics: Comparing scores, times, distances, and statistics to determine winners and track performance improvements.",
          "Education and Grading: Comparing test scores, grade point averages, and academic performance to assess student progress.",
          "Healthcare and Medicine: Comparing vital signs, medication dosages, lab results, and treatment outcomes to monitor patient health.",
          "Technology and Engineering: Comparing system performance metrics, efficiency ratings, and technical specifications to optimize designs."
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes and How to Avoid Them">
        <p>
          While number comparison seems simple, there are common pitfalls that can lead to errors:
        </p>
        <SEOList items={[
          "Decimal Place Confusion: Always align decimal points when comparing decimal numbers. 0.3 ≠ 0.30, but 0.3 = 0.30.",
          "Negative Number Misunderstanding: Remember that -5 < -2 because -5 is further left on the number line.",
          "Fraction vs Decimal: Convert fractions to decimals for easier comparison, or find a common denominator.",
          "Scientific Notation: Convert to standard form before comparing, or compare the exponents and coefficients separately.",
          "Rounding Errors: Be careful when rounding numbers before comparison, as this can change the result."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Can I compare negative numbers with this calculator?",
            answer: "Yes, absolutely! Our calculator handles negative numbers correctly. Remember that -5 is less than -2, and any negative number is less than any positive number."
          },
          {
            question: "How does the calculator handle decimal numbers?",
            answer: "The calculator treats decimal numbers as real numbers and compares them accurately. It considers all decimal places in the comparison, so 3.7 is correctly identified as greater than 3.65."
          },
          {
            question: "What happens if I enter the same number twice?",
            answer: "If you enter the same number for both inputs, the calculator will correctly identify them as equal (=) and show that there is no difference between them."
          },
          {
            question: "Can I compare very large or very small numbers?",
            answer: "Yes, the calculator can handle very large numbers and very small decimal numbers. However, extremely large numbers might be displayed in scientific notation for readability."
          },
          {
            question: "Is there a limit to the number of decimal places?",
            answer: "While there's no strict limit, very long decimal numbers might be rounded for display purposes. The comparison itself remains accurate regardless of the number of decimal places."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Number comparison is a fundamental mathematical skill that forms the foundation for more advanced mathematical concepts. Whether you're working on basic arithmetic, algebra problems, or real-world decision making, our <strong>Greater Than Or Less Than Calculator</strong> provides instant, accurate comparisons with clear explanations.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('slope')} calculator for linear relationships, or use our {createInternalLink('diamondProblem')} solver for algebraic factoring problems.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}
