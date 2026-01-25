'use client';

import { useState } from 'react';

interface OrbitalResult {
  orbitalVelocity: number;
  orbitalVelocityKmH: number;
  orbitalPeriod: number;
  escapeVelocity: number;
}

export default function OrbitalVelocityCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [mass, setMass] = useState<number | ''>('');
  const [massUnit, setMassUnit] = useState<'kg' | 'earth'>('earth');
  const [radius, setRadius] = useState<number | ''>('');
  const [radiusUnit, setRadiusUnit] = useState<'m' | 'km'>('km');
  const [altitude, setAltitude] = useState<number | ''>('');
  const [altitudeUnit, setAltitudeUnit] = useState<'m' | 'km'>('km');
  const [results, setResults] = useState<OrbitalResult | null>(null);

  const G = 6.674e-11; // Gravitational constant (m³/kg·s²)
  const EARTH_MASS = 5.972e24; // kg
  const EARTH_RADIUS = 6.371e6; // meters

  const convertMassToKg = (): number => {
    if (mass === '') return 0;
    if (massUnit === 'kg') return mass as number;
    return (mass as number) * EARTH_MASS;
  };

  const convertRadiusToMeters = (): number => {
    if (radius === '') return 0;
    if (radiusUnit === 'm') return radius as number;
    return (radius as number) * 1000;
  };

  const convertAltitudeToMeters = (): number => {
    if (altitude === '') return 0;
    if (altitudeUnit === 'm') return altitude as number;
    return (altitude as number) * 1000;
  };

  const format = (num: number, decimals: number = 4) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1e10) return num.toExponential(decimals);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const calculate = () => {
    const M = convertMassToKg();
    const R = convertRadiusToMeters();
    const h = convertAltitudeToMeters();

    if (M <= 0) {
      alert('Please enter a valid central body mass (must be positive)');
      return;
    }

    if (R <= 0) {
      alert('Please enter a valid central body radius (must be positive)');
      return;
    }

    const orbitalRadius = R + h;

    // Orbital velocity: v = sqrt(G * M / r)
    const v = Math.sqrt((G * M) / orbitalRadius);

    // Orbital period: T = 2π * sqrt(r³ / (G * M))
    const T = 2 * Math.PI * Math.sqrt(Math.pow(orbitalRadius, 3) / (G * M));

    // Escape velocity: v_esc = sqrt(2 * G * M / r)
    const v_esc = Math.sqrt((2 * G * M) / orbitalRadius);

    setResults({
      orbitalVelocity: v,
      orbitalVelocityKmH: v * 3.6,
      orbitalPeriod: T,
      escapeVelocity: v_esc
    });
  };

  const handleReset = () => {
    setMass('');
    setRadius('');
    setAltitude('');
    setResults(null);
  };

  const loadPreset = (preset: 'earth-leo' | 'earth-geo' | 'moon' | 'mars') => {
    switch (preset) {
      case 'earth-leo':
        setMass(1);
        setMassUnit('earth');
        setRadius(6371);
        setRadiusUnit('km');
        setAltitude(400);
        setAltitudeUnit('km');
        break;
      case 'earth-geo':
        setMass(1);
        setMassUnit('earth');
        setRadius(6371);
        setRadiusUnit('km');
        setAltitude(35786);
        setAltitudeUnit('km');
        break;
      case 'moon':
        setMass(7.342e22);
        setMassUnit('kg');
        setRadius(1737);
        setRadiusUnit('km');
        setAltitude(100);
        setAltitudeUnit('km');
        break;
      case 'mars':
        setMass(6.39e23);
        setMassUnit('kg');
        setRadius(3390);
        setRadiusUnit('km');
        setAltitude(300);
        setAltitudeUnit('km');
        break;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Orbital Velocity Calculator</h1>}

      <div className="space-y-6">
        {/* Presets */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Quick Presets</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => loadPreset('earth-leo')}
              className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Earth LEO (400 km)
            </button>
            <button
              onClick={() => loadPreset('earth-geo')}
              className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Earth GEO (35,786 km)
            </button>
            <button
              onClick={() => loadPreset('moon')}
              className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Moon Orbit (100 km)
            </button>
            <button
              onClick={() => loadPreset('mars')}
              className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition"
            >
              Mars Orbit (300 km)
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Central Body Mass</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={mass}
                onChange={(e) => setMass(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 1"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value as 'kg' | 'earth')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="earth">Earth masses</option>
                <option value="kg">Kilograms</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Central Body Radius</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 6371"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={radiusUnit}
                onChange={(e) => setRadiusUnit(e.target.value as 'm' | 'km')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="km">Kilometers</option>
                <option value="m">Meters</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Orbital Altitude (above surface)</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 400"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={altitudeUnit}
                onChange={(e) => setAltitudeUnit(e.target.value as 'm' | 'km')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="km">Kilometers</option>
                <option value="m">Meters</option>
              </select>
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
                <p className="text-sm text-gray-600">Orbital Velocity</p>
                <p className="text-2xl font-bold text-purple-600">{format(results.orbitalVelocity)} m/s</p>
                <p className="text-sm text-gray-600">{format(results.orbitalVelocityKmH)} km/h</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Orbital Period</p>
                <p className="text-xl font-bold text-purple-600">
                  {format(results.orbitalPeriod / 3600, 2)} hours
                </p>
                <p className="text-sm text-gray-600">{format(results.orbitalPeriod)} seconds</p>
              </div>
              <div className="bg-purple-50 p-3 rounded">
                <p className="text-sm text-gray-600">Escape Velocity (from this orbit)</p>
                <p className="text-xl font-bold text-purple-600">{format(results.escapeVelocity)} m/s</p>
                <p className="text-sm text-gray-600">{format(results.escapeVelocity * 3.6)} km/h</p>
              </div>
            </div>

            {/* Formulas Used */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Formulas Used:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>Orbital velocity: v = √(GM/r)</li>
                <li>Orbital period: T = 2π√(r³/GM)</li>
                <li>Escape velocity: v_esc = √(2GM/r)</li>
                <li>Where: G = 6.674 × 10⁻¹¹ m³/(kg·s²), M = central body mass, r = orbital radius</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
