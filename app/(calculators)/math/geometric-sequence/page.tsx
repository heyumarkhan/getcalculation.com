import GeometricSequenceCalculator from '../../../_components/calculators/GeometricSequenceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GeometricSequencePage() {
  return (
    <CalculatorPageTemplate
      title="Geometric Sequence Calculator: Nth Term & Sum - Free Online Tool"
      description="Calculate the nth term and sum of a geometric sequence. Find any term using the common ratio with step-by-step solutions and sequence visualization."
      calculator={<GeometricSequenceCalculator />}
      slug="math/geometric-sequence"
      category="Algebra"
      features={[
        "Calculate nth term of geometric sequence",
        "Calculate sum of first n terms",
        "Step-by-step calculations",
        "Sequence visualization",
        "Multiple calculation modes",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Geometric Sequences: The Foundation of Mathematical Patterns">
        <p>
          Geometric sequences are fundamental mathematical patterns that appear throughout mathematics, science, and real-world applications. Whether you&apos;re studying algebra, working with financial calculations, or analyzing growth patterns, understanding <strong>geometric sequences</strong> is essential for mathematical success. This comprehensive guide will walk you through everything you need to know about geometric sequences, from basic concepts to practical applications.
        </p>
        <p>
          At its core, a geometric sequence is a sequence where each term after the first is found by multiplying the previous term by a constant called the common ratio. Our Geometric Sequence Calculator at the top of this page makes these calculations instant and accurate, but understanding the underlying principles will help you solve complex mathematical problems and make informed decisions. We&apos;ll explore the mathematical concepts, provide practical examples, and clarify common points of confusion.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use Our Geometric Sequence Calculator">
        <p>
          Our Geometric Sequence Calculator is designed for simplicity and accuracy. Follow these steps to calculate sequence properties:
        </p>
        <ol>
          <li><strong>Enter First Term:</strong> Input the first term (a₁) of the sequence.</li>
          <li><strong>Enter Common Ratio:</strong> Input the common ratio (r) that multiplies each term.</li>
          <li><strong>Enter Term Number:</strong> Input which term number (n) you want to find.</li>
          <li><strong>Choose Calculation:</strong> Select whether to calculate the nth term, sum, or both.</li>
          <li><strong>Calculate:</strong> Click the &quot;Calculate Geometric Sequence&quot; button to get your results.</li>
        </ol>
        <p>
          The calculator includes built-in validation and provides detailed explanations of the relationships.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Geometric Sequence Formulas">
        <p>
          Geometric sequences follow specific mathematical formulas:
        </p>
        
        <h3>Nth Term Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">a_n = a₁ × r^(n-1)</p>
        </div>
        
        <p>Where:</p>
        <SEOList items={[
          "a_n = the nth term",
          "a₁ = the first term",
          "r = the common ratio",
          "n = the term number"
        ]} />
        
        <h3>Sum Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">S_n = a₁ × (1 - r^n) / (1 - r)</p>
        </div>
        
        <p>When r = 1, the sum formula becomes:</p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">S_n = a₁ × n</p>
        </div>
      </SEOSection>

      <SEOSection title="Key Properties of Geometric Sequences">
        <p>
          Geometric sequences have several important mathematical properties:
        </p>
        
        <h3>Common Ratio Behavior</h3>
        <SEOList items={[
          "If |r| > 1: Sequence diverges (grows without bound)",
          "If |r| < 1: Sequence converges to 0",
          "If r = 1: Sequence is constant",
          "If r = -1: Sequence alternates between two values"
        ]} />
        
        <h3>Sequence Types</h3>
        <SEOList items={[
          "Increasing: r > 1",
          "Decreasing: 0 < r < 1",
          "Alternating: r < 0",
          "Constant: r = 1"
        ]} />
        
        <h3>Sum Convergence</h3>
        <p>
          For an infinite geometric series with |r| < 1:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center">S_∞ = a₁ / (1 - r)</p>
        </div>
      </SEOSection>

      <SEOSection title="Practical Applications of Geometric Sequences">
        <p>
          Geometric sequences are used in numerous real-world scenarios:
        </p>
        <SEOList items={[
          "Finance: Compound interest calculations and investment growth",
          "Biology: Population growth and bacterial reproduction",
          "Physics: Radioactive decay and half-life calculations",
          "Computer Science: Algorithm analysis and recursive functions",
          "Economics: Inflation rates and economic growth models",
          "Medicine: Drug dosage calculations and pharmacokinetics",
          "Engineering: Signal processing and digital communications",
          "Statistics: Probability distributions and sampling"
        ]} />
      </SEOSection>

      <SEOSection title="Common Geometric Sequence Scenarios">
        <h3>Compound Interest</h3>
        <p>
          When money earns compound interest, the balance grows geometrically: Balance = Principal × (1 + rate)^time.
        </p>
        
        <h3>Population Growth</h3>
        <p>
          Populations often grow at a constant percentage rate, following geometric sequences.
        </p>
        
        <h3>Radioactive Decay</h3>
        <p>
          The amount of radioactive material decreases by a constant factor over time.
        </p>
        
        <h3>Fractal Geometry</h3>
        <p>
          Many fractals are generated using geometric sequences of scaling factors.
        </p>
      </SEOSection>

      <SEOSection title="Geometric vs. Arithmetic Sequences">
        <p>
          It&apos;s important to understand the difference between geometric and arithmetic sequences:
        </p>
        
        <h3>Geometric Sequence</h3>
        <SEOList items={[
          "Each term is multiplied by a constant (common ratio)",
          "Formula: a_n = a₁ × r^(n-1)",
          "Sum formula: S_n = a₁ × (1 - r^n) / (1 - r)",
          "Example: 2, 6, 18, 54, ... (r = 3)"
        ]} />
        
        <h3>Arithmetic Sequence</h3>
        <SEOList items={[
          "Each term is added to a constant (common difference)",
          "Formula: a_n = a₁ + (n-1) × d",
          "Sum formula: S_n = n × (a₁ + a_n) / 2",
          "Example: 2, 5, 8, 11, ... (d = 3)"
        ]} />
      </SEOSection>

      <SEOSection title="Advanced Geometric Sequence Concepts">
        <h3>Infinite Geometric Series</h3>
        <p>
          When |r| < 1, the infinite sum converges to a finite value.
        </p>
        
        <h3>Geometric Mean</h3>
        <p>
          The geometric mean of two terms in a geometric sequence is the term between them.
        </p>
        
        <h3>Logarithmic Properties</h3>
        <p>
          Taking the logarithm of a geometric sequence converts it to an arithmetic sequence.
        </p>
      </SEOSection>

      <SEOSection title="Computational Considerations">
        <p>
          When working with geometric sequences, consider these computational aspects:
        </p>
        <SEOList items={[
          "Large exponents can cause overflow - use logarithms for very large n",
          "Floating-point precision may affect calculations with very small ratios",
          "For |r| very close to 1, use alternative formulas to avoid division by zero",
          "Consider using exact arithmetic for rational ratios",
          "Be aware of convergence behavior for infinite series"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between a geometric sequence and a geometric series?",
            answer: "A geometric sequence is the ordered list of terms, while a geometric series is the sum of those terms. For example, 2, 6, 18, 54 is a sequence, while 2 + 6 + 18 + 54 = 80 is a series."
          },
          {
            question: "Can the common ratio be negative?",
            answer: "Yes, the common ratio can be negative. This creates an alternating sequence where terms alternate between positive and negative values."
          },
          {
            question: "What happens when the common ratio is 1?",
            answer: "When r = 1, all terms are equal to the first term, creating a constant sequence. The sum formula becomes S_n = a₁ × n."
          },
          {
            question: "How do you find the common ratio if you know two terms?",
            answer: "If you know a_n and a_m, then r = (a_n / a_m)^(1/(n-m)). For consecutive terms, r = a_(n+1) / a_n."
          },
          {
            question: "What is the sum of an infinite geometric series?",
            answer: "For |r| < 1, the infinite sum is S_∞ = a₁ / (1 - r). If |r| ≥ 1, the series diverges and has no finite sum."
          },
          {
            question: "Can a geometric sequence have a zero term?",
            answer: "If the first term is zero, all terms are zero. If a later term is zero and the common ratio is not zero, then the first term must be zero."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering <strong>geometric sequences</strong> is essential for solving algebraic problems and understanding mathematical patterns. Whether you&apos;re working with financial calculations, scientific modeling, or pure mathematics, understanding the principles of geometric sequences helps you approach problems with confidence and accuracy.
        </p>
        <p>
          Our Geometric Sequence Calculator provides instant, accurate results for any sequence problem, but the mathematical concepts behind it are equally important. By understanding both the calculator and the underlying principles, you&apos;ll be well-equipped to solve complex mathematical problems in any context.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('sumOfSeries')} for other types of series, or use our {createInternalLink('exponentialFunction')} for related exponential calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
