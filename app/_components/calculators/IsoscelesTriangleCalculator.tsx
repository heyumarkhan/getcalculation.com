'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface IsoscelesTriangleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface IsoscelesTriangleResult {
  equalSide: number;
  base: number;
  height: number;
  area: number;
  perimeter: number;
  baseAngle: number;
  vertexAngle: number;
  method: string;
  explanation: string;
  steps: string[];
}

export default function IsoscelesTriangleCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: IsoscelesTriangleCalculatorProps) {
  const [equalSide, setEqualSide] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [baseAngle, setBaseAngle] = useState<string>('');
  const [vertexAngle, setVertexAngle] = useState<string>('');
  const [result, setResult] = useState<IsoscelesTriangleResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateIsoscelesTriangle = () => {
    const equalSideVal = parseFloat(equalSide) || 0;
    const baseVal = parseFloat(base) || 0;
    const heightVal = parseFloat(height) || 0;
    const baseAngleVal = parseFloat(baseAngle) || 0;
    const vertexAngleVal = parseFloat(vertexAngle) || 0;

    let finalEqualSide = equalSideVal;
    let finalBase = baseVal;
    let finalHeight = heightVal;
    let finalBaseAngle = baseAngleVal;
    let finalVertexAngle = vertexAngleVal;
    let method = '';
    const steps: string[] = [];

    // Count provided values
    const providedValues = {
      equalSide: equalSideVal > 0,
      base: baseVal > 0,
      height: heightVal > 0,
      baseAngle: baseAngleVal > 0,
      vertexAngle: vertexAngleVal > 0
    };

    const count = Object.values(providedValues).filter(Boolean).length;

    if (count < 2) {
      alert('Please provide at least 2 values (e.g., two equal sides and base, or base and height)');
      return;
    }

    // Case 1: Two equal sides and base provided
    if (providedValues.equalSide && providedValues.base) {
      finalEqualSide = equalSideVal;
      finalBase = baseVal;
      
      // Calculate height using Pythagorean theorem
      // height = √(equalSide² - (base/2)²)
      const halfBase = finalBase / 2;
      finalHeight = Math.sqrt(finalEqualSide * finalEqualSide - halfBase * halfBase);
      
      if (isNaN(finalHeight) || finalHeight <= 0) {
        alert('Invalid triangle: The base cannot be longer than 2 × equal side');
        return;
      }

      // Calculate angles
      // Base angle using cosine: cos(angle) = (base/2) / equalSide
      finalBaseAngle = Math.acos(halfBase / finalEqualSide) * (180 / Math.PI);
      finalVertexAngle = 180 - 2 * finalBaseAngle;

      method = 'Two Equal Sides and Base';
      steps.push(`Given: Equal sides = ${finalEqualSide}, Base = ${finalBase}`);
      steps.push(`Step 1: Calculate height using Pythagorean theorem`);
      steps.push(`Step 2: height = √(equalSide² - (base/2)²)`);
      steps.push(`Step 3: height = √(${finalEqualSide}² - (${finalBase}/2)²)`);
      steps.push(`Step 4: height = √(${finalEqualSide * finalEqualSide} - ${halfBase * halfBase}) = ${finalHeight.toFixed(6)}`);
      steps.push(`Step 5: Calculate base angle: cos(angle) = (base/2) / equalSide`);
      steps.push(`Step 6: base angle = arccos(${halfBase} / ${finalEqualSide}) = ${finalBaseAngle.toFixed(6)}°`);
      steps.push(`Step 7: vertex angle = 180° - 2 × ${finalBaseAngle.toFixed(6)}° = ${finalVertexAngle.toFixed(6)}°`);
    }
    // Case 2: Base and height provided
    else if (providedValues.base && providedValues.height) {
      finalBase = baseVal;
      finalHeight = heightVal;
      
      // Calculate equal side using Pythagorean theorem
      // equalSide = √(height² + (base/2)²)
      const halfBase = finalBase / 2;
      finalEqualSide = Math.sqrt(finalHeight * finalHeight + halfBase * halfBase);
      
      // Calculate angles
      finalBaseAngle = Math.acos(halfBase / finalEqualSide) * (180 / Math.PI);
      finalVertexAngle = 180 - 2 * finalBaseAngle;

      method = 'Base and Height';
      steps.push(`Given: Base = ${finalBase}, Height = ${finalHeight}`);
      steps.push(`Step 1: Calculate equal side using Pythagorean theorem`);
      steps.push(`Step 2: equalSide = √(height² + (base/2)²)`);
      steps.push(`Step 3: equalSide = √(${finalHeight}² + (${finalBase}/2)²)`);
      steps.push(`Step 4: equalSide = √(${finalHeight * finalHeight} + ${halfBase * halfBase}) = ${finalEqualSide.toFixed(6)}`);
      steps.push(`Step 5: Calculate base angle: cos(angle) = (base/2) / equalSide`);
      steps.push(`Step 6: base angle = arccos(${halfBase} / ${finalEqualSide.toFixed(6)}) = ${finalBaseAngle.toFixed(6)}°`);
      steps.push(`Step 7: vertex angle = 180° - 2 × ${finalBaseAngle.toFixed(6)}° = ${finalVertexAngle.toFixed(6)}°`);
    }
    // Case 3: Equal side and height provided
    else if (providedValues.equalSide && providedValues.height) {
      finalEqualSide = equalSideVal;
      finalHeight = heightVal;
      
      // Calculate base using Pythagorean theorem
      // base/2 = √(equalSide² - height²)
      const halfBase = Math.sqrt(finalEqualSide * finalEqualSide - finalHeight * finalHeight);
      finalBase = 2 * halfBase;
      
      if (isNaN(finalBase) || finalBase <= 0) {
        alert('Invalid triangle: Height cannot be longer than equal side');
        return;
      }

      // Calculate angles
      finalBaseAngle = Math.acos(halfBase / finalEqualSide) * (180 / Math.PI);
      finalVertexAngle = 180 - 2 * finalBaseAngle;

      method = 'Equal Side and Height';
      steps.push(`Given: Equal side = ${finalEqualSide}, Height = ${finalHeight}`);
      steps.push(`Step 1: Calculate base using Pythagorean theorem`);
      steps.push(`Step 2: base/2 = √(equalSide² - height²)`);
      steps.push(`Step 3: base/2 = √(${finalEqualSide}² - ${finalHeight}²)`);
      steps.push(`Step 4: base/2 = √(${finalEqualSide * finalEqualSide} - ${finalHeight * finalHeight}) = ${halfBase.toFixed(6)}`);
      steps.push(`Step 5: base = 2 × ${halfBase.toFixed(6)} = ${finalBase.toFixed(6)}`);
      steps.push(`Step 6: Calculate base angle: cos(angle) = (base/2) / equalSide`);
      steps.push(`Step 7: base angle = arccos(${halfBase.toFixed(6)} / ${finalEqualSide}) = ${finalBaseAngle.toFixed(6)}°`);
      steps.push(`Step 8: vertex angle = 180° - 2 × ${finalBaseAngle.toFixed(6)}° = ${finalVertexAngle.toFixed(6)}°`);
    }
    // Case 4: Base and base angle provided
    else if (providedValues.base && providedValues.baseAngle) {
      finalBase = baseVal;
      finalBaseAngle = baseAngleVal;
      
      if (finalBaseAngle >= 90) {
        alert('Base angle must be less than 90°');
        return;
      }

      // Calculate equal side: equalSide = (base/2) / cos(baseAngle)
      const halfBase = finalBase / 2;
      finalEqualSide = halfBase / Math.cos(finalBaseAngle * Math.PI / 180);
      
      // Calculate height: height = equalSide × sin(baseAngle)
      finalHeight = finalEqualSide * Math.sin(finalBaseAngle * Math.PI / 180);
      
      // Calculate vertex angle
      finalVertexAngle = 180 - 2 * finalBaseAngle;

      method = 'Base and Base Angle';
      steps.push(`Given: Base = ${finalBase}, Base angle = ${finalBaseAngle}°`);
      steps.push(`Step 1: Calculate equal side: equalSide = (base/2) / cos(baseAngle)`);
      steps.push(`Step 2: equalSide = (${finalBase}/2) / cos(${finalBaseAngle}°)`);
      steps.push(`Step 3: equalSide = ${halfBase} / ${Math.cos(finalBaseAngle * Math.PI / 180).toFixed(6)} = ${finalEqualSide.toFixed(6)}`);
      steps.push(`Step 4: Calculate height: height = equalSide × sin(baseAngle)`);
      steps.push(`Step 5: height = ${finalEqualSide.toFixed(6)} × sin(${finalBaseAngle}°) = ${finalHeight.toFixed(6)}`);
      steps.push(`Step 6: vertex angle = 180° - 2 × ${finalBaseAngle}° = ${finalVertexAngle.toFixed(6)}°`);
    }
    // Case 5: Equal side and base angle provided
    else if (providedValues.equalSide && providedValues.baseAngle) {
      finalEqualSide = equalSideVal;
      finalBaseAngle = baseAngleVal;
      
      if (finalBaseAngle >= 90) {
        alert('Base angle must be less than 90°');
        return;
      }

      // Calculate base: base = 2 × equalSide × cos(baseAngle)
      finalBase = 2 * finalEqualSide * Math.cos(finalBaseAngle * Math.PI / 180);
      
      // Calculate height: height = equalSide × sin(baseAngle)
      finalHeight = finalEqualSide * Math.sin(finalBaseAngle * Math.PI / 180);
      
      // Calculate vertex angle
      finalVertexAngle = 180 - 2 * finalBaseAngle;

      method = 'Equal Side and Base Angle';
      steps.push(`Given: Equal side = ${finalEqualSide}, Base angle = ${finalBaseAngle}°`);
      steps.push(`Step 1: Calculate base: base = 2 × equalSide × cos(baseAngle)`);
      steps.push(`Step 2: base = 2 × ${finalEqualSide} × cos(${finalBaseAngle}°)`);
      steps.push(`Step 3: base = 2 × ${finalEqualSide} × ${Math.cos(finalBaseAngle * Math.PI / 180).toFixed(6)} = ${finalBase.toFixed(6)}`);
      steps.push(`Step 4: Calculate height: height = equalSide × sin(baseAngle)`);
      steps.push(`Step 5: height = ${finalEqualSide} × sin(${finalBaseAngle}°) = ${finalHeight.toFixed(6)}`);
      steps.push(`Step 6: vertex angle = 180° - 2 × ${finalBaseAngle}° = ${finalVertexAngle.toFixed(6)}°`);
    }
    // Case 6: Equal side and vertex angle provided
    else if (providedValues.equalSide && providedValues.vertexAngle) {
      finalEqualSide = equalSideVal;
      finalVertexAngle = vertexAngleVal;
      
      if (finalVertexAngle >= 180) {
        alert('Vertex angle must be less than 180°');
        return;
      }

      // Calculate base angle
      finalBaseAngle = (180 - finalVertexAngle) / 2;
      
      // Calculate base: base = 2 × equalSide × cos(baseAngle)
      finalBase = 2 * finalEqualSide * Math.cos(finalBaseAngle * Math.PI / 180);
      
      // Calculate height: height = equalSide × sin(baseAngle)
      finalHeight = finalEqualSide * Math.sin(finalBaseAngle * Math.PI / 180);

      method = 'Equal Side and Vertex Angle';
      steps.push(`Given: Equal side = ${finalEqualSide}, Vertex angle = ${finalVertexAngle}°`);
      steps.push(`Step 1: Calculate base angle: baseAngle = (180° - vertexAngle) / 2`);
      steps.push(`Step 2: baseAngle = (180° - ${finalVertexAngle}°) / 2 = ${finalBaseAngle.toFixed(6)}°`);
      steps.push(`Step 3: Calculate base: base = 2 × equalSide × cos(baseAngle)`);
      steps.push(`Step 4: base = 2 × ${finalEqualSide} × cos(${finalBaseAngle.toFixed(6)}°) = ${finalBase.toFixed(6)}`);
      steps.push(`Step 5: Calculate height: height = equalSide × sin(baseAngle)`);
      steps.push(`Step 6: height = ${finalEqualSide} × sin(${finalBaseAngle.toFixed(6)}°) = ${finalHeight.toFixed(6)}`);
    }
    else {
      alert('Please provide a valid combination of values (e.g., two equal sides and base, or base and height)');
      return;
    }

    // Calculate area and perimeter
    const area = (finalBase * finalHeight) / 2;
    const perimeter = 2 * finalEqualSide + finalBase;

    // Generate explanation
    const explanation = `An isosceles triangle has two equal sides of length ${finalEqualSide.toFixed(4)} and a base of length ${finalBase.toFixed(4)}. The base angles are ${finalBaseAngle.toFixed(2)}° each, and the vertex angle is ${finalVertexAngle.toFixed(2)}°.`;

    setResult({
      equalSide: finalEqualSide,
      base: finalBase,
      height: finalHeight,
      area,
      perimeter,
      baseAngle: finalBaseAngle,
      vertexAngle: finalVertexAngle,
      method,
      explanation,
      steps
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Isosceles Triangle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the properties of an isosceles triangle (two equal sides) with step-by-step solutions:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Known Values</h3>
            <p className="text-sm text-gray-600 mb-4">
              Provide at least 2 values. Common combinations: two equal sides and base, or base and height.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Equal Side (a)"
                type="number"
                value={equalSide}
                onChange={(e) => setEqualSide(e.target.value)}
                placeholder="Enter equal side length"
                step="any"
                min="0"
              />
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
                label="Height (h)"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Enter height"
                step="any"
                min="0"
              />
              <Input
                label="Base Angle (degrees)"
                type="number"
                value={baseAngle}
                onChange={(e) => setBaseAngle(e.target.value)}
                placeholder="Enter base angle"
                step="any"
                min="0"
                max="90"
              />
              <Input
                label="Vertex Angle (degrees)"
                type="number"
                value={vertexAngle}
                onChange={(e) => setVertexAngle(e.target.value)}
                placeholder="Enter vertex angle"
                step="any"
                min="0"
                max="180"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button
              onClick={calculateIsoscelesTriangle}
              className="custom-color-button"
              style={colors.customStyles?.button}
            >
              Calculate Isosceles Triangle
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
                  Isosceles Triangle Results
                </h3>
                
                <div className="bg-white p-4 rounded border mb-4">
                  <p className="font-semibold text-gray-700 mb-2">Method Used:</p>
                  <p className="text-lg font-bold text-green-600">{result.method}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Equal Side</p>
                    <p className="text-lg font-semibold">{formatValue(result.equalSide)}</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Base</p>
                    <p className="text-lg font-semibold">{formatValue(result.base)}</p>
                  </div>
                  <div className="text-center bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="text-lg font-semibold">{formatValue(result.height)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="text-lg font-semibold">{formatValue(result.area)} square units</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Perimeter</p>
                    <p className="text-lg font-semibold">{formatValue(result.perimeter)} units</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Base Angle</p>
                    <p className="text-lg font-semibold">{formatValue(result.baseAngle)}°</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <p className="text-sm text-gray-600">Vertex Angle</p>
                    <p className="text-lg font-semibold">{formatValue(result.vertexAngle)}°</p>
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
