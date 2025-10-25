'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ParabolaCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface ParabolaResult {
  vertex: { x: number; y: number };
  focus: { x: number; y: number };
  directrix: string;
  axisOfSymmetry: string;
  direction: string;
  p: number;
  equation: string;
}

export default function ParabolaCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: ParabolaCalculatorProps) {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [result, setResult] = useState<ParabolaResult | null>(null);

  const calculateParabola = () => {
    const aVal = parseFloat(a) || 0;
    const bVal = parseFloat(b) || 0;
    const cVal = parseFloat(c) || 0;

    if (aVal === 0) {
      alert('Coefficient "a" cannot be zero for a parabola');
      return;
    }

    // Calculate vertex: (h, k) = (-b/(2a), f(-b/(2a)))
    const h = -bVal / (2 * aVal);
    const k = aVal * h * h + bVal * h + cVal;

    // Calculate p (distance from vertex to focus)
    const p = 1 / (4 * aVal);

    // Calculate focus and directrix based on direction
    let focusX, focusY, directrix;
    let direction, axisOfSymmetry;

    if (Math.abs(aVal) > 0) {
      // Standard form: y = ax² + bx + c
      focusX = h;
      focusY = k + p;
      directrix = `y = ${k - p}`;
      direction = aVal > 0 ? 'Upward' : 'Downward';
      axisOfSymmetry = `x = ${h}`;
    } else {
      // This shouldn't happen due to validation above
      return;
    }

    const equation = `y = ${aVal}x² + ${bVal}x + ${cVal}`;

    setResult({
      vertex: { x: h, y: k },
      focus: { x: focusX, y: focusY },
      directrix,
      axisOfSymmetry,
      direction,
      p: Math.abs(p),
      equation
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'a':
        setA(value);
        break;
      case 'b':
        setB(value);
        break;
      case 'c':
        setC(value);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Parabola Calculator</h2>
            <p className="text-gray-600 mb-6">Enter the coefficients of your quadratic equation (y = ax² + bx + c):</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Equation Input */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Quadratic Equation: y = ax² + bx + c</h3>
          <div className="space-y-3">
            <Input
              label="a (coefficient of x²)"
              type="text"
              value={a}
              onChange={(e) => handleInputChange('a', e.target.value)}
              placeholder="Enter coefficient a"
              autoFocus
            />
            <Input
              label="b (coefficient of x)"
              type="text"
              value={b}
              onChange={(e) => handleInputChange('b', e.target.value)}
              placeholder="Enter coefficient b"
            />
            <Input
              label="c (constant term)"
              type="text"
              value={c}
              onChange={(e) => handleInputChange('c', e.target.value)}
              placeholder="Enter constant c"
            />
          </div>
        </div>

        <Button 
          onClick={calculateParabola}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Parabola Properties
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
              Parabola Properties
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-2">Equation:</p>
                <p className="font-mono text-lg">{result.equation}</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Vertex:</p>
                  <p className="font-mono">({result.vertex.x.toFixed(4)}, {result.vertex.y.toFixed(4)})</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Focus:</p>
                  <p className="font-mono">({result.focus.x.toFixed(4)}, {result.focus.y.toFixed(4)})</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Directrix:</p>
                  <p className="font-mono">{result.directrix}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Axis of Symmetry:</p>
                  <p className="font-mono">{result.axisOfSymmetry}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Direction:</p>
                  <p className="font-mono">{result.direction}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Distance p (vertex to focus):</p>
                  <p className="font-mono">{result.p.toFixed(4)}</p>
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
