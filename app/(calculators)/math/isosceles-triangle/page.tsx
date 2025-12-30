import { Metadata } from 'next';
import IsoscelesTriangleCalculator from '../../../_components/calculators/IsoscelesTriangleCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Isosceles Triangle Calculator - Find Sides, Angles, Area & Height',
  description: 'Calculate all properties of an isosceles triangle including sides, angles, area, perimeter, and height. Step-by-step solutions for any combination of known values.',
  keywords: ['isosceles triangle', 'triangle calculator', 'isosceles triangle calculator', 'triangle area', 'triangle height', 'base angles', 'vertex angle', 'geometry', 'triangle properties'],
  openGraph: {
    title: 'Isosceles Triangle Calculator - Find Sides, Angles, Area & Height',
    description: 'Calculate all properties of an isosceles triangle including sides, angles, area, perimeter, and height. Step-by-step solutions for any combination of known values.',
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

export default function IsoscelesTrianglePage() {
  return (
    <CalculatorPageTemplate
      title="Isosceles Triangle Calculator - Find Sides, Angles, Area & Height"
      description="Calculate all properties of an isosceles triangle including sides, angles, area, perimeter, and height. Step-by-step solutions for any combination of known values."
      calculator={<IsoscelesTriangleCalculator />}
      slug="math/isosceles-triangle"
      category="Geometry"
      features={[
        "Calculate missing sides and angles",
        "Find area and perimeter",
        "Calculate height from any known values",
        "Works with multiple input combinations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      
      <SEOSection title="Understanding Isosceles Triangles">
        <p>
          An isosceles triangle is a triangle with at least two equal sides. The two equal sides are called legs, 
          and the third side is called the base. Isosceles triangles have special properties that make calculations 
          easier than general triangles.
        </p>
        
        <h3>Key Properties of Isosceles Triangles</h3>
        <SEOList items={[
          'Two sides are equal in length (the legs)',
          'The base angles (angles at the base) are equal',
          'The vertex angle (angle opposite the base) is different',
          'The height bisects the base and the vertex angle',
          'The height creates two congruent right triangles',
          'Sum of all angles equals 180°'
        ]} />

        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <p className="font-mono text-center text-lg">
            Base Angle + Base Angle + Vertex Angle = 180°
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            Since base angles are equal: 2 × Base Angle + Vertex Angle = 180°
          </p>
        </div>
      </SEOSection>

      <SEOSection title="How to Use the Isosceles Triangle Calculator">
        <p>
          Our calculator can solve for any missing properties of an isosceles triangle when you provide at least 
          2 known values. The calculator automatically determines which method to use based on your inputs.
        </p>

        <h3>Supported Input Combinations</h3>
        <SEOList items={[
          'Two equal sides and base',
          'Base and height',
          'Equal side and height',
          'Base and base angle',
          'Equal side and base angle',
          'Equal side and vertex angle'
        ]} />

        <h3>Step-by-Step Process</h3>
        <SEOList items={[
          'Enter at least 2 known values in the input fields',
          'Leave unknown values empty',
          'Click &quot;Calculate Isosceles Triangle&quot;',
          'Review the step-by-step solution',
          'Check all calculated properties (sides, angles, area, perimeter)'
        ]} />
      </SEOSection>

      <SEOSection title="Isosceles Triangle Formulas">
        <p>
          The following formulas are used to calculate properties of an isosceles triangle:
        </p>

        <h3>Height Formula</h3>
        <SEOFormula 
          formula="h = √(a² - (b/2)²)"
          description="Where a is the equal side length and b is the base"
        />

        <h3>Area Formula</h3>
        <SEOFormula 
          formula="Area = (1/2) × base × height"
          description="Standard triangle area formula"
        />

        <h3>Perimeter Formula</h3>
        <SEOFormula 
          formula="Perimeter = 2a + b"
          description="Where a is the equal side and b is the base"
        />

        <h3>Base Angle Formula</h3>
        <SEOFormula 
          formula="Base Angle = arccos((b/2) / a)"
          description="Using cosine law in the right triangle formed by the height"
        />

        <h3>Vertex Angle Formula</h3>
        <SEOFormula 
          formula="Vertex Angle = 180° - 2 × Base Angle"
          description="Since all angles sum to 180°"
        />
      </SEOSection>

      <SEOSection title="Example Problems">
        <div className="space-y-4">
          <SEOExample
            title="Example 1: Find Height and Area"
            description="Given: Equal sides = 10 units, Base = 12 units"
            calculation="Height = √(10² - (12/2)²) = √(100 - 36) = √64 = 8 units"
            result="Area = (1/2) × 12 × 8 = 48 square units"
          />
          
          <SEOExample
            title="Example 2: Find Base from Height"
            description="Given: Equal side = 13 units, Height = 12 units"
            calculation="Base/2 = √(13² - 12²) = √(169 - 144) = √25 = 5"
            result="Base = 2 × 5 = 10 units"
          />

          <SEOExample
            title="Example 3: Find Angles from Base and Equal Side"
            description="Given: Equal side = 8 units, Base = 6 units"
            calculation="Base angle = arccos(3/8) ≈ 67.98°"
            result="Vertex angle = 180° - 2 × 67.98° = 44.04°"
          />
        </div>
      </SEOSection>

      <SEOSection title="Special Cases of Isosceles Triangles">
        <p>
          Some isosceles triangles have additional special properties:
        </p>

        <h3>Isosceles Right Triangle (45-45-90)</h3>
        <SEOList items={[
          'Two equal legs and a right angle at the vertex',
          'Base angles are 45° each',
          'Vertex angle is 90°',
          'Hypotenuse = leg × √2',
          'Common in squares and octagons'
        ]} />

        <h3>Equilateral Triangle</h3>
        <SEOList items={[
          'All three sides are equal',
          'All three angles are 60°',
          'Special case of isosceles triangle',
          'Most symmetric triangle'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Isosceles triangles are commonly found in many practical applications:
        </p>
        <SEOList items={[
          'Architecture: Roof designs, gable ends, and structural supports',
          'Engineering: Truss systems and bridge designs',
          'Art and Design: Symmetrical patterns and decorative elements',
          'Navigation: Calculating distances and bearings',
          'Physics: Analyzing forces and vectors in equilibrium',
          'Computer Graphics: 3D modeling and rendering'
        ]} />
      </SEOSection>

      <SEOSection title="Calculating with Different Input Combinations">
        <p>
          Our calculator intelligently handles different input combinations:
        </p>

        <h3>Two Equal Sides and Base</h3>
        <p>
          When you know the two equal sides and the base, the calculator uses the Pythagorean theorem 
          to find the height, then calculates all angles and properties.
        </p>

        <h3>Base and Height</h3>
        <p>
          When you know the base and height, the calculator finds the equal sides using the Pythagorean 
          theorem, then calculates all angles.
        </p>

        <h3>Base and Base Angle</h3>
        <p>
          When you know the base and one base angle, the calculator uses trigonometry to find the 
          equal sides and height, then calculates the vertex angle.
        </p>

        <h3>Equal Side and Vertex Angle</h3>
        <p>
          When you know one equal side and the vertex angle, the calculator finds the base angles 
          (which are equal), then calculates the base and height using trigonometry.
        </p>
      </SEOSection>

      <SEOSection title="Related Calculators">
        <p>
          Explore these related geometry calculators to solve more triangle and geometric problems:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('right-triangle', 'Right Triangle Calculator')} for right triangle calculations`,
          `Our ${createInternalLink('triangle-45-45-90', '45-45-90 Triangle Calculator')} for special right triangles`,
          `Our ${createInternalLink('area')} for calculating triangle areas`,
          `Our ${createInternalLink('herons-formula', 'Heron&apos;s Formula Calculator')} for area from three sides`,
          `Our ${createInternalLink('pythagorean-theorem', 'Pythagorean Theorem Calculator')} for right triangle sides`
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is an isosceles triangle?",
            answer: "An isosceles triangle is a triangle with at least two equal sides. The two equal sides are called legs, and the third side is called the base. The base angles are equal, and the vertex angle is different."
          },
          {
            question: "How do you find the height of an isosceles triangle?",
            answer: "The height can be found using the Pythagorean theorem: h = √(a² - (b/2)²), where a is the equal side length and b is the base. The height bisects the base and creates two congruent right triangles."
          },
          {
            question: "Are the base angles always equal in an isosceles triangle?",
            answer: "Yes, in an isosceles triangle, the base angles (the angles at the base) are always equal. This is a fundamental property of isosceles triangles."
          },
          {
            question: "What is the difference between an isosceles triangle and an equilateral triangle?",
            answer: "An isosceles triangle has two equal sides, while an equilateral triangle has all three sides equal. An equilateral triangle is a special case of an isosceles triangle where all sides and angles are equal (60° each)."
          },
          {
            question: "How do you calculate the area of an isosceles triangle?",
            answer: "The area of an isosceles triangle is calculated using the standard triangle area formula: Area = (1/2) × base × height. You can also use Heron&apos;s formula if you know all three side lengths."
          },
          {
            question: "Can an isosceles triangle be a right triangle?",
            answer: "Yes, an isosceles right triangle (45-45-90 triangle) has two equal legs and a right angle at the vertex. The base angles are 45° each, and the hypotenuse is √2 times the length of each leg."
          },
          {
            question: "What is the vertex angle in an isosceles triangle?",
            answer: "The vertex angle is the angle opposite the base, formed by the two equal sides. It can be calculated as: Vertex Angle = 180° - 2 × Base Angle, since all angles in a triangle sum to 180°."
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
