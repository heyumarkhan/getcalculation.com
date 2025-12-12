'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface RectangularPrismCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface RectangularPrismResult {
  length: number;
  width: number;
  height: number;
  volume: number;
  surfaceArea: number;
  lateralSurfaceArea: number;
  diagonal: number;
  steps: string[];
}

export default function RectangularPrismCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: RectangularPrismCalculatorProps) {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<RectangularPrismResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(6);
  };

  const calculatePrism = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    if (l <= 0 || w <= 0 || h <= 0) {
      alert('All dimensions must be greater than zero');
      return;
    }

    const steps: string[] = [];
    
    // Calculate volume: V = l × w × h
    const volume = l * w * h;
    steps.push(`Given: Length (l) = ${l}, Width (w) = ${w}, Height (h) = ${h}`);
    steps.push(`Volume (V) = l × w × h`);
    steps.push(`V = ${l} × ${w} × ${h}`);
    steps.push(`V = ${(l * w).toFixed(6)} × ${h}`);
    steps.push(`V = ${formatValue(volume)} cubic units`);

    // Calculate surface area: SA = 2(lw + lh + wh)
    const lw = l * w;
    const lh = l * h;
    const wh = w * h;
    const surfaceArea = 2 * (lw + lh + wh);
    steps.push(``);
    steps.push(`Surface Area (SA) = 2(lw + lh + wh)`);
    steps.push(`SA = 2(${l}×${w} + ${l}×${h} + ${w}×${h})`);
    steps.push(`SA = 2(${formatValue(lw)} + ${formatValue(lh)} + ${formatValue(wh)})`);
    steps.push(`SA = 2(${formatValue(lw + lh + wh)})`);
    steps.push(`SA = ${formatValue(surfaceArea)} square units`);

    // Calculate lateral surface area: LSA = 2h(l + w)
    const lateralSurfaceArea = 2 * h * (l + w);
    steps.push(``);
    steps.push(`Lateral Surface Area (LSA) = 2h(l + w)`);
    steps.push(`LSA = 2 × ${h} × (${l} + ${w})`);
    steps.push(`LSA = 2 × ${h} × ${formatValue(l + w)}`);
    steps.push(`LSA = ${formatValue(2 * h)} × ${formatValue(l + w)}`);
    steps.push(`LSA = ${formatValue(lateralSurfaceArea)} square units`);

    // Calculate diagonal: d = √(l² + w² + h²)
    const diagonal = Math.sqrt(l * l + w * w + h * h);
    steps.push(``);
    steps.push(`Diagonal (d) = √(l² + w² + h²)`);
    steps.push(`d = √(${l}² + ${w}² + ${h}²)`);
    steps.push(`d = √(${formatValue(l * l)} + ${formatValue(w * w)} + ${formatValue(h * h)})`);
    steps.push(`d = √${formatValue(l * l + w * w + h * h)}`);
    steps.push(`d = ${formatValue(diagonal)} units`);

    setResult({
      length: l,
      width: w,
      height: h,
      volume,
      surfaceArea,
      lateralSurfaceArea,
      diagonal,
      steps
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'length':
        setLength(value);
        break;
      case 'width':
        setWidth(value);
        break;
      case 'height':
        setHeight(value);
        break;
      default:
        break;
    }
    if (result !== null) {
      setResult(null);
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
    setLength('');
    setWidth('');
    setHeight('');
    setResult(null);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rectangular Prism Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate volume, surface area, lateral surface area, and diagonal of a rectangular prism (cuboid) with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Prism Dimensions</h3>
            <div className="space-y-3">
              <Input
                label="Length (l)"
                type="text"
                value={length}
                onChange={(e) => handleInputChange('length', e.target.value)}
                placeholder="Enter length"
                autoFocus
              />
              <Input
                label="Width (w)"
                type="text"
                value={width}
                onChange={(e) => handleInputChange('width', e.target.value)}
                placeholder="Enter width"
              />
              <Input
                label="Height (h)"
                type="text"
                value={height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="Enter height"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculatePrism}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Properties
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
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                Calculation Results
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600 mb-1">Volume</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.volume)}
                  </p>
                  <p className="text-xs text-gray-500">cubic units</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600 mb-1">Surface Area</p>
                  <p className={`text-xl font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.surfaceArea)}
                  </p>
                  <p className="text-xs text-gray-500">square units</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600 mb-1">Lateral Surface Area</p>
                  <p className={`text-lg font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.lateralSurfaceArea)}
                  </p>
                  <p className="text-xs text-gray-500">square units</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-600 mb-1">Diagonal</p>
                  <p className={`text-lg font-bold ${colors.result}`} style={colors.customStyles?.result}>
                    {formatValue(result.diagonal)}
                  </p>
                  <p className="text-xs text-gray-500">units</p>
                </div>
              </div>
              
              {result.steps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Step-by-Step Calculation:</h4>
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {result.steps.map((step, index) => (
                      <p key={index} className={`text-sm font-mono ${step === '' ? 'py-1' : 'text-gray-600'}`}>
                        {step || '\u00A0'}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formula Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Key Formulas for Rectangular Prisms:</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Volume:</strong> V = l × w × h</p>
              <p><strong>Surface Area:</strong> SA = 2(lw + lh + wh)</p>
              <p><strong>Lateral Surface Area:</strong> LSA = 2h(l + w)</p>
              <p><strong>Diagonal:</strong> d = √(l² + w² + h²)</p>
              <p className="mt-2 text-xs"><strong>Where:</strong> l = length, w = width, h = height</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

