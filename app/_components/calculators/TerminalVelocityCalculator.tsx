'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

// Constants
const STANDARD_GRAVITY = 9.80665; // m/s²
const STANDARD_AIR_DENSITY = 1.225; // kg/m³ at sea level, 15°C

// Unit conversion factors (all relative to base units: m/s, kg, m/s², kg/m³, m², dimensionless)
const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 0.277778 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'in/s': { name: 'in/s (Inches per second)', factor: 0.0254 },
  'cm/s': { name: 'cm/s (Centimeters per second)', factor: 0.01 }
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'mg': { name: 'mg (Milligrams)', factor: 0.000001 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 },
  'oz': { name: 'oz (Ounces)', factor: 0.0283495 }
};

const accelerationUnits = {
  'm/s²': { name: 'm/s² (Meters per second squared)', factor: 1 },
  'ft/s²': { name: 'ft/s² (Feet per second squared)', factor: 0.3048 },
  'g': { name: 'g (Standard gravity)', factor: STANDARD_GRAVITY }
};

const densityUnits = {
  'kg/m³': { name: 'kg/m³ (Kilograms per cubic meter)', factor: 1 },
  'g/cm³': { name: 'g/cm³ (Grams per cubic centimeter)', factor: 1000 },
  'g/L': { name: 'g/L (Grams per liter)', factor: 1 },
  'lb/ft³': { name: 'lb/ft³ (Pounds per cubic foot)', factor: 16.0185 }
};

const areaUnits = {
  'm²': { name: 'm² (Square meters)', factor: 1 },
  'cm²': { name: 'cm² (Square centimeters)', factor: 0.0001 },
  'mm²': { name: 'mm² (Square millimeters)', factor: 0.000001 },
  'ft²': { name: 'ft² (Square feet)', factor: 0.092903 },
  'in²': { name: 'in² (Square inches)', factor: 0.00064516 }
};

export default function TerminalVelocityCalculator() {
  const [calculationType, setCalculationType] = useState<'velocity' | 'mass' | 'area' | 'dragCoeff'>('velocity');
  const [terminalVelocity, setTerminalVelocity] = useState('');
  const [mass, setMass] = useState('');
  const [gravity, setGravity] = useState('');
  const [useStandardG, setUseStandardG] = useState(true);
  const [fluidDensity, setFluidDensity] = useState('');
  const [useStandardDensity, setUseStandardDensity] = useState(true);
  const [crossSectionalArea, setCrossSectionalArea] = useState('');
  const [dragCoefficient, setDragCoefficient] = useState('');
  
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [massUnit, setMassUnit] = useState('kg');
  const [gravityUnit, setGravityUnit] = useState('m/s²');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [areaUnit, setAreaUnit] = useState('m²');
  
  const [result, setResult] = useState<{ value: number; unit: string; type: string } | null>(null);
  const [calculation, setCalculation] = useState('');
  const [error, setError] = useState('');

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

  const convertVelocityToBase = (value: number, unit: string): number => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string): number => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string): number => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string): number => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertGravityToBase = (value: number, unit: string): number => {
    return value * accelerationUnits[unit as keyof typeof accelerationUnits].factor;
  };

  const convertDensityToBase = (value: number, unit: string): number => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertAreaToBase = (value: number, unit: string): number => {
    return value * areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertAreaFromBase = (value: number, unit: string): number => {
    return value / areaUnits[unit as keyof typeof areaUnits].factor;
  };

  // Terminal velocity formula: v = √(2mg / (ρAC_d))
  const calculateTerminalVelocity = (m: number, g: number, rho: number, A: number, Cd: number): number => {
    if (rho === 0 || A === 0 || Cd === 0 || m === 0 || g === 0) {
      return NaN;
    }
    return Math.sqrt((2 * m * g) / (rho * A * Cd));
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const vt = terminalVelocity ? parseFloat(terminalVelocity) : NaN;
    const m = mass ? parseFloat(mass) : NaN;
    const g = useStandardG ? STANDARD_GRAVITY : (gravity ? parseFloat(gravity) : NaN);
    const rho = useStandardDensity ? STANDARD_AIR_DENSITY : (fluidDensity ? parseFloat(fluidDensity) : NaN);
    const A = crossSectionalArea ? parseFloat(crossSectionalArea) : NaN;
    const Cd = dragCoefficient ? parseFloat(dragCoefficient) : NaN;

    // Validate inputs
    if (useStandardG && isNaN(g)) {
      setError('Gravity value is invalid');
      return;
    }
    if (!useStandardG && (isNaN(g) || g <= 0)) {
      setError('Gravity must be a positive number');
      return;
    }
    if (useStandardDensity && isNaN(rho)) {
      setError('Density value is invalid');
      return;
    }
    if (!useStandardDensity && (isNaN(rho) || rho <= 0)) {
      setError('Fluid density must be a positive number');
      return;
    }

    const gBase = useStandardG ? STANDARD_GRAVITY : convertGravityToBase(g, gravityUnit);
    const rhoBase = useStandardDensity ? STANDARD_AIR_DENSITY : convertDensityToBase(rho, densityUnit);

    if (calculationType === 'velocity') {
      // Calculate terminal velocity: v = √(2mg / (ρAC_d))
      if (isNaN(m) || m <= 0 || isNaN(A) || A <= 0 || isNaN(Cd) || Cd <= 0) {
        setError('Please enter valid positive values for mass, cross-sectional area, and drag coefficient');
        return;
      }

      const mBase = convertMassToBase(m, massUnit);
      const ABase = convertAreaToBase(A, areaUnit);

      const vtBase = calculateTerminalVelocity(mBase, gBase, rhoBase, ABase, Cd);
      if (isNaN(vtBase) || vtBase <= 0) {
        setError('Invalid calculation result - check your inputs');
        return;
      }

      const vtResult = convertVelocityFromBase(vtBase, velocityUnit);
      setResult({ value: vtResult, unit: velocityUnit, type: 'velocity' });

      setCalculation(`v_terminal = √(2mg / (ρAC_d))\nv_terminal = √(2 × ${formatValue(mBase)} kg × ${formatValue(gBase)} m/s² / (${formatValue(rhoBase)} kg/m³ × ${formatValue(ABase)} m² × ${formatValue(Cd)}))\nv_terminal = √(${formatValue(2 * mBase * gBase)} / ${formatValue(rhoBase * ABase * Cd)})\nv_terminal = √(${formatValue((2 * mBase * gBase) / (rhoBase * ABase * Cd))})\nv_terminal = ${formatValue(vtBase)} m/s = ${formatValue(vtResult)} ${velocityUnit}`);
    } else if (calculationType === 'mass') {
      // Calculate mass: m = (v² × ρ × A × C_d) / (2g)
      if (isNaN(vt) || vt <= 0 || isNaN(A) || A <= 0 || isNaN(Cd) || Cd <= 0) {
        setError('Please enter valid positive values for terminal velocity, cross-sectional area, and drag coefficient');
        return;
      }

      const vtBase = convertVelocityToBase(vt, velocityUnit);
      const ABase = convertAreaToBase(A, areaUnit);

      if (gBase === 0) {
        setError('Gravity cannot be zero');
        return;
      }

      const mBase = (vtBase * vtBase * rhoBase * ABase * Cd) / (2 * gBase);
      if (mBase <= 0 || isNaN(mBase)) {
        setError('Invalid calculation result - check your inputs');
        return;
      }

      const mResult = convertMassFromBase(mBase, massUnit);
      setResult({ value: mResult, unit: massUnit, type: 'mass' });

      setCalculation(`m = (v² × ρ × A × C_d) / (2g)\nm = ((${formatValue(vtBase)} m/s)² × ${formatValue(rhoBase)} kg/m³ × ${formatValue(ABase)} m² × ${formatValue(Cd)}) / (2 × ${formatValue(gBase)} m/s²)\nm = ${formatValue(vtBase * vtBase * rhoBase * ABase * Cd)} / ${formatValue(2 * gBase)}\nm = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnit}`);
    } else if (calculationType === 'area') {
      // Calculate area: A = (2mg) / (v² × ρ × C_d)
      if (isNaN(vt) || vt <= 0 || isNaN(m) || m <= 0 || isNaN(Cd) || Cd <= 0) {
        setError('Please enter valid positive values for terminal velocity, mass, and drag coefficient');
        return;
      }

      const vtBase = convertVelocityToBase(vt, velocityUnit);
      const mBase = convertMassToBase(m, massUnit);

      if (vtBase === 0 || rhoBase === 0 || Cd === 0) {
        setError('Terminal velocity, density, and drag coefficient cannot be zero');
        return;
      }

      const ABase = (2 * mBase * gBase) / (vtBase * vtBase * rhoBase * Cd);
      if (ABase <= 0 || isNaN(ABase)) {
        setError('Invalid calculation result - check your inputs');
        return;
      }

      const AResult = convertAreaFromBase(ABase, areaUnit);
      setResult({ value: AResult, unit: areaUnit, type: 'area' });

      setCalculation(`A = (2mg) / (v² × ρ × C_d)\nA = (2 × ${formatValue(mBase)} kg × ${formatValue(gBase)} m/s²) / ((${formatValue(vtBase)} m/s)² × ${formatValue(rhoBase)} kg/m³ × ${formatValue(Cd)})\nA = ${formatValue(2 * mBase * gBase)} / ${formatValue(vtBase * vtBase * rhoBase * Cd)}\nA = ${formatValue(ABase)} m² = ${formatValue(AResult)} ${areaUnit}`);
    } else if (calculationType === 'dragCoeff') {
      // Calculate drag coefficient: C_d = (2mg) / (v² × ρ × A)
      if (isNaN(vt) || vt <= 0 || isNaN(m) || m <= 0 || isNaN(A) || A <= 0) {
        setError('Please enter valid positive values for terminal velocity, mass, and cross-sectional area');
        return;
      }

      const vtBase = convertVelocityToBase(vt, velocityUnit);
      const mBase = convertMassToBase(m, massUnit);
      const ABase = convertAreaToBase(A, areaUnit);

      if (vtBase === 0 || rhoBase === 0 || ABase === 0) {
        setError('Terminal velocity, density, and area cannot be zero');
        return;
      }

      const CdResult = (2 * mBase * gBase) / (vtBase * vtBase * rhoBase * ABase);
      if (CdResult <= 0 || isNaN(CdResult)) {
        setError('Invalid calculation result - check your inputs');
        return;
      }

      setResult({ value: CdResult, unit: '(dimensionless)', type: 'dragCoeff' });

      setCalculation(`C_d = (2mg) / (v² × ρ × A)\nC_d = (2 × ${formatValue(mBase)} kg × ${formatValue(gBase)} m/s²) / ((${formatValue(vtBase)} m/s)² × ${formatValue(rhoBase)} kg/m³ × ${formatValue(ABase)} m²)\nC_d = ${formatValue(2 * mBase * gBase)} / ${formatValue(vtBase * vtBase * rhoBase * ABase)}\nC_d = ${formatValue(CdResult)} (dimensionless)`);
    }
  };

  const clearAll = () => {
    setCalculationType('velocity');
    setTerminalVelocity('');
    setMass('');
    setGravity('');
    setUseStandardG(true);
    setFluidDensity('');
    setUseStandardDensity(true);
    setCrossSectionalArea('');
    setDragCoefficient('');
    setVelocityUnit('m/s');
    setMassUnit('kg');
    setGravityUnit('m/s²');
    setDensityUnit('kg/m³');
    setAreaUnit('m²');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Terminal Velocity Calculator</h2>
        <p className="text-gray-600">Calculate terminal velocity using v = √(2mg / (ρAC_d))</p>
      </div>

      <div className="space-y-6">
        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Calculation Type:</p>
          <select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value as 'velocity' | 'mass' | 'area' | 'dragCoeff')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm font-medium"
          >
            <option value="velocity">Calculate Terminal Velocity (v)</option>
            <option value="mass">Calculate Mass (m)</option>
            <option value="area">Calculate Cross-Sectional Area (A)</option>
            <option value="dragCoeff">Calculate Drag Coefficient (C_d)</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            Formula: v = √(2mg / (ρAC_d)) where m=mass, g=gravity, ρ=density, A=area, C_d=drag coefficient
          </p>
        </div>

        {/* Terminal Velocity Input */}
        {(calculationType === 'mass' || calculationType === 'area' || calculationType === 'dragCoeff') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Terminal Velocity (v)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter terminal velocity"
                  value={terminalVelocity}
                  onChange={(e) => setTerminalVelocity(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-32">
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
        )}

        {/* Mass Input */}
        {(calculationType === 'velocity' || calculationType === 'area' || calculationType === 'dragCoeff') && (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
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
        )}

        {/* Gravity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useStandardG}
                onChange={(e) => setUseStandardG(e.target.checked)}
                className="w-4 h-4 text-[#820ECC] border-gray-300 rounded focus:ring-[#820ECC]"
              />
              <span>Use Standard Gravity (9.80665 m/s²)</span>
            </div>
          </label>
          {!useStandardG && (
            <div className="flex gap-3 mt-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter gravity"
                  value={gravity}
                  onChange={(e) => setGravity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={gravityUnit}
                  onChange={(e) => setGravityUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(accelerationUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Fluid Density Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useStandardDensity}
                onChange={(e) => setUseStandardDensity(e.target.checked)}
                className="w-4 h-4 text-[#820ECC] border-gray-300 rounded focus:ring-[#820ECC]"
              />
              <span>Use Standard Air Density (1.225 kg/m³ at sea level)</span>
            </div>
          </label>
          {!useStandardDensity && (
            <div className="flex gap-3 mt-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter fluid density"
                  value={fluidDensity}
                  onChange={(e) => setFluidDensity(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
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
          )}
        </div>

        {/* Cross-Sectional Area Input */}
        {(calculationType === 'velocity' || calculationType === 'mass' || calculationType === 'dragCoeff') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Cross-Sectional Area (A)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter cross-sectional area"
                  value={crossSectionalArea}
                  onChange={(e) => setCrossSectionalArea(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
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
        )}

        {/* Drag Coefficient Input */}
        {(calculationType === 'velocity' || calculationType === 'mass' || calculationType === 'area') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Drag Coefficient (C_d)
              <span className="text-gray-500 text-xs ml-2">(e.g., 0.47 for sphere, 0.82 for skydiver)</span>
            </label>
            <Input
              type="text"
              placeholder="Enter drag coefficient"
              value={dragCoefficient}
              onChange={(e) => setDragCoefficient(e.target.value)}
              className="w-full"
            />
          </div>
        )}

        {/* Output Unit Selection (for velocity only) */}
        {calculationType === 'velocity' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Output Velocity Unit
            </label>
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
        )}

        <div className="flex gap-3 pt-2">
          <Button onClick={calculate} className="flex-1">
            Calculate
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-[#820ECC]/10 border border-[#820ECC]/30 rounded-lg">
            <h3 className="text-lg font-semibold text-[#820ECC] mb-2">Result</h3>
            <p className="text-2xl font-bold text-[#820ECC]">
              {formatValue(result.value)} {result.unit}
            </p>
            {calculation && (
              <div className="mt-4 pt-4 border-t border-[#820ECC]/30">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Calculation Steps:</p>
                <p className="text-sm text-[#820ECC]/80 font-mono whitespace-pre-line break-words">
                  {calculation}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {calculationType === 'velocity' && (
              <>
                <li>• Enter mass, cross-sectional area, and drag coefficient</li>
                <li>• Formula: v = √(2mg / (ρAC_d))</li>
                <li>• Standard values: g = 9.80665 m/s², ρ = 1.225 kg/m³ (air at sea level)</li>
              </>
            )}
            {calculationType === 'mass' && (
              <>
                <li>• Enter terminal velocity, cross-sectional area, and drag coefficient</li>
                <li>• Formula: m = (v² × ρ × A × C_d) / (2g)</li>
              </>
            )}
            {calculationType === 'area' && (
              <>
                <li>• Enter terminal velocity, mass, and drag coefficient</li>
                <li>• Formula: A = (2mg) / (v² × ρ × C_d)</li>
              </>
            )}
            {calculationType === 'dragCoeff' && (
              <>
                <li>• Enter terminal velocity, mass, and cross-sectional area</li>
                <li>• Formula: C_d = (2mg) / (v² × ρ × A)</li>
              </>
            )}
            <li>• Check boxes to use standard gravity and/or standard air density</li>
            <li>• Drag coefficient: 0.47 (sphere), 0.82 (skydiver), 1.0-1.3 (flat plate), 0.04-0.1 (streamlined)</li>
            <li>• All values should be positive numbers</li>
            <li>• Terminal velocity occurs when drag force equals weight (mg)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

