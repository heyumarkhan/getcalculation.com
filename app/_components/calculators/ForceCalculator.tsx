'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: N, kg, m/s²)
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

const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters per second squared)', factor: 1 },
  'cm/s²': { name: 'cm/s² (Centimeters per second squared)', factor: 0.01 },
  'ft/s²': { name: 'ft/s² (Feet per second squared)', factor: 0.3048 },
  'g': { name: 'g (Standard gravity)', factor: 9.80665 },
  'km/h²': { name: 'km/h²', factor: 0.00007716 }
};

export default function ForceCalculator() {
  const [force, setForce] = useState('');
  const [mass, setMass] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [massUnit, setMassUnit] = useState('kg');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'force' | 'mass' | 'acceleration' } | null>(null);
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

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string) => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertAccelerationToBase = (value: number, unit: string) => {
    return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const convertAccelerationFromBase = (value: number, unit: string) => {
    return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const calculate = () => {
    const f = force ? parseFloat(force) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const a = acceleration ? parseFloat(acceleration) : NaN;

    const filledCount = [force, mass, acceleration].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (force && (isNaN(f) || f <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for force');
      return;
    }
    if (mass && (isNaN(m) || m <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for mass');
      return;
    }
    if (acceleration && (isNaN(a) || a <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for acceleration');
      return;
    }

    // Convert to base units
    if (!force) {
      // Calculate force: F = m × a
      const mBase = convertMassToBase(m, massUnit);
      const aBase = convertAccelerationToBase(a, accelerationUnit);
      const fBase = mBase * aBase;
      const fResult = convertForceFromBase(fBase, forceUnit);
      
      setResult({ value: fResult, unit: forceUnit, type: 'force' });
      setCalculation(`F = m × a = ${formatValue(m)} ${massUnit} × ${formatValue(a)} ${accelerationUnit} = ${formatValue(fResult)} ${forceUnit}`);
    } else if (!mass) {
      // Calculate mass: m = F / a
      const fBase = convertForceToBase(f, forceUnit);
      const aBase = convertAccelerationToBase(a, accelerationUnit);
      
      if (aBase === 0) {
        setResult(null);
        setCalculation('Error: Acceleration cannot be zero');
        return;
      }
      
      const mBase = fBase / aBase;
      const mResult = convertMassFromBase(mBase, massUnit);
      
      setResult({ value: mResult, unit: massUnit, type: 'mass' });
      setCalculation(`m = F / a = ${formatValue(f)} ${forceUnit} / ${formatValue(a)} ${accelerationUnit} = ${formatValue(mResult)} ${massUnit}`);
    } else if (!acceleration) {
      // Calculate acceleration: a = F / m
      const fBase = convertForceToBase(f, forceUnit);
      const mBase = convertMassToBase(m, massUnit);
      
      if (mBase === 0) {
        setResult(null);
        setCalculation('Error: Mass cannot be zero');
        return;
      }
      
      const aBase = fBase / mBase;
      const aResult = convertAccelerationFromBase(aBase, accelerationUnit);
      
      setResult({ value: aResult, unit: accelerationUnit, type: 'acceleration' });
      setCalculation(`a = F / m = ${formatValue(f)} ${forceUnit} / ${formatValue(m)} ${massUnit} = ${formatValue(aResult)} ${accelerationUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setForce('');
    setMass('');
    setAcceleration('');
    setForceUnit('N');
    setMassUnit('kg');
    setAccelerationUnit('m/s²');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Force Calculator</h2>
        <p className="text-gray-600">Calculate force, mass, or acceleration using Newton&apos;s second law: F = m × a</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">F = m × a</p>
          <p className="text-sm text-gray-600 mt-1">Newton&apos;s Second Law of Motion</p>
        </div>

        {/* Force Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Force (F)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter force (leave empty to calculate)"
                value={force}
                onChange={(e) => setForce(e.target.value)}
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

        {/* Acceleration Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Acceleration (a)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter acceleration (leave empty to calculate)"
                value={acceleration}
                onChange={(e) => setAcceleration(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={accelerationUnit}
                onChange={(e) => setAccelerationUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(accelerationUnits).map(([key, unit]) => (
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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-mono break-words">
                {calculation}
              </p>
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
            <li>• Enter any two values to calculate the third (Force, Mass, or Acceleration)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: F = m × a (Newton&apos;s Second Law)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values should be positive numbers</li>
            <li>• This formula applies to objects with constant mass and acceleration</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

