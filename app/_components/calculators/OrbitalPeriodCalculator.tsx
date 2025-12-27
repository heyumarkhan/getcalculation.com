'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface OrbitalPeriodCalculatorProps {
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

export default function OrbitalPeriodCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: OrbitalPeriodCalculatorProps) {
  const [semiMajorAxis, setSemiMajorAxis] = useState('');
  const [mass, setMass] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('au');
  const [massUnit, setMassUnit] = useState('solar_mass');
  const [timeUnit, setTimeUnit] = useState('yr');
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
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

  const convertMassToBase = (value: number, unit: string): number => {
    return value * massUnits[unit as keyof typeof massUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    if (!semiMajorAxis || !mass) {
      setError('Please enter both semi-major axis and mass');
      return;
    }

    const a = parseFloat(semiMajorAxis);
    const M = parseFloat(mass);

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
    // So T = √[(4π²/GM) × a³]
    const T_squared = (4 * PI * PI / (G * MBase)) * (aBase * aBase * aBase);
    const TBase = Math.sqrt(T_squared);
    const TResult = convertTimeFromBase(TBase, timeUnit);

    setResult({ value: TResult, unit: timeUnit });
    
    // Create detailed calculation steps
    const steps = [
      `Kepler's Third Law: T² = (4π²/GM) × a³`,
      `Rearranging for orbital period: T = √[(4π²/GM) × a³]`,
      ``,
      `Given values:`,
      `  a = ${formatValue(a)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name} = ${formatValue(aBase)} m`,
      `  M = ${formatValue(M)} ${massUnits[massUnit as keyof typeof massUnits].name} = ${formatValue(MBase)} kg`,
      ``,
      `Constants:`,
      `  G = ${G.toExponential(4)} m³ kg⁻¹ s⁻² (gravitational constant)`,
      `  π = ${PI.toFixed(6)}`,
      ``,
      `Calculation:`,
      `  T² = (4π²/(G × M)) × a³`,
      `  T² = (4π²/(${G.toExponential(4)} × ${formatValue(MBase)})) × (${formatValue(aBase)})³`,
      `  T² = ${formatValue(T_squared)} s²`,
      `  T = √(${formatValue(T_squared)})`,
      `  T = ${formatValue(TBase)} s`,
      `  T = ${formatValue(TResult)} ${timeUnits[timeUnit as keyof typeof timeUnits].name}`
    ];
    
    setCalculation(steps.join('\n'));
  };

  const clearAll = () => {
    setSemiMajorAxis('');
    setMass('');
    setDistanceUnit('au');
    setMassUnit('solar_mass');
    setTimeUnit('yr');
    setResult(null);
    setCalculation('');
    setError('');
  };

  const getResultColor = () => {
    return 'bg-[#820ECC]/10 border-[#820ECC]/30';
  };

  const getResultTextColor = () => {
    return 'text-[#820ECC]';
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Orbital Period Calculator</h2>
          <p className="text-gray-600">Calculate orbital period from semi-major axis and mass using Kepler's Third Law</p>
        </div>
      )}

      <div className="space-y-6">
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
                autoFocus
              />
            </div>
            <div className="w-40">
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mass of Central Body (M)
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
            <div className="w-40">
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
            Output Time Unit
          </label>
          <div className="w-full">
            <select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white"
            >
              {Object.entries(timeUnits).map(([key, unit]) => (
                <option key={key} value={key}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={calculate} 
            className="flex-1"
            style={{ backgroundColor: primaryColor }}
          >
            Calculate Orbital Period
          </Button>
          <Button onClick={clearAll} variant="outline" className="flex-1">
            Clear
          </Button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-mono">{error}</p>
          </div>
        )}

        {result && (
          <div className={`mt-6 p-4 ${getResultColor()} border rounded-lg`}>
            <h3 className={`text-lg font-semibold ${getResultTextColor()} mb-2`}>Orbital Period</h3>
            <p className={`text-2xl font-bold ${getResultTextColor()}`}>
              {formatValue(result.value)} {timeUnits[result.unit as keyof typeof timeUnits]?.name || result.unit}
            </p>
            {calculation && (
              <div className={`text-sm ${getResultTextColor()}/80 mt-3 font-mono whitespace-pre-line`}>
                {calculation}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Enter the semi-major axis (average distance from the central body)</li>
            <li>• Enter the mass of the central body (e.g., star, planet)</li>
            <li>• Select your preferred units for distance, mass, and time</li>
            <li>• The calculator uses Kepler's Third Law: T² = (4π²/GM) × a³</li>
            <li>• Formula: T = √[(4π²/GM) × a³], where G is the gravitational constant</li>
            <li>• The orbital period is the time taken to complete one full orbit</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

