'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

export default function PerimeterCalculator() {
  const [side1, setSide1] = useState<string>('');
  const [side2, setSide2] = useState<string>('');
  const [side3, setSide3] = useState<string>('');
  const [side4, setSide4] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculatePerimeter = () => {
    const s1 = parseFloat(side1) || 0;
    const s2 = parseFloat(side2) || 0;
    const s3 = parseFloat(side3) || 0;
    const s4 = parseFloat(side4) || 0;

    // Calculate perimeter (sum of all sides)
    const perimeter = s1 + s2 + s3 + s4;
    setResult(perimeter);
  };

  const handleInputChange = (side: string, value: string) => {
    switch (side) {
      case 'side1':
        setSide1(value);
        break;
      case 'side2':
        setSide2(value);
        break;
      case 'side3':
        setSide3(value);
        break;
      case 'side4':
        setSide4(value);
        break;
      default:
        break;
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Perimeter Calculator</h2>
      <p className="text-gray-600 mb-6">Enter the lengths of all four sides to calculate the perimeter:</p>
      
      <div className="space-y-4">
        <Input
          label="Side 1"
          type="number"
          value={side1}
          onChange={(e) => handleInputChange('side1', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />

        <Input
          label="Side 2"
          type="number"
          value={side2}
          onChange={(e) => handleInputChange('side2', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />

        <Input
          label="Side 3"
          type="number"
          value={side3}
          onChange={(e) => handleInputChange('side3', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />

        <Input
          label="Side 4"
          type="number"
          value={side4}
          onChange={(e) => handleInputChange('side4', e.target.value)}
          placeholder="Enter length"
          min="0"
          step="0.01"
        />

        <Button 
          onClick={calculatePerimeter}
          className="w-full"
          size="lg"
        >
          Calculate Perimeter
        </Button>

        {result !== null && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-lg font-semibold text-blue-900">Result</h3>
            <p className="text-2xl font-bold text-blue-600">{result} units</p>
          </div>
        )}
      </div>
    </Card>
  );
}
