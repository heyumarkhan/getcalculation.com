'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface VolumeOfHemisphereCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function VolumeOfHemisphereCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: VolumeOfHemisphereCalculatorProps) {
  const [radius, setRadius] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateVolume = () => {
    setError('');
    const r = parseFloat(radius);

    if (isNaN(r)) {
      setError('Please enter a valid radius');
      setResult(null);
      return;
    }

    if (r <= 0) {
      setError('Radius must be greater than zero');
      setResult(null);
      return;
    }

    // Volume of hemisphere = (2/3) * π * r³
    const volume = (2/3) * Math.PI * Math.pow(r, 3);
    setResult(volume);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'radius':
        setRadius(value);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Volume of Hemisphere Calculator</h2>
            <p className="text-gray-600 mb-6">Enter the radius to calculate the volume of a hemisphere:</p>
          </>
        )}
      
      <div className="space-y-4">
        <Input
          label="Radius (r)"
          type="text"
          value={radius}
          onChange={(e) => handleInputChange('radius', e.target.value)}
          placeholder="Enter radius"
          autoFocus
        />

        <Button 
          onClick={calculateVolume}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Volume
        </Button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {result !== null && !error && (
          <div 
            className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-3`}
              style={colors.customStyles?.resultText}
            >
              Volume Result
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Volume:</p>
                <p 
                  className={`text-2xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {result.toFixed(6)} cubic units
                </p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Formula Used:</p>
                <p className="font-mono text-lg">V = (2/3) × π × r³</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Calculation:</p>
                <p className="font-mono text-sm">
                  V = (2/3) × π × {parseFloat(radius)}³
                </p>
                <p className="font-mono text-sm">
                  V = (2/3) × π × {Math.pow(parseFloat(radius), 3)}
                </p>
                <p className="font-mono text-sm">
                  V = {result.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
