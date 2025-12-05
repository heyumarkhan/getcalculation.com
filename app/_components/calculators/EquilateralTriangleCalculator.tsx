'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface EquilateralTriangleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type CalculationType = 'area-from-side' | 'perimeter' | 'height' | 'side-from-area' | 'side-from-height' | 'side-from-perimeter';

interface EquilateralTriangleResult {
  type: CalculationType;
  side: number;
  area: number;
  perimeter: number;
  height: number;
  steps: string[];
}

export default function EquilateralTriangleCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: EquilateralTriangleCalculatorProps) {
  const [calculationType, setCalculationType] = useState<CalculationType>('area-from-side');
  const [sideLength, setSideLength] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [perimeter, setPerimeter] = useState<string>('');
  const [result, setResult] = useState<EquilateralTriangleResult | null>(null);

  const formatValue = (value: number, precision: number = 6): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(precision);
  };

  const calculate = () => {
    const steps: string[] = [];
    let calculatedSide = 0;
    let calculatedArea = 0;
    let calculatedPerimeter = 0;
    let calculatedHeight = 0;

    if (calculationType === 'area-from-side') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      // Area = (√3/4) × s²
      calculatedArea = (Math.sqrt(3) / 4) * s * s;
      calculatedPerimeter = 3 * s;
      calculatedHeight = s * Math.sqrt(3) / 2;
      
      steps.push(`Given side length (s) = ${s}`);
      steps.push(`Area formula: A = (√3/4) × s²`);
      steps.push(`A = (√3/4) × ${s}²`);
      steps.push(`A = (${Math.sqrt(3).toFixed(6)}/4) × ${s * s}`);
      steps.push(`A = ${(Math.sqrt(3) / 4).toFixed(6)} × ${s * s}`);
      steps.push(`A = ${formatValue(calculatedArea, 6)} square units`);
      steps.push(`Perimeter: P = 3s = 3 × ${s} = ${formatValue(calculatedPerimeter, 6)} units`);
      steps.push(`Height: h = s√3/2 = ${s} × ${Math.sqrt(3).toFixed(6)}/2 = ${formatValue(calculatedHeight, 6)} units`);
    }
    else if (calculationType === 'perimeter') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      calculatedPerimeter = 3 * s;
      calculatedArea = (Math.sqrt(3) / 4) * s * s;
      calculatedHeight = s * Math.sqrt(3) / 2;
      
      steps.push(`Given side length (s) = ${s}`);
      steps.push(`Perimeter formula: P = 3s`);
      steps.push(`P = 3 × ${s}`);
      steps.push(`P = ${formatValue(calculatedPerimeter, 6)} units`);
    }
    else if (calculationType === 'height') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedSide = s;
      calculatedHeight = s * Math.sqrt(3) / 2;
      calculatedArea = (Math.sqrt(3) / 4) * s * s;
      calculatedPerimeter = 3 * s;
      
      steps.push(`Given side length (s) = ${s}`);
      steps.push(`Height formula: h = s√3/2`);
      steps.push(`h = ${s} × √3/2`);
      steps.push(`h = ${s} × ${Math.sqrt(3).toFixed(6)}/2`);
      steps.push(`h = ${formatValue(calculatedHeight, 6)} units`);
    }
    else if (calculationType === 'side-from-area') {
      const a = parseFloat(area);
      if (isNaN(a) || a <= 0) {
        alert('Please enter a valid area (greater than 0)');
        return;
      }
      // From A = (√3/4) × s², we get s = √(4A/√3)
      calculatedSide = Math.sqrt(4 * a / Math.sqrt(3));
      calculatedArea = a;
      calculatedPerimeter = 3 * calculatedSide;
      calculatedHeight = calculatedSide * Math.sqrt(3) / 2;
      
      steps.push(`Given area (A) = ${a}`);
      steps.push(`From area formula: A = (√3/4) × s²`);
      steps.push(`Solving for s: s = √(4A/√3)`);
      steps.push(`s = √(4 × ${a} / √3)`);
      steps.push(`s = √(${4 * a} / ${Math.sqrt(3).toFixed(6)})`);
      steps.push(`s = √${(4 * a / Math.sqrt(3)).toFixed(6)}`);
      steps.push(`s = ${formatValue(calculatedSide, 6)} units`);
    }
    else if (calculationType === 'side-from-height') {
      const h = parseFloat(height);
      if (isNaN(h) || h <= 0) {
        alert('Please enter a valid height (greater than 0)');
        return;
      }
      // From h = s√3/2, we get s = 2h/√3
      calculatedHeight = h;
      calculatedSide = 2 * h / Math.sqrt(3);
      calculatedArea = (Math.sqrt(3) / 4) * calculatedSide * calculatedSide;
      calculatedPerimeter = 3 * calculatedSide;
      
      steps.push(`Given height (h) = ${h}`);
      steps.push(`From height formula: h = s√3/2`);
      steps.push(`Solving for s: s = 2h/√3`);
      steps.push(`s = 2 × ${h} / √3`);
      steps.push(`s = ${2 * h} / ${Math.sqrt(3).toFixed(6)}`);
      steps.push(`s = ${formatValue(calculatedSide, 6)} units`);
    }
    else if (calculationType === 'side-from-perimeter') {
      const p = parseFloat(perimeter);
      if (isNaN(p) || p <= 0) {
        alert('Please enter a valid perimeter (greater than 0)');
        return;
      }
      // From P = 3s, we get s = P/3
      calculatedPerimeter = p;
      calculatedSide = p / 3;
      calculatedArea = (Math.sqrt(3) / 4) * calculatedSide * calculatedSide;
      calculatedHeight = calculatedSide * Math.sqrt(3) / 2;
      
      steps.push(`Given perimeter (P) = ${p}`);
      steps.push(`From perimeter formula: P = 3s`);
      steps.push(`Solving for s: s = P/3`);
      steps.push(`s = ${p} / 3`);
      steps.push(`s = ${formatValue(calculatedSide, 6)} units`);
    }

    setResult({
      type: calculationType,
      side: calculatedSide,
      area: calculatedArea,
      perimeter: calculatedPerimeter,
      height: calculatedHeight,
      steps
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

  const getInputLabel = () => {
    switch (calculationType) {
      case 'side-from-area':
        return 'Area (A)';
      case 'side-from-height':
        return 'Height (h)';
      case 'side-from-perimeter':
        return 'Perimeter (P)';
      default:
        return 'Side Length (s)';
    }
  };

  const getInputValue = () => {
    switch (calculationType) {
      case 'side-from-area':
        return area;
      case 'side-from-height':
        return height;
      case 'side-from-perimeter':
        return perimeter;
      default:
        return sideLength;
    }
  };

  const setInputValue = (value: string) => {
    switch (calculationType) {
      case 'side-from-area':
        setArea(value);
        break;
      case 'side-from-height':
        setHeight(value);
        break;
      case 'side-from-perimeter':
        setPerimeter(value);
        break;
      default:
        setSideLength(value);
        break;
    }
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Equilateral Triangle Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate area, perimeter, height, and side length of an equilateral triangle with step-by-step solutions:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Calculation Type Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Calculation Type</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="area-from-side"
                  checked={calculationType === 'area-from-side'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Area from Side Length</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="perimeter"
                  checked={calculationType === 'perimeter'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Perimeter</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="height"
                  checked={calculationType === 'height'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Height</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="side-from-area"
                  checked={calculationType === 'side-from-area'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Side Length from Area</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="side-from-height"
                  checked={calculationType === 'side-from-height'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Side Length from Height</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="side-from-perimeter"
                  checked={calculationType === 'side-from-perimeter'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Side Length from Perimeter</span>
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Input Values</h3>
            <div className="space-y-3">
              <Input
                label={getInputLabel()}
                type="text"
                value={getInputValue()}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter ${getInputLabel().toLowerCase()}`}
                autoFocus
              />
            </div>
          </div>

          <Button 
            onClick={calculate}
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
              Result
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6 space-y-4">
                  <div className="text-center py-3 border-b border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Equilateral Triangle Properties</div>
                    <div className="text-xs text-gray-500">All sides equal, all angles = 60°</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Side Length:</span>
                      <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.side, 6)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Area:</span>
                      <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.area, 6)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Perimeter:</span>
                      <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.perimeter, 6)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700">Height:</span>
                      <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.height, 6)}</span>
                    </div>
                  </div>

                  {/* Calculation Steps */}
                  {result.steps.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Calculation Steps:</h4>
                      <div className="space-y-1">
                        {result.steps.map((step, index) => (
                          <div key={index} className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">🔺</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Select a calculation type and enter values</p>
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

