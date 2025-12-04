'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface GoldenRatioCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type CalculationType = 'ratio-value' | 'multiply' | 'divide' | 'rectangle';

interface GoldenRatioResult {
  type: CalculationType;
  input: number;
  result: number;
  goldenRatio: number;
  calculation: string;
  steps: string[];
}

export default function GoldenRatioCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: GoldenRatioCalculatorProps) {
  const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2; // φ (phi)
  
  const [calculationType, setCalculationType] = useState<CalculationType>('multiply');
  const [inputValue, setInputValue] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [result, setResult] = useState<GoldenRatioResult | null>(null);

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
    let calculation = '';

    if (calculationType === 'ratio-value') {
      calculatedResult = GOLDEN_RATIO;
      steps.push(`Golden Ratio (φ) = (1 + √5) / 2`);
      steps.push(`φ = (1 + ${Math.sqrt(5).toFixed(10)}) / 2`);
      steps.push(`φ = ${(1 + Math.sqrt(5)).toFixed(10)} / 2`);
      steps.push(`φ = ${GOLDEN_RATIO.toFixed(15)}`);
      calculation = `Golden Ratio = ${formatValue(GOLDEN_RATIO, 15)}`;
    } 
    else if (calculationType === 'multiply') {
      const input = parseFloat(inputValue);
      if (isNaN(input) || input === 0) {
        alert('Please enter a valid number');
        return;
      }
      calculatedResult = input * GOLDEN_RATIO;
      steps.push(`Given value: ${input}`);
      steps.push(`Golden Ratio (φ) = ${formatValue(GOLDEN_RATIO, 10)}`);
      steps.push(`Result = ${input} × ${formatValue(GOLDEN_RATIO, 10)}`);
      steps.push(`Result = ${formatValue(calculatedResult, 10)}`);
      calculation = `${input} × φ = ${formatValue(calculatedResult, 10)}`;
    }
    else if (calculationType === 'divide') {
      const input = parseFloat(inputValue);
      if (isNaN(input) || input === 0) {
        alert('Please enter a valid number');
        return;
      }
      calculatedResult = input / GOLDEN_RATIO;
      steps.push(`Given value: ${input}`);
      steps.push(`Golden Ratio (φ) = ${formatValue(GOLDEN_RATIO, 10)}`);
      steps.push(`Result = ${input} ÷ ${formatValue(GOLDEN_RATIO, 10)}`);
      steps.push(`Result = ${formatValue(calculatedResult, 10)}`);
      calculation = `${input} ÷ φ = ${formatValue(calculatedResult, 10)}`;
    }
    else if (calculationType === 'rectangle') {
      const w = parseFloat(width);
      if (isNaN(w) || w <= 0) {
        alert('Please enter a valid width (greater than 0)');
        return;
      }
      const height = w * GOLDEN_RATIO;
      calculatedResult = height;
      steps.push(`Given width: ${w}`);
      steps.push(`Golden Ratio (φ) = ${formatValue(GOLDEN_RATIO, 10)}`);
      steps.push(`For a golden rectangle: height = width × φ`);
      steps.push(`Height = ${w} × ${formatValue(GOLDEN_RATIO, 10)}`);
      steps.push(`Height = ${formatValue(height, 10)}`);
      calculation = `Golden Rectangle: Width = ${w}, Height = ${formatValue(height, 10)}`;
    }

    setResult({
      type: calculationType,
      input: calculationType === 'rectangle' ? parseFloat(width) : parseFloat(inputValue) || 0,
      result: calculatedResult,
      goldenRatio: GOLDEN_RATIO,
      calculation,
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
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Golden Ratio Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the golden ratio (φ), multiply or divide by φ, or find golden rectangle dimensions:</p>
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
                  value="ratio-value"
                  checked={calculationType === 'ratio-value'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Show Golden Ratio Value</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="multiply"
                  checked={calculationType === 'multiply'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Multiply by φ</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="divide"
                  checked={calculationType === 'divide'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Divide by φ</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="calcType"
                  value="rectangle"
                  checked={calculationType === 'rectangle'}
                  onChange={(e) => setCalculationType(e.target.value as CalculationType)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">Golden Rectangle</span>
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Input Values</h3>
            <div className="space-y-3">
              {calculationType === 'rectangle' ? (
                <Input
                  label="Width"
                  type="text"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="Enter width"
                  autoFocus
                />
              ) : calculationType !== 'ratio-value' ? (
                <Input
                  label="Value"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a number"
                  autoFocus
                />
              ) : null}
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
                    <div className="text-sm text-gray-600 mb-1">Golden Ratio (φ)</div>
                    <div className="text-2xl font-mono font-bold text-gray-900">
                      {formatValue(result.goldenRatio, 15)}
                    </div>
                  </div>

                  {result.type === 'ratio-value' ? (
                    <div className="space-y-3">
                      <div className="text-center py-2">
                        <div className="text-lg font-semibold text-gray-900">
                          The Golden Ratio
                        </div>
                      </div>
                    </div>
                  ) : result.type === 'rectangle' ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Width:</span>
                        <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.input)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Height:</span>
                        <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.result)}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                        Ratio: {formatValue(result.result / result.input, 10)} ≈ φ
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">Input:</span>
                        <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.input)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700">Result:</span>
                        <span className="font-mono font-bold text-lg text-gray-900">{formatValue(result.result)}</span>
                      </div>
                    </div>
                  )}

                  {/* Calculation Steps */}
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
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">✨</div>
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

