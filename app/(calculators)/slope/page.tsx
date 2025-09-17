import SlopeCalculator from '../../_components/calculators/SlopeCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function SlopePage() {
  return (
    <CalculatorPageTemplate
      title="Slope (Gradient) Calculator - Find Line Slope Between Two Points"
      description="Calculate the slope of a line between two points instantly with our free online slope calculator. Perfect for algebra homework, geometry problems, and any task requiring slope calculations."
      calculator={<SlopeCalculator />}
      slug="slope"
    >
      <SEOSection title="What is Slope?">
        <p>
          Slope (also called gradient) measures how steep a line is. It represents the ratio of vertical change 
          to horizontal change between two points on a line. The slope tells us how much the line rises or falls 
          for every unit it moves horizontally. This calculator works for:
        </p>
        <SEOList items={[
          "Any two points on a coordinate plane",
          "Algebra homework and assignments",
          "Geometry and graphing problems",
          "Engineering and physics calculations",
          "Linear regression and data analysis"
        ]} />
        <p>
          Simply enter the coordinates of your two points, and we&apos;ll instantly calculate 
          the slope, angle, and other properties of the line. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Slope">
        <p>
          The formula for calculating slope between two points (x₁, y₁) and (x₂, y₂) is:
        </p>
        <SEOFormula 
          formula="m = (y₂ - y₁) / (x₂ - x₁)"
          description="Divide the change in y by the change in x"
        />
        <p>
          This formula gives us the &quot;rise over run&quot; - how much the line goes up (or down) 
          for every unit it goes to the right. For example, if you have points (1, 2) and (4, 8), 
          the slope would be (8 - 2) / (4 - 1) = 6 / 3 = 2.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Slope Values">
        <p>
          Different slope values tell us different things about the line:
        </p>
        <SEOList items={[
          "Positive slope: Line goes upward from left to right",
          "Negative slope: Line goes downward from left to right",
          "Zero slope: Horizontal line (no rise)",
          "Undefined slope: Vertical line (no run)",
          "Slope = 1: 45° angle, equal rise and run",
          "Slope > 1: Steep upward slope",
          "Slope < 1: Gentle upward slope"
        ]} />
      </SEOSection>

      <SEOSection title="Common Slope Calculations">
        <SEOExample
          title="Positive Slope"
          description="Find the slope between (1, 2) and (4, 8)"
          calculation="m = (8 - 2) / (4 - 1) = 6 / 3 = 2"
          result="Slope = 2 (steep upward line)"
        />
        
        <SEOExample
          title="Negative Slope"
          description="Find the slope between (2, 5) and (6, 1)"
          calculation="m = (1 - 5) / (6 - 2) = -4 / 4 = -1"
          result="Slope = -1 (45° downward line)"
        />

        <SEOExample
          title="Zero Slope"
          description="Find the slope between (1, 3) and (5, 3)"
          calculation="m = (3 - 3) / (5 - 1) = 0 / 4 = 0"
          result="Slope = 0 (horizontal line)"
        />

        <SEOExample
          title="Fractional Slope"
          description="Find the slope between (0, 0) and (3, 1)"
          calculation="m = (1 - 0) / (3 - 0) = 1 / 3 ≈ 0.333"
          result="Slope ≈ 0.333 (gentle upward line)"
        />
      </SEOSection>

      <SEOSection title="Applications of Slope">
        <p>
          Slope is used in many real-world applications:
        </p>
        <SEOList items={[
          "Road grades and construction (steepness of hills)",
          "Economics (supply and demand curves)",
          "Physics (velocity and acceleration graphs)",
          "Engineering (structural analysis and design)",
          "Statistics (linear regression and trend analysis)",
          "Computer graphics (3D modeling and animation)",
          "Geography (topographic maps and elevation)"
        ]} />
      </SEOSection>

      <SEOSection title="Special Cases">
        <p>
          There are some special cases to be aware of:
        </p>
        <SEOList items={[
          "Vertical lines: Slope is undefined (cannot divide by zero)",
          "Horizontal lines: Slope is zero (no vertical change)",
          "Parallel lines: Have the same slope",
          "Perpendicular lines: Slopes are negative reciprocals",
          "Same point: Cannot calculate slope (need two different points)"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Slope Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Shows slope, angle, and line equation",
          "Handles both positive and negative slopes",
          "Supports decimal numbers for precise calculations",
          "Clear interpretation of slope meaning",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
