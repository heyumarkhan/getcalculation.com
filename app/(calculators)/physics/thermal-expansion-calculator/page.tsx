import ThermalExpansionCalculator from '../../../_components/calculators/ThermalExpansionCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import type { Metadata } from 'next';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Thermal Expansion Calculator - Linear & Volumetric',
  description: 'Calculate thermal expansion using ΔL = L₀αΔT for solids and ΔV = V₀βΔT for liquids with material presets.',
  keywords: [
    'Thermal Expansion Calculator',
    'linear thermal expansion',
    'volumetric expansion',
    'coefficient of thermal expansion',
    'thermal expansion formula',
    'ΔL = L₀αΔT',
    'ΔV = V₀βΔT',
    'material expansion calculator',
    'temperature expansion',
    'metal expansion',
    'steel expansion calculator',
    'aluminum expansion',
    'thermal stress calculator',
    'expansion coefficient',
    'thermal physics calculator',
    'thermodynamics calculator',
    'heat expansion',
    'material property calculator',
    'temperature change calculator',
    'material expansion physics'
  ],
  openGraph: {
    title: 'Thermal Expansion Calculator - Materials & Temperature',
    description: 'Compute linear and volumetric expansion for solids and liquids based on temperature changes.',
    type: 'website',
    url: 'https://getcalculation.com/physics/thermal-expansion-calculator',
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics/thermal-expansion-calculator',
  },
};

export default function ThermalExpansionPage() {
  return (
    <CalculatorPageTemplate
      title="Thermal Expansion Calculator"
      description="Calculate linear and volumetric thermal expansion for materials with temperature changes."
      calculator={<ThermalExpansionCalculator />}
      slug="physics/thermal-expansion-calculator"
      category="Thermodynamics"
      features={[
        'Calculate linear expansion (ΔL = L₀αΔT)',
        'Calculate volumetric expansion (ΔV = V₀βΔT)',
        'Reverse calculations: temperature change and expansion coefficient',
        'Material presets: 12 common metals, glass, concrete, and liquids',
        'Temperature units: °C, K, °F with proper conversions',
        'Length and volume unit conversions (mm, m, in, ft, liters, m³)',
        '#820ECC branded design',
        'Physics-accurate thermal expansion coefficients'
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Thermal Expansion?</h2>
        <p className="mb-4">
          <strong>Thermal Expansion Calculator</strong> computes how materials change in size when exposed to temperature variations. Most solids expand when heated and contract when cooled, a fundamental property in thermodynamics and engineering.
        </p>
        <p>
          Thermal expansion is critical in design: bridges, railroad tracks, pipelines, and electronic components all must account for expansion to prevent structural damage, gaps, or stress concentrations.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thermal Expansion Formulas</h2>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600 mb-4">
          <p className="font-mono font-bold mb-3"><strong>Linear Expansion: ΔL = L₀ × α × ΔT</strong></p>
          <ul className="text-sm space-y-2 mb-4">
            <li><strong>ΔL</strong> = Change in length (mm, m, etc.)</li>
            <li><strong>L₀</strong> = Original length</li>
            <li><strong>α</strong> = Linear expansion coefficient (/°C or /K)</li>
            <li><strong>ΔT</strong> = Change in temperature (°C or K)</li>
          </ul>

          <p className="font-mono font-bold mb-3"><strong>Volumetric Expansion: ΔV = V₀ × β × ΔT</strong></p>
          <ul className="text-sm space-y-2">
            <li><strong>ΔV</strong> = Change in volume (liters, m³, etc.)</li>
            <li><strong>V₀</strong> = Original volume</li>
            <li><strong>β</strong> = Volumetric expansion coefficient (/°C or /K)</li>
            <li><strong>ΔT</strong> = Change in temperature</li>
          </ul>
        </div>
        <p className="text-sm text-gray-600">
          For isotropic solids, β ≈ 3α (volumetric coefficient ≈ 3× linear coefficient).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Thermal Expansion Coefficients (Sample Materials)</h2>
        <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Material</th>
                <th className="text-right py-2">α (×10⁻⁶ /°C)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Aluminum</td>
                <td className="text-right font-mono">23.1</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Brass</td>
                <td className="text-right font-mono">19.0</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Copper</td>
                <td className="text-right font-mono">17.0</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Iron/Steel</td>
                <td className="text-right font-mono">12.0</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Glass (common)</td>
                <td className="text-right font-mono">9.0</td>
              </tr>
              <tr>
                <td className="py-2">Concrete</td>
                <td className="text-right font-mono">12.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Concepts</h2>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Linear vs. Volumetric:</strong> Linear expansion measures length change; volumetric measures volume change. For 3D objects, volumetric expansion is often more relevant.</li>
          <li><strong>Material Dependency:</strong> Different materials have different expansion coefficients. Metals typically expand more than ceramics or composites.</li>
          <li><strong>Thermal Stress:</strong> When materials are constrained and cannot expand freely, internal stress develops, potentially causing warping, cracking, or failure.</li>
          <li><strong>Temperature Range:</strong> Expansion coefficients vary slightly with temperature. Calculations here assume constant coefficients over the temperature range.</li>
          <li><strong>Negative Expansion:</strong> Unusual materials like some rubber polymers contract upon heating (negative expansion coefficient).</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Examples</h2>
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800">Example 1: Steel Bridge Expansion</h4>
            <p className="text-sm">A steel bridge span is 100 m long at 20°C. On a hot summer day (40°C), how much does it expand?</p>
            <p className="text-sm mt-2"><strong>Solution:</strong> ΔL = 100 m × 12×10⁻⁶ /°C × (40 - 20)°C = 0.024 m = 24 mm</p>
            <p className="text-sm text-gray-600">Expansion joints in the bridge accommodate this 24 mm movement.</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">Example 2: Aluminum Pipe Heating</h4>
            <p className="text-sm">A 1-meter aluminum pipe (α = 23.1×10⁻⁶) heated from 20°C to 120°C. Expansion?</p>
            <p className="text-sm mt-2"><strong>Solution:</strong> ΔL = 1 m × 23.1×10⁻⁶ /°C × 100°C = 0.00231 m = 2.31 mm</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">Example 3: Liquid in a Tank</h4>
            <p className="text-sm">A glass tank contains 1000 liters of water. Temperature rises from 4°C to 24°C. Volume expansion?</p>
            <p className="text-sm mt-2"><strong>Solution:</strong> ΔV = 1000 L × 207×10⁻⁶ /°C × 20°C ≈ 4.14 L overflow</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li>Select a calculation mode: Linear Expansion, Volumetric Expansion, Temperature Change, or Coefficient.</li>
          <li>For linear expansion, choose a material preset or enter a custom expansion coefficient.</li>
          <li>Enter the original length (or volume) and temperature change in your preferred units.</li>
          <li>Click <strong>Calculate</strong> to find the thermal expansion instantly.</li>
          <li>Use reverse modes to find temperature change or coefficient given expansion values.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Infrastructure:</strong> Bridge expansion joints, railroad tracks, pipelines, and power lines.</li>
          <li><strong>Manufacturing:</strong> Tolerance design, machining accuracy, and fit adjustments for parts.</li>
          <li><strong>Electronics:</strong> PCB design, component mounting, and thermal cycling reliability.</li>
          <li><strong>Automotive:</strong> Engine design, fuel system tolerances, and thermal management.</li>
          <li><strong>Precision Instruments:</strong> Optical systems, measuring devices, and calibration standards.</li>
          <li><strong>Thermodynamics:</strong> Thermal stress analysis, material selection, and durability prediction.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>{createInternalLink('heat-transfer-calculator')} - Compute heat transfer and thermal energy flow</li>
          <li>{createInternalLink('enthalpy-calculator')} - Calculate enthalpy changes in thermodynamics</li>
          <li>{createInternalLink('efficiency-calculator')} - Analyze thermal system efficiency</li>
          <li>{createInternalLink('specific-heat-calculator')} - Determine specific heat capacity of materials</li>
          <li>{createInternalLink('hookes-law-calculator')} - Calculate stress and strain in elastic materials</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the linear expansion coefficient?</h3>
            <p>The linear expansion coefficient (α) quantifies how much a material expands per unit length per degree of temperature change. Units are typically /°C or /K. For aluminum, α ≈ 23.1×10⁻⁶ /°C.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Why is thermal expansion important in engineering?</h3>
            <p>If materials cannot expand freely when heated, internal stresses develop. This can cause structural failure, warping, misalignment, or cracking. Engineers design expansion joints, clearances, and material selection to manage thermal effects.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Is the expansion coefficient constant with temperature?</h3>
            <p>For small temperature ranges, it's approximately constant. Over large ranges, the coefficient varies with temperature. Most engineering calculations assume constant values for simplicity.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How do expansion joints work?</h3>
            <p>Expansion joints are gaps or flexible segments that allow materials (like steel in bridges) to expand and contract with temperature without creating internal stress. They are designed based on thermal expansion calculations.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can materials contract when heated?</h3>
            <p>Very rarely. Most materials expand when heated. However, some materials like water below 4°C and certain polymers exhibit negative thermal expansion coefficients and contract when heated.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I calculate volumetric expansion from linear coefficient?</h3>
            <p>For isotropic solids, the volumetric coefficient β ≈ 3α. If a material's linear coefficient is 10×10⁻⁶ /°C, its volumetric coefficient is approximately 30×10⁻⁶ /°C.</p>
          </div>
        </div>
      </section>
    </CalculatorPageTemplate>
  );
}
