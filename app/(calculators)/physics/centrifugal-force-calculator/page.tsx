import CentrifugalForceCalculator from '../../../_components/calculators/CentrifugalForceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function CentrifugalForceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Centrifugal Force Calculator - Calculate Rotational Force Instantly"
      description="Calculate centrifugal force from mass, radius, and angular velocity. Free physics calculator with step-by-step solutions for circular motion problems."
      calculator={<CentrifugalForceCalculator />}
      slug="physics/centrifugal-force-calculator"
      category="Physics"
      features={[
        "Instant centrifugal force calculations",
        "Multiple input methods (angular/linear velocity)",
        "Step-by-step solution breakdown",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Understanding Centrifugal Force Matters">
        <p>
          From amusement park rides to industrial centrifuges, centrifugal force affects our daily lives in countless ways. Whether you're an engineer designing rotating machinery, a physics student solving circular motion problems, or a safety professional analyzing g-forces on riders, understanding how mass, radius, and rotational speed create outward forces is essential. Our centrifugal force calculator makes these complex calculations simple, helping you quickly determine the forces at play in any rotating system. For related motion calculations, explore our {createInternalLink('angular-velocity-calculator')} to analyze rotational speed.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter the mass of the rotating object in kilograms, grams, or pounds.</li>
          <li><strong>Step 2:</strong> Input the radius of rotation (distance from center to object) in meters, feet, or other units.</li>
          <li><strong>Step 3:</strong> Provide either angular velocity (rad/s, RPM) or linear velocity (m/s, mph), and instantly see the centrifugal force in newtons or pounds-force.</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Centrifugal Force Calculator Formula">
        <p>
          Centrifugal force is the apparent outward force experienced by an object moving in a circular path. While technically an inertial force (felt in a rotating reference frame), it's calculated using the object's mass, rotational speed, and radius of rotation. The formula depends on whether you're using angular or linear velocity.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">Fc = m × ω² × r</p>
          <p className="text-sm text-gray-600 mt-2">or</p>
          <p className="font-mono text-lg font-bold">Fc = m × v² / r</p>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Where: Fc = centrifugal force (N), m = mass (kg), ω = angular velocity (rad/s), r = radius (m), v = linear velocity (m/s)
        </p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate the centrifugal force on a 5 kg object rotating at 10 rad/s with a radius of 2 meters:</p>
        <ul>
          <li>Mass (m): 5 kg</li>
          <li>Angular velocity (ω): 10 rad/s</li>
          <li>Radius (r): 2 m</li>
          <li>Calculation: Fc = 5 × 10² × 2 = 5 × 100 × 2 = 1,000 N</li>
          <li>Result: The centrifugal force is 1,000 newtons (approximately 225 pounds-force)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Centrifugal force calculations are essential across numerous industries and scenarios:</p>
        <SEOList items={[
          "Amusement Park Rides: Designing safe roller coasters, centrifuges, and spinning rides that manage g-forces on passengers",
          "Industrial Centrifuges: Separating materials by density in laboratories, wastewater treatment, and manufacturing processes",
          "Automotive Engineering: Analyzing tire forces during cornering, designing curved roads with proper banking angles",
          "Aerospace Applications: Calculating g-forces on pilots and astronauts during maneuvers and centrifuge training",
          "Mechanical Design: Engineering rotating machinery, flywheels, turbines, and ensuring structural integrity under rotational stress"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between centrifugal and centripetal force?",
            answer: "Centripetal force is the real inward force that keeps an object moving in a circle, directed toward the center of rotation. Centrifugal force is the apparent outward force experienced in a rotating reference frame—it's what you feel pushing you outward on a merry-go-round. They are equal in magnitude but opposite in direction, and both are calculated using the same formula."
          },
          {
            question: "How do I convert RPM to rad/s for centrifugal force calculations?",
            answer: "To convert revolutions per minute (RPM) to radians per second (rad/s), use this formula: ω (rad/s) = RPM × 2π / 60. For example, 300 RPM = 300 × 6.2832 / 60 = 31.42 rad/s. Many calculators handle this conversion automatically when you select RPM as your input unit."
          },
          {
            question: "What happens to centrifugal force if I double the rotation speed?",
            answer: "Centrifugal force increases with the square of angular velocity (Fc = m × ω² × r), so doubling the rotation speed quadruples the centrifugal force. For example, if a system produces 100 N at 10 rad/s, it will produce 400 N at 20 rad/s. This quadratic relationship makes rotational speed the most influential factor."
          },
          {
            question: "Can centrifugal force be negative?",
            answer: "No, centrifugal force magnitude is always positive since it's calculated using squared values (ω² or v²). The direction is always radially outward from the center of rotation. However, the centripetal force (which keeps the object in circular motion) points inward and is often represented as negative in equations."
          },
          {
            question: "What are typical centrifugal force values in everyday situations?",
            answer: "A car turning at 30 mph (13.4 m/s) with a 50-meter radius experiences about 0.36 times gravity (3.6 m/s² acceleration). Industrial centrifuges can reach 100,000 g or more. Amusement park rides typically limit forces to 3-6 g for safety and comfort. Earth's rotation creates only 0.03 m/s² centrifugal acceleration at the equator—barely noticeable."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering centrifugal force calculations empowers you to analyze and design rotating systems safely and effectively. Our calculator provides instant, accurate results whether you're working with high-speed machinery or studying fundamental physics concepts.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('acceleration-calculator')} for linear motion analysis or discover the {createInternalLink('force-calculator')} for general force calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

