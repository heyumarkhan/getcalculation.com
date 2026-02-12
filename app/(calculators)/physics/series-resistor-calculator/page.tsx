import SeriesResistorCalculator from '../../../_components/calculators/SeriesResistorCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SeriesResistorCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Series Resistor Calculator: Series Circuit Calculator for Total Resistance"
      description="Use this series circuit calculator to add resistor values, find total resistance, and check voltage drops fast. Ideal for circuit design."
      calculator={<SeriesResistorCalculator />}
      slug="physics/series-resistor-calculator"
      category="Physics"
      features={[
        "Accurate total resistance calculations for series circuits",
        "Simple inputs for resistor values and units",
        "Clear, mobile-friendly layout for quick checks",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Series Resistance Matters in Real Circuits">
        <p>
          In real wiring, LED strings, and sensor chains, resistor values stack up and shift current and voltage levels. A reliable series
          circuit calculator helps you avoid dim LEDs, overheated parts, and unexpected voltage drops. If you are validating current flow or
          supply requirements, pairing results with {createInternalLink('ohms-law-resistance-calculator')} keeps your design checks consistent.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter each resistor value in the series chain.</li>
          <li><strong>Step 2:</strong> Select the unit for each resistor (Ω, kΩ, MΩ).</li>
          <li><strong>Step 3:</strong> Click Calculate to get total resistance.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: series circuit calculator Formula">
        <p>
          In a series circuit, resistances add directly because the same current flows through every component. This makes total resistance
          the sum of all individual resistors, a key rule for circuit analysis, voltage drop planning, and component selection.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">R_total = R1 + R2 + R3 + ... + Rn</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A series chain uses three resistors: 220 Ω, 330 Ω, and 470 Ω.</p>
        <ul>
          <li>Input: R1 = 220 Ω, R2 = 330 Ω, R3 = 470 Ω</li>
          <li>Result: R_total = 1020 Ω (1.02 kΩ)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Series resistance calculations show up in daily electronics work and testing.</p>
        <SEOList items={[
          "LED current limiting in indicator and lighting circuits",
          "Sensor chains and signal conditioning in control systems",
          "Prototype checks for breadboard and lab builds"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Does order of resistors matter in a series circuit?",
            answer: "No. The total resistance is the same regardless of the order because series values add directly."
          },
          {
            question: "Can I mix units like Ω and kΩ?",
            answer: "Yes. Convert units to the same scale before summing, or let the calculator handle unit conversion."
          },
          {
            question: "How do I estimate voltage drop across one resistor?",
            answer: "Use the series current and multiply by the resistor value. The {createInternalLink('ohms-law-resistance-calculator')} is helpful for that step."
          },
          {
            question: "What happens if I add more resistors in series?",
            answer: "Total resistance increases, which reduces current for a fixed supply voltage."
          },
          {
            question: "Is this different from parallel resistance?",
            answer: "Yes. Parallel circuits use reciprocal sums and always reduce total resistance compared to the smallest branch."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering series resistance is easy with the right tools, helping you size components, predict current, and prevent errors.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('parallel-resistor-calculator')} or the popular {createInternalLink('ohms-law-resistance-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
