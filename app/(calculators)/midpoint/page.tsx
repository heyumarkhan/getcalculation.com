import MidpointCalculator from '../../_components/calculators/MidpointCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function MidpointPage() {
  return (
    <CalculatorPageTemplate
      title="Midpoint Calculator - Find the Center Point Between Two Coordinates"
      description="Calculate the midpoint between two points on a coordinate plane instantly with our free online midpoint calculator. Perfect for geometry homework, engineering projects, and any task requiring coordinate calculations."
      calculator={<MidpointCalculator />}
      slug="midpoint"
    >
      <SEOSection title="What is a Midpoint?">
        <p>
          The midpoint is the exact center point between two given points on a coordinate plane. 
          It&apos;s calculated by finding the average of the x-coordinates and the average of the y-coordinates. 
          This calculator works for:
        </p>
        <SEOList items={[
          "Any two points on a coordinate plane",
          "Geometry problems and homework",
          "Engineering and design calculations",
          "Mapping and navigation applications"
        ]} />
        <p>
          Simply enter the coordinates of your two points, and we&apos;ll instantly calculate 
          the midpoint for you. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Midpoint">
        <p>
          The formula for calculating the midpoint between two points (x₁, y₁) and (x₂, y₂) is:
        </p>
        <SEOFormula 
          formula="M = ((x₁ + x₂)/2, (y₁ + y₂)/2)"
          description="Average the x-coordinates and y-coordinates separately to find the midpoint"
        />
        <p>
          For example, if you have points (2, 4) and (8, 10), the midpoint would be:
          <br />
          x-coordinate: (2 + 8) ÷ 2 = 5
          <br />
          y-coordinate: (4 + 10) ÷ 2 = 7
          <br />
          So the midpoint is (5, 7).
        </p>
      </SEOSection>

      <SEOSection title="Common Midpoint Calculations">
        <SEOExample
          title="Simple Example"
          description="Find the midpoint between (0, 0) and (6, 8)"
          calculation="x: (0 + 6) ÷ 2 = 3, y: (0 + 8) ÷ 2 = 4"
          result="Midpoint = (3, 4)"
        />
        
        <SEOExample
          title="Negative Coordinates"
          description="Find the midpoint between (-2, 3) and (4, -1)"
          calculation="x: (-2 + 4) ÷ 2 = 1, y: (3 + (-1)) ÷ 2 = 1"
          result="Midpoint = (1, 1)"
        />

        <SEOExample
          title="Decimal Coordinates"
          description="Find the midpoint between (1.5, 2.3) and (4.7, 6.1)"
          calculation="x: (1.5 + 4.7) ÷ 2 = 3.1, y: (2.3 + 6.1) ÷ 2 = 4.2"
          result="Midpoint = (3.1, 4.2)"
        />
      </SEOSection>

      <SEOSection title="Applications of Midpoint">
        <p>
          The midpoint formula is used in many real-world applications:
        </p>
        <SEOList items={[
          "Finding the center of a line segment in geometry",
          "Determining the center point of a rectangle or square",
          "Navigation and GPS calculations",
          "Computer graphics and game development",
          "Architecture and engineering design",
          "Statistical analysis and data visualization"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Midpoint Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Handles both positive and negative coordinates",
          "Supports decimal numbers for precise calculations",
          "Clear step-by-step result display",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
