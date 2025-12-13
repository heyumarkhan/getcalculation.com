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
  bitSize: number;
  method: string;
  steps: string[];
  unsignedValue?: number;
  signBit?: string;
}

export default function TwosComplementCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: TwosComplementCalculatorProps) {
  const [decimalInput, setDecimalInput] = useState<string>('');
  const [binaryInput, setBinaryInput] = useState<string>('');
  const [bitSize, setBitSize] = useState<number>(8);
  const [conversionType, setConversionType] = useState<'decimal-to-binary' | 'binary-to-decimal'>('decimal-to-binary');
  const [result, setResult] = useState<TwosComplementResult | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    return value.toString();
  };

  // Convert decimal to two's complement binary
  const decimalToTwosComplement = (decimal: number, bits: number): { binary: string; steps: string[] } => {
    const steps: string[] = [];
    const maxPositive = Math.pow(2, bits - 1) - 1;
    const minNegative = -Math.pow(2, bits - 1);

    steps.push(`Given: Decimal = ${decimal}, Bit size = ${bits} bits`);
    steps.push(`Range: ${minNegative} to ${maxPositive}`);

    if (decimal > maxPositive || decimal < minNegative) {
      throw new Error(`Value ${decimal} is out of range for ${bits}-bit two's complement (${minNegative} to ${maxPositive})`);
    }

    let binary: string;
    
    if (decimal >= 0) {
      // Positive number: convert directly to binary
      steps.push(`Step 1: ${decimal} is positive, convert directly to binary`);
      let num = decimal;
      let binaryDigits: string[] = [];
      
      if (num === 0) {
        binaryDigits = ['0'];
      } else {
        while (num > 0) {
          binaryDigits.unshift((num % 2).toString());
          num = Math.floor(num / 2);
        }
      }
      
      const binaryStr = binaryDigits.join('');
      steps.push(`  ${decimal} in binary: ${binaryStr}`);
      
      // Pad to bit size
      binary = binaryStr.padStart(bits, '0');
      steps.push(`Step 2: Pad to ${bits} bits: ${binary}`);
      steps.push(`Result: ${binary} (sign bit = 0, positive)`);
    } else {
      // Negative number: use two's complement
      steps.push(`Step 1: ${decimal} is negative, use two's complement method`);
      
      // Step 1: Convert absolute value to binary
      const absValue = Math.abs(decimal);
      let num = absValue;
      let binaryDigits: string[] = [];
      
      if (num === 0) {
        binaryDigits = ['0'];
      } else {
        while (num > 0) {
          binaryDigits.unshift((num % 2).toString());
          num = Math.floor(num / 2);
        }
      }
      
      let absBinary = binaryDigits.join('').padStart(bits, '0');
      steps.push(`  |${decimal}| = ${absValue} in binary: ${absBinary}`);
      
      // Step 2: Invert all bits (one's complement)
      let inverted = absBinary.split('').map(bit => bit === '0' ? '1' : '0').join('');
      steps.push(`Step 2: Invert all bits (one's complement)`);
      steps.push(`  ${absBinary} → ${inverted}`);
      
      // Step 3: Add 1
      steps.push(`Step 3: Add 1 to get two's complement`);
      let result = '';
      let carry = 1;
      for (let i = inverted.length - 1; i >= 0; i--) {
        const bit = parseInt(inverted[i]);
        const sum = bit + carry;
        result = (sum % 2).toString() + result;
        carry = Math.floor(sum / 2);
      }
      binary = result;
      steps.push(`  ${inverted} + 1 = ${binary}`);
      steps.push(`Result: ${binary} (sign bit = 1, negative)`);
    }

    return { binary, steps };
  };

  // Convert two's complement binary to decimal
  const binaryToDecimal = (binary: string, bits: number): { decimal: number; steps: string[] } => {
    const steps: string[] = [];
    
    steps.push(`Given: Binary = ${binary}, Bit size = ${bits} bits`);
    
    // Validate binary string
    if (!/^[01]+$/.test(binary)) {
      throw new Error('Invalid binary string. Only 0s and 1s are allowed.');
    }
    
    if (binary.length > bits) {
      throw new Error(`Binary string length (${binary.length}) exceeds bit size (${bits})`);
    }
    
    // Pad to bit size
    const paddedBinary = binary.padStart(bits, '0');
    if (paddedBinary !== binary && binary.length < bits) {
      steps.push(`Padded to ${bits} bits: ${paddedBinary}`);
    }
    
    const signBit = paddedBinary[0];
    steps.push(`Sign bit: ${signBit} (${signBit === '0' ? 'positive' : 'negative'})`);
    
    let decimal: number;
    
    if (signBit === '0') {
      // Positive number: convert directly
      steps.push(`Step 1: Sign bit is 0, so this is a positive number`);
      steps.push(`Step 2: Convert binary to decimal directly`);
      decimal = 0;
      let calculation = '';
      for (let i = 0; i < paddedBinary.length; i++) {
        const bit = parseInt(paddedBinary[i]);
        const power = paddedBinary.length - 1 - i;
        const value = bit * Math.pow(2, power);
        decimal += value;
        if (bit === 1) {
          if (calculation) calculation += ' + ';
          calculation += `2^${power}`;
        }
      }
      steps.push(`  ${paddedBinary} = ${calculation} = ${decimal}`);
      steps.push(`Result: ${decimal} (positive)`);
    } else {
      // Negative number: two's complement
      steps.push(`Step 1: Sign bit is 1, so this is a negative number`);
      steps.push(`Step 2: Apply two's complement to find absolute value`);
      
      // Step 1: Subtract 1
      steps.push(`  Subtract 1: ${paddedBinary} - 1`);
      let afterSubtract = '';
      let borrow = 1;
      for (let i = paddedBinary.length - 1; i >= 0; i--) {
        const bit = parseInt(paddedBinary[i]);
        const diff = bit - borrow;
        if (diff < 0) {
          afterSubtract = '1' + afterSubtract;
          borrow = 1;
        } else {
          afterSubtract = diff.toString() + afterSubtract;
          borrow = 0;
        }
      }
      steps.push(`  Result: ${afterSubtract}`);
      
      // Step 2: Invert bits
      let inverted = afterSubtract.split('').map(bit => bit === '0' ? '1' : '0').join('');
      steps.push(`Step 3: Invert all bits`);
      steps.push(`  ${afterSubtract} → ${inverted}`);
      
      // Step 3: Convert to decimal (this is the absolute value)
      let absValue = 0;
      for (let i = 0; i < inverted.length; i++) {
        const bit = parseInt(inverted[i]);
        const power = inverted.length - 1 - i;
        absValue += bit * Math.pow(2, power);
      }
      steps.push(`Step 4: Convert to decimal (absolute value)`);
      steps.push(`  ${inverted} = ${absValue}`);
      
      decimal = -absValue;
      steps.push(`Result: -${absValue} = ${decimal} (negative)`);
    }

    return { decimal, steps };
  };

  const calculate = () => {
    try {
      if (conversionType === 'decimal-to-binary') {
        const decimal = parseInt(decimalInput);
        
        if (isNaN(decimal)) {
          alert('Please enter a valid decimal number');
          return;
        }

        const { binary, steps } = decimalToTwosComplement(decimal, bitSize);
        const unsignedValue = parseInt(binary, 2);
        const signBit = binary[0];

        setResult({
          decimal,
          binary,
          bitSize,
          method: 'Decimal to Two\'s Complement',
          steps,
          unsignedValue,
          signBit
        });
      } else {
        // binary to decimal
        if (!binaryInput.trim()) {
          alert('Please enter a binary number');
          return;
        }

        const { decimal, steps } = binaryToDecimal(binaryInput.trim(), bitSize);
        const unsignedValue = parseInt(binaryInput.trim().padStart(bitSize, '0'), 2);
        const signBit = binaryInput.trim().padStart(bitSize, '0')[0];

        setResult({
          decimal,
          binary: binaryInput.trim().padStart(bitSize, '0'),
          bitSize,
          method: 'Two\'s Complement to Decimal',
          steps,
          unsignedValue,
          signBit
        });
      }
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'decimal':
        setDecimalInput(value);
        break;
      case 'binary':
        // Only allow 0s and 1s
        if (value === '' || /^[01]*$/.test(value)) {
          setBinaryInput(value);
        }
        break;
    }
    if (result !== null) {
      setResult(null);
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

  const clearAll = () => {
    setDecimalInput('');
    setBinaryInput('');
    setResult(null);
  };

  const getRange = (bits: number): string => {
    const maxPositive = Math.pow(2, bits - 1) - 1;
    const minNegative = -Math.pow(2, bits - 1);
    return `${minNegative} to ${maxPositive}`;
  };

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Two's Complement Calculator</h2>
            <p className="text-gray-600 mb-6">Convert between decimal numbers and two's complement binary representation with step-by-step solutions.</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Conversion Type Selector */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Conversion Type</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setConversionType('decimal-to-binary')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  conversionType === 'decimal-to-binary'
                    ? 'bg-[#820ECC] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Decimal → Binary
              </button>
              <button
                onClick={() => setConversionType('binary-to-decimal')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  conversionType === 'binary-to-decimal'
                    ? 'bg-[#820ECC] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Binary → Decimal
              </button>
            </div>
          </div>

          {/* Bit Size Selector */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Bit Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {[4, 8, 16, 32].map((bits) => (
                <button
                  key={bits}
                  onClick={() => setBitSize(bits)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    bitSize === bits
                      ? 'bg-[#820ECC] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {bits}-bit
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Range: {getRange(bitSize)}</p>
          </div>

          {/* Input Fields */}
          {conversionType === 'decimal-to-binary' ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Decimal Number</h3>
              <Input
                label="Decimal"
                type="text"
                value={decimalInput}
                onChange={(e) => handleInputChange('decimal', e.target.value)}
                placeholder="Enter decimal number"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">Enter a signed integer (positive or negative)</p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Binary Number</h3>
              <Input
                label="Binary (Two's Complement)"
                type="text"
                value={binaryInput}
                onChange={(e) => handleInputChange('binary', e.target.value)}
                placeholder="Enter binary number"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">Enter binary digits (0s and 1s only)</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={calculate}
              className={`flex-1 ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
              style={colors.customStyles?.button}
              size="lg"
            >
              Calculate
            </Button>
            <Button 
              onClick={clearAll}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Clear
            </Button>
          </div>

          {result !== null && (
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
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Method: {result.method}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Decimal</p>
                    <p 
                      className={`text-2xl font-bold ${colors.result}`}
                      style={colors.customStyles?.result}
                    >
                      {formatValue(result.decimal)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Binary ({result.bitSize}-bit)</p>
                    <p 
                      className={`text-2xl font-bold font-mono ${colors.result}`}
                      style={colors.customStyles?.result}
                    >
                      {result.binary}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-300 text-center">
                  <p className="text-sm text-gray-600">
                    Sign bit: <strong>{result.signBit}</strong> ({result.signBit === '0' ? 'Positive' : 'Negative'})
                  </p>
                </div>
              </div>
              
              {result.steps.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Step-by-Step Calculation:</h4>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {result.steps.map((step, index) => (
                      <p key={index} className="text-sm text-gray-600 font-mono">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Formula Reference */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Two's Complement Method:</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <div>
                <p className="font-semibold mb-1">For Negative Numbers:</p>
                <p className="text-xs">1. Convert absolute value to binary</p>
                <p className="text-xs">2. Invert all bits (one's complement)</p>
                <p className="text-xs">3. Add 1 to get two's complement</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-300">
                <p className="font-semibold mb-1">For Positive Numbers:</p>
                <p className="text-xs">Convert directly to binary, pad with leading zeros</p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-300">
                <p className="text-xs">
                  <strong>Range:</strong> For n-bit two's complement: -2^(n-1) to 2^(n-1)-1
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

