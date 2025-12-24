import StoppingDistanceCalculator from '../../../_components/calculators/StoppingDistanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function StoppingDistanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Stopping Distance Calculator: Calculate Reaction & Braking Distance"
      description="Calculate stopping distance including reaction distance and braking distance. Free online physics calculator for vehicle safety using d = v×t + v²/(2a)."
      calculator={<StoppingDistanceCalculator />}
      slug="physics/stopping-distance-calculator"
      category="Kinematics"
      features={[
        "Calculate reaction distance, braking distance, and total stopping distance",
        "Multiple unit conversions (m/s, km/h, mph, m, ft, etc.)",
        "Default values for typical scenarios",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Stopping Distance: Essential for Vehicle Safety">
        <p>
          Stopping distance is a critical concept in vehicle safety and traffic engineering, representing the total distance a vehicle travels from the moment a driver perceives a hazard until the vehicle comes to a complete stop. Understanding stopping distance is essential for safe driving, road design, and accident analysis. Our Stopping Distance Calculator makes it easy to calculate reaction distance, braking distance, and total stopping distance using formulas such as <strong>d_reaction = v × t</strong> and <strong>d_braking = v²/(2a)</strong>.
        </p>
        <p>
          Stopping distance consists of two components: reaction distance (the distance traveled during the driver&apos;s reaction time) and braking distance (the distance traveled while the vehicle is decelerating). Both factors are crucial for understanding vehicle safety and are used in traffic engineering, driver education, and safety regulations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Stopping Distance Calculator">
        <p>
          Our Stopping Distance Calculator is designed for simplicity and accuracy:
        </p>
        <ol>
          <li><strong>Enter Velocity:</strong> Input the vehicle&apos;s speed (required)</li>
          <li><strong>Enter Reaction Time:</strong> Optionally input the driver&apos;s reaction time (default: 1.0 seconds)</li>
          <li><strong>Enter Deceleration:</strong> Optionally input the vehicle&apos;s deceleration rate (default: 7.0 m/s²)</li>
          <li><strong>Select Units:</strong> Choose your preferred units for velocity, distance, time, and acceleration</li>
          <li><strong>Calculate:</strong> Click Calculate to get reaction distance, braking distance, and total stopping distance</li>
        </ol>
        <p>
          The calculator provides comprehensive results with step-by-step calculations showing how each component contributes to the total stopping distance.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Stopping Distance Formulas">
        <p>
          Stopping distance is calculated using two key formulas:
        </p>
        
        <h3>1. Reaction Distance</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">d_reaction = v × t</p>
          <p className="text-sm text-gray-600 mt-2">Where: d_reaction = reaction distance, v = velocity, t = reaction time</p>
        </div>
        <p>
          Reaction distance is the distance traveled during the driver&apos;s reaction time, before the brakes are applied. This depends on the driver&apos;s alertness, age, and physical condition.
        </p>

        <h3>2. Braking Distance</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">d_braking = v²/(2a)</p>
          <p className="text-sm text-gray-600 mt-2">Where: d_braking = braking distance, v = velocity, a = deceleration</p>
        </div>
        <p>
          Braking distance is the distance traveled while the vehicle is decelerating to a stop. This depends on the vehicle&apos;s speed, braking system efficiency, road conditions, and tire grip.
        </p>

        <h3>3. Total Stopping Distance</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">d_total = d_reaction + d_braking</p>
          <p className="text-sm text-gray-600 mt-2">Where: d_total = total stopping distance</p>
        </div>
        <p>
          Total stopping distance is the sum of reaction distance and braking distance, representing the complete distance needed to stop safely.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Stopping distance calculations are used in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Driver Education: Teaching safe following distances and defensive driving techniques",
          "Traffic Engineering: Designing safe road layouts, intersection spacing, and traffic signals",
          "Vehicle Safety: Evaluating braking systems and safety features",
          "Accident Analysis: Investigating collisions and determining fault",
          "Road Design: Calculating safe speeds for curves, intersections, and highway exits",
          "Insurance: Assessing risk factors and determining premiums",
          "Law Enforcement: Setting speed limits and enforcing traffic laws",
          "Fleet Management: Training drivers and optimizing vehicle safety",
          "Automotive Testing: Evaluating brake performance and vehicle safety ratings"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Stopping distance calculations use various units depending on the application:
        </p>
        <ul>
          <li><strong>Velocity:</strong> m/s (Meters/second), km/h (Kilometers/hour), mph (Miles/hour), ft/s (Feet/second)</li>
          <li><strong>Distance:</strong> m (Meters), km (Kilometers), cm (Centimeters), ft (Feet), in (Inches), mi (Miles)</li>
          <li><strong>Time:</strong> s (Seconds), ms (Milliseconds)</li>
          <li><strong>Acceleration:</strong> m/s² (Meters/second²), ft/s² (Feet/second²), g (Standard Gravity = 9.80665 m/s²)</li>
        </ul>
        <p>
          <strong>Common Values:</strong>
        </p>
        <ul>
          <li>Typical reaction time: 0.75-1.5 seconds (alert driver), 1.5-2.5 seconds (distracted driver)</li>
          <li>Typical deceleration: 6-8 m/s² (dry road), 3-4 m/s² (wet road), 1-2 m/s² (icy road)</li>
          <li>Emergency braking: Up to 10 m/s² for modern vehicles with ABS</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Stopping Distance Calculations">
        <h3>Example 1: Car at 60 km/h on Dry Road</h3>
        <p>A car traveling at 60 km/h with a reaction time of 1.0 s and deceleration of 7 m/s². Calculate stopping distance.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = 60 km/h = 16.67 m/s, t = 1.0 s, a = 7 m/s²</p>
          <p className="font-mono">Reaction Distance: d_reaction = 16.67 × 1.0 = 16.67 m</p>
          <p className="font-mono">Braking Distance: d_braking = (16.67)²/(2 × 7) = 277.8/14 = 19.84 m</p>
          <p className="font-mono">Total Stopping Distance: 16.67 + 19.84 = 36.51 m</p>
        </div>

        <h3>Example 2: Car at 30 mph on Wet Road</h3>
        <p>A car traveling at 30 mph with a reaction time of 1.2 s and deceleration of 4 m/s² (wet road).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = 30 mph = 13.41 m/s, t = 1.2 s, a = 4 m/s²</p>
          <p className="font-mono">Reaction Distance: d_reaction = 13.41 × 1.2 = 16.09 m</p>
          <p className="font-mono">Braking Distance: d_braking = (13.41)²/(2 × 4) = 179.8/8 = 22.48 m</p>
          <p className="font-mono">Total Stopping Distance: 16.09 + 22.48 = 38.57 m</p>
        </div>

        <h3>Example 3: High-Speed Highway</h3>
        <p>A vehicle traveling at 120 km/h with a reaction time of 0.8 s and deceleration of 8 m/s².</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">v = 120 km/h = 33.33 m/s, t = 0.8 s, a = 8 m/s²</p>
          <p className="font-mono">Reaction Distance: d_reaction = 33.33 × 0.8 = 26.67 m</p>
          <p className="font-mono">Braking Distance: d_braking = (33.33)²/(2 × 8) = 1111/16 = 69.44 m</p>
          <p className="font-mono">Total Stopping Distance: 26.67 + 69.44 = 96.11 m</p>
        </div>
      </SEOSection>

      <SEOSection title="Factors Affecting Stopping Distance">
        <p>
          Several factors influence stopping distance:
        </p>
        <ul>
          <li><strong>Speed:</strong> Stopping distance increases with the square of speed - doubling speed quadruples braking distance</li>
          <li><strong>Reaction Time:</strong> Longer reaction times significantly increase total stopping distance</li>
          <li><strong>Road Conditions:</strong> Wet, icy, or slippery roads reduce deceleration and increase braking distance</li>
          <li><strong>Vehicle Condition:</strong> Worn brakes, tires, or suspension reduce braking effectiveness</li>
          <li><strong>Driver Condition:</strong> Fatigue, distraction, or impairment increases reaction time</li>
          <li><strong>Weather:</strong> Rain, snow, or fog affects both visibility (reaction time) and road grip (deceleration)</li>
          <li><strong>Vehicle Type:</strong> Heavier vehicles may have longer stopping distances, while vehicles with ABS can achieve better deceleration</li>
        </ul>
      </SEOSection>

      <SEOSection title="Safety Implications">
        <p>
          Understanding stopping distance is crucial for road safety:
        </p>
        <ul>
          <li><strong>Following Distance:</strong> Maintain at least 3-4 seconds following distance to allow for safe stopping</li>
          <li><strong>Speed Limits:</strong> Speed limits are set based on stopping distance calculations for safe road design</li>
          <li><strong>Defensive Driving:</strong> Anticipate hazards and maintain safe speeds, especially in adverse conditions</li>
          <li><strong>Vehicle Maintenance:</strong> Regular brake and tire maintenance ensures optimal stopping performance</li>
          <li><strong>Weather Awareness:</strong> Adjust speed and following distance in wet, icy, or foggy conditions</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "Why does stopping distance increase with the square of speed?",
            answer: "Braking distance is proportional to v²/(2a). When speed doubles, the kinetic energy (proportional to v²) quadruples, requiring four times the distance to dissipate that energy through braking."
          },
          {
            question: "What is a typical reaction time for drivers?",
            answer: "Typical reaction time for alert drivers is 0.75-1.5 seconds. Distracted, tired, or impaired drivers may have reaction times of 1.5-2.5 seconds or longer. Reaction time includes perception time (seeing the hazard) and response time (applying the brakes)."
          },
          {
            question: "How do road conditions affect stopping distance?",
            answer: "Road conditions significantly affect deceleration. Dry roads typically allow 6-8 m/s² deceleration, wet roads 3-4 m/s², and icy roads 1-2 m/s². This means stopping distance can be 2-4 times longer on wet or icy roads compared to dry conditions."
          },
          {
            question: "What is the difference between reaction distance and braking distance?",
            answer: "Reaction distance is the distance traveled during the driver's reaction time before brakes are applied. Braking distance is the distance traveled while the vehicle is actively decelerating. Total stopping distance is the sum of both."
          },
          {
            question: "How can I reduce my stopping distance?",
            answer: "To reduce stopping distance: maintain alertness (reduce reaction time), drive at safe speeds (reduces braking distance), maintain your vehicle (ensures optimal braking), and adjust for conditions (slow down in adverse weather)."
          },
          {
            question: "Do ABS brakes reduce stopping distance?",
            answer: "ABS (Anti-lock Braking System) helps maintain steering control during braking and can provide slightly better stopping distances on some surfaces, especially wet or loose surfaces. However, the primary benefit is maintaining control rather than dramatically reducing distance."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding stopping distance is fundamental to vehicle safety and responsible driving. Our Stopping Distance Calculator simplifies these calculations, supporting multiple units and providing comprehensive results including reaction distance, braking distance, and total stopping distance to help drivers make informed safety decisions.
        </p>
        <p>
          Ready to explore more kinematics concepts? Check out our {createInternalLink('velocity-calculator', 'Velocity Calculator')} for speed calculations, our {createInternalLink('acceleration-calculator', 'Acceleration Calculator')} for motion analysis, or our {createInternalLink('free-fall-calculator', 'Free Fall Calculator')} for motion under gravity.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

