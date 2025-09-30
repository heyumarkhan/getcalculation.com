'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function AverageRateOfChangeCalculator() {
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    
    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);
    const y2Num = parseFloat(y2);

    if (isNaN(x1Num) || isNaN(y1Num) || isNaN(x2Num) || isNaN(y2Num)) {
      setError('Please enter valid numbers for all coordinates');
      return;
    }

    if (x1Num === x2Num) {
      setError('x₁ and x₂ cannot be the same (division by zero)');
      return;
    }

    // Average rate of change = (y₂ - y₁) / (x₂ - x₁)
    const rateOfChange = (y2Num - y1Num) / (x2Num - x1Num);
    setResult(rateOfChange);
  };

  const clear = () => {
    setX1('');
    setY1('');
    setX2('');
    setY2('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Average Rate of Change Calculator</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="x1" className="block text-sm font-medium text-gray-700 mb-2">
                  x₁ (First Point)
                </label>
                <Input
                  id="x1"
                  type="number"
                  step="any"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  placeholder="Enter x₁"
                />
              </div>
              <div>
                <label htmlFor="y1" className="block text-sm font-medium text-gray-700 mb-2">
                  y₁ (First Point)
                </label>
                <Input
                  id="y1"
                  type="number"
                  step="any"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  placeholder="Enter y₁"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="x2" className="block text-sm font-medium text-gray-700 mb-2">
                  x₂ (Second Point)
                </label>
                <Input
                  id="x2"
                  type="number"
                  step="any"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  placeholder="Enter x₂"
                />
              </div>
              <div>
                <label htmlFor="y2" className="block text-sm font-medium text-gray-700 mb-2">
                  y₂ (Second Point)
                </label>
                <Input
                  id="y2"
                  type="number"
                  step="any"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  placeholder="Enter y₂"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={calculate} className="flex-1">
                Calculate
              </Button>
              <Button onClick={clear} variant="outline" className="flex-1">
                Clear
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {result !== null && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-2">Result</h3>
                <div className="text-2xl font-bold text-green-900">
                  Average Rate of Change = {result.toFixed(6)}
                </div>
                <div className="mt-2 text-sm text-green-700">
                  Formula: (y₂ - y₁) / (x₂ - x₁) = ({y2} - {y1}) / ({x2} - {x1}) = {result.toFixed(6)}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="font-semibold text-blue-600 mr-2">1.</span>
              <span>Enter the coordinates of two points on a function: (x₁, y₁) and (x₂, y₂)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-blue-600 mr-2">2.</span>
              <span>Click &quot;Calculate&quot; to find the average rate of change</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-blue-600 mr-2">3.</span>
              <span>The result represents the slope of the secant line between the two points</span>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Formula</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center text-lg font-mono">
              Average Rate of Change = <span className="text-blue-600">(y₂ - y₁) / (x₂ - x₁)</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Where:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>(x₁, y₁) = First point coordinates</li>
              <li>(x₂, y₂) = Second point coordinates</li>
              <li>The result is the slope of the line connecting these two points</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
