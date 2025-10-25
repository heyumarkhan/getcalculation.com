'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface GCFCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface GCFResult {
  gcf: number;
  numbers: number[];
  factors: { [key: number]: number[] };
  explanation: string;
  steps: string[];
  primeFactors: { [key: number]: number[] };
}

export default function GCFCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: GCFCalculatorProps) {
  const [numbers, setNumbers] = useState<string>('');
  const [result, setResult] = useState<GCFResult | null>(null);

  // Function to find all factors of a number
  const findFactors = (num: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  // Function to find prime factors
  const findPrimeFactors = (num: number): number[] => {
    const factors: number[] = [];
    let d = 2;
    while (d * d <= num) {
      while (num % d === 0) {
        factors.push(d);
        num /= d;
      }
      d++;
    }
    if (num > 1) factors.push(num);
    return factors;
  };

  // Function to calculate GCF using Euclidean algorithm
  const calculateGCF = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return Math.abs(a);
  };

  // Function to calculate GCF for multiple numbers
  const calculateMultipleGCF = (nums: number[]): number => {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return Math.abs(nums[0]);
    
    let gcf = Math.abs(nums[0]);
    for (let i = 1; i < nums.length; i++) {
      gcf = calculateGCF(gcf, Math.abs(nums[i]));
    }
    return gcf;
  };

  const calculateGCFResult = () => {
    // Parse input numbers
    const inputNumbers = numbers
      .split(/[,\s]+/)
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n !== 0);

    // Validation
    if (inputNumbers.length === 0) {
      alert('Please enter at least one valid number');
      return;
    }

    if (inputNumbers.length > 10) {
      alert('Please enter no more than 10 numbers');
      return;
    }

    if (inputNumbers.some(n => n < 0)) {
      alert('Please enter only positive numbers');
      return;
    }

    // Calculate GCF
    const gcf = calculateMultipleGCF(inputNumbers);
    
    // Find factors for each number
    const factors: { [key: number]: number[] } = {};
    const primeFactors: { [key: number]: number[] } = {};
    
    inputNumbers.forEach(num => {
      factors[num] = findFactors(num);
      primeFactors[num] = findPrimeFactors(num);
    });

    // Generate explanation
    let explanation: string;
    if (gcf === 1) {
      explanation = `The numbers ${inputNumbers.join(', ')} are relatively prime (coprime), meaning their greatest common factor is 1.`;
    } else {
      explanation = `The greatest common factor of ${inputNumbers.join(', ')} is ${gcf}. This means ${gcf} is the largest number that divides all of these numbers evenly.`;
    }

    // Generate step-by-step calculation
    const steps: string[] = [];
    
    if (inputNumbers.length === 2) {
      steps.push(`Step 1: Use the Euclidean algorithm to find GCF of ${inputNumbers[0]} and ${inputNumbers[1]}`);
      let a = inputNumbers[0];
      let b = inputNumbers[1];
      let stepNum = 2;
      
      while (b !== 0) {
        const remainder = a % b;
        steps.push(`Step ${stepNum}: ${a} ÷ ${b} = ${Math.floor(a / b)} remainder ${remainder}`);
        a = b;
        b = remainder;
        stepNum++;
      }
      steps.push(`Step ${stepNum}: Since the remainder is 0, the GCF is ${a}`);
    } else {
      steps.push(`Step 1: Find GCF of first two numbers: ${inputNumbers[0]} and ${inputNumbers[1]}`);
      let currentGCF = calculateGCF(inputNumbers[0], inputNumbers[1]);
      steps.push(`Step 2: GCF(${inputNumbers[0]}, ${inputNumbers[1]}) = ${currentGCF}`);
      
      for (let i = 2; i < inputNumbers.length; i++) {
        const prevGCF = currentGCF;
        currentGCF = calculateGCF(currentGCF, inputNumbers[i]);
        steps.push(`Step ${i + 1}: GCF(${prevGCF}, ${inputNumbers[i]}) = ${currentGCF}`);
      }
    }

    setResult({
      gcf,
      numbers: inputNumbers,
      factors,
      explanation,
      steps,
      primeFactors
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
      <Card className="max-w-4xl mx-auto">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">GCF Calculator - Greatest Common Factor</h2>
            <p className="text-gray-600 mb-6">Find the greatest common factor of two or more numbers using the Euclidean algorithm:</p>
          </>
        )}
      
        <div className="space-y-6">
          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Numbers</h3>
            <Input
              label="Numbers (separated by commas or spaces)"
              type="text"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              placeholder="e.g., 12, 18, 24 or 12 18 24"
              autoFocus
            />
            <p className="text-sm text-gray-600 mt-2">
              <strong>Note:</strong> Enter 2-10 positive integers separated by commas or spaces
            </p>
          </div>

          <Button 
            onClick={calculateGCFResult}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate GCF
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
                GCF Calculation Result
              </h3>
              <div className="space-y-4 text-sm">
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Greatest Common Factor:</p>
                  <p className="font-mono text-3xl font-bold text-center text-green-600">{result.gcf}</p>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Numbers:</p>
                  <p className="font-mono text-lg text-center">{result.numbers.join(', ')}</p>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-2">Explanation:</p>
                  <p className="text-gray-800">{result.explanation}</p>
                </div>

                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-gray-700 mb-3">Step-by-Step Calculation:</p>
                  <div className="space-y-2">
                    {result.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-mono">
                          {index + 1}
                        </span>
                        <p className="font-mono text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <p className="font-semibold text-gray-700 mb-3">Factors of Each Number:</p>
                    <div className="space-y-2">
                      {result.numbers.map(num => (
                        <div key={num} className="text-sm">
                          <span className="font-semibold">{num}:</span>
                          <span className="ml-2 font-mono">
                            {result.factors[num].join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border">
                    <p className="font-semibold text-gray-700 mb-3">Prime Factorization:</p>
                    <div className="space-y-2">
                      {result.numbers.map(num => (
                        <div key={num} className="text-sm">
                          <span className="font-semibold">{num}:</span>
                          <span className="ml-2 font-mono">
                            {result.primeFactors[num].join(' × ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <p className="font-semibold text-green-800 mb-2">Verification:</p>
                  <p className="text-green-700 text-sm">
                    All numbers are divisible by {result.gcf}: {' '}
                    {result.numbers.map(num => `${num} ÷ ${result.gcf} = ${num / result.gcf}`).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
