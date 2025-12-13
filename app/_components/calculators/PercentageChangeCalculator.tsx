'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PercentageChangeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function PercentageChangeCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: PercentageChangeCalculatorProps) {
  const [oldValue, setOldValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    isIncrease: boolean;
    steps: string[];
  } | null>(null);

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

  const calculatePercentageChange = () => {
    const old = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    
    if (isNaN(old) || isNaN(newVal)) {
      alert('Please enter valid numbers for both old and new values');
      return;
    }

    if (old === 0) {
      alert('Old value cannot be zero (division by zero). Percentage change is undefined when the old value is zero.');
      return;
    }

    const steps: string[] = [];
    
    // Calculate absolute change
    const absoluteChange = newVal - old;
    const isIncrease = absoluteChange > 0;
    
    // Calculate percentage change: ((New Value - Old Value) / Old Value) × 100
    const percentageChange = (absoluteChange / old) * 100;
    
    steps.push(`Given: Old Value = ${old}, New Value = ${newVal}`);
    steps.push(`Formula: Percentage Change = ((New Value - Old Value) / Old Value) × 100`);
    steps.push(``);
    steps.push(`Step 1: Calculate the absolute change`);
    steps.push(`Absolute Change = New Value - Old Value`);
    steps.push(`Absolute Change = ${newVal} - ${old} = ${formatValue(absoluteChange)}`);
    steps.push(``);
    steps.push(`Step 2: Divide the absolute change by the old value`);
    steps.push(`Absolute Change / Old Value = ${formatValue(absoluteChange)} / ${old}`);
    steps.push(`Absolute Change / Old Value = ${formatValue(absoluteChange / old)}`);
    steps.push(``);
    steps.push(`Step 3: Multiply by 100 to get percentage`);
    steps.push(`Percentage Change = ${formatValue(absoluteChange / old)} × 100`);
    steps.push(`Percentage Change = ${formatValue(percentageChange)}%`);
    
    if (isIncrease) {
      steps.push(``);
      steps.push(`Result: This represents a ${formatValue(Math.abs(percentageChange))}% increase from the old value.`);
    } else if (absoluteChange < 0) {
      steps.push(``);
      steps.push(`Result: This represents a ${formatValue(Math.abs(percentageChange))}% decrease from the old value.`);
    } else {
      steps.push(``);
      steps.push(`Result: There is no change (0% change).`);
    }

    setResult({
      percentageChange,
      absoluteChange,
      isIncrease,
      steps
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'oldValue':
        setOldValue(value);
        break;
      case 'newValue':
        setNewValue(value);
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
    setOldValue('');
    setNewValue('');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Percentage Change Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate the percentage change from an old value to a new value with step-by-step solutions. Determine if the change is an increase or decrease.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Values</h3>
            <div className="space-y-3">
              <Input
                label="Old Value (Initial)"
                type="text"
                value={oldValue}
                onChange={(e) => handleInputChange('oldValue', e.target.value)}
                placeholder="Enter old/original value"
                autoFocus
              />
              <Input
                label="New Value (Final)"
                type="text"
                value={newValue}
                onChange={(e) => handleInputChange('newValue', e.target.value)}
                placeholder="Enter new/final value"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={calculatePercentageChange}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Percentage Change
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
                Percentage Change Result
              </h3>
              
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  {result.isIncrease ? 'Increase' : result.absoluteChange < 0 ? 'Decrease' : 'No Change'}
                </p>
                <p 
                  className={`text-3xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {result.isIncrease ? '+' : ''}{formatValue(result.percentageChange)}%
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Absolute Change: {result.absoluteChange > 0 ? '+' : ''}{formatValue(result.absoluteChange)}
                </p>
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
            <h4 className="text-sm font-medium text-gray-700 mb-2">Percentage Change Formula:</h4>
            <div className="text-sm text-gray-600">
              <p className="font-mono text-center text-base font-bold mb-2">
                Percentage Change = ((New - Old) / Old) × 100
              </p>
              <div className="mt-2 space-y-1 text-xs">
                <p><strong>Where:</strong></p>
                <p>• Old Value = the original/initial value</p>
                <p>• New Value = the final/new value</p>
                <p>• Positive result = percentage increase</p>
                <p>• Negative result = percentage decrease</p>
                <p>• Zero = no change</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

