import StandardFormToSlopeCalculator from '../../_components/calculators/StandardFormToSlopeCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOExample } from '../../_components/ui/SEOContent';

export default function StandardFormToSlopeInterceptPage() {
  return (
    <CalculatorPageTemplate
      title="Standard Form to Slope Intercept Form Calculator - Convert Linear Equations"
      description="Convert linear equations from standard form (Ax + By = C) to slope intercept form (y = mx + b) instantly with our free online calculator. Whether you're working on algebra homework, graphing linear functions, or studying coordinate geometry, our tool provides accurate conversions in seconds."
      calculator={<StandardFormToSlopeCalculator />}
      slug="standard-form-to-slope-intercept"
    >
      <SEOSection title="What is Standard Form to Slope Intercept Conversion?">
        <p>
          The standard form to slope intercept form conversion is essential for:
        </p>
        <SEOList items={[
          "Graphing linear equations easily",
          "Finding slope and y-intercept quickly",
          "Algebra homework and test preparation",
          "Understanding linear function properties",
          "Coordinate geometry problems"
        ]} />
        <p>
          Simply enter the coefficients A, B, and C from your standard form equation, 
          and we&apos;ll instantly convert it to slope intercept form. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Convert Standard Form to Slope Intercept Form">
        <p>
          To convert from standard form (Ax + By = C) to slope intercept form (y = mx + b):
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Start with: <strong>Ax + By = C</strong></li>
          <li>Subtract Ax from both sides: <strong>By = -Ax + C</strong></li>
          <li>Divide by B: <strong>y = (-A/B)x + (C/B)</strong></li>
          <li>Simplify: <strong>y = mx + b</strong> where m = -A/B and b = C/B</li>
        </ol>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <p className="text-yellow-800">
            <strong>Note:</strong> If B = 0, the line is vertical and has an undefined slope.
          </p>
        </div>
      </SEOSection>

      <SEOSection title="Example Conversion">
        <SEOExample
          title="Converting 3x + 2y = 6"
          description="Step-by-step conversion process"
          calculation="2y = -3x + 6 → y = (-3/2)x + (6/2) → y = -1.5x + 3"
          result="Slope (m): -1.5, Y-intercept (b): 3"
        />
      </SEOSection>

      <SEOSection title="Common Standard Form Examples">
        <div className="space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="font-mono text-sm">
              <div><strong>2x + 3y = 12</strong> → y = -0.67x + 4</div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="font-mono text-sm">
              <div><strong>5x - 2y = 10</strong> → y = 2.5x - 5</div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="font-mono text-sm">
              <div><strong>x + y = 5</strong> → y = -x + 5</div>
            </div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="font-mono text-sm">
              <div><strong>4x = 8</strong> → x = 2 (vertical line)</div>
            </div>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Why Use Our Standard Form to Slope Intercept Calculator?">
        <SEOList items={[
          "Instant conversion with no calculation errors",
          "Handles all types of linear equations",
          "Shows step-by-step results (slope, y-intercept, equation)",
          "Works with decimal coefficients",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
