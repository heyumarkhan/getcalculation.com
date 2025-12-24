import SpecificGravityCalculator from '../../../_components/calculators/SpecificGravityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SpecificGravityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Specific Gravity Calculator: Calculate Density Ratio & Relative Density"
      description="Calculate specific gravity (relative density) using substance density and reference density. Free online physics calculator for material properties, fluid mechanics, and engineering with multiple reference options."
      calculator={<SpecificGravityCalculator />}
      slug="physics/specific-gravity-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate specific gravity from density or vice versa",
        "Multiple reference substances (water at different temperatures)",
        "Support for custom reference densities",
        "Multiple unit conversions (kg/m³, g/cm³, lb/ft³, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Specific Gravity: The Ratio of Densities">
        <p>
          Specific gravity (also known as relative density) is a fundamental concept in physics and engineering that describes the ratio of the density of a substance to the density of a reference substance, typically water. Whether you&apos;re studying material properties, fluid mechanics, or solving engineering problems, understanding specific gravity is essential. Our Specific Gravity Calculator makes it easy to calculate specific gravity using the formula: <strong>SG = ρ_substance / ρ_reference</strong>.
        </p>
        <p>
          Specific gravity is a dimensionless quantity (it has no units) because it&apos;s a ratio of two densities. It tells you how many times denser (or less dense) a substance is compared to the reference material. A specific gravity greater than 1 means the substance is denser than the reference, while less than 1 means it&apos;s less dense.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Specific Gravity Calculator">
        <p>
          Our Specific Gravity Calculator is designed for simplicity and accuracy:
        </p>
        <ol>
          <li><strong>Select Reference Substance:</strong> Choose a reference material (typically water at 4°C, which is the standard) or use a custom reference density</li>
          <li><strong>Enter Values:</strong> Input either the specific gravity or the substance density (leave one empty to calculate)</li>
          <li><strong>Select Units:</strong> Choose your preferred density units</li>
          <li><strong>Calculate:</strong> Click Calculate to get instant results with step-by-step solutions</li>
        </ol>
        <p>
          The calculator uses the fundamental formula: <strong>SG = ρ_substance / ρ_reference</strong>
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Specific Gravity Formula">
        <p>
          The specific gravity formula is straightforward:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">SG = ρ_substance / ρ_reference</p>
          <p className="text-sm text-gray-600 mt-2">Where: SG = specific gravity, ρ_substance = density of substance, ρ_reference = density of reference material</p>
        </div>
        
        <h3>Rearranging the Formula</h3>
        <p>You can rearrange this formula to solve for any variable:</p>
        <ul>
          <li><strong>Substance Density:</strong> ρ_substance = SG × ρ_reference</li>
          <li><strong>Reference Density:</strong> ρ_reference = ρ_substance / SG</li>
          <li><strong>Specific Gravity:</strong> SG = ρ_substance / ρ_reference</li>
        </ul>
      </SEOSection>

      <SEOSection title="Reference Substances and Standard Values">
        <p>
          The choice of reference substance is crucial for specific gravity calculations:
        </p>
        <ul>
          <li><strong>Water at 4°C (Standard):</strong> Density = 1000 kg/m³ = 1 g/cm³. This is the most common reference for liquids and solids</li>
          <li><strong>Water at 20°C:</strong> Density = 998.2 kg/m³. Commonly used for room temperature applications</li>
          <li><strong>Water at 25°C:</strong> Density = 997.0 kg/m³. Used in laboratory settings</li>
          <li><strong>Custom Reference:</strong> You can specify any reference density for specialized applications</li>
        </ul>
        <p>
          <strong>Important:</strong> Always specify the reference substance when reporting specific gravity values, as different references will give different results.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Specific gravity calculations are used in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Material Science: Identifying and characterizing materials based on density",
          "Geology: Determining mineral composition and rock types",
          "Chemistry: Analyzing solutions, mixtures, and pure substances",
          "Engineering: Designing structures, selecting materials, and quality control",
          "Food Industry: Testing product quality, detecting adulteration, and ensuring consistency",
          "Petroleum Industry: Analyzing crude oil, fuels, and lubricants",
          "Pharmaceuticals: Quality control and formulation verification",
          "Beverage Industry: Testing alcohol content, sugar content, and product quality",
          "Construction: Testing concrete, aggregates, and building materials",
          "Environmental Science: Analyzing water quality and pollution levels"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Specific gravity is dimensionless, but density can be expressed in various units:
        </p>
        <ul>
          <li><strong>kg/m³:</strong> SI unit for density, most commonly used in physics and engineering</li>
          <li><strong>g/cm³:</strong> Common in chemistry and material science (equal to g/mL)</li>
          <li><strong>g/mL:</strong> Frequently used in laboratory settings</li>
          <li><strong>lb/ft³:</strong> Common in US engineering applications</li>
          <li><strong>lb/in³:</strong> Used for very dense materials</li>
        </ul>
        <p>
          <strong>Conversion Tips:</strong>
        </p>
        <ul>
          <li>1 g/cm³ = 1 g/mL = 1000 kg/m³</li>
          <li>Water at 4°C: 1000 kg/m³ = 1 g/cm³ = 62.43 lb/ft³</li>
          <li>Since specific gravity is a ratio, the units cancel out, making it dimensionless</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Specific Gravity Calculations">
        <h3>Example 1: Calculating Specific Gravity</h3>
        <p>What is the specific gravity of gold? (Gold density = 19,320 kg/m³, Water at 4°C = 1000 kg/m³)</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ_gold = 19,320 kg/m³</p>
          <p className="font-mono">ρ_water = 1000 kg/m³</p>
          <p className="font-mono">SG = 19,320 / 1000 = 19.32</p>
        </div>
        <p>Gold is 19.32 times denser than water.</p>

        <h3>Example 2: Finding Density from Specific Gravity</h3>
        <p>If a substance has a specific gravity of 0.8 relative to water at 4°C, what is its density?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">SG = 0.8</p>
          <p className="font-mono">ρ_water = 1000 kg/m³</p>
          <p className="font-mono">ρ_substance = 0.8 × 1000 = 800 kg/m³</p>
        </div>

        <h3>Example 3: Using Different Reference Temperatures</h3>
        <p>A liquid has a density of 850 kg/m³. Calculate its specific gravity relative to water at 20°C (998.2 kg/m³).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">ρ_substance = 850 kg/m³</p>
          <p className="font-mono">ρ_water_20C = 998.2 kg/m³</p>
          <p className="font-mono">SG = 850 / 998.2 = 0.8515</p>
        </div>
      </SEOSection>

      <SEOSection title="Specific Gravity vs. Density">
        <p>
          Understanding the difference between specific gravity and density is important:
        </p>
        <ul>
          <li><strong>Density:</strong> A physical property with units (kg/m³, g/cm³, etc.) that describes mass per unit volume</li>
          <li><strong>Specific Gravity:</strong> A dimensionless ratio that compares a substance&apos;s density to a reference density</li>
          <li><strong>Relationship:</strong> SG = ρ_substance / ρ_reference</li>
        </ul>
        <p>
          Specific gravity is particularly useful because it&apos;s independent of the unit system used, making it easy to compare materials across different measurement systems.
        </p>
      </SEOSection>

      <SEOSection title="Temperature Effects on Specific Gravity">
        <p>
          Temperature significantly affects density and therefore specific gravity:
        </p>
        <ul>
          <li><strong>Most substances expand when heated:</strong> Density decreases, so specific gravity decreases</li>
          <li><strong>Water is unique:</strong> It reaches maximum density at 4°C, which is why this temperature is used as the standard reference</li>
          <li><strong>Measurement conditions:</strong> Always specify the temperature at which specific gravity is measured</li>
          <li><strong>Standard conditions:</strong> Many industries use 20°C or 25°C as standard measurement temperatures</li>
        </ul>
        <p>
          Our calculator allows you to select different water temperatures as references to account for temperature effects.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between specific gravity and density?",
            answer: "Density is a physical property with units (like kg/m³) that describes mass per unit volume. Specific gravity is a dimensionless ratio that compares a substance's density to a reference density (typically water). Specific gravity has no units because it's a ratio."
          },
          {
            question: "Why is water at 4°C used as the standard reference?",
            answer: "Water reaches its maximum density at 4°C (1000 kg/m³ = 1 g/cm³). This makes it a convenient and consistent reference point. At this temperature, water's density is exactly 1 g/cm³, making calculations simpler."
          },
          {
            question: "Can specific gravity be less than 1?",
            answer: "Yes! A specific gravity less than 1 means the substance is less dense than the reference material. For example, ice has a specific gravity of about 0.92 relative to water, which is why it floats."
          },
          {
            question: "How does temperature affect specific gravity?",
            answer: "Temperature affects density, which in turn affects specific gravity. Most substances expand when heated (density decreases), so their specific gravity decreases. Water is unique in that it reaches maximum density at 4°C. Always specify the temperature when reporting specific gravity values."
          },
          {
            question: "What units does specific gravity have?",
            answer: "Specific gravity is dimensionless - it has no units. This is because it's a ratio of two densities, and the units cancel out. This makes specific gravity useful for comparing materials regardless of the unit system used."
          },
          {
            question: "How do I convert specific gravity to density?",
            answer: "To convert specific gravity to density, multiply the specific gravity by the reference density: ρ_substance = SG × ρ_reference. For example, if SG = 2.5 and the reference is water at 4°C (1000 kg/m³), then density = 2.5 × 1000 = 2500 kg/m³."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding specific gravity is fundamental to material science, fluid mechanics, and engineering. Our Specific Gravity Calculator simplifies these calculations, supporting multiple reference substances and unit conversions to make solving specific gravity problems easy and accurate.
        </p>
        <p>
          Ready to explore more physics concepts? Check out our {createInternalLink('density-mass-volume-calculator', 'Density Calculator')} for calculating density from mass and volume, our {createInternalLink('flow-rate-calculator', 'Flow Rate Calculator')} for fluid mechanics, or our {createInternalLink('reynolds-number-calculator', 'Reynolds Number Calculator')} for flow regime analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

