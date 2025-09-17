import VolumeCalculator from '../../_components/calculators/VolumeCalculator';
import CalculatorPageTemplate from '../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFormula, SEOExample } from '../../_components/ui/SEOContent';

export default function VolumePage() {
  return (
    <CalculatorPageTemplate
      title="Volume Calculator - Calculate Box & Container Volumes"
      description="Calculate the volume of rectangular boxes and containers instantly with our free online volume calculator. Whether you're working on shipping calculations, storage planning, or any task requiring volume measurements, our tool provides accurate results in seconds."
      calculator={<VolumeCalculator />}
      slug="volume"
    >
      <SEOSection title="What is Volume?">
        <p>
          The volume of a rectangular box is calculated by multiplying length, width, and height. 
          This formula works for:
        </p>
        <SEOList items={[
          "Shipping boxes and containers",
          "Storage bins and crates",
          "Room volumes for HVAC calculations",
          "Aquarium and tank measurements"
        ]} />
        <p>
          Simply enter the length, width, and height in the calculator, and we&apos;ll instantly calculate 
          the total volume for you. No registration required - completely free to use!
        </p>
      </SEOSection>

      <SEOSection title="How to Calculate Volume">
        <p>
          The formula for calculating the volume of a rectangular box is:
        </p>
        <SEOFormula 
          formula="Volume = Length × Width × Height"
          description="Multiply all three dimensions to get the total volume"
        />
        <p>
          For example, if you have a box with length 10, width 5, and height 3 units, 
          the volume would be 10 × 5 × 3 = 150 cubic units.
        </p>
      </SEOSection>

      <SEOSection title="Common Volume Calculations">
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

      <SEOSection title="Why Use Our Volume Calculator?">
        <SEOList items={[
          "Instant calculations with no math errors",
          "Works with any unit of measurement (inches, feet, meters, etc.)",
          "Handles decimal numbers for precise measurements",
          "Completely free and no registration required",
          "Mobile-friendly and easy to use"
        ]} />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
