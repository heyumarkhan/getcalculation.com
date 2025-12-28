import NormalForceCalculator from '../../../_components/calculators/NormalForceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function NormalForceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Normal Force Calculator: Calculate Normal Force (N = m × g)"
      description="Calculate normal force from mass and gravity using N = m × g (horizontal) or N = m × g × cos(θ) (inclined plane). Free online mechanics calculator for physics problems."
      calculator={<NormalForceCalculator />}
      slug="physics/normal-force-calculator"
      category="Mechanics"
      features={[
        "Calculate normal force from mass and gravity",
        "Calculate normal force on inclined planes",
        "Calculate mass from normal force and gravity",
        "Calculate gravity from normal force and mass",
        "Calculate angle from normal force, mass, and gravity",
        "Multiple unit support",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Normal Force: A Fundamental Concept in Mechanics">
        <p>
          Normal force is one of the most important forces in physics, representing the force exerted by a surface perpendicular to an object resting on it. Whether you&apos;re studying mechanics, analyzing forces, or solving physics problems, understanding normal force is essential. Our Normal Force Calculator makes it easy to calculate normal force, mass, gravity, or angle using the fundamental formulas: <strong>N = m × g</strong> for horizontal surfaces and <strong>N = m × g × cos(θ)</strong> for inclined planes.
        </p>
        <p>
          Normal force is called &quot;normal&quot; because it acts perpendicular (normal) to the contact surface. On a horizontal surface, the normal force is typically equal to the weight of the object (mass times gravity). On an inclined plane, the normal force is reduced because only a component of the weight acts perpendicular to the surface.
        </p>
        <p>
          Understanding normal force is crucial for analyzing friction (since friction depends on normal force), calculating forces in equilibrium, and solving problems involving inclined planes, ramps, and surfaces at angles.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Normal Force Calculator">
        <p>
          Our Normal Force Calculator supports both horizontal surfaces and inclined planes. Follow these steps:
        </p>
        <ol>
          <li><strong>Select Surface Type:</strong> Choose &quot;Horizontal Surface&quot; or &quot;Inclined Plane&quot;</li>
          <li><strong>Enter Values:</strong> 
            <ul>
              <li>For horizontal: Enter any 2 of 3 values (Normal Force, Mass, Gravity)</li>
              <li>For inclined plane: Enter any 3 of 4 values (Normal Force, Mass, Gravity, Angle)</li>
            </ul>
          </li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with step-by-step solutions</li>
        </ol>
        <p>
          The calculator uses: <strong>N = m × g</strong> for horizontal surfaces and <strong>N = m × g × cos(θ)</strong> for inclined planes.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Normal Force Formulas">
        <p>
          Normal force depends on whether the surface is horizontal or inclined:
        </p>
        
        <h3>Horizontal Surface</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">N = m × g</p>
          <p className="text-sm text-gray-600 mt-2">Where: N = normal force, m = mass, g = gravity</p>
        </div>
        <p>
          On a horizontal surface, the normal force equals the weight of the object. This is because the surface must support the full weight of the object, pushing upward with a force equal to the downward gravitational force.
        </p>

        <h3>Inclined Plane</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">N = m × g × cos(θ)</p>
          <p className="text-sm text-gray-600 mt-2">Where: N = normal force, m = mass, g = gravity, θ = angle of inclination</p>
        </div>
        <p>
          On an inclined plane, the normal force is reduced because only the component of weight perpendicular to the surface contributes. As the angle increases, the normal force decreases, reaching zero when the surface is vertical (90°).
        </p>

        <h3>Rearranging the Formulas</h3>
        <p>You can rearrange these formulas to solve for any variable:</p>
        <ul>
          <li><strong>Normal Force (Horizontal):</strong> N = m × g</li>
          <li><strong>Mass (Horizontal):</strong> m = N / g</li>
          <li><strong>Gravity (Horizontal):</strong> g = N / m</li>
          <li><strong>Normal Force (Inclined):</strong> N = m × g × cos(θ)</li>
          <li><strong>Mass (Inclined):</strong> m = N / (g × cos(θ))</li>
          <li><strong>Gravity (Inclined):</strong> g = N / (m × cos(θ))</li>
          <li><strong>Angle (Inclined):</strong> θ = arccos(N / (m × g))</li>
        </ul>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Normal Force (N):</strong> The force perpendicular to the contact surface, measured in Newtons (N), pounds-force (lb), etc. It&apos;s always perpendicular to the surface.</li>
          <li><strong>Mass (m):</strong> The amount of matter in the object, measured in kilograms (kg), grams (g), pounds (lb), etc. Mass is always positive.</li>
          <li><strong>Gravity (g):</strong> The acceleration due to gravity, typically 9.80665 m/s² on Earth. Measured in m/s², ft/s², or as a multiple of standard gravity (g).</li>
          <li><strong>Angle (θ):</strong> The angle of the inclined plane measured from horizontal, typically between 0° (horizontal) and 90° (vertical). Measured in degrees or radians.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Normal Force on Horizontal vs. Inclined Surfaces">
        <p>
          The relationship between normal force and surface orientation is crucial:
        </p>
        
        <h3>Horizontal Surface (θ = 0°)</h3>
        <SEOList items={[
          "Normal force equals weight: N = m × g",
          "Maximum normal force for a given mass",
          "All of the object's weight is supported by the surface",
          "Used in most basic physics problems",
          "Example: A book on a table, a car on a road"
        ]} />

        <h3>Inclined Plane (0° &lt; θ &lt; 90°)</h3>
        <SEOList items={[
          "Normal force is reduced: N = m × g × cos(θ)",
          "Only the perpendicular component of weight is supported",
          "As angle increases, normal force decreases",
          "At 30°: N ≈ 0.866 × m × g (about 87% of weight)",
          "At 45°: N ≈ 0.707 × m × g (about 71% of weight)",
          "At 60°: N = 0.5 × m × g (50% of weight)",
          "Example: A block on a ramp, a car on a hill"
        ]} />

        <h3>Vertical Surface (θ = 90°)</h3>
        <SEOList items={[
          "Normal force approaches zero: N = m × g × cos(90°) = 0",
          "The surface provides no upward support",
          "All weight acts parallel to the surface",
          "Example: A block against a wall (friction must hold it)"
        ]} />

        <p>
          <strong>Key Insight:</strong> The normal force is always perpendicular to the surface and adjusts based on the surface angle. On horizontal surfaces, it equals weight. On inclined surfaces, it&apos;s reduced by the cosine of the angle.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Normal force calculations are essential in numerous fields and applications:
        </p>
        <SEOList items={[
          "Friction Analysis: Normal force determines friction force (F_friction = μ × N)",
          "Structural Engineering: Calculating forces on beams, supports, and foundations",
          "Vehicle Dynamics: Understanding forces on vehicles on hills and ramps",
          "Sports Physics: Analyzing forces in skiing, skateboarding, and other inclined activities",
          "Physics Education: Teaching fundamental mechanics and force analysis",
          "Mechanical Engineering: Designing ramps, elevators, and inclined conveyors",
          "Construction: Calculating forces on structures and supports",
          "Everyday Life: Understanding why objects stay on surfaces and how ramps work"
        ]} />
      </SEOSection>

      <SEOSection title="Common Normal Force Calculations">
        <h3>Example 1: Horizontal Surface</h3>
        <p>A 10 kg object sits on a horizontal surface. What is the normal force?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">N = m × g</p>
          <p className="font-mono">N = 10 kg × 9.80665 m/s² = 98.07 N</p>
          <p className="text-sm text-gray-600 mt-1">The normal force is 98.07 N, equal to the object&apos;s weight</p>
        </div>

        <h3>Example 2: Inclined Plane</h3>
        <p>A 5 kg object sits on a 30° inclined plane. What is the normal force?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">N = m × g × cos(θ)</p>
          <p className="font-mono">N = 5 kg × 9.80665 m/s² × cos(30°)</p>
          <p className="font-mono">N = 49.03 N × 0.866 = 42.46 N</p>
          <p className="text-sm text-gray-600 mt-1">The normal force is 42.46 N, less than the weight of 49.03 N</p>
        </div>

        <h3>Example 3: Finding Mass</h3>
        <p>The normal force on a horizontal surface is 196.13 N. What is the mass? (g = 9.80665 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = N / g</p>
          <p className="font-mono">m = 196.13 N / 9.80665 m/s² = 20 kg</p>
          <p className="text-sm text-gray-600 mt-1">The mass is 20 kg</p>
        </div>

        <h3>Example 4: Finding Angle</h3>
        <p>A 10 kg object on an inclined plane has a normal force of 70.71 N. What is the angle? (g = 9.80665 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">θ = arccos(N / (m × g))</p>
          <p className="font-mono">θ = arccos(70.71 N / (10 kg × 9.80665 m/s²))</p>
          <p className="font-mono">θ = arccos(0.7071) = 45°</p>
          <p className="text-sm text-gray-600 mt-1">The angle is 45°</p>
        </div>

        <h3>Example 5: Comparison</h3>
        <p>Compare normal force for a 10 kg object on horizontal (0°), 30° incline, and 60° incline.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Weight = 10 kg × 9.80665 m/s² = 98.07 N</p>
          <p className="font-mono">Horizontal (0°): N = 98.07 N × cos(0°) = 98.07 N</p>
          <p className="font-mono">30° incline: N = 98.07 N × cos(30°) = 84.96 N</p>
          <p className="font-mono">60° incline: N = 98.07 N × cos(60°) = 49.04 N</p>
          <p className="text-sm text-gray-600 mt-1">As the angle increases, normal force decreases</p>
        </div>
      </SEOSection>

      <SEOSection title="Normal Force and Friction">
        <p>
          Normal force is directly related to friction:
        </p>
        <SEOList items={[
          "Friction Force: F_friction = μ × N, where μ is the coefficient of friction",
          "Static Friction: F_static ≤ μ_s × N, where μ_s is the static friction coefficient",
          "Kinetic Friction: F_kinetic = μ_k × N, where μ_k is the kinetic friction coefficient",
          "Maximum Friction: The maximum friction force depends on normal force",
          "Reduced Normal Force: On inclined planes, reduced normal force means reduced friction",
          "Critical Angle: The angle at which an object begins to slide depends on normal force"
        ]} />
        <p>
          <strong>Important:</strong> Since friction depends on normal force, understanding normal force is essential for friction calculations. On an inclined plane, both friction and normal force are reduced, which is why objects slide more easily on steeper slopes.
        </p>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our calculator supports various units for all measurements:
        </p>
        
        <h3>Force Units:</h3>
        <ul>
          <li><strong>Metric:</strong> N (Newtons), kN (Kilonewtons), mN (Millinewtons), dyn (Dynes)</li>
          <li><strong>Imperial:</strong> lb (Pounds-force), oz (Ounce-force)</li>
        </ul>

        <h3>Mass Units:</h3>
        <ul>
          <li><strong>Metric:</strong> kg (Kilograms), g (Grams), mg (Milligrams), ton (Metric tons)</li>
          <li><strong>Imperial:</strong> lb (Pounds), oz (Ounces), ton (US tons)</li>
        </ul>

        <h3>Acceleration/Gravity Units:</h3>
        <ul>
          <li><strong>Metric:</strong> m/s² (Meters per second squared), cm/s², km/h²</li>
          <li><strong>Imperial:</strong> ft/s² (Feet per second squared)</li>
          <li><strong>Standard:</strong> g (Standard gravity = 9.80665 m/s²)</li>
        </ul>

        <h3>Angle Units:</h3>
        <ul>
          <li><strong>Degrees (°):</strong> Most common, 0° to 90° for inclined planes</li>
          <li><strong>Radians (rad):</strong> Mathematical unit, 0 to π/2 for inclined planes</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically converts between different units, so you can mix units as needed. All calculations are performed in consistent base units (N, kg, m/s²) internally.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding normal force has practical applications:
        </p>
        <SEOList items={[
          "Walking: Normal force from the ground supports our weight",
          "Driving: Normal force on tires affects traction and friction",
          "Ramps: Understanding how normal force changes on ramps and hills",
          "Furniture: Normal force determines how much weight a surface can support",
          "Sports: Normal force affects performance in skiing, skateboarding, and climbing",
          "Construction: Calculating forces on ramps, stairs, and inclined surfaces",
          "Safety: Understanding forces for designing safe ramps and surfaces"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is normal force?",
            answer: "Normal force is the force exerted by a surface perpendicular to an object resting on it. It's called 'normal' because it acts perpendicular (normal) to the contact surface. On a horizontal surface, normal force equals the weight of the object (N = m × g). On an inclined plane, it's reduced (N = m × g × cos(θ))."
          },
          {
            question: "How do you calculate normal force?",
            answer: "For a horizontal surface: N = m × g, where N is normal force, m is mass, and g is gravity. For an inclined plane: N = m × g × cos(θ), where θ is the angle of inclination. Simply multiply mass by gravity (and by cos(θ) for inclined planes)."
          },
          {
            question: "What is the difference between normal force and weight?",
            answer: "Weight is the gravitational force on an object (W = m × g), always acting downward. Normal force is the force exerted by a surface, always acting perpendicular to the surface. On a horizontal surface, they're equal in magnitude but opposite in direction. On an inclined plane, normal force is less than weight."
          },
          {
            question: "Why does normal force decrease on an inclined plane?",
            answer: "On an inclined plane, only the component of weight perpendicular to the surface contributes to normal force. As the angle increases, more of the weight acts parallel to the surface (causing sliding) and less acts perpendicular (normal force). The normal force is N = m × g × cos(θ), which decreases as θ increases."
          },
          {
            question: "Can normal force be greater than weight?",
            answer: "Yes, in some situations. For example, if an object is accelerating upward (like in an elevator), the normal force can be greater than weight. However, for objects at rest on horizontal or inclined surfaces, normal force is typically less than or equal to weight."
          },
          {
            question: "What happens to normal force at 90 degrees?",
            answer: "At 90° (vertical surface), cos(90°) = 0, so N = m × g × 0 = 0. The normal force is zero because the surface is vertical and provides no upward support. All of the object's weight acts parallel to the surface, so friction or other forces must hold it in place."
          },
          {
            question: "How does normal force relate to friction?",
            answer: "Friction force is directly proportional to normal force: F_friction = μ × N, where μ is the coefficient of friction. Higher normal force means higher friction. On inclined planes, reduced normal force means reduced friction, which is why objects slide more easily on steeper slopes."
          },
          {
            question: "What units are used for normal force?",
            answer: "Normal force is measured in force units: Newtons (N) in metric systems, pounds-force (lb) in imperial systems. Other units include kilonewtons (kN), millinewtons (mN), and dynes. The calculator supports all common force units with automatic conversion."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding normal force and the relationships N = m × g (horizontal) and N = m × g × cos(θ) (inclined) is fundamental to mechanics, physics, and engineering. Our Normal Force Calculator simplifies these calculations, making it easy to determine normal force, mass, gravity, or angle for both horizontal and inclined surfaces.
        </p>
        <p>
          Whether you&apos;re solving physics problems, analyzing forces, designing structures, or simply curious about how forces work, this calculator provides accurate results with comprehensive unit support. Ready to explore more mechanics concepts? Check out our other calculators like the {createInternalLink('friction-calculator', 'Friction Calculator')} for friction calculations (which depends on normal force), the {createInternalLink('force-calculator', 'Force Calculator')} for general force calculations, or the {createInternalLink('kilogram-to-newtons-calculator', 'Kilogram to Newtons Calculator')} for weight calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

