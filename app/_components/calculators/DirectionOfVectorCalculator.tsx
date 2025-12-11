'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface DirectionOfVectorCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type Dimension = '2D' | '3D';

export default function DirectionOfVectorCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: DirectionOfVectorCalculatorProps) {
  const [dimension, setDimension] = useState<Dimension>('2D');
  const [x, setX] = useState<string>('');
  const [y, setY] = useState<string>('');
  const [z, setZ] = useState<string>('');
  const [result, setResult] = useState<{angle: number, angleRadians: number, quadrant?: string, directionAngles?: {alpha: number, beta: number, gamma: number}} | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(6);
  };

  const toDegrees = (radians: number): number => {
    return radians * (180 / Math.PI);
  };

  const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const calculateDirection = () => {
    const xVal = parseFloat(x);
    const yVal = parseFloat(y);
    const zVal = dimension === '3D' ? parseFloat(z) : 0;

    if (dimension === '2D') {
      if (isNaN(xVal) || isNaN(yVal)) {
        alert('Please enter valid numbers for all vector components');
        return;
      }
    } else {
      if (isNaN(xVal) || isNaN(yVal) || isNaN(zVal)) {
        alert('Please enter valid numbers for all vector components');
        return;
      }
    }

    // Check for zero vector
    const magnitude = Math.sqrt(xVal * xVal + yVal * yVal + (dimension === '3D' ? zVal * zVal : 0));
    if (magnitude === 0) {
      alert('Cannot determine direction: the zero vector has no direction');
      return;
    }

    const steps: string[] = [];
    
    // Display vector
    if (dimension === '2D') {
      steps.push(`Given: Vector v = (${xVal}, ${yVal})`);
    } else {
      steps.push(`Given: Vector v = (${xVal}, ${yVal}, ${zVal})`);
    }

    if (dimension === '2D') {
      steps.push(`Using the formula: θ = atan2(y, x)`);
      steps.push(`This gives the angle from the positive x-axis.`);
      
      // Calculate angle using atan2
      const angleRadians = Math.atan2(yVal, xVal);
      let angleDegrees = toDegrees(angleRadians);
      
      // Normalize to 0-360 range
      if (angleDegrees < 0) {
        angleDegrees += 360;
      }
      
      steps.push(`Step 1: Calculate θ = atan2(${yVal}, ${xVal})`);
      steps.push(`  θ = ${angleRadians.toFixed(6)} radians`);
      steps.push(`Step 2: Convert to degrees`);
      steps.push(`  θ = ${angleRadians.toFixed(6)} × (180/π)`);
      steps.push(`  θ = ${angleDegrees.toFixed(6)}°`);
      
      // Determine quadrant
      let quadrant: string;
      if (angleDegrees === 0 || angleDegrees === 360) {
        quadrant = 'On positive x-axis (0°)';
      } else if (angleDegrees > 0 && angleDegrees < 90) {
        quadrant = 'Quadrant I (0° to 90°)';
      } else if (angleDegrees === 90) {
        quadrant = 'On positive y-axis (90°)';
      } else if (angleDegrees > 90 && angleDegrees < 180) {
        quadrant = 'Quadrant II (90° to 180°)';
      } else if (angleDegrees === 180) {
        quadrant = 'On negative x-axis (180°)';
      } else if (angleDegrees > 180 && angleDegrees < 270) {
        quadrant = 'Quadrant III (180° to 270°)';
      } else if (angleDegrees === 270) {
        quadrant = 'On negative y-axis (270°)';
      } else {
        quadrant = 'Quadrant IV (270° to 360°)';
      }
      
      steps.push(`Step 3: Determine direction`);
      steps.push(`  ${quadrant}`);
      
      setResult({
        angle: angleDegrees,
        angleRadians: angleRadians,
        quadrant: quadrant
      });
    } else {
      // 3D case: Calculate direction angles
      steps.push(`Using direction angles formula: α = arccos(x/|v|), β = arccos(y/|v|), γ = arccos(z/|v|)`);
      
      steps.push(`Step 1: Calculate vector magnitude`);
      steps.push(`  |v| = √(${xVal}² + ${yVal}² + ${zVal}²)`);
      steps.push(`  |v| = √(${(xVal * xVal)} + ${(yVal * yVal)} + ${(zVal * zVal)})`);
      steps.push(`  |v| = √${(xVal * xVal + yVal * yVal + zVal * zVal).toFixed(6)}`);
      steps.push(`  |v| = ${magnitude.toFixed(6)}`);
      
      steps.push(`Step 2: Calculate direction angles`);
      
      const alpha = Math.acos(xVal / magnitude);
      const beta = Math.acos(yVal / magnitude);
      const gamma = Math.acos(zVal / magnitude);
      
      steps.push(`  α = arccos(${xVal} / ${magnitude.toFixed(6)}) = arccos(${(xVal / magnitude).toFixed(6)}) = ${toDegrees(alpha).toFixed(6)}°`);
      steps.push(`  β = arccos(${yVal} / ${magnitude.toFixed(6)}) = arccos(${(yVal / magnitude).toFixed(6)}) = ${toDegrees(beta).toFixed(6)}°`);
      steps.push(`  γ = arccos(${zVal} / ${magnitude.toFixed(6)}) = arccos(${(zVal / magnitude).toFixed(6)}) = ${toDegrees(gamma).toFixed(6)}°`);
      
      setResult({
        angle: 0, // Not applicable for 3D
        angleRadians: 0,
        directionAngles: {
          alpha: toDegrees(alpha),
          beta: toDegrees(beta),
          gamma: toDegrees(gamma)
        }
      });
    }

    setCalculationSteps(steps);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'x':
        setX(value);
        break;
      case 'y':
        setY(value);
        break;
      case 'z':
        setZ(value);
        break;
      default:
        break;
    }
    // Clear results when input changes
    if (result !== null) {
      setResult(null);
      setCalculationSteps([]);
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

  const clearAll = () => {
    setX('');
    setY('');
    setZ('');
    setResult(null);
    setCalculationSteps([]);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Direction of the Vector Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the direction (angle) of a vector in 2D or 3D space using atan2 or direction angles with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Dimension Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vector Dimension</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setDimension('2D');
                  setZ('');
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  dimension === '2D'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                2D Vector
              </button>
              <button
                onClick={() => {
                  setDimension('3D');
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                  dimension === '3D'
                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                3D Vector
              </button>
            </div>
          </div>

          {/* Vector Input */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Vector Components</h3>
            <div className={`grid ${dimension === '2D' ? 'grid-cols-2' : 'grid-cols-3'} gap-3`}>
              <Input
                label="x"
                type="text"
                value={x}
                onChange={(e) => handleInputChange('x', e.target.value)}
                placeholder="x component"
                autoFocus
              />
              <Input
                label="y"
                type="text"
                value={y}
                onChange={(e) => handleInputChange('y', e.target.value)}
                placeholder="y component"
              />
              {dimension === '3D' && (
                <Input
                  label="z"
                  type="text"
                  value={z}
                  onChange={(e) => handleInputChange('z', e.target.value)}
                  placeholder="z component"
                />
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculateDirection}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Direction
            </Button>
            <Button 
              onClick={clearAll}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Clear
            </Button>
          </div>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-3`}
                style={colors.customStyles?.resultText}
              >
                Direction Result
              </h3>
              <div className="text-center mb-4">
                {dimension === '2D' ? (
                  <>
                    <p className="text-sm text-gray-600 mb-2">The direction angle of the vector is:</p>
                    <p 
                      className={`text-3xl font-bold ${colors.result}`}
                      style={colors.customStyles?.result}
                    >
                      {formatValue(result.angle)}°
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      ({formatValue(result.angleRadians)} radians)
                    </p>
                    {result.quadrant && (
                      <p className="text-sm text-gray-600 mt-2">
                        {result.quadrant}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-2">Direction angles:</p>
                    {result.directionAngles && (
                      <div className="space-y-2">
                        <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                          α = {formatValue(result.directionAngles.alpha)}°
                        </p>
                        <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                          β = {formatValue(result.directionAngles.beta)}°
                        </p>
                        <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                          γ = {formatValue(result.directionAngles.gamma)}°
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          α = angle with x-axis, β = angle with y-axis, γ = angle with z-axis
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {calculationSteps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Step-by-Step Calculation:</h4>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {calculationSteps.map((step, index) => (
                      <p key={index} className="text-sm text-gray-600 font-mono">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formula Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Direction Formula:</h4>
            <div className="text-sm text-gray-600">
              {dimension === '2D' ? (
                <>
                  <p className="font-mono text-center text-base font-bold mb-2">θ = atan2(y, x)</p>
                  <div className="mt-2 space-y-1 text-xs">
                    <p><strong>Where:</strong></p>
                    <p>• θ = direction angle from positive x-axis</p>
                    <p>• atan2(y, x) gives angle in radians</p>
                    <p>• Angle is measured counterclockwise from positive x-axis</p>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-mono text-center text-base font-bold mb-2">α = arccos(x/|v|)</p>
                  <p className="font-mono text-center text-base font-bold mb-2">β = arccos(y/|v|)</p>
                  <p className="font-mono text-center text-base font-bold mb-2">γ = arccos(z/|v|)</p>
                  <div className="mt-2 space-y-1 text-xs">
                    <p><strong>Where:</strong></p>
                    <p>• α = angle with x-axis, β = angle with y-axis, γ = angle with z-axis</p>
                    <p>• |v| = magnitude of vector</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

