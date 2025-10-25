'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface CrossMultiplicationCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface CrossMultiplicationResult {
  missingValue: number;
  proportion: string;
  crossProduct1: number;
  crossProduct2: number;
  calculation: string;
  isValid: boolean;
  values: {
    a: number;
    b: number;
    c: number;
    d: number;
  };
}

export default function CrossMultiplicationCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: CrossMultiplicationCalculatorProps) {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [c, setC] = useState<string>('');
  const [d, setD] = useState<string>('');
  const [result, setResult] = useState<CrossMultiplicationResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const solveCrossMultiplication = () => {
    const aVal = parseFloat(a) || 0;
    const bVal = parseFloat(b) || 0;
    const cVal = parseFloat(c) || 0;
    const dVal = parseFloat(d) || 0;

    // Count how many values are provided
    const providedValues = [a, b, c, d].filter(val => val !== '').length;

    if (providedValues < 3) {
      alert('Please enter at least 3 values (leave one empty to solve for)');
      return;
    }

    if (providedValues === 4) {
      alert('Please leave one value empty to solve for the missing value');
      return;
    }

    // Determine which value is missing and solve
    let missingValue: number;
    let missingVariable: string;
    let calculation: string;
    let crossProduct1: number;
    let crossProduct2: number;

    if (a === '') {
      // Solve for a: a/b = c/d, so a = (b * c) / d
      if (dVal === 0) {
        alert('Cannot divide by zero. Please check your values.');
        return;
      }
      missingValue = (bVal * cVal) / dVal;
      missingVariable = 'a';
      crossProduct1 = missingValue * dVal;
      crossProduct2 = bVal * cVal;
      calculation = `a = (b × c) / d = (${bVal} × ${cVal}) / ${dVal} = ${(bVal * cVal)} / ${dVal} = ${missingValue.toFixed(4)}`;
    } else if (b === '') {
      // Solve for b: a/b = c/d, so b = (a * d) / c
      if (cVal === 0) {
        alert('Cannot divide by zero. Please check your values.');
        return;
      }
      missingValue = (aVal * dVal) / cVal;
      missingVariable = 'b';
      crossProduct1 = aVal * dVal;
      crossProduct2 = missingValue * cVal;
      calculation = `b = (a × d) / c = (${aVal} × ${dVal}) / ${cVal} = ${(aVal * dVal)} / ${cVal} = ${missingValue.toFixed(4)}`;
    } else if (c === '') {
      // Solve for c: a/b = c/d, so c = (a * d) / b
      if (bVal === 0) {
        alert('Cannot divide by zero. Please check your values.');
        return;
      }
      missingValue = (aVal * dVal) / bVal;
      missingVariable = 'c';
      crossProduct1 = aVal * dVal;
      crossProduct2 = bVal * missingValue;
      calculation = `c = (a × d) / b = (${aVal} × ${dVal}) / ${bVal} = ${(aVal * dVal)} / ${bVal} = ${missingValue.toFixed(4)}`;
    } else { // d === ''
      // Solve for d: a/b = c/d, so d = (b * c) / a
      if (aVal === 0) {
        alert('Cannot divide by zero. Please check your values.');
        return;
      }
      missingValue = (bVal * cVal) / aVal;
      missingVariable = 'd';
      crossProduct1 = aVal * missingValue;
      crossProduct2 = bVal * cVal;
      calculation = `d = (b × c) / a = (${bVal} × ${cVal}) / ${aVal} = ${(bVal * cVal)} / ${aVal} = ${missingValue.toFixed(4)}`;
    }

    // Create proportion string
    const proportion = missingVariable === 'a' 
      ? `${missingValue.toFixed(4)}/${bVal} = ${cVal}/${dVal}`
      : missingVariable === 'b'
      ? `${aVal}/${missingValue.toFixed(4)} = ${cVal}/${dVal}`
      : missingVariable === 'c'
      ? `${aVal}/${bVal} = ${missingValue.toFixed(4)}/${dVal}`
      : `${aVal}/${bVal} = ${cVal}/${missingValue.toFixed(4)}`;

    setResult({
      missingValue,
      proportion,
      crossProduct1,
      crossProduct2,
      calculation,
      isValid: true,
      values: {
        a: missingVariable === 'a' ? missingValue : aVal,
        b: missingVariable === 'b' ? missingValue : bVal,
        c: missingVariable === 'c' ? missingValue : cVal,
        d: missingVariable === 'd' ? missingValue : dVal
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'a':
        setA(value);
        break;
      case 'b':
        setB(value);
        break;
      case 'c':
        setC(value);
        break;
      case 'd':
        setD(value);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cross Multiplication Calculator</h2>
            <p className="text-gray-600 mb-6">Solve proportions using cross multiplication. Enter 3 values and leave one empty to solve for the missing value:</p>
          </>
        )}
      
      <div className="space-y-4">
        {/* Proportion Inputs */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Proportion: a/b = c/d</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="a"
                type="number"
                value={a}
                onChange={(e) => handleInputChange('a', e.target.value)}
                placeholder="Leave empty to solve"
                step="0.01"
              />
              <Input
                label="b"
                type="number"
                value={b}
                onChange={(e) => handleInputChange('b', e.target.value)}
                placeholder="Leave empty to solve"
                step="0.01"
              />
            </div>
            <div className="text-center text-gray-500 font-semibold">=</div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="c"
                type="number"
                value={c}
                onChange={(e) => handleInputChange('c', e.target.value)}
                placeholder="Leave empty to solve"
                step="0.01"
              />
              <Input
                label="d"
                type="number"
                value={d}
                onChange={(e) => handleInputChange('d', e.target.value)}
                placeholder="Leave empty to solve"
                step="0.01"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={solveCrossMultiplication}
          className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
          style={colors.customStyles?.button}
          size="lg"
        >
          Solve Cross Multiplication
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
              Cross Multiplication Result
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Missing Value:</p>
                <p className="font-mono text-2xl font-bold">{formatValue(result.missingValue)}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Complete Proportion:</p>
                <p className="font-mono text-lg">{result.proportion}</p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Cross Products (Verification):</p>
                <p className="font-mono">
                  a × d = {result.values.a} × {result.values.d} = {formatValue(result.crossProduct1)}
                </p>
                <p className="font-mono">
                  b × c = {result.values.b} × {result.values.c} = {formatValue(result.crossProduct2)}
                </p>
                <p className="font-semibold text-green-600">
                  ✓ Cross products are equal: {formatValue(result.crossProduct1)} = {formatValue(result.crossProduct2)}
                </p>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-700 mb-1">Calculation:</p>
                <p className="font-mono text-xs break-all">{result.calculation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      </Card>
    </>
  );
}
