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
      <Card className="max-w-2xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Trigonometry Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate all six trigonometric functions for any angle in degrees or radians:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Angle Input */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Angle Input</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          Calculate Trigonometric Functions
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
              Trigonometric Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Basic Functions */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 mb-2">Basic Functions</h4>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">sin(θ):</p>
                  <p className="font-mono text-lg font-bold">{formatTrigValue(result.sin)}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">cos(θ):</p>
                  <p className="font-mono text-lg font-bold">{formatTrigValue(result.cos)}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">tan(θ):</p>
                  <p className="font-mono text-lg font-bold">{formatTrigValue(result.tan)}</p>
                </div>
              </div>

              {/* Reciprocal Functions */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 mb-2">Reciprocal Functions</h4>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">csc(θ):</p>
                  <p className="font-mono text-lg font-bold">{formatTrigValue(result.csc)}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">sec(θ):</p>
                  <p className="font-mono text-lg font-bold">{formatTrigValue(result.sec)}</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">cot(θ):</p>
                  <p className="font-mono text-lg font-bold">{formatTrigValue(result.cot)}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Angle in Radians:</p>
                <p className="font-mono">{result.angleRadians.toFixed(6)}</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Quadrant:</p>
                <p className="font-mono">{result.quadrant}</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Reference Angle:</p>
                <p className="font-mono">{result.referenceAngle.toFixed(2)}°</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
