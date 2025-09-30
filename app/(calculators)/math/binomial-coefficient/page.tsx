import BinomialCoefficientCalculator from '../../../_components/calculators/BinomialCoefficientCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function BinomialCoefficientPage() {
  return (
    <CalculatorPageTemplate
      title="Binomial Coefficient Calculator: Combinations C(n,k) - Free Online Tool"
      description="Calculate binomial coefficients C(n,k) for combinations. Find the number of ways to choose k items from n items using factorial formula with step-by-step solutions."
      calculator={<BinomialCoefficientCalculator />}
      slug="math/binomial-coefficient"
      category="Combinatorics"
      features={[
        "Calculate binomial coefficients C(n,k)",
        "Step-by-step factorial calculations",
        "Combination counting and analysis",
        "Input validation for non-negative integers",
        "Detailed explanations and formulas",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Binomial Coefficients: The Foundation of Combinatorics">
        <p>
          Binomial coefficients are fundamental mathematical objects that appear throughout mathematics, from algebra and probability to statistics and computer science. Whether you&apos;re a student learning combinatorics, a researcher analyzing data, or a professional working with probability calculations, understanding <strong>binomial coefficients</strong> is essential for solving counting problems and understanding mathematical relationships. This comprehensive guide will walk you through everything you need to know about binomial coefficients, from basic concepts to practical applications.
        </p>
        <p>
          At its core, a binomial coefficient C(n,k) represents the number of ways to choose k items from a set of n items without regard to order. Our Binomial Coefficient Calculator at the top of this page makes these calculations instant and accurate, but understanding the underlying principles will help you solve complex counting problems and make informed decisions. We&apos;ll explore the mathematical concepts, provide practical examples, and clarify common points of confusion.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use Our Binomial Coefficient Calculator">
        <p>
          Our Binomial Coefficient Calculator is designed for simplicity and accuracy. Follow these steps to calculate combinations:
        </p>
        <ol>
          <li><strong>Enter n:</strong> Input the total number of items in your set.</li>
          <li><strong>Enter k:</strong> Input the number of items you want to choose from the set.</li>
          <li><strong>Calculate:</strong> Click the &quot;Calculate Binomial Coefficient&quot; button to get your results.</li>
          <li><strong>Review Results:</strong> The calculator will display the coefficient, formula, explanation, and step-by-step calculations.</li>
        </ol>
        <p>
          The calculator includes built-in validation to ensure n and k are non-negative integers with k ≤ n.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Binomial Coefficient Formula">
        <p>
          The binomial coefficient C(n,k) is calculated using the factorial formula:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">C(n,k) = n! / (k! × (n-k)!)</p>
        </div>
        
        <p>Where:</p>
        <SEOList items={[
          "n! = n × (n-1) × (n-2) × ... × 2 × 1 (n factorial)",
          "k! = k × (k-1) × (k-2) × ... × 2 × 1 (k factorial)",
          "(n-k)! = (n-k) × (n-k-1) × ... × 2 × 1 ((n-k) factorial)"
        ]} />
        
        <p><strong>Example:</strong> C(5,3) = 5! / (3! × 2!) = 120 / (6 × 2) = 10</p>
        <p>This means there are 10 ways to choose 3 items from a set of 5 items.</p>
      </SEOSection>

      <SEOSection title="Key Properties of Binomial Coefficients">
        <p>
          Binomial coefficients have several important mathematical properties:
        </p>
        
        <h3>Symmetry Property</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center">C(n,k) = C(n, n-k)</p>
        </div>
        <p>This means choosing k items is the same as choosing (n-k) items to exclude.</p>
        
        <h3>Boundary Conditions</h3>
        <SEOList items={[
          "C(n,0) = 1 (there&apos;s one way to choose nothing)",
          "C(n,n) = 1 (there&apos;s one way to choose everything)",
          "C(n,1) = n (there are n ways to choose one item)"
        ]} />
        
        <h3>Pascal&apos;s Triangle</h3>
        <p>
          Binomial coefficients form Pascal&apos;s Triangle, where each number is the sum of the two numbers above it:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4 text-center">
          <pre className="font-mono text-sm">
{`    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1`}
          </pre>
        </div>
      </SEOSection>

      <SEOSection title="Practical Applications of Binomial Coefficients">
        <p>
          Binomial coefficients are used in numerous real-world scenarios:
        </p>
        <SEOList items={[
          "Probability: Calculating combinations in probability problems",
          "Statistics: Binomial distributions and hypothesis testing",
          "Computer Science: Algorithm analysis and combinatorics",
          "Genetics: Analyzing genetic combinations and inheritance",
          "Quality Control: Sampling and testing procedures",
          "Sports: Tournament brackets and team combinations",
          "Finance: Portfolio optimization and risk analysis",
          "Game Theory: Strategy analysis and decision making"
        ]} />
      </SEOSection>

      <SEOSection title="Common Binomial Coefficient Scenarios">
        <h3>Choosing Teams</h3>
        <p>
          If you need to form a team of k people from n candidates, C(n,k) gives you the number of possible teams.
        </p>
        
        <h3>Lottery and Gambling</h3>
        <p>
          In lottery games, C(n,k) represents the number of possible combinations you can choose.
        </p>
        
        <h3>Quality Control</h3>
        <p>
          When testing a sample of k items from a batch of n items, C(n,k) gives the number of possible samples.
        </p>
        
        <h3>Committee Formation</h3>
        <p>
          Forming committees of k members from n people gives C(n,k) possible combinations.
        </p>
      </SEOSection>

      <SEOSection title="Binomial Coefficients vs. Permutations">
        <p>
          It&apos;s important to understand the difference between combinations and permutations:
        </p>
        
        <h3>Combinations (Binomial Coefficients)</h3>
        <p>
          Order doesn&apos;t matter. C(n,k) counts the number of ways to choose k items from n items.
        </p>
        <p><strong>Example:</strong> Choosing 3 people from 5 for a committee: C(5,3) = 10</p>
        
        <h3>Permutations</h3>
        <p>
          Order matters. P(n,k) = n! / (n-k)! counts arrangements of k items from n items.
        </p>
        <p><strong>Example:</strong> Arranging 3 people from 5 in specific positions: P(5,3) = 60</p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center">P(n,k) = C(n,k) × k!</p>
        </div>
      </SEOSection>

      <SEOSection title="Advanced Binomial Coefficient Concepts">
        <h3>Binomial Theorem</h3>
        <p>
          Binomial coefficients appear in the expansion of (x + y)^n:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center">(x + y)^n = Σ C(n,k) × x^(n-k) × y^k</p>
        </div>
        
        <h3>Generating Functions</h3>
        <p>
          Binomial coefficients can be generated using the function (1 + x)^n, where the coefficient of x^k is C(n,k).
        </p>
        
        <h3>Recurrence Relations</h3>
        <p>
          Binomial coefficients satisfy the recurrence relation:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center">C(n,k) = C(n-1,k-1) + C(n-1,k)</p>
        </div>
      </SEOSection>

      <SEOSection title="Computational Considerations">
        <p>
          When working with large numbers, consider these computational aspects:
        </p>
        <SEOList items={[
          "Factorials grow very rapidly, so direct calculation may overflow",
          "Use the symmetry property C(n,k) = C(n,n-k) to reduce calculations",
          "For large n, consider using logarithms or approximation methods",
          "Many programming languages have built-in functions for binomial coefficients",
          "Pascal&apos;s Triangle can be used for efficient calculation of multiple coefficients"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between C(n,k) and P(n,k)?",
            answer: "C(n,k) counts combinations where order doesn&apos;t matter, while P(n,k) counts permutations where order matters. The relationship is P(n,k) = C(n,k) × k!."
          },
          {
            question: "Why is C(n,0) = 1?",
            answer: "There is exactly one way to choose nothing from a set - the empty set. This is a fundamental convention in combinatorics."
          },
          {
            question: "Can binomial coefficients be negative?",
            answer: "No, binomial coefficients are always non-negative integers. They represent counts of combinations, which cannot be negative."
          },
          {
            question: "What happens when k > n?",
            answer: "C(n,k) = 0 when k > n because you cannot choose more items than are available in the set."
          },
          {
            question: "How are binomial coefficients related to Pascal&apos;s Triangle?",
            answer: "Each entry in Pascal&apos;s Triangle is a binomial coefficient. The k-th entry in the n-th row is C(n,k)."
          },
          {
            question: "What is the largest possible value of C(n,k)?",
            answer: "For a given n, the largest binomial coefficient is C(n, n/2) when n is even, or C(n, (n-1)/2) = C(n, (n+1)/2) when n is odd."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering <strong>binomial coefficients</strong> is essential for solving counting problems and understanding mathematical relationships. Whether you&apos;re working with probability, statistics, or combinatorics, understanding the principles of binomial coefficients helps you approach problems with confidence and accuracy.
        </p>
        <p>
          Our Binomial Coefficient Calculator provides instant, accurate results for any combination problem, but the mathematical concepts behind it are equally important. By understanding both the calculator and the underlying principles, you&apos;ll be well-equipped to solve complex counting problems in any context.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('diamondProblem')} for algebraic problem-solving, or use our {createInternalLink('crossMultiplication')} for solving proportions.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
