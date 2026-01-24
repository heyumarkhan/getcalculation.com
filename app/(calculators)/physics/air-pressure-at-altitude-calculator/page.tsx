import AirPressureAtAltitudeCalculator from '../../../_components/calculators/AirPressureAtAltitudeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function AirPressureAtAltitudeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Air Pressure at Altitude Calculator"
      description="Estimate air pressure at altitude using barometric formula and custom base conditions."
      calculator={<AirPressureAtAltitudeCalculator />}
      slug="physics/air-pressure-at-altitude-calculator"
      category="Thermodynamics"
      features={[
        'Calculate pressure at altitude with barometric formula',
        'Adjust base pressure, temperature, and units',
        'Supports Pa, kPa, hPa, bar, atm, psi outputs',
        'Preset sea-level and high-altitude conditions',
        'Step-by-step calculation details',
        'Embed-ready calculator UI',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Air Pressure at Altitude: How It Works">
        <p>
          The Air Pressure at Altitude Calculator estimates atmospheric pressure using the barometric formula: pressure drops exponentially with height. By entering altitude, base pressure, and temperature, you can see how pressure changes relative to sea level. This is useful for aviation performance, meteorology, hiking, and engineering. Pair it with {createInternalLink('air-density-calculator', 'Air Density Calculator')} or {createInternalLink('pressure-calculator', 'Pressure Calculator')} for deeper analysis.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Air Pressure at Altitude Calculator">
        <SEOList ordered items={[
          '<strong>Enter altitude:</strong> Height above the base reference in meters.',
          '<strong>Set base pressure:</strong> Typically 101.325 kPa at sea level (use hPa, kPa, bar, atm, psi).',
          '<strong>Set temperature:</strong> Base-layer temperature (°C or K) used in the barometric exponent.',
          '<strong>Choose output unit:</strong> Pa, kPa, hPa, bar, atm, or psi.',
          '<strong>Click Calculate:</strong> Get pressure plus step-by-step math for transparency.'
        ]} />
      </SEOSection>

      <SEOSection title="Barometric Formula">
        <SEOFormula
          formula="P = P₀ × exp\big(- M g h / (R T)\big)"
          description="Pressure decreases exponentially with altitude using molar mass of air, gravity, and temperature."
        />
        <SEOList items={[
          '<strong>P₀</strong>: Base (sea-level) absolute pressure',
          '<strong>M</strong>: Molar mass of air (0.0289644 kg/mol)',
          '<strong>g</strong>: Gravity (9.80665 m/s²)',
          '<strong>h</strong>: Altitude (m)',
          '<strong>R</strong>: Universal gas constant (8.314462618 J/(mol·K))',
          '<strong>T</strong>: Absolute temperature (K) of the layer'
        ]} />
        <p>
          For standard atmosphere with P₀ = 101.325 kPa and T = 15°C, pressure at 2000 m is about 79.5 kPa. For higher fidelity, use lapse-rate models; this tool applies the isothermal barometric formula for simplicity and speed.
        </p>
      </SEOSection>

      <SEOSection title="Example Calculations">
        <SEOList items={[
          '<strong>Sea level to 1500 m:</strong> P ≈ 84.6 kPa when P₀ = 101.325 kPa and T = 15°C.',
          '<strong>Denver (~1609 m):</strong> P ≈ 83 kPa using 101.325 kPa base and 10°C.',
          '<strong>High mountain (3000 m):</strong> P ≈ 70 kPa with 101.325 kPa base and 0°C.',
          '<strong>Custom base 95 kPa at 500 m:</strong> P ≈ 86 kPa at 2000 m with T = 12°C.'
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Do I need absolute or gauge pressure?',
            answer: 'Use absolute pressure. Convert gauge readings by adding local atmospheric pressure before calculating.'
          },
          {
            question: 'Does temperature matter?',
            answer: 'Yes. Higher temperatures reduce the exponent magnitude, resulting in slightly higher pressure at the same altitude.'
          },
          {
            question: 'Is this the full standard atmosphere model?',
            answer: 'This uses the isothermal barometric formula. For layered lapse rates, use aviation standard atmosphere tables.'
          },
          {
            question: 'Which units are supported?',
            answer: 'Pressure: Pa, kPa, hPa, bar, atm, psi. Temperature: °C or K. Altitude: meters.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
