import LCFilterCalculator from '../../../_components/calculators/LCFilterCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function LCFilterCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="LC Filter Calculator: Calculate Resonant Frequency f = 1/(2π√LC)"
      description="Calculate LC filter resonant frequency, inductance, capacitance, or characteristic impedance using fundamental formulas. Free online electronics calculator with comprehensive unit support. Perfect for electrical engineering, circuit design, and signal processing applications."
      calculator={<LCFilterCalculator primaryColor="#820ECC" />}
      slug="physics/lc-filter-calculator"
      category="Electronics"
      features={[
        "Calculate resonant frequency from inductance and capacitance",
        "Calculate inductance from resonant frequency and capacitance",
        "Calculate capacitance from resonant frequency and inductance",
        "Calculate characteristic impedance from L and C",
        "Multiple unit support for inductance (H, mH, μH, nH)",
        "Multiple unit support for capacitance (F, mF, μF, nF, pF)",
        "Multiple unit support for frequency (Hz, kHz, MHz, GHz)",
        "Multiple unit support for impedance (Ω, kΩ, MΩ)",
        "Step-by-step calculations with formulas",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding LC Filters">
        <p>
          LC filters are essential components in electronic circuits used to eliminate unwanted frequencies and pass desired signals. An LC filter consists of an inductor (L) and a capacitor (C) arranged in various configurations to provide frequency-selective filtering. LC filters are fundamental in applications ranging from audio processing and radio frequency (RF) circuits to power electronics and signal conditioning.
        </p>
        <p>
          Our <strong>LC Filter Calculator</strong> helps you design and analyze LC filters by calculating the resonant frequency, inductance, capacitance, and characteristic impedance. The calculator uses the fundamental relationship: <strong>f = 1/(2π√(LC))</strong>, where f is the resonant frequency, L is inductance, and C is capacitance. Whether you&apos;re designing filters for RF applications, audio circuits, or power supply filtering, this calculator provides accurate results with comprehensive unit support.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the LC Filter Calculator">
        <p>
          Our calculator is designed for ease of use and provides accurate results for LC filter calculations:
        </p>
        <ol>
          <li><strong>Select Calculation Type:</strong> Choose what you want to calculate:
            <ul>
              <li><strong>Resonant Frequency:</strong> Calculate frequency from inductance and capacitance</li>
              <li><strong>Inductance:</strong> Calculate inductance from frequency and capacitance</li>
              <li><strong>Capacitance:</strong> Calculate capacitance from frequency and inductance</li>
              <li><strong>Characteristic Impedance:</strong> Calculate Z₀ from inductance and capacitance</li>
            </ul>
          </li>
          <li><strong>Enter Values:</strong> Input the required parameters based on your calculation type</li>
          <li><strong>Select Units:</strong> Choose appropriate units for each parameter (e.g., mH, μF, kHz)</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed step-by-step calculations</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and provides clear step-by-step calculations showing how the result is derived from the fundamental LC filter formulas.
        </p>
      </SEOSection>

      <SEOSection title="LC Filter Formulas">
        <p>
          The fundamental relationships for LC filter circuits are expressed by the following formulas:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center space-y-2">
          <p className="font-mono text-lg font-bold">Resonant Frequency: f = 1/(2π√(LC))</p>
          <p className="font-mono text-lg font-bold">Characteristic Impedance: Z₀ = √(L/C)</p>
          <p className="font-mono text-lg font-bold">Inductance: L = 1/(4π²f²C)</p>
          <p className="font-mono text-lg font-bold">Capacitance: C = 1/(4π²f²L)</p>
          <p className="text-sm text-gray-600 mt-3">
            Where:
            <br />
            <strong>f</strong> = Resonant Frequency (Hz)
            <br />
            <strong>L</strong> = Inductance (Henry)
            <br />
            <strong>C</strong> = Capacitance (Farad)
            <br />
            <strong>Z₀</strong> = Characteristic Impedance (Ohm)
            <br />
            <strong>π</strong> = Pi (≈3.14159)
          </p>
        </div>

        <h3>Understanding the Formula Components</h3>
        <SEOList items={[
          "Resonant Frequency (f): The frequency at which the LC circuit oscillates naturally. At this frequency, the inductive and capacitive reactances are equal and opposite, resulting in maximum energy oscillation.",
          "Inductance (L): A property of electrical circuits that opposes changes in current. Measured in Henries (H), it represents the magnetic energy stored in the circuit. Larger inductance values lower the resonant frequency.",
          "Capacitance (C): A property of electrical circuits that stores electrical charge. Measured in Farads (F), it represents the electrostatic energy stored in the circuit. Larger capacitance values lower the resonant frequency.",
          "Characteristic Impedance (Z₀): The impedance of a transmission line formed by the LC circuit, important for impedance matching and power transfer in RF applications."
        ]} />

        <h3>Derived Formulas</h3>
        <p>
          From the main resonant frequency formula, we can solve for any variable:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <p className="font-mono"><strong>From frequency:</strong> L = 1/(4π²f²C) or C = 1/(4π²f²L)</p>
          <p className="font-mono"><strong>Reactance:</strong> XL = 2πfL (inductive) and XC = 1/(2πfC) (capacitive)</p>
          <p className="font-mono"><strong>Quality Factor:</strong> Q = (1/R)√(L/C) (depends on resistance)</p>
        </div>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Our calculator supports a wide range of units for each parameter, performing automatic conversions:
        </p>
        <SEOList items={[
          "Inductance: Henry (H), Millihenry (mH), Microhenry (μH), Nanohenry (nH)",
          "Capacitance: Farad (F), Millifarad (mF), Microfarad (μF), Nanofarad (nF), Picofarad (pF)",
          "Frequency: Hertz (Hz), Kilohertz (kHz), Megahertz (MHz), Gigahertz (GHz)",
          "Impedance: Ohm (Ω), Kilohm (kΩ), Megaohm (MΩ)"
        ]} />
        <p>
          The calculator automatically converts between these units, allowing you to work with the units most convenient for your application.
        </p>
      </SEOSection>

      <SEOSection title="Types of LC Filters">
        <p>
          LC filters can be configured in different topologies for specific filtering applications:
        </p>
        <SEOList items={[
          "Series LC (L-C): Inductor in series followed by capacitor to ground. Used as a bandpass filter where the series L-C acts as a frequency-selective element.",
          "Parallel LC (L-C): Inductor in parallel with capacitor. Creates a high impedance at resonance, used for rejecting specific frequencies.",
          "T-network Filter: Combination of series and parallel L and C components forming a T-shape. Provides improved filtering characteristics with better impedance matching.",
          "Pi-network Filter: Similar to T-network but with a different configuration, providing alternative filtering responses suitable for specific applications.",
          "Multiple-section Filters: Cascaded LC sections for steeper roll-off and better frequency selectivity in critical applications."
        ]} />
      </SEOSection>

      <SEOSection title="Applications of LC Filters">
        <p>
          LC filters are used extensively in modern electronic systems for frequency selection and signal conditioning:
        </p>
        <SEOList items={[
          "RF and Microwave Circuits: Tuning circuits, matching networks, and bandpass filters in radio frequency applications",
          "Audio Equipment: Crossover networks in speakers, audio equalization, and harmonic filtering",
          "Power Electronics: Input and output filters in switch-mode power supplies to reduce electromagnetic interference (EMI)",
          "Telecommunications: Channel filtering, frequency division multiplexing, and signal separation",
          "Radio Receivers: Resonant circuits for tuning to specific broadcast frequencies",
          "Signal Conditioning: Removing unwanted harmonics and noise from measurement signals",
          "Medical Devices: Filtering biomedical signals to improve signal quality and patient safety",
          "Industrial Control: Power quality improvement and harmonic filtering in industrial systems"
        ]} />
      </SEOSection>

      <SEOSection title="Common LC Filter Values">
        <p>
          Here are common component values used in typical LC filter designs:
        </p>
        <SEOList items={[
          "Audio Crossover Filters: Inductance 1-100 mH, Capacitance 1-100 μF, Frequency 50 Hz - 20 kHz",
          "RF Tuning Circuits: Inductance 1 μH - 1 mH, Capacitance 1 pF - 100 nF, Frequency 1 MHz - 10 GHz",
          "Power Supply Filters: Inductance 1-10 mH, Capacitance 10-1000 μF, Frequency 50/60 Hz - 100 kHz",
          "EMI Filters: Inductance 1-100 μH, Capacitance 10 nF - 1 μF, Frequency 1 MHz - 1 GHz",
          "Impedance Matching Networks: Z₀ = 50 Ω or 75 Ω (common in RF systems)"
        ]} />
      </SEOSection>

      <SEOSection title="Quality Factor and Bandwidth">
        <p>
          The quality factor (Q) and bandwidth are important characteristics of LC filters:
        </p>
        <SEOList items={[
          "Quality Factor (Q): Defined as Q = 2π(Energy Stored)/(Energy Dissipated per cycle). For an ideal LC circuit without resistance, Q is infinite. In practice, resistance from components and connections limits Q.",
          "Bandwidth (BW): The width of the frequency range that passes through the filter. BW = f₀/Q, where f₀ is the center frequency. Higher Q means narrower bandwidth and sharper frequency selectivity.",
          "Selectivity: The ability of a filter to reject unwanted frequencies while passing desired frequencies. Higher Q provides better selectivity but narrower bandwidth.",
          "Resonance Peak: At resonant frequency in a parallel LC circuit, impedance is maximum. In a series LC circuit, impedance is minimum. This peak is inversely proportional to resistance in the circuit."
        ]} />
      </SEOSection>

      <SEOSection title="Impedance Matching in LC Circuits">
        <p>
          Characteristic impedance is crucial for efficient power transfer and signal propagation:
        </p>
        <SEOList items={[
          "Transmission Line Impedance: Z₀ = √(L/C) determines how signals propagate through the circuit. Matching impedances between stages minimizes reflections and maximizes power transfer.",
          "Common Impedance Values: 50 Ω (RF and microwave), 75 Ω (video and cable), 300 Ω (antenna), 120 Ω (industrial control)",
          "Impedance Mismatch Effects: Mismatched impedances cause signal reflections, standing waves, and reduced efficiency. Critical in RF circuits where wavelengths are comparable to circuit dimensions.",
          "Impedance Matching Techniques: Series and parallel L-C networks can transform impedances, allowing connection of components with different characteristic impedances."
        ]} />
      </SEOSection>

      <SEOSection title="Damping and Q Factor Relationships">
        <p>
          The relationship between damping, resistance, and the quality factor affects filter performance:
        </p>
        <SEOList items={[
          "Underdamped: Q &gt; 0.707, produces overshooting and ringing. Used when sharp frequency selectivity is needed.",
          "Critically Damped: Q = 0.707, fastest settling without overshoot. Optimal for many control and measurement applications.",
          "Overdamped: Q &lt; 0.707, slowest settling but no overshoot. Used when stability is more important than speed.",
          "Effect of Resistance: Added resistance in series with L-C reduces Q and broadens the frequency response. Used to control bandwidth and stability."
        ]} />
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is an LC filter?",
            answer: "An LC filter is an electronic circuit consisting of an inductor (L) and capacitor (C) that selectively passes or rejects specific frequencies. At the resonant frequency, the inductive and capacitive reactances cancel each other out."
          },
          {
            question: "What is the resonant frequency formula?",
            answer: "The resonant frequency formula for an LC circuit is f = 1/(2π√(LC)), where f is the frequency in Hertz, L is inductance in Henries, and C is capacitance in Farads."
          },
          {
            question: "How do I choose L and C values for a specific frequency?",
            answer: "Use the calculator to determine component values for your target frequency. You can enter the frequency and either L or C, and calculate the missing component. Common practice uses standard component values nearest to your calculated values."
          },
          {
            question: "What is characteristic impedance?",
            answer: "Characteristic impedance (Z₀) is calculated as Z₀ = √(L/C) and represents the impedance of the transmission line formed by the LC circuit. It's crucial for impedance matching in RF applications (typically 50 Ω or 75 Ω)."
          },
          {
            question: "What units should I use?",
            answer: "Common combinations are: L in mH and C in μF for audio frequencies (Hz-kHz), L in μH and C in pF for RF frequencies (MHz-GHz). The calculator supports all standard units and converts automatically."
          },
          {
            question: "What is the difference between series and parallel LC?",
            answer: "Series LC has minimum impedance at resonance and is used as a bandpass filter. Parallel LC has maximum impedance at resonance and is used as a band-stop (notch) filter."
          },
          {
            question: "How do I design a filter for a specific bandwidth?",
            answer: "Bandwidth is determined by the quality factor Q. Use Q = f₀/BW, where f₀ is center frequency and BW is bandwidth. Added resistance in series with the L-C reduces Q and broadens the response."
          },
          {
            question: "What is the quality factor (Q)?",
            answer: "Quality factor Q measures how selective a filter is. Higher Q means narrower bandwidth and sharper frequency selectivity. Q = 2π(stored energy)/(dissipated energy per cycle). For ideal LC circuits without resistance, Q is theoretically infinite."
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
