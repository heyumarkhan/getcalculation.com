import ProportionCalculator from '../../../_components/calculators/ProportionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ProportionPage() {
  return (
    <CalculatorPageTemplate
      title="Proportion Calculator: Solve Proportions, Check Ratios & Calculate Scale Factors"
      description="Calculate proportions, check if ratios are proportional, or find scale factors with our free proportion calculator. Get step-by-step solutions for algebra problems."
      calculator={<ProportionCalculator />}
      slug="math/proportion"
      category="Algebra"
      features={[
        "Solve for x in proportions",
        "Check if ratios are proportional",
        "Calculate scale factors",
        "Step-by-step solutions",
        "Multiple calculation methods",
        "Free and easy to use"
      ]}
    >
      <SEOSection title="Understanding Proportions: The Foundation of Ratio Mathematics">
        <p>
          A proportion is an equation that states two ratios are equal, and understanding how to work with <strong>proportions</strong> is fundamental in algebra and real-world problem solving. Whether you&apos;re scaling recipes, calculating distances on maps, or solving complex mathematical problems, proportions are everywhere.
        </p>
        <p>
          Proportion calculations appear in countless real-world applications, from cooking and baking to engineering and finance. Our Proportion Calculator provides instant, accurate results using multiple methods, making complex ratio concepts accessible and understandable.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use Our Proportion Calculator">
        <p>
          Our calculator supports three types of proportion calculations:
        </p>
        <ol>
          <li><strong>Solve for x:</strong> Find the missing value in a proportion equation like a/b = c/x or a/b = x/d.</li>
          <li><strong>Check Proportion:</strong> Verify if two ratios form a true proportion (a/b = c/d).</li>
          <li><strong>Scale Factor:</strong> Calculate the scale factor between two values and optionally apply it to another number.</li>
        </ol>
        <p>
          Each calculation includes detailed step-by-step work, showing exactly how the result was obtained, making it perfect for learning and verification.
        </p>
      </SEOSection>

      <SEOSection title="Method 1: Solving for x in Proportions">
        <p>
          When you have a proportion with one unknown value, you can solve for x using cross multiplication.
        </p>
        
        <h3>Cross Multiplication Method</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">If a/b = c/x, then a × x = b × c</p>
        </div>
        
        <h4>Example: Solve 3/4 = 6/x</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p><strong>Given proportion:</strong> 3/4 = 6/x</p>
          <p><strong>Cross multiply:</strong> 3 × x = 4 × 6</p>
          <p><strong>Simplify:</strong> 3x = 24</p>
          <p><strong>Solve for x:</strong> x = 24 ÷ 3 = 8</p>
          <p><strong>Check:</strong> 3/4 = 6/8 ✓ (both equal 0.75)</p>
        </div>

        <h4>Example: Solve 2/5 = x/15</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p><strong>Given proportion:</strong> 2/5 = x/15</p>
          <p><strong>Cross multiply:</strong> 2 × 15 = 5 × x</p>
          <p><strong>Simplify:</strong> 30 = 5x</p>
          <p><strong>Solve for x:</strong> x = 30 ÷ 5 = 6</p>
          <p><strong>Check:</strong> 2/5 = 6/15 ✓ (both equal 0.4)</p>
        </div>
      </SEOSection>

      <SEOSection title="Method 2: Checking if Ratios are Proportional">
        <p>
          To check if two ratios form a true proportion, compare their cross products or calculate their decimal values.
        </p>
        
        <h3>Cross Product Method</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">a/b = c/d if and only if a × d = b × c</p>
        </div>

        <h4>Example: Check if 4/6 = 6/9</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p><strong>Given ratios:</strong> 4/6 and 6/9</p>
          <p><strong>Cross products:</strong> 4 × 9 = 36 and 6 × 6 = 36</p>
          <p><strong>Since 36 = 36:</strong> The ratios are proportional ✓</p>
          <p><strong>Decimal check:</strong> 4/6 = 0.667 and 6/9 = 0.667 ✓</p>
        </div>

        <h4>Example: Check if 3/7 = 5/12</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p><strong>Given ratios:</strong> 3/7 and 5/12</p>
          <p><strong>Cross products:</strong> 3 × 12 = 36 and 7 × 5 = 35</p>
          <p><strong>Since 36 ≠ 35:</strong> The ratios are NOT proportional ✗</p>
          <p><strong>Decimal check:</strong> 3/7 = 0.429 and 5/12 = 0.417 ✗</p>
        </div>
      </SEOSection>

      <SEOSection title="Method 3: Calculating Scale Factors">
        <p>
          A scale factor is the ratio of corresponding measurements in two similar figures or the ratio of new size to original size.
        </p>
        
        <h3>Scale Factor Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">Scale Factor = New Size ÷ Original Size</p>
        </div>

        <h4>Example: Scale Factor from 4 to 12</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p><strong>Original size:</strong> 4</p>
          <p><strong>New size:</strong> 12</p>
          <p><strong>Scale factor:</strong> 12 ÷ 4 = 3</p>
          <p><strong>Meaning:</strong> The new size is 3 times larger than the original</p>
        </div>

        <h4>Example: Apply Scale Factor</h4>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p><strong>Scale factor:</strong> 2.5</p>
          <p><strong>Original value:</strong> 8</p>
          <p><strong>Scaled value:</strong> 8 × 2.5 = 20</p>
        </div>
      </SEOSection>

      <SEOSection title="Practical Applications of Proportions">
        <p>Understanding proportions has numerous real-world applications:</p>
        
        <h4>Cooking and Baking</h4>
        <SEOList items={[
          "Scaling recipes up or down based on serving size",
          "Converting between different measurement units",
          "Adjusting ingredient quantities proportionally",
          "Calculating nutritional information per serving"
        ]} />

        <h4>Maps and Scale Drawings</h4>
        <SEOList items={[
          "Calculating real distances from map measurements",
          "Converting between different map scales",
          "Creating scale models and blueprints",
          "Determining actual sizes from scaled drawings"
        ]} />

        <h4>Business and Finance</h4>
        <SEOList items={[
          "Calculating proportional tax rates",
          "Determining commission percentages",
          "Scaling production costs with quantity",
          "Calculating proportional profit margins"
        ]} />

        <h4>Science and Engineering</h4>
        <SEOList items={[
          "Converting between different units of measurement",
          "Calculating concentrations in chemistry",
          "Scaling up laboratory results to production",
          "Determining proportional relationships in physics"
        ]} />
      </SEOSection>

      <SEOSection title="Common Proportion Patterns and Properties">
        <h4>Basic Properties</h4>
        <SEOList items={[
          "If a/b = c/d, then b/a = d/c (reciprocal property)",
          "If a/b = c/d, then a/c = b/d (alternating property)",
          "If a/b = c/d, then (a+b)/b = (c+d)/d (addition property)",
          "If a/b = c/d, then (a-b)/b = (c-d)/d (subtraction property)"
        ]} />

        <h4>Special Cases</h4>
        <SEOList items={[
          "When one ratio equals 1, the other must also equal 1",
          "When ratios involve zero, special rules apply",
          "Negative ratios follow the same proportion rules",
          "Decimal and fractional ratios work the same way"
        ]} />

        <h4>Scale Factor Relationships</h4>
        <SEOList items={[
          "Scale factor > 1 means enlargement",
          "Scale factor < 1 means reduction",
          "Scale factor = 1 means no change",
          "Scale factors can be fractions or decimals"
        ]} />
      </SEOSection>

      <SEOSection title="Advanced Concepts and Extensions">
        <h4>Compound Proportions</h4>
        <p>
          When three or more quantities are related proportionally, you can solve for any missing value using the same principles.
        </p>
        
        <h4>Inverse Proportions</h4>
        <p>
          When one quantity increases as another decreases proportionally, the relationship is inverse: a × b = constant.
        </p>
        
        <h4>Proportional Relationships in Functions</h4>
        <p>
          Linear functions often represent proportional relationships where y = kx, where k is the constant of proportionality.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What&apos;s the difference between a ratio and a proportion?",
            answer: "A ratio compares two quantities (like 3:4), while a proportion is an equation stating two ratios are equal (like 3/4 = 6/8)."
          },
          {
            question: "Can proportions have negative numbers?",
            answer: "Yes, proportions can involve negative numbers. The same cross-multiplication rules apply, but be careful with signs when solving."
          },
          {
            question: "What if my proportion has decimals?",
            answer: "Decimals work the same way as whole numbers in proportions. You can cross-multiply and solve normally, or convert to fractions if preferred."
          },
          {
            question: "How do I check if my answer is correct?",
            answer: "Substitute your answer back into the original proportion and verify that both sides are equal, or check that the cross products are the same."
          },
          {
            question: "What&apos;s the difference between scale factor and ratio?",
            answer: "A scale factor is a specific type of ratio that compares new size to original size. All scale factors are ratios, but not all ratios are scale factors."
          },
          {
            question: "Can I use this calculator for complex proportions?",
            answer: "This calculator handles basic two-ratio proportions. For more complex problems with multiple ratios, you may need to solve them step by step."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          Expand your mathematical toolkit with these related calculators:
        </p>
        <SEOList items={[
          `Our ${createInternalLink('crossMultiplication')} for solving proportions`,
          `The ${createInternalLink('diamondProblem')} for factoring problems`,
          `Check out our ${createInternalLink('sumOfSeries')} for series calculations`,
          `Use the ${createInternalLink('quotient')} for division calculations`
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering proportion calculations opens doors to advanced mathematics and countless practical applications. Whether you&apos;re scaling recipes, solving algebraic problems, or working on engineering projects, understanding how to work with <strong>proportions</strong> is an invaluable skill.
        </p>
        <p>
          Our Proportion Calculator makes these calculations accessible and educational, providing not just answers but the reasoning behind them using multiple proven methods. Start exploring ratio mathematics today and discover the power of proportional thinking in solving real-world problems.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
