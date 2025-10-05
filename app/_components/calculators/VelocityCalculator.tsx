'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: meters, seconds, m/s)
const distanceUnits = {
  'm': { name: 'Meters', factor: 1 },
  'km': { name: 'Kilometers', factor: 1000 },
  'cm': { name: 'Centimeters', factor: 0.01 },
  'mm': { name: 'Millimeters', factor: 0.001 },
  'ft': { name: 'Feet', factor: 0.3048 },
  'in': { name: 'Inches', factor: 0.0254 },
  'mi': { name: 'Miles', factor: 1609.34 },
  'yd': { name: 'Yards', factor: 0.9144 }
};

const timeUnits = {
  's': { name: 'Seconds', factor: 1 },
  'min': { name: 'Minutes', factor: 60 },
  'h': { name: 'Hours', factor: 3600 },
  'ms': { name: 'Milliseconds', factor: 0.001 },
  'day': { name: 'Days', factor: 86400 }
};

const velocityUnits = {
  'm/s': { name: 'm/s', factor: 1 },
  'km/h': { name: 'km/h', factor: 0.277778 },
  'mph': { name: 'mph', factor: 0.44704 },
  'ft/s': { name: 'ft/s', factor: 0.3048 },
  'in/s': { name: 'in/s', factor: 0.0254 },
  'mi/h': { name: 'mi/h', factor: 0.44704 }
};

export default function VelocityCalculator() {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [velocity, setVelocity] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const convertToBaseUnits = (value: number, unit: string, type: 'distance' | 'time' | 'velocity') => {
    if (type === 'distance') {
      return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    } else if (type === 'time') {
      return value * timeUnits[unit as keyof typeof timeUnits].factor;
    } else {
      return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'distance' | 'time' | 'velocity') => {
    if (type === 'distance') {
      return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
    } else if (type === 'time') {
      return value / timeUnits[unit as keyof typeof timeUnits].factor;
    } else {
      return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
    }
  };

  const calculateVelocity = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);
    const v = parseFloat(velocity);

    if (distance && time && !velocity) {
      // Calculate velocity: v = d/t
      const distanceInMeters = convertToBaseUnits(d, distanceUnit, 'distance');
      const timeInSeconds = convertToBaseUnits(t, timeUnit, 'time');
      const calculatedVelocityInMps = distanceInMeters / timeInSeconds;
      const calculatedVelocity = convertFromBaseUnits(calculatedVelocityInMps, velocityUnit, 'velocity');
      
      setResult({ value: calculatedVelocity, unit: velocityUnit });
      setCalculation(`Velocity = Distance ÷ Time = ${d} ${distanceUnit} ÷ ${t} ${timeUnit} = ${calculatedVelocity.toFixed(2)} ${velocityUnit}`);
    } else if (distance && velocity && !time) {
      // Calculate time: t = d/v
      const distanceInMeters = convertToBaseUnits(d, distanceUnit, 'distance');
      const velocityInMps = convertToBaseUnits(v, velocityUnit, 'velocity');
      const calculatedTimeInSeconds = distanceInMeters / velocityInMps;
      const calculatedTime = convertFromBaseUnits(calculatedTimeInSeconds, timeUnit, 'time');
      
      setResult({ value: calculatedTime, unit: timeUnit });
      setCalculation(`Time = Distance ÷ Velocity = ${d} ${distanceUnit} ÷ ${v} ${velocityUnit} = ${calculatedTime.toFixed(2)} ${timeUnit}`);
    } else if (time && velocity && !distance) {
      // Calculate distance: d = v × t
      const timeInSeconds = convertToBaseUnits(t, timeUnit, 'time');
      const velocityInMps = convertToBaseUnits(v, velocityUnit, 'velocity');
      const calculatedDistanceInMeters = velocityInMps * timeInSeconds;
      const calculatedDistance = convertFromBaseUnits(calculatedDistanceInMeters, distanceUnit, 'distance');
      
      setResult({ value: calculatedDistance, unit: distanceUnit });
      setCalculation(`Distance = Velocity × Time = ${v} ${velocityUnit} × ${t} ${timeUnit} = ${calculatedDistance.toFixed(2)} ${distanceUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setDistance('');
    setTime('');
    setVelocity('');
    setDistanceUnit('m');
    setTimeUnit('s');
    setVelocityUnit('m/s');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Velocity Calculator</h2>
        <p className="text-gray-600">Calculate velocity, distance, or time using the formula: v = d/t</p>
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
                placeholder="Enter distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-32">
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
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
            Velocity
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter velocity"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
              <select
                value={velocityUnit}
                onChange={(e) => setVelocityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
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

        <div className="flex gap-3 pt-2">
          <Button onClick={calculateVelocity} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Result</h3>
            <p className="text-2xl font-bold text-blue-700">
              {result.value.toFixed(2)} {result.unit}
            </p>
            {calculation && (
              <p className="text-sm text-blue-600 mt-2 font-mono">
                {calculation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter any two values to calculate the third</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• You can mix different units (e.g., kilometers and hours)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
