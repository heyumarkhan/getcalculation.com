'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface GeometricSequenceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface GeometricSequenceResult {
  firstTerm: number;
  commonRatio: number;
  termNumber: number;
  nthTerm: number;
  sum: number;
  calculationType: 'nth_term' | 'sum' | 'both';
  explanation: string;
  steps: string[];
  sequence: number[];
  formula: string;
}

export default function GeometricSequenceCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: GeometricSequenceCalculatorProps) {
  const [firstTerm, setFirstTerm] = useState<string>('');
  const [commonRatio, setCommonRatio] = useState<string>('');
  const [termNumber, setTermNumber] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'nth_term' | 'sum' | 'both'>('both');
  const [result, setResult] = useState<GeometricSequenceResult | null>(null);

  const calculateGeometricSequence = () => {
    const a1 = parseFloat(firstTerm);
    const r = parseFloat(commonRatio);
    const n = parseInt(termNumber);

    // Validation
    if (isNaN(a1) || isNaN(r) || isNaN(n)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    if (n < 1) {
      alert('Term number must be a positive integer');
      return;
    }

    if (r === 0) {
      alert('Common ratio cannot be zero');
      return;
    }

    // Calculate nth term: a_n = a_1 * r^(n-1)
    const nthTerm = a1 * Math.pow(r, n - 1);

    // Calculate sum: S_n = a_1 * (1 - r^n) / (1 - r) for r ≠ 1
    let sum: number;
    
    if (r === 1) {
      sum = a1 * n;
    } else {
      sum = a1 * (1 - Math.pow(r, n)) / (1 - r);
    }

    // Generate sequence (first 10 terms or up to n)
    const sequenceLength = Math.min(n, 10);
    const sequence: number[] = [];
    for (let i = 1; i <= sequenceLength; i++) {
      sequence.push(a1 * Math.pow(r, i - 1));
    }

    // Generate explanation
    let explanation: string;
    if (calculationType === 'nth_term') {
      explanation = `The ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} term of the geometric sequence is ${nthTerm.toFixed(6)}.`;
    } else if (calculationType === 'sum') {
      explanation = `The sum of the first ${n} terms of the geometric sequence is ${sum.toFixed(6)}.`;
    } else {
      explanation = `The ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} term is ${nthTerm.toFixed(6)} and the sum of the first ${n} terms is ${sum.toFixed(6)}.`;
    }

    // Generate step-by-step calculation
    const steps: string[] = [];
    
    steps.push(`Given: First term (a₁) = ${a1}, Common ratio (r) = ${r}, Term number (n) = ${n}`);
    
    if (calculationType === 'nth_term' || calculationType === 'both') {
      steps.push(`Step 1: Calculate the ${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'} term using a_n = a₁ × r^(n-1)`);
      steps.push(`Step 2: a_${n} = ${a1} × ${r}^(${n}-1) = ${a1} × ${r}^${n-1}`);
      steps.push(`Step 3: a_${n} = ${a1} × ${Math.pow(r, n-1).toFixed(6)} = ${nthTerm.toFixed(6)}`);
    }
    
    if (calculationType === 'sum' || calculationType === 'both') {
      if (r === 1) {
        steps.push(`Step 4: Calculate sum using S_n = a₁ × n (since r = 1)`);
        steps.push(`Step 5: S_${n} = ${a1} × ${n} = ${sum}`);
      } else {
        steps.push(`Step 4: Calculate sum using S_n = a₁ × (1 - r^n) / (1 - r)`);
        steps.push(`Step 5: S_${n} = ${a1} × (1 - ${r}^${n}) / (1 - ${r})`);
        steps.push(`Step 6: S_${n} = ${a1} × (1 - ${Math.pow(r, n).toFixed(6)}) / (1 - ${r})`);
        steps.push(`Step 7: S_${n} = ${a1} × ${(1 - Math.pow(r, n)).toFixed(6)} / ${(1 - r).toFixed(6)} = ${sum.toFixed(6)}`);
      }
    }

    // Generate formula
    const nthTermFormula = `a_n = a₁ × r^(n-1) = ${a1} × ${r}^(n-1)`;
    const sumFormulaText = r === 1 ? `S_n = a₁ × n = ${a1} × n` : `S_n = a₁ × (1 - r^n) / (1 - r) = ${a1} × (1 - ${r}^n) / (1 - ${r})`;

    setResult({
      firstTerm: a1,
      commonRatio: r,
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
          `
        }} />
      )}
      <Card className="max-w-4xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Geometric Sequence Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the nth term and sum of a geometric sequence with step-by-step solutions:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Sequence Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="First term (a₁)"
                type="number"
                value={firstTerm}
                onChange={(e) => setFirstTerm(e.target.value)}
                placeholder="Enter first term"
                autoFocus
                step="any"
              />
              <Input
                label="Common ratio (r)"
                type="number"
                value={commonRatio}
                onChange={(e) => setCommonRatio(e.target.value)}
                placeholder="Enter common ratio"
                step="any"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Term number (n)"
                type="number"
                value={termNumber}
                onChange={(e) => setTermNumber(e.target.value)}
                placeholder="Enter term number"
                min="1"
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calculate:</label>
                <select
                  value={calculationType}
                  onChange={(e) => setCalculationType(e.target.value as 'nth_term' | 'sum' | 'both')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="both">Both nth term and sum</option>
                  <option value="nth_term">Nth term only</option>
                  <option value="sum">Sum only</option>
                </select>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> A geometric sequence has the form: a₁, a₁×r, a₁×r², a₁×r³, ... where r is the common ratio.
            </p>
          </div>

          <Button 
            onClick={calculateGeometricSequence}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Geometric Sequence
          </Button>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                Geometric Sequence Results
              </h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {calculationType === 'nth_term' || calculationType === 'both' ? (
                    <div className="bg-white p-4 rounded border text-center">
                      <p className="font-semibold text-gray-700 mb-1">Nth Term</p>
                      <p className="font-mono text-xl font-bold text-blue-600">{result.nthTerm.toFixed(6)}</p>
                    </div>
                  ) : null}
                  
                  {calculationType === 'sum' || calculationType === 'both' ? (
                    <div className="bg-white p-4 rounded border text-center">
                      <p className="font-semibold text-gray-700 mb-1">Sum of First {result.termNumber} Terms</p>
                      <p className="font-mono text-xl font-bold text-green-600">{result.sum.toFixed(6)}</p>
                    </div>
                  ) : null}
                  
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Common Ratio</p>
                    <p className="font-mono text-xl font-bold text-purple-600">{result.commonRatio}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Sequence (first {result.sequence.length} terms):</p>
                  <p className="font-mono text-sm">
                    {result.sequence.map((term, index) => (
                      <span key={index}>
                        {term.toFixed(6)}
                        {index < result.sequence.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    {result.termNumber > 10 && '...'}
                  </p>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Formulas Used:</p>
                  <div className="font-mono text-sm space-y-1">
                    {result.formula.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
                  <p className="text-gray-800">{result.explanation}</p>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-3">Step-by-Step Calculation:</p>
                  <div className="space-y-2">
                    {result.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-mono">
                          {index + 1}
                        </span>
                        <p className="font-mono text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-2">Key Properties:</p>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>• First term: {result.firstTerm}</p>
                    <p>• Common ratio: {result.commonRatio}</p>
                    <p>• Sequence type: {result.commonRatio > 1 ? 'Increasing' : result.commonRatio > 0 && result.commonRatio < 1 ? 'Decreasing' : 'Alternating'}</p>
                    <p>• Convergence: {Math.abs(result.commonRatio) < 1 ? 'Converges to 0' : 'Diverges'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
