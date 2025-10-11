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
  comparison: 'greater' | 'less' | 'equal';
  symbol: string;
  explanation: string;
}

export default function GreaterThanOrLessThanCalculator({ 
  showTitle = true, 
  primaryColor = '#3399CC' 
}: GreaterThanOrLessThanCalculatorProps) {
  const [firstNumber, setFirstNumber] = useState<string>('');
  const [secondNumber, setSecondNumber] = useState<string>('');
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const compareNumbers = () => {
    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
      alert('Please enter valid numbers for both fields');
      return;
    }

    let comparison: 'greater' | 'less' | 'equal';
    let symbol: string;
    let explanation: string;

    if (num1 > num2) {
      comparison = 'greater';
      symbol = '>';
      explanation = `${num1} is greater than ${num2}`;
    } else if (num1 < num2) {
      comparison = 'less';
      symbol = '<';
      explanation = `${num1} is less than ${num2}`;
    } else {
      comparison = 'equal';
      symbol = '=';
      explanation = `${num1} is equal to ${num2}`;
    }

    setResult({
      firstNumber: num1,
      secondNumber: num2,
      comparison,
      symbol,
      explanation
    });
  };

  const getColorClasses = (color: string) => {
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    
    return {
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
        } as React.CSSProperties
      }
    };
  };

  const colors = getColorClasses(primaryColor);

  const getComparisonColor = (comparison: string) => {
    switch (comparison) {
      case 'greater':
        return 'text-green-600';
      case 'less':
        return 'text-red-600';
      case 'equal':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getComparisonIcon = (comparison: string) => {
    switch (comparison) {
      case 'greater':
        return '📈';
      case 'less':
        return '📉';
      case 'equal':
        return '⚖️';
      default:
        return '❓';
    }
  };

  return (
    <>
      {/* Custom color styles */}
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
            <p className="text-gray-600 mb-6">Enter two numbers to compare them using inequality symbols:</p>
          </>
        )}
      
        <div className="space-y-4">
          <Input
            label="First Number"
            type="number"
            value={firstNumber}
            onChange={(e) => setFirstNumber(e.target.value)}
            placeholder="Enter first number"
            step="0.01"
          />

          <Input
            label="Second Number"
            type="number"
            value={secondNumber}
            onChange={(e) => setSecondNumber(e.target.value)}
            placeholder="Enter second number"
            step="0.01"
          />

          <Button 
            onClick={compareNumbers}
            className={`w-full custom-color-button`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Compare Numbers
          </Button>

          {result !== null && (
            <div 
              className="mt-6 p-4 border rounded-md"
              style={colors.customStyles?.resultBg}
            >
              <h3 
                className="text-lg font-semibold mb-4"
                style={colors.customStyles?.result}
              >
                Comparison Result
              </h3>
              
              <div className="space-y-3">
                {/* Main comparison display */}
                <div className="bg-white p-4 rounded-lg border text-center">
                  <div className="flex items-center justify-center space-x-4 mb-2">
                    <span className="text-2xl font-bold text-gray-800">{result.firstNumber}</span>
                    <span className={`text-4xl font-bold ${getComparisonColor(result.comparison)}`}>
                      {result.symbol}
                    </span>
                    <span className="text-2xl font-bold text-gray-800">{result.secondNumber}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl">{getComparisonIcon(result.comparison)}</span>
                    <span className={`text-lg font-semibold ${getComparisonColor(result.comparison)}`}>
                      {result.explanation}
                    </span>
                  </div>
                </div>

                {/* Detailed explanation */}
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
                  <p className="text-sm text-gray-600">
                    {result.comparison === 'greater' && 
                      `The first number (${result.firstNumber}) is greater than the second number (${result.secondNumber}). 
                       This means ${result.firstNumber} is larger than ${result.secondNumber} on the number line.`
                    }
                    {result.comparison === 'less' && 
                      `The first number (${result.firstNumber}) is less than the second number (${result.secondNumber}). 
                       This means ${result.firstNumber} is smaller than ${result.secondNumber} on the number line.`
                    }
                    {result.comparison === 'equal' && 
                      `Both numbers are equal (${result.firstNumber} = ${result.secondNumber}). 
                       This means they represent the same value on the number line.`
                    }
                  </p>
                </div>

                {/* Inequality symbols reference */}
                <div className="bg-gray-50 p-3 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Inequality Symbols:</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <span className="font-mono text-lg">{'>'}</span>
                      <p className="text-gray-600">Greater than</p>
                    </div>
                    <div className="text-center">
                      <span className="font-mono text-lg">&lt;</span>
                      <p className="text-gray-600">Less than</p>
                    </div>
                    <div className="text-center">
                      <span className="font-mono text-lg">=</span>
                      <p className="text-gray-600">Equal to</p>
                    </div>
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
