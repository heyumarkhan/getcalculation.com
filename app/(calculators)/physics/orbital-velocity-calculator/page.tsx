import OrbitalVelocityCalculator from '../../../_components/calculators/OrbitalVelocityCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function OrbitalVelocityCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Orbital Velocity Calculator - Satellite Speed & Period"
      description="Calculate orbital velocity, period, and escape velocity for satellites and celestial bodies."
      calculator={<OrbitalVelocityCalculator />}
      slug="physics/orbital-velocity-calculator"
      category="Mechanics"
      features={[
        'Calculates orbital velocity for any celestial body',
        'Computes orbital period and escape velocity',
        'Supports Earth masses or kilograms for mass input',
        'Preset values for Earth LEO, GEO, Moon, and Mars',
        'Altitude input in meters or kilometers',
        'Instant conversions to m/s and km/h',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Orbital Velocity?">
        <p>
          Orbital velocity is the speed an object needs to maintain a stable circular orbit around a celestial body without falling back to the surface or escaping into space. This velocity depends on the gravitational pull of the central body and the distance from its center. For satellites orbiting Earth, orbital velocity ranges from about 7.8 km/s in low Earth orbit (LEO) to 3.1 km/s at geostationary orbit (GEO).
        </p>
        <p className="mt-4">
          The Orbital Velocity Calculator helps aerospace engineers, astronomers, students, and space enthusiasts compute the exact speed required for stable orbits, along with orbital period and escape velocity. Understanding orbital mechanics is essential for satellite deployment, space mission planning, GPS systems, and studying planetary motion.
        </p>
      </SEOSection>

      <SEOSection title="Orbital Velocity Formula">
        <SEOFormula
          formula="v = √(GM/r)"
          description="Orbital velocity equals the square root of the gravitational constant times central body mass divided by orbital radius."
        />
        <SEOFormula
          formula="T = 2π√(r³/GM)"
          description="Orbital period equals 2π times the square root of orbital radius cubed divided by GM."
        />
        <SEOFormula
          formula="v_esc = √(2GM/r)"
          description="Escape velocity equals √2 times orbital velocity at the same radius."
        />
        <p className="mt-4 text-gray-700">
          Where: G = 6.674 × 10⁻¹¹ m³/(kg·s²) (gravitational constant), M = mass of central body (kg), r = orbital radius from center (m).
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Orbital Velocity Calculator">
        <SEOList
          ordered
          items={[
            '<strong>Select a preset</strong> (Earth LEO, GEO, Moon, Mars) or enter custom values.',
            '<strong>Enter central body mass</strong> in Earth masses or kilograms.',
            '<strong>Enter central body radius</strong> in kilometers or meters.',
            '<strong>Enter orbital altitude</strong> above the surface in km or meters.',
            '<strong>Click Calculate</strong> to get orbital velocity, period, and escape velocity.',
            '<strong>Review results</strong> in m/s, km/h, hours, and seconds for mission planning.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Understanding Orbital Mechanics">
        <p className="mb-4">
          Key concepts in orbital velocity calculations:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Orbital radius:</strong> Distance from the center of the central body to the orbiting object (radius + altitude).</li>
          <li><strong>Circular vs elliptical orbits:</strong> This calculator assumes circular orbits; elliptical orbits have varying velocities.</li>
          <li><strong>Gravitational force:</strong> Provides the centripetal force needed to keep objects in orbit.</li>
          <li><strong>Energy balance:</strong> Kinetic energy from velocity balances gravitational potential energy.</li>
          <li><strong>Kepler's laws:</strong> Orbital period squared is proportional to orbital radius cubed (T² ∝ r³).</li>
          <li><strong>Geostationary orbit:</strong> At ~35,786 km altitude, orbital period matches Earth's rotation (24 hours).</li>
        </ul>
      </SEOSection>

      <SEOSection title="Applications of Orbital Velocity Calculations">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Satellite deployment:</strong> Determining launch velocities and orbit insertion burns for communications, GPS, and weather satellites.</li>
          <li><strong>Space station operations:</strong> ISS orbits at ~400 km altitude with velocity ~7.66 km/s and period ~92 minutes.</li>
          <li><strong>Interplanetary missions:</strong> Calculating transfer orbits, gravity assists, and orbital rendezvous maneuvers.</li>
          <li><strong>Astronomy:</strong> Studying planetary orbits, moon systems, binary stars, and exoplanet detection.</li>
          <li><strong>Space debris tracking:</strong> Predicting trajectories of defunct satellites and orbital debris.</li>
          <li><strong>Mission planning:</strong> Fuel requirements, launch windows, and delta-v budgets for orbital changes.</li>
          <li><strong>Educational purposes:</strong> Teaching physics, astronomy, and aerospace engineering principles.</li>
          <li><strong>Rocket science:</strong> Designing ascent profiles and calculating burn times for orbit insertion.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Orbital Velocity by Altitude">
        <p className="mb-4">
          Common orbital velocities around Earth (mass 5.972 × 10²⁴ kg, radius 6,371 km):
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Surface (0 km):</strong> 7.91 km/s (theoretical, no atmosphere)</li>
          <li><strong>LEO (400 km, ISS):</strong> 7.66 km/s, period 92.7 minutes</li>
          <li><strong>MEO (20,200 km, GPS):</strong> 3.87 km/s, period 12 hours</li>
          <li><strong>GEO (35,786 km):</strong> 3.07 km/s, period 24 hours (geostationary)</li>
          <li><strong>Moon orbit (384,400 km):</strong> 1.02 km/s, period 27.3 days</li>
        </ul>
        <p className="mt-4 text-gray-700">
          Notice: Higher orbits have lower velocities and longer periods. Orbital velocity decreases with the square root of radius, while period increases with the 3/2 power of radius.
        </p>
      </SEOSection>

      <SEOSection title="Escape Velocity vs Orbital Velocity">
        <p className="mb-4">
          Relationship between escape and orbital velocities:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Mathematical relation:</strong> v_escape = √2 × v_orbital ≈ 1.414 × v_orbital</li>
          <li><strong>Earth surface:</strong> Escape velocity 11.2 km/s vs orbital velocity 7.9 km/s</li>
          <li><strong>Energy difference:</strong> Escape requires twice the kinetic energy (E = ½mv²)</li>
          <li><strong>Practical meaning:</strong> Orbital velocity keeps you circling; escape velocity lets you leave permanently</li>
          <li><strong>Hohmann transfer:</strong> Interplanetary missions use orbital mechanics between escape and orbital speeds</li>
          <li><strong>Delta-v budget:</strong> Difference between orbital and escape velocity determines fuel for leaving orbit</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example: ISS Orbit">
        <p className="mb-4"><strong>Scenario:</strong> Calculate orbital velocity for the International Space Station at 400 km altitude.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Earth mass: M = 5.972 × 10²⁴ kg</li>
          <li>Earth radius: R = 6.371 × 10⁶ m</li>
          <li>Altitude: h = 400 km = 4 × 10⁵ m</li>
          <li>Orbital radius: r = R + h = 6.771 × 10⁶ m</li>
          <li>Orbital velocity: v = √(GM/r) = √(6.674×10⁻¹¹ × 5.972×10²⁴ / 6.771×10⁶)</li>
          <li>Result: v = 7,669 m/s = 7.67 km/s = 27,608 km/h</li>
          <li>Orbital period: T = 2π√(r³/GM) = 5,564 seconds = 92.7 minutes</li>
          <li>ISS completes ~15.5 orbits per day, traveling 42,650 km per orbit</li>
        </ol>
      </SEOSection>

      <SEOSection title="Different Celestial Bodies">
        <p className="mb-4">
          Orbital velocities vary dramatically across the solar system:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Moon (100 km altitude):</strong> ~1.63 km/s, period ~2 hours</li>
          <li><strong>Mars (300 km altitude):</strong> ~3.36 km/s, period ~2.1 hours</li>
          <li><strong>Jupiter (1000 km above clouds):</strong> ~42 km/s, period ~3 hours</li>
          <li><strong>Sun (at Earth's distance):</strong> ~30 km/s, period 1 year</li>
          <li><strong>Neutron star (10 km altitude):</strong> ~100,000 km/s, extreme gravity</li>
          <li><strong>Black hole event horizon:</strong> Speed of light (relativistic effects dominate)</li>
        </ul>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the orbital velocity of the International Space Station?',
            answer: 'The ISS orbits at approximately 400 km altitude with an orbital velocity of 7.66 km/s (27,600 km/h or 17,100 mph). At this speed, it completes one orbit around Earth every 92.7 minutes, circling the planet about 15.5 times per day.'
          },
          {
            question: 'Why do higher orbits have slower velocities?',
            answer: 'Orbital velocity is inversely proportional to the square root of orbital radius (v ∝ 1/√r). As you move farther from Earth, gravitational force weakens, requiring less speed to balance the reduced pull. Geostationary satellites at 35,786 km altitude move at only 3.07 km/s compared to 7.66 km/s in low Earth orbit.'
          },
          {
            question: 'How is orbital velocity different from escape velocity?',
            answer: 'Orbital velocity keeps an object circling around a body in a stable orbit, while escape velocity allows it to break free completely. Escape velocity is always √2 (≈1.414) times the orbital velocity at the same altitude. For Earth surface, orbital velocity is 7.9 km/s while escape velocity is 11.2 km/s.'
          },
          {
            question: 'Can I use this calculator for planets orbiting the Sun?',
            answer: 'Yes! Enter the Sun\'s mass (1.989 × 10³⁰ kg), the Sun\'s radius (6.96 × 10⁸ m), and the planet\'s distance from the Sun. For Earth at 1 AU (149.6 million km), orbital velocity is ~30 km/s with a period of 1 year.'
          },
          {
            question: 'What happens if a satellite goes slower than orbital velocity?',
            answer: 'The satellite will descend into a lower, elliptical orbit or fall back to Earth if velocity is too low. If it goes faster than orbital velocity but slower than escape velocity, it will enter a higher, elliptical orbit. Only at exact orbital velocity does the satellite maintain a perfectly circular orbit.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
