'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m/s², m/s, N, kg, s)
const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters per second squared)', factor: 1 },
  'cm/s²': { name: 'cm/s² (Centimeters per second squared)', factor: 0.01 },
  'ft/s²': { name: 'ft/s² (Feet per second squared)', factor: 0.3048 },
  'in/s²': { name: 'in/s² (Inches per second squared)', factor: 0.0254 },
  'g': { name: 'g (Standard gravity)', factor: 9.80665 },
  'km/h²': { name: 'km/h²', factor: 0.00007716 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'in/s': { name: 'in/s (Inches per second)', factor: 0.0254 },
  'cm/s': { name: 'cm/s (Centimeters per second)', factor: 0.01 }
};

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

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 },
  'μs': { name: 'μs (Microseconds)', factor: 0.000001 }
};

export default function MagnitudeOfAccelerationCalculator() {
  const [calculationMethod, setCalculationMethod] = useState<'velocity' | 'force' | 'components'>('velocity');
  const [initialVelocity, setInitialVelocity] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [time, setTime] = useState('');
  const [force, setForce] = useState('');
  const [mass, setMass] = useState('');
  const [ax, setAx] = useState('');
  const [ay, setAy] = useState('');
  const [az, setAz] = useState('');
  
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [timeUnit, setTimeUnit] = useState('s');
  const [forceUnit, setForceUnit] = useState('N');
  const [massUnit, setMassUnit] = useState('kg');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [componentUnit, setComponentUnit] = useState('m/s²');
  
  const [result, setResult] = useState<{ value: number; unit: string; type: string } | null>(null);
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

  const convertVelocityToBase = (value: number, unit: string): number => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertTimeToBase = (value: number, unit: string): number => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertForceToBase = (value: number, unit: string): number => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string): number => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertAccelerationToBase = (value: number, unit: string): number => {
    return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const convertAccelerationFromBase = (value: number, unit: string): number => {
    return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (calculationMethod === 'velocity') {
      // Calculate magnitude from velocity change: |a| = |Δv| / Δt
      if (!initialVelocity || !finalVelocity || !time) {
        setError('Please enter initial velocity, final velocity, and time');
        return;
      }

      const vi = parseFloat(initialVelocity);
      const vf = parseFloat(finalVelocity);
      const t = parseFloat(time);

      if (isNaN(vi) || isNaN(vf) || isNaN(t)) {
        setError('Please enter valid numbers');
        return;
      }

      if (t === 0) {
        setError('Time cannot be zero');
        return;
      }

      const viBase = convertVelocityToBase(vi, velocityUnit);
      const vfBase = convertVelocityToBase(vf, velocityUnit);
      const tBase = convertTimeToBase(t, timeUnit);

      const deltaV = Math.abs(vfBase - viBase);
      const magnitudeBase = deltaV / tBase;
      const magnitudeResult = convertAccelerationFromBase(magnitudeBase, accelerationUnit);

      setResult({ value: magnitudeResult, unit: accelerationUnit, type: 'magnitude' });

      setCalculation(`|a| = |Δv| / Δt = |v₂ - v₁| / (t₂ - t₁)\n|a| = |${formatValue(vfBase)} m/s - ${formatValue(viBase)} m/s| / ${formatValue(tBase)} s\n|a| = ${formatValue(deltaV)} m/s / ${formatValue(tBase)} s\n|a| = ${formatValue(magnitudeBase)} m/s² = ${formatValue(magnitudeResult)} ${accelerationUnit}`);
    } else if (calculationMethod === 'force') {
      // Calculate magnitude from force and mass: |a| = |F| / m
      if (!force || !mass) {
        setError('Please enter force and mass');
        return;
      }

      const f = parseFloat(force);
      const m = parseFloat(mass);

      if (isNaN(f) || isNaN(m)) {
        setError('Please enter valid numbers');
        return;
      }

      if (m === 0) {
        setError('Mass cannot be zero');
        return;
      }

      const fBase = convertForceToBase(Math.abs(f), forceUnit);
      const mBase = convertMassToBase(m, massUnit);

      const magnitudeBase = fBase / mBase;
      const magnitudeResult = convertAccelerationFromBase(magnitudeBase, accelerationUnit);

      setResult({ value: magnitudeResult, unit: accelerationUnit, type: 'magnitude' });

      setCalculation(`|a| = |F| / m\n|a| = |${formatValue(f)} ${forceUnit}| / ${formatValue(m)} ${massUnit}\n|a| = ${formatValue(fBase)} N / ${formatValue(mBase)} kg\n|a| = ${formatValue(magnitudeBase)} m/s² = ${formatValue(magnitudeResult)} ${accelerationUnit}`);
    } else if (calculationMethod === 'components') {
      // Calculate magnitude from components: |a| = √(aₓ² + aᵧ² + a_z²)
      if (!ax || !ay) {
        setError('Please enter at least aₓ and aᵧ components');
        return;
      }

      const axVal = parseFloat(ax);
      const ayVal = parseFloat(ay);
      const azVal = az ? parseFloat(az) : 0;

      if (isNaN(axVal) || isNaN(ayVal) || (az && isNaN(azVal))) {
        setError('Please enter valid numbers');
        return;
      }

      const axBase = convertAccelerationToBase(axVal, componentUnit);
      const ayBase = convertAccelerationToBase(ayVal, componentUnit);
      const azBase = az ? convertAccelerationToBase(azVal, componentUnit) : 0;

      const magnitudeBase = Math.sqrt(axBase * axBase + ayBase * ayBase + azBase * azBase);
      const magnitudeResult = convertAccelerationFromBase(magnitudeBase, accelerationUnit);

      setResult({ value: magnitudeResult, unit: accelerationUnit, type: 'magnitude' });

      if (az) {
        setCalculation(`|a| = √(aₓ² + aᵧ² + a_z²)\n|a| = √((${formatValue(axBase)} m/s²)² + (${formatValue(ayBase)} m/s²)² + (${formatValue(azBase)} m/s²)²)\n|a| = √(${formatValue(axBase * axBase)} + ${formatValue(ayBase * ayBase)} + ${formatValue(azBase * azBase)})\n|a| = √(${formatValue(axBase * axBase + ayBase * ayBase + azBase * azBase)})\n|a| = ${formatValue(magnitudeBase)} m/s² = ${formatValue(magnitudeResult)} ${accelerationUnit}`);
      } else {
        setCalculation(`|a| = √(aₓ² + aᵧ²)\n|a| = √((${formatValue(axBase)} m/s²)² + (${formatValue(ayBase)} m/s²)²)\n|a| = √(${formatValue(axBase * axBase)} + ${formatValue(ayBase * ayBase)})\n|a| = √(${formatValue(axBase * axBase + ayBase * ayBase)})\n|a| = ${formatValue(magnitudeBase)} m/s² = ${formatValue(magnitudeResult)} ${accelerationUnit}`);
      }
    }
  };

  const clearAll = () => {
    setCalculationMethod('velocity');
    setInitialVelocity('');
    setFinalVelocity('');
    setTime('');
    setForce('');
    setMass('');
    setAx('');
    setAy('');
    setAz('');
    setVelocityUnit('m/s');
    setTimeUnit('s');
    setForceUnit('N');
    setMassUnit('kg');
    setAccelerationUnit('m/s²');
    setComponentUnit('m/s²');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Magnitude of Acceleration Calculator</h2>
        <p className="text-gray-600">Calculate the magnitude (absolute value) of acceleration using multiple methods</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Calculation Method:</p>
          <select
            value={calculationMethod}
            onChange={(e) => setCalculationMethod(e.target.value as 'velocity' | 'force' | 'components')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm font-medium"
          >
            <option value="velocity">From Velocity Change: |a| = |Δv| / Δt</option>
            <option value="force">From Force and Mass: |a| = |F| / m</option>
            <option value="components">From Components: |a| = √(aₓ² + aᵧ² + a_z²)</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            {calculationMethod === 'velocity' && 'Calculates magnitude from velocity change over time'}
            {calculationMethod === 'force' && 'Calculates magnitude from force and mass (Newton\'s second law)'}
            {calculationMethod === 'components' && 'Calculates magnitude from acceleration components (2D or 3D)'}
          </p>
        </div>

        {/* Velocity Change Method Inputs */}
        {calculationMethod === 'velocity' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Initial Velocity (v₁)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter initial velocity"
                    value={initialVelocity}
                    onChange={(e) => setInitialVelocity(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-32">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Final Velocity (v₂)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter final velocity"
                    value={finalVelocity}
                    onChange={(e) => setFinalVelocity(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Time Interval (Δt)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(timeUnits).map(([key, unit]) => (
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

        {/* Force and Mass Method Inputs */}
        {calculationMethod === 'force' && (
          <>
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
                    autoFocus
                  />
                </div>
                <div className="w-32">
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mass (m)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter mass"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
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
          </>
        )}

        {/* Components Method Inputs */}
        {calculationMethod === 'components' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                X-Component (aₓ)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter x-component"
                    value={ax}
                    onChange={(e) => setAx(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-32">
                  <select
                    value={componentUnit}
                    onChange={(e) => setComponentUnit(e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Y-Component (aᵧ)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter y-component"
                    value={ay}
                    onChange={(e) => setAy(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={componentUnit}
                    onChange={(e) => setComponentUnit(e.target.value)}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Z-Component (a_z) <span className="text-gray-500 text-xs">(optional, for 3D)</span>
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter z-component (optional)"
                    value={az}
                    onChange={(e) => setAz(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={componentUnit}
                    onChange={(e) => setComponentUnit(e.target.value)}
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
          </>
        )}

        {/* Output Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Output Acceleration Unit
          </label>
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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Magnitude of Acceleration</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              |a| = {formatValue(result.value)} {result.unit}
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
            {calculationMethod === 'velocity' && (
              <>
                <li>• Enter initial velocity, final velocity, and time interval</li>
                <li>• Formula: |a| = |Δv| / Δt = |v₂ - v₁| / (t₂ - t₁)</li>
                <li>• Calculates the magnitude of acceleration from velocity change</li>
              </>
            )}
            {calculationMethod === 'force' && (
              <>
                <li>• Enter force and mass</li>
                <li>• Formula: |a| = |F| / m (Newton&apos;s second law)</li>
                <li>• Calculates the magnitude of acceleration from force and mass</li>
              </>
            )}
            {calculationMethod === 'components' && (
              <>
                <li>• Enter x and y components (z is optional for 3D)</li>
                <li>• Formula: |a| = √(aₓ² + aᵧ²) or |a| = √(aₓ² + aᵧ² + a_z²)</li>
                <li>• Calculates the magnitude from acceleration components</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Magnitude is always positive (absolute value)</li>
            <li>• All values should be valid numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

