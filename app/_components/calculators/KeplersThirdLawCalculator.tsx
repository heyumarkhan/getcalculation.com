'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'orbitalPeriod' | 'semiMajorAxis' | 'mass';

interface KeplersThirdLawCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Physical constants
const G = 6.67430e-11; // Gravitational constant (m³ kg⁻¹ s⁻²)
const PI = Math.PI;

// Unit conversion factors (all relative to base units: s, m, kg)
const timeUnits = {
  's': { name: 's (Seconds)', factor: 1 },
  'min': { name: 'min (Minutes)', factor: 60 },
  'h': { name: 'h (Hours)', factor: 3600 },
  'd': { name: 'd (Days)', factor: 86400 },
  'yr': { name: 'yr (Years)', factor: 31557600 }, // 1 year = 365.25 days
  'earth_year': { name: 'Earth years', factor: 31557600 }
};

const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'au': { name: 'AU (Astronomical Units)', factor: 1.496e11 }, // 1 AU = 1.496 × 10¹¹ m
  'ly': { name: 'ly (Light-Years)', factor: 9.461e15 }, // 1 Light-Year = 9.461 × 10¹⁵ m
  'pc': { name: 'pc (Parsecs)', factor: 3.086e16 } // 1 Parsec = 3.086 × 10¹⁶ m
};

const massUnits = {
  'kg': { name: 'kg (Kilograms)', factor: 1 },
  'solar_mass': { name: 'M☉ (Solar Masses)', factor: 1.989e30 }, // 1 Solar Mass = 1.989 × 10³⁰ kg
  'earth_mass': { name: 'M🜨 (Earth Masses)', factor: 5.972e24 }, // 1 Earth Mass = 5.972 × 10²⁴ kg
  'jupiter_mass': { name: 'MJ (Jupiter Masses)', factor: 1.898e27 }, // 1 Jupiter Mass = 1.898 × 10²⁷ kg
  'g': { name: 'g (Grams)', factor: 0.001 },
  'ton': { name: 'ton (Metric Tons)', factor: 1000 }
};

export default function KeplersThirdLawCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: KeplersThirdLawCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('orbitalPeriod');
  const [orbitalPeriod, setOrbitalPeriod] = useState('');
  const [semiMajorAxis, setSemiMajorAxis] = useState('');
  const [mass, setMass] = useState('');
  const [timeUnit, setTimeUnit] = useState('yr');
  const [distanceUnit, setDistanceUnit] = useState('au');
  const [massUnit, setMassUnit] = useState('solar_mass');
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

  const convertTimeToBase = (value: number, unit: string): number => {
    return value * timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertTimeFromBase = (value: number, unit: string): number => {
    return value / timeUnits[unit as keyof typeof timeUnits].factor;
  };

  const convertDistanceToBase = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string): number => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertMassToBase = (value: number, unit: string): number => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const convertMassFromBase = (value: number, unit: string): number => {
    return value / massUnits[unit as keyof typeof massUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const T = orbitalPeriod ? parseFloat(orbitalPeriod) : NaN;
    const a = semiMajorAxis ? parseFloat(semiMajorAxis) : NaN;
    const M = mass ? parseFloat(mass) : NaN;

    if (calculationMode === 'orbitalPeriod') {
      // Calculate orbital period: T² = (4π²/GM) × a³, so T = √[(4π²/GM) × a³]
      if (!semiMajorAxis || !mass) {
        setError('Please enter both semi-major axis and mass');
        return;
      }

      if (isNaN(a) || a <= 0) {
        setError('Semi-major axis must be a valid positive number');
        return;
      }
      if (isNaN(M) || M <= 0) {
        setError('Mass must be a valid positive number');
        return;
      }

      const aBase = convertDistanceToBase(a, distanceUnit);
      const MBase = convertMassToBase(M, massUnit);
      
      // Kepler's Third Law: T² = (4π²/GM) × a³
      const T_squared = (4 * PI * PI / (G * MBase)) * (aBase * aBase * aBase);
      const TBase = Math.sqrt(T_squared);
      const TResult = convertTimeFromBase(TBase, timeUnit);

      setResult({ value: TResult, unit: timeUnit, label: 'Orbital Period' });
      setCalculation(`Kepler's Third Law: T² = (4π²/GM) × a³\nT = √[(4π²/GM) × a³]\nG = ${G.toExponential(4)} m³ kg⁻¹ s⁻²\nπ = ${PI.toFixed(6)}\na = ${formatValue(a)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name} = ${formatValue(aBase)} m\nM = ${formatValue(M)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(MBase)} kg\nT² = (4π²/(${G.toExponential(4)} × ${formatValue(MBase)})) × (${formatValue(aBase)})³\nT² = ${formatValue(T_squared)} s²\nT = ${formatValue(TBase)} s = ${formatValue(TResult)} ${timeUnits[timeUnit as keyof typeof timeUnits].name}`);
    } else if (calculationMode === 'semiMajorAxis') {
      // Calculate semi-major axis: a³ = (GM/4π²) × T², so a = ∛[(GM/4π²) × T²]
      if (!orbitalPeriod || !mass) {
        setError('Please enter both orbital period and mass');
        return;
      }

      if (isNaN(T) || T <= 0) {
        setError('Orbital period must be a valid positive number');
        return;
      }
      if (isNaN(M) || M <= 0) {
        setError('Mass must be a valid positive number');
        return;
      }

      const TBase = convertTimeToBase(T, timeUnit);
      const MBase = convertMassToBase(M, massUnit);
      
      // Kepler's Third Law: T² = (4π²/GM) × a³, rearranged: a³ = (GM/4π²) × T²
      const a_cubed = (G * MBase / (4 * PI * PI)) * (TBase * TBase);
      const aBase = Math.cbrt(a_cubed);
      const aResult = convertDistanceFromBase(aBase, distanceUnit);

      setResult({ value: aResult, unit: distanceUnit, label: 'Semi-Major Axis' });
      setCalculation(`Kepler's Third Law: T² = (4π²/GM) × a³\nRearranged: a³ = (GM/4π²) × T²\na = ∛[(GM/4π²) × T²]\nG = ${G.toExponential(4)} m³ kg⁻¹ s⁻²\nπ = ${PI.toFixed(6)}\nT = ${formatValue(T)} ${timeUnits[timeUnit as keyof typeof timeUnits].name} = ${formatValue(TBase)} s\nM = ${formatValue(M)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(MBase)} kg\na³ = (${G.toExponential(4)} × ${formatValue(MBase)}/(4π²)) × (${formatValue(TBase)})²\na³ = ${formatValue(a_cubed)} m³\na = ${formatValue(aBase)} m = ${formatValue(aResult)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name}`);
    } else if (calculationMode === 'mass') {
      // Calculate mass: M = (4π²/G) × (a³/T²)
      if (!orbitalPeriod || !semiMajorAxis) {
        setError('Please enter both orbital period and semi-major axis');
        return;
      }

      if (isNaN(T) || T <= 0) {
        setError('Orbital period must be a valid positive number');
        return;
      }
      if (isNaN(a) || a <= 0) {
        setError('Semi-major axis must be a valid positive number');
        return;
      }

      const TBase = convertTimeToBase(T, timeUnit);
      const aBase = convertDistanceToBase(a, distanceUnit);
      
      // Kepler's Third Law: T² = (4π²/GM) × a³, rearranged: M = (4π²/G) × (a³/T²)
      const MBase = (4 * PI * PI / G) * ((aBase * aBase * aBase) / (TBase * TBase));
      const MResult = convertMassFromBase(MBase, massUnit);

      setResult({ value: MResult, unit: massUnit, label: 'Mass' });
      setCalculation(`Kepler's Third Law: T² = (4π²/GM) × a³\nRearranged: M = (4π²/G) × (a³/T²)\nG = ${G.toExponential(4)} m³ kg⁻¹ s⁻²\nπ = ${PI.toFixed(6)}\nT = ${formatValue(T)} ${timeUnits[timeUnit as keyof typeof timeUnits].name} = ${formatValue(TBase)} s\na = ${formatValue(a)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name} = ${formatValue(aBase)} m\nM = (4π²/${G.toExponential(4)}) × ((${formatValue(aBase)})³/(${formatValue(TBase)})²)\nM = ${formatValue(MBase)} kg = ${formatValue(MResult)} ${massUnits[massUnit as keyof typeof massUnits].name}`);
    }
  };

  const clearAll = () => {
    setOrbitalPeriod('');
    setSemiMajorAxis('');
    setMass('');
    setTimeUnit('yr');
    setDistanceUnit('au');
    setMassUnit('solar_mass');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Kepler&apos;s Third Law Calculator</h2>
          <p className="text-gray-600">Calculate orbital period, semi-major axis, or mass using T² = (4π²/GM) × a³</p>
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
            <option value="orbitalPeriod">Orbital Period (T)</option>
            <option value="semiMajorAxis">Semi-Major Axis (a)</option>
            <option value="mass">Mass (M)</option>
          </select>
        </div>

        {/* Input Fields */}
        {(calculationMode === 'semiMajorAxis' || calculationMode === 'mass') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Orbital Period (T)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter orbital period"
                  value={orbitalPeriod}
                  onChange={(e) => setOrbitalPeriod(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-32">
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(timeUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {(calculationMode === 'orbitalPeriod' || calculationMode === 'mass') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Semi-Major Axis (a)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter semi-major axis"
                  value={semiMajorAxis}
                  onChange={(e) => setSemiMajorAxis(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-32">
                <select
                  value={distanceUnit}
                  onChange={(e) => setDistanceUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(distanceUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {(calculationMode === 'orbitalPeriod' || calculationMode === 'semiMajorAxis') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Mass (M)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter mass of central body"
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
            <li>• Select the quantity you want to calculate (Orbital Period, Semi-Major Axis, or Mass).</li>
            <li>• Enter the two known values in their respective fields.</li>
            <li>• Ensure all inputs are valid positive numbers.</li>
            <li>• Select appropriate units for accurate calculations.</li>
            <li>• Formula: T² = (4π²/GM) × a³ (Kepler&apos;s Third Law)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

