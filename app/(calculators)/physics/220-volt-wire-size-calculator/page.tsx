import WireSize220VoltCalculator from '../../../_components/calculators/WireSize220VoltCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import type { Metadata } from 'next';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: '220 Volt Wire Size Calculator - AC Power Sizing for Residential & Commercial',
  description: 'Calculate wire gauge for 220V AC electrical systems. Single-phase and three-phase support with copper/aluminum conductor sizing.',
  keywords: [
    '220 volt wire size calculator',
    '220V wire gauge calculator',
    '220V electrical wire sizing',
    'AC wire size 220 volts',
    'residential 220V wire calculator',
    'commercial 220V wire gauge',
    'single phase 220V wire size',
    'three phase 220V wire gauge',
    'copper aluminum wire 220V',
    '220V AWG calculator',
    'electrical wire sizing 220V',
    '220V voltage drop calculator',
    'amperage wire size 220V',
    'circuit breaker wire size 220V',
    '220V current capacity calculator',
    'electrical safety wire sizing',
    'home electrical wiring 220V',
    'industrial power 220V cable',
    '220V conductor sizing',
    '220V electrical system calculator'
  ],
  openGraph: {
    title: '220 Volt Wire Size Calculator',
    description: 'Calculate wire gauge for 220V AC electrical systems. Single-phase and three-phase support with copper/aluminum conductor sizing.',
    type: 'website',
    url: 'https://getcalculation.com/physics/220-volt-wire-size-calculator'
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics/220-volt-wire-size-calculator'
  }
};

export default function Page() {
  const features = [
    'Single-phase and three-phase AC system support',
    'Copper and aluminum conductor material selection',
    'Current, wire gauge, and voltage drop calculation modes',
    'Common load templates for quick input',
    'Voltage drop percentage calculation',
    'AWG wire gauge conversion'
  ];

  return (
    <CalculatorPageTemplate
      title="220 Volt Wire Size Calculator"
      description="Calculate wire gauge for 220V AC electrical systems. Essential for residential, commercial, and industrial electrical safety and code compliance."
      calculator={<WireSize220VoltCalculator />}
      slug="220-volt-wire-size-calculator"
      category="Electromagnetism"
      features={features}
    >
      <div className="prose prose-lg max-w-4xl mx-auto">
        {/* Formula Section */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Wire Sizing Formulas for 220V AC</h2>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Single-Phase 220V (2-Wire)</h3>
            <p className="text-gray-700 mb-3 font-mono bg-white p-3 rounded border border-blue-200">
              Required Area (mm²) = (ρ × L × 2) / (V_drop / I)
            </p>
            <ul className="text-sm text-gray-700 space-y-2 ml-4">
              <li>• ρ (rho) = Resistivity: Copper = 1.68×10⁻⁸ Ω·m, Aluminum = 2.65×10⁻⁸ Ω·m</li>
              <li>• L = Length of conductor run in meters</li>
              <li>• 2 = Round-trip (out and back for single-phase)</li>
              <li>• V_drop = Voltage drop in volts (recommended: 2-5V for 220V)</li>
              <li>• I = Current in amperes</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Three-Phase 220V (3-Wire)</h3>
            <p className="text-gray-700 mb-3 font-mono bg-white p-3 rounded border border-green-200">
              Required Area (mm²) = (ρ × L × 3) / (V_drop / I)
            </p>
            <ul className="text-sm text-gray-700 space-y-2 ml-4">
              <li>• Uses three conductors instead of two</li>
              <li>• More efficient than single-phase for industrial applications</li>
              <li>• Reduces voltage drop for same current capacity</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Voltage Drop Percentage</h3>
            <p className="text-gray-700 mb-3 font-mono bg-white p-3 rounded border border-purple-200">
              % Drop = (Voltage Drop / Supply Voltage) × 100
            </p>
            <ul className="text-sm text-gray-700 space-y-2 ml-4">
              <li>• 5V drop on 220V = 2.27% (acceptable for branch circuits)</li>
              <li>• Maximum recommended: 3% main feeder, 5% branch circuit</li>
              <li>• Higher drops reduce efficiency and equipment lifespan</li>
            </ul>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Key Concepts for 220V Wire Sizing</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">🏠 Single-Phase Systems</h4>
              <p className="text-gray-700 text-sm">Standard in residential homes outside North America. Uses two hot wires (220V across them) plus ground. Example: Electric range, water heater, air conditioning units.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">🏭 Three-Phase Systems</h4>
              <p className="text-gray-700 text-sm">Common in industrial and commercial settings. Three hot wires provide more balanced power delivery. Example: Industrial motors, factory equipment, large commercial HVAC.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">🔌 Voltage Drop</h4>
              <p className="text-gray-700 text-sm">Power loss in conductors due to resistance. Too much drop causes equipment to operate inefficiently (motors slow down, lights dim). Use larger wire to reduce drop.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">⚛️ Resistivity</h4>
              <p className="text-gray-700 text-sm">Copper has lower resistivity than aluminum, meaning less voltage drop and heat generation. Trade-off: aluminum is cheaper but requires larger gauge.</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2">📊 AWG (American Wire Gauge)</h4>
              <p className="text-gray-700 text-sm">Standard wire sizing system. Lower AWG numbers = thicker wire, higher current capacity. Example: 12 AWG for 20A circuits, 6 AWG for 50A circuits at 220V.</p>
            </div>
          </div>
        </section>

        {/* Practical Examples */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">220V Wire Sizing Examples</h2>
          
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-300 p-3 text-left">Application</th>
                <th className="border border-gray-300 p-3 text-center">Current (A)</th>
                <th className="border border-gray-300 p-3 text-center">Length (m)</th>
                <th className="border border-gray-300 p-3 text-center">Recommended Wire</th>
                <th className="border border-gray-300 p-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">Electric Water Heater (3 kW)</td>
                <td className="border border-gray-300 p-3 text-center">13-15 A</td>
                <td className="border border-gray-300 p-3 text-center">20-30 m</td>
                <td className="border border-gray-300 p-3 text-center font-bold">10 AWG</td>
                <td className="border border-gray-300 p-3">Residential, single-phase</td>
              </tr>
              <tr className="hover:bg-gray-100 bg-gray-50">
                <td className="border border-gray-300 p-3">Air Conditioner (5 HP)</td>
                <td className="border border-gray-300 p-3 text-center">20-25 A</td>
                <td className="border border-gray-300 p-3 text-center">15-25 m</td>
                <td className="border border-gray-300 p-3 text-center font-bold">8 AWG</td>
                <td className="border border-gray-300 p-3">Single-phase, high current</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">Industrial Motor (10 HP)</td>
                <td className="border border-gray-300 p-3 text-center">40-50 A</td>
                <td className="border border-gray-300 p-3 text-center">30-50 m</td>
                <td className="border border-gray-300 p-3 text-center font-bold">4 AWG</td>
                <td className="border border-gray-300 p-3">Three-phase recommended</td>
              </tr>
              <tr className="hover:bg-gray-100 bg-gray-50">
                <td className="border border-gray-300 p-3">Welding Machine (7 kW)</td>
                <td className="border border-gray-300 p-3 text-center">30-32 A</td>
                <td className="border border-gray-300 p-3 text-center">10-20 m</td>
                <td className="border border-gray-300 p-3 text-center font-bold">6 AWG</td>
                <td className="border border-gray-300 p-3">Heavy-duty equipment</td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">Branch Circuit (Outlets)</td>
                <td className="border border-gray-300 p-3 text-center">20 A</td>
                <td className="border border-gray-300 p-3 text-center">30-50 m</td>
                <td className="border border-gray-300 p-3 text-center font-bold">12 AWG</td>
                <td className="border border-gray-300 p-3">Standard residential</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
            <p className="text-sm text-gray-700"><strong>Note:</strong> Always consult local electrical codes (NEC, IEC, AS/NZS) and use certified electricians for actual installation. These examples assume copper conductors and 3-5% voltage drop tolerance.</p>
          </div>
        </section>

        {/* Related Calculations */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Related 220V Electrical Calculations</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• {createInternalLink('ohms-law-resistance-calculator', 'Ohm\'s Law Calculator')} - Calculate voltage, current, resistance relationships</li>
            <li>• {createInternalLink('watts-to-amps-calculator', 'Watts to Amps Calculator')} - Convert power to current at 220V</li>
            <li>• {createInternalLink('parallel-resistor-calculator', 'Parallel Resistor Calculator')} - Calculate combined resistance</li>
            <li>• {createInternalLink('watt-calculator', 'Watt Calculator')} - Calculate electrical power and efficiency</li>
            <li>• {createInternalLink('force-calculator', 'Force Calculator')} - Fundamental physics for electrical systems</li>
          </ul>
        </section>

        {/* FAQ */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <details className="bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
              <summary className="font-bold text-gray-800">What's the difference between single-phase and three-phase 220V?</summary>
              <p className="text-gray-700 text-sm mt-2">Single-phase uses two hot wires (simpler, cheaper) and is common in homes. Three-phase uses three hot wires, provides better power balance, and is standard in industrial settings. Three-phase can use smaller gauge wire for same current.</p>
            </details>

            <details className="bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
              <summary className="font-bold text-gray-800">Why should I use larger wire than the minimum required?</summary>
              <p className="text-gray-700 text-sm mt-2">Larger wire reduces voltage drop, heat generation, and energy loss. It improves equipment performance (motors run faster, heaters work better) and safety. Oversizing by 1-2 AWG is common practice.</p>
            </details>

            <details className="bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
              <summary className="font-bold text-gray-800">Can I use aluminum wire instead of copper?</summary>
              <p className="text-gray-700 text-sm mt-2">Yes, aluminum is allowed by code but requires larger gauge (about 2 sizes up from copper) due to higher resistivity. It's cheaper but generates more heat, requires special connections, and may not be suitable for 220V high-current applications.</p>
            </details>

            <details className="bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
              <summary className="font-bold text-gray-800">What voltage drop percentage is acceptable?</summary>
              <p className="text-gray-700 text-sm mt-2">NEC and IEC recommend: 3% voltage drop for main feeders, 5% for branch circuits (combined 8% maximum). Higher drops cause inefficiency, equipment overheating, and performance issues. Use 2-3% for critical loads.</p>
            </details>

            <details className="bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
              <summary className="font-bold text-gray-800">How do I know what circuit breaker size to pair with wire?</summary>
              <p className="text-gray-700 text-sm mt-2">Wire ampacity should match breaker rating. Example: 12 AWG copper (20A capacity) pairs with 20A breaker, 10 AWG copper (30A) with 30A breaker. Always follow local electrical code requirements for exact sizing.</p>
            </details>

            <details className="bg-gray-50 p-4 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100">
              <summary className="font-bold text-gray-800">Is 220V the same everywhere?</summary>
              <p className="text-gray-700 text-sm mt-2">No. North America uses 240V, most of Europe/Asia/Australia use 220-230V. Always verify your local standard. Formula principles remain the same, but voltage reference changes slightly.</p>
            </details>
          </div>
        </section>

        {/* Safety Note */}
        <section className="bg-red-50 border-l-4 border-red-500 p-6 rounded mb-8">
          <h3 className="text-lg font-bold text-red-800 mb-2">⚠️ Safety Disclaimer</h3>
          <p className="text-sm text-gray-700">This calculator is for reference only. 220V electrical work is dangerous and should only be performed by licensed electricians. Always:</p>
          <ul className="text-sm text-gray-700 space-y-1 mt-2 ml-4">
            <li>• Follow local electrical codes (NEC, IEC, AS/NZS, etc.)</li>
            <li>• Obtain proper permits and inspections</li>
            <li>• Turn off power before any work</li>
            <li>• Use proper safety equipment and tools</li>
            <li>• Consult a qualified electrician for any installation</li>
          </ul>
        </section>
      </div>
    </CalculatorPageTemplate>
  );
}
