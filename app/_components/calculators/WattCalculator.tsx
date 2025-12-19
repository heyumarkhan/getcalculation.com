'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface WattCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

interface WattResult {
  value: number;
  unit: string;
  label: string;
  formula: string;
  explanation: string;
  steps: string[];
}

export default function WattCalculator({ 
  showTitle = true, 
  primaryColor = '#820ECC' 
}: WattCalculatorProps) {
  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [resistance, setResistance] = useState<string>('');
  const [power, setPower] = useState<string>('');
  const [result, setResult] = useState<WattResult | null>(null);
  const [error, setError] = useState<string>('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001) {
      return '0';
    }
    return value.toFixed(4);
  };

  const calculate = () => {
    setError('');
    setResult(null);

    const v = voltage ? parseFloat(voltage) : NaN;
    const i = current ? parseFloat(current) : NaN;
    const r = resistance ? parseFloat(resistance) : NaN;
    const p = power ? parseFloat(power) : NaN;

    // Validate inputs
    const providedValues = [voltage, current, resistance, power].filter(val => val !== '').length;

    if (providedValues < 2) {
      setError('Please enter at least two values to calculate the missing values.');
      return;
    }

    // Check for invalid numbers
    const values = [v, i, r, p].filter(val => !isNaN(val));
    if (values.some(val => val <= 0 && val !== 0)) {
      setError('All values must be positive numbers.');
      return;
    }

    let calculatedValue: number;
    let unit: string;
    let label: string;
    let formula: string;
    let explanation: string;
    let steps: string[] = [];

    // Calculate Power (P = V × I)
    if (!isNaN(v) && !isNaN(i) && isNaN(p) && isNaN(r)) {
      calculatedValue = v * i;
      unit = 'W';
      label = 'Power';
      formula = 'P = V × I';
      explanation = `The power is calculated by multiplying voltage and current.`;
      steps.push(`Step 1: Identify known values: Voltage = ${v} V, Current = ${i} A`);
      steps.push(`Step 2: Apply formula: P = V × I`);
      steps.push(`Step 3: P = ${v} V × ${i} A = ${calculatedValue.toFixed(2)} W`);
    }
    // Calculate Power (P = V²/R)
    else if (!isNaN(v) && !isNaN(r) && isNaN(p) && isNaN(i)) {
      calculatedValue = (v * v) / r;
      unit = 'W';
      label = 'Power';
      formula = 'P = V²/R';
      explanation = `The power is calculated using voltage squared divided by resistance.`;
      steps.push(`Step 1: Identify known values: Voltage = ${v} V, Resistance = ${r} Ω`);
      steps.push(`Step 2: Apply formula: P = V²/R`);
      steps.push(`Step 3: P = (${v} V)² ÷ ${r} Ω = ${(v * v).toFixed(2)} ÷ ${r} = ${calculatedValue.toFixed(2)} W`);
    }
    // Calculate Power (P = I²R)
    else if (!isNaN(i) && !isNaN(r) && isNaN(p) && isNaN(v)) {
      calculatedValue = i * i * r;
      unit = 'W';
      label = 'Power';
      formula = 'P = I²R';
      explanation = `The power is calculated using current squared multiplied by resistance.`;
      steps.push(`Step 1: Identify known values: Current = ${i} A, Resistance = ${r} Ω`);
      steps.push(`Step 2: Apply formula: P = I²R`);
      steps.push(`Step 3: P = (${i} A)² × ${r} Ω = ${(i * i).toFixed(2)} × ${r} = ${calculatedValue.toFixed(2)} W`);
    }
    // Calculate Voltage (V = P/I)
    else if (!isNaN(p) && !isNaN(i) && isNaN(v) && isNaN(r)) {
      if (i === 0) {
        setError('Current cannot be zero when calculating voltage from power.');
        return;
      }
      calculatedValue = p / i;
      unit = 'V';
      label = 'Voltage';
      formula = 'V = P/I';
      explanation = `The voltage is calculated by dividing power by current.`;
      steps.push(`Step 1: Identify known values: Power = ${p} W, Current = ${i} A`);
      steps.push(`Step 2: Apply formula: V = P/I`);
      steps.push(`Step 3: V = ${p} W ÷ ${i} A = ${calculatedValue.toFixed(2)} V`);
    }
    // Calculate Voltage (V = √(P × R))
    else if (!isNaN(p) && !isNaN(r) && isNaN(v) && isNaN(i)) {
      calculatedValue = Math.sqrt(p * r);
      unit = 'V';
      label = 'Voltage';
      formula = 'V = √(P × R)';
      explanation = `The voltage is calculated using the square root of power times resistance.`;
      steps.push(`Step 1: Identify known values: Power = ${p} W, Resistance = ${r} Ω`);
      steps.push(`Step 2: Apply formula: V = √(P × R)`);
      steps.push(`Step 3: V = √(${p} W × ${r} Ω) = √${(p * r).toFixed(2)} = ${calculatedValue.toFixed(2)} V`);
    }
    // Calculate Current (I = P/V)
    else if (!isNaN(p) && !isNaN(v) && isNaN(i) && isNaN(r)) {
      if (v === 0) {
        setError('Voltage cannot be zero when calculating current from power.');
        return;
      }
      calculatedValue = p / v;
      unit = 'A';
      label = 'Current';
      formula = 'I = P/V';
      explanation = `The current is calculated by dividing power by voltage.`;
      steps.push(`Step 1: Identify known values: Power = ${p} W, Voltage = ${v} V`);
      steps.push(`Step 2: Apply formula: I = P/V`);
      steps.push(`Step 3: I = ${p} W ÷ ${v} V = ${calculatedValue.toFixed(2)} A`);
    }
    // Calculate Current (I = √(P/R))
    else if (!isNaN(p) && !isNaN(r) && isNaN(i) && isNaN(v)) {
      if (r === 0) {
        setError('Resistance cannot be zero when calculating current from power.');
        return;
      }
      calculatedValue = Math.sqrt(p / r);
      unit = 'A';
      label = 'Current';
      formula = 'I = √(P/R)';
      explanation = `The current is calculated using the square root of power divided by resistance.`;
      steps.push(`Step 1: Identify known values: Power = ${p} W, Resistance = ${r} Ω`);
      steps.push(`Step 2: Apply formula: I = √(P/R)`);
      steps.push(`Step 3: I = √(${p} W ÷ ${r} Ω) = √${(p / r).toFixed(2)} = ${calculatedValue.toFixed(2)} A`);
    }
    // Calculate Resistance (R = V²/P)
    else if (!isNaN(v) && !isNaN(p) && isNaN(r) && isNaN(i)) {
      if (p === 0) {
        setError('Power cannot be zero when calculating resistance from voltage.');
        return;
      }
      calculatedValue = (v * v) / p;
      unit = 'Ω';
      label = 'Resistance';
      formula = 'R = V²/P';
      explanation = `The resistance is calculated using voltage squared divided by power.`;
      steps.push(`Step 1: Identify known values: Voltage = ${v} V, Power = ${p} W`);
      steps.push(`Step 2: Apply formula: R = V²/P`);
      steps.push(`Step 3: R = (${v} V)² ÷ ${p} W = ${(v * v).toFixed(2)} ÷ ${p} = ${calculatedValue.toFixed(2)} Ω`);
    }
    // Calculate Resistance (R = P/I²)
    else if (!isNaN(p) && !isNaN(i) && isNaN(r) && isNaN(v)) {
      if (i === 0) {
        setError('Current cannot be zero when calculating resistance from power.');
        return;
      }
      calculatedValue = p / (i * i);
      unit = 'Ω';
      label = 'Resistance';
      formula = 'R = P/I²';
      explanation = `The resistance is calculated by dividing power by current squared.`;
      steps.push(`Step 1: Identify known values: Power = ${p} W, Current = ${i} A`);
      steps.push(`Step 2: Apply formula: R = P/I²`);
      steps.push(`Step 3: R = ${p} W ÷ (${i} A)² = ${p} ÷ ${(i * i).toFixed(2)} = ${calculatedValue.toFixed(2)} Ω`);
    }
    // Calculate Resistance (R = V/I) when we have V, I, and P (verify with P = VI)
    else if (!isNaN(v) && !isNaN(i) && !isNaN(p) && isNaN(r)) {
      const calculatedResistance = v / i;
      const calculatedPower = v * i;
      if (Math.abs(calculatedPower - p) < 0.01) {
        calculatedValue = calculatedResistance;
        unit = 'Ω';
        label = 'Resistance';
        formula = 'R = V/I';
        explanation = `The resistance is calculated using Ohm's Law: R = V/I.`;
        steps.push(`Step 1: Identify known values: Voltage = ${v} V, Current = ${i} A, Power = ${p} W`);
        steps.push(`Step 2: Verify: P = V × I = ${v} × ${i} = ${calculatedPower.toFixed(2)} W ✓`);
        steps.push(`Step 3: Apply Ohm's Law: R = V/I`);
        steps.push(`Step 4: R = ${v} V ÷ ${i} A = ${calculatedValue.toFixed(2)} Ω`);
      } else {
        setError('The provided values do not satisfy P = V × I. Please check your inputs.');
        return;
      }
    }
    // Calculate Voltage (V = I × R) when we have I, R, and P (verify with P = I²R)
    else if (!isNaN(i) && !isNaN(r) && !isNaN(p) && isNaN(v)) {
      const calculatedVoltage = i * r;
      const calculatedPower = i * i * r;
      if (Math.abs(calculatedPower - p) < 0.01) {
        calculatedValue = calculatedVoltage;
        unit = 'V';
        label = 'Voltage';
        formula = 'V = I × R';
        explanation = `The voltage is calculated using Ohm's Law: V = I × R.`;
        steps.push(`Step 1: Identify known values: Current = ${i} A, Resistance = ${r} Ω, Power = ${p} W`);
        steps.push(`Step 2: Verify: P = I²R = (${i})² × ${r} = ${calculatedPower.toFixed(2)} W ✓`);
        steps.push(`Step 3: Apply Ohm's Law: V = I × R`);
        steps.push(`Step 4: V = ${i} A × ${r} Ω = ${calculatedValue.toFixed(2)} V`);
      } else {
        setError('The provided values do not satisfy P = I²R. Please check your inputs.');
        return;
      }
    }
    // Calculate Current (I = V/R) when we have V, R, and P (verify with P = V²/R)
    else if (!isNaN(v) && !isNaN(r) && !isNaN(p) && isNaN(i)) {
      if (r === 0) {
        setError('Resistance cannot be zero when calculating current.');
        return;
      }
      const calculatedCurrent = v / r;
      const calculatedPower = (v * v) / r;
      if (Math.abs(calculatedPower - p) < 0.01) {
        calculatedValue = calculatedCurrent;
        unit = 'A';
        label = 'Current';
        formula = 'I = V/R';
        explanation = `The current is calculated using Ohm's Law: I = V/R.`;
        steps.push(`Step 1: Identify known values: Voltage = ${v} V, Resistance = ${r} Ω, Power = ${p} W`);
        steps.push(`Step 2: Verify: P = V²/R = (${v})² ÷ ${r} = ${calculatedPower.toFixed(2)} W ✓`);
        steps.push(`Step 3: Apply Ohm's Law: I = V/R`);
        steps.push(`Step 4: I = ${v} V ÷ ${r} Ω = ${calculatedValue.toFixed(2)} A`);
      } else {
        setError('The provided values do not satisfy P = V²/R. Please check your inputs.');
        return;
      }
    }
    else {
      setError('Unable to calculate. Please provide exactly two or three values, leaving one empty to calculate.');
      return;
    }

    setResult({
      value: calculatedValue,
      unit,
      label,
      formula,
      explanation,
      steps
    });
  };

  const clearAll = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setResult(null);
    setError('');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Watt Calculator</h2>
            <p className="text-gray-600 mb-6">Calculate electrical power, voltage, current, or resistance using P = V × I, P = V²/R, and P = I²R formulas:</p>
          </>
        )}
      
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0">
          {/* Calculator Form - Left Side */}
          <div className="w-full max-w-lg mx-auto lg:max-w-md lg:mx-0 space-y-4">
            {/* Input Fields */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Enter Values</h3>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Voltage (V)"
                  type="text"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  placeholder="Enter voltage in volts"
                  autoFocus
                />
                <Input
                  label="Current (I)"
                  type="text"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  placeholder="Enter current in amperes"
                />
                <Input
                  label="Resistance (R)"
                  type="text"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  placeholder="Enter resistance in ohms"
                />
                <Input
                  label="Power (P)"
                  type="text"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  placeholder="Enter power in watts"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <strong>Note:</strong> Enter any two or three values, leaving one empty to calculate
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={calculate}
                className={`w-full ${colors.button} ${colors.customStyles ? 'custom-color-button' : ''}`}
                style={colors.customStyles?.button}
                size="lg"
              >
                Calculate
              </Button>
              <Button 
                onClick={clearAll}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Clear
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
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
                Calculation Result
              </h3>
              
              {result !== null ? (
                <div className="animate-fadeIn">
                  <div className="bg-white rounded-lg border p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">{result.label}:</span>
                        <span className="font-mono font-bold text-xl text-gray-900">{formatValue(result.value)} {result.unit}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700 text-lg">Formula:</span>
                        <span className="font-mono font-bold text-lg text-gray-900">{result.formula}</span>
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
                    <div className="text-4xl mb-4">⚡</div>
                    <p className="text-lg font-medium mb-2">Ready to Calculate</p>
                    <p className="text-sm">Enter voltage, current, resistance, or power values to calculate</p>
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
