import RelativisticKineticEnergyCalculator from '../../../_components/calculators/RelativisticKineticEnergyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Relativistic Kinetic Energy Calculator | Special Relativity KE';
const description = 'Calculate relativistic kinetic energy, velocity, Lorentz factor, and rest mass energy using special relativity formulas.';
const keywords = [
  'relativistic kinetic energy calculator',
  'special relativity energy calculator',
  'relativistic energy calculator',
  'kinetic energy special relativity',
  'lorentz factor calculator',
  'gamma factor calculator',
  'relativistic velocity calculator',
  'rest mass energy calculator',
  'E = mc² calculator',
  'relativistic kinetic energy formula',
  'relativistic mechanics calculator',
  'special relativity calculator',
  'relativistic motion energy',
  'high velocity kinetic energy',
  'speed of light relativity',
  'relativistic particle energy',
  'physics relativity calculator',
  'einstein energy formula',
  'relativistic physics calculator',
  'particle acceleration energy'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/relativistic-kinetic-energy-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/relativistic-kinetic-energy-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RelativisticKineticEnergyPage() {
  return (
    <CalculatorPageTemplate
      title="Relativistic Kinetic Energy Calculator"
      description="Calculate relativistic kinetic energy at high velocities using special relativity with automatic unit conversions."
      calculator={<RelativisticKineticEnergyCalculator />}
      slug="physics/relativistic-kinetic-energy-calculator"
      category="Relativity"
      features={[
        'Four methods: KE from velocity, velocity from KE, Lorentz factor, rest energy',
        'Mass in kg, g, u (AMU), or MeV/c²; velocity in m/s, km/s, or % of c',
        'Energy in J, kJ, MJ, eV, MeV, GeV',
        'Outputs relativistic kinetic energy plus rest mass energy (E₀ = mc²)',
        'Includes Lorentz factor (γ) calculation for velocity effects',
        'Step-by-step relativistic formula breakdown'
      ]}
    >
      <SEOSection title="Relativistic Kinetic Energy Overview">
        <p>
          Classical kinetic energy (KE = ½mv²) breaks down at speeds approaching light speed. The Relativistic Kinetic Energy Calculator uses special relativity to accurately compute energy for high-velocity particles. It incorporates the Lorentz factor (γ) to account for time dilation, length contraction, and mass-energy equivalence.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Calculator">
        <SEOList
          items={[
            'Select a method: kinetic energy from velocity, velocity from kinetic energy, Lorentz factor, or rest mass energy.',
            'Enter the particle mass (kg, g, atomic mass units, or MeV/c²).',
            'For KE or velocity methods, input the velocity (m/s, km/s, or % of light speed).',
            'Click Calculate to see the relativistic energy with step-by-step formula breakdown.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Relativistic Kinetic Energy Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">KE = (γ - 1)mc²</p>
            <p className="text-sm text-gray-600">Relativistic kinetic energy where γ is the Lorentz factor</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">γ = 1 / √(1 - β²)</p>
            <p className="text-sm text-gray-600">Lorentz factor (β = v/c, velocity as fraction of light speed)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">E₀ = mc²</p>
            <p className="text-sm text-gray-600">Rest mass energy (Einstein mass-energy equivalence)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">E_total = γmc²</p>
            <p className="text-sm text-gray-600">Total relativistic energy = rest energy + kinetic energy</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Understanding Lorentz Factor (γ)">
        <p>
          The Lorentz factor quantifies relativistic effects. At low velocities (v &lt;&lt; c), γ ≈ 1 and relativistic KE reduces to classical ½mv². As velocity approaches c, γ approaches infinity, meaning infinite energy is required to accelerate mass to light speed. This is why photons (massless particles) travel at c, while massive particles cannot.
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mt-3">
          <li>v = 0.1c: γ ≈ 1.005 (0.5% relativistic effect)</li>
          <li>v = 0.5c: γ ≈ 1.155 (15.5% increase)</li>
          <li>v = 0.9c: γ ≈ 2.294 (129% increase over classical)</li>
          <li>v = 0.99c: γ ≈ 7.089 (609% increase over classical)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <SEOList
          items={[
            'Mass: kg, g, u (atomic mass unit ≈ 1.66e-27 kg), MeV/c² (particle physics)',
            'Velocity: m/s, km/s, c (as fraction of light speed, e.g., 0.5c)',
            'Energy: J, kJ, MJ, eV, MeV, GeV',
            'Speed of light: 299,792,458 m/s (exact, 2019 SI definition)'
          ]}
        />
      </SEOSection>

      <SEOSection title="Applications">
        <SEOList
          items={[
            'Particle accelerators: computing energy of electrons, protons, and other particles',
            'Cosmic ray physics: analyzing high-energy particles from space',
            'Nuclear physics: understanding binding energy and mass defect',
            'Medical imaging: PET scanner design and positron-electron annihilation',
            'Astrophysics: black hole accretion and relativistic jets',
            'Materials science: ion implantation and radiation damage'
          ]}
        />
      </SEOSection>

      <SEOSection title="Worked Examples">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Electron at 0.9c:</strong> γ ≈ 2.29; KE ≈ 1.29 × (9.109e-31 kg) × (3e8)² ≈ 1.05 MeV.</li>
          <li><strong>Proton from LHC at 7 TeV:</strong> Rest energy ≈ 938 MeV, total ≈ 7000 GeV, γ ≈ 7460.</li>
          <li><strong>Velocity from KE:</strong> If KE = 100 MeV for a 1 kg mass, γ ≈ 1.57e18, v ≈ 0.9999999999c.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'Why is relativistic KE different from classical KE?',
              answer: 'At high velocities, inertia increases (relativistic mass effect), so more energy is needed to accelerate. Relativistic KE = (γ-1)mc² accounts for this; classical ½mv² underestimates by large factors above 0.1c.'
            },
            {
              question: 'What happens at v = c?',
              answer: 'Lorentz factor γ → ∞, so KE → ∞. Massive particles cannot reach light speed. Only massless photons and gluons travel at c.'
            },
            {
              question: 'How do I convert energy units?',
              answer: 'The calculator supports J, kJ, MJ, eV, MeV, GeV. In particle physics, energies are usually given in MeV or GeV.'
            },
            {
              question: 'What is rest mass energy?',
              answer: `See the ${createInternalLink('kinetic-energy-calculator', 'kinetic energy calculator')} for classical KE. Rest energy E₀ = mc² is the energy equivalent of mass at rest, a key insight from relativity.`
            },
            {
              question: 'Can I use this for photons?',
              answer: 'No. Photons have no rest mass (m=0). Use E = hf (energy = Planck constant × frequency) instead.'
            },
            {
              question: 'Is this used in particle accelerators?',
              answer: 'Yes. Accelerators like the LHC rely on relativistic kinetic energy calculations to determine beam energy and collision dynamics.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
