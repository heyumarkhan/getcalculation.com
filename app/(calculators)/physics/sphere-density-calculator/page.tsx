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
      category="Mechanics"
      features={[
        "Calculate density from mass and volume",
        "Calculate mass from density and volume",
        "Calculate radius and volume from known properties",
        "Multiple unit support for density, mass, and radius",
        "Step-by-step calculation breakdown",
        "Instant results with formula explanations",
        "Mobile-friendly design"
      ]}
    >
      <SEOSection title="Understanding Sphere Density: Complete Guide">
        <p>
          Sphere density is a fundamental property in physics and materials science, representing how much mass is packed into a spherical volume. Whether you&apos;re analyzing astronomical bodies, designing spherical containers, or studying material properties, understanding sphere density is essential. Our Sphere Density Calculator makes it easy to calculate any property of a sphere using the fundamental formula: <strong>ρ = m/V</strong>, where ρ (rho) is density, m is mass, and V is volume.
        </p>
        <p>
          Density plays a crucial role in determining whether objects float or sink, how they interact with their environment, and their structural properties. Different materials have different densities - for example, iron is much denser than aluminum, which affects their weight and load-bearing capacity. Understanding these relationships is essential for engineers, scientists, and students.
        </p>
        <p>
          For spherical objects specifically, the volume formula V = (4/3)πr³ allows us to relate density directly to the radius of the sphere. This calculator handles all the complex unit conversions and calculations for you, supporting various measurement systems used worldwide.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Sphere Density Calculator">
        <p>
          Our Sphere Density Calculator is designed for ease of use with powerful functionality:
        </p>
        <ol>
          <li><strong>Enter Values:</strong> Input any two of the four values (density, mass, radius, or volume)</li>
          <li><strong>Select Units:</strong> Choose appropriate units for each measurement from the dropdown menus</li>
          <li><strong>Click Calculate:</strong> The calculator instantly computes missing values and volume</li>
          <li><strong>Review Results:</strong> See all calculated properties with step-by-step solution breakdown</li>
        </ol>
        <p>
          The calculator handles the complex mathematics automatically, including sphere volume calculation and unit conversions, giving you accurate results instantly.
        </p>
      </SEOSection>

      <SEOSection title="Sphere Density Formula and Related Equations">
        <p>
          The fundamental relationship for calculating sphere density is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">ρ = m / V</p>
          <p className="text-sm text-gray-600 mt-2">Where: ρ = density, m = mass, V = volume</p>
        </div>

        <h3>Related Formulas</h3>
        <ul>
          <li><strong>Density:</strong> ρ = m / V</li>
          <li><strong>Mass:</strong> m = ρ × V</li>
          <li><strong>Volume (Sphere):</strong> V = (4/3)πr³</li>
          <li><strong>Radius from Volume:</strong> r = ∛(3V / 4π)</li>
          <li><strong>Diameter:</strong> d = 2r</li>
          <li><strong>Surface Area:</strong> A = 4πr²</li>
        </ul>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Density (ρ):</strong> Mass per unit volume, typically measured in kg/m³, g/cm³, or lb/ft³. It indicates how tightly packed the material is.</li>
          <li><strong>Mass (m):</strong> The amount of matter in the object, typically measured in kilograms, grams, or pounds.</li>
          <li><strong>Volume (V):</strong> The amount of three-dimensional space occupied by the sphere, calculated using the radius.</li>
          <li><strong>Radius (r):</strong> The distance from the center of the sphere to its surface, critical for volume calculations.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Sphere Density Values">
        <p>
          Different materials have vastly different densities. Here are typical density values for common materials:
        </p>

        <h3>Metals and Minerals</h3>
        <SEOList items={[
          "Aluminum: 2,700 kg/m³ - Lightweight metal used in aerospace",
          "Iron: 7,874 kg/m³ - Heavy metal used in construction and machinery",
          "Copper: 8,960 kg/m³ - Dense metal used in electrical applications",
          "Lead: 11,340 kg/m³ - Very dense metal used in radiation shielding",
          "Gold: 19,300 kg/m³ - Precious metal with highest density among common metals",
          "Platinum: 21,450 kg/m³ - Extremely dense noble metal"
        ]} />

        <h3>Common Materials</h3>
        <SEOList items={[
          "Water: 1,000 kg/m³ - Standard reference density at 4°C",
          "Ice: 917 kg/m³ - Less dense than water, which is why it floats",
          "Wood: 400-900 kg/m³ - Varies by type (pine to oak)",
          "Concrete: 2,300-2,400 kg/m³ - Heavy construction material",
          "Plastic: 900-1,200 kg/m³ - Lightweight polymer material",
          "Glass: 2,500-2,800 kg/m³ - Dense silicate material"
        ]} />

        <h3>Gases (at standard conditions)</h3>
        <SEOList items={[
          "Air: 1.225 kg/m³ - Standard atmosphere at sea level",
          "Hydrogen: 0.0899 kg/m³ - Lightest known gas",
          "Helium: 0.1785 kg/m³ - Noble gas, lighter than air",
          "Nitrogen: 1.251 kg/m³ - Main component of air",
          "Carbon Dioxide: 1.977 kg/m³ - Denser than air"
        ]} />
      </SEOSection>

      <SEOSection title="Practical Applications of Sphere Density">
        <p>
          Understanding sphere density is crucial in numerous real-world applications:
        </p>
        <SEOList items={[
          "Material Science: Determining purity and composition of materials",
          "Aerospace Engineering: Calculating weight and balance of spherical tanks and components",
          "Marine Engineering: Designing buoyant spheres and understanding flotation",
          "Planetary Science: Estimating composition of planets and stars",
          "Oil and Gas Industry: Designing spherical pressure vessels",
          "Manufacturing: Quality control and material verification",
          "Medical Physics: Calculating radiation absorption in spherical tissues",
          "Environmental Science: Understanding settling rates of particles in water",
          "Sports Engineering: Designing balls with specific density requirements",
          "Architecture: Structural analysis of spherical domes and shells"
        ]} />
      </SEOSection>

      <SEOSection title="Unit Conversions for Sphere Density">
        <p>
          The calculator supports multiple unit systems for maximum flexibility:
        </p>

        <h3>Density Units</h3>
        <ul>
          <li><strong>kg/m³</strong> - International standard unit (SI)</li>
          <li><strong>g/cm³</strong> - Common in chemistry and materials science</li>
          <li><strong>lb/ft³</strong> - Imperial system, common in USA</li>
          <li><strong>lb/in³</strong> - Used in compact materials and precision engineering</li>
        </ul>

        <h3>Mass Units</h3>
        <ul>
          <li><strong>kg</strong> - Kilogram (SI base unit)</li>
          <li><strong>g</strong> - Gram (1/1000 kilogram)</li>
          <li><strong>lb</strong> - Pound mass (imperial)</li>
          <li><strong>oz</strong> - Ounce (imperial)</li>
        </ul>

        <h3>Radius Units</h3>
        <ul>
          <li><strong>m</strong> - Meters (SI base unit)</li>
          <li><strong>cm</strong> - Centimeters (1/100 meter)</li>
          <li><strong>mm</strong> - Millimeters (1/1000 meter)</li>
          <li><strong>in</strong> - Inches (imperial)</li>
          <li><strong>ft</strong> - Feet (imperial)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Why Density Matters for Spheres">
        <p>
          Sphere density is important because it determines:
        </p>
        <ul>
          <li><strong>Buoyancy:</strong> Objects denser than a fluid sink; less dense objects float</li>
          <li><strong>Weight Distribution:</strong> Affects how forces are distributed in spherical structures</li>
          <li><strong>Heat Capacity:</strong> Denser materials typically have different thermal properties</li>
          <li><strong>Structural Integrity:</strong> Density affects strength and durability of materials</li>
          <li><strong>Collisions:</strong> Density affects impact force and energy absorption</li>
          <li><strong>Pressure Vessels:</strong> Critical for designing safe spherical containers</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "How do I calculate the volume of a sphere?",
            answer: "The volume of a sphere is calculated using V = (4/3)πr³, where r is the radius. Our calculator handles this automatically once you input the radius."
          },
          {
            question: "What are common sphere density values?",
            answer: "Common materials: Water (1,000 kg/m³), Aluminum (2,700 kg/m³), Iron (7,874 kg/m³), Copper (8,960 kg/m³), and Gold (19,300 kg/m³). The calculator shows how mass and volume relate for any density."
          },
          {
            question: "Can I use different units in the calculator?",
            answer: "Yes! The calculator supports multiple units for density (kg/m³, g/cm³, lb/ft³, lb/in³), mass (kg, g, lb, oz), and radius (m, cm, mm, in, ft). Select your preferred units from the dropdowns."
          },
          {
            question: "What is the difference between density and specific gravity?",
            answer: "Density is mass per unit volume. Specific gravity is the ratio of a material's density to the density of water. Specific gravity is dimensionless, while density has units."
          },
          {
            question: "How do I find the radius if I know density and mass?",
            answer: "Use the formula: r = ∛(3m / 4πρ). Simply enter density and mass into the calculator, and it automatically calculates the radius and volume."
          },
          {
            question: "Why would I need a sphere density calculator?",
            answer: "It's useful for engineering design, material verification, scientific research, educational purposes, and any application involving spherical objects where you need to relate density, mass, radius, and volume."
          }
        ]}
      />

      <SEOSection title="Advanced Topics in Sphere Density">
        <h3>Composite Spheres</h3>
        <p>
          Some spheres have multiple layers with different densities. For example, the Earth has a dense iron core, rocky mantle, and thin crust. For composite spheres, the overall density depends on the relative volumes and densities of each layer. This calculator handles homogeneous (single-material) spheres.
        </p>

        <h3>Density and Temperature</h3>
        <p>
          Most materials change density with temperature. As materials heat up, they usually expand, decreasing density. This thermal expansion is critical in applications like thermal stress analysis and precision manufacturing.
        </p>

        <h3>Apparent vs. Bulk Density</h3>
        <p>
          Bulk density includes any air gaps or pores in a material. Material density (or true density) is calculated without these voids. Porous materials have lower bulk density than their true material density. This calculator uses the bulk density approach for practical applications.
        </p>
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          For comprehensive physics calculations, explore related tools:
        </p>
        <ul>
          <li>{createInternalLink('volume-of-hemisphere')} - Calculate volume from radius</li>
          <li>{createInternalLink('density-mass-volume-calculator')} - General density calculations</li>
          <li>{createInternalLink('water-density-calculator')} - Specific to water at various temperatures</li>
        </ul>
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The Sphere Density Calculator is an essential tool for anyone working with spherical objects, from students learning physics to engineers designing precision equipment. By understanding the relationship between density, mass, radius, and volume, you can solve complex problems and make informed decisions about material selection and design. Whether you're calculating the properties of a solid sphere or analyzing material characteristics, this calculator provides accurate, instant results with complete step-by-step breakdown of calculations. Try it today and explore the fascinating world of sphere density!
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
