'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: J, kg, m/s)
const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'ft-lb': { name: 'ft-lb (Foot-pounds)', factor: 1.35582 },
  'ft-lbf': { name: 'ft-lbf (Foot-pounds force)', factor: 1.35582 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 }
};

const massUnits = {
  'grain': { name: 'grain (Grains)', factor: 0.0000647989 }, // 1 grain = 64.7989 mg
  'g': { name: 'g (Grams)', factor: 0.001 },
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 }
};

const velocityUnits = {
  'fps': { name: 'fps (Feet per second)', factor: 0.3048 },
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 }
};

export default function BulletEnergyCalculator() {
  const [energy, setEnergy] = useState('');
  const [mass, setMass] = useState('');
  const [velocity, setVelocity] = useState('');
  const [energyUnit, setEnergyUnit] = useState('ft-lb');
  const [massUnit, setMassUnit] = useState('grain');
  const [velocityUnit, setVelocityUnit] = useState('fps');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'energy' | 'mass' | 'velocity' } | null>(null);
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
    const e = energy ? parseFloat(energy) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;

    const filledCount = [energy, mass, velocity].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (energy && (isNaN(e) || e < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for energy');
      return;
    }
    if (mass && (isNaN(m) || m <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for mass');
      return;
    }
    if (velocity && (isNaN(v) || v < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for velocity');
      return;
    }

    if (!energy && mass && velocity) {
      // Calculate energy: E = ½mv²
      const mBase = convertMassToBase(m, massUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const eBase = 0.5 * mBase * vBase * vBase;
      const eResult = convertEnergyFromBase(eBase, energyUnit);
      
      setResult({ value: eResult, unit: energyUnit, type: 'energy' });
      setCalculation(`E = ½ × m × v²\nE = ½ × ${formatValue(m)} ${massUnit} × (${formatValue(v)} ${velocityUnit})²\nE = ½ × ${formatValue(mBase)} kg × (${formatValue(vBase)} m/s)²\nE = ${formatValue(eBase)} J = ${formatValue(eResult)} ${energyUnit}`);
    } else if (!mass && energy && velocity) {
      // Calculate mass: m = 2E / v²
      const eBase = convertEnergyToBase(e, energyUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      
      if (vBase === 0) {
        setResult(null);
        setCalculation('Error: Velocity cannot be zero');
        return;
      }
      
      const mBase = (2 * eBase) / (vBase * vBase);
      const mResult = convertMassFromBase(mBase, massUnit);
      
      setResult({ value: mResult, unit: massUnit, type: 'mass' });
      setCalculation(`m = 2E / v²\nm = 2 × ${formatValue(e)} ${energyUnit} / (${formatValue(v)} ${velocityUnit})²\nm = 2 × ${formatValue(eBase)} J / (${formatValue(vBase)} m/s)²\nm = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnit}`);
    } else if (!velocity && energy && mass) {
      // Calculate velocity: v = √(2E / m)
      const eBase = convertEnergyToBase(e, energyUnit);
      const mBase = convertMassToBase(m, massUnit);
      
      if (mBase === 0) {
        setResult(null);
        setCalculation('Error: Mass cannot be zero');
        return;
      }
      
      const vBase = Math.sqrt((2 * eBase) / mBase);
      const vResult = convertVelocityFromBase(vBase, velocityUnit);
      
      setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
      setCalculation(`v = √(2E / m)\nv = √(2 × ${formatValue(e)} ${energyUnit} / ${formatValue(m)} ${massUnit})\nv = √(2 × ${formatValue(eBase)} J / ${formatValue(mBase)} kg)\nv = ${formatValue(vBase)} m/s = ${formatValue(vResult)} ${velocityUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setEnergy('');
    setMass('');
    setVelocity('');
    setEnergyUnit('ft-lb');
    setMassUnit('grain');
    setVelocityUnit('fps');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bullet Energy Calculator</h2>
        <p className="text-gray-600">Calculate bullet kinetic energy using E = ½mv²</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">E = ½ × m × v²</p>
          <p className="text-sm text-gray-600 mt-1">Kinetic Energy = ½ × Mass × Velocity²</p>
        </div>

        {/* Energy Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Kinetic Energy (E)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter energy (leave empty to calculate)"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={energyUnit}
                onChange={(e) => setEnergyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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
            Bullet Mass (m)
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

        {/* Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Bullet Velocity (v)
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">
              {result.type === 'energy' ? 'Kinetic Energy' : result.type === 'mass' ? 'Bullet Mass' : 'Bullet Velocity'}
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
            <li>• Enter any two values to calculate the third (Energy, Mass, or Velocity)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: E = ½ × m × v²</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• Common ballistics units: grains for mass, fps for velocity, ft-lb for energy</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values should be non-negative</li>
            <li>• Mass must be positive</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Common Bullet Energy Values</h3>
          <div className="text-sm text-blue-800 space-y-2">
            <div>
              <strong>Typical Handgun Rounds:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• .22 LR: 100-200 ft-lb</li>
                <li>• 9mm: 300-500 ft-lb</li>
                <li>• .45 ACP: 350-550 ft-lb</li>
                <li>• .357 Magnum: 500-800 ft-lb</li>
              </ul>
            </div>
            <div>
              <strong>Typical Rifle Rounds:</strong>
              <ul className="ml-4 mt-1 space-y-1">
                <li>• .223 Remington: 1,200-1,800 ft-lb</li>
                <li>• .308 Winchester: 2,500-3,000 ft-lb</li>
                <li>• .30-06 Springfield: 2,800-3,500 ft-lb</li>
                <li>• .50 BMG: 10,000-15,000 ft-lb</li>
              </ul>
            </div>
            <p className="text-xs text-blue-700 mt-2">
              <strong>Note:</strong> These values are approximate and vary with bullet weight, powder charge, and barrel length.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

