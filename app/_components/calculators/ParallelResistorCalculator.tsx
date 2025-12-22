'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function ParallelResistorCalculator() {
  const [resistors, setResistors] = useState<string[]>(['', '']);
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
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
    const validResistors = resistors
      .map(r => parseFloat(r))
      .filter(r => !isNaN(r) && r > 0);

    if (validResistors.length < 2) {
      setResult(null);
      setCalculation('Error: Please enter at least two valid resistor values (positive numbers)');
      return;
    }

    // Calculate parallel resistance: 1/R_total = 1/R1 + 1/R2 + ... + 1/Rn
    const reciprocalSum = validResistors.reduce((sum, r) => sum + (1 / r), 0);
    
    if (reciprocalSum === 0) {
      setResult(null);
      setCalculation('Error: Invalid calculation');
      return;
    }

    const totalResistance = 1 / reciprocalSum;

    // Build calculation string
    const resistorValues = validResistors.map(r => formatValue(r));
    const reciprocalParts = validResistors.map(r => `1/${formatValue(r)}`);
    const calculationStr = `1/R_total = ${reciprocalParts.join(' + ')} = ${formatValue(reciprocalSum)} Ω⁻¹\nR_total = 1 / ${formatValue(reciprocalSum)} = ${formatValue(totalResistance)} Ω`;

    // Special case for two resistors
    if (validResistors.length === 2) {
      const [r1, r2] = validResistors;
      const product = r1 * r2;
      const sum = r1 + r2;
      const altCalculation = `R_total = (R₁ × R₂) / (R₁ + R₂) = (${formatValue(r1)} × ${formatValue(r2)}) / (${formatValue(r1)} + ${formatValue(r2)}) = ${formatValue(product)} / ${formatValue(sum)} = ${formatValue(totalResistance)} Ω`;
      setCalculation(altCalculation);
    } else {
      setCalculation(calculationStr);
    }

    setResult({ value: totalResistance, unit: 'Ω' });
  };

  const addResistor = () => {
    setResistors([...resistors, '']);
  };

  const removeResistor = (index: number) => {
    if (resistors.length > 2) {
      const newResistors = resistors.filter((_, i) => i !== index);
      setResistors(newResistors);
      setResult(null);
      setCalculation('');
    }
  };

  const updateResistor = (index: number, value: string) => {
    const newResistors = [...resistors];
    newResistors[index] = value;
    setResistors(newResistors);
    setResult(null);
    setCalculation('');
  };

  const clearAll = () => {
    setResistors(['', '']);
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Parallel Resistor Calculator</h2>
        <p className="text-gray-600">Calculate equivalent resistance for resistors in parallel</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            1/R_total = 1/R₁ + 1/R₂ + ... + 1/Rₙ
          </p>
          <p className="text-xs text-gray-500 mt-1">
            For two resistors: R_total = (R₁ × R₂) / (R₁ + R₂)
          </p>
        </div>

        {/* Resistor Inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Resistor Values (Ω)
          </label>
          <div className="space-y-3">
            {resistors.map((resistor, index) => (
              <div key={index} className="flex gap-3 items-center">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder={`Resistor ${index + 1} (Ω)`}
                    value={resistor}
                    onChange={(e) => updateResistor(index, e.target.value)}
                    className="w-full"
                    autoFocus={index === 0}
                  />
                </div>
                {resistors.length > 2 && (
                  <Button
                    onClick={() => removeResistor(index)}
                    variant="outline"
                    className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button
            onClick={addResistor}
            variant="outline"
            className="mt-3 w-full"
          >
            + Add Another Resistor
          </Button>
        </div>

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
              Equivalent Parallel Resistance
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
            <li>• Enter the resistance values (in ohms) for each resistor in parallel</li>
            <li>• You need at least two resistors to calculate parallel resistance</li>
            <li>• Click &quot;+ Add Another Resistor&quot; to add more resistors</li>
            <li>• Formula: 1/R_total = 1/R₁ + 1/R₂ + ... + 1/Rₙ</li>
            <li>• For two resistors: R_total = (R₁ × R₂) / (R₁ + R₂)</li>
            <li>• Parallel resistance is always less than the smallest individual resistor</li>
            <li>• All values should be positive numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

