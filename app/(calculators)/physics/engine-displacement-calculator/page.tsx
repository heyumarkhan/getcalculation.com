import EngineDisplacementCalculator from '../../../_components/calculators/EngineDisplacementCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function EngineDisplacementCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Engine Displacement Calculator: Calculate Engine Size from Bore, Stroke & Cylinders"
      description="Calculate engine displacement (engine size) from bore, stroke, and number of cylinders using V = π × (Bore/2)² × Stroke × Cylinders. Free online automotive calculator with support for cc, liters, and cubic inches."
      calculator={<EngineDisplacementCalculator />}
      slug="physics/engine-displacement-calculator"
      category="Mechanics"
      features={[
        "Calculate engine displacement from bore, stroke, and cylinders",
        "Support for multiple length units (mm, cm, inches, feet)",
        "Output in cc (cubic centimeters), liters, cubic inches, or cubic feet",
        "Step-by-step calculation breakdown",
        "Detailed formula explanation",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Engine Displacement: Calculating Engine Size">
        <p>
          Engine displacement is a fundamental measurement in automotive engineering that represents the total volume swept by all pistons in an engine during one complete cycle. It's one of the most important specifications for understanding engine performance, power output, and efficiency. Our Engine Displacement Calculator simplifies these calculations, allowing you to determine engine size using the standard formula: <strong>Displacement = π × (Bore/2)² × Stroke × Number of Cylinders</strong>, where bore is the cylinder diameter, stroke is the distance the piston travels, and the calculation accounts for all cylinders in the engine.
        </p>
        <p>
          Whether you&apos;re an automotive engineer, mechanic, car enthusiast, or student studying mechanical engineering, understanding engine displacement is crucial for engine design, performance analysis, and vehicle specifications. Our calculator supports multiple units for both input (bore and stroke in millimeters, centimeters, meters, inches, or feet) and output (cubic centimeters, liters, cubic inches, or cubic feet), making it versatile for international applications and different measurement systems.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Engine Displacement Calculator">
        <p>
          Our Engine Displacement Calculator is straightforward and user-friendly:
        </p>
        <SEOList ordered items={[
          '<strong>Enter Bore (Cylinder Diameter):</strong> Input the diameter of the cylinder bore in your preferred unit (millimeters, centimeters, meters, inches, or feet). The bore is the inner diameter of the cylinder where the piston moves.',
          '<strong>Enter Stroke (Piston Travel Distance):</strong> Input the distance the piston travels from bottom dead center (BDC) to top dead center (TDC) in the same length unit as the bore.',
          '<strong>Enter Number of Cylinders:</strong> Input the total number of cylinders in the engine (must be a whole number, such as 4, 6, 8, or 12).',
          '<strong>Select Output Unit:</strong> Choose your preferred volume unit for the result - cubic centimeters (cc), liters (L), cubic meters (m³), cubic inches (in³), or cubic feet (ft³).',
          '<strong>Calculate:</strong> Click the Calculate button to get the total engine displacement with a detailed step-by-step breakdown showing how the calculation was performed.'
        ]} />
        <p>
          The calculator automatically converts all measurements to consistent base units, performs the displacement calculation using the standard formula, and presents the result in your chosen output unit with comprehensive calculation steps for verification and learning.
        </p>
      </SEOSection>

      <SEOSection title="Engine Displacement Formula Explained">
        <p>
          Engine displacement is calculated using the formula for the volume of a cylinder multiplied by the number of cylinders:
        </p>

        <SEOFormula
          formula="Displacement = π × (Bore/2)² × Stroke × Number of Cylinders"
          description="Where: π = Pi (approximately 3.14159), Bore = Cylinder diameter, Stroke = Piston travel distance, Number of Cylinders = Total cylinders in the engine"
        />

        <h3>Understanding Each Component:</h3>
        <SEOList items={[
          '<strong>Bore (B):</strong> The inner diameter of the cylinder, measured across the cylinder bore. Larger bore increases displacement. Measured in length units (mm, cm, inches, etc.).',
          '<strong>Stroke (S):</strong> The distance the piston travels from the bottom of its travel (bottom dead center, BDC) to the top of its travel (top dead center, TDC). Longer stroke increases displacement. Measured in the same length unit as bore.',
          '<strong>Radius (r = Bore/2):</strong> Half of the bore diameter, used to calculate the cross-sectional area of the cylinder (π × r²).',
          '<strong>Cylinder Volume:</strong> The volume of a single cylinder is calculated as π × r² × Stroke, representing the volume swept by the piston in one stroke.',
          '<strong>Total Displacement:</strong> The single cylinder volume multiplied by the number of cylinders gives the total engine displacement, representing the total volume of air/fuel mixture the engine can draw in during one complete cycle.',
          '<strong>π (Pi):</strong> The mathematical constant approximately equal to 3.14159, used in calculating circular area.'
        ]} />

        <h3>Example Calculation:</h3>
        <p>
          For a 4-cylinder engine with a bore of 86 mm and stroke of 86 mm:
        </p>
        <p className="font-mono bg-gray-100 p-4 rounded">
          Bore = 86 mm = 0.086 m<br />
          Stroke = 86 mm = 0.086 m<br />
          Radius = 0.086 / 2 = 0.043 m<br />
          Single Cylinder Volume = π × (0.043)² × 0.086 = 0.0005 m³ = 500 cc<br />
          Total Displacement = 500 cc × 4 = 2000 cc = 2.0 L
        </p>
      </SEOSection>

      <SEOSection title="Bore vs. Stroke: Understanding Engine Geometry">
        <p>
          The relationship between bore and stroke determines engine characteristics:
        </p>
        <SEOList items={[
          '<strong>Square Engine:</strong> When bore equals stroke (bore = stroke). Example: 86mm bore × 86mm stroke. Offers a balanced design with moderate characteristics.',
          '<strong>Oversquare Engine (Short Stroke):</strong> When bore is greater than stroke (bore &gt; stroke). Example: 100mm bore × 75mm stroke. Typically allows higher RPM operation, better breathing at high speeds, and often found in high-performance and racing engines.',
          '<strong>Undersquare Engine (Long Stroke):</strong> When bore is less than stroke (bore &lt; stroke). Example: 75mm bore × 100mm stroke. Typically produces more torque at lower RPM, better low-end power, and often found in diesel engines and applications requiring strong low-end torque.',
          '<strong>Bore/Stroke Ratio:</strong> The ratio of bore to stroke affects engine characteristics. Higher ratios (oversquare) favor high-RPM power, while lower ratios (undersquare) favor low-RPM torque.',
          '<strong>Displacement Impact:</strong> Both bore and stroke directly affect displacement. Increasing either dimension increases displacement, but engine design must balance both for optimal performance characteristics.'
        ]} />
      </SEOSection>

      <SEOSection title="Common Engine Displacement Units and Conversions">
        <p>
          Engine displacement is commonly expressed in different units depending on region and application:
        </p>
        <SEOList items={[
          '<strong>Cubic Centimeters (cc):</strong> Most common metric unit. 1 liter = 1,000 cc. Example: 2000 cc = 2.0 L. Widely used in motorcycles, small engines, and international automotive specifications.',
          '<strong>Liters (L):</strong> Standard metric unit for larger engines. Commonly used for car engines. Example: 2.0 L, 3.5 L, 5.0 L. Easy to understand and compare.',
          '<strong>Cubic Inches (in³ or ci):</strong> Common in the United States, especially for American V8 engines. Example: 350 ci, 454 ci. Classic American muscle car specifications often use cubic inches.',
          '<strong>Cubic Meters (m³):</strong> SI base unit, rarely used for automotive applications due to large numbers (1 m³ = 1,000,000 cc), but used in some engineering calculations.',
          '<strong>Cubic Feet (ft³):</strong> Rarely used for automotive engines, but included for completeness. More common in larger industrial engines.',
          '<strong>Conversion Examples:</strong> 1000 cc = 1.0 L = 61.0 in³, 350 in³ = 5735 cc = 5.735 L, 2.0 L = 2000 cc = 122.0 in³'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications of Engine Displacement">
        <p>
          Engine displacement calculations are essential in numerous applications:
        </p>
        <SEOList items={[
          '<strong>Automotive Engineering:</strong> Designing engines, determining specifications, and optimizing performance characteristics for vehicles.',
          '<strong>Performance Tuning:</strong> Calculating displacement changes from engine modifications such as bore kits, stroker kits, or engine rebuilds.',
          '<strong>Vehicle Classification:</strong> Many regions classify vehicles by engine displacement for taxation, insurance, or regulations (e.g., displacement-based road tax).',
          '<strong>Racing and Motorsports:</strong> Ensuring compliance with displacement regulations, calculating modifications, and optimizing engine size for specific racing classes.',
          '<strong>Engine Rebuilding:</strong> Verifying displacement after cylinder boring, stroker crankshaft installation, or other modifications that change engine dimensions.',
          '<strong>Aftermarket Modifications:</strong> Calculating displacement changes from performance upgrades, determining power potential, and ensuring compatibility with regulations.',
          '<strong>Educational Purposes:</strong> Teaching mechanical engineering principles, understanding engine fundamentals, and learning automotive technology.',
          '<strong>Engine Comparison:</strong> Comparing engines from different manufacturers, understanding power-to-displacement ratios, and evaluating engine efficiency.',
          '<strong>Vintage and Classic Cars:</strong> Verifying original specifications, documenting engine modifications, and maintaining historical accuracy.',
          '<strong>International Standards:</strong> Converting between metric and imperial units for engines manufactured or sold in different regions.'
        ]} />
      </SEOSection>

      <SEOSection title="Engine Displacement and Performance Characteristics">
        <p>
          Displacement directly influences engine performance, but it&apos;s not the only factor:
        </p>
        <SEOList items={[
          '<strong>Power Potential:</strong> Generally, larger displacement engines can produce more power, but efficiency, technology, and design also matter significantly. Modern small-displacement turbocharged engines often match or exceed larger naturally-aspirated engines.',
          '<strong>Torque Characteristics:</strong> Larger displacement typically produces more torque, especially at lower RPM. This is why many trucks and heavy-duty vehicles use large-displacement engines.',
          '<strong>Fuel Efficiency:</strong> Larger displacement engines generally consume more fuel, but modern technologies like cylinder deactivation and turbocharging can improve efficiency.',
          '<strong>Weight and Size:</strong> Larger displacement engines are typically heavier and larger, affecting vehicle design, handling, and weight distribution.',
          '<strong>Emissions:</strong> Displacement affects emissions, and many emissions regulations consider engine size. Smaller, more efficient engines can meet stricter emissions standards.',
          '<strong>Taxation and Regulations:</strong> Many countries base vehicle taxes or fees on engine displacement, making it important for cost considerations.',
          '<strong>Power-to-Displacement Ratio:</strong> Comparing power output to displacement (e.g., horsepower per liter) indicates engine efficiency and technology level. High-performance engines achieve 100+ HP/L, while economy engines might achieve 60-80 HP/L.'
        ]} />
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is engine displacement?",
            answer: "Engine displacement is the total volume swept by all pistons in an engine during one complete cycle. It represents the total volume of air/fuel mixture the engine can draw in and is a key specification for engine size, typically measured in cubic centimeters (cc), liters (L), or cubic inches (in³)."
          },
          {
            question: "How do you calculate engine displacement?",
            answer: "Engine displacement is calculated using the formula: Displacement = π × (Bore/2)² × Stroke × Number of Cylinders, where bore is the cylinder diameter, stroke is the piston travel distance, and the result is multiplied by the number of cylinders in the engine."
          },
          {
            question: "What is the difference between bore and stroke?",
            answer: "Bore is the inner diameter of the cylinder, while stroke is the distance the piston travels from bottom dead center to top dead center. When bore equals stroke, it's called a square engine. When bore is greater than stroke, it's oversquare (short stroke), and when bore is less than stroke, it's undersquare (long stroke)."
          },
          {
            question: "What is a typical engine displacement?",
            answer: "Typical engine displacements vary widely: small economy cars (1.0-1.6 L), mid-size cars (1.8-2.5 L), large sedans/SUVs (2.5-4.0 L), performance cars (3.0-5.0 L), and large trucks/SUVs (5.0-7.0 L+). Motorcycles typically range from 125 cc to 1800 cc, while commercial vehicles can exceed 10 L."
          },
          {
            question: "How do you convert cc to liters?",
            answer: "To convert cubic centimeters (cc) to liters (L), divide by 1000. For example, 2000 cc = 2.0 L, 3500 cc = 3.5 L. To convert liters to cc, multiply by 1000. This is a straightforward conversion since 1 liter = 1,000 cubic centimeters."
          },
          {
            question: "How do you convert liters to cubic inches?",
            answer: "To convert liters to cubic inches, multiply by 61.0237 (approximately 61). For example, 5.0 L = 305.1 in³, 2.0 L = 122.0 in³. To convert cubic inches to liters, divide by 61.0237. This conversion is commonly needed when comparing American and international engine specifications."
          },
          {
            question: "Does larger displacement always mean more power?",
            answer: "Not necessarily. While larger displacement generally allows for more power potential, modern engine technology, forced induction (turbocharging/supercharging), efficiency improvements, and design optimizations mean smaller engines can match or exceed larger engines. Power-to-displacement ratio (HP/L) is a better indicator of engine technology and efficiency."
          },
          {
            question: "What is the displacement of a 4-cylinder engine?",
            answer: "4-cylinder engine displacement varies widely. Common examples include: 1.6 L (1600 cc), 2.0 L (2000 cc), 2.4 L (2400 cc), and up to 3.0 L (3000 cc) or more in high-performance applications. The specific displacement depends on bore and stroke dimensions chosen by the manufacturer for the desired performance characteristics."
          },
          {
            question: "How does displacement affect fuel economy?",
            answer: "Generally, larger displacement engines consume more fuel, but modern technologies like cylinder deactivation, turbocharging, direct injection, and variable valve timing can improve efficiency. A well-designed smaller displacement turbocharged engine may achieve better fuel economy than a larger naturally-aspirated engine while producing similar power."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Engine displacement is a fundamental measurement in automotive engineering that directly impacts engine size, performance characteristics, and vehicle specifications. Our Engine Displacement Calculator provides a powerful and accurate tool for determining engine size from basic measurements, making complex calculations simple and accessible for engineers, mechanics, car enthusiasts, and students.
        </p>
        <p>
          By supporting multiple input and output units with comprehensive unit conversions and detailed step-by-step solutions, this calculator empowers users to work with engines from different regions and measurement systems. For related calculations, explore our {createInternalLink('density-mass-volume-calculator')} for material properties or our {createInternalLink('volume-to-mass-calculator')} for engineering calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

