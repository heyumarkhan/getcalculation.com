import PerimeterCalculator from '../../_components/calculators/PerimeterCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function PerimeterPage() {
  return (
    <CalculatorPageTemplate
      title="Perimeter Calculator - Calculate Rectangle, Square & Quadrilateral Perimeters"
      description="Calculate the perimeter of any four-sided shape instantly with our free online perimeter calculator. Whether you're working with rectangles, squares, or any quadrilateral, our tool provides accurate perimeter calculations in seconds."
      calculator={<PerimeterCalculator />}
      slug="perimeter"
    >
      <SEOSection title="What is Perimeter?">
        <p>
          The perimeter of a shape is the total distance around its edges. For any four-sided figure, 
          you simply add up the lengths of all four sides. This calculator works for:
        </p>
        <SEOList items={[
          "Rectangles and squares",
          "Parallelograms and rhombuses", 
          "Any quadrilateral shape",
          "Irregular four-sided polygons"
        ]} />
        <p>
          Simply enter the length of each side in the calculator, and we&apos;ll instantly calculate 
          the total perimeter for you. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Perimeter">
        <p>
          The formula for calculating the perimeter of any four-sided shape is:
        </p>
        <SEOFormula 
          formula="Perimeter = Side 1 + Side 2 + Side 3 + Side 4"
          description="Add up all four side lengths to get the total perimeter"
        />
        <p>
          For example, if you have a rectangle with sides of 5, 8, 5, and 8 units, 
          the perimeter would be 5 + 8 + 5 + 8 = 26 units.
        </p>
      </SEOSection>

      <SEOSection title="Common Perimeter Calculations">
        <SEOExample
          title="Square"
          description="If all four sides are equal (let's say 6 units each)"
          calculation="6 + 6 + 6 + 6 = 24 units"
          result="Perimeter = 24 units (or simply 4 × 6 = 24 units)"
        />
        
        <SEOExample
          title="Rectangle"
          description="For a rectangle with length 10 and width 5"
          calculation="10 + 5 + 10 + 5 = 30 units"
          result="Perimeter = 30 units (or 2 × (length + width) = 2 × (10 + 5) = 30 units)"
        />
      </SEOSection>

      <SEOSection title="Why Use Our Perimeter Calculator?">
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
