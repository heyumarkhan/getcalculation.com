import GravitationalTimeDilationCalculator from '../../../_components/calculators/GravitationalTimeDilationCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Gravitational Time Dilation Calculator | General Relativity Time Effects';
const description = 'Calculate gravitational time dilation near massive objects using general relativity with Schwarzschild metric and escape velocity.';
const keywords = [
  'gravitational time dilation calculator',
  'time dilation gravity calculator',
  'general relativity time calculator',
  'schwarzschild time dilation',
  'escape velocity time dilation',
  'gravitational potential time',
  'clock rate gravity',
  'time dilation near black hole',
  'earth altitude time dilation',
  'GPS time correction',
  'gravitational time shift',
  'time runs slower gravity',
  'relativity time calculator',
  'schwarzschild metric calculator',
  'escape velocity relativity',
  'gravity slows time calculator',
  'relativistic time effects',
  'quantum gravity time',
  'physics time dilation',
  'einstein general relativity time'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/gravitational-time-dilation-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/gravitational-time-dilation-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function GravitationalTimeDilationPage() {
  return (
    <CalculatorPageTemplate
      title="Time Dilation Calculator | Gravitational Time Effects & General Relativity"
      description="Calculate time dilation from gravity instantly. Free time dilation calculator with Schwarzschild metric, GPS corrections, and black hole effects."
      calculator={<GravitationalTimeDilationCalculator />}
      slug="physics/gravitational-time-dilation-calculator"
      category="Physics"
      features={[
        "Accurate general relativity calculations",
        "Multiple calculation methods",
        "GPS and real-world examples",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Gravitational Time Dilation Matters in Modern Technology">
        <p>
          Every GPS navigation system you use, every atomic clock synchronization in global financial networks, and every precision timing application depends on accounting for gravitational time dilation—the phenomenon where time literally runs at different rates depending on gravitational field strength. Without correcting for the 38 microseconds per day that GPS satellites gain relative to ground-based clocks due to weaker gravity at orbital altitude, navigation errors would accumulate to 10 kilometers within a single day. This isn't science fiction; it's measurable reality confirmed by atomic clocks separated by mere meters of elevation. From verifying Einstein's general relativity predictions to designing next-generation quantum communication networks, understanding how massive objects warp spacetime and slow the passage of time is fundamental to both theoretical physics and practical engineering. This time dilation calculator eliminates complex Schwarzschild metric calculations, providing instant results for gravitational potential differences, escape velocity scenarios, and altitude-based time shifts. For related calculations involving event horizons and black holes, explore our {createInternalLink('schwarzschild-radius-calculator')} to understand how massive objects define spacetime structure.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation method (escape velocity, Schwarzschild metric, Earth altitude comparison, or gravitational potential)</li>
          <li><strong>Step 2:</strong> Enter the relevant parameters such as mass (in kg or solar masses), radius (in meters or km), or altitude difference</li>
          <li><strong>Step 3:</strong> Click Calculate to view the time dilation factor, showing how much slower time passes in the stronger gravitational field with practical examples</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Time Dilation Calculator Formula">
        <p>
          Gravitational time dilation arises from Einstein's general theory of relativity, which describes gravity not as a force but as curvature of spacetime caused by mass and energy. Clocks in stronger gravitational fields (deeper in a gravity well) tick more slowly compared to clocks in weaker fields. The Schwarzschild metric quantifies this effect using mass M, radial distance r, gravitational constant G, and the speed of light c.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">t_gravity = t_far × √(1 - 2GM/(rc²))</p>
        </div>
        <p>Where t_gravity is time elapsed in the gravitational field, t_far is time elapsed far from the mass (where gravity is negligible), G = 6.674×10⁻¹¹ m³/(kg·s²), M is mass, r is distance from center, and c = 299,792,458 m/s.</p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate time dilation for a clock on Earth's surface compared to one infinitely far away:</p>
        <ul>
          <li>Input: Earth mass M = 5.972×10²⁴ kg, Earth radius r = 6.371×10⁶ m</li>
          <li>Schwarzschild term: 2GM/(rc²) = 2 × 6.674×10⁻¹¹ × 5.972×10²⁴ / (6.371×10⁶ × (3×10⁸)²)</li>
          <li>2GM/(rc²) = 7.976×10¹⁴ / 5.732×10²³ = 1.391×10⁻⁹</li>
          <li>Time dilation factor: √(1 - 1.391×10⁻⁹) ≈ 0.9999999993</li>
          <li>Result: A clock on Earth's surface runs <strong>0.7 nanoseconds slower per second</strong> than a clock at infinity (about 22 milliseconds per year)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Gravitational time dilation calculations are essential across multiple scientific and technological domains:</p>
        <SEOList items={[
          "Global Navigation Satellite Systems: GPS, GLONASS, Galileo, and BeiDou must correct for +38 μs/day gravitational time dilation (plus -7 μs/day from special relativity) to maintain meter-level positioning accuracy",
          "Precision timekeeping: International Atomic Time (TAI) coordination accounts for gravitational potential differences between atomic clocks at different elevations worldwide",
          "Astrophysics research: Analyzing gravitational redshift in white dwarf spectra, neutron star emission timing, and black hole accretion disk dynamics",
          "Fundamental physics tests: Verifying general relativity predictions using ultra-precise optical atomic clocks separated by centimeter-scale height differences",
          "Space mission planning: Accounting for time dilation effects on spacecraft clocks for deep space navigation and interplanetary communication synchronization"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "How much does gravity actually slow down time on Earth?",
            answer: "At Earth's surface, time runs approximately 0.7 nanoseconds per second slower than at infinite distance (where gravity is zero). This accumulates to about 22 milliseconds per year. The effect increases closer to the center: a clock at sea level runs about 1 nanosecond per day slower than one at 1 km altitude—small but measurable with modern atomic clocks achieving 10⁻¹⁸ second precision."
          },
          {
            question: "Why do GPS satellites need time dilation corrections?",
            answer: "GPS satellites orbit at ~20,200 km altitude where Earth's gravity is weaker. Gravitational time dilation causes their clocks to run 45 microseconds per day faster than ground clocks. Special relativity (velocity-based time dilation) makes them run 7 microseconds slower. Net effect: +38 microseconds/day. Without correction, position errors would exceed 10 km per day since GPS relies on nanosecond-precision timing."
          },
          {
            question: "What happens to time near a black hole event horizon?",
            answer: "As you approach the Schwarzschild radius (event horizon), the time dilation factor √(1 - Rs/r) approaches zero, meaning time appears to stop from an outside observer's perspective. An astronaut falling into a black hole would experience normal time passage, but observers far away would see them freeze and redshift into invisibility. This is why nothing can escape from inside the event horizon—not even light."
          },
          {
            question: "Can I measure gravitational time dilation in everyday life?",
            answer: "Not with ordinary clocks, but yes with atomic clocks. In 2010, NIST physicists measured time dilation over just 33 cm of elevation change using optical atomic clocks accurate to 10⁻¹⁷ seconds. Your head ages about 90 nanoseconds per day faster than your feet due to Earth's gravity gradient—undetectable to humans but fundamental physics nonetheless."
          },
          {
            question: "How is gravitational time dilation different from special relativity?",
            answer: "Special relativity describes time dilation from relative motion (velocity): moving clocks run slower. Gravitational time dilation comes from general relativity and spacetime curvature: clocks in stronger gravity run slower regardless of motion. GPS satellites experience both effects simultaneously—they're both moving fast (special relativity: -7 μs/day) and in weaker gravity (general relativity: +45 μs/day). The effects are independent and additive."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering gravitational time dilation calculations is essential for anyone working in precision timing, satellite navigation, or astrophysics. This calculator transforms complex general relativity equations into accessible results, revealing how gravity fundamentally alters the passage of time itself.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('gravitational-force-calculator')} or the popular {createInternalLink('schwarzschild-radius-calculator')} for comprehensive gravitational physics analysis across classical and relativistic regimes.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
