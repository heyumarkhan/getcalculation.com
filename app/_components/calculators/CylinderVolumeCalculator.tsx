'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CylinderVolumeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function CylinderVolumeCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: CylinderVolumeCalculatorProps) {
  const [radius, setRadius] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculation, setCalculation] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateVolume = () => {
    const r = parseFloat(radius) || 0;
    const h = parseFloat(height) || 0;

    if (r <= 0 || h <= 0) {
      alert('Both radius and height must be greater than zero');
      setResult(null);
      setCalculation('');
      return;
    }

    // Calculate volume: V = π × r² × h
    const radiusSquared = r * r;
    const baseArea = Math.PI * radiusSquared;
    const volume = baseArea * h;
    
    const calculationString = `V = π × r² × h = π × ${r}² × ${h} = π × ${formatValue(radiusSquared)} × ${h} = ${formatValue(baseArea)} × ${h} = ${formatValue(volume)}`;
    
    setResult(volume);
    setCalculation(calculationString);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'radius':
        setRadius(value);
        break;
      case 'height':
        setHeight(value);
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
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cylinder Volume Calculator</h2>
            <p className="text-gray-600 mb-6">Enter the radius and height to calculate the volume of a cylinder:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          <Input
            label="Radius (r)"
            type="text"
            value={radius}
            onChange={(e) => handleInputChange('radius', e.target.value)}
            placeholder="Enter radius"
            autoFocus
          />

          <Input
            label="Height (h)"
            type="text"
            value={height}
            onChange={(e) => handleInputChange('height', e.target.value)}
            placeholder="Enter height"
          />

          <Button 
            onClick={calculateVolume}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Volume
          </Button>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

        {/* Results Section - Right Side */}
        <div>
          <div 
            className={`p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md min-h-[400px] transition-all duration-300`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Volume Result
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Volume:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result)} cubic units</span>
                    </div>
                    <div className="pt-4">
                      <span className="font-medium text-gray-700 text-sm block mb-2">Calculation:</span>
                      <span className="font-mono text-sm text-gray-800 break-all">{calculation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">🔵</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter radius and height to calculate the volume</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

