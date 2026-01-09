import CalculatorPageTemplate from '@/app/_components/layouts/CalculatorPageTemplate';
import DistanceToHorizonCalculator from '@/app/_components/calculators/DistanceToHorizonCalculator';
import { SEOSection, SEOFAQ } from '@/app/_components/ui/SEOContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Distance to Horizon Calculator | How Far Can You See to Horizon',
  description: 'Free online distance to horizon calculator. Calculate how far you can see based on your height using the formula d = √(2Rh). Perfect for geography, aviation, maritime, and physics.',
  keywords: [
    'distance to horizon calculator',
    'how far to horizon',
    'horizon distance calculator',
    'line of sight calculator',
    'visibility distance calculator',
    'altitude horizon distance',
    'horizon calculation formula',
    'how far can I see calculator',
    'horizon viewing distance',
    'geographic horizon calculator',
    'nautical horizon distance',
    'height above sea level calculator',
    'earth horizon distance',
    'optical horizon calculator',
    'sight distance calculator',
    'horizon distance geometry',
    'altitude visibility calculator',
    'horizon range calculator',
    'earth curvature calculator',
    'line of sight distance'
  ],
  openGraph: {
    title: 'Distance to Horizon Calculator',
    description: 'Calculate how far you can see to the horizon based on your height above sea level.',
    type: 'website',
  },
};

export default function DistanceToHorizonCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Distance to Horizon Calculator: Calculate d = √(2Rh + h²)"
      description="Calculate the distance to the horizon from any height using the fundamental formula d = √(2Rh + h²). Free online physics calculator for aviation, maritime, geography, and observation applications with comprehensive unit support."
      calculator={<DistanceToHorizonCalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/distance-to-horizon-calculator"
      category="Mechanics"
      features={[
        'Calculate exact distance to horizon from any altitude',
        'Support for multiple height units (meters, feet, miles, nautical miles)',
        'Results in multiple distance units (kilometers, miles, nautical miles)',
        'Viewing angle calculation showing Earth curvature perspective',
        'Step-by-step calculation display with geometric formulas',
        'Perfect for aviation, maritime, geography, and astronomy applications',
      ]}
    >
      <SEOSection title="Understanding Distance to Horizon">
        <p>
          Distance to horizon is the maximum distance at which an observer at a given height can see across 
          the Earth&apos;s surface due to the planet&apos;s curvature. This is a fundamental concept in geography, 
          physics, navigation, and astronomy. The distance to the horizon depends entirely on the observer&apos;s 
          height above sea level and the radius of the Earth.
        </p>
        <p>
          The farther away you are from the Earth&apos;s surface (higher altitude), the greater the distance 
          to the horizon. This is why pilots can see much farther than someone standing on the ground, and why 
          sailors on tall ships can see other vessels before shorter vessels can see them. This calculator helps 
          you determine exactly how far you can see based on your altitude.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Distance to Horizon Calculator">
        <p>
          Using this calculator is straightforward:
        </p>
        <ol>
          <li><strong>Enter Your Height:</strong> Specify your height above sea level (whether on a mountain, building, airplane, etc.)</li>
          <li><strong>Select Height Unit:</strong> Choose from meters, kilometers, feet, miles, or nautical miles</li>
          <li><strong>Choose Result Unit:</strong> Select whether you want the distance in kilometers, miles, feet, or nautical miles</li>
          <li><strong>Optional - Viewing Angle:</strong> Enable this to also see the viewing angle created by the horizon</li>
          <li><strong>Click Calculate:</strong> Get instant results with detailed step-by-step calculations showing the geometric relationships</li>
        </ol>
        <p>
          The calculator provides both the horizontal distance to the horizon and optionally the vertical 
          viewing angle, giving you a complete understanding of how far and at what angle you can see.
        </p>
      </SEOSection>

      <SEOSection title="The Distance to Horizon Formula: d = √(2Rh + h²)">
        <p>
          The fundamental formula for calculating distance to the horizon is:
        </p>
        <p>
          <strong>d = √(2Rh + h²)</strong>
        </p>
        <p>
          Where:
        </p>
        <ul>
          <li><strong>d</strong> = Distance to horizon</li>
          <li><strong>R</strong> = Earth&apos;s radius (mean ≈ 6,371 km)</li>
          <li><strong>h</strong> = Height above sea level (same units as R)</li>
        </ul>
        <p>
          For small heights where h is much smaller than R, this simplifies to:
        </p>
        <p>
          <strong>d ≈ √(2Rh)</strong>
        </p>
        <p>
          The formula derives from the geometry of a circle (Earth) and the tangent line from an observer&apos;s 
          position to the surface. The distance is always measured as a great circle distance across the Earth&apos;s surface.
        </p>
      </SEOSection>

      <SEOSection title="Earth's Radius and Geographic Variations">
        <p>
          The calculator uses Earth&apos;s mean radius of approximately 6,371 kilometers (3,959 miles). However, 
          Earth is not a perfect sphere—it is an oblate spheroid, slightly flattened at the poles.
        </p>
        <p>
          <strong>Radius Variations:</strong>
        </p>
        <ul>
          <li><strong>Equatorial radius:</strong> 6,378.137 km (most distant from center)</li>
          <li><strong>Polar radius:</strong> 6,356.752 km (closest to center)</li>
          <li><strong>Mean radius:</strong> 6,371 km (used in this calculator)</li>
        </ul>
        <p>
          Using the mean radius provides accurate results for most applications. For extremely precise calculations 
          or specific latitude locations, you could use the appropriate radius value, but the difference is typically 
          less than 1% for most practical applications.
        </p>
      </SEOSection>

      <SEOSection title="Factors Affecting Distance to Horizon">
        <p>
          Several factors influence how far you can actually see to the horizon:
        </p>
        <p>
          <strong>1. Observer Height (Primary Factor)</strong>
        </p>
        <ul>
          <li>Directly determines geometric horizon distance</li>
          <li>Doubling height increases distance by factor of √2 (≈1.41×)</li>
          <li>From sea level: ~4.7 km; from 1,000 m: ~112 km</li>
        </ul>
        <p>
          <strong>2. Atmospheric Refraction</strong>
        </p>
        <ul>
          <li>Light bends in the atmosphere, extending visible horizon beyond geometric horizon</li>
          <li>Refraction effect adds roughly 8% to geometric distance</li>
          <li>Effect varies with temperature, humidity, and atmospheric pressure</li>
        </ul>
        <p>
          <strong>3. Visibility Conditions</strong>
        </p>
        <ul>
          <li>Fog, haze, and pollution reduce actual visibility</li>
          <li>Clear conditions allow seeing geometric horizon</li>
          <li>Smog and pollution can reduce visibility to 10-20 km even from high altitude</li>
        </ul>
        <p>
          <strong>4. Terrain Elevation</strong>
        </p>
        <ul>
          <li>Mountains and hills block line of sight</li>
          <li>This calculator assumes unobstructed view over a spherical Earth</li>
          <li>Actual horizon may be closer than calculated if terrain blocks view</li>
        </ul>
        <p>
          <strong>5. Observer Eye Height on a Surface</strong>
        </p>
        <ul>
          <li>Height should be measured to eye level (not to feet or base of object)</li>
          <li>For buildings or aircraft, use height of observation point</li>
          <li>Even small differences matter (standing vs. sitting adds ~50 cm)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Distance to Horizon in Different Scenarios">
        <p>
          <strong>From Common Heights:</strong>
        </p>
        <ul>
          <li><strong>Standing on ground (1.7 m):</strong> ~4.7 km (2.9 miles)</li>
          <li><strong>Tall building observation deck (300 m):</strong> ~62 km (38.5 miles)</li>
          <li><strong>Commercial aircraft (10,000 m):</strong> ~357 km (222 miles)</li>
          <li><strong>Mount Everest summit (8,849 m):</strong> ~336 km (209 miles)</li>
          <li><strong>International Space Station (400 km):</strong> ~2,259 km (1,404 miles)</li>
          <li><strong>Geostationary orbit (36,000 km):</strong> ~42,164 km (26,200 miles)—nearly half Earth&apos;s circumference</li>
        </ul>
        <p>
          These distances demonstrate how dramatically altitude affects visibility and why satellites and 
          high-altitude observations are so valuable for communications, weather monitoring, and surveillance.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Distance to Horizon Calculations">
        <p>
          <strong>1. Aviation and Piloting</strong>
        </p>
        <ul>
          <li>Visual flight rules and navigation</li>
          <li>Understanding aircraft visibility and communication range</li>
          <li>Calculating safe altitudes for terrain clearance</li>
        </ul>
        <p>
          <strong>2. Maritime Navigation</strong>
        </p>
        <ul>
          <li>Ship-to-ship and ship-to-shore visibility</li>
          <li>Lighthouse and navigation light range planning</li>
          <li>Coast guard and maritime safety operations</li>
        </ul>
        <p>
          <strong>3. Geography and Cartography</strong>
        </p>
        <ul>
          <li>Understanding Earth curvature effects</li>
          <li>Map projection and geographic calculations</li>
          <li>Visibility modeling for landscape assessments</li>
        </ul>
        <p>
          <strong>4. Astronomy and Space</strong>
        </p>
        <ul>
          <li>Understanding why Earth appears curved at high altitudes</li>
          <li>Satellite coverage and communication range</li>
          <li>Space mission planning and trajectory analysis</li>
        </ul>
        <p>
          <strong>5. Photography and Videography</strong>
        </p>
        <ul>
          <li>Planning aerial photography coverage area</li>
          <li>Understanding horizon curvature in high-altitude images</li>
          <li>Drone and balloon photography applications</li>
        </ul>
        <p>
          <strong>6. Emergency Services and Search & Rescue</strong>
        </p>
        <ul>
          <li>Estimating search area visibility from observation points</li>
          <li>Planning radar and communication tower placement</li>
          <li>Predicting sightline availability for search operations</li>
        </ul>
      </SEOSection>

      <SEOSection title="Geometric Principles Behind Horizon Calculation">
        <p>
          The distance to horizon is derived from basic geometry. When you stand at height h above a sphere 
          of radius R, your line of sight to the horizon is tangent to the sphere. This creates a right triangle where:
        </p>
        <ul>
          <li>The hypotenuse is from Earth&apos;s center to your eyes: length R + h</li>
          <li>One side is Earth&apos;s radius from center to horizon point: length R</li>
          <li>The other side is the distance to horizon along the surface: length d</li>
        </ul>
        <p>
          Using the Pythagorean theorem: (R + h)² = R² + d²
        </p>
        <p>
          Solving for d: d = √((R + h)² - R²) = √(2Rh + h²)
        </p>
        <p>
          This pure geometric derivation assumes a perfectly smooth, spherical Earth with no atmospheric 
          refraction. In reality, atmospheric refraction extends the visible horizon by about 8%.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the distance to horizon from sea level?',
            answer: 'From sea level (about 1.7 meters eye height for standing person), the distance to the geometric horizon is approximately 4.7 kilometers or 2.9 miles. With atmospheric refraction, you might see slightly farther, up to about 5 kilometers.',
          },
          {
            question: 'Why is the distance to horizon different at different altitudes?',
            answer: 'The distance to horizon increases with height because you can see farther around the curved surface of the Earth. The relationship follows the formula d = √(2Rh + h²), so doubling your height increases the horizon distance by a factor of √2 (approximately 1.41 times).',
          },
          {
            question: 'Does atmospheric refraction affect the calculated distance?',
            answer: 'Yes, atmospheric refraction bends light rays and extends the visible horizon by approximately 8% beyond the geometric horizon. This calculator computes the geometric horizon. In reality, you can typically see about 8% farther due to atmospheric effects.',
          },
          {
            question: 'Can I see the horizon from an airplane?',
            answer: 'Yes, from a commercial airplane at 10,000 meters, you can see about 357 kilometers (222 miles) to the horizon. This is why airplane windows and photography from aircraft show such expansive views.',
          },
          {
            question: 'How far can you see from Mount Everest?',
            answer: 'From the summit of Mount Everest (8,849 meters), the distance to the horizon is approximately 336 kilometers (209 miles). This explains why the highest mountains offer such spectacular views.',
          },
          {
            question: 'Why do satellites have such large coverage areas?',
            answer: 'From geostationary orbit (36,000 km altitude), satellites can see nearly half of Earth—about 42,164 km of distance to the horizon. This enormous coverage is why satellites are so valuable for communications, weather, and broadcasting.',
          },
          {
            question: 'Is the Earth&apos;s curvature visible from the horizon?',
            answer: 'The curvature of Earth becomes visually apparent from altitudes above about 10 kilometers in perfect conditions. From commercial flight altitude (10-12 km), you can see the slight curvature. At higher altitudes, the curvature becomes increasingly obvious.',
          },
          {
            question: 'How accurate is this calculator?',
            answer: 'This calculator uses the geometric formula with Earth&apos;s mean radius (6,371 km) and is accurate to within a few percent for most practical applications. Real-world visibility may be less due to terrain, weather, and air quality, but can be slightly more due to atmospheric refraction.',
          },
        ]}
      />
    </CalculatorPageTemplate>
  );
}
