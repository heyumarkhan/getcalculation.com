import AntennaLengthCalculator from '../../../_components/calculators/AntennaLengthCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function AntennaLengthCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Antenna Length Calculator: Calculate RF Antenna Length from Frequency"
      description="Calculate antenna length from frequency for RF design. Supports half-wave dipole and quarter-wave monopole antennas with adjustable velocity factor. Free online calculator."
      calculator={<AntennaLengthCalculator />}
      slug="physics/antenna-length-calculator"
      category="Physics"
      features={[
        "Calculate antenna length from frequency",
        "Support for half-wave dipole and quarter-wave monopole antennas",
        "Adjustable velocity factor",
        "Comprehensive unit conversion",
        "Step-by-step solutions with detailed explanations"
      ]}
    >
      <SEOSection title="Understanding Antenna Length in RF Design">
        <p>
          Antenna length directly determines the resonant {createInternalLink('frequency-calculator')} and performance of any antenna system. The relationship between antenna length and frequency is governed by the wavelength of the electromagnetic wave. For RF design, calculating the correct antenna length is essential for ensuring proper impedance matching, radiation efficiency, and optimal signal transmission and reception.
        </p>
        <p>
          The antenna length formula depends on the wavelength and the antenna type. A half-wave dipole requires length = λ/2, while a quarter-wave monopole requires length = λ/4. This calculator simplifies the calculation by automatically computing antenna length from your operating frequency, accounting for velocity factor to ensure real-world accuracy.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Antenna Length Calculator">
        <ol>
          <li><strong>Enter Operating Frequency:</strong> Input your desired frequency in MHz and select your preferred units for the result.</li>
          <li><strong>Select Antenna Type:</strong> Choose between half-wave dipole (most common) or quarter-wave monopole based on your application.</li>
          <li><strong>Calculate and Adjust:</strong> The calculator provides antenna length with velocity factor adjustment (default 0.95). Review the step-by-step solution for detailed calculations.</li>
        </ol>
      </SEOSection>

      <SEOSection title="Antenna Length Formula and Calculation">
        <p>
          Antenna length is calculated using the fundamental relationship between wavelength and frequency:
        </p>
        <SEOFormula
          formula="L = (c / (n × f)) × vf"
          description="Where: L = Antenna Length, c = Speed of Light (299,792,458 m/s), f = Frequency (Hz), n = 2 for half-wave dipole, 4 for quarter-wave monopole, vf = Velocity Factor (typically 0.95)"
        />
        <p>
          <strong>Example:</strong> Calculate the antenna length for a half-wave dipole at 144 MHz with velocity factor 0.95:
        </p>
        <ul>
          <li>L = (299,792,458 / (2 × 144,000,000)) × 0.95</li>
          <li>L = (299,792,458 / 288,000,000) × 0.95</li>
          <li>L = 1.040 × 0.95 = 0.988 meters ≈ 39 inches</li>
        </ul>
        <p>
          For quick calculations, use L = 468 / f(MHz) in feet for half-wave dipoles, or L = 142.5 / f(MHz) in meters. Velocity factor adjustments may be needed for real-world applications.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications of Antenna Length Calculations">
        <SEOList items={[
          "<strong>Amateur Radio:</strong> Ham radio operators calculate antenna lengths for specific frequency bands to ensure optimal radiation efficiency and impedance matching.",
          "<strong>Wireless Communications:</strong> Wi-Fi, cellular, and Bluetooth devices require precise antenna sizing to achieve required performance and comply with regulatory standards.",
          "<strong>Broadcast Engineering:</strong> Radio and television stations design antennas using precise length calculations for proper coverage and signal strength.",
          "<strong>RF Circuit Design:</strong> PCB-mounted antennas and RF modules require accurate length calculations for the intended operating frequency.",
          "<strong>Aerospace Applications:</strong> Aircraft and satellite communications systems depend on properly calculated antenna dimensions for reliable signal transmission."
        ]} />
      </SEOSection>



      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "How do you calculate antenna length from frequency?",
            answer: "Use the formula L = (c / (n × f)) × vf, where c is the speed of light (299,792,458 m/s), n is 2 for half-wave or 4 for quarter-wave, f is frequency in Hz, and vf is velocity factor (typically 0.95). The simplified formula for feet is L = 468 / f(MHz) for half-wave dipoles."
          },
          {
            question: "What is velocity factor and why is it important?",
            answer: "Velocity factor (vf) accounts for how fast electromagnetic waves travel in the antenna material versus free space. Wire antennas typically have vf = 0.95-0.98, meaning waves travel at 95-98% of light speed. Using the correct velocity factor ensures your antenna resonates at the intended frequency, avoiding performance problems."
          },
          {
            question: "What is the difference between half-wave and quarter-wave antennas?",
            answer: "A half-wave dipole (λ/2 long) has a balanced design and works well for general RF use. A quarter-wave monopole (λ/4 long) is more compact but requires a ground plane to operate effectively. Half-wave antennas have ~73Ω impedance, while quarter-wave monopoles present ~36.5Ω impedance with an ideal ground plane."
          },
          {
            question: "How do I tune an antenna after building it?",
            answer: "Measure the antenna's resonant frequency with an antenna analyzer or SWR meter. If resonance is higher than desired, the antenna is too short and needs lengthening. If lower, it's too long and needs shortening. Make small adjustments and re-measure until resonance matches your target frequency."
          },
          {
            question: "What happens if my antenna is the wrong length?",
            answer: "If too long, the antenna resonates at a lower frequency than intended. If too short, it resonates higher. Wrong length causes impedance mismatch, reduced efficiency, poor radiation pattern, and suboptimal performance. The antenna will still work but with significantly reduced effectiveness."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Accurate antenna length calculations are essential for RF design, wireless communications, and amateur radio applications. Our Antenna Length Calculator simplifies the complex relationship between frequency, wavelength, and antenna length, accounting for velocity factor to ensure real-world accuracy. Whether you're designing a simple dipole for amateur radio or engineering a compact monopole for a wireless device, precise antenna length calculations determine overall system performance.
        </p>
        <p>
          Start your antenna design project today with our free calculator. For additional RF and physics calculations, explore our {createInternalLink('wavelength-calculator')} to understand light propagation or our {createInternalLink('displacement-calculator')} for related physics applications.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

