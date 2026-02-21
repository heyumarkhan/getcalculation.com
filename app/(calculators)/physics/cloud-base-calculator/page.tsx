import CloudBaseCalculator from '../../../_components/calculators/CloudBaseCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

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
      <SEOSection title="Why Cloud Base Calculations Are Critical for Aviation and Meteorology">
        <p>
          Cloud base height determines whether pilots can fly VFR, whether smoke from wildfires will mix or stagnate, and whether fog will form at dawn. Every hour, thousands of aviation decisions—from pattern work at local airports to airliner diversions—depend on accurate cloud ceiling estimates. Pilots use the temperature–{createInternalLink('dew-point-calculator', 'dew point')} spread to anticipate bases in real time when ceilometers are unavailable. Emergency services, outdoor event coordinators, and solar forecasters all rely on cloud base predictions to plan operations, route aircraft, and optimize energy production.
        </p>
        <p>
          The classic rule of thumb multiplies the spread in °C by 125 to get meters, or in °F by 222 to get feet. This calculator automates those conversions, derives dew point from {createInternalLink('relative-humidity-calculator', 'relative humidity')} using the Magnus formula, and solves backward for the dew point needed to achieve a target cloud base. Whether you're planning a cross-country flight, forecasting fog formation, or teaching atmospheric thermodynamics, understanding how temperature and moisture converge with altitude is fundamental to safe operations and informed decision-making.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <ol>
          <li><strong>Select your calculation mode:</strong> Choose between temperature and dew point, spread only, relative humidity, or target base height to determine which inputs you'll provide.</li>
          <li><strong>Enter the required parameters:</strong> Input surface temperature, dew point (or humidity), and select your preferred units (°C/°F for temperature, % for humidity, m/ft for base height).</li>
          <li><strong>Read the cloud base estimate:</strong> The calculator instantly displays the estimated cloud base height in both meters and feet, along with any derived values such as dew point from humidity or required dew point for a target base.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Cloud Base Formula">
        <p>
          Cloud base height is estimated from the surface temperature–dew point spread using the empirical relationship:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <p className="font-semibold">Cloud Base Formula:</p>
          <p className="mt-2"><strong>Base (m) ≈ (T − Td) × 125</strong> when T and Td are in °C</p>
          <p><strong>Base (ft) ≈ (T − Td) × 222</strong> when T and Td are in °F</p>
          <p className="mt-2 text-sm">For inverse calculations (target base):</p>
          <p><strong>Spread (°C) = Base (m) / 125</strong></p>
          <p><strong>Spread (°F) = Base (ft) / 222</strong></p>
          <p className="mt-2 text-sm">Magnus formula for dew point from RH:</p>
          <p><strong>Td = (b·γ)/(a−γ)</strong>, where γ = ln(RH/100) + aT/(b+T), a=17.625, b=243.04</p>
        </div>
        <p>
          The 125 m/°C (or 222 ft/°F) factor is an empirical approximation derived from typical dry adiabatic cooling and dew point lapse behavior in the boundary layer. As unsaturated air rises, temperature decreases roughly 9.8 °C/km. Dew point decreases more slowly, about 1.5–2 °C/km. The difference narrows with height until saturation occurs; the net effect produces about 125 m of lift per degree Celsius of surface temperature–dew point spread. Though simplified, this approximation aligns well for many convective daytime situations.
        </p>
        <p className="mt-4">
          <strong>Worked Example:</strong> A weather station reports T = 28°C and Td = 18°C at the surface. Calculate the estimated cloud base height.
        </p>
        <ol className="mt-2">
          <li><strong>Step 1 – Identify the spread:</strong> Spread = T − Td = 28°C − 18°C = 10°C</li>
          <li><strong>Step 2 – Apply the 125 m/°C rule:</strong> Base (m) = 10°C × 125 = 1250 meters</li>
          <li><strong>Step 3 – Convert to feet (optional):</strong> Base (ft) = 1250 m × 3.28084 ≈ 4101 feet</li>
          <li><strong>Step 4 – Alternatively, use the °F rule directly:</strong> T = 82.4°F, Td = 64.4°F, spread = 18°F → Base (ft) = 18°F × 222 ≈ 3996 feet (≈1250 m)</li>
          <li><strong>Result:</strong> The estimated cloud base is approximately <strong>1250 meters (4101 feet)</strong> above ground level, indicating broken cumulus clouds would form at that height if parcels lift from the surface.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Practical Applications">
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
          }
        ]}
      />

      <SEOSection title="Conclusion">
        <p>
          Cloud base estimation bridges temperature, moisture, and altitude in a single rule-of-thumb calculation that supports aviation safety, wildfire management, and meteorological forecasting. By understanding how the surface temperature–dew point spread translates to condensation height, you can anticipate ceiling changes, plan flight operations, and teach atmospheric boundary layer physics with confidence. This calculator automates the arithmetic, converts units instantly, and handles humidity-based dew points using the Magnus formula. For deeper exploration of atmospheric conditions, explore our {createInternalLink('air-pressure-at-altitude-calculator', 'Air Pressure at Altitude Calculator')} to understand how pressure profiles influence lapse rates and cloud formation. Master cloud base calculations today to enhance flight planning, operational safety, and atmospheric insight.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
