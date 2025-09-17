import StandardFormToSlopeCalculator from '../../_components/calculators/StandardFormToSlopeCalculator';
import CopyIframeButton from '../../_components/ui/CopyIframeButton';

export default function StandardFormToSlopeInterceptPage() {
  return (
    <main>
      <h1>Standard Form to Slope Intercept Form Calculator - Convert Linear Equations</h1>
      
      <p>
        Convert linear equations from standard form (Ax + By = C) to slope intercept form (y = mx + b) 
        instantly with our free online calculator. Whether you&apos;re working on algebra homework, 
        graphing linear functions, or studying coordinate geometry, our tool provides accurate conversions in seconds.
      </p>

      <p>
        The standard form to slope intercept form conversion is essential for:
      </p>

      <ul>
        <li>Graphing linear equations easily</li>
        <li>Finding slope and y-intercept quickly</li>
        <li>Algebra homework and test preparation</li>
        <li>Understanding linear function properties</li>
        <li>Coordinate geometry problems</li>
      </ul>

      <p>
        Simply enter the coefficients A, B, and C from your standard form equation, 
        and we&apos;ll instantly convert it to slope intercept form. No registration required - completely free to use!
      </p>

      <div className="flex flex-col items-center space-y-6">
        <StandardFormToSlopeCalculator />
        
        <div className="text-center">
          <CopyIframeButton slug="standard-form-to-slope-intercept" />
        </div>
      </div>

      <section>
        <h2>How to Convert Standard Form to Slope Intercept Form</h2>
        <p>
          To convert from standard form (Ax + By = C) to slope intercept form (y = mx + b):
        </p>
        <ol>
          <li>Start with: <strong>Ax + By = C</strong></li>
          <li>Subtract Ax from both sides: <strong>By = -Ax + C</strong></li>
          <li>Divide by B: <strong>y = (-A/B)x + (C/B)</strong></li>
          <li>Simplify: <strong>y = mx + b</strong> where m = -A/B and b = C/B</li>
        </ol>
        <p>
          <strong>Note:</strong> If B = 0, the line is vertical and has an undefined slope.
        </p>
      </section>

      <section>
        <h2>Example Conversion</h2>
        <p>
          <strong>Standard Form:</strong> 3x + 2y = 6
        </p>
        <p>
          <strong>Step 1:</strong> 2y = -3x + 6
        </p>
        <p>
          <strong>Step 2:</strong> y = (-3/2)x + (6/2)
        </p>
        <p>
          <strong>Slope Intercept Form:</strong> y = -1.5x + 3
        </p>
        <p>
          <strong>Slope (m):</strong> -1.5, <strong>Y-intercept (b):</strong> 3
        </p>
      </section>

      <section>
        <h2>Common Standard Form Examples</h2>
        <p>
          <strong>2x + 3y = 12</strong> → y = -0.67x + 4
        </p>
        <p>
          <strong>5x - 2y = 10</strong> → y = 2.5x - 5
        </p>
        <p>
          <strong>x + y = 5</strong> → y = -x + 5
        </p>
        <p>
          <strong>4x = 8</strong> → x = 2 (vertical line)
        </p>
      </section>

      <section>
        <h2>Why Use Our Standard Form to Slope Intercept Calculator?</h2>
        <ul>
          <li>Instant conversion with no calculation errors</li>
          <li>Handles all types of linear equations</li>
          <li>Shows step-by-step results (slope, y-intercept, equation)</li>
          <li>Works with decimal coefficients</li>
          <li>Completely free and no registration required</li>
          <li>Mobile-friendly and easy to use</li>
        </ul>
      </section>
    </main>
  );
}
