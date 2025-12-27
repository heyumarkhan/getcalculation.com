import HorizontalProjectileMotionCalculator from '../../../_components/calculators/HorizontalProjectileMotionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function HorizontalProjectileMotionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Horizontal Projectile Motion Calculator: Calculate Range, Time of Flight & Final Velocity"
      description="Calculate horizontal projectile motion parameters: range, time of flight, and final velocity. Free online physics calculator using t = √(2h/g) and R = v₀ × t for horizontally launched projectiles."
      calculator={<HorizontalProjectileMotionCalculator />}
      slug="physics/horizontal-projectile-motion-calculator"
      category="Kinematics"
      features={[
        "Calculate range (horizontal distance) from initial velocity and height",
        "Calculate time of flight using t = √(2h/g)",
        "Calculate final velocity magnitude",
        "Multiple unit conversions (m/s, km/h, m, ft, etc.)",
        "Step-by-step solutions with detailed formulas",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Horizontal Projectile Motion: Motion with Zero Initial Vertical Velocity">
        <p>
          Horizontal projectile motion is a special case of projectile motion where an object is launched horizontally from a certain height with zero initial vertical velocity. This creates a motion that combines constant horizontal velocity with free-fall vertical motion. Our Horizontal Projectile Motion Calculator makes it easy to calculate key parameters like range, time of flight, and final velocity using formulas such as <strong>t = √(2h/g)</strong> and <strong>R = v₀ × t</strong>.
        </p>
        <p>
          Horizontal projectile motion occurs when objects are launched, dropped, or thrown horizontally from a height - common examples include a ball rolled off a table, water flowing from a hose, or a package dropped from a moving airplane. Understanding this motion is fundamental in physics education and has practical applications in engineering, sports science, and ballistics.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Horizontal Projectile Motion Calculator">
        <p>
          Our Horizontal Projectile Motion Calculator is designed for simplicity and accuracy. Follow these steps:
        </p>
        <SEOList ordered items={[
          "<strong>Enter Initial Horizontal Velocity:</strong> Input the launch speed (v₀) of the projectile in the horizontal direction. This is the velocity at which the object is moving horizontally when it starts falling.",
          "<strong>Enter Initial Height:</strong> Input the height (h) from which the projectile is launched horizontally. This is the vertical distance above the ground where the motion begins.",
          "<strong>Set Gravity:</strong> Optionally adjust gravity (default: 9.80665 m/s² for Earth). For other planets or celestial bodies, enter the appropriate gravitational acceleration.",
          "<strong>Select Units:</strong> Choose your preferred units for velocity, distance, time, and acceleration. The calculator supports meters, feet, kilometers, and more.",
          "<strong>Calculate:</strong> Click Calculate to get the range (horizontal distance), time of flight, and final velocity with detailed step-by-step calculations."
        ]} />
        <p>
          The calculator provides comprehensive results including all key horizontal projectile motion parameters with detailed formulas and step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Horizontal Projectile Motion Formulas">
        <p>
          Horizontal projectile motion is governed by several key formulas that are simpler than general projectile motion because the initial vertical velocity is zero:
        </p>
        
        <h3>1. Time of Flight</h3>
        <SEOFormula
          formula="t = √(2h/g)"
          description="Where: t = time of flight, h = initial height, g = gravitational acceleration"
        />
        <p>
          The time of flight is the total time the projectile spends in the air. Since the vertical motion is independent of horizontal motion, the time depends only on the initial height and gravity. The object falls the same amount of time regardless of its horizontal velocity.
        </p>

        <h3>2. Range (Horizontal Distance)</h3>
        <SEOFormula
          formula="R = v₀ × t = v₀ × √(2h/g)"
          description="Where: R = range (horizontal distance), v₀ = initial horizontal velocity, t = time of flight"
        />
        <p>
          The range is the horizontal distance traveled by the projectile. Since horizontal velocity is constant (no horizontal acceleration), the range is simply the initial horizontal velocity multiplied by the time of flight.
        </p>

        <h3>3. Final Velocity</h3>
        <SEOFormula
          formula="v = √(v₀² + (gt)²) = √(v₀² + 2gh)"
          description="Where: v = final velocity magnitude, v₀ = initial horizontal velocity, g = gravity, t = time of flight, h = initial height"
        />
        <p>
          The final velocity is the magnitude of the velocity vector just before impact. It combines the constant horizontal velocity component with the final vertical velocity component (which equals gt due to free fall).
        </p>

        <h3>4. Velocity Components</h3>
        <SEOList items={[
          "<strong>Horizontal Velocity (vx):</strong> Remains constant throughout the motion: vx = v₀ (no horizontal acceleration)",
          "<strong>Vertical Velocity (vy):</strong> Increases due to gravity: vy = gt (starts at 0, increases as object falls)",
          "<strong>Final Vertical Velocity:</strong> vy_final = gt = g√(2h/g) = √(2gh)"
        ]} />

        <h3>5. Position Equations</h3>
        <SEOList items={[
          "<strong>Horizontal Position:</strong> x = v₀ × t (linear motion with constant velocity)",
          "<strong>Vertical Position:</strong> y = h - (1/2)gt² (free fall from height h)"
        ]} />

        <p>
          These formulas show that horizontal and vertical motions are independent. The horizontal motion has constant velocity, while the vertical motion is accelerated by gravity. This independence is a key principle in projectile motion.
        </p>
      </SEOSection>

      <SEOSection title="Key Characteristics of Horizontal Projectile Motion">
        <p>
          Horizontal projectile motion has several distinctive characteristics:
        </p>
        <SEOList items={[
          "<strong>Zero Initial Vertical Velocity:</strong> The projectile starts with v₀y = 0, meaning it only has horizontal velocity initially.",
          "<strong>Constant Horizontal Velocity:</strong> Since there's no horizontal acceleration, the horizontal velocity remains constant throughout the motion: vx = v₀.",
          "<strong>Accelerated Vertical Motion:</strong> The vertical motion is free fall, with acceleration g downward, so vy = gt.",
          "<strong>Parabolic Trajectory:</strong> The path forms a parabola opening downward, starting horizontally and curving downward.",
          "<strong>Independent Motions:</strong> Horizontal and vertical motions are completely independent - the time of flight depends only on height, not horizontal velocity.",
          "<strong>Increasing Speed:</strong> While horizontal velocity is constant, the overall speed increases because vertical velocity increases due to gravity."
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Horizontal projectile motion calculations are used in numerous real-world scenarios:
        </p>
        <SEOList items={[
          "<strong>Engineering:</strong> Designing water fountains, sprinkler systems, and irrigation systems where water is ejected horizontally.",
          "<strong>Sports Science:</strong> Analyzing the trajectory of balls rolled off surfaces, such as in bowling or ball sports where objects are released horizontally.",
          "<strong>Physics Education:</strong> Teaching fundamental kinematics concepts, demonstrating independence of motion components, and illustrating free fall combined with constant velocity motion.",
          "<strong>Aerospace:</strong> Calculating drop zones for cargo dropped from aircraft, understanding satellite deorbiting, and planning air-dropped supplies.",
          "<strong>Ballistics:</strong> Analyzing horizontally fired projectiles, understanding bullet drop, and calculating trajectories for level shots.",
          "<strong>Construction:</strong> Determining safe distances for materials dropped from heights, calculating landing zones for construction materials.",
          "<strong>Transportation:</strong> Understanding motion of objects falling from moving vehicles, calculating safe distances for roadside work.",
          "<strong>Entertainment:</strong> Designing amusement park rides, calculating trajectories for stunt performances, and planning special effects in movies."
        ]} />
      </SEOSection>

      <SEOSection title="Horizontal vs. General Projectile Motion">
        <p>
          Understanding the difference between horizontal and general projectile motion is important:
        </p>
        <SEOList items={[
          "<strong>Horizontal Projectile Motion:</strong> Initial vertical velocity is zero (v₀y = 0). The projectile is launched horizontally. Time of flight depends only on height: t = √(2h/g). Range is simply: R = v₀ × t.",
          "<strong>General Projectile Motion:</strong> Initial velocity has both horizontal and vertical components. Launch angle is typically not 0° or 90°. Time of flight: t = (2v₀sin(θ))/g. Range: R = (v₀²sin(2θ))/g. Maximum height occurs at the midpoint.",
          "<strong>Comparison:</strong> Horizontal motion is simpler because there's no upward vertical motion - the projectile only falls. This makes calculations more straightforward and is often used as a starting point in physics education."
        ]} />
      </SEOSection>

      <SEOSection title="Common Examples of Horizontal Projectile Motion">
        <p>
          Here are some everyday examples of horizontal projectile motion:
        </p>
        <SEOList items={[
          "<strong>Ball Rolled Off Table:</strong> A ball rolling off the edge of a table moves horizontally with constant velocity while falling vertically with acceleration g.",
          "<strong>Water from Hose:</strong> Water ejected horizontally from a hose follows horizontal projectile motion until it hits the ground.",
          "<strong>Package Dropped from Plane:</strong> A package dropped from a moving airplane has the plane's horizontal velocity but zero initial vertical velocity.",
          "<strong>Car Driving Off Cliff:</strong> If a car drives horizontally off a cliff, it continues moving horizontally while falling (neglecting air resistance).",
          "<strong>Monkey and Hunter:</strong> Classic physics demonstration where a projectile fired horizontally and an object dropped simultaneously hit the ground at the same time.",
          "<strong>Baseball Off Bat:</strong> When a baseball is hit horizontally (parallel to ground), it initially follows horizontal projectile motion before air resistance affects it."
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports multiple units for convenience and real-world applications:
        </p>
        <SEOList items={[
          "<strong>Velocity Units:</strong> Meters per second (m/s), Kilometers per hour (km/h), Miles per hour (mph), Feet per second (ft/s). The horizontal velocity remains constant throughout the motion.",
          "<strong>Distance Units:</strong> Meters (m), Kilometers (km), Centimeters (cm), Millimeters (mm), Feet (ft), Inches (in), Miles (mi). Used for both height and horizontal distance (range).",
          "<strong>Time Units:</strong> Seconds (s), Minutes (min), Milliseconds (ms). Time of flight is typically measured in seconds for most practical applications.",
          "<strong>Acceleration Units:</strong> Meters per second squared (m/s²), Feet per second squared (ft/s²), Standard gravity (g = 9.80665 m/s²). Gravity is typically 9.80665 m/s² on Earth's surface."
        ]} />
        <p>
          All calculations are performed in base units (m/s, m, s, m/s²) and then converted to your selected units for display. The gravitational constant used is 9.80665 m/s² for Earth, but you can adjust it for other scenarios.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "What is horizontal projectile motion?",
            answer: "Horizontal projectile motion is a type of projectile motion where an object is launched horizontally with zero initial vertical velocity. The object moves with constant horizontal velocity while falling vertically with acceleration due to gravity. This creates a parabolic trajectory that starts horizontally and curves downward."
          },
          {
            question: "How do you calculate time of flight for horizontal projectile motion?",
            answer: "Time of flight for horizontal projectile motion is calculated using: t = √(2h/g), where h is the initial height and g is gravitational acceleration. This formula comes from the free-fall equation, since the vertical motion is independent of horizontal motion. The time depends only on height and gravity, not on the horizontal velocity."
          },
          {
            question: "How do you calculate the range (horizontal distance)?",
            answer: "The range for horizontal projectile motion is calculated using: R = v₀ × t, where v₀ is the initial horizontal velocity and t is the time of flight. Since horizontal velocity is constant (no horizontal acceleration), you simply multiply the initial horizontal velocity by the time the object is in the air. This can also be written as: R = v₀ × √(2h/g)."
          },
          {
            question: "Why is horizontal velocity constant in horizontal projectile motion?",
            answer: "Horizontal velocity remains constant because there is no horizontal acceleration. Gravity only acts vertically (downward), so there are no forces affecting horizontal motion (assuming no air resistance). This means the horizontal component of velocity never changes: vx = v₀ throughout the entire motion."
          },
          {
            question: "How do you calculate final velocity?",
            answer: "Final velocity is the magnitude of the velocity vector just before impact. It's calculated using: v = √(v₀² + (gt)²) = √(v₀² + 2gh), where v₀ is initial horizontal velocity, g is gravity, t is time of flight, and h is initial height. This combines the constant horizontal velocity component with the final vertical velocity component (which equals gt)."
          },
          {
            question: "What is the difference between horizontal and angled projectile motion?",
            answer: "Horizontal projectile motion has zero initial vertical velocity (launched horizontally), while angled projectile motion has both horizontal and vertical velocity components (launched at an angle). For horizontal motion, time depends only on height. For angled motion, time depends on both launch angle and velocity. Horizontal motion is simpler and often used as a teaching example before general projectile motion."
          },
          {
            question: "Does air resistance affect horizontal projectile motion?",
            answer: "Yes, air resistance affects all projectile motion, including horizontal. In reality, air resistance reduces both horizontal and vertical velocities. However, our calculator assumes ideal conditions (no air resistance) for simplicity, which is accurate for dense objects, short distances, or as an approximation. For precise calculations involving air resistance, more complex models are needed."
          },
          {
            question: "Can you use this calculator for objects dropped from moving vehicles?",
            answer: "Yes! If an object is dropped (not thrown) from a moving vehicle, it has the vehicle's horizontal velocity but zero initial vertical velocity - perfect for horizontal projectile motion. Just enter the vehicle's speed as the initial horizontal velocity and the drop height as the initial height. The calculator will show where the object lands relative to the drop point."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding and calculating horizontal projectile motion is essential for anyone studying kinematics, physics, or engineering. Our Horizontal Projectile Motion Calculator simplifies these calculations, making it easy to determine range, time of flight, and final velocity for horizontally launched projectiles using the formulas t = √(2h/g) and R = v₀ × t.
        </p>
        <p>
          Whether you&apos;re studying physics, designing engineering systems, analyzing sports motions, or solving practical problems, accurate horizontal projectile motion calculations are crucial. By supporting multiple units and providing detailed step-by-step solutions, this calculator empowers users to explore kinematics and understand the fundamental relationships in projectile motion. For related calculations, explore our {createInternalLink('projectile-motion-calculator')} for general projectile motion with launch angles, our {createInternalLink('free-fall-calculator')} for vertical free-fall motion, or our {createInternalLink('velocity-calculator')} for velocity calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

