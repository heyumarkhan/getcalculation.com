import WorkCalculator from '../../../_components/calculators/WorkCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function WorkCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Work Calculator: Calculate Work, Force & Distance (W = F × d)"
      description="Calculate work, force, or distance using W = F × d × cos(θ). Free online physics calculator for mechanics with unit conversions."
      calculator={<WorkCalculator />}
      slug="physics/work-calculator"
      category="Mechanics"
      features={[
        "Calculate work from force and distance",
        "Calculate force from work and distance",
        "Calculate distance from work and force",
        "Angle adjustment for force direction",
        "Comprehensive unit conversion support",
        "Step-by-step calculation display",
        "Multiple energy unit formats",
        "Mobile-friendly interface",
        "Free to use always"
      ]}
    >
      <SEOSection title="Work Calculator: Calculate Work in Physics (W = F × d)">
        <p>
          Work is a fundamental concept in physics that measures the energy transferred by a force acting over a distance. Understanding how to calculate work is essential for physics students, engineers, and anyone studying mechanics. Our Work Calculator makes it simple to compute work, force, or distance using the work-energy theorem: <strong>W = F × d × cos(θ)</strong>.
        </p>
        <p>
          In physics, work occurs when a force causes an object to move in the direction of that force. Whether you&apos;re analyzing mechanical systems, calculating energy transfer, or solving physics problems, our calculator provides instant results with comprehensive unit support.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Work in Physics">
        <p>
          Work is defined as the product of force and displacement when the force is applied in the direction of motion. The fundamental equation is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">W = F × d × cos(θ)</p>
          <p className="text-sm text-gray-600 mt-2">Where: W = Work, F = Force, d = Distance, θ = Angle between force and displacement</p>
        </div>

        <h3>Key Concepts in Work Calculations</h3>
        <ul>
          <li><strong>Work (W):</strong> Energy transferred by force, measured in Joules (J)</li>
          <li><strong>Force (F):</strong> Push or pull applied to an object, measured in Newtons (N)</li>
          <li><strong>Distance (d):</strong> Displacement of the object, measured in meters (m)</li>
          <li><strong>Angle (θ):</strong> Angle between force direction and displacement direction</li>
          <li><strong>Positive Work:</strong> Force and displacement in same direction (0° to 90°)</li>
          <li><strong>Negative Work:</strong> Force and displacement in opposite directions (90° to 180°)</li>
          <li><strong>Zero Work:</strong> Force perpendicular to displacement (90°)</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use Our Work Calculator">
        <p>
          Using our calculator is straightforward and requires just a few simple steps:
        </p>
        <ol>
          <li><strong>Enter Values:</strong> Input any two of the three variables (Force, Distance, or Work)</li>
          <li><strong>Select Units:</strong> Choose appropriate units from the dropdown menus</li>
          <li><strong>Set Angle:</strong> Enter the angle between force and displacement (default: 0°)</li>
          <li><strong>Calculate:</strong> Click the Calculate button for instant results</li>
          <li><strong>View Results:</strong> Get the calculated value with step-by-step breakdown</li>
        </ol>
      </SEOSection>

      <SEOSection title="Work Formula Explained">
        <p>
          The work formula combines three essential physics quantities:
        </p>
        <h3>W = F × d × cos(θ)</h3>
        <ul>
          <li><strong>F (Force):</strong> The magnitude of the applied force in Newtons</li>
          <li><strong>d (Distance):</strong> The displacement in the direction of force</li>
          <li><strong>cos(θ):</strong> Accounts for the angle between force and displacement</li>
        </ul>

        <h3>Understanding the Cosine Factor</h3>
        <ul>
          <li><strong>cos(0°) = 1:</strong> Maximum work (force parallel to motion)</li>
          <li><strong>cos(45°) = 0.707:</strong> Force at 45° angle</li>
          <li><strong>cos(90°) = 0:</strong> Zero work (force perpendicular to motion)</li>
          <li><strong>cos(180°) = -1:</strong> Negative work (force opposes motion)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Work Units and Conversions">
        <p>
          Work is energy measured in various units. The SI unit is the Joule (J), but work can be expressed in many other formats:
        </p>
        <ul>
          <li><strong>Joule (J):</strong> SI unit, 1 J = 1 N·m</li>
          <li><strong>Kilojoule (kJ):</strong> 1,000 Joules</li>
          <li><strong>Calorie (cal):</strong> Traditional energy unit, 1 cal ≈ 4.184 J</li>
          <li><strong>Kilocalorie (kcal):</strong> Dietary unit, 1 kcal = 1,000 cal</li>
          <li><strong>Watt-hour (Wh):</strong> Electrical energy unit, 1 Wh = 3,600 J</li>
          <li><strong>Kilowatt-hour (kWh):</strong> Large energy unit, 1 kWh = 3,600,000 J</li>
          <li><strong>Foot-pound (ft·lb):</strong> Imperial unit, 1 ft·lb ≈ 1.356 J</li>
          <li><strong>Electron volt (eV):</strong> Atomic-scale unit, 1 eV ≈ 1.602 × 10⁻¹⁹ J</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Work Examples">
        <h3>Example 1: Lifting a Weight</h3>
        <p>
          You lift a 10 kg box vertically by 2 meters. Calculate the work done:
        </p>
        <ul>
          <li>Force = mass × gravity = 10 kg × 9.8 m/s² = 98 N</li>
          <li>Distance = 2 m (vertical displacement)</li>
          <li>Angle = 0° (force parallel to motion)</li>
          <li>Work = 98 N × 2 m × cos(0°) = 196 J</li>
        </ul>

        <h3>Example 2: Pushing with Angle</h3>
        <p>
          You push a box with 50 N force at 30° angle for 5 meters:
        </p>
        <ul>
          <li>Force = 50 N</li>
          <li>Distance = 5 m</li>
          <li>Angle = 30°</li>
          <li>Work = 50 N × 5 m × cos(30°) = 50 × 5 × 0.866 ≈ 216.5 J</li>
        </ul>

        <h3>Example 3: Carrying Horizontally</h3>
        <p>
          You carry a box at waist height while walking 10 meters (no vertical lift):
        </p>
        <ul>
          <li>Force = weight of box (acting downward)</li>
          <li>Distance = 10 m (horizontal displacement)</li>
          <li>Angle = 90° (force perpendicular to motion)</li>
          <li>Work = F × 10 × cos(90°) = 0 J (no work done)</li>
        </ul>

        <h3>Example 4: Pulling a Suitcase</h3>
        <p>
          You pull a suitcase with 100 N force at 25° angle for 20 meters:
        </p>
        <ul>
          <li>Force = 100 N</li>
          <li>Distance = 20 m</li>
          <li>Angle = 25°</li>
          <li>Work = 100 N × 20 m × cos(25°) = 100 × 20 × 0.906 ≈ 1,812 J</li>
        </ul>
      </SEOSection>

      <SEOSection title="Applications of Work Calculations">
        <h3>Mechanical Engineering (Work)</h3>
        <p>
          Engineers use work calculations to design machines, calculate power requirements, and analyze energy efficiency in mechanical systems.
        </p>

        <h3>Physics Education</h3>
        <p>
          Students learn work-energy theorems to understand motion, energy conservation, and forces in classical mechanics courses.
        </p>

        <h3>Energy Analysis</h3>
        <p>
          Work calculations are fundamental to analyzing power consumption, determining energy transfer rates, and optimizing system performance.
        </p>

        <h3>Ergonomics and Physiology</h3>
        <p>
          Researchers calculate work done by muscles to understand human biomechanics, exercise physiology, and occupational health.
        </p>

        <h3>Construction and Infrastructure</h3>
        <p>
          Construction professionals calculate work to determine equipment requirements, estimate labor productivity, and plan resource allocation.
        </p>
      </SEOSection>

      <SEOSection title="Relationship Between Work and Energy">
        <p>
          Work and energy are intimately connected in physics. The work-energy theorem states that net work done on an object equals its change in kinetic energy:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">W_net = ΔKE = ½m(v_f² - v_i²)</p>
        </div>
        <p>
          This fundamental principle links mechanical work to observable changes in motion, making it essential for solving complex physics problems.
        </p>
      </SEOSection>

      <SEOSection title="Common Mistakes in Work Calculations">
        <ul>
          <li><strong>Ignoring the Angle:</strong> Forgetting to include cos(θ) leads to incorrect results</li>
          <li><strong>Unit Mismatch:</strong> Mixing different unit systems without conversion causes errors</li>
          <li><strong>Perpendicular Forces:</strong> Not recognizing that perpendicular forces do zero work</li>
          <li><strong>Negative Work:</strong> Forgetting that friction and opposing forces produce negative work</li>
          <li><strong>Distance vs. Displacement:</strong> Using distance instead of actual displacement vector</li>
          <li><strong>Constant Force Assumption:</strong> Assuming constant force when it varies along the path</li>
        </ul>
      </SEOSection>

      <SEOSection title="Work vs. Power vs. Energy">
        <p>
          These related but distinct physics concepts are often confused:
        </p>
        <ul>
          <li><strong>Work (W):</strong> Energy transferred by force over distance (Joules)</li>
          <li><strong>Power (P):</strong> Rate of work done per unit time (Watts = J/s)</li>
          <li><strong>Energy (E):</strong> Capacity to do work (Joules)</li>
          <li><strong>Relationship:</strong> Power = Work ÷ Time, or P = W/t</li>
        </ul>
      </SEOSection>

      <SEOSection title="Work in Different Scenarios">
        <h3>Positive Work</h3>
        <p>
          Work is positive when force and displacement are in the same direction. Examples: lifting an object, pushing a car forward, stretching a spring.
        </p>

        <h3>Negative Work</h3>
        <p>
          Work is negative when force opposes displacement. Examples: friction slowing a moving object, gravity pulling down while climbing, air resistance.
        </p>

        <h3>Zero Work</h3>
        <p>
          Work is zero when force is perpendicular to displacement. Examples: carrying weight horizontally, orbiting satellites, circular motion at constant speed.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between work and power?",
            answer: "Work is the total energy transferred by a force (W = F × d), measured in Joules. Power is the rate at which work is done (P = W/t), measured in Watts. You can do the same amount of work quickly (high power) or slowly (low power)."
          },
          {
            question: "Why do we use cos(θ) in the work formula?",
            answer: "The cosine factor accounts for the angle between the force direction and the direction of motion. Only the component of force in the direction of motion contributes to work. cos(θ) gives us this component: F_parallel = F × cos(θ)."
          },
          {
            question: "Can work be negative?",
            answer: "Yes! Work is negative when force opposes displacement (angle between 90° and 180°). For example, friction does negative work on a moving object by slowing it down. Negative work removes energy from the system."
          },
          {
            question: "Is work the same as energy?",
            answer: "No, work and energy are related but different. Work is the process of energy transfer. Energy is the capacity to do work. When work is done on an object, its energy changes. The work-energy theorem states: W_net = ΔKE."
          },
          {
            question: "What are typical work units used in engineering?",
            answer: "The SI unit is Joules (J). In mechanical systems: foot-pounds (ft·lb). In electrical systems: Watt-hours (Wh) or Kilowatt-hours (kWh). In chemistry: calories (cal). Engineering applications often require unit conversion between these systems."
          },
          {
            question: "How does work relate to force and distance?",
            answer: "Work is directly proportional to both force and distance. Double the force or distance, and you double the work done. However, if force is perpendicular to displacement, work becomes zero regardless of magnitudes."
          },
          {
            question: "Can an object do work even if it doesn't move?",
            answer: "No. Work requires both force and displacement. If an object doesn't move (d = 0), no work is done, even if you apply force. This is why holding a heavy weight stationary does zero work, even though it requires effort."
          },
          {
            question: "What does the work-energy theorem state?",
            answer: "The work-energy theorem states that the net work done on an object equals its change in kinetic energy: W_net = ΔKE = ½m(v_f² - v_i²). This principle connects mechanical work to changes in motion."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Work is a fundamental concept in physics that describes energy transfer through force and displacement. Our Work Calculator simplifies these calculations, allowing you to instantly determine work, force, or distance values for various scenarios.
        </p>
        <p>
          Whether you&apos;re studying mechanics, solving engineering problems, or analyzing physical systems, understanding and calculating work accurately is essential for success.
        </p>
        <p>
          Ready to explore related physics concepts? Check out our {createInternalLink('force-calculator', 'Force Calculator')} for Newton&apos;s laws, {createInternalLink('kinetic-energy-calculator', 'Kinetic Energy Calculator')} for motion analysis, or {createInternalLink('power-to-weight-ratio-calculator', 'Power Calculator')} for energy rate calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
