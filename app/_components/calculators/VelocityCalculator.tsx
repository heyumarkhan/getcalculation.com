'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function VelocityCalculator() {
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [velocity, setVelocity] = useState('');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [calculation, setCalculation] = useState('');

  const calculateVelocity = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);
    const v = parseFloat(velocity);

    if (distance && time && !velocity) {
      // Calculate velocity: v = d/t
      const calculatedVelocity = d / t;
      setResult({ value: calculatedVelocity, unit: 'm/s' });
      setCalculation(`Velocity = Distance ÷ Time = ${d} ÷ ${t} = ${calculatedVelocity.toFixed(2)} m/s`);
    } else if (distance && velocity && !time) {
      // Calculate time: t = d/v
      const calculatedTime = d / v;
      setResult({ value: calculatedTime, unit: 's' });
      setCalculation(`Time = Distance ÷ Velocity = ${d} ÷ ${v} = ${calculatedTime.toFixed(2)} s`);
    } else if (time && velocity && !distance) {
      // Calculate distance: d = v × t
      const calculatedDistance = v * t;
      setResult({ value: calculatedDistance, unit: 'm' });
      setCalculation(`Distance = Velocity × Time = ${v} × ${t} = ${calculatedDistance.toFixed(2)} m`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setDistance('');
    setTime('');
    setVelocity('');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Velocity Calculator</h2>
        <p className="text-gray-600">Calculate velocity, distance, or time using the formula: v = d/t</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance (m)
          </label>
          <Input
            type="number"
            placeholder="Enter distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time (s)
          </label>
          <Input
            type="number"
            placeholder="Enter time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Velocity (m/s)
          </label>
          <Input
            type="number"
            placeholder="Enter velocity"
            value={velocity}
            onChange={(e) => setVelocity(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
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
            <li>• Use consistent units (meters for distance, seconds for time)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
