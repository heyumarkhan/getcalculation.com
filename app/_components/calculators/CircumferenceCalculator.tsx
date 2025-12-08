'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CircumferenceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type InputType = 'radius' | 'diameter';

export default function CircumferenceCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: CircumferenceCalculatorProps) {
  const [inputType, setInputType] = useState<InputType>('radius');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculation, setCalculation] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (isNaN(value)) {
      return 'NaN';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(6);
  };

  const calculateCircumference = () => {
    const value = parseFloat(inputValue);
    
    if (!inputValue || isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    if (value <= 0) {
      alert('Value must be greater than 0');
      return;
    }

    let circumference: number;
    let calcString: string;

    if (inputType === 'radius') {
      circumference = 2 * Math.PI * value;
      calcString = `C = 2πr = 2 × π × ${value} = ${formatValue(circumference)}`;
    } else {
      circumference = Math.PI * value;
      calcString = `C = πd = π × ${value} = ${formatValue(circumference)}`;
    }

    setResult(circumference);
    setCalculation(calcString);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'inputValue':
        setInputValue(value);
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

  const getInputLabel = () => {
    return inputType === 'radius' ? 'Radius (r)' : 'Diameter (d)';
  };

  const getInputPlaceholder = () => {
    return inputType === 'radius' ? 'Enter radius' : 'Enter diameter';
  };

  const getFormula = () => {
    return inputType === 'radius' ? 'C = 2πr' : 'C = πd';
  };

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
            <p className="text-gray-600 mb-6">Calculate the circumference of a circle using radius or diameter:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Input Type Selector */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Given Information</h3>
            <div className="flex space-x-3">
              <button
                onClick={() => setInputType('radius')}
                className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-colors ${
                  inputType === 'radius'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Radius
              </button>
              <button
                onClick={() => setInputType('diameter')}
                className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-colors ${
                  inputType === 'diameter'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Diameter
              </button>
            </div>
          </div>

          {/* Formula Display */}
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Formula:</p>
            <p className="font-mono text-lg font-bold text-gray-800">{getFormula()}</p>
            <p className="text-xs text-gray-500 mt-1">where π ≈ 3.14159</p>
          </div>

          <Input
            label={getInputLabel()}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange('inputValue', e.target.value)}
            placeholder={getInputPlaceholder()}
            autoFocus
          />

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
              Circumference Result
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Circumference:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result)} units</span>
                    </div>
                    {calculation && (
                      <div className="pt-2">
                        <p className="text-sm text-gray-600 font-mono">{calculation}</p>
                      </div>
                    )}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <strong>Note:</strong> The circumference is the distance around the circle. It equals 2π times the radius or π times the diameter.
                      </p>
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
