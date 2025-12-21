'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: m³ for volume, K for temperature)
const volumeUnits = {
  'm³': { name: 'm³ (Cubic meters)', factor: 1 },
  'L': { name: 'L (Liters)', factor: 0.001 },
  'mL': { name: 'mL (Milliliters)', factor: 0.000001 },
  'cm³': { name: 'cm³ (Cubic centimeters)', factor: 0.000001 },
  'ft³': { name: 'ft³ (Cubic feet)', factor: 0.0283168 },
  'in³': { name: 'in³ (Cubic inches)', factor: 0.0000163871 },
  'gal': { name: 'gal (US gallons)', factor: 0.00378541 },
  'qt': { name: 'qt (US quarts)', factor: 0.000946353 },
  'pt': { name: 'pt (US pints)', factor: 0.000473176 },
  'fl oz': { name: 'fl oz (US fluid ounces)', factor: 0.0000295735 }
};

const temperatureUnits = {
  'K': { name: 'K (Kelvin)', factor: 1, offset: 0 },
  '°C': { name: '°C (Celsius)', factor: 1, offset: 273.15 },
  '°F': { name: '°F (Fahrenheit)', factor: 5/9, offset: 459.67 }
};

export default function CharlesLawCalculator() {
  const [initialVolume, setInitialVolume] = useState('');
  const [initialTemp, setInitialTemp] = useState('');
  const [finalVolume, setFinalVolume] = useState('');
  const [finalTemp, setFinalTemp] = useState('');
  const [volumeUnit, setVolumeUnit] = useState('L');
  const [tempUnit, setTempUnit] = useState('°C');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'initialVolume' | 'finalVolume' | 'initialTemp' | 'finalTemp' } | null>(null);
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

  const convertVolumeToBase = (value: number, unit: string) => {
    return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertVolumeFromBase = (value: number, unit: string) => {
    return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
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
    const v1 = initialVolume ? parseFloat(initialVolume) : NaN;
    const t1 = initialTemp ? parseFloat(initialTemp) : NaN;
    const v2 = finalVolume ? parseFloat(finalVolume) : NaN;
    const t2 = finalTemp ? parseFloat(finalTemp) : NaN;

    const filledCount = [initialVolume, initialTemp, finalVolume, finalTemp].filter(val => val !== '').length;

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

    // Validate that filled values are valid numbers and positive (temperatures must be > absolute zero in Kelvin)
    if (initialVolume && (isNaN(v1) || v1 <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for initial volume');
      return;
    }
    if (finalVolume && (isNaN(v2) || v2 <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for final volume');
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

    // Convert all temperatures to Kelvin for calculations (Charles's Law requires absolute temperature)
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

    // Convert volumes to base units (m³)
    const v1Base = initialVolume ? convertVolumeToBase(v1, volumeUnit) : NaN;
    const v2Base = finalVolume ? convertVolumeToBase(v2, volumeUnit) : NaN;

    // Charles's Law: V₁/T₁ = V₂/T₂
    // Rearrange to solve for the missing variable

    if (!initialVolume) {
      // Calculate V₁: V₁ = V₂ × T₁ / T₂
      const v1BaseResult = (v2Base * t1K) / t2K;
      if (v1BaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated volume must be positive');
        return;
      }
      const v1Result = convertVolumeFromBase(v1BaseResult, volumeUnit);
      
      setResult({ value: v1Result, unit: volumeUnit, type: 'initialVolume' });
      setCalculation(`Initial Volume = (Final Volume × Initial Temperature) / Final Temperature = (${formatValue(v2)} ${volumeUnit} × ${formatValue(t1K)} K) / ${formatValue(t2K)} K = ${formatValue(v1Result)} ${volumeUnit}`);
    } else if (!finalVolume) {
      // Calculate V₂: V₂ = V₁ × T₂ / T₁
      const v2BaseResult = (v1Base * t2K) / t1K;
      if (v2BaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated volume must be positive');
        return;
      }
      const v2Result = convertVolumeFromBase(v2BaseResult, volumeUnit);
      
      setResult({ value: v2Result, unit: volumeUnit, type: 'finalVolume' });
      setCalculation(`Final Volume = (Initial Volume × Final Temperature) / Initial Temperature = (${formatValue(v1)} ${volumeUnit} × ${formatValue(t2K)} K) / ${formatValue(t1K)} K = ${formatValue(v2Result)} ${volumeUnit}`);
    } else if (!initialTemp) {
      // Calculate T₁: T₁ = V₁ × T₂ / V₂
      const t1KResult = (v1Base * t2K) / v2Base;
      if (t1KResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated temperature must be greater than absolute zero');
        return;
      }
      const t1Result = convertTempFromKelvin(t1KResult, tempUnit);
      
      setResult({ value: t1Result, unit: tempUnit, type: 'initialTemp' });
      setCalculation(`Initial Temperature = (Initial Volume × Final Temperature) / Final Volume = (${formatValue(v1)} ${volumeUnit} × ${formatValue(t2K)} K) / ${formatValue(v2)} ${volumeUnit} = ${formatValue(t1KResult)} K = ${formatValue(t1Result)} ${tempUnit}`);
    } else if (!finalTemp) {
      // Calculate T₂: T₂ = V₂ × T₁ / V₁
      const t2KResult = (v2Base * t1K) / v1Base;
      if (t2KResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated temperature must be greater than absolute zero');
        return;
      }
      const t2Result = convertTempFromKelvin(t2KResult, tempUnit);
      
      setResult({ value: t2Result, unit: tempUnit, type: 'finalTemp' });
      setCalculation(`Final Temperature = (Final Volume × Initial Temperature) / Initial Volume = (${formatValue(v2)} ${volumeUnit} × ${formatValue(t1K)} K) / ${formatValue(v1)} ${volumeUnit} = ${formatValue(t2KResult)} K = ${formatValue(t2Result)} ${tempUnit}`);
    }
  };

  const clearAll = () => {
    setInitialVolume('');
    setInitialTemp('');
    setFinalVolume('');
    setFinalTemp('');
    setVolumeUnit('L');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Charles&apos;s Law Calculator</h2>
        <p className="text-gray-600">Calculate volume or temperature using V₁/T₁ = V₂/T₂</p>
      </div>

      <div className="space-y-6">
        {/* Initial Volume Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Initial Volume (V₁)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter initial volume"
                value={initialVolume}
                onChange={(e) => setInitialVolume(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={volumeUnit}
                onChange={(e) => setVolumeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Final Volume Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Final Volume (V₂)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter final volume"
                value={finalVolume}
                onChange={(e) => setFinalVolume(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={volumeUnit}
                onChange={(e) => setVolumeUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
            <li>• Enter any three values to calculate the fourth (Initial Volume, Initial Temperature, Final Volume, or Final Temperature)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: V₁/T₁ = V₂/T₂ (Charles&apos;s Law)</li>
            <li>• Temperature must be greater than absolute zero (0 K, -273.15°C, -459.67°F)</li>
            <li>• All calculations use absolute temperature (Kelvin) internally</li>
            <li>• Press must remain constant for Charles&apos;s Law to apply</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

