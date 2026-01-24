import AngularFrequencyCalculator from '../../../_components/calculators/AngularFrequencyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function AngularFrequencyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Angular Frequency Calculator"
      description="Calculate angular frequency, period, and frequency using ω = 2πf formulas."
      calculator={<AngularFrequencyCalculator />}
      slug="physics/angular-frequency-calculator"
      category="Waves & Oscillations"
      features={[
        'ω = 2πf computation',
        'Convert between frequency, angular frequency, and period',
        'Multiple frequency units (Hz, kHz, MHz, GHz, rpm)',
        'Angular units (rad/s, deg/s, rpm)',
        'Period units (s, ms, μs, min, h)',
        'Step-by-step calculation display',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="Angular Frequency Calculator: ω = 2πf">
        <p>
          The Angular Frequency Calculator converts between frequency (f), angular frequency (ω), and period (T) using the fundamental relationships ω = 2πf and T = 1/f. Angular frequency measures how fast an oscillation or wave rotates in radians per second. This calculator is essential for physics problems involving simple harmonic motion, AC circuits, waves, and oscillatory systems. Enter any one value to instantly calculate the other two with detailed step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="How to Use">
        <SEOList ordered items={[
          '<strong>Choose input:</strong> Enter frequency (f), angular frequency (ω), or period (T).',
          '<strong>Select units:</strong> Choose from Hz/kHz/MHz/GHz/rpm, rad/s/deg/s/rpm, or s/ms/μs/min/h.',
          '<strong>Calculate:</strong> Click the corresponding button to compute other values.',
          '<strong>Review steps:</strong> See unit conversions and formula applications.',
          '<strong>View results:</strong> Get all three values simultaneously with precise calculations.'
        ]} />
      </SEOSection>

      <SEOSection title="Core Formulas">
        <SEOFormula
          formula="\omega = 2\pi f"
          description="Angular frequency (ω) equals 2π times the frequency (f)."
        />
        <SEOFormula
          formula="f = \frac{1}{T}"
          description="Frequency equals the reciprocal of the period."
        />
        <SEOFormula
          formula="\omega = \frac{2\pi}{T}"
          description="Angular frequency equals 2π divided by the period."
        />
        <SEOList items={[
          'ω (omega) = angular frequency in radians per second (rad/s)',
          'f = frequency in Hertz (Hz) or cycles per second',
          'T = period in seconds (time for one complete cycle)',
          '2π ≈ 6.2832 radians in one complete revolution'
        ]} />
      </SEOSection>

      <SEOSection title="Physical Meaning & Applications">
        <p>
          Angular frequency represents the rate of change of phase angle in oscillatory motion. In simple harmonic motion, a mass on a spring oscillates with angular frequency ω = √(k/m). In AC electrical circuits, voltage and current oscillate at angular frequency ω = 2πf where f is typically 50 Hz or 60 Hz. Wave phenomena including sound, light, and electromagnetic waves all have characteristic angular frequencies. Understanding the relationship between ω, f, and T is fundamental to wave mechanics, quantum mechanics, signal processing, and electrical engineering.
        </p>
      </SEOSection>

      <SEOSection title="Examples & Common Values">
        <SEOList items={[
          '<strong>AC Power (60 Hz):</strong> f = 60 Hz, ω ≈ 377 rad/s, T ≈ 16.67 ms',
          '<strong>AC Power (50 Hz):</strong> f = 50 Hz, ω ≈ 314 rad/s, T = 20 ms',
          '<strong>Pendulum (1 Hz):</strong> f = 1 Hz, ω ≈ 6.28 rad/s, T = 1 s',
          '<strong>Radio Wave (100 MHz):</strong> f = 100 MHz, ω ≈ 6.28×10⁸ rad/s, T = 10 ns',
          '<strong>Rotating machinery (3600 rpm):</strong> f = 60 Hz, ω ≈ 377 rad/s'
        ]} />
      </SEOSection>

      <SEOSection title="Simple Harmonic Motion">
        <p>
          In simple harmonic motion (SHM), the angular frequency ω determines how rapidly the system oscillates. The displacement can be written as x(t) = A cos(ωt + φ), where A is amplitude and φ is phase. The velocity is v(t) = -Aω sin(ωt + φ) and acceleration is a(t) = -Aω² cos(ωt + φ). Higher angular frequency means faster oscillation and greater maximum velocity and acceleration for the same amplitude. This applies to pendulums, springs, vibrating strings, and molecular vibrations.
        </p>
      </SEOSection>

      <SEOSection title="Relationship to Other Calculators">
        <p>
          Angular frequency is related to several other physics concepts. The {createInternalLink('angular-velocity-calculator', 'Angular Velocity Calculator')} deals with rotational motion of rigid bodies, while angular frequency describes oscillations. The {createInternalLink('frequency-calculator', 'Frequency Calculator')} helps with basic frequency conversions. For wave applications, check the {createInternalLink('wavelength-calculator', 'Wavelength Calculator')} to relate frequency to wavelength. In AC circuits, angular frequency connects to the {createInternalLink('capacitive-reactance-calculator', 'Capacitive Reactance Calculator')} via Xc = 1/(ωC).
        </p>
      </SEOSection>

      <SEOFAQ questions={[
        {
          question: 'What is the difference between angular frequency and regular frequency?',
          answer: 'Regular frequency (f) counts cycles per second in Hz. Angular frequency (ω) measures radians per second, where one complete cycle is 2π radians. They are related by ω = 2πf. Angular frequency is more natural for mathematical descriptions of oscillations and waves.'
        },
        {
          question: 'When should I use angular frequency instead of frequency?',
          answer: 'Use angular frequency in physics equations involving sine and cosine functions, differential equations for oscillators, AC circuit analysis, wave equations, and quantum mechanics. Use regular frequency when discussing cycles, Hertz, or practical measurements like radio frequencies or musical notes.'
        },
        {
          question: 'How do I convert rpm to angular frequency?',
          answer: 'First convert rpm to Hz by dividing by 60 (since 60 rpm = 1 Hz). Then multiply by 2π to get angular frequency in rad/s. Formula: ω = 2π × (rpm/60) = π × rpm / 30.'
        },
        {
          question: 'What is the period of oscillation?',
          answer: 'Period (T) is the time required for one complete oscillation cycle, measured in seconds. It is the reciprocal of frequency: T = 1/f. For example, if f = 10 Hz, then T = 0.1 seconds (one cycle every tenth of a second).'
        },
        {
          question: 'Why is 2π important in angular frequency?',
          answer: '2π radians equals one complete circle (360 degrees). Since angular frequency measures rotation rate in radians per second, and frequency measures cycles per second, the conversion factor is 2π: one cycle = 2π radians of rotation.'
        }
      ]} />
    </CalculatorPageTemplate>
  );
}
