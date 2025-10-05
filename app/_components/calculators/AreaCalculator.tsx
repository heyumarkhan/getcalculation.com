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
  primaryColor = '#3399CC' 
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
          `
        }} />
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
          type="text"
          value={length}
          onChange={(e) => handleInputChange('length', e.target.value)}
          placeholder="Enter length"
          autoFocus
        />

        <Input
          label="Width"
          type="text"
          value={width}
          onChange={(e) => handleInputChange('width', e.target.value)}
          placeholder="Enter width"
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
