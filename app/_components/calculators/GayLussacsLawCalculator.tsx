'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: Pa for pressure, K for temperature)
const pressureUnits = {
  'Pa': { name: 'Pa (Pascal)', factor: 1 },
  'kPa': { name: 'kPa (Kilopascal)', factor: 1000 },
  'MPa': { name: 'MPa (Megapascal)', factor: 1e6 },
  'bar': { name: 'bar', factor: 100000 },
  'atm': { name: 'atm (Atmosphere)', factor: 101325 },
  'psi': { name: 'psi (Pounds per square inch)', factor: 6894.76 },
  'torr': { name: 'torr', factor: 133.322 },
  'mmHg': { name: 'mmHg (Millimeters of mercury)', factor: 133.322 }
};

const temperatureUnits = {
  'K': { name: 'K (Kelvin)', factor: 1, offset: 0 },
  '°C': { name: '°C (Celsius)', factor: 1, offset: 273.15 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: 459.67 }
};

export default function GayLussacsLawCalculator() {
  const [initialPressure, setInitialPressure] = useState('');
  const [initialTemp, setInitialTemp] = useState('');
  const [finalPressure, setFinalPressure] = useState('');
  const [finalTemp, setFinalTemp] = useState('');
  const [pressureUnit, setPressureUnit] = useState('atm');
  const [tempUnit, setTempUnit] = useState('°C');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'initialPressure' | 'finalPressure' | 'initialTemp' | 'finalTemp' } | null>(null);
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

  const convertPressureToBase = (value: number, unit: string) => {
    return value * pressureUnits[unit as keyof typeof pressureUnits].factor;
  };

  const convertPressureFromBase = (value: number, unit: string) => {
    return value / pressureUnits[unit as keyof typeof pressureUnits].factor;
  };

  const convertTempToKelvin = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return value * tempData.factor + tempData.offset;
  };

  const convertTempFromKelvin = (value: number, unit: string) => {
    const tempData = temperatureUnits[unit as keyof typeof temperatureUnits];
    return (value - tempData.offset) / tempData.factor;
  };

  const calculate = () => {
    const p1 = initialPressure ? parseFloat(initialPressure) : NaN;
    const t1 = initialTemp ? parseFloat(initialTemp) : NaN;
    const p2 = finalPressure ? parseFloat(finalPressure) : NaN;
    const t2 = finalTemp ? parseFloat(finalTemp) : NaN;

    const filledCount = [initialPressure, initialTemp, finalPressure, finalTemp].filter(val => val !== '').length;

    if (filledCount < 3) {
      setResult(null);
      setCalculation('');
      return;
    }
    
    if (filledCount > 3) {
      setResult(null);
      setCalculation('Error: Please enter exactly 3 values (leave one empty to calculate it)');
      return;
    }

    // Validate that filled values are valid numbers and positive (temperatures must be > absolute zero in Kelvin, pressures must be > 0)
    if (initialPressure && (isNaN(p1) || p1 <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for initial pressure');
      return;
    }
    if (finalPressure && (isNaN(p2) || p2 <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for final pressure');
      return;
    }
    if (initialTemp && isNaN(t1)) {
      setResult(null);
      setCalculation('Error: Please enter a valid number for initial temperature');
      return;
    }
    if (finalTemp && isNaN(t2)) {
      setResult(null);
      setCalculation('Error: Please enter a valid number for final temperature');
      return;
    }

    // Convert all temperatures to Kelvin for calculations (Gay-Lussac's Law requires absolute temperature)
    let t1K: number, t2K: number;
    if (initialTemp) {
      t1K = convertTempToKelvin(t1, tempUnit);
      if (t1K <= 0) {
        setResult(null);
        setCalculation('Error: Temperature must be greater than absolute zero (0 K, -273.15°C, -459.67°F)');
        return;
      }
    } else {
      t1K = NaN;
    }

    if (finalTemp) {
      t2K = convertTempToKelvin(t2, tempUnit);
      if (t2K <= 0) {
        setResult(null);
        setCalculation('Error: Temperature must be greater than absolute zero (0 K, -273.15°C, -459.67°F)');
        return;
      }
    } else {
      t2K = NaN;
    }

    // Convert pressures to base units (Pa)
    const p1Base = initialPressure ? convertPressureToBase(p1, pressureUnit) : NaN;
    const p2Base = finalPressure ? convertPressureToBase(p2, pressureUnit) : NaN;

    // Gay-Lussac's Law: P₁/T₁ = P₂/T₂
    // Rearrange to solve for the missing variable

    if (!initialPressure) {
      // Calculate P₁: P₁ = P₂ × T₁ / T₂
      const p1BaseResult = (p2Base * t1K) / t2K;
      if (p1BaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated pressure must be positive');
        return;
      }
      const p1Result = convertPressureFromBase(p1BaseResult, pressureUnit);
      
      setResult({ value: p1Result, unit: pressureUnit, type: 'initialPressure' });
      setCalculation(`Initial Pressure = (Final Pressure × Initial Temperature) / Final Temperature = (${formatValue(p2)} ${pressureUnit} × ${formatValue(t1K)} K) / ${formatValue(t2K)} K = ${formatValue(p1Result)} ${pressureUnit}`);
    } else if (!finalPressure) {
      // Calculate P₂: P₂ = P₁ × T₂ / T₁
      const p2BaseResult = (p1Base * t2K) / t1K;
      if (p2BaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated pressure must be positive');
        return;
      }
      const p2Result = convertPressureFromBase(p2BaseResult, pressureUnit);
      
      setResult({ value: p2Result, unit: pressureUnit, type: 'finalPressure' });
      setCalculation(`Final Pressure = (Initial Pressure × Final Temperature) / Initial Temperature = (${formatValue(p1)} ${pressureUnit} × ${formatValue(t2K)} K) / ${formatValue(t1K)} K = ${formatValue(p2Result)} ${pressureUnit}`);
    } else if (!initialTemp) {
      // Calculate T₁: T₁ = P₁ × T₂ / P₂
      const t1KResult = (p1Base * t2K) / p2Base;
      if (t1KResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated temperature must be greater than absolute zero');
        return;
      }
      const t1Result = convertTempFromKelvin(t1KResult, tempUnit);
      
      setResult({ value: t1Result, unit: tempUnit, type: 'initialTemp' });
      setCalculation(`Initial Temperature = (Initial Pressure × Final Temperature) / Final Pressure = (${formatValue(p1)} ${pressureUnit} × ${formatValue(t2K)} K) / ${formatValue(p2)} ${pressureUnit} = ${formatValue(t1KResult)} K = ${formatValue(t1Result)} ${tempUnit}`);
    } else if (!finalTemp) {
      // Calculate T₂: T₂ = P₂ × T₁ / P₁
      const t2KResult = (p2Base * t1K) / p1Base;
      if (t2KResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated temperature must be greater than absolute zero');
        return;
      }
      const t2Result = convertTempFromKelvin(t2KResult, tempUnit);
      
      setResult({ value: t2Result, unit: tempUnit, type: 'finalTemp' });
      setCalculation(`Final Temperature = (Final Pressure × Initial Temperature) / Initial Pressure = (${formatValue(p2)} ${pressureUnit} × ${formatValue(t1K)} K) / ${formatValue(p1)} ${pressureUnit} = ${formatValue(t2KResult)} K = ${formatValue(t2Result)} ${tempUnit}`);
    }
  };

  const clearAll = () => {
    setInitialPressure('');
    setInitialTemp('');
    setFinalPressure('');
    setFinalTemp('');
    setPressureUnit('atm');
    setTempUnit('°C');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gay-Lussac&apos;s Law Calculator</h2>
        <p className="text-gray-600">Calculate pressure or temperature using P₁/T₁ = P₂/T₂</p>
      </div>

      <div className="space-y-6">
        {/* Initial Pressure Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Pressure (P₁)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial pressure"
                value={initialPressure}
                onChange={(e) => setInitialPressure(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={pressureUnit}
                onChange={(e) => setPressureUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(pressureUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Initial Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Temperature (T₁)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial temperature"
                value={initialTemp}
                onChange={(e) => setInitialTemp(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(temperatureUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Final Pressure Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Final Pressure (P₂)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter final pressure"
                value={finalPressure}
                onChange={(e) => setFinalPressure(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={pressureUnit}
                onChange={(e) => setPressureUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(pressureUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Final Temperature Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Final Temperature (T₂)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter final temperature"
                value={finalTemp}
                onChange={(e) => setFinalTemp(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={tempUnit}
                onChange={(e) => setTempUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(temperatureUnits).map(([key, unit]) => (
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
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Result</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <p className={`text-sm ${getResultTextColor()}/80 mt-2 font-mono break-words`}>
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
            <li>• Enter any three values to calculate the fourth (Initial Pressure, Initial Temperature, Final Pressure, or Final Temperature)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: P₁/T₁ = P₂/T₂ (Gay-Lussac&apos;s Law)</li>
            <li>• Temperature must be greater than absolute zero (0 K, -273.15°C, -459.67°F)</li>
            <li>• All calculations use absolute temperature (Kelvin) internally</li>
            <li>• Volume must remain constant for Gay-Lussac&apos;s Law to apply</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

