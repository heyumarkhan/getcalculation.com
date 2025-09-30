import TriangularPyramidVolumeCalculator from '../../../_components/calculators/TriangularPyramidVolumeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Triangular Pyramid Volume Calculator - Calculate Tetrahedron Volume';
const description = 'Calculate the volume of a triangular pyramid (tetrahedron) from base dimensions and height. Find 3D geometry volumes with our free calculator and step-by-step solutions.';

const features = [
  'Calculate triangular pyramid volume from base and height',
  'Step-by-step calculation with formula display',
  'Handles various base triangle types',
  'Clear error handling for invalid inputs',
  'Educational explanations and examples',
  'Mobile-friendly responsive design'
];

export default function TriangularPyramidVolumePage() {
  return (
    <CalculatorPageTemplate
      title={title}
      description={description}
      calculator={<TriangularPyramidVolumeCalculator />}
      slug="math/triangular-pyramid-volume"
      category="Geometry"
      features={features}
    >
      <SEOSection title="Understanding Triangular Pyramid Volume">
        <p>
          A triangular pyramid, also known as a tetrahedron, is a three-dimensional shape with a triangular base 
          and three triangular faces that meet at a single point called the apex. The volume of a triangular pyramid 
          is calculated using the formula: V = (1/3) × A × h, where A is the area of the base and h is the height.
        </p>
        
        <h3>Key Concepts</h3>
        <SEOList items={[
          'Triangular pyramid has a triangular base and three triangular faces',
          'Volume is one-third of the product of base area and height',
          'Base area depends on the type of triangle (right, equilateral, etc.)',
          'Height is the perpendicular distance from base to apex',
          'All triangular pyramids are tetrahedrons, but not all tetrahedrons are regular'
        ]} />
      </SEOSection>

      <SEOSection title="Applications of Triangular Pyramid Volume">
        <p>
          Understanding triangular pyramid volume has practical applications in various fields:
        </p>
        
        <SEOList items={[
          'Architecture: Designing pyramidal structures and roofs',
          'Engineering: Calculating volumes of triangular components',
          'Chemistry: Understanding molecular geometry in tetrahedral structures',
          'Physics: Analyzing crystal structures and atomic arrangements',
          'Mathematics: Exploring 3D geometry and spatial relationships',
          'Art and Design: Creating pyramidal sculptures and installations'
        ]} />
      </SEOSection>

      <SEOSection title="How to Calculate Triangular Pyramid Volume">
        <p>
          Follow these steps to calculate the volume of a triangular pyramid:
        </p>
        
        <SEOList items={[
          'Identify the base triangle dimensions (length and width for right triangles)',
          'Calculate the base area: A = (1/2) × base × height for right triangles',
          'Measure the perpendicular height from base to apex',
          'Apply the volume formula: V = (1/3) × A × h',
          'The result is in cubic units (cubic meters, cubic feet, etc.)'
        ]} />
        
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <h4 className="font-semibold text-blue-900 mb-2">Example</h4>
          <p className="text-blue-800 text-sm">
            For a triangular pyramid with base length 6, base width 8, and height 12: 
            Base area = (1/2) × 6 × 8 = 24, Volume = (1/3) × 24 × 12 = 96 cubic units
          </p>
        </div>
      </SEOSection>

      <SEOSection title="Types of Triangular Pyramids">
        <SEOList items={[
          'Right Triangular Pyramid: Base is a right triangle',
          'Equilateral Triangular Pyramid: Base is an equilateral triangle',
          'Isosceles Triangular Pyramid: Base is an isosceles triangle',
          'Scalene Triangular Pyramid: Base is a scalene triangle',
          'Regular Tetrahedron: All four faces are equilateral triangles'
        ]} />
      </SEOSection>

      <SEOSection title="Common Mistakes to Avoid">
        <SEOList items={[
          'Using the wrong base area formula for different triangle types',
          'Confusing height with slant height (height is perpendicular to base)',
          'Forgetting to divide by 3 in the volume formula',
          'Using inconsistent units for dimensions',
          'Not ensuring all dimensions are positive values'
        ]} />
      </SEOSection>

      <SEOSection title="Related Mathematical Concepts">
        <p>
          Understanding triangular pyramid volume connects to several important mathematical concepts:
        </p>
        
        <SEOList items={[
          'Pyramid Volume: General formula for any pyramid shape',
          'Tetrahedron: Regular triangular pyramid with equal faces',
          '3D Geometry: Spatial relationships and volume calculations',
          'Integration: Volume as integral of cross-sectional areas',
          'Similarity: Scaling effects on volume and surface area'
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ 
          questions={[
            {
              question: "What is the difference between a triangular pyramid and a tetrahedron?",
              answer: "A tetrahedron is a triangular pyramid where all four faces are triangles. All triangular pyramids are tetrahedrons, but not all tetrahedrons are regular (with equilateral triangular faces)."
            },
            {
              question: "Can I use this calculator for any type of triangular base?",
              answer: "This calculator assumes a right triangular base. For other triangle types (equilateral, isosceles, scalene), you would need to calculate the base area using the appropriate formula first."
            },
            {
              question: "What units should I use for the dimensions?",
              answer: "Use consistent units for all dimensions. The volume will be in cubic units of whatever unit you choose (cubic meters, cubic feet, cubic inches, etc.)."
            },
            {
              question: "How is the height different from slant height?",
              answer: "Height is the perpendicular distance from the base to the apex. Slant height is the distance along a triangular face from the base edge to the apex."
            },
            {
              question: "What if my triangular pyramid is not a right triangle?",
              answer: "For non-right triangles, calculate the base area using the appropriate formula (e.g., Heron's formula for scalene triangles) and then use the volume formula V = (1/3) × A × h."
            }
          ]}
        />
      </SEOSection>

      <SEOSection title="Related Calculators">
        <p>
          Explore these related calculators to deepen your understanding of 3D geometry:
        </p>
        
        <SEOList items={[
          '<a href="/math/volume" class="text-blue-600 hover:text-blue-800 underline">Volume Calculator</a>',
          '<a href="/math/area" class="text-blue-600 hover:text-blue-800 underline">Area Calculator</a>',
          'Rectangular Pyramid Volume Calculator (coming soon)',
          'Cone Volume Calculator (coming soon)',
          'Sphere Volume Calculator (coming soon)'
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
