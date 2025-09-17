'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface AreaCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function AreaCalculator({ 
  showTitle = true, 
  primaryColor = 'green' 
}: AreaCalculatorProps) {
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

  const getColorClasses = (color: string) => {
    // Check if it's a hex color code
    if (color.startsWith('#')) {
      return {
        button: '',
        result: '',
        resultBg: '',
        resultBorder: '',
        resultText: '',
        customStyles: {
          button: {
            backgroundColor: color,
            '--hover-color': color,
            '--focus-color': color
          } as React.CSSProperties,
          result: {
            color: color
          } as React.CSSProperties,
          resultBg: {
            backgroundColor: `${color}10`, // 10% opacity
            borderColor: `${color}30` // 30% opacity
          } as React.CSSProperties,
          resultText: {
            color: color
          } as React.CSSProperties
        }
      };
    }

    // Fallback to predefined colors
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
    return { ...colorMap[color] || colorMap.green, customStyles: null };
  };

  const colors = getColorClasses(primaryColor);

  return (
    <>
      {colors.customStyles && (
        <style jsx>{`
          .custom-color-button:hover {
            background-color: ${primaryColor}dd !important;
          }
          .custom-color-button:focus {
            box-shadow: 0 0 0 3px ${primaryColor}40 !important;
          }
        `}</style>
      )}
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Area Calculator</h2>
            <p className="text-gray-600 mb-6">Enter the length and width to calculate the area:</p>
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

        <Button 
          onClick={calculateArea}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Area
        </Button>

        {result !== null && (
          <div 
            className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText}`}
              style={colors.customStyles?.resultText}
            >
              Result
            </h3>
            <p 
              className={`text-2xl font-bold ${colors.result}`}
              style={colors.customStyles?.result}
            >
              {result} square units
            </p>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
