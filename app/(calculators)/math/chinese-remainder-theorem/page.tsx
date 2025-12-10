import ChineseRemainderTheoremCalculator from '../../../_components/calculators/ChineseRemainderTheoremCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ChineseRemainderTheoremPage() {
  return (
    <CalculatorPageTemplate
      title="Chinese Remainder Theorem Calculator: Solve Simultaneous Congruences - Free Online Tool"
      description="Solve systems of simultaneous congruences instantly with our free Chinese Remainder Theorem Calculator. Learn CRT algorithm, modular arithmetic, and get step-by-step solutions for congruence systems."
      calculator={<ChineseRemainderTheoremCalculator />}
      slug="math/chinese-remainder-theorem"
      category="Algebra"
      features={[
        "Solve systems of simultaneous congruences",
        "Step-by-step solution algorithm",
        "Pairwise coprimality checking",
        "Handle multiple congruences",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding the Chinese Remainder Theorem: Solving Simultaneous Congruences">
        <p>
          The <strong>Chinese Remainder Theorem (CRT)</strong> is a fundamental result in number theory and modular arithmetic that provides a method for solving systems of simultaneous congruences. Named after ancient Chinese mathematicians who first documented this concept, CRT is essential for cryptography, computer science, and advanced mathematical problem-solving. This comprehensive guide will walk you through everything you need to know about the <strong>Chinese Remainder Theorem</strong>, from basic concepts to practical applications.
        </p>
        <p>
          At its core, the Chinese Remainder Theorem states that if you have a system of congruences with pairwise coprime moduli, there exists a unique solution modulo the product of all moduli. Our Chinese Remainder Theorem Calculator at the top of this page makes these calculations instant and accurate, but understanding the underlying principles will help you solve problems even when you don&apos;t have a calculator handy. We&apos;ll explore the mathematical concepts, provide practical examples, and clarify common points of confusion.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use Our Chinese Remainder Theorem Calculator">
        <p>
          Our Chinese Remainder Theorem Calculator is designed for simplicity and accuracy. Follow these steps to solve your system of congruences:
        </p>
        <ol>
          <li><strong>Enter Congruences:</strong> Input at least two congruences in the form x ≡ a (mod m), where a is the remainder and m is the modulus.</li>
          <li><strong>Add More Congruences:</strong> Click &quot;Add Congruence&quot; if you need to solve a system with more than two congruences.</li>
          <li><strong>Calculate:</strong> Click the &quot;Calculate Solution&quot; button to get your results.</li>
          <li><strong>Review Results:</strong> The calculator will display the unique solution modulo the product of all moduli, along with step-by-step calculations.</li>
        </ol>
        <p>
          The calculator automatically checks that all moduli are pairwise coprime (a requirement for CRT to work) and provides detailed step-by-step solutions using the extended Euclidean algorithm.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Chinese Remainder Theorem">
        <p>
          The Chinese Remainder Theorem provides a solution method for systems of simultaneous linear congruences. Before diving into the theorem itself, let&apos;s clarify the key concepts:
        </p>
        <SEOList items={[
          "Congruence: A relation expressing that two numbers have the same remainder when divided by a modulus (written as a ≡ b (mod m))",
          "Modulus: The number by which we divide to find the remainder (denoted as m)",
          "Pairwise Coprime: Two or more numbers are pairwise coprime if every pair of numbers has a greatest common divisor of 1",
          "System of Congruences: Multiple congruences that must all be satisfied simultaneously",
          "Unique Solution: Under CRT conditions, there is exactly one solution modulo the product of all moduli"
        ]} />
        
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">x ≡ a₁ (mod m₁)</p>
          <p className="font-mono text-lg font-bold">x ≡ a₂ (mod m₂)</p>
          <p className="font-mono text-lg font-bold">x ≡ a₃ (mod m₃)</p>
          <p className="text-sm text-gray-600 mt-2">where gcd(mᵢ, mⱼ) = 1 for all i ≠ j</p>
        </div>
      </SEOSection>

      <SEOSection title="The Chinese Remainder Theorem Statement">
        <p>
          The Chinese Remainder Theorem states:
        </p>
        <div className="bg-blue-50 p-4 rounded-lg my-4 border-l-4 border-blue-500">
          <p className="font-semibold text-blue-900 mb-2">Theorem:</p>
          <p className="text-blue-800">
            Let m₁, m₂, ..., mₖ be pairwise coprime positive integers (i.e., gcd(mᵢ, mⱼ) = 1 for all i ≠ j). 
            Then for any integers a₁, a₂, ..., aₖ, the system of congruences:
          </p>
          <div className="font-mono text-center my-2">
            <p>x ≡ a₁ (mod m₁)</p>
            <p>x ≡ a₂ (mod m₂)</p>
            <p>...</p>
            <p>x ≡ aₖ (mod mₖ)</p>
          </div>
          <p className="text-blue-800">
            has a unique solution modulo M = m₁ × m₂ × ... × mₖ.
          </p>
        </div>
        
        <h3>Key Requirements</h3>
        <SEOList items={[
          "All moduli must be positive integers",
          "All moduli must be pairwise coprime (gcd(mᵢ, mⱼ) = 1 for i ≠ j)",
          "The solution is unique modulo the product of all moduli",
          "If moduli are not pairwise coprime, the system may have no solution or multiple solutions"
        ]} />
      </SEOSection>

      <SEOSection title="Step-by-Step CRT Algorithm">
        <p>
          The Chinese Remainder Theorem algorithm solves systems of congruences through the following steps:
        </p>
        
        <h3>Example: Solve the system</h3>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center">x ≡ 2 (mod 3)</p>
          <p className="font-mono text-center">x ≡ 3 (mod 5)</p>
          <p className="font-mono text-center">x ≡ 2 (mod 7)</p>
        </div>
        
        <ol>
          <li><strong>Step 1: Verify Pairwise Coprimality</strong>
            <ul className="ml-4 mt-2">
              <li>gcd(3, 5) = 1 ✓</li>
              <li>gcd(3, 7) = 1 ✓</li>
              <li>gcd(5, 7) = 1 ✓</li>
            </ul>
            <p className="mt-2">All moduli are pairwise coprime, so CRT applies.</p>
          </li>
          
          <li><strong>Step 2: Calculate M (Product of All Moduli)</strong>
            <p className="ml-4 mt-2">M = 3 × 5 × 7 = 105</p>
          </li>
          
          <li><strong>Step 3: For Each Congruence, Calculate Mᵢ and yᵢ</strong>
            <ul className="ml-4 mt-2">
              <li>M₁ = M / m₁ = 105 / 3 = 35, y₁ = 35⁻¹ mod 3 = 2</li>
              <li>M₂ = M / m₂ = 105 / 5 = 21, y₂ = 21⁻¹ mod 5 = 1</li>
              <li>M₃ = M / m₃ = 105 / 7 = 15, y₃ = 15⁻¹ mod 7 = 1</li>
            </ul>
          </li>
          
          <li><strong>Step 4: Calculate the Solution</strong>
            <p className="ml-4 mt-2">x = a₁M₁y₁ + a₂M₂y₂ + a₃M₃y₃ (mod M)</p>
            <p className="ml-4">x = 2×35×2 + 3×21×1 + 2×15×1 (mod 105)</p>
            <p className="ml-4">x = 140 + 63 + 30 (mod 105)</p>
            <p className="ml-4">x = 233 (mod 105) = 23</p>
          </li>
          
          <li><strong>Step 5: Verify the Solution</strong>
            <ul className="ml-4 mt-2">
              <li>23 mod 3 = 2 ✓</li>
              <li>23 mod 5 = 3 ✓</li>
              <li>23 mod 7 = 2 ✓</li>
            </ul>
          </li>
        </ol>
      </SEOSection>

      <SEOSection title="Practical Applications of the Chinese Remainder Theorem">
        <p>
          The Chinese Remainder Theorem has numerous practical applications across mathematics, computer science, and engineering:
        </p>
        <SEOList items={[
          "Cryptography: RSA encryption, secret sharing schemes, and digital signatures rely on CRT for efficient computations",
          "Computer Science: Error detection and correction codes, hash functions, and distributed systems use CRT principles",
          "Number Theory: Solving Diophantine equations, finding large prime numbers, and mathematical proofs",
          "Engineering: Signal processing, error correction in communication systems, and parallel computation",
          "Mathematics: Solving systems of equations, finding solutions to polynomial congruences, and abstract algebra",
          "Computer Architecture: Optimizing modular arithmetic operations and parallel processing",
          "Cryptanalysis: Breaking certain cryptographic systems and analyzing security protocols"
        ]} />
      </SEOSection>

      <SEOSection title="Common CRT Scenarios and Examples">
        <h3>Example 1: Simple Two-Congruence System</h3>
        <p>Solve: x ≡ 1 (mod 3) and x ≡ 2 (mod 5)</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono">M = 3 × 5 = 15</p>
          <p className="font-mono">M₁ = 15/3 = 5, y₁ = 5⁻¹ mod 3 = 2</p>
          <p className="font-mono">M₂ = 15/5 = 3, y₂ = 3⁻¹ mod 5 = 2</p>
          <p className="font-mono">x = 1×5×2 + 2×3×2 = 10 + 12 = 22 ≡ 7 (mod 15)</p>
          <p className="text-sm text-gray-600 mt-2">Verification: 7 mod 3 = 1 ✓, 7 mod 5 = 2 ✓</p>
        </div>
        
        <h3>Example 2: Three-Congruence System</h3>
        <p>Solve: x ≡ 1 (mod 2), x ≡ 2 (mod 3), x ≡ 3 (mod 5)</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono">M = 2 × 3 × 5 = 30</p>
          <p className="font-mono">Solution: x ≡ 23 (mod 30)</p>
          <p className="text-sm text-gray-600 mt-2">All integers of the form 23 + 30k satisfy the system.</p>
        </div>
        
        <h3>When CRT Doesn&apos;t Apply</h3>
        <p>
          If moduli are not pairwise coprime, the system may have no solution or multiple solutions. For example:
        </p>
        <div className="bg-red-50 p-4 rounded-lg mb-4 border-l-4 border-red-500">
          <p className="font-mono">x ≡ 1 (mod 4)</p>
          <p className="font-mono">x ≡ 3 (mod 6)</p>
          <p className="text-red-700 mt-2">gcd(4, 6) = 2 ≠ 1, so CRT doesn&apos;t directly apply. This system has no solution.</p>
        </div>
      </SEOSection>

      <SEOSection title="Extended Euclidean Algorithm in CRT">
        <p>
          The Chinese Remainder Theorem relies on the <strong>Extended Euclidean Algorithm</strong> to find modular inverses. This algorithm not only finds the greatest common divisor of two numbers but also finds coefficients that express the GCD as a linear combination:
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg my-4">
          <p className="font-semibold mb-2">Extended Euclidean Algorithm:</p>
          <p>For integers a and b, it finds x and y such that:</p>
          <p className="font-mono text-center my-2">ax + by = gcd(a, b)</p>
          <p className="text-sm mt-2">When gcd(a, b) = 1, we have ax + by = 1, which means x is the modular inverse of a modulo b.</p>
        </div>
        
        <p>
          Our calculator uses this algorithm internally to compute the modular inverses needed for the CRT solution. Understanding this connection helps explain why pairwise coprimality is essential for CRT to work.
        </p>
      </SEOSection>

      <SEOSection title="Chinese Remainder Theorem vs. Other Methods">
        <p>
          It&apos;s important to distinguish between CRT and other mathematical concepts:
        </p>
        <ul>
          <li><strong>Chinese Remainder Theorem:</strong> Solves systems of simultaneous congruences with pairwise coprime moduli</li>
          <li><strong>Linear System of Equations:</strong> Solves systems of linear equations using methods like Gaussian elimination</li>
          <li><strong>Modular Inverse:</strong> Finds the inverse of a number modulo another (used as a building block in CRT)</li>
          <li><strong>Euclidean Algorithm:</strong> Finds the greatest common divisor of two numbers (foundation for extended Euclidean algorithm)</li>
        </ul>
        <p>
          While these concepts are related, CRT specifically addresses the unique problem of solving congruence systems efficiently.
        </p>
      </SEOSection>

      <SEOSection title="Advanced CRT Concepts">
        <h3>Generalized Chinese Remainder Theorem</h3>
        <p>
          When moduli are not pairwise coprime, the system can still be solved by:
        </p>
        <SEOList items={[
          "Factoring moduli into prime powers",
          "Solving the system for each prime power",
          "Combining solutions using CRT on the prime powers",
          "This approach works even when original moduli share common factors"
        ]} />
        
        <h3>CRT in Polynomial Rings</h3>
        <p>
          The Chinese Remainder Theorem extends to polynomial rings, which has applications in:
        </p>
        <SEOList items={[
          "Polynomial interpolation",
          "Error-correcting codes (Reed-Solomon codes)",
          "Fast polynomial multiplication",
          "Computational algebra"
        ]} />
        
        <h3>Computational Complexity</h3>
        <p>
          The CRT algorithm has polynomial time complexity, making it efficient for large numbers. This efficiency is crucial in cryptographic applications where computations involve very large integers.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the Chinese Remainder Theorem?",
            answer: "The Chinese Remainder Theorem is a mathematical theorem that provides a method for solving systems of simultaneous congruences. It states that if you have a system of congruences with pairwise coprime moduli, there exists a unique solution modulo the product of all moduli."
          },
          {
            question: "Why do the moduli need to be pairwise coprime?",
            answer: "Pairwise coprimality ensures that the system has a unique solution. If moduli share common factors, the system may have no solution or multiple solutions. The pairwise coprime condition guarantees that the solution exists and is unique modulo the product of all moduli."
          },
          {
            question: "Can I use CRT with more than two congruences?",
            answer: "Yes, the Chinese Remainder Theorem works with any number of congruences, as long as all moduli are pairwise coprime. Our calculator supports adding multiple congruences to solve complex systems."
          },
          {
            question: "What happens if the moduli are not pairwise coprime?",
            answer: "If moduli are not pairwise coprime, the system may have no solution or multiple solutions. The standard CRT algorithm requires pairwise coprimality. However, the system can sometimes be solved by factoring the moduli and using a generalized approach."
          },
          {
            question: "How is CRT used in cryptography?",
            answer: "CRT is used in RSA encryption to speed up decryption operations. Instead of computing large exponentiations directly, CRT allows breaking the computation into smaller parts modulo the prime factors, then combining the results. This significantly improves computational efficiency."
          },
          {
            question: "What is the relationship between CRT and modular inverses?",
            answer: "CRT uses modular inverses as a key component. For each congruence, the algorithm requires finding the modular inverse of Mᵢ modulo mᵢ, where Mᵢ is the product of all other moduli. The extended Euclidean algorithm is used to compute these inverses."
          },
          {
            question: "Can CRT solve systems with negative remainders?",
            answer: "Yes, our calculator handles negative remainders by normalizing them to the range [0, m-1] using the modulo operation. For example, x ≡ -1 (mod 5) is equivalent to x ≡ 4 (mod 5)."
          },
          {
            question: "What is the computational complexity of CRT?",
            answer: "The CRT algorithm has polynomial time complexity O(k² log M), where k is the number of congruences and M is the product of all moduli. This makes it efficient even for large numbers, which is why it's widely used in cryptographic applications."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering the <strong>Chinese Remainder Theorem</strong> is essential for advanced mathematics, cryptography, and computer science applications. Whether you&apos;re working with simple two-congruence systems or complex multi-congruence problems, understanding CRT principles helps you approach modular arithmetic problems with confidence and accuracy.
        </p>
        <p>
          Our Chinese Remainder Theorem Calculator provides instant, accurate results for any system of simultaneous congruences, but the mathematical concepts behind it are equally important. By understanding both the calculator and the underlying principles of modular arithmetic and the extended Euclidean algorithm, you&apos;ll be well-equipped to handle congruence systems in any context, from basic number theory to advanced cryptographic applications.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('inverseModulo')} for finding modular inverses, or use our {createInternalLink('remainder')} for basic remainder calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

