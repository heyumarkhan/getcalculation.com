'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface DoublingTimeCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface DoublingTimeResult {
  growthRate: number;
  doublingTime: number;
  method: string;
  formula: string;
  explanation: string;
  examples: string[];
}

export default function DoublingTimeCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: DoublingTimeCalculatorProps) {
  const [growthRate, setGrowthRate] = useState<string>('');
  const [rateType, setRateType] = useState<'percentage' | 'decimal'>('percentage');
  const [timeUnit, setTimeUnit] = useState<'years' | 'months' | 'days' | 'hours'>('years');
  const [result, setResult] = useState<DoublingTimeResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateDoublingTime = () => {
    const rate = parseFloat(growthRate);
    
    if (isNaN(rate) || rate <= 0) {
      alert('Please enter a valid positive growth rate');
      return;
    }

    let actualRate: number;
    let method: string;
    let formula: string;
    let explanation: string;

    if (rateType === 'percentage') {
      if (rate >= 100) {
        alert('Growth rate must be less than 100% for doubling time calculation');
        return;
      }
      actualRate = rate / 100;
      method = 'Rule of 70 (Percentage Rate)';
      formula = 'Doubling Time = 70 / Growth Rate (%)';
      explanation = `Using the Rule of 70: 70 ÷ ${rate}% = ${(70 / rate).toFixed(2)} ${timeUnit}`;
    } else {
      if (rate >= 1) {
        alert('Decimal growth rate must be less than 1.0 for doubling time calculation');
        return;
      }
      actualRate = rate;
      method = 'Natural Logarithm Method (Decimal Rate)';
      formula = 'Doubling Time = ln(2) / ln(1 + r)';
      explanation = `Using natural logarithm: ln(2) ÷ ln(1 + ${rate}) = ${(Math.log(2) / Math.log(1 + actualRate)).toFixed(2)} ${timeUnit}`;
    }

    const doublingTime = rateType === 'percentage' 
      ? 70 / rate 
      : Math.log(2) / Math.log(1 + actualRate);

    // Generate examples based on the time unit
    const examples = generateExamples(doublingTime, timeUnit);

    setResult({
      growthRate: rate,
      doublingTime,
      method,
      formula,
      explanation,
      examples
    });
  };

  const generateExamples = (doublingTime: number, unit: string): string[] => {
    const examples: string[] = [];
    
    if (unit === 'years') {
      if (doublingTime < 1) {
        const months = Math.round(doublingTime * 12);
        examples.push(`Population doubles in approximately ${months} months`);
      } else if (doublingTime < 10) {
        examples.push(`Population doubles in approximately ${doublingTime.toFixed(1)} years`);
      } else {
        examples.push(`Population doubles in approximately ${Math.round(doublingTime)} years`);
      }
      
      if (doublingTime < 5) {
        examples.push(`Investment doubles in about ${doublingTime.toFixed(1)} years`);
      }
      
      if (doublingTime < 2) {
        examples.push(`Bacterial culture doubles in ${doublingTime.toFixed(1)} years`);
      }
    } else if (unit === 'months') {
      if (doublingTime < 1) {
        const days = Math.round(doublingTime * 30);
        examples.push(`Population doubles in approximately ${days} days`);
      } else {
        examples.push(`Population doubles in approximately ${doublingTime.toFixed(1)} months`);
      }
    } else if (unit === 'days') {
      if (doublingTime < 1) {
        const hours = Math.round(doublingTime * 24);
        examples.push(`Bacteria doubles in approximately ${hours} hours`);
      } else {
        examples.push(`Bacteria doubles in approximately ${doublingTime.toFixed(1)} days`);
      }
    } else if (unit === 'hours') {
      if (doublingTime < 1) {
        const minutes = Math.round(doublingTime * 60);
        examples.push(`Virus doubles in approximately ${minutes} minutes`);
      } else {
        examples.push(`Virus doubles in approximately ${doublingTime.toFixed(1)} hours`);
      }
    }

    return examples;
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Doubling Time Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate how long it takes for a quantity to double at a given growth rate:</p>
          </>
        )}
      
      <div className="space-y-6">
        {/* Input Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Enter Growth Rate</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Growth Rate"
              type="text"
              value={growthRate}
              onChange={(e) => setGrowthRate(e.target.value)}
              placeholder="Enter growth rate (e.g., 5, 0.05)"
              autoFocus
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rate Type</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rateType"
                    value="percentage"
                    checked={rateType === 'percentage'}
                    onChange={(e) => setRateType(e.target.value as 'percentage' | 'decimal')}
                    className="mr-2"
                  />
                  Percentage (%)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rateType"
                    value="decimal"
                    checked={rateType === 'decimal'}
                    onChange={(e) => setRateType(e.target.value as 'percentage' | 'decimal')}
                    className="mr-2"
                  />
                  Decimal (0.05)
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Unit</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="timeUnit"
                  value="years"
                  checked={timeUnit === 'years'}
                  onChange={(e) => setTimeUnit(e.target.value as 'years' | 'months' | 'days' | 'hours')}
                  className="mr-2"
                />
                Years
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="timeUnit"
                  value="months"
                  checked={timeUnit === 'months'}
                  onChange={(e) => setTimeUnit(e.target.value as 'years' | 'months' | 'days' | 'hours')}
                  className="mr-2"
                />
                Months
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="timeUnit"
                  value="days"
                  checked={timeUnit === 'days'}
                  onChange={(e) => setTimeUnit(e.target.value as 'years' | 'months' | 'days' | 'hours')}
                  className="mr-2"
                />
                Days
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="timeUnit"
                  value="hours"
                  checked={timeUnit === 'hours'}
                  onChange={(e) => setTimeUnit(e.target.value as 'years' | 'months' | 'days' | 'hours')}
                  className="mr-2"
                />
                Hours
              </label>
            </div>
          </div>
        </div>

        <Button 
          onClick={calculateDoublingTime}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Doubling Time
        </Button>

        {result !== null && (
          <div 
            className={`mt-6 p-6 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Doubling Time Result
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Growth Rate:</p>
                <p className="font-mono text-lg font-bold">{result.growthRate}{rateType === 'percentage' ? '%' : ''}</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Doubling Time:</p>
                <p className="font-mono text-xl font-bold text-red-600">{formatValue(result.doublingTime)} {timeUnit}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded border mb-4">
              <p className="font-semibold text-gray-700 mb-2">Method Used:</p>
              <p className="text-lg font-bold text-blue-600">{result.method}</p>
            </div>

            <div className="bg-white p-4 rounded border mb-4">
              <p className="font-semibold text-gray-700 mb-2">Formula:</p>
              <p className="font-mono text-lg">{result.formula}</p>
            </div>

            <div className="bg-white p-4 rounded border mb-4">
              <p className="font-semibold text-gray-700 mb-2">Calculation:</p>
              <p className="text-sm">{result.explanation}</p>
            </div>

            {result.examples.length > 0 && (
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-2">Real-World Examples:</p>
                <ul className="list-disc list-inside space-y-1">
                  {result.examples.map((example, index) => (
                    <li key={index} className="text-sm">{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Doubling Time Methods</h3>
          <div className="text-sm text-blue-700 space-y-2">
            <div>
              <strong>Rule of 70:</strong> For percentage rates, doubling time ≈ 70 ÷ growth rate
            </div>
            <div>
              <strong>Natural Logarithm:</strong> For decimal rates, doubling time = ln(2) ÷ ln(1 + rate)
            </div>
            <div>
              <strong>Note:</strong> Growth rate must be less than 100% (or 1.0) for doubling time to be meaningful.
            </div>
          </div>
        </div>
      </div>
      </Card>
    </>
  );
}
