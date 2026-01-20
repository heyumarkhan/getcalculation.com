import TransformerSizingCalculator from '../../../_components/calculators/TransformerSizingCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function TransformerSizingCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Transformer Sizing Calculator: Calculate kVA, Current & Wire Size"
      description="Free transformer sizing calculator to determine transformer capacity (kVA), secondary current, and appropriate wire gauge. Calculate with voltage, current, or power inputs. Supports cooling types and power factor adjustments for electrical design."
      calculator={<TransformerSizingCalculator />}
      slug="physics/transformer-sizing-calculator"
      category="Electromagnetism"
      features={[
        "Calculate transformer capacity in kVA",
        "Determine secondary output current",
        "Recommend wire gauge with safety margin",
        "Support multiple cooling types (ONAN, ONAF, OFWF, etc.)",
        "Power factor adjustment for different loads",
        "Comprehensive unit conversions",
        "Three-phase transformer calculations",
        "Free and easy to use",
        "No registration required"
      ]}
    >
      <SEOSection title="Transformer Sizing Calculator: Design and Specify Your Transformer">
        <p>
          A transformer is a critical component in electrical distribution systems, converting voltage and current levels while maintaining power. Properly sizing a transformer is essential for safe, efficient, and compliant electrical installations. Our Transformer Sizing Calculator makes it easy to determine the right transformer capacity, output current, and wire requirements for your specific application.
        </p>
        <p>
          Whether you're an electrical engineer, electrician, facility manager, or student, this calculator helps you make informed decisions about transformer selection based on voltage, current, and power load requirements.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Transformer Sizing">
        <p>
          Transformer sizing involves calculating the apparent power (in kVA) required to handle your electrical load. The fundamental relationship for three-phase transformers is:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">kVA = √3 × V × I / 1000</p>
          <p className="text-sm text-gray-600 mt-2">Where: V = Voltage (V), I = Current (A), √3 ≈ 1.732</p>
        </div>
        
        <h3>Key Transformer Parameters</h3>
        <ul>
          <li><strong>Primary Voltage:</strong> The input voltage to the transformer, typically from the utility or distribution system</li>
          <li><strong>Secondary Voltage:</strong> The output voltage delivered to your load</li>
          <li><strong>Transformer Capacity (kVA):</strong> The apparent power rating, combining real power (kW) and reactive power (kVAR)</li>
          <li><strong>Cooling Type:</strong> The method used to dissipate heat (ONAN, ONAF, OFWF, etc.)</li>
          <li><strong>Power Factor:</strong> The ratio of real power to apparent power, affecting true load requirements</li>
          <li><strong>Wire Size:</strong> The conductor gauge required to safely transmit the transformer's secondary current</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use Our Transformer Sizing Calculator">
        <p>
          Our calculator is designed for flexibility and accuracy. Follow these steps:
        </p>
        <ol>
          <li><strong>Enter Input Values:</strong> Provide at least two of the following: Primary Voltage, Output Current, or Power Load</li>
          <li><strong>Select Units:</strong> Choose appropriate units (V, kV for voltage; A, mA, kA for current; W, kW, kVA, MVA for power)</li>
          <li><strong>Set Power Factor:</strong> Enter the load's power factor (typical range: 0.8-1.0)</li>
          <li><strong>Choose Cooling Type:</strong> Select the transformer cooling method that matches your application</li>
          <li><strong>Calculate:</strong> Click the Calculate button to get results</li>
          <li><strong>Review Results:</strong> Get transformer capacity, secondary current, wire size recommendations, and adjusted capacity</li>
        </ol>
      </SEOSection>

      <SEOSection title="Transformer Types and Cooling Methods">
        <p>
          Different transformer types have different cooling characteristics and capacity ratings:
        </p>
        <ul>
          <li><strong>ONAN (Oil-Immersed, Self-Cooled):</strong> Standard power transformers, typical cooling method with 1.0x rating</li>
          <li><strong>ONAF (Oil-Immersed, Forced-Air-Cooled):</strong> Enhanced cooling using fans, provides 1.33x capacity increase</li>
          <li><strong>OFAN (Oil-Forced-Air-Cooled):</strong> More aggressive cooling with 1.33x capacity rating</li>
          <li><strong>OFWF (Oil-Forced-Water-Cooled):</strong> Maximum cooling capability, 1.67x capacity rating for critical applications</li>
          <li><strong>DNAN (Dry-Type, Self-Cooled):</strong> Cast-resin transformers, indoor installation, 0.9x rating</li>
          <li><strong>DNAF (Dry-Type, Forced-Air-Cooled):</strong> Enhanced dry-type cooling, 1.25x capacity rating</li>
        </ul>
      </SEOSection>

      <SEOSection title="Power Factor and Load Types">
        <p>
          Power factor significantly affects transformer sizing and energy efficiency:
        </p>
        <ul>
          <li><strong>Power Factor = 1.0:</strong> Purely resistive loads (heaters, lighting). Uses all apparent power</li>
          <li><strong>Power Factor = 0.95:</strong> Typical well-designed industrial facility</li>
          <li><strong>Power Factor = 0.90:</strong> Motors and other inductive loads</li>
          <li><strong>Power Factor = 0.85:</strong> Poorly corrected inductive loads</li>
          <li><strong>Power Factor &lt; 0.85:</strong> Requires power factor correction equipment to meet utility standards</li>
        </ul>
        <p>
          <strong>Tip:</strong> If you have real power (kW) and want to convert to apparent power (kVA), divide kW by the power factor.
        </p>
      </SEOSection>

      <SEOSection title="Wire Sizing for Transformer Secondary">
        <p>
          The secondary conductor must be sized to safely carry the transformer's output current. Our calculator includes a 25% safety margin following National Electrical Code (NEC) guidelines. This ensures:
        </p>
        <ul>
          <li>Protection coordination with overcurrent devices</li>
          <li>Voltage drop compliance</li>
          <li>Safe thermal capacity with future growth</li>
          <li>Proper grounding and bonding</li>
        </ul>
        <p>
          Wire sizing uses industry-standard AWG (American Wire Gauge) and kcmil (thousand circular mils) ratings based on amperage capacity.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Transformer Sizing Examples">
        <h3>Example 1: Manufacturing Facility</h3>
        <p>
          A facility needs to power equipment with the following:
        </p>
        <ul>
          <li>Primary Voltage: 480V</li>
          <li>Required Power: 150 kW</li>
          <li>Power Factor: 0.9 (inductive load with motors)</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono text-sm mb-2">Calculation:</p>
          <p className="font-mono text-sm">kVA = 150 kW ÷ 0.9 = 166.7 kVA</p>
          <p className="font-mono text-sm">Secondary Current = 166.7 kVA × 1000 ÷ (√3 × 480V) ≈ 200 A</p>
          <p className="text-sm text-gray-600 mt-2">Required: Approximately 167 kVA transformer with 200A secondary, 3/0 AWG wire</p>
        </div>

        <h3>Example 2: Data Center</h3>
        <p>
          A data center requiring precision power:
        </p>
        <ul>
          <li>Primary Voltage: 10 kV</li>
          <li>Required Power: 500 kVA</li>
          <li>Power Factor: 0.98 (well-corrected)</li>
          <li>Cooling Type: ONAF (forced-air with fans)</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono text-sm mb-2">Calculation:</p>
          <p className="font-mono text-sm">Secondary Current = 500 kVA × 1000 ÷ (√3 × 480V) ≈ 601 A</p>
          <p className="font-mono text-sm">Adjusted Capacity = 500 kVA ÷ 1.33 ≈ 376 kVA base rating needed</p>
          <p className="text-sm text-gray-600 mt-2">Required: 500 kVA transformer with ONAF cooling, 600+ kcmil secondary conductors</p>
        </div>

        <h3>Example 3: Utility Distribution Substation</h3>
        <p>
          A substation transformer:
        </p>
        <ul>
          <li>Primary: 69 kV</li>
          <li>Secondary: 13.8 kV</li>
          <li>Secondary Current: 420 A</li>
        </ul>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono text-sm mb-2">Calculation:</p>
          <p className="font-mono text-sm">kVA = √3 × 13,800V × 420A ÷ 1000 ≈ 10,063 kVA (10 MVA)</p>
          <p className="text-sm text-gray-600 mt-2">Required: 10 MVA substation transformer</p>
        </div>
      </SEOSection>

      <SEOSection title="Transformer Sizing Standards and Regulations">
        <p>
          Proper transformer sizing must comply with electrical codes and standards:
        </p>
        <ul>
          <li><strong>NEC (National Electrical Code):</strong> Minimum and recommended conductor sizes, protection requirements</li>
          <li><strong>IEEE Standards:</strong> Transformer loading and cooling calculations</li>
          <li><strong>NEMA (National Electrical Manufacturers Association):</strong> Transformer specifications and ratings</li>
          <li><strong>IEC (International Electrotechnical Commission):</strong> International transformer standards</li>
          <li><strong>Utility Requirements:</strong> Often have specific interconnection and sizing standards</li>
        </ul>
        <p>
          Always consult local electrical codes and your utility provider when sizing transformers for permanent installations.
        </p>
      </SEOSection>

      <SEOSection title="Common Mistakes in Transformer Sizing">
        <ul>
          <li><strong>Ignoring Power Factor:</strong> Using kW instead of kVA can result in undersized transformers</li>
          <li><strong>Not Planning for Growth:</strong> Select a transformer with capacity for future expansion</li>
          <li><strong>Overlooking Cooling Requirements:</strong> Temperature rise limits effective transformer capacity</li>
          <li><strong>Inadequate Wire Sizing:</strong> Secondary conductors must match transformer capacity</li>
          <li><strong>Neglecting Voltage Drop:</strong> Ensure secondary voltage stays within acceptable limits</li>
          <li><strong>Forgetting Harmonics:</strong> Non-linear loads increase effective transformer burden</li>
          <li><strong>Incorrect Phase Configuration:</strong> Mismatched single-phase vs. three-phase connections</li>
        </ul>
      </SEOSection>

      <SEOSection title="Transformer Sizing for Different Applications">
        <h3>Industrial Applications</h3>
        <p>
          Industrial facilities often have large, inductive loads from motors and machinery. Size transformers for peak demand plus 25-30% spare capacity for future equipment.
        </p>

        <h3>Commercial Buildings</h3>
        <p>
          Office buildings and retail spaces have diverse loads (HVAC, lighting, elevators). Use demand factors and diversity calculations to avoid oversizing.
        </p>

        <h3>Residential Areas</h3>
        <p>
          Distribution transformers in residential neighborhoods are typically sized based on the number of homes, with demand factors applied (typically 0.5-0.7 of connected load).
        </p>

        <h3>Data Centers</h3>
        <p>
          Data centers require highly reliable power with multiple transformer configurations. Use ONAF or OFWF cooling types for enhanced thermal performance.
        </p>

        <h3>Utility Substations</h3>
        <p>
          Large power transformers in substations are designed for maximum efficiency and reliability, often with multiple units for redundancy.
        </p>
      </SEOSection>

      <SEOSection title="Transformer Efficiency and Losses">
        <p>
          Modern transformers operate at high efficiency (typically 97-99.5%), but small losses do occur:
        </p>
        <ul>
          <li><strong>Core Losses:</strong> Magnetization energy, independent of load</li>
          <li><strong>Copper Losses:</strong> Resistance heating in windings, proportional to current squared</li>
          <li><strong>Cooling Losses:</strong> Energy used by cooling fans or pumps</li>
        </ul>
        <p>
          High-efficiency transformers reduce operating costs and environmental impact over their 30-40 year service life.
        </p>
      </SEOSection>

      <SEOSection title="Selecting Between Transformer Types">
        <p>
          Different transformer types serve different purposes:
        </p>
        <ul>
          <li><strong>Oil-Immersed Transformers:</strong> Cost-effective for outdoor installations, high capacity, good cooling</li>
          <li><strong>Dry-Type Transformers:</strong> Safe for indoor use, lower fire risk, no maintenance, slightly lower capacity</li>
          <li><strong>Cast-Resin Dry-Type:</strong> Excellent moisture and contamination resistance</li>
          <li><strong>K-Rated Transformers:</strong> Designed to handle non-linear loads (harmonics) from modern electronics</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between kVA and kW for transformer sizing?",
            answer: "kVA (kilovolt-amperes) is apparent power, the total power supplied by the transformer. kW (kilowatts) is real power, the power actually used by resistive loads. The ratio is: kVA = kW ÷ Power Factor. For transformer sizing, you must use kVA, not kW, because the transformer must supply both real and reactive power."
          },
          {
            question: "How do I calculate transformer size if I know the power requirement?",
            answer: "If you know the power in kW and power factor: kVA = kW ÷ Power Factor. Then use the transformer sizing calculator with the voltage to find the secondary current. For example, 100 kW at 0.9 power factor = 111.1 kVA transformer required."
          },
          {
            question: "What is a cooling type code like ONAN or ONAF?",
            answer: "These are IEC standards describing how transformers dissipate heat. The first two letters indicate the cooling medium (OA=Oil/Air, OW=Oil/Water), and the last two describe the circulation method (AN=natural circulation, AF=forced air, WF=forced water). Different cooling types provide different capacity ratings."
          },
          {
            question: "Why should I use a 25% safety margin for wire sizing?",
            answer: "The 25% margin ensures the secondary conductor is sized one size larger than the minimum requirement. This provides margin for temperature rise, future load growth, protection coordination with overcurrent devices, and compliance with the National Electrical Code (NEC 240.4)."
          },
          {
            question: "How does power factor affect transformer sizing?",
            answer: "Power factor represents the portion of apparent power (kVA) that actually does useful work. A lower power factor means more current is needed to deliver the same real power, requiring a larger transformer. Most facilities should maintain power factor above 0.95 for efficiency."
          },
          {
            question: "Can I use an undersized transformer and upgrade later?",
            answer: "Not recommended. Overloaded transformers have reduced lifespan, generate excessive heat, and may create safety hazards. It's better to select a transformer with adequate capacity plus growth allowance (typically 25-30% spare capacity) from the start."
          },
          {
            question: "What's the difference between single-phase and three-phase transformer sizing?",
            answer: "Single-phase: kVA = V × I ÷ 1000. Three-phase: kVA = √3 × V × I ÷ 1000 (where √3 ≈ 1.732). Three-phase systems are more efficient and commonly used in industrial and utility applications."
          },
          {
            question: "How often should transformers be serviced?",
            answer: "Oil-immersed transformers should be inspected annually and oil tested every 3-5 years. Dry-type transformers require less maintenance but should be inspected for cooling airflow obstruction. Regular maintenance prevents failures and extends service life."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Properly sizing a transformer is crucial for safe, efficient, and compliant electrical installations. Our Transformer Sizing Calculator simplifies this process, allowing you to quickly determine transformer capacity, secondary current, and wire requirements based on your specific load parameters.
        </p>
        <p>
          Whether you're designing a new facility, upgrading existing infrastructure, or planning expansion, this calculator provides the foundation for informed decision-making. Remember to consider cooling types, power factor adjustments, and local electrical codes when making final selections.
        </p>
        <p>
          Ready to explore more electrical engineering calculations? Check out our {createInternalLink('kva-calculator', 'kVA Calculator')} for apparent power calculations, or the {createInternalLink('power-factor-calculator', 'Power Factor Calculator')} for detailed power analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
