import AreaCalculator from '../../_components/calculators/AreaCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function AreaPage() {
  return (
    <CalculatorPageTemplate
      title="Area Calculator - Calculate Rectangle & Square Areas"
      description="Calculate the area of rectangles and squares instantly with our free online area calculator. Whether you're working on geometry homework, home improvement projects, or any task requiring area calculations, our tool provides accurate results in seconds."
      calculator={<AreaCalculator />}
      slug="area"
    >
      <SEOSection title="What is Area?">
        <p>
          The area of a rectangle or square is calculated by multiplying the length by the width. 
          This simple formula works for:
        </p>
        <SEOList items={[
          "Rectangles of any size",
          "Squares (where length equals width)",
          "Room measurements for flooring or painting",
          "Garden plots and landscaping"
        ]} />
        <p>
          Simply enter the length and width in the calculator, and we&apos;ll instantly calculate 
          the total area for you. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Area">
        <p>
          The formula for calculating the area of a rectangle or square is:
        </p>
        <SEOFormula 
          formula="Area = Length × Width"
          description="Multiply the length by the width to get the total area"
        />
        <p>
          For example, if you have a rectangle with length 8 and width 5 units, 
          the area would be 8 × 5 = 40 square units.
        </p>
      </SEOSection>

      <SEOSection title="Common Area Calculations">
        <SEOExample
          title="Square"
          description="If both length and width are equal (let's say 6 units each)"
          calculation="6 × 6 = 36 square units"
          result="Area = 36 square units"
        />
        
        <SEOExample
          title="Rectangle"
          description="For a rectangle with length 10 and width 4"
          calculation="10 × 4 = 40 square units"
          result="Area = 40 square units"
        />
      </SEOSection>

      <SEOSection title="Why Use Our Area Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Works with any unit of measurement (inches, feet, meters, etc.)",
          "Handles decimal numbers for precise measurements",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
