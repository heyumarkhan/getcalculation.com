import APIGravityCalculator from '../../../_components/calculators/APIGravityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata = {
  title: 'API Gravity Calculator: Calculate Oil Density and Gravity Degree',
  description: 'Calculate API gravity, specific gravity, and petroleum density. Free online calculator for oil and crude oil properties with step-by-step solutions.',
  keywords: ['API gravity calculator', 'calculate API gravity', 'specific gravity calculator', 'oil gravity', 'petroleum density', 'crude oil calculator', 'API degree', 'oil density calculator', 'petroleum properties', 'oil classification'],
  openGraph: {
    title: 'API Gravity Calculator',
    description: 'Calculate API gravity and oil density with our free online calculator.',
    url: 'https://getcalculation.com/physics/api-gravity-calculator',
    siteName: 'GetCalculation.com',
    locale: 'en_US',
    type: 'website'
  }
};

export default function APIGravityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="API Gravity Calculator: Calculate Oil Gravity (API = (141.5/SG) - 131.5)"
      description="Calculate API gravity from specific gravity or density. Supports oil classification and petroleum property calculations."
      calculator={<APIGravityCalculator />}
      slug="physics/api-gravity-calculator"
      category="Fluid Mechanics"
      features={[
        "Calculate API gravity from specific gravity",
        "Calculate specific gravity from API gravity",
        "Calculate density from API gravity",
        "Automatic oil classification by gravity",
        "Multiple density units (kg/m³, g/cm³, lb/ft³, lb/gal)",
        "Step-by-step solution breakdown",
        "Industry-standard reference values"
      ]}
    >
      <SEOSection title="Understanding API Gravity: Guide to Petroleum Classification">
        <p>
          API gravity is a measure of how heavy or light a petroleum liquid is compared to water, developed by the American Petroleum Institute. Whether you&apos;re working in the oil and gas industry, trading petroleum products, or conducting scientific research, understanding API gravity is essential. Our API Gravity Calculator makes it easy to calculate API gravity, specific gravity, and density using the fundamental formula: <strong>API = (141.5 / SG) - 131.5</strong>, where SG is specific gravity.
        </p>
        <p>
          API gravity directly determines the quality and value of crude oil. Higher API values indicate lighter, more valuable oils, while lower values indicate heavier, less desirable crudes. The formula cleverly uses water as a reference point: oil with API = 10 has the same density as water, oil with API &gt; 10 floats on water, and oil with API &lt; 10 sinks in water.
        </p>
        <p>
          API gravity is critical for production optimization, refining processes, transportation, pricing, and regulatory compliance. This calculator handles all the complex calculations and unit conversions automatically, supporting various measurement systems used in the global petroleum industry.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the API Gravity Calculator">
        <p>
          Our API Gravity Calculator is designed for simplicity and accuracy:
        </p>
        <ol>
          <li><strong>Enter One Value:</strong> Input either API gravity (°API), specific gravity (SG), or density</li>
          <li><strong>Select Units:</strong> If using density, choose your preferred units</li>
          <li><strong>Click Calculate:</strong> The calculator instantly computes all related values</li>
          <li><strong>Review Results:</strong> See API gravity, specific gravity, density, and oil classification with step-by-step breakdown</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and provides oil classification based on API gravity standards.
        </p>
      </SEOSection>

      <SEOSection title="API Gravity and Specific Gravity Formulas">
        <p>
          The fundamental relationship between API gravity and specific gravity is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">API = (141.5 / SG) - 131.5</p>
          <p className="text-sm text-gray-600 mt-2">Where: API = API gravity in degrees, SG = specific gravity (dimensionless)</p>
        </div>

        <h3>Related Formulas</h3>
        <ul>
          <li><strong>API Gravity:</strong> API = (141.5 / SG) - 131.5</li>
          <li><strong>Specific Gravity:</strong> SG = 141.5 / (API + 131.5)</li>
          <li><strong>Density from SG:</strong> ρ = SG × ρ_water (ρ_water = 999.1 kg/m³ at 15°C)</li>
          <li><strong>SG from Density:</strong> SG = ρ / ρ_water</li>
          <li><strong>API Gravity Definition:</strong> API was designed so water has API = 10 at 60°F (15.6°C)</li>
        </ul>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>API Gravity (°API):</strong> A measure of petroleum density relative to water. Higher values indicate lighter oils. Range: -5 to 100+ for different petroleum products.</li>
          <li><strong>Specific Gravity (SG):</strong> The ratio of oil density to water density. Dimensionless, ranging typically from 0.6 to 1.1 for petroleum products.</li>
          <li><strong>Density (ρ):</strong> Mass per unit volume. For petroleum, typically measured in kg/m³, g/cm³, or lb/gal.</li>
          <li><strong>Reference Water:</strong> Calculations use 999.1 kg/m³ (density of water at 15°C or 60°F, the standard temperature).</li>
        </ul>
      </SEOSection>

      <SEOSection title="Crude Oil Classification by API Gravity">
        <p>
          Crude oils are classified based on API gravity, which directly affects their value, refining process, and market price:
        </p>

        <h3>Oil Grades and Classifications</h3>
        <SEOList items={[
          "Extra Heavy Crude Oil: API &lt; 10 - Sinks in water, difficult to refine, lower value",
          "Heavy Crude Oil: API 10-22 - High viscosity, requires heating for flow, moderate value",
          "Medium Crude Oil: API 22-32 - Balanced properties, common in many fields, good value",
          "Light Crude Oil: API 32-45 - Low viscosity, easy to refine, higher value, preferred by refineries",
          "Extra Light Crude Oil: API &gt; 45 - Lightest crudes, highest value, premium pricing, condensates"
        ]} />

        <h3>Commercial Examples</h3>
        <ul>
          <li><strong>West Texas Intermediate (WTI):</strong> API ~40-41, light sweet crude, benchmark</li>
          <li><strong>Brent Blend:</strong> API ~38, North Sea crude, benchmark for Europe/Asia</li>
          <li><strong>Dubai/Oman Crude:</strong> API ~30-32, medium sweet crude</li>
          <li><strong>OPEC Reference Basket:</strong> API ~30-33, average crude blend</li>
          <li><strong>Canadian Heavy Crude:</strong> API ~8-15, extra heavy, discounted pricing</li>
          <li><strong>Venezuelan Heavy Crude:</strong> API ~8-12, extra heavy, below water</li>
          <li><strong>Nigerian Light Sweet:</strong> API ~35-36, light oil, premium pricing</li>
        </ul>
      </SEOSection>

      <SEOSection title="Understanding Oil Density and Market Impact">
        <p>
          API gravity and density directly affect petroleum value and refining economics:
        </p>

        <h3>Why API Gravity Matters</h3>
        <SEOList items={[
          "Price Determination: Higher API gravity commands premium prices in global markets",
          "Refining Efficiency: Light oils (high API) produce more valuable products per barrel",
          "Transportation: Different API gravities require different handling and pipeline equipment",
          "Storage: Oil density affects tank selection, pumping requirements, and mixing compatibility",
          "Product Yield: Light crudes yield more gasoline and diesel; heavy crudes yield more fuel oil",
          "Environmental Concerns: API gravity affects spill behavior, cleanup methods, and environmental impact",
          "Sulfur Content: Often correlates with API gravity; light oils usually have lower sulfur (sweet)"
        ]} />
      </SEOSection>

      <SEOSection title="API Gravity Standards and Reference Values">
        <p>
          The American Petroleum Institute established API gravity standards for petroleum classification:
        </p>

        <h3>Standard Reference Conditions</h3>
        <ul>
          <li><strong>Temperature:</strong> 60°F (15.6°C) - Standard condition for API measurement</li>
          <li><strong>Water Density:</strong> 999.1 kg/m³ at 15°C (reference standard)</li>
          <li><strong>Water API:</strong> Exactly 10°API by definition</li>
          <li><strong>Hydrometer Scale:</strong> Calibrated to 60°F for API measurement</li>
          <li><strong>Range:</strong> Generally -5 to 100, though most petroleum is 5-60°API</li>
        </ul>

        <h3>Temperature Correction</h3>
        <p>
          API gravity changes with temperature. The industry uses correction factors when measuring at temperatures other than 60°F. Lighter oils are more sensitive to temperature changes than heavier oils. Standard corrections are tabulated in ASTM D1250 for precise calculations.
        </p>
      </SEOSection>

      <SEOSection title="Unit Conversions for Petroleum Density">
        <p>
          The calculator supports multiple density units for flexibility:
        </p>

        <h3>Common Density Units</h3>
        <ul>
          <li><strong>kg/m³</strong> - International standard unit, widely used in scientific contexts</li>
          <li><strong>g/cm³</strong> - Common in chemistry and material science</li>
          <li><strong>g/mL</strong> - Equivalent to g/cm³, used in laboratory contexts</li>
          <li><strong>lb/ft³</strong> - Imperial unit, used in North American petroleum industry</li>
          <li><strong>lb/gal (US)</strong> - Common in petroleum trading and specifications</li>
        </ul>

        <h3>Quick Conversion Examples</h3>
        <ul>
          <li>Water (API = 10, SG = 1.0): 999.1 kg/m³ = 1.0 g/cm³ = 62.4 lb/ft³</li>
          <li>Light Oil (API = 40, SG = 0.82): 819 kg/m³ = 0.82 g/cm³ = 51.2 lb/ft³</li>
          <li>Heavy Oil (API = 15, SG = 0.97): 969 kg/m³ = 0.97 g/cm³ = 60.5 lb/ft³</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What does API gravity measure?",
            answer: "API gravity measures how heavy or light petroleum is compared to water. It's based on the specific gravity formula developed by the American Petroleum Institute. Water is defined as API = 10. Oils with API &gt; 10 float on water, while oils with API &lt; 10 sink."
          },
          {
            question: "Why do higher API values indicate better quality oil?",
            answer: "Higher API values (lighter oils) are more valuable because they refine more easily into high-demand products like gasoline and diesel. Light oils typically have lower sulfur content (sweet crude), require less processing, and yield higher volumes of valuable products per barrel."
          },
          {
            question: "What is the relationship between API gravity and specific gravity?",
            answer: "API gravity and specific gravity are inversely related through the formula: API = (141.5 / SG) - 131.5. Higher API gravity means lower specific gravity (lighter oil). For example, API = 10 equals SG = 1.0 (water), and API = 40 equals SG = 0.825 (light oil)."
          },
          {
            question: "How does temperature affect API gravity measurements?",
            answer: "API gravity is standardized at 60°F (15.6°C). Measurements at other temperatures require temperature corrections using standard ASTM tables. Lighter oils are more sensitive to temperature changes than heavier oils. The industry always reports API at 60°F for consistency."
          },
          {
            question: "What is the difference between sweet and sour crude oil?",
            answer: "Sweet crude has low sulfur content (&lt; 0.5%), while sour crude has high sulfur content (&gt; 0.5%). This classification is independent of API gravity but often correlates with it. Light sweet crude commands premium prices. Sour crude requires more expensive desulfurization during refining."
          },
          {
            question: "Can oil with negative API gravity exist?",
            answer: "Yes, oil with API gravity below 0 (negative API) exists but is extremely rare. This would require specific gravity &gt; 1.07, meaning the oil is denser than water. Such oils are extremely heavy bitumens or synthetic crude and are rarely traded commercially."
          }
        ]}
      />

      <SEOSection title="Petroleum Industry Applications">
        <p>
          API gravity is critical across the petroleum value chain:
        </p>
        <SEOList items={[
          "Production Operations: Determining reservoir fluid properties and well performance",
          "Crude Oil Trading: Pricing benchmarks based on API gravity (WTI, Brent, Dubai)",
          "Refinery Planning: Selecting crude blends to optimize product yields",
          "Quality Control: Ensuring crude meets contract specifications",
          "Transportation: Determining pipeline routing and equipment requirements",
          "Environmental Management: Assessing spill behavior and cleanup strategies",
          "Regulatory Compliance: Meeting API and ASTM standards for reporting",
          "Financial Hedging: Using API gravity specifications in futures contracts"
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators and Resources">
        <p>
          For comprehensive petroleum and fluid calculations, explore related tools:
        </p>
        <ul>
          <li>{createInternalLink('density-mass-volume-calculator')} - General density calculations</li>
        </ul>
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The API Gravity Calculator is an essential tool for petroleum professionals, traders, engineers, and students. By understanding API gravity and its relationship to specific gravity and density, you can classify crude oils, predict product yields, and make informed trading decisions. Whether you're analyzing reservoir fluid properties, trading petroleum contracts, or optimizing refinery operations, this calculator provides accurate, instant results with complete step-by-step breakdowns. Explore how API gravity affects petroleum value and properties in the global energy market!
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
