'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PercentErrorCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PercentErrorCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: PercentErrorCalculatorProps) {
  const [measuredValue, setMeasuredValue] = useState<string>('');
  const [trueValue, setTrueValue] = useState<string>('');
  const [percentError, setPercentError] = useState<number | null>(null);
  const [absoluteError, setAbsoluteError] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return value > 0 ? '∞' : '-∞';
    }
    if (isNaN(value)) {
      return 'NaN';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(6);
    }
    return value.toFixed(6);
  };

  const calculatePercentError = () => {
    setError('');
    setPercentError(null);
    setAbsoluteError(null);
    setSteps([]);

    const measured = parseFloat(measuredValue);
    const trueVal = parseFloat(trueValue);

    // Validation
    if (isNaN(measured) || isNaN(trueVal)) {
      setError('Please enter valid numbers for both measured and true values');
      return;
    }

    if (trueVal === 0) {
      setError('True value cannot be zero (division by zero). Percent error is undefined when the true value is zero.');
      return;
    }

    // Calculate absolute error
    const absError = Math.abs(measured - trueVal);
    
    // Calculate percent error: |(Measured - True) / True| × 100%
    const percentErrorValue = (absError / Math.abs(trueVal)) * 100;

    setPercentError(percentErrorValue);
    setAbsoluteError(absError);

    // Generate step-by-step calculation
    const stepList: string[] = [];
    stepList.push('Percent Error Formula:');
    stepList.push('Percent Error = |(Measured Value - True Value) / True Value| × 100%');
    stepList.push('');
    stepList.push('Given values:');
    stepList.push(`Measured Value = ${measured}`);
    stepList.push(`True Value = ${trueVal}`);
    stepList.push('');
    stepList.push('Step 1: Calculate the absolute error');
    stepList.push(`Absolute Error = |Measured - True| = |${measured} - ${trueVal}| = |${measured - trueVal}| = ${absError}`);
    stepList.push('');
    stepList.push('Step 2: Divide absolute error by true value');
    stepList.push(`Absolute Error / True Value = ${absError} / ${Math.abs(trueVal)} = ${(absError / Math.abs(trueVal)).toFixed(6)}`);
    stepList.push('');
    stepList.push('Step 3: Multiply by 100 to get percentage');
    stepList.push(`Percent Error = ${(absError / Math.abs(trueVal)).toFixed(6)} × 100 = ${percentErrorValue.toFixed(6)}%`);

    setSteps(stepList);
  };

  const clearAll = () => {
    setMeasuredValue('');
    setTrueValue('');
    setPercentError(null);
    setAbsoluteError(null);
    setError('');
    setSteps([]);
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
      <Card className="max-w-2xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Percent Error Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the percent error between a measured value and the true (accepted) value:</p>
          </>
        )}
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Percent Error Formula</h3>
          <p className="text-sm text-gray-600 font-mono text-center">
            Percent Error = |(Measured Value - True Value) / True Value| × 100%
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Measured Value"
            type="text"
            value={measuredValue}
            onChange={(e) => setMeasuredValue(e.target.value)}
            placeholder="Enter measured value"
            autoFocus
          />

          <Input
            label="True Value (Accepted Value)"
            type="text"
            value={trueValue}
            onChange={(e) => setTrueValue(e.target.value)}
            placeholder="Enter true/accepted value"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={calculatePercentError}
            className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Percent Error
          </Button>
          <Button 
            onClick={clearAll}
            variant="outline"
            className="flex-1"
          >
            Clear All
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {percentError !== null && !error && (
          <div 
            className={`p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-3`}
              style={colors.customStyles?.resultText}
            >
              Results
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Percent Error:</span>{' '}
                <span 
                  className={`text-2xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {formatValue(percentError)}%
                </span>
              </p>
              {absoluteError !== null && (
                <p className="text-gray-700">
                  <span className="font-medium">Absolute Error:</span>{' '}
                  <span className="text-xl font-semibold text-gray-800">
                    {formatValue(absoluteError)}
                  </span>
                </p>
              )}
              <p className="text-sm text-gray-600 mt-2">
                The measured value differs from the true value by {formatValue(percentError)}%.
              </p>
            </div>
          </div>
        )}

        {steps.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Calculation</h3>
            <div className="text-sm text-gray-700 font-mono whitespace-pre-line max-h-96 overflow-y-auto bg-white p-4 rounded border">
              {steps.join('\n')}
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}

