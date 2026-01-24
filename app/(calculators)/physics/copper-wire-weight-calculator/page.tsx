import CopperWireWeightCalculator from '../../../_components/calculators/CopperWireWeightCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function CopperWireWeightCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Copper Wire Weight Calculator - AWG Wire Mass Estimation"
      description="Calculate copper wire weight by length, diameter, or AWG gauge for electrical applications."
      calculator={<CopperWireWeightCalculator />}
      slug="physics/copper-wire-weight-calculator"
      category="Electromagnetism"
      features={[
        'Calculates copper wire weight by dimensions',
        'AWG gauge selection (4/0 to 30)',
        'Diameter input in mm or inches',
        'Length in meters or feet',
        'Weight output in kg or pounds',
        'Wire resistance calculation included',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Copper Wire Weight Calculation?">
        <p>
          Copper wire weight calculation determines the mass of copper conductors based on their length, diameter, and material density. Knowing wire weight is essential for shipping costs, structural load planning, material procurement, and electrical installation budgets in construction and manufacturing.
        </p>
        <p className="mt-4">
          Copper has a density of 8960 kg/m³ (0.324 lb/in³), making it one of the heavier common conductor materials. Wire weight scales with cross-sectional area (diameter squared) and length, so small diameter increases significantly affect total mass. This calculator supports both AWG (American Wire Gauge) standard sizes and custom diameter inputs.
        </p>
      </SEOSection>

      <SEOSection title="Copper Wire Weight Formula">
        <SEOFormula
          formula="Weight = pi * r^2 * L * rho"
          description="Weight equals cross-sectional area (π × radius²) × length × copper density (8960 kg/m³)."
        />
        <SEOFormula
          formula="Area = pi * (d/2)^2"
          description="Cross-sectional area from diameter: π × (diameter/2)²."
        />
        <SEOFormula
          formula="R = rho * L / A"
          description="DC resistance equals resistivity (1.68×10⁻⁸ Ω⋅m) × length / area."
        />
      </SEOSection>

      <SEOSection title="Understanding AWG Wire Gauge">
        <p className="mb-4">
          The American Wire Gauge (AWG) system standardizes wire diameters:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Larger AWG number:</strong> Thinner wire (AWG 30 = 0.255 mm, AWG 10 = 2.588 mm).</li>
          <li><strong>Smaller AWG number:</strong> Thicker wire (AWG 4/0 = 11.684 mm, higher current capacity).</li>
          <li><strong>Gauge steps:</strong> Each 3 AWG reduction approximately doubles cross-sectional area.</li>
          <li><strong>Common sizes:</strong> AWG 12-14 for residential wiring, AWG 18-22 for electronics, AWG 4/0-2/0 for service entrance.</li>
          <li><strong>Weight scaling:</strong> AWG 10 weighs ~4× more per meter than AWG 16 due to area difference.</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use the Copper Wire Weight Calculator">
        <SEOList ordered items={[
          '<strong>Enter wire length:</strong> Input total length in meters or feet.',
          '<strong>Select AWG gauge OR enter diameter:</strong> Choose standard AWG size or input custom diameter in mm/inches.',
          '<strong>Choose weight unit:</strong> Select kilograms or pounds for output.',
          '<strong>Click Calculate:</strong> Get wire weight, cross-sectional area, and DC resistance.',
          '<strong>Review results:</strong> Use weight for shipping estimates, resistance for voltage drop calculations.'
        ]} />
      </SEOSection>

      <SEOSection title="Applications of Copper Wire Weight Calculations">
        <p className="mb-4">
          Wire weight calculations are critical in:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Electrical Contracting:</strong> Estimating material costs and shipping weights for large wire orders.</li>
          <li><strong>Building Construction:</strong> Calculating structural loads from heavy feeder cables in commercial buildings.</li>
          <li><strong>Aerospace/Automotive:</strong> Weight optimization in vehicles where every gram affects fuel efficiency.</li>
          <li><strong>Power Distribution:</strong> Planning cable tray and conduit support systems for transmission lines.</li>
          <li><strong>Recycling/Scrap:</strong> Valuing copper wire scrap by weight for recycling revenue.</li>
          <li><strong>Manufacturing:</strong> Material procurement planning for coil winding, transformers, motors.</li>
          <li><strong>Telecommunications:</strong> Network cable weight for tower and pole mounting load calculations.</li>
          <li><strong>Marine/Offshore:</strong> Cable weight for underwater installations and buoyancy compensation.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Copper vs Aluminum Wire Weight">
        <p className="mb-4">
          Comparing copper and aluminum conductors:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Density difference:</strong> Copper 8960 kg/m³ vs aluminum 2700 kg/m³ (copper 3.3× heavier).</li>
          <li><strong>Conductivity trade-off:</strong> Aluminum requires larger diameter for same current capacity.</li>
          <li><strong>Weight savings:</strong> Aluminum wire can be 50% lighter than equivalent copper for same resistance.</li>
          <li><strong>Application choice:</strong> Aluminum for overhead power lines (weight reduction), copper for buildings (space/termination).</li>
          <li><strong>Cost consideration:</strong> Aluminum cheaper per pound but requires thicker wire; total cost varies by application.</li>
          <li><strong>Mechanical strength:</strong> Copper stronger and more flexible; aluminum requires special connectors.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Wire Resistance and Voltage Drop">
        <p className="mb-4">
          Wire weight correlates inversely with resistance:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Heavier wire = lower resistance:</strong> Larger cross-section reduces voltage drop and power loss.</li>
          <li><strong>Voltage drop:</strong> V_drop = I × R, where R depends on length/area ratio.</li>
          <li><strong>Power loss:</strong> P_loss = I² × R; doubling current quadruples heat loss in wire.</li>
          <li><strong>NEC requirements:</strong> Maximum 3% voltage drop for branch circuits, 5% total from service to outlet.</li>
          <li><strong>Long runs:</strong> Increase wire size (weight) to maintain acceptable voltage at load.</li>
          <li><strong>Temperature rise:</strong> Resistance increases ~0.4% per °C for copper; heating reduces conductivity.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> Calculate weight of 100 meters of AWG 10 copper wire.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>AWG 10 diameter: 2.588 mm = 0.002588 m</li>
          <li>Radius: 0.002588 / 2 = 0.001294 m</li>
          <li>Area: π × (0.001294)² = 5.261 × 10⁻⁶ m²</li>
          <li>Volume: 5.261 × 10⁻⁶ × 100 = 5.261 × 10⁻⁴ m³</li>
          <li>Weight: 5.261 × 10⁻⁴ × 8960 = 4.714 kg (10.39 lb)</li>
          <li>Resistance: (1.68 × 10⁻⁸ × 100) / (5.261 × 10⁻⁶) = 0.319 Ω</li>
          <li>For 1000 ft (305 m): 4.714 × 3.05 = 14.4 kg (31.7 lb)</li>
        </ol>
      </SEOSection>

      <SEOSection title="AWG Weight Reference Table">
        <p className="mb-4">
          Approximate copper wire weight per 100 meters (220 lb/1000 ft reference):
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>AWG 4/0:</strong> ~50 kg/100m (thick service entrance cable)</li>
          <li><strong>AWG 2/0:</strong> ~31 kg/100m (sub-panel feeders)</li>
          <li><strong>AWG 4:</strong> ~12 kg/100m (heavy appliance circuits)</li>
          <li><strong>AWG 10:</strong> ~4.7 kg/100m (30A circuits, electric dryer)</li>
          <li><strong>AWG 12:</strong> ~3.0 kg/100m (20A general circuits)</li>
          <li><strong>AWG 14:</strong> ~1.9 kg/100m (15A lighting circuits)</li>
          <li><strong>AWG 18:</strong> ~0.75 kg/100m (electronics, thermostats)</li>
          <li><strong>AWG 22:</strong> ~0.30 kg/100m (communications, control wiring)</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'How much does copper wire weigh per foot?',
            answer: 'Weight per foot depends on wire gauge. AWG 10 weighs about 31 lb/1000 ft (46 g/m), AWG 12 weighs 20 lb/1000 ft (30 g/m), AWG 14 weighs 12.5 lb/1000 ft (19 g/m). Thicker wires weigh exponentially more.'
          },
          {
            question: 'Why is wire weight important in electrical installation?',
            answer: 'Wire weight affects shipping costs, structural support requirements (cable trays, conduits), installation labor (heavier wire harder to pull), and material costs. Large commercial projects may use tons of copper wire requiring load calculations.'
          },
          {
            question: 'Can I use aluminum wire to reduce weight?',
            answer: 'Yes, aluminum wire is 70% lighter than copper for the same conductivity. However, aluminum requires larger diameter (less space-efficient), special connectors, and careful installation to prevent oxidation issues. Check local electrical codes.'
          },
          {
            question: 'How does temperature affect copper wire weight?',
            answer: 'Temperature does not significantly change wire weight (thermal expansion is minimal). However, temperature increases resistance by ~0.4% per °C, affecting electrical performance. Weight calculation uses standard density at 20°C.'
          },
          {
            question: 'What is the difference between solid and stranded wire weight?',
            answer: 'Same AWG solid and stranded wires have nearly identical weight (same total copper cross-section). Stranded wire includes tiny air gaps between strands, making it imperceptibly lighter. Insulation weight adds more variation than strand configuration.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
