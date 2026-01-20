import BreakerSizeCalculator from '../../../_components/calculators/BreakerSizeCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

export default function BreakerSizeCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Breaker Size Calculator: Circuit Breaker Selection and Wire Sizing"
      description="Calculate circuit breaker size from load current, wire gauge, and fault current. Free electrical safety calculator for NEC-compliant breaker and wire sizing."
      calculator={<BreakerSizeCalculator />}
      slug="physics/breaker-size-calculator"
      category="Electrical Engineering"
      features={[
        "Calculate required breaker size from load current with derating factors",
        "Determine maximum circuit current from breaker size",
        "Find wire gauge (AWG) from breaker size using NEC tables",
        "Support for copper and aluminum conductors",
        "Calculate fault current from system voltage and impedance",
        "Automatic rounding to standard ANSI breaker sizes (15-500A)",
        "NEC-compliant recommendations for electrical safety"
      ]}
    >
      <SEOSection title="Understanding Circuit Breaker Sizing">
        <p>
          The <strong>Breaker Size Calculator</strong> is an essential tool for electrical engineers, electricians, and anyone responsible for electrical system design and safety. Proper <strong>circuit breaker sizing</strong> is critical to protecting wiring and equipment from overcurrent conditions, preventing electrical fires, and ensuring NEC (National Electrical Code) compliance. A breaker that is too large will not protect the circuit adequately, while an undersized breaker will trip unnecessarily.
        </p>
        <p>
          Circuit breakers protect electrical circuits by automatically interrupting current flow when overcurrent or fault conditions occur. Selecting the correct breaker size requires understanding load current, derating factors, wire ampacity, and system voltage. This calculator performs all necessary conversions and provides NEC-compliant recommendations for safe, code-approved electrical installations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Breaker Size Calculator">
        <p>
          The breaker size calculator offers four flexible calculation methods for electrical circuit design:
        </p>
        <ol>
          <li><strong>Find Breaker Size from Load Current:</strong> Enter load current and derating factor to determine required breaker size. The calculator rounds up to the next standard ANSI breaker size.</li>
          <li><strong>Find Maximum Current from Breaker Size:</strong> Enter breaker size to determine maximum circuit current at which the breaker will trip, providing circuit protection rating.</li>
          <li><strong>Find Wire Size from Breaker Size:</strong> Enter breaker size to determine appropriate wire gauge (AWG) using NEC Table 310 ampacity ratings for copper or aluminum conductors.</li>
          <li><strong>Calculate Fault Current:</strong> Enter system voltage and impedance to determine maximum available fault current, critical for breaker interrupting capacity selection.</li>
        </ol>
        <p>
          Select your calculation method, enter the known values, and click Calculate. The breaker size calculator instantly provides NEC-compliant sizing recommendations with detailed formulas and standard breaker ratings.
        </p>
      </SEOSection>

      <SEOSection title="Circuit Breaker Sizing Formulas">
        <p>
          The breaker size calculator uses electrical engineering formulas for safe circuit design:
        </p>
        
        <h3>1. Breaker Size from Load Current</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Breaker Size = Load Current × Derating Factor</p>
          <p className="text-sm text-gray-600 mt-2">Standard derating factors: 1.0 (100%), 1.25 (125% continuous), 1.33 (133% motors), 1.5 (150% heavy duty)</p>
        </div>
        <p>
          The derating factor accounts for continuous vs. non-continuous loads and protective device characteristics. The 125% factor (1.25) is the NEC standard for continuous loads. The calculated breaker size is rounded up to the next standard ANSI breaker rating.
        </p>

        <h3>2. Maximum Circuit Current from Breaker Rating</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Maximum Current = Breaker Trip Rating</p>
          <p className="text-sm text-gray-600 mt-2">A 40A breaker trips at 40A, providing circuit protection at this current level</p>
        </div>

        <h3>3. Wire Size from Breaker Size</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Wire Size = Ampacity Match from NEC Table 310</p>
          <p className="text-sm text-gray-600 mt-2">Wire ampacity must meet or exceed breaker size for proper protection. Standard 75°C insulation used.</p>
        </div>
        <p>
          Breaker sizes are paired with wire gauges that have ampacity ratings equal to or greater than the breaker rating. This ensures the wire can safely carry the full circuit current before the breaker trips.
        </p>

        <h3>4. Fault Current Calculation</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Fault Current = V / Z</p>
          <p className="text-sm text-gray-600 mt-2">Where: V = System voltage (volts), Z = System impedance (ohms)</p>
        </div>
        <p>
          Fault current is calculated from system voltage divided by the total system impedance. This value determines the breaker interrupting capacity rating required to safely interrupt the maximum available fault current.
        </p>
      </SEOSection>

      <SEOSection title="Standard Breaker Sizes and Wire Gauge Requirements">
        <p>
          The NEC specifies standard breaker sizes and corresponding wire gauges for safe electrical installations:
        </p>
        <table className="w-full border-collapse border border-gray-300 my-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left font-semibold">Breaker Size (A)</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Copper Wire (AWG)</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Aluminum Wire (AWG)</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Typical Applications</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">15</td>
              <td className="border border-gray-300 p-2">14</td>
              <td className="border border-gray-300 p-2">12</td>
              <td className="border border-gray-300 p-2">Lighting circuits, outlets</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">20</td>
              <td className="border border-gray-300 p-2">12</td>
              <td className="border border-gray-300 p-2">10</td>
              <td className="border border-gray-300 p-2">Countertop circuits, general purpose</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">30</td>
              <td className="border border-gray-300 p-2">10</td>
              <td className="border border-gray-300 p-2">8</td>
              <td className="border border-gray-300 p-2">Dryer, water heater 240V</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">50</td>
              <td className="border border-gray-300 p-2">6</td>
              <td className="border border-gray-300 p-2">4</td>
              <td className="border border-gray-300 p-2">Large appliances, sub-panels</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">100</td>
              <td className="border border-gray-300 p-2">1/0</td>
              <td className="border border-gray-300 p-2">2/0</td>
              <td className="border border-gray-300 p-2">Service entrance, main panel</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 p-2">200</td>
              <td className="border border-gray-300 p-2">250 kcmil</td>
              <td className="border border-gray-300 p-2">350 kcmil</td>
              <td className="border border-gray-300 p-2">Main service entrance large buildings</td>
            </tr>
          </tbody>
        </table>
      </SEOSection>

      <SEOSection title="Circuit Breaker Types and Ratings">
        <SEOList
          items={[
            "Standard Thermal-Magnetic Breakers: Most common type, trip on both thermal (overload) and magnetic (fault) conditions",
            "GFCI Breakers: Ground Fault Circuit Interrupter, provides protection against ground faults in wet locations",
            "AFCI Breakers: Arc Fault Circuit Interrupter, detects dangerous arcing conditions that can cause fires",
            "Selective Coordination: Series-rated breakers with time delays allowing selective tripping at fault location",
            "Current Rating: Amperage rating (15A, 20A, 30A, etc.) at which the breaker is designed to trip",
            "Voltage Rating: Maximum voltage the breaker can safely interrupt (120V, 240V, 480V three-phase)",
            "Interrupting Capacity: Maximum available fault current the breaker can safely interrupt",
            "Instantaneous Trip: Breaker trips immediately on very high fault currents (short circuits)",
            "Thermal Overload: Breaker trips after time delay on sustained overcurrent (overload condition)",
            "Inverse Time Characteristic: Trip time decreases with increasing current (time-inverse response)"
          ]}
        />
      </SEOSection>

      <SEOSection title="Breaker Size Calculator Examples">
        <h3>Example 1: Breaker Size for Residential 240V Dryer</h3>
        <p>
          A 240V electric dryer with 4,800W nameplate rating requires a circuit breaker. Calculate the required breaker size using standard NEC 125% derating factor.
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> Load Current = 4,800W / 240V = 20A. Breaker Size = 20A × 1.25 = 25A → Next standard size is 30A breaker.
        </p>
        <p>
          A 30A breaker is selected, requiring 10 AWG copper wire. This provides margin for safety and inrush current during startup.
        </p>

        <h3>Example 2: Wire Size for 50A Circuit</h3>
        <p>
          An electrician needs to install a 50A circuit for a subpanel or large equipment. What wire gauge is required for copper conductor at 75°C?
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> From NEC Table 310: A 50A breaker requires 6 AWG copper conductor (rated 65A at 75°C), meeting the safety requirement.
        </p>
        <p>
          The 6 AWG wire has ampacity of 65A, exceeding the 50A breaker rating and protecting the circuit from overheating.
        </p>

        <h3>Example 3: Fault Current Calculation for System Protection</h3>
        <p>
          A 480V three-phase system with 0.5 ohms impedance requires fault current calculation to select proper breaker interrupting capacity.
        </p>
        <p className="bg-blue-50 p-4 rounded-lg my-2">
          <strong>Solution:</strong> Fault Current = 480V / 0.5Ω = 960A. The breaker must have interrupting capacity rating of at least 960A to safely interrupt this fault current.
        </p>
        <p>
          This high fault current requires a heavy-duty breaker with sufficient interrupting capacity for industrial safety.
        </p>
      </SEOSection>

      <SEOSection title="Derating Factors and Load Types">
        <h3>Continuous vs. Non-Continuous Loads</h3>
        <p>
          The NEC distinguishes between continuous loads (operate 3+ hours) and non-continuous loads. Continuous loads require the 125% derating factor (breaker sized to 125% of load current), while non-continuous loads can use standard breaker sizing. Most residential circuits are considered continuous.
        </p>

        <h3>Motor Load Derating</h3>
        <p>
          Motors require special consideration because of inrush current during startup. Motor branch circuit breakers are typically sized at 125-150% of motor full-load current, depending on the motor type and starting method. This prevents nuisance tripping on normal startup transients.
        </p>

        <h3>Mixed Loads</h3>
        <p>
          Circuits with both continuous and non-continuous loads require special calculation. The continuous load contribution uses 125% derating, while non-continuous loads use 100%. Total breaker size is the sum of both contributions.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: "What is the correct breaker size for a 30A load?",
            answer: "For continuous loads, apply the NEC 125% derating factor: 30A × 1.25 = 37.5A. Round up to the next standard breaker size: 40A. Non-continuous loads can use a 30A breaker directly."
          },
          {
            question: "Can I use a larger breaker to prevent nuisance trips?",
            answer: "No. Oversizing a breaker reduces circuit protection and increases fire risk. If a 20A breaker keeps tripping, add a circuit instead of increasing breaker size. Verify the wire and load are properly designed for the required current."
          },
          {
            question: "What does GFCI protection mean?",
            answer: "GFCI (Ground Fault Circuit Interrupter) detects when current leaks to ground and trips the breaker within milliseconds, preventing electrocution. GFCI breakers protect bathrooms, kitchens, outdoor outlets, and any wet location per NEC requirements."
          },
          {
            question: "Why does wire size matter if the breaker provides protection?",
            answer: "Wire carries current from the breaker to the load. If wire is too small, it can overheat and melt before the breaker trips, causing a fire. Wire must have ampacity equal to or greater than the breaker size rating."
          },
          {
            question: "What is interrupting capacity and why is it important?",
            answer: "Interrupting capacity is the maximum fault current a breaker can safely interrupt without being damaged. Using a breaker with insufficient interrupting capacity can cause the breaker to explode or fail to interrupt a short circuit, creating a fire hazard."
          },
          {
            question: "How is three-phase system voltage different in breaker sizing?",
            answer: "Three-phase systems distribute power differently than single-phase. For three-phase motors and equipment, use: I = P / (√3 × V × PF). The breaker is then sized at 125-150% of this current depending on load type and code requirements."
          }
        ]}
      />

      <SEOSection title="NEC Compliance and Safety">
        <p>
          Proper breaker sizing is mandated by the National Electrical Code (NEC) and local electrical codes to ensure safety. All circuits must have overcurrent protection rated at or above the load current, but not exceeding the wire ampacity. Violations can result in unsafe conditions, permit failures, and liability issues. Always consult the NEC and local authorities for specific applications, and have professional electricians verify critical installations.
        </p>
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The <strong>Breaker Size Calculator</strong> is an indispensable tool for electrical system design, safety compliance, and code-approved installations. By understanding proper breaker sizing, wire selection, and fault current calculations, electrical professionals and facility managers can design circuits that protect equipment and personnel while ensuring NEC compliance. Whether you are designing a residential electrical system, industrial facility, or commercial installation, this calculator provides the precise engineering calculations needed for safe, code-compliant electrical protection.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
