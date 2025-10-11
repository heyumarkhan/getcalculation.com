'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface Triangle454590CalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface TriangleResult {
  leg: number;
  hypotenuse: number;
  area: number;
  perimeter: number;
  inputType: 'leg' | 'hypotenuse';
  explanation: string;
  steps: string[];
  diagram: {
    sideA: number;
    sideB: number;
    sideC: number;
    angleA: number;
    angleB: number;
    angleC: number;
  };
}

export default function Triangle454590Calculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: Triangle454590CalculatorProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'leg' | 'hypotenuse'>('leg');
  const [result, setResult] = useState<TriangleResult | null>(null);

  const calculateTriangle = () => {
    const value = parseFloat(inputValue);

    // Validation
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    let leg: number;
    let hypotenuse: number;

    if (inputType === 'leg') {
      leg = value;
      hypotenuse = value * Math.sqrt(2);
    } else {
      hypotenuse = value;
      leg = value / Math.sqrt(2);
    }

    const area = (leg * leg) / 2;
    const perimeter = 2 * leg + hypotenuse;

    // Generate explanation
    const explanation = `In a 45-45-90 triangle, the legs are equal and the hypotenuse is √2 times the length of each leg. The angles are 45°, 45°, and 90°.`;

    // Generate step-by-step calculation
    const steps: string[] = [];
    
    if (inputType === 'leg') {
      steps.push(`Given: leg = ${leg}`);
      steps.push(`Step 1: Calculate hypotenuse = leg × √2`);
      steps.push(`Step 2: hypotenuse = ${leg} × √2 = ${leg} × 1.414 = ${hypotenuse.toFixed(6)}`);
      steps.push(`Step 3: Calculate area = (leg²) / 2`);
      steps.push(`Step 4: area = (${leg}²) / 2 = ${(leg * leg).toFixed(6)} / 2 = ${area.toFixed(6)}`);
      steps.push(`Step 5: Calculate perimeter = 2 × leg + hypotenuse`);
      steps.push(`Step 6: perimeter = 2 × ${leg} + ${hypotenuse.toFixed(6)} = ${perimeter.toFixed(6)}`);
    } else {
      steps.push(`Given: hypotenuse = ${hypotenuse}`);
      steps.push(`Step 1: Calculate leg = hypotenuse / √2`);
      steps.push(`Step 2: leg = ${hypotenuse} / √2 = ${hypotenuse} / 1.414 = ${leg.toFixed(6)}`);
      steps.push(`Step 3: Calculate area = (leg²) / 2`);
      steps.push(`Step 4: area = (${leg.toFixed(6)}²) / 2 = ${(leg * leg).toFixed(6)} / 2 = ${area.toFixed(6)}`);
      steps.push(`Step 5: Calculate perimeter = 2 × leg + hypotenuse`);
      steps.push(`Step 6: perimeter = 2 × ${leg.toFixed(6)} + ${hypotenuse} = ${perimeter.toFixed(6)}`);
    }

    setResult({
      leg,
      hypotenuse,
      area,
      perimeter,
      inputType,
      explanation,
      steps,
      diagram: {
        sideA: leg,
        sideB: leg,
        sideC: hypotenuse,
        angleA: 45,
        angleB: 45,
        angleC: 90
      }
    });
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
      <Card className="max-w-4xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">45-45-90 Triangle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the sides, area, and perimeter of a 45-45-90 triangle (isosceles right triangle):</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Known Value</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Input Type:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputType"
                    value="leg"
                    checked={inputType === 'leg'}
                    onChange={(e) => setInputType(e.target.value as 'leg' | 'hypotenuse')}
                    className="mr-2"
                  />
                  Leg (equal sides)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputType"
                    value="hypotenuse"
                    checked={inputType === 'hypotenuse'}
                    onChange={(e) => setInputType(e.target.value as 'leg' | 'hypotenuse')}
                    className="mr-2"
                  />
                  Hypotenuse
                </label>
              </div>
            </div>

            <Input
              label={`${inputType === 'leg' ? 'Leg' : 'Hypotenuse'} length`}
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Enter ${inputType === 'leg' ? 'leg' : 'hypotenuse'} length`}
              autoFocus
              step="any"
              min="0"
            />
            
            <p className="text-sm text-gray-600 mt-2">
              <strong>Note:</strong> In a 45-45-90 triangle, the legs are equal and the hypotenuse is √2 times the leg length.
            </p>
          </div>

          <Button 
            onClick={calculateTriangle}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate 45-45-90 Triangle
          </Button>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                45-45-90 Triangle Results
              </h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Leg</p>
                    <p className="font-mono text-xl font-bold text-blue-600">{result.leg.toFixed(6)}</p>
                  </div>
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Hypotenuse</p>
                    <p className="font-mono text-xl font-bold text-green-600">{result.hypotenuse.toFixed(6)}</p>
                  </div>
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Area</p>
                    <p className="font-mono text-xl font-bold text-purple-600">{result.area.toFixed(6)}</p>
                  </div>
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Perimeter</p>
                    <p className="font-mono text-xl font-bold text-orange-600">{result.perimeter.toFixed(6)}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Triangle Properties:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Angles:</strong> 45°, 45°, 90°</p>
                      <p><strong>Type:</strong> Isosceles Right Triangle</p>
                    </div>
                    <div>
                      <p><strong>Leg Ratio:</strong> 1 : 1</p>
                      <p><strong>Hypotenuse Ratio:</strong> 1 : √2</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
                  <p className="text-gray-800">{result.explanation}</p>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-3">Step-by-Step Calculation:</p>
                  <div className="space-y-2">
                    {result.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-mono">
                          {index + 1}
                        </span>
                        <p className="font-mono text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-3">Triangle Diagram:</p>
                  <div className="flex justify-center">
                    <div className="relative">
                      <svg width="200" height="150" viewBox="0 0 200 150" className="border rounded">
                        {/* Triangle sides */}
                        <line x1="50" y1="120" x2="150" y2="120" stroke="#3B82F6" strokeWidth="2" />
                        <line x1="50" y1="120" x2="100" y2="20" stroke="#10B981" strokeWidth="2" />
                        <line x2="100" y2="20" x1="150" y1="120" stroke="#F59E0B" strokeWidth="2" />
                        
                        {/* Side labels */}
                        <text x="100" y="135" textAnchor="middle" className="text-xs fill-blue-600 font-semibold">
                          Leg: {result.leg.toFixed(2)}
                        </text>
                        <text x="25" y="70" textAnchor="middle" className="text-xs fill-green-600 font-semibold">
                          Leg: {result.leg.toFixed(2)}
                        </text>
                        <text x="125" y="70" textAnchor="middle" className="text-xs fill-orange-600 font-semibold">
                          Hyp: {result.hypotenuse.toFixed(2)}
                        </text>
                        
                        {/* Angle labels */}
                        <text x="60" y="110" textAnchor="middle" className="text-xs fill-gray-600">
                          45°
                        </text>
                        <text x="140" y="110" textAnchor="middle" className="text-xs fill-gray-600">
                          45°
                        </text>
                        <text x="100" y="35" textAnchor="middle" className="text-xs fill-gray-600">
                          90°
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-2">Key Relationships:</p>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>• Hypotenuse = Leg × √2 ≈ Leg × 1.414</p>
                    <p>• Leg = Hypotenuse ÷ √2 ≈ Hypotenuse ÷ 1.414</p>
                    <p>• Area = (Leg²) ÷ 2</p>
                    <p>• Perimeter = 2 × Leg + Hypotenuse</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
