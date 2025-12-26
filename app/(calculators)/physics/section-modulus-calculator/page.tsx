import SectionModulusCalculator from '../../../_components/calculators/SectionModulusCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function SectionModulusCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Section Modulus Calculator: Calculate Z for Rectangular & Circular Cross-Sections"
      description="Calculate section modulus (Z) or dimensions for rectangular and circular cross-sections. Free online physics calculator for structural engineering, beam design, and stress analysis with comprehensive unit support."
      calculator={<SectionModulusCalculator />}
      slug="physics/section-modulus-calculator"
      category="Mechanics"
      features={[
        "Calculate section modulus for rectangular and circular cross-sections",
        "Calculate dimensions from section modulus",
        "Support for multiple length units (m, cm, mm, ft, in)",
        "Support for multiple volume units (m³, cm³, mm³, ft³, in³)",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Section Modulus: Essential for Beam Design and Stress Analysis">
        <p>
          Section modulus (Z) is a fundamental geometric property used in structural engineering and beam design to calculate the maximum stress in a beam under bending. It represents the resistance of a cross-section to bending and is defined as the ratio of the moment of inertia (I) to the distance from the neutral axis to the outermost fiber (c): <strong>Z = I / c</strong>. Our Section Modulus Calculator simplifies these calculations, allowing you to determine section modulus or calculate dimensions for rectangular and circular cross-sections using the formulas: <strong>Z = (b × h²) / 6</strong> for rectangles and <strong>Z = (π × d³) / 32</strong> for circles.
        </p>
        <p>
          Whether you&apos;re designing beams, analyzing structural members, calculating bending stress, or sizing structural elements, understanding section modulus is crucial for ensuring structural integrity and safety. Our calculator helps you determine section modulus from dimensions or find required dimensions from a given section modulus, making complex structural engineering calculations simple and accessible.
        </p>
      </SEOSection>

      <SEOSection title="How to Use Our Section Modulus Calculator">
        <p>
          Our Section Modulus Calculator offers multiple calculation modes for different cross-section shapes:
        </p>
        <SEOList ordered items={[
          '<strong>For Rectangular Cross-Sections:</strong> Select rectangle shape, then choose to calculate section modulus (Z) from width and height, or calculate width/height from section modulus and the other dimension.',
          '<strong>For Circular Cross-Sections:</strong> Select circle shape, then choose to calculate section modulus (Z) from diameter, or calculate diameter from section modulus.',
          '<strong>Enter Values:</strong> Input the known dimensions or section modulus values with your preferred units.',
          '<strong>Calculate:</strong> Click Calculate to get instant results with detailed step-by-step solutions showing the formulas and calculations.'
        ]} />
        <p>
          Select your cross-section shape, choose what you want to calculate, enter the known values with appropriate units, and click Calculate to get instant results with detailed step-by-step solutions. The calculator supports multiple units for length (meters, centimeters, millimeters, feet, inches) and volume (cubic meters, cubic centimeters, cubic millimeters, cubic feet, cubic inches).
        </p>
      </SEOSection>

      <SEOSection title="Section Modulus Formulas Explained">
        <p>
          Section modulus depends on the cross-sectional shape and dimensions. Here are the formulas for common shapes:
        </p>

        <h3>Rectangular Cross-Section:</h3>
        <SEOFormula
          formula="Z = (b × h²) / 6"
          description="Where: Z = Section Modulus, b = Width, h = Height (dimension perpendicular to bending axis)"
        />

        <h3>Circular Cross-Section:</h3>
        <SEOFormula
          formula="Z = (π × d³) / 32"
          description="Where: Z = Section Modulus, d = Diameter, π = Pi (approximately 3.14159)"
        />

        <h3>Understanding the Components:</h3>
        <SEOList items={[
          '<strong>Section Modulus (Z):</strong> A geometric property that determines the maximum stress in a beam. Higher section modulus means greater resistance to bending. Measured in cubic meters (m³), cubic centimeters (cm³), or cubic inches (in³).',
          '<strong>Width (b):</strong> For rectangular cross-sections, the dimension parallel to the neutral axis. Measured in meters, centimeters, millimeters, feet, or inches.',
          '<strong>Height (h):</strong> For rectangular cross-sections, the dimension perpendicular to the neutral axis (the dimension that resists bending). This is the critical dimension - increasing height significantly increases section modulus (note the h² term).',
          '<strong>Diameter (d):</strong> For circular cross-sections, the diameter of the circle. Measured in meters, centimeters, millimeters, feet, or inches.',
          '<strong>Relationship to Stress:</strong> Maximum bending stress (σ) = M / Z, where M is the bending moment. Section modulus directly relates to the stress capacity of a structural member.'
        ]} />

        <h3>Rearranging the Formulas:</h3>
        <p>You can rearrange the formulas to solve for dimensions:</p>
        <SEOList items={[
          '<strong>Rectangular Width:</strong> b = 6Z / h²',
          '<strong>Rectangular Height:</strong> h = √(6Z / b)',
          '<strong>Circular Diameter:</strong> d = ∛(32Z / π)'
        ]} />
      </SEOSection>

      <SEOSection title="Importance of Section Modulus in Structural Engineering">
        <p>
          Section modulus is a critical parameter in structural engineering and beam design:
        </p>
        <SEOList items={[
          '<strong>Bending Stress Calculation:</strong> Maximum bending stress (σ_max) = M / Z, where M is the bending moment. Higher section modulus reduces maximum stress for the same bending moment.',
          '<strong>Beam Sizing:</strong> Engineers use section modulus to determine the required size of beams to resist bending loads without exceeding allowable stress limits.',
          '<strong>Structural Safety:</strong> Ensures structural members can safely carry applied loads without failure due to excessive bending stress.',
          '<strong>Design Optimization:</strong> Allows engineers to optimize beam dimensions to achieve the required section modulus while minimizing material usage.',
          '<strong>Code Compliance:</strong> Building codes specify minimum section modulus requirements for various structural members based on loading conditions.',
          '<strong>Cost Efficiency:</strong> By calculating the exact section modulus needed, engineers can select the most cost-effective beam sizes without over-designing.'
        ]} />
      </SEOSection>

      <SEOSection title="Real-World Applications of Section Modulus">
        <p>
          Section modulus calculations are essential in numerous structural engineering applications:
        </p>
        <SEOList items={[
          '<strong>Beam Design:</strong> Sizing structural beams (I-beams, rectangular beams, circular columns) to resist bending moments from applied loads.',
          '<strong>Bridge Engineering:</strong> Designing bridge girders and structural members to handle traffic loads and bending stresses.',
          '<strong>Building Construction:</strong> Determining the size of floor joists, roof beams, and structural framing members in buildings.',
          '<strong>Industrial Structures:</strong> Designing crane rails, platform beams, and supporting structures in industrial facilities.',
          '<strong>Steel Structure Design:</strong> Selecting appropriate steel beam sections (W-shapes, S-shapes, C-channels) based on required section modulus.',
          '<strong>Concrete Design:</strong> Calculating section modulus for reinforced concrete beams and designing reinforcement to achieve required resistance.',
          '<strong>Timber Construction:</strong> Sizing wood beams and joists for residential and commercial construction projects.',
          '<strong>Machine Design:</strong> Designing machine components, shafts, and structural elements that must resist bending loads.',
          '<strong>Automotive Engineering:</strong> Analyzing and designing vehicle frames and structural members that experience bending loads.',
          '<strong>Infrastructure Projects:</strong> Designing structural elements for roads, railways, and other infrastructure projects.'
        ]} />
      </SEOSection>

      <SEOSection title="Common Section Modulus Values and Examples">
        <p>
          Understanding typical section modulus values helps put calculations in context:
        </p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Cross-Section</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Dimensions</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Section Modulus (Z)</th>
                <th className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">Example Application</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Rectangle</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">100mm × 200mm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">666,667 mm³</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Small beam</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Rectangle</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">150mm × 300mm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">2,250,000 mm³</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Medium beam</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Circle</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">100mm diameter</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">98,175 mm³</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Small column</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Circle</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">200mm diameter</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">785,398 mm³</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Medium column</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Rectangle</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">50mm × 400mm</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">1,333,333 mm³</td>
                <td className="py-2 px-4 border-b text-sm text-gray-800">Deep beam (height optimized)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Note: For rectangular cross-sections, increasing the height (dimension perpendicular to bending) has a much greater effect on section modulus than increasing width, since section modulus is proportional to h². This is why beams are typically oriented with their height dimension vertical when resisting vertical loads.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is section modulus?",
            answer: "Section modulus (Z) is a geometric property of a cross-section that measures its resistance to bending. It is defined as the ratio of the moment of inertia (I) to the distance from the neutral axis to the outermost fiber (c): Z = I / c. Section modulus is used to calculate maximum bending stress: σ_max = M / Z, where M is the bending moment."
          },
          {
            question: "How do you calculate section modulus for a rectangle?",
            answer: "For a rectangular cross-section, the section modulus is calculated as: Z = (b × h²) / 6, where b is the width (dimension parallel to the neutral axis) and h is the height (dimension perpendicular to the neutral axis). The height dimension is squared because it has a much greater effect on bending resistance than the width."
          },
          {
            question: "How do you calculate section modulus for a circle?",
            answer: "For a circular cross-section, the section modulus is calculated as: Z = (π × d³) / 32, where d is the diameter and π is approximately 3.14159. The diameter is cubed, showing that increasing the diameter significantly increases the section modulus."
          },
          {
            question: "What are the units for section modulus?",
            answer: "Section modulus has units of length cubed (volume units). Common units include cubic meters (m³), cubic centimeters (cm³), cubic millimeters (mm³), cubic feet (ft³), and cubic inches (in³). The specific unit depends on the units used for the dimensions in the calculation."
          },
          {
            question: "What is the relationship between section modulus and bending stress?",
            answer: "Maximum bending stress (σ_max) = Bending Moment (M) / Section Modulus (Z). This means that for a given bending moment, a larger section modulus results in lower stress. Engineers use this relationship to ensure that structural members don't exceed allowable stress limits."
          },
          {
            question: "Why is section modulus important in beam design?",
            answer: "Section modulus is crucial in beam design because it directly determines the maximum stress a beam can resist for a given bending moment. Engineers use section modulus to select appropriate beam sizes, ensuring structural safety while optimizing material usage. Building codes specify minimum section modulus requirements for various applications."
          },
          {
            question: "How does the orientation of a rectangular beam affect section modulus?",
            answer: "For a rectangular beam with dimensions b (width) and h (height), the section modulus is Z = (b × h²) / 6. If the beam is oriented with height vertical (resisting vertical loads), the section modulus uses h as the height dimension. If rotated 90 degrees, the section modulus would be (h × b²) / 6. Since h² vs b², the orientation significantly affects the section modulus and bending resistance."
          },
          {
            question: "Can you calculate section modulus for other shapes?",
            answer: "Yes, section modulus can be calculated for various cross-sectional shapes including I-beams, T-sections, C-channels, and composite sections. However, the formulas are more complex as they require calculating the moment of inertia and centroid location. For standard steel shapes, section modulus values are provided in engineering handbooks and manufacturer specifications."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Section modulus is a fundamental concept in structural engineering that enables engineers to design safe and efficient structural members. Our Section Modulus Calculator provides a powerful and accurate tool for determining section modulus or calculating required dimensions for rectangular and circular cross-sections, making complex structural engineering calculations simple and accessible.
        </p>
        <p>
          By simplifying section modulus calculations with comprehensive unit support and detailed step-by-step solutions, this calculator empowers engineers, students, and professionals to design beams, analyze structural members, and ensure structural integrity. For related calculations, explore our {createInternalLink('force-calculator')} for force calculations or our {createInternalLink('wind-load-calculator')} for structural load analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

