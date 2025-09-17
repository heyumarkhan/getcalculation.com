import SimilarTrianglesCalculator from '../../_components/calculators/SimilarTrianglesCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function SimilarTrianglesPage() {
  return (
    <CalculatorPageTemplate
      title="Similar Triangles Calculator - Find Missing Sides Using Proportions"
      description="Calculate missing sides of similar triangles instantly with our free online similar triangles calculator. Perfect for geometry homework, engineering projects, and any task requiring triangle proportion calculations."
      calculator={<SimilarTrianglesCalculator />}
      slug="similar-triangles"
    >
      <SEOSection title="What are Similar Triangles?">
        <p>
          Similar triangles are triangles that have the same shape but different sizes. They have 
          corresponding angles that are equal and corresponding sides that are proportional. This 
          calculator works for:
        </p>
        <SEOList items={[
          "Any pair of similar triangles with known corresponding sides",
          "Geometry homework and assignments",
          "Engineering and architectural calculations",
          "Scale model and map calculations",
          "Photography and perspective problems"
        ]} />
        <p>
          Simply enter the known sides of both triangles, and we&apos;ll instantly calculate 
          the missing side using proportions. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Similar Triangles">
        <p>
          Similar triangles follow the principle that corresponding sides are proportional:
        </p>
        <SEOFormula 
          formula="a₁/a₂ = b₁/b₂ = c₁/c₂"
          description="Corresponding sides of similar triangles are proportional"
        />
        <SEOFormula 
          formula="Scale Factor = Side₂ / Side₁"
          description="The ratio of any corresponding sides gives the scale factor"
        />
        <SEOFormula 
          formula="Missing Side = Known Side × Scale Factor"
          description="Multiply the known side by the scale factor to find the missing side"
        />
        <p>
          This means if you know three corresponding sides, you can find the fourth using 
          cross-multiplication or scale factor methods.
        </p>
      </SEOSection>

      <SEOSection title="Properties of Similar Triangles">
        <p>
          Similar triangles have several important properties:
        </p>
        <SEOList items={[
          "Corresponding angles are equal",
          "Corresponding sides are proportional",
          "The ratio of any two corresponding sides is the same",
          "The ratio of their areas is the square of the scale factor",
          "The ratio of their perimeters equals the scale factor"
        ]} />
      </SEOSection>

      <SEOSection title="Common Similar Triangle Examples">
        <SEOExample
          title="Basic Similar Triangles"
          description="Triangle 1: sides 3, 4, 5; Triangle 2: corresponding side 6, find missing side"
          calculation="Scale factor = 6/3 = 2, Missing side = 4 × 2 = 8"
          result="Missing side = 8 units"
        />
        
        <SEOExample
          title="Scale Model"
          description="Model: 2cm, 3cm; Real: 8cm, find corresponding side"
          calculation="Scale factor = 8/2 = 4, Missing side = 3 × 4 = 12"
          result="Missing side = 12cm"
        />

        <SEOExample
          title="Map Scale"
          description="Map: 1in, 1.5in; Actual: 10mi, find corresponding distance"
          calculation="Scale factor = 10/1 = 10, Missing distance = 1.5 × 10 = 15"
          result="Missing distance = 15 miles"
        />
      </SEOSection>

      <SEOSection title="Applications of Similar Triangles">
        <p>
          Similar triangles are used in many real-world applications:
        </p>
        <SEOList items={[
          "Architecture and construction (scale drawings)",
          "Map reading and navigation",
          "Photography and perspective",
          "Engineering and surveying",
          "Scale models and miniatures",
          "Shadow problems and height calculations",
          "Optics and lens calculations"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Results">
        <p>
          Our calculator provides several important measurements:
        </p>
        <SEOList items={[
          "Missing Side: The calculated length of the unknown side",
          "Scale Factor: The ratio between corresponding sides",
          "Proportion: The mathematical relationship between sides",
          "Calculation: Step-by-step calculation process"
        ]} />
      </SEOSection>

      <SEOSection title="Tips for Using Similar Triangles">
        <p>
          Here are some helpful tips when working with similar triangles:
        </p>
        <SEOList items={[
          "Make sure you&apos;re comparing corresponding sides",
          "The scale factor is the same for all corresponding sides",
          "If triangles are similar, all corresponding angles are equal",
          "You can use any pair of corresponding sides to find the scale factor",
          "Check your work by verifying the proportion holds true"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Similar Triangles Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Shows scale factor and proportion relationships",
          "Handles decimal numbers for precise measurements",
          "Clear step-by-step calculation display",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
