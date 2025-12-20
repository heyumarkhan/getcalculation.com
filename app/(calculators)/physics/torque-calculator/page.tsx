import TorqueCalculator from '../../../_components/calculators/TorqueCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function TorqueCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Torque Calculator: Calculate τ = F × r Instantly"
      description="Calculate torque, force, or lever arm distance using τ = F × r. Free online mechanics calculator for physics and engineering with multiple unit support (N·m, lb·ft, etc.)."
      calculator={<TorqueCalculator />}
      slug="physics/torque-calculator"
      category="Mechanics"
      features={[
        "Calculate torque, force, or distance",
        "Instant mechanics calculations",
        "Multiple unit support (N·m, lb·ft, kgf·m, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Torque: The Foundation of Rotational Motion">
        <p>
          Torque is one of the most fundamental concepts in mechanics and rotational physics. It describes the rotational force that causes objects to rotate around an axis or pivot point. Whether you&apos;re studying physics, engineering, working on mechanical systems, or designing machinery, understanding torque is essential. Our Torque Calculator makes it easy to calculate torque, force, or lever arm distance using the fundamental formula: <strong>τ = F × r</strong> (torque equals force times distance).
        </p>
        <p>
          Torque is what makes wheels turn, doors open, wrenches tighten bolts, and engines power vehicles. It&apos;s the rotational equivalent of linear force, and understanding it is crucial for analyzing rotational motion, designing mechanical systems, and solving engineering problems involving rotation.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Torque Calculator">
        <p>
          Our Torque Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (torque, force, or distance)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with automatic unit conversion</li>
        </ol>
        <p>
          The calculator uses the fundamental torque formula: <strong>Torque = Force × Distance (τ = F × r)</strong>
        </p>
        <p>
          You can rearrange this formula to solve for any variable:
        </p>
        <ul>
          <li><strong>Torque:</strong> τ = F × r</li>
          <li><strong>Force:</strong> F = τ ÷ r</li>
          <li><strong>Distance:</strong> r = τ ÷ F</li>
        </ul>
      </SEOSection>

      <SEOSection title="Understanding the Torque Formula">
        <p>
          The torque formula is one of the most important equations in rotational mechanics:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">τ = F × r</p>
          <p className="text-sm text-gray-600 mt-2">Where: τ = torque, F = force, r = distance from pivot (lever arm)</p>
        </div>
        
        <h3>What is Torque?</h3>
        <p>
          Torque (τ) is a measure of the rotational force applied to an object. It depends on two factors:
        </p>
        <ul>
          <li><strong>Force (F):</strong> The magnitude of the force applied</li>
          <li><strong>Lever Arm (r):</strong> The perpendicular distance from the pivot point to the line of action of the force</li>
        </ul>
        <p>
          The key insight is that the same force produces more torque when applied farther from the pivot point. This is why longer wrenches make it easier to turn bolts, and why door handles are placed far from the hinges.
        </p>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Torque (τ):</strong> Rotational force, measured in N·m (Newton-meters), lb·ft (pound-feet), or kgf·m (kilogram-force meters)</li>
          <li><strong>Force (F):</strong> The applied force, measured in N (Newtons), lb (pounds), or kgf (kilogram-force)</li>
          <li><strong>Lever Arm (r):</strong> The perpendicular distance from the pivot to the force, measured in m (meters), cm, ft, or in</li>
          <li><strong>Perpendicular Distance:</strong> The shortest distance from the pivot point to the line along which the force acts</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Torque calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Automotive Engineering: Engine torque, transmission design, wheel torque, and brake systems",
          "Mechanical Engineering: Machine design, gear systems, and rotating machinery",
          "Construction: Bolt tightening, structural design, and crane operations",
          "Manufacturing: Assembly processes, tool design, and quality control",
          "Aerospace: Propeller design, control surfaces, and engine systems",
          "Robotics: Joint torque, actuator design, and motion control",
          "Sports: Golf club design, baseball bat physics, and athletic performance",
          "Everyday Tools: Wrenches, screwdrivers, door handles, and levers",
          "Industrial Equipment: Motors, pumps, compressors, and rotating machinery"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your calculations. Our calculator supports multiple unit systems and automatically converts between them:
        </p>
        
        <h3>Torque Units</h3>
        <ul>
          <li><strong>Metric:</strong> N·m (Newton-meters), kN·m (Kilonewton-meters), N·cm, N·mm, kgf·m (Kilogram-force meters), kgf·cm</li>
          <li><strong>Imperial:</strong> lb·ft (Pound-feet), lb·in (Pound-inches), oz·in (Ounce-inches)</li>
        </ul>
        <p><strong>Note:</strong> 1 N·m = 0.737562 lb·ft, 1 lb·ft = 1.35582 N·m</p>

        <h3>Force Units</h3>
        <ul>
          <li><strong>Metric:</strong> N (Newtons), kN (Kilonewtons), mN (Millinewtons), kgf (Kilogram-force), gf (Gram-force)</li>
          <li><strong>Imperial:</strong> lb (Pounds), oz (Ounces)</li>
        </ul>
        <p><strong>Note:</strong> 1 N = 0.224809 lb, 1 kgf = 9.80665 N</p>

        <h3>Distance Units</h3>
        <ul>
          <li><strong>Metric:</strong> m (meters), cm (centimeters), mm (millimeters), km (kilometers)</li>
          <li><strong>Imperial:</strong> ft (feet), in (inches), yd (yards), mi (miles)</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles unit conversions, so you can mix different unit systems. For example, you can input force in Newtons, distance in centimeters, and get torque in N·m.
        </p>
      </SEOSection>

      <SEOSection title="Common Torque Calculations">
        <h3>Example 1: Calculating Torque</h3>
        <p>A force of 50 N is applied perpendicular to a wrench at a distance of 0.3 m from the bolt. What is the torque?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">τ = F × r = 50 N × 0.3 m = 15 N·m</p>
        </div>

        <h3>Example 2: Calculating Force</h3>
        <p>You need to apply 20 N·m of torque to tighten a bolt. If your wrench is 0.25 m long, what force must you apply?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = τ / r = 20 N·m / 0.25 m = 80 N</p>
        </div>

        <h3>Example 3: Calculating Lever Arm</h3>
        <p>You can apply a maximum force of 200 N. How long must your wrench be to produce 50 N·m of torque?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">r = τ / F = 50 N·m / 200 N = 0.25 m = 25 cm</p>
        </div>

        <h3>Example 4: Automotive Torque</h3>
        <p>An engine produces 300 N·m of torque. If this torque is applied at a wheel radius of 0.35 m, what force is exerted on the road?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = τ / r = 300 N·m / 0.35 m = 857.1 N</p>
          <p className="text-sm text-gray-600 mt-1">This is the force that propels the vehicle forward</p>
        </div>

        <h3>Example 5: Mixed Units</h3>
        <p>Calculate the torque when a force of 50 lb is applied at a distance of 2 ft from the pivot.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">τ = F × r = 50 lb × 2 ft = 100 lb·ft</p>
          <p className="text-sm text-gray-600 mt-1">Which equals approximately 135.6 N·m</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Lever Arm and Perpendicular Distance">
        <p>
          The lever arm (r) in the torque formula is the perpendicular distance from the pivot point to the line of action of the force. This is crucial to understand:
        </p>
        <ul>
          <li><strong>Perpendicular Distance:</strong> The shortest distance from the pivot to the force line, forming a 90° angle</li>
          <li><strong>Maximum Torque:</strong> Occurs when force is applied perpendicular to the lever arm</li>
          <li><strong>Angled Forces:</strong> When force is not perpendicular, only the perpendicular component contributes to torque: τ = F × r × sin(θ)</li>
          <li><strong>Zero Torque:</strong> When force is applied directly through the pivot point (r = 0), no rotation occurs</li>
        </ul>
        <p>
          Our calculator assumes the force is applied perpendicular to the lever arm, which is the most common case. For angled forces, you would need to account for the angle using the sine function.
        </p>
      </SEOSection>

      <SEOSection title="Torque in Rotational Motion">
        <p>
          Torque plays a fundamental role in rotational motion, similar to how force affects linear motion:
        </p>
        <ul>
          <li><strong>Newton&apos;s Second Law for Rotation:</strong> τ = I × α, where I is moment of inertia and α is angular acceleration</li>
          <li><strong>Work and Energy:</strong> Rotational work = τ × θ (torque times angular displacement)</li>
          <li><strong>Power:</strong> Rotational power = τ × ω (torque times angular velocity)</li>
          <li><strong>Equilibrium:</strong> For rotational equilibrium, the sum of all torques must equal zero</li>
        </ul>
        <p>
          Understanding torque is essential for analyzing rotating systems, from simple wheels to complex machinery.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding torque has practical applications in daily life:
        </p>
        <SEOList items={[
          "Opening Doors: Door handles are placed far from hinges to maximize torque with minimal force",
          "Using Tools: Longer wrenches and screwdrivers provide more torque, making tasks easier",
          "Automotive: Understanding engine torque helps with vehicle performance and towing capacity",
          "Sports: Golf clubs, baseball bats, and tennis rackets all involve torque principles",
          "Home Improvement: Tightening bolts, assembling furniture, and using hand tools",
          "Bicycles: Pedal force and crank length determine the torque applied to the wheel",
          "Cooking: Opening jars and using can openers rely on torque principles"
        ]} />
      </SEOSection>

      <SEOSection title="Torque vs. Force: Understanding the Difference">
        <p>
          It&apos;s important to distinguish between torque and force:
        </p>
        <ul>
          <li><strong>Force:</strong> Causes linear acceleration (F = m × a) - measured in Newtons or pounds</li>
          <li><strong>Torque:</strong> Causes rotational acceleration (τ = I × α) - measured in N·m or lb·ft</li>
          <li><strong>Relationship:</strong> Torque = Force × Lever Arm (τ = F × r)</li>
        </ul>
        <p>
          The same force can produce different torques depending on where it&apos;s applied. A small force applied far from the pivot can produce more torque than a large force applied close to the pivot.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between torque, force, and distance?",
            answer: "Torque (τ) equals force (F) times the lever arm distance (r): τ = F × r. This means torque increases with both force and distance. The same force produces more torque when applied farther from the pivot point. You can rearrange this to solve for force (F = τ/r) or distance (r = τ/F)."
          },
          {
            question: "What are the most common torque units?",
            answer: "In the metric system, N·m (Newton-meters) is most common, along with kgf·m (kilogram-force meters). In the imperial system, lb·ft (pound-feet) and lb·in (pound-inches) are standard. Automotive applications often use lb·ft, while engineering typically uses N·m."
          },
          {
            question: "What is a lever arm in torque calculations?",
            answer: "The lever arm (r) is the perpendicular distance from the pivot point to the line of action of the force. It's the shortest distance between the pivot and the force line. Maximum torque occurs when the force is perpendicular to the lever arm. For angled forces, only the perpendicular component contributes to torque."
          },
          {
            question: "How does distance affect torque?",
            answer: "Torque is directly proportional to distance from the pivot. Doubling the lever arm doubles the torque for the same force. This is why longer wrenches make it easier to turn bolts - they provide more torque with the same applied force. The relationship is linear: τ ∝ r."
          },
          {
            question: "Can torque be negative?",
            answer: "Yes, torque can be negative, which indicates rotation in the opposite direction. Torque is a vector quantity with both magnitude and direction. Positive torque causes counterclockwise rotation (by convention), while negative torque causes clockwise rotation. Our calculator focuses on magnitude."
          },
          {
            question: "What's the difference between torque and moment?",
            answer: "Torque and moment are often used interchangeably, but there are subtle differences. Torque typically refers to rotational force in dynamic situations (causing rotation), while moment often refers to static situations (bending, twisting). Both use the same formula τ = F × r and have the same units."
          },
          {
            question: "How is torque used in automotive applications?",
            answer: "Engine torque determines a vehicle's ability to accelerate and pull loads. Higher torque at lower RPMs provides better towing capacity and acceleration. Torque is measured at the engine crankshaft and transmitted through the transmission to the wheels. Wheel torque = engine torque × gear ratio."
          },
          {
            question: "What happens when force is applied at an angle?",
            answer: "When force is not perpendicular to the lever arm, only the perpendicular component contributes to torque. The formula becomes τ = F × r × sin(θ), where θ is the angle between the force and lever arm. Maximum torque occurs at 90° (perpendicular), and zero torque occurs when force is parallel to the lever arm (0° or 180°)."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding torque and the relationship τ = F × r is fundamental to mechanics, rotational physics, and many practical applications. Our Torque Calculator simplifies these calculations, making it easy to solve problems involving rotational forces, lever systems, and mechanical design.
        </p>
        <p>
          Whether you&apos;re calculating torque for engineering projects, understanding mechanical systems, or solving physics problems, this calculator provides accurate results with support for multiple unit systems. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('velocity-calculator')} for motion calculations, or use our {createInternalLink('acceleration-calculator')} for acceleration problems that often complement torque analysis in rotational dynamics.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

