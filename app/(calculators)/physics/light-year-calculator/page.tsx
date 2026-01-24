import LightYearCalculator from '../../../_components/calculators/LightYearCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function LightYearCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Light Year Calculator - Astronomical Distance Converter"
      description="Convert light years to kilometers, miles, AU, and parsecs for astronomy calculations."
      calculator={<LightYearCalculator />}
      slug="physics/light-year-calculator"
      category="Astronomy"
      features={[
        'Converts light years to kilometers and miles',
        'Astronomical unit (AU) conversion',
        'Parsec distance calculations',
        'Bidirectional unit conversion',
        'Cosmic distance measurements',
        'Speed of light reference',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is a Light Year?">
        <p>
          A light year is the distance light travels in one year through vacuum. Since light moves at 299,792 kilometers per second (186,282 miles per second), a light year equals approximately 9.461 trillion kilometers (5.879 trillion miles). This astronomical unit measures vast cosmic distances between stars and galaxies.
        </p>
        <p className="mt-4">
          Despite its name, a light year measures distance, not time. It represents how far light travels in Earth's orbital period of 365.25 days. Light years are the standard unit for expressing interstellar and intergalactic distances because conventional units like kilometers become unwieldy for cosmic scales.
        </p>
      </SEOSection>

      <SEOSection title="Light Year Conversion Formulas">
        <SEOFormula
          formula="1 light year = 9.461 x 10^12 km"
          description="One light year equals 9.461 trillion kilometers or 9,461,000,000,000 km."
        />
        <SEOFormula
          formula="1 light year = 5.879 x 10^12 miles"
          description="One light year equals 5.879 trillion miles or 5,879,000,000,000 miles."
        />
        <SEOFormula
          formula="1 light year = 63,241 AU"
          description="One light year equals 63,241 astronomical units (Earth-Sun distances)."
        />
        <SEOFormula
          formula="1 parsec = 3.26 light years"
          description="One parsec equals approximately 3.26 light years or 30.86 trillion km."
        />
      </SEOSection>

      <SEOSection title="Understanding Astronomical Distances">
        <p className="mb-4">
          Different distance units serve different astronomical scales:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Kilometers/Miles:</strong> Useful for planetary distances within our solar system (Moon 384,000 km).</li>
          <li><strong>Astronomical Units (AU):</strong> Solar system distances; 1 AU = Earth-Sun distance = 150 million km.</li>
          <li><strong>Light Years:</strong> Interstellar distances; nearest star Proxima Centauri = 4.24 light years.</li>
          <li><strong>Parsecs:</strong> Professional astronomy unit; 1 parsec = 3.26 light years; used in parallax measurements.</li>
          <li><strong>Megaparsecs:</strong> Galactic distances; 1 Mpc = 1 million parsecs = 3.26 million light years.</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use the Light Year Calculator">
        <SEOList ordered items={[
          '<strong>Enter distance value:</strong> Input the numerical distance you want to convert.',
          '<strong>Select input unit:</strong> Choose from light years, kilometers, miles, AU, or parsecs.',
          '<strong>Click Calculate:</strong> Instantly convert to all other astronomical distance units.',
          '<strong>View conversions:</strong> See results in light years, km, miles, AU, and parsecs.',
          '<strong>Use reference values:</strong> Check conversion factors and speed of light constant.'
        ]} />
      </SEOSection>

      <SEOSection title="Famous Cosmic Distances">
        <p className="mb-4">
          Examples of astronomical distances in light years:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Moon:</strong> 1.3 light seconds (384,000 km) - light delay in Earth-Moon communication.</li>
          <li><strong>Sun:</strong> 8.3 light minutes (1 AU = 150 million km) - sunlight takes 8 minutes to reach Earth.</li>
          <li><strong>Proxima Centauri:</strong> 4.24 light years - nearest star to our solar system.</li>
          <li><strong>Sirius:</strong> 8.6 light years - brightest star in night sky.</li>
          <li><strong>Betelgeuse:</strong> ~550 light years - red supergiant in Orion constellation.</li>
          <li><strong>Milky Way diameter:</strong> ~100,000 light years - our galaxy's span.</li>
          <li><strong>Andromeda Galaxy:</strong> 2.5 million light years - nearest major galaxy to Milky Way.</li>
          <li><strong>Observable Universe:</strong> 93 billion light years diameter - limit of observable cosmos.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Speed of Light and Travel Time">
        <p className="mb-4">
          Understanding light travel times for cosmic objects:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Light Second:</strong> 299,792 km - distance light travels in one second.</li>
          <li><strong>Light Minute:</strong> 17.99 million km - Earth receives sunlight 8 minutes after emission.</li>
          <li><strong>Light Hour:</strong> 1.08 billion km - beyond Saturn's orbit.</li>
          <li><strong>Light Day:</strong> 25.9 billion km - well beyond Neptune's orbit.</li>
          <li><strong>Light Year:</strong> 9.461 trillion km - standard interstellar distance unit.</li>
          <li><strong>Cosmic Delay:</strong> We see stars as they were years ago; observing = looking back in time.</li>
          <li><strong>Fastest Spacecraft:</strong> Voyager 1 travels ~17 km/s, would take 75,000 years to reach Proxima Centauri.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example">
        <p className="mb-4"><strong>Scenario:</strong> The star Vega is 25 light years away. Convert this to other units.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Given: 25 light years</li>
          <li>Kilometers: 25 × 9.461 × 10¹² = 2.365 × 10¹⁴ km (236.5 trillion km)</li>
          <li>Miles: 25 × 5.879 × 10¹² = 1.470 × 10¹⁴ miles (147 trillion miles)</li>
          <li>Astronomical Units: 25 × 63,241 = 1,581,025 AU (1.58 million Earth-Sun distances)</li>
          <li>Parsecs: 25 / 3.26 = 7.67 parsecs</li>
          <li>Light from Vega we see today left the star 25 years ago (in year 2001).</li>
        </ol>
      </SEOSection>

      <SEOSection title="Light Years in Space Exploration">
        <p className="mb-4">
          Light year measurements impact space exploration and astronomy:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Exoplanet Searches:</strong> Most discovered planets are within 1,000 light years of Earth.</li>
          <li><strong>Radio Communication:</strong> Signal to Voyager 1 (24 light hours away) takes 24 hours round trip.</li>
          <li><strong>Interstellar Travel:</strong> Current technology cannot approach light speed; reaching nearest stars takes millennia.</li>
          <li><strong>SETI Projects:</strong> Search for signals from civilizations within 100-1000 light year range.</li>
          <li><strong>Telescope Observations:</strong> Hubble sees galaxies billions of light years away, showing early universe.</li>
          <li><strong>Cosmic Background:</strong> CMB radiation traveled 13.8 billion light years from Big Bang to Earth.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Why Not Use Kilometers for Stars?">
        <p className="mb-4">
          Light years simplify astronomical communication:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Scale Comprehension:</strong> 4.24 light years is easier to grasp than 40 trillion km.</li>
          <li><strong>Time Connection:</strong> Light year inherently shows travel time for light (and information).</li>
          <li><strong>Universal Constant:</strong> Based on speed of light, a fundamental physical constant.</li>
          <li><strong>Scientific Standard:</strong> Astronomy community standardized on light years for public communication.</li>
          <li><strong>Parsecs in Research:</strong> Professional astronomers often prefer parsecs for parallax calculations.</li>
          <li><strong>Avoiding Errors:</strong> Fewer zeros reduce calculation mistakes in cosmic distance estimates.</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'How long would it take to travel one light year?',
            answer: 'At current spacecraft speeds (Voyager 1 at 17 km/s), it would take about 17,500 years to travel one light year. Even at 1% light speed (3,000 km/s, far beyond current technology), it would take 100 years to travel one light year.'
          },
          {
            question: 'Is a light year a measure of time or distance?',
            answer: 'A light year is a measure of distance, not time. It represents the distance light travels in one Earth year. The name is confusing because it contains "year," but it measures how far light goes, not how long it takes.'
          },
          {
            question: 'How many light years away is the Sun?',
            answer: 'The Sun is 8.3 light minutes away (0.000016 light years or about 150 million km). This means sunlight takes 8 minutes and 20 seconds to reach Earth. Light years are too large for solar system distances.'
          },
          {
            question: 'What is the difference between a light year and a parsec?',
            answer: 'Both measure astronomical distances. One parsec equals 3.26 light years. Parsecs come from parallax measurements (angle stars shift as Earth orbits). Astronomers prefer parsecs; light years are more intuitive for general audiences.'
          },
          {
            question: 'Can we see objects beyond the age of the universe in light years?',
            answer: 'Yes. The observable universe is 93 billion light years in diameter, but the universe is only 13.8 billion years old. This is because space itself has expanded while light traveled, stretching distances beyond simple light travel time.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
