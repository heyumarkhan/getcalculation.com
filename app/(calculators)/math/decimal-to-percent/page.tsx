import { Metadata } from 'next';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import DecimalToPercentCalculator from '../../../_components/calculators/DecimalToPercentCalculator';

export const metadata: Metadata = {
  title: 'Decimal to Percent Calculator - Free Online Math Calculator',
  description: 'Convert between decimals, percentages, and fractions. Free online decimal to percent calculator with step-by-step solutions and explanations.',
  keywords: ['decimal to percent calculator', 'percent to decimal calculator', 'fraction to percent calculator', 'percent to fraction calculator', 'decimal converter', 'math calculator'],
  openGraph: {
    title: 'Decimal to Percent Calculator - Free Online Math Calculator',
    description: 'Convert between decimals, percentages, and fractions. Free online decimal to percent calculator with step-by-step solutions and explanations.',
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

export default function DecimalToPercentPage() {
  return (
    <CalculatorPageTemplate
      title="Decimal to Percent Calculator"
      description="Convert between decimals, percentages, and fractions with step-by-step solutions and explanations."
      calculator={<DecimalToPercentCalculator />}
      slug="math/decimal-to-percent"
      category="Algebra"
      features={[
        "Convert decimal to percentage",
        "Convert percentage to decimal",
        "Convert fraction to percentage",
        "Convert percentage to fraction",
        "Step-by-step solutions with explanations",
        "Support for various number formats",
        "Mobile-friendly interface"
      ]}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Decimal to Percent Conversion?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Decimal to percent conversion is a fundamental mathematical operation that allows you to express decimal numbers as percentages. This conversion is essential in many areas including finance, statistics, science, and everyday calculations.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The basic conversion formulas are:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-4 space-y-2">
            <li><strong>Decimal to Percent:</strong> Multiply by 100</li>
            <li><strong>Percent to Decimal:</strong> Divide by 100</li>
            <li><strong>Fraction to Percent:</strong> Divide numerator by denominator, then multiply by 100</li>
            <li><strong>Percent to Fraction:</strong> Write percentage over 100, then simplify</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use the Decimal to Percent Calculator</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Step 1: Select Conversion Type</h3>
              <p className="text-blue-800">Choose from four conversion types: decimal to percent, percent to decimal, fraction to percent, or percent to fraction.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-2">Step 2: Enter Values</h3>
              <p className="text-green-800">Input your values based on the selected conversion type. For fractions, enter both numerator and denominator.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Step 3: Get Your Results</h3>
              <p className="text-purple-800">The calculator will provide the converted values, step-by-step calculation, and detailed explanation.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Conversion Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Decimal to Percent</h3>
              <p className="text-gray-700 mb-2">Convert decimal numbers to percentages by multiplying by 100.</p>
              <p className="text-sm text-gray-600 mb-2">Formula: Decimal × 100 = Percent</p>
              <p className="text-sm text-gray-600">Example: 0.25 × 100 = 25%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Percent to Decimal</h3>
              <p className="text-gray-700 mb-2">Convert percentages to decimal numbers by dividing by 100.</p>
              <p className="text-sm text-gray-600 mb-2">Formula: Percent ÷ 100 = Decimal</p>
              <p className="text-sm text-gray-600">Example: 25% ÷ 100 = 0.25</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fraction to Percent</h3>
              <p className="text-gray-700 mb-2">Convert fractions to percentages by dividing numerator by denominator, then multiplying by 100.</p>
              <p className="text-sm text-gray-600 mb-2">Formula: (Numerator ÷ Denominator) × 100 = Percent</p>
              <p className="text-sm text-gray-600">Example: (1 ÷ 4) × 100 = 25%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Percent to Fraction</h3>
              <p className="text-gray-700 mb-2">Convert percentages to fractions by writing over 100, then simplifying.</p>
              <p className="text-sm text-gray-600 mb-2">Formula: Percent/100 = Fraction</p>
              <p className="text-sm text-gray-600">Example: 25% = 25/100 = 1/4</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Examples</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Example 1: Decimal to Percent</h3>
              <p className="text-blue-800">Convert 0.75 to percentage</p>
              <p className="text-blue-800">Solution: 0.75 × 100 = 75%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Example 2: Percent to Decimal</h3>
              <p className="text-green-800">Convert 60% to decimal</p>
              <p className="text-green-800">Solution: 60% ÷ 100 = 0.60</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Example 3: Fraction to Percent</h3>
              <p className="text-purple-800">Convert 3/5 to percentage</p>
              <p className="text-purple-800">Solution: (3 ÷ 5) × 100 = 0.6 × 100 = 60%</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">Example 4: Percent to Fraction</h3>
              <p className="text-orange-800">Convert 40% to fraction</p>
              <p className="text-orange-800">Solution: 40% = 40/100 = 2/5</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Applications of Decimal-Percent Conversion</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Finance</h3>
                <p className="text-gray-700">Interest rates, investment returns, loan calculations, and financial analysis.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
                <p className="text-gray-700">Data analysis, survey results, probability calculations, and statistical reporting.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Science</h3>
                <p className="text-gray-700">Concentration calculations, error margins, experimental results, and scientific measurements.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Business</h3>
                <p className="text-gray-700">Profit margins, growth rates, performance metrics, and business analytics.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Reference Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Decimal</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Percent</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Fraction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">0.1</td>
                  <td className="px-4 py-2 text-sm text-gray-700">10%</td>
                  <td className="px-4 py-2 text-sm text-gray-700">1/10</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">0.25</td>
                  <td className="px-4 py-2 text-sm text-gray-700">25%</td>
                  <td className="px-4 py-2 text-sm text-gray-700">1/4</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">0.5</td>
                  <td className="px-4 py-2 text-sm text-gray-700">50%</td>
                  <td className="px-4 py-2 text-sm text-gray-700">1/2</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">0.75</td>
                  <td className="px-4 py-2 text-sm text-gray-700">75%</td>
                  <td className="px-4 py-2 text-sm text-gray-700">3/4</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-sm text-gray-700">1.0</td>
                  <td className="px-4 py-2 text-sm text-gray-700">100%</td>
                  <td className="px-4 py-2 text-sm text-gray-700">1/1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Tips and Tricks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Conversions</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Move decimal point 2 places right for decimal to percent</li>
                <li>• Move decimal point 2 places left for percent to decimal</li>
                <li>• Common fractions: 1/4 = 25%, 1/2 = 50%, 3/4 = 75%</li>
                <li>• Use calculator for complex conversions</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Common Mistakes</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Forgetting to multiply/divide by 100</li>
                <li>• Confusing decimal places</li>
                <li>• Not simplifying fractions</li>
                <li>• Mixing up conversion directions</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorPageTemplate>
  );
}
