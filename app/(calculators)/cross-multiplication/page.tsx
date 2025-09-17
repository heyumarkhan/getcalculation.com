import CrossMultiplicationCalculator from '../../_components/calculators/CrossMultiplicationCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function CrossMultiplicationPage() {
  return (
    <CalculatorPageTemplate
      title="Cross Multiplication Calculator - Solve Proportions and Ratios"
      description="Solve proportions instantly using cross multiplication! Find missing values in ratios, solve equations, and work with fractions. Perfect for algebra homework, chemistry calculations, and mathematical problem solving."
      calculator={<CrossMultiplicationCalculator />}
      slug="cross-multiplication"
    >
      <SEOSection title="What is Cross Multiplication?">
        <p>
          Cross multiplication is a powerful algebraic technique used to solve proportions 
          and find missing values in ratios. It&apos;s based on the fundamental property 
          that in a proportion a/b = c/d, the cross products are equal: a × d = b × c.
        </p>
        <SEOList items={[
          "Solving proportions and ratios",
          "Finding missing values in fractions",
          "Chemistry and physics calculations",
          "Scale drawings and maps",
          "Unit conversions and rates",
          "Algebra homework and problem solving"
        ]} />
        <p>
          Simply enter 3 values in the proportion a/b = c/d, leave one empty, and our 
          calculator will instantly find the missing value using cross multiplication!
        </p>
      </SEOSection>

      <SEOSection title="How Cross Multiplication Works">
        <p>
          Cross multiplication is based on the fundamental property of proportions:
        </p>
        <SEOFormula 
          formula="If a/b = c/d, then a × d = b × c"
          description="The cross products are always equal in a true proportion"
        />
        <p>
          To find a missing value, we rearrange this equation:
        </p>
        <SEOList items={[
          "To find a: a = (b × c) / d",
          "To find b: b = (a × d) / c", 
          "To find c: c = (a × d) / b",
          "To find d: d = (b × c) / a"
        ]} />
        <p>
          This method works because we&apos;re maintaining the equality of the cross products.
        </p>
      </SEOSection>

      <SEOSection title="When to Use Cross Multiplication">
        <p>
          Cross multiplication is particularly useful for:
        </p>
        <SEOList items={[
          "Solving proportion problems in algebra",
          "Finding missing values in ratios",
          "Chemistry calculations (molar ratios, concentrations)",
          "Physics problems (speed, density, pressure ratios)",
          "Scale drawings and architectural plans",
          "Unit conversions and rate problems",
          "Financial calculations (interest rates, ratios)"
        ]} />
      </SEOSection>

      <SEOSection title="Common Cross Multiplication Examples">
        <SEOExample
          title="Simple Proportion"
          description="3/4 = x/12"
          calculation="x = (4 × 12) / 3 = 48 / 3 = 16"
          result="x = 16, so 3/4 = 16/12"
        />
        
        <SEOExample
          title="Chemistry Molar Ratio"
          description="2/1 = x/3 (2 moles H₂O to 1 mole O₂)"
          calculation="x = (1 × 3) / 2 = 3 / 2 = 1.5"
          result="x = 1.5, so 2/1 = 1.5/3"
        />

        <SEOExample
          title="Scale Drawing"
          description="1/50 = 8/x (1 cm represents 50 cm)"
          calculation="x = (50 × 8) / 1 = 400 / 1 = 400"
          result="x = 400, so 1/50 = 8/400"
        />

        <SEOExample
          title="Unit Conversion"
          description="1/2.54 = x/10 (inches to centimeters)"
          calculation="x = (2.54 × 10) / 1 = 25.4 / 1 = 25.4"
          result="x = 25.4, so 1/2.54 = 25.4/10"
        />
      </SEOSection>

      <SEOSection title="Step-by-Step Solution Process">
        <p>
          Our calculator follows this systematic approach:
        </p>
        <SEOList items={[
          "1. Input validation: Check that exactly 3 values are provided",
          "2. Identify which variable is missing (a, b, c, or d)",
          "3. Apply the appropriate cross multiplication formula",
          "4. Calculate the missing value using division",
          "5. Verify the solution by checking cross products",
          "6. Display the complete proportion with the solved value",
          "7. Show step-by-step calculation for transparency"
        ]} />
      </SEOSection>

      <SEOSection title="Verification and Accuracy">
        <p>
          Our calculator automatically verifies solutions by checking:
        </p>
        <SEOList items={[
          "Cross product equality: a × d = b × c",
          "Both cross products are calculated and compared",
          "Solution is marked as valid when products are equal",
          "Prevents division by zero errors",
          "Handles decimal and fractional inputs accurately"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Results">
        <p>
          Our calculator provides comprehensive information:
        </p>
        <SEOList items={[
          "Missing Value: The calculated solution",
          "Complete Proportion: Shows the full proportion with all values",
          "Cross Products Verification: Confirms a × d = b × c",
          "Calculation: Step-by-step solution process",
          "Validity Check: Ensures the solution is mathematically correct"
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Cross multiplication is used in many practical situations:
        </p>
        <SEOList items={[
          "Chemistry: Balancing chemical equations, molar ratios",
          "Physics: Speed calculations, density problems",
          "Engineering: Scale drawings, gear ratios",
          "Finance: Interest calculations, exchange rates",
          "Medicine: Dosage calculations, concentration ratios",
          "Architecture: Blueprint scaling, model building",
          "Cooking: Recipe scaling, ingredient ratios"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Cross Multiplication Calculator?">
        <SEOList items={[
          "Instant solutions with automatic verification",
          "Handles all four possible missing variables",
          "Shows complete step-by-step calculations",
          "Prevents division by zero errors",
          "Works with integers, decimals, and fractions",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>

      <SEOSection title="Tips for Cross Multiplication Success">
        <SEOList items={[
          "Always identify which variable you&apos;re solving for",
          "Set up the proportion correctly: a/b = c/d",
          "Use the appropriate formula based on the missing variable",
          "Verify your answer by checking cross products",
          "Be careful with units in real-world problems",
          "Practice with simple examples before complex problems",
          "Double-check your setup before calculating"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
