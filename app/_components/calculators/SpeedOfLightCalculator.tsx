'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Speed of light constant in m/s
const SPEED_OF_LIGHT = 299792458; // meters per second

// Unit conversion factors (all relative to base units: meters, seconds)
const distanceUnits = {
  'm': { name: 'Meters', factor: 1 },
  'km': { name: 'Kilometers', factor: 1000 },
  'cm': { name: 'Centimeters', factor: 0.01 },
  'mm': { name: 'Millimeters', factor: 0.001 },
  'ft': { name: 'Feet', factor: 0.3048 },
  'in': { name: 'Inches', factor: 0.0254 },
  'mi': { name: 'Miles', factor: 1609.34 },
  'yd': { name: 'Yards', factor: 0.9144 },
  'ly': { name: 'Light Years', factor: 9.461e15 },
  'au': { name: 'Astronomical Units', factor: 1.496e11 }
};

const timeUnits = {
  's': { name: 'Seconds', factor: 1 },
  'ms': { name: 'Milliseconds', factor: 0.001 },
  'μs': { name: 'Microseconds', factor: 1e-6 },
  'ns': { name: 'Nanoseconds', factor: 1e-9 },
  'min': { name: 'Minutes', factor: 60 },
  'h': { name: 'Hours', factor: 3600 },
  'day': { name: 'Days', factor: 86400 },
  'year': { name: 'Years', factor: 31536000 }
};

export default function SpeedOfLightCalculator() {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'distance' | 'time' } | null>(null);
  const [calculation, setCalculation] = useState('');

  const formatValue = (value: number): string => {
    if (Math.abs(value) === Infinity || isNaN(value)) {
      return 'Invalid';
    }
    if (Math.abs(value) < 1e-10) {
      return '0';
    }
    if (Math.abs(value) >= 1e9) {
      return value.toExponential(4);
    }
    if (Math.abs(value) < 0.0001) {
      return value.toExponential(4);
    }
    return value.toLocaleString('en-US', { maximumFractionDigits: 6, useGrouping: true });
  };

  const convertToBaseUnits = (value: number, unit: string, type: 'distance' | 'time') => {
    if (type === 'distance') {
      return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    } else {
      return value * timeUnits[unit as keyof typeof timeUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'distance' | 'time') => {
    if (type === 'distance') {
      return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
    } else {
      return value / timeUnits[unit as keyof typeof timeUnits].factor;
    }
  };

  const calculate = () => {
    const d = distance.trim();
    const t = time.trim();

    if (d && !t) {
      // Calculate time: t = d/c
      const distanceValue = parseFloat(d);
      if (isNaN(distanceValue) || distanceValue < 0) {
        setResult(null);
        setCalculation('');
        return;
      }
      const distanceInMeters = convertToBaseUnits(distanceValue, distanceUnit, 'distance');
      const timeInSeconds = distanceInMeters / SPEED_OF_LIGHT;
      const calculatedTime = convertFromBaseUnits(timeInSeconds, timeUnit, 'time');
      
      setResult({ value: calculatedTime, unit: timeUnit, type: 'time' });
      setCalculation(`Time = Distance ÷ Speed of Light\nTime = ${d} ${distanceUnit} ÷ ${SPEED_OF_LIGHT.toExponential(4)} m/s\nTime = ${formatValue(calculatedTime)} ${timeUnit}`);
    } else if (t && !d) {
      // Calculate distance: d = c × t
      const timeValue = parseFloat(t);
      if (isNaN(timeValue) || timeValue < 0) {
        setResult(null);
        setCalculation('');
        return;
      }
      const timeInSeconds = convertToBaseUnits(timeValue, timeUnit, 'time');
      const distanceInMeters = SPEED_OF_LIGHT * timeInSeconds;
      const calculatedDistance = convertFromBaseUnits(distanceInMeters, distanceUnit, 'distance');
      
      setResult({ value: calculatedDistance, unit: distanceUnit, type: 'distance' });
      setCalculation(`Distance = Speed of Light × Time\nDistance = ${SPEED_OF_LIGHT.toExponential(4)} m/s × ${t} ${timeUnit}\nDistance = ${formatValue(calculatedDistance)} ${distanceUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setDistance('');
    setTime('');
    setDistanceUnit('m');
    setTimeUnit('s');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Speed of Light Calculator</h2>
        <p className="text-gray-600">Calculate distance traveled by light or time for light to travel a distance</p>
        <p className="text-sm text-gray-500 mt-2">Speed of Light (c) = {SPEED_OF_LIGHT.toLocaleString()} m/s</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Distance
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter distance (leave empty to calculate)"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full"
                autoFocus
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Time
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
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">
              {result.type === 'distance' ? 'Distance Traveled' : 'Time Required'}
            </h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <div className="mt-3 p-3 bg-white rounded border border-[#820ECC]/20">
                <p className="text-sm text-gray-700 font-mono whitespace-pre-line">
                  {calculation}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter either distance or time (leave the other empty)</li>
            <li>• The calculator will compute the missing value using the speed of light</li>
            <li>• Speed of light (c) = 299,792,458 m/s</li>
            <li>• Select your preferred units for distance and time</li>
            <li>• The calculator automatically converts between different units</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

