import DopplerEffectCalculator from '../../../_components/calculators/DopplerEffectCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function DopplerEffectCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Doppler Effect Calculator - Sound and Light Frequency Shift"
      description="Calculate frequency shift when source or observer moves toward/away from each other."
      calculator={<DopplerEffectCalculator />}
      slug="physics/doppler-effect-calculator"
      category="Waves & Acoustics"
      features={[
        'Calculates observed frequency using Doppler effect formula',
        'Supports source approaching, receding, observer motion modes',
        'Both source and observer moving simultaneously',
        'Multiple mediums: air (temperature variants), water, light',
        'Real-world presets: ambulance, train, jet, bat sonar',
        'Velocity units: m/s, km/h, mph conversions',
        'Mach number calculation for supersonic motion',
        'Wavelength and frequency shift calculations',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is the Doppler Effect?">
        <p>
          The Doppler Effect is the apparent change in frequency of a wave (sound, light, or other) due to relative motion between the source and observer. When a source moves toward an observer, waves compress, increasing frequency and pitch (blue shift). When moving away, waves stretch, decreasing frequency and pitch (red shift). This phenomenon is fundamental to astronomy, acoustics, radar, and medical imaging.
        </p>
        <p className="mt-4">
          The Doppler Effect Calculator enables physicists, engineers, medical professionals, and students to predict frequency shifts in any scenario: emergency sirens, passing trains, astronomical observations, sonar systems, and ultrasound applications. Whether analyzing redshift in distant galaxies, optimizing Doppler radar for speed detection, or understanding medical imaging, this tool provides accurate frequency calculations for sound and light in multiple mediums.
        </p>
      </SEOSection>

      <SEOSection title="Doppler Effect Formulas">
        <SEOFormula
          formula="f' = f₀ × (v + v_o) / (v - v_s)"
          description="Observed frequency: source frequency times (speed of medium plus observer velocity) divided by (speed of medium minus source velocity)."
        />
        <SEOFormula
          formula="Δf = f' - f₀"
          description="Frequency shift equals observed frequency minus source frequency."
        />
        <SEOFormula
          formula="f' = f₀ × √[(1 + β) / (1 - β)]"
          description="Relativistic Doppler formula where β = v/c (for light at high velocities)."
        />
        <SEOFormula
          formula="Δλ = λ' - λ₀"
          description="Wavelength shift: λ = v/f, wavelength changes inversely with frequency."
        />
        <SEOFormula
          formula="M = v_source / v_sound"
          description="Mach number: source velocity divided by speed of sound (dimensionless)."
        />
      </SEOSection>

      <SEOSection title="How to Use the Doppler Effect Calculator">
        <SEOList
          ordered
          items={[
            '<strong>Select scenario:</strong> Choose whether source or observer is moving (or both).',
            '<strong>Enter source frequency:</strong> Base frequency in Hz (e.g., 1000 Hz for siren).',
            '<strong>Choose medium:</strong> Air (20°C or 0°C), water, or light (relativistic).',
            '<strong>Enter velocities:</strong> Speed of source and/or observer in m/s, km/h, or mph.',
            '<strong>Use presets (optional):</strong> Quick-load realistic scenarios (ambulance, train, jet, bat).',
            '<strong>Click Calculate</strong> to get observed frequency, pitch change, and Mach number.',
            '<strong>Interpret results:</strong> Positive shift = higher pitch (approaching), negative = lower (receding).'
          ]}
        />
      </SEOSection>

      <SEOSection title="Doppler Effect in Different Scenarios">
        <p className="mb-4"><strong>Sound in Air (Subsonic):</strong></p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Ambulance siren:</strong> ~1000 Hz source, ~20 m/s velocity; perceived ~1077 Hz approaching, ~936 Hz receding.</li>
          <li><strong>Train whistle:</strong> ~500 Hz source, ~30 m/s velocity; frequency shift ~180 Hz each way.</li>
          <li><strong>Formula applies:</strong> f' = 343 Hz × (343 + v_observer) / (343 - v_source).</li>
          <li><strong>Threshold effect:</strong> Observer perceives pitch changes instantaneously as source passes; maximum shift at closest approach.</li>
          <li><strong>Double Doppler:</strong> If both source and observer move, effects add: highest frequency when approaching each other, lowest when receding.</li>
          <li><strong>Wind affects speed:</strong> Wind speed modifies effective medium velocity; strong wind can alter perceived Doppler shift.</li>
        </ul>

        <p className="mt-4 mb-4"><strong>Light and Astronomy (Electromagnetic):</strong></p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Blue shift:</strong> Distant objects moving toward us show shorter wavelengths (blue end of spectrum).</li>
          <li><strong>Red shift:</strong> Receding objects show longer wavelengths (red end); evidence for expanding universe.</li>
          <li><strong>Relativistic formula required:</strong> For high-speed astronomy, use f' = f₀ × √[(1 + β) / (1 - β)] where β = v/c.</li>
          <li><strong>Hubble constant:</strong> Red shift measurements determine recession velocity of galaxies; fundamental to cosmology.</li>
          <li><strong>Quasar and supernova observations:</strong> Doppler shift reveals motion patterns in extreme objects.</li>
        </ul>

        <p className="mt-4 mb-4"><strong>Radar and Speed Detection:</strong></p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Police radar:</strong> Doppler shift of electromagnetic waves reflected off moving vehicles determines speed.</li>
          <li><strong>Doppler radar for weather:</strong> Measures wind speed and direction from precipitation particle motion.</li>
          <li><strong>Ultrasonic range finders:</strong> Use frequency shift to measure velocity of moving objects or fluids.</li>
          <li><strong>Medical Doppler ultrasound:</strong> Blood flow velocity in arteries/veins detected via frequency shift.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Key Parameters in Doppler Calculations">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Source frequency (f₀):</strong> Base frequency emitted by source (Hz); 20 Hz - 20 kHz for human hearing, ultrasound higher.</li>
          <li><strong>Speed of sound (v):</strong> 343 m/s in air at 20°C; 331 m/s at 0°C; 1480 m/s in water; increases with temperature and medium density.</li>
          <li><strong>Source velocity (v_s):</strong> Positive when approaching observer, negative when receding (in relative reference frame).</li>
          <li><strong>Observer velocity (v_o):</strong> Positive when moving toward source, negative when moving away.</li>
          <li><strong>Observed frequency (f&apos;):</strong> Actual frequency heard/measured by observer; always positive, ranges from very low (receding) to very high (approaching).</li>
          <li><strong>Mach number (M):</strong> Ratio of source speed to sound speed; M &lt; 1 subsonic, M = 1 sonic (shock wave forms), M &gt; 1 supersonic (Mach cone).</li>
          <li><strong>Wavelength shift:</strong> λ = v/f; shorter wavelengths for higher frequencies (blue shift), longer for lower (red shift).</li>
        </ul>
      </SEOSection>

      <SEOSection title="Applications of Doppler Effect">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Traffic enforcement:</strong> Radar guns use Doppler shift to measure vehicle speeds accurately.</li>
          <li><strong>Astronomy and cosmology:</strong> Red shift of distant galaxies reveals expansion of universe; blue shift detects approaching objects.</li>
          <li><strong>Medical imaging:</strong> Doppler ultrasound measures blood flow velocity, detects blockages, monitors fetal heart rate.</li>
          <li><strong>Weather forecasting:</strong> Doppler radar detects wind patterns, precipitation motion, storm rotation.</li>
          <li><strong>Sonar and echolocation:</strong> Bats, dolphins use Doppler-shifted echoes to detect moving prey; submarines use active sonar.</li>
          <li><strong>Laser scanning and industrial metrology:</strong> Measures moving surface velocities with high precision.</li>
          <li><strong>Exoplanet detection:</strong> Radial velocity method uses stellar Doppler shift caused by orbiting planets.</li>
          <li><strong>Acoustic design:</strong> Architects account for Doppler effects when placing speakers, microphones in moving applications.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Speed of Sound in Different Media">
        <p className="mb-4">
          Speed of sound varies dramatically with medium, affecting Doppler calculations:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Air at 0°C:</strong> 331 m/s (lower temperature = slower propagation)</li>
          <li><strong>Air at 20°C:</strong> 343 m/s (standard reference, ~1235 km/h)</li>
          <li><strong>Air at 100°C:</strong> 386 m/s (higher temperature increases speed ~0.6 m/s per °C)</li>
          <li><strong>Water at 25°C:</strong> 1480 m/s (~4× faster than air due to higher density and stiffness)</li>
          <li><strong>Steel:</strong> 5960 m/s (~17× faster than air in same reference)</li>
          <li><strong>Light in vacuum:</strong> 3 × 10⁸ m/s (constant, not affected by observer motion in classical physics)</li>
          <li><strong>Note:</strong> Sound requires medium; no sound in vacuum. Light travels in vacuum, following relativistic Doppler rules.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example: Passing Ambulance">
        <p className="mb-4"><strong>Scenario:</strong> Ambulance with siren (1000 Hz) approaches at 20 m/s, then recedes at 20 m/s. Observer stationary.</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Speed of sound: v = 343 m/s (air, 20°C)</li>
          <li>Source approaching: v_s = -20 m/s (negative for approaching)</li>
          <li>f' = 1000 × 343 / (343 - (-20)) = 1000 × 343/363 ≈ 1077 Hz (higher pitch)</li>
          <li>Frequency shift approaching: Δf = 1077 - 1000 = +77 Hz</li>
          <li>Source receding: v_s = +20 m/s (positive for receding)</li>
          <li>f' = 1000 × 343 / (343 - 20) = 1000 × 343/323 ≈ 936 Hz (lower pitch)</li>
          <li>Frequency shift receding: Δf = 936 - 1000 = -64 Hz</li>
          <li><strong>Conclusion:</strong> Observer hears siren rise from ~936 Hz (far approach) → 1077 Hz (closest) → 936 Hz (far receding); asymmetric due to velocity geometry.</li>
        </ol>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'Why does a siren pitch drop when passing?',
            answer: 'As the ambulance approaches, sound waves compress (blue shift/higher pitch). At the closest point, pitch is maximum. As it recedes, waves stretch (red shift/lower pitch). The transition happens rapidly near the observer, creating a distinctive "wee-oo-oo" sound. The Doppler formula shows approaching frequency is higher than receding frequency by different amounts due to the velocity reference frame.'
          },
          {
            question: 'How is light different from sound in Doppler effects?',
            answer: 'Sound requires a medium (air, water, etc.) and depends on speed of sound in that medium. Light travels at constant speed (c = 3×10^8 m/s) in vacuum, independent of observer motion (classical perspective). For high-speed objects, relativistic Doppler formula applies: f\u0027 = f₀√[(1+β)/(1-β)]. Red shift/blue shift of starlight reveals cosmic motion and proved universe expansion.'
          },
          {
            question: 'What is the Mach number and when does it matter?',
            answer: 'Mach number (M) = source velocity / speed of sound. M &lt; 1 (subsonic): normal Doppler effect. M = 1 (sonic): source moves at sound speed; Mach cone forms with intensity discontinuity. M &gt; 1 (supersonic): source outruns its own sound; shock wave (sonic boom) generated. Doppler calculator detects M ≥ 1 and prevents calculation since formula breaks down at sonic barrier.'
          },
          {
            question: 'Can observer motion alone cause Doppler shift without source moving?',
            answer: 'Yes! Observer moving toward stationary source encounters more wave crests per second, increasing observed frequency. Formula: f\u0027 = f₀(v + v_observer)/v. Observer moving away decreases frequency. This is why stationary observers hear different pitches as they move relative to a fixed speaker. Combined motion has additive effects: approaching each other maximizes blue shift, receding maximizes red shift.'
          },
          {
            question: 'How is Doppler effect used in speed guns and radar?',
            answer: 'Police radar emits radio waves (~10 GHz) at moving vehicle. Electromagnetic wave reflects off car, and return frequency is Doppler-shifted twice: once by car approach, once by car receding. Net frequency change is 2× single Doppler shift. Speed calculated from frequency difference: Δf = 2×f₀×v/c. Same principle applies to weather Doppler radar measuring wind/precipitation motion, and medical ultrasound measuring blood flow.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
