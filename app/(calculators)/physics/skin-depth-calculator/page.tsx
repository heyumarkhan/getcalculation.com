import SkinDepthCalculator from '../../../_components/calculators/SkinDepthCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function SkinDepthCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Skin Depth Calculator – Electromagnetic Wave Penetration"
      description="Calculate skin depth and resistivity for EM wave attenuation in conductive materials."
      calculator={<SkinDepthCalculator />}
      slug="physics/skin-depth-calculator"
      category="Electromagnetism"
      features={[
        'Computes EM wave skin depth in conductors',
        'Frequency support: Hz to GHz',
        'Material conductivity input (S/m)',
        'Relative permeability adjustment',
        'Resistivity calculation',
        'Material classification (copper, aluminum, etc.)',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Skin Depth?">
        <p>
          Skin depth (δ) is the distance into a conductor where an electromagnetic (EM) wave's amplitude reduces to 1/e (≈37%) of its surface value due to absorption. It describes how deeply RF and EM energy can penetrate conductive materials.
        </p>
        <p className="mt-4">
          At higher frequencies, skin depth decreases dramatically, confining current to the conductor's surface layer. This effect is crucial in design of shielding, coaxial cables, waveguides, antennas, and high-frequency circuits where current flows primarily on conductor surfaces.
        </p>
      </SEOSection>

      <SEOSection title="Skin Depth Formula">
        <SEOFormula
          formula="\delta = \frac{1}{\sqrt{\pi f \mu \sigma}}"
          description="Skin depth in meters, where f = frequency (Hz), μ = permeability (H/m), σ = conductivity (S/m)."
        />
        <SEOFormula
          formula="\mu = \mu_0 \mu_r = 4\pi \times 10^{-7} \times \mu_r"
          description="Permeability from free-space permeability μ₀ and relative permeability μᵣ."
        />
        <SEOFormula
          formula="\rho = \frac{1}{\sigma}"
          description="Resistivity (ρ) is the reciprocal of conductivity (σ)."
        />
      </SEOSection>

      <SEOSection title="Key Relationships">
        <p className="mb-4">
          Skin depth has several important dependencies:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Inverse frequency:</strong> Higher frequency → smaller skin depth (exponentially).</li>
          <li><strong>Inverse conductivity:</strong> Better conductors → smaller skin depth.</li>
          <li><strong>Permeability:</strong> Higher μᵣ → smaller skin depth (magnetic materials confine EM waves more).</li>
          <li><strong>Doubling frequency:</strong> Skin depth reduces by factor of √2 ≈ 1.41.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Material Conductivities">
        <p className="mb-4">
          Reference conductivity values (S/m) at room temperature for common materials:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Copper:</strong> 5.96 × 10⁷ S/m (excellent conductor)</li>
          <li><strong>Aluminum:</strong> 3.77 × 10⁷ S/m (good conductor)</li>
          <li><strong>Seawater:</strong> ~5 S/m (moderate conductor)</li>
          <li><strong>Soil:</strong> 0.01–1 S/m (varies widely)</li>
          <li><strong>Dry rock:</strong> 10⁻⁶–10⁻³ S/m (insulating)</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use the Skin Depth Calculator">
        <SEOList ordered items={[
          '<strong>Enter frequency:</strong> Choose units Hz, kHz, MHz, or GHz.',
          '<strong>Input conductivity:</strong> Enter material conductivity in S/m (e.g., copper = 5.96e7).',
          '<strong>Set relative permeability:</strong> Most conductors μᵣ ≈ 1; iron/nickel μᵣ >> 1.',
          '<strong>Click Calculate:</strong> Get skin depth and resistivity.',
          '<strong>Review results:</strong> Interpret penetration depth and material properties.'
        ]} />
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p className="mb-4">
          Skin depth is essential in:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>EMI/RFI Shielding:</strong> Determining required shield thickness for frequency attenuation.</li>
          <li><strong>Coaxial & Waveguides:</strong> Understanding current distribution and losses.</li>
          <li><strong>Antenna Design:</strong> Surface current behavior on conductors.</li>
          <li><strong>Geophysics:</strong> EM wave penetration in soil/rock for exploration.</li>
          <li><strong>Plating & Surface Treatment:</strong> Predicting electrical behavior of thin coatings.</li>
          <li><strong>High-Frequency PCB Design:</strong> Transmission line impedance and losses.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> 1 MHz signal in copper (σ = 5.96×10⁷ S/m, μᵣ = 1).</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>δ = 1 / √(π × 10⁶ × 4π×10⁻⁷ × 5.96×10⁷)</li>
          <li>δ ≈ 1 / √(223.3) ≈ 67 μm</li>
          <li>At 1 MHz, EM energy penetrates ~67 micrometers into copper.</li>
          <li>At 10 MHz (10× frequency), δ ≈ 21 μm (reduces by √10 ≈ 3.16).</li>
        </ol>
        <p>This explains why thick copper shielding is unnecessary at high frequencies; thin foil suffices.</p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Why does skin depth decrease at higher frequencies?',
            answer: 'Higher frequencies induce stronger eddy currents in the conductor surface, which create opposing magnetic fields that confine energy to a thin surface layer.'
          },
          {
            question: 'What does "1/e" mean in skin depth?',
            answer: 'The field amplitude at depth δ is reduced to 1/e ≈ 0.368 (about 37%) of the surface value. Beyond δ, the field continues to decay exponentially.'
          },
          {
            question: 'How thick should shielding be?',
            answer: 'At least 3–5 skin depths for ~99% attenuation. Use this calculator to find required thickness for your frequency and material.'
          },
          {
            question: 'Does material type matter (copper vs aluminum)?',
            answer: 'Yes. Conductivity (σ) directly affects skin depth. Better conductors have smaller skin depth, improving shielding effectiveness.'
          },
          {
            question: 'What is relative permeability (μᵣ)?',
            answer: 'It compares material permeability to free space. Most metals μᵣ ≈ 1; iron/nickel μᵣ much greater than 1, reducing skin depth significantly.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
