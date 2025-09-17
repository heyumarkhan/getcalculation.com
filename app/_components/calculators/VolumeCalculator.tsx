'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

export default function VolumeCalculator() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateVolume = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const volume = l * w * h;
    setResult(volume);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'length':
        setLength(value);
        break;
      case 'width':
        setWidth(value);
        break;
      case 'height':
        setHeight(value);
        break;
      default:
        break;
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Volume Calculator</h2>
      <p className="text-gray-600 mb-6">Enter the length, width, and height to calculate the volume:</p>
      
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

        <Input
          label="Height"
          type="number"
          value={height}
          onChange={(e) => handleInputChange('height', e.target.value)}
          placeholder="Enter height"
          min="0"
          step="0.01"
        />

        <Button 
          onClick={calculateVolume}
          className="w-full"
          size="lg"
        >
          Calculate Volume
        </Button>

        {result !== null && (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-md">
            <h3 className="text-lg font-semibold text-purple-900">Result</h3>
            <p className="text-2xl font-bold text-purple-600">{result} cubic units</p>
          </div>
        )}
      </div>
    </Card>
  );
}
