'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: Wh, W, h)
const energyUnits = {
  'Wh': { name: 'Wh (Watt-hours)', factor: 1 },
  'kWh': { name: 'kWh (Kilowatt-hours)', factor: 1000 },
  'MWh': { name: 'MWh (Megawatt-hours)', factor: 1000000 },
  'J': { name: 'J (Joules)', factor: 0.000277778 },
  'kJ': { name: 'kJ (Kilojoules)', factor: 0.277778 },
  'MJ': { name: 'MJ (Megajoules)', factor: 277.778 },
  'BTU': { name: 'BTU (British Thermal Units)', factor: 0.293071 },
  'cal': { name: 'cal (Calories)', factor: 0.00116222 },
  'kcal': { name: 'kcal (Kilocalories)', factor: 1.16222 }
};

const powerUnits = {
  'W': { name: 'W (Watts)', factor: 1 },
  'kW': { name: 'kW (Kilowatts)', factor: 1000 },
  'MW': { name: 'MW (Megawatts)', factor: 1000000 },
  'mW': { name: 'mW (Milliwatts)', factor: 0.001 },
  'hp': { name: 'hp (Horsepower)', factor: 745.7 },
  'BTU/h': { name: 'BTU/h', factor: 0.293071 }
};

const timeUnits = {
  'h': { name: 'h (Hours)', factor: 1 },
  'min': { name: 'min (Minutes)', factor: 1/60 },
  's': { name: 's (Seconds)', factor: 1/3600 },
  'day': { name: 'day (Days)', factor: 24 },
  'week': { name: 'week (Weeks)', factor: 168 },
  'month': { name: 'month (Months)', factor: 730 },
  'year': { name: 'year (Years)', factor: 8760 }
};

export default function WattHourCalculator() {
  const [energy, setEnergy] = useState('');
  const [power, setPower] = useState('');
  const [time, setTime] = useState('');
  const [energyUnit, setEnergyUnit] = useState('Wh');
  const [powerUnit, setPowerUnit] = useState('W');
  const [timeUnit, setTimeUnit] = useState('h');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'energy' | 'power' | 'time' } | null>(null);
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

  const convertEnergyToBase = (value: number, unit: string) => {
    return value * energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertEnergyFromBase = (value: number, unit: string) => {
    return value / energyUnits[unit as keyof typeof energyUnits].factor;
  };

  const convertPowerToBase = (value: number, unit: string) => {
    return value * powerUnits[unit as keyof typeof powerUnits].factor;
  };

  const convertPowerFromBase = (value: number, unit: string) => {
    return value / powerUnits[unit as keyof typeof powerUnits].factor;
  };

  const convertTimeToBase = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTimeFromBase = (value: number, unit: string) => {
    return value / timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const calculate = () => {
    const e = energy ? parseFloat(energy) : NaN;
    const p = power ? parseFloat(power) : NaN;
    const t = time ? parseFloat(time) : NaN;

    const filledCount = [energy, power, time].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (energy && (isNaN(e) || e <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for energy');
      return;
    }
    if (power && (isNaN(p) || p <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for power');
      return;
    }
    if (time && (isNaN(t) || t <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for time');
      return;
    }

    // Convert to base units (Wh, W, h)
    if (!energy) {
      // Calculate energy: E = P × t
      const pBase = convertPowerToBase(p, powerUnit);
      const tBase = convertTimeToBase(t, timeUnit);
      const eBase = pBase * tBase;
      const eResult = convertEnergyFromBase(eBase, energyUnit);
      
      setResult({ value: eResult, unit: energyUnit, type: 'energy' });
      setCalculation(`Energy = Power × Time = ${formatValue(p)} ${powerUnit} × ${formatValue(t)} ${timeUnit} = ${formatValue(eResult)} ${energyUnit}`);
    } else if (!power) {
      // Calculate power: P = E / t
      const eBase = convertEnergyToBase(e, energyUnit);
      const tBase = convertTimeToBase(t, timeUnit);
      
      if (tBase === 0) {
        setResult(null);
        setCalculation('Error: Time cannot be zero');
        return;
      }
      
      const pBase = eBase / tBase;
      const pResult = convertPowerFromBase(pBase, powerUnit);
      
      setResult({ value: pResult, unit: powerUnit, type: 'power' });
      setCalculation(`Power = Energy ÷ Time = ${formatValue(e)} ${energyUnit} ÷ ${formatValue(t)} ${timeUnit} = ${formatValue(pResult)} ${powerUnit}`);
    } else if (!time) {
      // Calculate time: t = E / P
      const eBase = convertEnergyToBase(e, energyUnit);
      const pBase = convertPowerToBase(p, powerUnit);
      
      if (pBase === 0) {
        setResult(null);
        setCalculation('Error: Power cannot be zero');
        return;
      }
      
      const tBase = eBase / pBase;
      const tResult = convertTimeFromBase(tBase, timeUnit);
      
      setResult({ value: tResult, unit: timeUnit, type: 'time' });
      setCalculation(`Time = Energy ÷ Power = ${formatValue(e)} ${energyUnit} ÷ ${formatValue(p)} ${powerUnit} = ${formatValue(tResult)} ${timeUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setEnergy('');
    setPower('');
    setTime('');
    setEnergyUnit('Wh');
    setPowerUnit('W');
    setTimeUnit('h');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Watt-hour Calculator</h2>
        <p className="text-gray-600">Calculate energy, power, or time using E = P × t</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">E = P × t</p>
          <p className="text-xs text-gray-500 mt-1">
            Where: E = Energy, P = Power, t = Time
          </p>
        </div>

        {/* Energy Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Energy (E)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter energy (leave empty to calculate)"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={energyUnit}
                onChange={(e) => setEnergyUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Power Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Power (P)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter power (leave empty to calculate)"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={powerUnit}
                onChange={(e) => setPowerUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(powerUnits).map(([key, unit]) => (
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
            <div className="w-40">
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
            <li>• Enter any two values to calculate the third (Energy, Power, or Time)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: E = P × t (Energy = Power × Time)</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values should be positive numbers</li>
            <li>• Commonly used for calculating energy consumption and battery capacity</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

