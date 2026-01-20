import DensityOfCylinderCalculator from '../../../_components/calculators/DensityOfCylinderCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function DensityOfCylinderCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Density of a Cylinder Calculator: Material Density and Volume Calculations"
      description="Calculate cylinder density from mass and volume, or find mass and volume from density. Includes cylinder volume from radius and height dimensions."
      calculator={<DensityOfCylinderCalculator />}
      slug="physics/density-of-cylinder-calculator"
      category="Mechanics"
      features={[
        "Calculate density from mass and volume for cylindrical objects",
        "Find mass from density and volume values",
        "Determine volume from density and mass measurements",
        "Calculate cylinder volume from radius and height dimensions",
        "Support for multiple unit systems (metric, imperial, metric mass units)",
        "Convert between kg/m³, g/cm³, lb/in³, and other density units",
        "Instant calculations with step-by-step formulas"
      ]}
    >
      <SEOSection title="Understanding Cylinder Density Calculations">
        <p>
          The <strong>Density of a Cylinder Calculator</strong> is an essential tool for materials science, engineering, and physics applications. <strong>Density</strong> represents how much mass is contained within a given volume—a fundamental material property that determines whether objects float or sink, and how they behave under pressure. For cylindrical objects, calculating density from mass and volume, or determining unknown properties from known values, is critical for quality control, material identification, and engineering design.
        </p>
        <p>
          This calculator provides multiple methods for analyzing cylindrical objects: calculating density from measured mass and volume, determining mass from density and volume, finding volume from density and mass, and calculating cylinder volume from geometric dimensions. Whether you are identifying metal composition, designing pressure vessels, or analyzing structural properties, accurate density calculations are essential.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Density of a Cylinder Calculator">
        <p>
          The density of a cylinder calculator offers four flexible calculation methods:
        </p>
        <ol>
          <li><strong>Find Density from Mass & Volume:</strong> Enter the cylinder mass and volume to calculate its density using ρ = m/V</li>
          <li><strong>Find Mass from Density & Volume:</strong> Enter density and volume to determine the cylinder mass using m = ρ × V</li>
          <li><strong>Find Volume from Density & Mass:</strong> Enter density and mass to calculate the volume using V = m/ρ</li>
          <li><strong>Find Cylinder Volume from Dimensions:</strong> Enter radius and height to calculate volume using V = π × r² × h</li>
        </ol>
        <p>
          Select your calculation method, enter the known values in appropriate units, and click Calculate. The calculator instantly provides results with unit conversions and step-by-step formulas for verification.
        </p>
      </SEOSection>

      <SEOSection title="Cylinder Density Formulas">
        <p>
          The density of a cylinder calculator uses fundamental physics and geometry formulas:
        </p>
        
        <h3>1. Density from Mass and Volume</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">ρ = m / V</p>
          <p className="text-sm text-gray-600 mt-2">Where: ρ = density, m = mass (kg), V = volume (m³)</p>
        </div>
        <p>
          Density is calculated by dividing the cylinder mass by its volume. This ratio represents how tightly packed the material is. Higher density indicates more mass in the same volume, characteristic of denser materials like metals.
        </p>

        <h3>2. Mass from Density and Volume</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">m = ρ × V</p>
          <p className="text-sm text-gray-600 mt-2">Where: m = mass (kg), ρ = density (kg/m³), V = volume (m³)</p>
        </div>
        <p>
          Rearranging the density formula, mass equals density multiplied by volume. This calculation is useful when you know the material density and have measured the cylinder volume, needing to find the expected mass for quality verification.
        </p>

        <h3>3. Volume from Density and Mass</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">V = m / ρ</p>
          <p className="text-sm text-gray-600 mt-2">Where: V = volume (m³), m = mass (kg), ρ = density (kg/m³)</p>
        </div>
        <p>
          Volume can be calculated from known mass and material density. This method is useful for determining the volume of irregular-shaped cylinders or verifying cylinder dimensions indirectly through mass measurement.
        </p>

        <h3>4. Cylinder Volume from Geometry</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">V = π × r² × h</p>
          <p className="text-sm text-gray-600 mt-2">Where: V = volume (m³), r = radius (m), h = height (m), π ≈ 3.14159</p>
        </div>
        <p>
          The volume of a cylinder is calculated from its geometric dimensions: the radius and height. The radius is squared and multiplied by π and the height to determine total volume. This formula is used to find cylinder volume from direct measurements before calculating density.
        </p>
      </SEOSection>

      <SEOSection title="Density Values for Common Materials">
        <p>
          The density of common cylindrical materials varies significantly, influencing engineering decisions and material selection:
        </p>
        <table className="w-full border-collapse border border-gray-300 my-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left font-semibold">Material</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Density (kg/m³)</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Density (g/cm³)</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Common Applications</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Water (standard)</td>
              <td className="border border-gray-300 p-2">1,000</td>
              <td className="border border-gray-300 p-2">1.00</td>
              <td className="border border-gray-300 p-2">Reference standard, hydraulic cylinders</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">Aluminum</td>
              <td className="border border-gray-300 p-2">2,700</td>
              <td className="border border-gray-300 p-2">2.70</td>
              <td className="border border-gray-300 p-2">Aircraft components, heat sinks</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Iron/Steel</td>
              <td className="border border-gray-300 p-2">7,850</td>
              <td className="border border-gray-300 p-2">7.85</td>
              <td className="border border-gray-300 p-2">Structural beams, pipe, machinery</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">Copper</td>
              <td className="border border-gray-300 p-2">8,960</td>
              <td className="border border-gray-300 p-2">8.96</td>
              <td className="border border-gray-300 p-2">Electrical wiring, thermal cylinders</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Lead</td>
              <td className="border border-gray-300 p-2">11,340</td>
              <td className="border border-gray-300 p-2">11.34</td>
              <td className="border border-gray-300 p-2">Radiation shielding, weights</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">Titanium</td>
              <td className="border border-gray-300 p-2">4,506</td>
              <td className="border border-gray-300 p-2">4.51</td>
              <td className="border border-gray-300 p-2">Aerospace, medical implants</td>
            </tr>
          </tbody>
        </table>
      </SEOSection>

      <SEOSection title="Applications of Cylinder Density Calculations">
        <SEOList
          items={[
            "Material Identification: Determining material composition by measuring density of cylindrical samples",
            "Quality Control: Verifying cylinder mass and dimensions meet specifications by calculating expected density",
            "Pressure Vessel Design: Calculating wall thickness and material requirements based on density and pressure ratings",
            "Pipeline Engineering: Determining buoyancy and settlement characteristics of cylindrical pipes",
            "Manufacturing: Predicting weight of cylindrical products for shipping, handling, and installation planning",
            "Structural Analysis: Calculating load-bearing capacity based on material density and cross-sectional area",
            "Flotation Calculations: Determining if cylindrical objects float or sink based on density comparison",
            "Thermal Analysis: Predicting heat capacity and thermal conductivity based on material density",
            "Corrosion Studies: Monitoring material degradation by tracking density changes over time",
            "Density Blending: Calculating properties of composite cylinders made from multiple materials"
          ]}
        />
      </SEOSection>

      <SEOSection title="Cylinder Density Calculator Examples">
        <h3>Example 1: Identify Unknown Metal Cylinder</h3>
        <p>
          A metal cylinder has mass 2.5 kg and volume 0.0003175 m³. Calculate its density and identify the material.
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> ρ = m / V = 2.5 kg / 0.0003175 m³ = 7,874 kg/m³ ≈ 7.87 g/cm³
        </p>
        <p>
          This density matches steel/iron (7,850 kg/m³), identifying the cylinder as a steel component. This method is commonly used for material verification in manufacturing and quality control.
        </p>

        <h3>Example 2: Calculate Expected Mass of Aluminum Cylinder</h3>
        <p>
          An aluminum cylinder (ρ = 2,700 kg/m³) has volume 0.0005 m³. What should its mass be?
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> m = ρ × V = 2,700 × 0.0005 = 1.35 kg
        </p>
        <p>
          The expected mass is 1.35 kg. During manufacturing, if the actual mass differs significantly, it indicates either material or dimensional defects requiring investigation.
        </p>

        <h3>Example 3: Calculate Cylinder Volume from Dimensions</h3>
        <p>
          A cylindrical pipe has radius 0.05 m and height 2 m. Calculate its volume, then determine the mass if made of steel.
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> V = π × r² × h = 3.14159 × 0.05² × 2 = 0.01571 m³. Mass = 7,850 × 0.01571 = 123.3 kg
        </p>
        <p>
          The steel pipe has volume 0.01571 m³ and expected mass of 123.3 kg. This calculation is essential for determining pipe handling requirements and support structure sizing.
        </p>
      </SEOSection>

      <SEOSection title="Unit Conversions and Density Relationships">
        <h3>Common Density Unit Conversions</h3>
        <p>
          Density is expressed in various units depending on application and region. The calculator supports multiple conversions:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>1 kg/m³ = 0.001 g/cm³ (metric to metric variant)</li>
          <li>1 g/cm³ = 1,000 kg/m³ (very dense materials)</li>
          <li>1 lb/in³ = 27,679.9 kg/m³ (imperial to metric)</li>
          <li>1 lb/ft³ = 16.0185 kg/m³ (imperial volumetric)</li>
        </ul>

        <h3>Density vs. Specific Gravity</h3>
        <p>
          Specific gravity is the ratio of material density to water density (1,000 kg/m³). A material with specific gravity 2.7 has density 2,700 kg/m³. The calculator provides direct density values; specific gravity can be calculated by dividing the result by 1,000.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "Why is cylinder density important in engineering?",
            answer: "Density determines how much mass is supported by a given volume, crucial for structural calculations, flotation analysis, and material selection. Different materials with the same volume weigh differently based on their density."
          },
          {
            question: "How can I identify an unknown metal cylinder using density?",
            answer: "Measure the cylinder mass and volume (or calculate volume from dimensions). Calculate density using ρ = m/V. Compare the result to known material densities. Each metal has a characteristic density range that aids identification."
          },
          {
            question: "What is the difference between mass and weight?",
            answer: "Mass (kg) is the amount of material, constant everywhere. Weight (N) is the force of gravity on mass, varying with gravity. The calculator uses mass; multiply by 9.81 m/s² to get weight in Newtons."
          },
          {
            question: "How does cylinder diameter affect density calculations?",
            answer: "Diameter does not affect density itself (ρ = m/V is independent of shape). However, for cylindrical calculations, diameter determines volume. The calculator converts radius to volume for density determination."
          },
          {
            question: "Why do some materials float and others sink?",
            answer: "Materials with density less than water (1,000 kg/m³) float. Materials with density greater than water sink. The calculator helps determine if a cylinder will float based on its material density."
          },
          {
            question: "How do I calculate the mass of a cylindrical tank?",
            answer: "First, calculate the cylinder volume from radius and height (V = π × r² × h). Then multiply by the material density (m = ρ × V). This gives the mass of a solid or hollow cylinder depending on which dimensions you use."
          }
        ]}
      />

      <SEOSection title="Conclusion">
        <p>
          The <strong>Density of a Cylinder Calculator</strong> is an indispensable tool for engineers, scientists, and manufacturing professionals. By understanding the relationship between mass, volume, and density, and being able to calculate cylinder volume from geometric dimensions, you can solve a wide range of practical problems from material identification to structural design. Whether you are verifying product specifications, designing equipment, or conducting material analysis, this calculator provides the precise calculations needed for accurate density determinations and material property analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
