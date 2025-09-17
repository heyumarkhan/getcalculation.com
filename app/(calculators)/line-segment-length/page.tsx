import LineSegmentCalculator from '../../_components/calculators/LineSegmentCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function LineSegmentLengthPage() {
  return (
    <CalculatorPageTemplate
      title="Line Segment Length Calculator - Find Distance Between Two Points"
      description="Calculate the length of a line segment between two points instantly with our free online distance calculator. Perfect for geometry homework, engineering projects, and any task requiring distance calculations on a coordinate plane."
      calculator={<LineSegmentCalculator />}
      slug="line-segment-length"
    >
      <SEOSection title="What is Line Segment Length?">
        <p>
          The length of a line segment is the distance between two points on a coordinate plane. 
          It&apos;s calculated using the distance formula, which is derived from the Pythagorean theorem. 
          This calculator works for:
        </p>
        <SEOList items={[
          "Any two points on a coordinate plane",
          "Geometry problems and homework",
          "Engineering and surveying calculations",
          "Navigation and GPS applications",
          "Computer graphics and game development"
        ]} />
        <p>
          Simply enter the coordinates of your two points, and we&apos;ll instantly calculate 
          the distance between them. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Line Segment Length">
        <p>
          The formula for calculating the distance between two points (x₁, y₁) and (x₂, y₂) is:
        </p>
        <SEOFormula 
          formula="d = √[(x₂ - x₁)² + (y₂ - y₁)²]"
          description="Take the square root of the sum of squared differences in x and y coordinates"
        />
        <p>
          This formula is derived from the Pythagorean theorem. For example, if you have points (1, 2) and (4, 6), 
          the distance would be:
          <br />
          d = √[(4 - 1)² + (6 - 2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5 units
        </p>
      </SEOSection>

      <SEOSection title="Common Distance Calculations">
        <SEOExample
          title="Simple Example"
          description="Find the distance between (0, 0) and (3, 4)"
          calculation="d = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5"
          result="Distance = 5 units"
        />
        
        <SEOExample
          title="Negative Coordinates"
          description="Find the distance between (-2, 3) and (1, -1)"
          calculation="d = √[(1-(-2))² + (-1-3)²] = √[3² + (-4)²] = √[9 + 16] = √25 = 5"
          result="Distance = 5 units"
        />

        <SEOExample
          title="Decimal Coordinates"
          description="Find the distance between (1.5, 2.3) and (4.2, 5.7)"
          calculation="d = √[(4.2-1.5)² + (5.7-2.3)²] = √[2.7² + 3.4²] = √[7.29 + 11.56] = √18.85 ≈ 4.34"
          result="Distance ≈ 4.34 units"
        />
      </SEOSection>

      <SEOSection title="Applications of Distance Formula">
        <p>
          The distance formula is used in many real-world applications:
        </p>
        <SEOList items={[
          "Finding the length of sides in geometric shapes",
          "GPS navigation and mapping systems",
          "Computer graphics and game development",
          "Engineering and architectural design",
          "Surveying and land measurement",
          "Physics calculations involving displacement",
          "Machine learning and data analysis"
        ]} />
      </SEOSection>

      <SEOSection title="Special Cases">
        <p>
          There are some special cases where the distance formula simplifies:
        </p>
        <SEOList items={[
          "Horizontal lines: If y₁ = y₂, then d = |x₂ - x₁|",
          "Vertical lines: If x₁ = x₂, then d = |y₂ - y₁|",
          "Same point: If both points are identical, then d = 0",
          "Origin: Distance from origin (0,0) to (x,y) is √(x² + y²)"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Line Segment Length Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Handles both positive and negative coordinates",
          "Supports decimal numbers for precise calculations",
          "Shows both exact and rounded results",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
