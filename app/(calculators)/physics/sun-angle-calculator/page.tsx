import SunAngleCalculator from '../../../_components/calculators/SunAngleCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

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
      title="Sun Angle Calculator"
      description="Compute solar altitude, azimuth, sunrise, sunset, and declination for solar energy and astronomical applications."
      calculator={<SunAngleCalculator />}
      slug="physics/sun-angle-calculator"
      category="Physics"
      features={[
        'Four methods: altitude & azimuth, solar noon, sunrise/sunset, solar declination',
        'Input: latitude, longitude, date (month/day), local time, timezone offset',
        'Outputs: altitude, azimuth, sunrise/sunset times, day length, declination',
        'Uses Spencer equation for accurate solar declination',
        'Handles polar regions (midnight sun and polar night)',
        'Mobile-friendly and embed-ready'
      ]}
    >
      <SEOSection title="Sun Angle Calculator Overview">
        <p>
          The Sun Angle Calculator determines the position and motion of the sun in Earth's sky for any location and time. It calculates solar altitude (elevation angle above horizon), azimuth (compass direction), sunrise and sunset times, day length, and solar declination. This tool is essential for solar energy design, astronomy, architecture, and environmental planning.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Calculator">
        <SEOList
          items={[
            'Enter your latitude (north/south) and longitude (east/west in degrees).',
            'Select the date (month and day) and local time (hour and minute in 24-hour format).',
            'Enter your timezone offset from UTC (e.g., -5 for EST, +1 for CET).',
            'Choose a calculation method and click Calculate to see solar position and timing.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Key Solar Angles and Parameters">
        <div className="space-y-4">
          <div className="bg-gray-50 border-l-4 border-[#820ECC] p-4 rounded">
            <p className="font-semibold text-gray-900 mb-2">Solar Altitude (Elevation Angle)</p>
            <p className="text-gray-700">Height of the sun above the horizon, measured in degrees. 0° = horizon, 90° = directly overhead (zenith). Negative values indicate the sun is below the horizon.</p>
          </div>
          <div className="bg-gray-50 border-l-4 border-[#820ECC] p-4 rounded">
            <p className="font-semibold text-gray-900 mb-2">Solar Azimuth</p>
            <p className="text-gray-700">Compass direction of the sun, measured clockwise from north: 0° = North, 90° = East, 180° = South, 270° = West.</p>
          </div>
          <div className="bg-gray-50 border-l-4 border-[#820ECC] p-4 rounded">
            <p className="font-semibold text-gray-900 mb-2">Solar Declination (δ)</p>
            <p className="text-gray-700">Angle between the sun's rays and the equatorial plane. Ranges from -23.44° (winter solstice, Dec 21) to +23.44° (summer solstice, Jun 21). Determines latitude of sun's subsolar point.</p>
          </div>
          <div className="bg-gray-50 border-l-4 border-[#820ECC] p-4 rounded">
            <p className="font-semibold text-gray-900 mb-2">Solar Noon</p>
            <p className="text-gray-700">Time when the sun reaches its highest point in the sky (maximum altitude). Solar noon differs from clock noon due to equation of time and longitude.</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Solar Formulas Used">
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Solar Declination:</strong> δ = 23.44° sin(2π(n-81)/365), where n is day of year</li>
          <li><strong>Equation of Time:</strong> Accounts for orbital eccentricity and axial tilt</li>
          <li><strong>Solar Time:</strong> Local time + longitude/15 + equation of time - timezone</li>
          <li><strong>Hour Angle:</strong> (solar time - 12 h) × 15°/h</li>
          <li><strong>Solar Altitude:</strong> sin⁻¹(sin φ sin δ + cos φ cos δ cos h)</li>
          <li><strong>Solar Azimuth:</strong> atan2(sin h, cos h sin φ - tan δ cos φ) + 180°</li>
          <li><strong>Sunrise/Sunset Hour Angle:</strong> cos⁻¹(-tan φ tan δ)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Applications">
        <SEOList
          items={[
            'Solar panel orientation and tilt angle optimization for maximum energy capture',
            'Photovoltaic system design and energy production forecasting',
            'Building design: window placement, shading, passive solar heating/cooling',
            'Outdoor lighting and landscape design for day and shadow patterns',
            'Astronomical observations and celestial navigation',
            'Agriculture: crop placement for optimal sunlight exposure',
            'Environmental impact assessment and solar radiation modeling',
            'Gnomonics: designing sundials and shadow-based timekeeping devices'
          ]}
        />
      </SEOSection>

      <SEOSection title="Seasonal Sun Path Examples">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Summer Solstice (Jun 21):</strong> δ = +23.44°; longest day, sun rises north of east, sets north of west, maximum altitude at noon.</li>
          <li><strong>Equinoxes (Mar 21, Sep 23):</strong> δ ≈ 0°; 12-hour day/night, sun rises due east, sets due west.</li>
          <li><strong>Winter Solstice (Dec 21):</strong> δ = -23.44°; shortest day, sun rises south of east, sets south of west, minimum altitude at noon.</li>
          <li><strong>Polar Regions:</strong> Above/below 66.56° latitude, midnight sun (summer) or polar night (winter) can occur.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is solar noon?',
              answer: 'Solar noon is when the sun reaches its maximum altitude (highest point in the sky). It differs from clock noon due to the equation of time and longitude offset from the standard meridian.'
            },
            {
              question: 'Why does sunrise/sunset time change daily?',
              answer: 'Sun\'s declination changes throughout the year as Earth orbits the sun. Also, the equation of time (difference between apparent solar time and mean solar time) varies daily, shifting sunrise/sunset times.'
            },
            {
              question: 'How do I use this for solar panels?',
              answer: 'Calculate the sun\'s altitude and azimuth at various times to determine optimal panel tilt and orientation. For maximum yearly energy, tilt angle ≈ latitude and face true south (north hemisphere) or true north (south hemisphere).'
            },
            {
              question: 'What if the calculator says midnight sun or polar night?',
              answer: 'Above ~66.56° latitude, the sun can be continuously above (midnight sun) or below the horizon (polar night) for several weeks around summer/winter solstices.'
            },
            {
              question: 'Can I use this for other planets?',
              answer: 'This calculator is tuned for Earth. Other planets have different orbital periods, axial tilts, and declination ranges, requiring adjusted algorithms.'
            },
            {
              question: 'What timezone should I use?',
              answer: 'Enter your local standard timezone offset from UTC. For daylight saving time, add 1 hour. Example: EST = -5, PDT = -7, UTC = 0, CET = +1.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
