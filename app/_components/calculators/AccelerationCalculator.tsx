'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m/s², m/s, seconds)
const accelerationUnits = {
  'm/s²': { name: 'm/s²', factor: 1 },
  'km/h²': { name: 'km/h²', factor: 0.0000771605 },
  'ft/s²': { name: 'ft/s²', factor: 0.3048 },
  'in/s²': { name: 'in/s²', factor: 0.0254 },
  'g': { name: 'g (gravity)', factor: 9.80665 }
};

const velocityUnits = {
  'm/s': { name: 'm/s', factor: 1 },
  'km/h': { name: 'km/h', factor: 0.277778 },
  'mph': { name: 'mph', factor: 0.44704 },
  'ft/s': { name: 'ft/s', factor: 0.3048 },
  'in/s': { name: 'in/s', factor: 0.0254 },
  'mi/h': { name: 'mi/h', factor: 0.44704 }
};

const timeUnits = {
  's': { name: 'Seconds', factor: 1 },
  'min': { name: 'Minutes', factor: 60 },
  'h': { name: 'Hours', factor: 3600 },
  'ms': { name: 'Milliseconds', factor: 0.001 },
  'day': { name: 'Days', factor: 86400 }
};

export default function AccelerationCalculator() {
  const [initialVelocity, setInitialVelocity] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [time, setTime] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [initialVelocityUnit, setInitialVelocityUnit] = useState('m/s');
  const [finalVelocityUnit, setFinalVelocityUnit] = useState('m/s');
  const [timeUnit, setTimeUnit] = useState('s');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [result, setResult] = useState<{ value: number; unit: string; type: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 0.0001 && value !== 0) {
      return value.toExponential(4);
    }
    return value.toFixed(4);
  };

  const convertToBaseUnits = (value: number, unit: string, type: 'velocity' | 'time' | 'acceleration') => {
    if (type === 'velocity') {
      return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    } else if (type === 'time') {
      return value * timeUnits[unit as keyof typeof timeUnits].factor;
    } else {
      return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'velocity' | 'time' | 'acceleration') => {
    if (type === 'velocity') {
      return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
    } else if (type === 'time') {
      return value / timeUnits[unit as keyof typeof timeUnits].factor;
    } else {
      return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    }
  };

  const calculateAcceleration = () => {
    const u = parseFloat(initialVelocity);
    const v = parseFloat(finalVelocity);
    const t = parseFloat(time);
    const a = parseFloat(acceleration);

    // Count how many values are provided
    const providedValues = [initialVelocity, finalVelocity, time, acceleration].filter(val => val !== '').length;

    if (providedValues !== 3) {
      setResult(null);
      setCalculation('');
      return;
    }

    if (initialVelocity && finalVelocity && time && !acceleration) {
      // Calculate acceleration: a = (v - u) / t
      const uInMps = convertToBaseUnits(u, initialVelocityUnit, 'velocity');
      const vInMps = convertToBaseUnits(v, finalVelocityUnit, 'velocity');
      const tInSeconds = convertToBaseUnits(t, timeUnit, 'time');
      
      if (tInSeconds === 0) {
        setResult(null);
        setCalculation('Time cannot be zero');
        return;
      }

      const calculatedAccelerationInMps2 = (vInMps - uInMps) / tInSeconds;
      const calculatedAcceleration = convertFromBaseUnits(calculatedAccelerationInMps2, accelerationUnit, 'acceleration');
      
      setResult({ value: calculatedAcceleration, unit: accelerationUnit, type: 'acceleration' });
      setCalculation(`Acceleration = (Final Velocity - Initial Velocity) ÷ Time = (${v} ${finalVelocityUnit} - ${u} ${initialVelocityUnit}) ÷ ${t} ${timeUnit} = ${calculatedAcceleration.toFixed(4)} ${accelerationUnit}`);
    } else if (initialVelocity && finalVelocity && acceleration && !time) {
      // Calculate time: t = (v - u) / a
      const uInMps = convertToBaseUnits(u, initialVelocityUnit, 'velocity');
      const vInMps = convertToBaseUnits(v, finalVelocityUnit, 'velocity');
      const aInMps2 = convertToBaseUnits(a, accelerationUnit, 'acceleration');
      
      if (aInMps2 === 0) {
        setResult(null);
        setCalculation('Acceleration cannot be zero');
        return;
      }

      const calculatedTimeInSeconds = (vInMps - uInMps) / aInMps2;
      const calculatedTime = convertFromBaseUnits(calculatedTimeInSeconds, timeUnit, 'time');
      
      setResult({ value: calculatedTime, unit: timeUnit, type: 'time' });
      setCalculation(`Time = (Final Velocity - Initial Velocity) ÷ Acceleration = (${v} ${finalVelocityUnit} - ${u} ${initialVelocityUnit}) ÷ ${a} ${accelerationUnit} = ${calculatedTime.toFixed(4)} ${timeUnit}`);
    } else if (initialVelocity && time && acceleration && !finalVelocity) {
      // Calculate final velocity: v = u + at
      const uInMps = convertToBaseUnits(u, initialVelocityUnit, 'velocity');
      const tInSeconds = convertToBaseUnits(t, timeUnit, 'time');
      const aInMps2 = convertToBaseUnits(a, accelerationUnit, 'acceleration');
      
      const calculatedVelocityInMps = uInMps + (aInMps2 * tInSeconds);
      const calculatedVelocity = convertFromBaseUnits(calculatedVelocityInMps, finalVelocityUnit, 'velocity');
      
      setResult({ value: calculatedVelocity, unit: finalVelocityUnit, type: 'finalVelocity' });
      setCalculation(`Final Velocity = Initial Velocity + (Acceleration × Time) = ${u} ${initialVelocityUnit} + (${a} ${accelerationUnit} × ${t} ${timeUnit}) = ${calculatedVelocity.toFixed(4)} ${finalVelocityUnit}`);
    } else if (finalVelocity && time && acceleration && !initialVelocity) {
      // Calculate initial velocity: u = v - at
      const vInMps = convertToBaseUnits(v, finalVelocityUnit, 'velocity');
      const tInSeconds = convertToBaseUnits(t, timeUnit, 'time');
      const aInMps2 = convertToBaseUnits(a, accelerationUnit, 'acceleration');
      
      const calculatedVelocityInMps = vInMps - (aInMps2 * tInSeconds);
      const calculatedVelocity = convertFromBaseUnits(calculatedVelocityInMps, initialVelocityUnit, 'velocity');
      
      setResult({ value: calculatedVelocity, unit: initialVelocityUnit, type: 'initialVelocity' });
      setCalculation(`Initial Velocity = Final Velocity - (Acceleration × Time) = ${v} ${finalVelocityUnit} - (${a} ${accelerationUnit} × ${t} ${timeUnit}) = ${calculatedVelocity.toFixed(4)} ${initialVelocityUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setInitialVelocity('');
    setFinalVelocity('');
    setTime('');
    setAcceleration('');
    setInitialVelocityUnit('m/s');
    setFinalVelocityUnit('m/s');
    setTimeUnit('s');
    setAccelerationUnit('m/s²');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceleration Calculator</h2>
        <p className="text-gray-600">Calculate acceleration, velocity, or time using the formula: a = (v - u) / t</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Velocity (u)
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
                value={initialVelocityUnit}
                onChange={(e) => setInitialVelocityUnit(e.target.value)}
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
                value={finalVelocityUnit}
                onChange={(e) => setFinalVelocityUnit(e.target.value)}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        <div className="flex gap-3 pt-2">
          <Button onClick={calculateAcceleration} className="flex-1">
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
            {calculation && (
              <p className="text-sm text-gray-700 mt-2 font-mono">
                {calculation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter any three values to calculate the fourth</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• You can mix different units (e.g., km/h and m/s²)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

