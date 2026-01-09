import { Metadata } from 'next';
import CalculatorPageTemplate from '@/app/_components/layouts/CalculatorPageTemplate';
import StressCalculator from '@/app/_components/calculators/StressCalculator';
import { SEOSection, SEOFAQ } from '@/app/_components/ui/SEOContent';

export const metadata: Metadata = {
  title: 'Stress Calculator | Calculate Tensile, Compressive & Shear Stress',
  description:
    'Free online Stress Calculator. Calculate stress (σ = F/A), force, or cross-sectional area for tensile, compressive, and shear stress. Perfect for engineering, materials science, and structural analysis.',
  keywords: [
    'stress calculator',
    'calculate stress',
    'tensile stress calculator',
    'compressive stress calculator',
    'shear stress calculator',
    'stress formula calculator',
    'force area calculator',
    'stress from force',
    'pressure calculator',
    'material stress calculator',
    'engineering stress calculator',
    'structural stress calculator',
    'stress analysis calculator',
    'stress conversion calculator',
    'pascal converter',
    'psi to mpa converter',
    'stress strength calculator',
    'yield strength calculator',
    'stress strain calculator',
    'mechanical stress calculator',
    'stress mechanics calculator',
    'stress failure calculator',
    'bearing stress calculator',
    'bending stress calculator',
  ],
  openGraph: {
    title: 'Stress Calculator',
    description: 'Calculate stress, force, area, and convert pressure units for engineering design.',
    type: 'website',
  },
};

export default function StressPage() {
  return (
    <CalculatorPageTemplate
      title="Stress Calculator: Calculate Tensile, Compressive & Shear Stress"
      description="Calculate stress (σ = F/A) from force and area, determine force from stress and area, calculate required cross-sectional area, and convert between pressure units (Pa, kPa, MPa, GPa, psi, atm). Support for tensile, compressive, and shear stress analysis."
      calculator={<StressCalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/stress-calculator"
      category="Mechanics"
      features={[
        'Calculate stress from force and cross-sectional area (σ = F/A)',
        'Determine applied force from stress and area (F = σ × A)',
        'Find required area for safe stress limits (A = F/σ)',
        'Analyze tensile stress (pulling/stretching)',
        'Analyze compressive stress (pushing/squeezing)',
        'Analyze shear stress (sliding/twisting)',
        'Support for multiple force units (N, kN, MN, lbf)',
        'Support for multiple area units (m², cm², mm², in², ft²)',
        'Support for multiple stress units (Pa, kPa, MPa, GPa, psi, atm)',
        'Convert between pressure and stress units',
        'Step-by-step calculations with intermediate values',
        'Perfect for structural engineering and materials science',
      ]}
    >
      <SEOSection title="Understanding Stress">
        <p>
          Stress is one of the most fundamental concepts in engineering and materials science. It represents the internal force 
          per unit area that a material experiences when subjected to external loads. Stress is critical for determining whether 
          materials will safely withstand applied loads or fail catastrophically.
        </p>
        <p>
          The stress calculator uses the fundamental equation σ = F/A, where σ (sigma) is stress, F is the applied force, and 
          A is the cross-sectional area. This simple relationship determines how much force is distributed across a material, 
          with higher stress indicating greater risk of failure.
        </p>
        <p>
          Understanding stress is essential for:
        </p>
        <ul>
          <li>Structural engineering and design of buildings, bridges, and infrastructure</li>
          <li>Materials science and determining material properties and limits</li>
          <li>Mechanical engineering for component design and failure analysis</li>
          <li>Civil engineering for soil mechanics and foundation design</li>
          <li>Quality control and verification of design safety factors</li>
          <li>Predicting material behavior under various loading conditions</li>
        </ul>
      </SEOSection>

      <SEOSection title="Types of Stress">
        <p>
          Different loading conditions create different types of stress, each affecting materials in unique ways. Understanding 
          these stress types is crucial for proper engineering design.
        </p>
        <p><strong>Tensile Stress</strong></p>
        <p>
          Tensile stress occurs when forces pull on the material, attempting to stretch or elongate it. Examples include cables 
          under tension, bridge suspension ropes, or materials being pulled apart. Tensile stress is positive and materials 
          typically fail by breaking when tensile stress exceeds the ultimate tensile strength. Different materials have very 
          different tensile strength limits.
        </p>
        <p><strong>Compressive Stress</strong></p>
        <p>
          Compressive stress develops when forces push on the material, attempting to compress, shorten, or squeeze it. Examples 
          include the weight on foundation columns, concrete under compression, or compressed springs. Compressive stress can 
          cause material failure through crushing, buckling (in slender elements), or permanent deformation. Many materials 
          withstand compression better than tension.
        </p>
        <p><strong>Shear Stress</strong></p>
        <p>
          Shear stress occurs when parallel forces act in opposite directions across a material, attempting to slide one part 
          past another. Examples include bolts connecting plates, beams at support reactions, or cutting materials with scissors. 
          Shear stress causes materials to fail through sliding or separation along the shear plane. Welds, rivets, and adhesive 
          bonds are particularly vulnerable to shear failure.
        </p>
      </SEOSection>

      <SEOSection title="Stress Formula and Calculation">
        <p><strong>Basic Stress Formula</strong></p>
        <p><strong>σ = F / A</strong></p>
        <p>Where:</p>
        <ul>
          <li>σ (sigma) = Stress (in Pascals or other pressure units)</li>
          <li>F = Applied force (in Newtons or other force units)</li>
          <li>A = Cross-sectional area perpendicular to the force (in m² or other area units)</li>
        </ul>
        <p>
          The cross-sectional area is critical—a larger area distributes the force over more material, resulting in lower stress 
          and safer conditions. This is why thick cables can handle more weight than thin ones.
        </p>
        <p><strong>Rearranged Formulas</strong></p>
        <p><strong>Force Formula: F = σ × A</strong></p>
        <p>
          Determines the force applied to a material experiencing a known stress. Useful for calculating load capacity from 
          known material properties.
        </p>
        <p><strong>Area Formula: A = F / σ</strong></p>
        <p>
          Determines the required cross-sectional area to limit stress to safe levels. Essential for design of structural 
          elements and component sizing.
        </p>
        <p><strong>Strain and Stress Relationship</strong></p>
        <p>
          Stress causes strain (deformation) in materials. For elastic materials within the elastic limit, stress and strain 
          are related by the Young's modulus (E) through: Strain = Stress / Young's Modulus.
        </p>
      </SEOSection>

      <SEOSection title="Stress Units and Conversions">
        <p>
          Stress is pressure expressed in force per unit area. Different industries and countries use different units, making 
          conversion essential for global engineering practice.
        </p>
        <p><strong>SI Units (Metric)</strong></p>
        <ul>
          <li><strong>Pascal (Pa):</strong> 1 Pa = 1 N/m² (smallest standard unit)</li>
          <li><strong>Kilopascal (kPa):</strong> 1 kPa = 1,000 Pa (common in pressure applications)</li>
          <li><strong>Megapascal (MPa):</strong> 1 MPa = 1,000,000 Pa (common in materials strength data)</li>
          <li><strong>Gigapascal (GPa):</strong> 1 GPa = 1,000,000,000 Pa (used for very high stresses, elastic modulus)</li>
        </ul>
        <p><strong>Imperial Units</strong></p>
        <ul>
          <li><strong>PSI (psi):</strong> Pounds per square inch, very common in US engineering</li>
          <li><strong>1 psi = 6,894.76 Pa ≈ 0.007 MPa</strong></li>
          <li><strong>1 MPa ≈ 145 psi</strong></li>
        </ul>
        <p><strong>Other Units</strong></p>
        <ul>
          <li><strong>Atmosphere (atm):</strong> 1 atm = 101,325 Pa (used in gas pressure)</li>
          <li><strong>Bar:</strong> 1 bar = 100,000 Pa (used in industrial pressure systems)</li>
        </ul>
        <p>
          Use the stress conversion calculator to quickly convert between units. Understanding unit conversions is critical for 
          reading material datasheets and ensuring calculations are dimensionally consistent.
        </p>
      </SEOSection>

      <SEOSection title="Material Stress Limits and Failure Criteria">
        <p>
          Every material has stress limits beyond which permanent damage or failure occurs. Understanding these limits is 
          essential for safe design.
        </p>
        <p><strong>Yield Strength</strong></p>
        <p>
          The stress at which a material begins permanent (plastic) deformation. Below yield strength, the material returns to 
          its original shape when unloaded (elastic behavior). Above yield strength, the material deforms permanently (plastic 
          behavior). Yield strength is often the design limit for structural materials.
        </p>
        <p><strong>Ultimate Tensile Strength</strong></p>
        <p>
          The maximum stress a material can withstand before breaking. The material fails catastrophically at this stress. 
          Ultimate strength is always higher than yield strength but is rarely used as the design limit.
        </p>
        <p><strong>Elastic Limit</strong></p>
        <p>
          The highest stress at which the material behaves elastically (returns to original shape). Very close to, or equal to, 
          yield strength for most engineering materials.
        </p>
        <p><strong>Safety Factor</strong></p>
        <p>
          To ensure safe design, engineers apply a safety factor: Allowable Stress = Ultimate Strength / Safety Factor. Common 
          safety factors range from 1.5 (for well-controlled conditions) to 5 or higher (for uncertain loads or high risk). The 
          applied stress should never exceed the allowable stress.
        </p>
        <p><strong>Material Selection Based on Strength</strong></p>
        <ul>
          <li>Steel: Excellent tensile strength (250-500 MPa typical), good for structures</li>
          <li>Aluminum: Moderate strength (70-500 MPa depending on alloy), lighter weight</li>
          <li>Concrete: High compressive strength (30-60 MPa typical), low tensile strength</li>
          <li>Titanium: Very high strength-to-weight ratio, expensive but used in aerospace</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Stress Calculations in Engineering">
        <p><strong>Cable or Wire Design</strong></p>
        <p>
          When designing a cable to support a load, engineers calculate the required cross-sectional area to keep stress below 
          the material's safe limit. For example, a steel cable with yield strength of 300 MPa and a 3x safety factor allows 
          stress up to 100 MPa. Using A = F/σ, a 10,000 N load requires: A = 10,000 N / 100,000,000 Pa = 0.0001 m² = 100 mm².
        </p>
        <p><strong>Bolt and Fastener Selection</strong></p>
        <p>
          Bolts are subjected to tensile stress when fastening plates together. The bolt must have sufficient diameter to keep 
          stress below the material limit. Grade 8.8 bolts (yield 640 MPa) can handle much higher loads than Grade 4.6 bolts 
          (yield 280 MPa).
        </p>
        <p><strong>Beam and Column Design</strong></p>
        <p>
          Structural elements like beams and columns experience internal stresses from the loads they support. Engineers calculate 
          bending stress and compression stress to ensure the element won't fail. Larger cross-sections reduce stress but increase 
          material cost and weight.
        </p>
        <p><strong>Pressure Vessel Design</strong></p>
        <p>
          Pressure vessels (tanks, pipes, boilers) experience hoop stress (circumferential) and longitudinal stress from internal 
          pressure. The vessel wall thickness must be sufficient to keep these stresses below safe limits using the appropriate 
          design equations.
        </p>
      </SEOSection>

      <SEOSection title="Stress Analysis and Optimization">
        <p>
          Modern engineering uses advanced stress analysis to optimize designs for minimum weight, maximum efficiency, and 
          adequate safety.
        </p>
        <p><strong>Uniform vs. Non-uniform Stress Distribution</strong></p>
        <p>
          Ideally, all stress in a structure is uniform to use material efficiently. However, geometry changes, holes, and load 
          application points create stress concentrations where stress is much higher. Stress concentration factors (Kt) indicate 
          how much higher stresses become at critical points.
        </p>
        <p><strong>Fatigue and Cyclic Stress</strong></p>
        <p>
          Materials experience different limits under cyclic loading (repeated loading and unloading) compared to static loading. 
          The endurance limit defines the stress level below which the material won't fail even after millions of cycles. This is 
          critical for machinery, engines, and structures subject to vibration.
        </p>
        <p><strong>Temperature Effects</strong></p>
        <p>
          Material strength changes with temperature. High temperatures typically reduce strength (materials lose strength as atoms 
          vibrate more), while very low temperatures can make some materials brittle. Design allowable stresses must account for 
          operating temperature.
        </p>
        <p><strong>Three-Dimensional Stress States</strong></p>
        <p>
          Real structures experience stress in multiple directions simultaneously (triaxial stress). Failure criteria like von Mises 
          stress combine these stresses into an equivalent stress for comparison with material limits.
        </p>
      </SEOSection>

      <SEOSection title="Stress Calculator Features and Applications">
        <p>
          This stress calculator provides four essential calculation modes for complete stress analysis:
        </p>
        <p><strong>1. Stress Calculation Mode (σ = F / A)</strong></p>
        <p>
          Enter the applied force and cross-sectional area to calculate the resulting stress. The calculator supports three stress 
          types (tensile, compressive, shear) and provides results in multiple units (Pa, kPa, MPa, GPa, psi, atm) for comparison 
          with material properties.
        </p>
        <p><strong>2. Force Calculation Mode (F = σ × A)</strong></p>
        <p>
          Determines how much force is required to produce a specific stress, or what force a given area can safely support. Useful 
          for load capacity calculations and design verification.
        </p>
        <p><strong>3. Area Calculation Mode (A = F / σ)</strong></p>
        <p>
          Calculates the minimum cross-sectional area needed to keep stress below a specified limit. Essential for component sizing 
          and structural design. The calculator suggests areas in multiple units.
        </p>
        <p><strong>4. Unit Conversion Mode</strong></p>
        <p>
          Instantly converts stress and pressure values between commonly used units (Pa, kPa, MPa, GPa, psi, atm). Supports reading 
          specifications from different sources and ensuring dimensional consistency.
        </p>
        <p>
          All calculations include step-by-step breakdowns so you understand exactly how results are obtained. Perfect for students 
          learning stress analysis, engineers designing structures, and professionals checking calculations.
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is stress and how is it calculated?',
            answer:
              'Stress is internal force per unit area in a material. It is calculated using σ = F/A, where F is the applied force and A is the cross-sectional area perpendicular to the force. Stress tells you how intensely a force is distributed across a material—higher stress indicates greater risk of failure.',
          },
          {
            question: 'What are the three main types of stress?',
            answer:
              'Tensile stress occurs when forces pull the material (stretching). Compressive stress develops when forces push (squeezing). Shear stress results from parallel forces acting in opposite directions (sliding). Each type affects materials differently and requires separate analysis.',
          },
          {
            question: 'What is the difference between stress and strain?',
            answer:
              'Stress is the applied force per unit area (the cause). Strain is the resulting deformation or change in dimension (the effect). For elastic materials, stress and strain are related by Young\'s modulus: Strain = Stress / Young\'s Modulus. Stress remains constant as long as force doesn\'t change, but strain depends on material properties.',
          },
          {
            question: 'What is yield strength and why is it important?',
            answer:
              'Yield strength is the stress level at which a material begins permanent deformation. Below yield strength, the material returns to its original shape when unloaded (elastic). Above yield strength, deformation is permanent (plastic). For most applications, yield strength is the design limit to prevent permanent damage.',
          },
          {
            question: 'How do I convert between different stress units?',
            answer:
              'Use the conversion calculator mode with common conversions: 1 Pa = 0.000001 MPa, 1 psi ≈ 0.007 MPa, 1 MPa ≈ 145 psi, 1 atm = 0.101 MPa. These conversions ensure design specifications from different sources use consistent units.',
          },
          {
            question: 'How do I calculate the minimum area needed to safely support a load?',
            answer:
              'Use the Area calculation mode with formula A = F/σ. Apply the maximum allowable stress (typically yield strength divided by a safety factor). For example, if a steel cable has yield strength of 300 MPa and safety factor of 3, maximum allowable stress is 100 MPa. To support 10,000 N: A = 10,000 N / 100,000,000 Pa = 0.0001 m² = 100 mm².',
          },
          {
            question: 'Why do thicker materials experience less stress?',
            answer:
              'Since stress = Force / Area, the same force distributed over a larger area results in lower stress. This is why thicker cables, larger diameter bolts, and larger structural sections can safely support heavier loads—the force is spread over more material.',
          },
          {
            question: 'What is a safety factor and how does it relate to stress?',
            answer:
              'A safety factor is a multiplier that reduces the allowable stress below the material\'s ultimate strength. Allowable stress = Ultimate strength / Safety factor. For example, a safety factor of 3 means the applied stress must be 1/3 of the ultimate strength, providing a safety margin. Higher safety factors are used for uncertain loads or critical applications.',
          },
        ]}
      />
    </CalculatorPageTemplate>
  );
}
