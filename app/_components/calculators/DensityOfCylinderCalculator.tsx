'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMethod = 'density-from-mass-volume' | 'mass-from-density-volume' | 'volume-from-density-mass' | 'cylinder-volume-from-dimensions';

export default function DensityOfCylinderCalculator() {
  const [method, setMethod] = useState<CalculationMethod>('density-from-mass-volume');
  
  // Density from mass and volume
  const [mass, setMass] = useState('');
  const [massUnit, setMassUnit] = useState('kg');
  const [volume, setVolume] = useState('');
  const [volumeUnit, setVolumeUnit] = useState('m3');
  
  // Mass from density and volume
  const [density, setDensity] = useState('');
  const [densityUnit, setDensityUnit] = useState('kg/m3');
  const [volumeForMass, setVolumeForMass] = useState('');
  const [volumeUnitForMass, setVolumeUnitForMass] = useState('m3');
  
  // Volume from density and mass
  const [densityForVolume, setDensityForVolume] = useState('');
  const [densityUnitForVolume, setDensityUnitForVolume] = useState('kg/m3');
  const [massForVolume, setMassForVolume] = useState('');
  const [massUnitForVolume, setMassUnitForVolume] = useState('kg');
  
  // Cylinder volume from dimensions
  const [radius, setRadius] = useState('');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('m');
  
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

  const convertMassToKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'g': return value / 1000;
      case 'mg': return value / 1e6;
      case 'lb': return value * 0.453592;
      case 'oz': return value * 0.0283495;
      default: return value;
    }
  };

  const convertMassFromKg = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg': return value;
      case 'g': return value * 1000;
      case 'mg': return value * 1e6;
      case 'lb': return value / 0.453592;
      case 'oz': return value / 0.0283495;
      default: return value;
    }
  };

  const convertVolumeToM3 = (value: number, unit: string): number => {
    switch (unit) {
      case 'm3': return value;
      case 'cm3': return value / 1e6;
      case 'mm3': return value / 1e9;
      case 'L': return value / 1000;
      case 'mL': return value / 1e6;
      case 'in3': return value * 0.0000163871;
      case 'ft3': return value * 0.0283168;
      default: return value;
    }
  };

  const convertVolumeFromM3 = (value: number, unit: string): number => {
    switch (unit) {
      case 'm3': return value;
      case 'cm3': return value * 1e6;
      case 'mm3': return value * 1e9;
      case 'L': return value * 1000;
      case 'mL': return value * 1e6;
      case 'in3': return value / 0.0000163871;
      case 'ft3': return value / 0.0283168;
      default: return value;
    }
  };

  const convertDensityToKgM3 = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg/m3': return value;
      case 'g/cm3': return value * 1000;
      case 'g/mL': return value * 1000;
      case 'lb/in3': return value * 27679.9;
      case 'lb/ft3': return value * 16.0185;
      default: return value;
    }
  };

  const convertDensityFromKgM3 = (value: number, unit: string): number => {
    switch (unit) {
      case 'kg/m3': return value;
      case 'g/cm3': return value / 1000;
      case 'g/mL': return value / 1000;
      case 'lb/in3': return value / 27679.9;
      case 'lb/ft3': return value / 16.0185;
      default: return value;
    }
  };

  const convertLengthToM = (value: number, unit: string): number => {
    switch (unit) {
      case 'm': return value;
      case 'cm': return value / 100;
      case 'mm': return value / 1000;
      case 'in': return value * 0.0254;
      case 'ft': return value * 0.3048;
      default: return value;
    }
  };

  const calculate = () => {
    if (method === 'density-from-mass-volume') {
      const massKg = convertMassToKg(mass ? parseFloat(mass) : NaN, massUnit);
      const volM3 = convertVolumeToM3(volume ? parseFloat(volume) : NaN, volumeUnit);

      if (!mass || !volume) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(massKg) || isNaN(volM3) || massKg <= 0 || volM3 <= 0) {
        setResult(null);
        setCalculation('Error: Mass and volume must be positive numbers.');
        return;
      }

      // Density = mass / volume
      const densityKgM3 = massKg / volM3;

      setResult({ value: densityKgM3, unit: 'kg/m³' });
      setCalculation(`Density = Mass / Volume = ${formatValue(massKg)} / ${formatValue(volM3)} = ${formatValue(densityKgM3)} kg/m³`);
    } else if (method === 'mass-from-density-volume') {
      const densKgM3 = convertDensityToKgM3(density ? parseFloat(density) : NaN, densityUnit);
      const volM3 = convertVolumeToM3(volumeForMass ? parseFloat(volumeForMass) : NaN, volumeUnitForMass);

      if (!density || !volumeForMass) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(densKgM3) || isNaN(volM3) || densKgM3 <= 0 || volM3 <= 0) {
        setResult(null);
        setCalculation('Error: Density and volume must be positive numbers.');
        return;
      }

      // Mass = density × volume
      const massKg = densKgM3 * volM3;

      setResult({ value: massKg, unit: 'kg' });
      setCalculation(`Mass = Density × Volume = ${formatValue(densKgM3)} × ${formatValue(volM3)} = ${formatValue(massKg)} kg`);
    } else if (method === 'volume-from-density-mass') {
      const densKgM3 = convertDensityToKgM3(densityForVolume ? parseFloat(densityForVolume) : NaN, densityUnitForVolume);
      const massKg = convertMassToKg(massForVolume ? parseFloat(massForVolume) : NaN, massUnitForVolume);

      if (!densityForVolume || !massForVolume) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(densKgM3) || isNaN(massKg) || densKgM3 <= 0 || massKg <= 0) {
        setResult(null);
        setCalculation('Error: Density and mass must be positive numbers.');
        return;
      }

      // Volume = mass / density
      const volM3 = massKg / densKgM3;

      setResult({ value: volM3, unit: 'm³' });
      setCalculation(`Volume = Mass / Density = ${formatValue(massKg)} / ${formatValue(densKgM3)} = ${formatValue(volM3)} m³`);
    } else if (method === 'cylinder-volume-from-dimensions') {
      const radiusM = convertLengthToM(radius ? parseFloat(radius) : NaN, radiusUnit);
      const heightM = convertLengthToM(height ? parseFloat(height) : NaN, heightUnit);

      if (!radius || !height) {
        setResult(null);
        setCalculation('');
        return;
      }

      if (isNaN(radiusM) || isNaN(heightM) || radiusM <= 0 || heightM <= 0) {
        setResult(null);
        setCalculation('Error: Radius and height must be positive numbers.');
        return;
      }

      // Cylinder volume = π × r² × h
      const cylVolM3 = Math.PI * radiusM * radiusM * heightM;

      setResult({ value: cylVolM3, unit: 'm³' });
      setCalculation(`Cylinder Volume = π × r² × h = π × ${formatValue(radiusM)}² × ${formatValue(heightM)} = ${formatValue(cylVolM3)} m³`);
    }
  };

  const handleCalculate = () => {
    calculate();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Density of a Cylinder Calculator</h2>
          
          <div className="border-b-2 border-gray-200 pb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Calculation Method</label>
            <div className="grid grid-cols-1 gap-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="density-from-mass-volume"
                  checked={method === 'density-from-mass-volume'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Density from Mass & Volume</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="mass-from-density-volume"
                  checked={method === 'mass-from-density-volume'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Mass from Density & Volume</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="volume-from-density-mass"
                  checked={method === 'volume-from-density-mass'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Volume from Density & Mass</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="method"
                  value="cylinder-volume-from-dimensions"
                  checked={method === 'cylinder-volume-from-dimensions'}
                  onChange={(e) => {
                    setMethod(e.target.value as CalculationMethod);
                    setResult(null);
                    setCalculation('');
                  }}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Find Cylinder Volume from Dimensions</span>
              </label>
            </div>
          </div>

          {method === 'density-from-mass-volume' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Mass"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    placeholder="e.g., 5"
                    type="number"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={massUnit}
                    onChange={(e) => setMassUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="mg">mg</option>
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Volume"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    placeholder="e.g., 0.001"
                    type="number"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={volumeUnit}
                    onChange={(e) => setVolumeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="m3">m³</option>
                    <option value="cm3">cm³</option>
                    <option value="mm3">mm³</option>
                    <option value="L">L</option>
                    <option value="mL">mL</option>
                    <option value="in3">in³</option>
                    <option value="ft3">ft³</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'mass-from-density-volume' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Density"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    placeholder="e.g., 5000"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={densityUnit}
                    onChange={(e) => setDensityUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="kg/m3">kg/m³</option>
                    <option value="g/cm3">g/cm³</option>
                    <option value="g/mL">g/mL</option>
                    <option value="lb/in3">lb/in³</option>
                    <option value="lb/ft3">lb/ft³</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Volume"
                    value={volumeForMass}
                    onChange={(e) => setVolumeForMass(e.target.value)}
                    placeholder="e.g., 0.001"
                    type="number"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={volumeUnitForMass}
                    onChange={(e) => setVolumeUnitForMass(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="m3">m³</option>
                    <option value="cm3">cm³</option>
                    <option value="mm3">mm³</option>
                    <option value="L">L</option>
                    <option value="mL">mL</option>
                    <option value="in3">in³</option>
                    <option value="ft3">ft³</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'volume-from-density-mass' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Density"
                    value={densityForVolume}
                    onChange={(e) => setDensityForVolume(e.target.value)}
                    placeholder="e.g., 5000"
                    type="number"
                  />
                </div>
                <div className="w-28">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={densityUnitForVolume}
                    onChange={(e) => setDensityUnitForVolume(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="kg/m3">kg/m³</option>
                    <option value="g/cm3">g/cm³</option>
                    <option value="g/mL">g/mL</option>
                    <option value="lb/in3">lb/in³</option>
                    <option value="lb/ft3">lb/ft³</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Mass"
                    value={massForVolume}
                    onChange={(e) => setMassForVolume(e.target.value)}
                    placeholder="e.g., 5"
                    type="number"
                  />
                </div>
                <div className="w-24">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={massUnitForVolume}
                    onChange={(e) => setMassUnitForVolume(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="mg">mg</option>
                    <option value="lb">lb</option>
                    <option value="oz">oz</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {method === 'cylinder-volume-from-dimensions' && (
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Radius"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="e.g., 0.1"
                    type="number"
                  />
                </div>
                <div className="w-20">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={radiusUnit}
                    onChange={(e) => setRadiusUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="in">in</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    label="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="e.g., 0.5"
                    type="number"
                  />
                </div>
                <div className="w-20">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Unit</label>
                  <select
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#820ECC]"
                  >
                    <option value="m">m</option>
                    <option value="cm">cm</option>
                    <option value="mm">mm</option>
                    <option value="in">in</option>
                    <option value="ft">ft</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full bg-[#820ECC] text-white font-semibold py-3 rounded-lg hover:bg-[#6b0aa6] transition">
            Calculate
          </Button>

          {result && (
            <div className="bg-[#820ECC]/10 border-l-4 border-[#820ECC] p-4 rounded">
              <p className="text-gray-600 text-sm mb-2">{calculation}</p>
              <p className="text-2xl font-bold text-[#820ECC]">
                {formatValue(result.value)} {result.unit}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
