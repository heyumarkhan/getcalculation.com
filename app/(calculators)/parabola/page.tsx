import ParabolaCalculator from '../../_components/calculators/ParabolaCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function ParabolaPage() {
  return (
    <CalculatorPageTemplate
      title="Parabola Calculator - Find Vertex, Focus, Directrix & Properties"
      description="Calculate all properties of a parabola from its quadratic equation instantly with our free online parabola calculator. Find vertex, focus, directrix, axis of symmetry, and more for any parabola equation."
      calculator={<ParabolaCalculator />}
      slug="parabola"
    >
      <SEOSection title="What is a Parabola?">
        <p>
          A parabola is a U-shaped curve that is a conic section formed by intersecting a cone with a plane 
          parallel to one of its sides. It&apos;s defined as the set of all points equidistant from a fixed point 
          (the focus) and a fixed line (the directrix). This calculator works for:
        </p>
        <SEOList items={[
          "Standard form quadratic equations: y = ax² + bx + c",
          "Algebra homework and assignments",
          "Engineering and physics calculations",
          "Graphing and analysis problems",
          "Conic sections and geometry studies"
        ]} />
        <p>
          Simply enter the coefficients a, b, and c from your quadratic equation, and we&apos;ll instantly calculate 
          all the important properties of the parabola. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="Key Parabola Properties">
        <p>
          Our calculator finds all the essential properties of a parabola:
        </p>
        <SEOList items={[
          "Vertex: The highest or lowest point of the parabola",
          "Focus: The fixed point that defines the parabola",
          "Directrix: The fixed line perpendicular to the axis of symmetry",
          "Axis of Symmetry: The vertical line that divides the parabola into two equal halves",
          "Direction: Whether the parabola opens upward or downward",
          "Distance p: The distance from vertex to focus"
        ]} />
      </SEOSection>

      <SEOSection title="How to Calculate Parabola Properties">
        <p>
          For a quadratic equation in standard form y = ax² + bx + c:
        </p>
        <SEOFormula 
          formula="Vertex: (h, k) = (-b/(2a), f(-b/(2a)))"
          description="The vertex is found using the axis of symmetry formula"
        />
        <SEOFormula 
          formula="Focus: (h, k + p) where p = 1/(4a)"
          description="The focus is p units from the vertex along the axis of symmetry"
        />
        <SEOFormula 
          formula="Directrix: y = k - p"
          description="The directrix is p units from the vertex, opposite the focus"
        />
        <SEOFormula 
          formula="Axis of Symmetry: x = h"
          description="Vertical line passing through the vertex"
        />
      </SEOSection>

      <SEOSection title="Common Parabola Examples">
        <SEOExample
          title="Simple Parabola"
          description="For y = x² (a=1, b=0, c=0)"
          calculation="Vertex: (0,0), Focus: (0,0.25), Directrix: y = -0.25"
          result="Opens upward with vertex at origin"
        />
        
        <SEOExample
          title="Shifted Parabola"
          description="For y = x² - 4x + 3 (a=1, b=-4, c=3)"
          calculation="Vertex: (2,-1), Focus: (2,-0.75), Directrix: y = -1.25"
          result="Opens upward, shifted right and down"
        />

        <SEOExample
          title="Downward Parabola"
          description="For y = -2x² + 8x - 6 (a=-2, b=8, c=-6)"
          calculation="Vertex: (2,2), Focus: (2,1.875), Directrix: y = 2.125"
          result="Opens downward with vertex at (2,2)"
        />
      </SEOSection>

      <SEOSection title="Applications of Parabolas">
        <p>
          Parabolas have many real-world applications:
        </p>
        <SEOList items={[
          "Satellite dishes and radar antennas (parabolic reflectors)",
          "Headlights and flashlights (parabolic mirrors)",
          "Projectile motion in physics",
          "Architecture and structural design",
          "Economics and optimization problems",
          "Computer graphics and animation",
          "Telescopes and optical instruments"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Results">
        <p>
          Here&apos;s what each calculated property means:
        </p>
        <SEOList items={[
          "Vertex: The turning point where the parabola changes direction",
          "Focus: All points on the parabola are equidistant from the focus and directrix",
          "Directrix: A line perpendicular to the axis of symmetry",
          "Axis of Symmetry: The parabola is symmetric about this vertical line",
          "Direction: Determined by the sign of coefficient a",
          "Distance p: Controls how &apos;wide&apos; or &apos;narrow&apos; the parabola is"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Parabola Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Handles all standard form quadratic equations",
          "Shows all key properties in one place",
          "Clear, organized results display",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
