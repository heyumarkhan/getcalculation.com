import RydbergEquationCalculator from '../../../_components/calculators/RydbergEquationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function RydbergEquationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Rydberg Equation Calculator — Wavelength, Frequency & Photon Energy"
      description="Use the Rydberg Equation Calculator to compute wavelength, frequency, or photon energy for hydrogen-like transitions. Supports custom Rydberg constant and units; ideal for physics, spectroscopy, and education."
      calculator={<RydbergEquationCalculator />}
      slug="physics/rydberg-equation-calculator"
      category="Quantum Mechanics"
      features={[
        "Compute wavelength (nm or m) from quantum levels",
        "Compute photon frequency (Hz) and energy (eV)",
        "Custom Rydberg constant for hydrogen-like ions",
        "Clear, mobile-friendly UI with instant results"
      ]}
    >
      <SEOSection title="Rydberg Equation — Overview">
        <p>The Rydberg equation describes the wavelengths of spectral lines of many chemical elements, especially hydrogen. It relates the reciprocal wavelength to the difference of the inverse squares of two integer quantum numbers.</p>
        <p>Our calculator uses the formula <strong>1/λ = R × (1/n₁² − 1/n₂²)</strong> where R is the Rydberg constant (default for hydrogen Rₕ = 1.0967758×10⁷ m⁻¹).</p>
      </SEOSection>

      <SEOSection title="How to Use">
        <ol>
          <li>Choose the output: wavelength, frequency, or energy.</li>
          <li>Enter the lower and upper quantum levels n₁ and n₂ (positive integers).</li>
          <li>Optionally set a custom Rydberg constant for hydrogen-like ions.</li>
          <li>Click Calculate to get the result instantly.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Examples and Notes">
        <p>Example: For the Balmer series (n₁ = 2) transitions to n₂ = 3,4,5,..., the calculator returns wavelengths in the visible region for many transitions.</p>
        <p>Use the custom Rydberg constant for ions by scaling R with Z² (approximate for hydrogen-like ions).</p>
      </SEOSection>

      <SEOFAQ
        questions={[
          { question: 'What is the Rydberg constant?', answer: 'The Rydberg constant Rₕ for hydrogen is approximately 1.0967758×10⁷ m⁻¹ and determines the scale of hydrogen spectral lines.' },
          { question: 'Why n₁ and n₂ must be integers?', answer: 'n₁ and n₂ correspond to quantum energy levels, which are integer values in the Bohr model and quantum mechanics for hydrogen-like atoms.' },
          { question: 'Can I use this for ions?', answer: 'Yes—use a scaled Rydberg constant for hydrogen-like ions (approx. R × Z²), or enter a custom R value.' },
          { question: 'What units are used?', answer: 'Wavelength can be returned in nanometers (nm) or meters (m). Frequency is in Hz, and energy is shown in eV and J.' }
        ]}
      />

      <SEOList items={["Rydberg equation calculator","Rydberg formula","spectral line calculator","wavelength calculator","photon energy calculator","frequency calculator","atomic spectra calculator","hydrogen spectral lines","Balmer series calculator"]} />
    </CalculatorPageTemplate>
  );
}
