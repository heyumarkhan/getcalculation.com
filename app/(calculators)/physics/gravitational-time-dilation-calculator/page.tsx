import GravitationalTimeDilationCalculator from '../../../_components/calculators/GravitationalTimeDilationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Gravitational Time Dilation Calculator | General Relativity Time Effects';
const description = 'Calculate gravitational time dilation near massive objects using general relativity with Schwarzschild metric and escape velocity.';
const keywords = [
  'gravitational time dilation calculator',
  'time dilation gravity calculator',
  'general relativity time calculator',
  'schwarzschild time dilation',
  'escape velocity time dilation',
  'gravitational potential time',
  'clock rate gravity',
  'time dilation near black hole',
  'earth altitude time dilation',
  'GPS time correction',
  'gravitational time shift',
  'time runs slower gravity',
  'relativity time calculator',
  'schwarzschild metric calculator',
  'escape velocity relativity',
  'gravity slows time calculator',
  'relativistic time effects',
  'quantum gravity time',
  'physics time dilation',
  'einstein general relativity time'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/gravitational-time-dilation-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/gravitational-time-dilation-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function GravitationalTimeDilationPage() {
  return (
    <CalculatorPageTemplate
      title="Gravitational Time Dilation Calculator"
      description="Compute time dilation effects near massive objects using general relativity and Schwarzschild metric equations."
      calculator={<GravitationalTimeDilationCalculator />}
      slug="physics/gravitational-time-dilation-calculator"
      category="Physics"
      features={[
        'Four methods: escape velocity, Schwarzschild metric, Earth altitudes, gravitational potential',
        'Inputs: escape velocity in m/s or km/s; mass and radius with flexible units',
        'Schwarzschild radius computation for black hole proximity',
        'Earth-specific altitude time dilation (surface vs. GPS)',
        'Gravitational potential and time dilation factor calculations',
        'Shows practical implications (GPS corrections, day/year slowdown)'
      ]}
    >
      <SEOSection title="Gravitational Time Dilation Overview">
        <p>
          According to Einstein's general relativity, gravity is not a force but a curvature of spacetime. This curvature causes clocks to run at different rates depending on the strength of the gravitational field. Near massive objects like neutron stars, black holes, and even Earth, time literally passes more slowly. The Gravitational Time Dilation Calculator quantifies this effect using the Schwarzschild metric and escape velocity, essential for GPS, atomic clocks, and understanding compact objects.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Calculator">
        <SEOList
          items={[
            'Select a method: escape velocity, Schwarzschild metric (mass/radius), Earth altitudes, or gravitational potential.',
            'Enter the relevant parameters (escape velocity, mass, radius, or altitude).',
            'Click Calculate to see the time dilation factor and practical time slowdown.',
            'Results show clock rate ratios and how much time passes for observers at different locations.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Key Gravitational Time Dilation Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">t_slow = t_far × √(1 - 2GM/(rc²))</p>
            <p className="text-sm text-gray-600">Time dilation from mass and radius (Schwarzschild metric)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">t_slow = t_far × √(1 - v_e²/c²)</p>
            <p className="text-sm text-gray-600">Time dilation from escape velocity (equivalent formulation)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">R_s = 2GM/c²</p>
            <p className="text-sm text-gray-600">Schwarzschild radius (event horizon for black holes)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">Φ = -GM/r</p>
            <p className="text-sm text-gray-600">Gravitational potential (per unit mass)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Physical Interpretation">
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Weaker Gravity (Higher Altitude):</strong> Time runs faster. GPS satellites experience time ~38 microseconds faster per day.</li>
          <li><strong>Stronger Gravity (Lower Altitude):</strong> Time runs slower. Clocks at sea level tick slower than clocks in mountains.</li>
          <li><strong>Near Black Hole Event Horizon:</strong> Time dilation → ∞. To an outside observer, time for a falling object appears to stop.</li>
          <li><strong>Schwarzschild Radius:</strong> Critical distance at which escape velocity equals speed of light. For Earth: ~9 mm (if compressed to black hole).</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <SEOList
          items={[
            'GPS/GNSS systems must account for gravitational time dilation (~38 μs/day) to maintain accuracy.',
            'Atomic clocks in laboratories vs. on mountaintops measurably run at different rates.',
            'Neutron stars and pulsars: time dilation effects influence observed radiation signatures.',
            'Black hole physics: understanding effects near event horizons.',
            'Fundamental physics: testing predictions of general relativity.',
            'Precision timekeeping in telecommunications and financial networks.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Real-World Examples">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Earth Sea Level vs. Mountain:</strong> Altitude 1 km: clock runs ~0.0000003% faster. Over a year: ~10 milliseconds faster.</li>
          <li><strong>GPS Satellites (~20,200 km):</strong> Gain ~38 microseconds per day from being in weaker gravity alone (relativity, not doppler).</li>
          <li><strong>Neutron Star (R ~ 10 km, M ~ 1.4 M☉):</strong> Escape velocity ~200,000 km/s (67% of light speed); significant time dilation at surface.</li>
          <li><strong>Black Hole Event Horizon:</strong> Time dilation factor → 0 as r → R_s. Infalling object appears frozen to outside observer.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'Why does gravity slow down time?',
              answer: 'In general relativity, gravity is spacetime curvature. Massive objects bend spacetime, and time passes more slowly in regions of stronger curvature. This is a geometric effect, not a mechanical one.'
            },
            {
              question: 'Is gravitational time dilation measurable?',
              answer: 'Yes! GPS satellites experience ~38 microseconds/day faster rate at 20,200 km altitude. Atomic clocks confirm measurable differences over meter-scale elevation changes.'
            },
            {
              question: 'What is the Schwarzschild radius?',
              answer: 'The Schwarzschild radius is the critical distance at which escape velocity equals light speed. For a black hole, this defines the event horizon. For Earth: ~9 mm if compressed to a black hole.'
            },
            {
              question: 'Do I experience time dilation on Earth?',
              answer: 'Yes, but imperceptibly. Your head ages ~90 nanoseconds slower per day than your feet due to Earth\'s gravity. Atomic clocks easily measure this.'
            },
            {
              question: 'Is this different from special relativity time dilation?',
              answer: 'Yes. Special relativity: time dilation from motion (relative velocity). General relativity: time dilation from gravity (spacetime curvature). Both are real.'
            },
            {
              question: 'Can I use this near black holes?',
              answer: 'Yes. As radius approaches Schwarzschild radius, the time dilation factor approaches 0 (time nearly stops). However, real black holes rotate and are more complex.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
