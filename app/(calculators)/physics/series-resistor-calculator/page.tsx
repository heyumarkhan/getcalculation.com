import CalculatorPageTemplate from '@/app/_components/layouts/CalculatorPageTemplate';
import SeriesResistorCalculator from '@/app/_components/calculators/SeriesResistorCalculator';
import { SEOSection, SEOFAQ } from '@/app/_components/ui/SEOContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Series Resistor Calculator | Calculate Total Resistance R = R1 + R2 + R3',
  description: 'Free online series resistor calculator. Calculate total resistance, voltage drop, or current in series circuits using the formula R_total = R1 + R2 + R3. Perfect for electrical engineering and circuit design.',
  keywords: [
    'series resistor calculator',
    'total resistance calculator',
    'resistor calculator',
    'series circuit calculator',
    'R_total = R1 + R2',
    'voltage drop calculator',
    'circuit resistance calculator',
    'ohms law calculator',
    'resistor value calculator',
    'series circuit analysis',
    'electronic circuit calculator',
    'resistance addition calculator',
    'electrical circuit calculator',
    'voltage distribution calculator',
    'current calculator',
    'ohm calculator',
    'resistor series combination',
    'circuit solver',
    'electronics calculator',
    'electrical engineering calculator'
  ],
  openGraph: {
    title: 'Series Resistor Calculator',
    description: 'Calculate total resistance, voltage drop, and current in series circuits with this free online calculator.',
    type: 'website',
  },
};

export default function SeriesResistorCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Series Resistor Calculator: Calculate R_total = R1 + R2 + R3 + ... + Rn"
      description="Calculate total resistance, voltage drop across resistors, or total voltage in series circuits using the fundamental formula R_total = R1 + R2 + R3 + ... + Rn. Free online electronics calculator with support for Ohm's Law calculations and voltage distribution analysis."
      calculator={<SeriesResistorCalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/series-resistor-calculator"
      category="Electronics"
      features={[
        'Calculate total resistance in series circuits',
        'Support for multiple resistance units (Ω, kΩ, MΩ, mΩ, GΩ)',
        'Add or remove resistors dynamically',
        'Calculate voltage drop across individual resistors',
        'Determine total voltage from circuit current',
        'Step-by-step calculations with Ohm\'s Law',
        'Perfect for circuit design and analysis',
      ]}
    >
      <SEOSection title="Understanding Series Resistor Circuits">
        <p>
          A series circuit is an electrical circuit where components are connected end-to-end in a single path, 
          so current flows through each component sequentially. When resistors are connected in series, their 
          resistances add together to form the total circuit resistance. This is one of the most fundamental 
          concepts in electronics and electrical engineering.
        </p>
        <p>
          The Series Resistor Calculator helps you determine the total resistance of a circuit with multiple 
          resistors in series, calculate voltage drops across each resistor, and verify circuit behavior using 
          Ohm's Law. Understanding series circuits is essential for anyone working with electronics, from hobbyists 
          to professional electrical engineers.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Series Resistor Calculator">
        <p>
          This calculator provides flexible functionality for analyzing series circuits:
        </p>
        <ol>
          <li><strong>Add Resistor Values:</strong> Enter the resistance value for each component in your series circuit</li>
          <li><strong>Select Units:</strong> Choose the appropriate unit for each resistor (Ohms, kilohms, megohms, etc.)</li>
          <li><strong>Choose Calculation Type:</strong>
            <ul>
              <li>Total Resistance: Calculate the sum of all resistances</li>
              <li>Voltage Drop: Enter supply voltage to find voltage across each resistor</li>
              <li>Total Voltage: Enter circuit current to calculate required supply voltage</li>
            </ul>
          </li>
          <li><strong>Add More Resistors:</strong> Use the "Add Resistor" button to include additional components</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed step-by-step calculations</li>
        </ol>
        <p>
          The calculator automatically handles unit conversions and applies Ohm's Law to provide comprehensive 
          circuit analysis results.
        </p>
      </SEOSection>

      <SEOSection title="The Series Resistor Formula: R_total = R1 + R2 + R3 + ... + Rn">
        <p>
          The fundamental formula for calculating total resistance in a series circuit is:
        </p>
        <p>
          <strong>R_total = R1 + R2 + R3 + ... + Rn</strong>
        </p>
        <p>
          Where:
        </p>
        <ul>
          <li><strong>R_total</strong> = Total circuit resistance</li>
          <li><strong>R1, R2, R3, ... Rn</strong> = Individual resistor values</li>
        </ul>
        <p>
          This simple additive relationship is unique to series circuits. The total resistance is always greater than 
          or equal to the largest individual resistor. If you add more resistors in series, the total resistance increases.
        </p>
        <p>
          Key principle: <strong>In a series circuit, the total resistance is simply the sum of all individual resistances.</strong>
        </p>
      </SEOSection>

      <SEOSection title="Resistance Units and Conversions">
        <p>
          <strong>Common Resistance Units:</strong>
        </p>
        <ul>
          <li><strong>Ω (Ohm):</strong> The base unit of electrical resistance; defined as the resistance when 1 volt produces 1 ampere of current</li>
          <li><strong>mΩ (Milliohm):</strong> 0.001 Ohms; used for very low resistances like wire and connectors</li>
          <li><strong>kΩ (Kilohm):</strong> 1,000 Ohms; commonly used in circuits for resistors in the thousands range</li>
          <li><strong>MΩ (Megaohm):</strong> 1,000,000 Ohms; used for very high resistance values like in isolation testing</li>
          <li><strong>GΩ (Gigaohm):</strong> 1,000,000,000 Ohms; used for extremely high resistances in specialized applications</li>
        </ul>
        <p>
          The calculator automatically converts between these units, making it easy to work with resistors 
          specified in different units within the same circuit.
        </p>
      </SEOSection>

      <SEOSection title="Ohm's Law and Series Circuit Analysis">
        <p>
          Ohm's Law is the fundamental relationship in electrical circuits:
        </p>
        <p>
          <strong>V = I × R</strong>
        </p>
        <p>
          Where:
        </p>
        <ul>
          <li><strong>V</strong> = Voltage (in volts)</li>
          <li><strong>I</strong> = Current (in amperes)</li>
          <li><strong>R</strong> = Resistance (in ohms)</li>
        </ul>
        <p>
          In a series circuit with the same current flowing through all resistors:
        </p>
        <ul>
          <li><strong>Total Voltage:</strong> V_total = I × R_total = V1 + V2 + V3 + ... + Vn</li>
          <li><strong>Circuit Current:</strong> I_circuit = V_total / R_total (same through all resistors)</li>
          <li><strong>Individual Voltage Drops:</strong> V_resistor = I_circuit × R_resistor</li>
        </ul>
        <p>
          This calculator applies these relationships to provide complete circuit analysis.
        </p>
      </SEOSection>

      <SEOSection title="Series vs. Parallel Resistor Circuits">
        <p>
          Understanding the difference between series and parallel circuits is crucial for circuit design:
        </p>
        <p>
          <strong>Series Circuits:</strong>
        </p>
        <ul>
          <li>Components connected end-to-end in a single path</li>
          <li>Same current flows through all components</li>
          <li>Voltages add up: V_total = V1 + V2 + V3 + ...</li>
          <li>Resistances add up: R_total = R1 + R2 + R3 + ...</li>
          <li>Total resistance is always greater than the largest individual resistance</li>
          <li>If one component fails (open circuit), the entire circuit stops working</li>
        </ul>
        <p>
          <strong>Parallel Circuits:</strong>
        </p>
        <ul>
          <li>Components connected across the same two points</li>
          <li>Same voltage appears across all components</li>
          <li>Currents add up: I_total = I1 + I2 + I3 + ...</li>
          <li>Reciprocal resistances add: 1/R_total = 1/R1 + 1/R2 + 1/R3 + ...</li>
          <li>Total resistance is always less than the smallest individual resistance</li>
          <li>If one component fails, others continue operating</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications of Series Circuits">
        <p>
          <strong>1. Current Limiting Circuits</strong>
        </p>
        <ul>
          <li>Adding a resistor in series reduces current through LED or other component</li>
          <li>Example: LED current limiting resistor protecting the LED from overcurrent</li>
          <li>Design: Choose resistor value so V_led + V_resistor = V_supply</li>
        </ul>
        <p>
          <strong>2. Voltage Division Circuits</strong>
        </p>
        <ul>
          <li>Series resistors create a voltage divider to obtain intermediate voltage levels</li>
          <li>Used in analog circuits, sensor interfaces, and level shifting</li>
          <li>Output voltage: V_out = V_in × (R2 / (R1 + R2))</li>
        </ul>
        <p>
          <strong>3. String Lights and Christmas Lights</strong>
        </p>
        <ul>
          <li>Resistive bulbs in series share the supply voltage</li>
          <li>Each bulb gets a portion of the total voltage</li>
          <li>As bulbs burn out, remaining bulbs get more voltage</li>
        </ul>
        <p>
          <strong>4. Heating Elements</strong>
        </p>
        <ul>
          <li>Series resistance heaters split electrical power</li>
          <li>Multiple heating elements controlled by series configuration</li>
          <li>Example: Toaster oven heating elements in series for different heating modes</li>
        </ul>
        <p>
          <strong>5. Sensor Signal Conditioning</strong>
        </p>
        <ul>
          <li>Series resistors adapt sensor output levels to microcontroller inputs</li>
          <li>Current limiting and voltage scaling for sensor circuits</li>
          <li>Protection of sensitive electronics from sensor signals</li>
        </ul>
      </SEOSection>

      <SEOSection title="Examples of Series Resistor Calculations">
        <p>
          <strong>Example 1: Simple Series Circuit</strong>
        </p>
        <p>
          Calculate total resistance for: R1 = 1 kΩ, R2 = 2.2 kΩ, R3 = 1.5 kΩ
        </p>
        <ul>
          <li>R_total = 1 kΩ + 2.2 kΩ + 1.5 kΩ = 4.7 kΩ</li>
        </ul>
        <p>
          <strong>Example 2: Voltage Drop Distribution</strong>
        </p>
        <p>
          Circuit with 12V supply and three resistors: 100 Ω, 220 Ω, 180 Ω
        </p>
        <ul>
          <li>Total Resistance: R_total = 100 + 220 + 180 = 500 Ω</li>
          <li>Circuit Current: I = 12V / 500Ω = 0.024 A = 24 mA</li>
          <li>Voltage across R1: V1 = 24 mA × 100Ω = 2.4V</li>
          <li>Voltage across R2: V2 = 24 mA × 220Ω = 5.28V</li>
          <li>Voltage across R3: V3 = 24 mA × 180Ω = 4.32V</li>
          <li>Total: 2.4 + 5.28 + 4.32 = 12V ✓</li>
        </ul>
        <p>
          <strong>Example 3: LED Current Limiting</strong>
        </p>
        <p>
          Design a circuit with a 5V supply and red LED (V_led ≈ 2V, I_led = 20mA)
        </p>
        <ul>
          <li>Voltage across limiting resistor: V_resistor = 5V - 2V = 3V</li>
          <li>Required resistance: R = V / I = 3V / 20mA = 150Ω</li>
          <li>Use standard value 150 Ω or 180 Ω resistor</li>
        </ul>
      </SEOSection>

      <SEOSection title="Factors Affecting Series Circuit Behavior">
        <p>
          <strong>1. Resistor Tolerance</strong>
        </p>
        <ul>
          <li>Actual resistance values vary from marked values (typically ±5% to ±1%)</li>
          <li>Total tolerance adds up in series circuits</li>
          <li>Critical applications require tight tolerance resistors</li>
        </ul>
        <p>
          <strong>2. Temperature Effects</strong>
        </p>
        <ul>
          <li>Resistance changes with temperature (temperature coefficient)</li>
          <li>Metal film resistors: ±25 to ±100 ppm/°C</li>
          <li>Carbon film resistors: ±200 to ±1000 ppm/°C</li>
          <li>In series circuits, total temperature coefficient is sum of individual coefficients</li>
        </ul>
        <p>
          <strong>3. Power Dissipation</strong>
        </p>
        <ul>
          <li>Each resistor dissipates power: P = I² × R or P = V² / R</li>
          <li>Total circuit power: P_total = V_total × I = P1 + P2 + P3 + ...</li>
          <li>Resistors must be rated for their individual power dissipation</li>
        </ul>
        <p>
          <strong>4. Frequency Effects (Parasitic Inductance)</strong>
        </p>
        <ul>
          <li>Real resistors have small parasitic inductance</li>
          <li>At high frequencies, inductance affects circuit behavior</li>
          <li>Particularly important in RF and high-speed circuits</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is a series circuit and how does it differ from parallel?',
            answer: 'A series circuit has components connected end-to-end in a single path, so current flows through each component sequentially. The same current flows through all components, but voltages add up. In parallel circuits, components are connected across the same two points, so the same voltage appears across all components, but currents add up.',
          },
          {
            question: 'Why do resistances add in series circuits?',
            answer: 'Resistances add in series because each resistor opposes the flow of current independently. When connected in series, the total opposition to current flow is the sum of individual resistances. Mathematically: R_total = R1 + R2 + R3 + ... + Rn.',
          },
          {
            question: 'What is the voltage drop across a resistor in a series circuit?',
            answer: 'The voltage drop across a resistor in a series circuit is calculated using Ohm\'s Law: V_resistor = I × R, where I is the circuit current (same through all series resistors) and R is the individual resistor value. The sum of all individual voltage drops equals the supply voltage.',
          },
          {
            question: 'How do I calculate the current in a series circuit?',
            answer: 'Use Ohm\'s Law: I = V_total / R_total, where V_total is the supply voltage and R_total is the sum of all resistances in the circuit. This current is the same everywhere in the series circuit.',
          },
          {
            question: 'What happens if one resistor fails (open circuit) in a series circuit?',
            answer: 'If one resistor in a series circuit fails and opens (breaks the circuit), the entire circuit stops working because there is no complete path for current to flow. This is why series circuits are not ideal for applications where you need reliability.',
          },
          {
            question: 'How do I limit current to an LED in a circuit?',
            answer: 'Add a current-limiting resistor in series with the LED. Calculate the required resistance using: R = (V_supply - V_led) / I_led, where V_led is the LED forward voltage (typically 2-3V for red LEDs) and I_led is the desired LED current (typically 10-20mA).',
          },
          {
            question: 'What is a voltage divider?',
            answer: 'A voltage divider is a series circuit of two or more resistors that creates an intermediate voltage from a supply voltage. The output voltage is: V_out = V_in × (R2 / (R1 + R2)) for two resistors. Voltage dividers are used to scale voltage levels in circuits.',
          },
          {
            question: 'Can I connect resistors in series to reduce current?',
            answer: 'Yes! Adding resistors in series increases total resistance, which reduces circuit current according to Ohm\'s Law (I = V / R). This is the principle behind current-limiting resistors used with LEDs and other components.',
          },
        ]}
      />
    </CalculatorPageTemplate>
  );
}
