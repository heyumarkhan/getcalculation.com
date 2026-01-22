import CloudBaseCalculator from '../../../_components/calculators/CloudBaseCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Cloud Base Calculator | Estimate Convective Condensation Level (CCL) Height';
const description = 'Estimate cloud base height from temperature, dew point, humidity, and target bases. Includes CCL formulas, conversions, and aviation-ready outputs.';
const keywords = [
  'cloud base calculator',
  'cloud ceiling calculator',
  'convective condensation level',
  'CCL calculator',
  'cloud height calculator',
  'cloud base height',
  'temperature dew point spread',
  'dew point calculator cloud base',
  'relative humidity cloud base',
  'aviation cloud base',
  'meteorology calculator',
  'ceilometer alternative',
  'cloud base formula',
  '125 meters per degree',
  '222 feet per degree',
  'fog formation height',
  'lifting condensation level',
  'LCL approximation',
  'surface temperature dewpoint',
  'humidity to cloud base',
  'cloud cover forecasting',
  'flight planning weather',
  'pilot weather tools',
  'atmospheric thermodynamics'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/cloud-base-calculator'
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/cloud-base-calculator',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  }
};

export default function CloudBaseCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Cloud Base Calculator"
      description="Estimate cloud base height using temperature, dew point, humidity, or target base with fast aviation-ready outputs."
      calculator={<CloudBaseCalculator />}
      slug="physics/cloud-base-calculator"
      category="Physics"
      features={[
        'Compute cloud base from temperature and dew point',
        'Use temp–dew point spread or relative humidity',
        'Target base height to find required dew point',
        'Outputs in meters and feet automatically',
        'Magnus dew point for RH-based estimates',
        'Rule-of-thumb factors: 125 m/°C and 222 ft/°F'
      ]}
    >
      <SEOSection title="What is Cloud Base?">
        <p>
          Cloud base is the height above ground where rising air cools to its dew point and condensation begins, forming the lowest visible part of a cloud layer. For surface-based convection, this level is commonly approximated by the convective condensation level (CCL), estimated from surface temperature and dew point. Accurate cloud base estimates are important for aviation ceilings, flight visibility, wildfire smoke dispersion, and outdoor planning.
        </p>
        <p>
          The classic rule of thumb uses the surface temperature–dew point spread: multiply the spread in °C by 125 to get meters, or in °F by 222 to get feet. This calculator automates those conversions, supports humidity-derived dew points, and lets you solve backwards for the dew point needed to achieve a target cloud base.
        </p>
      </SEOSection>

      <SEOSection title="Cloud Base Formulas">
        <ul>
          <li><strong>Base (m) ≈ (T - Td) × 125</strong> using temperature and dew point in °C</li>
          <li><strong>Base (ft) ≈ (T - Td) × 222</strong> using temperature and dew point in °F</li>
          <li><strong>Spread (°C) = Base (m) / 125</strong> (inverse for target base)</li>
          <li><strong>Spread (°F) = Base (ft) / 222</strong> (inverse for target base)</li>
          <li><strong>Dew point (C) from RH:</strong> Magnus formula Td = (b·γ)/(a-γ), γ = ln(RH/100)+ aT/(b+T), a=17.625, b=243.04</li>
          <li><strong>Arc factor:</strong> Base (m) × 3.28084 = Base (ft) for conversion</li>
        </ul>
      </SEOSection>

      <SEOSection title="Why 125 m per Degree?">
        <p>
          The 125 m/°C (or 222 ft/°F) factor is an empirical approximation derived from typical dry adiabatic cooling and dew point lapse behavior in the boundary layer. As unsaturated air rises, temperature decreases roughly 9.8 °C/km. Dew point decreases more slowly, about 1.5–2 °C/km. The difference narrows with height until saturation occurs; the net effect produces about 125 m of lift per degree Celsius of surface temperature–dew point spread. Though simplified, this approximation aligns well for many convective daytime situations.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Cloud Base Estimation">
        <SEOList
          items={[
            '<strong>Aviation and Flight Planning:</strong> Estimate ceiling heights for VFR/IFR decisions, pattern work, and alternate planning. Quick situational awareness without a ceilometer.',
            '<strong>Wildfire and Smoke Dispersion:</strong> Predict plume rise and inversion breakout, understand smoke mixing heights, and plan tactical aviation support.',
            '<strong>Outdoor Events and Safety:</strong> Anticipate low cloud or fog formation that could impact visibility, photography, or sporting events.',
            '<strong>Gliding, Paragliding, and Soaring:</strong> Gauge usable thermal tops and cloud streets to plan cross-country routes.',
            '<strong>Energy and Solar Forecasting:</strong> Anticipate cloud onset heights that reduce solar irradiance and photovoltaic output.',
            '<strong>Meteorology Education:</strong> Demonstrate the link between surface moisture, lapse rates, and condensation levels in boundary layer physics.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Inputs and Units Supported">
        <ul>
          <li>Temperature and dew point in °C or °F</li>
          <li>Spread-only mode in °C or °F</li>
          <li>Relative humidity (0–100%) with Magnus dew point estimation</li>
          <li>Target cloud base in meters or feet with required dew point output</li>
          <li>Automatic output in both meters and feet for every calculation</li>
        </ul>
      </SEOSection>

      <SEOSection title="Assumptions and Limitations">
        <ul>
          <li>Assumes well-mixed surface layer and dry adiabatic lifting to saturation</li>
          <li>Best for convective daytime conditions; frontal or layered clouds may differ</li>
          <li>Surface observations must represent the near-surface mixed layer</li>
          <li>Local lapse rates, moisture flux, and inversions can shift actual bases</li>
          <li>Use ceilometers or pilot reports when available for operational decisions</li>
        </ul>
      </SEOSection>

      <SEOSection title="Worked Examples">
        <p><strong>Example 1: Temperature and Dew Point</strong><br />
          T = 28 °C, Td = 18 °C → spread = 10 °C → base ≈ 10 × 125 = 1250 m (4101 ft)
        </p>
        <p className="mt-3"><strong>Example 2: Fahrenheit Spread</strong><br />
          T = 86 °F, Td = 64 °F → spread = 22 °F → base ≈ 22 × 222 = 4884 ft (1489 m)
        </p>
        <p className="mt-3"><strong>Example 3: From Relative Humidity</strong><br />
          T = 24 °C, RH = 55%. Magnus Td ≈ 14.8 °C; spread ≈ 9.2 °C → base ≈ 1150 m (3773 ft)
        </p>
        <p className="mt-3"><strong>Example 4: Target Base</strong><br />
          Target base = 900 m, surface T = 22 °C → spread = 900/125 = 7.2 °C → required Td ≈ 14.8 °C
        </p>
      </SEOSection>

      <SEOSection title="Tips for Better Accuracy">
        <SEOList
          items={[
            '<strong>Use Recent Surface Observations:</strong> Ensure temperature and dew point are current and from a representative location (not shaded vs sunlit differences).',
            '<strong>Watch for Inversions:</strong> Strong nocturnal inversions or marine layers can lower cloud bases below rule-of-thumb estimates.',
            '<strong>Consider Moisture Advection:</strong> Rapidly increasing dew points can drop cloud bases quickly; monitor trends, not just snapshots.',
            '<strong>Account for Terrain:</strong> Elevation changes alter pressure and lapse profiles; use local station data near the site of interest.',
            '<strong>Use Ceilometers When Available:</strong> Automated ceiling measurements provide ground truth; use this calculator as a quick planning tool.',
            '<strong>High Humidity Near 100%:</strong> When RH is above ~95%, expect very low bases or fog formation near the surface.'
          ]}
        />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'How do I estimate cloud base from temperature and dew point?',
            answer: 'Subtract dew point from temperature to get the spread, then multiply by 125 to get meters or by 222 to get feet. Example: T=25°C, Td=18°C, spread=7°C → base ≈ 7×125 = 875 m (≈2870 ft).' }
,
          {
            question: 'Why do we use 125 m per degree Celsius?',
            answer: 'It is an empirical approximation reflecting how temperature and dew point converge with height in a typical mixed boundary layer. The spread closes at roughly 8–9 °C per km, leading to about 125 m per °C for cloud formation.'
          },
          {
            question: 'Can I use relative humidity instead of dew point?',
            answer: 'Yes. Use the humidity method: the calculator derives dew point with the Magnus formula from temperature and RH, then applies the same 125 m/°C (or 222 ft/°F) rule to estimate cloud base.'
          },
          {
            question: 'How accurate is this cloud base estimate?',
            answer: 'It is a rule-of-thumb suitable for quick planning. Actual cloud bases vary with lapse rates, moisture flux, inversions, and terrain. Compare with ceilometer data or pilot reports when available for operational decisions.'
          },
          {
            question: 'What is the difference between cloud base and ceiling?',
            answer: 'Cloud base is the lowest part of the cloud layer. Ceiling (for aviation) is the lowest broken/overcast layer reported in METARs. A scattered layer does not set the ceiling, but the cloud base height still describes where condensation begins.'
          },
          {
            question: 'How do I lower the cloud base?',
            answer: 'Increase near-surface moisture (raise dew point) or reduce temperature to shrink the spread. For a target base, required dew point Td = T - Base/125 (in °C). If the atmosphere moistens, cloud bases drop; if it dries, they rise.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
