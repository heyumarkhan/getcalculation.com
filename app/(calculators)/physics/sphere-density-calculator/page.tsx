import SphereDensityCalculator from '../../../_components/calculators/SphereDensityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata = {
  title: 'Sphere Density Calculator: Calculate Density, Mass, Radius',
  description: 'Calculate sphere density, mass, radius, or volume. Free online calculator for spherical object properties with step-by-step solutions.',
  keywords: ['sphere density calculator', 'density of sphere', 'calculate sphere density', 'sphere mass calculator', 'sphere volume', 'sphere radius calculator', 'density formula', 'spherical objects', 'physics calculator'],
  openGraph: {
    title: 'Sphere Density Calculator',
    description: 'Calculate density, mass, radius, or volume of spheres with our free online calculator.',
    url: 'https://getcalculation.com/physics/sphere-density-calculator',
    siteName: 'GetCalculation.com',
    locale: 'en_US',
    type: 'website'
  }
};

export default function SphereDensityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Sphere Density Calculator: Calculate Sphere Properties (ρ = m/V)"
      description="Calculate sphere density, mass, radius, or volume using ρ = m/V formula. Supports multiple units for comprehensive sphere calculations."
      calculator={<SphereDensityCalculator />}
      slug="physics/sphere-density-calculator"
      category="Physics"
      features={[
        "Calculate density, mass, radius, or volume instantly",
        "Multiple unit support (kg/m³, g/cm³, lb/ft³)",
        "Step-by-step formula breakdown",
        "Instant results with accurate conversions",
        "Free and easy to use"
      ]}
    >
      <SEOSection title="Why Calculating the Density of a Sphere Matters">
        <p>
          Every day, engineers designing pressure vessels, materials scientists verifying alloy composition, and students studying physics face the same challenge: determining the density of spherical objects from limited measurements. When you hold a solid steel ball bearing, a hollow plastic sphere, or a marble, how do you calculate its density without specialized lab equipment? The answer lies in the fundamental relationship between mass, volume, and density—but for spheres, the volume calculation V = (4/3)πr³ adds mathematical complexity that stops many people in their tracks.
        </p>
        <p>
          Sphere density calculations are critical for real-world applications: aerospace engineers need to verify the density of spherical fuel tanks to ensure weight budgets, {createInternalLink('buoyancy-calculator', 'buoyancy calculations')} rely on accurate density to predict whether submersible floats will sink or rise, and quality control inspectors use density measurements to detect manufacturing defects in ball bearings and spherical components. When pharmaceutical companies develop gel capsules or food manufacturers design spherical candies, knowing the exact {createInternalLink('density-mass-volume-calculator', 'relationship between density, mass, and volume')} determines whether products meet specifications. Our calculator eliminates the tedious arithmetic, unit conversions, and formula rearrangements, giving you instant results for any combination of known parameters.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter any two known values—choose from density, mass, radius, or volume—and select the appropriate units from the dropdown menus (kg/m³, g/cm³, lb/ft³ for density; kg, g, lb for mass; m, cm, mm, in for radius).</li>
          <li><strong>Step 2:</strong> Click the Calculate button and the calculator automatically solves the sphere volume formula V = (4/3)πr³ and applies ρ = m/V to find all missing properties.</li>
          <li><strong>Step 3:</strong> Review your results including density, mass, radius, volume, diameter, and surface area—all displayed with proper units and ready for your engineering, science, or educational applications.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Density of a Sphere Formula">
        <p>
          The density of a sphere combines two fundamental physics formulas: the definition of density (ρ = m/V) and the volume of a sphere (V = (4/3)πr³). Density measures how much mass is packed into each unit of volume, expressed in kg/m³, g/cm³, or lb/ft³. For any solid sphere, once you know two parameters—such as mass and radius—you can calculate all other properties.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p className="font-semibold text-center">Sphere Density Formulas:</p>
          <p className="font-mono text-lg font-bold text-center mt-2">ρ = m / V</p>
          <p className="font-mono text-lg font-bold text-center">V = (4/3)πr³</p>
          <p className="text-sm text-gray-600 text-center mt-2">Where: ρ = density, m = mass, V = volume, r = radius</p>
          <p className="text-sm mt-3"><strong>Rearranged forms:</strong></p>
          <p className="text-sm">• Mass: m = ρ × V = ρ × (4/3)πr³</p>
          <p className="text-sm">• Radius: r = ∛(3m / 4πρ)</p>
          <p className="text-sm">• Volume: V = m / ρ</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          A solid aluminum sphere has a radius of 5 cm and a mass of 1.413 kg. Calculate its density and verify the material composition.
        </p>
        <ul>
          <li><strong>Given:</strong> Radius r = 5 cm = 0.05 m; Mass m = 1.413 kg</li>
          <li><strong>Step 1 – Calculate volume:</strong> V = (4/3)πr³ = (4/3) × π × (0.05)³ = (4/3) × π × 0.000125 = 0.0005236 m³</li>
          <li><strong>Step 2 – Calculate density:</strong> ρ = m / V = 1.413 kg / 0.0005236 m³ = 2,698 kg/m³</li>
          <li><strong>Step 3 – Convert to common units:</strong> 2,698 kg/m³ = 2.698 g/cm³</li>
          <li><strong>Result:</strong> The calculated density of <strong>2,698 kg/m³ (2.7 g/cm³)</strong> matches the known density of aluminum (2,700 kg/m³), confirming the sphere is pure aluminum. This technique is used daily in quality control to verify material composition and detect counterfeit metals.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Sphere density calculations are essential across multiple industries:</p>
        <SEOList items={[
          "<strong>Material Science & Quality Control:</strong> Verify composition and purity of metal spheres, ball bearings, and spherical components by comparing measured density to reference values—detect counterfeits, alloy errors, or internal voids.",
          "<strong>Aerospace & Marine Engineering:</strong> Calculate weight budgets for spherical fuel tanks, design buoyant floats for oceanographic instruments, and optimize mass distribution in spherical satellites and deep-sea pressure vessels.",
          "<strong>Pharmaceutical & Food Manufacturing:</strong> Ensure gel capsules, spherical tablets, and candy coatings meet density specifications for dissolution rates, flotation in liquids, and consistent dosing.",
          "<strong>Sports Equipment Design:</strong> Engineer balls (golf, bowling, basketball) with precise density profiles to achieve desired bounce, flight characteristics, and regulatory compliance.",
          "<strong>Planetary Science & Astronomy:</strong> Estimate internal composition of planets, moons, and asteroids by measuring mass (from orbital mechanics) and radius (from telescopic observations) to calculate bulk density.",
          "<strong>Educational Physics Labs:</strong> Teach students the relationship between mass, volume, and density through hands-on measurements of spheres made from different materials."
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "How do you calculate the density of a sphere?",
            answer: "Calculate the sphere's volume using V = (4/3)πr³, measure or obtain the mass, then divide: density ρ = mass / volume. For example, a sphere with radius 10 cm (0.1 m) has volume 0.00419 m³. If its mass is 11.3 kg, the density is 11.3 / 0.00419 = 2,698 kg/m³ (aluminum)."
          },
          {
            question: "What is the formula for sphere density?",
            answer: "The sphere density formula combines ρ = m/V with the sphere volume V = (4/3)πr³, giving ρ = m / [(4/3)πr³] or equivalently ρ = 3m / (4πr³). This relates density directly to mass and radius."
          },
          {
            question: "Can I calculate sphere radius if I know density and mass?",
            answer: "Yes. Rearrange the formulas to get r = ∛(3m / 4πρ). For example, an iron sphere (ρ = 7,874 kg/m³) with mass 10 kg has radius r = ∛(3×10 / 4π×7874) = ∛(0.000302) = 0.0671 m = 6.71 cm."
          },
          {
            question: "What are typical sphere density values for common materials?",
            answer: "Common densities: aluminum 2,700 kg/m³, steel 7,850 kg/m³, copper 8,960 kg/m³, lead 11,340 kg/m³, gold 19,300 kg/m³, water 1,000 kg/m³, and plastics 900-1,400 kg/m³. These values help identify unknown sphere materials."
          },
          {
            question: "Why does sphere density matter for buoyancy?",
            answer: "A sphere floats if its density is less than the fluid's density (e.g., wood sphere in water: 600 kg/m³ < 1,000 kg/m³ floats). A steel sphere (7,850 kg/m³) sinks because it's denser than water. Buoyancy force equals the weight of displaced fluid."
          }
        ]}
      />

      <SEOSection title="Conclusion">
        <p>
          Mastering the density of a sphere is straightforward with the right tools—our calculator handles the complex volume formula V = (4/3)πr³ and density relationship ρ = m/V so you can focus on your engineering, research, or educational goals. Whether you're verifying material composition in quality control, designing spherical pressure vessels, or teaching physics concepts, instant accurate calculations save time and eliminate arithmetic errors. The ability to work backward from any two known parameters—finding radius from density and mass, or calculating mass from radius and density—makes this tool invaluable for real-world problem-solving.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('volume-to-mass-calculator', 'Volume to Mass Calculator')} for converting between volume and mass using density, perfect for complementing your sphere density calculations. Start calculating sphere density today and unlock precise material insights!
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
