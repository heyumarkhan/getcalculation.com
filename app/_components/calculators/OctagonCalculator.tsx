'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface OctagonCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type CalculationType = 'area-from-side' | 'area-from-apothem' | 'perimeter' | 'side-from-area' | 'apothem' | 'diagonal';

export default function OctagonCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: OctagonCalculatorProps) {
  const [calculationType, setCalculationType] = useState<CalculationType>('area-from-side');
  const [sideLength, setSideLength] = useState<string>('');
  const [apothem, setApothem] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculationSteps, setCalculationSteps] = useState<string[]>([]);

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
    let calculatedResult = 0;

    if (calculationType === 'area-from-side') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      // Area = 2(1 + √2) × s²
      const constant = 2 * (1 + Math.sqrt(2));
      calculatedResult = constant * s * s;
      steps.push(`Given side length (s) = ${s}`);
      steps.push(`Area formula: A = 2(1 + √2) × s²`);
      steps.push(`A = 2(1 + √2) × ${s}²`);
      steps.push(`A = ${constant.toFixed(6)} × ${s * s}`);
      steps.push(`A = ${formatValue(calculatedResult, 6)} square units`);
    }
    else if (calculationType === 'area-from-apothem') {
      const a = parseFloat(apothem);
      if (isNaN(a) || a <= 0) {
        alert('Please enter a valid apothem (greater than 0)');
        return;
      }
      // First find side length from apothem: a = s(1 + √2)/2, so s = 2a/(1 + √2)
      const sqrt2 = Math.sqrt(2);
      const sideFromApothem = (2 * a) / (1 + sqrt2);
      // Then calculate area: A = 2(1 + √2) × s²
      calculatedResult = 2 * (1 + sqrt2) * sideFromApothem * sideFromApothem;
      steps.push(`Given apothem (a) = ${a}`);
      steps.push(`First, find side length: s = 2a / (1 + √2)`);
      steps.push(`s = 2 × ${a} / (1 + ${sqrt2.toFixed(6)})`);
      steps.push(`s = ${sideFromApothem.toFixed(6)}`);
      steps.push(`Area formula: A = 2(1 + √2) × s²`);
      steps.push(`A = 2(1 + ${sqrt2.toFixed(6)}) × ${sideFromApothem.toFixed(6)}²`);
      steps.push(`A = ${formatValue(calculatedResult, 6)} square units`);
    }
    else if (calculationType === 'perimeter') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      calculatedResult = 8 * s;
      steps.push(`Given side length (s) = ${s}`);
      steps.push(`Perimeter formula: P = 8 × s`);
      steps.push(`P = 8 × ${s}`);
      steps.push(`P = ${formatValue(calculatedResult, 6)} units`);
    }
    else if (calculationType === 'side-from-area') {
      const a = parseFloat(area);
      if (isNaN(a) || a <= 0) {
        alert('Please enter a valid area (greater than 0)');
        return;
      }
      // From A = 2(1 + √2) × s², we get s = √(A / (2(1 + √2)))
      const sqrt2 = Math.sqrt(2);
      const denominator = 2 * (1 + sqrt2);
      calculatedResult = Math.sqrt(a / denominator);
      steps.push(`Given area (A) = ${a}`);
      steps.push(`From area formula: A = 2(1 + √2) × s²`);
      steps.push(`Solving for s: s = √(A / (2(1 + √2)))`);
      steps.push(`s = √(${a} / (2(1 + ${sqrt2.toFixed(6)})))`);
      steps.push(`s = √(${a} / ${denominator.toFixed(6)})`);
      steps.push(`s = √${(a / denominator).toFixed(6)}`);
      steps.push(`s = ${formatValue(calculatedResult, 6)} units`);
    }
    else if (calculationType === 'apothem') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      // Apothem = s(1 + √2) / 2
      const sqrt2 = Math.sqrt(2);
      calculatedResult = s * (1 + sqrt2) / 2;
      steps.push(`Given side length (s) = ${s}`);
      steps.push(`Apothem formula: a = s(1 + √2) / 2`);
      steps.push(`a = ${s}(1 + ${sqrt2.toFixed(6)}) / 2`);
      steps.push(`a = ${s} × ${(1 + sqrt2).toFixed(6)} / 2`);
      steps.push(`a = ${formatValue(calculatedResult, 6)} units`);
    }
    else if (calculationType === 'diagonal') {
      const s = parseFloat(sideLength);
      if (isNaN(s) || s <= 0) {
        alert('Please enter a valid side length (greater than 0)');
        return;
      }
      // Long diagonal = s(1 + √2)
      const sqrt2 = Math.sqrt(2);
      calculatedResult = s * (1 + sqrt2);
      steps.push(`Given side length (s) = ${s}`);
      steps.push(`Long diagonal formula: d = s(1 + √2)`);
      steps.push(`d = ${s}(1 + ${sqrt2.toFixed(6)})`);
      steps.push(`d = ${s} × ${(1 + sqrt2).toFixed(6)}`);
      steps.push(`d = ${formatValue(calculatedResult, 6)} units`);
    }

    setResult(calculatedResult);
    setCalculationSteps(steps);
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
      case 'area-from-apothem':
        return 'Apothem (a)';
      case 'side-from-area':
        return 'Area (A)';
      default:
        return 'Side Length (s)';
    }
  };

  const getInputValue = () => {
    switch (calculationType) {
      case 'area-from-apothem':
        return apothem;
      case 'side-from-area':
        return area;
      default:
        return sideLength;
    }
  };

  const setInputValue = (value: string) => {
    switch (calculationType) {
      case 'area-from-apothem':
        setApothem(value);
        break;
      case 'side-from-area':
        setArea(value);
        break;
      default:
        setSideLength(value);
        break;
    }
  };

  const getResultLabel = () => {
    switch (calculationType) {
      case 'area-from-side':
      case 'area-from-apothem':
        return 'square units';
      default:
        return 'units';
    }
  };

  const clearAll = () => {
    setSideLength('');
    setApothem('');
    setArea('');
    setResult(null);
    setCalculationSteps([]);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Octagon Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate area, perimeter, side length, apothem, and diagonal of a regular octagon.</p>
          </>
        )}
      
      <div className="space-y-4">
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
                onChange={(e) => {
                  setCalculationType(e.target.value as CalculationType);
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">Area from Side Length</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="area-from-apothem"
                checked={calculationType === 'area-from-apothem'}
                onChange={(e) => {
                  setCalculationType(e.target.value as CalculationType);
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">Area from Apothem</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="perimeter"
                checked={calculationType === 'perimeter'}
                onChange={(e) => {
                  setCalculationType(e.target.value as CalculationType);
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">Perimeter</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="side-from-area"
                checked={calculationType === 'side-from-area'}
                onChange={(e) => {
                  setCalculationType(e.target.value as CalculationType);
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">Side Length from Area</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="apothem"
                checked={calculationType === 'apothem'}
                onChange={(e) => {
                  setCalculationType(e.target.value as CalculationType);
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">Apothem</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="calcType"
                value="diagonal"
                checked={calculationType === 'diagonal'}
                onChange={(e) => {
                  setCalculationType(e.target.value as CalculationType);
                  setResult(null);
                  setCalculationSteps([]);
                }}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-gray-700">Long Diagonal</span>
            </label>
          </div>
        </div>

        <Input
          label={getInputLabel()}
          type="text"
          value={getInputValue()}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Enter ${getInputLabel().toLowerCase()}`}
          autoFocus
        />

        <div className="flex gap-3">
          <Button 
            onClick={calculate}
            className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate
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
              className={`text-lg font-semibold ${colors.resultText} mb-2`}
              style={colors.customStyles?.resultText}
            >
              Result
            </h3>
            <p 
              className={`text-2xl font-bold ${colors.result}`}
              style={colors.customStyles?.result}
            >
              {formatValue(result, 6)} {getResultLabel()}
            </p>
            
            {calculationSteps.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Calculation Steps:</h4>
                <div className="space-y-1">
                  {calculationSteps.map((step, index) => (
                    <div key={index} className="text-xs text-gray-600 font-mono bg-white px-2 py-1 rounded">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Formula Reference */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Formula Reference:</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Area (from side):</strong> A = 2(1 + √2) × s²</p>
            <p><strong>Area (from apothem):</strong> A = (1/2) × a × P</p>
            <p><strong>Perimeter:</strong> P = 8 × s</p>
            <p><strong>Apothem:</strong> a = s(1 + √2) / 2</p>
            <p><strong>Long Diagonal:</strong> d = s(1 + √2)</p>
            <p><strong>Where:</strong> s = side length, a = apothem, P = perimeter</p>
          </div>
        </div>
      </div>
      </Card>
    </>
  );
}

