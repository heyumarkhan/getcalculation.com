'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: kg/s, kg, s, m²)
const evaporationRateUnits = {
  'kg/s': { name: 'kg/s (Kilograms per second)', factor: 1 },
  'kg/min': { name: 'kg/min (Kilograms per minute)', factor: 1/60 },
  'kg/h': { name: 'kg/h (Kilograms per hour)', factor: 1/3600 },
  'kg/day': { name: 'kg/day (Kilograms per day)', factor: 1/86400 },
  'g/s': { name: 'g/s (Grams per second)', factor: 0.001 },
  'g/min': { name: 'g/min (Grams per minute)', factor: 0.001/60 },
  'g/h': { name: 'g/h (Grams per hour)', factor: 0.001/3600 },
  'L/s': { name: 'L/s (Liters per second)', factor: 1 }, // Assuming water density = 1 kg/L
  'L/min': { name: 'L/min (Liters per minute)', factor: 1/60 },
  'L/h': { name: 'L/h (Liters per hour)', factor: 1/3600 },
  'mL/s': { name: 'mL/s (Milliliters per second)', factor: 0.001 },
  'mL/min': { name: 'mL/min (Milliliters per minute)', factor: 0.001/60 },
  'gal/h': { name: 'gal/h (Gallons per hour)', factor: 3.78541/3600 }
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 }
};

const volumeUnits = {
  'L': { name: 'L (Liters)', factor: 1 },
  'mL': { name: 'mL (Milliliters)', factor: 0.001 },
  'm³': { name: 'm³ (Cubic meters)', factor: 1000 },
  'cm³': { name: 'cm³ (Cubic centimeters)', factor: 0.001 },
  'gal': { name: 'gal (US gallons)', factor: 3.78541 },
  'ft³': { name: 'ft³ (Cubic feet)', factor: 28.3168 }
};

const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 },
  'day': { name: 'day (Days)', factor: 86400 },
  'ms': { name: 'ms (Milliseconds)', factor: 0.001 }
};

const areaUnits = {
  'm²': { name: 'm² (Square meters)', factor: 1 },
  'cm²': { name: 'cm² (Square centimeters)', factor: 0.0001 },
  'mm²': { name: 'mm² (Square millimeters)', factor: 0.000001 },
  'ft²': { name: 'ft² (Square feet)', factor: 0.092903 },
  'in²': { name: 'in² (Square inches)', factor: 0.00064516 }
};

// Water density at standard conditions (kg/L)
const WATER_DENSITY = 1; // kg/L

type CalculationMode = 'mass-time' | 'volume-time' | 'area-specific';

export default function EvaporationRateCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('mass-time');
  const [evaporationRate, setEvaporationRate] = useState('');
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [time, setTime] = useState('');
  const [area, setArea] = useState('');
  const [evaporationRateUnit, setEvaporationRateUnit] = useState('kg/h');
  const [massUnit, setMassUnit] = useState('kg');
  const [volumeUnit, setVolumeUnit] = useState('L');
  const [timeUnit, setTimeUnit] = useState('h');
  const [areaUnit, setAreaUnit] = useState('m²');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'rate' | 'mass' | 'volume' | 'time' | 'area' } | null>(null);
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
    return value.toLocaleString('en-US', { maximumFractionDigits: 6, useGrouping: true });
  };

  const convertEvaporationRateToBase = (value: number, unit: string) => {
    return value * evaporationRateUnits[unit as keyof typeof evaporationRateUnits].factor;
  };

  const convertEvaporationRateFromBase = (value: number, unit: string) => {
    return value / evaporationRateUnits[unit as keyof typeof evaporationRateUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertVolumeToBase = (value: number, unit: string) => {
    return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertTimeToBase = (value: number, unit: string) => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertAreaToBase = (value: number, unit: string) => {
    return value * areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const calculate = () => {
    if (calculationMode === 'mass-time') {
      const rate = evaporationRate ? parseFloat(evaporationRate) : NaN;
      const m = mass ? parseFloat(mass) : NaN;
      const t = time ? parseFloat(time) : NaN;

      const filledCount = [evaporationRate, mass, time].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (evaporationRate && (isNaN(rate) || rate < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for evaporation rate');
        return;
      }
      if (mass && (isNaN(m) || m < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for mass');
        return;
      }
      if (time && (isNaN(t) || t <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for time');
        return;
      }

      if (!evaporationRate) {
        // Calculate rate: rate = mass / time
        const mBase = convertMassToBase(m, massUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        
        if (tBase === 0) {
          setResult(null);
          setCalculation('Error: Time cannot be zero');
          return;
        }
        
        const rateBase = mBase / tBase;
        const rateResult = convertEvaporationRateFromBase(rateBase, evaporationRateUnit);
        
        setResult({ value: rateResult, unit: evaporationRateUnit, type: 'rate' });
        setCalculation(`Evaporation Rate = Mass / Time\nRate = ${formatValue(m)} ${massUnit} / ${formatValue(t)} ${timeUnit}\nRate = ${formatValue(rateResult)} ${evaporationRateUnit}`);
      } else if (!mass) {
        // Calculate mass: mass = rate × time
        const rateBase = convertEvaporationRateToBase(rate, evaporationRateUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        const mBase = rateBase * tBase;
        const mResult = mBase / massUnits[massUnit as keyof typeof massUnits].factor;
        
        setResult({ value: mResult, unit: massUnit, type: 'mass' });
        setCalculation(`Mass = Evaporation Rate × Time\nMass = ${formatValue(rate)} ${evaporationRateUnit} × ${formatValue(t)} ${timeUnit}\nMass = ${formatValue(mResult)} ${massUnit}`);
      } else if (!time) {
        // Calculate time: time = mass / rate
        const mBase = convertMassToBase(m, massUnit);
        const rateBase = convertEvaporationRateToBase(rate, evaporationRateUnit);
        
        if (rateBase === 0) {
          setResult(null);
          setCalculation('Error: Evaporation rate cannot be zero');
          return;
        }
        
        const tBase = mBase / rateBase;
        const tResult = tBase / timeUnits[timeUnit as keyof typeof timeUnits].factor;
        
        setResult({ value: tResult, unit: timeUnit, type: 'time' });
        setCalculation(`Time = Mass / Evaporation Rate\nTime = ${formatValue(m)} ${massUnit} / ${formatValue(rate)} ${evaporationRateUnit}\nTime = ${formatValue(tResult)} ${timeUnit}`);
      }
    } else if (calculationMode === 'volume-time') {
      const rate = evaporationRate ? parseFloat(evaporationRate) : NaN;
      const v = volume ? parseFloat(volume) : NaN;
      const t = time ? parseFloat(time) : NaN;

      const filledCount = [evaporationRate, volume, time].filter(val => val !== '').length;

      if (filledCount !== 2) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (evaporationRate && (isNaN(rate) || rate < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for evaporation rate');
        return;
      }
      if (volume && (isNaN(v) || v < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for volume');
        return;
      }
      if (time && (isNaN(t) || t <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for time');
        return;
      }

      if (!evaporationRate) {
        // Calculate rate: rate = volume / time (assuming water density)
        const vBase = convertVolumeToBase(v, volumeUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        
        if (tBase === 0) {
          setResult(null);
          setCalculation('Error: Time cannot be zero');
          return;
        }
        
        // Convert volume to mass (assuming water density = 1 kg/L)
        const mBase = vBase * WATER_DENSITY;
        const rateBase = mBase / tBase;
        const rateResult = convertEvaporationRateFromBase(rateBase, evaporationRateUnit);
        
        setResult({ value: rateResult, unit: evaporationRateUnit, type: 'rate' });
        setCalculation(`Evaporation Rate = Volume / Time\nRate = ${formatValue(v)} ${volumeUnit} / ${formatValue(t)} ${timeUnit}\nRate = ${formatValue(rateResult)} ${evaporationRateUnit} (assuming water density = 1 kg/L)`);
      } else if (!volume) {
        // Calculate volume: volume = rate × time
        const rateBase = convertEvaporationRateToBase(rate, evaporationRateUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        const mBase = rateBase * tBase;
        const vBase = mBase / WATER_DENSITY; // Convert mass to volume
        const vResult = vBase / volumeUnits[volumeUnit as keyof typeof volumeUnits].factor;
        
        setResult({ value: vResult, unit: volumeUnit, type: 'volume' });
        setCalculation(`Volume = Evaporation Rate × Time\nVolume = ${formatValue(rate)} ${evaporationRateUnit} × ${formatValue(t)} ${timeUnit}\nVolume = ${formatValue(vResult)} ${volumeUnit} (assuming water density = 1 kg/L)`);
      } else if (!time) {
        // Calculate time: time = volume / rate
        const vBase = convertVolumeToBase(v, volumeUnit);
        const mBase = vBase * WATER_DENSITY;
        const rateBase = convertEvaporationRateToBase(rate, evaporationRateUnit);
        
        if (rateBase === 0) {
          setResult(null);
          setCalculation('Error: Evaporation rate cannot be zero');
          return;
        }
        
        const tBase = mBase / rateBase;
        const tResult = tBase / timeUnits[timeUnit as keyof typeof timeUnits].factor;
        
        setResult({ value: tResult, unit: timeUnit, type: 'time' });
        setCalculation(`Time = Volume / Evaporation Rate\nTime = ${formatValue(v)} ${volumeUnit} / ${formatValue(rate)} ${evaporationRateUnit}\nTime = ${formatValue(tResult)} ${timeUnit}`);
      }
    } else {
      // area-specific mode
      const rate = evaporationRate ? parseFloat(evaporationRate) : NaN;
      const m = mass ? parseFloat(mass) : NaN;
      const a = area ? parseFloat(area) : NaN;
      const t = time ? parseFloat(time) : NaN;

      const filledCount = [evaporationRate, mass, area, time].filter(val => val !== '').length;

      if (filledCount !== 3) {
        setResult(null);
        setCalculation('');
        return;
      }

      // Validate inputs
      if (evaporationRate && (isNaN(rate) || rate < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for evaporation rate');
        return;
      }
      if (mass && (isNaN(m) || m < 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid non-negative number for mass');
        return;
      }
      if (area && (isNaN(a) || a <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for area');
        return;
      }
      if (time && (isNaN(t) || t <= 0)) {
        setResult(null);
        setCalculation('Error: Please enter a valid positive number for time');
        return;
      }

      if (!evaporationRate) {
        // Calculate rate: rate = mass / (area × time)
        const mBase = convertMassToBase(m, massUnit);
        const aBase = convertAreaToBase(a, areaUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        
        if (aBase === 0 || tBase === 0) {
          setResult(null);
          setCalculation('Error: Area and time cannot be zero');
          return;
        }
        
        const rateBase = mBase / (aBase * tBase);
        const rateResult = convertEvaporationRateFromBase(rateBase, evaporationRateUnit);
        
        setResult({ value: rateResult, unit: evaporationRateUnit, type: 'rate' });
        setCalculation(`Evaporation Rate = Mass / (Area × Time)\nRate = ${formatValue(m)} ${massUnit} / (${formatValue(a)} ${areaUnit} × ${formatValue(t)} ${timeUnit})\nRate = ${formatValue(rateResult)} ${evaporationRateUnit}`);
      } else if (!mass) {
        // Calculate mass: mass = rate × area × time
        const rateBase = convertEvaporationRateToBase(rate, evaporationRateUnit);
        const aBase = convertAreaToBase(a, areaUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        const mBase = rateBase * aBase * tBase;
        const mResult = mBase / massUnits[massUnit as keyof typeof massUnits].factor;
        
        setResult({ value: mResult, unit: massUnit, type: 'mass' });
        setCalculation(`Mass = Evaporation Rate × Area × Time\nMass = ${formatValue(rate)} ${evaporationRateUnit} × ${formatValue(a)} ${areaUnit} × ${formatValue(t)} ${timeUnit}\nMass = ${formatValue(mResult)} ${massUnit}`);
      } else if (!area) {
        // Calculate area: area = mass / (rate × time)
        const mBase = convertMassToBase(m, massUnit);
        const rateBase = convertEvaporationRateToBase(rate, evaporationRateUnit);
        const tBase = convertTimeToBase(t, timeUnit);
        
        if (rateBase === 0 || tBase === 0) {
          setResult(null);
          setCalculation('Error: Rate and time cannot be zero');
          return;
        }
        
        const aBase = mBase / (rateBase * tBase);
        const aResult = aBase / areaUnits[areaUnit as keyof typeof areaUnits].factor;
        
        setResult({ value: aResult, unit: areaUnit, type: 'area' });
        setCalculation(`Area = Mass / (Evaporation Rate × Time)\nArea = ${formatValue(m)} ${massUnit} / (${formatValue(rate)} ${evaporationRateUnit} × ${formatValue(t)} ${timeUnit})\nArea = ${formatValue(aResult)} ${areaUnit}`);
      } else if (!time) {
        // Calculate time: time = mass / (rate × area)
        const mBase = convertMassToBase(m, massUnit);
        const rateBase = convertEvaporationRateToBase(rate, evaporationRateUnit);
        const aBase = convertAreaToBase(a, areaUnit);
        
        if (rateBase === 0 || aBase === 0) {
          setResult(null);
          setCalculation('Error: Rate and area cannot be zero');
          return;
        }
        
        const tBase = mBase / (rateBase * aBase);
        const tResult = tBase / timeUnits[timeUnit as keyof typeof timeUnits].factor;
        
        setResult({ value: tResult, unit: timeUnit, type: 'time' });
        setCalculation(`Time = Mass / (Evaporation Rate × Area)\nTime = ${formatValue(m)} ${massUnit} / (${formatValue(rate)} ${evaporationRateUnit} × ${formatValue(a)} ${areaUnit})\nTime = ${formatValue(tResult)} ${timeUnit}`);
      }
    }
  };

  const clearAll = () => {
    setEvaporationRate('');
    setMass('');
    setVolume('');
    setTime('');
    setArea('');
    setEvaporationRateUnit('kg/h');
    setMassUnit('kg');
    setVolumeUnit('L');
    setTimeUnit('h');
    setAreaUnit('m²');
    setResult(null);
    setCalculation('');
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Evaporation Rate Calculator</h2>
        <p className="text-gray-600">Calculate evaporation rate from mass, volume, or area and time</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => handleModeChange(e.target.value as CalculationMode)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="mass-time">Mass & Time (Rate = Mass / Time)</option>
            <option value="volume-time">Volume & Time (Rate = Volume / Time)</option>
            <option value="area-specific">Area-Specific (Rate = Mass / (Area × Time))</option>
          </select>
        </div>

        {calculationMode === 'mass-time' ? (
          <>
            {/* Evaporation Rate Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Evaporation Rate
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter evaporation rate (leave empty to calculate)"
                    value={evaporationRate}
                    onChange={(e) => setEvaporationRate(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-48">
                  <select
                    value={evaporationRateUnit}
                    onChange={(e) => setEvaporationRateUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(evaporationRateUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Mass Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mass Evaporated
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter mass (leave empty to calculate)"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
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

            {/* Time Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Time Period
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
          </>
        ) : calculationMode === 'volume-time' ? (
          <>
            {/* Evaporation Rate Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Evaporation Rate
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter evaporation rate (leave empty to calculate)"
                    value={evaporationRate}
                    onChange={(e) => setEvaporationRate(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-48">
                  <select
                    value={evaporationRateUnit}
                    onChange={(e) => setEvaporationRateUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(evaporationRateUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Volume Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Volume Evaporated
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter volume (leave empty to calculate)"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
                  >
                    {Object.entries(volumeUnits).map(([key, unit]) => (
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
                Time Period
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
          </>
        ) : (
          <>
            {/* Evaporation Rate Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Evaporation Rate (per unit area)
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter evaporation rate (leave empty to calculate)"
                    value={evaporationRate}
                    onChange={(e) => setEvaporationRate(e.target.value)}
                    className="w-full"
                    autoFocus
                  />
                </div>
                <div className="w-48">
                  <select
                    value={evaporationRateUnit}
                    onChange={(e) => setEvaporationRateUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(evaporationRateUnits).map(([key, unit]) => (
                      <option key={key} value={key}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Mass Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mass Evaporated
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter mass (leave empty to calculate)"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
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

            {/* Area Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Surface Area
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter area (leave empty to calculate)"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="w-40">
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                  >
                    {Object.entries(areaUnits).map(([key, unit]) => (
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
                Time Period
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
              <div className="mt-3 p-3 bg-white rounded border border-[#820ECC]/20">
                <p className="text-sm text-gray-700 font-mono whitespace-pre-line">
                  {calculation}
                </p>
              </div>
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
            {calculationMode === 'mass-time' ? (
              <>
                <li>• Enter any two values to calculate the third (Rate, Mass, or Time)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: Evaporation Rate = Mass / Time</li>
                <li>• Select your preferred units for each measurement</li>
                <li>• The calculator automatically converts between different units</li>
              </>
            ) : calculationMode === 'volume-time' ? (
              <>
                <li>• Enter any two values to calculate the third (Rate, Volume, or Time)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: Evaporation Rate = Volume / Time (assuming water density = 1 kg/L)</li>
                <li>• Select your preferred units for each measurement</li>
                <li>• The calculator automatically converts between different units</li>
              </>
            ) : (
              <>
                <li>• Enter any three values to calculate the fourth (Rate, Mass, Area, or Time)</li>
                <li>• Leave the value you want to calculate empty</li>
                <li>• Formula: Evaporation Rate = Mass / (Area × Time)</li>
                <li>• This gives area-specific evaporation rate</li>
                <li>• Select your preferred units for each measurement</li>
                <li>• The calculator automatically converts between different units</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </Card>
  );
}

