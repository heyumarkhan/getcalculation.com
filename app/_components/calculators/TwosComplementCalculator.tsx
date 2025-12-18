'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface TwosComplementCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface TwosComplementResult {
  decimal: number;
  binary: string;
  twosComplement: string;
  explanation: string;
  steps: string[];
  bitWidth: number;
}

export default function TwosComplementCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: TwosComplementCalculatorProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [bitWidth, setBitWidth] = useState<number>(8);
  const [result, setResult] = useState<TwosComplementResult | null>(null);
  const [inputType, setInputType] = useState<'decimal' | 'binary'>('decimal');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    return value.toString();
  };

  // Convert decimal to binary
  const decimalToBinary = (num: number, bits: number): string => {
    // Handle large numbers using BigInt for precision
    if (Math.abs(num) > Number.MAX_SAFE_INTEGER) {
      // For very large numbers, use BigInt
      const bigNum = BigInt(num);
      if (bigNum >= 0) {
        return bigNum.toString(2).padStart(bits, '0').slice(-bits);
      } else {
        const positive = -bigNum;
        return positive.toString(2).padStart(bits, '0').slice(-bits);
      }
    }
    
    // For numbers within safe integer range
    if (num >= 0) {
      return num.toString(2).padStart(bits, '0');
    }
    // For negative numbers, we'll calculate two's complement
    const positive = Math.abs(num);
    const binary = positive.toString(2).padStart(bits, '0');
    return binary;
  };

  // Calculate two's complement
  const calculateTwosComplement = (binary: string): string => {
    // Invert all bits
    let inverted = binary.split('').map(bit => bit === '0' ? '1' : '0').join('');
    
    // Add 1
    let result = '';
    let carry = 1;
    for (let i = inverted.length - 1; i >= 0; i--) {
      const bit = parseInt(inverted[i]);
      const sum = bit + carry;
      result = (sum % 2).toString() + result;
      carry = Math.floor(sum / 2);
    }
    
    return result;
  };

  // Convert binary to decimal (signed two's complement)
  const binaryToDecimal = (binary: string): number => {
    if (binary.length === 0) return 0;
    
    // For large bit widths (64-bit), use BigInt for precision
    if (binary.length > 53) {
      let decimal = BigInt(0);
      for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
          decimal += BigInt(2) ** BigInt(binary.length - 1 - i);
        }
      }
      
      // If MSB is 1, it's a negative number in two's complement
      if (binary[0] === '1') {
        decimal -= BigInt(2) ** BigInt(binary.length);
      }
      
      // Convert BigInt to Number (may lose precision for very large numbers)
      return Number(decimal);
    }
    
    // For smaller bit widths, use regular Number arithmetic
    let decimal = 0;
    for (let i = 0; i < binary.length; i++) {
      if (binary[i] === '1') {
        decimal += Math.pow(2, binary.length - 1 - i);
      }
    }
    
    // If MSB is 1, it's a negative number in two's complement
    // Subtract 2^n to get the signed value
    if (binary[0] === '1') {
      decimal -= Math.pow(2, binary.length);
    }
    
    return decimal;
  };

  const calculateTwosComplementValue = () => {
    if (!inputValue.trim()) {
      alert('Please enter a value');
      return;
    }

    let decimalValue: number;
    let binaryValue: string;
    let twosComplementValue: string;
    let steps: string[] = [];

    if (inputType === 'decimal') {
      const inputNum = parseInt(inputValue);
      if (isNaN(inputNum)) {
        alert('Please enter a valid decimal number');
        return;
      }

      const maxValue = Math.pow(2, bitWidth - 1) - 1;
      const minValue = -Math.pow(2, bitWidth - 1);

      // Format large numbers for display
      const formatNumber = (num: number): string => {
        if (Math.abs(num) >= 1e6) {
          return num.toLocaleString('en-US');
        }
        return num.toString();
      };

      if (inputNum > maxValue || inputNum < minValue) {
        alert(`Value must be between ${formatNumber(minValue)} and ${formatNumber(maxValue)} for ${bitWidth}-bit representation`);
        return;
      }

      decimalValue = inputNum;
      
      if (inputNum >= 0) {
        // Positive number: binary representation is the same
        binaryValue = decimalToBinary(inputNum, bitWidth);
        twosComplementValue = binaryValue;
        
        steps.push(`Step 1: Convert ${inputNum} to binary`);
        steps.push(`Step 2: ${inputNum} in binary is ${binaryValue}`);
        steps.push(`Step 3: For positive numbers, two's complement is the same as binary`);
        steps.push(`Step 4: Two's complement: ${twosComplementValue}`);
      } else {
        // Negative number: need to calculate two's complement
        const positiveValue = Math.abs(inputNum);
        binaryValue = decimalToBinary(positiveValue, bitWidth);
        
        steps.push(`Step 1: Convert absolute value ${positiveValue} to binary`);
        steps.push(`Step 2: ${positiveValue} in binary is ${binaryValue}`);
        steps.push(`Step 3: Invert all bits (one's complement)`);
        
        const inverted = binaryValue.split('').map(bit => bit === '0' ? '1' : '0').join('');
        steps.push(`Step 4: Inverted: ${inverted}`);
        
        steps.push(`Step 5: Add 1 to get two's complement`);
        twosComplementValue = calculateTwosComplement(binaryValue);
        steps.push(`Step 6: Two's complement: ${twosComplementValue}`);
      }
    } else {
      // Binary input
      if (!/^[01]+$/.test(inputValue)) {
        alert('Please enter a valid binary number (only 0s and 1s)');
        return;
      }

      if (inputValue.length > bitWidth) {
        alert(`Binary number must be ${bitWidth} bits or less`);
        return;
      }

      // Pad to bitWidth
      binaryValue = inputValue.padStart(bitWidth, inputValue[0] === '1' ? '1' : '0');
      twosComplementValue = binaryValue;
      decimalValue = binaryToDecimal(binaryValue);

      steps.push(`Step 1: Binary input: ${binaryValue}`);
      steps.push(`Step 2: MSB is ${binaryValue[0] === '1' ? '1 (negative)' : '0 (positive)'}`);
      
      if (binaryValue[0] === '1') {
        steps.push(`Step 3: For negative numbers, convert from two's complement`);
        const inverted = binaryValue.split('').map(bit => bit === '0' ? '1' : '0').join('');
        steps.push(`Step 4: Invert bits: ${inverted}`);
        steps.push(`Step 5: Add 1 and negate to get decimal value`);
        steps.push(`Step 6: Decimal value: ${decimalValue}`);
      } else {
        steps.push(`Step 3: Convert binary to decimal`);
        steps.push(`Step 4: Decimal value: ${decimalValue}`);
      }
    }

    const explanation = decimalValue >= 0
      ? `The two's complement representation of ${decimalValue} is ${twosComplementValue}. For positive numbers, two's complement is the same as the binary representation.`
      : `The two's complement representation of ${decimalValue} is ${twosComplementValue}. This represents a negative number in ${bitWidth}-bit signed binary format.`;

    setResult({
      decimal: decimalValue,
      binary: binaryValue,
      twosComplement: twosComplementValue,
      explanation,
      steps,
      bitWidth
    });
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Two&apos;s Complement Calculator</h2>
            <p className="text-gray-600 mb-6">Convert between decimal and two&apos;s complement binary representation with step-by-step solutions:</p>
          </>
        )}
      
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          {/* Calculator Form - Left Side */}
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            {/* Input Type Selection */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Input Type</h3>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputType"
                    value="decimal"
                    checked={inputType === 'decimal'}
                    onChange={(e) => setInputType(e.target.value as 'decimal' | 'binary')}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Decimal</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="inputType"
                    value="binary"
                    checked={inputType === 'binary'}
                    onChange={(e) => setInputType(e.target.value as 'decimal' | 'binary')}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Binary</span>
                </label>
              </div>
            </div>

            {/* Bit Width Selection */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Bit Width</h3>
              <select
                value={bitWidth}
                onChange={(e) => setBitWidth(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC]"
              >
                <option value={4}>4 bits (-8 to 7)</option>
                <option value={8}>8 bits (-128 to 127)</option>
                <option value={12}>12 bits (-2,048 to 2,047)</option>
                <option value={16}>16 bits (-32,768 to 32,767)</option>
                <option value={24}>24 bits (-8,388,608 to 8,388,607)</option>
                <option value={32}>32 bits (-2,147,483,648 to 2,147,483,647)</option>
                <option value={64}>64 bits (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807)</option>
              </select>
            </div>

            {/* Input Fields */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Value</h3>
              <Input
                label={inputType === 'decimal' ? 'Decimal Number' : 'Binary Number'}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputType === 'decimal' ? 'Enter decimal number' : 'Enter binary number (e.g., 1010)'}
                autoFocus
              />
              <p className="text-sm text-gray-600 mt-2">
                <strong>Note:</strong> {inputType === 'decimal' 
                  ? (() => {
                      const min = -Math.pow(2, bitWidth - 1);
                      const max = Math.pow(2, bitWidth - 1) - 1;
                      // Format large numbers with commas
                      const formatNumber = (num: number): string => {
                        if (Math.abs(num) >= 1e6) {
                          return num.toLocaleString('en-US');
                        }
                        return num.toString();
                      };
                      return `Enter a signed integer between ${formatNumber(min)} and ${formatNumber(max)}`;
                    })()
                  : `Enter a binary number (0s and 1s) up to ${bitWidth} bits`}
              </p>
            </div>

            <Button 
              onClick={calculateTwosComplementValue}
              className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate Two&apos;s Complement
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
                Two&apos;s Complement Result
              </h3>
              
              {result !== null ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Decimal Value:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.decimal)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Binary:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.binary}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Two&apos;s Complement:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.twosComplement}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Bit Width:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{result.bitWidth} bits</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Explanation:</h4>
                      <p className="text-gray-600 text-sm">{result.explanation}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Step-by-Step:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                        {result.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-4">🔢</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter a decimal or binary value to calculate two&apos;s complement</p>
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

