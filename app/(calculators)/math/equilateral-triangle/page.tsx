import EquilateralTriangleCalculator from '../../../_components/calculators/EquilateralTriangleCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function EquilateralTrianglePage() {
  return (
    <CalculatorPageTemplate
      title="Equilateral Triangle Calculator"
      description="Calculate area, perimeter, height, and side length of an equilateral triangle instantly. All sides equal, all angles 60°. Perfect for geometry homework and design projects."
      calculator={<EquilateralTriangleCalculator />}
      slug="math/equilateral-triangle"
      category="Geometry"
      features={[
        "Calculate area from side length",
        "Calculate perimeter and height",
        "Find side length from area, height, or perimeter",
        "Step-by-step solutions",
        "All angles = 60°",
        "High precision calculations"
      ]}
    >
      <SEOSection title="Equilateral Triangle Calculator: Calculate Area, Perimeter, Height & More">
        <p>
          An equilateral triangle is a special type of triangle where all three sides have equal length and all three interior angles measure exactly 60 degrees. This perfect symmetry makes equilateral triangles one of the most important shapes in geometry, architecture, and design. Our <strong>Equilateral Triangle Calculator</strong> makes it easy to calculate all the important properties of an equilateral triangle, including area, perimeter, height, and side length.
        </p>
        <p>
          Whether you&apos;re solving geometry problems, designing triangular patterns, or calculating materials for construction, this <strong>equilateral triangle calculator</strong> provides instant, accurate results with detailed step-by-step solutions. Understanding equilateral triangle properties is essential for students, designers, architects, and anyone working with geometric shapes.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Equilateral Triangle Calculator">
        <p>
          Our <strong>equilateral triangle calculator</strong> offers six different calculation modes to find various properties of an equilateral triangle. The interface is intuitive and guides you through each calculation type.
        </p>
        <SEOList items={[
          "<strong>Area from Side Length:</strong> Enter the side length, and the calculator will find the area, perimeter, and height of the equilateral triangle.",
          "<strong>Perimeter:</strong> Enter the side length to calculate the perimeter (3 × side length).",
          "<strong>Height:</strong> Enter the side length to calculate the height (altitude) of the triangle.",
          "<strong>Side Length from Area:</strong> Enter the area, and the calculator will find the side length, perimeter, and height.",
          "<strong>Side Length from Height:</strong> Enter the height, and the calculator will find the side length, area, and perimeter.",
          "<strong>Side Length from Perimeter:</strong> Enter the perimeter, and the calculator will find the side length, area, and height."
        ]} ordered={true} />
        <p>
          Each calculation includes detailed step-by-step solutions showing exactly how the result was obtained, making this <strong>equilateral triangle area calculator</strong> perfect for learning and verification.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Equilateral Triangles">
        <p>
          An equilateral triangle is a polygon with three equal sides and three equal angles. This perfect symmetry gives it unique properties that make calculations simpler than other triangle types.
        </p>
        <p>
          Key properties of an equilateral triangle:
        </p>
        <SEOList items={[
          "<strong>All Sides Equal:</strong> All three sides have the same length (s)",
          "<strong>All Angles Equal:</strong> Each interior angle measures exactly 60°",
          "<strong>Regular Polygon:</strong> It's the simplest regular polygon (3 sides)",
          "<strong>Symmetry:</strong> Has three lines of symmetry and rotational symmetry of 120°",
          "<strong>Height:</strong> The altitude (height) bisects both the base and the opposite angle",
          "<strong>Centroid, Circumcenter, Incenter:</strong> All three special points coincide at the center"
        ]} />
        <p>
          Because of this perfect symmetry, if you know just one measurement (side, area, height, or perimeter), you can calculate all other properties.
        </p>
      </SEOSection>

      <SEOSection title="Equilateral Triangle Formulas">
        <p>
          The formulas for equilateral triangles are simpler than those for general triangles because of the equal sides and angles. Here are the key formulas our <strong>equilateral triangle calculator</strong> uses:
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Area Formula</h3>
        <SEOFormula 
          formula="A = (√3/4) × s²"
          description="Area of an equilateral triangle with side length s"
        />
        <p>
          This formula comes from the general triangle area formula (A = ½ × base × height) combined with the equilateral triangle height formula. The constant √3/4 ≈ 0.433 makes it easy to calculate area from side length.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Perimeter Formula</h3>
        <SEOFormula 
          formula="P = 3s"
          description="Perimeter of an equilateral triangle"
        />
        <p>
          Since all three sides are equal, the perimeter is simply three times the side length.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Height Formula</h3>
        <SEOFormula 
          formula="h = s√3/2"
          description="Height (altitude) of an equilateral triangle"
        />
        <p>
          The height can be found using the Pythagorean theorem. When you drop a perpendicular from a vertex to the opposite side, it creates two 30-60-90 right triangles, leading to this formula.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Angle Measure</h3>
        <SEOFormula 
          formula="Each angle = 60°"
          description="All interior angles in an equilateral triangle"
        />
        <p>
          Since the sum of angles in any triangle is 180° and all angles are equal, each angle must be 180° ÷ 3 = 60°.
        </p>
      </SEOSection>

      <SEOSection title="Worked Examples: Using the Equilateral Triangle Calculator">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 1: Finding Area from Side Length</h3>
        <p>
          Suppose you have an equilateral triangle with a side length of 6 units. To find the area:
        </p>
        <SEOList items={[
          "Select \"Area from Side Length\"",
          "Enter side length: 6",
          "Click Calculate",
          "Result: Area = (√3/4) × 6² = (√3/4) × 36 = 15.588 square units",
          "Also calculated: Perimeter = 18 units, Height = 5.196 units"
        ]} />

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Example 2: Finding Side Length from Area</h3>
        <p>
          If you know the area is 25 square units and need to find the side length:
        </p>
        <SEOList items={[
          "Select \"Side Length from Area\"",
          "Enter area: 25",
          "Click Calculate",
          "Result: Side length = √(4 × 25 / √3) = √(100 / 1.732) = 7.602 units",
          "Also calculated: Perimeter = 22.806 units, Height = 6.588 units"
        ]} />

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Example 3: Finding Side Length from Height</h3>
        <p>
          If the height is 8 units:
        </p>
        <SEOList items={[
          "Select \"Side Length from Height\"",
          "Enter height: 8",
          "Click Calculate",
          "Result: Side length = 2 × 8 / √3 = 16 / 1.732 = 9.238 units",
          "Also calculated: Area = 36.95 square units, Perimeter = 27.714 units"
        ]} />
      </SEOSection>

      <SEOSection title="Applications of Equilateral Triangles">
        <p>
          Equilateral triangles are used extensively in various fields due to their perfect symmetry and stability:
        </p>
        <SEOList items={[
          "<strong>Architecture and Construction:</strong> Equilateral triangles provide structural stability and are used in trusses, bridges, and architectural designs. The triangular shape distributes forces evenly.",
          "<strong>Design and Art:</strong> Equilateral triangles are used in patterns, logos, and artistic compositions. Their symmetry makes them visually appealing.",
          "<strong>Engineering:</strong> Triangular structures are inherently stable, and equilateral triangles are often used in frameworks, supports, and mechanical designs.",
          "<strong>Mathematics Education:</strong> Equilateral triangles are excellent examples for teaching geometry concepts, symmetry, and trigonometric relationships.",
          "<strong>Nature:</strong> Some natural structures approximate equilateral triangles, such as certain crystal formations and molecular structures.",
          "<strong>Computer Graphics:</strong> Equilateral triangles are used in 3D modeling, tessellation, and computer graphics algorithms."
        ]} />
      </SEOSection>

      <SEOSection title="Why Equilateral Triangles Are Special">
        <p>
          Equilateral triangles have several unique properties that make them special:
        </p>
        <SEOList items={[
          "<strong>Perfect Symmetry:</strong> With three equal sides and three equal angles, equilateral triangles have the highest degree of symmetry among triangles.",
          "<strong>Simplified Calculations:</strong> Because all sides are equal, many formulas become simpler. You only need one measurement to find all others.",
          "<strong>Regular Polygon:</strong> Equilateral triangles are the simplest regular polygon, making them fundamental building blocks in geometry.",
          "<strong>Special Right Triangles:</strong> The height creates two 30-60-90 right triangles, which are special right triangles with known side ratios.",
          "<strong>Maximum Area for Given Perimeter:</strong> Among all triangles with the same perimeter, the equilateral triangle has the maximum area.",
          "<strong>Tessellation:</strong> Equilateral triangles can tile a plane perfectly, making them useful in patterns and designs."
        ]} />
      </SEOSection>

      <SEOSection title="Relationship to Other Triangle Types">
        <p>
          Understanding how equilateral triangles relate to other triangle types helps build a complete picture of triangle geometry:
        </p>
        <SEOList items={[
          "<strong>Isosceles Triangle:</strong> An equilateral triangle is a special case of an isosceles triangle (where two sides are equal). In fact, it's an isosceles triangle where all three sides are equal.",
          "<strong>Acute Triangle:</strong> All equilateral triangles are acute triangles because all angles are less than 90°.",
          "<strong>Regular Triangle:</strong> Equilateral triangles are the only type of regular triangle (all sides and angles equal).",
          "<strong>30-60-90 Triangle:</strong> When you draw the height in an equilateral triangle, it creates two 30-60-90 right triangles, which have special side ratios."
        ]} />
        <p>
          This relationship makes equilateral triangles excellent examples for understanding more complex triangle concepts.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between an equilateral triangle and an isosceles triangle?",
            answer: "An isosceles triangle has at least two equal sides, while an equilateral triangle has all three sides equal. An equilateral triangle is a special case of an isosceles triangle where all three sides are equal, not just two."
          },
          {
            question: "How do you find the area of an equilateral triangle if you only know the side length?",
            answer: "Use the formula A = (√3/4) × s², where s is the side length. For example, if the side is 10 units, the area is (√3/4) × 100 = 43.30 square units. Our calculator does this automatically when you select 'Area from Side Length'."
          },
          {
            question: "What is the height of an equilateral triangle with side length 6?",
            answer: "The height is calculated using h = s√3/2. For a side length of 6, the height is 6 × √3/2 = 3√3 ≈ 5.196 units. The height is always approximately 0.866 times the side length."
          },
          {
            question: "Can an equilateral triangle be a right triangle?",
            answer: "No, an equilateral triangle cannot be a right triangle. In an equilateral triangle, all angles are 60°, while a right triangle requires one 90° angle. These conditions cannot both be true."
          },
          {
            question: "How do you find the side length of an equilateral triangle from its area?",
            answer: "Rearrange the area formula: A = (√3/4) × s² becomes s² = 4A/√3, so s = √(4A/√3). For example, if the area is 25 square units, the side length is √(100/√3) ≈ 7.602 units. Our calculator handles this automatically."
          },
          {
            question: "Why are all angles in an equilateral triangle 60 degrees?",
            answer: "The sum of angles in any triangle is 180°. In an equilateral triangle, all three angles are equal. Therefore, each angle must be 180° ÷ 3 = 60°."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Equilateral triangles are among the most elegant and useful shapes in geometry, combining perfect symmetry with practical applications. Our <strong>Equilateral Triangle Calculator</strong> provides you with the tools to quickly and accurately calculate all the important properties of an equilateral triangle, whether you need area, perimeter, height, or side length.
        </p>
        <p>
          With step-by-step solutions and multiple calculation modes, this calculator helps you understand the mathematics behind equilateral triangle properties while saving time on complex calculations. Use it for homework, design projects, or any application where equilateral triangle measurements are needed.
        </p>
        <p>
          Ready to explore more triangle types? Learn about {createInternalLink('right-triangle', 'right triangles')}, discover the properties of {createInternalLink('triangle-45-45-90', '45-45-90 triangles')}, or calculate triangle area using {createInternalLink('herons-formula', 'Heron\'s formula')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

