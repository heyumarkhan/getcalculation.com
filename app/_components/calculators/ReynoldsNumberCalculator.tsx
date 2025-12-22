'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Unit conversion factors (all relative to base units: dimensionless, kg/m³, m/s, m, Pa·s)
const densityUnits = {
  'kg/m³': { name: 'kg/m³', factor: 1 },
  'g/cm³': { name: 'g/cm³', factor: 1000 },
  'g/L': { name: 'g/L', factor: 1 },
  'lb/ft³': { name: 'lb/ft³', factor: 16.0185 },
  'lb/in³': { name: 'lb/in³', factor: 27679.9 }
};

const velocityUnits = {
  'm/s': { name: 'm/s', factor: 1 },
  'cm/s': { name: 'cm/s', factor: 0.01 },
  'mm/s': { name: 'mm/s', factor: 0.001 },
  'km/h': { name: 'km/h', factor: 0.277778 },
  'ft/s': { name: 'ft/s', factor: 0.3048 },
  'in/s': { name: 'in/s', factor: 0.0254 },
  'mph': { name: 'mph', factor: 0.44704 }
};

const lengthUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'km': { name: 'km (Kilometers)', factor: 1000 }
};

const viscosityUnits = {
  'Pa·s': { name: 'Pa·s (Pascal-seconds)', factor: 1 },
  'N·s/m²': { name: 'N·s/m²', factor: 1 },
  'cP': { name: 'cP (Centipoise)', factor: 0.001 },
  'P': { name: 'P (Poise)', factor: 0.1 },
  'lb·s/ft²': { name: 'lb·s/ft²', factor: 47.8803 },
  'lb·s/in²': { name: 'lb·s/in²', factor: 6894.76 }
};

export default function ReynoldsNumberCalculator() {
  const [reynoldsNumber, setReynoldsNumber] = useState('');
  const [density, setDensity] = useState('');
  const [velocity, setVelocity] = useState('');
  const [diameter, setDiameter] = useState('');
  const [viscosity, setViscosity] = useState('');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [diameterUnit, setDiameterUnit] = useState('m');
  const [viscosityUnit, setViscosityUnit] = useState('Pa·s');
  const [result, setResult] = useState<{ value: number; unit: string; type: 'reynolds' | 'density' | 'velocity' | 'diameter' | 'viscosity' } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [flowRegime, setFlowRegime] = useState<string>('');

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

  const convertDensityToBase = (value: number, unit: string) => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertDensityFromBase = (value: number, unit: string) => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string) => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertLengthToBase = (value: number, unit: string) => {
    return value * lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertLengthFromBase = (value: number, unit: string) => {
    return value / lengthUnits[unit as keyof typeof lengthUnits].factor;
  };

  const convertViscosityToBase = (value: number, unit: string) => {
    return value * viscosityUnits[unit as keyof typeof viscosityUnits].factor;
  };

  const convertViscosityFromBase = (value: number, unit: string) => {
    return value / viscosityUnits[unit as keyof typeof viscosityUnits].factor;
  };

  const getFlowRegime = (re: number): string => {
    if (re < 2300) {
      return 'Laminar Flow (Re < 2300)';
    } else if (re >= 2300 && re <= 4000) {
      return 'Transitional Flow (2300 ≤ Re ≤ 4000)';
    } else {
      return 'Turbulent Flow (Re > 4000)';
    }
  };

  const calculate = () => {
    const re = reynoldsNumber ? parseFloat(reynoldsNumber) : NaN;
    const ρ = density ? parseFloat(density) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;
    const D = diameter ? parseFloat(diameter) : NaN;
    const μ = viscosity ? parseFloat(viscosity) : NaN;

    const filledCount = [reynoldsNumber, density, velocity, diameter, viscosity].filter(val => val !== '').length;

    if (filledCount !== 4) {
      setResult(null);
      setCalculation('');
      setFlowRegime('');
      return;
    }

    // Validate that filled values are valid numbers
    if (reynoldsNumber && (isNaN(re) || re <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for Reynolds number');
      setFlowRegime('');
      return;
    }
    if (density && (isNaN(ρ) || ρ <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for density');
      setFlowRegime('');
      return;
    }
    if (velocity && (isNaN(v) || v <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for velocity');
      setFlowRegime('');
      return;
    }
    if (diameter && (isNaN(D) || D <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for diameter');
      setFlowRegime('');
      return;
    }
    if (viscosity && (isNaN(μ) || μ <= 0)) {
      setResult(null);
      setCalculation('Error: Please enter a valid positive number for viscosity');
      setFlowRegime('');
      return;
    }

    // Convert to base units
    if (!reynoldsNumber) {
      // Calculate Reynolds number: Re = (ρ × v × D) / μ
      const ρBase = convertDensityToBase(ρ, densityUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const DBase = convertLengthToBase(D, diameterUnit);
      const μBase = convertViscosityToBase(μ, viscosityUnit);
      
      if (μBase === 0) {
        setResult(null);
        setCalculation('Error: Viscosity cannot be zero');
        setFlowRegime('');
        return;
      }
      
      const reResult = (ρBase * vBase * DBase) / μBase;
      const flowRegimeResult = getFlowRegime(reResult);
      
      setResult({ value: reResult, unit: '', type: 'reynolds' });
      setFlowRegime(flowRegimeResult);
      setCalculation(`Re = (ρ × v × D) / μ = (${formatValue(ρ)} ${densityUnit} × ${formatValue(v)} ${velocityUnit} × ${formatValue(D)} ${diameterUnit}) / ${formatValue(μ)} ${viscosityUnit} = ${formatValue(reResult)}`);
    } else if (!density) {
      // Calculate density: ρ = (Re × μ) / (v × D)
      const reValue = re;
      const vBase = convertVelocityToBase(v, velocityUnit);
      const DBase = convertLengthToBase(D, diameterUnit);
      const μBase = convertViscosityToBase(μ, viscosityUnit);
      
      if (vBase === 0 || DBase === 0) {
        setResult(null);
        setCalculation('Error: Velocity and diameter cannot be zero');
        setFlowRegime('');
        return;
      }
      
      const ρBase = (reValue * μBase) / (vBase * DBase);
      const ρResult = convertDensityFromBase(ρBase, densityUnit);
      
      setResult({ value: ρResult, unit: densityUnit, type: 'density' });
      setFlowRegime('');
      setCalculation(`ρ = (Re × μ) / (v × D) = (${formatValue(re)} × ${formatValue(μ)} ${viscosityUnit}) / (${formatValue(v)} ${velocityUnit} × ${formatValue(D)} ${diameterUnit}) = ${formatValue(ρResult)} ${densityUnit}`);
    } else if (!velocity) {
      // Calculate velocity: v = (Re × μ) / (ρ × D)
      const reValue = re;
      const ρBase = convertDensityToBase(ρ, densityUnit);
      const DBase = convertLengthToBase(D, diameterUnit);
      const μBase = convertViscosityToBase(μ, viscosityUnit);
      
      if (ρBase === 0 || DBase === 0) {
        setResult(null);
        setCalculation('Error: Density and diameter cannot be zero');
        setFlowRegime('');
        return;
      }
      
      const vBase = (reValue * μBase) / (ρBase * DBase);
      const vResult = convertVelocityFromBase(vBase, velocityUnit);
      
      setResult({ value: vResult, unit: velocityUnit, type: 'velocity' });
      setFlowRegime('');
      setCalculation(`v = (Re × μ) / (ρ × D) = (${formatValue(re)} × ${formatValue(μ)} ${viscosityUnit}) / (${formatValue(ρ)} ${densityUnit} × ${formatValue(D)} ${diameterUnit}) = ${formatValue(vResult)} ${velocityUnit}`);
    } else if (!diameter) {
      // Calculate diameter: D = (Re × μ) / (ρ × v)
      const reValue = re;
      const ρBase = convertDensityToBase(ρ, densityUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const μBase = convertViscosityToBase(μ, viscosityUnit);
      
      if (ρBase === 0 || vBase === 0) {
        setResult(null);
        setCalculation('Error: Density and velocity cannot be zero');
        setFlowRegime('');
        return;
      }
      
      const DBase = (reValue * μBase) / (ρBase * vBase);
      const DResult = convertLengthFromBase(DBase, diameterUnit);
      
      setResult({ value: DResult, unit: diameterUnit, type: 'diameter' });
      setFlowRegime('');
      setCalculation(`D = (Re × μ) / (ρ × v) = (${formatValue(re)} × ${formatValue(μ)} ${viscosityUnit}) / (${formatValue(ρ)} ${densityUnit} × ${formatValue(v)} ${velocityUnit}) = ${formatValue(DResult)} ${diameterUnit}`);
    } else if (!viscosity) {
      // Calculate viscosity: μ = (ρ × v × D) / Re
      const reValue = re;
      const ρBase = convertDensityToBase(ρ, densityUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const DBase = convertLengthToBase(D, diameterUnit);
      
      if (reValue === 0) {
        setResult(null);
        setCalculation('Error: Reynolds number cannot be zero');
        setFlowRegime('');
        return;
      }
      
      const μBase = (ρBase * vBase * DBase) / reValue;
      const μResult = convertViscosityFromBase(μBase, viscosityUnit);
      
      setResult({ value: μResult, unit: viscosityUnit, type: 'viscosity' });
      setFlowRegime('');
      setCalculation(`μ = (ρ × v × D) / Re = (${formatValue(ρ)} ${densityUnit} × ${formatValue(v)} ${velocityUnit} × ${formatValue(D)} ${diameterUnit}) / ${formatValue(re)} = ${formatValue(μResult)} ${viscosityUnit}`);
    } else {
      setResult(null);
      setCalculation('');
      setFlowRegime('');
    }
  };

  const clearAll = () => {
    setReynoldsNumber('');
    setDensity('');
    setVelocity('');
    setDiameter('');
    setViscosity('');
    setDensityUnit('kg/m³');
    setVelocityUnit('m/s');
    setDiameterUnit('m');
    setViscosityUnit('Pa·s');
    setResult(null);
    setCalculation('');
    setFlowRegime('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reynolds Number Calculator</h2>
        <p className="text-gray-600">Calculate Reynolds number or any variable using Re = (ρ × v × D) / μ</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-lg font-bold text-gray-800">Re = (ρ × v × D) / μ</p>
          <p className="text-xs text-gray-500 mt-1">
            Where: Re = Reynolds number, ρ = density, v = velocity, D = diameter, μ = dynamic viscosity
          </p>
        </div>

        {/* Reynolds Number Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Reynolds Number (Re)
          </label>
          <Input
            type="text"
            placeholder="Enter Reynolds number (leave empty to calculate)"
            value={reynoldsNumber}
            onChange={(e) => setReynoldsNumber(e.target.value)}
            className="w-full"
            autoFocus
          />
        </div>

        {/* Density Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Density (ρ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter density (leave empty to calculate)"
                value={density}
                onChange={(e) => setDensity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
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
        </div>

        {/* Velocity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Velocity (v)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter velocity (leave empty to calculate)"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={velocityUnit}
                onChange={(e) => setVelocityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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

        {/* Diameter Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Characteristic Length / Diameter (D)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter diameter (leave empty to calculate)"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={diameterUnit}
                onChange={(e) => setDiameterUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(lengthUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Viscosity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dynamic Viscosity (μ)
          </label>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter viscosity (leave empty to calculate)"
                value={viscosity}
                onChange={(e) => setViscosity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-40">
              <select
                value={viscosityUnit}
                onChange={(e) => setViscosityUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(viscosityUnits).map(([key, unit]) => (
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
            {flowRegime && (
              <p className="text-sm text-[#820ECC]/80 mt-2 font-semibold">
                Flow Regime: {flowRegime}
              </p>
            )}
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
            <li>• Enter any four values to calculate the fifth (Re, ρ, v, D, or μ)</li>
            <li>• Leave the value you want to calculate empty</li>
            <li>• Formula: Re = (ρ × v × D) / μ</li>
            <li>• Select your preferred units for each measurement</li>
            <li>• The calculator automatically converts between different units</li>
            <li>• All values should be positive numbers</li>
            <li>• Flow regime is displayed when calculating Reynolds number</li>
            <li>• Laminar: Re &lt; 2300, Transitional: 2300 ≤ Re ≤ 4000, Turbulent: Re &gt; 4000</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

