'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function StandardNotationCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [calculation, setCalculation] = useState('');
  const [conversionType, setConversionType] = useState<'scientific-to-standard' | 'standard-to-scientific' | 'expanded-form'>('scientific-to-standard');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const convertScientificToStandard = (scientificNotation: string) => {
    // Match scientific notation pattern: number x 10^exponent or numbere+exponent
    const match = scientificNotation.match(/^(-?\d+(?:\.\d+)?)\s*[x×]\s*10\^?(-?\d+)$|^(-?\d+(?:\.\d+)?)e([+-]?\d+)$/i);
    
    if (!match) {
      throw new Error('Invalid scientific notation format');
    }

    const [, base1, exp1, base2, exp2] = match;
    const base = parseFloat(base1 || base2);
    const exponent = parseInt(exp1 || exp2);

    if (isNaN(base) || isNaN(exponent)) {
      throw new Error('Invalid number format');
    }

    const result = base * Math.pow(10, exponent);
    return {
      result: result.toString(),
      calculation: `${base} × 10^${exponent} = ${result}`
    };
  };

  const convertStandardToScientific = (number: string) => {
    const num = parseFloat(number);
    
    if (isNaN(num)) {
      throw new Error('Invalid number format');
    }

    if (num === 0) {
      return {
        result: '0 × 10^0',
        calculation: '0 = 0 × 10^0'
      };
    }

    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const base = num / Math.pow(10, exponent);
    
    return {
      result: `${formatValue(base)} × 10^${exponent}`,
      calculation: `${num} = ${formatValue(base)} × 10^${exponent}`
    };
  };

  const convertToExpandedForm = (number: string) => {
    const num = parseFloat(number);
    
    if (isNaN(num)) {
      throw new Error('Invalid number format');
    }

    const numStr = num.toString();
    const [integerPart, decimalPart = ''] = numStr.split('.');
    
    const expandedParts: string[] = [];
    
    // Handle integer part
    for (let i = 0; i < integerPart.length; i++) {
      const digit = parseInt(integerPart[i]);
      const place = integerPart.length - 1 - i;
      if (digit !== 0) {
        expandedParts.push(`${digit} × 10^${place}`);
      }
    }
    
    // Handle decimal part
    for (let i = 0; i < decimalPart.length; i++) {
      const digit = parseInt(decimalPart[i]);
      const place = -(i + 1);
      if (digit !== 0) {
        expandedParts.push(`${digit} × 10^${place}`);
      }
    }
    
    if (expandedParts.length === 0) {
      expandedParts.push('0 × 10^0');
    }
    
    return {
      result: expandedParts.join(' + '),
      calculation: `${num} = ${expandedParts.join(' + ')}`
    };
  };

  const calculate = () => {
    if (!input.trim()) {
      setResult(null);
      setCalculation('');
      return;
    }

    try {
      let conversion;
      
      switch (conversionType) {
        case 'scientific-to-standard':
          conversion = convertScientificToStandard(input);
          break;
        case 'standard-to-scientific':
          conversion = convertStandardToScientific(input);
          break;
        case 'expanded-form':
          conversion = convertToExpandedForm(input);
          break;
        default:
          throw new Error('Invalid conversion type');
      }
      
      setResult(conversion.result);
      setCalculation(conversion.calculation);
    } catch (error) {
      setResult('Error: ' + (error as Error).message);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setInput('');
    setResult(null);
    setCalculation('');
  };

  const getInputPlaceholder = () => {
    switch (conversionType) {
      case 'scientific-to-standard':
        return 'e.g., 2.5 × 10^3 or 1.23e-4';
      case 'standard-to-scientific':
        return 'e.g., 2500 or 0.000123';
      case 'expanded-form':
        return 'e.g., 1234.56';
      default:
        return 'Enter a number';
    }
  };

  const getInputLabel = () => {
    switch (conversionType) {
      case 'scientific-to-standard':
        return 'Scientific Notation';
      case 'standard-to-scientific':
        return 'Standard Number';
      case 'expanded-form':
        return 'Number';
      default:
        return 'Input';
    }
  };

  const getResultLabel = () => {
    switch (conversionType) {
      case 'scientific-to-standard':
        return 'Standard Form';
      case 'standard-to-scientific':
        return 'Scientific Notation';
      case 'expanded-form':
        return 'Expanded Form';
      default:
        return 'Result';
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Standard Notation Calculator</h2>
        <p className="text-gray-600">Convert between scientific notation, standard form, and expanded form</p>
      </div>

      <div className="space-y-4">
        {/* Conversion Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Conversion Type
          </label>
          <select
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value as 'scientific-to-standard' | 'standard-to-scientific' | 'expanded-form')}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="scientific-to-standard">Scientific to Standard</option>
            <option value="standard-to-scientific">Standard to Scientific</option>
            <option value="expanded-form">Expanded Form</option>
          </select>
        </div>

        {/* Input Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {getInputLabel()}
          </label>
          <Input
            type="text"
            placeholder={getInputPlaceholder()}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1">
            Convert
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{getResultLabel()}</h3>
            <p className="text-xl font-bold text-blue-700 break-all">
              {result}
            </p>
            {calculation && (
              <p className="text-sm text-blue-600 mt-2 font-mono">
                {calculation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Scientific to Standard:</strong> Convert scientific notation to regular numbers</li>
            <li>• <strong>Standard to Scientific:</strong> Convert numbers to scientific notation</li>
            <li>• <strong>Expanded Form:</strong> Show numbers as sum of powers of 10</li>
            <li>• Use formats like &quot;2.5 × 10^3&quot; or &quot;1.23e-4&quot; for scientific notation</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-purple-700">
            <div><strong>Scientific:</strong> 2.5 × 10^3</div>
            <div><strong>Standard:</strong> 2,500</div>
            <div><strong>Scientific:</strong> 1.23e-4</div>
            <div><strong>Standard:</strong> 0.000123</div>
            <div><strong>Expanded:</strong> 1234 = 1×10³ + 2×10² + 3×10¹ + 4×10⁰</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
