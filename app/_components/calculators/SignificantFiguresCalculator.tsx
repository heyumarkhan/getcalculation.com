'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SignificantFiguresCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface SigFigResult {
  input: string;
  significantFigures: number;
  roundedToSigFigs: string;
  scientificNotation: string;
  rules: string[];
  explanation: string;
}

interface SigFigOperationResult {
  operation: string;
  result: string;
  significantFigures: number;
  explanation: string;
}

export default function SignificantFiguresCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: SignificantFiguresCalculatorProps) {
  const [input, setInput] = useState<string>('');
  const [targetSigFigs, setTargetSigFigs] = useState<string>('');
  const [operation, setOperation] = useState<'count' | 'round' | 'add' | 'multiply'>('count');
  const [secondNumber, setSecondNumber] = useState<string>('');
  const [result, setResult] = useState<SigFigResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };
  const [operationResult, setOperationResult] = useState<SigFigOperationResult | null>(null);

  const countSignificantFigures = (num: string): number => {
    if (!num || num.trim() === '') return 0;
    
    // Remove leading/trailing whitespace
    let cleanNum = num.trim();
    
    // Handle scientific notation
    if (cleanNum.includes('e') || cleanNum.includes('E')) {
      const [mantissa] = cleanNum.split(/[eE]/);
      cleanNum = mantissa;
    }
    
    // Remove decimal point for counting
    const withoutDecimal = cleanNum.replace('.', '');
    
    // Remove leading zeros
    const withoutLeadingZeros = withoutDecimal.replace(/^0+/, '');
    
    // Count non-zero digits
    const nonZeroDigits = withoutLeadingZeros.replace(/0/g, '').length;
    
    // Count trailing zeros after decimal
    const hasDecimal = cleanNum.includes('.');
    const trailingZeros = hasDecimal ? (cleanNum.match(/0+$/) || [''])[0].length : 0;
    
    return nonZeroDigits + trailingZeros;
  };

  const getSigFigRules = (num: string): string[] => {
    const rules: string[] = [];
    
    if (num.includes('.')) {
      rules.push('Decimal point present: all digits are significant');
    } else {
      rules.push('No decimal point: trailing zeros may not be significant');
    }
    
    if (num.startsWith('0') && !num.startsWith('0.')) {
      rules.push('Leading zeros are never significant');
    }
    
    if (num.includes('e') || num.includes('E')) {
      rules.push('Scientific notation: only digits in mantissa count');
    }
    
    return rules;
  };

  const roundToSignificantFigures = (num: number, sigFigs: number): string => {
    if (sigFigs <= 0) return '0';
    
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const factor = Math.pow(10, sigFigs - 1 - magnitude);
    const rounded = Math.round(num * factor) / factor;
    
    return rounded.toString();
  };

  const performSigFigOperation = (num1: string, num2: string, op: 'add' | 'multiply'): SigFigOperationResult => {
    const val1 = parseFloat(num1);
    const val2 = parseFloat(num2);
    
    if (isNaN(val1) || isNaN(val2)) {
      return {
        operation: op,
        result: 'Invalid input',
        significantFigures: 0,
        explanation: 'Please enter valid numbers'
      };
    }
    
    let result: number;
    let explanation: string;
    
    if (op === 'add') {
      result = val1 + val2;
      const sigFigs1 = countSignificantFigures(num1);
      const sigFigs2 = countSignificantFigures(num2);
      const minSigFigs = Math.min(sigFigs1, sigFigs2);
      explanation = `Addition: result has same decimal places as least precise number (${minSigFigs} sig figs)`;
    } else {
      result = val1 * val2;
      const sigFigs1 = countSignificantFigures(num1);
      const sigFigs2 = countSignificantFigures(num2);
      const minSigFigs = Math.min(sigFigs1, sigFigs2);
      explanation = `Multiplication: result has same significant figures as least precise number (${minSigFigs} sig figs)`;
    }
    
    const resultSigFigs = op === 'add' 
      ? Math.min(countSignificantFigures(num1), countSignificantFigures(num2))
      : Math.min(countSignificantFigures(num1), countSignificantFigures(num2));
    
    const roundedResult = roundToSignificantFigures(result, resultSigFigs);
    
    return {
      operation: op,
      result: roundedResult,
      significantFigures: resultSigFigs,
      explanation
    };
  };

  const calculateSignificantFigures = () => {
    if (!input.trim()) {
      alert('Please enter a number');
      return;
    }

    const sigFigs = countSignificantFigures(input);
    const rules = getSigFigRules(input);
    
    let explanation = `The number "${input}" has ${sigFigs} significant figure${sigFigs !== 1 ? 's' : ''}. `;
    
    if (sigFigs === 0) {
      explanation += 'This number has no significant figures.';
    } else if (sigFigs === 1) {
      explanation += 'Only one digit is significant.';
    } else {
      explanation += `All ${sigFigs} digits are significant.`;
    }

    const inputValue = parseFloat(input);
    let roundedToSigFigs = '';
    let scientificNotation = '';
    
    if (!isNaN(inputValue)) {
      if (targetSigFigs && parseInt(targetSigFigs) > 0) {
        roundedToSigFigs = roundToSignificantFigures(inputValue, parseInt(targetSigFigs));
      }
      scientificNotation = inputValue.toExponential();
    }

    setResult({
      input,
      significantFigures: sigFigs,
      roundedToSigFigs,
      scientificNotation,
      rules,
      explanation
    });
  };

  const performOperation = () => {
    if (!input.trim() || !secondNumber.trim()) {
      alert('Please enter both numbers');
      return;
    }

    const opResult = performSigFigOperation(input, secondNumber, operation as 'add' | 'multiply');
    setOperationResult(opResult);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Significant Figures Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate significant figures, round numbers, and perform operations while maintaining proper precision:</p>
          </>
        )}
      
      <div className="space-y-6">
        {/* Operation Selection */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Select Operation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="operation"
                value="count"
                checked={operation === 'count'}
                onChange={(e) => setOperation(e.target.value as 'count' | 'round' | 'add' | 'multiply')}
                className="mr-2"
              />
              Count Sig Figs
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="operation"
                value="round"
                checked={operation === 'round'}
                onChange={(e) => setOperation(e.target.value as 'count' | 'round' | 'add' | 'multiply')}
                className="mr-2"
              />
              Round to Sig Figs
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="operation"
                value="add"
                checked={operation === 'add'}
                onChange={(e) => setOperation(e.target.value as 'count' | 'round' | 'add' | 'multiply')}
                className="mr-2"
              />
              Add Numbers
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="operation"
                value="multiply"
                checked={operation === 'multiply'}
                onChange={(e) => setOperation(e.target.value as 'count' | 'round' | 'add' | 'multiply')}
                className="mr-2"
              />
              Multiply Numbers
            </label>
          </div>
        </div>

        {/* Input Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Enter Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Number"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter number (e.g., 123.45, 0.00123, 1.23e4)"
              autoFocus
            />
            {(operation === 'round') && (
              <Input
                label="Target Significant Figures"
                type="number"
                value={targetSigFigs}
                onChange={(e) => setTargetSigFigs(e.target.value)}
                placeholder="Enter number of sig figs"
              />
            )}
            {(operation === 'add' || operation === 'multiply') && (
              <Input
                label="Second Number"
                type="text"
                value={secondNumber}
                onChange={(e) => setSecondNumber(e.target.value)}
                placeholder="Enter second number"
              />
            )}
          </div>
        </div>

        <Button 
          onClick={operation === 'count' || operation === 'round' ? calculateSignificantFigures : performOperation}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          {operation === 'count' ? 'Count Significant Figures' : 
           operation === 'round' ? 'Round to Significant Figures' :
           operation === 'add' ? 'Add Numbers' : 'Multiply Numbers'}
        </Button>

        {/* Results */}
        {result !== null && (
          <div 
            className={`mt-6 p-6 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Significant Figures Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Input Number:</p>
                <p className="font-mono text-lg font-bold">{result.input}</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Significant Figures:</p>
                <p className="font-mono text-xl font-bold text-orange-600">{result.significantFigures}</p>
              </div>
            </div>

            {result.roundedToSigFigs && (
              <div className="bg-white p-4 rounded border mb-4">
                <p className="font-semibold text-gray-700 mb-1">Rounded to {targetSigFigs} Sig Figs:</p>
                <p className="font-mono text-lg font-bold">{result.roundedToSigFigs}</p>
              </div>
            )}

            <div className="bg-white p-4 rounded border mb-4">
              <p className="font-semibold text-gray-700 mb-2">Scientific Notation:</p>
              <p className="font-mono text-lg">{result.scientificNotation}</p>
            </div>

            <div className="bg-white p-4 rounded border mb-4">
              <p className="font-semibold text-gray-700 mb-2">Rules Applied:</p>
              <ul className="list-disc list-inside space-y-1">
                {result.rules.map((rule, index) => (
                  <li key={index} className="text-sm">{rule}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded border">
              <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
              <p className="text-sm">{result.explanation}</p>
            </div>
          </div>
        )}

        {operationResult !== null && (
          <div 
            className={`mt-6 p-6 ${colors.resultBg} border ${colors.resultBorder} rounded-md`}
            style={colors.customStyles?.resultBg}
          >
            <h3 
              className={`text-lg font-semibold ${colors.resultText} mb-4`}
              style={colors.customStyles?.resultText}
            >
              Operation Result
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Result:</p>
                <p className="font-mono text-xl font-bold text-orange-600">{operationResult.result}</p>
              </div>
              <div className="bg-white p-4 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Significant Figures:</p>
                <p className="font-mono text-lg font-bold">{operationResult.significantFigures}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
              <p className="text-sm">{operationResult.explanation}</p>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Significant Figures Rules</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• All non-zero digits are significant</li>
            <li>• Zeros between non-zero digits are significant</li>
            <li>• Leading zeros are never significant</li>
            <li>• Trailing zeros are significant only if there&apos;s a decimal point</li>
            <li>• In scientific notation, only digits in the mantissa count</li>
          </ul>
        </div>
      </div>
      </Card>
    </>
  );
}
