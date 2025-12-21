'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Gravitational constant: 6.67430 × 10⁻¹¹ N⋅m²/kg²
const G = 6.67430e-11;

// Unit conversion factors (all relative to base units: N, kg, m)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'oz': { name: 'oz (Ounce-force)', factor: 0.278014 }
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

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

export default function GravitationalForceCalculator() {
  const [force, setForce] = useState('');
  const [mass1, setMass1] = useState('');
  const [mass2, setMass2] = useState('');
  const [distance, setDistance] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [massUnit, setMassUnit] = useState('kg');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'force' | 'mass1' | 'mass2' | 'distance' } | null>(null);
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

  const convertDistanceToBase = (value: number, unit: string) => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string) => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const calculate = () => {
    const f = force ? parseFloat(force) : NaN;
    const m1 = mass1 ? parseFloat(mass1) : NaN;
    const m2 = mass2 ? parseFloat(mass2) : NaN;
    const r = distance ? parseFloat(distance) : NaN;

    const filledCount = [force, mass1, mass2, distance].filter(val => val !== '').length;

    if (filledCount !== 3) {
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
    if (mass1 && (isNaN(m1) || m1 <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for mass 1');
      return;
    }
    if (mass2 && (isNaN(m2) || m2 <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for mass 2');
      return;
    }
    if (distance && (isNaN(r) || r <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for distance');
      return;
    }

    if (!force) {
      // Calculate force: F = G × (m1 × m2) / r²
      const m1Base = convertMassToBase(m1, massUnit);
      const m2Base = convertMassToBase(m2, massUnit);
      const rBase = convertDistanceToBase(r, distanceUnit);
      
      const fBase = G * (m1Base * m2Base) / (rBase * rBase);
      const fResult = convertForceFromBase(fBase, forceUnit);
      
      setResult({ value: fResult, unit: forceUnit, type: 'force' });
      setCalculation(`F = G × (m₁ × m₂) / r² = 6.67430 × 10⁻¹¹ × (${formatValue(m1)} ${massUnit} × ${formatValue(m2)} ${massUnit}) / (${formatValue(r)} ${distanceUnit})² = ${formatValue(fResult)} ${forceUnit}`);
    } else if (!mass1) {
      // Calculate mass1: m1 = (F × r²) / (G × m2)
      const fBase = convertForceToBase(f, forceUnit);
      const m2Base = convertMassToBase(m2, massUnit);
      const rBase = convertDistanceToBase(r, distanceUnit);
      
      if (m2Base === 0) {
        setResult(null);
        setCalculation('Error: Mass 2 cannot be zero');
        return;
      }
      
      const m1Base = (fBase * rBase * rBase) / (G * m2Base);
      const m1Result = convertMassFromBase(m1Base, massUnit);
      
      setResult({ value: m1Result, unit: massUnit, type: 'mass1' });
      setCalculation(`m₁ = (F × r²) / (G × m₂) = (${formatValue(f)} ${forceUnit} × (${formatValue(r)} ${distanceUnit})²) / (6.67430 × 10⁻¹¹ × ${formatValue(m2)} ${massUnit}) = ${formatValue(m1Result)} ${massUnit}`);
    } else if (!mass2) {
      // Calculate mass2: m2 = (F × r²) / (G × m1)
      const fBase = convertForceToBase(f, forceUnit);
      const m1Base = convertMassToBase(m1, massUnit);
      const rBase = convertDistanceToBase(r, distanceUnit);
      
      if (m1Base === 0) {
        setResult(null);
        setCalculation('Error: Mass 1 cannot be zero');
        return;
      }
      
      const m2Base = (fBase * rBase * rBase) / (G * m1Base);
      const m2Result = convertMassFromBase(m2Base, massUnit);
      
      setResult({ value: m2Result, unit: massUnit, type: 'mass2' });
      setCalculation(`m₂ = (F × r²) / (G × m₁) = (${formatValue(f)} ${forceUnit} × (${formatValue(r)} ${distanceUnit})²) / (6.67430 × 10⁻¹¹ × ${formatValue(m1)} ${massUnit}) = ${formatValue(m2Result)} ${massUnit}`);
    } else if (!distance) {
      // Calculate distance: r = √(G × m1 × m2 / F)
      const fBase = convertForceToBase(f, forceUnit);
      const m1Base = convertMassToBase(m1, massUnit);
      const m2Base = convertMassToBase(m2, massUnit);
      
      if (fBase === 0) {
        setResult(null);
        setCalculation('Error: Force cannot be zero');
        return;
      }
      
      const rBase = Math.sqrt((G * m1Base * m2Base) / fBase);
      const rResult = convertDistanceFromBase(rBase, distanceUnit);
      
      setResult({ value: rResult, unit: distanceUnit, type: 'distance' });
      setCalculation(`r = √(G × m₁ × m₂ / F) = √(6.67430 × 10⁻¹¹ × ${formatValue(m1)} ${massUnit} × ${formatValue(m2)} ${massUnit} / ${formatValue(f)} ${forceUnit}) = ${formatValue(rResult)} ${distanceUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setForce('');
    setMass1('');
    setMass2('');
    setDistance('');
    setForceUnit('N');
    setMassUnit('kg');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gravitational Force Calculator</h2>
        <p className="text-gray-600">Calculate gravitational force using F = G × (m₁ × m₂) / r²</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gravitational Force (F)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter force"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass 1 (m₁)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass 1"
                value={mass1}
                onChange={(e) => setMass1(e.target.value)}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass 2 (m₂)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass 2"
                value={mass2}
                onChange={(e) => setMass2(e.target.value)}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Distance (r)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter distance between centers"
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
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono break-words`}>
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
            <li>• Enter any three values to calculate the fourth (F, m₁, m₂, or r)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Formula: F = G × (m₁ × m₂) / r²</li>
            <li>• G = 6.67430 × 10⁻¹¹ N⋅m²/kg² (gravitational constant)</li>
            <li>• Distance (r) is the distance between the centers of the two objects</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

