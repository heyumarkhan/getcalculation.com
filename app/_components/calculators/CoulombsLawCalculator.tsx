'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'μN': { name: 'μN (Micronewtons)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
};

const chargeUnits = {
  'C': { name: 'C (Coulombs)', factor: 1 },
  'mC': { name: 'mC (Millicoulombs)', factor: 0.001 },
  'μC': { name: 'μC (Microcoulombs)', factor: 0.000001 },
  'nC': { name: 'nC (Nanocoulombs)', factor: 0.000000001 },
  'pC': { name: 'pC (Picocoulombs)', factor: 0.000000000001 },
  'e': { name: 'e (Elementary charge)', factor: 1.602176634e-19 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'μm': { name: 'μm (Micrometers)', factor: 0.000001 },
  'nm': { name: 'nm (Nanometers)', factor: 0.000000001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

// Coulomb's constant: k = 8.99 × 10⁹ N·m²/C²
const COULOMB_CONSTANT = 8.99e9;

export default function CoulombsLawCalculator() {
  const [force, setForce] = useState('');
  const [charge1, setCharge1] = useState('');
  const [charge2, setCharge2] = useState('');
  const [distance, setDistance] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [chargeUnit, setChargeUnit] = useState('C');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'force' | 'charge' | 'distance'; direction: 'attractive' | 'repulsive' | 'none' } | null>(null);
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

  const convertChargeToBase = (value: number, unit: string) => {
    return value * chargeUnits[unit as keyof typeof chargeUnits].factor;
  };

  const convertChargeFromBase = (value: number, unit: string) => {
    return value / chargeUnits[unit as keyof typeof chargeUnits].factor;
  };

  const convertDistanceToBase = (value: number, unit: string) => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string) => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const calculate = () => {
    const F = force ? parseFloat(force) : NaN;
    const q1 = charge1 ? parseFloat(charge1) : NaN;
    const q2 = charge2 ? parseFloat(charge2) : NaN;
    const r = distance ? parseFloat(distance) : NaN;

    const filledCount = [force, charge1, charge2, distance].filter(val => val !== '').length;

    if (filledCount !== 3) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate inputs
    if (force && (isNaN(F) || F <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for force');
      return;
    }
    if (charge1 && (isNaN(q1) || q1 === 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-zero number for charge 1');
      return;
    }
    if (charge2 && (isNaN(q2) || q2 === 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-zero number for charge 2');
      return;
    }
    if (distance && (isNaN(r) || r <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for distance');
      return;
    }

    // Convert to base units
    const q1Base = charge1 ? convertChargeToBase(q1, chargeUnit) : NaN;
    const q2Base = charge2 ? convertChargeToBase(q2, chargeUnit) : NaN;
    const rBase = distance ? convertDistanceToBase(r, distanceUnit) : NaN;

    // Determine force direction (attractive if charges have opposite signs, repulsive if same sign)
    let direction: 'attractive' | 'repulsive' | 'none' = 'none';
    if (charge1 && charge2) {
      const q1Sign = Math.sign(q1);
      const q2Sign = Math.sign(q2);
      if (q1Sign * q2Sign < 0) {
        direction = 'attractive';
      } else if (q1Sign * q2Sign > 0) {
        direction = 'repulsive';
      }
    }

    if (!force) {
      // Calculate force: F = k × (q₁ × q₂) / r²
      const FBase = COULOMB_CONSTANT * (Math.abs(q1Base) * Math.abs(q2Base)) / Math.pow(rBase, 2);
      const FResult = convertForceFromBase(FBase, forceUnit);

      setResult({ value: FResult, unit: forceUnit, type: 'force', direction });
      setCalculation(`F = k × (q₁ × q₂) / r² = (8.99 × 10⁹ N·m²/C²) × (${formatValue(q1)} ${chargeUnit} × ${formatValue(q2)} ${chargeUnit}) / (${formatValue(r)} ${distanceUnit})² = ${formatValue(FResult)} ${forceUnit} (${direction})`);
    } else if (!charge1) {
      // Calculate charge 1: q₁ = (F × r²) / (k × q₂)
      const FBase = convertForceToBase(F, forceUnit);

      if (q2Base === 0) {
        setResult(null);
        setCalculation('Error: Charge 2 cannot be zero');
        return;
      }

      const q1BaseCalc = (FBase * Math.pow(rBase, 2)) / (COULOMB_CONSTANT * Math.abs(q2Base));
      const q1Result = convertChargeFromBase(q1BaseCalc, chargeUnit);

      // Preserve sign based on force direction
      const sign = (direction === 'attractive' && q2 < 0) || (direction === 'repulsive' && q2 > 0) ? 1 : -1;
      const q1ResultSigned = Math.abs(q1Result) * sign;

      setResult({ value: q1ResultSigned, unit: chargeUnit, type: 'charge', direction });
      setCalculation(`q₁ = (F × r²) / (k × q₂) = (${formatValue(F)} ${forceUnit} × (${formatValue(r)} ${distanceUnit})²) / (8.99 × 10⁹ N·m²/C² × ${formatValue(Math.abs(q2))} ${chargeUnit}) = ${formatValue(q1ResultSigned)} ${chargeUnit}`);
    } else if (!charge2) {
      // Calculate charge 2: q₂ = (F × r²) / (k × q₁)
      const FBase = convertForceToBase(F, forceUnit);

      if (q1Base === 0) {
        setResult(null);
        setCalculation('Error: Charge 1 cannot be zero');
        return;
      }

      const q2BaseCalc = (FBase * Math.pow(rBase, 2)) / (COULOMB_CONSTANT * Math.abs(q1Base));
      const q2Result = convertChargeFromBase(q2BaseCalc, chargeUnit);

      // Preserve sign based on force direction
      const sign = (direction === 'attractive' && q1 < 0) || (direction === 'repulsive' && q1 > 0) ? 1 : -1;
      const q2ResultSigned = Math.abs(q2Result) * sign;

      setResult({ value: q2ResultSigned, unit: chargeUnit, type: 'charge', direction });
      setCalculation(`q₂ = (F × r²) / (k × q₁) = (${formatValue(F)} ${forceUnit} × (${formatValue(r)} ${distanceUnit})²) / (8.99 × 10⁹ N·m²/C² × ${formatValue(Math.abs(q1))} ${chargeUnit}) = ${formatValue(q2ResultSigned)} ${chargeUnit}`);
    } else if (!distance) {
      // Calculate distance: r = √(k × q₁ × q₂ / F)
      const FBase = convertForceToBase(F, forceUnit);

      if (FBase === 0) {
        setResult(null);
        setCalculation('Error: Force cannot be zero');
        return;
      }

      const rBaseCalc = Math.sqrt(COULOMB_CONSTANT * Math.abs(q1Base) * Math.abs(q2Base) / FBase);
      const rResult = convertDistanceFromBase(rBaseCalc, distanceUnit);

      setResult({ value: rResult, unit: distanceUnit, type: 'distance', direction });
      setCalculation(`r = √(k × q₁ × q₂ / F) = √((8.99 × 10⁹ N·m²/C²) × ${formatValue(Math.abs(q1))} ${chargeUnit} × ${formatValue(Math.abs(q2))} ${chargeUnit} / ${formatValue(F)} ${forceUnit}) = ${formatValue(rResult)} ${distanceUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setForce('');
    setCharge1('');
    setCharge2('');
    setDistance('');
    setForceUnit('N');
    setChargeUnit('C');
    setDistanceUnit('m');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coulomb&apos;s Law Calculator</h2>
        <p className="text-gray-600">Calculate electrostatic force using F = k × (q₁ × q₂) / r²</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">F = k × (q₁ × q₂) / r²</p>
          <p className="text-xs text-gray-500 mt-1">
            Where: F = Force, k = 8.99 × 10⁹ N·m²/C², q₁, q₂ = Charges, r = Distance
          </p>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Charge 1 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Charge 1 (q₁)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter charge 1 (leave empty to calculate, use - for negative)"
                value={charge1}
                onChange={(e) => setCharge1(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={chargeUnit}
                onChange={(e) => setChargeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(chargeUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Charge 2 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Charge 2 (q₂)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter charge 2 (leave empty to calculate, use - for negative)"
                value={charge2}
                onChange={(e) => setCharge2(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={chargeUnit}
                onChange={(e) => setChargeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(chargeUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Distance Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Distance (r)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter distance (leave empty to calculate)"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Coulomb&apos;s constant k = 8.99 × 10⁹ N·m²/C². Use negative values for negative charges. Like charges repel, opposite charges attract.
          </p>
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
            {result.direction !== 'none' && (
              <p className="text-sm text-[#820ECC]/70 mt-1">
                Force is {result.direction}
              </p>
            )}
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
            <li>• Enter any three values to calculate the fourth (force, charge 1, charge 2, or distance)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: F = k × (q₁ × q₂) / r²</li>
            <li>• Use negative values for negative charges (e.g., -1.6e-19 for an electron)</li>
            <li>• Like charges (both + or both -) repel; opposite charges attract</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Coulomb&apos;s constant: k = 8.99 × 10⁹ N·m²/C²</li>
            <li>• Commonly used in electrostatics and particle physics</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

