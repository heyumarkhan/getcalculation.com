import InverseModuloCalculator from '../../../_components/calculators/InverseModuloCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function InverseModuloCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Inverse Modulo Calculator: Modular Multiplicative Inverse Tool"
      description="Calculate the modular multiplicative inverse of a number modulo n using the extended Euclidean algorithm. Free tool for cryptography, number theory, and discrete mathematics."
      calculator={<InverseModuloCalculator />}
      slug="math/inverse-modulo"
      category="Algebra"
      features={[
        "Calculate modular multiplicative inverse",
        "Extended Euclidean algorithm implementation",
        "Step-by-step calculation process",
        "Verification of results",
        "Error handling for invalid inputs",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Modular Multiplicative Inverse: Essential for Cryptography and Number Theory">
        <p>
          The modular multiplicative inverse is a fundamental concept in number theory and cryptography, essential for solving linear congruences and implementing cryptographic algorithms. Our Inverse Modulo Calculator uses the extended Euclidean algorithm to find the inverse efficiently and provides step-by-step solutions.
        </p>
        <p>
          Whether you&apos;re working on RSA encryption, solving linear congruences, or studying abstract algebra, understanding modular inverses is crucial. The calculator demonstrates the extended Euclidean algorithm, showing how to find both the greatest common divisor and the coefficients needed for the inverse calculation.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Inverse Modulo Calculator">
        <p>
          Our calculator implements the extended Euclidean algorithm to find modular inverses:
        </p>
        <ol>
          <li><strong>Enter the number (a):</strong> The number whose inverse you want to find</li>
          <li><strong>Enter the modulus (n):</strong> The modulus (must be positive)</li>
          <li><strong>Click Calculate:</strong> The calculator will find the inverse if it exists</li>
          <li><strong>View Steps:</strong> See the detailed extended Euclidean algorithm steps</li>
        </ol>
        <p>
          The calculator will show an error if no inverse exists (when gcd(a, n) ≠ 1).
        </p>
      </SEOSection>

      <SEOSection title="Mathematical Definition and Properties">
        <h3>Definition</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">(a × x) ≡ 1 (mod n)</p>
          <p className="text-gray-600">The modular inverse of a modulo n is a number x such that the product equals 1 modulo n</p>
        </div>

        <h3>Key Properties</h3>
        <ul>
          <li><strong>Existence:</strong> An inverse exists if and only if gcd(a, n) = 1</li>
          <li><strong>Uniqueness:</strong> If an inverse exists, it is unique modulo n</li>
          <li><strong>Range:</strong> The inverse is always in the range [0, n-1]</li>
          <li><strong>Symmetry:</strong> If x is the inverse of a modulo n, then a is the inverse of x modulo n</li>
        </ul>

        <h3>Extended Euclidean Algorithm</h3>
        <p>
          The extended Euclidean algorithm not only finds gcd(a, n) but also finds integers x and y such that:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg">ax + ny = gcd(a, n)</p>
        </div>
        <p>
          When gcd(a, n) = 1, the coefficient x is the modular inverse of a modulo n.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>Modular inverses are used in numerous fields:</p>
        <SEOList items={[
          "Cryptography: RSA encryption and decryption algorithms",
          "Number Theory: Solving linear congruences and Diophantine equations",
          "Computer Science: Hash functions, checksums, and error detection",
          "Mathematics: Group theory, abstract algebra, and discrete mathematics",
          "Engineering: Error correction codes and signal processing",
          "Finance: Cryptographic protocols for secure transactions",
          "Computer Graphics: Pseudorandom number generation",
          "Network Security: Digital signatures and key exchange protocols"
        ]} />
      </SEOSection>

      <SEOSection title="Algorithm Implementation">
        <h3>Extended Euclidean Algorithm Steps</h3>
        <ol>
          <li><strong>Initialize:</strong> Set r₀ = a, r₁ = n, s₀ = 1, s₁ = 0, t₀ = 0, t₁ = 1</li>
          <li><strong>Iterate:</strong> While rᵢ ≠ 0:
            <ul>
              <li>Calculate quotient q = ⌊rᵢ₋₁/rᵢ⌋</li>
              <li>Update rᵢ₊₁ = rᵢ₋₁ - q × rᵢ</li>
              <li>Update sᵢ₊₁ = sᵢ₋₁ - q × sᵢ</li>
              <li>Update tᵢ₊₁ = tᵢ₋₁ - q × tᵢ</li>
            </ul>
          </li>
          <li><strong>Result:</strong> gcd(a, n) = rᵢ₋₁, coefficients x = sᵢ₋₁, y = tᵢ₋₁</li>
        </ol>

        <h3>Complexity Analysis</h3>
        <ul>
          <li><strong>Time Complexity:</strong> O(log min(a, n)) - logarithmic time</li>
          <li><strong>Space Complexity:</strong> O(1) - constant space</li>
          <li><strong>Efficiency:</strong> Much faster than brute force methods</li>
        </ul>
      </SEOSection>

      <SEOSection title="Examples and Verification">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Example 1: 3⁻¹ mod 7</h4>
            <div className="text-sm space-y-1">
              <div>gcd(3, 7) = 1 ✓</div>
              <div>Extended GCD: 3 × 5 + 7 × (-2) = 1</div>
              <div>Inverse: 5</div>
              <div>Verification: 3 × 5 = 15 ≡ 1 (mod 7) ✓</div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Example 2: 5⁻¹ mod 11</h4>
            <div className="text-sm space-y-1">
              <div>gcd(5, 11) = 1 ✓</div>
              <div>Extended GCD: 5 × 9 + 11 × (-4) = 1</div>
              <div>Inverse: 9</div>
              <div>Verification: 5 × 9 = 45 ≡ 1 (mod 11) ✓</div>
            </div>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Common Use Cases">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Cryptography</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• RSA key generation</li>
              <li>• Digital signatures</li>
              <li>• Key exchange protocols</li>
              <li>• Hash functions</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Mathematics</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Solving linear congruences</li>
              <li>• Group theory applications</li>
              <li>• Abstract algebra</li>
              <li>• Number theory problems</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">Computer Science</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Error detection codes</li>
              <li>• Pseudorandom generators</li>
              <li>• Hash table implementations</li>
              <li>• Checksum algorithms</li>
            </ul>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "When does a modular inverse exist?",
            answer: "A modular inverse exists if and only if gcd(a, n) = 1. This means a and n must be coprime (relatively prime). If gcd(a, n) ≠ 1, then no inverse exists modulo n."
          },
          {
            question: "How does the extended Euclidean algorithm work?",
            answer: "The extended Euclidean algorithm finds not only gcd(a, n) but also integers x and y such that ax + ny = gcd(a, n). When gcd(a, n) = 1, the coefficient x is the modular inverse of a modulo n."
          },
          {
            question: "What is the time complexity of finding modular inverses?",
            answer: "The extended Euclidean algorithm runs in O(log min(a, n)) time, making it very efficient even for large numbers. This is much faster than brute force methods that would take O(n) time."
          },
          {
            question: "How do I verify that a number is the correct modular inverse?",
            answer: "To verify that x is the inverse of a modulo n, check that (a × x) mod n = 1. For example, if 5 is the inverse of 3 modulo 7, then 3 × 5 = 15, and 15 mod 7 = 1."
          },
          {
            question: "What are some practical applications of modular inverses?",
            answer: "Modular inverses are essential in RSA cryptography, solving linear congruences, implementing hash functions, error correction codes, and various algorithms in computer science and mathematics."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The modular multiplicative inverse is a powerful tool in number theory and cryptography, enabling efficient solutions to complex mathematical problems. Our Inverse Modulo Calculator demonstrates the extended Euclidean algorithm and provides step-by-step solutions for educational and practical purposes.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('slope')} for linear function analysis, or use our {createInternalLink('area')} for geometric calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
