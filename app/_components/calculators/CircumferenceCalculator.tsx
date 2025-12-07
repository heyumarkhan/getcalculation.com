'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CircumferenceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface CircumferenceResult {
  circumference: number;
  radius: number;
  diameter: number;
  formula: string;
  method: string;
}

export default function CircumferenceCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: CircumferenceCalculatorProps) {
  const [radius, setRadius] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [inputMethod, setInputMethod] = useState<'radius' | 'diameter'>('radius');
  const [result, setResult] = useState<CircumferenceResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateCircumference = () => {
    let r: number;
    let d: number;
    let formula: string;
    let method: string;

    if (inputMethod === 'radius') {
      r = parseFloat(radius) || 0;
      if (r <= 0) {
        alert('Radius must be greater than 0');
        return;
      }
      d = r * 2;
      formula = `C = 2πr = 2 × π × ${r} = ${formatValue(2 * Math.PI * r)}`;
      method = 'Using radius';
    } else {
      d = parseFloat(diameter) || 0;
      if (d <= 0) {
        alert('Diameter must be greater than 0');
        return;
      }
      r = d / 2;
      formula = `C = πd = π × ${d} = ${formatValue(Math.PI * d)}`;
      method = 'Using diameter';
    }

    const circumference = 2 * Math.PI * r;

    setResult({
      circumference,
      radius: r,
      diameter: d,
      formula,
      method
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'radius':
        setRadius(value);
        setDiameter('');
        setInputMethod('radius');
        break;
      case 'diameter':
        setDiameter(value);
        setRadius('');
        setInputMethod('diameter');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Circumference Calculator</h2>
            <p className="text-gray-600 mb-6">Enter either the radius or diameter to calculate the circumference:</p>
          </>
        )}
      
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          {/* Calculator Form - Left Side */}
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Input Method</h3>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inputMethod"
                    checked={inputMethod === 'radius'}
                    onChange={() => {
                      setInputMethod('radius');
                      setDiameter('');
                    }}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Radius</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="inputMethod"
                    checked={inputMethod === 'diameter'}
                    onChange={() => {
                      setInputMethod('diameter');
                      setRadius('');
                    }}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Diameter</span>
                </label>
              </div>
              
              {inputMethod === 'radius' ? (
                <Input
                  label="Radius (r)"
                  type="text"
                  value={radius}
                  onChange={(e) => handleInputChange('radius', e.target.value)}
                  placeholder="Enter radius"
                  autoFocus
                />
              ) : (
                <Input
                  label="Diameter (d)"
                  type="text"
                  value={diameter}
                  onChange={(e) => handleInputChange('diameter', e.target.value)}
                  placeholder="Enter diameter"
                  autoFocus
                />
              )}
            </div>

            <Button 
              onClick={calculateCircumference}
              className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate
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
                Circumference Results
              </h3>
              
              {result !== null ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Circumference:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.circumference)} units</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Radius:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.radius)} units</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Diameter:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.diameter)} units</span>
                      </div>
                      <div className="pt-2">
                        <span className="font-medium text-gray-700 text-sm block mb-2">Formula Used:</span>
                        <span className="font-mono text-sm text-gray-600">{result.formula}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">⭕</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter radius or diameter to calculate the circumference</p>
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

