'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface RightTriangleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface RightTriangleResult {
  sideA: number;
  sideB: number;
  sideC: number; // hypotenuse
  angleA: number;
  angleB: number;
  angleC: number; // 90 degrees
  area: number;
  perimeter: number;
  method: string;
  steps: string[];
}

export default function RightTriangleCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: RightTriangleCalculatorProps) {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [angleA, setAngleA] = useState<string>('');
  const [angleB, setAngleB] = useState<string>('');
  const [result, setResult] = useState<RightTriangleResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateRightTriangle = () => {
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;
    const angleAValue = parseFloat(angleA) || 0;
    const angleBValue = parseFloat(angleB) || 0;

    let finalSideA = a;
    let finalSideB = b;
    let finalSideC = c;
    let finalAngleA = angleAValue;
    let finalAngleB = angleBValue;
    const finalAngleC = 90; // Right angle
    let method = '';
    const steps: string[] = [];

    // Count how many sides and angles we have
    const sidesProvided = [a, b, c].filter(val => val > 0).length;
    const anglesProvided = [angleAValue, angleBValue].filter(val => val > 0).length;

    if (sidesProvided < 2 && anglesProvided === 0) {
      alert('Please provide at least 2 sides or 1 side and 1 angle');
      return;
    }

    // Case 1: Two sides provided (Pythagorean theorem)
    if (sidesProvided === 2) {
      if (a > 0 && b > 0) {
        // Two legs provided
        finalSideA = a;
        finalSideB = b;
        finalSideC = Math.sqrt(a * a + b * b);
        method = 'Pythagorean Theorem (two legs)';
        steps.push(`Given: a = ${a}, b = ${b}`);
        steps.push(`Using Pythagorean theorem: c² = a² + b²`);
        steps.push(`c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}`);
        steps.push(`c = √${a * a + b * b} = ${finalSideC.toFixed(6)}`);
      } else if (a > 0 && c > 0) {
        // One leg and hypotenuse
        finalSideA = a;
        finalSideC = c;
        finalSideB = Math.sqrt(c * c - a * a);
        method = 'Pythagorean Theorem (leg and hypotenuse)';
        steps.push(`Given: a = ${a}, c = ${c}`);
        steps.push(`Using Pythagorean theorem: b² = c² - a²`);
        steps.push(`b² = ${c}² - ${a}² = ${c * c} - ${a * a} = ${c * c - a * a}`);
        steps.push(`b = √${c * c - a * a} = ${finalSideB.toFixed(6)}`);
      } else if (b > 0 && c > 0) {
        // One leg and hypotenuse
        finalSideB = b;
        finalSideC = c;
        finalSideA = Math.sqrt(c * c - b * b);
        method = 'Pythagorean Theorem (leg and hypotenuse)';
        steps.push(`Given: b = ${b}, c = ${c}`);
        steps.push(`Using Pythagorean theorem: a² = c² - b²`);
        steps.push(`a² = ${c}² - ${b}² = ${c * c} - ${b * b} = ${c * c - b * b}`);
        steps.push(`a = √${c * c - b * b} = ${finalSideA.toFixed(6)}`);
      }
    }

    // Case 2: One side and one angle provided (trigonometry)
    if (sidesProvided === 1 && anglesProvided === 1) {
      
      if (a > 0 && angleAValue > 0) {
        finalSideA = a;
        finalAngleA = angleAValue;
        // Calculate other sides using trigonometry
        if (angleAValue < 90) {
          finalSideB = a * Math.tan((angleAValue * Math.PI) / 180);
          finalSideC = a / Math.cos((angleAValue * Math.PI) / 180);
          method = 'Trigonometry (side and angle)';
          steps.push(`Given: a = ${a}, ∠A = ${angleAValue}°`);
          steps.push(`Using tangent: tan(∠A) = b/a, so b = a × tan(∠A)`);
          steps.push(`b = ${a} × tan(${angleAValue}°) = ${a} × ${Math.tan((angleAValue * Math.PI) / 180).toFixed(6)} = ${finalSideB.toFixed(6)}`);
          steps.push(`Using cosine: cos(∠A) = a/c, so c = a/cos(∠A)`);
          steps.push(`c = ${a}/cos(${angleAValue}°) = ${a}/${Math.cos((angleAValue * Math.PI) / 180).toFixed(6)} = ${finalSideC.toFixed(6)}`);
        }
      } else if (b > 0 && angleBValue > 0) {
        finalSideB = b;
        finalAngleB = angleBValue;
        // Calculate other sides using trigonometry
        if (angleBValue < 90) {
          finalSideA = b * Math.tan((angleBValue * Math.PI) / 180);
          finalSideC = b / Math.cos((angleBValue * Math.PI) / 180);
          method = 'Trigonometry (side and angle)';
          steps.push(`Given: b = ${b}, ∠B = ${angleBValue}°`);
          steps.push(`Using tangent: tan(∠B) = a/b, so a = b × tan(∠B)`);
          steps.push(`a = ${b} × tan(${angleBValue}°) = ${b} × ${Math.tan((angleBValue * Math.PI) / 180).toFixed(6)} = ${finalSideA.toFixed(6)}`);
          steps.push(`Using cosine: cos(∠B) = b/c, so c = b/cos(∠B)`);
          steps.push(`c = ${b}/cos(${angleBValue}°) = ${b}/${Math.cos((angleBValue * Math.PI) / 180).toFixed(6)} = ${finalSideC.toFixed(6)}`);
        }
      } else if (c > 0 && (angleAValue > 0 || angleBValue > 0)) {
        finalSideC = c;
        if (angleAValue > 0) {
          finalAngleA = angleAValue;
          finalSideA = c * Math.sin((angleAValue * Math.PI) / 180);
          finalSideB = c * Math.cos((angleAValue * Math.PI) / 180);
          method = 'Trigonometry (hypotenuse and angle)';
          steps.push(`Given: c = ${c}, ∠A = ${angleAValue}°`);
          steps.push(`Using sine: sin(∠A) = a/c, so a = c × sin(∠A)`);
          steps.push(`a = ${c} × sin(${angleAValue}°) = ${c} × ${Math.sin((angleAValue * Math.PI) / 180).toFixed(6)} = ${finalSideA.toFixed(6)}`);
          steps.push(`Using cosine: cos(∠A) = b/c, so b = c × cos(∠A)`);
          steps.push(`b = ${c} × cos(${angleAValue}°) = ${c} × ${Math.cos((angleAValue * Math.PI) / 180).toFixed(6)} = ${finalSideB.toFixed(6)}`);
        } else {
          finalAngleB = angleBValue;
          finalSideB = c * Math.sin((angleBValue * Math.PI) / 180);
          finalSideA = c * Math.cos((angleBValue * Math.PI) / 180);
          method = 'Trigonometry (hypotenuse and angle)';
          steps.push(`Given: c = ${c}, ∠B = ${angleBValue}°`);
          steps.push(`Using sine: sin(∠B) = b/c, so b = c × sin(∠B)`);
          steps.push(`b = ${c} × sin(${angleBValue}°) = ${c} × ${Math.sin((angleBValue * Math.PI) / 180).toFixed(6)} = ${finalSideB.toFixed(6)}`);
          steps.push(`Using cosine: cos(∠B) = a/c, so a = c × cos(∠B)`);
          steps.push(`a = ${c} × cos(${angleBValue}°) = ${c} × ${Math.cos((angleBValue * Math.PI) / 180).toFixed(6)} = ${finalSideA.toFixed(6)}`);
        }
      }
    }

    // Calculate remaining angles
    if (finalAngleA === 0 && finalSideA > 0 && finalSideC > 0) {
      finalAngleA = Math.asin(finalSideA / finalSideC) * (180 / Math.PI);
    }
    if (finalAngleB === 0 && finalSideB > 0 && finalSideC > 0) {
      finalAngleB = Math.asin(finalSideB / finalSideC) * (180 / Math.PI);
    }
    if (finalAngleA === 0 && finalAngleB > 0) {
      finalAngleA = 90 - finalAngleB;
    }
    if (finalAngleB === 0 && finalAngleA > 0) {
      finalAngleB = 90 - finalAngleA;
    }

    // Calculate area and perimeter
    const area = (finalSideA * finalSideB) / 2;
    const perimeter = finalSideA + finalSideB + finalSideC;

    setResult({
      sideA: finalSideA,
      sideB: finalSideB,
      sideC: finalSideC,
      angleA: finalAngleA,
      angleB: finalAngleB,
      angleC: finalAngleC,
      area,
      perimeter,
      method,
      steps
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
      case 'angleA':
        setAngleA(value);
        break;
      case 'angleB':
        setAngleB(value);
        break;
      default:
        break;
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
      <Card className="max-w-4xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Right Triangle Side and Angle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate missing sides and angles in a right triangle using the Pythagorean theorem and trigonometry:</p>
          </>
        )}
      
      <div className="space-y-6">
        {/* Input Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Known Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Side A (leg)"
              type="text"
              value={sideA}
              onChange={(e) => handleInputChange('sideA', e.target.value)}
              placeholder="Enter length"
            />
            <Input
              label="Side B (leg)"
              type="text"
              value={sideB}
              onChange={(e) => handleInputChange('sideB', e.target.value)}
              placeholder="Enter length"
            />
            <Input
              label="Side C (hypotenuse)"
              type="text"
              value={sideC}
              onChange={(e) => handleInputChange('sideC', e.target.value)}
              placeholder="Enter length"
            />
            <Input
              label="Angle A (degrees)"
              type="text"
              value={angleA}
              onChange={(e) => handleInputChange('angleA', e.target.value)}
              placeholder="Enter angle"
            />
            <Input
              label="Angle B (degrees)"
              type="text"
              value={angleB}
              onChange={(e) => handleInputChange('angleB', e.target.value)}
              placeholder="Enter angle"
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            <strong>Note:</strong> Provide at least 2 sides OR 1 side and 1 angle. Angle C is always 90°.
          </p>
        </div>

        <Button 
          onClick={calculateRightTriangle}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Right Triangle
        </Button>

        {result !== null && (
          <div 
            className={`mt-6 p-6 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Right Triangle Solution
            </h3>
            
            {/* Method Used */}
            <div className="bg-white p-4 rounded border mb-4">
              <p className="font-semibold text-gray-700 mb-2">Method Used:</p>
              <p className="text-lg font-bold text-green-600">{result.method}</p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Side A (leg):</p>
                <p className="font-mono text-xl font-bold">{formatValue(result.sideA)}</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Side B (leg):</p>
                <p className="font-mono text-xl font-bold">{formatValue(result.sideB)}</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Side C (hypotenuse):</p>
                <p className="font-mono text-xl font-bold">{formatValue(result.sideC)}</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Angle A:</p>
                <p className="font-mono text-lg">{formatValue(result.angleA)}°</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Angle B:</p>
                <p className="font-mono text-lg">{formatValue(result.angleB)}°</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Angle C:</p>
                <p className="font-mono text-lg">{result.angleC}°</p>
              </div>
            </div>

            {/* Additional Properties */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Area:</p>
                <p className="font-mono text-lg font-bold">{formatValue(result.area)} square units</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Perimeter:</p>
                <p className="font-mono text-lg font-bold">{formatValue(result.perimeter)} units</p>
              </div>
            </div>

            {/* Step-by-step Solution */}
            {result.steps.length > 0 && (
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-3">Step-by-step Solution:</p>
                <div className="space-y-2">
                  {result.steps.map((step, index) => (
                    <p key={index} className="text-sm font-mono bg-gray-50 p-2 rounded">
                      {index + 1}. {step}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
