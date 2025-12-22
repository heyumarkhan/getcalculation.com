'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Speed of light in m/s
const SPEED_OF_LIGHT = 299792458; // m/s

// Unit conversion factors
const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 },
  'μs': { name: 'μs (Microseconds)', factor: 0.000001 },
  'ns': { name: 'ns (Nanoseconds)', factor: 0.000000001 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 },
  'd': { name: 'd (Days)', factor: 86400 },
  'y': { name: 'y (Years)', factor: 31536000 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/s': { name: 'km/s (Kilometers per second)', factor: 1000 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'c': { name: 'c (Speed of light)', factor: SPEED_OF_LIGHT }
};

export default function TimeDilationCalculator() {
  const [properTime, setProperTime] = useState('');
  const [dilatedTime, setDilatedTime] = useState('');
  const [velocity, setVelocity] = useState('');
  const [timeUnit, setTimeUnit] = useState('s');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'dilated' | 'proper' | 'velocity'; gamma: number } | null>(null);
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
    return value.toFixed(6).replace(/\.?0+$/, '');
  };

  const convertTimeToBase = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTimeFromBase = (value: number, unit: string) => {
    return value / timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string) => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const calculate = () => {
    const t0 = properTime ? parseFloat(properTime) : NaN;
    const t = dilatedTime ? parseFloat(dilatedTime) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;

    const filledCount = [properTime, dilatedTime, velocity].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate inputs
    if (properTime && (isNaN(t0) || t0 <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for proper time');
      return;
    }
    if (dilatedTime && (isNaN(t) || t <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for dilated time');
      return;
    }
    if (velocity && (isNaN(v) || v < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for velocity');
      return;
    }

    // Convert to base units
    const t0Base = properTime ? convertTimeToBase(t0, timeUnit) : NaN;
    const tBase = dilatedTime ? convertTimeToBase(t, timeUnit) : NaN;
    const vBase = velocity ? convertVelocityToBase(v, velocityUnit) : NaN;

    // Check if velocity exceeds speed of light
    if (velocity && vBase >= SPEED_OF_LIGHT) {
      setResult(null);
      setCalculation('Error: Velocity cannot exceed the speed of light (c = 299,792,458 m/s)');
      return;
    }

    // Calculate Lorentz factor: γ = 1 / √(1 - v²/c²)
    let gamma = 1;
    if (velocity) {
      const beta = vBase / SPEED_OF_LIGHT;
      if (beta >= 1) {
        setResult(null);
        setCalculation('Error: Velocity must be less than the speed of light');
        return;
      }
      gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));
    }

    if (!dilatedTime) {
      // Calculate dilated time: Δt = Δt₀ / √(1 - v²/c²) = Δt₀ × γ
      if (vBase >= SPEED_OF_LIGHT) {
        setResult(null);
        setCalculation('Error: Velocity cannot exceed the speed of light');
        return;
      }

      const tResult = t0Base * gamma;
      const tResultConverted = convertTimeFromBase(tResult, timeUnit);

      setResult({ value: tResultConverted, unit: timeUnit, type: 'dilated', gamma });
      setCalculation(`Δt = Δt₀ / √(1 - v²/c²) = ${formatValue(t0)} ${timeUnit} / √(1 - (${formatValue(v)} ${velocityUnit})² / c²) = ${formatValue(t0)} ${timeUnit} × ${formatValue(gamma)} = ${formatValue(tResultConverted)} ${timeUnit} (γ = ${formatValue(gamma)})`);
    } else if (!properTime) {
      // Calculate proper time: Δt₀ = Δt × √(1 - v²/c²) = Δt / γ
      if (vBase >= SPEED_OF_LIGHT) {
        setResult(null);
        setCalculation('Error: Velocity cannot exceed the speed of light');
        return;
      }

      const t0Result = tBase / gamma;
      const t0ResultConverted = convertTimeFromBase(t0Result, timeUnit);

      setResult({ value: t0ResultConverted, unit: timeUnit, type: 'proper', gamma });
      setCalculation(`Δt₀ = Δt × √(1 - v²/c²) = ${formatValue(t)} ${timeUnit} × √(1 - (${formatValue(v)} ${velocityUnit})² / c²) = ${formatValue(t)} ${timeUnit} / ${formatValue(gamma)} = ${formatValue(t0ResultConverted)} ${timeUnit} (γ = ${formatValue(gamma)})`);
    } else if (!velocity) {
      // Calculate velocity: v = c × √(1 - (Δt₀/Δt)²)
      if (tBase <= t0Base) {
        setResult(null);
        setCalculation('Error: Dilated time must be greater than proper time');
        return;
      }

      const ratio = t0Base / tBase;
      if (ratio >= 1) {
        setResult(null);
        setCalculation('Error: Proper time must be less than dilated time');
        return;
      }

      const beta = Math.sqrt(1 - Math.pow(ratio, 2));
      const vResult = SPEED_OF_LIGHT * beta;
      const vResultConverted = convertVelocityFromBase(vResult, velocityUnit);

      gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));

      setResult({ value: vResultConverted, unit: velocityUnit, type: 'velocity', gamma });
      setCalculation(`v = c × √(1 - (Δt₀/Δt)²) = c × √(1 - (${formatValue(t0)} ${timeUnit} / ${formatValue(t)} ${timeUnit})²) = ${formatValue(vResultConverted)} ${velocityUnit} (β = ${formatValue(beta)}, γ = ${formatValue(gamma)})`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setProperTime('');
    setDilatedTime('');
    setVelocity('');
    setTimeUnit('s');
    setVelocityUnit('m/s');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Time Dilation Calculator</h2>
        <p className="text-gray-600">Calculate time dilation using special relativity: Δt = Δt₀ / √(1 - v²/c²)</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">Δt = Δt₀ / √(1 - v²/c²)</p>
          <p className="text-xs text-gray-500 mt-1">
            Where: Δt = Dilated time, Δt₀ = Proper time, v = Velocity, c = Speed of light (299,792,458 m/s)
          </p>
        </div>

        {/* Proper Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Proper Time (Δt₀)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter proper time (leave empty to calculate)"
                value={properTime}
                onChange={(e) => setProperTime(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
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
          <p className="text-xs text-gray-500 mt-1">Time measured in the rest frame</p>
        </div>

        {/* Dilated Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dilated Time (Δt)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter dilated time (leave empty to calculate)"
                value={dilatedTime}
                onChange={(e) => setDilatedTime(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
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
          <p className="text-xs text-gray-500 mt-1">Time measured by observer in motion</p>
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
          <p className="text-xs text-gray-500 mt-1">Relative velocity (must be less than speed of light)</p>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Time dilation is a relativistic effect. At speeds approaching the speed of light (c = 299,792,458 m/s), time passes slower for moving objects. The Lorentz factor γ = 1 / √(1 - v²/c²) quantifies this effect.
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
            {result.gamma > 1 && (
              <p className="text-sm text-[#820ECC]/70 mt-1">
                Lorentz factor (γ) = {formatValue(result.gamma)}
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
            <li>• Enter any two values to calculate the third (proper time, dilated time, or velocity)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: Δt = Δt₀ / √(1 - v²/c²)</li>
            <li>• Velocity must be less than the speed of light (c = 299,792,458 m/s)</li>
            <li>• Dilated time is always greater than or equal to proper time</li>
            <li>• The Lorentz factor γ = 1 / √(1 - v²/c²) shows the time dilation effect</li>
            <li>• Select your preferred units for time and velocity</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Commonly used in special relativity, particle physics, and GPS calculations</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

