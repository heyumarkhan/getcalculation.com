import PowerFactorCalculator from '../../../_components/calculators/PowerFactorCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function PowerFactorCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Power Factor Calculator: Calculate PF, Real Power & Apparent Power"
      description="Calculate power factor (PF), real power (active power), or apparent power in AC circuits using PF = P/S. Free online electrical calculator for power factor correction, energy efficiency, and electrical engineering."
      calculator={<PowerFactorCalculator />}
      slug="physics/power-factor-calculator"
      category="Electromagnetism"
      features={[
        "Calculate power factor from real and apparent power",
        "Calculate real power (active power) from power factor and apparent power",
        "Calculate apparent power from power factor and real power",
        "Automatic phase angle calculation",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Power Factor: Efficiency in AC Electrical Systems">
        <p>
          Power factor is a crucial concept in AC (alternating current) electrical systems, representing the ratio of real power (active power) to apparent power. It indicates how effectively electrical power is being converted into useful work. Our Power Factor Calculator simplifies these calculations using the fundamental relationship: <strong>PF = P / S</strong>, where PF is power factor, P is real power in watts (W), and S is apparent power in volt-amperes (VA).
        </p>
        <p>
          Whether you&apos;re an electrical engineer, facility manager, or student, understanding power factor is essential for optimizing energy efficiency, reducing electricity costs, and designing efficient electrical systems. A poor power factor means more current is needed to deliver the same real power, leading to increased energy losses and higher costs. Our calculator helps you analyze and improve power factor in your electrical systems.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Power Factor Calculator">
        <p>
          Our Power Factor Calculator offers three calculation modes:
        </p>
        <SEOList ordered items={[
          '<strong>Calculate Power Factor:</strong> Enter real power (P) in watts and apparent power (S) in volt-amperes. The calculator determines the power factor and phase angle.',
          '<strong>Calculate Real Power:</strong> Enter power factor (0 to 1) and apparent power (S) in volt-amperes. The calculator determines the real power consumed.',
          '<strong>Calculate Apparent Power:</strong> Enter real power (P) in watts and power factor (0 to 1). The calculator determines the apparent power required.'
        ]} />
        <p>
          Select your calculation mode, enter the known values, and click Calculate to get instant results with detailed step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="Key Power Factor Formulas">
        <p>
          Power factor is calculated using the relationship between real power and apparent power:
        </p>

        <SEOFormula
          formula="PF = P / S"
          description="Power Factor = Real Power ÷ Apparent Power"
        />
        <p>
          Where:
        </p>
        <SEOList items={[
          '<strong>PF</strong> = Power Factor (dimensionless, ranges from 0 to 1)',
          '<strong>P</strong> = Real Power / Active Power (watts, W)',
          '<strong>S</strong> = Apparent Power (volt-amperes, VA)'
        ]} />

        <h3>Related Formulas:</h3>
        <SEOList items={[
          '<strong>Real Power:</strong> P = PF × S',
          '<strong>Apparent Power:</strong> S = P / PF',
          '<strong>Power Factor from Phase Angle:</strong> PF = cos(φ), where φ is the phase angle',
          '<strong>Phase Angle:</strong> φ = arccos(PF)',
          '<strong>Reactive Power:</strong> Q = √(S² - P²) or Q = S × sin(φ)',
          '<strong>Apparent Power:</strong> S = V × I (voltage × current)'
        ]} />

        <h3>Understanding Power Factor Values:</h3>
        <ul>
          <li><strong>PF = 1.0 (Unity):</strong> Purely resistive load. Current and voltage are in phase. Most efficient.</li>
          <li><strong>PF = 0.8-0.95:</strong> Typical for motors and inductive loads. Moderate efficiency.</li>
          <li><strong>PF &lt; 0.8:</strong> Poor power factor. Significant reactive power, leading to energy waste.</li>
          <li><strong>PF = 0:</strong> Purely reactive load (ideal inductor or capacitor). No real power consumed, but current still flows.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications of Power Factor Calculations">
        <p>
          Power factor calculations are essential in numerous practical applications:
        </p>
        <SEOList items={[
          "Industrial Facilities: Analyzing and improving power factor to reduce energy costs and avoid utility penalties",
          "Motor Design: Understanding power factor requirements for electric motors and induction machines",
          "Power Distribution: Designing efficient electrical distribution systems and sizing transformers",
          "Energy Management: Optimizing facility energy usage and reducing demand charges",
          "Electrical Contracting: Troubleshooting power quality issues and implementing power factor correction",
          "Renewable Energy: Integrating solar and wind power systems with proper power factor control",
          "Data Centers: Ensuring efficient power delivery and reducing heat generation from reactive power",
          "HVAC Systems: Analyzing power consumption of air conditioning and heating systems",
          "Manufacturing: Optimizing power factor for production equipment and machinery",
          "Electrical Engineering: Designing circuits and systems with appropriate power factor characteristics",
          "Utility Billing: Understanding power factor penalties and demand charges",
          "Power Quality Analysis: Diagnosing electrical system issues related to reactive power"
        ]} />
      </SEOSection>

      <SEOSection title="Understanding Real Power, Apparent Power, and Reactive Power">
        <p>
          In AC circuits, there are three types of power:
        </p>
        <ul>
          <li><strong>Real Power (P) - Active Power:</strong> Measured in watts (W), this is the actual power consumed and converted into useful work (heat, light, mechanical work). It represents the rate at which energy is actually used.</li>
          <li><strong>Apparent Power (S):</strong> Measured in volt-amperes (VA), this is the product of voltage and current (S = V × I). It represents the total power that appears to be consumed, including both real and reactive components.</li>
          <li><strong>Reactive Power (Q):</strong> Measured in volt-amperes reactive (VAR), this is the power that oscillates between the source and load without being consumed. It&apos;s required to establish and maintain magnetic and electric fields in inductive and capacitive loads.</li>
        </ul>
        <p>
          These three powers form a power triangle: S² = P² + Q², where apparent power is the hypotenuse.
        </p>
      </SEOSection>

      <SEOSection title="Power Factor Correction">
        <p>
          Power factor correction is the process of improving power factor to reduce energy losses and costs:
        </p>
        <SEOList items={[
          "Adding Capacitors: For inductive loads (motors), capacitors are added to offset lagging current and improve power factor",
          "Reducing Reactive Loads: Minimizing the use of highly inductive or capacitive equipment",
          "Using Synchronous Condensers: Rotating machines that can generate or absorb reactive power",
          "Optimizing Load Operation: Running equipment at optimal loads to improve power factor",
          "Benefits: Reduced energy costs, lower demand charges, improved voltage regulation, reduced line losses, increased system capacity"
        ]} />
        <p>
          Power factor correction can significantly reduce electricity bills, especially for facilities with large motors or inductive loads, by reducing the apparent power and current required to deliver the same real power.
        </p>
      </SEOSection>

      <SEOSection title="Common Power Factor Calculations">
        <h3>Example 1: Calculating Power Factor</h3>
        <p>A motor consumes 8000 W of real power and has an apparent power of 10,000 VA. What is the power factor?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">PF = P / S</p>
          <p className="font-mono">PF = 8000 W / 10,000 VA</p>
          <p className="font-mono">PF = 0.8</p>
          <p className="font-mono">Phase Angle: φ = arccos(0.8) = 36.87°</p>
          <p className="text-sm text-gray-600 mt-1">The motor has a power factor of 0.8 (80%), which is typical for induction motors.</p>
        </div>

        <h3>Example 2: Calculating Real Power</h3>
        <p>A system has a power factor of 0.92 and apparent power of 5000 VA. What is the real power consumed?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">P = PF × S</p>
          <p className="font-mono">P = 0.92 × 5000 VA</p>
          <p className="font-mono">P = 4600 W</p>
          <p className="text-sm text-gray-600 mt-1">The system consumes 4600 watts of real power.</p>
        </div>

        <h3>Example 3: Calculating Apparent Power</h3>
        <p>A load requires 5000 W of real power and operates at a power factor of 0.75. What apparent power is needed?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">S = P / PF</p>
          <p className="font-mono">S = 5000 W / 0.75</p>
          <p className="font-mono">S = 6667 VA</p>
          <p className="text-sm text-gray-600 mt-1">The load requires 6667 VA of apparent power to deliver 5000 W of real power.</p>
        </div>
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Power factor calculations use standard electrical units:
        </p>
        <SEOList items={[
          '<strong>Power Factor (PF):</strong> Dimensionless ratio (0 to 1), sometimes expressed as a percentage (0% to 100%)',
          '<strong>Real Power (P):</strong> Watts (W), kilowatts (kW = 1000 W), megawatts (MW = 1,000,000 W)',
          '<strong>Apparent Power (S):</strong> Volt-amperes (VA), kilovolt-amperes (kVA = 1000 VA), megavolt-amperes (MVA = 1,000,000 VA)',
          '<strong>Reactive Power (Q):</strong> Volt-amperes reactive (VAR), kilovolt-amperes reactive (kVAR)',
          '<strong>Phase Angle (φ):</strong> Degrees (°) or radians'
        ]} />
        <p>
          <strong>Important:</strong> Real power is always less than or equal to apparent power, so power factor is always between 0 and 1. The difference between apparent power and real power represents reactive power.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is power factor and why is it important?",
            answer: "Power factor is the ratio of real power to apparent power (PF = P/S), ranging from 0 to 1. It indicates how effectively electrical power is being used. A low power factor means more current is needed to deliver the same real power, leading to increased energy losses, higher electricity costs, and reduced system capacity. Improving power factor can significantly reduce energy bills."
          },
          {
            question: "What is the difference between real power and apparent power?",
            answer: "Real power (P) in watts is the actual power consumed and converted into useful work. Apparent power (S) in volt-amperes is the product of voltage and current (S = V × I), representing the total power that appears to flow. Real power is always less than or equal to apparent power. The difference is reactive power (Q), which oscillates without being consumed."
          },
          {
            question: "What causes poor power factor?",
            answer: "Poor power factor is typically caused by inductive loads like motors, transformers, and fluorescent lighting, which require reactive power to establish magnetic fields. These loads cause current to lag behind voltage (lagging power factor). Capacitive loads cause leading power factor. Most industrial facilities have lagging power factors due to motor loads."
          },
          {
            question: "How do you calculate power factor from phase angle?",
            answer: "Power factor equals the cosine of the phase angle: PF = cos(φ). If the phase angle is 30°, power factor = cos(30°) = 0.866. Conversely, phase angle = arccos(PF). When current lags voltage (inductive load), phase angle is positive. When current leads voltage (capacitive load), phase angle is negative."
          },
          {
            question: "What is a good power factor?",
            answer: "A power factor of 1.0 (unity) is ideal but rarely achieved. Most utilities require power factors above 0.85-0.95 to avoid penalties. Motors typically operate at 0.8-0.9 power factor. Power factors below 0.8 are considered poor and may result in utility penalties. Power factor correction can improve values to 0.95 or higher."
          },
          {
            question: "How is power factor corrected?",
            answer: "Power factor correction is typically done by adding capacitors to offset the lagging current from inductive loads. For inductive loads (motors), capacitors are installed to provide leading reactive power that cancels the lagging reactive power, improving power factor toward unity. This reduces apparent power and current required."
          },
          {
            question: "Does power factor affect electricity bills?",
            answer: "Yes, power factor directly affects electricity bills. Utilities often charge demand charges based on apparent power (kVA) rather than real power (kW). A low power factor means higher apparent power for the same real power, resulting in higher demand charges. Some utilities also impose power factor penalties when power factor falls below a threshold (typically 0.85-0.95)."
          },
          {
            question: "Can power factor be greater than 1?",
            answer: "No, power factor cannot exceed 1.0. It ranges from 0 (purely reactive) to 1 (purely resistive). If calculations show PF > 1, it indicates an error in measurements, as real power cannot exceed apparent power. Power factor = 1.0 represents the most efficient case where all apparent power is converted to real power."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding and calculating power factor is essential for optimizing electrical systems, reducing energy costs, and improving efficiency. Our Power Factor Calculator simplifies these calculations, making it easy to determine power factor, real power, or apparent power for any AC electrical system.
        </p>
        <p>
          Whether you&apos;re analyzing existing systems, designing new installations, or working on power factor correction projects, this calculator provides accurate results with step-by-step solutions. Ready to explore more electrical concepts? Check out our other calculators like the {createInternalLink('electrical-power-calculator', 'Electrical Power Calculator')} for DC power calculations, or use our {createInternalLink('watt-hour-calculator', 'Watt-hour Calculator')} for energy consumption over time.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

