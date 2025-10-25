'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface AverageCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface AverageResult {
  numbers: number[];
  average: number;
  count: number;
  sum: number;
  calculation: string;
  explanation: string;
  steps: string[];
  type: 'arithmetic' | 'geometric' | 'harmonic' | 'weighted';
  weights?: number[];
}

export default function AverageCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: AverageCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'arithmetic' | 'geometric' | 'harmonic' | 'weighted'>('arithmetic');
  const [numbers, setNumbers] = useState<string>('');
  const [weights, setWeights] = useState<string>('');
  const [result, setResult] = useState<AverageResult | null>(null);

  const calculateAverage = () => {
    const numberArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numberArray.length === 0) {
      alert('Please enter at least one valid number.');
      setResult(null);
      return;
    }

    if (numberArray.some(n => n < 0)) {
      alert('Please enter only positive numbers for geometric and harmonic averages.');
      setResult(null);
      return;
    }

    let average = 0;
    let calculation = '';
    let explanation = '';
    let steps: string[] = [];
    const weightArray: number[] = [];

    const sum = numberArray.reduce((acc, num) => acc + num, 0);
    const count = numberArray.length;

    switch (calculationType) {
      case 'arithmetic':
        average = sum / count;
        calculation = `Arithmetic Average = (${numberArray.join(' + ')} / ${count} = ${sum} / ${count} = ${average.toFixed(6)}`;
        explanation = `The arithmetic mean is the sum of all numbers divided by the count of numbers.`;
        steps = [
          `Step 1: Add all numbers together.`,
          `Sum = ${numberArray.join(' + ')} = ${sum}`,
          `Step 2: Divide by the number of values.`,
          `Average = ${sum} ÷ ${count} = ${average.toFixed(6)}`
        ];
        break;

      case 'geometric':
        if (numberArray.some(n => n <= 0)) {
          alert('Geometric mean requires all positive numbers.');
          setResult(null);
          return;
        }
        const product = numberArray.reduce((acc, num) => acc * num, 1);
        average = Math.pow(product, 1 / count);
        calculation = `Geometric Average = (${numberArray.join(' × ')}^(1/${count}) = ${product}^(1/${count}) = ${average.toFixed(6)}`;
        explanation = `The geometric mean is the nth root of the product of n numbers.`;
        steps = [
          `Step 1: Multiply all numbers together.`,
          `Product = ${numberArray.join(' × ')} = ${product}`,
          `Step 2: Take the nth root (where n = ${count}).`,
          `Average = ${product}^(1/${count}) = ${average.toFixed(6)}`
        ];
        break;

      case 'harmonic':
        if (numberArray.some(n => n <= 0)) {
          alert('Harmonic mean requires all positive numbers.');
          setResult(null);
          return;
        }
        const reciprocalSum = numberArray.reduce((acc, num) => acc + (1 / num), 0);
        average = count / reciprocalSum;
        calculation = `Harmonic Average = ${count} / (${numberArray.map(n => `1/${n}`).join(' + ')}) = ${count} / ${reciprocalSum.toFixed(6)} = ${average.toFixed(6)}`;
        explanation = `The harmonic mean is the reciprocal of the arithmetic mean of reciprocals.`;
        steps = [
          `Step 1: Find the sum of reciprocals.`,
          `Sum of reciprocals = ${numberArray.map(n => `1/${n}`).join(' + ')} = ${reciprocalSum.toFixed(6)}`,
          `Step 2: Divide the count by the sum of reciprocals.`,
          `Average = ${count} ÷ ${reciprocalSum.toFixed(6)} = ${average.toFixed(6)}`
        ];
        break;

      case 'weighted':
        const weightArray = weights.split(',').map(w => parseFloat(w.trim())).filter(w => !isNaN(w));
        
        if (weightArray.length !== numberArray.length) {
          alert('Number of weights must match the number of values.');
          setResult(null);
          return;
        }

        if (weightArray.some(w => w < 0)) {
          alert('Weights must be non-negative.');
          setResult(null);
          return;
        }

        const weightedSum = numberArray.reduce((acc, num, index) => acc + (num * weightArray[index]), 0);
        const totalWeight = weightArray.reduce((acc, weight) => acc + weight, 0);
        average = weightedSum / totalWeight;
        
        const weightedTerms = numberArray.map((num, index) => `${num} × ${weightArray[index]}`).join(' + ');
        calculation = `Weighted Average = (${weightedTerms}) / ${totalWeight} = ${weightedSum} / ${totalWeight} = ${average.toFixed(6)}`;
        explanation = `The weighted mean is the sum of each value multiplied by its weight, divided by the sum of weights.`;
        steps = [
          `Step 1: Multiply each value by its weight.`,
          `Weighted terms: ${weightedTerms}`,
          `Step 2: Sum the weighted values.`,
          `Weighted sum = ${weightedSum}`,
          `Step 3: Sum the weights.`,
          `Total weight = ${totalWeight}`,
          `Step 4: Divide weighted sum by total weight.`,
          `Average = ${weightedSum} ÷ ${totalWeight} = ${average.toFixed(6)}`
        ];
        break;
    }

    setResult({
      numbers: numberArray,
      average,
      count,
      sum,
      calculation,
      explanation,
      steps,
      type: calculationType,
      weights: calculationType === 'weighted' ? weightArray : undefined
    });
  };

  const getCalculationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'arithmetic': 'Arithmetic Mean (Simple Average)',
      'geometric': 'Geometric Mean',
      'harmonic': 'Harmonic Mean',
      'weighted': 'Weighted Average'
    };
    return labels[type] || type;
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Average Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate different types of averages: arithmetic, geometric, harmonic, and weighted averages:</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          {/* Calculator Form - Left Side */}
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            {/* Calculation Type Selection */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Average Type</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'arithmetic', label: 'Arithmetic Mean' },
                  { value: 'geometric', label: 'Geometric Mean' },
                  { value: 'harmonic', label: 'Harmonic Mean' },
                  { value: 'weighted', label: 'Weighted Average' }
                ].map((type) => (
                  <Button
                    key={type.value}
                    onClick={() => setCalculationType(type.value as 'arithmetic' | 'geometric' | 'harmonic' | 'weighted')}
                    variant={calculationType === type.value ? "primary" : "outline"}
                    size="sm"
                    className={`text-sm ${calculationType === type.value ? 'bg-[#820ECC] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Numbers</h3>
              <div className="space-y-4">
                <Input
                  label="Numbers (comma-separated)"
                  type="text"
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  placeholder="e.g., 10, 20, 30, 40"
                  autoFocus
                />
                {calculationType === 'weighted' && (
                  <Input
                    label="Weights (comma-separated)"
                    type="text"
                    value={weights}
                    onChange={(e) => setWeights(e.target.value)}
                    placeholder="e.g., 1, 2, 3, 4"
                  />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {calculationType === 'arithmetic' && 'Enter numbers separated by commas (e.g., 10, 20, 30)'}
                {calculationType === 'geometric' && 'Enter positive numbers separated by commas (e.g., 2, 8, 32)'}
                {calculationType === 'harmonic' && 'Enter positive numbers separated by commas (e.g., 2, 3, 6)'}
                {calculationType === 'weighted' && 'Enter numbers and their corresponding weights separated by commas'}
              </p>
            </div>

            <Button
              onClick={calculateAverage}
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
                Average Results
              </h3>
              
              {result ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Average:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.average.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Count:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.count}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Sum:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.sum.toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700 text-lg">Type:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{getCalculationTypeLabel(result.type)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter numbers to calculate the average</p>
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
