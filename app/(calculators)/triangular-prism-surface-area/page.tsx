import TriangularPrismCalculator from '../../_components/calculators/TriangularPrismCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function TriangularPrismSurfaceAreaPage() {
  return (
    <CalculatorPageTemplate
      title="Triangular Prism Surface Area Calculator - Find Total Surface Area"
      description="Calculate the surface area of a triangular prism instantly with our free online calculator. Perfect for geometry homework, engineering projects, and any task requiring 3D surface area calculations."
      calculator={<TriangularPrismCalculator />}
      slug="triangular-prism-surface-area"
    >
      <SEOSection title="What is a Triangular Prism?">
        <p>
          A triangular prism is a three-dimensional solid with two triangular bases and three rectangular 
          lateral faces. It&apos;s like a triangle that has been &quot;extruded&quot; or stretched into the third dimension. 
          This calculator works for:
        </p>
        <SEOList items={[
          "Any triangular prism with known base and height dimensions",
          "Geometry homework and assignments",
          "Engineering and architectural calculations",
          "3D modeling and design projects",
          "Packaging and manufacturing calculations"
        ]} />
        <p>
          Simply enter the base length, triangle height, and prism height, and we&apos;ll instantly calculate 
          the total surface area and other properties. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Triangular Prism Surface Area">
        <p>
          The surface area of a triangular prism consists of three parts:
        </p>
        <SEOFormula 
          formula="Total Surface Area = 2 × Base Area + Lateral Surface Area"
          description="Two triangular bases plus three rectangular sides"
        />
        <SEOFormula 
          formula="Base Area = (base × height) / 2"
          description="Area of the triangular base"
        />
        <SEOFormula 
          formula="Lateral Surface Area = Perimeter of Base × Prism Height"
          description="Area of the three rectangular faces"
        />
        <p>
          The total surface area is the sum of all these areas, giving you the complete surface 
          area of the triangular prism.
        </p>
      </SEOSection>

      <SEOSection title="Components of Surface Area">
        <p>
          A triangular prism has several distinct surface areas:
        </p>
        <SEOList items={[
          "Base Area: The area of the triangular base (calculated twice for top and bottom)",
          "Lateral Surface Area: The area of the three rectangular faces",
          "Total Surface Area: The sum of all surface areas",
          "Volume: Base area multiplied by prism height (bonus calculation)"
        ]} />
      </SEOSection>

      <SEOSection title="Common Triangular Prism Examples">
        <SEOExample
          title="Simple Example"
          description="Base length = 4, triangle height = 3, prism height = 5"
          calculation="Base Area = (4×3)/2 = 6, Lateral = 12×5 = 60, Total = 2×6 + 60 = 72"
          result="Total Surface Area = 72 square units"
        />
        
        <SEOExample
          title="Larger Prism"
          description="Base length = 8, triangle height = 6, prism height = 10"
          calculation="Base Area = (8×6)/2 = 24, Lateral = 24×10 = 240, Total = 2×24 + 240 = 288"
          result="Total Surface Area = 288 square units"
        />

        <SEOExample
          title="Thin Prism"
          description="Base length = 6, triangle height = 4, prism height = 2"
          calculation="Base Area = (6×4)/2 = 12, Lateral = 18×2 = 36, Total = 2×12 + 36 = 60"
          result="Total Surface Area = 60 square units"
        />
      </SEOSection>

      <SEOSection title="Applications of Triangular Prism Surface Area">
        <p>
          Triangular prism surface area calculations are used in many real-world applications:
        </p>
        <SEOList items={[
          "Architecture and construction (roof structures, beams)",
          "Packaging design (triangular boxes and containers)",
          "Engineering (structural analysis and design)",
          "Manufacturing (material requirements and cost estimation)",
          "3D printing and modeling",
          "Geometry education and homework",
          "Art and design projects"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Results">
        <p>
          Our calculator provides several important measurements:
        </p>
        <SEOList items={[
          "Base Area: The area of one triangular end",
          "Lateral Surface Area: The area of the three rectangular sides",
          "Total Surface Area: Complete surface area including all faces",
          "Base Perimeter: The perimeter of the triangular base",
          "Volume: The total volume of the prism (bonus calculation)"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Triangular Prism Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Handles any triangular prism dimensions",
          "Shows all surface area components separately",
          "Includes volume calculation as a bonus",
          "Supports decimal numbers for precise measurements",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
