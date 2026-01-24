import GasDensityCalculator from '../../../_components/calculators/GasDensityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GasDensityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Gas Density Calculator: Ideal Gas Law for Any Gas"
      description="Calculate gas density, pressure, or temperature using the ideal gas law with custom molar mass and unit conversions."
      calculator={<GasDensityCalculator />}
      slug="physics/gas-density-calculator"
      category="Thermodynamics"
      features={[
        'Calculate gas density from pressure, temperature, and molar mass',
        'Solve for pressure or temperature using ideal gas law',
        'Preset molar masses for common gases plus custom entry',
        'Unit support for kPa, bar, atm, psi, °C, °F, K, kg/m³, lb/ft³',
        'Step-by-step calculation details with ideal gas law rearrangements',
        'Embed-ready calculator with responsive layout',
        'Uses primary color #820ECC to match site styling'
      ]}
    >
      <SEOSection title="Understanding Gas Density and the Ideal Gas Law">
        <p>
          Gas density measures mass per unit volume and is governed by the ideal gas law. For any gas, the relationship is <strong>ρ = (P × M) / (R × T)</strong>, where ρ is density, P is absolute pressure, M is molar mass, R is the universal gas constant, and T is absolute temperature. This calculator lets you plug in pressure, temperature, and molar mass to get density instantly, or solve the equation in reverse for pressure or temperature. Pair it with {createInternalLink('ideal-gas-law-calculator', 'Ideal Gas Law Calculator')} or {createInternalLink('pressure-calculator', 'Pressure Calculator')} when you need broader thermodynamics context.
        </p>
        <p>
          Because molar mass changes with the gas you are analyzing, we include quick presets for dry air, nitrogen, oxygen, carbon dioxide, helium, and hydrogen, plus a custom option for mixtures. Use absolute pressure values; gauge pressure must be converted to absolute before applying the ideal gas law.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Gas Density Calculator">
        <SEOList ordered items={[
          '<strong>Choose a mode:</strong> Solve for density (ρ), pressure (P), or temperature (T).',
          '<strong>Select a gas preset:</strong> Air, nitrogen, oxygen, CO₂, helium, hydrogen, or enter a custom molar mass.',
          '<strong>Enter your known values:</strong> Pressure with units, temperature, or density depending on the mode.',
          '<strong>Pick output units:</strong> kg/m³, g/L, or lb/ft³ for density; kPa, bar, atm, or psi for pressure.',
          '<strong>Click Calculate:</strong> Get the result plus step-by-step math using the ideal gas law.'
        ]} />
        <p>
          If you also need volumetric flow conversions, combine this tool with {createInternalLink('standard-cubic-feet-per-minute-calculator', 'Standard Cubic Feet per Minute Calculator')} for SCFM/ACFM adjustments.
        </p>
      </SEOSection>

      <SEOSection title="Gas Density Formula and Rearrangements">
        <SEOFormula
          formula="ρ = (P × M) / (R × T)"
          description="Density equals absolute pressure times molar mass, divided by universal gas constant and absolute temperature."
        />
        <SEOList items={[
          '<strong>Pressure:</strong> P = (ρ × R × T) / M',
          '<strong>Temperature:</strong> T = (P × M) / (ρ × R)',
          '<strong>Inputs must be absolute:</strong> Kelvin for temperature and Pascals (or equivalent) for pressure.'
        ]} />
        <p>
          For air, M ≈ 28.97 g/mol and R = 8.314462618 J/(mol·K). At 101.325 kPa and 15°C, the calculator returns about 1.225 kg/m³—matching the standard {createInternalLink('air-density-calculator', 'Air Density Calculator')} reference value.
        </p>
      </SEOSection>

      <SEOSection title="Common Molar Masses for Fast Entry">
        <SEOList items={[
          'Dry Air: 28.97 g/mol (standard atmosphere calculations)',
          'Nitrogen (N₂): 28.01 g/mol (inert environment and tire inflation)',
          'Oxygen (O₂): 31.998 g/mol (oxidizer calculations)',
          'Carbon Dioxide (CO₂): 44.01 g/mol (CO₂ systems, fire suppression, beverage carbonation)',
          'Helium (He): 4.0026 g/mol (leak testing, lifting gas)',
          'Hydrogen (H₂): 2.01588 g/mol (fuel cells and process safety)',
          'Custom Mix: enter the weighted average molar mass for gas blends'
        ]} />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <SEOList items={[
          '<strong>Density of air at 101.325 kPa and 25°C:</strong> ρ = (101.325 kPa × 28.97 g/mol) / (8.314462618 × 298.15 K) ≈ 1.18 kg/m³',
          '<strong>CO₂ density at 2 bar and 20°C:</strong> ρ ≈ (200 kPa × 44.01 g/mol) / (8.314462618 × 293.15 K) ≈ 3.59 kg/m³',
          '<strong>Find pressure for hydrogen at 0.09 kg/m³ and 30°C:</strong> P ≈ (0.09 × 8.314462618 × 303.15) / 0.00201588 ≈ 112 kPa (absolute)',
          '<strong>Find temperature for nitrogen at 250 kPa and 2.2 kg/m³:</strong> T ≈ (250 kPa × 28.0134 g/mol) / (2.2 × 8.314462618) ≈ 384 K (≈ 110°C)'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Do I need absolute or gauge pressure for gas density?',
            answer: 'Use absolute pressure. If you have gauge pressure, add atmospheric pressure (≈101.325 kPa) before using the ideal gas law.'
          },
          {
            question: 'How is this different from the air density calculator?',
            answer: (
              <>
                This tool works for any gas by letting you enter molar mass. Use {createInternalLink('air-density-calculator', 'Air Density Calculator')} when you only need dry air with the specific gas constant R = 287.05 J/(kg·K).
              </>
            )
          },
          {
            question: 'Can I use this for humid air or gas mixtures?',
            answer: (
              <>
                Yes. Estimate an effective molar mass using the mixture's composition, or use a weighted average. For humidity-specific work, pair this with {createInternalLink('hydrostatic-pressure-calculator', 'Hydrostatic Pressure Calculator')} or other fluid tools as needed.
              </>
            )
          },
          {
            question: 'Which units can I use?',
            answer: 'Pressure: Pa, kPa, bar, atm, psi. Temperature: °C, °F, K. Density: kg/m³, g/L, lb/ft³. The calculator converts everything to SI for accurate results.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
