'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';

type CalculationMode = 'intensity' | 'distance' | 'sourceStrength';

interface InverseSquareLawCalculatorProps {
  showTitle?: boolean;
  primaryColor?: string;
}

// Unit conversion factors (all relative to base units: m, W/m² for intensity, W for source strength)
const distanceUnits = {
  'm': { name: 'm (Meters)', factor: 1 },
  'km': { name: 'km (Kilometers)', factor: 1000 },
  'cm': { name: 'cm (Centimeters)', factor: 0.01 },
  'mm': { name: 'mm (Millimeters)', factor: 0.001 },
  'ft': { name: 'ft (Feet)', factor: 0.3048 },
  'in': { name: 'in (Inches)', factor: 0.0254 },
  'mi': { name: 'mi (Miles)', factor: 1609.34 }
};

// For intensity (W/m², lux, dB, etc.)
const intensityUnits = {
  'W/m²': { name: 'W/m² (Watts per square meter)', factor: 1 },
  'mW/m²': { name: 'mW/m² (Milliwatts per square meter)', factor: 0.001 },
  'kW/m²': { name: 'kW/m² (Kilowatts per square meter)', factor: 1000 },
  'lux': { name: 'lux (Lumens per square meter)', factor: 1 }, // Approximate, varies by wavelength
  'ft-cd': { name: 'foot-candles', factor: 10.764 }, // 1 foot-candle = 10.764 lux
  'W/cm²': { name: 'W/cm² (Watts per square centimeter)', factor: 10000 }
};

// For source strength (W, W⋅m², etc.)
const sourceStrengthUnits = {
  'W⋅m²': { name: 'W⋅m² (Watts × square meters)', factor: 1 },
  'mW⋅m²': { name: 'mW⋅m² (Milliwatts × square meters)', factor: 0.001 },
  'kW⋅m²': { name: 'kW⋅m² (Kilowatts × square meters)', factor: 1000 },
  'lm': { name: 'lm (Lumens)', factor: 1 },
  'W⋅cm²': { name: 'W⋅cm² (Watts × square centimeters)', factor: 0.0001 }
};

export default function InverseSquareLawCalculator({
  showTitle = true,
  primaryColor = '#820ECC'
}: InverseSquareLawCalculatorProps) {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('intensity');
  const [intensity, setIntensity] = useState('');
  const [distance, setDistance] = useState('');
  const [sourceStrength, setSourceStrength] = useState('');
  const [distanceUnit, setDistanceUnit] = useState('m');
  const [intensityUnit, setIntensityUnit] = useState('W/m²');
  const [sourceStrengthUnit, setSourceStrengthUnit] = useState('W⋅m²');
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

  const convertDistanceToBase = (value: number, unit: string): number => {
    return value * distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertDistanceFromBase = (value: number, unit: string): number => {
    return value / distanceUnits[unit as keyof typeof distanceUnits].factor;
  };

  const convertIntensityToBase = (value: number, unit: string): number => {
    return value * intensityUnits[unit as keyof typeof intensityUnits].factor;
  };

  const convertIntensityFromBase = (value: number, unit: string): number => {
    return value / intensityUnits[unit as keyof typeof intensityUnits].factor;
  };

  const convertSourceStrengthToBase = (value: number, unit: string): number => {
    return value * sourceStrengthUnits[unit as keyof typeof sourceStrengthUnits].factor;
  };

  const convertSourceStrengthFromBase = (value: number, unit: string): number => {
    return value / sourceStrengthUnits[unit as keyof typeof sourceStrengthUnits].factor;
  };

  const calculate = () => {
    setError('');
    setResult(null);
    setCalculation('');

    const I = intensity ? parseFloat(intensity) : NaN;
    const r = distance ? parseFloat(distance) : NaN;
    const k = sourceStrength ? parseFloat(sourceStrength) : NaN;

    if (calculationMode === 'intensity') {
      // Calculate intensity: I = k / r²
      if (!sourceStrength || !distance) {
        setError('Please enter both source strength and distance');
        return;
      }

      if (isNaN(k) || k <= 0) {
        setError('Source strength must be a valid positive number');
        return;
      }
      if (isNaN(r) || r <= 0) {
        setError('Distance must be a valid positive number');
        return;
      }

      const kBase = convertSourceStrengthToBase(k, sourceStrengthUnit);
      const rBase = convertDistanceToBase(r, distanceUnit);
      const IBase = kBase / (rBase * rBase);
      const IResult = convertIntensityFromBase(IBase, intensityUnit);

      setResult({ value: IResult, unit: intensityUnit, label: 'Intensity' });
      setCalculation(`Inverse Square Law: I = k / r²\nI = k / r²\nk = ${formatValue(k)} ${sourceStrengthUnits[sourceStrengthUnit as keyof typeof sourceStrengthUnits].name} = ${formatValue(kBase)} W⋅m²\nr = ${formatValue(r)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name} = ${formatValue(rBase)} m\nI = ${formatValue(kBase)} / (${formatValue(rBase)})²\nI = ${formatValue(kBase)} / ${formatValue(rBase * rBase)}\nI = ${formatValue(IBase)} W/m² = ${formatValue(IResult)} ${intensityUnits[intensityUnit as keyof typeof intensityUnits].name}`);
    } else if (calculationMode === 'distance') {
      // Calculate distance: r = √(k / I)
      if (!sourceStrength || !intensity) {
        setError('Please enter both source strength and intensity');
        return;
      }

      if (isNaN(k) || k <= 0) {
        setError('Source strength must be a valid positive number');
        return;
      }
      if (isNaN(I) || I <= 0) {
        setError('Intensity must be a valid positive number');
        return;
      }

      const kBase = convertSourceStrengthToBase(k, sourceStrengthUnit);
      const IBase = convertIntensityToBase(I, intensityUnit);
      const rBase = Math.sqrt(kBase / IBase);
      const rResult = convertDistanceFromBase(rBase, distanceUnit);

      setResult({ value: rResult, unit: distanceUnit, label: 'Distance' });
      setCalculation(`Inverse Square Law: I = k / r²\nRearranged: r = √(k / I)\nr = √(k / I)\nk = ${formatValue(k)} ${sourceStrengthUnits[sourceStrengthUnit as keyof typeof sourceStrengthUnits].name} = ${formatValue(kBase)} W⋅m²\nI = ${formatValue(I)} ${intensityUnits[intensityUnit as keyof typeof intensityUnits].name} = ${formatValue(IBase)} W/m²\nr = √(${formatValue(kBase)} / ${formatValue(IBase)})\nr = √(${formatValue(kBase / IBase)})\nr = ${formatValue(rBase)} m = ${formatValue(rResult)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name}`);
    } else if (calculationMode === 'sourceStrength') {
      // Calculate source strength: k = I × r²
      if (!intensity || !distance) {
        setError('Please enter both intensity and distance');
        return;
      }

      if (isNaN(I) || I <= 0) {
        setError('Intensity must be a valid positive number');
        return;
      }
      if (isNaN(r) || r <= 0) {
        setError('Distance must be a valid positive number');
        return;
      }

      const IBase = convertIntensityToBase(I, intensityUnit);
      const rBase = convertDistanceToBase(r, distanceUnit);
      const kBase = IBase * (rBase * rBase);
      const kResult = convertSourceStrengthFromBase(kBase, sourceStrengthUnit);

      setResult({ value: kResult, unit: sourceStrengthUnit, label: 'Source Strength' });
      setCalculation(`Inverse Square Law: I = k / r²\nRearranged: k = I × r²\nk = I × r²\nI = ${formatValue(I)} ${intensityUnits[intensityUnit as keyof typeof intensityUnits].name} = ${formatValue(IBase)} W/m²\nr = ${formatValue(r)} ${distanceUnits[distanceUnit as keyof typeof distanceUnits].name} = ${formatValue(rBase)} m\nk = ${formatValue(IBase)} × (${formatValue(rBase)})²\nk = ${formatValue(IBase)} × ${formatValue(rBase * rBase)}\nk = ${formatValue(kBase)} W⋅m² = ${formatValue(kResult)} ${sourceStrengthUnits[sourceStrengthUnit as keyof typeof sourceStrengthUnits].name}`);
    }
  };

  const clearAll = () => {
    setIntensity('');
    setDistance('');
    setSourceStrength('');
    setDistanceUnit('m');
    setIntensityUnit('W/m²');
    setSourceStrengthUnit('W⋅m²');
    setResult(null);
    setCalculation('');
    setError('');
  };

  return (
    <Card className="p-6">
      {showTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inverse Square Law Calculator</h2>
          <p className="text-gray-600">Calculate intensity, distance, or source strength using I = k / r²</p>
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
            <option value="intensity">Intensity (I)</option>
            <option value="distance">Distance (r)</option>
            <option value="sourceStrength">Source Strength (k)</option>
          </select>
        </div>

        {/* Input Fields */}
        {(calculationMode === 'distance' || calculationMode === 'sourceStrength') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Intensity (I)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter intensity"
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                  className="w-full"
                  autoFocus
                />
              </div>
              <div className="w-40">
                <select
                  value={intensityUnit}
                  onChange={(e) => setIntensityUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(intensityUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {(calculationMode === 'intensity' || calculationMode === 'sourceStrength') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Distance (r)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter distance from source"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
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

        {(calculationMode === 'intensity' || calculationMode === 'distance') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Source Strength (k)
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter source strength"
                  value={sourceStrength}
                  onChange={(e) => setSourceStrength(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-40">
                <select
                  value={sourceStrengthUnit}
                  onChange={(e) => setSourceStrengthUnit(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#820ECC] focus:border-[#820ECC] transition-colors bg-white text-sm"
                >
                  {Object.entries(sourceStrengthUnits).map(([key, unit]) => (
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
            <li>• Select the quantity you want to calculate (Intensity, Distance, or Source Strength).</li>
            <li>• Enter the two known values in their respective fields.</li>
            <li>• Ensure all inputs are valid positive numbers.</li>
            <li>• Select appropriate units for accurate calculations.</li>
            <li>• Formula: I = k / r² (Intensity = Source Strength / Distance²)</li>
            <li>• The inverse square law applies to light, sound, radiation, and other phenomena.</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}

