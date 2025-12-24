import LightningDistanceCalculator from '../../../_components/calculators/LightningDistanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function LightningDistanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Lightning Distance Calculator: Calculate Distance to Lightning Strike"
      description="Calculate distance to lightning strike from time delay between flash and thunder. Free online physics calculator using d = v × t with speed of sound calculations."
      calculator={<LightningDistanceCalculator />}
      slug="physics/lightning-distance-calculator"
      category="Waves"
      features={[
        "Calculate distance to lightning from time delay",
        "Calculate time delay from distance",
        "Customizable speed of sound",
        "Multiple unit conversions (m, km, ft, mi, s, ms, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Lightning Distance: Measuring Storm Distance">
        <p>
          Calculating the distance to a lightning strike is a practical application of physics that uses the difference in speed between light and sound. Since light travels much faster than sound (approximately 300,000 km/s vs. 343 m/s), we see the lightning flash almost instantly, but hear the thunder after a delay. Our Lightning Distance Calculator makes it easy to calculate the distance to a lightning strike using the formula: <strong>d = v × t</strong>, where d is distance, v is the speed of sound, and t is the time delay between seeing the flash and hearing the thunder.
        </p>
        <p>
          This simple calculation is not only educational but also practical for safety during thunderstorms. Knowing how far away lightning is can help you determine if a storm is approaching or moving away, and when it&apos;s time to seek shelter.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Lightning Distance Calculator">
        <p>
          Our Lightning Distance Calculator is simple and straightforward:
        </p>
        <ol>
          <li><strong>Count the Time Delay:</strong> When you see a lightning flash, start counting seconds until you hear the thunder</li>
          <li><strong>Enter Time Delay:</strong> Input the number of seconds (or milliseconds) between the flash and thunder</li>
          <li><strong>Set Speed of Sound:</strong> Optionally adjust the speed of sound (default: 343 m/s at sea level, 20°C)</li>
          <li><strong>Select Units:</strong> Choose your preferred units for distance and time</li>
          <li><strong>Calculate:</strong> Click Calculate to get the distance to the lightning strike</li>
        </ol>
        <p>
          Alternatively, you can enter a known distance to calculate the expected time delay. The calculator provides instant results with step-by-step calculations.
        </p>
      </SEOSection>

      <SEOSection title="Understanding the Lightning Distance Formula">
        <p>
          The lightning distance formula is based on the speed of sound:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">d = v × t</p>
          <p className="text-sm text-gray-600 mt-2">Where: d = distance, v = speed of sound, t = time delay</p>
        </div>
        
        <h3>Why This Works</h3>
        <ul>
          <li><strong>Light Speed:</strong> Light travels at approximately 300,000 km/s, so we see the lightning flash almost instantly regardless of distance</li>
          <li><strong>Sound Speed:</strong> Sound travels at approximately 343 m/s (at sea level, 20°C), much slower than light</li>
          <li><strong>Time Delay:</strong> The delay between flash and thunder represents the time sound takes to travel from the lightning strike to your location</li>
          <li><strong>Distance Calculation:</strong> Since we know the speed of sound and measure the time, we can calculate distance</li>
        </ul>

        <h3>Speed of Sound</h3>
        <p>
          The speed of sound varies with temperature and altitude:
        </p>
        <ul>
          <li><strong>At sea level, 20°C:</strong> 343 m/s (1,125 ft/s)</li>
          <li><strong>At sea level, 0°C:</strong> 331 m/s (1,086 ft/s)</li>
          <li><strong>At sea level, 30°C:</strong> 349 m/s (1,145 ft/s)</li>
          <li><strong>Formula:</strong> v ≈ 331 + (0.6 × T) m/s, where T is temperature in Celsius</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Lightning distance calculations are used in various practical scenarios:
        </p>
        <SEOList items={[
          "Weather Safety: Determining if a thunderstorm is approaching or moving away",
          "Outdoor Activities: Making safety decisions during camping, hiking, and sports",
          "Aviation: Pilots calculating storm distances for flight safety",
          "Marine Navigation: Sailors and boaters assessing storm proximity",
          "Education: Teaching the difference between light and sound speeds",
          "Emergency Preparedness: Making informed decisions about seeking shelter",
          "Meteorology: Understanding storm movement and development",
          "Photography: Timing shots during lightning storms",
          "Research: Studying lightning behavior and storm patterns"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Lightning distance calculations use various units:
        </p>
        <ul>
          <li><strong>Distance:</strong> m (Meters), km (Kilometers), cm (Centimeters), ft (Feet), mi (Miles), yd (Yards)</li>
          <li><strong>Time:</strong> s (Seconds), ms (Milliseconds)</li>
          <li><strong>Speed:</strong> m/s (Meters/second), ft/s (Feet/second), km/h (Kilometers/hour), mph (Miles/hour)</li>
        </ul>
        <p>
          <strong>Common Conversions:</strong>
        </p>
        <ul>
          <li>1 km = 0.621 miles</li>
          <li>1 mile = 1.609 km</li>
          <li>1 meter = 3.281 feet</li>
          <li>Speed of sound: 343 m/s = 1,125 ft/s = 1,235 km/h</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Lightning Distance Calculations">
        <h3>Example 1: 5 Second Delay</h3>
        <p>You see lightning and hear thunder 5 seconds later. How far away is the lightning?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">t = 5 s, v = 343 m/s</p>
          <p className="font-mono">d = v × t = 343 m/s × 5 s = 1,715 m = 1.715 km</p>
          <p className="font-mono">In miles: 1.715 km × 0.621 = 1.06 miles</p>
        </div>

        <h3>Example 2: 10 Second Delay</h3>
        <p>A lightning strike produces thunder heard 10 seconds after the flash. Calculate the distance.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">t = 10 s, v = 343 m/s</p>
          <p className="font-mono">d = v × t = 343 m/s × 10 s = 3,430 m = 3.43 km</p>
          <p className="font-mono">In miles: 3.43 km × 0.621 = 2.13 miles</p>
        </div>

        <h3>Example 3: Quick Estimation Rule</h3>
        <p>Using the rule of thumb: divide seconds by 3 to get kilometers, or multiply by 340 to get meters.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">For 6 seconds:</p>
          <p className="font-mono">Quick estimate: 6 ÷ 3 = 2 km (actual: 2.058 km)</p>
          <p className="font-mono">Or: 6 × 340 = 2,040 m (actual: 2,058 m)</p>
        </div>
      </SEOSection>

      <SEOSection title="Safety Guidelines">
        <p>
          Understanding lightning distance is important for safety:
        </p>
        <ul>
          <li><strong>30-30 Rule:</strong> If time delay is 30 seconds or less (about 10 km or 6 miles), seek immediate shelter</li>
          <li><strong>Wait Time:</strong> Wait at least 30 minutes after the last lightning/thunder before resuming outdoor activities</li>
          <li><strong>Approaching Storms:</strong> If time delays are decreasing, the storm is getting closer</li>
          <li><strong>Moving Away:</strong> If time delays are increasing, the storm is moving away</li>
          <li><strong>Safe Distance:</strong> Lightning can strike up to 10 miles (16 km) from a storm, so don&apos;t rely solely on distance calculations</li>
        </ul>
      </SEOSection>

      <SEOSection title="Factors Affecting Speed of Sound">
        <p>
          Several factors affect the speed of sound, which impacts distance calculations:
        </p>
        <ul>
          <li><strong>Temperature:</strong> Sound travels faster in warmer air (v ≈ 331 + 0.6T m/s, where T is in Celsius)</li>
          <li><strong>Altitude:</strong> Higher altitudes have lower air density, slightly affecting sound speed</li>
          <li><strong>Humidity:</strong> Higher humidity slightly increases sound speed</li>
          <li><strong>Wind:</strong> Wind can affect sound propagation, but for short distances the effect is minimal</li>
          <li><strong>Air Pressure:</strong> Changes in atmospheric pressure have minimal effect on sound speed</li>
        </ul>
        <p>
          For most practical purposes, using 343 m/s (or the simple rule of dividing seconds by 3 for kilometers) provides accurate enough results.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Why is there a delay between seeing lightning and hearing thunder?",
            answer: "Light travels at approximately 300,000 km/s, so we see the lightning flash almost instantly. Sound travels much slower at about 343 m/s, so there's a measurable delay. The time delay represents how long sound takes to travel from the lightning strike to your location."
          },
          {
            question: "What is the rule of thumb for calculating lightning distance?",
            answer: "A simple rule is to divide the time in seconds by 3 to get the approximate distance in kilometers, or multiply by 340 to get meters. For example, 6 seconds ≈ 2 km. This is based on sound speed of approximately 340 m/s."
          },
          {
            question: "How accurate is the lightning distance calculation?",
            answer: "The calculation is reasonably accurate for distances up to about 20 km. Beyond that, factors like atmospheric conditions, wind, and the fact that lightning can occur at different heights can affect accuracy. For safety purposes, the calculation provides a good estimate."
          },
          {
            question: "Does temperature affect the calculation?",
            answer: "Yes, sound speed increases with temperature. At 0°C, sound travels at 331 m/s, while at 30°C it travels at 349 m/s. For most practical purposes, using 343 m/s (20°C) provides good accuracy. Our calculator allows you to adjust the speed of sound for different conditions."
          },
          {
            question: "Can I calculate time delay from a known distance?",
            answer: "Yes, you can enter a known distance and the calculator will calculate the expected time delay using the formula t = d/v. This is useful for understanding how long you should expect to wait between flash and thunder at a given distance."
          },
          {
            question: "How far can lightning strike from a storm?",
            answer: "Lightning can strike up to 10 miles (16 km) from a thunderstorm, sometimes even farther. This is why the 30-30 rule (30 seconds = seek shelter) is important - it accounts for the fact that lightning can strike from a distance."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding how to calculate lightning distance is both educational and practical for safety. Our Lightning Distance Calculator simplifies these calculations, supporting multiple units and customizable speed of sound to make determining storm distance easy and accurate.
        </p>
        <p>
          Ready to explore more wave and sound concepts? Check out our {createInternalLink('velocity-calculator', 'Velocity Calculator')} for general speed calculations, our {createInternalLink('frequency-calculator', 'Frequency Calculator')} for wave properties, or our {createInternalLink('wavelength-calculator', 'Wavelength Calculator')} for sound wave calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

