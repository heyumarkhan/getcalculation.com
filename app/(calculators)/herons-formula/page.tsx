import HeronsFormulaCalculator from '../../_components/calculators/HeronsFormulaCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function HeronsFormulaPage() {
  return (
    <CalculatorPageTemplate
      title="Heron's Formula Calculator - Calculate Triangle Area from Side Lengths"
      description="Calculate the area of any triangle instantly using Heron's formula when you know all three side lengths. Perfect for geometry homework, engineering projects, and any task requiring triangle area calculations."
      calculator={<HeronsFormulaCalculator />}
      slug="herons-formula"
    >
      <SEOSection title="What is Heron's Formula?">
        <p>
          Heron&apos;s formula is a method to calculate the area of a triangle when you know the lengths 
          of all three sides, without needing to know the height or any angles. This powerful formula 
          works for any triangle and is particularly useful when:
        </p>
        <SEOList items={[
          "You know all three side lengths but not the height",
          "Working with irregular or scalene triangles",
          "Solving geometry problems and homework",
          "Engineering and surveying calculations",
          "Computer graphics and 3D modeling"
        ]} />
        <p>
          Simply enter the lengths of all three sides, and we&apos;ll instantly calculate 
          the area using Heron&apos;s formula. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How Heron's Formula Works">
        <p>
          Heron&apos;s formula uses the semi-perimeter and the lengths of all three sides:
        </p>
        <SEOFormula 
          formula="s = (a + b + c) / 2"
          description="First, calculate the semi-perimeter (half the perimeter)"
        />
        <SEOFormula 
          formula="Area = √[s(s-a)(s-b)(s-c)]"
          description="Then apply Heron's formula to find the area"
        />
        <p>
          The formula works by using the semi-perimeter and the differences between the 
          semi-perimeter and each side length. This method is especially useful for 
          triangles where finding the height would be difficult.
        </p>
      </SEOSection>

      <SEOSection title="Triangle Validity Check">
        <p>
          Before applying Heron&apos;s formula, we check if the given sides can form a valid triangle:
        </p>
        <SEOList items={[
          "Triangle Inequality Theorem: The sum of any two sides must be greater than the third side",
          "a + b > c, a + c > b, and b + c > a",
          "All sides must be positive numbers",
          "If these conditions aren&apos;t met, the sides cannot form a triangle"
        ]} />
      </SEOSection>

      <SEOSection title="Common Heron's Formula Examples">
        <SEOExample
          title="3-4-5 Right Triangle"
          description="Sides: 3, 4, 5"
          calculation="s = (3+4+5)/2 = 6, Area = √[6(6-3)(6-4)(6-5)] = √[6×3×2×1] = √36 = 6"
          result="Area = 6 square units"
        />
        
        <SEOExample
          title="Equilateral Triangle"
          description="Sides: 6, 6, 6"
          calculation="s = (6+6+6)/2 = 9, Area = √[9(9-6)(9-6)(9-6)] = √[9×3×3×3] = √243 ≈ 15.59"
          result="Area ≈ 15.59 square units"
        />

        <SEOExample
          title="Scalene Triangle"
          description="Sides: 7, 8, 9"
          calculation="s = (7+8+9)/2 = 12, Area = √[12(12-7)(12-8)(12-9)] = √[12×5×4×3] = √720 ≈ 26.83"
          result="Area ≈ 26.83 square units"
        />
      </SEOSection>

      <SEOSection title="Applications of Heron's Formula">
        <p>
          Heron&apos;s formula is used in many real-world applications:
        </p>
        <SEOList items={[
          "Surveying and land measurement",
          "Engineering and construction",
          "Computer graphics and game development",
          "Architecture and design",
          "Navigation and GPS calculations",
          "Geometry education and homework",
          "3D modeling and animation"
        ]} />
      </SEOSection>

      <SEOSection title="Advantages of Heron's Formula">
        <p>
          Heron&apos;s formula offers several advantages over other area calculation methods:
        </p>
        <SEOList items={[
          "No need to know the height or any angles",
          "Works for any type of triangle (acute, obtuse, right)",
          "Only requires the three side lengths",
          "Mathematically elegant and efficient",
          "Useful when height is difficult to measure",
          "Provides exact results for rational side lengths"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Results">
        <p>
          Our calculator provides comprehensive information:
        </p>
        <SEOList items={[
          "Triangle Area: The calculated area in square units",
          "Semi-perimeter: Half the sum of all three sides",
          "Triangle Sides: Confirmation of input side lengths",
          "Calculation: Step-by-step application of Heron&apos;s formula",
          "Validity Check: Ensures the sides can form a triangle"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Heron's Formula Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Automatic triangle validity checking",
          "Shows semi-perimeter and step-by-step calculation",
          "Handles decimal numbers for precise measurements",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
