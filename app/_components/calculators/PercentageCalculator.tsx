'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface PercentageCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface PercentageResult {
  originalValue: number;
  percentage: number;
  result: number;
  calculation: string;
  explanation: string;
  steps: string[];
  type: 'percentage_of' | 'percentage_change' | 'percentage_increase' | 'percentage_decrease' | 'find_percentage';
}

export default function PercentageCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: PercentageCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'percentage_of' | 'percentage_change' | 'percentage_increase' | 'percentage_decrease' | 'find_percentage'>('percentage_of');
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [result, setResult] = useState<PercentageResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculatePercentage = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || isNaN(v2)) {
      alert('Please enter valid numbers.');
      setResult(null);
      return;
    }

    let calculation = '';
    let explanation = '';
    let steps: string[] = [];
    let resultValue = 0;
    let originalValue = 0;
    let percentage = 0;

    switch (calculationType) {
      case 'percentage_of':
        if (v2 === 0) {
          alert('Cannot calculate percentage of zero.');
          setResult(null);
          return;
        }
        resultValue = (v1 / v2) * 100;
        originalValue = v2;
        percentage = v1;
        calculation = `${v1} is ${resultValue.toFixed(2)}% of ${v2}`;
        explanation = `To find what percentage ${v1} is of ${v2}, we divide ${v1} by ${v2} and multiply by 100.`;
        steps = [
          `Step 1: Divide the part by the whole.`,
          `Part ÷ Whole = ${v1} ÷ ${v2} = ${(v1 / v2).toFixed(6)}`,
          `Step 2: Multiply by 100 to get percentage.`,
          `${(v1 / v2).toFixed(6)} × 100 = ${resultValue.toFixed(2)}%`
        ];
        break;

      case 'percentage_change':
        if (v1 === 0) {
          alert('Cannot calculate percentage change from zero.');
          setResult(null);
          return;
        }
        resultValue = ((v2 - v1) / v1) * 100;
        originalValue = v1;
        percentage = v2;
        calculation = `Percentage change from ${v1} to ${v2} is ${resultValue.toFixed(2)}%`;
        explanation = `Percentage change is calculated as ((New Value - Old Value) / Old Value) × 100.`;
        steps = [
          `Step 1: Find the difference between new and old values.`,
          `Difference = ${v2} - ${v1} = ${(v2 - v1).toFixed(6)}`,
          `Step 2: Divide by the original value.`,
          `Difference ÷ Original = ${(v2 - v1).toFixed(6)} ÷ ${v1} = ${((v2 - v1) / v1).toFixed(6)}`,
          `Step 3: Multiply by 100 to get percentage.`,
          `${((v2 - v1) / v1).toFixed(6)} × 100 = ${resultValue.toFixed(2)}%`
        ];
        break;

      case 'percentage_increase':
        if (v1 === 0) {
          alert('Cannot calculate percentage increase from zero.');
          setResult(null);
          return;
        }
        resultValue = ((v2 - v1) / v1) * 100;
        originalValue = v1;
        percentage = v2;
        calculation = `Percentage increase from ${v1} to ${v2} is ${resultValue.toFixed(2)}%`;
        explanation = `Percentage increase is calculated as ((New Value - Original Value) / Original Value) × 100.`;
        steps = [
          `Step 1: Find the increase amount.`,
          `Increase = ${v2} - ${v1} = ${(v2 - v1).toFixed(6)}`,
          `Step 2: Divide by the original value.`,
          `Increase ÷ Original = ${(v2 - v1).toFixed(6)} ÷ ${v1} = ${((v2 - v1) / v1).toFixed(6)}`,
          `Step 3: Multiply by 100 to get percentage.`,
          `${((v2 - v1) / v1).toFixed(6)} × 100 = ${resultValue.toFixed(2)}%`
        ];
        break;

      case 'percentage_decrease':
        if (v1 === 0) {
          alert('Cannot calculate percentage decrease from zero.');
          setResult(null);
          return;
        }
        resultValue = ((v1 - v2) / v1) * 100;
        originalValue = v1;
        percentage = v2;
        calculation = `Percentage decrease from ${v1} to ${v2} is ${resultValue.toFixed(2)}%`;
        explanation = `Percentage decrease is calculated as ((Original Value - New Value) / Original Value) × 100.`;
        steps = [
          `Step 1: Find the decrease amount.`,
          `Decrease = ${v1} - ${v2} = ${(v1 - v2).toFixed(6)}`,
          `Step 2: Divide by the original value.`,
          `Decrease ÷ Original = ${(v1 - v2).toFixed(6)} ÷ ${v1} = ${((v1 - v2) / v1).toFixed(6)}`,
          `Step 3: Multiply by 100 to get percentage.`,
          `${((v1 - v2) / v1).toFixed(6)} × 100 = ${resultValue.toFixed(2)}%`
        ];
        break;

      case 'find_percentage':
        if (v2 === 0) {
          alert('Cannot find percentage of zero.');
          setResult(null);
          return;
        }
        resultValue = (v1 / 100) * v2;
        originalValue = v2;
        percentage = v1;
        calculation = `${v1}% of ${v2} is ${resultValue.toFixed(6)}`;
        explanation = `To find ${v1}% of ${v2}, we multiply ${v2} by ${v1} and divide by 100.`;
        steps = [
          `Step 1: Convert percentage to decimal.`,
          `${v1}% = ${v1} ÷ 100 = ${(v1 / 100).toFixed(6)}`,
          `Step 2: Multiply by the number.`,
          `${(v1 / 100).toFixed(6)} × ${v2} = ${resultValue.toFixed(6)}`
        ];
        break;
    }

    setResult({
      originalValue,
      percentage,
      result: resultValue,
      calculation,
      explanation,
      steps,
      type: calculationType
    });
  };


  const getInputLabels = () => {
    const labels: { [key: string]: { label1: string; label2: string; placeholder1: string; placeholder2: string } } = {
      'percentage_of': { label1: 'Part (X)', label2: 'Whole (Y)', placeholder1: 'Enter the part', placeholder2: 'Enter the whole' },
      'percentage_change': { label1: 'Original Value (X)', label2: 'New Value (Y)', placeholder1: 'Enter original value', placeholder2: 'Enter new value' },
      'percentage_increase': { label1: 'Original Value (X)', label2: 'New Value (Y)', placeholder1: 'Enter original value', placeholder2: 'Enter new value' },
      'percentage_decrease': { label1: 'Original Value (X)', label2: 'New Value (Y)', placeholder1: 'Enter original value', placeholder2: 'Enter new value' },
      'find_percentage': { label1: 'Percentage (X%)', label2: 'Number (Y)', placeholder1: 'Enter percentage', placeholder2: 'Enter the number' }
    };
    return labels[calculationType] || { label1: 'Value 1', label2: 'Value 2', placeholder1: 'Enter value 1', placeholder2: 'Enter value 2' };
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
  const inputLabels = getInputLabels();

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Percentage Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate percentages, percentage changes, and percentage relationships:</p>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          {/* Calculator Form - Left Side */}
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            {/* Calculation Type Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Calculation Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { value: 'percentage_of', label: 'What percentage is X of Y?' },
                { value: 'find_percentage', label: 'What is X% of Y?' },
                { value: 'percentage_change', label: 'Percentage change from X to Y' },
                { value: 'percentage_increase', label: 'Percentage increase from X to Y' },
                { value: 'percentage_decrease', label: 'Percentage decrease from X to Y' }
              ].map((type) => (
                <Button
                  key={type.value}
                  onClick={() => setCalculationType(type.value as 'percentage_of' | 'percentage_change' | 'percentage_increase' | 'percentage_decrease' | 'find_percentage')}
                  variant={calculationType === type.value ? "primary" : "outline"}
                  size="sm"
                  className={`text-sm ${calculationType === type.value ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={inputLabels.label1}
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder={inputLabels.placeholder1}
                autoFocus
                step="any"
              />
              <Input
                label={inputLabels.label2}
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder={inputLabels.placeholder2}
                step="any"
              />
            </div>
          </div>

            <Button
              onClick={calculatePercentage}
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
                Percentage Results
              </h3>
              
              {result !== null ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Result:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.result.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Percentage:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.percentage.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Original Value:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.originalValue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-medium text-gray-700 text-lg">Type:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter values and select calculation type to see percentage results</p>
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
