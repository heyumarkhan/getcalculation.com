import { Metadata } from 'next';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import AverageCalculator from '../../../_components/calculators/AverageCalculator';

export const metadata: Metadata = {
  title: 'Average Calculator - Free Online Math Calculator',
  description: 'Calculate arithmetic, geometric, harmonic, and weighted averages. Free online average calculator with step-by-step solutions and explanations.',
  keywords: ['average calculator', 'arithmetic mean', 'geometric mean', 'harmonic mean', 'weighted average', 'math calculator', 'statistics'],
  openGraph: {
    title: 'Average Calculator - Free Online Math Calculator',
    description: 'Calculate arithmetic, geometric, harmonic, and weighted averages. Free online average calculator with step-by-step solutions and explanations.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GetCalculation - Free Online Math Calculators',
      },
    ],
  },
};

export default function AveragePage() {
  return (
    <CalculatorPageTemplate
      title="Average Calculator"
      description="Calculate different types of averages: arithmetic, geometric, harmonic, and weighted averages with step-by-step solutions and explanations."
      calculator={<AverageCalculator />}
      slug="math/average"
      category="Statistics"
      features={[
        "Calculate arithmetic mean (simple average)",
        "Calculate geometric mean",
        "Calculate harmonic mean",
        "Calculate weighted average",
        "Step-by-step solutions with explanations",
        "Support for multiple number formats",
        "Mobile-friendly interface"
      ]}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is an Average?</h2>
          <p className="text-lg text-gray-700 mb-4">
            An average is a measure of central tendency that represents the typical value in a set of numbers. There are several types of averages, each with specific applications and mathematical properties. Understanding different types of averages is crucial in statistics, mathematics, and data analysis.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The most common types of averages are:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-4 space-y-2">
            <li><strong>Arithmetic Mean</strong> - The sum of all values divided by the count</li>
            <li><strong>Geometric Mean</strong> - The nth root of the product of n values</li>
            <li><strong>Harmonic Mean</strong> - The reciprocal of the arithmetic mean of reciprocals</li>
            <li><strong>Weighted Average</strong> - Each value multiplied by its weight, then divided by the sum of weights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use the Average Calculator</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Step 1: Select Average Type</h3>
              <p className="text-blue-800">Choose from four different types of averages: arithmetic mean, geometric mean, harmonic mean, or weighted average.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-2">Step 2: Enter Numbers</h3>
              <p className="text-green-800">Input your numbers separated by commas. For weighted average, also enter the corresponding weights.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Step 3: Get Your Results</h3>
              <p className="text-purple-800">The calculator will provide the average, step-by-step calculation, and detailed explanation.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Averages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Arithmetic Mean</h3>
              <p className="text-gray-700 mb-2">The most common type of average, calculated by summing all values and dividing by the count.</p>
              <p className="text-sm text-gray-600 mb-2">Formula: (x₁ + x₂ + ... + xₙ) / n</p>
              <p className="text-sm text-gray-600">Use for: General data analysis, test scores, temperatures</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Geometric Mean</h3>
              <p className="text-gray-700 mb-2">The nth root of the product of n values, useful for growth rates and ratios.</p>
              <p className="text-sm text-gray-600 mb-2">Formula: ⁿ√(x₁ × x₂ × ... × xₙ)</p>
              <p className="text-sm text-gray-600">Use for: Investment returns, growth rates, ratios</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Harmonic Mean</h3>
              <p className="text-gray-700 mb-2">The reciprocal of the arithmetic mean of reciprocals, useful for rates and speeds.</p>
              <p className="text-sm text-gray-600 mb-2">Formula: n / (1/x₁ + 1/x₂ + ... + 1/xₙ)</p>
              <p className="text-sm text-gray-600">Use for: Average speeds, rates, ratios of rates</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Weighted Average</h3>
              <p className="text-gray-700 mb-2">Each value is multiplied by its weight, then divided by the sum of weights.</p>
              <p className="text-sm text-gray-600 mb-2">Formula: (w₁x₁ + w₂x₂ + ... + wₙxₙ) / (w₁ + w₂ + ... + wₙ)</p>
              <p className="text-sm text-gray-600">Use for: Grade point averages, portfolio returns, survey results</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Examples</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Example 1: Arithmetic Mean</h3>
              <p className="text-blue-800">Find the average of 10, 20, 30, 40</p>
              <p className="text-blue-800">Solution: (10 + 20 + 30 + 40) / 4 = 100 / 4 = 25</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Example 2: Geometric Mean</h3>
              <p className="text-green-800">Find the geometric mean of 2, 8, 32</p>
              <p className="text-green-800">Solution: ³√(2 × 8 × 32) = ³√(512) = 8</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Example 3: Weighted Average</h3>
              <p className="text-purple-800">Grades: 85, 90, 78 with weights: 2, 3, 1</p>
              <p className="text-purple-800">Solution: (85×2 + 90×3 + 78×1) / (2+3+1) = (170 + 270 + 78) / 6 = 86.33</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Applications of Different Averages</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Finance</h3>
                <p className="text-gray-700">Arithmetic mean for simple returns, geometric mean for compound returns, weighted average for portfolio performance.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                <p className="text-gray-700">Weighted averages for GPA calculations, arithmetic mean for test scores, harmonic mean for average speeds in physics.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Science</h3>
                <p className="text-gray-700">Geometric mean for growth rates, harmonic mean for average speeds, arithmetic mean for measurements.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Business</h3>
                <p className="text-gray-700">Weighted averages for customer satisfaction, arithmetic mean for sales data, geometric mean for growth rates.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">When to Use Each Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Arithmetic Mean</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• General data analysis</li>
                <li>• Test scores and grades</li>
                <li>• Temperature averages</li>
                <li>• Simple financial returns</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Geometric Mean</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Investment returns</li>
                <li>• Population growth rates</li>
                <li>• Ratio data</li>
                <li>• Multiplicative processes</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Harmonic Mean</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Average speeds</li>
                <li>• Rates and ratios</li>
                <li>• Electrical resistance</li>
                <li>• Time-based calculations</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Weighted Average</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• GPA calculations</li>
                <li>• Portfolio returns</li>
                <li>• Survey results</li>
                <li>• Performance metrics</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorPageTemplate>
  );
}
