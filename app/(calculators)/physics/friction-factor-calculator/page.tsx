import { Metadata } from 'next';
import CalculatorPageTemplate from '@/app/_components/layouts/CalculatorPageTemplate';
import FrictionFactorCalculator from '@/app/_components/calculators/FrictionFactorCalculator';
import { SEOSection, SEOFAQ } from '@/app/_components/ui/SEOContent';
import { createInternalLink } from '@/app/_components/ui/SEOInternalLink';

export const metadata: Metadata = {
  title: 'Friction Factor Calculator | Reynolds Number & Pressure Drop Calculator',
  description:
    'Free online Friction Factor Calculator. Calculate Reynolds number, friction factor (Hagen-Poiseuille, Blasius, Colebrook-White), and pressure drop using Darcy-Weisbach equation for pipe flow analysis.',
  keywords: [
    'friction factor calculator',
    'reynolds number calculator',
    'pressure drop calculator',
    'darcy-weisbach equation',
    'friction factor formula',
    'pipe flow calculator',
    'hagen-poiseuille equation',
    'blasius equation',
    'colebrook-white equation',
    'fluid dynamics calculator',
    'laminar flow calculator',
    'turbulent flow calculator',
    'pipe friction loss',
    'friction loss calculator',
    'flow resistance calculator',
    'darcy friction factor',
    'moody diagram calculator',
    'relative roughness calculator',
    'head loss calculator',
    'pressure drop in pipes',
    'fluid mechanics calculator',
    'hydraulic engineering calculator',
    'pipeline design calculator',
    'flow analysis calculator',
  ],
  openGraph: {
    title: 'Friction Factor Calculator',
    description: 'Calculate friction factor, Reynolds number, and pressure drop for pipe flow analysis using Darcy-Weisbach and Colebrook-White equations.',
    type: 'website',
  },
};

export default function FrictionFactorPage() {
  return (
    <CalculatorPageTemplate
      title="Friction Factor Calculator: Calculate Reynolds Number, Friction Factor & Pressure Drop"
      description="Calculate friction factor, Reynolds number, and pressure drop in pipe flow using Hagen-Poiseuille, Blasius, and Colebrook-White equations. Supports laminar and turbulent flow regimes with comprehensive fluid dynamics analysis. Free online calculator with step-by-step calculations."
      calculator={<FrictionFactorCalculator showTitle={false} primaryColor="#820ECC" />}
      slug="physics/friction-factor-calculator"
      category="Fluid Mechanics"
      features={[
        'Calculate Reynolds number for any fluid flow',
        'Determine friction factor for laminar and turbulent flow',
        'Support for Hagen-Poiseuille, Blasius, and Colebrook-White equations',
        'Automatic flow regime identification (laminar, transition, turbulent)',
        'Calculate pressure drop using Darcy-Weisbach equation',
        'Support for kinematic and dynamic viscosity',
        'Account for pipe roughness in turbulent flow',
        'Step-by-step calculations with intermediate values',
        'Perfect for pipeline design and pump sizing',
      ]}
    >
      <SEOSection title="Understanding Friction Factor and Flow Resistance">
        <p>
          The friction factor (f) is a dimensionless parameter that characterizes the resistance of fluid flow in pipes, ducts, 
          and channels. It is one of the most important parameters in fluid mechanics and hydraulic engineering, directly 
          affecting pump sizing, pipeline design, and energy requirements for fluid transport systems.
        </p>
        <p>
          The friction factor depends on two primary factors: the Reynolds number (which characterizes the flow regime) and the 
          relative roughness of the pipe wall. Different equations apply to different flow regimes, from laminar flow through 
          transitional flow to fully developed turbulent flow.
        </p>
        <p>
          Understanding and calculating the friction factor is essential for:
        </p>
        <ul>
          <li>Selecting appropriate pump sizes and power requirements</li>
          <li>Designing efficient piping systems</li>
          <li>Predicting pressure drop across pipelines</li>
          <li>Analyzing heating and cooling systems</li>
          <li>Optimizing water distribution networks</li>
          <li>Engineering process fluid systems</li>
        </ul>
      </SEOSection>

      <SEOSection title="How to Use the Friction Factor Calculator">
        <p>This comprehensive calculator provides three calculation modes for complete pipe flow analysis:</p>
        <ol>
          <li><strong>Reynolds Number Calculation:</strong> Determine the flow regime by calculating Reynolds number from velocity, diameter, and viscosity. The calculator automatically identifies laminar (Re &lt; 2300), transition (2300-4000), or turbulent (Re &gt; 4000) flow.</li>
          <li><strong>Friction Factor Calculation:</strong> Calculate friction factor based on Reynolds number using appropriate equations. For laminar flow, uses Hagen-Poiseuille (f = 64/Re). For turbulent flow, uses Blasius equation (f = 0.316/Re^0.25) or Colebrook-White for rough pipes.</li>
          <li><strong>Pressure Drop Calculation:</strong> Apply the Darcy-Weisbach equation (ΔP = f × L/D × ρV²/2) to calculate pressure loss in pipes. Results are provided in multiple units: Pa, kPa, and bar.</li>
        </ol>
        <p>
          Enter your known parameters, select the calculation mode, and click Calculate. The calculator provides step-by-step 
          formula breakdown with intermediate calculations for educational understanding.
        </p>
      </SEOSection>

      <SEOSection title="Friction Factor Formulas and Equations">
        <p><strong>Reynolds Number</strong></p>
        <p>
          The Reynolds number characterizes the flow regime and is calculated from velocity, diameter, and viscosity:
        </p>
        <p>
          <strong>Re = (V × D) / ν</strong> (kinematic viscosity) or <strong>Re = (ρ × V × D) / μ</strong> (dynamic viscosity)
        </p>
        <p>Where:</p>
        <ul>
          <li>V = fluid velocity (m/s)</li>
          <li>D = pipe diameter (m)</li>
          <li>ν = kinematic viscosity (m²/s)</li>
          <li>ρ = fluid density (kg/m³)</li>
          <li>μ = dynamic viscosity (Pa·s)</li>
        </ul>
        <p><strong>Flow Regime Classification:</strong></p>
        <ul>
          <li>Laminar flow: Re &lt; 2300</li>
          <li>Transition zone: 2300 ≤ Re ≤ 4000</li>
          <li>Turbulent flow: Re &gt; 4000</li>
        </ul>
        <p><strong>Hagen-Poiseuille Equation (Laminar Flow)</strong></p>
        <p><strong>f = 64 / Re</strong></p>
        <p>Valid for Re &lt; 2300. Highly accurate for laminar flow regardless of pipe roughness.</p>
        <p><strong>Blasius Equation (Turbulent Flow, Smooth Pipes)</strong></p>
        <p><strong>f = 0.316 / Re^0.25</strong></p>
        <p>Valid for 4000 &lt; Re &lt; 100,000 and smooth pipes. Simple and widely used for preliminary calculations.</p>
        <p><strong>Colebrook-White Equation (Turbulent Flow, General)</strong></p>
        <p>
          <strong>1/√f = -2 log₁₀(k_rel/3.7 + 2.51/(Re√f))</strong>
        </p>
        <p>
          Where k_rel is the relative roughness (absolute roughness / diameter). This implicit equation is more accurate 
          for rough pipes and higher Reynolds numbers.
        </p>
        <p><strong>Darcy-Weisbach Equation (Pressure Drop)</strong></p>
        <p><strong>ΔP = f × (L/D) × (ρV²/2)</strong></p>
        <p>Where:</p>
        <ul>
          <li>ΔP = pressure drop (Pa)</li>
          <li>f = friction factor (dimensionless)</li>
          <li>L = pipe length (m)</li>
          <li>D = pipe diameter (m)</li>
          <li>ρ = fluid density (kg/m³)</li>
          <li>V = average fluid velocity (m/s)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Reynolds Number and Flow Regimes">
        <p>
          The Reynolds number is the most important dimensionless parameter in fluid mechanics. It represents the ratio of 
          inertial forces to viscous forces and determines whether flow is laminar or turbulent.
        </p>
        <p><strong>Laminar Flow (Re &lt; 2300)</strong></p>
        <p>
          In laminar flow, fluid particles move in orderly, parallel layers with minimal mixing. The velocity profile is 
          parabolic, with maximum velocity at the center and zero velocity at the pipe wall. Friction factor depends only 
          on Reynolds number, not pipe roughness. Energy losses are due to viscous shear between layers.
        </p>
        <p><strong>Transition Zone (2300 ≤ Re ≤ 4000)</strong></p>
        <p>
          This unstable region shows characteristics of both laminar and turbulent flow. Flow can shift between regimes with 
          small perturbations. Most practical designs avoid this zone.
        </p>
        <p><strong>Turbulent Flow (Re &gt; 4000)</strong></p>
        <p>
          Turbulent flow is chaotic with random velocity fluctuations and significant mixing between layers. The velocity 
          profile is more uniform than laminar flow. Friction factor depends on both Reynolds number and pipe roughness. 
          Energy losses are primarily due to turbulent eddies and mixing.
        </p>
        <p>
          Typical friction factors: laminar flow (0.02-0.08), turbulent smooth pipes (0.008-0.02), turbulent rough pipes 
          (0.02-0.05).
        </p>
      </SEOSection>

      <SEOSection title="Pipe Roughness and Material Properties">
        <p>
          Pipe roughness significantly affects friction factor in turbulent flow. Different pipe materials have different 
          absolute roughness values (typically in the range of 0.000015 to 0.003 meters):
        </p>
        <ul>
          <li><strong>Commercial Steel:</strong> 0.000045 m (45 μm) - most common in industrial applications</li>
          <li><strong>Galvanized Iron:</strong> 0.00015 m (150 μm) - used for water distribution</li>
          <li><strong>Cast Iron:</strong> 0.00025 m (250 μm) - older water pipes, accumulates deposits</li>
          <li><strong>Concrete:</strong> 0.00003 m (30 μm) - large diameter water mains</li>
          <li><strong>Drawn Tubing:</strong> 0.000005 m (5 μm) - smooth, laboratory grade</li>
          <li><strong>PVC/Plastic:</strong> 0.000005 m (5 μm) - modern piping, lowest roughness</li>
        </ul>
        <p>
          The relative roughness (k/D, ratio of absolute roughness to diameter) is crucial. For the same material, larger 
          diameter pipes have lower relative roughness, resulting in lower friction factors. Over time, corrosion and deposits 
          increase effective roughness.
        </p>
      </SEOSection>

      <SEOSection title="Applications of Friction Factor Calculations">
        <p><strong>Pump Sizing and Selection</strong></p>
        <p>
          Calculate pressure drop across piping systems to determine required pump head and power. Underestimating friction 
          leads to inadequate flow; overestimating results in unnecessary energy costs.
        </p>
        <p><strong>Pipeline Design</strong></p>
        <p>
          Optimize pipe diameter selection balancing capital cost (larger pipes are more expensive) against operating cost 
          (smaller pipes require larger pumps). Economic pipe diameter is typically 1-3 m/s velocity.
        </p>
        <p><strong>Water Distribution Systems</strong></p>
        <p>
          Design municipal water networks maintaining adequate pressure at all points while minimizing energy for pumping. 
          Friction losses accumulate in long distribution lines.
        </p>
        <p><strong>Cooling and Heating Systems</strong></p>
        <p>
          Calculate flow rates and pressure drops in HVAC systems. High friction losses reduce system efficiency and require 
          larger pumps.
        </p>
        <p><strong>Industrial Process Piping</strong></p>
        <p>
          Transport of oils, chemicals, slurries, and other fluids requires careful friction factor analysis for accurate 
          system design and performance prediction.
        </p>
        <p><strong>Energy Efficiency</strong></p>
        <p>
          Reducing friction losses through proper pipe sizing and material selection directly reduces operating costs. A 1% 
          increase in friction factor can increase annual energy costs by thousands of dollars in large systems.
        </p>
      </SEOSection>

      <SEOSection title="Factors Affecting Friction Factor">
        <p><strong>Reynolds Number Effect</strong></p>
        <p>
          The strongest influence on friction factor. In laminar flow, f decreases directly with increasing Re. In turbulent 
          flow, f decreases with increasing Re but more gradually.
        </p>
        <p><strong>Pipe Roughness</strong></p>
        <p>
          Negligible in laminar flow, significant in turbulent flow. As Re increases in turbulent flow, viscous effects become 
          less important and roughness dominates. Old, corroded pipes have higher effective roughness.
        </p>
        <p><strong>Pipe Age and Corrosion</strong></p>
        <p>
          New pipes have minimum roughness; pipes corrode and accumulate scale, increasing effective roughness over decades of 
          service. Friction factor can increase by 50-100% over pipe lifetime.
        </p>
        <p><strong>Temperature Effects</strong></p>
        <p>
          Temperature affects fluid viscosity and density, which influence Reynolds number and friction factor. Cool water has 
          different friction characteristics than warm water or steam.
        </p>
        <p><strong>Fluid Properties</strong></p>
        <p>
          Different fluids (water, oil, slurry) have different viscosities and densities, affecting Reynolds number and friction 
          factor calculations. Non-Newtonian fluids require special consideration.
        </p>
        <p><strong>Installation and Alignment</strong></p>
        <p>
          Poorly installed pipes with dents, dings, or misalignment can increase friction losses. Protruding connections and 
          rough internal surfaces increase effective roughness.
        </p>
      </SEOSection>

      <SEOSection title="Practical Friction Factor Examples">
        <p><strong>Example 1: Water Flow in Steel Pipe</strong></p>
        <p>
          Calculate friction factor for 10 m/s water flow in 100 mm steel pipe at 20°C. For water at 20°C, kinematic viscosity 
          ν = 1.0 × 10^-6 m²/s.
        </p>
        <p>
          Re = (10 × 0.1) / (1.0 × 10^-6) = 1,000,000 (highly turbulent)
        </p>
        <p>
          Using Blasius: f = 0.316 / (1,000,000)^0.25 = 0.00316
        </p>
        <p>
          For 100 m pipe length and 1000 kg/m³ water density:
          ΔP = 0.00316 × (100/0.1) × (1000 × 10²/2) = 158,000 Pa ≈ 158 kPa
        </p>
        <p><strong>Example 2: Laminar Oil Flow</strong></p>
        <p>
          Calculate friction factor for 0.5 m/s oil flow in 50 mm pipe with kinematic viscosity ν = 100 × 10^-6 m²/s:
        </p>
        <p>
          Re = (0.5 × 0.05) / (100 × 10^-6) = 250 (laminar flow)
        </p>
        <p>
          f = 64 / 250 = 0.256 (much higher than turbulent due to viscosity)
        </p>
        <p>
          For the same conditions as Example 1 except 50 mm diameter:
          ΔP = 0.256 × (100/0.05) × (850 × 0.5²/2) ≈ 217 kPa
        </p>
      </SEOSection>

      <SEOFAQ
        questions={[
          {
            question: 'What is the friction factor and why is it important?',
            answer:
              'The friction factor is a dimensionless parameter that quantifies resistance to fluid flow in pipes and ducts. It\'s critical for pump sizing, pipeline design, and predicting pressure drop. A small change in friction factor can significantly increase energy costs in large fluid transport systems.',
          },
          {
            question: 'What is the Reynolds number and how does it affect friction factor?',
            answer:
              'The Reynolds number (Re) characterizes flow regime by comparing inertial to viscous forces. Laminar flow (Re < 2300) has low friction factors dependent only on Re. Turbulent flow (Re > 4000) has higher friction factors dependent on both Re and pipe roughness. The transition zone (2300-4000) is unstable.',
          },
          {
            question: 'What are the differences between laminar and turbulent flow friction factors?',
            answer:
              'Laminar flow friction factor is calculated from f = 64/Re, independent of pipe roughness. Turbulent flow uses Blasius (f = 0.316/Re^0.25) or Colebrook-White equations and depends heavily on relative roughness. Laminar flow has lower friction factors at the same velocity but only occurs at low Reynolds numbers.',
          },
          {
            question: 'How does pipe roughness affect friction factor?',
            answer:
              'In laminar flow, pipe roughness has zero effect. In turbulent flow, higher roughness increases friction factor. The effect is quantified by relative roughness (k/D). Old, corroded pipes have much higher effective roughness than new pipes, increasing friction losses and requiring larger pumps.',
          },
          {
            question: 'What is the Darcy-Weisbach equation and what does it calculate?',
            answer:
              'ΔP = f × (L/D) × (ρV²/2) calculates pressure drop in pipes. f is friction factor, L is pipe length, D is diameter, ρ is fluid density, V is velocity. This equation is fundamental in hydraulic engineering for pump sizing and pipeline design.',
          },
          {
            question: 'What is the Colebrook-White equation and when is it used?',
            answer:
              'The Colebrook-White equation (1/√f = -2log₁₀(k/3.7D + 2.51/Re√f)) is an implicit equation for friction factor in turbulent flow that accounts for pipe roughness. It\'s more accurate than Blasius for rough pipes and higher Reynolds numbers, though it requires iterative solution.',
          },
          {
            question: 'How much does pipe age and corrosion affect friction losses?',
            answer:
              'Pipe roughness increases significantly with age and corrosion. Friction factor can increase 50-100% over decades of service as internal deposits accumulate. This directly increases operating costs as pumps must work harder to maintain flow rates.',
          },
          {
            question: 'How do I select the optimal pipe diameter for a system?',
            answer:
              'Economic pipe diameter balances capital cost (larger pipes cost more) against operating cost (smaller pipes require larger pumps). Typical design velocities are 1-3 m/s. Use friction factor calculations to predict pressure drop at candidate diameters and select the diameter minimizing total lifecycle cost.',
          },
        ]}
      />

      <SEOSection title="Conclusion">
        <p>
          Mastering friction factor calculations is essential for efficient fluid transport system design. Our calculator provides instant, accurate results for both laminar and turbulent flow regimes.
        </p>
        <p>
          Explore more Physics tools: Check out our {createInternalLink('reynolds-number-calculator')} to calculate Reynolds numbers for your flow conditions, or discover our {createInternalLink('drag-equation-calculator')} for aerodynamic and hydrodynamic drag analysis.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
