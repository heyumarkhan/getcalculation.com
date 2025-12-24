'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: rad/s)
const angularVelocityUnits = {
  'rad/s': { name: 'rad/s (Radians per second)', factor: 1 },
  'rad/min': { name: 'rad/min', factor: 1 / 60 },
  'rad/h': { name: 'rad/h', factor: 1 / 3600 },
  'deg/s': { name: 'deg/s (Degrees per second)', factor: Math.PI / 180 },
  'deg/min': { name: 'deg/min', factor: Math.PI / (180 * 60) },
  'deg/h': { name: 'deg/h', factor: Math.PI / (180 * 3600) },
  'rpm': { name: 'rpm (Revolutions per minute)', factor: 2 * Math.PI / 60 },
  'rps': { name: 'rps (Revolutions per second)', factor: 2 * Math.PI },
  'rph': { name: 'rph (Revolutions per hour)', factor: 2 * Math.PI / 3600 }
};

const angleUnits = {
  'rad': { name: 'rad (Radians)', factor: 1 },
  'deg': { name: 'deg (Degrees)', factor: Math.PI / 180 },
  'rev': { name: 'rev (Revolutions)', factor: 2 * Math.PI }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 }
};

const frequencyUnits = {
  'Hz': { name: 'Hz (Hertz)', factor: 1 },
  'kHz': { name: 'kHz', factor: 1000 },
  'MHz': { name: 'MHz', factor: 1000000 },
  'rpm': { name: 'rpm (Revolutions per minute)', factor: 1 / 60 },
  'rps': { name: 'rps (Revolutions per second)', factor: 1 }
};

const linearVelocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h', factor: 0.277778 },
  'mph': { name: 'mph', factor: 0.44704 },
  'ft/s': { name: 'ft/s', factor: 0.3048 },
  'cm/s': { name: 'cm/s', factor: 0.01 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 }
};

type CalculationMethod = 'angle-time' | 'frequency' | 'linear-velocity';

export default function AngularVelocityCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('angle-time');
  
  // Angle-time method
  const [angle, setAngle] = useState('');
  const [time, setTime] = useState('');
  const [angleUnit, setAngleUnit] = useState('rad');
  const [timeUnit, setTimeUnit] = useState('s');
  
  // Frequency method
  const [frequency, setFrequency] = useState('');
  const [frequencyUnit, setFrequencyUnit] = useState('Hz');
  
  // Linear velocity method
  const [linearVelocity, setLinearVelocity] = useState('');
  const [radius, setRadius] = useState('');
  const [linearVelocityUnit, setLinearVelocityUnit] = useState('m/s');
  const [radiusUnit, setRadiusUnit] = useState('m');
  
  const [angularVelocityUnit, setAngularVelocityUnit] = useState('rad/s');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
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

  const convertAngleToRadians = (value: number, unit: string) => {
    return value * angleUnits[unit as keyof typeof angleUnits].factor;
  };

  const convertTimeToSeconds = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertFrequencyToHz = (value: number, unit: string) => {
    return value * frequencyUnits[unit as keyof typeof frequencyUnits].factor;
  };

  const convertLinearVelocityToMps = (value: number, unit: string) => {
    return value * linearVelocityUnits[unit as keyof typeof linearVelocityUnits].factor;
  };

  const convertRadiusToMeters = (value: number, unit: string) => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertAngularVelocityFromBase = (value: number, unit: string) => {
    return value / angularVelocityUnits[unit as keyof typeof angularVelocityUnits].factor;
  };

  const calculate = () => {
    if (method === 'angle-time') {
      const θ = angle ? parseFloat(angle) : NaN;
      const t = time ? parseFloat(time) : NaN;

      if (!angle || !time) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(θ) || isNaN(t) || t === 0) {
        setResult(null);
        setCalculation('Error: Please enter valid numbers. Time cannot be zero.');
        return;
      }

      // Calculate angular velocity: ω = θ / t
      const angleInRadians = convertAngleToRadians(θ, angleUnit);
      const timeInSeconds = convertTimeToSeconds(t, timeUnit);
      const angularVelocityInRadps = angleInRadians / timeInSeconds;
      const angularVelocity = convertAngularVelocityFromBase(angularVelocityInRadps, angularVelocityUnit);
      
      setResult({ value: angularVelocity, unit: angularVelocityUnit });
      setCalculation(`ω = θ / t = ${formatValue(θ)} ${angleUnit} / ${formatValue(t)} ${timeUnit} = ${formatValue(angularVelocity)} ${angularVelocityUnit}`);
    } else if (method === 'frequency') {
      const f = frequency ? parseFloat(frequency) : NaN;

      if (!frequency) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(f) || f < 0) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative frequency.');
        return;
      }

      // Calculate angular velocity: ω = 2πf
      const frequencyInHz = convertFrequencyToHz(f, frequencyUnit);
      const angularVelocityInRadps = 2 * Math.PI * frequencyInHz;
      const angularVelocity = convertAngularVelocityFromBase(angularVelocityInRadps, angularVelocityUnit);
      
      setResult({ value: angularVelocity, unit: angularVelocityUnit });
      setCalculation(`ω = 2πf = 2π × ${formatValue(f)} ${frequencyUnit} = ${formatValue(angularVelocity)} ${angularVelocityUnit}`);
    } else if (method === 'linear-velocity') {
      const v = linearVelocity ? parseFloat(linearVelocity) : NaN;
      const r = radius ? parseFloat(radius) : NaN;

      if (!linearVelocity || !radius) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(v) || isNaN(r) || r === 0) {
        setResult(null);
        setCalculation('Error: Please enter valid numbers. Radius cannot be zero.');
        return;
      }

      // Calculate angular velocity: ω = v / r
      const velocityInMps = convertLinearVelocityToMps(v, linearVelocityUnit);
      const radiusInMeters = convertRadiusToMeters(r, radiusUnit);
      const angularVelocityInRadps = velocityInMps / radiusInMeters;
      const angularVelocity = convertAngularVelocityFromBase(angularVelocityInRadps, angularVelocityUnit);
      
      setResult({ value: angularVelocity, unit: angularVelocityUnit });
      setCalculation(`ω = v / r = ${formatValue(v)} ${linearVelocityUnit} / ${formatValue(r)} ${radiusUnit} = ${formatValue(angularVelocity)} ${angularVelocityUnit}`);
    }
  };

  const clearAll = () => {
    setAngle('');
    setTime('');
    setFrequency('');
    setLinearVelocity('');
    setRadius('');
    setAngularVelocityUnit('rad/s');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Angular Velocity Calculator</h2>
        <p className="text-gray-600">Calculate angular velocity using angle/time, frequency, or linear velocity/radius</p>
      </div>

      <div className="space-y-6">
        {/* Method Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Method
          </label>
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value as CalculationMethod);
              clearAll();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="angle-time">Angle and Time (ω = θ / t)</option>
            <option value="frequency">Frequency (ω = 2πf)</option>
            <option value="linear-velocity">Linear Velocity and Radius (ω = v / r)</option>
          </select>
        </div>

        {/* Angle-Time Method */}
        {method === 'angle-time' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Angular Displacement (θ)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter angular displacement"
                    value={angle}
                    onChange={(e) => setAngle(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={angleUnit}
                    onChange={(e) => setAngleUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(angleUnits).map(([key, unit]) => (
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
          </>
        )}

        {/* Frequency Method */}
        {method === 'frequency' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Frequency (f)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={frequencyUnit}
                  onChange={(e) => setFrequencyUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                >
                  {Object.entries(frequencyUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Linear Velocity Method */}
        {method === 'linear-velocity' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Linear Velocity (v)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter linear velocity"
                    value={linearVelocity}
                    onChange={(e) => setLinearVelocity(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={linearVelocityUnit}
                    onChange={(e) => setLinearVelocityUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(linearVelocityUnits).map(([key, unit]) => (
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
                Radius (r)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter radius"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-32">
                  <select
                    value={radiusUnit}
                    onChange={(e) => setRadiusUnit(e.target.value)}
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
          </>
        )}

        {/* Angular Velocity Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Angular Velocity Unit (Result)
          </label>
          <select
            value={angularVelocityUnit}
            onChange={(e) => setAngularVelocityUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(angularVelocityUnits).map(([key, unit]) => (
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
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono`}>
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
            {method === 'angle-time' && (
              <>
                <li>• Enter angular displacement (θ) and time (t)</li>
                <li>• Formula: ω = θ / t</li>
                <li>• Select appropriate units for angle and time</li>
              </>
            )}
            {method === 'frequency' && (
              <>
                <li>• Enter frequency (f)</li>
                <li>• Formula: ω = 2πf</li>
                <li>• Frequency can be in Hz, rpm, or other units</li>
              </>
            )}
            {method === 'linear-velocity' && (
              <>
                <li>• Enter linear velocity (v) and radius (r)</li>
                <li>• Formula: ω = v / r</li>
                <li>• Radius is the distance from the center of rotation</li>
              </>
            )}
            <li>• Select your preferred unit for angular velocity result</li>
            <li>• The calculator automatically converts between different units</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

