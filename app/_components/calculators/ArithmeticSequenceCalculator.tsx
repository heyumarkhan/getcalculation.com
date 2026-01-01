'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ArithmeticSequenceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface ArithmeticSequenceResult {
  firstTerm: number;
  commonDifference: number;
  termNumber: number;
  nthTerm: number;
  sum: number;
  calculationType: 'nth_term' | 'sum' | 'both';
  explanation: string;
  steps: string[];
  sequence: number[];
  formula: string;
}

export default function ArithmeticSequenceCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: ArithmeticSequenceCalculatorProps) {
  const [firstTerm, setFirstTerm] = useState<string>('');
  const [commonDifference, setCommonDifference] = useState<string>('');
  const [termNumber, setTermNumber] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'nth_term' | 'sum' | 'both'>('both');
  const [result, setResult] = useState<ArithmeticSequenceResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    // Check if it's a whole number
    if (Math.abs(value - Math.round(value)) < 0.0001) {
      return Math.round(value).toString();
    }
    return value.toFixed(4);
  };

  const calculateArithmeticSequence = () => {
    const a1 = parseFloat(firstTerm);
    const d = parseFloat(commonDifference);
    const n = parseInt(termNumber);

    // Validation
    if (isNaN(a1) || isNaN(d) || isNaN(n)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    if (n < 1) {
      alert('Term number must be a positive integer');
      return;
    }

    // Calculate nth term: a_n = a_1 + (n-1)d
    const nthTerm = a1 + (n - 1) * d;

    // Calculate sum: S_n = n/2 × (a_1 + a_n) = n/2 × (2a_1 + (n-1)d)
    const sum = (n / 2) * (2 * a1 + (n - 1) * d);

    // Generate sequence (first 10 terms or up to n)
    const sequenceLength = Math.min(n, 10);
    const sequence: number[] = [];
    for (let i = 1; i <= sequenceLength; i++) {
      sequence.push(a1 + (i - 1) * d);
    }

    // Generate explanation
    let explanation: string;
    if (calculationType === 'nth_term') {
      explanation = `The ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} term of the arithmetic sequence is ${formatValue(nthTerm)}.`;
    } else if (calculationType === 'sum') {
      explanation = `The sum of the first ${n} terms of the arithmetic sequence is ${formatValue(sum)}.`;
    } else {
      explanation = `The ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} term is ${formatValue(nthTerm)} and the sum of the first ${n} terms is ${formatValue(sum)}.`;
    }

    // Generate step-by-step calculation
    const steps: string[] = [];
    
    steps.push(`Given: First term (a₁) = ${formatValue(a1)}, Common difference (d) = ${formatValue(d)}, Term number (n) = ${n}`);
    
    if (calculationType === 'nth_term' || calculationType === 'both') {
      steps.push(`Step 1: Calculate the ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} term using a_n = a₁ + (n-1) × d`);
      steps.push(`Step 2: a_${n} = ${formatValue(a1)} + (${n}-1) × ${formatValue(d)} = ${formatValue(a1)} + ${n-1} × ${formatValue(d)}`);
      steps.push(`Step 3: a_${n} = ${formatValue(a1)} + ${formatValue((n-1) * d)} = ${formatValue(nthTerm)}`);
    }
    
    if (calculationType === 'sum' || calculationType === 'both') {
      steps.push(`Step ${calculationType === 'both' ? '4' : '1'}: Calculate sum using S_n = n/2 × (2a₁ + (n-1)d)`);
      steps.push(`Step ${calculationType === 'both' ? '5' : '2'}: S_${n} = ${n}/2 × (2 × ${formatValue(a1)} + (${n}-1) × ${formatValue(d)})`);
      steps.push(`Step ${calculationType === 'both' ? '6' : '3'}: S_${n} = ${n}/2 × (${formatValue(2 * a1)} + ${formatValue((n-1) * d)})`);
      steps.push(`Step ${calculationType === 'both' ? '7' : '4'}: S_${n} = ${n}/2 × ${formatValue(2 * a1 + (n-1) * d)} = ${formatValue(sum)}`);
    }

    // Generate formula
    const nthTermFormula = `a_n = a₁ + (n-1) × d = ${formatValue(a1)} + (n-1) × ${formatValue(d)}`;
    const sumFormulaText = `S_n = n/2 × (2a₁ + (n-1)d) = ${n}/2 × (2 × ${formatValue(a1)} + (n-1) × ${formatValue(d)})`;

    setResult({
      firstTerm: a1,
      commonDifference: d,
      termNumber: n,
      nthTerm,
      sum,
      calculationType,
      explanation,
      steps,
      sequence,
      formula: calculationType === 'nth_term' ? nthTermFormula : 
               calculationType === 'sum' ? sumFormulaText : 
               `${nthTermFormula}\n${sumFormulaText}`
    });
  };

  const getColorClasses = (color: string) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    
    return {
      button: '',
      result: '',
      resultBg: '',
      resultBorder: '',
      resultText: '',
      customStyles: {
        button: {
          backgroundColor: hexColor,
          '--hover-color': hexColor,
          '--focus-color': hexColor
        } as React.CSSProperties,
        result: {
          color: hexColor
        } as React.CSSProperties,
        resultBg: {
          backgroundColor: `${hexColor}10`,
          borderColor: `${hexColor}30`
        } as React.CSSProperties,
        resultText: {
          color: hexColor
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  return (
    <>
      {colors.customStyles && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-color-button:hover {
              background-color: ${primaryColor}dd !important;
            }
            .custom-color-button:focus {
              box-shadow: 0 0 0 3px ${primaryColor}40 !important;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `
        }} />
      )}
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Arithmetic Sequence Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the nth term and sum of an arithmetic sequence. Find any term using the common difference with step-by-step solutions.</p>
          </>
        )}

        <div className="space-y-4">
          <div>
            <Input
              label="First Term (a₁)"
              type="text"
              value={firstTerm}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                  setFirstTerm(value);
                }
              }}
              placeholder="Enter first term"
              autoFocus
            />
          </div>

          <div>
            <Input
              label="Common Difference (d)"
              type="text"
              value={commonDifference}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                  setCommonDifference(value);
                }
              }}
              placeholder="Enter common difference"
            />
          </div>

          <div>
            <Input
              label="Term Number (n)"
              type="text"
              value={termNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^\d*$/.test(value)) {
                  setTermNumber(value);
                }
              }}
              placeholder="Enter term number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculate
            </label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value as 'nth_term' | 'sum' | 'both')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="both">Nth Term and Sum</option>
              <option value="nth_term">Nth Term Only</option>
              <option value="sum">Sum Only</option>
            </select>
          </div>

          <Button 
            onClick={calculateArithmeticSequence}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Arithmetic Sequence
          </Button>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-lg animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                Results
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
                  <p className="text-gray-600">{result.explanation}</p>
                </div>

                {(result.calculationType === 'nth_term' || result.calculationType === 'both') && (
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-2">
                      {result.termNumber}{result.termNumber === 1 ? 'st' : result.termNumber === 2 ? 'nd' : result.termNumber === 3 ? 'rd' : 'th'} Term:
                    </p>
                    <p className="font-mono text-lg" style={colors.customStyles?.result}>
                      {formatValue(result.nthTerm)}
                    </p>
                  </div>
                )}

                {(result.calculationType === 'sum' || result.calculationType === 'both') && (
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-2">Sum of First {result.termNumber} Terms:</p>
                    <p className="font-mono text-lg" style={colors.customStyles?.result}>
                      {formatValue(result.sum)}
                    </p>
                  </div>
                )}

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Sequence (first {result.sequence.length} terms):</p>
                  <p className="font-mono text-sm text-gray-600">
                    {result.sequence.map((term, index) => (
                      <span key={index}>
                        {formatValue(term)}
                        {index < result.sequence.length - 1 ? ', ' : ''}
                        {index === result.sequence.length - 1 && result.termNumber > result.sequence.length ? '...' : ''}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Calculation Steps:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {result.steps.map((step, index) => (
                      <li key={index} className="text-gray-700 font-mono text-xs">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

