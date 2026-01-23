'use client';

import { useState } from 'react';

type Mode = 'linearExpansion' | 'volumetricExpansion' | 'tempChange' | 'coefficientLinear';

interface Material {
  name: string;
  linearCoeff: number; // per °C
}

const materials: Material[] = [
  { name: 'Aluminum', linearCoeff: 23.1e-6 },
  { name: 'Brass', linearCoeff: 19e-6 },
  { name: 'Copper', linearCoeff: 17e-6 },
  { name: 'Iron (Steel)', linearCoeff: 12e-6 },
  { name: 'Lead', linearCoeff: 29e-6 },
  { name: 'Nickel', linearCoeff: 13e-6 },
  { name: 'Silver', linearCoeff: 18.4e-6 },
  { name: 'Titanium', linearCoeff: 8.6e-6 },
  { name: 'Zinc', linearCoeff: 30.2e-6 },
  { name: 'Glass (common)', linearCoeff: 9e-6 },
  { name: 'Concrete', linearCoeff: 12e-6 },
  { name: 'Water (volumetric)', linearCoeff: 207e-6 },
  { name: 'Acetone', linearCoeff: 1430e-6 },
];

type LengthUnit = { value: string; label: string; toMeter: number };
type TempUnit = { value: string; label: string; toKelvinDiff: number };

const lengthUnits: LengthUnit[] = [
  { value: 'mm', label: 'mm', toMeter: 0.001 },
  { value: 'cm', label: 'cm', toMeter: 0.01 },
  { value: 'm', label: 'm', toMeter: 1 },
  { value: 'in', label: 'in', toMeter: 0.0254 },
  { value: 'ft', label: 'ft', toMeter: 0.3048 },
];

const tempUnits: TempUnit[] = [
  { value: 'C', label: '°C', toKelvinDiff: 1 },
  { value: 'K', label: 'K', toKelvinDiff: 1 },
  { value: 'F', label: '°F', toKelvinDiff: 5 / 9 },
];

export default function ThermalExpansionCalculator() {
  const [mode, setMode] = useState<Mode>('linearExpansion');

  // Linear Expansion mode
  const [selectedMaterial, setSelectedMaterial] = useState('Aluminum');
  const [linearCoeff, setLinearCoeff] = useState('23.1e-6');
  const [coeffUnit, setCoeffUnit] = useState('per-C');
  const [originalLength, setOriginalLength] = useState('');
  const [originalLengthUnit, setOriginalLengthUnit] = useState('m');
  const [tempChange, setTempChange] = useState('');
  const [tempChangeUnit, setTempChangeUnit] = useState('C');
  const [expansionLengthUnit, setExpansionLengthUnit] = useState('mm');

  // Volumetric Expansion mode
  const [originalVolume, setOriginalVolume] = useState('');
  const [volumeUnit, setVolumeUnit] = useState('liters');
  const [volumeCoeff, setVolumeCoeff] = useState('');
  const [volumeCoeffUnit, setVolumeCoeffUnit] = useState('per-C');

  // Result
  const [result, setResult] = useState<{ value: number; unit: string } | null>(null);
  const [resultLabel, setResultLabel] = useState<string>('');

  const handleMaterialChange = (materialName: string) => {
    setSelectedMaterial(materialName);
    const material = materials.find((m) => m.name === materialName);
    if (material) {
      setLinearCoeff(material.linearCoeff.toExponential(2));
    }
  };

  const formatNumber = (num: number, decimals: number = 6) => {
    if (Math.abs(num) >= 1000 || (Math.abs(num) < 0.001 && num !== 0)) {
      return num.toExponential(3);
    }
    return num.toFixed(decimals);
  };

  const calculateLinearExpansion = () => {
    try {
      const alpha = parseFloat(linearCoeff);
      const L0 = parseFloat(originalLength) * (lengthUnits.find((u) => u.value === originalLengthUnit)?.toMeter || 1);
      const dT = parseFloat(tempChange) * (tempUnits.find((u) => u.value === tempChangeUnit)?.toKelvinDiff || 1);

      if (isNaN(alpha) || isNaN(L0) || isNaN(dT) || L0 <= 0) {
        setResult(null);
        return;
      }

      // ΔL = L₀ × α × ΔT
      const deltaL = L0 * alpha * dT;
      const unitConv = lengthUnits.find((u) => u.value === expansionLengthUnit);
      const deltaLInUnit = unitConv ? deltaL / unitConv.toMeter : deltaL;

      setResult({
        value: deltaLInUnit,
        unit: expansionLengthUnit,
      });
      setResultLabel('Change in Length (ΔL)');
    } catch {
      setResult(null);
    }
  };

  const calculateVolumetricExpansion = () => {
    try {
      const beta = parseFloat(volumeCoeff);
      const V0 = parseFloat(originalVolume);
      const dT = parseFloat(tempChange) * (tempUnits.find((u) => u.value === tempChangeUnit)?.toKelvinDiff || 1);

      if (isNaN(beta) || isNaN(V0) || isNaN(dT) || V0 <= 0) {
        setResult(null);
        return;
      }

      // ΔV = V₀ × β × ΔT
      const deltaV = V0 * beta * dT;

      setResult({
        value: deltaV,
        unit: volumeUnit,
      });
      setResultLabel('Change in Volume (ΔV)');
    } catch {
      setResult(null);
    }
  };

  const calculateTempChangeLinear = () => {
    try {
      const alpha = parseFloat(linearCoeff);
      const L0 = parseFloat(originalLength) * (lengthUnits.find((u) => u.value === originalLengthUnit)?.toMeter || 1);
      const deltaL = parseFloat(tempChange) * (lengthUnits.find((u) => u.value === originalLengthUnit)?.toMeter || 1);

      if (isNaN(alpha) || isNaN(L0) || isNaN(deltaL) || alpha === 0) {
        setResult(null);
        return;
      }

      // ΔT = ΔL / (L₀ × α)
      const dT = deltaL / (L0 * alpha);

      setResult({
        value: dT,
        unit: '°C',
      });
      setResultLabel('Temperature Change (ΔT)');
    } catch {
      setResult(null);
    }
  };

  const calculateCoefficientLinear = () => {
    try {
      const L0 = parseFloat(originalLength) * (lengthUnits.find((u) => u.value === originalLengthUnit)?.toMeter || 1);
      const deltaL = parseFloat(tempChange) * (lengthUnits.find((u) => u.value === originalLengthUnit)?.toMeter || 1);
      const dT = parseFloat(linearCoeff); // Using linearCoeff field as ΔT input in this mode

      if (isNaN(L0) || isNaN(deltaL) || isNaN(dT) || dT === 0) {
        setResult(null);
        return;
      }

      // α = ΔL / (L₀ × ΔT)
      const alpha = deltaL / (L0 * dT);

      setResult({
        value: alpha,
        unit: 'per °C',
      });
      setResultLabel('Linear Expansion Coefficient (α)');
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
            onClick={() => setMode('linearExpansion')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'linearExpansion'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Linear Expansion
          </button>
          <button
            onClick={() => setMode('volumetricExpansion')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'volumetricExpansion'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Volumetric Expansion
          </button>
          <button
            onClick={() => setMode('tempChange')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'tempChange'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Temp. Change
          </button>
          <button
            onClick={() => setMode('coefficientLinear')}
            className={`px-4 py-2 rounded font-medium transition ${
              mode === 'coefficientLinear'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Coefficient
          </button>
        </div>
      </div>

      {mode === 'linearExpansion' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Material Preset:
            </label>
            <select
              value={selectedMaterial}
              onChange={(e) => handleMaterialChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              {materials.map((mat) => (
                <option key={mat.name} value={mat.name}>
                  {mat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Linear Coeff. (α):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={linearCoeff}
                  onChange={(e) => setLinearCoeff(e.target.value)}
                  placeholder="e.g., 23.1e-6"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">/°C or /K</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Length:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={originalLength}
                  onChange={(e) => setOriginalLength(e.target.value)}
                  placeholder="Enter length"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={originalLengthUnit}
                  onChange={(e) => setOriginalLengthUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {lengthUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Temp. Change (ΔT):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tempChange}
                  onChange={(e) => setTempChange(e.target.value)}
                  placeholder="Enter temp change"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={tempChangeUnit}
                  onChange={(e) => setTempChangeUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {tempUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expansion Unit:
              </label>
              <select
                value={expansionLengthUnit}
                onChange={(e) => setExpansionLengthUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                {lengthUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={calculateLinearExpansion}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate Expansion
          </button>
        </div>
      )}

      {mode === 'volumetricExpansion' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Original Volume:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={originalVolume}
                onChange={(e) => setOriginalVolume(e.target.value)}
                placeholder="Enter volume"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={volumeUnit}
                onChange={(e) => setVolumeUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                <option value="liters">liters</option>
                <option value="m3">m³</option>
                <option value="cm3">cm³</option>
                <option value="gallons">gallons</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Volume Coeff. (β):
              </label>
              <input
                type="number"
                value={volumeCoeff}
                onChange={(e) => setVolumeCoeff(e.target.value)}
                placeholder="e.g., 69.3e-6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">/°C or /K</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Temp. Change (ΔT):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tempChange}
                  onChange={(e) => setTempChange(e.target.value)}
                  placeholder="Enter temp change"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={tempChangeUnit}
                  onChange={(e) => setTempChangeUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {tempUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={calculateVolumetricExpansion}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate Expansion
          </button>
        </div>
      )}

      {mode === 'tempChange' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Given expansion length, calculate required temperature change.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Linear Coeff. (α):
              </label>
              <input
                type="number"
                value={linearCoeff}
                onChange={(e) => setLinearCoeff(e.target.value)}
                placeholder="e.g., 23.1e-6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">/°C or /K</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Length:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={originalLength}
                  onChange={(e) => setOriginalLength(e.target.value)}
                  placeholder="Enter length"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={originalLengthUnit}
                  onChange={(e) => setOriginalLengthUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {lengthUnits.map((unit) => (
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
              Change in Length (ΔL):
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={tempChange}
                onChange={(e) => setTempChange(e.target.value)}
                placeholder="Enter expansion length"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={originalLengthUnit}
                onChange={(e) => setOriginalLengthUnit(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              >
                {lengthUnits.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={calculateTempChangeLinear}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate Temp. Change
          </button>
        </div>
      )}

      {mode === 'coefficientLinear' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Given expansion length and temperature change, calculate expansion coefficient.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Original Length:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={originalLength}
                  onChange={(e) => setOriginalLength(e.target.value)}
                  placeholder="Enter length"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={originalLengthUnit}
                  onChange={(e) => setOriginalLengthUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {lengthUnits.map((unit) => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Change in Length (ΔL):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tempChange}
                  onChange={(e) => setTempChange(e.target.value)}
                  placeholder="Enter expansion"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
                <select
                  value={originalLengthUnit}
                  onChange={(e) => setOriginalLengthUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  {lengthUnits.map((unit) => (
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
              Temperature Change (ΔT in °C):
            </label>
            <input
              type="number"
              value={linearCoeff}
              onChange={(e) => setLinearCoeff(e.target.value)}
              placeholder="Enter temperature change"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            onClick={calculateCoefficientLinear}
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Calculate Coefficient
          </button>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
          <p className="text-sm text-gray-600 mb-1">{resultLabel}:</p>
          <p className="text-3xl font-bold text-purple-700">
            {formatNumber(result.value)} {result.unit}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {mode === 'linearExpansion' && 'Formula: ΔL = L₀ × α × ΔT'}
            {mode === 'volumetricExpansion' && 'Formula: ΔV = V₀ × β × ΔT'}
          </p>
        </div>
      )}
    </div>
  );
}
