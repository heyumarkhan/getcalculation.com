'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface ErrorFunctionCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

type CalculationMode = 'erf' | 'erf-inverse' | 'erfc' | 'erfc-inverse';

export default function ErrorFunctionCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: ErrorFunctionCalculatorProps) {
  const [value, setValue] = useState<string>('');
  const [mode, setMode] = useState<CalculationMode>('erf');
  const [result, setResult] = useState<number | null>(null);
  const [complementaryResult, setComplementaryResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  // Error function approximation using Abramowitz and Stegun formula
  // This is accurate to about 7 decimal places
  const erf = (x: number): number => {
    // Handle special cases
    if (x === 0) return 0;
    if (x === Infinity) return 1;
    if (x === -Infinity) return -1;
    
    const sign = x >= 0 ? 1 : -1;
    const absX = Math.abs(x);
    
    // For large values, erf approaches ±1
    if (absX > 6) {
      return sign;
    }
    
    // Constants for the approximation
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    
    // A&S formula 7.1.26
    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
    
    return sign * y;
  };

  // Complementary error function: erfc(x) = 1 - erf(x)
  const erfc = (x: number): number => {
    return 1 - erf(x);
  };

  // Derivative of error function: d/dx erf(x) = (2/√π) e^(-x²)
  const erfDerivative = (x: number): number => {
    return (2 / Math.sqrt(Math.PI)) * Math.exp(-x * x);
  };

  // Inverse error function using Newton-Raphson method
  const erfInverse = (y: number): number => {
    // Domain: y must be in (-1, 1)
    if (y <= -1 || y >= 1) {
      throw new Error('Inverse error function is only defined for values in (-1, 1)');
    }
    
    if (y === 0) return 0;
    
    // Initial guess using approximation
    let x = 0;
    if (Math.abs(y) < 0.9) {
      // Use series approximation for initial guess
      const sqrtPi = Math.sqrt(Math.PI);
      x = y * sqrtPi / 2;
    } else {
      // For values close to ±1, use asymptotic approximation
      const sign = y >= 0 ? 1 : -1;
      const absY = Math.abs(y);
      const w = -Math.log((1 - absY) * Math.sqrt(Math.PI));
      x = sign * Math.sqrt(w - Math.log(w) - Math.log(2));
    }
    
    // Newton-Raphson iteration
    const maxIterations = 50;
    const tolerance = 1e-10;
    
    for (let i = 0; i < maxIterations; i++) {
      const fx = erf(x) - y;
      const fpx = erfDerivative(x);
      
      if (Math.abs(fx) < tolerance) {
        break;
      }
      
      if (Math.abs(fpx) < 1e-15) {
        throw new Error('Convergence failed: derivative too small');
      }
      
      x = x - fx / fpx;
      
      // Prevent overflow
      if (Math.abs(x) > 10) {
        x = x > 0 ? 10 : -10;
      }
    }
    
    return x;
  };

  // Inverse complementary error function: erfc⁻¹(y) = erf⁻¹(1 - y)
  const erfcInverse = (y: number): number => {
    // Domain: y must be in (0, 2)
    if (y <= 0 || y >= 2) {
      throw new Error('Inverse complementary error function is only defined for values in (0, 2)');
    }
    
    return erfInverse(1 - y);
  };

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity) {
      return value > 0 ? '∞' : '-∞';
    }
    if (isNaN(value)) {
      return 'NaN';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(6);
    }
    return value.toFixed(8);
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setComplementaryResult(null);
    
    const inputValue = parseFloat(value);
    
    if (isNaN(inputValue)) {
      setError('Please enter a valid number');
      return;
    }

    try {
      switch (mode) {
        case 'erf':
          const erfValue = erf(inputValue);
          const erfcValue = erfc(inputValue);
          setResult(erfValue);
          setComplementaryResult(erfcValue);
          break;
          
        case 'erf-inverse':
          if (inputValue <= -1 || inputValue >= 1) {
            setError('Inverse error function is only defined for values in (-1, 1)');
            return;
          }
          const erfInvValue = erfInverse(inputValue);
          setResult(erfInvValue);
          // Verify: calculate erf of the result
          const verifyErf = erf(erfInvValue);
          setComplementaryResult(verifyErf);
          break;
          
        case 'erfc':
          const erfcCalcValue = erfc(inputValue);
          const erfFromErfc = erf(inputValue);
          setResult(erfcCalcValue);
          setComplementaryResult(erfFromErfc);
          break;
          
        case 'erfc-inverse':
          if (inputValue <= 0 || inputValue >= 2) {
            setError('Inverse complementary error function is only defined for values in (0, 2)');
            return;
          }
          const erfcInvValue = erfcInverse(inputValue);
          setResult(erfcInvValue);
          // Verify: calculate erfc of the result
          const verifyErfc = erfc(erfcInvValue);
          setComplementaryResult(verifyErfc);
          break;
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred during calculation');
    }
  };

  const handleInputChange = (value: string) => {
    setValue(value);
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

  const getModeDescription = () => {
    switch (mode) {
      case 'erf':
        return 'Calculate error function (erf) and complementary error function (erfc)';
      case 'erf-inverse':
        return 'Calculate inverse error function (erf⁻¹). Input must be in (-1, 1)';
      case 'erfc':
        return 'Calculate complementary error function (erfc) and error function (erf)';
      case 'erfc-inverse':
        return 'Calculate inverse complementary error function (erfc⁻¹). Input must be in (0, 2)';
    }
  };

  const getInputLabel = () => {
    switch (mode) {
      case 'erf':
        return 'Value (x)';
      case 'erf-inverse':
        return 'Value (y, where y = erf(x))';
      case 'erfc':
        return 'Value (x)';
      case 'erfc-inverse':
        return 'Value (y, where y = erfc(x))';
    }
  };

  const getResultLabels = () => {
    switch (mode) {
      case 'erf':
        return { primary: 'erf(x)', secondary: 'erfc(x)' };
      case 'erf-inverse':
        return { primary: 'erf⁻¹(y) = x', secondary: 'Verification: erf(x)' };
      case 'erfc':
        return { primary: 'erfc(x)', secondary: 'erf(x)' };
      case 'erfc-inverse':
        return { primary: 'erfc⁻¹(y) = x', secondary: 'Verification: erfc(x)' };
    }
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
      <div className="w-full">
        {showTitle && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Function Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate error function (erf), inverse error function (erf⁻¹), complementary error function (erfc), and inverse complementary error function (erfc⁻¹):</p>
          </>
        )}
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
        {/* Calculator Form - Left Side */}
        <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Calculation Mode</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="erf"
                  checked={mode === 'erf'}
                  onChange={(e) => setMode(e.target.value as CalculationMode)}
                  className="mr-2"
                />
                <span className="text-sm">erf(x) and erfc(x)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="erf-inverse"
                  checked={mode === 'erf-inverse'}
                  onChange={(e) => setMode(e.target.value as CalculationMode)}
                  className="mr-2"
                />
                <span className="text-sm">erf⁻¹(y)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="erfc"
                  checked={mode === 'erfc'}
                  onChange={(e) => setMode(e.target.value as CalculationMode)}
                  className="mr-2"
                />
                <span className="text-sm">erfc(x) and erf(x)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="erfc-inverse"
                  checked={mode === 'erfc-inverse'}
                  onChange={(e) => setMode(e.target.value as CalculationMode)}
                  className="mr-2"
                />
                <span className="text-sm">erfc⁻¹(y)</span>
              </label>
            </div>
            <p className="text-xs text-gray-600 mt-3">{getModeDescription()}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Formulas</h3>
            <p className="text-xs text-gray-600 mb-1">erf(x) = (2/√π) ∫₀ˣ e^(-t²) dt</p>
            <p className="text-xs text-gray-600 mb-1">erfc(x) = 1 - erf(x)</p>
            <p className="text-xs text-gray-600">erf⁻¹ and erfc⁻¹ are computed using Newton-Raphson method</p>
          </div>

          <Input
            label={getInputLabel()}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter a number"
            autoFocus
          />

          <Button 
            onClick={calculate}
            className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
            style={colors.customStyles?.button}
            size="lg"
          >
            Calculate
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 font-medium text-sm">{error}</p>
            </div>
          )}
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
              Results
            </h3>
            
            {result !== null ? (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-lg border p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-lg">{getResultLabels().primary}:</span>
                      <span 
                        className={`font-mono font-bold text-xl ${colors.result}`}
                        style={colors.customStyles?.result}
                      >
                        {formatValue(result)}
                      </span>
                    </div>
                    {complementaryResult !== null && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">{getResultLabels().secondary}:</span>
                        <span 
                          className={`font-mono font-bold text-xl ${colors.result}`}
                          style={colors.customStyles?.result}
                        >
                          {formatValue(complementaryResult)}
                        </span>
                      </div>
                    )}
                    {(mode === 'erf' || mode === 'erfc') && complementaryResult !== null && (
                      <div className="pt-2">
                        <span className="font-medium text-gray-700 text-sm block mb-2">Verification:</span>
                        <p className="text-xs text-gray-600 font-mono">
                          erf({value}) + erfc({value}) = {formatValue(mode === 'erf' ? result : complementaryResult)} + {formatValue(mode === 'erf' ? complementaryResult : result)} = {formatValue(result + complementaryResult)}
                        </p>
                      </div>
                    )}
                    {(mode === 'erf-inverse' || mode === 'erfc-inverse') && complementaryResult !== null && (
                      <div className="pt-2">
                        <span className="font-medium text-gray-700 text-sm block mb-2">Verification:</span>
                        <p className="text-xs text-gray-600 font-mono">
                          {mode === 'erf-inverse' ? `erf(${formatValue(result)})` : `erfc(${formatValue(result)})`} = {formatValue(complementaryResult)} ≈ {value}
                        </p>
                      </div>
                    )}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <strong>Note:</strong> {mode === 'erf' || mode === 'erfc' 
                          ? 'The error function is an odd function: erf(-x) = -erf(x). The complementary error function erfc(x) = 1 - erf(x) is commonly used in probability and statistics.'
                          : 'Inverse functions are computed using the Newton-Raphson numerical method for high precision.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                  <p className="text-sm">Select a mode and enter a value to calculate</p>
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
