import GroundSpeedCalculator from '../../../_components/calculators/GroundSpeedCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Ground Speed Calculator | Wind Correction & Flight Time';
const description = 'Calculate ground speed, wind components, course corrections, and flight time with wind for aviation.';
const keywords = [
  'ground speed calculator',
  'groundspeed calculator',
  'wind correction angle calculator',
  'crosswind calculator',
  'headwind tailwind calculator',
  'flight time calculator',
  'aviation speed calculator',
  'true airspeed calculator',
  'ground track calculator',
  'wind drift calculator',
  'required heading calculator',
  'pilot crosswind calculator',
  'runway crosswind calculator',
  'airspeed wind calculator',
  'course correction calculator',
  'navigation wind calculator',
  'aviation wind components',
  'time distance calculator',
  'flight planning calculator',
  'pilot ground speed'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/ground-speed-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/ground-speed-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function GroundSpeedCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Ground Speed Calculator"
      description="Compute ground speed, wind correction angles, crosswind components, and flight time with wind."
      calculator={<GroundSpeedCalculator />}
      slug="physics/ground-speed-calculator"
      category="Physics"
      features={[
        'Four methods: ground speed & track, required heading, wind components, time & distance',
        'Inputs: true airspeed, wind speed/direction, course heading, distance with units',
        'Vector wind correction for ground speed and drift angle',
        'Wind correction angle for desired track and estimated ground speed',
        'Headwind/tailwind and crosswind components for runway or course heading',
        'Travel time estimator using ground speed with wind'
      ]}
    >
      <SEOSection title="Ground Speed Calculator Overview">
        <p>
          The Ground Speed Calculator resolves airspeed and wind into ground-referenced motion. Using vector wind correction, it computes ground speed, ground track, drift angle, required heading to maintain course, and headwind/tailwind and crosswind components. Ideal for pilots, drone operators, and navigators planning accurate ETAs and safe runway operations.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Ground Speed Calculator">
        <SEOList
          items={[
            'Select a method: ground speed & track, required heading, wind components, or time & distance.',
            'Enter true airspeed, wind speed and direction (from), and course or runway heading.',
            'For time & distance, add trip distance with units (nm, km, mi).',
            'Click Calculate to get ground speed, drift, crosswind components, or flight time.',
            'Use results for flight planning, fuel estimates, and crosswind limits.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Key Formulas for Ground Speed and Wind Correction">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">Vg = Va + Vw</p>
            <p className="text-sm text-gray-600">Ground vector = airspeed vector + wind vector</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">WCA = arcsin((W × sin θ) / TAS)</p>
            <p className="text-sm text-gray-600">Wind correction angle for maintaining desired track</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">GS = TAS × cos(WCA) + W × cos θ</p>
            <p className="text-sm text-gray-600">Ground speed along desired track</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">Headwind = W × cos θ,   Crosswind = W × sin θ</p>
            <p className="text-sm text-gray-600">Wind components relative to runway/course</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <SEOList
          items={[
            'Preflight planning: accurate ETA and fuel calculations with wind.',
            'Runway selection: headwind and crosswind limits for takeoff and landing.',
            'Navigation: determine drift and required heading to stay on course.',
            'Drone missions: battery and time-on-station planning in wind.',
            'Maritime and UAV operations: course keeping with current/wind.',
            'Training: visualize vector addition of wind and airspeed.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Scenarios">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Cross-country flight:</strong> TAS 120 kt, wind 25 kt from 300°, course 090° → GS ~109 kt, drift ~-7°.</li>
          <li><strong>Runway crosswind:</strong> Wind 15 kt from 210° on runway 18 → 13 kt headwind, 4 kt crosswind from right.</li>
          <li><strong>Course correction:</strong> Desired track 045°, wind 20 kt from 330°, TAS 100 kt → WCA ~-7°, heading 038°.</li>
          <li><strong>ETA:</strong> Distance 250 nm, GS 115 kt → Time ≈ 2.17 hours (2h 10m).</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is ground speed?',
              answer: 'Ground speed is how fast you move over the ground. It equals true airspeed vector plus wind vector. It differs from indicated airspeed and true airspeed when wind exists.'
            },
            {
              question: 'How is wind direction specified?',
              answer: 'Aviation wind is given as the direction the wind is FROM (e.g., 270° means blowing from the west). The calculator converts this to a "to" vector for computation.'
            },
            {
              question: 'What is wind correction angle (WCA)?',
              answer: 'WCA is the crab angle you add/subtract to your desired track to counter crosswind, keeping the ground track aligned.'
            },
            {
              question: 'How do I compute crosswind and headwind?',
              answer: 'Project wind onto runway/course heading: headwind = W cosθ (positive = headwind, negative = tailwind), crosswind = W sinθ (positive = from right).' } ,
            {
              question: 'Why is ground speed lower than airspeed in headwind?',
              answer: 'Headwind opposes your motion, reducing ground speed. Tailwind adds to your speed, increasing ground speed and reducing travel time.'
            },
            {
              question: 'Can strong crosswind make a route impossible?',
              answer: 'Yes. If required crab angle exceeds what airspeed can generate (|W sinθ| > TAS), you cannot hold the desired track at that airspeed.'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
