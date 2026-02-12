import LCFilterCalculator from '../../../_components/calculators/LCFilterCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function LCFilterCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="LC Filter Calculator: Resonant Frequency and Impedance Design Tool"
      description="Use the LC Filter Calculator to find resonant frequency from inductance and capacitance for clean signal filtering. Fast results for circuit design."
      calculator={<LCFilterCalculator primaryColor="#820ECC" />}
      slug="physics/lc-filter-calculator"
      category="Physics"
      features={[
        "Accurate LC resonant frequency calculations for circuit design",
        "Simple inputs for inductance, capacitance, and target frequency",
        "Clear, mobile-friendly layout for bench or field work",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why LC Filters Matter in Real Circuits">
        <p>
          LC filters shape signals by passing desired frequencies while rejecting noise, harmonics, or interference. They are essential in RF front-ends, audio crossovers, and power supply smoothing because resonance enables selective filtering with low loss. Designers use LC values to tune circuits precisely and avoid instability, distortion, or EMI issues. If you also need to analyze reactive behavior, the {createInternalLink('capacitive-reactance-calculator')} helps validate capacitor effects at the same operating frequency.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter inductance (L) and capacitance (C) or set a target resonant frequency.</li>
          <li><strong>Step 2:</strong> Choose units for H, F, and Hz to match your component values.</li>
          <li><strong>Step 3:</strong> Click Calculate to get resonant frequency and key LC values instantly.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: LC Filter Calculator Formula">
        <p>
          An LC filter resonates when the inductive and capacitive reactances cancel, producing a peak or notch at a specific frequency. The resonant frequency depends on the square root of the product of inductance and capacitance, which makes this formula central to RF tuning, signal conditioning, and impedance matching in analog circuits.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">f₀ = 1 / (2π√(LC))</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>
          A designer selects L = 10 μH and C = 100 pF for a tuned stage. Find the resonant frequency.
        </p>
        <ul>
          <li>Input: L = 10 μH = 1.0 × 10⁻⁵ H, C = 100 pF = 1.0 × 10⁻¹⁰ F</li>
          <li>Result: f₀ = 1 / (2π√(1.0 × 10⁻⁵ × 1.0 × 10⁻¹⁰)) ≈ 5.03 MHz</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>
          LC filters are widely used in electronics and signal processing:
        </p>
        <SEOList items={[
          "RF tuning in radios, receivers, and transmitters to select narrow frequency bands",
          "Audio crossovers that split low and high frequencies between speaker drivers",
          "Power supply filtering to reduce ripple and suppress switching noise"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What does an LC filter do?",
            answer: "An LC filter passes or rejects specific frequencies by using resonance between an inductor and capacitor. It can act as low-pass, high-pass, band-pass, or band-stop depending on configuration."
          },
          {
            question: "How does changing L or C affect resonance?",
            answer: "Increasing either L or C lowers the resonant frequency because f₀ is inversely proportional to the square root of LC. Decreasing either value raises the resonant frequency."
          },
          {
            question: "Are LC filters better than RC filters?",
            answer: "LC filters often provide sharper filtering with lower loss at higher frequencies, while RC filters are simpler and cheaper for low-frequency or low-current applications."
          },
          {
            question: "What is the quality factor (Q) in an LC circuit?",
            answer: "Q measures how selective the resonance is. Higher Q means a narrower bandwidth and sharper filtering, but it is limited by component resistance and losses."
          },
          {
            question: "Which units should I use for accuracy?",
            answer: "Use Henrys for inductance, Farads for capacitance, and Hertz for frequency. The calculator handles metric prefixes like μH and pF."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering LC filter design is easy with the right tools, giving you clean signal paths and predictable resonance in real hardware.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('ohms-law-resistance-calculator')} or the popular {createInternalLink('electrical-power-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
