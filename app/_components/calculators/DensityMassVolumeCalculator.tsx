'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: kg/m³, kg, m³)
const densityUnits = {
  'kg/m³': { name: 'kg/m³', factor: 1 },
  'g/cm³': { name: 'g/cm³', factor: 1000 },
  'g/mL': { name: 'g/mL', factor: 1000 },
  'lb/ft³': { name: 'lb/ft³', factor: 16.0185 },
  'lb/in³': { name: 'lb/in³', factor: 27679.9 },
  'oz/in³': { name: 'oz/in³', factor: 1729.99 }
};

const massUnits = {
  'kg': { name: 'kg', factor: 1 },
  'g': { name: 'g', factor: 0.001 },
  'mg': { name: 'mg', factor: 0.000001 },
  'lb': { name: 'lb', factor: 0.453592 },
  'oz': { name: 'oz', factor: 0.0283495 },
  'ton': { name: 'ton', factor: 1000 }
};

const volumeUnits = {
  'm³': { name: 'm³', factor: 1 },
  'L': { name: 'L', factor: 0.001 },
  'mL': { name: 'mL', factor: 0.000001 },
  'cm³': { name: 'cm³', factor: 0.000001 },
  'ft³': { name: 'ft³', factor: 0.0283168 },
  'in³': { name: 'in³', factor: 0.0000163871 },
  'gal': { name: 'gal (US)', factor: 0.00378541 },
  'fl oz': { name: 'fl oz', factor: 0.0000295735 }
};

export default function DensityMassVolumeCalculator() {
  const [density, setDensity] = useState('');
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [massUnit, setMassUnit] = useState('kg');
  const [volumeUnit, setVolumeUnit] = useState('m³');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'density' | 'mass' | 'volume' } | null>(null);
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

  const convertToBaseUnits = (value: number, unit: string, type: 'density' | 'mass' | 'volume') => {
    if (type === 'density') {
      return value * densityUnits[unit as keyof typeof densityUnits].factor;
    } else if (type === 'mass') {
      return value * massUnits[unit as keyof typeof massUnits].factor;
    } else {
      return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
    }
  };

  const convertFromBaseUnits = (value: number, unit: string, type: 'density' | 'mass' | 'volume') => {
    if (type === 'density') {
      return value / densityUnits[unit as keyof typeof densityUnits].factor;
    } else if (type === 'mass') {
      return value / massUnits[unit as keyof typeof massUnits].factor;
    } else {
      return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
    }
  };

  const calculate = () => {
    const d = density ? parseFloat(density) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const v = volume ? parseFloat(volume) : NaN;

    const filledCount = [density, mass, volume].filter(val => val !== '').length;

    if (filledCount !== 2) {
      setResult(null);
      setCalculation('');
      return;
    }

    // Validate that filled values are valid numbers
    if (density && (isNaN(d) || d <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for density');
      return;
    }
    if (mass && (isNaN(m) || m <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for mass');
      return;
    }
    if (volume && (isNaN(v) || v <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for volume');
      return;
    }

    if (density && mass && !volume) {
      // Calculate volume: V = m / ρ
      const densityInBase = convertToBaseUnits(d, densityUnit, 'density');
      const massInBase = convertToBaseUnits(m, massUnit, 'mass');
      
      if (densityInBase === 0) {
        setResult(null);
        setCalculation('Error: Density cannot be zero');
        return;
      }
      
      const calculatedVolumeInBase = massInBase / densityInBase;
      const calculatedVolume = convertFromBaseUnits(calculatedVolumeInBase, volumeUnit, 'volume');
      
      setResult({ value: calculatedVolume, unit: volumeUnit, type: 'volume' });
      setCalculation(`Volume = Mass ÷ Density = ${formatValue(m)} ${massUnit} ÷ ${formatValue(d)} ${densityUnit} = ${formatValue(calculatedVolume)} ${volumeUnit}`);
    } else if (density && volume && !mass) {
      // Calculate mass: m = ρ × V
      const densityInBase = convertToBaseUnits(d, densityUnit, 'density');
      const volumeInBase = convertToBaseUnits(v, volumeUnit, 'volume');
      const calculatedMassInBase = densityInBase * volumeInBase;
      const calculatedMass = convertFromBaseUnits(calculatedMassInBase, massUnit, 'mass');
      
      setResult({ value: calculatedMass, unit: massUnit, type: 'mass' });
      setCalculation(`Mass = Density × Volume = ${formatValue(d)} ${densityUnit} × ${formatValue(v)} ${volumeUnit} = ${formatValue(calculatedMass)} ${massUnit}`);
    } else if (mass && volume && !density) {
      // Calculate density: ρ = m / V
      const massInBase = convertToBaseUnits(m, massUnit, 'mass');
      const volumeInBase = convertToBaseUnits(v, volumeUnit, 'volume');
      
      if (volumeInBase === 0) {
        setResult(null);
        setCalculation('Error: Volume cannot be zero');
        return;
      }
      
      const calculatedDensityInBase = massInBase / volumeInBase;
      const calculatedDensity = convertFromBaseUnits(calculatedDensityInBase, densityUnit, 'density');
      
      setResult({ value: calculatedDensity, unit: densityUnit, type: 'density' });
      setCalculation(`Density = Mass ÷ Volume = ${formatValue(m)} ${massUnit} ÷ ${formatValue(v)} ${volumeUnit} = ${formatValue(calculatedDensity)} ${densityUnit}`);
    } else {
      setResult(null);
      setCalculation('');
    }
  };

  const clearAll = () => {
    setDensity('');
    setMass('');
    setVolume('');
    setDensityUnit('kg/m³');
    setMassUnit('kg');
    setVolumeUnit('m³');
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Density Mass Volume Calculator</h2>
        <p className="text-gray-600">Calculate density, mass, or volume using the formula: ρ = m/V</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Density (ρ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter density"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="w-full"
                autoFocus
              />
            </div>
            <div className="w-32">
              <select
                value={densityUnit}
                onChange={(e) => setDensityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
              >
                {Object.entries(densityUnits).map(([key, unit]) => (
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
            Mass (m)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter mass"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
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
            Volume (V)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-32">
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
            <li>• Enter any two values to calculate the third</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• Formula: Density = Mass ÷ Volume (ρ = m/V)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

