import ElectricMotorTorqueCalculator from '../../../_components/calculators/ElectricMotorTorqueCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

const title = 'Electric Motor Torque Calculator | Shaft Torque from Power and Speed';
const description = 'Calculate electric motor torque from power, speed, efficiency, torque constant, or force-radius. Supports N·m and lb·ft with rpm and rad/s conversions.';
const keywords = [
  'electric motor torque calculator',
  'motor torque from power',
  'shaft torque calculator',
  'torque from horsepower',
  'torque from kilowatts',
  'rpm to torque calculator',
  'motor torque constant',
  'Kt torque calculator',
  'torque from current',
  'electric motor efficiency torque',
  'shaft power to torque',
  'lb ft torque calculator',
  'Nm torque calculator',
  'motor speed torque',
  'electric drive torque',
  'industrial motor torque',
  'servo motor torque',
  'dc motor torque',
  'ac motor torque',
  'engineering torque calculator',
  'physics torque calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/electric-motor-torque-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/electric-motor-torque-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function ElectricMotorTorquePage() {
  return (
    <CalculatorPageTemplate
      title="Motor Torque Calculator | Calculate Electric Motor Shaft Torque Instantly"
      description="Calculate motor torque from power, speed, current, or force. Instant results in N·m and lb·ft. Free motor torque calculator for engineers and technicians."
      calculator={<ElectricMotorTorqueCalculator />}
      slug="physics/electric-motor-torque-calculator"
      category="Mechanics"
      features={[
        "Instant motor torque calculation",
        "Multiple input methods (power, current, force)",
        "Supports N·m and lb·ft outputs",
        "Mobile-optimized interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Why Motor Torque Matters in Real-World Engineering">
        <p>
          Every electric motor application—from industrial conveyors to robotic arms—depends on accurate torque calculations to ensure reliable operation. Whether you're sizing a motor for a new pump installation, verifying nameplate specifications, or troubleshooting underperforming equipment, understanding shaft torque is essential. This motor torque calculator simplifies complex conversions and provides instant results for power-speed relationships, efficiency-adjusted calculations, torque constant evaluations, and force-radius scenarios. If you're working with related mechanical calculations like {createInternalLink('angular-velocity-calculator')}, you'll find our comprehensive physics toolkit invaluable for design and validation work.
        </p>
      </SEOSection>

      <SEOSection title="How to Use This Calculator">
        <p>Follow these steps to get instant results:</p>
        <ol>
          <li><strong>Step 1:</strong> Select your calculation method (power-speed, power-efficiency-speed, torque constant-current, or force-radius)</li>
          <li><strong>Step 2:</strong> Enter your known values with appropriate units (kW, HP, rpm, rad/s, current in A, etc.)</li>
          <li><strong>Step 3:</strong> Click Calculate to instantly view torque output in both newton-meters and pound-feet with detailed formulas</li>
        </ol>
      </SEOSection>

      <SEOSection title="The Core Concept: Motor Torque Calculator Formula">
        <p>
          Electric motor torque represents rotational force at the shaft. The fundamental relationship connects mechanical power (P) and angular velocity (ω) through the equation below. This formula applies universally across AC motors, DC motors, servo drives, and stepper systems.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">τ = P / ω</p>
        </div>
        <p>Where τ is torque (N·m), P is power (Watts), and ω is angular velocity (rad/s). For rpm inputs, convert using ω = 2π × rpm / 60.</p>
        <h4 className="font-semibold mt-4">Worked Example:</h4>
        <p>A 3-phase induction motor delivers 5.5 kW at 1750 rpm. Calculate shaft torque:</p>
        <ul>
          <li>Input: P = 5500 W, Speed = 1750 rpm</li>
          <li>Convert speed: ω = 2π × 1750 / 60 = 183.26 rad/s</li>
          <li>Result: τ = 5500 / 183.26 = <strong>30.0 N·m</strong> (22.1 lb·ft)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <p>Motor torque calculations are critical across diverse industries and engineering disciplines:</p>
        <SEOList items={[
          "Industrial automation: Sizing motors for conveyor belts, robotic joints, and CNC machine tools",
          "HVAC systems: Selecting fan and pump motors with adequate starting and running torque",
          "Automotive engineering: Evaluating electric vehicle drive motors and regenerative braking systems",
          "Aerospace: Designing actuators for flight control surfaces and landing gear mechanisms",
          "Manufacturing: Specifying servo motors for precision positioning and torque-limited assembly operations"
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What's the difference between starting torque and running torque?",
            answer: "Starting torque (breakaway torque) is the initial rotational force needed to overcome static friction and inertia. Running torque is the continuous force required to maintain constant speed under load. Most motors produce 150-300% of rated torque during startup."
          },
          {
            question: "How do I convert horsepower to motor torque?",
            answer: "Use the formula τ = (HP × 5252) / rpm for imperial units, or convert HP to watts first (1 HP = 745.7 W) then apply τ = P / ω. The calculator handles both conversions automatically for accurate results."
          },
          {
            question: "What is torque constant (Kt) in DC motors?",
            answer: "Torque constant Kt defines the relationship between armature current and electromagnetic torque (τ = Kt × I). Typical values range from 0.01 to 1.0 N·m/A depending on motor size. This parameter is critical for servo motor selection and control system design."
          },
          {
            question: "Why does torque decrease with motor speed?",
            answer: "For constant power applications, torque and speed have an inverse relationship (τ = P / ω). As rpm increases, available torque decreases proportionally. This is fundamental to understanding motor performance curves and selecting appropriate gear ratios."
          },
          {
            question: "Can I calculate torque if I only know motor efficiency?",
            answer: "Yes—use input power multiplied by efficiency to find output power, then divide by angular velocity. For example, 10 kW input at 92% efficiency and 1500 rpm yields τ = (10000 × 0.92) / (2π × 1500/60) ≈ 58.6 N·m."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Mastering motor torque calculations is essential for anyone working with electric drives, from equipment selection to performance troubleshooting. This calculator eliminates manual conversion errors and provides immediate, accurate results for critical engineering decisions.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('electrical-power-calculator')} or the popular {createInternalLink('torque-calculator')} for complementary rotational mechanics calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
