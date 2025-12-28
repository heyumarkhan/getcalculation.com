'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Standard gravity constant (m/s²)
const STANDARD_GRAVITY = 9.80665; // m/s²

// Unit conversion factors (all relative to base units: N, kg)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'oz': { name: 'oz (Ounce-force)', factor: 0.278014 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
  'ton': { name: 'ton (Metric tons)', factor: 1000 },
  'ton_us': { name: 'ton (US tons)', factor: 907.185 }
};

export default function KilogramToNewtonsCalculator() {
  const [mass, setMass] = useState('');
  const [force, setForce] = useState('');
  const [massUnit, setMassUnit] = useState('kg');
  const [forceUnit, setForceUnit] = useState('N');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'force' | 'mass' } | null>(null);
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

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string) => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const calculate = () => {
    const m = mass ? parseFloat(mass) : NaN;
    const f = force ? parseFloat(force) : NaN;

    const filledCount = [mass, force].filter(val => val !== '').length;

    if (filledCount !== 1) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (mass && (isNaN(m) || m < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for mass');
      return;
    }
    if (force && (isNaN(f) || f < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for force');
      return;
    }

    if (!force && mass) {
      // Calculate force: F = m × g
      const mBase = convertMassToBase(m, massUnit);
      const fBase = mBase * STANDARD_GRAVITY;
      const fResult = convertForceFromBase(fBase, forceUnit);
      
      setResult({ value: fResult, unit: forceUnit, type: 'force' });
      setCalculation(`F = m × g\nF = ${formatValue(m)} ${massUnit} × ${STANDARD_GRAVITY} m/s²\nF = ${formatValue(fResult)} ${forceUnit}`);
    } else if (!mass && force) {
      // Calculate mass: m = F / g
      const fBase = convertForceToBase(f, forceUnit);
      const mBase = fBase / STANDARD_GRAVITY;
      const mResult = convertMassFromBase(mBase, massUnit);
      
      setResult({ value: mResult, unit: massUnit, type: 'mass' });
      setCalculation(`m = F / g\nm = ${formatValue(f)} ${forceUnit} / ${STANDARD_GRAVITY} m/s²\nm = ${formatValue(mResult)} ${massUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setMass('');
    setForce('');
    setMassUnit('kg');
    setForceUnit('N');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kilogram to Newtons Calculator</h2>
        <p className="text-gray-600">Convert mass to weight (force) using F = m × g</p>
        <p className="text-sm text-gray-500 mt-2">Standard Gravity (g) = {STANDARD_GRAVITY} m/s²</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">F = m × g</p>
          <p className="text-sm text-gray-600 mt-1">Weight = Mass × Gravity</p>
        </div>

        {/* Mass Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass (m)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass (leave empty to calculate)"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(massUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Force Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Force / Weight (F)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter force (leave empty to calculate)"
                value={force}
                onChange={(e) => setForce(e.target.value)}
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
              {result.type === 'force' ? 'Force / Weight' : 'Mass'}
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
            <li>• Enter either mass or force (leave the other empty)</li>
            <li>• The calculator will compute the missing value using F = m × g</li>
            <li>• Standard gravity (g) = {STANDARD_GRAVITY} m/s² (Earth&apos;s surface)</li>
            <li>• Select your preferred units for mass and force</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• This calculates weight (force due to gravity) on Earth&apos;s surface</li>
            <li>• For other planets or locations, use the Force Calculator with custom acceleration</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

