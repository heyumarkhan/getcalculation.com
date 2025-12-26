import SpeedOfLightCalculator from '../../../_components/calculators/SpeedOfLightCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SpeedOfLightCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Speed of Light Calculator: Calculate Light Distance & Travel Time"
      description="Calculate distance traveled by light or time for light to travel a distance using the speed of light constant (c = 299,792,458 m/s). Free online physics calculator for optics, relativity, and electromagnetic calculations."
      calculator={<SpeedOfLightCalculator />}
      slug="physics/speed-of-light-calculator"
      category="Optics"
      features={[
        "Calculate distance traveled by light",
        "Calculate time for light to travel",
        "Multiple unit support (meters, kilometers, light years, etc.)",
        "Instant physics calculations",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding the Speed of Light: A Fundamental Constant">
        <p>
          The speed of light is one of the most important constants in physics, denoted by the symbol <strong>c</strong>. In a vacuum, light travels at exactly <strong>299,792,458 meters per second</strong> (approximately 186,282 miles per second). This constant is fundamental to our understanding of physics, appearing in Einstein&apos;s theory of relativity and countless other equations.
        </p>
        <p>
          The speed of light is not just the speed at which visible light travels—it&apos;s the universal speed limit for all electromagnetic radiation, including radio waves, microwaves, infrared, ultraviolet, X-rays, and gamma rays. Nothing in the universe can travel faster than light in a vacuum, making it a cornerstone of modern physics.
        </p>
        <p>
          Our Speed of Light Calculator makes it easy to calculate how far light travels in a given time, or how long it takes light to travel a specific distance. This is essential for understanding astronomical distances, communication delays, and the fundamental nature of space and time.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Speed of Light Calculator">
        <p>
          Our Speed of Light Calculator is designed for simplicity and accuracy. Follow these steps to get your calculation:
        </p>
        <ol>
          <li><strong>Enter One Value:</strong> Input either the distance light travels or the time it takes</li>
          <li><strong>Leave the Other Empty:</strong> Leave the value you want to calculate empty</li>
          <li><strong>Select Units:</strong> Choose your preferred units for distance and time</li>
          <li><strong>Click Calculate:</strong> The calculator will instantly compute the missing value using the speed of light constant</li>
        </ol>
        <p>
          The calculator uses the fundamental relationship: <strong>Distance = Speed of Light × Time</strong> or <strong>Time = Distance ÷ Speed of Light</strong>
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Speed of Light Formula">
        <p>
          The speed of light formula is straightforward but profound:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">c = 299,792,458 m/s</p>
          <p className="text-sm text-gray-600 mt-2">Where: c = Speed of light in vacuum</p>
        </div>
        
        <h3>Calculating Distance</h3>
        <p>To find how far light travels in a given time:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono"><strong>Distance = c × Time</strong></p>
          <p className="text-sm text-gray-600 mt-2">Distance = 299,792,458 m/s × Time</p>
        </div>

        <h3>Calculating Time</h3>
        <p>To find how long it takes light to travel a distance:</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono"><strong>Time = Distance ÷ c</strong></p>
          <p className="text-sm text-gray-600 mt-2">Time = Distance ÷ 299,792,458 m/s</p>
        </div>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>The speed of light has countless practical applications:</p>
        <SEOList items={[
          "Astronomy: Calculating distances to stars and galaxies using light-years",
          "Telecommunications: Understanding signal delays in satellite communications and fiber optics",
          "GPS Systems: Accounting for relativistic time dilation in satellite navigation",
          "Particle Physics: Understanding particle behavior at near-light speeds",
          "Space Exploration: Calculating communication delays with spacecraft",
          "Medical Imaging: Using light speed in laser and optical technologies",
          "Quantum Computing: Fundamental to quantum mechanics and information theory"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>Our calculator supports various units for distance and time:</p>
        <h3>Distance Units:</h3>
        <ul>
          <li><strong>Meters (m):</strong> Base SI unit</li>
          <li><strong>Kilometers (km):</strong> 1 km = 1,000 m</li>
          <li><strong>Light Years (ly):</strong> Distance light travels in one year ≈ 9.461 × 10¹⁵ m</li>
          <li><strong>Astronomical Units (AU):</strong> Average distance from Earth to Sun ≈ 1.496 × 10¹¹ m</li>
          <li><strong>Miles, Feet, Inches:</strong> Imperial units for everyday calculations</li>
        </ul>
        <h3>Time Units:</h3>
        <ul>
          <li><strong>Seconds (s):</strong> Base SI unit</li>
          <li><strong>Milliseconds, Microseconds, Nanoseconds:</strong> For very short time intervals</li>
          <li><strong>Minutes, Hours, Days, Years:</strong> For longer time periods</li>
        </ul>
        <p>
          <strong>Tip:</strong> Light travels approximately 300,000 kilometers per second, or about 7.5 times around Earth in one second!
        </p>
      </SEOSection>

      <SEOSection title="Common Speed of Light Calculations">
        <h3>Example 1: Light Travel Time to the Moon</h3>
        <p>The average distance from Earth to the Moon is approximately 384,400 km. How long does it take light to travel this distance?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Time = Distance ÷ Speed of Light</p>
          <p className="font-mono">Time = 384,400 km ÷ 299,792.458 km/s</p>
          <p className="font-mono">Time ≈ 1.28 seconds</p>
        </div>
        <p>Light takes about 1.28 seconds to travel from Earth to the Moon!</p>

        <h3>Example 2: Distance Light Travels in One Year</h3>
        <p>How far does light travel in one year?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Distance = Speed of Light × Time</p>
          <p className="font-mono">Distance = 299,792,458 m/s × 31,536,000 s</p>
          <p className="font-mono">Distance ≈ 9.461 × 10¹⁵ meters = 1 light-year</p>
        </div>
        <p>This is the definition of a light-year: the distance light travels in one year.</p>

        <h3>Example 3: Light Travel Time to the Sun</h3>
        <p>The average distance from Earth to the Sun is 1 Astronomical Unit (AU) ≈ 149.6 million km. How long does sunlight take to reach Earth?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Time = 149,600,000 km ÷ 299,792.458 km/s</p>
          <p className="font-mono">Time ≈ 499 seconds ≈ 8.3 minutes</p>
        </div>
        <p>Sunlight takes approximately 8 minutes and 20 seconds to travel from the Sun to Earth!</p>
      </SEOSection>

      <SEOSection title="The Speed of Light in Different Contexts">
        <h3>In Vacuum vs. In Matter</h3>
        <p>
          While the speed of light in vacuum is constant at 299,792,458 m/s, light travels slower when passing through matter:
        </p>
        <ul>
          <li><strong>Air:</strong> Approximately 299,700,000 m/s (slightly slower than vacuum)</li>
          <li><strong>Water:</strong> Approximately 225,000,000 m/s (about 75% of vacuum speed)</li>
          <li><strong>Glass:</strong> Approximately 200,000,000 m/s (about 67% of vacuum speed)</li>
          <li><strong>Diamond:</strong> Approximately 124,000,000 m/s (about 41% of vacuum speed)</li>
        </ul>
        <p>
          Our calculator uses the speed of light in vacuum, which is the fundamental constant. For calculations involving light in matter, you would need to account for the refractive index of the material.
        </p>
      </SEOSection>

      <SEOSection title="Einstein&apos;s Theory of Relativity">
        <p>
          The speed of light plays a crucial role in Einstein&apos;s theory of special relativity:
        </p>
        <ul>
          <li><strong>Universal Speed Limit:</strong> Nothing can travel faster than the speed of light in vacuum</li>
          <li><strong>Time Dilation:</strong> Time passes slower for objects moving at high speeds relative to an observer</li>
          <li><strong>Length Contraction:</strong> Objects appear shorter in the direction of motion at high speeds</li>
          <li><strong>Mass-Energy Equivalence:</strong> E = mc², where c is the speed of light</li>
        </ul>
        <p>
          These effects become significant only at speeds approaching the speed of light, but they&apos;re essential for understanding GPS satellites, particle accelerators, and the behavior of the universe at large scales.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the exact speed of light?",
            answer: "The speed of light in vacuum is exactly 299,792,458 meters per second. This value is now defined as a constant in the International System of Units (SI), and the meter is actually defined in terms of the speed of light."
          },
          {
            question: "Can anything travel faster than the speed of light?",
            answer: "According to Einstein's theory of special relativity, nothing with mass can travel at or faster than the speed of light in vacuum. This is a fundamental limit of the universe. However, light itself travels slower when passing through matter due to interactions with atoms."
          },
          {
            question: "How far does light travel in one second?",
            answer: "Light travels approximately 299,792,458 meters (about 186,282 miles) in one second. This is roughly equivalent to 7.5 times around the Earth's equator, or about the distance from Earth to the Moon in 1.28 seconds."
          },
          {
            question: "What is a light-year?",
            answer: "A light-year is the distance that light travels in one year, approximately 9.461 × 10¹⁵ meters or about 5.879 trillion miles. It's commonly used in astronomy to measure vast distances between stars and galaxies."
          },
          {
            question: "How long does it take light to travel from the Sun to Earth?",
            answer: "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth. This means when you look at the Sun (never look directly!), you're seeing it as it appeared about 8 minutes ago."
          },
          {
            question: "Why is the speed of light constant?",
            answer: "The speed of light is constant in vacuum because it's a fundamental property of the electromagnetic field. This constancy is a cornerstone of Einstein's theory of relativity and has been verified through countless experiments. The speed of light being constant leads to the remarkable consequences of time dilation and length contraction at high speeds."
          },
          {
            question: "How is the speed of light measured?",
            answer: "Historically, the speed of light was measured using various methods including astronomical observations, rotating mirrors, and interferometry. Today, the speed of light is defined as exactly 299,792,458 m/s, and the meter is defined in terms of this constant, making it a fundamental definition rather than a measurement."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The speed of light is one of the most fundamental constants in physics, connecting space and time in ways that continue to amaze scientists and students alike. Our Speed of Light Calculator makes it easy to explore these relationships, whether you&apos;re calculating astronomical distances, understanding communication delays, or simply curious about how fast light travels.
        </p>
        <p>
          Ready to explore more physics concepts? Check out our other calculators for related topics, such as our {createInternalLink('wavelength-to-energy-calculator', 'Wavelength to Energy Calculator')} for quantum mechanics, or our {createInternalLink('velocity-calculator', 'Velocity Calculator')} for general motion calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

