'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface AreaOfCircleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type InputType = 'radius' | 'diameter' | 'circumference';

export default function AreaOfCircleCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: AreaOfCircleCalculatorProps) {
  const [inputType, setInputType] = useState<InputType>('radius');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(6);
  };

  const calculateArea = () => {
    const value = parseFloat(inputValue);
    
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    const steps: string[] = [];
    let radius = 0;
    let area = 0;

    if (inputType === 'radius') {
      radius = value;
      steps.push(`Given radius (r) = ${value}`);
    } else if (inputType === 'diameter') {
      steps.push(`Given diameter (d) = ${value}`);
      radius = value / 2;
      steps.push(`Radius (r) = d ÷ 2 = ${value} ÷ 2 = ${radius}`);
    } else if (inputType === 'circumference') {
      steps.push(`Given circumference (C) = ${value}`);
      steps.push(`Using the formula: C = 2πr`);
      steps.push(`Rearranging: r = C ÷ (2π)`);
      steps.push(`r = ${value} ÷ (2 × π)`);
      steps.push(`r = ${value} ÷ ${(2 * Math.PI).toFixed(6)}`);
      radius = value / (2 * Math.PI);
      steps.push(`r = ${radius.toFixed(6)} units`);
    }

    // Area formula: A = πr²
    area = Math.PI * radius * radius;
    steps.push(`Area (A) = π × r²`);
    steps.push(`A = π × ${radius}²`);
    steps.push(`A = π × ${(radius * radius).toFixed(6)}`);
    steps.push(`A = ${(Math.PI * radius * radius).toFixed(6)}`);
    steps.push(`A = ${area.toFixed(6)} square units`);

    setResult(area);
    setCalculationSteps(steps);
  };

  const getColorClasses = (color: string) => {
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
          backgroundColor: `${hexColor}10`,
          borderColor: `${hexColor}30`
        } as React.CSSProperties,
        resultText: {
          color: hexColor
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  const getInputLabel = () => {
    switch (inputType) {
      case 'radius':
        return 'Radius (r)';
      case 'diameter':
        return 'Diameter (d)';
      case 'circumference':
        return 'Circumference (C)';
      default:
        return 'Value';
    }
  };

  const getInputPlaceholder = () => {
    switch (inputType) {
      case 'radius':
        return 'Enter radius';
      case 'diameter':
        return 'Enter diameter';
      case 'circumference':
        return 'Enter circumference';
      default:
        return 'Enter value';
    }
  };

  const clearAll = () => {
    setInputValue('');
    setResult(null);
    setCalculationSteps([]);
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
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Area of a Circle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the area of a circle using radius, diameter, or circumference with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Given Information</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setInputType('radius');
                  setInputValue('');
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  inputType === 'radius'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Radius
              </button>
              <button
                onClick={() => {
                  setInputType('diameter');
                  setInputValue('');
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  inputType === 'diameter'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Diameter
              </button>
              <button
                onClick={() => {
                  setInputType('circumference');
                  setInputValue('');
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  inputType === 'circumference'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Circumference
              </button>
            </div>
          </div>

          {/* Input Field */}
          <Input
            label={getInputLabel()}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={getInputPlaceholder()}
            autoFocus
          />

          <div className="flex gap-3">
            <Button 
              onClick={calculateArea}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Area
            </Button>
            <Button 
              onClick={clearAll}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Clear
            </Button>
          </div>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-3`}
                style={colors.customStyles?.resultText}
              >
                Result
              </h3>
              <p 
                className={`text-2xl font-bold ${colors.result} mb-4`}
                style={colors.customStyles?.result}
              >
                Area = {formatValue(result)} square units
              </p>
              
              {calculationSteps.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Calculation Steps:</h4>
                  <div className="space-y-1">
                    {calculationSteps.map((step, index) => (
                      <p key={index} className="text-sm text-gray-600 font-mono">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formula Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Formula Reference:</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Area Formula:</strong> A = πr²</p>
              <p><strong>From Radius:</strong> A = π × r²</p>
              <p><strong>From Diameter:</strong> A = π × (d/2)² = (πd²)/4</p>
              <p><strong>From Circumference:</strong> A = C²/(4π)</p>
              <p><strong>Where:</strong> π ≈ 3.14159</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

