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
      <SEOSection title="Why Inductive Reactance Matters in Real AC Systems">
        <p>
          The Inductive Reactance Calculator helps you predict how coils oppose alternating current, which directly affects current draw, heat, and voltage drop in AC systems. In motor drives, a few Hertz of frequency shift can change XL enough to alter torque and efficiency. In audio crossovers, miscalculating reactance shifts the cut‑off frequency and degrades sound. If you are comparing inductive behavior with the opposite effect in capacitors, use our {createInternalLink('capacitive-reactance-calculator')} to see how X<sub>C</sub> changes with frequency.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the inductance value (L) in H, mH, or μH.</li>
          <li><strong>Step 2:</strong> Enter the AC frequency (f) in Hz or kHz.</li>
          <li><strong>Step 3:</strong> Click Calculate to get inductive reactance XL in ohms.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Inductive Reactance Calculator Formula">
        <p>
          Inductive reactance is the AC opposition created by a changing magnetic field in a coil. It increases linearly with frequency and inductance, so high‑frequency signals see larger impedance than low‑frequency signals.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">X<sub>L</sub> = 2πfL</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A 25 mH inductor operates at 60 Hz in an AC filter.</p>
        <ul>
          <li>Input: L = 25 mH = 0.025 H, f = 60 Hz</li>
          <li>Result: XL = 2π × 60 × 0.025 = 9.42 Ω</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Inductive reactance calculations are used wherever AC current flows through coils.</p>
        <SEOList items={[
          "Power supplies and transformers for impedance planning",
          "Audio crossovers and RF filters for frequency shaping",
          "Motor windings and AC drives for current and power factor checks"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What does the Inductive Reactance Calculator compute?",
            answer: "It calculates inductive reactance XL from frequency and inductance using XL = 2πfL, returning the AC opposition in ohms."
          },
          {
            question: "Why does XL increase with frequency?",
            answer: "Higher frequency produces faster current changes, which increases the opposing magnetic field and raises reactance proportionally."
          },
          {
            question: "Is inductive reactance the same as resistance?",
            answer: "No. Resistance dissipates energy as heat, while inductive reactance stores and releases energy in a magnetic field."
          },
          {
            question: "What happens to XL at DC (0 Hz)?",
            answer: "At DC, XL is zero, so an ideal inductor behaves like a short circuit once current stabilizes."
          },
          {
            question: "How do I include voltage effects with reactance?",
            answer: "Use AC Ohm’s law (V = I × Z) and combine resistance with XL to compute total impedance."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering inductive reactance is easy with the right tools. This Inductive Reactance Calculator gives fast, accurate XL values so you can design stable, efficient AC circuits.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('voltage-calculator')} or the popular {createInternalLink('electrical-power-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
