'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'buoyantForce' | 'density' | 'volume';

// Unit conversion factors (all relative to base units: N, kg/m³, m³, m/s²)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
  'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
  'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
};

const densityUnits = {
  'kg/m³': { name: 'kg/m³ (Kilograms per cubic meter)', factor: 1 },
  'g/cm³': { name: 'g/cm³ (Grams per cubic centimeter)', factor: 1000 },
  'g/mL': { name: 'g/mL (Grams per milliliter)', factor: 1000 },
  'lb/ft³': { name: 'lb/ft³ (Pounds per cubic foot)', factor: 16.0185 },
  'lb/in³': { name: 'lb/in³ (Pounds per cubic inch)', factor: 27679.9 }
};

const volumeUnits = {
  'm³': { name: 'm³ (Cubic meters)', factor: 1 },
  'L': { name: 'L (Liters)', factor: 0.001 },
  'mL': { name: 'mL (Milliliters)', factor: 0.000001 },
  'cm³': { name: 'cm³ (Cubic centimeters)', factor: 0.000001 },
  'ft³': { name: 'ft³ (Cubic feet)', factor: 0.0283168 },
  'in³': { name: 'in³ (Cubic inches)', factor: 0.0000163871 },
  'gal': { name: 'gal (US gallons)', factor: 0.00378541 }
};

const gravityUnits = {
  'm/s²': { name: 'm/s² (Meters per second squared)', factor: 1 },
  'cm/s²': { name: 'cm/s² (Centimeters per second squared)', factor: 0.01 },
  'ft/s²': { name: 'ft/s² (Feet per second squared)', factor: 0.3048 },
  'g': { name: 'g (Standard gravity)', factor: 9.80665 }
};

interface BuoyancyCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function BuoyancyCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: BuoyancyCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('buoyantForce');
  const [buoyantForce, setBuoyantForce] = useState('');
  const [density, setDensity] = useState('');
  const [volume, setVolume] = useState('');
  const [gravity, setGravity] = useState('9.8');
  const [forceUnit, setForceUnit] = useState('N');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [volumeUnit, setVolumeUnit] = useState('m³');
  const [gravityUnit, setGravityUnit] = useState('m/s²');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
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

  const convertDensityToBase = (value: number, unit: string) => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertDensityFromBase = (value: number, unit: string) => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertVolumeToBase = (value: number, unit: string) => {
    return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertVolumeFromBase = (value: number, unit: string) => {
    return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertGravityToBase = (value: number, unit: string) => {
    return value * gravityUnits[unit as keyof typeof gravityUnits].factor;
  };

  const convertGravityFromBase = (value: number, unit: string) => {
    return value / gravityUnits[unit as keyof typeof gravityUnits].factor;
  };

  const calculate = () => {
    const fb = buoyantForce ? parseFloat(buoyantForce) : NaN;
    const rho = density ? parseFloat(density) : NaN;
    const v = volume ? parseFloat(volume) : NaN;
    const g = gravity ? parseFloat(gravity) : NaN;

    if (calculationMode === 'buoyantForce') {
      // Calculate buoyant force: F_b = ρ × V × g
      if (!density || !volume || !gravity) {
        setResult(null);
        setCalculation('Error: Please enter density, volume, and gravity');
        return;
      }

      if (isNaN(rho) || rho <= 0) {
        setResult(null);
        setCalculation('Error: Density must be a valid positive number');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setResult(null);
        setCalculation('Error: Volume must be a valid positive number');
        return;
      }
      if (isNaN(g) || g <= 0) {
        setResult(null);
        setCalculation('Error: Gravity must be a valid positive number');
        return;
      }

      const rhoBase = convertDensityToBase(rho, densityUnit);
      const vBase = convertVolumeToBase(v, volumeUnit);
      const gBase = convertGravityToBase(g, gravityUnit);
      const fbBase = rhoBase * vBase * gBase;
      const fbResult = convertForceFromBase(fbBase, forceUnit);

      setResult({ value: fbResult, unit: forceUnit, label: 'Buoyant Force' });
      setCalculation(`Buoyant Force = Density × Volume × Gravity\nF_b = ρ × V × g\nF_b = ${formatValue(rho)} ${densityUnit} × ${formatValue(v)} ${volumeUnit} × ${formatValue(g)} ${gravityUnit}\nF_b = ${formatValue(rhoBase)} kg/m³ × ${formatValue(vBase)} m³ × ${formatValue(gBase)} m/s²\nF_b = ${formatValue(fbBase)} N = ${formatValue(fbResult)} ${forceUnit}`);
    } else if (calculationMode === 'density') {
      // Calculate density: ρ = F_b / (V × g)
      if (!buoyantForce || !volume || !gravity) {
        setResult(null);
        setCalculation('Error: Please enter buoyant force, volume, and gravity');
        return;
      }

      if (isNaN(fb) || fb <= 0) {
        setResult(null);
        setCalculation('Error: Buoyant force must be a valid positive number');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setResult(null);
        setCalculation('Error: Volume must be a valid positive number');
        return;
      }
      if (isNaN(g) || g <= 0) {
        setResult(null);
        setCalculation('Error: Gravity must be a valid positive number');
        return;
      }

      const fbBase = convertForceToBase(fb, forceUnit);
      const vBase = convertVolumeToBase(v, volumeUnit);
      const gBase = convertGravityToBase(g, gravityUnit);
      const rhoBase = fbBase / (vBase * gBase);
      const rhoResult = convertDensityFromBase(rhoBase, densityUnit);

      setResult({ value: rhoResult, unit: densityUnit, label: 'Fluid Density' });
      setCalculation(`Density = Buoyant Force / (Volume × Gravity)\nρ = F_b / (V × g)\nρ = ${formatValue(fb)} ${forceUnit} / (${formatValue(v)} ${volumeUnit} × ${formatValue(g)} ${gravityUnit})\nρ = ${formatValue(fbBase)} N / (${formatValue(vBase)} m³ × ${formatValue(gBase)} m/s²)\nρ = ${formatValue(fbBase)} N / ${formatValue(vBase * gBase)} (kg·m/s²)\nρ = ${formatValue(rhoBase)} kg/m³ = ${formatValue(rhoResult)} ${densityUnit}`);
    } else if (calculationMode === 'volume') {
      // Calculate volume: V = F_b / (ρ × g)
      if (!buoyantForce || !density || !gravity) {
        setResult(null);
        setCalculation('Error: Please enter buoyant force, density, and gravity');
        return;
      }

      if (isNaN(fb) || fb <= 0) {
        setResult(null);
        setCalculation('Error: Buoyant force must be a valid positive number');
        return;
      }
      if (isNaN(rho) || rho <= 0) {
        setResult(null);
        setCalculation('Error: Density must be a valid positive number');
        return;
      }
      if (isNaN(g) || g <= 0) {
        setResult(null);
        setCalculation('Error: Gravity must be a valid positive number');
        return;
      }

      const fbBase = convertForceToBase(fb, forceUnit);
      const rhoBase = convertDensityToBase(rho, densityUnit);
      const gBase = convertGravityToBase(g, gravityUnit);
      const vBase = fbBase / (rhoBase * gBase);
      const vResult = convertVolumeFromBase(vBase, volumeUnit);

      setResult({ value: vResult, unit: volumeUnit, label: 'Displaced Volume' });
      setCalculation(`Volume = Buoyant Force / (Density × Gravity)\nV = F_b / (ρ × g)\nV = ${formatValue(fb)} ${forceUnit} / (${formatValue(rho)} ${densityUnit} × ${formatValue(g)} ${gravityUnit})\nV = ${formatValue(fbBase)} N / (${formatValue(rhoBase)} kg/m³ × ${formatValue(gBase)} m/s²)\nV = ${formatValue(fbBase)} N / ${formatValue(rhoBase * gBase)} (kg/(m²·s²))\nV = ${formatValue(vBase)} m³ = ${formatValue(vResult)} ${volumeUnit}`);
    }
  };

  const clearAll = () => {
    setBuoyantForce('');
    setDensity('');
    setVolume('');
    setGravity('9.8');
    setForceUnit('N');
    setDensityUnit('kg/m³');
    setVolumeUnit('m³');
    setGravityUnit('m/s²');
    setResult(null);
    setCalculation('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Buoyancy Calculator</h2>
        <p className="text-gray-600">Calculate buoyant force, fluid density, or displaced volume using Archimedes&apos; principle</p>
      </div>

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Mode
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="buoyantForce">Calculate Buoyant Force</option>
            <option value="density">Calculate Fluid Density</option>
            <option value="volume">Calculate Displaced Volume</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula (Archimedes&apos; Principle):</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            F_b = ρ × V × g
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: F_b = Buoyant Force, ρ = Density, V = Volume, g = Gravity</p>
        </div>

        {/* Buoyant Force Input */}
        {(calculationMode === 'density' || calculationMode === 'volume') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Buoyant Force (F_b)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter buoyant force"
                  value={buoyantForce}
                  onChange={(e) => setBuoyantForce(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={forceUnit}
                  onChange={(e) => setForceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
        )}

        {/* Density Input */}
        {(calculationMode === 'buoyantForce' || calculationMode === 'volume') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Fluid Density (ρ)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter fluid density"
                  value={density}
                  onChange={(e) => setDensity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-48">
                <select
                  value={densityUnit}
                  onChange={(e) => setDensityUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(densityUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Examples: Water = 1000 kg/m³, Seawater = 1025 kg/m³, Air = 1.225 kg/m³
            </p>
          </div>
        )}

        {/* Volume Input */}
        {(calculationMode === 'buoyantForce' || calculationMode === 'density') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Displaced Volume (V)
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
            <p className="text-xs text-gray-500 mt-1">
              Volume of fluid displaced or volume of object submerged
            </p>
          </div>
        )}

        {/* Gravity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Acceleration Due to Gravity (g)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter gravity"
                value={gravity}
                onChange={(e) => setGravity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={gravityUnit}
                onChange={(e) => setGravityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(gravityUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Standard Earth gravity: 9.8 m/s² or 1 g (9.80665 m/s²)
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            onClick={calculate}
            className="flex-1"
            style={{ backgroundColor: primaryColor }}
          >
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}30`, borderWidth: '1px', borderStyle: 'solid' }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Result</h3>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {formatValue(result.value)} {result.unit}
            </p>
            <p className="text-sm mt-1" style={{ color: `${primaryColor}CC` }}>
              {result.label}
            </p>
            {calculation && !calculation.startsWith('Error:') && (
              <div className="text-sm mt-3 font-mono whitespace-pre-line" style={{ color: `${primaryColor}CC` }}>
                {calculation}
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
            {calculationMode === 'buoyantForce' && (
              <>
                <li>• Enter fluid density, displaced volume, and gravity</li>
                <li>• Calculator will determine the buoyant force</li>
                <li>• Formula: F_b = ρ × V × g (Archimedes&apos; Principle)</li>
              </>
            )}
            {calculationMode === 'density' && (
              <>
                <li>• Enter buoyant force, displaced volume, and gravity</li>
                <li>• Calculator will determine the fluid density</li>
                <li>• Formula: ρ = F_b / (V × g)</li>
              </>
            )}
            {calculationMode === 'volume' && (
              <>
                <li>• Enter buoyant force, fluid density, and gravity</li>
                <li>• Calculator will determine the displaced volume</li>
                <li>• Formula: V = F_b / (ρ × g)</li>
              </>
            )}
            <li>• Standard Earth gravity: 9.8 m/s² (or use 1 g for 9.80665 m/s²)</li>
            <li>• Displaced volume = volume of object submerged in fluid</li>
            <li>• Buoyant force is the upward force exerted by a fluid on an immersed object</li>
            <li>• All values must be positive</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

