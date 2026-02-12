import CapacitiveReactanceCalculator from '../../../_components/calculators/CapacitiveReactanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function CapacitiveReactanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Capacitive Reactance Calculator for AC Circuits: Instantly compute Xc, frequency, and capacitance with the 1/(2πfC) formula for accurate filter design work"
      description="Use the Capacitive Reactance Calculator to find Xc, frequency, or capacitance from f and C, with instant results for AC circuit design and filter tuning."
      calculator={<CapacitiveReactanceCalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/capacitive-reactance-calculator"
      category="Physics"
      features={[
        "Accurate capacitive reactance results for AC circuit analysis",
        "Easy inputs for frequency, capacitance, and target reactance",
        "Clear, mobile-friendly layout for lab and field use",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Capacitive Reactance Matters in AC Circuits">
        <p>
          Capacitive reactance describes how a capacitor resists AC current depending on frequency, which is essential for filter design, signal coupling, and impedance control. Designers rely on Xc to shape frequency response, reduce noise, and protect sensitive stages in analog circuits. When combining reactance with resistive effects, understanding {createInternalLink('ohms-law-calculator')} helps verify expected current flow and voltage drops in real components.
        </p>
      </SEOSection>

        <SEOSection title="How to Use This Calculator">
          <p>Follow these steps to get instant results:</p>
          <ol>
            <li><strong>Step 1:</strong> Enter the operating frequency and capacitance value.</li>
            <li><strong>Step 2:</strong> Choose the correct units (Hz, kHz, μF, nF, pF).</li>
            <li><strong>Step 3:</strong> Click Calculate to get capacitive reactance in ohms.</li>
          </ol>
        </SEOSection>

        <SEOSection title="The Core Concept: Capacitive Reactance Calculator Formula">
          <p>
            Capacitive reactance is the frequency-dependent opposition a capacitor presents to AC current. It decreases as frequency increases and is inversely proportional to capacitance, which makes it central to AC analysis, cutoff frequency planning, and filter tuning in electronics.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
            <p className="font-mono text-lg font-bold">Xc = 1 / (2πfC)</p>
          </div>
          <h4 className="font-semibold mt-4">Worked Example:</h4>
          <p>
            A 1.0 μF capacitor is used in a 1 kHz audio path. Find the capacitive reactance.
          </p>
          <ul>
            <li>Input: f = 1,000 Hz, C = 1.0 μF = 1.0 × 10⁻⁶ F</li>
            <li>Result: Xc = 1 / (2π × 1,000 × 1.0 × 10⁻⁶) ≈ 159 Ω</li>
          </ul>
        </SEOSection>

        <SEOSection title="Practical Applications">
          <p>
            Capacitive reactance calculations are used across analog and RF design:
          </p>
          <SEOList items={[
            "AC coupling and decoupling to block DC while passing signals",
            "Filter design to set cutoff frequencies and control bandwidth",
            "Impedance planning with {createInternalLink('frequency-calculator')} for frequency-dependent behavior"
          ]} />
        </SEOSection>

        <SEOSection title="Frequently Asked Questions (FAQ)">
          <SEOFAQ questions={[
            {
              question: "What is capacitive reactance?",
              answer: "Capacitive reactance is the opposition a capacitor offers to AC current, measured in ohms. It depends on frequency and capacitance."
            },
            {
              question: "Why does Xc decrease at higher frequency?",
              answer: "Because Xc is inversely proportional to frequency. Higher frequency means the capacitor charges and discharges faster, reducing opposition."
            },
            {
              question: "Is capacitive reactance the same as resistance?",
              answer: "No. Resistance is constant for a given material, while reactance varies with frequency and applies only to AC."
            },
            {
              question: "How do I reduce capacitive reactance?",
              answer: "Increase the frequency or use a larger capacitance value to reduce Xc."
            },
            {
              question: "What units should I use for C and f?",
              answer: "Use Farads for capacitance and Hertz for frequency, or enter metric prefixes like μF and kHz as supported by the calculator."
            }
          ]} />
        </SEOSection>

        <SEOSection title="Conclusion">
          <p>
            Mastering capacitive reactance is easy with the right tools, helping you tune filters, shape AC signals, and validate circuit behavior.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('electrical-power-calculator')} or the popular {createInternalLink('voltage-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

