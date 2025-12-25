'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'windLoad' | 'windVelocity' | 'area' | 'dragCoefficient';

interface WindLoadCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

export default function WindLoadCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: WindLoadCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('windLoad');
  const [windLoad, setWindLoad] = useState('');
  const [windVelocity, setWindVelocity] = useState('');
  const [airDensity, setAirDensity] = useState('1.225');
  const [area, setArea] = useState('');
  const [dragCoefficient, setDragCoefficient] = useState('1.0');
  const [forceUnit, setForceUnit] = useState('N');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [areaUnit, setAreaUnit] = useState('m²');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

  // Unit conversion factors (all relative to base units: N, m/s, kg/m³, m²)
  const forceUnits = {
    'N': { name: 'N (Newtons)', factor: 1 },
    'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
    'mN': { name: 'mN (Millinewtons)', factor: 0.001 },
    'lb': { name: 'lb (Pounds-force)', factor: 4.44822 },
    'dyn': { name: 'dyn (Dynes)', factor: 0.00001 }
  };

  const velocityUnits = {
    'm/s': { name: 'm/s (Meters per second)', factor: 1 },
    'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
    'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
    'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
    'knots': { name: 'knots', factor: 0.514444 }
  };

  const densityUnits = {
    'kg/m³': { name: 'kg/m³ (Kilograms per cubic meter)', factor: 1 },
    'g/cm³': { name: 'g/cm³ (Grams per cubic centimeter)', factor: 1000 },
    'g/mL': { name: 'g/mL (Grams per milliliter)', factor: 1000 },
    'lb/ft³': { name: 'lb/ft³ (Pounds per cubic foot)', factor: 16.0185 }
  };

  const areaUnits = {
    'm²': { name: 'm² (Square meters)', factor: 1 },
    'cm²': { name: 'cm² (Square centimeters)', factor: 0.0001 },
    'mm²': { name: 'mm² (Square millimeters)', factor: 0.000001 },
    'km²': { name: 'km² (Square kilometers)', factor: 1000000 },
    'ft²': { name: 'ft² (Square feet)', factor: 0.092903 },
    'in²': { name: 'in² (Square inches)', factor: 0.00064516 }
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

  const convertForceToBase = (value: number, unit: string) => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string) => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string) => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string) => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertDensityToBase = (value: number, unit: string) => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertDensityFromBase = (value: number, unit: string) => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertAreaToBase = (value: number, unit: string) => {
    return value * areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertAreaFromBase = (value: number, unit: string) => {
    return value / areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const f = windLoad ? parseFloat(windLoad) : NaN;
    const v = windVelocity ? parseFloat(windVelocity) : NaN;
    const rho = airDensity ? parseFloat(airDensity) : NaN;
    const a = area ? parseFloat(area) : NaN;
    const cd = dragCoefficient ? parseFloat(dragCoefficient) : NaN;

    if (calculationMode === 'windLoad') {
      // Calculate wind load: F = 0.5 × ρ × v² × A × Cd
      if (!windVelocity || !airDensity || !area || !dragCoefficient) {
        setError('Please enter wind velocity, air density, area, and drag coefficient');
        return;
      }

      if (isNaN(v) || v < 0) {
        setError('Wind velocity must be a valid non-negative number');
        return;
      }
      if (isNaN(rho) || rho <= 0) {
        setError('Air density must be a valid positive number');
        return;
      }
      if (isNaN(a) || a <= 0) {
        setError('Area must be a valid positive number');
        return;
      }
      if (isNaN(cd) || cd <= 0) {
        setError('Drag coefficient must be a valid positive number');
        return;
      }

      const vBase = convertVelocityToBase(v, velocityUnit);
      const rhoBase = convertDensityToBase(rho, densityUnit);
      const aBase = convertAreaToBase(a, areaUnit);
      const fBase = 0.5 * rhoBase * vBase * vBase * aBase * cd;
      const fResult = convertForceFromBase(fBase, forceUnit);

      setResult({ value: fResult, unit: forceUnit, label: 'Wind Load' });
      setCalculation(`Wind Load = 0.5 × Air Density × Velocity² × Area × Drag Coefficient\nF = 0.5 × ρ × v² × A × Cd\nF = 0.5 × ${formatValue(rho)} ${densityUnit} × (${formatValue(v)} ${velocityUnit})² × ${formatValue(a)} ${areaUnit} × ${formatValue(cd)}\nF = 0.5 × ${formatValue(rhoBase)} kg/m³ × (${formatValue(vBase)} m/s)² × ${formatValue(aBase)} m² × ${formatValue(cd)}\nF = 0.5 × ${formatValue(rhoBase)} × ${formatValue(vBase * vBase)} × ${formatValue(aBase)} × ${formatValue(cd)} N\nF = ${formatValue(fBase)} N = ${formatValue(fResult)} ${forceUnit}`);
    } else if (calculationMode === 'windVelocity') {
      // Calculate wind velocity: v = √(2F / (ρ × A × Cd))
      if (!windLoad || !airDensity || !area || !dragCoefficient) {
        setError('Please enter wind load, air density, area, and drag coefficient');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setError('Wind load must be a valid positive number');
        return;
      }
      if (isNaN(rho) || rho <= 0) {
        setError('Air density must be a valid positive number');
        return;
      }
      if (isNaN(a) || a <= 0) {
        setError('Area must be a valid positive number');
        return;
      }
      if (isNaN(cd) || cd <= 0) {
        setError('Drag coefficient must be a valid positive number');
        return;
      }

      const fBase = convertForceToBase(f, forceUnit);
      const rhoBase = convertDensityToBase(rho, densityUnit);
      const aBase = convertAreaToBase(a, areaUnit);
      const vBase = Math.sqrt((2 * fBase) / (rhoBase * aBase * cd));
      const vResult = convertVelocityFromBase(vBase, velocityUnit);

      setResult({ value: vResult, unit: velocityUnit, label: 'Wind Velocity' });
      setCalculation(`Wind Velocity = √(2 × Wind Load / (Air Density × Area × Drag Coefficient))\nv = √(2F / (ρ × A × Cd))\nv = √(2 × ${formatValue(f)} ${forceUnit} / (${formatValue(rho)} ${densityUnit} × ${formatValue(a)} ${areaUnit} × ${formatValue(cd)}))\nv = √(2 × ${formatValue(fBase)} N / (${formatValue(rhoBase)} kg/m³ × ${formatValue(aBase)} m² × ${formatValue(cd)}))\nv = √(${formatValue(2 * fBase / (rhoBase * aBase * cd))} m²/s²)\nv = ${formatValue(vBase)} m/s = ${formatValue(vResult)} ${velocityUnit}`);
    } else if (calculationMode === 'area') {
      // Calculate area: A = 2F / (ρ × v² × Cd)
      if (!windLoad || !windVelocity || !airDensity || !dragCoefficient) {
        setError('Please enter wind load, wind velocity, air density, and drag coefficient');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setError('Wind load must be a valid positive number');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setError('Wind velocity must be a valid positive number');
        return;
      }
      if (isNaN(rho) || rho <= 0) {
        setError('Air density must be a valid positive number');
        return;
      }
      if (isNaN(cd) || cd <= 0) {
        setError('Drag coefficient must be a valid positive number');
        return;
      }

      const fBase = convertForceToBase(f, forceUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const rhoBase = convertDensityToBase(rho, densityUnit);
      const aBase = (2 * fBase) / (rhoBase * vBase * vBase * cd);
      const aResult = convertAreaFromBase(aBase, areaUnit);

      setResult({ value: aResult, unit: areaUnit, label: 'Area' });
      setCalculation(`Area = 2 × Wind Load / (Air Density × Velocity² × Drag Coefficient)\nA = 2F / (ρ × v² × Cd)\nA = 2 × ${formatValue(f)} ${forceUnit} / (${formatValue(rho)} ${densityUnit} × (${formatValue(v)} ${velocityUnit})² × ${formatValue(cd)})\nA = 2 × ${formatValue(fBase)} N / (${formatValue(rhoBase)} kg/m³ × (${formatValue(vBase)} m/s)² × ${formatValue(cd)})\nA = ${formatValue(2 * fBase)} N / (${formatValue(rhoBase * vBase * vBase * cd)} kg·m/s²)\nA = ${formatValue(aBase)} m² = ${formatValue(aResult)} ${areaUnit}`);
    } else if (calculationMode === 'dragCoefficient') {
      // Calculate drag coefficient: Cd = 2F / (ρ × v² × A)
      if (!windLoad || !windVelocity || !airDensity || !area) {
        setError('Please enter wind load, wind velocity, air density, and area');
        return;
      }

      if (isNaN(f) || f <= 0) {
        setError('Wind load must be a valid positive number');
        return;
      }
      if (isNaN(v) || v <= 0) {
        setError('Wind velocity must be a valid positive number');
        return;
      }
      if (isNaN(rho) || rho <= 0) {
        setError('Air density must be a valid positive number');
        return;
      }
      if (isNaN(a) || a <= 0) {
        setError('Area must be a valid positive number');
        return;
      }

      const fBase = convertForceToBase(f, forceUnit);
      const vBase = convertVelocityToBase(v, velocityUnit);
      const rhoBase = convertDensityToBase(rho, densityUnit);
      const aBase = convertAreaToBase(a, areaUnit);
      const cdResult = (2 * fBase) / (rhoBase * vBase * vBase * aBase);

      setResult({ value: cdResult, unit: '', label: 'Drag Coefficient' });
      setCalculation(`Drag Coefficient = 2 × Wind Load / (Air Density × Velocity² × Area)\nCd = 2F / (ρ × v² × A)\nCd = 2 × ${formatValue(f)} ${forceUnit} / (${formatValue(rho)} ${densityUnit} × (${formatValue(v)} ${velocityUnit})² × ${formatValue(a)} ${areaUnit})\nCd = 2 × ${formatValue(fBase)} N / (${formatValue(rhoBase)} kg/m³ × (${formatValue(vBase)} m/s)² × ${formatValue(aBase)} m²)\nCd = ${formatValue(2 * fBase)} N / (${formatValue(rhoBase * vBase * vBase * aBase)} kg·m/s²)\nCd = ${formatValue(cdResult)}`);
    }
  };

  const clearAll = () => {
    setWindLoad('');
    setWindVelocity('');
    setAirDensity('1.225');
    setArea('');
    setDragCoefficient('1.0');
    setForceUnit('N');
    setVelocityUnit('m/s');
    setDensityUnit('kg/m³');
    setAreaUnit('m²');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wind Load Calculator</h2>
          <p className="text-gray-600">Calculate wind load, wind velocity, area, or drag coefficient for structures and objects</p>
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
            <option value="windLoad">Calculate Wind Load</option>
            <option value="windVelocity">Calculate Wind Velocity</option>
            <option value="area">Calculate Area</option>
            <option value="dragCoefficient">Calculate Drag Coefficient</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            F = 0.5 × ρ × v² × A × Cd
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: F = Wind Load, ρ = Air Density, v = Velocity, A = Area, Cd = Drag Coefficient</p>
        </div>

        {/* Wind Load Input */}
        {(calculationMode === 'windVelocity' || calculationMode === 'area' || calculationMode === 'dragCoefficient') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Wind Load (F)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter wind load"
                value={windLoad}
                onChange={(e) => setWindLoad(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <select
                value={forceUnit}
                onChange={(e) => setForceUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(forceUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Wind Velocity Input */}
        {(calculationMode === 'windLoad' || calculationMode === 'area' || calculationMode === 'dragCoefficient') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Wind Velocity (v)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter wind velocity"
                value={windVelocity}
                onChange={(e) => setWindVelocity(e.target.value)}
                className="flex-1"
              />
              <select
                value={velocityUnit}
                onChange={(e) => setVelocityUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(velocityUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Air Density Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Air Density (ρ)
          </label>
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Enter air density"
              value={airDensity}
              onChange={(e) => setAirDensity(e.target.value)}
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
            Standard air density at sea level (15°C): 1.225 kg/m³
          </p>
        </div>

        {/* Area Input */}
        {(calculationMode === 'windLoad' || calculationMode === 'windVelocity' || calculationMode === 'dragCoefficient') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Area (A)
            </label>
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="flex-1"
              />
              <select
                value={areaUnit}
                onChange={(e) => setAreaUnit(e.target.value)}
                className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
              >
                {Object.entries(areaUnits).map(([key, unit]) => (
                  <option key={key} value={key}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Projected area perpendicular to wind direction
            </p>
          </div>
        )}

        {/* Drag Coefficient Input */}
        {(calculationMode === 'windLoad' || calculationMode === 'windVelocity' || calculationMode === 'area') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Drag Coefficient (Cd)
            </label>
            <Input
              type="text"
              placeholder="Enter drag coefficient"
              value={dragCoefficient}
              onChange={(e) => setDragCoefficient(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Common values: Flat plate (2.0), Sphere (0.47), Cylinder (1.2), Car (0.3-0.4), Building (1.0-2.0)
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
            {calculationMode === 'windLoad' && (
              <>
                <li>• Enter wind velocity, air density, area, and drag coefficient</li>
                <li>• Calculator will determine the wind load (force)</li>
                <li>• Formula: F = 0.5 × ρ × v² × A × Cd</li>
              </>
            )}
            {calculationMode === 'windVelocity' && (
              <>
                <li>• Enter wind load, air density, area, and drag coefficient</li>
                <li>• Calculator will determine the wind velocity required</li>
                <li>• Formula: v = √(2F / (ρ × A × Cd))</li>
              </>
            )}
            {calculationMode === 'area' && (
              <>
                <li>• Enter wind load, wind velocity, air density, and drag coefficient</li>
                <li>• Calculator will determine the exposed area</li>
                <li>• Formula: A = 2F / (ρ × v² × Cd)</li>
              </>
            )}
            {calculationMode === 'dragCoefficient' && (
              <>
                <li>• Enter wind load, wind velocity, air density, and area</li>
                <li>• Calculator will determine the drag coefficient</li>
                <li>• Formula: Cd = 2F / (ρ × v² × A)</li>
              </>
            )}
            <li>• Standard air density at sea level (15°C, 1 atm): 1.225 kg/m³</li>
            <li>• Drag coefficient depends on object shape and surface roughness</li>
            <li>• Area should be the projected area perpendicular to wind direction</li>
            <li>• All values must be positive</li>
            <li>• This calculator provides basic wind load estimation for preliminary design</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

