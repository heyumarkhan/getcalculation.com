import CalculatorPageTemplate from '@/app/_components/layouts/CalculatorPageTemplate';
import FPECalculator from '@/app/_components/calculators/FPECalculator';
import { SEOSection, SEOFAQ } from '@/app/_components/ui/SEOContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FPE Calculator — Foot-pounds of Energy | Calculate FPE, Force & Distance',
  description: 'Free online FPE calculator for foot-pounds of energy. Calculate foot-pounds of energy (FPE), force, distance, or convert energy units. Perfect for physics, engineering, and ballistics.',
  keywords: [
    'FPE calculator',
    'foot-pounds of energy calculator',
    'foot-pounds calculator',
    'foot-pounds energy',
    'ft-lbf calculator',
    'energy calculator',
    'work calculation',
    'force distance calculator',
    'joule to foot-pounds converter',
    'energy unit converter',
    'kinetic energy calculator',
    'ballistics calculator',
    'physics calculator',
    'mechanics calculator',
    'foot-pound converter',
    'imperial energy units',
    'BTU to foot-pounds',
    'joule converter',
    'work energy formula',
    'physics energy calculator'
  ],
  openGraph: {
    title: 'FPE Calculator — Foot-pounds of Energy',
    description: 'Calculate foot-pounds of energy, force, or distance. Free online calculator with unit conversion.',
    type: 'website',
  },
};

export default function FPECalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="FPE Calculator: Calculate Foot-pounds of Energy (FPE = Force × Distance)"
      description="Calculate foot-pounds of energy (FPE), force, or distance using the fundamental formula FPE = Force × Distance. Free online physics calculator with comprehensive unit conversion for Imperial and metric systems."
      calculator={<FPECalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/fpe-calculator"
      category="Mechanics"
      features={[
        'Four calculation modes: FPE, Force, Distance, and Unit Conversion',
        'Support for Imperial (lbf, ft) and metric (N, m) force and distance units',
        'Comprehensive energy unit support (ft·lbf, J, BTU, cal, kWh, Wh)',
        'Step-by-step calculation display with detailed formulas',
        'Instant results with accurate unit conversion',
        'Perfect for ballistics, engineering, and physics applications',
      ]}
    >
      <SEOSection title="Understanding Foot-pounds of Energy (FPE)">
        <p>
          Foot-pounds of energy (FPE or ft·lbf) is an Imperial unit of measurement used to quantify the amount of 
          work performed or energy transferred when a force is applied over a distance. It represents the energy 
          required to move one pound-force through a distance of one foot in the direction of the force. This unit 
          is widely used in ballistics, mechanical engineering, physics education, and practical applications in 
          the United States and other countries that use Imperial measurements.
        </p>
        <p>
          The FPE calculator allows you to easily calculate foot-pounds of energy, force, distance, or convert 
          between different energy units. Understanding FPE is essential for analyzing mechanical systems, calculating 
          ballistic energy, designing mechanical components, and solving physics problems involving work and energy.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the FPE Calculator">
        <p>
          This calculator provides four flexible calculation modes:
        </p>
        <ol>
          <li><strong>Calculate FPE (Foot-pounds of Energy):</strong> Enter force and distance to find foot-pounds of energy using FPE = Force × Distance.</li>
          <li><strong>Calculate Force:</strong> Enter energy and distance to find the required force using F = FPE ÷ Distance.</li>
          <li><strong>Calculate Distance:</strong> Enter energy and force to find the distance traveled using D = FPE ÷ Force.</li>
          <li><strong>Convert Energy Units:</strong> Convert between different energy units (ft·lbf, J, BTU, cal, Wh, kWh, etc.).</li>
        </ol>
        <p>
          Select your desired calculation from the dropdown menu, enter the known values in their respective units, 
          and click Calculate. The calculator displays results with a complete step-by-step breakdown of the calculation 
          process, making it easy to understand and verify your results.
        </p>
      </SEOSection>

      <SEOSection title="The Foot-pounds Formula: FPE = Force × Distance">
        <p>
          The fundamental formula for calculating foot-pounds of energy is:
        </p>
        <p>
          <strong>FPE = Force × Distance</strong>
        </p>
        <p>
          Where:
        </p>
        <ul>
          <li><strong>FPE</strong> = Foot-pounds of energy (ft·lbf)</li>
          <li><strong>Force</strong> = Applied force (typically in pound-force, lbf)</li>
          <li><strong>Distance</strong> = Distance over which force is applied (typically in feet, ft)</li>
        </ul>
        <p>
          This relationship shows that energy (or work) is directly proportional to both the magnitude of the 
          force applied and the distance over which that force acts. Doubling either the force or the distance 
          will double the foot-pounds of energy, while halving either parameter will halve the energy.
        </p>
      </SEOSection>

      <SEOSection title="Units of Force and Distance in FPE Calculations">
        <p>
          <strong>Force Units Supported:</strong>
        </p>
        <ul>
          <li><strong>lbf (pound-force):</strong> The primary Imperial unit of force, equal to the force required to accelerate one pound-mass at 32.174 ft/s²</li>
          <li><strong>N (Newton):</strong> The SI unit of force; 1 lbf ≈ 4.44822 N</li>
          <li><strong>kN (Kilonewton):</strong> 1000 Newtons; useful for large forces</li>
          <li><strong>kgf (kilogram-force):</strong> The force required to accelerate one kilogram-mass at 9.80665 m/s²</li>
        </ul>
        <p>
          <strong>Distance Units Supported:</strong>
        </p>
        <ul>
          <li><strong>ft (foot):</strong> The primary Imperial unit of distance; 1 ft = 12 inches</li>
          <li><strong>in (inch):</strong> 1/12 of a foot; commonly used for smaller distances</li>
          <li><strong>m (meter):</strong> The SI unit of distance; 1 m ≈ 3.28084 ft</li>
          <li><strong>cm (centimeter):</strong> 1/100 of a meter; useful for small measurements</li>
          <li><strong>yd (yard):</strong> 3 feet; often used in sports and large distances</li>
          <li><strong>mi (mile):</strong> 5,280 feet; used for very large distances</li>
        </ul>
      </SEOSection>

      <SEOSection title="Energy Units and FPE Conversions">
        <p>
          Foot-pounds of energy can be converted to various other energy units depending on your application:
        </p>
        <p>
          <strong>Common Energy Unit Conversions:</strong>
        </p>
        <ul>
          <li><strong>Joule (J):</strong> SI unit of energy; 1 ft·lbf ≈ 1.35582 J</li>
          <li><strong>Kilojoule (kJ):</strong> 1000 Joules; used for larger energy quantities</li>
          <li><strong>Calorie (cal):</strong> Used in nutrition and chemistry; 1 ft·lbf ≈ 0.323831 cal</li>
          <li><strong>Kilocalorie (kcal):</strong> 1000 calories; used in nutrition</li>
          <li><strong>BTU (British Thermal Unit):</strong> Common in HVAC and thermodynamics; 1 ft·lbf ≈ 0.000775806 BTU</li>
          <li><strong>Watt-hour (Wh):</strong> Energy consumption unit; 1 ft·lbf ≈ 0.000376616 Wh</li>
          <li><strong>Kilowatt-hour (kWh):</strong> 1000 Watt-hours; electricity billing unit</li>
        </ul>
        <p>
          The calculator automatically handles these conversions, allowing you to work with the most convenient 
          units for your specific application.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications of FPE Calculator">
        <p>
          The FPE calculator has numerous real-world applications across different fields:
        </p>
        <p>
          <strong>1. Ballistics and Ammunition Analysis</strong>
        </p>
        <ul>
          <li>Calculate kinetic energy of projectiles (bullets, arrows)</li>
          <li>Determine stopping power and energy transfer on impact</li>
          <li>Compare ammunition effectiveness across different calibers</li>
          <li>Estimate penetration capability based on energy</li>
        </ul>
        <p>
          <strong>2. Mechanical Engineering</strong>
        </p>
        <ul>
          <li>Calculate work done by mechanical systems</li>
          <li>Design mechanical linkages and levers</li>
          <li>Determine power requirements for machinery</li>
          <li>Analyze efficiency of mechanical devices</li>
        </ul>
        <p>
          <strong>3. Physics and Education</strong>
        </p>
        <ul>
          <li>Solve work-energy problems in physics courses</li>
          <li>Understand the relationship between force, distance, and energy</li>
          <li>Demonstrate Imperial versus metric unit systems</li>
          <li>Analyze kinetic and potential energy</li>
        </ul>
        <p>
          <strong>4. Sports and Recreation</strong>
        </p>
        <ul>
          <li>Calculate energy in archery and crossbow applications</li>
          <li>Analyze impact force in martial arts and sports</li>
          <li>Determine striking power in combat sports</li>
          <li>Evaluate equipment performance</li>
        </ul>
        <p>
          <strong>5. HVAC and Thermodynamics</strong>
        </p>
        <ul>
          <li>Convert between Imperial and SI units</li>
          <li>Calculate work in compressors and expanders</li>
          <li>Analyze thermal system efficiency</li>
          <li>Design heating and cooling systems</li>
        </ul>
      </SEOSection>

      <SEOSection title="Examples and Real-World Scenarios">
        <p>
          <strong>Example 1: Calculating Kinetic Energy of a Bullet</strong>
        </p>
        <p>
          A 55-grain (.223 Remington) bullet travels at 3,165 feet per second. What is its kinetic energy in foot-pounds?
        </p>
        <p>
          Note: This requires mass and velocity (KE = ½mv²), which demonstrates the difference between force-distance 
          work and kinetic energy calculations. The FPE calculator focuses on work calculation using force and distance.
        </p>
        <p>
          <strong>Example 2: Work Done by a Machine</strong>
        </p>
        <p>
          A hydraulic press applies a constant force of 500 lbf through a distance of 2 feet. How much work (in foot-pounds) 
          is performed?
        </p>
        <ul>
          <li>Force: 500 lbf</li>
          <li>Distance: 2 ft</li>
          <li>FPE = 500 × 2 = 1000 ft·lbf</li>
          <li>Conversion: 1000 ft·lbf ≈ 1355.82 J (Joules)</li>
        </ul>
        <p>
          This work energy can then be used to analyze system efficiency or power output.
        </p>
        <p>
          <strong>Example 3: Arrow Energy in Archery</strong>
        </p>
        <p>
          A bowstring imparts a force equivalent to 60 lbf over a 6-inch (0.5 ft) draw distance. What is the arrow's energy?
        </p>
        <ul>
          <li>Force: 60 lbf</li>
          <li>Distance: 0.5 ft</li>
          <li>FPE = 60 × 0.5 = 30 ft·lbf</li>
          <li>Conversion: 30 ft·lbf ≈ 40.67 J</li>
        </ul>
        <p>
          This calculation helps archers understand their equipment's power and potential effectiveness.
        </p>
        <p>
          <strong>Example 4: Converting Between Energy Units</strong>
        </p>
        <p>
          A mechanical system performs 5000 foot-pounds of work. Convert this to:
        </p>
        <ul>
          <li>Joules: 5000 × 1.35582 = 6779.1 J</li>
          <li>BTU: 5000 × 0.000775806 ≈ 3.88 BTU</li>
          <li>Kilowatt-hours: 5000 × 0.000376616 ≈ 0.00188 kWh</li>
        </ul>
      </SEOSection>

      <SEOSection title="FPE vs. Other Energy Units">
        <p>
          Understanding how foot-pounds relates to other energy units is essential for working in different scientific 
          and engineering contexts:
        </p>
        <p>
          <strong>Foot-pounds vs. Joules:</strong> Joules is the SI standard unit. 1 ft·lbf = 1.35582 J. Joules are 
          more commonly used in modern physics and engineering.
        </p>
        <p>
          <strong>Foot-pounds vs. BTU:</strong> BTU (British Thermal Unit) measures thermal energy. 1 BTU ≈ 1054.35 J 
          or about 778.169 ft·lbf. BTUs are common in HVAC and thermodynamics.
        </p>
        <p>
          <strong>Foot-pounds vs. Calories:</strong> Calories measure food energy and heat. 1 calorie = 4.184 J or 
          about 3.087 ft·lbf. Kilocalories (kcal) are used in nutrition.
        </p>
        <p>
          <strong>Foot-pounds vs. Watt-hours:</strong> Watt-hours measure electrical energy. 1 Wh = 3600 J or about 
          2655 ft·lbf. Kilowatt-hours (kWh) are used in electricity billing.
        </p>
      </SEOSection>

      <SEOSection title="Deriving Force and Distance from FPE">
        <p>
          The FPE formula can be rearranged to solve for force or distance:
        </p>
        <p>
          <strong>To Find Force:</strong> F = FPE ÷ Distance
        </p>
        <p>
          If you know the work performed (FPE) and the distance over which it was applied, you can calculate 
          the average force that was applied.
        </p>
        <p>
          <strong>To Find Distance:</strong> D = FPE ÷ Force
        </p>
        <p>
          If you know the work performed (FPE) and the force applied, you can calculate the distance over which 
          the force acted.
        </p>
        <p>
          These rearrangements are useful in troubleshooting mechanical systems, analyzing accidents, or predicting 
          system performance based on available energy and force constraints.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is a foot-pound of energy and why is it used?',
            answer: 'A foot-pound (ft·lbf) is an Imperial unit of energy that represents the work done when 1 pound-force moves through 1 foot. It is primarily used in ballistics, mechanical engineering, and in countries using Imperial measurements. While Joules are the modern SI standard, foot-pounds remain common in firearms, ammunition, and mechanical applications.',
          },
          {
            question: 'How is foot-pounds of energy different from kinetic energy?',
            answer: 'Foot-pounds of energy (work) is calculated as Force × Distance, while kinetic energy is calculated as ½ × mass × velocity². They represent different concepts: FPE measures work done by a force, while kinetic energy measures the motion energy of an object. However, work energy theorem shows they are related—work done on an object changes its kinetic energy.',
          },
          {
            question: 'How do I calculate FPE for a moving object (ballistics)?',
            answer: 'For ballistics, you need to use kinetic energy formula (KE = ½mv²) rather than FPE = Force × Distance. However, you can express kinetic energy in foot-pounds and use the FPE calculator to convert to other units. The calculator excels at work calculations rather than kinetic energy calculations.',
          },
          {
            question: 'What is the difference between foot-pounds and foot-pounds-force (ft·lbf)?',
            answer: 'These terms are essentially the same. Both represent the work done when a pound-force moves through one foot of distance. The "force" is implied in both terms. Some sources use ft·lbf to be explicit, while others simply use "foot-pounds."',
          },
          {
            question: 'How do I convert foot-pounds to Joules?',
            answer: 'Multiply foot-pounds by 1.35582 to convert to Joules. For example, 100 ft·lbf × 1.35582 = 135.582 J. The FPE calculator can perform this conversion automatically for you with various energy units.',
          },
          {
            question: 'What is the relationship between power and foot-pounds?',
            answer: 'Power measures the rate at which work (energy) is performed. If 1000 foot-pounds of work is done in 1 second, the power is 1000 ft·lbf/sec or approximately 1.82 horsepower. Power = Energy (FPE) ÷ Time. The more foot-pounds performed in less time, the greater the power.',
          },
          {
            question: 'Why do ballistics use foot-pounds instead of Joules?',
            answer: 'Foot-pounds are traditional in ballistics and remain widely used in the United States, where Imperial units dominate. Historical ballistics tables and ammunition specifications use ft·lbf, making it convenient for shooters and hunters. Modern ballistics sources often provide both units for clarity.',
          },
          {
            question: 'Can the FPE calculator be used for any force and distance calculation?',
            answer: 'Yes! The FPE calculator works for any scenario involving force applied over distance, including hydraulic systems, mechanical presses, gravity calculations, and any engineering application where you need to calculate work or convert between energy units. The results are valid regardless of the specific application.',
          },
        ]}
      />
    </CalculatorPageTemplate>
  );
}
