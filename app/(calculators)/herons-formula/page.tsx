import HeronsFormulaCalculator from '../../_components/calculators/HeronsFormulaCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../_components/ui/SEOContent';

export default function HeronsFormulaPage() {
  return (
    <CalculatorPageTemplate
      title="Heron's Formula Calculator - Calculate Triangle Area from Side Lengths"
      description="Calculate the area of any triangle instantly using Heron's formula when you know all three side lengths. Perfect for geometry homework, engineering projects, and any task requiring triangle area calculations."
      calculator={<HeronsFormulaCalculator />}
      slug="herons-formula"
    >
      <SEOSection title="Calculate Triangle Area Without the Height">
        <p>
          Have you ever needed to find the area of a triangular piece of land, a sail, or a design pattern, but you only knew the lengths of its sides? The classic formula (Area = ½ × base × height) is great, but finding the height isn&apos;t always possible. This is where our <strong>Heron&apos;s Formula Calculator</strong> comes in. This powerful tool allows you to calculate the area of any triangle, regardless of its shape, using only the lengths of its three sides.
        </p>
        <p>
          This guide will not only show you how to use our calculator but also walk you through the elegant mathematics behind <strong>Heron&apos;s formula</strong>. You&apos;ll learn how to calculate the <strong>area of a triangle by Heron&apos;s formula</strong> manually, understand its applications, and discover why it has been an essential tool for mathematicians and engineers for centuries.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Heron's Formula Calculator">
        <p>Our calculator is designed for simplicity and accuracy. Follow these four easy steps:</p>
        <SEOList items={[
          "Enter Side 'a': Input the length of the first side of your triangle into the designated field.",
          "Enter Side 'b': Input the length of the second side.",
          "Enter Side 'c': Input the length of the third and final side.",
          "Click 'Calculate': The calculator will instantly process the inputs and provide you with the triangle's area."
        ]} ordered={true} />
        <p>
          Ensure all side lengths are in the same unit (e.g., meters, feet, inches) for an accurate result. The calculated area will be in the corresponding square units (e.g., square meters, square feet, square inches).
        </p>
      </SEOSection>

      <SEOSection title="Interpreting Your Results">
        <SEOList items={[
          "Area: This is the primary result. It represents the total two-dimensional space enclosed by the three sides of the triangle.",
          "Semi-Perimeter (s): This value is half the total perimeter of the triangle. While it's a step in the calculation, it's also a useful geometric property.",
          "Error Message: If the side lengths you entered cannot form a valid triangle (e.g., 3, 4, and 8), the calculator will display an error. This is based on a fundamental geometric rule called the Triangle Inequality Theorem, which we explain further down."
        ]} />
      </SEOSection>

      <SEOSection title="A Deep Dive into Heron's Formula">
        <p>
          <strong>Heron&apos;s formula</strong>, also known as Hero&apos;s formula, is a remarkable mathematical equation attributed to Heron of Alexandria, a Greek mathematician and engineer who lived around 60 AD. Its genius lies in its ability to calculate a triangle&apos;s area using only side lengths, bypassing the need for angles or height. The calculation is a two-step process:
        </p>
        <SEOFormula
          formula="s = (a + b + c) / 2"
          description="1. Calculate the Semi-Perimeter (s): The semi-perimeter is half the distance around the triangle. It's the foundation for the main formula."
        />
        <SEOFormula
          formula="Area = √[s(s-a)(s-b)(s-c)]"
          description="2. Calculate the Area (A): Once you have the semi-perimeter, you can plug it into Heron's main formula."
        />
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Variables Explained</h4>
        <SEOList items={[
          "A = The area of the triangle.",
          "s = The semi-perimeter of the triangle.",
          "a, b, and c = The lengths of the three sides of the triangle."
        ]} />
      </SEOSection>

      <SEOSection title="Step-by-Step Worked Example">
        <p>
          Let&apos;s see how to find the <strong>area of a triangle by Heron&apos;s formula</strong> manually. Imagine you have a triangular garden with the following side lengths:
        </p>
        <SEOList items={[
          "Side a: 7 meters",
          "Side b: 9 meters",
          "Side c: 12 meters"
        ]} />
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Step 1: Calculate the Semi-Perimeter (s)</h4>
            <p>
              First, we find the total perimeter by adding the sides, then divide by two.
            </p>
            <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">s = (7 + 9 + 12) / 2 = 28 / 2 = 14 meters</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Step 2: Apply Heron's Formula to Find the Area (A)</h4>
            <p>
              Now we plug the semi-perimeter (s=14) and the side lengths into the area formula:
            </p>
            <div className="space-y-2">
              <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">A = √[14(14-7)(14-9)(14-12)]</p>
              <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">A = √[14(7)(5)(2)]</p>
              <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">A = √[980]</p>
              <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">A ≈ 31.30 square meters</p>
            </div>
          </div>
        </div>
        <p>
          So, the area of the garden is approximately 31.30 square meters. Our <strong>Heron&apos;s formula calculator</strong> performs these exact steps in an instant.
        </p>
      </SEOSection>
      
      <SEOSection title="Why is Heron's Formula Important?">
        <p>
          The primary advantage of <strong>Heron&apos;s formula</strong> is its independence from the triangle&apos;s height or any of its internal angles. This makes it invaluable in many real-world scenarios:
        </p>
        <SEOList items={[
          "Land Surveying: Surveyors can measure the boundary lines of a triangular plot of land and calculate its area without needing to measure perpendicular heights, which can be difficult on uneven terrain.",
          "Construction and Architecture: When designing or building structures with triangular elements, like trusses or gables, engineers can quickly calculate surface areas for material estimation.",
          "Navigation and Astronomy: It can be used in trilateration to determine a location based on distances to known points.",
          "Physics: Calculating forces and stresses in triangular structures often requires knowing their surface area.",
          "Education: It's a fundamental concept in geometry and trigonometry, teaching students a powerful problem-solving method."
        ]} />
      </SEOSection>

      <SEOSection title="Limitations and Key Considerations: The Triangle Inequality Theorem">
        <p>
          While powerful, <strong>Heron&apos;s formula</strong> only works if the three side lengths can form a legitimate triangle. This is governed by the <strong>Triangle Inequality Theorem</strong>, which states:
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
          <p className="text-blue-800 font-medium">
            The sum of the lengths of any two sides of a triangle must be greater than the length of the third side.
          </p>
        </div>
        <p>For sides a, b, and c, all three of these conditions must be true:</p>
        <SEOList items={[
          "a + b > c",
          "a + c > b",
          "b + c > a"
        ]} />
        <p>
          If a condition fails (e.g., sides 3, 4, and 8), the lengths cannot form a triangle. Our calculator checks this automatically to prevent errors.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Who was Heron of Alexandria?",
            answer: "Heron of Alexandria was a brilliant Greek mathematician and engineer who lived in Roman Egypt around the 1st century AD. He was a prolific writer and inventor, and the formula for a triangle's area is one of his most famous contributions, documented in his book, Metrica."
          },
          {
            question: "Can Heron's formula be used for any type of triangle?",
            answer: "Yes. That is its main advantage. It works perfectly for all triangles, including scalene (all sides different), isosceles (two sides equal), equilateral (all sides equal), and right-angled triangles."
          },
          {
            question: "What is the semi-perimeter and why is it necessary?",
            answer: "The semi-perimeter is simply half the total perimeter of the triangle. It's not just an arbitrary value; using 's' dramatically simplifies the structure of the area formula, making it a compact and elegant expression."
          },
          {
            question: "Is there an alternative to Heron's formula for finding a triangle's area?",
            answer: "Yes, several. The most common is Area = ½ × base × height. If you know two sides and the angle between them, you can use the trigonometric formula Area = ½ab sin(C). However, Heron's formula is unique in that it requires only side lengths."
          },
          {
            question: "What happens mathematically if the side lengths don't form a triangle?",
            answer: "If the Triangle Inequality Theorem is violated, one of the (s-a), (s-b), or (s-c) terms will be negative. This results in trying to find the square root of a negative number, which has no real-number solution, perfectly reflecting the geometric impossibility."
          }
        ]} />
      </SEOSection>
      
      <SEOSection title="Conclusion">
        <p>
          The ability to calculate the <strong>area of a triangle by Heron&apos;s formula</strong> is a timeless piece of mathematical knowledge, and our <strong>Heron&apos;s Formula Calculator</strong> makes this process effortless. Whether you&apos;re a student working on a geometry problem, a homeowner planning a project, or a professional in need of a quick and reliable area calculation, this tool provides an instant and accurate answer. By requiring only the three side lengths, it removes the complexity of finding heights or angles, saving you time and ensuring precision.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}