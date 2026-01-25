'use client';

import { useState } from 'react';

interface WireSizeResult {
  recommendedAWG: number;
  voltageDrop: number;
  voltageDropPercent: number;
  wireResistance: number;
  powerLoss: number;
  minimumWireDiameter: number;
}

// AWG resistance in ohms per 1000 feet at 20°C for copper wire
const AWG_RESISTANCE: Record<number, number> = {
  4: 0.2485,
  6: 0.3951,
  8: 0.6282,
  10: 0.9989,
  12: 1.588,
  14: 2.525,
  16: 4.016,
  18: 6.385,
  20: 10.15,
  22: 16.14
};

const AWG_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22];

export default function TwelveVoltWireSizeCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [current, setCurrent] = useState<number | ''>('');
  const [length, setLength] = useState<number | ''>('');
  const [lengthUnit, setLengthUnit] = useState<'feet' | 'meters'>('feet');
  const [maxVoltageDrop, setMaxVoltageDrop] = useState<number>(3);
  const [results, setResults] = useState<WireSizeResult | null>(null);

  const format = (num: number, decimals: number = 4) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001) return num.toExponential(decimals);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const calculate = () => {
    if (current === '' || current <= 0) {
      alert('Please enter a valid current (amperes) greater than zero');
      return;
    }

    if (length === '' || length <= 0) {
      alert('Please enter a valid wire length greater than zero');
      return;
    }

    const I = current as number;
    let L = length as number;

    // Convert meters to feet if needed
    if (lengthUnit === 'meters') {
      L = L * 3.28084;
    }

    // Calculate for round trip (wire goes there and back)
    const totalLength = L * 2;

    // Maximum allowed voltage drop in volts
    const maxDropVolts = (maxVoltageDrop / 100) * 12;

    // Find the smallest AWG that meets voltage drop requirement
    let selectedAWG = 22; // Start with smallest (highest gauge number)
    let resistance = 0;

    for (const awg of AWG_SIZES.reverse()) {
      const R = (AWG_RESISTANCE[awg] * totalLength) / 1000; // Resistance for total length
      const vDrop = I * R;

      if (vDrop <= maxDropVolts) {
        selectedAWG = awg;
        resistance = R;
        break;
      }
    }

    // If even AWG 4 doesn't work, still show AWG 4 with warning
    if (selectedAWG === 22) {
      selectedAWG = 4;
      resistance = (AWG_RESISTANCE[4] * totalLength) / 1000;
    }

    const voltageDrop = I * resistance;
    const voltageDropPercent = (voltageDrop / 12) * 100;
    const powerLoss = I * voltageDrop;

    // Wire diameter calculation (approximate for info)
    const wireDiameter = 0.127 * Math.pow(92, (36 - selectedAWG) / 39); // mm

    setResults({
      recommendedAWG: selectedAWG,
      voltageDrop,
      voltageDropPercent,
      wireResistance: resistance,
      powerLoss,
      minimumWireDiameter: wireDiameter
    });
  };

  const handleReset = () => {
    setCurrent('');
    setLength('');
    setResults(null);
  };

  const loadPreset = (preset: 'led-strip' | 'winch' | 'inverter' | 'solar') => {
    switch (preset) {
      case 'led-strip':
        setCurrent(5);
        setLength(15);
        setLengthUnit('feet');
        setMaxVoltageDrop(3);
        break;
      case 'winch':
        setCurrent(400);
        setLength(10);
        setLengthUnit('feet');
        setMaxVoltageDrop(5);
        break;
      case 'inverter':
        setCurrent(100);
        setLength(6);
        setLengthUnit('feet');
        setMaxVoltageDrop(3);
        break;
      case 'solar':
        setCurrent(30);
        setLength(25);
        setLengthUnit('feet');
        setMaxVoltageDrop(2);
        break;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">12 Volt Wire Size Calculator</h1>}

      <div className="space-y-6">
        {/* Presets */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Common 12V Applications</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => loadPreset('led-strip')}
              className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              LED Strip (5A, 15ft)
            </button>
            <button
              onClick={() => loadPreset('winch')}
              className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Winch (400A, 10ft)
            </button>
            <button
              onClick={() => loadPreset('inverter')}
              className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Inverter (100A, 6ft)
            </button>
            <button
              onClick={() => loadPreset('solar')}
              className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Solar Panel (30A, 25ft)
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Draw (Amperes)</label>
            <input
              type="number"
              value={current}
              onChange={(e) => setCurrent(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 20"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">One-Way Wire Length</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 10"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value as 'feet' | 'meters')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="feet">Feet</option>
                <option value="meters">Meters</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-1">Distance from battery to load (one direction)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Voltage Drop (%)
            </label>
            <select
              value={maxVoltageDrop}
              onChange={(e) => setMaxVoltageDrop(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value={2}>2% (Recommended for critical loads)</option>
              <option value={3}>3% (Standard for most applications)</option>
              <option value={5}>5% (Maximum for non-critical loads)</option>
              <option value={10}>10% (Very short runs only)</option>
            </select>
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
            <h2 className="text-lg font-bold text-gray-800 mb-4">Wire Size Recommendation</h2>
            
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg mb-4">
              <p className="text-sm opacity-90">Recommended AWG Size</p>
              <p className="text-4xl font-bold">AWG {results.recommendedAWG}</p>
              <p className="text-sm opacity-90 mt-1">
                {results.recommendedAWG === 4 && results.voltageDropPercent > maxVoltageDrop && 
                  '⚠️ May require larger wire or shorter run'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Voltage Drop</p>
                <p className="text-xl font-bold text-purple-600">{format(results.voltageDrop, 3)} V</p>
                <p className="text-sm text-gray-600">{format(results.voltageDropPercent, 2)}%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Wire Resistance</p>
                <p className="text-xl font-bold text-purple-600">{format(results.wireResistance, 4)} Ω</p>
                <p className="text-sm text-gray-600">Round trip</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Power Loss</p>
                <p className="text-xl font-bold text-purple-600">{format(results.powerLoss, 2)} W</p>
                <p className="text-sm text-gray-600">Heat dissipated</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Wire Diameter</p>
                <p className="text-xl font-bold text-purple-600">{format(results.minimumWireDiameter, 2)} mm</p>
                <p className="text-sm text-gray-600">Approximate</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Important Notes:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Length accounts for round-trip (positive and negative wires)</li>
                <li>• Based on copper wire at 20°C (68°F)</li>
                <li>• For long runs or high current, consider next larger size</li>
                <li>• Check local codes and wire ampacity ratings</li>
                <li>• Voltage at load: {format(12 - results.voltageDrop, 2)} V</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
