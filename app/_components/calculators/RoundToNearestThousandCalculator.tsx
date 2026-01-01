'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface RoundToNearestThousandCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function RoundToNearestThousandCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: RoundToNearestThousandCalculatorProps) {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [calculation, setCalculation] = useState('');
  const [roundingType, setRoundingType] = useState<'nearest' | 'up' | 'down'>('nearest');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return '0';
    }
    // Format large numbers with commas
    return value.toLocaleString('en-US', { 
      maximumFractionDigits: 0,
      useGrouping: true
    });
  };

  const roundToNearestThousand = (number: number) => {
    return Math.round(number / 1000) * 1000;
  };

  const roundUpToThousand = (number: number) => {
    return Math.ceil(number / 1000) * 1000;
  };

  const roundDownToThousand = (number: number) => {
    return Math.floor(number / 1000) * 1000;
  };

  const calculate = () => {
    if (!input.trim()) {
      setResult(null);
      setCalculation('');
      return;
    }

    const num = parseFloat(input);
    
    if (isNaN(num)) {
      setResult('Error: Invalid number format');
      setCalculation('');
      return;
    }

    let roundedValue: number;
    let roundingMethod: string;

    switch (roundingType) {
      case 'nearest':
        roundedValue = roundToNearestThousand(num);
        roundingMethod = 'Round to nearest thousand';
        break;
      case 'up':
        roundedValue = roundUpToThousand(num);
        roundingMethod = 'Round up to thousand';
        break;
      case 'down':
        roundedValue = roundDownToThousand(num);
        roundingMethod = 'Round down to thousand';
        break;
      default:
        roundedValue = roundToNearestThousand(num);
        roundingMethod = 'Round to nearest thousand';
    }

    setResult(formatValue(roundedValue));
    setCalculation(`${roundingMethod}: ${formatValue(num)} → ${formatValue(roundedValue)}`);
  };

  const clearAll = () => {
    setInput('');
    setResult(null);
    setCalculation('');
  };

  const getRoundingDescription = () => {
    switch (roundingType) {
      case 'nearest':
        return 'Round to the nearest thousand using standard rounding rules (500 rounds up)';
      case 'up':
        return 'Always round up to the next thousand (ceiling function)';
      case 'down':
        return 'Always round down to the previous thousand (floor function)';
      default:
        return 'Round to the nearest thousand using standard rounding rules';
    }
  };

  const getRoundingExamples = () => {
    switch (roundingType) {
      case 'nearest':
        return [
          { input: '1,234', output: '1,000' },
          { input: '1,567', output: '2,000' },
          { input: '1,500', output: '2,000' },
          { input: '1,499', output: '1,000' }
        ];
      case 'up':
        return [
          { input: '1,234', output: '2,000' },
          { input: '1,567', output: '2,000' },
          { input: '1,001', output: '2,000' },
          { input: '1,000', output: '1,000' }
        ];
      case 'down':
        return [
          { input: '1,234', output: '1,000' },
          { input: '1,567', output: '1,000' },
          { input: '1,999', output: '1,000' },
          { input: '2,000', output: '2,000' }
        ];
      default:
        return [];
    }
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
  const examples = getRoundingExamples();

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
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Round to Nearest Thousand Calculator</h2>
            <p className="text-gray-600">Round numbers to the nearest thousand with different rounding methods</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Rounding Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rounding Method
            </label>
            <select
              value={roundingType}
              onChange={(e) => setRoundingType(e.target.value as 'nearest' | 'up' | 'down')}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="nearest">Round to Nearest Thousand</option>
              <option value="up">Round Up to Thousand</option>
              <option value="down">Round Down to Thousand</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">{getRoundingDescription()}</p>
          </div>

          {/* Input Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number to Round
            </label>
            <Input
              type="text"
              placeholder="Enter number (e.g., 1234)"
              value={input}
              onChange={(e) => {
                const value = e.target.value;
                // Allow numbers, negative sign, decimal point, and commas
                if (value === '' || /^-?\d*[,.]?\d*$/.test(value.replace(/,/g, ''))) {
                  setInput(value);
                }
              }}
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculate}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Round
            </Button>
            <Button onClick={clearAll} variant="outline" className="flex-1">
              Clear
            </Button>
          </div>

          {result && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-lg animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-2`}
                style={colors.customStyles?.resultText}
              >
                Rounded Number
              </h3>
              <p 
                className="text-2xl font-bold"
                style={colors.customStyles?.result}
              >
                {result}
              </p>
              {calculation && (
                <p className="text-sm mt-2 font-mono text-gray-600">
                  {calculation}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Round to Nearest:</strong> Standard rounding (500 rounds up to next thousand)</li>
              <li>• <strong>Round Up:</strong> Always round up to the next thousand</li>
              <li>• <strong>Round Down:</strong> Always round down to the previous thousand</li>
              <li>• Enter any number to see the rounded result</li>
            </ul>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Examples ({roundingType === 'nearest' ? 'Nearest' : roundingType === 'up' ? 'Up' : 'Down'})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
              {examples.map((example, index) => (
                <div key={index}>
                  <strong>{example.input}</strong> → {example.output}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Common Use Cases</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>Population:</strong> Round population counts to nearest thousand</li>
              <li>• <strong>Sales/Revenue:</strong> Round large financial figures for reporting</li>
              <li>• <strong>Statistics:</strong> Simplify large numbers for presentations</li>
              <li>• <strong>Estimates:</strong> Round estimates and approximations</li>
              <li>• <strong>Budgeting:</strong> Round budget figures to nearest thousand</li>
            </ul>
          </div>
        </div>
      </Card>
    </>
  );
}

