'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SquareOfBinomialCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface SquareOfBinomialResult {
  a: number;
  b: number;
  firstTerm: number;
  middleTerm: number;
  lastTerm: number;
  expansion: string;
  formula: string;
  explanation: string;
  steps: string[];
}

export default function SquareOfBinomialCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SquareOfBinomialCalculatorProps) {
  const [aValue, setAValue] = useState<string>('');
  const [bValue, setBValue] = useState<string>('');
  const [result, setResult] = useState<SquareOfBinomialResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateSquareOfBinomial = () => {
    setError('');
    setResult(null);

    // Parse inputs
    const a = parseFloat(aValue);
    const b = parseFloat(bValue);

    // Validation
    if (isNaN(a) || isNaN(b)) {
      setError('Please enter valid numbers for both terms');
      return;
    }

    // Calculate components using the formula (a + b)² = a² + 2ab + b²
    const firstTerm = a * a;
    const middleTerm = 2 * a * b;
    const lastTerm = b * b;

    // Calculate final result
    const resultValue = firstTerm + middleTerm + lastTerm;

    // Format the expansion
    const formatTerm = (value: number, isFirst: boolean = false): string => {
      if (value === 0) return '';
      
      const sign = value > 0 ? '+' : '';
      const displayValue = Math.abs(value);
      
      if (isFirst) {
        return value < 0 ? `-${displayValue}` : `${displayValue}`;
      }
      return value > 0 ? `+ ${displayValue}` : `- ${displayValue}`;
    };

    // Build expansion string
    let expansion = `${formatTerm(firstTerm, true)} ${formatTerm(middleTerm)} ${formatTerm(lastTerm)}`;
    expansion = expansion.replace(/\s+/g, ' ').trim();

    // Determine formula display
    let formula = '';
    if (a >= 0 && b >= 0) {
      formula = `(${a} + ${b})² = ${a}² + 2(${a})(${b}) + ${b}²`;
    } else if (a >= 0 && b < 0) {
      formula = `(${a} - ${Math.abs(b)})² = ${a}² - 2(${a})(${Math.abs(b)}) + ${Math.abs(b)}²`;
    } else {
      formula = `(${a} + ${b})²`;
    }

    // Generate steps
    const steps: string[] = [];
    steps.push(`Formula: (a + b)² = a² + 2ab + b²`);
    steps.push(`Given: a = ${a}, b = ${b}`);
    steps.push(`First term (a²): ${a}² = ${firstTerm}`);
    steps.push(`Middle term (2ab): 2 × ${a} × ${b} = ${middleTerm}`);
    steps.push(`Last term (b²): ${b}² = ${lastTerm}`);
    steps.push(`Expansion: ${firstTerm} + ${middleTerm} + ${lastTerm}`);
    steps.push(`Result: ${resultValue}`);

    // Generate explanation
    let explanation = `The square of the binomial (${a}${b >= 0 ? '+' : ''} ${b}) is calculated using the formula (a + b)² = a² + 2ab + b². `;
    explanation += `By substituting a = ${a} and b = ${b}, we get: a² = ${firstTerm}, 2ab = ${middleTerm}, and b² = ${lastTerm}. `;
    explanation += `Adding these together: ${firstTerm} + ${middleTerm} + ${lastTerm} = ${resultValue}.`;

    setResult({
      a,
      b,
      firstTerm,
      middleTerm,
      lastTerm,
      expansion,
      formula,
      explanation,
      steps
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateSquareOfBinomial();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {showTitle && (
        <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>
          Square of a Binomial Calculator
        </h2>
      )}

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">First Term (a)</label>
            <Input
              type="number"
              placeholder="Enter first term (e.g., 2)"
              value={aValue}
              onChange={(e) => setAValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Second Term (b)</label>
            <Input
              type="number"
              placeholder="Enter second term (e.g., 3)"
              value={bValue}
              onChange={(e) => setBValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <Button
            onClick={calculateSquareOfBinomial}
            style={{ backgroundColor: primaryColor }}
            className="w-full text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            Calculate
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          <div className="p-6 border-2 bg-white rounded-lg" style={{ borderColor: primaryColor }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
              Result
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Formula</div>
                <div className="text-lg font-mono font-bold break-words">
                  ({result.a}{result.b >= 0 ? '+' : ''} {result.b})²
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Result</div>
                <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                  {result.firstTerm + result.middleTerm + result.lastTerm}
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-100 rounded">
              <div className="text-sm text-gray-600 mb-2">Expanded Form</div>
              <div className="text-lg font-mono font-semibold break-words">
                {result.firstTerm}{result.middleTerm >= 0 ? '+' : ''} {result.middleTerm}{result.lastTerm >= 0 ? '+' : ''} {result.lastTerm}
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>
              Formula Used
            </h3>
            <div className="p-4 bg-gray-50 rounded border border-gray-300">
              <p className="font-mono text-center text-lg font-bold">
                (a + b)² = a² + 2ab + b²
              </p>
            </div>
            <p className="text-gray-700 mt-3">{result.explanation}</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>
              Step-by-Step Calculation
            </h3>
            <div className="space-y-3">
              {result.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 font-semibold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {index + 1}
                  </div>
                  <div className="pt-1 text-gray-700">{step}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
