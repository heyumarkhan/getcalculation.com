'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m/s, m, s, kg, J)
const velocityUnits = {
  'm/s': { name: 'm/s (Meters/second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers/hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles/hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet/second)', factor: 0.3048 },
  'fps': { name: 'fps (Feet per second)', factor: 0.3048 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'yd': { name: 'yd (Yards)', factor: 0.9144 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 }
};

const massUnits = {
  'g': { name: 'g (Grams)', factor: 0.001 },
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
  'gr': { name: 'gr (Grains)', factor: 0.0000647989 }
};

const energyUnits = {
  'J': { name: 'J (Joules)', factor: 1 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 1000 },
  'ft-lb': { name: 'ft-lb (Foot-pounds)', factor: 1.35582 }
};

type CalculationMode = 'distanceTime' | 'kineticEnergy';

export default function ArrowSpeedCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('distanceTime');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [arrowSpeed, setArrowSpeed] = useState('');
  const [kineticEnergy, setKineticEnergy] = useState('');
  const [arrowMass, setArrowMass] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [timeUnit, setTimeUnit] = useState('s');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [massUnit, setMassUnit] = useState('g');
  const [energyUnit, setEnergyUnit] = useState('J');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'speed' | 'distance' | 'time' | 'energy' | 'mass' } | null>(null);
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

  const convertToBase = (value: number, unit: string, type: 'velocity' | 'distance' | 'time' | 'mass' | 'energy') => {
    if (type === 'velocity') return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
    if (type === 'distance') return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
    if (type === 'time') return value * timeUnits[unit as keyof typeof timeUnits].factor;
    if (type === 'mass') return value * massUnits[unit as keyof typeof massUnits].factor;
    if (type === 'energy') return value * energyUnits[unit as keyof typeof energyUnits].factor;
    return value;
  };

  const convertFromBase = (value: number, unit: string, type: 'velocity' | 'distance' | 'time' | 'mass' | 'energy') => {
    if (type === 'velocity') return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
    if (type === 'distance') return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
    if (type === 'time') return value / timeUnits[unit as keyof typeof timeUnits].factor;
    if (type === 'mass') return value / massUnits[unit as keyof typeof massUnits].factor;
    if (type === 'energy') return value / energyUnits[unit as keyof typeof energyUnits].factor;
    return value;
  };

  const calculate = () => {
    if (calculationMode === 'distanceTime') {
      const d = distance ? parseFloat(distance) : NaN;
      const t = time ? parseFloat(time) : NaN;
      const v = arrowSpeed ? parseFloat(arrowSpeed) : NaN;

      const filledCount = [distance, time, arrowSpeed].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('Error: Please provide 2 values (distance, time, or arrow speed - leave one empty to calculate)');
        return;
      }

      if (distance && (isNaN(d) || d <= 0)) {
        setResult(null);
        setCalculation('Error: Distance must be a positive number');
        return;
      }
      if (time && (isNaN(t) || t <= 0)) {
        setResult(null);
        setCalculation('Error: Time must be a positive number');
        return;
      }
      if (arrowSpeed && (isNaN(v) || v <= 0)) {
        setResult(null);
        setCalculation('Error: Arrow speed must be a positive number');
        return;
      }

      // Convert to base units
      const dBase = distance ? convertToBase(d, distanceUnit, 'distance') : 0;
      const tBase = time ? convertToBase(t, timeUnit, 'time') : 0;
      const vBase = arrowSpeed ? convertToBase(v, velocityUnit, 'velocity') : 0;

      if (!arrowSpeed) {
        // Calculate arrow speed: v = d/t
        if (tBase === 0) {
          setResult(null);
          setCalculation('Error: Time cannot be zero');
          return;
        }
        const vCalculated = dBase / tBase;
        const vResult = convertFromBase(vCalculated, velocityUnit, 'velocity');
        setResult({ value: vResult, unit: velocityUnit, type: 'speed' });
        setCalculation(`v = d/t = ${formatValue(d)} ${distanceUnit} / ${formatValue(t)} ${timeUnit} = ${formatValue(vResult)} ${velocityUnit}`);
      } else if (!distance) {
        // Calculate distance: d = v × t
        const dCalculated = vBase * tBase;
        const dResult = convertFromBase(dCalculated, distanceUnit, 'distance');
        setResult({ value: dResult, unit: distanceUnit, type: 'distance' });
        setCalculation(`d = v × t = ${formatValue(v)} ${velocityUnit} × ${formatValue(t)} ${timeUnit} = ${formatValue(dResult)} ${distanceUnit}`);
      } else if (!time) {
        // Calculate time: t = d/v
        if (vBase === 0) {
          setResult(null);
          setCalculation('Error: Arrow speed cannot be zero');
          return;
        }
        const tCalculated = dBase / vBase;
        const tResult = convertFromBase(tCalculated, timeUnit, 'time');
        setResult({ value: tResult, unit: timeUnit, type: 'time' });
        setCalculation(`t = d/v = ${formatValue(d)} ${distanceUnit} / ${formatValue(v)} ${velocityUnit} = ${formatValue(tResult)} ${timeUnit}`);
      }
    } else if (calculationMode === 'kineticEnergy') {
      const KE = kineticEnergy ? parseFloat(kineticEnergy) : NaN;
      const m = arrowMass ? parseFloat(arrowMass) : NaN;
      const v = arrowSpeed ? parseFloat(arrowSpeed) : NaN;

      const filledCount = [kineticEnergy, arrowMass, arrowSpeed].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('Error: Please provide 2 values (kinetic energy, arrow mass, or arrow speed - leave one empty to calculate)');
        return;
      }

      if (kineticEnergy && (isNaN(KE) || KE <= 0)) {
        setResult(null);
        setCalculation('Error: Kinetic energy must be a positive number');
        return;
      }
      if (arrowMass && (isNaN(m) || m <= 0)) {
        setResult(null);
        setCalculation('Error: Arrow mass must be a positive number');
        return;
      }
      if (arrowSpeed && (isNaN(v) || v <= 0)) {
        setResult(null);
        setCalculation('Error: Arrow speed must be a positive number');
        return;
      }

      // Convert to base units
      const KEBase = kineticEnergy ? convertToBase(KE, energyUnit, 'energy') : 0;
      const mBase = arrowMass ? convertToBase(m, massUnit, 'mass') : 0;
      const vBase = arrowSpeed ? convertToBase(v, velocityUnit, 'velocity') : 0;

      if (!arrowSpeed) {
        // Calculate arrow speed: v = √(2KE/m)
        if (mBase === 0) {
          setResult(null);
          setCalculation('Error: Arrow mass cannot be zero');
          return;
        }
        const vCalculated = Math.sqrt((2 * KEBase) / mBase);
        const vResult = convertFromBase(vCalculated, velocityUnit, 'velocity');
        setResult({ value: vResult, unit: velocityUnit, type: 'speed' });
        setCalculation(`v = √(2KE/m) = √(2 × ${formatValue(KE)} ${energyUnit} / ${formatValue(m)} ${massUnit}) = ${formatValue(vResult)} ${velocityUnit}`);
      } else if (!kineticEnergy) {
        // Calculate kinetic energy: KE = (1/2)mv²
        const KECalculated = 0.5 * mBase * vBase * vBase;
        const KEResult = convertFromBase(KECalculated, energyUnit, 'energy');
        setResult({ value: KEResult, unit: energyUnit, type: 'energy' });
        setCalculation(`KE = (1/2)mv² = (1/2) × ${formatValue(m)} ${massUnit} × (${formatValue(v)} ${velocityUnit})² = ${formatValue(KEResult)} ${energyUnit}`);
      } else if (!arrowMass) {
        // Calculate arrow mass: m = 2KE/v²
        if (vBase === 0) {
          setResult(null);
          setCalculation('Error: Arrow speed cannot be zero');
          return;
        }
        const mCalculated = (2 * KEBase) / (vBase * vBase);
        const mResult = convertFromBase(mCalculated, massUnit, 'mass');
        setResult({ value: mResult, unit: massUnit, type: 'mass' });
        setCalculation(`m = 2KE/v² = 2 × ${formatValue(KE)} ${energyUnit} / (${formatValue(v)} ${velocityUnit})² = ${formatValue(mResult)} ${massUnit}`);
      }
    }
  };

  const clearAll = () => {
    setDistance('');
    setTime('');
    setArrowSpeed('');
    setKineticEnergy('');
    setArrowMass('');
    setDistanceUnit('m');
    setTimeUnit('s');
    setVelocityUnit('m/s');
    setMassUnit('g');
    setEnergyUnit('J');
    setResult(null);
    setCalculation('');
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    clearAll();
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Arrow Speed Calculator</h2>
        <p className="text-gray-600">Calculate arrow speed from distance/time or kinetic energy/mass</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="distanceTime">From Distance & Time (v = d/t)</option>
            <option value="kineticEnergy">From Kinetic Energy & Mass (v = √(2KE/m))</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">
            {calculationMode === 'distanceTime' && 'v = d / t'}
            {calculationMode === 'kineticEnergy' && 'v = √(2KE / m)'}
          </p>
        </div>

        {/* Distance & Time Mode Inputs */}
        {calculationMode === 'distanceTime' && (
          <>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Arrow Speed (v)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter arrow speed (leave empty to calculate)"
                    value={arrowSpeed}
                    onChange={(e) => setArrowSpeed(e.target.value)}
                    className="w-full"
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
          </>
        )}

        {/* Kinetic Energy Mode Inputs */}
        {calculationMode === 'kineticEnergy' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kinetic Energy (KE)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter kinetic energy (leave empty to calculate)"
                    value={kineticEnergy}
                    onChange={(e) => setKineticEnergy(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-40">
                  <select
                    value={energyUnit}
                    onChange={(e) => setEnergyUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(energyUnits).map(([key, unit]) => (
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
                Arrow Mass (m)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter arrow mass (leave empty to calculate)"
                    value={arrowMass}
                    onChange={(e) => setArrowMass(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(massUnits).map(([key, unit]) => (
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
                Arrow Speed (v)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter arrow speed (leave empty to calculate)"
                    value={arrowSpeed}
                    onChange={(e) => setArrowSpeed(e.target.value)}
                    className="w-full"
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
          </>
        )}

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
            {calculationMode === 'distanceTime' ? (
              <>
                <li>• Enter any two values (Distance, Time, or Arrow Speed) to calculate the third</li>
                <li>• Formula: v = d / t (Arrow Speed = Distance / Time)</li>
                <li>• Leave the value you want to calculate empty</li>
              </>
            ) : (
              <>
                <li>• Enter any two values (Kinetic Energy, Arrow Mass, or Arrow Speed) to calculate the third</li>
                <li>• Formula: v = √(2KE/m) (Arrow Speed = √(2 × Kinetic Energy / Mass))</li>
                <li>• Leave the value you want to calculate empty</li>
              </>
            )}
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All input values should be valid positive numbers</li>
            <li>• Typical arrow speeds: 50-100 m/s (165-330 fps) for recurve bows, 80-120 m/s (260-390 fps) for compound bows</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

