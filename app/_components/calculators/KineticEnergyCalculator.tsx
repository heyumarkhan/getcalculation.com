'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: J, kg, m/s)
const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 },
  'BTU': { name: 'BTU', factor: 1055.06 },
  'eV': { name: 'eV (Electron-volts)', factor: 1.602176634e-19 },
  'Wh': { name: 'Wh (Watt-hours)', factor: 3600 },
  'kWh': { name: 'kWh (Kilowatt-hours)', factor: 3600000 }
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

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'in/s': { name: 'in/s (Inches per second)', factor: 0.0254 },
  'cm/s': { name: 'cm/s (Centimeters per second)', factor: 0.01 },
  'mm/s': { name: 'mm/s (Millimeters per second)', factor: 0.001 },
  'mi/h': { name: 'mi/h (Miles per hour)', factor: 0.44704 },
  'knot': { name: 'knot (Nautical miles per hour)', factor: 0.514444 }
};

export default function KineticEnergyCalculator() {
  const [kineticEnergy, setKineticEnergy] = useState('');
  const [mass, setMass] = useState('');
  const [velocity, setVelocity] = useState('');
  const [energyUnit, setEnergyUnit] = useState('J');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'energy' | 'mass' | 'velocity' } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

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

  const convertEnergyToBase = (value: number, unit: string) => {
    return value * energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertEnergyFromBase = (value: number, unit: string) => {
    return value / energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string) => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string) => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const ke = kineticEnergy ? parseFloat(kineticEnergy) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;

    // Count how many values are filled
    const filledCount = [kineticEnergy, mass, velocity].filter(val => val !== '').length;

    if (filledCount < 2) {
      setError('Please enter at least two values (leave one empty to calculate it)');
      return;
    }

    if (filledCount > 2) {
      setError('Please enter exactly two values (leave one empty to calculate it)');
      return;
    }

    // Validate that filled values are valid numbers
    if (kineticEnergy && (isNaN(ke) || ke < 0)) {
      setError('Please enter a valid non-negative number for kinetic energy');
      return;
    }
    if (mass && (isNaN(m) || m <= 0)) {
      setError('Please enter a valid positive number for mass');
      return;
    }
    if (velocity && (isNaN(v) || v < 0)) {
      setError('Please enter a valid non-negative number for velocity');
      return;
    }

    // Convert to base units for calculation
    if (!kineticEnergy) {
      // Calculate kinetic energy: KE = ½mv²
      const massBase = convertMassToBase(m, massUnit);
      const velocityBase = convertVelocityToBase(v, velocityUnit);
      const keBase = 0.5 * massBase * velocityBase * velocityBase;
      const keResult = convertEnergyFromBase(keBase, energyUnit);

      setResult({ value: keResult, unit: energyUnit, type: 'energy' });
      setCalculation(`KE = ½ × m × v²\nKE = ½ × ${formatValue(m)} ${massUnit} × (${formatValue(v)} ${velocityUnit})²\nKE = ½ × ${formatValue(massBase)} kg × (${formatValue(velocityBase)} m/s)²\nKE = ${formatValue(keBase)} J = ${formatValue(keResult)} ${energyUnit}`);
    } else if (!mass) {
      // Calculate mass: m = 2KE / v²
      const keBase = convertEnergyToBase(ke, energyUnit);
      const velocityBase = convertVelocityToBase(v, velocityUnit);

      if (velocityBase === 0) {
        setError('Velocity cannot be zero when calculating mass from kinetic energy');
        return;
      }

      const massBase = (2 * keBase) / (velocityBase * velocityBase);
      const massResult = convertMassFromBase(massBase, massUnit);

      setResult({ value: massResult, unit: massUnit, type: 'mass' });
      setCalculation(`m = 2KE / v²\nm = 2 × ${formatValue(ke)} ${energyUnit} / (${formatValue(v)} ${velocityUnit})²\nm = 2 × ${formatValue(keBase)} J / (${formatValue(velocityBase)} m/s)²\nm = ${formatValue(massBase)} kg = ${formatValue(massResult)} ${massUnit}`);
    } else if (!velocity) {
      // Calculate velocity: v = √(2KE / m)
      const keBase = convertEnergyToBase(ke, energyUnit);
      const massBase = convertMassToBase(m, massUnit);

      if (massBase === 0) {
        setError('Mass cannot be zero when calculating velocity from kinetic energy');
        return;
      }

      const velocityBase = Math.sqrt((2 * keBase) / massBase);
      const velocityResult = convertVelocityFromBase(velocityBase, velocityUnit);

      setResult({ value: velocityResult, unit: velocityUnit, type: 'velocity' });
      setCalculation(`v = √(2KE / m)\nv = √(2 × ${formatValue(ke)} ${energyUnit} / ${formatValue(m)} ${massUnit})\nv = √(2 × ${formatValue(keBase)} J / ${formatValue(massBase)} kg)\nv = √(${formatValue(2 * keBase / massBase)} m²/s²)\nv = ${formatValue(velocityBase)} m/s = ${formatValue(velocityResult)} ${velocityUnit}`);
    }
  };

  const clearAll = () => {
    setKineticEnergy('');
    setMass('');
    setVelocity('');
    setEnergyUnit('J');
    setMassUnit('kg');
    setVelocityUnit('m/s');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Kinetic Energy Calculator</h2>
        <p className="text-gray-600">Calculate kinetic energy, mass, or velocity using the formula: KE = ½mv²</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">KE = ½ × m × v²</p>
          <p className="text-xs text-gray-500 mt-1">
            Where: KE = kinetic energy, m = mass, v = velocity
          </p>
        </div>

        {/* Kinetic Energy Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Kinetic Energy (KE)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter kinetic energy (leave empty to calculate)"
                value={kineticEnergy}
                onChange={(e) => setKineticEnergy(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={energyUnit}
                onChange={(e) => setEnergyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(energyUnits).map(([key, unit]) => (
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Velocity (v)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter velocity (leave empty to calculate)"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={velocityUnit}
                onChange={(e) => setVelocityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(velocityUnits).map(([key, unit]) => (
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

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <div className="mt-4 pt-4 border-t border-[#820ECC]/30">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Calculation Steps:</p>
                <p className="text-sm text-[#820ECC]/80 font-mono whitespace-pre-line break-words">
                  {calculation}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter any two values to calculate the third (KE, m, or v)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: KE = ½ × m × v²</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values should be non-negative (mass and velocity must be positive)</li>
            <li>• Kinetic energy increases quadratically with velocity (double speed = 4x energy)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

