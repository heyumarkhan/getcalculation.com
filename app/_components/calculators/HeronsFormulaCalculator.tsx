'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface HeronsFormulaCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface HeronsFormulaResult {
  area: number;
  semiPerimeter: number;
  calculation: string;
  isValidTriangle: boolean;
  sides: number[];
}

export default function HeronsFormulaCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: HeronsFormulaCalculatorProps) {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [result, setResult] = useState<HeronsFormulaResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateArea = () => {
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;

    if (a <= 0 || b <= 0 || c <= 0) {
      alert('All sides must be greater than zero');
      return;
    }

    // Check if triangle is valid (Triangle Inequality Theorem)
    const isValidTriangle = (a + b > c) && (a + c > b) && (b + c > a);
    
    if (!isValidTriangle) {
      alert('Invalid triangle: The sum of any two sides must be greater than the third side');
      return;
    }

    // Calculate semi-perimeter
    const semiPerimeter = (a + b + c) / 2;
    
    // Apply Heron's formula: Area = √[s(s-a)(s-b)(s-c)]
    const area = Math.sqrt(semiPerimeter * (semiPerimeter - a) * (semiPerimeter - b) * (semiPerimeter - c));
    
    // Create calculation string
    const calculation = `√[${semiPerimeter}(${semiPerimeter}-${a})(${semiPerimeter}-${b})(${semiPerimeter}-${c})] = √[${semiPerimeter}×${(semiPerimeter - a).toFixed(2)}×${(semiPerimeter - b).toFixed(2)}×${(semiPerimeter - c).toFixed(2)}] = ${area.toFixed(4)}`;

    setResult({
      area,
      semiPerimeter,
      calculation,
      isValidTriangle,
      sides: [a, b, c]
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'sideA':
        setSideA(value);
        break;
      case 'sideB':
        setSideB(value);
        break;
      case 'sideC':
        setSideC(value);
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
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Heron&apos;s Formula Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the area of a triangle using the lengths of all three sides:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Triangle Sides */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Triangle Sides</h3>
          <div className="space-y-3">
            <Input
              label="Side A"
              type="text"
              value={sideA}
              onChange={(e) => handleInputChange('sideA', e.target.value)}
              placeholder="Enter length of side A"
              autoFocus
            />
            <Input
              label="Side B"
              type="text"
              value={sideB}
              onChange={(e) => handleInputChange('sideB', e.target.value)}
              placeholder="Enter length of side B"
            />
            <Input
              label="Side C"
              type="text"
              value={sideC}
              onChange={(e) => handleInputChange('sideC', e.target.value)}
              placeholder="Enter length of side C"
            />
          </div>
        </div>

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
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Heron&apos;s Formula Result
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Triangle Area:</p>
                <p className="font-mono text-2xl font-bold">{formatValue(result.area)} square units</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Semi-perimeter (s):</p>
                <p className="font-mono text-lg">{formatValue(result.semiPerimeter)} units</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Triangle Sides:</p>
                <p className="font-mono">A = {result.sides[0]}, B = {result.sides[1]}, C = {result.sides[2]}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Calculation:</p>
                <p className="font-mono text-xs break-all">{result.calculation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
