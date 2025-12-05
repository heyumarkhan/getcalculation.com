import HexagonCalculator from '../../../_components/calculators/HexagonCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function HexagonPage() {
  return (
    <CalculatorPageTemplate
      title="Hexagon Calculator"
      description="Calculate area, perimeter, side length, apothem, and diagonal of a regular hexagon instantly. Perfect for geometry homework, design projects, and mathematical calculations."
      calculator={<HexagonCalculator />}
      slug="math/hexagon"
      category="Geometry"
      features={[
        "Calculate area from side length or apothem",
        "Calculate perimeter from side length",
        "Find side length from area",
        "Calculate apothem and diagonal",
        "Step-by-step solutions",
        "High precision calculations"
      ]}
    >
      <SEOSection title="Hexagon Calculator: Calculate Area, Perimeter, and More">
        <p>
          A hexagon is a six-sided polygon, and when all sides and angles are equal, it&apos;s called a regular hexagon. This geometric shape appears frequently in nature (like honeycomb cells) and is widely used in design, engineering, and mathematics. Our <strong>Hexagon Calculator</strong> makes it easy to calculate all the important properties of a regular hexagon, including area, perimeter, side length, apothem, and diagonal measurements.
        </p>
        <p>
          Whether you&apos;re working on a geometry problem, designing a hexagonal pattern, or calculating materials needed for a hexagonal structure, this <strong>hexagon calculator</strong> provides instant, accurate results with detailed step-by-step solutions. Understanding hexagon properties is essential for students, designers, architects, and anyone working with geometric shapes.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Hexagon Calculator">
        <p>
          Our <strong>hexagon calculator</strong> offers multiple calculation modes to find different properties of a regular hexagon. The interface is intuitive and guides you through each calculation type.
        </p>
        <SEOList items={[
          "<strong>Select Calculation Type:</strong> Choose from six options: \"Area from Side Length,\" \"Area from Apothem,\" \"Perimeter,\" \"Side Length from Area,\" \"Apothem,\" or \"Long Diagonal.\"",
          "<strong>Enter Your Value:</strong> Depending on your selection, enter the side length, apothem, or area. The input field label will automatically update to match your selection.",
          "<strong>Calculate:</strong> Click the \"Calculate\" button to instantly see your result with detailed step-by-step calculations.",
          "<strong>Review Results:</strong> The calculator displays the result in the appropriate units (square units for area, units for length measurements) along with a complete breakdown of the calculation steps."
        ]} ordered={true} />
        <p>
          This <strong>regular hexagon calculator</strong> handles all the complex mathematics, giving you accurate results in seconds while helping you understand the formulas behind each calculation.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Regular Hexagons">
        <p>
          A regular hexagon is a six-sided polygon where all sides have equal length and all interior angles measure 120 degrees. This symmetry makes regular hexagons particularly useful in design and engineering applications.
        </p>
        <p>
          Key properties of a regular hexagon include:
        </p>
        <SEOList items={[
          "<strong>Six Equal Sides:</strong> All six sides have the same length (s)",
          "<strong>Six Equal Angles:</strong> Each interior angle measures 120°",
          "<strong>Apothem:</strong> The perpendicular distance from the center to any side (a = s × √3 / 2)",
          "<strong>Long Diagonal:</strong> The distance between opposite vertices (d = 2s)",
          "<strong>Area:</strong> Can be calculated using side length or apothem",
          "<strong>Perimeter:</strong> Simply 6 times the side length (P = 6s)"
        ]} />
        <p>
          The regular hexagon is the only polygon (besides the square) that can completely tile a plane without gaps, making it extremely efficient for patterns and structures.
        </p>
      </SEOSection>

      <SEOSection title="Hexagon Area Formulas">
        <p>
          The area of a regular hexagon can be calculated using two different formulas, depending on what information you have available.
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Area from Side Length</h3>
        <SEOFormula 
          formula="A = (3√3/2) × s²"
          description="Area formula when you know the side length"
        />
        <p>
          Where:
        </p>
        <SEOList items={[
          "A = Area of the hexagon",
          "s = Side length",
          "√3 ≈ 1.732"
        ]} />
        <p>
          This formula comes from dividing the hexagon into six equilateral triangles and calculating their combined area.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Area from Apothem</h3>
        <SEOFormula 
          formula="A = 2√3 × a²"
          description="Area formula when you know the apothem"
        />
        <p>
          Where:
        </p>
        <SEOList items={[
          "A = Area of the hexagon",
          "a = Apothem (distance from center to side)"
        ]} />
        <p>
          This formula is particularly useful when you know the apothem but not the side length directly.
        </p>
      </SEOSection>

      <SEOSection title="Other Hexagon Formulas">
        <p>
          Beyond area, there are several other important formulas for regular hexagons that our <strong>hexagon calculator</strong> uses:
        </p>
        <SEOList items={[
          "<strong>Perimeter:</strong> P = 6s (where s is the side length)",
          "<strong>Apothem:</strong> a = s × √3 / 2 (the perpendicular distance from center to side)",
          "<strong>Long Diagonal:</strong> d = 2s (distance between opposite vertices)",
          "<strong>Side from Area:</strong> s = √(2A / (3√3)) (solving the area formula for side length)",
          "<strong>Interior Angle:</strong> 120° (for all interior angles in a regular hexagon)",
          "<strong>Exterior Angle:</strong> 60° (for all exterior angles in a regular hexagon)"
        ]} />
        <p>
          These formulas are all interconnected, allowing you to calculate any property if you know just one measurement.
        </p>
      </SEOSection>

      <SEOSection title="Worked Examples: Using the Hexagon Calculator">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Example 1: Finding Area from Side Length</h3>
        <p>
          Suppose you have a regular hexagon with a side length of 5 units. To find the area:
        </p>
        <SEOList items={[
          "Select \"Area from Side Length\"",
          "Enter side length: 5",
          "Click Calculate",
          "Result: Area = (3√3/2) × 5² = (3 × 1.732 / 2) × 25 = 64.95 square units"
        ]} />

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Example 2: Finding Perimeter</h3>
        <p>
          For a hexagon with side length of 8 units:
        </p>
        <SEOList items={[
          "Select \"Perimeter\"",
          "Enter side length: 8",
          "Click Calculate",
          "Result: Perimeter = 6 × 8 = 48 units"
        ]} />

        <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Example 3: Finding Side Length from Area</h3>
        <p>
          If you know the area is 100 square units and need to find the side length:
        </p>
        <SEOList items={[
          "Select \"Side Length from Area\"",
          "Enter area: 100",
          "Click Calculate",
          "Result: Side length = √(2 × 100 / (3√3)) = √(200 / 5.196) = √38.49 = 6.20 units"
        ]} />
      </SEOSection>

      <SEOSection title="Applications of Hexagons">
        <p>
          Hexagons are used extensively in various fields due to their unique properties and efficiency. Understanding hexagon calculations is valuable for:
        </p>
        <SEOList items={[
          "<strong>Architecture and Design:</strong> Hexagonal patterns are common in floor tiles, wall designs, and structural elements. Calculating area helps determine material requirements.",
          "<strong>Engineering:</strong> Hexagonal bolts, nuts, and structural components require precise measurements. The hexagon shape provides excellent grip and structural stability.",
          "<strong>Nature and Biology:</strong> Honeycomb structures are hexagonal because this shape maximizes area while minimizing perimeter, making it the most efficient use of space.",
          "<strong>Mathematics Education:</strong> Hexagons are excellent examples for teaching polygon properties, area calculations, and geometric relationships.",
          "<strong>Game Design:</strong> Hexagonal grids are popular in board games and video games because they provide more natural movement patterns than square grids.",
          "<strong>Manufacturing:</strong> Hexagonal patterns are used in manufacturing for efficient packing and structural design."
        ]} />
      </SEOSection>

      <SEOSection title="Why Hexagons Are Special">
        <p>
          Regular hexagons have several unique properties that make them particularly interesting:
        </p>
        <SEOList items={[
          "<strong>Tessellation:</strong> Regular hexagons can completely fill a plane without gaps or overlaps, making them perfect for tiling patterns.",
          "<strong>Efficiency:</strong> Among all regular polygons, hexagons provide the best ratio of area to perimeter, which is why bees use hexagonal cells in honeycombs.",
          "<strong>Symmetry:</strong> Hexagons have six-fold rotational symmetry, meaning they look the same when rotated 60°, 120°, 180°, 240°, 300°, or 360°.",
          "<strong>Structural Strength:</strong> The hexagonal shape distributes stress evenly, making it strong and stable for structural applications.",
          "<strong>Natural Occurrence:</strong> Hexagons appear frequently in nature, from snowflakes to basalt columns, due to their efficiency and stability."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between a regular and irregular hexagon?",
            answer: "A regular hexagon has all six sides equal in length and all interior angles equal (120° each). An irregular hexagon has sides and/or angles of different lengths/measures. Our hexagon calculator works specifically with regular hexagons."
          },
          {
            question: "How do I calculate the area of a hexagon if I only know the apothem?",
            answer: "You can use the formula A = 2√3 × a², where a is the apothem. Simply select \"Area from Apothem\" in our calculator, enter the apothem value, and click Calculate."
          },
          {
            question: "What is the apothem of a hexagon?",
            answer: "The apothem is the perpendicular distance from the center of the hexagon to any of its sides. For a regular hexagon, the apothem equals the side length multiplied by √3/2, or approximately 0.866 times the side length."
          },
          {
            question: "Can I use this calculator for irregular hexagons?",
            answer: "No, this calculator is designed specifically for regular hexagons where all sides are equal. For irregular hexagons, you would need to divide the shape into triangles or use other methods to calculate the area."
          },
          {
            question: "How is the hexagon area formula derived?",
            answer: "A regular hexagon can be divided into six equilateral triangles. Each triangle has area (s²√3)/4. Multiplying by 6 and simplifying gives us A = (3√3/2) × s². Alternatively, the hexagon can be thought of as six triangles with base s and height equal to the apothem."
          },
          {
            question: "What is the relationship between hexagon side length and diagonal?",
            answer: "In a regular hexagon, the long diagonal (distance between opposite vertices) is exactly twice the side length. So if you know the side length, the diagonal is simply 2s. Conversely, if you know the diagonal, the side length is d/2."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The hexagon is one of the most fascinating and useful geometric shapes, appearing throughout nature, design, and engineering. Our <strong>Hexagon Calculator</strong> provides you with the tools to quickly and accurately calculate all the important properties of a regular hexagon, whether you need area, perimeter, side length, apothem, or diagonal measurements.
        </p>
        <p>
          With step-by-step solutions and multiple calculation modes, this calculator helps you understand the mathematics behind hexagon properties while saving time on complex calculations. Use it for homework, design projects, or any application where hexagon measurements are needed.
        </p>
        <p>
          Ready to explore more geometric shapes? Check out our {createInternalLink('area', 'area calculator')} for other polygons, learn about {createInternalLink('perimeter', 'perimeter calculations')}, or discover the properties of {createInternalLink('circle-equation', 'circles')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

