'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface FractionCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface Fraction {
  numerator: number;
  denominator: number;
}

export default function FractionCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: FractionCalculatorProps) {
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide' | 'simplify' | 'to_decimal' | 'to_fraction'>('add');
  const [num1, setNum1] = useState<string>('');
  const [den1, setDen1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [den2, setDen2] = useState<string>('');
  const [decimalInput, setDecimalInput] = useState<string>('');
  const [result, setResult] = useState<Fraction | null>(null);
  const [decimalResult, setDecimalResult] = useState<number | null>(null);
  const [calculation, setCalculation] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(6);
    }
    return value.toFixed(6);
  };

  // Greatest Common Divisor (GCD) using Euclidean algorithm
  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Simplify a fraction
  const simplifyFraction = (numerator: number, denominator: number): Fraction => {
    if (denominator === 0) {
      return { numerator: 0, denominator: 1 };
    }
    const divisor = gcd(numerator, denominator);
    const simplifiedNum = numerator / divisor;
    const simplifiedDen = denominator / divisor;
    
    // Handle negative signs
    if (simplifiedDen < 0) {
      return { numerator: -simplifiedNum, denominator: -simplifiedDen };
    }
    return { numerator: simplifiedNum, denominator: simplifiedDen };
  };

  // Convert decimal to fraction
  const decimalToFraction = (decimal: number): Fraction => {
    if (decimal === 0) return { numerator: 0, denominator: 1 };
    
    const isNegative = decimal < 0;
    const absDecimal = Math.abs(decimal);
    
    // Count decimal places
    const str = absDecimal.toString();
    const decimalPlaces = str.includes('.') ? str.split('.')[1].length : 0;
    const multiplier = Math.pow(10, decimalPlaces);
    
    let numerator = Math.round(absDecimal * multiplier);
    let denominator = multiplier;
    
    // Simplify
    const simplified = simplifyFraction(numerator, denominator);
    
    return {
      numerator: isNegative ? -simplified.numerator : simplified.numerator,
      denominator: simplified.denominator
    };
  };

  const calculateFraction = () => {
    let calcResult: Fraction | null = null;
    let calcDecimal: number | null = null;
    let calcString = '';

    switch (operation) {
      case 'add':
        const n1 = parseFloat(num1);
        const d1 = parseFloat(den1);
        const n2 = parseFloat(num2);
        const d2 = parseFloat(den2);
        
        if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
          alert('Please enter valid numbers. Denominators cannot be zero.');
          setResult(null);
          setCalculation('');
          return;
        }
        
        // Add: (a/b) + (c/d) = (ad + bc) / bd
        const addNum = n1 * d2 + n2 * d1;
        const addDen = d1 * d2;
        calcResult = simplifyFraction(addNum, addDen);
        calcString = `(${n1}/${d1}) + (${n2}/${d2}) = (${n1}×${d2} + ${n2}×${d1}) / (${d1}×${d2}) = ${addNum}/${addDen} = ${calcResult.numerator}/${calcResult.denominator}`;
        break;

      case 'subtract':
        const sn1 = parseFloat(num1);
        const sd1 = parseFloat(den1);
        const sn2 = parseFloat(num2);
        const sd2 = parseFloat(den2);
        
        if (isNaN(sn1) || isNaN(sd1) || isNaN(sn2) || isNaN(sd2) || sd1 === 0 || sd2 === 0) {
          alert('Please enter valid numbers. Denominators cannot be zero.');
          setResult(null);
          setCalculation('');
          return;
        }
        
        // Subtract: (a/b) - (c/d) = (ad - bc) / bd
        const subNum = sn1 * sd2 - sn2 * sd1;
        const subDen = sd1 * sd2;
        calcResult = simplifyFraction(subNum, subDen);
        calcString = `(${sn1}/${sd1}) - (${sn2}/${sd2}) = (${sn1}×${sd2} - ${sn2}×${sd1}) / (${sd1}×${sd2}) = ${subNum}/${subDen} = ${calcResult.numerator}/${calcResult.denominator}`;
        break;

      case 'multiply':
        const mn1 = parseFloat(num1);
        const md1 = parseFloat(den1);
        const mn2 = parseFloat(num2);
        const md2 = parseFloat(den2);
        
        if (isNaN(mn1) || isNaN(md1) || isNaN(mn2) || isNaN(md2) || md1 === 0 || md2 === 0) {
          alert('Please enter valid numbers. Denominators cannot be zero.');
          setResult(null);
          setCalculation('');
          return;
        }
        
        // Multiply: (a/b) × (c/d) = (a×c) / (b×d)
        const mulNum = mn1 * mn2;
        const mulDen = md1 * md2;
        calcResult = simplifyFraction(mulNum, mulDen);
        calcString = `(${mn1}/${md1}) × (${mn2}/${md2}) = (${mn1}×${mn2}) / (${md1}×${md2}) = ${mulNum}/${mulDen} = ${calcResult.numerator}/${calcResult.denominator}`;
        break;

      case 'divide':
        const dn1 = parseFloat(num1);
        const dd1 = parseFloat(den1);
        const dn2 = parseFloat(num2);
        const dd2 = parseFloat(den2);
        
        if (isNaN(dn1) || isNaN(dd1) || isNaN(dn2) || isNaN(dd2) || dd1 === 0 || dd2 === 0 || dn2 === 0) {
          alert('Please enter valid numbers. Denominators and second numerator cannot be zero.');
          setResult(null);
          setCalculation('');
          return;
        }
        
        // Divide: (a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d) / (b×c)
        const divNum = dn1 * dd2;
        const divDen = dd1 * dn2;
        calcResult = simplifyFraction(divNum, divDen);
        calcString = `(${dn1}/${dd1}) ÷ (${dn2}/${dd2}) = (${dn1}/${dd1}) × (${dd2}/${dn2}) = (${dn1}×${dd2}) / (${dd1}×${dn2}) = ${divNum}/${divDen} = ${calcResult.numerator}/${calcResult.denominator}`;
        break;

      case 'simplify':
        const simNum = parseFloat(num1);
        const simDen = parseFloat(den1);
        
        if (isNaN(simNum) || isNaN(simDen) || simDen === 0) {
          alert('Please enter valid numbers. Denominator cannot be zero.');
          setResult(null);
          setCalculation('');
          return;
        }
        
        calcResult = simplifyFraction(simNum, simDen);
        const divisor = gcd(simNum, simDen);
        calcString = `${simNum}/${simDen} = ${calcResult.numerator}/${calcResult.denominator} (GCD = ${divisor})`;
        break;

      case 'to_decimal':
        const toDecNum = parseFloat(num1);
        const toDecDen = parseFloat(den1);
        
        if (isNaN(toDecNum) || isNaN(toDecDen) || toDecDen === 0) {
          alert('Please enter valid numbers. Denominator cannot be zero.');
          setResult(null);
          setDecimalResult(null);
          setCalculation('');
          return;
        }
        
        calcDecimal = toDecNum / toDecDen;
        calcString = `${toDecNum}/${toDecDen} = ${formatValue(calcDecimal)}`;
        break;

      case 'to_fraction':
        const dec = parseFloat(decimalInput);
        
        if (isNaN(dec)) {
          alert('Please enter a valid decimal number.');
          setResult(null);
          setCalculation('');
          return;
        }
        
        calcResult = decimalToFraction(dec);
        calcString = `${dec} = ${calcResult.numerator}/${calcResult.denominator}`;
        break;
    }

    setResult(calcResult);
    setDecimalResult(calcDecimal);
    setCalculation(calcString);
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
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fraction Calculator</h2>
            <p className="text-gray-600 mb-6">Add, subtract, multiply, divide, simplify fractions, and convert between fractions and decimals:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Operation Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Operation</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'add', label: 'Add' },
                { value: 'subtract', label: 'Subtract' },
                { value: 'multiply', label: 'Multiply' },
                { value: 'divide', label: 'Divide' },
                { value: 'simplify', label: 'Simplify' },
                { value: 'to_decimal', label: 'To Decimal' },
                { value: 'to_fraction', label: 'To Fraction' }
              ].map((op) => (
                <Button
                  key={op.value}
                  onClick={() => setOperation(op.value as typeof operation)}
                  variant={operation === op.value ? "primary" : "outline"}
                  size="sm"
                  className={`text-sm ${operation === op.value ? 'bg-[#820ECC] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {op.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Values</h3>
            <div className="space-y-4">
              {operation === 'to_fraction' ? (
                <Input
                  label="Decimal"
                  type="text"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  placeholder="e.g., 0.75"
                  autoFocus
                />
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Numerator 1"
                      type="text"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      placeholder="e.g., 1"
                      autoFocus
                    />
                    <Input
                      label="Denominator 1"
                      type="text"
                      value={den1}
                      onChange={(e) => setDen1(e.target.value)}
                      placeholder="e.g., 2"
                    />
                  </div>
                  {(operation === 'add' || operation === 'subtract' || operation === 'multiply' || operation === 'divide') && (
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Numerator 2"
                        type="text"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        placeholder="e.g., 1"
                      />
                      <Input
                        label="Denominator 2"
                        type="text"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                        placeholder="e.g., 3"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <Button 
            onClick={calculateFraction}
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
              Result
            </h3>
            
            {(result !== null || decimalResult !== null) ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    {result !== null && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Fraction:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">
                          {result.numerator}/{result.denominator}
                        </span>
                      </div>
                    )}
                    {decimalResult !== null && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Decimal:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{formatValue(decimalResult)}</span>
                      </div>
                    )}
                    {result !== null && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">As Decimal:</span>
                        <span className="font-mono font-bold text-lg text-gray-900">
                          {formatValue(result.numerator / result.denominator)}
                        </span>
                      </div>
                    )}
                    <div className="pt-4">
                      <span className="font-medium text-gray-700 text-sm block mb-2">Calculation:</span>
                      <span className="font-mono text-sm text-gray-800 break-all">{calculation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">🔢</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter fraction values and select an operation</p>
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

