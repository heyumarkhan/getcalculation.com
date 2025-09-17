import VolumeCalculator from '../../_components/calculators/VolumeCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function VolumePage() {
  return (
    <CalculatorPageTemplate
      title="Volume Calculator - Calculate Rectangular Prism & Triangular Pyramid Volumes"
      description="Calculate the volume of rectangular prisms and triangular pyramids instantly with our free online volume calculator. Whether you're working on geometry homework, engineering projects, or any task requiring 3D volume calculations, our tool provides accurate results in seconds."
      calculator={<VolumeCalculator />}
      slug="volume"
    >
      <SEOSection title="What is Volume?">
        <p>
          Volume is the amount of space occupied by a three-dimensional object. Our calculator supports 
          two common 3D shapes with different volume formulas. This calculator works for:
        </p>
        <SEOList items={[
          "Rectangular prisms (boxes, containers, rooms)",
          "Triangular pyramids (tetrahedrons, architectural features)",
          "Geometry homework and assignments",
          "Engineering and architectural calculations",
          "3D modeling and design projects"
        ]} />
        <p>
          Simply select your shape, enter the required dimensions, and we&apos;ll instantly calculate 
          the volume for you. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="Volume Formulas">
        <p>
          Different shapes require different formulas to calculate volume:
        </p>
        <SEOFormula 
          formula="Rectangular Prism: V = l × w × h"
          description="Multiply length, width, and height for rectangular prisms"
        />
        <SEOFormula 
          formula="Triangular Pyramid: V = (1/3) × Base Area × Height"
          description="One-third of base area times height for triangular pyramids"
        />
        <p>
          The rectangular prism formula is straightforward multiplication, while the triangular pyramid 
          requires calculating the base area first, then applying the pyramid volume formula.
        </p>
      </SEOSection>

      <SEOSection title="Rectangular Prism Examples">
        <SEOExample
          title="Cube"
          description="If all three dimensions are equal (let's say 4 units each)"
          calculation="4 × 4 × 4 = 64 cubic units"
          result="Volume = 64 cubic units"
        />
        
        <SEOExample
          title="Box"
          description="For a box with length 8, width 6, and height 4"
          calculation="8 × 6 × 4 = 192 cubic units"
          result="Volume = 192 cubic units"
        />
      </SEOSection>

      <SEOSection title="Triangular Pyramid Examples">
        <SEOExample
          title="Simple Pyramid"
          description="Base: 6 × 4, Height: 9"
          calculation="Base Area = (6×4)/2 = 12, Volume = (1/3)×12×9 = 36"
          result="Volume = 36 cubic units"
        />
        
        <SEOExample
          title="Larger Pyramid"
          description="Base: 10 × 8, Height: 12"
          calculation="Base Area = (10×8)/2 = 40, Volume = (1/3)×40×12 = 160"
          result="Volume = 160 cubic units"
        />
      </SEOSection>

      <SEOSection title="Applications of Volume Calculations">
        <p>
          Volume calculations are used in many real-world applications:
        </p>
        <SEOList items={[
          "Architecture and construction (room volumes, material estimates)",
          "Packaging and shipping (container capacity)",
          "Engineering (fluid dynamics, structural analysis)",
          "Manufacturing (mold design, material requirements)",
          "Geometry education and homework",
          "3D printing and modeling",
          "Aquarium and tank sizing"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding the Results">
        <p>
          Our calculator provides comprehensive volume analysis:
        </p>
        <SEOList items={[
          "Shape identification and confirmation",
          "Precise volume calculation with 4 decimal places",
          "Formula used for the calculation",
          "Input dimensions for verification",
          "Support for both metric and imperial units"
        ]} />
      </SEOSection>

      <SEOSection title="Why Use Our Volume Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Supports multiple 3D shapes in one calculator",
          "Shows the formula used for each calculation",
          "Handles decimal numbers for precise measurements",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
