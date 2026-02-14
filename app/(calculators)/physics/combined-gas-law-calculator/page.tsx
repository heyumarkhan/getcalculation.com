import CombinedGasLawCalculator from '../../../_components/calculators/CombinedGasLawCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Combined Gas Law Calculator | P₁V₁/T₁ = P₂V₂/T₂';
const description = 'Calculate gas pressure, volume, and temperature changes using the combined gas law formula.';
const keywords = [
  'combined gas law calculator',
  'gas law calculator',
  'ideal gas law calculator',
  'pressure volume temperature calculator',
  'PVT calculator',
  'gas state calculator',
  'thermodynamics calculator',
  'boyle charles law calculator',
  'gas compression calculator',
  'gas expansion calculator',
  'pv=nrt calculator',
  'gas equation calculator',
  'physics gas calculator',
  'chemistry gas law',
  'pressure temperature calculator',
  'volume pressure calculator',
  'combined gas equation',
  'gas properties calculator',
  'thermodynamic state calculator',
  'ideal gas state calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/combined-gas-law-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/combined-gas-law-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function CombinedGasLawCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Combined Gas Law Calculator | Pressure, Volume & Temperature Relations Instantly"
      description="Calculate gas pressure, volume, and temperature changes using the combined gas law formula. Free tool for chemistry, HVAC, and engineering."
      calculator={<CombinedGasLawCalculator />}
      slug="physics/combined-gas-law-calculator"
      category="Physics"
      features={[
        "Pressure, volume, and temperature relationships",
        "Multi-unit support (atm, Pa, bar, psi, K, °C, °F)",
        "Find any unknown variable instantly",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Understanding Combined Gas Law Matters in Real-World Applications">
        <p>
          From scuba diving equipment that must account for pressure changes at depth to HVAC systems that regulate building climate by controlling air temperature and volume, the combined gas law governs the behavior of gases in countless practical scenarios. Engineers designing pneumatic systems must calculate how compressed air expands when pressure drops, preventing system failures and inefficiencies. Chemists performing laboratory experiments need to predict how gases will behave when heated or cooled in sealed containers, ensuring accurate reaction conditions and safety protocols. Weather scientists tracking atmospheric behavior and deep-sea researchers understanding pressure effects on gas-filled equipment all rely on this fundamental relationship between pressure, volume, and temperature. The combined gas law elegantly unifies Boyle's Law (pressure inversely proportional to volume), Charles's Law (volume proportional to temperature), and Gay-Lussac's Law (pressure proportional to temperature) into a single equation that predicts gas state changes across diverse applications. This calculator eliminates hours of manual algebraic manipulation, instantly determining unknown variables when any three of the four parameters (P₁, V₁, T₁, P₂, V₂, T₂) are known. For complementary thermodynamic analysis, explore our {createInternalLink('boyles-law-calculator')} for pressure-volume relationships in isothermal processes.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select which variable you want to calculate: final temperature, final pressure, final volume, or initial volume</li>
          <li><strong>Step 2:</strong> Enter the known initial state (pressure, volume, temperature) with appropriate units: pressure in Pa, atm, bar, or psi; volume in L, m³, or mL; temperature in K, °C, or °F</li>
          <li><strong>Step 3:</strong> Enter the known final state values and click Calculate to instantly retrieve the unknown parameter with automatic unit conversions</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Combined Gas Law Calculator Formula">
        <p>
          The combined gas law represents the relationship between pressure, volume, and absolute temperature for a fixed amount of gas. This law emerges from combining three fundamental gas relationships: Boyle's Law (at constant temperature, P inversely proportional to V), Charles's Law (at constant pressure, V proportional to T), and Gay-Lussac's Law (at constant volume, P proportional to T). When a gas transitions from one state to another with fixed mole count, the ratio of pressure times volume divided by absolute temperature remains constant. This principle enables engineers to predict gas behavior during compression cycles in refrigeration systems, calculate scuba tank pressure changes with depth and temperature, determine pneumatic actuator performance across temperature ranges, and design industrial gas processing equipment that must function reliably under varying conditions.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">(P₁V₁) / T₁ = (P₂V₂) / T₂</p>
        </div>
        <p>Where P is pressure (Pa, atm, bar), V is volume (L, m³), and T is absolute temperature (Kelvin). All pressures must use the same unit, all volumes the same unit, and temperature must always be in Kelvin.</p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A scuba diver starts with a compressed air tank at the surface: initial pressure 200 bar, initial volume 12 L (tank capacity), initial temperature 25°C (298 K). At depth (40 meters), the ambient temperature drops to 10°C (283 K) and external pressure increases to 5 bar. Assuming the tank is rigid (constant volume), calculate the new internal pressure:</p>
        <ul>
          <li>Initial state: P₁ = 200 bar, V₁ = 12 L, T₁ = 298 K</li>
          <li>Final state: T₂ = 283 K, V₂ = 12 L (rigid tank), find P₂</li>
          <li>Rearranging: P₂ = (P₁ × T₂) / T₁ = (200 × 283) / 298</li>
          <li>P₂ = 56,600 / 298 = <strong>189.9 bar</strong></li>
          <li>The pressure drops from 200 to 189.9 bar due to temperature decrease from 25°C to 10°C at constant volume</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>The combined gas law applies across industries where gas state changes must be predicted and controlled:</p>
        <SEOList items={[
          "Scuba diving & underwater equipment: Calculate oxygen tank pressures at different depths and water temperatures to ensure diver safety and determine remaining dive time",
          "HVAC & refrigeration systems: Design air handling units and cooling cycles by predicting how compressed refrigerant pressure and temperature change during compression and expansion",
          "Pneumatic systems & compressed air tools: Calculate actuator performance across temperature ranges, predict air expansion when discharged from storage tanks, and ensure consistent power output",
          "Industrial gas processing: Design storage vessels and transportation systems accounting for pressure and temperature changes, ensure safety relief valves activate at correct conditions",
          "Weather & atmospheric science: Model atmospheric behavior changes with altitude, temperature gradients, and pressure systems for climate prediction and severe weather analysis",
          "Laboratory chemistry & gas experiments: Predict gas volumes at different temperatures and pressures for reaction planning, ensure experiments execute at correct conditions for reproducibility"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Why must I use Kelvin instead of Celsius for the combined gas law?",
            answer: "The combined gas law (and all gas laws) require absolute temperature in Kelvin because gas pressure and volume scale directly with absolute temperature from absolute zero. Celsius has an arbitrary zero point at the freezing point of water, not the point where gas molecules stop moving. Using Celsius would produce completely incorrect calculations. For example, if water is 0°C and we heat it to 10°C, the Celsius temperature doubled, but the Kelvin temperature only increased from 273K to 283K (3.7% increase). Gas volume/pressure also increase only 3.7%, not 100%."
          },
          {
            question: "How does the combined gas law relate to Boyle's Law and Charles's Law?",
            answer: "The combined gas law unifies three simpler gas relationships: Boyle's Law states P₁V₁ = P₂V₂ (at constant temperature); Charles's Law states V₁/T₁ = V₂/T₂ (at constant pressure); Gay-Lussac's Law states P₁/T₁ = P₂/T₂ (at constant volume). The combined law (P₁V₁)/T₁ = (P₂V₂)/T₂ encompasses all three by allowing pressure, volume, and temperature to change simultaneously. If you hold one variable constant, it reduces to the corresponding simple law."
          },
          {
            question: "What assumptions does the combined gas law make?",
            answer: "The combined gas law assumes: 1) Fixed amount of gas (constant number of moles—no gas escapes or enters), 2) Ideal gas behavior (molecules have negligible volume and no intermolecular forces), 3) The gas is pure or a stable mixture. Real gases deviate at high pressures (>10 atm) or low temperatures where molecular size becomes significant and intermolecular forces matter. For most laboratory and industrial conditions near room temperature and atmospheric pressure, the deviation is negligible (<5%)."
          },
          {
            question: "What happens to gas pressure if I heat a sealed container?",
            answer: "According to Gay-Lussac's Law (a special case where volume is constant), pressure increases proportionally with absolute temperature: P₁/T₁ = P₂/T₂. If you heat gas from 300 K to 400 K (33% temperature increase), pressure increases 33% as well. This is why spray cans warn against heating and why tire pressure gauges show higher readings after driving (friction heats the tires and air). Conversely, cooling a sealed container decreases pressure proportionally."
          },
          {
            question: "Can I use the combined gas law for liquids or solids?",
            answer: "No, the combined gas law applies only to gases. Liquids and solids are incompressible—their volumes don't change significantly with pressure or temperature changes. Gases, however, expand and contract substantially with pressure and temperature changes because molecules move freely with large spaces between them. If you need to analyze liquid properties, you'd use different equations like the compressibility factor or equations of state designed for liquids."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering combined gas law calculations is essential for engineers, chemists, divers, and scientists predicting how gases behave under changing conditions. This calculator transforms complex algebraic manipulation into instant results, accelerating design iterations and experimental planning.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('ideal-gas-law-calculator')} for calculations including mole quantity, or the {createInternalLink('pressure-calculator')} for comprehensive pressure analysis and force-area relationships.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
