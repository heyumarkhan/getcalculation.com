'use client';

import { useState } from 'react';

interface DopplerResult {
  observedFrequency: number;
  frequencyShift: number;
  wavelengthShift: number;
  speedOfSound: number;
  machNumber?: number;
}

type DopplerMode = 'source-approaching' | 'source-receding' | 'observer-approaching' | 'observer-receding' | 'both-moving';

export default function DopplerEffectCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [mode, setMode] = useState<DopplerMode>('source-approaching');
  const [sourceFrequency, setSourceFrequency] = useState<number | ''>('');
  const [sourceVelocity, setSourceVelocity] = useState<number | ''>('');
  const [observerVelocity, setObserverVelocity] = useState<number | ''>('');
  const [medium, setMedium] = useState<'air-20c' | 'air-0c' | 'water' | 'light'>('air-20c');
  const [sourceVelocityUnit, setSourceVelocityUnit] = useState<'m/s' | 'km/h' | 'mph'>('m/s');
  const [observerVelocityUnit, setObserverVelocityUnit] = useState<'m/s' | 'km/h' | 'mph'>('m/s');

  const [results, setResults] = useState<DopplerResult | null>(null);

  const mediumSpeeds: Record<string, number> = {
    'air-20c': 343, // m/s at 20°C
    'air-0c': 331, // m/s at 0°C
    water: 1480, // m/s in water
    light: 3e8 // m/s (speed of light)
  };

  const format = (num: number, decimals: number = 4) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1e10) return num.toExponential(4);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const convertVelocityToMS = (vel: number, unit: string): number => {
    switch (unit) {
      case 'km/h':
        return vel / 3.6;
      case 'mph':
        return vel / 2.237;
      default:
        return vel;
    }
  };

  const calculate = () => {
    if (sourceFrequency === '') {
      alert('Enter source frequency');
      return;
    }

    const f0 = sourceFrequency as number;
    const speedOfSound = mediumSpeeds[medium];

    if (f0 <= 0) {
      alert('Frequency must be positive');
      return;
    }

    let vs = 0; // source velocity
    let vo = 0; // observer velocity
    let observedFreq = 0;

    // Doppler Effect Formula: f' = f × (v + vo) / (v - vs)
    // Positive velocities: away from each other
    // Negative velocities: toward each other

    if (mode === 'source-approaching') {
      if (sourceVelocity === '') {
        alert('Enter source velocity');
        return;
      }
      vs = -(convertVelocityToMS(sourceVelocity as number, sourceVelocityUnit)); // negative because approaching
      
    } else if (mode === 'source-receding') {
      if (sourceVelocity === '') {
        alert('Enter source velocity');
        return;
      }
      vs = convertVelocityToMS(sourceVelocity as number, sourceVelocityUnit); // positive = receding
      
    } else if (mode === 'observer-approaching') {
      if (observerVelocity === '') {
        alert('Enter observer velocity');
        return;
      }
      vo = convertVelocityToMS(observerVelocity as number, observerVelocityUnit); // positive = toward source
      
    } else if (mode === 'observer-receding') {
      if (observerVelocity === '') {
        alert('Enter observer velocity');
        return;
      }
      vo = -(convertVelocityToMS(observerVelocity as number, observerVelocityUnit)); // negative = away
      
    } else if (mode === 'both-moving') {
      if (sourceVelocity === '' || observerVelocity === '') {
        alert('Enter both source and observer velocities');
        return;
      }
      vs = convertVelocityToMS(sourceVelocity as number, sourceVelocityUnit);
      vo = convertVelocityToMS(observerVelocity as number, observerVelocityUnit);
    }

    // Check for sonic barrier (source approaching speed of sound)
    if (Math.abs(vs) >= speedOfSound) {
      alert('Source velocity must be less than speed of sound for this medium');
      return;
    }

    // Apply Doppler formula
    observedFreq = f0 * (speedOfSound + vo) / (speedOfSound - vs);

    const wavelengthOriginal = speedOfSound / f0;
    const wavelengthObserved = speedOfSound / observedFreq;
    const wavelengthShift = wavelengthObserved - wavelengthOriginal;
    const frequencyShift = observedFreq - f0;
    const machNumber = Math.abs(vs) / speedOfSound;

    setResults({
      observedFrequency: observedFreq,
      frequencyShift: frequencyShift,
      wavelengthShift: wavelengthShift,
      speedOfSound: speedOfSound,
      machNumber: machNumber
    });
  };

  const handleReset = () => {
    setSourceFrequency('');
    setSourceVelocity('');
    setObserverVelocity('');
    setResults(null);
  };

  const loadPreset = (preset: 'ambulance' | 'train' | 'jet' | 'bat') => {
    switch (preset) {
      case 'ambulance':
        setMode('source-approaching');
        setSourceFrequency(1000);
        setSourceVelocity(20);
        setSourceVelocityUnit('m/s');
        setMedium('air-20c');
        break;
      case 'train':
        setMode('source-approaching');
        setSourceFrequency(500);
        setSourceVelocity(30);
        setSourceVelocityUnit('m/s');
        setMedium('air-20c');
        break;
      case 'jet':
        setMode('source-approaching');
        setSourceFrequency(500);
        setSourceVelocity(250);
        setSourceVelocityUnit('m/s');
        setMedium('air-20c');
        break;
      case 'bat':
        setMode('source-approaching');
        setSourceFrequency(40000);
        setSourceVelocity(10);
        setSourceVelocityUnit('m/s');
        setMedium('air-20c');
        break;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Doppler Effect Calculator</h1>}

      <div className="space-y-6">
        {/* Mode Selection */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Doppler Scenario</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {([
              { val: 'source-approaching', label: 'Source →' },
              { val: 'source-receding', label: 'Source ←' },
              { val: 'observer-approaching', label: 'Observer →' },
              { val: 'observer-receding', label: 'Observer ←' },
              { val: 'both-moving', label: 'Both Moving' }
            ] as const).map(({ val, label }) => (
              <button
                key={val}
                onClick={() => setMode(val)}
                className={`py-2 px-3 rounded text-sm font-medium transition ${
                  mode === val
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Presets */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Real-World Presets</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button onClick={() => loadPreset('ambulance')} className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
              🚑 Ambulance
            </button>
            <button onClick={() => loadPreset('train')} className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
              🚂 Train
            </button>
            <button onClick={() => loadPreset('jet')} className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
              ✈️ Jet
            </button>
            <button onClick={() => loadPreset('bat')} className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
              🦇 Bat Sonar
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source Frequency (Hz)</label>
            <input
              type="number"
              value={sourceFrequency}
              onChange={(e) => setSourceFrequency(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 440"
              step="any"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medium</label>
            <select
              value={medium}
              onChange={(e) => setMedium(e.target.value as typeof medium)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <option value="air-20c">Air (20°C) - 343 m/s</option>
              <option value="air-0c">Air (0°C) - 331 m/s</option>
              <option value="water">Water - 1480 m/s</option>
              <option value="light">Light - 3×10⁸ m/s (relativistic)</option>
            </select>
          </div>

          {(mode === 'source-approaching' || mode === 'source-receding' || mode === 'both-moving') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source Velocity</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={sourceVelocity}
                  onChange={(e) => setSourceVelocity(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 20"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={sourceVelocityUnit}
                  onChange={(e) => setSourceVelocityUnit(e.target.value as typeof sourceVelocityUnit)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="m/s">m/s</option>
                  <option value="km/h">km/h</option>
                  <option value="mph">mph</option>
                </select>
              </div>
            </div>
          )}

          {(mode === 'observer-approaching' || mode === 'observer-receding' || mode === 'both-moving') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Observer Velocity</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={observerVelocity}
                  onChange={(e) => setObserverVelocity(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 10"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={observerVelocityUnit}
                  onChange={(e) => setObserverVelocityUnit(e.target.value as typeof observerVelocityUnit)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="m/s">m/s</option>
                  <option value="km/h">km/h</option>
                  <option value="mph">mph</option>
                </select>
              </div>
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

            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg mb-4">
              <p className="text-sm opacity-90">Observed Frequency</p>
              <p className="text-4xl font-bold">{format(results.observedFrequency, 2)} Hz</p>
            </div>

            <div className="space-y-3">
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Frequency Shift (Δf)</p>
                <p className="text-xl font-bold text-purple-600">
                  {results.frequencyShift > 0 ? '+' : ''}{format(results.frequencyShift, 2)} Hz
                </p>
                <p className="text-xs text-gray-600">
                  {results.frequencyShift > 0 ? '(Higher pitch - approaching)' : '(Lower pitch - receding)'}
                </p>
              </div>

              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Wavelength Shift</p>
                <p className="text-xl font-bold text-purple-600">
                  {results.wavelengthShift > 0 ? '+' : ''}{format(results.wavelengthShift, 6)} m
                </p>
              </div>

              {results.machNumber !== undefined && results.machNumber > 0 && (
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Mach Number</p>
                  <p className="text-xl font-bold text-purple-600">{format(results.machNumber, 3)} M</p>
                  <p className="text-xs text-gray-600">
                    {results.machNumber < 1 ? 'Subsonic' : results.machNumber === 1 ? 'Sonic' : 'Supersonic'}
                  </p>
                </div>
              )}
            </div>

            {/* Formulas Used */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Doppler Formula:</p>
              <p className="text-xs text-gray-600 mb-2">f' = f₀ × (v + v_o) / (v - v_s)</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>f₀ = source frequency (Hz)</li>
                <li>f' = observed frequency (Hz)</li>
                <li>v = speed of sound in medium (m/s)</li>
                <li>v_o = observer velocity toward source (+) or away (-)</li>
                <li>v_s = source velocity toward observer (+) or away (-)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
