'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'force' | 'mass' | 'velocity' | 'radius';

interface CentrifugalForceCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function CentrifugalForceCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: CentrifugalForceCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('force');
  const [force, setForce] = useState('');
  const [mass, setMass] = useState('');
  const [velocity, setVelocity] = useState('');
  const [radius, setRadius] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [massUnit, setMassUnit] = useState('kg');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  // Unit conversion factors (all relative to base units: N, kg, m/s, m)
  const forceUnits = {
    'N': { name: 'N (Newtons)', factor: 1 },
    'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
    'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
    'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
    'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
  };

  const massUnits = {
    'kg': { name: 'kg (Kilograms)', factor: 1 },
    'g': { name: 'g (Grams)', factor: 0.001 },
    'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
    'lb': { name: 'lb (Pounds)', factor: 0.453592 },
    'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
    'ton': { name: 'ton (Metric tons)', factor: 1000 }
  };

  const velocityUnits = {
    'm/s': { name: 'm/s (Meters per second)', factor: 1 },
    'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
    'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
    'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
    'km/s': { name: 'km/s (Kilometers per second)', factor: 1000 }
  };

  const radiusUnits = {
    'm': { name: 'm (Meters)', factor: 1 },
    'cm': { name: 'cm (Centimeters)', factor: 0.01 },
    'mm': { name: 'mm (Millimeters)', factor: 0.001 },
    'km': { name: 'km (Kilometers)', factor: 1000 },
    'ft': { name: 'ft (Feet)', factor: 0.3048 },
    'in': { name: 'in (Inches)', factor: 0.0254 },
    'mi': { name: 'mi (Miles)', factor: 1609.34 }
  };

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

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string) => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertRadiusToBase = (value: number, unit: string) => {
    return value * radiusUnits[unit as keyof typeof radiusUnits].factor;
  };

  const convertRadiusFromBase = (value: number, unit: string) => {
    return value / radiusUnits[unit as keyof typeof radiusUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const f = force ? parseFloat(force) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;
    const r = radius ? parseFloat(radius) : NaN;

    if (calculationMode === 'force') {
      // Calculate centrifugal force: F = m × v² / r
      if (!mass || !velocity || !radius) {
        setError('Please enter mass, velocity, and radius');
        return;
      }

      if (isNaN(m) || m <= 0) {
        setError('Mass must be a valid positive number');
        return;
      }
      if (isNaN(v) || v < 0) {
        setError('Velocity must be a valid non-negative number');
        return;
      }
      if (isNaN(r) || r <= 0) {
        setError('Radius must be a valid positive number');
        return;
      }

      const mBase = convertMassToBase(m, massUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const rBase = convertRadiusToBase(r, radiusUnit);
      const fBase = (mBase * vBase * vBase) / rBase;
      const fResult = convertForceFromBase(fBase, forceUnit);

      setResult({ value: fResult, unit: forceUnit, label: 'Centrifugal Force' });
      setCalculation(`Centrifugal Force = Mass × Velocity² ÷ Radius\nF = m × v² / r\nF = ${formatValue(m)} ${massUnit} × (${formatValue(v)} ${velocityUnit})² ÷ ${formatValue(r)} ${radiusUnit}\nF = ${formatValue(mBase)} kg × (${formatValue(vBase)} m/s)² ÷ ${formatValue(rBase)} m\nF = ${formatValue(mBase)} kg × ${formatValue(vBase * vBase)} m²/s² ÷ ${formatValue(rBase)} m\nF = ${formatValue(fBase)} N = ${formatValue(fResult)} ${forceUnit}`);
    } else if (calculationMode === 'mass') {
      // Calculate mass: m = F × r / v²
      if (!force || !velocity || !radius) {
        setError('Please enter centrifugal force, velocity, and radius');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setError('Centrifugal force must be a valid positive number');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setError('Velocity must be a valid positive number');
        return;
      }
      if (isNaN(r) || r <= 0) {
        setError('Radius must be a valid positive number');
        return;
      }

      const fBase = convertForceToBase(f, forceUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const rBase = convertRadiusToBase(r, radiusUnit);
      const mBase = (fBase * rBase) / (vBase * vBase);
      const mResult = convertMassFromBase(mBase, massUnit);

      setResult({ value: mResult, unit: massUnit, label: 'Mass' });
      setCalculation(`Mass = (Centrifugal Force × Radius) ÷ Velocity²\nm = (F × r) / v²\nm = (${formatValue(f)} ${forceUnit} × ${formatValue(r)} ${radiusUnit}) ÷ (${formatValue(v)} ${velocityUnit})²\nm = (${formatValue(fBase)} N × ${formatValue(rBase)} m) ÷ (${formatValue(vBase)} m/s)²\nm = ${formatValue(fBase * rBase)} N·m ÷ ${formatValue(vBase * vBase)} m²/s²\nm = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnit}`);
    } else if (calculationMode === 'velocity') {
      // Calculate velocity: v = √(F × r / m)
      if (!force || !mass || !radius) {
        setError('Please enter centrifugal force, mass, and radius');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setError('Centrifugal force must be a valid positive number');
        return;
      }
      if (isNaN(m) || m <= 0) {
        setError('Mass must be a valid positive number');
        return;
      }
      if (isNaN(r) || r <= 0) {
        setError('Radius must be a valid positive number');
        return;
      }

      const fBase = convertForceToBase(f, forceUnit);
      const mBase = convertMassToBase(m, massUnit);
      const rBase = convertRadiusToBase(r, radiusUnit);
      const vBase = Math.sqrt((fBase * rBase) / mBase);
      const vResult = convertVelocityFromBase(vBase, velocityUnit);

      setResult({ value: vResult, unit: velocityUnit, label: 'Velocity' });
      setCalculation(`Velocity = √((Centrifugal Force × Radius) ÷ Mass)\nv = √(F × r / m)\nv = √((${formatValue(f)} ${forceUnit} × ${formatValue(r)} ${radiusUnit}) ÷ ${formatValue(m)} ${massUnit})\nv = √((${formatValue(fBase)} N × ${formatValue(rBase)} m) ÷ ${formatValue(mBase)} kg)\nv = √(${formatValue(fBase * rBase / mBase)} m²/s²)\nv = ${formatValue(vBase)} m/s = ${formatValue(vResult)} ${velocityUnit}`);
    } else if (calculationMode === 'radius') {
      // Calculate radius: r = F × m / v² (actually r = F × v² / m, wait that's wrong)
      // Actually: F = mv²/r, so r = mv²/F
      if (!force || !mass || !velocity) {
        setError('Please enter centrifugal force, mass, and velocity');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setError('Centrifugal force must be a valid positive number');
        return;
      }
      if (isNaN(m) || m <= 0) {
        setError('Mass must be a valid positive number');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setError('Velocity must be a valid positive number');
        return;
      }

      const fBase = convertForceToBase(f, forceUnit);
      const mBase = convertMassToBase(m, massUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const rBase = (mBase * vBase * vBase) / fBase;
      const rResult = convertRadiusFromBase(rBase, radiusUnit);

      setResult({ value: rResult, unit: radiusUnit, label: 'Radius' });
      setCalculation(`Radius = (Mass × Velocity²) ÷ Centrifugal Force\nr = (m × v²) / F\nr = (${formatValue(m)} ${massUnit} × (${formatValue(v)} ${velocityUnit})²) ÷ ${formatValue(f)} ${forceUnit}\nr = (${formatValue(mBase)} kg × (${formatValue(vBase)} m/s)²) ÷ ${formatValue(fBase)} N\nr = ${formatValue(mBase * vBase * vBase)} kg·m²/s² ÷ ${formatValue(fBase)} N\nr = ${formatValue(rBase)} m = ${formatValue(rResult)} ${radiusUnit}`);
    }
  };

  const clearAll = () => {
    setForce('');
    setMass('');
    setVelocity('');
    setRadius('');
    setForceUnit('N');
    setMassUnit('kg');
    setVelocityUnit('m/s');
    setRadiusUnit('m');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Centrifugal Force Calculator</h2>
          <p className="text-gray-600">Calculate centrifugal force, mass, velocity, or radius for objects in circular motion</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="force">Calculate Centrifugal Force</option>
            <option value="mass">Calculate Mass</option>
            <option value="velocity">Calculate Velocity</option>
            <option value="radius">Calculate Radius</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            F = m × v² / r
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: F = Centrifugal Force, m = Mass, v = Velocity, r = Radius</p>
        </div>

        {/* Centrifugal Force Input */}
        {(calculationMode === 'mass' || calculationMode === 'velocity' || calculationMode === 'radius') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Centrifugal Force (F)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter centrifugal force"
                value={force}
                onChange={(e) => setForce(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <select
                value={forceUnit}
                onChange={(e) => setForceUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(forceUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Mass Input */}
        {(calculationMode === 'force' || calculationMode === 'velocity' || calculationMode === 'radius') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mass (m)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter mass"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="flex-1"
              />
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(massUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Velocity Input */}
        {(calculationMode === 'force' || calculationMode === 'mass' || calculationMode === 'radius') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Velocity (v)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter velocity"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="flex-1"
              />
              <select
                value={velocityUnit}
                onChange={(e) => setVelocityUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(velocityUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Radius Input */}
        {(calculationMode === 'force' || calculationMode === 'mass' || calculationMode === 'velocity') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Radius (r)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter radius"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="flex-1"
              />
              <select
                value={radiusUnit}
                onChange={(e) => setRadiusUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(radiusUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
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
            {calculationMode === 'force' && (
              <>
                <li>• Enter mass, velocity, and radius</li>
                <li>• Calculator will determine the centrifugal force</li>
                <li>• Formula: F = m × v² / r</li>
              </>
            )}
            {calculationMode === 'mass' && (
              <>
                <li>• Enter centrifugal force, velocity, and radius</li>
                <li>• Calculator will determine the mass</li>
                <li>• Formula: m = (F × r) / v²</li>
              </>
            )}
            {calculationMode === 'velocity' && (
              <>
                <li>• Enter centrifugal force, mass, and radius</li>
                <li>• Calculator will determine the velocity</li>
                <li>• Formula: v = √(F × r / m)</li>
              </>
            )}
            {calculationMode === 'radius' && (
              <>
                <li>• Enter centrifugal force, mass, and velocity</li>
                <li>• Calculator will determine the radius</li>
                <li>• Formula: r = (m × v²) / F</li>
              </>
            )}
            <li>• Centrifugal force is the apparent outward force on an object moving in a circular path</li>
            <li>• All values must be positive (except velocity can be zero, though it would result in zero force)</li>
            <li>• The calculator supports multiple units for each parameter</li>
            <li>• Note: In physics, centrifugal force is a fictitious force that appears in rotating reference frames</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

