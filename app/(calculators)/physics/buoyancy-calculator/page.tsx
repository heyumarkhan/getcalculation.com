import BuoyancyCalculator from '../../../_components/calculators/BuoyancyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function BuoyancyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Buoyancy Calculator: Calculate Buoyant Force Using Archimedes' Principle"
      description="Calculate buoyant force, fluid density, or displaced volume using Archimedes' principle (F_b = ρ × V × g). Free online buoyancy calculator for physics, engineering, and fluid mechanics calculations."
      calculator={<BuoyancyCalculator />}
      slug="physics/buoyancy-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate buoyant force from density, volume, and gravity",
        "Calculate fluid density from buoyant force and volume",
        "Calculate displaced volume from buoyant force and density",
        "Multiple unit support (N, kg/m³, m³, m/s²)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Buoyancy: Archimedes' Principle in Action">
        <p>
          Buoyancy is a fundamental concept in fluid mechanics and physics, describing the upward force exerted by a fluid on an object immersed in it. This force, called the buoyant force, is what makes objects float or feel lighter when submerged in water or other fluids. Our Buoyancy Calculator makes it easy to calculate buoyant force, fluid density, or displaced volume using Archimedes&apos; principle: <strong>F_b = ρ × V × g</strong>.
        </p>
        <p>
          Archimedes&apos; principle states that the buoyant force acting on an object immersed in a fluid is equal to the weight of the fluid displaced by the object. Whether you&apos;re studying physics, designing ships and submarines, or understanding why objects float or sink, understanding buoyancy calculations is essential. Our calculator helps you solve buoyancy problems with step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Buoyancy Calculator">
        <p>
          Our Buoyancy Calculator offers three different calculation modes:
        </p>
        <ol>
          <li><strong>Calculate Buoyant Force:</strong> Enter fluid density, displaced volume, and gravity. The calculator determines the buoyant force acting on the object.</li>
          <li><strong>Calculate Fluid Density:</strong> Enter buoyant force, displaced volume, and gravity. The calculator determines the density of the fluid.</li>
          <li><strong>Calculate Displaced Volume:</strong> Enter buoyant force, fluid density, and gravity. The calculator determines the volume of fluid displaced.</li>
        </ol>
        <p>
          Select your calculation mode, enter the known values with appropriate units, and click Calculate to get instant results with detailed step-by-step solutions based on Archimedes&apos; principle.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Archimedes' Principle and the Buoyancy Formula">
        <p>
          Archimedes&apos; principle is the foundation of buoyancy calculations:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">F_b = ρ × V × g</p>
          <p className="text-sm text-gray-600 mt-2">Where: F_b = Buoyant Force (N), ρ = Fluid Density (kg/m³), V = Displaced Volume (m³), g = Gravity (m/s²)</p>
        </div>
        
        <h3>What is Archimedes' Principle?</h3>
        <p>
          Archimedes&apos; principle states that the upward buoyant force exerted on an object immersed in a fluid is equal to the weight of the fluid that the object displaces. This means:
        </p>
        <SEOList items={[
          "The buoyant force is always upward (opposite to gravity)",
          "The magnitude equals the weight of displaced fluid",
          "It depends on fluid density, displaced volume, and gravity",
          "It doesn't depend on the object's shape or material (only on displaced volume)",
          "An object floats when buoyant force equals its weight",
          "An object sinks when its weight exceeds buoyant force"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Buoyant Force (F_b):</strong> The upward force exerted by a fluid on an immersed object, measured in Newtons (N)</li>
          <li><strong>Fluid Density (ρ):</strong> Mass per unit volume of the fluid, typically in kg/m³. Water = 1000 kg/m³, seawater ≈ 1025 kg/m³</li>
          <li><strong>Displaced Volume (V):</strong> The volume of fluid displaced by the object (equal to the submerged volume of the object)</li>
          <li><strong>Gravity (g):</strong> Acceleration due to gravity, typically 9.8 m/s² on Earth</li>
          <li><strong>Weight of Object:</strong> mg, where m is mass and g is gravity. Objects float when F_b ≥ mg</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Buoyancy calculations are essential in countless real-world applications:
        </p>
        <SEOList items={[
          "Ship Design: Calculating buoyancy to ensure ships float and maintain stability",
          "Submarine Engineering: Understanding buoyancy for submerging and surfacing",
          "Swimming and Diving: Understanding why we float and how buoyancy affects movement",
          "Aircraft Design: Understanding buoyancy in lighter-than-air vehicles (balloons, airships)",
          "Architecture: Understanding buoyancy in floating structures and platforms",
          "Marine Engineering: Designing boats, ships, and offshore structures",
          "Sports Equipment: Designing floatation devices and water sports equipment",
          "Aquaculture: Understanding buoyancy in fish farming and marine systems",
          "Scientific Research: Studying fluid behavior and hydrodynamics",
          "Environmental Science: Understanding ocean currents and density-driven flows",
          "Recreational Activities: Understanding why objects float or sink in water",
          "Industrial Applications: Designing systems involving fluid immersion"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our Buoyancy Calculator supports multiple units for each parameter:
        </p>
        <ul>
          <li><strong>Buoyant Force:</strong> Newtons (N), kilonewtons (kN), millinewtons (mN), pounds-force (lb), dynes</li>
          <li><strong>Fluid Density:</strong> kg/m³, g/cm³, g/mL, lb/ft³, lb/in³</li>
          <li><strong>Volume:</strong> Cubic meters (m³), liters (L), milliliters (mL), cubic centimeters (cm³), cubic feet (ft³), cubic inches (in³), gallons</li>
          <li><strong>Gravity:</strong> m/s², cm/s², ft/s², or standard gravity (g = 9.80665 m/s²)</li>
        </ul>
        <p>
          <strong>Common Fluid Densities:</strong>
        </p>
        <ul>
          <li>Fresh Water: 1000 kg/m³ (at 4°C)</li>
          <li>Seawater: 1025 kg/m³ (average)</li>
          <li>Air: 1.225 kg/m³ (at sea level, 15°C)</li>
          <li>Mercury: 13,600 kg/m³</li>
          <li>Oil: 800-900 kg/m³ (varies by type)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Buoyancy Calculations">
        <h3>Example 1: Calculating Buoyant Force</h3>
        <p>A 0.5 m³ object is fully submerged in water (density = 1000 kg/m³). What is the buoyant force? (g = 9.8 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">F_b = ρ × V × g</p>
          <p className="font-mono">F_b = 1000 kg/m³ × 0.5 m³ × 9.8 m/s²</p>
          <p className="font-mono">F_b = 4900 N = 4.9 kN</p>
          <p className="text-sm text-gray-600 mt-1">The buoyant force is 4900 Newtons upward</p>
        </div>

        <h3>Example 2: Determining if an Object Floats</h3>
        <p>An object with mass 100 kg and volume 0.15 m³ is placed in water. Will it float? (Water density = 1000 kg/m³, g = 9.8 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Object weight: W = mg = 100 kg × 9.8 m/s² = 980 N</p>
          <p className="font-mono">Buoyant force: F_b = 1000 kg/m³ × 0.15 m³ × 9.8 m/s² = 1470 N</p>
          <p className="font-mono">Since F_b (1470 N) &gt; W (980 N), the object will float</p>
          <p className="text-sm text-gray-600 mt-1">The object floats because buoyant force exceeds its weight</p>
        </div>

        <h3>Example 3: Calculating Displaced Volume</h3>
        <p>A buoyant force of 1960 N is measured on an object in seawater (density = 1025 kg/m³). What volume is displaced? (g = 9.8 m/s²)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V = F_b / (ρ × g)</p>
          <p className="font-mono">V = 1960 N / (1025 kg/m³ × 9.8 m/s²)</p>
          <p className="font-mono">V = 1960 N / 10,045 (kg/(m²·s²)) = 0.195 m³</p>
          <p className="text-sm text-gray-600 mt-1">The object displaces 0.195 cubic meters of seawater</p>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Floating and Sinking">
        <p>
          The relationship between buoyant force and object weight determines whether an object floats, sinks, or remains neutrally buoyant:
        </p>
        <ul>
          <li><strong>Floating:</strong> When F_b &gt; mg (weight), the object floats. Part of the object is above the fluid surface.</li>
          <li><strong>Sinking:</strong> When F_b &lt; mg (weight), the object sinks. The object descends in the fluid.</li>
          <li><strong>Neutral Buoyancy:</strong> When F_b = mg (weight), the object neither sinks nor floats. It remains suspended at any depth.</li>
        </ul>
        <p>
          The fraction of an object that is submerged when floating equals the ratio of object density to fluid density: Fraction submerged = ρ_object / ρ_fluid
        </p>
      </SEOSection>

      <SEOSection title="Archimedes' Principle Explained">
        <p>
          Archimedes&apos; principle is named after the ancient Greek mathematician and inventor Archimedes, who discovered it around 250 BCE. The principle can be understood by considering fluid pressure:
        </p>
        <SEOList items={[
          "Fluid pressure increases with depth due to the weight of fluid above",
          "An object immersed in fluid experiences greater pressure at the bottom than at the top",
          "This pressure difference creates a net upward force (buoyant force)",
          "The magnitude of this force equals the weight of the displaced fluid",
          "This principle applies to all fluids (liquids and gases)"
        ]} />
        <p>
          The principle is universal and applies whether the object is fully or partially submerged, and regardless of the object&apos;s shape or material composition.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is buoyancy and how is it calculated?",
            answer: "Buoyancy is the upward force exerted by a fluid on an immersed object. It's calculated using Archimedes' principle: F_b = ρ × V × g, where F_b is buoyant force, ρ is fluid density, V is displaced volume, and g is gravity. The buoyant force equals the weight of the fluid displaced by the object."
          },
          {
            question: "What is Archimedes' principle?",
            answer: "Archimedes' principle states that the buoyant force on an object immersed in a fluid equals the weight of the fluid displaced by that object. This principle explains why objects float or sink and is fundamental to understanding fluid mechanics and buoyancy."
          },
          {
            question: "Why do objects float or sink?",
            answer: "An object floats when the buoyant force exceeds or equals its weight (F_b ≥ mg). An object sinks when its weight exceeds the buoyant force (mg > F_b). The relationship depends on the densities of the object and the fluid, as well as the displaced volume."
          },
          {
            question: "What is the difference between buoyant force and weight?",
            answer: "Buoyant force is the upward force exerted by a fluid (F_b = ρ_fluid × V × g). Weight is the downward force due to gravity on the object itself (W = m_object × g = ρ_object × V × g). An object floats when F_b ≥ W, and sinks when W > F_b."
          },
          {
            question: "Does the shape of an object affect buoyancy?",
            answer: "No, the shape of an object does not directly affect the buoyant force. According to Archimedes' principle, buoyant force depends only on the volume of fluid displaced (submerged volume), not on the object's shape. However, shape can affect whether an object floats or sinks by determining how much of it is submerged."
          },
          {
            question: "How do I calculate if an object will float?",
            answer: "Calculate the object's weight (W = mg) and the maximum buoyant force (F_b = ρ_fluid × V_object × g). If F_b ≥ W, the object floats. Alternatively, compare densities: if ρ_object < ρ_fluid, the object floats; if ρ_object > ρ_fluid, it sinks."
          },
          {
            question: "What is the density of water for buoyancy calculations?",
            answer: "Fresh water has a density of approximately 1000 kg/m³ (1 g/cm³) at 4°C. Seawater has a higher density of about 1025 kg/m³ due to dissolved salts. Density varies slightly with temperature, but 1000 kg/m³ is commonly used for calculations."
          },
          {
            question: "Can buoyancy calculations be used for gases?",
            answer: "Yes! Archimedes' principle applies to all fluids, including gases. For example, helium balloons float in air because helium is less dense than air, creating a buoyant force. The same formula F_b = ρ × V × g applies, using air density instead of liquid density."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding buoyancy and Archimedes&apos; principle is fundamental to fluid mechanics, engineering, and physics. Our Buoyancy Calculator simplifies these calculations, making it easy to determine buoyant force, fluid density, or displaced volume for any object immersed in a fluid.
        </p>
        <p>
          Whether you&apos;re studying physics, designing marine vessels, or simply curious about why objects float or sink, this calculator provides accurate results with step-by-step solutions. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('density-mass-volume-calculator', 'Density Mass Volume Calculator')} for related calculations, or use our {createInternalLink('force-calculator', 'Force Calculator')} for general force calculations that complement buoyancy analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

