'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors for force
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
};

// Unit conversion factors for distance
const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mile': { name: 'mile (Miles)', factor: 1609.34 },
  'yd': { name: 'yd (Yards)', factor: 0.9144 }
};

// Unit conversion factors for work/energy
const workUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'MJ': { name: 'MJ (Megajoules)', factor: 1000000 },
  'cal': { name: 'cal (Calories)', factor: 4.184 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 4184 },
  'Wh': { name: 'Wh (Watt-hours)', factor: 3600 },
  'kWh': { name: 'kWh (Kilowatt-hours)', factor: 3600000 },
  'eV': { name: 'eV (Electron volts)', factor: 1.60218e-19 },
  'ft·lb': { name: 'ft·lb (Foot-pounds)', factor: 1.35582 }
};

export default function WorkCalculator() {
  const [force, setForce] = useState('');
  const [distance, setDistance] = useState('');
  const [work, setWork] = useState('');
  const [forceUnit, setForceUnit] = useState('N');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [workUnit, setWorkUnit] = useState('J');
  const [angle, setAngle] = useState('0');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'force' | 'distance' | 'work' } | null>(null);
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

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertDistanceToBase = (value: number, unit: string) => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string) => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertWorkToBase = (value: number, unit: string) => {
    return value * workUnits[unit as keyof typeof workUnits].factor;
  };

  const convertWorkFromBase = (value: number, unit: string) => {
    return value / workUnits[unit as keyof typeof workUnits].factor;
  };

  const calculate = () => {
    const f = force ? parseFloat(force) : NaN;
    const d = distance ? parseFloat(distance) : NaN;
    const w = work ? parseFloat(work) : NaN;
    const theta = angle ? parseFloat(angle) : 0;
    const cosTheta = Math.cos((theta * Math.PI) / 180);

    const filledCount = [force, distance, work].filter(val => val !== '').length;

    if (filledCount === 0) {
      setResult(null);
      setCalculation('Please enter at least one value');
      return;
    }

    // Validate angle
    if (isNaN(theta) || theta < 0 || theta > 180) {
      setResult(null);
      setCalculation('Error: Angle must be between 0° and 180°');
      return;
    }

    // Validate inputs
    if (force && (isNaN(f) || f < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for force');
      return;
    }
    if (distance && (isNaN(d) || d < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for distance');
      return;
    }
    if (work && (isNaN(w) || w < 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid non-negative number for work');
      return;
    }

    try {
      if (!isNaN(f) && !isNaN(d)) {
        // Calculate work: W = F × d × cos(θ)
        const fBase = convertForceToBase(f, forceUnit);
        const dBase = convertDistanceToBase(d, distanceUnit);
        const wBase = fBase * dBase * cosTheta;
        const wResult = convertWorkFromBase(wBase, workUnit);

        setResult({ value: wResult, unit: workUnit, type: 'work' });
        const angleStr = theta === 0 ? '' : ` × cos(${formatValue(theta)}°)`;
        setCalculation(`W = F × d${angleStr} = ${formatValue(f)} ${forceUnit} × ${formatValue(d)} ${distanceUnit}${angleStr} = ${formatValue(wResult)} ${workUnit}`);
      } else if (!isNaN(w) && !isNaN(f)) {
        // Calculate distance: d = W / (F × cos(θ))
        const wBase = convertWorkToBase(w, workUnit);
        const fBase = convertForceToBase(f, forceUnit);

        if (fBase === 0 || cosTheta === 0) {
          setResult(null);
          setCalculation('Error: Cannot divide by zero. Check force and angle.');
          return;
        }

        const dBase = wBase / (fBase * cosTheta);
        const dResult = convertDistanceFromBase(dBase, distanceUnit);

        setResult({ value: dResult, unit: distanceUnit, type: 'distance' });
        const angleStr = theta === 0 ? '' : ` × cos(${formatValue(theta)}°)`;
        setCalculation(`d = W / (F${angleStr}) = ${formatValue(w)} ${workUnit} / (${formatValue(f)} ${forceUnit}${angleStr}) = ${formatValue(dResult)} ${distanceUnit}`);
      } else if (!isNaN(w) && !isNaN(d)) {
        // Calculate force: F = W / (d × cos(θ))
        const wBase = convertWorkToBase(w, workUnit);
        const dBase = convertDistanceToBase(d, distanceUnit);

        if (dBase === 0 || cosTheta === 0) {
          setResult(null);
          setCalculation('Error: Cannot divide by zero. Check distance and angle.');
          return;
        }

        const fBase = wBase / (dBase * cosTheta);
        const fResult = convertForceFromBase(fBase, forceUnit);

        setResult({ value: fResult, unit: forceUnit, type: 'force' });
        const angleStr = theta === 0 ? '' : ` × cos(${formatValue(theta)}°)`;
        setCalculation(`F = W / (d${angleStr}) = ${formatValue(w)} ${workUnit} / (${formatValue(d)} ${distanceUnit}${angleStr}) = ${formatValue(fResult)} ${forceUnit}`);
      } else {
        setResult(null);
        setCalculation('Please enter at least two values to calculate');
      }
    } catch (error) {
      setResult(null);
      setCalculation('Error: Invalid input values');
    }
  };

  const clearAll = () => {
    setForce('');
    setDistance('');
    setWork('');
    setForceUnit('N');
    setDistanceUnit('m');
    setWorkUnit('J');
    setAngle('0');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Calculator</h2>
        <p className="text-gray-600">Calculate work, force, or distance using W = F × d × cos(θ)</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">W = F × d × cos(θ)</p>
          <p className="text-sm text-gray-600 mt-1">Where: F = Force, d = Distance, θ = Angle</p>
        </div>

        {/* Force Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Force (F)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter force (leave empty to calculate)"
                value={force}
                onChange={(e) => setForce(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={forceUnit}
                onChange={(e) => setForceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(forceUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Distance Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Distance (d)
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

        {/* Work Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Work (W)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter work (leave empty to calculate)"
                value={work}
                onChange={(e) => setWork(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={workUnit}
                onChange={(e) => setWorkUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(workUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Angle Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Angle (θ) - Between Force and Displacement
          </label>
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter angle in degrees (default: 0°)"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="text-sm text-gray-600 whitespace-nowrap pb-2">
              {angle && !isNaN(parseFloat(angle)) && `cos(${parseFloat(angle).toFixed(2)}°) = ${Math.cos((parseFloat(angle) * Math.PI) / 180).toFixed(4)}`}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">0° = force in direction of motion, 90° = perpendicular, 180° = opposite</p>
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
            <li>• Enter any two values to calculate the third (Force, Distance, or Work)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: W = F × d × cos(θ) - Work-Energy Theorem</li>
            <li>• Angle (θ) is between force direction and displacement (default: 0°)</li>
            <li>• 0° = maximum work, 90° = zero work, 180° = negative work</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• All values should be non-negative numbers</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
