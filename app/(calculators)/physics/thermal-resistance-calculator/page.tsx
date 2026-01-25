import ThermalResistanceCalculator from '../../../_components/calculators/ThermalResistanceCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ, SEOFormula } from '../../../_components/ui/SEOContent';

export default function ThermalResistanceCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Thermal Resistance Calculator - Conduction, Convection, Radiation"
      description="Calculate thermal resistance for heat transfer modes and multilayer systems."
      calculator={<ThermalResistanceCalculator />}
      slug="physics/thermal-resistance-calculator"
      category="Thermodynamics"
      features={[
        'Calculates thermal resistance for conduction, convection, radiation modes',
        'Series and parallel thermal resistance networks',
        'Heat flow rate and temperature difference calculations',
        'Material presets (brick, aluminum, glass, foam)',
        'Supports multiple units (mm, cm, m) for dimensions',
        'Heat flux and effective convection coefficient outputs',
        'Primary color #820ECC'
      ]}
    >
      <SEOSection title="What is Thermal Resistance?">
        <p>
          Thermal resistance is a measure of the opposition to heat flow through a material or interface, analogous to electrical resistance in circuits. Represented by R (units: K/W or °C/W), thermal resistance quantifies how effectively a material, surface, or gap resists temperature change during heat transfer. Higher thermal resistance means slower heat conduction, making the material a better insulator.
        </p>
        <p className="mt-4">
          The Thermal Resistance Calculator is essential for HVAC engineers, building physicists, electronics cooling designers, and materials scientists. Whether calculating insulation requirements for buildings, designing heat dissipation for electronics, or analyzing multi-layer thermal systems (walls, pipes, composite structures), this tool provides accurate thermal resistance values using conduction, convection, and radiation principles. Understanding thermal networks helps optimize energy efficiency, prevent thermal stress, and ensure proper temperature management in diverse applications.
        </p>
      </SEOSection>

      <SEOSection title="Thermal Resistance Formulas">
        <SEOFormula
          formula="R_conduction = L / (k × A)"
          description="Thermal resistance for conduction through a material: length divided by thermal conductivity times area."
        />
        <SEOFormula
          formula="R_convection = 1 / (h × A)"
          description="Thermal resistance for convection: inverse of convection coefficient times area."
        />
        <SEOFormula
          formula="R_radiation ≈ 1 / (h_rad × A)"
          description="Linearized radiation resistance using effective radiation coefficient h_rad."
        />
        <SEOFormula
          formula="R_series = R₁ + R₂ + R₃ + ..."
          description="Series thermal resistances add directly (like electrical resistors in series)."
        />
        <SEOFormula
          formula="1/R_parallel = 1/R₁ + 1/R₂ + 1/R₃ + ..."
          description="Parallel thermal resistances combine inversely (like parallel electrical resistors)."
        />
        <SEOFormula
          formula="Q = ΔT / R"
          description="Heat flow rate equals temperature difference divided by total thermal resistance."
        />
      </SEOSection>

      <SEOSection title="How to Use the Thermal Resistance Calculator">
        <SEOList
          ordered
          items={[
            '<strong>Select heat transfer mode:</strong> Conduction (solids), Convection (fluids), Radiation (surfaces), or Series/Parallel networks.',
            '<strong>For conduction:</strong> Enter thermal conductivity (W/m·K), thickness/length, and cross-sectional area.',
            '<strong>For convection:</strong> Enter convection coefficient h (W/m²·K) and surface area.',
            '<strong>For radiation:</strong> Enter emissivity, area, surface and surrounding temperatures.',
            '<strong>For networks:</strong> Enter individual thermal resistances; series adds them, parallel combines inversely.',
            '<strong>Optional:</strong> Enter temperature difference (hot side vs. cold side) to calculate heat flow rate Q.',
            '<strong>Click Calculate</strong> to get thermal resistance, heat flow, heat flux, and related parameters.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Conduction Thermal Resistance">
        <p className="mb-4">
          Heat conduction through solid materials is governed by:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Thermal conductivity k:</strong> Material property (W/m·K); high k = good conductor (metals), low k = good insulator (foam, fiberglass).</li>
          <li><strong>Thickness L:</strong> Longer paths increase resistance; doubling thickness doubles R.</li>
          <li><strong>Area A:</strong> Larger cross-section decreases resistance; doubling area halves R.</li>
          <li><strong>Temperature-dependent:</strong> k varies with temperature; use mean temperature value for wide ranges.</li>
          <li><strong>Steady-state assumption:</strong> Formula assumes constant temperature across thickness, no internal heat generation.</li>
          <li><strong>Multilayer walls:</strong> Add individual layer resistances in series for composite structures (insulation + drywall + brick).</li>
          <li><strong>Thermal bridging:</strong> Studs, fasteners bypass insulation; effective k increases; account with correction factors.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Convection Thermal Resistance">
        <p className="mb-4">
          Heat transfer from surfaces to fluids (air, water) via convection:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Convection coefficient h:</strong> Depends on fluid properties (density, viscosity, thermal conductivity), flow velocity, and geometry.</li>
          <li><strong>Natural convection:</strong> h ≈ 5-25 W/m²·K (driven by buoyancy, slow).</li>
          <li><strong>Forced convection:</strong> h ≈ 10-100+ W/m²·K (fan/wind-assisted, faster).</li>
          <li><strong>Boiling/condensation:</strong> h ≈ 100-10,000 W/m²·K (phase change, very efficient).</li>
          <li><strong>Nusselt correlations:</strong> Nu = hL/k; use empirical formulas to estimate h for specific conditions.</li>
          <li><strong>Surface roughness:</strong> Affects h; rougher surfaces increase turbulence and convection.</li>
          <li><strong>Film temperature:</strong> Use average of wall and fluid temperature to evaluate fluid properties.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Radiation Thermal Resistance">
        <p className="mb-4">
          Heat transfer from surfaces via electromagnetic radiation:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Emissivity ε:</strong> Material property (0-1); ε = 1 is perfect blackbody, ε = 0 is perfect reflector.</li>
          <li><strong>Stefan-Boltzmann constant:</strong> σ = 5.67 × 10⁻⁸ W/(m²·K⁴).</li>
          <li><strong>Absolute temperature:</strong> Use Kelvin (K); radiation depends on T⁴ (very temperature-sensitive).</li>
          <li><strong>Linearization:</strong> For small ΔT, radiation can be linearized: h_rad = ε·σ·(T_s² + T_a²)(T_s + T_a).</li>
          <li><strong>View factors:</strong> Account for geometry (not included in simple calculator); enclosure radiation more complex.</li>
          <li><strong>Dominant at high T:</strong> Radiation becomes significant above ~300°C; critical in furnaces, solar collectors, space.</li>
          <li><strong>Reflective coatings:</strong> Low emissivity surfaces reduce radiation; used in thermal insulation, radiant barriers.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Series vs Parallel Thermal Networks">
        <p className="mb-4">
          Combining thermal resistances:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Series (layers):</strong> Heat flows sequentially through multiple resistances (e.g., insulation → drywall → brick). R_total = R₁ + R₂ + R₃. Temperature drops across each layer proportional to its resistance.</li>
          <li><strong>Parallel (pathways):</strong> Heat flows through multiple paths simultaneously (e.g., insulation around studs). 1/R_total = 1/R₁ + 1/R₂ + 1/R₃. Effective R lower than smallest individual R.</li>
          <li><strong>Mixed networks:</strong> Real buildings have both series and parallel paths; requires circuit-like thermal analysis.</li>
          <li><strong>Contact resistance:</strong> Air gaps and interfaces between layers add unexpected resistance; ensure good contact (epoxy, paste).</li>
          <li><strong>Steady-state analysis:</strong> Assumes constant boundary temperatures; transient analysis requires differential equations.</li>
          <li><strong>Thermal circuit analogy:</strong> Temperature = voltage, heat flow = current, thermal resistance = electrical resistance.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Thermal Resistance Applications">
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Building insulation:</strong> R-value ratings (R-30 insulation means 30 K·m²/W); total building envelope R determines heating/cooling loads.</li>
          <li><strong>Electronics cooling:</strong> Heat sink thermal resistance (junction-to-case, case-to-ambient) determines maximum allowable power dissipation.</li>
          <li><strong>HVAC design:</strong> Ductwork insulation, pipe insulation to minimize losses; thermal loss calculations for sizing equipment.</li>
          <li><strong>Refrigeration:</strong> Insulation R-values for cold storage, freezer design; critical for food safety and energy efficiency.</li>
          <li><strong>Thermal analysis:</strong> Predicting steady-state temperatures in finned heat sinks, heat pipes, composite materials.</li>
          <li><strong>Energy audits:</strong> Identifying thermal weak points (windows, air leaks, poor insulation) in buildings; calculating savings from upgrades.</li>
          <li><strong>Material selection:</strong> Comparing insulation options (fiberglass, foam, mineral wool) by R-value per thickness.</li>
          <li><strong>Thermal protection:</strong> Designing covers, blankets, or coatings to maintain temperature in harsh environments.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Thermal Conductivity Values (Reference)">
        <p className="mb-4">
          Typical thermal conductivity k (W/m·K) for common materials:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li><strong>Metals (excellent conductors):</strong> Copper 386, Aluminum 237, Steel 50, Stainless 16</li>
          <li><strong>Masonry:</strong> Brick 0.7, Concrete 1.4, Stone 2.5</li>
          <li><strong>Glass:</strong> 0.8 (standard), 1.0 (tempered)</li>
          <li><strong>Building insulation:</strong> Fiberglass 0.04, Foam 0.023-0.04, Mineral wool 0.035-0.045</li>
          <li><strong>Gases:</strong> Air 0.026 (at 20°C), Argon 0.016 (used in insulated glazing)</li>
          <li><strong>Other:</strong> Wood 0.1-0.2, Water 0.6, Ice 2.2</li>
          <li><strong>Note:</strong> Values vary with temperature, moisture, density; always check material specifications.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Example: Composite Wall">
        <p className="mb-4"><strong>Scenario:</strong> Exterior wall with interior temperature 20°C, exterior 0°C. Layers: drywall (12 mm, k=0.2) + fiberglass insulation (100 mm, k=0.04) + brick (100 mm, k=0.7) + exterior film (h=20).</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Drywall: R₁ = 0.012 / (0.2 × 1) = 0.06 K/W per m²</li>
          <li>Insulation: R₂ = 0.1 / (0.04 × 1) = 2.5 K/W per m²</li>
          <li>Brick: R₃ = 0.1 / (0.7 × 1) = 0.143 K/W per m²</li>
          <li>Exterior convection: R₄ = 1 / (20 × 1) = 0.05 K/W per m²</li>
          <li>Series sum: R_total = 0.06 + 2.5 + 0.143 + 0.05 = 2.753 K/W per m²</li>
          <li>Heat flow: Q = 20°C / 2.753 = 7.27 W/m²</li>
          <li>Temperature drop across insulation: ΔT = 7.27 × 2.5 = 18.2°C (most drop occurs here)</li>
          <li><strong>Conclusion:</strong> Insulation dominates total resistance; minimal heat loss for cold climates.</li>
        </ol>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is R-value and how does it relate to thermal resistance?',
            answer: 'R-value is thermal resistance per unit area (K·m²/W or ft²·°F·h/BTU). For a 1 m² area, R-value equals thermal resistance in K/W. Example: R-30 insulation means 30 ft²·°F·h/BTU ≈ 5.3 K·m²/W. When sizing insulation, multiply R-value by area to get total thermal resistance for your application.'
          },
          {
            question: 'Why should I use series resistances for multilayer systems?',
            answer: 'In series, heat flows sequentially through each layer at the same rate (steady-state). Using R_total = R₁ + R₂ + R₃ lets you: (1) calculate overall insulation effectiveness, (2) find temperature at each interface, (3) identify which layers dominate heat loss, (4) optimize thickness ratios for cost-benefit. Ignoring layers leads to vastly underestimating total resistance.'
          },
          {
            question: 'How do I account for thermal bridges like wall studs?',
            answer: 'Studs bypass insulation, creating parallel paths of high conductivity. Calculate: (1) insulation resistance R_ins, (2) stud resistance R_stud, (3) combine with parallel formula: 1/R_eff = f_ins/R_ins + f_stud/R_stud, where f = fractional area. Typical result: 15-25% higher heat loss than insulation value alone. Software or correction factors (ASHRAE) estimate effective R-values for real assemblies.'
          },
          {
            question: 'At what temperature does radiation become dominant in heat transfer?',
            answer: 'Below ~200°C, radiation is often negligible compared to conduction and convection. Between 200-500°C, radiation becomes significant (10-30% of total). Above 500°C, radiation dominates (often >50%). In furnaces, ovens, and high-temperature equipment, always include radiation analysis. For room-temperature applications (HVAC, electronics), radiation usually <5%.'
          },
          {
            question: 'How do I choose between convection coefficient correlations?',
            answer: 'Nusselt number correlations depend on: (1) flow regime (laminar, turbulent, transitional), (2) geometry (plate, cylinder, sphere), (3) Rayleigh number (for natural convection). Use Churchill-Bernstein for cylinders, Dittus-Boelert for turbulent pipes, or consult heat transfer textbooks/software. When in doubt, use conservative estimates: natural ~10 W/m²·K, forced ~50-100, boiling ~5000+. Validate experimentally for accuracy.'
          }
        ]}
      />
    </CalculatorPageTemplate>
  );
}
