'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface StandardFormToSlopeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function StandardFormToSlopeCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: StandardFormToSlopeCalculatorProps) {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<{ slope: number; yIntercept: number; equation: string } | null>(null);

  const calculateSlopeIntercept = () => {
    const aValue = parseFloat(a) || 0;
    const bValue = parseFloat(b) || 0;
    const cValue = parseFloat(c) || 0;

    if (bValue === 0) {
      setResult({
        slope: Infinity,
        yIntercept: 0,
        equation: 'Vertical line (undefined slope)'
      });
      return;
    }

    const slope = -aValue / bValue;
    const yIntercept = cValue / bValue;
    
    let equation = '';
    if (slope === 0) {
      equation = `y = ${yIntercept}`;
    } else if (yIntercept === 0) {
      equation = `y = ${slope}x`;
    } else if (yIntercept > 0) {
      equation = `y = ${slope}x + ${yIntercept}`;
    } else {
      equation = `y = ${slope}x - ${Math.abs(yIntercept)}`;
    }

    setResult({
      slope,
      yIntercept,
      equation
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
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Form to Slope Intercept Form</h2>
            <p className="text-gray-600 mb-6">Convert Ax + By = C to y = mx + b format:</p>
          </>
        )}
        
        <div className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Enter coefficients for: Ax + By = C</p>
          </div>

          <Input
            label="A (coefficient of x)"
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Enter A"
            step="0.01"
          />

          <Input
            label="B (coefficient of y)"
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Enter B"
            step="0.01"
          />

          <Input
            label="C (constant)"
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="Enter C"
            step="0.01"
          />

          <Button 
            onClick={calculateSlopeIntercept}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Convert to Slope Intercept Form
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
                Result
              </h3>
              
              <div className="space-y-2">
                <div>
                  <span className="font-medium text-gray-700">Slope (m): </span>
                  <span 
                    className={`font-bold ${colors.result}`}
                    style={colors.customStyles?.result}
                  >
                    {result.slope === Infinity ? 'Undefined' : result.slope.toFixed(2)}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Y-intercept (b): </span>
                  <span 
                    className={`font-bold ${colors.result}`}
                    style={colors.customStyles?.result}
                  >
                    {result.yIntercept.toFixed(2)}
                  </span>
                </div>
                
                <div className="pt-2 border-t border-gray-200">
                  <span className="font-medium text-gray-700">Equation: </span>
                  <span 
                    className={`font-bold text-lg ${colors.result}`}
                    style={colors.customStyles?.result}
                  >
                    {result.equation}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
