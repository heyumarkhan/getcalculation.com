import ConservationOfMomentumCalculator from '../../../_components/calculators/ConservationOfMomentumCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ConservationOfMomentumCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Conservation of Momentum Calculator: Calculate Final Velocities & Masses in Collisions"
      description="Calculate final velocities or masses in collisions using conservation of momentum. Free online physics calculator for elastic and inelastic collisions using m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f with step-by-step solutions."
      calculator={<ConservationOfMomentumCalculator />}
      slug="physics/conservation-of-momentum-calculator"
      category="Mechanics"
      features={[
        "Calculate final velocities in collisions",
        "Calculate masses from collision data",
        "Support for multiple mass units (kg, g, lb, oz)",
        "Support for multiple velocity units (m/s, km/h, mph, ft/s)",
        "Step-by-step calculation breakdown",
        "Detailed formula explanation",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Conservation of Momentum: Fundamental Law of Physics">
        <p>
          Conservation of momentum is one of the most fundamental principles in physics, stating that in a closed system with no external forces, the total momentum before a collision equals the total momentum after the collision. This principle is crucial for analyzing collisions, explosions, and interactions between objects. Our Conservation of Momentum Calculator simplifies these calculations, allowing you to determine final velocities or masses using the equation <strong>m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f</strong>, where m represents mass, v represents velocity, and the subscripts indicate object (1 or 2) and time (initial i or final f).
        </p>
        <p>
          Whether you&apos;re studying physics, analyzing collisions, solving mechanics problems, or understanding the behavior of interacting objects, conservation of momentum is essential. Our calculator supports multiple calculation modes, allowing you to find final velocities or masses based on the information you have, making complex collision analysis simple and accessible.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Conservation of Momentum Calculator">
        <p>
          Our Conservation of Momentum Calculator offers several calculation modes:
        </p>
        <SEOList ordered items={[
          '<strong>Select Calculation Mode:</strong> Choose what you want to calculate - final velocities, final velocity of object 1, final velocity of object 2, mass of object 1, or mass of object 2.',
          '<strong>Enter Masses:</strong> Input the masses of both objects in your preferred unit (kilograms, grams, pounds, or ounces). If calculating a mass, leave that field empty.',
          '<strong>Enter Initial Velocities:</strong> Input the initial velocities of both objects before the collision. Velocities can be positive (forward) or negative (backward) depending on direction.',
          '<strong>Enter Final Velocities:</strong> Input known final velocities. If calculating a final velocity, leave that field empty (it will be disabled automatically).',
          '<strong>Select Units:</strong> Choose appropriate units for mass and velocity. The calculator automatically converts all values to base units for calculation.',
          '<strong>Calculate:</strong> Click Calculate to get the result with a detailed step-by-step breakdown showing how conservation of momentum was applied.'
        ]} />
        <p>
          The calculator automatically handles unit conversions, converts all values to consistent base units (kilograms and meters per second), and presents results in your chosen units with comprehensive calculation steps.
        </p>
      </SEOSection>

      <SEOSection title="Conservation of Momentum Formula Explained">
        <p>
          The conservation of momentum principle is expressed mathematically as:
        </p>

        <SEOFormula
          formula="m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f"
          description="Where: m₁ = Mass of object 1, m₂ = Mass of object 2, v₁ᵢ = Initial velocity of object 1, v₂ᵢ = Initial velocity of object 2, v₁f = Final velocity of object 1, v₂f = Final velocity of object 2"
        />

        <h3>Understanding Each Component:</h3>
        <SEOList items={[
          '<strong>Initial Momentum:</strong> The total momentum before collision, calculated as m₁v₁ᵢ + m₂v₂ᵢ. This represents the combined momentum of both objects moving before they interact.',
          '<strong>Final Momentum:</strong> The total momentum after collision, calculated as m₁v₁f + m₂v₂f. This represents the combined momentum of both objects after they interact.',
          '<strong>Conservation Principle:</strong> In a closed system with no external forces, initial momentum equals final momentum. This means the total momentum is constant throughout the collision.',
          '<strong>Mass (m):</strong> The amount of matter in each object, measured in kilograms, grams, pounds, or ounces. Mass is a scalar quantity and is always positive.',
          '<strong>Velocity (v):</strong> The speed and direction of each object, measured in m/s, km/h, mph, or ft/s. Velocity is a vector quantity, so positive values indicate one direction and negative values indicate the opposite direction.',
          '<strong>Direction Matters:</strong> Since velocity includes direction, positive and negative velocities represent motion in opposite directions. For one-dimensional collisions, this is crucial for accurate calculations.',
          '<strong>Closed System Requirement:</strong> Conservation of momentum applies only when there are no external forces acting on the system. In practical terms, this means the collision happens quickly enough that external forces don\'t significantly affect the momentum during the collision.'
        ]} />

        <h3>Rearranging the Formula:</h3>
        <p>
          You can rearrange the conservation of momentum formula to solve for any unknown variable:
        </p>
        <ul className="space-y-2 mt-3 font-mono text-sm bg-gray-50 p-4 rounded-lg">
          <li>• Final Velocity 1: v₁f = (m₁v₁ᵢ + m₂v₂ᵢ - m₂v₂f) / m₁</li>
          <li>• Final Velocity 2: v₂f = (m₁v₁ᵢ + m₂v₂ᵢ - m₁v₁f) / m₂</li>
          <li>• Mass 1: m₁ = m₂(v₂f - v₂ᵢ) / (v₁ᵢ - v₁f)</li>
          <li>• Mass 2: m₂ = m₁(v₁ᵢ - v₁f) / (v₂f - v₂ᵢ)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Elastic vs. Inelastic Collisions">
        <p>
          The conservation of momentum applies to both elastic and inelastic collisions, but they differ in energy conservation:
        </p>
        <SEOList items={[
          '<strong>Elastic Collisions:</strong> Both momentum and kinetic energy are conserved. Objects bounce off each other, and kinetic energy is fully preserved. Perfect elastic collisions are idealized but approximate some real collisions (like billiard balls or atomic collisions).',
          '<strong>Inelastic Collisions:</strong> Momentum is conserved, but kinetic energy is not. Some kinetic energy is lost to heat, sound, or deformation. Objects may stick together (perfectly inelastic) or bounce with energy loss. Most real-world collisions are inelastic.',
          '<strong>Perfectly Inelastic Collisions:</strong> A special case where objects stick together after collision, moving with the same final velocity. The equation becomes: m₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v_f, where v_f is the common final velocity.',
          '<strong>Momentum Conservation:</strong> Regardless of collision type (elastic or inelastic), momentum is always conserved in the absence of external forces. Our calculator uses this principle.',
          '<strong>Energy Considerations:</strong> To fully analyze elastic collisions, you also need conservation of kinetic energy. Our calculator focuses on momentum conservation, which applies to all collision types.',
          '<strong>Real-World Applications:</strong> Most collisions in daily life are inelastic (car crashes, sports impacts), but momentum conservation still applies and is essential for analyzing the outcomes.'
        ]} />
      </SEOSection>

      <SEOSection title="Example Calculations: Conservation of Momentum">
        <p>
          Here are practical examples demonstrating conservation of momentum:
        </p>

        <h3>Example 1: Calculating Final Velocities - Elastic Collision</h3>
        <p>Two objects collide: Object 1 (2 kg) moving at 5 m/s and Object 2 (3 kg) moving at -2 m/s. After collision, Object 1 moves at 1 m/s. What is the final velocity of Object 2?</p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
          Conservation: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f<br />
          Initial momentum: 2×5 + 3×(-2) = 10 - 6 = 4 kg·m/s<br />
          Final momentum: 2×1 + 3×v₂f = 2 + 3v₂f<br />
          4 = 2 + 3v₂f<br />
          v₂f = (4 - 2) / 3 = 0.67 m/s<br />
          <span className="text-gray-600">Object 2 moves at 0.67 m/s after collision</span>
        </div>

        <h3>Example 2: Perfectly Inelastic Collision</h3>
        <p>A 1000 kg car moving at 20 m/s collides with a 1500 kg stationary truck. They stick together. What is their final velocity?</p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
          Conservation: m₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v_f<br />
          Initial momentum: 1000×20 + 1500×0 = 20,000 kg·m/s<br />
          Final momentum: (1000 + 1500)×v_f = 2500×v_f<br />
          20,000 = 2500×v_f<br />
          v_f = 8 m/s<br />
          <span className="text-gray-600">Both vehicles move together at 8 m/s</span>
        </div>

        <h3>Example 3: Calculating Mass</h3>
        <p>Object 1 (5 kg) moving at 10 m/s collides with Object 2. After collision, Object 1 moves at 6 m/s and Object 2 moves at 8 m/s. Object 2 was initially at rest. What is the mass of Object 2?</p>
        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
          Conservation: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f<br />
          Initial momentum: 5×10 + m₂×0 = 50 kg·m/s<br />
          Final momentum: 5×6 + m₂×8 = 30 + 8m₂<br />
          50 = 30 + 8m₂<br />
          m₂ = (50 - 30) / 8 = 2.5 kg<br />
          <span className="text-gray-600">Object 2 has a mass of 2.5 kg</span>
        </div>
      </SEOSection>

      <SEOSection title="Real-World Applications of Conservation of Momentum">
        <p>
          Conservation of momentum is fundamental in numerous applications:
        </p>
        <SEOList items={[
          '<strong>Automotive Safety:</strong> Analyzing car crashes and designing safety features. Understanding how vehicles interact during collisions helps improve crashworthiness and airbag systems.',
          '<strong>Sports Physics:</strong> Analyzing impacts in football, hockey, and other contact sports. Understanding momentum transfer helps design protective equipment and analyze player collisions.',
          '<strong>Rocket Propulsion:</strong> Rocket engines work by expelling mass backward, creating forward momentum. The conservation of momentum explains how rockets accelerate in space.',
          '<strong>Particle Physics:</strong> Analyzing collisions in particle accelerators. Conservation of momentum helps identify unknown particles and understand fundamental interactions.',
          '<strong>Billard and Pool:</strong> Calculating ball trajectories after collisions. Players use momentum conservation intuitively when planning shots.',
          '<strong>Astrophysics:</strong> Analyzing collisions between celestial objects, galaxy mergers, and the formation of planetary systems.',
          '<strong>Explosions:</strong> When objects explode, the total momentum before and after must be equal. This explains why fragments fly in opposite directions.',
          '<strong>Ballistics:</strong> Analyzing bullet impacts and projectile motion. Conservation of momentum explains recoil and impact effects.',
          '<strong>Engineering Design:</strong> Designing systems that involve impacts, collisions, or momentum transfer, such as cranes, elevators, and conveyor systems.',
          '<strong>Physics Education:</strong> Teaching fundamental concepts of mechanics, collisions, and conservation laws in academic settings.'
        ]} />
      </SEOSection>

      <SEOSection title="Key Concepts and Important Notes">
        <p>
          Understanding these concepts is essential for using conservation of momentum correctly:
        </p>
        <SEOList items={[
          '<strong>Closed System:</strong> Conservation of momentum applies only when no external forces act on the system. If external forces (like friction, gravity, or applied forces) are significant, momentum is not conserved.',
          '<strong>Vector Nature:</strong> Momentum is a vector quantity, so direction matters. In one-dimensional problems, use positive and negative values. In two or three dimensions, use vector components.',
          '<strong>Impulse and Momentum:</strong> The change in momentum equals the impulse applied (F × Δt). External forces change momentum through impulse, which is why conservation requires no external forces.',
          '<strong>Mass in Motion:</strong> Momentum is mass times velocity, so heavier objects or faster-moving objects have more momentum. A small fast object can have the same momentum as a large slow object.',
          '<strong>Conservation vs. Energy:</strong> Momentum is always conserved in collisions (if no external forces), but kinetic energy may not be. Inelastic collisions conserve momentum but lose kinetic energy.',
          '<strong>Negative Velocities:</strong> Negative velocities represent motion in the opposite direction. When solving problems, be consistent with your coordinate system (which direction is positive).',
          '<strong>Stationary Objects:</strong> If an object is initially at rest, its initial velocity is zero. This simplifies calculations but doesn\'t change the fundamental principle.',
          '<strong>Multiple Objects:</strong> Conservation of momentum extends to systems with more than two objects: Σ(mᵢvᵢ_initial) = Σ(mᵢvᵢ_final) for all objects in the system.'
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is conservation of momentum?",
            answer: "Conservation of momentum is a fundamental physics principle stating that in a closed system with no external forces, the total momentum before a collision equals the total momentum after the collision. Mathematically: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f. Momentum (mass × velocity) is conserved in all collisions when no external forces act on the system."
          },
          {
            question: "What is the conservation of momentum formula?",
            answer: "The conservation of momentum formula for two objects is: m₁v₁ᵢ + m₂v₂ᵢ = m₁v₁f + m₂v₂f, where m is mass, v is velocity, subscripts 1 and 2 indicate the objects, and subscripts i and f indicate initial and final states. This equation states that total momentum before collision equals total momentum after collision."
          },
          {
            question: "Does conservation of momentum apply to inelastic collisions?",
            answer: "Yes! Conservation of momentum applies to both elastic and inelastic collisions. The difference is that elastic collisions also conserve kinetic energy, while inelastic collisions lose kinetic energy to heat, sound, or deformation. However, momentum is always conserved when no external forces act on the system."
          },
          {
            question: "How do you calculate final velocity using conservation of momentum?",
            answer: "To calculate a final velocity, rearrange the conservation equation. For v₁f: v₁f = (m₁v₁ᵢ + m₂v₂ᵢ - m₂v₂f) / m₁. For v₂f: v₂f = (m₁v₁ᵢ + m₂v₂ᵢ - m₁v₁f) / m₂. You need to know both masses, both initial velocities, and one final velocity to calculate the other."
          },
          {
            question: "What is the difference between elastic and inelastic collisions?",
            answer: "Elastic collisions conserve both momentum and kinetic energy - objects bounce off each other with no energy loss. Inelastic collisions conserve momentum but lose kinetic energy - objects may stick together or bounce with energy loss. Most real-world collisions are inelastic. Our calculator works for both types using momentum conservation."
          },
          {
            question: "Can you use conservation of momentum to find mass?",
            answer: "Yes! If you know all velocities (initial and final) and one mass, you can calculate the other mass using conservation of momentum. For mass 1: m₁ = m₂(v₂f - v₂ᵢ) / (v₁ᵢ - v₁f). For mass 2: m₂ = m₁(v₁ᵢ - v₁f) / (v₂f - v₂ᵢ). This requires knowing how velocities change during the collision."
          },
          {
            question: "What is a perfectly inelastic collision?",
            answer: "A perfectly inelastic collision is one where objects stick together after collision, moving with the same final velocity. The conservation equation becomes: m₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v_f, where v_f is the common final velocity. Examples include collisions where objects become embedded in each other."
          },
          {
            question: "Why is momentum conserved in collisions?",
            answer: "Momentum is conserved because of Newton's third law (action-reaction) and the absence of external forces. When two objects collide, they exert equal and opposite forces on each other for the same time, resulting in equal and opposite momentum changes. The total momentum change is zero, so total momentum is constant."
          },
          {
            question: "What happens to momentum in an explosion?",
            answer: "Momentum is still conserved in explosions! Before explosion, total momentum is zero (if the object was at rest). After explosion, fragments fly in all directions, but their vector sum still equals zero. This is why fragments move in opposite directions with momenta that cancel out. Our calculator can analyze such scenarios."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Conservation of momentum is a fundamental principle in physics that applies to all collisions and interactions in closed systems. Our Conservation of Momentum Calculator provides a powerful tool for analyzing collisions, calculating final velocities, determining masses, and understanding the behavior of interacting objects.
        </p>
        <p>
          By supporting multiple calculation modes with comprehensive unit conversions and detailed step-by-step solutions, this calculator empowers users to solve momentum problems regardless of which variables are known. For related calculations, explore our {createInternalLink('velocity-calculator')} for velocity calculations or our {createInternalLink('net-force-calculator')} for force analysis in mechanics problems.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

