'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface MidpointCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function MidpointCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: MidpointCalculatorProps) {
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [result, setResult] = useState<{x: number, y: number} | null>(null);

  const calculateMidpoint = () => {
    const x1Val = parseFloat(x1) || 0;
    const y1Val = parseFloat(y1) || 0;
    const x2Val = parseFloat(x2) || 0;
    const y2Val = parseFloat(y2) || 0;

    // Calculate midpoint using the formula: M = ((x1 + x2)/2, (y1 + y2)/2)
    const midpointX = (x1Val + x2Val) / 2;
    const midpointY = (y1Val + y2Val) / 2;
    
    setResult({ x: midpointX, y: midpointY });
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Midpoint Calculator</h2>
            <p className="text-gray-600 mb-6">Enter two points to find their midpoint:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Point 1 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Point 1 (x₁, y₁)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="x₁"
              type="number"
              value={x1}
              onChange={(e) => handleInputChange('x1', e.target.value)}
              placeholder="x coordinate"
              step="0.01"
            />
            <Input
              label="y₁"
              type="number"
              value={y1}
              onChange={(e) => handleInputChange('y1', e.target.value)}
              placeholder="y coordinate"
              step="0.01"
            />
          </div>
        </div>

        {/* Point 2 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Point 2 (x₂, y₂)</h3>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="x₂"
              type="number"
              value={x2}
              onChange={(e) => handleInputChange('x2', e.target.value)}
              placeholder="x coordinate"
              step="0.01"
            />
            <Input
              label="y₂"
              type="number"
              value={y2}
              onChange={(e) => handleInputChange('y2', e.target.value)}
              placeholder="y coordinate"
              step="0.01"
            />
          </div>
        </div>

        <Button 
          onClick={calculateMidpoint}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Midpoint
        </Button>

        {result !== null && (
          <div 
            className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-3`}
              style={colors.customStyles?.resultText}
            >
              Midpoint Result
            </h3>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">The midpoint is:</p>
              <p 
                className={`text-2xl font-bold ${colors.result}`}
                style={colors.customStyles?.result}
              >
                ({result.x}, {result.y})
              </p>
              <div className="mt-3 text-sm text-gray-600">
                <p><strong>x-coordinate:</strong> {result.x}</p>
                <p><strong>y-coordinate:</strong> {result.y}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
