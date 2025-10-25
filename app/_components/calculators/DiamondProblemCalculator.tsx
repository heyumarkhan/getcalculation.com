'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface DiamondProblemCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface DiamondProblemResult {
  number1: number;
  number2: number;
  sum: number;
  product: number;
  method: string;
  calculation: string;
  isValid: boolean;
}

export default function DiamondProblemCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: DiamondProblemCalculatorProps) {
  const [sum, setSum] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [result, setResult] = useState<DiamondProblemResult | null>(null);

  const solveDiamondProblem = () => {
    const s = parseFloat(sum) || 0;
    const p = parseFloat(product) || 0;

    if (s === 0 && p === 0) {
      alert('Please enter at least one value (sum or product)');
      return;
    }

    // If we have both sum and product, solve the system
    if (s !== 0 && p !== 0) {
      // We need to solve: x + y = s and x * y = p
      // From x + y = s, we get y = s - x
      // Substituting: x(s - x) = p
      // So: sx - x² = p
      // Rearranging: x² - sx + p = 0
      // Using quadratic formula: x = (s ± √(s² - 4p)) / 2
      
      const discriminant = s * s - 4 * p;
      
      if (discriminant < 0) {
        alert('No real solutions exist for these values');
        return;
      }
      
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const x1 = (s + sqrtDiscriminant) / 2;
      const x2 = (s - sqrtDiscriminant) / 2;
      
      const y1 = s - x1;
      const y2 = s - x2;
      
      // Check which solution gives the correct product
      let solution1, solution2;
      if (Math.abs(x1 * y1 - p) < 0.0001) {
        solution1 = x1;
        solution2 = y1;
      } else {
        solution1 = x2;
        solution2 = y2;
      }
      
      const calculation = `Using quadratic formula: x = (${s} ± √(${s}² - 4×${p}))/2 = (${s} ± √(${s*s} - ${4*p}))/2 = (${s} ± √${discriminant})/2`;
      
      setResult({
        number1: solution1,
        number2: solution2,
        sum: s,
        product: p,
        method: 'Quadratic Formula',
        calculation,
        isValid: true
      });
    }
    // If we only have sum, we can't solve uniquely
    else if (s !== 0) {
      alert('Please enter both sum and product to solve the diamond problem');
      return;
    }
    // If we only have product, we can't solve uniquely
    else if (p !== 0) {
      alert('Please enter both sum and product to solve the diamond problem');
      return;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    switch (field) {
      case 'sum':
        setSum(value);
        break;
      case 'product':
        setProduct(value);
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
          `
        }} />
      )}
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Diamond Problem Solver</h2>
            <p className="text-gray-600 mb-6">Find two numbers that add to a given sum and multiply to a given product:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
        {/* Diamond Problem Inputs */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Diamond Problem Values</h3>
          <div className="space-y-3">
            <Input
              label="Sum (a + b)"
              type="text"
              value={sum}
              onChange={(e) => handleInputChange('sum', e.target.value)}
              placeholder="Enter the sum of two numbers"
              autoFocus
            />
            <Input
              label="Product (a × b)"
              type="text"
              value={product}
              onChange={(e) => handleInputChange('product', e.target.value)}
              placeholder="Enter the product of two numbers"
            />
          </div>
        </div>

        <Button 
          onClick={solveDiamondProblem}
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
              Diamond Problem Solution
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Number 1:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{result.number1.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Number 2:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{result.number2.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Sum:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{(result.number1 + result.number2).toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700 text-lg">Product:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{(result.number1 * result.number2).toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">💎</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter sum and product to find the two numbers</p>
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
