'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface LagrangeErrorBoundCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function LagrangeErrorBoundCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: LagrangeErrorBoundCalculatorProps) {
  const [M, setM] = useState<string>('');
  const [x, setX] = useState<string>('');
  const [a, setA] = useState<string>('');
  const [n, setN] = useState<string>('');
  const [errorBound, setErrorBound] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);

  // Calculate factorial
  const factorial = (num: number): number => {
    if (num < 0) return NaN;
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return value > 0 ? '∞' : '-∞';
    }
    if (isNaN(value)) {
      return 'NaN';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(6);
    }
    return value.toFixed(8);
  };

  const calculateErrorBound = () => {
    setError('');
    setErrorBound(null);
    setSteps([]);

    const MVal = parseFloat(M);
    const xVal = parseFloat(x);
    const aVal = parseFloat(a);
    const nVal = parseFloat(n);

    // Validation
    if (isNaN(MVal) || isNaN(xVal) || isNaN(aVal) || isNaN(nVal)) {
      setError('Please enter valid numbers for all fields');
      return;
    }

    if (nVal < 0 || !Number.isInteger(nVal)) {
      setError('n must be a non-negative integer');
      return;
    }

    if (MVal < 0) {
      setError('M (maximum value) must be non-negative');
      return;
    }

    // Calculate |x - a|
    const absDiff = Math.abs(xVal - aVal);
    
    // Calculate (n+1)!
    const nPlus1Factorial = factorial(nVal + 1);
    
    if (isNaN(nPlus1Factorial) || !isFinite(nPlus1Factorial)) {
      setError('n is too large. Please use a smaller value for n (n ≤ 170)');
      return;
    }

    // Calculate error bound: |R_n(x)| ≤ M * |x - a|^(n+1) / (n+1)!
    const absDiffPower = Math.pow(absDiff, nVal + 1);
    const errorBoundValue = (MVal * absDiffPower) / nPlus1Factorial;

    setErrorBound(errorBoundValue);

    // Generate step-by-step calculation
    const stepList: string[] = [];
    stepList.push('Lagrange Error Bound Formula:');
    stepList.push(`|R_n(x)| ≤ M × |x - a|^(n+1) / (n+1)!`);
    stepList.push('');
    stepList.push('Given values:');
    stepList.push(`M = ${MVal} (maximum value of |f^(${nVal + 1})(z)|)`);
    stepList.push(`x = ${xVal} (point of evaluation)`);
    stepList.push(`a = ${aVal} (center of Taylor series)`);
    stepList.push(`n = ${nVal} (degree of polynomial)`);
    stepList.push('');
    stepList.push('Step 1: Calculate |x - a|');
    stepList.push(`|x - a| = |${xVal} - ${aVal}| = |${xVal - aVal}| = ${absDiff}`);
    stepList.push('');
    stepList.push(`Step 2: Calculate |x - a|^(n+1)`);
    stepList.push(`|x - a|^(n+1) = ${absDiff}^(${nVal + 1}) = ${absDiffPower}`);
    stepList.push('');
    stepList.push(`Step 3: Calculate (n+1)!`);
    stepList.push(`(n+1)! = (${nVal} + 1)! = ${nVal + 1}! = ${nPlus1Factorial}`);
    stepList.push('');
    stepList.push('Step 4: Calculate error bound');
    stepList.push(`|R_n(x)| ≤ M × |x - a|^(n+1) / (n+1)!`);
    stepList.push(`|R_n(x)| ≤ ${MVal} × ${absDiffPower} / ${nPlus1Factorial}`);
    stepList.push(`|R_n(x)| ≤ ${formatValue(errorBoundValue)}`);

    setSteps(stepList);
  };

  const clearAll = () => {
    setM('');
    setX('');
    setA('');
    setN('');
    setErrorBound(null);
    setError('');
    setSteps([]);
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
      <Card className="max-w-2xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lagrange Error Bound Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the error bound for Taylor polynomial approximations using Lagrange&apos;s remainder formula:</p>
          </>
        )}
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Lagrange Error Bound Formula</h3>
          <p className="text-sm text-gray-600 font-mono text-center">
            |R_n(x)| ≤ M × |x - a|^(n+1) / (n+1)!
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Where M is the maximum value of |f^((n+1))(z)| on the interval between a and x
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="M (Maximum value of |f^((n+1))(z)|)"
            type="text"
            value={M}
            onChange={(e) => setM(e.target.value)}
            placeholder="Enter M"
            autoFocus
          />

          <Input
            label="x (Point of evaluation)"
            type="text"
            value={x}
            onChange={(e) => setX(e.target.value)}
            placeholder="Enter x"
          />

          <Input
            label="a (Center of Taylor series)"
            type="text"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Enter a"
          />

          <Input
            label="n (Degree of polynomial)"
            type="text"
            value={n}
            onChange={(e) => setN(e.target.value)}
            placeholder="Enter n (non-negative integer)"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={calculateErrorBound}
            className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Error Bound
          </Button>
          <Button 
            onClick={clearAll}
            variant="outline"
            className="flex-1"
          >
            Clear All
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {errorBound !== null && !error && (
          <div 
            className={`p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-3`}
              style={colors.customStyles?.resultText}
            >
              Error Bound Result
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">|R_n(x)| ≤</span>{' '}
                <span 
                  className={`text-2xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {formatValue(errorBound)}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                This means the error in the Taylor polynomial approximation is at most {formatValue(errorBound)}.
              </p>
            </div>
          </div>
        )}

        {steps.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Calculation</h3>
            <div className="text-sm text-gray-700 font-mono whitespace-pre-line max-h-96 overflow-y-auto bg-white p-4 rounded border">
              {steps.join('\n')}
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}

