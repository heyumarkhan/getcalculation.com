import { Metadata } from 'next';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import ArcLengthCalculator from '../../../_components/calculators/ArcLengthCalculator';

export const metadata: Metadata = {
  title: 'Arc Length Calculator - Free Online Math Calculator',
  description: 'Calculate the length of an arc using radius and central angle. Free online arc length calculator with step-by-step solutions and explanations.',
  keywords: ['arc length calculator', 'circle calculator', 'geometry calculator', 'radius calculator', 'central angle', 'arc formula', 'sector area', 'chord length'],
  openGraph: {
    title: 'Arc Length Calculator - Free Online Math Calculator',
    description: 'Calculate the length of an arc using radius and central angle. Free online arc length calculator with step-by-step solutions and explanations.',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GetCalculation - Free Online Math Calculators',
      },
    ],
  },
};

export default function ArcLengthPage() {
  return (
    <CalculatorPageTemplate
      title="Arc Length Calculator"
      description="Calculate the length of an arc using radius and central angle with step-by-step solutions and explanations."
      calculator={<ArcLengthCalculator />}
      slug="math/arc-length"
      category="Geometry"
      features={[
        "Calculate arc length from radius and central angle",
        "Step-by-step solutions with explanations",
        "Additional properties: sector area and chord length",
        "Support for angles in degrees",
        "Visual explanations for special cases",
        "Mobile-friendly interface"
      ]}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What is Arc Length?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Arc length is the distance along the curved line of a circle between two points. It&apos;s a fundamental concept in geometry and trigonometry, used in various applications from engineering to computer graphics.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            The arc length formula is: <strong>s = r × θ</strong>, where:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-4 space-y-2">
            <li><strong>s</strong> = arc length</li>
            <li><strong>r</strong> = radius of the circle</li>
            <li><strong>θ</strong> = central angle in radians</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use the Arc Length Calculator</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Step 1: Enter the Radius</h3>
              <p className="text-blue-800">Input the radius of the circle. The radius is the distance from the center to any point on the circle&apos;s edge.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-2">Step 2: Enter the Central Angle</h3>
              <p className="text-green-800">Input the central angle in degrees. This is the angle formed by two radii extending from the center to the endpoints of the arc.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Step 3: Get Your Results</h3>
              <p className="text-purple-800">The calculator will provide the arc length, sector area, chord length, and step-by-step calculations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Arc Length Formula and Examples</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Formula</h3>
            <div className="bg-white p-4 rounded border mb-4">
              <p className="text-lg font-mono">s = r × θ</p>
            </div>
            <p className="text-gray-700 mb-4">Where θ must be in radians. To convert from degrees to radians:</p>
            <div className="bg-white p-4 rounded border mb-4">
              <p className="text-lg font-mono">θ (radians) = θ (degrees) × (π/180)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Complete Circle (360°)</h3>
              <p className="text-blue-800">Arc length = 2πr (circumference)</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Semicircle (180°)</h3>
              <p className="text-green-800">Arc length = πr (half circumference)</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Quarter Circle (90°)</h3>
              <p className="text-purple-800">Arc length = πr/2 (quarter circumference)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Applications of Arc Length</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Engineering</h3>
                <p className="text-gray-700">Calculating curved structures, bridges, and mechanical components.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Computer Graphics</h3>
                <p className="text-gray-700">Creating smooth curves and animations in digital graphics.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Navigation</h3>
                <p className="text-gray-700">Calculating distances along curved paths and GPS coordinates.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Architecture</h3>
                <p className="text-gray-700">Designing curved elements in buildings and structures.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sector Area</h3>
              <p className="text-gray-700">The area of the pie-shaped region enclosed by the arc and two radii.</p>
              <p className="text-sm text-gray-600 mt-2">Formula: A = (1/2) × r² × θ</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chord Length</h3>
              <p className="text-gray-700">The straight-line distance between the two endpoints of the arc.</p>
              <p className="text-sm text-gray-600 mt-2">Formula: c = 2r × sin(θ/2)</p>
            </div>
          </div>
        </section>
      </div>
    </CalculatorPageTemplate>
  );
}
