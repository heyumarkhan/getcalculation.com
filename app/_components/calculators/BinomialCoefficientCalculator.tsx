'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface BinomialCoefficientCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface BinomialResult {
  coefficient: number;
  formula: string;
  explanation: string;
  factorialN: number;
  factorialK: number;
  factorialNK: number;
  steps: string[];
}

export default function BinomialCoefficientCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: BinomialCoefficientCalculatorProps) {
  const [n, setN] = useState<string>('');
  const [k, setK] = useState<string>('');
  const [result, setResult] = useState<BinomialResult | null>(null);

  // Function to calculate factorial
  const factorial = (num: number): number => {
    if (num < 0) return 0;
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  };

  // Function to calculate binomial coefficient
  const calculateBinomialCoefficient = () => {
    const nVal = parseInt(n);
    const kVal = parseInt(k);

    // Validation
    if (isNaN(nVal) || isNaN(kVal)) {
      alert('Please enter valid numbers for n and k');
      return;
    }

    if (nVal < 0 || kVal < 0) {
      alert('Both n and k must be non-negative integers');
      return;
    }

    if (kVal > nVal) {
      alert('k cannot be greater than n');
      return;
    }

    // Calculate factorials
    const factorialN = factorial(nVal);
    const factorialK = factorial(kVal);
    const factorialNK = factorial(nVal - kVal);

    // Calculate binomial coefficient: C(n,k) = n! / (k! * (n-k)!)
    const coefficient = factorialN / (factorialK * factorialNK);

    // Generate formula representation
    const formula = `C(${nVal}, ${kVal}) = ${nVal}! / (${kVal}! × ${nVal - kVal}!) = ${coefficient}`;

    // Generate explanation
    let explanation: string;
    if (kVal === 0 || kVal === nVal) {
      explanation = 'There is exactly 1 way to choose 0 items or all items from a set';
    } else if (kVal === 1) {
      explanation = `There are ${nVal} ways to choose 1 item from ${nVal} items`;
    } else if (kVal === nVal - 1) {
      explanation = `There are ${nVal} ways to choose ${nVal - 1} items from ${nVal} items (same as choosing 1 item to exclude)`;
    } else {
      explanation = `There are ${coefficient} ways to choose ${kVal} items from ${nVal} items`;
    }

    // Generate step-by-step calculation
    const steps: string[] = [
      `Step 1: Calculate ${nVal}! = ${factorialN}`,
      `Step 2: Calculate ${kVal}! = ${factorialK}`,
      `Step 3: Calculate (${nVal} - ${kVal})! = ${nVal - kVal}! = ${factorialNK}`,
      `Step 4: Apply formula C(${nVal}, ${kVal}) = ${nVal}! / (${kVal}! × ${nVal - kVal}!)`,
      `Step 5: C(${nVal}, ${kVal}) = ${factorialN} / (${factorialK} × ${factorialNK}) = ${coefficient}`
    ];

    setResult({
      coefficient,
      formula,
      explanation,
      factorialN,
      factorialK,
      factorialNK,
      steps
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
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Binomial Coefficient Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate C(n,k) = n! / (k! × (n-k)!) for combinations and permutations:</p>
          </>
        )}
      
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          {/* Calculator Form - Left Side */}
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            {/* Input Fields */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Values</h3>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="n (total items)"
                  type="text"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                  placeholder="Enter n"
                  autoFocus
                />
                <Input
                  label="k (items to choose)"
                  type="text"
                  value={k}
                  onChange={(e) => setK(e.target.value)}
                  placeholder="Enter k"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Note:</strong> Both n and k must be non-negative integers, and k ≤ n
              </p>
            </div>

            <Button 
              onClick={calculateBinomialCoefficient}
              className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate
            </Button>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

          {/* Results Section - Right Side */}
          <div>
            <div 
              className={`p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md min-h-[400px] transition-all duration-300`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                Binomial Coefficient Result
              </h3>
              
              {result !== null ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Coefficient:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.coefficient}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">n!:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.factorialN}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">k!:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.factorialK}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700 text-lg">(n-k)!:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.factorialNK}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">🔢</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter n and k values to calculate binomial coefficient</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
