import WeightOnOtherPlanetsCalculator from '../../../_components/calculators/WeightOnOtherPlanetsCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WeightOnOtherPlanetsCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Your Weight on Other Worlds: Weight on Other Planets Calculator"
      description="Find your weight on other worlds with the Weight on Other Planets Calculator using local gravity values. Compare planets, moons, and more instantly."
      calculator={<WeightOnOtherPlanetsCalculator primaryColor="#820ECC" />}
      slug="physics/weight-on-other-planets-calculator"
      category="Physics"
      features={[
        "Accurate weight calculations using real planetary gravity data",
        "Simple inputs for mass with instant planet-by-planet results",
        "Clear, mobile-friendly layout for classroom or outreach use",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Your Weight Changes Across the Solar System">
        <p>
          Weight is the force a planet's gravity exerts on your mass, so it changes whenever gravity changes. This matters for space missions, astronaut training, and even classroom demonstrations of how gravity varies by planet size and density. By comparing weights across worlds, you can see how gravity shapes movement, fuel needs, and structural design in space. For a deeper look at gravity itself, the {createInternalLink('gravitational-force-calculator')} explains how mass and distance set the pull you feel.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter your mass in kilograms or pounds.</li>
          <li><strong>Step 2:</strong> Choose the planet or moon to compare.</li>
          <li><strong>Step 3:</strong> Click Calculate to see your weight in Newtons and other units.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: your weight on other worlds Formula">
        <p>
          Your mass stays the same everywhere, but weight changes because gravitational acceleration varies from world to world. The calculation uses the classic weight formula, multiplying mass by local gravity to get force. This makes it easy to compare Earth, Mars, the Moon, and gas giants using the same baseline mass.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">W = m × g</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          A 70 kg person wants to know their weight on Mars, where g ≈ 3.71 m/s².
        </p>
        <ul>
          <li>Input: m = 70 kg, g = 3.71 m/s²</li>
          <li>Result: W = 70 × 3.71 = 259.7 N (about 26.5 kgf)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>
          Weight comparisons across worlds are useful in science and engineering contexts:
        </p>
        <SEOList items={[
          "Space mission planning to estimate loads on landers and habitat structures",
          "STEM education activities that visualize gravity differences between planets",
          "Biomechanics and training scenarios for astronauts working in low gravity"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Does my mass change on another planet?",
            answer: "No. Mass is constant everywhere. Only weight changes because gravity is different on each world."
          },
          {
            question: "Why is weight lower on the Moon?",
            answer: "The Moon has much less mass than Earth, so its gravitational acceleration is about 1.62 m/s², roughly one-sixth of Earth's."
          },
          {
            question: "Can I compare gas giants like Jupiter?",
            answer: "Yes. The calculator uses standard surface gravity values, typically measured at the cloud tops for gas giants."
          },
          {
            question: "What units should I use for weight?",
            answer: "Use Newtons for SI, or kilogram-force/pound-force if you prefer. The calculator converts automatically."
          },
          {
            question: "Why does gravity vary so much between planets?",
            answer: "Gravity depends on a planet's mass and radius. Larger, denser planets exert stronger gravitational acceleration."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering your weight on other worlds is easy with the right tools, helping you compare gravity effects across the solar system in seconds.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('force-calculator')} or the popular {createInternalLink('acceleration-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
