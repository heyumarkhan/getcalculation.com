import ResonantFrequencyCalculator from '../../../_components/calculators/ResonantFrequencyCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function ResonantFrequencyCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Resonant Frequency Calculator: Calculate LC Circuit & Mechanical Resonance"
      description="Calculate resonant frequency for LC circuits (f = 1/(2π√(LC))) or mechanical systems (f = (1/(2π))√(k/m)). Free online physics calculator for electronics and mechanics with step-by-step solutions."
      calculator={<ResonantFrequencyCalculator />}
      slug="physics/resonant-frequency-calculator"
      category="Waves"
      features={[
        "Calculate resonant frequency for LC circuits",
        "Calculate resonant frequency for mechanical systems",
        "Multiple unit conversions (Hz, kHz, MHz, etc.)",
        "Step-by-step solutions",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Resonant Frequency: The Natural Oscillation">
        <p>
          Resonant frequency is a fundamental concept in physics and engineering that describes the natural frequency at which a system oscillates with maximum amplitude when subjected to a periodic driving force. Whether you&apos;re designing electronic circuits, analyzing mechanical systems, or studying wave phenomena, understanding resonant frequency is essential. Our Resonant Frequency Calculator makes it easy to calculate resonant frequency for two common scenarios: <strong>LC circuits (f = 1/(2π√(LC)))</strong> and <strong>mechanical spring-mass systems (f = (1/(2π))√(k/m))</strong>.
        </p>
        <p>
          At resonance, a system responds with maximum amplitude to an external driving force. This phenomenon occurs in electrical circuits, mechanical systems, acoustic systems, and many other physical systems. Understanding and controlling resonant frequency is crucial for designing filters, oscillators, antennas, and vibration control systems.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Resonant Frequency Calculator">
        <p>
          Our Resonant Frequency Calculator supports two calculation modes:
        </p>
        <ol>
          <li><strong>LC Circuit Mode:</strong> Enter inductance (L) and capacitance (C) to calculate resonant frequency using f = 1/(2π√(LC))</li>
          <li><strong>Mechanical System Mode:</strong> Enter spring constant (k) and mass (m) to calculate natural frequency using f = (1/(2π))√(k/m)</li>
        </ol>
        <p>
          Simply select your calculation mode, enter the required values, choose your units, and click Calculate to get instant results with step-by-step solutions.
        </p>
      </SEOSection>

      <SEOSection title="Understanding Resonant Frequency Formulas">
        <p>
          Resonant frequency is calculated differently depending on the system type:
        </p>
        
        <h3>1. LC Circuit Resonant Frequency</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">f = 1/(2π√(LC))</p>
          <p className="text-sm text-gray-600 mt-2">Where: f = resonant frequency, L = inductance, C = capacitance</p>
        </div>
        <p>
          This formula calculates the resonant frequency of an LC (inductor-capacitor) circuit. At this frequency, the circuit exhibits maximum impedance (for parallel LC) or minimum impedance (for series LC). LC circuits are fundamental components in radio frequency (RF) circuits, filters, and oscillators.
        </p>

        <h3>2. Mechanical System Resonant Frequency</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="font-mono text-lg font-bold">f = (1/(2π))√(k/m)</p>
          <p className="text-sm text-gray-600 mt-2">Where: f = natural/resonant frequency, k = spring constant, m = mass</p>
        </div>
        <p>
          This formula calculates the natural frequency of a simple harmonic oscillator (spring-mass system). At this frequency, the system oscillates with maximum amplitude when driven by an external force. This principle applies to mechanical vibrations, structural dynamics, and many engineering applications.
        </p>
      </SEOSection>

      <SEOSection title="Real-World Applications">
        <p>
          Resonant frequency calculations are used in countless real-world scenarios:
        </p>
        <SEOList items={[
          "Electronics: Designing LC filters, oscillators, and resonant circuits",
          "Radio Frequency (RF): Tuning antennas, matching networks, and RF filters",
          "Mechanical Engineering: Analyzing vibrations, designing suspension systems, and controlling resonance",
          "Structural Engineering: Understanding building dynamics, bridge oscillations, and earthquake response",
          "Acoustics: Designing musical instruments, speakers, and acoustic filters",
          "Automotive: Tuning engine mounts, suspension systems, and NVH (Noise, Vibration, Harshness) control",
          "Aerospace: Analyzing aircraft vibrations, satellite dynamics, and structural resonance",
          "Medical Devices: Designing ultrasound transducers and medical imaging equipment",
          "Telecommunications: Designing filters, resonators, and frequency-selective circuits"
        ]} />
      </SEOSection>

      <SEOSection title="Units and Measurements">
        <p>
          Resonant frequency calculations use various units depending on the application:
        </p>
        <ul>
          <li><strong>Frequency:</strong> Hz (Hertz), kHz (Kilohertz), MHz (Megahertz), GHz (Gigahertz)</li>
          <li><strong>Inductance:</strong> H (Henries), mH (Millihenries), μH (Microhenries), nH (Nanohenries)</li>
          <li><strong>Capacitance:</strong> F (Farads), mF (Millifarads), μF (Microfarads), nF (Nanofarads), pF (Picofarads)</li>
          <li><strong>Spring Constant:</strong> N/m (Newtons per meter), N/cm, N/mm, lb/in, lb/ft</li>
          <li><strong>Mass:</strong> kg (Kilograms), g (Grams), mg (Milligrams), lb (Pounds), oz (Ounces)</li>
        </ul>
        <p>
          <strong>Common Values:</strong>
        </p>
        <ul>
          <li>Typical inductor values: 1 μH to 100 mH</li>
          <li>Typical capacitor values: 1 pF to 1000 μF</li>
          <li>Typical resonant frequencies: Audio (20 Hz - 20 kHz), RF (kHz - GHz)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Resonant Frequency Calculations">
        <h3>Example 1: LC Circuit</h3>
        <p>Calculate the resonant frequency of an LC circuit with L = 10 μH and C = 100 pF.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">L = 10 μH = 10 × 10⁻⁶ H = 0.00001 H</p>
          <p className="font-mono">C = 100 pF = 100 × 10⁻¹² F = 0.0000000001 F</p>
          <p className="font-mono">f = 1/(2π√(LC)) = 1/(2π√(0.00001 × 0.0000000001))</p>
          <p className="font-mono">f = 1/(2π × 0.000001) = 159,155 Hz ≈ 159.2 kHz</p>
        </div>

        <h3>Example 2: Mechanical System</h3>
        <p>A spring-mass system has a spring constant of 500 N/m and a mass of 2 kg. What is its natural frequency?</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">k = 500 N/m, m = 2 kg</p>
          <p className="font-mono">f = (1/(2π))√(k/m) = (1/(2π))√(500/2)</p>
          <p className="font-mono">f = (1/(2π))√250 = (1/(2π)) × 15.81 = 2.52 Hz</p>
        </div>

        <h3>Example 3: Radio Frequency Circuit</h3>
        <p>An RF circuit uses L = 0.5 μH and C = 10 pF. Calculate the resonant frequency.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-mono">L = 0.5 μH = 0.5 × 10⁻⁶ H</p>
          <p className="font-mono">C = 10 pF = 10 × 10⁻¹² F</p>
          <p className="font-mono">f = 1/(2π√(0.5 × 10⁻⁶ × 10 × 10⁻¹²))</p>
          <p className="font-mono">f = 1/(2π × 7.071 × 10⁻⁹) = 22.5 MHz</p>
        </div>
      </SEOSection>

      <SEOSection title="Resonance vs. Other Frequencies">
        <p>
          Understanding the difference between resonant frequency and other frequency concepts is important:
        </p>
        <ul>
          <li><strong>Resonant Frequency:</strong> The natural frequency at which a system oscillates with maximum amplitude</li>
          <li><strong>Natural Frequency:</strong> The frequency at which a system oscillates when disturbed (same as resonant frequency for undamped systems)</li>
          <li><strong>Driving Frequency:</strong> The frequency of an external force applied to a system</li>
          <li><strong>Damped Frequency:</strong> The frequency of oscillation in a damped system (slightly lower than natural frequency)</li>
        </ul>
        <p>
          When the driving frequency matches the resonant frequency, the system exhibits resonance, which can be beneficial (tuning circuits) or problematic (structural vibrations).
        </p>
      </SEOSection>

      <SEOSection title="Factors Affecting Resonant Frequency">
        <p>
          Several factors influence resonant frequency:
        </p>
        <ul>
          <li><strong>For LC Circuits:</strong> Inductance and capacitance values directly determine resonant frequency. Lower L or C values result in higher frequencies</li>
          <li><strong>For Mechanical Systems:</strong> Spring constant and mass determine natural frequency. Stiffer springs or lighter masses result in higher frequencies</li>
          <li><strong>Damping:</strong> Damping reduces the amplitude at resonance but doesn&apos;t significantly change the resonant frequency (for light damping)</li>
          <li><strong>Temperature:</strong> Component values can change with temperature, affecting resonant frequency</li>
          <li><strong>Parasitic Effects:</strong> In real circuits, parasitic capacitance and inductance can shift the resonant frequency</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the difference between resonant frequency and natural frequency?",
            answer: "For undamped systems, resonant frequency and natural frequency are the same. Natural frequency is the frequency at which a system oscillates when disturbed. Resonant frequency is the frequency at which maximum response occurs when driven by an external force. In lightly damped systems, they are essentially identical."
          },
          {
            question: "How does damping affect resonant frequency?",
            answer: "Light damping has minimal effect on the resonant frequency itself, but it reduces the amplitude at resonance. Heavy damping can shift the resonant frequency slightly lower. The quality factor (Q) describes how sharp the resonance peak is - higher Q means less damping and a sharper resonance."
          },
          {
            question: "Can resonant frequency be negative?",
            answer: "No, resonant frequency is always positive. It represents a physical oscillation frequency, which must be a positive value. If you get a negative or imaginary result, check your input values for errors."
          },
          {
            question: "What happens at resonance?",
            answer: "At resonance, the system oscillates with maximum amplitude. For LC circuits, this means maximum energy transfer between the inductor and capacitor. For mechanical systems, this means maximum displacement or velocity. Resonance can be useful (tuning, filtering) or problematic (vibrations, structural failure)."
          },
          {
            question: "How do I change the resonant frequency of an LC circuit?",
            answer: "To increase resonant frequency, decrease either the inductance or capacitance (or both). To decrease resonant frequency, increase either the inductance or capacitance. The relationship is f ∝ 1/√(LC), so changing L or C by a factor of 4 changes frequency by a factor of 2."
          },
          {
            question: "What units should I use for resonant frequency calculations?",
            answer: "For LC circuits, use consistent units: H and F for base units, or use common units like μH and μF. For mechanical systems, use N/m for spring constant and kg for mass (or convert to these). Frequency is typically in Hz, but kHz, MHz, or GHz may be more convenient for high frequencies."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Understanding resonant frequency is fundamental to electronics, mechanics, and wave physics. Our Resonant Frequency Calculator simplifies these calculations, supporting both LC circuits and mechanical systems with multiple unit conversions to make solving resonance problems easy and accurate.
        </p>
        <p>
          Ready to explore more physics concepts? Check out our {createInternalLink('frequency-calculator', 'Frequency Calculator')} for general frequency calculations, our {createInternalLink('wavelength-calculator', 'Wavelength Calculator')} for wave properties, or our {createInternalLink('wavelength-to-frequency-calculator', 'Wavelength to Frequency Calculator')} for electromagnetic wave calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

