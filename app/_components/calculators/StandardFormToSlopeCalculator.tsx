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
  primaryColor = '#820ECC' 
}: StandardFormToSlopeCalculatorProps) {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<{ slope: number; yIntercept: number; equation: string } | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

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
    <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Form to Slope Intercept Form</h2>
            <p className="text-gray-600 mb-6">Convert Ax + By = C to y = mx + b format:</p>
          </>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          {/* Calculator Form - Left Side */}
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Enter coefficients for: Ax + By = C</p>
          </div>

          <Input
            label="A (coefficient of x)"
            type="text"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Enter A"
            autoFocus
          />

          <Input
            label="B (coefficient of y)"
            type="text"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Enter B"
          />

          <Input
            label="C (constant)"
            type="text"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="Enter C"
          />

          <Button 
            onClick={calculateSlopeIntercept}
            className="w-full"
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
                Conversion Results
              </h3>
              
              {result !== null ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Slope:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.slope === Infinity ? 'Undefined' : formatValue(result.slope)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Y-intercept:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.yIntercept)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700 text-lg">Equation:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.equation}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">📐</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter coefficients to convert standard form to slope-intercept form</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
