'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: N)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'oz': { name: 'oz (Ounce-force)', factor: 0.278014 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
};

export default function FrictionCalculator() {
  const [frictionForce, setFrictionForce] = useState('');
  const [coefficient, setCoefficient] = useState('');
  const [normalForce, setNormalForce] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'friction' | 'coefficient' | 'normal' } | null>(null);
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
    return value.toLocaleString('en-US', { maximumFractionDigits: 6, useGrouping: true });
  };

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const calculate = () => {
    const f = frictionForce ? parseFloat(frictionForce) : NaN;
    const μ = coefficient ? parseFloat(coefficient) : NaN;
    const N = normalForce ? parseFloat(normalForce) : NaN;

    const filledCount = [frictionForce, coefficient, normalForce].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (frictionForce && (isNaN(f) || f < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for friction force');
      return;
    }
    if (coefficient && (isNaN(μ) || μ < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for coefficient of friction');
      return;
    }
    if (normalForce && (isNaN(N) || N <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for normal force');
      return;
    }

    if (!frictionForce && coefficient && normalForce) {
      // Calculate friction force: F_friction = μ × N
      const NBase = convertForceToBase(N, forceUnit);
      const fBase = μ * NBase;
      const fResult = convertForceFromBase(fBase, forceUnit);
      
      setResult({ value: fResult, unit: forceUnit, type: 'friction' });
      setCalculation(`F_friction = μ × N\nF_friction = ${formatValue(μ)} × ${formatValue(N)} ${forceUnit}\nF_friction = ${formatValue(fResult)} ${forceUnit}`);
    } else if (!coefficient && frictionForce && normalForce) {
      // Calculate coefficient: μ = F_friction / N
      const fBase = convertForceToBase(f, forceUnit);
      const NBase = convertForceToBase(N, forceUnit);
      
      if (NBase === 0) {
        setResult(null);
        setCalculation('Error: Normal force cannot be zero');
        return;
      }
      
      const μResult = fBase / NBase;
      
      setResult({ value: μResult, unit: '', type: 'coefficient' });
      setCalculation(`μ = F_friction / N\nμ = ${formatValue(f)} ${forceUnit} / ${formatValue(N)} ${forceUnit}\nμ = ${formatValue(μResult)}`);
    } else if (!normalForce && frictionForce && coefficient) {
      // Calculate normal force: N = F_friction / μ
      const fBase = convertForceToBase(f, forceUnit);
      
      if (μ === 0) {
        setResult(null);
        setCalculation('Error: Coefficient of friction cannot be zero');
        return;
      }
      
      const NBase = fBase / μ;
      const NResult = convertForceFromBase(NBase, forceUnit);
      
      setResult({ value: NResult, unit: forceUnit, type: 'normal' });
      setCalculation(`N = F_friction / μ\nN = ${formatValue(f)} ${forceUnit} / ${formatValue(μ)}\nN = ${formatValue(NResult)} ${forceUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setFrictionForce('');
    setCoefficient('');
    setNormalForce('');
    setForceUnit('N');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Friction Calculator</h2>
        <p className="text-gray-600">Calculate friction force, coefficient of friction, or normal force using F_friction = μ × N</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">F_friction = μ × N</p>
          <p className="text-sm text-gray-600 mt-1">Friction Force = Coefficient of Friction × Normal Force</p>
        </div>

        {/* Friction Force Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Friction Force (F_friction)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter friction force (leave empty to calculate)"
                value={frictionForce}
                onChange={(e) => setFrictionForce(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={forceUnit}
                onChange={(e) => setForceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(forceUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Coefficient of Friction Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Coefficient of Friction (μ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter coefficient of friction (leave empty to calculate)"
                value={coefficient}
                onChange={(e) => setCoefficient(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40 flex items-center justify-center">
              <span className="text-sm text-gray-500">(dimensionless)</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Typical values: Static friction 0.1-1.0, Kinetic friction 0.05-0.8
          </p>
        </div>

        {/* Normal Force Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Normal Force (N)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter normal force (leave empty to calculate)"
                value={normalForce}
                onChange={(e) => setNormalForce(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={forceUnit}
                onChange={(e) => setForceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(forceUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">
              {result.type === 'friction' ? 'Friction Force' : result.type === 'coefficient' ? 'Coefficient of Friction' : 'Normal Force'}
            </h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="mt-3 p-3 bg-white rounded border border-[#820ECC]/20">
                <p className="text-sm text-gray-700 font-mono whitespace-pre-line">
                  {calculation}
                </p>
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
            <li>• Enter any two values to calculate the third (Friction Force, Coefficient, or Normal Force)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: F_friction = μ × N</li>
            <li>• Coefficient of friction (μ) is dimensionless (no units)</li>
            <li>• Select your preferred units for force measurements</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All force values should be non-negative</li>
            <li>• Normal force and coefficient should be positive</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Common Coefficient of Friction Values</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <div>
              <strong>Static Friction:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• Rubber on concrete: 0.6-0.9</li>
                <li>• Steel on steel: 0.6-0.8</li>
                <li>• Wood on wood: 0.25-0.5</li>
                <li>• Ice on ice: 0.1</li>
                <li>• Teflon on Teflon: 0.04</li>
              </ul>
            </div>
            <div>
              <strong>Kinetic Friction:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• Rubber on concrete: 0.5-0.7</li>
                <li>• Steel on steel: 0.4-0.6</li>
                <li>• Wood on wood: 0.2-0.4</li>
                <li>• Ice on ice: 0.03</li>
                <li>• Teflon on Teflon: 0.04</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

