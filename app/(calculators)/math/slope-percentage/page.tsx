import SlopePercentageCalculator from '../../../_components/calculators/SlopePercentageCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula, SEOExample } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SlopePercentagePage() {
  return (
    <CalculatorPageTemplate
      title="Slope Percentage Calculator - Calculate Slope Percentage & Grade - Free Online Tool"
      description="Calculate slope percentage from rise/run, two points, or slope value. Convert slope to percentage grade for construction, engineering, and surveying applications with step-by-step solutions."
      calculator={<SlopePercentageCalculator />}
      slug="math/slope-percentage"
      category="Algebra"
      features={[
        "Calculate from rise/run",
        "Calculate from two points",
        "Convert slope to percentage",
        "Step-by-step calculations",
        "Angle calculation",
        "Interpretation of results",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Slope Percentage: Essential for Construction and Engineering">
        <p>
          <strong>Slope percentage</strong> is a crucial measurement in construction, engineering, surveying, and many practical applications. It expresses the steepness of a slope as a percentage, making it easier to understand and communicate than raw slope values. Our <strong>Slope Percentage Calculator</strong> makes it easy to calculate slope percentage from various inputs, converting between different formats with instant, accurate results.
        </p>
        <p>
          Slope percentage is commonly used to describe road grades, wheelchair ramps, roof pitches, and terrain steepness. Understanding how to calculate and interpret slope percentage is essential for professionals in construction, civil engineering, architecture, and landscape design, as well as students learning algebra and geometry.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Slope Percentage Calculator">
        <p>
          Our <strong>slope percentage calculator</strong> is designed for simplicity and flexibility. Follow these steps:
        </p>
        <SEOList items={[
          "<strong>Select Calculation Method:</strong> Choose from three options: Rise and Run, Two Points, or Slope Value.",
          "<strong>Enter Values:</strong> Input the required values based on your selected method.",
          "<strong>Calculate:</strong> Click the 'Calculate Slope Percentage' button to get instant results.",
          "<strong>Review Results:</strong> The calculator displays slope percentage, slope, angle, interpretation, and step-by-step calculations."
        ]} ordered={true} />
        <p>
          The calculator automatically validates inputs and provides detailed explanations of the calculation process.
        </p>
      </SEOSection>

      <SEOSection title="What is Slope Percentage?">
        <p>
          <strong>Slope percentage</strong> (also called grade percentage or gradient percentage) expresses the steepness of a slope as a percentage. It's calculated by multiplying the slope (rise over run) by 100.
        </p>

        <SEOFormula
          formula="Slope Percentage = (Rise / Run) × 100"
          description="Slope percentage equals the ratio of vertical change to horizontal change, multiplied by 100."
        />

        <SEOFormula
          formula="Slope Percentage = Slope × 100"
          description="If you know the slope value, simply multiply by 100 to get the percentage."
        />

        <h3>Why Use Percentage Instead of Slope?</h3>
        <SEOList items={[
          "Easier to understand: 10% is more intuitive than 0.1",
          "Industry standard: Construction and engineering commonly use percentages",
          "Better communication: Percentages are universally understood",
          "Practical applications: Road grades, ramps, and pitches are specified in percentages"
        ]} />
      </SEOSection>

      <SEOSection title="How to Calculate Slope Percentage (Manual Methods)">
        <h3>Method 1: From Rise and Run</h3>
        <SEOList items={[
          "Measure the vertical change (rise)",
          "Measure the horizontal change (run)",
          "Divide rise by run to get slope",
          "Multiply by 100 to get percentage"
        ]} ordered={true} />

        <SEOExample
          title="Example: Calculate slope percentage from rise = 5 and run = 100"
          description="Find the slope percentage when rise is 5 units and run is 100 units."
          calculation="Slope = 5 / 100 = 0.05, Slope Percentage = 0.05 × 100 = 5%"
          result="Slope Percentage = 5%"
        />

        <h3>Method 2: From Two Points</h3>
        <SEOList items={[
          "Identify two points: (x₁, y₁) and (x₂, y₂)",
          "Calculate rise = y₂ - y₁",
          "Calculate run = x₂ - x₁",
          "Calculate slope = rise / run",
          "Multiply by 100 to get percentage"
        ]} ordered={true} />

        <SEOExample
          title="Example: Calculate slope percentage from points (0, 0) and (100, 8)"
          description="Find the slope percentage between two points."
          calculation="Rise = 8 - 0 = 8, Run = 100 - 0 = 100, Slope = 8/100 = 0.08, Slope Percentage = 0.08 × 100 = 8%"
          result="Slope Percentage = 8%"
        />

        <h3>Method 3: From Slope Value</h3>
        <SEOList items={[
          "Start with the slope value (e.g., 0.05)",
          "Multiply by 100",
          "Result is the slope percentage"
        ]} ordered={true} />

        <SEOExample
          title="Example: Convert slope 0.12 to percentage"
          description="Convert a slope value to percentage."
          calculation="Slope Percentage = 0.12 × 100 = 12%"
          result="Slope Percentage = 12%"
        />
      </SEOSection>

      <SEOSection title="Interpreting Slope Percentage Values">
        <p>
          Understanding what different slope percentage values mean in practical terms:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">0% - 5%</h4>
            <p className="text-sm text-green-700">Very gentle slope - Suitable for most purposes, easy to navigate</p>
            <p className="text-sm text-green-600 mt-2"><strong>Examples:</strong> Flat roads, parking lots, accessible ramps</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">5% - 10%</h4>
            <p className="text-sm text-blue-700">Gentle slope - Common for roads and ramps</p>
            <p className="text-sm text-blue-600 mt-2"><strong>Examples:</strong> Residential streets, wheelchair ramps (max 8.33%)</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">10% - 25%</h4>
            <p className="text-sm text-yellow-700">Moderate slope - Requires careful navigation</p>
            <p className="text-sm text-yellow-600 mt-2"><strong>Examples:</strong> Steep roads, hiking trails, roof pitches</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-900 mb-2">25%+</h4>
            <p className="text-sm text-red-700">Steep slope - Challenging terrain</p>
            <p className="text-sm text-red-600 mt-2"><strong>Examples:</strong> Mountain roads, extreme sports, difficult terrain</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Real-World Applications of Slope Percentage">
        <p>
          <strong>Slope percentage</strong> is used extensively in practical applications:
        </p>
        <SEOList items={[
          "<strong>Road Construction:</strong> Designing safe road grades. Most highways are 2-8%, with maximum grades specified by regulations (typically 6-12% depending on road type).",
          "<strong>Wheelchair Ramps:</strong> ADA (Americans with Disabilities Act) requires ramps to have a maximum slope of 8.33% (1:12 ratio).",
          "<strong>Roof Design:</strong> Calculating roof pitch as a percentage for proper drainage and structural design.",
          "<strong>Surveying:</strong> Measuring terrain steepness and creating topographic maps.",
          "<strong>Landscape Architecture:</strong> Designing slopes for drainage, accessibility, and aesthetics.",
          "<strong>Sports and Recreation:</strong> Measuring ski slopes, hiking trails, and athletic tracks.",
          "<strong>Railroad Engineering:</strong> Designing track grades for safe and efficient train operations.",
          "<strong>Drainage Systems:</strong> Ensuring proper slope for water flow in pipes and channels.",
          "<strong>Construction Safety:</strong> Determining safe working angles and equipment operation limits."
        ]} />
      </SEOSection>

      <SEOSection title="Slope Percentage vs. Slope Ratio vs. Angle">
        <p>
          Understanding the relationship between different slope measurements:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Slope Percentage</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Slope Ratio</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Slope Value</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Angle (degrees)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm font-mono">5%</td>
                <td className="px-4 py-2 text-sm font-mono">1:20</td>
                <td className="px-4 py-2 text-sm font-mono">0.05</td>
                <td className="px-4 py-2 text-sm font-mono">2.86°</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 text-sm font-mono">8.33%</td>
                <td className="px-4 py-2 text-sm font-mono">1:12</td>
                <td className="px-4 py-2 text-sm font-mono">0.0833</td>
                <td className="px-4 py-2 text-sm font-mono">4.76°</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono">10%</td>
                <td className="px-4 py-2 text-sm font-mono">1:10</td>
                <td className="px-4 py-2 text-sm font-mono">0.10</td>
                <td className="px-4 py-2 text-sm font-mono">5.71°</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 text-sm font-mono">25%</td>
                <td className="px-4 py-2 text-sm font-mono">1:4</td>
                <td className="px-4 py-2 text-sm font-mono">0.25</td>
                <td className="px-4 py-2 text-sm font-mono">14.04°</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono">45° equivalent</td>
                <td className="px-4 py-2 text-sm font-mono">1:1</td>
                <td className="px-4 py-2 text-sm font-mono">1.00</td>
                <td className="px-4 py-2 text-sm font-mono">45.00°</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          <strong>Note:</strong> 8.33% (1:12) is the maximum slope for ADA-compliant wheelchair ramps. 45° corresponds to 100% slope (1:1 ratio).
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between slope and slope percentage?",
            answer: "Slope is the ratio of rise to run (e.g., 0.05), while slope percentage multiplies this by 100 (e.g., 5%). Slope percentage is more intuitive for practical applications like construction and engineering."
          },
          {
            question: "How do I convert slope to percentage?",
            answer: "Multiply the slope value by 100. For example, slope 0.08 = 8% slope percentage. You can use our calculator to do this automatically."
          },
          {
            question: "What is the maximum slope percentage for a wheelchair ramp?",
            answer: "ADA regulations require wheelchair ramps to have a maximum slope of 8.33% (1:12 ratio). This means for every 12 inches of horizontal run, the ramp can rise no more than 1 inch."
          },
          {
            question: "What does a 10% slope mean?",
            answer: "A 10% slope means that for every 100 units of horizontal distance, the elevation changes by 10 units vertically. This is equivalent to a 1:10 ratio or a slope of 0.10."
          },
          {
            question: "Can slope percentage be negative?",
            answer: "Yes, negative slope percentage indicates a downward slope. Positive values indicate upward slopes. The calculator handles both positive and negative values."
          },
          {
            question: "How is slope percentage used in road construction?",
            answer: "Road grades are specified as percentages. Most highways use 2-8% grades, with maximum grades of 6-12% depending on road type and location. Steeper grades require slower speed limits and special considerations."
          },
          {
            question: "What is the relationship between slope percentage and angle?",
            answer: "Angle = arctan(slope) = arctan(slope percentage / 100). For small slopes, angle (in degrees) ≈ slope percentage × 0.573. Our calculator automatically calculates the angle."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering <strong>slope percentage</strong> calculations is essential for professionals in construction, engineering, architecture, and surveying. Our <strong>Slope Percentage Calculator</strong> simplifies these calculations, converting between slope values, percentages, and angles with instant, accurate results. Whether you're designing roads, planning wheelchair ramps, calculating roof pitches, or working on surveying projects, understanding slope percentage will help you communicate and implement designs effectively.
        </p>
        <p>
          For related tools, check out our {createInternalLink('slope')} for general slope calculations, our {createInternalLink('distance-formula')} for distance calculations, or our {createInternalLink('pythagorean-theorem')} for right triangle calculations that often complement slope measurements.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

