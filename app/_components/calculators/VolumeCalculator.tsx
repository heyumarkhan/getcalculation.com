'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface VolumeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function VolumeCalculator({ 
  showTitle = true, 
  primaryColor = 'purple' 
}: VolumeCalculatorProps) {
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

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { button: string; result: string; resultBg: string; resultBorder: string; resultText: string } } = {
      blue: {
        button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        result: 'text-blue-600',
        resultBg: 'bg-blue-50',
        resultBorder: 'border-blue-200',
        resultText: 'text-blue-900'
      },
      green: {
        button: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
        result: 'text-green-600',
        resultBg: 'bg-green-50',
        resultBorder: 'border-green-200',
        resultText: 'text-green-900'
      },
      purple: {
        button: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
        result: 'text-purple-600',
        resultBg: 'bg-purple-50',
        resultBorder: 'border-purple-200',
        resultText: 'text-purple-900'
      },
      red: {
        button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
        result: 'text-red-600',
        resultBg: 'bg-red-50',
        resultBorder: 'border-red-200',
        resultText: 'text-red-900'
      },
      indigo: {
        button: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        result: 'text-indigo-600',
        resultBg: 'bg-indigo-50',
        resultBorder: 'border-indigo-200',
        resultText: 'text-indigo-900'
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  const colors = getColorClasses(primaryColor);

  return (
    <Card className="max-w-md mx-auto">
      {showTitle && (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Volume Calculator</h2>
          <p className="text-gray-600 mb-6">Enter the length, width, and height to calculate the volume:</p>
        </>
      )}
      
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
          className={`w-full ${colors.button}`}
          size="lg"
        >
          Calculate Volume
        </Button>

        {result !== null && (
          <div className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}>
            <h3 className={`text-lg font-semibold ${colors.resultText}`}>Result</h3>
            <p className={`text-2xl font-bold ${colors.result}`}>{result} cubic units</p>
          </div>
        )}
      </div>
    </Card>
  );
}
