'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m, s, m/s)
const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 },
  'yd': { name: 'yd (Yards)', factor: 0.9144 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 }
};

const speedOfSoundUnits = {
  'm/s': { name: 'm/s (Meters/second)', factor: 1 },
  'ft/s': { name: 'ft/s (Feet/second)', factor: 0.3048 },
  'km/h': { name: 'km/h (Kilometers/hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles/hour)', factor: 0.44704 }
};

const SPEED_OF_SOUND_DEFAULT = 343; // m/s at sea level, 20°C

export default function LightningDistanceCalculator() {
  const [timeDelay, setTimeDelay] = useState('');
  const [distance, setDistance] = useState('');
  const [speedOfSound, setSpeedOfSound] = useState('343');
  const [timeUnit, setTimeUnit] = useState('s');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [speedUnit, setSpeedUnit] = useState('m/s');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'distance' | 'time' } | null>(null);
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

  const convertToBase = (value: number, unit: string, type: 'distance' | 'time' | 'speed') => {
    if (type === 'distance') return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    if (type === 'time') return value * timeUnits[unit as keyof typeof timeUnits].factor;
    if (type === 'speed') return value * speedOfSoundUnits[unit as keyof typeof speedOfSoundUnits].factor;
    return value;
  };

  const convertFromBase = (value: number, unit: string, type: 'distance' | 'time' | 'speed') => {
    if (type === 'distance') return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
    if (type === 'time') return value / timeUnits[unit as keyof typeof timeUnits].factor;
    if (type === 'speed') return value / speedOfSoundUnits[unit as keyof typeof speedOfSoundUnits].factor;
    return value;
  };

  const calculate = () => {
    const t = timeDelay ? parseFloat(timeDelay) : NaN;
    const d = distance ? parseFloat(distance) : NaN;
    const v = speedOfSound ? parseFloat(speedOfSound) : SPEED_OF_SOUND_DEFAULT;

    if (!timeDelay && !distance) {
      setResult(null);
      setCalculation('Error: Please enter either time delay or distance');
      return;
    }

    if (timeDelay && (isNaN(t) || t <= 0)) {
      setResult(null);
      setCalculation('Error: Time delay must be a positive number');
      return;
    }
    if (distance && (isNaN(d) || d <= 0)) {
      setResult(null);
      setCalculation('Error: Distance must be a positive number');
      return;
    }
    if (isNaN(v) || v <= 0) {
      setResult(null);
      setCalculation('Error: Speed of sound must be a positive number');
      return;
    }

    // Convert to base units
    const vBase = convertToBase(v, speedUnit, 'speed');

    if (!distance) {
      // Calculate distance: d = v × t
      const tBase = convertToBase(t, timeUnit, 'time');
      const dCalculated = vBase * tBase;
      const dResult = convertFromBase(dCalculated, distanceUnit, 'distance');
      setResult({ value: dResult, unit: distanceUnit, type: 'distance' });
      setCalculation(`d = v × t = ${formatValue(v)} ${speedUnit} × ${formatValue(t)} ${timeUnit} = ${formatValue(dResult)} ${distanceUnit}`);
    } else if (!timeDelay) {
      // Calculate time: t = d / v
      const dBase = convertToBase(d, distanceUnit, 'distance');
      if (vBase === 0) {
        setResult(null);
        setCalculation('Error: Speed of sound cannot be zero');
        return;
      }
      const tCalculated = dBase / vBase;
      const tResult = convertFromBase(tCalculated, timeUnit, 'time');
      setResult({ value: tResult, unit: timeUnit, type: 'time' });
      setCalculation(`t = d / v = ${formatValue(d)} ${distanceUnit} / ${formatValue(v)} ${speedUnit} = ${formatValue(tResult)} ${timeUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setTimeDelay('');
    setDistance('');
    setSpeedOfSound('343');
    setTimeUnit('s');
    setDistanceUnit('m');
    setSpeedUnit('m/s');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lightning Distance Calculator</h2>
        <p className="text-gray-600">Calculate distance to lightning strike from time delay between flash and thunder</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">d = v × t</p>
          <p className="text-xs text-gray-600 mt-1">Where: d = distance, v = speed of sound, t = time delay</p>
        </div>

        {/* Time Delay Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Time Delay (t) - Between Flash and Thunder
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter time delay (leave empty to calculate)"
                value={timeDelay}
                onChange={(e) => setTimeDelay(e.target.value)}
                className="w-full"
                autoFocus
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
          <p className="text-xs text-gray-500 mt-1">Count seconds between seeing the lightning flash and hearing the thunder</p>
        </div>

        {/* Distance Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Distance (d) - To Lightning Strike
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

        {/* Speed of Sound Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Speed of Sound (v)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter speed of sound (default: 343 m/s)"
                value={speedOfSound}
                onChange={(e) => setSpeedOfSound(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={speedUnit}
                onChange={(e) => setSpeedUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(speedOfSoundUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Default: 343 m/s (at sea level, 20°C). Speed varies with temperature and altitude.</p>
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
            <li>• Enter time delay between seeing lightning flash and hearing thunder (most common use)</li>
            <li>• Or enter distance to calculate the expected time delay</li>
            <li>• Formula: d = v × t (Distance = Speed of Sound × Time Delay)</li>
            <li>• Default speed of sound: 343 m/s (at sea level, 20°C)</li>
            <li>• Rule of thumb: Divide time in seconds by 3 to get approximate distance in kilometers</li>
            <li>• Or multiply time in seconds by 340 to get approximate distance in meters</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All input values should be valid positive numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

