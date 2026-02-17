import SunAngleCalculator from '../../../_components/calculators/SunAngleCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Sun Angle Calculator | Solar Altitude, Azimuth, Sunrise, Sunset';
const description = 'Calculate solar altitude, azimuth, sunrise, sunset, and solar declination for any location, date, and time.';
const keywords = [
  'sun angle calculator',
  'solar altitude calculator',
  'solar azimuth calculator',
  'sunrise sunset calculator',
  'solar noon calculator',
  'day length calculator',
  'solar declination calculator',
  'solar position calculator',
  'sun position calculator',
  'solar angles',
  'sunrise time calculator',
  'sunset time calculator',
  'solar elevation angle',
  'solar azimuth angle',
  'sun path calculator',
  'solar energy calculation',
  'astronomy sun position',
  'solar radiation calculator',
  'daylight hours calculator',
  'location based sun angle'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/sun-angle-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/sun-angle-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function SunAnglePage() {
  return (
    <CalculatorPageTemplate
      title="Sun Angle Calculator | Calculate Solar Altitude & Azimuth Instantly"
      description="Calculate sun angle, solar altitude, azimuth, sunrise, and sunset times for any location. Free sun angle calculator with instant results."
      calculator={<SunAngleCalculator />}
      slug="physics/sun-angle-calculator"
      category="Physics"
      features={[
        "Accurate solar position calculations",
        "Sunrise/sunset time predictions",
        "Works for any global location",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Solar Position Calculations Matter for Energy and Design">
        <p>
          From maximizing solar panel efficiency to designing buildings that optimize natural light and minimize cooling costs, understanding the sun's position throughout the day and year is fundamental to sustainable design and energy production. Architects rely on solar altitude and azimuth calculations to position windows for passive solar heating, engineers use sunrise and sunset data to forecast photovoltaic system output, and farmers optimize greenhouse orientations to extend growing seasons. This sun angle calculator eliminates complex trigonometric calculations involving latitude, declination, and hour angles, delivering instant solar position data essential for renewable energy projects, architectural planning, and astronomical observations. Whether you're sizing a rooftop solar array or planning outdoor photography sessions during golden hour, accurate solar geometry prevents costly design errors and missed opportunities. For related astronomical calculations, our {createInternalLink('distance-to-horizon-calculator')} helps determine visible distance based on observer height and Earth's curvature.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Enter your geographic coordinates (latitude and longitude in decimal degrees, e.g., 40.7128°N, -74.0060°W for New York)</li>
          <li><strong>Step 2:</strong> Select the date and time you want to analyze (local time with appropriate timezone offset from UTC)</li>
          <li><strong>Step 3:</strong> Click Calculate to view solar altitude (elevation angle), azimuth (compass direction), sunrise/sunset times, and day length with declination data</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Sun Angle Calculator Formula">
        <p>
          Solar position calculations rely on spherical trigonometry that accounts for Earth's axial tilt (23.44°), orbital position (solar declination), observer latitude, and time of day (hour angle). The solar altitude determines the sun's height above the horizon, critical for calculating irradiance on tilted surfaces like solar panels and building facades. Solar azimuth provides the compass bearing to the sun, essential for panel orientation and shade analysis.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">sin(altitude) = sin(φ) × sin(δ) + cos(φ) × cos(δ) × cos(h)</p>
        </div>
        <p>Where φ is latitude, δ is solar declination, and h is the hour angle (15° per hour from solar noon).</p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate the solar altitude at solar noon on the summer solstice (June 21) for Phoenix, Arizona (latitude 33.45°N):</p>
        <ul>
          <li>Input: φ = 33.45°, δ = +23.44° (summer solstice declination), h = 0° (solar noon)</li>
          <li>Calculation: sin(alt) = sin(33.45°) × sin(23.44°) + cos(33.45°) × cos(23.44°) × cos(0°)</li>
          <li>sin(alt) = 0.5510 × 0.3979 + 0.8345 × 0.9174 × 1.0 = 0.2193 + 0.7655 = 0.9848</li>
          <li>Result: altitude = arcsin(0.9848) = <strong>80.0°</strong> (nearly overhead, explaining Phoenix's intense summer heat)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Solar angle calculations are essential across multiple industries and scientific disciplines:</p>
        <SEOList items={[
          "Renewable energy: Optimizing solar panel tilt angles, predicting photovoltaic system energy production, designing concentrating solar power (CSP) heliostat fields",
          "Architecture & construction: Passive solar building design, daylighting strategies, overhangs for summer shading and winter solar gain, LEED certification calculations",
          "Agriculture & horticulture: Greenhouse siting and orientation, crop row alignment for maximum photosynthesis, orchard planning to minimize shading between trees",
          "Photography & cinematography: Planning golden hour and blue hour shoots, calculating sun position for outdoor events, architectural photography with optimal natural lighting",
          "Astronomy & navigation: Celestial navigation using solar sextant readings, planning solar observations and eclipse photography, understanding seasonal star visibility"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What's the difference between solar altitude and solar zenith angle?",
            answer: "Solar altitude (elevation angle) measures the sun's height above the horizon (0° at horizon, 90° directly overhead). Solar zenith angle measures the angle from directly overhead down to the sun (0° overhead, 90° at horizon). They're complementary: zenith angle = 90° - altitude. Solar energy calculations often use zenith angle for air mass calculations."
          },
          {
            question: "How do I determine the optimal tilt angle for solar panels?",
            answer: "For fixed installations, a common rule of thumb is to tilt panels at an angle equal to your latitude (e.g., 35° tilt at 35°N latitude). For maximum winter production, add 15°; for summer optimization, subtract 15°. Seasonal adjustments (typically 2-4 times per year) can increase annual energy by 5-10%. Use this calculator to analyze sun altitude throughout the year for your specific location."
          },
          {
            question: "Why doesn't the sun rise exactly at 6 AM and set at 6 PM?",
            answer: "The 6 AM/6 PM pattern only occurs at the equinoxes (around March 21 and September 23) for locations near the equator. Solar position depends on three factors: 1) Solar declination varies from -23.44° to +23.44° throughout the year, 2) The equation of time creates a ±16-minute variation due to Earth's elliptical orbit and axial tilt, 3) Your longitude offset from your timezone's standard meridian shifts local solar time relative to clock time."
          },
          {
            question: "Can this calculator predict solar eclipses?",
            answer: "No. While this calculator accurately determines the sun's position in Earth's sky, eclipse predictions require the moon's orbital position and the alignment of all three bodies (Sun-Moon-Earth). Solar eclipses occur during new moons when the moon passes between Earth and the sun, which requires specialized ephemeris calculations beyond basic solar geometry."
          },
          {
            question: "What causes the midnight sun and polar night phenomena?",
            answer: "Above the Arctic Circle (66.56°N) and below the Antarctic Circle (66.56°S), Earth's 23.44° axial tilt causes the sun to remain continuously above or below the horizon for extended periods. During summer solstice, when the sun's declination equals +23.44°, any latitude above 66.56°N experiences midnight sun. During winter solstice (declination -23.44°), the same latitudes experience polar night. The duration increases toward the poles—at 90°N/S, day/night each last approximately 6 months."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering solar position calculations is essential for anyone working in renewable energy, sustainable architecture, or observational astronomy. This calculator simplifies complex spherical trigonometry, delivering precise solar altitude, azimuth, and timing data for informed design and planning decisions.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('air-pressure-at-altitude-calculator')} or the popular {createInternalLink('gravitational-force-calculator')} for comprehensive environmental and celestial mechanics analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
