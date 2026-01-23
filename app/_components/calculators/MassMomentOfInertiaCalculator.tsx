'use client';

import { useState } from 'react';

type Mode = 'sphere' | 'disk' | 'rod' | 'cylinder' | 'rectangle' | 'compound';

type MassUnit = { value: string; label: string; toKg: number };
type LengthUnit = { value: string; label: string; toMeter: number };

const massUnits: MassUnit[] = [
  { value: 'kg', label: 'kg', toKg: 1 },
  { value: 'g', label: 'g', toKg: 0.001 },
  { value: 'lb', label: 'lb', toKg: 0.453592 },
];

const lengthUnits: LengthUnit[] = [
  { value: 'mm', label: 'mm', toMeter: 0.001 },
  { value: 'cm', label: 'cm', toMeter: 0.01 },
  { value: 'm', label: 'm', toMeter: 1 },
  { value: 'in', label: 'in', toMeter: 0.0254 },
  { value: 'ft', label: 'ft', toMeter: 0.3048 },
];

export default function MassMomentOfInertiaCalculator() {
  const [mode, setMode] = useState<Mode>('sphere');

  // Common inputs
  const [mass, setMass] = useState('');
  const [massUnit, setMassUnit] = useState('kg');

  // Sphere/Disk/Cylinder inputs
  const [radius, setRadius] = useState('');
  const [radiusUnit, setRadiusUnit] = useState('m');

  // Rod input
  const [length, setLength] = useState('');
  const [lengthUnit, setLengthUnit] = useState('m');

  // Cylinder axis
  const [cylinderAxis, setCylinderAxis] = useState<'perpendicular' | 'parallel'>('perpendicular');

  // Rectangle inputs
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [dimUnit, setDimUnit] = useState('m');
  const [rectAxis, setRectAxis] = useState<'x' | 'y' | 'z'>('z');

  // Compound
  const [compoundMass, setCompoundMass] = useState('');
  const [compoundRadius, setCompoundRadius] = useState('');

  // Result
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [formula, setFormula] = useState<string>('');

  const formatNumber = (num: number, decimals: number = 6) => {
    if (Math.abs(num) >= 1000 || (Math.abs(num) < 0.001 && num !== 0)) {
      return num.toExponential(3);
    }
    return num.toFixed(decimals);
  };

  // Sphere: I = (2/5) * M * R²
  const calculateSphere = () => {
    try {
      const m = parseFloat(mass) * (massUnits.find((u) => u.value === massUnit)?.toKg || 1);
      const r = parseFloat(radius) * (lengthUnits.find((u) => u.value === radiusUnit)?.toMeter || 1);

      if (isNaN(m) || isNaN(r) || m <= 0 || r <= 0) {
        setResult(null);
        return;
      }

      const I = (2 / 5) * m * Math.pow(r, 2);
      setResult({ value: I, unit: 'kg⋅m²' });
      setFormula('I = (2/5) × M × R²');
    } catch {
      setResult(null);
    }
  };

  // Disk: I = (1/2) * M * R²
  const calculateDisk = () => {
    try {
      const m = parseFloat(mass) * (massUnits.find((u) => u.value === massUnit)?.toKg || 1);
      const r = parseFloat(radius) * (lengthUnits.find((u) => u.value === radiusUnit)?.toMeter || 1);

      if (isNaN(m) || isNaN(r) || m <= 0 || r <= 0) {
        setResult(null);
        return;
      }

      const I = (1 / 2) * m * Math.pow(r, 2);
      setResult({ value: I, unit: 'kg⋅m²' });
      setFormula('I = (1/2) × M × R² (about center, perpendicular axis)');
    } catch {
      setResult(null);
    }
  };

  // Rod about center: I = (1/12) * M * L²
  // Rod about end: I = (1/3) * M * L²
  const calculateRod = () => {
    try {
      const m = parseFloat(mass) * (massUnits.find((u) => u.value === massUnit)?.toKg || 1);
      const l = parseFloat(length) * (lengthUnits.find((u) => u.value === lengthUnit)?.toMeter || 1);

      if (isNaN(m) || isNaN(l) || m <= 0 || l <= 0) {
        setResult(null);
        return;
      }

      const I = (1 / 12) * m * Math.pow(l, 2);
      setResult({ value: I, unit: 'kg⋅m²' });
      setFormula('I = (1/12) × M × L² (about center)');
    } catch {
      setResult(null);
    }
  };

  // Cylinder: perpendicular I = (1/12) * M * (3R² + H²)
  //           parallel: I = (1/2) * M * R²
  const calculateCylinder = () => {
    try {
      const m = parseFloat(mass) * (massUnits.find((u) => u.value === massUnit)?.toKg || 1);
      const r = parseFloat(radius) * (lengthUnits.find((u) => u.value === radiusUnit)?.toMeter || 1);
      const h = parseFloat(length) * (lengthUnits.find((u) => u.value === lengthUnit)?.toMeter || 1);

      if (isNaN(m) || isNaN(r) || isNaN(h) || m <= 0 || r <= 0 || h <= 0) {
        setResult(null);
        return;
      }

      let I: number;
      let formulaText: string;

      if (cylinderAxis === 'parallel') {
        I = (1 / 2) * m * Math.pow(r, 2);
        formulaText = 'I = (1/2) × M × R² (along cylinder axis)';
      } else {
        I = (1 / 12) * m * (3 * Math.pow(r, 2) + Math.pow(h, 2));
        formulaText = 'I = (1/12) × M × (3R² + H²) (perpendicular axis)';
      }

      setResult({ value: I, unit: 'kg⋅m²' });
      setFormula(formulaText);
    } catch {
      setResult(null);
    }
  };

  // Rectangle: various axes
  const calculateRectangle = () => {
    try {
      const m = parseFloat(mass) * (massUnits.find((u) => u.value === massUnit)?.toKg || 1);
      const w = parseFloat(width) * (lengthUnits.find((u) => u.value === dimUnit)?.toMeter || 1);
      const h = parseFloat(height) * (lengthUnits.find((u) => u.value === dimUnit)?.toMeter || 1);

      if (isNaN(m) || isNaN(w) || isNaN(h) || m <= 0 || w <= 0 || h <= 0) {
        setResult(null);
        return;
      }

      let I: number;
      let formulaText: string;

      if (rectAxis === 'z') {
        // About z-axis (perpendicular to plane): I = (1/12) * M * (W² + H²)
        I = (1 / 12) * m * (Math.pow(w, 2) + Math.pow(h, 2));
        formulaText = 'I = (1/12) × M × (W² + H²) (perpendicular axis)';
      } else if (rectAxis === 'x') {
        // About x-axis: I = (1/12) * M * H²
        I = (1 / 12) * m * Math.pow(h, 2);
        formulaText = 'I = (1/12) × M × H² (about x-axis)';
      } else {
        // About y-axis: I = (1/12) * M * W²
        I = (1 / 12) * m * Math.pow(w, 2);
        formulaText = 'I = (1/12) × M × W² (about y-axis)';
      }

      setResult({ value: I, unit: 'kg⋅m²' });
      setFormula(formulaText);
    } catch {
      setResult(null);
    }
  };

  // Compound: I = I1 + I2 + ... + M*d² (parallel axis theorem)
  const calculateCompound = () => {
    try {
      const m = parseFloat(compoundMass) * (massUnits.find((u) => u.value === massUnit)?.toKg || 1);
      const r = parseFloat(compoundRadius) * (lengthUnits.find((u) => u.value === radiusUnit)?.toMeter || 1);

      if (isNaN(m) || isNaN(r) || m <= 0) {
        setResult(null);
        return;
      }

      const d2 = Math.pow(r, 2);
      const I = m * d2;

      setResult({ value: I, unit: 'kg⋅m²' });
      setFormula('I = M × d² (parallel axis theorem / point mass)');
    } catch {
      setResult(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Shape:
        </label>
        <div className="flex gap-2 flex-wrap">
          {(['sphere', 'disk', 'rod', 'cylinder', 'rectangle', 'compound'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-2 rounded font-medium transition text-sm ${
                mode === m
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Common mass input */}
      <div className="mb-4">
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
            {massUnits.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sphere */}
      {mode === 'sphere' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Radius:</label>
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
                {lengthUnits.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={calculateSphere}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate
          </button>
        </div>
      )}

      {/* Disk */}
      {mode === 'disk' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Radius:</label>
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
                {lengthUnits.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={calculateDisk}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate
          </button>
        </div>
      )}

      {/* Rod */}
      {mode === 'rod' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Length:</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={lengthUnit}
                onChange={(e) => setLengthUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                {lengthUnits.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={calculateRod}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate (About Center)
          </button>
        </div>
      )}

      {/* Cylinder */}
      {mode === 'cylinder' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Radius:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="R"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={radiusUnit}
                  onChange={(e) => setRadiusUnit(e.target.value)}
                  className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
                >
                  {lengthUnits.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Height:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="H"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={lengthUnit}
                  onChange={(e) => setLengthUnit(e.target.value)}
                  className="px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
                >
                  {lengthUnits.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Axis:</label>
            <select
              value={cylinderAxis}
              onChange={(e) => setCylinderAxis(e.target.value as 'parallel' | 'perpendicular')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              <option value="parallel">Along Cylinder Axis</option>
              <option value="perpendicular">Perpendicular to Axis</option>
            </select>
          </div>
          <button
            onClick={calculateCylinder}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate
          </button>
        </div>
      )}

      {/* Rectangle */}
      {mode === 'rectangle' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Width:</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="W"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Height:</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="H"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Unit:</label>
            <select
              value={dimUnit}
              onChange={(e) => setDimUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              {lengthUnits.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Axis:</label>
            <select
              value={rectAxis}
              onChange={(e) => setRectAxis(e.target.value as 'x' | 'y' | 'z')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              <option value="z">Z (Perpendicular, through center)</option>
              <option value="x">X (Through center)</option>
              <option value="y">Y (Through center)</option>
            </select>
          </div>
          <button
            onClick={calculateRectangle}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate
          </button>
        </div>
      )}

      {/* Compound */}
      {mode === 'compound' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Use parallel axis theorem: I = I_center + M × d²
          </p>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mass:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={compoundMass}
                onChange={(e) => setCompoundMass(e.target.value)}
                placeholder="Enter mass"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={massUnit}
                onChange={(e) => setMassUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                {massUnits.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Distance from Axis (d):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={compoundRadius}
                onChange={(e) => setCompoundRadius(e.target.value)}
                placeholder="Enter distance"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={radiusUnit}
                onChange={(e) => setRadiusUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                {lengthUnits.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={calculateCompound}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate
          </button>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
          <p className="text-sm text-gray-600 mb-1">Moment of Inertia:</p>
          <p className="text-3xl font-bold text-purple-700">
            {formatNumber(result.value)} {result.unit}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Formula: {formula}
          </p>
        </div>
      )}
    </div>
  );
}
