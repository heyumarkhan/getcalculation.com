import InverseVariationCalculator from '../../../_components/calculators/InverseVariationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function InverseVariationPage() {
  return (
    <CalculatorPageTemplate
      title="Inverse Variation Calculator: Solve y = k / x"
      description="Solve inverse variation problems (y = k / x). Find y, k, or x given any two values. Step-by-step solutions and examples."
      calculator={<InverseVariationCalculator />}
      slug="math/inverse-variation"
      category="Algebra"
      features={[
        'Solve for y given k and x',
        'Compute k given x and y',
        'Solve for x given k and y',
        'Step-by-step explanations',
        'Built-in example values'
      ]}
    >
      <SEOSection title="What is Inverse Variation?">
        <p>
          Inverse variation (also called inverse proportionality) describes a relationship between two variables where one variable increases while the other decreases so that their product remains constant. The relationship is modelled by <strong>y = k / x</strong>, where <strong>k</strong> is the constant of variation.
        </p>
        <p>
          This calculator helps you compute any of the three quantities (x, y, or k) when the other two are known. It also shows step-by-step calculations so you can learn the algebraic manipulation used to isolate the unknown.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Inverse Variation Calculator">
        <SEOList items={[
          'Choose which variable to solve for: y, k, or x.',
          'Enter the known values for the other two variables.',
          'Click Calculate to get the result and step-by-step explanation.',
          'Use the example presets to quickly test common cases.'
        ]} />
      </SEOSection>

      <SEOSection title="Examples and Verification">
        <p>
          Try these example problems included in the calculator UI to verify results:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold">Find y</p>
            <p className="text-sm">k = 10, x = 2 → y = 10 / 2 = 5</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold">Find k</p>
            <p className="text-sm">x = 4, y = 3 → k = 4 × 3 = 12</p>
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <p className="font-semibold">Find x</p>
            <p className="text-sm">k = 15, y = 3 → x = 15 / 3 = 5</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Inverse Variation">
        <p>
          Inverse variation appears across science, engineering, and everyday problem solving. Examples include:
        </p>
        <SEOList items={[
          'Physics: relationships like intensity of light vs. distance squared (inverse-square laws).',
          'Engineering: calculations where product of two parameters must remain constant.',
          'Economics: certain supply/demand simplifications where quantity and price may be inversely related.',
          'Mathematics: solving word problems involving rates and proportions.'
        ]} />
      </SEOSection>

      <SEOSection title="Common Questions about Inverse Variation">
        <SEOFAQ questions={[
          {
            question: 'How do I know when to use inverse variation?',
            answer: 'Use inverse variation when the product of two variables remains constant. If doubling x halves y, they are inversely proportional.'
          },
          {
            question: 'What if x or y is zero?',
            answer: 'Inverse variation requires non-zero x and y because division by zero is undefined. The calculator validates and reports errors for zero inputs when appropriate.'
          },
          {
            question: 'Can k be negative?',
            answer: 'Yes. k can be negative, which will make one of the variables negative depending on the sign of the other. The algebra works the same way.'
          }
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          You might also find these calculators useful:
        </p>
        <SEOList items={[
          `Use ${createInternalLink('proportion')} for ratio and proportion problems`,
          `Try ${createInternalLink('crossMultiplication')} to practice cross multiplication`,
          `See ${createInternalLink('midpoint')} for coordinate midpoint calculations`
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
