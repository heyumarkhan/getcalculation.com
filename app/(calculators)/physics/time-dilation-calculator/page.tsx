import TimeDilationCalculator from '../../../_components/calculators/TimeDilationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function TimeDilationCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Time Dilation Calculator: Calculate Relativistic Time (Δt = Δt₀/√(1-v²/c²))"
      description="Calculate time dilation using special relativity: Δt = Δt₀ / √(1 - v²/c²). Free online relativity calculator for proper time, dilated time, and velocity calculations."
      calculator={<TimeDilationCalculator />}
      slug="physics/time-dilation-calculator"
      category="Relativity"
      features={[
        "Calculate dilated time from proper time and velocity",
        "Calculate proper time from dilated time and velocity",
        "Calculate velocity from proper time and dilated time",
        "Lorentz factor (γ) calculation",
        "Comprehensive unit conversion",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Time Dilation: Special Relativity">
        <p>
          Time dilation is one of the most fascinating consequences of Einstein&apos;s special theory of relativity. It describes how time passes at different rates for observers moving relative to each other. Our Time Dilation Calculator makes it easy to calculate relativistic time effects using the formula: <strong>Δt = Δt₀ / √(1 - v²/c²)</strong>.
        </p>
        <p>
          Whether you&apos;re studying special relativity, analyzing particle physics experiments, or understanding GPS satellite corrections, this calculator simplifies time dilation calculations with support for multiple units and comprehensive explanations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Time Dilation Calculator">
        <p>
          Our Time Dilation Calculator is designed for simplicity and accuracy. Follow these steps:
        </p>
        <ol>
          <li><strong>Enter Two Values:</strong> Input any two of the three values (proper time, dilated time, or velocity)</li>
          <li><strong>Leave One Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for time and velocity</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value with step-by-step solutions</li>
          <li><strong>View Lorentz Factor:</strong> The calculator displays the Lorentz factor (γ) showing the time dilation effect</li>
        </ol>
        <p>
          The calculator uses the formula: <strong>Δt = Δt₀ / √(1 - v²/c²)</strong>, where c = 299,792,458 m/s (speed of light).
        </p>
      </SEOSection>

      <SEOSection title="Understanding Time Dilation Formula">
        <p>
          Time dilation is expressed as:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">Δt = Δt₀ / √(1 - v²/c²)</p>
          <p className="text-sm text-gray-600 mt-2">Where: Δt = Dilated time, Δt₀ = Proper time, v = Velocity, c = Speed of light</p>
        </div>

        <h3>Key Components</h3>
        <ul>
          <li><strong>Proper Time (Δt₀):</strong> Time measured in the rest frame of the moving object (the frame where the object is at rest)</li>
          <li><strong>Dilated Time (Δt):</strong> Time measured by an observer in a different inertial frame (moving relative to the object)</li>
          <li><strong>Velocity (v):</strong> The relative velocity between the two reference frames</li>
          <li><strong>Speed of Light (c):</strong> c = 299,792,458 m/s, the universal speed limit</li>
          <li><strong>Lorentz Factor (γ):</strong> γ = 1 / √(1 - v²/c²), quantifies the time dilation effect</li>
        </ul>

        <h3>Key Principles</h3>
        <ul>
          <li><strong>Time Slows Down:</strong> Moving clocks run slower than stationary clocks</li>
          <li><strong>Relative Effect:</strong> Time dilation is relative—each observer sees the other&apos;s clock running slow</li>
          <li><strong>Speed Limit:</strong> Velocity must be less than the speed of light (v &lt; c)</li>
          <li><strong>Symmetry:</strong> The effect is symmetric—both observers see the other&apos;s time dilated</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Time dilation calculations are essential in numerous real-world scenarios:
        </p>
        <SEOList items={[
          "GPS Satellites: Accounting for relativistic time effects in satellite clocks",
          "Particle Physics: Understanding muon decay rates at high speeds",
          "Space Travel: Calculating time differences for high-speed spacecraft",
          "Particle Accelerators: Analyzing particle lifetimes at relativistic speeds",
          "Astrophysics: Understanding time effects near massive objects",
          "Experimental Physics: Verifying special relativity predictions",
          "Atomic Clocks: Precision timekeeping in different reference frames",
          "Cosmic Rays: Analyzing high-energy particle behavior",
          "Relativistic Jets: Understanding astrophysical phenomena",
          "Time Synchronization: Precise timing in global positioning systems"
        ]} />
      </SEOSection>

      <SEOSection title="Lorentz Factor (γ)">
        <p>
          The Lorentz factor (γ) is a fundamental quantity in special relativity:
        </p>
        <ul>
          <li><strong>Formula:</strong> γ = 1 / √(1 - v²/c²)</li>
          <li><strong>Range:</strong> γ ≥ 1 (equals 1 when v = 0, approaches infinity as v approaches c)</li>
          <li><strong>Time Dilation:</strong> Δt = γ × Δt₀</li>
          <li><strong>Physical Meaning:</strong> γ represents how much time is dilated at a given velocity</li>
        </ul>
        <p>
          <strong>Examples:</strong>
        </p>
        <ul>
          <li>At v = 0.1c (10% speed of light): γ ≈ 1.005</li>
          <li>At v = 0.5c (50% speed of light): γ ≈ 1.155</li>
          <li>At v = 0.9c (90% speed of light): γ ≈ 2.294</li>
          <li>At v = 0.99c (99% speed of light): γ ≈ 7.089</li>
          <li>At v = 0.999c (99.9% speed of light): γ ≈ 22.366</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Time Dilation Calculations">
        <h3>Example 1: Spacecraft Time Dilation</h3>
        <p>A spacecraft travels at 0.8c for 1 year (proper time). How much time passes on Earth?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">γ = 1 / √(1 - (0.8c)²/c²) = 1 / √(1 - 0.64) = 1 / √0.36 = 1.667</p>
          <p className="font-mono">Δt = γ × Δt₀ = 1.667 × 1 year = 1.667 years</p>
          <p className="font-mono">Earth observers see 1.667 years pass while the spacecraft experiences 1 year</p>
        </div>

        <h3>Example 2: Muon Decay</h3>
        <p>Muons at rest decay in 2.2 μs. At 0.99c, how long do they appear to live?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">γ = 1 / √(1 - (0.99)²) = 1 / √(1 - 0.9801) = 7.089</p>
          <p className="font-mono">Δt = 7.089 × 2.2 μs = 15.6 μs</p>
          <p className="font-mono">Muons appear to live 7 times longer at high speeds</p>
        </div>

        <h3>Example 3: Finding Velocity</h3>
        <p>A clock on a moving object shows 1 hour while Earth clocks show 1.5 hours. What is the velocity?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">γ = Δt / Δt₀ = 1.5 / 1 = 1.5</p>
          <p className="font-mono">1.5 = 1 / √(1 - v²/c²)</p>
          <p className="font-mono">√(1 - v²/c²) = 1/1.5 = 0.667</p>
          <p className="font-mono">1 - v²/c² = 0.444</p>
          <p className="font-mono">v²/c² = 0.556</p>
          <p className="font-mono">v = 0.745c (74.5% speed of light)</p>
        </div>

        <h3>Example 4: GPS Satellite Correction</h3>
        <p>GPS satellites orbit at about 20,200 km altitude with orbital speed of 3.87 km/s. Calculate the time dilation effect.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = 3.87 km/s = 3,870 m/s</p>
          <p className="font-mono">v/c = 3,870 / 299,792,458 = 1.29 × 10⁻⁵</p>
          <p className="font-mono">γ ≈ 1 + 0.5 × (v/c)² = 1 + 8.3 × 10⁻¹¹</p>
          <p className="font-mono">Time runs faster by about 38 microseconds per day (special relativity effect)</p>
        </div>
      </SEOSection>

      <SEOSection title="Special Relativity Principles">
        <p>
          Time dilation is based on two fundamental postulates of special relativity:
        </p>
        <ul>
          <li><strong>Principle of Relativity:</strong> The laws of physics are the same in all inertial reference frames</li>
          <li><strong>Constancy of Light Speed:</strong> The speed of light in vacuum is constant (c = 299,792,458 m/s) for all observers, regardless of their motion</li>
        </ul>
        <p>
          <strong>Key Consequences:</strong>
        </p>
        <ul>
          <li>Time dilation: Moving clocks run slow</li>
          <li>Length contraction: Moving objects appear shorter</li>
          <li>Relativistic mass increase: Mass increases with velocity</li>
          <li>Relativity of simultaneity: Events simultaneous in one frame may not be in another</li>
        </ul>
      </SEOSection>

      <SEOSection title="Units and Conversions">
        <p>
          Understanding time and velocity units is crucial for accurate calculations:
        </p>
        <ul>
          <li><strong>Time Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Second (s): Base SI unit</li>
              <li>Millisecond (ms): 1 ms = 0.001 s</li>
              <li>Microsecond (μs): 1 μs = 10⁻⁶ s</li>
              <li>Nanosecond (ns): 1 ns = 10⁻⁹ s</li>
              <li>Minute (min): 1 min = 60 s</li>
              <li>Hour (h): 1 h = 3,600 s</li>
              <li>Day (d): 1 d = 86,400 s</li>
              <li>Year (y): 1 y ≈ 31,536,000 s</li>
            </ul>
          </li>
          <li><strong>Velocity Units:</strong>
            <ul className="ml-4 mt-1">
              <li>Meters per second (m/s): Base SI unit</li>
              <li>Kilometers per second (km/s): 1 km/s = 1,000 m/s</li>
              <li>Kilometers per hour (km/h): 1 km/h = 0.2778 m/s</li>
              <li>Miles per hour (mph): 1 mph = 0.447 m/s</li>
              <li>Speed of light (c): c = 299,792,458 m/s</li>
            </ul>
          </li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is time dilation?",
            answer: "Time dilation is a relativistic effect where time passes slower for objects moving at high speeds relative to an observer. The formula is Δt = Δt₀ / √(1 - v²/c²), where Δt is dilated time, Δt₀ is proper time, v is velocity, and c is the speed of light. Moving clocks run slower than stationary clocks."
          },
          {
            question: "How do I calculate time dilation?",
            answer: "Use the formula Δt = Δt₀ / √(1 - v²/c²). For example, if proper time is 1 hour and velocity is 0.8c: γ = 1 / √(1 - 0.64) = 1.667, so Δt = 1.667 × 1 hour = 1.667 hours. The dilated time is always greater than or equal to proper time."
          },
          {
            question: "What is the Lorentz factor?",
            answer: "The Lorentz factor (γ) is γ = 1 / √(1 - v²/c²). It quantifies time dilation and length contraction effects. At rest (v = 0), γ = 1. As velocity approaches the speed of light, γ approaches infinity. Time dilation is Δt = γ × Δt₀."
          },
          {
            question: "Can velocity exceed the speed of light?",
            answer: "No, according to special relativity, nothing with mass can reach or exceed the speed of light (c = 299,792,458 m/s). As velocity approaches c, the Lorentz factor approaches infinity, requiring infinite energy. This is why c is called the universal speed limit."
          },
          {
            question: "Is time dilation real or just theoretical?",
            answer: "Time dilation is a real, experimentally verified effect. GPS satellites must account for relativistic time effects. Particle accelerators observe muons living longer at high speeds. Atomic clocks on airplanes show measurable time differences. These effects are small at everyday speeds but significant at relativistic velocities."
          },
          {
            question: "What is the difference between proper time and dilated time?",
            answer: "Proper time (Δt₀) is time measured in the rest frame of the moving object—the frame where the object is at rest. Dilated time (Δt) is time measured by an observer in a different inertial frame moving relative to the object. Dilated time is always greater than or equal to proper time."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding time dilation is fundamental to special relativity, particle physics, and modern technology like GPS. Our Time Dilation Calculator simplifies these calculations, making it easy to determine relativistic time effects, velocities, and Lorentz factors in various applications.
        </p>
        <p>
          Ready to explore more physics concepts? Check out our other calculators like the {createInternalLink('force-calculator', 'Force Calculator')} for Newtonian mechanics, or the {createInternalLink('wavelength-to-frequency-calculator', 'Wavelength to Frequency Calculator')} for wave physics that complement relativistic analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

