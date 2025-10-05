'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function RoundToNearestCentCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [calculation, setCalculation] = useState('');
  const [roundingType, setRoundingType] = useState<'nearest' | 'up' | 'down'>('nearest');

  const roundToNearestCent = (number: number) => {
    return Math.round(number * 100) / 100;
  };

  const roundUpToCent = (number: number) => {
    return Math.ceil(number * 100) / 100;
  };

  const roundDownToCent = (number: number) => {
    return Math.floor(number * 100) / 100;
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
        roundedValue = roundToNearestCent(num);
        roundingMethod = 'Round to nearest cent';
        break;
      case 'up':
        roundedValue = roundUpToCent(num);
        roundingMethod = 'Round up to cent';
        break;
      case 'down':
        roundedValue = roundDownToCent(num);
        roundingMethod = 'Round down to cent';
        break;
      default:
        roundedValue = roundToNearestCent(num);
        roundingMethod = 'Round to nearest cent';
    }

    setResult(roundedValue.toFixed(2));
    setCalculation(`${roundingMethod}: ${num} → $${roundedValue.toFixed(2)}`);
  };

  const clearAll = () => {
    setInput('');
    setResult(null);
    setCalculation('');
  };

  const getRoundingDescription = () => {
    switch (roundingType) {
      case 'nearest':
        return 'Round to the nearest cent using standard rounding rules (0.5 rounds up)';
      case 'up':
        return 'Always round up to the next cent (ceiling function)';
      case 'down':
        return 'Always round down to the previous cent (floor function)';
      default:
        return 'Round to the nearest cent using standard rounding rules';
    }
  };

  const getRoundingExamples = () => {
    switch (roundingType) {
      case 'nearest':
        return [
          { input: '1.234', output: '$1.23' },
          { input: '1.235', output: '$1.24' },
          { input: '1.236', output: '$1.24' },
          { input: '1.231', output: '$1.23' }
        ];
      case 'up':
        return [
          { input: '1.231', output: '$1.24' },
          { input: '1.235', output: '$1.24' },
          { input: '1.239', output: '$1.24' },
          { input: '1.230', output: '$1.23' }
        ];
      case 'down':
        return [
          { input: '1.231', output: '$1.23' },
          { input: '1.235', output: '$1.23' },
          { input: '1.239', output: '$1.23' },
          { input: '1.230', output: '$1.23' }
        ];
      default:
        return [];
    }
  };

  const examples = getRoundingExamples();

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Round to Nearest Cent Calculator</h2>
        <p className="text-gray-600">Round decimal numbers to the nearest cent (2 decimal places) for currency calculations</p>
      </div>

      <div className="space-y-4">
        {/* Rounding Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rounding Method
          </label>
          <select
            value={roundingType}
            onChange={(e) => setRoundingType(e.target.value as 'nearest' | 'up' | 'down')}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="nearest">Round to Nearest Cent</option>
            <option value="up">Round Up to Cent</option>
            <option value="down">Round Down to Cent</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">{getRoundingDescription()}</p>
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Round
          </label>
          <Input
            type="text"
            placeholder="Enter amount (e.g., 1.234)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1">
            Round
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Rounded Amount</h3>
            <p className="text-2xl font-bold text-green-700">
              ${result}
            </p>
            {calculation && (
              <p className="text-sm text-green-600 mt-2 font-mono">
                {calculation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Round to Nearest:</strong> Standard rounding (0.5 rounds up)</li>
            <li>• <strong>Round Up:</strong> Always round up to the next cent</li>
            <li>• <strong>Round Down:</strong> Always round down to the previous cent</li>
            <li>• Enter any decimal number to see the rounded result</li>
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
            <li>• <strong>Sales Tax:</strong> Round tax amounts to nearest cent</li>
            <li>• <strong>Tips:</strong> Round tip calculations for restaurants</li>
            <li>• <strong>Interest:</strong> Round interest calculations</li>
            <li>• <strong>Pricing:</strong> Round product prices for display</li>
            <li>• <strong>Accounting:</strong> Round financial calculations</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
