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
  primaryColor = '#3399CC'
}: PercentageCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'percentage_of' | 'percentage_change' | 'percentage_increase' | 'percentage_decrease' | 'find_percentage'>('percentage_of');
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [result, setResult] = useState<PercentageResult | null>(null);

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

  const getCalculationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'percentage_of': 'What percentage is X of Y?',
      'percentage_change': 'Percentage change from X to Y',
      'percentage_increase': 'Percentage increase from X to Y',
      'percentage_decrease': 'Percentage decrease from X to Y',
      'find_percentage': 'What is X% of Y?'
    };
    return labels[type] || type;
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
          `
        }} />
      )}
      <Card className="max-w-4xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Percentage Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate percentages, percentage changes, and percentage relationships:</p>
          </>
        )}

        <div className="space-y-6">
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
                  onClick={() => setCalculationType(type.value as any)}
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

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button
              onClick={calculatePercentage}
              className="custom-color-button"
              style={colors.customStyles?.button}
            >
              Calculate Percentage
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Result */}
              <div
                className="p-6 rounded-lg border-2"
                style={colors.customStyles?.resultBg}
              >
                <h3 className="text-xl font-bold mb-4" style={colors.customStyles?.result}>
                  Percentage Result
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Original Value</p>
                    <p className="text-lg font-semibold">{result.originalValue.toFixed(6)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Percentage/Change</p>
                    <p className="text-lg font-semibold">{result.percentage.toFixed(6)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Result</p>
                    <p className="text-lg font-semibold">{result.result.toFixed(6)}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-mono text-sm">{result.calculation}</p>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Explanation</h4>
                <p className="text-blue-800">{result.explanation}</p>
              </div>

              {/* Step-by-Step Solution */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Step-by-Step Solution</h4>
                <ol className="space-y-2">
                  {result.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-gray-200 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
