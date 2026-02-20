import MomentumCalculator from '../../../_components/calculators/MomentumCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Momentum Calculator | Physics & Collision Analysis';
const description = 'Calculate linear momentum, impulse, momentum change, and collision dynamics with comprehensive unit support.';
const keywords = [
  'momentum calculator',
  'linear momentum calculator',
  'impulse momentum calculator',
  'collision calculator',
  'momentum physics calculator',
  'mass times velocity calculator',
  'momentum change calculator',
  'conservation of momentum calculator',
  'kinetic energy calculator',
  'impulse force time calculator',
  'elastic collision calculator',
  'inelastic collision calculator',
  'momentum conservation calculator',
  'physics momentum calculator',
  'p equals mv calculator',
  'momentum velocity calculator',
  'momentum force calculator',
  'collision momentum calculator',
  'momentum analysis calculator',
  'physics kinematics calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/momentum-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/momentum-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function MomentumCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Momentum Calculator | Collision Analysis & Impulse Physics"
      description="Calculate momentum, impulse, and collision dynamics instantly. Analyze mass, velocity, force, and energy changes in motion scenarios."
      calculator={<MomentumCalculator />}
      slug="physics/momentum-calculator"
      category="Physics"
      features={[
        "Calculate linear momentum (p = m·v) instantly for any mass and velocity",
        "Analyze impulse-momentum theorem and force-time relationships",
        "Collision analysis with momentum conservation and energy loss calculation",
        "Support for positive and negative velocities for directional analysis",
        "Instant Results",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Momentum Calculator Matters in Collision Safety & Engineering">
        <p>
          A single decision about airbag deployment speed determines whether a 70 kg person survives a 50 km/h collision or sustains permanent injury—momentum calculator physics makes that choice. When a 1500 kg car traveling at 25 m/s (90 km/h) collides with a stationary object, it carries 37,500 kg·m/s of momentum that must dissipate within milliseconds. Without understanding momentum, engineers cannot design crash barriers that decelerate vehicles safely; without impulse calculations, safety officials cannot mandate seatbelt specifications that protect occupants. The momentum calculator translates the abstract concept "quantity of motion" into concrete numbers: a truck at highway speed carries 10 times more momentum than a car at identical speed, yet both appear equally safe at low speeds—this invisible force explains why trucks require longer stopping distances and cause more severe accidents. In sports, momentum determines outcomes: a 90 mph fastball (40 m/s) carries 5.8 kg·m/s momentum, enough to break bones if striking unprotected areas; understanding this momentum transfer explains why batting helmets, padding, and protective equipment are non-negotiable. Industrial accidents involving conveyor belts, machinery, and moving loads kill workers yearly because momentum calculations were overlooked. Aerospace engineers use momentum conservation to calculate rocket thrust; marine engineers use it to design collision-avoidant ship systems; vehicle designers use it to optimize crumple zones. The momentum calculator eliminates guesswork from these life-critical calculations. For comprehensive force analysis alongside momentum, explore our {createInternalLink('force-calculator')} to understand how forces create momentum changes.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation type: linear momentum (p = m·v), impulse-momentum relationship, momentum change between velocities, or collision analysis</li>
          <li><strong>Step 2:</strong> Enter the required parameters with flexible units: mass (kg, lb, g, metric ton), velocity (m/s, km/h, mph, ft/s), force (N, kN, lbf, kgf), or collision object properties</li>
          <li><strong>Step 3:</strong> Click Calculate to instantly receive momentum values (kg·m/s), impulse magnitude, kinetic energy calculations, collision final velocities, and energy loss due to inelastic deformation</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Momentum Calculator Formula & Physics">
        <p>
          Momentum is the fundamental quantity that describes an object's quantity of motion, calculated as the product of mass and velocity: p = m·v. This deceptively simple formula has profound implications—momentum is a vector quantity (possesses direction), meaning a 1000 kg object moving north at 20 m/s differs fundamentally from identical velocity south. The impulse-momentum theorem (J = F·t = Δp) connects force, time duration, and momentum change, revealing that the same momentum change can be achieved through either large force over short time or small force over long time. This principle explains airbag operation: distributing impact force over 0.1 seconds instead of 0.01 seconds reduces required force by 10×, preventing internal injuries. In collisions, momentum conservation states that total momentum before impact equals total momentum after impact in isolated systems (no external forces). For perfectly inelastic collisions where objects stick together, final velocity is calculated from m₁v₁ + m₂v₂ = (m₁ + m₂)v_f; kinetic energy loss represents energy converted to sound, heat, deformation, and permanent damage. The momentum calculator automates these calculations, handling vector operations, unit conversions, and energy analysis simultaneously. For related velocity and acceleration calculations in kinematics, check our {createInternalLink('velocity-calculator')} for detailed motion analysis.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">p = m × v</p>
          <p className="text-sm mt-2">Linear Momentum (kg·m/s) · J = F × t · Impulse · J = Δp = m × Δv · Momentum Change</p>
        </div>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>Calculate momentum and collision dynamics for a vehicle crash scenario: 1500 kg car traveling 25 m/s (90 km/h) rear-ends stationary 2000 kg truck:</p>
        <ul>
          <li>Given: Car mass m₁ = 1500 kg, velocity v₁ = 25 m/s; Truck mass m₂ = 2000 kg, velocity v₂ = 0 m/s (stationary)</li>
          <li>Calculate car momentum before collision: p₁ = 1500 × 25 = <strong>37,500 kg·m/s</strong> (forward direction)</li>
          <li>Calculate truck momentum: p₂ = 2000 × 0 = <strong>0 kg·m/s</strong> (stationary)</li>
          <li>Total momentum before collision: p_total = 37,500 + 0 = <strong>37,500 kg·m/s</strong> conserved</li>
          <li>Using conservation of momentum for perfectly inelastic collision: m₁v₁ + m₂v₂ = (m₁ + m₂)v_f</li>
          <li>Final velocity after collision: v_f = (1500 × 25 + 2000 × 0) / (1500 + 2000) = 37,500 / 3500 = <strong>10.7 m/s</strong> (combined vehicles moving forward)</li>
          <li>Car kinetic energy before: KE₁ = ½ × 1500 × 25² = <strong>468,750 J</strong></li>
          <li>Final kinetic energy of combined mass: KE_final = ½ × 3500 × 10.7² = <strong>200,268 J</strong></li>
          <li>Energy loss in collision: 468,750 - 200,268 = <strong>268,482 J</strong> (57% energy converted to damage, heat, sound) indicating severe deformation required</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>The momentum calculator is essential across critical industries:</p>
        <SEOList items={[
          "Vehicle safety engineering: Designing crash barriers, crumple zones, airbag deployment timing, and seatbelt force limits using momentum and impulse calculations",
          "Collision investigation: Analyzing accident reconstructions using momentum conservation, calculating impact velocities from damage patterns",
          "Sports physics and injury prevention: Calculating impact forces in collisions, designing protective equipment, analyzing athlete safety in high-impact sports",
          "Rocket and aerospace propulsion: Using momentum conservation to calculate rocket thrust, fuel consumption rates, and orbital maneuvers in spaceflight",
          "Industrial machinery safety: Analyzing conveyor belt momentum, designing safety guards, calculating stopping distances for moving equipment",
          "Marine engineering and navigation: Calculating ship momentum for collision avoidance, docking procedures, and anchoring operations",
          "Ballistics and forensic analysis: Determining bullet trajectory, impact energy, penetration depth using momentum and kinetic energy calculations",
          "Construction and demolition: Calculating impact forces from falling objects, designing protective structures, and safety barriers"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between momentum and kinetic energy in a collision?",
            answer: "Momentum (p = m·v) is a vector quantity measuring quantity of motion; kinetic energy (KE = ½m·v²) is scalar energy. In a perfectly inelastic collision, momentum is conserved but kinetic energy is lost (converted to heat, sound, deformation). A heavy slow object and light fast object can have equal momentum but vastly different kinetic energies, affecting collision severity differently."
          },
          {
            question: "How does the impulse-momentum theorem apply to airbag safety?",
            answer: "The impulse-momentum theorem states J = F·t = Δp. Airbags increase time interval (t) over which momentum change occurs. Increasing t from 0.01s to 0.1s decreases required force (F) by 10×, preventing internal organ damage. Seatbelts work identically—spreading deceleration force over longer distance/time reduces injury compared to sudden impact."
          },
          {
            question: "Is momentum always conserved in collisions?",
            answer: "Total momentum is conserved in all collisions within isolated systems (no external forces). In elastic collisions, kinetic energy is also conserved. In inelastic collisions, kinetic energy is lost but momentum remains constant. External forces (friction, gravity) violate momentum conservation only if acting during collision."
          },
          {
            question: "Why does a truck at highway speed cause more damage than a car at identical speed?",
            answer: "Although both travel at same velocity, momentum differs: p = m·v. A 15,000 kg truck at 25 m/s carries 375,000 kg·m/s compared to 37,500 kg·m/s for 1,500 kg car. Tenfold greater momentum requires tenfold greater impulse (F·t) to stop, explaining why heavy vehicles need longer stopping distances and cause severe damage."
          },
          {
            question: "How do I use momentum conservation to predict collision outcomes?",
            answer: "Apply conservation of momentum: m₁v₁ + m₂v₂ = m₁v₁' + m₂v₂'. For perfectly inelastic collisions (objects stick), use (m₁ + m₂)v_f = m₁v₁ + m₂v₂. Calculate energy loss as KE_before - KE_after to assess damage severity. Momentum calculator automates these calculations, handling unit conversions and vector directions simultaneously."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering momentum calculator concepts transforms collision analysis from speculation into precision engineering, enabling safer vehicles, protective equipment, and industrial systems across industries.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('kinetic-energy-calculator')} for detailed energy calculations, or the {createInternalLink('acceleration-calculator')} for comprehensive motion and dynamics analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
