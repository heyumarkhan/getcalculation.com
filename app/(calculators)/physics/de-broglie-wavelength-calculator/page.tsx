import DeBroglieWavelengthCalculator from '../../../_components/calculators/DeBroglieWavelengthCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function DeBroglieWavelengthCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="De Broglie Wavelength Calculator: Quantum Particle Wave Properties"
      description="Calculate De Broglie wavelength for particles using momentum or mass and velocity. Free quantum mechanics calculator for particle-wave duality and quantum physics."
      calculator={<DeBroglieWavelengthCalculator />}
      slug="physics/de-broglie-wavelength-calculator"
      category="Quantum Mechanics"
      features={[
        "Calculate De Broglie wavelength from particle momentum",
        "Find wavelength from particle mass and velocity",
        "Determine particle momentum from wavelength",
        "Calculate particle velocity from wavelength and mass",
        "Support for multiple unit systems (kg, g, mg, atomic mass units, electron mass)",
        "Uses Planck's constant (6.626 × 10⁻³⁴ J·s) for accurate quantum calculations",
        "Instant calculations with step-by-step formulas"
      ]}
    >
      <SEOSection title="Understanding De Broglie Wavelength in Quantum Mechanics">
        <p>
          The <strong>De Broglie Wavelength Calculator</strong> is an essential tool for quantum physics and particle mechanics. Proposed by Louis de Broglie in 1924, the concept of <strong>De Broglie wavelength</strong> revolutionized physics by demonstrating that all matter exhibits wave-particle duality. Every particle, from electrons to macroscopic objects, has an associated wavelength determined by its momentum.
        </p>
        <p>
          The De Broglie wavelength is the characteristic wavelength of a particle that exhibits wave-like properties. This calculator determines the wavelength associated with any particle using its momentum or the combination of mass and velocity. Understanding De Broglie wavelength is fundamental to quantum mechanics, atomic physics, electron microscopy, and particle physics research.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the De Broglie Wavelength Calculator">
        <p>
          The De Broglie wavelength calculator provides four flexible calculation methods for different quantum mechanics scenarios:
        </p>
        <ol>
          <li><strong>Find Wavelength from Momentum:</strong> Enter particle momentum to calculate its De Broglie wavelength using λ = h/p</li>
          <li><strong>Find Wavelength from Mass & Velocity:</strong> Enter particle mass and velocity to determine wavelength using λ = h/(m×v)</li>
          <li><strong>Find Momentum from Wavelength:</strong> Enter wavelength to calculate particle momentum using p = h/λ</li>
          <li><strong>Find Velocity from Wavelength & Mass:</strong> Enter wavelength and mass to determine particle velocity using v = h/(m×λ)</li>
        </ol>
        <p>
          Select your calculation method, enter the known values in appropriate units, and click Calculate. The De Broglie wavelength calculator instantly computes results with detailed step-by-step formulas showing Planck's constant and all conversions.
        </p>
      </SEOSection>

      <SEOSection title="De Broglie Wavelength Formulas and Calculations">
        <p>
          The De Broglie wavelength calculator uses fundamental quantum mechanics formulas based on Planck's constant and the particle-wave duality principle:
        </p>
        
        <h3>1. De Broglie Wavelength from Momentum</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">λ = h / p</p>
          <p className="text-sm text-gray-600 mt-2">Where: h = Planck's constant (6.626 × 10⁻³⁴ J·s), p = momentum (kg·m/s)</p>
        </div>
        <p>
          This is the fundamental De Broglie relation discovered by Louis de Broglie. It states that the wavelength of a particle is inversely proportional to its momentum. Particles with higher momentum have shorter wavelengths, while particles with lower momentum have longer wavelengths.
        </p>

        <h3>2. De Broglie Wavelength from Mass and Velocity</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">λ = h / (m × v)</p>
          <p className="text-sm text-gray-600 mt-2">Where: h = Planck's constant, m = particle mass (kg), v = particle velocity (m/s)</p>
        </div>
        <p>
          This formula combines momentum definition (p = m×v) with the De Broglie relation. It directly relates a particle's wavelength to its physical properties—mass and velocity. This is the most common form used in quantum mechanics calculations.
        </p>

        <h3>3. Particle Momentum from De Broglie Wavelength</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">p = h / λ</p>
          <p className="text-sm text-gray-600 mt-2">Where: h = Planck's constant, λ = De Broglie wavelength</p>
        </div>
        <p>
          This rearrangement of the De Broglie relation allows calculation of momentum from measured wavelength. This is particularly useful in quantum experiments where wavelength is directly observable.
        </p>

        <h3>4. Particle Velocity from Wavelength and Mass</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">v = h / (m × λ)</p>
          <p className="text-sm text-gray-600 mt-2">Where: h = Planck's constant, m = particle mass, λ = De Broglie wavelength</p>
        </div>
        <p>
          This formula determines particle velocity from known wavelength and mass. It demonstrates that for a given wavelength, heavier particles move more slowly than lighter particles.
        </p>

        <h3>Planck's Constant</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">h = 6.62607015 × 10⁻³⁴ J·s</p>
          <p className="text-sm text-gray-600 mt-2">A fundamental constant of nature defining the scale of quantum mechanics</p>
        </div>
      </SEOSection>

      <SEOSection title="De Broglie Wavelength by Particle Type">
        <p>
          Different particles have dramatically different De Broglie wavelengths at the same velocity due to their different masses:
        </p>
        <table className="w-full border-collapse border border-gray-300 my-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left font-semibold">Particle Type</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Mass</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Example Velocity</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">De Broglie Wavelength</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Electron</td>
              <td className="border border-gray-300 p-2">9.109 × 10⁻³¹ kg</td>
              <td className="border border-gray-300 p-2">2 × 10⁶ m/s</td>
              <td className="border border-gray-300 p-2">0.364 nm</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">Proton</td>
              <td className="border border-gray-300 p-2">1.673 × 10⁻²⁷ kg</td>
              <td className="border border-gray-300 p-2">2 × 10⁶ m/s</td>
              <td className="border border-gray-300 p-2">0.000198 nm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Neutron</td>
              <td className="border border-gray-300 p-2">1.675 × 10⁻²⁷ kg</td>
              <td className="border border-gray-300 p-2">3,000 m/s</td>
              <td className="border border-gray-300 p-2">0.132 nm</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">Baseball (145 g)</td>
              <td className="border border-gray-300 p-2">0.145 kg</td>
              <td className="border border-gray-300 p-2">40 m/s</td>
              <td className="border border-gray-300 p-2">1.14 × 10⁻³⁴ nm</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Human (70 kg)</td>
              <td className="border border-gray-300 p-2">70 kg</td>
              <td className="border border-gray-300 p-2">1 m/s</td>
              <td className="border border-gray-300 p-2">9.46 × 10⁻³⁷ nm</td>
            </tr>
          </tbody>
        </table>
        <p>
          The table demonstrates why De Broglie wavelengths are typically unobservable for macroscopic objects. Electrons exhibit measurable wavelengths in the nanometer range, while everyday objects have wavelengths far too small to detect.
        </p>
      </SEOSection>

      <SEOSection title="Applications of De Broglie Wavelength">
        <SEOList
          items={[
            "Electron Microscopy: Using electron waves with short wavelengths to image atomic-scale structures with resolution beyond optical microscopes",
            "X-ray Diffraction: Understanding crystal structure determination through electron and X-ray diffraction patterns",
            "Quantum Mechanics: Calculating wave-particle behavior of electrons in atoms, molecules, and solids",
            "Particle Accelerators: Designing accelerators and predicting particle interactions at high energies",
            "Neutron Scattering: Using thermal neutrons with known wavelengths to study material properties",
            "Spectroscopy: Analyzing atomic and molecular absorption/emission spectra through quantum transitions",
            "Atomic Physics: Understanding electron orbitals and standing wave patterns around atoms",
            "Materials Science: Predicting quantum properties of nanostructures and semiconductor devices",
            "Quantum Computing: Engineering particle states for quantum computation and information processing",
            "Particle Physics: Investigating fundamental particle properties and interactions in high-energy experiments"
          ]}
        />
      </SEOSection>

      <SEOSection title="De Broglie Wavelength Calculator Examples">
        <h3>Example 1: Electron De Broglie Wavelength</h3>
        <p>
          An electron with mass 9.109 × 10⁻³¹ kg moves at velocity 2 × 10⁶ m/s. What is its De Broglie wavelength?
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> λ = h / (m × v) = (6.626 × 10⁻³⁴) / (9.109 × 10⁻³¹ × 2 × 10⁶) = 0.364 nm (Angstroms)
        </p>
        <p>
          This wavelength is comparable to atomic dimensions, explaining why electrons diffract when passing through atomic-scale structures. This is the basis of electron microscopy and electron diffraction experiments.
        </p>

        <h3>Example 2: Proton De Broglie Wavelength</h3>
        <p>
          A proton with mass 1.673 × 10⁻²⁷ kg accelerated to 2 × 10⁶ m/s has what De Broglie wavelength?
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> λ = (6.626 × 10⁻³⁴) / (1.673 × 10⁻²⁷ × 2 × 10⁶) = 0.000198 nm (0.198 pm)
        </p>
        <p>
          Protons have much shorter wavelengths than electrons at the same velocity due to their 1,836 times greater mass. This extremely short wavelength makes protons useful for studying fine nuclear structure.
        </p>

        <h3>Example 3: Momentum from De Broglie Wavelength</h3>
        <p>
          A particle exhibits a De Broglie wavelength of 1.0 nm. What is its momentum?
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> p = h / λ = (6.626 × 10⁻³⁴) / (1.0 × 10⁻⁹) = 6.626 × 10⁻²⁵ kg·m/s
        </p>
        <p>
          This inverse relationship is fundamental: observing shorter wavelengths indicates higher momentum particles, essential for particle identification in physics experiments.
        </p>
      </SEOSection>

      <SEOSection title="Particle-Wave Duality and Quantum Mechanics">
        <h3>The Wave-Particle Duality Principle</h3>
        <p>
          De Broglie wavelength is central to understanding particle-wave duality—the concept that all matter exhibits both particle and wave properties simultaneously. Electrons, like all particles, behave as particles when measured (detected at specific locations) and as waves when not observed (exhibiting interference patterns).
        </p>

        <h3>Quantum Interference and Diffraction</h3>
        <p>
          When particles have significant De Broglie wavelengths relative to their environment, they exhibit quantum interference and diffraction effects. This occurs when:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Wavelength is comparable to atomic spacing: electrons, neutrons (typically in nanometer range)</li>
          <li>Wavelength is comparable to aperture or slit size: diffraction occurs when λ ≈ aperture width</li>
          <li>Wave propagation distance allows standing wave formation: quantum confinement in atoms and molecules</li>
        </ul>

        <h3>De Broglie Wavelength and Quantum Confinement</h3>
        <p>
          The De Broglie wavelength determines the minimum region where a particle can be confined. Particles with shorter wavelengths can be confined to smaller regions without violating the uncertainty principle. This explains why electrons confined to atomic dimensions exhibit quantized energy levels while macroscopic objects don't.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is De Broglie wavelength?",
            answer: "De Broglie wavelength is the wavelength associated with a particle due to its wave-particle duality, calculated using λ = h/p, where h is Planck's constant and p is momentum. It represents the characteristic wavelength at which a particle exhibits quantum wave properties."
          },
          {
            question: "Why do electrons have observable De Broglie wavelengths while baseballs don't?",
            answer: "The De Broglie wavelength is inversely proportional to momentum (λ = h/p). Electrons have extremely small mass, so their momentum is small, resulting in relatively large wavelengths (nanometers). Baseballs have enormous momentum compared to Planck's constant, yielding wavelengths so small they cannot be observed."
          },
          {
            question: "How is De Broglie wavelength used in electron microscopy?",
            answer: "Electron microscopes use electrons accelerated to specific velocities, giving them wavelengths much shorter than visible light. These short De Broglie wavelengths allow resolution of atomic-scale features impossible with optical microscopes. Shorter wavelengths mean better resolution."
          },
          {
            question: "What is Planck's constant and why is it important?",
            answer: "Planck's constant (h = 6.626 × 10⁻³⁴ J·s) is a fundamental constant of nature defining the quantum scale. It appears in the De Broglie relation and all quantum mechanics calculations, showing that quantum effects are tiny but real for particles like electrons."
          },
          {
            question: "Can macroscopic objects like baseballs have De Broglie wavelengths?",
            answer: "Yes, baseballs technically have De Broglie wavelengths, but they're unimaginably small (about 10⁻³⁴ nanometers). This wavelength is many orders of magnitude smaller than any possible detection method, so quantum wave properties are completely unobservable for macroscopic objects."
          },
          {
            question: "How does De Broglie wavelength relate to particle energy?",
            answer: "For non-relativistic particles, energy is related to velocity (E = ½mv²), which is related to momentum (p = mv). Shorter De Broglie wavelengths indicate higher momentum and higher kinetic energy. As particles accelerate, their wavelengths decrease and they become more particle-like."
          }
        ]}
      />

      <SEOSection title="Conclusion">
        <p>
          The <strong>De Broglie Wavelength Calculator</strong> is an indispensable tool for quantum physics, atomic physics, and materials science research. By understanding how all particles exhibit wave-particle duality through their characteristic De Broglie wavelengths, scientists can predict quantum behavior, design electron microscopes, analyze X-ray diffraction patterns, and understand the fundamental nature of matter. Whether you're studying quantum mechanics, designing particle accelerators, or exploring the microscopic world, this calculator provides the precise quantum mechanical calculations needed for proper analysis and prediction of particle wave properties.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
