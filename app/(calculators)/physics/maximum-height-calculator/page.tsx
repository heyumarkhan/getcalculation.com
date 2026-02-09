import MaximumHeightCalculator from '../../../_components/calculators/MaximumHeightCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function MaximumHeightCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Maximum Height Calculator: Calculate Projectile Motion Peak Altitude"
      description="Calculate maximum height in projectile motion. Find peak altitude using initial velocity and launch angle. Free physics calculator with instant results."
      calculator={<MaximumHeightCalculator />}
      slug="physics/maximum-height-calculator"
      category="Physics"
      features={[
        "Calculate maximum height from velocity and angle",
        "Support for multiple unit systems (m, ft, km)",
        "Uses projectile motion formula h = (v₀² sin²θ) / (2g)",
        "Instant results with step-by-step calculations",
        "Free and no registration required"
      ]}
    >
      <SEOSection title="Understanding Maximum Height in Projectile Motion">
        <p>
          Maximum height is a critical parameter in projectile motion that determines how high an object travels before gravity reverses its vertical trajectory. From calculating optimal launch angles for rockets and artillery to analyzing basketball shots and water fountain trajectories, understanding peak altitude is essential in physics, engineering, and sports science. The maximum height depends on the object's {createInternalLink('velocity-calculator')} and launch angle, making it a fundamental concept in kinematics and ballistics.
        </p>
        <p>
          Whether you're designing water features, optimizing athletic performance, or studying motion in two dimensions, our Maximum Height Calculator provides instant, accurate predictions of peak altitude based on initial conditions and gravitational acceleration.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to calculate maximum height:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the initial velocity (v₀) of the projectile in m/s, ft/s, or km/h.</li>
          <li><strong>Step 2:</strong> Input the launch angle (θ) in degrees measured from the horizontal (0° = horizontal, 90° = vertical).</li>
          <li><strong>Step 3:</strong> Select gravitational acceleration (default 9.81 m/s² on Earth) and click Calculate to get the maximum height reached.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Maximum Height Formula Explained">
        <p>
          The maximum height formula for projectile motion is derived from kinematic equations by analyzing the vertical component of motion. At the peak of the trajectory, vertical velocity becomes zero, allowing us to calculate the maximum altitude:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">h_max = (v₀² × sin²θ) / (2g)</p>
        </div>
        <p>
          Where: h_max = Maximum Height (meters), v₀ = Initial Velocity (m/s), θ = Launch Angle (degrees), g = Gravitational Acceleration (9.81 m/s²), sin θ = Sine of the launch angle
        </p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          Calculate the maximum height of a ball thrown at 20 m/s at a 60° angle:
        </p>
        <ul>
          <li>Given: v₀ = 20 m/s, θ = 60°, g = 9.81 m/s²</li>
          <li>sin(60°) = 0.866</li>
          <li>h_max = (20² × sin²60°) / (2 × 9.81)</li>
          <li>h_max = (400 × 0.866²) / 19.62</li>
          <li>h_max = (400 × 0.75) / 19.62</li>
          <li>h_max ≈ 15.3 meters</li>
          <li>Result: The ball reaches a maximum height of approximately 15.3 meters above the launch point</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications of Maximum Height Calculations">
        <p>Maximum height calculations are essential across numerous fields:</p>
        <SEOList items={[
          "Sports Science: Coaches and athletes analyze basketball shots, volleyball serves, and long jump trajectories to optimize technique and maximize performance.",
          "Aerospace Engineering: Rocket scientists calculate peak altitudes for missile trajectories, satellite launches, and parabolic flight paths to ensure mission success.",
          "Water Feature Design: Landscape architects design fountain jets and water displays by calculating maximum heights to achieve desired visual effects.",
          "Ballistics and Military: Artillery officers calculate shell trajectories to determine maximum heights for clearing obstacles and {createInternalLink('acceleration-calculator')} requirements for target accuracy.",
          "Physics Education: Students learn fundamental kinematics principles by analyzing projectile motion, verifying theoretical predictions with experimental data."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "What launch angle gives the maximum height for a projectile?",
            answer: "A launch angle of 90° (vertical) produces the maximum height for any given initial velocity. At 90°, sin(90°) = 1, which is the maximum value of the sine function. However, this results in zero horizontal range. For practical applications requiring both height and distance, 45° provides the optimal balance for maximum range on level ground."
          },
          {
            question: "How does initial velocity affect maximum height?",
            answer: "Maximum height is proportional to the square of the initial velocity (h ∝ v₀²). Doubling the initial velocity quadruples the maximum height. For example, increasing launch velocity from 10 m/s to 20 m/s increases maximum height from approximately 5.1 m to 20.4 m at a 90° angle—four times higher."
          },
          {
            question: "What is the relationship between maximum height and range?",
            answer: "Maximum height and range are related through the launch angle. For maximum range (45° angle), h_max = R/4, where R is the range. Steeper angles increase height but decrease range, while shallower angles increase range but decrease height. The relationship involves {createInternalLink('displacement-calculator')} for both vertical and horizontal components."
          },
          {
            question: "How does gravity affect the maximum height of a projectile?",
            answer: "Maximum height is inversely proportional to gravitational acceleration (h ∝ 1/g). On the Moon (g = 1.62 m/s²), a projectile reaches about 6 times higher than on Earth (g = 9.81 m/s²) with the same initial conditions. Stronger gravity reduces maximum height, while weaker gravity allows objects to travel higher."
          },
          {
            question: "Can you calculate time to reach maximum height from this formula?",
            answer: "Yes! The time to reach maximum height is t = (v₀ × sinθ) / g. At maximum height, the vertical velocity component becomes zero. For a 20 m/s launch at 60°, time to peak is (20 × 0.866) / 9.81 ≈ 1.77 seconds. The total flight time is twice this value for level ground landings."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering maximum height calculations in projectile motion is essential for understanding kinematics, optimizing trajectories, and solving real-world physics problems. The formula h_max = (v₀² × sin²θ) / (2g) elegantly connects initial velocity, launch angle, and gravitational acceleration to predict peak altitude with precision.
        </p>
        <p>
          Explore more physics tools: Check out our {createInternalLink('gravitational-force-calculator')} to understand gravitational effects on motion, or use our {createInternalLink('kinetic-energy-calculator')} to calculate energy requirements for launching projectiles.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
