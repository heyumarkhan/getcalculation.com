import DistanceToHorizonCalculator from '../../../_components/calculators/DistanceToHorizonCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function DistanceToHorizonCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Distance to Horizon Calculator: Horizon Calculator for Visibility Range"
      description="Use this horizon calculator to estimate distance to the horizon from your height. Fast, accurate results for pilots, sailors, and hikers."
      calculator={<DistanceToHorizonCalculator />}
      slug="physics/distance-to-horizon-calculator"
      category="Physics"
      features={[
        "Accurate visibility range calculations based on height",
        "Simple inputs with unit flexibility",
        "Clean, mobile-friendly layout",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="How Far Can You See? Real-World Horizon Limits">
        <p>
          Whether you are flying, sailing, or hiking a ridge, the horizon calculator answers a practical question: how far can you
          actually see before Earth’s curvature blocks the line of sight. This distance-to-horizon estimate helps plan observation ranges,
          route visibility, and coastal spotting. If you also compare motion limits, the {createInternalLink('physics/kinetic-energy-calculator')}
          can complement visibility planning for fast-moving targets.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter your observation height above sea level.</li>
          <li><strong>Step 2:</strong> Choose the height unit (meters, feet, or miles).</li>
          <li><strong>Step 3:</strong> Click Calculate to get the horizon distance.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: horizon calculator Formula">
        <p>
          The geometric horizon distance comes from a right triangle formed by Earth’s radius and your height. The standard formula
          estimates the distance to the tangent point on a spherical Earth.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">d = √(2Rh + h²)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Observer height is 50 m and Earth radius is 6,371,000 m.</p>
        <ul>
          <li>Input: R = 6,371,000 m, h = 50 m</li>
          <li>Result: d = √(2 × 6,371,000 × 50 + 50²) ≈ 25,245 m (≈ 25.2 km)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Distance-to-horizon calculations show up in planning, safety, and navigation workflows.</p>
        <SEOList items={[
          "Aviation visibility checks for approach and VFR planning",
          "Marine navigation and lighthouse range estimates",
          "Surveying, hiking, and observation planning on elevated terrain"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Does this horizon calculator account for refraction?",
            answer: "This version uses the geometric formula only. Atmospheric refraction can extend the visible horizon slightly in real conditions."
          },
          {
            question: "What height should I enter?",
            answer: "Use your eye level above sea level. For a building, add ground elevation plus the viewing floor height."
          },
          {
            question: "Why does height increase visibility so quickly?",
            answer: "Because the horizon distance grows with the square root of height, small increases in height create noticeable range gains."
          },
          {
            question: "Which Earth radius does the formula use?",
            answer: "The standard calculation assumes a mean Earth radius of about 6,371 km, which is accurate for most use cases."
          },
          {
            question: "Can I use this for aircraft or drones?",
            answer: "Yes. Enter the altitude above sea level to estimate line-of-sight range for aviation or UAV operations."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering horizon distance is easy with the right tools, helping you plan visibility, navigation, and observation ranges with confidence.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('physics/work-calculator')} or the popular {createInternalLink('physics/acceleration-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
