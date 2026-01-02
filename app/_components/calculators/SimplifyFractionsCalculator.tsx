'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SimplifyFractionsCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface SimplifyFractionResult {
  original: { numerator: number; denominator: number };
  simplified: { numerator: number; denominator: number };
  gcd: number;
  decimalValue: number;
  explanation: string;
  steps: string[];
}

export default function SimplifyFractionsCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SimplifyFractionsCalculatorProps) {
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [result, setResult] = useState<SimplifyFractionResult | null>(null);
  const [error, setError] = useState<string>('');

  // Calculate GCD using Euclidean algorithm
  const calculateGCD = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a || 1;
  };

  const simplifyFraction = () => {
    setError('');
    setResult(null);

    // Parse inputs
    const num = parseInt(numerator);
    const denom = parseInt(denominator);

    // Validation
    if (isNaN(num) || isNaN(denom)) {
      setError('Please enter valid numbers for both numerator and denominator');
      return;
    }

    if (denom === 0) {
      setError('Denominator cannot be zero');
      return;
    }

    if (num === 0) {
      setResult({
        original: { numerator: 0, denominator: denom },
        simplified: { numerator: 0, denominator: 1 },
        gcd: 1,
        decimalValue: 0,
        explanation: 'Zero divided by any non-zero number equals zero. The simplified form is 0/1.',
        steps: ['Numerator is 0', 'Simplified form: 0/1']
      });
      return;
    }

    // Calculate GCD
    const gcd = calculateGCD(num, denom);

    // Simplify
    const simplifiedNum = num / gcd;
    const simplifiedDenom = denom / gcd;

    // Ensure positive denominator
    let finalNum = simplifiedNum;
    let finalDenom = simplifiedDenom;
    if (finalDenom < 0) {
      finalNum = -finalNum;
      finalDenom = -finalDenom;
    }

    // Calculate decimal value
    const decimalValue = finalNum / finalDenom;

    // Generate steps
    const steps: string[] = [];
    steps.push(`Original fraction: ${num}/${denom}`);
    steps.push(`Find GCD of ${Math.abs(num)} and ${Math.abs(denom)}: GCD = ${gcd}`);
    steps.push(`Divide numerator by GCD: ${num} ÷ ${gcd} = ${simplifiedNum}`);
    steps.push(`Divide denominator by GCD: ${denom} ÷ ${gcd} = ${simplifiedDenom}`);
    steps.push(`Simplified fraction: ${finalNum}/${finalDenom}`);
    steps.push(`Decimal value: ${decimalValue.toFixed(6)}`);

    // Generate explanation
    let explanation = `The fraction ${num}/${denom} simplifies to ${finalNum}/${finalDenom}. `;
    if (gcd === 1) {
      explanation += 'This fraction is already in its simplest form because the GCD of the numerator and denominator is 1.';
    } else {
      explanation += `The greatest common divisor (GCD) of ${Math.abs(num)} and ${Math.abs(denom)} is ${gcd}, so we divide both the numerator and denominator by ${gcd} to get the simplified form.`;
    }

    setResult({
      original: { numerator: num, denominator: denom },
      simplified: { numerator: finalNum, denominator: finalDenom },
      gcd,
      decimalValue,
      explanation,
      steps
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      simplifyFraction();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {showTitle && (
        <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>
          Simplify Fractions Calculator
        </h2>
      )}

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Numerator</label>
            <Input
              type="number"
              placeholder="Enter numerator (e.g., 4)"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Denominator</label>
            <Input
              type="number"
              placeholder="Enter denominator (e.g., 8)"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <Button
            onClick={simplifyFraction}
            style={{ backgroundColor: primaryColor }}
            className="w-full text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            Simplify Fraction
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
                <div className="text-sm text-gray-600 mb-2">Original</div>
                <div className="text-2xl font-bold">
                  {result.original.numerator}/{result.original.denominator}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">Simplified</div>
                <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                  {result.simplified.numerator}/{result.simplified.denominator}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-100 rounded">
                <div className="text-sm text-gray-600 mb-1">GCD</div>
                <div className="text-lg font-semibold">{result.gcd}</div>
              </div>
              <div className="p-3 bg-gray-100 rounded">
                <div className="text-sm text-gray-600 mb-1">Decimal Value</div>
                <div className="text-lg font-semibold">{result.decimalValue.toFixed(6)}</div>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>
              Explanation
            </h3>
            <p className="text-gray-700 mb-4">{result.explanation}</p>
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
