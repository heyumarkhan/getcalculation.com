import TwelveVoltWireSizeCalculator from '../../../_components/calculators/TwelveVoltWireSizeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function TwelveVoltWireSizeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="12 Volt Wire Size Calculator - AWG for DC Systems"
      description="Calculate the correct wire gauge for 12V DC applications based on current and length."
      calculator={<TwelveVoltWireSizeCalculator />}
      slug="physics/12-volt-wire-size-calculator"
      category="Electromagnetism"
      features={[
        'Calculates recommended AWG wire size for 12V DC systems',
        'Accounts for voltage drop and wire resistance',
        'Presets for LED strips, winches, inverters, solar panels',
        'Supports feet or meters for wire length',
        'Adjustable voltage drop percentage (2%, 3%, 5%, 10%)',
        'Shows power loss and voltage at load',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is a 12 Volt Wire Size Calculator?">
        <p>
          A 12 Volt Wire Size Calculator determines the appropriate American Wire Gauge (AWG) for DC electrical systems operating at 12 volts, such as automotive, marine, RV, solar, and off-grid applications. Choosing the correct wire size prevents excessive voltage drop, overheating, and equipment damage while ensuring efficient power delivery from battery to load.
        </p>
        <p className="mt-4">
          Unlike household 120V AC systems where small voltage drops are tolerable, 12V DC systems are highly sensitive to resistance losses. A 1-volt drop represents 8.3% loss at 12V compared to only 0.8% at 120V. This calculator helps electricians, DIY enthusiasts, vehicle modifiers, and solar installers select wire gauges that maintain safe, efficient operation under real-world conditions.
        </p>
      </SEOSection>

      <SEOSection title="12 Volt Wire Size Formula">
        <SEOFormula
          formula="V_drop = I × R"
          description="Voltage drop equals current (amperes) times total wire resistance (ohms)."
        />
        <SEOFormula
          formula="R = ρ × (2L) / A"
          description="Resistance equals resistivity times round-trip length divided by wire cross-sectional area."
        />
        <SEOFormula
          formula="V_drop% = (V_drop / 12V) × 100"
          description="Voltage drop percentage relative to nominal 12V system voltage."
        />
        <p className="mt-4 text-gray-700">
          Where: I = current draw (A), R = total wire resistance (Ω), L = one-way wire length, A = wire cross-section area, ρ = copper resistivity (1.68 × 10⁻⁸ Ω·m).
        </p>
      </SEOSection>

      <SEOSection title="How to Use the 12 Volt Wire Size Calculator">
        <SEOList
          ordered
          items={[
            '<strong>Select a preset</strong> (LED strip, winch, inverter, solar) or enter custom values.',
            '<strong>Enter current draw</strong> in amperes (check device specifications or measure actual consumption).',
            '<strong>Enter one-way wire length</strong> from battery to load in feet or meters.',
            '<strong>Choose maximum voltage drop</strong>: 2% (critical), 3% (standard), 5% (max), or 10% (very short runs).',
            '<strong>Click Calculate</strong> to get recommended AWG size, voltage drop, resistance, and power loss.',
            '<strong>Review results</strong> and consider upsizing for safety margin or future expansion.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Understanding Voltage Drop in 12V Systems">
        <p className="mb-4">
          Why voltage drop matters critically at 12 volts:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Percentage impact:</strong> 1V drop at 12V = 8.3% loss; same 1V at 120V = 0.8% (10× difference).</li>
          <li><strong>Device sensitivity:</strong> Electronics, LED lights, and inverters underperform or fail below ~11V.</li>
          <li><strong>Battery stress:</strong> Excessive drop forces batteries to supply higher current, reducing lifespan.</li>
          <li><strong>Heat generation:</strong> Undersized wire dissipates power as heat (P = I²R), risking fire or insulation damage.</li>
          <li><strong>Efficiency loss:</strong> Energy wasted in wires reduces available power at load (e.g., dimmer lights, slower motors).</li>
          <li><strong>Recommended limits:</strong> 3% max for general use, 2% for sensitive electronics, 5% absolute maximum for non-critical loads.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Wire Size Chart for 12V DC Systems">
        <p className="mb-4">
          Recommended AWG for common 12V applications (copper wire, 3% voltage drop):
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>5A load (LED strip, radio):</strong> AWG 18 up to 15 ft, AWG 16 up to 25 ft, AWG 14 up to 40 ft</li>
          <li><strong>10A load (CB radio, bilge pump):</strong> AWG 16 up to 10 ft, AWG 14 up to 15 ft, AWG 12 up to 25 ft</li>
          <li><strong>20A load (cooler, fan):</strong> AWG 12 up to 10 ft, AWG 10 up to 15 ft, AWG 8 up to 25 ft</li>
          <li><strong>30A load (solar charge controller):</strong> AWG 10 up to 8 ft, AWG 8 up to 12 ft, AWG 6 up to 20 ft</li>
          <li><strong>50A load (inverter):</strong> AWG 6 up to 7 ft, AWG 4 up to 10 ft, AWG 2 up to 15 ft</li>
          <li><strong>100A load (large inverter):</strong> AWG 2 up to 5 ft, AWG 1/0 up to 10 ft, AWG 2/0 up to 15 ft</li>
          <li><strong>200A+ load (winch, starter):</strong> AWG 1/0 or larger, keep runs under 10 ft when possible</li>
        </ul>
        <p className="mt-4 text-gray-700">
          Note: Values assume copper wire at 20°C. For aluminum wire, increase 2 AWG sizes. For high-temperature environments (engine compartments), increase 1 size.
        </p>
      </SEOSection>

      <SEOSection title="Common 12V DC Applications">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Automotive:</strong> Auxiliary lights, stereo amplifiers, dash cameras, phone chargers, heated seats.</li>
          <li><strong>Marine:</strong> Navigation lights, bilge pumps, fish finders, trolling motors, cabin lighting.</li>
          <li><strong>RV/Camper:</strong> Interior lighting, water pumps, fans, refrigerators, slide-out motors.</li>
          <li><strong>Solar power:</strong> Panel-to-controller wiring, controller-to-battery, battery-to-inverter connections.</li>
          <li><strong>Off-grid:</strong> Battery banks, DC appliances, LED lighting systems, communication equipment.</li>
          <li><strong>Winches:</strong> High-current applications requiring AWG 4 or larger for 10-15 ft runs.</li>
          <li><strong>Inverters:</strong> 300W-3000W units drawing 25A-250A continuous, needing AWG 10 to 2/0 wire.</li>
          <li><strong>Trailer wiring:</strong> Brake lights, turn signals, electric brakes (though typically 7-way connectors).</li>
        </ul>
      </SEOSection>

      <SEOSection title="Wire Sizing Best Practices">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Round-trip length:</strong> Always double one-way distance (positive AND negative wire contribute resistance).</li>
          <li><strong>Upsize for safety:</strong> Go one AWG larger than calculated for thermal margin and future load increases.</li>
          <li><strong>Use stranded wire:</strong> More flexible than solid, better for vibration environments (vehicles, boats).</li>
          <li><strong>Proper terminations:</strong> Crimp lugs rated for wire gauge and current; solder + heat shrink for corrosion resistance.</li>
          <li><strong>Fusing:</strong> Install fuse/breaker within 18" of battery rated for wire ampacity (not load current).</li>
          <li><strong>Wire ampacity:</strong> AWG 12 = 20A, AWG 10 = 30A, AWG 8 = 40A, AWG 6 = 55A, AWG 4 = 70A (chassis wiring).</li>
          <li><strong>Temperature derating:</strong> Bundled wires or high ambient temps reduce ampacity by 10-30%.</li>
          <li><strong>Color coding:</strong> Red = positive (+), black = negative (-), yellow = switched positive (common convention).</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example: 12V LED Light Bar">
        <p className="mb-4"><strong>Scenario:</strong> Installing a 150W LED light bar 20 feet from battery in a truck.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Calculate current: I = P / V = 150W / 12V = 12.5A</li>
          <li>Round-trip length: 20 ft × 2 = 40 ft total wire</li>
          <li>Target voltage drop: 3% of 12V = 0.36V max</li>
          <li>Calculate max resistance: R = V_drop / I = 0.36V / 12.5A = 0.0288Ω</li>
          <li>AWG 14 resistance: 2.525 Ω/1000 ft → (2.525 × 40) / 1000 = 0.101Ω (too high!)</li>
          <li>AWG 12 resistance: 1.588 Ω/1000 ft → (1.588 × 40) / 1000 = 0.0635Ω (still high)</li>
          <li>AWG 10 resistance: 0.9989 Ω/1000 ft → (0.9989 × 40) / 1000 = 0.0400Ω (better)</li>
          <li>AWG 8 resistance: 0.6282 Ω/1000 ft → (0.6282 × 40) / 1000 = 0.0251Ω (meets spec!)</li>
          <li><strong>Recommendation:</strong> AWG 8 wire for 12.5A load over 20 ft, or AWG 10 with 5% drop tolerance.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Comparing Wire Gauge Sizes">
        <p className="mb-4">
          Understanding AWG numbering and physical properties:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>AWG scale:</strong> Lower number = thicker wire; each 3 AWG decrease doubles cross-section area.</li>
          <li><strong>AWG 18:</strong> 0.82 mm diameter, 21 Ω/1000 ft, good for 2A loads or very short runs.</li>
          <li><strong>AWG 14:</strong> 1.63 mm diameter, 2.5 Ω/1000 ft, common for 10-15A loads up to 15 ft.</li>
          <li><strong>AWG 10:</strong> 2.59 mm diameter, 1.0 Ω/1000 ft, versatile for 20-30A mid-length runs.</li>
          <li><strong>AWG 6:</strong> 4.11 mm diameter, 0.40 Ω/1000 ft, heavy-duty 40-60A applications.</li>
          <li><strong>AWG 4:</strong> 5.19 mm diameter, 0.25 Ω/1000 ft, high-current inverters, winches.</li>
          <li><strong>AWG 1/0:</strong> 8.25 mm diameter, 0.10 Ω/1000 ft, 100-150A battery-to-inverter runs.</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What wire size do I need for a 1500W inverter on a 12V system?',
            answer: 'A 1500W inverter draws about 125A continuous at 12V (1500W / 12V). For a 6-foot run, use AWG 2/0 or 1/0 wire. For 10 feet, upgrade to AWG 3/0 or 4/0. Always check inverter manual for specific recommendations and fuse the wire within 18 inches of the battery at 150-175A rating.'
          },
          {
            question: 'Can I use automotive primary wire for 12V solar panel connections?',
            answer: 'Only for very short runs inside the vehicle. For outdoor solar installations, use stranded copper wire rated for wet locations, UV resistance, and appropriate temperature (often labeled THHN, USE-2, or solar-specific cable). Standard automotive wire degrades quickly in sunlight and weather.'
          },
          {
            question: 'Why is my 12V device not working even though I used the wire size chart?',
            answer: 'Check: 1) Poor crimps/connections adding resistance, 2) Actual wire length longer than estimated, 3) Battery voltage already low (<12V under load), 4) Device draws more current than rated, 5) Wire bundled with others causing heat buildup, 6) Using aluminum instead of copper wire, or 7) Wire gauge mislabeled (cheap imports).'
          },
          {
            question: 'How do I calculate wire size for multiple devices on one circuit?',
            answer: 'Add all device currents together for total amperage. Use this sum to size the main wire from battery to distribution point. Individual device branches can use smaller wire sized for each device\'s current and its specific length from the distribution point. Fuse each branch appropriately.'
          },
          {
            question: 'Is it better to use 24V instead of 12V for long wire runs?',
            answer: 'Yes! Doubling voltage to 24V cuts current in half for the same power, reducing wire size needed by ~2 AWG or allowing 4× longer runs with the same wire. For example, a 600W load: 12V draws 50A (needs AWG 6 for 10 ft), but 24V draws only 25A (AWG 10 for same run). Many RVs and boats use 24V or 48V for this reason.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
