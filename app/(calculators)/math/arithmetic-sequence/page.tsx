import ArithmeticSequenceCalculator from '../../../_components/calculators/ArithmeticSequenceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula, SEOExample } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ArithmeticSequencePage() {
  return (
    <CalculatorPageTemplate
      title="Arithmetic Sequence Calculator - Nth Term & Sum - Free Online Tool"
      description="Calculate the nth term and sum of an arithmetic sequence. Find any term using the common difference with step-by-step solutions. Perfect for algebra homework and sequence calculations."
      calculator={<ArithmeticSequenceCalculator />}
      slug="math/arithmetic-sequence"
      category="Algebra"
      features={[
        "Calculate nth term of arithmetic sequence",
        "Calculate sum of first n terms",
        "Step-by-step calculations",
        "Sequence visualization",
        "Multiple calculation modes",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Arithmetic Sequences: The Foundation of Mathematical Patterns">
        <p>
          <strong>Arithmetic sequences</strong> are fundamental mathematical patterns that appear throughout mathematics, science, and real-world applications. Whether you&apos;re studying algebra, working with number patterns, or analyzing linear growth, understanding <strong>arithmetic sequences</strong> is essential for mathematical success. Our <strong>Arithmetic Sequence Calculator</strong> makes it easy to calculate the nth term and sum of arithmetic sequences with instant, accurate results.
        </p>
        <p>
          At its core, an arithmetic sequence (also called arithmetic progression) is a sequence where each term after the first is found by adding a constant value called the common difference to the previous term. This creates a linear pattern that makes arithmetic sequences easier to work with than many other sequence types.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Arithmetic Sequence Calculator">
        <p>
          Our <strong>arithmetic sequence calculator</strong> is designed for simplicity and accuracy. Follow these steps to calculate sequence properties:
        </p>
        <SEOList items={[
          "<strong>Enter First Term:</strong> Input the first term (a₁) of the sequence.",
          "<strong>Enter Common Difference:</strong> Input the common difference (d) that is added to each term.",
          "<strong>Enter Term Number:</strong> Input which term number (n) you want to find.",
          "<strong>Choose Calculation:</strong> Select whether to calculate the nth term, sum, or both.",
          "<strong>Calculate:</strong> Click the 'Calculate Arithmetic Sequence' button to get your results with step-by-step solutions."
        ]} ordered={true} />
        <p>
          The calculator includes built-in validation and provides detailed explanations of the relationships.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Arithmetic Sequence Formulas">
        <p>
          <strong>Arithmetic sequences</strong> follow specific mathematical formulas:
        </p>
        
        <h3>Nth Term Formula</h3>
        <SEOFormula
          formula="a_n = a₁ + (n-1) × d"
          description="Where a_n is the nth term, a₁ is the first term, d is the common difference, and n is the term number."
        />

        <SEOList items={[
          "a_n = the nth term",
          "a₁ = the first term",
          "d = the common difference",
          "n = the term number"
        ]} />
        
        <h3>Sum Formula</h3>
        <SEOFormula
          formula="S_n = n/2 × (a₁ + a_n)"
          description="The sum of the first n terms equals n/2 times the sum of the first and last terms."
        />

        <SEOFormula
          formula="S_n = n/2 × (2a₁ + (n-1)d)"
          description="Alternative form using the first term and common difference."
        />
      </SEOSection>

      <SEOSection title="Key Properties of Arithmetic Sequences">
        <p>
          <strong>Arithmetic sequences</strong> have several important mathematical properties:
        </p>
        
        <h3>Common Difference Behavior</h3>
        <SEOList items={[
          "If d > 0: Sequence is increasing",
          "If d < 0: Sequence is decreasing",
          "If d = 0: Sequence is constant (all terms are equal)",
          "The common difference is constant throughout the sequence"
        ]} />
        
        <h3>Linear Pattern</h3>
        <SEOList items={[
          "Arithmetic sequences form a linear pattern when graphed",
          "The graph of an arithmetic sequence is a straight line",
          "The common difference equals the slope of this line",
          "This linear relationship makes arithmetic sequences predictable"
        ]} />

        <h3>Term Relationships</h3>
        <SEOList items={[
          "Any term can be found directly using the nth term formula",
          "The middle term of an odd number of terms equals the average",
          "The sum can be calculated without listing all terms",
          "Each term differs from its neighbors by exactly d"
        ]} />
      </SEOSection>

      <SEOSection title="Example: Calculating Terms and Sum of an Arithmetic Sequence">
        <SEOExample
          title="Find the 10th term and sum of first 10 terms: a₁ = 3, d = 5"
          description="Calculate the 10th term and sum for an arithmetic sequence starting at 3 with common difference 5."
          calculation="a₁₀ = 3 + (10-1) × 5 = 3 + 45 = 48, S₁₀ = 10/2 × (3 + 48) = 5 × 51 = 255"
          result="10th term = 48, Sum of first 10 terms = 255"
        />

        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-gray-700 mb-2">Step-by-step calculation:</p>
          <div className="font-mono text-sm space-y-2">
            <div><strong>Step 1:</strong> Calculate 10th term using a_n = a₁ + (n-1) × d</div>
            <div><strong>Step 2:</strong> a₁₀ = 3 + (10-1) × 5 = 3 + 9 × 5 = 3 + 45 = 48</div>
            <div><strong>Step 3:</strong> Calculate sum using S_n = n/2 × (a₁ + a_n)</div>
            <div><strong>Step 4:</strong> S₁₀ = 10/2 × (3 + 48) = 5 × 51 = 255</div>
            <div><strong>Sequence:</strong> 3, 8, 13, 18, 23, 28, 33, 38, 43, 48, ...</div>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Real-World Applications of Arithmetic Sequences">
        <p>
          <strong>Arithmetic sequences</strong> are used extensively in practical applications:
        </p>
        <SEOList items={[
          "<strong>Finance:</strong> Calculating simple interest, loan payments with constant increments, and savings plans with regular deposits.",
          "<strong>Time and Scheduling:</strong> Planning events at regular intervals, calculating time patterns, and scheduling recurring tasks.",
          "<strong>Distance and Speed:</strong> Calculating distances traveled at constant speeds, time intervals, and position changes.",
          "<strong>Counting and Inventory:</strong> Tracking items that increase or decrease by a constant amount, inventory management, and counting sequences.",
          "<strong>Construction and Design:</strong> Calculating measurements that change by constant amounts, spacing patterns, and dimension sequences.",
          "<strong>Sports and Games:</strong> Scoring systems with constant point increments, game rules with regular patterns, and competition schedules.",
          "<strong>Temperature and Measurements:</strong> Converting between measurement units with constant differences, temperature changes, and scale conversions.",
          "<strong>Programming:</strong> Creating loops with constant increments, array indexing patterns, and algorithmic sequences."
        ]} />
      </SEOSection>

      <SEOSection title="Arithmetic Sequence vs. Geometric Sequence">
        <p>
          Understanding the difference helps you choose the right sequence type:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Arithmetic Sequence</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Add constant difference (d)</li>
              <li>• Formula: a_n = a₁ + (n-1)d</li>
              <li>• Linear pattern</li>
              <li>• Constant rate of change</li>
              <li>• Example: 2, 5, 8, 11, 14, ... (d = 3)</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Geometric Sequence</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Multiply by constant ratio (r)</li>
              <li>• Formula: a_n = a₁ × r^(n-1)</li>
              <li>• Exponential pattern</li>
              <li>• Proportional rate of change</li>
              <li>• Example: 2, 6, 18, 54, 162, ... (r = 3)</li>
            </ul>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Common Arithmetic Sequence Patterns">
        <h3>Examples of Common Sequences</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded border">
            <p className="font-semibold text-gray-700 mb-1">Even Numbers:</p>
            <p className="font-mono text-sm">2, 4, 6, 8, 10, ... (a₁ = 2, d = 2)</p>
          </div>
          <div className="bg-gray-50 p-3 rounded border">
            <p className="font-semibold text-gray-700 mb-1">Odd Numbers:</p>
            <p className="font-mono text-sm">1, 3, 5, 7, 9, ... (a₁ = 1, d = 2)</p>
          </div>
          <div className="bg-gray-50 p-3 rounded border">
            <p className="font-semibold text-gray-700 mb-1">Multiples of 5:</p>
            <p className="font-mono text-sm">5, 10, 15, 20, 25, ... (a₁ = 5, d = 5)</p>
          </div>
          <div className="bg-gray-50 p-3 rounded border">
            <p className="font-semibold text-gray-700 mb-1">Counting by 10:</p>
            <p className="font-mono text-sm">10, 20, 30, 40, 50, ... (a₁ = 10, d = 10)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between arithmetic and geometric sequences?",
            answer: "Arithmetic sequences add a constant difference (d) to each term, while geometric sequences multiply by a constant ratio (r). Arithmetic sequences are linear, geometric sequences are exponential."
          },
          {
            question: "Can the common difference be negative?",
            answer: "Yes, a negative common difference creates a decreasing arithmetic sequence. For example, 10, 7, 4, 1, -2, ... has d = -3."
          },
          {
            question: "How do I find the common difference if I know two terms?",
            answer: "Subtract the earlier term from the later term, then divide by the number of steps between them. If you know a₃ = 10 and a₇ = 22, then d = (22 - 10) / (7 - 3) = 12 / 4 = 3."
          },
          {
            question: "What is the formula for the sum of an arithmetic sequence?",
            answer: "S_n = n/2 × (a₁ + a_n) or S_n = n/2 × (2a₁ + (n-1)d). Both formulas give the same result - the first uses the last term, the second uses the first term and common difference."
          },
          {
            question: "Can an arithmetic sequence have a common difference of zero?",
            answer: "Yes, when d = 0, all terms are equal. For example, 5, 5, 5, 5, ... is an arithmetic sequence with d = 0."
          },
          {
            question: "How are arithmetic sequences used in real life?",
            answer: "Common applications include calculating savings with regular deposits, planning schedules with constant intervals, tracking inventory changes, and modeling linear growth patterns in various fields."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering <strong>arithmetic sequences</strong> is essential for understanding linear patterns, solving algebra problems, and working with mathematical sequences. Our <strong>Arithmetic Sequence Calculator</strong> simplifies these calculations, providing instant results for finding any term and calculating sums with detailed step-by-step explanations. Whether you're studying algebra, working with number patterns, or solving real-world problems involving linear growth, understanding arithmetic sequences will help you solve problems efficiently and accurately.
        </p>
        <p>
          For related tools, check out our {createInternalLink('geometric-sequence')} for exponential sequences, our {createInternalLink('sum-of-series')} for other series types, or our {createInternalLink('average')} for calculating averages that often relate to arithmetic sequences.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

