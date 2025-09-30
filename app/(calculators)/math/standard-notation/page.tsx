import StandardNotationCalculator from '../../../_components/calculators/StandardNotationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function StandardNotationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Standard Notation Calculator: Convert Scientific Notation & Expanded Form"
      description="Convert between scientific notation, standard form, and expanded form with our free calculator. Get instant results for number format conversions and mathematical notation."
      calculator={<StandardNotationCalculator />}
      slug="math/standard-notation"
      category="Algebra"
      features={[
        "Convert scientific notation to standard form",
        "Convert standard numbers to scientific notation",
        "Generate expanded form of numbers",
        "Step-by-step conversion process",
        "Multiple input formats supported",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Standard Notation: Number Formats and Conversions">
        <p>
          Standard notation, scientific notation, and expanded form are different ways to represent numbers, each with specific advantages for different mathematical and scientific applications. Our Standard Notation Calculator makes it easy to convert between these formats with instant results.
        </p>
        <p>
          Understanding these number representations is essential for working with very large or very small numbers, scientific calculations, and mathematical problem-solving. Each format serves different purposes and is used in various fields from physics and chemistry to engineering and finance.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Standard Notation Calculator">
        <p>
          Our calculator supports three types of conversions:
        </p>
        <ol>
          <li><strong>Scientific to Standard:</strong> Convert scientific notation to regular decimal numbers</li>
          <li><strong>Standard to Scientific:</strong> Convert decimal numbers to scientific notation</li>
          <li><strong>Expanded Form:</strong> Break down numbers into sum of powers of 10</li>
        </ol>
        <p>
          Simply select your conversion type, enter the number in the appropriate format, and click convert to get instant results with step-by-step explanations.
        </p>
      </SEOSection>

      <SEOSection title="Types of Number Notation">
        <h3>1. Standard Notation (Decimal Form)</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">2,500,000</p>
          <p className="text-gray-600">Regular decimal representation of numbers</p>
        </div>
        <p><strong>Examples:</strong> 123, 45.67, 0.000123, 1,000,000</p>

        <h3>2. Scientific Notation</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">2.5 × 10^6</p>
          <p className="text-gray-600">Numbers expressed as a × 10^n where 1 ≤ |a| &lt; 10</p>
        </div>
        <p><strong>Examples:</strong> 2.5 × 10^3, 1.23 × 10^-4, 6.02 × 10^23</p>

        <h3>3. Expanded Form</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">2×10⁶ + 5×10⁵ + 0×10⁴ + 0×10³ + 0×10² + 0×10¹ + 0×10⁰</p>
          <p className="text-gray-600">Numbers expressed as sum of powers of 10</p>
        </div>
        <p><strong>Examples:</strong> 1234 = 1×10³ + 2×10² + 3×10¹ + 4×10⁰</p>
      </SEOSection>

      <SEOSection title="Scientific Notation Rules and Format">
        <h3>Basic Rules</h3>
        <ul>
          <li><strong>Base:</strong> Must be between 1 and 10 (excluding 10)</li>
          <li><strong>Exponent:</strong> Integer that indicates the power of 10</li>
          <li><strong>Format:</strong> a × 10^n where 1 ≤ |a| &lt; 10</li>
          <li><strong>Alternative:</strong> Can use &apos;e&apos; notation (e.g., 2.5e6)</li>
        </ul>

        <h3>Common Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Standard Format</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>2.5 × 10^6</li>
              <li>1.23 × 10^-4</li>
              <li>6.02 × 10^23</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">E-Notation</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>2.5e6</li>
              <li>1.23e-4</li>
              <li>6.02e23</li>
            </ul>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>Different number notations are used in various fields:</p>
        <SEOList items={[
          "Science: Expressing very large or small measurements (atoms, galaxies, molecules)",
          "Engineering: Technical specifications and calculations",
          "Finance: Large monetary values and interest calculations",
          "Medicine: Drug dosages and medical measurements",
          "Technology: Computer memory, data storage, and processing speeds",
          "Astronomy: Distances, masses, and time scales in the universe"
        ]} />
      </SEOSection>

      <SEOSection title="Conversion Examples">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Scientific to Standard</h4>
            <div className="text-sm space-y-1">
              <div>2.5 × 10^3 = 2,500</div>
              <div>1.23 × 10^-4 = 0.000123</div>
              <div>6.02 × 10^23 = 602,000,000,000,000,000,000,000</div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Standard to Scientific</h4>
            <div className="text-sm space-y-1">
              <div>2,500 = 2.5 × 10^3</div>
              <div>0.000123 = 1.23 × 10^-4</div>
              <div>602,000,000,000,000,000,000,000 = 6.02 × 10^23</div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Expanded Form</h4>
            <div className="text-sm space-y-1">
              <div>1234 = 1×10³ + 2×10² + 3×10¹ + 4×10⁰</div>
              <div>567.89 = 5×10² + 6×10¹ + 7×10⁰ + 8×10⁻¹ + 9×10⁻²</div>
            </div>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Advantages of Each Format">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Standard Notation</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Easy to read and understand</li>
              <li>• Familiar format for everyday use</li>
              <li>• Good for moderate-sized numbers</li>
              <li>• Can be cumbersome for very large/small numbers</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Scientific Notation</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Compact representation</li>
              <li>• Easy to compare orders of magnitude</li>
              <li>• Essential for scientific calculations</li>
              <li>• Shows significant digits clearly</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Expanded Form</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Shows place value structure</li>
              <li>• Educational for understanding numbers</li>
              <li>• Useful for arithmetic operations</li>
              <li>• Can be lengthy for large numbers</li>
            </ul>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between standard and scientific notation?",
            answer: "Standard notation is the regular decimal form (e.g., 2,500), while scientific notation expresses numbers as a × 10^n where 1 ≤ |a| < 10 (e.g., 2.5 × 10^3). Scientific notation is more compact for very large or small numbers."
          },
          {
            question: "How do I convert scientific notation to standard form?",
            answer: "Multiply the base by 10 raised to the exponent. For example, 2.5 × 10^3 = 2.5 × 1000 = 2,500. For negative exponents, divide by the appropriate power of 10."
          },
          {
            question: "What is expanded form and when is it used?",
            answer: "Expanded form breaks down numbers into the sum of powers of 10. For example, 1234 = 1×10³ + 2×10² + 3×10¹ + 4×10⁰. It&apos;s used to understand place value and for educational purposes."
          },
          {
            question: "Can I use different formats for scientific notation?",
            answer: "Yes, scientific notation can be written as &apos;2.5 × 10^3&apos; or &apos;2.5e3&apos;. Both formats are equivalent and widely accepted in scientific and engineering contexts."
          },
          {
            question: "Why is scientific notation important in science?",
            answer: "Scientific notation is essential for expressing very large numbers (like distances in space) and very small numbers (like atomic sizes) in a compact, manageable format. It also makes calculations easier and shows significant digits clearly."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding different number notations is fundamental to mathematics and science. Our Standard Notation Calculator simplifies conversions between scientific notation, standard form, and expanded form, making it easy to work with numbers in any format.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('slope')} for linear function analysis, or use our {createInternalLink('area')} for geometric calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
