'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SlopeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface SlopeResult {
  slope: number;
  angle: number;
  direction: string;
  interpretation: string;
  equation: string;
}

export default function SlopeCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: SlopeCalculatorProps) {
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [result, setResult] = useState<SlopeResult | null>(null);

  const calculateSlope = () => {
    const x1Val = parseFloat(x1) || 0;
    const y1Val = parseFloat(y1) || 0;
    const x2Val = parseFloat(x2) || 0;
    const y2Val = parseFloat(y2) || 0;

    if (x1Val === x2Val) {
      alert('Cannot calculate slope: x-coordinates are the same (vertical line)');
      return;
    }

    // Calculate slope using the formula: m = (y₂ - y₁) / (x₂ - x₁)
    const slope = (y2Val - y1Val) / (x2Val - x1Val);
    
    // Calculate angle in degrees
    const angle = Math.atan(slope) * (180 / Math.PI);
    
    // Determine direction
    let direction: string;
    if (slope > 0) {
      direction = 'Upward (positive slope)';
    } else if (slope < 0) {
      direction = 'Downward (negative slope)';
    } else {
      direction = 'Horizontal (zero slope)';
    }

    // Interpretation
    let interpretation: string;
    if (Math.abs(slope) === 0) {
      interpretation = 'Horizontal line - no rise';
    } else if (Math.abs(slope) === 1) {
      interpretation = '45° angle - equal rise and run';
    } else if (Math.abs(slope) < 1) {
      interpretation = 'Gentle slope - more horizontal than vertical';
    } else if (Math.abs(slope) > 1) {
      interpretation = 'Steep slope - more vertical than horizontal';
    } else {
      interpretation = 'Moderate slope';
    }

    // Generate equation in slope-intercept form
    const b = y1Val - slope * x1Val;
    let equation: string;
    if (b === 0) {
      equation = `y = ${slope}x`;
    } else if (b > 0) {
      equation = `y = ${slope}x + ${b}`;
    } else {
      equation = `y = ${slope}x - ${Math.abs(b)}`;
    }

    setResult({
      slope,
      angle,
      direction,
      interpretation,
      equation
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'x1':
        setX1(value);
        break;
      case 'y1':
        setY1(value);
        break;
      case 'x2':
        setX2(value);
        break;
      case 'y2':
        setY2(value);
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
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Slope (Gradient) Calculator</h2>
            <p className="text-gray-600 mb-6">Enter two points to find the slope of the line between them:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Point 1 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Point 1 (x₁, y₁)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="x₁"
              type="text"
              value={x1}
              onChange={(e) => handleInputChange('x1', e.target.value)}
              placeholder="x coordinate"
              autoFocus
            />
            <Input
              label="y₁"
              type="text"
              value={y1}
              onChange={(e) => handleInputChange('y1', e.target.value)}
              placeholder="y coordinate"
            />
          </div>
        </div>

        {/* Point 2 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Point 2 (x₂, y₂)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="x₂"
              type="text"
              value={x2}
              onChange={(e) => handleInputChange('x2', e.target.value)}
              placeholder="x coordinate"
            />
            <Input
              label="y₂"
              type="text"
              value={y2}
              onChange={(e) => handleInputChange('y2', e.target.value)}
              placeholder="y coordinate"
            />
          </div>
        </div>

        <Button 
          onClick={calculateSlope}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Slope
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
              Slope Analysis
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Slope (m):</p>
                <p className="font-mono text-xl font-bold">{result.slope.toFixed(6)}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Angle:</p>
                <p className="font-mono">{result.angle.toFixed(2)}°</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Direction:</p>
                <p className="font-mono">{result.direction}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Interpretation:</p>
                <p className="font-mono">{result.interpretation}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Line Equation:</p>
                <p className="font-mono text-lg">{result.equation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
