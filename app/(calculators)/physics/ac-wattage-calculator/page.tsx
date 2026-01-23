import type { Metadata } from 'next';
import ACWattageCalculator from '../../../_components/calculators/ACWattageCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'AC Wattage Calculator - Calculate AC Power for Single & Three-Phase',
  description: 'Calculate AC wattage, voltage, current, and power factor for single-phase and three-phase systems. Free AC power calculator with real, apparent, and reactive power.',
  keywords: [
    'AC wattage calculator',
    'calculate AC power',
    'AC power calculator',
    'single phase power calculator',
    'three phase power calculator',
    'power factor calculator',
    'apparent power calculator',
    'reactive power calculator',
    'P = V × I × PF',
    'AC voltage calculator',
    'AC current calculator',
    'electrical power calculator',
    'three phase wattage',
    'single phase wattage',
    'real power calculator',
    'VA to watts',
    'power triangle calculator',
    'AC circuit calculator',
    'industrial power calculator'
  ],
  openGraph: {
    title: 'AC Wattage Calculator - Single & Three-Phase Power',
    description: 'Calculate AC wattage, voltage, current, and power factor for single-phase and three-phase systems.',
    type: 'website',
    url: 'https://getcalculation.com/physics/ac-wattage-calculator',
  },
  alternates: {
    canonical: 'https://getcalculation.com/physics/ac-wattage-calculator',
  },
};

export default function ACWattageCalculatorPage() {
  const features = [
    'Single-phase and three-phase AC power calculations',
    'Calculate power, voltage, current, or power factor',
    'Real power (watts), apparent power (VA), and reactive power (VAR)',
    'Multiple unit support (V, kV, A, mA, W, kW, MW, hp)',
    'Power factor correction calculations',
    'Common AC power application examples',
    'Typical power factor reference values',
    'Professional electrical engineering tool',
    'Instant accurate results'
  ];

  return (
    <CalculatorPageTemplate
      title="AC Wattage Calculator"
      description="Calculate AC wattage, voltage, current, and power factor for single-phase and three-phase electrical systems with our comprehensive AC power calculator."
      calculator={<ACWattageCalculator />}
      features={features}
      slug="physics/ac-wattage-calculator"
      category="Electromagnetism"
    >
      {/* SEO Content */}
      <div className="mt-12 space-y-8 text-gray-700">
        {/* Understanding AC Power Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding AC Power and Wattage</h2>
          <p className="mb-4">
            AC (Alternating Current) power is the electrical power delivered by alternating current systems, where the voltage and current vary sinusoidally with time. Unlike DC power, AC power involves three components: <strong>real power (P)</strong> measured in watts (W), <strong>apparent power (S)</strong> measured in volt-amperes (VA), and <strong>reactive power (Q)</strong> measured in volt-amperes reactive (VAR).
          </p>
          <p className="mb-4">
            The <strong>AC Wattage Calculator</strong> helps you determine the real power consumed by AC electrical equipment by considering the voltage, current, and power factor. Real power represents the actual energy converted to useful work, such as mechanical motion, heat, or light. Understanding AC power is essential for sizing electrical equipment, calculating energy costs, and ensuring efficient power system operation.
          </p>
          <p>
            This calculator supports both <strong>single-phase</strong> systems (common in residential applications) and <strong>three-phase</strong> systems (used in industrial and commercial settings). Three-phase systems provide more efficient power transmission and are standard for heavy machinery and large electrical installations.
          </p>
        </section>

        {/* Formulas Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AC Power Formulas and Calculations</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Single-Phase AC Power</h3>
          <p className="mb-4">
            For single-phase AC systems, the relationship between power, voltage, current, and power factor is:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600 mb-4">
            <p className="font-mono text-lg"><strong>P = V × I × cos(φ)</strong></p>
            <p className="text-sm text-gray-600 mt-2">Where:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
              <li>P = Real power in watts (W)</li>
              <li>V = RMS voltage in volts (V)</li>
              <li>I = RMS current in amperes (A)</li>
              <li>cos(φ) = Power factor (0 to 1)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Three-Phase AC Power</h3>
          <p className="mb-4">
            For balanced three-phase systems, the real power calculation includes an additional factor of √3:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600 mb-4">
            <p className="font-mono text-lg"><strong>P = √3 × V × I × cos(φ)</strong></p>
            <p className="text-sm text-gray-600 mt-2">Where √3 ≈ 1.732 accounts for the three-phase configuration</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Apparent and Reactive Power</h3>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-600 mb-4">
            <p className="font-mono mb-2"><strong>S = V × I</strong> (single-phase) or <strong>S = √3 × V × I</strong> (three-phase)</p>
            <p className="font-mono mb-2"><strong>Q = √(S² - P²)</strong></p>
            <p className="font-mono"><strong>Power Factor = P / S = cos(φ)</strong></p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Solving for Other Variables</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Voltage:</strong> V = P / (I × cos(φ)) for single-phase</li>
            <li><strong>Current:</strong> I = P / (V × cos(φ)) for single-phase</li>
            <li><strong>Power Factor:</strong> cos(φ) = P / (V × I) for single-phase</li>
          </ul>
        </section>

        {/* How to Use Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the AC Wattage Calculator</h2>
          <ol className="list-decimal list-inside space-y-3 ml-4">
            <li>
              <strong>Select Phase Type:</strong> Choose between single-phase (typical for residential, 120V or 240V) or three-phase (industrial/commercial, typically 208V, 240V, 480V, or 600V).
            </li>
            <li>
              <strong>Choose Calculation Mode:</strong> Select what you want to calculate:
              <ul className="list-disc list-inside ml-8 mt-2 space-y-1">
                <li>Power (from voltage, current, and power factor)</li>
                <li>Voltage (from power, current, and power factor)</li>
                <li>Current (from power, voltage, and power factor)</li>
                <li>Power Factor (from power, voltage, and current)</li>
              </ul>
            </li>
            <li>
              <strong>Enter Known Values:</strong> Input the required parameters with appropriate units. The calculator supports various units including V, kV, A, mA, W, kW, MW, and horsepower (hp).
            </li>
            <li>
              <strong>Enter Power Factor:</strong> Input the power factor (typically 0.7 to 1.0 for most equipment). A power factor of 1.0 represents a purely resistive load with no reactive component.
            </li>
            <li>
              <strong>Calculate:</strong> Click the Calculate button to see results including real power, apparent power, and reactive power.
            </li>
          </ol>
        </section>

        {/* Applications Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical Applications of AC Power Calculations</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Electrical System Design</h3>
          <p className="mb-4">
            AC power calculations are fundamental for designing electrical distribution systems. Engineers use these calculations to size conductors, determine circuit breaker ratings, and ensure that electrical equipment operates within safe parameters. Proper power calculations prevent overloading, reduce energy losses, and ensure system reliability.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Motor Sizing and Selection</h3>
          <p className="mb-4">
            Electric motors are the largest consumers of electrical energy in industrial settings. Calculating the required AC power helps in selecting appropriately sized motors and drives. Power factor is particularly important for induction motors, as they typically operate at power factors between 0.7 and 0.9, affecting the total current drawn from the supply.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Energy Cost Analysis</h3>
          <p className="mb-4">
            Utilities often charge commercial and industrial customers based on both real power consumption (kWh) and demand (kW or kVA). Understanding the relationship between real power, apparent power, and power factor allows facilities managers to optimize power usage and reduce electricity costs. Many utilities impose penalties for low power factors below 0.9 or 0.95.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Power Factor Correction</h3>
          <p className="mb-4">
            Low power factor increases current draw for the same real power, leading to higher losses and potentially higher utility charges. Power factor correction using capacitor banks can improve system efficiency. The AC Wattage Calculator helps determine the reactive power that needs to be compensated to achieve the desired power factor.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Applications</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Residential:</strong> Sizing service entrance equipment, calculating appliance power consumption</li>
            <li><strong>Commercial:</strong> HVAC system design, lighting load calculations, backup generator sizing</li>
            <li><strong>Industrial:</strong> Motor control centers, transformer sizing, power distribution planning</li>
            <li><strong>Renewable Energy:</strong> Solar inverter sizing, wind turbine power output analysis</li>
          </ul>
        </section>

        {/* Power Factor Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Power Factor in AC Systems</h2>
          <p className="mb-4">
            <strong>Power factor (PF)</strong> is the ratio of real power to apparent power and represents the efficiency of power utilization in an AC circuit. It ranges from 0 to 1, with 1 being ideal (purely resistive load). The power factor is the cosine of the phase angle (φ) between voltage and current waveforms.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Types of Loads and Their Power Factors</h3>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <ul className="space-y-2">
              <li><strong>Resistive Loads (PF = 1.0):</strong> Incandescent lamps, electric heaters, resistance furnaces</li>
              <li><strong>Inductive Loads (PF = 0.5-0.9):</strong> Motors, transformers, fluorescent lighting, welding equipment</li>
              <li><strong>Capacitive Loads (PF = 0.5-0.9):</strong> Capacitor banks, power factor correction equipment</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Power Factor Matters</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Current Draw:</strong> Low power factor increases current for the same real power, requiring larger conductors and equipment</li>
            <li><strong>Energy Losses:</strong> Higher current results in increased I²R losses in conductors and transformers</li>
            <li><strong>Utility Charges:</strong> Many utilities impose demand charges or penalties for low power factor</li>
            <li><strong>System Capacity:</strong> Poor power factor reduces the available capacity of electrical distribution systems</li>
          </ul>

          <p className="mt-4">
            Most industrial facilities aim for a power factor of 0.95 or higher through power factor correction. This involves installing capacitor banks to offset the reactive power consumed by inductive loads, bringing the power factor closer to unity.
          </p>
        </section>

        {/* Single vs Three-Phase Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Single-Phase vs. Three-Phase Power Systems</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Single-Phase Power</h3>
          <p className="mb-4">
            Single-phase AC power uses two conductors (one phase and one neutral) and is standard in residential applications. In North America, common voltages are 120V and 240V. Single-phase power is suitable for loads up to about 10 kW and is simpler and less expensive to implement than three-phase systems.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Three-Phase Power</h3>
          <p className="mb-4">
            Three-phase power uses three conductors carrying alternating currents that are 120° out of phase with each other. Common voltages include 208V, 240V, 480V, and 600V. Three-phase power provides:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li><strong>Higher Power Capacity:</strong> Can deliver √3 (≈1.732) times more power than single-phase for the same current</li>
            <li><strong>More Efficient Transmission:</strong> Requires less conductor material for the same power delivery</li>
            <li><strong>Smoother Power Delivery:</strong> Constant power transfer rather than pulsating power</li>
            <li><strong>Better Motor Performance:</strong> Three-phase motors are more efficient, have better starting characteristics, and produce constant torque</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">When to Use Each System</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-2"><strong>Use Single-Phase for:</strong></p>
            <ul className="list-disc list-inside ml-4 mb-3">
              <li>Residential applications</li>
              <li>Small commercial buildings</li>
              <li>Loads under 10 kW</li>
              <li>Lighting and small appliances</li>
            </ul>
            <p className="mb-2"><strong>Use Three-Phase for:</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>Industrial facilities</li>
              <li>Large commercial buildings</li>
              <li>Heavy machinery and large motors</li>
              <li>Data centers and server rooms</li>
            </ul>
          </div>
        </section>

        {/* Units and Conversions Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AC Power Units and Conversions</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Voltage Units</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <ul className="space-y-1">
              <li>1 kilovolt (kV) = 1,000 volts (V)</li>
              <li>1 volt (V) = 1,000 millivolts (mV)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Current Units</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <ul className="space-y-1">
              <li>1 kiloampere (kA) = 1,000 amperes (A)</li>
              <li>1 ampere (A) = 1,000 milliamperes (mA)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Power Units</h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <ul className="space-y-1">
              <li>1 megawatt (MW) = 1,000 kilowatts (kW) = 1,000,000 watts (W)</li>
              <li>1 kilowatt (kW) = 1,000 watts (W)</li>
              <li>1 watt (W) = 1,000 milliwatts (mW)</li>
              <li>1 horsepower (hp) = 745.7 watts (W)</li>
              <li>1 kilowatt (kW) ≈ 1.341 horsepower (hp)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Power Types</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Real Power (P):</strong> Measured in watts (W), kilowatts (kW), or megawatts (MW) - actual power consumed</li>
            <li><strong>Apparent Power (S):</strong> Measured in volt-amperes (VA), kilovolt-amperes (kVA), or megavolt-amperes (MVA) - total power supplied</li>
            <li><strong>Reactive Power (Q):</strong> Measured in volt-amperes reactive (VAR), kilovars (kVAR), or megavars (MVAR) - power stored and released by reactive components</li>
          </ul>
        </section>

        {/* Practical Examples Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Practical AC Power Calculation Examples</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Example 1: Residential Air Conditioner (Single-Phase)</h3>
          <div className="bg-purple-50 p-4 rounded-lg mb-4 border-l-4 border-purple-600">
            <p className="mb-2"><strong>Given:</strong></p>
            <ul className="list-disc list-inside ml-4 mb-3">
              <li>Voltage: 240V</li>
              <li>Current: 20A</li>
              <li>Power Factor: 0.85</li>
            </ul>
            <p className="mb-2"><strong>Calculation:</strong></p>
            <p className="font-mono mb-2">P = V × I × PF = 240 × 20 × 0.85 = 4,080 W ≈ 4.08 kW</p>
            <p className="mb-2"><strong>Result:</strong> The air conditioner consumes approximately 4.08 kW of real power.</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Example 2: Industrial Motor (Three-Phase)</h3>
          <div className="bg-purple-50 p-4 rounded-lg mb-4 border-l-4 border-purple-600">
            <p className="mb-2"><strong>Given:</strong></p>
            <ul className="list-disc list-inside ml-4 mb-3">
              <li>Voltage: 480V (line-to-line)</li>
              <li>Current: 100A</li>
              <li>Power Factor: 0.88</li>
            </ul>
            <p className="mb-2"><strong>Calculation:</strong></p>
            <p className="font-mono mb-2">P = √3 × V × I × PF = 1.732 × 480 × 100 × 0.88 = 73,177 W ≈ 73.2 kW</p>
            <p className="mb-2"><strong>Result:</strong> The three-phase motor consumes approximately 73.2 kW of real power, which is about 98 horsepower.</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Example 3: Calculating Required Current</h3>
          <div className="bg-purple-50 p-4 rounded-lg mb-4 border-l-4 border-purple-600">
            <p className="mb-2"><strong>Given:</strong></p>
            <ul className="list-disc list-inside ml-4 mb-3">
              <li>Power Required: 15 kW (15,000 W)</li>
              <li>Voltage: 208V (three-phase)</li>
              <li>Power Factor: 0.9</li>
            </ul>
            <p className="mb-2"><strong>Calculation:</strong></p>
            <p className="font-mono mb-2">I = P / (√3 × V × PF) = 15,000 / (1.732 × 208 × 0.9) = 46.3 A</p>
            <p className="mb-2"><strong>Result:</strong> A circuit breaker rated for at least 50A would be required, with conductors sized appropriately for continuous operation (typically 125% of calculated current).</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Example 4: Power Factor Correction</h3>
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
            <p className="mb-2"><strong>Given:</strong></p>
            <ul className="list-disc list-inside ml-4 mb-3">
              <li>Real Power: 100 kW</li>
              <li>Current Power Factor: 0.7</li>
              <li>Target Power Factor: 0.95</li>
            </ul>
            <p className="mb-2"><strong>Calculation:</strong></p>
            <p className="font-mono mb-2">S₁ = P / PF₁ = 100 / 0.7 = 142.86 kVA (current apparent power)</p>
            <p className="font-mono mb-2">S₂ = P / PF₂ = 100 / 0.95 = 105.26 kVA (target apparent power)</p>
            <p className="font-mono mb-2">Q₁ = √(S₁² - P²) = √(142.86² - 100²) = 102.02 kVAR</p>
            <p className="font-mono mb-2">Q₂ = √(S₂² - P²) = √(105.26² - 100²) = 32.89 kVAR</p>
            <p className="font-mono mb-2">Qc = Q₁ - Q₂ = 102.02 - 32.89 = 69.13 kVAR</p>
            <p className="mb-2"><strong>Result:</strong> A capacitor bank rated for approximately 69 kVAR is needed to improve the power factor from 0.7 to 0.95.</p>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes in AC Power Calculations</h2>
          <ul className="list-disc list-inside space-y-3 ml-4">
            <li>
              <strong>Ignoring Power Factor:</strong> Assuming power factor is 1.0 when it's not results in underestimating current requirements and oversizing equipment. Always verify the actual power factor of the load.
            </li>
            <li>
              <strong>Confusing Line and Phase Voltages:</strong> In three-phase systems, line-to-line voltage is √3 times line-to-neutral voltage. Ensure you're using the correct voltage for your calculations.
            </li>
            <li>
              <strong>Using Wrong Formula for Three-Phase:</strong> Forgetting the √3 factor in three-phase calculations leads to significant errors (about 42% underestimation).
            </li>
            <li>
              <strong>Mixing Real and Apparent Power:</strong> Real power (W) and apparent power (VA) are different quantities. Don't add or compare them directly without considering power factor.
            </li>
            <li>
              <strong>Neglecting Harmonics:</strong> Non-linear loads (variable frequency drives, switch-mode power supplies) can have significant harmonic content, affecting true power factor and requiring special consideration.
            </li>
            <li>
              <strong>Not Accounting for Starting Current:</strong> Motor starting currents can be 5-7 times full-load current. Circuit protection and conductor sizing must account for these transient conditions.
            </li>
          </ul>
        </section>

        {/* Related Calculators Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Electrical Calculators</h2>
          <p className="mb-4">
            Explore our other electrical and physics calculators for comprehensive analysis:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>{createInternalLink('ohms-law-resistance-calculator')} - Calculate voltage, current, and resistance in DC circuits</li>
            <li>{createInternalLink('electrical-power-calculator')} - Calculate electrical power in DC and AC circuits</li>
            <li>{createInternalLink('capacitance-calculator')} - Calculate capacitance for various capacitor configurations</li>
            <li>{createInternalLink('torque-calculator')} - Calculate torque, force, and distance for rotating systems</li>
            <li>{createInternalLink('wavelength-calculator')} - Calculate wavelength, frequency, and wave properties</li>
          </ul>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What is the difference between watts and volt-amperes?</h3>
              <p>
                Watts (W) measure real power, which is the actual power consumed and converted to useful work. Volt-amperes (VA) measure apparent power, which is the product of voltage and current without considering the phase angle. The relationship is: Real Power (W) = Apparent Power (VA) × Power Factor. For purely resistive loads, watts equal volt-amperes, but for inductive or capacitive loads, watts are less than volt-amperes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Why is the power factor important in AC circuits?</h3>
              <p>
                Power factor indicates how efficiently electrical power is being used. A low power factor means more current is required to deliver the same real power, leading to larger conductors, higher losses, increased equipment costs, and potentially higher utility bills. Many utilities charge penalties for power factors below 0.9 or 0.95. Improving power factor through capacitor banks can reduce these costs and improve system efficiency.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I calculate three-phase power if I only know line-to-neutral voltage?</h3>
              <p>
                If you know the line-to-neutral voltage (Vₗₙ), the line-to-line voltage (Vₗₗ) is √3 times greater: Vₗₗ = √3 × Vₗₙ ≈ 1.732 × Vₗₙ. For example, in a 208V three-phase system, the line-to-neutral voltage is 208/1.732 ≈ 120V. Use the appropriate voltage in the three-phase power formula: P = √3 × Vₗₗ × I × PF or P = 3 × Vₗₙ × I × PF (per phase).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What is a typical power factor for electric motors?</h3>
              <p>
                Induction motors typically have power factors ranging from 0.85 to 0.9 at full load, but this drops significantly at partial loads. At no-load or light-load conditions, the power factor can be as low as 0.2 to 0.3. Synchronous motors can be designed to operate at unity power factor (1.0) or even leading power factor, making them useful for power factor correction in industrial facilities.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I use a single-phase formula for three-phase calculations?</h3>
              <p>
                No, you must use the appropriate formula for three-phase systems, which includes the √3 factor: P = √3 × V × I × PF. Using the single-phase formula (P = V × I × PF) for three-phase calculations will result in a significant error of about 42% underestimation. Always verify whether your system is single-phase or three-phase before calculating.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I improve a low power factor in my facility?</h3>
              <p>
                Power factor can be improved by installing capacitor banks to offset the reactive power consumed by inductive loads (motors, transformers). The required capacitor size depends on the existing power factor and the target power factor. Other methods include replacing old motors with high-efficiency models, avoiding operation of motors at light loads, and using synchronous motors or condensers. The AC Wattage Calculator can help determine the reactive power that needs to be compensated.
              </p>
            </div>
          </div>
        </section>
      </div>
    </CalculatorPageTemplate>
  );
}
