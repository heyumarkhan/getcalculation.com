'use client';

import { useState } from 'react';

type Mode = 'escapeVelocity' | 'gravParam' | 'radius';

const celestialBodies = [
  { name: 'Earth', mass: 5.972e24, radius: 6371000, escapeVelocity: 11.186 },
  { name: 'Moon', mass: 7.342e22, radius: 1737000, escapeVelocity: 2.38 },
  { name: 'Mars', mass: 6.417e23, radius: 3389500, escapeVelocity: 5.03 },
  { name: 'Jupiter', mass: 1.898e27, radius: 69911000, escapeVelocity: 59.5 },
  { name: 'Venus', mass: 4.867e24, radius: 6051800, escapeVelocity: 10.36 },
  { name: 'Mercury', mass: 3.301e23, radius: 2439700, escapeVelocity: 4.25 },
  { name: 'Saturn', mass: 5.683e26, radius: 58232000, escapeVelocity: 35.5 },
  { name: 'Uranus', mass: 8.681e25, radius: 25362000, escapeVelocity: 21.3 },
  { name: 'Neptune', mass: 1.024e26, radius: 24622000, escapeVelocity: 23.5 },
  { name: 'Sun', mass: 1.989e30, radius: 696340000, escapeVelocity: 617.5 },
];

const G = 6.674e-11; // gravitational constant in SI units

type VelocityUnit = { value: string; label: string; toBaseMs: number };

const velocityUnits: VelocityUnit[] = [
  { value: 'm/s', label: 'm/s', toBaseMs: 1 },
  { value: 'km/s', label: 'km/s', toBaseMs: 1000 },
  { value: 'km/h', label: 'km/h', toBaseMs: 1000 / 3600 },
  { value: 'mph', label: 'mph', toBaseMs: 1609.34 / 3600 },
];

const massUnits = [
  { value: 'kg', label: 'kg', toBaseSI: 1 },
  { value: 'earth-masses', label: 'Earth Masses', toBaseSI: 5.972e24 },
  { value: 'sun-masses', label: 'Solar Masses', toBaseSI: 1.989e30 },
];

const radiusUnits = [
  { value: 'm', label: 'm', toBaseSI: 1 },
  { value: 'km', label: 'km', toBaseSI: 1000 },
  { value: 'earth-radii', label: 'Earth Radii', toBaseSI: 6371000 },
];

export default function EscapeVelocityCalculator() {
  const [mode, setMode] = useState<Mode>('escapeVelocity');

  // Escape Velocity mode
  const [selectedPlanet, setSelectedPlanet] = useState('Earth');
  const [mass, setMass] = useState('5.972e24');
  const [massUnit, setMassUnit] = useState('kg');
  const [radius, setRadius] = useState('6371000');
  const [radiusUnit, setRadiusUnit] = useState('m');
  const [velocityUnit, setVelocityUnit] = useState('km/s');

  // Gravitational Parameter mode
  const [gravParam, setGravParam] = useState('');
  const [gravParamUnit, setGravParamUnit] = useState('m3/s2');

  // Result
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);

  const handlePlanetChange = (planetName: string) => {
    setSelectedPlanet(planetName);
    const planet = celestialBodies.find((p) => p.name === planetName);
    if (planet) {
      setMass(planet.mass.toExponential(3));
      setRadius(planet.radius.toString());
    }
  };

  const formatNumber = (num: number, decimals: number = 4) => {
    if (Math.abs(num) >= 1000) {
      return num.toExponential(3);
    }
    return num.toFixed(decimals);
  };

  const calculateEscapeVelocity = () => {
    try {
      const massInKg = parseFloat(mass) * (massUnits.find((u) => u.value === massUnit)?.toBaseSI || 1);
      const radiusInM = parseFloat(radius) * (radiusUnits.find((u) => u.value === radiusUnit)?.toBaseSI || 1);

      if (isNaN(massInKg) || isNaN(radiusInM) || massInKg <= 0 || radiusInM <= 0) {
        setResult(null);
        return;
      }

      // v = sqrt(2 * G * M / r)
      const velocityMs = Math.sqrt((2 * G * massInKg) / radiusInM);
      const unit = velocityUnits.find((u) => u.value === velocityUnit);
      const velocityInUnit = unit ? velocityMs / unit.toBaseMs : velocityMs;

      setResult({
        value: velocityInUnit,
        unit: velocityUnit,
      });
    } catch {
      setResult(null);
    }
  };

  const calculateFromGravParam = () => {
    try {
      const gravParamValue = parseFloat(gravParam);
      const gravParamInM3S2 = gravParamUnit === 'km3/s2'
        ? gravParamValue * 1e9
        : gravParamValue;

      if (isNaN(gravParamValue) || gravParamValue <= 0) {
        setResult(null);
        return;
      }

      // For standard gravitational parameter μ = G*M, we need radius
      // This example calculates from gravParam directly
      // Typically: v = sqrt(2 * μ / r), but here we show μ value
      const unit = velocityUnits.find((u) => u.value === velocityUnit);
      // Demonstrate with assumed radius of Earth if not provided
      const assumedRadius = 6371000;
      const velocityMs = Math.sqrt((2 * gravParamInM3S2) / assumedRadius);
      const velocityInUnit = unit ? velocityMs / unit.toBaseMs : velocityMs;

      setResult({
        value: velocityInUnit,
        unit: velocityUnit,
      });
    } catch {
      setResult(null);
    }
  };

  const calculateMassFromEscape = () => {
    try {
      const vel = parseFloat(mass);
      const rad = parseFloat(radius) * (radiusUnits.find((u) => u.value === radiusUnit)?.toBaseSI || 1);

      if (isNaN(vel) || isNaN(rad) || vel <= 0 || rad <= 0) {
        setResult(null);
        return;
      }

      // M = (v^2 * r) / (2 * G)
      const massInKg = (Math.pow(vel, 2) * rad) / (2 * G);
      const unit = massUnits.find((u) => u.value === massUnit);
      const massInUnit = unit ? massInKg / unit.toBaseSI : massInKg;

      setResult({
        value: massInUnit,
        unit: massUnit,
      });
    } catch {
      setResult(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Calculate:
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setMode('escapeVelocity')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'escapeVelocity'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Escape Velocity
          </button>
          <button
            onClick={() => setMode('gravParam')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'gravParam'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Grav. Parameter
          </button>
          <button
            onClick={() => setMode('radius')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'radius'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mass from Escape Vel.
          </button>
        </div>
      </div>

      {mode === 'escapeVelocity' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Celestial Body Preset:
            </label>
            <select
              value={selectedPlanet}
              onChange={(e) => handlePlanetChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              {celestialBodies.map((body) => (
                <option key={body.name} value={body.name}>
                  {body.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mass:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                  placeholder="Enter mass"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={massUnit}
                  onChange={(e) => setMassUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {massUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Radius:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="Enter radius"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={radiusUnit}
                  onChange={(e) => setRadiusUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {radiusUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Velocity Unit:
            </label>
            <select
              value={velocityUnit}
              onChange={(e) => setVelocityUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              {velocityUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={calculateEscapeVelocity}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate Escape Velocity
          </button>
        </div>
      )}

      {mode === 'gravParam' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gravitational Parameter (μ = GM):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={gravParam}
                onChange={(e) => setGravParam(e.target.value)}
                placeholder="Enter gravitational parameter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={gravParamUnit}
                onChange={(e) => setGravParamUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                <option value="m3/s2">m³/s²</option>
                <option value="km3/s2">km³/s²</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Velocity Unit:
            </label>
            <select
              value={velocityUnit}
              onChange={(e) => setVelocityUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              {velocityUnits.map((unit) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={calculateFromGravParam}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate Escape Velocity
          </button>
        </div>
      )}

      {mode === 'radius' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Given escape velocity, calculate the mass. (Assumes radius known)
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Escape Velocity:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={mass}
                  onChange={(e) => setMass(e.target.value)}
                  placeholder="Enter escape velocity"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={velocityUnit}
                  onChange={(e) => setVelocityUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {velocityUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Radius:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="Enter radius"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={radiusUnit}
                  onChange={(e) => setRadiusUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {radiusUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateMassFromEscape}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate Mass
          </button>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
          <p className="text-sm text-gray-600 mb-1">Result:</p>
          <p className="text-3xl font-bold text-purple-700">
            {formatNumber(result.value)} {result.unit}
          </p>
          {mode === 'escapeVelocity' && (
            <p className="text-xs text-gray-500 mt-2">
              Formula: v = √(2GM/r)
            </p>
          )}
        </div>
      )}
    </div>
  );
}
