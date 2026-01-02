import { Metadata } from 'next';
import SurfaceAreaCalculator from '../../../_components/calculators/SurfaceAreaCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Surface Area Calculator - Calculate Surface Area of Cube, Cylinder, Sphere & More',
  description: 'Calculate surface area for cube, rectangular prism, cylinder, sphere, cone, and triangular prism. Free Surface Area Calculator with step-by-step solutions for all 3D shapes.',
  keywords: ['surface area calculator', 'calculate surface area', 'surface area formula', 'cube surface area', 'cylinder surface area', 'sphere surface area', 'cone surface area', 'rectangular prism surface area', '3d shape surface area', 'geometry calculator'],
  openGraph: {
    title: 'Surface Area Calculator - Calculate Surface Area of Cube, Cylinder, Sphere & More',
    description: 'Calculate surface area for cube, rectangular prism, cylinder, sphere, cone, and triangular prism. Free Surface Area Calculator with step-by-step solutions for all 3D shapes.',
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

export default function SurfaceAreaPage() {
  return (
    <CalculatorPageTemplate
      title="Surface Area Calculator - Calculate Surface Area of Cube, Cylinder, Sphere & More"
      description="Calculate surface area for cube, rectangular prism, cylinder, sphere, cone, and triangular prism. Free Surface Area Calculator with step-by-step solutions for all 3D shapes."
      calculator={<SurfaceAreaCalculator />}
      slug="math/surface-area"
      category="Geometry"
      features={[
        "Calculate surface area for 6 different 3D shapes",
        "Cube, Rectangular Prism, Cylinder, Sphere, Cone, Triangular Prism",
        "Step-by-step solutions for each calculation",
        "Multiple input methods for cones",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      
      <SEOSection title="Understanding Surface Area">
        <p>
          Surface area is the total area of all the faces or surfaces of a three-dimensional object. 
          Unlike volume, which measures the space inside an object, surface area measures the area 
          covering the outside of the object. The Surface Area Calculator helps you find the surface 
          area of various 3D shapes quickly and accurately.
        </p>
        
        <h3>Key Concepts of Surface Area</h3>
        <SEOList items={[
          'Surface area is measured in square units (e.g., cm², m², in²)',
          'It represents the total area of all exposed surfaces',
          'Different shapes have different surface area formulas',
          'Surface area is important for material calculations, heat transfer, and design',
          'It\'s always greater than or equal to the area of a single face'
        ]} />

        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <p className="font-mono text-center text-lg">
            Surface Area = Sum of all face areas
          </p>
          <p className="text-center text-sm text-gray-600 mt-2">
            The fundamental principle for calculating surface area
          </p>
        </div>
      </SEOSection>

      <SEOSection title="How to Use the Surface Area Calculator">
        <p>
          Our Surface Area Calculator supports multiple 3D shapes. Simply select the shape you want 
          to calculate, enter the required dimensions, and click "Calculate Surface Area" to get 
          instant results with step-by-step solutions.
        </p>

        <h3>Supported Shapes</h3>
        <SEOList items={[
          'Cube: All sides equal, simplest calculation',
          'Rectangular Prism: Length, width, and height',
          'Cylinder: Radius and height',
          'Sphere: Only radius needed',
          'Cone: Radius with height or slant height',
          'Triangular Prism: Base dimensions and prism height'
        ]} />

        <h3>Step-by-Step Process</h3>
        <SEOList items={[
          'Select the 3D shape from the options',
          'Enter the required dimensions in the input fields',
          'Click "Calculate Surface Area"',
          'Review the result and step-by-step solution',
          'Check the formula and calculation details'
        ]} />
      </SEOSection>

      <SEOSection title="Surface Area Formulas">
        <p>
          The Surface Area Calculator uses these formulas for different shapes:
        </p>

        <h3>Cube Surface Area</h3>
        <SEOFormula 
          formula="SA = 6s²"
          description="Where s is the side length. A cube has 6 equal square faces."
        />

        <h3>Rectangular Prism Surface Area</h3>
        <SEOFormula 
          formula="SA = 2(lw + lh + wh)"
          description="Where l is length, w is width, and h is height. This accounts for all 6 rectangular faces."
        />

        <h3>Cylinder Surface Area</h3>
        <SEOFormula 
          formula="SA = 2πr² + 2πrh"
          description="Where r is radius and h is height. Includes two circular bases and the curved lateral surface."
        />

        <h3>Sphere Surface Area</h3>
        <SEOFormula 
          formula="SA = 4πr²"
          description="Where r is radius. A sphere has a single curved surface."
        />

        <h3>Cone Surface Area</h3>
        <SEOFormula 
          formula="SA = πr² + πrs"
          description="Where r is radius and s is slant height. Includes circular base and lateral surface."
        />
        <SEOFormula 
          formula="s = √(r² + h²)"
          description="If height is given instead of slant height, calculate slant height first."
        />

        <h3>Triangular Prism Surface Area</h3>
        <SEOFormula 
          formula="SA = 2 × Base Area + Lateral Area"
          description="Where Base Area = (1/2) × base × height, and Lateral Area = Perimeter × Prism Height"
        />
      </SEOSection>

      <SEOSection title="Example Problems">
        <div className="space-y-4">
          <SEOExample
            title="Example 1: Cube Surface Area"
            description="Given: Side length = 5 units"
            calculation="SA = 6 × s² = 6 × 5² = 6 × 25 = 150 square units"
            result="The surface area of the cube is 150 square units"
          />
          
          <SEOExample
            title="Example 2: Cylinder Surface Area"
            description="Given: Radius = 3 units, Height = 8 units"
            calculation="Base area = π × 3² = 9π ≈ 28.27. Lateral area = 2π × 3 × 8 = 48π ≈ 150.80. SA = 2 × 28.27 + 150.80 = 207.34 square units"
            result="The surface area of the cylinder is approximately 207.34 square units"
          />

          <SEOExample
            title="Example 3: Sphere Surface Area"
            description="Given: Radius = 4 units"
            calculation="SA = 4π × 4² = 4π × 16 = 64π ≈ 201.06 square units"
            result="The surface area of the sphere is approximately 201.06 square units"
          />

          <SEOExample
            title="Example 4: Rectangular Prism Surface Area"
            description="Given: Length = 6, Width = 4, Height = 5 units"
            calculation="SA = 2(6×4 + 6×5 + 4×5) = 2(24 + 30 + 20) = 2 × 74 = 148 square units"
            result="The surface area of the rectangular prism is 148 square units"
          />
        </div>
      </SEOSection>

      <SEOSection title="Types of 3D Shapes and Their Surface Areas">
        <p>
          Different 3D shapes have unique properties that affect their surface area calculations:
        </p>

        <h3>Cube</h3>
        <SEOList items={[
          'All 6 faces are identical squares',
          'Simplest surface area calculation',
          'Formula: SA = 6s²',
          'Common in dice, boxes, and building blocks'
        ]} />

        <h3>Rectangular Prism</h3>
        <SEOList items={[
          '6 rectangular faces (3 pairs of equal opposite faces)',
          'Also called a cuboid or box',
          'Formula: SA = 2(lw + lh + wh)',
          'Most common shape in packaging and construction'
        ]} />

        <h3>Cylinder</h3>
        <SEOList items={[
          'Two circular bases and one curved lateral surface',
          'Lateral surface unrolls to a rectangle',
          'Formula: SA = 2πr² + 2πrh',
          'Found in cans, pipes, and columns'
        ]} />

        <h3>Sphere</h3>
        <SEOList items={[
          'Single continuous curved surface',
          'No edges or vertices',
          'Formula: SA = 4πr²',
          'Found in balls, planets, and bubbles'
        ]} />

        <h3>Cone</h3>
        <SEOList items={[
          'One circular base and one curved lateral surface',
          'Requires either height or slant height',
          'Formula: SA = πr² + πrs',
          'Found in ice cream cones, traffic cones, and roofs'
        ]} />

        <h3>Triangular Prism</h3>
        <SEOList items={[
          'Two triangular bases and three rectangular lateral faces',
          'Base can be any triangle',
          'Formula: SA = 2 × Base Area + Lateral Area',
          'Found in roof structures and optical prisms'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Calculating surface area is essential in many practical applications:
        </p>
        <SEOList items={[
          'Construction: Determining paint, tile, or material quantities needed',
          'Packaging: Calculating cardboard or wrapping material requirements',
          'Manufacturing: Estimating material costs and waste',
          'Architecture: Designing efficient building surfaces',
          'Engineering: Heat transfer calculations and insulation needs',
          'Chemistry: Surface area affects reaction rates and catalysis',
          'Biology: Cell surface area relates to nutrient absorption',
          'Art and Design: Material planning for sculptures and installations'
        ]} />
      </SEOSection>

      <SEOSection title="Calculating Surface Area for Different Shapes">
        <p>
          Our Surface Area Calculator handles each shape differently:
        </p>

        <h3>For Prisms (Cube, Rectangular Prism, Triangular Prism)</h3>
        <p>
          Prisms have two identical bases and rectangular lateral faces. The surface area is calculated 
          as: 2 × Base Area + Lateral Area. The lateral area equals the perimeter of the base 
          multiplied by the height of the prism.
        </p>

        <h3>For Cylinders</h3>
        <p>
          Cylinders have two circular bases and one curved lateral surface. The lateral surface can be 
          "unrolled" into a rectangle with length equal to the circumference (2πr) and width equal 
          to the height.
        </p>

        <h3>For Spheres</h3>
        <p>
          Spheres have a single continuous curved surface with no edges or vertices. The surface area 
          formula 4πr² was derived through calculus and represents the area of the curved surface.
        </p>

        <h3>For Cones</h3>
        <p>
          Cones have one circular base and one curved lateral surface. If you know the height, you 
          must first calculate the slant height using the Pythagorean theorem: s = √(r² + h²).
        </p>
      </SEOSection>

      <SEOSection title="Related Calculators">
        <p>
          Explore these related geometry calculators to solve more 3D shape problems:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('volume')} for calculating volumes of 3D shapes`,
          `Our ${createInternalLink('area')} for calculating 2D areas`,
          `Our ${createInternalLink('triangular-prism-surface-area', 'Triangular Prism Surface Area Calculator')} for detailed triangular prism calculations`,
          `Our ${createInternalLink('rectangular-prism', 'Rectangular Prism Calculator')} for rectangular prism properties`,
          `Our ${createInternalLink('cylinder-volume', 'Cylinder Volume Calculator')} for cylinder volume calculations`,
          `Our ${createInternalLink('sphere-volume', 'Sphere Volume Calculator')} for sphere volume calculations`
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is surface area?",
            answer: "Surface area is the total area of all the faces or surfaces of a three-dimensional object. It's measured in square units and represents the area covering the outside of the object. Our Surface Area Calculator can calculate it for various 3D shapes."
          },
          {
            question: "How do you calculate surface area?",
            answer: "The method depends on the shape. For a cube: SA = 6s². For a rectangular prism: SA = 2(lw + lh + wh). For a cylinder: SA = 2πr² + 2πrh. For a sphere: SA = 4πr². For a cone: SA = πr² + πrs. Our Surface Area Calculator handles all these calculations automatically."
          },
          {
            question: "What is the difference between surface area and volume?",
            answer: "Surface area measures the area covering the outside of a 3D object (in square units), while volume measures the space inside the object (in cubic units). Surface area is useful for material calculations, while volume is useful for capacity calculations."
          },
          {
            question: "How do you find the surface area of a cube?",
            answer: "To find the surface area of a cube, use the formula: SA = 6s², where s is the side length. Since a cube has 6 identical square faces, multiply the area of one face (s²) by 6. Our Surface Area Calculator can do this calculation instantly."
          },
          {
            question: "How do you calculate the surface area of a cylinder?",
            answer: "The surface area of a cylinder is: SA = 2πr² + 2πrh, where r is the radius and h is the height. This includes the area of the two circular bases (2πr²) plus the lateral surface area (2πrh). Use our Surface Area Calculator for quick results."
          },
          {
            question: "What is the surface area of a sphere?",
            answer: "The surface area of a sphere is: SA = 4πr², where r is the radius. This formula gives the area of the curved surface. Simply enter the radius in our Surface Area Calculator to get the result."
          },
          {
            question: "How do you find the surface area of a cone?",
            answer: "The surface area of a cone is: SA = πr² + πrs, where r is the radius and s is the slant height. If you only have the height, first calculate the slant height: s = √(r² + h²). Our Surface Area Calculator handles both cases."
          },
          {
            question: "Why is surface area important?",
            answer: "Surface area is important for calculating material requirements (paint, wrapping, tiles), heat transfer in engineering, reaction rates in chemistry, and many other practical applications. Our Surface Area Calculator makes these calculations easy and accurate."
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}

