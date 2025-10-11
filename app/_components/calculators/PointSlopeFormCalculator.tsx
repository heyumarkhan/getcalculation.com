'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PointSlopeFormCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface PointSlopeResult {
  point: { x: number; y: number };
  slope: number;
  pointSlopeForm: string;
  slopeInterceptForm: string;
  standardForm: string;
  explanation: string;
  steps: string[];
  graphInfo: {
    yIntercept: number;
    xIntercept: number;
    isVertical: boolean;
    isHorizontal: boolean;
  };
}

export default function PointSlopeFormCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: PointSlopeFormCalculatorProps) {
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [slope, setSlope] = useState<string>('');
  const [result, setResult] = useState<PointSlopeResult | null>(null);

  const calculatePointSlopeForm = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const slopeVal = parseFloat(slope);

    // Validation
    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(slopeVal)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    // Check for vertical line (infinite slope)
    if (!isFinite(slopeVal)) {
      alert('Slope cannot be infinite. Please enter a finite number.');
      return;
    }

    // Point-slope form: y - y₁ = m(x - x₁)
    const pointSlopeForm = `y - ${y1Val} = ${slopeVal}(x - ${x1Val})`;

    // Slope-intercept form: y = mx + b
    // b = y₁ - mx₁
    const b = y1Val - slopeVal * x1Val;
    const slopeInterceptForm = `y = ${slopeVal}x + ${b}`;

    // Standard form: Ax + By = C
    // Convert from slope-intercept: y = mx + b → mx - y = -b
    // So: mx - y = -b → mx - y = -(y₁ - mx₁) → mx - y = -y₁ + mx₁
    // Rearranging: mx - y = mx₁ - y₁
    // Standard form: mx - y = mx₁ - y₁
    const A = slopeVal;
    const B = -1;
    const C = slopeVal * x1Val - y1Val;
    const standardForm = `${A}x + ${B}y = ${C}`;

    // Calculate intercepts
    const yIntercept = b;
    const xIntercept = slopeVal !== 0 ? -b / slopeVal : (slopeVal === 0 ? 'undefined' : 0);
    
    // Check for special cases
    const isVertical = !isFinite(slopeVal);
    const isHorizontal = slopeVal === 0;

    // Generate explanation
    let explanation: string;
    if (isHorizontal) {
      explanation = `This is a horizontal line with slope 0. The equation represents a line parallel to the x-axis.`;
    } else if (Math.abs(slopeVal) > 1) {
      explanation = `This line has a steep slope of ${slopeVal}, indicating a rapid change in y for small changes in x.`;
    } else if (Math.abs(slopeVal) < 1) {
      explanation = `This line has a gentle slope of ${slopeVal}, indicating a gradual change in y for changes in x.`;
    } else {
      explanation = `This line has a slope of ${slopeVal}, indicating a 45-degree angle (1:1 ratio of change).`;
    }

    // Generate step-by-step calculation
    const steps: string[] = [];
    
    steps.push(`Given: Point (${x1Val}, ${y1Val}) and slope m = ${slopeVal}`);
    steps.push(`Step 1: Point-slope form is y - y₁ = m(x - x₁)`);
    steps.push(`Step 2: Substitute values: y - ${y1Val} = ${slopeVal}(x - ${x1Val})`);
    steps.push(`Step 3: This gives us the point-slope form: ${pointSlopeForm}`);
    
    steps.push(`Step 4: To find slope-intercept form y = mx + b, solve for b:`);
    steps.push(`Step 5: b = y₁ - mx₁ = ${y1Val} - ${slopeVal} × ${x1Val} = ${y1Val} - ${slopeVal * x1Val} = ${b}`);
    steps.push(`Step 6: Slope-intercept form: y = ${slopeVal}x + ${b}`);
    
    steps.push(`Step 7: To find standard form Ax + By = C:`);
    steps.push(`Step 8: From y = ${slopeVal}x + ${b}, rearrange: ${slopeVal}x - y = -${b}`);
    steps.push(`Step 9: Standard form: ${standardForm}`);

    setResult({
      point: { x: x1Val, y: y1Val },
      slope: slopeVal,
      pointSlopeForm,
      slopeInterceptForm,
      standardForm,
      explanation,
      steps,
      graphInfo: {
        yIntercept: yIntercept,
        xIntercept: typeof xIntercept === 'number' ? xIntercept : 0,
        isVertical,
        isHorizontal
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Point Slope Form Calculator</h2>
            <p className="text-gray-600 mb-6">Convert between point-slope form, slope-intercept form, and standard form of linear equations:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Point and Slope</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="x-coordinate (x₁)"
                type="number"
                value={x1}
                onChange={(e) => setX1(e.target.value)}
                placeholder="Enter x₁"
                autoFocus
                step="any"
              />
              <Input
                label="y-coordinate (y₁)"
                type="number"
                value={y1}
                onChange={(e) => setY1(e.target.value)}
                placeholder="Enter y₁"
                step="any"
              />
              <Input
                label="Slope (m)"
                type="number"
                value={slope}
                onChange={(e) => setSlope(e.target.value)}
                placeholder="Enter slope"
                step="any"
              />
            </div>
            
            <p className="text-sm text-gray-600 mt-2">
              <strong>Note:</strong> Point-slope form: y - y₁ = m(x - x₁). Enter the point (x₁, y₁) and slope m.
            </p>
          </div>

          <Button 
            onClick={calculatePointSlopeForm}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Point Slope Form
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
                Point Slope Form Results
              </h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Point</p>
                    <p className="font-mono text-lg font-bold text-blue-600">({result.point.x}, {result.point.y})</p>
                  </div>
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Slope</p>
                    <p className="font-mono text-lg font-bold text-green-600">{result.slope}</p>
                  </div>
                  <div className="bg-white p-4 rounded border text-center">
                    <p className="font-semibold text-gray-700 mb-1">Line Type</p>
                    <p className="font-mono text-lg font-bold text-purple-600">
                      {result.graphInfo.isHorizontal ? 'Horizontal' : 
                       result.graphInfo.isVertical ? 'Vertical' : 'Diagonal'}
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-3">Equation Forms:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-600 mb-1">Point-Slope Form:</p>
                      <p className="font-mono text-lg bg-gray-50 p-2 rounded">{result.pointSlopeForm}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600 mb-1">Slope-Intercept Form:</p>
                      <p className="font-mono text-lg bg-gray-50 p-2 rounded">{result.slopeInterceptForm}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600 mb-1">Standard Form:</p>
                      <p className="font-mono text-lg bg-gray-50 p-2 rounded">{result.standardForm}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Graph Information:</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p><strong>Y-intercept:</strong> (0, {result.graphInfo.yIntercept.toFixed(6)})</p>
                      <p><strong>X-intercept:</strong> ({result.graphInfo.xIntercept.toFixed(6)}, 0)</p>
                    </div>
                    <div>
                      <p><strong>Slope direction:</strong> {result.slope > 0 ? 'Rising' : result.slope < 0 ? 'Falling' : 'Horizontal'}</p>
                      <p><strong>Steepness:</strong> {Math.abs(result.slope) > 1 ? 'Steep' : Math.abs(result.slope) < 1 ? 'Gentle' : 'Moderate'}</p>
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
                    <p>• Point-slope form: y - y₁ = m(x - x₁)</p>
                    <p>• Slope-intercept form: y = mx + b (where b = y₁ - mx₁)</p>
                    <p>• Standard form: Ax + By = C</p>
                    <p>• Slope m = (y₂ - y₁) / (x₂ - x₁) for any two points</p>
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
