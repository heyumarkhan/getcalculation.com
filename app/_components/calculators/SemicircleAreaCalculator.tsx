'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SemicircleAreaCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type InputType = 'radius' | 'diameter' | 'circumference';

export default function SemicircleAreaCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SemicircleAreaCalculatorProps) {
  const [inputType, setInputType] = useState<InputType>('radius');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);

  const calculateArea = () => {
    const value = parseFloat(inputValue) || 0;
    const steps: string[] = [];
    let radius = 0;
    let area = 0;

    if (inputType === 'radius') {
      radius = value;
      steps.push(`Given radius (r) = ${value}`);
    } else if (inputType === 'diameter') {
      radius = value / 2;
      steps.push(`Given diameter (d) = ${value}`);
      steps.push(`Radius (r) = d ÷ 2 = ${value} ÷ 2 = ${radius}`);
    } else if (inputType === 'circumference') {
      // C = πd, so d = C/π, then r = d/2
      const diameter = value / Math.PI;
      radius = diameter / 2;
      steps.push(`Given circumference (C) = ${value}`);
      steps.push(`Diameter (d) = C ÷ π = ${value} ÷ ${Math.PI.toFixed(6)} = ${diameter.toFixed(6)}`);
      steps.push(`Radius (r) = d ÷ 2 = ${diameter.toFixed(6)} ÷ 2 = ${radius.toFixed(6)}`);
    }

    if (radius > 0) {
      // Area of semicircle = (1/2) × π × r²
      area = (1/2) * Math.PI * radius * radius;
      steps.push(`Area of semicircle = (1/2) × π × r²`);
      steps.push(`Area = (1/2) × π × ${radius}²`);
      steps.push(`Area = (1/2) × π × ${(radius * radius).toFixed(6)}`);
      steps.push(`Area = (1/2) × ${(Math.PI * radius * radius).toFixed(6)}`);
      steps.push(`Area = ${area.toFixed(6)} square units`);
    }

    setResult(area);
    setCalculationSteps(steps);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Semicircle Area Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the area of a semicircle using radius, diameter, or circumference with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Given Information</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setInputType('radius')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  inputType === 'radius'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Radius
              </button>
              <button
                onClick={() => setInputType('diameter')}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  inputType === 'diameter'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                Diameter
              </button>
              <button
                onClick={() => setInputType('circumference')}
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
                className={`text-lg font-semibold ${colors.resultText} mb-3`}
                style={colors.customStyles?.resultText}
              >
                Result
              </h3>
              <p 
                className={`text-2xl font-bold ${colors.result} mb-4`}
                style={colors.customStyles?.result}
              >
                Area = {result.toFixed(6)} square units
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
              <p><strong>Semicircle Area:</strong> A = (1/2) × π × r²</p>
              <p><strong>Radius from Diameter:</strong> r = d ÷ 2</p>
              <p><strong>Radius from Circumference:</strong> r = C ÷ (2π)</p>
              <p><strong>Where:</strong> π ≈ 3.14159</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
