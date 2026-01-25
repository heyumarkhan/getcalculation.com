'use client';

import { useState } from 'react';

interface VonMisesResult {
  vonMisesStress: number;
  principalStress1?: number;
  principalStress2?: number;
  principalStress3?: number;
  safetyFactor?: number;
}

export default function VonMisesStressCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [mode, setMode] = useState<'2D' | '3D'>('2D');
  const [sigmaX, setSigmaX] = useState<number | ''>('');
  const [sigmaY, setSigmaY] = useState<number | ''>('');
  const [sigmaZ, setSigmaZ] = useState<number | ''>('');
  const [tauXY, setTauXY] = useState<number | ''>('');
  const [tauYZ, setTauYZ] = useState<number | ''>('');
  const [tauZX, setTauZX] = useState<number | ''>('');
  const [yieldStrength, setYieldStrength] = useState<number | ''>('');
  const [results, setResults] = useState<VonMisesResult | null>(null);

  const format = (num: number, decimals: number = 4) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1e10) return num.toExponential(decimals);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const calculate = () => {
    const σx = (sigmaX === '' ? 0 : sigmaX) as number;
    const σy = (sigmaY === '' ? 0 : sigmaY) as number;
    const σz = mode === '3D' ? ((sigmaZ === '' ? 0 : sigmaZ) as number) : 0;
    const τxy = (tauXY === '' ? 0 : tauXY) as number;
    const τyz = mode === '3D' ? ((tauYZ === '' ? 0 : tauYZ) as number) : 0;
    const τzx = mode === '3D' ? ((tauZX === '' ? 0 : tauZX) as number) : 0;

    let vonMises: number;

    if (mode === '2D') {
      // Plane stress (2D): σ_v = √(σ_x² - σ_x·σ_y + σ_y² + 3τ_xy²)
      vonMises = Math.sqrt(
        σx * σx - σx * σy + σy * σy + 3 * τxy * τxy
      );
    } else {
      // 3D general stress: σ_v = √(0.5 × ((σ₁-σ₂)² + (σ₂-σ₃)² + (σ₃-σ₁)²))
      // Using component form: σ_v = √(σ_x² + σ_y² + σ_z² - σ_x·σ_y - σ_y·σ_z - σ_z·σ_x + 3(τ_xy² + τ_yz² + τ_zx²))
      vonMises = Math.sqrt(
        σx * σx + σy * σy + σz * σz -
        σx * σy - σy * σz - σz * σx +
        3 * (τxy * τxy + τyz * τyz + τzx * τzx)
      );
    }

    // Calculate principal stresses (for 2D, simplified)
    let σ1: number | undefined;
    let σ2: number | undefined;
    let σ3: number | undefined;

    if (mode === '2D') {
      const σavg = (σx + σy) / 2;
      const R = Math.sqrt(Math.pow((σx - σy) / 2, 2) + τxy * τxy);
      σ1 = σavg + R;
      σ2 = σavg - R;
      σ3 = 0; // Out-of-plane principal stress for plane stress
    }

    // Calculate safety factor if yield strength provided
    let safetyFactor: number | undefined;
    if (yieldStrength !== '' && yieldStrength > 0) {
      safetyFactor = (yieldStrength as number) / vonMises;
    }

    setResults({
      vonMisesStress: vonMises,
      principalStress1: σ1,
      principalStress2: σ2,
      principalStress3: σ3,
      safetyFactor
    });
  };

  const handleReset = () => {
    setSigmaX('');
    setSigmaY('');
    setSigmaZ('');
    setTauXY('');
    setTauYZ('');
    setTauZX('');
    setYieldStrength('');
    setResults(null);
  };

  const loadPreset = (preset: 'uniaxial' | 'pure-shear' | 'biaxial' | 'combined') => {
    setMode('2D');
    switch (preset) {
      case 'uniaxial':
        setSigmaX(100);
        setSigmaY(0);
        setTauXY(0);
        setYieldStrength(250);
        break;
      case 'pure-shear':
        setSigmaX(0);
        setSigmaY(0);
        setTauXY(50);
        setYieldStrength(145);
        break;
      case 'biaxial':
        setSigmaX(80);
        setSigmaY(60);
        setTauXY(0);
        setYieldStrength(250);
        break;
      case 'combined':
        setSigmaX(75);
        setSigmaY(45);
        setTauXY(30);
        setYieldStrength(250);
        break;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Von Mises Stress Calculator</h1>}

      <div className="space-y-6">
        {/* Mode Selection */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Stress State</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('2D')}
              className={`py-2 px-3 rounded text-sm font-medium transition ${
                mode === '2D'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              2D Plane Stress
            </button>
            <button
              onClick={() => setMode('3D')}
              className={`py-2 px-3 rounded text-sm font-medium transition ${
                mode === '3D'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              3D General Stress
            </button>
          </div>
        </div>

        {/* Presets (2D only) */}
        {mode === '2D' && (
          <div className="bg-white rounded-lg p-4 shadow">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Quick Presets (MPa)</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => loadPreset('uniaxial')}
                className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
              >
                Uniaxial Tension
              </button>
              <button
                onClick={() => loadPreset('pure-shear')}
                className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
              >
                Pure Shear
              </button>
              <button
                onClick={() => loadPreset('biaxial')}
                className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
              >
                Biaxial Stress
              </button>
              <button
                onClick={() => loadPreset('combined')}
                className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
              >
                Combined Loading
              </button>
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Normal Stresses (MPa or psi)</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">σ<sub>x</sub> (Normal stress in x-direction)</label>
            <input
              type="number"
              value={sigmaX}
              onChange={(e) => setSigmaX(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 100"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">σ<sub>y</sub> (Normal stress in y-direction)</label>
            <input
              type="number"
              value={sigmaY}
              onChange={(e) => setSigmaY(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 50"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {mode === '3D' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">σ<sub>z</sub> (Normal stress in z-direction)</label>
              <input
                type="number"
                value={sigmaZ}
                onChange={(e) => setSigmaZ(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 30"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          )}

          <h3 className="text-sm font-semibold text-gray-700 mb-2 pt-2">Shear Stresses (MPa or psi)</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">τ<sub>xy</sub> (Shear stress in xy-plane)</label>
            <input
              type="number"
              value={tauXY}
              onChange={(e) => setTauXY(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 25"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {mode === '3D' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">τ<sub>yz</sub> (Shear stress in yz-plane)</label>
                <input
                  type="number"
                  value={tauYZ}
                  onChange={(e) => setTauYZ(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 15"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">τ<sub>zx</sub> (Shear stress in zx-plane)</label>
                <input
                  type="number"
                  value={tauZX}
                  onChange={(e) => setTauZX(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 10"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </>
          )}

          <h3 className="text-sm font-semibold text-gray-700 mb-2 pt-2">Material Property (Optional)</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Yield Strength (MPa or psi)</label>
            <input
              type="number"
              value={yieldStrength}
              onChange={(e) => setYieldStrength(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 250 (for mild steel)"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
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
            
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg mb-4">
              <p className="text-sm opacity-90">Von Mises Stress (σ<sub>v</sub>)</p>
              <p className="text-4xl font-bold">{format(results.vonMisesStress, 2)} MPa</p>
            </div>

            {mode === '2D' && results.principalStress1 !== undefined && (
              <div className="space-y-3 mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Principal Stresses</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-xs text-gray-600">σ<sub>1</sub> (Max)</p>
                    <p className="text-lg font-bold text-purple-600">{format(results.principalStress1, 2)}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-xs text-gray-600">σ<sub>2</sub> (Min)</p>
                    <p className="text-lg font-bold text-purple-600">{format(results.principalStress2!, 2)}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="text-xs text-gray-600">σ<sub>3</sub></p>
                    <p className="text-lg font-bold text-purple-600">{format(results.principalStress3!, 2)}</p>
                  </div>
                </div>
              </div>
            )}

            {results.safetyFactor !== undefined && (
              <div className="bg-purple-50 p-4 rounded">
                <p className="text-sm text-gray-600">Safety Factor (Yield Criterion)</p>
                <p className="text-2xl font-bold text-purple-600">
                  {format(results.safetyFactor, 3)}
                  <span className="text-sm ml-2">
                    {results.safetyFactor >= 2 ? '✓ Safe' : results.safetyFactor >= 1 ? '⚠ Marginal' : '✗ Unsafe'}
                  </span>
                </p>
              </div>
            )}

            {/* Formulas Used */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Formula Used:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                {mode === '2D' ? (
                  <li>2D Plane Stress: σ<sub>v</sub> = √(σ<sub>x</sub>² - σ<sub>x</sub>·σ<sub>y</sub> + σ<sub>y</sub>² + 3τ<sub>xy</sub>²)</li>
                ) : (
                  <li>3D General: σ<sub>v</sub> = √(σ<sub>x</sub>² + σ<sub>y</sub>² + σ<sub>z</sub>² - σ<sub>x</sub>·σ<sub>y</sub> - σ<sub>y</sub>·σ<sub>z</sub> - σ<sub>z</sub>·σ<sub>x</sub> + 3(τ<sub>xy</sub>² + τ<sub>yz</sub>² + τ<sub>zx</sub>²))</li>
                )}
                <li>Von Mises yield criterion: σ<sub>v</sub> ≤ σ<sub>yield</sub> (material remains in elastic range)</li>
                <li>Safety factor: SF = σ<sub>yield</sub> / σ<sub>v</sub></li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
