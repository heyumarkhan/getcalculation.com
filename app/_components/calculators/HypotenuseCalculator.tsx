'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface HypotenuseCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function HypotenuseCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: HypotenuseCalculatorProps) {
  const [legA, setLegA] = useState<string>('');
  const [legB, setLegB] = useState<string>('');
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

  const calculateHypotenuse = () => {
    const a = parseFloat(legA);
    const b = parseFloat(legB);
    
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      alert('Please enter valid positive numbers for both legs');
      return;
    }

    const steps: string[] = [];
    
    // Hypotenuse formula: c = √(a² + b²)
    steps.push(`Given: Leg a = ${a}, Leg b = ${b}`);
    steps.push(`Using the Pythagorean theorem: c = √(a² + b²)`);
    
    const aSquared = a * a;
    const bSquared = b * b;
    steps.push(`Step 1: Square each leg`);
    steps.push(`  a² = ${a}² = ${aSquared}`);
    steps.push(`  b² = ${b}² = ${bSquared}`);
    
    const sum = aSquared + bSquared;
    steps.push(`Step 2: Add the squares`);
    steps.push(`  a² + b² = ${aSquared} + ${bSquared} = ${sum}`);
    
    const hypotenuse = Math.sqrt(sum);
    steps.push(`Step 3: Take the square root`);
    steps.push(`  c = √${sum} = ${formatValue(hypotenuse)} units`);
    
    setResult(hypotenuse);
    setCalculationSteps(steps);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'legA':
        setLegA(value);
        break;
      case 'legB':
        setLegB(value);
        break;
      default:
        break;
    }
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
    setLegA('');
    setLegB('');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hypotenuse Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the hypotenuse of a right triangle using the Pythagorean theorem with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Triangle Legs */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Right Triangle Legs</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Leg a"
                type="text"
                value={legA}
                onChange={(e) => handleInputChange('legA', e.target.value)}
                placeholder="Enter leg a"
                autoFocus
              />
              <Input
                label="Leg b"
                type="text"
                value={legB}
                onChange={(e) => handleInputChange('legB', e.target.value)}
                placeholder="Enter leg b"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Enter the lengths of the two legs (sides that form the right angle)</p>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateHypotenuse}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Hypotenuse
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
                Hypotenuse Result
              </h3>
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">The hypotenuse (c) is:</p>
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">Pythagorean Theorem:</h4>
            <div className="text-sm text-gray-600">
              <p className="font-mono text-center text-base font-bold mb-2">c = √(a² + b²)</p>
              <div className="mt-2 space-y-1 text-xs">
                <p><strong>Where:</strong></p>
                <p>• c = hypotenuse (longest side, opposite the right angle)</p>
                <p>• a = length of first leg (one of the shorter sides)</p>
                <p>• b = length of second leg (the other shorter side)</p>
                <p>• The legs form the right angle (90°)</p>
                <p className="mt-2"><strong>Alternative form:</strong> a² + b² = c²</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

