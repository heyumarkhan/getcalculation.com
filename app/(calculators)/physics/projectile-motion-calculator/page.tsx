import ProjectileMotionCalculator from '../../../_components/calculators/ProjectileMotionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ProjectileMotionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Projectile Motion Calculator: Calculate Range, Height & Time of Flight"
      description="Calculate projectile motion parameters: range, maximum height, time of flight, and velocity components. Free online physics calculator using R = (v₀²sin(2θ))/g and h = (v₀²sin²(θ))/(2g)."
      calculator={<ProjectileMotionCalculator />}
      slug="physics/projectile-motion-calculator"
      category="Kinematics"
      features={[
        "Calculate range, maximum height, and time of flight",
        "Calculate horizontal and vertical velocity components",
        "Multiple unit conversions (m/s, km/h, m, ft, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Projectile Motion: The Physics of Launched Objects">
        <p>
          Projectile motion is one of the most fascinating and practical applications of physics, describing the motion of objects launched into the air under the influence of gravity. Whether you&apos;re analyzing a thrown ball, a launched rocket, or a fired projectile, understanding projectile motion is essential. Our Projectile Motion Calculator makes it easy to calculate key parameters like range, maximum height, and time of flight using formulas such as <strong>R = (v₀²sin(2θ))/g</strong> and <strong>h = (v₀²sin²(θ))/(2g)</strong>.
        </p>
        <p>
          Projectile motion combines horizontal motion (constant velocity) with vertical motion (constant acceleration due to gravity). This creates a parabolic trajectory that can be analyzed using kinematic equations. Understanding projectile motion is crucial for fields ranging from sports science and ballistics to aerospace engineering and physics education.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Projectile Motion Calculator">
        <p>
          Our Projectile Motion Calculator is designed for simplicity and accuracy:
        </p>
        <ol>
          <li><strong>Enter Initial Velocity:</strong> Input the launch speed (v₀) of the projectile</li>
          <li><strong>Enter Launch Angle:</strong> Input the angle (θ) at which the projectile is launched (measured from horizontal)</li>
          <li><strong>Set Gravity:</strong> Optionally adjust gravity (default: 9.80665 m/s² for Earth)</li>
          <li><strong>Select Units:</strong> Choose your preferred units for velocity, distance, time, and angle</li>
          <li><strong>Calculate:</strong> Click Calculate to get range, maximum height, time of flight, and velocity components</li>
        </ol>
        <p>
          The calculator provides comprehensive results including all key projectile motion parameters with step-by-step calculations.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Projectile Motion Formulas">
        <p>
          Projectile motion is governed by several key formulas:
        </p>
        
        <h3>1. Range (Horizontal Distance)</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">R = (v₀²sin(2θ))/g</p>
          <p className="text-sm text-gray-600 mt-2">Where: R = range, v₀ = initial velocity, θ = launch angle, g = gravity</p>
        </div>
        <p>
          The range is the horizontal distance traveled by the projectile. Maximum range occurs at a 45° launch angle, where sin(2θ) = sin(90°) = 1.
        </p>

        <h3>2. Maximum Height</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">h = (v₀²sin²(θ))/(2g)</p>
          <p className="text-sm text-gray-600 mt-2">Where: h = maximum height</p>
        </div>
        <p>
          Maximum height is reached at the midpoint of the trajectory, when the vertical velocity component becomes zero.
        </p>

        <h3>3. Time of Flight</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">t = (2v₀sin(θ))/g</p>
          <p className="text-sm text-gray-600 mt-2">Where: t = time of flight</p>
        </div>
        <p>
          Time of flight is the total time the projectile spends in the air, from launch to landing.
        </p>

        <h3>4. Velocity Components</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">vx = v₀cos(θ) (constant)</p>
          <p className="font-mono text-lg font-bold">vy₀ = v₀sin(θ) (initial vertical velocity)</p>
          <p className="text-sm text-gray-600 mt-2">Where: vx = horizontal velocity, vy₀ = initial vertical velocity</p>
        </div>
        <p>
          Horizontal velocity remains constant throughout the motion, while vertical velocity changes due to gravity.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Projectile motion calculations are used in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Sports Science: Analyzing the trajectory of balls in baseball, football, basketball, and golf",
          "Ballistics: Calculating projectile trajectories for military and law enforcement applications",
          "Aerospace Engineering: Designing rocket launches, missile trajectories, and space missions",
          "Physics Education: Teaching kinematics, vectors, and motion in two dimensions",
          "Engineering: Designing projectile-based systems, catapults, and launchers",
          "Video Game Development: Creating realistic projectile physics in games",
          "Sports Training: Optimizing launch angles and velocities for maximum performance",
          "Safety Analysis: Calculating safe zones for fireworks, projectiles, and launched objects",
          "Astronomy: Analyzing the motion of celestial objects under gravitational influence"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Projectile motion calculations use various units depending on the application:
        </p>
        <ul>
          <li><strong>Velocity:</strong> m/s (Meters/second), km/h (Kilometers/hour), mph (Miles/hour), ft/s (Feet/second)</li>
          <li><strong>Distance:</strong> m (Meters), km (Kilometers), cm (Centimeters), ft (Feet), in (Inches), mi (Miles)</li>
          <li><strong>Time:</strong> s (Seconds), min (Minutes), ms (Milliseconds)</li>
          <li><strong>Acceleration:</strong> m/s² (Meters/second²), ft/s² (Feet/second²), g (Standard Gravity = 9.80665 m/s²)</li>
          <li><strong>Angle:</strong> Degrees (°) or Radians (rad)</li>
        </ul>
        <p>
          <strong>Common Values:</strong>
        </p>
        <ul>
          <li>Earth&apos;s gravity: g = 9.80665 m/s² (32.174 ft/s²)</li>
          <li>Moon&apos;s gravity: g ≈ 1.625 m/s²</li>
          <li>Mars&apos;s gravity: g ≈ 3.711 m/s²</li>
          <li>Optimal launch angle for maximum range: 45°</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Projectile Motion Calculations">
        <h3>Example 1: Maximum Range at 45°</h3>
        <p>A projectile is launched at 20 m/s at a 45° angle. Calculate range, maximum height, and time of flight.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v₀ = 20 m/s, θ = 45°, g = 9.80665 m/s²</p>
          <p className="font-mono">Range: R = (20² × sin(90°))/9.80665 = 400/9.80665 = 40.79 m</p>
          <p className="font-mono">Max Height: h = (20² × sin²(45°))/(2 × 9.80665) = (400 × 0.5)/19.613 = 10.19 m</p>
          <p className="font-mono">Time: t = (2 × 20 × sin(45°))/9.80665 = (40 × 0.707)/9.80665 = 2.88 s</p>
        </div>

        <h3>Example 2: High Angle Launch</h3>
        <p>A projectile is launched at 30 m/s at a 60° angle. Calculate the range.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v₀ = 30 m/s, θ = 60°, g = 9.80665 m/s²</p>
          <p className="font-mono">Range: R = (30² × sin(120°))/9.80665 = (900 × 0.866)/9.80665 = 79.46 m</p>
        </div>

        <h3>Example 3: Low Angle Launch</h3>
        <p>A projectile is launched at 25 m/s at a 30° angle. Calculate maximum height and time of flight.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v₀ = 25 m/s, θ = 30°, g = 9.80665 m/s²</p>
          <p className="font-mono">Max Height: h = (25² × sin²(30°))/(2 × 9.80665) = (625 × 0.25)/19.613 = 7.97 m</p>
          <p className="font-mono">Time: t = (2 × 25 × sin(30°))/9.80665 = (50 × 0.5)/9.80665 = 2.55 s</p>
        </div>
      </SEOSection>

      <SEOSection title="Key Concepts in Projectile Motion">
        <p>
          Understanding these concepts is crucial for projectile motion:
        </p>
        <ul>
          <li><strong>Independence of Motion:</strong> Horizontal and vertical motions are independent. Horizontal motion is uniform (constant velocity), while vertical motion is accelerated (constant acceleration due to gravity)</li>
          <li><strong>Parabolic Trajectory:</strong> The path of a projectile forms a parabola (assuming no air resistance)</li>
          <li><strong>Symmetry:</strong> The trajectory is symmetric about the maximum height point. Time to reach maximum height equals time to fall from maximum height</li>
          <li><strong>Optimal Angle:</strong> Maximum range occurs at 45° launch angle (for same-level launch and landing)</li>
          <li><strong>Air Resistance:</strong> Real projectiles experience air resistance, which reduces range and maximum height compared to ideal calculations</li>
        </ul>
      </SEOSection>

      <SEOSection title="Factors Affecting Projectile Motion">
        <p>
          Several factors influence projectile motion:
        </p>
        <ul>
          <li><strong>Initial Velocity:</strong> Higher initial velocity increases range, maximum height, and time of flight</li>
          <li><strong>Launch Angle:</strong> Angle determines the balance between horizontal and vertical components. 45° gives maximum range</li>
          <li><strong>Gravity:</strong> Stronger gravity reduces range, maximum height, and time of flight</li>
          <li><strong>Air Resistance:</strong> In real-world scenarios, air resistance reduces all parameters compared to ideal calculations</li>
          <li><strong>Launch Height:</strong> Launching from a height (not ground level) affects range and trajectory</li>
          <li><strong>Wind:</strong> Crosswinds can affect horizontal motion and trajectory</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the optimal launch angle for maximum range?",
            answer: "For a projectile launched and landing at the same height, the optimal launch angle is 45°. At this angle, sin(2θ) = sin(90°) = 1, which maximizes the range formula R = (v₀²sin(2θ))/g."
          },
          {
            question: "Why does horizontal velocity remain constant?",
            answer: "Horizontal velocity remains constant because there is no horizontal acceleration (assuming no air resistance). Gravity only affects vertical motion, so the horizontal component of velocity doesn't change throughout the flight."
          },
          {
            question: "How does launch angle affect maximum height?",
            answer: "Maximum height increases as launch angle increases (up to 90°). At 90°, the projectile goes straight up and reaches maximum height for a given initial velocity. The formula h = (v₀²sin²(θ))/(2g) shows that height depends on sin²(θ), which is maximum at 90°."
          },
          {
            question: "What happens if I launch at 0° or 90°?",
            answer: "At 0° (horizontal launch), the projectile has no vertical component initially, so it falls straight down. At 90° (vertical launch), the projectile goes straight up and comes straight down, with zero horizontal range."
          },
          {
            question: "How does air resistance affect projectile motion?",
            answer: "Air resistance reduces range, maximum height, and time of flight compared to ideal calculations. It also causes the trajectory to deviate from a perfect parabola. For high-speed projectiles or long distances, air resistance becomes significant."
          },
          {
            question: "Can I use this calculator for projectiles launched from a height?",
            answer: "The formulas used assume launch and landing at the same height. For projectiles launched from a height, additional calculations are needed. However, for small height differences, the results are approximately correct."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding projectile motion is fundamental to physics and engineering. Our Projectile Motion Calculator simplifies these calculations, supporting multiple units and providing comprehensive results including range, maximum height, time of flight, and velocity components to make solving projectile motion problems easy and accurate.
        </p>
        <p>
          Ready to explore more kinematics concepts? Check out our {createInternalLink('velocity-calculator', 'Velocity Calculator')} for linear motion, our {createInternalLink('acceleration-calculator', 'Acceleration Calculator')} for motion analysis, or our {createInternalLink('free-fall-calculator', 'Free Fall Calculator')} for vertical motion under gravity.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

