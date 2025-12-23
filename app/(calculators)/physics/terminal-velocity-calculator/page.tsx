import TerminalVelocityCalculator from '../../../_components/calculators/TerminalVelocityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function TerminalVelocityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Terminal Velocity Calculator: Calculate Terminal Velocity from Mass, Area & Drag"
      description="Calculate terminal velocity, mass, cross-sectional area, or drag coefficient using v = √(2mg/(ρAC_d)). Free online fluid mechanics calculator for physics and engineering with drag force calculations."
      calculator={<TerminalVelocityCalculator />}
      slug="physics/terminal-velocity-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate terminal velocity from mass, area, and drag coefficient",
        "Calculate mass, area, or drag coefficient from terminal velocity",
        "Standard gravity (9.80665 m/s²) and air density (1.225 kg/m³) options",
        "Multiple unit support (m/s, mph, kg, lb, m², cm², etc.)",
        "Uses drag force equation for accurate calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Terminal Velocity: Maximum Falling Speed in Fluids">
        <p>
          Terminal velocity is a fundamental concept in fluid mechanics and physics, representing the maximum constant velocity reached by an object falling through a fluid (such as air or water) when the drag force equals the gravitational force. Whether you&apos;re studying skydiving physics, analyzing falling objects, understanding drag forces, or designing systems that operate in fluids, knowing how to calculate terminal velocity is essential. Our Terminal Velocity Calculator makes it easy to calculate terminal velocity, mass, cross-sectional area, or drag coefficient using the formula: <strong>v = √(2mg / (ρAC_d))</strong>, where m is mass, g is gravitational acceleration, ρ is fluid density, A is cross-sectional area, and C_d is the drag coefficient.
        </p>
        <p>
          Terminal velocity occurs when the upward drag force exactly balances the downward gravitational force, resulting in zero net force and constant velocity. This equilibrium condition is crucial for understanding falling objects, parachute design, skydiving physics, and any scenario where objects move through fluids.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Terminal Velocity Calculator">
        <p>
          Our Terminal Velocity Calculator offers four calculation modes. Follow these steps:
        </p>
        
        <h3>Mode 1: Calculate Terminal Velocity</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Terminal Velocity (v)&quot; from the dropdown</li>
          <li><strong>Enter Mass:</strong> Input the mass of the falling object</li>
          <li><strong>Enter Cross-Sectional Area:</strong> Input the area perpendicular to the direction of fall</li>
          <li><strong>Enter Drag Coefficient:</strong> Input the drag coefficient (0.47 for sphere, 0.82 for skydiver, etc.)</li>
          <li><strong>Set Gravity and Density:</strong> Use standard values or enter custom values</li>
          <li><strong>Click Calculate:</strong> The calculator shows the terminal velocity</li>
        </ol>

        <h3>Mode 2: Calculate Mass</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Mass (m)&quot; from the dropdown</li>
          <li><strong>Enter Terminal Velocity:</strong> Input the known terminal velocity</li>
          <li><strong>Enter Area and Drag Coefficient:</strong> Input cross-sectional area and drag coefficient</li>
          <li><strong>Click Calculate:</strong> The calculator shows the required mass</li>
        </ol>

        <h3>Mode 3: Calculate Cross-Sectional Area</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Cross-Sectional Area (A)&quot; from the dropdown</li>
          <li><strong>Enter Terminal Velocity and Mass:</strong> Input known values</li>
          <li><strong>Enter Drag Coefficient:</strong> Input the drag coefficient</li>
          <li><strong>Click Calculate:</strong> The calculator shows the required area</li>
        </ol>

        <h3>Mode 4: Calculate Drag Coefficient</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Calculate Drag Coefficient (C_d)&quot; from the dropdown</li>
          <li><strong>Enter Terminal Velocity, Mass, and Area:</strong> Input all known values</li>
          <li><strong>Click Calculate:</strong> The calculator shows the drag coefficient</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding the Terminal Velocity Formula">
        <p>
          Terminal velocity is calculated using the equilibrium condition where drag force equals weight:
        </p>

        <h3>Terminal Velocity Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">v_terminal = √(2mg / (ρAC_d))</p>
          <p className="text-sm text-gray-600 mt-2">Where: m = mass, g = gravity, ρ = fluid density, A = cross-sectional area, C_d = drag coefficient</p>
        </div>

        <h3>Derivation</h3>
        <p>
          Terminal velocity occurs when drag force equals weight:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-sm mb-2">F_drag = F_weight</p>
          <p className="font-mono text-sm mb-2">0.5 × ρ × v² × A × C_d = m × g</p>
          <p className="font-mono text-sm mb-2">v² = 2mg / (ρAC_d)</p>
          <p className="font-mono text-sm">v = √(2mg / (ρAC_d))</p>
        </div>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Terminal Velocity (v):</strong> The maximum constant velocity reached when drag equals weight. Measured in m/s, mph, etc.</li>
          <li><strong>Mass (m):</strong> The mass of the falling object. Heavier objects have higher terminal velocities (assuming same area and drag coefficient).</li>
          <li><strong>Gravitational Acceleration (g):</strong> Typically 9.80665 m/s² on Earth. Can vary on other planets or at different altitudes.</li>
          <li><strong>Fluid Density (ρ):</strong> Density of the fluid through which the object falls. Air density is ~1.225 kg/m³ at sea level, decreases with altitude.</li>
          <li><strong>Cross-Sectional Area (A):</strong> The area perpendicular to the direction of fall. Larger area = more drag = lower terminal velocity.</li>
          <li><strong>Drag Coefficient (C_d):</strong> Dimensionless coefficient depending on object shape. Ranges from ~0.04 (streamlined) to 2+ (blunt objects).</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Terminal velocity calculations are essential in numerous real-world scenarios:
        </p>
        <SEOList items={[
          "Skydiving: Calculating terminal velocities for different body positions, parachute design, and safety analysis",
          "Parachute Design: Determining terminal velocity for safe landing speeds and designing appropriate parachute sizes",
          "Sports Physics: Understanding terminal velocity in skydiving, BASE jumping, and other extreme sports",
          "Aerospace: Analyzing re-entry velocities, space debris behavior, and atmospheric entry dynamics",
          "Meteorology: Understanding raindrop terminal velocities, hail formation, and precipitation dynamics",
          "Engineering: Designing falling objects, air resistance analysis, and fluid dynamics applications",
          "Safety Analysis: Calculating impact speeds for falling objects, safety equipment design, and risk assessment",
          "Physics Education: Teaching drag forces, fluid mechanics, and equilibrium concepts",
          "Environmental Science: Analyzing particle settling, atmospheric transport, and pollution dispersion",
          "Sports Equipment: Designing equipment that falls at specific speeds, analyzing performance in air"
        ]} />
      </SEOSection>

      <SEOSection title="Common Terminal Velocity Calculations">
        <h3>Example 1: Skydiver Terminal Velocity</h3>
        <p>A skydiver (mass 75 kg, area 0.7 m²) falls through air. Calculate terminal velocity with drag coefficient 0.82.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 75 kg, A = 0.7 m², C_d = 0.82, g = 9.80665 m/s², ρ = 1.225 kg/m³</p>
          <p className="font-mono">v = √(2mg / (ρAC_d)) = √(2 × 75 × 9.80665 / (1.225 × 0.7 × 0.82))</p>
          <p className="font-mono">v = √(1470.998 / 0.7028) = √(2093.7) ≈ 45.8 m/s ≈ 165 km/h ≈ 102 mph</p>
          <p className="text-sm text-gray-600 mt-1">Result: Terminal velocity is approximately 45.8 m/s (165 km/h or 102 mph)</p>
        </div>

        <h3>Example 2: Raindrop Terminal Velocity</h3>
        <p>A large raindrop (mass 0.005 kg, diameter 4 mm) falls through air. Calculate terminal velocity (C_d ≈ 0.47 for sphere).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 0.005 kg, D = 4 mm = 0.004 m, C_d = 0.47</p>
          <p className="font-mono">A = π × (D/2)² = π × 0.000004 = 0.00001257 m²</p>
          <p className="font-mono">v = √(2 × 0.005 × 9.80665 / (1.225 × 0.00001257 × 0.47)) ≈ 11.6 m/s</p>
          <p className="text-sm text-gray-600 mt-1">Result: Large raindrop terminal velocity is approximately 11.6 m/s (42 km/h)</p>
        </div>

        <h3>Example 3: Calculating Required Area for Desired Terminal Velocity</h3>
        <p>You want a 80 kg object to reach terminal velocity of 5 m/s. With C_d = 0.82, what area is needed?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 80 kg, v = 5 m/s, C_d = 0.82, g = 9.80665 m/s², ρ = 1.225 kg/m³</p>
          <p className="font-mono">A = (2mg) / (v² × ρ × C_d) = (2 × 80 × 9.80665) / (5² × 1.225 × 0.82)</p>
          <p className="font-mono">A = 1569.06 / 25.11 ≈ 62.5 m²</p>
          <p className="text-sm text-gray-600 mt-1">Result: Required area is approximately 62.5 m² (very large - this is why parachutes are so large!)</p>
        </div>

        <h3>Example 4: Sphere Terminal Velocity</h3>
        <p>A steel ball (mass 0.1 kg, diameter 5 cm) falls through air. Calculate terminal velocity.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = 0.1 kg, D = 5 cm = 0.05 m, C_d = 0.47 (sphere)</p>
          <p className="font-mono">A = π × (0.05/2)² = 0.001963 m²</p>
          <p className="font-mono">v = √(2 × 0.1 × 9.80665 / (1.225 × 0.001963 × 0.47)) ≈ 41.6 m/s</p>
          <p className="text-sm text-gray-600 mt-1">Result: Terminal velocity is approximately 41.6 m/s (150 km/h)</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Drag Coefficient">
        <p>
          The drag coefficient (C_d) is a dimensionless number that depends on the object&apos;s shape and surface characteristics:
        </p>
        <ul>
          <li><strong>Streamlined Objects:</strong> C_d ≈ 0.04 - 0.1 (airfoils, bullets, fish shapes)</li>
          <li><strong>Spheres:</strong> C_d ≈ 0.47 (smooth spheres, raindrops when small)</li>
          <li><strong>Skydiver (Belly Down):</strong> C_d ≈ 0.7 - 0.85 (typical freefall position)</li>
          <li><strong>Skydiver (Head Down):</strong> C_d ≈ 0.3 - 0.4 (more streamlined position)</li>
          <li><strong>Flat Plate (Perpendicular):</strong> C_d ≈ 1.0 - 1.3 (maximum drag orientation)</li>
          <li><strong>Flat Plate (Parallel):</strong> C_d ≈ 0.01 - 0.04 (minimum drag orientation)</li>
          <li><strong>Cylinder (Perpendicular):</strong> C_d ≈ 0.6 - 1.2 (depends on length/diameter ratio)</li>
          <li><strong>Parachute:</strong> C_d ≈ 1.3 - 1.5 (high drag for slow descent)</li>
        </ul>
        <p>
          The drag coefficient varies with Reynolds number, object roughness, and flow conditions. Our calculator uses constant C_d values, which are accurate for typical terminal velocity calculations.
        </p>
      </SEOSection>

      <SEOSection title="Factors Affecting Terminal Velocity">
        <p>
          Several factors influence terminal velocity:
        </p>
        <ul>
          <li><strong>Mass:</strong> Heavier objects have higher terminal velocities (assuming same area and drag coefficient). Mass appears in the numerator, so doubling mass increases terminal velocity by √2 ≈ 1.41 times.</li>
          <li><strong>Cross-Sectional Area:</strong> Larger area increases drag, reducing terminal velocity. Area appears in the denominator, so doubling area reduces terminal velocity by √2 ≈ 0.71 times.</li>
          <li><strong>Drag Coefficient:</strong> Higher drag coefficient (less streamlined) reduces terminal velocity. Appears in denominator, so doubling C_d reduces terminal velocity by √2 ≈ 0.71 times.</li>
          <li><strong>Fluid Density:</strong> Denser fluids (water vs. air) produce more drag, reducing terminal velocity. Air density decreases with altitude, increasing terminal velocity at higher altitudes.</li>
          <li><strong>Gravitational Acceleration:</strong> Higher gravity increases terminal velocity. On planets with less gravity (e.g., Moon), terminal velocities are lower.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Terminal Velocity in Different Fluids">
        <p>
          Terminal velocity varies significantly with fluid type:
        </p>
        <ul>
          <li><strong>Air (ρ ≈ 1.225 kg/m³):</strong> Low density allows high terminal velocities. A human skydiver reaches ~50-60 m/s.</li>
          <li><strong>Water (ρ ≈ 1000 kg/m³):</strong> Much denser than air, causing much lower terminal velocities. Objects fall much slower in water.</li>
          <li><strong>Altitude Effect:</strong> Air density decreases with altitude. At 10,000 m, density is ~0.41 kg/m³, increasing terminal velocity significantly.</li>
          <li><strong>Temperature Effect:</strong> Warm air is less dense than cold air, slightly increasing terminal velocity in warm conditions.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Terminal Velocity vs. Free Fall">
        <p>
          Understanding the difference between terminal velocity and free fall:
        </p>
        <ul>
          <li><strong>Free Fall (No Air Resistance):</strong> Velocity increases continuously: v = gt. Objects would accelerate indefinitely in vacuum.</li>
          <li><strong>Terminal Velocity (With Air Resistance):</strong> Velocity reaches a maximum constant value when drag equals weight. Acceleration becomes zero.</li>
          <li><strong>Initial Acceleration:</strong> Objects start accelerating at g, but acceleration decreases as velocity increases (due to increasing drag).</li>
          <li><strong>Approaching Terminal:</strong> As velocity approaches terminal velocity, acceleration approaches zero. Most of the journey occurs near terminal velocity.</li>
        </ul>
        <p>
          In practice, most falling objects reach terminal velocity quickly (within a few seconds) and then continue at that constant speed.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is terminal velocity and why does it occur?",
            answer: "Terminal velocity is the maximum constant velocity reached by a falling object when the drag force equals the gravitational force (weight). It occurs because drag force increases with velocity squared (F_drag = 0.5ρv²AC_d), while weight is constant. When these forces balance, net force is zero, so acceleration stops and velocity becomes constant."
          },
          {
            question: "How do you calculate terminal velocity?",
            answer: "Use the formula v = √(2mg / (ρAC_d)), where m is mass, g is gravity (9.8 m/s²), ρ is fluid density (1.225 kg/m³ for air), A is cross-sectional area, and C_d is drag coefficient. For example, a 75 kg skydiver with area 0.7 m² and C_d = 0.82 has terminal velocity of about 46 m/s (165 km/h)."
          },
          {
            question: "What factors affect terminal velocity?",
            answer: "Terminal velocity depends on: (1) Mass - heavier objects fall faster, (2) Cross-sectional area - larger area = more drag = slower fall, (3) Drag coefficient - less streamlined = more drag = slower fall, (4) Fluid density - denser fluids = more drag = slower fall, (5) Gravity - higher gravity = faster fall."
          },
          {
            question: "What is the terminal velocity of a human skydiver?",
            answer: "A human skydiver in belly-down position typically reaches terminal velocity of 50-60 m/s (180-216 km/h or 112-134 mph). In head-down position (more streamlined), terminal velocity can reach 90-100 m/s (324-360 km/h). With a parachute deployed, terminal velocity drops to 4-6 m/s for safe landing."
          },
          {
            question: "Why do heavier objects have higher terminal velocity?",
            answer: "Terminal velocity is proportional to √m (square root of mass). Heavier objects need more drag force to balance their greater weight. Since drag depends on velocity squared, heavier objects must fall faster to generate enough drag. However, the relationship isn't linear - doubling mass only increases terminal velocity by √2 ≈ 1.41 times (if area and drag coefficient remain the same)."
          },
          {
            question: "How does altitude affect terminal velocity?",
            answer: "Higher altitude means lower air density. Since terminal velocity is inversely proportional to √ρ (square root of density), lower density means higher terminal velocity. At 10,000 m altitude, air density is about 1/3 of sea level, so terminal velocity would be approximately √3 ≈ 1.73 times higher than at sea level."
          },
          {
            question: "What is the drag coefficient and how do I choose it?",
            answer: "Drag coefficient (C_d) is a dimensionless number representing an object's aerodynamic drag. Common values: 0.47 (sphere), 0.82 (skydiver belly-down), 0.3-0.4 (skydiver head-down), 1.3-1.5 (parachute), 0.04-0.1 (streamlined objects), 1.0-1.3 (flat plate perpendicular). Choose based on object shape and orientation. For most calculations, typical values (0.47 for spheres, 0.82 for humans) work well."
          },
          {
            question: "Can terminal velocity be negative or zero?",
            answer: "Terminal velocity is always positive for falling objects. However, objects can have terminal velocity when moving upward through a fluid (like bubbles rising in water) - in that case, you'd use the same formula. Terminal velocity cannot be zero for a falling object with mass, as that would require infinite area or drag coefficient."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding terminal velocity and the formula v = √(2mg / (ρAC_d)) is fundamental to fluid mechanics, drag force analysis, and physics. Our Terminal Velocity Calculator simplifies these calculations, making it easy to determine terminal velocity, mass, cross-sectional area, or drag coefficient with support for multiple unit systems.
        </p>
        <p>
          Whether you&apos;re analyzing skydiving physics, designing parachutes, calculating raindrop velocities, or solving fluid mechanics problems, accurate terminal velocity calculations are essential. Ready to explore more fluid mechanics concepts? Check out our other calculators like the {createInternalLink('velocity-calculator', 'Velocity Calculator')} for general velocity calculations, the {createInternalLink('reynolds-number-calculator', 'Reynolds Number Calculator')} for flow regime analysis, or the {createInternalLink('density-mass-volume-calculator', 'Density Calculator')} for density calculations that affect terminal velocity.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

