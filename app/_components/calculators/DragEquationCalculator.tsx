'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'dragForce' | 'velocity' | 'area' | 'dragCoefficient' | 'density';

interface DragEquationCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base units: N, m/s, m², kg/m³)
const forceUnits = {
  'N': { name: 'N (Newtons)', factor: 1 },
  'kN': { name: 'kN (Kilonewtons)', factor: 1000 },
  'lbf': { name: 'lbf (Pounds-force)', factor: 4.44822 },
  'kgf': { name: 'kgf (Kilogram-force)', factor: 9.80665 }
};

const velocityUnits = {
  'm/s': { name: 'm/s (Meters per second)', factor: 1 },
  'km/h': { name: 'km/h (Kilometers per hour)', factor: 1 / 3.6 },
  'mph': { name: 'mph (Miles per hour)', factor: 0.44704 },
  'ft/s': { name: 'ft/s (Feet per second)', factor: 0.3048 },
  'knots': { name: 'knots', factor: 0.514444 }
};

const areaUnits = {
  'm²': { name: 'm² (Square meters)', factor: 1 },
  'cm²': { name: 'cm² (Square centimeters)', factor: 0.0001 },
  'ft²': { name: 'ft² (Square feet)', factor: 0.092903 },
  'in²': { name: 'in² (Square inches)', factor: 0.00064516 }
};

const densityUnits = {
  'kg/m³': { name: 'kg/m³ (Kilograms per cubic meter)', factor: 1 },
  'g/cm³': { name: 'g/cm³ (Grams per cubic centimeter)', factor: 1000 },
  'lb/ft³': { name: 'lb/ft³ (Pounds per cubic foot)', factor: 16.0185 },
  'g/L': { name: 'g/L (Grams per liter)', factor: 1 }
};

export default function DragEquationCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: DragEquationCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('dragForce');
  const [dragForce, setDragForce] = useState('');
  const [velocity, setVelocity] = useState('');
  const [area, setArea] = useState('');
  const [dragCoefficient, setDragCoefficient] = useState('0.5'); // Default for sphere
  const [density, setDensity] = useState('1.225'); // Standard air density at sea level, 15°C
  const [forceUnit, setForceUnit] = useState('N');
  const [velocityUnit, setVelocityUnit] = useState('m/s');
  const [areaUnit, setAreaUnit] = useState('m²');
  const [densityUnit, setDensityUnit] = useState('kg/m³');
  const [result, setResult] = useState<{ value: number; unit: string; label: string } | null>(null);
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

  const convertForceToBase = (value: number, unit: string): number => {
    return value * forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertForceFromBase = (value: number, unit: string): number => {
    return value / forceUnits[unit as keyof typeof forceUnits].factor;
  };

  const convertVelocityToBase = (value: number, unit: string): number => {
    return value * velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertVelocityFromBase = (value: number, unit: string): number => {
    return value / velocityUnits[unit as keyof typeof velocityUnits].factor;
  };

  const convertAreaToBase = (value: number, unit: string): number => {
    return value * areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertAreaFromBase = (value: number, unit: string): number => {
    return value / areaUnits[unit as keyof typeof areaUnits].factor;
  };

  const convertDensityToBase = (value: number, unit: string): number => {
    return value * densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const convertDensityFromBase = (value: number, unit: string): number => {
    return value / densityUnits[unit as keyof typeof densityUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const F = dragForce ? parseFloat(dragForce) : NaN;
    const v = velocity ? parseFloat(velocity) : NaN;
    const A = area ? parseFloat(area) : NaN;
    const Cd = dragCoefficient ? parseFloat(dragCoefficient) : NaN;
    const rho = density ? parseFloat(density) : NaN;

    // Count how many values are provided
    const providedValues = [F, v, A, Cd, rho].filter(val => !isNaN(val)).length;

    if (providedValues !== 4) {
      setError('Please enter exactly four of the five values to calculate the fifth.');
      return;
    }

    // Validate inputs
    if (!isNaN(F) && F < 0) {
      setError('Drag force must be a valid non-negative number.');
      return;
    }
    if (!isNaN(v) && v < 0) {
      setError('Velocity must be a valid non-negative number.');
      return;
    }
    if (!isNaN(A) && A <= 0) {
      setError('Area must be a valid positive number.');
      return;
    }
    if (!isNaN(Cd) && Cd < 0) {
      setError('Drag coefficient must be a valid non-negative number.');
      return;
    }
    if (!isNaN(rho) && rho <= 0) {
      setError('Density must be a valid positive number.');
      return;
    }

    // Convert known values to base units
    const F_base = !isNaN(F) ? convertForceToBase(F, forceUnit) : NaN;
    const v_base = !isNaN(v) ? convertVelocityToBase(v, velocityUnit) : NaN;
    const A_base = !isNaN(A) ? convertAreaToBase(A, areaUnit) : NaN;
    const rho_base = !isNaN(rho) ? convertDensityToBase(rho, densityUnit) : NaN;

    // Drag Force Formula: F = 0.5 × ρ × v² × A × Cd
    if (calculationMode === 'dragForce') {
      if (isNaN(rho_base) || isNaN(v_base) || isNaN(A_base) || isNaN(Cd)) {
        setError('Please enter density, velocity, area, and drag coefficient.');
        return;
      }
      const calculatedF_base = 0.5 * rho_base * v_base * v_base * A_base * Cd;
      const calculatedF = convertForceFromBase(calculatedF_base, forceUnit);
      setResult({ value: calculatedF, unit: forceUnit, label: 'Drag Force' });
      setCalculation(`Drag Force (F) = 0.5 × Density (ρ) × Velocity (v)² × Area (A) × Drag Coefficient (Cd)\nF = 0.5 × ρ × v² × A × Cd\nρ = ${formatValue(rho)} ${densityUnit} = ${formatValue(rho_base)} kg/m³\nv = ${formatValue(v)} ${velocityUnit} = ${formatValue(v_base)} m/s\nA = ${formatValue(A)} ${areaUnit} = ${formatValue(A_base)} m²\nCd = ${formatValue(Cd)}\nF = 0.5 × ${formatValue(rho_base)} × (${formatValue(v_base)})² × ${formatValue(A_base)} × ${formatValue(Cd)}\nF = ${formatValue(calculatedF)} ${forceUnit}`);
    } else if (calculationMode === 'velocity') {
      if (isNaN(F_base) || isNaN(rho_base) || isNaN(A_base) || isNaN(Cd)) {
        setError('Please enter drag force, density, area, and drag coefficient.');
        return;
      }
      if (rho_base === 0 || A_base === 0 || Cd === 0) {
        setError('Density, area, and drag coefficient cannot be zero.');
        return;
      }
      const calculatedV_base_squared = F_base / (0.5 * rho_base * A_base * Cd);
      if (calculatedV_base_squared < 0) {
        setError('Cannot calculate real velocity from given inputs (negative value under square root).');
        return;
      }
      const calculatedV_base = Math.sqrt(calculatedV_base_squared);
      const calculatedV = convertVelocityFromBase(calculatedV_base, velocityUnit);
      setResult({ value: calculatedV, unit: velocityUnit, label: 'Velocity' });
      setCalculation(`Velocity (v) = √[F / (0.5 × ρ × A × Cd)]\nv = √[F / (0.5 × ρ × A × Cd)]\nF = ${formatValue(F)} ${forceUnit} = ${formatValue(F_base)} N\nρ = ${formatValue(rho)} ${densityUnit} = ${formatValue(rho_base)} kg/m³\nA = ${formatValue(A)} ${areaUnit} = ${formatValue(A_base)} m²\nCd = ${formatValue(Cd)}\nv = √[${formatValue(F_base)} / (0.5 × ${formatValue(rho_base)} × ${formatValue(A_base)} × ${formatValue(Cd)})]\nv = ${formatValue(calculatedV)} ${velocityUnit}`);
    } else if (calculationMode === 'area') {
      if (isNaN(F_base) || isNaN(rho_base) || isNaN(v_base) || isNaN(Cd)) {
        setError('Please enter drag force, density, velocity, and drag coefficient.');
        return;
      }
      if (rho_base === 0 || v_base === 0 || Cd === 0) {
        setError('Density, velocity, and drag coefficient cannot be zero.');
        return;
      }
      const calculatedA_base = F_base / (0.5 * rho_base * v_base * v_base * Cd);
      const calculatedA = convertAreaFromBase(calculatedA_base, areaUnit);
      setResult({ value: calculatedA, unit: areaUnit, label: 'Area' });
      setCalculation(`Area (A) = F / (0.5 × ρ × v² × Cd)\nA = F / (0.5 × ρ × v² × Cd)\nF = ${formatValue(F)} ${forceUnit} = ${formatValue(F_base)} N\nρ = ${formatValue(rho)} ${densityUnit} = ${formatValue(rho_base)} kg/m³\nv = ${formatValue(v)} ${velocityUnit} = ${formatValue(v_base)} m/s\nCd = ${formatValue(Cd)}\nA = ${formatValue(F_base)} / (0.5 × ${formatValue(rho_base)} × (${formatValue(v_base)})² × ${formatValue(Cd)})\nA = ${formatValue(calculatedA)} ${areaUnit}`);
    } else if (calculationMode === 'dragCoefficient') {
      if (isNaN(F_base) || isNaN(rho_base) || isNaN(v_base) || isNaN(A_base)) {
        setError('Please enter drag force, density, velocity, and area.');
        return;
      }
      if (rho_base === 0 || v_base === 0 || A_base === 0) {
        setError('Density, velocity, and area cannot be zero.');
        return;
      }
      const calculatedCd = F_base / (0.5 * rho_base * v_base * v_base * A_base);
      setResult({ value: calculatedCd, unit: '', label: 'Drag Coefficient' });
      setCalculation(`Drag Coefficient (Cd) = F / (0.5 × ρ × v² × A)\nCd = F / (0.5 × ρ × v² × A)\nF = ${formatValue(F)} ${forceUnit} = ${formatValue(F_base)} N\nρ = ${formatValue(rho)} ${densityUnit} = ${formatValue(rho_base)} kg/m³\nv = ${formatValue(v)} ${velocityUnit} = ${formatValue(v_base)} m/s\nA = ${formatValue(A)} ${areaUnit} = ${formatValue(A_base)} m²\nCd = ${formatValue(F_base)} / (0.5 × ${formatValue(rho_base)} × (${formatValue(v_base)})² × ${formatValue(A_base)})\nCd = ${formatValue(calculatedCd)}`);
    } else if (calculationMode === 'density') {
      if (isNaN(F_base) || isNaN(v_base) || isNaN(A_base) || isNaN(Cd)) {
        setError('Please enter drag force, velocity, area, and drag coefficient.');
        return;
      }
      if (v_base === 0 || A_base === 0 || Cd === 0) {
        setError('Velocity, area, and drag coefficient cannot be zero.');
        return;
      }
      const calculatedRho_base = F_base / (0.5 * v_base * v_base * A_base * Cd);
      if (calculatedRho_base <= 0) {
        setError('Cannot calculate valid density from given inputs.');
        return;
      }
      const calculatedRho = convertDensityFromBase(calculatedRho_base, densityUnit);
      setResult({ value: calculatedRho, unit: densityUnit, label: 'Density' });
      setCalculation(`Density (ρ) = F / (0.5 × v² × A × Cd)\nρ = F / (0.5 × v² × A × Cd)\nF = ${formatValue(F)} ${forceUnit} = ${formatValue(F_base)} N\nv = ${formatValue(v)} ${velocityUnit} = ${formatValue(v_base)} m/s\nA = ${formatValue(A)} ${areaUnit} = ${formatValue(A_base)} m²\nCd = ${formatValue(Cd)}\nρ = ${formatValue(F_base)} / (0.5 × (${formatValue(v_base)})² × ${formatValue(A_base)} × ${formatValue(Cd)})\nρ = ${formatValue(calculatedRho)} ${densityUnit}`);
    }
  };

  const clearAll = () => {
    setDragForce('');
    setVelocity('');
    setArea('');
    setDragCoefficient('0.5');
    setDensity('1.225');
    setForceUnit('N');
    setVelocityUnit('m/s');
    setAreaUnit('m²');
    setDensityUnit('kg/m³');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Drag Equation Calculator</h2>
          <p className="text-gray-600">Calculate drag force, velocity, area, drag coefficient, or density using F = 0.5 × ρ × v² × A × Cd</p>
        </div>
      )}

      <div className="space-y-6">
        {/* Calculation Mode Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate
          </label>
          <select
            value={calculationMode}
            onChange={(e) => {
              setCalculationMode(e.target.value as CalculationMode);
              clearAll();
            }}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
          >
            <option value="dragForce">Drag Force (F)</option>
            <option value="velocity">Velocity (v)</option>
            <option value="area">Area (A)</option>
            <option value="dragCoefficient">Drag Coefficient (Cd)</option>
            <option value="density">Density (ρ)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Drag Force Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            F = 0.5 × ρ × v² × A × Cd
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: F = Drag Force, ρ = Density, v = Velocity, A = Area, Cd = Drag Coefficient</p>
        </div>

        {/* Drag Force Input */}
        {(calculationMode === 'velocity' || calculationMode === 'area' || calculationMode === 'dragCoefficient' || calculationMode === 'density') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Drag Force (F)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter drag force"
                  value={dragForce}
                  onChange={(e) => setDragForce(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-32">
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

        {/* Velocity Input */}
        {(calculationMode === 'dragForce' || calculationMode === 'area' || calculationMode === 'dragCoefficient' || calculationMode === 'density') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Velocity (v)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter velocity"
                  value={velocity}
                  onChange={(e) => setVelocity(e.target.value)}
                  className="w-full"
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

        {/* Area Input */}
        {(calculationMode === 'dragForce' || calculationMode === 'velocity' || calculationMode === 'dragCoefficient' || calculationMode === 'density') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Area (A)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter cross-sectional area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
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
        {(calculationMode === 'dragForce' || calculationMode === 'velocity' || calculationMode === 'area' || calculationMode === 'density') && (
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
            <p className="text-xs text-gray-500 mt-1">Typical values: Sphere ≈ 0.47, Cube ≈ 1.05, Streamlined body ≈ 0.04-0.1</p>
          </div>
        )}

        {/* Density Input */}
        {(calculationMode === 'dragForce' || calculationMode === 'velocity' || calculationMode === 'area' || calculationMode === 'dragCoefficient') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Density (ρ)
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
            <p className="text-xs text-gray-500 mt-1">Standard air density: 1.225 kg/m³ at sea level, 15°C</p>
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
            <li>• Enter exactly four of the five values (Drag Force, Velocity, Area, Drag Coefficient, Density) to calculate the fifth.</li>
            <li>• The drag equation: F = 0.5 × ρ × v² × A × Cd</li>
            <li>• Drag coefficient depends on shape: Sphere ≈ 0.47, Cube ≈ 1.05, Streamlined body ≈ 0.04-0.1</li>
            <li>• Standard air density: 1.225 kg/m³ at sea level, 15°C</li>
            <li>• Water density: approximately 1000 kg/m³</li>
            <li>• Ensure all inputs are valid positive numbers (drag force and velocity can be zero if calculating them).</li>
            <li>• The calculator automatically handles unit conversions.</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

