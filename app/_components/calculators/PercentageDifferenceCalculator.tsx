'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PercentageDifferenceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PercentageDifferenceCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: PercentageDifferenceCalculatorProps) {
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [percentageDifference, setPercentageDifference] = useState<number | null>(null);
  const [absoluteDifference, setAbsoluteDifference] = useState<number | null>(null);
  const [average, setAverage] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);

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
    return value.toFixed(6);
  };

  const calculatePercentageDifference = () => {
    setError('');
    setPercentageDifference(null);
    setAbsoluteDifference(null);
    setAverage(null);
    setSteps([]);

    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    // Validation
    if (isNaN(v1) || isNaN(v2)) {
      setError('Please enter valid numbers for both values');
      return;
    }

    // Calculate average of the two values
    const avg = (v1 + v2) / 2;

    // Check if average is zero (which would cause division by zero)
    if (avg === 0) {
      setError('Cannot calculate percentage difference when the average of the two values is zero');
      return;
    }

    // Calculate absolute difference
    const absDiff = Math.abs(v1 - v2);
    
    // Calculate percentage difference: |Value1 - Value2| / ((Value1 + Value2) / 2) × 100%
    const percentDiff = (absDiff / avg) * 100;

    setPercentageDifference(percentDiff);
    setAbsoluteDifference(absDiff);
    setAverage(avg);

    // Generate step-by-step calculation
    const stepList: string[] = [];
    stepList.push('Percentage Difference Formula:');
    stepList.push('Percentage Difference = |Value1 - Value2| / Average × 100%');
    stepList.push('where Average = (Value1 + Value2) / 2');
    stepList.push('');
    stepList.push('Given values:');
    stepList.push(`Value 1 = ${v1}`);
    stepList.push(`Value 2 = ${v2}`);
    stepList.push('');
    stepList.push('Step 1: Calculate the absolute difference');
    stepList.push(`Absolute Difference = |Value1 - Value2| = |${v1} - ${v2}| = |${v1 - v2}| = ${absDiff}`);
    stepList.push('');
    stepList.push('Step 2: Calculate the average of the two values');
    stepList.push(`Average = (Value1 + Value2) / 2 = (${v1} + ${v2}) / 2 = ${v1 + v2} / 2 = ${avg}`);
    stepList.push('');
    stepList.push('Step 3: Divide absolute difference by average');
    stepList.push(`Absolute Difference / Average = ${absDiff} / ${avg} = ${(absDiff / avg).toFixed(6)}`);
    stepList.push('');
    stepList.push('Step 4: Multiply by 100 to get percentage');
    stepList.push(`Percentage Difference = ${(absDiff / avg).toFixed(6)} × 100 = ${percentDiff.toFixed(6)}%`);

    setSteps(stepList);
  };

  const clearAll = () => {
    setValue1('');
    setValue2('');
    setPercentageDifference(null);
    setAbsoluteDifference(null);
    setAverage(null);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Percentage Difference Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the percentage difference between two values when neither is necessarily the true value:</p>
          </>
        )}
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Percentage Difference Formula</h3>
          <p className="text-sm text-gray-600 font-mono text-center">
            Percentage Difference = |Value1 - Value2| / Average × 100%
          </p>
          <p className="text-xs text-gray-600 mt-2 text-center">
            where Average = (Value1 + Value2) / 2
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Value 1"
            type="text"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            placeholder="Enter first value"
            autoFocus
          />

          <Input
            label="Value 2"
            type="text"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            placeholder="Enter second value"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={calculatePercentageDifference}
            className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Percentage Difference
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

        {percentageDifference !== null && !error && (
          <div 
            className={`p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-3`}
              style={colors.customStyles?.resultText}
            >
              Results
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Percentage Difference:</span>{' '}
                <span 
                  className={`text-2xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {formatValue(percentageDifference)}%
                </span>
              </p>
              {absoluteDifference !== null && (
                <p className="text-gray-700">
                  <span className="font-medium">Absolute Difference:</span>{' '}
                  <span className="text-xl font-semibold text-gray-800">
                    {formatValue(absoluteDifference)}
                  </span>
                </p>
              )}
              {average !== null && (
                <p className="text-gray-700">
                  <span className="font-medium">Average:</span>{' '}
                  <span className="text-xl font-semibold text-gray-800">
                    {formatValue(average)}
                  </span>
                </p>
              )}
              <p className="text-sm text-gray-600 mt-2">
                The percentage difference between {value1} and {value2} is {formatValue(percentageDifference)}%.
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

