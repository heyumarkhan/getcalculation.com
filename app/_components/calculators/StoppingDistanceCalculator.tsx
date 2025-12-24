'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m/s, m, s, m/s²)
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
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 }
};

const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters/second²)', factor: 1 },
  'ft/s²': { name: 'ft/s² (Feet/second²)', factor: 0.3048 },
  'g': { name: 'g (Standard Gravity)', factor: 9.80665 }
};

export default function StoppingDistanceCalculator() {
  const [velocity, setVelocity] = useState('');
  const [reactionTime, setReactionTime] = useState('');
  const [deceleration, setDeceleration] = useState('');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [accelerationUnit, setAccelerationUnit] = useState('m/s²');
  const [result, setResult] = useState<{
    reactionDistance: number;
    brakingDistance: number;
    totalStoppingDistance: number;
  } | null>(null);
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

  const convertToBase = (value: number, unit: string, type: 'velocity' | 'distance' | 'time' | 'acceleration') => {
    if (type === 'velocity') return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    if (type === 'distance') return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    if (type === 'time') return value * timeUnits[unit as keyof typeof timeUnits].factor;
    if (type === 'acceleration') return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    return value;
  };

  const convertFromBase = (value: number, unit: string, type: 'velocity' | 'distance' | 'time' | 'acceleration') => {
    if (type === 'velocity') return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
    if (type === 'distance') return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
    if (type === 'time') return value / timeUnits[unit as keyof typeof timeUnits].factor;
    if (type === 'acceleration') return value / accelerationUnits[unit as keyof typeof accelerationUnits].factor;
    return value;
  };

  const calculate = () => {
    const v = velocity ? parseFloat(velocity) : NaN;
    const t = reactionTime ? parseFloat(reactionTime) : NaN;
    const a = deceleration ? parseFloat(deceleration) : NaN;

    if (!velocity) {
      setResult(null);
      setCalculation('Error: Please enter velocity');
      return;
    }

    if (isNaN(v) || v <= 0) {
      setResult(null);
      setCalculation('Error: Velocity must be a positive number');
      return;
    }

    // Convert to base units
    const vBase = convertToBase(v, velocityUnit, 'velocity');
    
    // Default reaction time if not provided (typical: 0.75-1.5 seconds)
    const tBase = t && !isNaN(t) && t > 0 
      ? convertToBase(t, timeUnit, 'time')
      : 1.0; // Default 1 second

    // Default deceleration if not provided (typical: 6-8 m/s² for cars)
    const aBase = a && !isNaN(a) && a > 0
      ? convertToBase(a, accelerationUnit, 'acceleration')
      : 7.0; // Default 7 m/s²

    // Calculate reaction distance: d_reaction = v × t
    const reactionDistanceBase = vBase * tBase;
    const reactionDistance = convertFromBase(reactionDistanceBase, distanceUnit, 'distance');

    // Calculate braking distance: d_braking = v²/(2a)
    const brakingDistanceBase = (vBase * vBase) / (2 * aBase);
    const brakingDistance = convertFromBase(brakingDistanceBase, distanceUnit, 'distance');

    // Total stopping distance
    const totalStoppingDistanceBase = reactionDistanceBase + brakingDistanceBase;
    const totalStoppingDistance = convertFromBase(totalStoppingDistanceBase, distanceUnit, 'distance');

    setResult({
      reactionDistance,
      brakingDistance,
      totalStoppingDistance
    });

    const tDisplay = t && !isNaN(t) && t > 0 ? formatValue(t) : '1.0 (default)';
    const aDisplay = a && !isNaN(a) && a > 0 ? formatValue(a) : '7.0 (default)';
    const timeUnitDisplay = t && !isNaN(t) && t > 0 ? timeUnit : 's';
    const accelUnitDisplay = a && !isNaN(a) && a > 0 ? accelerationUnit : 'm/s²';

    let calcText = `Given: v = ${formatValue(v)} ${velocityUnit}`;
    if (t && !isNaN(t) && t > 0) {
      calcText += `, t_reaction = ${formatValue(t)} ${timeUnit}`;
    } else {
      calcText += `, t_reaction = 1.0 s (default)`;
    }
    if (a && !isNaN(a) && a > 0) {
      calcText += `, a = ${formatValue(a)} ${accelUnitDisplay}`;
    } else {
      calcText += `, a = 7.0 m/s² (default)`;
    }
    calcText += `\n\n`;

    calcText += `Reaction Distance: d_reaction = v × t = ${formatValue(v)} ${velocityUnit} × ${tDisplay} ${timeUnitDisplay} = ${formatValue(reactionDistance)} ${distanceUnit}\n`;
    calcText += `Braking Distance: d_braking = v²/(2a) = (${formatValue(v)} ${velocityUnit})²/(2 × ${aDisplay} ${accelUnitDisplay}) = ${formatValue(brakingDistance)} ${distanceUnit}\n`;
    calcText += `Total Stopping Distance: d_total = d_reaction + d_braking = ${formatValue(reactionDistance)} + ${formatValue(brakingDistance)} = ${formatValue(totalStoppingDistance)} ${distanceUnit}`;

    setCalculation(calcText);
  };

  const clearAll = () => {
    setVelocity('');
    setReactionTime('');
    setDeceleration('');
    setVelocityUnit('m/s');
    setDistanceUnit('m');
    setTimeUnit('s');
    setAccelerationUnit('m/s²');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Stopping Distance Calculator</h2>
        <p className="text-gray-600">Calculate reaction distance, braking distance, and total stopping distance</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formulas:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            d_reaction = v × t | d_braking = v²/(2a) | d_total = d_reaction + d_braking
          </p>
        </div>

        {/* Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Velocity (v) *
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter velocity"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full"
                autoFocus
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

        {/* Reaction Time Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Reaction Time (t) - Optional
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter reaction time (default: 1.0 s)"
                value={reactionTime}
                onChange={(e) => setReactionTime(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
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
          <p className="text-xs text-gray-500 mt-1">Typical reaction time: 0.75-1.5 seconds</p>
        </div>

        {/* Deceleration Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Deceleration (a) - Optional
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter deceleration (default: 7.0 m/s²)"
                value={deceleration}
                onChange={(e) => setDeceleration(e.target.value)}
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
          <p className="text-xs text-gray-500 mt-1">Typical deceleration: 6-8 m/s² for cars on dry road</p>
        </div>

        {/* Distance Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Result Distance Unit
          </label>
          <select
            value={distanceUnit}
            onChange={(e) => setDistanceUnit(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(distanceUnits).map(([key, unit]) => (
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

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-3">Results</h3>
            <div className="space-y-2">
              <p className="text-lg font-bold text-[#820ECC]">
                Reaction Distance: {formatValue(result.reactionDistance)} {distanceUnit}
              </p>
              <p className="text-lg font-bold text-[#820ECC]">
                Braking Distance: {formatValue(result.brakingDistance)} {distanceUnit}
              </p>
              <p className="text-xl font-bold text-[#820ECC]">
                Total Stopping Distance: {formatValue(result.totalStoppingDistance)} {distanceUnit}
              </p>
            </div>
            {calculation && !calculation.startsWith('Error:') && (
              <p className="text-sm text-[#820ECC]/80 mt-4 font-mono break-words whitespace-pre-line">
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
            <li>• Enter velocity (required)</li>
            <li>• Optionally enter reaction time (default: 1.0 s) and deceleration (default: 7.0 m/s²)</li>
            <li>• Formulas: Reaction Distance = v × t, Braking Distance = v²/(2a), Total = Reaction + Braking</li>
            <li>• Typical reaction time: 0.75-1.5 seconds for alert drivers</li>
            <li>• Typical deceleration: 6-8 m/s² for cars on dry road, 3-4 m/s² on wet road</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All input values should be valid positive numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

