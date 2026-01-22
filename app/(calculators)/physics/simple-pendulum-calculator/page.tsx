import SimplePendulumCalculator from '../../../_components/calculators/SimplePendulumCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Simple Pendulum Calculator | Period, Frequency & Gravity';
const description = 'Calculate simple pendulum period, frequency, length, or local gravity with comprehensive unit support and oscillation analysis.';
const keywords = [
  'simple pendulum calculator',
  'pendulum period calculator',
  'pendulum frequency calculator',
  'pendulum length calculator',
  'pendulum gravity calculator',
  'period of pendulum calculator',
  'oscillation period calculator',
  'simple harmonic motion calculator',
  'pendulum formula calculator',
  'gravity measurement calculator',
  'pendulum physics calculator',
  'swinging pendulum calculator',
  'pendulum motion calculator',
  'oscillation frequency calculator',
  'pendulum time calculator',
  'pendulum swing calculator',
  'pendulum dynamics calculator',
  'pendulum analysis calculator',
  'simple harmonic oscillator',
  'pendulum mechanics calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/simple-pendulum-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/simple-pendulum-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function SimplePendulumCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Simple Pendulum Calculator"
      description="Calculate period, frequency, length, or local gravity for simple pendulum oscillations with flexible unit systems."
      calculator={<SimplePendulumCalculator />}
      slug="physics/simple-pendulum-calculator"
      category="Physics"
      features={[
        'Four calculation methods: period and frequency from length, find length from frequency, find length from period, calculate local gravity',
        'Unit-flexible inputs for length (m, cm, mm, ft, in), gravity (m/s², cm/s², ft/s²), period (s, ms, min), frequency (Hz)',
        'Simple pendulum formula T = 2π√(L/g) with full derivation support',
        'Calculates angular frequency, oscillations per minute, and maximum velocity/acceleration',
        'Amplitude consideration for more accurate velocity and acceleration calculations',
        'Local gravity determination from pendulum measurements for geophysics applications',
        'Perfect for physics education, experimental measurements, and pendulum analysis'
      ]}
    >
      <SEOSection title="Understanding Simple Pendulum Oscillations">
        <p>
          The Simple Pendulum Calculator analyzes oscillatory motion of pendulums under gravity. A simple pendulum consists of a mass suspended by a lightweight string, exhibiting simple harmonic motion for small angles. The period (T = 2π√(L/g)) depends only on length and gravitational acceleration, making pendulums ideal for measuring gravity and time. The calculator supports four methods: calculating period and frequency from length, finding required length from frequency or period, and determining local gravity from measurements. Essential for physics education, experimental physics, clock design, geophysical measurements, and understanding simple harmonic motion principles.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Simple Pendulum Calculator">
        <SEOList
          items={[
            'Select calculation method: period/frequency, find length from frequency, find length from period, or find gravity.',
            'For period and frequency: enter pendulum length and local gravity value.',
            'For finding length from frequency: enter desired frequency and gravity to calculate required length.',
            'For finding length from period: enter desired period and gravity to calculate required length.',
            'For finding gravity: enter measured length and period to determine local gravity value.',
            'Choose appropriate units for length (m, cm, ft), gravity (m/s², cm/s²), period (s, ms, min), frequency (Hz).',
            'Optionally specify amplitude in degrees for more accurate velocity and acceleration calculations.',
            'Click Calculate to get period, frequency, angular frequency, and oscillation rates.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Simple Pendulum Formulas and Equations">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">T = 2π√(L/g)</p>
            <p className="text-sm text-gray-600">Period of simple pendulum (T in seconds, L in meters, g in m/s²)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">f = 1/T</p>
            <p className="text-sm text-gray-600">Frequency (cycles per second, in Hertz)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">ω = 2πf = √(g/L)</p>
            <p className="text-sm text-gray-600">Angular frequency (radians per second)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">L = g × (T/2π)²</p>
            <p className="text-sm text-gray-600">Length calculation from period</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">g = 4π² × L / T²</p>
            <p className="text-sm text-gray-600">Gravity calculation from pendulum measurements</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Gravity Values by Location">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Gravity (m/s²)</th>
                <th className="px-4 py-2 border">Period for 1m</th>
                <th className="px-4 py-2 border">Reason for Variation</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2 border">Equator</td><td className="px-4 py-2 border">9.78</td><td className="px-4 py-2 border">2.006 s</td><td className="px-4 py-2 border">Centrifugal force, Earth's bulge</td></tr>
              <tr><td className="px-4 py-2 border">45° Latitude</td><td className="px-4 py-2 border">9.81</td><td className="px-4 py-2 border">2.007 s</td><td className="px-4 py-2 border">Standard reference</td></tr>
              <tr><td className="px-4 py-2 border">North Pole</td><td className="px-4 py-2 border">9.83</td><td className="px-4 py-2 border">2.008 s</td><td className="px-4 py-2 border">Flattened Earth shape, no centrifugal force</td></tr>
              <tr><td className="px-4 py-2 border">Sea Level</td><td className="px-4 py-2 border">9.81</td><td className="px-4 py-2 border">2.007 s</td><td className="px-4 py-2 border">Standard reference</td></tr>
              <tr><td className="px-4 py-2 border">1000m Altitude</td><td className="px-4 py-2 border">9.80</td><td className="px-4 py-2 border">2.007 s</td><td className="px-4 py-2 border">Distance from Earth's center</td></tr>
              <tr><td className="px-4 py-2 border">Moon Surface</td><td className="px-4 py-2 border">1.62</td><td className="px-4 py-2 border">4.88 s</td><td className="px-4 py-2 border">Moon's lower mass</td></tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Simple Pendulum Calculator">
        <SEOList
          items={[
            'Clock design and regulation: pendulum-based timepieces, escapement mechanisms, frequency regulation',
            'Geophysical measurements: determining local gravity variations, mapping gravitational anomalies',
            'Physics education: understanding simple harmonic motion, oscillation principles, experimental verification',
            'Seismic studies: analyzing ground motion using pendulum systems for earthquake monitoring',
            'Historical instruments: grandfather clocks, metronomes, ballistic pendulums for velocity measurement',
            'Engineering calibration: precision timing devices, vibration analysis, resonance frequency determination',
            'Experimental physics: measuring unknown gravitational values, testing classical mechanics predictions',
            'Stability analysis: building sway analysis, bridge oscillation studies, structural dynamics'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Pendulum period:</strong> 1 meter length, g = 9.81 m/s² → T = 2.006 seconds, f = 0.498 Hz</li>
          <li><strong>Required length:</strong> Desired frequency 0.5 Hz, g = 9.81 m/s² → L = 0.994 meters</li>
          <li><strong>Length from period:</strong> Period 2 seconds, g = 9.81 m/s² → L = 0.994 meters</li>
          <li><strong>Gravity measurement:</strong> Length 0.994 m, period 2 s → g = 9.81 m/s² (Earth standard)</li>
          <li><strong>Grandfather clock:</strong> Period 2 seconds requires 1 meter pendulum length for Earth gravity</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is a simple pendulum?',
              answer: 'A simple pendulum consists of a small mass (bob) suspended by a lightweight, inextensible string from a fixed pivot point. The mass swings back and forth under gravity, exhibiting simple harmonic motion for small angles (less than 15°). The period depends only on length and gravity, not on the mass or amplitude.'
            },
            {
              question: 'Why does period not depend on mass or amplitude?',
              answer: 'This is a remarkable property of simple pendulums. While gravitational force increases with mass, so does inertia, and these effects cancel exactly. For small angles, the restoring force is proportional to displacement, resulting in simple harmonic motion with period independent of amplitude. This makes pendulums ideal for precise timing.'
            },
            {
              question: 'What is the difference between period and frequency?',
              answer: 'Period (T) is the time for one complete oscillation, measured in seconds. Frequency (f) is the number of oscillations per second, measured in Hertz (Hz). They are inversely related: f = 1/T. A pendulum with period 2 seconds has frequency 0.5 Hz.'
            },
            {
              question: 'What angle limitation applies to simple pendulum formula?',
              answer: 'The formula T = 2π√(L/g) is accurate for small angles (typically less than 15°). For larger amplitudes, the period increases slightly due to higher-order effects. Beyond 20°, corrections become necessary. In practice, pendulum clocks use small amplitudes (under 5°) for accuracy.'
            },
            {
              question: 'How can pendulums measure gravity?',
              answer: 'By measuring a pendulum\'s length and period, we can calculate g = 4π²L/T². Different locations have slightly different gravity values due to latitude (centrifugal force) and altitude (distance from Earth\'s center). Precision pendulum measurements revealed the Earth\'s shape and helped map gravitational anomalies.'
            },
            {
              question: 'What happens to pendulum motion in different gravity fields?',
              answer: 'In stronger gravity (higher g), the period decreases - the pendulum swings faster. On the Moon (g = 1.62 m/s²), a 1-meter pendulum has period 4.88 seconds versus 2.01 seconds on Earth. Astronauts used pendulum measurements to characterize lunar gravity during moon missions.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
