'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: rad/s²)
const angularAccelerationUnits = {
  'rad/s²': { name: 'rad/s² (Radians per second squared)', factor: 1 },
  'deg/s²': { name: 'deg/s² (Degrees per second squared)', factor: Math.PI / 180 },
  'rev/s²': { name: 'rev/s² (Revolutions per second squared)', factor: 2 * Math.PI },
  'rev/min²': { name: 'rev/min² (Revolutions per minute squared)', factor: 2 * Math.PI / 3600 },
  'rpm/s': { name: 'rpm/s', factor: 2 * Math.PI / 60 }
};

const angularVelocityUnits = {
  'rad/s': { name: 'rad/s (Radians per second)', factor: 1 },
  'deg/s': { name: 'deg/s (Degrees per second)', factor: Math.PI / 180 },
  'rpm': { name: 'rpm (Revolutions per minute)', factor: 2 * Math.PI / 60 },
  'rps': { name: 'rps (Revolutions per second)', factor: 2 * Math.PI },
  'rad/min': { name: 'rad/min', factor: 1 / 60 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 }
};

const torqueUnits = {
  'N·m': { name: 'N·m (Newton-meters)', factor: 1 },
  'lb·ft': { name: 'lb·ft (Pound-feet)', factor: 1.35582 },
  'kg·m': { name: 'kg·m (Kilogram-meters)', factor: 9.80665 },
  'dyn·cm': { name: 'dyn·cm', factor: 0.0000001 }
};

const momentOfInertiaUnits = {
  'kg·m²': { name: 'kg·m² (Kilogram-meter squared)', factor: 1 },
  'g·cm²': { name: 'g·cm²', factor: 0.0000001 },
  'lb·ft²': { name: 'lb·ft²', factor: 0.0421401 }
};

type CalculationMethod = 'velocity-time' | 'torque-inertia';

export default function AngularAccelerationCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('velocity-time');
  
  // Velocity-time method
  const [initialVelocity, setInitialVelocity] = useState('');
  const [finalVelocity, setFinalVelocity] = useState('');
  const [time, setTime] = useState('');
  const [initialVelocityUnit, setInitialVelocityUnit] = useState('rad/s');
  const [finalVelocityUnit, setFinalVelocityUnit] = useState('rad/s');
  const [timeUnit, setTimeUnit] = useState('s');
  
  // Torque-inertia method
  const [torque, setTorque] = useState('');
  const [momentOfInertia, setMomentOfInertia] = useState('');
  const [torqueUnit, setTorqueUnit] = useState('N·m');
  const [momentOfInertiaUnit, setMomentOfInertiaUnit] = useState('kg·m²');
  
  const [angularAccelerationUnit, setAngularAccelerationUnit] = useState('rad/s²');
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

  const convertAngularVelocityToRadps = (value: number, unit: string) => {
    return value * angularVelocityUnits[unit as keyof typeof angularVelocityUnits].factor;
  };

  const convertTimeToSeconds = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTorqueToNm = (value: number, unit: string) => {
    return value * torqueUnits[unit as keyof typeof torqueUnits].factor;
  };

  const convertMomentOfInertiaToKgm2 = (value: number, unit: string) => {
    return value * momentOfInertiaUnits[unit as keyof typeof momentOfInertiaUnits].factor;
  };

  const convertAngularAccelerationFromBase = (value: number, unit: string) => {
    return value / angularAccelerationUnits[unit as keyof typeof angularAccelerationUnits].factor;
  };

  const calculate = () => {
    if (method === 'velocity-time') {
      const ω0 = initialVelocity ? parseFloat(initialVelocity) : NaN;
      const ωf = finalVelocity ? parseFloat(finalVelocity) : NaN;
      const t = time ? parseFloat(time) : NaN;

      if (!initialVelocity || !finalVelocity || !time) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(ω0) || isNaN(ωf) || isNaN(t) || t === 0) {
        setResult(null);
        setCalculation('Error: Please enter valid numbers. Time cannot be zero.');
        return;
      }

      // Calculate angular acceleration: α = (ωf - ω0) / t
      const initialVelocityInRadps = convertAngularVelocityToRadps(ω0, initialVelocityUnit);
      const finalVelocityInRadps = convertAngularVelocityToRadps(ωf, finalVelocityUnit);
      const timeInSeconds = convertTimeToSeconds(t, timeUnit);
      const angularAccelerationInRadps2 = (finalVelocityInRadps - initialVelocityInRadps) / timeInSeconds;
      const angularAcceleration = convertAngularAccelerationFromBase(angularAccelerationInRadps2, angularAccelerationUnit);
      
      setResult({ value: angularAcceleration, unit: angularAccelerationUnit });
      setCalculation(`α = (ωf - ω0) / t = (${formatValue(ωf)} ${finalVelocityUnit} - ${formatValue(ω0)} ${initialVelocityUnit}) / ${formatValue(t)} ${timeUnit} = ${formatValue(angularAcceleration)} ${angularAccelerationUnit}`);
    } else if (method === 'torque-inertia') {
      const τ = torque ? parseFloat(torque) : NaN;
      const I = momentOfInertia ? parseFloat(momentOfInertia) : NaN;

      if (!torque || !momentOfInertia) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(τ) || isNaN(I) || I === 0) {
        setResult(null);
        setCalculation('Error: Please enter valid numbers. Moment of inertia cannot be zero.');
        return;
      }

      // Calculate angular acceleration: α = τ / I
      const torqueInNm = convertTorqueToNm(τ, torqueUnit);
      const momentOfInertiaInKgm2 = convertMomentOfInertiaToKgm2(I, momentOfInertiaUnit);
      const angularAccelerationInRadps2 = torqueInNm / momentOfInertiaInKgm2;
      const angularAcceleration = convertAngularAccelerationFromBase(angularAccelerationInRadps2, angularAccelerationUnit);
      
      setResult({ value: angularAcceleration, unit: angularAccelerationUnit });
      setCalculation(`α = τ / I = ${formatValue(τ)} ${torqueUnit} / ${formatValue(I)} ${momentOfInertiaUnit} = ${formatValue(angularAcceleration)} ${angularAccelerationUnit}`);
    }
  };

  const clearAll = () => {
    setInitialVelocity('');
    setFinalVelocity('');
    setTime('');
    setTorque('');
    setMomentOfInertia('');
    setAngularAccelerationUnit('rad/s²');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Angular Acceleration Calculator</h2>
        <p className="text-gray-600">Calculate angular acceleration using velocity change or torque and moment of inertia</p>
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
            <option value="velocity-time">Velocity Change and Time (α = Δω / t)</option>
            <option value="torque-inertia">Torque and Moment of Inertia (α = τ / I)</option>
          </select>
        </div>

        {/* Velocity-Time Method */}
        {method === 'velocity-time' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Initial Angular Velocity (ω₀)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter initial angular velocity"
                    value={initialVelocity}
                    onChange={(e) => setInitialVelocity(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={initialVelocityUnit}
                    onChange={(e) => setInitialVelocityUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(angularVelocityUnits).map(([key, unit]) => (
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
                Final Angular Velocity (ωf)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter final angular velocity"
                    value={finalVelocity}
                    onChange={(e) => setFinalVelocity(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={finalVelocityUnit}
                    onChange={(e) => setFinalVelocityUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(angularVelocityUnits).map(([key, unit]) => (
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

        {/* Torque-Inertia Method */}
        {method === 'torque-inertia' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Torque (τ)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter torque"
                    value={torque}
                    onChange={(e) => setTorque(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={torqueUnit}
                    onChange={(e) => setTorqueUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(torqueUnits).map(([key, unit]) => (
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
                Moment of Inertia (I)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter moment of inertia"
                    value={momentOfInertia}
                    onChange={(e) => setMomentOfInertia(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={momentOfInertiaUnit}
                    onChange={(e) => setMomentOfInertiaUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(momentOfInertiaUnits).map(([key, unit]) => (
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

        {/* Angular Acceleration Unit Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Angular Acceleration Unit (Result)
          </label>
          <select
            value={angularAccelerationUnit}
            onChange={(e) => setAngularAccelerationUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            {Object.entries(angularAccelerationUnits).map(([key, unit]) => (
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
            {method === 'velocity-time' && (
              <>
                <li>• Enter initial angular velocity (ω₀), final angular velocity (ωf), and time (t)</li>
                <li>• Formula: α = (ωf - ω₀) / t</li>
                <li>• Select appropriate units for angular velocity and time</li>
              </>
            )}
            {method === 'torque-inertia' && (
              <>
                <li>• Enter torque (τ) and moment of inertia (I)</li>
                <li>• Formula: α = τ / I</li>
                <li>• Torque is the rotational force applied</li>
                <li>• Moment of inertia is the resistance to rotational acceleration</li>
              </>
            )}
            <li>• Select your preferred unit for angular acceleration result</li>
            <li>• The calculator automatically converts between different units</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
