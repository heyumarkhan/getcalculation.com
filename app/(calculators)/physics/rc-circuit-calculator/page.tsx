import { Metadata } from 'next';
import CalculatorPageTemplate from '@/app/_components/layouts/CalculatorPageTemplate';
import RCCircuitCalculator from '@/app/_components/calculators/RCCircuitCalculator';
import { SEOSection, SEOFAQ } from '@/app/_components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'RC Circuit Calculator | Time Constant, Charging Voltage & Impedance Calculator',
  description:
    'Free online RC Circuit Calculator. Calculate time constant (τ = RC), charging voltage, cutoff frequency, and impedance for resistor-capacitor circuits. Perfect for electronics design and signal filtering.',
  keywords: [
    'rc circuit calculator',
    'time constant calculator',
    'charging voltage calculator',
    'capacitor charging calculator',
    'rc time constant formula',
    'tau calculation',
    'rc filter calculator',
    'cutoff frequency calculator',
    'impedance calculator',
    'capacitive reactance calculator',
    'circuit analysis calculator',
    'electronics calculator',
    'resistor capacitor calculator',
    'charge time calculator',
    'discharge calculator',
    'exponential decay calculator',
    'low pass filter calculator',
    'rc decay calculator',
    'circuit design calculator',
    'signal filtering calculator',
    'coupling circuit calculator',
    'decoupling circuit calculator',
    'integrator circuit calculator',
    'differentiator circuit calculator',
  ],
  openGraph: {
    title: 'RC Circuit Calculator',
    description: 'Calculate RC circuit parameters including time constant, charging voltage, cutoff frequency, and impedance.',
    type: 'website',
  },
};

export default function RCCircuitPage() {
  return (
    <CalculatorPageTemplate
      title="RC Circuit Calculator: Calculate Time Constant τ = RC, Charging Voltage & Impedance"
      description="Calculate RC circuit parameters including time constant (τ = RC), capacitor charging voltage V(t) = V₀(1-e^(-t/RC)), cutoff frequency f_c = 1/(2πRC), and impedance Z = √(R² + Xc²). Complete electronics calculator for signal filtering, timing, and circuit analysis."
      calculator={<RCCircuitCalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/rc-circuit-calculator"
      category="Electronics"
      features={[
        'Calculate time constant τ = RC for charging/discharging behavior',
        'Determine capacitor charging voltage with exponential response',
        'Find cutoff frequency for RC low pass filter design',
        'Calculate impedance and phase angle at specific frequencies',
        'Support for multiple resistance units (Ω, mΩ, kΩ, MΩ)',
        'Support for multiple capacitance units (F, μF, nF, pF)',
        'Support for multiple frequency units (Hz, kHz, MHz)',
        'Step-by-step calculations with intermediate values',
        'Perfect for signal processing and circuit design',
      ]}
    >
      <SEOSection title="Understanding RC Circuits">
        <p>
          An RC circuit is one of the most fundamental configurations in electronics, consisting of a resistor (R) and 
          capacitor (C) connected in series or parallel. RC circuits are essential components in virtually all analog 
          electronic systems, from audio amplifiers to timing circuits to signal filters.
        </p>
        <p>
          The behavior of RC circuits is characterized by the time constant τ (tau), which is the product of resistance 
          and capacitance: τ = R × C. This simple parameter determines how quickly the capacitor charges or discharges 
          through the resistor. The time constant affects everything from signal rise time to filter cutoff frequency.
        </p>
        <p>
          RC circuits are used for:
        </p>
        <ul>
          <li>Timing and delay circuits (oscillators, timers, function generators)</li>
          <li>Signal filtering (low pass, high pass, band pass filters)</li>
          <li>Coupling and decoupling (AC coupling, blocking DC)</li>
          <li>Integrator and differentiator circuits</li>
          <li>Power supply filtering and smoothing</li>
          <li>Signal conditioning and noise reduction</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use the RC Circuit Calculator">
        <p>This calculator provides four analysis modes for comprehensive RC circuit calculations:</p>
        <ol>
          <li><strong>Time Constant (τ):</strong> Calculate τ = R × C from resistance and capacitance values. The time constant 
          determines how quickly the circuit responds to changes, with the capacitor reaching 63.2% of final voltage in one 
          time constant.</li>
          <li><strong>Charging Voltage:</strong> Determine the capacitor voltage at any point in time using V(t) = V₀(1 - e^(-t/RC)). 
          Shows exponential approach to steady state and time to reach specific charge percentages.</li>
          <li><strong>Cutoff Frequency:</strong> Calculate f_c = 1/(2πRC) for the -3dB frequency where the RC circuit acts as a 
          low pass filter, attenuating high-frequency signals.</li>
          <li><strong>Impedance:</strong> Find the total AC impedance Z = √(R² + Xc²) and phase angle at a specific frequency, 
          showing how the circuit responds to AC signals.</li>
        </ol>
        <p>
          Select a calculation mode, enter your component values with appropriate units, and click Calculate. The calculator 
          displays results with step-by-step formulas and intermediate calculations for learning and verification.
        </p>
      </SEOSection>

      <SEOSection title="RC Circuit Formulas and Equations">
        <p><strong>Time Constant</strong></p>
        <p><strong>τ = R × C</strong> (in seconds)</p>
        <p>
          The time constant defines the circuit's response speed. After one time constant, a charging capacitor reaches 63.2% 
          of final voltage. After 5τ, it reaches 99.3% (fully charged for practical purposes).
        </p>
        <p><strong>Charging Voltage (Series RC)</strong></p>
        <p><strong>V(t) = V₀ × (1 - e^(-t/RC))</strong></p>
        <p>Where:</p>
        <ul>
          <li>V(t) = voltage across capacitor at time t</li>
          <li>V₀ = initial applied voltage</li>
          <li>e = 2.71828 (Euler's number)</li>
          <li>t = elapsed time</li>
          <li>RC = time constant τ</li>
        </ul>
        <p><strong>Discharging Voltage</strong></p>
        <p><strong>V(t) = V₀ × e^(-t/RC)</strong></p>
        <p>When a charged capacitor discharges through a resistor, voltage decreases exponentially.</p>
        <p><strong>Cutoff Frequency (Low Pass Filter)</strong></p>
        <p><strong>f_c = 1 / (2πRC)</strong> (in Hz)</p>
        <p>
          This is the -3dB frequency where the filter attenuates the output to 70.7% of input amplitude. Frequencies above 
          f_c are increasingly attenuated. The first-order RC filter has a roll-off rate of 20 dB/decade.
        </p>
        <p><strong>Capacitive Reactance</strong></p>
        <p><strong>Xc = 1 / (2πfC)</strong> (in ohms)</p>
        <p>
          Capacitive reactance represents the opposition to AC current flow. It decreases at higher frequencies, meaning 
          capacitors more readily pass high-frequency signals.
        </p>
        <p><strong>Total Impedance (Series RC)</strong></p>
        <p><strong>Z = √(R² + Xc²)</strong></p>
        <p>The total AC impedance combines resistive and capacitive opposition to current flow.</p>
        <p><strong>Phase Angle</strong></p>
        <p><strong>θ = arctan(-Xc/R)</strong> (in degrees)</p>
        <p>Negative phase angle indicates capacitive behavior (current leads voltage).</p>
      </SEOSection>

      <SEOSection title="Time Constant and Exponential Response">
        <p>
          The time constant τ is the most important parameter in RC circuit analysis. It characterizes how quickly the circuit 
          responds to changes in voltage or current.
        </p>
        <p><strong>Charging Behavior</strong></p>
        <ul>
          <li>At t = 1τ: Capacitor reaches 63.2% of final voltage (63.2% charged)</li>
          <li>At t = 2τ: Capacitor reaches 86.5% of final voltage</li>
          <li>At t = 3τ: Capacitor reaches 95.0% of final voltage</li>
          <li>At t = 5τ: Capacitor reaches 99.3% of final voltage (essentially fully charged)</li>
          <li>At t = 10τ: Capacitor reaches 99.995% of final voltage</li>
        </ul>
        <p>
          This exponential approach means the capacitor charges quickly at first, then the charging rate slows as it approaches 
          final voltage. This is fundamentally different from linear charging.
        </p>
        <p><strong>Practical Implications</strong></p>
        <p>
          Designers typically consider the circuit "settled" after 5 time constants. For example, a 1 kΩ, 1 μF RC circuit has 
          τ = 1 ms, settling in 5 ms. A 1 MΩ, 1 μF circuit has τ = 1 s, settling in 5 seconds.
        </p>
      </SEOSection>

      <SEOSection title="RC Filters and Frequency Response">
        <p>
          The RC circuit acts as a first-order low pass filter, allowing low-frequency signals to pass while attenuating high 
          frequencies. The cutoff frequency f_c = 1/(2πRC) defines the transition point.
        </p>
        <p><strong>Frequency Response Characteristics</strong></p>
        <ul>
          <li><strong>Below f_c:</strong> Signal passes with minimal attenuation (typically less than -3dB)</li>
          <li><strong>At f_c:</strong> Signal is attenuated to -3dB (70.7% amplitude or 50% power)</li>
          <li><strong>Above f_c:</strong> Signal is increasingly attenuated at -20dB/decade (6dB/octave)</li>
          <li><strong>Phase shift:</strong> 0° at DC, -45° at f_c, approaching -90° at high frequencies</li>
        </ul>
        <p><strong>Applications</strong></p>
        <ul>
          <li>Audio low pass filter (subwoofer crossover)</li>
          <li>Anti-aliasing filter before analog-to-digital conversion</li>
          <li>Noise reduction in sensitive circuits</li>
          <li>Power supply output filtering</li>
          <li>Signal conditioning and smoothing</li>
        </ul>
        <p>
          Higher order filters (multiple RC stages) provide steeper roll-off (40, 60, 80 dB/decade) but require more components 
          and design complexity.
        </p>
      </SEOSection>

      <SEOSection title="Charging and Discharging Curves">
        <p>
          The exponential charging and discharging curves of RC circuits are fundamental to their behavior and create several 
          important characteristics:
        </p>
        <p><strong>Charging Curve (V(t) = V₀(1 - e^(-t/τ)))</strong></p>
        <ul>
          <li>Starts with maximum charging rate when capacitor is empty</li>
          <li>Charging rate decreases exponentially as voltage approaches final value</li>
          <li>Current through resistor also decreases exponentially: I(t) = (V₀/R) × e^(-t/τ)</li>
          <li>Curve is asymptotic—theoretically never fully reaches V₀ but reaches 99.3% after 5τ</li>
        </ul>
        <p><strong>Discharging Curve (V(t) = V₀ × e^(-t/τ))</strong></p>
        <ul>
          <li>Starts with capacitor at initial voltage V₀</li>
          <li>Voltage decreases exponentially through the resistor</li>
          <li>Discharge current: I(t) = (V₀/R) × e^(-t/τ) (same magnitude as charging current)</li>
          <li>Discharge rate is proportional to instantaneous voltage</li>
        </ul>
        <p>
          Both charging and discharging follow the same exponential time constant, so the circuit is reversible. The time 
          to discharge from 100% to 37% (opposite of charge to 63%) is also one time constant.
        </p>
      </SEOSection>

      <SEOSection title="Impedance and AC Circuit Behavior">
        <p>
          In AC analysis, resistors and capacitors have different frequency-dependent behaviors. The impedance of an RC circuit 
          combines resistive (constant) and reactive (frequency-dependent) components.
        </p>
        <p><strong>Impedance Characteristics</strong></p>
        <ul>
          <li><strong>At DC (f = 0):</strong> Capacitive reactance is infinite, so impedance is purely resistive (Z = R)</li>
          <li><strong>At Low Frequencies:</strong> Capacitive reactance dominates, impedance is high and primarily capacitive</li>
          <li><strong>At Cutoff Frequency f_c:</strong> Xc = R, so Z = √(2R²) = 1.414R, phase angle = -45°</li>
          <li><strong>At High Frequencies:</strong> Xc becomes negligible, impedance approaches pure resistance (Z → R)</li>
        </ul>
        <p><strong>Current and Voltage Relationships</strong></p>
        <p>
          At the cutoff frequency, current leads voltage by 45 degrees (capacitive behavior). This phase shift is crucial for 
          filter design, feedback circuits, and stability analysis.
        </p>
      </SEOSection>

      <SEOSection title="Practical RC Circuit Applications">
        <p><strong>Timing Circuits</strong></p>
        <p>
          RC circuits provide simple timing functions. A 555 timer IC uses an RC circuit to generate delays. By varying R or C, 
          you can create adjustable timers from milliseconds to hours.
        </p>
        <p><strong>Signal Filtering</strong></p>
        <p>
          RC low pass filters are extensively used to remove high-frequency noise, eliminate aliasing before analog-to-digital 
          conversion, and smooth PWM signals. Coffee machine brew timers, LED brightness control, and motor speed control all 
          use RC filtering.
        </p>
        <p><strong>AC Coupling</strong></p>
        <p>
          Coupling capacitors with source and load resistances form RC high pass filters, blocking DC while passing AC signals. 
          Used in audio amplifiers, instrumentation, and signal conditioning.
        </p>
        <p><strong>Differentiator and Integrator Circuits</strong></p>
        <p>
          RC circuits combined with op-amps create differentiation and integration circuits essential for analog signal processing, 
          measurement systems, and automatic control.
        </p>
        <p><strong>Power Supply Filtering</strong></p>
        <p>
          RC or LC networks smooth rectified AC power, reducing ripple voltage. The filter's cutoff frequency is chosen to 
          attenuate the ripple frequency while passing DC.
        </p>
      </SEOSection>

      <SEOSection title="RC Circuit Design Considerations">
        <p><strong>Component Selection</strong></p>
        <ul>
          <li>Tolerance: Capacitor and resistor tolerances combine to affect actual time constant</li>
          <li>Temperature Stability: Capacitor values drift with temperature; use temperature-compensated types if critical</li>
          <li>Frequency Response: Resistors and capacitors have parasitic effects at high frequencies</li>
          <li>Power Rating: Resistor must dissipate power during charging without overheating</li>
        </ul>
        <p><strong>Design Trade-offs</strong></p>
        <ul>
          <li><strong>Larger RC:</strong> Longer time constant but smaller peak charging current and lower noise</li>
          <li><strong>Smaller RC:</strong> Faster response but higher peak currents and more noise sensitivity</li>
          <li><strong>Low Pass Filter:</strong> Larger RC = lower cutoff frequency and steeper roll-off, but slower response time</li>
        </ul>
        <p><strong>Loading Effects</strong></p>
        <p>
          When another circuit connects to the capacitor output, it acts as a load that affects the effective time constant. 
          Buffer amplifiers isolate the load and preserve the designed time constant.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the RC time constant and what does it represent?',
            answer:
              'The RC time constant (τ = R × C) represents the time required for a capacitor to charge to 63.2% (or discharge to 36.8%) of its final value through a resistor. It determines the speed of circuit response. A larger time constant means slower charging/discharging; a smaller time constant means faster response.',
          },
          {
            question: 'How long does it take for a capacitor to fully charge in an RC circuit?',
            answer:
              'Mathematically, a capacitor never fully charges (the curve approaches V₀ asymptotically). However, for practical purposes, capacitors are considered fully charged after 5 time constants (5τ), when they reach 99.3% of final voltage. After 3τ, they reach 95%, which is acceptable for many applications.',
          },
          {
            question: 'What is the RC circuit cutoff frequency and why is it important?',
            answer:
              'The cutoff frequency f_c = 1/(2πRC) is the frequency at which an RC low pass filter attenuates the signal to -3dB (70.7% amplitude). Frequencies above f_c are increasingly filtered. It\'s crucial for filter design, anti-aliasing, and noise reduction.',
          },
          {
            question: 'How does capacitive reactance change with frequency?',
            answer:
              'Capacitive reactance Xc = 1/(2πfC) decreases as frequency increases. At DC, reactance is infinite (capacitor blocks DC). At high frequencies, reactance approaches zero (capacitor conducts high frequencies). This frequency-dependent behavior makes capacitors useful for filters.',
          },
          {
            question: 'What is the difference between charging and discharging curves?',
            answer:
              'Charging: V(t) = V₀(1 - e^(-t/RC)) starts at 0V and approaches V₀. Discharging: V(t) = V₀e^(-t/RC) starts at V₀ and approaches 0V. Both follow the same time constant τ = RC. The rate of charge equals the rate of discharge at any given voltage level.',
          },
          {
            question: 'How does RC circuit impedance vary with frequency?',
            answer:
              'At DC, impedance equals resistance R. As frequency increases, impedance decreases due to decreasing capacitive reactance. At high frequencies, impedance approaches R. At cutoff frequency f_c, impedance equals √(2)R ≈ 1.414R with -45° phase angle.',
          },
          {
            question: 'What are common applications of RC circuits?',
            answer:
              'RC circuits are used in timing circuits (555 timers), low pass filters (noise reduction, anti-aliasing), AC coupling (blocking DC), differentiators and integrators, power supply filtering, signal conditioning, and many analog electronic applications.',
          },
          {
            question: 'How do component tolerances affect RC circuit performance?',
            answer:
              'Resistor and capacitor tolerances directly affect the actual time constant. A 10% resistor and 10% capacitor can result in ±19% error in τ. For critical applications, use 1% or better tolerance components, or trim using variable resistors.',
          },
        ]}
      />
    </CalculatorPageTemplate>
  );
}
