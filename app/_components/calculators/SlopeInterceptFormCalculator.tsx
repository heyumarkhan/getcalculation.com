'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface SlopeInterceptFormCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type CalculationType = 'from-equation' | 'from-slope-point' | 'from-two-points' | 'to-standard' | 'to-point-slope';

interface SlopeInterceptResult {
  type: CalculationType;
  slope: number;
  yIntercept: number;
  equation: string;
  standardForm?: string;
  pointSlopeForm?: string;
  graphInfo: {
    xIntercept: number | null;
    isVertical: boolean;
    isHorizontal: boolean;
  };
  steps: string[];
}

export default function SlopeInterceptFormCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SlopeInterceptFormCalculatorProps) {
  const [calculationType, setCalculationType] = useState<CalculationType>('from-equation');
  const [equation, setEquation] = useState<string>('');
  const [slope, setSlope] = useState<string>('');
  const [yIntercept, setYIntercept] = useState<string>('');
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [result, setResult] = useState<SlopeInterceptResult | null>(null);

  const formatValue = (value: number, precision: number = 4): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(precision);
  };

  const parseSlopeInterceptEquation = (eq: string): { m: number; b: number } | null => {
    // Remove spaces and convert to lowercase
    const cleanEq = eq.replace(/\s/g, '').toLowerCase();
    
    // Pattern: y = mx + b or y = mx - b or y = -mx + b, etc.
    const match = cleanEq.match(/y\s*=\s*([+-]?\d*\.?\d*)x\s*([+-]\d*\.?\d*)?/);
    if (!match) return null;
    
    const m = parseFloat(match[1] || '1') || 1;
    const b = match[2] ? parseFloat(match[2]) : 0;
    
    return { m, b };
  };

  const calculate = () => {
    const steps: string[] = [];
    let calculatedSlope = 0;
    let calculatedB = 0;
    let calculatedEquation = '';
    let standardForm = '';
    let pointSlopeForm = '';

    if (calculationType === 'from-equation') {
      const eq = equation.trim();
      if (!eq) {
        alert('Please enter a slope-intercept form equation (y = mx + b)');
        return;
      }
      
      const parsed = parseSlopeInterceptEquation(eq);
      if (!parsed) {
        alert('Invalid equation format. Please use: y = mx + b');
        return;
      }
      
      calculatedSlope = parsed.m;
      calculatedB = parsed.b;
      calculatedEquation = `y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`;
      
      steps.push(`Given equation: ${eq}`);
      steps.push(`Slope-intercept form: y = mx + b`);
      steps.push(`From the equation, we can identify:`);
      steps.push(`Slope (m) = ${formatValue(calculatedSlope)}`);
      steps.push(`Y-intercept (b) = ${formatValue(calculatedB)}`);
    }
    else if (calculationType === 'from-slope-point') {
      const m = parseFloat(slope);
      const x = parseFloat(x1);
      const y = parseFloat(y1);
      
      if (isNaN(m) || isNaN(x) || isNaN(y)) {
        alert('Please enter valid numbers for slope and point');
        return;
      }
      
      calculatedSlope = m;
      calculatedB = y - m * x;
      calculatedEquation = `y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`;
      
      steps.push(`Given slope (m) = ${m} and point (${x}, ${y})`);
      steps.push(`Slope-intercept form: y = mx + b`);
      steps.push(`Substitute the point into the equation: ${y} = ${m}(${x}) + b`);
      steps.push(`Solve for b: ${y} = ${m * x} + b`);
      steps.push(`b = ${y} - ${m * x} = ${formatValue(calculatedB)}`);
      steps.push(`Equation: y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`);
    }
    else if (calculationType === 'from-two-points') {
      const x1Val = parseFloat(x1);
      const y1Val = parseFloat(y1);
      const x2Val = parseFloat(x2);
      const y2Val = parseFloat(y2);
      
      if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
        alert('Please enter valid coordinates for both points');
        return;
      }
      
      if (x1Val === x2Val) {
        alert('Cannot calculate: x-coordinates are the same (vertical line)');
        return;
      }
      
      calculatedSlope = (y2Val - y1Val) / (x2Val - x1Val);
      calculatedB = y1Val - calculatedSlope * x1Val;
      calculatedEquation = `y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`;
      
      steps.push(`Given points: (${x1Val}, ${y1Val}) and (${x2Val}, ${y2Val})`);
      steps.push(`Calculate slope: m = (y₂ - y₁) / (x₂ - x₁)`);
      steps.push(`m = (${y2Val} - ${y1Val}) / (${x2Val} - ${x1Val})`);
      steps.push(`m = ${y2Val - y1Val} / ${x2Val - x1Val} = ${formatValue(calculatedSlope)}`);
      steps.push(`Use point (${x1Val}, ${y1Val}) to find b: b = y - mx`);
      steps.push(`b = ${y1Val} - ${formatValue(calculatedSlope)}(${x1Val}) = ${formatValue(calculatedB)}`);
      steps.push(`Equation: y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`);
    }
    else if (calculationType === 'to-standard') {
      const m = parseFloat(slope);
      const b = parseFloat(yIntercept);
      
      if (isNaN(m) || isNaN(b)) {
        alert('Please enter valid numbers for slope and y-intercept');
        return;
      }
      
      calculatedSlope = m;
      calculatedB = b;
      calculatedEquation = `y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`;
      
      // Convert to standard form: Ax + By = C
      // From y = mx + b, we get: -mx + y = b
      // Multiply by -1 if needed to make A positive: mx - y = -b
      const A = calculatedSlope;
      const B = -1;
      const C = -calculatedB;
      
      standardForm = `${formatValue(A)}x ${B >= 0 ? '+' : ''} ${formatValue(B)}y = ${formatValue(C)}`;
      
      steps.push(`Given slope-intercept form: y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`);
      steps.push(`Rearrange to standard form Ax + By = C:`);
      steps.push(`y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`);
      steps.push(`-${formatValue(calculatedSlope)}x + y = ${formatValue(calculatedB)}`);
      steps.push(`Standard form: ${standardForm}`);
    }
    else if (calculationType === 'to-point-slope') {
      const m = parseFloat(slope);
      const b = parseFloat(yIntercept);
      const x = parseFloat(x1);
      const y = parseFloat(y1);
      
      if (isNaN(m) || isNaN(b) || isNaN(x) || isNaN(y)) {
        alert('Please enter valid numbers for slope, y-intercept, and point');
        return;
      }
      
      calculatedSlope = m;
      calculatedB = b;
      calculatedEquation = `y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`;
      
      // Point-slope form: y - y₁ = m(x - x₁)
      pointSlopeForm = `y - ${y} = ${formatValue(calculatedSlope)}(x - ${x})`;
      
      steps.push(`Given slope-intercept form: y = ${formatValue(calculatedSlope)}x ${calculatedB >= 0 ? '+' : ''} ${formatValue(calculatedB)}`);
      steps.push(`Given point: (${x}, ${y})`);
      steps.push(`Point-slope form: y - y₁ = m(x - x₁)`);
      steps.push(`Substitute: y - ${y} = ${formatValue(calculatedSlope)}(x - ${x})`);
      steps.push(`Point-slope form: ${pointSlopeForm}`);
    }

    // Calculate x-intercept
    const xIntercept = calculatedSlope !== 0 ? -calculatedB / calculatedSlope : null;
    const isVertical = false; // Slope-intercept form can't represent vertical lines
    const isHorizontal = calculatedSlope === 0;

    if (xIntercept !== null) {
      steps.push(`X-intercept: (${formatValue(xIntercept)}, 0)`);
    }
    steps.push(`Y-intercept: (0, ${formatValue(calculatedB)})`);

    setResult({
      type: calculationType,
      slope: calculatedSlope,
      yIntercept: calculatedB,
      equation: calculatedEquation,
      standardForm: standardForm || undefined,
      pointSlopeForm: pointSlopeForm || undefined,
      graphInfo: {
        xIntercept,
        isVertical,
        isHorizontal
      },
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Slope Intercept Form Calculator</h2>
            <p className="text-gray-600 mb-6">Work with slope-intercept form (y = mx + b) equations. Find slope, y-intercept, convert to other forms, and more:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Calculation Type Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Calculation Type</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="from-equation"
                  checked={calculationType === 'from-equation'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Find Slope & Y-Intercept from Equation</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="from-slope-point"
                  checked={calculationType === 'from-slope-point'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">From Slope & Point</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="from-two-points"
                  checked={calculationType === 'from-two-points'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">From Two Points</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="to-standard"
                  checked={calculationType === 'to-standard'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Convert to Standard Form</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="to-point-slope"
                  checked={calculationType === 'to-point-slope'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Convert to Point-Slope Form</span>
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Input Values</h3>
            <div className="space-y-3">
              {calculationType === 'from-equation' && (
                <Input
                  label="Equation (y = mx + b)"
                  type="text"
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  placeholder="e.g., y = 2x + 3"
                  autoFocus
                />
              )}
              {(calculationType === 'from-slope-point' || calculationType === 'to-standard' || calculationType === 'to-point-slope') && (
                <>
                  <Input
                    label="Slope (m)"
                    type="text"
                    value={slope}
                    onChange={(e) => setSlope(e.target.value)}
                    placeholder="Enter slope"
                    autoFocus
                  />
                  {calculationType !== 'to-point-slope' && (
                    <Input
                      label={calculationType === 'from-slope-point' ? 'Point (x, y)' : 'Y-Intercept (b)'}
                      type="text"
                      value={calculationType === 'from-slope-point' ? x1 : yIntercept}
                      onChange={(e) => calculationType === 'from-slope-point' ? setX1(e.target.value) : setYIntercept(e.target.value)}
                      placeholder={calculationType === 'from-slope-point' ? 'x coordinate' : 'Enter y-intercept'}
                    />
                  )}
                  {calculationType === 'from-slope-point' && (
                    <Input
                      label=""
                      type="text"
                      value={y1}
                      onChange={(e) => setY1(e.target.value)}
                      placeholder="y coordinate"
                    />
                  )}
                  {calculationType === 'to-point-slope' && (
                    <>
                      <Input
                        label="Y-Intercept (b)"
                        type="text"
                        value={yIntercept}
                        onChange={(e) => setYIntercept(e.target.value)}
                        placeholder="Enter y-intercept"
                      />
                      <Input
                        label="Point (x, y)"
                        type="text"
                        value={x1}
                        onChange={(e) => setX1(e.target.value)}
                        placeholder="x coordinate"
                      />
                      <Input
                        label=""
                        type="text"
                        value={y1}
                        onChange={(e) => setY1(e.target.value)}
                        placeholder="y coordinate"
                      />
                    </>
                  )}
                </>
              )}
              {calculationType === 'from-two-points' && (
                <>
                  <Input
                    label="Point 1 (x₁, y₁)"
                    type="text"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                    placeholder="x₁"
                    autoFocus
                  />
                  <Input
                    label=""
                    type="text"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                    placeholder="y₁"
                  />
                  <Input
                    label="Point 2 (x₂, y₂)"
                    type="text"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                    placeholder="x₂"
                  />
                  <Input
                    label=""
                    type="text"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                    placeholder="y₂"
                  />
                </>
              )}
            </div>
          </div>

          <Button 
            onClick={calculate}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate
          </Button>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>

        {/* Results Section - Right Side */}
        <div>
          <div 
            className={`p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md min-h-[400px] transition-all duration-300`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Result
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6 space-y-4">
                  <div className="text-center py-3 border-b border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Slope-Intercept Form</div>
                    <div className="text-xl font-mono font-bold text-gray-900">
                      {result.equation}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Slope (m):</span>
                      <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.slope)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Y-Intercept (b):</span>
                      <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.yIntercept)}</span>
                    </div>
                    {result.graphInfo.xIntercept !== null && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">X-Intercept:</span>
                        <span className="font-mono font-bold text-lg text-gray-900">({formatValue(result.graphInfo.xIntercept)}, 0)</span>
                      </div>
                    )}
                    {result.standardForm && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Standard Form:</span>
                        <span className="font-mono font-bold text-sm text-gray-900">{result.standardForm}</span>
                      </div>
                    )}
                    {result.pointSlopeForm && (
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Point-Slope Form:</span>
                        <span className="font-mono font-bold text-sm text-gray-900">{result.pointSlopeForm}</span>
                      </div>
                    )}
                  </div>

                  {/* Calculation Steps */}
                  {result.steps.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Calculation Steps:</h4>
                      <div className="space-y-1">
                        {result.steps.map((step, index) => (
                          <div key={index} className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📐</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Select a calculation type and enter values</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

