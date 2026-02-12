import FPECalculator from '../../../_components/calculators/FPECalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function FPECalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="FPE Calculator: Foot-Pounds of Energy for Work, Force, and Distance"
      description="Use the FPE calculator to compute foot-pounds of energy from force and distance, compare work values, and convert results for physics and ballistics use cases."
      calculator={<FPECalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/fpe-calculator"
      category="Physics"
      features={[
        "Accurate foot-pounds of energy calculations for work analysis",
        "Simple inputs for force, distance, and unit conversion",
        "Instant results for quick comparisons and checks",
        "Clear, mobile-friendly layout for field or classroom use",
        "Free to use with no sign-up required"
      ]}
    >
      <SEOSection title="Understanding Foot-Pounds of Energy (FPE)">
        <p>
          Foot-pounds of energy quantify work done when a force moves an object through a distance. This is a core concept
          in mechanics and helps compare energy transfer in systems such as tools, machinery, and ballistics. If you want to
          connect work to motion outcomes, see how FPE relates to {createInternalLink('kinetic-energy-calculator')} results
          and broader energy analysis.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to calculate FPE quickly:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the applied force value.</li>
          <li><strong>Step 2:</strong> Enter the distance over which the force acts.</li>
          <li><strong>Step 3:</strong> Click Calculate to get FPE and conversions.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: FPE Formula">
        <p>
          Foot-pounds of energy are computed using the work equation, where energy equals force multiplied by distance. This
          relationship is fundamental to mechanical work and power calculations.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">FPE = F × d</p>
          <p className="text-sm text-gray-600 mt-2">Where: F = force (lbf), d = distance (ft)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          A hydraulic press applies 500 lbf through 2 ft of travel.
        </p>
        <ul>
          <li>Force: 500 lbf</li>
          <li>Distance: 2 ft</li>
          <li>FPE = 500 × 2 = 1000 ft·lbf</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>
          FPE calculations are useful across many physics and engineering scenarios:
        </p>
        <SEOList items={[
          "Ballistics and impact testing to compare energy transfer between projectiles",
          "Mechanical systems to estimate work done by actuators and tools",
          `Energy comparisons alongside ${createInternalLink('work-calculator')} to validate force-distance results`,
          "Material testing to quantify energy required for deformation",
          "Field calculations for equipment efficiency and power requirements"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What does FPE measure?",
            answer: "FPE measures the amount of work done when a force moves an object through a distance, expressed in foot-pounds of energy."
          },
          {
            question: "Is FPE the same as kinetic energy?",
            answer: "They are related units of energy, but kinetic energy depends on mass and velocity, while FPE here is calculated from force and distance."
          },
          {
            question: "Can I convert FPE to joules?",
            answer: "Yes. 1 ft·lbf ≈ 1.35582 J. The calculator can show conversions for quick comparisons."
          },
          {
            question: "What units should I use for force and distance?",
            answer: "Use lbf and ft for Imperial units, or N and m for SI. The calculator handles unit conversions."
          },
          {
            question: "When is FPE most useful?",
            answer: "FPE is useful when analyzing work, tool output, ballistics, and energy transfer in mechanical systems."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          With a clear work-energy calculation, you can quantify mechanical output and compare real-world systems quickly.
          For more energy tools, explore {createInternalLink('potential-energy-calculator')} to analyze stored energy.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
