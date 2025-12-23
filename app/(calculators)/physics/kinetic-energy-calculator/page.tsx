import KineticEnergyCalculator from '../../../_components/calculators/KineticEnergyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function KineticEnergyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Kinetic Energy Calculator: Calculate KE = ½mv² Instantly"
      description="Calculate kinetic energy, mass, or velocity using KE = ½mv². Free online mechanics calculator for physics and engineering with multiple unit support and step-by-step solutions."
      calculator={<KineticEnergyCalculator />}
      slug="physics/kinetic-energy-calculator"
      category="Mechanics"
      features={[
        "Calculate kinetic energy, mass, or velocity",
        "KE = ½mv² formula",
        "Multiple unit support (J, cal, BTU, kg, lb, m/s, mph, km/h, etc.)",
        "Automatic unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Kinetic Energy: Energy of Motion">
        <p>
          Kinetic energy is one of the most fundamental concepts in physics, representing the energy an object possesses due to its motion. Whether you&apos;re studying mechanics, engineering, collisions, or understanding how energy transforms, knowing how to calculate kinetic energy is essential. Our Kinetic Energy Calculator makes it easy to calculate kinetic energy, mass, or velocity using the fundamental formula: <strong>KE = ½mv²</strong>.
        </p>
        <p>
          Kinetic energy depends on both an object&apos;s mass and its velocity squared. This means that doubling an object&apos;s speed increases its kinetic energy by four times, making velocity a crucial factor in energy calculations. Understanding kinetic energy is essential for analyzing motion, collisions, work-energy relationships, and countless engineering applications from vehicle safety to sports physics.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Kinetic Energy Calculator">
        <p>
          Our Kinetic Energy Calculator is designed for simplicity and accuracy. Follow these steps:
        </p>
        <ol>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (kinetic energy, mass, or velocity)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with automatic unit conversion</li>
        </ol>
        <p>
          The calculator uses the fundamental kinetic energy formula: <strong>KE = ½ × m × v²</strong>
        </p>
        <p>
          You can rearrange this formula to solve for any variable:
        </p>
        <ul>
          <li><strong>Kinetic Energy:</strong> KE = ½ × m × v²</li>
          <li><strong>Mass:</strong> m = 2KE / v²</li>
          <li><strong>Velocity:</strong> v = √(2KE / m)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Understanding the Kinetic Energy Formula">
        <p>
          The kinetic energy formula is one of the most important equations in mechanics:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">KE = ½ × m × v²</p>
          <p className="text-sm text-gray-600 mt-2">Where: KE = kinetic energy, m = mass, v = velocity</p>
        </div>
        
        <h3>What is Kinetic Energy?</h3>
        <p>
          Kinetic energy is the energy an object possesses due to its motion. It&apos;s a scalar quantity (magnitude only, no direction) that depends on:
        </p>
        <SEOList items={[
          "Mass: The more massive an object, the more kinetic energy it has at the same speed",
          "Velocity squared: Kinetic energy increases with the square of velocity - double the speed, quadruple the energy",
          "Frame of reference: Kinetic energy depends on the observer's frame of reference (it's relative)",
          "Conservation: In elastic collisions, total kinetic energy is conserved",
          "Work-energy theorem: The work done on an object equals its change in kinetic energy"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Kinetic Energy (KE):</strong> The energy of motion, measured in Joules (J), calories (cal), BTUs, or electron-volts (eV). 1 Joule = 1 kg·m²/s².</li>
          <li><strong>Mass (m):</strong> The amount of matter in the object, measured in kilograms (kg) or pounds (lb). Mass is always positive.</li>
          <li><strong>Velocity (v):</strong> The speed of the object in a specific direction, measured in m/s, km/h, mph, or other velocity units. Velocity is squared in the formula, so direction doesn't matter for kinetic energy.</li>
          <li><strong>Velocity Squared:</strong> The quadratic relationship means kinetic energy is very sensitive to velocity changes. This is why speed limits exist - small speed increases cause large energy increases.</li>
        </ul>

        <h3>Why is Velocity Squared?</h3>
        <p>
          The velocity-squared relationship comes from the work-energy theorem. To accelerate an object from rest to velocity v requires work W = ½mv². Since this work is stored as kinetic energy, KE = ½mv². The square means that kinetic energy increases rapidly with speed, which is why high-speed collisions are so destructive.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Kinetic energy calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Vehicle Safety: Calculating impact energy in car crashes, determining braking distances, and designing safety systems",
          "Sports Physics: Analyzing performance in running, cycling, and other sports where speed and mass determine energy",
          "Engineering: Designing machinery, vehicles, and systems where motion and energy transfer are critical",
          "Physics Education: Teaching fundamental mechanics concepts, conservation of energy, and work-energy relationships",
          "Collision Analysis: Understanding energy transfer in elastic and inelastic collisions",
          "Aerospace: Calculating orbital energies, spacecraft velocities, and re-entry dynamics",
          "Industrial Applications: Analyzing moving parts, rotating machinery, and kinetic energy storage systems",
          "Transportation: Optimizing fuel efficiency, understanding braking requirements, and analyzing vehicle dynamics",
          "Particle Physics: Calculating energies of subatomic particles in accelerators and detectors",
          "Energy Storage: Understanding kinetic energy storage systems like flywheels"
        ]} />
      </SEOSection>

      <SEOSection title="Common Kinetic Energy Calculations">
        <h3>Example 1: Car Moving at Highway Speed</h3>
        <p>A car with mass 1,500 kg moves at 30 m/s (108 km/h). Calculate its kinetic energy.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 1,500 kg, v = 30 m/s</p>
          <p className="font-mono">KE = ½ × m × v² = ½ × 1,500 × 30² = ½ × 1,500 × 900 = 675,000 J = 675 kJ</p>
          <p className="text-sm text-gray-600 mt-1">Result: The car has 675,000 Joules (675 kilojoules) of kinetic energy</p>
        </div>

        <h3>Example 2: Calculating Velocity from Energy and Mass</h3>
        <p>A baseball (mass 0.145 kg) is thrown with 50 J of kinetic energy. What is its velocity?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">KE = 50 J, m = 0.145 kg</p>
          <p className="font-mono">v = √(2KE / m) = √(2 × 50 / 0.145) = √(690.0) ≈ 26.3 m/s ≈ 94.7 km/h</p>
          <p className="text-sm text-gray-600 mt-1">Result: The baseball is traveling at approximately 26.3 m/s (94.7 km/h)</p>
        </div>

        <h3>Example 3: Calculating Mass from Energy and Velocity</h3>
        <p>An object moving at 20 m/s has 800 J of kinetic energy. What is its mass?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">KE = 800 J, v = 20 m/s</p>
          <p className="font-mono">m = 2KE / v² = 2 × 800 / 20² = 1,600 / 400 = 4 kg</p>
          <p className="text-sm text-gray-600 mt-1">Result: The object has a mass of 4 kilograms</p>
        </div>

        <h3>Example 4: Comparing Energies at Different Speeds</h3>
        <p>Compare the kinetic energy of a 1,000 kg car at 50 km/h and 100 km/h.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 1,000 kg</p>
          <p className="font-mono">At 50 km/h (13.9 m/s): KE = ½ × 1,000 × 13.9² ≈ 96,600 J ≈ 96.6 kJ</p>
          <p className="font-mono">At 100 km/h (27.8 m/s): KE = ½ × 1,000 × 27.8² ≈ 386,400 J ≈ 386.4 kJ</p>
          <p className="text-sm text-gray-600 mt-1">Result: Doubling the speed quadruples the kinetic energy (386.4 / 96.6 ≈ 4.0)</p>
        </div>

        <h3>Example 5: Bullet Kinetic Energy</h3>
        <p>A bullet with mass 0.01 kg (10 grams) travels at 400 m/s. Calculate its kinetic energy.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 0.01 kg, v = 400 m/s</p>
          <p className="font-mono">KE = ½ × 0.01 × 400² = ½ × 0.01 × 160,000 = 800 J</p>
          <p className="text-sm text-gray-600 mt-1">Result: The bullet has 800 Joules of kinetic energy, demonstrating why high-velocity objects are dangerous</p>
        </div>
      </SEOSection>

      <SEOSection title="Kinetic Energy vs. Potential Energy">
        <p>
          Understanding the relationship between kinetic and potential energy is crucial:
        </p>
        <ul>
          <li><strong>Kinetic Energy (KE):</strong> Energy of motion, KE = ½mv². Depends on mass and velocity.</li>
          <li><strong>Potential Energy (PE):</strong> Stored energy due to position, PE = mgh. Depends on mass, gravity, and height.</li>
          <li><strong>Total Mechanical Energy:</strong> E = KE + PE. In conservative systems, total energy is conserved.</li>
          <li><strong>Energy Conversion:</strong> As an object falls, potential energy converts to kinetic energy. At the bottom, all energy is kinetic.</li>
          <li><strong>Energy Conservation:</strong> In ideal systems with no friction, the sum of kinetic and potential energy remains constant.</li>
        </ul>
        <p>
          For example, when you drop a ball, it starts with maximum potential energy and zero kinetic energy. As it falls, potential energy decreases while kinetic energy increases. When it hits the ground, potential energy is zero and kinetic energy is maximum.
        </p>
      </SEOSection>

      <SEOSection title="Velocity-Squared Relationship: Why Speed Matters">
        <p>
          The velocity-squared relationship in kinetic energy has profound implications:
        </p>
        <ul>
          <li><strong>Doubling Speed:</strong> Doubling velocity quadruples kinetic energy (2² = 4)</li>
          <li><strong>Tripling Speed:</strong> Tripling velocity increases kinetic energy by 9 times (3² = 9)</li>
          <li><strong>Safety Implications:</strong> Small speed increases cause large energy increases, making high-speed accidents much more dangerous</li>
          <li><strong>Energy Requirements:</strong> It takes 4 times more work (energy) to accelerate an object to double the speed</li>
          <li><strong>Braking Distance:</strong> Stopping distance increases with the square of speed, which is why speed limits exist</li>
        </ul>
        <p>
          This is why speed limits are so important for safety. A car traveling at 60 mph has 4 times the kinetic energy of one traveling at 30 mph, making crashes at higher speeds exponentially more dangerous.
        </p>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Kinetic energy can be expressed in various units depending on the application:
        </p>
        
        <h3>Energy Units</h3>
        <ul>
          <li><strong>Joules (J):</strong> SI unit, 1 J = 1 kg·m²/s². Most common in physics and engineering.</li>
          <li><strong>Kilojoules (kJ):</strong> 1,000 J. Used for larger energy values like vehicle kinetic energy.</li>
          <li><strong>Calories (cal):</strong> 1 cal = 4.184 J. Often used in chemistry and nutrition.</li>
          <li><strong>Kilocalories (kcal):</strong> 1,000 cal = 4,184 J. Food energy is measured in kilocalories.</li>
          <li><strong>BTU:</strong> British Thermal Unit, 1 BTU ≈ 1,055 J. Used in heating and cooling.</li>
          <li><strong>Electron-volts (eV):</strong> 1 eV ≈ 1.602×10⁻¹⁹ J. Used in particle physics and atomic physics.</li>
        </ul>

        <h3>Common Conversions</h3>
        <ul>
          <li>1 kJ = 1,000 J</li>
          <li>1 cal = 4.184 J</li>
          <li>1 kcal = 4,184 J</li>
          <li>1 BTU ≈ 1,055 J</li>
          <li>1 eV ≈ 1.602×10⁻¹⁹ J</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is kinetic energy and how is it calculated?",
            answer: "Kinetic energy is the energy an object possesses due to its motion. It's calculated using the formula KE = ½mv², where m is mass and v is velocity. The energy increases with mass and with the square of velocity, meaning doubling speed quadruples kinetic energy."
          },
          {
            question: "Why is velocity squared in the kinetic energy formula?",
            answer: "Velocity is squared because kinetic energy comes from the work done to accelerate an object. The work-energy theorem shows that work W = ½mv² equals kinetic energy. This quadratic relationship means small speed increases cause large energy increases, which is why high-speed collisions are so dangerous."
          },
          {
            question: "Can kinetic energy be negative?",
            answer: "No, kinetic energy cannot be negative. Since it depends on v² (which is always positive) and mass (which is always positive), kinetic energy is always positive or zero. An object at rest has zero kinetic energy, but moving objects always have positive kinetic energy."
          },
          {
            question: "What is the relationship between kinetic and potential energy?",
            answer: "Kinetic energy (KE = ½mv²) is energy of motion, while potential energy (PE = mgh) is stored energy. In conservative systems, total mechanical energy (KE + PE) is conserved. As an object falls, potential energy converts to kinetic energy, with total energy remaining constant (ignoring friction)."
          },
          {
            question: "How does mass affect kinetic energy?",
            answer: "Kinetic energy is directly proportional to mass. At the same velocity, doubling the mass doubles the kinetic energy. However, velocity has a much larger effect since it's squared - doubling velocity quadruples energy while doubling mass only doubles it."
          },
          {
            question: "What happens to kinetic energy in a collision?",
            answer: "In elastic collisions, total kinetic energy is conserved (no energy lost). In inelastic collisions, some kinetic energy is converted to other forms (heat, sound, deformation). In perfectly inelastic collisions, objects stick together and maximum kinetic energy is lost."
          },
          {
            question: "Why is kinetic energy important in vehicle safety?",
            answer: "Kinetic energy determines impact severity in crashes. Since KE = ½mv², high-speed collisions have exponentially more energy. A car at 60 mph has 4 times the energy of one at 30 mph, making high-speed crashes much more dangerous. This is why speed limits and braking distance requirements exist."
          },
          {
            question: "What are common units for kinetic energy?",
            answer: "The SI unit is Joules (J), where 1 J = 1 kg·m²/s². Larger values use kilojoules (kJ = 1,000 J). Other common units include calories (cal = 4.184 J), kilocalories (kcal), BTUs (≈1,055 J), and electron-volts (eV ≈ 1.602×10⁻¹⁹ J) for atomic physics."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding kinetic energy and the formula KE = ½mv² is fundamental to mechanics, engineering, and physics. Our Kinetic Energy Calculator simplifies these calculations, making it easy to determine kinetic energy, mass, or velocity with support for multiple unit systems.
        </p>
        <p>
          Whether you&apos;re analyzing vehicle collisions, understanding energy conservation, calculating particle energies, or solving physics problems, accurate kinetic energy calculations are essential. Ready to explore more energy concepts? Check out our other calculators like the {createInternalLink('potential-energy-calculator', 'Potential Energy Calculator')} for calculating stored energy, the {createInternalLink('velocity-calculator', 'Velocity Calculator')} for velocity calculations, or the {createInternalLink('force-calculator', 'Force Calculator')} for force calculations that often complement kinetic energy analysis in mechanics problems.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

