import VolumeToMassCalculator from '../../../_components/calculators/VolumeToMassCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function VolumeToMassCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Volume to Mass Calculator: Convert Volume to Mass Using Density"
      description="Calculate mass from volume and density, or volume from mass and density using m = ρ × V. Free online physics calculator for material properties, chemistry, and engineering calculations."
      calculator={<VolumeToMassCalculator />}
      slug="physics/volume-to-mass-calculator"
      category="Mechanics"
      features={[
        "Calculate mass from volume and density",
        "Calculate volume from mass and density",
        "Calculate density from mass and volume",
        "Multiple unit support (kg, m³, kg/m³)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Volume to Mass Conversion: The Density Relationship">
        <p>
          Converting between volume and mass is a fundamental calculation in physics, chemistry, engineering, and materials science. The relationship between these quantities is defined by density, which represents how much mass is contained in a given volume. Our Volume to Mass Calculator simplifies these conversions using the formula: <strong>m = ρ × V</strong>, where m is mass, ρ (rho) is density, and V is volume.
        </p>
        <p>
          Whether you&apos;re working with materials, calculating shipping weights, analyzing chemical substances, or solving physics problems, understanding how to convert between volume and mass is essential. Our calculator helps you determine mass from volume, volume from mass, or density from both, making complex calculations simple and accurate.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Volume to Mass Calculator">
        <p>
          Our Volume to Mass Calculator offers three calculation modes:
        </p>
        <SEOList ordered items={[
          '<strong>Calculate Mass:</strong> Enter density and volume. The calculator determines the mass using m = ρ × V.',
          '<strong>Calculate Volume:</strong> Enter mass and density. The calculator determines the volume using V = m / ρ.',
          '<strong>Calculate Density:</strong> Enter mass and volume. The calculator determines the density using ρ = m / V.'
        ]} />
        <p>
          Select your calculation mode, enter the known values with appropriate units, and click Calculate to get instant results with detailed step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="The Volume to Mass Formula">
        <p>
          The relationship between mass, volume, and density is fundamental to physics:
        </p>

        <SEOFormula
          formula="m = ρ × V"
          description="Mass = Density × Volume"
        />
        <p>
          Where:
        </p>
        <SEOList items={[
          '<strong>m</strong> = Mass (kilograms, kg)',
          '<strong>ρ</strong> (rho) = Density (kilograms per cubic meter, kg/m³)',
          '<strong>V</strong> = Volume (cubic meters, m³)'
        ]} />

        <h3>Rearranged Formulas:</h3>
        <SEOList items={[
          '<strong>Volume:</strong> V = m / ρ (Volume = Mass ÷ Density)',
          '<strong>Density:</strong> ρ = m / V (Density = Mass ÷ Volume)',
          '<strong>Mass:</strong> m = ρ × V (Mass = Density × Volume)'
        ]} />

        <h3>Understanding Density:</h3>
        <p>
          Density is a material property that describes how much mass is packed into a unit volume. It&apos;s a characteristic property of substances, meaning different materials have different densities:
        </p>
        <ul>
          <li><strong>High Density:</strong> Materials like lead, gold, or iron have high density (heavy for their size)</li>
          <li><strong>Low Density:</strong> Materials like wood, foam, or air have low density (light for their size)</li>
          <li><strong>Standard Reference:</strong> Water has a density of 1000 kg/m³ (or 1 g/cm³) at 4°C, often used as a reference</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications of Volume to Mass Calculations">
        <p>
          Volume to mass conversions are essential in numerous practical applications:
        </p>
        <SEOList items={[
          "Shipping and Logistics: Calculating shipping weights from package volumes and material densities",
          "Construction: Estimating material quantities and weights for building projects",
          "Chemistry: Converting between volume and mass in chemical reactions and solutions",
          "Manufacturing: Calculating material requirements and inventory management",
          "Engineering: Designing components with specific weight requirements",
          "Cooking and Baking: Converting recipe volumes to weights for accurate measurements",
          "Material Science: Analyzing material properties and composition",
          "Packaging: Determining product weights from container volumes",
          "Waste Management: Calculating waste mass from collection volumes",
          "Aviation: Calculating fuel mass from volume for aircraft weight and balance",
          "Marine Engineering: Determining cargo and ballast weights",
          "Quality Control: Verifying material quantities in production processes"
        ]} />
      </SEOSection>

      <SEOSection title="Common Material Densities">
        <p>
          Knowing common material densities helps with quick conversions:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Density (kg/m³)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Density (g/cm³)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr><td className="px-4 py-2 text-sm">Air (at sea level)</td><td className="px-4 py-2 text-sm">1.225</td><td className="px-4 py-2 text-sm">0.001225</td></tr>
              <tr><td className="px-4 py-2 text-sm">Water (at 4°C)</td><td className="px-4 py-2 text-sm">1000</td><td className="px-4 py-2 text-sm">1.0</td></tr>
              <tr><td className="px-4 py-2 text-sm">Ice</td><td className="px-4 py-2 text-sm">917</td><td className="px-4 py-2 text-sm">0.917</td></tr>
              <tr><td className="px-4 py-2 text-sm">Aluminum</td><td className="px-4 py-2 text-sm">2700</td><td className="px-4 py-2 text-sm">2.7</td></tr>
              <tr><td className="px-4 py-2 text-sm">Steel</td><td className="px-4 py-2 text-sm">7850</td><td className="px-4 py-2 text-sm">7.85</td></tr>
              <tr><td className="px-4 py-2 text-sm">Iron</td><td className="px-4 py-2 text-sm">7870</td><td className="px-4 py-2 text-sm">7.87</td></tr>
              <tr><td className="px-4 py-2 text-sm">Copper</td><td className="px-4 py-2 text-sm">8960</td><td className="px-4 py-2 text-sm">8.96</td></tr>
              <tr><td className="px-4 py-2 text-sm">Gold</td><td className="px-4 py-2 text-sm">19320</td><td className="px-4 py-2 text-sm">19.32</td></tr>
              <tr><td className="px-4 py-2 text-sm">Lead</td><td className="px-4 py-2 text-sm">11340</td><td className="px-4 py-2 text-sm">11.34</td></tr>
              <tr><td className="px-4 py-2 text-sm">Wood (Oak)</td><td className="px-4 py-2 text-sm">600-900</td><td className="px-4 py-2 text-sm">0.6-0.9</td></tr>
              <tr><td className="px-4 py-2 text-sm">Concrete</td><td className="px-4 py-2 text-sm">2400</td><td className="px-4 py-2 text-sm">2.4</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          <strong>Note:</strong> Densities can vary with temperature, pressure, and composition. Values shown are approximate at standard conditions (20°C, 1 atm).
        </p>
      </SEOSection>

      <SEOSection title="Common Volume to Mass Calculations">
        <h3>Example 1: Calculating Mass from Volume</h3>
        <p>A container holds 2.5 m³ of water. What is the mass of the water? (Water density = 1000 kg/m³)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = ρ × V</p>
          <p className="font-mono">m = 1000 kg/m³ × 2.5 m³</p>
          <p className="font-mono">m = 2500 kg = 2.5 metric tons</p>
          <p className="text-sm text-gray-600 mt-1">The container holds 2500 kg (2.5 metric tons) of water.</p>
        </div>

        <h3>Example 2: Calculating Volume from Mass</h3>
        <p>A block of aluminum has a mass of 5400 kg. What is its volume? (Aluminum density = 2700 kg/m³)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V = m / ρ</p>
          <p className="font-mono">V = 5400 kg / 2700 kg/m³</p>
          <p className="font-mono">V = 2 m³</p>
          <p className="text-sm text-gray-600 mt-1">The aluminum block has a volume of 2 cubic meters.</p>
        </div>

        <h3>Example 3: Calculating Density</h3>
        <p>A metal object has a mass of 7850 kg and occupies 1 m³. What is its density?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ = m / V</p>
          <p className="font-mono">ρ = 7850 kg / 1 m³</p>
          <p className="font-mono">ρ = 7850 kg/m³</p>
          <p className="text-sm text-gray-600 mt-1">The metal has a density of 7850 kg/m³, which matches the density of steel.</p>
        </div>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Our Volume to Mass Calculator supports multiple units for each parameter:
        </p>
        <SEOList items={[
          '<strong>Mass:</strong> Kilograms (kg), grams (g), milligrams (mg), pounds (lb), ounces (oz), metric tons',
          '<strong>Volume:</strong> Cubic meters (m³), liters (L), milliliters (mL), cubic centimeters (cm³), cubic feet (ft³), cubic inches (in³), US gallons',
          '<strong>Density:</strong> Kilograms per cubic meter (kg/m³), grams per cubic centimeter (g/cm³), grams per milliliter (g/mL), pounds per cubic foot (lb/ft³), pounds per cubic inch (lb/in³)'
        ]} />
        <p>
          <strong>Unit Conversion Tip:</strong> The calculator automatically converts between different units, ensuring accurate calculations regardless of the unit system you use. All internal calculations are performed in base SI units (kg, m³, kg/m³).
        </p>
        <p>
          <strong>Common Relationships:</strong>
        </p>
        <ul>
          <li>1 g/cm³ = 1000 kg/m³</li>
          <li>1 g/mL = 1 g/cm³ = 1000 kg/m³</li>
          <li>1 L = 0.001 m³ = 1000 cm³</li>
          <li>Water density: 1000 kg/m³ = 1 g/cm³ = 1 g/mL</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How do you convert volume to mass?",
            answer: "To convert volume to mass, multiply the volume by the density: m = ρ × V. For example, if you have 1 m³ of water (density = 1000 kg/m³), the mass is 1 m³ × 1000 kg/m³ = 1000 kg. The density must be known or measured to perform this conversion."
          },
          {
            question: "How do you convert mass to volume?",
            answer: "To convert mass to volume, divide the mass by the density: V = m / ρ. For example, if you have 2000 kg of aluminum (density = 2700 kg/m³), the volume is 2000 kg ÷ 2700 kg/m³ = 0.741 m³. You need to know the material's density to perform this conversion."
          },
          {
            question: "What is the formula for mass from volume and density?",
            answer: "The formula is: Mass = Density × Volume, or m = ρ × V. This formula shows that mass is directly proportional to both density and volume. If you double either the density or volume, the mass doubles."
          },
          {
            question: "Why do different materials have different densities?",
            answer: "Density depends on how tightly packed the atoms or molecules are in a material. Materials with heavier atoms (like lead or gold) or more tightly packed structures tend to have higher densities. Density is also affected by temperature and pressure - most materials expand when heated, decreasing density."
          },
          {
            question: "Can you convert volume to mass without knowing density?",
            answer: "No, you cannot convert volume to mass without knowing the density. Density is the essential link between volume and mass. Each material has a characteristic density (which can vary with temperature and pressure), and this density value is required for the conversion m = ρ × V."
          },
          {
            question: "How does temperature affect density and volume to mass conversions?",
            answer: "Temperature affects density because most materials expand when heated, increasing volume while mass stays constant. This means density decreases with increasing temperature (ρ = m/V, so if V increases, ρ decreases). For accurate conversions, use density values at the same temperature as your measurements. Water is a notable exception - its density is highest at 4°C."
          },
          {
            question: "What is the density of water?",
            answer: "The density of pure water at 4°C is 1000 kg/m³ (or 1 g/cm³, or 1 g/mL). This is often used as a reference. At room temperature (20°C), water density is approximately 998 kg/m³. The density of water decreases as temperature increases (except between 0-4°C where it increases)."
          },
          {
            question: "Is volume to mass conversion the same for all materials?",
            answer: "No, the conversion factor (density) is different for each material. A given volume of lead (density ≈ 11,340 kg/m³) will have much more mass than the same volume of water (density = 1000 kg/m³). You must use the correct density value for the specific material you're working with."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding how to convert between volume and mass using density is a fundamental skill in physics, chemistry, engineering, and many practical applications. Our Volume to Mass Calculator simplifies these conversions, making it easy to determine mass, volume, or density for any material.
        </p>
        <p>
          Whether you&apos;re calculating shipping weights, analyzing materials, solving physics problems, or working on engineering projects, this calculator provides accurate results with step-by-step solutions. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('density-mass-volume-calculator', 'Density Mass Volume Calculator')} for related calculations, or use our {createInternalLink('buoyancy-calculator', 'Buoyancy Calculator')} which also uses density in its calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

