'use client';

import { useState } from 'react';

interface ThermalResult {
  thermalResistance: number;
  heatFlowRate: number;
  temperatureDifference: number;
  heatFlux?: number;
  convectionCoefficient?: number;
}

type ThermalMode = 'conduction' | 'convection' | 'radiation' | 'series' | 'parallel';

export default function ThermalResistanceCalculator({ showTitle = true }: { showTitle?: boolean }) {
  const [mode, setMode] = useState<ThermalMode>('conduction');
  
  // Conduction
  const [thermalConductivity, setThermalConductivity] = useState<number | ''>('');
  const [length, setLength] = useState<number | ''>('');
  const [area, setArea] = useState<number | ''>('');
  const [lengthUnit, setLengthUnit] = useState<'mm' | 'cm' | 'm'>('mm');
  const [areaUnit, setAreaUnit] = useState<'mm2' | 'cm2' | 'm2'>('mm2');
  
  // Convection
  const [convectionCoef, setConvectionCoef] = useState<number | ''>('');
  const [convectionArea, setConvectionArea] = useState<number | ''>('');
  const [convectionAreaUnit, setConvectionAreaUnit] = useState<'mm2' | 'cm2' | 'm2'>('m2');
  
  // Radiation
  const [emissivity, setEmissivity] = useState<number | ''>('');
  const [surfaceArea, setSurfaceArea] = useState<number | ''>('');
  const [surfaceAreaUnit, setSurfaceAreaUnit] = useState<'mm2' | 'cm2' | 'm2'>('m2');
  const [tempSurface, setTempSurface] = useState<number | ''>('');
  const [tempSurrounding, setTempSurrounding] = useState<number | ''>('');
  
  // Series/Parallel
  const [resistance1, setResistance1] = useState<number | ''>('');
  const [resistance2, setResistance2] = useState<number | ''>('');
  const [resistance3, setResistance3] = useState<number | ''>('');
  
  // Heat flow calculation
  const [tempHot, setTempHot] = useState<number | ''>('');
  const [tempCold, setTempCold] = useState<number | ''>('');
  
  const [results, setResults] = useState<ThermalResult | null>(null);

  const STEFAN_BOLTZMANN = 5.67e-8; // W/(m²·K⁴)

  const format = (num: number, decimals: number = 6) => {
    if (num === 0) return '0';
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1e10) return num.toExponential(4);
    return num.toFixed(decimals).replace(/\.?0+$/, '');
  };

  const convertLengthToMeters = (val: number, unit: typeof lengthUnit): number => {
    switch (unit) {
      case 'mm': return val / 1000;
      case 'cm': return val / 100;
      case 'm': return val;
    }
  };

  const convertAreaToM2 = (val: number, unit: string): number => {
    switch (unit) {
      case 'mm2': return val / 1e6;
      case 'cm2': return val / 1e4;
      case 'm2': return val;
      default: return val;
    }
  };

  const calculate = () => {
    let R_thermal = 0;
    let Q = 0;
    let dT = 0;
    let h_eff = 0;

    if (mode === 'conduction') {
      if (thermalConductivity === '' || length === '' || area === '') {
        alert('Enter thermal conductivity, length, and area for conduction');
        return;
      }
      
      const k = thermalConductivity as number;
      const L = convertLengthToMeters(length as number, lengthUnit);
      const A = convertAreaToM2(area as number, areaUnit);

      if (k <= 0 || L <= 0 || A <= 0) {
        alert('All values must be positive');
        return;
      }

      R_thermal = L / (k * A);
      
    } else if (mode === 'convection') {
      if (convectionCoef === '' || convectionArea === '') {
        alert('Enter convection coefficient and area');
        return;
      }
      
      const h = convectionCoef as number;
      const A = convertAreaToM2(convectionArea as number, convectionAreaUnit);

      if (h <= 0 || A <= 0) {
        alert('All values must be positive');
        return;
      }

      R_thermal = 1 / (h * A);
      h_eff = h;
      
    } else if (mode === 'radiation') {
      if (emissivity === '' || surfaceArea === '' || tempSurface === '' || tempSurrounding === '') {
        alert('Enter all radiation parameters');
        return;
      }
      
      const ε = emissivity as number;
      const A = convertAreaToM2(surfaceArea as number, surfaceAreaUnit);
      const Ts = (tempSurface as number) + 273.15;
      const Tamb = (tempSurrounding as number) + 273.15;

      if (ε <= 0 || ε > 1 || A <= 0 || Ts <= 0 || Tamb <= 0) {
        alert('Check input values: 0 < emissivity ≤ 1, absolute temperature > 0');
        return;
      }

      // Linearized radiation resistance: h_rad = ε·σ·(Ts² + Tamb²)·(Ts + Tamb)
      const h_rad = ε * STEFAN_BOLTZMANN * (Ts * Ts + Tamb * Tamb) * (Ts + Tamb);
      R_thermal = 1 / (h_rad * A);
      h_eff = h_rad;
      dT = (tempSurface as number) - (tempSurrounding as number);
      
    } else if (mode === 'series') {
      if (resistance1 === '' || resistance2 === '') {
        alert('Enter at least R1 and R2');
        return;
      }
      
      const R1 = resistance1 as number;
      const R2 = resistance2 as number;
      const R3 = resistance3 === '' ? 0 : (resistance3 as number);

      if (R1 < 0 || R2 < 0 || R3 < 0) {
        alert('Resistances cannot be negative');
        return;
      }

      R_thermal = R1 + R2 + R3;
      
    } else if (mode === 'parallel') {
      if (resistance1 === '' || resistance2 === '') {
        alert('Enter at least R1 and R2');
        return;
      }
      
      const R1 = resistance1 as number;
      const R2 = resistance2 as number;
      const R3 = resistance3 === '' ? 0 : (resistance3 as number);

      if (R1 <= 0 || R2 <= 0 || (R3 !== 0 && R3 <= 0)) {
        alert('Resistances must be positive');
        return;
      }

      if (R3 === 0) {
        R_thermal = (R1 * R2) / (R1 + R2);
      } else {
        R_thermal = 1 / (1 / R1 + 1 / R2 + 1 / R3);
      }
    }

    // Calculate heat flow if temperature difference provided
    if (tempHot !== '' && tempCold !== '') {
      dT = (tempHot as number) - (tempCold as number);
      if (R_thermal > 0) {
        Q = Math.abs(dT) / R_thermal;
      }
    }

    setResults({
      thermalResistance: R_thermal,
      heatFlowRate: Q,
      temperatureDifference: dT,
      heatFlux: Q > 0 && (mode === 'conduction' || mode === 'convection') ? 
        Q / convertAreaToM2(mode === 'conduction' ? (area as number) : (convectionArea as number), 
                           mode === 'conduction' ? areaUnit : convectionAreaUnit) : undefined,
      convectionCoefficient: h_eff > 0 ? h_eff : undefined
    });
  };

  const handleReset = () => {
    setThermalConductivity('');
    setLength('');
    setArea('');
    setConvectionCoef('');
    setConvectionArea('');
    setEmissivity('');
    setSurfaceArea('');
    setTempSurface('');
    setTempSurrounding('');
    setResistance1('');
    setResistance2('');
    setResistance3('');
    setTempHot('');
    setTempCold('');
    setResults(null);
  };

  const loadPreset = (preset: 'brick' | 'aluminum' | 'window' | 'insulation') => {
    setMode('conduction');
    switch (preset) {
      case 'brick':
        setThermalConductivity(0.7);
        setLength(100);
        setLengthUnit('mm');
        setArea(1);
        setAreaUnit('m2');
        break;
      case 'aluminum':
        setThermalConductivity(237);
        setLength(10);
        setLengthUnit('mm');
        setArea(0.01);
        setAreaUnit('m2');
        break;
      case 'window':
        setThermalConductivity(0.8);
        setLength(6);
        setLengthUnit('mm');
        setArea(1);
        setAreaUnit('m2');
        break;
      case 'insulation':
        setThermalConductivity(0.04);
        setLength(100);
        setLengthUnit('mm');
        setArea(1);
        setAreaUnit('m2');
        break;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg">
      {showTitle && <h1 className="text-3xl font-bold mb-6 text-gray-800">Thermal Resistance Calculator</h1>}

      <div className="space-y-6">
        {/* Mode Selection */}
        <div className="bg-white rounded-lg p-4 shadow">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Heat Transfer Mode</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {(['conduction', 'convection', 'radiation', 'series', 'parallel'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-2 px-3 rounded text-sm font-medium transition ${
                  mode === m
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Presets for Conduction */}
        {mode === 'conduction' && (
          <div className="bg-white rounded-lg p-4 shadow">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Material Presets</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => loadPreset('brick')} className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
                Brick (k=0.7)
              </button>
              <button onClick={() => loadPreset('aluminum')} className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
                Aluminum (k=237)
              </button>
              <button onClick={() => loadPreset('window')} className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
                Glass (k=0.8)
              </button>
              <button onClick={() => loadPreset('insulation')} className="py-2 px-3 text-sm bg-gray-100 hover:bg-gray-200 rounded transition">
                Foam (k=0.04)
              </button>
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="bg-white rounded-lg p-4 shadow space-y-4">
          {mode === 'conduction' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thermal Conductivity k (W/m·K)</label>
                <input
                  type="number"
                  value={thermalConductivity}
                  onChange={(e) => setThermalConductivity(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 50"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Thickness (Length)</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    placeholder="e.g., 50"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <select
                    value={lengthUnit}
                    onChange={(e) => setLengthUnit(e.target.value as typeof lengthUnit)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    placeholder="e.g., 1"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value as typeof areaUnit)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="mm2">mm²</option>
                    <option value="cm2">cm²</option>
                    <option value="m2">m²</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {mode === 'convection' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Convection Coefficient h (W/m²·K)</label>
                <input
                  type="number"
                  value={convectionCoef}
                  onChange={(e) => setConvectionCoef(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 25"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surface Area</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={convectionArea}
                    onChange={(e) => setConvectionArea(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    placeholder="e.g., 1"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <select
                    value={convectionAreaUnit}
                    onChange={(e) => setConvectionAreaUnit(e.target.value as typeof convectionAreaUnit)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="mm2">mm²</option>
                    <option value="cm2">cm²</option>
                    <option value="m2">m²</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {mode === 'radiation' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emissivity (0-1)</label>
                <input
                  type="number"
                  value={emissivity}
                  onChange={(e) => setEmissivity(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 0.9"
                  min="0"
                  max="1"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Surface Area</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={surfaceArea}
                    onChange={(e) => setSurfaceArea(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    placeholder="e.g., 1"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <select
                    value={surfaceAreaUnit}
                    onChange={(e) => setSurfaceAreaUnit(e.target.value as typeof surfaceAreaUnit)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="mm2">mm²</option>
                    <option value="cm2">cm²</option>
                    <option value="m2">m²</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surface Temp (°C)</label>
                  <input
                    type="number"
                    value={tempSurface}
                    onChange={(e) => setTempSurface(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    placeholder="e.g., 50"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surrounding Temp (°C)</label>
                  <input
                    type="number"
                    value={tempSurrounding}
                    onChange={(e) => setTempSurrounding(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    placeholder="e.g., 20"
                    step="any"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
            </>
          )}

          {(mode === 'series' || mode === 'parallel') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">R₁ (K/W)</label>
                <input
                  type="number"
                  value={resistance1}
                  onChange={(e) => setResistance1(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 0.5"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">R₂ (K/W)</label>
                <input
                  type="number"
                  value={resistance2}
                  onChange={(e) => setResistance2(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 0.3"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">R₃ (K/W) - Optional</label>
                <input
                  type="number"
                  value={resistance3}
                  onChange={(e) => setResistance3(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g., 0.2"
                  step="any"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
            </>
          )}

          <h3 className="text-sm font-semibold text-gray-700 mt-4 pt-2">Heat Flow Calculation (Optional)</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hot Side Temp (°C)</label>
              <input
                type="number"
                value={tempHot}
                onChange={(e) => setTempHot(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 100"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cold Side Temp (°C)</label>
              <input
                type="number"
                value={tempCold}
                onChange={(e) => setTempCold(e.target.value === '' ? '' : parseFloat(e.target.value))}
                placeholder="e.g., 20"
                step="any"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
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
            
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg mb-4">
              <p className="text-sm opacity-90">Thermal Resistance</p>
              <p className="text-4xl font-bold">{format(results.thermalResistance, 4)} K/W</p>
            </div>

            <div className="space-y-3">
              {results.heatFlowRate > 0 && (
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Heat Flow Rate (Q)</p>
                  <p className="text-xl font-bold text-purple-600">{format(results.heatFlowRate, 2)} W</p>
                  <p className="text-xs text-gray-600">ΔT = {format(results.temperatureDifference, 2)} K</p>
                </div>
              )}
              
              {results.heatFlux && (
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Heat Flux (q)</p>
                  <p className="text-xl font-bold text-purple-600">{format(results.heatFlux, 2)} W/m²</p>
                </div>
              )}
              
              {results.convectionCoefficient && (
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-sm text-gray-600">Effective h (Radiation)</p>
                  <p className="text-xl font-bold text-purple-600">{format(results.convectionCoefficient, 2)} W/m²·K</p>
                </div>
              )}
            </div>

            {/* Formulas Used */}
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-2">Formulas:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>Conduction: R = L / (k × A)</li>
                <li>Convection: R = 1 / (h × A)</li>
                <li>Radiation: R = 1 / (h_rad × A), h_rad = ε·σ·(T_s² + T_a²)(T_s + T_a)</li>
                <li>Series: R_total = R₁ + R₂ + R₃</li>
                <li>Parallel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃</li>
                <li>Heat Flow: Q = ΔT / R</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
