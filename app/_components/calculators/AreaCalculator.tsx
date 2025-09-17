'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

export default function AreaCalculator() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateArea = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const area = l * w;
    setResult(area);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'length':
        setLength(value);
        break;
      case 'width':
        setWidth(value);
        break;
      default:
        break;
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Area Calculator</h2>
      <p className="text-gray-600 mb-6">Enter the length and width to calculate the area:</p>
      
      <div className="space-y-4">
        <Input
          label="Length"
          type="number"
          value={length}
          onChange={(e) => handleInputChange('length', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />

        <Input
          label="Width"
          type="number"
          value={width}
          onChange={(e) => handleInputChange('width', e.target.value)}
          placeholder="Enter width"
          min="0"
          step="0.01"
        />

        <Button 
          onClick={calculateArea}
          className="w-full"
          size="lg"
        >
          Calculate Area
        </Button>

        {result !== null && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-semibold text-green-900">Result</h3>
            <p className="text-2xl font-bold text-green-600">{result} square units</p>
          </div>
        )}
      </div>
    </Card>
  );
}
