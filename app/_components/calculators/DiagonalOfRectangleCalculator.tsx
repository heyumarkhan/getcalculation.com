'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface DiagonalOfRectangleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function DiagonalOfRectangleCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: DiagonalOfRectangleCalculatorProps) {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
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

  const calculateDiagonal = () => {
    const lengthVal = parseFloat(length);
    const widthVal = parseFloat(width);
    
    if (isNaN(lengthVal) || isNaN(widthVal) || lengthVal <= 0 || widthVal <= 0) {
      alert('Please enter valid positive numbers for length and width');
      return;
    }

    const steps: string[] = [];
    
    // Diagonal formula: d = √(length² + width²)
    steps.push(`Given: Length (l) = ${lengthVal}, Width (w) = ${widthVal}`);
    steps.push(`Using the formula: d = √(l² + w²)`);
    
    const lengthSquared = lengthVal * lengthVal;
    const widthSquared = widthVal * widthVal;
    steps.push(`Step 1: Square the length and width`);
    steps.push(`  l² = ${lengthVal}² = ${lengthSquared}`);
    steps.push(`  w² = ${widthVal}² = ${widthSquared}`);
    
    const sum = lengthSquared + widthSquared;
    steps.push(`Step 2: Add the squares`);
    steps.push(`  l² + w² = ${lengthSquared} + ${widthSquared} = ${sum}`);
    
    const diagonal = Math.sqrt(sum);
    steps.push(`Step 3: Take the square root`);
    steps.push(`  d = √${sum} = ${diagonal.toFixed(6)} units`);
    
    setResult(diagonal);
    setCalculationSteps(steps);
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
    // Clear results when input changes
    if (result !== null) {
      setResult(null);
      setCalculationSteps([]);
    }
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

  const clearAll = () => {
    setLength('');
    setWidth('');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Diagonal of a Rectangle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the diagonal length of a rectangle using length and width with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Rectangle Dimensions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Rectangle Dimensions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Length (l)"
                type="text"
                value={length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                placeholder="Enter length"
                autoFocus
              />
              <Input
                label="Width (w)"
                type="text"
                value={width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                placeholder="Enter width"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateDiagonal}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Diagonal
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
                Diagonal Result
              </h3>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">The diagonal of the rectangle is:</p>
                <p 
                  className={`text-3xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {formatValue(result)} units
                </p>
              </div>
              
              {calculationSteps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Step-by-Step Calculation:</h4>
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">Diagonal Formula:</h4>
            <div className="text-sm text-gray-600">
              <p className="font-mono text-center text-base font-bold mb-2">d = √(l² + w²)</p>
              <div className="mt-2 space-y-1 text-xs">
                <p><strong>Where:</strong></p>
                <p>• d = diagonal length</p>
                <p>• l = length of the rectangle</p>
                <p>• w = width of the rectangle</p>
                <p>• This formula is derived from the Pythagorean theorem</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

