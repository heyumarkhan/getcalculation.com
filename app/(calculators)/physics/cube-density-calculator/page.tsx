import CubeDensityCalculator from '../../../_components/calculators/CubeDensityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
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
      category="Physics"
      features={[
        "Calculate density, mass, or side length instantly",
        "Solve using ρ = m/s³ formula",
        "Multiple unit support (kg/m³, g/cm³, lb/ft³)",
        "Instant results with accurate calculations",
        "Free to use"
      ]}
    >
      <SEOSection title="Why the Cube Density Calculator Is Essential for Material Analysis">
        <p>
          Every metallurgist testing cast metal samples, every construction engineer verifying concrete quality, and every physics student learning fundamental properties faces the same challenge: accurately determining the relationship between a cube's mass, dimensions, and material density. The cube density formula ρ = m/s³ is the cornerstone equation that reveals material identity, detects manufacturing defects, and validates quality standards. Get the calculation wrong, and your metal alloy identification might misclassify expensive copper as brass, your concrete cube test might approve substandard mix that fails under load, or your shipping weight estimates might cause costly freight overcharges.
        </p>
        <p>
          Cube geometry simplifies density measurementsβjust one dimension (side length s) needs measurement rather than three separate dimensions required for rectangular prisms, making cubes the gold standard for standardized material testing worldwide. Construction codes mandate concrete cube tests (typically 150mm cubes) because the {createInternalLink('density-mass-volume-calculator', 'density measurement')} directly correlates with compressive strength and structural integrity. Foundries cast test cubes to detect porosity, verify alloy composition, and ensure casting procedures produce sound metal (a brass cube should measure 8500 kg/m³; deviations indicate zinc content errors or internal voids). Physics laboratories use precision-machined cubes for calibration standards because the simple geometry eliminates measurement uncertainties that plague irregular shapes. Industrial applications include buoyancy calculations for submerged cubic structures, shipping weight verification for cubic packaging, archaeological analysis of cubic artifacts, and polymer research testing sample uniformity. Our calculator eliminates tedious manual calculations, handles complex unit conversions between metric and imperial systems, and instantly solves for any unknown variable (density, mass, or side length) when you provide the other two parametersβso you can focus on material analysis rather than algebraic rearrangements.
        </p>
      </SEOSection>



      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select which variable to solve for (density ρ, mass m, or side length s) and enter the two known values in the appropriate fields with your preferred units.</li>
          <li><strong>Step 2:</strong> Choose your units from the dropdown menus for each parameter (density in kg/m³/g/cm³/lb/ft³, mass in kg/g/lb/oz, length in m/cm/mm/ft/in).</li>
          <li><strong>Step 3:</strong> Click Calculate and review the computed result along with additional properties (volume V = s³ and surface area SA = 6s²) displaying complete cube characterization.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Cube Density Calculator Formula">
        <p>
          The cube density formula ρ = m/s³ combines the fundamental density definition (density = mass/volume) with the cube volume formula (V = s³). Since a cube's volume equals its side length cubed, density equals mass divided by side length cubed: ρ = m/V = m/s³, where ρ is density in kg/m³, m is mass in kg, and s is side length in meters. This relationship can be rearranged to solve for any variable: calculate mass with m = ρ Γ s³ when density and side length are known, or find side length with s = ∛(m/ρ) when mass and density are given. The cube's simple geometry (requiring only one dimension measurement) makes it ideal for standardized material testing compared to irregular shapes requiring complex volume determination.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p className="font-semibold text-center">Cube Density Formula:</p>
          <p className="font-mono text-lg font-bold text-center mt-2">ρ = m / s³</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where: ρ = density (kg/m³), m = mass (kg), s = side length (m)</p>
          <p className="text-sm mt-3"><strong>Rearranged forms:</strong></p>
          <p className="text-sm">&bull; Mass: m = ρ Γ s³</p>
          <p className="text-sm">&bull; Side length: s = ∛(m/ρ)</p>
          <p className="text-sm">&bull; Volume: V = s³</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          A concrete test cube measures 150 mm on each side and has a mass of 8.1 kg after 28-day curing. Calculate its density and verify if it meets quality standards for normal concrete (2300-2500 kg/m³).
        </p>
        <ul>
          <li><strong>Given:</strong> Side length s = 150 mm = 0.15 m, mass m = 8.1 kg</li>
          <li><strong>Step 1 β Calculate volume:</strong> V = s³ = (0.15)³ = 0.003375 m³</li>
          <li><strong>Step 2 β Apply density formula:</strong> ρ = m/V = m/s³ = 8.1/0.003375</li>
          <li><strong>Step 3 β Compute density:</strong> ρ = 2400 kg/m³</li>
          <li><strong>Step 4 β Convert to g/cm³:</strong> ρ = 2400 Γ· 1000 = 2.4 g/cm³</li>
          <li><strong>Result:</strong> The concrete cube has density <strong>2400 kg/m³ (2.4 g/cm³)</strong>, which falls within the acceptable range for normal concrete (2300-2500 kg/m³). This indicates proper mix proportions, adequate compaction during casting, and successful curing. Density below 2300 kg/m³ would suggest excess water content or internal voids (honeycomb defects), while density above 2500 kg/m³ might indicate heavy aggregate or insufficient air content. This standardized cube test is the construction industry's primary quality control method for concrete strength verification.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Cube density calculations are fundamental to material testing and analysis across multiple industries and scientific disciplines:</p>
        <SEOList items={[
          "<strong>Concrete Quality Testing & Construction Standards:</strong> Construction codes worldwide mandate 150mm concrete cube tests for strength verification. After 28-day curing, cubes are weighed and measured to calculate density (target: 2300-2500 kg/m³ for normal concrete). Proper density confirms correct water-cement ratio, adequate compaction, and structural integrity before approving concrete for critical load-bearing applications in buildings, bridges, and infrastructure.",
          "<strong>Metal Foundry Quality Control & Alloy Verification:</strong> Foundries cast test cubes from each batch to verify alloy composition and detect internal defects. Measuring cube density identifies porosity (voids reduce density), incorrect metal ratios (brass at 8500 kg/m³ vs pure copper at 8960 kg/m³), contamination, or casting defects. Deviations trigger batch rejection before expensive machining or customer delivery.",
          "<strong>Material Identification & Forensic Analysis:</strong> Unknown cubic samples (archaeological artifacts, recycled scrap metal, suspect materials) are identified by measuring mass and dimensions, calculating density, and comparing results to reference databases. Metallurgists distinguish titanium (4500 kg/m³) from steel (7850 kg/m³), archaeologists identify ancient bronze compositions, and recyclers sort metal alloys for proper processing.",
          "<strong>Physics Education & Laboratory Experiments:</strong> Students master fundamental density concepts using wooden, metal, plastic, and ceramic cubes. Hands-on measurement with calipers and digital scales, followed by ρ = m/s³ calculations and material identification from reference tables, reinforces theoretical knowledge and develops experimental technique essential for advanced science coursework.",
          "<strong>Shipping Weight Estimation & Freight Cost Calculation:</strong> Logistics managers calculate cubic package weights from known material density and measured dimensions to generate accurate freight quotes, ensure compliance with weight limits, optimize container loading, and prevent costly weight discrepancies at shipping inspection. A 30cm oak cube (750 kg/m³) weighs 20.25 kg, critical for LTL freight classification.",
          "<strong>Precision Calibration Standards & Metrology:</strong> National measurement institutes and calibration laboratories use precision-machined metal cubes (stainless steel, tungsten carbide) as density reference standards. These cubes have tightly controlled dimensions (±0.001 mm) and certified density values used to calibrate density meters, verify measurement procedures, and maintain traceability to international standards."
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is the cube density formula and how do I use it?",
            answer: "The cube density formula is ρ = m/s³, where ρ is density (kg/m³), m is mass (kg), and s is side length (m). To calculate density, measure the cube's mass and side length, then divide mass by side length cubed. For example, a 10 kg cube with 0.2 m sides has density ρ = 10/(0.2)³ = 10/0.008 = 1,250 kg/m³. Rearrange to m = ρ × s³ for mass or s = ∛(m/ρ) for side length."
          },
          {
            question: "Why are cubes used for concrete strength testing?",
            answer: "Cubes are the construction industry standard for concrete testing because their simple geometry (only one dimension to measure) eliminates measurement errors from complex shapes, they're easy to mold in standardized 150mm forms, they don't roll during handling, and density calculation is straightforward (ρ = m/s³). After 28-day curing, proper density (2,300-2,500 kg/m³) directly correlates with compressive strength and confirms quality before structural use."
          },
          {
            question: "How do I identify an unknown metal cube by its density?",
            answer: "Measure the cube's side length precisely with calipers (±0.01 mm accuracy) and mass with a calibrated scale. Calculate density using ρ = m/s³. Compare the result to reference values: aluminum 2,700 kg/m³, steel 7,850 kg/m³, brass 8,500 kg/m³, copper 8,960 kg/m³, lead 11,340 kg/m³. The closest match identifies the material. Deviations suggest alloys, contamination, or internal voids requiring further analysis."
          },
          {
            question: "What density units does this calculator support?",
            answer: "The calculator supports kg/m³ (SI standard for science/engineering), g/cm³ (chemistry and materials science, equals 1,000 kg/m³), lb/ft³ (US construction, 1 lb/ft³ = 16.0185 kg/m³), lb/in³ (dense materials, 1 lb/in³ = 27,680 kg/m³), and kg/L (liquids, equals g/cm³). All conversions are automatic. Water reference: 1,000 kg/m³ = 1 g/cm³ = 62.4 lb/ft³ at 4°C."
          },
          {
            question: "Can I calculate cube side length if I know density and mass?",
            answer: "Yes! Rearrange ρ = m/s³ to solve for side length: s = ∛(m/ρ). For example, if you need a 5 kg aluminum cube (density 2,700 kg/m³), calculate s = ∛(5/2,700) = ∛(0.00185) = 0.123 m = 123 mm. This is essential for designing calibration standards, machining precise test specimens, or determining package dimensions from weight requirements and material properties."
          }
        ]}
      />

      <SEOSection title="Conclusion">
        <p>
          Mastering cube density calculations is straightforward with the right toolsβour calculator handles the algebraic rearrangements and unit conversions so you can focus on material analysis and quality decisions. Whether you're verifying concrete cube tests for construction projects, identifying unknown metal alloys in manufacturing, calculating shipping weights for cubic packages, or teaching fundamental physics concepts in laboratory courses, accurate density calculations prevent costly errors and ensure your materials meet specifications. The ability to quickly solve for any variable (density, mass, or side length) when given the other two parameters makes this tool invaluable for civil engineers, metallurgists, material scientists, quality control technicians, and physics students.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('volume-to-mass-calculator', 'Volume to Mass Calculator')} for complementary calculations converting between volume and mass using density, or understand how density affects flotation with the {createInternalLink('buoyancy-calculator', 'Buoyancy Calculator')} for submerged object analysis. Start solving cube density problems today and unlock precise material characterization!
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
