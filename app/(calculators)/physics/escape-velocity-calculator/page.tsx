import EscapeVelocityCalculator from '../../../_components/calculators/EscapeVelocityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import type { Metadata } from 'next';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Escape Velocity Calculator - Planet & Space',
  description: 'Calculate escape velocity using v = √(2GM/r) for planets, moons, and celestial bodies with unit conversions.',
  keywords: [
    'Escape Velocity Calculator',
    'calculate escape velocity',
    'escape velocity formula',
    'v = √(2GM/r)',
    'escape speed',
    'planet escape velocity',
    'Earth escape velocity',
    'Mars escape velocity',
    'escape velocity physics',
    'gravitational escape',
    'space physics calculator',
    'celestial body escape velocity',
    'escape velocity m/s',
    'escape velocity km/s',
    'moon escape velocity',
    'escape velocity planet',
    'gravitational physics calculator',
    'kinematics orbital mechanics'
  ],
  openGraph: {
    title: 'Escape Velocity Calculator - Celestial Body Escape Speeds',
    description: 'Compute minimum velocity to escape a celestial body gravity well using gravitational physics formulas.',
    type: 'website',
    url: 'https://getcalculation.com/physics/escape-velocity-calculator',
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics/escape-velocity-calculator',
  },
};

export default function EscapeVelocityPage() {
  return (
    <CalculatorPageTemplate
      title="Escape Velocity Calculator"
      description="Calculate the minimum velocity required to escape a celestial body's gravitational field."
      calculator={<EscapeVelocityCalculator />}
      slug="physics/escape-velocity-calculator"
      category="Mechanics"
      features={[
        'Calculate escape velocity from mass and radius',
        'Presets for 9 celestial bodies (Earth, Mars, Jupiter, Moon, Sun, etc.)',
        'Gravitational parameter mode (μ = GM)',
        'Reverse calculation: mass from escape velocity',
        'Multiple velocity units: m/s, km/s, km/h, mph',
        'Mass and radius unit conversions',
        '#820ECC branded design',
        'Physics-accurate gravitational constant G'
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Escape Velocity?</h2>
        <p className="mb-4">
          <strong>Escape Velocity Calculator</strong> computes the minimum speed an object needs to break free from the gravitational pull of a celestial body. This is a fundamental concept in orbital mechanics and space exploration.
        </p>
        <p>
          Escape velocity depends only on the mass and radius of the body, not on the object's mass. It is the speed needed at the surface to reach infinite distance with zero final velocity.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Escape Velocity Formula</h2>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600 mb-4">
          <p className="font-mono font-bold mb-2"><strong>v = √(2GM/r)</strong></p>
          <ul className="text-sm space-y-2">
            <li><strong>v</strong> = Escape velocity (m/s)</li>
            <li><strong>G</strong> = Gravitational constant (6.674×10⁻¹¹ m³/(kg·s²))</li>
            <li><strong>M</strong> = Mass of celestial body (kg)</li>
            <li><strong>r</strong> = Radius of celestial body (m)</li>
          </ul>
        </div>
        <p className="text-sm text-gray-600">
          The formula derives from energy conservation: kinetic energy at surface equals gravitational potential energy at infinity.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Concepts</h2>
        <ul className="list-disc list-inside space-y-3 ml-4">
          <li><strong>Gravitational Parameter (μ):</strong> The product μ = GM represents the strength of a body's gravitational field. For Earth, μ ≈ 3.986×10¹⁴ m³/s².</li>
          <li><strong>Independence from Object Mass:</strong> A feather and a rocket need the same escape velocity from Earth, assuming no air resistance.</li>
          <li><strong>Direction Independence:</strong> Escape velocity is the same in any direction—vertical, horizontal, or at any angle.</li>
          <li><strong>Atmospheric Effects:</strong> Real spacecraft must account for atmospheric drag, which increases the required energy.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Escape Velocity Examples</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Celestial Body</th>
                <th className="text-right py-2">Escape Velocity (km/s)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">Earth</td>
                <td className="text-right font-mono">11.19</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Mars</td>
                <td className="text-right font-mono">5.03</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Moon</td>
                <td className="text-right font-mono">2.38</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Jupiter</td>
                <td className="text-right font-mono">59.5</td>
              </tr>
              <tr>
                <td className="py-2">Sun</td>
                <td className="text-right font-mono">617.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Calculator</h2>
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li>Select a calculation mode: Escape Velocity, Gravitational Parameter, or Mass from Escape Velocity.</li>
          <li>For escape velocity, choose a celestial body preset or enter custom mass and radius values.</li>
          <li>Select your preferred velocity units (m/s, km/s, km/h, mph).</li>
          <li>Click <strong>Calculate</strong> to compute the result instantly.</li>
          <li>Review the result with full precision for your physics or engineering application.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Space Missions:</strong> Determining launch velocity for interplanetary spacecraft.</li>
          <li><strong>Black Hole Physics:</strong> Understanding event horizons where escape velocity equals light speed.</li>
          <li><strong>Planetary Science:</strong> Analyzing atmospheric retention and composition of planets and moons.</li>
          <li><strong>Rocket Engineering:</strong> Designing propulsion systems for orbital and escape trajectories.</li>
          <li><strong>Astronomy:</strong> Studying neutron stars and stellar evolution.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>{createInternalLink('gravitational-force-calculator')} - Compute gravitational force between two masses</li>
          <li>{createInternalLink('acceleration-due-to-gravity-calculator')} - Calculate surface gravity for planets</li>
          <li>{createInternalLink('orbital-period-calculator')} - Determine orbital period for celestial objects</li>
          <li>{createInternalLink('velocity-calculator')} - General kinematics velocity calculations</li>
          <li>{createInternalLink('kinetic-energy-calculator')} - Calculate kinetic energy of moving objects</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the escape velocity of Earth?</h3>
            <p>Earth's escape velocity is approximately 11.19 km/s or 40,284 km/h. This is the speed needed at Earth's surface to completely escape its gravitational field without further propulsion.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Why is escape velocity independent of mass?</h3>
            <p>Escape velocity depends on the gravitational field strength (M and r of the body), not the object escaping it. Both a 1 kg object and a 1,000 kg spacecraft need the same velocity to escape Earth's gravity.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can escape velocity exceed the speed of light?</h3>
            <p>Yes, theoretically. At black hole event horizons, the escape velocity equals or exceeds light speed (c ≈ 299,792 km/s), making escape impossible even for photons.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How does atmosphere affect escape velocity?</h3>
            <p>Atmospheres increase the energy cost to escape due to drag. Rockets must overcome both gravity and air resistance, requiring more than the theoretical escape velocity for initial launch.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is gravitational parameter (μ)?</h3>
            <p>Gravitational parameter μ = GM is a useful combined constant describing a celestial body's gravitational strength. For Earth, μ ≈ 3.986×10¹⁴ m³/s², simplifying orbital and escape velocity calculations.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I calculate escape velocity for custom bodies?</h3>
            <p>Yes. Enter any mass and radius in your preferred units. The calculator converts to SI internally and applies the formula v = √(2GM/r) accurately.</p>
          </div>
        </div>
      </section>
    </CalculatorPageTemplate>
  );
}
