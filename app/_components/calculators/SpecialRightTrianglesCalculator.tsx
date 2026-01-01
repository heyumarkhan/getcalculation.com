'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SpecialRightTrianglesCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface TriangleResult {
  shortLeg?: number;
  longLeg?: number;
  hypotenuse: number;
  area: number;
  perimeter: number;
  triangleType: '45-45-90' | '30-60-90';
  inputType: string;
  explanation: string;
  steps: string[];
  angles: {
    angleA: number;
    angleB: number;
    angleC: number;
  };
}

export default function SpecialRightTrianglesCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SpecialRightTrianglesCalculatorProps) {
  const [triangleType, setTriangleType] = useState<'45-45-90' | '30-60-90'>('45-45-90');
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<string>('leg');
  const [result, setResult] = useState<TriangleResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    // Check if it's a whole number
    if (Math.abs(value - Math.round(value)) < 0.0001) {
      return Math.round(value).toString();
    }
    return value.toFixed(4);
  };

  const calculateTriangle = () => {
    const value = parseFloat(inputValue);

    // Validation
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    let shortLeg: number;
    let longLeg: number | undefined;
    let hypotenuse: number;
    let steps: string[] = [];
    let explanation: string;
    let angles: { angleA: number; angleB: number; angleC: number };

    if (triangleType === '45-45-90') {
      // 45-45-90 triangle: leg = x, hypotenuse = x√2
      if (inputType === 'leg') {
        shortLeg = value;
        hypotenuse = value * Math.sqrt(2);
        steps.push(`Given: leg = ${formatValue(value)}`);
        steps.push(`Step 1: Calculate hypotenuse = leg × √2`);
        steps.push(`Step 2: hypotenuse = ${formatValue(value)} × √2 = ${formatValue(value)} × 1.414 = ${formatValue(hypotenuse)}`);
        explanation = `In a 45-45-90 triangle, the legs are equal and the hypotenuse is √2 times the length of each leg.`;
      } else {
        hypotenuse = value;
        shortLeg = value / Math.sqrt(2);
        steps.push(`Given: hypotenuse = ${formatValue(value)}`);
        steps.push(`Step 1: Calculate leg = hypotenuse / √2`);
        steps.push(`Step 2: leg = ${formatValue(value)} / √2 = ${formatValue(value)} / 1.414 = ${formatValue(shortLeg)}`);
        explanation = `In a 45-45-90 triangle, the leg equals the hypotenuse divided by √2.`;
      }
      longLeg = undefined;
      angles = { angleA: 45, angleB: 45, angleC: 90 };
    } else {
      // 30-60-90 triangle: short leg = x, long leg = x√3, hypotenuse = 2x
      if (inputType === 'shortLeg') {
        shortLeg = value;
        longLeg = value * Math.sqrt(3);
        hypotenuse = 2 * value;
        steps.push(`Given: short leg = ${formatValue(value)}`);
        steps.push(`Step 1: Calculate long leg = short leg × √3`);
        steps.push(`Step 2: long leg = ${formatValue(value)} × √3 = ${formatValue(value)} × 1.732 = ${formatValue(longLeg)}`);
        steps.push(`Step 3: Calculate hypotenuse = 2 × short leg`);
        steps.push(`Step 4: hypotenuse = 2 × ${formatValue(value)} = ${formatValue(hypotenuse)}`);
        explanation = `In a 30-60-90 triangle, if the short leg is x, then the long leg is x√3 and the hypotenuse is 2x.`;
      } else if (inputType === 'longLeg') {
        longLeg = value;
        shortLeg = value / Math.sqrt(3);
        hypotenuse = 2 * shortLeg;
        steps.push(`Given: long leg = ${formatValue(value)}`);
        steps.push(`Step 1: Calculate short leg = long leg / √3`);
        steps.push(`Step 2: short leg = ${formatValue(value)} / √3 = ${formatValue(value)} / 1.732 = ${formatValue(shortLeg)}`);
        steps.push(`Step 3: Calculate hypotenuse = 2 × short leg`);
        steps.push(`Step 4: hypotenuse = 2 × ${formatValue(shortLeg)} = ${formatValue(hypotenuse)}`);
        explanation = `In a 30-60-90 triangle, if the long leg is x√3, then the short leg is x and the hypotenuse is 2x.`;
      } else {
        hypotenuse = value;
        shortLeg = value / 2;
        longLeg = shortLeg * Math.sqrt(3);
        steps.push(`Given: hypotenuse = ${formatValue(value)}`);
        steps.push(`Step 1: Calculate short leg = hypotenuse / 2`);
        steps.push(`Step 2: short leg = ${formatValue(value)} / 2 = ${formatValue(shortLeg)}`);
        steps.push(`Step 3: Calculate long leg = short leg × √3`);
        steps.push(`Step 4: long leg = ${formatValue(shortLeg)} × √3 = ${formatValue(shortLeg)} × 1.732 = ${formatValue(longLeg)}`);
        explanation = `In a 30-60-90 triangle, if the hypotenuse is 2x, then the short leg is x and the long leg is x√3.`;
      }
      angles = { angleA: 30, angleB: 60, angleC: 90 };
    }

    // Calculate area and perimeter
    const area = triangleType === '45-45-90' 
      ? (shortLeg * shortLeg) / 2
      : (shortLeg * longLeg!) / 2;
    const perimeter = triangleType === '45-45-90'
      ? 2 * shortLeg + hypotenuse
      : shortLeg + longLeg! + hypotenuse;

    if (triangleType === '45-45-90') {
      steps.push(`Step 3: Calculate area = (leg²) / 2`);
      steps.push(`Step 4: area = (${formatValue(shortLeg)}²) / 2 = ${formatValue(shortLeg * shortLeg)} / 2 = ${formatValue(area)}`);
      steps.push(`Step 5: Calculate perimeter = 2 × leg + hypotenuse`);
      steps.push(`Step 6: perimeter = 2 × ${formatValue(shortLeg)} + ${formatValue(hypotenuse)} = ${formatValue(perimeter)}`);
    } else {
      steps.push(`Step 5: Calculate area = (short leg × long leg) / 2`);
      steps.push(`Step 6: area = (${formatValue(shortLeg)} × ${formatValue(longLeg!)}) / 2 = ${formatValue(shortLeg * longLeg!)} / 2 = ${formatValue(area)}`);
      steps.push(`Step 7: Calculate perimeter = short leg + long leg + hypotenuse`);
      steps.push(`Step 8: perimeter = ${formatValue(shortLeg)} + ${formatValue(longLeg!)} + ${formatValue(hypotenuse)} = ${formatValue(perimeter)}`);
    }

    setResult({
      shortLeg,
      longLeg,
      hypotenuse,
      area,
      perimeter,
      triangleType,
      inputType,
      explanation,
      steps,
      angles
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

  const getInputOptions = () => {
    if (triangleType === '45-45-90') {
      return [
        { value: 'leg', label: 'Leg (equal sides)' },
        { value: 'hypotenuse', label: 'Hypotenuse' }
      ];
    } else {
      return [
        { value: 'shortLeg', label: 'Short Leg (opposite 30°)' },
        { value: 'longLeg', label: 'Long Leg (opposite 60°)' },
        { value: 'hypotenuse', label: 'Hypotenuse (opposite 90°)' }
      ];
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Right Triangles Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate sides, area, and perimeter for 45-45-90 and 30-60-90 special right triangles using special ratios.</p>
          </>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Triangle Type
            </label>
            <select
              value={triangleType}
              onChange={(e) => {
                const newType = e.target.value as '45-45-90' | '30-60-90';
                setTriangleType(newType);
                setInputType(newType === '45-45-90' ? 'leg' : 'shortLeg');
                setResult(null);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="45-45-90">45-45-90 Triangle (Isosceles Right)</option>
              <option value="30-60-90">30-60-90 Triangle</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Known Side
            </label>
            <select
              value={inputType}
              onChange={(e) => {
                setInputType(e.target.value);
                setResult(null);
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {getInputOptions().map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <Input
              label={`Enter ${getInputOptions().find(opt => opt.value === inputType)?.label || 'value'}`}
              type="text"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
                  setInputValue(value);
                }
              }}
              placeholder="Enter length"
              autoFocus
            />
          </div>

          <Button 
            onClick={calculateTriangle}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate {triangleType} Triangle
          </Button>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-lg animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                {result.triangleType} Triangle Results
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Sides:</p>
                  <div className="space-y-1 font-mono">
                    {result.triangleType === '45-45-90' ? (
                      <>
                        <p>Leg = {formatValue(result.shortLeg!)}</p>
                        <p>Hypotenuse = {formatValue(result.hypotenuse)}</p>
                      </>
                    ) : (
                      <>
                        <p>Short Leg = {formatValue(result.shortLeg!)}</p>
                        <p>Long Leg = {formatValue(result.longLeg!)}</p>
                        <p>Hypotenuse = {formatValue(result.hypotenuse)}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Angles:</p>
                  <div className="space-y-1 font-mono">
                    <p>Angle A = {result.angles.angleA}°</p>
                    <p>Angle B = {result.angles.angleB}°</p>
                    <p>Angle C = {result.angles.angleC}°</p>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Properties:</p>
                  <div className="space-y-1 font-mono">
                    <p>Area = {formatValue(result.area)}</p>
                    <p>Perimeter = {formatValue(result.perimeter)}</p>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
                  <p className="text-gray-600">{result.explanation}</p>
                </div>

                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Calculation Steps:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {result.steps.map((step, index) => (
                      <li key={index} className="text-gray-700 font-mono text-xs">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

