import SpecialRightTrianglesCalculator from '../../../_components/calculators/SpecialRightTrianglesCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula, SEOExample } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SpecialRightTrianglesPage() {
  return (
    <CalculatorPageTemplate
      title="Special Right Triangles Calculator - 45-45-90 & 30-60-90 Triangle Calculator - Free Online Tool"
      description="Calculate sides, area, and perimeter for 45-45-90 and 30-60-90 special right triangles. Find missing sides using special right triangle ratios with step-by-step solutions. Perfect for geometry homework and triangle calculations."
      calculator={<SpecialRightTrianglesCalculator />}
      slug="math/special-right-triangles"
      category="Geometry"
      features={[
        "Calculate 45-45-90 triangles",
        "Calculate 30-60-90 triangles",
        "Step-by-step calculations",
        "Area and perimeter calculations",
        "Special right triangle ratios",
        "Multiple input options",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Special Right Triangles: Essential Geometry Tools">
        <p>
          <strong>Special right triangles</strong> are fundamental in geometry and trigonometry, appearing everywhere from architectural design to physics problems. These triangles have fixed angle measures and specific side ratios that make calculations much easier than working with arbitrary right triangles. Our <strong>Special Right Triangles Calculator</strong> makes it easy to calculate both 45-45-90 and 30-60-90 triangles with instant, accurate results.
        </p>
        <p>
          The two most important special right triangles are the <strong>45-45-90 triangle</strong> (isosceles right triangle) and the <strong>30-60-90 triangle</strong>. Both have predictable side ratios that eliminate the need for complex trigonometry in many situations. Understanding these triangles is essential for geometry, trigonometry, and real-world applications like construction, engineering, and design.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Special Right Triangles Calculator">
        <p>
          Our <strong>special right triangles calculator</strong> is designed for simplicity and accuracy. Follow these steps:
        </p>
        <SEOList items={[
          "<strong>Select Triangle Type:</strong> Choose either 45-45-90 (isosceles right) or 30-60-90 triangle from the dropdown menu.",
          "<strong>Choose Known Side:</strong> Select which side you know - for 45-45-90: leg or hypotenuse; for 30-60-90: short leg, long leg, or hypotenuse.",
          "<strong>Enter Value:</strong> Input the length of the known side.",
          "<strong>Calculate:</strong> Click the calculate button to get instant results with all sides, angles, area, perimeter, and step-by-step calculations."
        ]} ordered={true} />
        <p>
          The calculator automatically uses the correct special ratios for each triangle type and provides detailed explanations of the calculations.
        </p>
      </SEOSection>

      <SEOSection title="The 45-45-90 Triangle (Isosceles Right Triangle)">
        <p>
          The <strong>45-45-90 triangle</strong> is an isosceles right triangle with two equal legs and angles of 45°, 45°, and 90°. It's formed by cutting a square diagonally in half.
        </p>

        <SEOFormula
          formula="Leg : Leg : Hypotenuse = 1 : 1 : √2"
          description="The two legs are equal, and the hypotenuse is √2 times the length of each leg."
        />

        <h3>Key Properties</h3>
        <SEOList items={[
          "Two equal legs (opposite the 45° angles)",
          "Hypotenuse = leg × √2",
          "Area = (leg²) / 2",
          "Perimeter = 2 × leg + hypotenuse",
          "Common in squares, octagons, and diagonal measurements"
        ]} />

        <SEOExample
          title="Example: Find sides if leg = 5"
          description="Calculate all sides of a 45-45-90 triangle with leg length 5."
          calculation="Leg = 5, Hypotenuse = 5 × √2 = 5 × 1.414 = 7.07"
          result="Sides: 5, 5, 7.07 | Area = 12.5 | Perimeter = 17.07"
        />
      </SEOSection>

      <SEOSection title="The 30-60-90 Triangle">
        <p>
          The <strong>30-60-90 triangle</strong> is a scalene right triangle with angles of 30°, 60°, and 90°. It's formed by cutting an equilateral triangle in half.
        </p>

        <SEOFormula
          formula="Short Leg : Long Leg : Hypotenuse = 1 : √3 : 2"
          description="If the short leg is x, then the long leg is x√3 and the hypotenuse is 2x."
        />

        <h3>Key Properties</h3>
        <SEOList items={[
          "Short leg (opposite 30°) = x",
          "Long leg (opposite 60°) = x√3",
          "Hypotenuse (opposite 90°) = 2x",
          "Area = (short leg × long leg) / 2",
          "Common in equilateral triangles, hexagons, and trigonometric calculations"
        ]} />

        <SEOExample
          title="Example: Find sides if short leg = 4"
          description="Calculate all sides of a 30-60-90 triangle with short leg length 4."
          calculation="Short leg = 4, Long leg = 4 × √3 = 6.93, Hypotenuse = 2 × 4 = 8"
          result="Sides: 4, 6.93, 8 | Area = 13.86 | Perimeter = 18.93"
        />
      </SEOSection>

      <SEOSection title="Comparing 45-45-90 and 30-60-90 Triangles">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">45-45-90 Triangle</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Angles: 45°, 45°, 90°</li>
              <li>• Side ratio: 1 : 1 : √2</li>
              <li>• Type: Isosceles (two equal sides)</li>
              <li>• Formed by: Cutting a square diagonally</li>
              <li>• Use: Square diagonals, octagons</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">30-60-90 Triangle</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Angles: 30°, 60°, 90°</li>
              <li>• Side ratio: 1 : √3 : 2</li>
              <li>• Type: Scalene (all sides different)</li>
              <li>• Formed by: Cutting an equilateral triangle</li>
              <li>• Use: Equilateral triangles, hexagons</li>
            </ul>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Real-World Applications of Special Right Triangles">
        <p>
          <strong>Special right triangles</strong> are used extensively in real-world applications:
        </p>
        <SEOList items={[
          "<strong>Architecture:</strong> Designing square buildings, calculating diagonal supports, and creating balanced layouts using 45-45-90 triangles.",
          "<strong>Engineering:</strong> Structural calculations, force analysis, and component design using both triangle types.",
          "<strong>Construction:</strong> Measuring square corners, calculating diagonal distances, and ensuring proper angles using 45-45-90 triangles.",
          "<strong>Surveying:</strong> Measuring distances and angles in the field, especially in grid-based systems.",
          "<strong>Art and Design:</strong> Creating balanced compositions, layouts, and visual elements with precise geometric proportions.",
          "<strong>Computer Graphics:</strong> Rendering 2D and 3D graphics, calculating screen coordinates, and creating geometric shapes.",
          "<strong>Physics:</strong> Analyzing projectile motion, resolving vectors into components, and calculating forces.",
          "<strong>Navigation:</strong> Calculating distances and bearings in coordinate systems.",
          "<strong>Trigonometry:</strong> Providing exact values for trigonometric functions at special angles (30°, 45°, 60°)."
        ]} />
      </SEOSection>

      <SEOSection title="How to Find Missing Sides in Special Right Triangles">
        <h3>45-45-90 Triangle</h3>
        <SEOList items={[
          "If you know the leg: Hypotenuse = leg × √2",
          "If you know the hypotenuse: Leg = hypotenuse / √2",
          "Both legs are always equal"
        ]} ordered={true} />

        <h3>30-60-90 Triangle</h3>
        <SEOList items={[
          "If you know the short leg: Long leg = short leg × √3, Hypotenuse = 2 × short leg",
          "If you know the long leg: Short leg = long leg / √3, Hypotenuse = 2 × short leg",
          "If you know the hypotenuse: Short leg = hypotenuse / 2, Long leg = short leg × √3"
        ]} ordered={true} />

        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <p className="font-semibold text-gray-700 mb-2">Quick Reference:</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">45-45-90:</p>
              <p className="font-mono">leg = leg</p>
              <p className="font-mono">hypotenuse = leg × √2</p>
            </div>
            <div>
              <p className="font-semibold">30-60-90:</p>
              <p className="font-mono">short = x</p>
              <p className="font-mono">long = x√3</p>
              <p className="font-mono">hyp = 2x</p>
            </div>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Special Right Triangles vs. General Right Triangles">
        <p>
          Understanding the difference helps you choose the right approach:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Special Right Triangles</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Fixed angle measures (45-45-90 or 30-60-90)</li>
              <li>• Predictable side ratios</li>
              <li>• Calculations use simple multiplication/division</li>
              <li>• No trigonometry needed</li>
              <li>• Exact values possible</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">General Right Triangles</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Any combination of angles (sum = 90°)</li>
              <li>• No predictable ratios</li>
              <li>• Requires Pythagorean theorem or trigonometry</li>
              <li>• May need sin, cos, tan functions</li>
              <li>• Often involves decimal approximations</li>
            </ul>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What makes a right triangle 'special'?",
            answer: "A special right triangle has fixed angle measures (45-45-90 or 30-60-90) with predictable side ratios. This eliminates the need for trigonometry and makes calculations much simpler."
          },
          {
            question: "How do I know which special right triangle I'm working with?",
            answer: "Look at the angles: if you have two 45° angles, it's a 45-45-90 triangle. If you have 30° and 60° angles, it's a 30-60-90 triangle. You can also identify by side ratios."
          },
          {
            question: "Can I use special right triangle ratios for any right triangle?",
            answer: "No, the special ratios only apply to 45-45-90 and 30-60-90 triangles. For other right triangles, use the Pythagorean theorem or trigonometry."
          },
          {
            question: "Why is √2 used in 45-45-90 triangles?",
            answer: "The √2 comes from the Pythagorean theorem: if both legs = 1, then hypotenuse = √(1² + 1²) = √2. This ratio applies to all 45-45-90 triangles."
          },
          {
            question: "Why is √3 used in 30-60-90 triangles?",
            answer: "The √3 comes from the relationship between the sides. If the short leg = 1, then by trigonometry, the long leg = tan(60°) = √3. This creates the 1 : √3 : 2 ratio."
          },
          {
            question: "Are there other special right triangles?",
            answer: "The 3-4-5 triangle (and its multiples) is another common special right triangle, but 45-45-90 and 30-60-90 are the most important for their exact trigonometric values."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering <strong>special right triangles</strong> is essential for geometry, trigonometry, and many practical applications. Our <strong>Special Right Triangles Calculator</strong> simplifies calculations for both 45-45-90 and 30-60-90 triangles, providing instant results with detailed step-by-step explanations. Whether you're solving geometry problems, working on construction projects, or studying trigonometry, understanding these special triangles will save you time and improve your accuracy.
        </p>
        <p>
          For related tools, check out our {createInternalLink('pythagorean-theorem')} for general right triangles, our {createInternalLink('right-triangle')} for comprehensive right triangle calculations, or our {createInternalLink('trigonometry')} for advanced trigonometric functions.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

