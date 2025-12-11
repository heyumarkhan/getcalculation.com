import PolygonCalculator from '../../../_components/calculators/PolygonCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function PolygonPage() {
  return (
    <CalculatorPageTemplate
      title="Polygon Calculator - Calculate Area, Perimeter, Angles & More"
      description="Calculate area, perimeter, interior angles, exterior angles, apothem, and all properties of regular polygons instantly. Free polygon calculator with step-by-step solutions for triangles, squares, pentagons, hexagons, and any n-sided polygon."
      calculator={<PolygonCalculator />}
      slug="math/polygon"
      category="Geometry"
      features={[
        "Calculate area from side length or apothem",
        "Find perimeter of any regular polygon",
        "Calculate interior and exterior angles",
        "Find apothem and side lengths",
        "Support for any number of sides (n ≥ 3)",
        "Step-by-step calculation solutions",
        "Works with triangles, squares, pentagons, hexagons, and more",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Polygon Calculator">
        <p>
          Our polygon calculator makes finding the properties of any regular polygon quick and easy. A regular polygon has all sides equal and all angles equal. Simply enter the number of sides and either the side length or apothem, and our calculator will instantly compute all polygon properties.
        </p>
        <SEOList items={[
          "Select Calculation Type: Choose what you want to calculate (area, perimeter, angles, apothem, etc.).",
          "Enter Number of Sides: Input the number of sides (n) of your polygon (minimum 3). For example, 3 for triangle, 4 for square, 5 for pentagon, 6 for hexagon, etc.",
          "Enter Required Dimensions: Depending on the calculation type, enter either side length, apothem, or area.",
          "Calculate: Click the 'Calculate' button to get your results instantly.",
          "View Results: The calculator displays all polygon properties including area, perimeter, angles, apothem, and detailed step-by-step calculations showing how each value was computed."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Polygons: What Is a Regular Polygon?">
        <p>
          A polygon is a closed geometric figure made up of straight line segments. A regular polygon is a special type of polygon where all sides have equal length and all interior angles are equal. Examples of regular polygons include:
        </p>
        <SEOList items={[
          "Triangle (3 sides) - Equilateral triangle",
          "Square (4 sides) - Regular quadrilateral",
          "Pentagon (5 sides) - Regular pentagon",
          "Hexagon (6 sides) - Regular hexagon",
          "Heptagon (7 sides) - Regular heptagon",
          "Octagon (8 sides) - Regular octagon",
          "Nonagon (9 sides) - Regular nonagon",
          "Decagon (10 sides) - Regular decagon",
          "And polygons with any number of sides (n ≥ 3)"
        ]} />
        <p>
          Calculating polygon properties is essential in mathematics, geometry, architecture, engineering, design, and many real-world applications. Whether you're solving geometry problems, designing architectural structures, planning layouts, working with graphics, or studying geometric patterns, understanding how to calculate polygon properties is a fundamental skill.
        </p>
      </SEOSection>

      <SEOSection title="Polygon Formulas Explained">
        <p>
          Regular polygons have several key formulas that relate their geometric properties. Understanding these formulas helps you calculate any polygon property from available information.
        </p>
        
        <SEOFormula 
          formula="Area = (1/2) × Perimeter × Apothem = (1/2) × n × s × a"
          description="The area of a regular polygon, where n is the number of sides, s is the side length, and a is the apothem (the perpendicular distance from the center to a side)."
        />
        
        <SEOFormula 
          formula="Perimeter = n × s"
          description="The perimeter of a regular polygon, where n is the number of sides and s is the side length."
        />
        
        <SEOFormula 
          formula="Apothem = s / (2 × tan(π/n))"
          description="The apothem of a regular polygon, where s is the side length and n is the number of sides."
        />
        
        <SEOFormula 
          formula="Interior Angle = (n - 2) × 180° / n"
          description="Each interior angle of a regular polygon, where n is the number of sides."
        />
        
        <SEOFormula 
          formula="Exterior Angle = 360° / n"
          description="Each exterior angle of a regular polygon, where n is the number of sides. The sum of all exterior angles always equals 360°."
        />
        
        <SEOFormula 
          formula="Sum of Interior Angles = (n - 2) × 180°"
          description="The total sum of all interior angles in a regular polygon, where n is the number of sides."
        />
        
        <h3>Understanding the Formulas</h3>
        <SEOList items={[
          "n: The number of sides (also called vertices) of the polygon. Must be at least 3.",
          "s: The side length of the polygon. All sides are equal in a regular polygon.",
          "a: The apothem, which is the perpendicular distance from the center of the polygon to the midpoint of any side.",
          "π: The mathematical constant pi (approximately 3.14159).",
          "tan: The tangent trigonometric function."
        ]} />
      </SEOSection>

      <SEOSection title="How to Calculate Polygon Properties: Step-by-Step Examples">
        <p>
          Let's work through practical examples to demonstrate how polygon formulas work. While our calculator does this instantly, understanding the process helps build mathematical confidence.
        </p>
        
        <SEOExample
          title="Example 1: Area of a Regular Hexagon"
          description="Problem: Find the area of a regular hexagon with side length 5 units."
          calculation="Given: n = 6 (hexagon), s = 5 units\nStep 1: Calculate perimeter: P = n × s = 6 × 5 = 30 units\nStep 2: Calculate apothem: a = s / (2 × tan(π/n))\n  a = 5 / (2 × tan(π/6)) = 5 / (2 × tan(30°))\n  a = 5 / (2 × 0.5774) ≈ 4.3301 units\nStep 3: Calculate area: A = (1/2) × P × a\n  A = (1/2) × 30 × 4.3301 ≈ 64.9515 square units"
          result="Answer: The area of the hexagon is approximately 64.95 square units."
        />

        <SEOExample
          title="Example 2: Interior and Exterior Angles of a Pentagon"
          description="Problem: Find the interior and exterior angles of a regular pentagon."
          calculation="Given: n = 5 (pentagon)\nInterior Angle = (n - 2) × 180° / n\n  = (5 - 2) × 180° / 5\n  = 3 × 180° / 5\n  = 540° / 5 = 108°\nExterior Angle = 360° / n\n  = 360° / 5 = 72°\nSum of Interior Angles = (n - 2) × 180°\n  = (5 - 2) × 180° = 540°"
          result="Answer: Each interior angle is 108°, each exterior angle is 72°, and the sum of all interior angles is 540°."
        />

        <SEOExample
          title="Example 3: Side Length from Area"
          description="Problem: A regular octagon has an area of 200 square units. Find its side length."
          calculation="Given: n = 8 (octagon), A = 200 square units\nFrom area formula: A = n × s² / (4 × tan(π/n))\nSolving for s: s = √(4A × tan(π/n) / n)\n  s = √(4 × 200 × tan(π/8) / 8)\n  s = √(800 × tan(22.5°) / 8)\n  s = √(800 × 0.4142 / 8)\n  s = √41.42 ≈ 6.44 units"
          result="Answer: The side length of the octagon is approximately 6.44 units."
        />

        <SEOExample
          title="Example 4: Apothem of a Square"
          description="Problem: Find the apothem of a square with side length 10 units."
          calculation="Given: n = 4 (square), s = 10 units\nApothem formula: a = s / (2 × tan(π/n))\n  a = 10 / (2 × tan(π/4))\n  a = 10 / (2 × tan(45°))\n  a = 10 / (2 × 1)\n  a = 10 / 2 = 5 units\nAlternatively, for a square, the apothem equals half the side length."
          result="Answer: The apothem of the square is 5 units (half the side length)."
        />
      </SEOSection>

      <SEOSection title="Why Is Calculating Polygon Properties Important? Real-World Applications">
        <p>
          Calculating polygon properties has countless practical applications across various industries and everyday situations. Understanding polygon calculations is essential in many professional and academic contexts.
        </p>
        <SEOList items={[
          "Architecture and Construction: Architects use polygon calculations to design buildings, floor plans, and structural elements. Understanding polygon areas and perimeters helps with material estimation, space planning, and structural design.",
          "Engineering and Design: Engineers calculate polygon properties when designing mechanical components, circuit boards, structural frameworks, and various geometric designs. Polygon calculations are essential for precise measurements and manufacturing.",
          "Computer Graphics and Game Development: Polygon calculations are fundamental in 3D graphics, game development, and computer-aided design (CAD). Polygons form the basic building blocks of 3D models and graphics rendering.",
          "Land Surveying and Planning: Surveyors use polygon area calculations to measure land parcels, plot boundaries, and determine property areas. Accurate polygon calculations are crucial for legal property descriptions and planning.",
          "Manufacturing and Fabrication: Manufacturers calculate polygon properties when cutting materials, designing templates, and creating geometric patterns. Understanding polygon dimensions ensures accurate material usage and waste minimization.",
          "Art and Design: Artists and designers use polygon calculations in creating geometric patterns, mosaics, tiling designs, and decorative elements. Understanding polygon properties helps create aesthetically pleasing and mathematically precise designs.",
          "Education and Research: Students and researchers use polygon calculations in geometry studies, mathematical proofs, and geometric analysis. Understanding polygon formulas is fundamental to advanced geometry and trigonometry.",
          "Everyday Life: From calculating the area of hexagonal tiles to determining the amount of material needed for an octagonal deck, polygon calculations appear in numerous daily situations involving geometric shapes."
        ]} />
      </SEOSection>

      <SEOSection title="Special Cases: Common Regular Polygons">
        <p>
          Some regular polygons have special names and properties worth remembering:
        </p>
        <SEOList items={[
          "Equilateral Triangle (n=3): All angles are 60°. The simplest polygon. Area = (√3/4) × s².",
          "Square (n=4): All angles are 90°. The most common quadrilateral. Area = s², Apothem = s/2.",
          "Regular Pentagon (n=5): Each interior angle is 108°. Used in nature (flower petals) and architecture.",
          "Regular Hexagon (n=6): Each interior angle is 120°. Commonly found in honeycombs and optimal tiling patterns. Area = (3√3/2) × s².",
          "Regular Octagon (n=8): Each interior angle is 135°. Frequently used in architecture and stop signs.",
          "Regular Decagon (n=10): Each interior angle is 144°. Used in design and decorative patterns."
        ]} />
      </SEOSection>

      <SEOSection title="Relationship Between Polygon Properties">
        <p>
          Understanding the relationships between polygon properties is key to working confidently with polygons:
        </p>
        <SEOList items={[
          "Side Length and Apothem: The apothem is directly related to the side length through the formula a = s / (2 × tan(π/n)). For a given number of sides, as side length increases, apothem increases proportionally.",
          "Area and Perimeter: Area depends on both perimeter and apothem. A = (1/2) × P × a. For a fixed number of sides, area increases with the square of the side length.",
          "Number of Sides and Angles: As the number of sides increases, interior angles approach 180° and exterior angles approach 0°. The polygon becomes more circle-like.",
          "Interior and Exterior Angles: Interior angle + Exterior angle = 180° for any polygon. The sum of all exterior angles always equals 360° regardless of the number of sides.",
          "Regular vs. Irregular: Regular polygons have all sides and angles equal, making calculations straightforward. Irregular polygons require different methods and are more complex to calculate."
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes to Avoid">
        <p>
          When calculating polygon properties, there are several common errors to watch out for:
        </p>
        <SEOList items={[
          "Using Irregular Polygon Formulas: The formulas provided are for regular polygons only. If sides or angles are not equal, you cannot use these formulas directly.",
          "Forgetting to Convert Angles: When using trigonometric functions, ensure angles are in radians (π radians = 180°). The formula a = s / (2 × tan(π/n)) uses radians.",
          "Confusing Apothem with Radius: The apothem is the distance from center to side midpoint, while the radius (circumradius) is the distance from center to a vertex. These are different measurements.",
          "Not Validating Number of Sides: The number of sides must be at least 3. A polygon cannot have fewer than 3 sides.",
          "Unit Confusion: Ensure all measurements use consistent units. If side length is in meters, area will be in square meters, and perimeter will be in meters.",
          "Rounding Too Early: Keep intermediate calculations precise and only round the final answer. Rounding too early can lead to significant errors, especially with trigonometric calculations.",
          "Mixing Regular and Irregular Formulas: Regular polygon formulas assume all sides and angles are equal. For irregular polygons, you need different calculation methods."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is a regular polygon?",
            answer: "A regular polygon is a polygon where all sides have equal length and all interior angles are equal. Examples include equilateral triangles, squares, regular pentagons, and regular hexagons."
          },
          {
            question: "What is the minimum number of sides a polygon can have?",
            answer: "A polygon must have at least 3 sides. A polygon with 3 sides is a triangle, which is the simplest polygon."
          },
          {
            question: "What is the apothem of a polygon?",
            answer: "The apothem is the perpendicular distance from the center of a regular polygon to the midpoint of any side. It's the radius of the inscribed circle (incircle) of the polygon."
          },
          {
            question: "How do you find the area of a regular polygon?",
            answer: "The area of a regular polygon can be calculated using A = (1/2) × Perimeter × Apothem, or equivalently, A = (1/2) × n × s × a, where n is the number of sides, s is the side length, and a is the apothem."
          },
          {
            question: "What is the formula for interior angles of a polygon?",
            answer: "For a regular polygon with n sides, each interior angle equals (n - 2) × 180° / n. The sum of all interior angles is (n - 2) × 180°."
          },
          {
            question: "What is the formula for exterior angles of a polygon?",
            answer: "For a regular polygon with n sides, each exterior angle equals 360° / n. The sum of all exterior angles always equals 360°, regardless of the number of sides."
          },
          {
            question: "Can I calculate polygon properties if I only know the area?",
            answer: "If you know the area and number of sides of a regular polygon, you can calculate the side length using the reverse formula: s = √(4A × tan(π/n) / n). However, you need both the area and number of sides."
          },
          {
            question: "What's the difference between a regular and irregular polygon?",
            answer: "A regular polygon has all sides equal and all angles equal. An irregular polygon has sides and/or angles of different lengths/measures. Regular polygon formulas only apply to regular polygons."
          },
          {
            question: "How do polygons relate to circles?",
            answer: "As the number of sides of a regular polygon approaches infinity, the polygon approaches a circle. Many polygon formulas involve the circle constant π, and polygons can be inscribed in or circumscribed around circles."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          If you're working with polygons and geometry, you might find these related calculators helpful:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('area', 'Area Calculator')} can calculate areas of various geometric shapes including polygons.`,
          `The ${createInternalLink('perimeter', 'Perimeter Calculator')} helps you find perimeters of polygons and other shapes.`,
          `Our ${createInternalLink('hexagon', 'Hexagon Calculator')} is specialized for calculating hexagon properties.`,
          `The ${createInternalLink('equilateral-triangle', 'Equilateral Triangle Calculator')} helps with triangle calculations.`,
          `Our ${createInternalLink('pythagorean-theorem', 'Pythagorean Theorem Calculator')} is useful for right triangle calculations within polygons.`
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Calculating polygon properties is a fundamental skill in geometry that has wide-ranging applications in mathematics, architecture, engineering, design, and everyday life. Whether you're solving geometry problems, designing structures, planning layouts, or simply curious about geometric shapes, our <strong>Polygon Calculator</strong> provides instant, accurate results with step-by-step explanations for any regular polygon.
        </p>
        <p>
          The formulas for regular polygons elegantly connect the number of sides, side length, apothem, area, perimeter, and angles through geometric and trigonometric relationships. With our calculator, you can focus on solving your problems rather than getting bogged down in manual calculations. Remember, these formulas apply specifically to regular polygons where all sides and angles are equal.
        </p>
        <p>
          Ready to explore more geometry? Use our {createInternalLink('area', 'Area Calculator')} to calculate areas of various shapes, our {createInternalLink('perimeter', 'Perimeter Calculator')} to find perimeters, or check out our specialized calculators like the {createInternalLink('hexagon', 'Hexagon Calculator')} for hexagon-specific calculations.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}

