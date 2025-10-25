'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface DecimalToPercentCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface DecimalToPercentResult {
  decimal: number;
  percent: number;
  fraction: string;
  calculation: string;
  explanation: string;
  steps: string[];
  type: 'decimal_to_percent' | 'percent_to_decimal' | 'fraction_to_percent' | 'percent_to_fraction';
}

export default function DecimalToPercentCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: DecimalToPercentCalculatorProps) {
  const [calculationType, setCalculationType] = useState<'decimal_to_percent' | 'percent_to_decimal' | 'fraction_to_percent' | 'percent_to_fraction'>('decimal_to_percent');
  const [inputValue, setInputValue] = useState<string>('');
  const [numerator, setNumerator] = useState<string>('');
  const [denominator, setDenominator] = useState<string>('');
  const [result, setResult] = useState<DecimalToPercentResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculateConversion = () => {
    let decimal = 0;
    let percent = 0;
    let fraction = '';
    let calculation = '';
    let explanation = '';
    let steps: string[] = [];

    switch (calculationType) {
      case 'decimal_to_percent':
        decimal = parseFloat(inputValue);
        if (isNaN(decimal)) {
          alert('Please enter a valid decimal number.');
          setResult(null);
          return;
        }
        percent = decimal * 100;
        fraction = `${decimal}`;
        calculation = `${decimal} × 100 = ${percent}%`;
        explanation = `To convert a decimal to a percentage, multiply by 100.`;
        steps = [
          `Step 1: Take the decimal value.`,
          `Decimal = ${decimal}`,
          `Step 2: Multiply by 100.`,
          `${decimal} × 100 = ${percent}%`
        ];
        break;

      case 'percent_to_decimal':
        percent = parseFloat(inputValue);
        if (isNaN(percent)) {
          alert('Please enter a valid percentage.');
          setResult(null);
          return;
        }
        decimal = percent / 100;
        fraction = `${percent}%`;
        calculation = `${percent}% ÷ 100 = ${decimal}`;
        explanation = `To convert a percentage to a decimal, divide by 100.`;
        steps = [
          `Step 1: Take the percentage value.`,
          `Percentage = ${percent}%`,
          `Step 2: Divide by 100.`,
          `${percent}% ÷ 100 = ${decimal}`
        ];
        break;

      case 'fraction_to_percent':
        const num = parseFloat(numerator);
        const den = parseFloat(denominator);
        if (isNaN(num) || isNaN(den) || den === 0) {
          alert('Please enter valid numerator and denominator (denominator cannot be zero).');
          setResult(null);
          return;
        }
        decimal = num / den;
        percent = decimal * 100;
        fraction = `${num}/${den}`;
        calculation = `${num}/${den} = ${decimal} × 100 = ${percent}%`;
        explanation = `To convert a fraction to a percentage, divide the numerator by the denominator, then multiply by 100.`;
        steps = [
          `Step 1: Divide the numerator by the denominator.`,
          `${num} ÷ ${den} = ${decimal}`,
          `Step 2: Multiply by 100 to get percentage.`,
          `${decimal} × 100 = ${percent}%`
        ];
        break;

      case 'percent_to_fraction':
        percent = parseFloat(inputValue);
        if (isNaN(percent)) {
          alert('Please enter a valid percentage.');
          setResult(null);
          return;
        }
        decimal = percent / 100;
        const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
        const numeratorValue = Math.round(percent * 100);
        const denominatorValue = 10000;
        const commonDivisor = gcd(numeratorValue, denominatorValue);
        const simplifiedNum = numeratorValue / commonDivisor;
        const simplifiedDen = denominatorValue / commonDivisor;
        fraction = `${simplifiedNum}/${simplifiedDen}`;
        calculation = `${percent}% = ${percent}/100 = ${simplifiedNum}/${simplifiedDen}`;
        explanation = `To convert a percentage to a fraction, write the percentage as a fraction over 100, then simplify.`;
        steps = [
          `Step 1: Write the percentage as a fraction over 100.`,
          `${percent}% = ${percent}/100`,
          `Step 2: Simplify the fraction.`,
          `${percent}/100 = ${simplifiedNum}/${simplifiedDen}`
        ];
        break;
    }

    setResult({
      decimal,
      percent,
      fraction,
      calculation,
      explanation,
      steps,
      type: calculationType
    });
  };

  const getCalculationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'decimal_to_percent': 'Decimal to Percent',
      'percent_to_decimal': 'Percent to Decimal',
      'fraction_to_percent': 'Fraction to Percent',
      'percent_to_fraction': 'Percent to Fraction'
    };
    return labels[type] || type;
  };

  const getInputLabel = () => {
    const labels: { [key: string]: string } = {
      'decimal_to_percent': 'Decimal Value',
      'percent_to_decimal': 'Percentage Value',
      'fraction_to_percent': 'Numerator',
      'percent_to_fraction': 'Percentage Value'
    };
    return labels[calculationType] || 'Input Value';
  };

  const getInputPlaceholder = () => {
    const placeholders: { [key: string]: string } = {
      'decimal_to_percent': 'e.g., 0.25',
      'percent_to_decimal': 'e.g., 25',
      'fraction_to_percent': 'e.g., 1',
      'percent_to_fraction': 'e.g., 25'
    };
    return placeholders[calculationType] || 'Enter value';
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
      <Card className="max-w-4xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Decimal to Percent Calculator</h2>
            <p className="text-gray-600 mb-6">Convert between decimals, percentages, and fractions with step-by-step solutions:</p>
          </>
        )}

        <div className="space-y-6">
          {/* Calculation Type Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Conversion Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { value: 'decimal_to_percent', label: 'Decimal to Percent' },
                { value: 'percent_to_decimal', label: 'Percent to Decimal' },
                { value: 'fraction_to_percent', label: 'Fraction to Percent' },
                { value: 'percent_to_fraction', label: 'Percent to Fraction' }
              ].map((type) => (
                <Button
                  key={type.value}
                  onClick={() => setCalculationType(type.value as 'decimal_to_percent' | 'percent_to_decimal' | 'fraction_to_percent' | 'percent_to_fraction')}
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
            <div className="space-y-4">
              {calculationType === 'fraction_to_percent' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Numerator"
                    type="number"
                    value={numerator}
                    onChange={(e) => setNumerator(e.target.value)}
                    placeholder="e.g., 1"
                    autoFocus
                    step="any"
                  />
                  <Input
                    label="Denominator"
                    type="number"
                    value={denominator}
                    onChange={(e) => setDenominator(e.target.value)}
                    placeholder="e.g., 4"
                    step="any"
                  />
                </div>
              ) : (
                <Input
                  label={getInputLabel()}
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={getInputPlaceholder()}
                  autoFocus
                  step="any"
                />
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {calculationType === 'decimal_to_percent' && 'Enter a decimal number (e.g., 0.25 for 25%)'}
              {calculationType === 'percent_to_decimal' && 'Enter a percentage (e.g., 25 for 0.25)'}
              {calculationType === 'fraction_to_percent' && 'Enter the numerator and denominator of the fraction'}
              {calculationType === 'percent_to_fraction' && 'Enter a percentage (e.g., 25 for 25/100)'}
            </p>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-center">
            <Button
              onClick={calculateConversion}
              className="custom-color-button"
              style={colors.customStyles?.button}
            >
              Convert
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
                  {getCalculationTypeLabel(result.type)} Result
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Decimal</p>
                    <p className="text-lg font-semibold">{formatValue(result.decimal)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Percentage</p>
                    <p className="text-lg font-semibold">{formatValue(result.percent)}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Fraction</p>
                    <p className="text-lg font-semibold">{result.fraction}</p>
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
