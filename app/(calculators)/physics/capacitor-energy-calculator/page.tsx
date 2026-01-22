import CapacitorEnergyCalculator from '../../../_components/calculators/CapacitorEnergyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Capacitor Energy Calculator | Stored Energy & Charge';
const description = 'Calculate energy stored in capacitors from capacitance, voltage, and charge with comprehensive unit support.';
const keywords = [
  'capacitor energy calculator',
  'capacitor stored energy calculator',
  'capacitance energy calculator',
  'capacitor charge calculator',
  'energy stored in capacitor',
  'capacitor joules calculator',
  'capacitor voltage calculator',
  'capacitor energy formula',
  'half cv squared calculator',
  'capacitor discharge energy',
  'capacitor energy storage calculator',
  'electrostatic energy calculator',
  'capacitor watt hour calculator',
  'capacitor charge voltage calculator',
  'capacitance voltage energy',
  'capacitor energy density calculator',
  'capacitor power calculator',
  'energy capacitor calculator',
  'capacitor stored charge calculator',
  'capacitor physics calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/capacitor-energy-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/capacitor-energy-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function CapacitorEnergyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Capacitor Energy Calculator"
      description="Calculate energy stored in capacitors from capacitance, voltage, and charge with comprehensive unit conversions."
      calculator={<CapacitorEnergyCalculator />}
      slug="physics/capacitor-energy-calculator"
      category="Physics"
      features={[
        'Four calculation methods: energy from capacitance and voltage (E=½CV²), energy from charge and voltage (E=½QV), find voltage and charge from energy, find voltage from energy and charge',
        'Unit-flexible inputs for capacitance (F, mF, μF, nF, pF), voltage (V, kV, mV, μV), charge (C, mC, μC, nC, pC), energy (J, mJ, μJ, Wh)',
        'Calculates stored energy, charge, voltage, and capacitance relationships',
        'Energy conversion to Joules, millijoules, microjoules, and watt-hours',
        'Verification calculations using alternative formulas for accuracy',
        'Time constant calculation for RC circuits',
        'Essential for electronics design, power systems, energy storage analysis, and capacitor selection'
      ]}
    >
      <SEOSection title="Understanding Capacitor Energy Storage">
        <p>
          The Capacitor Energy Calculator computes energy stored in electrostatic fields within capacitors. Capacitors store electrical energy by accumulating opposite charges on two conductive plates separated by a dielectric material. The energy stored (E = ½CV²) depends on capacitance and voltage squared, making voltage the dominant factor. The calculator supports four methods: energy from capacitance and voltage, energy from charge and voltage (E = ½QV), finding voltage and charge from energy, and determining voltage from energy and charge. Essential for electronics design, power supply filtering, energy storage systems, flash photography, defibrillators, and capacitor bank applications. Provides conversions between Joules, watt-hours, and various capacitance/voltage units.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Capacitor Energy Calculator">
        <SEOList
          items={[
            'Select calculation method: energy from C and V, energy from Q and V, find V and Q from E, or find V from E and Q.',
            'For energy from capacitance and voltage: enter capacitance value and voltage across capacitor.',
            'For energy from charge and voltage: enter stored charge and voltage to calculate energy.',
            'For finding voltage and charge: enter energy and capacitance to determine required voltage and charge.',
            'For finding voltage from energy and charge: enter energy and charge to calculate voltage and capacitance.',
            'Choose appropriate units for capacitance (μF, nF, pF), voltage (V, kV, mV), charge (C, μC, nC), energy (J, mJ, μJ, Wh).',
            'Click Calculate to get energy values, charge, voltage, and verification calculations.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Capacitor Energy Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">E = ½CV²</p>
            <p className="text-sm text-gray-600">Energy stored (E in Joules, C in Farads, V in Volts)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">E = ½QV</p>
            <p className="text-sm text-gray-600">Energy from charge and voltage (Q in Coulombs)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">E = Q²/(2C)</p>
            <p className="text-sm text-gray-600">Energy from charge and capacitance</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">Q = CV</p>
            <p className="text-sm text-gray-600">Charge stored in capacitor</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">V = √(2E/C)</p>
            <p className="text-sm text-gray-600">Voltage from energy and capacitance</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Common Capacitor Values and Applications">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Capacitance</th>
                <th className="px-4 py-2 border">Voltage</th>
                <th className="px-4 py-2 border">Energy Stored</th>
                <th className="px-4 py-2 border">Application</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2 border">100 μF</td><td className="px-4 py-2 border">12 V</td><td className="px-4 py-2 border">7.2 mJ</td><td className="px-4 py-2 border">Power supply filtering</td></tr>
              <tr><td className="px-4 py-2 border">1000 μF</td><td className="px-4 py-2 border">50 V</td><td className="px-4 py-2 border">1.25 J</td><td className="px-4 py-2 border">Motor start capacitor</td></tr>
              <tr><td className="px-4 py-2 border">10 μF</td><td className="px-4 py-2 border">400 V</td><td className="px-4 py-2 border">0.8 J</td><td className="px-4 py-2 border">Camera flash</td></tr>
              <tr><td className="px-4 py-2 border">100 pF</td><td className="px-4 py-2 border">5 V</td><td className="px-4 py-2 border">1.25 nJ</td><td className="px-4 py-2 border">RF tuning circuit</td></tr>
              <tr><td className="px-4 py-2 border">2200 μF</td><td className="px-4 py-2 border">25 V</td><td className="px-4 py-2 border">0.688 J</td><td className="px-4 py-2 border">Audio amplifier</td></tr>
            </tbody>
          </table>
        </div>
      </SEOSection>

      <SEOSection title="Applications of Capacitor Energy Calculator">
        <SEOList
          items={[
            'Power supply design: smoothing capacitors, voltage regulation, ripple filtering',
            'Energy storage systems: supercapacitors, backup power, regenerative braking',
            'Flash photography: energy storage for xenon flash tubes, camera strobes',
            'Medical devices: defibrillators, pacemakers, cardiac pulse generators',
            'Motor control: start capacitors, run capacitors, phase shift networks',
            'Audio equipment: crossover networks, coupling capacitors, power supply filtering',
            'Electronics design: timing circuits, oscillators, voltage multipliers',
            'Electromagnetic pulse protection: surge suppressors, transient voltage protection'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Power supply filter:</strong> 100 μF capacitor at 12 V → E = 7.2 mJ, Q = 1.2 mC</li>
          <li><strong>Camera flash:</strong> 10 μF at 400 V → E = 0.8 J (enough for bright flash)</li>
          <li><strong>Supercapacitor:</strong> 1 F at 2.7 V → E = 3.645 J, Q = 2.7 C</li>
          <li><strong>Find voltage:</strong> Energy 1 J, capacitance 100 μF → V = 141.4 V required</li>
          <li><strong>Motor start:</strong> 1000 μF at 50 V → E = 1.25 J for motor starting torque</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'Why is energy proportional to voltage squared?',
              answer: 'Energy in capacitors is proportional to V² because charge Q = CV is proportional to voltage, and energy E = ½QV depends on both charge and voltage. When voltage doubles, charge doubles, making energy quadruple (2² = 4). This squared relationship means high-voltage capacitors store much more energy than low-voltage capacitors of the same capacitance.'
            },
            {
              question: 'What is the difference between capacitance and energy storage?',
              answer: 'Capacitance (Farads) is the ability to store charge per volt, while energy (Joules) is the actual stored electrical energy. A capacitor with high capacitance can store more charge at a given voltage, resulting in more energy. Energy depends on both capacitance and voltage: E = ½CV². Capacitance is a fixed property; energy varies with applied voltage.'
            },
            {
              question: 'How long can a capacitor hold its charge?',
              answer: 'Ideal capacitors would hold charge indefinitely, but real capacitors slowly lose charge through leakage resistance. High-quality film capacitors can hold charge for days or weeks. Electrolytic capacitors leak more quickly (hours to days). Discharge time depends on capacitance, voltage, and leakage resistance. Always discharge capacitors before handling for safety.'
            },
            {
              question: 'What are supercapacitors and how much energy do they store?',
              answer: 'Supercapacitors (ultracapacitors) have capacitances ranging from 1 F to thousands of Farads, far exceeding traditional capacitors. A 3000 F supercapacitor at 2.7 V stores about 10.9 kJ (3 Wh). They bridge the gap between batteries and capacitors, offering high power density, fast charging, and millions of charge cycles. Used in regenerative braking, backup power, and energy harvesting.'
            },
            {
              question: 'Why is the energy formula E = ½CV² and not CV²?',
              answer: 'The factor ½ comes from the fact that voltage increases linearly as charge accumulates. Average voltage during charging is V/2, so work done (energy) is (V/2)×Q = ½QV = ½CV². This can be proven by integrating the instantaneous power as the capacitor charges from 0 to V. The ½ factor is fundamental to energy storage in capacitors.'
            },
            {
              question: 'How do I safely discharge a high-voltage capacitor?',
              answer: 'Never short circuit a charged capacitor directly. Use a high-wattage resistor (bleeder resistor) to slowly discharge. Calculate discharge time using τ = RC (time constant). For example, 1000 μF at 400 V with 1kΩ resistor discharges in about 5 seconds (5τ ≈ complete discharge). Always use insulated tools and verify discharge with a voltmeter before handling.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
