import IndexOfRefractionCalculator from '../../../_components/calculators/IndexOfRefractionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Index of Refraction Calculator | Snell’s Law & Light Speed';
const description = 'Index of Refraction Calculator for optics: compute n from speed, apply Snell’s Law, and solve refraction angles with clear, fast results.';
const keywords = [
  'index of refraction calculator',
  'refractive index calculator',
  'snells law calculator',
  'refraction calculator',
  'light speed in medium',
  'optics calculator',
  'n equals c over v',
  'critical angle',
  'incident angle',
  'refracted angle',
  'optical density',
  'glass refraction',
  'water refraction',
  'prism refraction',
  'wavelength in medium',
  'bending of light'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/index-of-refraction-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/index-of-refraction-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function IndexOfRefractionCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Index of Refraction Calculator for Optics"
      description="Use the Index of Refraction Calculator to find n from light speed and solve refraction angles with Snell’s Law in seconds."
      calculator={<IndexOfRefractionCalculator />}
      slug="physics/index-of-refraction-calculator"
      category="Physics"
      features={[
        "Fast and accurate refractive index results",
        "Simple inputs for speeds and angles",
        "Mobile-friendly optical calculations",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Index of Refraction Matters in Real Optics">
        <p>
          The Index of Refraction Calculator helps engineers and students predict how light bends when it crosses materials like air, water, and glass. This matters in camera lenses, fiber‑optic links, and even safety goggles, where a small error in refraction angle can blur images or misdirect signals. By connecting light speed in a medium to its refractive index, you can quickly validate optical performance and reduce trial-and-error. For related speed checks, our {createInternalLink('velocity-calculator')} is useful when you want to compare light speed changes in different media.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Choose the calculation mode (index from speed, or refraction angles with Snell’s Law).</li>
          <li><strong>Step 2:</strong> Enter the known values such as light speed, incident angle, or refracted angle.</li>
          <li><strong>Step 3:</strong> Click Calculate to get the index of refraction or the missing angle.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Index of Refraction Calculator Formula">
        <p>
          The refractive index measures how much light slows in a material. It is defined by the ratio of the speed of light in vacuum to the speed in the medium. For refraction angles, Snell’s Law links the indices and angles across a boundary.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">n = c / v</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Light slows to 2.25 × 10<sup>8</sup> m/s in a glass sample.</p>
        <ul>
          <li>Input: c = 3.00 × 10<sup>8</sup> m/s, v = 2.25 × 10<sup>8</sup> m/s</li>
          <li>Result: n = 3.00/2.25 = 1.33</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Index of refraction calculations appear across optics and photonics.</p>
        <SEOList items={[
          "Lens design and focusing systems in cameras and microscopes",
          "Fiber‑optic communications and signal guidance",
          "Material identification in lab and quality control"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What does the Index of Refraction Calculator compute?",
            answer: "It calculates the refractive index from light speed or solves refraction angles using Snell’s Law."
          },
          {
            question: "Why is the refractive index greater than 1?",
            answer: "Light travels slower in materials than in vacuum, so n = c/v is greater than 1 for most media."
          },
          {
            question: "Can I use this for water and glass?",
            answer: "Yes. Enter the light speed in the material or use known indices (water ≈ 1.33, glass ≈ 1.5) to solve angles."
          },
          {
            question: "How does Snell’s Law relate to index of refraction?",
            answer: "Snell’s Law, n₁ sinθ₁ = n₂ sinθ₂, uses refractive indices to determine how light bends at a boundary."
          },
          {
            question: "Does wavelength change when light enters a medium?",
            answer: "Yes. Frequency stays constant, but wavelength shortens because speed decreases, which is tied to the refractive index."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering index of refraction is easy with the right tools. This Index of Refraction Calculator provides fast, reliable optics results for study and design.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('angle-between-vectors-calculator')} or the popular {createInternalLink('angular-frequency-calculator')}.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
