'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface LineSegmentCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function LineSegmentCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: LineSegmentCalculatorProps) {
  const [x1, setX1] = useState<string>('');
  const [y1, setY1] = useState<string>('');
  const [x2, setX2] = useState<string>('');
  const [y2, setY2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculateDistance = () => {
    const x1Val = parseFloat(x1) || 0;
    const y1Val = parseFloat(y1) || 0;
    const x2Val = parseFloat(x2) || 0;
    const y2Val = parseFloat(y2) || 0;

    // Calculate distance using the distance formula: d = √[(x₂-x₁)² + (y₂-y₁)²]
    const deltaX = x2Val - x1Val;
    const deltaY = y2Val - y1Val;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    setResult(distance);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Line Segment Length Calculator</h2>
            <p className="text-gray-600 mb-6">Enter two points to find the length of the line segment between them:</p>
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
          onClick={calculateDistance}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Length
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
              Line Segment Length
            </h3>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">The distance between the two points is:</p>
              <p 
                className={`text-3xl font-bold ${colors.result}`}
                style={colors.customStyles?.result}
              >
                {result.toFixed(6)} units
              </p>
              <div className="mt-3 text-sm text-gray-600">
                <p><strong>Exact value:</strong> {result}</p>
                <p><strong>Rounded (2 decimals):</strong> {result.toFixed(2)} units</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
