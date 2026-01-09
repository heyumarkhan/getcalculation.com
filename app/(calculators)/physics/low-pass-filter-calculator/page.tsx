import { Metadata } from 'next';
import CalculatorPageTemplate from '@/app/_components/layouts/CalculatorPageTemplate';
import LowPassFilterCalculator from '@/app/_components/calculators/LowPassFilterCalculator';
import { SEOSection, SEOFAQ } from '@/app/_components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Low Pass Filter Calculator | Calculate Cutoff Frequency Online',
  description:
    'Free online Low Pass Filter Calculator. Calculate cutoff frequency, resistance, capacitance, and inductance for RC and RL low pass filters. Supports Hz, kHz, MHz, GHz frequencies.',
  keywords: [
    'low pass filter calculator',
    'cutoff frequency calculator',
    'RC filter calculator',
    'RL filter calculator',
    'low pass filter frequency',
    'filter cutoff frequency calculator',
    'RC low pass filter',
    'RL low pass filter',
    'filter design calculator',
    'electronics filter calculator',
    'resistance capacitance filter',
    'resistance inductance filter',
    'frequency response calculator',
    'signal processing calculator',
    'anti-aliasing filter calculator',
    'audio filter calculator',
    'power supply filter calculator',
    'corner frequency calculator',
    'break frequency calculator',
    'first order filter calculator',
    'passive filter calculator',
    'filter rolloff calculator',
    'attenuation calculator',
    'transfer function calculator',
  ],
  openGraph: {
    title: 'Low Pass Filter Calculator',
    description: 'Calculate low pass filter cutoff frequency, resistance, capacitance, and inductance for RC and RL filters.',
    type: 'website',
  },
};

export default function LowPassFilterPage() {
  return (
    <CalculatorPageTemplate
      title="Low Pass Filter Calculator: Calculate Cutoff Frequency f_c = 1/(2πRC) or f_c = R/(2πL)"
      description="Calculate low pass filter cutoff frequency, resistance, capacitance, or inductance for RC and RL filter topologies. Free online electronics calculator with support for multiple frequency and component units, RC and RL filter designs, and comprehensive filter analysis."
      calculator={<LowPassFilterCalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/low-pass-filter-calculator"
      category="Electronics"
      features={[
        'Calculate cutoff frequency for RC and RL filters',
        'Support for multiple frequency units (Hz, kHz, MHz, GHz)',
        'Support for resistance units (Ω, kΩ, MΩ)',
        'Support for capacitance units (F, μF, nF, pF)',
        'Support for inductance units (H, mH, μH)',
        'RC and RL filter topology selection',
        'Calculate resistance, capacitance, inductance, or frequency',
        'Step-by-step calculations with formulas',
        'Perfect for signal processing and audio design',
      ]}
    >
      <SEOSection title="Understanding Low Pass Filters">
        <p>
          A low pass filter (LPF) is an electronic circuit or algorithm that allows signals with frequencies lower 
          than a specific cutoff frequency (f_c) to pass through while attenuating signals with higher frequencies. 
          This fundamental component is used extensively in electronics, audio processing, telecommunications, and 
          digital signal processing.
        </p>
        <p>
          Low pass filters work by exploiting the frequency-dependent behavior of reactive components like capacitors 
          and inductors. At low frequencies, capacitors act as open circuits and inductors act as short circuits, 
          allowing signals to pass. At high frequencies, the opposite occurs, blocking unwanted high-frequency noise 
          and interference. The transition between passing and blocking occurs at the cutoff frequency.
        </p>
        <p>
          The most common passive low pass filter topologies are:
        </p>
        <ul>
          <li><strong>RC Filter:</strong> Uses a resistor and capacitor with formula f_c = 1/(2πRC)</li>
          <li><strong>RL Filter:</strong> Uses a resistor and inductor with formula f_c = R/(2πL)</li>
        </ul>
        <p>
          These simple yet effective circuits form the foundation of more complex filter designs and are essential 
          in signal conditioning, noise reduction, and frequency management applications.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Low Pass Filter Calculator">
        <p>This online calculator simplifies low pass filter calculations for both RC and RL configurations:</p>
        <ol>
          <li><strong>Select Filter Type:</strong> Choose between RC Filter (using resistor and capacitor) or RL Filter (using resistor and inductor) based on your circuit design.</li>
          <li><strong>Choose Calculation Type:</strong> Select what you want to calculate:
            <ul>
              <li>Cutoff Frequency (f_c): Given component values, find the filter's corner frequency</li>
              <li>Resistance (R): Given frequency and capacitance/inductance, find required resistance</li>
              <li>Capacitance (C): For RC filters, find required capacitance given frequency and resistance</li>
              <li>Inductance (L): For RL filters, find required inductance given frequency and resistance</li>
            </ul>
          </li>
          <li><strong>Enter Values:</strong> Input your known component values using the appropriate units. The calculator automatically converts to base units (ohms, farads, henries) for calculation.</li>
          <li><strong>Select Units:</strong> Choose from multiple unit options for frequency (Hz to GHz), resistance (Ω to MΩ), capacitance (F to pF), and inductance (H to μH).</li>
          <li><strong>Calculate:</strong> Click the Calculate button to get instant results with step-by-step formula breakdown and intermediate calculations.</li>
        </ol>
        <p>
          The calculator displays results in standard engineering units with full precision, making it perfect for 
          circuit design, prototyping, and educational purposes.
        </p>
      </SEOSection>

      <SEOSection title="Low Pass Filter Formulas">
        <p><strong>RC Low Pass Filter</strong></p>
        <p>The fundamental formula for an RC low pass filter's cutoff frequency is:</p>
        <ul>
          <li><strong>f_c = 1 / (2πRC)</strong> - Cutoff frequency in Hz</li>
          <li><strong>R = 1 / (2πf_c × C)</strong> - Resistance in ohms</li>
          <li><strong>C = 1 / (2πf_c × R)</strong> - Capacitance in farads</li>
        </ul>
        <p>
          At the cutoff frequency, the output voltage is 70.7% of the input voltage (or -3dB), and the phase 
          shift is 45 degrees.
        </p>
        <p><strong>RL Low Pass Filter</strong></p>
        <p>The formulas for an RL low pass filter are:</p>
        <ul>
          <li><strong>f_c = R / (2πL)</strong> - Cutoff frequency in Hz</li>
          <li><strong>R = 2πf_c × L</strong> - Resistance in ohms</li>
          <li><strong>L = R / (2πf_c)</strong> - Inductance in henries</li>
        </ul>
        <p><strong>Key Concepts</strong></p>
        <ul>
          <li><strong>π (pi):</strong> Approximately 3.14159, fundamental to circular frequency calculations</li>
          <li><strong>Angular Frequency (ω):</strong> ω = 2πf, measured in radians per second</li>
          <li><strong>-3dB Point:</strong> The frequency where power output is half the input power</li>
          <li><strong>Roll-off Rate:</strong> First-order filters roll off at 20 dB per decade (6 dB per octave)</li>
          <li><strong>Impedance Matching:</strong> Filter design often considers source and load impedances</li>
        </ul>
        <p>
          Understanding these formulas helps in designing filters for specific applications, from audio equalization 
          to power supply noise reduction.
        </p>
      </SEOSection>

      <SEOSection title="Resistance, Capacitance, and Inductance Units">
        <p>Modern electronics spans multiple orders of magnitude, requiring flexible unit systems for practical design work:</p>
        <p><strong>Frequency Units</strong></p>
        <ul>
          <li><strong>Hz (Hertz):</strong> Base unit, cycles per second. Used for audio and lower frequencies.</li>
          <li><strong>kHz (Kilohertz):</strong> 1,000 Hz. Common in audio ranges and AM radio.</li>
          <li><strong>MHz (Megahertz):</strong> 1,000,000 Hz. Used in FM radio, TV, and microwave applications.</li>
          <li><strong>GHz (Gigahertz):</strong> 1,000,000,000 Hz. Used in microwave engineering and high-speed digital circuits.</li>
        </ul>
        <p><strong>Resistance Units</strong></p>
        <ul>
          <li><strong>Ω (Ohm):</strong> Base unit of electrical resistance.</li>
          <li><strong>kΩ (Kilohm):</strong> 1,000 Ω. Most common in general electronics.</li>
          <li><strong>MΩ (Megohm):</strong> 1,000,000 Ω. Used in high-impedance circuits.</li>
        </ul>
        <p><strong>Capacitance Units</strong></p>
        <ul>
          <li><strong>F (Farad):</strong> Base unit, extremely large in practice.</li>
          <li><strong>μF (Microfarad):</strong> 0.000001 F. Common in power supplies and coupling circuits.</li>
          <li><strong>nF (Nanofarad):</strong> 0.000000001 F. Used in high-frequency filters.</li>
          <li><strong>pF (Picofarad):</strong> 0.000000000001 F. Used in RF circuits and oscillators.</li>
        </ul>
        <p><strong>Inductance Units</strong></p>
        <ul>
          <li><strong>H (Henry):</strong> Base unit, large value in most applications.</li>
          <li><strong>mH (Millihenry):</strong> 0.001 H. Common in power circuits.</li>
          <li><strong>μH (Microhenry):</strong> 0.000001 H. Used in high-frequency circuits.</li>
        </ul>
        <p>
          Proper unit selection ensures calculations remain manageable while maintaining precision across different 
          application domains.
        </p>
      </SEOSection>

      <SEOSection title="Low Pass Filters and AC Circuit Analysis">
        <p>
          While Ohm's Law (V = I × R) applies directly only to resistive elements, understanding frequency response 
          requires knowledge of reactive component behavior:
        </p>
        <p><strong>Capacitive Impedance</strong></p>
        <p>
          In AC circuits, capacitors present impedance that decreases with frequency:
        </p>
        <ul>
          <li><strong>Xc = 1 / (2πfC)</strong> - Capacitive reactance</li>
          <li>At low frequencies: Xc is very large (capacitor blocks DC and low frequencies)</li>
          <li>At high frequencies: Xc approaches zero (capacitor conducts high frequencies)</li>
        </ul>
        <p>
          This frequency-dependent behavior is why capacitors are effective in low pass filters—they naturally 
          attenuate high frequencies.
        </p>
        <p><strong>Inductive Impedance</strong></p>
        <p>Similarly, inductors present impedance that increases with frequency:</p>
        <ul>
          <li><strong>XL = 2πfL</strong> - Inductive reactance</li>
          <li>At low frequencies: XL is very small (inductor conducts DC and low frequencies)</li>
          <li>At high frequencies: XL is very large (inductor blocks high frequencies)</li>
        </ul>
        <p>
          This makes inductors ideal for series low pass filter elements. The complete AC impedance of RC and RL 
          combinations involves both resistance and reactance, creating the frequency-dependent behavior essential 
          to filter operation.
        </p>
      </SEOSection>

      <SEOSection title="RC vs RL Low Pass Filters: Comparison and Selection">
        <p><strong>RC Low Pass Filters</strong></p>
        <p><strong>Advantages:</strong></p>
        <ul>
          <li>Simple construction using just one resistor and one capacitor</li>
          <li>Capacitors are inexpensive and compact</li>
          <li>Excellent performance at moderate frequencies (audio range)</li>
          <li>Lower power dissipation in the resistor</li>
        </ul>
        <p><strong>Disadvantages:</strong></p>
        <ul>
          <li>Output impedance depends on load</li>
          <li>More sensitive to component tolerances and temperature changes</li>
          <li>Capacitors can drift or fail</li>
        </ul>
        <p><strong>Applications:</strong> Audio equalization, speaker crossovers, anti-aliasing filters, power supply output filtering, microphone preamplifiers</p>
        <p><strong>RL Low Pass Filters</strong></p>
        <p><strong>Advantages:</strong></p>
        <ul>
          <li>Inductors naturally limit high-frequency current</li>
          <li>Excellent shielding properties (inductors isolated from each other)</li>
          <li>Better performance at very high frequencies</li>
        </ul>
        <p><strong>Disadvantages:</strong></p>
        <ul>
          <li>Inductors are more expensive and larger than capacitors</li>
          <li>Higher power dissipation due to resistance</li>
          <li>Parasitic capacitance can affect performance at high frequencies</li>
          <li>Inductor quality factor varies significantly</li>
        </ul>
        <p><strong>Applications:</strong> Power supply filtering, RF circuits (megahertz to gigahertz range), EMI/RFI suppression, high-power applications</p>
        <p><strong>Selection Criteria:</strong> Choose RC filters for audio frequencies and general signal processing. Choose RL filters for high-frequency applications, power supplies, and where space constraints are less critical. Multi-stage designs often combine both topologies for optimal performance.</p>
      </SEOSection>

      <SEOSection title="Practical Applications of Low Pass Filters">
        <p><strong>Audio Processing</strong></p>
        <p>Low pass filters shape audio character in:</p>
        <ul>
          <li>Speaker crossovers separating bass, midrange, and treble</li>
          <li>Subwoofer design limiting upper frequencies</li>
          <li>Analog synths and electronic musical instruments</li>
          <li>Microphone preamplifiers removing RF interference</li>
          <li>Car audio systems managing frequency response</li>
        </ul>
        <p><strong>Power Electronics</strong></p>
        <p>In power supplies and converters:</p>
        <ul>
          <li>Switching noise reduction (10 kHz to 1 MHz range)</li>
          <li>Voltage regulation smoothing</li>
          <li>Harmonic suppression in AC/DC converters</li>
          <li>Power factor correction circuits</li>
        </ul>
        <p><strong>Digital Systems</strong></p>
        <p>In data acquisition and signal processing:</p>
        <ul>
          <li>Anti-aliasing filters before analog-to-digital conversion</li>
          <li>Sampling theorem compliance (Nyquist frequency considerations)</li>
          <li>Digital filter implementation after upsampling</li>
          <li>Clock signal conditioning and jitter reduction</li>
        </ul>
        <p><strong>Telecommunications</strong></p>
        <p>In signal transmission and reception:</p>
        <ul>
          <li>Baseband filtering in modems</li>
          <li>Channel bandwidth limiting</li>
          <li>Interference rejection</li>
          <li>Signal-to-noise ratio optimization</li>
        </ul>
        <p>
          Real-world filter design balances cutoff frequency, roll-off rate, component cost, and performance 
          specifications for the target application.
        </p>
      </SEOSection>

      <SEOSection title="Factors Affecting Low Pass Filter Performance">
        <p><strong>Component Tolerances</strong></p>
        <p>Real-world resistors, capacitors, and inductors have manufacturing tolerances:</p>
        <ul>
          <li><strong>Resistors:</strong> ±1% to ±10% standard tolerance</li>
          <li><strong>Capacitors:</strong> ±5% to ±20% depending on type</li>
          <li><strong>Inductors:</strong> ±10% or worse, with frequency variation</li>
        </ul>
        <p>Tight tolerances increase cost but improve performance consistency.</p>
        <p><strong>Temperature Stability</strong></p>
        <p>Component values change with temperature:</p>
        <ul>
          <li><strong>Temperature Coefficient:</strong> Specified in ppm/°C (parts per million per degree Celsius)</li>
          <li>Capacitors drift significantly with temperature</li>
          <li>Inductors with ferrite cores show nonlinear temperature effects</li>
          <li>Quality components maintain stability over wide ranges</li>
        </ul>
        <p><strong>Frequency Limitations</strong></p>
        <p>Real components have physical limitations:</p>
        <ul>
          <li><strong>Parasitic Capacitance:</strong> Inductors exhibit capacitance at high frequencies</li>
          <li><strong>Parasitic Inductance:</strong> Capacitor leads add inductance at high frequencies</li>
          <li><strong>Component Self-Resonance:</strong> Each component has a resonant frequency</li>
          <li><strong>Skin Effect:</strong> Resistance increases at high frequencies in conductors</li>
        </ul>
        <p>
          Professional filter designs account for these factors through component selection, circuit buffering, and 
          simulation validation before implementation.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is a low pass filter and why is it important?',
            answer:
              'A low pass filter (LPF) is an electronic circuit that allows low-frequency signals to pass while attenuating high-frequency signals. It\'s essential for noise reduction, anti-aliasing, audio processing, and signal conditioning. Low pass filters prevent aliasing in digital systems, reduce switching noise in power supplies, and shape the frequency response of audio systems.',
          },
          {
            question: 'What is cutoff frequency (-3dB point) in a low pass filter?',
            answer:
              'The cutoff frequency (f_c) is the frequency at which the filter\'s output power is half the input power, or -3dB. At this frequency, the output voltage is 70.7% of the input voltage, and the phase shift is 45 degrees. Above the cutoff frequency, signals are increasingly attenuated. For RC filters: f_c = 1/(2πRC); for RL filters: f_c = R/(2πL).',
          },
          {
            question: 'What is the difference between RC and RL low pass filters?',
            answer:
              'RC filters use a resistor and capacitor, ideal for audio frequencies and moderate-frequency applications. They\'re simpler and less expensive. RL filters use a resistor and inductor, better for high-frequency applications and power supplies. RL filters have higher power dissipation but superior high-frequency performance. Choice depends on frequency range and application requirements.',
          },
          {
            question: 'How do I choose the correct cutoff frequency for my application?',
            answer:
              'Choose cutoff frequency based on your signal bandwidth and noise characteristics. For audio: 20 Hz to 20 kHz for human hearing. For anti-aliasing: at least 2x your sampling rate (Nyquist frequency). For noise filtering: place the cutoff above desired signal frequencies but below noise frequencies. General rule: cutoff frequency should be 10-100x higher than your lowest signal frequency.',
          },
          {
            question: 'What happens at frequencies above the cutoff frequency?',
            answer:
              'Above the cutoff frequency, first-order low pass filters attenuate signals at 20 dB per decade (or 6 dB per octave). This means power reduces by half for every doubling of frequency above f_c. The attenuation increases continuously with frequency, not sharply. This gradual roll-off is characteristic of passive first-order filters.',
          },
          {
            question: 'Can I cascade multiple low pass filters for steeper roll-off?',
            answer:
              'Yes! Cascading filters increases the roll-off rate. Two first-order filters give 40 dB per decade (12 dB per octave), three give 60 dB per decade, and so on. However, cascading shifts the cutoff frequency due to interaction effects. Use buffering amplifiers between stages to prevent loading. Alternatively, design higher-order active filters using operational amplifiers for better performance.',
          },
          {
            question: 'What are typical applications of low pass filters in consumer electronics?',
            answer:
              'Consumer electronics heavily use low pass filters: audio systems (speaker crossovers, subwoofer filtering), digital devices (anti-aliasing before ADC conversion), microphones (RF rejection), power supplies (switching noise reduction), and video equipment (chroma filtering). They\'re also in mobile phones, headphones, and wireless devices for EMI suppression and signal conditioning.',
          },
          {
            question: 'How do tolerances affect low pass filter performance?',
            answer:
              'Component tolerances directly shift the cutoff frequency. A 10% resistor and 10% capacitor combination could shift f_c by up to ±19%. For critical applications, use 1% or 5% tolerance components, or adjust component values post-assembly. Some designs include variable resistors (trimmers) to fine-tune frequency. Temperature stability is also important—use temperature-compensated components for stable performance.',
          },
        ]}
      />
    </CalculatorPageTemplate>
  );
}

