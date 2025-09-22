import ParabolaCalculator from '../../_components/calculators/ParabolaCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample, SEOFAQ } from '../../_components/ui/SEOContent';
import { createInternalLink } from '../../_components/ui/SEOInternalLink';

export default function ParabolaPage() {
  return (
    <CalculatorPageTemplate
      title="Parabola Calculator - Find Vertex, Focus, Directrix & Properties"
      description="Calculate all properties of a parabola from its quadratic equation instantly with our free online parabola calculator. Find vertex, focus, directrix, axis of symmetry, and more for any parabola equation."
      calculator={<ParabolaCalculator />}
      slug="parabola"
      category="Algebra"
      features={[
        "Find vertex, focus, and directrix",
        "Calculate axis of symmetry",
        "Determine opening direction",
        "Step-by-step calculations",
        "Works with any quadratic equation",
        "Mobile-friendly interface"
      ]}
    >
      <SEOSection title="Parabola Calculator: Find Vertex, Focus & Directrix Instantly">
        <p>
          From the graceful arc of a thrown ball to the precise curve of a satellite dish, parabolas are one of nature's most fundamental and useful shapes. This iconic U-shaped curve is a cornerstone of algebra and geometry, with profound applications in physics, engineering, and astronomy. However, extracting the key features of a parabola—its vertex, focus, and directrix—from an equation can be a complex and time-consuming process.
        </p>
        <p>
          That's where our <strong>Parabola Calculator</strong> comes in. This powerful tool is designed to serve as an instant <strong>parabola solver</strong>, taking any standard or general form equation and providing a complete analysis of its properties. Whether you're a student trying to master conic sections, a teacher creating examples, or a professional needing quick calculations, this guide will not only show you how to use our calculator but also help you master the concepts behind it. We'll dive deep into the formulas, explore the definitions, and make this essential mathematical concept intuitive and accessible.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Parabola Calculator">
        <p>
          Our tool is designed for both simplicity and power. It can interpret parabolic equations in various formats to quickly deliver the properties you need. Here’s a simple guide to using this <strong>parabola equation calculator</strong>:
        </p>
        <SEOList items={[
          "<strong>Select the Parabola's Orientation:</strong> First, choose whether the parabola opens vertically (up or down, like y = x²) or horizontally (left or right, like x = y²). This is determined by which variable is squared in the equation.",
          "<strong>Choose Your Equation Format:</strong> You can enter the equation in several common forms: Vertex Form (y = a(x-h)² + k), Standard Form ((x-h)² = 4p(y-k)), or General Form (y = Ax² + Bx + C).",
          "<strong>Enter the Values:</strong> Input the coefficients from your equation into the corresponding fields. For example, in the equation y = 2x² - 8x + 5, you would enter A=2, B=-8, and C=5.",
          "<strong>Calculate:</strong> Click the 'Calculate' button. The <strong>Parabola Calculator</strong> will instantly process the information and display a comprehensive list of the parabola's properties."
        ]} ordered={true} />
      </SEOSection>

      <SEOSection title="Understanding Your Results: A Full Breakdown">
        <p>
          The calculator provides more than just numbers; it gives you a complete analytical profile of your parabola. Here's what each output value represents:
        </p>
        <SEOList items={[
          "<strong>Vertex (h, k):</strong> This is the turning point of the parabola. It's the highest or lowest point on a vertical parabola or the rightmost/leftmost point on a horizontal one.",
          "<strong>Focus (x, y):</strong> A special point inside the curve. All rays parallel to the parabola's axis of symmetry reflect off the curve and pass through this single point.",
          "<strong>Directrix:</strong> A straight line outside the parabola. A parabola is geometrically defined as the set of all points that are an equal distance from the focus and the directrix.",
          "<strong>Axis of Symmetry:</strong> A line that divides the parabola into two perfectly symmetrical mirror images. It passes directly through the vertex and the focus.",
          "<strong>Focal Length (p):</strong> The distance from the vertex to the focus. Its sign determines the direction the parabola opens.",
          "<strong>Eccentricity:</strong> For any parabola, the eccentricity is always exactly 1."
        ]} />
      </SEOSection>

      <SEOSection title="The Equations of a Parabola">
        <p>
          To truly understand how our <strong>Parabola Calculator</strong> works, it's essential to understand the equations that govern its shape and properties.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">For Vertical Parabolas (opening up or down):</h3>
            <SEOList items={[
              "<strong>Vertex Form:</strong> y = a(x-h)² + k",
              "<strong>Standard (Conic) Form:</strong> (x-h)² = 4p(y-k)"
            ]} />
            <p>In both forms, the vertex is at (h, k). The relationship between 'a' and the focal length 'p' is p = 1/(4a).</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">For Horizontal Parabolas (opening right or left):</h3>
            <SEOList items={[
              "<strong>Vertex Form:</strong> x = a(y-k)² + h",
              "<strong>Standard (Conic) Form:</strong> (y-k)² = 4p(x-h)"
            ]} />
            <p>The vertex is at (h, k). If 'a' or 'p' is positive, it opens right; if negative, it opens left.</p>
          </div>
        </div>
      </SEOSection>
      
      <SEOSection title="How to Find the Properties of a Parabola (Manual Calculation)">
        <p>Let's walk through the process for the equation <strong>y = 2x² - 12x + 16</strong>.</p>
        <SEOList items={[
          "<strong>Convert to Vertex Form:</strong> By completing the square, we rearrange the equation to y = 2(x - 3)² - 2.",
          "<strong>Identify the Vertex and Find 'p':</strong> From the vertex form, we can see the Vertex is (3, -2). We calculate the focal length 'p' using the formula p = 1/(4a) = 1/(4*2) = 1/8.",
          "<strong>Calculate Focus, Directrix, and Axis of Symmetry:</strong>",
          "  • <strong>Focus:</strong> (h, k + p) = (3, -2 + 1/8) = (3, -1.875)",
          "  • <strong>Directrix:</strong> y = k - p = -2 - 1/8 = -2.125",
          "  • <strong>Axis of Symmetry:</strong> x = h = 3"
        ]} ordered={true} />
      </SEOSection>

      <SEOSection title="Real-World Applications of Parabolas">
        <p>
          Parabolas are not just abstract mathematical curves; their unique reflective property makes them essential in many areas of science and technology:
        </p>
        <SEOList items={[
          "<strong>Satellite Dishes:</strong> Incoming radio waves are reflected to a single focal point where the receiver is placed.",
          "<strong>Car Headlights & Flashlights:</strong> A light bulb placed at the focus of a parabolic reflector creates a strong, parallel beam of light.",
          "<strong>Telescope Mirrors:</strong> Parabolic mirrors collect faint light from distant stars and concentrate it onto a focal point.",
          "<strong>Projectile Motion:</strong> In physics, the path of a thrown object under gravity follows a perfect parabolic arc."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the main difference between a vertical and a horizontal parabola?",
            answer: "In a vertical parabola, the 'x' variable is squared, and it opens up or down. In a horizontal parabola, the 'y' variable is squared, and it opens left or right."
          },
          {
            question: "How does the 'a' value in y = ax²... affect the parabola's shape?",
            answer: "A larger absolute value of 'a' makes the parabola narrower, while a smaller absolute value (closer to zero) makes it wider."
          },
          {
            question: "Is the directrix a part of the parabola?",
            answer: "No, the directrix is an external reference line used to define the curve. Every point on the parabola is equidistant from the focus (a point) and the directrix (a line)."
          },
          {
            question: "What does a negative focal length ('p') mean?",
            answer: "A negative 'p' indicates the direction of opening. For a vertical parabola, it means it opens downward. For a horizontal parabola, it means it opens to the left."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The parabola is a simple curve with incredibly deep and powerful properties. While the manual calculations can be a great way to learn, our <strong>Parabola Calculator</strong> provides a reliable and instantaneous method for finding the vertex, focus, directrix, and more. By using this tool, you can spend less time on tedious algebra and more time understanding and applying the concepts. Whether you're plotting a trajectory or designing an antenna, this <strong>parabola solver</strong> is an essential resource for your mathematical toolkit.
        </p>
        <p>
          After finding the key points of your parabola, why not take your analysis a step further? You can calculate the exact distance between the vertex and the focus using our {createInternalLink('lineSegment')} to verify the focal length 'p'.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}