'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ExponentialFunctionCalculator() {
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [calculation, setCalculation] = useState('');
  const [functionType, setFunctionType] = useState<'basic' | 'growth' | 'decay' | 'compound'>('basic');

  const calculateExponential = () => {
    const b = parseFloat(base);
    const exp = parseFloat(exponent);

    if (base && exponent) {
      const calculatedResult = Math.pow(b, exp);
      setResult(calculatedResult);
      setCalculation(`${b}^${exp} = ${calculatedResult.toFixed(6)}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const calculateGrowth = () => {
    const initial = parseFloat(base);
    const rate = parseFloat(exponent);
    const time = 1; // Default time period

    if (base && exponent) {
      const calculatedResult = initial * Math.pow(1 + rate, time);
      setResult(calculatedResult);
      setCalculation(`Growth: ${initial} × (1 + ${rate})^${time} = ${calculatedResult.toFixed(6)}`);
    }
  };

  const calculateDecay = () => {
    const initial = parseFloat(base);
    const rate = parseFloat(exponent);
    const time = 1; // Default time period

    if (base && exponent) {
      const calculatedResult = initial * Math.pow(1 - rate, time);
      setResult(calculatedResult);
      setCalculation(`Decay: ${initial} × (1 - ${rate})^${time} = ${calculatedResult.toFixed(6)}`);
    }
  };

  const calculateCompound = () => {
    const principal = parseFloat(base);
    const rate = parseFloat(exponent);
    const time = 1; // Default time period
    const n = 1; // Compounding frequency (annually)

    if (base && exponent) {
      const calculatedResult = principal * Math.pow(1 + rate / n, n * time);
      setResult(calculatedResult);
      setCalculation(`Compound Interest: ${principal} × (1 + ${rate}/${n})^(${n} × ${time}) = ${calculatedResult.toFixed(6)}`);
    }
  };

  const calculate = () => {
    switch (functionType) {
      case 'growth':
        calculateGrowth();
        break;
      case 'decay':
        calculateDecay();
        break;
      case 'compound':
        calculateCompound();
        break;
      default:
        calculateExponential();
    }
  };

  const clearAll = () => {
    setBase('');
    setExponent('');
    setResult(null);
    setCalculation('');
  };

  const getInputLabels = () => {
    switch (functionType) {
      case 'growth':
        return { base: 'Initial Value', exponent: 'Growth Rate (decimal)' };
      case 'decay':
        return { base: 'Initial Value', exponent: 'Decay Rate (decimal)' };
      case 'compound':
        return { base: 'Principal Amount', exponent: 'Interest Rate (decimal)' };
      default:
        return { base: 'Base (a)', exponent: 'Exponent (x)' };
    }
  };

  const getFormula = () => {
    switch (functionType) {
      case 'growth':
        return 'A = P(1 + r)^t';
      case 'decay':
        return 'A = P(1 - r)^t';
      case 'compound':
        return 'A = P(1 + r/n)^(nt)';
      default:
        return 'f(x) = a^x';
    }
  };

  const labels = getInputLabels();

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Exponential Function Calculator</h2>
        <p className="text-gray-600">Calculate exponential functions, growth, decay, and compound interest</p>
      </div>

      <div className="space-y-4">
        {/* Function Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Function Type
          </label>
          <select
            value={functionType}
            onChange={(e) => setFunctionType(e.target.value as 'basic' | 'growth' | 'decay' | 'compound')}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="basic">Basic Exponential (a^x)</option>
            <option value="growth">Exponential Growth</option>
            <option value="decay">Exponential Decay</option>
            <option value="compound">Compound Interest</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">{getFormula()}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.base}
          </label>
          <Input
            type="number"
            step="any"
            placeholder="Enter value"
            value={base}
            onChange={(e) => setBase(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {labels.exponent}
          </label>
          <Input
            type="number"
            step="any"
            placeholder="Enter value"
            value={exponent}
            onChange={(e) => setExponent(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Result</h3>
            <p className="text-2xl font-bold text-blue-700">
              {result.toFixed(6)}
            </p>
            {calculation && (
              <p className="text-sm text-blue-600 mt-2 font-mono">
                {calculation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Basic Exponential:</strong> Calculate a^x where a is the base and x is the exponent</li>
            <li>• <strong>Growth:</strong> Calculate exponential growth A = P(1 + r)^t</li>
            <li>• <strong>Decay:</strong> Calculate exponential decay A = P(1 - r)^t</li>
            <li>• <strong>Compound Interest:</strong> Calculate compound interest A = P(1 + r/n)^(nt)</li>
            <li>• Enter rates as decimals (e.g., 0.05 for 5%)</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Common Values</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
            <div>e ≈ 2.718281828</div>
            <div>π ≈ 3.141592654</div>
            <div>2^10 = 1,024</div>
            <div>10^3 = 1,000</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
