import RectangularPrismCalculator from '../../../_components/calculators/RectangularPrismCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function RectangularPrismPage() {
  return (
    <CalculatorPageTemplate
      title="Rectangular Prism Calculator - Volume, Surface Area & Diagonal"
      description="Calculate volume, surface area, lateral surface area, and diagonal of a rectangular prism (cuboid) instantly. Free calculator with step-by-step solutions for length, width, and height dimensions."
      calculator={<RectangularPrismCalculator />}
      slug="math/rectangular-prism"
      category="Geometry"
      features={[
        "Calculate volume from length, width, and height",
        "Find total surface area of rectangular prism",
        "Calculate lateral surface area (excluding bases)",
        "Find space diagonal length",
        "Step-by-step calculation solutions",
        "Works with any rectangular prism dimensions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Rectangular Prism Calculator">
        <p>
          Our rectangular prism calculator makes finding the volume, surface area, lateral surface area, and diagonal of any rectangular prism quick and easy. A rectangular prism (also called a cuboid) is a 3D shape with six rectangular faces. Simply enter the length, width, and height, and our calculator will instantly compute all rectangular prism properties.
        </p>
        <SEOList items={[
          "Enter Length: Input the length (l) of the rectangular prism.",
          "Enter Width: Input the width (w) of the rectangular prism.",
          "Enter Height: Input the height (h) of the rectangular prism.",
          "Calculate: Click the 'Calculate Properties' button to get your results instantly.",
          "View Results: The calculator displays volume, surface area, lateral surface area, diagonal, and detailed step-by-step calculations showing how each value was computed."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Rectangular Prisms: What Is a Rectangular Prism?">
        <p>
          A rectangular prism, also known as a cuboid, is a three-dimensional geometric solid with six rectangular faces. All angles are right angles (90°), and opposite faces are parallel and congruent. A rectangular prism is one of the most common 3D shapes, appearing everywhere from boxes and buildings to rooms and containers.
        </p>
        <SEOList items={[
          "Six Rectangular Faces: All six faces are rectangles, forming a box-like shape.",
          "Right Angles: All angles between edges are 90° (right angles).",
          "Three Dimensions: Defined by length (l), width (w), and height (h).",
          "Opposite Faces Congruent: The front and back, left and right, and top and bottom faces are identical.",
          "Special Case - Cube: When length = width = height, the rectangular prism becomes a cube.",
          "12 Edges: A rectangular prism has 12 edges, with four edges of each length dimension.",
          "8 Vertices: The corners where three edges meet."
        ]} />
        <p>
          Calculating rectangular prism properties is essential in mathematics, geometry, architecture, engineering, packaging, construction, and many real-world applications. Whether you're solving geometry problems, designing packages, calculating room volumes, determining material needs, or working with 3D space, understanding how to calculate rectangular prism properties is a fundamental skill.
        </p>
      </SEOSection>

      <SEOSection title="Rectangular Prism Formulas Explained">
        <p>
          Rectangular prisms have several key formulas that relate their geometric properties. Understanding these formulas helps you calculate any rectangular prism property from the three dimensions (length, width, height).
        </p>
        
        <SEOFormula 
          formula="Volume = l × w × h"
          description="The volume of a rectangular prism, where l is length, w is width, and h is height. This represents the amount of space inside the prism."
        />
        
        <SEOFormula 
          formula="Surface Area = 2(lw + lh + wh)"
          description="The total surface area of a rectangular prism, which is the sum of all six rectangular faces. This formula calculates the area of all sides combined."
        />
        
        <SEOFormula 
          formula="Lateral Surface Area = 2h(l + w)"
          description="The lateral surface area of a rectangular prism, which excludes the top and bottom faces. This represents the area of the four vertical sides."
        />
        
        <SEOFormula 
          formula="Diagonal = √(l² + w² + h²)"
          description="The space diagonal (also called the body diagonal) of a rectangular prism, which is the longest distance between any two opposite vertices. This formula uses the 3D Pythagorean theorem."
        />
        
        <h3>Understanding the Formulas</h3>
        <SEOList items={[
          "l: The length of the rectangular prism (one of the three dimensions).",
          "w: The width of the rectangular prism (the second dimension, perpendicular to length).",
          "h: The height of the rectangular prism (the third dimension, perpendicular to both length and width).",
          "Volume: The three-dimensional space enclosed by the prism, measured in cubic units.",
          "Surface Area: The total area of all six faces, measured in square units.",
          "Lateral Surface Area: The area of the four vertical faces (excluding top and bottom), measured in square units.",
          "Diagonal: The straight-line distance through the 3D space from one corner to the opposite corner."
        ]} />
      </SEOSection>

      <SEOSection title="How to Calculate Rectangular Prism Properties: Step-by-Step Examples">
        <p>
          Let's work through practical examples to demonstrate how rectangular prism formulas work. While our calculator does this instantly, understanding the process helps build mathematical confidence.
        </p>
        
        <SEOExample
          title="Example 1: Volume of a Rectangular Prism"
          description="Problem: Find the volume of a rectangular prism with length 8 units, width 5 units, and height 3 units."
          calculation="Given: l = 8, w = 5, h = 3\nVolume formula: V = l × w × h\nV = 8 × 5 × 3\nV = 40 × 3\nV = 120 cubic units"
          result="Answer: The volume of the rectangular prism is 120 cubic units."
        />

        <SEOExample
          title="Example 2: Surface Area of a Rectangular Prism"
          description="Problem: Calculate the total surface area of a rectangular prism with length 10 cm, width 6 cm, and height 4 cm."
          calculation="Given: l = 10, w = 6, h = 4\nSurface Area formula: SA = 2(lw + lh + wh)\nFirst, calculate each face area:\nlw = 10 × 6 = 60\nlh = 10 × 4 = 40\nwh = 6 × 4 = 24\nSA = 2(60 + 40 + 24)\nSA = 2(124)\nSA = 248 square cm"
          result="Answer: The total surface area is 248 square centimeters."
        />

        <SEOExample
          title="Example 3: Lateral Surface Area"
          description="Problem: A box has length 12 inches, width 8 inches, and height 6 inches. Find the lateral surface area (area of the four vertical sides)."
          calculation="Given: l = 12, w = 8, h = 6\nLateral Surface Area formula: LSA = 2h(l + w)\nLSA = 2 × 6 × (12 + 8)\nLSA = 2 × 6 × 20\nLSA = 12 × 20\nLSA = 240 square inches"
          result="Answer: The lateral surface area is 240 square inches. This represents the area of the four vertical sides, excluding the top and bottom."
        />

        <SEOExample
          title="Example 4: Diagonal of a Rectangular Prism"
          description="Problem: Find the length of the space diagonal of a rectangular prism with dimensions 9 m, 6 m, and 12 m."
          calculation="Given: l = 9, w = 6, h = 12\nDiagonal formula: d = √(l² + w² + h²)\nd = √(9² + 6² + 12²)\nd = √(81 + 36 + 144)\nd = √261\nd ≈ 16.155 m"
          result="Answer: The space diagonal is approximately 16.155 meters. This is the longest distance between opposite corners of the prism."
        />

        <SEOExample
          title="Example 5: Real-World Application - Packaging Box"
          description="Problem: A shipping box is 24 inches long, 18 inches wide, and 16 inches tall. Calculate its volume and the amount of wrapping paper needed to cover it completely."
          calculation="Given: l = 24, w = 18, h = 16\nVolume: V = l × w × h = 24 × 18 × 16 = 6,912 cubic inches\nSurface Area (wrapping paper needed): SA = 2(lw + lh + wh)\nSA = 2(24×18 + 24×16 + 18×16)\nSA = 2(432 + 384 + 288)\nSA = 2(1,104) = 2,208 square inches"
          result="Answer: The box has a volume of 6,912 cubic inches and requires 2,208 square inches of wrapping paper to cover it completely."
        />
      </SEOSection>

      <SEOSection title="Why Is Calculating Rectangular Prism Properties Important? Real-World Applications">
        <p>
          Calculating rectangular prism properties has countless practical applications across various industries and everyday situations. Understanding rectangular prism calculations is essential in many professional and academic contexts.
        </p>
        <SEOList items={[
          "Packaging and Shipping: Companies use rectangular prism calculations to design boxes, calculate shipping volumes, determine packaging material needs, and optimize space utilization. Understanding volume and surface area is crucial for cost-effective packaging solutions.",
          "Architecture and Construction: Architects and builders calculate rectangular prism properties when designing rooms, buildings, foundations, and structural elements. Volume calculations help with space planning, while surface area calculations help estimate materials like paint, drywall, or flooring.",
          "Storage and Warehousing: Warehouse managers use volume calculations to determine storage capacity, organize inventory, and maximize space efficiency. Understanding how much can fit in a rectangular space is essential for logistics and inventory management.",
          "Manufacturing and Production: Manufacturers calculate rectangular prism properties when designing products, creating molds, cutting materials, and determining material quantities. Accurate volume and surface area calculations ensure efficient material usage and waste minimization.",
          "Real Estate and Interior Design: Real estate professionals and interior designers use volume calculations for room sizes, while surface area calculations help determine paint, wallpaper, or flooring requirements. Understanding space dimensions is fundamental to design and property evaluation.",
          "Education and Academic Studies: Students use rectangular prism calculations in geometry, mathematics, physics, and engineering courses. Understanding 3D geometry is fundamental to advanced mathematical and scientific studies.",
          "Everyday Life: From calculating the volume of a swimming pool to determining how much paint is needed for a room, rectangular prism calculations appear in numerous daily situations involving 3D rectangular objects.",
          "Science and Research: Scientists use rectangular prism calculations in experiments, data analysis, and modeling. Understanding volume and surface area is important in chemistry, biology, physics, and engineering research."
        ]} />
      </SEOSection>

      <SEOSection title="Special Cases: Cube as a Rectangular Prism">
        <p>
          A cube is a special case of a rectangular prism where all three dimensions are equal (l = w = h = s). When working with cubes, the formulas simplify:
        </p>
        <SEOList items={[
          "Volume: V = s³ (where s is the side length)",
          "Surface Area: SA = 6s² (six identical square faces)",
          "Lateral Surface Area: LSA = 4s² (four vertical faces)",
          "Diagonal: d = s√3 (space diagonal through the cube)"
        ]} />
        <p>
          Our calculator works perfectly for cubes as well—just enter the same value for length, width, and height. A cube is essentially a regular rectangular prism with all sides equal.
        </p>
      </SEOSection>

      <SEOSection title="Relationship Between Rectangular Prism Properties">
        <p>
          Understanding the relationships between rectangular prism properties is key to working confidently with these 3D shapes:
        </p>
        <SEOList items={[
          "Volume and Dimensions: Volume is directly proportional to each dimension. If you double the length, width, or height, the volume doubles. If you double all three dimensions, the volume increases by a factor of 8 (2³).",
          "Surface Area and Dimensions: Surface area increases quadratically with dimension changes. Doubling all dimensions quadruples the surface area (2² = 4).",
          "Diagonal and Dimensions: The diagonal is determined by all three dimensions through the 3D Pythagorean theorem. It's always longer than any individual dimension and represents the longest distance within the prism.",
          "Volume vs. Surface Area: For a given volume, a cube has the minimum surface area. As dimensions become more unequal, surface area increases for the same volume.",
          "Lateral vs. Total Surface Area: Lateral surface area is always less than total surface area. The difference is twice the area of one base (top or bottom face)."
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes to Avoid">
        <p>
          When calculating rectangular prism properties, there are several common errors to watch out for:
        </p>
        <SEOList items={[
          "Mixing Up Dimensions: Ensure you correctly identify which dimension is length, width, and height. While the labels don't matter for volume (multiplication is commutative), they matter for understanding the shape.",
          "Forgetting the Factor of 2: In the surface area formula SA = 2(lw + lh + wh), remember to multiply by 2 because there are two of each type of face (front/back, left/right, top/bottom).",
          "Confusing Lateral and Total Surface Area: Lateral surface area excludes the top and bottom faces, while total surface area includes all six faces. Make sure you're using the correct formula for what you need.",
          "Unit Confusion: Ensure all dimensions use consistent units. If length is in meters, width and height must also be in meters, and volume will be in cubic meters, while surface area will be in square meters.",
          "Diagonal vs. Face Diagonal: The space diagonal (d = √(l² + w² + h²)) is different from face diagonals. Face diagonals are on the faces themselves, while the space diagonal goes through the 3D interior.",
          "Rounding Too Early: Keep intermediate calculations precise and only round the final answer. Rounding too early can lead to significant errors, especially in multi-step calculations.",
          "Negative Dimensions: All dimensions must be positive. Rectangular prisms cannot have negative or zero dimensions."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is a rectangular prism?",
            answer: "A rectangular prism (also called a cuboid) is a 3D geometric solid with six rectangular faces, all meeting at right angles. It's essentially a rectangular box, like a shoebox or a room."
          },
          {
            question: "What's the difference between a rectangular prism and a cube?",
            answer: "A cube is a special type of rectangular prism where all three dimensions (length, width, and height) are equal. All cubes are rectangular prisms, but not all rectangular prisms are cubes."
          },
          {
            question: "How do you calculate the volume of a rectangular prism?",
            answer: "The volume of a rectangular prism is calculated by multiplying the three dimensions: V = l × w × h, where l is length, w is width, and h is height."
          },
          {
            question: "What is the formula for surface area of a rectangular prism?",
            answer: "The total surface area of a rectangular prism is SA = 2(lw + lh + wh), where l is length, w is width, and h is height. This formula accounts for all six rectangular faces."
          },
          {
            question: "What is lateral surface area?",
            answer: "Lateral surface area is the area of the four vertical sides of a rectangular prism, excluding the top and bottom faces. It's calculated as LSA = 2h(l + w), which represents the area of the four vertical rectangular faces."
          },
          {
            question: "How do you find the diagonal of a rectangular prism?",
            answer: "The space diagonal (longest diagonal) of a rectangular prism is found using the 3D Pythagorean theorem: d = √(l² + w² + h²). This is the straight-line distance through the 3D space from one corner to the opposite corner."
          },
          {
            question: "Can I use this calculator for a cube?",
            answer: "Yes! A cube is a special case of a rectangular prism. Simply enter the same value for length, width, and height. Our calculator will correctly calculate all properties for cubes as well."
          },
          {
            question: "What units should I use?",
            answer: "Use any consistent units for all dimensions (e.g., all in meters, all in inches, all in feet). The volume will be in cubic units, surface area in square units, and diagonal in the same linear units as the dimensions."
          },
          {
            question: "What's the difference between face diagonal and space diagonal?",
            answer: "A face diagonal lies on one of the rectangular faces and is calculated using the 2D Pythagorean theorem (e.g., √(l² + w²)). The space diagonal goes through the 3D interior of the prism from one vertex to the opposite vertex and uses the 3D Pythagorean theorem: √(l² + w² + h²)."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          If you're working with 3D shapes and geometry, you might find these related calculators helpful:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('volume', 'Volume Calculator')} can calculate volumes of various 3D shapes including rectangular prisms.`,
          `The ${createInternalLink('triangular-prism', 'Triangular Prism Calculator')} helps you calculate properties of triangular prisms.`,
          `Our ${createInternalLink('sphere-volume', 'Sphere Volume Calculator')} calculates sphere volumes and properties.`,
          `The ${createInternalLink('cylinder-volume', 'Cylinder Volume Calculator')} helps with cylinder calculations.`,
          `Our ${createInternalLink('area', 'Area Calculator')} is useful for calculating areas of 2D shapes that form the faces of prisms.`
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Calculating rectangular prism properties is a fundamental skill in 3D geometry that has wide-ranging applications in mathematics, architecture, engineering, packaging, construction, and everyday life. Whether you're solving geometry problems, designing packages, calculating room volumes, determining material needs, or working with any 3D rectangular object, our <strong>Rectangular Prism Calculator</strong> provides instant, accurate results with step-by-step explanations.
        </p>
        <p>
          The formulas for rectangular prisms elegantly connect the three dimensions (length, width, height) to volume, surface area, lateral surface area, and diagonal through geometric relationships. With our calculator, you can focus on solving your problems rather than getting bogged down in manual calculations. Remember that all dimensions must be positive, and consistent units are essential for accurate results.
        </p>
        <p>
          Ready to explore more 3D geometry? Use our {createInternalLink('volume', 'Volume Calculator')} to calculate volumes of various shapes, our {createInternalLink('triangular-prism', 'Triangular Prism Calculator')} for triangular prisms, or check out our {createInternalLink('sphere-volume', 'Sphere Volume Calculator')} for sphere calculations.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}

