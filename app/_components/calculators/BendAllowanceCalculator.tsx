'use client';

import { useState } from 'react';

interface BendAllowanceResult {
  bendAllowance: number;
  bendDeduction: number;
  outsideSetback: number;
  arcLength: number;
}

export default function BendAllowanceCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [thickness, setThickness] = useState<number | ''>('');
  const [bendAngle, setBendAngle] = useState<number | ''>('');
  const [insideRadius, setInsideRadius] = useState<number | ''>('');
  const [kFactor, setKFactor] = useState<number | ''>(0.33);
  const [unit, setUnit] = useState<'mm' | 'in'>('mm');
  const [results, setResults] = useState<BendAllowanceResult | null>(null);

  const calculateBendAllowance = () => {
    if (thickness === '' || bendAngle === '' || insideRadius === '' || kFactor === '') {
      alert('Please enter all values');
      return;
    }

    const T = thickness as number;
    const A = bendAngle as number;
    const R = insideRadius as number;
    const K = kFactor as number;

    if (T <= 0 || A <= 0 || A > 180 || R < 0 || K < 0 || K > 1) {
      alert('Invalid input values. Ensure: thickness > 0, angle 0-180°, radius ≥ 0, K-factor 0-1.');
      return;
    }

    // Bend Allowance: BA = (π/180) × (R + K×T) × A
    const BA = (Math.PI / 180) * (R + K * T) * A;

    // Outside Setback: OSSB = tan(A/2) × (R + T)
    const angleRad = (A * Math.PI) / 180;
    const OSSB = Math.tan(angleRad / 2) * (R + T);

    // Bend Deduction: BD = 2 × OSSB - BA
    const BD = 2 * OSSB - BA;

    // Arc Length (outer surface): Arc = (π/180) × (R + T) × A
    const arcLength = (Math.PI / 180) * (R + T) * A;

    setResults({
      bendAllowance: BA,
      bendDeduction: BD,
      outsideSetback: OSSB,
      arcLength: arcLength
    });
  };

  const format = (num: number, decimals: number = 4) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001) return num.toExponential(decimals);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const handleReset = () => {
    setThickness('');
    setBendAngle('');
    setInsideRadius('');
    setKFactor(0.33);
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Bend Allowance Calculator</h1>}

      <div className="space-y-6">
        {/* Unit Selection */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Unit System</label>
          <div className="flex gap-3">
            <button
              onClick={() => setUnit('mm')}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
                unit === 'mm'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Millimeters (mm)
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium transition ${
                unit === 'in'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Material Thickness ({unit})
            </label>
            <input
              type="number"
              value={thickness}
              onChange={(e) => setThickness(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 2.0"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bend Angle (degrees)
            </label>
            <input
              type="number"
              value={bendAngle}
              onChange={(e) => setBendAngle(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 90"
              step="1"
              max="180"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inside Radius ({unit})
            </label>
            <input
              type="number"
              value={insideRadius}
              onChange={(e) => setInsideRadius(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 1.0"
              step="0.1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              K-Factor (0-1, typical 0.3-0.5)
            </label>
            <input
              type="number"
              value={kFactor}
              onChange={(e) => setKFactor(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="0.33"
              step="0.01"
              min="0"
              max="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <p className="text-xs text-gray-500 mt-1">
              Typical: Soft materials 0.33, hard materials 0.5
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={calculateBendAllowance}
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
                <p className="text-sm text-gray-600">Bend Allowance</p>
                <p className="text-2xl font-bold text-purple-600">
                  {format(results.bendAllowance)} {unit}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Bend Deduction</p>
                <p className="text-2xl font-bold text-purple-600">
                  {format(results.bendDeduction)} {unit}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Outside Setback</p>
                <p className="text-2xl font-bold text-purple-600">
                  {format(results.outsideSetback)} {unit}
                </p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Arc Length (Outer)</p>
                <p className="text-2xl font-bold text-purple-600">
                  {format(results.arcLength)} {unit}
                </p>
              </div>
            </div>

            {/* Formulas Display */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Formulas Used:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>BA = (π/180) × (R + K×T) × A</li>
                <li>OSSB = tan(A/2) × (R + T)</li>
                <li>BD = 2 × OSSB - BA</li>
                <li>Arc = (π/180) × (R + T) × A</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
