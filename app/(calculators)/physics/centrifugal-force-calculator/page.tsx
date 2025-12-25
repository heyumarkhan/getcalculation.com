import CentrifugalForceCalculator from '../../../_components/calculators/CentrifugalForceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function CentrifugalForceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Centrifugal Force Calculator: Calculate F, Mass, Velocity & Radius"
      description="Calculate centrifugal force, mass, velocity, or radius using F = m × v²/r. Free online physics calculator for circular motion, rotating systems, and centrifugal force calculations."
      calculator={<CentrifugalForceCalculator />}
      slug="physics/centrifugal-force-calculator"
      category="Mechanics"
      features={[
        "Calculate centrifugal force from mass, velocity, and radius",
        "Calculate mass from centrifugal force, velocity, and radius",
        "Calculate velocity from centrifugal force, mass, and radius",
        "Calculate radius from centrifugal force, mass, and velocity",
        "Multiple unit support (N, kg, m/s, m)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Centrifugal Force: Forces in Circular Motion">
        <p>
          Centrifugal force is an apparent force that appears to act outward on objects moving in circular paths. While technically a &quot;fictitious&quot; or &quot;pseudo&quot; force that arises in rotating reference frames, centrifugal force is a crucial concept for understanding circular motion, rotating systems, and many real-world applications. Our Centrifugal Force Calculator simplifies these calculations using the formula: <strong>F = m × v² / r</strong>, where F is centrifugal force, m is mass, v is velocity, and r is radius.
        </p>
        <p>
          Whether you&apos;re studying physics, engineering rotating machinery, analyzing vehicle dynamics, or understanding amusement park rides, calculating centrifugal force is essential. Our calculator helps you determine centrifugal force, mass, velocity, or radius for any object in circular motion, making complex physics calculations simple and accurate.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Centrifugal Force Calculator">
        <p>
          Our Centrifugal Force Calculator offers four calculation modes:
        </p>
        <SEOList ordered items={[
          '<strong>Calculate Centrifugal Force:</strong> Enter mass, velocity, and radius. The calculator determines the centrifugal force acting on the object.',
          '<strong>Calculate Mass:</strong> Enter centrifugal force, velocity, and radius. The calculator determines the mass of the object.',
          '<strong>Calculate Velocity:</strong> Enter centrifugal force, mass, and radius. The calculator determines the velocity required.',
          '<strong>Calculate Radius:</strong> Enter centrifugal force, mass, and velocity. The calculator determines the radius of the circular path.'
        ]} />
        <p>
          Select your calculation mode, enter the known values with appropriate units, and click Calculate to get instant results with detailed step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="The Centrifugal Force Formula">
        <p>
          Centrifugal force is calculated using the relationship between mass, velocity, and radius:
        </p>

        <SEOFormula
          formula="F = m × v² / r"
          description="Centrifugal Force = Mass × Velocity² ÷ Radius"
        />
        <p>
          Where:
        </p>
        <SEOList items={[
          '<strong>F</strong> = Centrifugal Force (Newtons, N)',
          '<strong>m</strong> = Mass (kilograms, kg)',
          '<strong>v</strong> = Linear Velocity (meters per second, m/s)',
          '<strong>r</strong> = Radius of Circular Path (meters, m)'
        ]} />

        <h3>Related Formulas:</h3>
        <SEOList items={[
          '<strong>Mass:</strong> m = (F × r) / v²',
          '<strong>Velocity:</strong> v = √(F × r / m)',
          '<strong>Radius:</strong> r = (m × v²) / F',
          '<strong>Using Angular Velocity:</strong> F = m × ω² × r, where ω (omega) is angular velocity in rad/s',
          '<strong>Relationship:</strong> v = ω × r (linear velocity = angular velocity × radius)',
          '<strong>Centripetal Force:</strong> The actual inward force (equal in magnitude, opposite in direction) is F_centripetal = m × v² / r'
        ]} />

        <h3>Understanding Centrifugal vs. Centripetal Force:</h3>
        <p>
          It&apos;s important to distinguish between centrifugal and centripetal forces:
        </p>
        <ul>
          <li><strong>Centripetal Force:</strong> The real, inward-directed force that keeps an object moving in a circular path (provided by tension, gravity, friction, etc.)</li>
          <li><strong>Centrifugal Force:</strong> The apparent outward force experienced in a rotating reference frame, equal in magnitude but opposite in direction to centripetal force</li>
          <li><strong>Key Difference:</strong> Centripetal force is real and acts on the object. Centrifugal force is fictitious and appears due to the rotating reference frame</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications of Centrifugal Force Calculations">
        <p>
          Centrifugal force calculations are essential in numerous practical applications:
        </p>
        <SEOList items={[
          "Vehicle Dynamics: Understanding forces in turns, banking, and cornering at high speeds",
          "Amusement Park Rides: Designing roller coasters, spinning rides, and rotating attractions",
          "Centrifuges: Separating materials by density in laboratories and industrial processes",
          "Washing Machines: Understanding how spin cycles remove water from clothes",
          "Planetary Motion: Analyzing orbital mechanics and satellite trajectories",
          "Sports: Understanding forces in discus throwing, hammer throwing, and other rotating sports",
          "Aerospace Engineering: Designing spacecraft, satellites, and orbital systems",
          "Automotive Engineering: Designing tires, wheels, and rotating components",
          "Industrial Machinery: Analyzing forces in rotating equipment like turbines and flywheels",
          "Physics Education: Teaching circular motion and rotational dynamics",
          "Entertainment: Designing rotating stages and spinning platforms",
          "Space Habitats: Designing artificial gravity systems using rotation"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Circular Motion and Rotating Reference Frames">
        <p>
          To fully understand centrifugal force, it&apos;s important to grasp the concepts of circular motion and reference frames:
        </p>
        <ul>
          <li><strong>Circular Motion:</strong> Motion along a circular path requires a constant inward force (centripetal force) to change direction continuously</li>
          <li><strong>Rotating Reference Frame:</strong> When observing motion from a frame that rotates with the object, centrifugal force appears to push objects outward</li>
          <li><strong>Inertia:</strong> Objects tend to move in straight lines (Newton&apos;s first law). To keep them in circular paths, forces must constantly redirect them</li>
          <li><strong>Acceleration:</strong> Even at constant speed, circular motion involves acceleration (centripetal acceleration) because direction is changing</li>
        </ul>
        <p>
          The magnitude of centrifugal force increases with mass, velocity squared, and decreases with radius. This explains why faster turns require stronger forces, and why wider turns are gentler.
        </p>
      </SEOSection>

      <SEOSection title="Common Centrifugal Force Calculations">
        <h3>Example 1: Calculating Centrifugal Force on a Car in a Turn</h3>
        <p>A car with mass 1500 kg travels at 25 m/s (90 km/h) around a curve with radius 100 m. What is the centrifugal force?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F = m × v² / r</p>
          <p className="font-mono">F = 1500 kg × (25 m/s)² / 100 m</p>
          <p className="font-mono">F = 1500 kg × 625 m²/s² / 100 m</p>
          <p className="font-mono">F = 9375 N = 9.375 kN</p>
          <p className="text-sm text-gray-600 mt-1">The car experiences a centrifugal force of 9375 Newtons outward from the center of the turn. This force must be countered by friction between tires and road.</p>
        </div>

        <h3>Example 2: Calculating Required Velocity</h3>
        <p>A 0.5 kg object on a string experiences a centrifugal force of 100 N when the string radius is 2 m. What velocity is required?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = √(F × r / m)</p>
          <p className="font-mono">v = √(100 N × 2 m / 0.5 kg)</p>
          <p className="font-mono">v = √(400 m²/s²)</p>
          <p className="font-mono">v = 20 m/s</p>
          <p className="text-sm text-gray-600 mt-1">The object must move at 20 m/s (72 km/h) to experience this centrifugal force.</p>
        </div>

        <h3>Example 3: Calculating Radius from Known Values</h3>
        <p>A centrifuge generates 5000 N of centrifugal force on a 0.1 kg sample moving at 50 m/s. What is the radius of rotation?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">r = (m × v²) / F</p>
          <p className="font-mono">r = (0.1 kg × (50 m/s)²) / 5000 N</p>
          <p className="font-mono">r = (0.1 kg × 2500 m²/s²) / 5000 N</p>
          <p className="font-mono">r = 250 kg·m²/s² / 5000 N = 0.05 m = 5 cm</p>
          <p className="text-sm text-gray-600 mt-1">The centrifuge has a radius of 5 centimeters.</p>
        </div>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our Centrifugal Force Calculator supports multiple units for each parameter:
        </p>
        <SEOList items={[
          '<strong>Centrifugal Force:</strong> Newtons (N), kilonewtons (kN), millinewtons (mN), pounds-force (lb), dynes',
          '<strong>Mass:</strong> Kilograms (kg), grams (g), milligrams (mg), pounds (lb), ounces (oz), metric tons',
          '<strong>Velocity:</strong> Meters per second (m/s), kilometers per hour (km/h), miles per hour (mph), feet per second (ft/s), kilometers per second (km/s)',
          '<strong>Radius:</strong> Meters (m), centimeters (cm), millimeters (mm), kilometers (km), feet (ft), inches (in), miles (mi)'
        ]} />
        <p>
          <strong>Conversion Tip:</strong> The calculator automatically converts between different units, ensuring accurate calculations regardless of the unit system you use. All internal calculations are performed in base SI units (N, kg, m/s, m).
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is centrifugal force and how is it calculated?",
            answer: "Centrifugal force is the apparent outward force on an object moving in a circular path. It's calculated using F = m × v² / r, where F is centrifugal force (N), m is mass (kg), v is linear velocity (m/s), and r is the radius of the circular path (m). Technically, centrifugal force is a 'fictitious' force that appears in rotating reference frames, but it's very useful for understanding circular motion."
          },
          {
            question: "What is the difference between centrifugal and centripetal force?",
            answer: "Centripetal force is the real, inward-directed force that keeps an object moving in a circle (like tension in a string, or friction on tires). Centrifugal force is the apparent outward force experienced in a rotating reference frame. They have the same magnitude (m × v² / r) but opposite directions. Centripetal force acts on the object; centrifugal force appears due to the rotating frame of reference."
          },
          {
            question: "Is centrifugal force a real force?",
            answer: "Centrifugal force is considered a 'fictitious' or 'pseudo' force because it only appears in rotating (non-inertial) reference frames. In an inertial (non-rotating) frame, the only real force is centripetal force acting inward. However, centrifugal force is very real to an observer in the rotating frame (like someone in a spinning car), making it a useful concept for analysis."
          },
          {
            question: "How does radius affect centrifugal force?",
            answer: "Centrifugal force is inversely proportional to radius: F = m × v² / r. This means larger radius results in smaller centrifugal force for the same mass and velocity. For example, a car making a wide turn experiences less centrifugal force than the same car making a tight turn at the same speed. This is why highway curves are banked and have large radii."
          },
          {
            question: "Why does velocity appear squared in the centrifugal force formula?",
            answer: "Velocity is squared (v²) because both the momentum (m × v) and the rate of change of direction (which depends on v) contribute to the force. Doubling the velocity quadruples the centrifugal force (2² = 4). This is why high-speed turns require much stronger forces and why speed limits are important on curved roads."
          },
          {
            question: "Can you calculate centrifugal force using angular velocity?",
            answer: "Yes! Using angular velocity (ω in rad/s), the formula becomes F = m × ω² × r. Since linear velocity v = ω × r, both formulas are equivalent: F = m × v² / r = m × (ω × r)² / r = m × ω² × r. Use whichever is more convenient based on your known values."
          },
          {
            question: "How is centrifugal force used in centrifuges?",
            answer: "Centrifuges use rapid rotation to generate high centrifugal forces, which separate materials by density. Denser materials experience greater centrifugal force and move outward faster. This principle is used in laboratory centrifuges to separate blood components, in industrial separators to process materials, and in washing machines to remove water from clothes."
          },
          {
            question: "What happens if centrifugal force exceeds the countering force?",
            answer: "If centrifugal force exceeds the centripetal force (like friction or tension), the object will no longer follow the circular path and will move outward. For example, if a car takes a turn too fast, friction may be insufficient to provide the needed centripetal force, causing the car to slide outward (or 'break loose') from the curve."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding and calculating centrifugal force is essential for analyzing circular motion, designing rotating systems, and solving physics problems. Our Centrifugal Force Calculator simplifies these calculations, making it easy to determine centrifugal force, mass, velocity, or radius for any object in circular motion.
        </p>
        <p>
          Whether you&apos;re studying physics, engineering rotating machinery, analyzing vehicle dynamics, or designing amusement park rides, this calculator provides accurate results with step-by-step solutions. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('force-calculator', 'Force Calculator')} for general force calculations, or use our {createInternalLink('velocity-calculator', 'Velocity Calculator')} for motion calculations that complement centrifugal force analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

