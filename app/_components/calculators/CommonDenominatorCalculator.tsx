'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface CommonDenominatorCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface CommonDenominatorResult {
  lcm: number;
  denominators: number[];
  explanation: string;
  steps: string[];
  equivalentFractions?: { numerator: number; denominator: number; originalDenominator: number; multiplier: number }[];
}

export default function CommonDenominatorCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: CommonDenominatorCalculatorProps) {
  const [denominators, setDenominators] = useState<string>('');
  const [result, setResult] = useState<CommonDenominatorResult | null>(null);
  const [showFractions, setShowFractions] = useState<boolean>(false);
  const [numerators, setNumerators] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  // Calculate GCF using Euclidean algorithm
  const calculateGCF = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Calculate LCM using GCF
  const calculateLCM = (a: number, b: number): number => {
    return (Math.abs(a) * Math.abs(b)) / calculateGCF(a, b);
  };

  // Calculate LCM for multiple numbers
  const calculateMultipleLCM = (nums: number[]): number => {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return Math.abs(nums[0]);
    
    let lcm = Math.abs(nums[0]);
    for (let i = 1; i < nums.length; i++) {
      lcm = calculateLCM(lcm, Math.abs(nums[i]));
    }
    return lcm;
  };

  const calculateCommonDenominator = () => {
    // Parse input denominators
    const inputDenominators = denominators
      .split(/[,\s]+/)
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n !== 0);

    // Validation
    if (inputDenominators.length === 0) {
      alert('Please enter at least one valid denominator');
      return;
    }

    if (inputDenominators.length > 10) {
      alert('Please enter no more than 10 denominators');
      return;
    }

    if (inputDenominators.some(n => n < 0)) {
      alert('Please enter only positive denominators');
      return;
    }

    // Calculate LCM (common denominator)
    const lcm = calculateMultipleLCM(inputDenominators);

    // Generate explanation
    let explanation = `The least common denominator (LCD) of ${inputDenominators.join(', ')} is ${lcm}. This is the smallest number that all denominators divide into evenly.`;

    // Generate step-by-step calculation
    const steps: string[] = [];
    
    if (inputDenominators.length === 2) {
      steps.push(`Step 1: Find the LCM of ${inputDenominators[0]} and ${inputDenominators[1]}`);
      const gcf = calculateGCF(inputDenominators[0], inputDenominators[1]);
      steps.push(`Step 2: Calculate GCF(${inputDenominators[0]}, ${inputDenominators[1]}) = ${gcf}`);
      steps.push(`Step 3: LCM = (${inputDenominators[0]} × ${inputDenominators[1]}) ÷ ${gcf} = ${lcm}`);
    } else {
      steps.push(`Step 1: Find LCM of first two denominators: ${inputDenominators[0]} and ${inputDenominators[1]}`);
      let currentLCM = calculateLCM(inputDenominators[0], inputDenominators[1]);
      steps.push(`Step 2: LCM(${inputDenominators[0]}, ${inputDenominators[1]}) = ${currentLCM}`);
      
      for (let i = 2; i < inputDenominators.length; i++) {
        const prevLCM = currentLCM;
        currentLCM = calculateLCM(currentLCM, inputDenominators[i]);
        steps.push(`Step ${i + 1}: LCM(${prevLCM}, ${inputDenominators[i]}) = ${currentLCM}`);
      }
    }

    // Calculate equivalent fractions if numerators are provided
    let equivalentFractions: { numerator: number; denominator: number; originalDenominator: number; multiplier: number }[] | undefined;
    
    if (showFractions && numerators) {
      const inputNumerators = numerators
        .split(/[,\s]+/)
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n));

      if (inputNumerators.length === inputDenominators.length) {
        equivalentFractions = inputDenominators.map((den, index) => {
          const num = inputNumerators[index] || 0;
          const multiplier = lcm / den;
          return {
            numerator: num * multiplier,
            denominator: lcm,
            originalDenominator: den,
            multiplier: multiplier
          };
        });
      }
    }

    setResult({
      lcm,
      denominators: inputDenominators,
      explanation,
      steps,
      equivalentFractions
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Denominator Calculator</h2>
            <p className="text-gray-600 mb-6">Find the least common denominator (LCD) for two or more fractions. Convert fractions to equivalent fractions with the same denominator.</p>
          </>
        )}

        <div className="space-y-4">
          <div>
            <Input
              label="Denominators (comma or space separated)"
              type="text"
              value={denominators}
              onChange={(e) => setDenominators(e.target.value)}
              placeholder="e.g., 3, 4, 5 or 6 8 12"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showFractions"
              checked={showFractions}
              onChange={(e) => setShowFractions(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="showFractions" className="text-sm text-gray-700">
              Calculate equivalent fractions (provide numerators)
            </label>
          </div>

          {showFractions && (
            <div>
              <Input
                label="Numerators (same order as denominators)"
                type="text"
                value={numerators}
                onChange={(e) => setNumerators(e.target.value)}
                placeholder="e.g., 1, 2, 3"
              />
            </div>
          )}

          <Button 
            onClick={calculateCommonDenominator}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Find Common Denominator
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
                Common Denominator: {result.lcm}
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
                  <p className="text-gray-600">{result.explanation}</p>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Calculation Steps:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {result.steps.map((step, index) => (
                      <li key={index} className="text-gray-700">{step}</li>
                    ))}
                  </ul>
                </div>

                {result.equivalentFractions && result.equivalentFractions.length > 0 && (
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-2">Equivalent Fractions:</p>
                    <div className="space-y-2">
                      {result.equivalentFractions.map((frac, index) => {
                        const originalNum = numerators.split(/[,\s]+/).map(n => parseInt(n.trim())).filter(n => !isNaN(n))[index] || 0;
                        return (
                          <div key={index} className="flex items-center gap-2">
                            <span className="font-mono text-sm">
                              {originalNum}/{result.denominators[index]} = {frac.numerator}/{frac.denominator}
                            </span>
                            <span className="text-xs text-gray-500">
                              (× {frac.multiplier})
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

