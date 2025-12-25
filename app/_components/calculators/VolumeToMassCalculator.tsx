'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'mass' | 'volume' | 'density';

interface VolumeToMassCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function VolumeToMassCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: VolumeToMassCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('mass');
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [density, setDensity] = useState('');
  const [massUnit, setMassUnit] = useState('kg');
  const [volumeUnit, setVolumeUnit] = useState('m³');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  // Unit conversion factors (all relative to base units: kg, m³, kg/m³)
  const massUnits = {
    'kg': { name: 'kg (Kilograms)', factor: 1 },
    'g': { name: 'g (Grams)', factor: 0.001 },
    'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
    'lb': { name: 'lb (Pounds)', factor: 0.453592 },
    'oz': { name: 'oz (Ounces)', factor: 0.0283495 },
    'ton': { name: 'ton (Metric tons)', factor: 1000 }
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

  const densityUnits = {
    'kg/m³': { name: 'kg/m³ (Kilograms per cubic meter)', factor: 1 },
    'g/cm³': { name: 'g/cm³ (Grams per cubic centimeter)', factor: 1000 },
    'g/mL': { name: 'g/mL (Grams per milliliter)', factor: 1000 },
    'lb/ft³': { name: 'lb/ft³ (Pounds per cubic foot)', factor: 16.0185 },
    'lb/in³': { name: 'lb/in³ (Pounds per cubic inch)', factor: 27679.9 }
  };

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

  const convertMassToBase = (value: number, unit: string) => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string) => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertVolumeToBase = (value: number, unit: string) => {
    return value * volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertVolumeFromBase = (value: number, unit: string) => {
    return value / volumeUnits[unit as keyof typeof volumeUnits].factor;
  };

  const convertDensityToBase = (value: number, unit: string) => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertDensityFromBase = (value: number, unit: string) => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const m = mass ? parseFloat(mass) : NaN;
    const v = volume ? parseFloat(volume) : NaN;
    const d = density ? parseFloat(density) : NaN;

    if (calculationMode === 'mass') {
      // Calculate mass: m = ρ × V
      if (!density || !volume) {
        setError('Please enter both density and volume');
        return;
      }

      if (isNaN(d) || d <= 0) {
        setError('Density must be a valid positive number');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setError('Volume must be a valid positive number');
        return;
      }

      const dBase = convertDensityToBase(d, densityUnit);
      const vBase = convertVolumeToBase(v, volumeUnit);
      const mBase = dBase * vBase;
      const mResult = convertMassFromBase(mBase, massUnit);

      setResult({ value: mResult, unit: massUnit, label: 'Mass' });
      setCalculation(`Mass = Density × Volume\nm = ρ × V\nm = ${formatValue(d)} ${densityUnit} × ${formatValue(v)} ${volumeUnit}\nm = ${formatValue(dBase)} kg/m³ × ${formatValue(vBase)} m³\nm = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnit}`);
    } else if (calculationMode === 'volume') {
      // Calculate volume: V = m / ρ
      if (!mass || !density) {
        setError('Please enter both mass and density');
        return;
      }

      if (isNaN(m) || m <= 0) {
        setError('Mass must be a valid positive number');
        return;
      }
      if (isNaN(d) || d <= 0) {
        setError('Density must be a valid positive number');
        return;
      }

      const mBase = convertMassToBase(m, massUnit);
      const dBase = convertDensityToBase(d, densityUnit);
      const vBase = mBase / dBase;
      const vResult = convertVolumeFromBase(vBase, volumeUnit);

      setResult({ value: vResult, unit: volumeUnit, label: 'Volume' });
      setCalculation(`Volume = Mass ÷ Density\nV = m / ρ\nV = ${formatValue(m)} ${massUnit} ÷ ${formatValue(d)} ${densityUnit}\nV = ${formatValue(mBase)} kg ÷ ${formatValue(dBase)} kg/m³\nV = ${formatValue(vBase)} m³ = ${formatValue(vResult)} ${volumeUnit}`);
    } else if (calculationMode === 'density') {
      // Calculate density: ρ = m / V
      if (!mass || !volume) {
        setError('Please enter both mass and volume');
        return;
      }

      if (isNaN(m) || m <= 0) {
        setError('Mass must be a valid positive number');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setError('Volume must be a valid positive number');
        return;
      }

      const mBase = convertMassToBase(m, massUnit);
      const vBase = convertVolumeToBase(v, volumeUnit);
      const dBase = mBase / vBase;
      const dResult = convertDensityFromBase(dBase, densityUnit);

      setResult({ value: dResult, unit: densityUnit, label: 'Density' });
      setCalculation(`Density = Mass ÷ Volume\nρ = m / V\nρ = ${formatValue(m)} ${massUnit} ÷ ${formatValue(v)} ${volumeUnit}\nρ = ${formatValue(mBase)} kg ÷ ${formatValue(vBase)} m³\nρ = ${formatValue(dBase)} kg/m³ = ${formatValue(dResult)} ${densityUnit}`);
    }
  };

  const clearAll = () => {
    setMass('');
    setVolume('');
    setDensity('');
    setMassUnit('kg');
    setVolumeUnit('m³');
    setDensityUnit('kg/m³');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Volume to Mass Calculator</h2>
          <p className="text-gray-600">Calculate mass from volume and density, or volume from mass and density</p>
        </div>
      )}

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
            <option value="mass">Calculate Mass from Volume and Density</option>
            <option value="volume">Calculate Volume from Mass and Density</option>
            <option value="density">Calculate Density from Mass and Volume</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            m = ρ × V
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: m = Mass, ρ (rho) = Density, V = Volume</p>
        </div>

        {/* Mass Input */}
        {(calculationMode === 'volume' || calculationMode === 'density') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mass (m)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter mass"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(massUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Volume Input */}
        {(calculationMode === 'mass' || calculationMode === 'density') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Volume (V)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter volume"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="flex-1"
              />
              <select
                value={volumeUnit}
                onChange={(e) => setVolumeUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(volumeUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Density Input */}
        {(calculationMode === 'mass' || calculationMode === 'volume') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Density (ρ)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter density"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="flex-1"
              />
              <select
                value={densityUnit}
                onChange={(e) => setDensityUnit(e.target.value)}
                className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(densityUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Examples: Water = 1000 kg/m³, Iron = 7850 kg/m³, Air = 1.225 kg/m³
            </p>
          </div>
        )}

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

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationMode === 'mass' && (
              <>
                <li>• Enter density and volume</li>
                <li>• Calculator will determine the mass</li>
                <li>• Formula: m = ρ × V (Mass = Density × Volume)</li>
              </>
            )}
            {calculationMode === 'volume' && (
              <>
                <li>• Enter mass and density</li>
                <li>• Calculator will determine the volume</li>
                <li>• Formula: V = m / ρ (Volume = Mass ÷ Density)</li>
              </>
            )}
            {calculationMode === 'density' && (
              <>
                <li>• Enter mass and volume</li>
                <li>• Calculator will determine the density</li>
                <li>• Formula: ρ = m / V (Density = Mass ÷ Volume)</li>
              </>
            )}
            <li>• All values must be positive</li>
            <li>• The calculator supports multiple units for each parameter</li>
            <li>• Common densities: Water (1000 kg/m³), Iron (7850 kg/m³), Aluminum (2700 kg/m³), Air (1.225 kg/m³)</li>
            <li>• This calculator is useful for converting between volume and mass when density is known</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

