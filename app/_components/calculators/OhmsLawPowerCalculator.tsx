'use client';

import { useState } from 'react';

interface OhmsLawResult {
  power: number;
  voltage: number;
  current: number;
  resistance: number;
}

export default function OhmsLawPowerCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [voltage, setVoltage] = useState<number | ''>('');
  const [current, setCurrent] = useState<number | ''>('');
  const [resistance, setResistance] = useState<number | ''>('');
  const [results, setResults] = useState<OhmsLawResult | null>(null);
  const [calculationMode, setCalculationMode] = useState<'power' | 'voltage' | 'current' | 'resistance'>('power');

  const calculatePower = () => {
    if (calculationMode === 'power') {
      if (voltage === '' && current === '') {
        alert('Enter voltage and current to calculate power');
        return;
      }
      if (voltage === '' || current === '') {
        alert('Enter both voltage and current');
        return;
      }
      const P = (voltage as number) * (current as number);
      const R = voltage !== 0 ? (voltage as number) / (current as number) : 0;
      setResults({
        power: P,
        voltage: voltage as number,
        current: current as number,
        resistance: R
      });
    } else if (calculationMode === 'voltage') {
      if (current === '' && resistance === '') {
        alert('Enter current and resistance to calculate voltage');
        return;
      }
      if (current === '' || resistance === '') {
        alert('Enter both current and resistance');
        return;
      }
      const V = (current as number) * (resistance as number);
      const P = V * (current as number);
      setResults({
        power: P,
        voltage: V,
        current: current as number,
        resistance: resistance as number
      });
    } else if (calculationMode === 'current') {
      if (voltage === '' && resistance === '') {
        alert('Enter voltage and resistance to calculate current');
        return;
      }
      if (voltage === '' || resistance === '') {
        alert('Enter both voltage and resistance');
        return;
      }
      const I = resistance !== 0 ? (voltage as number) / (resistance as number) : 0;
      const P = (voltage as number) * I;
      setResults({
        power: P,
        voltage: voltage as number,
        current: I,
        resistance: resistance as number
      });
    } else if (calculationMode === 'resistance') {
      if (voltage === '' && current === '') {
        alert('Enter voltage and current to calculate resistance');
        return;
      }
      if (voltage === '' || current === '') {
        alert('Enter both voltage and current');
        return;
      }
      const R = current !== 0 ? (voltage as number) / (current as number) : 0;
      const P = (voltage as number) * (current as number);
      setResults({
        power: P,
        voltage: voltage as number,
        current: current as number,
        resistance: R
      });
    }
  };

  const format = (num: number, decimals: number = 4) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001) return num.toExponential(decimals);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const handleReset = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Ohm's Law Power Calculator</h1>}

      <div className="space-y-6">
        {/* Calculation Mode Selection */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Calculation Mode</label>
          <div className="grid grid-cols-2 gap-3">
            {(['power', 'voltage', 'current', 'resistance'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setCalculationMode(mode)}
                className={`py-2 px-3 rounded text-sm font-medium transition ${
                  calculationMode === mode
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Calculate {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Input Fields */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Voltage (V)</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">Current (A)</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">Resistance (Ohms)</label>
          <input
            type="number"
            value={resistance}
            onChange={(e) => setResistance(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculatePower}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Power (W)</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.power)}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Voltage (V)</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.voltage)}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Current (A)</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.current)}</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Resistance (Ohms)</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.resistance)}</p>
              </div>
            </div>

            {/* Formulas Used */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Formulas Used:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>P = V * I (Power = Voltage * Current)</li>
                <li>V = I * R (Voltage = Current * Resistance)</li>
                <li>I = V / R (Current = Voltage / Resistance)</li>
                <li>R = V / I (Resistance = Voltage / Current)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
