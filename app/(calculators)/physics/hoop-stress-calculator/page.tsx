import HoopStressCalculator from '../../../_components/calculators/HoopStressCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Hoop Stress Calculator | Pressure Vessel Design & Analysis';
const description = 'Calculate hoop stress, axial stress, and minimum wall thickness for pressure vessels, pipes, and cylindrical containers.';
const keywords = [
  'hoop stress calculator',
  'pressure vessel calculator',
  'hoop stress formula',
  'tangential stress calculator',
  'circumferential stress calculator',
  'pipe stress calculator',
  'pressure vessel design calculator',
  'wall thickness calculator',
  'cylindrical pressure vessel',
  'thin wall pressure vessel',
  'thick wall pressure vessel',
  'vessel stress analysis',
  'maximum pressure calculator',
  'pressure vessel thickness',
  'cylinder stress calculator',
  'longitudinal stress calculator',
  'radial stress calculator',
  'vessel design calculator',
  'piping stress calculator',
  'pressure container calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/hoop-stress-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/hoop-stress-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function HoopStressCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Hoop Stress Calculator"
      description="Calculate hoop stress, radial stress, and design parameters for pressure vessels and cylindrical pipes."
      calculator={<HoopStressCalculator />}
      slug="physics/hoop-stress-calculator"
      category="Physics"
      features={[
        'Four calculation methods: hoop/axial stress, strain and displacement, minimum thickness, maximum pressure',
        'Unit-flexible inputs for pressure (Pa, atm, bar, psi), dimensions (mm, cm, m, in), material properties (GPa)',
        'Thin-wall pressure vessel approximations with diameter-to-thickness ratio validation',
        'Calculates circumferential, longitudinal, and radial stress components',
        'Strain and displacement calculations with Young modulus and Poisson ratio',
        'Perfect for vessel design, piping analysis, and code compliance verification'
      ]}
    >
      <SEOSection title="Understanding Hoop Stress in Pressure Vessels">
        <p>
          The Hoop Stress Calculator analyzes stresses in cylindrical pressure vessels, pipes, and tanks subjected to internal pressure. Hoop stress (circumferential stress) is the most critical stress in thin-walled vessels, acting tangentially around the circumference. The calculator uses thin-wall vessel theory applicable when diameter-to-thickness ratio exceeds 20. Key outputs include hoop stress (σ_h = pr/t), axial stress (σ_a = pr/2t), radial stress, strains, and vessel dimensions. Essential for ASME boiler and pressure vessel code design, industrial equipment, hydraulic systems, and pipeline engineering.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Hoop Stress Calculator">
        <SEOList
          items={[
            'Select calculation method: stress analysis, strain calculation, thickness sizing, or pressure rating.',
            'For stress analysis: enter internal pressure, radius, and wall thickness.',
            'For strain calculation: additionally provide material properties (Young modulus, Poisson ratio).',
            'For thickness sizing: enter pressure, radius, and allowable stress from material/code.',
            'For pressure rating: enter radius, thickness, and maximum allowable stress.',
            'Choose appropriate units for pressure (MPa, psi, bar) and dimensions (mm, in, cm).',
            'Click Calculate to get stress components, strains, and design parameters.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Hoop Stress Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">σ_h = p × r / t</p>
            <p className="text-sm text-gray-600">Hoop (circumferential) stress in thin-walled cylinder</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">σ_a = p × r / (2 × t)</p>
            <p className="text-sm text-gray-600">Axial (longitudinal) stress (half of hoop stress)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">t = p × r / σ_allowable</p>
            <p className="text-sm text-gray-600">Minimum wall thickness for design</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">ε_h = (σ_h - ν(σ_a + σ_r)) / E</p>
            <p className="text-sm text-gray-600">Hoop strain (ν = Poisson ratio, E = Young modulus)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Material Properties Reference">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Material</th>
                <th className="px-4 py-2 border">Young's Modulus (GPa)</th>
                <th className="px-4 py-2 border">Poisson Ratio</th>
                <th className="px-4 py-2 border">Yield Strength (MPa)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2 border">Steel (mild)</td><td className="px-4 py-2 border">200-210</td><td className="px-4 py-2 border">0.27-0.30</td><td className="px-4 py-2 border">250-350</td></tr>
              <tr><td className="px-4 py-2 border">Stainless steel</td><td className="px-4 py-2 border">190-200</td><td className="px-4 py-2 border">0.27-0.31</td><td className="px-4 py-2 border">170-860</td></tr>
              <tr><td className="px-4 py-2 border">Aluminum</td><td className="px-4 py-2 border">69-72</td><td className="px-4 py-2 border">0.33-0.34</td><td className="px-4 py-2 border">40-500</td></tr>
              <tr><td className="px-4 py-2 border">Copper</td><td className="px-4 py-2 border">110-130</td><td className="px-4 py-2 border">0.31-0.34</td><td className="px-4 py-2 border">33-400</td></tr>
              <tr><td className="px-4 py-2 border">Titanium</td><td className="px-4 py-2 border">102-103</td><td className="px-4 py-2 border">0.32-0.34</td><td className="px-4 py-2 border">170-1900</td></tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Hoop Stress Calculator">
        <SEOList
          items={[
            'Pressure vessel design: boilers, tanks, accumulators, autoclaves, reactors',
            'Pipeline systems: gas pipelines, oil pipelines, water mains, steam pipes',
            'Industrial equipment: compressors, heat exchangers, separation vessels',
            'Hydraulic systems: cylinders, accumulators, manifolds, intensifiers',
            'Aerospace applications: pressurized fuselage, fuel tanks, pressure cabins',
            'Code compliance: ASME Section VIII, PED, BPVC design verification',
            'Fatigue analysis: cyclic loading, endurance limits, service life prediction',
            'Material selection: vessel sizing for different materials and safety factors'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Pressure vessel:</strong> p = 2 MPa, r = 100 mm, t = 5 mm → σ_h = 40 MPa, σ_a = 20 MPa</li>
          <li><strong>Minimum thickness:</strong> p = 10 bar, r = 500 mm, σ_allowable = 140 MPa → t = 3.57 mm (use 4 mm)</li>
          <li><strong>Maximum pressure:</strong> r = 50 mm, t = 3 mm, σ_max = 250 MPa → p_max = 15 MPa (15 bar working pressure)</li>
          <li><strong>Strain analysis:</strong> 2 MPa pressure, steel vessel, E = 200 GPa → hoop strain ≈ 0.0002 (0.02%)</li>
          <li><strong>Pipe design:</strong> DN250 (250mm diameter), t = 6 mm, steel → safely handles ~2.4 MPa pressure</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'Why is hoop stress greater than axial stress?',
              answer: 'Hoop stress is twice axial stress because pressure acts circumferentially around the entire circumference, while axial stress is limited to the end cap area. The hoop direction experiences continuous force, making it the critical stress in cylinder design. Safety margins typically control hoop stress.'
            },
            {
              question: 'When is thin-wall approximation valid?',
              answer: 'Thin-wall theory applies when diameter-to-thickness ratio (d/t) exceeds 20. For d/t < 20, use thick-wall formulas (Lamé equations). Thin-wall approximations are simpler and accurate enough for most industrial pressure vessels, simplifying design calculations.'
            },
            {
              question: 'What safety factors should I use?',
              answer: 'ASME code typically requires 3.5-4.0 safety factor on yield strength, 4.0-5.0 on ultimate strength. For pressure vessels, allowable stress = yield strength / 4. Always use code-mandated safety factors for your jurisdiction and vessel type to ensure safe design.'
            },
            {
              question: 'How does corrosion affect vessel thickness?',
              answer: 'Add 1-3 mm corrosion allowance depending on fluid and material. Calculate minimum thickness for required service life, then add corrosion allowance. Example: 5mm required thickness + 2mm corrosion allowance = 7mm actual thickness. Re-inspect when thickness reaches minimum.'
            },
            {
              question: 'What is the difference between gauge pressure and absolute pressure?',
              answer: 'Gauge pressure = pressure above atmospheric (typical for vessel design). Absolute pressure = gauge pressure + 1 atm (101.325 kPa). Most pressure gauge readings are gauge pressure. For calculations, confirm whether your pressure value is gauge or absolute pressure.'
            },
            {
              question: 'How do I calculate stress for elliptical or non-cylindrical vessels?',
              answer: 'This calculator uses cylindrical vessel formulas. Elliptical or spherical vessels require different equations. Spheres have σ_h = pr/(2t) (half of cylinder). Consult ASME code or FEA software for complex geometries. Cylindrical approximation often works for vessels with moderate eccentricity.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
