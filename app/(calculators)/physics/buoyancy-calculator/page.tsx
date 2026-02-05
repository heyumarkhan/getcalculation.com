import BuoyancyCalculator from '../../../_components/calculators/BuoyancyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function BuoyancyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Buoyancy Calculator - Calculate Buoyant Force Instantly"
      description="Free buoyancy calculator using Archimedes' principle. Calculate buoyant force, fluid density, or displaced volume with the formula F = ρVg. Get instant physics results."
      calculator={<BuoyancyCalculator />}
      slug="physics/buoyancy-calculator"
      category="Physics"
      features={[
        "Calculate buoyant force instantly",
        "Archimedes' principle formula",
        "Multiple unit support",
        "Real-time accurate results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Buoyancy Matters: From Ships to Swimming">
        <p>
          Buoyancy is the upward force that keeps ships afloat, submarines submerged at controlled depths, and swimmers buoyant in water. Every object placed in a fluid—whether water, air, or any liquid—experiences this invisible upward push. Understanding buoyancy explains why massive steel ships float while small rocks sink, why hot air balloons rise, and why you feel lighter in a swimming pool. From naval architecture to scuba diving, buoyancy calculations are essential for safety and design. Engineers use buoyancy principles to create everything from life jackets to offshore oil platforms. For related fluid dynamics calculations, explore our {createInternalLink('hydrostatic-pressure-calculator')} to understand how fluid pressure varies with depth.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the fluid density in kg/m³ (e.g., 1000 for water)</li>
          <li><strong>Step 2:</strong> Input the volume of fluid displaced by the object in cubic meters</li>
          <li><strong>Step 3:</strong> Click "Calculate" to instantly compute the buoyant force using Archimedes' principle</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Buoyancy Calculator Formula">
        <p>
          Archimedes' principle is the foundation of buoyancy calculations, discovered over 2,000 years ago. The buoyant force equals the weight of the fluid displaced by an object. This elegant formula combines fluid density, displaced volume, and gravitational acceleration to determine the upward force acting on any submerged or floating object.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">F = ρ × V × g</p>
          <p className="text-sm mt-2">Where F = Buoyant Force (N), ρ = Fluid Density (kg/m³), V = Displaced Volume (m³), g = Gravity (9.8 m/s²)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate the buoyant force on a 0.5 m³ object fully submerged in water:</p>
        <ul>
           <li>Fluid density (ρ): 1000 kg/m³ (water)</li>
           <li>Displaced volume (V): 0.5 m³</li>
           <li>Gravity (g): 9.8 m/s²</li>
           <li>Calculation: F = 1000 × 0.5 × 9.8 = 4900 N</li>
           <li>Result: The buoyant force is 4900 Newtons (4.9 kN) pushing upward</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
         <p>Buoyancy calculations are critical across countless industries and applications. From marine engineering to recreational activities, understanding buoyant forces ensures safety, efficiency, and proper design.</p>
         <SEOList items={[
           "Naval Architecture: Designing ships, boats, and submarines with proper displacement and stability",
           "Diving & Swimming: Understanding why divers need weights and how buoyancy vests work",
           "Hot Air Balloons: Calculating lift force based on air density differences",
           "Offshore Engineering: Designing oil platforms and floating structures",
           "Material Testing: Determining density of objects using buoyancy measurements"
         ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is buoyancy and how is it calculated?",
            answer: "Buoyancy is the upward force a fluid exerts on an immersed object. It's calculated using Archimedes' principle: F = ρVg, where F is buoyant force, ρ is fluid density, V is displaced volume, and g is gravity (9.8 m/s²). The buoyant force equals the weight of fluid displaced by the object."
          },
          {
            question: "Why do heavy ships float but small rocks sink?",
            answer: "Ships float because they displace a large volume of water relative to their weight. The hollow hull displaces enough water to create a buoyant force greater than the ship's weight. Rocks sink because their high density means they can't displace enough water to generate sufficient buoyant force to overcome their weight."
          },
           {
            question: "How does fluid density affect buoyancy?",
            answer: "Higher fluid density creates greater buoyant force for the same displaced volume. This is why it's easier to float in seawater (density ~1025 kg/m³) than freshwater (1000 kg/m³), and why the Dead Sea (density ~1240 kg/m³) makes floating effortless."
          },
           {
            question: "What determines if an object floats or sinks?",
            answer: "An object floats when the buoyant force equals or exceeds its weight. This happens when the object's average density is less than the fluid's density. If the object is denser than the fluid, it sinks. Neutral buoyancy occurs when densities are equal."
          },
           {
            question: "Does the shape of an object affect buoyant force?",
            answer: "No, buoyant force depends only on the volume of fluid displaced, not the object's shape. However, shape affects how easily an object can displace fluid and maintain stability. This is why ships are designed with specific hull shapes even though buoyant force calculation remains F = ρVg."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering buoyancy calculations opens up understanding of how objects interact with fluids, from everyday phenomena like swimming to complex engineering challenges. Our buoyancy calculator makes it simple to apply Archimedes' principle and calculate buoyant forces accurately for any scenario.
        </p>
        <p>
           Explore more Physics tools: Check out our {createInternalLink('water-density-calculator')} for fluid property calculations, or discover {createInternalLink('pressure-calculator')} to understand forces in fluids.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

