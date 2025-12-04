'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LogCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function LogCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: LogCalculatorProps) {
  const [number, setNumber] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [logType, setLogType] = useState<'natural' | 'common' | 'custom'>('natural');
  const [result, setResult] = useState<number | null>(null);
  const [calculation, setCalculation] = useState<string>('');

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

  const calculateLog = () => {
    const num = parseFloat(number);
    
    if (!number || isNaN(num)) {
      alert('Please enter a valid number');
      return;
    }

    if (num <= 0) {
      alert('Number must be greater than 0');
      return;
    }

    let calculatedResult: number;
    let calcString: string;

    if (logType === 'natural') {
      calculatedResult = Math.log(num);
      calcString = `ln(${num}) = ${formatValue(calculatedResult)}`;
    } else if (logType === 'common') {
      calculatedResult = Math.log10(num);
      calcString = `log₁₀(${num}) = ${formatValue(calculatedResult)}`;
    } else {
      const baseValue = parseFloat(base);
      if (!base || isNaN(baseValue)) {
        alert('Please enter a valid base');
        return;
      }
      if (baseValue <= 0 || baseValue === 1) {
        alert('Base must be greater than 0 and not equal to 1');
        return;
      }
      calculatedResult = Math.log(num) / Math.log(baseValue);
      calcString = `log${baseValue}(${num}) = ${formatValue(calculatedResult)}`;
    }

    setResult(calculatedResult);
    setCalculation(calcString);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'number':
        setNumber(value);
        break;
      case 'base':
        setBase(value);
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

  const getFormula = () => {
    switch (logType) {
      case 'natural':
        return 'ln(x)';
      case 'common':
        return 'log₁₀(x)';
      default:
        return `logₐ(x)`;
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Log Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate natural logarithm, common logarithm, or logarithm with any base:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Log Type Selector */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Logarithm Type</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="logType"
                  value="natural"
                  checked={logType === 'natural'}
                  onChange={(e) => setLogType(e.target.value as 'natural' | 'common' | 'custom')}
                  className="mr-2"
                />
                Natural Logarithm (ln)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="logType"
                  value="common"
                  checked={logType === 'common'}
                  onChange={(e) => setLogType(e.target.value as 'natural' | 'common' | 'custom')}
                  className="mr-2"
                />
                Common Logarithm (log₁₀)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="logType"
                  value="custom"
                  checked={logType === 'custom'}
                  onChange={(e) => setLogType(e.target.value as 'natural' | 'common' | 'custom')}
                  className="mr-2"
                />
                Custom Base
              </label>
            </div>
          </div>

          {/* Formula Display */}
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600 mb-1">Formula:</p>
            <p className="font-mono text-lg font-bold text-gray-800">{getFormula()}</p>
          </div>

          <Input
            label="Number (x)"
            type="text"
            value={number}
            onChange={(e) => handleInputChange('number', e.target.value)}
            placeholder="Enter number"
            autoFocus
          />

          {logType === 'custom' && (
            <Input
              label="Base (a)"
              type="text"
              value={base}
              onChange={(e) => handleInputChange('base', e.target.value)}
              placeholder="Enter base"
            />
          )}

          <Button 
            onClick={calculateLog}
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
              Logarithm Result
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Result:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result)}</span>
                    </div>
                    {calculation && (
                      <div className="pt-2">
                        <p className="text-sm text-gray-600 font-mono">{calculation}</p>
                      </div>
                    )}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <strong>Note:</strong> The logarithm of a number is the exponent to which the base must be raised to produce that number.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter a number and select log type to calculate the logarithm</p>
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

