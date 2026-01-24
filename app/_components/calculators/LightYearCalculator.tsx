'use client';

import { useState } from 'react';

interface LightYearResult {
  lightYears: number;
  kilometers: number;
  miles: number;
  astronomicalUnits: number;
  parsecs: number;
}

export default function LightYearCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [inputValue, setInputValue] = useState<number | ''>('');
  const [inputUnit, setInputUnit] = useState<'ly' | 'km' | 'mi' | 'au' | 'pc'>('ly');
  const [results, setResults] = useState<LightYearResult | null>(null);

  // Constants
  const LIGHT_YEAR_KM = 9.461e12; // 1 light year in kilometers
  const KM_TO_MILES = 0.621371;
  const AU_KM = 1.496e8; // 1 astronomical unit in km
  const PARSEC_KM = 3.086e13; // 1 parsec in km

  const calculate = () => {
    if (inputValue === '' || inputValue <= 0) {
      alert('Please enter a positive value');
      return;
    }

    const value = inputValue as number;
    let km = 0;

    // Convert input to kilometers first
    switch (inputUnit) {
      case 'ly':
        km = value * LIGHT_YEAR_KM;
        break;
      case 'km':
        km = value;
        break;
      case 'mi':
        km = value / KM_TO_MILES;
        break;
      case 'au':
        km = value * AU_KM;
        break;
      case 'pc':
        km = value * PARSEC_KM;
        break;
    }

    // Convert kilometers to all units
    const ly = km / LIGHT_YEAR_KM;
    const mi = km * KM_TO_MILES;
    const au = km / AU_KM;
    const pc = km / PARSEC_KM;

    setResults({
      lightYears: ly,
      kilometers: km,
      miles: mi,
      astronomicalUnits: au,
      parsecs: pc
    });
  };

  const format = (num: number, decimals: number = 6) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.000001 || Math.abs(num) > 1e15) {
      return num.toExponential(decimals);
    }
    if (Math.abs(num) >= 1e6) {
      return num.toExponential(decimals);
    }
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const handleReset = () => {
    setInputValue('');
    setResults(null);
  };

  const unitLabels: Record<string, string> = {
    ly: 'Light Years',
    km: 'Kilometers',
    mi: 'Miles',
    au: 'Astronomical Units (AU)',
    pc: 'Parsecs'
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Light Year Calculator</h1>}

      <div className="space-y-6">
        {/* Input Section */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distance Value
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="Enter distance"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input Unit
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {(['ly', 'km', 'mi', 'au', 'pc'] as const).map((unit) => (
                <button
                  key={unit}
                  onClick={() => setInputUnit(unit)}
                  className={`py-2 px-3 rounded text-sm font-medium transition ${
                    inputUnit === unit
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {unit === 'ly' && 'Light Years'}
                  {unit === 'km' && 'Kilometers'}
                  {unit === 'mi' && 'Miles'}
                  {unit === 'au' && 'AU'}
                  {unit === 'pc' && 'Parsecs'}
                </button>
              ))}
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
            <h2 className="text-lg font-bold text-gray-800 mb-4">Distance Conversions</h2>
            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Light Years</p>
                <p className="text-xl font-bold text-purple-600">{format(results.lightYears)} ly</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Kilometers</p>
                <p className="text-xl font-bold text-purple-600">{format(results.kilometers)} km</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Miles</p>
                <p className="text-xl font-bold text-purple-600">{format(results.miles)} mi</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Astronomical Units</p>
                <p className="text-xl font-bold text-purple-600">{format(results.astronomicalUnits)} AU</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Parsecs</p>
                <p className="text-xl font-bold text-purple-600">{format(results.parsecs)} pc</p>
              </div>
            </div>

            {/* Reference Information */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Reference Values:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>1 light year = 9.461 × 10¹² km</li>
                <li>1 AU = 1.496 × 10⁸ km (Earth-Sun distance)</li>
                <li>1 parsec = 3.086 × 10¹³ km ≈ 3.26 light years</li>
                <li>Speed of light = 299,792 km/s</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
