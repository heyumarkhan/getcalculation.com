import DiamondProblemCalculator from '../../_components/calculators/DiamondProblemCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function DiamondProblemPage() {
  return (
    <CalculatorPageTemplate
      title="Diamond Problem Solver - Find Two Numbers from Sum and Product"
      description="Solve the classic diamond problem instantly! Find two numbers that add to a given sum and multiply to a given product. Perfect for algebra homework, factoring practice, and mathematical problem solving."
      calculator={<DiamondProblemCalculator />}
      slug="diamond-problem"
    >
      <SEOSection title="What is the Diamond Problem?">
        <p>
          The Diamond Problem is a classic algebraic challenge where you need to find two numbers 
          when you know their sum and their product. This problem appears frequently in:
        </p>
        <SEOList items={[
          "Algebra homework and textbooks",
          "Factoring quadratic expressions",
          "SAT and ACT math sections",
          "Engineering and physics problems",
          "Mathematical competitions",
          "Problem-solving practice"
        ]} />
        <p>
          Simply enter the sum and product of two unknown numbers, and our calculator will 
          instantly find the solution using the quadratic formula. No registration required!
        </p>
      </SEOSection>

      <SEOSection title="How the Diamond Problem Works">
        <p>
          The Diamond Problem involves solving a system of two equations:
        </p>
        <SEOFormula 
          formula="x + y = sum"
          description="The sum of two numbers"
        />
        <SEOFormula 
          formula="x × y = product"
          description="The product of two numbers"
        />
        <p>
          To solve this system, we use substitution and the quadratic formula:
        </p>
        <SEOFormula 
          formula="y = sum - x"
          description="Express y in terms of x from the first equation"
        />
        <SEOFormula 
          formula="x(sum - x) = product"
          description="Substitute into the second equation"
        />
        <SEOFormula 
          formula="x² - (sum)x + product = 0"
          description="Rearrange to form a quadratic equation"
        />
        <SEOFormula 
          formula="x = (sum ± √(sum² - 4×product)) / 2"
          description="Apply the quadratic formula"
        />
      </SEOSection>

      <SEOSection title="When Solutions Exist">
        <p>
          The Diamond Problem has real solutions when the discriminant is non-negative:
        </p>
        <SEOFormula 
          formula="sum² - 4×product ≥ 0"
          description="The discriminant must be non-negative for real solutions"
        />
        <SEOList items={[
          "If discriminant > 0: Two different real solutions",
          "If discriminant = 0: One repeated real solution",
          "If discriminant < 0: No real solutions (complex numbers only)"
        ]} />
      </SEOSection>

      <SEOSection title="Common Diamond Problem Examples">
        <SEOExample
          title="Simple Integer Case"
          description="Sum: 7, Product: 12"
          calculation="x² - 7x + 12 = 0, (x-3)(x-4) = 0"
          result="Numbers: 3 and 4 (3+4=7, 3×4=12)"
        />
        
        <SEOExample
          title="Perfect Square Case"
          description="Sum: 10, Product: 25"
          calculation="x² - 10x + 25 = 0, (x-5)² = 0"
          result="Numbers: 5 and 5 (5+5=10, 5×5=25)"
        />

        <SEOExample
          title="Decimal Case"
          description="Sum: 8.5, Product: 15.75"
          calculation="x² - 8.5x + 15.75 = 0, x = (8.5 ± √(72.25-63))/2"
          result="Numbers: 3.5 and 5 (3.5+5=8.5, 3.5×5=17.5)"
        />

        <SEOExample
          title="Negative Product Case"
          description="Sum: 3, Product: -10"
          calculation="x² - 3x - 10 = 0, (x-5)(x+2) = 0"
          result="Numbers: 5 and -2 (5+(-2)=3, 5×(-2)=-10)"
        />
      </SEOSection>

      <SEOSection title="Applications of Diamond Problems">
        <p>
          Diamond problems appear in many mathematical contexts:
        </p>
        <SEOList items={[
          "Factoring quadratic expressions: x² + bx + c",
          "Finding roots of quadratic equations",
          "Solving word problems involving two unknown quantities",
          "Engineering calculations with constraints",
          "Optimization problems in economics",
          "Physics problems with two variables"
        ]} />
      </SEOSection>

      <SEOSection title="Step-by-Step Solution Process">
        <p>
          Our calculator follows this systematic approach:
        </p>
        <SEOList items={[
          "1. Input validation: Check that both sum and product are provided",
          "2. Set up the quadratic equation: x² - (sum)x + product = 0",
          "3. Calculate the discriminant: sum² - 4×product",
          "4. Check if real solutions exist (discriminant ≥ 0)",
          "5. Apply the quadratic formula to find the solutions",
          "6. Verify the solutions by checking sum and product",
          "7. Display the results with step-by-step calculation"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Results">
        <p>
          Our calculator provides comprehensive information:
        </p>
        <SEOList items={[
          "The Two Numbers: The solution values for x and y",
          "Verification: Confirms that the numbers add and multiply correctly",
          "Method Used: Shows that the quadratic formula was applied",
          "Calculation: Step-by-step application of the quadratic formula",
          "Validity Check: Ensures real solutions exist"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Diamond Problem Solver?">
        <SEOList items={[
          "Instant solutions with no calculation errors",
          "Handles both integer and decimal inputs",
          "Shows complete step-by-step calculations",
          "Verifies solutions automatically",
          "Works with positive and negative numbers",
          "Completely free and no registration required",
          "Mobile-friendly interface"
        ]} />
      </SEOSection>

      <SEOSection title="Tips for Diamond Problem Solving">
        <SEOList items={[
          "Start by checking if the discriminant is non-negative",
          "For integer solutions, look for factors of the product",
          "When the product is negative, one number is positive and one is negative",
          "When the product is positive, both numbers have the same sign",
          "Practice with simple cases before tackling complex problems",
          "Always verify your solutions by checking sum and product"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
