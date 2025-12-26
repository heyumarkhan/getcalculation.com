'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'radius' | 'mass';

interface SchwarzschildRadiusCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Physical constants
const G = 6.67430e-11; // Gravitational constant (m³ kg⁻¹ s⁻²)
const c = 299792458; // Speed of light (m/s)
const SOLAR_MASS = 1.989e30; // Solar mass in kg
const EARTH_MASS = 5.972e24; // Earth mass in kg
const JUPITER_MASS = 1.898e27; // Jupiter mass in kg

// Unit conversion factors for mass (all relative to kg)
const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'solar_mass': { name: 'M☉ (Solar masses)', factor: SOLAR_MASS },
  'earth_mass': { name: 'M⊕ (Earth masses)', factor: EARTH_MASS },
  'jupiter_mass': { name: 'MJ (Jupiter masses)', factor: JUPITER_MASS },
  'g': { name: 'g (Grams)', factor: 0.001 },
  'ton': { name: 'ton (Metric tons)', factor: 1000 },
  'lb': { name: 'lb (Pounds)', factor: 0.453592 }
};

// Unit conversion factors for radius (all relative to meters)
const radiusUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 },
  'au': { name: 'AU (Astronomical units)', factor: 1.496e11 },
  'ly': { name: 'ly (Light-years)', factor: 9.461e15 },
  'pc': { name: 'pc (Parsecs)', factor: 3.086e16 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 }
};

export default function SchwarzschildRadiusCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: SchwarzschildRadiusCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('radius');
  const [mass, setMass] = useState('');
  const [radius, setRadius] = useState('');
  const [massUnit, setMassUnit] = useState('solar_mass');
  const [radiusUnit, setRadiusUnit] = useState('km');
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

  const convertMassToBase = (value: number, unit: string): number => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string): number => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertRadiusToBase = (value: number, unit: string): number => {
    return value * radiusUnits[unit as keyof typeof radiusUnits].factor;
  };

  const convertRadiusFromBase = (value: number, unit: string): number => {
    return value / radiusUnits[unit as keyof typeof radiusUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (calculationMode === 'radius') {
      // Calculate Schwarzschild radius: Rs = 2GM/c²
      if (!mass) {
        setError('Please enter the mass');
        return;
      }

      const m = parseFloat(mass);
      if (isNaN(m) || m <= 0) {
        setError('Mass must be a valid positive number');
        return;
      }

      const mBase = convertMassToBase(m, massUnit);
      // Schwarzschild radius: Rs = 2GM/c²
      const RsBase = (2 * G * mBase) / (c * c);
      const RsResult = convertRadiusFromBase(RsBase, radiusUnit);

      setResult({ value: RsResult, unit: radiusUnit, label: 'Schwarzschild Radius' });
      setCalculation(`Schwarzschild Radius (Rs) = 2GM / c²\nRs = 2 × G × M / c²\nG = 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²\nc = 299792458 m/s\nM = ${formatValue(m)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(mBase)} kg\nRs = 2 × ${G.toExponential(3)} × ${formatValue(mBase)} / (${c.toExponential(3)})²\nRs = ${formatValue(RsBase)} m = ${formatValue(RsResult)} ${radiusUnit}`);
    } else if (calculationMode === 'mass') {
      // Calculate mass from Schwarzschild radius: M = Rs × c² / (2G)
      if (!radius) {
        setError('Please enter the Schwarzschild radius');
        return;
      }

      const r = parseFloat(radius);
      if (isNaN(r) || r <= 0) {
        setError('Radius must be a valid positive number');
        return;
      }

      const rBase = convertRadiusToBase(r, radiusUnit);
      // Mass from Schwarzschild radius: M = Rs × c² / (2G)
      const mBase = (rBase * c * c) / (2 * G);
      const mResult = convertMassFromBase(mBase, massUnit);

      setResult({ value: mResult, unit: massUnit, label: 'Mass' });
      setCalculation(`Mass (M) = Rs × c² / (2G)\nM = Rs × c² / (2 × G)\nG = 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻²\nc = 299792458 m/s\nRs = ${formatValue(r)} ${radiusUnits[radiusUnit as keyof typeof radiusUnits].name} = ${formatValue(rBase)} m\nM = ${formatValue(rBase)} × (${c.toExponential(3)})² / (2 × ${G.toExponential(3)})\nM = ${formatValue(mBase)} kg = ${formatValue(mResult)} ${massUnits[massUnit as keyof typeof massUnits].name}`);
    }
  };

  const clearAll = () => {
    setMass('');
    setRadius('');
    setMassUnit('solar_mass');
    setRadiusUnit('km');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Schwarzschild Radius Calculator</h2>
          <p className="text-gray-600">Calculate Schwarzschild radius or mass using Rs = 2GM/c²</p>
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
            <option value="radius">Schwarzschild Radius (Rs)</option>
            <option value="mass">Mass (M)</option>
          </select>
        </div>

        {/* Formula Display */}
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Schwarzschild Radius Formula:</p>
          <p className="font-mono text-sm font-bold text-gray-800">
            Rs = 2GM / c²
          </p>
          <p className="text-xs text-gray-600 mt-1">Where: Rs = Schwarzschild radius, G = Gravitational constant, M = Mass, c = Speed of light</p>
        </div>

        {/* Mass Input */}
        {calculationMode === 'radius' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mass (M)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter mass"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-48">
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

        {/* Radius Input */}
        {calculationMode === 'mass' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Schwarzschild Radius (Rs)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter Schwarzschild radius"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={radiusUnit}
                  onChange={(e) => setRadiusUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(radiusUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Result Radius Unit (for radius calculation mode) */}
        {calculationMode === 'radius' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Result Unit
            </label>
            <select
              value={radiusUnit}
              onChange={(e) => setRadiusUnit(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(radiusUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Result Mass Unit (for mass calculation mode) */}
        {calculationMode === 'mass' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Result Unit
            </label>
            <select
              value={massUnit}
              onChange={(e) => setMassUnit(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(massUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
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
            {calculationMode === 'radius' && (
              <>
                <li>• Enter the mass (M) of the object</li>
                <li>• Calculator will determine the Schwarzschild radius</li>
                <li>• Formula: Rs = 2GM / c²</li>
              </>
            )}
            {calculationMode === 'mass' && (
              <>
                <li>• Enter the Schwarzschild radius (Rs)</li>
                <li>• Calculator will determine the mass required</li>
                <li>• Formula: M = Rs × c² / (2G)</li>
              </>
            )}
            <li>• The Schwarzschild radius is the radius of the event horizon of a black hole</li>
            <li>• For the Sun: Rs ≈ 2.95 km (for 1 solar mass)</li>
            <li>• For Earth: Rs ≈ 8.87 mm (for 1 Earth mass)</li>
            <li>• Mass can be entered in kg, solar masses, Earth masses, Jupiter masses, or other units</li>
            <li>• Radius can be displayed in m, km, miles, astronomical units, light-years, or parsecs</li>
            <li>• The calculator uses precise physical constants: G = 6.67430 × 10⁻¹¹ m³ kg⁻¹ s⁻², c = 299792458 m/s</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

