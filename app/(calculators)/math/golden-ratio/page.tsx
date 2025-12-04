import GoldenRatioCalculator from '../../../_components/calculators/GoldenRatioCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GoldenRatioPage() {
  return (
    <CalculatorPageTemplate
      title="Golden Ratio Calculator"
      description="Calculate the golden ratio (φ), multiply or divide by φ, or find golden rectangle dimensions instantly. Perfect for design, architecture, mathematics, and art applications."
      calculator={<GoldenRatioCalculator />}
      slug="math/golden-ratio"
      category="Geometry"
      features={[
        "Calculate golden ratio value (φ ≈ 1.618)",
        "Multiply any number by the golden ratio",
        "Divide any number by the golden ratio",
        "Calculate golden rectangle dimensions",
        "Step-by-step solutions",
        "High precision calculations"
      ]}
    >
      <SEOSection title="Golden Ratio Calculator: Calculate φ, Golden Rectangles, and More">
        <p>
          The golden ratio, often denoted by the Greek letter φ (phi), is one of the most fascinating mathematical constants in nature, art, and design. With a value of approximately <strong>1.618033988749895</strong>, this irrational number appears throughout mathematics, architecture, and even in the natural world. Our <strong>Golden Ratio Calculator</strong> makes it effortless to work with this remarkable number, whether you&apos;re designing a logo, calculating proportions for architecture, or exploring mathematical relationships.
        </p>
        <p>
          Understanding the golden ratio is essential for anyone working in design, mathematics, or the arts. This calculator provides instant access to φ and allows you to perform calculations involving the golden ratio with precision. From finding the perfect proportions for a golden rectangle to understanding how the golden ratio relates to the Fibonacci sequence, our <strong>golden ratio calculator</strong> is your comprehensive tool for all φ-related calculations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Golden Ratio Calculator">
        <p>
          Our <strong>golden ratio calculator</strong> offers multiple calculation modes to suit your needs. Whether you want to see the exact value of φ, multiply or divide by the golden ratio, or calculate golden rectangle dimensions, the process is straightforward and intuitive.
        </p>
        <SEOList items={[
          "<strong>Select Calculation Type:</strong> Choose from four options: \"Show Golden Ratio Value\" to display φ, \"Multiply by φ\" to multiply a number by the golden ratio, \"Divide by φ\" to divide a number by the golden ratio, or \"Golden Rectangle\" to calculate rectangle dimensions.",
          "<strong>Enter Your Values:</strong> Depending on your selection, enter the number you want to multiply or divide by φ, or enter the width for a golden rectangle calculation. For the golden ratio value, no input is needed.",
          "<strong>Calculate:</strong> Click the \"Calculate\" button to instantly see your results with step-by-step calculations.",
          "<strong>Review Results:</strong> The calculator displays the golden ratio value, your calculation result, and detailed step-by-step solutions showing how the result was obtained."
        ]} ordered={true} />
        <p>
          This <strong>phi calculator</strong> handles all the complex mathematics behind the golden ratio, giving you accurate results in seconds.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Golden Ratio (φ)">
        <p>
          The golden ratio, φ (phi), is defined as the ratio where the ratio of the sum of two quantities to the larger quantity equals the ratio of the larger quantity to the smaller one. This creates a relationship that is considered aesthetically pleasing and appears frequently in nature and art.
        </p>
        <SEOFormula 
          formula="φ = (1 + √5) / 2 ≈ 1.618033988749895"
          description="The mathematical definition of the golden ratio"
        />
        <p>
          This formula shows that φ is an irrational number, meaning it cannot be expressed as a simple fraction and its decimal representation goes on forever without repeating. The golden ratio has several remarkable mathematical properties:
        </p>
        <SEOList items={[
          "<strong>Self-Similarity:</strong> φ = 1 + 1/φ, meaning the golden ratio plus one equals the golden ratio squared",
          "<strong>Fibonacci Connection:</strong> As Fibonacci numbers increase, the ratio of consecutive numbers approaches φ",
          "<strong>Geometric Properties:</strong> In a golden rectangle, removing a square leaves another golden rectangle",
          "<strong>Algebraic Property:</strong> φ² = φ + 1, which is the defining quadratic equation for the golden ratio"
        ]} />
      </SEOSection>

      <SEOSection title="What is a Golden Rectangle?">
        <p>
          A golden rectangle is a rectangle whose side lengths are in the golden ratio. When you have a golden rectangle, the ratio of the longer side to the shorter side equals φ (approximately 1.618). This proportion is considered visually harmonious and has been used in art and architecture for thousands of years.
        </p>
        <p>
          Our <strong>golden ratio calculator</strong> can instantly calculate the dimensions of a golden rectangle. If you know the width, it will calculate the height (width × φ), or if you know the height, you can calculate the width (height ÷ φ). This is particularly useful for:
        </p>
        <SEOList items={[
          "<strong>Graphic Design:</strong> Creating layouts, logos, and compositions with pleasing proportions",
          "<strong>Architecture:</strong> Designing buildings and spaces with harmonious dimensions",
          "<strong>Photography:</strong> Framing and composing images using the golden ratio",
          "<strong>Web Design:</strong> Creating user interfaces with aesthetically pleasing layouts"
        ]} />
        <p>
          The Parthenon in Athens, the Great Pyramid of Giza, and many famous artworks are said to incorporate golden rectangle proportions, demonstrating the enduring appeal of this mathematical relationship.
        </p>
      </SEOSection>

      <SEOSection title="The Golden Ratio in Nature and Mathematics">
        <p>
          The golden ratio appears throughout nature and mathematics in fascinating ways. Understanding these connections helps explain why this number is so significant.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Fibonacci Sequence Connection</h3>
        <p>
          The Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34, ...) is closely related to the golden ratio. As you divide each Fibonacci number by its predecessor, the result approaches φ:
        </p>
        <SEOList items={[
          "8 ÷ 5 = 1.6",
          "13 ÷ 8 = 1.625",
          "21 ÷ 13 = 1.615...",
          "34 ÷ 21 = 1.619...",
          "As numbers increase, the ratio approaches φ ≈ 1.618"
        ]} />
        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Natural Occurrences</h3>
        <SEOList items={[
          "<strong>Flower Petals:</strong> Many flowers have petal counts that are Fibonacci numbers",
          "<strong>Spiral Patterns:</strong> Sunflower seeds, pinecones, and shells often follow golden spiral patterns",
          "<strong>Tree Branching:</strong> The way branches split often follows golden ratio proportions",
          "<strong>Human Body:</strong> Some proportions in the human body approximate the golden ratio"
        ]} />
      </SEOSection>

      <SEOSection title="Practical Applications of the Golden Ratio">
        <p>
          The golden ratio isn&apos;t just a mathematical curiosity—it has practical applications in many fields. Our <strong>golden ratio calculator</strong> helps you apply these principles in real-world scenarios.
        </p>
        <SEOList items={[
          "<strong>Design and Art:</strong> Creating visually appealing compositions, logos, and layouts. Many designers use the golden ratio to determine spacing, sizing, and proportions in their work.",
          "<strong>Architecture:</strong> Designing buildings with harmonious proportions. Famous structures like the Parthenon and Notre-Dame Cathedral are said to incorporate golden ratio principles.",
          "<strong>Photography:</strong> Using the golden ratio (similar to the rule of thirds) to compose more engaging photographs. The golden spiral can guide the placement of key elements.",
          "<strong>Typography:</strong> Determining font sizes and line spacing. Some typographers use golden ratio relationships to create more readable and aesthetically pleasing text layouts.",
          "<strong>Financial Markets:</strong> Some traders use Fibonacci retracements (based on golden ratio relationships) to identify potential support and resistance levels.",
          "<strong>Music:</strong> Some composers have used golden ratio proportions in their compositions, though this is more of an artistic choice than a mathematical requirement."
        ]} />
      </SEOSection>

      <SEOSection title="Worked Examples: Using the Golden Ratio Calculator">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 1: Finding the Golden Ratio Value</h3>
        <p>
          To find the exact value of φ, simply select &quot;Show Golden Ratio Value&quot; and click Calculate. The calculator will display:
        </p>
        <div className="bg-gray-100 px-3 py-2 rounded font-mono text-sm my-3">
          φ = 1.618033988749895
        </div>
        <p>
          This is the precise value of the golden ratio, calculated using the formula (1 + √5) / 2.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Example 2: Multiplying by the Golden Ratio</h3>
        <p>
          Suppose you want to multiply 10 by the golden ratio. Enter 10, select &quot;Multiply by φ,&quot; and calculate:
        </p>
        <SEOList items={[
          "Input: 10",
          "Calculation: 10 × 1.618033988749895",
          "Result: 16.18033988749895"
        ]} />
        <p>
          This tells you that if 10 is the shorter side of a golden rectangle, the longer side would be approximately 16.18.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Example 3: Creating a Golden Rectangle</h3>
        <p>
          If you want to create a golden rectangle with a width of 8 units, enter 8 as the width and select &quot;Golden Rectangle&quot;:
        </p>
        <SEOList items={[
          "Width: 8",
          "Height: 8 × φ = 8 × 1.618033988749895",
          "Height: 12.94427190999916"
        ]} />
        <p>
          The resulting rectangle with dimensions 8 × 12.94 will have the golden ratio proportions, making it aesthetically pleasing for design purposes.
        </p>
      </SEOSection>

      <SEOSection title="The Mathematics Behind the Golden Ratio">
        <p>
          The golden ratio can be derived from a simple geometric relationship. Consider a line segment divided into two parts, where the ratio of the whole to the larger part equals the ratio of the larger part to the smaller part.
        </p>
        <p>
          If we let the larger part be 1 and the smaller part be x, then:
        </p>
        <div className="space-y-3 my-4">
          <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">(1 + x) / 1 = 1 / x</p>
          <p>Cross-multiplying gives us:</p>
          <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">1 + x = 1/x</p>
          <p>Multiplying both sides by x:</p>
          <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm">x + x² = 1</p>
          <p>Rearranging into standard quadratic form:</p>
          <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm font-bold">x² + x - 1 = 0</p>
          <p>Using the quadratic formula, we get:</p>
          <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm font-bold">x = (-1 + √5) / 2</p>
          <p>Since x represents a length (positive), and 1 + x = φ, we arrive at:</p>
          <p className="bg-gray-100 px-3 py-2 rounded font-mono text-sm font-bold">φ = (1 + √5) / 2</p>
        </div>
        <p>
          This is the formula our <strong>golden ratio calculator</strong> uses to compute the precise value of φ.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the exact value of the golden ratio?",
            answer: "The golden ratio (φ) is an irrational number approximately equal to 1.618033988749895. Its exact value is (1 + √5) / 2, which means it cannot be expressed as a simple fraction and its decimal representation continues infinitely without repeating."
          },
          {
            question: "How is the golden ratio used in design?",
            answer: "Designers use the golden ratio to create visually pleasing proportions in layouts, logos, and compositions. By using golden rectangles or applying the golden ratio to spacing and sizing, designers can create more harmonious and aesthetically appealing designs. Many famous logos and artworks incorporate golden ratio principles."
          },
          {
            question: "What's the difference between the golden ratio and the Fibonacci sequence?",
            answer: "The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones (1, 1, 2, 3, 5, 8, 13...). The golden ratio is the limit that the ratio of consecutive Fibonacci numbers approaches. As Fibonacci numbers get larger, dividing one by its predecessor gets closer to φ (approximately 1.618)."
          },
          {
            question: "Can I use the golden ratio calculator for web design?",
            answer: "Absolutely! The golden ratio calculator is perfect for web design. You can use it to determine column widths, spacing between elements, font sizes, and overall layout proportions. Many web designers use golden rectangle proportions to create more visually appealing and balanced designs."
          },
          {
            question: "Is the golden ratio the same as the rule of thirds?",
            answer: "No, they're different concepts. The rule of thirds divides an image into nine equal parts using two horizontal and two vertical lines, placing important elements along these lines. The golden ratio is a specific mathematical constant (φ ≈ 1.618) that creates a different set of proportions. However, both are used in composition and design to create visually appealing layouts."
          },
          {
            question: "How accurate is the golden ratio calculator?",
            answer: "Our golden ratio calculator provides high-precision calculations, displaying the golden ratio to 15 decimal places (1.618033988749895). For practical design and mathematical applications, this level of precision is more than sufficient. The calculator uses the exact mathematical formula (1 + √5) / 2 to ensure accuracy."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The golden ratio is a fundamental mathematical constant that bridges mathematics, art, design, and nature. Our <strong>Golden Ratio Calculator</strong> provides you with the tools to explore this fascinating number, whether you&apos;re working on a design project, studying mathematics, or simply curious about one of nature&apos;s most beautiful patterns.
        </p>
        <p>
          Understanding the golden ratio opens up new possibilities in design and helps you create more harmonious and aesthetically pleasing work. Use this calculator to incorporate golden ratio principles into your projects, and discover why this mathematical constant has captivated artists, architects, and mathematicians for thousands of years.
        </p>
        <p>
          Ready to explore more mathematical concepts? Learn about {createInternalLink('area', 'area calculations')}, discover the properties of {createInternalLink('circle-equation', 'circles')}, or explore the relationships in {createInternalLink('similarTriangles', 'similar triangles')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

