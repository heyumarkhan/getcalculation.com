'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function TriangularPyramidVolumeCalculator() {
  const [baseLength, setBaseLength] = useState<string>('');
  const [baseWidth, setBaseWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculate = () => {
    setError('');
    
    const length = parseFloat(baseLength);
    const width = parseFloat(baseWidth);
    const h = parseFloat(height);

    if (isNaN(length) || isNaN(width) || isNaN(h)) {
      setError('Please enter valid numbers for all dimensions');
      return;
    }

    if (length <= 0 || width <= 0 || h <= 0) {
      setError('All dimensions must be positive numbers');
      return;
    }

    // Volume of triangular pyramid = (1/3) * base area * height
    // Base area = (1/2) * base * height of triangle
    // For a right triangle: base area = (1/2) * length * width
    const baseArea = (1/2) * length * width;
    const volume = (1/3) * baseArea * h;
    
    setResult(volume);
  };

  const clear = () => {
    setBaseLength('');
    setBaseWidth('');
    setHeight('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Triangular Pyramid Volume Calculator</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="baseLength" className="block text-sm font-medium text-gray-700 mb-2">
                  Base Length (a)
                </label>
                <Input
                  id="baseLength"
                  type="text"
                  value={baseLength}
                  onChange={(e) => setBaseLength(e.target.value)}
                  placeholder="Enter base length"
                  autoFocus
                />
              </div>
              <div>
                <label htmlFor="baseWidth" className="block text-sm font-medium text-gray-700 mb-2">
                  Base Width (b)
                </label>
                <Input
                  id="baseWidth"
                  type="text"
                  value={baseWidth}
                  onChange={(e) => setBaseWidth(e.target.value)}
                  placeholder="Enter base width"
                />
              </div>
            </div>

            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                Height (h)
              </label>
              <Input
                id="height"
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter pyramid height"
              />
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
                  Volume = {formatValue(result)} cubic units
                </div>
                <div className="mt-2 text-sm text-green-700">
                  <div>Base Area = (1/2) × {baseLength} × {baseWidth} = {formatValue(parseFloat(baseLength) * parseFloat(baseWidth) / 2)}</div>
                  <div>Volume = (1/3) × {formatValue(parseFloat(baseLength) * parseFloat(baseWidth) / 2)} × {height} = {formatValue(result)}</div>
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
              <span>Enter the base length and width of the triangular base</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-blue-600 mr-2">2.</span>
              <span>Enter the height of the pyramid (perpendicular distance from base to apex)</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold text-blue-600 mr-2">3.</span>
              <span>Click &quot;Calculate&quot; to find the volume</span>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Formula</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center text-lg font-mono">
              V = <span className="text-blue-600">(1/3) × A × h</span>
            </div>
            <div className="text-center text-sm text-gray-600 mt-2">
              where A = <span className="text-blue-600">(1/2) × a × b</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Where:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>V = Volume of the triangular pyramid</li>
              <li>A = Area of the triangular base</li>
              <li>a = Base length</li>
              <li>b = Base width</li>
              <li>h = Height of the pyramid</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
