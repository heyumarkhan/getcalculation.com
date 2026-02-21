import InductiveReactanceCalculator from '../../../_components/calculators/InductiveReactanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Inductive Reactance Calculator | XL = 2πfL';
const description = 'Inductive Reactance Calculator for AC coils: compute XL from frequency and inductance with 2πfL, plus impedance and phase insight for design.';
const keywords = [
  'inductive reactance calculator',
  'xl formula calculator',
  'inductive reactance formula',
  'ac reactance calculator',
  'inductor reactance',
  '2 pi f l',
  'reactance inductor',
  'ac circuit reactance',
  'inductance frequency calculator',
  'reactance from frequency',
  'rl circuit reactance',
  'phase angle inductive',
  'power factor inductive',
  'omega l calculator',
  'ac impedance calculator',
  'henry to reactance',
  'coil reactance calculator',
  'inductor xl',
  'electrical reactance',
  'reactance calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', ')
};

export default function InductiveReactanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Inductive Reactance Calculator for AC Circuits"
      description="Use the Inductive Reactance Calculator to compute XL fast from frequency and inductance. Get accurate ohms for AC filters, coils, and motors."
      calculator={<InductiveReactanceCalculator />}
      slug="physics/inductive-reactance-calculator"
      category="Physics"
      features={[
        "Accurate XL results from frequency and inductance",
        "Simple inputs with clear unit handling",
        "Mobile-friendly layout for quick checks",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Inductive Reactance Calculations Are Critical in AC Circuit Design">
        <p>
          Understanding inductive reactance is fundamental to designing AC circuits that perform reliably and efficiently. When engineers design power supplies, motor controllers, RF filters, or audio equipment, they must account for how inductors resist alternating current differently at each frequency. A 100mH choke that provides 3.14Ω reactance at 50Hz becomes 314Ω at 50kHz—a 100× increase that dramatically affects circuit behavior. This frequency-dependent impedance determines current flow, voltage drop, power factor, and filter performance across countless applications. In three-phase motor systems, incorrect inductive reactance calculations lead to excessive reactive power, reduced power factor (often penalized by utilities), overheating, and efficiency losses costing thousands in wasted energy annually. Audio crossover designers rely on precise XL calculations to split frequencies between woofers, midrange, and tweeters—errors of just 10% shift crossover points by hundreds of Hertz, creating frequency gaps or overlaps that muddy sound quality. Switch-mode power supplies use inductors as energy storage elements; miscalculating reactance leads to inadequate filtering, excessive ripple current, electromagnetic interference (EMI), and premature component failure. Understanding how {createInternalLink('frequency-calculator')} relationships affect reactance helps engineers predict circuit behavior across the entire operating frequency range, while {createInternalLink('capacitive-reactance-calculator')} provides the complementary capacitive perspective essential for resonant circuit design.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Inductive Reactance Calculator">
        <p>Follow these steps to get instant, accurate reactance calculations:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the inductance value (L) using convenient units—Henries (H), millihenries (mH), or microhenries (μH). The calculator automatically converts to standard Henries. Common ranges: small RF coils (μH), audio crossovers (mH), power line chokes (H).</li>
          <li><strong>Step 2:</strong> Input the AC operating frequency (f) in Hertz (Hz) or kilohertz (kHz). This is the fundamental frequency at which the inductor operates—for 60Hz power systems use 60Hz; for audio applications use the crossover frequency; for RF circuits use the carrier or cutoff frequency.</li>
          <li><strong>Step 3:</strong> Click Calculate to instantly receive inductive reactance (XL) in ohms (Ω), along with additional context including impedance phase angle (90° for ideal inductors), and comparative reactance values at common frequencies for design verification.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Inductive Reactance Formula Explained">
        <p>
          Inductive reactance (XL) quantifies how inductors oppose alternating current through electromagnetic induction. When AC flows through an inductor, the changing current creates a changing magnetic field, which induces a back-EMF (electromotive force) opposing the current change according to Lenz's Law. This opposition is frequency-dependent: higher frequencies produce faster current changes, generating stronger opposing fields and higher reactance. Unlike resistance which dissipates energy as heat, inductive reactance stores energy in a magnetic field during one half-cycle and returns it during the next half-cycle, creating a 90° phase shift where current lags voltage. The formula XL = 2πfL = ωL shows reactance is directly proportional to both frequency (f) and inductance (L), with ω = 2πf representing angular frequency in radians per second.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">X<sub>L</sub> = 2πfL = ωL</p>
          <p className="text-sm text-gray-600 mt-2">Where XL is reactance (Ω), f is frequency (Hz), L is inductance (H), ω is angular frequency (rad/s)</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example: Audio Crossover Design</h4>
        <p>Design a first-order low-pass filter with 1kHz crossover frequency for a woofer with 8Ω impedance, requiring an inductor with matching reactance.</p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
          <li><strong>Known values:</strong> Target crossover frequency f = 1000 Hz, Speaker impedance R = 8Ω, Required XL = 8Ω (for -3dB point)</li>
          <li><strong>Rearrange formula to find inductance:</strong> L = XL/(2πf) = 8/(2π × 1000)</li>
          <li><strong>Calculate:</strong> L = 8/(6283.2) = 0.001273 H = 1.27 mH</li>
          <li><strong>Select standard value:</strong> Use a 1.2mH or 1.5mH inductor (common audio crossover values)</li>
          <li><strong>Verify with 1.2mH:</strong> XL = 2π × 1000 × 0.0012 = 7.54Ω (slightly below target, crossover shifts to ~1060Hz)</li>
          <li><strong>Verify with 1.5mH:</strong> XL = 2π × 1000 × 0.0015 = 9.42Ω (slightly above target, crossover shifts to ~850Hz)</li>
          <li><strong>Design decision:</strong> Choose 1.5mH for better high-frequency attenuation, accepting slightly lower crossover point</li>
        </ol>
        <p className="mt-4"><strong>Alternative Example: 60Hz Power Line Filter</strong></p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Input: L = 100 mH = 0.1 H, f = 60 Hz (US power frequency)</li>
          <li>Calculation: XL = 2π × 60 × 0.1 = 37.7Ω</li>
          <li>At 180Hz (3rd harmonic): XL = 2π × 180 × 0.1 = 113.1Ω (3× higher, providing better harmonic filtering)</li>
          <li>Result: This inductor provides increasing impedance to higher-order harmonics, making it effective for power quality improvement</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications of Inductive Reactance Calculations">
        <p>Inductive reactance calculations are essential across electrical engineering disciplines wherever AC signals interact with magnetic components:</p>
        <SEOList items={[
          "Power Systems: Three-phase motor power factor correction, transformer leakage reactance analysis, grid harmonics filtering, distribution line voltage regulation, reactive power compensation in transmission systems",
          "Audio Engineering: Speaker crossover networks (high-pass/low-pass/band-pass filters), microphone transformers, guitar amplifier tone circuits, studio equipment signal conditioning, impedance matching in balanced audio lines",
          "RF and Wireless: Antenna matching networks, RF choke coils preventing DC path while passing RF signals, EMI/RFI suppression filters, impedance transformation in transmission lines, resonant tank circuits in oscillators",
          "Power Electronics: Switch-mode power supply output inductors, buck/boost converter energy storage, PFC (power factor correction) boost inductors, DC-DC converter filtering, inverter output filtering",
          "Industrial Control: Motor soft-start reactors limiting inrush current, variable frequency drive (VFD) line/load reactors, welding equipment current regulation, induction heating coil design, magnetic amplifier circuits",
          "Automotive Systems: Ignition coil design calculating energy storage and spark voltage, alternator field winding analysis, fuel injector driver circuits, electric vehicle inverter inductors",
          "Telecommunications: ADSL line filters separating voice and data frequencies, telephone line transformers, common-mode chokes in Ethernet interfaces, signal line EMI suppression",
          "Medical Equipment: MRI gradient coil design, defibrillator energy storage inductors, high-frequency surgical generator transformers, patient isolation transformer leakage reactance"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How does the Inductive Reactance Calculator determine XL from frequency and inductance?",
            answer: "The calculator uses the fundamental formula XL = 2πfL, where inductive reactance (XL) in ohms equals 2π (approximately 6.283) multiplied by frequency (f) in Hertz and inductance (L) in Henries. This linear relationship means doubling frequency doubles reactance, and doubling inductance also doubles reactance. The calculator accepts various input units (mH, μH, kHz) and automatically converts them to standard SI units before computing XL, then displays results in ohms with additional context about phase angle and frequency response."
          },
          {
            question: "Why does inductive reactance increase with frequency while capacitive reactance decreases?",
            answer: "This opposite behavior stems from fundamental physics: inductors oppose current changes, so faster AC variations (higher frequency) create stronger back-EMF and higher opposition (XL = 2πfL increases with f). Capacitors oppose voltage changes—at higher frequencies, charge has less time to accumulate, reducing voltage buildup and lowering opposition (XC = 1/(2πfC) decreases with f). This opposite frequency dependence makes inductors high-pass elements and capacitors low-pass elements, forming the basis for all LC filter design. At resonance where XL = XC, these effects cancel, creating the fundamental principle behind tuned circuits."
          },
          {
            question: "What is the difference between inductive reactance and impedance?",
            answer: "Inductive reactance (XL) is the imaginary component of impedance representing purely reactive opposition from inductance, causing 90° current lag with no power dissipation. Impedance (Z) is the total AC opposition including both resistance (R, real component causing power dissipation) and reactance (X, imaginary component storing energy). Calculate total impedance as Z = √(R² + XL²) for an RL circuit. For example, a coil with 10Ω resistance and 20Ω reactance has impedance Z = √(100 + 400) = 22.4Ω at 63.4° phase angle. Pure inductors (zero resistance) have Z = XL, but real inductors always include some DC resistance."
          },
          {
            question: "How do I calculate inductive reactance at DC (0 Hz) and what are the implications?",
            answer: "At DC (f = 0 Hz), inductive reactance XL = 2πfL = 2π(0)L = 0Ω, meaning an ideal inductor presents zero AC opposition and acts as a short circuit (wire) to steady DC current. In practice, real inductors have DC resistance (DCR) measured in ohms, which determines DC current flow: I = V/DCR. This zero-reactance property makes inductors useful as DC passes while blocking AC (RF chokes), power supply filtering (passing DC while smoothing AC ripple), and bias tees (separating DC bias from AC signals). Conversely, at very high frequencies, XL approaches infinity, making inductors open circuits—explaining why parasitic inductance in PCB traces causes signal integrity issues in high-speed digital circuits."
          },
          {
            question: "How do I use inductive reactance calculations for LC resonant circuit design?",
            answer: "Resonant circuits occur when inductive reactance equals capacitive reactance (XL = XC), causing impedance to be purely resistive and current/voltage to be in phase. Calculate resonant frequency as f₀ = 1/(2π√(LC)). For filter design: specify cutoff frequency, choose standard capacitor value, calculate required inductance as L = 1/((2πf₀)²C). For example, designing a 10MHz resonant circuit with 100pF capacitor: L = 1/((2π×10⁷)²×10⁻¹⁰) = 2.53μH. Verify: XL = 2π(10⁷)(2.53×10⁻⁶) = 159Ω, XC = 1/(2π×10⁷×10⁻¹⁰) = 159Ω ✓. Understanding both reactances allows Q-factor optimization for filter sharpness and bandwidth control."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering inductive reactance calculations is essential for designing reliable AC circuits across power systems, audio, RF, and control applications. This Inductive Reactance Calculator provides instant, accurate XL values from frequency and inductance inputs, eliminating manual calculation errors while providing insight into frequency-dependent impedance behavior. Whether designing motor controls, audio crossovers, power supply filters, or impedance matching networks, understanding the XL = 2πfL relationship ensures your circuits perform optimally across their intended frequency range. The calculator's support for multiple input units and instant results accelerates design iterations and facilitates what-if analysis for component selection and tolerance studies.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('resonant-frequency-calculator')} for LC circuit design and tuning applications.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
