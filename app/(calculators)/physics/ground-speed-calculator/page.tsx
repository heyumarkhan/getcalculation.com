import GroundSpeedCalculator from '../../../_components/calculators/GroundSpeedCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

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
      title="Ground Speed Calculator | Aviation Wind Correction & Flight Time Tool"
      description="Calculate ground speed with wind correction instantly. Free ground speed calculator for pilots with crosswind, headwind, and flight time calculations."
      calculator={<GroundSpeedCalculator />}
      slug="physics/ground-speed-calculator"
      category="Physics"
      features={[
        "Accurate wind vector calculations",
        "Multiple calculation modes",
        "Supports knots, mph, km/h units",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Ground Speed Calculations Are Critical for Safe Flight Operations">
        <p>
          Every pilot knows that airspeed and ground speed are rarely the same—wind makes the difference between arriving on time with sufficient fuel reserves or facing a dangerous diversion. Accurate ground speed calculations transform flight planning from guesswork into precision navigation, enabling pilots to predict exact arrival times, optimize fuel consumption, and avoid dangerous crosswind situations beyond aircraft limits. Commercial airlines use ground speed data to file accurate flight plans with ATC, general aviation pilots rely on it to ensure adequate fuel margins, and drone operators depend on wind-corrected speed calculations to maximize battery endurance and mission success. A 30-knot headwind can reduce a light aircraft's ground speed by 25%, turning a comfortable one-hour flight into a fuel-critical 80-minute ordeal. This ground speed calculator eliminates manual vector arithmetic and trigonometry, instantly resolving true airspeed and wind velocity into ground track, drift angle, required heading corrections, and crosswind components for runway operations. Whether you're planning a cross-country VFR flight or calculating takeoff performance with gusty winds, understanding how wind affects your actual velocity over the ground is fundamental to safe aviation. For related velocity calculations in other contexts, our {createInternalLink('velocity-calculator')} provides comprehensive speed, distance, and time analysis across various physics applications.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation method (ground speed & track, required heading, wind components, or time & distance)</li>
          <li><strong>Step 2:</strong> Enter true airspeed, wind speed and direction (from which direction wind is blowing), and course or runway heading in degrees</li>
          <li><strong>Step 3:</strong> Click Calculate to view ground speed, drift angle, wind correction angle, headwind/crosswind components, and estimated flight time</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Ground Speed Calculator Formula">
        <p>
          Ground speed represents your actual velocity over the Earth's surface—the vector sum of your aircraft's true airspeed through the air and the wind's velocity. Unlike indicated airspeed (IAS) or true airspeed (TAS) which measure motion relative to the surrounding airmass, ground speed determines how fast you cover distance on charts and GPS. Wind correction involves vector mathematics: decomposing wind into components parallel (headwind/tailwind) and perpendicular (crosswind) to your desired track, then calculating the heading adjustment (crab angle) needed to compensate for drift.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">GS = √[(TAS × cos(HDG) + Wx)² + (TAS × sin(HDG) + Wy)²]</p>
        </div>
        <p>Where GS is ground speed, TAS is true airspeed, HDG is aircraft heading, and Wx, Wy are wind components (east and north respectively). For wind correction angle: WCA = arcsin[(W × sin(θ)) / TAS], where θ is the angle between wind direction and desired track.</p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A Cessna 172 flies at 120 knots true airspeed on a course of 090° (due east). Wind is 25 knots from 330° (northwest). Calculate ground speed and drift:</p>
        <ul>
          <li>Input: TAS = 120 kt, Desired track = 090°, Wind = 25 kt from 330°</li>
          <li>Wind relative to track: θ = 330° - 090° = 240° (blowing from left rear quarter)</li>
          <li>Headwind component: 25 × cos(240°) = -12.5 kt (tailwind)</li>
          <li>Crosswind component: 25 × sin(240°) = -21.7 kt (from left)</li>
          <li>Without correction: Drift angle ≈ arctan(-21.7/120) ≈ -10.3° (pushed right)</li>
          <li>Result: Ground speed ≈ <strong>130.6 knots</strong>, Drift ≈ <strong>10.3° right</strong> of intended track</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Ground speed calculations are essential across all aviation and navigation operations:</p>
        <SEOList items={[
          "Flight planning: Calculating accurate ETAs, fuel requirements, and alternate airport ranges for VFR and IFR cross-country flights with forecast winds aloft",
          "Runway operations: Determining headwind/crosswind components for takeoff and landing performance, ensuring operations stay within aircraft crosswind limits (typically 10-20 knots)",
          "Navigation: Computing wind correction angles and required headings to maintain desired ground track using pilotage, dead reckoning, or GPS navigation systems",
          "Commercial aviation: Filing accurate flight plans with ATC, optimizing cruise altitudes for tailwind advantage, and managing fuel reserves for ETOPS operations",
          "Drone operations: Maximizing battery endurance by calculating optimal headings and ground speeds, planning return-to-home margins in varying wind conditions"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What's the difference between airspeed, true airspeed, and ground speed?",
            answer: "Indicated airspeed (IAS) is what the airspeed indicator shows—uncorrected for altitude and temperature. True airspeed (TAS) is actual speed through the airmass, corrected for density altitude (roughly 2% faster per 1,000 ft altitude increase). Ground speed (GS) is velocity over the ground, equal to TAS plus wind vector. Example: At 10,000 ft, IAS might be 100 kt, TAS 120 kt, but with 20 kt tailwind, GS = 140 kt."
          },
          {
            question: "How do I calculate wind correction angle for cross-country navigation?",
            answer: "Wind correction angle (WCA) is the heading adjustment needed to compensate for crosswind drift and maintain your desired track. Formula: WCA = arcsin[(Wind speed × sin(angle between wind and track)) / TAS]. For example, with 30 kt wind from 45° off your nose and TAS of 150 kt: WCA = arcsin[(30 × sin(45°)) / 150] ≈ 8.1°. Turn into the wind by this angle to maintain track."
          },
          {
            question: "Why does wind direction use 'from' instead of 'to' in aviation?",
            answer: "Aviation convention reports wind direction as where it's blowing FROM, not toward. A '270° wind' blows FROM the west (270°) TOWARD the east. This standardizes runway operations—a 'runway 27 with 270° wind' means a headwind for landing. The calculator automatically handles this convention when computing wind vectors and components."
          },
          {
            question: "How much crosswind can different aircraft handle?",
            answer: "Crosswind limits vary by aircraft type and pilot experience. Light aircraft (Cessna 172): ~15 kt demonstrated crosswind. Regional jets: 30-35 kt. Large commercial jets (Boeing 737): 35-40 kt. Military fighters: 50+ kt. Actual limits depend on runway width, surface conditions (dry/wet/icy), gust factors, and whether it's takeoff or landing. Always check your POH/AFM for demonstrated crosswind values."
          },
          {
            question: "Can strong headwinds make a flight impossible even with full fuel?",
            answer: "Yes. Ground speed determines fuel consumption rate per nautical mile, not airspeed. With severe headwinds, ground speed can drop below economical cruise, requiring more fuel than tank capacity allows. Example: A light aircraft with 4-hour endurance at 120 kt TAS (480 nm range) facing 50 kt headwind has only 70 kt GS—just 280 nm range. Flight planning requires calculating ground speed for entire route including forecast winds aloft."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering ground speed calculations is fundamental for every pilot, from student aviators learning navigation to airline captains optimizing transatlantic routes. This calculator eliminates manual vector math, delivering instant wind correction data essential for safe, efficient flight operations.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('acceleration-calculator')} or the popular {createInternalLink('distance-calculator')} for comprehensive motion and navigation calculations across aviation and ground-based applications.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
