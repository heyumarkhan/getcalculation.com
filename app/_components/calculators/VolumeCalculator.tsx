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
  primaryColor = '#3399CC' 
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
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Volume
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
              {result} cubic units
            </p>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
