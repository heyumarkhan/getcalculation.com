import ForceCalculator from '../../../_components/calculators/ForceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ForceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Force Calculator: Calculate Force, Mass & Acceleration (F = ma)"
      description="Calculate force, mass, or acceleration using Newton's second law: F = m × a. Free online physics calculator for mechanics problems with comprehensive unit support."
      calculator={<ForceCalculator />}
      slug="physics/force-calculator"
      category="Mechanics"
      features={[
        "Calculate force from mass and acceleration",
        "Calculate mass from force and acceleration",
        "Calculate acceleration from force and mass",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Force: The Foundation of Mechanics">
        <p>
          Force is one of the most fundamental concepts in physics, describing the interaction that causes objects to accelerate. Whether you&apos;re studying mechanics, engineering, or simply curious about how things move, understanding force is essential. Our Force Calculator makes it easy to calculate force, mass, or acceleration using Newton&apos;s second law of motion: <strong>F = m × a</strong>.
        </p>
        <p>
          Newton&apos;s second law states that the force acting on an object equals the mass of the object multiplied by its acceleration. This simple yet powerful equation is the cornerstone of classical mechanics and applies to countless real-world situations, from pushing a shopping cart to launching a rocket.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Force Calculator">
        <p>
          Our Force Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (force, mass, or acceleration)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with step-by-step solutions</li>
        </ol>
        <p>
          The calculator uses Newton&apos;s second law: <strong>F = m × a</strong>, where F is force, m is mass, and a is acceleration.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Newton&apos;s Second Law">
        <p>
          Newton&apos;s second law of motion is expressed as:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">F = m × a</p>
          <p className="text-sm text-gray-600 mt-2">Where: F = force, m = mass, a = acceleration</p>
        </div>
        
        <h3>Rearranging the Formula</h3>
        <p>You can rearrange this formula to solve for any variable:</p>
        <ul>
          <li><strong>Force:</strong> F = m × a</li>
          <li><strong>Mass:</strong> m = F / a</li>
          <li><strong>Acceleration:</strong> a = F / m</li>
        </ul>

        <h3>Key Principles</h3>
        <ul>
          <li><strong>Force and Acceleration:</strong> Force and acceleration are directly proportional - doubling the force doubles the acceleration (for constant mass)</li>
          <li><strong>Mass and Acceleration:</strong> Mass and acceleration are inversely proportional - doubling the mass halves the acceleration (for constant force)</li>
          <li><strong>Vector Nature:</strong> Force and acceleration are vectors, meaning they have both magnitude and direction</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Force calculations are used in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Automotive Engineering: Calculating forces in vehicle design and crash testing",
          "Sports Science: Analyzing forces in athletic movements and equipment",
          "Aerospace: Designing aircraft, rockets, and spacecraft propulsion systems",
          "Construction: Determining forces in structures, bridges, and buildings",
          "Manufacturing: Analyzing forces in machinery and production processes",
          "Physics Education: Teaching fundamental mechanics concepts",
          "Everyday Life: Understanding forces in pushing, pulling, and lifting objects",
          "Robotics: Programming robots to apply appropriate forces"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your force calculations:
        </p>
        <ul>
          <li><strong>Force:</strong> Newtons (N), Kilonewtons (kN), Millinewtons (mN), Pounds-force (lb), Ounce-force (oz), Dynes (dyn)</li>
          <li><strong>Mass:</strong> Kilograms (kg), Grams (g), Milligrams (mg), Pounds (lb), Ounces (oz), Metric tons, US tons</li>
          <li><strong>Acceleration:</strong> Meters per second squared (m/s²), Centimeters per second squared (cm/s²), Feet per second squared (ft/s²), Standard gravity (g), km/h²</li>
        </ul>
        <p>
          <strong>Tip:</strong> Our calculator automatically converts between different units, so you can mix units as needed. The calculator ensures all calculations are performed in consistent base units (N, kg, m/s²) internally.
        </p>
      </SEOSection>

      <SEOSection title="Common Force Calculations">
        <h3>Example 1: Calculating Force</h3>
        <p>A 10 kg object accelerates at 5 m/s². What is the force acting on it?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = m × a = 10 kg × 5 m/s² = 50 N</p>
        </div>

        <h3>Example 2: Calculating Mass</h3>
        <p>A force of 100 N causes an object to accelerate at 2 m/s². What is the mass of the object?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = F / a = 100 N / 2 m/s² = 50 kg</p>
        </div>

        <h3>Example 3: Calculating Acceleration</h3>
        <p>A 20 kg object experiences a force of 60 N. What is its acceleration?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">a = F / m = 60 N / 20 kg = 3 m/s²</p>
        </div>

        <h3>Example 4: Using Standard Gravity</h3>
        <p>What force does Earth&apos;s gravity exert on a 5 kg object?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = m × a = 5 kg × 9.80665 m/s² = 49.03 N</p>
          <p className="text-sm text-gray-600 mt-1">Note: Standard gravity (g) = 9.80665 m/s²</p>
        </div>
      </SEOSection>

      <SEOSection title="Newton&apos;s Laws of Motion">
        <p>
          Newton&apos;s second law is part of a set of three fundamental laws:
        </p>
        <ul>
          <li><strong>First Law (Law of Inertia):</strong> An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced force</li>
          <li><strong>Second Law (F = ma):</strong> The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass</li>
          <li><strong>Third Law (Action-Reaction):</strong> For every action, there is an equal and opposite reaction</li>
        </ul>
        <p>
          Our calculator focuses on the second law, which quantifies the relationship between force, mass, and acceleration.
        </p>
      </SEOSection>

      <SEOSection title="Force as a Vector Quantity">
        <p>
          Force is a vector quantity, meaning it has both magnitude and direction:
        </p>
        <ul>
          <li><strong>Magnitude:</strong> The size or strength of the force (measured in Newtons)</li>
          <li><strong>Direction:</strong> The direction in which the force acts</li>
          <li><strong>Net Force:</strong> When multiple forces act on an object, the net force is the vector sum of all forces</li>
        </ul>
        <p>
          Our calculator computes the magnitude of force. For problems involving multiple forces or directions, vector mathematics is required to find the net force and resulting acceleration.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is force and how is it measured?",
            answer: "Force is a push or pull that causes an object to accelerate. It's measured in Newtons (N) in the SI system, where 1 N = 1 kg·m/s². Force is a vector quantity, meaning it has both magnitude and direction. Common forces include gravity, friction, tension, and applied forces."
          },
          {
            question: "What is Newton's second law?",
            answer: "Newton's second law states that F = m × a, where F is force, m is mass, and a is acceleration. This means the force acting on an object equals its mass multiplied by its acceleration. It's one of the most fundamental equations in physics and applies to all objects with constant mass."
          },
          {
            question: "Can force be negative?",
            answer: "Yes, force can be negative when considering direction. Negative force typically indicates force acting in the opposite direction of a chosen positive direction. However, our calculator focuses on magnitude, so it requires positive values. For vector problems, you would need to consider direction separately."
          },
          {
            question: "What is the difference between force and weight?",
            answer: "Weight is a specific type of force - the gravitational force acting on an object. Weight = mass × gravitational acceleration (W = mg). On Earth, weight is approximately mass × 9.8 m/s². Force is a more general term that includes weight, friction, tension, and all other types of forces."
          },
          {
            question: "What units should I use for force calculations?",
            answer: "In the SI system, force is measured in Newtons (N), mass in kilograms (kg), and acceleration in meters per second squared (m/s²). Our calculator supports multiple unit systems and automatically converts between them. Always ensure your units are consistent or let the calculator handle conversions."
          },
          {
            question: "How does mass affect force and acceleration?",
            answer: "According to F = ma, for a constant force, increasing mass decreases acceleration (inverse relationship). For a constant acceleration, increasing mass requires more force (direct relationship). Mass is a measure of an object's resistance to acceleration - more massive objects are harder to accelerate."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding force and Newton&apos;s second law is fundamental to mechanics and physics. Our Force Calculator simplifies these calculations, making it easy to solve problems involving force, mass, and acceleration.
        </p>
        <p>
          Ready to explore more mechanics concepts? Check out our other calculators like the {createInternalLink('acceleration-calculator', 'Acceleration Calculator')} for motion calculations, or the {createInternalLink('gravitational-force-calculator', 'Gravitational Force Calculator')} for gravitational force calculations that often complement force analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

