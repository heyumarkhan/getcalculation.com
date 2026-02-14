import RLCImpedanceCalculator from '../../../_components/calculators/RLCImpedanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'RLC Impedance Calculator | Series RLC Reactance, Phase, Resonance';
const description = 'Calculate series RLC impedance magnitude, phase angle, resonance, reactance, Q factor, and current.';
const keywords = [
  'RLC impedance calculator',
  'series rlc calculator',
  'rlc circuit impedance',
  'rlc reactance calculator',
  'rlc resonance calculator',
  'reactance calculator',
  'quality factor calculator',
  'bandwidth calculator',
  'phase angle calculator',
  'inductive reactance calculator',
  'capacitive reactance calculator',
  'resonant frequency calculator',
  'tune capacitance resonance',
  'series rlc current calculator',
  'voltage drop rlc',
  'complex impedance calculator',
  'ac circuit calculator',
  'electrical engineering calculator',
  'physics electronics calculator',
  'power factor phase calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/rlc-impedance-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/rlc-impedance-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RLCImpedanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Impedance Calculator | RLC Circuit Reactance, Phase & Resonance Analysis"
      description="Calculate impedance for RLC circuits instantly. Free impedance calculator with reactance, phase angle, resonant frequency, and Q factor analysis."
      calculator={<RLCImpedanceCalculator />}
      slug="physics/rlc-impedance-calculator"
      category="Electromagnetism"
      features={[
        "Accurate complex impedance calculations",
        "Series and resonant circuit analysis",
        "Phase angle and reactance computation",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Impedance Calculations Are Essential for Circuit Design">
        <p>
          Every electronic device—from smartphone chargers to radio transmitters—relies on precise impedance matching to transfer power efficiently and prevent signal reflections that cause interference and component damage. Engineers designing audio crossover networks must calculate exact impedance values to prevent speaker damage and frequency response distortion, while RF engineers use impedance calculations to match antenna feed lines and maximize radiated power. AC circuit analysis becomes exponentially more complex than DC calculations because resistors, inductors, and capacitors interact with frequency-dependent reactance, creating phase shifts between voltage and current that simple Ohm's law cannot handle. This impedance calculator eliminates tedious complex number arithmetic and trigonometric calculations, instantly determining impedance magnitude, phase angle, resonant frequency, quality factor, and component voltage drops for series RLC circuits. Whether you're troubleshooting power supply ripple, designing bandpass filters for communication systems, or analyzing resonant tank circuits in switching regulators, understanding how resistance and reactance combine into complex impedance is fundamental to electrical engineering. For complementary circuit analysis involving pure resistance, our {createInternalLink('ohms-law-resistance-calculator')} provides straightforward DC calculations where phase angles don't apply.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation method (series impedance, resonance & Q factor, capacitance tuning, or current & voltage analysis)</li>
          <li><strong>Step 2:</strong> Enter component values (resistance in ohms, inductance in henries or mH, capacitance in farads or µF) and operating frequency in Hz or kHz</li>
          <li><strong>Step 3:</strong> Click Calculate to view impedance magnitude, phase angle, inductive reactance (XL), capacitive reactance (XC), resonant frequency, Q factor, and voltage drops</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Impedance Calculator Formula">
        <p>
          Impedance (Z) is the AC equivalent of resistance, combining resistive opposition (R) with reactive opposition from inductors and capacitors. Unlike pure resistance which dissipates energy, reactance stores and releases energy each cycle, creating phase shifts between voltage and current. Inductive reactance (XL = 2πfL) increases with frequency—inductors oppose current changes more at higher frequencies. Capacitive reactance (XC = 1/(2πfC)) decreases with frequency—capacitors oppose voltage changes less at higher frequencies. In series RLC circuits, these reactances oppose each other, and total impedance combines resistance with net reactance using vector (complex number) addition.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">|Z| = √[R² + (XL - XC)²]</p>
        </div>
        <p>Where |Z| is impedance magnitude, R is resistance, XL = 2πfL is inductive reactance, and XC = 1/(2πfC) is capacitive reactance. Phase angle φ = arctan[(XL - XC)/R].</p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate impedance for an audio crossover network: R = 8 Ω (speaker resistance), L = 2 mH (inductor), C = 100 µF (capacitor), f = 500 Hz:</p>
        <ul>
          <li>Input: R = 8 Ω, L = 2×10⁻³ H, C = 100×10⁻⁶ F, f = 500 Hz</li>
          <li>Calculate XL: XL = 2π × 500 × 0.002 = 6.28 Ω</li>
          <li>Calculate XC: XC = 1/(2π × 500 × 100×10⁻⁶) = 3.18 Ω</li>
          <li>Net reactance: X = XL - XC = 6.28 - 3.18 = 3.10 Ω (inductive)</li>
          <li>Impedance magnitude: |Z| = √(8² + 3.10²) = √(64 + 9.61) = <strong>8.58 Ω</strong></li>
          <li>Phase angle: φ = arctan(3.10/8) = <strong>21.2°</strong> (current lags voltage, inductive circuit)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Impedance calculations are critical across numerous electrical engineering and electronics applications:</p>
        <SEOList items={[
          "Audio engineering: Designing speaker crossover networks with precise frequency cutoffs, preventing tweeter damage from low-frequency signals and ensuring flat frequency response across driver transitions",
          "RF & wireless: Antenna impedance matching (typically 50 or 75 Ω) to transmission lines, minimizing VSWR and signal reflections that reduce transmit power and cause interference",
          "Power electronics: Analyzing resonant tank circuits in induction heaters, wireless charging coils, and switch-mode power supplies for efficient energy transfer at specific frequencies",
          "Signal processing: Implementing analog filters (low-pass, high-pass, band-pass, notch) with calculated Q factors and bandwidth specifications for communications and instrumentation",
          "AC power systems: Power factor correction capacitor sizing to reduce reactive power, lower utility bills, and prevent voltage drop in industrial three-phase distribution networks"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What's the difference between impedance and resistance?",
            answer: "Resistance (R) is opposition to current flow that dissipates energy as heat, measured in ohms, and is frequency-independent. Impedance (Z) is total opposition in AC circuits, combining resistance with reactance (energy storage in inductors and capacitors), also measured in ohms but varying with frequency. At DC (f=0), impedance equals resistance since XL=0 and XC→∞. Impedance is a complex number (Z = R + jX) with magnitude and phase, while resistance is purely real."
          },
          {
            question: "How do I calculate resonant frequency for an RLC circuit?",
            answer: "Resonant frequency (f₀) occurs when inductive reactance equals capacitive reactance (XL = XC), making total reactance zero and impedance minimum (equals R). Formula: f₀ = 1/(2π√(LC)). For example, with L=10mH and C=1µF: f₀ = 1/(2π√(0.01 × 10⁻⁶)) = 1/(2π × 10⁻⁴) ≈ 1,591 Hz. At resonance, current is maximum, voltage is in phase with current, and reactive power circulates between L and C without external exchange."
          },
          {
            question: "What does Q factor tell me about circuit performance?",
            answer: "Quality factor (Q) measures resonance sharpness and energy storage efficiency. For series RLC: Q = (1/R)√(L/C) = f₀L/R = 1/(f₀CR). Higher Q means: 1) Narrower bandwidth (BW = f₀/Q), 2) Sharper frequency selectivity for filters, 3) Higher reactive voltages across L and C (can exceed source voltage by Q times), 4) Lower energy loss per cycle. Low-Q circuits (<1) are overdamped, high-Q (>10) are highly selective. Typical ranges: audio filters Q=0.5-5, RF tuned circuits Q=50-200."
          },
          {
            question: "Why can voltage across a capacitor or inductor exceed the supply voltage?",
            answer: "In resonant or near-resonant RLC circuits, reactive voltages VL and VC can be much larger than source voltage Vs due to circulating reactive power and phase relationships. At resonance, VL and VC are equal in magnitude but 180° out of phase, canceling each other while individually reaching Q × Vs. For example, with Vs=10V and Q=10, VL and VC can each reach 100V. This is energy sloshing between L and C, not violating energy conservation. Always rate components for these peak voltages, not just source voltage."
          },
          {
            question: "How do I use impedance calculations for antenna matching?",
            answer: "Most transmitters output 50Ω impedance, and coaxial cables are 50Ω or 75Ω. For maximum power transfer and minimum reflections, antenna impedance must match the transmission line. Measure antenna impedance at operating frequency (often complex, like 35-j15 Ω). Use matching networks (L-network, stub matching) with calculated L and C values to transform antenna impedance to 50Ω. This calculator helps design matching elements. Mismatch causes standing waves (high VSWR), reducing radiated power and potentially damaging transmitters."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering impedance calculations is fundamental for anyone working with AC circuits, from hobbyists building audio equipment to professional RF engineers designing communication systems. This calculator transforms complex phasor mathematics into accessible results, accelerating design work and troubleshooting.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('capacitance-calculator')} or the popular {createInternalLink('inductance-calculator')} for comprehensive reactive component analysis and circuit design calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
