import TrigonometryCalculator from '../../../_components/calculators/TrigonometryCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function TrigonometryPage() {
  return (
    <CalculatorPageTemplate
      title="Trigonometry Calculator - Calculate Sin, Cos, Tan, Csc, Sec, Cot"
      description="Calculate all six trigonometric functions instantly with our free online trigonometry calculator. Perfect for math homework, engineering calculations, and any task requiring trigonometric values."
      calculator={<TrigonometryCalculator />}
      slug="math/trigonometry"
      category="Trigonometry"
      features={[
        "Calculate all six trigonometric functions",
        "Works with degrees and radians",
        "Shows quadrant information",
        "Reference angle calculations",
        "Step-by-step results",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="How to Use Our Trigonometry Calculator">
        <p>
          Our trigonometry calculator makes it easy to find all six trigonometric functions for any angle. Simply enter your angle value and choose whether it's in degrees or radians.
        </p>
        <SEOList items={[
          "Enter Angle: Input your angle value in the angle field.",
          "Select Type: Choose whether your angle is in degrees or radians using the radio buttons.",
          "Calculate: Click the 'Calculate Trigonometric Functions' button.",
          "Get Results: The calculator will display all six trigonometric functions (sin, cos, tan, csc, sec, cot) along with additional information like quadrant and reference angle."
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Trigonometric Functions">
        <p>
          Trigonometry is the branch of mathematics that deals with the relationships between the sides and angles of triangles. The six trigonometric functions are fundamental to understanding these relationships.
        </p>
        
        <h3>Basic Trigonometric Functions</h3>
        <SEOList items={[
          "Sine (sin): The ratio of the opposite side to the hypotenuse in a right triangle.",
          "Cosine (cos): The ratio of the adjacent side to the hypotenuse in a right triangle.",
          "Tangent (tan): The ratio of the opposite side to the adjacent side in a right triangle."
        ]} />
        
        <h3>Reciprocal Trigonometric Functions</h3>
        <SEOList items={[
          "Cosecant (csc): The reciprocal of sine (1/sin).",
          "Secant (sec): The reciprocal of cosine (1/cos).",
          "Cotangent (cot): The reciprocal of tangent (1/tan)."
        ]} />
      </SEOSection>

      <SEOSection title="The Unit Circle and Quadrants">
        <p>
          Understanding the unit circle is crucial for trigonometry. The unit circle is a circle with radius 1 centered at the origin of a coordinate plane. Angles are measured from the positive x-axis, and the circle is divided into four quadrants.
        </p>
        <SEOList items={[
          "Quadrant I (0° to 90°): All trigonometric functions are positive.",
          "Quadrant II (90° to 180°): Only sine and cosecant are positive.",
          "Quadrant III (180° to 270°): Only tangent and cotangent are positive.",
          "Quadrant IV (270° to 360°): Only cosine and secant are positive."
        ]} />
        <p>
          This is often remembered with the acronym "All Students Take Calculus" (ASTC) or "All Silver Tea Cups" (ASTC).
        </p>
      </SEOSection>

      <SEOSection title="Degrees vs Radians">
        <p>
          Angles can be measured in two main units: degrees and radians. Our calculator supports both.
        </p>
        <SEOList items={[
          "Degrees: A full circle is 360 degrees. This is the most common unit in everyday use.",
          "Radians: A full circle is 2π radians. This is the standard unit in higher mathematics and calculus.",
          "Conversion: To convert degrees to radians, multiply by π/180. To convert radians to degrees, multiply by 180/π."
        ]} />
        <SEOFormula 
          formula="Radians = Degrees × (π/180)"
          description="Conversion from degrees to radians"
        />
        <SEOFormula 
          formula="Degrees = Radians × (180/π)"
          description="Conversion from radians to degrees"
        />
      </SEOSection>

      <SEOSection title="Common Trigonometric Values">
        <p>
          There are several angles with exact trigonometric values that are worth memorizing:
        </p>
        <SEOExample
          title="Special Angles and Their Values"
          description="These angles have exact values that can be expressed as fractions or square roots:"
          calculation="30°: sin = 1/2, cos = √3/2, tan = 1/√3"
          result="45°: sin = √2/2, cos = √2/2, tan = 1"
        />
        <SEOExample
          title="More Special Angles"
          description="Additional important angles:"
          calculation="60°: sin = √3/2, cos = 1/2, tan = √3"
          result="90°: sin = 1, cos = 0, tan = undefined"
        />
      </SEOSection>

      <SEOSection title="Real-World Applications of Trigonometry">
        <p>
          Trigonometry is used extensively in many fields beyond mathematics:
        </p>
        <SEOList items={[
          "Engineering: Structural analysis, electrical engineering, mechanical design, and civil engineering all rely heavily on trigonometric calculations.",
          "Physics: Wave analysis, harmonic motion, and electromagnetic field calculations use trigonometric functions.",
          "Computer Graphics: 3D modeling, animation, and game development use trigonometry for rotations and transformations.",
          "Navigation: GPS systems, aviation, and maritime navigation depend on trigonometric calculations.",
          "Architecture: Building design, roof pitch calculations, and structural integrity analysis.",
          "Medicine: Medical imaging, radiation therapy, and biomechanics use trigonometric principles."
        ]} />
      </SEOSection>

      <SEOSection title="Trigonometric Identities">
        <p>
          Trigonometric identities are equations that are true for all values of the variables. Some fundamental identities include:
        </p>
        <SEOFormula 
          formula="sin²(θ) + cos²(θ) = 1"
          description="Pythagorean identity"
        />
        <SEOFormula 
          formula="tan(θ) = sin(θ)/cos(θ)"
          description="Tangent identity"
        />
        <SEOFormula 
          formula="1 + tan²(θ) = sec²(θ)"
          description="Secant identity"
        />
        <SEOFormula 
          formula="1 + cot²(θ) = csc²(θ)"
          description="Cosecant identity"
        />
      </SEOSection>

      <SEOSection title="Limitations and Considerations">
        <p>
          While our trigonometry calculator is highly accurate, there are some important considerations:
        </p>
        <SEOList items={[
          "Undefined Values: Some trigonometric functions are undefined at certain angles (e.g., tan(90°) is undefined).",
          "Precision: For very large angles, floating-point precision may affect the accuracy of results.",
          "Quadrant Determination: The calculator automatically determines the correct quadrant and reference angle.",
          "Angle Normalization: Angles are normalized to the 0-360° range for quadrant determination."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between degrees and radians?",
            answer: "Degrees and radians are two different units for measuring angles. A full circle is 360 degrees or 2π radians. Degrees are more common in everyday use, while radians are the standard in higher mathematics and calculus."
          },
          {
            question: "Why are some trigonometric values undefined?",
            answer: "Some trigonometric functions become undefined when their denominator equals zero. For example, tan(90°) is undefined because cos(90°) = 0, and tan = sin/cos. Similarly, csc(0°) is undefined because sin(0°) = 0."
          },
          {
            question: "What is a reference angle?",
            answer: "A reference angle is the acute angle between the terminal side of an angle and the x-axis. It's always between 0° and 90° and helps determine the sign of trigonometric functions in different quadrants."
          },
          {
            question: "How do I remember which functions are positive in each quadrant?",
            answer: "Use the acronym 'All Students Take Calculus' (ASTC): All functions are positive in Quadrant I, Sine and its reciprocal (cosecant) are positive in Quadrant II, Tangent and its reciprocal (cotangent) are positive in Quadrant III, and Cosine and its reciprocal (secant) are positive in Quadrant IV."
          },
          {
            question: "Can I use this calculator for complex numbers?",
            answer: "This calculator is designed for real number inputs. For complex number trigonometry, you would need specialized complex analysis tools."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding trigonometry is essential for success in mathematics, science, and engineering. Our <strong>Trigonometry Calculator</strong> provides instant access to all six trigonometric functions, making it easier to solve problems and verify calculations.
        </p>
        <p>
          Ready to explore more mathematical concepts? Check out our {createInternalLink('slope')} calculator for linear relationships, or use our {createInternalLink('area')} calculator for geometric calculations.
        </p>
      </SEOSection>

    </CalculatorPageTemplate>
  );
}
