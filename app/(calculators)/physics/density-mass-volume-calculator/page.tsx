import DensityMassVolumeCalculator from '../../../_components/calculators/DensityMassVolumeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function DensityMassVolumeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Density Mass Volume Calculator: Calculate ρ = m/V Instantly"
      description="Calculate density, mass, or volume using the formula ρ = m/V. Free online physics calculator for material properties, fluid mechanics, and engineering calculations with multiple unit support."
      calculator={<DensityMassVolumeCalculator />}
      slug="physics/density-mass-volume-calculator"
      category="Mechanics"
      features={[
        "Calculate density, mass, or volume",
        "Instant physics calculations",
        "Multiple unit support (kg/m³, g/cm³, lb/ft³, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Density, Mass, and Volume: Fundamental Physics Concepts">
        <p>
          Density, mass, and volume are three fundamental physical properties that are closely related. Understanding their relationship is essential in physics, chemistry, engineering, and many practical applications. Our Density Mass Volume Calculator makes it easy to calculate any one of these values when you know the other two using the fundamental formula: <strong>ρ = m/V</strong> (density equals mass divided by volume).
        </p>
        <p>
          Density describes how much mass is contained within a given volume of a substance. It&apos;s a characteristic property that helps identify materials and is crucial for understanding buoyancy, material selection, and fluid mechanics. Whether you&apos;re working on engineering projects, studying physics, or solving real-world problems, our calculator simplifies these calculations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Density Mass Volume Calculator">
        <p>
          Our Density Mass Volume Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (density, mass, or volume)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with automatic unit conversion</li>
        </ol>
        <p>
          The calculator uses the fundamental density formula: <strong>Density = Mass ÷ Volume (ρ = m/V)</strong>
        </p>
        <p>
          You can rearrange this formula to solve for any variable:
        </p>
        <ul>
          <li><strong>Mass:</strong> m = ρ × V</li>
          <li><strong>Volume:</strong> V = m ÷ ρ</li>
          <li><strong>Density:</strong> ρ = m ÷ V</li>
        </ul>
      </SEOSection>

      <SEOSection title="Understanding the Density Formula">
        <p>
          The density formula is one of the most important equations in physics and materials science:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ρ = m/V</p>
          <p className="text-sm text-gray-600 mt-2">Where: ρ = density, m = mass, V = volume</p>
        </div>
        
        <h3>What is Density?</h3>
        <p>
          Density is defined as the mass per unit volume of a substance. It tells you how tightly packed the matter is within an object. Different materials have different densities:
        </p>
        <SEOList items={[
          "Water at 4°C: approximately 1000 kg/m³ or 1 g/cm³",
          "Aluminum: approximately 2700 kg/m³",
          "Iron: approximately 7870 kg/m³",
          "Lead: approximately 11340 kg/m³",
          "Air at sea level: approximately 1.225 kg/m³"
        ]} />

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Mass:</strong> The amount of matter in an object, measured in kilograms (kg), grams (g), or pounds (lb)</li>
          <li><strong>Volume:</strong> The amount of space an object occupies, measured in cubic meters (m³), liters (L), or cubic feet (ft³)</li>
          <li><strong>Density:</strong> The ratio of mass to volume, measured in kg/m³, g/cm³, or lb/ft³</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Density, mass, and volume calculations are used in countless real-world scenarios across various fields:
        </p>
        <SEOList items={[
          "Material Science: Identifying materials and selecting appropriate substances for projects",
          "Engineering: Designing structures, choosing materials, and calculating loads",
          "Shipping & Logistics: Determining cargo weight and container capacity",
          "Chemistry: Understanding solutions, concentrations, and chemical reactions",
          "Construction: Calculating concrete requirements, material quantities, and structural loads",
          "Fluid Mechanics: Understanding buoyancy, fluid flow, and pressure calculations",
          "Metallurgy: Analyzing metal properties and alloy compositions",
          "Quality Control: Testing material properties and ensuring product specifications"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          It&apos;s crucial to use consistent units in your calculations. Our calculator supports multiple unit systems and automatically converts between them:
        </p>
        
        <h3>Density Units</h3>
        <ul>
          <li><strong>Metric:</strong> kg/m³ (kilograms per cubic meter), g/cm³ (grams per cubic centimeter), g/mL (grams per milliliter)</li>
          <li><strong>Imperial:</strong> lb/ft³ (pounds per cubic foot), lb/in³ (pounds per cubic inch), oz/in³ (ounces per cubic inch)</li>
        </ul>

        <h3>Mass Units</h3>
        <ul>
          <li><strong>Metric:</strong> kg (kilograms), g (grams), mg (milligrams), ton (metric tons)</li>
          <li><strong>Imperial:</strong> lb (pounds), oz (ounces)</li>
        </ul>

        <h3>Volume Units</h3>
        <ul>
          <li><strong>Metric:</strong> m³ (cubic meters), L (liters), mL (milliliters), cm³ (cubic centimeters)</li>
          <li><strong>Imperial:</strong> ft³ (cubic feet), in³ (cubic inches), gal (gallons), fl oz (fluid ounces)</li>
        </ul>

        <p>
          <strong>Tip:</strong> The calculator automatically handles unit conversions, so you can mix different unit systems. For example, you can input mass in kilograms and volume in liters, and the calculator will provide density in kg/m³.
        </p>
      </SEOSection>

      <SEOSection title="Common Density Calculations">
        <h3>Example 1: Calculating Density</h3>
        <p>A block of aluminum has a mass of 2.7 kg and occupies a volume of 0.001 m³. What is its density?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ = m/V = 2.7 kg ÷ 0.001 m³ = 2700 kg/m³</p>
        </div>

        <h3>Example 2: Calculating Mass</h3>
        <p>What is the mass of 5 liters of water? (Water density = 1000 kg/m³)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">m = ρ × V = 1000 kg/m³ × 0.005 m³ = 5 kg</p>
          <p className="text-sm text-gray-600 mt-1">Note: 5 L = 0.005 m³</p>
        </div>

        <h3>Example 3: Calculating Volume</h3>
        <p>A piece of iron has a mass of 15.74 kg. What volume does it occupy? (Iron density = 7870 kg/m³)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">V = m/ρ = 15.74 kg ÷ 7870 kg/m³ = 0.002 m³ = 2 L</p>
        </div>

        <h3>Example 4: Mixed Units</h3>
        <p>Calculate the density of a material that weighs 50 pounds and occupies 1.5 cubic feet.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ = m/V = 50 lb ÷ 1.5 ft³ = 33.33 lb/ft³</p>
          <p className="text-sm text-gray-600 mt-1">Which equals approximately 534 kg/m³</p>
        </div>
      </SEOSection>

      <SEOSection title="Density in Different States of Matter">
        <p>
          Density varies significantly between different states of matter and can be affected by temperature and pressure:
        </p>
        <ul>
          <li><strong>Solids:</strong> Generally have the highest densities. Metals like gold (19,320 kg/m³) and platinum (21,450 kg/m³) are among the densest materials.</li>
          <li><strong>Liquids:</strong> Typically have intermediate densities. Water (1000 kg/m³) is often used as a reference standard.</li>
          <li><strong>Gases:</strong> Have the lowest densities. Air at sea level is about 1.225 kg/m³, but this decreases with altitude.</li>
        </ul>
        <p>
          <strong>Note:</strong> Temperature and pressure can significantly affect gas density, while they have a smaller effect on liquids and solids.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications in Everyday Life">
        <p>
          Understanding density has practical applications in daily life:
        </p>
        <SEOList items={[
          "Buoyancy: Why objects float or sink (objects less dense than water float)",
          "Cooking: Measuring ingredients by volume or weight",
          "Shipping: Determining if cargo will float or calculating shipping costs",
          "Construction: Estimating material requirements and weights",
          "Recycling: Sorting materials by density for recycling processes",
          "Weather: Understanding atmospheric density and weather patterns"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the relationship between density, mass, and volume?",
            answer: "Density (ρ) equals mass (m) divided by volume (V): ρ = m/V. This means if you know any two values, you can calculate the third. Mass equals density times volume (m = ρV), and volume equals mass divided by density (V = m/ρ)."
          },
          {
            question: "What are the most common density units?",
            answer: "In the metric system, the most common units are kg/m³ (kilograms per cubic meter) and g/cm³ (grams per cubic centimeter). Note that 1 g/cm³ = 1000 kg/m³. In the imperial system, lb/ft³ (pounds per cubic foot) is commonly used."
          },
          {
            question: "Can density change for the same material?",
            answer: "Yes, density can change with temperature and pressure. For gases, density changes significantly with these factors. For liquids and solids, the changes are usually small but measurable. This is why density is often specified at standard temperature and pressure (STP)."
          },
          {
            question: "How do I convert between different density units?",
            answer: "Common conversions: 1 g/cm³ = 1000 kg/m³, 1 lb/ft³ ≈ 16.02 kg/m³, 1 g/mL = 1 g/cm³. Our calculator automatically handles all unit conversions for you, so you can input values in any supported units."
          },
          {
            question: "What is the density of water?",
            answer: "Pure water has a density of approximately 1000 kg/m³ or 1 g/cm³ at 4°C (39.2°F). This is used as a reference standard. The density of water changes slightly with temperature, decreasing as temperature increases above 4°C."
          },
          {
            question: "How is density used in engineering and construction?",
            answer: "Engineers use density to calculate material weights, determine structural loads, select appropriate materials for projects, estimate quantities needed, and ensure materials meet specifications. It's essential for everything from concrete mixing to aerospace design."
          },
          {
            question: "Can I use this calculator for gas density calculations?",
            answer: "Yes, but be aware that gas density is highly dependent on temperature and pressure. For accurate gas density calculations, you may need to account for these factors using the ideal gas law. Our calculator works best for solids and liquids where density is more constant."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding the relationship between density, mass, and volume is fundamental to physics, engineering, and many practical applications. Our Density Mass Volume Calculator simplifies these calculations, making it easy to solve problems involving material properties, fluid mechanics, and engineering design.
        </p>
        <p>
          Whether you&apos;re calculating material densities, determining masses from volumes, or finding volumes from known densities, this calculator provides accurate results with support for multiple unit systems. Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('velocity-calculator')} or use our {createInternalLink('volume')} for geometric volume calculations that often complement density problems.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

