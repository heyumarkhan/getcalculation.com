'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'dipoleMoment' | 'charge' | 'distance';

interface DipoleCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base units: C·m, C, m)
const dipoleMomentUnits = {
  'C·m': { name: 'C·m (Coulomb-meter)', factor: 1 },
  'D': { name: 'D (Debye)', factor: 3.33564e-30 }, // 1 Debye = 3.33564 × 10⁻³⁰ C·m
  'C·cm': { name: 'C·cm (Coulomb-centimeter)', factor: 0.01 },
  'C·mm': { name: 'C·mm (Coulomb-millimeter)', factor: 0.001 }
};

const chargeUnits = {
  'C': { name: 'C (Coulombs)', factor: 1 },
  'mC': { name: 'mC (Millicoulombs)', factor: 0.001 },
  'μC': { name: 'μC (Microcoulombs)', factor: 0.000001 },
  'nC': { name: 'nC (Nanocoulombs)', factor: 0.000000001 },
  'pC': { name: 'pC (Picocoulombs)', factor: 0.000000000001 },
  'e': { name: 'e (Elementary charge)', factor: 1.602176634e-19 } // 1 e = 1.602176634 × 10⁻¹⁹ C
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'μm': { name: 'μm (Micrometers)', factor: 0.000001 },
  'nm': { name: 'nm (Nanometers)', factor: 0.000000001 },
  'Å': { name: 'Å (Angstroms)', factor: 1e-10 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

export default function DipoleCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: DipoleCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('dipoleMoment');
  const [dipoleMoment, setDipoleMoment] = useState('');
  const [charge, setCharge] = useState('');
  const [distance, setDistance] = useState('');
  const [dipoleMomentUnit, setDipoleMomentUnit] = useState('C·m');
  const [chargeUnit, setChargeUnit] = useState('C');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
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

  const convertDipoleMomentToBase = (value: number, unit: string): number => {
    return value * dipoleMomentUnits[unit as keyof typeof dipoleMomentUnits].factor;
  };

  const convertDipoleMomentFromBase = (value: number, unit: string): number => {
    return value / dipoleMomentUnits[unit as keyof typeof dipoleMomentUnits].factor;
  };

  const convertChargeToBase = (value: number, unit: string): number => {
    return value * chargeUnits[unit as keyof typeof chargeUnits].factor;
  };

  const convertChargeFromBase = (value: number, unit: string): number => {
    return value / chargeUnits[unit as keyof typeof chargeUnits].factor;
  };

  const convertDistanceToBase = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string): number => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const p = dipoleMoment ? parseFloat(dipoleMoment) : NaN;
    const q = charge ? parseFloat(charge) : NaN;
    const d = distance ? parseFloat(distance) : NaN;

    if (calculationMode === 'dipoleMoment') {
      // Calculate dipole moment: p = q × d
      if (!charge || !distance) {
        setError('Please enter both charge and distance');
        return;
      }

      if (isNaN(q) || q === 0) {
        setError('Charge must be a valid non-zero number');
        return;
      }
      if (isNaN(d) || d <= 0) {
        setError('Distance must be a valid positive number');
        return;
      }

      const qBase = convertChargeToBase(q, chargeUnit);
      const dBase = convertDistanceToBase(d, distanceUnit);
      const pBase = Math.abs(qBase * dBase); // Magnitude only
      const pResult = convertDipoleMomentFromBase(pBase, dipoleMomentUnit);

      setResult({ value: pResult, unit: dipoleMomentUnit, label: 'Dipole Moment' });
      setCalculation(`Dipole Moment (p) = Charge (q) × Distance (d)\np = q × d\nq = ${formatValue(q)} ${chargeUnit} = ${formatValue(qBase)} C\nd = ${formatValue(d)} ${distanceUnit} = ${formatValue(dBase)} m\np = ${formatValue(qBase)} C × ${formatValue(dBase)} m = ${formatValue(pBase)} C·m = ${formatValue(pResult)} ${dipoleMomentUnit}`);
    } else if (calculationMode === 'charge') {
      // Calculate charge: q = p / d
      if (!dipoleMoment || !distance) {
        setError('Please enter both dipole moment and distance');
        return;
      }

      if (isNaN(p) || p <= 0) {
        setError('Dipole moment must be a valid positive number');
        return;
      }
      if (isNaN(d) || d <= 0) {
        setError('Distance must be a valid positive number');
        return;
      }

      const pBase = convertDipoleMomentToBase(p, dipoleMomentUnit);
      const dBase = convertDistanceToBase(d, distanceUnit);
      const qBase = pBase / dBase;
      const qResult = convertChargeFromBase(qBase, chargeUnit);

      setResult({ value: Math.abs(qResult), unit: chargeUnit, label: 'Charge' });
      setCalculation(`Charge (q) = Dipole Moment (p) / Distance (d)\nq = p / d\np = ${formatValue(p)} ${dipoleMomentUnit} = ${formatValue(pBase)} C·m\nd = ${formatValue(d)} ${distanceUnit} = ${formatValue(dBase)} m\nq = ${formatValue(pBase)} C·m / ${formatValue(dBase)} m = ${formatValue(qBase)} C = ${formatValue(Math.abs(qResult))} ${chargeUnit}`);
    } else if (calculationMode === 'distance') {
      // Calculate distance: d = p / q
      if (!dipoleMoment || !charge) {
        setError('Please enter both dipole moment and charge');
        return;
      }

      if (isNaN(p) || p <= 0) {
        setError('Dipole moment must be a valid positive number');
        return;
      }
      if (isNaN(q) || q === 0) {
        setError('Charge must be a valid non-zero number');
        return;
      }

      const pBase = convertDipoleMomentToBase(p, dipoleMomentUnit);
      const qBase = convertChargeToBase(q, chargeUnit);
      const dBase = Math.abs(pBase / qBase);
      const dResult = convertDistanceFromBase(dBase, distanceUnit);

      setResult({ value: dResult, unit: distanceUnit, label: 'Distance' });
      setCalculation(`Distance (d) = Dipole Moment (p) / Charge (q)\nd = p / q\np = ${formatValue(p)} ${dipoleMomentUnit} = ${formatValue(pBase)} C·m\nq = ${formatValue(q)} ${chargeUnit} = ${formatValue(qBase)} C\nd = ${formatValue(pBase)} C·m / ${formatValue(qBase)} C = ${formatValue(dBase)} m = ${formatValue(dResult)} ${distanceUnit}`);
    }
  };

  const clearAll = () => {
    setDipoleMoment('');
    setCharge('');
    setDistance('');
    setDipoleMomentUnit('C·m');
    setChargeUnit('C');
    setDistanceUnit('m');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dipole Calculator</h2>
          <p className="text-gray-600">Calculate electric dipole moment, charge, or distance between charges</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="dipoleMoment">Dipole Moment (p)</option>
            <option value="charge">Charge (q)</option>
            <option value="distance">Distance (d)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            p = q × d
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: p = Dipole Moment, q = Charge, d = Distance between charges</p>
        </div>

        {/* Dipole Moment Input */}
        {(calculationMode === 'charge' || calculationMode === 'distance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Dipole Moment (p)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter dipole moment"
                  value={dipoleMoment}
                  onChange={(e) => setDipoleMoment(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={dipoleMomentUnit}
                  onChange={(e) => setDipoleMomentUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(dipoleMomentUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Charge Input */}
        {(calculationMode === 'dipoleMoment' || calculationMode === 'distance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Charge (q)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter charge"
                  value={charge}
                  onChange={(e) => setCharge(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-48">
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
            <p className="text-xs text-gray-500 mt-1">
              Note: Use the magnitude of charge. For a dipole with +q and -q, use q (the absolute value of one charge).
            </p>
          </div>
        )}

        {/* Distance Input */}
        {(calculationMode === 'dipoleMoment' || calculationMode === 'charge') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Distance (d)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter distance between charges"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
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
            <p className="text-xs text-gray-500 mt-1">
              Distance between the centers of the positive and negative charges
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            onClick={calculate}
            className="flex-1"
            style={{ backgroundColor: primaryColor }}
          >
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30`, borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Result</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm mt-1" style={{ color: `${primaryColor}CC` }}>
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line" style={{ color: `${primaryColor}CC` }}>
                {calculation}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationMode === 'dipoleMoment' && (
              <>
                <li>• Enter the charge magnitude (q) and distance between charges (d)</li>
                <li>• Calculator will determine the dipole moment magnitude</li>
                <li>• Formula: p = q × d</li>
              </>
            )}
            {calculationMode === 'charge' && (
              <>
                <li>• Enter the dipole moment (p) and distance between charges (d)</li>
                <li>• Calculator will determine the charge magnitude</li>
                <li>• Formula: q = p / d</li>
              </>
            )}
            {calculationMode === 'distance' && (
              <>
                <li>• Enter the dipole moment (p) and charge magnitude (q)</li>
                <li>• Calculator will determine the distance between charges</li>
                <li>• Formula: d = p / q</li>
              </>
            )}
            <li>• For a dipole with charges +q and -q, use the magnitude q (absolute value)</li>
            <li>• Distance is measured from the center of negative charge to the center of positive charge</li>
            <li>• Dipole moment is a vector quantity; this calculator computes its magnitude</li>
            <li>• Common units: Debye (D) for molecular dipoles, C·m for general use</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

