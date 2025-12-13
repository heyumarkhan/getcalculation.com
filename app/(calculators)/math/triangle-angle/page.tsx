import TriangleAngleCalculator from '../../../_components/calculators/TriangleAngleCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink, createInternalLinkHTML } from '../../../_components/ui/SEOInternalLink';

export default function TriangleAnglePage() {
  return (
    <CalculatorPageTemplate
      title="Triangle Angle Calculator - Calculate All Triangle Angles Instantly"
      description="Calculate all angles of a triangle using multiple methods: Law of Cosines, Law of Sines, coordinates, or area formula instantly. Free triangle angle calculator with step-by-step solutions for SSS, SAS, SSA, ASA, AAS cases, coordinate-based calculation, and area-based calculation."
      calculator={<TriangleAngleCalculator />}
      slug="math/triangle-angle"
      category="Geometry"
      features={[
        "Calculate angles from three sides (SSS) using Law of Cosines",
        "Calculate angles from two sides and included angle (SAS)",
        "Calculate angles from two sides and non-included angle (SSA)",
        "Calculate angles from two angles and one side (ASA/AAS)",
        "Calculate angles from vertex coordinates (coordinate method)",
        "Calculate angles from two sides and area (area method)",
        "Step-by-step calculation solutions",
        "Supports all triangle types",
        "Multiple input methods for flexibility",
        "Instant results with high precision",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Triangle Angle Calculator">
        <p>
          Our triangle angle calculator makes finding all angles of a triangle quick and easy using the Law of Cosines and Law of Sines. Whether you have three sides, two sides and an angle, or two angles and a side, our calculator will instantly compute all three angles with detailed step-by-step solutions.
        </p>
        <SEOList items={[
          "Enter Known Values: Input the sides and/or angles you know. The calculator supports multiple input combinations:",
          "  • SSS (Side-Side-Side): Enter all three side lengths",
          "  • SAS (Side-Angle-Side): Enter two sides and the included angle",
          "  • SSA (Side-Side-Angle): Enter two sides and a non-included angle",
          "  • ASA/AAS (Angle-Side-Angle / Angle-Angle-Side): Enter two angles and one side",
          "Calculate: Click the 'Calculate Angles' button to get your results instantly.",
          "View Results: The calculator displays all three angles (A, B, and C) along with detailed step-by-step calculations showing which formula was used and how each angle was calculated, including all intermediate steps and mathematical operations."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Triangle Angles: What Are They?">
        <p>
          Triangle angles are the three interior angles formed at the vertices of a triangle. In any triangle, the sum of all three interior angles always equals 180°. Understanding how to calculate triangle angles is fundamental in geometry, trigonometry, engineering, architecture, and many practical applications.
        </p>
        <SEOList items={[
          "Sum Property: The sum of all three interior angles in any triangle equals 180° (A + B + C = 180°).",
          "Interior Angles: These are the angles formed inside the triangle at each vertex where two sides meet.",
          "Angle Types: Triangles can have acute angles (less than 90°), right angles (exactly 90°), or obtuse angles (greater than 90°).",
          "Triangle Classification: Based on angles, triangles are classified as acute (all angles < 90°), right (one angle = 90°), or obtuse (one angle > 90°).",
          "Unique Determination: Given sufficient information (sides and/or angles), all angles of a triangle can be uniquely determined using trigonometric laws."
        ]} />
        <p>
          Calculating triangle angles is essential in mathematics, geometry, trigonometry, architecture, engineering, surveying, navigation, and many real-world applications. Whether you're solving geometry problems, designing structures, calculating distances, working with triangles in any context, or verifying triangle properties, understanding how to find triangle angles is a fundamental skill.
        </p>
      </SEOSection>

      <SEOSection title="The Law of Cosines Explained">
        <p>
          The Law of Cosines is a powerful formula that relates the lengths of the sides of a triangle to the cosine of one of its angles. It's an extension of the Pythagorean theorem that works for all triangles, not just right triangles.
        </p>
        
        <SEOFormula 
          formula="a² = b² + c² - 2bc cos(A)"
          description="Law of Cosines formula for finding side a when sides b and c and angle A are known. This formula can be rearranged to find any side or angle."
        />
        
        <SEOFormula 
          formula="cos(A) = (b² + c² - a²) / (2bc)"
          description="Law of Cosines rearranged to find angle A when all three sides (a, b, c) are known. This is used in the SSS (Side-Side-Side) case."
        />
        
        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "a, b, c: The three sides of the triangle (any triangle, not just right triangles).",
          "A, B, C: The three angles opposite to sides a, b, and c respectively.",
          "cos(A): The cosine of angle A, which relates the angle to the side lengths.",
          "2bc: Twice the product of sides b and c, used in the formula.",
          "The formula works for all triangles: acute, right, and obtuse triangles."
        ]} />
        
        <h3>When to Use Law of Cosines</h3>
        <SEOList items={[
          "SSS Case: When you know all three sides, use Law of Cosines to find all three angles.",
          "SAS Case: When you know two sides and the included angle, use Law of Cosines to find the third side, then use it again to find the remaining angles.",
          "General Triangles: Law of Cosines works for any triangle, making it more versatile than the Pythagorean theorem (which only works for right triangles)."
        ]} />
      </SEOSection>

      <SEOSection title="The Law of Sines Explained">
        <p>
          The Law of Sines is another fundamental formula that relates the sides of a triangle to the sines of their opposite angles. It's particularly useful when you know angles and need to find sides, or when you know some angles and sides.
        </p>
        
        <SEOFormula 
          formula="a/sin(A) = b/sin(B) = c/sin(C)"
          description="Law of Sines formula showing the constant ratio between each side and the sine of its opposite angle. This ratio is the same for all three sides and angles in any triangle."
        />
        
        <SEOFormula 
          formula="sin(A)/a = sin(B)/b = sin(C)/c"
          description="Alternative form of the Law of Sines, showing the reciprocal relationship. This form is useful when solving for angles."
        />
        
        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "a, b, c: The three sides of the triangle.",
          "A, B, C: The three angles opposite to sides a, b, and c respectively.",
          "sin(A), sin(B), sin(C): The sine values of the three angles.",
          "Constant Ratio: The ratio of each side to the sine of its opposite angle is constant for all three sides.",
          "Works for all triangles: The Law of Sines applies to acute, right, and obtuse triangles."
        ]} />
        
        <h3>When to Use Law of Sines</h3>
        <SEOList items={[
          "ASA Case: When you know two angles and the included side, use Law of Sines to find the remaining sides and angle.",
          "AAS Case: When you know two angles and a non-included side, use Law of Sines to find the remaining sides and angle.",
          "SSA Case: When you know two sides and a non-included angle, use Law of Sines (but be aware of the ambiguous case where two solutions may exist).",
          "Angle Calculations: When you need to find an angle and you know the opposite side and another angle-side pair."
        ]} />
      </SEOSection>

      <SEOSection title="Triangle Cases: SSS, SAS, SSA, ASA, and AAS">
        <p>
          Different combinations of known sides and angles require different approaches. Understanding these cases helps you know which formula to use:
        </p>
        
        <SEOList items={[
          "SSS (Side-Side-Side): All three sides are known. Use Law of Cosines three times to find all three angles. This case always has a unique solution.",
          "SAS (Side-Angle-Side): Two sides and the included angle are known. Use Law of Cosines to find the third side, then use Law of Cosines again to find the remaining angles. This case always has a unique solution.",
          "ASA (Angle-Side-Angle): Two angles and the included side are known. Find the third angle (180° - A - B), then use Law of Sines to find the remaining sides. This case always has a unique solution.",
          "AAS (Angle-Angle-Side): Two angles and a non-included side are known. Find the third angle, then use Law of Sines to find the remaining sides. This case always has a unique solution.",
          "SSA (Side-Side-Angle): Two sides and a non-included angle are known. Use Law of Sines, but this is the ambiguous case—there may be 0, 1, or 2 solutions depending on the values."
        ]} />
      </SEOSection>

      <SEOSection title="How to Calculate Triangle Angles: Step-by-Step Examples">
        <p>
          Let's work through practical examples to demonstrate how the Law of Cosines and Law of Sines work. While our calculator does this instantly, understanding the process helps build mathematical confidence.
        </p>
        
        <SEOExample
          title="Example 1: SSS Case (Side-Side-Side)"
          description="Problem: Find all angles of a triangle with sides a = 5, b = 6, and c = 7."
          calculation="Given: a = 5, b = 6, c = 7\nUsing Law of Cosines:\n\nFor Angle A:\ncos(A) = (b² + c² - a²) / (2bc)\ncos(A) = (6² + 7² - 5²) / (2 × 6 × 7)\ncos(A) = (36 + 49 - 25) / 84 = 60/84 = 0.7143\nAngle A = arccos(0.7143) ≈ 44.42°\n\nFor Angle B:\ncos(B) = (a² + c² - b²) / (2ac)\ncos(B) = (25 + 49 - 36) / (2 × 5 × 7) = 38/70 = 0.5429\nAngle B = arccos(0.5429) ≈ 57.12°\n\nFor Angle C:\nAngle C = 180° - A - B = 180° - 44.42° - 57.12° = 78.46°"
          result="Answer: Angle A ≈ 44.42°, Angle B ≈ 57.12°, Angle C ≈ 78.46°. Sum = 180° ✓"
        />

        <SEOExample
          title="Example 2: SAS Case (Side-Angle-Side)"
          description="Problem: A triangle has sides a = 8, b = 10, and angle C = 60°. Find all angles."
          calculation="Given: a = 8, b = 10, Angle C = 60°\n\nStep 1: Find side c using Law of Cosines\nc² = a² + b² - 2ab cos(C)\nc² = 8² + 10² - 2 × 8 × 10 × cos(60°)\nc² = 64 + 100 - 160 × 0.5 = 164 - 80 = 84\nc = √84 ≈ 9.17\n\nStep 2: Find Angle A using Law of Cosines\ncos(A) = (b² + c² - a²) / (2bc)\ncos(A) = (100 + 84 - 64) / (2 × 10 × 9.17) = 120/183.4 ≈ 0.654\nAngle A = arccos(0.654) ≈ 49.11°\n\nStep 3: Find Angle B\nAngle B = 180° - A - C = 180° - 49.11° - 60° = 70.89°"
          result="Answer: Angle A ≈ 49.11°, Angle B ≈ 70.89°, Angle C = 60°. Sum = 180° ✓"
        />

        <SEOExample
          title="Example 3: ASA Case (Angle-Side-Angle)"
          description="Problem: A triangle has angle A = 30°, side b = 10, and angle C = 45°. Find all angles."
          calculation="Given: Angle A = 30°, Side b = 10, Angle C = 45°\n\nStep 1: Find Angle B\nAngle B = 180° - A - C = 180° - 30° - 45° = 105°\n\nStep 2: Use Law of Sines to verify and find sides\nb/sin(B) = 10/sin(105°) ≈ 10/0.9659 ≈ 10.35\n\nAll angles: A = 30°, B = 105°, C = 45°\nSum = 180° ✓"
          result="Answer: Angle A = 30°, Angle B = 105°, Angle C = 45°. Sum = 180° ✓"
        />

        <SEOExample
          title="Example 4: Right Triangle (Special Case)"
          description="Problem: A right triangle has legs a = 3 and b = 4. Find all angles."
          calculation="Given: Right triangle with a = 3, b = 4\n\nSince it's a right triangle, Angle C = 90°\n\nFind Angle A using trigonometry:\ntan(A) = opposite/adjacent = a/b = 3/4 = 0.75\nAngle A = arctan(0.75) ≈ 36.87°\n\nFind Angle B:\nAngle B = 180° - 90° - 36.87° = 53.13°\n\nOr using Law of Cosines:\nFirst find c: c = √(3² + 4²) = √25 = 5\ncos(A) = (b² + c² - a²) / (2bc) = (16 + 25 - 9) / (2 × 4 × 5) = 32/40 = 0.8\nAngle A = arccos(0.8) ≈ 36.87°"
          result="Answer: Angle A ≈ 36.87°, Angle B ≈ 53.13°, Angle C = 90°. This is the famous 3-4-5 right triangle."
        />
      </SEOSection>

      <SEOSection title="Why Is Calculating Triangle Angles Important? Real-World Applications">
        <p>
          Calculating triangle angles has countless practical applications across various industries and everyday situations. Understanding triangle angle calculations is essential in many professional and academic contexts.
        </p>
        <SEOList items={[
          "Architecture and Construction: Architects and builders use triangle angle calculations to design structures, ensure proper angles for roofs, calculate support beam angles, and verify structural integrity. Right angles and specific angle measurements are critical in construction.",
          "Engineering and Design: Engineers calculate triangle angles when designing mechanical parts, determining force vectors, calculating stress distributions, and working with triangular trusses and supports. Angle precision is essential for safety and functionality.",
          "Surveying and Land Measurement: Surveyors use triangle angle calculations to measure land boundaries, calculate distances between points, determine property lines, and create accurate maps. Triangulation is a fundamental surveying technique.",
          "Navigation and GPS: Navigation systems use triangle angle calculations (extended to 3D) to determine positions, calculate distances, and plot courses. The principles of triangulation are used in GPS technology.",
          "Physics and Mechanics: Physicists and engineers use triangle angles to resolve forces into components, calculate vector directions, analyze motion, and solve problems involving inclined planes and projectile motion.",
          "Computer Graphics and Gaming: Triangle angles are fundamental in 3D graphics, game development, and computer-aided design (CAD). Every 3D model is composed of triangles, and angle calculations are essential for rendering.",
          "Education and Academic Studies: Students use triangle angle calculations in geometry, trigonometry, pre-calculus, physics, and engineering courses. Understanding these concepts is fundamental to advanced mathematical and scientific studies.",
          "Everyday Life: From measuring angles for home improvement projects to understanding the geometry of everyday objects, triangle angle calculations appear in numerous daily situations."
        ]} />
      </SEOSection>

      <SEOSection title="Special Triangle Cases">
        <p>
          Some triangles have special properties that make angle calculations easier or result in specific angle values:
        </p>
        <SEOList items={[
          "Equilateral Triangle: All three sides are equal, and all three angles are 60°. This is the simplest case—no calculation needed!",
          "Isosceles Triangle: Two sides are equal, and the base angles (angles opposite the equal sides) are also equal. If you know one base angle, you know the other.",
          "Right Triangle: One angle is exactly 90°. The other two angles are complementary (sum to 90°). The Pythagorean theorem can be used along with trigonometric functions.",
          "30-60-90 Triangle: A special right triangle with angles 30°, 60°, and 90°. The sides are in the ratio 1 : √3 : 2.",
          "45-45-90 Triangle: An isosceles right triangle with angles 45°, 45°, and 90°. The sides are in the ratio 1 : 1 : √2.",
          "3-4-5 Triangle: A right triangle with sides 3, 4, and 5. The angles are approximately 36.87°, 53.13°, and 90°."
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes to Avoid">
        <p>
          When calculating triangle angles, there are several common errors to watch out for:
        </p>
        <SEOList items={[
          "Forgetting the 180° Rule: Always verify that the sum of all three angles equals 180°. If it doesn't, check your calculations.",
          "Using Wrong Formula: Make sure you're using Law of Cosines for SSS and SAS cases, and Law of Sines for ASA, AAS, and SSA cases.",
          "Angle vs. Side Confusion: Remember that angles are opposite their corresponding sides. Angle A is opposite side a, angle B is opposite side b, etc.",
          "Degrees vs. Radians: Make sure your calculator is set to degrees (not radians) when working with angles. Our calculator uses degrees.",
          "Triangle Inequality: For SSS cases, verify that the triangle inequality holds: the sum of any two sides must be greater than the third side.",
          "Ambiguous SSA Case: In the SSA case, there may be 0, 1, or 2 solutions. Always check if your solution is valid and if an alternative solution exists.",
          "Inverse Function Range: When using arccos or arcsin, remember that arccos returns values from 0° to 180°, and arcsin returns values from -90° to 90°.",
          "Rounding Errors: Keep intermediate calculations precise and only round the final answer. Rounding too early can lead to significant errors."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How do you find the angles of a triangle?",
            answer: "The method depends on what information you have. If you know all three sides (SSS), use the Law of Cosines. If you know two sides and an included angle (SAS), use the Law of Cosines. If you know two angles and a side (ASA/AAS), use the Law of Sines. If you know two sides and a non-included angle (SSA), use the Law of Sines (but be aware of the ambiguous case)."
          },
          {
            question: "What is the Law of Cosines?",
            answer: "The Law of Cosines is a formula that relates the sides and angles of any triangle: a² = b² + c² - 2bc cos(A). It can be rearranged to find angles: cos(A) = (b² + c² - a²) / (2bc). It works for all triangles, not just right triangles, making it more general than the Pythagorean theorem."
          },
          {
            question: "What is the Law of Sines?",
            answer: "The Law of Sines states that in any triangle, the ratio of each side to the sine of its opposite angle is constant: a/sin(A) = b/sin(B) = c/sin(C). This formula is particularly useful when you know angles and need to find sides, or when you know some angles and sides."
          },
          {
            question: "What is the sum of angles in a triangle?",
            answer: "The sum of all three interior angles in any triangle always equals 180°. This is a fundamental property of triangles: A + B + C = 180°. You can use this to find the third angle if you know two angles."
          },
          {
            question: "What is the ambiguous case in triangles?",
            answer: "The ambiguous case occurs in the SSA (Side-Side-Angle) configuration. Depending on the values, there may be 0, 1, or 2 possible triangles. This happens because the Law of Sines can give two possible angle values (one acute and one obtuse) that both satisfy the equation."
          },
          {
            question: "Can I use the Pythagorean theorem to find angles?",
            answer: "The Pythagorean theorem (a² + b² = c²) only works for right triangles and only relates the sides. To find angles in a right triangle, you would use trigonometric functions: sin, cos, or tan. For non-right triangles, you need the Law of Cosines or Law of Sines."
          },
          {
            question: "What is the difference between SSS, SAS, SSA, ASA, and AAS?",
            answer: "These are different combinations of known sides (S) and angles (A): SSS = three sides, SAS = two sides and included angle, SSA = two sides and non-included angle (ambiguous case), ASA = two angles and included side, AAS = two angles and non-included side. Each case requires a different approach to solve."
          },
          {
            question: "How accurate is the calculator?",
            answer: "Our calculator provides results accurate to 6 decimal places. The precision is sufficient for most practical applications, including construction, engineering, surveying, and academic work."
          },
          {
            question: "Does this work for all types of triangles?",
            answer: "Yes! The Law of Cosines and Law of Sines work for all triangles: acute triangles (all angles < 90°), right triangles (one angle = 90°), and obtuse triangles (one angle > 90°). The formulas are general and apply to any triangle."
          },
          {
            question: "What if my angles don't sum to 180°?",
            answer: "If the calculated angles don't sum to exactly 180°, it's likely due to rounding. However, if the sum is significantly different from 180° (more than 0.01°), check your inputs—you may have entered invalid values that don't form a valid triangle."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          If you're working with triangles and geometry, you might find these related calculators helpful:
        </p>
        <SEOList items={[
          `Our ${createInternalLinkHTML('right-triangle', 'Right Triangle Calculator')} helps you calculate all properties of right triangles including sides and angles.`,
          `The ${createInternalLinkHTML('pythagorean-theorem', 'Pythagorean Theorem Calculator')} provides comprehensive right triangle calculations.`,
          `Our ${createInternalLinkHTML('hypotenuse', 'Hypotenuse Calculator')} calculates the hypotenuse of a right triangle using the Pythagorean theorem.`,
          `The ${createInternalLinkHTML('trigonometry', 'Trigonometry Calculator')} is useful for calculating trigonometric functions and working with angles.`,
          `Our ${createInternalLinkHTML('herons-formula', 'Heron\'s Formula Calculator')} calculates triangle area when you know all three sides.`,
          `The ${createInternalLinkHTML('similar-triangles', 'Similar Triangles Calculator')} helps you work with similar triangles and proportions.`,
          `Our ${createInternalLinkHTML('isosceles-triangle', 'Isosceles Triangle Calculator')} calculates properties of isosceles triangles.`,
          `The ${createInternalLinkHTML('equilateral-triangle', 'Equilateral Triangle Calculator')} helps with equilateral triangle calculations.`
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Calculating triangle angles is a fundamental skill in geometry that has wide-ranging applications in mathematics, construction, engineering, surveying, navigation, and everyday life. Whether you're solving geometry problems, designing structures, calculating distances, working with triangles in any context, or verifying triangle properties, our <strong>Triangle Angle Calculator</strong> provides instant, accurate results with step-by-step explanations using the Law of Cosines and Law of Sines.
        </p>
        <p>
          The Law of Cosines and Law of Sines are powerful tools that extend beyond the Pythagorean theorem to work with all triangles, not just right triangles. With our calculator, you can focus on solving your problems rather than getting bogged down in manual calculations. Remember that the sum of all three angles always equals 180°, and choose the appropriate formula based on what information you have: Law of Cosines for SSS and SAS cases, and Law of Sines for ASA, AAS, and SSA cases.
        </p>
        <p>
          Ready to explore more triangle calculations? Use our {createInternalLink('right-triangle', 'Right Triangle Calculator')} for comprehensive right triangle solutions, our {createInternalLink('pythagorean-theorem', 'Pythagorean Theorem Calculator')} for Pythagorean theorem applications, or check out our {createInternalLink('trigonometry', 'Trigonometry Calculator')} for trigonometric function calculations.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}

