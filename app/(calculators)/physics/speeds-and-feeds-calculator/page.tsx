import SpeedsAndFeedsCalculator from '../../../_components/calculators/SpeedsAndFeedsCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import type { Metadata } from 'next';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Speeds and Feeds Calculator - RPM, Feed Rate, Chip Load',
  description: 'Calculate machining spindle speed, feed rate, chip load from diameter and cutting speed.',
  keywords: [
    'Speeds and Feeds Calculator',
    'machining speeds calculator',
    'feeds and speeds RPM',
    'chip load calculator',
    'feed rate calculator',
    'cutting speed calculator',
    'SFM to RPM calculator',
    'mm/min feed rate',
    'CNC machining calculator',
    'end mill RPM calculator',
    'drilling speeds and feeds',
    'milling speeds calculator',
    'turning speeds and feeds',
    'machining formulas RPM feed',
    'metal cutting speed calculator',
    'CNC chip load calculator',
    'metric and imperial speeds',
    'tool diameter RPM calculator'
  ],
  openGraph: {
    title: 'Speeds and Feeds Calculator - RPM, Feed Rate, Chip Load',
    description: 'Compute RPM, feed rate, chip load and cutting speed for machining operations (metric & imperial).',
    type: 'website',
    url: 'https://getcalculation.com/physics/speeds-and-feeds-calculator',
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics/speeds-and-feeds-calculator',
  },
};

export default function SpeedsAndFeedsPage() {
  return (
    <CalculatorPageTemplate
      title="Speeds and Feeds Calculator"
      description="Calculate machining spindle speed, feed rate, chip load and cutting speed with unit support."
      calculator={<SpeedsAndFeedsCalculator />}
      slug="physics/speeds-and-feeds-calculator"
      category="Mechanics"
      features={[
        'Compute RPM from cutting speed and diameter',
        'Feed rate from RPM, flutes and chip load',
        'Chip load from feed rate and RPM',
        'Cutting speed from RPM and diameter',
        'Metric and imperial units (SFM, m/min, mm/min, in/min)',
        '#820ECC themed UI',
        'Reference tables for materials',
        'Accurate formulas for machining',
      ]}
    >
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Machining Speeds and Feeds Basics</h2>
        <p className="mb-4">
          Correct speeds and feeds are essential for efficient machining and tool life. This calculator provides core machining formulas for <strong>RPM</strong>, <strong>feed rate</strong>, <strong>chip load</strong>, and <strong>cutting speed</strong> with both metric and imperial units.
        </p>
        <p>
          Use it for milling, drilling, and turning to quickly determine optimal parameters. You can compute any of the core variables given the others.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Formulas Used</h2>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600 mb-4">
          <p className="font-mono mb-1"><strong>RPM = (60 × V) / (π × D)</strong></p>
          <p className="font-mono mb-1"><strong>Feed Rate F = RPM × flutes × chip load</strong></p>
          <p className="font-mono mb-1"><strong>Chip Load f = F / (RPM × flutes)</strong></p>
          <p className="font-mono"><strong>Cutting Speed V = (π × D × RPM) / 60</strong></p>
        </div>
        <p className="text-sm text-gray-600">Metric base units are used internally; SFM is converted to m/min.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use</h2>
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li>Select what you want to calculate (RPM, Feed, Chip Load, Cutting Speed).</li>
          <li>Enter known values with appropriate units.</li>
          <li>Provide the number of flutes (teeth) on the tool.</li>
          <li>Click Calculate to see the result and formatted values.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applications</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Milling with end mills and slot cutters</li>
          <li>Drilling with twist drills and carbide drills</li>
          <li>Turning on lathes with single-point tools</li>
          <li>Troubleshooting tool wear and surface finish</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Calculators</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>{createInternalLink('torque-calculator')} - Calculate torque, force, and distance for rotating systems</li>
          <li>{createInternalLink('mechanical-advantage-calculator')} - Compute mechanical advantage for simple machines</li>
          <li>{createInternalLink('gear-ratio-calculator')} - Determine gear ratios and speed relationships</li>
          <li>{createInternalLink('watt-calculator')} - Electrical power relationships for motors</li>
          <li>{createInternalLink('velocity-calculator')} - Kinematics velocity calculations</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">What is chip load?</h3>
            <p>Chip load is the thickness of material removed by each tooth per revolution. It depends on tool diameter, material, and machine rigidity.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Should I use SFM or m/min?</h3>
            <p>Either is fine. SFM (surface feet per minute) is common in imperial; m/min is the metric equivalent. This calculator supports both.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">How do flutes affect feed rate?</h3>
            <p>Feed rate increases with more flutes because more teeth engage per revolution. F = RPM × flutes × chip load.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I use this for drilling?</h3>
            <p>Yes. Input the drill diameter, choose appropriate chip load, and use recommended cutting speeds for the material.</p>
          </div>
        </div>
      </section>
    </CalculatorPageTemplate>
  );
}
