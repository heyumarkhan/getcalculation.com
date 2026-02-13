import HydrostaticPressureCalculator from '../../../_components/calculators/HydrostaticPressureCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function HydrostaticPressureCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Hydrostatic Pressure Calculator: Fluid Depth and Density Analysis Tool"
      description="Use the Hydrostatic Pressure Calculator to compute pressure, depth, or fluid density from rho, g, and h. Ideal for tanks, diving, and engineering."
      calculator={<HydrostaticPressureCalculator primaryColor="#820ECC" />}
      slug="physics/hydrostatic-pressure-calculator"
      category="Physics"
      features={[
        "Accurate hydrostatic pressure calculations for fluids at rest",
        "Simple inputs for density, depth, and gravity acceleration",
        "Clear, mobile-friendly layout for field or lab use",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Hydrostatic Pressure Matters in Real Systems">
        <p>
          Hydrostatic pressure drives the design of tanks, pipelines, dams, and underwater equipment by quantifying the load a fluid exerts at depth. Engineers use it to size walls, assess safety factors, and verify performance in water systems, oil storage, and marine environments. Accurate pressure values also support diver safety planning and environmental monitoring in lakes and reservoirs. If you need to determine fluid properties, the {createInternalLink('density-mass-volume-calculator')} can help validate density inputs before computing pressure.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter fluid density (ρ), depth (h), and gravity (g) or select known defaults.</li>
          <li><strong>Step 2:</strong> Choose the units for pressure, depth, and density to match your dataset.</li>
          <li><strong>Step 3:</strong> Click Calculate to get hydrostatic pressure and related values instantly.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Hydrostatic Pressure Calculator Formula">
        <p>
          Hydrostatic pressure is the pressure exerted by a static fluid due to its weight. It increases linearly with depth and depends on fluid density and gravitational acceleration. This makes it a fundamental relationship for fluid statics, reservoir engineering, and underwater design.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">P = ρ × g × h</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Calculate pressure at 12 m depth in fresh water (ρ = 1000 kg/m³) with Earth gravity (g = 9.81 m/s²).
        </p>
        <ul>
          <li>Input: ρ = 1000 kg/m³, g = 9.81 m/s², h = 12 m</li>
          <li>Result: P = 1000 × 9.81 × 12 = 117,720 Pa ≈ 117.7 kPa</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>
          Hydrostatic pressure calculations support many real-world workflows:
        </p>
        <SEOList
          items={[
            "Tank and reservoir design to prevent wall failure and excessive deflection",
            "Diving and marine operations to evaluate pressure at working depths",
            "Hydraulic and civil engineering to estimate fluid loads in channels and dams"
          ]}
        />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ
          questions={[
            {
              question: "Does hydrostatic pressure depend on container shape?",
              answer: "No. For a fluid at rest, hydrostatic pressure depends only on depth, fluid density, and gravity—not the container shape."
            },
            {
              question: "What is the difference between gauge and absolute pressure?",
              answer: "Gauge pressure excludes atmospheric pressure, while absolute pressure includes it. Absolute pressure equals gauge pressure plus atmospheric pressure."
            },
            {
              question: "How does fluid density affect pressure?",
              answer: "Pressure is directly proportional to density. Denser fluids create higher pressure at the same depth."
            },
            {
              question: "Can I use this for other planets?",
              answer: "Yes. Replace g with the local gravitational acceleration to compute pressure on other planets or moons."
            },
            {
              question: "What units should I use for accuracy?",
              answer: "Use SI units when possible: kg/m³ for density, meters for depth, and m/s² for gravity. The output will be in Pascals."
            }
          ]}
        />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering hydrostatic pressure is easy with the right tools, helping you verify fluid loads, protect structures, and design safer systems.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('force-calculator')} or the popular {createInternalLink('acceleration-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
