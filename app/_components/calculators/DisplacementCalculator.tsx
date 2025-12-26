'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'fromPositions' | 'fromVelocity' | 'fromVelocityAcceleration' | 'fromVelocitiesTime' | 'fromVelocitiesAcceleration';

interface DisplacementCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base units: m, s, m/s, m/s²)
const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 },
  'yd': { name: 'yd (Yards)', factor: 0.9144 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 },
  'd': { name: 'd (Days)', factor: 86400 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 1 / 3.6 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'knots': { name: 'knots', factor: 0.514444 }
};

const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters per second squared)', factor: 1 },
  'km/h²': { name: 'km/h²', factor: 1 / (3.6 * 3.6 * 3600) },
  'ft/s²': { name: 'ft/s² (Feet per second squared)', factor: 0.3048 },
  'g': { name: 'g (Standard gravity)', factor: 9.80665 }
};

export default function DisplacementCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: DisplacementCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('fromPositions');
  const [initialPosition, setInitialPosition] = useState('');
  const [finalPosition, setFinalPosition] = useState('');
  const [initialVelocity, setInitialVelocity] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [time, setTime] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
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

  const convertDistanceToBase = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string): number => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertTimeToBase = (value: number, unit: string): number => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTimeFromBase = (value: number, unit: string): number => {
    return value / timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string): number => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string): number => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertAccelerationToBase = (value: number, unit: string): number => {
    return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const x0 = initialPosition ? parseFloat(initialPosition) : NaN;
    const x = finalPosition ? parseFloat(finalPosition) : NaN;
    const v0 = initialVelocity ? parseFloat(initialVelocity) : NaN;
    const v = finalVelocity ? parseFloat(finalVelocity) : NaN;
    const t = time ? parseFloat(time) : NaN;
    const a = acceleration ? parseFloat(acceleration) : NaN;

    if (calculationMode === 'fromPositions') {
      // Calculate displacement: Δx = x - x₀
      if (!initialPosition || !finalPosition) {
        setError('Please enter both initial position and final position');
        return;
      }

      if (isNaN(x0) || isNaN(x)) {
        setError('Positions must be valid numbers');
        return;
      }

      const x0Base = convertDistanceToBase(x0, distanceUnit);
      const xBase = convertDistanceToBase(x, distanceUnit);
      const deltaXBase = xBase - x0Base;
      const deltaXResult = convertDistanceFromBase(deltaXBase, distanceUnit);

      setResult({ value: deltaXResult, unit: distanceUnit, label: 'Displacement' });
      setCalculation(`Displacement (Δx) = Final Position (x) - Initial Position (x₀)\nΔx = x - x₀\nx₀ = ${formatValue(x0)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name} = ${formatValue(x0Base)} m\nx = ${formatValue(x)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name} = ${formatValue(xBase)} m\nΔx = ${formatValue(xBase)} - ${formatValue(x0Base)}\nΔx = ${formatValue(deltaXBase)} m = ${formatValue(deltaXResult)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name}`);
    } else if (calculationMode === 'fromVelocity') {
      // Calculate displacement: s = v × t (constant velocity)
      if (!initialVelocity || !time) {
        setError('Please enter both velocity and time');
        return;
      }

      if (isNaN(v0) || isNaN(t) || t <= 0) {
        setError('Velocity must be valid and time must be a valid positive number');
        return;
      }

      const v0Base = convertVelocityToBase(v0, velocityUnit);
      const tBase = convertTimeToBase(t, timeUnit);
      const sBase = v0Base * tBase;
      const sResult = convertDistanceFromBase(sBase, distanceUnit);

      setResult({ value: sResult, unit: distanceUnit, label: 'Displacement' });
      setCalculation(`Displacement (s) = Velocity (v) × Time (t)\ns = v × t\nv = ${formatValue(v0)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v0Base)} m/s\nt = ${formatValue(t)} ${timeUnits[timeUnit as keyof typeof timeUnits].name} = ${formatValue(tBase)} s\ns = ${formatValue(v0Base)} × ${formatValue(tBase)}\ns = ${formatValue(sBase)} m = ${formatValue(sResult)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name}`);
    } else if (calculationMode === 'fromVelocityAcceleration') {
      // Calculate displacement: s = v₀t + (1/2)at²
      if (!initialVelocity || !time || !acceleration) {
        setError('Please enter initial velocity, time, and acceleration');
        return;
      }

      if (isNaN(v0) || isNaN(t) || t <= 0 || isNaN(a)) {
        setError('All values must be valid numbers and time must be positive');
        return;
      }

      const v0Base = convertVelocityToBase(v0, velocityUnit);
      const tBase = convertTimeToBase(t, timeUnit);
      const aBase = convertAccelerationToBase(a, accelerationUnit);
      const sBase = v0Base * tBase + 0.5 * aBase * tBase * tBase;
      const sResult = convertDistanceFromBase(sBase, distanceUnit);

      setResult({ value: sResult, unit: distanceUnit, label: 'Displacement' });
      setCalculation(`Displacement (s) = v₀t + (1/2)at²\ns = v₀t + (1/2)at²\nv₀ = ${formatValue(v0)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v0Base)} m/s\nt = ${formatValue(t)} ${timeUnits[timeUnit as keyof typeof timeUnits].name} = ${formatValue(tBase)} s\na = ${formatValue(a)} ${accelerationUnits[accelerationUnit as keyof typeof accelerationUnits].name} = ${formatValue(aBase)} m/s²\ns = (${formatValue(v0Base)} × ${formatValue(tBase)}) + (1/2 × ${formatValue(aBase)} × ${formatValue(tBase)}²)\ns = ${formatValue(v0Base * tBase)} + (0.5 × ${formatValue(aBase)} × ${formatValue(tBase * tBase)})\ns = ${formatValue(v0Base * tBase)} + ${formatValue(0.5 * aBase * tBase * tBase)}\ns = ${formatValue(sBase)} m = ${formatValue(sResult)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name}`);
    } else if (calculationMode === 'fromVelocitiesTime') {
      // Calculate displacement: s = (v₀ + v) × t / 2
      if (!initialVelocity || !finalVelocity || !time) {
        setError('Please enter initial velocity, final velocity, and time');
        return;
      }

      if (isNaN(v0) || isNaN(v) || isNaN(t) || t <= 0) {
        setError('All values must be valid numbers and time must be positive');
        return;
      }

      const v0Base = convertVelocityToBase(v0, velocityUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const tBase = convertTimeToBase(t, timeUnit);
      const sBase = ((v0Base + vBase) / 2) * tBase;
      const sResult = convertDistanceFromBase(sBase, distanceUnit);

      setResult({ value: sResult, unit: distanceUnit, label: 'Displacement' });
      setCalculation(`Displacement (s) = (v₀ + v) × t / 2\ns = (v₀ + v) × t / 2\nv₀ = ${formatValue(v0)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v0Base)} m/s\nv = ${formatValue(v)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(vBase)} m/s\nt = ${formatValue(t)} ${timeUnits[timeUnit as keyof typeof timeUnits].name} = ${formatValue(tBase)} s\ns = (${formatValue(v0Base)} + ${formatValue(vBase)}) × ${formatValue(tBase)} / 2\ns = ${formatValue(v0Base + vBase)} × ${formatValue(tBase)} / 2\ns = ${formatValue((v0Base + vBase) * tBase / 2)} m = ${formatValue(sResult)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name}`);
    } else if (calculationMode === 'fromVelocitiesAcceleration') {
      // Calculate displacement: s = (v² - v₀²) / (2a)
      if (!initialVelocity || !finalVelocity || !acceleration) {
        setError('Please enter initial velocity, final velocity, and acceleration');
        return;
      }

      if (isNaN(v0) || isNaN(v) || isNaN(a) || a === 0) {
        setError('All values must be valid numbers and acceleration cannot be zero');
        return;
      }

      const v0Base = convertVelocityToBase(v0, velocityUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const aBase = convertAccelerationToBase(a, accelerationUnit);
      const sBase = (vBase * vBase - v0Base * v0Base) / (2 * aBase);
      const sResult = convertDistanceFromBase(sBase, distanceUnit);

      setResult({ value: sResult, unit: distanceUnit, label: 'Displacement' });
      setCalculation(`Displacement (s) = (v² - v₀²) / (2a)\ns = (v² - v₀²) / (2a)\nv₀ = ${formatValue(v0)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(v0Base)} m/s\nv = ${formatValue(v)} ${velocityUnits[velocityUnit as keyof typeof velocityUnits].name} = ${formatValue(vBase)} m/s\na = ${formatValue(a)} ${accelerationUnits[accelerationUnit as keyof typeof accelerationUnits].name} = ${formatValue(aBase)} m/s²\ns = (${formatValue(vBase)}² - ${formatValue(v0Base)}²) / (2 × ${formatValue(aBase)})\ns = (${formatValue(vBase * vBase)} - ${formatValue(v0Base * v0Base)}) / ${formatValue(2 * aBase)}\ns = ${formatValue(vBase * vBase - v0Base * v0Base)} / ${formatValue(2 * aBase)}\ns = ${formatValue(sBase)} m = ${formatValue(sResult)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name}`);
    }
  };

  const clearAll = () => {
    setInitialPosition('');
    setFinalPosition('');
    setInitialVelocity('');
    setFinalVelocity('');
    setTime('');
    setAcceleration('');
    setDistanceUnit('m');
    setTimeUnit('s');
    setVelocityUnit('m/s');
    setAccelerationUnit('m/s²');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Displacement Calculator</h2>
          <p className="text-gray-600">Calculate displacement from positions, velocity, acceleration, and time</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Method
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="fromPositions">From Initial and Final Positions</option>
            <option value="fromVelocity">From Velocity and Time (Constant Velocity)</option>
            <option value="fromVelocityAcceleration">From Initial Velocity, Acceleration, and Time</option>
            <option value="fromVelocitiesTime">From Initial and Final Velocities and Time</option>
            <option value="fromVelocitiesAcceleration">From Initial and Final Velocities and Acceleration</option>
          </select>
        </div>

        {/* Input Fields */}
        {calculationMode === 'fromPositions' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Initial Position (x₀)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter initial position"
                    value={initialPosition}
                    onChange={(e) => setInitialPosition(e.target.value)}
                    className="w-full"
                    autoFocus
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
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Final Position (x)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter final position"
                    value={finalPosition}
                    onChange={(e) => setFinalPosition(e.target.value)}
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
            </div>
          </>
        )}

        {calculationMode === 'fromVelocity' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Velocity (v)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter velocity"
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
                Time (t)
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

        {calculationMode === 'fromVelocityAcceleration' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Initial Velocity (v₀)
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
                Acceleration (a)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter acceleration"
                    value={acceleration}
                    onChange={(e) => setAcceleration(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Time (t)
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

        {calculationMode === 'fromVelocitiesTime' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Initial Velocity (v₀)
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
                Final Velocity (v)
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
                Time (t)
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

        {calculationMode === 'fromVelocitiesAcceleration' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Initial Velocity (v₀)
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
                Final Velocity (v)
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
                Acceleration (a)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter acceleration"
                    value={acceleration}
                    onChange={(e) => setAcceleration(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
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
          </>
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
            <li>• Select the calculation method based on what values you know.</li>
            <li>• Enter the required values in their respective fields.</li>
            <li>• Ensure all inputs are valid numbers. Time must be positive, and acceleration cannot be zero when required.</li>
            <li>• Select appropriate units for accurate calculations.</li>
            <li>• Formulas: Δx = x - x₀, s = vt, s = v₀t + (1/2)at², s = (v₀ + v)t/2, s = (v² - v₀²)/(2a)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

