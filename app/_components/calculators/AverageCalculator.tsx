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
  primaryColor = '#3399CC'
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
    let weightArray: number[] = [];

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
          `
        }} />
      )}
      <Card className="max-w-4xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Average Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate different types of averages: arithmetic, geometric, harmonic, and weighted averages:</p>
          </>
        )}

        <div className="space-y-6">
          {/* Calculation Type Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Average Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { value: 'arithmetic', label: 'Arithmetic Mean (Simple Average)' },
                { value: 'geometric', label: 'Geometric Mean' },
                { value: 'harmonic', label: 'Harmonic Mean' },
                { value: 'weighted', label: 'Weighted Average' }
              ].map((type) => (
                <Button
                  key={type.value}
                  onClick={() => setCalculationType(type.value as 'arithmetic' | 'geometric' | 'harmonic' | 'weighted')}
                  variant={calculationType === type.value ? "primary" : "outline"}
                  size="sm"
                  className={`text-sm ${calculationType === type.value ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
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

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button
              onClick={calculateAverage}
              className="custom-color-button"
              style={colors.customStyles?.button}
            >
              Calculate Average
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Result */}
              <div
                className="p-6 rounded-lg border-2"
                style={colors.customStyles?.resultBg}
              >
                <h3 className="text-xl font-bold mb-4" style={colors.customStyles?.result}>
                  {getCalculationTypeLabel(result.type)} Result
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Count</p>
                    <p className="text-lg font-semibold">{result.count}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Sum</p>
                    <p className="text-lg font-semibold">{result.sum.toFixed(6)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Average</p>
                    <p className="text-lg font-semibold">{result.average.toFixed(6)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="text-lg font-semibold">{getCalculationTypeLabel(result.type)}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-mono text-sm">{result.calculation}</p>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Explanation</h4>
                <p className="text-blue-800">{result.explanation}</p>
              </div>

              {/* Step-by-Step Solution */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Step-by-Step Solution</h4>
                <ol className="space-y-2">
                  {result.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Numbers Display */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Input Numbers</h4>
                <div className="flex flex-wrap gap-2">
                  {result.numbers.map((num, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {num}
                    </span>
                  ))}
                </div>
                {result.weights && (
                  <div className="mt-3">
                    <h5 className="text-md font-semibold text-gray-700 mb-2">Weights</h5>
                    <div className="flex flex-wrap gap-2">
                      {result.weights.map((weight, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          {weight}
                        </span>
                      ))}
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
