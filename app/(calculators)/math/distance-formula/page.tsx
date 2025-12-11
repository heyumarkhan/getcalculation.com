import DistanceFormulaCalculator from '../../../_components/calculators/DistanceFormulaCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function DistanceFormulaPage() {
  return (
    <CalculatorPageTemplate
      title="Distance Formula Calculator - Find Distance Between Two Points"
      description="Calculate the distance between two points instantly using the distance formula. Free online calculator with step-by-step solutions for geometry homework, engineering projects, and coordinate calculations."
      calculator={<DistanceFormulaCalculator />}
      slug="math/distance-formula"
      category="Geometry"
      features={[
        "Calculate distance between two points using the distance formula",
        "Step-by-step calculation solutions",
        "Works with any coordinate values",
        "Instant results with high precision",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Distance Formula Calculator">
        <p>
          Our distance formula calculator makes finding the distance between two points on a coordinate plane quick and easy. Simply enter the coordinates of both points, and our calculator will instantly compute the distance using the distance formula.
        </p>
        <SEOList items={[
          "Enter Point 1: Input the x and y coordinates for your first point (x₁, y₁) into the calculator.",
          "Enter Point 2: Input the x and y coordinates for your second point (x₂, y₂) into the calculator.",
          "Calculate: Click the 'Calculate Distance' button to get your result instantly.",
          "View Results: The calculator displays the distance along with detailed step-by-step calculations showing how the distance formula was applied, including all intermediate steps and mathematical operations."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Distance Formula: What Is It?">
        <p>
          The distance formula is a fundamental equation in coordinate geometry used to calculate the straight-line distance between two points on a Cartesian coordinate plane. Derived from the Pythagorean theorem, the distance formula is essential for measuring lengths, distances, and determining spatial relationships in mathematics, physics, engineering, and many real-world applications.
        </p>
        
        <p>
          Whether you're solving geometry problems, calculating distances in navigation, determining object positions in computer graphics, or working on engineering designs, understanding and using the distance formula is a critical skill. Our calculator simplifies this process by automatically applying the formula and showing you exactly how the calculation works.
        </p>
      </SEOSection>

      <SEOSection title="The Distance Formula Explained">
        <p>
          The distance formula calculates the distance between two points by finding the length of the line segment connecting them. This formula is derived from the Pythagorean theorem, which states that in a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.
        </p>
        
        <SEOFormula 
          formula="d = √[(x₂ - x₁)² + (y₂ - y₁)²]"
          description="Distance formula, where d is the distance, (x₁, y₁) is the first point, and (x₂, y₂) is the second point. The formula calculates the square root of the sum of the squared differences in x-coordinates and y-coordinates."
        />
        
        <h3>Breaking Down the Distance Formula</h3>
        <p>
          Let's examine each component of the distance formula:
        </p>
        <SEOList items={[
          "d: The distance between the two points (the result we're calculating).",
          "(x₁, y₁): The coordinates of the first point.",
          "(x₂, y₂): The coordinates of the second point.",
          "(x₂ - x₁): The horizontal distance (difference in x-coordinates) between the two points.",
          "(y₂ - y₁): The vertical distance (difference in y-coordinates) between the two points.",
          "²: Squaring the differences ensures we always work with positive values and prepares for the Pythagorean theorem application.",
          "√: The square root operation converts the squared distance back to the actual linear distance."
        ]} />
        
        <h3>Why the Distance Formula Works</h3>
        <p>
          The distance formula works because any two points on a coordinate plane can be connected by a line segment that forms the hypotenuse of a right triangle. The horizontal distance (x₂ - x₁) and vertical distance (y₂ - y₁) form the two legs of this right triangle. By applying the Pythagorean theorem, we find that the hypotenuse (the distance) equals the square root of the sum of the squares of these two legs.
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Distance: Step-by-Step Examples">
        <p>
          Let's work through practical examples to demonstrate how the distance formula works. While our calculator does this instantly, understanding the process helps build mathematical confidence.
        </p>
        
        <SEOExample
          title="Example 1: Calculate Distance Between Two Points"
          description="Problem: Find the distance between Point A (3, 4) and Point B (7, 1)."
          calculation="Using the distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]\nStep 1: Calculate differences\n  Δx = 7 - 3 = 4\n  Δy = 1 - 4 = -3\nStep 2: Square the differences\n  (Δx)² = 4² = 16\n  (Δy)² = (-3)² = 9\nStep 3: Add the squares\n  16 + 9 = 25\nStep 4: Take the square root\n  d = √25 = 5"
          result="Answer: The distance between points (3, 4) and (7, 1) is 5 units."
        />

        <SEOExample
          title="Example 2: Distance with Negative Coordinates"
          description="Problem: Find the distance between Point A (-2, 3) and Point B (4, -1)."
          calculation="Using the distance formula: d = √[(4 - (-2))² + (-1 - 3)²]\nStep 1: Calculate differences\n  Δx = 4 - (-2) = 6\n  Δy = -1 - 3 = -4\nStep 2: Square the differences\n  (Δx)² = 6² = 36\n  (Δy)² = (-4)² = 16\nStep 3: Add the squares\n  36 + 16 = 52\nStep 4: Take the square root\n  d = √52 ≈ 7.21"
          result="Answer: The distance between points (-2, 3) and (4, -1) is approximately 7.21 units."
        />

        <SEOExample
          title="Example 3: Real-World Application"
          description="Problem: A delivery truck is at location (5, 12) on a city grid. The delivery destination is at (17, 12). How far must the truck travel (in grid units)?"
          calculation="Using the distance formula: d = √[(17 - 5)² + (12 - 12)²]\nStep 1: Calculate differences\n  Δx = 17 - 5 = 12\n  Δy = 12 - 12 = 0\nStep 2: Square the differences\n  (Δx)² = 12² = 144\n  (Δy)² = 0² = 0\nStep 3: Add the squares\n  144 + 0 = 144\nStep 4: Take the square root\n  d = √144 = 12"
          result="Answer: The truck must travel 12 grid units. This is a horizontal line, so the distance equals the difference in x-coordinates."
        />
      </SEOSection>

      <SEOSection title="Why Is the Distance Formula Important? Real-World Applications">
        <p>
          The distance formula has countless practical applications across various fields and everyday situations. Understanding how to calculate distance between points is essential in many professional and academic contexts.
        </p>
        <SEOList items={[
          "Mathematics and Geometry: The distance formula is fundamental for calculating perimeters, finding lengths of sides in polygons, determining triangle types, and solving various geometric problems. It's also used in coordinate geometry proofs and constructions.",
          "Physics and Engineering: Physicists use the distance formula to calculate displacement, determine positions of moving objects, and analyze motion. Engineers use it in structural design, ensuring proper spacing between components, calculating material lengths, and designing layouts.",
          "Computer Graphics and Game Development: Programmers use the distance formula for collision detection, calculating sprite movement distances, determining object proximity, implementing field-of-view calculations, and creating realistic animations in video games and simulations.",
          "Navigation and GIS (Geographic Information Systems): While GPS uses more complex calculations for Earth's curved surface, the distance formula provides excellent approximations for short distances and is used in mapping software, route planning, and location-based services.",
          "Architecture and Construction: Architects use the distance formula to calculate dimensions, verify blueprint measurements, determine material quantities, and ensure proper spacing between structural elements.",
          "Data Science and Machine Learning: The distance formula forms the basis for various distance metrics used in clustering algorithms (like k-means), nearest neighbor classification, and other machine learning techniques.",
          "Robotics: Robots use distance calculations for path planning, obstacle avoidance, determining positions, and navigating through spaces."
        ]} />
      </SEOSection>

      <SEOSection title="Special Cases of the Distance Formula">
        <p>
          In certain situations, the distance formula simplifies significantly. Understanding these special cases can make calculations faster and help you recognize patterns:
        </p>
        <SEOList items={[
          "Horizontal Lines: When two points have the same y-coordinate (y₁ = y₂), the distance formula simplifies to d = |x₂ - x₁|. The distance is simply the absolute difference of the x-coordinates.",
          "Vertical Lines: When two points have the same x-coordinate (x₁ = x₂), the distance formula simplifies to d = |y₂ - y₁|. The distance is simply the absolute difference of the y-coordinates.",
          "Diagonal at 45 Degrees: When the horizontal and vertical distances are equal (|x₂ - x₁| = |y₂ - y₁|), the distance can be calculated as d = |x₂ - x₁|√2, which simplifies the square root calculation.",
          "Same Point: When both points are identical (x₁ = x₂ and y₁ = y₂), the distance is always 0, as expected."
        ]} />
      </SEOSection>

      <SEOSection title="Relationship Between Distance Formula and Other Concepts">
        <p>
          The distance formula is closely related to several other important mathematical concepts:
        </p>
        <SEOList items={[
          "Pythagorean Theorem: The distance formula is essentially the Pythagorean theorem applied to coordinate geometry. The horizontal and vertical distances form the legs of a right triangle, and the distance is the hypotenuse.",
          "Midpoint: The midpoint formula finds the center point between two points, while the distance formula finds the length of the line segment connecting them. Both use the same coordinate inputs.",
          "Circle Equation: The distance formula is used to derive the equation of a circle. A circle is defined as all points equidistant (using the distance formula) from a center point.",
          "Slope: While distance measures the length of a line segment, slope measures its steepness. Both describe properties of the line connecting two points."
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes to Avoid">
        <p>
          When using the distance formula, there are several common errors to watch out for:
        </p>
        <SEOList items={[
          "Forgetting to Square the Differences: Always square both (x₂ - x₁) and (y₂ - y₁) before adding them. Squaring ensures positive values and is essential for the Pythagorean theorem application.",
          "Not Taking the Square Root: After adding the squared differences, don't forget to take the square root. The sum of squares is not the distance—the square root of that sum is the distance.",
          "Mixing Up Coordinates: Make sure you subtract coordinates consistently. Use (x₂ - x₁) and (y₂ - y₁), not (x₁ - x₂) and (y₁ - y₂) mixed together. (Note: Due to squaring, using the wrong order still gives the correct answer, but it's good practice to be consistent.)",
          "Ignoring Negative Signs: When calculating differences, pay attention to negative coordinates. For example, (x₂ - x₁) when x₁ is negative becomes subtraction of a negative, which is addition.",
          "Unit Confusion: Make sure all coordinates use the same units. If one point is in meters and another in feet, convert them first before calculating distance.",
          "Forgetting to Include All Steps: When showing work, include all steps: differences, squaring, summing, and taking the square root. This helps catch errors and makes your work easier to follow."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the distance formula?",
            answer: "The distance formula is d = √[(x₂ - x₁)² + (y₂ - y₁)²], which calculates the straight-line distance between two points (x₁, y₁) and (x₂, y₂) on a coordinate plane. It's derived from the Pythagorean theorem."
          },
          {
            question: "Why does the distance formula work?",
            answer: "The distance formula works because any two points can be connected by a line segment that forms the hypotenuse of a right triangle. The horizontal distance (x₂ - x₁) and vertical distance (y₂ - y₁) form the triangle's legs. The Pythagorean theorem then gives us the hypotenuse length, which is the distance."
          },
          {
            question: "Does the order of points matter in the distance formula?",
            answer: "No, the order doesn't matter. Because we square the differences, (x₂ - x₁)² equals (x₁ - x₂)², and (y₂ - y₁)² equals (y₁ - y₂)². So d = √[(x₂ - x₁)² + (y₂ - y₁)²] gives the same result as d = √[(x₁ - x₂)² + (y₁ - y₂)²]."
          },
          {
            question: "Can the distance formula give a negative result?",
            answer: "No, distance is always positive (or zero if the points are the same). Since we square the differences before taking the square root, the result is always non-negative. Distance represents a length, which cannot be negative."
          },
          {
            question: "How do I calculate distance in 3D space?",
            answer: "For three-dimensional space, the distance formula extends to d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]. Simply add the squared difference in z-coordinates to the 2D formula."
          },
          {
            question: "What units does the distance formula use?",
            answer: "The distance formula uses whatever units your coordinates are in. If your coordinates are in meters, the distance will be in meters. If they're in feet, the distance will be in feet. Always ensure both points use the same units."
          },
          {
            question: "Is the distance formula the same as the Pythagorean theorem?",
            answer: "Yes, essentially. The distance formula is the Pythagorean theorem applied to coordinate geometry. The Pythagorean theorem states that in a right triangle, a² + b² = c², where c is the hypotenuse. The distance formula applies this to find the hypotenuse (distance) when the legs are the horizontal and vertical distances between two points."
          },
          {
            question: "When should I use the distance formula vs. other distance calculations?",
            answer: "Use the distance formula for straight-line (Euclidean) distances on a flat plane. For curved surfaces like Earth, use formulas like the Haversine formula. For city navigation with roads, actual travel distance will be longer than the straight-line distance calculated by the distance formula."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          If you're working with coordinate geometry and distances, you might find these related calculators helpful:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('midpoint', 'Midpoint Calculator')} finds the center point between two coordinates.`,
          `The ${createInternalLink('slope', 'Slope Calculator')} calculates the slope of a line connecting two points.`,
          `For more coordinate geometry, check out our ${createInternalLink('lineSegment', 'Line Segment Length Calculator')} which also calculates distances between points.`,
          `The ${createInternalLink('circle-equation', 'Circle Equation Calculator')} uses the distance formula concept to work with circle equations.`
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The distance formula is a fundamental tool in coordinate geometry that enables you to calculate the straight-line distance between any two points. Derived from the Pythagorean theorem, this elegant formula has wide-ranging applications in mathematics, physics, engineering, computer science, and everyday problem-solving.
        </p>
        <p>
          Understanding how to use the distance formula manually is valuable for building mathematical intuition, but for quick, accurate, and error-free calculations, our <strong>Distance Formula Calculator</strong> provides instant results with detailed step-by-step explanations. Whether you're solving geometry homework, planning a project, or working on professional calculations, this tool helps you focus on understanding concepts rather than getting bogged down in arithmetic.
        </p>
        <p>
          Remember, the distance formula d = √[(x₂ - x₁)² + (y₂ - y₁)²] is your key to measuring distances on coordinate planes. With practice and our calculator, you'll be able to solve distance problems confidently in any context.
        </p>
        <p>
          Ready to explore more coordinate geometry? Use our {createInternalLink('midpoint', 'Midpoint Calculator')} to find center points, our {createInternalLink('slope', 'Slope Calculator')} to determine line steepness, or check out other geometry calculators for comprehensive geometric problem-solving.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}

