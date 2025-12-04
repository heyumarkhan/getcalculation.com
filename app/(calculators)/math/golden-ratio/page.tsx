import GoldenRatioCalculator from '../../../_components/calculators/GoldenRatioCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GoldenRatioPage() {
  return (
    <CalculatorPageTemplate
      title="Golden Ratio Calculator: Calculate φ (Phi) & Golden Ratio Segments"
      description="Calculate the golden ratio (φ), find golden ratio segments, and check if numbers follow the golden ratio with our free Golden Ratio Calculator. Explore the mathematical constant phi with step-by-step solutions."
      calculator={<GoldenRatioCalculator />}
      slug="math/golden-ratio"
      category="Geometry"
      features={[
        "Calculate golden ratio (φ) constant",
        "Find golden ratio segments from total length",
        "Calculate from smaller or larger part",
        "Check if numbers follow golden ratio",
        "Step-by-step calculations",
        "Mobile-friendly interface",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding the Golden Ratio: Nature's Perfect Proportion">
        <p>
          The <strong>golden ratio</strong>, also known as φ (phi) or the divine proportion, is one of the most fascinating mathematical constants in nature and art. With a value of approximately 1.618033988749895, the golden ratio appears throughout the natural world—from the spiral patterns of shells and sunflowers to the proportions of the human body. Understanding <strong>how to calculate the golden ratio</strong> and work with golden ratio segments opens doors to appreciating the mathematical beauty that surrounds us.
        </p>
        <p>
          At its core, the golden ratio represents a special relationship where the ratio of the larger part to the smaller part equals the ratio of the whole to the larger part. This creates a visually pleasing proportion that has been used in art, architecture, and design for thousands of years. Our Golden Ratio Calculator makes it easy to explore this mathematical constant, calculate golden ratio segments, and verify if any two numbers follow this perfect proportion.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use Our Golden Ratio Calculator">
        <p>
          Our Golden Ratio Calculator offers three powerful calculation modes to explore φ (phi) and golden ratio relationships:
        </p>
        <ol>
          <li><strong>Find Golden Ratio Parts:</strong> Enter a total length, and the calculator will divide it into two segments that follow the golden ratio. The larger segment divided by the smaller segment equals φ, and the total divided by the larger segment also equals φ.</li>
          <li><strong>Calculate from Smaller Part:</strong> Enter the smaller part of a golden ratio division, and the calculator will find the larger part and total length that maintain the golden ratio relationship.</li>
          <li><strong>Check if Golden Ratio:</strong> Enter a ratio (larger part divided by smaller part), and the calculator will determine if it matches the golden ratio within acceptable precision.</li>
        </ol>
        <p>
          Each calculation displays the golden ratio constant φ, the calculated segments, and detailed information about the mathematical relationships involved.
        </p>
      </SEOSection>

      <SEOSection title="Interpreting Your Results">
        <p>
          The results from our calculator show the mathematical relationships that define the golden ratio. When you calculate golden ratio segments, you&apos;ll see:
        </p>
        <ul>
            <li><strong>Golden Ratio (φ):</strong> The constant value approximately 1.618033988749895, calculated as (1 + √5) / 2.</li>
            <li><strong>Smaller Part:</strong> The shorter segment in a golden ratio division.</li>
            <li><strong>Larger Part:</strong> The longer segment, which is φ times the smaller part.</li>
            <li><strong>Total:</strong> The sum of both parts, which equals the larger part times φ.</li>
        </ul>
        <p>
          The key relationship is that larger part ÷ smaller part = total ÷ larger part = φ. This creates a self-similar proportion that repeats at different scales, which is why the golden ratio appears so frequently in nature&apos;s fractal patterns.
        </p>
      </SEOSection>

      <SEOSection title="The Core Concept: What is the Golden Ratio?">
        <p>
          The <strong>golden ratio</strong>, denoted by the Greek letter φ (phi), is an irrational number approximately equal to 1.618. It is defined as the positive solution to the equation x² = x + 1, which gives us the formula:
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-center my-4">
          <p className="font-mono text-lg font-bold">φ = (1 + √5) / 2 ≈ 1.618033988749895</p>
        </div>
        
        <h3>Mathematical Definition</h3>
        <p>
          The golden ratio occurs when a line is divided into two parts such that:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <p className="font-mono text-center text-lg mb-2">(a + b) / a = a / b = φ</p>
          <p className="text-gray-600 text-center text-sm">where a is the larger part and b is the smaller part</p>
        </div>
        <p>
          This means that the ratio of the whole to the larger part equals the ratio of the larger part to the smaller part, both equaling φ. This self-similar property is what makes the golden ratio so special and why it appears in so many natural and artistic contexts.
        </p>
      </SEOSection>
      
      <SEOSection title="The Golden Ratio in Nature: Fibonacci and Beyond">
        <p>
          The golden ratio is closely related to the Fibonacci sequence, where each number is the sum of the two preceding ones (1, 1, 2, 3, 5, 8, 13, 21, 34...). As the Fibonacci sequence progresses, the ratio of consecutive numbers approaches the golden ratio.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-sm mb-2">Fibonacci Ratios Approaching φ:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div>3/2 = 1.5</div>
            <div>5/3 ≈ 1.667</div>
            <div>8/5 = 1.6</div>
            <div>13/8 = 1.625</div>
            <div>21/13 ≈ 1.615</div>
            <div>34/21 ≈ 1.619</div>
            <div>55/34 ≈ 1.618</div>
            <div>89/55 ≈ 1.618</div>
          </div>
        </div>
        <p><strong>Natural Occurrences:</strong></p>
        <SEOList items={["Flower Petals: Many flowers have petal counts that are Fibonacci numbers, and their spiral arrangements follow golden ratio angles.", "Shell Spirals: Nautilus shells and other spiral shells grow in golden ratio proportions, creating perfect logarithmic spirals.", "Tree Branches: The branching patterns of trees often follow golden ratio divisions, optimizing space and light exposure.", "Human Body: The proportions of the human body, from the ratio of arm to forearm to facial features, often approximate the golden ratio.", "Galaxy Spirals: The spiral arms of galaxies follow golden ratio angles, creating the beautiful spiral patterns we observe.", "Hurricane Patterns: The spiral structure of hurricanes follows golden ratio proportions."]} />
      </SEOSection>

      <SEOSection title="The Golden Ratio in Art and Architecture">
        <p>
          Artists and architects have used the golden ratio for thousands of years to create visually pleasing compositions. The Parthenon in Athens, the Great Pyramid of Giza, and countless Renaissance paintings incorporate golden ratio proportions.
        </p>
        <p><strong>Famous Examples:</strong></p>
        <SEOList items={["The Parthenon: The facade and columns of the Parthenon follow golden ratio proportions, creating a sense of harmony and balance.", "The Great Pyramid: The ratio of the pyramid's height to its base perimeter approximates the golden ratio.", "Renaissance Art: Leonardo da Vinci's \"Vitruvian Man\" and many of his other works use golden ratio divisions.", "Modern Design: The golden ratio is still used in logo design, web design, and product design to create aesthetically pleasing layouts.", "Photography: The rule of thirds in photography is related to golden ratio principles, helping photographers create balanced compositions."]} />
      </SEOSection>

      <SEOSection title="Calculating Golden Ratio Segments">
        <p>
          When you need to divide a line or length into golden ratio segments, you can use these formulas:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-mono text-center text-lg mb-2">Given total length L:</p>
          <p className="text-sm text-gray-700 mb-2">Larger part = L / φ</p>
          <p className="text-sm text-gray-700">Smaller part = L - (L / φ) = L × (1 - 1/φ)</p>
        </div>
        <p><strong>Example:</strong> If you have a line of length 100 units:</p>
        <ul>
          <li>Larger part = 100 / 1.618 ≈ 61.8 units</li>
          <li>Smaller part = 100 - 61.8 = 38.2 units</li>
          <li>Verification: 61.8 / 38.2 ≈ 1.618 ✓</li>
        </ul>
        <p>
          Our calculator performs these calculations instantly, making it easy to apply golden ratio principles to any project, whether you&apos;re designing a layout, creating art, or exploring mathematical relationships.
        </p>
      </SEOSection>

      <SEOSection title="Practical Applications: Why the Golden Ratio Matters">
        <p>Understanding <strong>how to calculate the golden ratio</strong> has practical applications across many fields:</p>
        <SEOList items={["Graphic Design: Creating balanced layouts, logo designs, and typography that feel naturally pleasing to the eye.", "Architecture: Designing buildings and spaces with proportions that create harmony and visual appeal.", "Photography: Composing images using golden ratio grids instead of traditional rule of thirds for more dynamic compositions.", "Web Design: Creating website layouts, spacing, and element sizing that follow golden ratio principles.", "Product Design: Designing products with proportions that are aesthetically pleasing and feel balanced.", "Art and Illustration: Creating compositions that naturally draw the eye and create visual harmony.", "Music: Some composers use golden ratio proportions in musical compositions and timing."]} />
      </SEOSection>

      <SEOSection title="Golden Ratio vs. Other Mathematical Constants">
        <p>
          The golden ratio is often confused with other mathematical constants, but each has distinct properties:
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="space-y-2 text-sm">
            <div><strong>Golden Ratio (φ):</strong> ≈ 1.618, defined by (1 + √5) / 2, appears in proportions and ratios</div>
            <div><strong>Pi (π):</strong> ≈ 3.14159, the ratio of a circle's circumference to its diameter</div>
            <div><strong>Euler's Number (e):</strong> ≈ 2.71828, the base of natural logarithms, appears in exponential growth</div>
            <div><strong>Silver Ratio:</strong> ≈ 2.414, similar to golden ratio but with different mathematical properties</div>
          </div>
        </div>
        <p>
          While these constants are all important in mathematics, the golden ratio is unique in its relationship to proportions and its frequent appearance in natural patterns and aesthetic design.
        </p>
      </SEOSection>

      <SEOSection title="Limitations and Important Considerations">
        <ul>
            <li><strong>Irrational Number:</strong> The golden ratio is an irrational number, meaning it cannot be expressed as a simple fraction. Our calculator displays it with high precision, but the exact value has infinite decimal places.</li>
            <li><strong>Approximation in Nature:</strong> While the golden ratio appears in nature, these are approximations. Natural systems don&apos;t follow mathematical perfection, but they often approximate golden ratio proportions.</li>
            <li><strong>Context Matters:</strong> The golden ratio is a tool for creating pleasing proportions, but it&apos;s not a universal rule. Good design considers context, function, and multiple factors beyond just mathematical ratios.</li>
            <li><strong>Precision:</strong> When checking if numbers follow the golden ratio, small differences are expected. Our calculator uses a tolerance of 0.0001 to account for rounding and measurement variations.</li>
        </ul>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions (FAQ)">
        <SEOFAQ questions={[
          {
            question: "What is the exact value of the golden ratio?",
            answer: "The golden ratio φ is an irrational number equal to (1 + √5) / 2, which is approximately 1.618033988749895. As an irrational number, it has infinite decimal places that never repeat. The exact value can be expressed as φ = (1 + √5) / 2."
          },
          {
            question: "How do you calculate the golden ratio?",
            answer: "The golden ratio is calculated using the formula φ = (1 + √5) / 2. You can also find it by solving the quadratic equation x² = x + 1, which gives the positive solution as the golden ratio. In practice, you can approximate it by taking the ratio of consecutive Fibonacci numbers, which approaches φ as the numbers get larger."
          },
          {
            question: "What is the relationship between the golden ratio and Fibonacci numbers?",
            answer: "The golden ratio is closely related to the Fibonacci sequence. As Fibonacci numbers get larger, the ratio of consecutive numbers (larger divided by smaller) approaches the golden ratio. For example, 21/13 ≈ 1.615, 34/21 ≈ 1.619, and as the sequence continues, these ratios get closer to φ ≈ 1.618."
          },
          {
            question: "How is the golden ratio used in design?",
            answer: "The golden ratio is used in design to create visually pleasing proportions. Designers divide layouts, images, and elements using golden ratio segments to create balance and harmony. It's commonly used in logo design, web layouts, typography, photography composition, and architectural design to create aesthetically pleasing results."
          },
          {
            question: "Can any two numbers be in golden ratio?",
            answer: "Yes, any two positive numbers can be in golden ratio if the larger number divided by the smaller number equals approximately 1.618 (the golden ratio). Our calculator can check if any given ratio matches the golden ratio within acceptable precision."
          },
          {
            question: "Why is the golden ratio called the divine proportion?",
            answer: "The golden ratio is called the 'divine proportion' because of its frequent appearance in nature, art, and architecture, and its association with beauty and harmony. The term was popularized by Luca Pacioli in his 1509 book 'De Divina Proportione,' which explored the mathematical and aesthetic properties of the golden ratio."
          },
          {
            question: "How do I use the golden ratio in photography?",
            answer: "In photography, you can use the golden ratio by placing important elements along golden ratio lines or at golden ratio intersection points, similar to the rule of thirds but with different proportions. Many cameras and photo editing software offer golden ratio grid overlays to help compose images. The golden ratio creates more dynamic and visually interesting compositions than simple center placement."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          The <strong>golden ratio</strong> is more than just a mathematical curiosity—it&apos;s a fundamental principle that appears throughout nature, art, and design. Whether you&apos;re a designer creating a layout, an artist exploring composition, or a student learning about mathematical constants, understanding <strong>how to calculate the golden ratio</strong> opens up new ways to appreciate and create beauty.
        </p>
        <p>
          Our Golden Ratio Calculator makes it easy to explore φ (phi) and apply golden ratio principles to your projects. Ready to explore more mathematical tools? Check out our {createInternalLink('proportion')} calculator for general proportion calculations, or use our {createInternalLink('circle-equation')} for geometric calculations.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}

