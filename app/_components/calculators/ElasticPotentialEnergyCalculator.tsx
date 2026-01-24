'use client';

import { useState } from 'react';

interface ElasticEnergyResult {
  energy: number;
  springConstant: number;
  displacement: number;
  force: number;
}

export default function ElasticPotentialEnergyCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [springConstant, setSpringConstant] = useState<number | ''>('');
  const [displacement, setDisplacement] = useState<number | ''>('');
  const [energy, setEnergy] = useState<number | ''>('');
  const [calculationMode, setCalculationMode] = useState<'energy' | 'spring-constant' | 'displacement'>('energy');
  const [results, setResults] = useState<ElasticEnergyResult | null>(null);

  const calculate = () => {
    if (calculationMode === 'energy') {
      if (springConstant === '' || displacement === '') {
        alert('Enter spring constant and displacement to calculate energy');
        return;
      }
      const k = springConstant as number;
      const x = displacement as number;
      
      if (k <= 0 || x < 0) {
        alert('Spring constant must be positive, displacement must be non-negative');
        return;
      }

      const E = 0.5 * k * x * x;
      const F = k * x;

      setResults({
        energy: E,
        springConstant: k,
        displacement: x,
        force: F
      });
    } else if (calculationMode === 'spring-constant') {
      if (energy === '' || displacement === '') {
        alert('Enter energy and displacement to calculate spring constant');
        return;
      }
      const E = energy as number;
      const x = displacement as number;

      if (E < 0 || x <= 0) {
        alert('Energy must be non-negative, displacement must be positive');
        return;
      }

      const k = (2 * E) / (x * x);
      const F = k * x;

      setResults({
        energy: E,
        springConstant: k,
        displacement: x,
        force: F
      });
    } else if (calculationMode === 'displacement') {
      if (energy === '' || springConstant === '') {
        alert('Enter energy and spring constant to calculate displacement');
        return;
      }
      const E = energy as number;
      const k = springConstant as number;

      if (E < 0 || k <= 0) {
        alert('Energy must be non-negative, spring constant must be positive');
        return;
      }

      const x = Math.sqrt((2 * E) / k);
      const F = k * x;

      setResults({
        energy: E,
        springConstant: k,
        displacement: x,
        force: F
      });
    }
  };

  const format = (num: number, decimals: number = 4) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001) return num.toExponential(decimals);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const handleReset = () => {
    setSpringConstant('');
    setDisplacement('');
    setEnergy('');
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Elastic Potential Energy Calculator</h1>}

      <div className="space-y-6">
        {/* Calculation Mode Selection */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Calculation Mode</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setCalculationMode('energy')}
              className={`py-2 px-3 rounded text-sm font-medium transition ${
                calculationMode === 'energy'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calculate Energy
            </button>
            <button
              onClick={() => setCalculationMode('spring-constant')}
              className={`py-2 px-3 rounded text-sm font-medium transition ${
                calculationMode === 'spring-constant'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calculate Spring Constant
            </button>
            <button
              onClick={() => setCalculationMode('displacement')}
              className={`py-2 px-3 rounded text-sm font-medium transition ${
                calculationMode === 'displacement'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calculate Displacement
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          {calculationMode !== 'spring-constant' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spring Constant (N/m)
              </label>
              <input
                type="number"
                value={springConstant}
                onChange={(e) => setSpringConstant(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 100"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}

          {calculationMode !== 'displacement' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Displacement (m)
              </label>
              <input
                type="number"
                value={displacement}
                onChange={(e) => setDisplacement(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 0.5"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}

          {calculationMode !== 'energy' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Elastic Potential Energy (J)
              </label>
              <input
                type="number"
                value={energy}
                onChange={(e) => setEnergy(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 12.5"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Elastic Potential Energy</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.energy)} J</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Spring Constant</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.springConstant)} N/m</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Displacement</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.displacement)} m</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Spring Force</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.force)} N</p>
              </div>
            </div>

            {/* Formulas Used */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Formulas Used:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>E = (1/2) × k × x² (Elastic Potential Energy)</li>
                <li>k = 2E / x² (Spring Constant)</li>
                <li>x = sqrt(2E / k) (Displacement)</li>
                <li>F = k × x (Hooke's Law - Spring Force)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
