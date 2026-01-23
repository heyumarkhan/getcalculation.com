import CubeDensityCalculator from '../../../_components/calculators/CubeDensityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata = {
  title: 'Cube Density Calculator - Calculate Density, Mass & Side Length (ρ = m/s³)',
  description: 'Calculate cube density, mass, or side length using ρ = m/V. Free cube density calculator with multiple units for density calculations and material analysis.',
  keywords: [
    'cube density calculator',
    'calculate cube density',
    'cube mass calculator',
    'cube side length calculator',
    'density formula calculator',
    'cube volume density',
    'material density calculator',
    'cubic density calculator',
    'density mass volume cube',
    'cube weight calculator',
    'solid cube density',
    'cube density formula',
    'calculate mass from density',
    'cube dimensions calculator',
    'density of cube',
    'cube mass from density',
    'cubic material density',
    'cube density physics',
    'geometry density calculator'
  ],
  openGraph: {
    title: 'Cube Density Calculator - Calculate Density, Mass & Side Length',
    description: 'Free online cube density calculator for material analysis. Calculate density, mass, or side length with multiple unit conversions.',
    type: 'website',
    url: 'https://getcalculation.com/physics/cube-density-calculator',
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics/cube-density-calculator',
  },
};

export default function CubeDensityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Cube Density Calculator: Calculate Density, Mass & Side Length (ρ = m/s³)"
      description="Calculate cube density, mass, or side length using the density formula. Free calculator with multiple units for material analysis."
      calculator={<CubeDensityCalculator />}
      slug="physics/cube-density-calculator"
      category="Mechanics"
      features={[
        "Calculate density from mass and side length",
        "Calculate mass from density and side length",
        "Calculate side length from density and mass",
        "Automatic volume calculation (V = s³)",
        "Automatic surface area calculation (SA = 6s²)",
        "Multiple density units (kg/m³, g/cm³, lb/ft³, lb/in³, kg/L)",
        "Multiple mass units (kg, g, lb, oz, metric ton)",
        "Multiple length units (m, cm, mm, ft, in)",
        "Common material densities reference table"
      ]}
    >
      <SEOSection title="Understanding Cube Density: Complete Guide to Cubic Material Analysis">
        <p>
          Cube density represents the mass per unit volume of a cubic object, one of the fundamental properties in physics, materials science, and engineering. Whether you're analyzing metal cubes, wooden blocks, concrete samples, or any cubic structure, understanding density is essential for material identification, quality control, structural analysis, and scientific research. Our Cube Density Calculator makes it easy to calculate density, mass, or side length using the fundamental formula: <strong>ρ = m/V = m/s³</strong>, where ρ is density, m is mass, s is side length, and V is volume.
        </p>
        <p>
          For a cube, volume equals the side length cubed (V = s³), making density calculations straightforward: <strong>ρ = m/s³</strong>. This simple geometric relationship allows you to determine any of the three variables (density, mass, or side length) when you know the other two. Density is measured in kg/m³ (SI unit), g/cm³, lb/ft³, or other units depending on your application and region.
        </p>
        <p>
          Cube density calculations are crucial in manufacturing (quality control of cast metal cubes), construction (concrete cube testing), education (physics experiments), shipping (weight estimation), metallurgy (alloy identification), and material science (characterizing new materials). This calculator handles all unit conversions automatically and provides additional properties like volume and surface area.
        </p>
      </SEOSection>

      <SEOSection title="Cube Density Formula and Calculations">
        <p>
          The cube density formula derives from the basic density definition (density = mass/volume) combined with the cube volume formula (V = s³):
        </p>
        <p className="text-center text-xl font-mono my-4">
          ρ = m / V = m / s³
        </p>
        <p>
          From this fundamental equation, we can derive formulas for all three variables:
        </p>
        <ul>
          <li><strong>Density (ρ):</strong> ρ = m / s³. Given mass and side length, density equals mass divided by side length cubed. For example, a 10 kg cube with 0.2 m sides has density ρ = 10 / (0.2)³ = 10 / 0.008 = 1250 kg/m³.</li>
          <li><strong>Mass (m):</strong> m = ρ × s³. Given density and side length, mass equals density times side length cubed. For example, an aluminum cube (ρ = 2700 kg/m³) with 0.1 m sides has mass m = 2700 × (0.1)³ = 2700 × 0.001 = 2.7 kg.</li>
          <li><strong>Side Length (s):</strong> s = ∛(m / ρ). Given mass and density, side length equals the cube root of mass divided by density. For example, a 5 kg steel cube (ρ = 7850 kg/m³) has side length s = ∛(5 / 7850) = ∛(0.000637) = 0.0860 m = 8.6 cm.</li>
        </ul>
        <p>
          Additional cube properties calculated automatically:
        </p>
        <ul>
          <li><strong>Volume (V):</strong> V = s³. The space occupied by the cube. Units: m³, cm³, L, ft³, in³.</li>
          <li><strong>Surface Area (SA):</strong> SA = 6s². Total area of all six cube faces. Units: m², cm², ft², in².</li>
        </ul>
        <p>
          Unit conversions are critical for accurate calculations. Common density unit relationships: 1 g/cm³ = 1000 kg/m³, 1 lb/ft³ = 16.0185 kg/m³, 1 kg/L = 1000 kg/m³. Our calculator handles all conversions automatically.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Cube Density Calculator">
        <p>
          Using our cube density calculator is simple and requires only a few steps:
        </p>
        <ol>
          <li><strong>Select what to solve for:</strong> Choose whether you want to calculate density (ρ), mass (m), or side length (s) from the dropdown menu. This determines which field will be calculated.</li>
          <li><strong>Enter known values:</strong> Input the two known variables. For example, to find density, enter mass and side length. The field you're solving for will be automatically disabled.</li>
          <li><strong>Select units:</strong> Choose your preferred units for each parameter:
            <ul>
              <li>Density: kg/m³, g/cm³, lb/ft³, lb/in³, kg/L</li>
              <li>Mass: kg, g, lb, oz, metric ton</li>
              <li>Length: m, cm, mm, ft, in</li>
            </ul>
          </li>
          <li><strong>Click Calculate:</strong> The calculator instantly computes the unknown variable and displays the result with high precision (6 decimal places).</li>
          <li><strong>Review additional properties:</strong> The calculator also shows volume (V = s³) and surface area (SA = 6s²) when applicable, providing complete cube characterization.</li>
          <li><strong>Reference material densities:</strong> Use the built-in reference table to compare your result with common materials (metals, woods, plastics, concrete, glass) to verify material identity or detect anomalies.</li>
          <li><strong>Reset for new calculation:</strong> Click Reset to clear all fields and start a new calculation.</li>
        </ol>
        <p>
          The calculator performs all unit conversions internally using SI units (kg, m, kg/m³) for accuracy, then converts results back to your selected units. This ensures consistency and eliminates manual conversion errors.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Cube Density Calculations">
        <p>
          Cube density calculations have widespread applications across multiple fields:
        </p>
        <ul>
          <li><strong>Concrete Testing:</strong> Construction industry standard involves testing concrete strength using 150mm (6-inch) cube samples. After curing, cubes are weighed and measured to verify proper density (typically 2300-2500 kg/m³ for normal concrete), indicating correct mix proportions and curing.</li>
          <li><strong>Metal Casting Quality Control:</strong> Foundries cast test cubes to verify alloy composition and detect defects. Density measurements identify porosity, incorrect alloy ratios, or contamination. For example, pure copper cubes should have density near 8960 kg/m³; deviations indicate issues.</li>
          <li><strong>Material Identification:</strong> Unknown cubic samples can be identified by measuring mass and dimensions, calculating density, and comparing to known material densities. Useful in recycling, archaeology, forensics, and quality assurance.</li>
          <li><strong>Educational Physics Experiments:</strong> Students learn density concepts using wooden, metal, or plastic cubes. Hands-on measurement of mass and dimensions, followed by density calculation and material identification, reinforces theoretical knowledge.</li>
          <li><strong>Packaging and Shipping:</strong> Estimating weight of cubic packages for shipping costs. Given material density and dimensions, calculate total mass to determine freight charges and ensure compliance with weight limits.</li>
          <li><strong>Manufacturing Tolerances:</strong> Precision-machined metal cubes used as calibration standards must meet tight density specifications. Deviations indicate dimensional errors or material inconsistencies.</li>
          <li><strong>Geological Samples:</strong> Rock and mineral cubes cut for laboratory analysis. Density measurements help identify rock types, mineral composition, and porosity for geological surveys and mining operations.</li>
          <li><strong>Polymer and Composite Research:</strong> Material scientists develop new plastics and composites by varying composition. Cube samples provide standardized geometry for density measurements to correlate with mechanical properties.</li>
          <li><strong>Food Industry:</strong> Density testing of cheese, butter, and other foods processed into cubic shapes ensures consistency and quality. Deviations indicate incorrect moisture content or composition.</li>
          <li><strong>Building Materials:</strong> Insulation cubes, foam samples, and lightweight construction materials tested for density to verify thermal properties and structural performance.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Material Densities for Cubes">
        <p>
          Understanding typical material densities helps with material identification and quality verification:
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Metals (kg/m³)</h3>
        <ul>
          <li><strong>Aluminum:</strong> 2700 kg/m³ (lightweight, corrosion-resistant, used in aerospace and automotive)</li>
          <li><strong>Steel (mild):</strong> 7850 kg/m³ (most common structural metal, high strength)</li>
          <li><strong>Stainless Steel:</strong> 8000 kg/m³ (corrosion-resistant steel alloy)</li>
          <li><strong>Copper:</strong> 8960 kg/m³ (excellent electrical conductor, reddish color)</li>
          <li><strong>Brass:</strong> 8500 kg/m³ (copper-zinc alloy, yellowish color)</li>
          <li><strong>Iron (pure):</strong> 7874 kg/m³ (base metal for steel)</li>
          <li><strong>Lead:</strong> 11340 kg/m³ (very dense, used for radiation shielding)</li>
          <li><strong>Gold:</strong> 19320 kg/m³ (precious metal, extremely dense)</li>
          <li><strong>Silver:</strong> 10490 kg/m³ (precious metal, best electrical conductor)</li>
          <li><strong>Titanium:</strong> 4506 kg/m³ (high strength-to-weight ratio, aerospace applications)</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Woods (kg/m³)</h3>
        <ul>
          <li><strong>Balsa:</strong> 170 kg/m³ (lightest commercial wood, model building)</li>
          <li><strong>Pine:</strong> 500 kg/m³ (softwood, common construction lumber)</li>
          <li><strong>Oak:</strong> 750 kg/m³ (hardwood, furniture and flooring)</li>
          <li><strong>Maple:</strong> 705 kg/m³ (hardwood, flooring and cabinets)</li>
          <li><strong>Teak:</strong> 630 kg/m³ (water-resistant, outdoor furniture)</li>
          <li><strong>Mahogany:</strong> 550 kg/m³ (hardwood, fine furniture)</li>
          <li><strong>Ebony:</strong> 1200 kg/m³ (very dense hardwood, musical instruments)</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Plastics and Polymers (kg/m³)</h3>
        <ul>
          <li><strong>PVC (Polyvinyl Chloride):</strong> 1380 kg/m³ (pipes, construction)</li>
          <li><strong>Polystyrene:</strong> 1050 kg/m³ (packaging, insulation)</li>
          <li><strong>Nylon:</strong> 1150 kg/m³ (mechanical parts, textiles)</li>
          <li><strong>Acrylic (PMMA):</strong> 1180 kg/m³ (transparent sheets, displays)</li>
          <li><strong>HDPE (High-Density Polyethylene):</strong> 950 kg/m³ (bottles, containers)</li>
          <li><strong>LDPE (Low-Density Polyethylene):</strong> 920 kg/m³ (flexible films, bags)</li>
          <li><strong>Polypropylene:</strong> 900 kg/m³ (automotive parts, packaging)</li>
          <li><strong>Teflon (PTFE):</strong> 2200 kg/m³ (non-stick coatings, high temperature)</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Construction Materials (kg/m³)</h3>
        <ul>
          <li><strong>Concrete (normal):</strong> 2400 kg/m³ (most common construction material)</li>
          <li><strong>Concrete (lightweight):</strong> 1800 kg/m³ (insulation, reduced weight)</li>
          <li><strong>Concrete (high-strength):</strong> 2500 kg/m³ (structural applications)</li>
          <li><strong>Glass (window):</strong> 2500 kg/m³ (silica-based, transparent)</li>
          <li><strong>Brick (clay):</strong> 1920 kg/m³ (construction, masonry)</li>
          <li><strong>Granite:</strong> 2700 kg/m³ (igneous rock, countertops, construction)</li>
          <li><strong>Marble:</strong> 2700 kg/m³ (metamorphic rock, decoration, sculpture)</li>
          <li><strong>Limestone:</strong> 2600 kg/m³ (sedimentary rock, construction)</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Other Materials (kg/m³)</h3>
        <ul>
          <li><strong>Ice:</strong> 917 kg/m³ (frozen water, less dense than liquid water)</li>
          <li><strong>Rubber (natural):</strong> 1100 kg/m³ (tires, seals)</li>
          <li><strong>Cork:</strong> 240 kg/m³ (low density, flooring, insulation)</li>
          <li><strong>Foam (polyurethane):</strong> 30-80 kg/m³ (insulation, cushioning)</li>
          <li><strong>Carbon Fiber Composite:</strong> 1600 kg/m³ (high strength, low weight)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Density Units and Conversions">
        <p>
          Density can be expressed in various units depending on region and application. Understanding conversions is essential:
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">SI Units (Metric System)</h3>
        <ul>
          <li><strong>kg/m³ (kilogram per cubic meter):</strong> Standard SI unit for density. Most scientific and engineering applications use this unit.</li>
          <li><strong>g/cm³ (gram per cubic centimeter):</strong> Common in chemistry and materials science. Conversion: 1 g/cm³ = 1000 kg/m³. Water has density ≈ 1 g/cm³.</li>
          <li><strong>kg/L (kilogram per liter):</strong> Used for liquids and bulk materials. Conversion: 1 kg/L = 1000 kg/m³ (equivalent to g/cm³).</li>
          <li><strong>g/L (gram per liter):</strong> Used for gases and low-density materials. Conversion: 1 g/L = 1 kg/m³.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Imperial/US Units</h3>
        <ul>
          <li><strong>lb/ft³ (pound per cubic foot):</strong> Common in US construction and engineering. Conversion: 1 lb/ft³ = 16.0185 kg/m³.</li>
          <li><strong>lb/in³ (pound per cubic inch):</strong> Used for small, dense objects. Conversion: 1 lb/in³ = 27679.9 kg/m³.</li>
          <li><strong>lb/gal (pound per gallon):</strong> Used for liquids in US. Conversion: 1 lb/gal (US) = 119.826 kg/m³.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Quick Conversion Reference</h3>
        <ul>
          <li>kg/m³ to g/cm³: divide by 1000</li>
          <li>g/cm³ to kg/m³: multiply by 1000</li>
          <li>lb/ft³ to kg/m³: multiply by 16.0185</li>
          <li>kg/m³ to lb/ft³: divide by 16.0185</li>
          <li>lb/in³ to kg/m³: multiply by 27679.9</li>
        </ul>
        <p>
          Our calculator handles all these conversions automatically, allowing you to work in your preferred unit system without manual calculations.
        </p>
      </SEOSection>

      <SEOSection title="Factors Affecting Cube Density Measurements">
        <p>
          Several factors can influence the accuracy of cube density measurements:
        </p>
        <ul>
          <li><strong>Temperature:</strong> Material density changes with temperature due to thermal expansion. Most materials expand when heated (density decreases) and contract when cooled (density increases). Metals typically have expansion coefficients of 10-30 × 10⁻⁶ /°C. Precise measurements require temperature control or correction.</li>
          <li><strong>Moisture Content:</strong> Wood, concrete, and porous materials absorb water, increasing mass and density. Oven-dry density (moisture removed) differs from as-received density. Specify moisture content when reporting wood density.</li>
          <li><strong>Porosity and Voids:</strong> Castings, foams, and sintered materials contain internal voids reducing overall density. Bulk density (including voids) is less than material density (solid phase only). Porosity percentage: P = (1 - ρ_bulk/ρ_solid) × 100%.</li>
          <li><strong>Surface Finish:</strong> Rough surfaces and manufacturing tolerances affect dimension measurements. A cube with 0.1 mm surface roughness on 100 mm sides has ~0.3% volume error. Precision-ground surfaces minimize this error.</li>
          <li><strong>Measurement Accuracy:</strong> Mass measurements require calibrated scales with appropriate resolution (0.01 g for small cubes, 1 g for large cubes). Dimensional measurements require calipers or micrometers (±0.01 mm accuracy minimum).</li>
          <li><strong>Material Homogeneity:</strong> Composites, alloys, and concrete may not be perfectly uniform. Multiple measurements at different locations improve accuracy. Standard deviation indicates material consistency.</li>
          <li><strong>Air Buoyancy:</strong> Objects weighed in air experience upward buoyancy force (F = ρ_air × V × g). For precise density measurements, correct for air buoyancy, especially for low-density materials. Effect is ~0.12% at sea level.</li>
          <li><strong>Pressure:</strong> Gases and compressible materials show significant density changes with pressure. Solids and liquids are nearly incompressible (density change &lt; 0.01% per atmosphere for most materials).</li>
        </ul>
        <p>
          For high-accuracy applications, control these factors and apply appropriate corrections. Our calculator assumes standard conditions (20°C, 1 atm, dry, no voids) unless otherwise noted.
        </p>
      </SEOSection>

      <SEOSection title="Cube Density vs. Other Shapes">
        <p>
          While this calculator focuses on cubes, understanding density calculations for other shapes is valuable:
        </p>
        <ul>
          <li><strong>Cube:</strong> ρ = m/s³. Simple geometry with equal sides. Volume calculation is straightforward. Used for standardized testing and quality control.</li>
          <li><strong>Sphere:</strong> ρ = m / (4πr³/3) = 3m / (4πr³). Requires radius measurement. Minimal surface area for given volume. Used in bearing and projectile applications.</li>
          <li><strong>Cylinder:</strong> ρ = m / (πr²h). Requires radius and height measurements. Common shape for rods, pipes, and containers. Used in compression testing.</li>
          <li><strong>Rectangular Prism:</strong> ρ = m / (l×w×h). Requires length, width, and height measurements. Most common shape for manufactured products.</li>
          <li><strong>Irregular Objects:</strong> Use water displacement (Archimedes' principle) to measure volume. Submerge object in water; volume equals displaced water volume. Density = mass / displaced volume.</li>
        </ul>
        <p>
          Cubes offer advantages for density measurements: simple geometry (single dimension to measure), easy to manufacture with precision, stable (doesn't roll), and standard in many testing protocols (concrete cubes, metal test specimens).
        </p>
      </SEOSection>

      <SEOSection title="Practical Examples and Problem Solving">
        <h3 className="text-lg font-semibold mt-4 mb-2">Example 1: Identifying Unknown Metal Cube</h3>
        <p>
          A machinist finds an unmarked metal cube. Measuring with calipers: side length = 5.0 cm. Weighing on a precision scale: mass = 1080 g. What is the metal?
        </p>
        <p>
          <strong>Solution:</strong> Convert to SI units: s = 0.05 m, m = 1.08 kg. Calculate density: ρ = m/s³ = 1.08/(0.05)³ = 1.08/0.000125 = 8640 kg/m³. Comparing to material densities: closest match is brass (8500 kg/m³) or bronze (8800 kg/m³). The cube is likely a copper alloy (brass or bronze).
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Example 2: Concrete Cube Test</h3>
        <p>
          A concrete cube cured for 28 days has dimensions 150 mm × 150 mm × 150 mm and mass 8.1 kg. Calculate density and verify quality.
        </p>
        <p>
          <strong>Solution:</strong> s = 0.15 m, m = 8.1 kg. Density: ρ = 8.1/(0.15)³ = 8.1/0.003375 = 2400 kg/m³. This matches normal concrete density (2300-2500 kg/m³), indicating proper mix proportions and adequate curing. Density below 2300 kg/m³ would suggest excess water or voids; above 2500 kg/m³ might indicate heavy aggregate or insufficient air content.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Example 3: Shipping Cost Calculation</h3>
        <p>
          A company ships oak wood cubes. Each cube has 30 cm sides. Oak density is 750 kg/m³. What is the mass of each cube for freight cost estimation?
        </p>
        <p>
          <strong>Solution:</strong> s = 0.30 m, ρ = 750 kg/m³. Mass: m = ρ × s³ = 750 × (0.30)³ = 750 × 0.027 = 20.25 kg. Each cube weighs about 20.3 kg. For 100 cubes: total mass = 2025 kg ≈ 2 metric tons, allowing accurate freight quotes.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">Example 4: Designing Aluminum Cube</h3>
        <p>
          An engineer needs to design an aluminum cube (ρ = 2700 kg/m³) with mass exactly 5 kg for a calibration standard. What should the side length be?
        </p>
        <p>
          <strong>Solution:</strong> m = 5 kg, ρ = 2700 kg/m³. Side length: s = ∛(m/ρ) = ∛(5/2700) = ∛(0.001852) = 0.1228 m = 122.8 mm. The cube should be machined to 122.8 mm sides (allowing for final finishing to achieve exactly 5 kg).
        </p>
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          For comprehensive density and geometry calculations, explore these related tools:
        </p>
        <ul>
          <li>{createInternalLink('density-mass-volume-calculator')} - General density calculations for any shape</li>
          <li>{createInternalLink('volume-of-hemisphere')} - Volume calculations for hemispheres</li>
          <li>{createInternalLink('water-density-calculator')} - Water density at various temperatures</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is the formula for cube density?",
            answer: "The cube density formula is ρ = m/s³, where ρ is density (kg/m³), m is mass (kg), and s is the side length (m). Since cube volume V = s³, density equals mass divided by side length cubed. This can be rearranged to find mass (m = ρ × s³) or side length (s = ∛(m/ρ))."
          },
          {
            question: "How do you calculate the mass of a cube if you know density and side length?",
            answer: "To find cube mass, use the formula m = ρ × s³. First, calculate volume by cubing the side length (V = s³). Then multiply density by volume to get mass. For example, an aluminum cube (ρ = 2700 kg/m³) with 0.1 m sides has mass m = 2700 × (0.1)³ = 2700 × 0.001 = 2.7 kg."
          },
          {
            question: "Why is cube density important in construction?",
            answer: "Cube density testing is the standard method for concrete quality control. Concrete samples are cast in 150mm cubes, cured for 28 days, then weighed and measured to calculate density. Proper density (2300-2500 kg/m³ for normal concrete) indicates correct mix proportions, adequate compaction, and proper curing. Deviations signal quality issues like excess water, insufficient cement, or internal voids."
          },
          {
            question: "How does cube density differ from sphere density?",
            answer: "The calculation method differs due to different volume formulas. Cube density uses ρ = m/s³ (where s is side length), while sphere density uses ρ = 3m/(4πr³) (where r is radius). For the same material, density values are identical, but the geometry affects how you measure and calculate. Cubes are easier to manufacture precisely and measure accurately, making them preferred for standardized testing."
          },
          {
            question: "What are common cube density units?",
            answer: "Common density units include: kg/m³ (SI standard, science and engineering), g/cm³ (chemistry, materials science, equivalent to 1000 kg/m³), lb/ft³ (US construction, 1 lb/ft³ = 16.0185 kg/m³), and kg/L (liquids, equivalent to g/cm³). Water has density of approximately 1000 kg/m³ or 1 g/cm³ at 4°C, serving as a convenient reference."
          },
          {
            question: "How do you identify a material from its cube density?",
            answer: "Measure the cube's mass using a precision scale and its side length using calipers. Calculate density using ρ = m/s³. Compare the result to known material densities: aluminum ≈ 2700 kg/m³, steel ≈ 7850 kg/m³, copper ≈ 8960 kg/m³, concrete ≈ 2400 kg/m³, etc. The closest match identifies the material, though alloys and composites may require additional testing for precise identification."
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
