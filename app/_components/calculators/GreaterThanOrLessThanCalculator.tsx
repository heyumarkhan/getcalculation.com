'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface GreaterThanOrLessThanCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface ComparisonResult {
  firstNumber: number;
  secondNumber: number;
  comparison: string;
  symbol: string;
  explanation: string;
  isEqual: boolean;
  difference: number;
}

export default function GreaterThanOrLessThanCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: GreaterThanOrLessThanCalculatorProps) {
  const [firstNumber, setFirstNumber] = useState<string>('');
  const [secondNumber, setSecondNumber] = useState<string>('');
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const compareNumbers = () => {
    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);

    if (isNaN(first) || isNaN(second)) {
      alert('Please enter valid numbers for both fields');
      return;
    }

    let comparison: string;
    let symbol: string;
    let explanation: string;
    const isEqual = first === second;
    const difference = Math.abs(first - second);

    if (first > second) {
      comparison = 'Greater Than';
      symbol = '>';
      explanation = `${first} is greater than ${second}`;
    } else if (first < second) {
      comparison = 'Less Than';
      symbol = '<';
      explanation = `${first} is less than ${second}`;
    } else {
      comparison = 'Equal To';
      symbol = '=';
      explanation = `${first} is equal to ${second}`;
    }

    setResult({
      firstNumber: first,
      secondNumber: second,
      comparison,
      symbol,
      explanation,
      isEqual,
      difference
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'first':
        setFirstNumber(value);
        break;
      case 'second':
        setSecondNumber(value);
        break;
      default:
        break;
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
      <Card className="max-w-md mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Greater Than Or Less Than Calculator</h2>
            <p className="text-gray-600 mb-6">Compare two numbers to determine which is greater, less, or equal:</p>
          </>
        )}
      
        <div className="space-y-4">
          {/* First Number */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">First Number</h3>
            <Input
              type="number"
              value={firstNumber}
              onChange={(e) => handleInputChange('first', e.target.value)}
              placeholder="Enter first number"
              step="any"
              autoFocus
            />
          </div>

          {/* Second Number */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Second Number</h3>
            <Input
              type="number"
              value={secondNumber}
              onChange={(e) => handleInputChange('second', e.target.value)}
              placeholder="Enter second number"
              step="any"
            />
          </div>

          <Button 
            onClick={compareNumbers}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Compare Numbers
          </Button>

          {result !== null && (
            <div 
              className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className={`text-lg font-semibold ${colors.resultText} mb-4`}
                style={colors.customStyles?.resultText}
              >
                Comparison Result
              </h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Comparison:</p>
                  <p className="font-mono text-xl font-bold">{result.comparison}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Mathematical Expression:</p>
                  <p className="font-mono text-2xl font-bold text-center">
                    {result.firstNumber} {result.symbol} {result.secondNumber}
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Explanation:</p>
                  <p className="font-mono">{result.explanation}</p>
                </div>
                
                {!result.isEqual && (
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-gray-700 mb-1">Difference:</p>
                    <p className="font-mono text-lg">{result.difference.toFixed(6)}</p>
                  </div>
                )}
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-1">Additional Information:</p>
                  <div className="space-y-1 text-xs">
                    <p className="font-mono">• First number: {result.firstNumber}</p>
                    <p className="font-mono">• Second number: {result.secondNumber}</p>
                    <p className="font-mono">• {result.isEqual ? 'Numbers are equal' : 'Numbers are not equal'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
