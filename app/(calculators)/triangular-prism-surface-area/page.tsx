import TriangularPrismCalculator from '../../_components/calculators/TriangularPrismCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOFAQ } from '../../_components/ui/SEOContent';

export default function TriangularPrismSurfaceAreaPage() {
  return (
    <CalculatorPageTemplate
      title="Triangular Prism Surface Area Calculator - Find Total Surface Area"
      description="Calculate the surface area of a triangular prism instantly with our free online calculator. Perfect for geometry homework, engineering projects, and any task requiring 3D surface area calculations."
      calculator={<TriangularPrismCalculator />}
      slug="triangular-prism-surface-area"
    >
      <SEOSection title="Fast and Accurate Triangular Prism Calculations">
        <p>
          Whether you&apos;re an architect designing a striking gabled roof, an engineer calculating the material needed for a structural component, or a student tackling a geometry assignment, understanding the surface area of a three-dimensional shape is crucial. The triangular prism is a common shape found in countless real-world applications, and determining its total surface area is a frequent requirement.
        </p>
        <p>
          This <strong>Triangular Prism Surface Area Calculator</strong> provides a fast, accurate, and user-friendly way to find the total surface area of any triangular prism. Simply input the dimensions of your prism, and the calculator will handle the complex formulas for you, delivering instant results. This guide will not only show you how to use the tool but also help you understand the formulas behind it, its practical applications, and how to perform the calculation yourself.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Triangular Prism Surface Area Calculator">
        <p>
          Our tool is designed for simplicity and precision. To find the surface area, you only need four key measurements from your prism.
        </p>
        <SEOList items={[
          "<strong>Enter Base Side 'a':</strong> Input the length of the first side of one of the triangular bases.",
          "<strong>Enter Base Side 'b':</strong> Input the length of the second side of the triangular base.",
          "<strong>Enter Base Side 'c':</strong> Input the length of the third side of the triangular base.",
          "<strong>Enter Prism Length (L):</strong> Input the length (often called the height) of the prism, which is the distance between the two triangular bases.",
          "<strong>Calculate:</strong> Click the \"Calculate\" button to see your results."
        ]} ordered={true} />
        <p>
          Ensure all measurements are in the same unit (e.g., meters, inches, feet) for an accurate calculation.
        </p>
      </SEOSection>

      <SEOSection title="Interpreting the Results">
        <p>
          Once you click &quot;Calculate,&quot; the tool will provide three distinct outputs:
        </p>
        <SEOList items={[
          "<strong>Total Surface Area (A):</strong> This is the primary result. It represents the combined area of all five faces of the prism—the two triangular bases and the three rectangular sides. It&apos;s the total amount of material you would need to cover the entire exterior of the shape.",
          "<strong>Base Area (A_base):</strong> This is the area of a single one of the two identical triangular bases.",
          "<strong>Lateral Surface Area (A_lateral):</strong> This is the combined area of the three rectangular faces only. It represents the area of the &quot;sides&quot; of the prism, excluding the top and bottom triangular bases."
        ]} />
      </SEOSection>

      <SEOSection title="How to Find the Surface Area of a Triangular Prism: The Formula Explained">
        <p>
          To appreciate how the <strong>Triangular Prism Surface Area Calculator</strong> works, it&apos;s essential to understand the underlying formula. The total surface area of any prism is the sum of the area of its bases plus the area of its lateral faces.
        </p>
        <SEOFormula 
          formula="A = (2 × A_base) + (P_base × L)"
          description="Where A is Total Surface Area, A_base is the area of one triangular base, P_base is the perimeter of the base, and L is the length of the prism."
        />
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Calculating the Base Area (A_base):</h4>
            <p>
              Because our calculator allows you to input the three side lengths of the triangular base, it uses <strong>Heron&apos;s Formula</strong> to find the area. First, we calculate the semi-perimeter (s): <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">s = (a + b + c) / 2</code>. Then, we apply Heron&apos;s Formula to find the area: <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">A_base = √[s(s-a)(s-b)(s-c)]</code>.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Calculating the Base Perimeter (P_base):</h4>
            <p>
              The perimeter is the simplest part of the equation. It is the total length around the triangular base, found by adding the lengths of its three sides: <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">P_base = a + b + c</code>.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Calculating the Lateral Surface Area (A_lateral):</h4>
            <p>
              The lateral surface area is the sum of the areas of the three rectangular sides. This is calculated as: <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">A_lateral = P_base × L</code>.
            </p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Practical Worked Example">
        <p>
          Let&apos;s manually calculate the surface area of a triangular prism to see the formula in action.
        </p>
        <p>
          <strong>Scenario:</strong> Imagine you are creating a custom-shaped gift box. The triangular ends have sides of <strong>5 cm</strong>, <strong>6 cm</strong>, and <strong>7 cm</strong>. The length of the box is <strong>12 cm</strong>.
        </p>
        <SEOList items={[
          "<strong>Step 1: Calculate the Semi-Perimeter (s) of the Base:</strong> s = (5 + 6 + 7) / 2 = 9 cm.",
          "<strong>Step 2: Calculate the Area of one Triangular Base (A_base):</strong> Using Heron's Formula, A_base = √[9(9-5)(9-6)(9-7)] = √216 ≈ 14.7 cm².",
          "<strong>Step 3: Calculate the Perimeter of the Base (P_base):</strong> P_base = 5 + 6 + 7 = 18 cm.",
          "<strong>Step 4: Calculate the Lateral Surface Area (A_lateral):</strong> A_lateral = 18 cm × 12 cm = 216 cm².",
          "<strong>Step 5: Calculate the Total Surface Area (A):</strong> A = (2 × 14.7 cm²) + 216 cm² = 29.4 cm² + 216 cm² = 245.4 cm²."
        ]} ordered={true} />
        <p>
          The total surface area of the gift box is approximately <strong>245.4 square centimeters</strong>. Our calculator automates these steps to give you this result in an instant.
        </p>
      </SEOSection>
      
      <SEOSection title="Real-World Applications of Calculating Surface Area">
        <p>
          While it may seem like a purely academic exercise, calculating the surface area of a triangular prism has numerous practical applications across various industries:
        </p>
        <SEOList items={[
          "<strong>Architecture and Construction:</strong> Architects use this calculation to determine the amount of material needed for roofing, siding on dormers, or other triangular features. It's essential for accurate cost estimation and material ordering.",
          "<strong>Engineering:</strong> In thermodynamics, the surface area of a component can dictate its rate of heat transfer. Engineers designing heat exchangers or cooling fins might use these calculations to optimize performance.",
          "<strong>Packaging and Manufacturing:</strong> Companies creating products with triangular prism packaging (like some chocolate bars or specialty boxes) need to know the surface area to design and print the packaging material accurately.",
          "<strong>Physics and Optics:</strong> Prisms are fundamental in optics for dispersing light. The surface area is relevant for applying coatings or treatments to the prism's faces."
        ]} />
      </SEOSection>

      <SEOSection title="Limitations and Key Considerations">
        <p>
          To get the most out of this calculator, it&apos;s important to be aware of a few key points:
        </p>
        <SEOList items={[
          "<strong>Right Prisms vs. Oblique Prisms:</strong> This calculator is designed for <strong>right triangular prisms</strong>. In a right prism, the three rectangular faces are perpendicular to the triangular bases. An <strong>oblique prism</strong> has its bases shifted, which requires a more complex calculation.",
          "<strong>Consistent Units:</strong> Your result will only be accurate if all input measurements use the same unit (e.g., all in inches or all in centimeters). The final surface area will be in the square of that unit (e.g., square inches).",
          "<strong>Measurement Accuracy:</strong> The precision of your result is directly dependent on the precision of your input measurements. Double-check your dimensions before calculating."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding More About Triangular Prisms (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between the surface area and the volume of a triangular prism?",
            answer: "Surface Area is a two-dimensional measurement of the total area on the outside of the prism (think paint), measured in square units (cm², ft²). Volume is a three-dimensional measurement of the space inside the prism (think water), measured in cubic units (cm³, ft³)."
          },
          {
            question: "What is the lateral surface area of a triangular prism?",
            answer: "The lateral surface area is the total area of the prism's sides without including its top and bottom bases. It's the sum of the areas of its three rectangular faces."
          },
          {
            question: "How many faces, edges, and vertices does a triangular prism have?",
            answer: "A triangular prism always has 5 Faces (2 triangles, 3 rectangles), 9 Edges, and 6 Vertices (corners)."
          },
          {
            question: "Does this calculator work for equilateral or isosceles triangular prisms?",
            answer: "Yes. The calculator works for any type of triangle as its base—scalene, isosceles, or equilateral. You just need to input the lengths of the three sides, and Heron's formula will correctly calculate the base area."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Your Go-To Geometry Tool">
        <p>
          The triangular prism is a fundamental geometric shape with a surprising number of applications in our daily lives. Calculating its surface area is a key task in fields ranging from construction to product design. While the manual calculation offers valuable insight into the geometry, our <strong>Triangular Prism Surface Area Calculator</strong> is designed to provide the speed and accuracy required for practical projects and academic work.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}