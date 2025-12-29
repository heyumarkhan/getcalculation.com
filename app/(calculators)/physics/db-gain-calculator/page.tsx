import DBGainCalculator from '../../../_components/calculators/DBGainCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function DBGainCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="dB Gain Calculator: Calculate Decibel Gain from Power or Voltage"
      description="Calculate decibel (dB) gain from power or voltage ratios using dB = 10×log₁₀(P₂/P₁) for power and dB = 20×log₁₀(V₂/V₁) for voltage. Free online physics calculator for electronics, audio engineering, and signal processing."
      calculator={<DBGainCalculator primaryColor="#820ECC" />}
      slug="physics/db-gain-calculator"
      category="Electronics"
      features={[
        "Calculate dB gain from power ratio",
        "Calculate dB gain from voltage ratio",
        "Calculate power ratio from dB gain",
        "Calculate voltage ratio from dB gain",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding dB Gain">
        <p>
          Decibel (dB) is a logarithmic unit used to express ratios, particularly in electronics, audio engineering, and signal processing. The decibel scale is invaluable because it can represent very large or very small ratios in a compact, manageable form. Understanding dB gain is essential for analyzing amplifier performance, signal strength, power levels, and audio systems.
        </p>
        <p>
          Our <strong>dB Gain Calculator</strong> makes it easy to calculate decibel gain from power or voltage ratios using the fundamental formulas: <strong>dB = 10×log₁₀(P₂/P₁)</strong> for power and <strong>dB = 20×log₁₀(V₂/V₁)</strong> for voltage. Whether you&apos;re designing amplifiers, analyzing signal chains, or working with audio equipment, this calculator provides accurate results with clear step-by-step calculations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the dB Gain Calculator">
        <p>
          Our calculator is designed for ease of use and provides accurate results for dB gain calculations:
        </p>
        <ol>
          <li><strong>Select Calculation Type:</strong> Choose what you want to calculate:
            <ul>
              <li><strong>dB from Power Ratio:</strong> Calculate dB gain from input and output power (dB = 10×log₁₀(P₂/P₁))</li>
              <li><strong>dB from Voltage Ratio:</strong> Calculate dB gain from input and output voltage (dB = 20×log₁₀(V₂/V₁))</li>
              <li><strong>Power Ratio from dB:</strong> Calculate power ratio from dB gain (P₂/P₁ = 10^(dB/10))</li>
              <li><strong>Voltage Ratio from dB:</strong> Calculate voltage ratio from dB gain (V₂/V₁ = 10^(dB/20))</li>
            </ul>
          </li>
          <li><strong>Enter Values:</strong> Input the required parameters based on your calculation type</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed step-by-step calculations</li>
        </ol>
        <p>
          The calculator automatically handles logarithmic calculations and provides clear explanations of each step.
        </p>
      </SEOSection>

      <SEOSection title="The dB Gain Formulas">
        <p>
          Decibel gain is calculated differently for power and voltage/amplitude:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center space-y-4">
          <div>
            <p className="font-mono text-lg font-bold">For Power: dB = 10 × log₁₀(P₂/P₁)</p>
            <p className="text-sm text-gray-600 mt-2">
              Where:
              <br />
              <strong>dB</strong> = Decibel gain
              <br />
              <strong>P₂</strong> = Output power
              <br />
              <strong>P₁</strong> = Input power
            </p>
          </div>
          <div>
            <p className="font-mono text-lg font-bold">For Voltage/Amplitude: dB = 20 × log₁₀(V₂/V₁)</p>
            <p className="text-sm text-gray-600 mt-2">
              Where:
              <br />
              <strong>dB</strong> = Decibel gain
              <br />
              <strong>V₂</strong> = Output voltage
              <br />
              <strong>V₁</strong> = Input voltage
            </p>
          </div>
        </div>

        <h3>Why Different Formulas?</h3>
        <p>
          The difference between the power formula (10×) and voltage formula (20×) comes from the relationship between power and voltage. Since power is proportional to voltage squared (P ∝ V²), we need to account for this when converting between power and voltage ratios:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P = V²/R (for constant resistance)</p>
          <p className="font-mono mt-2">If V doubles, P quadruples (2² = 4)</p>
          <p className="font-mono mt-2">Therefore: dB_voltage = 2 × dB_power</p>
          <p className="font-mono mt-2">20 × log(V₂/V₁) = 2 × [10 × log(V₂/V₁)²] = 2 × [10 × log(P₂/P₁)]</p>
        </div>
      </SEOSection>

      <SEOSection title="Common dB Gain Values">
        <p>
          Here are some common dB gain values and their corresponding ratios:
        </p>
        <SEOList items={[
          "0 dB: No gain or loss (ratio = 1:1). Output equals input.",
          "3 dB: Approximately 2× power gain (1.995×), 1.414× voltage gain. This is a common reference point.",
          "6 dB: 4× power gain, 2× voltage gain. Each 6 dB represents a doubling of power.",
          "10 dB: 10× power gain, 3.162× voltage gain. A convenient round number.",
          "20 dB: 100× power gain, 10× voltage gain. A significant amplification.",
          "40 dB: 10,000× power gain, 100× voltage gain. Very high gain.",
          "-3 dB: Half power (0.5×), 0.707× voltage. This is the -3 dB point or half-power point.",
          "-6 dB: Quarter power (0.25×), half voltage (0.5×)."
        ]} />
      </SEOSection>

      <SEOSection title="Applications of dB Gain">
        <p>
          dB gain calculations are fundamental in numerous fields and applications:
        </p>
        <SEOList items={[
          "Audio Engineering: Measuring amplifier gain, signal chain analysis, and audio system design",
          "Electronics: Analyzing amplifier performance, filter characteristics, and circuit gain",
          "Telecommunications: Signal strength measurement, link budget calculations, and system design",
          "RF Engineering: Antenna gain, transmitter power, and receiver sensitivity",
          "Signal Processing: Filter design, equalization, and dynamic range analysis",
          "Acoustics: Sound system design, speaker efficiency, and room acoustics",
          "Instrumentation: Sensor calibration, measurement system design, and data acquisition",
          "Broadcasting: Transmitter power, signal coverage, and broadcast system design"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Positive and Negative dB">
        <p>
          dB values can be positive (gain) or negative (loss):
        </p>
        <SEOList items={[
          "Positive dB: Indicates gain or amplification. The output is greater than the input. For example, +20 dB means the output is 100 times the input power.",
          "Negative dB: Indicates loss or attenuation. The output is less than the input. For example, -20 dB means the output is 1/100th of the input power.",
          "Zero dB: No change. The output equals the input (ratio = 1:1).",
          "dBm and dBW: These are absolute power measurements referenced to 1 milliwatt (dBm) or 1 watt (dBW), not ratios."
        ]} />
      </SEOSection>

      <SEOSection title="Power vs Voltage: When to Use Which Formula">
        <p>
          Understanding when to use the power formula (10×) versus the voltage formula (20×) is crucial:
        </p>
        <SEOList items={[
          "Use 10×log₁₀(P₂/P₁) when: Working with power measurements (watts, milliwatts), analyzing power amplifiers, calculating power gain, or dealing with energy-related quantities.",
          "Use 20×log₁₀(V₂/V₁) when: Working with voltage or amplitude measurements, analyzing voltage amplifiers, calculating voltage gain, or dealing with field quantities (voltage, current, pressure).",
          "General Rule: Power-related quantities use 10×, while field quantities (voltage, current, pressure, displacement) use 20×.",
          "Consistency: Always use the same formula type throughout a calculation. Don't mix power and voltage formulas."
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Why do we use 10× for power and 20× for voltage?",
            answer: "Because power is proportional to voltage squared (P ∝ V²), a doubling of voltage results in a quadrupling of power. The 20× factor accounts for this squared relationship, ensuring that the same voltage ratio and power ratio give consistent dB values when converted."
          },
          {
            question: "What does 0 dB mean?",
            answer: "0 dB means no gain or loss - the output equals the input (ratio = 1:1). It's a reference point where the signal passes through unchanged."
          },
          {
            question: "What is the difference between dB and dBm?",
            answer: "dB is a relative unit expressing a ratio (gain or loss). dBm is an absolute unit expressing power relative to 1 milliwatt. For example, 0 dBm = 1 mW, 10 dBm = 10 mW, 20 dBm = 100 mW."
          },
          {
            question: "How do I calculate power ratio from dB?",
            answer: "Use the formula P₂/P₁ = 10^(dB/10). For example, 20 dB gain means P₂/P₁ = 10^(20/10) = 10² = 100, so the output power is 100 times the input power."
          },
          {
            question: "How do I calculate voltage ratio from dB?",
            answer: "Use the formula V₂/V₁ = 10^(dB/20). For example, 20 dB gain means V₂/V₁ = 10^(20/20) = 10¹ = 10, so the output voltage is 10 times the input voltage."
          },
          {
            question: "What is the -3 dB point?",
            answer: "The -3 dB point (also called the half-power point) is where the power is reduced to half (0.5×) and voltage is reduced to 0.707×. It's commonly used to define bandwidth, cutoff frequencies, and filter characteristics."
          },
          {
            question: "Can dB be negative?",
            answer: "Yes! Negative dB values indicate loss or attenuation. For example, -6 dB means the output is 1/4th the input power or 1/2 the input voltage. Negative dB is common in filters, cables, and attenuators."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The dB Gain Calculator provides a powerful tool for engineers, technicians, and anyone working with signal processing and electronics. By using the logarithmic decibel scale, you can easily work with very large or very small ratios in a manageable form.
        </p>
        <p>
          Whether you&apos;re designing amplifiers, analyzing signal chains, working with audio systems, or studying electronics, this calculator simplifies complex dB gain calculations. Explore our other {createInternalLink('watt-calculator', 'Physics Calculators')} like the {createInternalLink('electrical-power-calculator', 'Electrical Power Calculator')} and {createInternalLink('frequency-calculator', 'Frequency Calculator')} for related electronics and signal processing calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

