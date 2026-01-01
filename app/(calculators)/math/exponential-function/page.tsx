import ExponentialFunctionCalculator from '../../../_components/calculators/ExponentialFunctionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ExponentialFunctionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Exponential Function Calculator - Calculate Growth, Decay & Compound Interest"
      description="Calculate exponential functions, growth, decay, and compound interest with our free exponential function calculator. Get instant results for exponential equations, exponential growth and decay, and financial calculations."
      calculator={<ExponentialFunctionCalculator />}
      slug="math/exponential-function"
      category="Algebra"
      features={[
        "Calculate basic exponential functions",
        "Exponential growth and decay calculations",
        "Compound interest calculations",
        "Step-by-step solutions",
        "Multiple function types",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Exponential Functions: The Power of Growth">
        <p>
          Exponential functions are among the most powerful and widely-used mathematical concepts, appearing everywhere from population growth to financial investments, radioactive decay to computer algorithms. Our <strong>Exponential Function Calculator</strong> makes it easy to calculate exponential functions, growth, decay, and compound interest with instant results.
        </p>
        <p>
          An exponential function has the form <strong>f(x) = a^x</strong>, where &apos;a&apos; is a positive constant called the base, and &apos;x&apos; is the exponent. These functions grow (or decay) at rates proportional to their current value, making them essential for modeling real-world phenomena that change exponentially over time.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Exponential Function Calculator">
        <p>
          Our <strong>exponential function calculator</strong> supports multiple types of exponential calculations:
        </p>
        <ol>
          <li><strong>Select Function Type:</strong> Choose from basic exponential, growth, decay, or compound interest</li>
          <li><strong>Enter Values:</strong> Input the required parameters based on your selected function type</li>
          <li><strong>Calculate:</strong> Click calculate to get instant results with step-by-step solutions</li>
        </ol>
        <p>
          The calculator automatically adjusts input labels and formulas based on your selection, making it easy to work with different exponential scenarios.
        </p>
      </SEOSection>

      <SEOSection title="Types of Exponential Functions">
        <h3>1. Basic Exponential Function</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">f(x) = a^x</p>
          <p className="text-gray-600">Where a is the base and x is the exponent</p>
        </div>
        <p><strong>Example:</strong> 2^3 = 8, 10^2 = 100, e^1 = 2.718...</p>

        <h3>2. Exponential Growth</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">A = P(1 + r)^t</p>
          <p className="text-gray-600">Where P is initial value, r is growth rate, t is time</p>
        </div>
        <p><strong>Example:</strong> Population growth, investment returns, bacterial growth</p>

        <h3>3. Exponential Decay</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">A = P(1 - r)^t</p>
          <p className="text-gray-600">Where P is initial value, r is decay rate, t is time</p>
        </div>
        <p><strong>Example:</strong> Radioactive decay, drug elimination, depreciation</p>

        <h3>4. Compound Interest</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">A = P(1 + r/n)^(nt)</p>
          <p className="text-gray-600">Where P is principal, r is rate, n is compounding frequency, t is time</p>
        </div>
        <p><strong>Example:</strong> Bank savings, investment accounts, loans</p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>Exponential functions are used in countless real-world scenarios:</p>
        <SEOList items={[
          "Finance: Compound interest, investment growth, loan calculations",
          "Biology: Population growth, bacterial reproduction, drug metabolism",
          "Physics: Radioactive decay, cooling processes, electrical circuits",
          "Economics: Inflation, economic growth, market trends",
          "Computer Science: Algorithm complexity, data growth, network effects",
          "Medicine: Drug dosage, disease spread, treatment effectiveness"
        ]} />
      </SEOSection>

      <SEOSection title="Key Properties of Exponential Functions">
        <h3>Mathematical Properties</h3>
        <ul>
          <li><strong>Domain:</strong> All real numbers (-∞, ∞)</li>
          <li><strong>Range:</strong> Positive real numbers (0, ∞) for a &gt; 0</li>
          <li><strong>Asymptote:</strong> y = 0 (horizontal asymptote)</li>
          <li><strong>Growth Rate:</strong> Proportional to current value</li>
        </ul>

        <h3>Special Cases</h3>
        <ul>
          <li><strong>e^x:</strong> Natural exponential function (base e ≈ 2.718)</li>
          <li><strong>2^x:</strong> Binary exponential (common in computer science)</li>
          <li><strong>10^x:</strong> Decimal exponential (scientific notation)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Exponential Values">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Powers of 2</h4>
            <ul className="text-sm space-y-1">
              <li>2^0 = 1</li>
              <li>2^1 = 2</li>
              <li>2^2 = 4</li>
              <li>2^3 = 8</li>
              <li>2^4 = 16</li>
              <li>2^5 = 32</li>
              <li>2^10 = 1,024</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Powers of 10</h4>
            <ul className="text-sm space-y-1">
              <li>10^0 = 1</li>
              <li>10^1 = 10</li>
              <li>10^2 = 100</li>
              <li>10^3 = 1,000</li>
              <li>10^6 = 1,000,000</li>
              <li>10^9 = 1,000,000,000</li>
            </ul>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Exponential vs. Linear Functions">
        <p>Understanding the difference between exponential and linear growth is crucial:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Linear Growth</h4>
            <p className="text-sm text-blue-700">f(x) = mx + b</p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Constant rate of change</li>
              <li>• Straight line graph</li>
              <li>• Additive growth</li>
              <li>• Example: $100 saved per month</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Exponential Growth</h4>
            <p className="text-sm text-green-700">f(x) = a^x</p>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li>• Proportional rate of change</li>
              <li>• Curved graph</li>
              <li>• Multiplicative growth</li>
              <li>• Example: 5% interest per year</li>
            </ul>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between exponential growth and decay?",
            answer: "Exponential growth increases over time (base > 1), while exponential decay decreases over time (0 < base < 1). Growth models population increase, while decay models radioactive decay or drug elimination."
          },
          {
            question: "How do I calculate compound interest?",
            answer: "Use the formula A = P(1 + r/n)^(nt), where P is principal, r is annual interest rate, n is compounding frequency per year, and t is time in years. Our calculator simplifies this calculation."
          },
          {
            question: "What is the natural exponential function?",
            answer: "The natural exponential function is e^x, where e ≈ 2.718281828. It&apos;s special because its derivative is itself, making it fundamental in calculus and many natural processes."
          },
          {
            question: "How do exponential functions relate to logarithms?",
            answer: "Exponential functions and logarithms are inverse operations. If y = a^x, then x = log_a(y). This relationship is crucial for solving exponential equations."
          },
          {
            question: "What are some real-world examples of exponential growth?",
            answer: "Examples include population growth, compound interest, bacterial reproduction, viral spread, and technology adoption. These processes grow proportionally to their current size."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Exponential functions are fundamental to understanding growth, decay, and many natural phenomena. Our <strong>Exponential Function Calculator</strong> simplifies these calculations, making it easy to work with exponential equations in mathematics, finance, science, and everyday life. Whether you need to calculate exponential growth, exponential decay, or compound interest, our calculator provides accurate results instantly.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('slope')} for linear functions, or use our {createInternalLink('area')} for geometric calculations that often complement exponential modeling.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
