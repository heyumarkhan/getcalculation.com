'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Constants
const STANDARD_GRAVITY = 9.80665; // m/s²

// Unit conversion factors (all relative to base units: m/s², m/s, m)
const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters/second²)', factor: 1 },
  'ft/s²': { name: 'ft/s² (Feet/second²)', factor: 0.3048 },
  'g': { name: 'g (Standard gravity)', factor: STANDARD_GRAVITY }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters/second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers/hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles/hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet/second)', factor: 0.3048 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

type CalculationMode = 'acceleration' | 'circular';

export default function GForceCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('acceleration');
  const [gForce, setGForce] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [velocity, setVelocity] = useState('');
  const [radius, setRadius] = useState('');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'gForce' | 'acceleration' | 'velocity' | 'radius' } | null>(null);
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

  const convertToBase = (value: number, unit: string, type: 'acceleration' | 'velocity' | 'distance') => {
    if (type === 'acceleration') return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    if (type === 'velocity') return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    if (type === 'distance') return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    return value;
  };

  const convertFromBase = (value: number, unit: string, type: 'acceleration' | 'velocity' | 'distance') => {
    if (type === 'acceleration') return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    if (type === 'velocity') return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
    if (type === 'distance') return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
    return value;
  };

  const calculate = () => {
    if (calculationMode === 'acceleration') {
      const G = gForce ? parseFloat(gForce) : NaN;
      const a = acceleration ? parseFloat(acceleration) : NaN;

      const filledCount = [gForce, acceleration].filter(val => val !== '').length;

      if (filledCount !== 1) {
        setResult(null);
        setCalculation('Error: Please enter either G-force or acceleration (leave one empty to calculate)');
        return;
      }

      if (gForce && (isNaN(G) || G < 0)) {
        setResult(null);
        setCalculation('Error: G-force must be a non-negative number');
        return;
      }
      if (acceleration && (isNaN(a) || a < 0)) {
        setResult(null);
        setCalculation('Error: Acceleration must be a non-negative number');
        return;
      }

      // Convert to base units
      const aBase = acceleration ? convertToBase(a, accelerationUnit, 'acceleration') : 0;

      if (!gForce) {
        // Calculate G-force: G = a / g
        const GCalculated = aBase / STANDARD_GRAVITY;
        setResult({ value: GCalculated, unit: 'g', type: 'gForce' });
        setCalculation(`G = a / g = ${formatValue(a)} ${accelerationUnit} / ${STANDARD_GRAVITY} m/s² = ${formatValue(GCalculated)} g`);
      } else if (!acceleration) {
        // Calculate acceleration: a = G × g
        const aCalculated = G * STANDARD_GRAVITY;
        const aResult = convertFromBase(aCalculated, accelerationUnit, 'acceleration');
        setResult({ value: aResult, unit: accelerationUnit, type: 'acceleration' });
        setCalculation(`a = G × g = ${formatValue(G)} g × ${STANDARD_GRAVITY} m/s² = ${formatValue(aResult)} ${accelerationUnit}`);
      }
    } else if (calculationMode === 'circular') {
      const G = gForce ? parseFloat(gForce) : NaN;
      const v = velocity ? parseFloat(velocity) : NaN;
      const r = radius ? parseFloat(radius) : NaN;

      const filledCount = [gForce, velocity, radius].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('Error: Please enter 2 values (G-force, velocity, or radius - leave one empty to calculate)');
        return;
      }

      if (gForce && (isNaN(G) || G < 0)) {
        setResult(null);
        setCalculation('Error: G-force must be a non-negative number');
        return;
      }
      if (velocity && (isNaN(v) || v <= 0)) {
        setResult(null);
        setCalculation('Error: Velocity must be a positive number');
        return;
      }
      if (radius && (isNaN(r) || r <= 0)) {
        setResult(null);
        setCalculation('Error: Radius must be a positive number');
        return;
      }

      // Convert to base units
      const vBase = velocity ? convertToBase(v, velocityUnit, 'velocity') : 0;
      const rBase = radius ? convertToBase(r, radiusUnit, 'distance') : 0;

      if (!gForce) {
        // Calculate G-force: G = v² / (r × g)
        if (rBase === 0) {
          setResult(null);
          setCalculation('Error: Radius cannot be zero');
          return;
        }
        const GCalculated = (vBase * vBase) / (rBase * STANDARD_GRAVITY);
        setResult({ value: GCalculated, unit: 'g', type: 'gForce' });
        setCalculation(`G = v² / (r × g) = (${formatValue(v)} ${velocityUnit})² / (${formatValue(r)} ${radiusUnit} × ${STANDARD_GRAVITY} m/s²) = ${formatValue(GCalculated)} g`);
      } else if (!velocity) {
        // Calculate velocity: v = √(G × r × g)
        if (rBase === 0) {
          setResult(null);
          setCalculation('Error: Radius cannot be zero');
          return;
        }
        const vCalculated = Math.sqrt(G * rBase * STANDARD_GRAVITY);
        const vResult = convertFromBase(vCalculated, velocityUnit, 'velocity');
        setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
        setCalculation(`v = √(G × r × g) = √(${formatValue(G)} g × ${formatValue(r)} ${radiusUnit} × ${STANDARD_GRAVITY} m/s²) = ${formatValue(vResult)} ${velocityUnit}`);
      } else if (!radius) {
        // Calculate radius: r = v² / (G × g)
        if (G === 0) {
          setResult(null);
          setCalculation('Error: G-force cannot be zero');
          return;
        }
        const rCalculated = (vBase * vBase) / (G * STANDARD_GRAVITY);
        const rResult = convertFromBase(rCalculated, radiusUnit, 'distance');
        setResult({ value: rResult, unit: radiusUnit, type: 'radius' });
        setCalculation(`r = v² / (G × g) = (${formatValue(v)} ${velocityUnit})² / (${formatValue(G)} g × ${STANDARD_GRAVITY} m/s²) = ${formatValue(rResult)} ${radiusUnit}`);
      }
    }
  };

  const clearAll = () => {
    setGForce('');
    setAcceleration('');
    setVelocity('');
    setRadius('');
    setAccelerationUnit('m/s²');
    setVelocityUnit('m/s');
    setRadiusUnit('m');
    setResult(null);
    setCalculation('');
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    clearAll();
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">G Force Calculator</h2>
        <p className="text-gray-600">Calculate G-force from acceleration or circular motion (velocity and radius)</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="acceleration">From Acceleration (G = a / g)</option>
            <option value="circular">From Circular Motion (G = v² / (r × g))</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {calculationMode === 'acceleration' && 'G = a / g'}
            {calculationMode === 'circular' && 'G = v² / (r × g)'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Where: G = G-force, g = standard gravity (9.80665 m/s²),
            {calculationMode === 'acceleration' ? ' a = acceleration' : ' v = velocity, r = radius'}
          </p>
        </div>

        {/* Acceleration Mode Inputs */}
        {calculationMode === 'acceleration' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                G-Force (G)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter G-force (leave empty to calculate)"
                    value={gForce}
                    onChange={(e) => setGForce(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600"
                  >
                    <option value="g">g (G-force)</option>
                  </select>
                </div>
              </div>
            </div>

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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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
          </>
        )}

        {/* Circular Motion Mode Inputs */}
        {calculationMode === 'circular' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                G-Force (G)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter G-force (leave empty to calculate)"
                    value={gForce}
                    onChange={(e) => setGForce(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-600"
                  >
                    <option value="g">g (G-force)</option>
                  </select>
                </div>
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Radius (r)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter radius (leave empty to calculate)"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={radiusUnit}
                    onChange={(e) => setRadiusUnit(e.target.value)}
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
          </>
        )}

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
            {calculationMode === 'acceleration' ? (
              <>
                <li>• Enter either G-force or acceleration to calculate the other</li>
                <li>• Formula: G = a / g (G-force = Acceleration / Standard Gravity)</li>
                <li>• Standard gravity: g = 9.80665 m/s²</li>
                <li>• Leave the value you want to calculate empty</li>
              </>
            ) : (
              <>
                <li>• Enter any 2 values (G-force, velocity, or radius) to calculate the third</li>
                <li>• Formula: G = v² / (r × g) (G-force = Velocity² / (Radius × Standard Gravity))</li>
                <li>• Standard gravity: g = 9.80665 m/s²</li>
                <li>• Leave the value you want to calculate empty</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All input values should be valid non-negative numbers</li>
            <li>• Common values: 1g = normal gravity, 3-5g = fighter jets, 9g = maximum human tolerance, 20g+ = extreme forces</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

