'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface RemainderCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function RemainderCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: RemainderCalculatorProps) {
  const [dividend, setDividend] = useState<string>('');
  const [divisor, setDivisor] = useState<string>('');
  const [remainder, setRemainder] = useState<number | null>(null);
  const [quotient, setQuotient] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001 && Math.abs(value) > -0.0001) {
      return '0';
    }
    // For integers, show without decimals; for decimals, show up to 4 decimal places
    if (value % 1 === 0) {
      return value.toString();
    }
    return value.toFixed(4);
  };

  const calculateRemainder = () => {
    setError('');
    const dividendNum = parseFloat(dividend);
    const divisorNum = parseFloat(divisor);

    if (isNaN(dividendNum) || isNaN(divisorNum)) {
      setError('Please enter valid numbers for both dividend and divisor');
      setRemainder(null);
      setQuotient(null);
      return;
    }

    if (divisorNum === 0) {
      setError('Division by zero is not allowed');
      setRemainder(null);
      setQuotient(null);
      return;
    }

    const quotientValue = Math.floor(dividendNum / divisorNum);
    const remainderValue = dividendNum % divisorNum;
    
    setQuotient(quotientValue);
    setRemainder(remainderValue);
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'dividend':
        setDividend(value);
        break;
      case 'divisor':
        setDivisor(value);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Remainder Calculator</h2>
            <p className="text-gray-600 mb-6">Enter the dividend and divisor to calculate the remainder:</p>
          </>
        )}
      
      <div className="space-y-4">
        <Input
          label="Dividend"
          type="text"
          value={dividend}
          onChange={(e) => handleInputChange('dividend', e.target.value)}
          placeholder="Enter dividend"
          autoFocus
        />

        <Input
          label="Divisor"
          type="text"
          value={divisor}
          onChange={(e) => handleInputChange('divisor', e.target.value)}
          placeholder="Enter divisor"
        />

        <Button 
          onClick={calculateRemainder}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Calculate Remainder
        </Button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {remainder !== null && !error && (
          <div 
            className={`mt-6 p-4 ${colors.resultBg} border ${colors.resultBorder} rounded-md animate-fadeIn`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-3`}
              style={colors.customStyles?.resultText}
            >
              Result
            </h3>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Remainder:</span>{' '}
                <span 
                  className={`text-xl font-bold ${colors.result}`}
                  style={colors.customStyles?.result}
                >
                  {formatValue(remainder)}
                </span>
              </p>
              {quotient !== null && (
                <p className="text-gray-700">
                  <span className="font-medium">Quotient:</span>{' '}
                  <span className="text-lg font-semibold text-gray-800">
                    {formatValue(quotient)}
                  </span>
                </p>
              )}
              <p className="text-sm text-gray-600 mt-2">
                {parseFloat(dividend)} ÷ {parseFloat(divisor)} = {quotient !== null ? formatValue(quotient) : '?'} 
                {remainder !== 0 && ` with remainder ${formatValue(remainder)}`}
                {remainder === 0 && ' (no remainder)'}
              </p>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}

