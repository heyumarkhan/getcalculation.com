'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PerimeterCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PerimeterCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: PerimeterCalculatorProps) {
  const [side1, setSide1] = useState<string>('');
  const [side2, setSide2] = useState<string>('');
  const [side3, setSide3] = useState<string>('');
  const [side4, setSide4] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

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

  const getColorClasses = (color: string) => {
    // Add # if it's missing
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
          backgroundColor: `${hexColor}10`, // 10% opacity
          borderColor: `${hexColor}30` // 30% opacity
        } as React.CSSProperties,
        resultText: {
          color: hexColor
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

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
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Perimeter Calculator</h2>
            <p className="text-gray-600 mb-6">Enter the lengths of all four sides to calculate the perimeter:</p>
          </>
        )}
      
      <div className="space-y-4">
        <Input
          label="Side 1"
          type="text"
          value={side1}
          onChange={(e) => handleInputChange('side1', e.target.value)}
          placeholder="Enter length"
          autoFocus
        />

        <Input
          label="Side 2"
          type="text"
          value={side2}
          onChange={(e) => handleInputChange('side2', e.target.value)}
          placeholder="Enter length"
        />

        <Input
          label="Side 3"
          type="text"
          value={side3}
          onChange={(e) => handleInputChange('side3', e.target.value)}
          placeholder="Enter length"
        />

        <Input
          label="Side 4"
          type="text"
          value={side4}
          onChange={(e) => handleInputChange('side4', e.target.value)}
          placeholder="Enter length"
        />

        <Button 
          onClick={calculatePerimeter}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Perimeter
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
              {formatValue(result)} units
            </p>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
