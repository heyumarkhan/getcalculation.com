'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: Pa for pressure, m³ for volume)
const pressureUnits = {
  'Pa': { name: 'Pa (Pascals)', factor: 1 },
  'kPa': { name: 'kPa (Kilopascals)', factor: 1000 },
  'MPa': { name: 'MPa (Megapascals)', factor: 1000000 },
  'bar': { name: 'bar', factor: 100000 },
  'atm': { name: 'atm (Atmospheres)', factor: 101325 },
  'psi': { name: 'psi (Pounds per square inch)', factor: 6894.76 },
  'Torr': { name: 'Torr (mmHg)', factor: 133.322 },
  'mmHg': { name: 'mmHg (Millimeters of mercury)', factor: 133.322 }
};

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

export default function BoylesLawCalculator() {
  const [initialPressure, setInitialPressure] = useState('');
  const [initialVolume, setInitialVolume] = useState('');
  const [finalPressure, setFinalPressure] = useState('');
  const [finalVolume, setFinalVolume] = useState('');
  const [pressureUnit, setPressureUnit] = useState('atm');
  const [volumeUnit, setVolumeUnit] = useState('L');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'initialPressure' | 'finalPressure' | 'initialVolume' | 'finalVolume' } | null>(null);
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

  const convertVolumeToBase = (value: number, unit: string) => {
    return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertVolumeFromBase = (value: number, unit: string) => {
    return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const calculate = () => {
    const p1 = initialPressure ? parseFloat(initialPressure) : NaN;
    const v1 = initialVolume ? parseFloat(initialVolume) : NaN;
    const p2 = finalPressure ? parseFloat(finalPressure) : NaN;
    const v2 = finalVolume ? parseFloat(finalVolume) : NaN;

    const filledCount = [initialPressure, initialVolume, finalPressure, finalVolume].filter(val => val !== '').length;

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

    // Validate that filled values are valid numbers and positive
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

    // Convert all values to base units (Pa for pressure, m³ for volume)
    const p1Base = initialPressure ? convertPressureToBase(p1, pressureUnit) : NaN;
    const p2Base = finalPressure ? convertPressureToBase(p2, pressureUnit) : NaN;
    const v1Base = initialVolume ? convertVolumeToBase(v1, volumeUnit) : NaN;
    const v2Base = finalVolume ? convertVolumeToBase(v2, volumeUnit) : NaN;

    // Boyle's Law: P₁V₁ = P₂V₂
    // Rearrange to solve for the missing variable

    if (!initialPressure) {
      // Calculate P₁: P₁ = P₂V₂ / V₁
      const p1BaseResult = (p2Base * v2Base) / v1Base;
      if (p1BaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated pressure must be positive');
        return;
      }
      const p1Result = convertPressureFromBase(p1BaseResult, pressureUnit);
      
      setResult({ value: p1Result, unit: pressureUnit, type: 'initialPressure' });
      setCalculation(`Initial Pressure = (Final Pressure × Final Volume) / Initial Volume = (${formatValue(p2)} ${pressureUnit} × ${formatValue(v2)} ${volumeUnit}) / ${formatValue(v1)} ${volumeUnit} = ${formatValue(p1Result)} ${pressureUnit}`);
    } else if (!finalPressure) {
      // Calculate P₂: P₂ = P₁V₁ / V₂
      const p2BaseResult = (p1Base * v1Base) / v2Base;
      if (p2BaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated pressure must be positive');
        return;
      }
      const p2Result = convertPressureFromBase(p2BaseResult, pressureUnit);
      
      setResult({ value: p2Result, unit: pressureUnit, type: 'finalPressure' });
      setCalculation(`Final Pressure = (Initial Pressure × Initial Volume) / Final Volume = (${formatValue(p1)} ${pressureUnit} × ${formatValue(v1)} ${volumeUnit}) / ${formatValue(v2)} ${volumeUnit} = ${formatValue(p2Result)} ${pressureUnit}`);
    } else if (!initialVolume) {
      // Calculate V₁: V₁ = P₂V₂ / P₁
      const v1BaseResult = (p2Base * v2Base) / p1Base;
      if (v1BaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated volume must be positive');
        return;
      }
      const v1Result = convertVolumeFromBase(v1BaseResult, volumeUnit);
      
      setResult({ value: v1Result, unit: volumeUnit, type: 'initialVolume' });
      setCalculation(`Initial Volume = (Final Pressure × Final Volume) / Initial Pressure = (${formatValue(p2)} ${pressureUnit} × ${formatValue(v2)} ${volumeUnit}) / ${formatValue(p1)} ${pressureUnit} = ${formatValue(v1Result)} ${volumeUnit}`);
    } else if (!finalVolume) {
      // Calculate V₂: V₂ = P₁V₁ / P₂
      const v2BaseResult = (p1Base * v1Base) / p2Base;
      if (v2BaseResult <= 0) {
        setResult(null);
        setCalculation('Error: Calculated volume must be positive');
        return;
      }
      const v2Result = convertVolumeFromBase(v2BaseResult, volumeUnit);
      
      setResult({ value: v2Result, unit: volumeUnit, type: 'finalVolume' });
      setCalculation(`Final Volume = (Initial Pressure × Initial Volume) / Final Pressure = (${formatValue(p1)} ${pressureUnit} × ${formatValue(v1)} ${volumeUnit}) / ${formatValue(p2)} ${pressureUnit} = ${formatValue(v2Result)} ${volumeUnit}`);
    }
  };

  const clearAll = () => {
    setInitialPressure('');
    setInitialVolume('');
    setFinalPressure('');
    setFinalVolume('');
    setPressureUnit('atm');
    setVolumeUnit('L');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Boyle&apos;s Law Calculator</h2>
        <p className="text-gray-600">Calculate pressure or volume using P₁V₁ = P₂V₂</p>
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
            <div className="w-48">
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
              />
            </div>
            <div className="w-48">
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
            <div className="w-48">
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
            <div className="w-48">
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
            {calculation && (
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
            <li>• Enter any three values to calculate the fourth (Initial Pressure, Initial Volume, Final Pressure, or Final Volume)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: P₁V₁ = P₂V₂ (Boyle&apos;s Law)</li>
            <li>• Temperature must remain constant for Boyle&apos;s Law to apply</li>
            <li>• All values must be positive</li>
            <li>• Works best for ideal gases at constant temperature</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

