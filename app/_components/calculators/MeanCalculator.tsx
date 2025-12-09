'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface MeanCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function MeanCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: MeanCalculatorProps) {
  const [meanType, setMeanType] = useState<'arithmetic' | 'geometric' | 'harmonic' | 'rms' | 'weighted'>('arithmetic');
  const [numbers, setNumbers] = useState<string>('');
  const [weights, setWeights] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [calculation, setCalculation] = useState<string>('');
  const [sum, setSum] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return '∞';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(6);
    }
    return value.toFixed(6);
  };

  const calculateMean = () => {
    const numberArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numberArray.length === 0) {
      alert('Please enter at least one valid number separated by commas.');
      setResult(null);
      setCalculation('');
      setSum(null);
      setCount(null);
      return;
    }

    const numberCount = numberArray.length;
    let mean = 0;
    let calculationString = '';
    let totalSum = 0;

    switch (meanType) {
      case 'arithmetic':
        totalSum = numberArray.reduce((acc, num) => acc + num, 0);
        mean = totalSum / numberCount;
        calculationString = `Arithmetic Mean = (${numberArray.join(' + ')}) / ${numberCount} = ${formatValue(totalSum)} / ${numberCount} = ${formatValue(mean)}`;
        setSum(totalSum);
        break;

      case 'geometric':
        if (numberArray.some(n => n <= 0)) {
          alert('Geometric mean requires all positive numbers.');
          setResult(null);
          setCalculation('');
          setSum(null);
          setCount(null);
          return;
        }
        const product = numberArray.reduce((acc, num) => acc * num, 1);
        mean = Math.pow(product, 1 / numberCount);
        calculationString = `Geometric Mean = (${numberArray.join(' × ')})^(1/${numberCount}) = ${formatValue(product)}^(1/${numberCount}) = ${formatValue(mean)}`;
        setSum(product);
        break;

      case 'harmonic':
        if (numberArray.some(n => n <= 0)) {
          alert('Harmonic mean requires all positive numbers.');
          setResult(null);
          setCalculation('');
          setSum(null);
          setCount(null);
          return;
        }
        const reciprocalSum = numberArray.reduce((acc, num) => acc + (1 / num), 0);
        mean = numberCount / reciprocalSum;
        calculationString = `Harmonic Mean = ${numberCount} / (${numberArray.map(n => `1/${n}`).join(' + ')}) = ${numberCount} / ${formatValue(reciprocalSum)} = ${formatValue(mean)}`;
        setSum(reciprocalSum);
        break;

      case 'rms':
        const sumOfSquares = numberArray.reduce((acc, num) => acc + (num * num), 0);
        const meanOfSquares = sumOfSquares / numberCount;
        mean = Math.sqrt(meanOfSquares);
        calculationString = `RMS Mean = √[(${numberArray.map(n => `${n}²`).join(' + ')}) / ${numberCount}] = √[${formatValue(sumOfSquares)} / ${numberCount}] = √${formatValue(meanOfSquares)} = ${formatValue(mean)}`;
        setSum(sumOfSquares);
        break;

      case 'weighted':
        const weightArray = weights.split(',').map(w => parseFloat(w.trim())).filter(w => !isNaN(w));
        
        if (weightArray.length !== numberArray.length) {
          alert('Number of weights must match the number of values.');
          setResult(null);
          setCalculation('');
          setSum(null);
          setCount(null);
          return;
        }

        if (weightArray.some(w => w < 0)) {
          alert('Weights must be non-negative.');
          setResult(null);
          setCalculation('');
          setSum(null);
          setCount(null);
          return;
        }

        const weightedSum = numberArray.reduce((acc, num, index) => acc + (num * weightArray[index]), 0);
        const totalWeight = weightArray.reduce((acc, weight) => acc + weight, 0);
        mean = weightedSum / totalWeight;
        
        const weightedTerms = numberArray.map((num, index) => `${num} × ${weightArray[index]}`).join(' + ');
        calculationString = `Weighted Mean = (${weightedTerms}) / ${formatValue(totalWeight)} = ${formatValue(weightedSum)} / ${formatValue(totalWeight)} = ${formatValue(mean)}`;
        setSum(weightedSum);
        break;
    }
    
    setResult(mean);
    setCalculation(calculationString);
    setCount(numberCount);
  };

  const handleInputChange = (value: string) => {
    setNumbers(value);
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
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mean Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate different types of mean: arithmetic, geometric, harmonic, RMS, and weighted mean:</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          {/* Mean Type Selection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Mean Type</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'arithmetic', label: 'Arithmetic Mean' },
                { value: 'geometric', label: 'Geometric Mean' },
                { value: 'harmonic', label: 'Harmonic Mean' },
                { value: 'rms', label: 'Root Mean Square (RMS)' },
                { value: 'weighted', label: 'Weighted Mean' }
              ].map((type) => (
                <Button
                  key={type.value}
                  onClick={() => setMeanType(type.value as typeof meanType)}
                  variant={meanType === type.value ? "primary" : "outline"}
                  size="sm"
                  className={`text-sm ${meanType === type.value ? 'bg-[#820ECC] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Numbers</h3>
            <div className="space-y-4">
              <Input
                label="Numbers (comma-separated)"
                type="text"
                value={numbers}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="e.g., 10, 20, 30, 40, 50"
                autoFocus
              />
              {meanType === 'weighted' && (
                <Input
                  label="Weights (comma-separated)"
                  type="text"
                  value={weights}
                  onChange={(e) => setWeights(e.target.value)}
                  placeholder="e.g., 1, 2, 3, 4, 5"
                />
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {meanType === 'arithmetic' && 'Enter numbers separated by commas (e.g., 10, 20, 30)'}
              {meanType === 'geometric' && 'Enter positive numbers separated by commas (e.g., 2, 8, 32)'}
              {meanType === 'harmonic' && 'Enter positive numbers separated by commas (e.g., 2, 3, 6)'}
              {meanType === 'rms' && 'Enter numbers separated by commas (e.g., 3, 4, 5)'}
              {meanType === 'weighted' && 'Enter numbers and their corresponding weights separated by commas'}
            </p>
          </div>

          <Button 
            onClick={calculateMean}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate Mean
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
              Mean Result
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Mean:</span>
                      <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">Type:</span>
                      <span className="font-mono font-bold text-lg text-gray-900">
                        {meanType === 'arithmetic' && 'Arithmetic Mean'}
                        {meanType === 'geometric' && 'Geometric Mean'}
                        {meanType === 'harmonic' && 'Harmonic Mean'}
                        {meanType === 'rms' && 'Root Mean Square'}
                        {meanType === 'weighted' && 'Weighted Mean'}
                      </span>
                    </div>
                    {sum !== null && meanType !== 'weighted' && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">
                          {meanType === 'arithmetic' && 'Sum:'}
                          {meanType === 'geometric' && 'Product:'}
                          {meanType === 'harmonic' && 'Sum of Reciprocals:'}
                          {meanType === 'rms' && 'Sum of Squares:'}
                        </span>
                        <span className="font-mono font-bold text-lg text-gray-900">{formatValue(sum)}</span>
                      </div>
                    )}
                    {count !== null && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Count:</span>
                        <span className="font-mono font-bold text-lg text-gray-900">{count}</span>
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
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Enter numbers separated by commas to calculate the mean</p>
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

