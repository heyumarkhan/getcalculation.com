import FulcrumCalculator from '../../../_components/calculators/FulcrumCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';

const title = 'Fulcrum Calculator | Lever Mechanics & Mechanical Advantage';
const description = 'Calculate lever forces, distances, mechanical advantage, and balance using fulcrum position and torque principles.';
const keywords = [
  'fulcrum calculator',
  'lever calculator',
  'mechanical advantage calculator',
  'torque balance calculator',
  'lever arm calculator',
  'force distance calculator',
  'simple machine calculator',
  'lever mechanics calculator',
  'fulcrum position calculator',
  'effort load calculator',
  'class 1 lever calculator',
  'class 2 lever calculator',
  'class 3 lever calculator',
  'torque equilibrium calculator',
  'lever force calculator',
  'mechanical advantage lever',
  'physics lever calculator',
  'simple machines physics',
  'lever principle calculator',
  'balance point calculator'
];

export const metadata = {
  title,
  description,
  keywords: keywords.join(', '),
  alternates: {
    canonical: 'https://getcalculation.com/physics/fulcrum-calculator',
  },
  openGraph: {
    title,
    description,
    url: 'https://getcalculation.com/physics/fulcrum-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function FulcrumCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Fulcrum Calculator"
      description="Calculate lever mechanics including forces, distances, mechanical advantage, and torque balance around a fulcrum."
      calculator={<FulcrumCalculator />}
      slug="physics/fulcrum-calculator"
      category="Physics"
      features={[
        'Four methods: find output force, find distance, mechanical advantage, balance check',
        'Inputs: forces in N/kN/lbf/kgf; distances in m/cm/mm/ft/in',
        'Computes torque balance using F₁ × d₁ = F₂ × d₂',
        'Calculates mechanical advantage and velocity ratios',
        'Identifies lever classes (1, 2, 3) based on configuration',
        'Real-time balance verification with torque comparison'
      ]}
    >
      <SEOSection title="Understanding Fulcrum and Levers">
        <p>
          A fulcrum is the pivot point around which a lever rotates. The Fulcrum Calculator applies the fundamental lever principle: force multiplied by distance from the fulcrum (torque) must be equal on both sides for equilibrium. This simple machine concept enables mechanical advantage, allowing smaller forces to lift larger loads by adjusting lever arm lengths. Essential for physics education, engineering design, and understanding everyday tools from crowbars to seesaws.
        </p>
      </SEOSection>

      <SEOSection title="How to Use the Fulcrum Calculator">
        <SEOList
          items={[
            'Select a method: find output force, find required distance, calculate mechanical advantage, or check balance.',
            'Enter known values: forces (effort and/or load) and distances (lever arms).',
            'Choose appropriate units for forces (N, kN, lbf, kgf) and distances (m, cm, mm, ft, in).',
            'Click Calculate to see results including torque balance, mechanical advantage, and equilibrium status.',
            'Results show force ratios, velocity ratios, and lever class identification.'
          ]}
        />
      </SEOSection>

      <SEOSection title="Lever and Fulcrum Formulas">
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">F₁ × d₁ = F₂ × d₂</p>
            <p className="text-sm text-gray-600">Torque balance (lever principle)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">MA = d₁ / d₂</p>
            <p className="text-sm text-gray-600">Mechanical advantage (effort arm / load arm)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">F₂ = (F₁ × d₁) / d₂</p>
            <p className="text-sm text-gray-600">Output force (load)</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="font-mono font-bold text-lg">τ = F × d</p>
            <p className="text-sm text-gray-600">Torque (moment of force)</p>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Lever Classes and Applications">
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Class 1 Lever (Fulcrum in Middle):</strong> Seesaw, crowbar, scissors. Fulcrum between effort and load. Can amplify force or distance.</li>
          <li><strong>Class 2 Lever (Load in Middle):</strong> Wheelbarrow, nutcracker, bottle opener. Load between fulcrum and effort. Always amplifies force (MA &gt; 1).</li>
          <li><strong>Class 3 Lever (Effort in Middle):</strong> Tweezers, fishing rod, human arm. Effort between fulcrum and load. Amplifies speed/distance (MA &lt; 1).</li>
          <li><strong>Mechanical Advantage &gt; 1:</strong> Force amplification – smaller effort lifts larger load (sacrifice distance/speed).</li>
          <li><strong>Mechanical Advantage &lt; 1:</strong> Speed amplification – larger effort moves load faster/farther (sacrifice force).</li>
        </ul>
      </SEOSection>

      <SEOSection title="Practical Applications">
        <SEOList
          items={[
            'Construction: crowbars, pry bars, wrecking bars for lifting heavy objects',
            'Workshops: wrenches, pliers, bolt cutters – force multiplication tools',
            'Sports: baseball bats, golf clubs, tennis rackets (speed/distance leverage)',
            'Medical: surgical instruments, dental tools requiring precision control',
            'Everyday: bottle openers, can openers, door handles, playground seesaws',
            'Engineering: crane arms, excavator booms, robotic manipulators'
          ]}
        />
      </SEOSection>

      <SEOSection title="Example Calculations">
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Crowbar:</strong> 50 N effort at 1 m from fulcrum → lift 500 N load at 0.1 m. MA = 10× force amplification.</li>
          <li><strong>Seesaw Balance:</strong> 400 N person at 2 m, 800 N person at 1 m → balanced (both produce 800 N·m torque).</li>
          <li><strong>Wheelbarrow:</strong> 100 N effort at 1.5 m from wheel → lift 300 N load at 0.5 m. MA = 3× force advantage.</li>
          <li><strong>Fishing Rod:</strong> 20 N at hand (0.3 m from pivot) → 10 N at tip (0.6 m). MA = 0.5 (speed amplification).</li>
        </ol>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ
          questions={[
            {
              question: 'What is a fulcrum?',
              answer: 'A fulcrum is the fixed pivot point around which a lever rotates. It supports the lever and allows it to multiply force or distance based on the lever arm lengths on each side.'
            },
            {
              question: 'How does mechanical advantage work?',
              answer: 'Mechanical advantage (MA) is the ratio of output force to input force. MA > 1 means force amplification (lift heavier loads with less effort). MA < 1 means speed/distance amplification (move loads faster or farther).'
            },
            {
              question: 'What is the lever principle formula?',
              answer: 'F₁ × d₁ = F₂ × d₂. The product of force and distance (torque) must be equal on both sides of the fulcrum for the lever to be balanced. This is also called the law of the lever.'
            },
            {
              question: 'Can a lever amplify both force and distance?',
              answer: 'No. Energy conservation prevents this. A lever can amplify force (at the cost of distance) or amplify distance/speed (at the cost of force), but never both simultaneously.'
            },
            {
              question: 'Why do longer lever arms provide more force?',
              answer: 'Torque = Force × Distance. A longer effort arm means more torque for the same effort force. To balance this torque on the load side with a shorter arm requires greater load force.'
            },
            {
              question: 'What determines lever class?',
              answer: 'The relative positions of fulcrum, effort, and load. Class 1: fulcrum in middle. Class 2: load in middle (always MA > 1). Class 3: effort in middle (always MA < 1).'
            }
          ]}
        />
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
