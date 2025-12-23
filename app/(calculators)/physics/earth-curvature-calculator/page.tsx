import EarthCurvatureCalculator from '../../../_components/calculators/EarthCurvatureCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function EarthCurvatureCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Earth Curvature Calculator: Calculate Drop, Horizon Distance & Hidden Height"
      description="Calculate Earth's curvature drop, distance to horizon, or hidden object height using precise formulas. Free online physics calculator for geography, astronomy, and engineering with accurate Earth radius calculations."
      calculator={<EarthCurvatureCalculator />}
      slug="physics/earth-curvature-calculator"
      category="Mechanics"
      features={[
        "Calculate curvature drop at any distance",
        "Calculate distance to horizon from observer height",
        "Calculate hidden object height due to curvature",
        "Multiple unit support (km, mi, m, ft, etc.)",
        "Precise calculations using Earth's radius",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Earth's Curvature: Essential Geography and Physics Concept">
        <p>
          Earth&apos;s curvature is a fundamental concept in geography, astronomy, navigation, and engineering. Because Earth is spherical, its surface curves away from any observer, causing objects at a distance to appear lower or become hidden beyond the horizon. Our Earth Curvature Calculator makes it easy to calculate three important measurements: <strong>curvature drop</strong> (how much the Earth curves down at a given distance), <strong>distance to horizon</strong> (how far you can see from a given height), and <strong>hidden object height</strong> (how much of a distant object is concealed by Earth&apos;s curvature).
        </p>
        <p>
          Understanding Earth&apos;s curvature is essential for navigation, surveying, photography, architecture, and understanding why we can&apos;t see objects beyond the horizon. Whether you&apos;re planning a long-distance observation, designing buildings near coastlines, or simply curious about how the spherical Earth affects what we can see, accurate curvature calculations are crucial.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Earth Curvature Calculator">
        <p>
          Our Earth Curvature Calculator offers three calculation modes. Follow these steps:
        </p>
        
        <h3>Mode 1: Curvature Drop at Distance</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Curvature Drop at Distance&quot; from the dropdown</li>
          <li><strong>Enter Distance:</strong> Input the distance from the observer</li>
          <li><strong>Select Units:</strong> Choose your preferred units (km, mi, m, ft, etc.)</li>
          <li><strong>Click Calculate:</strong> The calculator shows how much the Earth curves down at that distance</li>
        </ol>

        <h3>Mode 2: Distance to Horizon</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Distance to Horizon&quot; from the dropdown</li>
          <li><strong>Enter Observer Height:</strong> Input the height of your eye level above sea level</li>
          <li><strong>Select Units:</strong> Choose your preferred units</li>
          <li><strong>Click Calculate:</strong> The calculator shows how far you can see to the horizon</li>
        </ol>

        <h3>Mode 3: Hidden Object Height</h3>
        <ol>
          <li><strong>Select Mode:</strong> Choose &quot;Hidden Object Height&quot; from the dropdown</li>
          <li><strong>Enter Values:</strong> Input distance to object, observer height, and object height</li>
          <li><strong>Select Units:</strong> Choose your preferred units for each measurement</li>
          <li><strong>Click Calculate:</strong> The calculator shows how much of the object is hidden by curvature</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding Earth Curvature Formulas">
        <p>
          Earth curvature calculations use geometric formulas based on Earth&apos;s radius (R = 6,371 km or 3,959 miles). Here are the key formulas:
        </p>

        <h3>Curvature Drop Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">h = R - √(R² - d²)</p>
          <p className="text-sm text-gray-600 mt-2">Where: h = drop/curvature (meters), R = Earth radius (6,371 km), d = distance (meters)</p>
        </div>
        <p>
          This formula calculates the vertical drop (curvature) at a given distance. For small distances, you can use the approximation: <strong>h ≈ d² / (2R)</strong>, which is accurate to within 0.1% for distances up to about 100 km.
        </p>

        <h3>Distance to Horizon Formula</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p className="font-mono text-lg font-bold">d = √(2Rh + h²)</p>
          <p className="text-sm text-gray-600 mt-2">Where: d = horizon distance (meters), R = Earth radius (6,371 km), h = observer height (meters)</p>
        </div>
        <p>
          This formula calculates how far an observer at height h can see to the horizon. For small heights (h &lt;&lt; R), the simplified formula is accurate: <strong>d ≈ √(2Rh)</strong>. For example, at 2 meters height, you can see about 5 km to the horizon, while at 100 meters height, you can see about 35 km.
        </p>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Curvature Drop:</strong> The vertical distance Earth&apos;s surface drops below a straight horizontal line at a given distance. This is why ships disappear hull-first when sailing away.</li>
          <li><strong>Horizon Distance:</strong> The maximum distance you can see from a given elevation before Earth&apos;s curvature blocks your view. The higher you are, the farther you can see.</li>
          <li><strong>Hidden Height:</strong> The portion of a distant object that is hidden below the horizon due to Earth&apos;s curvature. This depends on observer height, object height, and distance.</li>
          <li><strong>Earth Radius:</strong> We use the mean Earth radius of 6,371 kilometers (3,959 miles). Actual radius varies slightly due to Earth&apos;s oblate spheroid shape, but the difference is negligible for most calculations.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Earth curvature calculations are used in numerous practical applications:
        </p>
        <SEOList items={[
          "Navigation & Surveying: Determining visible distances for maritime navigation and land surveying",
          "Architecture & Construction: Planning visibility, sight lines, and building heights near coastlines",
          "Photography: Understanding why distant objects appear lower and calculating optimal viewing distances",
          "Aviation: Flight planning, navigation, and understanding visual range limitations",
          "Telecommunications: Planning line-of-sight for radio, microwave, and optical communications",
          "Astronomy: Understanding why the Sun and Moon appear to rise from and set below the horizon",
          "Geographic Education: Teaching students about Earth's spherical shape and its effects",
          "Coastal Engineering: Designing lighthouses, towers, and observing structures with proper height for visibility",
          "Long-Distance Observation: Planning optimal viewing locations and calculating visible ranges",
          "Scientific Research: Analyzing how curvature affects measurements and observations"
        ]} />
      </SEOSection>

      <SEOSection title="Common Earth Curvature Calculations">
        <h3>Example 1: Curvature Drop at 10 Kilometers</h3>
        <p>Calculate how much Earth curves down at a distance of 10 km.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">d = 10 km = 10,000 m</p>
          <p className="font-mono">R = 6,371,000 m</p>
          <p className="font-mono">h = R - √(R² - d²) = 6,371,000 - √(6,371,000² - 10,000²) ≈ 7.85 m</p>
          <p className="text-sm text-gray-600 mt-1">Result: Earth curves down approximately 7.85 meters at 10 km distance</p>
          <p className="text-sm text-gray-500 mt-1">Using approximation: h ≈ d²/(2R) = 10,000²/(2×6,371,000) ≈ 7.85 m (very close!)</p>
        </div>

        <h3>Example 2: Distance to Horizon from 2 Meters Height</h3>
        <p>Calculate how far you can see to the horizon when standing 2 meters above sea level.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">h = 2 m</p>
          <p className="font-mono">R = 6,371,000 m</p>
          <p className="font-mono">d = √(2Rh + h²) = √(2 × 6,371,000 × 2 + 2²) ≈ 5,048 m ≈ 5.05 km</p>
          <p className="text-sm text-gray-600 mt-1">Result: You can see approximately 5 kilometers to the horizon from 2 meters height</p>
          <p className="text-sm text-gray-500 mt-1">Using approximation: d ≈ √(2Rh) = √(2 × 6,371,000 × 2) ≈ 5.05 km</p>
        </div>

        <h3>Example 3: Curvature Drop at 100 Kilometers</h3>
        <p>Calculate the curvature drop at 100 km distance (approximately the distance across Lake Michigan).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">d = 100 km = 100,000 m</p>
          <p className="font-mono">h = R - √(R² - d²) = 6,371,000 - √(6,371,000² - 100,000²) ≈ 785 m</p>
          <p className="text-sm text-gray-600 mt-1">Result: Earth curves down approximately 785 meters (about 2,575 feet) at 100 km distance</p>
          <p className="text-sm text-gray-500 mt-1">This explains why you cannot see across Lake Michigan from ground level!</p>
        </div>

        <h3>Example 4: Distance to Horizon from Mount Everest</h3>
        <p>Calculate how far you can see from the summit of Mount Everest (8,848 meters high).</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">h = 8,848 m</p>
          <p className="font-mono">d = √(2Rh + h²) = √(2 × 6,371,000 × 8,848 + 8,848²) ≈ 336,000 m ≈ 336 km</p>
          <p className="text-sm text-gray-600 mt-1">Result: From Mount Everest, you can see approximately 336 kilometers to the horizon</p>
        </div>

        <h3>Example 5: Hidden Height of a Ship</h3>
        <p>An observer at 10 meters height sees a ship 20 km away. If the ship is 30 meters tall, how much is hidden by curvature?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">Observer height = 10 m, Distance = 20 km, Ship height = 30 m</p>
          <p className="font-mono">Horizon distance from observer ≈ √(2 × 6,371,000 × 10) ≈ 11.3 km</p>
          <p className="font-mono">Ship is 8.7 km beyond horizon</p>
          <p className="font-mono">Hidden height ≈ (8,700)² / (2 × 6,371,000) ≈ 5.9 m</p>
          <p className="text-sm text-gray-600 mt-1">Result: Approximately 5.9 meters of the ship (about 20% of its 30-meter height) is hidden below the horizon</p>
        </div>
      </SEOSection>

      <SEOSection title="How Earth's Curvature Affects What We See">
        <p>
          Earth&apos;s curvature has several observable effects:
        </p>
        <ul>
          <li><strong>Ships Disappearing:</strong> When ships sail away, they disappear hull-first, then the mast, because the hull is hidden by curvature before the mast.</li>
          <li><strong>Sunset and Sunrise:</strong> The Sun appears to set below the horizon, but it&apos;s actually still above a flat horizon—Earth&apos;s curvature blocks our view.</li>
          <li><strong>Distant Mountains:</strong> The bases of distant mountains appear lower than their peaks due to curvature, making them appear shorter than they are.</li>
          <li><strong>Limited Visibility:</strong> From ground level, you typically cannot see objects more than about 5 km away, even on perfectly flat terrain, due to Earth&apos;s curvature.</li>
          <li><strong>Height Advantage:</strong> The higher you go, the farther you can see. This is why lighthouses, towers, and observation decks are built tall.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Curvature at Different Distances">
        <p>
          Here are some common curvature drop values for reference:
        </p>
        <ul>
          <li><strong>1 km:</strong> Drop ≈ 7.85 cm (about 3 inches)</li>
          <li><strong>5 km:</strong> Drop ≈ 1.96 m (about 6.4 feet)</li>
          <li><strong>10 km:</strong> Drop ≈ 7.85 m (about 25.8 feet)</li>
          <li><strong>50 km:</strong> Drop ≈ 196 m (about 643 feet)</li>
          <li><strong>100 km:</strong> Drop ≈ 785 m (about 2,575 feet)</li>
          <li><strong>200 km:</strong> Drop ≈ 3,140 m (about 10,300 feet)</li>
        </ul>
        <p>
          These values show why Earth&apos;s curvature matters significantly at distances beyond a few kilometers, even though it seems flat over short distances.
        </p>
      </SEOSection>

      <SEOSection title="Horizon Distance at Different Heights">
        <p>
          Here are horizon distances from various observation heights:
        </p>
        <ul>
          <li><strong>Ground level (0 m):</strong> Horizon at 0 km (you&apos;re on the surface)</li>
          <li><strong>1 m (3.3 ft):</strong> Horizon at 3.57 km (2.22 miles)</li>
          <li><strong>2 m (6.6 ft):</strong> Horizon at 5.05 km (3.14 miles)</li>
          <li><strong>10 m (33 ft):</strong> Horizon at 11.3 km (7.02 miles)</li>
          <li><strong>100 m (328 ft):</strong> Horizon at 35.7 km (22.2 miles)</li>
          <li><strong>1 km (3,281 ft):</strong> Horizon at 112.9 km (70.2 miles)</li>
          <li><strong>10 km (32,808 ft):</strong> Horizon at 357 km (222 miles)</li>
        </ul>
        <p>
          This demonstrates why elevation is crucial for long-distance visibility. The relationship is not linear—doubling your height doesn&apos;t double the horizon distance, but increases it by approximately √2 (about 1.41 times).
        </p>
      </SEOSection>

      <SEOSection title="Factors Affecting Curvature Calculations">
        <p>
          Several factors can affect curvature calculations in real-world applications:
        </p>
        <ul>
          <li><strong>Atmospheric Refraction:</strong> Light bends slightly due to atmospheric density gradients, typically increasing visible distance by about 8-15% compared to geometric calculations</li>
          <li><strong>Earth&apos;s Oblateness:</strong> Earth is not a perfect sphere but an oblate spheroid, with polar radius about 21 km shorter than equatorial radius. This causes slight variations in calculations depending on latitude.</li>
          <li><strong>Local Terrain:</strong> Hills, mountains, and other terrain features can significantly affect what you can actually see, regardless of curvature</li>
          <li><strong>Weather Conditions:</strong> Fog, haze, and atmospheric conditions affect visibility far more than curvature at typical distances</li>
          <li><strong>Tides:</strong> Water level changes can affect calculations when observing across bodies of water</li>
        </ul>
        <p>
          Our calculator provides geometric calculations based on a spherical Earth. For most practical purposes, these are accurate enough, but atmospheric refraction and terrain should be considered for precise real-world applications.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How much does Earth curve per kilometer?",
            answer: "Earth curves approximately 7.85 centimeters (about 3 inches) per kilometer of distance. This means at 10 kilometers, the drop is about 7.85 meters (25.8 feet). The relationship is quadratic, so curvature increases with the square of distance."
          },
          {
            question: "How far can I see to the horizon?",
            answer: "The distance to the horizon depends on your height above sea level. From 2 meters (about 6.6 feet), you can see approximately 5 km (3.1 miles) to the horizon. From 10 meters (33 feet), you can see about 11.3 km (7 miles). The formula is: d ≈ √(2Rh), where R is Earth's radius (6,371 km) and h is your height in meters."
          },
          {
            question: "Why can't I see across Lake Michigan from ground level?",
            answer: "Lake Michigan is about 100 km wide. At this distance, Earth curves down approximately 785 meters (2,575 feet). Since the observer is at ground level, the entire opposite shore is hidden below this curve, making it invisible. You would need to be at a significant elevation to see across."
          },
          {
            question: "How does observer height affect horizon distance?",
            answer: "Horizon distance increases with the square root of observer height. If you double your height, horizon distance increases by √2 (about 1.41 times). For example, from 2 m you see 5 km, from 8 m you see 10 km, from 50 m you see 25 km. This is why tall structures like lighthouses and towers provide much better visibility."
          },
          {
            question: "Is Earth perfectly spherical for these calculations?",
            answer: "Earth is actually an oblate spheroid (slightly flattened at the poles), with equatorial radius about 6,378 km and polar radius about 6,357 km. For most calculations, using the mean radius of 6,371 km provides sufficient accuracy. The difference affects calculations by less than 0.3% for most applications."
          },
          {
            question: "Does atmospheric refraction affect these calculations?",
            answer: "Yes, atmospheric refraction typically increases the visible horizon distance by about 8-15% compared to geometric calculations. This is because light bends slightly as it passes through layers of different air density. For precise applications, refraction should be accounted for, but our geometric calculations provide a good baseline."
          },
          {
            question: "Can you see Mount Everest from 300 km away?",
            answer: "Mount Everest is 8,848 meters tall. From 300 km away, Earth's curvature would drop about 7,065 meters. However, the horizon distance from the observer's location also matters. If the observer is at sea level, the horizon is only 5 km away, so they couldn't see 300 km. From a high elevation (like another mountain), it might be possible depending on observer height and local terrain."
          },
          {
            question: "Why do ships disappear hull-first when sailing away?",
            answer: "As a ship moves away, Earth's curvature hides the bottom (hull) first because it's closest to the water surface. The mast remains visible longer because it's higher above the curved surface. This is a classic demonstration of Earth's curvature—the hull disappears before the mast, proving Earth is not flat."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding Earth&apos;s curvature is fundamental to geography, navigation, engineering, and appreciating our planet&apos;s spherical shape. Our Earth Curvature Calculator simplifies these calculations, making it easy to determine curvature drop, horizon distances, and hidden object heights using precise geometric formulas.
        </p>
        <p>
          Whether you&apos;re planning navigation routes, designing structures for optimal visibility, calculating observation ranges, or simply curious about how Earth&apos;s shape affects what we can see, accurate curvature calculations are essential. Ready to explore more physics and geometry concepts? Check out our other calculators like the {createInternalLink('distance-formula', 'Distance Formula Calculator')} for calculating distances between points, or the {createInternalLink('velocity-calculator', 'Velocity Calculator')} for motion calculations that often complement curvature analysis in navigation applications.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

