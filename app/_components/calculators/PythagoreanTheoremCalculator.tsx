'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PythagoreanTheoremCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface PythagoreanResult {
  sideA: number;
  sideB: number;
  sideC: number;
  missingSide: 'a' | 'b' | 'c';
  calculation: string;
  explanation: string;
  steps: string[];
  triangleType: {
    isRightTriangle: boolean;
    isIsosceles: boolean;
    isEquilateral: boolean;
    isScalene: boolean;
  };
  properties: {
    area: number;
    perimeter: number;
    angles: {
      angleA: number;
      angleB: number;
      angleC: number;
    };
  };
}

export default function PythagoreanTheoremCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: PythagoreanTheoremCalculatorProps) {
  const [sideA, setSideA] = useState<string>('');
  const [sideB, setSideB] = useState<string>('');
  const [sideC, setSideC] = useState<string>('');
  const [result, setResult] = useState<PythagoreanResult | null>(null);

  const calculatePythagorean = () => {
    // Check if fields are empty
    if (!sideA || !sideB || !sideC || !sideA.trim() || !sideB.trim() || !sideC.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    // Validation
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    if (a <= 0 || b <= 0 || c <= 0) {
      alert('All sides must be positive numbers');
      return;
    }

    // Determine which side is missing (has value 0 or is the largest)
    let missingSide: 'a' | 'b' | 'c';
    let finalA = a;
    let finalB = b;
    let finalC = c;

    if (a === 0 || (a < b && a < c)) {
      missingSide = 'a';
      // Calculate side A: a = √(c² - b²)
      finalA = Math.sqrt(c * c - b * b);
      if (isNaN(finalA) || finalA <= 0) {
        alert('Invalid triangle: Cannot form a right triangle with these values');
        return;
      }
    } else if (b === 0 || (b < a && b < c)) {
      missingSide = 'b';
      // Calculate side B: b = √(c² - a²)
      finalB = Math.sqrt(c * c - a * a);
      if (isNaN(finalB) || finalB <= 0) {
        alert('Invalid triangle: Cannot form a right triangle with these values');
        return;
      }
    } else {
      missingSide = 'c';
      // Calculate side C (hypotenuse): c = √(a² + b²)
      finalC = Math.sqrt(a * a + b * b);
    }

    // Verify it's a right triangle
    const tolerance = 1e-10;
    const isRightTriangle = Math.abs(finalA * finalA + finalB * finalB - finalC * finalC) < tolerance;

    if (!isRightTriangle) {
      alert('These values do not form a right triangle. Please check your inputs.');
      return;
    }

    // Calculate triangle properties
    const area = 0.5 * finalA * finalB;
    const perimeter = finalA + finalB + finalC;
    
    // Calculate angles using trigonometry
    const angleA = Math.asin(finalA / finalC) * (180 / Math.PI);
    const angleB = Math.asin(finalB / finalC) * (180 / Math.PI);
    const angleC = 90; // Right angle

    // Determine triangle type
    const isIsosceles = Math.abs(finalA - finalB) < tolerance;
    const isEquilateral = Math.abs(finalA - finalB) < tolerance && Math.abs(finalB - finalC) < tolerance;
    const isScalene = !isIsosceles && !isEquilateral;

    // Generate explanation
    let explanation: string;
    if (isEquilateral) {
      explanation = `This is an equilateral right triangle, which is impossible. A right triangle cannot be equilateral.`;
    } else if (isIsosceles) {
      explanation = `This is an isosceles right triangle (45-45-90 triangle) with two equal legs of length ${finalA.toFixed(6)}.`;
    } else {
      explanation = `This is a scalene right triangle with sides of different lengths.`;
    }

    // Generate step-by-step calculation
    const steps: string[] = [];
    
    if (missingSide === 'a') {
      steps.push(`Given: Side b = ${b}, Side c (hypotenuse) = ${c}`);
      steps.push(`Step 1: Use Pythagorean theorem: a² + b² = c²`);
      steps.push(`Step 2: Solve for a: a² = c² - b²`);
      steps.push(`Step 3: a² = ${c}² - ${b}² = ${c * c} - ${b * b} = ${c * c - b * b}`);
      steps.push(`Step 4: a = √${c * c - b * b} = ${finalA.toFixed(6)}`);
    } else if (missingSide === 'b') {
      steps.push(`Given: Side a = ${a}, Side c (hypotenuse) = ${c}`);
      steps.push(`Step 1: Use Pythagorean theorem: a² + b² = c²`);
      steps.push(`Step 2: Solve for b: b² = c² - a²`);
      steps.push(`Step 3: b² = ${c}² - ${a}² = ${c * c} - ${a * a} = ${c * c - a * a}`);
      steps.push(`Step 4: b = √${c * c - a * a} = ${finalB.toFixed(6)}`);
    } else {
      steps.push(`Given: Side a = ${a}, Side b = ${b}`);
      steps.push(`Step 1: Use Pythagorean theorem: a² + b² = c²`);
      steps.push(`Step 2: c² = a² + b²`);
      steps.push(`Step 3: c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}`);
      steps.push(`Step 4: c = √${a * a + b * b} = ${finalC.toFixed(6)}`);
    }

    // Generate calculation string
    let calculation: string;
    if (missingSide === 'a') {
      calculation = `a = √(c² - b²) = √(${c}² - ${b}²) = √(${c * c} - ${b * b}) = √${c * c - b * b} = ${finalA.toFixed(6)}`;
    } else if (missingSide === 'b') {
      calculation = `b = √(c² - a²) = √(${c}² - ${a}²) = √(${c * c} - ${a * a}) = √${c * c - a * a} = ${finalB.toFixed(6)}`;
    } else {
      calculation = `c = √(a² + b²) = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${a * a + b * b} = ${finalC.toFixed(6)}`;
    }

    setResult({
      sideA: finalA,
      sideB: finalB,
      sideC: finalC,
      missingSide,
      calculation,
      explanation,
      steps,
      triangleType: {
        isRightTriangle,
        isIsosceles,
        isEquilateral,
        isScalene
      },
      properties: {
        area,
        perimeter,
        angles: {
          angleA,
          angleB,
          angleC
        }
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pythagorean Theorem Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the length of any side of a right triangle using the Pythagorean theorem:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Triangle Sides</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter the lengths of two sides and leave the third as 0 to calculate it, or enter all three to verify it&apos;s a right triangle.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Side A (a)"
                type="number"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                placeholder="Enter side a"
                autoFocus
                step="any"
                min="0"
              />
              <Input
                label="Side B (b)"
                type="number"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                placeholder="Enter side b"
                step="any"
                min="0"
              />
              <Input
                label="Side C - Hypotenuse (c)"
                type="number"
                value={sideC}
                onChange={(e) => setSideC(e.target.value)}
                placeholder="Enter hypotenuse c"
                step="any"
                min="0"
              />
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button
              onClick={calculatePythagorean}
              className="custom-color-button"
              style={colors.customStyles?.button}
            >
              Calculate Missing Side
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Result */}
              <div 
                className="p-6 rounded-lg border-2"
                style={colors.customStyles?.resultBg}
              >
                <h3 className="text-xl font-bold mb-4" style={colors.customStyles?.result}>
                  Pythagorean Theorem Result
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Side A</p>
                    <p className="text-lg font-semibold">{result.sideA.toFixed(6)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Side B</p>
                    <p className="text-lg font-semibold">{result.sideB.toFixed(6)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Hypotenuse C</p>
                    <p className="text-lg font-semibold">{result.sideC.toFixed(6)}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-mono text-sm">{result.calculation}</p>
                </div>
              </div>

              {/* Triangle Properties */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Triangle Properties</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="text-lg font-semibold">{result.properties.area.toFixed(6)} square units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Perimeter</p>
                    <p className="text-lg font-semibold">{result.properties.perimeter.toFixed(6)} units</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Angle A</p>
                    <p className="text-lg font-semibold">{result.properties.angles.angleA.toFixed(2)}°</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Angle B</p>
                    <p className="text-lg font-semibold">{result.properties.angles.angleB.toFixed(2)}°</p>
                  </div>
                </div>
              </div>

              {/* Triangle Type */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-700 mb-3">Triangle Classification</h4>
                <div className="flex flex-wrap gap-2">
                  {result.triangleType.isRightTriangle && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      Right Triangle
                    </span>
                  )}
                  {result.triangleType.isIsosceles && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Isosceles
                    </span>
                  )}
                  {result.triangleType.isScalene && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      Scalene
                    </span>
                  )}
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-yellow-50 p-4 rounded-lg">
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
      </Card>
    </>
  );
}
