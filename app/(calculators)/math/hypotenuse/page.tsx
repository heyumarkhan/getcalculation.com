import HypotenuseCalculator from '../../../_components/calculators/HypotenuseCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function HypotenusePage() {
  return (
    <CalculatorPageTemplate
      title="Hypotenuse Calculator - Calculate Right Triangle Hypotenuse Instantly"
      description="Calculate the hypotenuse of a right triangle using the Pythagorean theorem instantly. Free hypotenuse calculator with step-by-step solutions for any right triangle dimensions."
      calculator={<HypotenuseCalculator />}
      slug="math/hypotenuse"
      category="Geometry"
      features={[
        "Calculate hypotenuse from two legs using Pythagorean theorem",
        "Step-by-step calculation solutions",
        "Works with any right triangle dimensions",
        "Instant results with high precision",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Hypotenuse Calculator">
        <p>
          Our hypotenuse calculator makes finding the hypotenuse of a right triangle quick and easy using the Pythagorean theorem. The hypotenuse is the longest side of a right triangle, opposite the right angle. Simply enter the lengths of the two legs (the sides that form the right angle), and our calculator will instantly compute the hypotenuse.
        </p>
        <SEOList items={[
          "Enter Leg a: Input the length of the first leg (one of the shorter sides that forms the right angle).",
          "Enter Leg b: Input the length of the second leg (the other shorter side that forms the right angle).",
          "Calculate: Click the 'Calculate Hypotenuse' button to get your result instantly.",
          "View Results: The calculator displays the hypotenuse length along with detailed step-by-step calculations showing how the Pythagorean theorem was applied, including all intermediate steps and mathematical operations."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Hypotenuse: What Is It?">
        <p>
          The hypotenuse is the longest side of a right triangle, located opposite the right angle (90°). In a right triangle, there are three sides: two legs (the shorter sides that form the right angle) and the hypotenuse (the longest side). The hypotenuse is always the side opposite the right angle and is the longest of the three sides.
        </p>
        <SEOList items={[
          "Longest Side: The hypotenuse is always the longest side of any right triangle.",
          "Opposite Right Angle: The hypotenuse is located directly opposite the 90° angle in the triangle.",
          "Pythagorean Relationship: The hypotenuse relates to the legs through the Pythagorean theorem: a² + b² = c², where c is the hypotenuse.",
          "Geometric Property: In any right triangle, the square of the hypotenuse equals the sum of the squares of the two legs.",
          "Unique Identifier: The hypotenuse uniquely identifies a right triangle along with the two legs."
        ]} />
        <p>
          Calculating the hypotenuse is essential in mathematics, geometry, trigonometry, architecture, engineering, and many real-world applications. Whether you're solving geometry problems, calculating distances, designing structures, working with right angles, or measuring diagonal distances, understanding how to find the hypotenuse is a fundamental skill.
        </p>
      </SEOSection>

      <SEOSection title="The Pythagorean Theorem Explained">
        <p>
          The hypotenuse is calculated using the Pythagorean theorem, one of the most famous and important theorems in mathematics. This theorem states that in a right triangle, the square of the hypotenuse equals the sum of the squares of the two legs.
        </p>
        
        <SEOFormula 
          formula="c = √(a² + b²)"
          description="Hypotenuse formula using the Pythagorean theorem, where c is the hypotenuse, and a and b are the lengths of the two legs. This is the most commonly used formula for calculating hypotenuse."
        />
        
        <SEOFormula 
          formula="a² + b² = c²"
          description="The classic Pythagorean theorem statement, showing the relationship between the legs and hypotenuse. This is often rearranged to solve for the hypotenuse: c = √(a² + b²)."
        />
        
        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "c: The hypotenuse—the longest side of the right triangle, opposite the right angle (the result we're calculating).",
          "a: The first leg—one of the two shorter sides that form the right angle.",
          "b: The second leg—the other shorter side that forms the right angle.",
          "²: The square operation, meaning a number is multiplied by itself (e.g., a² = a × a).",
          "√: The square root operation, which finds the number that, when squared, gives the result (e.g., √(a² + b²) finds the hypotenuse)."
        ]} />
        
        <h3>Why the Formula Works</h3>
        <p>
          The Pythagorean theorem has been proven in hundreds of different ways and is one of the most fundamental relationships in geometry. It works because in a right triangle, the geometric relationship between the sides creates a perfect mathematical balance: the area of the square on the hypotenuse equals the sum of the areas of the squares on the two legs. This elegant relationship holds true for all right triangles, regardless of their size or proportions.
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Hypotenuse: Step-by-Step Examples">
        <p>
          Let's work through practical examples to demonstrate how the Pythagorean theorem works. While our calculator does this instantly, understanding the process helps build mathematical confidence.
        </p>
        
        <SEOExample
          title="Example 1: Basic Right Triangle"
          description="Problem: Find the hypotenuse of a right triangle with legs of 3 units and 4 units."
          calculation="Given: a = 3, b = 4\nUsing the formula c = √(a² + b²):\nc = √(3² + 4²)\nc = √(9 + 16)\nc = √25\nc = 5 units"
          result="Answer: The hypotenuse is 5 units. This is a classic 3-4-5 right triangle, one of the most common Pythagorean triples."
        />

        <SEOExample
          title="Example 2: Different Leg Lengths"
          description="Problem: A right triangle has legs of 6 cm and 8 cm. What is the length of the hypotenuse?"
          calculation="Given: a = 6, b = 8\nUsing the formula c = √(a² + b²):\nc = √(6² + 8²)\nc = √(36 + 64)\nc = √100\nc = 10 cm"
          result="Answer: The hypotenuse is 10 cm. This is another common Pythagorean triple: 6-8-10."
        />

        <SEOExample
          title="Example 3: Real-World Application - Ladder Against Wall"
          description="Problem: A ladder leans against a wall. The base of the ladder is 5 feet from the wall, and the top reaches 12 feet up the wall. How long is the ladder?"
          calculation="Given: a = 5 feet (distance from wall), b = 12 feet (height on wall)\nThe ladder forms the hypotenuse of a right triangle.\nUsing the formula c = √(a² + b²):\nc = √(5² + 12²)\nc = √(25 + 144)\nc = √169\nc = 13 feet"
          result="Answer: The ladder is 13 feet long. This is the famous 5-12-13 Pythagorean triple."
        />

        <SEOExample
          title="Example 4: Non-Integer Result"
          description="Problem: Find the hypotenuse of a right triangle with legs of 2 units and 3 units."
          calculation="Given: a = 2, b = 3\nUsing the formula c = √(a² + b²):\nc = √(2² + 3²)\nc = √(4 + 9)\nc = √13\nc ≈ 3.606 units"
          result="Answer: The hypotenuse is approximately 3.606 units. Not all right triangles have integer hypotenuse lengths."
        />

        <SEOExample
          title="Example 5: Construction Application"
          description="Problem: To check if a corner is square, a carpenter measures 6 feet along one wall and 8 feet along the other wall. If the corner is perfectly square, what should the diagonal measurement be?"
          calculation="The diagonal forms the hypotenuse of a right triangle.\nGiven: a = 6 feet, b = 8 feet\nUsing the formula c = √(a² + b²):\nc = √(6² + 8²)\nc = √(36 + 64)\nc = √100\nc = 10 feet"
          result="Answer: The diagonal should measure exactly 10 feet if the corner is perfectly square. This is the 3-4-5 triangle scaled by a factor of 2."
        />
      </SEOSection>

      <SEOSection title="Why Is Calculating Hypotenuse Important? Real-World Applications">
        <p>
          Calculating the hypotenuse has countless practical applications across various industries and everyday situations. Understanding hypotenuse calculations is essential in many professional and academic contexts.
        </p>
        <SEOList items={[
          "Construction and Carpentry: Builders and carpenters use the Pythagorean theorem to ensure right angles, square corners, and accurate measurements. The 3-4-5 triangle method is commonly used to check if corners are square (90°).",
          "Architecture and Engineering: Architects and engineers calculate hypotenuses when designing structures, determining diagonal supports, calculating beam lengths, and ensuring structural integrity. Right angles are fundamental to most architectural designs.",
          "Surveying and Land Measurement: Surveyors use hypotenuse calculations to measure distances across terrain, determine property boundaries, and calculate inaccessible distances. The hypotenuse represents the direct distance between two points.",
          "Navigation and GPS: Navigation systems use the Pythagorean theorem (extended to 3D) to calculate distances between coordinates. The hypotenuse represents the straight-line distance between two points on a map.",
          "Manufacturing and Quality Control: Manufacturers use hypotenuse calculations to verify right angles, check squareness of parts, and ensure dimensional accuracy. Quality control relies on precise angle and distance measurements.",
          "Sports and Recreation: The hypotenuse calculation appears in sports field design, calculating diagonal distances, determining optimal angles, and designing playing surfaces. Basketball courts, soccer fields, and other sports venues use these calculations.",
          "Education and Academic Studies: Students use hypotenuse calculations in geometry, trigonometry, pre-calculus, and physics courses. Understanding the Pythagorean theorem is fundamental to advanced mathematical and scientific studies.",
          "Everyday Life: From measuring diagonal TV screen sizes to determining the shortest distance between two points, hypotenuse calculations appear in numerous daily situations involving right angles and distances."
        ]} />
      </SEOSection>

      <SEOSection title="Special Cases: Common Pythagorean Triples">
        <p>
          A Pythagorean triple is a set of three positive integers (a, b, c) that satisfy the equation a² + b² = c². Some common triples are worth remembering:
        </p>
        <SEOList items={[
          "3-4-5: The most famous Pythagorean triple. If legs are 3 and 4, the hypotenuse is 5. This works for any multiple (6-8-10, 9-12-15, etc.).",
          "5-12-13: Another common triple, useful in many practical applications.",
          "8-15-17: Less common but still frequently encountered.",
          "7-24-25: Another useful triple for calculations.",
          "9-40-41: Less common but mathematically interesting.",
          "Isosceles Right Triangle: When both legs are equal (a = b), the hypotenuse is a√2. This is a 45-45-90 triangle, where if each leg is 1, the hypotenuse is √2 ≈ 1.414."
        ]} />
        <p>
          Recognizing these triples can help you quickly identify hypotenuse lengths without calculation, and they're useful for checking your work.
        </p>
      </SEOSection>

      <SEOSection title="Relationship Between Hypotenuse and Legs">
        <p>
          Understanding the relationships between the hypotenuse and legs is key to working confidently with right triangles:
        </p>
        <SEOList items={[
          "Always Longest: The hypotenuse is always longer than either leg. In fact, c > a and c > b always holds true.",
          "Proportional Scaling: If you multiply all sides by the same factor, the triangle remains similar. If a right triangle has sides 3-4-5, then 6-8-10, 9-12-15, etc., are also right triangles.",
          "Sum of Legs: The hypotenuse is always less than the sum of the two legs (c < a + b), which is true for any triangle (Triangle Inequality Theorem).",
          "Special Case - Isosceles: In an isosceles right triangle (45-45-90), where a = b, the hypotenuse is a√2, making it exactly √2 times longer than each leg.",
          "Limits: As one leg approaches 0, the hypotenuse approaches the length of the other leg. As both legs become very large, the hypotenuse approaches the diagonal of a rectangle."
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes to Avoid">
        <p>
          When calculating the hypotenuse, there are several common errors to watch out for:
        </p>
        <SEOList items={[
          "Forgetting to Square: The formula requires squaring each leg first, then adding, then taking the square root. Don't confuse c = a + b (which is wrong) with c = √(a² + b²).",
          "Wrong Order: The formula is c = √(a² + b²), not c = a² + b². You must take the square root of the sum, not just add the squares.",
          "Using Wrong Sides: Make sure you're using the two legs (the sides that form the right angle), not the hypotenuse and a leg. The hypotenuse is what you're solving for.",
          "Not a Right Triangle: The Pythagorean theorem only works for right triangles (triangles with a 90° angle). For other triangles, you need different formulas.",
          "Unit Confusion: Ensure both legs use the same units. If one leg is in meters and another in centimeters, convert them to the same unit before calculating.",
          "Negative Numbers: Legs must be positive. You cannot have a negative length, so negative inputs are invalid.",
          "Rounding Too Early: Keep intermediate calculations precise and only round the final answer. Rounding a² or b² too early can lead to significant errors in the final hypotenuse."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is a hypotenuse?",
            answer: "The hypotenuse is the longest side of a right triangle, located opposite the right angle (90°). It's calculated using the Pythagorean theorem: c = √(a² + b²), where a and b are the lengths of the two legs."
          },
          {
            question: "How do you find the hypotenuse of a right triangle?",
            answer: "Use the Pythagorean theorem: c = √(a² + b²). Square each leg, add the squares together, then take the square root of the sum. This gives you the hypotenuse length."
          },
          {
            question: "What is the Pythagorean theorem?",
            answer: "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of the squares of the two legs: a² + b² = c². This can be rearranged to solve for the hypotenuse: c = √(a² + b²)."
          },
          {
            question: "Can the hypotenuse be shorter than a leg?",
            answer: "No, the hypotenuse is always the longest side of a right triangle. By definition, it must be longer than either leg (c > a and c > b always)."
          },
          {
            question: "What if I have the hypotenuse and one leg?",
            answer: "You can find the other leg by rearranging the Pythagorean theorem: a = √(c² - b²) or b = √(c² - a²). However, our calculator is designed to find the hypotenuse from two legs. For finding a leg from the hypotenuse, you would need a different calculator or manually rearrange the formula."
          },
          {
            question: "Does this work for all triangles?",
            answer: "No, the Pythagorean theorem only works for right triangles (triangles with a 90° angle). For other triangles, you need different formulas like the Law of Cosines or Law of Sines."
          },
          {
            question: "What are Pythagorean triples?",
            answer: "Pythagorean triples are sets of three positive integers (a, b, c) that satisfy a² + b² = c². Common examples include 3-4-5, 5-12-13, and 8-15-17. These are useful for quick calculations and checking work."
          },
          {
            question: "How accurate is the calculator?",
            answer: "Our calculator provides results accurate to 6 decimal places. The precision is sufficient for most practical applications, including construction, engineering, and academic work."
          },
          {
            question: "Can I use this for a 45-45-90 triangle?",
            answer: "Yes! A 45-45-90 triangle is a special right triangle. If both legs are equal (a = b), then the hypotenuse is a√2. Our calculator works perfectly for this case—just enter the same value for both legs."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          If you're working with right triangles and geometry, you might find these related calculators helpful:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('pythagorean-theorem', 'Pythagorean Theorem Calculator')} provides comprehensive right triangle calculations including all sides and angles.`,
          `The ${createInternalLink('right-triangle', 'Right Triangle Calculator')} helps you calculate all properties of right triangles.`,
          `Our ${createInternalLink('diagonal-of-rectangle', 'Diagonal of a Rectangle Calculator')} uses the same Pythagorean theorem principle for rectangle diagonals.`,
          `The ${createInternalLink('distance-formula', 'Distance Formula Calculator')} calculates distances between two points using a similar concept.`,
          `Our ${createInternalLink('trigonometry', 'Trigonometry Calculator')} is useful for calculating angles and sides in right triangles using trigonometric functions.`
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Calculating the hypotenuse is a fundamental skill in geometry that has wide-ranging applications in mathematics, construction, engineering, navigation, and everyday life. Whether you're solving geometry problems, checking right angles, calculating distances, designing structures, or working with any situation involving right triangles, our <strong>Hypotenuse Calculator</strong> provides instant, accurate results with step-by-step explanations using the Pythagorean theorem.
        </p>
        <p>
          The Pythagorean theorem is one of the most elegant and important relationships in mathematics, connecting the three sides of a right triangle through a simple yet powerful equation. With our calculator, you can focus on solving your problems rather than getting bogged down in manual calculations. Remember that the formula c = √(a² + b²) only works for right triangles, and both legs must be positive values.
        </p>
        <p>
          Ready to explore more right triangle calculations? Use our {createInternalLink('pythagorean-theorem', 'Pythagorean Theorem Calculator')} for comprehensive triangle solutions, our {createInternalLink('right-triangle', 'Right Triangle Calculator')} for all triangle properties, or check out our {createInternalLink('trigonometry', 'Trigonometry Calculator')} for angle calculations.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}

