import InductiveReactanceCalculator from '../../../_components/calculators/InductiveReactanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Inductive Reactance Calculator | XL = 2πfL AC Circuit Analysis';
const description = 'Calculate inductive reactance, inductance, frequency, and RL circuit impedance. XL = 2πfL formula with phase angle and power factor analysis for AC circuits.';
const keywords = [
  'inductive reactance calculator',
  'xl calculator',
  'inductance calculator',
  'ac circuit calculator',
  'impedance calculator',
  'phase angle calculator',
  'power factor calculator',
  'rl circuit',
  'inductor reactance',
  'angular frequency',
  'omega calculator',
  'ac frequency',
  'henry calculator',
  'ohm calculator',
  'reactance formula',
  'magnetic field',
  'coil reactance',
  'transformer reactance',
  'motor reactance',
  'ac analysis',
  'electrical engineering',
  'circuit impedance',
  'lagging power factor',
  '2 pi f l'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', ')
};

export default function InductiveReactanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Inductive Reactance Calculator"
      description="Calculate inductive reactance, inductance, frequency, and RL circuit impedance with phase angle analysis for AC circuits."
      calculator={<InductiveReactanceCalculator />}
      slug="physics/inductive-reactance-calculator"
      category="Physics"
      features={[
        'Four calculation methods: inductive reactance XL=2πfL, inductance L=XL/(2πf), frequency f=XL/(2πL), RL circuit impedance Z=√(R²+XL²)',
        'Unit-flexible inputs for frequency (Hz, kHz, MHz, GHz), inductance (H, mH, μH, nH), reactance/resistance (Ω, kΩ, MΩ, mΩ)',
        'Calculate phase angle φ=arctan(XL/R) and power factor PF=cos(φ) for inductive circuits',
        'Angular frequency ω=2πf displayed with results for AC analysis',
        'Verification calculations using alternative formulas',
        'Supports RF, audio, power line, and motor reactance calculations'
      ]}
    >
      <SEOSection title="Understanding Inductive Reactance">
        <p>
          Inductive reactance (XL) is the opposition that an inductor presents to alternating current (AC) due to its magnetic field. Unlike resistance which opposes both AC and DC equally, inductive reactance increases with frequency. The fundamental relationship is given by <strong>XL = 2πfL</strong>, where f is the frequency in Hertz and L is the inductance in Henries. This frequency-dependent behavior makes inductors crucial components in filters, transformers, and AC power systems.
        </p>
        <p>
          When AC flows through an inductor, it creates a changing magnetic field that induces a voltage opposing the current change (Lenz&apos;s Law). This opposition increases as the frequency increases because higher frequencies mean faster current changes. At DC (f = 0), the inductor acts as a short circuit (XL = 0), while at very high frequencies, it acts as an open circuit. This frequency selectivity makes inductors essential for applications like radio tuning, power factor correction, and noise filtering.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Inductive Reactance Calculator">
        <SEOList
          items={[
            'Select your calculation method: calculate reactance (XL = 2πfL), inductance (L = XL/(2πf)), frequency (f = XL/(2πL)), or RL circuit impedance (Z = √(R²+XL²))',
            'For reactance calculation: Enter the frequency and choose the unit (Hz, kHz, MHz, GHz), then enter the inductance with unit (H, mH, μH, nH)',
            'For inductance calculation: Input the known inductive reactance and frequency to find the required inductance value',
            'For frequency calculation: Enter reactance and inductance to determine the operating frequency',
            'For RL circuit impedance: Input both resistance and inductive reactance to calculate total impedance, phase angle, and power factor',
            'Click Calculate to see detailed results including angular frequency (ω = 2πf), verification calculations, and relevant circuit parameters',
            'Results show conversions to multiple units and include phase relationships for RL circuits'
          ]}
        />
      </SEOSection>

      <SEOSection title="Inductive Reactance Formulas">
        <p>
          The fundamental formulas for inductive reactance and related calculations are:
        </p>
        <div className="bg-gray-50 p-6 rounded-lg my-4">
          <div className="space-y-3">
            <div>
              <strong>Inductive Reactance:</strong>
              <div className="ml-4 mt-1">XL = 2πfL = ωL</div>
              <div className="text-sm text-gray-600 ml-4">where ω (omega) = 2πf is the angular frequency in rad/s</div>
            </div>
            <div>
              <strong>Inductance from Reactance:</strong>
              <div className="ml-4 mt-1">L = XL / (2πf) = XL / ω</div>
            </div>
            <div>
              <strong>Frequency from Reactance:</strong>
              <div className="ml-4 mt-1">f = XL / (2πL)</div>
            </div>
            <div>
              <strong>RL Circuit Impedance:</strong>
              <div className="ml-4 mt-1">Z = √(R² + XL²)</div>
              <div className="text-sm text-gray-600 ml-4">Total opposition to AC current in series RL circuit</div>
            </div>
            <div>
              <strong>Phase Angle:</strong>
              <div className="ml-4 mt-1">φ = arctan(XL/R)</div>
              <div className="text-sm text-gray-600 ml-4">Current lags voltage by this angle in inductive circuits</div>
            </div>
            <div>
              <strong>Power Factor:</strong>
              <div className="ml-4 mt-1">PF = cos(φ) = R/Z</div>
              <div className="text-sm text-gray-600 ml-4">Ratio of real power to apparent power (lagging for inductive loads)</div>
            </div>
          </div>
        </div>
        <p>
          The angular frequency ω provides a convenient way to work with reactance: XL = ωL directly relates reactance to inductance without the 2π factor. In RL circuits, the impedance vector has a real component (resistance R) and an imaginary component (reactance XL), with the phase angle indicating how much the current lags the voltage.
        </p>
      </SEOSection>

      <SEOSection title="Common Inductor Values and Reactances">
        <div className="overflow-x-auto my-4">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Application</th>
                <th className="border border-gray-300 px-4 py-2">Inductance</th>
                <th className="border border-gray-300 px-4 py-2">Frequency</th>
                <th className="border border-gray-300 px-4 py-2">Reactance (XL)</th>
                <th className="border border-gray-300 px-4 py-2">Typical Use</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">RF Choke</td>
                <td className="border border-gray-300 px-4 py-2">100 μH</td>
                <td className="border border-gray-300 px-4 py-2">1 MHz</td>
                <td className="border border-gray-300 px-4 py-2">628 Ω</td>
                <td className="border border-gray-300 px-4 py-2">Radio frequency filtering</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Power Supply Filter</td>
                <td className="border border-gray-300 px-4 py-2">10 mH</td>
                <td className="border border-gray-300 px-4 py-2">120 Hz</td>
                <td className="border border-gray-300 px-4 py-2">7.54 Ω</td>
                <td className="border border-gray-300 px-4 py-2">AC line filtering (60Hz rectified)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Audio Crossover</td>
                <td className="border border-gray-300 px-4 py-2">2.2 mH</td>
                <td className="border border-gray-300 px-4 py-2">1 kHz</td>
                <td className="border border-gray-300 px-4 py-2">13.8 Ω</td>
                <td className="border border-gray-300 px-4 py-2">Speaker frequency division</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Motor Winding</td>
                <td className="border border-gray-300 px-4 py-2">500 mH</td>
                <td className="border border-gray-300 px-4 py-2">60 Hz</td>
                <td className="border border-gray-300 px-4 py-2">188 Ω</td>
                <td className="border border-gray-300 px-4 py-2">AC motor inductance</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Antenna Coil</td>
                <td className="border border-gray-300 px-4 py-2">10 μH</td>
                <td className="border border-gray-300 px-4 py-2">100 MHz</td>
                <td className="border border-gray-300 px-4 py-2">6283 Ω</td>
                <td className="border border-gray-300 px-4 py-2">FM radio tuning circuit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Inductive Reactance">
        <SEOList
          items={[
            '<strong>Power Factor Correction:</strong> Industrial facilities use inductors to balance capacitive loads and improve power factor, reducing energy costs and improving power quality in AC distribution systems.',
            '<strong>RF Filters and Tuning:</strong> Radio receivers and transmitters use inductors with specific reactances to select desired frequencies while blocking unwanted signals, forming LC resonant circuits.',
            '<strong>AC Motor Design:</strong> Motor windings have significant inductance that determines starting current, torque characteristics, and power factor. Reactance calculations are essential for motor specification and control.',
            '<strong>Power Supply Filtering:</strong> Inductors block AC ripple while passing DC, smoothing the output of rectifiers in power supplies. The reactance at the ripple frequency determines filtering effectiveness.',
            '<strong>Impedance Matching:</strong> Inductors match source and load impedances in audio systems, RF amplifiers, and transmission lines, maximizing power transfer and minimizing reflections.',
            '<strong>Energy Storage:</strong> Inductors store energy in magnetic fields, used in switching regulators, flyback converters, and pulsed power applications where controlled energy release is needed.',
            '<strong>Current Limiting:</strong> Series inductors limit fault currents in power systems and provide soft-start for motors, protecting circuits from damage during transient conditions.',
            '<strong>EMI/RFI Suppression:</strong> Common-mode and differential-mode chokes present high reactance to noise frequencies, preventing electromagnetic interference from coupling into or out of circuits.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <div className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 1: Calculate Reactance of Power Line Inductor</h4>
            <p><strong>Given:</strong> L = 50 mH, f = 60 Hz (standard AC power)</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">XL = 2πfL = 2π × 60 × 0.05 = 18.85 Ω</p>
            <p className="ml-4">ω = 2πf = 377 rad/s</p>
            <p><strong>Result:</strong> The inductor presents 18.85 Ω opposition to 60 Hz current, suitable for current limiting in power circuits.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 2: Find Inductance for RF Choke</h4>
            <p><strong>Given:</strong> XL = 1000 Ω at f = 10 MHz (RF application)</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">L = XL / (2πf) = 1000 / (2π × 10,000,000) = 15.92 μH</p>
            <p><strong>Result:</strong> A 15.92 μH inductor provides 1000 Ω reactance at 10 MHz, blocking RF while passing DC.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 3: Calculate RL Circuit Impedance</h4>
            <p><strong>Given:</strong> R = 50 Ω, L = 100 mH, f = 1 kHz</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">XL = 2πfL = 2π × 1000 × 0.1 = 628.3 Ω</p>
            <p className="ml-4">Z = √(R² + XL²) = √(50² + 628.3²) = 630.3 Ω</p>
            <p className="ml-4">φ = arctan(XL/R) = arctan(628.3/50) = 85.4°</p>
            <p className="ml-4">PF = cos(85.4°) = 0.079 (lagging)</p>
            <p><strong>Result:</strong> Total impedance is 630.3 Ω with current lagging voltage by 85.4°, indicating a highly inductive load.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 4: Resonant Frequency Application</h4>
            <p><strong>Given:</strong> L = 10 μH, need XL = 100 Ω for impedance matching</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">f = XL / (2πL) = 100 / (2π × 0.00001) = 1.592 MHz</p>
            <p><strong>Result:</strong> At 1.592 MHz, the 10 μH inductor presents 100 Ω reactance, suitable for AM radio tuning circuits.</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Example 5: Motor Starting Reactance</h4>
            <p><strong>Given:</strong> Motor winding: L = 200 mH, f = 60 Hz, R = 5 Ω</p>
            <p><strong>Solution:</strong></p>
            <p className="ml-4">XL = 2πfL = 2π × 60 × 0.2 = 75.4 Ω</p>
            <p className="ml-4">Z = √(5² + 75.4²) = 75.6 Ω</p>
            <p className="ml-4">φ = arctan(75.4/5) = 86.2°</p>
            <p><strong>Result:</strong> Starting impedance is 75.6 Ω with 86.2° phase angle, explaining high inrush current and low starting power factor.</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Phase Relationships in Inductive Circuits">
        <p>
          In purely inductive AC circuits, the current lags the voltage by exactly 90° (π/2 radians). This occurs because the inductor&apos;s back-EMF opposes current changes, causing the current to reach its peak a quarter cycle after the voltage peak. The instantaneous voltage across an inductor is v(t) = L(di/dt), meaning voltage is proportional to the rate of current change, not the current itself.
        </p>
        <p>
          In practical RL circuits (series resistance and inductance), the phase angle is between 0° and 90°, determined by φ = arctan(XL/R). When XL ≫ R, the circuit is highly inductive with φ approaching 90°. When R ≫ XL, the circuit behaves more resistively with φ approaching 0°. The power factor PF = cos(φ) indicates how much of the total power (apparent power S = VI) is actually consumed as real power (P = VI×cos(φ)). The remaining reactive power (Q = VI×sin(φ)) circulates between source and inductor, storing and releasing magnetic energy each cycle without being consumed.
        </p>
        <p>
          Understanding these phase relationships is crucial for power systems engineering. Poor power factor (low PF) caused by inductive loads requires higher current to deliver the same real power, increasing I²R losses in distribution systems. Utilities often charge penalties for low power factor, making power factor correction with capacitors (which have opposite phase characteristics) economically important for industrial facilities.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Why does inductive reactance increase with frequency?',
            answer: 'Inductive reactance XL = 2πfL increases with frequency because higher frequencies mean faster current changes (di/dt). According to Faraday&apos;s Law, the induced voltage opposing current change (v = L×di/dt) is larger at higher frequencies, creating greater opposition to current flow. At DC (f = 0), there is no reactance and the inductor acts as a short circuit. At very high frequencies, reactance becomes very large and the inductor acts as an open circuit. This frequency-dependent behavior makes inductors useful as high-pass filters and RF chokes.'
          },
          {
            question: 'What is the difference between reactance and impedance?',
            answer: 'Reactance (XL) is the opposition to AC current caused solely by inductance, measured in ohms but representing energy storage rather than dissipation. Impedance (Z) is the total opposition to AC current, combining both resistance (energy dissipation) and reactance (energy storage). For a series RL circuit, Z = √(R² + XL²). Resistance is the real component causing power loss, while reactance is the imaginary component causing phase shift. Impedance magnitude determines current amplitude (I = V/Z), while impedance angle determines phase relationship between voltage and current.'
          },
          {
            question: 'How do you calculate the impedance of an RL circuit?',
            answer: 'For a series RL circuit, calculate impedance using Z = √(R² + XL²) where R is resistance and XL = 2πfL is inductive reactance. First find XL at the operating frequency, then combine with R using the Pythagorean theorem (since R and XL are perpendicular in the complex plane). The phase angle is φ = arctan(XL/R), and power factor is PF = cos(φ) = R/Z. For parallel RL circuits, use 1/Z = √((1/R)² + (1/XL)²). The current lags voltage by angle φ in inductive circuits, opposite to capacitive circuits where current leads voltage.'
          },
          {
            question: 'Why does current lag voltage in an inductor?',
            answer: 'Current lags voltage in an inductor because of Lenz&apos;s Law: the inductor generates a back-EMF that opposes current changes. When voltage across an inductor increases, the growing current creates an expanding magnetic field that induces a voltage opposing the current increase. The relationship v = L(di/dt) shows voltage is proportional to the rate of current change, not the current itself. Therefore, voltage must change before current can change, causing current to lag. In a pure inductor, this lag is exactly 90°. This phase relationship is fundamental to AC motor operation, transformers, and reactive power in power systems.'
          },
          {
            question: 'What is angular frequency (ω) and how is it used?',
            answer: 'Angular frequency ω (omega) is the rate of change of phase in radians per second, related to frequency f in Hertz by ω = 2πf. It represents how many radians of the AC waveform occur per second (one complete cycle = 2π radians). In reactance calculations, XL = ωL is often more convenient than XL = 2πfL, especially when working with complex impedances in the frequency domain. Angular frequency is natural for describing sinusoidal motion and AC circuits because it directly relates to the sine and cosine functions used in phasor analysis. At 60 Hz AC power, ω = 377 rad/s; at 1 MHz RF, ω = 6.28 × 10⁶ rad/s.'
          },
          {
            question: 'How does inductive reactance affect power factor?',
            answer: 'Inductive reactance reduces power factor by causing current to lag voltage, creating reactive power that circulates without doing useful work. Power factor PF = cos(φ) where φ = arctan(XL/R) is the phase angle. A purely resistive load (XL = 0) has PF = 1.0 (unity), while a purely inductive load (R = 0) has PF = 0. Most industrial loads are inductive (motors, transformers) with lagging power factors of 0.7-0.9. Low power factor requires higher current to deliver the same real power (P = V×I×PF), increasing distribution losses and requiring larger equipment. Utilities charge penalties for PF < 0.95, making power factor correction with capacitors economically important for facilities with large inductive loads.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
