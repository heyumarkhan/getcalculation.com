'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface HeightOfTriangleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface HeightOfTriangleResult {
  height: number;
  base: number;
  area: number;
  method: string;
  explanation: string;
  steps: string[];
  sideA?: number;
  sideB?: number;
  sideC?: number;
}

export default function HeightOfTriangleCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: HeightOfTriangleCalculatorProps) {
  const [base, setBase] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [angle, setAngle] = useState<string>('');
  const [result, setResult] = useState<HeightOfTriangleResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateHeight = () => {
    const baseVal = parseFloat(base) || 0;
    const areaVal = parseFloat(area) || 0;
    const sideAVal = parseFloat(sideA) || 0;
    const sideBVal = parseFloat(sideB) || 0;
    const sideCVal = parseFloat(sideC) || 0;
    const angleVal = parseFloat(angle) || 0;

    let finalHeight = 0;
    let finalBase = baseVal;
    let finalArea = areaVal;
    let method = '';
    const steps: string[] = [];

    // Count provided values
    const providedValues = {
      base: baseVal > 0,
      area: areaVal > 0,
      sideA: sideAVal > 0,
      sideB: sideBVal > 0,
      sideC: sideCVal > 0,
      angle: angleVal > 0
    };

    const count = Object.values(providedValues).filter(Boolean).length;

    if (count < 2) {
      alert('Please provide at least 2 values (e.g., base and area, or three sides)');
      return;
    }

    // Case 1: Base and Area provided (simplest case)
    if (providedValues.base && providedValues.area) {
      finalBase = baseVal;
      finalArea = areaVal;
      
      if (finalBase <= 0) {
        alert('Base must be greater than zero');
        return;
      }
      
      // Height = 2 × Area / Base
      finalHeight = (2 * finalArea) / finalBase;
      
      method = 'Base and Area';
      steps.push(`Given: Base = ${finalBase}, Area = ${finalArea}`);
      steps.push(`Step 1: Use the formula: Height = 2 × Area / Base`);
      steps.push(`Step 2: Height = 2 × ${finalArea} / ${finalBase}`);
      steps.push(`Step 3: Height = ${(2 * finalArea).toFixed(6)} / ${finalBase} = ${finalHeight.toFixed(6)}`);
    }
    // Case 2: Three sides provided (using Heron's formula)
    else if (providedValues.sideA && providedValues.sideB && providedValues.sideC) {
      const a = sideAVal;
      const b = sideBVal;
      const c = sideCVal;
      
      // Check if triangle is valid (Triangle Inequality Theorem)
      const isValidTriangle = (a + b > c) && (a + c > b) && (b + c > a);
      
      if (!isValidTriangle) {
        alert('Invalid triangle: The sum of any two sides must be greater than the third side');
        return;
      }
      
      // Calculate semi-perimeter
      const semiPerimeter = (a + b + c) / 2;
      
      // Apply Heron's formula to find area
      finalArea = Math.sqrt(semiPerimeter * (semiPerimeter - a) * (semiPerimeter - b) * (semiPerimeter - c));
      
      // Determine which side is the base (use the longest side as base, or use provided base)
      if (providedValues.base) {
        finalBase = baseVal;
      } else {
        // Use the longest side as base
        finalBase = Math.max(a, b, c);
      }
      
      // Calculate height: Height = 2 × Area / Base
      finalHeight = (2 * finalArea) / finalBase;
      
      method = 'Three Sides (Heron\'s Formula)';
      steps.push(`Given: Side A = ${a}, Side B = ${b}, Side C = ${c}`);
      steps.push(`Step 1: Calculate semi-perimeter: s = (a + b + c) / 2`);
      steps.push(`Step 2: s = (${a} + ${b} + ${c}) / 2 = ${semiPerimeter}`);
      steps.push(`Step 3: Apply Heron's formula to find area`);
      steps.push(`Step 4: Area = √[s(s-a)(s-b)(s-c)]`);
      steps.push(`Step 5: Area = √[${semiPerimeter}(${semiPerimeter - a})(${semiPerimeter - b})(${semiPerimeter - c})]`);
      steps.push(`Step 6: Area = √[${semiPerimeter} × ${(semiPerimeter - a).toFixed(4)} × ${(semiPerimeter - b).toFixed(4)} × ${(semiPerimeter - c).toFixed(4)}] = ${finalArea.toFixed(6)}`);
      steps.push(`Step 7: Calculate height: Height = 2 × Area / Base`);
      steps.push(`Step 8: Height = 2 × ${finalArea.toFixed(6)} / ${finalBase} = ${finalHeight.toFixed(6)}`);
    }
    // Case 3: Base, one side, and angle provided (trigonometry)
    else if (providedValues.base && (providedValues.sideA || providedValues.sideB) && providedValues.angle) {
      const side = providedValues.sideA ? sideAVal : sideBVal;
      finalBase = baseVal;
      
      if (angleVal <= 0 || angleVal >= 180) {
        alert('Angle must be between 0° and 180°');
        return;
      }
      
      // Height = side × sin(angle)
      finalHeight = side * Math.sin(angleVal * Math.PI / 180);
      
      // Calculate area: Area = (1/2) × base × height
      finalArea = (finalBase * finalHeight) / 2;
      
      method = 'Base, Side, and Angle (Trigonometry)';
      steps.push(`Given: Base = ${finalBase}, Side = ${side}, Angle = ${angleVal}°`);
      steps.push(`Step 1: Use trigonometry: Height = Side × sin(Angle)`);
      steps.push(`Step 2: Height = ${side} × sin(${angleVal}°)`);
      steps.push(`Step 3: Height = ${side} × ${Math.sin(angleVal * Math.PI / 180).toFixed(6)} = ${finalHeight.toFixed(6)}`);
      steps.push(`Step 4: Calculate area: Area = (1/2) × Base × Height`);
      steps.push(`Step 5: Area = (1/2) × ${finalBase} × ${finalHeight.toFixed(6)} = ${finalArea.toFixed(6)}`);
    }
    // Case 4: Two sides and base (for isosceles or scalene triangle)
    else if (providedValues.base && (providedValues.sideA || providedValues.sideB)) {
      const side = providedValues.sideA ? sideAVal : sideBVal;
      finalBase = baseVal;
      
      // For isosceles triangle: height = √(side² - (base/2)²)
      // For general triangle, we need the third side or use approximation
      if (providedValues.sideC) {
        // Use Heron's formula
        const a = providedValues.sideA ? sideAVal : sideBVal;
        const b = providedValues.sideA ? sideBVal : sideAVal;
        const c = sideCVal;
        
        const isValidTriangle = (a + b > c) && (a + c > b) && (b + c > a);
        
        if (!isValidTriangle) {
          alert('Invalid triangle: The sum of any two sides must be greater than the third side');
          return;
        }
        
        const semiPerimeter = (a + b + c) / 2;
        finalArea = Math.sqrt(semiPerimeter * (semiPerimeter - a) * (semiPerimeter - b) * (semiPerimeter - c));
        finalHeight = (2 * finalArea) / finalBase;
        
        method = 'Two Sides and Base (Heron\'s Formula)';
        steps.push(`Given: Base = ${finalBase}, Side A = ${a}, Side B = ${b}, Side C = ${c}`);
        steps.push(`Step 1: Calculate semi-perimeter: s = (a + b + c) / 2 = ${semiPerimeter}`);
        steps.push(`Step 2: Apply Heron's formula to find area`);
        steps.push(`Step 3: Area = √[${semiPerimeter}(${semiPerimeter - a})(${semiPerimeter - b})(${semiPerimeter - c})] = ${finalArea.toFixed(6)}`);
        steps.push(`Step 4: Height = 2 × Area / Base = 2 × ${finalArea.toFixed(6)} / ${finalBase} = ${finalHeight.toFixed(6)}`);
      } else {
        // Assume isosceles triangle (two equal sides)
        const halfBase = finalBase / 2;
        finalHeight = Math.sqrt(side * side - halfBase * halfBase);
        
        if (isNaN(finalHeight) || finalHeight <= 0) {
          alert('Invalid triangle: The base cannot be longer than 2 × side length');
          return;
        }
        
        finalArea = (finalBase * finalHeight) / 2;
        
        method = 'Base and Equal Side (Pythagorean Theorem)';
        steps.push(`Given: Base = ${finalBase}, Equal Side = ${side}`);
        steps.push(`Step 1: For isosceles triangle, use Pythagorean theorem`);
        steps.push(`Step 2: Height = √(Side² - (Base/2)²)`);
        steps.push(`Step 3: Height = √(${side}² - (${finalBase}/2)²)`);
        steps.push(`Step 4: Height = √(${side * side} - ${halfBase * halfBase}) = ${finalHeight.toFixed(6)}`);
        steps.push(`Step 5: Area = (1/2) × Base × Height = (1/2) × ${finalBase} × ${finalHeight.toFixed(6)} = ${finalArea.toFixed(6)}`);
      }
    }
    else {
      alert('Please provide a valid combination: (Base and Area), (Three Sides), (Base, Side, and Angle), or (Base and Two Sides)');
      return;
    }

    // Generate explanation
    const explanation = `The height of the triangle is ${finalHeight.toFixed(4)} units. This was calculated using the ${method.toLowerCase()} method. The triangle has a base of ${finalBase.toFixed(4)} units and an area of ${finalArea.toFixed(4)} square units.`;

    setResult({
      height: finalHeight,
      base: finalBase,
      area: finalArea,
      method,
      explanation,
      steps,
      sideA: providedValues.sideA ? sideAVal : undefined,
      sideB: providedValues.sideB ? sideBVal : undefined,
      sideC: providedValues.sideC ? sideCVal : undefined
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Height of a Triangle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the height of any triangle using multiple methods with step-by-step solutions:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Known Values</h3>
            <p className="text-sm text-gray-600 mb-4">
              Provide at least 2 values. Common combinations: Base and Area, or Three Sides.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Base (b)"
                type="number"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                placeholder="Enter base length"
                step="any"
                min="0"
              />
              <Input
                label="Area (A)"
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Enter area"
                step="any"
                min="0"
              />
              <Input
                label="Side A"
                type="number"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                placeholder="Enter side A length"
                step="any"
                min="0"
              />
              <Input
                label="Side B"
                type="number"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                placeholder="Enter side B length"
                step="any"
                min="0"
              />
              <Input
                label="Side C"
                type="number"
                value={sideC}
                onChange={(e) => setSideC(e.target.value)}
                placeholder="Enter side C length"
                step="any"
                min="0"
              />
              <Input
                label="Angle (degrees)"
                type="number"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                placeholder="Enter angle"
                step="any"
                min="0"
                max="180"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button
              onClick={calculateHeight}
              className="custom-color-button"
              style={colors.customStyles?.button}
            >
              Calculate Height
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main Result */}
              <div 
                className="p-6 rounded-lg border-2"
                style={colors.customStyles?.resultBg}
              >
                <h3 className="text-xl font-bold mb-4" style={colors.customStyles?.result}>
                  Triangle Height Results
                </h3>
                
                <div className="bg-white p-4 rounded border mb-4">
                  <p className="font-semibold text-gray-700 mb-2">Method Used:</p>
                  <p className="text-lg font-bold text-green-600">{result.method}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="text-2xl font-bold" style={colors.customStyles?.resultText}>
                      {formatValue(result.height)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">units</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Base</p>
                    <p className="text-lg font-semibold">{formatValue(result.base)}</p>
                    <p className="text-xs text-gray-500 mt-1">units</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="text-lg font-semibold">{formatValue(result.area)}</p>
                    <p className="text-xs text-gray-500 mt-1">square units</p>
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="text-lg font-semibold text-yellow-700 mb-2">Explanation</h4>
                <p className="text-yellow-800">{result.explanation}</p>
              </div>

              {/* Step-by-Step Solution */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Step-by-Step Solution</h4>
                <ol className="space-y-2">
                  {result.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

