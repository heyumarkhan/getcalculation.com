'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface GoldenRatioCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface GoldenRatioResult {
  goldenRatio: number;
  smallerPart: number;
  largerPart: number;
  total: number;
  calculation: string;
}

export default function GoldenRatioCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: GoldenRatioCalculatorProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [calculationType, setCalculationType] = useState<'find-parts' | 'check-ratio' | 'show-ratio'>('find-parts');
  const [result, setResult] = useState<GoldenRatioResult | null>(null);
  const [isGoldenRatio, setIsGoldenRatio] = useState<boolean | null>(null);

  // Golden ratio constant (phi)
  const PHI = (1 + Math.sqrt(5)) / 2; // Approximately 1.618033988749895

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (isNaN(value)) {
      return 'NaN';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(6);
  };

  const calculateGoldenRatio = () => {
    const value = parseFloat(inputValue);
    
    if (!inputValue || isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    if (value <= 0) {
      alert('Number must be greater than 0');
      return;
    }

    let calculatedResult: GoldenRatioResult | null = null;
    let goldenRatioCheck: boolean | null = null;

    if (calculationType === 'find-parts') {
      // Given a total length, find the two parts in golden ratio
      const total = value;
      const largerPart = total / PHI;
      const smallerPart = total - largerPart;
      
      calculatedResult = {
        goldenRatio: PHI,
        smallerPart,
        largerPart,
        total,
        calculation: `Total: ${formatValue(total)}, Larger part: ${formatValue(largerPart)}, Smaller part: ${formatValue(smallerPart)}`
      };
    } else if (calculationType === 'check-ratio') {
      // Check if two numbers are in golden ratio
      // We need to parse the input differently - assume it's the ratio of larger/smaller
      const ratio = value;
      const difference = Math.abs(ratio - PHI);
      goldenRatioCheck = difference < 0.0001;
      
      calculatedResult = {
        goldenRatio: PHI,
        smallerPart: 1,
        largerPart: ratio,
        total: 1 + ratio,
        calculation: `Ratio: ${formatValue(ratio)}, Golden Ratio: ${formatValue(PHI)}, Difference: ${formatValue(difference)}`
      };
    } else if (calculationType === 'show-ratio') {
      // Show golden ratio segments from a given number (treat as smaller part)
      const smallerPart = value;
      const largerPart = smallerPart * PHI;
      const total = smallerPart + largerPart;
      
      calculatedResult = {
        goldenRatio: PHI,
        smallerPart,
        largerPart,
        total,
        calculation: `Smaller part: ${formatValue(smallerPart)}, Larger part: ${formatValue(largerPart)}, Total: ${formatValue(total)}`
      };
    }

    setResult(calculatedResult);
    setIsGoldenRatio(goldenRatioCheck);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'inputValue':
        setInputValue(value);
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

  const getCalculationDescription = () => {
    switch (calculationType) {
      case 'find-parts':
        return 'Enter total length to find golden ratio segments';
      case 'check-ratio':
        return 'Enter ratio (larger/smaller) to check if it matches golden ratio';
      case 'show-ratio':
        return 'Enter smaller part to calculate larger part and total';
      default:
        return '';
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Golden Ratio Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate golden ratio segments, check ratios, and explore the mathematical constant φ (phi):</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Calculation Type Selector */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Calculation Type</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="calculationType"
                  value="find-parts"
                  checked={calculationType === 'find-parts'}
                  onChange={(e) => setCalculationType(e.target.value as 'find-parts' | 'check-ratio' | 'show-ratio')}
                  className="mr-2"
                />
                Find Golden Ratio Parts
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="calculationType"
                  value="show-ratio"
                  checked={calculationType === 'show-ratio'}
                  onChange={(e) => setCalculationType(e.target.value as 'find-parts' | 'check-ratio' | 'show-ratio')}
                  className="mr-2"
                />
                Calculate from Smaller Part
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="calculationType"
                  value="check-ratio"
                  checked={calculationType === 'check-ratio'}
                  onChange={(e) => setCalculationType(e.target.value as 'find-parts' | 'check-ratio' | 'show-ratio')}
                  className="mr-2"
                />
                Check if Golden Ratio
              </label>
            </div>
          </div>

          {/* Golden Ratio Constant Display */}
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Golden Ratio (φ):</p>
            <p className="font-mono text-lg font-bold text-gray-800">{formatValue(PHI)}</p>
            <p className="text-xs text-gray-500 mt-1">φ = (1 + √5) / 2</p>
          </div>

          <Input
            label={calculationType === 'check-ratio' ? 'Ratio (larger/smaller)' : calculationType === 'show-ratio' ? 'Smaller Part' : 'Total Length'}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange('inputValue', e.target.value)}
            placeholder={calculationType === 'check-ratio' ? 'Enter ratio' : calculationType === 'show-ratio' ? 'Enter smaller part' : 'Enter total length'}
            autoFocus
          />

          <p className="text-sm text-gray-600">{getCalculationDescription()}</p>

          <Button 
            onClick={calculateGoldenRatio}
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
              Golden Ratio Result
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    {calculationType === 'check-ratio' && isGoldenRatio !== null && (
                      <div className={`p-3 rounded-lg mb-4 ${isGoldenRatio ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <p className={`font-semibold ${isGoldenRatio ? 'text-green-800' : 'text-yellow-800'}`}>
                          {isGoldenRatio ? '✓ This is the Golden Ratio!' : '✗ This is not the Golden Ratio'}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Golden Ratio (φ):</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.goldenRatio)}</span>
                    </div>
                    {calculationType !== 'check-ratio' && (
                      <>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 text-lg">Smaller Part:</span>
                          <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.smallerPart)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="font-medium text-gray-700 text-lg">Larger Part:</span>
                          <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.largerPart)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-gray-700 text-lg">Total:</span>
                          <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.total)}</span>
                        </div>
                      </>
                    )}
                    {result.calculation && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 font-mono">{result.calculation}</p>
                      </div>
                    )}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <strong>Note:</strong> In golden ratio, the ratio of larger part to smaller part equals φ ≈ 1.618, and the ratio of total to larger part also equals φ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">✨</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter a value and select calculation type to explore the golden ratio</p>
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

