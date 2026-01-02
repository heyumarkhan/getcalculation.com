'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ScientificNotationEquationCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface ConversionResult {
  inputNumber: number;
  scientificNotation: string;
  coefficient: number;
  exponent: number;
  explanation: string;
  steps: string[];
}

interface ArithmeticResult {
  number1: number;
  number2: number;
  operation: string;
  result: number;
  resultScientific: string;
  explanation: string;
  steps: string[];
}

export default function ScientificNotationEquationCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: ScientificNotationEquationCalculatorProps) {
  const [mode, setMode] = useState<'convert' | 'arithmetic'>('convert');
  const [inputNumber, setInputNumber] = useState<string>('');
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [arithmeticResult, setArithmeticResult] = useState<ArithmeticResult | null>(null);
  const [error, setError] = useState<string>('');

  // Convert number to scientific notation
  const toScientificNotation = (num: number): { coefficient: number; exponent: number; notation: string } => {
    if (num === 0) {
      return { coefficient: 0, exponent: 0, notation: '0' };
    }

    const isNegative = num < 0;
    const absNum = Math.abs(num);
    const exponent = Math.floor(Math.log10(absNum));
    const coefficient = absNum / Math.pow(10, exponent);

    const notation = `${isNegative ? '-' : ''}${coefficient.toFixed(10).replace(/\.?0+$/, '')} × 10^${exponent}`;
    
    return { 
      coefficient: isNegative ? -coefficient : coefficient, 
      exponent, 
      notation 
    };
  };

  const handleConvert = () => {
    setError('');
    setConversionResult(null);
    setArithmeticResult(null);

    const num = parseFloat(inputNumber);

    if (isNaN(num)) {
      setError('Please enter a valid number');
      return;
    }

    const { coefficient, exponent, notation } = toScientificNotation(num);

    const steps: string[] = [];
    if (num === 0) {
      steps.push('Zero in scientific notation is simply 0');
    } else {
      const absNum = Math.abs(num);
      steps.push(`Original number: ${num}`);
      steps.push(`Find the exponent by determining where to place the decimal point: 10^${exponent}`);
      steps.push(`Calculate coefficient: ${absNum} ÷ 10^${exponent} = ${coefficient.toFixed(10).replace(/\.?0+$/, '')}`);
      steps.push(`Scientific notation: ${notation}`);
    }

    const explanation = num === 0 
      ? 'Zero is represented as 0 in scientific notation.'
      : `The number ${num} in scientific notation is ${notation}. This means the coefficient ${coefficient.toFixed(10).replace(/\.?0+$/, '')} multiplied by 10 raised to the power ${exponent}.`;

    setConversionResult({
      inputNumber: num,
      scientificNotation: notation,
      coefficient,
      exponent,
      explanation,
      steps
    });
  };

  const handleArithmetic = () => {
    setError('');
    setConversionResult(null);
    setArithmeticResult(null);

    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers for both values');
      return;
    }

    if (operation === 'divide' && num2 === 0) {
      setError('Cannot divide by zero');
      return;
    }

    let result = 0;
    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        result = num1 / num2;
        break;
    }

    const { notation: resultNotation } = toScientificNotation(result);
    const { coefficient: coef1, exponent: exp1, notation: notation1 } = toScientificNotation(num1);
    const { coefficient: coef2, exponent: exp2, notation: notation2 } = toScientificNotation(num2);

    const steps: string[] = [];
    steps.push(`Number 1: ${notation1}`);
    steps.push(`Number 2: ${notation2}`);
    steps.push(`Operation: ${operation.charAt(0).toUpperCase() + operation.slice(1)}`);
    steps.push(`Calculation: ${num1} ${operation === 'add' ? '+' : operation === 'subtract' ? '-' : operation === 'multiply' ? '×' : '÷'} ${num2} = ${result}`);
    steps.push(`Result in scientific notation: ${resultNotation}`);

    const operationSymbol = {
      add: '+',
      subtract: '−',
      multiply: '×',
      divide: '÷'
    }[operation];

    const explanation = `When performing ${operation} with numbers in scientific notation: ${notation1} ${operationSymbol} ${notation2} = ${resultNotation}. The result is ${result}.`;

    setArithmeticResult({
      number1: num1,
      number2: num2,
      operation,
      result,
      resultScientific: resultNotation,
      explanation,
      steps
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      mode === 'convert' ? handleConvert() : handleArithmetic();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {showTitle && (
        <h2 className="text-3xl font-bold mb-6" style={{ color: primaryColor }}>
          Scientific Notation Equation Calculator
        </h2>
      )}

      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setMode('convert');
                setError('');
                setConversionResult(null);
                setArithmeticResult(null);
              }}
              className={`px-4 py-2 rounded font-semibold transition ${mode === 'convert' ? 'text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              style={{ backgroundColor: mode === 'convert' ? primaryColor : 'transparent' }}
            >
              Convert
            </button>
            <button
              onClick={() => {
                setMode('arithmetic');
                setError('');
                setConversionResult(null);
                setArithmeticResult(null);
              }}
              className={`px-4 py-2 rounded font-semibold transition ${mode === 'arithmetic' ? 'text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              style={{ backgroundColor: mode === 'arithmetic' ? primaryColor : 'transparent' }}
            >
              Arithmetic
            </button>
          </div>

          {mode === 'convert' ? (
            <div>
              <label className="block text-sm font-semibold mb-2">Enter a Number</label>
              <Input
                type="number"
                placeholder="e.g., 1500000 or 0.000045"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold mb-2">First Number</label>
                <Input
                  type="number"
                  placeholder="e.g., 2.5e6 or 2500000"
                  value={number1}
                  onChange={(e) => setNumber1(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Operation</label>
                <select
                  value={operation}
                  onChange={(e) => setOperation(e.target.value as 'add' | 'subtract' | 'multiply' | 'divide')}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="add">Add (+)</option>
                  <option value="subtract">Subtract (−)</option>
                  <option value="multiply">Multiply (×)</option>
                  <option value="divide">Divide (÷)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Second Number</label>
                <Input
                  type="number"
                  placeholder="e.g., 3.2e5 or 320000"
                  value={number2}
                  onChange={(e) => setNumber2(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </>
          )}

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <Button
            onClick={mode === 'convert' ? handleConvert : handleArithmetic}
            style={{ backgroundColor: primaryColor }}
            className="w-full text-white font-semibold py-2 rounded-lg hover:opacity-90 transition"
          >
            {mode === 'convert' ? 'Convert to Scientific Notation' : 'Calculate'}
          </Button>
        </div>
      </Card>

      {conversionResult && (
        <div className="space-y-6">
          <div className="p-6 border-2 bg-white rounded-lg" style={{ borderColor: primaryColor }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
              Result
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-600 mb-2">Original Number</div>
                <div className="text-2xl font-bold">{conversionResult.inputNumber}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-600 mb-2">Scientific Notation</div>
                <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                  {conversionResult.scientificNotation}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-100 rounded text-center">
                  <div className="text-sm text-gray-600 mb-1">Coefficient</div>
                  <div className="text-lg font-semibold">{conversionResult.coefficient.toFixed(10).replace(/\.?0+$/, '')}</div>
                </div>
                <div className="p-3 bg-gray-100 rounded text-center">
                  <div className="text-sm text-gray-600 mb-1">Exponent</div>
                  <div className="text-lg font-semibold">{conversionResult.exponent}</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>
              Explanation
            </h3>
            <p className="text-gray-700 mb-4">{conversionResult.explanation}</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>
              Step-by-Step Conversion
            </h3>
            <div className="space-y-3">
              {conversionResult.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 font-semibold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {index + 1}
                  </div>
                  <div className="pt-1 text-gray-700">{step}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {arithmeticResult && (
        <div className="space-y-6">
          <div className="p-6 border-2 bg-white rounded-lg" style={{ borderColor: primaryColor }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>
              Result
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-600 mb-2">Decimal Form</div>
                <div className="text-2xl font-bold">{arithmeticResult.result}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <div className="text-sm text-gray-600 mb-2">Scientific Notation Form</div>
                <div className="text-2xl font-bold" style={{ color: primaryColor }}>
                  {arithmeticResult.resultScientific}
                </div>
              </div>
            </div>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>
              Explanation
            </h3>
            <p className="text-gray-700 mb-4">{arithmeticResult.explanation}</p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: primaryColor }}>
              Step-by-Step Calculation
            </h3>
            <div className="space-y-3">
              {arithmeticResult.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 font-semibold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {index + 1}
                  </div>
                  <div className="pt-1 text-gray-700">{step}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
