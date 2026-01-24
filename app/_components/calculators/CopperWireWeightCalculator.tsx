'use client';

import { useState } from 'react';

interface CopperWireResult {
  weight: number;
  length: number;
  diameter: number;
  area: number;
  resistance: number;
}

export default function CopperWireWeightCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [length, setLength] = useState<number | ''>('');
  const [diameter, setDiameter] = useState<number | ''>('');
  const [awg, setAwg] = useState<string>('');
  const [lengthUnit, setLengthUnit] = useState<'m' | 'ft'>('m');
  const [diameterUnit, setDiameterUnit] = useState<'mm' | 'in'>('mm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [results, setResults] = useState<CopperWireResult | null>(null);

  // Copper density: 8960 kg/m³
  const COPPER_DENSITY = 8960; // kg/m³
  const COPPER_RESISTIVITY = 1.68e-8; // Ω⋅m at 20°C

  // AWG to diameter (mm) mapping - common sizes
  const AWG_DIAMETERS: Record<string, number> = {
    '4/0': 11.684, '3/0': 10.405, '2/0': 9.266, '1/0': 8.252,
    '1': 7.348, '2': 6.544, '3': 5.827, '4': 5.189,
    '5': 4.621, '6': 4.115, '7': 3.665, '8': 3.264,
    '9': 2.906, '10': 2.588, '11': 2.305, '12': 2.053,
    '13': 1.828, '14': 1.628, '15': 1.450, '16': 1.291,
    '17': 1.150, '18': 1.024, '19': 0.912, '20': 0.812,
    '21': 0.723, '22': 0.644, '23': 0.573, '24': 0.511,
    '25': 0.455, '26': 0.405, '27': 0.361, '28': 0.321,
    '29': 0.286, '30': 0.255
  };

  const calculate = () => {
    let diameterMm = 0;

    // Get diameter
    if (awg && AWG_DIAMETERS[awg]) {
      diameterMm = AWG_DIAMETERS[awg];
    } else if (diameter !== '') {
      diameterMm = diameterUnit === 'mm' ? (diameter as number) : (diameter as number) * 25.4;
    } else {
      alert('Please enter wire diameter or select AWG gauge');
      return;
    }

    if (length === '' || length <= 0 || diameterMm <= 0) {
      alert('Please enter valid length and diameter values');
      return;
    }

    // Convert length to meters
    const lengthM = lengthUnit === 'm' ? (length as number) : (length as number) * 0.3048;

    // Calculate cross-sectional area (m²)
    const radiusM = (diameterMm / 1000) / 2;
    const areaM2 = Math.PI * radiusM * radiusM;

    // Calculate volume (m³)
    const volumeM3 = areaM2 * lengthM;

    // Calculate weight (kg)
    const weightKg = volumeM3 * COPPER_DENSITY;

    // Calculate resistance (Ω)
    const resistanceOhm = (COPPER_RESISTIVITY * lengthM) / areaM2;

    // Convert weight to selected unit
    const weightFinal = weightUnit === 'kg' ? weightKg : weightKg * 2.20462;

    setResults({
      weight: weightFinal,
      length: lengthM,
      diameter: diameterMm,
      area: areaM2 * 1e6, // Convert to mm²
      resistance: resistanceOhm
    });
  };

  const format = (num: number, decimals: number = 4) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001) return num.toExponential(decimals);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const handleReset = () => {
    setLength('');
    setDiameter('');
    setAwg('');
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Copper Wire Weight Calculator</h1>}

      <div className="space-y-6">
        {/* Wire Length Input */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wire Length
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="Enter length"
                step="0.1"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value as 'm' | 'ft')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="m">Meters</option>
                <option value="ft">Feet</option>
              </select>
            </div>
          </div>

          {/* AWG Gauge Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AWG Gauge (Optional)
            </label>
            <select
              value={awg}
              onChange={(e) => {
                setAwg(e.target.value);
                if (e.target.value) setDiameter('');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="">Select AWG (or enter diameter below)</option>
              {Object.keys(AWG_DIAMETERS).map((gauge) => (
                <option key={gauge} value={gauge}>
                  AWG {gauge} ({AWG_DIAMETERS[gauge]} mm)
                </option>
              ))}
            </select>
          </div>

          {/* Manual Diameter Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wire Diameter (if not using AWG)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={diameter}
                onChange={(e) => {
                  setDiameter(e.target.value === '' ? '' : parseFloat(e.target.value));
                  if (e.target.value) setAwg('');
                }}
                placeholder="Enter diameter"
                step="0.01"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={diameterUnit}
                onChange={(e) => setDiameterUnit(e.target.value as 'mm' | 'in')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="mm">mm</option>
                <option value="in">inches</option>
              </select>
            </div>
          </div>

          {/* Weight Unit Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight Unit
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setWeightUnit('kg')}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
                  weightUnit === 'kg'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Kilograms
              </button>
              <button
                onClick={() => setWeightUnit('lb')}
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
                  weightUnit === 'lb'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pounds
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculate}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition transform hover:scale-105"
          >
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
          >
            Reset
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Results</h2>
            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Wire Weight</p>
                <p className="text-2xl font-bold text-purple-600">
                  {format(results.weight)} {weightUnit}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Wire Diameter</p>
                <p className="text-xl font-bold text-purple-600">{format(results.diameter, 3)} mm</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Cross-Sectional Area</p>
                <p className="text-xl font-bold text-purple-600">{format(results.area, 3)} mm²</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Wire Resistance (DC at 20°C)</p>
                <p className="text-xl font-bold text-purple-600">{format(results.resistance)} Ω</p>
              </div>
            </div>

            {/* Reference Information */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Reference:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>Copper density: 8960 kg/m³</li>
                <li>Copper resistivity: 1.68 × 10⁻⁸ Ω⋅m (20°C)</li>
                <li>Formula: Weight = π × r² × L × ρ</li>
                <li>Resistance: R = ρ × L / A</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
