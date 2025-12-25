'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'efficiency' | 'output' | 'input';

export default function EfficiencyCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('efficiency');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    if (Math.abs(value) >= 1000000) {
      return value.toExponential(4);
    }
    return value.toFixed(4).replace(/\.?0+$/, '');
  };

  const calculate = () => {
    const out = output ? parseFloat(output) : NaN;
    const inp = input ? parseFloat(input) : NaN;
    const eff = efficiency ? parseFloat(efficiency) : NaN;

    if (calculationMode === 'efficiency') {
      // Calculate efficiency from output and input
      if (!output || !input) {
        setResult(null);
        setCalculation('Error: Please enter both output and input values');
        return;
      }

      if (isNaN(out) || out < 0) {
        setResult(null);
        setCalculation('Error: Output must be a valid positive number');
        return;
      }
      if (isNaN(inp) || inp <= 0) {
        setResult(null);
        setCalculation('Error: Input must be a valid positive number greater than zero');
        return;
      }

      const calculatedEfficiency = (out / inp) * 100;
      
      if (calculatedEfficiency > 100) {
        setResult(null);
        setCalculation('Error: Output cannot be greater than input. Efficiency cannot exceed 100%');
        return;
      }

      setResult({ value: calculatedEfficiency, unit: '%', label: 'Efficiency' });
      setCalculation(`Efficiency = (Output ÷ Input) × 100%\nEfficiency = (${formatValue(out)} ÷ ${formatValue(inp)}) × 100%\nEfficiency = ${formatValue(out / inp)} × 100%\nEfficiency = ${formatValue(calculatedEfficiency)}%`);
    } else if (calculationMode === 'output') {
      // Calculate output from input and efficiency
      if (!input || !efficiency) {
        setResult(null);
        setCalculation('Error: Please enter both input and efficiency values');
        return;
      }

      if (isNaN(inp) || inp <= 0) {
        setResult(null);
        setCalculation('Error: Input must be a valid positive number greater than zero');
        return;
      }
      if (isNaN(eff) || eff < 0 || eff > 100) {
        setResult(null);
        setCalculation('Error: Efficiency must be between 0 and 100');
        return;
      }

      const calculatedOutput = (inp * eff) / 100;
      setResult({ value: calculatedOutput, unit: '', label: 'Output' });
      setCalculation(`Output = (Input × Efficiency) ÷ 100%\nOutput = (${formatValue(inp)} × ${formatValue(eff)}%) ÷ 100%\nOutput = ${formatValue(inp * eff)} ÷ 100\nOutput = ${formatValue(calculatedOutput)}`);
    } else if (calculationMode === 'input') {
      // Calculate input from output and efficiency
      if (!output || !efficiency) {
        setResult(null);
        setCalculation('Error: Please enter both output and efficiency values');
        return;
      }

      if (isNaN(out) || out < 0) {
        setResult(null);
        setCalculation('Error: Output must be a valid positive number');
        return;
      }
      if (isNaN(eff) || eff <= 0 || eff > 100) {
        setResult(null);
        setCalculation('Error: Efficiency must be between 0 and 100 (cannot be zero)');
        return;
      }

      const calculatedInput = (out * 100) / eff;
      setResult({ value: calculatedInput, unit: '', label: 'Input' });
      setCalculation(`Input = (Output × 100%) ÷ Efficiency\nInput = (${formatValue(out)} × 100%) ÷ ${formatValue(eff)}%\nInput = ${formatValue(out * 100)} ÷ ${formatValue(eff)}\nInput = ${formatValue(calculatedInput)}`);
    }
  };

  const clearAll = () => {
    setOutput('');
    setInput('');
    setEfficiency('');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Efficiency Calculator</h2>
        <p className="text-gray-600">Calculate efficiency, output, or input for any system or process</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="efficiency">Calculate Efficiency</option>
            <option value="output">Calculate Output</option>
            <option value="input">Calculate Input</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            {calculationMode === 'efficiency' && 'Efficiency = (Output ÷ Input) × 100%'}
            {calculationMode === 'output' && 'Output = (Input × Efficiency) ÷ 100%'}
            {calculationMode === 'input' && 'Input = (Output × 100%) ÷ Efficiency'}
          </p>
        </div>

        {/* Output Input */}
        {(calculationMode === 'efficiency' || calculationMode === 'input') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Useful Output
            </label>
            <Input
              type="text"
              placeholder="Enter output value (energy, power, work, etc.)"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              The useful output produced by the system
            </p>
          </div>
        )}

        {/* Input Field */}
        {(calculationMode === 'efficiency' || calculationMode === 'output') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Total Input
            </label>
            <Input
              type="text"
              placeholder="Enter input value (energy, power, work, etc.)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              The total energy/power/work put into the system
            </p>
          </div>
        )}

        {/* Efficiency Input */}
        {(calculationMode === 'output' || calculationMode === 'input') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Efficiency (%)
            </label>
            <Input
              type="text"
              placeholder="Enter efficiency as percentage (0-100)"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Efficiency as a percentage (0% to 100%)
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm text-[#820ECC]/80 mt-1">
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm text-[#820ECC]/80 mt-3 font-mono whitespace-pre-line">
                {calculation}
              </div>
            )}
          </div>
        )}

        {calculation && calculation.startsWith('Error:') && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{calculation}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationMode === 'efficiency' && (
              <>
                <li>• Enter the useful output and total input values</li>
                <li>• Calculator will determine the efficiency as a percentage</li>
                <li>• Formula: Efficiency = (Output ÷ Input) × 100%</li>
                <li>• Efficiency is always between 0% and 100%</li>
              </>
            )}
            {calculationMode === 'output' && (
              <>
                <li>• Enter the total input and efficiency percentage</li>
                <li>• Calculator will determine the useful output</li>
                <li>• Formula: Output = (Input × Efficiency) ÷ 100%</li>
                <li>• Efficiency should be between 0% and 100%</li>
              </>
            )}
            {calculationMode === 'input' && (
              <>
                <li>• Enter the useful output and efficiency percentage</li>
                <li>• Calculator will determine the required input</li>
                <li>• Formula: Input = (Output × 100%) ÷ Efficiency</li>
                <li>• Efficiency should be between 0% and 100%</li>
              </>
            )}
            <li>• Works with any units (energy, power, work, etc.) as long as output and input use the same units</li>
            <li>• Output cannot exceed input (efficiency cannot be greater than 100%)</li>
            <li>• Useful for calculating efficiency of engines, machines, processes, and systems</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

