'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m/s², m/s, seconds, meters)
const accelerationUnits = {
  'm/s²': { name: 'm/s²', factor: 1 },
  'ft/s²': { name: 'ft/s²', factor: 0.3048 },
  'g': { name: 'g (standard gravity)', factor: 9.80665 }
};

const velocityUnits = {
  'm/s': { name: 'm/s', factor: 1 },
  'km/h': { name: 'km/h', factor: 0.277778 },
  'mph': { name: 'mph', factor: 0.44704 },
  'ft/s': { name: 'ft/s', factor: 0.3048 },
  'in/s': { name: 'in/s', factor: 0.0254 }
};

const timeUnits = {
  's': { name: 'Seconds', factor: 1 },
  'min': { name: 'Minutes', factor: 60 },
  'ms': { name: 'Milliseconds', factor: 0.001 }
};

const distanceUnits = {
  'm': { name: 'Meters', factor: 1 },
  'km': { name: 'Kilometers', factor: 1000 },
  'cm': { name: 'Centimeters', factor: 0.01 },
  'mm': { name: 'Millimeters', factor: 0.001 },
  'ft': { name: 'Feet', factor: 0.3048 },
  'in': { name: 'Inches', factor: 0.0254 },
  'mi': { name: 'Miles', factor: 1609.34 }
};

// Standard gravity
const g = 9.80665; // m/s²

export default function FreeFallCalculator() {
  const [initialVelocity, setInitialVelocity] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [time, setTime] = useState('');
  const [height, setHeight] = useState('');
  const [gravity, setGravity] = useState('9.80665');
  const [initialVelocityUnit, setInitialVelocityUnit] = useState('m/s');
  const [finalVelocityUnit, setFinalVelocityUnit] = useState('m/s');
  const [timeUnit, setTimeUnit] = useState('s');
  const [heightUnit, setHeightUnit] = useState('m');
  const [gravityUnit, setGravityUnit] = useState('m/s²');
  const [result, setResult] = useState<{ value: number; unit: string; type: string } | null>(null);
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

  const convertToBaseUnits = (value: number, unit: string, type: 'velocity' | 'time' | 'distance' | 'acceleration') => {
    if (type === 'velocity') {
      return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    } else if (type === 'time') {
      return value * timeUnits[unit as keyof typeof timeUnits].factor;
    } else if (type === 'distance') {
      return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    } else {
      return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'velocity' | 'time' | 'distance' | 'acceleration') => {
    if (type === 'velocity') {
      return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
    } else if (type === 'time') {
      return value / timeUnits[unit as keyof typeof timeUnits].factor;
    } else if (type === 'distance') {
      return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
    } else {
      return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    }
  };

  const calculate = () => {
    const v0 = initialVelocity ? parseFloat(initialVelocity) : 0;
    const v = finalVelocity ? parseFloat(finalVelocity) : NaN;
    const t = time ? parseFloat(time) : NaN;
    const h = height ? parseFloat(height) : NaN;
    const gValue = gravity ? parseFloat(gravity) : g;
    const gInBase = convertToBaseUnits(gValue, gravityUnit, 'acceleration');

    // Count provided values (excluding initial velocity which defaults to 0)
    const providedValues = [finalVelocity, time, height].filter(val => val !== '').length;
    const hasInitialVelocity = initialVelocity !== '';

    if (providedValues < 2) {
      setResult(null);
      setCalculation('Error: Please provide at least 2 values (final velocity, time, or height)');
      return;
    }

    // Validate inputs
    if (initialVelocity && (isNaN(v0) || v0 < 0)) {
      setResult(null);
      setCalculation('Error: Initial velocity must be a non-negative number');
      return;
    }
    if (finalVelocity && (isNaN(v) || v < 0)) {
      setResult(null);
      setCalculation('Error: Final velocity must be a non-negative number');
      return;
    }
    if (time && (isNaN(t) || t <= 0)) {
      setResult(null);
      setCalculation('Error: Time must be a positive number');
      return;
    }
    if (height && (isNaN(h) || h < 0)) {
      setResult(null);
      setCalculation('Error: Height must be a non-negative number');
      return;
    }
    if (isNaN(gValue) || gValue <= 0) {
      setResult(null);
      setCalculation('Error: Gravity must be a positive number');
      return;
    }

    const v0InMps = convertToBaseUnits(v0, initialVelocityUnit, 'velocity');

    // Calculate missing value
    if (!finalVelocity && time && height) {
      // Calculate final velocity: v² = v₀² + 2gh, so v = √(v₀² + 2gh)
      const tInSeconds = convertToBaseUnits(t, timeUnit, 'time');
      const hInMeters = convertToBaseUnits(h, heightUnit, 'distance');
      const vSquared = v0InMps * v0InMps + 2 * gInBase * hInMeters;
      
      if (vSquared < 0) {
        setResult(null);
        setCalculation('Error: Invalid combination of values (result would be imaginary)');
        return;
      }
      
      const vInMps = Math.sqrt(vSquared);
      const calculatedVelocity = convertFromBaseUnits(vInMps, finalVelocityUnit, 'velocity');
      
      setResult({ value: calculatedVelocity, unit: finalVelocityUnit, type: 'finalVelocity' });
      setCalculation(`v = √(v₀² + 2gh) = √(${formatValue(v0)}² + 2 × ${formatValue(gValue)} × ${formatValue(h)}) = ${formatValue(calculatedVelocity)} ${finalVelocityUnit}`);
    } else if (!time && finalVelocity && height) {
      // Calculate time: from v² = v₀² + 2gh, we can also use v = v₀ + gt, so t = (v - v₀) / g
      const vInMps = convertToBaseUnits(v, finalVelocityUnit, 'velocity');
      const hInMeters = convertToBaseUnits(h, heightUnit, 'distance');
      
      if (vInMps < v0InMps) {
        setResult(null);
        setCalculation('Error: Final velocity cannot be less than initial velocity in free fall');
        return;
      }
      
      const tInSeconds = (vInMps - v0InMps) / gInBase;
      const calculatedTime = convertFromBaseUnits(tInSeconds, timeUnit, 'time');
      
      setResult({ value: calculatedTime, unit: timeUnit, type: 'time' });
      setCalculation(`t = (v - v₀) / g = (${formatValue(v)} - ${formatValue(v0)}) / ${formatValue(gValue)} = ${formatValue(calculatedTime)} ${timeUnit}`);
    } else if (!height && finalVelocity && time) {
      // Calculate height: h = v₀t + (1/2)gt² or h = (v² - v₀²)/(2g)
      const vInMps = convertToBaseUnits(v, finalVelocityUnit, 'velocity');
      const tInSeconds = convertToBaseUnits(t, timeUnit, 'time');
      
      // Use h = v₀t + (1/2)gt²
      const hInMeters = v0InMps * tInSeconds + 0.5 * gInBase * tInSeconds * tInSeconds;
      const calculatedHeight = convertFromBaseUnits(hInMeters, heightUnit, 'distance');
      
      setResult({ value: calculatedHeight, unit: heightUnit, type: 'height' });
      setCalculation(`h = v₀t + (1/2)gt² = ${formatValue(v0)} × ${formatValue(t)} + 0.5 × ${formatValue(gValue)} × ${formatValue(t)}² = ${formatValue(calculatedHeight)} ${heightUnit}`);
    } else if (!finalVelocity && !time && height) {
      // Only height given - need one more value
      setResult(null);
      setCalculation('Error: Please provide at least one more value (final velocity or time)');
      return;
    } else if (!finalVelocity && !height && time) {
      // Only time given - calculate height and final velocity
      const tInSeconds = convertToBaseUnits(t, timeUnit, 'time');
      const vInMps = v0InMps + gInBase * tInSeconds;
      const hInMeters = v0InMps * tInSeconds + 0.5 * gInBase * tInSeconds * tInSeconds;
      
      const calculatedVelocity = convertFromBaseUnits(vInMps, finalVelocityUnit, 'velocity');
      const calculatedHeight = convertFromBaseUnits(hInMeters, heightUnit, 'distance');
      
      setResult({ value: calculatedVelocity, unit: finalVelocityUnit, type: 'finalVelocity' });
      setCalculation(`v = v₀ + gt = ${formatValue(v0)} + ${formatValue(gValue)} × ${formatValue(t)} = ${formatValue(calculatedVelocity)} ${finalVelocityUnit}\nh = v₀t + (1/2)gt² = ${formatValue(v0)} × ${formatValue(t)} + 0.5 × ${formatValue(gValue)} × ${formatValue(t)}² = ${formatValue(calculatedHeight)} ${heightUnit}`);
    } else {
      setResult(null);
      setCalculation('Error: Invalid combination of values. Please provide at least 2 of: final velocity, time, or height');
    }
  };

  const clearAll = () => {
    setInitialVelocity('');
    setFinalVelocity('');
    setTime('');
    setHeight('');
    setGravity('9.80665');
    setInitialVelocityUnit('m/s');
    setFinalVelocityUnit('m/s');
    setTimeUnit('s');
    setHeightUnit('m');
    setGravityUnit('m/s²');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Free Fall Calculator</h2>
        <p className="text-gray-600">Calculate free fall motion: velocity, time, height using gravity acceleration</p>
      </div>

      <div className="space-y-6">
        {/* Gravity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gravity (g)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter gravity (default: 9.80665 m/s²)"
                value={gravity}
                onChange={(e) => setGravity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={gravityUnit}
                onChange={(e) => setGravityUnit(e.target.value)}
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

        {/* Initial Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Velocity (v₀) - Optional
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial velocity (default: 0)"
                value={initialVelocity}
                onChange={(e) => setInitialVelocity(e.target.value)}
                className="w-full"
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

        {/* Final Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Final Velocity (v)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter final velocity (leave empty to calculate)"
                value={finalVelocity}
                onChange={(e) => setFinalVelocity(e.target.value)}
                className="w-full"
                autoFocus
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

        {/* Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Time (t)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter time (leave empty to calculate)"
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

        {/* Height Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Height / Distance (h)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter height/distance (leave empty to calculate)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
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
            {calculation && !calculation.startsWith('Error:') && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono break-words whitespace-pre-line`}>
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
            <li>• Enter gravity (default: 9.80665 m/s² for Earth)</li>
            <li>• Enter initial velocity (optional, defaults to 0 for true free fall)</li>
            <li>• Provide at least 2 of: final velocity, time, or height</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formulas: v = v₀ + gt, h = v₀t + (1/2)gt², v² = v₀² + 2gh</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

