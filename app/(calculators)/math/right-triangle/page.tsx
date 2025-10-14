import RightTriangleCalculator from '../../../_components/calculators/RightTriangleCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function RightTrianglePage() {
  return (
    <CalculatorPageTemplate
      title="Right Triangle Side and Angle Calculator - Pythagorean Theorem & Trigonometry"
      description="Calculate missing sides and angles in right triangles instantly. Uses Pythagorean theorem and trigonometry to solve for any missing values with step-by-step solutions."
      calculator={<RightTriangleCalculator />}
      slug="math/right-triangle"
      category="Geometry"
      features={[
        "Calculate missing sides using Pythagorean theorem",
        "Find angles using trigonometry",
        "Step-by-step solutions",
        "Works with any combination of known values",
        "Calculates area and perimeter",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Right Triangle Calculator">
        <p>
          Our right triangle calculator can solve for any missing sides or angles when you provide at least 2 sides OR 1 side and 1 angle. The calculator automatically determines the best method to use.
        </p>
        <SEOList items={[
          "Enter Known Values: Input the lengths of any two sides, or one side and one angle.",
          "Leave Unknown Values Empty: Don&apos;t enter values for the sides or angles you want to calculate.",
          "Calculate: Click the &apos;Calculate Right Triangle&apos; button.",
          "Get Results: The calculator will show all sides, angles, area, and perimeter with step-by-step solutions."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Right Triangles">
        <p>
          A right triangle is a triangle with one 90-degree angle. The side opposite the right angle is called the hypotenuse, and the other two sides are called legs. Right triangles have special properties that make calculations easier.
        </p>
        
        <h3>Key Properties of Right Triangles</h3>
        <SEOList items={[
          "One angle is always 90° (right angle).",
          "The sum of the other two angles is 90°.",
          "The hypotenuse is the longest side.",
          "The Pythagorean theorem applies: a² + b² = c².",
          "Trigonometric ratios can be used to find missing values."
        ]} />
      </SEOSection>

      <SEOSection title="The Pythagorean Theorem">
        <p>
          The Pythagorean theorem is fundamental to right triangle calculations. It states that in a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.
        </p>
        <SEOFormula 
          formula="a² + b² = c²"
          description="Where a and b are the legs, and c is the hypotenuse"
        />
        <p>
          This theorem allows us to find any missing side when we know the other two sides.
        </p>
        <SEOExample
          title="Example: Find the hypotenuse"
          description="If the legs are 3 and 4 units long:"
          calculation="c² = 3² + 4² = 9 + 16 = 25"
          result="c = √25 = 5 units"
        />
      </SEOSection>

      <SEOSection title="Trigonometric Ratios in Right Triangles">
        <p>
          When we know one side and one angle (other than the right angle), we can use trigonometric ratios to find the missing sides.
        </p>
        <SEOList items={[
          "Sine (sin): opposite side / hypotenuse",
          "Cosine (cos): adjacent side / hypotenuse", 
          "Tangent (tan): opposite side / adjacent side"
        ]} />
        <SEOFormula 
          formula="sin(θ) = opposite/hypotenuse"
          description="Sine ratio"
        />
        <SEOFormula 
          formula="cos(θ) = adjacent/hypotenuse"
          description="Cosine ratio"
        />
        <SEOFormula 
          formula="tan(θ) = opposite/adjacent"
          description="Tangent ratio"
        />
      </SEOSection>

      <SEOSection title="Common Right Triangle Types">
        <p>
          There are several special right triangles with known ratios that make calculations easier:
        </p>
        <SEOList items={[
          "30-60-90 Triangle: Sides are in ratio 1:√3:2",
          "45-45-90 Triangle: Sides are in ratio 1:1:√2",
          "3-4-5 Triangle: A common Pythagorean triple",
          "5-12-13 Triangle: Another Pythagorean triple"
        ]} />
        <p>
          Our calculator works with any right triangle, not just these special cases.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Right triangle calculations are used extensively in many fields:
        </p>
        <SEOList items={[
          "Construction and Architecture: Calculating roof pitches, stair angles, and structural support.",
          "Navigation and Surveying: Determining distances and angles in land surveying.",
          "Physics and Engineering: Analyzing forces, vectors, and mechanical systems.",
          "Computer Graphics: 3D modeling, game development, and animation.",
          "Astronomy: Calculating distances to celestial objects.",
          "Sports: Analyzing trajectories in ball games and athletics."
        ]} />
      </SEOSection>

      <SEOSection title="Step-by-Step Calculation Methods">
        <p>
          Our calculator uses different methods depending on what information you provide:
        </p>
        
        <h3>Method 1: Two Sides Known (Pythagorean Theorem)</h3>
        <p>
          When you know two sides, the calculator uses the Pythagorean theorem to find the third side.
        </p>
        
        <h3>Method 2: One Side and One Angle Known (Trigonometry)</h3>
        <p>
          When you know one side and one angle, the calculator uses trigonometric ratios to find the missing sides.
        </p>
        
        <h3>Method 3: Mixed Information</h3>
        <p>
          The calculator intelligently combines Pythagorean theorem and trigonometry to solve complex problems.
        </p>
      </SEOSection>

      <SEOSection title="Calculating Area and Perimeter">
        <p>
          Once all sides are known, the calculator automatically computes:
        </p>
        <SEOFormula 
          formula="Area = (1/2) × base × height"
          description="For right triangles, this is (1/2) × leg₁ × leg₂"
        />
        <SEOFormula 
          formula="Perimeter = side₁ + side₂ + side₃"
          description="Sum of all three sides"
        />
      </SEOSection>

      <SEOSection title="Input Requirements and Limitations">
        <p>
          To use the calculator effectively, you need to provide:
        </p>
        <SEOList items={[
          "At least 2 sides, OR",
          "1 side and 1 angle (other than the 90° angle)",
          "All angles must be less than 90° (since one is already 90°)",
          "All side lengths must be positive numbers"
        ]} />
        <p>
          The calculator will not work if you only provide angles without any side lengths, as there would be infinite possible triangles with those angles.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between a leg and the hypotenuse?",
            answer: "In a right triangle, the hypotenuse is the side opposite the right angle and is always the longest side. The legs are the other two sides that form the right angle."
          },
          {
            question: "Can I use this calculator for non-right triangles?",
            answer: "No, this calculator is specifically designed for right triangles. For other triangles, you would need different formulas like the Law of Cosines or Law of Sines."
          },
          {
            question: "What if I know the area and one side?",
            answer: "Our current calculator requires side lengths or angles as input. If you know the area and one side, you can calculate the other leg using the area formula, then use the Pythagorean theorem."
          },
          {
            question: "How accurate are the calculations?",
            answer: "The calculator provides results to 6 decimal places for sides and 2 decimal places for angles, giving you high precision for most practical applications."
          },
          {
            question: "Can I use this for 3D problems?",
            answer: "This calculator is designed for 2D right triangles. For 3D problems involving right triangles, you would need to break them down into 2D components first."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding right triangles is essential for geometry, trigonometry, and many real-world applications. Our <strong>Right Triangle Calculator</strong> makes it easy to solve for any missing values using proven mathematical methods.
        </p>
        <p>
          Ready to explore more geometric concepts? Check out our {createInternalLink('area')} calculator for other shapes, or use our {createInternalLink('trigonometry')} calculator for advanced trigonometric functions.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}
