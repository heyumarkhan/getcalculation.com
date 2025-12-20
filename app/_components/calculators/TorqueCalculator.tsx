'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: N·m, N, m)
const torqueUnits = {
  'N·m': { name: 'N·m (Newton-meters)', factor: 1 },
  'kN·m': { name: 'kN·m (Kilonewton-meters)', factor: 1000 },
  'N·cm': { name: 'N·cm', factor: 0.01 },
  'N·mm': { name: 'N·mm', factor: 0.001 },
  'lb·ft': { name: 'lb·ft (Pound-feet)', factor: 1.35582 },
  'lb·in': { name: 'lb·in (Pound-inches)', factor: 0.112985 },
  'oz·in': { name: 'oz·in (Ounce-inches)', factor: 0.00706155 },
  'kgf·m': { name: 'kgf·m (Kilogram-force meters)', factor: 9.80665 },
  'kgf·cm': { name: 'kgf·cm', factor: 0.0980665 }
};

const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds)', factor: 4.44822 },
  'oz': { name: 'oz (Ounces)', factor: 0.278014 },
  'kgf': { name: 'kgf (Kilogram-force)', factor: 9.80665 },
  'gf': { name: 'gf (Gram-force)', factor: 0.00980665 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'yd': { name: 'yd (Yards)', factor: 0.9144 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

export default function TorqueCalculator() {
  const [torque, setTorque] = useState('');
  const [force, setForce] = useState('');
  const [distance, setDistance] = useState('');
  const [torqueUnit, setTorqueUnit] = useState('N·m');
  const [forceUnit, setForceUnit] = useState('N');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'torque' | 'force' | 'distance' } | null>(null);
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

  const convertTorqueToBase = (value: number, unit: string) => {
    return value * torqueUnits[unit as keyof typeof torqueUnits].factor;
  };

  const convertTorqueFromBase = (value: number, unit: string) => {
    return value / torqueUnits[unit as keyof typeof torqueUnits].factor;
  };

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertDistanceToBase = (value: number, unit: string) => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string) => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const calculate = () => {
    const τ = torque ? parseFloat(torque) : NaN;
    const f = force ? parseFloat(force) : NaN;
    const r = distance ? parseFloat(distance) : NaN;

    const filledCount = [torque, force, distance].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (torque && (isNaN(τ) || τ === 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-zero number for torque');
      return;
    }
    if (force && (isNaN(f) || f <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for force');
      return;
    }
    if (distance && (isNaN(r) || r <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for distance');
      return;
    }

    if (!torque) {
      // Calculate torque: τ = F × r
      const fBase = convertForceToBase(f, forceUnit);
      const rBase = convertDistanceToBase(r, distanceUnit);
      const τBase = fBase * rBase;
      const τResult = convertTorqueFromBase(τBase, torqueUnit);
      
      setResult({ value: τResult, unit: torqueUnit, type: 'torque' });
      setCalculation(`τ = F × r = ${formatValue(f)} ${forceUnit} × ${formatValue(r)} ${distanceUnit} = ${formatValue(τResult)} ${torqueUnit}`);
    } else if (!force) {
      // Calculate force: F = τ / r
      const τBase = convertTorqueToBase(τ, torqueUnit);
      const rBase = convertDistanceToBase(r, distanceUnit);
      
      if (rBase === 0) {
        setResult(null);
        setCalculation('Error: Distance cannot be zero');
        return;
      }
      
      const fBase = τBase / rBase;
      const fResult = convertForceFromBase(fBase, forceUnit);
      
      setResult({ value: fResult, unit: forceUnit, type: 'force' });
      setCalculation(`F = τ / r = ${formatValue(τ)} ${torqueUnit} / ${formatValue(r)} ${distanceUnit} = ${formatValue(fResult)} ${forceUnit}`);
    } else if (!distance) {
      // Calculate distance: r = τ / F
      const τBase = convertTorqueToBase(τ, torqueUnit);
      const fBase = convertForceToBase(f, forceUnit);
      
      if (fBase === 0) {
        setResult(null);
        setCalculation('Error: Force cannot be zero');
        return;
      }
      
      const rBase = τBase / fBase;
      const rResult = convertDistanceFromBase(rBase, distanceUnit);
      
      setResult({ value: rResult, unit: distanceUnit, type: 'distance' });
      setCalculation(`r = τ / F = ${formatValue(τ)} ${torqueUnit} / ${formatValue(f)} ${forceUnit} = ${formatValue(rResult)} ${distanceUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setTorque('');
    setForce('');
    setDistance('');
    setTorqueUnit('N·m');
    setForceUnit('N');
    setDistanceUnit('m');
    setResult(null);
    setCalculation('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Torque Calculator</h2>
        <p className="text-gray-600">Calculate torque, force, or distance using the formula: τ = F × r</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Torque (τ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter torque"
                value={torque}
                onChange={(e) => setTorque(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-48">
              <select
                value={torqueUnit}
                onChange={(e) => setTorqueUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(torqueUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Force (F)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter force"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Distance / Lever Arm (r)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter distance from pivot"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(distanceUnits).map(([key, unit]) => (
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
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono`}>
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
            <li>• Enter any two values to calculate the third (τ, F, or r)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Formula: τ = F × r (Torque = Force × Distance from pivot)</li>
            <li>• Distance (r) is the perpendicular distance from the pivot point to the line of action of the force</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

