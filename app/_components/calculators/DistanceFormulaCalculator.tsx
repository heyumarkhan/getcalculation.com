'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface DistanceFormulaCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function DistanceFormulaCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: DistanceFormulaCalculatorProps) {
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
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

  const calculateDistance = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);
    
    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
      alert('Please enter valid numbers for all coordinates');
      return;
    }

    const steps: string[] = [];
    
    // Calculate distance using the distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]
    steps.push(`Given: Point 1 (x₁, y₁) = (${x1Val}, ${y1Val}), Point 2 (x₂, y₂) = (${x2Val}, ${y2Val})`);
    steps.push(`Using the distance formula: d = √[(x₂ - x₁)² + (y₂ - y₁)²]`);
    
    const deltaX = x2Val - x1Val;
    const deltaY = y2Val - y1Val;
    steps.push(`Step 1: Calculate the differences`);
    steps.push(`  Δx = x₂ - x₁ = ${x2Val} - ${x1Val} = ${deltaX}`);
    steps.push(`  Δy = y₂ - y₁ = ${y2Val} - ${y1Val} = ${deltaY}`);
    
    const deltaXSquared = deltaX * deltaX;
    const deltaYSquared = deltaY * deltaY;
    steps.push(`Step 2: Square the differences`);
    steps.push(`  (Δx)² = (${deltaX})² = ${deltaXSquared}`);
    steps.push(`  (Δy)² = (${deltaY})² = ${deltaYSquared}`);
    
    const sum = deltaXSquared + deltaYSquared;
    steps.push(`Step 3: Add the squared differences`);
    steps.push(`  (Δx)² + (Δy)² = ${deltaXSquared} + ${deltaYSquared} = ${sum}`);
    
    const distance = Math.sqrt(sum);
    steps.push(`Step 4: Take the square root`);
    steps.push(`  d = √${sum} = ${distance.toFixed(6)}`);
    
    setResult(distance);
    setCalculationSteps(steps);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'x1':
        setX1(value);
        break;
      case 'y1':
        setY1(value);
        break;
      case 'x2':
        setX2(value);
        break;
      case 'y2':
        setY2(value);
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
    setX1('');
    setY1('');
    setX2('');
    setY2('');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Distance Formula Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the distance between two points using the distance formula with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-4">
          {/* Point 1 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Point 1 (x₁, y₁)</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="x₁"
                type="text"
                value={x1}
                onChange={(e) => handleInputChange('x1', e.target.value)}
                placeholder="x coordinate"
                autoFocus
              />
              <Input
                label="y₁"
                type="text"
                value={y1}
                onChange={(e) => handleInputChange('y1', e.target.value)}
                placeholder="y coordinate"
              />
            </div>
          </div>

          {/* Point 2 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Point 2 (x₂, y₂)</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="x₂"
                type="text"
                value={x2}
                onChange={(e) => handleInputChange('x2', e.target.value)}
                placeholder="x coordinate"
              />
              <Input
                label="y₂"
                type="text"
                value={y2}
                onChange={(e) => handleInputChange('y2', e.target.value)}
                placeholder="y coordinate"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateDistance}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Distance
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
                Distance Result
              </h3>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">The distance between the two points is:</p>
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">Distance Formula:</h4>
            <div className="text-sm text-gray-600">
              <p className="font-mono text-center text-base font-bold mb-2">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
              <p className="text-xs mt-2"><strong>Where:</strong> d is the distance, (x₁, y₁) and (x₂, y₂) are the two points</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

