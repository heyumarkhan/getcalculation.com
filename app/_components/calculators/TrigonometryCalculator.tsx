'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface TrigonometryCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface TrigonometryResult {
  sin: number;
  cos: number;
  tan: number;
  csc: number;
  sec: number;
  cot: number;
  angleRadians: number;
  quadrant: string;
  referenceAngle: number;
}

export default function TrigonometryCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: TrigonometryCalculatorProps) {
  const [angle, setAngle] = useState<string>('');
  const [angleType, setAngleType] = useState<'degrees' | 'radians'>('degrees');
  const [result, setResult] = useState<TrigonometryResult | null>(null);

  const calculateTrigonometry = () => {
    const angleValue = parseFloat(angle);
    
    if (isNaN(angleValue)) {
      alert('Please enter a valid angle');
      return;
    }

    let angleInRadians: number;
    let angleInDegrees: number;

    if (angleType === 'degrees') {
      angleInDegrees = angleValue;
      angleInRadians = (angleValue * Math.PI) / 180;
    } else {
      angleInRadians = angleValue;
      angleInDegrees = (angleValue * 180) / Math.PI;
    }

    // Normalize angle to 0-360 degrees for quadrant determination
    const normalizedAngle = ((angleInDegrees % 360) + 360) % 360;

    // Calculate basic trigonometric functions
    const sin = Math.sin(angleInRadians);
    const cos = Math.cos(angleInRadians);
    const tan = Math.tan(angleInRadians);

    // Calculate reciprocal functions
    const csc = sin !== 0 ? 1 / sin : Infinity;
    const sec = cos !== 0 ? 1 / cos : Infinity;
    const cot = tan !== 0 ? 1 / tan : Infinity;

    // Determine quadrant
    let quadrant: string;
    if (normalizedAngle >= 0 && normalizedAngle < 90) {
      quadrant = 'I (0° to 90°)';
    } else if (normalizedAngle >= 90 && normalizedAngle < 180) {
      quadrant = 'II (90° to 180°)';
    } else if (normalizedAngle >= 180 && normalizedAngle < 270) {
      quadrant = 'III (180° to 270°)';
    } else {
      quadrant = 'IV (270° to 360°)';
    }

    // Calculate reference angle
    let referenceAngle: number;
    if (normalizedAngle <= 90) {
      referenceAngle = normalizedAngle;
    } else if (normalizedAngle <= 180) {
      referenceAngle = 180 - normalizedAngle;
    } else if (normalizedAngle <= 270) {
      referenceAngle = normalizedAngle - 180;
    } else {
      referenceAngle = 360 - normalizedAngle;
    }

    setResult({
      sin,
      cos,
      tan,
      csc,
      sec,
      cot,
      angleRadians: angleInRadians,
      quadrant,
      referenceAngle
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'angle':
        setAngle(value);
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

  const formatTrigValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(6);
  };

  const formatTrigValueLimited = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    
    return value.toFixed(4);
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
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trigonometry Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate all six trigonometric functions for any angle in degrees or radians:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Angle Input */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Angle Input</h3>
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Angle"
                type="text"
                value={angle}
                onChange={(e) => handleInputChange('angle', e.target.value)}
                placeholder="Enter angle value"
                autoFocus
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Angle Type</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="angleType"
                      value="degrees"
                      checked={angleType === 'degrees'}
                      onChange={(e) => setAngleType(e.target.value as 'degrees' | 'radians')}
                      className="mr-2"
                    />
                    Degrees
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="angleType"
                      value="radians"
                      checked={angleType === 'radians'}
                      onChange={(e) => setAngleType(e.target.value as 'degrees' | 'radians')}
                      className="mr-2"
                    />
                    Radians
                  </label>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateTrigonometry}
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
              Trigonometric Results
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">sin(θ):</span>
                      <span className="font-mono font-bold text-xl text-gray-900">
                        {formatTrigValueLimited(result.sin)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">cos(θ):</span>
                      <span className="font-mono font-bold text-xl text-gray-900">
                        {formatTrigValueLimited(result.cos)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">tan(θ):</span>
                      <span className="font-mono font-bold text-xl text-gray-900">
                        {formatTrigValueLimited(result.tan)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">csc(θ):</span>
                      <span className="font-mono font-bold text-xl text-gray-900">
                        {formatTrigValueLimited(result.csc)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">sec(θ):</span>
                      <span className="font-mono font-bold text-xl text-gray-900">
                        {formatTrigValueLimited(result.sec)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700 text-lg">cot(θ):</span>
                      <span className="font-mono font-bold text-xl text-gray-900">
                        {formatTrigValueLimited(result.cot)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📐</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter an angle and click calculate to see all trigonometric functions</p>
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
