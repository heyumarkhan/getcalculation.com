'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface CircleEquationCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface CircleEquationResult {
  center: { x: number; y: number };
  radius: number;
  standardForm: string;
  generalForm: string;
  inputType: 'center_radius' | 'three_points';
  explanation: string;
  steps: string[];
  graphInfo: {
    diameter: number;
    circumference: number;
    area: number;
    isUnitCircle: boolean;
    isOriginCircle: boolean;
  };
}

export default function CircleEquationCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: CircleEquationCalculatorProps) {
  const [inputType, setInputType] = useState<'center_radius' | 'three_points'>('center_radius');
  
  // Center and radius inputs
  const [centerX, setCenterX] = useState<string>('');
  const [centerY, setCenterY] = useState<string>('');
  const [radius, setRadius] = useState<string>('');
  
  // Three points inputs
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [x3, setX3] = useState<string>('');
  const [y3, setY3] = useState<string>('');
  
  const [result, setResult] = useState<CircleEquationResult | null>(null);

  // Function to calculate circle from three points
  const calculateCircleFromThreePoints = (p1: {x: number, y: number}, p2: {x: number, y: number}, p3: {x: number, y: number}) => {
    // Check if points are collinear
    const slope1 = (p2.y - p1.y) / (p2.x - p1.x);
    const slope2 = (p3.y - p2.y) / (p3.x - p2.x);
    
    if (Math.abs(slope1 - slope2) < 1e-10) {
      throw new Error('The three points are collinear and do not define a circle');
    }

    // Using the formula for circle from three points
    const A = p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
    const B = (p1.x * p1.x + p1.y * p1.y) * (p3.y - p2.y) + 
              (p2.x * p2.x + p2.y * p2.y) * (p1.y - p3.y) + 
              (p3.x * p3.x + p3.y * p3.y) * (p2.y - p1.y);
    const C = (p1.x * p1.x + p1.y * p1.y) * (p2.x - p3.x) + 
              (p2.x * p2.x + p2.y * p2.y) * (p3.x - p1.x) + 
              (p3.x * p3.x + p3.y * p3.y) * (p1.x - p2.x);

    const centerX = -B / (2 * A);
    const centerY = -C / (2 * A);
    const radius = Math.sqrt((p1.x - centerX) ** 2 + (p1.y - centerY) ** 2);

    return { center: { x: centerX, y: centerY }, radius };
  };

  const calculateCircleEquation = () => {
    let center: { x: number; y: number };
    let radiusVal: number;

    if (inputType === 'center_radius') {
      // Check if fields are empty
      if (!centerX || !centerY || !radius || !centerX.trim() || !centerY.trim() || !radius.trim()) {
        alert('Please fill in all fields');
        return;
      }

      const centerXVal = parseFloat(centerX);
      const centerYVal = parseFloat(centerY);
      radiusVal = parseFloat(radius);

      // Validation
      if (isNaN(centerXVal) || isNaN(centerYVal) || isNaN(radiusVal)) {
        alert('Please enter valid numbers for all fields');
        return;
      }

      if (radiusVal <= 0) {
        alert('Radius must be positive');
        return;
      }

      center = { x: centerXVal, y: centerYVal };
      radiusVal = radiusVal;
    } else {
      // Check if fields are empty
      if (!x1 || !y1 || !x2 || !y2 || !x3 || !y3 || !x1.trim() || !y1.trim() || !x2.trim() || !y2.trim() || !x3.trim() || !y3.trim()) {
        alert('Please fill in all fields');
        return;
      }

      const x1Val = parseFloat(x1);
      const y1Val = parseFloat(y1);
      const x2Val = parseFloat(x2);
      const y2Val = parseFloat(y2);
      const x3Val = parseFloat(x3);
      const y3Val = parseFloat(y3);

      // Validation
      if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val) || isNaN(x3Val) || isNaN(y3Val)) {
        alert('Please enter valid numbers for all fields');
        return;
      }

      try {
        const circleData = calculateCircleFromThreePoints(
          { x: x1Val, y: y1Val },
          { x: x2Val, y: y2Val },
          { x: x3Val, y: y3Val }
        );
        center = circleData.center;
        radiusVal = circleData.radius;
      } catch (error) {
        alert(error instanceof Error ? error.message : 'Error calculating circle');
        return;
      }
    }

    // Standard form: (x - h)² + (y - k)² = r²
    const standardForm = `(x - ${center.x})² + (y - ${center.y})² = ${radiusVal}²`;

    // General form: x² + y² + Dx + Ey + F = 0
    // Where D = -2h, E = -2k, F = h² + k² - r²
    const D = -2 * center.x;
    const E = -2 * center.y;
    const F = center.x * center.x + center.y * center.y - radiusVal * radiusVal;
    const generalForm = `x² + y² + ${D}x + ${E}y + ${F} = 0`;

    // Calculate additional properties
    const diameter = 2 * radiusVal;
    const circumference = 2 * Math.PI * radiusVal;
    const area = Math.PI * radiusVal * radiusVal;
    const isUnitCircle = Math.abs(radiusVal - 1) < 1e-10 && Math.abs(center.x) < 1e-10 && Math.abs(center.y) < 1e-10;
    const isOriginCircle = Math.abs(center.x) < 1e-10 && Math.abs(center.y) < 1e-10;

    // Generate explanation
    let explanation: string;
    if (isUnitCircle) {
      explanation = `This is the unit circle centered at the origin with radius 1. It&apos;s fundamental in trigonometry and calculus.`;
    } else if (isOriginCircle) {
      explanation = `This circle is centered at the origin (0, 0) with radius ${radiusVal}.`;
    } else {
      explanation = `This circle is centered at (${center.x}, ${center.y}) with radius ${radiusVal}.`;
    }

    // Generate step-by-step calculation
    const steps: string[] = [];
    
    if (inputType === 'center_radius') {
      steps.push(`Given: Center (${center.x}, ${center.y}) and radius r = ${radiusVal}`);
      steps.push(`Step 1: Standard form of a circle is (x - h)² + (y - k)² = r²`);
      steps.push(`Step 2: Substitute center (h, k) = (${center.x}, ${center.y}) and r = ${radiusVal}`);
      steps.push(`Step 3: Standard form: (x - ${center.x})² + (y - ${center.y})² = ${radiusVal}²`);
      
      steps.push(`Step 4: To find general form, expand the standard form:`);
      steps.push(`Step 5: (x - ${center.x})² + (y - ${center.y})² = ${radiusVal}²`);
      steps.push(`Step 6: x² - ${2 * center.x}x + ${center.x}² + y² - ${2 * center.y}y + ${center.y}² = ${radiusVal}²`);
      steps.push(`Step 7: x² + y² - ${2 * center.x}x - ${2 * center.y}y + ${center.x}² + ${center.y}² - ${radiusVal}² = 0`);
      steps.push(`Step 8: General form: x² + y² + ${D}x + ${E}y + ${F} = 0`);
    } else {
      steps.push(`Given: Three points (${x1}, ${y1}), (${x2}, ${y2}), (${x3}, ${y3})`);
      steps.push(`Step 1: Use the formula for circle from three points`);
      steps.push(`Step 2: Calculate center using determinant method`);
      steps.push(`Step 3: Center: (${center.x.toFixed(6)}, ${center.y.toFixed(6)})`);
      steps.push(`Step 4: Calculate radius using distance formula`);
      steps.push(`Step 5: r = √[(x₁ - h)² + (y₁ - k)²] = ${radiusVal.toFixed(6)}`);
      steps.push(`Step 6: Standard form: (x - ${center.x.toFixed(6)})² + (y - ${center.y.toFixed(6)})² = ${radiusVal.toFixed(6)}²`);
    }

    setResult({
      center,
      radius: radiusVal,
      standardForm,
      generalForm,
      inputType,
      explanation,
      steps,
      graphInfo: {
        diameter,
        circumference,
        area,
        isUnitCircle,
        isOriginCircle
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Equation of a Circle Calculator</h2>
            <p className="text-gray-600 mb-6">Find the equation of a circle from center and radius, or from three points on the circle:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Type Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Choose Input Method</h3>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="inputType"
                  value="center_radius"
                  checked={inputType === 'center_radius'}
                  onChange={(e) => setInputType(e.target.value as 'center_radius' | 'three_points')}
                  className="mr-2"
                />
                Center and Radius
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="inputType"
                  value="three_points"
                  checked={inputType === 'three_points'}
                  onChange={(e) => setInputType(e.target.value as 'center_radius' | 'three_points')}
                  className="mr-2"
                />
                Three Points
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              {inputType === 'center_radius' ? 'Enter Center and Radius' : 'Enter Three Points'}
            </h3>
            
            {inputType === 'center_radius' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Center X (h)"
                  type="number"
                  value={centerX}
                  onChange={(e) => setCenterX(e.target.value)}
                  placeholder="Enter center x"
                  autoFocus
                  step="any"
                />
                <Input
                  label="Center Y (k)"
                  type="number"
                  value={centerY}
                  onChange={(e) => setCenterY(e.target.value)}
                  placeholder="Enter center y"
                  step="any"
                />
                <Input
                  label="Radius (r)"
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="Enter radius"
                  step="any"
                  min="0"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <Input
                    label="Point 1 X"
                    type="number"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                    placeholder="x₁"
                    autoFocus
                    step="any"
                  />
                  <Input
                    label="Point 1 Y"
                    type="number"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                    placeholder="y₁"
                    step="any"
                  />
                  <Input
                    label="Point 2 X"
                    type="number"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                    placeholder="x₂"
                    step="any"
                  />
                  <Input
                    label="Point 2 Y"
                    type="number"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                    placeholder="y₂"
                    step="any"
                  />
                  <Input
                    label="Point 3 X"
                    type="number"
                    value={x3}
                    onChange={(e) => setX3(e.target.value)}
                    placeholder="x₃"
                    step="any"
                  />
                  <Input
                    label="Point 3 Y"
                    type="number"
                    value={y3}
                    onChange={(e) => setY3(e.target.value)}
                    placeholder="y₃"
                    step="any"
                  />
                </div>
              </div>
            )}
            
            <p className="text-sm text-gray-600 mt-2">
              <strong>Note:</strong> {inputType === 'center_radius' 
                ? 'Standard form: (x - h)² + (y - k)² = r² where (h, k) is center and r is radius'
                : 'Three non-collinear points uniquely determine a circle. The points must not all lie on the same line.'}
            </p>
          </div>

          <Button 
            onClick={calculateCircleEquation}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Circle Equation
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
                Circle Equation Results
              </h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Center</p>
                    <p className="font-mono text-lg font-bold text-blue-600">({result.center.x.toFixed(6)}, {result.center.y.toFixed(6)})</p>
                  </div>
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Radius</p>
                    <p className="font-mono text-lg font-bold text-green-600">{result.radius.toFixed(6)}</p>
                  </div>
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Diameter</p>
                    <p className="font-mono text-lg font-bold text-purple-600">{result.graphInfo.diameter.toFixed(6)}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-3">Equation Forms:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-600 mb-1">Standard Form:</p>
                      <p className="font-mono text-lg bg-gray-50 p-2 rounded">{result.standardForm}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600 mb-1">General Form:</p>
                      <p className="font-mono text-lg bg-gray-50 p-2 rounded">{result.generalForm}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Circle Properties:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Area:</strong> {result.graphInfo.area.toFixed(6)}π ≈ {(result.graphInfo.area * Math.PI).toFixed(6)}</p>
                      <p><strong>Circumference:</strong> {result.graphInfo.circumference.toFixed(6)}π ≈ {(result.graphInfo.circumference * Math.PI).toFixed(6)}</p>
                    </div>
                    <div>
                      <p><strong>Special Circle:</strong> {result.graphInfo.isUnitCircle ? 'Unit Circle' : result.graphInfo.isOriginCircle ? 'Origin Circle' : 'Regular Circle'}</p>
                      <p><strong>Type:</strong> {result.inputType === 'center_radius' ? 'Given center and radius' : 'From three points'}</p>
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

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-2">Key Relationships:</p>
                  <div className="text-blue-700 text-sm space-y-1">
                    <p>• Standard form: (x - h)² + (y - k)² = r²</p>
                    <p>• General form: x² + y² + Dx + Ey + F = 0</p>
                    <p>• Center: (h, k) = (-D/2, -E/2)</p>
                    <p>• Radius: r = √(h² + k² - F)</p>
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
