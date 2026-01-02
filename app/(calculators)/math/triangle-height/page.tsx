import { Metadata } from 'next';
import HeightOfTriangleCalculator from '../../../_components/calculators/HeightOfTriangleCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Height of a Triangle Calculator - How to Find the Height of a Triangle',
  description: 'Learn how to find the height of a triangle using multiple methods: from base and area, three sides (Heron\'s formula), or trigonometry. Step-by-step solutions and formulas included.',
  keywords: ['how to find the height of a triangle', 'height of a triangle calculator', 'triangle height calculator', 'how to find triangle height', 'triangle height formula', 'calculate triangle height', 'height from area and base', 'heron formula height', 'triangle altitude calculator', 'geometry calculator', 'triangle calculator'],
  openGraph: {
    title: 'Height of a Triangle Calculator - Find Triangle Height from Base, Area, or Sides',
    description: 'Calculate the height of any triangle using multiple methods: from base and area, three sides (Heron\'s formula), or trigonometry. Step-by-step solutions included.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GetCalculation - Free Online Math Calculators',
      },
    ],
  },
};

export default function TriangleHeightPage() {
  return (
    <CalculatorPageTemplate
      title="Height of a Triangle Calculator - How to Find the Height of a Triangle"
      description="Learn how to find the height of a triangle using multiple methods: from base and area, three sides (Heron's formula), or trigonometry. Step-by-step solutions and formulas included."
      calculator={<HeightOfTriangleCalculator />}
      slug="math/triangle-height"
      category="Geometry"
      features={[
        "Calculate height from base and area",
        "Find height using three sides (Heron's formula)",
        "Calculate height using trigonometry",
        "Works with isosceles and scalene triangles",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      
      <SEOSection title="How to Find the Height of a Triangle">
        <p>
          Learning how to find the height of a triangle is essential for solving many geometry problems. The height 
          (also called altitude) of a triangle is the perpendicular distance from a vertex to the line containing the 
          opposite side (base). The height is always perpendicular to the base, forming a right angle. There are 
          multiple methods to find the height of a triangle depending on what information you have available.
        </p>
        
        <h3>Methods to Find the Height of a Triangle</h3>
        <SEOList items={[
          'From Base and Area: Height = 2 × Area / Base (simplest method)',
          'From Three Sides: Use Heron\'s formula to find area first, then calculate height',
          'From Base, Side, and Angle: Use trigonometry (Height = Side × sin(Angle))',
          'From Base and Two Equal Sides: Use Pythagorean theorem for isosceles triangles',
          'From Base and One Side: Requires additional information like an angle'
        ]} />

        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <p className="font-mono text-center text-lg">
            Height = 2 × Area / Base
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            The most common formula for finding triangle height when you know the area and base
          </p>
        </div>

        <h3>Key Properties of Triangle Height</h3>
        <SEOList items={[
          'Height is perpendicular to the base',
          'Each triangle has three heights (one from each vertex)',
          'All three heights intersect at a point called the orthocenter',
          'Height is used to calculate triangle area',
          'Height can be inside, outside, or on the triangle depending on triangle type'
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Triangle Height">
        <p>
          The height (also called altitude) of a triangle is the perpendicular distance from a vertex to the line 
          containing the opposite side (base). The height is always perpendicular to the base, forming a right angle. 
          Understanding how to find the height of a triangle is crucial for calculating area and solving various 
          geometric problems.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <p className="font-mono text-center text-lg">
            Area = (1/2) × Base × Height
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            This fundamental relationship connects area, base, and height
          </p>
        </div>
      </SEOSection>

      <SEOSection title="How to Use the Height of a Triangle Calculator">
        <p>
          Our calculator can find the height of a triangle using multiple methods. Simply provide the required 
          information and the calculator will automatically determine which method to use.
        </p>

        <h3>Supported Input Combinations</h3>
        <SEOList items={[
          'Base and Area: The simplest method (Height = 2 × Area / Base)',
          'Three Sides: Uses Heron\'s formula to find area, then calculates height',
          'Base, Side, and Angle: Uses trigonometry (Height = Side × sin(Angle))',
          'Base and Two Sides: For isosceles or scalene triangles'
        ]} />

        <h3>Step-by-Step Process</h3>
        <SEOList items={[
          'Enter the known values in the input fields',
          'Leave unknown values empty',
          'Click "Calculate Height"',
          'Review the step-by-step solution',
          'Check the calculated height, base, and area'
        ]} />
      </SEOSection>

      <SEOSection title="Triangle Height Formulas">
        <p>
          The following formulas are used to calculate the height of a triangle:
        </p>

        <h3>Height from Base and Area</h3>
        <SEOFormula 
          formula="h = 2A / b"
          description="Where A is the area and b is the base length"
        />

        <h3>Height from Three Sides (Heron's Formula)</h3>
        <SEOFormula 
          formula="s = (a + b + c) / 2"
          description="First calculate the semi-perimeter"
        />
        <SEOFormula 
          formula="Area = √[s(s-a)(s-b)(s-c)]"
          description="Then use Heron's formula to find area"
        />
        <SEOFormula 
          formula="h = 2 × Area / Base"
          description="Finally, calculate height from area and base"
        />

        <h3>Height from Base, Side, and Angle (Trigonometry)</h3>
        <SEOFormula 
          formula="h = side × sin(angle)"
          description="Where the angle is between the side and the base"
        />

        <h3>Height of Isosceles Triangle</h3>
        <SEOFormula 
          formula="h = √(a² - (b/2)²)"
          description="Where a is the equal side length and b is the base"
        />
      </SEOSection>

      <SEOSection title="Example Problems">
        <div className="space-y-4">
          <SEOExample
            title="Example 1: Height from Base and Area"
            description="Given: Base = 10 units, Area = 30 square units"
            calculation="Height = 2 × Area / Base = 2 × 30 / 10 = 60 / 10 = 6 units"
            result="The height of the triangle is 6 units"
          />
          
          <SEOExample
            title="Example 2: Height from Three Sides"
            description="Given: Side A = 5 units, Side B = 6 units, Side C = 7 units"
            calculation="Semi-perimeter s = (5 + 6 + 7) / 2 = 9. Area = √[9(9-5)(9-6)(9-7)] = √[9×4×3×2] = √216 ≈ 14.697. Height = 2 × 14.697 / 7 ≈ 4.199 units"
            result="The height (to base of 7 units) is approximately 4.199 units"
          />

          <SEOExample
            title="Example 3: Height from Base, Side, and Angle"
            description="Given: Base = 8 units, Side = 10 units, Angle = 45°"
            calculation="Height = Side × sin(Angle) = 10 × sin(45°) = 10 × 0.7071 ≈ 7.071 units"
            result="The height of the triangle is approximately 7.071 units"
          />

          <SEOExample
            title="Example 4: Height of Isosceles Triangle"
            description="Given: Equal sides = 13 units, Base = 10 units"
            calculation="Height = √(13² - (10/2)²) = √(169 - 25) = √144 = 12 units"
            result="The height of the isosceles triangle is 12 units"
          />
        </div>
      </SEOSection>

      <SEOSection title="Types of Triangles and Their Heights">
        <p>
          Different types of triangles have specific properties related to their heights:
        </p>

        <h3>Equilateral Triangle</h3>
        <SEOList items={[
          'All three sides are equal',
          'All three heights are equal',
          'Height = (side × √3) / 2',
          'Height is always inside the triangle'
        ]} />

        <h3>Isosceles Triangle</h3>
        <SEOList items={[
          'Two sides are equal',
          'Height from vertex to base bisects the base',
          'Height creates two congruent right triangles',
          'Height is inside the triangle'
        ]} />

        <h3>Scalene Triangle</h3>
        <SEOList items={[
          'All three sides are different',
          'All three heights are different',
          'Height may be inside or outside depending on angles',
          'Requires Heron\'s formula or trigonometry'
        ]} />

        <h3>Right Triangle</h3>
        <SEOList items={[
          'One angle is 90°',
          'The two legs are perpendicular heights to each other',
          'Height to hypotenuse requires different calculation',
          'Area = (1/2) × leg1 × leg2'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Calculating triangle height is essential in many practical applications:
        </p>
        <SEOList items={[
          'Architecture: Calculating roof heights, gable dimensions, and structural supports',
          'Engineering: Designing trusses, bridges, and load-bearing structures',
          'Surveying: Measuring land elevations and terrain heights',
          'Construction: Determining material quantities and structural integrity',
          'Art and Design: Creating perspective drawings and geometric patterns',
          'Navigation: Calculating distances and elevations',
          'Physics: Analyzing forces, vectors, and mechanical systems'
        ]} />
      </SEOSection>

      <SEOSection title="How to Find the Height of a Triangle with Different Methods">
        <p>
          Learning how to find the height of a triangle depends on what information you have. Our calculator 
          intelligently handles different input combinations to determine the best method:
        </p>

        <h3>Method 1: How to Find Height from Base and Area</h3>
        <p>
          This is the simplest method when you know the base and area. The formula is straightforward: 
          Height = 2 × Area / Base. This method works for any triangle type and is the most common way 
          to find the height of a triangle.
        </p>

        <h3>Method 2: How to Find Height from Three Sides (Heron's Formula)</h3>
        <p>
          When you know all three sides, the calculator first uses Heron's formula to calculate the area, 
          then determines the height. This method works for any triangle and doesn't require angles. 
          It's particularly useful when you only have side measurements.
        </p>

        <h3>Method 3: How to Find Height Using Trigonometry</h3>
        <p>
          When you know the base, one side, and the angle between them, the calculator uses trigonometry. 
          The height is calculated as: Height = Side × sin(Angle). This is particularly useful for 
          non-right triangles and is an essential method to know when learning how to find the height of a triangle.
        </p>

        <h3>Method 4: How to Find Height from Base and Two Sides</h3>
        <p>
          For isosceles triangles, if you know the base and the equal sides, the calculator uses the 
          Pythagorean theorem. For scalene triangles with all three sides, it uses Heron's formula. 
          Both methods are effective ways to find the height of a triangle.
        </p>
      </SEOSection>

      <SEOSection title="Related Calculators">
        <p>
          Explore these related geometry calculators to solve more triangle and geometric problems:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('area')} for calculating triangle areas`,
          `Our ${createInternalLink('herons-formula', 'Heron\'s Formula Calculator')} for area from three sides`,
          `Our ${createInternalLink('isosceles-triangle', 'Isosceles Triangle Calculator')} for isosceles triangle properties`,
          `Our ${createInternalLink('right-triangle', 'Right Triangle Calculator')} for right triangle calculations`,
          `Our ${createInternalLink('equilateral-triangle', 'Equilateral Triangle Calculator')} for equilateral triangles`,
          `Our ${createInternalLink('pythagorean-theorem', 'Pythagorean Theorem Calculator')} for right triangle sides`
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "How to find the height of a triangle?",
            answer: "To find the height of a triangle, you can use several methods depending on what information you have: (1) If you know the base and area, use Height = 2 × Area / Base. (2) If you know three sides, use Heron's formula to find the area first, then calculate height. (3) If you know the base, one side, and an angle, use trigonometry: Height = Side × sin(Angle). (4) For isosceles triangles, use the Pythagorean theorem: Height = √(side² - (base/2)²)."
          },
          {
            question: "What is the height of a triangle?",
            answer: "The height (or altitude) of a triangle is the perpendicular distance from a vertex to the line containing the opposite side (base). It forms a right angle with the base and is used to calculate the triangle's area. Learning how to find the height of a triangle is essential for solving many geometry problems."
          },
          {
            question: "How do you find the height of a triangle with base and area?",
            answer: "The simplest method to find the height of a triangle when you know the base and area is: Height = 2 × Area / Base. This formula works for any triangle type and is the most straightforward way to find the height of a triangle."
          },
          {
            question: "How to find the height of a triangle from three sides?",
            answer: "To find the height of a triangle from three sides, first use Heron's formula to find the area: Calculate semi-perimeter s = (a+b+c)/2, then Area = √[s(s-a)(s-b)(s-c)]. Then calculate height: Height = 2 × Area / Base, where the base is one of the three sides. This method is useful when you only have side measurements."
          },
          {
            question: "How to find the height of a triangle without the area?",
            answer: "Yes, you can find the height of a triangle without knowing the area! If you know the base, one side, and the angle between them, you can use trigonometry: Height = Side × sin(Angle). For isosceles triangles, you can use the Pythagorean theorem: Height = √(side² - (base/2)²). These are alternative methods for how to find the height of a triangle when area is unknown."
          },
          {
            question: "What is the difference between height and altitude?",
            answer: "Height and altitude are the same thing in triangles. Both refer to the perpendicular distance from a vertex to the opposite side. The term 'altitude' is more commonly used in formal geometry, while 'height' is more common in everyday usage."
          },
          {
            question: "How many heights does a triangle have?",
            answer: "Every triangle has three heights, one from each vertex. All three heights intersect at a point called the orthocenter. The orthocenter can be inside, outside, or on the triangle depending on the triangle type."
          },
          {
            question: "What is the height of an equilateral triangle?",
            answer: "For an equilateral triangle with side length 'a', the height is: Height = (a × √3) / 2. All three heights are equal in an equilateral triangle, and they all intersect at the same point (the orthocenter, centroid, and circumcenter all coincide)."
          },
          {
            question: "How to find the height of an isosceles triangle?",
            answer: "To find the height of an isosceles triangle with equal sides 'a' and base 'b', use the formula: Height = √(a² - (b/2)²). This uses the Pythagorean theorem, as the height bisects the base and creates two congruent right triangles. This is a specific method for how to find the height of a triangle when you know it's isosceles."
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}

