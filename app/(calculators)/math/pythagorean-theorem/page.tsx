import { Metadata } from 'next';
import PythagoreanTheoremCalculator from '../../../_components/calculators/PythagoreanTheoremCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Pythagorean Theorem Calculator - Find Missing Side of Right Triangle',
  description: 'Calculate the length of any side of a right triangle using the Pythagorean theorem. Step-by-step solutions, triangle properties, and angle calculations.',
  keywords: ['pythagorean theorem', 'right triangle', 'hypotenuse', 'triangle calculator', 'geometry', 'a² + b² = c²', 'distance formula'],
  openGraph: {
    title: 'Pythagorean Theorem Calculator - Find Missing Side of Right Triangle',
    description: 'Calculate the length of any side of a right triangle using the Pythagorean theorem. Step-by-step solutions, triangle properties, and angle calculations.',
    type: 'website',
  },
};

export default function PythagoreanTheoremPage() {
  return (
    <CalculatorPageTemplate
      title="Pythagorean Theorem Calculator - Find Missing Side of Right Triangle"
      description="Calculate the length of any side of a right triangle using the Pythagorean theorem. Step-by-step solutions, triangle properties, and angle calculations."
      calculator={<PythagoreanTheoremCalculator />}
      slug="math/pythagorean-theorem"
      category="Geometry"
      features={[
        "Calculate any missing side of a right triangle",
        "Verify if three sides form a right triangle",
        "Step-by-step solutions with detailed explanations",
        "Triangle properties (area, perimeter, angles)",
        "Triangle classification (isosceles, scalene, etc.)",
        "Special triangle recognition (45-45-90, 3-4-5, etc.)",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      
      <SEOSection title="Understanding the Pythagorean Theorem">
        <p>
          The Pythagorean theorem is one of the most fundamental principles in geometry, 
          named after the ancient Greek mathematician Pythagoras. It states that in a right triangle, 
          the square of the length of the hypotenuse (the side opposite the right angle) is equal 
          to the sum of the squares of the lengths of the other two sides.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <p className="font-mono text-center text-lg">
            a² + b² = c²
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            Where c is the hypotenuse, and a and b are the legs
          </p>
        </div>

        <h3>Key Concepts</h3>
        <SEOList items={[
          'Right Triangle: A triangle with one 90-degree angle',
          'Hypotenuse: The longest side, opposite the right angle',
          'Legs: The two shorter sides that form the right angle',
          'The theorem only applies to right triangles',
          'It can be used to find any missing side length'
        ]} />

        <h3>Common Applications</h3>
        <SEOList items={[
          'Finding the distance between two points in coordinate geometry',
          'Calculating the diagonal of a rectangle or square',
          'Determining the length of a ladder needed to reach a certain height',
          'Navigation and GPS calculations',
          'Construction and engineering measurements'
        ]} />
      </SEOSection>

      <SEOSection title="How to Use the Pythagorean Theorem Calculator">
        <p>
          Our calculator can find any missing side of a right triangle when you know the other two sides. 
          Simply enter the known side lengths and leave the unknown side as 0, or enter all three sides 
          to verify if they form a right triangle.
        </p>

        <h3>Step-by-Step Process</h3>
        <SEOList items={[
          'Enter the lengths of two known sides',
          'Leave the unknown side as 0 (or enter all three to verify)',
          'Click "Calculate Missing Side"',
          'Review the step-by-step solution',
          'Check the triangle properties and angles'
        ]} />

        <h3>Example Problems</h3>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800">Example 1: Find the Hypotenuse</h4>
            <p className="text-blue-700">
              Given: a = 3, b = 4<br/>
              Find: c (hypotenuse)<br/>
              Solution: c = √(3² + 4²) = √(9 + 16) = √25 = 5
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800">Example 2: Find a Leg</h4>
            <p className="text-green-700">
              Given: a = 5, c = 13<br/>
              Find: b (other leg)<br/>
              Solution: b = √(13² - 5²) = √(169 - 25) = √144 = 12
            </p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Special Right Triangles">
        <p>
          Some right triangles have special properties that make calculations easier and are commonly 
          used in geometry and trigonometry.
        </p>

        <h3>45-45-90 Triangle (Isosceles Right Triangle)</h3>
        <SEOList items={[
          'Two equal legs and a hypotenuse',
          'If legs = x, then hypotenuse = x√2',
          'Angles: 45°, 45°, 90°',
          'Common in squares and octagons'
        ]} />

        <h3>30-60-90 Triangle</h3>
        <SEOList items={[
          'If short leg = x, then long leg = x√3, hypotenuse = 2x',
          'Angles: 30°, 60°, 90°',
          'Common in equilateral triangles and hexagons'
        ]} />

        <h3>3-4-5 Triangle</h3>
        <SEOList items={[
          'A Pythagorean triple: 3² + 4² = 5²',
          'Any multiple works: 6-8-10, 9-12-15, etc.',
          'Common in construction and surveying'
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators">
        <p>
          Explore these related geometry calculators to solve more triangle and geometric problems:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('triangle-45-45-90', '45-45-90 Triangle Calculator')} for special right triangles`,
          `Our ${createInternalLink('area')} for calculating triangle areas`,
          `Our ${createInternalLink('perimeter')} for triangle perimeters`,
          `Our ${createInternalLink('circle-equation')} for circle geometry`
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is the Pythagorean theorem?",
            answer: "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c²."
          },
          {
            question: "Can I use the Pythagorean theorem for any triangle?",
            answer: "No, the Pythagorean theorem only applies to right triangles (triangles with one 90-degree angle). For other triangles, you would use the Law of Cosines or Law of Sines."
          },
          {
            question: "How do I find the hypotenuse?",
            answer: "To find the hypotenuse, use the formula c = √(a² + b²) where a and b are the lengths of the other two sides."
          },
          {
            question: "How do I find a missing leg?",
            answer: "To find a missing leg, rearrange the formula: a = √(c² - b²) or b = √(c² - a²) where c is the hypotenuse."
          },
          {
            question: "What are Pythagorean triples?",
            answer: "Pythagorean triples are sets of three positive integers that satisfy the Pythagorean theorem, such as (3, 4, 5), (5, 12, 13), and (8, 15, 17)."
          },
          {
            question: "How is the Pythagorean theorem used in real life?",
            answer: "The Pythagorean theorem is used in construction, navigation, computer graphics, engineering, and many other fields where distance calculations are needed."
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
