import { Metadata } from 'next';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import PercentageCalculator from '../../../_components/calculators/PercentageCalculator';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Free Online Math Calculator',
  description: 'Calculate percentages, percentage changes, and percentage relationships. Free online percentage calculator with step-by-step solutions and explanations.',
  keywords: ['percentage calculator', 'percentage change calculator', 'percentage increase calculator', 'percentage decrease calculator', 'percentage of calculator', 'math calculator'],
  openGraph: {
    title: 'Percentage Calculator - Free Online Math Calculator',
    description: 'Calculate percentages, percentage changes, and percentage relationships. Free online percentage calculator with step-by-step solutions and explanations.',
    type: 'website',
  },
};

export default function PercentagePage() {
  return (
    <CalculatorPageTemplate
      title="Percentage Calculator"
      description="Calculate percentages, percentage changes, and percentage relationships with step-by-step solutions and explanations."
      calculator={<PercentageCalculator />}
      slug="math/percentage"
      category="Algebra"
      features={[
        "Calculate percentage of a number",
        "Find percentage change between values",
        "Calculate percentage increase/decrease",
        "Step-by-step solutions with explanations",
        "Multiple calculation types supported",
        "Mobile-friendly interface"
      ]}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Percentage?</h2>
          <p className="text-lg text-gray-700 mb-4">
            A percentage is a way of expressing a number as a fraction of 100. It&apos;s commonly used to compare values, show changes, and represent proportions. Percentages are essential in mathematics, finance, statistics, and everyday life.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The basic percentage formula is: <strong>Percentage = (Part / Whole) × 100</strong>
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-4 space-y-2">
            <li><strong>Part</strong> = the portion you want to find the percentage of</li>
            <li><strong>Whole</strong> = the total amount</li>
            <li><strong>Percentage</strong> = the result expressed as a percentage</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use the Percentage Calculator</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Step 1: Select Calculation Type</h3>
              <p className="text-blue-800">Choose from five different percentage calculations: percentage of, percentage change, percentage increase, percentage decrease, or find percentage of a number.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-2">Step 2: Enter Values</h3>
              <p className="text-green-800">Input the required values based on your selected calculation type. The calculator will guide you with appropriate labels.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Step 3: Get Your Results</h3>
              <p className="text-purple-800">The calculator will provide the percentage result, explanation, and step-by-step calculation process.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Percentage Calculation Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What percentage is X of Y?</h3>
              <p className="text-gray-700 mb-2">Finds what percentage one number is of another.</p>
              <p className="text-sm text-gray-600">Formula: (X / Y) × 100</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is X% of Y?</h3>
              <p className="text-gray-700 mb-2">Finds a specific percentage of a number.</p>
              <p className="text-sm text-gray-600">Formula: (X / 100) × Y</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Percentage Change</h3>
              <p className="text-gray-700 mb-2">Calculates the percentage change between two values.</p>
              <p className="text-sm text-gray-600">Formula: ((New - Old) / Old) × 100</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Percentage Increase/Decrease</h3>
              <p className="text-gray-700 mb-2">Calculates percentage increase or decrease from one value to another.</p>
              <p className="text-sm text-gray-600">Formula: ((New - Old) / Old) × 100</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Percentage Examples</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Example 1: What percentage is 25 of 200?</h3>
              <p className="text-blue-800">Solution: (25 / 200) × 100 = 12.5%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Example 2: What is 15% of 80?</h3>
              <p className="text-green-800">Solution: (15 / 100) × 80 = 12</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Example 3: Percentage change from 50 to 75</h3>
              <p className="text-purple-800">Solution: ((75 - 50) / 50) × 100 = 50% increase</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Applications of Percentages</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Finance</h3>
                <p className="text-gray-700">Interest rates, discounts, taxes, and investment returns.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
                <p className="text-gray-700">Data analysis, survey results, and statistical comparisons.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Science</h3>
                <p className="text-gray-700">Concentration calculations, error margins, and experimental results.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Business</h3>
                <p className="text-gray-700">Profit margins, growth rates, and performance metrics.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Percentage Tips and Tricks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Calculations</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• 10% = divide by 10</li>
                <li>• 25% = divide by 4</li>
                <li>• 50% = divide by 2</li>
                <li>• 75% = multiply by 3, divide by 4</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Mistakes</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Forgetting to multiply by 100</li>
                <li>• Confusing percentage increase with percentage of</li>
                <li>• Not considering the base value correctly</li>
                <li>• Mixing up percentage points and percentages</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorPageTemplate>
  );
}
