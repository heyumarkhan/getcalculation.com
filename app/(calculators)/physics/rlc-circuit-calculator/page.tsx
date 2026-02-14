import RLCCircuitCalculator from '../../../_components/calculators/RLCCircuitCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'RLC Circuit Calculator | Impedance, Resonance, Phase, Power Factor';
const description = 'Analyze RLC circuits for impedance, resonance, phase angle, power factor, and current.';
const keywords = [
  'rlc circuit calculator',
  'series rlc calculator',
  'parallel rlc calculator',
  'rlc impedance calculator',
  'rlc resonance calculator',
  'rlc reactance calculator',
  'rlc phase angle calculator',
  'power factor calculator',
  'bandwidth calculator',
  'quality factor calculator',
  'tune rlc circuit',
  'rlc current calculator',
  'rlc voltage drop',
  'ac circuit calculator',
  'complex impedance calculator',
  'electrical engineering calculator',
  'electronics calculator',
  'physics electromagnetism calculator',
  'series parallel rlc',
  'impedance magnitude calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/rlc-circuit-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/rlc-circuit-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RLCCircuitCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="RLC Circuit Calculator | Analyze Resonance, Impedance & Phase Instantly"
      description="Calculate RLC circuit parameters instantly. Free RLC circuit calculator with series/parallel impedance, resonant frequency, and power factor analysis."
      calculator={<RLCCircuitCalculator />}
      slug="physics/rlc-circuit-calculator"
      category="Electromagnetism"
      features={[
        "Series and parallel circuit analysis",
        "Resonance and Q factor calculation",
        "Real-time phase angle computation",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why RLC Circuit Analysis Is Fundamental to Modern Electronics">
        <p>
          From the radio tuning circuits in your smartphone to the power factor correction systems in industrial facilities, RLC circuits form the backbone of frequency-selective networks and energy-efficient AC systems. Engineers designing audio equipment must precisely calculate resonant frequencies and quality factors to prevent speaker damage from unwanted frequency components, while power system engineers rely on RLC circuit analysis to minimize reactive power losses that waste electricity and generate heat. Understanding how resistors, inductors, and capacitors interact at different frequencies enables everything from crystal-clear radio reception to efficient wireless charging systems. This RLC circuit calculator eliminates hours of complex phasor arithmetic and trigonometric calculations, instantly determining impedance, resonant frequency, bandwidth, phase angles, and power factor for both series and parallel configurations. Whether you're troubleshooting a guitar amplifier's tone circuit, designing an EMI filter for a switching power supply, or analyzing a three-phase industrial motor's starting characteristics, accurate RLC calculations prevent circuit oscillations, component failures, and inefficient energy transfer. For complementary analysis of individual reactive components, our {createInternalLink('capacitive-reactance-calculator')} provides detailed capacitor behavior across frequency ranges.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your circuit configuration (series impedance, parallel impedance, resonance & Q factor, or current & power analysis)</li>
          <li><strong>Step 2:</strong> Enter component values including resistance (ohms), inductance (henries or mH), capacitance (farads or µF), and operating frequency (Hz or kHz)</li>
          <li><strong>Step 3:</strong> Click Calculate to view impedance magnitude, phase angle, inductive/capacitive reactance, resonant frequency, quality factor, bandwidth, and power factor</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: RLC Circuit Calculator Formula">
        <p>
          RLC circuits combine resistive, inductive, and capacitive elements to create frequency-dependent behavior essential for filtering, tuning, and energy storage. In series configurations, resistance dissipates energy while inductance and capacitance store energy in magnetic and electric fields respectively, creating opposing reactances that cancel at resonance. Parallel RLC circuits use admittance (reciprocal of impedance) calculations where conductance and susceptance combine. The resonant frequency—where inductive and capacitive reactances equal each other—determines the circuit's natural oscillation frequency and is critical for applications from radio tuning to quartz crystal oscillators.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">f₀ = 1 / (2π√(LC))</p>
        </div>
        <p>Where f₀ is resonant frequency (Hz), L is inductance (henries), and C is capacitance (farads). For series circuits: |Z| = √[R² + (XL - XC)²], where XL = 2πfL and XC = 1/(2πfC).</p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate resonant frequency and impedance for a radio tuning circuit: L = 100 µH (inductor), C = 100 pF (variable capacitor), R = 10 Ω, operating at resonance:</p>
        <ul>
          <li>Input: L = 100×10⁻⁶ H, C = 100×10⁻¹² F, R = 10 Ω</li>
          <li>Calculate resonant frequency: f₀ = 1 / (2π√(100×10⁻⁶ × 100×10⁻¹²))</li>
          <li>f₀ = 1 / (2π√(10⁻¹⁴)) = 1 / (2π × 10⁻⁷) = <strong>1.592 MHz</strong></li>
          <li>At resonance: XL = 2π × 1.592×10⁶ × 100×10⁻⁶ = 1000 Ω</li>
          <li>XC = 1 / (2π × 1.592×10⁶ × 100×10⁻¹²) = 1000 Ω (cancels XL)</li>
          <li>Impedance at resonance: |Z| = R = <strong>10 Ω</strong> (minimum, purely resistive)</li>
          <li>Quality factor: Q = (1/R)√(L/C) = (1/10)√(100×10⁻⁶ / 100×10⁻¹²) = <strong>100</strong> (sharp tuning)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>RLC circuit calculations are indispensable across electrical engineering and electronics:</p>
        <SEOList items={[
          "RF & communications: Designing tuned amplifiers, oscillators, and antenna matching networks for radio transmitters, receivers, and wireless systems operating from kHz to GHz frequencies",
          "Audio engineering: Creating passive crossover networks for loudspeakers, tone control circuits for instruments, and equalization filters with specific frequency response characteristics",
          "Power systems: Implementing power factor correction capacitor banks to reduce reactive power consumption, harmonic filters to eliminate distortion, and surge protection circuits for transient suppression",
          "Signal processing: Building analog filters (Butterworth, Chebyshev, Bessel) with precise cutoff frequencies, passband ripple, and stopband attenuation for instrumentation and data acquisition",
          "Industrial control: Analyzing motor starting circuits, induction heating systems, and AC drive harmonic mitigation filters to ensure efficient operation and compliance with power quality standards"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What happens at the resonant frequency in an RLC circuit?",
            answer: "At resonance (f₀ = 1/(2π√LC)), inductive reactance XL equals capacitive reactance XC, causing them to cancel perfectly. In series RLC circuits, impedance reaches its minimum value (equals R), current reaches maximum, and the circuit is purely resistive with zero phase angle. Power factor equals 1.0, meaning maximum real power transfer. Energy oscillates between the inductor's magnetic field and capacitor's electric field at this natural frequency without external input."
          },
          {
            question: "How do series and parallel RLC circuits differ in behavior?",
            answer: "Series RLC: Current is common; at resonance impedance is minimum (Z=R), current is maximum, widely used in filters. Parallel RLC: Voltage is common; at resonance impedance is maximum, current is minimum (from source), commonly used in oscillator tank circuits. Series circuits have voltage magnification (VL and VC can exceed source voltage by Q times), while parallel circuits have current magnification. Formulas differ significantly—always specify configuration."
          },
          {
            question: "What does the quality factor (Q) tell me about circuit performance?",
            answer: "Quality factor measures energy storage versus dissipation and resonance sharpness. For series RLC: Q = (1/R)√(L/C) = ωL/R. Higher Q means: 1) Sharper resonance peak with narrower bandwidth (BW = f₀/Q), 2) Better frequency selectivity for filters, 3) Higher circulating reactive power (VL and VC reach Q × Vsource), 4) Lower damping and longer oscillation decay time. Low Q (<1) is overdamped; moderate Q (1-10) for audio; high Q (50-200+) for RF precision tuning."
          },
          {
            question: "How do I calculate bandwidth and what does it represent?",
            answer: "Bandwidth (BW) is the frequency range where power drops to 50% (-3dB) of the peak at resonance. Formula: BW = f₀/Q. For example, an RLC circuit with f₀=10kHz and Q=20 has BW=500Hz, passing frequencies from 9.75kHz to 10.25kHz. Lower cutoff: fL = f₀(√(1+1/(4Q²)) - 1/(2Q)); Upper cutoff: fH = f₀(√(1+1/(4Q²)) + 1/(2Q)). Narrow bandwidth (high Q) provides sharp filtering; wide bandwidth (low Q) allows broader frequency passage."
          },
          {
            question: "Why is power factor important in RLC circuit analysis?",
            answer: "Power factor (PF = cos φ) represents the ratio of real power (watts) to apparent power (volt-amperes). PF = 1.0 means all supplied energy does useful work; PF < 1.0 indicates reactive power circulating between source and load without doing work, requiring larger wire sizes and wasting distribution capacity. In industrial settings, low power factor (typical with inductive motors) incurs utility penalties. RLC circuits can correct power factor: adding capacitance to inductive loads brings phase angle toward zero, improving PF and reducing reactive current by up to 95%."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering RLC circuit analysis is essential for anyone designing or troubleshooting AC circuits, from student electronics labs to professional RF engineering. This calculator transforms tedious impedance calculations into instant results, accelerating design iterations and educational understanding.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('rc-time-constant-calculator')} for time-constant analysis, the {createInternalLink('lc-filter-calculator')} for comprehensive filter design, or the {createInternalLink('inductance-calculator')} for precise coil inductance calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
