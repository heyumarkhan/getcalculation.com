import GreaterThanOrLessThanCalculator from '../../../_components/calculators/GreaterThanOrLessThanCalculator';
import CalculatorPageTemplate from '../../../_components/layouts/CalculatorPageTemplate';
import { SEOSection, SEOList, SEOFAQ } from '../../../_components/ui/SEOContent';
import { createInternalLink } from '../../../_components/ui/SEOInternalLink';

export default function GreaterThanOrLessThanCalculatorPage() {
  return (
    <CalculatorPageTemplate
      title="Greater Than Or Less Than Calculator: Compare Numbers Instantly"
      description="Compare two numbers using inequality symbols (>, <, =). Free online calculator for greater than, less than, and equal to comparisons with step-by-step explanations."
      calculator={<GreaterThanOrLessThanCalculator />}
      slug="math/greater-than-or-less-than"
      category="Algebra"
      features={[
        "Instant number comparison",
        "Clear inequality symbol display",
        "Step-by-step explanations",
        "Mobile-friendly interface",
        "No registration required",
        "Free to use"
      ]}
    >
      <SEOSection title="Understanding Number Comparison">
        <p>
          Our Greater Than Or Less Than Calculator helps you compare two numbers using mathematical inequality symbols. 
          Whether you're working on algebra homework, comparing measurements, or solving word problems, this tool provides 
          instant results with clear explanations.
        </p>
        <p>
          The calculator uses three main inequality symbols: greater than (&gt;), less than (&lt;), and equal to (=). 
          Understanding these symbols is fundamental to algebra, number theory, and mathematical reasoning.
        </p>
      </SEOSection>
      
      <SEOSection title="How to Use Our Calculator">
        <p>Follow these simple steps to compare numbers:</p>
        <ol>
          <li><strong>Enter First Number:</strong> Input the first number you want to compare</li>
          <li><strong>Enter Second Number:</strong> Input the second number for comparison</li>
          <li><strong>Click Compare:</strong> Get instant results with the appropriate inequality symbol</li>
          <li><strong>Review Results:</strong> See the comparison symbol, explanation, and detailed reasoning</li>
        </ol>
      </SEOSection>

      <SEOSection title="Understanding Inequality Symbols">
        <p>Mathematical inequality symbols represent different relationships between numbers:</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="font-mono text-2xl font-bold text-green-600">&gt;</p>
              <p className="font-semibold">Greater Than</p>
              <p className="text-sm text-gray-600">First number is larger</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-red-600">&lt;</p>
              <p className="font-semibold">Less Than</p>
              <p className="text-sm text-gray-600">First number is smaller</p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-blue-600">=</p>
              <p className="font-semibold">Equal To</p>
              <p className="text-sm text-gray-600">Numbers are the same</p>
            </div>
          </div>
        </div>
      </SEOSection>

      <SEOSection title="Practical Examples">
        <h3>Example 1: Basic Comparison</h3>
        <p>Let's compare 15 and 8:</p>
        <ul>
          <li><strong>First Number:</strong> 15</li>
          <li><strong>Second Number:</strong> 8</li>
          <li><strong>Result:</strong> 15 &gt; 8 (15 is greater than 8)</li>
        </ul>

        <h3>Example 2: Decimal Comparison</h3>
        <p>Comparing 3.7 and 3.14:</p>
        <ul>
          <li><strong>First Number:</strong> 3.7</li>
          <li><strong>Second Number:</strong> 3.14</li>
          <li><strong>Result:</strong> 3.7 &gt; 3.14 (3.7 is greater than 3.14)</li>
        </ul>

        <h3>Example 3: Equal Numbers</h3>
        <p>Comparing 5.0 and 5:</p>
        <ul>
          <li><strong>First Number:</strong> 5.0</li>
          <li><strong>Second Number:</strong> 5</li>
          <li><strong>Result:</strong> 5.0 = 5 (they are equal)</li>
        </ul>
      </SEOSection>

      <SEOSection title="Common Applications">
        <p>Number comparison is essential in many areas:</p>
        <SEOList items={[
          "Algebra: Solving inequalities and equations",
          "Statistics: Comparing data values and averages",
          "Finance: Comparing prices, rates, and returns",
          "Science: Comparing measurements and experimental results",
          "Programming: Conditional statements and logic",
          "Everyday Life: Comparing prices, distances, and quantities"
        ]} />
      </SEOSection>

      <SEOSection title="Tips for Accurate Comparisons">
        <p>Follow these tips for reliable number comparisons:</p>
        <SEOList items={[
          "Enter numbers in decimal form for precise comparisons",
          "Use negative numbers to compare values below zero",
          "Remember that larger positive numbers are greater than smaller ones",
          "Negative numbers closer to zero are greater than those farther from zero",
          "Zero is greater than any negative number but less than any positive number"
        ]} />
      </SEOSection>

      <SEOSection title="Related Calculators">
        <p>
          If you found this calculator helpful, you might also be interested in our{' '}
          {createInternalLink('slope')} calculator for finding slopes between points,{' '}
          {createInternalLink('midpoint')} calculator for finding the middle point, or{' '}
          {createInternalLink('lineSegment')} calculator for measuring distances.
        </p>
      </SEOSection>

      <SEOSection title="Frequently Asked Questions">
        <SEOFAQ questions={[
          {
            question: "What happens if I enter the same number twice?",
            answer: "If both numbers are identical, the calculator will show the equal sign (=) and explain that the numbers are equal."
          },
          {
            question: "Can I compare negative numbers?",
            answer: "Yes, our calculator handles negative numbers correctly. For example, -5 is less than -3, and -2 is greater than -10."
          },
          {
            question: "How does the calculator handle decimal numbers?",
            answer: "The calculator accurately compares decimal numbers with any number of decimal places, providing precise comparisons."
          },
          {
            question: "Is this calculator free to use?",
            answer: "Yes, all our calculators are completely free to use with no registration required."
          },
          {
            question: "Can I use this for comparing fractions?",
            answer: "While this calculator works with decimal numbers, for fraction comparisons, you might want to convert fractions to decimals first or use a dedicated fraction calculator."
          }
        ]} />
      </SEOSection>

      <SEOSection title="Conclusion">
        <p>
          Our Greater Than Or Less Than Calculator provides instant, accurate number comparisons with clear explanations. 
          Whether you're a student learning algebra, a professional working with data, or anyone needing to compare numbers, 
          this tool makes the process simple and educational. Try comparing different numbers to deepen your understanding 
          of mathematical relationships and inequality symbols.
        </p>
        <p>
          For more mathematical tools, explore our{' '}
          {createInternalLink('area')} calculators or{' '}
          {createInternalLink('volume')} calculators for additional mathematical resources.
        </p>
      </SEOSection>
    </CalculatorPageTemplate>
  );
}
